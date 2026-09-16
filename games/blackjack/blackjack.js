function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((el) => {
        el.hidden = (el.id !== screenId);
    });
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

const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function startGame() {
    playerHand = [];
    dealerHand = [];
    gameOver = false;

    document.getElementById("restart-button").hidden = true;
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    document.getElementById("player-status").textContent = "";
    document.getElementById("dealer-status").textContent = "";
    document.getElementById("win-or-lose").textContent = "";

    deck = createDeck();
    shuffleDeck(deck);
    dealInitialHands(deck);
    renderHand(playerHand, playerCardsEl);

    if (isBlackjack(playerHand)) {
        renderHand(dealerHand, dealerCardsEl, false);
        updateScores(true);
        gameOver = true;
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        judgeWinner();
    } else {
        renderHand(dealerHand, dealerCardsEl, true);
        updateScores(false);
    }
}

function createDeck() {
    let deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ suit: suit, rank: rank });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * ( i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function drawCard(deck) {
    const card = deck.pop();
    return card;
}

let playerHand = []
let dealerHand = []
let gameOver = false;

function dealInitialHands(deck) {
    playerHand.push(drawCard(deck));
    playerHand.push(drawCard(deck));
    dealerHand.push(drawCard(deck));
    dealerHand.push(drawCard(deck));
}
function isBlackjack(hand) {
    return hand.length === 2 && handScore(hand) === 21;
}

function cardValue(card) {
    if (card.rank === "A") {
        return 11;
    } else if (["J", "Q", "K"].includes(card.rank)) {
        return 10;
    } else {
        return parseInt(card.rank);
    }
}

function handScore(hand) {
    let score = 0;
    for (const card of hand) {
        score += cardValue(card);
    }
    let aceCount = 0;
    for (const card of hand) {
        if (card.rank === "A") {
            aceCount ++;
        }
    }
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

const dealerCardsEl = document.getElementById("dealer-cards");
const playerCardsEl = document.getElementById("player-cards");
const suitSymbols = {
    Spades: "♠",
    Hearts: "♥",
    Diamonds: "♦",
    Clubs: "♣",
};

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

const dealerScoreEl = document.getElementById("dealer-score");
const playerScoreEl = document.getElementById("player-score");

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

document.getElementById("hit-button").addEventListener("click", () => {
    playerHand.push(drawCard(deck));
    renderHand(playerHand, playerCardsEl);
    updateScores(false);

    if (handScore(playerHand) > 21) {
        gameOver = true;
        document.getElementById("stand-button").disabled = true;
        document.getElementById("hit-button").disabled = true;
        document.getElementById("player-status").textContent = `バースト`;
        judgeWinner();
    }
})

function dealerPlay(deck) {
    while (handScore(dealerHand) < 17) {
        dealerHand.push(drawCard(deck));
    }
    if (handScore(dealerHand) > 21) {
        gameOver = true;
        document.getElementById("stand-button").disabled = true;
        document.getElementById("hit-button").disabled = true;
        document.getElementById("dealer-status").textContent = `バースト`;
    }
    judgeWinner();
}

document.getElementById("stand-button").addEventListener("click", () => {
    dealerPlay(deck);
    renderHand(dealerHand, dealerCardsEl, false);
    updateScores(true);
    gameOver = true;
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    judgeWinner();
});

function judgeWinner() {
    const playerScore = handScore(playerHand);
    const dealerScore = handScore(dealerHand);
    const winOrLoseEl = document.getElementById("win-or-lose");
    if (playerScore > 21) {
        winOrLoseEl.textContent = `YOU LOSE!!`
    } else if (dealerScore > 21) {
        winOrLoseEl.textContent = `YOU WIN!!`
    } else if (playerScore > dealerScore) {
        winOrLoseEl.textContent = `YOU WIN!!`
    } else if (dealerScore > playerScore) {
        winOrLoseEl.textContent = `YOU LOSE!!`
    } else {
        winOrLoseEl.textContent = `DRAW!!`
    }

    document.getElementById("restart-button").hidden = false;
}

let deck = createDeck();

document.getElementById("restart-button").addEventListener("click", () => {
    startGame();
});

startGame();