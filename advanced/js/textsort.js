const ts_field = [];
const ts_submit = document.querySelector('.ts_submit');
const ts_result = document.querySelector('.ts_result');
const ts_input = document.querySelector('.ts_input');
const ts_add = document.querySelector('.ts_add');

function add() {
    ts_field[ts_field.length] = (ts_input.value);
    ts_input.value = '';
}

function sort(){
    for(let a = 0; a < ts_field.length; a++){
        for(let b = 1; b < ts_field.length; b++){
            if(a != b){
                textSort(ts_field[b - 1], ts_field[b], b - 1, b);
            }
        }
    }
    ts_result.textContent = ts_field;
}

function textSort(a,b, ida, idb){
    let ar1 = [];
    let ar2 = [];
    ar1 = a.split(/(?!$)/u);
    ar2 = b.split(/(?!$)/u);
    let result = 0;
    for(let i = 0; i < ar1.length; i++){
        result = textCompare(ar1[i], ar2[i]);
        if(result == 1){
            let tmp = ts_field[ida];
            ts_field[ida] = ts_field[idb];
            ts_field[idb] = tmp;
            break;
        } else if(result == -1){
            break;
        }
    }
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

ts_submit.addEventListener('click', sort);
ts_add.addEventListener('click', add)

/*
const sentence = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYZ0123456789';
for(let y = 0; y < sentence.length; y++){
    console.log(`${sentence.charAt(y)} = ${sentence.charCodeAt(y)}`);
    
}*/
