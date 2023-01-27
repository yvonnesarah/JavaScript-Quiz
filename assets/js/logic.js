// DOM elements
var javascriptQuestions = document.querySelector("#questions");
var timerClock = document.querySelector("#time");
var choicesOptions = document.querySelector("#choices");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start");
var initialsElement = document.querySelector("#initials");
var feedbackElement = document.querySelector("#feedback");

// JavaScript quiz state variables
var currentJavascriptQuestion = 0;
var time = questions.length * 10;
var timerId;

function startQuiz() {
// hide the start screen
var startScreenElement = document.getElementById("start-screen");
startScreenElement.setAttribute("class", "hide");

// un-hide the questions section
javascriptQuestions.removeAttribute("class");

// start the timer
 timerId = setInterval(clockTick, 1000);

// show the starting time on the timer
timerClock.textContent = time;
getQuestion();
}

function getQuestion() {
// get current JavaScript question object from array
var currentQuestion = questions[currentJavascriptQuestion];
  
// update title with current JavaScript question
var questiontitle = document.getElementById("question-title");
questiontitle.textContent = currentQuestion.title;
questiontitle.setAttribute("class","text-center");
questiontitle.style.fontSize= "110%";
  
// hide any old question choices from previous question
choicesOptions.innerHTML = "";

// loop over JavaScript question choices
currentQuestion.choices.forEach(function(choice) {
// create new button for each choice with bootstrap 
var choicesOptionsElement = document.createElement("button");
choicesOptionsElement.setAttribute("class", "btn btn-outline-primary mb-2");
choicesOptionsElement.setAttribute("value", choice);

choicesOptionsElement.textContent = choice;

// attach click event listener to each question choice
choicesOptionsElement.onclick = questionClick;

// display the choices option for each question on the page
choicesOptions.appendChild(choicesOptionsElement);
  });
}

function questionClick() {
// check if user guessed the question wrong
if (this.value !== questions[currentJavascriptQuestion].answer) {
// penalize time
time -= 10;
  
if (time < 0) {
time = 0;
}

// display new time on page
timerClock.textContent = time;
// if the question answered is wrong it will show red colour
feedbackElement.textContent = "Wrong!";
feedbackElement.style.color = "red";
feedbackElement.style.fontSize = "200%";
} else {
// if the question answered is right it will show green colour
feedbackElement.textContent = "Correct!";
feedbackElement.style.color = "green";
feedbackElement.style.fontSize = "200%";
 }
  
// flash right/wrong answer feedback
feedbackElement.setAttribute("class", "feedback");
setTimeout(function() {
 feedbackElement.setAttribute("class", "feedback hide");
}, 600);
  
// next question shown on the screen
currentJavascriptQuestion++;
  
// time checker
if (currentJavascriptQuestion === questions.length) {
 quizEnd();
} else {
getQuestion();
    }
  }
 
function quizEnd() {
// stop the timer
clearInterval(timerId);
  
// show the end screen
var endScreenElement = document.getElementById("end-screen");
endScreenElement.removeAttribute("class");
  
// show the user final score
var finalScoreElement = document.getElementById("final-score");
finalScoreElement.textContent = time;
  
// hide the JavaScript questions section
javascriptQuestions.setAttribute("class", "hide");
  }
  
function clockTick() {
// update time
time--;
timerClock.textContent = time;
  
// check if the user ran out of time
if (time <= 0) {
quizEnd();
}
}
  
function saveHighscore() {
// get value of input box
var initials = initialsElement.value.trim();
  
if (initials !== "") {
// get saved scores from localstorage, or if not any, set to empty array
var highscores =
JSON.parse(window.localStorage.getItem("highscores")) || [];
  
// format new score object for current user
var newScore = {
 score: time,
initials: initials
 };
  
// save scores to localstorage
highscores.push(newScore);
window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
// redirect the user to next page
window.location.href = "highscores.html";
}
}
  
function checkForEnter(event) {
// "13" represents the enter key
if (event.key === "Enter") {
 saveHighscore();
 }
}
  
// submit initials
submitButton.onclick = saveHighscore;
  
// start the JavaScript quiz
startButton.onclick = startQuiz;
  
initialsElement.onkeyup = checkForEnter;
