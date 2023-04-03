//const QM_button = $( "QM_button" );
//const QM_size = $( "QM_size" );
//console.log(QM_button);
//console.log(QM_size);
let QM_table = [];
let w = 0;
let i = 0;
$("#QM_size").val(1);

$(".QM_button").on( "click", function( event ) {
    boxAdd();
  });

function boxAdd(){
    
    i++;
    tableReconstruct();
    
    for(let a = 0; a < ($("#QM_size")).val(); a++){
        sendRequest(i,a);
    }
}

function tableReconstruct(){
    let tmpTable = new Array(i).fill(new Array(w));
    for(let a = 0; a < QM_table.length; a++){
        for(let b = 0; b < QM_table[a].length; b++){
            tmpTable[a][b] = QM_table[a][b];
            //console.log(a + " " + b);
            //console.log(a + " "  + b + " " + QM_table[a][b].message);
        }
    }
    QM_table = tmpTable;
    
    console.log("/////////////////////////////")
    for(let a = 0; a < QM_table.length; a++){
        for(let b = 0; b < QM_table[a].length; b++){
            console.log(a + " "  + b + " " + QM_table[a][b].message);
        }
    }
}

function boxMake(){
    let tmp = "";
    
    tmp += "<table>";
    for(let a = 0; a < QM_table.length; a++){
        tmp += "<tr>";
        for(let b = 0; b < QM_table[a].length; b++){
            if(QM_table[a][b] != null){
                tmp += "<th><img src=\"" + QM_table[a][b].message + "\"></th>";
                //console.log(a + " "  + b + " " + QM_table[a][b]);
            }
        }
        tmp += "</tr>";
    }
    $(".QM_content").html(tmp);
    tmp += "</table>";

    //console.log($(".QM_content").html());
}

function sendRequest(x,y){
    $.ajax({
        url: "https://dog.ceo/api/breeds/image/random",
        data: {
          zipcode: 97201
        },
        success: function( result ) {
          QM_table[x - 1][y] = result;
          //console.log((x - 1) + " " + (y));
          //console.log(QM_table[x-1][y-1]);  
          boxMake();
        }
      });
}