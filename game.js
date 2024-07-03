// Array with ID name of the buttons
var buttonColours = ["green", "red", "yellow", "blue"];

//count the current level of the user
var level = 0;

//Indicates if the game has started or not
var started = false;

//Array to store the sequence of colors generated by the game
var gamePattern = [];

//Array to store the sequence of buttons clicked by the user
var userClickedPattern = [];

//Blinking effect on title if the game has not started
if (started == false) {
    $("#level-title").addClass("blinking-effect");
};

//Trigger the nextSequence() function to start the sequence of colors when Start btn is clicked
$("#start").click(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(this).hide();
    }
});

//Indentify and track into userClickedPattern[] the sequence of the buttons clicked by the user
$(".btn").on("click", function () {
    //Keeps the colored buttons blocked if the start button has not been clicked yet
    if (started == false) {
        $(this).prop("disabled", true);
    } else {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
});

//Check the game patter against the user pattern to go to the next color sequence or not
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 2000);
        }
    } else {
        gameOver();
    }
}

//Generate the sequence of colours that user needs to follow and increments the level counter
function nextSequence() {

    userClickedPattern = [];
    //Increments the level
    level++;
    //Remove the blinking effect on title once the game has started
    $("#level-title").removeClass("blinking-effect");
    //Modify the title according to the current level
    $("#level-title").text("Level " + level);
    //Choose a random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4);
    //Got the button colour depending on the random number
    var randomChosenColour = buttonColours[randomNumber];
    //Add the randomChosenColour into the gamePattern Array
    gamePattern.push(randomChosenColour);
    //Generates animation and sound dependig on the generated random number
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//play sound depending on the color clicked
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Generates light effect around the button that is clicked
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Trigger the game over effects (sound, red backgroud, title) and restarts the level counter.
function gameOver() {
    playSound("wrong");
    $('body').addClass("game-over");
    $("#level-title").text("Game Over");
    setTimeout(function () {
        $('body').removeClass("game-over");
        $("#level-title").text("Press Start button");
        $("#level-title").addClass("blinking-effect");
        $("#start").show();

        level = 0;
        started = false;
        userClickedPattern = [];
        var gamePattern = [];
    }, 2000);
}