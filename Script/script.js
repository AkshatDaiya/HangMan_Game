const keyboardDiv = document.querySelector('.keyboard');
const hangmanImage = document.querySelector('.hangman-box img');
const guessesText = document.querySelector('.guesses-text b');
const wordDisplay = document.querySelector('.word-display');
const gameModel = document.querySelector('.game-modal');
const playAgainBtn = document.querySelector('.play-again');

let currentWord;
let wrongGuessCount;
let correctLetters;
const maxGuesses = 6;
const resetGame = function () {
    wrongGuessCount = 0;
    correctLetters = [];
    hangmanImage.src = `Images/hangman-${wrongGuessCount}.svg`;
    keyboardDiv.querySelectorAll('button').forEach((btn)=>btn.disabled = false)
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join('');
    gameModel.classList.remove('show')
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    // console.log(word);
    document.querySelector('.hint-text b').innerText = hint;
    resetGame();
}

const gameOver = function (isVictory) {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModel.querySelector('img').src = `Images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModel.querySelector('h4').innerText = `${isVictory ? 'Congrats!' : 'Game Over'}`
        gameModel.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModel.classList.add('show')
    }, 200);
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter)
                wordDisplay.querySelectorAll('li')[index].innerHTML = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed')
            }
        })
    } else {
        wrongGuessCount++
        hangmanImage.src = `Images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false)
    if (correctLetters.length === currentWord.length) return gameOver(true)
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);

    button.addEventListener('click', function (e) {
        initGame(e.target, String.fromCharCode(i))
    })
}

getRandomWord()
playAgainBtn.addEventListener('click', getRandomWord);