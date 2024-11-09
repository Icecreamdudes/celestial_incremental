addLayer("rm", {
    name: "RM", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RM", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        blankMods: new Decimal(0),
        blankModsToGet: new Decimal(0),
        blankModsPause: new Decimal(0),

        currentDisplay: new Decimal(0),

        realmModTitleText: "",
        realmModCountText: "",
        realmModResetText: "",
        realmModBoostText: "",
        realmModEffectText: "",

        realmMods: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        realmModsEffect: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        realmModsToGet: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        realmModsMulti: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],

        realmEnergy: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        realmEnergyPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        realmEnergyText: "",

        halterBoostCheck: false,
        halterBoost: new Decimal(0),
        halterBoostEffect: new Decimal(1),
    }
    },
    automate() {

    },
    nodeStyle() {
        return {
            "background-image": "linear-gradient(180deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)",
            "background-origin": "border-box",
            "color": "white",
            "border-color": "#0061ff",
        }
    },
    tooltip: "Mods",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        player.rm.blankModsToGet = player.m.mods.pow(0.01)
        player.rm.blankModsToGet = player.rm.blankModsToGet.mul(player.cb.rarePetEffects[6][0])

        if (player.rm.blankModsPause.gt(0)) {
            layers.rm.blankModReset();
        }
        player.rm.blankModsPause = player.rm.blankModsPause.sub(1)

        if (player.rm.currentDisplay.eq(0))
        {
            player.rm.realmModTitleText = "You are converting for THE CREATOR REALM"
            player.rm.realmModCountText = "You have " + format(player.rm.realmMods[player.rm.currentDisplay]) + " creator realm mods (+" + format(player.rm.realmModsToGet[player.rm.currentDisplay]) + ")"
            player.rm.realmModResetText = "Converting will do an XPBoost equivalent reset."
            player.rm.realmModBoostText = "Check back level boosts conversions by x" + format(player.rm.realmModsMulti[player.rm.currentDisplay]) + "."
            player.rm.realmModEffectText = "Creator realm mods boosts check back xp gain by x" + format(player.rm.realmModsEffect[player.rm.currentDisplay]) + "."
        }
        if (player.rm.currentDisplay.eq(1)) 
        {
            player.rm.realmModTitleText = "You are converting for THE HIGHER PLANE OF EXISTENCE"
            player.rm.realmModCountText = "You have " + format(player.rm.realmMods[player.rm.currentDisplay]) + " higher plane mods (+" + format(player.rm.realmModsToGet[player.rm.currentDisplay]) + ")"
            player.rm.realmModResetText = "Converting will reset steelie, crystals, and time reversal."
            player.rm.realmModBoostText = "Steel boosts conversions by x" + format(player.rm.realmModsMulti[player.rm.currentDisplay]) + "."
            player.rm.realmModEffectText = "Higher plane mods boosts crystal and steel gain by x" + format(player.rm.realmModsEffect[player.rm.currentDisplay]) + "."
        }
        if (player.rm.currentDisplay.eq(2)) 
        {
            player.rm.realmModTitleText = "You are converting for THE DEATH REALM"
            player.rm.realmModCountText = "You have " + format(player.rm.realmMods[player.rm.currentDisplay]) + " death realm mods (+" + format(player.rm.realmModsToGet[player.rm.currentDisplay]) + ")"
            player.rm.realmModResetText = "Converting will reset hex, including automation tier and rage power."
            player.rm.realmModBoostText = "Rage power boosts conversions by x" + format(player.rm.realmModsMulti[player.rm.currentDisplay]) + "."
            player.rm.realmModEffectText = "Death realm mods boosts all hex point gain by x" + format(player.rm.realmModsEffect[player.rm.currentDisplay]) + "."
        }
        if (player.rm.currentDisplay.eq(3))
        {
            player.rm.realmModTitleText = "You are converting for THE DIMENSIONAL REALM"
            player.rm.realmModCountText = "You have " + format(player.rm.realmMods[player.rm.currentDisplay]) + " dimensional realm mods (+" + format(player.rm.realmModsToGet[player.rm.currentDisplay]) + ")"
            player.rm.realmModResetText = "Converting will reset currently owned infinity dims/power and replicanti to 1."
            player.rm.realmModBoostText = "Infinity power boosts conversions by x" + format(player.rm.realmModsMulti[player.rm.currentDisplay]) + "."
            player.rm.realmModEffectText = "Dimensional realm mods boosts infinity dimensions by x" + format(player.rm.realmModsEffect[player.rm.currentDisplay]) + "."
        }
        if (player.rm.currentDisplay.eq(4)) 
        {
            player.rm.realmModTitleText = "You are converting for THE DREAM REALM"
            player.rm.realmModCountText = "You have " + format(player.rm.realmMods[player.rm.currentDisplay]) + " dream realm mods (+" + format(player.rm.realmModsToGet[player.rm.currentDisplay]) + ")"
            player.rm.realmModResetText = "Converting will reset negative infinity and mastery progress."
            player.rm.realmModBoostText = "Negative infinity points boost conversions by x" + format(player.rm.realmModsMulti[player.rm.currentDisplay]) + "."
            player.rm.realmModEffectText = "Dream realm mods boosts the first 3 mastery point gain by x" + format(player.rm.realmModsEffect[player.rm.currentDisplay]) + "."
        }
        if (player.rm.currentDisplay.eq(5))
        {
            player.rm.realmModTitleText = "You are converting for THE VOID"
            player.rm.realmModCountText = "You have " + format(player.rm.realmMods[player.rm.currentDisplay]) + " void mods (+" + format(player.rm.realmModsToGet[player.rm.currentDisplay]) + ")"
            player.rm.realmModResetText = "Converting will reset broken infinity and infinity point buyables and amounts."
            player.rm.realmModBoostText = "Infinities boost conversions by x" + format(player.rm.realmModsMulti[player.rm.currentDisplay]) + "."
            player.rm.realmModEffectText = "Void mods boosts infinity point gain by x" + format(player.rm.realmModsEffect[player.rm.currentDisplay]) + "."
        }

        player.rm.realmModsMulti[0] = player.cb.level.pow(0.4).div(10).add(1)
        player.rm.realmModsToGet[0] = player.m.mods.pow(0.02).mul(3).mul(player.rm.realmModsMulti[0])
        player.rm.realmModsToGet[0] = player.rm.realmModsToGet[0].mul(buyableEffect("rm", 11))

        player.rm.realmModsMulti[1] = player.gh.steel.plus(1).log10().div(10).add(1)
        player.rm.realmModsToGet[1] = player.m.mods.pow(0.015).mul(3).mul(player.rm.realmModsMulti[1])
        player.rm.realmModsToGet[1] = player.rm.realmModsToGet[1].mul(buyableEffect("rm", 12))

        player.rm.realmModsMulti[2] = player.h.ragePower.pow(0.4).div(7).add(1)
        player.rm.realmModsToGet[2] = player.m.mods.pow(0.02).mul(3).mul(player.rm.realmModsMulti[2])
        player.rm.realmModsToGet[2] = player.rm.realmModsToGet[2].mul(buyableEffect("rm", 13))

        player.rm.realmModsMulti[3] = player.id.infinityPower.plus(1).log10().pow(0.5).div(5).add(1)
        player.rm.realmModsToGet[3] = player.m.mods.pow(0.02).mul(3).mul(player.rm.realmModsMulti[3])
        player.rm.realmModsToGet[3] = player.rm.realmModsToGet[3].mul(buyableEffect("rm", 14))

        player.rm.realmModsMulti[4] = player.ta.negativeInfinityPoints.plus(1).log10().pow(0.65).div(4).add(1)
        player.rm.realmModsToGet[4] = player.m.mods.pow(0.02).mul(3).mul(player.rm.realmModsMulti[4])
        player.rm.realmModsToGet[4] = player.rm.realmModsToGet[4].mul(buyableEffect("rm", 15))

        player.rm.realmModsMulti[5] = player.in.infinities.pow(0.2).div(18).add(1)
        player.rm.realmModsToGet[5] = player.m.mods.pow(0.02).mul(3).mul(player.rm.realmModsMulti[5])
        player.rm.realmModsToGet[5] = player.rm.realmModsToGet[5].mul(buyableEffect("rm", 16))

        //effects
        player.rm.realmModsEffect[0] = player.rm.realmMods[0].pow(0.02).div(10).add(1)
        player.rm.realmModsEffect[1] = player.rm.realmMods[1].pow(0.35).div(2).add(1)
        player.rm.realmModsEffect[2] = player.rm.realmMods[2].pow(0.65).add(1)
        player.rm.realmModsEffect[3] = player.rm.realmMods[3].pow(0.45).add(1)
        player.rm.realmModsEffect[4] = player.rm.realmMods[4].pow(0.25).mul(2).div(2.5).add(1)
        player.rm.realmModsEffect[5] = player.rm.realmMods[5].pow(0.45).mul(3).div(1.5).add(1)

        //energy
        for (let i = 0; i < 6; i++)
        {
            player.rm.realmEnergyPerSecond[i] = player.rm.realmMods[i].pow(0.7).div(10)
            player.rm.realmEnergy[i] = player.rm.realmEnergy[i].add(player.rm.realmEnergyPerSecond[i].mul(delta))
        }
        player.rm.realmEnergyText = "You have " + format(player.rm.realmEnergy[player.rm.currentDisplay]) + " energy for this realm.<br><h5>You are gaining " + format(player.rm.realmEnergyPerSecond[player.rm.currentDisplay]) + " energy per second. (Based on realm mods)"

        player.rm.halterBoostEffect = player.rm.halterBoost.plus(1).log10().pow(0.1).add(1)
    },
    blankModReset()
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
    branches: ["m", "cb"],
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
        11: {
            title() { return "<h3>Do the equivalent of a big crunch for blank mods." },
            canClick() { return player.rm.blankModsToGet.gte(1)},
            unlocked() { return true },
            onClick() {
                player.rm.blankModsPause = new Decimal(5)
                player.rm.blankMods = player.rm.blankMods.add(player.rm.blankModsToGet)
            },
            style: { 'background-image': '#98245c', width: '400px', "min-height": '100px', },
        },
        12: {
            title() { return "<img src='resources/symbolCreator.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.rm.currentDisplay = new Decimal(0) //Each number is assinged to its corresponding realm
            },
        },
        13: {
            title() { return "<img src='resources/symbolHigh.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.rm.currentDisplay = new Decimal(1)
            },
        },
        14: {
            title() { return "<img src='resources/symbolDeath.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.rm.currentDisplay = new Decimal(2)
            },
        },
        15: {
            title() { return "<img src='resources/symbolDimension.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.rm.currentDisplay = new Decimal(3)
            },
        },
        16: {
            title() { return "<img src='resources/symbolBackrooms.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.rm.currentDisplay = new Decimal(4)
            },
        },
        17: {
            title() { return "<img src='resources/symbolVoid.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            onClick() {
                player.rm.currentDisplay = new Decimal(5)
            },
        },      
        21: {
            title() { return "<h3>Convert Creator Realm Mods (Req: Check Back Level 150)" },
            canClick() { return player.cb.level.gte(150)},
            unlocked() { return player.rm.currentDisplay.eq(0) },
            onClick() {
                player.rm.realmMods[0] = player.rm.realmMods[0].add(player.rm.realmModsToGet[0])

                player.cb.level = new Decimal(1)
                player.cb.xp = new Decimal(0)
                player.cb.totalxp = new Decimal(5.1)
            },
            style: { 'background-image': '#98245c', width: '400px', "min-height": '100px', },
        },  
        22: {
            title() { return "<h3>Convert Higher Plane Mods (Req: 1e15 steel)" },
            canClick() { return player.gh.steel.gte(1e15)},
            unlocked() { return player.rm.currentDisplay.eq(1) },
            onClick() {
                player.rm.realmMods[1] = player.rm.realmMods[1].add(player.rm.realmModsToGet[1])

                player.r.timeCubes = new Decimal(0)
                player.r.buyables[11] = new Decimal(0)
                player.r.buyables[12] = new Decimal(0)
                player.r.buyables[13] = new Decimal(0)
                player.r.buyables[14] = new Decimal(0)

                player.p.crystals = new Decimal(0)
                player.p.buyables[11] = new Decimal(0)
                player.p.buyables[12] = new Decimal(0)
                player.p.buyables[13] = new Decimal(0)
                player.p.buyables[14] = new Decimal(0)
                player.p.buyables[15] = new Decimal(0)
                player.p.buyables[16] = new Decimal(0)
                player.p.buyables[17] = new Decimal(0)
                player.p.buyables[18] = new Decimal(0)

                player.gh.steel = new Decimal(0)
                player.gh.buyables[31] = new Decimal(0)
                player.gh.buyables[32] = new Decimal(0)
                player.gh.buyables[33] = new Decimal(0)
                player.gh.buyables[34] = new Decimal(0)
                player.gh.buyables[35] = new Decimal(0)
                player.gh.buyables[36] = new Decimal(0)
                player.gh.buyables[37] = new Decimal(0)
                player.gh.buyables[38] = new Decimal(0)
            },
            style: { 'background-image': '#98245c', width: '400px', "min-height": '100px', },
        },  
        23: {
            title() { return "<h3>Convert Death Realm Mods (Req: hex 21)" },
            canClick() { return player.h.hex.gte(21)},
            unlocked() { return player.rm.currentDisplay.eq(2) },
            onClick() {
                player.rm.realmMods[2] = player.rm.realmMods[2].add(player.rm.realmModsToGet[2])

                player.h.hex = new Decimal(0)
                player.h.automationTier = new Decimal(0)
                player.h.ragePower = new Decimal(0)
                for (let i = 0; i<player.h.hex; i++)
                {
                    player.h.hexPoints[i] = new Decimal(0)
                }
            },
            style: { 'background-image': '#98245c', width: '400px', "min-height": '100px', },
        },  
        24: {
            title() { return "<h3>Convert Dimensional Realm Mods (Req: 1.79e308 replicanti)" },
            canClick() { return player.ca.replicanti.gte(1.79e308)},
            unlocked() { return player.rm.currentDisplay.eq(3) },
            onClick() {
                player.rm.realmMods[3] = player.rm.realmMods[3].add(player.rm.realmModsToGet[3])

                player.id.infintityPower = new Decimal(0)
                player.ca.replicanti = new Decimal(1)
                for (let i = 0; i<player.id.dimensionsUnlocked; i++)
                {
                    if (player.id.dimensionsUnlocked[i]) player.id.dimensionAmounts[i] = new Decimal(1)
                }
            },
            style: { 'background-image': '#98245c', width: '400px', "min-height": '100px', },
        },  
        25: {
            title() { return "<h3>Convert Dream Realm Mods (Req: 1e18 negative infinity points)" },
            canClick() { return player.ta.negativeInfinityPoints.gte(1e18)},
            unlocked() { return player.rm.currentDisplay.eq(4) },
            onClick() {
                player.rm.realmMods[4] = player.rm.realmMods[4].add(player.rm.realmModsToGet[4])

                player.ta.negativeInfinityPoints = new Decimal(0)
                player.ta.buyables[11] = new Decimal(0)
                player.ta.buyables[12] = new Decimal(0)
                player.ta.buyables[13] = new Decimal(0)
                player.ta.buyables[14] = new Decimal(0)
                player.ta.buyables[15] = new Decimal(0)
                player.ta.buyables[16] = new Decimal(0)
                player.ta.buyables[17] = new Decimal(0)
                player.ta.buyables[18] = new Decimal(0)
                player.ta.buyables[19] = new Decimal(0)
                player.ta.buyables[21] = new Decimal(0)
                player.ta.buyables[22] = new Decimal(0)
                player.ta.buyables[23] = new Decimal(0)
                player.ta.buyables[24] = new Decimal(0)
                player.ta.buyables[25] = new Decimal(0)
                player.ta.buyables[26] = new Decimal(0)
                player.ta.buyables[27] = new Decimal(0)
                player.ta.buyables[28] = new Decimal(0)
                player.ta.buyables[29] = new Decimal(0)
                player.ta.buyables[31] = new Decimal(0)
                player.ta.buyables[32] = new Decimal(0)
                player.ta.buyables[33] = new Decimal(0)
                player.ta.buyables[34] = new Decimal(0)
                player.ta.buyables[35] = new Decimal(0)
                player.ta.buyables[36] = new Decimal(0)
                player.ta.buyables[37] = new Decimal(0)

                player.om.diceMasteryPoints = new Decimal(0)
                player.om.rocketFuelMasteryPoints = new Decimal(0)
                player.om.hexMasteryPoints = new Decimal(0)
                player.om.buyables[11] = new Decimal(0)
                player.om.buyables[12] = new Decimal(0)
                player.om.buyables[13] = new Decimal(0)
                player.om.buyables[14] = new Decimal(0)
                player.om.buyables[15] = new Decimal(0)
                player.om.buyables[16] = new Decimal(0)

            },
            style: { 'background-image': '#98245c', width: '400px', "min-height": '100px', },
        },  
        26: {
            title() { return "<h3>Convert Void Mods (Req: 5,000,000 infinities)" },
            canClick() { return player.in.infinities.gte(5e6)},
            unlocked() { return player.rm.currentDisplay.eq(5) },
            onClick() {
                player.rm.realmMods[5] = player.rm.realmMods[5].add(player.rm.realmModsToGet[5])

                player.in.infinities = new Decimal(0)
                player.bi.brokenInfinities = new Decimal(0)

                player.in.buyables[11] = new Decimal(0)
                player.in.buyables[12] = new Decimal(0)
                player.in.buyables[13] = new Decimal(0)
                player.in.buyables[14] = new Decimal(0)

                player.bi.buyables[11] = new Decimal(0)
                player.bi.buyables[12] = new Decimal(0)
                player.bi.buyables[13] = new Decimal(0)
            },
            style: { 'background-image': '#98245c', width: '400px', "min-height": '100px', },
        },  
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.rm.blankMods.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>CREATOR REALM BOOST"
            },
            display() {
                return "which are multiplying creator realm mod conversion rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Blank Mods"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.blankMods = player.rm.blankMods.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.blankMods, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.blankMods = player.rm.blankMods.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.rm.blankMods.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>HIGHER PLANE BOOST"
            },
            display() {
                return "which are multiplying higher plane mod conversion rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Blank Mods"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.blankMods = player.rm.blankMods.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.blankMods, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.blankMods = player.rm.blankMods.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.rm.blankMods.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>DEATH REALM BOOST"
            },
            display() {
                return "which are multiplying death realm mod conversion rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Blank Mods"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.blankMods = player.rm.blankMods.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.blankMods, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.blankMods = player.rm.blankMods.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.rm.blankMods.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>DIMENSIONAL REALM BOOST"
            },
            display() {
                return "which are multiplying dimensional realm mod conversion rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Blank Mods"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.blankMods = player.rm.blankMods.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.blankMods, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.blankMods = player.rm.blankMods.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.rm.blankMods.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>DREAM REALM BOOST"
            },
            display() {
                return "which are multiplying dream realm mod conversion rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Blank Mods"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.blankMods = player.rm.blankMods.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.blankMods, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.blankMods = player.rm.blankMods.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.rm.blankMods.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>VOID BOOST"
            },
            display() {
                return "which are multiplying void mod conversion rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Blank Mods"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.blankMods = player.rm.blankMods.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.blankMods, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.blankMods = player.rm.blankMods.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },

        //creator realm
        21: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.0005).pow(0.4).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(0) },
            canAfford() { return player.rm.realmEnergy[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>RANK LAYER BOOST"
            },
            display() {
                return "which boost ranks, tiers, tetr, and pent effect by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Creator Realm Energy"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[0] = player.rm.realmEnergy[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[0] = player.rm.realmEnergy[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(150) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(0) },
            canAfford() { return player.rm.realmEnergy[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>FACTOR LAYER BOOST"
            },
            display() {
                return "which multiplies the factor base by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Creator Realm Energy"
            },
            buy() {
                let base = new Decimal(150)
                let growth = 1.6
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[0] = player.rm.realmEnergy[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[0] = player.rm.realmEnergy[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            cost(x) { return new Decimal(1.7).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.007).pow(0.55).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(1) },
            canAfford() { return player.rm.realmEnergy[1].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>PRESTIGE LAYER BOOST"
            },
            display() {
                return "which boosts prestige point gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Higher Plane Energy"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.7
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[1] = player.rm.realmEnergy[1].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[1], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[1] = player.rm.realmEnergy[1].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        24: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(275) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.05).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(1) },
            canAfford() { return player.rm.realmEnergy[1].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>TREE LAYER BOOST"
            },
            display() {
                return "which boosts tree gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Higher Plane Energy"
            },
            buy() {
                let base = new Decimal(275)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[1] = player.rm.realmEnergy[1].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[1], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[1] = player.rm.realmEnergy[1].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        25: {
            cost(x) { return new Decimal(1.75).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.45).mul(0.045).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(2) },
            canAfford() { return player.rm.realmEnergy[2].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>GRASS LAYER BOOST"
            },
            display() {
                return "which boosts grass gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Death Realm Energy"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.75
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[2] = player.rm.realmEnergy[2].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[2], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[2] = player.rm.realmEnergy[2].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        26: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(250) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(2) },
            canAfford() { return player.rm.realmEnergy[2].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>GOLDEN GRASS BOOST"
            },
            display() {
                return "which boosts golden grass gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Death Realm Energy"
            },
            buy() {
                let base = new Decimal(250)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[2] = player.rm.realmEnergy[2].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[2], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[2] = player.rm.realmEnergy[2].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        27: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(80) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.35).mul(0.03).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(3) },
            canAfford() { return player.rm.realmEnergy[3].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>GRASSHOP LAYER BOOST"
            },
            display() {
                return "which boosts grasshopper gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dimensional Realm Energy"
            },
            buy() {
                let base = new Decimal(80)
                let growth = 1.6
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[3] = player.rm.realmEnergy[3].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[3], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[3] = player.rm.realmEnergy[3].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        28: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(200) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.025).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(3) },
            canAfford() { return player.rm.realmEnergy[3].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>MOD LAYER BOOST"
            },
            display() {
                return "which boosts mod gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dimensional Realm Energy"
            },
            buy() {
                let base = new Decimal(200)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[3] = player.rm.realmEnergy[3].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[3], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[3] = player.rm.realmEnergy[3].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        31: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(40) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(4).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(4) },
            canAfford() { return player.rm.realmEnergy[4].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>ANTIMATTER DIMENSIONS LAYER BOOST"
            },
            display() {
                return "which boosts antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dream Realm Energy"
            },
            buy() {
                let base = new Decimal(40)
                let growth = 1.4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[4] = player.rm.realmEnergy[4].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[4], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[4] = player.rm.realmEnergy[4].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        32: {
            cost(x) { return new Decimal(1.85).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(4) },
            canAfford() { return player.rm.realmEnergy[4].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>TAV LAYER BOOST"
            },
            display() {
                return "which boosts negative infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dream Realm Energy"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.85
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[4] = player.rm.realmEnergy[4].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[4], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[4] = player.rm.realmEnergy[4].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        33: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(80) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return player.rm.currentDisplay.eq(5) },
            canAfford() { return player.rm.realmEnergy[5].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>BREAK INFINITY LAYER BOOST"
            },
            display() {
                return "which boosts broken infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Void Energy"
            },
            buy() {
                let base = new Decimal(80)
                let growth = 1.45
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[5] = player.rm.realmEnergy[5].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[5], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[5] = player.rm.realmEnergy[5].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        34: {
            cost(x) { return new Decimal(1.65).pow(x || getBuyableAmount(this.layer, this.id)).mul(300) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02) },
            unlocked() { return player.rm.currentDisplay.eq(5) },
            canAfford() { return player.rm.realmEnergy[5].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>CANTE LAYER BOOST"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Void Energy"
            },
            buy() {
                let base = new Decimal(300)
                let growth = 1.65
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rm.realmEnergy[5] = player.rm.realmEnergy[5].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rm.realmEnergy[5], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.rm.realmEnergy[5] = player.rm.realmEnergy[5].sub(cost)

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
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"], 
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
                    ["row", [["buyable", 14], ["buyable", 15], ["buyable", 16]]],
                ]
            },
            "Realms": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.rm.realmModTitleText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.rm.realmModCountText }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.rm.realmModBoostText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.rm.realmModResetText }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.rm.realmModEffectText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 21], ["clickable", 22], ["clickable", 23], ["clickable", 24], ["clickable", 25], ["clickable", 26]]],
                    ["raw-html", function () { return "(Conversions are based on mods)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.rm.realmModCountText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.rm.realmEnergyText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"], 
                    ["row", [["buyable", 21], ["buyable", 22]]],
                    ["row", [["buyable", 23], ["buyable", 24]]],
                    ["row", [["buyable", 25], ["buyable", 26]]],
                    ["row", [["buyable", 27], ["buyable", 28]]],
                    ["row", [["buyable", 31], ["buyable", 32]]],
                    ["row", [["buyable", 33], ["buyable", 34]]],
                ]
            },
            "Halter Boosts": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>Current halt: /" + format(player.po.pointHalt) + "." }],
                    ["raw-html", function () { return "<h3>Eligibility to gain boost: " + player.rm.halterBoostCheck + "." }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h1>Highest Halt: " + format(player.rm.halterBoost) + "."}],
                    ["raw-html", function () { return "<h3>The value doesn't update if you change the halt amount."}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Your current highest halt gives <h3>" + format(player.rm.halterBoostEffect) + "</h3> ???" }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Ooh cryptic something for the next update)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                ]
            },
        },
    }, 

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.rm.blankMods) + "</h3> Blank Mods" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You will gain <h3>" + format(player.rm.blankModsToGet) + "</h3> blank mods on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],

                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.po.realmMods}
})
/*        codeExperience: new Decimal(0),
        codeExperienceToGet: new Decimal(0),
        codeExperiencePause: new Decimal(0),

        linesOfCode: new Decimal(0),
        linesOfCodePerSecond: new Decimal(0),

        mods: new Decimal(0),
        modsEffect: new Decimal(1),
        modsToGet: new Decimal(1),
        modsReq: new Decimal(100),

        modSoftcap: new Decimal(1),
        modSoftcapStart: new Decimal(10),*/
