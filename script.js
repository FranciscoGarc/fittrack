document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    const timerDisplay = document.getElementById('timer');
    const routineTitle = document.getElementById('routineTitle');
    const prevDayBtn = document.getElementById('prevDayBtn');
    const nextDayBtn = document.getElementById('nextDayBtn');
    const resetDayBtn = document.getElementById('resetDayBtn');
    const congratsModal = document.getElementById('congratsModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    let timerInterval;
    let totalSeconds = 120; // 2 minutes
    let currentDayIndex = 0;

    // --- Workout Data Structure with State ---
    let workoutState = [];
    const defaultWorkoutState = [
        {
            day: "Día 1: Parte Superior - Fuerza",
            exercises: [
                { name: "Press de Banca con Barra", sets: 3, reps: 6, completed: [false, false, false] },
                { name: "Press Inclinado con Barra", sets: 3, reps: 6, completed: [false, false, false] },
                { name: "Remo con Barra", sets: 3, reps: 8, completed: [false, false, false] },
                { name: "Jalón al Pecho en Máquina", sets: 3, reps: 10, completed: [false, false, false] },
                { name: "Press Militar con Barra", sets: 2, reps: 6, completed: [false, false] },
                { name: "Curl de Bíceps con Barra", sets: 2, reps: 6, completed: [false, false] },
                { name: "Rompecráneos", sets: 2, reps: 6, completed: [false, false] },
            ]
        },
        {
            day: "Día 2: Parte Inferior - Fuerza",
            exercises: [
                { name: "Sentadilla con Barra", sets: 3, reps: 8, completed: [false, false, false] },
                { name: "Extensiones de Cuádriceps", sets: 3, reps: 10, completed: [false, false, false] },
                { name: "Peso Muerto Rumano con Mancuernas", sets: 3, reps: 8, completed: [false, false, false] },
                { name: "Curl Nórdico de Isquiotibiales", sets: 2, reps: 6, completed: [false, false] },
                { name: "Elevación de Gemelos", sets: 2, reps: 10, completed: [false, false] },
            ]
        },
        {
            day: "Día 3: Descanso",
            exercises: []
        },
        {
            day: "Día 4: Parte Superior - Hipertrofia",
            exercises: [
                { name: "Press Inclinado con Barra", sets: 3, reps: 6, completed: [false, false, false] },
                { name: "Press Plano con Barra", sets: 3, reps: 8, completed: [false, false, false] },
                { name: "Remo con Mancuernas Inclinado", sets: 3, reps: 6, completed: [false, false, false] },
                { name: "Remo con Mancuerna a una Mano", sets: 3, reps: 8, completed: [false, false, false] },
                { name: "Elevaciones Laterales con Mancuernas", sets: 2, reps: 10, completed: [false, false] },
                { name: "Curl de Bíceps con Mancuernas", sets: 2, reps: 10, completed: [false, false] },
                { name: "Extensiones de Tríceps en Polea Alta", sets: 2, reps: 10, completed: [false, false] },
            ]
        },
        {
            day: "Día 5: Parte Inferior - Hipertrofia",
            exercises: [
                { name: "Sentadilla con barra", sets: 3, reps: 8, completed: [false, false, false] },
                { name: "Zancadas con Mancuernas", sets: 3, reps: 10, completed: [false, false, false] },
                { name: "Extensiones de Cuádriceps en Máquina", sets: 3, reps: 12, completed: [false, false, false] },
                { name: "Buenos Días con Barra", sets: 3, reps: 8, completed: [false, false, false] },
                { name: "Curl de Isquiotibiales con Mancuernas", sets: 3, reps: 12, completed: [false, false, false] },
                { name: "Elevación de Gemelos", sets: 3, reps: 15, completed: [false, false, false] },
            ]
        },
        {
            day: "Día 6 y 7: Descanso",
            exercises: []
        }
    ];

    // --- State Management ---
    const saveState = () => {
        localStorage.setItem('fittrack_progress', JSON.stringify(workoutState));
    };

    const loadState = () => {
        const savedState = localStorage.getItem('fittrack_progress');
        if (savedState) {
            workoutState = JSON.parse(savedState);
        } else {
            workoutState = defaultWorkoutState;
        }
        const savedDay = localStorage.getItem('fittrack_currentDay');
        currentDayIndex = savedDay ? parseInt(savedDay) : 0;
    };

    // --- Timer Functions ---
    const startTimer = () => {
        clearInterval(timerInterval);
        totalSeconds = 120;
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            totalSeconds--;
            updateTimerDisplay();
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "¡Listo!";
                const synth = new Tone.Synth().toDestination();
                synth.triggerAttackRelease("C5", "8n");
            }
        }, 1000);
    };

    const updateTimerDisplay = () => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // --- UI Rendering ---
    const renderCurrentDay = () => {
        const routine = workoutState[currentDayIndex];
        routineTitle.textContent = routine.day;
        resetDayBtn.style.display = routine.exercises.length > 0 ? 'block' : 'none';

        let html = '<div class="space-y-6">';
        if (routine.exercises.length === 0) {
            html += `<div class="text-center p-8 bg-gray-800 rounded-xl shadow-lg">
                        <p class="text-2xl mb-4">🧘‍♂️</p>
                        <p class="text-gray-300 text-lg">Descansa y recupérate. ¡Te lo has ganado!</p>
                     </div>`;
        } else {
            routine.exercises.forEach((exercise, exerciseIndex) => {
                html += `
                    <div id="exercise-${exerciseIndex}" class="p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                        <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                            <h3 class="text-lg font-semibold text-white">${exercise.name}</h3>
                            <p class="text-sm font-medium text-gray-300 bg-gray-700 px-3 py-1 rounded-full self-start sm:self-center">${exercise.sets} series de ${exercise.reps} repeticiones</p>
                        </div>
                        <div class="flex flex-wrap gap-4 justify-start sm:justify-center">
                `;
                for (let i = 0; i < exercise.sets; i++) {
                    const isChecked = exercise.completed[i];
                    html += `
                        <div class="flex items-center space-x-2">
                            <input type="checkbox" id="set-${exerciseIndex}-${i}" class="custom-checkbox" data-exercise="${exerciseIndex}" data-set="${i}" ${isChecked ? 'checked' : ''}>
                            <label for="set-${exerciseIndex}-${i}" class="text-gray-300">Serie ${i + 1}</label>
                        </div>
                    `;
                }
                html += `</div></div>`;
            });
        }
        html += `</div>`;
        appContainer.innerHTML = html;
        addEventListenersToCbs();
        updateCheckboxStates();
    };

    // --- Event Handling and Logic ---
    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            const exerciseIndex = e.target.dataset.exercise;
            const setIndex = e.target.dataset.set;
            workoutState[currentDayIndex].exercises[exerciseIndex].completed[setIndex] = true;

            saveState();
            startTimer();
            updateCheckboxStates();
            checkRoutineCompletion();
        }
    };

    const resetCurrentDay = () => {
        if (confirm('¿Estás seguro de que quieres reiniciar el progreso de hoy?')) {
            const routine = workoutState[currentDayIndex];
            routine.exercises.forEach(ex => {
                ex.completed = ex.completed.map(() => false);
            });
            saveState();
            renderCurrentDay();
        }
    };

    const updateCheckboxStates = () => {
        const routine = workoutState[currentDayIndex];
        if (!routine || routine.exercises.length === 0) return;

        routine.exercises.forEach((exercise, exIndex) => {
            exercise.completed.forEach((isSetCompleted, setIndex) => {
                const cb = document.getElementById(`set-${exIndex}-${setIndex}`);
                if (!cb) return;

                if (isSetCompleted) {
                    cb.checked = true;
                    cb.disabled = true;
                    return;
                }

                let isPrevSetDone = false;
                if (setIndex > 0) {
                    isPrevSetDone = exercise.completed[setIndex - 1];
                } else if (exIndex > 0) {
                    const prevExercise = routine.exercises[exIndex - 1];
                    isPrevSetDone = prevExercise.completed[prevExercise.sets - 1];
                } else {
                    isPrevSetDone = true;
                }
                cb.disabled = !isPrevSetDone;
            });
        });
    };

    const checkRoutineCompletion = () => {
        const routine = workoutState[currentDayIndex];
        if (routine.exercises.length === 0) return;

        const allCompleted = routine.exercises.every(ex => ex.completed.every(set => set));

        if (allCompleted) {
            modalTitle.textContent = `¡${routine.day.split(':')[0]} completado!`;
            modalMessage.textContent = 'Has completado la rutina de hoy. ¡Excelente trabajo, sigue así!';
            congratsModal.classList.remove('hidden');
        }
    };

    const navigateDays = (direction) => {
        currentDayIndex = (currentDayIndex + direction + workoutState.length) % workoutState.length;
        localStorage.setItem('fittrack_currentDay', currentDayIndex);
        renderCurrentDay();
    };

    const addEventListenersToCbs = () => {
        const checkboxes = document.querySelectorAll('.custom-checkbox');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', handleCheckboxChange);
        });
    };

    // --- PWA Service Worker ---
    const registerServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Cambiamos la ruta para que funcione localmente y en GitHub
                navigator.serviceWorker.register('service-worker.js')
                    .then(registration => {
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    })
                    .catch(err => {
                        console.log('ServiceWorker registration failed: ', err);
                    });
            });
        }
    };

    // --- Global Event Listeners & Initializer ---
    prevDayBtn.addEventListener('click', () => navigateDays(-1));
    nextDayBtn.addEventListener('click', () => navigateDays(1));
    resetDayBtn.addEventListener('click', resetCurrentDay);
    closeModalBtn.addEventListener('click', () => {
        congratsModal.classList.add('hidden');
    });

    loadState();
    renderCurrentDay();
    registerServiceWorker();
});