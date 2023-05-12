const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
let sizeWidth = ctx.canvas.clientWidth;
let sizeHeight = ctx.canvas.clientHeight;
let scaleWidth = sizeWidth/100;
let scaleHeight = sizeHeight/100;
bootScreen();

let playedCards = [];
let currentCard;
let unplayedCards = [];
let playerCards = [];
let aiCards = [];

function clear(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, sizeWidth, sizeHeight);
}

function bootScreen(){
    clear();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, sizeWidth, sizeHeight);
}

const getCursorPosition = (canvas, event) => { //https://blog.devgenius.io/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element-d5dc288c19e8
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if(isNear(45, sizeHeight - 100, x, y, 40) && handIndex > 0){
        handIndex -= 1;
    }
    if(isNear(sizeWidth - 45, sizeHeight - 100, x, y, 40) && playerCards.length - handIndex > 7){
        handIndex += 1;
    }
    renderScreen();
}

canvas.addEventListener('mousedown', (e) => {
    getCursorPosition(canvas, e);
})

canvas.addEventListener('mousemove', (e) => {
    checkCursorPosition(canvas, e);
})

let leftArrowMouse = false;
let rightArrowMouse = false;

function checkCursorPosition(canvas, event){
    //Will be used for howering above the arrows
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    leftArrowMouse = isNear(45, sizeHeight - 100, x, y, 40);
    rightArrowMouse = isNear(sizeWidth - 45, sizeHeight - 100, x, y, 40);
    renderScreen();
}

function isNear(x1, y1, x2, y2, distance){
    return (Math.abs(x1 - x2) <= distance) && (Math.abs(y1 - y2) <= distance);
}

function card(textureID, tags) {
    this.textureID = textureID;
    this.tags = tags;

    function canBeUsed(tag){
        let passed = false;
        for(let a = 0; a < tags.lenght; a++){
            for(let b = 0; b < tag.lenght; b++){
                if(tags[a] == tag[b]){
                    passed = true;
                }
            }
        }
        return passed;
    }
}

const numberOfTextures = 38;
let loadedTextures = 0;
let txt = [];
function loadTexture(id){
    const img = new Image();
    img.src = 'textures/' + id + '.png';
    img.onload = function() {
        txt[id] = img;
        loadedTextures++;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(txt[id], 10, 10,txt[id].width * 4, txt[id].height * 4);
        if(loadedTextures == numberOfTextures){
            startGame();
        }
    };
}

loadTextures();
function loadTextures(){
    loadTexture("s1");
    loadTexture("s7");
    loadTexture("s8");
    loadTexture("s9");
    loadTexture("s10");
    loadTexture("sj");
    loadTexture("sk");
    loadTexture("sq");
    loadTexture("d1");
    loadTexture("d7");
    loadTexture("d8");
    loadTexture("d9");
    loadTexture("d10");
    loadTexture("dj");
    loadTexture("dk");
    loadTexture("dq");
    loadTexture("c1");
    loadTexture("c7");
    loadTexture("c8");
    loadTexture("c9");
    loadTexture("c10");
    loadTexture("cj");
    loadTexture("ck");
    loadTexture("cq");
    loadTexture("h1");
    loadTexture("h7");
    loadTexture("h8");
    loadTexture("h9");
    loadTexture("h10");
    loadTexture("hj");
    loadTexture("hk");
    loadTexture("hq");
    loadTexture("j1");
    loadTexture("j2");
    loadTexture("left");
    loadTexture("left_hover");
    loadTexture("right");
    loadTexture("right_hover");
}

createCards();
function createCards(){
    playedCards.push(new card("s1",["s","1"]));
    playedCards.push(new card("s7",["s","7"]));
    playedCards.push(new card("s8",["s","8"]));
    playedCards.push(new card("s9",["s","9"]));
    playedCards.push(new card("s10",["s","10"]));
    playedCards.push(new card("sj",["s","j"]));
    playedCards.push(new card("sk",["s","k"]));
    playedCards.push(new card("sq",["s","q"]));
    playedCards.push(new card("d1",["d","1"]));
    playedCards.push(new card("d7",["d","7"]));
    playedCards.push(new card("d8",["d","8"]));
    playedCards.push(new card("d9",["d","9"]));
    playedCards.push(new card("d10",["d","10"]));
    playedCards.push(new card("dj",["d","j"]));
    playedCards.push(new card("dk",["d","k"]));
    playedCards.push(new card("dq",["d","q"]));
    playedCards.push(new card("c1",["c","1"]));
    playedCards.push(new card("c7",["c","7"]));
    playedCards.push(new card("c8",["c","8"]));
    playedCards.push(new card("c9",["c","9"]));
    playedCards.push(new card("c10",["c","10"]));
    playedCards.push(new card("cj",["c","j"]));
    playedCards.push(new card("ck",["c","k"]));
    playedCards.push(new card("cq",["c","q"]));
    playedCards.push(new card("h1",["h","1"]));
    playedCards.push(new card("h7",["h","7"]));
    playedCards.push(new card("h8",["h","8"]));
    playedCards.push(new card("h9",["h","9"]));
    playedCards.push(new card("h10",["h","10"]));
    playedCards.push(new card("hj",["h","j"]));
    playedCards.push(new card("hk",["h","k"]));
    playedCards.push(new card("hq",["h","q"]));
    playedCards.push(new card("j1",["h","s","c","d","1","7","8","9","10","j","k","q"]));
    playedCards.push(new card("j2",["h","s","c","d","1","7","8","9","10","j","k","q"]));
}

function randomizeDeck(){
    unplayedCards.sort(() => Math.random() - 0.5);
    /*for(let i = 0; i < unplayedCards.length; i++){
        console.log(unplayedCards[i]);
    }*/
}

function drawCard(side){
    let tmp = unplayedCards[unplayedCards.length - 1];
    unplayedCards.pop();
    if(side == "player"){
        playerCards.push(tmp);
    }
    else if(side == "ai")
    {
        aiCards.push(tmp);
    }
    else {
        currentCard = tmp;
    }
}

//startGame();
function startGame(){
    unplayedCards = playedCards;
    playedCards = [];
    randomizeDeck();
    let starterCards = 10;
    for(let i = 0; i < starterCards; i++){
        drawCard("player");
    }
    for(let i = 0; i < starterCards; i++){
        drawCard("ai");
    }
    drawCard("current");
    renderScreen();
}

function renderScreen(){
    bootScreen();
    renderPlayerHand();
    renderArrows();
    renderCard(currentCard, sizeWidth / 2, sizeHeight / 2);
}

function renderPlayerHand(){
    let size = Math.min(playerCards.length, 7);
    let offset =  (size - 1) / 2;
    const df = (sizeWidth / 2) - (offset * 120); //the point card renders from
    for(let i = 0; i < size; i++){
        renderCard(playerCards[i + handIndex], df + (i * 120), sizeHeight - 100);
    }
    renderArrows();
}

function renderCard(card, x, y){
    const img = card;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(txt[card.textureID], x - txt[card.textureID].width * 2, y - txt[card.textureID].height * 2,txt[card.textureID].width * 4, txt[card.textureID].height * 4);
}

let handIndex = 0;

function renderArrows(){
    if(handIndex > 0){
        if(leftArrowMouse){
            renderTexture("left_hover", 45, sizeHeight - 100);
        } else {
            renderTexture("left", 45, sizeHeight - 100);
        }
    }
    
    if(playerCards.length - handIndex > 7){
        if(rightArrowMouse){
            renderTexture("right_hover", sizeWidth - 45, sizeHeight - 100);
        } else {
            renderTexture("right", sizeWidth - 45, sizeHeight - 100);
        }
    }
    
}

function renderTexture(id, x, y){
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(txt[id], x - txt[id].width * 2, y - txt[id].height * 2,txt[id].width * 4, txt[id].height * 4);
}