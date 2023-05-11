const joke = document.querySelector('.joke');


const httpRequest = new XMLHttpRequest();

 httpRequest.onreadystatechange = () => {
    // Process the server response here.
    if(httpRequest.readyState === XMLHttpRequest.DONE){

      let output = JSON.parse(httpRequest.responseText);
      //console.log(output);
      joke.innerHTML = output.joke;
    }
  };

  

  function requestJoke(){
    httpRequest.open("GET", "https://geek-jokes.sameerkumar.website/api?format=json", true);
    httpRequest.send();
  }
requestJoke();