// array of colors for the button
var buttonColours = ['red', 'blue', 'green', 'yellow'];

// game pattern
var gamePattern = [];

// user clicked buttons
var userClickedPattern = [];

// track of whether if the game has started or not
var started = false;

// create a variable called level and start at level 0
var level = 0;

// detect keyboard is pressed
$(document).keypress(function () {
  if (!started) {
    $('#level-title').text('level ' + level);
    nextSequence();
    started = true;
  }
});

// which button is pressed
$('.btn').click(function (e) {
  var userChosenColour = e.target.id;

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// checkAnswer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    console.log('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

// nextSequence function
function nextSequence() {
  userClickedPattern = [];
  level++;

  $('#level-title').text('level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// button sound
function playSound(randomButton) {
  switch (randomButton) {
    case 'blue':
      var blueSound = new Audio('/sounds/blue.mp3');
      blueSound.play();
      break;
    case 'green':
      var greenSound = new Audio('sounds/green.mp3');
      greenSound.play();
      break;
    case 'red':
      var redSound = new Audio('sounds/red.mp3');
      redSound.play();
      break;
    case 'wrong':
      var wrongSound = new Audio('sounds/wrong.mp3');
      wrongSound.play();
      break;
    case 'yellow':
      var yellowSound = new Audio('sounds/yellow.mp3');
      yellowSound.play();
      break;

    default:
      console.log(randomButton);
      break;
  }
}

// Add animations to user Clicks
function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');

  setTimeout(() => {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

// StartOver function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
