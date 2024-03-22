
const primerNivel = [
    {
        "pregunta": "¿En qué año se estrenó la película 'El Padrino'?",
        "opciones": {
            "1972": true,
            "1980": false,
            "1968": false,
            "1990": false
        },
        "respuesta": "1972"
    },
    {
        "pregunta": "¿Quién interpretó a Neo en la película 'The Matrix'?",
        "opciones": {
            "Keanu Reeves": true,
            "Tom Cruise": false,
            "Brad Pitt": false,
            "Leonardo DiCaprio": false
        },
        "respuesta": "Keanu Reeves"
    },
    {
        "pregunta": "¿Cuál es el nombre del actor que interpretó a Jack en la película 'Titanic'?",
        "opciones": {
            "Leonardo DiCaprio": true,
            "Tom Hanks": false,
            "Johnny Depp": false,
            "Brad Pitt": false
        },
        "respuesta": "Leonardo DiCaprio"
    }
];

const segundoNivel = [
    {
        "pregunta": "¿Cuál es la montaña más alta del mundo?",
        "opciones": {
            "Monte Everest": true,
            "K2": false,
            "Kangchenjunga": false,
            "Makalu": false
        },
        "respuesta": "Monte Everest"
    },
    {
        "pregunta": "¿Quién escribió 'El Principito'?",
        "opciones": {
            "Antoine de Saint-Exupéry": true,
            "J.K. Rowling": false,
            "Hermann Hesse": false,
            "Gabriel García Márquez": false
        },
        "respuesta": "Antoine de Saint-Exupéry"
    },
    {
        "pregunta": "¿Cuál es el río más largo del mundo?",
        "opciones": {
            "Amazonas": false,
            "Nilo": true,
            "Misisipi": false,
            "Yangtsé": false
        },
        "respuesta": "Nilo"
    }
];

const tercerNivel = [
    {
        "pregunta": "¿Quién escribió 'Cien años de soledad'?",
        "opciones": {
            "Gabriel García Márquez": true,
            "Mario Vargas Llosa": false,
            "Julio Cortázar": false,
            "Pablo Neruda": false
        },
        "respuesta": "Gabriel García Márquez"
    },
    {
        "pregunta": "¿En qué año se lanzó el primer iPhone?",
        "opciones": {
            "2007": true,
            "2005": false,
            "2009": false,
            "2010": false
        },
        "respuesta": "2007"
    },
    {
        "pregunta": "¿Cuál es el autor de la obra 'Don Quijote de la Mancha'?",
        "opciones": {
            "Miguel de Cervantes": true,
            "William Shakespeare": false,
            "Federico García Lorca": false,
            "Jorge Luis Borges": false
        },
        "respuesta": "Miguel de Cervantes"
    }
];










let tiempoRestante = 20;
let temporizador;
let currentLevel = 1;
let currentQuestionIndex = 0;
let alertaMostrada = false;

const localStorageKeys = {
    primerNivel: 'linguistica_primer_nivel',
    segundoNivel: 'linguistica_segundo_nivel',
    tercerNivel: 'linguistica_tercer_nivel'
};

function iniciarTemporizador() {
    detenerTemporizador();
    temporizador = setInterval(actualizarTemporizador, 1000);
}

function actualizarTemporizador() {
    tiempoRestante--;
    document.getElementById('temporizador').textContent = tiempoRestante;

    if (tiempoRestante <= 0) {
        if (currentLevel === 1) {
            temporizadorPrimerNivel();
        } else if (currentLevel === 2) {
            temporizadorSegundoNivel();
        } else if (currentLevel === 3) {
            temporizadorTercerNivel();
        }
    }
}

function detenerTemporizador() {
    clearInterval(temporizador);
    document.getElementById('temporizador').textContent = tiempoRestante;
}

function temporizadorPrimerNivel() {
    clearInterval(temporizador);
    tiempoRestante = 20;
    alert('¡Tiempo agotado en el primer nivel! AHORA SEGUNDO NIVEL!');
    window.location.href = "linguisticaNivelDos.html";
}

function temporizadorSegundoNivel() {
    clearInterval(temporizador);
    tiempoRestante = 20;
    alert('¡Tiempo agotado en el segundo nivel! AHORA TERCER NIVEL!');
    showNextSegundoNivel();
    window.location.href = "linguisticaNivelTres.html";
}

function temporizadorTercerNivel() {
    clearInterval(temporizador);
    tiempoRestante = 20;
    alert('¡Tiempo agotado en el tercer nivel!');

    showNextTercerNivel();
}



window.onload = function () {
    const currentUrl = window.location.href;

    if (localStorage.getItem('nivel_desbloqueado_lingui') === 'true') {
        document.getElementById('nivelUnoLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }

    if (localStorage.getItem('nivel_desbloqueado_segundo_lingui') === 'true') {
        document.getElementById('nivelDosLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }

    if (localStorage.getItem('nivel_desbloqueado_tercer_lingui') === 'true') {
        document.getElementById('nivelTresLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }

    if (currentUrl.includes("linguisticaNivelUno")) {
        currentLevel = 1;
        currentQuestionIndex = 0;
        renderQuestionPrimerNivel(currentQuestionIndex);
    } else if (currentUrl.includes("linguisticaNivelDos")) {
        currentLevel = 2;
        currentQuestionIndex = 0;
        renderQuestionSegundoNivel(currentQuestionIndex);
    } else if (currentUrl.includes("linguisticaNivelTres")) {
        currentLevel = 3;
        currentQuestionIndex = 0;
        renderQuestionTercerNivel(currentQuestionIndex);
    }
}

// Funciones para mostrar respuestas incorrectas
function mostrarRespuestasIncorrectas() {
    let respuestasIncorrectas = [];
    primerNivel.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`${localStorageKeys.primerNivel}_${index}`);
        if (respuestaUsuario !== pregunta.respuesta) {
            respuestasIncorrectas.push({ pregunta: pregunta.pregunta, respuestaCorrecta: pregunta.respuesta });
        }
    });

    if (respuestasIncorrectas.length > 0) {
        alert('Tienes respuestas incorrectas en el primer nivel.');
    } else {
        alert('Todas las respuestas del primer nivel son correctas.');
        localStorage.setItem('nivel_desbloqueado_lingui', true);
        document.getElementById('nivelUnoLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
        detenerTemporizador(); // * SE DETIENE EL TIEMPO ACA
    }
}

function mostrarRespuestasIncorrectasSegundoNivel() {
    let respuestasIncorrectas = [];
    segundoNivel.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`${localStorageKeys.segundoNivel}_${index}`);
        if (respuestaUsuario !== pregunta.respuesta) {
            respuestasIncorrectas.push({ pregunta: pregunta.pregunta, respuestaCorrecta: pregunta.respuesta });
        }
    });

    if (respuestasIncorrectas.length > 0) {
        alert('Tienes respuestas incorrectas en el segundo nivel.');
        alertaMostrada = true;
    } else {
        alert('Todas las respuestas del segundo nivel son correctas.');
        document.getElementById('nivelDosLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
        localStorage.setItem('nivel_desbloqueado_segundo_lingui', true);
        alertaMostrada = true;
        detenerTemporizador();
    }
}

function mostrarRespuestasIncorrectasTercerNivel() {
    let respuestasIncorrectas = [];
    tercerNivel.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`${localStorageKeys.tercerNivel}_${index}`).toLowerCase();
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
        document.getElementById('nivelTresLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
        localStorage.setItem('nivel_desbloqueado_tercer_lingui', true);
        alertaMostrada = true;
        detenerTemporizador();
    }
}


// Mostrar respuestas incorrectas al hacer clic en un botón
document.getElementById('mostrarRespuestasBtn').addEventListener('click', function () {
    if (currentLevel === 1) {
        mostrarRespuestasIncorrectas();
    } else if (currentLevel === 2) {
        mostrarRespuestasIncorrectasSegundoNivel();
    } else if (currentLevel === 3) {
        mostrarRespuestasIncorrectasTercerNivel();
    }
});

// Funciones para navegar entre preguntas
function showNextPrimerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerPrimerNivel(currentQuestionIndex, selectedAnswer);
    }

    currentQuestionIndex = Math.min(currentQuestionIndex + 1, primerNivel.length - 1);
    renderQuestionPrimerNivel(currentQuestionIndex);
}

function showPreviousPrimerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerPrimerNivel(currentQuestionIndex, selectedAnswer);
    }

    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestionPrimerNivel(currentQuestionIndex);
}

function showNextSegundoNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerSegundoNivel(currentQuestionIndex, selectedAnswer);
    }

    currentQuestionIndex = Math.min(currentQuestionIndex + 1, segundoNivel.length - 1);
    renderQuestionSegundoNivel(currentQuestionIndex);
}

function showPreviousSegundoNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerSegundoNivel(currentQuestionIndex, selectedAnswer);
    }

    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestionSegundoNivel(currentQuestionIndex);
}

function showNextTercerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerTercerNivel(currentQuestionIndex, selectedAnswer);
    }

    currentQuestionIndex = Math.min(currentQuestionIndex + 1, tercerNivel.length - 1);
    renderQuestionTercerNivel(currentQuestionIndex);
    
}

function showPreviousTercerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerTercerNivel(currentQuestionIndex, selectedAnswer);
    }

    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestionTercerNivel(currentQuestionIndex);
    
}

// Funciones para renderizar preguntas y opciones
function renderQuestionPrimerNivel(index) {
    const question = primerNivel[index];
    const container = document.getElementById('questions-container');
    container.innerHTML = `
        <div class="question ml-sm-5 pl-sm-5 pt-2">
            <div class="py-2 h5"><b>${question.pregunta}</b></div>
            <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                ${renderOptionsPrimerNivel(question.opciones, index)}
            </div>
        </div>
    `;
    const containers = document.getElementById('respuestaJson');
    containers.textContent = question.respuesta;

    const selectedAnswer = localStorage.getItem(`${localStorageKeys.primerNivel}_${index}`);
    if (selectedAnswer) {
        const radioInput = container.querySelector(`input[value="${selectedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
    }
    iniciarTemporizador();
}

function renderOptionsPrimerNivel(options, index) {
    let html = '';
    const selectedAnswer = localStorage.getItem(`${localStorageKeys.primerNivel}_${index}`);
    for (const option in options) {
        const checked = option === selectedAnswer ? 'checked' : '';
        html += `
            <label class="options">${option}
                <input type="radio" name="radio" value="${option}" ${checked} onchange="saveSelectedAnswerPrimerNivel(${index}, '${option}')">
                <span class="checkmark"></span>
            </label>
        `;
    }
    return html;
}

function saveSelectedAnswerPrimerNivel(index, option) {
    localStorage.setItem(`${localStorageKeys.primerNivel}_${index}`, option);
}

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

    const selectedAnswer = localStorage.getItem(`${localStorageKeys.segundoNivel}_${index}`);
    if (selectedAnswer) {
        const radioInput = container.querySelector(`input[value="${selectedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
    }
    iniciarTemporizador();
}

function renderOptionsSegundoNivel(options, index) {
    let html = '';
    const selectedAnswer = localStorage.getItem(`${localStorageKeys.segundoNivel}_${index}`);
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

function saveSelectedAnswerSegundoNivel(index, option) {
    localStorage.setItem(`${localStorageKeys.segundoNivel}_${index}`, option);
}

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

    const selectedAnswer = localStorage.getItem(`${localStorageKeys.tercerNivel}_${index}`);
    if (selectedAnswer) {
        const radioInput = container.querySelector(`input[value="${selectedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
    }
    iniciarTemporizador();
}

function renderOptionsTercerNivel(options, index) {
    let html = '';
    const selectedAnswer = localStorage.getItem(`${localStorageKeys.tercerNivel}_${index}`);
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

function saveSelectedAnswerTercerNivel(index, option) {
    localStorage.setItem(`${localStorageKeys.tercerNivel}_${index}`, option);
}




function disableRadioInputs() {
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.disabled = true;
    });
}



function mostrarRespuestasIncorrectas() {
    let respuestasIncorrectas = [];
    primerNivel.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`${localStorageKeys.primerNivel}_${index}`);
        if (respuestaUsuario !== pregunta.respuesta) {
            respuestasIncorrectas.push({ pregunta: pregunta.pregunta, respuestaCorrecta: pregunta.respuesta });
        }
    });

    if (respuestasIncorrectas.length > 0) {
        alert('Tienes respuestas incorrectas en el primer nivel.');
        window.location.href = "linguisticaNivelDos.html";
        disableRadioInputs();
    } else {
        alert('Todas las respuestas del primer nivel son correctas.');
        localStorage.setItem('nivel_desbloqueado_lingui', true);
        document.getElementById('nivelUnoLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
        detenerTemporizador();
        disableRadioInputs(); 
    }
}

function mostrarRespuestasIncorrectasSegundoNivel() {
    let respuestasIncorrectas = [];
    segundoNivel.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`${localStorageKeys.segundoNivel}_${index}`);
        if (respuestaUsuario !== pregunta.respuesta) {
            respuestasIncorrectas.push({ pregunta: pregunta.pregunta, respuestaCorrecta: pregunta.respuesta });
        }
    });

    if (respuestasIncorrectas.length > 0) {
        alert('Tienes respuestas incorrectas en el segundo nivel.');
        window.location.href = "linguisticaNivelTres.html";
        alertaMostrada = true; 
        disableRadioInputs();
    } else {
        alert('Todas las respuestas del segundo nivel son correctas.');
        document.getElementById('nivelDosLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
        localStorage.setItem('nivel_desbloqueado_segundo_lingui', true);
        alertaMostrada = true;
        detenerTemporizador(); // * SE DETIENE EL TIEMPO ACA
        disableRadioInputs();
    }
}



function mostrarRespuestasIncorrectasTercerNivel() {
    let respuestasIncorrectas = [];
    tercerNivel.forEach((pregunta, index) => {
        const respuestaUsuario = localStorage.getItem(`${localStorageKeys.tercerNivel}_${index}`).toLowerCase();
        const respuestaCorrecta = pregunta.respuesta.toLowerCase();
        if (respuestaUsuario !== respuestaCorrecta) {
            respuestasIncorrectas.push({ pregunta: pregunta.pregunta, respuestaCorrecta: pregunta.respuesta });
        }
    });

    if (respuestasIncorrectas.length > 0) {
        alert('Tienes respuestas incorrectas en el tercer nivel.');
        alertaMostrada = true; 
        disableRadioInputs();
    } else {
        alert('Todas las respuestas del tercer nivel son correctas.');
        document.getElementById('nivelTresLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
        localStorage.setItem('nivel_desbloqueado_tercer_lingui', true);
        alertaMostrada = true; 
        detenerTemporizador(); // * SE DETIENE EL TIEMPO ACA
        disableRadioInputs();
    }
}


window.onload = function () {
    
    const currentUrl = window.location.href;
    
    if (localStorage.getItem('nivel_desbloqueado_lingui') === 'true') {
        document.getElementById('nivelUnoLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }
    
    if (localStorage.getItem('nivel_desbloqueado_segundo_lingui') === 'true') {
        document.getElementById('nivelDosLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }
    
    if (localStorage.getItem('nivel_desbloqueado_tercer_lingui') === 'true') {
        document.getElementById('nivelTresLin').querySelector('img').src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png';
    }


    
    if (currentUrl.includes("linguisticaNivelUno")) {
        currentLevel = 1;
        currentQuestionIndex = 0;
        renderQuestionPrimerNivel(currentQuestionIndex);
    } else if (currentUrl.includes("linguisticaNivelDos")) {
        currentLevel = 2;
        currentQuestionIndex = 0;
        renderQuestionSegundoNivel(currentQuestionIndex);
    } else if (currentUrl.includes("linguisticaNivelTres")) {
        currentLevel = 3;
        currentQuestionIndex = 0; 
        renderQuestionTercerNivel(currentQuestionIndex);
    }
}


// click para mostrar respuestas
document.getElementById('mostrarRespuestasBtn').addEventListener('click', function(){
    if (currentLevel === 1) {
        mostrarRespuestasIncorrectas();
    } else if (currentLevel === 2) {
        mostrarRespuestasIncorrectasSegundoNivel();
    } else if (currentLevel === 3){
        mostrarRespuestasIncorrectasTercerNivel();
    }
});





function showNextPrimerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerPrimerNivel(currentQuestionIndex, selectedAnswer);
    }
    
    currentQuestionIndex = Math.min(currentQuestionIndex + 1, primerNivel.length - 1);
    renderQuestionPrimerNivel(currentQuestionIndex);
}

function showPreviousPrimerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerPrimerNivel(currentQuestionIndex, selectedAnswer);
    }
    
    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestionPrimerNivel(currentQuestionIndex);
}







function showNextSegundoNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerSegundoNivel(currentQuestionIndex, selectedAnswer);
    }
    
    currentQuestionIndex = Math.min(currentQuestionIndex + 1, segundoNivel.length - 1);
    renderQuestionSegundoNivel(currentQuestionIndex);
}

function showPreviousSegundoNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerSegundoNivel(currentQuestionIndex, selectedAnswer);
    }
    
    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestionSegundoNivel(currentQuestionIndex);
}








function showNextTercerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerTercerNivel(currentQuestionIndex, selectedAnswer);
    }
    
    currentQuestionIndex = Math.min(currentQuestionIndex + 1, tercerNivel.length - 1);
    renderQuestionTercerNivel(currentQuestionIndex);
}

function showPreviousTercerNivel() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked')?.value;
    if (selectedAnswer) {
        saveSelectedAnswerTercerNivel(currentQuestionIndex, selectedAnswer);
    }
    
    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    renderQuestionTercerNivel(currentQuestionIndex);
}















