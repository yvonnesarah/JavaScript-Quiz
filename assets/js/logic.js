// DOM elements
var javascriptQuestions = document.querySelector("#questions"); // The div for displaying questions
var timerClock = document.querySelector("#time"); // The timer display element
var choicesOptions = document.querySelector("#choices"); // The container for question choices
var submitButton = document.querySelector("#submit"); // The button to submit the score
var startButton = document.querySelector("#start"); // The button to start the quiz
var initialsElement = document.querySelector("#initials"); // The input field for initials
var feedbackElement = document.querySelector("#feedback"); // The element for feedback (correct/incorrect)

// JavaScript quiz state variables
var currentJavascriptQuestion = 0; // Index for the current question
var time = questions.length * 10; // Set the timer based on the number of questions (10 seconds per question)
var timerId; // Timer ID to manage the timer

// Function to start the quiz
function startQuiz() {
  // Hide the start screen
  var startScreenElement = document.getElementById("start-screen");
  startScreenElement.setAttribute("class", "hide");

  // Un-hide the questions section
  javascriptQuestions.removeAttribute("class");

  // Start the timer
  timerId = setInterval(clockTick, 1000);

  // Show the starting time on the timer
  timerClock.textContent = time;
  
  // Load the first question
  getQuestion();
}

// Function to load a new question
function getQuestion() {
  // Get current JavaScript question object from the array
  var currentQuestion = questions[currentJavascriptQuestion];

  // Update the title with the current JavaScript question
  var questiontitle = document.getElementById("question-title");
  questiontitle.textContent = currentQuestion.title;
  questiontitle.setAttribute("class", "text-center");
  questiontitle.style.fontSize = "140%";

  // Hide any old question choices from the previous question
  choicesOptions.innerHTML = "";

  // Loop over JavaScript question choices and create a button for each
  currentQuestion.choices.forEach(function(choice) {
    // Create a new button for each choice with bootstrap classes
    var choicesOptionsElement = document.createElement("button");
    choicesOptionsElement.setAttribute("class", "btn btn-outline-primary mb-2");
    choicesOptionsElement.setAttribute("value", choice);
    choicesOptionsElement.textContent = choice;

    // Attach click event listener to each question choice
    choicesOptionsElement.onclick = questionClick;

    // Display the choices option for each question on the page
    choicesOptions.appendChild(choicesOptionsElement);
  });
}

// Function to handle a click on a question choice
function questionClick() {
  // Check if user guessed the question wrong
  if (this.value !== questions[currentJavascriptQuestion].answer) {
    // Penalize time for wrong answers
    time -= 10;

    // Prevent time from going below zero
    if (time < 0) {
      time = 0;
    }

    // Display the updated time on the page
    timerClock.textContent = time;

    // Show feedback that the answer was wrong in red
    feedbackElement.textContent = "Wrong!";
    feedbackElement.style.color = "red";
    feedbackElement.style.fontSize = "200%";
  } else {
    // If the answer is correct, show feedback in green
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "green";
    feedbackElement.style.fontSize = "200%";
  }

  // Flash right/wrong answer feedback
  feedbackElement.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackElement.setAttribute("class", "feedback hide");
  }, 600);

  // Move to the next question
  currentJavascriptQuestion++;

  // Check if all questions are answered, if so, end the quiz
  if (currentJavascriptQuestion === questions.length) {
    quizEnd();
  } else {
    // Otherwise, load the next question
    getQuestion();
  }
}

// Function to end the quiz
function quizEnd() {
  // Stop the timer
  clearInterval(timerId);

  // Show the end screen
  var endScreenElement = document.getElementById("end-screen");
  endScreenElement.removeAttribute("class");

  // Show the user's final score
  var finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = time;

  // Hide the JavaScript questions section
  javascriptQuestions.setAttribute("class", "hide");
}

// Function to update the timer clock every second
function clockTick() {
  // Decrease the time
  time--;
  timerClock.textContent = time;

  // Check if the time is up and end the quiz
  if (time <= 0) {
    quizEnd();
  }
}

// Function to save the user's highscore
function saveHighscore() {
  // Get the initials entered by the user
  var initials = initialsElement.value.trim();

  // If initials are not empty, save the score
  if (initials !== "") {
    // Get saved scores from localStorage, or set to an empty array if none exist
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Create a new score object for the user
    var newScore = {
      score: time,
      initials: initials
    };

    // Save the new score to localStorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Redirect the user to the highscores page
    window.location.href = "highscores.html";
  }
}

// Function to check if the "Enter" key is pressed to submit the score
function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// Add event listeners for the submit button and starting the quiz
submitButton.onclick = saveHighscore; // When the submit button is clicked, save the score
startButton.onclick = startQuiz; // When the start button is clicked, start the quiz

// Check for the Enter key press in the initials input field
initialsElement.onkeyup = checkForEnter;
