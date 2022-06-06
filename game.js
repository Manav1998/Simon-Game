var randomNumber;
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];   
var level = 0;

$(document).on("keypress", () => {
    if(level === 0){
        $("h1").text("Level " + level);
        nextSequence();
    }
});

$(".btn").on("click", (event) => {
    handler(event.currentTarget.id);
    animatePress(event.currentTarget.id);
    checkAnswer();
});

function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);;
}

function checkAnswer(){
    for(var i = 0, j = 0; i < userClickedPattern.length; i++){
        if(userClickedPattern[i] === gamePattern[j]){
            j++; 
        }
        else {
            level = 0;
            gamePattern = [];
            userClickedPattern = [];
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            playSound("wrong");
            $("h1").text("Game Over, Press Any Key to Restart");
            break;
        }
    }

    if(j === level){
        setTimeout(() => {
            nextSequence(); 
        }, 1000); 
        userClickedPattern = [];
    }
}

function handler(id){
    playSound(id);
    userClickedPattern.push(id);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).delay(100).removeClass("pressed");
    }, 100);
}
