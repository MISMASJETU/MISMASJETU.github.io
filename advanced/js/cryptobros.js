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
setInterval(autoUpdate, 4000); // Call the function every 1000ms (1 second)


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
      //for(let b = 0; b < 3; b++){
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
        /*
        if(b == 0){
          ba = "usd"
          data += 100;
        }
        if(b == 1){
          ba = "eur"
          data += 200;
        }
        if(b == 2){
          ba = "czk"
          data += 300;
        }
        */
        cell1.innerHTML = ab + " to " + to;
        cell1.setAttribute("data-sort",data);
        cell2.innerHTML = historyX[ab][to][0].value;
        cell3.innerHTML = historyX[ab][to][0].time;
      //}
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