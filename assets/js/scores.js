function ShowHighscores() {
    // get scores from localstorage 
    var highscores = JSON.parse(window.localStorage.getItem("highscores"));
  
    highscores.forEach(function(score) {
      // create score li tag for each high score
      var scoreli = document.createElement("li");
      scoreli.textContent = score.initials + " - " + score.score;
  
      // display user scores on page
      var olElement = document.getElementById("highscores");
      olElement.appendChild(scoreli);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // run function when page loads
  ShowHighscores();