const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"


const gameBoard = document.getElementById("gameBoard")
let flippedcards = 0
let buttonStart = document.querySelector("#startGameButton")



/* const firebaseConfig = {
  apiKey: "AIzaSyBurgPo7Zgo-jalp3-wvY2Da4mTFrlWang",
  authDomain: "jogo-da-memoria-96f04.firebaseapp.com",
  projectId: "jogo-da-memoria-96f04",
  storageBucket: "jogo-da-memoria-96f04.appspot.com",
  messagingSenderId: "239983936845",
  appId: "1:239983936845:web:4aad4eebc17be1abc3e304"
};

firebase.initializeApp(firebaseConfig); */








buttonStart.addEventListener("click", startGame)


function startGame() {
    buttonStart.classList = "displayNone"
    start()
    initializeCards(game.createCardsFromTechs())
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
    stop()
    if(true/* flippedcards == 10 */){
    }
}

function restart() {
    gameBoard.innerHTML = ''
    startGame()
    setScore()
}

function setScore(){
    let scoreMounted = mountScore(game.score)
    document.getElementById("yourScore").innerHTML = scoreMounted
}

function mountScore() {
    let stringScoreMounted = `${game.score[0]}:${game.score[1]}:${game.score[2]}`
    return stringScoreMounted
}
