document.addEventListener("DOMContentLoaded", function () {
    const questionsContainer = document.getElementById('questions-container');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let currentQuestionIndex = 0;
    let questionsData = null;
    const totalQuestionsToShow = 15;
    let currentLevel = 1;
    

    function loadQuestions(nivel) {
        fetch('./../../../json/matematica/nivelUnoMat.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se puede cargar el JSON');
                }
                return response.json();
            })
            .then(data => {
                questionsData = data.preguntas.find(item => item.nivel === nivel).preguntas;
                questionsData = questionsData.slice(0, totalQuestionsToShow);
                currentQuestionIndex = 0; 
                showQuestion(currentQuestionIndex);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function showQuestion(index) {
        if (questionsData && index >= 0 && index < questionsData.length) {
            const pregunta = questionsData[index];
            const storedResponse = localStorage.getItem(`response_${currentLevel}_${index}`);
            const storedCorrect = localStorage.getItem(`correct_${currentLevel}_${index}`);

    
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('container', 'mt-sm-5', 'my-1');
    
            questionDiv.innerHTML = `
                <div class="question ml-sm-5 pl-sm-5 pt-2">
                    <div class="py-2 h5 mb-4"><b>Pregunta ${pregunta.Pregunta}: ${pregunta.Enunciado}</b></div>
                    <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options${index}">
                        <div class="option mb-3">
                            <input type="radio" id="option_a" name="options${index}" value="a" ${(storedResponse === 'a') ? 'checked' : ''} ${storedResponse ? 'disabled' : ''}>
                            <label for="option_a">A) ${pregunta['Opción a']}</label>
                        </div>
                        <div class="option mb-3">
                            <input type="radio" id="option_b" name="options${index}" value="b" ${(storedResponse === 'b') ? 'checked' : ''} ${storedResponse ? 'disabled' : ''}>
                            <label for="option_b">B) ${pregunta['Opción b']}</label>
                        </div>
                        <div class="option mb-3">
                            <input type="radio" id="option_c" name="options${index}" value="c" ${(storedResponse === 'c') ? 'checked' : ''} ${storedResponse ? 'disabled' : ''}>
                            <label for="option_c">C) ${pregunta['Opción c']}</label>
                        </div>
                        <div class="option mb-3">
                            <input type="radio" id="option_d" name="options${index}" value="d" ${(storedResponse === 'd') ? 'checked' : ''} ${storedResponse ? 'disabled' : ''}>
                            <label for="option_d">D) ${pregunta['Opción d']}</label>
                        </div>
                    </div>
                    <div class="alert alert-success alert-dismissible fade show text-center ${storedCorrect === 'true' ? '' : 'd-none'}" id="alertCorrect${index}" role="alert">
                        <strong>¡Respuesta correcta!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    
                    <div class="alert alert-danger alert-dismissible fade show text-center ${storedCorrect === 'false' ? '' : 'd-none'}" id="alertIncorrect${index}" role="alert">
                        <strong>La respuesta correcta era: ${pregunta.Respuestas}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        <a href="#" class="bg-transparent border-0 justification-link" data-bs-toggle="modal" data-bs-target="#static${index}">
                            <strong>Conocé la justificación. Haz Click aquí.</strong>
                        </a>
                    </div>
                    
                    <!-- Modal -->
                    <div class="modal fade" id="static${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body">
                                    ${pregunta.Explicación}
                                </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-gray border border-dark text-black" data-bs-dismiss="modal">Ok! Gracias.</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            `;
            
            questionsContainer.innerHTML = '';
            questionsContainer.appendChild(questionDiv);

            const options = questionDiv.querySelectorAll(`input[name="options${index}"]`);
            options.forEach(option => {
            option.addEventListener('click', () => {
                const selectedOption = questionDiv.querySelector(`input[name="options${index}"]:checked`).value;
                const isCorrect = selectedOption === pregunta.Respuestas.charAt(0);
                localStorage.setItem(`response_${currentLevel}_${index}`, selectedOption);
                localStorage.setItem(`correct_${currentLevel}_${index}`, isCorrect.toString());

                if (isCorrect) {
                    questionDiv.querySelector(`#alertCorrect${index}`).classList.remove('d-none');
                    questionDiv.querySelector(`#alertIncorrect${index}`).classList.add('d-none');
                } else {
                    questionDiv.querySelector(`#alertIncorrect${index}`).classList.remove('d-none');
                    questionDiv.querySelector(`#alertCorrect${index}`).classList.add('d-none');

                }

                options.forEach(option => {
                    if (selectedOption !== option.value) {
                        option.disabled = true;

                        // al responder las 15 preguntas detecta el check
                        updateLevelLockButton(currentLevel);
                        
                    }
                });
            });
        });
        
        // logica para el check
        updateLevelLockButton(currentLevel);
        }
    }

    // metodo para el check de los niveles al finalizar las 15 preguntas por nivel
    function updateLevelLockButton(level) {
        for (let i = 1; i <= 4; i++) {
            const allAnswered = Array.from({ length: totalQuestionsToShow }, (_, j) =>
                localStorage.getItem(`response_${i}_${j}`) !== null
            ).every(Boolean);
        
            const levelLockButton = document.getElementById(`levelLockButton${i}`);
            if (allAnswered) {
                levelLockButton.innerHTML = '<i class="bi bi-check-lg"></i>';
                levelLockButton.classList.remove('btn-secondary');
                levelLockButton.classList.add('btn-success');
                localStorage.setItem(`successState_${i}`, 'true'); 
            } else {
                levelLockButton.innerHTML = '<i class="bi bi-lock"></i>';
                levelLockButton.classList.remove('btn-success');
                levelLockButton.classList.add('btn-secondary');
                localStorage.removeItem(`successState_${i}`); 
            }
        }
    }
    
    

    loadQuestions(1);
    // loadQuestions(currentLevel);

    prevButton.addEventListener('click', function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentQuestionIndex < questionsData.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });




    // logica para desbloqueo de niveles
    for (let i = 1; i <= 4; i++) {
        const levelLockButton = document.getElementById(`levelLockButton${i}`);
        levelLockButton.addEventListener('click', function() {
            currentLevel = i;
            loadQuestions(currentLevel);
        });
    }




    function iniciarTemporizador() {
        let segundos = 0;
        setInterval(function() {
          segundos++;
          const horas = Math.floor(segundos / 3600);
          const minutos = Math.floor((segundos % 3600) / 60);
          const segundosRestantes = segundos % 60;
          document.getElementById('temporizador').innerText = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
        }, 1000);
      }
  
      // temporizador cuando se cargue la página
      window.onload = function() {
        iniciarTemporizador();
      };

      
});



function actualizarImagenesNiveles() {
    for (let i = 1; i <= 4; i++) {
        const nivelCompletado = localStorage.getItem(`successState_${i}`) === 'true';
        const imagenNivel = document.getElementById(`nivel${i}`).querySelector('img');
        if (nivelCompletado) {
            imagenNivel.src = "https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png";
        } else {
            imagenNivel.src ="https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png"
        }
    }
}

actualizarImagenesNiveles();

