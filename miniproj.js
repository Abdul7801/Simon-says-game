let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");  // Apply the 'flash' class
    setTimeout(function () {
        btn.classList.remove("flash");  // Remove the 'flash' class after 250ms
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Random button choice (fixed range to 4)
    let randIdx = Math.floor(Math.random() * 4);  // Changed from 3 to 4
    let randColor = btns[randIdx];
    let randBtn = document.getElementById(randColor);  // Fixed to use getElementById()

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);  // Call gameFlash to make the button flash
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red"; 
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"; 
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Load sounds
let beepSound = new Audio("beep.wav");
let flashSound = new Audio("flash.wav");
let gameOverSound = new Audio("gameover.wav");

// Function to play sound when a button is pressed
function playBeepSound() {
    beepSound.play();
}

// Function to play sound when a sequence flashes
function playFlashSound() {
    flashSound.play();
}

// Function to play sound when game is over
function playGameOverSound() {
    gameOverSound.play();
}

// Modify gameFlash function to play flash sound
function gameFlash(btn) {
    btn.classList.add("flash");
    playFlashSound();  // Play sound when the sequence flashes
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Modify userFlash function to play beep sound
function userFlash(btn) {
    btn.classList.add("userflash");
    playBeepSound();  // Play sound when the user presses a button
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Modify checkAns function to play game over sound
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red"; 
        playGameOverSound();  // Play game over sound
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"; 
        }, 150);
        reset();
    }
}

beepSound.volume = 0.5;  // Set beep sound volume to 50%
flashSound.volume = 0.3; // Set flash sound volume to 30%
gameOverSound.volume = 0.7; // Set game over sound volume to 70%
