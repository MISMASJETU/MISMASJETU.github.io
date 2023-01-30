/*const ps_person = {
    name: "Unset",
    age: 0,
};*/

const ps_submit1 = document.querySelector('.ps_submit1');
const ps_submit2 = document.querySelector('.ps_submit2');
const ps_result = document.querySelector('.ps_result');
let persons = [new ps_person("Jonathan", 19), new ps_person("Adam", 18), new ps_person("David", 24), new ps_person("Rebecca", 28), new ps_person("Claire", 23)];
    
function ps_person(name, age) {
    this.name = name;
    this.age = age;
    this.personString = function (){
        return this.name + " " + this.age;
    }
}
function start(){
    let tmp;
    console.log(type);
    if(type === 1){
        tmp = persons.sort((a, b) => a.age - b.age);
    }
    if(type === 2){
        tmp = persons.sort(textSort);
    }
    let output = "";
    for(let i = 0; i < tmp.length; i++){
        output += tmp[i].personString() + ", ";
    }
    ps_result.textContent = output;
}

function textSort(a,b){
    let ar1 = [];
    let ar2 = [];
    ar1 = a.name.split(/(?!$)/u);
    ar2 = b.name.split(/(?!$)/u);
    let result = 0;
    for(let i = 0; i < ar1.length; i++){
        result = textCompare(ar1[i], ar2[i]);
        if(result == 1){
            return 1;
        } else if(result == -1){
            return -1;
        }
    }
    return 0;
}

function textCompare(a,b){
    a = Number(a.charCodeAt(0));
    b = Number(b.charCodeAt(0));
    if(a >= 65 && a <= 90){
        a+=1000;
    } else if(a >= 48 && a <= 67){
        a+=2000;
    }
    if(b >= 65 && b <= 90){
        b+=1000;
    } else if(b >= 48 && b <= 67){
        b+=2000;
    }
    if(a < b){
        return -1
    } else if (a == b){
        return 0;
    } else {
        return 1;
    }
}


function start1(){
    type = 1;
    start();
}

function start2(){
    type = 2;
    start();
}



ps_submit1.addEventListener('click', start1);
ps_submit2.addEventListener('click', start2);
