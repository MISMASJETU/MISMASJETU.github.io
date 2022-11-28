let moduloNumber = Math.floor(Math.random() * 10) + 1;
const moduloAnswer = document.querySelector('.moduloA');
const submitModulo = document.querySelector('.submit1');
const moduloInput = document.querySelector('.modulo');

console.log(moduloNumber);
const answerAnswer = document.querySelector('.answerA');
const submitAnswer = document.querySelector('.submit2');
const answerInput = document.querySelector('.answer');

const resetModulo = document.querySelector('.submit3');

function tryModulo() {
    //NO OPTION FOR NUMBERS HIGHER THAN 99 AND NEGATIVE NUMBERS
    //ALSO THINK OF STRATEGY, HINT: SEARCH UP CHINESE GENERALS
    const moduloTmp = Number(moduloInput.value);
    if(moduloTmp < 100 && moduloTmp > 0){
        moduloAnswer.textContent = 'Modulo result: ';
        moduloAnswer.textContent += `${moduloNumber % moduloTmp}`;
    } else {
        alert('Number must be in between 1 and 99')
    }
    moduloInput.value = '';
    moduloInput.focus();
}


function tryAnswer() {
    const answerGuess = Number(answerInput.value);

    if (answerGuess === moduloNumber) {
        answerAnswer.textContent = 'Congratulations! You got it right!';
        answerAnswer.style.backgroundColor = 'green';
    } else {
        answerAnswer.textContent = 'Wrong!';
        answerAnswer.style.backgroundColor = 'red';
    }
    answerInput.value = '';
    answerInput.focus();
  }

  function restartM() {
    moduloNumber = Math.floor(Math.random() * 1000) + 1;
    moduloInput.value = '';
    answerInput.value = '';
    answerAnswer.textContent = 'Waiting for answer';
    answerAnswer.style.backgroundColor = 'yellow';
    console.log(moduloNumber);
  }

  submitModulo.addEventListener('click', tryModulo);
  submitAnswer.addEventListener('click', tryAnswer);
  resetModulo.addEventListener('click', restartM);