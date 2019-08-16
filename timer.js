const hours = document.getElementById("hours"),
    minutes = document.getElementById("minutes"),
    seconds = document.getElementById("seconds"),
    milliseconds = document.getElementById("milliseconds");

let started = false,
    initialStarted = false,
    startTime = 0,
    stopTime = 0,
    timeElapsed = 0,
    timeOnWatch,
    timeOnWatchms,
    timer;

function manageTimer() {
    if (!started) {
        startTimer();
    } else if (flag) {
        stopTimer();
    }
}

function resetTimer() {
    if (!started) {
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
        milliseconds.innerHTML = "000";
        started = false,
        initialStarted = false,
        startTime = 0,
        stopTime = 0,
        timeElapsed = 0;
    }
}

function startTimer(e) {
    started = true;

    if (!initialStarted) {
        startTime = Date.now();
        initialStarted = true;
    } else {
        timeElapsed += (Date.now() - stopTime);
    }
    
    timer = setInterval(updateTimer);
}

function stopTimer() {
    started = false;
    stopTime = Date.now();
    clearInterval(timer);
}

function updateTimer() {
    let currentTime = Date.now() - timeElapsed;
    timeOnWatchms = currentTime - startTime;
    timeOnWatch = getTime(timeOnWatchms);
    hours.innerHTML = `${timeOnWatch.hrs}`;
    minutes.innerHTML = `${timeOnWatch.mins}`;
    seconds.innerHTML = `${timeOnWatch.s}`;
    milliseconds.innerHTML = `${timeOnWatch.ms}`;
}

function getTime(ms) {
    let hrs = 0,
        mins = 0, 
        s = 0;

    s = ms / 1000;

    hrs = (parseInt(s / 3600)).toString().padStart(2, '0');
    mins = (parseInt(s % 3600 / 60)).toString().padStart(2, '0');
    s = (parseInt(s % 3600 % 60)).toString().padStart(2, '0');
    ms = (parseInt(ms % (3.6 * Math.pow(10, 6)) % (6 * Math.pow(10, 4)) % 1000)).toString().padStart(3, '0');

    return {
        "hrs": hrs, 
        "mins": mins, 
        "s": s, 
        "ms": ms
    }
}