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

function createDeck() {
    const deck = [];
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

const deck = createDeck();
shuffleDeck(deck);
const firstCard = drawCard(deck);
console.log(firstCard);
console.log(deck.length); 