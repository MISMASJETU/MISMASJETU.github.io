
const GL_pName = document.querySelector('.GL_pName');
const GL_pAuthor = document.querySelector('.GL_pAuthor');
const GL_pPrice = document.querySelector('.GL_pPrice');
const GL_pYear = document.querySelector('.GL_pYear');
const GL_pStorage = document.querySelector('.GL_pStorage');
const GL_pStorageParams = document.querySelector('.GL_pStorageParams');
const GL_pSubmit = document.querySelector(".GL_pSubmit");

const GL_aName = document.querySelector('.GL_aName');
const GL_aSurname = document.querySelector('.GL_aSurname');
const GL_aBirthday = document.querySelector('.GL_aBirth');
const GL_atorage = document.querySelector('.GL_aStorage');
const GL_aStorageParams = document.querySelector('.GL_aStorageParams');
const GL_aSubmit = document.querySelector(".GL_aSubmit");


class GL_image {
    name;
    Author;
    price;
    year;
    constructor(name, Author, price, year) {
      this.name = name;
      this.Author = Author;
      this.price = price;
      this.year = year;
    }

    toString(){
        return "GL_image{" + this.name + "/" + this.price + "/" + this.year + "/" + this.Author.toString() + "}";
    }
    static PriceSum(){
        let total = 0;
        for(let i = 0; i < GL_images.length; i++){
            total += GL_images[i].price;
        }
        return total;
    }
    static LargePrice(){
        let largest = [];
        let tmpImages = GL_images;
        let forbidden = [];
        for(let i = 0; i < 3; i++){
            let tmpBiggest = 0;
            let tmpBiggestId = 0;
            for(let a = 0; a < tmpImages.length; a++){
                let pass = Contains(forbidden, a);
                if(!pass){
                    if(tmpImages[a].price > tmpBiggest){
                        tmpBiggest = tmpImages[a].price;
                        tmpBiggestId = a;
                    }
                }
                
            }
            largest[i] = tmpImages[tmpBiggestId];
            forbidden[forbidden.length] = tmpBiggestId; 
        }
        return largest;
    }
}

function Contains(list, input){
    let passed = false;
    for(let c = 0; c < list.length; c++){
        if(list[c] == input){
            passed = true;
        }
    }
    return passed;
}

class GL_author {
    name;
    surname;
    birthDay;
    constructor(name, surname, birthDay){
        this.name = name;
        this.surname = surname;
        this.birthDay = birthDay;
    }
    toString() {
        return "GL_author{" + this.name + "/" + this.surname + "/" + this.birthDay + "}"; 
    }
}

let GL_authors = [new GL_author("Karel","Novak","2004-1-23"),new GL_author("Vaclav","Klaus","2002-5-12"),new GL_author("Michala","Tmava","1990-8-30")];
let GL_images = [new GL_image("cerny zapad",GL_authors[1], 231249, 2020),new GL_image("slunce svetu",GL_authors[1], 10932, 2021),new GL_image("rusne mesto",GL_authors[2], 248329, 2023),new GL_image("pysny venkov",GL_authors[0], 14728, 2023)];
    
GL_write();
GL_startup()

function GL_write(){
    let GL_toWrite = "";
    for(let i = 0; i < GL_images.length; i++){
        GL_toWrite += GL_images[i] + "<br>";
    }
    GL_pStorage.innerHTML = GL_toWrite;
}

function GL_addPicture(){
    GL_images.push(new GL_image(
        GL_pName.value,
        GL_pAuthor.value,
        GL_pPrice.value,
        GL_pYear.value));
    GL_pName.value = "";
    GL_pPrice.value = "";
    GL_pYear.value = "";
    GL_write();
}

function GL_addAuthor(){
    GL_authors.push(new GL_author(
        GL_aName.value,
        GL_aSurname.value,
        GL_aBirthday.value));
    GL_aName.value = "";
    GL_aSurname.value = "";
    GL_aBirthday.value = "";
    GL_startup();
    GL_write();
}

function GL_startup(){
    let GL_pSelectString = "";
    for(let i = 0; i < GL_authors.length; i++){
        GL_pSelectString += "<option value=\"" + GL_authors[i] +"\">" + GL_authors[i].name + " " + GL_authors[i].surname + "</option>"
    }
    GL_pAuthor.innerHTML = GL_pSelectString;
}


GL_pSubmit.addEventListener('click', GL_addPicture);
GL_aSubmit.addEventListener('click', GL_addAuthor);