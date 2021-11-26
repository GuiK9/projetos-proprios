const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"


const gameBoard = document.getElementById("gameBoard")
let flippedcards = 0
const buttonStart = document.querySelector("#startGameButton")
const creatAccount = document.getElementById("createAccount")
const popUpLogin = document.querySelector('#popUpLogin')

creatAccount.addEventListener("click", accountCreated)
buttonStart.addEventListener("click", startGame)

function accountCreated() {
    unlockGame()
    logged()
}

function unlockGame() {
    game.lockGame = true
}

function logged() {
    console.log("sinm")
    popUpLogin.style.color = "red"
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


function logIn(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
}



/* let db = firebase.firestore()
let auth = firebase.auth()

var email = "thigas@gmail.com"
var password = "122212122"

firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    }); */