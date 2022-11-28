const qs_field = [];
const qs_submit = document.querySelector('.qs_submit');
const qs_result = document.querySelector('.qs_result');
const qs_input = document.querySelector('.qs_input');
const qs_add = document.querySelector('.qs_add');

function add() {
    qs_field[qs_field.length] = Number(qs_input.value);
    qs_input.value = '';
}

function calculate() {
    let sortedArray = quickSort(qs_field, 0, qs_field.length - 1);
    console.log(sortedArray);
    qs_result.textContent = sortedArray;
}

function swap(qs_field, leftIndex, rightIndex){
    let temp = qs_field[leftIndex];
    qs_field[leftIndex] = qs_field[rightIndex];
    qs_field[rightIndex] = temp;
}
function partition(qs_field, left, right) {
    let pivot   = qs_field[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (qs_field[i] < pivot) {
            i++;
        }
        while (qs_field[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(qs_field, i, j); //swapping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(qs_field, left, right) {
    let index;
    if (qs_field.length > 1) {
        index = partition(qs_field, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(qs_field, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(qs_field, index, right);
        }
    }
    return qs_field;
}


qs_submit.addEventListener('click', calculate);
qs_add.addEventListener('click', add)