// carne - 400gr por pessoa + de 6 horas - 650
// cerveja - 1200 ml por pessoa + 6 horas 2000ml
// Refrigerante/agua - 1000 ml por pessoa + 6 horas 1500ml

// Crianças valem 0,5

let inputAdultos = document.getElementById("adultos")
let inputCriancas = document.getElementById("criancas")
let inputDuracao = document.getElementById("duracao")

let resultado = document.getElementById("resultado")

function calcular(){

    let adultos = inputAdultos.value
    let criancas = inputCriancas.value
    let duracao = inputDuracao.value

    let qdtTotalCarne = carnePP(duracao) * adultos + (carnePP(duracao)/2 * criancas) 
    let qdtCerveja = cervejaPP(duracao) * adultos 
    let qdtBebidas = bebidasPP(duracao) * adultos + (bebidasPP(duracao)/2 * criancas) 


    resultado.innerHTML =  `<p>${(qdtTotalCarne / 1000).toFixed(1)} kg de carne </p>`
    resultado.innerHTML +=  `<p>${Math.ceil(qdtCerveja / 300)} latas de cerveja </p>`
    resultado.innerHTML +=  `<p>${Math.ceil(qdtBebidas / 2000)} Garrafas de 2L  </p>`
}

function carnePP(duracao){
    if(duracao >= 6){
        return 650
    }else {
        return 400
    }
    
}

function cervejaPP(duracao){
    if(duracao >= 6){
        return 2000
    }else {
        return 1200
    }
}


function bebidasPP(duracao){
    if(duracao >= 6){
        return 1500
    }else {
        return 1000
    }
    
}