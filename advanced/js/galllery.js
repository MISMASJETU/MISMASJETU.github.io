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

console.log(GL_images[0]);
console.log(GL_images[1]);
console.log(GL_images[2]);
console.log(GL_images[3]);
console.log(GL_image.PriceSum());   
console.log(GL_image.LargePrice());   