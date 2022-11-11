// Credit to flowforfrank for game idea and framework of JS

const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }
    var image1 = "<img alt='beta' src='https://dodo.ac/np/images/7/7f/Betta_NH.png' width='100' height='auto' style='vertical-align: middle;'>"
  
  	var image2 = "<img alt='arrowana' src='https://dodo.ac/np/images/9/9a/Arowana_NH.png' width='100' height='auto' style='vertical-align: middle;'>"
  
  	var image3 = "<img alt='angelfish' src='https://dodo.ac/np/images/6/69/Angelfish_NH.png' width='auto' height='100' style='horizontal-align: middle;'>"
  
  	var image4 = "<img alt='butterfly' src='https://dodo.ac/np/images/e/ef/Butterfly_Fish_NH.png' width='100' height='auto' style='vertical-align: middle;'>"
  
  	var image5 = "<img alt='catfish' src='https://dodo.ac/np/images/3/32/Catfish_NH.png' width='100' height='auto' style='vertical-align: middle;'>"
  
  	var image6 = "<img alt='clownfish' src='https://dodo.ac/np/images/9/94/Clown_Fish_NH.png' width='100' height='auto' style='vertical-align: middle;'>"
  
  	var image7 = "<img alt='guppy' src='https://dodo.ac/np/images/d/d7/Guppy_NH.png' width='100' height='auto' style='vertical-align: middle;'>"
  
  	var image8 = "<img alt='piranha' src='https://dodo.ac/np/images/f/fa/Piranha_NH.png' width='100' height='auto' style='vertical-align: middle;'>"
  
  	var image9 = "<img alt='turkey' src='https://dodo.ac/np/images/8/8d/Zebra_Turkeyfish_NH.png' width='100' height='auto' style='vertical-align: middle;'>"
  
  	var image10 = "<img alt='shark' src='https://myisland.club/assets/images//fish/main/great_white_shark.png' width='100' height='auto' style='vertical-align: middle;'>"
  
    const emojis = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10]
	
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 750)
    }

    // If there are no more cards that we can flip, we won the game
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `

            clearInterval(state.loop)
        }, 1000)
    }
}

const resetGame = () => {
    state.gameStarted = false
    selectors.start.classList.remove('disabled')


		state.totalTime = 0
		state.totalFlips = 0

		selectors.moves.innerText = `${state.totalFlips} moves`
		selectors.timer.innerText = `time: ${state.totalTime} sec`
		window.location.reload()
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
						document.getElementById('button').innerText = 'Reset' 
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
						document.getElementById('button').innerText = 'Reset' 
            startGame()
        } else if (eventTarget.nodeName === 'BUTTON' && eventTarget.className.includes('disabled')) {
            resetGame()
        }
    })
}

generateGame()
attachEventListeners()
