/**
 * KnieVital - Übungsdatenbank
 * Evidenzbasierte Übungen für Knie-Patienten (Mobilisation, Isometrie, Dehnung)
 */

const EXERCISES = [
    // ==========================================
    // KATEGORIE 1: LEICHTE ÜBUNGEN FÜR KNIE-PATIENTEN
    // ==========================================
    {
        id: 'heel-slides',
        title: 'Fersenschleifen im Liegen (Heel Slides)',
        category: 'light',
        categoryLabel: 'Leichte Übung / Mobilisation',
        badgeColor: 'blue',
        difficulty: 'Sehr leicht',
        targetMuscles: ['Quadrizeps', 'Ischiocrurale Muskeln (Beinbeuger)', 'Kniekapsel'],
        equipment: 'Matte oder glatter Boden (Socken oder Handtuch)',
        duration: '10–12 Wdh. pro Bein | 2–3 Sätze',
        type: 'reps',
        defaultReps: 12,
        defaultSets: 3,
        defaultRest: 30,
        whyItHelps: 'Fördert sanft die Produktion von Gelenkschmiere (Synovialflüssigkeit) und verbessert die Beugung und Streckung ohne Gelenkstauchung.',
        instructions: [
            'Legen Sie sich flach und entspannt auf den Rücken.',
            'Das nicht betroffene Bein kann aufgestellt oder gestreckt bleiben.',
            'Ziehen Sie nun die Ferse des betroffenen Beins langsam und kontrolliert über den Boden in Richtung Gesäß.',
            'Beugen Sie das Knie nur so weit, wie es schmerzfrei oder maximal mit einem leichten Dehnungsgefühl möglich ist.',
            'Halten Sie die Position für 2–3 Sekunden und gleiten Sie dann kontrolliert zurück in die Streckung.'
        ],
        precautions: 'Keine ruckartigen Bewegungen; bei stechendem Schmerz den Bewegungsumfang sofort verringern.',
        physioTip: 'Ein Handtuch unter der Ferse auf glattem Boden verringert den Reibungswiderstand spürbar und schont das Gelenk!',
        suitability: ['Arthrose', 'Postoperativ', 'Anlaufschmerz', 'Reizknie'],
        painTolerance: 'Bis Stufe 4/10 erlaubt (Wohlfühlschmerz/Dehngefühl)'
    },
    {
        id: 'quad-sets',
        title: 'Isometrischer Kniekehlendruck (Quad-Set)',
        category: 'light',
        categoryLabel: 'Leichte Übung / Isometrische Kräftigung',
        badgeColor: 'emerald',
        difficulty: 'Sehr leicht',
        targetMuscles: ['M. vastus medialis (innerer Oberschenkelmuskel)', 'Quadrizeps'],
        equipment: 'Gerolltes Handtuch',
        duration: '10 Wdh. à 5–8 Sek. Haltezeit | 3 Sätze',
        type: 'isometric',
        defaultHold: 6,
        defaultReps: 10,
        defaultSets: 3,
        defaultRest: 30,
        whyItHelps: 'Aktiviert und kräftigt den wichtigsten Stabilisator der Kniescheibe (Vastus Medialis), ganz ohne Reibung oder Belastung im Knorpelbereich.',
        instructions: [
            'Setzen Sie sich mit lang nach vorne ausgestreckten Beinen auf den Boden oder ins Bett.',
            'Legen Sie ein kleines, gerolltes Handtuch direkt unter Ihre Kniekehle.',
            'Ziehen Sie die Fußspitze sanft zu sich heran.',
            'Drücken Sie nun die Kniekehle aktiv und gleichmäßig nach unten in das Handtuch, sodass der vordere Oberschenkelmuskel spürbar anspannt.',
            'Halten Sie diese feste Spannung für 5 bis 8 Sekunden und atmen Sie dabei ruhig weiter.',
            'Lösen Sie die Spannung langsam für 3 Sekunden Pause, bevor die nächste Wiederholung startet.'
        ],
        precautions: 'Halten Sie während der Anspannung nicht die Luft an (keine Pressatmung).',
        physioTip: 'Tasten Sie mit Ihren Fingern an die Innenseite oberhalb der Kniescheibe – Sie sollten spüren, wie die Muskulatur dort fest wie ein Stein wird.',
        suitability: ['Patellaspitzensyndrom', 'Gonalgie', 'Kniearthrose', 'Schwellungszustände'],
        painTolerance: 'Sehr schonend, nahezu schmerzfrei durchführbar'
    },
    {
        id: 'straight-leg-raise',
        title: 'Gerades Beinheben (Straight Leg Raise)',
        category: 'light',
        categoryLabel: 'Leichte Übung / Kräftigung',
        badgeColor: 'emerald',
        difficulty: 'Leicht',
        targetMuscles: ['Quadrizeps femoris', 'M. iliopsoas (Hüftbeuger)', 'Rumpfstabilisatoren'],
        equipment: 'Übungsmatte',
        duration: '10–12 Wdh. pro Bein | 2–3 Sätze',
        type: 'reps',
        defaultReps: 10,
        defaultSets: 3,
        defaultRest: 35,
        whyItHelps: 'Stärkt die Oberschenkelvorderseite und Hüfte in funktioneller Streckung, ohne dass die Kniescheibe über den Knorpel des Oberschenkels gleitet.',
        instructions: [
            'Legen Sie sich auf den Rücken. Das gesunde Bein stellen Sie gebeugt auf, um den unteren Rücken zu entlasten.',
            'Das betroffene Knie wird vollständig gestreckt und die Zehenspitzen zum Schienbein herangezogen.',
            'Heben Sie nun das vollkommen gestreckte Bein etwa 20 bis 30 cm vom Boden an (nicht höher als der Oberschenkel des aufgestellten Beins).',
            'Halten Sie das Bein für 2–3 Sekunden am obersten Punkt.',
            'Senken Sie das Bein langsam und kontrolliert ab, ohne es komplett schwer abzulegen, und wiederholen Sie die Bewegung.'
        ],
        precautions: 'Das Knie darf beim Anheben nicht einknicken. Bleibt eine Kniestreckung nicht möglich, die Höhe reduzieren.',
        physioTip: 'Achten Sie darauf, dass Ihr unterer Rücken stabil am Boden bleibt und kein Hohlkreuz entsteht.',
        suitability: ['Kreuzband-Reha', 'Arthrose', 'Meniskusbeschwerden', 'Allgemeine Knieschwäche'],
        painTolerance: 'Bis Stufe 3/10'
    },
    {
        id: 'seated-knee-extension',
        title: 'Kniestreckung im Sitzen (Terminal Knee Extension)',
        category: 'light',
        categoryLabel: 'Leichte Übung / Mobilisation & Kraft',
        badgeColor: 'blue',
        difficulty: 'Sehr leicht',
        targetMuscles: ['M. vastus medialis', 'Quadrizeps'],
        equipment: 'Stabiler Stuhl',
        duration: '12–15 Wdh. pro Bein | 3 Sätze',
        type: 'reps',
        defaultReps: 12,
        defaultSets: 3,
        defaultRest: 30,
        whyItHelps: 'Ideal für den Alltag: Aktiviert die Streckmuskeln im schmerzarmen Winkelbereich und fördert die Durchblutung.',
        instructions: [
            'Setzen Sie sich aufrecht auf einen stabilen Stuhl. Die Oberschenkel liegen bequem auf, die Füße stehen am Boden.',
            'Strecken Sie langsam ein Knie nach vorne aus, bis das Bein horizontal steht.',
            'Ziehen Sie dabei die Zehenspitzen aktiv zu sich heran.',
            'Halten Sie die gestreckte Position für 3 Sekunden und spannen Sie den Oberschenkel bewusst an.',
            'Führen Sie das Bein langsam und kontrolliert wieder zurück in die Ausgangsposition.'
        ],
        precautions: 'Oberkörper ruhig halten und nicht nach hinten ins Hohlkreuz fallen.',
        physioTip: 'Diese Übung eignet sich hervorragend als kleine 2-Minuten-Pause während der Schreibtischarbeit.',
        suitability: ['Anlaufschmerzen', 'Büroalltag', 'Leichte bis mittlere Arthrose', 'Ältere Patienten'],
        painTolerance: 'Sehr gut tolerierbar'
    },
    {
        id: 'gentle-bridge',
        title: 'Sanfte Beckenbrücke (Glute Bridge)',
        category: 'light',
        categoryLabel: 'Leichte Übung / Funktionelle Stabilität',
        badgeColor: 'emerald',
        difficulty: 'Leicht',
        targetMuscles: ['M. gluteus maximus (Gesäß)', 'Ischiocrurale Muskeln', 'Beckenstabilisatoren'],
        equipment: 'Matte',
        duration: '10–12 Wdh. | 2–3 Sätze',
        type: 'reps',
        defaultReps: 10,
        defaultSets: 3,
        defaultRest: 40,
        whyItHelps: 'Ein schwaches Gesäß führt oft dazu, dass das Knie nach innen kollabiert (Valgusstress). Die Brücke schützt das Knie durch Aufbau der rückwärtigen Kraftkette.',
        instructions: [
            'Rückenlage mit angewinkelten Beinen, die Füße stehen etwa hüftbreit flach auf dem Boden.',
            'Die Arme liegen entspannt seitlich neben dem Körper.',
            'Spannen Sie das Gesäß fest an und heben Sie das Becken an, bis Oberschenkel und Rumpf eine gerade Linie bilden.',
            'Die Knie bleiben parallel und kippen weder nach innen noch nach außen.',
            'Halten Sie die Brücke oben für 3 Sekunden und senken Sie das Becken langsam wieder ab.'
        ],
        precautions: 'Wenn Sie Druck vorne im Knie spüren, stellen Sie die Füße ca. 5 cm weiter weg vom Gesäß auf.',
        physioTip: 'Stellen Sie sich vor, Sie klemmen eine Münze zwischen Ihren Gesäßhälften ein – das garantiert maximale Aktivierung des Gluteus.',
        suitability: ['Patellofemorales Schmerzsyndrom', 'Läuferknie', 'Instabilitätsgefühl'],
        painTolerance: 'Sehr schonend fürs Kniegelenk'
    },
    {
        id: 'supported-calf-raise',
        title: 'Geführtes Fersenheben (Wadenheber im Stand)',
        category: 'light',
        categoryLabel: 'Leichte Übung / Achsenstabilität',
        badgeColor: 'blue',
        difficulty: 'Leicht',
        targetMuscles: ['M. gastrocnemius & M. soleus (Wadenmuskulatur)', 'Achillessehne', 'Sprunggelenk'],
        equipment: 'Stuhllehne, Tischkante oder Wand zur Abstützung',
        duration: '15 Wdh. | 2–3 Sätze',
        type: 'reps',
        defaultReps: 15,
        defaultSets: 3,
        defaultRest: 30,
        whyItHelps: 'Verbessert die Beinachsenführung beim Gehen und entlastet das Kniegelenk bei der Stoßdämpfung im Alltag.',
        instructions: [
            'Stellen Sie sich hüftbreit hin und halten Sie sich mit beiden Händen leicht an einer Stuhllehne oder Wand fest.',
            'Die Knie sind minimal gebeugt („weich“), niemals starr durchgedrückt.',
            'Drücken Sie sich langsam und kontrolliert auf die Fußballen nach oben.',
            'Halten Sie die höchste Position für 2 Sekunden.',
            'Senken Sie die Fersen langsam und gedämpft wieder ab, kurz vor dem Boden wieder neu ansetzen.'
        ],
        precautions: 'Nicht nach außen über die kleinen Zehen abrollen; Druck gleichmäßig über Großzehengrundgelenk verteilen.',
        physioTip: 'Eine starke Wade federt bei jedem Schritt das Dreifache des Körpergewichts ab, bevor die Kraft das Knie erreicht!',
        suitability: ['Instabilität', 'Gangunsicherheit', 'Chronische Knieschmerzen', 'Arthrose'],
        painTolerance: 'Sehr sicher'
    },

    // ==========================================
    // KATEGORIE 2: DEHNUNGSÜBUNGEN BEI KNIESCHMERZEN
    // ==========================================
    {
        id: 'hamstring-stretch',
        title: 'Dehnung der Oberschenkelrückseite (Beinbeuger)',
        category: 'stretch',
        categoryLabel: 'Dehnungsübung / Entlastung Kniegelenk',
        badgeColor: 'amber',
        difficulty: 'Leicht',
        targetMuscles: ['Ischiocrurale Muskulatur (Hamstrings)', 'Kniekehle'],
        equipment: 'Stuhl oder Hocker',
        duration: '2–3 x 30–45 Sek. pro Seite',
        type: 'stretch-timer',
        defaultHold: 35,
        defaultReps: 3,
        defaultSets: 1,
        defaultRest: 15,
        whyItHelps: 'Verkürzte Rückseitenmuskeln ziehen das Knie permanent in eine leichte Beugestellung und erhöhen den Druck zwischen Oberschenkel und Schienbeinkopf enorm.',
        instructions: [
            'Setzen Sie sich auf die vordere Kante eines stabilen Stuhls.',
            'Strecken Sie das zu dehnende Bein nach vorne aus, die Ferse setzt am Boden auf, die Fußspitze zeigt nach oben.',
            'Das andere Bein bleibt angewinkelt zur Stabilisierung.',
            'Halten Sie den Rücken kerzengerade und kippen Sie nun Ihren Oberkörper aus dem Hüftgelenk langsam nach vorne.',
            'Sie sollten ein deutliches, angenehmes Ziehen in der Oberschenkelrückseite und ggf. Kniekehle spüren.',
            'Atmen Sie tief in den Bauch ein und halten Sie die Position für mindestens 30 Sekunden.'
        ],
        precautions: 'Keinen Rundrücken machen! Es geht um die Hüftbeugung, nicht darum, mit den Händen den Fuß zu berühren.',
        physioTip: 'Ziehen Sie die Zehenspitzen zusätzlich sanft heran – damit dehnen Sie zusätzlich den Nervus Ischiadicus in einem sicheren Maß mit.',
        suitability: ['Morgendliche Kniesteife', 'Baker-Zyste (schonend)', 'Knorpeldruck', 'Beckenschiefstand'],
        painTolerance: 'Wohlfühldehnung (Skala 4-5/10), kein pochender Schmerz'
    },
    {
        id: 'quad-stretch-lying',
        title: 'Sanfte Quadrizeps-Dehnung (Oberschenkelvorderseite)',
        category: 'stretch',
        categoryLabel: 'Dehnungsübung / Kniescheiben-Entlastung',
        badgeColor: 'amber',
        difficulty: 'Mittelleicht',
        targetMuscles: ['M. rectus femoris', 'Quadrizeps', 'Patellarsehne'],
        equipment: 'Matte oder Bett, optional Gürtel/Schal als Verlängerung',
        duration: '2–3 x 30–45 Sek. pro Seite',
        type: 'stretch-timer',
        defaultHold: 35,
        defaultReps: 3,
        defaultSets: 1,
        defaultRest: 15,
        whyItHelps: 'Ein zu straffer Quadrizeps presst die Kniescheibe wie eine Schraubzwinge in ihr Gleitlager (Femurtrochlea). Dehnung nimmt diesen Dauerdruck sofort weg.',
        instructions: [
            'Legen Sie sich in eine bequeme Seitenlage (auf die nicht betroffene Seite).',
            'Winkeln Sie das untere Bein um 90 Grad an – das schützt Ihren unteren Rücken vor dem Hohlkreuz.',
            'Greifen Sie mit der oberen Hand das obere Fußgelenk (oder nutzen Sie eine Schlinge/Gürtel um den Fuß).',
            'Führen Sie die Ferse behutsam in Richtung Gesäß.',
            'Schieben Sie nun gleichzeitig Ihr Becken leicht nach vorne und halten Sie das Knie in einer geraden Linie mit dem Rumpf.',
            'Halten Sie die gleichmäßige Dehnung ohne zu wippen für 30 bis 40 Sekunden.'
        ],
        precautions: 'Vermeiden Sie ein starkes Hohlkreuz. Die Dehnung soll vorne im Oberschenkel spürbar sein, nicht als stechender Druck im Gelenk.',
        physioTip: 'Wenn die Hand den Fuß nicht erreicht: Wickeln Sie ein Badetuch oder einen Gürtel um das Sprunggelenk als bequeme Zughilfe.',
        suitability: ['Patellaspitzensyndrom (Jumper’s Knee)', 'Retropatellare Arthrose', 'Treppenschmerz'],
        painTolerance: 'Dehnungszug 4–6/10; bei Kniescheibenstich sofort den Zug reduzieren.'
    },
    {
        id: 'calf-wall-stretch',
        title: 'Wadendehnung an der Wand (Gastrocnemius & Soleus)',
        category: 'stretch',
        categoryLabel: 'Dehnungsübung / Zugentlastung',
        badgeColor: 'amber',
        difficulty: 'Sehr leicht',
        targetMuscles: ['M. gastrocnemius', 'Achillessehne', 'Kapsel der Kniekehle'],
        equipment: 'Wand oder Türrahmen',
        duration: '2–3 x 35 Sek. pro Seite (gestreckt & gebeugt)',
        type: 'stretch-timer',
        defaultHold: 35,
        defaultReps: 3,
        defaultSets: 1,
        defaultRest: 15,
        whyItHelps: 'Der zweibäuchige Wadenmuskel entspringt oberhalb des Kniegelenks am Oberschenkel. Eine verkürzte Wade führt zu permanenter Streckhemmung und Kniekehlenschmerzen.',
        instructions: [
            'Stellen Sie sich in Schrittstellung mit dem Gesicht zur Wand und stützen Sie beide Hände etwa auf Schulterhöhe ab.',
            'Das zu dehnende Bein steht hinten, die Zehen zeigen exakt nach vorne.',
            'Drücken Sie die hintere Ferse fest und dauerhaft in den Boden.',
            'Schieben Sie das Becken langsam nach vorne, während das hintere Knie vollkommen gestreckt bleibt.',
            'Für den tieferen Wadenmuskel (Soleus): Beugen Sie nach 30 Sekunden das hintere Knie minimal, während die Ferse am Boden bleibt!'
        ],
        precautions: 'Die hintere Fußspitze darf nicht nach außen wegdrehen, da sonst die Dehnung verpufft.',
        physioTip: 'Probieren Sie beide Varianten: Knie ganz gestreckt (Gastrocnemius) und Knie leicht angewinkelt (Soleus) – ein spürbarer Unterschied!',
        suitability: ['Kniekehlenziehen', 'Achillessehnenschmerzen', 'Wadenkrämpfe', 'Anlaufsteifigkeit'],
        painTolerance: 'Dehnung 4–6/10'
    },
    {
        id: 'it-band-stretch',
        title: 'IT-Band & Gesäßdehnung im Stand (Tractus-Dehnung)',
        category: 'stretch',
        categoryLabel: 'Dehnungsübung / Schmerz an der Außenseite',
        badgeColor: 'amber',
        difficulty: 'Leicht',
        targetMuscles: ['Tractus iliotibialis', 'M. tensor fasciae latae', 'M. gluteus medius'],
        equipment: 'Wand zum Festhalten',
        duration: '2–3 x 30–40 Sek. pro Seite',
        type: 'stretch-timer',
        defaultHold: 35,
        defaultReps: 3,
        defaultSets: 1,
        defaultRest: 15,
        whyItHelps: 'Goldstandard bei Knieschmerzen an der Außenseite (Läuferknie/ITBS): Entlastet das Sehnenband, das sonst schmerzhaft über den Knochen reibt.',
        instructions: [
            'Stellen Sie sich seitlich an eine Wand und stützen Sie sich mit der wandnahen Hand ab.',
            'Kreuzen Sie das äußere (zu dehnende) Bein HINTER dem inneren Bein.',
            'Die Fersen beider Füße bleiben flach am Boden.',
            'Schieben Sie nun Ihre Hüfte des hinteren Beins behutsam zur Wand hin, während sich der Oberkörper leicht zur Gegenseite neigt.',
            'Spüren Sie das angenehme Ziehen an der Außenseite von der Hüfte bis hinab zum Knie.',
            'Halten Sie die Position ruhig und gleichmäßig.'
        ],
        precautions: 'Keine Torsion (Drehung) im Knie erzeugen. Beide Füße fest am Boden positionieren.',
        physioTip: 'Kombinieren Sie diese Dehnung nach Spaziergängen oder Läufen – sie wirkt wie eine Erleichterung für die gesamte Beinaußenseite.',
        suitability: ['Iliotibiales Bandsyndrom (Läuferknie)', 'Außenseitiger Knieschmerz', 'Hüft-Dysbalance'],
        painTolerance: 'Dehnung 4–5/10'
    },
    {
        id: 'hip-flexor-stretch',
        title: 'Hüftbeuger-Dehnung im Ausfallschritt (Iliopsoas)',
        category: 'stretch',
        categoryLabel: 'Dehnungsübung / Statik & Beckenentlastung',
        badgeColor: 'amber',
        difficulty: 'Mittel (Schonvariante auf Stuhl möglich)',
        targetMuscles: ['M. iliopsoas', 'M. rectus femoris (oberer Anteil)'],
        equipment: 'Weiches Kissen unter dem Knie oder Stuhl',
        duration: '2–3 x 30–40 Sek. pro Seite',
        type: 'stretch-timer',
        defaultHold: 35,
        defaultReps: 3,
        defaultSets: 1,
        defaultRest: 20,
        whyItHelps: 'Ein verkürzter Hüftbeuger kippt das Becken nach vorne, überstreckt die Lendenwirbelsäule und zwingt das Knie in eine biomechanische Fehlbelastung.',
        instructions: [
            'Gehen Sie in einen weiten Ausfallschritt (Kniestand mit weichem Kissen unter dem hinteren Knie). Alternativ: Ein Bein auf einem Stuhl abstellen.',
            'Das vordere Knie steht direkt senkrecht über dem Sprunggelenk (nicht darüber hinaus).',
            'Richten Sie den Oberkörper auf und spannen Sie das Gesäß der hinteren Seite aktiv an.',
            'Schieben Sie das Becken sanft nach vorne und unten, bis ein Dehngefühl in der Leiste spürbar wird.',
            'Bleiben Sie aufrecht und atmen Sie ruhig weiter.'
        ],
        precautions: 'Vermeiden Sie starkes Hohlkreuz. Wenn Kniestand schmerzt, im aufrechten Stand mit Schrittstellung durchführen.',
        physioTip: 'Das Anspannen des Gesäßmuskels löst neurophysiologisch eine reflektorische Entspannung im Hüftbeuger aus (reziproke Hemmung)!',
        suitability: ['Viel-Sitzer', 'Fehlhaltungen', 'Chronische Knieschmerzen', 'LWS- und Knieprobleme'],
        painTolerance: 'Dehnung 4–6/10'
    }
];

// Definition von Red Flags (Wann sofort zum Arzt?)
const MEDICAL_RED_FLAGS = [
    {
        title: 'Akutes Trauma mit hörbarem Krachen / Reißen',
        desc: 'Plötzlicher Schmerz nach Sport- oder Sturzunfall (Verdacht auf Kreuzbandriss oder Meniskusläsion).'
    },
    {
        title: 'Gelenkblockade / Knie lässt sich nicht strecken',
        desc: 'Mechanisches Klemmen oder Unfähigkeit, das Bein durchzudrücken (Verdacht auf Korbhenkelriss des Meniskus).'
    },
    {
        title: 'Starke Schwellung, Überwärmung und Rötung',
        desc: 'Hinweis auf einen akuten entzündlichen Erguss, Schleimbeutelentzündung oder bakterielle Infektion.'
    },
    {
        title: 'Ausgeprägtes Instabilitätsgefühl („Wegknicken“)',
        desc: 'Giving-Way-Phänomen bei Belastung erfordert orthopädische Abklärung.'
    },
    {
        title: 'Starker Ruheschmerz oder Nachtschmerz',
        desc: 'Schmerzen, die unabhängig von Bewegung im Ruhezustand den Schlaf stören.'
    }
];

// Hilfswissen & Physio-Tipps für Patienten
const PHYSIO_KNOWLEDGE = [
    {
        q: 'Darf ich trotz Knieschmerzen überhaupt trainieren?',
        a: 'Ja, absolute Ruhigstellung ist bei den meisten Knorpel- und Sehnenbeschwerden kontraproduktiv! Knorpel hat keine eigenen Blutgefäße und wird wie ein Schwamm durch wechselnde Be- und Entlastung mit Nährstoffen versorgt. Die Faustregel: Schmerzen bis Stufe 3–4 auf einer 10er-Skala sind während des Trainings akzeptabel, solange der Schmerz 24 Stunden nach der Einheit wieder auf das Ausgangsniveau zurückkehrt.'
    },
    {
        q: 'Wärme oder Kälte – was hilft meinem Knie?',
        a: 'Kälte (Kühlpack im Tuch, 10–15 Min.) hilft bei akuten Reizungen, Überwärmung oder Schwellung nach Belastung – sie hemmt Entzündungsbotenstoffe. Wärme (Wärmflasche, Moorpackung) ist ideal bei chronischen Spannungszuständen, morgendlicher Steifigkeit oder verkürzter Muskulatur, da sie die Durchblutung anregt und Muskeln entspannt.'
    },
    {
        q: 'Mein Knie knirscht oder knackt – ist das gefährlich?',
        a: 'Das Phänomen nennt sich „Krepitus“. Wenn das Knacken schmerzfrei ist, besteht in den allermeisten Fällen kein Grund zur Sorge. Es entsteht oft durch harmlose Gasbläschen in der Gelenkflüssigkeit oder Sehnen, die über Knochenvorsprünge gleiten. Erst wenn das Knacken von Schmerzen, Schwellungen oder Blockaden begleitet wird, sollte ein Orthopäde konsultiert werden.'
    },
    {
        q: 'Wie oft und wie lange sollte ich die Übungen machen?',
        a: 'Für nachhaltige Erfolge empfehlen wir 3–4 Einheiten pro Woche. Jede Einheit sollte 15–20 Minuten dauern. Sanfte Mobilisation und Dehnungen können Sie sogar täglich durchführen (z.B. morgens gegen Anlaufschmerzen oder abends zur Muskelentspannung).'
    },
    {
        q: 'Welche Rolle spielen Schuhe bei Knieschmerzen?',
        a: 'Eine enorme Rolle! Abgelaufene Sohlen oder Schuhe mit unzureichender Dämpfung bzw. falscher Pronationsstütze verändern die gesamte Beinachse. Achten Sie auf gut sitzende Schuhe mit flexibler Sohle und ausreichend Zehenfreiheit.'
    }
];
