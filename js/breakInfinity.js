addLayer("bi", {
    name: "Break Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BI", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        brokenInfinities: new Decimal(0),
        brokenInfinitiesToGet: new Decimal(0),

        // IAC: Infinity Autocruch
        IACtoggle: false,
        IACinput: new Decimal(0),
        IACamount: new Decimal(1),
        IACtype: false, // False: Amount ; True: Time
        IACtime: new Decimal(0),

        // NAC: Negative Infinity Autocrunch
        NACinput: new Decimal(0),
        NACamount: new Decimal(1),
        NACtoggle: false,
        NACtype: false, // False: Amount ; True: Time
        NACtime: new Decimal(0),
    }},
    automate() {
        if (hasUpgrade("bi", 109)) {
            buyBuyable("bi", 11)
            buyBuyable("bi", 12)
            buyBuyable("bi", 13)
        }
        if (hasMilestone("s", 17)) {
            buyUpgrade("bi", 11)
            buyUpgrade("bi", 12)
            buyUpgrade("bi", 13)
            buyUpgrade("bi", 14)
            buyUpgrade("bi", 15)
            buyUpgrade("bi", 16)
            buyUpgrade("bi", 17)
            buyUpgrade("bi", 18)
            buyUpgrade("bi", 19)
            buyUpgrade("bi", 21)
            buyUpgrade("bi", 22)
            buyUpgrade("bi", 23)
            buyUpgrade("bi", 24)
            buyUpgrade("bi", 25)
            buyUpgrade("bi", 26)
            buyUpgrade("bi", 27)
            buyUpgrade("bi", 28)

            buyUpgrade("bi", 101)
            buyUpgrade("bi", 102)
            buyUpgrade("bi", 103)
            buyUpgrade("bi", 104)
            buyUpgrade("bi", 105)
            buyUpgrade("bi", 106)
            buyUpgrade("bi", 107)
            buyUpgrade("bi", 108)
            buyUpgrade("bi", 109)
            buyUpgrade("bi", 111)
            buyUpgrade("bi", 112)
            buyUpgrade("bi", 113)
            buyUpgrade("bi", 114)
            buyUpgrade("bi", 115)
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
    branches: ["ta"],
    update(delta) {
        let onepersec = new Decimal(1)

        // Broken Infinities Calculations
        player.bi.brokenInfinitiesToGet = player.in.infinities
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("bi", 12))
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("tad", 12))
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("om", 12))
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("p", 16))
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(buyableEffect("rm", 33))
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(levelableEffect("pet", 208)[2])
        player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(levelableEffect("pet", 1101)[1])
        if (hasMilestone("fa", 13)) player.bi.brokenInfinitiesToGet = player.bi.brokenInfinitiesToGet.mul(player.fa.milestoneEffect[2])

        if (hasUpgrade("bi", 25)) player.bi.brokenInfinities = player.bi.brokenInfinities.add(player.bi.brokenInfinitiesToGet.mul(Decimal.mul(0.04, delta)))

        // Set Autocrunch Values
        if (player.bi.IACinput.gte(1) && !player.bi.IACtype) player.bi.IACamount = player.bi.IACinput
        if (player.bi.IACinput.lt(1) && !player.bi.IACtype) player.bi.IACamount = new Decimal(1)
        if (player.bi.IACinput.gte(0) && player.bi.IACtype) player.bi.IACamount = player.bi.IACinput
        if (player.bi.IACinput.lt(0) && player.bi.IACtype) player.bi.IACamount = new Decimal(1)

        // Set Negative Autocrunch Values
        if (player.bi.NACinput.gte(1) && !player.bi.NACtype) player.bi.NACamount = player.bi.NACinput
        if (player.bi.NACinput.lt(1) && !player.bi.NACtype) player.bi.NACamount = new Decimal(1)
        if (player.bi.NACinput.gte(0) && player.bi.NACtype) player.bi.NACamount = player.bi.NACinput
        if (player.bi.NACinput.lt(0) && player.bi.NACtype) player.bi.NACamount = new Decimal(1)

        // Autocrunch Functionality
        if (player.in.infinityPointsToGet.gte(player.bi.IACamount) && player.bi.IACtoggle && !player.bi.IACtype && player.points.gte(1e308)) {
            if (inChallenge("tad", 11)) {
                if (player.bi.brokenInfinities.gt(player.tad.shatteredInfinitiesToGet) && player.po.hex && !player.po.dice && !player.po.rocketFuel && player.tad.currentConversion.eq(0)) {
                    player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(player.tad.shatteredInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.shatteredInfinitiesToGet)
                }
                if (player.bi.brokenInfinities.gt(player.tad.disfiguredInfinitiesToGet) && !player.po.hex && !player.po.dice && player.po.rocketFuel && player.tad.currentConversion.eq(1)) {
                    player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(player.tad.disfiguredInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.disfiguredInfinitiesToGet)
                }
                if (player.bi.brokenInfinities.gt(player.tad.corruptedInfinitiesToGet) && !player.po.hex && player.po.dice && !player.po.rocketFuel && player.tad.currentConversion.eq(2)) {
                    player.tad.corruptedInfinities = player.tad.corruptedInfinities.add(player.tad.corruptedInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.corruptedInfinitiesToGet)
                }
            }
            if (hasUpgrade("bi", 14)) {
                    if (player.po.dice) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
                    if (player.po.rocketFuel) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
                    if (player.po.hex) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
            }
            if (!hasMilestone("ip", 21)) {
                player.tab = "bigc"
            } else {
                layers.bigc.crunch()
            }
        }

        if (player.bi.IACtoggle && player.bi.IACtype) {
            player.bi.IACtime = player.bi.IACtime.add(onepersec.mul(delta));
            if (player.bi.IACtime.gte(player.bi.IACamount) && player.points.gte(1e308)) {
                player.bi.IACtime = new Decimal(0)
                if (inChallenge("tad", 11)) {
                    if (player.bi.brokenInfinities.gt(player.tad.shatteredInfinitiesToGet) && player.po.hex && !player.po.dice && !player.po.rocketFuel && player.tad.currentConversion.eq(0)) {
                        player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(player.tad.shatteredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.shatteredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.disfiguredInfinitiesToGet) && !player.po.hex && !player.po.dice && player.po.rocketFuel && player.tad.currentConversion.eq(1)) {
                        player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(player.tad.disfiguredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.disfiguredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.corruptedInfinitiesToGet) && !player.po.hex && player.po.dice && !player.po.rocketFuel && player.tad.currentConversion.eq(2)) {
                        player.tad.corruptedInfinities = player.tad.corruptedInfinities.add(player.tad.corruptedInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.corruptedInfinitiesToGet)
                    }
                }
                if (hasUpgrade("bi", 14)) {
                        if (player.po.dice) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
                        if (player.po.rocketFuel) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
                        if (player.po.hex) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
                }
                if (!hasMilestone("ip", 21)) {
                    player.tab = "bigc"
                } else {
                    layers.bigc.crunch()
                }
            }
        }

        // Negative Autocrunch Functionality
        if (player.ta.negativeInfinityPointsToGet.gte(player.bi.NACamount) && player.bi.NACtoggle && !player.bi.NACtype && player.ad.antimatter.gte(1e308)) {
            player.ad.revCrunchPause = new Decimal(6)
            player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)
        }

        if (player.bi.NACtoggle && player.bi.NACtype) {
            player.bi.NACtime = player.bi.NACtime.add(onepersec.mul(delta));
            if (player.bi.NACtime.gte(player.bi.NACamount) && player.ad.antimatter.gte(1e308)) {
                player.bi.NACtime = new Decimal(0)
                player.ad.revCrunchPause = new Decimal(6)
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)
            }
        }
    },
    breakInfinities() {
        player.in.infinities = new Decimal(0)
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "<h2>Break Your Infinities" },
            canClick() { return player.bi.brokenInfinitiesToGet.gt(0) },
            unlocked() { return true },
            onClick() {
                layers.bi.breakInfinities()
                player.bi.brokenInfinities = player.bi.brokenInfinities.add(player.bi.brokenInfinitiesToGet)
            },
            style: { width: '300px', "min-height": '120px', borderRadius: '15px' },
        },
        12: {
            title() { return "<h2>Break Infinity" },
            canClick() { return true },
            unlocked() { return !player.in.breakInfinity },
            onClick() {
                player.in.breakInfinity = true
            },
            style: { width: '300px', "min-height": '120px', borderRadius: '15px' },
        },
        13: {
            title() { return "<h2>Fix Infinity" },
            canClick() { return true },
            unlocked() { return player.in.breakInfinity },
            onClick() {
                player.in.breakInfinity = false
            },
            style: { width: '300px', "min-height": '120px', borderRadius: '15px' },
        },
        14: {
            title() { return "<h2>Autocrunch Toggle: On" },
            canClick() { return true },
            unlocked() { return player.bi.IACtoggle },
            onClick() {
                player.bi.IACtoggle = false
            },
            style: { width: '300px', "min-height": '80px', borderRadius: '0px 0px 15px 15px' },
        },
        15: {
            title() { return "<h2>Autocrunch Toggle: Off" },
            canClick() { return true },
            unlocked() { return !player.bi.IACtoggle },
            onClick() {
                player.bi.IACtoggle = true
            },
            style: { width: '300px', "min-height": '80px', borderRadius: '0px 0px 15px 15px' },
        },
        16: {
            title() { return "<h2>Auto Reverse Crunch Toggle: On" },
            canClick() { return true },
            unlocked() { return player.bi.NACtoggle },
            onClick() {
                player.bi.NACtoggle = false
            },
            style: { width: '300px', "min-height": '80px', borderRadius: '0px 0px 15px 15px' },
        },
        17: {
            title() { return "<h2>Auto Reverse Crunch Toggle: Off" },
            canClick() { return true },
            unlocked() { return !player.bi.NACtoggle },
            onClick() {
                player.bi.NACtoggle = true
            },
            style: { width: '300px', "min-height": '80px', borderRadius: '0px 0px 15px 15px' },
        },
        18: {
            title() { return "Amount" },
            canClick() { return player.bi.IACtype },
            unlocked() { return true },
            onClick() {
                player.bi.IACtype = false
            },
            style: { width: '150px', "min-height": '40px', borderRadius: '15px 0px 0px 0px' },
        },
        19: {
            title() { return "Time" },
            canClick() { return !player.bi.IACtype },
            unlocked() { return true },
            onClick() {
                player.bi.IACtype = true
            },
            style: { width: '150px', "min-height": '40px', borderRadius: '0px 15px 0px 0px' },
        },
        21: {
            title() { return "Amount" },
            canClick() { return player.bi.NACtype },
            unlocked() { return true },
            onClick() {
                player.bi.NACtype = false
            },
            style: { width: '150px', minHeight: '40px', borderRadius: '15px 0px 0px 0px' },
        },
        22: {
            title() { return "Time" },
            canClick() { return !player.bi.NACtype },
            unlocked() { return true },
            onClick() {
                player.bi.NACtype = true
            },
            style: { width: '150px', minHeight: '40px', borderRadius: '0px 15px 0px 0px' },
        },
    },
    bars: {},
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
            description: "Total hex runs boost pollinator gain.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ip.hexRuns.add(1).log10().add(1)
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
            title: "BI IP Upgrade XIII",
            unlocked() { return true },
            description() { return !hasUpgrade("bi", 24) ? "..." : "Unlocks Cante and new pet evolutions." },
            cost: new Decimal(1e22),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        25:
        {
            title: "BI IP Upgrade XIV",
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
            title: "BI IP Upgrade XV",
            unlocked() { return true },
            description: "Unlock galaxy dust.",
            cost: new Decimal(1e26),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        27:
        {
            title: "BI IP Upgrade XVI",
            unlocked() { return true },
            description: "Unlock a new OTF, realm mods.",
            cost: new Decimal(1e29),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        28:
        {
            title: "BI IP Upgrade XVII",
            unlocked() { return player.ca.unlockedCante },
            description() { return !hasUpgrade("bi", 24) ? "Unlock ??? (Check ???)." : !hasUpgrade("bi", 28) ? "Unlock ??? (Check Cante)." : "Unlock Cante's Trials (Check Cante)." },
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
            description: "Autobuy mastery, break infinity, and infinity point buyables.",
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
        114: {
            title: "BI NIP Upgrade XIII",
            unlocked() { return true },
            description: "Improve the infinity point formula again.",
            cost: new Decimal(1e19),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '125px', height: '100px', }
        },
        115: {
            title: "BI NIP Upgrade XIV",
            unlocked() { return hasMilestone("s", 12) },
            description: "Unlock a new pollinator.",
            cost: new Decimal(1e22),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            style: { width: '125px', height: '100px', }
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 32)) },
            unlocked() { return true },
            canAfford() { return player.bi.brokenInfinities.gte(this.cost()) },
            title() {
                return "Infinity Multiplier"
            },
            display() {
                return "which are multiplying infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Broken Infinities"
            },
            buy(mult) {
                let base = new Decimal(100)
                let growth = 1.5
                if (mult != true && !hasUpgrade("bi", 109))
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
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 32)) },
            unlocked() { return true },
            canAfford() { return player.bi.brokenInfinities.gte(this.cost()) },
            title() {
                return "Broken Infinity Multiplier"
            },
            display() {
                return "which are multiplying broken infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Broken Infinities"
            },
            buy(mult) {
                let base = new Decimal(300)
                let growth = 1.6
                if (mult != true && !hasUpgrade("bi", 109))
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
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).pow(1.25).add(1).pow(buyableEffect("cs", 32)) },
            unlocked() { return true },
            canAfford() { return player.bi.brokenInfinities.gte(this.cost()) },
            title() {
                return "Dimension Multiplier"
            },
            display() {
                return "which are multiplying all antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Broken Infinities"
            },
            buy(mult) {
                let base = new Decimal(700)
                let growth = 1.65
                if (mult != true && !hasUpgrade("bi", 109))
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
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.bi.brokenInfinities) + "</h3> broken infinities. (+<h3>" + format(player.bi.brokenInfinitiesToGet) + "</h3>)"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                ]

            },
            "Break Infinity Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
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
                    ["row", [["upgrade", 109], ["upgrade", 111], ["upgrade", 112], ["upgrade", 113], ["upgrade", 114], ["upgrade", 115]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return !player.ta.unlockedReverseBreak ? "Wanna break infinity for antimatter? Check pet evolutions." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                ]

            },
            "Autocruncher(s)": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasMilestone("ip", 27) || (player.s.highestSingularityPoints.gt(0) && player.ev.evolutionsUnlocked[3]) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return !player.bi.IACtype ? "Autocrunch amount: " + formatWhole(player.bi.IACamount) + " infinity points on reset." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.bi.IACtype ? "Autocrunch time: " + formatTime(player.bi.IACtime) + "/" + formatTime(player.bi.IACamount) + " until reset." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["text-input", "IACinput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                    ["blank", "25px"],
                    ["row", [["clickable", 18], ["clickable", 19]]],
                    ["row", [["clickable", 14], ["clickable", 15]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return !player.bi.NACtype ? "Autocrunch amount: " + formatWhole(player.bi.NACamount) + " negative infinity points on reset." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.bi.NACtype ? "Autocrunch time: " + formatTime(player.bi.NACtime) + "/" + formatTime(player.bi.NACamount) + " until reset." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["text-input", "NACinput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                    ["blank", "25px"],
                    ["row", [["clickable", 21], ["clickable", 22]]],
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
    layerShown() { return (player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("ta", 21)) || hasMilestone("s", 19)}
})
