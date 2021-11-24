let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0]

        if (card.flipped || this.lockMode) {
            return false
        }

        if (this.firstCard == null) {
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        } else {
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    checkMatch: function () {
        if (this.secondCard != null) {
            let teste = this.firstCard.icon == this.secondCard.icon
            return teste
        } else {
            return false
        }
    },

    clearCards: function () {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    techs: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react",
    ],

    cards: null,

    createCardsFromTechs: function () {
        this.cards = []

        for (let tech of this.techs) {
            this.cards.push(this.createPairFromTech(tech))
        }

        this.cards = this.cards.flat();
        this.shuffleCards(this.cards)
    },

    createPairFromTech: function (tech) {
        return [{
                id: this.createIdWithech(tech),
                icon: tech,
                flipped: false,
            },
            {
                id: this.createIdWithech(tech),
                icon: tech,
                flipped: false,
            },
        ];
    },

    unflipCards: function() {
        this.firstCard.flipped = false
        this.secondCard.flipped = false
    },

    createIdWithech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length
        let randomIndex = 0

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

    timerPlay: function() {

    },

    score: []
}

//timer logic

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function start() {
  stop();
  cron = setInterval(() => { timer(); }, 10);
}

function stop() {
    game.score = [minute, second, millisecond]
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`
}