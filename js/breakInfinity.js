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
            buyUpgrade("bi", 116)
            buyUpgrade("bi", 117)
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
                if (player.bi.brokenInfinities.gt(player.tad.shatteredInfinitiesToGet) && (player.po.hex || hasUpgrade("s", 18)) && !player.po.dice && !player.po.rocketFuel && player.tad.currentConversion.eq(0)) {
                    player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(player.tad.shatteredInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.shatteredInfinitiesToGet)
                }
                if (player.bi.brokenInfinities.gt(player.tad.disfiguredInfinitiesToGet) && (!player.po.hex || hasUpgrade("s", 18)) && !player.po.dice && player.po.rocketFuel && player.tad.currentConversion.eq(1)) {
                    player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(player.tad.disfiguredInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.disfiguredInfinitiesToGet)
                }
                if (player.bi.brokenInfinities.gt(player.tad.corruptedInfinitiesToGet) && (!player.po.hex || hasUpgrade("s", 18)) && player.po.dice && !player.po.rocketFuel && player.tad.currentConversion.eq(2)) {
                    player.tad.corruptedInfinities = player.tad.corruptedInfinities.add(player.tad.corruptedInfinitiesToGet)
                    player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.corruptedInfinitiesToGet)
                }
            }
            if (hasUpgrade("bi", 14)) {
                    if (player.po.dice) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
                    if (player.po.rocketFuel) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
                    if (player.po.hex || hasUpgrade("s", 18)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
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
                    if (player.bi.brokenInfinities.gt(player.tad.shatteredInfinitiesToGet) && (player.po.hex || hasUpgrade("s", 18)) && !player.po.dice && !player.po.rocketFuel && player.tad.currentConversion.eq(0)) {
                        player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(player.tad.shatteredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.shatteredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.disfiguredInfinitiesToGet) && (!player.po.hex || hasUpgrade("s", 18)) && !player.po.dice && player.po.rocketFuel && player.tad.currentConversion.eq(1)) {
                        player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(player.tad.disfiguredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.disfiguredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.corruptedInfinitiesToGet) && (!player.po.hex || hasUpgrade("s", 18)) && player.po.dice && !player.po.rocketFuel && player.tad.currentConversion.eq(2)) {
                        player.tad.corruptedInfinities = player.tad.corruptedInfinities.add(player.tad.corruptedInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.corruptedInfinitiesToGet)
                    }
                }
                if (hasUpgrade("bi", 14)) {
                        if (player.po.dice) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
                        if (player.po.rocketFuel) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
                        if (player.po.hex || hasUpgrade("s", 18)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
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
            title() {return player.bi.IACtoggle ? "Auto-Crunch: ON" : "Auto-Crunch: OFF"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.bi.IACtoggle) {
                    player.bi.IACtoggle = false
                } else {
                    player.bi.IACtoggle = true
                }
            },
            style() {
                let look = {width: "400px", minHeight: "60px", fontSize: "18px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (player.bi.IACtoggle) {look.backgroundColor = "#ffbf00"} else {look.backgroundColor = "#b28500"}
                return look
            },
        },
        15: {
            title() { return "Amount" },
            canClick() { return player.bi.IACtype },
            unlocked() { return true },
            onClick() {
                player.bi.IACtype = false
            },
            style() {
                let look = {width: "200px", minHeight: "40px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (player.bi.IACtype) {look.backgroundColor = "#ffbf00"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        16: {
            title() { return "Time" },
            canClick() { return !player.bi.IACtype },
            unlocked() { return true },
            onClick() {
                player.bi.IACtype = true
            },
            style() {
                let look = {width: "200px", minHeight: "40px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (!player.bi.IACtype) {look.backgroundColor = "#ffbf00"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        17: {
            title() {return player.bi.NACtoggle ? "Auto-Rev-Crunch: ON" : "Auto-Rev-Crunch: OFF"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.bi.NACtoggle) {
                    player.bi.NACtoggle = false
                } else {
                    player.bi.NACtoggle = true
                }
            },
            style() {
                let look = {width: "400px", minHeight: "60px", fontSize: "18px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (player.bi.NACtoggle) {look.backgroundColor = "#b2d8d8"} else {look.backgroundColor = "#7c9797"}
                return look
            },
        },
        18: {
            title() { return "Amount" },
            canClick() { return player.bi.NACtype },
            unlocked() { return true },
            onClick() {
                player.bi.NACtype = false
            },
            style() {
                let look = {width: "200px", minHeight: "40px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (player.bi.NACtype) {look.backgroundColor = "#b2d8d8"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        19: {
            title() { return "Time" },
            canClick() { return !player.bi.NACtype },
            unlocked() { return true },
            onClick() {
                player.bi.NACtype = true
            },
            style() {
                let look = {width: "200px", minHeight: "40px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (!player.bi.NACtype) {look.backgroundColor = "#b2d8d8"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
    },
    bars: {},
    upgrades: {
        //Infinity Points
        11: {
            title: "BI IP Upgrade I",
            unlocked() { return true },
            description: "Points are raised to the ^1.1.",
            cost: new Decimal(6e8),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "BI IP Upgrade II",
            unlocked() { return true },
            description: "Unlock more graces in hex of blessings.",
            cost: new Decimal(2e9),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "BI IP Upgrade III",
            unlocked() { return true },
            description: "Unlock new hexed jinx's in hex of curses.",
            cost: new Decimal(6e9),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "BI IP Upgrade IV",
            unlocked() { return true },
            description: "Unlock OTF Mastery.",
            cost: new Decimal(2e10),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "BI IP Upgrade V",
            unlocked() { return true },
            description: "Unlock more alternate infinity buyables.",
            cost: new Decimal(2e11),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        17: {
            title: "BI IP Upgrade VI",
            unlocked() { return true },
            description: "Total hex runs boost pollinator gain.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ip.hexRuns.add(1).log(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        18: {
            title: "BI IP Upgrade VII",
            unlocked() { return true },
            description: "Unlock Infinity Dimensions.",
            cost: new Decimal(3e13),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        19: {
            title: "BI IP Upgrade VIII",
            unlocked() { return true },
            description: "Unlock Infinity Power Buyables. (In infinity dimensions layer)",
            cost: new Decimal(2e14),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: "BI IP Upgrade IX",
            unlocked() { return true },
            description: "Slightly weaken the post-1e300 AM softcap.",
            cost: new Decimal(1e15),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        22: {
            title: "BI IP Upgrade X",
            unlocked() { return true },
            description: "Points boost the antimatter effect even more.",
            cost: new Decimal(3e16),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        23: {
            title: "BI IP Upgrade XI",
            unlocked() { return true },
            description: "Infinity points boost themselves.",
            cost: new Decimal(1e18),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinityPoints.pow(0.2).mul(0.002).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        24: {
            title: "BI IP Upgrade XII",
            unlocked() { return true },
            description() { return !hasUpgrade("bi", 24) ? "..." : "Unlocks Cante and new pet evolutions." },
            cost: new Decimal(1e22),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        25: {
            title: "BI IP Upgrade XIII",
            unlocked() { return true },
            description: "Raise check back effect by ^5. (only ^2 in dice), and gain 4% BI/s.",
            cost: new Decimal(1e24),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        26: {
            title: "BI IP Upgrade XIV",
            unlocked() { return true },
            description: "Unlock galaxy dust.",
            cost: new Decimal(1e26),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        27: {
            title: "BI IP Upgrade XV",
            unlocked() { return true },
            description: "Unlock hex of realms, and new hex of power mights.",
            cost: new Decimal(1e32),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        28: {
            title: "BI IP Upgrade XVI",
            unlocked() { return player.ca.unlockedCante },
            description() { return !hasUpgrade("bi", 24) ? "Unlock ??? (Check ???)." : !hasUpgrade("bi", 28) ? "Unlock ??? (Check Cante)." : "Unlock Cante's Trials (Check Cante)." },
            cost: new Decimal(1e38),
            currencyLocation() { return player.in },
            currencyDisplayName: "IP",
            currencyInternalName: "infinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        //Negative Infinity Points
        101: {
            title: "BI NIP Upgrade I",
            unlocked() { return true },
            description: "Boost IP based on infinities.",
            cost: new Decimal(1e7),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            effect() {
                return player.in.infinities.pow(0.2).mul(0.05).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        102: {
            title: "BI NIP Upgrade II",
            unlocked() { return true },
            description: "Boost NIP based on points.",
            cost: new Decimal(3e7),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            effect() {
                return player.points.div(1e308).plus(1).log(1e308).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        103: {
            title: "BI NIP Upgrade III",
            unlocked() { return true },
            description: "Unlock miracles in hex of blessings.",
            cost: new Decimal(1e8),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        104: {
            title: "BI NIP Upgrade IV",
            unlocked() { return true },
            description: "Autobuy negative infinity point and OTF synergizer buyables.",
            cost: new Decimal(3e8),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        105: {
            title: "BI NIP Upgrade V",
            unlocked() { return true },
            description: "Buying antimatter dimensions and tickspeed don't spend antimatter.",
            cost: new Decimal(8e8),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        106: {
            title: "BI NIP Upgrade VI",
            unlocked() { return true },
            description: "Unlock more origin upgrades. (Universe 1 if you forgot)",
            cost: new Decimal(4e9),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        107: {
            title: "BI NIP Upgrade VII",
            unlocked() { return true },
            description: "Boost steel gain based on highest rocket fuel.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            effect() {
                return player.ta.highestRocketFuel.pow(0.1).mul(0.015).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        108: {
            title: "BI NIP Upgrade VIII",
            unlocked() { return true },
            description: "Raise antimatter effect to the ^1.6.",
            cost: new Decimal(2e11),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        109: {
            title: "BI NIP Upgrade IX",
            unlocked() { return true },
            description: "Autobuy mastery, break infinity, and infinity point buyables.",
            cost: new Decimal(5e12),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        111: {
            title: "BI NIP Upgrade X",
            unlocked() { return true },
            description: "Improve the infinity point formula.",
            cost: new Decimal(3e13),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        112: {
            title: "BI NIP Upgrade XI",
            unlocked() { return true },
            description: "Dimension boosts and antimatter galaxies don't reset antimatter dimensions.",
            cost: new Decimal(2e14),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        113: {
            title: "BI NIP Upgrade XII",
            unlocked() { return true },
            description: "Unlock new mod buyables.",
            cost: new Decimal(1e15),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        114: {
            title: "BI NIP Upgrade XIII",
            unlocked() { return true },
            description: "Raise the antimatter effect to the ^3.",
            cost: new Decimal(3e16),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        115: {
            title: "BI NIP Upgrade XIV",
            unlocked() { return true },
            description: "Improve the infinity point formula again.",
            cost: new Decimal(1e18),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        116: {
            title: "BI NIP Upgrade XV",
            unlocked() { return hasMilestone("s", 12) },
            description: "Unlock a new pollinator.",
            cost: new Decimal(1e20),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
        117: {
            title: "BI NIP Upgrade XVI",
            unlocked() {return hasMilestone("s", 12) && hasUpgrade("ma", 21)},
            description: "Triple replicanti mult, and replicanti effects are buffed.",
            cost: new Decimal(1e300),
            currencyLocation() { return player.ta },
            currencyDisplayName: "NIP",
            currencyInternalName: "negativeInfinityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #596c6c", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.bi.brokenInfinities},
            pay(amt) { player.bi.brokenInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity Multiplier"
            },
            display() {
                return "which are multiplying infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Broken Infinities"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("bi", 109) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 109)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: "275px", height: "150px"},
        },
        12: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.bi.brokenInfinities},
            pay(amt) { player.bi.brokenInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Broken Infinity Multiplier"
            },
            display() {
                return "which are multiplying broken infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Broken Infinities"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("bi", 109) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 109)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: "275px", height: "150px"},
        },
        13: {
            costBase() { return new Decimal(700) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.bi.brokenInfinities},
            pay(amt) { player.bi.brokenInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).pow(1.25).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dimension Multiplier"
            },
            display() {
                return "which are multiplying all antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Broken Infinities"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("bi", 109) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 109)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: "275px", height: "150px"},
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Broken Infinities": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]], {maxWidth: "900px"}],
                ]

            },
            "Break Infinity Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.in.unlockedBreak || hasMilestone("s", 11) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.in.infinityPoints) + "</h3> infinity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [
                        ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18], ["upgrade", 19],
                        ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27], ["upgrade", 28],
                    ], {maxWidth: "1000px", padding: "5px 0", backgroundColor: "#332600", border: "3px solid #7f5f00", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["style-row", [
                        ["upgrade", 101], ["upgrade", 102], ["upgrade", 103], ["upgrade", 104], ["upgrade", 105], ["upgrade", 106], ["upgrade", 107], ["upgrade", 108],
                        ["upgrade", 109], ["upgrade", 111], ["upgrade", 112], ["upgrade", 113], ["upgrade", 114], ["upgrade", 115], ["upgrade", 116], ["upgrade", 117],
                    ], {maxWidth: "1000px", padding: "5px 0", backgroundColor: "#232b2b", border: "3px solid #596c6c", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return !player.ta.unlockedReverseBreak ? "Wanna break infinity for antimatter? Check pet evolutions." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Autocruncher(s)": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasMilestone("ip", 27) || (player.s.highestSingularityPoints.gt(0) && player.ev.evolutionsUnlocked[3]) },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["row", [
                                    ["raw-html", () => { return format(player.in.infinityPoints) + " IP" }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                    ["raw-html", () => { return "(+" + format(player.in.infinityPointsToGet) + ")"}, () => {
                                        let look = {fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}
                                        if (player.points.gt("1e308") || !player.in.breakInfinity) {look.color = "white"} else {look.color = "gray"} 
                                        return look
                                    }],
                                ]],
                            ], {width: "400px", height: "30px", backgroundColor: "#7f5f00"}],
                            ["style-column", [
                                ["raw-html", () => {return player.bi.IACtype ? "Auto-Crunch Time" : "Auto-Crunch Amount"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return player.bi.IACtype ? formatTime(player.bi.IACtime) + "/" + formatTime(player.bi.IACamount) + " until reset." : formatWhole(player.bi.IACamount) + " IP on reset."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "400px", height: "70px"}],
                            ["text-input", "IACinput", {width: "350px", height: "50px", backgroundColor: "#332600", color: "white", fontSize: "32px", textAlign: "left", border: "0px", padding: "0px 25px"}],
                            ["style-column", [
                                ["row", [["clickable", 15], ["clickable", 16]]],
                                ["clickable", 14],
                            ], {width: "400px", height: "100px"}],
                        ], {width: "400px", height: "250px", backgroundColor: "#664c00"}],
                        ["style-column", [], {width: "3px", height: "250px", backgroundColor: "#ccc"}],
                        ["style-column", [
                            ["style-column", [
                                ["row", [
                                    ["raw-html", () => { return format(player.ta.negativeInfinityPoints) + " NIP"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                    ["raw-html", () => { return "(+" + format(player.ta.negativeInfinityPointsToGet) + ")"}, () => {
                                        let look = {fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}
                                        if (player.ad.antimatter.gt("1e308") || !player.ta.unlockedReverseBreak) {look.color = "white"} else {look.color = "gray"}
                                        return look
                                    }],
                                ]],
                            ], {width: "400px", height: "30px", backgroundColor: "#596c6c"}],
                            ["style-column", [
                                ["raw-html", () => {return player.bi.NACtype ? "Auto-Rev-Crunch Time" : "Auto-Rev-Crunch Amount"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["raw-html", () => {return player.bi.NACtype ? formatTime(player.bi.NACtime) + "/" + formatTime(player.bi.NACamount) + " until reset." : formatWhole(player.bi.NACamount) + " NIP on reset."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "400px", height: "70px"}],
                            ["text-input", "NACinput", {width: "350px", height: "50px", backgroundColor: "#232b2b", color: "white", fontSize: "32px", textAlign: "left", border: "0px", padding: "0px 25px"}],
                            ["style-column", [
                                ["row", [["clickable", 18], ["clickable", 19]]],
                                ["clickable", 17],
                            ], {width: "400px", height: "100px"}],
                        ], {width: "400px", height: "250px", backgroundColor: "#475656"}],
                    ], {width: "803px", height: "250px", border: "3px solid #ccc"}],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.bi.brokenInfinities) + "</h3> broken infinities"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => { return "(+" + format(player.bi.brokenInfinitiesToGet) + ")"}, () => {
                let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                player.bi.brokenInfinitiesToGet.gt(0) ? look.color = "white" : look.color = "gray"
                return look
            }],
        ]],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.in.infinities) + "</h3> infinities." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ["raw-html", () => { return player.in.infinitiesToGet.gt(1) ? "(+" + format(player.in.infinitiesToGet) + ")" : "" }, {color: "white", fontSize: "16px", fontFamily: "monospace", marginLeft: "8px"}],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return (player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("ta", 21)) || hasMilestone("s", 19)}
})
