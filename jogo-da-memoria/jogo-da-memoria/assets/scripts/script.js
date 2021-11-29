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
const inputNickname = document.querySelectorAll('.input-login')[0]
const inputMail = document.querySelectorAll('.input-login')[1]
const inputSenha = document.querySelectorAll('.input-login')[2]
const lastTimeTag = document.getElementById("yourLastScore")

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
    let scoreMounted = mountScore(game.score)
    document.getElementById("yourLastScore").innerHTML = `Seu ultimo tempo: ${scoreMounted}`
}

function mountScore(score) {
    let stringScoreMounted = `${score[0]}:${score[1]}:${score[2]}`
    return stringScoreMounted
}

function NewLastScore() {
    let lastScore = [...game.score]
    mountScore()
    lastTimeTag.innerHTML = `Seu último tempo:`

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
const auth = firebase.auth()

// Here everything related to authentication

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


//here everthing related to batabase
const db = firebase.firestore()

function updateTimePlayer(){
    db.collection("players").add({
        nick: inputNickname.value,
        score: game.score
    }).then(() => {
        console.log('o documento foi inserido com sucesso')
    }).catch((err) => {
      console.log(err)  
    })
}


