// create new variable

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timer = [0,0,0,0]; //create an array for the timer
var interval;
var timerRunning = false; //we put false because when page load the time should stay at zero until the user starts typing

// This function is to add a zero in front of the counting number 
// This will help make the timer easier to see

function leadingZero(time) {
    if (time <= 9) {          // if the counting digit equal to 9 or less then 9
        time = "0" + time;  // put a zero if front of the variable time
    }
    return time;            //return will stop the execution because the zero will be replace once the time it goes to 10 or higher)
}


//creating a function that will run the clock by minute/second/hundredth of a second
function runTimer() {
let currentTime = leadingZero([0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
theTimer.innerHTML = currentTime;
timer[3]++;

timer[0] = Math.floor((timer[3]/100/60));
timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Functuon to for the user to match the text with the provided text on the page

function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#4298903";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3"
        } else{
        testWrapper.style.borderColor = "#E95D0f";
        } 
    }
}

// creates a function to start the timer
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnterdLength);
}

// creates a function to reset everything

function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

//Create event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);