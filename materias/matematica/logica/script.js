let indicadorPregunta = 0;
let esCorrecta
function setupButtonGroup(buttons, alert, respuestasCorrectas) {
    function showAlert(respuesta) {
        alert.classList.toggle("d-none");
        alert.classList.remove("alert-danger", "alert-success");
        if (respuestasCorrectas.has(respuesta)) {
            alert.classList.add("alert-success");
            esCorrecta = true
        } else {
            alert.classList.add("alert-danger");
            esCorrecta = false
        }
        alert.querySelector("strong").textContent = respuestasCorrectas.has(respuesta) ? "Respuesta correcta!" : `La respuesta correcta era: ${respuestasCorrectas.values().next().value}`;
        alert.querySelector("a").classList.toggle("d-none", respuestasCorrectas.has(respuesta));
        indicadorPregunta++;
        guardarRespuesta(`pregunta_${indicadorPregunta}`, respuesta, esCorrecta);
        // Deshabilitar todos los botones después de responder
        buttons.forEach((button) => {
            button.disabled = true;
            localStorage.setItem(`_disabled`, true);
        });
    }
    function guardarRespuesta(nombre, respuesta, esCorrecta) {
        // Obtener las respuestas del localStorage
        let respuestas = JSON.parse(localStorage.getItem("respuestas")) || {};
        // Guardar la respuesta con el nombre especificado y su estado esCorrecta
        respuestas[nombre] = {
            respuestaUser: respuesta,
            esCorrecta: esCorrecta,
            esRespuestaCorrecta: respuestasCorrectas.values().next().value,
        };
        // Guardar el objeto de respuestas en el localStorage
        localStorage.setItem("respuestas", JSON.stringify(respuestas));
    }
    buttons.forEach((button) => {
        button.disabled = JSON.parse(localStorage.getItem(`_disabled`) || false);

        button.addEventListener("click", () => {
            const respuesta = button.textContent.trim();
            showAlert(respuesta);
        });
    });
}


const group1Buttons = document.querySelectorAll(".group1 .btn");
const respuestasCorrectasGroup1 = new Set(["7"]); // Definir aquí las respuestas correctas para el grupo 1
const alertGroup1 = document.getElementById("alert");
setupButtonGroup(group1Buttons, alertGroup1, respuestasCorrectasGroup1);

const group2Buttons = document.querySelectorAll(".group2 .btn");
const respuestasCorrectasGroup2 = new Set(["(X-3)(x+3)"]); // Definir aquí las respuestas correctas para el grupo 2
const alertGroup2 = document.getElementById("alert2");
setupButtonGroup(group2Buttons, alertGroup2, respuestasCorrectasGroup2);

const group3Buttons = document.querySelectorAll(".group3 .btn");
const respuestasCorrectasGroup3 = new Set(["5"]); // Definir aquí las respuestas correctas para el grupo 2
const alertGroup3 = document.getElementById("alert3");
setupButtonGroup(group3Buttons, alertGroup3, respuestasCorrectasGroup3);

const alertGroups = {
    1: alertGroup1,
    2: alertGroup2,
    3: alertGroup3
};
function leerRespuestas() {
    let respuestas = JSON.parse(localStorage.getItem("respuestas")) || {};
    for (let i = 1; i <= Object.keys(respuestas).length; i++) {
        let alertGroup = alertGroups[i];
        alertGroup.classList.remove("d-none");
        alertGroup.classList.remove("alert-danger", "alert-success");
        if (respuestas[`pregunta_${i}`].esCorrecta) {
            alertGroup.classList.add("alert-success");
            alertGroup.querySelector("strong").textContent = "Respuesta correcta!";
            alertGroup.querySelector("a").classList.add("d-none");
        } else {
            alertGroup.classList.add("alert-danger");
            alertGroup.querySelector("strong").textContent = `La respuesta correcta era: ${respuestas[`pregunta_${i}`].esRespuestaCorrecta}`;
        }
    }
}
leerRespuestas();

// let number = 30;
// let intervalId;

// const timerElement = document.querySelector(".bg-white p");
// const buttonTimer = document.getElementById("cronometrar");
// const accordionFlush = document.getElementById("accordionFlush");

// buttonTimer.addEventListener("click", () => {
//     accordionFlush.classList.toggle("d-none");
//     buttonTimer.classList.toggle("d-none");
//     number = 30;
//     clearInterval(intervalId); // Limpiar el intervalo existente para evitar múltiples intervalos activos
//     intervalId = setInterval(() => {
//         timerElement.textContent = `Tu tiempo es de ${number} segundos`;
//         if (number === 0) {
//             clearInterval(intervalId);
//             timerElement.textContent = `Se acabo el tiempo`;
//             accordionFlush.classList.toggle("d-none");
//         }
//         number--;
//     }, 1000);
// });
