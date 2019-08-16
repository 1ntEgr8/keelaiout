const battleground = document.getElementById("battleground"),
      keyMapping = document.getElementById("key-mapping");
let isShift = false,
    oldLen = 0
    currentMapping = "DVORAK";

const acceptedMappings = [
    "DVORAK",
    "COLEMAK"
];

// QWERTY to DVORAK key mappings
const QWERTYTODVORAK = {
    "-": "[",
    "_": "{",
    "+": "}",
    "=": "]",
    "q": "'",
    "w": ",",
    "e": ".",
    "r": "p",
    "t": "y",
    "y": "f",
    "u": "g",
    "i": "c",
    "o": "r",
    "p": "l",
    "[": "/",
    "]": "=",
    "{": "?",
    "}": "+",
    "s": "o",
    "d": "e",
    "f": "u",
    "g": "i",
    "h": "d",
    "j": "h",
    "k": "t",
    "l": "n",
    ";": "s",
    "'": "-",
    "\"": "_",
    "z": ";",
    "x": "q",
    "c": "j",
    "v": "k",
    "b": "x",
    "n": "b",
    ".": "v",
    "/": "z",
    "?": "Z",
    ">": "V",
    "<": "W",
    "{": "?",
    "}": "+",
    ",": "w",
    "specialq": "\"",
    "specialw": "<",
    "speciale": ">",
    "specialz": ":",
};
// QWERTY TO COLEMAK key mappings
const QWERTYTOCOLEMAK = {
    "e": "f",
    "r": "p",
    "t": "g",
    "y": "j",
    "u": "l",
    "i": "u",
    "o": "y",
    "p": ";",
    "specialp": ":",
    "s": "r",
    "d": "s",
    "f": "t",
    "g": "d",
    "j": "n",
    "k": "e",
    "l": "i",
    ";": "o",
    ":": "O",
    "n": "k"
}

battleground.addEventListener("input", (e) => {
    if (!gameStart) {
        currentMapping = acceptedMappings[Math.floor(Math.random() * acceptedMappings.length)];
        changeKeyMappingText(currentMapping);
        start();
        startTimer();
        gameStart = true;
    }
    if (livesLeft == 0) {
        return;
    }
    let textContent = e.target.value,
        characterTyped = textContent[textContent.length - 1];
    if (oldLen < textContent.length) {
        const newChar = mapToLayout(characterTyped, currentMapping);
        e.target.value = textContent.substring(0, textContent.length - 1) + newChar;
    }
    oldLen = textContent.length;
    checkAnswer(e.target.value);
    if (isGameOver()) {
        currentMapping = acceptedMappings[Math.floor(Math.random() * acceptedMappings.length)];
        gameStart = false;
        changeKeyMappingText("");
        stop();
    }
})

battleground.addEventListener("keydown", (e) => {
    if (e.shiftKey || (e.key == e.key.toUpperCase() && e.key.match(/[a-z]/))) {
        isShift = true;
    } else {
        isShift = false;
    }
})

function mapToLayout(c, to) {
    let layoutMapping;
    switch(to) {
        case "DVORAK": layoutMapping = QWERTYTODVORAK; break;
        case "COLEMAK": layoutMapping = QWERTYTOCOLEMAK; break;
        default: {console.error(`QWERTY to ${to} is not supported yet`); return;};
    }
    if (isShift) {
        let mappings = Object.keys(layoutMapping)
                                .filter(value => value.includes("special"))
                                .map( value => value[value.length - 1]);
        if (mappings.includes(c.toLowerCase())) {
            return layoutMapping[`special${c.toLowerCase()}`]
        } else {
            let val = layoutMapping[c.toLowerCase()];
            if (val) {
                return val.toUpperCase();
            } else {
                return c;
            }
        }
    }
    let val = layoutMapping[c];
    if (val) {
        return val;
    } else {
        return c;
    }
}

function clearBattleground() {
    battleground.value = "";
}

function changeKeyMappingText(s) {
    keyMapping.innerHTML = s;
}

/*
    the last part is to add the lives feature, and you will be done!!!!
*/