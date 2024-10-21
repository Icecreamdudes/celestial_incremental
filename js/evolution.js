addLayer("ev", {
    name: "Evolution", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        evolutionDisplayIndex: new Decimal(-1),
        evolutionDisplay: [],
        evolutionsUnlocked: [false, false, false, false, false, false, false, false, false],
        /*
        0 - Unsmith
        1 - Shark
        2 - Normal Face
        3 - Gwa
        4 - Star
        5 - Dice
        6 - Spider
        7 - Ufo
        8 - Clock
        */
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Evolution",
    color: "#06366e",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "ev")
        {
            startRain('#4b79ff');
        }  else if (player.tab == "eva")
        {
            stopRain('#4b79ff');
        }

        player.ev.evolutionDisplay = [
            "Evolve Unsmith<br>" + formatWhole(player.cb.evolutionShards) + "/4 Evolution Shards" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[0]) + "/6 Gwa" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[1]) + "/6 Egg Guy" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[2]) + "/6 Unsmith" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[3]) + "/6 Gd Checkpoint" +
            "<br>"  + formatWhole(player.cb.commonPetAmounts[4]) + "/6 Slax" + 
            "<br>"  + formatWhole(player.cb.commonPetLevels[2]) + "/7 Unsmith Level" +
            "<br>"  + formatWhole(player.cb.highestDicePetCombo) + "/2 Highest Dice Pet Combo",

            "Evolve Shark<br>" + formatWhole(player.cb.evolutionShards) + "/6 Evolution Shards" +
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[0]) + "/3 Teste" +
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[1]) + "/3 Star" +
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[2]) + "/3 Normal Face" +
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[3]) + "/3 Shark" +
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[4]) + "/3 THE WATCHING EYE" + 
            "<br>"  + formatWhole(player.cb.rarePetAmounts[2]) + "/2 Drippy Ufo" + 
            "<br>"  + formatWhole(player.cb.uncommonPetLevels[3]) + "/4 Shark Level",

            "Evolve Normal Face<br>" + formatWhole(player.cb.evolutionShards) + "/10 Evolution Shards" +
            "<br>"  + formatWhole(player.ip.diceRuns) + "/2 Dice Runs" + 
            "<br>"  + formatWhole(player.ip.rocketFuelRuns) + "/2 Rocket Fuel Runs" + 
            "<br>"  + formatWhole(player.cb.rarePetAmounts[0]) + "/3 Nova" + 
            "<br>"  + formatWhole(player.cb.rarePetAmounts[3]) + "/3 Goofy Ahh Thing" + 
            "<br>"  + formatWhole(player.cb.uncommonPetLevels[2]) + "/6 Normal Face Level",

            "Evolve Gwa<br>" + formatWhole(player.cb.evolutionShards) + "/8 Evolution Shards" +
            "<br>"  + formatWhole(player.ip.diceRuns) + "/2,000 Dice Runs" + 
            "<br>"  + formatWhole(player.ip.rocketFuelRuns) + "/2,000 Rocket Fuel Runs" + 
            "<br>"  + formatWhole(player.ip.hexRuns) + "/2,000 Hex Runs" + 
            "<br>"  + formatWhole(player.points) + "/1e550 Celestial Points" + 
            "<br>"  + formatWhole(player.bi.brokenInfinities) + "/50,000 Broken Infinities" + 
            "<br>"  + formatWhole(player.cb.petPoints) + "/500 Pet Points" + 
            "<br>"  + formatWhole(player.cb.commonPetLevels[0]) + "/12 Gwa Level",

            "Evolve Star<br>" + formatWhole(player.cb.evolutionShards) + "/20 Evolution Shards" +
            "<br>"  + formatWhole(player.cb.paragonShards) + "/1 Paragon Shard" + 
            "<br>"  + formatWhole(player.in.infinityPoints) + "/1e11 Infinity Points" + 
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[0]) + "/10 Teste" + 
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[1]) + "/10 Star" + 
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[2]) + "/10 Normal Face" + 
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[3]) + "/10 Shark" + 
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[4]) + "/10 THE WATCHING EYE" + 
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[5]) + "/10 Clock" + 
            "<br>"  + formatWhole(player.cb.uncommonPetAmounts[6]) + "/10 Trollface" + 
            "<br>"  + formatWhole(player.cb.petPoints) + "/1,000 Pet Points" + 
            "<br>"  + formatWhole(player.cb.uncommonPetLevels[1]) + "/9 Star Level",

            "Evolve Dice<br>" + formatWhole(player.cb.evolutionShards) + "/25 Evolution Shards" +
            "<br>"  + formatWhole(player.cb.paragonShards) + "/1 Paragon Shard" + 
            "<br>"  + formatWhole(player.ta.highestDicePoints) + "/1e45 Highest Dice Points" + 
            "<br>"  + formatWhole(player.cb.evolvedLevels[0]) + "/6 Goldsmith Level" + 
            "<br>"  + formatWhole(player.cb.evolvedLevels[1]) + "/6 MrRedShark Level" + 
            "<br>"  + formatWhole(player.cb.evolvedLevels[2]) + "/5 Insane Face Level" + 
            "<br>"  + format(player.cb.XPBoost) + "/7.00 XPBoost" + 
            "<br>"  + formatWhole(player.cb.rarePetLevels[1]) + "/5 Dice Level",

            "Evolve Spider<br>" + formatWhole(player.cb.evolutionShards) + "/10 Evolution Shards" +
            "<br>"  + formatWhole(player.cb.paragonShards) + "/2 Paragon Shards" + 
            "<br>"  + formatWhole(player.cb.XPBoost) + "/25 XPBoost",

            "Evolve Drippy Ufo<br>" + formatWhole(player.cb.evolutionShards) + "/25 Evolution Shards" +
            "<br>"  + formatWhole(player.cb.paragonShards) + "/2 Paragon Shards" + 
            "<br>"  + format(player.ev4.offerings) + "/200 Pet Sacrifice Offerings" +
            "<br>"  + formatWhole(player.g.goldGrass) + "/1e12 Golden Grass" +
            "<br>"  + formatWhole(player.rf.rocketFuel) + "/1e80 Rocket Fuel",

            "Evolve Clock<br>" + formatWhole(player.cb.evolutionShards) + "/40 Evolution Shards" +
            "<br>"  + formatWhole(player.cb.paragonShards) + "/1 Paragon Shards" + 
            "<br>"  + formatWhole(player.cb.level) + "/1,500 Check Back Levels" +
            "<br>"  + formatWhole(player.cb.uncommonPetLevels[5]) + "/8 Clock Level" +
            "<br>"  + formatWhole(player.cb.uncommonPetLevels[6]) + "/8 Trollface Level" +
            "<br>"  + formatWhole(player.ca.rememberanceCores) + "/5 Rememberance Cores",
        ]
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cb"
                stopRain('#4b79ff');
            },
            style: { width: '100px', "min-height": '50px', 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%"},
        },
        11: {
            title() { return player.cb.commonPetImage[2] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[0] },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        12: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(4) && player.cb.commonPetAmounts[0].gte(6) && player.cb.commonPetAmounts[1].gte(6) && player.cb.commonPetAmounts[2].gte(6) && player.cb.commonPetAmounts[3].gte(6) && player.cb.commonPetAmounts[4].gte(6) && player.cb.commonPetLevels[2].gte(7) && player.cb.highestDicePetCombo.gte(2)},
            unlocked() { return player.ev.evolutionDisplayIndex == 0 },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(4)
                player.cb.commonPetAmounts[0] = player.cb.commonPetAmounts[0].sub(6)
                player.cb.commonPetAmounts[1] = player.cb.commonPetAmounts[1].sub(6)
                player.cb.commonPetAmounts[2] = player.cb.commonPetAmounts[2].sub(6)
                player.cb.commonPetAmounts[3] = player.cb.commonPetAmounts[3].sub(6)
                player.cb.commonPetAmounts[4] = player.cb.commonPetAmounts[4].sub(6)

                player.ev.evolutionsUnlocked[0] = true
                player.cb.evolvedLevels[0] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%" },
        },
        13: {
            title() { return player.cb.uncommonPetImage[3] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[1] },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        14: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(6) && player.cb.uncommonPetAmounts[0].gte(3) && player.cb.uncommonPetAmounts[1].gte(3) && player.cb.uncommonPetAmounts[2].gte(3) && player.cb.uncommonPetAmounts[3].gte(3) && player.cb.uncommonPetAmounts[4].gte(3) && player.cb.uncommonPetLevels[3].gte(4) && player.cb.rarePetAmounts[2].gte(2)},
            unlocked() { return player.ev.evolutionDisplayIndex == 1 },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(6)
                player.cb.uncommonPetAmounts[0] = player.cb.uncommonPetAmounts[0].sub(3)
                player.cb.uncommonPetAmounts[1] = player.cb.uncommonPetAmounts[1].sub(3)
                player.cb.uncommonPetAmounts[2] = player.cb.uncommonPetAmounts[2].sub(3)
                player.cb.uncommonPetAmounts[3] = player.cb.uncommonPetAmounts[3].sub(3)
                player.cb.uncommonPetAmounts[4] = player.cb.uncommonPetAmounts[4].sub(3)
                player.cb.rarePetAmounts[2] = player.cb.rarePetAmounts[2].sub(2)

                player.ev.evolutionsUnlocked[1] = true
                player.cb.evolvedLevels[1] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%" },
        },
        15: {
            title() { return player.cb.uncommonPetImage[2] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[2] && player.in.infinities.gt(0)},
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        16: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(10) && player.ip.diceRuns.gte(2) && player.ip.rocketFuelRuns.gte(2) && player.cb.rarePetAmounts[0].gte(3) && player.cb.rarePetAmounts[3].gte(3) && player.cb.uncommonPetLevels[2].gte(6)},
            unlocked() { return player.ev.evolutionDisplayIndex == 2 },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(10)
                player.cb.rarePetAmounts[0] = player.cb.rarePetAmounts[0].sub(3)
                player.cb.rarePetAmounts[3] = player.cb.rarePetAmounts[3].sub(3)

                player.ev.evolutionsUnlocked[2] = true
                player.cb.evolvedLevels[2] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%" },
        },
        17: {
            title() { return player.cb.commonPetImage[0] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[3] && player.in.unlockedBreak},
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        18: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(8) && player.ip.diceRuns.gte(2000) && player.ip.rocketFuelRuns.gte(2000) && player.ip.hexRuns.gte(2000) && player.points.gte("1e550") && player.bi.brokenInfinities.gte(50000) && player.cb.petPoints.gte(500) && player.cb.commonPetLevels[0].gte(12) },
            unlocked() { return player.ev.evolutionDisplayIndex == 3 },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(8)
                player.cb.petPoints = player.cb.petPoints.sub(500)
                player.bi.brokenInfinities = player.bi.brokenInfinities.sub(50000)

                player.ev.evolutionsUnlocked[3] = true
                player.cb.evolvedLevels[3] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%" },
        },
        19: {
            title() { return player.cb.uncommonPetImage[1] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[4] && player.cb.level.gt(250)},
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        21: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(20) && player.cb.paragonShards.gte(1) && player.in.infinityPoints.gte(1e11) && player.cb.uncommonPetAmounts[0].gte(10) && player.cb.uncommonPetAmounts[1].gte(10) && player.cb.uncommonPetAmounts[2].gte(10) && player.cb.uncommonPetAmounts[3].gte(10) && player.cb.uncommonPetAmounts[4].gte(10) && player.cb.uncommonPetAmounts[5].gte(10) && player.cb.uncommonPetAmounts[6].gte(10) && player.cb.petPoints.gte(1000) && player.cb.uncommonPetLevels[1].gte(9)},
            unlocked() { return player.ev.evolutionDisplayIndex == 4 },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(20)
                player.cb.paragonShards = player.cb.paragonShards.sub(1)
                player.in.infinityPoints = player.in.infinityPoints.sub(1e11)
                player.cb.uncommonPetAmounts[0] = player.cb.uncommonPetAmounts[0].sub(10)
                player.cb.uncommonPetAmounts[1] = player.cb.uncommonPetAmounts[1].sub(10)
                player.cb.uncommonPetAmounts[2] = player.cb.uncommonPetAmounts[2].sub(10)
                player.cb.uncommonPetAmounts[3] = player.cb.uncommonPetAmounts[3].sub(10)
                player.cb.uncommonPetAmounts[4] = player.cb.uncommonPetAmounts[4].sub(10)
                player.cb.uncommonPetAmounts[5] = player.cb.uncommonPetAmounts[5].sub(10)
                player.cb.uncommonPetAmounts[6] = player.cb.uncommonPetAmounts[6].sub(10)
                player.cb.petPoints = player.cb.petPoints.sub(1000)

                player.ev.evolutionsUnlocked[4] = true
                player.cb.evolvedLevels[4] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%" },
        },
        22: {
            title() { return player.cb.rarePetImage[1] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[5] && player.cb.level.gt(250)},
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        23: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(25) && player.cb.paragonShards.gte(1) && player.d.dicePoints.gte(1e45) && player.cb.evolvedLevels[0].gte(6) && player.cb.evolvedLevels[1].gte(6) && player.cb.evolvedLevels[2].gte(5) && player.cb.XPBoost.gte(7) && player.cb.rarePetLevels[1].gte(5) },
            unlocked() { return player.ev.evolutionDisplayIndex == 5 },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(25)
                player.cb.paragonShards = player.cb.paragonShards.sub(1)

                player.ev.evolutionsUnlocked[5] = true
                player.cb.evolvedLevels[5] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%" },
        },
        24: {
            title() { return player.cb.commonPetImage[5] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[6] && hasUpgrade("bi", 24)},
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        25: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(10) && player.cb.paragonShards.gte(2) && player.cb.XPBoost.gte(25)},
            unlocked() { return player.ev.evolutionDisplayIndex == 6 },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(10)
                player.cb.paragonShards = player.cb.paragonShards.sub(2)
                player.cb.XPBoost = player.cb.XPBoost.sub(25)

                player.ev.evolutionsUnlocked[6] = true
                player.cb.evolvedLevels[6] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%" },
        },
        26: {
            title() { return player.cb.rarePetImage[2] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[7] && hasUpgrade("bi", 24)},
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(7)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        27: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(25) && player.cb.paragonShards.gte(2) && player.ev4.offerings.gte(200) && player.g.goldGrass.gte(1e12) && player.rf.rocketFuel.gte(1e80)},
            unlocked() { return player.ev.evolutionDisplayIndex == 7 },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(25)
                player.cb.paragonShards = player.cb.paragonShards.sub(2)
                player.ev4.offerings = player.ev4.offerings.sub(200)
                player.g.goldGrass = player.g.goldGrass.sub(1e12)
                player.rf.rocketFuel = player.rf.rocketFuel.sub(1e80)

                player.ev.evolutionsUnlocked[7] = true
                player.cb.evolvedLevels[7] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%" },
        },
        28: {
            title() { return player.cb.uncommonPetImage[5] },
            canClick() { return true},
            unlocked() { return !player.ev.evolutionsUnlocked[8] && hasUpgrade("bi", 24)},
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(8)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        29: {
            title() { return "EVOLVE" },
            canClick() { return player.cb.evolutionShards.gte(40) && player.cb.paragonShards.gte(1) && player.cb.level.gte(1500) && player.cb.uncommonPetLevels[5].gte(8) && player.cb.uncommonPetLevels[5].gte(8) && player.ca.rememberanceCores.gte(5)},
            unlocked() { return player.ev.evolutionDisplayIndex == 8 },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(40)
                player.cb.paragonShards = player.cb.paragonShards.sub(1)
                player.cb.level = player.cb.level.sub(1500)
                player.ca.rememberanceCores = player.ca.rememberanceCores.sub(5)

                player.ev.evolutionsUnlocked[8] = true
                player.cb.evolvedLevels[8] = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px', 'border-radius': "0%", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%" },
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
            "Main": {
                buttonStyle() { return { 'color': '#1500bf', 'border-color': "#1500bf", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Current Evolutions"}, { "color": "#4b79ff", "font-size": "36px", "font-family": "monospace" }],
                    ["row", [["clickable", 11], ["clickable", 13], ["clickable", 15], ["clickable", 17], ["clickable", 19], ["clickable", 22], ["clickable", 24], ["clickable", 26], ["clickable", 28]]],
                    ["blank", "25px"],
                    ["row", [["raw-html", function () { return player.ev.evolutionDisplay[player.ev.evolutionDisplayIndex] }, { "color": "#4b79ff", "font-size": "28px", "font-family": "monospace" }]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 12], ["clickable", 14], ["clickable", 16], ["clickable", 18], ["clickable", 21], ["clickable", 23], ["clickable", 25], ["clickable", 27], ["clickable", 29]]],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards." }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return false }
})
addLayer("ev0", {
    name: "Goldsmith", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E0", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        coinDust: new Decimal(0),
        coinDustEffect: new Decimal(1),
        coinDustPerSecond: new Decimal(0), 
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Evolution",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ev0.coinDust = player.ev0.coinDust.add(player.ev0.coinDustPerSecond.mul(delta))

        player.ev0.coinDustPerSecond = player.cb.evolvedEffects[0][1].div(3600)
        player.ev0.coinDustPerSecond = player.ev0.coinDustPerSecond.mul(buyableEffect("ev0", 11))

        if (player.ev0.coinDust.lt(1)) player.ev0.coinDustEffect = player.ev0.coinDust.mul(0.05).add(1)
        if (player.ev0.coinDust.gte(1)) player.ev0.coinDustEffect = player.ev0.coinDust.pow(0.3).mul(0.05).add(1)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cb"
                stopRain('#4b79ff');
            },
            style: { width: '100px', "min-height": '50px', 'background-image': 'linear-gradient(90deg, #e7c97c, #fad25a)', 'border-width': "10px" },
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Coin Dust Booster"
            },
            display() {
                return "which are boosting coin dust gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy() {
                let base = new Decimal(0.1)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ev0.coinDust = player.ev0.coinDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ev0.coinDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ev0.coinDust = player.ev0.coinDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP Button Cool Down"
            },
            display() {
                return "which are dividing xp button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy() {
                let base = new Decimal(0.25)
                let growth = 1.25
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ev0.coinDust = player.ev0.coinDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ev0.coinDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ev0.coinDust = player.ev0.coinDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.6) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Pet Button Cool Down"
            },
            display() {
                return "which are dividing pet button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy() {
                let base = new Decimal(0.6)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ev0.coinDust = player.ev0.coinDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ev0.coinDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ev0.coinDust = player.ev0.coinDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(1.5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Rare Pet Button Cool Down"
            },
            display() {
                return "which are dividing pet button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy() {
                let base = new Decimal(1.5)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ev0.coinDust = player.ev0.coinDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ev0.coinDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ev0.coinDust = player.ev0.coinDust.sub(cost)

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
            "Main": {
                buttonStyle() { return { 'color': '#655421', 'border-color': "#655421", 'background-image': 'linear-gradient(90deg, #e7c97c, #fad25a)',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.ev0.coinDust) + "</h3> coin dust, which boosts check back xp gain by x" + format(player.ev0.coinDustEffect) + "." }, { "color": "#655421", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return player.ev0.coinDustPerSecond.lt(0.1) ? "You are gaining <h3>" + format(player.ev0.coinDustPerSecond.mul(3600)) + "</h3> coin dust per hour." : "You are gaining <h3>" + format(player.ev0.coinDustPerSecond) + "</h3> coin dust per second."  }, { "color": "#655421", "font-size": "16px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return false }
})
addLayer("ev1", {
    name: "MrRedShark", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ev1", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Evolution",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cb"
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
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP: x" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        12: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        13: {
            cost(x) { return new Decimal(1.12).pow(x || getBuyableAmount(this.layer, this.id)).mul(2) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP: x" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(2)
                let growth = 1.12
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        14: {
            cost(x) { return new Decimal(1.24).pow(x || getBuyableAmount(this.layer, this.id)).mul(2) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(2)
                let growth = 1.24
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        15: {
            cost(x) { return new Decimal(1.14).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP: x" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.14
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        16: {
            cost(x) { return new Decimal(1.28).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(3)
                let growth = 1.28
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        17: {
            cost(x) { return new Decimal(1.16).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP: x" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.16
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        18: {
            cost(x) { return new Decimal(1.32).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.32
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        21: {
            cost(x) { return new Decimal(1.18).pow(x || getBuyableAmount(this.layer, this.id)).mul(7) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP: x" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.18
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        22: {
            cost(x) { return new Decimal(1.36).pow(x || getBuyableAmount(this.layer, this.id)).mul(7) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.36
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        23: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP: x" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        24: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        25: {
            cost(x) { return new Decimal(1.24).pow(x || getBuyableAmount(this.layer, this.id)).mul(16) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return player.cb.buttonUnlocks[6] },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP: x" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.24
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        26: {
            cost(x) { return new Decimal(1.48).pow(x || getBuyableAmount(this.layer, this.id)).mul(16) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return player.cb.buttonUnlocks[6] },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.48
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        27: {
            cost(x) { return new Decimal(1.26).pow(x || getBuyableAmount(this.layer, this.id)).mul(30) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return player.cb.buttonUnlocks[7] },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>XP: x" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(30)
                let growth = 1.26
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
        },
        28: {
            cost(x) { return new Decimal(1.52).pow(x || getBuyableAmount(this.layer, this.id)).mul(30) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return player.cb.buttonUnlocks[7] },
            canAfford() { return player.cb.petPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect)
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pet Points"
            },
            buy() {
                let base = new Decimal(30)
                let growth = 1.52
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.petPoints = player.cb.petPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.petPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.petPoints = player.cb.petPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '200px', height: '65px', }
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
            "Button Boosts": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
         ["raw-html", function () { return "You have <h3>" + format(player.cb.petPoints) + "</h3> pet points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["blank", "25px"],
                        ["row", [["clickable", 2], ["clickable", 3]]],
                        ["blank", "25px"],
                        ["column", [               
                    ["row", [["column", [["raw-html", function () { return "Button 1 Base: " + format(player.cb.buttonBaseXP[0]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],["raw-html", function () { return "Button 1 Cooldown: " + formatTime(player.cb.buttonTimersMax[0]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],]], ["blank", "25px"], ["buyable", 13], ["buyable", 14]]],                    
                    ["row", [["column", [["raw-html", function () { return "Button 2 Base: " + format(player.cb.buttonBaseXP[1]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],["raw-html", function () { return "Button 2 Cooldown: " + formatTime(player.cb.buttonTimersMax[1]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],]], ["blank", "25px"], ["buyable", 15], ["buyable", 16]]],                    
                    ["row", [["column", [["raw-html", function () { return "Button 3 Base: " + format(player.cb.buttonBaseXP[2]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],["raw-html", function () { return "Button 3 Cooldown: " + formatTime(player.cb.buttonTimersMax[2]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],]], ["blank", "25px"], ["buyable", 17], ["buyable", 18]]],                    
                    ["row", [["column", [["raw-html", function () { return "Button 4 Base: " + format(player.cb.buttonBaseXP[3]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],["raw-html", function () { return "Button 4 Cooldown: " + formatTime(player.cb.buttonTimersMax[3]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],]], ["blank", "25px"], ["buyable", 11], ["buyable", 12]]],                    
                    ["row", [["column", [["raw-html", function () { return "Button 5 Base: " + format(player.cb.buttonBaseXP[4]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],["raw-html", function () { return "Button 5 Cooldown: " + formatTime(player.cb.buttonTimersMax[4]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],]], ["blank", "25px"], ["buyable", 21], ["buyable", 22]]],                    
                    ["row", [["column", [["raw-html", function () { return "Button 6 Base: " + format(player.cb.buttonBaseXP[5]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],["raw-html", function () { return "Button 6 Cooldown: " + formatTime(player.cb.buttonTimersMax[5]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],]], ["blank", "25px"], ["buyable", 23], ["buyable", 24]]],     
                    ["row", [["column", [["raw-html", function () { return "Button 7 Base: " + format(player.cb.buttonBaseXP[6]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],["raw-html", function () { return "Button 7 Cooldown: " + formatTime(player.cb.buttonTimersMax[6]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],]], ["blank", "25px"], ["buyable", 25], ["buyable", 26]]],     
                    ["row", [["column", [["raw-html", function () { return "Button 8 Base: " + format(player.cb.buttonBaseXP[7]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],["raw-html", function () { return "Button 8 Cooldown: " + formatTime(player.cb.buttonTimersMax[7]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],]], ["blank", "25px"], ["buyable", 27], ["buyable", 28]]],     
                ]]                                
                ]

            },
            
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],

                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true }
})
addLayer("ev2", {
    name: "Insane Face", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E2", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        day: new Decimal(1),
        petDay: false,
        xpDay: true,
        cooldown: new Decimal(0),
        cooldownMax: new Decimal(86400),
        xpReward: new Decimal(500),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Evolution",
    color: "#106ccc",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ev2.xpReward = new Decimal(500)
        player.ev2.xpReward = player.ev2.xpReward.add(player.ev2.day.sub(1).mul(50))

        player.ev2.cooldown = player.ev2.cooldown.sub(onepersec.mul(delta))
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cb"
                stopRain('#4b79ff');
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#106ccc' },
        },
        11: {
            title() { return player.ev2.cooldown.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev2.cooldown) + "." : "<h3>Collect Daily Reward!"},
            canClick() { return player.ev2.cooldown.lt(0) },
            unlocked() { return player.ev2.cooldown },
            tooltip() { return player.ev2.petDay ? "5% - Nova<br>5% - Goofy Ahh Thing<br>10% - Teste<br>10% - Star<br>10% - Normal Face<br>10% - Shark<br>10% - THE WATCHING EYE<br>8% - Gwa<br>8% - Egg Guy<br>8% - Unsmith<br>8% - Gd Checkpoint<br>8% - Slax" : "+" + format(player.ev2.xpReward) + "."},
            onClick() {
                layers.ev2.dailyReward();
                player.ev2.cooldown = player.ev2.cooldownMax

                if (player.ev2.xpDay)
                {
                    player.ev2.petDay = true
                    player.ev2.xpDay = false
                }
                else
                {
                    player.ev2.xpDay = true
                    player.ev2.petDay = false
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
    },
    dailyReward()
    {
        if (player.ev2.xpDay)
        {
            player.cb.xp = player.cb.xp.add(player.ev2.xpReward)
            callAlert("You gained " + format(player.ev2.xpReward) + " XP!");
        } else if (player.ev2.petDay)
        {
            layers.ev2.dailyRewardPet();
        }

        player.ev2.day = player.ev2.day.add(1)
    },
    dailyRewardPet()
    {
        let rng = Math.random();

        if (rng > 0.95) {
            player.cb.rarePetAmounts[0] = player.cb.rarePetAmounts[0].add(1);
            callAlert("You gained a Nova!", "resources/novaRarePet.png");
        } else if (rng > 0.9)
        {
            player.cb.rarePetAmounts[3] = player.cb.rarePetAmounts[3].add(1);
            callAlert("You gained a Goofy Ahh Thing!", "resources/goofyAhhThingRarePet.png");  
        } else if (rng > 0.8)
        {
            player.cb.uncommonPetAmounts[0] = player.cb.uncommonPetAmounts[0].add(2);
            callAlert("You gained 2 Testes!", "resources/testeUncommonPet.png");  
        }else if (rng > 0.7)
        {
            player.cb.uncommonPetAmounts[1] = player.cb.uncommonPetAmounts[1].add(2);
            callAlert("You gained 2 Stars!", "resources/starUncommonPet.png");  
        }else if (rng > 0.6)
        {
            player.cb.uncommonPetAmounts[2] = player.cb.uncommonPetAmounts[2].add(2);
            callAlert("You gained 2 Normal Faces!", "resources/normalFaceUncommonPet.png");  
        }else if (rng > 0.5)
        {
            player.cb.uncommonPetAmounts[3] = player.cb.uncommonPetAmounts[3].add(2);
            callAlert("You gained 2 Sharks!", "resources/sharkUncommonPet.png");  
        }
        else if (rng > 0.4)
        {
            player.cb.uncommonPetAmounts[4] = player.cb.uncommonPetAmounts[4].add(2);
            callAlert("You gained 2 WATCHING EYES!", "resources/eyeUncommonPet.png");  
        }
        else if (rng > 0.32)
        {
            player.cb.commonPetAmounts[0] = player.cb.commonPetAmounts[0].add(5);
            callAlert("You gained 5 Gwas!", "resources/gwaCommonPet.png");  
        }
        else if (rng > 0.24)
        {
            player.cb.commonPetAmounts[1] = player.cb.commonPetAmounts[1].add(5);
            callAlert("You gained 5 Egg Guys!", "resources/eggCommonPet.png");  
        }
        else if (rng > 0.16)
        {
            player.cb.commonPetAmounts[2] = player.cb.commonPetAmounts[2].add(5);
            callAlert("You gained 5 Unsmith!", "resources/unsmithCommonPet.png");  
        }
        else if (rng > 0.08)
        {
            player.cb.commonPetAmounts[3] = player.cb.commonPetAmounts[3].add(5);
            callAlert("You gained 5 Gd Checkpoints!", "resources/checkpointCommonPet.png");  
        } else
        {
            player.cb.commonPetAmounts[4] = player.cb.commonPetAmounts[4].add(5);
            callAlert("You gained 5 Slaxes!", "resources/slaxCommonPet.png");  
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
    microtabs: {
        stuff: {
            "Daily Reward": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#106ccc',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
        ["raw-html", function () { return !player.ev2.petDay ? "You will gain XP today!" : "You will gain a pet today!" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
    ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "<h2>Day " + formatWhole(player.ev2.day) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "25px"],
                    ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
addLayer("ev4", {
    name: "Sun", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E4", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        offerings: new Decimal(0),
        offeringsBase: new Decimal(1),
        offeringReq: new Decimal(100),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Evolution",
    color: "#febc06",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ev4.offeringReq = player.cb.totalAutomationShards.mul(20).add(100)

        player.ev4.offeringsBase = new Decimal(1)
        player.ev4.offeringsBase = player.ev4.offeringsBase.mul(buyableEffect("ev4", 11))
        player.ev4.offeringsBase = player.ev4.offeringsBase.mul(buyableEffect("ev4", 12))

        if (player.ev4.offerings.gte(player.ev4.offeringReq))
        {
            layers.ev4.gainAutomationShard()
        }
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
    },
    gainAutomationShard()
    {
        let leftover = new Decimal(0)
        leftover = player.ev4.offerings.sub(player.ev4.offeringReq)
        player.cb.automationShards = player.cb.automationShards.add(1)
        player.ev4.offerings = new Decimal(0)
        player.ev4.offerings = player.ev4.offerings.add(leftover)
    },
    bars: {
        bar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 800,
            height: 50,
            progress() {
                return player.ev4.offerings.div(player.ev4.offeringReq)
            },
            fillStyle: {
                "background-color": "#f38004",
            },
            display() {
                return "<h5>" + format(player.ev4.offerings) + "/" + formatWhole(player.ev4.offeringReq) + "<h5> Offerings to gain an automation shard.</h5>";
            },
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(1).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.evolutionShards.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Evolution Offering Boost"
            },
            display() {
                return "which are multiplying offerings by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Evolution Shards"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.evolutionShards = player.cb.evolutionShards.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.evolutionShards, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.evolutionShards = player.cb.evolutionShards.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.paragonShards.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Paragon Offering Boost"
            },
            display() {
                return "which are multiplying offerings by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.paragonShards = player.cb.paragonShards.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.paragonShards, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.cb.paragonShards = player.cb.paragonShards.sub(cost)

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
            "SACRIFICIAL ALTAR": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#febc06',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["bar", "bar"],
                    ["raw-html", function () { return "<h4>(Offerings are gained by sacrificing pets, which you can do in the PETS tab.)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards." }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.paragonShards) + "</h3> paragon shards." }, { "color": "#2842eb", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12]]],
                    ["raw-html", function () { return "Offering multiplier: <h3>" + format(player.ev4.offeringsBase) + "</h3>x" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.automationShards) + "</h3> automation shards. (" + formatWhole(player.cb.totalAutomationShards) + " total)"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
addLayer("ev8", {
    name: "Marcel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E8", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        evoButtonUnlocks: [true,],
        evoButtonTimersMax: [new Decimal(18000),],
        evoButtonTimers: [new Decimal(0),],
        evoButtonBase: [new Decimal(1),],

        paragonButtonUnlocks: [true,],
        paragonButtonTimersMax: [new Decimal(180000),],
        paragonButtonTimers: [new Decimal(0),],
        paragonButtonBase: [new Decimal(1),],
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Evolution",
    color: "grey",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ev8.evoButtonTimersMax = [new Decimal(18000),]
        player.ev8.evoButtonBase = [new Decimal(1),]
        for (let i = 0; i < player.ev8.evoButtonTimersMax.length; i++)
        {
        }
        for (let i = 0; i < player.ev8.evoButtonTimers.length; i++)
        {
            player.ev8.evoButtonTimers[i] = player.ev8.evoButtonTimers[i].sub(onepersec.mul(delta))
        }

        player.ev8.paragonButtonTimersMax = [new Decimal(180000),]
        player.ev8.paragonButtonBase = [new Decimal(1),]
        for (let i = 0; i < player.ev8.paragonButtonTimersMax.length; i++)
        {
        }
        for (let i = 0; i < player.ev8.paragonButtonTimers.length; i++)
        {
            player.ev8.paragonButtonTimers[i] = player.ev8.paragonButtonTimers[i].sub(onepersec.mul(delta))
        }
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },

        //evo
        11: {
            title() { return player.ev8.evoButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.evoButtonTimers[0]) + "." : "<h3>+" + formatWhole(player.ev8.evoButtonBase[0]) + " Evo Shards."},
            canClick() { return player.ev8.evoButtonTimers[0].lt(0) },
            unlocked() { return player.ev8.evoButtonUnlocks[0] },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.ev8.evoButtonBase[0])
                player.ev8.evoButtonTimers[0] = player.ev8.evoButtonTimersMax[0]
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },


        //paragon
        101: {
            title() { return player.ev8.paragonButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.paragonButtonTimers[0]) + "." : "<h3>+" + formatWhole(player.ev8.paragonButtonBase[0]) + " Paragon Shards."},
            canClick() { return player.ev8.paragonButtonTimers[0].lt(0) },
            unlocked() { return player.ev8.paragonButtonUnlocks[0] },
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.add(player.ev8.paragonButtonBase[0])
                player.ev8.paragonButtonTimers[0] = player.ev8.paragonButtonTimersMax[0]
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
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
            "Evo": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': 'grey',} },
                unlocked() { return true },
                content:
                [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards."  }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["clickable", 11]]],
    ]
            },
            "Paragon": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': 'grey',} },
                unlocked() { return true },
                content:
                [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.paragonShards) + "</h3> paragon shards."  }, { "color": "#2842eb", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["clickable", 101]]],
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