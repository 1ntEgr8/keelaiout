const battleground = document.getElementById("battleground"), // the textarea where all the action happens
      keyMapping = document.getElementById("key-mapping"); // the key mapping hint provided at the bottom
let isShift = false, // used to decide if key combo characters need to be displayed
    oldLen = 0, // used to prevent the last character from changing based on keymapping when backspacing
    currentMappingText = "DVORAK", // default keyboard layout mapping
    currentMapping;

// list of accepted mappings, 
// UPDATE THIS IF YOU ADD NEW MAPPINGS TO THE GAME
// ALSO UPDATE THE SWITCH STATEMENT IN changeKeyMapping()
const acceptedMappings = [
    "DVORAK",
    "COLEMAK",
    "WORKMAN"
];

/* ======== KEY MAPPINGS START ======== */
// consider moving these to another file
// FOLLOW THE SAME FORMAT AS THE OTHER MAPPINGS WHEN CREATING A NEW ONE
// UPDATE acceptedMappings IF YOU ADD NEW MAPPINGS TO THE GAME
// ALSO UPDATE THE SWITCH STATEMENT IN changeKeyMapping()

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

// QWERTY TO WORKMAN key mappings
const QWERTYTOWORKMAN = {
    "w": "d",
    "e": "r",
    "r": "w",
    "t": "b",
    "y": "j",
    "u": "f",
    "i": "p",
    "o": ";",
    "specialo": ":",
    "d": "h",
    "f": "t",
    "h": "y",
    "j": "n",
    "k": "e",
    ";": "o",
    ":": "O",
    "c": "m",
    "v": "c",
    "b": "v",
    "n": "k",
    "m": "l"
}
/* ======== KEY MAPPINGS END ======== */

// handles changing displayed character to the keyboard layout for the game
battleground.addEventListener("input", (e) => {
    // starts the game if it hasn't begun
    if (!gameStart) {
        currentMappingText = acceptedMappings[Math.floor(Math.random() * acceptedMappings.length)];
        changeKeyMapping(currentMappingText);
        start();
        startTimer();
        gameStart = true;
    }
    /* === CHARACTER CONVERSION TO CHOSEN LAYOUT START === */
    let textContent = e.target.value,
        characterTyped = textContent[textContent.length - 1];
    if (oldLen < textContent.length) {
        const newChar = mapToLayout(characterTyped);
        e.target.value = textContent.substring(0, textContent.length - 1) + newChar;
    }
    oldLen = textContent.length;
    /* === CHARACTER CONVERSION TO CHOSEN LAYOUT END === */
    
    if (livesLeft > 0) {
        // checks the answer, and updates the score
        checkAnswer(e.target.value);

        // checking if the game is over
        if (isGameOver()) {
            stop();
        }
    }
})

// used for toggling isShift to decide if key combo characters need to be displayed
battleground.addEventListener("keydown", (e) => {
    if (e.shiftKey || (e.key == e.key.toUpperCase() && e.key.match(/[A-Z]/))) {
        console.log("checking is yes");
        isShift = true;
    } else {
        isShift = false;
    }
})

// maps a character "c" to the layout "to"
function mapToLayout(c) {
    // checking if a key combo character needs to be displayed
    if (isShift) {
        let mappings = Object.keys(currentMapping)
                                .filter(value => value.includes("special"))
                                .map( value => value[value.length - 1]);
        if (mappings.includes(c.toLowerCase())) {
            return currentMapping[`special${c.toLowerCase()}`]
        } else {
            let val = currentMapping[c.toLowerCase()];
            if (val) {
                return val.toUpperCase();
            } else {
                return c;
            }
        }
    }
    let val = currentMapping[c];
    if (val) {
        return val;
    } else {
        return c;
    }
}

// clears the battleground aka textarea
function clearBattleground() {
    battleground.value = "";
}

// changes the current key mapping
function changeKeyMapping(to) {
    keyMapping.innerHTML = to;
    switch(to) {
        case "DVORAK": currentMapping = QWERTYTODVORAK; break;
        case "COLEMAK": currentMapping = QWERTYTOCOLEMAK; break;
        case "WORKMAN": currentMapping = QWERTYTOWORKMAN; break;
        default: {console.error(`QWERTY to ${to} has not been added as a case in the switch statment or isn't supported yet`); return;};
    }
}
