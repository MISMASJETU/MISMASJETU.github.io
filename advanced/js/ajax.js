//const AJ_img = document.querySelector('.AJ_img');
const AJ_button = document.querySelector('.AJ_button');
const AJ_dogs = document.querySelector('.AJ_dogs');
const AJ_size = document.querySelector('.AJ_size');
AJ_size.value = 1;


const httpRequest = new XMLHttpRequest();
let httpRequests = [];

 httpRequest.onreadystatechange = () => {
    // Process the server response here.
    if(httpRequest.readyState === XMLHttpRequest.DONE){

      let output = JSON.parse(httpRequest.responseText);
      AJ_img.src = output.message;
    }
  };

  

  function requestDog(){
    AJ_dogs.innerHTML = '';
    httpRequests = [];
    for(let i = 0; i < AJ_size.value; i ++){
      httpRequests[i] = new XMLHttpRequest();
      httpRequests[i].open("GET", "https://dog.ceo/api/breeds/image/random", true);

      httpRequests[i].onreadystatechange = () => {
        // Process the server response here.
        if(httpRequests[i].readyState === XMLHttpRequest.DONE){
          let output = JSON.parse(httpRequests[i].responseText);
          AJ_dogs.innerHTML += "<img src=\"" + output.message + "\">"
          //console.log(output);
          if(i < AJ_size.value - 1){
            httpRequests[i+1].send();
          }
        }
      };
    }
    httpRequests[0].send();
  }


AJ_button.addEventListener('click',requestDog);