/**
 * KnieVital - Hauptanwendung (Application Controller)
 * Steuert UI, Workout-Player, Tagebuch, Filterung und Event-Handling
 */

class KnieTherapyApp {
    constructor() {
        this.currentTab = 'overview';
        this.activeFilter = 'all'; // 'all', 'light', 'stretch'
        this.activeWorkout = null; // { exercises: [], currentIndex: 0, timer: null, timeLeft: 0, isRunning: false, phase: 'work' }
        this.diaryEntries = this.loadDiary();

        this.init();
    }

    init() {
        this.renderExercises();
        this.setupEventListeners();
        this.renderDiary();
        this.renderRedFlags();
        this.renderKnowledgeCards();
        this.renderChatMessages();
    }

    // =========================================================================
    // NAVIGATION & TAB WECHSEL
    // =========================================================================
    switchTab(tabId) {
        this.currentTab = tabId;
        
        // Tab-Buttons aktualisieren
        document.querySelectorAll('.nav-tab-btn').forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('bg-teal-600', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('text-slate-600', !isActive);
            btn.classList.toggle('hover:bg-slate-100', !isActive);
        });

        // Tab-Inhalte umschalten
        document.querySelectorAll('.tab-content').forEach(section => {
            section.classList.toggle('hidden', section.id !== `tab-${tabId}`);
        });

        // Falls spezifischer Tab gewählt, Filter vorjustieren
        if (tabId === 'light-exercises') {
            this.setFilter('light');
        } else if (tabId === 'stretching') {
            this.setFilter('stretch');
        } else if (tabId === 'exercises') {
            this.setFilter('all');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =========================================================================
    // RENDERING: ÜBUNGEN & KARTEN
    // =========================================================================
    renderExercises() {
        const lightContainer = document.getElementById('light-exercises-grid');
        const stretchContainer = document.getElementById('stretch-exercises-grid');
        const allContainer = document.getElementById('all-exercises-grid');

        const lightList = EXERCISES.filter(ex => ex.category === 'light');
        const stretchList = EXERCISES.filter(ex => ex.category === 'stretch');

        if (lightContainer) {
            lightContainer.innerHTML = lightList.map(ex => this.createExerciseCardHtml(ex)).join('');
        }
        if (stretchContainer) {
            stretchContainer.innerHTML = stretchList.map(ex => this.createExerciseCardHtml(ex)).join('');
        }
        if (allContainer) {
            allContainer.innerHTML = EXERCISES.map(ex => this.createExerciseCardHtml(ex)).join('');
        }
    }

    createExerciseCardHtml(ex) {
        const isStretch = ex.category === 'stretch';
        const badgeBg = isStretch ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800';
        const iconSvg = isStretch ? `
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ` : `
            <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        `;

        return `
            <div class="exercise-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between" data-id="${ex.id}">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeBg}">
                            ${iconSvg}
                            ${ex.categoryLabel}
                        </span>
                        <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            ${ex.difficulty}
                        </span>
                    </div>

                    <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug">${ex.title}</h3>
                    
                    <p class="text-sm text-slate-600 mb-4 line-clamp-2">
                        ${ex.whyItHelps}
                    </p>

                    <div class="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                        <div class="flex items-center justify-between text-slate-600">
                            <span class="font-medium text-slate-700">🎯 Zielmuskeln:</span>
                            <span class="text-right text-slate-800 font-medium truncate max-w-[180px]">${ex.targetMuscles.join(', ')}</span>
                        </div>
                        <div class="flex items-center justify-between text-slate-600">
                            <span class="font-medium text-slate-700">⏱️ Dosierung:</span>
                            <span class="text-right font-semibold text-teal-700">${ex.duration}</span>
                        </div>
                    </div>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button onclick="app.openExerciseDetail('${ex.id}')" class="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Anleitung
                    </button>
                    <button onclick="app.startSingleWorkout('${ex.id}')" class="flex-1 px-3 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm shadow-teal-600/20">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Mit Timer
                    </button>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // MODAL: DETAILANSICHT EINER ÜBUNG
    // =========================================================================
    openExerciseDetail(id) {
        const ex = EXERCISES.find(e => e.id === id);
        if (!ex) return;

        const modal = document.getElementById('exercise-detail-modal');
        const content = document.getElementById('exercise-detail-content');

        const isStretch = ex.category === 'stretch';
        const themeColor = isStretch ? 'amber' : 'teal';

        content.innerHTML = `
            <div class="p-6 md:p-8">
                <!-- Header -->
                <div class="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <span class="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${isStretch ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'}">
                            ${ex.categoryLabel}
                        </span>
                        <h2 class="text-2xl font-extrabold text-slate-900">${ex.title}</h2>
                    </div>
                    <button onclick="app.closeExerciseDetail()" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <!-- Wirkung & Ziel -->
                <div class="bg-teal-50/70 border border-teal-100 rounded-xl p-4 mb-6">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-teal-900 mb-1">💡 Warum diese Übung dem Knie hilft</h4>
                    <p class="text-sm text-teal-800">${ex.whyItHelps}</p>
                </div>

                <!-- Info Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span class="text-xs text-slate-500 block">⏱️ Empfohlene Dosis</span>
                        <span class="font-bold text-sm text-slate-800">${ex.duration}</span>
                    </div>
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span class="text-xs text-slate-500 block">🛠️ Hilfsmittel</span>
                        <span class="font-bold text-sm text-slate-800">${ex.equipment}</span>
                    </div>
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span class="text-xs text-slate-500 block">🚦 Schmerztoleranz</span>
                        <span class="font-bold text-sm text-teal-700">${ex.painTolerance}</span>
                    </div>
                </div>

                <!-- Schritt-für-Schritt Anleitung -->
                <div class="mb-6">
                    <h3 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span>📋</span> Schritt-für-Schritt Durchführung
                    </h3>
                    <ol class="space-y-2.5">
                        ${ex.instructions.map((step, idx) => `
                            <li class="flex items-start gap-3 text-sm text-slate-700">
                                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                                    ${idx + 1}
                                </span>
                                <span class="pt-0.5 leading-relaxed">${step}</span>
                            </li>
                        `).join('')}
                    </ol>
                </div>

                <!-- Physio Tipp & Fehlerquellen -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                        <h4 class="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">⭐ Physio-Praxistipp</h4>
                        <p class="text-xs text-emerald-800 leading-relaxed">${ex.physioTip}</p>
                    </div>
                    <div class="p-4 rounded-xl bg-rose-50 border border-rose-200">
                        <h4 class="text-xs font-bold text-rose-900 uppercase tracking-wider mb-1">⚠️ Darauf unbedingt achten</h4>
                        <p class="text-xs text-rose-800 leading-relaxed">${ex.precautions}</p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <button onclick="app.closeExerciseDetail()" class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50">
                        Schließen
                    </button>
                    <button onclick="app.closeExerciseDetail(); app.startSingleWorkout('${ex.id}');" class="flex-1 py-2.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-600/20">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
                        Übung jetzt mit geführter Zeit starten
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    closeExerciseDetail() {
        const modal = document.getElementById('exercise-detail-modal');
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    // =========================================================================
    // WORKOUT-PLAYER & TIMER (GEFÜHRTES TRAINING)
    // =========================================================================
    startSingleWorkout(exerciseId) {
        const ex = EXERCISES.find(e => e.id === exerciseId);
        if (!ex) return;
        this.startWorkoutSession([ex]);
    }

    startCategoryWorkout(category) {
        const list = EXERCISES.filter(ex => category === 'all' || ex.category === category);
        if (list.length === 0) return;
        this.startWorkoutSession(list);
    }

    startWorkoutSession(exercisesList) {
        physioAudio.init();
        const firstEx = exercisesList[0];
        const isIsometricOrStretch = firstEx.type === 'stretch-timer' || firstEx.type === 'isometric';
        const initialDuration = isIsometricOrStretch ? (firstEx.defaultHold || 35) : 45;

        this.activeWorkout = {
            exercises: exercisesList,
            currentIndex: 0,
            timer: null,
            durationTotal: initialDuration,
            timeLeft: initialDuration,
            isRunning: false,
            phase: 'work', // 'work' | 'rest'
            currentSet: 1,
            maxSets: firstEx.defaultSets || 3
        };

        const modal = document.getElementById('workout-modal');
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');

        this.updateWorkoutUI();
        this.toggleWorkoutTimer(); // Sofort starten
    }

    updateWorkoutUI() {
        if (!this.activeWorkout) return;
        const { exercises, currentIndex, timeLeft, durationTotal, isRunning, phase, currentSet, maxSets } = this.activeWorkout;
        const currentEx = exercises[currentIndex];

        // Titel & Info
        document.getElementById('workout-ex-title').textContent = currentEx.title;
        document.getElementById('workout-ex-category').textContent = `${currentEx.categoryLabel} (Übung ${currentIndex + 1} von ${exercises.length})`;
        document.getElementById('workout-set-info').textContent = `Satz ${currentSet} von ${maxSets}`;
        document.getElementById('workout-instruction-hint').textContent = currentEx.instructions[0] || '';
        document.getElementById('workout-tip').textContent = `Tipp: ${currentEx.physioTip}`;

        // Phase Badge
        const phaseBadge = document.getElementById('workout-phase-badge');
        if (phase === 'work') {
            phaseBadge.textContent = currentEx.type === 'stretch-timer' ? 'Dehnung halten' : 'Aktiv üben';
            phaseBadge.className = 'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800';
        } else {
            phaseBadge.textContent = 'Verschnaufpause / Entlastung';
            phaseBadge.className = 'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 animate-pulse';
        }

        // Zeit-Text
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        document.getElementById('workout-time-display').textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

        // Kreisdiagramm Progress
        const circumference = 2 * Math.PI * 88; // r=88
        const percent = durationTotal > 0 ? (timeLeft / durationTotal) : 0;
        const strokeDashoffset = circumference * (1 - percent);
        const circleEl = document.getElementById('timer-progress-circle');
        if (circleEl) {
            circleEl.style.strokeDashoffset = strokeDashoffset;
            circleEl.style.stroke = phase === 'work' ? '#0d9488' : '#0284c7';
        }

        // Play / Pause Button Icon
        const playBtn = document.getElementById('workout-play-btn');
        if (isRunning) {
            playBtn.innerHTML = `
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            `;
        } else {
            playBtn.innerHTML = `
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            `;
        }
    }

    toggleWorkoutTimer() {
        if (!this.activeWorkout) return;
        physioAudio.init();

        if (this.activeWorkout.isRunning) {
            clearInterval(this.activeWorkout.timer);
            this.activeWorkout.isRunning = false;
            this.updateWorkoutUI();
        } else {
            this.activeWorkout.isRunning = true;
            physioAudio.playStart();
            this.updateWorkoutUI();

            this.activeWorkout.timer = setInterval(() => {
                if (this.activeWorkout.timeLeft > 1) {
                    this.activeWorkout.timeLeft--;
                    if (this.activeWorkout.timeLeft <= 3) {
                        physioAudio.playTick();
                    }
                    this.updateWorkoutUI();
                } else {
                    this.handleWorkoutPhaseTransition();
                }
            }, 1000);
        }
    }

    handleWorkoutPhaseTransition() {
        clearInterval(this.activeWorkout.timer);
        const { currentIndex, exercises, phase, currentSet, maxSets } = this.activeWorkout;
        const currentEx = exercises[currentIndex];

        if (phase === 'work') {
            // Arbeitsphase vorbei -> Satz erhöht oder Pause
            if (currentSet < maxSets) {
                // Kurze Satzpause
                physioAudio.playPause();
                this.activeWorkout.phase = 'rest';
                const restTime = currentEx.defaultRest || 20;
                this.activeWorkout.timeLeft = restTime;
                this.activeWorkout.durationTotal = restTime;
                this.activeWorkout.isRunning = true;
                this.updateWorkoutUI();

                this.activeWorkout.timer = setInterval(() => {
                    if (this.activeWorkout.timeLeft > 1) {
                        this.activeWorkout.timeLeft--;
                        if (this.activeWorkout.timeLeft <= 3) physioAudio.playTick();
                        this.updateWorkoutUI();
                    } else {
                        // Pause vorbei -> Nächster Satz
                        physioAudio.playStart();
                        this.activeWorkout.phase = 'work';
                        this.activeWorkout.currentSet++;
                        const isIso = currentEx.type === 'stretch-timer' || currentEx.type === 'isometric';
                        const workTime = isIso ? (currentEx.defaultHold || 35) : 45;
                        this.activeWorkout.timeLeft = workTime;
                        this.activeWorkout.durationTotal = workTime;
                        this.updateWorkoutUI();
                    }
                }, 1000);
            } else {
                // Alle Sätze für diese Übung beendet
                if (currentIndex < exercises.length - 1) {
                    // Nächste Übung in der Sequenz
                    physioAudio.playComplete();
                    this.activeWorkout.currentIndex++;
                    const nextEx = exercises[this.activeWorkout.currentIndex];
                    const isIso = nextEx.type === 'stretch-timer' || nextEx.type === 'isometric';
                    const workTime = isIso ? (nextEx.defaultHold || 35) : 45;
                    this.activeWorkout.phase = 'work';
                    this.activeWorkout.currentSet = 1;
                    this.activeWorkout.maxSets = nextEx.defaultSets || 3;
                    this.activeWorkout.timeLeft = workTime;
                    this.activeWorkout.durationTotal = workTime;
                    this.updateWorkoutUI();
                    this.toggleWorkoutTimer();
                } else {
                    // Ganzes Training abgeschlossen!
                    this.finishWorkout();
                }
            }
        }
    }

    skipWorkoutStep() {
        if (!this.activeWorkout) return;
        clearInterval(this.activeWorkout.timer);
        this.activeWorkout.timeLeft = 1;
        this.handleWorkoutPhaseTransition();
    }

    stopWorkout() {
        if (this.activeWorkout && this.activeWorkout.timer) {
            clearInterval(this.activeWorkout.timer);
        }
        this.activeWorkout = null;
        document.getElementById('workout-modal').classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    finishWorkout() {
        if (this.activeWorkout && this.activeWorkout.timer) {
            clearInterval(this.activeWorkout.timer);
        }
        physioAudio.playComplete();

        const completedExercises = this.activeWorkout ? this.activeWorkout.exercises.map(e => e.title) : [];
        this.stopWorkout();

        // Zeige Erfolgsmeldung & Möglichkeit zum Tagebucheintrag
        const promptSave = confirm(`Hervorragend gemacht! 🎉\n\nSie haben das Training erfolgreich absolviert. Möchten Sie diese Einheit direkt mit Ihrem aktuellen Schmerzlevel im Knie-Tagebuch speichern?`);
        if (promptSave) {
            const pain = prompt('Wie stark ist Ihr Knie-Schmerz jetzt nach der Einheit? (Skala 0 = schmerzfrei bis 10 = sehr stark)', '2');
            const painScore = parseInt(pain, 10);
            this.addDiaryEntry(
                isNaN(painScore) ? 2 : painScore,
                completedExercises.join(', '),
                'Erfolgreich absolviertes Training'
            );
            this.switchTab('diary');
        }
    }

    // =========================================================================
    // SYMPTOM-CHECK / ASSISTENT LOGIK
    // =========================================================================
    setupAssessmentListeners() {
        const form = document.getElementById('symptom-check-form');
        if (!form) return;

        // Pain Slider Live Update
        const painSlider = document.getElementById('pain-range-input');
        const painValDisplay = document.getElementById('pain-range-value');
        if (painSlider && painValDisplay) {
            painSlider.addEventListener('input', (e) => {
                painValDisplay.textContent = `${e.target.value} / 10`;
                physioConsultant.assessmentData.painLevel = parseInt(e.target.value, 10);
            });
        }

        // Form Submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Werte einsammeln
            const locationInput = form.querySelector('input[name="knee-location"]:checked');
            const triggerInput = form.querySelector('input[name="knee-trigger"]:checked');
            const swellingInput = form.querySelector('input[name="knee-swelling"]:checked');

            physioConsultant.assessmentData.location = locationInput ? locationInput.value : 'front';
            physioConsultant.assessmentData.trigger = triggerInput ? triggerInput.value : 'stairs';
            physioConsultant.assessmentData.inflammation = swellingInput && swellingInput.value === 'yes';

            const result = physioConsultant.evaluateAssessment();
            this.displayAssessmentResult(result);
        });
    }

    displayAssessmentResult(result) {
        const resultContainer = document.getElementById('assessment-result-container');
        if (!resultContainer) return;

        let warningBannerHtml = '';
        if (result.cautionNotice) {
            warningBannerHtml = `
                <div class="mb-4 p-4 rounded-xl bg-red-50 border-l-4 border-red-500 text-red-900">
                    <div class="flex items-start gap-3">
                        <span class="text-xl">🚨</span>
                        <div>
                            <h4 class="font-bold text-sm">Wichtiger Sicherheitshinweis</h4>
                            <p class="text-xs leading-relaxed mt-0.5">${result.cautionNotice}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        const matchingExercises = EXERCISES.filter(ex => result.recommendedExerciseIds.includes(ex.id));

        resultContainer.innerHTML = `
            <div class="bg-white rounded-2xl border border-teal-200 p-6 md:p-8 shadow-sm">
                ${warningBannerHtml}
                
                <div class="flex items-center gap-2 mb-2">
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                        Physio-Einschätzung
                    </span>
                    <span class="text-xs text-slate-500 font-medium">VAS-Schmerzscore: ${result.painLevel}/10</span>
                </div>

                <h3 class="text-xl font-bold text-slate-900 mb-2">${result.diagnosisHint}</h3>
                <p class="text-sm text-slate-700 leading-relaxed mb-6">${result.recommendationText}</p>

                <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span>⭐</span> Speziell für Sie empfohlene Übungen:
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    ${matchingExercises.map(ex => `
                        <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                            <div>
                                <h5 class="text-xs font-bold text-slate-900">${ex.title}</h5>
                                <span class="text-[11px] text-slate-500">${ex.duration}</span>
                            </div>
                            <button onclick="app.startSingleWorkout('${ex.id}')" class="px-2.5 py-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                                Start
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="flex flex-wrap items-center gap-3">
                    <button onclick="app.startPlanWorkout(${JSON.stringify(result.recommendedExerciseIds)})" class="flex-1 min-w-[200px] py-3 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-600/20">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
                        Gesamtes empfohlenes Programm starten
                    </button>
                    <button onclick="window.print()" class="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                        Als Plan drucken
                    </button>
                </div>
            </div>
        `;

        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    startPlanWorkout(exerciseIds) {
        const list = EXERCISES.filter(ex => exerciseIds.includes(ex.id));
        if (list.length > 0) {
            this.startWorkoutSession(list);
        }
    }

    // =========================================================================
    // PHYSIO-CHATBOT LOGIK
    // =========================================================================
    sendChatMessage(customText = null) {
        const input = document.getElementById('consultant-chat-input');
        const text = customText || (input ? input.value.trim() : '');
        if (!text) return;

        if (input) input.value = '';

        // User Message hinzufügen
        physioConsultant.chatHistory.push({
            sender: 'user',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        this.renderChatMessages();

        // Physio Response generieren
        setTimeout(() => {
            const answer = physioConsultant.askConsultant(text);
            physioConsultant.chatHistory.push({
                sender: 'physio',
                text: answer,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            this.renderChatMessages();
        }, 300);
    }

    renderChatMessages() {
        const container = document.getElementById('chat-messages-container');
        if (!container) return;

        container.innerHTML = physioConsultant.chatHistory.map(msg => {
            const isPhysio = msg.sender === 'physio';
            return `
                <div class="flex items-start gap-3 ${isPhysio ? '' : 'flex-row-reverse'}">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full ${isPhysio ? 'bg-teal-600 text-white' : 'bg-slate-300 text-slate-700'} flex items-center justify-center text-xs font-bold">
                        ${isPhysio ? 'PT' : 'Du'}
                    </div>
                    <div class="max-w-[82%] rounded-2xl p-4 ${isPhysio ? 'bg-slate-100 text-slate-800 rounded-tl-none' : 'bg-teal-600 text-white rounded-tr-none'} text-sm leading-relaxed shadow-sm">
                        <div class="whitespace-pre-line">${msg.text}</div>
                        <span class="text-[10px] mt-1.5 block ${isPhysio ? 'text-slate-400' : 'text-teal-200'} text-right">
                            ${msg.timestamp}
                        </span>
                    </div>
                </div>
            `;
        }).join('');

        container.scrollTop = container.scrollHeight;
    }

    // =========================================================================
    // TAGEBUCH & LOCALSTORAGE
    // =========================================================================
    loadDiary() {
        try {
            const data = localStorage.getItem('knievital_diary');
            if (data) return JSON.parse(data);
        } catch (e) {
            console.warn('LocalStorage error:', e);
        }
        return [
            {
                id: '1',
                date: new Date(Date.now() - 86400000).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                painLevel: 4,
                exercises: 'Fersenschleifen, Quad-Sets, Hamstring-Dehnung',
                note: 'Knie fühlte sich nach den Dehnungen spürbar freier an.'
            }
        ];
    }

    saveDiary() {
        try {
            localStorage.setItem('knievital_diary', JSON.stringify(this.diaryEntries));
        } catch (e) {
            console.warn('Could not save to LocalStorage:', e);
        }
    }

    addDiaryEntry(painLevel, exercises, note) {
        const newEntry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            painLevel: painLevel,
            exercises: exercises,
            note: note
        };
        this.diaryEntries.unshift(newEntry);
        this.saveDiary();
        this.renderDiary();
    }

    deleteDiaryEntry(id) {
        this.diaryEntries = this.diaryEntries.filter(e => e.id !== id);
        this.saveDiary();
        this.renderDiary();
    }

    renderDiary() {
        const container = document.getElementById('diary-entries-list');
        if (!container) return;

        if (this.diaryEntries.length === 0) {
            container.innerHTML = `
                <div class="text-center py-10 text-slate-400 text-sm">
                    Noch keine Einträge vorhanden. Tragen Sie nach dem Training Ihr Schmerzlevel ein, um Ihren Fortschritt zu verfolgen!
                </div>
            `;
            return;
        }

        container.innerHTML = this.diaryEntries.map(entry => {
            const painColor = entry.painLevel <= 3 ? 'bg-emerald-100 text-emerald-800' :
                              entry.painLevel <= 6 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800';

            return `
                <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 mb-1.5">
                            <span class="text-xs font-bold text-slate-500">${entry.date}</span>
                            <span class="px-2 py-0.5 rounded-full text-xs font-bold ${painColor}">
                                Schmerz: ${entry.painLevel}/10
                            </span>
                        </div>
                        <p class="text-sm font-semibold text-slate-800 mb-1">
                            ${entry.exercises || 'Keine spezifischen Übungen notiert'}
                        </p>
                        ${entry.note ? `<p class="text-xs text-slate-600 italic">"${entry.note}"</p>` : ''}
                    </div>
                    <button onclick="app.deleteDiaryEntry('${entry.id}')" class="text-slate-300 hover:text-rose-500 p-1 rounded transition-colors" title="Eintrag löschen">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            `;
        }).join('');
    }

    // =========================================================================
    // RED FLAGS & WISSEN BEREICHE
    // =========================================================================
    renderRedFlags() {
        const container = document.getElementById('red-flags-container');
        if (!container) return;

        container.innerHTML = MEDICAL_RED_FLAGS.map(flag => `
            <div class="flex items-start gap-3 p-3 bg-red-50/60 rounded-xl border border-red-100">
                <span class="text-rose-500 flex-shrink-0 mt-0.5">⚠️</span>
                <div>
                    <h5 class="text-xs font-bold text-red-950">${flag.title}</h5>
                    <p class="text-xs text-red-800 mt-0.5">${flag.desc}</p>
                </div>
            </div>
        `).join('');
    }

    renderKnowledgeCards() {
        const container = document.getElementById('knowledge-faq-container');
        if (!container) return;

        container.innerHTML = PHYSIO_KNOWLEDGE.map((item, idx) => `
            <details class="bg-white rounded-xl border border-slate-200 overflow-hidden group">
                <summary class="p-4 cursor-pointer font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <span class="pr-4">${item.q}</span>
                    <svg class="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div class="p-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    ${item.a}
                </div>
            </details>
        `).join('');
    }

    setFilter(cat) {
        this.activeFilter = cat;
        const buttons = document.querySelectorAll('.exercise-filter-btn');
        buttons.forEach(btn => {
            const isActive = btn.dataset.filter === cat;
            btn.classList.toggle('bg-teal-600', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('bg-slate-100', !isActive);
            btn.classList.toggle('text-slate-700', !isActive);
        });

        // Übungen filtern
        const cards = document.querySelectorAll('#all-exercises-grid .exercise-card');
        cards.forEach(card => {
            const exId = card.dataset.id;
            const ex = EXERCISES.find(e => e.id === exId);
            if (!ex) return;
            const visible = cat === 'all' || ex.category === cat;
            card.classList.toggle('hidden', !visible);
        });
    }

    setupEventListeners() {
        this.setupAssessmentListeners();

        // Diary Form Listener
        const diaryForm = document.getElementById('new-diary-entry-form');
        if (diaryForm) {
            diaryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const painVal = parseInt(document.getElementById('diary-pain-input').value, 10) || 3;
                const noteVal = document.getElementById('diary-note-input').value;
                const exVal = document.getElementById('diary-exercises-input').value || 'Eigenübung';

                this.addDiaryEntry(painVal, exVal, noteVal);
                diaryForm.reset();
            });
        }
    }
}

// Initialisiere die App nach dem Laden des DOM
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new KnieTherapyApp();
});
