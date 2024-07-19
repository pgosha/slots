document.addEventListener('DOMContentLoaded', () => {
    const reels = document.querySelectorAll('.reel');
    const spinButton = document.getElementById('spinButton');
    const balanceDisplay = document.getElementById('balance');
    const messageDisplay = document.getElementById('message');
    const betSizeInput = document.getElementById('betSize');
    const symbols = ['🍒', '🍋', '🍊', '🔔', '💎'];
    let balance = 100;
    let betSize = 10; 

    function updateBalance(amount) {
        balance += amount;
        balanceDisplay.textContent = `Balance: $${balance}`;
    }

    function getRandomSymbol() {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function updateSpinButtonText() {
        spinButton.textContent = `Spin ($${betSize})`;
    }

    function spin() {
        if (balance < betSize) {
            messageDisplay.textContent = "Not enough balance to spin!";
            return;
        }
        updateBalance(-betSize);
        messageDisplay.textContent = "Spinning...";
        spinButton.disabled = true;
        // Simulate spinning animation
        let spins = 0;
        const spinInterval = setInterval(() => {
            reels.forEach(reel => {
                reel.textContent = getRandomSymbol();
            });
            spins++;
            if (spins >= 20) {
                clearInterval(spinInterval);
                checkWin();
                spinButton.disabled = false;
            }
        }, 100);
    }

    function checkWin() {
        const results = Array.from(reels).map(reel => reel.textContent);
        const uniqueSymbols = new Set(results);
        if (uniqueSymbols.size === 1) {
            // All symbols match
            const winAmount = betSize * 10;
            updateBalance(winAmount);
            messageDisplay.textContent = `Jackpot! You won $${winAmount}!`;
        } else if (uniqueSymbols.size === 2) {
            // Two symbols match
            const winAmount = betSize * 2;
            updateBalance(winAmount);
            messageDisplay.textContent = `You won $${winAmount}!`;
        } else {
            messageDisplay.textContent = "Try again!";
        }
    }

    spinButton.addEventListener('click', spin);

    // Add event listener for bet size changes
    betSizeInput.addEventListener('change', () => {
        betSize = parseInt(betSizeInput.value);
        if (isNaN(betSize) || betSize < 1) {
            betSize = 1;
            betSizeInput.value = 1;
        }
        updateSpinButtonText();
        messageDisplay.textContent = `Bet size set to $${betSize}`;
    });

    // Initialize spin button text
    updateSpinButtonText();
});