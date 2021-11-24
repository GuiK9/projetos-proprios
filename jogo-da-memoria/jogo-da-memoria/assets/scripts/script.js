const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"

const gameOverScreen = document.getElementById('gameOver')
const gameBoard = document.getElementById("gameBoard")
let flippedcards = 0
let buttonStart = document.querySelector("#startGameButton")

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
    if(true/* flippedcards == 10 */){
        stop()
        setTimeout(() => {
            gameOverScreen.style.visibility = "visible"
        }, 1000)
    }
}

function restart() {
    gameBoard.innerHTML = ''
    startGame()
    setScore()
    gameOverScreen.style.visibility = "hidden"
}

function setScore(){
    let scoreMounted = mountScore(game.score)
    document.getElementById("yourScore").innerHTML = scoreMounted
}

function mountScore() {
    let stringScoreMounted = `${game.score[0]}:${game.score[1]}:${game.score[2]}`
    return stringScoreMounted
}
