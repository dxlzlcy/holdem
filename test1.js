function rankValue(card) {
    const rank = card[0];
    if (rank === 'A') return 14;
    if (rank === 'K') return 13;
    if (rank === 'Q') return 12;
    if (rank === 'J') return 11;
    if (rank === 'T') return 10;
    return parseInt(rank);
}

function suitValue(card) {
    return card[1];
}

function isFlush(cards) {
    const suit = suitValue(cards[0]);
    return cards.every(card => suitValue(card) === suit);
}

function isStraight(cards) {
    for (let i = 0; i < 4; i++) {
        if (rankValue(cards[i]) - 1 !== rankValue(cards[i + 1])) {
            return false;
        }
    }
    return true;
}

function evaluateHand(cards) {
    cards = sortCards(cards);
    const flush = isFlush(cards);
    const straight = isStraight(cards);
    const ranked = rankCards(cards);

    if (straight && flush) return { score: 9, type: "Straight Flush", cards };
    if (ranked.four) return { score: 8, type: "Four of a Kind", cards };
    if (ranked.three && ranked.pairs.length >= 1) return { score: 7, type: "Full House", cards };
    if (flush) return { score: 6, type: "Flush", cards };
    if (straight) return { score: 5, type: "Straight", cards };
    if (ranked.three) return { score: 4, type: "Three of a Kind", cards };
    if (ranked.pairs.length >= 2) return { score: 3, type: "Two Pairs", cards };
    if (ranked.pairs.length === 1) return { score: 2, type: "One Pair", cards };
    return { score: 1, type: "High Card", cards: cards.slice(0, 5) };
}

function sortCards(cards) {
    return cards.sort((a, b) => rankValue(b) - rankValue(a));
}

function rankCards(cards) {
    const counts = {};
    cards.forEach(card => {
        const rank = card[0];
        counts[rank] = (counts[rank] || 0) + 1;
    });
    const frequencies = Object.values(counts);
    return {
        four: frequencies.includes(4),
        three: frequencies.includes(3),
        pairs: frequencies.filter(count => count === 2)
    };
}

function bestHand(cards) {
    const combinations = generateCombinations(cards, 5);
    let best = { score: 0, cards: [], type: "" };
    combinations.forEach(comb => {
        const result = evaluateHand(comb);
        if (result.score > best.score) {
            best = result;
        }
    });
    return best;
}

function generateCombinations(sourceArray, comboLength) {
    const sourceLength = sourceArray.length;
    if (comboLength > sourceLength) return [];
    const combos = []; // Array to hold the combinations
    const makeNextCombos = (workingCombo, currentIndex, remainingCount) => {
        const oneElemArray = [sourceArray[currentIndex]];
        if (remainingCount === 1) {
            combos.push(workingCombo.concat(oneElemArray));
        } else {
            for (let i = currentIndex + 1; i <= sourceLength - remainingCount; i++) {
                makeNextCombos(workingCombo.concat(oneElemArray), i, remainingCount - 1);
            }
        }
    };
    for (let i = 0; i <= sourceLength - comboLength; i++) {
        makeNextCombos([], i, comboLength);
    }
    return combos;
}

function determineWinner() {
    const myCards = ['7-S', '4-C'];
    const player2Cards = ['2-D', '5-S'];
    const publicCards = ['10-H', '7-D', 'Q-S', 'Q-C', 'J-H'];

    const allMyCards = myCards.concat(publicCards);
    const allPlayer2Cards = player2Cards.concat(publicCards);

    const myBestHand = bestHand(allMyCards);
    const player2BestHand = bestHand(allPlayer2Cards);

    console.log("My best hand:", myBestHand);
    console.log("Player 2's best hand:", player2BestHand);

    if (myBestHand.score > player2BestHand.score) {
        console.log("I win!");
    } else if (myBestHand.score < player2BestHand.score) {
        console.log("Player 2 wins!");
    } else {
        console.log("It's a tie!");
    }
}

determineWinner();
