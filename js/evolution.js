addLayer("ev", {
    name: "Evolution", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        evolutionDisplayIndex: new Decimal(-1),
        evolutionsUnlocked: [false, false, false, false, false,
            false, false, false, false, false,
            false, false],
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
        11 - Blob
        */
    }},
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
            tooltip() { return "███████ pet █████████, █████ buffs ███ effects" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(3)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #000000", borderRadius: "0px", padding: "0px" },
        },
        104: {
            title() { return "<img src='resources/Pets/sunEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[202].canClick && !player.ev.evolutionsUnlocked[4] && player.cb.highestLevel.gte(250)},
            tooltip() { return "██████ ███ ██████ enhancers<br>████ ██████ automation" },
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
            tooltip() { return "Improve ████ orbs █████ various █████████" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(9)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #2CA400", borderRadius: "0px", padding: "0px" },
        },
        110: {
            title() { return "<img src='resources/Pets/eyeEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[205].canClick && !player.ev.evolutionsUnlocked[10] && hasMilestone("s", 12)},
            tooltip() { return "█████████ shards ███ ███<br>███████ orb ████" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(10)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #3F3F3F", borderRadius: "0px", padding: "0px" },
        },
        111: {
            title() { return "<img src='resources/Pets/blobEvoPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return tmp.pet.levelables[107].canClick && !player.ev.evolutionsUnlocked[11] && (player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23))},
            tooltip() { return "███████ crates ███████ ███<br>██████ enhancements" },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(11)
            },
            style: { width: "100px", minHeight: "100px", border: "5px solid #2F2F2F", borderRadius: "0px", padding: "0px" },
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
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/4 Evolution Shards" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 101)) + "/3 Gwa Level" + 
                "<br>"  + formatWhole(getLevelableAmount("pet", 102)) + "/3 Egg Guy Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 103)) + "/6 Unsmith Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 104)) + "/3 Gd Checkpoint Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 105)) + "/3 Slax Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 302)) + "/1 Dice Level" +
                "</div>"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(4) && getLevelableAmount("pet", 101).gte(3) && getLevelableAmount("pet", 102).gte(3)
                && getLevelableAmount("pet", 103).gte(6) && getLevelableAmount("pet", 104).gte(3) && getLevelableAmount("pet", 105).gte(3)
                && getLevelableAmount("pet", 302).gte(1))
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
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/6 Evolution Shards" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 201)) + "/2 Teste Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 202)) + "/2 Star Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 203)) + "/2 Normal Face Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 204)) + "/4 Shark Level Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 205)) + "/2 THE WATCHING EYE Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 303)) + "/1 Drippy Ufo Level" +
                "</div>"
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
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/10 Evolution Shards" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(player.ip.diceRuns) + "/10 Dice Runs" +
                "<br>"  + formatWhole(player.ip.rocketFuelRuns) + "/10 Rocket Fuel Runs" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 301)) + "/2 Nova Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 304)) + "/2 Goofy Ahh Thing Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 203)) + "/6 Normal Face Level" +
                "</div>"
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
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/8 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.petPoints) + "/400 Pet Points" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(player.ip.diceRuns) + "/2,000 Dice Runs" +
                "<br>"  + formatWhole(player.ip.rocketFuelRuns) + "/2,000 Rocket Fuel Runs" +
                "<br>"  + formatWhole(player.ip.hexRuns) + "/2,000 Hex Runs" +
                "<br>"  + formatWhole(player.points) + "/1e500 Celestial Points" +
                "<br>"  + formatWhole(player.tad.infinitum) + "/800 Infinitum" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 101)) + "/10 Gwa Level" +
                "</div>"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(8) && player.ip.diceRuns.gte(2000) && player.ip.rocketFuelRuns.gte(2000)
                && player.ip.hexRuns.gte(2000) && player.points.gte("1e500") && player.tad.infinitum.gte(800)
                && player.cb.petPoints.gte(400) && getLevelableAmount("pet", 101).gte(10))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(8)
                player.cb.petPoints = player.cb.petPoints.sub(400)

                player.ev.evolutionsUnlocked[3] = true
                setLevelableAmount("pet", 1101, new Decimal(1))
            }
        },
        4: {
            title() { return "Star" },
            description() {
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/20 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/1 Paragon Shard" +
                "<br>"  + formatWhole(player.cb.petPoints) + "/250 Pet Points" +
                "<br>"  + formatWhole(player.in.infinityPoints) + "/1e11 Infinity Points" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 201)) + "/4 Teste Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 202)) + "/8 Star Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 203)) + "/4 Normal Face Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 204)) + "/4 Shark Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 205)) + "/4 THE WATCHING EYE Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 206)) + "/2 Clock Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 207)) + "/2 Trollface Level" +
                "</div>"
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
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/25 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/1 Paragon Shard" +
                "<br>"  + format(player.cb.XPBoost) + "/7 XPBoost" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(player.ta.highestDicePoints) + "/1e45 Highest Dice Points" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 1103)) + "/6 Goldsmith Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 1204)) + "/3 MrRedShark Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 1203)) + "/3 Insane Face Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 302)) + "/3 Dice Level" +
                "</div>"
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
                player.cb.XPBoost = player.cb.XPBoost.sub(7)

                player.ev.evolutionsUnlocked[5] = true
                setLevelableAmount("pet", 1302, new Decimal(1))
            }
        },
        6: {
            title() { return "Spider" },
            description() {
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/80 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/20 Paragon Shard" +
                "<br>"  + format(player.cb.XPBoost) + "/10,000 XPBoost" +
                "</div>"
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
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/25 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/2 Paragon Shards" +
                "<br>"  + formatWhole(player.cb.petPoints) + "/300 Pet Points" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(player.g.goldGrass) + "/1e12 Golden Grass" +
                "<br>"  + formatWhole(player.rf.rocketFuel) + "/1e80 Rocket Fuel" +
                "</div>"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(25) && player.cb.paragonShards.gte(2) && player.cb.petPoints.gte(300)
                && player.g.goldGrass.gte(1e12) && player.rf.rocketFuel.gte(1e80))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(25)
                player.cb.paragonShards = player.cb.paragonShards.sub(2)

                player.ev.evolutionsUnlocked[7] = true
                setLevelableAmount("pet", 1303, new Decimal(1))
            }
        },
        8: {
            title() { return "Clock" },
            description() {
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/30 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/1 Paragon Shard" +
                "<br>"  + formatWhole(player.ca.rememberanceCores) + "/5 Rememberance Cores" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(player.cb.level) + "/1,500 Check Back Levels" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 206)) + "/6 Clock Level" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 207)) + "/6 Trollface Level" +
                "</div>"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(30) && player.cb.paragonShards.gte(1) && player.cb.level.gte(1500)
                && getLevelableAmount("pet", 206).gte(6) && getLevelableAmount("pet", 207).gte(6) && player.ca.rememberanceCores.gte(5))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(30)
                player.cb.paragonShards = player.cb.paragonShards.sub(1)
                player.ca.rememberanceCores = player.ca.rememberanceCores.sub(5)

                player.ev.evolutionsUnlocked[8] = true
                setLevelableAmount("pet", 1206, new Decimal(1))
            }
        },
        9: {
            title() { return "Gd Checkpoint" },
            description() {
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/60 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/10 Paragon Shards" +
                "<br>"  + formatWhole(player.ca.rememberanceCores) + "/5 Rememberance Cores" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + format(player.points) + "/1e200,000 Celestial Points" +
                "<br>"  + formatWhole(player.g.goldGrass) + "/1e30 Golden Grass" +
                "<br>"  + formatWhole(player.g.moonstone) + "/2,000 Moonstone" +
                "<br>"  + formatWhole(player.cp.replicantiPoints) + "/1e250 Replicanti Points" +
                "<br>"  + formatWhole(player.ca.replicantiGalaxies) + "/15 Replicanti Galaxies" + 
                "<br>"  + formatWhole(player.cs.scraps.checkback.amount) + "/100 Check Back Core Scraps" +
                "</div>"
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

                player.ev.evolutionsUnlocked[9] = true
                setLevelableAmount("pet", 1104, new Decimal(1))
            }
        },
        10: {
            title() { return "THE WATCHING EYE" },
            description() {
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/40 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/5 Paragon Shards" +
                "<br>"  + formatWhole(player.cb.petPoints) + "/10,000 Pet Points" +
                "<br>"  + formatWhole(player.cb.XPBoost) + "/1,000 XPBoost" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(player.cb.level) + "/15,000 Check Back Levels" +
                "<br>"  + formatWhole(player.ev2.day) + "/12 Days of Daily Rewards" +
                "</div>"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(40) && player.cb.paragonShards.gte(5) && player.cb.level.gte(15000)
                && player.cb.XPBoost.gte(1000) && player.cb.petPoints.gte(10000) && player.ev2.day.gte(12))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(40)
                player.cb.paragonShards = player.cb.paragonShards.sub(5)
                player.cb.XPBoost = player.cb.XPBoost.sub(1000)
                player.cb.petPoints = player.cb.petPoints.sub(10000)

                player.ev.evolutionsUnlocked[10] = true
                setLevelableAmount("pet", 1205, new Decimal(1))
            }
        },
        11: {
            title() { return "Blob<sup>2</sup>" },
            description() {
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>"  + formatWhole(player.cb.evolutionShards) + "/50 Evolution Shards" +
                "<br>"  + formatWhole(player.cb.paragonShards) + "/5 Paragon Shards" +
                "<br>"  + formatWhole(player.cb.petPoints) + "/5,000 Pet Points" +
                "<br>"  + formatWhole(player.cb.XPBoost) + "/500 XPBoost" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(getLevelableTier("pet", 107)) + "/1 Blob Ascension" +
                "<br>"  + formatSimple(player.cb.cbTickspeed, 1) + "/1.5 Checkback Tickspeed" +
                "</div>"
            },
            canClick() {
                return (player.cb.evolutionShards.gte(50) && player.cb.paragonShards.gte(5) && player.cb.XPBoost.gte(50)
                && player.cb.petPoints.gte(5000) && getLevelableTier("pet", 107).gte(1) && player.cb.cbTickspeed.gte(1.5))
            },
            onClick() {
                player.ev.evolutionDisplayIndex = new Decimal(-1)

                player.cb.evolutionShards = player.cb.evolutionShards.sub(50)
                player.cb.paragonShards = player.cb.paragonShards.sub(5)
                player.cb.XPBoost = player.cb.XPBoost.sub(50)
                player.cb.petPoints = player.cb.petPoints.sub(5000)

                player.ev.evolutionsUnlocked[11] = true
                setLevelableAmount("pet", 1107, new Decimal(1))
            }
        },

        101: {
            title() { return "Simple Cookie" },
            description() {
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>" + formatWhole(player.ep2.chocoShards) + "/1 Chocolate Shard" +
                "<br>" + formatWhole(player.cb.petPoints) + "/1,000 Pet Points" +
                "<br>" + formatWhole(player.ca.rememberanceCores) + "/10 Rememberance Cores" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 403)) + "/2 Cookie Levels" +
                "</div>"
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
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>" + formatWhole(player.ep2.chocoShards) + "/2 Chocolate Shard" +
                "<br>" + formatWhole(player.cb.petPoints) + "/2,777 Pet Points" +
                "<br>" + formatWhole(player.ca.rememberanceCores) + "/17 Rememberance Cores" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 403)) + "/4 Cookie Levels" +
                "<br>" + formatWhole(player.sma.starmetalAlloy) + "/777 Starmetal Alloy" +
                "</div>"
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

                setLevelableAmount("pet", 2002, new Decimal(1))
            }
        },
        103: {
            title() { return "Wrath Cookie" },
            description() {
                return "<div class='evoContainer'><h3>Costs:</h3>" +
                "<br>" + formatWhole(player.ep2.chocoShards) + "/6 Chocolate Shard" +
                "<br>" + formatWhole(player.cb.petPoints) + "/6,666 Pet Points" +
                "<br>" + formatWhole(player.ca.rememberanceCores) + "/36 Rememberance Cores" +
                "</div>" +
                "<div class='evoContainer'><h3>Requires:</h3>" +
                "<br>"  + formatWhole(getLevelableAmount("pet", 403)) + "/6 Cookie Levels" +
                "<br>" + formatWhole(player.ma.commonMatosFragments) + "/6,666 Common Matos Fragments" +
                "<br>" + formatWhole(player.ma.rareMatosFragments) + "/666 Rare Matos Fragments" +
                "<br>" + formatWhole(player.ma.epicMatosFragments) + "/66 Epic Matos Fragments" +
                "<br>" + formatWhole(player.ma.legendaryMatosFragments) + "/6 Legendary Matos Fragments" +
                "</div>"
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
        ], () => { return player.cb.highestLevel.gte(250) ? {width: "682px", border: "2px solid white", borderRadius: "10px", backgroundColor: "black"} : {width: "340px", border: "2px solid white", borderRadius: "10px", backgroundColor: "black"} }],
        ["blank", "10px"],
        ["style-column", [
            ["scroll-column", [
                ["blank", "15px"],
                ["style-column", [
                    ["blank", "5px"],
                    ["raw-html", "Current Evolutions", {color: "#4b79ff", fontSize: "36px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["row", [
                        ["bt-clickable", 100], ["bt-clickable", 101], ["bt-clickable", 102], ["bt-clickable", 103], ["bt-clickable", 104],
                        ["bt-clickable", 105], ["bt-clickable", 107], ["bt-clickable", 108], ["bt-clickable", 109], ["bt-clickable", 110],
                        ["bt-clickable", 106], ["bt-clickable", 111],

                        ["bt-clickable", 201], ["bt-clickable", 202], ["bt-clickable", 203]
                    ]],
                ], {width: "620px", background: "rgba(0,0,0,0.4)", paddingBottom: "10px", borderRadius: "15px"}],
                ["blank", "5px"],
                ["raw-html", function () {
                    if (player.ev.evolutionDisplayIndex == -1) {
                        return "No Pet Selected"
                    } else {
                        return run(layers.ev.evos[player.ev.evolutionDisplayIndex].title, layers.ev.evos[player.ev.evolutionDisplayIndex])
                    }
                }, {color: "#4b79ff", fontSize: "32px", fontFamily: "monospace"}],
                ["style-row", [], {width: "500px", height: "4px", background: "#4b79ff", marginBottom: "10px"}],
                ["raw-html", function () {
                    if (player.ev.evolutionDisplayIndex == -1) {
                        return ""
                    } else {
                        return run(layers.ev.evos[player.ev.evolutionDisplayIndex].description, layers.ev.evos[player.ev.evolutionDisplayIndex])
                    }
                }, {color: "#4b79ff", fontSize: "20px", fontFamily: "monospace"}],
                ["blank", "10px"],
            ], {width: "682px", height: "525px", overflowX: "hidden"}],
            ["style-column", [["clickable", 2]], {width: "682px", height: "125px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "0px 0px 10px 10px"}],
        ], {width: "682px", height: "650px", border: "2px solid white", borderRadius: "10px", background: "linear-gradient(90deg, #5C1E7E, #1E3066)"}],
    ],
    layerShown() { return false }
})
//player.ev4.offeringReq = player.ev4.offeringReq.div(buyableEffect("cof", 32))
addLayer("ev8", {
    name: "Marcel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Mc", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        evoTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(18000),
                base: new Decimal(1),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(54000),
                base: new Decimal(2),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(108000),
                base: new Decimal(4),
            },
            3: {
                current: new Decimal(0),
                max: new Decimal(324000),
                base: new Decimal(9),
            },
        },

        paraTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(180000),
                base: new Decimal(1),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(450000),
                base: new Decimal(3),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(864000),
                base: new Decimal(5),
            },
        },

        evoButtonTimersMax: [new Decimal(18000),new Decimal(54000),new Decimal(108000),new Decimal(324000),],
        evoButtonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        evoButtonBase: [new Decimal(1),new Decimal(2),new Decimal(4),new Decimal(9),],

        paragonButtonTimersMax: [new Decimal(180000),new Decimal(450000),new Decimal(864000),],
        paragonButtonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),],
        paragonButtonBase: [new Decimal(1),new Decimal(3),new Decimal(5),],

        alertToggle: true,
    }},
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

        player.ev8.evoTimers[0].max = new Decimal(18000)
        player.ev8.evoTimers[1].max = new Decimal(54000)
        player.ev8.evoTimers[2].max = new Decimal(108000)
        player.ev8.evoTimers[3].max = new Decimal(324000)
        for (let thing in player.ev8.evoTimers) {
            if (hasUpgrade("ev8", 11)) player.ev8.evoTimers[thing].max = player.ev8.evoTimers[thing].max.div(1.1)
            
            player.ev8.evoTimers[thing].current = player.ev8.evoTimers[thing].current.sub(onepersec.mul(delta))
        }

        player.ev8.paraTimers[0].max = new Decimal(180000)
        player.ev8.paraTimers[1].max = new Decimal(450000)
        player.ev8.paraTimers[2].max = new Decimal(864000)
        for (let thing in player.ev8.paraTimers) {
            if (hasUpgrade("ev8", 11)) player.ev8.paraTimers[thing].max = player.ev8.paraTimers[thing].max.div(1.1)

            player.ev8.paraTimers[thing].current = player.ev8.paraTimers[thing].current.sub(onepersec.mul(delta))
        }
    },
    clickables: {
        //evo
        11: {
            title() { return player.ev8.evoTimers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.evoTimers[0].current) + "." : "<h3>+" + formatWhole(player.ev8.evoTimers[0].base) + " Evo Shards."},
            canClick() { return player.ev8.evoTimers[0].current.lt(0) && this.unlocked },
            unlocked: true,
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.ev8.evoTimers[0].base)
                player.ev8.evoTimers[0].current = player.ev8.evoTimers[0].max
                doPopup("none", "+" + formatWhole(player.ev8.evoTimers[0].base) + " Evolution Shard!", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        12: {
            title() { return player.ev8.evoTimers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.evoTimers[1].current) + "." : "<h3>+" + formatWhole(player.ev8.evoTimers[1].base) + " Evo Shards."},
            canClick() { return player.ev8.evoTimers[1].current.lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.ev8.evoTimers[1].base)
                player.ev8.evoTimers[1].current = player.ev8.evoTimers[1].max
                doPopup("none", "+" + formatWhole(player.ev8.evoTimers[1].base) + " Evolution Shard!", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        13: {
            title() { return player.ev8.evoTimers[2].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.evoTimers[2].current) + "." : "<h3>+" + formatWhole(player.ev8.evoTimers[2].base) + " Evo Shards."},
            canClick() { return player.ev8.evoTimers[2].current.lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.ev8.evoTimers[2].base)
                player.ev8.evoTimers[2].current = player.ev8.evoTimers[2].max
                doPopup("none", "+" + formatWhole(player.ev8.evoTimers[2].base) + " Evolution Shard!", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        14: {
            title() { return player.ev8.evoTimers[3].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.evoTimers[3].current) + "." : "<h3>+" + formatWhole(player.ev8.evoTimers[3].base) + " Evo Shards."},
            canClick() { return player.ev8.evoTimers[3].current.lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.ev8.evoTimers[3].base)
                player.ev8.evoTimers[3].current = player.ev8.evoTimers[3].max
                doPopup("none", "+" + formatWhole(player.ev8.evoTimers[3].base) + " Evolution Shard!", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
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
            title() { return player.ev8.paraTimers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.paraTimers[0].current) + "." : "<h3>+" + formatWhole(player.ev8.paraTimers[0].base) + " Paragon Shards."},
            canClick() { return player.ev8.paraTimers[0].current.lt(0) && this.unlocked },
            unlocked: true,
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.add(player.ev8.paraTimers[0].base)
                player.ev8.paraTimers[0].current = player.ev8.paraTimers[0].max
                doPopup("none", "+" + formatWhole(player.ev8.paraTimers[0].base) + " Paragon Shard!", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        102: {
            title() { return player.ev8.paraTimers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.paraTimers[1].current) + "." : "<h3>+" + formatWhole(player.ev8.paraTimers[1].base) + " Paragon Shards."},
            canClick() { return player.ev8.paraTimers[1].current.lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.add(player.ev8.paraTimers[1].base)
                player.ev8.paraTimers[1].current = player.ev8.paraTimers[1].max
                doPopup("none", "+" + formatWhole(player.ev8.paraTimers[1].base) + " Paragon Shard!", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30px / 15px" },
        },
        103: {
            title() { return player.ev8.paraTimers[2].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ev8.paraTimers[2].current) + "." : "<h3>+" + formatWhole(player.ev8.paraTimers[2].base) + " Paragon Shards."},
            canClick() { return player.ev8.paraTimers[2].current.lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("s", 14) },
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.add(player.ev8.paraTimers[2].base)
                player.ev8.paraTimers[2].current = player.ev8.paraTimers[2].max
                doPopup("none", "+" + formatWhole(player.ev8.paraTimers[2].base) + " Paragon Shard!", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
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
            description: "Divides crate button cooldown by /1.1.",
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