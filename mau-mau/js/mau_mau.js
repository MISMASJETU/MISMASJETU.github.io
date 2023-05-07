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
    console.log(x + " " + y);
}

canvas.addEventListener('mousedown', (e) => {
    getCursorPosition(canvas, e);
})

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

const numberOfTextures = 34;
let loadedTextures = 0;
let txt = [];
function loadTexture(id){
    const img = new Image();
    img.src = 'textures/' + id + '.png';
    img.onload = function() {
        txt[id] = img;
        loadedTextures++;
        console.log(loadedTextures);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(txt[id], 10, 10,txt[id].width * 4, txt[id].height * 4);
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