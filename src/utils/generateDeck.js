const emojiSet = ["🐶", "🐱", "🦊", "🐻", "🐼", "🦁", "🐸", "🐵", "🐔", "🦄", "🐙", "🐢"];

export function generateDeck(pairCount) {
    const selected = emojiSet.slice(0, pairCount);
    const deck = [...selected, ...selected]
        .map((symbol) => ({ symbol }))
        .sort(() => Math.random() - 0.5);
    return deck;
}
