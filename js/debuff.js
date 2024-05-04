addLayer("de", {
    name: "Debuff", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        antidebuffPause: new Decimal(0),
        antidebuffPoints: new Decimal(0),
        antidebuffPointsToGet: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)",
            "background-origin": "border-box",
            "border-color": "#3A2558",
        };
      },
    tooltip: "Debuff",
    color: "#3A2558",
    
    update(delta) {
        let onepersec = new Decimal(1)
        
        if (player.de.antidebuffPause.gt(0)) {
            layers.de.antidebuffReset();
        }
        player.de.antidebuffPause = player.de.antidebuffPause.sub(1)

        player.de.antidebuffPointsToGet = player.gh.grasshoppers.div(1e14).pow(0.3)
    },
    antidebuffReset()
    {
        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)
        player.r.pent = new Decimal(0)

        player.f.factorUnlocks = [true, true, true, false, false, false, false, false]
        player.f.factorGain = new Decimal(1)

        player.f.factorPower = new Decimal(0)
        player.f.factorPowerEffect = new Decimal(1)
        player.f.factorPowerPerSecond = new Decimal(0)
        player.f.powerFactorUnlocks = [true, true, true, false, false, false, false, false]

        player.f.buyables[1] = new Decimal(0)
        player.f.buyables[2] = new Decimal(0)
        player.f.buyables[3] = new Decimal(0)
        player.f.buyables[4] = new Decimal(0)
        player.f.buyables[5] = new Decimal(0)
        player.f.buyables[6] = new Decimal(0)
        player.f.buyables[7] = new Decimal(0)
        player.f.buyables[8] = new Decimal(0)
        player.f.buyables[11] = new Decimal(0)
        player.f.buyables[12] = new Decimal(0)
        player.f.buyables[13] = new Decimal(0)
        player.f.buyables[14] = new Decimal(0)
        player.f.buyables[15] = new Decimal(0)
        player.f.buyables[16] = new Decimal(0)
        player.f.buyables[17] = new Decimal(0)
        player.f.buyables[18] = new Decimal(0)
        player.f.buyables[19] = new Decimal(0)
        player.f.buyables[21] = new Decimal(0)
        player.f.buyables[22] = new Decimal(0)
        player.f.buyables[23] = new Decimal(0)
        player.f.buyables[24] = new Decimal(0)
        player.f.buyables[25] = new Decimal(0)
        player.f.buyables[26] = new Decimal(0)
        player.f.buyables[27] = new Decimal(0)
        player.f.buyables[28] = new Decimal(0)
        player.f.buyables[29] = new Decimal(0)
        player.f.buyables[31] = new Decimal(0)
        player.f.buyables[32] = new Decimal(0)
        player.f.buyables[33] = new Decimal(0)
        player.f.buyables[34] = new Decimal(0)
        player.f.buyables[35] = new Decimal(0)
        player.f.buyables[36] = new Decimal(0)

        player.p.prestigePoints = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14))
        {
        for (let i = 0; i < player.p.upgrades.length; i++) {
            if (+player.p.upgrades[i] < 24) {
                player.p.upgrades.splice(i, 1);
                i--;
            }
        }
    }

        player.t.buyables[11] = new Decimal(0)
        player.t.buyables[12] = new Decimal(0)
        player.t.buyables[13] = new Decimal(0)
        player.t.buyables[14] = new Decimal(0)
        player.t.buyables[15] = new Decimal(0)
        player.t.buyables[16] = new Decimal(0)
        player.t.buyables[17] = new Decimal(0)
        player.t.buyables[18] = new Decimal(0)

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        player.g.buyables[11] = new Decimal(0)
        player.g.buyables[12] = new Decimal(0)
        player.g.buyables[13] = new Decimal(0)
        player.g.buyables[14] = new Decimal(0)
        player.g.buyables[15] = new Decimal(0)
        player.g.buyables[16] = new Decimal(0)
        player.g.buyables[17] = new Decimal(0)
        player.g.buyables[18] = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14))
        {
        for (let i = 0; i < player.g.upgrades.length; i++) {
            if (+player.g.upgrades[i] < 22) {
                player.g.upgrades.splice(i, 1);
                i--;
            }
        }
        }

        if (!hasMilestone("ip", 15) && !inChallenge("ip", 14))
        {
            for (let i = 0; i < player.r.milestones.length; i++) {
                if (+player.r.milestones[i] < 20) {
                    player.r.milestones.splice(i, 1);
                    i--;
                }
            }
        }

        player.g.grass = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        player.gh.grasshoppers = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)

        player.gh.buyables[11] = new Decimal(0)
        player.gh.buyables[12] = new Decimal(0)
        player.gh.buyables[13] = new Decimal(0)
        player.gh.buyables[14] = new Decimal(0)
        player.gh.buyables[15] = new Decimal(0)
        player.gh.buyables[16] = new Decimal(0)
        player.gh.buyables[17] = new Decimal(0)
        player.gh.buyables[18] = new Decimal(0)
        player.gh.buyables[19] = new Decimal(0)
        player.gh.buyables[21] = new Decimal(0)
        player.gh.buyables[22] = new Decimal(0)

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        player.m.buyables[11] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[14] = new Decimal(0)

        //dice
        player.d.dicePoints = new Decimal(0)
        player.d.diceRolls = [new Decimal(1)] 
        player.d.dice = new Decimal(1)

        player.d.buyables[11] = new Decimal(0)
        player.d.buyables[12] = new Decimal(0)
        player.d.buyables[13] = new Decimal(0)
        player.d.buyables[14] = new Decimal(0)
        player.d.buyables[15] = new Decimal(0)

        for (let i = 0; i < 11; i++)
        {
            player.d.diceEffects[i] = new Decimal(1)
        }

        //rf
        player.rf.rocketFuel = new Decimal(0)
        for (let i = 0; i < player.rf.abilitiesUnlocked.length; i++)
        {
            player.rf.abilitiesUnlocked[i] = false
        }
        for (let i = 0; i < 4; i++)
        {
            player.rf.abilityTimers[i] = new Decimal(0)
        }

        for (let i = 0; i < player.rf.upgrades.length; i++) {
            if (+player.rf.upgrades[i] < 18) {
                player.rf.upgrades.splice(i, 1);
                i--;
            }
        }
    },
    branches: ["t", "m"],
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
            title() { return "<h3>Reset everything before OTFs for antidebuff points.<br><h4>Req: 1e14 grasshoppers." },
            canClick() { return player.de.antidebuffPointsToGet.gte(1) && player.gh.grasshoppers.gte(1e14)},
            unlocked() { return true },
            onClick() {
                player.de.antidebuffPause = new Decimal(4)
                player.de.antidebuffPoints = player.de.antidebuffPoints.add(player.de.antidebuffPointsToGet)
            },
            style: { width: '400px', "min-height": '80px' },
        },
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
            "Debuffs": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return inChallenge("ip", 18) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "^0.4 to celestial point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.5 to prestige point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.6 to grasshopper gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.6 to code experience gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "-90% of points per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "-60% of prestige points per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "-40% of grass per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "-30% of trees and mods per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "-20% of code experience per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
    ]

            },
            "Antidebuff": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return inChallenge("ip", 18) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.de.antidebuffPoints) + "</h3> antidebuff points." }, { "color": "#8D71B4", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.de.antidebuffPointsToGet) + "</h3> antidebuff points on reset." }, { "color": "#8D71B4", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
        ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && (inChallenge("ip", 18)) }
})