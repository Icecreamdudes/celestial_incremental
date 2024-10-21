addLayer("bi", {
    name: "Break Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BI", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        brokenInfinities: new Decimal(0),
        brokenInfinitiesToGet: new Decimal(0),

        autocrunchToggle: false,
        autocrunchInput: new Decimal(0),
        autocrunchAmount: new Decimal(0),

        autoreverseCrunchInput: new Decimal(0),
        autoreverseCrunchAmount: new Decimal(0),
        autoreverseCrunchToggle: false,
    }
    },
    automate() {
        if (hasUpgrade("bi", 109))
        {
            buyBuyable("bi", 11)
            buyBuyable("bi", 12)
            buyBuyable("bi", 13)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)",
            "background-origin": "border-box",
            "border-color": "#2B7F0A",
        };
      },
    
    tooltip: "Break Infinity",
    color: "#2B7F0A",
    update(delta) {
        let onepersec = new Decimal(1)


        player.bi.brokenInfinitiesToGet = player.in.infinities
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("bi", 12))
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("tad", 12))
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("om", 12))
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("p", 16))
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("rm", 33))

        if (hasUpgrade("bi", 25)) player.bi.brokenInfinities = player.bi.brokenInfinities.add(player.bi.brokenInfinitiesToGet.mul(Decimal.mul(0.04, delta)))

        if (player.bi.autocrunchInput.gte(1)) player.bi.autocrunchAmount = player.bi.autocrunchInput
        if (player.bi.autocrunchInput.lt(1)) player.bi.autocrunchAmount = new Decimal(1)

        if (player.bi.autoreverseCrunchInput.gte(1)) player.bi.autoreverseCrunchAmount = player.bi.autoreverseCrunchInput
        if (player.bi.autoreverseCrunchInput.lt(1)) player.bi.autoreverseCrunchAmount = new Decimal(1)

        if (player.in.infinityPointsToGet.gte(player.bi.autocrunchAmount) && player.bi.autocrunchToggle && player.points.gte(1e308))
        {
            if (inChallenge("tad", 11))
            {
                if (player.bi.brokenInfinities.gt(player.tad.shatteredInfinitiesToGet) && player.po.hex && !player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(0))
                {
                    player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(player.tad.shatteredInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.shatteredInfinitiesToGet)
                }
                if (player.bi.brokenInfinities.gt(player.tad.disfiguredInfinitiesToGet) && !player.po.hex && !player.po.dice && player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(1))
                {
                    player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(player.tad.disfiguredInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.disfiguredInfinitiesToGet)
                }
                if (player.bi.brokenInfinities.gt(player.tad.corruptedInfinitiesToGet) && !player.po.hex && player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(2))
                {
                    player.tad.corruptedInfinities = player.tad.corruptedInfinities.add(player.tad.corruptedInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.corruptedInfinitiesToGet)
                }
            }
            if (hasUpgrade("bi", 14))
            {
                    if (player.po.dice) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
                    if (player.po.rocketFuel) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
                    if (player.po.hex) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
            }
            if (!hasMiestone("ip", 21)) 
            {
                player.tab = "bigc"
            } else if (hasMilestone("ip", 21))
            {
                layers.bigc.crunch()
            }
        }
        
        if (player.ta.negativeInfinityPointsToGet.gte(player.bi.autoreverseCrunchAmount) && player.bi.autoreverseCrunchToggle && player.ad.antimatter.gte(1e308))
        {
            layers.revc.reverseCrunch()
            player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)
        }
    },
    breakInfinities()
    {
        player.in.infinities = new Decimal(0)
    },
    branches: ["ta", "ip"],
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
        11: {
            title() { return "<h2>Break Your Infinities" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                layers.bi.breakInfinities()
                player.bi.brokenInfinities = player.bi.brokenInfinities.add(player.bi.brokenInfinitiesToGet)
            },
            style: { width: '300px', "min-height": '120px' },
        },
        12: {
            title() { return "<h2>Break Infinity" },
            canClick() { return true },
            unlocked() { return !player.in.breakInfinity },
            onClick() {
                player.in.breakInfinity = true
            },
            style: { width: '300px', "min-height": '120px' },
        },
        13: {
            title() { return "<h2>Fix Infinity" },
            canClick() { return true },
            unlocked() { return player.in.breakInfinity },
            onClick() {
                player.in.breakInfinity = false
            },
            style: { width: '300px', "min-height": '120px' },
        },
        14: {
            title() { return "<h2>Autocrunch Toggle: On" },
            canClick() { return true },
            unlocked() { return player.bi.autocrunchToggle },
            onClick() {
                player.bi.autocrunchToggle = false
            },
            style: { width: '300px', "min-height": '120px' },
        },
        15: {
            title() { return "<h2>Autocrunch Toggle: Off" },
            canClick() { return true },
            unlocked() { return !player.bi.autocrunchToggle },
            onClick() {
                player.bi.autocrunchToggle = true
            },
            style: { width: '300px', "min-height": '120px' },
        },
        16: {
            title() { return "<h2>Auto Reverse Crunch Toggle: On" },
            canClick() { return true },
            unlocked() { return player.bi.autoreverseCrunchToggle },
            onClick() {
                player.bi.autoreverseCrunchToggle = false
            },
            style: { width: '300px', "min-height": '120px' },
        },
        17: {
            title() { return "<h2>Auto Reverse Crunch Toggle: Off" },
            canClick() { return true },
            unlocked() { return !player.bi.autoreverseCrunchToggle },
            onClick() {
                player.bi.autoreverseCrunchToggle = true
            },
            style: { width: '300px', "min-height": '120px' },
        },
    },
    bars: {
    },
    upgrades: {
        //Infinity Points
        11:
        {
            title: "BI IP Upgrade I",
            unlocked() { return true },
            description: "Points are raised to the ^1.1.",
            cost: new Decimal(6e8),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        12:
        {
            title: "BI IP Upgrade II",
            unlocked() { return true },
            description: "Multiply all hex points based on highest rocket fuel and dice points.",
            cost: new Decimal(2e9),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ta.highestDicePoints.pow(0.2).mul(0.05).add(1).mul(player.ta.highestRocketFuel.pow(0.3).mul(0.065).add(1)).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        13:
        {
            title: "BI IP Upgrade III",
            unlocked() { return true },
            description: "Autobuy negative infinity factors.",
            cost: new Decimal(6e9),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        14:
        {
            title: "BI IP Upgrade IV",
            unlocked() { return true },
            description: "Unlock OTF Mastery.",
            cost: new Decimal(2e10),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        15:
        {
            title: "BI IP Upgrade V",
            unlocked() { return true },
            description: "Unlock OTF Mastery Buyables.",
            cost: new Decimal(5e10),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        16:
        {
            title: "BI IP Upgrade VI",
            unlocked() { return true },
            description: "Unlock more alternate infinity buyables.",
            cost: new Decimal(2e11),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        17:
        {
            title: "BI IP Upgrade VII",
            unlocked() { return true },
            description: "Total hex runs boost code experience gain.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ip.hexRuns.mul(1.02).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '125px', height: '100px', }
        },
        18:
        {
            title: "BI IP Upgrade VIII",
            unlocked() { return true },
            description: "Unlock Infinity Dimensions.",
            cost: new Decimal(3e13),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        19:
        {
            title: "BI IP Upgrade IX",
            unlocked() { return true },
            description: "Unlock Infinity Power Buyables. (In infinity dimensions layer)",
            cost: new Decimal(2e14),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        21:
        {
            title: "BI IP Upgrade X",
            unlocked() { return true },
            description: "Slightly weaken the post-1e300 AM softcap.",
            cost: new Decimal(1e15),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        22:
        {
            title: "BI IP Upgrade XI",
            unlocked() { return true },
            description: "Points boost the antimatter effect even more.",
            cost: new Decimal(3e16),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        23:
        {
            title: "BI IP Upgrade XII",
            unlocked() { return true },
            description: "Infinity points boost itself.",
            cost: new Decimal(1e18),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinityPoints.pow(0.2).mul(0.002).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24:
        {
            title: "BI IP Upgrade XII",
            unlocked() { return true },
            description: "...",
            cost: new Decimal(1e22),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        25:
        {
            title: "BI IP Upgrade XIII",
            unlocked() { return true },
            description: "Raise check back effect to the ^5. (only ^2 in dice), and gain 4% of B.I per second.",
            cost: new Decimal(1e24),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            style: { width: '150px', height: '100px', }
        },
        26:
        {
            title: "BI IP Upgrade XIV",
            unlocked() { return true },
            description: "Unlock galaxy dust.",
            cost: new Decimal(1e26),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        27:
        {
            title: "BI IP Upgrade XV",
            unlocked() { return true },
            description: "Unlock a new OTF, realm mods.",
            cost: new Decimal(1e29),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        28:
        {
            title: "BI IP Upgrade XVI",
            unlocked() { return player.ca.unlockedCante },
            description: "Unlock the ??? (Check Cante).",
            cost: new Decimal(1e38),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        //Negative Infinity Points
        101:
        {
            title: "BI NIP Upgrade I",
            unlocked() { return true },
            description: "Boost infinity points based on infinities.",
            cost: new Decimal(1e7),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            effect() {
                return player.in.infinities.pow(0.2).mul(0.05).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        102:
        {
            title: "BI NIP Upgrade II",
            unlocked() { return true },
            description: "Boost negative infinity points based on points.",
            cost: new Decimal(3e7),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            effect() {
                return player.points.div(1e308).plus(1).log10().pow(0.425).div(35).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        103:
        {
            title: "BI NIP Upgrade III",
            unlocked() { return true },
            description: "Autobuy infinity factors.",
            cost: new Decimal(1e8),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
        104:
        {
            title: "BI NIP Upgrade IV",
            unlocked() { return true },
            description: "Autobuy negative infinity point and OTF synergizer buyables.",
            cost: new Decimal(3e8),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '150px', height: '100px', }
        },
        105:
        {
            title: "BI NIP Upgrade V",
            unlocked() { return true },
            description: "Buying antimatter dimensions and tickspeed don't spend antimatter.",
            cost: new Decimal(8e8),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '125px', height: '100px', }
        },
        106:
        {
            title: "BI NIP Upgrade VI",
            unlocked() { return true },
            description: "Unlock more universe 1 upgrades. (universe 1, then upgrades if you forgot)",
            cost: new Decimal(4e9),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '150px', height: '100px', }
        },
        107:
        {
            title: "BI NIP Upgrade VII",
            unlocked() { return true },
            description: "Boost steel gain based on highest rocket fuel.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            effect() {
                return player.ta.highestRocketFuel.pow(0.1).mul(0.015).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        108:
        {
            title: "BI NIP Upgrade VIII",
            unlocked() { return true },
            description: "Raise antimatter effect to the ^1.6.",
            cost: new Decimal(2e11),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '125px', height: '100px', }
        },
        109:
        {
            title: "BI NIP Upgrade IX",
            unlocked() { return true },
            description: "Autobuy mastery, break infinity and infinity point buyables.",
            cost: new Decimal(5e12),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '150px', height: '100px', }
        },
        111:
        {
            title: "BI NIP Upgrade X",
            unlocked() { return true },
            description: "Improve the infinity point formula.",
            cost: new Decimal(3e13),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '125px', height: '100px', }
        },
        112:
        {
            title: "BI NIP Upgrade XI",
            unlocked() { return true },
            description: "Dimension boosts and antimatter galaxies don't reset antimatter dimensions.",
            cost: new Decimal(2e14),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '150px', height: '100px', }
        },
        113:
        {
            title: "BI NIP Upgrade XII",
            unlocked() { return true },
            description: "Raise the antimatter effect to the ^3.",
            cost: new Decimal(1e16),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '125px', height: '100px', }
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.bi.brokenInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Infinity Multiplier"
            },
            display() {
                return "which are multiplying infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Broken Infinities"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 1.5
                if (player.buyMax == false && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.bi.brokenInfinities = player.bi.brokenInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.bi.brokenInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.bi.brokenInfinities = player.bi.brokenInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(300) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.bi.brokenInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Broken Infinity Multiplier"
            },
            display() {
                return "which are multiplying broken infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Broken Infinities"
            },
            buy() {
                let base = new Decimal(300)
                let growth = 1.6
                if (player.buyMax == false && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.bi.brokenInfinities = player.bi.brokenInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.bi.brokenInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.bi.brokenInfinities = player.bi.brokenInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.65).pow(x || getBuyableAmount(this.layer, this.id)).mul(700) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).pow(1.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.bi.brokenInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Dimension Multiplier"
            },
            display() {
                return "which are multiplying all antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Broken Infinities"
            },
            buy() {
                let base = new Decimal(700)
                let growth = 1.65
                if (player.buyMax == false && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.bi.brokenInfinities = player.bi.brokenInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.bi.brokenInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.bi.brokenInfinities = player.bi.brokenInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Broken Infinities": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.bi.brokenInfinities) + "</h3> broken infinities. (+<h3>" + format(player.bi.brokenInfinitiesToGet) + "</h3>)"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
                ]

            },
            "Break Infinity Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.in.unlockedBreak },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.in.infinityPoints) + "</h3> infinity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18]]],
                    ["row", [["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27], ["upgrade", 28]]],
                    ["blank", "25px"],
                    ["row", [["upgrade", 101], ["upgrade", 102], ["upgrade", 103], ["upgrade", 104], ["upgrade", 105], ["upgrade", 106], ["upgrade", 107], ["upgrade", 108]]],
                    ["row", [["upgrade", 109], ["upgrade", 111], ["upgrade", 112], ["upgrade", 113]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return !player.ta.unlockedReverseBreak ? "Wanna break infinity for antimatter? Check pet evolutions." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                ]

            },
            "Autocruncher(s)": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasMilestone("ip", 26) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Autocrunch amount: " + formatWhole(player.bi.autocrunchAmount) + " infinity points on reset." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["text-input", "autocrunchInput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                    ["blank", "25px"],
                    ["row", [["clickable", 14], ["clickable", 15]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Autocrunch amount: " + formatWhole(player.bi.autoreverseCrunchAmount) + " negative infinity points on reset." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["text-input", "autoreverseCrunchInput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                    ["blank", "25px"],
                    ["row", [["clickable", 16], ["clickable", 17]]],
                ]

            },
        },
    }, 

    tabFormat: [
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.in.infinities) + "</h3> infinities." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.in.infinitiesToGet) + "</h3> infinities on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("ta", 21)}
})