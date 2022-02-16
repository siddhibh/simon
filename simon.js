var gamePattern = [];
var userClickedPattern = [];
var level = 0 ;
var started = false;

var buttoncolours = ["red", "blue", "green", "yellow"];

$(document).keypress(function (){
    if(!started){
        $("level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttoncolours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
  }


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
function playsound(name) {
    var audio = new Audio("sounds/"+name+".wav");
    audio.play();
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
 else {
     playsound("gameover");
     $("body").addClass("gameover");
     $("#level-title").text("Game Over,Press any key to Restart");
     setTimeout(function(){
         $("body").removeClass("gameover");
     },200);

     startover();
 }
}
function startover(){
    level = 0;
    gamePattern = [];
    started = false;
}