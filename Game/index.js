(() => {
  let userChoice = "";
  let userNumber = null;
  let computerNumber = null;
  let userScore = 0;
  let computerScore = 0;

  const evenButton = document.getElementById("even");
  const oddButton = document.getElementById("odd");
  const startButton = document.getElementById("start");
  const numberBtn = document.querySelectorAll(".number");
  const resultDiv = document.getElementById("result");
  const nextButton = document.getElementById("next");
  const userDisplay = document.querySelector(".user__display");
  const computerDisplay = document.querySelector(".computer__display");
  const userScoreDisplay = document.getElementById("user-score");
  const computerScoreDisplay = document.getElementById("computer-score");
  const quitButton = document.getElementById("quit");
  const playAgainButton = document.getElementById("play-again");
  const gameOverDiv = document.getElementById("game-over");

  evenButton.addEventListener("click", () => {
    userChoice = "even";
    evenButton.classList.add("disabled");
    oddButton.classList.remove("disabled");
  });

  oddButton.addEventListener("click", () => {
    userChoice = "odd";
    oddButton.classList.add("disabled");
    evenButton.classList.remove("disabled");
  });

  //user display based on the button clicked
  numberBtn.forEach((button) => {
    button.addEventListener("click", (event) => {
      userNumber = parseInt(event.target.textContent);
      document
        .querySelectorAll(".user-image")
        .forEach((img) => (img.style.display = "none"));
      document.getElementById("user-img" + userNumber).style.display = "block";
    });
  });

  //Function to update and display the score
  function updateAndDisplayScore(result, total) {
    if (result === userChoice) {
      resultDiv.textContent =
        total + " is " + result.toUpperCase() + " You win!";
      userScore++;
      userDisplay.classList.add("win-background");
      computerDisplay.classList.remove("win-background");
    } else {
      resultDiv.textContent =
        total + " is " + result.toUpperCase() + " Computer wins!";
      computerScore++;
      computerDisplay.classList.add("win-background");
      userDisplay.classList.remove("win-background");
    }
    updateDisplay();
  }

  //Function to update the display
  function updateDisplay() {
    document.getElementById("score").style.display = "block";
    nextButton.style.display = "inline-block";
    quitButton.style.display = "inline-block";
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;
  }

  startButton.addEventListener("click", () => {
    if (!userChoice) {
      alert("Please choose Even or Odd.");
      return;
    }
    if (userNumber === null) {
      alert("Please select a number between 1 and 5.");
      return;
    }
    // To generate a random number for the computer
    computerNumber = Math.floor(Math.random() * 5) + 1;
    document
      .querySelectorAll(".computer-image")
      .forEach((img) => (img.style.display = "none"));
    document.getElementById("computer-img" + computerNumber).style.display =
      "block";
    // Calculate the total and check it's even or odd
    const total = userNumber + computerNumber;
    const result = total % 2 == 0 ? "even" : "odd";
    updateAndDisplayScore(result, total);
  });

  //Reset the choices and number
  nextButton.addEventListener("click", () => {
    userChoice = "";
    userNumber = null;
    computerNumber = null;
    resultDiv.innerHTML = "";

    evenButton.classList.remove("disabled");
    oddButton.classList.remove("disabled");
    userDisplay.classList.remove("win-background");
    computerDisplay.classList.remove("win-background");

    document
      .querySelectorAll(".user-image, .computer-image")
      .forEach((img) => (img.style.display = "none"));
  });

  //Quit the game and display end message and play again button
  quitButton.addEventListener("click", () => {
    if (userScore > computerScore) {
      alert("You won the game!");
    } else if (userScore < computerScore) {
      alert("Computer won the game!");
    } else {
      alert("It's a tie");
    }

    if (userScore > computerScore) {
      gameOverDiv.innerHTML = `<h1>You won the game!</h1>`;
    } else if (userScore < computerScore) {
      gameOverDiv.innerHTML = `<h1>Computer won the game! </h1>`;
    } else {
      gameOverDiv.innerHTML = `<h1>It's a tie! </h1>`;
    }

    playAgainButton.style.display = "inline-block";
    document.querySelector(".game-wrapper").style.display = "none";
  });

  playAgainButton.addEventListener("click", () => {
    location.reload();
  });
})();
