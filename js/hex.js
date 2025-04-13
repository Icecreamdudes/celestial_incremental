addLayer("h", {
    name: "Hex", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        hex: new Decimal(0),
        hexReq: new Decimal(1e70),
        hexPause: new Decimal(0),
        hexToGet: new Decimal(1),

        hexResetIndex: new Decimal(0),
        hexPoints: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        hexPointsEffect: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        hexPointsToGet: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        automationTier: new Decimal(0),
        automationTierReq: new Decimal(1000),
        automationTierEffect: new Decimal(0),

        ragePower: new Decimal(0),
        ragePowerEffect: new Decimal(1),
        ragePowerToGet: new Decimal(0),
        ragePowerPause: new Decimal(0),

        ragePowerCycleEffect: new Decimal(1),
        currentRagePowerEffect: new Decimal(0),
        ragePowerCycleTimer: new Decimal(0),
        ragePowerCycleTimerToggle: true,
        ragePowerCycleTimerReq: new Decimal(20),
        ragePowerCycleTimerReqInput: new Decimal(20),

        hexMax: false,
    }
    },
    automate() {
        if (hasUpgrade("tad", 11))
        {
            buyBuyable("h", 11)
            buyBuyable("h", 12)
            buyBuyable("h", 13)
            buyBuyable("h", 14)
            buyBuyable("h", 15)
            buyBuyable("h", 16)
            buyBuyable("h", 17)
            buyBuyable("h", 18)
        }

        if (hasMilestone("s", 16))
        {
            buyBuyable("h", 21)
            buyBuyable("h", 22)
            buyBuyable("h", 23)
        }
    },
    nodeStyle() {
        return {
            "color": "white",
            "background-color": "black",
            "border-color": "#0061ff",
        }
    },
    tooltip: "Hex",
    color: "#d4d4d4",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.h.hexPause.gt(0)) {
            layers.h.hexReset();
        }
        player.h.hexPause = player.h.hexPause.sub(1)

        if (player.h.hex.lt(20)) player.h.hexReq = Decimal.mul(1e70, Decimal.pow(1e20, player.h.hex))
        if (player.h.hex.gte(20)) player.h.hexReq = Decimal.mul(Decimal.mul(1e80, Decimal.pow(1e30, player.h.hex)), Decimal.pow(1e10, player.h.hex.pow(2)))
        if (player.h.hex.gte(30)) player.h.hexReq = Decimal.mul(Decimal.mul(1e80, Decimal.pow(1e30, player.h.hex)), Decimal.pow(1e10, player.h.hex.pow(5)))
        player.h.hexToGet = new Decimal(1)

        for (let i = 0; i < player.h.hex; i++)
        {
            if (i > 0) player.h.hexPointsEffect[i] = player.h.hexPoints[i].pow(0.6).add(1)
            if (i > 0) player.h.hexPointsToGet[i] = player.h.hexPoints[i-1].pow(0.3)
            if (hasUpgrade("bi", 12)) player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(upgradeEffect("bi", 12))
        }
        for (let i = 0; i < player.h.hex.sub(1); i++)
        {
            player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(player.h.hexPointsEffect[i+1])
            if (hasUpgrade("ta", 18)) player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(upgradeEffect("ta", 18))
            if (player.pol.pollinatorsIndex == 7) player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(player.pol.pollinatorsEffect[14])
            player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(buyableEffect("ta", 47))
            player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(buyableEffect("ta", 48))
            player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(buyableEffect("ta", 49))
            player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(player.rm.realmModsEffect[2])
            player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(player.le.punchcardsPassiveEffect[8])
    }
        player.h.hexPointsToGet[player.h.currentRagePowerEffect] = player.h.hexPointsToGet[player.h.currentRagePowerEffect].mul(player.h.ragePowerCycleEffect)

        player.h.hexPointsToGet[0] = player.h.hex.pow(2).mul(player.h.hexPointsEffect[1])
        player.h.hexPointsToGet[0] = player.h.hexPointsToGet[0].mul(player.d.diceEffects[14])
        player.h.hexPointsToGet[0] = player.h.hexPointsToGet[0].mul(player.rf.abilityEffects[7])
        player.h.hexPointsToGet[0] = player.h.hexPointsToGet[0].mul(buyableEffect("cb", 11))
        if (hasUpgrade("bi", 12)) player.h.hexPointsToGet[0] = player.h.hexPointsToGet[0].mul(upgradeEffect("bi", 12))
        player.h.hexPointsToGet[0] = player.h.hexPointsToGet[0].mul(buyableEffect("g", 27))
        player.h.hexPoints[0] = player.h.hexPoints[0].add(player.h.hexPointsToGet[0].mul(delta))

        if (!inChallenge("ip", 13)) player.h.hexPointsEffect[0] = player.h.hexPoints[0].mul(100).pow(1.3).add(1)
        if (inChallenge("ip", 13)) player.h.hexPointsEffect[0] = player.h.hexPoints[0].mul(1000).pow(1.5).add(1)

        player.h.automationTierReq = Decimal.mul(Decimal.pow(player.h.automationTier.add(1), 0.6), 100)
        player.h.automationTierEffect = player.h.automationTier.mul(0.1)

        for (let i = 0; i < player.h.automationTier; i++)
        {
            player.h.hexPoints[i+1] = player.h.hexPoints[i+1].add(player.h.hexPointsToGet[i+1].mul(player.h.automationTierEffect.mul(delta)))
        }

        player.h.ragePowerToGet = player.h.hexPoints[0].plus(1).log10().pow(2).div(1000)
        player.h.ragePowerToGet = player.h.ragePowerToGet.mul(buyableEffect("oi", 24))
        player.h.ragePowerToGet = player.h.ragePowerToGet.mul(player.cb.rarePetEffects[6][1])

        player.h.ragePower = player.h.ragePower.add(player.h.ragePowerToGet.mul(Decimal.mul(buyableEffect("fa", 201), delta)))

        if (player.h.ragePowerPause.gt(0)) {
            layers.h.ragePowerReset();
        }
        player.h.ragePowerPause = player.h.ragePowerPause.sub(1)

        player.h.ragePowerEffect = player.h.ragePower.pow(0.65).mul(333).add(1)
        player.h.ragePowerCycleEffect = player.h.ragePower.pow(0.75).mul(33).add(1)

        player.h.ragePowerCycleTimer = player.h.ragePowerCycleTimer.add(onepersec.mul(delta))
        if (player.h.ragePowerCycleTimer.gte(player.h.ragePowerCycleTimerReq))
        {
            player.h.currentRagePowerEffect = player.h.currentRagePowerEffect.add(1)
            player.h.ragePowerCycleTimer = new Decimal(0)
        }
        if (player.h.currentRagePowerEffect.gte(player.h.hex))
        {
            player.h.currentRagePowerEffect = new Decimal(0)
        }

        if (player.h.ragePowerCycleTimerReqInput.gte(1)) player.h.ragePowerCycleTimerReq = player.h.ragePowerCycleTimerReqInput
        if (player.h.ragePowerCycleTimerReqInput.lt(1)) player.h.ragePowerCycleTimerReq = new Decimal(1)

        if (hasMilestone("s", 13)) player.h.automationTier = player.h.hex
    },
    branches: ["t", "r"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.h.hexMax == false },
            unlocked() { return true },
            onClick() {
                player.h.hexMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.h.hexMax == true  },
            unlocked() { return true },
            onClick() {
                player.h.hexMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "<h2>Do the equivalent of a big crunch, but hex.<br>Req: " + formatWhole(player.h.hexReq) + " Points" },
            canClick() { return player.points.gte(player.h.hexReq) },
            unlocked() { return true },
            onClick() {
                player.h.hex = player.h.hex.add(player.h.hexToGet)
                player.h.hexPause = new Decimal(6)

                player.h.hexPoints[player.h.hex] = new Decimal(0)
                player.h.hexPointsToGet[player.h.hex] = new Decimal(0)
                player.h.hexPointsEffect[player.h.hex] = new Decimal(1)

                player.h.hexPoints.push(new Decimal(0))
                player.h.hexPointsToGet.push(new Decimal(0))
                player.h.hexPointsEffect.push(new Decimal(1))
            },
            style: { width: '400px', "min-height": '100px' },
        },
        12: {
            title() { return "<h3>Lower Hex" },
            canClick() { return player.h.hexResetIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.h.hexResetIndex = player.h.hexResetIndex.sub(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        13: {
            title() { return "<h3>Increase Hex" },
            canClick() { return player.h.hexResetIndex.lt(player.h.hex.sub(1)) },
            unlocked() { return true },
            onClick() {
                player.h.hexResetIndex = player.h.hexResetIndex.add(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        14: {
            title() { return "<h2>Reset lower hex layers for hex " + formatWhole(player.h.hexResetIndex.add(1)) + " points." },
            canClick() { return player.h.hexResetIndex.gte(1) },
            unlocked() { return true },
            onClick() {
                layers.h.hexPointReset(player.h.hexResetIndex)
            },
            style: { width: '400px', "min-height": '100px' },
        },
        15: {
            title() { return "<h2>Reset all hex layers to automation tier up.<br>Req: " + format(player.h.automationTierReq) + " hex " + formatWhole(player.h.automationTier.add(3)) + " points." },
            canClick() { return player.h.hexPoints[player.h.automationTier.add(2)].gte(player.h.automationTierReq) },
            unlocked() { return true },
            onClick() {
                layers.h.automationTierReset()
                player.h.hexPoints[player.h.hex] = new Decimal(0)
                player.h.hexPointsToGet[player.h.hex] = new Decimal(0)
                player.h.hexPointsEffect[player.h.hex] = new Decimal(1)

                player.h.hexPoints.push(new Decimal(0))
                player.h.hexPointsToGet.push(new Decimal(0))
                player.h.hexPointsEffect.push(new Decimal(1))
                player.h.automationTier = player.h.automationTier.add(1)
            },
            style: { width: '400px', "min-height": '100px' },
        },
        16: {
            title() { return "<h3>Do the equivalent of a big crunch, and automation tier reset, but reset for rage power.<br>Req: 1e100 Hex 1 Points" },
            canClick() { return player.h.hexPoints[0].gte(1e100) },
            unlocked() { return true },
            onClick() {
                player.h.ragePower = player.h.ragePower.add(player.h.ragePowerToGet)
                player.h.ragePowerPause = new Decimal(6)
            },
            style: { width: '400px', "min-height": '100px', background: "#ff5555", },
        },
    },
    hexPointReset(layer)
    {
        for (let i = 0; i<layer; i++)
        {
            player.h.hexPoints[i] = new Decimal(0)
        }
        player.h.hexPoints[layer] = player.h.hexPoints[layer].add(player.h.hexPointsToGet[layer])
    },
    automationTierReset()
    {
        for (let i = 0; i<player.h.hex; i++)
        {
            player.h.hexPoints[i] = new Decimal(0)
        }
    },
    hexReset()
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

        if (!hasMilestone("ip", 14))
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
        for (let i = 0; i < player.rf.abilityTimers.length; i++)
        {
            player.rf.abilityTimers[i] = new Decimal(0)
        }

        for (let i = 0; i < player.rf.upgrades.length; i++) {
            if (+player.rf.upgrades[i] < 16) {
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
    },
    ragePowerReset()
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

        if (!hasMilestone("ip", 14))
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
        for (let i = 0; i < player.rf.abilityTimers.length; i++)
        {
            player.rf.abilityTimers[i] = new Decimal(0)
        }

        for (let i = 0; i < player.rf.upgrades.length; i++) {
            if (+player.rf.upgrades[i] < 16) {
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

        //hex
        for (let i = 0; i<player.h.hex; i++)
        {
            player.h.hexPoints[i] = new Decimal(0)
        }
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(2000) },
            currency() { return player.h.hexPoints[0]},
            pay(amt) { player.h.hexPoints[0] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,000<br/>Factor Power Multiplier"
            },
            display() {
                return "which are boosting factor power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasUpgrade("tad", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("tad", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.33) },
            purchaseLimit() { return new Decimal(2000) },
            currency() { return player.h.hexPoints[0]},
            pay(amt) { player.h.hexPoints[0] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.18).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,000<br/>Prestige Point Multiplier"
            },
            display() {
                return "which are boosting prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasUpgrade("tad", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("tad", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.36) },
            purchaseLimit() { return new Decimal(2000) },
            currency() { return player.h.hexPoints[0]},
            pay(amt) { player.h.hexPoints[0] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.175).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,000<br/>Tree and Leaf Multiplier"
            },
            display() {
                return "which are boosting tree and leaf gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasUpgrade("tad", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("tad", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(65) },
            costGrowth() { return new Decimal(1.39) },
            purchaseLimit() { return new Decimal(2000) },
            currency() { return player.h.hexPoints[0]},
            pay(amt) { player.h.hexPoints[0] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.16).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,000<br/>Grass Multiplier"
            },
            display() {
                return "which are boosting grass gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasUpgrade("tad", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("tad", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.42) },
            purchaseLimit() { return new Decimal(2000) },
            currency() { return player.h.hexPoints[0]},
            pay(amt) { player.h.hexPoints[0] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.15).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,000<br/>Grasshoper Multiplier"
            },
            display() {
                return "which are boosting grasshopper gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasUpgrade("tad", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("tad", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.46) },
            purchaseLimit() { return new Decimal(2000) },
            currency() { return player.h.hexPoints[0]},
            pay(amt) { player.h.hexPoints[0] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.15).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,000<br/>Fertilizer Multiplier"
            },
            display() {
                return "which are boosting fertilizer gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasUpgrade("tad", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("tad", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            costBase() { return new Decimal(1500) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(2000) },
            currency() { return player.h.hexPoints[0]},
            pay(amt) { player.h.hexPoints[0] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.12).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,000<br/>Code Experience Multiplier"
            },
            display() {
                return "which are boosting code experience gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasUpgrade("tad", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("tad", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            costBase() { return new Decimal(2500) },
            costGrowth() { return new Decimal(1.55) },
            purchaseLimit() { return new Decimal(2000) },
            currency() { return player.h.hexPoints[0]},
            pay(amt) { player.h.hexPoints[0] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,000<br/>Lines of Code and Mod Multiplier"
            },
            display() {
                return "which are boosting lines of code and mod gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasUpgrade("tad", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("tad", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        21: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.h.hexPoints[5]},
            pay(amt) { player.h.hexPoints[5] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/500<br/>Infinity Point Blessing I"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 6 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.h.hexPoints[11]},
            pay(amt) { player.h.hexPoints[11] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.03).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/500<br/>Infinity Point Blessing II"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 12 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            costBase() { return new Decimal(1e6) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.h.hexPoints[19]},
            pay(amt) { player.h.hexPoints[19] = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.06).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/250<br/>Infinity Point Blessing III"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 20 Points"
            },
            buy() {
                if (player.h.hexMax == false && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },

        //RAGE POWER
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
                    ["raw-html", function () { return "You are at hex <h3>" + formatWhole(player.h.hex) + ". (+" + formatWhole(player.h.hexToGet) + ")"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 12], ["clickable", 14], ["clickable", 13]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.h.hexPoints[player.h.hexResetIndex]) + "</h3> hex " + formatWhole(player.h.hexResetIndex.add(1)) + " points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return  player.h.hexResetIndex.eq(0) ? "You are gaining <h3>" + format(player.h.hexPointsToGet[0]) + "</h3> hex 1 points per second (based on hex)." : "" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return  player.h.hexResetIndex.gt(0) ? "You will gain <h3>" + format(player.h.hexPointsToGet[player.h.hexResetIndex]) + "</h3> hex " + formatWhole(player.h.hexResetIndex.add(1)) + " on reset (based on previous hex points)." : "" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.h.hexResetIndex.eq(0) ? "Boosts points by x" + format(player.h.hexPointsEffect[0]) + ".":"" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.h.hexResetIndex.gt(0) ? "Boosts hex " + formatWhole(player.h.hexResetIndex) + " points by x" + format(player.h.hexPointsEffect[player.h.hexResetIndex]) + ".":"" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Hex progress is kept on infinity, but the effects are only active when hex is active."  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ],
            },
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.h.hexPoints[0]) + "</h3> hex 1 points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.h.hexPointsToGet[0]) + "</h3> hex 1 points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                ],
            },
            "Automation": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasChallenge("ip", 13) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You are at automation tier <h3>" + formatWhole(player.h.automationTier) + "."  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 15]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You are gaining <h3>" + formatWhole(player.h.automationTierEffect.mul(100)) + "%</h3> hex points per second up to hex " + formatWhole(player.h.automationTier.add(1)) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                ],
            },
            "THE BLESSING": {
                buttonStyle() { return { 'background-color': '#FFBF00', "color": "white" } },
                unlocked() { return hasChallenge("ip", 13) },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 21], ["buyable", 22],["buyable", 23],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These effects are always active."  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ],
            },
            "RAGE POWER": {
                buttonStyle() { return { 'border-color': '#5e0000', 'background-color': '#ff5555', "color": "red" } },
                unlocked() { return hasUpgrade("i", 29) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.h.ragePower) + "</h3> rage power, which boost antimatter dimensions by x" + format(player.h.ragePowerEffect) + "."}, { "color": "#ff5555", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.h.ragePowerToGet) + "</h3> rage power on reset." }, { "color": "#ff5555", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Based on hex 1 points)" }, { "color": "#ff5555", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 16]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Rage power also boosts hex " + formatWhole(player.h.currentRagePowerEffect.add(1)) + " points by x" + format(player.h.ragePowerCycleEffect) + "." }, { "color": "#ff5555", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Time to increase hex layer: " + formatTime(player.h.ragePowerCycleTimer) + "/" + formatTime(player.h.ragePowerCycleTimerReq) + "." }, { "color": "#ff5555", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["text-input", "ragePowerCycleTimerReqInput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                ],
            },
        },
    },

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && inChallenge("ip", 13) || player.po.hex}
})
window.addEventListener('load', function() {
    // This function will be executed after the page is reloaded
    // You can perform any necessary tasks here
});

/*
    player.h.hexPoints = []
    player.h.hexPointsEffect = []
    player.h.hexPointsToGet = [] */
