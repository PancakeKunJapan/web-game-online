import { createDeck, shuffleDeck, drawCard } from "./deck.js";

// ゲームの状態(このファイルの中でだけ書き換える)
export let playerHand = [];
export let dealerHand = [];
export let gameOver = false;
export let deck = [];

export function dealInitialHands() {
    playerHand.push(drawCard(deck));
    playerHand.push(drawCard(deck));
    dealerHand.push(drawCard(deck));
    dealerHand.push(drawCard(deck));
}

export function resetGame() {
    playerHand = [];
    dealerHand = [];
    gameOver = false;
    deck = createDeck();
    shuffleDeck(deck);
    dealInitialHands();
}

export function hit() {
    playerHand.push(drawCard(deck));
}

export function dealerPlay() {
    while (handScore(dealerHand) < 17) {
        dealerHand.push(drawCard(deck));
    }
}

export function setGameOver(value) {
    gameOver = value;
}

export function isBlackjack(hand) {
    return hand.length === 2 && handScore(hand) === 21;
}

export function cardValue(card) {
    if (card.rank === "A") {
        return 11;
    } else if (["J", "Q", "K"].includes(card.rank)) {
        return 10;
    } else {
        return parseInt(card.rank);
    }
}

export function handScore(hand) {
    let score = 0;
    for (const card of hand) {
        score += cardValue(card);
    }
    let aceCount = 0;
    for (const card of hand) {
        if (card.rank === "A") {
            aceCount++;
        }
    }
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

export function judgeWinner() {
    const playerScore = handScore(playerHand);
    const dealerScore = handScore(dealerHand);

    if (playerScore > 21) {
        return "YOU LOSE!!";
    } else if (dealerScore > 21) {
        return "YOU WIN!!";
    } else if (playerScore > dealerScore) {
        return "YOU WIN!!";
    } else if (dealerScore > playerScore) {
        return "YOU LOSE!!";
    } else {
        return "DRAW!!";
    }
}
