const prompt = document.getElementById("prompt"),
      score = document.getElementById("score"),
      restart = document.getElementById("restart"),
      gameText = document.getElementById("game-text"),
      hearts = document.getElementById("hearts"),
      level = document.getElementById("level");
const MAXPOINTS = 100,
      INCREMENT = 10,
      LEVEL_DECREMENT = 10,
      LIVES_MULTIPLIER = 100;

let phrase,
    points = 0,
    gameStart = false,
    livesLeft = hearts.children.length,
    progressTimer;

const phrases = [
    "JavaScript does prototypical inheritance",
    "It was designed by Brendan Eich",
    "MDN docs are so good!"
];

restart.addEventListener("click", () => {
    reset();
});

function reset() {
    clearBattleground()
    updateScore(0);
    resetTimer();
    resetHearts();
    changeLifeLevel(100);
    livesLeft = 3;
    gameStart = false;
}

function getPhrase() {
    // would want to make some api call to get text
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function setPhrase() {
    phrase = getPhrase();
    prompt.innerHTML = phrase;
}

function updateScore(points) {
    score.innerHTML = points;
}

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

function isGameOver(ans="") {
    return livesLeft == 0 || ans == phrase;
}

function removeHeart() {
    if (livesLeft > 0) {
        document.getElementById(`heart-${livesLeft}`).style.color = "white";
        livesLeft--;
    }
}

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

function postGame() {
    points += (livesLeft) * LIVES_MULTIPLIER;
    hearts.style.display = "none";
    gameText.style.display = "block";
    gameText.innerHTML = `GAME OVER! Your score ${points}`;
    level.attributes.value.nodeValue = 100;
}

function resetHearts() {
    gameText.style.display = "none";
    hearts.style.display ="block";
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`heart-${i}`).style.color = "red";
    }
}

function start() {
    progressTimer = setInterval(changeLifeLevel, 100)
}

function stop() {
    stopTimer();
    clearInterval(progressTimer);
    postGame();
}

setPhrase();