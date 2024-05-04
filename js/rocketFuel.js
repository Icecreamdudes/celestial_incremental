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
        abilitiesUnlocked: [false, false, false, false, false, false, false, false],
        abilityTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        abilityEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        abilityIndex: -1,
        abilityDesc: [],
    }
    },
    automate() {
    },
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
    update(delta) {
        let onepersec = new Decimal(1)

        player.rf.rocketFuelToGet = player.gh.grasshoppers.pow(0.20).div(500)
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(player.cb.rarePetEffects[2][0])
        if (hasUpgrade("ip", 34) && !inChallenge("ip", 14)) player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(upgradeEffect("ip", 34))
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(player.d.diceEffects[13])
        if (hasUpgrade("rf", 15)) player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(upgradeEffect("rf", 15))
        player.rf.rocketFuelToGet = player.rf.rocketFuelToGet.mul(buyableEffect("cb", 11))

        if ((hasUpgrade("rf", 17) || hasChallenge("ip", 16)) && player.po.rocketFuel) player.rf.rocketFuel = player.rf.rocketFuel.add(Decimal.mul(player.rf.rocketFuelToGet.mul(0.2), delta))

        player.rf.rocketFuelEffect = player.rf.rocketFuel.pow(0.85).add(1)

        if (player.rf.rocketFuelPause.gt(0))
        {
            layers.rf.rocketFuelReset()
        }
        player.rf.rocketFuelPause = player.rf.rocketFuelPause.sub(1)

        player.rf.abilityDesc = [
            "RF Point Boost: Gives a x" + format(player.rf.abilityEffects[0]) + " boost to points. (" + formatTime(player.rf.abilityTimers[0]) + " left)", 
            "RF Tree Boost: Gives a x" + format(player.rf.abilityEffects[1]) + " boost to trees. (" + formatTime(player.rf.abilityTimers[1]) + " left)", 
            "RF Grass Boost: Gives a x" + format(player.rf.abilityEffects[2]) + " boost to grass. (" + formatTime(player.rf.abilityTimers[2]) + " left)", 
            "RF Fertilizer Boost: Gives a x" + format(player.rf.abilityEffects[3]) + " boost to fertilizer. (" + formatTime(player.rf.abilityTimers[3]) + " left)", 
            "RF XP Button: Gives +" + format(player.rf.abilityEffects[4]) + " check back xp. (" + formatTime(player.rf.abilityTimers[4]) + " cooldown)", 
            "RF Infinity Point Boost: Gives a x" + format(player.rf.abilityEffects[5]) + " boost to infinity points. (" + formatTime(player.rf.abilityTimers[5]) + " left)", 
            "RF Button Cooldown: Divides XP button cooldown by /1.5. (" + formatTime(player.rf.abilityTimers[6]) + " left)", 
            "RF Hex Boost: Gives a x" + format(player.rf.abilityEffects[7]) + " boost to hex 1 points. (" + formatTime(player.rf.abilityTimers[7]) + " left)", 
        ]

        if (player.rf.rocketFuel.gt(0))
        {
            player.rf.abilitiesUnlocked[0] = true
        }
        if (player.rf.rocketFuel.gt(0))
        {
            player.rf.abilitiesUnlocked[1] = true
        }
        if (player.rf.rocketFuel.gt(10))
        {
            player.rf.abilitiesUnlocked[2] = true
        }
        if (hasUpgrade("rf", 13) && player.rf.abilitiesUnlocked[2])
        {
            player.rf.abilitiesUnlocked[3] = true
        }
        if (hasUpgrade("rf", 14) && player.rf.abilitiesUnlocked[3])
        {
            player.rf.abilitiesUnlocked[4] = true
        }
        if (hasChallenge("ip", 16))
        {
            player.rf.abilitiesUnlocked[5] = true
            player.rf.abilitiesUnlocked[6] = true
            player.rf.abilitiesUnlocked[7] = true
        }

        for (let i = 0; i < player.rf.abilityTimers.length; i++)
        {
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
    },
    branches() {
        return player.po.dice ? ["gh", "p", "d"] : ["gh", "p", "cb"]
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
        2: {
            title() { return "1%" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(0) : player.rf.rocketFuel.gt(0) && player.rf.abilityTimers[4].lte(0) },
            unlocked() { return player.rf.abilitiesUnlocked[0] },
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), player.rf.rocketFuel.mul(0.01))
                player.rf.rocketFuel = player.rf.rocketFuel.sub(player.rf.rocketFuel.mul(0.01))

                if (player.rf.abilityIndex == 4)
                {
                    let random = getRandomInt(20)

                    if (random == 1)
                    {
                        player.cb.rarePetAmounts[2] = player.cb.rarePetAmounts[2].add(1);
                        callAlert("You gained a Drippy Ufo!", "resources/ufoRarePet.png");
                    }
                }
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%" },
        },
        3: {
            title() { return "30%" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(0) : player.rf.rocketFuel.gt(0) && player.rf.abilityTimers[4].lte(0) },
            unlocked() { return player.rf.abilitiesUnlocked[0] },
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), player.rf.rocketFuel.mul(0.3))
                player.rf.rocketFuel = player.rf.rocketFuel.sub(player.rf.rocketFuel.mul(0.3))

                if (player.rf.abilityIndex == 4)
                {
                    let random = getRandomInt(20)

                    if (random == 1)
                    {
                        player.cb.rarePetAmounts[2] = player.cb.rarePetAmounts[2].add(1);
                        callAlert("You gained a Drippy Ufo!", "resources/ufoRarePet.png");
                    }
                }
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%" },
        },
        11: {
            title() { return "<h3>Gain rocket fuel, but reset everything before unlocking check back. (Based on grasshoppers) (~1e15 grasshoppers)" },
            canClick() { return player.rf.rocketFuelToGet.gte(1)},
            unlocked() { return true },
            onClick() {
                player.rf.rocketFuelPause = new Decimal(3)
                player.rf.rocketFuel = player.rf.rocketFuel.add(player.rf.rocketFuelToGet)
            },
            style: { width: '400px', "min-height": '100px' },
        },
        12: {
            title() { return "1" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(1) : player.rf.rocketFuel.gt(1) && player.rf.abilityTimers[4].lte(0) },
            unlocked() { return player.rf.abilitiesUnlocked[0] },
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), new Decimal(1))
                player.rf.rocketFuel = player.rf.rocketFuel.sub(1)

                if (player.rf.abilityIndex == 4)
                {
                    let random = getRandomInt(20)

                    if (random == 1)
                    {
                        player.cb.rarePetAmounts[2] = player.cb.rarePetAmounts[2].add(1);
                        callAlert("You gained a Drippy Ufo!", "resources/ufoRarePet.png");
                    }
                }
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%" },
        },
        13: {
            title() { return "10%" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(0) : player.rf.rocketFuel.gt(0) && player.rf.abilityTimers[4].lte(0)  },
            unlocked() { return player.rf.abilitiesUnlocked[0]  },
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), player.rf.rocketFuel.mul(0.1))
                player.rf.rocketFuel = player.rf.rocketFuel.sub(player.rf.rocketFuel.mul(0.1))

                if (player.rf.abilityIndex == 4)
                {
                    let random = getRandomInt(20)

                    if (random == 1)
                    {
                        player.cb.rarePetAmounts[2] = player.cb.rarePetAmounts[2].add(1);
                        callAlert("You gained a Drippy Ufo!", "resources/ufoRarePet.png");
                    }
                }
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%" },
        },
        14: {
            title() { return "100%" },
            canClick() { return player.rf.abilityIndex != 4 ? player.rf.rocketFuel.gt(0) : player.rf.rocketFuel.gt(0) && player.rf.abilityTimers[4].lte(0) },
            unlocked() { return player.rf.abilitiesUnlocked[0] },
            onClick() {
                layers.rf.rocketFuelAbility(parseInt(player.rf.abilityIndex), player.rf.rocketFuel)
                player.rf.rocketFuel = player.rf.rocketFuel.sub(player.rf.rocketFuel)

                if (player.rf.abilityIndex == 4)
                {
                    let random = getRandomInt(20)

                    if (random == 1)
                    {
                        player.cb.rarePetAmounts[2] = player.cb.rarePetAmounts[2].add(1);
                        callAlert("You gained a Drippy Ufo!", "resources/ufoRarePet.png");
                    }
                }
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%" },
        },
        15: {
            title() { return "RF Point Boost" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[0] },
            onClick() {
                player.rf.abilityIndex = new Decimal(0)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        16: {
            title() { return "RF Tree Boost" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[1] },
            onClick() {
                player.rf.abilityIndex = new Decimal(1)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        17: {
            title() { return "RF Grass Boost" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[2] },
            onClick() {
                player.rf.abilityIndex = new Decimal(2)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        18: {
            title() { return "RF Fertilizer Boost" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[3] },
            onClick() {
                player.rf.abilityIndex = new Decimal(3)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        19: {
            title() { return "RF XP Button" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[4] },
            tooltip() { return "<h3>5% chance for a pet???" },
            onClick() {
                player.rf.abilityIndex = new Decimal(4)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        21: {
            title() { return "RF Infinity Points Boost" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[5] },
            onClick() {
                player.rf.abilityIndex = new Decimal(5)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        22: {
            title() { return "RF Button Cooldown" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[6] },
            onClick() {
                player.rf.abilityIndex = new Decimal(6)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        23: {
            title() { return "RF Hex Boost" },
            canClick() { return true },
            unlocked() { return player.rf.abilitiesUnlocked[7] },
            onClick() {
                player.rf.abilityIndex = new Decimal(7)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
    },
    rocketFuelAbility(type, amount = new Decimal(0))
    {
        switch (type)
        {
            case 0:
                player.rf.abilityEffects[0] = amount.pow(1.15).mul(100).add(1)
                player.rf.abilityTimers[0] = amount.pow(0.14).mul(100)
                break;
            case 1:
                player.rf.abilityEffects[1] = amount.pow(1.1).mul(10).add(1)
                player.rf.abilityTimers[1] = amount.pow(0.12).mul(80)
            break;
            case 2:
                player.rf.abilityEffects[2] = amount.pow(0.9).mul(6).add(1)
                player.rf.abilityTimers[2] = amount.pow(0.1).mul(60)
            break;
            case 3:
                player.rf.abilityEffects[3] = amount.pow(0.7).mul(3).add(1)
                player.rf.abilityTimers[3] = amount.pow(0.08).mul(45)
            break;
            case 4:
                player.rf.abilityEffects[4] = amount.log10().plus(1).mul(2).add(1)
                player.cb.xp = player.cb.xp.add(player.rf.abilityEffects[4])
                player.rf.abilityTimers[4] = amount.log10().add(1).mul(100)
            break;
            case 5:
                player.rf.abilityEffects[5] = amount.log10().div(66).add(1)
                player.rf.abilityTimers[5] = amount.log10().add(1).mul(20)
            break;
            case 6:
                player.rf.abilityTimers[6] = amount.log10().add(1).mul(10)
            break;
            case 7:
                player.rf.abilityEffects[7] = amount.pow(0.015).mul(3).add(1)
                player.rf.abilityTimers[7] = amount.pow(0.05).mul(60)
            break;
        }
    },
    rocketFuelReset()
    {
        player.pe.pests = new Decimal(0)
        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
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

        if (!hasMilestone("ip", 11))
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

        if (!hasMilestone("ip", 11))
        {
        for (let i = 0; i < player.g.upgrades.length; i++) {
            if (+player.g.upgrades[i] < 22) {
                player.g.upgrades.splice(i, 1);
                i--;
            }
        }
    }
        if (!hasUpgrade("rf", 11) || !hasMilestone("ip", 15)) 
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
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Rocket Fuel Upgrade I",
            unlocked() { return true },
            description() { return "Keep pent on reset." },
            cost: new Decimal(4),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
        }, 
        12:
        {
            title: "Rocket Fuel Upgrade II",
            unlocked() { return true },
            description() { return "Gain 20% of prestige points and grass value per second." },
            cost: new Decimal(12),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
        }, 
        13:
        {
            title: "Rocket Fuel Upgrade III",
            unlocked() { return hasUpgrade("rf", 12) },
            description() { return "Unlocks another ability." },
            cost: new Decimal(36),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
        }, 
        14:
        {
            title: "Rocket Fuel Upgrade IV",
            unlocked() { return hasUpgrade("rf", 13) },
            description() { return "Unlocks yet another ability." },
            cost: new Decimal(540),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
        }, 
        15:
        {
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
        16:
        {
            title: "Rocket Fuel Upgrade VII",
            unlocked() { return hasUpgrade("rf", 15) && inChallenge("ip", 16)},
            description: "Rocket Fuel boosts points.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
            effect() {
                return player.rf.rocketFuel.pow(0.5).mul(5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        17:
        {
            title: "Rocket Fuel Upgrade VIII",
            unlocked() { return hasUpgrade("rf", 16) && inChallenge("ip", 16)},
            description: "Gain 20% of rocket fuel per second.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.rf },
            currencyDisplayName: "Rocket Fuel",
            currencyInternalName: "rocketFuel",
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
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>Abilities" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.rf.abilityDesc[player.rf.abilityIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18], ["clickable", 19], ["clickable", 21], ["clickable", 22], ["clickable", 23]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>Choose an amount to allocate into the ability." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["row", [["clickable", 12], ["clickable", 2], ["clickable", 13], ["clickable", 3],["clickable", 14]]],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17]]],
    ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.rf.rocketFuel) + "</h3> rocket fuel, which boost grassshoppers by x" + format(player.rf.rocketFuelEffect) + "." }, { "color": "#949494", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return player.rf.rocketFuelToGet.gte(1) ? "You will gain <h3>" + format(player.rf.rocketFuelToGet) + "</h3> rocket fuel on reset." : ""}, { "color": "#949494", "font-size": "16px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && (player.po.rocketFuel || inChallenge("ip", 16)) }
})