class CR_data {
  constructor(value,time){
    this.value = value;
    this.time = time;
  }
}


const CR_cList = document.querySelector('.CR_cList');
const CR_crList = document.querySelector('.CR_crList');

function autoUpdate() {
    console.log("Automatic Crypto Update");
    
    sendRequest(CR_crList.value,CR_cList.value);
    buildTable(CR_crList.value,CR_cList.value);
    
}
setInterval(autoUpdate, 6000); // Call the function every 1000ms (1 second)


let historyX = {};
historyX['bitcoin'] = {};
historyX['bitcoin']['czk'] = new Array(5).fill(new CR_data(-1,null));
historyX['bitcoin']['eur'] = new Array(5).fill(new CR_data(-1,null));
historyX['bitcoin']['usd'] = new Array(5).fill(new CR_data(-1,null));
historyX['ethereum'] = {};
historyX['ethereum']['czk'] = new Array(5).fill(new CR_data(-1,null));
historyX['ethereum']['eur'] = new Array(5).fill(new CR_data(-1,null));
historyX['ethereum']['usd'] = new Array(5).fill(new CR_data(-1,null));
historyX['tether'] = {};
historyX['tether']['czk'] = new Array(5).fill(new CR_data(-1,null));
historyX['tether']['eur'] = new Array(5).fill(new CR_data(-1,null));
historyX['tether']['usd'] = new Array(5).fill(new CR_data(-1,null)  );

function sendRequest(from,to){
    $.ajax({
        //url: "https://api.coingecko.com/api/v3/simple/price?ids=" + from + "&vs_currencies=" + to,
        url:  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether&vs_currencies=czk%2Cusd%2Ceur",
        data: {
          zipcode: 97201
        },
        success: function( result ) {
            //console.log("https://api.coingecko.com/api/v3/simple/price?ids=" + from + "&vs_currencies=" + to);
            //addRecord(from,to,result[from][to]);
            addRecord("bitcoin","usd",result.bitcoin.usd);
            addRecord("bitcoin","czk",result.bitcoin.czk);
            addRecord("bitcoin","eur",result.bitcoin.eur);
            addRecord("ethereum","usd",result.ethereum.usd);
            addRecord("ethereum","czk",result.ethereum.czk);
            addRecord("ethereum","eur",result.ethereum.eur);
            addRecord("tether","usd",result.tether.usd);
            addRecord("tether","czk",result.tether.czk);
            addRecord("tether","eur",result.tether.eur);
        }
      });
}

function addRecord(from,to,value){
    let today = new Date();
    let currentTime = today.getFullYear()+'-'+(today.getMonth()+1) + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    historyX[from][to].unshift(new CR_data(value, currentTime));
    historyX[from][to].pop();
}

function buildTable(from,to){
    // Create a new table element
    let table1 = document.createElement('table');
    table1.style.border = 'solid';
    // Create five rows and one cell in each row
    for (let i = 0; i < 5; i++) {
      let row = table1.insertRow();
      let cell1 = row.insertCell();
      let cell2 = row.insertCell();
      if(historyX[from][to][i].value == -1){
        cell1.innerHTML = "XXX";
        cell2.innerHTML = "XXX";
      }
      else
      {
        cell1.innerHTML = historyX[from][to][i].value;
        cell2.innerHTML = historyX[from][to][i].time;
      }
    }
    table1.classList.add("CR_table1");
    // Get the element with class "CR_table"
    let oldTable = document.querySelector('.CR_table1');
  
    // Replace the old table with the new table
    oldTable.parentNode.replaceChild(table1, oldTable);

    let table2 = document.createElement('table');
    //Tcell.innerHTML = "Name";
    //table2.style.border = 'solid';
    table2.classList.add("sortable");

    var headerRow = document.createElement("tr");

    var movieNameHeader = document.createElement("th");
    movieNameHeader.textContent = "Currencies";
    headerRow.appendChild(movieNameHeader);
    
    var sizeHeader = document.createElement("th");
    sizeHeader.textContent = "Price";
    headerRow.appendChild(sizeHeader);
    
    var releaseDateHeader = document.createElement("th");
    releaseDateHeader.textContent = "Timestamp";
    headerRow.appendChild(releaseDateHeader);
    var tHead = document.createElement("thead");
    tHead.appendChild(headerRow);
    table2.appendChild(tHead);
    



    var tBody = document.createElement("tbody");
    for(let a = 0; a < 3; a++){
      let row = tBody.insertRow();
      let cell1 = row.insertCell();
      let cell2 = row.insertCell();
      let cell3 = row.insertCell();
      let ab = "";
      let ba = "";
      let data = 0;
      if(a == 0){
        ab = "bitcoin"
        data += 1000;
      }
      if(a == 1){
        ab = "ethereum"
        data += 2000;
      }
      if(a == 2){
        ab = "tether"
        data += 3000;
      }
      cell1.innerHTML = ab + " to " + to;
      cell1.setAttribute("data-sort",data);
      cell2.innerHTML = historyX[ab][to][0].value;
      cell3.innerHTML = historyX[ab][to][0].time;
    }
    table2.appendChild(tBody);  

    table2.classList.add("CR_table2");
    let oldTable1 = document.querySelector('.CR_table2');
    oldTable1.parentNode.replaceChild(table2, oldTable1);

    
}
autoUpdate();  

CR_cList.addEventListener('change', function(){
  buildTable(CR_crList.value,CR_cList.value);
});
CR_crList.addEventListener('change', function(){
  buildTable(CR_crList.value,CR_cList.value);
}); 

const canvas1 = document.getElementById("CR_canvas");
const ctx1 = canvas1.getContext("2d");
canvas1.width = 1000;
canvas1.height = 500;

drawLine(0,100,200,400);
drawLine(200,400,400,350);
drawLine(400,350,600,300);
drawLine(600,300,800,150);
drawLine(800,150,1000,100);
function drawLine(x1,y1,x2,y2){
  ctx1.strokeStyle = "#000000";
  ctx1.beginPath();
  ctx1.lineWidth = CD_slider.value;
  ctx1.strokeStyle = CD_color.value;
  ctx1.moveTo(x1,y1);
  ctx1.lineTo(x2, y2);
  ctx1.stroke();
}