// GERADOR DE NÚMEROS PARA BINGO!!!!!

let numeros = [];
let botao = document.getElementsByTagName("button")[0];
let botaop = document.getElementsByTagName("button")[1];
let intervalo;
let corpo = document.getElementsByTagName("body")[0];
let index = 0;
let teste = 1;

botao.onclick = bingo;
botaop.onclick = pararpb;
corpo.onload = gerarArr;

//Gera uma sequência de 90 números

function gerarArr() {
  for (i = 0; i < 90; i++) {
    let na = Math.ceil(Math.random() * 90);
    if (numeros.indexOf(na) === -1) {
      numeros.push(na);
      console.log(na);
    } else {
      i--;
    }
  }
  /*numeros.sort(function (a, b) {
    return a - b;
  });
  console.log(numeros);*/
}

//Faz com que os números sejam escritos
//Informa se o timer está rodando ou não

function bingo() {
  let p = document.getElementsByTagName("p")[0];
  if (teste == 1) {
    teste = 0;
    intervalo = setInterval(escreveNumeros, 3000);
    function escreveNumeros() {
      p.innerHTML += numeros[index] + " / ";
      ++index;
      parar();
    }
  }
}

function parar() {
  if (index >= 90) {
    clearInterval(intervalo);
    teste = 1;
  }
}

function pararpb() {
  clearInterval(intervalo);
  teste = 1;
}
