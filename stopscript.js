// Initialize variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let laps = [];

const digitalDisplay = document.getElementById("digitalDisplay");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const lapButton = document.getElementById("lapButton");
const resetButton = document.getElementById("resetButton");
const lapsList = document.getElementById("laps");

function start() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    running = false;
    laps = [];
    renderLaps();
}

function recordLap() {
    if (running) {
        laps.push(formatTime(elapsedTime));
        renderLaps();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    digitalDisplay.innerHTML = formattedTime;
}

function formatTime(time) {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);
    return (
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

function renderLaps() {
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapItem.classList.add("lap-item");
        lapsList.appendChild(lapItem);
    });
}

// Event listeners
startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);
