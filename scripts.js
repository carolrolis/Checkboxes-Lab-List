const calcButton = document.getElementById('calc-button');
const clearButton = document.getElementById('clear-button');
const result = document.getElementById('result');
const searchBarCode = document.getElementById('search-bar-code');
const searchBarName = document.getElementById('search-bar-name');

let totalPrice = 0;
let exams = [];


function getCheckboxValue(event) {
  const checkboxValue = event.target.value;
  if (event.target.checked) {
      addPrice(checkboxValue);
      addName(checkboxValue);
  } else {
    removePrice(checkboxValue);
    removeName(checkboxValue);
  }
}

function addPrice(value) {
  let price = document.querySelector(`#price${value}`);
  let priceText = price.textContent.replace(',', '.');
  return totalPrice += parseInt(priceText, 10);
}

function removePrice(value) {
  let price = document.querySelector(`#price${value}`);
  let priceText = price.textContent.replace(',', '.');
  totalPrice -= parseInt(priceText, 10);
}

function addName(value) {
  let name = document.querySelector(`#name${value}`);
  nameText = name.textContent.trim();
  exams.push(nameText);
  return exams;
}

function removeName(value) {
  let name = document.querySelector(`#name${value}`);
  nameText = name.textContent.trim();
  exams = exams.filter(exam => exam !== nameText);
  return exams;
}

function displayTotal() {
  let examsList = exams.join("<br>")
  result.style.display = "block";
  result.innerHTML =
  `
  <span>Deu <strong>${totalPrice}</strong> conto</span>
  <br><br>
  <span>Exames marcados:
  <br>
  ${examsList}</span>
  `;
}

function clear() {
  result.innerHTML = ''
  result.style.display = "none";
  totalPrice = 0;
  exams = [];
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
}

function filterExamsCode() {
  const query = searchBarCode.value.toLowerCase();
  const rows = document.querySelectorAll('tr');
  
  rows.forEach(row => {
    const examCode = row.querySelector('td[id^="code"]');
    if (examCode) {
      const text = examCode.textContent.toLowerCase();
      if (text.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });
}

function filterExamsName() {
  const query = searchBarName.value.toLowerCase();
  const rows = document.querySelectorAll('tr');
  
  rows.forEach(row => {
    const examName = row.querySelector('td[id^="name"]');
    if (examName) {
      const text = examName.textContent.toLowerCase();
      if (text.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });
}


const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', getCheckboxValue);
});

calcButton.addEventListener("click", displayTotal);
clearButton.addEventListener("click", clear);
searchBarCode.addEventListener('input', filterExamsCode);
searchBarName.addEventListener('input', filterExamsName);