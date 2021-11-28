const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"


let flippedcards = 0
const gameBoard = document.getElementById("gameBoard")
const buttonStart = document.querySelector("#startGameButton")
const createAccount = document.getElementById("createAccount")
const popUpLogin = document.querySelector('#popUpLogin')
const main = document.getElementsByTagName('main')[0]
const inputMail = document.querySelectorAll('.input-login')[0]
const inputSenha = document.querySelectorAll('.input-login')[1]

createAccount.addEventListener("click", accountCreated)
buttonStart.addEventListener("click", startGame)


function unlockGame() {
    game.lockGame = true
}

function startGame() {
    if (game.lockGame == true) {
        buttonStart.classList = "displayNone"
        start()
        initializeCards(game.createCardsFromTechs())
    }
}

function initializeCards() {


    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)
        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })

}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = `assets/imagens/${card.icon}.png`
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = '&lt/&gt'
    }
    element.appendChild(cardElementFace)
}


function flipCard() {
    let control = false
    if (game.setCard(this.id)) {
        this.classList.add('flip')
        if (game.checkMatch()) {
            iswin()
            game.clearCards()
        } else if (game.secondCard != null) {
            setTimeout(() => {
                let fistCardView = document.getElementById(game.firstCard.id)
                let secondCardView = document.getElementById(game.secondCard.id)

                game.unflipCards()

                fistCardView.classList.remove('flip')
                secondCardView.classList.remove('flip')
                control = true
                testControl(control)
            }, 1000)
        }
    }

}

function testControl(control) {
    if (control) {
        game.lockMode = false
        game.clearCards()
    }
}

function iswin() {
    flippedcards++
    if (true /* flippedcards == 10 */ ) {
        stop()
        setScore()
    }
}

function restart() {
    gameBoard.innerHTML = ''
    startGame()
    setScore()
}

function setScore() {
    let scoreMounted = mountScore()
    document.getElementById("yourScore").innerHTML = `Seu ultimo tempo: ${scoreMounted}`
}

function mountScore() {
    let stringScoreMounted = `${game.score[0]}:${game.score[1]}:${game.score[2]}`
    return stringScoreMounted
}



const firebaseConfig = {
    apiKey: "AIzaSyBurgPo7Zgo-jalp3-wvY2Da4mTFrlWang",
    authDomain: "jogo-da-memoria-96f04.firebaseapp.com",
    projectId: "jogo-da-memoria-96f04",
    storageBucket: "jogo-da-memoria-96f04.appspot.com",
    messagingSenderId: "239983936845",
    appId: "1:239983936845:web:4aad4eebc17be1abc3e304"
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()


setTimeout(() => {
    if (auth.currentUser == null) {
        console.log(auth.currentUser)
        popUpLogin.classList = "pop-up-login"
        main.classList = 'main-blur'
    }
}, 2000)

function accountCreated() {
    logIn(inputMail.value, inputSenha.value)
}

function logIn(email, password) {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential)
                console.log('usuário logado')
                unlockGame()
                logged()
            })
            .catch((error) => {
                console.log(error.message)
                alert(error.message)
            }).catch(err => {
                console.log(err.message)
            })
    })
}

function logged() {
    if (auth.currentUser != null) {
        unlockGame()
        popUpLogin.classList = "displayNone"
        main.classList = 'withoutBlur'
    }
}

function logOut() {
    auth.signOut().then(() => {
        console.log("usuário foi deslogado")
    }).catch(err => {
        console.log(err)
    })
}

// ao invés de tirar a tela de logado se estiver logado, colocar a tela se não estiver 