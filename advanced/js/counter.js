const storage = document.querySelector('.storage');
const submit = document.querySelector('.submit');
const addField = document.querySelector('.field');

let count = 1;
let restartButton;


function add() {
    const userAdd = Number(addField.value);
  if (count === 1) {
    storage.textContent = 'Storage: ';
  }
  storage.textContent += `${userAdd} `;

  count++;
  addField.value = '';
  addField.focus();
}

submit.addEventListener('click', add);