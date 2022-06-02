const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let gameEnd = false;
let wordToGuess;
let unrevealedWordToGuess = [];
let clickedLetters = [];
let triesLeft = 15;
let lettersCnt = 0;

function saveWordToGuess() {
  wordToGuess = document.getElementById("myText").value;
  document.getElementById("myText").value = "";
  for (let index = 0; index < wordToGuess.length; ++index) {
    unrevealedWordToGuess.push("_");
  }
  createKeyboard();
}

function createKeyboard() {
  document.getElementById("unrevealedWord").innerHTML = unrevealedWordToGuess;
  document.getElementById("title").innerHTML = "Choose a letter!"
  document.getElementById("status").innerHTML = "Tries left: " + triesLeft;
  for (let index = 0; index < alphabet.length; ++index) {
    const button = document.createElement("button");
    button.innerText = alphabet[index];
    button.value = alphabet[index];
    button.addEventListener("click", function() {
      if (gameEnd == false) {
        checkLetter(button.value);
      }
    });
    document.body-keyboard.appendChild(button);
  }
}

function checkLetter(letter) {
  if (wordToGuess.indexOf(letter) < 0) {
    --triesLeft;
    document.getElementById("status").innerHTML = "Tries left: " + triesLeft;
  } else if (clickedLetters.indexOf(letter) < 0) {
    clickedLetters.push(letter);
    revealLetters(letter);
  }
  gameStatus();
  if (triesLeft <= 5) {
    document.getElementById("status").style.color = "red";
  }
}

function revealLetters(element) {
  for(let index = wordToGuess.indexOf(element); index < wordToGuess.length; ++index) {
    if (wordToGuess.charAt(index) == element) {
      ++lettersCnt;
      unrevealedWordToGuess[index] = element;
    }
  }
  document.getElementById("unrevealedWord").innerHTML = unrevealedWordToGuess;
}

function gameStatus() {
  if (triesLeft == 0) {
    gameEnd = true;
    document.getElementById("unrevealedWord").style.color = "red";
    document.getElementById("unrevealedWord").innerHTML = "You lose!";
    playAgain();
  } else if (lettersCnt == wordToGuess.length) {
    gameEnd = true;
    document.getElementById("unrevealedWord").style.color = "green";
    document.getElementById("unrevealedWord").innerHTML = "You won!";
    playAgain();
  }
}

function playAgain() {
  const button = document.createElement("button");
  button.innerText = "Play again!";
  button.addEventListener("click", function () {
    location.reload();
  });
  document.body-playAgainBtn.appendChild(button);
}