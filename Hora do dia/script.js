function carregar() {
    var msg = document.getElementById('msg')
    var img = document.getElementById('imagem')
    var data = new Date()
    var hora = data.getHours()

    if (hora < 12) {
        msg.innerHTML = `Agora são: ${hora} horas, bom dia!`
    } else if (hora < 18 ) {
        img.setAttribute('src', 'imagens/tarde.png')
        msg.innerHTML = `Agora são: ${hora} horas, boa tarde!`
        document.body.style.backgroundColor = 'rgb(146, 103, 78)'
    } else {
        img.src = 'imagens/noite.png'
        msg.innerHTML = `Agora são: ${hora} horas, boa noite!`
        document.getElementById('body').style.backgroundColor = 'rgb(46, 52, 65)'
    }
}