// *** VARIABLES ***
let gamePattern = [];
let userClickedPattern = []; // This is needed for the first user input then it will be resetted inside nextSequence
let gameStarted = false;
let level = 0;
const buttonColors = ["better", "faster", "harder", "stronger"];
// Preload all sound files
const sounds = {
  wrong: new Audio("./sounds/wrong.mp3"),
  better: new Audio("./sounds/better.mp3"),
  faster: new Audio("./sounds/faster.mp3"),
  harder: new Audio("./sounds/harder.mp3"),
  stronger: new Audio("./sounds/stronger.mp3"),
};

// *** START THE GAME ***
function startGameOnKeyPress() {
  $(document).on("keydown", function () {
    if (gameStarted == false) {
      nextSequence();
      gameStarted = true;
    }
  });
}

// *** GENERATE NEXT SEQUENCE ***
function nextSequence() {
  userClickedPattern = []; // Reset user input
  level++; // Increment level
  $("h1").text("Level " + level); // Change title to show the current level

  let randomNumber = Math.floor(Math.random() * 4); // Generate random number between 0-3
  let randomChosenColor = buttonColors[randomNumber]; // Choose a random color
  gamePattern.push(randomChosenColor); // Add chosen color to gamePattern

  // Select the ID of the chosen color to animate
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  sounds[randomChosenColor].play(); // Play the sound corresponding to the chosen color
}

// *** USER CLICKED EVENT ***
// Detect click event on class .btn then store the clicked button's ID in userChosenColor and push it to user pattern
$(".btn").on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  $(this).addClass("pressed"); // Add .pressed class to the user selected button
  setTimeout(() => $(".btn").removeClass("pressed"), 100); // Remove .pressed class from all buttons

  sounds[userChosenColor].play(); // Play the sound corresponding to the chosen color

  checkAnswer(userClickedPattern.length - 1); // Check the user's answer after each click
});

// *** CHECK ANSWER ***
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000); // Call next sequence after delay
    }
  } else {
    // Wrong choice
    $("body").addClass("game-over"); // Add .game-over class to body
    setTimeout(() => $("body").removeClass("game-over"), 200); // Remove .game-over class from body
    $("h1").text("Game over (Level " + level + ")"); // Show game over message
    sounds.wrong.play();

    // Reset the game
    resetGame();
  }
}

// *** RESET THE GAME ***
function resetGame() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

// Call the function to start the game on keypress
startGameOnKeyPress();

/* GREAT NOTES ABOUT THE checkAnswer function

// currentLevel function input approach
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    $("h1").text("Game over. Your level is " + level);
    sounds.wrong.play();
    startOver();
  }
}

// for loop approach
function checkAnswer() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      $("h1").text("Game over. Your level is " + level);
      sounds.wrong.play();
      startOver();
      return; // Exit the function early if there's a mistake
    }
  }

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(() => nextSequence(), 1000);
  }
}

Comparison:
Check Logic:

CurrentLevel Approach: Directly compares the specific currentLevel index of both arrays (gamePattern and userClickedPattern).
Loop Approach: Iterates through the userClickedPattern array, comparing each element with the corresponding element in gamePattern.
Control Flow:

CurrentLevel Approach: Checks the current level's index and decides the next action based on that specific comparison.
Loop Approach: Iterates over the user's inputs and checks each one against the game pattern. It exits early if an error is found, otherwise proceeds if the entire pattern is correct.
Sequence Completion:

Both approaches check if the userClickedPattern length matches the gamePattern length before moving on to the next sequence.
Game Over Handling:

Both approaches handle game over situations by displaying a message, playing a sound, and resetting the game.
Which to Use?
CurrentLevel Approach:

It's more direct and simpler when you are only concerned with checking the latest user input against the corresponding game pattern element.
Useful in scenarios where you're already tracking the currentLevel.
Loop Approach:

Provides a more general solution, checking the entire sequence of inputs at once.
Suitable for cases where you want to compare full sequences rather than just the most recent input.
The choice between the two depends on your specific needs and whether you prefer checking individual steps as they occur (CurrentLevel) or validating the entire user input sequence at once (Loop).















*/
