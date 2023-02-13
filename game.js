const buttonColors=['red','blue','green','yellow'];
const sounds = {
    'red': new Audio("sounds/red.mp3"),
    'blue': new Audio("sounds/blue.mp3"),
    'green': new Audio("sounds/green.mp3"),
    'yellow': new Audio("sounds/yellow.mp3"),
    'wrong': new Audio("sounds/wrong.mp3"),
};

var gamePattern = [];
var userClickedPattern=[];

var hasGameStarted = false;
var level=0;
function nextSequence(){
    userClickedPattern=[];
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level= level+1;
    $("#level-title").text("Level "+level);
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
}

function playSound(name){
    sounds[name].play();
}

function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(nextSequence,1000 );
        }
    }else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern = [];
    hasGameStarted=false;
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function (){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
   if(!hasGameStarted){
       hasGameStarted=true;
       nextSequence();
       $("#level-title").text("Level 0");
       console.log("Game Strated");
   }
});


