//Para abrir no celular da tereira idade
// GERADOR DE NÚMEROS PARA BINGO!!!!!

let numeros = [];
let botao = document.getElementsByTagName("button")[0];
let botaop = document.getElementsByTagName("button")[1];
let botaoOrg = document.getElementsByTagName("button")[2];
let p = document.getElementsByTagName("p")[0];
let p1 = document.getElementsByTagName("p")[1];
let intervalo;
let corpo = document.getElementsByTagName("body")[0];
let index = 0;
let teste = 1;

botaoOrg.onclick = organizar;
botao.onclick = bingo;
botaop.onclick = pararpb;
corpo.onload = gerarArr;

//Gera uma sequência de 90 números

function gerarArr() {
  for (i = 0; i < 90; i++) {
    let na = Math.ceil(Math.random() * 90);
    if (numeros.indexOf(na) === -1) {
      numeros.push(na);
    } else {
      i--;
    }
  }
  numOrg = [...numeros];
}

//Faz com que os números sejam escritos
//Informa se o timer está rodando ou não

function bingo() {
  if (teste == 1) {
    teste = 0;
    intervalo = setInterval(escreveNumeros, 1000);
    function escreveNumeros() {
      p.innerHTML += numeros[index] + " ";
      ++index;
      parar();
    }
  }
}

// filtrar os numeros e mostrar apenas os já sorteados
function filtragem(numero) {
  return numOrg.indexOf(numero) <= index - 1;
}

function organizar() {
  let numerosFiltrados = numOrg.filter(filtragem);
  let arrayOrg = numerosFiltrados.sort(compararNumeros);
  escreveOrg(arrayOrg);
  pararpb();
}

function escreveOrg(arrayOrg) {
  if (p1.textContent == '') {
    for (let numero of arrayOrg) {
      p1.innerHTML += numero + "  ";
    }
  } else {
    p1.innerHTML = "";
    escreveOrg(arrayOrg)
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

function compararNumeros(a, b) {
  return a - b;
}
