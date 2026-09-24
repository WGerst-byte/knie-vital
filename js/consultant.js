/**
 * KnieVital - Digitaler Physio-Berater (Consultant Module)
 * Beinhaltet Symptom-Check, Anamnese-Logik, Red-Flag-Erkennung und interaktive Beratung
 */

class PhysioConsultant {
    constructor() {
        this.assessmentData = {
            location: null,
            trigger: null,
            inflammation: false,
            painLevel: 3,
            redFlagDetected: false
        };

        this.chatHistory = [
            {
                sender: 'physio',
                text: 'Herzlich willkommen! Ich bin Ihr digitaler Physio-Berater. Wie kann ich Ihnen und Ihrem Knie heute helfen? Sie können mir unten eine Frage stellen oder direkt unseren geführten Symptom-Check durchlaufen.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ];

        this.knowledgeBase = [
            {
                keywords: ['joggen', 'laufen', 'jogging', 'rennen', 'marathon'],
                response: 'Beim Joggen wirkt bei jedem Schritt das 3- bis 5-fache Körpergewicht auf das Kniegelenk. Bei akuten Schmerzen empfehle ich eine Laufpause und den Umstieg auf gelenkschonende Alternativen wie Radfahren mit geringem Tretwiderstand, Kraulschwimmen oder den Crosstrainer. Sobald Sie schmerzfrei sind, sollte die rückwärtige Kette (Wade, Hamstrings, Gesäß) gestärkt werden, bevor Sie schrittweise mit Geh-Lauf-Intervallen wieder einsteigen.'
            },
            {
                keywords: ['wärme', 'kälte', 'eis', 'kühlen', 'wärmflasche', 'rotlicht'],
                response: 'Hier gilt die physiotherapeutische Grundregel:\n• **KÄLTE (10–15 Min.)**: Bei frischen Reizungen, Schwellungen, Hitzegefühl oder stechendem Schmerz nach Belastung. Bitte Eis nie direkt auf die nackte Haut legen!\n• **WÄRME (20–30 Min.)**: Bei chronischen Verspannungen, steifem Gelenk am Morgen und muskulären Verhärtungen an Oberschenkel oder Wade.'
            },
            {
                keywords: ['bandage', 'orthese', 'tape', 'kinesiotape', 'stütze'],
                response: 'Kniebandagen (z.B. mit Pelotte) können das Sicherheitsgefühl und die Propriozeption (Eigenwahrnehmung des Gelenks) deutlich verbessern. Sie entlasten temporär bei Spaziergängen oder Belastung. Wichtig: Eine Bandage ersetzt kein Muskeltraining! Tragen Sie sie nicht rund um die Uhr, da sonst die stabilisierende Oberschenkelmuskulatur faul werden kann.'
            },
            {
                keywords: ['fahrrad', 'radfahren', 'ergometer', 'spinning'],
                response: 'Fahrradfahren auf ebener Strecke oder auf dem Hometrainer ist eine der besten Therapien für das Knie! Durch die kreisende, stoßfreie Bewegung wird der Gelenkknorpel optimal mit Nährflüssigkeit („Gelenkschmiere“) versorgt, ohne dass Gewicht auf den Gelenkflächen lastet. Tipp: Stellen Sie den Sattel so hoch ein, dass das Knie am tiefsten Punkt des Pedals noch minimal gebeugt ist.'
            },
            {
                keywords: ['knacken', 'knirschen', 'geräusch', 'krepitus', 'knackt'],
                response: 'Gelenkgeräusche (Krepitus) klingen oft dramatischer als sie sind. Solange das Knacken nicht wehtut und das Knie nicht blockiert, handelt es sich meist um das harmlose Platzen winziger Gasbläschen in der Gelenkflüssigkeit oder um Sehnen, die sich kurz spannen. Trainieren Sie beruhigt weiter!'
            },
            {
                keywords: ['arthrose', 'gonarthrose', 'knorpel', 'abnutzung', 'knorpelschaden'],
                response: 'Kniearthrose bedeutet nicht, dass Sie sich schonen müssen – im Gegenteil! Knorpel ernährt sich wie ein Schwamm ausschließlich durch Bewegung und Be-/Entlastung. Sanfte Mobilisation (wie das Fersenschleifen) und Isometrie (Kniekehlendruck) fördern den Erhalt des Knorpels und lindern nachweislich Schmerzen.'
            },
            {
                keywords: ['treppe', 'treppen', 'bergab', 'bergauf', 'stufen'],
                response: 'Schmerzen beim Treppenabwärtsgehen deuten häufig auf das vordere Kniekompartiment hin (Patellofemorales Schmerzsyndrom oder retropatellare Arthrose). Dehnen Sie regelmäßig Ihren Quadrizeps und kräftigen Sie das Gesäß (z.B. mit der Beckenbrücke), um die Kniescheibe in einer sauberen Gleitrinne zu führen.'
            },
            {
                keywords: ['meniskus', 'meniskusriss', 'innenmeniskus', 'außenmeniskus'],
                response: 'Bei Meniskusbeschwerden (besonders degenerativen Rissen) zeigt die moderne Forschung, dass ein gezieltes physiotherapeutisches Kraft- und Koordinationstraining oft genauso effektiv ist wie eine Operation. Vermeiden Sie tiefe Kniebeugen und extreme Drehungen unter Last. Beginnen Sie mit leichten isometrischen Spannungsübungen.'
            }
        ];
    }

    resetAssessment() {
        this.assessmentData = {
            location: null,
            trigger: null,
            inflammation: false,
            painLevel: 3,
            redFlagDetected: false
        };
    }

    evaluateAssessment() {
        const { location, trigger, inflammation, painLevel } = this.assessmentData;
        let diagnosisHint = '';
        let priorityCategory = 'light';
        let recommendationText = '';
        let recommendedExerciseIds = [];
        let cautionNotice = null;

        // 1. Akute Entzündung oder hoher Schmerz
        if (inflammation || painLevel >= 8) {
            cautionNotice = 'Achtung: Akute Entzündungszeichen oder starke Schmerzen festgestellt! Wenden Sie die PECH-Regel an (Pause, Eis, Compression, Hochlagern). Verzichten Sie auf anstrengendes Training und suchen Sie bei anhaltenden Beschwerden einen Facharzt auf.';
            priorityCategory = 'light';
            diagnosisHint = 'Akuter Reizzustand / Entzündungsphase';
            recommendationText = 'Jetzt gilt: Vorrangig schonende Schmerzlinderung und minimale Bewegung ohne Last, um ein Einsteifen zu verhindern.';
            recommendedExerciseIds = ['quad-sets', 'seated-knee-extension'];
            return {
                diagnosisHint,
                priorityCategory,
                recommendationText,
                recommendedExerciseIds,
                cautionNotice,
                painLevel
            };
        }

        // 2. Differenzierung nach Lokalisation & Auslöser
        if (location === 'outer' || trigger === 'running') {
            diagnosisHint = 'Verdacht auf Reizung des Außenseiten-Trakts (Iliotibiales Bandsyndrom / „Läuferknie“)';
            recommendationText = 'Der Schwerpunkt liegt auf gezielter Dehnung der Oberschenkel-Außenseite (IT-Band) und Aktivierung der Gesäß-Stabilisatoren.';
            recommendedExerciseIds = ['it-band-stretch', 'gentle-bridge', 'hamstring-stretch', 'quad-sets'];
            priorityCategory = 'stretch';
        } else if (location === 'front' || trigger === 'stairs') {
            diagnosisHint = 'Vorderer Knieschmerz / Patellofemorale Reizung oder Knorpeldruck';
            recommendationText = 'Wichtig ist hier die Entlastung des Zugs auf die Kniescheibe durch Oberschenkeldehnung gepaart mit isometrischer Kräftigung des Vastus medialis.';
            recommendedExerciseIds = ['quad-sets', 'quad-stretch-lying', 'gentle-bridge', 'seated-knee-extension'];
            priorityCategory = 'light';
        } else if (location === 'back' || trigger === 'sitting') {
            diagnosisHint = 'Verkürzung der rückwärtigen Muskelkette oder Kapselüberlastung';
            recommendationText = 'Fokus auf sanfte Mobilisation der Beugung/Streckung und Dehnung von Hamstrings sowie Wadenmuskulatur.';
            recommendedExerciseIds = ['heel-slides', 'hamstring-stretch', 'calf-wall-stretch', 'supported-calf-raise'];
            priorityCategory = 'stretch';
        } else if (trigger === 'morning') {
            diagnosisHint = 'Klassischer Anlaufschmerz (häufig bei degenerativen Veränderungen / Gonarthrose)';
            recommendationText = 'Das Gelenk profitiert morgens von sanften Kreis- und Gleitbewegungen zur Schmierung des Knorpels vor der ersten Belastung.';
            recommendedExerciseIds = ['heel-slides', 'seated-knee-extension', 'quad-sets', 'hamstring-stretch'];
            priorityCategory = 'light';
        } else {
            diagnosisHint = 'Allgemeine Kniegelenks-Überlastung & muskuläre Dysbalance';
            recommendationText = 'Ein ausgeglichenes Programm aus sanfter Mobilisation, leichter Kräftigung und Dehnung führt meist rasch zur Besserung.';
            recommendedExerciseIds = ['heel-slides', 'quad-sets', 'hamstring-stretch', 'calf-wall-stretch', 'gentle-bridge'];
            priorityCategory = 'all';
        }

        return {
            diagnosisHint,
            priorityCategory,
            recommendationText,
            recommendedExerciseIds,
            cautionNotice,
            painLevel
        };
    }

    askConsultant(query) {
        const cleanQuery = query.toLowerCase().trim();
        if (!cleanQuery) return null;

        // Suche nach passender Antwort
        for (const item of this.knowledgeBase) {
            const hasMatch = item.keywords.some(kw => cleanQuery.includes(kw));
            if (hasMatch) {
                return item.response;
            }
        }

        // Standard-Antwort bei allgemeiner Frage
        return `Das ist eine wichtige Frage zum Knie. Aus physiotherapeutischer Sicht gilt: Hören Sie auf Ihr Schmerzfeedback. Ein Dehn- oder Anstrengungsgefühl bis Stufe 4 auf der 10er-Skala ist normal. Stechender, brennender Schmerz oder ein Gefühl des Wegknickens ist ein Signal zum Stoppen. 

Wählen Sie oben im Menü unsere **Leichten Übungen** oder **Dehnungsübungen** aus, oder nutzen Sie den geführten **Symptom-Check** für einen maßgeschneiderten Plan.`;
    }
}

const physioConsultant = new PhysioConsultant();
