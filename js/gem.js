addLayer("gem", {
    name: "Gems", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💎", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        money: new Decimal(0),
        mg: new Decimal(0), // Money Gain
        mcc: new Decimal(0), // Money Current Cooldown
        mmc: new Decimal(60), // Money Max Cooldown

        gems: new Decimal(0),
        gps: new Decimal(0), // Gems Per Second

        cca: [], // Common Collectible Amount
        uca: [], // Uncommon Collectible Amount

        ccl: [], // Common Collectible Levels
        ucl: [], // Uncommon Collectible Levels
        
    }},
    automate() {},
    nodeStyle() {
        return {
            borderColor: "#780af3",
            backgroundImage: "linear-gradient(0deg, #ab66f9, #c18dfa)",
            backgroundOrigin: "border-box",
            color: "white"
        };
    },
    tooltip: "Ordinal",
    color: "#ab66f9",
    branches: ["cb"],
    update(delta) {
        let onepersec = new Decimal(1)

        // ORDINAL GAIN
        player.gem.gps = new Decimal(0)
        player.gem.gems = player.gem.gems.add(player.gem.gps.mul(delta))

    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', minHeight: '50px' },
        },
    },
    levelables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["blank", "10px"],
        ["clickable", 1],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && (player.po.gem /* || inChallenge("ip", 17) */) }
})
