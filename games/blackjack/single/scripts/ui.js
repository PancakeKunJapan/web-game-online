import { suitSymbols } from "./deck.js";
import {
    playerHand,
    dealerHand,
    handScore,
    isBlackjack,
    hit,
    dealerPlay,
    judgeWinner,
    resetGame,
    setGameOver,
} from "./game.js";

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((el) => {
        el.hidden = (el.id !== screenId);
    });
}

const dealerCardsEl = document.getElementById("dealer-cards");
const playerCardsEl = document.getElementById("player-cards");
const dealerScoreEl = document.getElementById("dealer-score");
const playerScoreEl = document.getElementById("player-score");
const hitButtonEl = document.getElementById("hit-button");
const standButtonEl = document.getElementById("stand-button");
const restartButtonEl = document.getElementById("restart-button");
const playerStatusEl = document.getElementById("player-status");
const dealerStatusEl = document.getElementById("dealer-status");
const winOrLoseEl = document.getElementById("win-or-lose");

function renderHand(hand, container, hideFirst) {
    container.innerHTML = "";
    hand.forEach((card, index) => {
        const cardEl = document.createElement("div");
        if (hideFirst && index === 0) {
            cardEl.textContent = "?";
        } else {
            cardEl.textContent = suitSymbols[card.suit] + card.rank;
        }
        container.appendChild(cardEl);
    });
}

function updateScores(revealDealer) {
    playerScoreEl.textContent = isBlackjack(playerHand)
        ? `${handScore(playerHand)} (ブラックジャック)`
        : handScore(playerHand);

    if (revealDealer) {
        dealerScoreEl.textContent = isBlackjack(dealerHand)
            ? `${handScore(dealerHand)} (ブラックジャック)`
            : handScore(dealerHand);
    } else {
        dealerScoreEl.textContent = handScore(dealerHand.slice(1));
    }
}

function endGame() {
    setGameOver(true);
    hitButtonEl.disabled = true;
    standButtonEl.disabled = true;
    winOrLoseEl.textContent = judgeWinner();
    restartButtonEl.hidden = false;
}

function startGame() {
    resetGame();

    restartButtonEl.hidden = true;
    hitButtonEl.disabled = false;
    standButtonEl.disabled = false;
    playerStatusEl.textContent = "";
    dealerStatusEl.textContent = "";
    winOrLoseEl.textContent = "";

    renderHand(playerHand, playerCardsEl);

    if (isBlackjack(playerHand)) {
        renderHand(dealerHand, dealerCardsEl, false);
        updateScores(true);
        endGame();
    } else {
        renderHand(dealerHand, dealerCardsEl, true);
        updateScores(false);
    }
}

document.getElementById("start-button").addEventListener("click", () => {
    showScreen("screen-mode-select");
});
document.getElementById("mode-select-return").addEventListener("click", () => {
    showScreen("screen-start");
});
document.getElementById("single-mode-button").addEventListener("click", () => {
    showScreen("screen-game");
});

hitButtonEl.addEventListener("click", () => {
    hit();
    renderHand(playerHand, playerCardsEl);
    updateScores(false);

    if (handScore(playerHand) > 21) {
        playerStatusEl.textContent = "バースト";
        endGame();
    }
});

standButtonEl.addEventListener("click", () => {
    dealerPlay();
    renderHand(dealerHand, dealerCardsEl, false);
    updateScores(true);

    if (handScore(dealerHand) > 21) {
        dealerStatusEl.textContent = "バースト";
    }

    endGame();
});

restartButtonEl.addEventListener("click", () => {
    startGame();
});

startGame();
