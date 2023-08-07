// Initialize scores and currentPlayer
let scores = {
    A: 0,
    B: 0
  };
  let currentPlayer = null;
  let gameEnded = false;

  // Function to randomly select the player to start the game
  function selectPlayer() {
    const players = ['A', 'B'];
    currentPlayer = players[Math.floor(Math.random() * players.length)];
    document.getElementById('currentPlayer').textContent = 'Current Player: Player ' + currentPlayer;
    document.getElementById('rollBtnA').disabled = currentPlayer === 'B';
    document.getElementById('rollBtnB').disabled = currentPlayer === 'A';
  }

  // Function to roll the dice and update scores
  function rollDice() {
    if (gameEnded) {
      return;
    }
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    scores[currentPlayer] += diceValue;
    document.getElementById('scoresA').textContent = 'Score: ' + scores.A;
    document.getElementById('scoresB').textContent = 'Score: ' + scores.B;

    // Update dice image based on diceValue
    document.getElementById('dice').src = 'dice-' + diceValue + '.png';

    // Check if any player has reached 30 score
    if (scores[currentPlayer] >= 30) {
      document.getElementById('currentPlayer').textContent = 'Player ' + currentPlayer + ' wins!';
      document.getElementById('rollBtnA').disabled = true;
      document.getElementById('rollBtnB').disabled = true;
      gameEnded = true;
      addConfetti();
    } else {
      // Switch to the other player
      currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
      document.getElementById('currentPlayer').textContent = 'Current Player: Player ' + currentPlayer;
      document.getElementById('rollBtnA').disabled = currentPlayer === 'B';
      document.getElementById('rollBtnB').disabled = currentPlayer === 'A';
    }
  }

    // Function to add confetti elements
    function addConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        const numConfetti = 100;
  
        for (let i = 0; i < numConfetti; i++) {
          const confetti = document.createElement('div');
          confetti.classList.add('confetti');
          confetti.style.left = Math.random() * 100 + '%';
          confetti.style.animationDelay = Math.random() * 2 + 's';
          confettiContainer.appendChild(confetti);
        }
  
        // Remove confetti after 5 seconds
        setTimeout(() => {
          confettiContainer.innerHTML = '';
        }, 5000);
      }
  
  // Function to reset the game
  function resetGame() {
    scores = {
      A: 0,
      B: 0
    };
    currentPlayer = null;
    gameEnded = false;
    document.getElementById('currentPlayer').textContent = '';
    document.getElementById('scoresA').textContent = '';
    document.getElementById('scoresB').textContent = '';
    document.getElementById('dice').src = 'dice-1.png';
    document.getElementById('rollBtnA').disabled = true;
    document.getElementById('rollBtnB').disabled = true;
    // Clear confetti from previous game
document.getElementById('confetti-container').innerHTML = '';

// Start a new game by selecting the first player
selectPlayer();
  }

  // Event listeners for roll and reset buttons
  document.getElementById('rollBtnA').addEventListener('click', rollDice);
  document.getElementById('rollBtnB').addEventListener('click', rollDice);
  document.getElementById('resetBtn').addEventListener('click', resetGame);

  // Start the game by selecting the first player
  selectPlayer();