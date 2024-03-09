// script.js

function startGame() {
    
    document.getElementById('cheatCheckbox').checked = false;
    fetch('getWord.php')
        .then(response => response.json())
        .then(data => {
            if (data.word) {
                setupGame(data.word.toUpperCase());
            } else {
                console.error('Error fetching word:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
}

let attemptsLeft = 11;
let guessedLetters = [];
let correctGuesses = [];
let selectedWord = '';

document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;

function setupGame(word) {
    selectedWord = word;
    guessedLetters = [];
    correctGuesses = Array(word.length).fill('_');
    attemptsLeft = 11;
    updateAttemptsLeft();
    updateWordDisplay();
    generateLetterButtons();
    updateGallows();
}

function cheatCode(){
    const cheatCheckbox = document.getElementById('cheatCheckbox');
    if (cheatCheckbox.checked) {
      alert("The word is " + selectedWord);    
    }
  }

function updateWordDisplay() {
    const wordToGuess = document.getElementById('wordToGuess');
    wordToGuess.innerHTML = correctGuesses.join(' ');
}

function generateLetterButtons() {

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = ''; // Clear previous buttons

    const grid = document.createDocumentFragment();
    letters.split('').forEach((letter, index) => {
        if (index > 0 && index % 5 === 0) grid.appendChild(document.createElement('br'));
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = () => guessLetter(letter);
        grid.appendChild(button);
    });
    lettersDiv.appendChild(grid);
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter) || attemptsLeft === 0 || !selectedWord) {
        return;
    }

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        selectedWord.split('').forEach((char, index) => {
            if (char === letter) {
                correctGuesses[index] = letter;
            }
        });
        updateWordDisplay();

        if (!correctGuesses.includes('_')) {
            alert('Congratulations! You won!');
        }
    } else {
        attemptsLeft--;
        updateAttemptsLeft();
        updateGallows();

        if (attemptsLeft === 0) {
            alert(`Game Over! The word was "${selectedWord}".`);
        }
    }
}

function updateAttemptsLeft() {
    document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;
    document.getElementById('gallows').src = "hangman" + attemptsLeft + ".png";
}

function updateGallows() {
    // Implement the logic to update the gallows image or draw a section
    // This placeholder assumes you update an element's textContent or src attribute
    // Example: document.getElementById('gallows').textContent = `Attempts left: ${attemptsLeft}`;
    // Or, if using images, adjust the image source based on attemptsLeft
    console.log(`Attempts left: ${attemptsLeft}`);
}

// Initially start the game
startGame();