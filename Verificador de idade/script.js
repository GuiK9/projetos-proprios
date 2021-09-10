//Código com auxílio do vídeo do professor
function verificar() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = document.getElementById('txtano')
    var res = document.querySelector('div#ret')

    if (fano.value.length == 0 || fano.value > ano ) {
        window.alert('[ERRO] Cheque os dados, eles não fazem sentido!')
    } else {
        var fsex = document.getElementsByName('readsex')
        var idade = ano - Number(fano.value)
        var genero = ''
        var img = document.createElement('img')
        img.setAttribute('id', 'foto')

        if (fsex[0].checked) {
            genero = 'Homem'
            if (idade > 55) {
                img.setAttribute('src', 'imagens/idoso.png')  
            } else if (idade > 30 ) {
                img.setAttribute('src', 'imagens/homem.png')
            } else if (idade > 16) {
                img.setAttribute('src', 'imagens/garoto.png')
            } else {
                img.setAttribute('src', 'imagens/menino.png')
            }

        } else {
            genero = 'Mulher'
            if (idade > 55) {
                img.setAttribute('src', 'imagens/idosa.png')  
            } else if (idade > 30 ) {
                img.setAttribute('src', 'imagens/mulher.png')
            } else if (idade > 16) {
                img.setAttribute('src', 'imagens/garota.png')
            } else {
                img.setAttribute('src', 'imagens/menina.png')
            }
        }
        res.innerHTML = `<strong>Detectamos ${genero} com ${idade} anos</strong>`
        res.style.textAlign = 'center'
        ret.appendChild(img)
    }
}
/*-----> Esse foi o meu código ao tentar fazer sozinho (INCOMPLETO!) <----
function verificar(){
    var data = new Date()
    var ano = data.getFullYear()
    var dnasc = Number(document.getElementById('idade').value)
    var res = document.getElementById('res')
    var pif = ano - dnasc 
    var foto = document.getElementById('ret')
    var msgf = document.getElementById('msg')

    if (pif > 55) {
        foto.scr = 'imagens/homem.png'
        msgf.innerHTML = (`Detectamos um com ${pif}`)
    } else if (pif > 30  ) {
        foto.scr = 'imagens/homem.png'
    } else if (pif > 0 ) {
        foto.scr = 'imagens/menino.png'
    }
}*/