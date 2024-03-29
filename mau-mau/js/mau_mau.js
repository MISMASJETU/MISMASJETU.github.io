const canvas = document.getElementById("canvas"); //Canvas
const ctx = canvas.getContext("2d"); //Canvas ctx
canvas.width = 1000; //Sets width of the canvas
canvas.height = 600; //Sets height of the canvas
let sizeWidth = ctx.canvas.clientWidth; //Width of the canvas for client
let sizeHeight = ctx.canvas.clientHeight; //Height of the canvas for client
let scaleWidth = sizeWidth/100; //1% Of width
let scaleHeight = sizeHeight/100; //1% Of height
bootScreen();

let playedCards = []; //Cards waiting to be added back into the pack
let currentCard; //Current card on the field
let unplayedCards = []; //Cards yet to be drawn
let playerCards = []; //Cards held by the player
let aiCards = []; //Cards held by the ai
let turn = 0; //Current turn also means mode
//1 = Player turn
//2 = Ai turn
//3 = Animation
//4 = Victory
//5 = Defeat

let score = 99; //Player Score

//Actually unused
function clear(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, sizeWidth, sizeHeight);
}

//Renders background
function bootScreen(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, sizeWidth, sizeHeight);
}

//Gets position of the cursor and handles player hand arrows and also updates the screen
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
    detectCardClick(x,y);
    if(turn == 1 || turn == 2){
        renderScreen();
    }
}

//Triggers when mouse is clicked
canvas.addEventListener('mousedown', (e) => {
    e.preventDefault(); // prevent default action
    getCursorPosition(canvas, e);
})

//Triggers when mouse moves
canvas.addEventListener('mousemove', (e) => {
    checkCursorPosition(canvas, e);
})

let leftArrowMouse = false;
let rightArrowMouse = false;

//Check curser position and can lights up arrows, also updates the screen
function checkCursorPosition(canvas, event){
    //Will be used for howering above the arrows
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    leftArrowMouse = isNear(45, sizeHeight - 100, x, y, 40);
    rightArrowMouse = isNear(sizeWidth - 45, sizeHeight - 100, x, y, 40);
    if(turn == 1 || turn == 2){
        renderScreen();
    }
}
//Checks if mouse is hovering above specific place
function isNear(x1, y1, x2, y2, distance){
    return (Math.abs(x1 - x2) <= distance) && (Math.abs(y1 - y2) <= distance);
}
//Checks if mouse is hovering above specific card
function hoversOverCard(x1, y1, x2, y2){
    return (Math.abs(x1 - x2) <= 64) && (Math.abs(y1 - y2) <= 96);
}
//Checks if mouse is hovering above draw button
function hoversOverDraw(x1, y1, x2, y2){
    return (Math.abs(x1 - x2) <= 32) && (Math.abs(y1 - y2) <= 48);
}

let aMode = false;
let drawMode = 0;

//Cards, need I explain more?
function card(textureID, tags) {
    this.textureID = textureID;
    this.tags = tags;

    this.canBeUsed = function(tag){
        let passed = false;
        for(let a = 0; a < tags.length; a++){
            if(aMode){
                if(tags[a] == "1"){
                    passed = true;
                }
            } else if(drawMode > 0){
                if(tags[a] == "7"){
                    passed = true;
                }
            } else {
                for(let b = 0; b < tag.length; b++){
                    if(tags[a] == tag[b]){
                        passed = true;
                    }
                }
            }
            
        }
        return passed;
    }
}
//Handles texture loading
const numberOfTextures = 54;
let loadedTextures = 0;
let txt = [];
function loadTexture(id){
    const img = new Image();
    img.src = 'textures/' + id + '.png';
    img.onload = function() {
        txt[id] = img;
        loadedTextures++;
        //ctx.imageSmoothingEnabled = false;
        //ctx.drawImage(txt[id], 10, 10,txt[id].width * 4, txt[id].height * 4);
        if(loadedTextures == numberOfTextures){
            startGame();
        }
    };
}

//Loads all textures
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
    loadTexture("A");
    loadTexture("YOUR_TURN");
    loadTexture("card");
    loadTexture("1");
    loadTexture("2");
    loadTexture("3");
    loadTexture("4");
    loadTexture("5");
    loadTexture("6");
    loadTexture("7");
    loadTexture("8");
    loadTexture("9");
    loadTexture("0");
    loadTexture("DEFEAT");
    loadTexture("VICTORY");
    loadTexture("SCORE");
}

//Creates all the cards
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
    playedCards.push(new card("j1",["h","s","c","d","1","7","8","9","10","j","k","q","j"]));
    playedCards.push(new card("j2",["h","s","c","d","1","7","8","9","10","j","k","q","j"]));
}

//Randomizes the deck
function randomizeDeck(){
    unplayedCards.sort(() => Math.random() - 0.5);
}

//Draws card for either player or ai
function drawCard(side){
    while(unplayedCards.length <= 0){
        if(playedCards.length > 0){
            unplayedCards = playedCards;
            playedCards = [];
            randomizeDeck();
        } else {
            return;
        }
    }
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

//Starts the game, duh
function startGame(){
    unplayedCards = playedCards;
    playedCards = [];
    randomizeDeck();
    let starterCards = 6;
    for(let i = 0; i < starterCards; i++){
        drawCard("player");
    }
    for(let i = 0; i < starterCards; i++){
        drawCard("ai");
    }
    drawCard("current");
    turn = 1;
    renderScreen();
}

//Renders the screen, duh
function renderScreen(){
    if(turn == 0){
        return;
    }
    if(playerCards.length <= 0){
        turn = 4;
    }
    if(aiCards.length <= 0){
        turn = 5;
    }
    bootScreen();
    renderPlayerHand();
    renderArrows();
    renderAiHand();
    renderCard(currentCard, sizeWidth / 2, sizeHeight / 2);
    if(turn == 1){
        if(!canPlayerPlay()){
            //drawFunction();
            //turn = 2;
        } else{
        }
        renderTextureD("YOUR_TURN", 160, 30, 0.7, 0.7);
        renderTextureD("card", 45, sizeHeight - 200, 2, 2);
    }
    if(turn == 2){
        aiTurn();
    }
    if(turn == 4 || turn == 5){
        bootScreen();
        let tmp;
        if(turn == 4){
            tmp = "VICTORY";
        } else {
            score -= 25;
            tmp = "DEFEAT";
        }
        if(score < 0){
            score = 0;
        }
        renderTextureD(tmp, sizeWidth / 2, sizeHeight / 2 - 100, 1, 1);
        renderTextureD("SCORE", sizeWidth / 2, sizeHeight / 2, 1, 1);
        if(score < 10){
            renderTextureD(String(score), sizeWidth / 2, 45, 6, 6);
        } else {
            renderTextureD(score.toString()[0], sizeWidth / 2 - 15, sizeHeight / 2 + 65, 5, 5);
            renderTextureD(String(score % 10), sizeWidth / 2 + 15, sizeHeight / 2 + 65, 5, 5);
        }
        save();
        load();
    }
}

//Renders player hand, duh
function renderPlayerHand(){
    let size = Math.min(playerCards.length, 7);
    let offset =  (size - 1) / 2;
    const df = (sizeWidth / 2) - (offset * 120); //the point card renders from
    for(let i = 0; i < size; i++){
        renderCard(playerCards[i + handIndex], df + (i * 120), sizeHeight - 100);
    }
    renderArrows();
}

//Renders a card, duh
function renderCard(card, x, y){
    const img = card;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(txt[card.textureID], x - txt[card.textureID].width * 2, y - txt[card.textureID].height * 2,txt[card.textureID].width * 4, txt[card.textureID].height * 4);
}

let handIndex = 0; //Value of how many cards the player has shifted

//Renders the player card arrows
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

//Renders any texture
function renderTexture(id, x, y){
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(txt[id], x - txt[id].width * 2, y - txt[id].height * 2,txt[id].width * 4, txt[id].height * 4);
}

//Renders texture, but size of it can be specified
function renderTextureD(id, x, y, width, height){
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(txt[id], x - txt[id].width * (width/2), y - txt[id].height * (height/2),txt[id].width * width, txt[id].height * height);
}

//Detects if mouse is clicking on a card
function detectCardClick(x, y){
    if(turn == 1){
        let size = Math.min(playerCards.length, 7);
        let offset =  (size - 1) / 2;
        const df = (sizeWidth / 2) - (offset * 120); //the point card renders from
        for(let i = 0; i < size; i++){
            if(hoversOverCard(x,y,df + (i * 120), sizeHeight - 100)){
                playCard(i + handIndex, "player");
            }
        }
        if(hoversOverDraw(x,y,45, sizeHeight - 200)){
            drawFunction("player");
            renderScreen();
            turn = 2;
        }
    }
    
}

//Checks if player actually can play any card
function canPlayerPlay(){
    for(let i = 0; i < playerCards.length; i++){
        if(playerCards[i].canBeUsed(currentCard.tags)){
            return true;
        }
    }
    return false;
}

//Before card can be drawn, it checks if aMode or drawMode is active and handles them respectively
function drawFunction(side){
    if(drawMode > 0){
        for(let i = 0; i < drawMode * 2; i++){
            drawCard(side);
        }
        drawMode = 0;
    }else if(!aMode){
        drawCard(side);
    } else {
        aMode = false;
    }
}

//Handles when card is supossed to be played
function playCard(id, type){
    let card;
    if(type == "player"){
        card = playerCards[id];
    }
    if(type == "ai"){
        card = aiCards[id];
    }
    let passed = card.canBeUsed(currentCard.tags);
    activateModes(card);
    if(passed){
        playedCards.push(currentCard);
        if(type == "player"){
            currentCard = card;
            playerCards.splice(id, 1);
            turn = 2;
        }
        if(type == "ai"){
            animationCard = card;
            aiCards.splice(id, 1);
            turn = 1; //starts card animation

        }
    }
    while(handIndex + 7 > Math.max(playerCards.length,7)){
        handIndex--;
    }
    renderScreen();
}

//Handles activation of Amode and drawMode
function activateModes(card){
    if(card.tags.includes("7") && (drawMode > 0 || !card.tags.includes("j"))){
        drawMode += 1;
    }
    if(card.tags.includes("1") && !card.tags.includes("j")){
        aMode = true;
    }
}

let animationCard;

//Handles ai turn
function aiTurn(){
    score--;
    for(let i = 0; i < aiCards.length; i++){
        if(aiCards[i].canBeUsed(currentCard.tags)){
            playCard(i,"ai");
            turn = 3;
            startAnimation();
            return;
        }
    }
    drawFunction("ai");
    turn = 1;
    renderScreen();
}   

//Renders how many cards does the ai have
function renderAiHand(){
    renderTextureD("card", sizeWidth - 50, 20, 4, 4);
    if(aiCards.length < 10){
        renderTextureD(String(aiCards.length), sizeWidth - 50, 45, 6, 6);
    } else {
        renderTextureD(aiCards.length.toString()[0], sizeWidth - 65, 45, 5, 5);
        renderTextureD(String(aiCards.length % 10), sizeWidth - 35, 45, 5, 5);
    }
}


//Starts animation of card sliding into the place
function startAnimation() {
    let counter = 0;
    const intervalId = setInterval(() => {
      renderAnimation(counter);
      counter++;
      if (counter === 60) {
        clearInterval(intervalId);
      }
    }, 25);

    function renderAnimation(i){
        if(turn != 3){
            return;
        }
        renderScreen();
        renderCard(animationCard, (sizeWidth / 2), (sizeHeight / 2)  - (250 * ((60 - i) / 60)));
        if(i === 60 - 1){
            turn = 1;
            currentCard = animationCard;
            renderScreen();
        }
    }
}

//Saves high score
function save(){
    if(localStorage.getItem('score') < score){
        localStorage.setItem('score', score);
    }
}

const Hscore = document.getElementById("score"); //High score paragraph

//Loads high score
load();
function load(){
    let x = localStorage.getItem('score');
    if(typeof x === 'undefined' || x === null){
        localStorage.setItem('score', 0);
    }
    Hscore.innerHTML = "High Score: " + localStorage.getItem('score');
}