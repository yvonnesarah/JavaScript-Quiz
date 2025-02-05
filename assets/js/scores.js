// Function to display the high scores from localStorage
function ShowHighscores() {
  // Get the high scores from localStorage and parse them from JSON format
  var highscores = JSON.parse(window.localStorage.getItem("highscores"));
  
  // Iterate through each score in the highscores array
  highscores.forEach(function(score) {
    // Create a new <li> element for each high score to display on the page
    var scoreli = document.createElement("li");
    // Set the text content of the <li> element to display the initials and score
    scoreli.textContent = score.initials + " - " + score.score;
    
    // Find the <ol> element where the scores will be listed
    var olElement = document.getElementById("highscores");
    // Append the newly created <li> element to the <ol>
    olElement.appendChild(scoreli);
  });
}

// Function to clear the high scores from localStorage
function clearHighscores() {
  // Remove the "highscores" item from localStorage
  window.localStorage.removeItem("highscores");
  // Reload the page to reflect the changes
  window.location.reload();
}

// Add an event listener to the "Clear Highscores" button, calling the clearHighscores function when clicked
document.getElementById("clear").onclick = clearHighscores;

// Run the ShowHighscores function when the page loads to display the saved high scores
ShowHighscores();
