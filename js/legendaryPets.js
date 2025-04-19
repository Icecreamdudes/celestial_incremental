addLayer("leg", {
    name: "leg", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "LEG", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        legendaryGemsToGetMin: new Decimal(0),
        legendaryGemsToGetMax: new Decimal(0),

        legendaryGemTimer: new Decimal(0),
        legendaryGemTimerMax: new Decimal(86400),

        gemEffects: [new Decimal(1), new Decimal(1), new Decimal(1)], // Red, Purple, Green
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Legendary Pets",
    color: "#fe9400",
    update(delta) {
        let onepersec = new Decimal(1)

        player.leg.legendaryGemsToGetMin = player.cb.XPBoost.pow(0.2).div(2).floor()
        player.leg.legendaryGemsToGetMax = player.cb.XPBoost.pow(0.25).div(2).floor()

        player.leg.legendaryGemTimerMax = new Decimal(86400)
        player.leg.legendaryGemTimer = player.leg.legendaryGemTimer.sub(onepersec.mul(delta))

        player.leg.gemEffects[0] = player.cb.legendaryPetGems[0].pow(0.1).div(5).add(1)
        player.leg.gemEffects[1] = player.cb.legendaryPetGems[1].pow(0.07).div(10).add(1)
        player.leg.gemEffects[2] = player.cb.legendaryPetGems[2].pow(0.05).div(7).add(1)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        11: {
            title() { return player.leg.legendaryGemTimer.gt(0) ? "<h3>Check back in <br>" + formatTime(player.leg.legendaryGemTimer) + "." : "Reset for legendary gems."},
            canClick() { return player.leg.legendaryGemTimer.lt(0) },
            unlocked() { return true },
            //tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 0.5%" : ""},
            onClick() {
                const redGemGain = randomInt(player.leg.legendaryGemsToGetMin, player.leg.legendaryGemsToGetMax)
                const purpleGemGain = randomInt(player.leg.legendaryGemsToGetMin, player.leg.legendaryGemsToGetMax)
                const greenGemGain = randomInt(player.leg.legendaryGemsToGetMin, player.leg.legendaryGemsToGetMax)
    
                // Add the gems to the player's inventory
                player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(redGemGain)
                player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(purpleGemGain)
                player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(greenGemGain)

                player.leg.legendaryGemTimer = player.leg.legendaryGemTimerMax

                layers.leg.gemReset();

            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
    },
    gemReset()
    {
        player.cb.xp = new Decimal(0)
        player.cb.totalxp = new Decimal(0)
        player.cb.level = new Decimal(0)
        player.cb.highestLevel = new Decimal(0)
        player.cb.XPBoost = new Decimal(1)
        //reset xp, levels, highest level, xp boost
    },
    bars: {
    },
    upgrades: {

    },
    buyables: {
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Gems": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#fe9400',} },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.legendaryPetGems[0]) + "</h3> red legendary gems, which boost XP gain by x" + format(player.leg.gemEffects[0]) + "." }, { "color": "red", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.legendaryPetGems[1]) + "</h3> purple legendary gems, which boost pet point gain by x" + format(player.leg.gemEffects[1]) + "." }, { "color": "purple", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.legendaryPetGems[2]) + "</h3> green legendary gems, which boost XPBoost gain by x" + format(player.leg.gemEffects[2]) + "." }, { "color": "green", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.leg.legendaryGemsToGetMin) + " to " + formatWhole(player.leg.legendaryGemsToGetMax) + "</h3> of each gem on reset. (based on XPBoost)" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
    ]
            },
            "Pets": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#fe9400',} },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return "COMING SOON" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
    ]
            },
        },
    },

    tabFormat: [
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
function randomInt(min, max) {
    min = Math.ceil(min.toNumber());
    max = Math.floor(max.toNumber());
    return Math.floor(Math.random() * (max - min + 1)) + min;
}