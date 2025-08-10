addLayer("rf", {
    name: "Rocket Fuel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RF", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        rocketFuel: new Decimal(0),
        rocketFuelEffect: new Decimal(0),
        rocketFuelToGet: new Decimal(0),
        rocketFuelPause: new Decimal(0),

        //abilities
        abilitiesUnlocked: [true, true, false, false, false, false, false, false],
        abilityTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        abilityEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        abilityIndex: -1,
        abilityDesc: [],
    }},
    automate() {},
    nodeStyle() {
        function degreesToRadians(degrees) {
            return (degrees * Math.PI) / 180;
        }

        // Define the base hue value for dark blue (between 0 and 360 degrees)
        const darkBlueHue = 210;

        // Define the base lightness values for dark blue and light gray (between 0 and 100%)
        const darkBlueLightness = 20; // Adjust for darker blue
        const lightGrayLightness = 80; // Adjust for lighter gray

        // Calculate the current lightness value based on time (smoothly oscillating between dark blue and light gray)
        const currentTime = new Date().getTime();
        const lightnessOffset = (Math.sin(currentTime / 400) + 1) / 9; // Adjust the divisor to change oscillation speed
        const lightness1 = darkBlueLightness + (lightnessOffset * (lightGrayLightness - darkBlueLightness));
        const lightness2 = lightGrayLightness - (lightnessOffset * (lightGrayLightness - darkBlueLightness));

        // Create the gradient string using the HSL colors
        const gradient = `linear-gradient(to right, hsl(${darkBlueHue}, 80%, ${lightness1}%), hsl(${darkBlueHue}, 80%, ${lightness2}%))`;

        return {
            background: gradient,
            "background-origin": "border-box",
            "border-color": "#119B35",
        }
    },
    tooltip: "Rocket Fuel",
    color: "#949494",
    branches() {
        return player.po.dice ? ["gh", "d"] : ["gh", "cb"]
    },
    update(delta) {
        let onepersec = new Decimal(1)

        // START OF ROCKET FUEL MODIFIERS
        if (player.rf.rocketFuelToGet.lte(1e20)) player.rf.rocketFuelToGet = player.gh.grasshoppers.pow(0.20).div(500)
        if (player.rf.rocketFuelToGet.gt(1e20)) player.rf.rocketFuelToGet = player.gh.grasshoppers.pow(0.01).div(50000).add(1e20)
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(levelableEffect("pet", 303)[0])
        if (hasUpgrade("ip", 34) && !inChallenge("ip", 14)) player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(upgradeEffect("ip", 34))
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(player.d.diceEffects[13])
        if (hasUpgrade("rf", 15)) player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(upgradeEffect("rf", 15))
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(buyableEffect("cb", 11))
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(buyableEffect("ta", 44))
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(buyableEffect("ta", 45))
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(buyableEffect("ta", 46))
        if (player.pol.pollinatorEffects.ant.enabled) player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(player.pol.pollinatorEffects.ant.effects[1])
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(levelableEffect("pet", 1202)[1])
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(levelableEffect("pet", 306)[1])
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(player.co.cores.rocket.effect[0])
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(player.le.punchcardsPassiveEffect[7])

        // POWER MODIFIERS
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.pow(player.co.cores.rocket.effect[1])

        // ROCKET FUEL PER SECOND
        if ((hasUpgrade("rf", 17) || hasChallenge("ip", 16)) && (player.po.rocketFuel || inChallenge("ip", 16))) {
            player.rf.rocketFuel = player.rf.rocketFuel.add(Decimal.mul(player.rf.rocketFuelToGet.mul(0.2), delta))
        }

        // ROCKET FUEL EFFECT
        player.rf.rocketFuelEffect = player.rf.rocketFuel.mul(30).pow(0.85).add(1)

        // ROCKET FUEL RESET CODE
        if (player.rf.rocketFuelPause.gt(0)) {
            layers.rf.rocketFuelReset()
        }
        player.rf.rocketFuelPause = player.rf.rocketFuelPause.sub(1)

        // ROCKET FUEL ABILITY DESCRIPTION
        player.rf.abilityDesc = [
            ["Point Boost", "Gives a x" + format(player.rf.abilityEffects[0]) + " boost to points.", player.rf.abilityTimers[0].lt(3.2e7) ? formatTime(player.rf.abilityTimers[0]) + " left" : "Multiple years left"],
            ["Tree Boost", "Gives a x" + format(player.rf.abilityEffects[1]) + " boost to trees.", player.rf.abilityTimers[1].lt(3.2e7) ? formatTime(player.rf.abilityTimers[1]) + " left" : "Multiple years left"],
            ["Grass Boost", "Gives a x" + format(player.rf.abilityEffects[2]) + " boost to grass.", player.rf.abilityTimers[2].lt(3.2e7) ? formatTime(player.rf.abilityTimers[2]) + " left" : "Multiple years left"],
            ["Fertilizer Boost", "Gives a x" + format(player.rf.abilityEffects[3]) + " boost to fertilizer.", player.rf.abilityTimers[3].lt(3.2e7) ? formatTime(player.rf.abilityTimers[3]) + " left" : "Multiple years left"],
            ["XP Boost", "Gives +" + format(player.rf.abilityEffects[4]) + " check back XP.", player.rf.abilityTimers[4].lt(3.2e7) ? formatTime(player.rf.abilityTimers[4]) + " cooldown<br><h6>(Based on first XP Button)" : "Multiple years left<br><h6>(Based on first XP Button)"],
            ["Infinity Point Boost", "Gives a x" + format(player.rf.abilityEffects[5]) + " boost to infinity points.", player.rf.abilityTimers[5].lt(3.2e7) ? formatTime(player.rf.abilityTimers[5]) + " left" : "Multiple years left"],
            ["Button Cooldown", "Divides XP button cooldown by /1.2.", player.rf.abilityTimers[6].lt(3.2e7) ? formatTime(player.rf.abilityTimers[6]) + " left" : "Multiple years left"],
            ["Refinement Divider", "Divides refinement requirement by /" + format(player.rf.abilityEffects[7]) + ".", player.rf.abilityTimers[7].lt(3.2e7) ? formatTime(player.rf.abilityTimers[7]) + " left" : "Multiple years left"],
        ]

        // ABILITY UNLOCK CODE
        if (player.rf.rocketFuel.gt(10)) {
            player.rf.abilitiesUnlocked[2] = true
        }
        if (hasUpgrade("rf", 13) && player.rf.abilitiesUnlocked[2]) {
            player.rf.abilitiesUnlocked[3] = true
        }
        if (hasUpgrade("rf", 14) && player.rf.abilitiesUnlocked[3]) {
            player.rf.abilitiesUnlocked[4] = true
        }
        if (hasChallenge("ip", 16)) {
            player.rf.abilitiesUnlocked[5] = true
            player.rf.abilitiesUnlocked[6] = true
            player.rf.abilitiesUnlocked[7] = true
        }

        // ABILITY TIMER CODE
        for (let i = 0; i < player.rf.abilityTimers.length; i++) {
            player.rf.abilityTimers[i] = player.rf.abilityTimers[i].sub(onepersec.mul(delta))
        }
        for (let i = 0; i < player.rf.abilityTimers.length; i++)
        {
            if (player.rf.abilityTimers[i] <= 0)
            {
                player.rf.abilityEffects[i] = new Decimal(1)
                player.rf.abilityTimers[i] = new Decimal(0)
            }
        }

        // ABILITY AUTOMATION
        if (hasUpgrade("tad", 12)) {
            layers.rf.rocketFuelAbility(0, player.rf.rocketFuel)
            layers.rf.rocketFuelAbility(1, player.rf.rocketFuel)
            layers.rf.rocketFuelAbility(2, player.rf.rocketFuel)
            layers.rf.rocketFuelAbility(3, player.rf.rocketFuel)
        }
    },
    clickables: {
        2: {
            title() { return "<h3>Gain rocket fuel, but reset everything before check back, excluding milestones.<br><small>Req: 1e15 Grasshoppers</small></h3>" },
            canClick() { return player.rf.rocketFuelToGet.gte(1)},
            unlocked() { return true },
            onClick() {
                player.rf.rocketFuelPause = new Decimal(3)
                player.rf.rocketFuel = player.rf.rocketFuel.add(player.rf.rocketFuelToGet)
            },
            style() {
                let look = {width: "225px", minHeight: "150px", borderRadius: "12px 0px 0px 0px"}
                this.canClick() ? look.backgroundColor = "#666666" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        3: {
            title() { return "1" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(1) : player.rf.rocketFuel.gt(1) && player.rf.abilityTimers[4].lte(0) },
            unlocked() { return true },
            tooltip() { return player.rf.abilityIndex == 4 ? "<h3>5% chance for a pet???" : ""},
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), new Decimal(1))
                player.rf.rocketFuel = player.rf.rocketFuel.sub(1)
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "0px", fontSize: "12px"}
                this.canClick() ? look.backgroundColor = "#666666" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        4: {
            title() { return "1%" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(1) : player.rf.rocketFuel.gt(10) && player.rf.abilityTimers[4].lte(0) },
            unlocked() { return true },
            tooltip() { return player.rf.abilityIndex == 4 ? "<h3>" + formatWhole(player.rf.rocketFuel.mul(0.01).add(1).log10().pow(0.75).div(2).add(5).floor()) + "% chance for a pet???" : ""},
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), player.rf.rocketFuel.mul(0.01))
                player.rf.rocketFuel = player.rf.rocketFuel.sub(player.rf.rocketFuel.mul(0.01))
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "0px", fontSize: "12px"}
                this.canClick() ? look.backgroundColor = "#666666" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        5: {
            title() { return "10%" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(1) : player.rf.rocketFuel.gt(10) && player.rf.abilityTimers[4].lte(0)  },
            unlocked() { return true  },
            tooltip() { return player.rf.abilityIndex == 4 ? "<h3>" + formatWhole(player.rf.rocketFuel.mul(0.1).add(1).log10().pow(0.75).div(2).add(5).floor()) + "% chance for a pet???" : ""},
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), player.rf.rocketFuel.mul(0.1))
                player.rf.rocketFuel = player.rf.rocketFuel.sub(player.rf.rocketFuel.mul(0.1))
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "0px", fontSize: "12px"}
                this.canClick() ? look.backgroundColor = "#666666" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        6: {
            title() { return "25%" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(1) : player.rf.rocketFuel.gt(10) && player.rf.abilityTimers[4].lte(0) },
            unlocked() { return true },
            tooltip() { return player.rf.abilityIndex == 4 ? "<h3>" + formatWhole(player.rf.rocketFuel.mul(0.25).add(1).log10().pow(0.75).div(2).add(5).floor()) + "% chance for a pet???" : ""},
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), player.rf.rocketFuel.mul(0.25))
                player.rf.rocketFuel = player.rf.rocketFuel.sub(player.rf.rocketFuel.mul(0.25))
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "0px", fontSize: "12px"}
                this.canClick() ? look.backgroundColor = "#666666" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        7: {
            title() { return "100%" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(1) : player.rf.rocketFuel.gt(10) && player.rf.abilityTimers[4].lte(0) },
            unlocked() { return true },
            tooltip() { return player.rf.abilityIndex == 4 ? "<h3>" + formatWhole(player.rf.rocketFuel.add(1).log10().pow(0.75).div(2).add(5).floor()) + "% chance for a pet???" : ""},
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), player.rf.rocketFuel)
                player.rf.rocketFuel = player.rf.rocketFuel.sub(player.rf.rocketFuel)
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "0px 0px 12px 0px", fontSize: "12px"}
                this.canClick() ? look.backgroundColor = "#666666" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        11: {
            title() { return "Point<br>Boost" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.rf.abilityIndex = 0
            },
            style() {
                let look = {width: "125px", minHeight: "125px", margin: "5px", borderRadius: "10px", fontSize: "12px", color: "white", border: "3px solid white"}
                player.rf.abilityIndex == 0 ? look.backgroundColor = "#666666" : look.backgroundColor = "#333333"
                return look
            },
        },
        12: {
            title() { return "Tree<br>Boost" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.rf.abilityIndex = 1
            },
            style() {
                let look = {width: "125px", minHeight: "125px", margin: "5px", borderRadius: "10px", fontSize: "12px", color: "white", border: "3px solid white"}
                player.rf.abilityIndex == 1 ? look.backgroundColor = "#666666" : look.backgroundColor = "#333333"
                return look
            },
        },
        13: {
            title() { return "Grass<br>Boost" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[2] },
            onClick() {
                player.rf.abilityIndex = 2
            },
            style() {
                let look = {width: "125px", minHeight: "125px", margin: "5px", borderRadius: "10px", fontSize: "12px", color: "white", border: "3px solid white"}
                player.rf.abilityIndex == 2 ? look.backgroundColor = "#666666" : look.backgroundColor = "#333333"
                return look
            },
        },
        14: {
            title() { return "Fertilizer<br>Boost" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[3] },
            onClick() {
                player.rf.abilityIndex = 3
            },
            style() {
                let look = {width: "125px", minHeight: "125px", margin: "5px", borderRadius: "10px", fontSize: "12px", color: "white", border: "3px solid white"}
                player.rf.abilityIndex == 3 ? look.backgroundColor = "#666666" : look.backgroundColor = "#333333"
                return look
            },
        },
        15: {
            title() { return "XP<br>Button" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[4] },
            onClick() {
                player.rf.abilityIndex = 4
            },
            style() {
                let look = {width: "125px", minHeight: "125px", margin: "5px", borderRadius: "10px", fontSize: "12px", color: "white", border: "3px solid white"}
                player.rf.abilityIndex == 4 ? look.backgroundColor = "#666666" : look.backgroundColor = "#333333"
                return look
            },
        },
        16: {
            title() { return "Infinity Points<br>Boost" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[5] },
            onClick() {
                player.rf.abilityIndex = 5
            },
            style() {
                let look = {width: "125px", minHeight: "125px", margin: "5px", borderRadius: "10px", fontSize: "12px", color: "white", border: "3px solid white"}
                player.rf.abilityIndex == 5 ? look.backgroundColor = "#666666" : look.backgroundColor = "#333333"
                return look
            },
        },
        17: {
            title() { return "Button<br>Cooldown" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[6] },
            onClick() {
                player.rf.abilityIndex = 6
            },
            style() {
                let look = {width: "125px", minHeight: "125px", margin: "5px", borderRadius: "10px", fontSize: "12px", color: "white", border: "3px solid white"}
                player.rf.abilityIndex == 6 ? look.backgroundColor = "#666666" : look.backgroundColor = "#333333"
                return look
            },
        },
        18: {
            title() { return "Refinement<br>Divider" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[7] },
            onClick() {
                player.rf.abilityIndex = 7
            },
            style() {
                let look = {width: "125px", minHeight: "125px", margin: "5px", borderRadius: "10px", fontSize: "12px", color: "white", border: "3px solid white"}
                player.rf.abilityIndex == 7 ? look.backgroundColor = "#666666" : look.backgroundColor = "#333333"
                return look
            },
        },
    },
    rocketFuelAbility(type, amount = new Decimal(0)) {
        switch (type) {
            case 0:
                player.rf.abilityEffects[0] = amount.pow(1.15).mul(100).add(1).pow(buyableEffect("cs", 29))
                player.rf.abilityTimers[0] = amount.pow(0.14).mul(100)
                break;
            case 1:
                player.rf.abilityEffects[1] = amount.pow(1.1).mul(10).add(1).pow(buyableEffect("cs", 29))
                player.rf.abilityTimers[1] = amount.pow(0.12).mul(80)
            break;
            case 2:
                player.rf.abilityEffects[2] = amount.pow(0.9).mul(6).add(1).pow(buyableEffect("cs", 29))
                player.rf.abilityTimers[2] = amount.pow(0.1).mul(60)
            break;
            case 3:
                player.rf.abilityEffects[3] = amount.pow(0.7).mul(3).add(1).pow(buyableEffect("cs", 29))
                player.rf.abilityTimers[3] = amount.pow(0.08).mul(45)
            break;
            case 4:
                player.rf.abilityEffects[4] = player.cb.buttonBaseXP[0].mul(amount.log10().pow(0.7).div(10).add(1))
                player.cb.xp = player.cb.xp.add(player.rf.abilityEffects[4])
                player.cb.totalxp = player.cb.totalxp.add(player.rf.abilityEffects[4])
                player.rf.abilityTimers[4] = player.cb.buttonTimersMax[0].mul(amount.log10().pow(0.8).div(10).add(1.7))
                let prob = amount.log10().pow(0.75).div(2).add(4).floor()
                let random = getRandomInt(100)

                if (new Decimal(random).lte(prob)) {
                    addLevelableXP("pet", 303, 1);
                    callAlert("You gained a Drippy Ufo!", "resources/ufoRarePet.png");
                }
            break;
            case 5:
                player.rf.abilityEffects[5] = amount.add(1).log10().add(1).div(66).add(1).pow(buyableEffect("cs", 29))
                player.rf.abilityTimers[5] = amount.add(1).log10().add(1).mul(20)
            break;
            case 6:
                player.rf.abilityTimers[6] = amount.add(1).log10().add(1).mul(20)
            break;
            case 7:
                player.rf.abilityEffects[7] = amount.add(1).log(6).add(1).div(36).add(1).pow(buyableEffect("cs", 29))
                player.rf.abilityTimers[7] = amount.add(1).log(6).add(1).mul(60)
            break;
        }
    },
    rocketFuelReset() {
        player.pe.pests = new Decimal(0)
        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("ip", 15) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)
        if (!hasUpgrade("rf", 11)) player.r.pent = new Decimal(0)

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

        if (!hasMilestone("ip", 11)) {
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

        if (!hasMilestone("ip", 11)) {
            for (let i = 0; i < player.g.upgrades.length; i++) {
                if (+player.g.upgrades[i] < 22) {
                    player.g.upgrades.splice(i, 1);
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

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        player.m.buyables[11] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[14] = new Decimal(0)
    },
    bars: {},
    upgrades: {
        11: {
            title: "Rocket Fuel Upgrade I",
            unlocked() { return true },
            description() { return "Keep pent on reset." },
            cost: new Decimal(4),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
        },
        12: {
            title: "Rocket Fuel Upgrade II",
            unlocked() { return true },
            description() { return "Gain 20% of prestige points and grass value per second." },
            cost: new Decimal(12),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
        },
        13: {
            title: "Rocket Fuel Upgrade III",
            unlocked() { return hasUpgrade("rf", 12) },
            description() { return "Unlocks another ability." },
            cost: new Decimal(36),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
        },
        14: {
            title: "Rocket Fuel Upgrade IV",
            unlocked() { return hasUpgrade("rf", 13) },
            description() { return "Unlocks yet another ability." },
            cost: new Decimal(540),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
        },
        15: {
            title: "Rocket Fuel Upgrade V",
            unlocked() { return hasUpgrade("rf", 14) && inChallenge("ip", 16)},
            description: "Rocket Fuel boosts itself.",
            cost: new Decimal(2222),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
            effect() {
                return player.rf.rocketFuel.pow(0.3).mul(3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        16: {
            title: "Rocket Fuel Upgrade VI",
            unlocked() { return hasUpgrade("rf", 15) && inChallenge("ip", 16)},
            description: "Rocket Fuel boosts points, ignoring IC6 nerf.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
            effect() {
                return player.rf.rocketFuel.pow(0.5).mul(5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px"},
        },
        17: {
            title: "Rocket Fuel Upgrade VII",
            unlocked() { return hasUpgrade("rf", 16) && inChallenge("ip", 16)},
            description: "Gain 20% of rocket fuel per second.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.rf.rocketFuel) + "</h3> rocket fuel, which boost grassshoppers by x" + format(player.rf.rocketFuelEffect) + "." }, { "color": "#949494", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.rf.rocketFuel.lt(1e20) ? "You will gain <h3>" + format(player.rf.rocketFuelToGet) + "</h3> rocket fuel on reset." : ""}, { "color": "#949494", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.rf.rocketFuel.gt(1e20) ? "You will gain <h3>" + format(player.rf.rocketFuelToGet) + "</h3> rocket fuel on reset. (softcapped)" : ""}, { "color": "#949494", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["style-column", [
            ["style-row", [
                ["clickable", 2],
                ["style-column", [
                    ["style-row", [
                        ["raw-html", function () { return player.rf.abilityIndex != -1 ? player.rf.abilityDesc[player.rf.abilityIndex][0] : "Nothing Selected" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "372px", height: "38px", borderBottom: "2px solid white"}],
                    ["style-row", [
                        ["raw-html", function () { return player.rf.abilityIndex != -1 ? player.rf.abilityDesc[player.rf.abilityIndex][1] : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "362px", height: "60px", paddingLeft: "5px", paddingRight: "5px"}],
                    ["style-row", [
                        ["raw-html", function () { return player.rf.abilityIndex != -1 ? player.rf.abilityDesc[player.rf.abilityIndex][2] : formatTime(0) + " left" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "372px", height: "48px", borderTop: "2px solid white"}],
                ], {width: "372px", height: "150px", backgroundColor: "#282828", borderLeft: "3px solid white", borderRadius: "0px 12px 0px 0px"}],
            ], {width: "600px", height: "150px", borderBottom: "3px solid white"}],
            ["style-column", [
                ["blank", "5px"],
                ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14]]],
                ["row", [["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18]]],
                ["blank", "5px"],
            ], {width: "600px", borderBottom: "3px solid white"}],
            ["style-column", [
                ["row", [
                    ["style-row", [["raw-html", "Choose an amount<br>to allocate", {color: "white", fontSize: "18px", fontFamily: "monospace"}]], {width: "223px", height: "50px", borderRight: "2px solid white"}],
                    ["clickable", 3], ["clickable", 4], ["clickable", 5], ["clickable", 6], ["clickable", 7],
                ]],
            ], {width: "600px", height: "50px", backgroundColor: "#282828", userSelect: "none", borderRadius: "0px 0px 12px 12px"}],
        ], {backgroundColor: "#161616", border: "3px solid white", borderRadius: "15px", width: "600px"}],
        ["blank", "25px"],
        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17]]],
    ],
    layerShown() { return player.startedGame == true && (player.po.rocketFuel || inChallenge("ip", 16)) }
})
