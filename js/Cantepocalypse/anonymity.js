﻿addLayer("an", {
    name: "Anonymity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AN", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        anonymity: new Decimal(0),
        anonymityToGet: new Decimal(0),
    }
    },
    automate() {
        if (hasMilestone("s", 17) && !inChallenge("fu", 11))
        {
            buyUpgrade("an", 11)
            buyUpgrade("an", 12)
            buyUpgrade("an", 13)
            buyUpgrade("an", 14)
            buyUpgrade("an", 15)
            buyUpgrade("an", 16)
            buyUpgrade("an", 17)
            buyUpgrade("an", 18)
            buyUpgrade("an", 19)
            buyUpgrade("an", 21)
            buyUpgrade("an", 22)
            buyUpgrade("an", 23)
        }
    },
    nodeStyle() {
    },
    tooltip: "Anonymity",
    branches: ["pr"],
    color: "#0c04c1",
    update(delta) {
        let onepersec = new Decimal(1)

        player.an.anonymityToGet = player.cp.replicantiPoints.div(250000).pow(0.25)
        if (hasUpgrade("an", 17)) player.an.anonymityToGet = player.an.anonymityToGet.mul(upgradeEffect("an", 17))
        player.an.anonymityToGet = player.an.anonymityToGet.mul(player.rt.repliTreesEffect)
        player.an.anonymityToGet = player.an.anonymityToGet.mul(buyableEffect("rg", 17))
        player.an.anonymityToGet = player.an.anonymityToGet.mul(buyableEffect("gs", 16))
        player.an.anonymityToGet = player.an.anonymityToGet.mul(player.oi.linkingPowerEffect[2])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(levelableEffect("pet", 1206)[0])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(levelableEffect("pet", 402)[1])
        if (hasMilestone("fa", 18)) player.an.anonymityToGet = player.an.anonymityToGet.mul(player.fa.milestoneEffect[7])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(buyableEffect("fu", 46))
        player.an.anonymityToGet = player.an.anonymityToGet.mul(player.le.punchcardsPassiveEffect[3])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(levelableEffect("pet", 405)[0])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(buyableEffect("st", 108))

        // ALWAYS AFTER
        if (inChallenge("fu", 11)) player.an.anonymityToGet = player.an.anonymityToGet.pow(0.2)
        if (inChallenge("fu", 11)) player.an.anonymityToGet = player.an.anonymityToGet.mul(player.fu.jocusEssenceEffect)

        if (hasMilestone("gs", 15)) player.an.anonymity = player.an.anonymity.add(player.an.anonymityToGet.mul(Decimal.mul(delta, 0.1)))
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cp"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return "<h2>Reset previous content except perks for anonymity.</h2><br><h3>(based on replicanti points)</h3>" },
            canClick() { return player.an.anonymityToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.an.anonymity = player.an.anonymity.add(player.an.anonymityToGet)

                player.ar.rankPoints = new Decimal(0)
                player.ar.tierPoints = new Decimal(0)
                player.ar.tetrPoints = new Decimal(0)
                player.cp.replicantiPoints = new Decimal(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: "400px", minHeight: "100px", borderRadius: "15px"},
        },
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
                } else {
                    return new Decimal(1)
                }
            },
            fillStyle: {backgroundColor: "#193ceb"},
            display() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
                } else {
                    return "<p style='color:red'>[HARDCAPPED]</p>"
                }
            },
        },
    },
    upgrades: {
        11:
        {
            title: "Anonymity Upgrade I",
            unlocked() { return true },
            description: "Multiplies replicanti mult by x1.5.",
            cost: new Decimal(2),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
        },
        12:
        {
            title: "Anonymity Upgrade II",
            unlocked() { return true },
            description: "Multiplies replicanti mult based on anonymity.",
            cost: new Decimal(5),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            effect() {
                return player.an.anonymity.plus(1).log10().pow(1.25).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:
        {
            title: "Anonymity Upgrade III",
            unlocked() { return true },
            description: "Gain 5% of rank points per second.",
            cost: new Decimal(16),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
        },
        14:
        {
            title: "Anonymity Upgrade IV",
            unlocked() { return true },
            description: "Extend the first and second softcap by x1,000.",
            cost: new Decimal(48),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
        },
        15:
        {
            title: "Anonymity Upgrade V",
            unlocked() { return true },
            description: "Gain 25% of rank points per second, and gain 5% of tier points per second.",
            cost: new Decimal(212),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: { width: '150px', height: '100px', }
        },
        16:
        {
            title: "Anonymity Upgrade VI",
            unlocked() { return true },
            description: "Boost perk points based on anonymity.",
            cost: new Decimal(666),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: { width: '125px', height: '100px', },
            effect() {
                return player.an.anonymity.pow(0.15).div(6).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        17:
        {
            title: "Anonymity Upgrade VII",
            unlocked() { return true },
            description: "Boost anonymity based on perk points.",
            cost: new Decimal(2345),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: { width: '125px', height: '100px', },
            effect() {
                return player.pr.perkPoints.pow(0.2).div(3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        18:
        {
            title: "Anonymity Upgrade VIII",
            unlocked() { return true },
            description: "Gain 100% of rank points per second, and gain 25% of tier points per second, and gain 5% of tetr points per second.",
            cost: new Decimal(15000),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: { width: '150px', height: '100px', },
        },
        19:
        {
            title: "Anonymity Upgrade IX",
            unlocked() { return true },
            description: "Extend first and second softcap based on anonymity.",
            cost: new Decimal(250000),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: { width: '125px', hesight: '100px', },
            effect() {
                return player.an.anonymity.pow(0.75).mul(6).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', },
        },
        21:
        {
            title: "Anonymity Upgrade X",
            unlocked() { return true },
            description: "Reduce repli-leaf time by 1.5s.",
            cost: new Decimal(4e6),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: { width: '125px', hesight: '100px', },
        },
        22:
        {
            title: "Anonymity Upgrade XI",
            unlocked() { return true },
            description: "Weaken second softcap based on second softcap start.",
            cost: new Decimal(6e7),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: { width: '150px', height: '100px', },
            effect() {
                return player.cp.replicantiSoftcap2Start.plus(1).log10().pow(0.65).mul(5).add(1)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        23:
        {
            title: "Anonymity Upgrade XII",
            unlocked() { return true },
            description: "Multiplies replicanti mult more based on anonymity.",
            cost: new Decimal(2e10),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            effect() {
                return player.an.anonymity.plus(1).log10().pow(0.8).mul(1.7).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', hesight: '100px', },
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.an.anonymity) + "</h3> anonymity." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.an.anonymityToGet) + "</h3> anonymity on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],,
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "replicantiBar"]]],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 14) }
})
