const prompt = document.getElementById("prompt");


const phrases = [
    "JavaScript does prototypical inheritance",
    "It was designed by Brendan Eich",
    "MDN docs are so good!"
]
function getPhrase() {
    // would want to make some api call to get text
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function setPhrase() {
    prompt.innerHTML = getPhrase();
}

setPhrase();