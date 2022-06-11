var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameStarted = false;

var nextSequence = () => {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playsound(randomChosenColor);
    level++;
    $("h1").text(`Level ${level}`);

}

$(".btn").click(function (e) {
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
})

function playsound(name) {
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    var sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

$("body").keypress(function () {
    if (!gameStarted) {
        $("h1").text(`Level ${level}`);
        nextSequence();
        gameStarted = true;
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }

    } else {
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        $("h1").text("Game over, press any button to restart!")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
