const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'

startGame()

function startGame() {
  //cards = game.createCardsFromTechs()

  initializeCards(game.createCardsFromTechs())
}

function initializeCards(cards) {
  let gameBoard = document.getElementById('gameBoard')
  gameBoard.innerHTML = ''

  game.cards.forEach(cards => {
    let cardElement = document.createElement('div')
    cardElement.id = cards.id
    cardElement.classList.add(CARD)
    cardElement.dataset.icon = cards.icon

    createCardContent(cards, cardElement)

    cardElement.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElement)
  })
}

function createCardContent(cards, cardElement) {
  createCardFace(FRONT, cards, cardElement)
  createCardFace(BACK, cards, cardElement)
}

function createCardFace(face, cards, element) {
  let cardElementFace = document.createElement('div')
  cardElementFace.classList.add(face)

  if (face === FRONT) {
    let iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = './icomoon/SVG/' + cards.icon + '.svg'
    cardElementFace.appendChild(iconElement)
  } else {
    //cardElementFace.innerHTML = '&lt/&gt'
    

  }
  element.appendChild(cardElementFace)
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip')
    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards()
        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById('gameOver')
          gameOverLayer.style.display = 'flex'
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id)
          let secondCardView = document.getElementById(game.secondCard.id)

          firstCardView.classList.remove('flip')
          secondCardView.classList.remove('flip')
          game.unflipCards()
        }, 1000)
      }
    }
  }
}
