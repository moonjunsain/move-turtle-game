// variables that point to certain elements with specific ids
var turtleImg = document.querySelector("#turtle");
var targetImg = document.querySelector("#target");
var playBtn = document.querySelector("#play");
var headerEl = document.querySelector("#header");

// create a p element
var time = document.createElement("p");

// Might add different levels in future
var level = 1;
var timeLeft = 60;

// setting the time (p) element's text
time.textContent = "Time Left: " + timeLeft;
// appending time element to header
headerEl.appendChild(time);
// sets attributes for time
time.setAttribute("style", "margin-top: 10px;");
time.style.fontSize = "170%";


// initial position for turtle
var positionX = 80;
var positionY = 80;
turtleImg.style.top = positionY + "px";
turtleImg.style.left = positionX + "px";

// Initial position for target
var targetX = 500;
var targetY = 500;
targetImg.style.top = targetY + "px";
targetImg.style.left = targetX + "px";


// Set the time interval function
function countDown(){
    var timeInterval = setInterval(function (){
        if(timeLeft <= 0){
            clearInterval(timeInterval);
            alert("You are slower than turtle :)");
            var retry = confirm("Do you want to try again?");
            if(retry){
                startGame();
            }
        }else if(timeLeft <= 30){
            time.style.color = "red";
            timeLeft--;
            time.textContent = "Time Left: " + timeLeft;
        }else {
            timeLeft--;
            time.textContent = "Time Left: " + timeLeft;
        }
        

    }, 400)
}

// object turtle with 2 functions
var turtle = {
    // move the turtle based on what the user presses
    moveTurtle: function(event){
        switch (event.key) {
            case "ArrowUp":
                positionY -= 10;
                break;
            case "ArrowDown":
                positionY += 10;
                break;
            case "ArrowRight":
                positionX += 10;
                break;
            case "ArrowLeft":
                positionX -= 10;
                break;
        }
        turtleImg.style.top = positionY + "px";
        turtleImg.style.left = positionX + "px";
    },
    // checks if the turtle image is touching (overlapping) the target image
    isTouchingTarget: function(){
        console.log("This is working");
    // this logic was so hard to figure out lol
     if((positionX + 100 >= targetX && positionX <= targetX + 10) && (positionY + 100 >= targetY && positionY <= targetY + 10) ){
        alert("You are there!");
        var replay = confirm("Do you want to play again?");
        if(replay){
            startGame();
        }
     }
    },
};

// function that starts game
function startGame(){
    // resets all the necessary variables
    timeLeft = 60;
    // sets random position for target image
    targetX = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
    targetY = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
    time.style.color = "black";
    countDown();

    targetImg.style.top = targetY + "px";
    targetImg.style.left = targetX + "px";
    turtleImg.style.top = 80 + "px";
    turtleImg.style.left = 80 + "px";
    positionX = 80;
    positionY = 80;

    // only adds event listener when the user hits play button
    document.addEventListener("keydown", turtle.isTouchingTarget);
    document.addEventListener("keydown", turtle.moveTurtle);
}


// Add event listeners for play button
playBtn.addEventListener("click", startGame);
