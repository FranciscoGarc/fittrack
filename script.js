document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    const timerDisplay = document.getElementById('timer');
    const timerLabel = document.getElementById('timerLabel');
    const routineTitle = document.getElementById('routineTitle');
    const prevDayBtn = document.getElementById('prevDayBtn');
    const nextDayBtn = document.getElementById('nextDayBtn');
    const resetDayBtn = document.getElementById('resetDayBtn');
    const congratsModal = document.getElementById('congratsModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const routineSwitch = document.getElementById('routineSwitch');

    let timerInterval;
    let totalSeconds = 120;
    let currentDayIndex = 0;
    let currentRoutine = 'torso-pierna'; // 'torso-pierna' or 'ppl'
    let workoutState = {};

    // Rutinas definidas
    const routines = {
        'torso-pierna': [{
            day: "Día 1: Torso - Fuerza",
            exercises: [{
                name: "Press de Banca con Barra", 
                sets: 4, 
                reps: 6, 
                rest: 120}, {
                name: "Remo con Barra",
                sets: 4,
                reps: 6,
                rest: 120
            }, {name: "Press Militar con Barra", sets: 4, reps: 6, rest: 120}, {
                name: "Jalón al Pecho en Máquina",
                sets: 4,
                reps: 6,
                rest: 90
            }, {
                name: "Press de Pecho en Máquina",
                sets: 3,
                reps: 8,
                rest: 90
            }, {
                name: "Extensiones de Tríceps en Polea Alta",
                sets: 3,
                reps: 8,
                rest: 60
            }, {name: "Curl de Bíceps con Barra Z", sets: 3, reps: 8, rest: 60}]
        }, {
            day: "Día 2: Pierna - Fuerza",
            exercises: [{
                name: "Sentadilla con Barra",
                sets: 4,
                reps: 6,
                rest: 120
            }, {name: "Peso Muerto Rumano con Barra", sets: 4, reps: 6, rest: 120}, {
                name: "Zancadas con Mancuernas",
                sets: 4,
                reps: 12,
                rest: 90
            }, {
                name: "Extensiones de Cuádriceps en Máquina",
                sets: 4,
                reps: 6,
                rest: 90
            }, {
                name: "Curl de Isquiotibiales con Mancuerna",
                sets: 4,
                reps: 8,
                rest: 90
            }, {name: "Elevación de Gemelos de Pie", sets: 4, reps: 10, rest: 60}]
        }, {
            day: "Día 3: Descanso Activo", exercises: []
        }, {
            day: "Día 4: Torso - Hipertrofia",
            exercises: [{
                name: "Press Inclinado con Barra",
                sets: 4,
                reps: 6,
                rest: 90
            }, {name: "Remo con Mancuernas a una Mano", sets: 4, reps: 6, rest: 90}, {
                name: "Aperturas en Máquina",
                sets: 4,
                reps: 8,
                rest: 60
            }, {
                name: "Elevaciones Laterales con Mancuernas",
                sets: 4,
                reps: 7,
                rest: 60
            }, {name: "Jalón al Pecho en Máquina", sets: 4, reps: 6, rest: 90}, {
                name: "Press Francés con Barra Z",
                sets: 3,
                reps: 8,
                rest: 60
            }, {name: "Curl de Bíceps con Mancuernas", sets: 3, reps: 8, rest: 60}]
        }, {
            day: "Día 5: Pierna - Hipertrofia",
            exercises: [{
                name: "Sentadilla Búlgara con Mancuernas",
                sets: 4,
                reps: 6,
                rest: 90
            }, {
                name: "Peso Muerto Rumano con Mancuernas",
                sets: 4,
                reps: 6,
                rest: 90
            }, {
                name: "Extensiones de Cuádriceps en Máquina",
                sets: 4,
                reps: 6,
                rest: 60
            }, {
                name: "Curl de Isquiotibiales con Mancuerna",
                sets: 4,
                reps: 8,
                rest: 60
            }, {name: "Elevación de Gemelos Sentado", sets: 4, reps: 8, rest: 60}]
        }, {
            day: "Días 6 y 7: Descanso", exercises: []
        }], 'ppl': [{
            day: "Día 1: Empuje (Pecho, Hombros, Tríceps)",
            exercises: [{
                name: "Press de Banca con Barra",
                sets: 4,
                reps: 6,
                rest: 120
            }, {name: "Press Inclinado con Barra", sets: 4, reps: 6, rest: 120}, {
                name: "Press Militar con Mancuernas",
                sets: 4,
                reps: 6,
                rest: 90
            }, {
                name: "Aperturas en Máquina",
                sets: 4,
                reps: 8,
                rest: 60
            }, {
                name: "Elevaciones Laterales con Mancuernas",
                sets: 4,
                reps: 7,
                rest: 60
            }, {name: "Extensiones de Tríceps en Polea Alta", sets: 3, reps: 8, rest: 60}]
        }, {
            day: "Día 2: Jalón (Espalda, Bíceps)",
            exercises: [{
                name: "Remo con Barra",
                sets: 4,
                reps: 6,
                rest: 120
            }, {
                name: "Jalón al Pecho en Máquina",
                sets: 4,
                reps: 6,
                rest: 90
            }, {name: "Remo con Mancuernas a una Mano", sets: 4, reps: 6, rest: 90}, {
                name: "Face Pulls",
                sets: 4,
                reps: 8,
                rest: 60
            }, {name: "Curl de Bíceps con Barra Z", sets: 3, reps: 8, rest: 60}, {
                name: "Curl Martillo con Mancuernas",
                sets: 3,
                reps: 10,
                rest: 60
            }]
        }, {
            day: "Día 3: Piernas",
            exercises: [{
                name: "Sentadilla con Barra",
                sets: 4,
                reps: 6,
                rest: 120
            }, {name: "Peso Muerto Rumano con Barra", sets: 4, reps: 6, rest: 120}, {
                name: "Zancadas con Mancuernas",
                sets: 4,
                reps: 12,
                rest: 90
            }, {
                name: "Extensiones de Cuádriceps en Máquina",
                sets: 4,
                reps: 6,
                rest: 90
            }, {
                name: "Curl de Isquiotibiales con Mancuerna",
                sets: 4,
                reps: 8,
                rest: 90
            }, {name: "Elevación de Gemelos de Pie", sets: 4, reps: 10, rest: 60}]
        }, {
            day: "Día 4: Empuje (Segunda Sesión)",
            exercises: [{
                name: "Press Plano con Barra",
                sets: 4,
                reps: 6,
                rest: 120
            }, {name: "Press de Pecho en Máquina", sets: 3, reps: 8, rest: 90}, {
                name: "Press de Hombros con Barra",
                sets: 4,
                reps: 6,
                rest: 90
            }, {
                name: "Aperturas Inclinadas con Mancuernas",
                sets: 4,
                reps: 8,
                rest: 60
            }, {
                name: "Elevaciones Frontales con Mancuernas",
                sets: 3,
                reps: 8,
                rest: 60
            }, {name: "Press Francés con Barra Z", sets: 4, reps: 6, rest: 60}]
        }, {
            day: "Día 5: Jalón (Segunda Sesión)",
            exercises: [{
                name: "Jalón al Pecho en Máquina",
                sets: 4,
                reps: 6,
                rest: 90
            }, {name: "Remo Inclinado con Mancuernas", sets: 4, reps: 6, rest: 90}, {
                name: "Pull-overs con Mancuerna",
                sets: 3,
                reps: 8,
                rest: 60
            }, {
                name: "Encogimientos de Hombros con Mancuernas",
                sets: 4,
                reps: 8,
                rest: 60
            }, {
                name: "Curl de Bíceps con Mancuernas",
                sets: 3,
                reps: 8,
                rest: 60
            }, {name: "Curl de Concentración con Mancuerna", sets: 3, reps: 8, rest: 60}]
        }, {
            day: "Días 6 y 7: Descanso", exercises: []
        }]
    };

    // Inicializar estado del workout
    const initializeWorkoutState = () => {
        Object.keys(routines).forEach(routineName => {
            if (!workoutState[routineName]) {
                workoutState[routineName] = routines[routineName].map(day => ({
                    ...day, exercises: day.exercises.map(exercise => ({
                        ...exercise, 
                        completed: new Array(exercise.sets).fill(false),
                        currentReps: exercise.reps, // Reps actuales (pueden aumentar)
                        baseReps: exercise.reps // Reps base originales
                    }))
                }));
            } else {
                // Actualizar ejercicios existentes con nuevas propiedades si no las tienen
                workoutState[routineName].forEach((day, dayIndex) => {
                    day.exercises.forEach((exercise, exerciseIndex) => {
                        if (exercise.currentReps === undefined) {
                            exercise.currentReps = exercise.reps || routines[routineName][dayIndex].exercises[exerciseIndex].reps;
                            exercise.baseReps = routines[routineName][dayIndex].exercises[exerciseIndex].reps;
                        }
                    });
                });
            }
        });
    };

    // Funciones de estado
    const saveState = () => {
        localStorage.setItem('fittrack_workout_state', JSON.stringify(workoutState));
        localStorage.setItem('fittrack_current_routine', currentRoutine);
        localStorage.setItem('fittrack_current_day', currentDayIndex.toString());
    };

    const loadState = () => {
        const savedState = localStorage.getItem('fittrack_workout_state');
        const savedRoutine = localStorage.getItem('fittrack_current_routine');
        const savedDay = localStorage.getItem('fittrack_current_day');

        if (savedState) {
            workoutState = JSON.parse(savedState);
        }

        if (savedRoutine) {
            currentRoutine = savedRoutine;
            routineSwitch.checked = currentRoutine === 'ppl';
        }

        if (savedDay) {
            currentDayIndex = parseInt(savedDay);
        }

        initializeWorkoutState();
    };

    // Funciones del temporizador
    const startTimer = (seconds) => {
        clearInterval(timerInterval);
        totalSeconds = seconds;
        timerLabel.textContent = "Descanso";
        timerDisplay.classList.add('timer-active');
        updateTimerDisplay();

        timerInterval = setInterval(() => {
            totalSeconds--;
            updateTimerDisplay();
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "¡Listo!";
                timerDisplay.classList.remove('timer-active');
                playNotificationSound();
            }
        }, 1000);
    };

    const updateTimerDisplay = () => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const playNotificationSound = () => {
        // Crear un beep simple sin usar Tone.js
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    };

    // Renderizado
    const renderCurrentDay = () => {
        const routine = workoutState[currentRoutine][currentDayIndex];
        routineTitle.textContent = routine.day;
        resetDayBtn.style.display = routine.exercises.length > 0 ? 'block' : 'none';
        document.getElementById('resetProgressBtn').style.display = routine.exercises.length > 0 ? 'block' : 'none';

        let html = '<div class="space-y-6">';
        if (routine.exercises.length === 0) {
            html += `<div class="text-center p-8 bg-gray-800 rounded-xl shadow-lg">
                        <p class="text-2xl mb-4">🧘‍♂️</p>
                        <p class="text-gray-300 text-lg">Día de descanso. ¡Recupérate bien!</p>
                        <p class="text-gray-400 text-sm mt-2">Puedes hacer cardio ligero o estiramientos</p>
                     </div>`;
        } else {
            routine.exercises.forEach((exercise, exerciseIndex) => {
                html += `
                    <div class="p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                        <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                            <h3 class="text-lg font-semibold text-white">${exercise.name}</h3>
                            <div class="flex flex-col sm:flex-row gap-2">
                                <p class="text-sm font-medium text-gray-300 bg-gray-700 px-3 py-1 rounded-full self-start">${exercise.sets} series × ${exercise.currentReps} reps</p>
                                ${exercise.currentReps > exercise.baseReps ? 
                                    `<p class="text-sm font-medium text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full self-start">+${exercise.currentReps - exercise.baseReps} reps</p>` : 
                                    ''
                                }
                                <p class="text-sm font-medium text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full self-start">${exercise.rest}s descanso</p>
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-4 justify-start sm:justify-center">
                `;
                for (let i = 0; i < exercise.sets; i++) {
                    const isChecked = exercise.completed[i];
                    html += `
                        <div class="flex items-center space-x-2">
                            <input type="checkbox" id="set-${exerciseIndex}-${i}" class="custom-checkbox" 
                                   data-exercise="${exerciseIndex}" data-set="${i}" data-rest="${exercise.rest}" ${isChecked ? 'checked' : ''}>
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

    // Manejo de eventos
    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            const exerciseIndex = parseInt(e.target.dataset.exercise);
            const setIndex = parseInt(e.target.dataset.set);
            const restTime = parseInt(e.target.dataset.rest);

            // Marcar la serie como completada
            workoutState[currentRoutine][currentDayIndex].exercises[exerciseIndex].completed[setIndex] = true;

            // Verificar si el ejercicio completo está terminado (todas las series)
            if (isExerciseCompleted(exerciseIndex)) {
                incrementExerciseReps(exerciseIndex);
            }

            saveState();
            startTimer(restTime);
            updateCheckboxStates();
            checkRoutineCompletion();
        }
    };

    const resetCurrentDay = () => {
        if (confirm('¿Estás seguro de que quieres reiniciar el progreso de hoy? (Las repeticiones aumentadas se mantendrán)')) {
            const routine = workoutState[currentRoutine][currentDayIndex];
            routine.exercises.forEach(exercise => {
                exercise.completed = new Array(exercise.sets).fill(false);
                // No reseteamos currentReps para mantener el progreso
            });
            saveState();
            renderCurrentDay();
        }
    };

    // Función para incrementar reps cuando se completa un ejercicio
    const incrementExerciseReps = (exerciseIndex) => {
        const exercise = workoutState[currentRoutine][currentDayIndex].exercises[exerciseIndex];
        exercise.currentReps += 1;
        console.log(`${exercise.name}: Reps aumentadas a ${exercise.currentReps}`);
    };

    // Función para verificar si un ejercicio está completamente terminado
    const isExerciseCompleted = (exerciseIndex) => {
        const exercise = workoutState[currentRoutine][currentDayIndex].exercises[exerciseIndex];
        return exercise.completed.every(set => set);
    };

    // Función para resetear el progreso de repeticiones
    const resetProgressiveOverload = () => {
        if (confirm('¿Estás seguro de que quieres reiniciar todas las repeticiones a sus valores originales? Esta acción no se puede deshacer.')) {
            const routine = workoutState[currentRoutine][currentDayIndex];
            routine.exercises.forEach(exercise => {
                exercise.currentReps = exercise.baseReps;
                exercise.completed = new Array(exercise.sets).fill(false);
            });
            saveState();
            renderCurrentDay();
        }
    };

    const updateCheckboxStates = () => {
        const routine = workoutState[currentRoutine][currentDayIndex];
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
        const routine = workoutState[currentRoutine][currentDayIndex];
        if (routine.exercises.length === 0) return;

        const allCompleted = routine.exercises.every(ex => ex.completed.every(set => set));

        if (allCompleted) {
            modalTitle.textContent = `¡${routine.day.split(':')[0]} completado!`;
            modalMessage.textContent = 'Has completado la rutina de hoy. ¡Excelente trabajo, sigue así!';
            congratsModal.classList.remove('hidden');
        }
    };

    const navigateDays = (direction) => {
        currentDayIndex = (currentDayIndex + direction + workoutState[currentRoutine].length) % workoutState[currentRoutine].length;
        saveState();
        renderCurrentDay();
    };

    const switchRoutine = () => {
        currentRoutine = routineSwitch.checked ? 'ppl' : 'torso-pierna';
        currentDayIndex = 0;
        saveState();
        renderCurrentDay();
    };

    const addEventListenersToCbs = () => {
        const checkboxes = document.querySelectorAll('.custom-checkbox');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', handleCheckboxChange);
        });
    };

    // Event listeners
    prevDayBtn.addEventListener('click', () => navigateDays(-1));
    nextDayBtn.addEventListener('click', () => navigateDays(1));
    resetDayBtn.addEventListener('click', resetCurrentDay);
    document.getElementById('resetProgressBtn').addEventListener('click', resetProgressiveOverload);
    routineSwitch.addEventListener('change', switchRoutine);
    closeModalBtn.addEventListener('click', () => {
        congratsModal.classList.add('hidden');
    });

    // Inicialización
    loadState();
    renderCurrentDay();
});