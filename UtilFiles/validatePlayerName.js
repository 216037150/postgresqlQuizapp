function validatePlayerName(playerName) {
    if (!playerName || playerName.length === 0 || playerName.match(/^\s+$/)){
        throw new Error('Please enter your name');
      } else if (playerName.match(/^\d+$/)) {
        throw new Error('Invalid input: Please enter a valid name, not a number.');
      } else if (playerName.match(/[^a-zA-Z0-9\s]/)) {
        throw new Error('Invalid input: Please do not use special characters.');
    }
  }
  export{ validatePlayerName }