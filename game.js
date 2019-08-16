const prompt = document.getElementById("prompt"),
      score = document.getElementById("score"),
      restart = document.getElementById("restart");
let phrase,
    points = 0,
    gameStart = false;
const MAXPOINTS = 100,
      INCREMENT = 10;

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
    stopTimer();
    resetTimer();
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
            return i;
        }
    }
    return 0;
}

function isGameOver(ans) {
    return ans == phrase;
}

setPhrase();
