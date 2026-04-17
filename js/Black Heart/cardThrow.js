addLayer("cart", {
    name: "Card Throw", // This is optional, only used in a few places, If absent it just uses the layer id.
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        cardDeckTotal: [
            "SpadeA", "Spade2", "Spade3", "Spade4", "Spade5", "Spade6", "Spade7", "Spade8", "Spade9", "Spade10", "SpadeJ", "SpadeQ", "SpadeK",
            "ClubA", "Club2", "Club3", "Club4", "Club5", "Club6", "Club7", "Club8", "Club9", "Club10", "ClubJ", "ClubQ", "ClubK",
            "DiamondA", "Diamond2", "Diamond3", "Diamond4", "Diamond5", "Diamond6", "Diamond7", "Diamond8", "Diamond9", "Diamond10", "DiamondJ", "DiamondQ", "DiamondK",
            "HeartA", "Heart2", "Heart3", "Heart4", "Heart5", "Heart6", "Heart7", "Heart8", "Heart9", "Heart10", "HeartJ", "HeartQ", "HeartK",
        ],
        cardDeckCurrent: [],
        cardsToThrow: new Decimal(0), //max of 5

        cardTimer: new Decimal(0),
        cardTimerReq: new Decimal(2),

        cooldown: new Decimal(0),
    }},
    update(delta) {
        player.cart.cardTimerReq = new Decimal(2)

        if (player.cart.cardTimer.gte(player.cart.cardTimerReq)) {
            player.cart.cardTimer = new Decimal(0)
            player.cart.cardsToThrow = player.cart.cardsToThrow.add(1)
        }
        if (player.cart.cardsToThrow.lt(5)) {
            player.cart.cardTimer = player.cart.cardTimer.add(delta)
        }
    },
    infoboxes: {},
    layerShown() { return false }
})

function cardThrow(index, slot, target) {
    player.cart.cardsToThrow = new Decimal(0)
    console.log("cards are thrown")

    player.cart.cooldown = player.bh.characters[index].skills[slot].cooldown
}
