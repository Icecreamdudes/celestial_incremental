var tree = [["ad", "ip"], ["ga", "ta"]]
addLayer("in", {
    name: "Infinity Dimension", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        unlockedInfinity: false,
        reachedInfinity: false,
        unlockedBreak: false,

        infinityPoints: new Decimal(0),
        infinityPointsToGet: new Decimal(0),
        infinityPause: new Decimal(0),

        infinities: new Decimal(0),
        infinitiesToGet: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
          width: '200px',
          height: '200px',  
          backgroundColor: 'black',
          border: '6px solid #4BDF34',
          borderRadius: '50%',
          position: 'relative',
          overflow: 'hidden',
          animation: 'portalAnimation 2s infinite alternate',
          
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'white',
        
          ':before': {
            content: '∞' 
          }
        };
      },
    
    tooltip: "Infinity Dimension",
    color: "white",
    update(delta) {

        let onepersec = new Decimal(1)
        if (player.subtabs["in"]['stuff'] == 'Portal')
        {
            player.tab = "po"
            player.subtabs["in"]['stuff'] = 'Features'
        }

        if (player.in.infinityPoints.gt(0))
        {
            player.in.unlockedInfinity = true
        }

        if (player.in.reachedInfinity && !inChallenge("ip", 11) && !player.in.unlockedBreak)
        {
            if (!player.bigc.skip) 
            {
                player.tab = "bigc"
            } else if (hasMilestone("ip", 21))
            {
                layers.bigc.crunch()

            }
        }

        player.in.infinityPointsToGet = new Decimal(1)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("h", 21))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("h", 22))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ip", 11))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.d.diceEffects[11])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.rf.abilityEffects[5])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("cb", 12))
        
        player.in.infinityPause = player.in.infinityPause.sub(1)
        if (player.in.infinityPause.gt(0))
        {
            layers.in.bigCrunch();
        }
    },
    bigCrunch()
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

        for (let i = 0; i < player.i.upgrades.length; i++) {
            if (+player.i.upgrades[i] < 22) {
                player.i.upgrades.splice(i, 1);
                i--;
            }
        }

        if (!player.po.keepOTFS || inChallenge("ip", 15) || inChallenge("ip", 16))
        {
            player.po.dice = false
            player.po.rocketFuel = false
            player.po.hex = false
            player.po.featureSlots = player.po.featureSlotsMax
        }
        

        //reset antimatter stuff

        if (!hasMilestone("ip", 14))
        {
            player.ad.antimatter = new Decimal(10)

            player.ad.buyables[1] = new Decimal(0)
    
            for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
            {
                player.ad.dimensionAmounts[i] = new Decimal(0)
                player.ad.dimensionsPurchased[i] = new Decimal(0)
            }
    
            player.ad.dimensionsUnlocked[4] = false
            player.ad.dimensionsUnlocked[5] = false
            player.ad.dimensionsUnlocked[6] = false
            player.ad.dimensionsUnlocked[7] = false
            
            player.ad.dimBoostAmount = new Decimal(0)
            player.ad.galaxyAmount = new Decimal(0)
        }

        //challenge stuff
        player.pe.pests = new Decimal(0)

        if (!inChallenge("ip", 15))
        {
        
        player.d.challengeDicePoints = new Decimal(0)
        player.d.buyables[21] = new Decimal(0)
        player.d.buyables[22] = new Decimal(0)
        player.d.buyables[23] = new Decimal(0)
        player.d.buyables[24] = new Decimal(0)

        for (let i = 0; i < player.d.upgrades.length; i++) {
            if (+player.d.upgrades[i] < 100) {
                player.d.upgrades.splice(i, 1);
                i--;
            }
        }
        }

        player.de.antidebuffPoints = new Decimal(0)
        player.de.antidebuffIndex = new Decimal(6)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "po"
            },
            style: { width: '100px', "min-height": '50px' },
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
            "Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["tree", tree],
                ]

            },
            "Portal": {
                buttonStyle() { return { 'color': 'black', 'border-color': 'purple', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', } },
                unlocked() { return hasUpgrade("ad", 13) },
                content:
                [
                ]
            },
            "Settings": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                    [
                        ["blank", "25px"],
                        ["row", [
                        ["raw-html", function () { return "<button class=opt onclick=save()>Save</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('autosave')>Autosave</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=hardReset()>HARD RESET</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]],
                    ["row", [
                        ["raw-html", function () { return "<button class=opt onclick=exportSave()>Export to clipboard</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=importSave()>Import</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('offlineProd')>Offline Prod</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]],
                    ["row", [
                        ["raw-html", function () { return "<button class=opt onclick=switchTheme()>Change Theme</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('musicToggle'); needsCanvasUpdate = true>Toggle Music</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('toggleHotkey'); needsCanvasUpdate = true>Toggle Hotkeys</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "</td><td><div style=margin: 0 10px><input type=range id=volume name=Music Volume min=1 max=10 value=10 oninput=updateMusicVolume()><br>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Volume: " + options.musicVolume}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Autosave: " + options.autosave}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Offline Production: " + options.offlineProd}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Music Toggle: " + options.musicToggle}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Hotkey Toggle: " + options.toggleHotkey}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "Playtime: " + formatTime(player.timePlayed)}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<a href=https://discord.gg/icecreamdude-s-incremental-games-850817562040467556>Join the Discord!</a>"}, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                    ]
            },
        },
    }, 

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter, which boosts points by x" + format(player.ad.antimatterEffect) + " (based on points and antimatter)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity}
})
addLayer("bigc", {
    name: "Big Crunch", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        spawnedWisps: false,
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Ranks",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "bigc" && !player.bigc.spawnedWisps)
        {
            createWisps('black', 50, 3);
            player.bigc.spawnedWisps = true
        } else if (player.tab != "bigc")
        {
            removeWisps();
        }
    },
    branches: ["branch"],
    clickables: {
        11: {
            title() { return "<h2>BIG CRUNCH" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"

                layers.bigc.crunch()
            },
            style: { width: '300px', "min-height": '120px' },
        },
        
    },
    crunch(){
        player.in.infinityPoints = player.in.infinityPoints.add(player.in.infinityPointsToGet)
        player.in.infinities = player.in.infinities.add(player.in.infinitiesToGet)
        if (player.po.dice)
        {
            player.ip.diceRuns = player.ip.diceRuns.add(1)
        }
        if (player.po.rocketFuel)
        {
            player.ip.rocketFuelRuns = player.ip.rocketFuelRuns.add(1)
        }
        player.in.infinityPause = new Decimal(5)
        player.in.reachedInfinity = false

        if (inChallenge("ip", 11))
        {
            completeChallenge("ip", 11)
        }
        if (inChallenge("ip", 12))
        {
            completeChallenge("ip", 12)
        }
        if (inChallenge("ip", 13))
        {
            completeChallenge("ip", 13)
        }
        if (inChallenge("ip", 14))
        {
            completeChallenge("ip", 14)
        }
        if (inChallenge("ip", 15))
        {
            completeChallenge("ip", 15)
        }
        if (inChallenge("ip", 16))
        {
            completeChallenge("ip", 16)
        }
        if (inChallenge("ip", 18))
        {
            completeChallenge("ip", 18)
        }
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

    tabFormat: [
                    ["raw-html", function () { return "<h2>1e308 celestial points- impossible." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "150px"],
                    ["row", [["clickable", 11]]],
    ],
    layerShown() { return player.startedGame == true }
})
window.addEventListener('load', function() {
    player.bigc.spawnedWisps = false

});