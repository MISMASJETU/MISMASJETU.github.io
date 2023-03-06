const AJ_img = document.querySelector('.AJ_img');
const AJ_button = document.querySelector('.AJ_button');

const httpRequest = new XMLHttpRequest();

 httpRequest.onreadystatechange = () => {
    // Process the server response here.
    if(httpRequest.readyState === XMLHttpRequest.DONE){

      let output = JSON.parse(httpRequest.responseText);
      AJ_img.src = output.message;
    }
  };

  function requestDog(){
    httpRequest.open("GET", "https://dog.ceo/api/breeds/image/random", true);
    httpRequest.send();
  }


AJ_button.addEventListener('click',requestDog);