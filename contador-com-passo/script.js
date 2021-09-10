function cont() {
    var ini = Number(document.getElementById('inicio').value)
    var fim = Number(document.getElementById('fim').value)
    var pass = Number(document.getElementById('passo').value)
    var res = document.getElementById('ret')

    if (ini == 0 || fim == 0 ) {
        window.alert('[ERROR] Faltam dados!')
        res.innerHTML = ('Impossivel contar')
    } else if (pass <= 0 ) {
        window.alert('Passo foi colocado como 0, irei considerar 1')
        pass = 1
     if (ini < fim) { 
            res.innerHTML = 'Contando: <br>'
            for (let c = ini; c <= fim ; c += pass) {
                res.innerHTML += ` 👉 ${c} `
                if (c == fim){
                    res.innerHTML += '🏴' 
                }
            }
        } else {
            for (let c = ini; c >= fim ; c -= pass) {
                res.innerHTML += ` 👉 ${c} `
                if (c == fim){
                    res.innerHTML += '🏴' 
                }
            }
        } 
    } else if (pass > 0) {
        if (ini < fim) { 
            res.innerHTML = 'Contando: <br>'
            for (let c = ini; c <= fim ; c += pass) {
                res.innerHTML += ` 👉 ${c} `
                if (c == fim){
                    res.innerHTML += '🏴' 
                }
            }
        } else {
            for (let c = ini; c >= fim ; c -= pass) {
                res.innerHTML += ` 👉 ${c} `
                if (c == fim){
                    res.innerHTML += '🏴' 
                }
            }
        } 
    }
}
function limpar() {
    document.getElementById('ret').innerHTML = 'Insira dos dados para contar!'
}