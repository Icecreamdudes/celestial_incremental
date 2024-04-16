addLayer("p", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        prestigePoints: new Decimal(0),
        prestigePointsToGet: new Decimal(0),
    }
    },
    automate() {
        if (hasMilestone("r", 15) && player.p.auto == true)
        {
            buyUpgrade("p", 11)
            buyUpgrade("p", 12)
            buyUpgrade("p", 13)
            buyUpgrade("p", 14)
            buyUpgrade("p", 15)
            buyUpgrade("p", 16)
            buyUpgrade("p", 17)
            buyUpgrade("p", 18)
            buyUpgrade("p", 19)
            buyUpgrade("p", 21)
            buyUpgrade("p", 22)
            buyUpgrade("p", 23)
        }  
    },
    nodeStyle() {
    },
    tooltip: "Prestige",
    color: "#31aeb0",
    branches: ["f"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.p.prestigePointsToGet = player.points.div(250000).pow(0.5)
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.t.treeEffect)
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("g", 16))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.r.pentEffect)
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.gh.grasshopperEffects[2])
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("m", 14))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.cb.commonPetEffects[1][0])
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.d.diceEffects[2])
        if (hasUpgrade("ip", 21)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(upgradeEffect("ip", 21))

        player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet.mul(buyableEffect("gh", 14).mul(delta)))
        if (hasUpgrade("rf", 12)) player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet.mul(Decimal.mul(0.2, delta)))
        if (hasMilestone("ip", 12)) player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet.mul(Decimal.mul(0.05, delta)))
    },
    prestigeReset()
    {
        player.points = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)

        player.f.buyables[11] = new Decimal(0)
        player.f.buyables[12] = new Decimal(0)
        player.f.buyables[13] = new Decimal(0)
        player.f.buyables[14] = new Decimal(0)
        player.f.buyables[15] = new Decimal(0)
        player.f.buyables[16] = new Decimal(0)
        player.f.buyables[17] = new Decimal(0)
        player.f.buyables[18] = new Decimal(0)

        player.f.factorPower = new Decimal(0)
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return "<h3>Prestige, but reset all ranks and factors. <br>(Req: 250,000 Celestial Points)" },
            canClick() { return player.p.prestigePointsToGet.gte(1) && player.points.gte(250000)},
            unlocked() { return true },
            onClick() {
                layers.p.prestigeReset()
                player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet)
            },
            style: { width: '400px', "min-height": '100px' },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Prestige Upgrade I",
            unlocked() { return true },
            description: "Triples celestial point gain.",
            cost: new Decimal(1),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        }, 
        12:
        {
            title: "Prestige Upgrade II",
            unlocked() { return true },
            description() { return "Boosts celestial points based on prestige points." },
            cost: new Decimal(2),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
            effect() {
                return player.p.prestigePoints.pow(0.2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        13:
        {
            title: "Prestige Upgrade III",
            unlocked() { return true },
            description: "Unlocks Factor VII.",
            cost: new Decimal(5),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        }, 
        14:
        {
            title: "Prestige Upgrade IV",
            unlocked() { return true },
            description: "You can buy max ranks, tiers, tetr, etc.",
            cost: new Decimal(16),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        }, 
        15:
        {
            title: "Prestige Upgrade V",
            unlocked() { return true },
            description: "Autobuys factors I-VIII.",
            cost: new Decimal(64),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        }, 
        16:
        {
            title: "Prestige Upgrade VI",
            unlocked() { return hasUpgrade("i", 15) },
            description: "Tetr boosts factor power gain.",
            cost: new Decimal(4096),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
            effect() {
                return player.r.tetr.pow(0.6).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        17:
        {
            title: "Prestige Upgrade VII",
            unlocked() { return hasUpgrade("p", 16) },
            description: "Automates rank gain.",
            cost: new Decimal(32768),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        }, 
        18:
        {
            title: "Prestige Upgrade VIII",
            unlocked() { return hasUpgrade("p", 17) },
            description: "Automates tier gain.",
            cost: new Decimal(524288),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        }, 
        19:
        {
            title: "Prestige Upgrade IX",
            unlocked() { return hasUpgrade("p", 18) && player.f.powerFactorUnlocks[6] == true },
            description: "Unlocks Power Factor VIII, and more tree buyables.",
            cost: new Decimal(4782969),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        21:
        {
            title: "Prestige Upgrade X",
            unlocked() { return hasUpgrade("p", 19) },
            description: "Autobuys power factors I-VIII",
            cost: new Decimal(67108864),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        22:
        {
            title: "Prestige Upgrade XI",
            unlocked() { return hasUpgrade("p", 19) },
            description: "Automates tetr gain.",
            cost: new Decimal(1162261467),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        23:
        {
            title: "Prestige Upgrade XII",
            unlocked() { return hasMilestone("r", 11) },
            description: "Unlocks Tree Factor IV.",
            cost: new Decimal.pow(5, 25),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
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
            "Main": {
                buttonStyle() { return { 'color': '#31aeb0' } },
                unlocked() { return true },
                content:
                [
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
                        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["raw-html", function () { return "You have <h3>" + format(player.p.prestigePoints) + "</h3> prestige points." }, { "color": "#31aeb0", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return player.points.gt(250000) ? "You will gain <h3>" + format(player.p.prestigePointsToGet) + "</h3> prestige points on reset." : ""}, { "color": "#31aeb0", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 14) }
})