addLayer("ip", {
    name: "Infinity Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        diceRuns: new Decimal(0),
        rocketFuelRuns: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)",
            "background-origin": "border-box",
            "border-color": "#7c5423",
        };
      },
    
    tooltip: "Infinity",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["ad"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Upgrade (1, 1)",
            unlocked() { return true },
            description: "Unlocks Antimatter Dimensions.",
            cost: new Decimal(1),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        12:
        {
            title: "Upgrade (1, 2)",
            unlocked() { return true },
            description: "Boosts antimatter based on completed dice runs.",
            cost: new Decimal(2),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ip.diceRuns.pow(1.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        13:
        {
            title: "Upgrade (1, 3)",
            unlocked() { return true },
            description: "Boosts 7th dimensions based on completed rocket fuel runs.",
            cost: new Decimal(2),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ip.rocketFuelRuns.pow(0.9).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },  
        14:
        {
            title: "Upgrade (1, 4)",
            unlocked() { return true },
            description: "Boosts factor power based on antimatter.",
            cost: new Decimal(6),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 


        21:
        {
            title: "Upgrade (2, 1)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts factor power and prestige points based on infinities.",
            cost: new Decimal(1),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinities.pow(1.4).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        22:
        {
            title: "Upgrade (2, 2)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts tree and leaf gain based on infinities.",
            cost: new Decimal(4),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinities.pow(1.2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        23:
        {
            title: "Upgrade (2, 3)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts mod and lines of code gain based on infinities.",
            cost: new Decimal(9),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinities.pow(1.15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        24:
        {
            title: "Upgrade (2, 4)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts golden grass gain based on infinities.",
            cost: new Decimal(16),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinities.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 


        31:
        {
            title: "Upgrade (3, 1)",
            unlocked() { return hasUpgrade("ip", 21) },
            description: "Unlocks more check back content.",
            cost: new Decimal(1),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
    },
    buyables: {
    },
    milestones: {
        11: {
            requirementDescription: "<h3>2 Infinities",
            effectDescription: "Keeps grass and prestige upgrades on all resets.",
            done() { return player.in.infinities.gte(2) },
            style: { width: '800px', "min-height": '75px' },
        },
        12: {
            requirementDescription: "<h3>3 Infinities",
            effectDescription: "Keep check back unlocked, gain 5% of prestige points per second.",
            done() { return player.in.infinities.gte(3) },
            style: { width: '800px', "min-height": '75px' },
        },
        13: {
            requirementDescription: "<h3>4 Infinities",
            effectDescription: "Gain 5% of grass per second.",
            done() { return player.in.infinities.gte(4) },
            style: { width: '800px', "min-height": '75px' },
        },
        14: {
            requirementDescription: "<h3>5 Infinities",
            effectDescription: "Keep antimatter progress on regular infinity resets.",
            done() { return player.in.infinities.gte(5) },
            style: { width: '800px', "min-height": '75px' },
        },
        15: {
            requirementDescription: "<h3>6 Infinities",
            effectDescription: "Keeps pent milestones on infinity.",
            done() { return player.in.infinities.gte(6) },
            style: { width: '800px', "min-height": '75px' },
        },
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                        ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                        ["row", [["upgrade", 31]]],
                ]

            },
            "Milestones": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.in.infinities) + "</h3> infinities." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["milestone", 11]]],
                        ["row", [["milestone", 12]]],
                        ["row", [["milestone", 13]]],
                        ["row", [["milestone", 14]]],
                        ["row", [["milestone", 15]]],
                ]

            },
        },
    }, 

    tabFormat: [                        ["raw-html", function () { return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You will gain <h3>" + format(player.in.infinityPointsToGet) + "</h3> on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity}
})
