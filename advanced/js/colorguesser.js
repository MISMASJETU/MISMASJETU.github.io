const cg_guess = document.querySelector('.cg_guess');
const cg_buttons = document.querySelector('.cg_buttons');
const cg_difficulty = document.querySelector('.cg_difficulty');
const cg_reset = document.querySelector('.cg_reset');
const cg_time = document.querySelector('.cg_time');
const cg_score = document.querySelector('.cg_score');
const cg_highscore = document.querySelector('.cg_highscore');
const number = 3;
let cg_answer = 0;
let cg_color;
let score = Number(0);
let highscore = Number(0);

let startTime;


cg_difficulty.value = 3;
cg_buttons.style.margin = '2em';
cg_buttons.style.display = 'flex';
cg_buttons.style.justifyContent = 'center';
cg_buttons.style.flexWrap = 'wrap';

function removeButtons(){
    while (cg_buttons.firstChild) {
        cg_buttons.removeChild(cg_buttons.firstChild);
    }
}

function constructButton(){
    removeButtons();
    for(let i = 0; i < Number(cg_difficulty.value); i++){
        //console.log(i + "<" + Number(cg_difficulty.value));
        let tmp_child = document.createElement('div');
        tmp_child.classList.add('cg_button');
        let tmpButton = document.createElement('input');
        tmpButton.type = 'submit';
        tmpButton.classList.add('cg_button' + i);
        tmpButton.value = 'x';
        tmpButton.style.margin = '0.1em';
        tmpButton.style.fontSize = '2em';
        tmpButton.style.border = '0.5em';
        tmpButton.style.borderStyle = 'solid';
        tmpButton.style.width = '5em';
        tmpButton.style.height = '5em';
        if(i == cg_answer){
            tmpButton.style.backgroundColor = cg_color;
            tmp_child.addEventListener('click', clickAnswer);
        } else {
            let tmpColor = "#"+  Math.floor(Math.random()*16777215).toString(16);
            tmpButton.style.backgroundColor = tmpColor;
            tmp_child.addEventListener('click', clickWrong);
        }

        tmp_child.appendChild(tmpButton);
        cg_buttons.appendChild(tmp_child);
    }
    //cg_guess.style.backgroundColor = cg_color;
}

function clickAnswer(){
    //console.log(startTime);
    let tmp = (Number(Number(performance.now()) - Number(startTime)) / 1000);
    cg_time.textContent = "Last guess took: " + tmp + " seconds";
    score += Number(cg_difficulty.value);
    playRound();
    constructButton();
    scoreUpdate();
}

function clickWrong(){
    saveScore();
    localStorage.setItem("cg_highscore", highscore);
    score = 0;
    removeButtons();
    scoreUpdate();
}

function saveScore(){
    if(highscore < score){
        highscore = score;
    }
}

function playRound(){
    startTime = performance.now();
    let color = "#"+  Math.floor(Math.random()*16777215).toString(16);
    cg_guess.textContent = color;
    cg_color = color;
    cg_answer = Math.floor(Math.random() * cg_difficulty.value);
    //console.log(cg_answer);
}

function scoreUpdate(){
    cg_score.textContent = "Score: " + score;
    cg_highscore.textContent = "High Score: " + highscore;
}


function reset(){
    saveScore();
    score = 0;
    if(cg_difficulty.value > 1){
        playRound();
        constructButton();
    }
    scoreUpdate();
}

cg_reset.addEventListener('click', reset);

if(localStorage.getItem("cg_highscore") != null){
    cg_highscore.textContent = "High Score: " + localStorage.getItem("cg_highscore");
    highscore = Number(localStorage.getItem("cg_highscore"));
}