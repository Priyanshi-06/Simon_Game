var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var start = 0;

$(document).keypress(function(){
    if(!start)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        start=1;
    }
});

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function playSound(name)
{
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver()
{
    level = 0;
    start = 0;
    gamePattern = [];
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {   
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}







