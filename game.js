var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var buttonColours = ['red', 'blue', 'green', 'yellow'];

// handle pressing any key to start the game

$(document).keypress(function () {
  startGame(gameStarted);
  gameStarted = true;
});

// handle clicking any button and adding to user sequence
$('.btn').click(function () {
  // condition to prevent clicking on buttons when the game hasn't been started yet
  if (gameStarted) {
    // pushing user selected button into  userSequence array
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    // click effects (audio -> depending on color of button) / (flash animation)
    animatePress(userChosenColour);
    playAudio(userChosenColour);

    // checking user answer after every click
    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  // checking if the user clicked the right button
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // checking if the user has finished the sequence to call the nextSequence() function
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // if the answer is wrong the game restarts
    startOver();
  }
}

function nextSequence() {
  // empty user click pattern  and click count every level
  userClickedPattern = [];
  clickCount = 0;

  // selecting a button randomly and pushing it into gamePattern array
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // flash the selected button
  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  // play audio for selected button
  playAudio(randomChosenColour);

  // increasing the level
  level++;

  $('h1').text('Level ' + level);
}

function playAudio(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  setTimeout(function () {
    $('#' + currentColour).toggleClass('pressed');
  }, 100);
  $('#' + currentColour).toggleClass('pressed');
}

function startGame(bool) {
  if (!bool) nextSequence();
}

function startOver() {
  gameStarted = false;
  $('h1').text('Game Over, Press Any Key to Restart');
  playAudio('wrong');
  level = 0;
  gamePattern = [];
  setTimeout(function () {
    $('body').toggleClass('game-over');
  }, 200);
  $('body').toggleClass('game-over');
}
