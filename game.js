const prompt = document.getElementById("prompt"), // the phrase that needs to be typed
      score = document.getElementById("score"), 
      restart = document.getElementById("restart"),
      gameText = document.getElementById("game-text"), // game over text div
      hearts = document.getElementById("hearts"),
      level = document.getElementById("level"),; // progress bar

/*
    Changing these variables will alter the scoring system and difficulty of the game
*/
const MAXPOINTS = 100,
      INCREMENT = 10,
      LEVEL_DECREMENT = 10, // increase to make the game harder
      LIVES_MULTIPLIER = 100,
      NO_OF_LIVES = hearts.children.length; // DONT CHANGE THIS WITHOUT ADDING MORE HEARTS IN INDEX.HTML

let phrase,
    points = 0,
    gameStart = false,
    livesLeft = hearts.children.length,
    progressTimer; // used for updating the value of the progress HTML tag


// ideally would want to get these phrases from an API; also would love to have them to be the same length
const phrases = [
    "JavaScript does prototypical inheritance",
    "It was designed by Brendan Eich",
    "I'm having fun! Hope this is going well",
    "Lowl, owl, parrot, carrot",
    "my creative juices Are FlOwIng"
];

restart.addEventListener("click", () => {
    reset();
});

/*
    Clears the text area, 
    resets score to 0,
    resets the timer,
    gives three new lives
*/
function reset() {
    clearBattleground()
    updateScore(0);
    resetTimer();
    resetHearts();
    gameStart = false;
}

// sends a new phrase to be displayed. currently pulls from the phrases array
function getPhrase() {
    return phrases[Math.floor(Math.random() * phrases.length)];
}

// sets the prompt with a phrase
function setPhrase() {
    phrase = getPhrase();
    prompt.innerHTML = phrase;
}

// updates the score
function updateScore(points) {
    score.innerHTML = points;
}

// checks if the written phrase and the actual phrase match; updates the score based on response
// negative points if the length of the response is greater than that of the answer
function checkAnswer(ans) {
    if (!ans) {
        updateScore(0);
    }
    if (ans.length > phrase.length) {
        points -= (INCREMENT * (ans.length - phrase.length));
        updateScore(points);
        return;
    }
    points = 0;
    for (let i = 0; i < ans.length; i++) {
        let result = calculatePoints(ans.charAt(i), phrase.charAt(i));
        if (result == 0) {
            return;
        } else {
            points += result;
            updateScore(points);
        }
    }
}

// calculates the points to be awarded on a character by character basis
// would like to move the business logic of updating points in checkAnswer() to here
function calculatePoints(response, correctAnswer) {
    let diff = response.charCodeAt(0) - correctAnswer.charCodeAt(0);
    for (let i = MAXPOINTS; i >= 0; i-=INCREMENT) {
        if (Math.abs(diff) <= (MAXPOINTS - i)) {
            changeLifeLevel(i);
            return i;
        }
    }
    return 0;
}

// game is over only if the response matches the phrase, or if the player if out of lives
function isGameOver(ans="") {
    return livesLeft == 0 || ans == phrase;
}

// removes a heart :(
function removeHeart() {
    if (livesLeft > 0) {
        document.getElementById(`heart-${livesLeft}`).style.color = "white";
        livesLeft--;
    }
}

// updates the value of the progress tag. will stop the game if isGameOver() returns true
function changeLifeLevel(i=0) {
    let currentValue = parseInt(level.attributes.value.nodeValue),
        newValue = currentValue - LEVEL_DECREMENT;
    if (i >= 70) {
        newValue = currentValue + (Math.abs(i) / 10);
        if (newValue >= 100) {
            newValue = 100;
        }
    }
    if (currentValue <= 0) {
        removeHeart();
        newValue = 100;
        if (isGameOver()) stop();
    }
    level.attributes.value.nodeValue = newValue;
}

// does the things that are needed post game over
function postGame() {
    points += (livesLeft) * LIVES_MULTIPLIER;
    hearts.style.display = "none";
    gameText.style.display = "block";
    gameText.innerHTML = `GAME OVER! Your score ${points}`;
    level.attributes.value.nodeValue = 100;
}

// adds three hearts, resets livesLeft, and changes the value of the progress tag to 100
function resetHearts() {
    gameText.style.display = "none";
    hearts.style.display ="block";
    for (let i = 1; i <= NO_OF_LIVES; i++) {
        document.getElementById(`heart-${i}`).style.color = "red";
    }
    livesLeft = NO_OF_LIVES;
    changeLifeLevel(100);
}

// starts the game
function start() {
    progressTimer = setInterval(changeLifeLevel, 100)
}

// stops the game
function stop() {
    stopTimer();
    clearInterval(progressTimer);
    postGame();
}

setPhrase();