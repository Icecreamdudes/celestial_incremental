addLayer("ev", {
    name: "Evolution", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        evolutionDisplayIndex: new Decimal(-1),
        evolutionsUnlocked: [false, false, false, false, false, false, false, false, false, false, false],
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
        9 - Gd Checkpoint
        10 - Eye
        11 - John
        */
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Evolution",
    color: "#06366e",
    update(delta) {
        let onepersec = player.cb.cbTickspeed
    },
    branches: ["branch"],
    clickables: {
        2: {
            title() { return "EVOLVE" },
            canClick() {
                if (layers.ev.evos[player.ev.evolutionDisplayIndex] == undefined ) {
                    return false
                } else {
                    return tmp.ev.evos[player.ev.evolutionDisplayIndex].canClick
                }
            },
            unlocked() { return true },
            onClick() {
                layers.ev.evos[player.ev.evolutionDisplayIndex].onClick()
            },
            style: { width: "200px", minHeight: "100px", border: "3px solid #1500bf", fontSize: "20px", color: "#1500bf", borderRadius: "15px", background: "linear-gradient(90deg, #d487fd, #4b79ff)"},
        },
        100: {
            title() { return "<img src='resources/Pets/goldsmithEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[103].canClick && !player.ev.evolutionsUnlocked[0] },
            tooltip() { return "██████████ ████ ██ █████ ██<br>multiply ██ gain" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(0)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #AB791E", borderRadius: "0px", padding: "0px" },
        },
        101: {
            title() { return "<img src='resources/Pets/mrRedSharkEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[204].canClick && !player.ev.evolutionsUnlocked[1] },
            tooltip() { return "████████ ███ efficiency ██ XP<br>███████" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(1)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #730001", borderRadius: "0px", padding: "0px" },
        },
        102: {
            title() { return "<img src='resources/Pets/insaneFaceEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[203].canClick && !player.ev.evolutionsUnlocked[2] && (player.in.unlockedInfinity || player.s.highestSingularityPoints.gt(0))},
            tooltip() { return "Gives ███ daily ███████" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(2)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #00188F", borderRadius: "0px", padding: "0px" },
        },
        103: {
            title() { return "<img src='resources/Pets/voidGwaEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[101].canClick && !player.ev.evolutionsUnlocked[3] && (player.in.unlockedBreak || player.s.highestSingularityPoints.gt(0))},
            tooltip() { return "Unlocks █████ Negative ████████" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(3)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #000000", borderRadius: "0px", padding: "0px" },
        },
        104: {
            title() { return "<img src='resources/Pets/sunEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[202].canClick && !player.ev.evolutionsUnlocked[4] && player.cb.highestLevel.gte(250)},
            tooltip() { return "██ ██████ automation ███████<br>sacrifices" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(4)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #FF3000", borderRadius: "0px", padding: "0px" },
        },
        105: {
            title() { return "<img src='resources/Pets/d20EvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[302].canClick && !player.ev.evolutionsUnlocked[5] && player.cb.highestLevel.gte(250)},
            tooltip() { return "██-unlock █ previous ████████,<br>███████████" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(5)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #005C34", borderRadius: "0px", padding: "0px" },
        },
        106: {
            title() { return "<img src='resources/Pets/mutantSpiderEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[106].canClick && !player.ev.evolutionsUnlocked[6] && (player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23))},
            tooltip() { return "██████ ███ halt ███████ options" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(6)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #0C0047", borderRadius: "0px", padding: "0px" },
        },
        107: {
            title() { return "<img src='resources/Pets/moonEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[303].canClick && !player.ev.evolutionsUnlocked[7] && (hasUpgrade("bi", 24) || player.s.highestSingularityPoints.gt(0))},
            tooltip() { return "██████ ███ grass ███, █████<br>█████ buffs" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(7)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #666666", borderRadius: "0px", padding: "0px" },
        },
        108: {
            title() { return "<img src='resources/Pets/marcelAcoplaoEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[206].canClick && !player.ev.evolutionsUnlocked[8] && (hasUpgrade("bi", 24) || player.s.highestSingularityPoints.gt(0))},
            tooltip() { return "Gain ███ █████ shards ██ ████<br>█████ back ███████" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(8)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #432D4A", borderRadius: "0px", padding: "0px" },
        },
        109: {
            title() { return "<img src='resources/Pets/paragonCheckpointEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[104].canClick && !player.ev.evolutionsUnlocked[9] && hasMilestone("s", 12)},
            tooltip() { return "██████ █ ███ way ██ ████<br>offerings, ███ more ██████████" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(9)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #2CA400", borderRadius: "0px", padding: "0px" },
        },
        110: {
            title() { return "<img src='resources/Pets/eyeEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[205].canClick && !player.ev.evolutionsUnlocked[10] && hasMilestone("s", 12)},
            tooltip() { return "█████████ shards ██ speed ██<br>█████ back" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(10)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #3F3F3F", borderRadius: "0px", padding: "0px" },
        },
        111: {
            title() { return "<img src='resources/evoShard.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[209].canClick && !player.ev.evolutionsUnlocked[11] && player.ir.unlocked},
            tooltip() { return "██████ buttons ███ █████ battle █████████" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(11)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #3F007F", borderRadius: "0px", padding: "0px" },
        },

        201: {
            title() { return "<img src='resources/Pets/cookie/simpleCookieEvo.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[403].canClick && player.ep2.obtainedShards && getLevelableAmount("pet", 2001).lt(1)},
            tooltip() { return "Pet █████████ ████ multiply ███" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(101)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #16364a", borderRadius: "0px", padding: "0px" },
        },
        202: {
            title() { return "<img src='resources/Pets/cookie/goldenCookieEvo.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[403].canClick && player.ep2.obtainedShards && hasUpgrade("s", 21) && getLevelableAmount("pet", 2002).lt(1)},
            tooltip() { return "██████ ███ golden ██████ upgrades" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(102)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #16364a", borderRadius: "0px", padding: "0px" },
        },
        203: {
            title() { return "<img src='resources/Pets/cookie/wrathCookieEvo.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[403].canClick && player.ep2.obtainedShards && player.ma.matosUnlock && getLevelableAmount("pet", 2002).gte(1) && getLevelableAmount("pet", 2003).lt(1)},
            tooltip() { return "██████ ███ wrath ██████ upgrades" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(103)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #16364a", borderRadius: "0px", padding: "0px" },
        },
    },
    evos: {
        0: {
            title() { return "Unsmith" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/4 Evolution Shards" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 101)) + "/3 Gwa Level" + 
                "<br>"  + formatWhole(getLevelableAmount("pet", 102)) + "/3 Egg Guy Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 103)) + "/6 Unsmith Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 104)) + "/3 Gd Checkpoint Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 105)) + "/3 Slax Level" +
                "<br>"  + formatWhole(player.pet.highestDicePetCombo) + "/2 Highest Dice Pet Combo"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(4) && getLevelableAmount("pet", 101).gte(3) && getLevelableAmount("pet", 102).gte(3)
                && getLevelableAmount("pet", 103).gte(6) && getLevelableAmount("pet", 104).gte(3) && getLevelableAmount("pet", 105).gte(3)
                && player.pet.highestDicePetCombo.gte(2))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(4)

                player.ev.evolutionsUnlocked[0] = true
                setLevelableAmount("pet", 1103, new Decimal(1))
            }
        },
        1: {
            title() { return "Shark" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/6 Evolution Shards" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 201)) + "/2 Teste Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 202)) + "/2 Star Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 203)) + "/2 Normal Face Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 204)) + "/4 Shark Level Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 205)) + "/2 THE WATCHING EYE Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 303)) + "/1 Drippy Ufo Level"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(6) && getLevelableAmount("pet", 201).gte(2) && getLevelableAmount("pet", 202).gte(2)
                && getLevelableAmount("pet", 203).gte(2) && getLevelableAmount("pet", 204).gte(4) && getLevelableAmount("pet", 205).gte(2)
                && getLevelableAmount("pet", 303).gte(1))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(6)

                player.ev.evolutionsUnlocked[1] = true
                setLevelableAmount("pet", 1204, new Decimal(1))
            }
        },
        2: {
            title() { return "Normal Face" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/10 Evolution Shards" +
                "<br>"  + formatWhole(player.ip.diceRuns) + "/10 Dice Runs" +
                "<br>"  + formatWhole(player.ip.rocketFuelRuns) + "/10 Rocket Fuel Runs" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 301)) + "/2 Nova Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 304)) + "/2 Goofy Ahh Thing Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 203)) + "/6 Normal Face Level"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(10) && player.ip.diceRuns.gte(10) && player.ip.rocketFuelRuns.gte(10)
                && getLevelableAmount("pet", 301).gte(2) && getLevelableAmount("pet", 304).gte(2) && getLevelableAmount("pet", 203).gte(6))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(10)

                player.ev.evolutionsUnlocked[2] = true
                setLevelableAmount("pet", 1203, new Decimal(1))
            }
        },
        3: {
            title() { return "Gwa" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/8 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.petPoints) + "/500 Pet Points" +
                "<br>"  + formatWhole(player.ip.diceRuns) + "/2,000 Dice Runs" +
                "<br>"  + formatWhole(player.ip.rocketFuelRuns) + "/2,000 Rocket Fuel Runs" +
                "<br>"  + formatWhole(player.ip.hexRuns) + "/2,000 Hex Runs" +
                "<br>"  + formatWhole(player.points) + "/1e550 Celestial Points" +
                "<br>"  + formatWhole(player.bi.brokenInfinities) + "/50,000 Broken Infinities" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 101)) + "/10 Gwa Level"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(8) && player.ip.diceRuns.gte(2000) && player.ip.rocketFuelRuns.gte(2000)
                && player.ip.hexRuns.gte(2000) && player.points.gte("1e550") && player.bi.brokenInfinities.gte(50000)
                && player.cb.petPoints.gte(500) && getLevelableAmount("pet", 101).gte(10))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(8)
                player.cb.petPoints = player.cb.petPoints.sub(500)
                player.bi.brokenInfinities = player.bi.brokenInfinities.sub(50000)

                player.ev.evolutionsUnlocked[3] = true
                setLevelableAmount("pet", 1101, new Decimal(1))
            }
        },
        4: {
            title() { return "Star" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/20 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/1 Paragon Shard" +
                "<br>"  + formatWhole(player.cb.petPoints) + "/250 Pet Points" +
                "<br>"  + formatWhole(player.in.infinityPoints) + "/1e11 Infinity Points" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 201)) + "/4 Teste Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 202)) + "/8 Star Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 203)) + "/4 Normal Face Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 204)) + "/4 Shark Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 205)) + "/4 THE WATCHING EYE Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 206)) + "/2 Clock Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 207)) + "/2 Trollface Level"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(20) && player.cb.paragonShards.gte(1) && player.cb.petPoints.gte(250)
                && player.in.infinityPoints.gte(1e11) && getLevelableAmount("pet", 201).gte(4) && getLevelableAmount("pet", 202).gte(8)
                && getLevelableAmount("pet", 203).gte(4) && getLevelableAmount("pet", 204).gte(4) && getLevelableAmount("pet", 201).gte(5)
                && getLevelableAmount("pet", 206).gte(2) && getLevelableAmount("pet", 207).gte(2))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(20)
                player.cb.paragonShards = player.cb.paragonShards.sub(1)
                player.cb.petPoints = player.cb.petPoints.sub(250)
                player.in.infinityPoints = player.in.infinityPoints.sub(1e11)

                player.ev.evolutionsUnlocked[4] = true
                setLevelableAmount("pet", 1202, new Decimal(1))
            }
        },
        5: {
            title() { return "Dice" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/25 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/1 Paragon Shard" +
                "<br>"  + format(player.cb.XPBoost) + "/7.00 XPBoost" +
                "<br>"  + formatWhole(player.ta.highestDicePoints) + "/1e45 Highest Dice Points" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 1103)) + "/6 Goldsmith Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 1204)) + "/3 MrRedShark Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 1203)) + "/3 Insane Face Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 302)) + "/3 Dice Level"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(25) && player.cb.paragonShards.gte(1) && player.ta.highestDicePoints.gte(1e45)
                && getLevelableAmount("pet", 1103).gte(6) && getLevelableAmount("pet", 1204).gte(3) && getLevelableAmount("pet", 1203).gte(3)
                && player.cb.XPBoost.gte(7) && getLevelableAmount("pet", 302).gte(3))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(25)
                player.cb.paragonShards = player.cb.paragonShards.sub(1)

                player.ev.evolutionsUnlocked[5] = true
                setLevelableAmount("pet", 1302, new Decimal(1))
            }
        },
        6: {
            title() { return "Spider" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/80 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/20 Paragon Shards" +
                "<br>"  + formatWhole(player.cb.XPBoost) + "/10,000 XPBoost"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(80) && player.cb.paragonShards.gte(20) && player.cb.XPBoost.gte(10000))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(80)
                player.cb.paragonShards = player.cb.paragonShards.sub(20)
                player.cb.XPBoost = player.cb.XPBoost.sub(10000)

                player.ev.evolutionsUnlocked[6] = true
                setLevelableAmount("pet", 1106, new Decimal(1))
            }
        },
        7: {
            title() { return "Drippy Ufo" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/25 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/2 Paragon Shards" +
                "<br>"  + formatWhole(player.cb.totalAutomationShards) + "/3 Total Automation Shards" +
                "<br>"  + formatWhole(player.g.goldGrass) + "/1e12 Golden Grass" +
                "<br>"  + formatWhole(player.rf.rocketFuel) + "/1e80 Rocket Fuel"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(25) && player.cb.paragonShards.gte(2) && player.cb.totalAutomationShards.gte(3)
                && player.g.goldGrass.gte(1e12) && player.rf.rocketFuel.gte(1e80))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(25)
                player.cb.paragonShards = player.cb.paragonShards.sub(2)
                player.g.goldGrass = player.g.goldGrass.sub(1e12)
                player.rf.rocketFuel = player.rf.rocketFuel.sub(1e80)

                player.ev.evolutionsUnlocked[7] = true
                setLevelableAmount("pet", 1303, new Decimal(1))
            }
        },
        8: {
            title() { return "Clock" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/30 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/1 Paragon Shards" +
                "<br>"  + formatWhole(player.cb.level) + "/1,500 Check Back Levels" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 206)) + "/6 Clock Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 207)) + "/6 Trollface Level" +
                "<br>"  + formatWhole(player.ca.rememberanceCores) + "/5 Rememberance Cores"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(30) && player.cb.paragonShards.gte(1) && player.cb.level.gte(1500)
                && getLevelableAmount("pet", 206).gte(6) && getLevelableAmount("pet", 207).gte(6) && player.ca.rememberanceCores.gte(5))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(30)
                player.cb.paragonShards = player.cb.paragonShards.sub(1)
                player.cb.level = player.cb.level.sub(1500)
                player.ca.rememberanceCores = player.ca.rememberanceCores.sub(5)

                player.ev.evolutionsUnlocked[8] = true
                setLevelableAmount("pet", 1206, new Decimal(1))
            }
        },
        9: {
            title() { return "Gd Checkpoint" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/60 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/10 Paragon Shards" +
                "<br>"  + format(player.points) + "/1e200,000 Celestial Points" +
                "<br>"  + formatWhole(player.g.goldGrass) + "/1e30 Golden Grass" +
                "<br>"  + formatWhole(player.g.moonstone) + "/2,000 Moonstone" +
                "<br>"  + formatWhole(player.cp.replicantiPoints) + "/1e250 Replicanti Points" +
                "<br>"  + formatWhole(player.ca.replicantiGalaxies) + "/15 Replicanti Galaxies" + 
                "<br>"  + formatWhole(player.cs.scraps.checkback.amount) + "/100 Check Back Core Scraps"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(60) && player.cb.paragonShards.gte(10) && player.points.gte("1e200000")
                && player.g.goldGrass.gte(1e30) && player.g.moonstone.gte(2000) && player.cp.replicantiPoints.gte(1e250)
                && player.ca.replicantiGalaxies.gte(15) && player.cs.scraps.checkback.amount.gte(100))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(60)
                player.cb.paragonShards = player.cb.paragonShards.sub(10)
                player.ca.replicantiGalaxies = player.ca.replicantiGalaxies.sub(15)
                player.g.goldGrass = player.g.goldGrass.sub(1e30)
                player.g.moonstone = player.g.moonstone.sub(2000)
                player.cs.scraps.checkback.amount = player.cs.scraps.checkback.amount.sub(100)

                player.ev.evolutionsUnlocked[9] = true
                setLevelableAmount("pet", 1104, new Decimal(1))
            }
        },
        10: {
            title() { return "THE WATCHING EYE" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/40 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/5 Paragon Shards" +
                "<br>"  + formatWhole(player.cb.level) + "/15,000 Check Back Levels" +
                "<br>"  + formatWhole(player.cb.XPBoost) + "/1,000 XPBoost" +
                "<br>"  + formatWhole(player.cb.petPoints) + "/10,000 Pet Points" +
                "<br>"  + formatWhole(player.ev2.day) + "/12 Days of Daily Rewards"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(40) && player.cb.paragonShards.gte(5) && player.cb.level.gte(15000)
                && player.cb.XPBoost.gte(1000) && player.cb.petPoints.gte(10000) && player.ev2.day.gte(12))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(40)
                player.cb.paragonShards = player.cb.paragonShards.sub(5)
                player.cb.level = player.cb.level.sub(15000)
                player.cb.XPBoost = player.cb.XPBoost.sub(1000)
                player.cb.petPoints = player.cb.petPoints.sub(10000)

                player.ev.evolutionsUnlocked[10] = true
                setLevelableAmount("pet", 1205, new Decimal(1))
            }
        },
        11: {
            title() { return "Captain" },
            description() {
                return formatWhole(player.cb.evolutionShards) + "/60 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/12 Paragon Shards" +
                "<br>"  + formatWhole(player.fi.temporalShards) + "/12 Temporal Shards" +
                "<br>"  + formatWhole(player.au2.stars) + "/2.5e10 Stars" +
                "<br>"  + formatWhole(player.oi.oil) + "/1e400 Oil"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(60) && player.cb.paragonShards.gte(12) && player.fi.temporalShards.gte(12)
                && player.au2.stars.gte("2.5e10") && player.oi.oil.gte("1e400"))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(60)
                player.cb.paragonShards = player.cb.paragonShards.sub(12)
                player.fi.temporalShards = player.fi.temporalShards.sub(12)
                player.au2.stars = player.au2.stars.sub("2.5e10")
                player.oi.oil = player.oi.oil.sub("1e400")

                player.ev.evolutionsUnlocked[11] = true
                setLevelableAmount("pet", 1209, new Decimal(1))
            }
        },

        101: {
            title() { return "Simple Cookie" },
            description() {
                return formatWhole(player.ep2.chocoShards) + "/1 Chocolate Shard" +
                "<br>" + formatWhole(player.cb.petPoints) + "/1,000 Pet Points" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 403)) + "/2 Cookie Levels" +
                "<br>" + formatWhole(player.ca.rememberanceCores) + "/10 Rememberance Cores"
            },
            canClick() {
                return (player.ep2.chocoShards.gte(1) && player.cb.petPoints.gte(1000) && player.ca.rememberanceCores.gte(10)
                && getLevelableAmount("pet", 403).gte(2))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.ep2.chocoShards = player.ep2.chocoShards.sub(1)
                player.cb.petPoints = player.cb.petPoints.sub(1000)
                player.ca.rememberanceCores = player.ca.rememberanceCores.sub(10)

                setLevelableAmount("pet", 2001, new Decimal(1))
            }
        },
        102: {
            title() { return "Golden Cookie" },
            description() {
                return formatWhole(player.ep2.chocoShards) + "/2 Chocolate Shards" +
                "<br>" + formatWhole(player.cb.petPoints) + "/2,777 Pet Points" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 403)) + "/4 Cookie Levels" +
                "<br>" + formatWhole(player.ca.rememberanceCores) + "/17 Remembrance Cores" +
                "<br>" + formatWhole(player.sma.starmetalAlloy) + "/777 Starmetal Alloy"
            },
            canClick() {
                return (player.ep2.chocoShards.gte(2) && player.cb.petPoints.gte(2777) && player.ca.rememberanceCores.gte(17)
                && player.sma.starmetalAlloy.gte(777) && getLevelableAmount("pet", 403).gte(3))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.ep2.chocoShards = player.ep2.chocoShards.sub(2)
                player.cb.petPoints = player.cb.petPoints.sub(2777)
                player.ca.rememberanceCores = player.ca.rememberanceCores.sub(17)
                player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(777)

                setLevelableAmount("pet", 2002, new Decimal(1))
            }
        },
        103: {
            title() { return "Wrath Cookie" },
            description() {
                return formatWhole(player.ep2.chocoShards) + "/6 Chocolate Shards" +
                "<br>" + formatWhole(player.cb.petPoints) + "/6,666 Pet Points" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 403)) + "/6 Cookie Levels" +
                "<br>" + formatWhole(player.ca.rememberanceCores) + "/36 Remembrance Cores" +
                "<br>" + formatWhole(player.ma.commonMatosFragments) + "/6,666 Common Matos Fragments" +
                "<br>" + formatWhole(player.ma.rareMatosFragments) + "/666 Rare Matos Fragments" +
                "<br>" + formatWhole(player.ma.epicMatosFragments) + "/66 Epic Matos Fragments" +
                "<br>" + formatWhole(player.ma.legendaryMatosFragments) + "/6 Legendary Matos Fragments"
                
            },
            canClick() {
                return (player.ep2.chocoShards.gte(6) && player.cb.petPoints.gte(6666) && player.ca.rememberanceCores.gte(36)
                && player.ma.commonMatosFragments.gte(6666) && player.ma.rareMatosFragments.gte(666) && player.ma.epicMatosFragments.gte(66)
                && player.ma.legendaryMatosFragments.gte(6) && getLevelableAmount("pet", 403).gte(6))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.ep2.chocoShards = player.ep2.chocoShards.sub(6)
                player.cb.petPoints = player.cb.petPoints.sub(6666)
                player.ca.rememberanceCores = player.ca.rememberanceCores.sub(36)
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.sub(6666)
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.sub(666)
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.sub(66)

                setLevelableAmount("pet", 2003, new Decimal(1))
            }
        },
    },
    bars: {
        pityEvoBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 325,
            height: 50,
            progress() {
                return player.cb.pityEvoCurrent.div(player.cb.pityMax)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {
                "background-color": "#d487fd",
            },
            display() {
                return "<h5>" + format(player.cb.pityEvoCurrent) + "/" + formatWhole(player.cb.pityMax) + "<h5> Pity until Evolution Shard.</h5>";
            },
        },
        pityParaBar: {
            unlocked() { return player.cb.highestLevel.gte(250) },
            direction: RIGHT,
            width: 325,
            height: 50,
            progress() {
                return player.cb.pityParaCurrent.div(player.cb.pityMax)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {
                "background-color": "#4C64FF",
            },
            display() {
                return "<h5>" + format(player.cb.pityParaCurrent) + "/" + formatWhole(player.cb.pityMax) + "<h5> Pity until Paragon Shard.</h5>";
            },
        },
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["blank", "10px"],
        ["style-row", [
            ["style-column", [
                ["row", [["bar", "pityEvoBar"]]],
                ["blank", "5px"],
                ["raw-html", "<h5>Gained from failing to obtain Evo Shards.", { "color": "#d487fd", "font-size": "16px", "font-family": "monospace" }],
                ["raw-html", "<h5>Reset when you gain uncertain Evo Shards.", { "color": "#d487fd", "font-size": "16px", "font-family": "monospace" }],        
            ], {padding: "5px"}],
            ["style-column", [
                ["row", [["bar", "pityParaBar"]]],
                ["blank", "5px"],
                ["raw-html", "<h5>Gained from failing to obtain Para Shards.", { "color": "#4C64FF", "font-size": "16px", "font-family": "monospace" }],
                ["raw-html", "<h5>Reset when you gain uncertain Para Shards.", { "color": "#4C64FF", "font-size": "16px", "font-family": "monospace" }],
            ], () => { return player.cb.highestLevel.gte(250) ? {padding: "5px", borderLeft: "2px solid white"} : {display: "none !important"}}],
        ], () => { return player.cb.highestLevel.gte(250) ? {width: "680px", border: "2px solid white", borderRadius: "10px", backgroundColor: "black"} : {width: "340px", border: "2px solid white", borderRadius: "10px", backgroundColor: "black"} }],
        ["blank", "10px"],
        ["style-column", [
            ["scroll-column", [
                ["blank", "10px"],
                ["raw-html", function () { return "Current Evolutions"}, {color: "#4b79ff", fontSize: "36px", fontFamily: "monospace"}],
                ["blank", "10px"],
                ["row", [
                    ["bt-clickable", 100], ["bt-clickable", 101], ["bt-clickable", 102], ["bt-clickable", 103], ["bt-clickable", 104],
                    ["bt-clickable", 105], ["bt-clickable", 107], ["bt-clickable", 108], ["bt-clickable", 109], ["bt-clickable", 110],
                    ["bt-clickable", 106], ["bt-clickable", 111],

                    ["bt-clickable", 201], ["bt-clickable", 202], ["bt-clickable", 203]
                ]],
                ["blank", "10px"],
                ["raw-html", function () {
                    if (player.ev.evolutionDisplayIndex == -1) {
                        return "No Pet Selected"
                    } else {
                        return tmp.ev.evos[player.ev.evolutionDisplayIndex].title
                    }
                }, {color: "#4b79ff", fontSize: "32px", fontFamily: "monospace"}],
                ["raw-html", function () {
                    if (player.ev.evolutionDisplayIndex == -1) {
                        return ""
                    } else {
                        return tmp.ev.evos[player.ev.evolutionDisplayIndex].description
                    }
                }, {color: "#4b79ff", fontSize: "28px", fontFamily: "monospace"}],
                ["blank", "10px"],
            ], {width: "680px", height: "525px", overflowX: "hidden"}],
            ["style-column", [["clickable", 2]], {width: "680px", height: "125px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "0px 0px 10px 10px"}],
        ], {width: "680px", height: "650px", border: "2px solid white", borderRadius: "10px", background: "linear-gradient(90deg, #5C1E7E, #1E3066)"}],
    ],
    layerShown() { return false }
})
addLayer("ev0", {
    name: "Goldsmith", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Gs", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        coinDust: new Decimal(0),
        coinDustEffect: new Decimal(1),
        coinDustPerSecond: new Decimal(0),

        coinShards: new Decimal(0),
        coinShardEffect: new Decimal(0),
        coinShardsPerSecond: new Decimal(0),
    }},
    automate() {},
    nodeStyle: {
        background: "linear-gradient(90deg, #e7c97c, #fad25a)",
		backgroundOrigin: "border-box",
		borderColor: "#655421",
		color: "#655421"
    },
    tooltip: "Goldsmith",
    color: "white",
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        if (player.ev.evolutionsUnlocked[0]) player.ev0.coinDust = player.ev0.coinDust.add(player.ev0.coinDustPerSecond.mul(delta))

        if (!player.ev.evolutionsUnlocked[0]) player.ev0.coinDustPerSecond = new Decimal(0)
        if (player.ev.evolutionsUnlocked[0]) player.ev0.coinDustPerSecond = levelableEffect("pet", 1103)[1].div(3600)
        player.ev0.coinDustPerSecond = player.ev0.coinDustPerSecond.mul(buyableEffect("ev0", 11))
        player.ev0.coinDustPerSecond = player.ev0.coinDustPerSecond.mul(player.ev0.coinShardEffect)
        player.ev0.coinDustPerSecond = player.ev0.coinDustPerSecond.mul(buyableEffect("ev0", 18))

        if (player.ev0.coinDust.lt(1)) player.ev0.coinDustEffect = player.ev0.coinDust.mul(0.05).add(1)
        if (player.ev0.coinDust.gte(1)) player.ev0.coinDustEffect = player.ev0.coinDust.pow(0.3).mul(0.05).add(1)
        if (hasUpgrade("cs", 1201)) player.ev0.coinDustEffect = player.ev0.coinDust.pow(0.35).mul(0.05).add(1)

        player.ev0.coinShardsPerSecond = buyableEffect("ev0", 15)
        player.ev0.coinShardsPerSecond = player.ev0.coinShardsPerSecond.mul(buyableEffect("ev0", 16))
        player.ev0.coinShardsPerSecond = player.ev0.coinShardsPerSecond.mul(buyableEffect("ev0", 17))

        player.ev0.coinShards = player.ev0.coinShards.add(player.ev0.coinShardsPerSecond.mul(delta))

        player.ev0.coinShardEffect = player.ev0.coinShards.pow(0.4).add(1)
    },
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {
        11: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return "Coin Dust Booster"
            },
            display() {
                return "which are boosting coin dust gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy(mult) {
                let base = new Decimal(0.1)
                let growth = 1.2
                if (mult != true)
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
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
        },
        12: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return "XP Button Cool Down"
            },
            display() {
                return "which are dividing xp button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy(mult) {
                let base = new Decimal(0.25)
                let growth = 1.25
                if (mult != true)
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
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
        },
        13: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.6) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return "Pet Button Cool Down"
            },
            display() {
                return "which are dividing pet button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy(mult) {
                let base = new Decimal(0.6)
                let growth = 1.3
                if (mult != true)
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
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
        },
        14: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(1.5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return "Rare Pet Button Cool Down"
            },
            display() {
                return "which are dividing pet button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy(mult) {
                let base = new Decimal(1.5)
                let growth = 1.3
                if (mult != true)
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
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
        },
        15: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(6).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return true },
            canAfford() { return player.cb.evolutionShards.gte(this.cost()) },
            title() {
                return "Shard Generator E"
            },
            display() {
                return "which are producing +" + format(tmp[this.layer].buyables[this.id].effect) + " Coin Shards Per Second.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Evolution Shards"
            },
            buy(mult) {
                let base = new Decimal(6)
                let growth = 1.3
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base).floor()
                    player.cb.evolutionShards = player.cb.evolutionShards.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.cb.evolutionShards, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.evolutionShards = player.cb.evolutionShards.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
        },
        16: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(2).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.paragonShards.gte(this.cost()) },
            title() {
                return "Shard Generator P"
            },
            display() {
                return "which are multiplying coin shard gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards"
            },
            buy(mult) {
                let base = new Decimal(2)
                let growth = 1.2
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base).floor()
                    player.cb.paragonShards = player.cb.paragonShards.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.cb.paragonShards, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.paragonShards = player.cb.paragonShards.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
        },
        17: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(500).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinDust.gte(this.cost()) },
            title() {
                return "Shard Generator C"
            },
            display() {
                return "which are multiplying coin shard gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy(mult) {
                let base = new Decimal(500)
                let growth = 1.35
                if (mult != true)
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
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
        },
        18: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(10).floor() },
            effect(x) { return new Decimal.pow(2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            canAfford() { return player.ev0.coinShards.gte(this.cost()) },
            title() {
                return "Coin Dust Doubler"
            },
            display() {
                return "which are multiplying coin dust gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Shards"
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 10
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ev0.coinShards = player.ev0.coinShards.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ev0.coinShards, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ev0.coinShards = player.ev0.coinShards.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return {color: "#655421", borderColor: "#655421", background: "linear-gradient(90deg, #e7c97c, #fad25a)", borderRadius: "5px"}},
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]], {maxWidth: "1200px"}],
                ]
            },
            "Coin Shards": {
                buttonStyle() { return {color: "#655421", borderColor: "#655421", background: "linear-gradient(90deg, #e7c97c, #fad25a)", borderRadius: "5px"}},
                unlocked() { return player.cb.highestLevel.gte(250) },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["blank", "10px"],
        ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/coinDust.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => {
                    if (player.ev0.coinDustPerSecond.lt(0.01)) {
                        return formatShort(player.ev0.coinDust) + "<br>" + formatShort(player.ev0.coinDustPerSecond.mul(3600)) + "/h"
                    } else {
                        return formatShort(player.ev0.coinDust) + "<br>" + formatShort(player.ev0.coinDustPerSecond) + "/s"
                    }
                }, {width: "93px", height: "50px", color: "#e7c97c", display: "inline-flex", alignItems: "center", textAlign: "start", paddingLeft: "5px"}],
                ["raw-html", () => { return "<div class='bottomTooltip'>Coin Dust<hr><small>x" + formatShort(player.ev0.coinDustEffect) + " Check Back XP</small></div>"}],
            ], () => {return !player.cb.highestLevel.gte(250) ? {width: "148px", height: "50px"} : {width: "148px", height: "50px", borderRight: "2px solid white"} }],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/coinShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShort(player.ev0.coinShards) + "<br>" + formatShort(player.ev0.coinShardsPerSecond) + "/s"}, {width: "93px", height: "50px", color: "#e7c97c", display: "inline-flex", alignItems: "center", textAlign: "start", paddingLeft: "5px"}],
                ["raw-html", () => { return "<div class='bottomTooltip'>Coin Shards<hr><small>x" + format(player.ev0.coinShardEffect) + " Coin Dust</small></div>"}],
            ], () => {return player.cb.highestLevel.gte(250) ? {width: "148px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"} }],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], () => {return player.cb.highestLevel.gte(250) ? {width: "148px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"} }],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], () => {return player.cb.highestLevel.gte(250) ? {width: "150px", height: "50px"} : {display: "none !important"}}],
        ], () => { return player.cb.highestLevel.gte(250) ? {width: "600px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"} : {width: "148px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"} }],
        ["blank", "10px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[0] }
})
addLayer("ev1", {
    name: "MrRedShark", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Rs", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle: {
        background: "linear-gradient(140deg, #b00000 0%, #bda500 50%, #b00000 100%)",
		backgroundOrigin: "border-box",
		borderColor: "#750000"
    },
    tooltip: "MrRedShark",
    color: "white",
    update(delta) {
        let onepersec = player.cb.cbTickspeed
    },
    clickables: {
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '50px', borderRadius: "10px 0px 0px 10px" }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', borderRadius: "0px 10px 10px 0px" }
        },
    },
    bars: {},
    upgrades: {},
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
            style: { width: '200px', height: '65px', borderRadius: "10px 0px 0px 10px"}
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
            style: { width: '200px', height: '65px', borderRadius: "0px 10px 10px 0px" }
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
            style: { width: '200px', height: '65px', borderRadius: "10px 0px 0px 10px" }
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
            style: { width: '200px', height: '65px', borderRadius: "0px 10px 10px 0px" }
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
            style: { width: '200px', height: '65px', borderRadius: "10px 0px 0px 10px" }
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
            style: { width: '200px', height: '65px', borderRadius: "0px 10px 10px 0px" }
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
            style: { width: '200px', height: '65px', borderRadius: "10px 0px 0px 10px" }
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
            style: { width: '200px', height: '65px', borderRadius: "0px 10px 10px 0px" }
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
            style: { width: '200px', height: '65px', borderRadius: "10px 0px 0px 10px" }
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
            style: { width: '200px', height: '65px', borderRadius: "0px 10px 10px 0px" }
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
            style: { width: '200px', height: '65px', borderRadius: "10px 0px 0px 10px" }
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
            style: { width: '200px', height: '65px', borderRadius: "0px 10px 10px 0px" }
        },
        25: {
            cost(x) { return new Decimal(1.24).pow(x || getBuyableAmount(this.layer, this.id)).mul(16) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return player.cb.highestLevel.gte(65) },
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
            style: { width: '200px', height: '65px', borderRadius: "10px 0px 0px 10px" }
        },
        26: {
            cost(x) { return new Decimal(1.48).pow(x || getBuyableAmount(this.layer, this.id)).mul(16) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return player.cb.highestLevel.gte(65) },
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
            style: { width: '200px', height: '65px', borderRadius: "0px 10px 10px 0px" }
        },
        27: {
            cost(x) { return new Decimal(1.26).pow(x || getBuyableAmount(this.layer, this.id)).mul(30) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return player.cb.highestLevel.gte(150) },
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
            style: { width: '200px', height: '65px', borderRadius: "10px 0px 0px 10px" }
        },
        28: {
            cost(x) { return new Decimal(1.52).pow(x || getBuyableAmount(this.layer, this.id)).mul(30) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return player.cb.highestLevel.gte(150) },
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
            style: { width: '200px', height: '65px', borderRadius: "0px 10px 10px 0px" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["blank", "10px"],
        ["tooltip-row", [
            ["raw-html", "<img src='resources/petPoint.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
            ["raw-html", () => { return formatShort(player.cb.petPoints)}, {width: "95px", height: "50px", color: "#A2D800", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
            ["raw-html", "<div class='bottomTooltip'>Pet Points<hr><small>(Gained from rare pet buttons)</small></div>"],
        ], {width: "150px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
        ["blank", "25px"],
        ["row", [["clickable", 2], ["clickable", 3]]],
        ["blank", "25px"],
        ["style-row", [
            ["style-column", [
                ["style-column", [
                    ["raw-html", function () { return "Button 1 Base: " + format(player.cb.buttonBaseXP[0]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Button 1 Cooldown: " + formatTime(player.cb.buttonTimersMax[0]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {height: "65px"}],
                ["style-column", [
                    ["raw-html", function () { return "Button 2 Base: " + format(player.cb.buttonBaseXP[1]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Button 2 Cooldown: " + formatTime(player.cb.buttonTimersMax[1]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {height: "65px"}],
                ["style-column", [
                    ["raw-html", function () { return "Button 3 Base: " + format(player.cb.buttonBaseXP[2]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Button 3 Cooldown: " + formatTime(player.cb.buttonTimersMax[2]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {height: "65px"}],
                ["style-column", [
                    ["raw-html", function () { return "Button 4 Base: " + format(player.cb.buttonBaseXP[3]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Button 4 Cooldown: " + formatTime(player.cb.buttonTimersMax[3]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {height: "65px"}],
                ["style-column", [
                    ["raw-html", function () { return "Button 5 Base: " + format(player.cb.buttonBaseXP[4]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Button 5 Cooldown: " + formatTime(player.cb.buttonTimersMax[4]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {height: "65px"}],
                ["style-column", [
                    ["raw-html", function () { return "Button 6 Base: " + format(player.cb.buttonBaseXP[5]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Button 6 Cooldown: " + formatTime(player.cb.buttonTimersMax[5]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {height: "65px"}],
                ["style-column", [
                    ["raw-html", function () { return "Button 7 Base: " + format(player.cb.buttonBaseXP[6]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Button 7 Cooldown: " + formatTime(player.cb.buttonTimersMax[6]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {height: "65px"}],
                ["style-column", [
                    ["raw-html", function () { return "Button 8 Base: " + format(player.cb.buttonBaseXP[7]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Button 8 Cooldown: " + formatTime(player.cb.buttonTimersMax[7]) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ], {height: "65px"}],
            ], {width: "375px"}],
            ["style-column", [
                ["buyable", 13], ["buyable", 15], ["buyable", 17], ["buyable", 11], ["buyable", 21], ["buyable", 23], ["buyable", 25], ["buyable", 27]
            ], {width: "200px"}],
            ["style-column", [
                ["buyable", 14], ["buyable", 16], ["buyable", 18], ["buyable", 12], ["buyable", 22], ["buyable", 24], ["buyable", 26], ["buyable", 28]
            ], {width: "200px"}],
        ], {width: "775px"}],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[1] }
})
addLayer("ev2", {
    name: "Insane Face", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "If", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        day: new Decimal(1),
        petDay: false,
        xpDay: true,
        cooldown: new Decimal(0),
        cooldownMax: new Decimal(86400),
        xpReward: new Decimal(150),
    }},
    automate() {},
    nodeStyle: {
        background: "#106ccc",
		backgroundOrigin: "border-box",
		borderColor: "black",
    },
    tooltip: "Insane Face",
    color: "#106ccc",
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        player.ev2.xpReward = new Decimal(150)
        player.ev2.xpReward = player.ev2.xpReward.add(player.ev2.day.sub(1).mul(15).pow(.8))
        player.ev2.xpReward = player.ev2.xpReward.mul(player.cb.buttonBaseXP[0])

        player.ev2.cooldown = player.ev2.cooldown.sub(onepersec.mul(delta))
    },
    clickables: {
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
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
    },
    dailyReward() {
        if (player.ev2.xpDay) {
            player.cb.xp = player.cb.xp.add(player.ev2.xpReward)
            player.cb.totalxp = player.cb.totalxp.add(player.ev2.xpReward)
            callAlert("You gained " + format(player.ev2.xpReward) + " XP!");
        } else if (player.ev2.petDay) {
            layers.ev2.dailyRewardPet();
        }
        player.ev2.day = player.ev2.day.add(1)
    },
    dailyRewardPet() {
        let rng = Math.random();

        if (rng > 0.95) {
            addLevelableXP("pet", 301, 1);
            callAlert("You gained a Nova!", "resources/Pets/novaRarePet.png");
        } else if (rng > 0.9) {
            addLevelableXP("pet", 304, 1);
            callAlert("You gained a Goofy Ahh Thing!", "resources/Pets/goofyAhhThingRarePet.png");
        } else if (rng > 0.8) {
            addLevelableXP("pet", 201, 2);
            callAlert("You gained 2 Testes!", "resources/Pets/testeUncommonPet.png");
        } else if (rng > 0.7) {
            addLevelableXP("pet", 202, 2);
            callAlert("You gained 2 Stars!", "resources/Pets/starUncommonPet.png");
        } else if (rng > 0.6) {
            addLevelableXP("pet", 203, 2);
            callAlert("You gained 2 Normal Faces!", "resources/Pets/normalFaceUncommonPet.png");
        } else if (rng > 0.5) {
            addLevelableXP("pet", 204, 2);
            callAlert("You gained 2 Sharks!", "resources/Pets/sharkUncommonPet.png");
        } else if (rng > 0.4) {
            addLevelableXP("pet", 205, 2);
            callAlert("You gained 2 WATCHING EYES!", "resources/Pets/eyeUncommonPet.png");
        } else if (rng > 0.32) {
            addLevelableXP("pet", 101, 5);
            callAlert("You gained 5 Gwas!", "resources/Pets/gwaCommonPet.png");
        } else if (rng > 0.24) {
            addLevelableXP("pet", 102, 5);
            callAlert("You gained 5 Egg Guys!", "resources/Pets/eggCommonPet.png");
        } else if (rng > 0.16) {
            addLevelableXP("pet", 103, 5);
            callAlert("You gained 5 Unsmith!", "resources/Pets/unsmithCommonPet.png");
        } else if (rng > 0.08) {
            addLevelableXP("pet", 104, 5);
            callAlert("You gained 5 Gd Checkpoints!", "resources/Pets/checkpointCommonPet.png");
        } else {
            addLevelableXP("pet", 105, 5);
            callAlert("You gained 5 Slaxes!", "resources/Pets/slaxCommonPet.png");
        }
    },
    tabFormat: [
        ["blank", "10px"],
        ["style-row", [
            ["raw-html", function () { return "<h2>Day " + formatWhole(player.ev2.day) }, { "color": "white", "font-size": "30px", "font-family": "monospace" }],
        ], {width: "250px", height: "60px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "10px"}],
        ["blank", "125px"],
        ["style-column", [
            ["raw-html", function () { return !player.ev2.petDay ? "You will gain XP today!" : "You will gain a pet today!" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["blank", "25px"],
            ["clickable", 11],
        ], {width: "350px", height: "125px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "10px"}],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[2]  }
})
addLayer("ev4", {
    name: "Sun", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Su", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        offerings: new Decimal(0),
        offeringsBase: new Decimal(1),
        offeringReq: new Decimal(100),
    }},
    automate() {},
    nodeStyle: {
        background: "linear-gradient(-90deg, #f38004, #fc3404)",
		backgroundOrigin: "border-box",
		borderColor: "#DC2D03"
    },
    tooltip: "Sun",
    color: "#febc06",
    update(delta) {
        player.ev4.offeringReq = player.cb.totalAutomationShards.mul(20).add(100)
        player.ev4.offeringReq = player.ev4.offeringReq.div(buyableEffect("cof", 32))

        player.ev4.offeringsBase = new Decimal(1)
        player.ev4.offeringsBase = player.ev4.offeringsBase.mul(buyableEffect("ev4", 11))
        player.ev4.offeringsBase = player.ev4.offeringsBase.mul(buyableEffect("ev4", 12))
        if (hasUpgrade("ev8", 14)) player.ev4.offeringsBase = player.ev4.offeringsBase.mul(1.2)
        player.ev4.offeringsBase = player.ev4.offeringsBase.mul(levelableEffect("pet", 1205)[2])
        player.ev4.offeringsBase = player.ev4.offeringsBase.mul(buyableEffect("ep0", 12))
        if (hasUpgrade("cs", 1202)) player.ev4.offeringsBase = player.ev4.offeringsBase.mul(1.5)

        if (player.ev4.offerings.gte(player.ev4.offeringReq)) {
            layers.ev4.gainAutomationShard()
        }
    },
    gainAutomationShard() {
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
            width: 450,
            height: 50,
            progress() {
                return player.ev4.offerings.div(player.ev4.offeringReq)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {
                "background-color": "#f38004",
            },
            borderStyle: {
                borderTop: "0px",
                borderRadius: "0px 0px 10px 10px",
            },
            display() {
                return "<h5>" + format(player.ev4.offerings) + "/" + formatWhole(player.ev4.offeringReq) + "<h5> Offerings to gain an automation shard.</h5>";
            },
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(1).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.evolutionShards.gte(this.cost()) },
            title() {
                return "Evolution Offering Boost"
            },
            display() {
                return "which are multiplying offerings by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Evolution Shards"
            },
            buy(mult) {
                let base = new Decimal(1)
                let growth = 1.2
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base).floor()
                    player.cb.evolutionShards = player.cb.evolutionShards.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.cb.evolutionShards, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
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
                return "Paragon Offering Boost"
            },
            display() {
                return "which are multiplying offerings by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards"
            },
            buy(mult) {
                let base = new Decimal(1)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base).floor()
                    player.cb.paragonShards = player.cb.paragonShards.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.cb.paragonShards, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.paragonShards = player.cb.paragonShards.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    tabFormat: [
        ["blank", "10px"],
        ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.paragonShards)}, {width: "93px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/automationShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.automationShards)}, {width: "95px", height: "50px", color: "grey", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                    return "<div class='bottomTooltip'>Automation Shards<hr><small>(Gained from sacrifices)<br>(Total Shards: " + formatShortWhole(player.cb.totalAutomationShards) + ")</small></div>"
                }],
            ], {width: "150px", height: "50px"}],
        ], {width: "450px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px 10px 0px 0px", userSelect: "none"}],
        ["bar", "bar"],
        ["blank", "25px"],
        ["row", [["ex-buyable", 11], ["ex-buyable", 12]]],
        ["blank", "10px"],
        ["raw-html", function () { return "Offering multiplier: <h3>" + format(player.ev4.offeringsBase) + "</h3>x" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && player.ev.evolutionsUnlocked[4]  }
})
addLayer("ev8", {
    name: "Marcel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Mc", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        evoButtonTimersMax: [new Decimal(18000),new Decimal(54000),new Decimal(108000),new Decimal(324000),],
        evoButtonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        evoButtonBase: [new Decimal(1),new Decimal(2),new Decimal(4),new Decimal(9),],

        paragonButtonTimersMax: [new Decimal(180000),new Decimal(450000),new Decimal(864000),],
        paragonButtonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),],
        paragonButtonBase: [new Decimal(1),new Decimal(3),new Decimal(5),],

        alertToggle: true,
    }},
    automate() {},
    nodeStyle: {
        background: "linear-gradient(90deg, #d487fd, #4b79ff)",
		backgroundOrigin: "border-box",
		borderColor: "#1500bf",
		color: "#1500bf"
    },
    tooltip: "Marcel",
    color: "grey",
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        player.ev8.evoButtonTimersMax = [new Decimal(18000),new Decimal(54000),new Decimal(108000),new Decimal(324000),]
        player.ev8.evoButtonBase = [new Decimal(1),new Decimal(2),new Decimal(4),new Decimal(9),]
        for (let i = 0; i < player.ev8.evoButtonTimersMax.length; i++) {
            if (hasUpgrade("ev8", 11)) player.ev8.evoButtonTimersMax[i] = player.ev8.evoButtonTimersMax[i].div(1.1)
        }
        for (let i = 0; i < player.ev8.evoButtonTimers.length; i++) {
            player.ev8.evoButtonTimers[i] = player.ev8.evoButtonTimers[i].sub(onepersec.mul(delta))
        }

        player.ev8.paragonButtonTimersMax = [new Decimal(180000),new Decimal(450000),new Decimal(864000),]
        player.ev8.paragonButtonBase = [new Decimal(1),new Decimal(3),new Decimal(5),]
        for (let i = 0; i < player.ev8.paragonButtonTimersMax.length; i++) {
            if (hasUpgrade("ev8", 11)) player.ev8.paragonButtonTimersMax[i] = player.ev8.paragonButtonTimersMax[i].div(1.1)
        }
        for (let i = 0; i < player.ev8.paragonButtonTimers.length; i++) {
            player.ev8.paragonButtonTimers[i] = player.ev8.paragonButtonTimers[i].sub(onepersec.mul(delta))
        }
    },
    branches: ["branch"],
    clickables: {
        //evo
        11: {
            title() { return player.ev8.evoButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.evoButtonTimers[0]) + "." : "<h3>+" + formatWhole(player.ev8.evoButtonBase[0]) + " Evo Shards."},
            canClick() { return player.ev8.evoButtonTimers[0].lt(0) && this.unlocked },
            unlocked: true,
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.ev8.evoButtonBase[0])
                player.ev8.evoButtonTimers[0] = player.ev8.evoButtonTimersMax[0]
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ev8.evoButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.evoButtonTimers[1]) + "." : "<h3>+" + formatWhole(player.ev8.evoButtonBase[1]) + " Evo Shards."},
            canClick() { return player.ev8.evoButtonTimers[1].lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.ev8.evoButtonBase[1])
                player.ev8.evoButtonTimers[1] = player.ev8.evoButtonTimersMax[1]
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ev8.evoButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.evoButtonTimers[2]) + "." : "<h3>+" + formatWhole(player.ev8.evoButtonBase[2]) + " Evo Shards."},
            canClick() { return player.ev8.evoButtonTimers[2].lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.ev8.evoButtonBase[2])
                player.ev8.evoButtonTimers[2] = player.ev8.evoButtonTimersMax[2]
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        14: {
            title() { return player.ev8.evoButtonTimers[3].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.evoButtonTimers[3]) + "." : "<h3>+" + formatWhole(player.ev8.evoButtonBase[3]) + " Evo Shards."},
            canClick() { return player.ev8.evoButtonTimers[3].lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.ev8.evoButtonBase[3])
                player.ev8.evoButtonTimers[3] = player.ev8.evoButtonTimersMax[3]
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },

        99: {
            title() {return "Claim All"},
            canClick() {return tmp.ev8.clickables[11].canClick || tmp.ev8.clickables[12].canClick || tmp.ev8.clickables[13].canClick
                || tmp.ev8.clickables[14].canClick},
            unlocked() {return hasMilestone("s", 14)},
            onClick() {
                clickClickable("ev8", 11)
                clickClickable("ev8", 12)
                clickClickable("ev8", 13)
                clickClickable("ev8", 14)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "grey" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        //paragon
        101: {
            title() { return player.ev8.paragonButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.paragonButtonTimers[0]) + "." : "<h3>+" + formatWhole(player.ev8.paragonButtonBase[0]) + " Paragon Shards."},
            canClick() { return player.ev8.paragonButtonTimers[0].lt(0) && this.unlocked },
            unlocked: true,
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.add(player.ev8.paragonButtonBase[0])
                player.ev8.paragonButtonTimers[0] = player.ev8.paragonButtonTimersMax[0]
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        102: {
            title() { return player.ev8.paragonButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.paragonButtonTimers[1]) + "." : "<h3>+" + formatWhole(player.ev8.paragonButtonBase[1]) + " Paragon Shards."},
            canClick() { return player.ev8.paragonButtonTimers[1].lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.add(player.ev8.paragonButtonBase[1])
                player.ev8.paragonButtonTimers[1] = player.ev8.paragonButtonTimersMax[1]
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        103: {
            title() { return player.ev8.paragonButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.paragonButtonTimers[2]) + "." : "<h3>+" + formatWhole(player.ev8.paragonButtonBase[2]) + " Paragon Shards."},
            canClick() { return player.ev8.paragonButtonTimers[2].lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.add(player.ev8.paragonButtonBase[2])
                player.ev8.paragonButtonTimers[2] = player.ev8.paragonButtonTimersMax[2]
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },

        199: {
            title() {return "Claim All"},
            canClick() {return tmp.ev8.clickables[101].canClick || tmp.ev8.clickables[102].canClick || tmp.ev8.clickables[103].canClick},
            unlocked() {return hasMilestone("s", 14)},
            onClick() {
                clickClickable("ev8", 101)
                clickClickable("ev8", 102)
                clickClickable("ev8", 103)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "grey" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    bars: {},
    upgrades: {
        11: {
            title: "Shard Research I",
            unlocked() { return true },
            description: "Divides shard button cooldown by /1.1.",
            cost: new Decimal(6),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Evolution Shards",
            currencyInternalName: "evolutionShards",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #6a437e", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Shard Research II",
            unlocked() { return true },
            description: "Divides pet button cooldown by /1.1.",
            cost: new Decimal(10),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Evolution Shards",
            currencyInternalName: "evolutionShards",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #6a437e", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Shard Research III",
            unlocked() { return true },
            description: "Multiplies pet point gain by x1.2.",
            cost: new Decimal(1),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Paragon Shards",
            currencyInternalName: "paragonShards",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #253c7f", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Shard Research IV",
            unlocked() { return true },
            description: "Multiplies offering gain by x1.2.",
            cost: new Decimal(1),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Paragon Shards",
            currencyInternalName: "paragonShards",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #253c7f", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "Shard Research V",
            unlocked() { return true },
            description: "Divides XP button cooldown by /1.15.",
            cost: new Decimal(25),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Evolution Shards",
            currencyInternalName: "evolutionShards",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #6a437e", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "Shard Research VI",
            unlocked() { return true },
            description: "Multiplies XPBoost gain by x1.2.",
            cost: new Decimal(35),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Evolution Shards",
            currencyInternalName: "evolutionShards",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #6a437e", borderRadius: "15px", margin: "2px"},
        },
        17: {
            title: "Shard Research VII",
            unlocked() { return player.ev.evolutionsUnlocked[7] },
            description: "Multiplies moonstone value by x2.",
            cost: new Decimal(3),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Paragon Shards",
            currencyInternalName: "paragonShards",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #253c7f", borderRadius: "15px", margin: "2px"},
        },
        18: {
            title: "Shard Research VIII",
            unlocked() { return player.ev.evolutionsUnlocked[7] },
            description: "Multiplies moonstone damage by x2.",
            cost: new Decimal(3),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Paragon Shards",
            currencyInternalName: "paragonShards",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #253c7f", borderRadius: "15px", margin: "2px"},
        },
        19: {
            title: "Shard Research IX",
            unlocked() { return hasMilestone("s", 14) },
            description: "Boosts radiation gain based on unspent paragon shards.",
            cost: new Decimal(60),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Evolution Shards",
            currencyInternalName: "evolutionShards",
            effect() {
                return player.cb.paragonShards.mul(0.3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "135px", color: "rgba(0,0,0,0.8)", border: "3px solid #6a437e", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: "Shard Research X",
            unlocked() { return hasMilestone("s", 14) },
            description: "Multiplies all epic pet currency gain by x1.4",
            cost: new Decimal(80),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Evolution Shards",
            currencyInternalName: "evolutionShards",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #6a437e", borderRadius: "15px", margin: "2px"},

        },
        22: {
            title: "Shard Research XI",
            unlocked() { return hasMilestone("s", 14) },
            description: "Boosts singularity point gain based on unspent evolution shards.",
            cost: new Decimal(7),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Paragon Shards",
            currencyInternalName: "paragonShards",
            effect() {
                return player.cb.evolutionShards.mul(0.02).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "135px", color: "rgba(0,0,0,0.8)", border: "3px solid #253c7f", borderRadius: "15px", margin: "2px"},

        },
      /*  23: {
            title: "Shard Research XII",
            unlocked() { return player.au2.au2Unlocked && hasUpgrade("ev8", 19) && hasUpgrade("ev8", 21) && hasUpgrade("ev8", 22)},
            description: "Unlocks MINING (In AU2).",
            cost: new Decimal(20),
            currencyLocation() { return player.cb },
            currencyDisplayName: "Paragon Shards",
            currencyInternalName: "paragonShards",
        }, */
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
                buttonStyle() { return {color: "black", borderColor: "black", backgroundColor: "#d487fd", borderRadius: "5px"} },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["clickable", 11],
                    ["clickable", 12],
                    ["clickable", 13],
                    ["clickable", 14],
                    ["clickable", 99],
                ]
            },
            "Paragon": {
                buttonStyle() { return {color: "black", borderColor: "black", backgroundColor: "#4b79ff", borderRadius: "5px"} },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["clickable", 101],
                    ["clickable", 102],
                    ["clickable", 103],
                    ["clickable", 199],
                ]
            },
            "Research": {
                buttonStyle() { return {color: "#1500bf", borderColor: "#1500bf", background: "linear-gradient(90deg, #d487fd, #4b79ff)", borderRadius: "5px"} },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],
                        ["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18],
                        ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], /*["upgrade", 23]*/], {maxWidth: "500px"}],
                ]
            },
        },
    },

    tabFormat: [
        ["blank", "10px"],
        ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "150px", height: "50px"}],
        ], {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
        ["blank", "25px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[8]  }
})
addLayer("ev10", {
    name: "Eye", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ey", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        /*
        idea: sacrificing a certain amount of evo/paragon shards, you speed up time in check back by a certain amount for a certain amount of time
        */
       checkbackBoost: new Decimal(1),
       checkbackBoostDuration: new Decimal(0),

       shardsInput: new Decimal(0),
       shardsInputAmount: new Decimal(0),

       evoSacrificeCooldownTimer: new Decimal(0),
       evoSacrificeBoostTimeToGet: new Decimal(0),
       evoSacrificeCooldownTimerMax: new Decimal(10800),

       paragonSacrificeCooldownTimer: new Decimal(0),
       paragonSacrificeBoostTimeToGet: new Decimal(0),
       paragonSacrificeCooldownTimerMax: new Decimal(43200),

       activeBoost: new Decimal(0),
    }},
    automate() {},
    nodeStyle: {
        background: "linear-gradient(120deg, #121212, #1c1c1c)",
		backgroundOrigin: "border-box",
		borderColor: "black",
		color: "gray"
    },
    tooltip: "EYE",
    color: "grey",
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        if (player.ev10.checkbackBoostDuration.gt(0)) {
        player.ev10.checkbackBoostDuration = player.ev10.checkbackBoostDuration.sub(new Decimal(1).mul(delta))
        } else {
            player.ev10.checkbackBoostDuration = new Decimal(0)
            player.ev10.activeBoost = new Decimal(0)
        }

        if (player.ev10.shardsInputAmount.gte(1)) player.ev10.shardsInputAmount = player.ev10.shardsInput.floor()
        if (player.ev10.shardsInputAmount.lt(1)) player.ev10.shardsInputAmount = new Decimal(1)

        player.ev10.evoSacrificeBoostTimeToGet = player.ev10.shardsInputAmount.pow(0.5).mul(180)
        player.ev10.paragonSacrificeBoostTimeToGet = player.ev10.shardsInputAmount.pow(0.45).mul(50)

        if (player.ev10.activeBoost.eq(1) && player.ev10.checkbackBoostDuration.gt(0)) {
            player.ev10.checkbackBoost = player.ev10.checkbackBoostDuration.pow(0.35).add(1)
        }
        if (player.ev10.activeBoost.eq(2) && player.ev10.checkbackBoostDuration.gt(0)) {
            player.ev10.checkbackBoost = player.ev10.checkbackBoostDuration.pow(0.35).mul(15).add(1)
        }
        if (player.ev10.activeBoost.eq(0)){
            player.ev10.checkbackBoost = new Decimal(1)
        }
        player.ev10.evoSacrificeCooldownTimer = player.ev10.evoSacrificeCooldownTimer.sub(onepersec.mul(delta))
        player.ev10.paragonSacrificeCooldownTimer = player.ev10.paragonSacrificeCooldownTimer.sub(onepersec.mul(delta))
    },
    branches: ["branch"],
    clickables: {
        11: {
            title() { return player.ev10.evoSacrificeCooldownTimer.lte(0) ? "Sacrifice Evolution Shards" : "Check back in " + formatTime(player.ev10.evoSacrificeCooldownTimer) + "."},
            canClick() { return player.cb.evolutionShards.gte(player.ev10.shardsInputAmount) && player.ev10.checkbackBoostDuration.lte(0) && player.ev10.evoSacrificeCooldownTimer.lte(0) },
            tooltip() { return "Boost Duration: " + formatTime(player.ev10.evoSacrificeBoostTimeToGet) + ".<br>Effect: " + format(player.ev10.shardsInputAmount.pow(0.5).mul(180).pow(0.35).add(1)) + "x." },
            unlocked() { return true },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.ev10.shardsInputAmount)

                player.ev10.checkbackBoostDuration = player.ev10.evoSacrificeBoostTimeToGet
                player.ev10.evoSacrificeCooldownTimer = player.ev10.evoSacrificeCooldownTimerMax
                player.ev10.activeBoost = new Decimal(1)
            },
            style: { width: "150px", minHeight: "75px", borderRadius: "10px 0px 0px 10px" },
        },
        12: {
            title() { return player.ev10.paragonSacrificeCooldownTimer.lte(0) ? "Sacrifice Paragon Shards" : "Check back in " + formatTime(player.ev10.paragonSacrificeCooldownTimer) + "."},
            canClick() { return player.cb.paragonShards.gte(player.ev10.shardsInputAmount) && player.ev10.checkbackBoostDuration.lte(0) && player.ev10.paragonSacrificeCooldownTimer.lte(0) },
            tooltip() { return "Boost Duration: " + formatTime(player.ev10.paragonSacrificeBoostTimeToGet) + ".<br>Effect: " + format(player.ev10.shardsInputAmount.pow(0.45).mul(50).pow(0.35).mul(15).add(1)) + "x." },
            unlocked() { return true },
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.sub(player.ev10.shardsInputAmount)

                player.ev10.checkbackBoostDuration = player.ev10.paragonSacrificeBoostTimeToGet
                player.ev10.paragonSacrificeCooldownTimer = player.ev10.paragonSacrificeCooldownTimerMax
                player.ev10.activeBoost = new Decimal(2)
            },
            style: { width: "150px", minHeight: "75px", borderRadius: "0px 10px 10px 0px" },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["blank", "10px"],
        ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "150px", height: "50px"}],
        ], {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
        ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + formatTime(player.ev10.checkbackBoostDuration) + "</h3> of boost time,"  }, { "color": "#4C64FF", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "which makes check back time go <h3>" + format(player.ev10.checkbackBoost) + "</h3>x faster."  }, { "color": "#4C64FF", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "(Only affects time in the actual check back tab. Epic pets and other stuff wont be affected.)"  }, { "color": "#4C64FF", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["clickable", 11], ["clickable", 12]]],    
        ["blank", "25px"],
        ["raw-html", function () { return "You will sacrifice " + formatShortWhole(player.ev10.shardsInputAmount) + " shards."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["text-input", "shardsInput", {
            color: "var(--color)",
            width: "400px",
            fontFamily: "Calibri",
            textAlign: "left",
            fontSize: "32px",
            border: "2px solid #ffffff17",
            background: "var(--background)",
        }],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[10]  }
})