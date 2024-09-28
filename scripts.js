//Variáveis que selecionam elementos DOM pelos seus IDs
const calcButton = document.getElementById('calc-button');
const clearButton = document.getElementById('clear-button');
const result = document.getElementById('result');
const searchBarCode = document.getElementById('search-bar-code');
const searchBarName = document.getElementById('search-bar-name');
const buttonBottom = document.getElementById("scroll-down");
const buttonTop = document.getElementById("scroll-top");

//Variável que seleciona todos os elementos do tipo input - checkbox
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

//Variáveis que recebem o total do preço(número) e a lista de exames(array)
let totalPrice = 0;
let exams = [];



//Função chamada quando um checkbox é selecionado para extrair o seu valor(1 a 549) e adicioná-lo às demais funções
function getCheckboxValue(event) {
  const checkboxValue = event.target.value;

  //Se event.target.checked = true(checkbox marcado), 'addPrice' e 'addName' são chamadas com parâmetros definidos como o valor do checkbox
  if (event.target.checked) {
    addPrice(checkboxValue);
    addName(checkboxValue);
  }
  //Se event.target.checked = false(checkbox desmarcado), 'removePrice' e 'removeName' são chamadas com parâmetros definidos como o valor do checkbox
  else {
    removePrice(checkboxValue);
    removeName(checkboxValue);
  }
}


//Função que extrai o preço de cada checkbox marcada e retorna a sua adição ao preço total
function addPrice(value) {
  let price = document.querySelector(`#price${value}`); //Seleciona o conteúdo do preço de acordo com o ID(#price1 a #price549)
  let priceText = price.textContent.replace(',', '.'); //Seleciona o conteúdo da variável 'price' e substitui vírgulas por pontos(float)
  return totalPrice += parseInt(priceText, 10); //Converte o número float de 'priceText' em inteiro(base 10) e o adiciona a 'totalPrice'
}

//Função que extrai o preço de cada checkbox desmarcada e retorna a sua subtração do preço total
function removePrice(value) {
  let price = document.querySelector(`#price${value}`);
  let priceText = price.textContent.replace(',', '.');
  totalPrice -= parseInt(priceText, 10);
}


//Função que extrai o nome de cada checkbox marcada e retorna a lista de exames marcados atualizada
function addName(value) {
  let name = document.querySelector(`#name${value}`); //Seleciona o conteúdo do nome de acordo com o ID(#name1 a #name549)
  nameText = name.textContent.trim(); //Remove espaços em branco ao redor do conteúdo da variável 'name'(apenas precaução)
  exams.push(nameText); //Adiciona 'nameText' à lista 'exams'
  return exams;
}

//Função que extrai o nome de cada checkbox desmarcada e retorna um novo array 'exams'
function removeName(value) {
  let name = document.querySelector(`#name${value}`);
  nameText = name.textContent.trim();
  exams = exams.filter(exam => exam !== nameText); //Cria um novo array apenas com o que não corresponde ao nome removido, filtrando-os
  return exams;
}


//Função que adiciona a visualização do preço final(totalPrice) e dos exames selecionados(examsList) ao .innerHTML do elemento result
function displayTotal() {
  let examsList = exams.join("<br>") //Variável 'examsList' recebe o valor de 'exams' convertido em uma string e unido a uma quebra de linha(<br>)
  result.style.display = "block";
  result.innerHTML =
    `
  <span>Preço total: <strong>${totalPrice}</strong> reais</span>
  <br><br>
  <span>Exames marcados:
  <br>
  ${examsList}</span>
  `;
}


//Função que reseta as variáveis 'totalPrice' e 'exams', limpa a visualização do resultado(result), apaga o que foi escrito nas searchbars, mostra a lista completa e reestabelece as checkboxes como desmarcadas(false)
function clear() {
  result.innerHTML = ''
  result.style.display = "none";
  totalPrice = 0;
  exams = [];
  searchBarName.value = '';
  searchBarCode.value = '';
  scrollToTop();
  document.querySelectorAll('tr').forEach(row => row.style.display = '');
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
}


//Função que filtra os exames pelo código ao digitar na 'search-bar-code'
function filterExamsCode() {
  const query = searchBarCode.value.toLowerCase(); //Obtém o valor da searchbar e converte para letras minúsculas
  const rows = document.querySelectorAll('tr'); //Seleciona todas as linhas da tabela

  //Iteração em cada linha(row) da tabela
  rows.forEach(row => {
    const examCode = row.querySelector('td[id^="code"]'); //Seleciona as células <td> cujo atributo ID começa com a string "code".

    //Se a célula foi encontrada(examCode = true)
    if (examCode) {
      const text = examCode.textContent.toLowerCase(); //Converte o texto do código também para letras minúsculas

      //Se o código contém o texto digitado na busca(valor atribuído à variável 'query')
      if (text.includes(query)) {
        row.style.display = ''; //Mostra a linha correspondente
      }
      //Se o código não corresponder, esconde a linha
      else {
        row.style.display = 'none';
      }
    }
  });
}

// Função que filtra exames pelo nome ao digitar na 'search-bar-name'
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

//A função scrollFunction funciona assim que a tela for scrollada pela primeira vez
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  //Se a altura do documento for menor que 80, o botão de descer não aparecerá
  if (document.documentElement.scrollTop < 80) {
    buttonBottom.style.display = "none";
  } 
  //Se a altura não for menor, o botão aparecerá
  else {
    buttonBottom.style.display = "block";
  }

  //Se a posição de rolagem for maior ou igual à altura da janela, o botão aparecerá
  if (document.body.scrollTop >= window.innerHeight || document.documentElement.scrollTop >= window.innerHeight) {
    buttonTop.style.display = "block";
  }
  //Senão, não aparecerá
  else {
    buttonTop.style.display = "none";
  }
}

//A função 'scrollToBottom' fará com que o botão, quando clicado, vá até o fim do documento
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

//A função 'scrollToTop' fará com que o botão, quando clicado, vá até o início(0) do documento
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



//addEventListener acionada para cada checkbox para executar a função getCheckboxValue quando clicado
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', getCheckboxValue);
});
//addEventListeners são acionados para os botões, quando clicados, e para as searchbars, quando receberem informações(inputs)
calcButton.addEventListener("click", displayTotal);
clearButton.addEventListener("click", clear);
searchBarCode.addEventListener('input', filterExamsCode);
searchBarName.addEventListener('input', filterExamsName);