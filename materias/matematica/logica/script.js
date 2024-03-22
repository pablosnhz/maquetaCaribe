let currentQuestionIndex = 0;
let alertaMostrada = false;

const primerNivel = [
    {
        "pregunta": "¿En qué película Bruce Willis interpreta a John McClane, un policía que se enfrenta a terroristas en un rascacielos?",
        "opciones": {
            "La era del hielo": false,
            "Duro de Matar": true,
            "Difícil de Matar": false,
            "Riesgo Total": false
        },
        "respuesta": "Duro de Matar"
    },
    {
        "pregunta": "¿Quién dirigió la película 'Titanic'?",
        "opciones": {
            "Martin Scorsese": false,
            "Steven Spielberg": false,
            "James Cameron": true,
            "Quentin Tarantino": false
        },
        "respuesta": "James Cameron"
    },
    {
        "pregunta": "¿En qué película aparece el personaje 'Forrest Gump'?",
        "opciones": {
            "Pulp Fiction": false,
            "Salvar al Soldado Ryan": false,
            "Forrest Gump": true,
            "Sueño de Fuga": false
        },
        "respuesta": "Forrest Gump"
    }
];

const segundoNivel = [
    {
        "pregunta": "¿Cuál es la capital de Francia?",
        "opciones": {
            "Londres": false,
            "París": true,
            "Berlín": false,
            "Madrid": false
        },
        "respuesta": "París"
    },
    {
        "pregunta": "¿En qué año comenzó la Primera Guerra Mundial?",
        "opciones": {
            "1914": true,
            "1918": false,
            "1939": false,
            "1945": false
        },
        "respuesta": "1914"
    },
    {
        "pregunta": "¿Quién pintó la Mona Lisa?",
        "opciones": {
            "Leonardo da Vinci": true,
            "Pablo Picasso": false,
            "Vincent van Gogh": false,
            "Claude Monet": false
        },
        "respuesta": "Leonardo da Vinci"
    }
];

const tercerNivel = [
    {
        "pregunta": "¿Cuál es la película que ganó el Premio Óscar a la Mejor Película en 1994?",
        "opciones": {
            "Forrest Gump": false,
            "Pulp Fiction": false,
            "La Lista de Schindler": true,
            "Titanic": false
        },
        "respuesta": "La lista de Schindler"
    },
    {
        "pregunta": "¿En qué película Clint Eastwood interpreta a un cazarrecompensas llamado 'El Hombre sin Nombre'?",
        "opciones": {
            "Por un Puñado de Dólares": true,
            "El Bueno, el Malo y el Feo": false,
            "La Muerte Tenía un Precio": false,
            "Sin Perdón": false
        },
        "respuesta": "Por un Puñado de Dólares"
    },
    {
        "pregunta": "¿Quién interpretó el papel de Tony Stark / Iron Man en el Universo Cinematográfico de Marvel?",
        "opciones": {
            "Chris Evans": false,
            "Chris Hemsworth": false,
            "Robert Downey Jr.": true,
            "Mark Ruffalo": false
        },
        "respuesta": "Robert Downey Jr."
    }
]

// NIVEL 1

function renderQuestion(index) {
    const question = primerNivel[index];
    const container = document.getElementById('questions-container');
    container.innerHTML = `
        <div class="question ml-sm-5 pl-sm-5 pt-2">
            <div class="py-2 h5"><b>${question.pregunta}</b></div>
            <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                ${renderOptions(question.opciones, index)}
            </div>
        </div>
    `;
    const containers = document.getElementById('respuestaJson');
    containers.textContent = question.respuesta;


    const selectedAnswer = localStorage.getItem(`question_primer_${index}`);
    if (selectedAnswer) {
        const radioInput = container.querySelector(`input[value="${selectedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
    }
}

function renderOptions(options, index) {
    let html = '';
    const selectedAnswer = localStorage.getItem(`question_primer_${index}`);
    for (const option in options) {
        const checked = option === selectedAnswer ? 'checked' : '';
        html += `
            <label class="options">${option}
                <input type="radio" name="radio" value="${option}" ${checked} onchange="saveSelectedAnswer(${index}, '${option}')">
                <span class="checkmark"></span>
            </label>
        `;
    }
    return html;
}

function saveSelectedAnswer(index, option) {
    localStorage.setItem(`question_primer_${index}`, option); 
}

function showNext() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswer(currentQuestionIndex, selectedAnswer);
    }
    
    currentQuestionIndex = Math.min(currentQuestionIndex + 1, primerNivel.length - 1);
    renderQuestion(currentQuestionIndex);
}

function showPrevious() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswer(currentQuestionIndex, selectedAnswer);
    }
    
    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestion(currentQuestionIndex);
}


// mostamos en orden las preguntas
renderQuestion(currentQuestionIndex);

// * RESULTADO NIVELES
function mostrarRespuestasIncorrectas() {
    let respuestasIncorrectas = [];
    primerNivel.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`question_primer_${index}`);
        if (respuestaUsuario !== pregunta.respuesta) {
            respuestasIncorrectas.push({ pregunta: pregunta.pregunta, respuestaCorrecta: pregunta.respuesta });
        }
    });

    if (respuestasIncorrectas.length > 0) {
        alert('Tienes respuestas incorrectas primer nivel.');
    } else {
        alert('Todas las respuestas del primer nivel son correctas.');
        localStorage.setItem('nivel_desbloqueado', true);
        document.getElementById('nivelUno').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }
}

function todasRespuestasCorrectas() {
    return primerNivel.every((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`question_primer_${index}`);
        return respuestaUsuario === pregunta.respuesta;
    });
}

window.onload = function () {
    const currentUrl = window.location.href;

    if (localStorage.getItem('nivel_desbloqueado') === 'true') {
        document.getElementById('nivelUno').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }
    if (localStorage.getItem('nivel_desbloqueado_segundo') === 'true') {
        document.getElementById('nivelDos').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }
    if (localStorage.getItem('nivel_desbloqueado_tercer') === 'true') {
        document.getElementById('nivelTres').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }

    // Verificamos en qué nivel nos encontramos
    if (currentUrl.includes("matematicaNivelUno")) {
        currentLevel = 1;
        renderQuestion(currentQuestionIndex);
    } else if (currentUrl.includes("matematicaNivelDos")) {
        currentLevel = 2;
        renderQuestionSegundoNivel(currentQuestionIndex);
    } else if (currentUrl.includes("matematicaNivelTres")) {
        currentLevel = 3;
        renderQuestionTercerNivel(currentQuestionIndex);
    }
}

document.getElementById('mostrarRespuestasBtn').addEventListener('click', function(){
    if (currentLevel === 1) {
        mostrarRespuestasIncorrectas();
    } else if (currentLevel === 2) {
        mostrarRespuestasIncorrectasSegundoNivel();
    } else if (currentLevel === 3){
        mostrarRespuestasIncorrectasTercerNivel();
    }
});

document.getElementById('mostrarRespuestasBtn').addEventListener('click', function(){
    if (currentLevel === 1) {
        mostrarRespuestasIncorrectas();
    } else if (currentLevel === 2) {
        mostrarRespuestasIncorrectasSegundoNivel();
    } else if (currentLevel === 3){
        mostrarRespuestasIncorrectasTercerNivel();
    }

});

renderQuestionSegundoNivel(currentQuestionIndex);

























// SEGUNDO NIVEL

let currentLevel = 1;

function renderQuestionSegundoNivel(index) {
    const question = segundoNivel[index];
    const container = document.getElementById('questions-container');
    container.innerHTML = `
        <div class="question ml-sm-5 pl-sm-5 pt-2">
            <div class="py-2 h5"><b>${question.pregunta}</b></div>
            <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                ${renderOptionsSegundoNivel(question.opciones, index)}
            </div>
        </div>
    `;
    const containers = document.getElementById('respuestaJson');
    containers.textContent = question.respuesta;

    const selectedAnswer = localStorage.getItem(`question_segundo_${index}`);
    if (selectedAnswer) {
        const radioInput = container.querySelector(`input[value="${selectedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
    }
}

function saveSelectedAnswerSegundoNivel(index, option) {
    localStorage.setItem(`question_segundo_${index}`, option);
}

function showNextSegundoNivel() {
    saveSelectedAnswerSegundoNivel();
    currentQuestionIndex = Math.min(currentQuestionIndex + 1, segundoNivel.length - 1);
    renderQuestionSegundoNivel(currentQuestionIndex);
}

function showPreviousSegundoNivel() {
    saveSelectedAnswerSegundoNivel();
    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestionSegundoNivel(currentQuestionIndex);
}

function saveSelectedAnswerSegundoNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked');
    if (selectedAnswer) {
        localStorage.setItem(`question_segundo_${currentQuestionIndex}`, selectedAnswer.value);
    }
}

function renderOptionsSegundoNivel(options, index) {
    let html = '';
    const selectedAnswer = localStorage.getItem(`question_${index}`);
    for (const option in options) {
        const checked = option === selectedAnswer ? 'checked' : '';
        html += `
            <label class="options">${option}
                <input type="radio" name="radio" value="${option}" ${checked} onchange="saveSelectedAnswerSegundoNivel(${index}, '${option}')">
                <span class="checkmark"></span>
            </label>
        `;
    }
    return html;
}

// * RESULTADO NIVELES
function mostrarRespuestasIncorrectasSegundoNivel() {
    let respuestasIncorrectas = [];
    segundoNivel.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`question_segundo_${index}`);
        if (respuestaUsuario !== pregunta.respuesta) {
            respuestasIncorrectas.push({ pregunta: pregunta.pregunta, respuestaCorrecta: pregunta.respuesta });
        }
    });

    if (respuestasIncorrectas.length > 0 && !alertaMostrada) {
        alert('Tienes respuestas incorrectas en el segundo nivel.');
        alertaMostrada = true; 
    } else if (respuestasIncorrectas.length === 0 && !alertaMostrada) {
        alert('Todas las respuestas del segundo nivel son correctas.');
        document.getElementById('nivelDos').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
        localStorage.setItem('nivel_desbloqueado_segundo', true);
        alertaMostrada = true;
    }
}

// * Desbloqueo de nivel 
function todasRespuestasCorrectasSegundoNivel() {
    return segundoNivel.every((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`question_segundo_${index}`);
        return respuestaUsuario === pregunta.respuesta;
    });
}

document.getElementById('mostrarRespuestasBtn').addEventListener('click', function(){
    mostrarRespuestasIncorrectasSegundoNivel();
});

renderQuestionSegundoNivel(currentQuestionIndex);




















// NIVEL 3

function renderQuestionTercerNivel(index) {
    const question = tercerNivel[index];
    const container = document.getElementById('questions-container');
    container.innerHTML = `
        <div class="question ml-sm-5 pl-sm-5 pt-2">
            <div class="py-2 h5"><b>${question.pregunta}</b></div>
            <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                ${renderOptionsTercerNivel(question.opciones, index)}
            </div>
        </div>
    `;
    const containers = document.getElementById('respuestaJson');
    containers.textContent = question.respuesta;

    const selectedAnswer = localStorage.getItem(`question_${index}`);
    if (selectedAnswer) {
        const radioInput = container.querySelector(`input[value="${selectedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
    }
}

function saveSelectedAnswerTercerNivel(index, option) {
    localStorage.setItem(`question_tercer_${index}`, option);
}

function showNextTercerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked');
    if (selectedAnswer) {
        saveSelectedAnswerTercerNivel(currentQuestionIndex, selectedAnswer.value);
    }
    currentQuestionIndex = Math.min(currentQuestionIndex + 1, tercerNivel.length - 1);
    renderQuestionTercerNivel(currentQuestionIndex);
}

function showPreviousTercerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked');
    if (selectedAnswer) {
        saveSelectedAnswerTercerNivel(currentQuestionIndex, selectedAnswer.value);
    }
    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestionTercerNivel(currentQuestionIndex);
}






function renderOptionsTercerNivel(options, index) {
    let html = '';
    const selectedAnswer = localStorage.getItem(`question_tercer_${index}`);
    for (const option in options) {
        const checked = option === selectedAnswer ? 'checked' : '';
        html += `
            <label class="options">${option}
                <input type="radio" name="radio" value="${option}" ${checked} onchange="saveSelectedAnswerTercerNivel(${index}, '${option}')">
                <span class="checkmark"></span>
            </label>
        `;
    }
    return html;
}


// * RESULTADO NIVELES
function mostrarRespuestasIncorrectasTercerNivel() {
    let respuestasIncorrectas = [];
    tercerNivel.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`question_tercer_${index}`).toLowerCase();
        const respuestaCorrecta = pregunta.respuesta.toLowerCase();
        if (respuestaUsuario !== respuestaCorrecta) {
            respuestasIncorrectas.push({ pregunta: pregunta.pregunta, respuestaCorrecta: pregunta.respuesta });
        }
    });

    if (respuestasIncorrectas.length > 0) {
        alert('Tienes respuestas incorrectas en el tercer nivel.');
        alertaMostrada = true; 
    } else {
        alert('Todas las respuestas del tercer nivel son correctas.');
        document.getElementById('nivelTres').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
        localStorage.setItem('nivel_desbloqueado_tercer', true);
        alertaMostrada = true; 
    }
}

// * Desbloqueo de nivel 
function todasRespuestasCorrectasTercerNivel() {
    return tercerNivel.every((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`question_tercer_${index}`);
        return respuestaUsuario === pregunta.respuesta;
    });
}


document.getElementById('mostrarRespuestasBtn').addEventListener('click', function(){
    mostrarRespuestasIncorrectasTercerNivel();
});

renderQuestionTercerNivel(currentQuestionIndex);




