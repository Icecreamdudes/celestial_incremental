const CORE_STRENGTH = [
    {
        name: "Faulty",
        color: "#b5b5b5",
        buff: 1,
    }, {
        name: "Weak",
        color: "#ebcc6e",
        buff: 1.025,
    }, {
        name: "Average",
        color: "#cf7429",
        buff: 1.05,
    }, {
        name: "Strong",
        color: "#cf3a29",
        buff: 1.075,
    }, {
        name: "Pinnacle",
        color: "#4a1616",
        buff: 1.1,
    },
]
const CORE_INFO = {
    point: {
        name: "Point Core",
        color: "#eaf6f7",
        effect: [
            "Boost points based on itself: x",
            "Boost points: ^",
            "Boost replicanti point multiplier: x"
        ],
    },
    factor: {
        name: "Factor Core",
        color: "#83cecf",
        effect: [
            "Boost factor power based on itself: x",
            "Boost factor power: ^",
            "Boost factor base: x",
        ],
    },
    prestige: {
        name: "Prestige Core",
        color: "#31aeb0",
        effect: [
            "Boost prestige points based on itself: x",
            "Boost prestige points: ^",
            "Boost crystals: x"
        ],
    },
    tree: {
        name: "Tree Core",
        color: "#0b6623",
        effect: [
            "Boost trees based on itself: x",
            "Boost trees: ^",
            "Boost leaves: ^",
        ],
    },
    grass: {
        name: "Grass Core",
        color: "#119B35",
        effect: [
            "Boost grass based on itself: x",
            "Boost golden grass: x",
            "Boost moonstone: x",
        ],
    },
    grasshopper: {
        name: "Grasshopper Core",
        color: "#19e04d",
        effect: [
            "Boost grasshoppers based on itself: x",
            "Boost fertilizer based on itself: x",
            "Boost steel: x",
        ],
    },
    code: {
        name: "Code Core",
        color: "#1377BF",
        effect: [
            "Boost code experience based on itself: x",
            "Boost code experience: ^",
            "Boost mods: x",
        ],
    },
    dice: {
        name: "Dice Core",
        color: "#363636",
        effect: [
            "Boost dice points based on itself: x",
            "Boost dice points: ^",
            "Boost challenge dice points: x",
        ],
    },
    rocket: {
        name: "Rocket Core",
        color: "#2f4f57",
        effect: [
            "Boost rocket fuel based on itself: x",
            "Boost rocket fuel: ^",
            "Boost pollinators: x",
        ],
    },
    antimatter: {
        name: "Antimatter Core",
        color: "#0FFFCA",
        effect: [
            "Boost antimatter based on itself: x",
            "Boost antimatter dimensions: ^",
            "Boost tickspeed: x",
        ],
    },
    infinity: {
        name: "Infinity Core",
        color: "#FFBF00",
        effect: [
            "Boost infinity points based on itself: x",
            "Boost infinity points: ^",
            "Boost infinities: x",
        ],
    },
    checkback: {
        name: "Check Back Core",
        color: "#094599",
        effect: [
            "Boost check back XP: x",
            "Boost XPBoost: x",
            "Divide xp and pet button cooldowns: /",
        ],
    },
    singularity: {
        name: "Singularity Core",
        color: "#440000",
        effect: [
            "Boost singularity points: x",
            "Boost radiation: x",
            "Boost singularity dimensions: x",
        ],
    },
}
addLayer("co", {
    name: "Cores", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Co", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        cores: {
            point: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            factor: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            prestige: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            tree: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            grass: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            grasshopper: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            code: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            dice: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            rocket: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            antimatter: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            infinity: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            checkback: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
            singularity: {
                strength: 0,
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: [
                    new Decimal(1),
                    new Decimal(1),
                    new Decimal(1),
                ],
            },
        },
        resetIndex: "point",
        coreIndex: "point",
    }},
    nodeStyle: {background: "linear-gradient(0deg, #000000 -10%, #6b1919 100%)", backgroundOrigin: "border-box", borderColor: "#260300", color: "#8c3129"},
    tooltip: "Cores",
    color: "#8c3129",
    update(delta) {
        //     <---------     CORE LEVEL CODE     --------->

        for (let prop in player.co.cores) {
            player.co.cores[prop].req = Decimal.pow(10, player.co.cores[prop].level)
            if (player.co.cores[prop].xp.gte(player.co.cores[prop].req)) {
                player.co.cores[prop].level = player.co.cores[prop].level.add(1)
                player.co.cores[prop].xp = player.co.cores[prop].xp.sub(player.co.cores[prop].req)
            }
        }

        //     <---------     CORE EFFECT CODE     --------->
        for (let prop in player.co.cores) {
            player.co.cores[prop].effect = [new Decimal(1), new Decimal(1), new Decimal(1)]
        }

        if (player.co.cores.point.level.gt(0)) {
            let effLevel = player.co.cores.point.level.pow(CORE_STRENGTH[player.co.cores.point.strength].buff)
            player.co.cores.point.effect[0] = player.points.pow(0.035).pow(effLevel.mul(0.1).add(1)).add(1).min("1e25000")
            if (effLevel.lt(11)) player.co.cores.point.effect[1] = effLevel.mul(0.06).add(0.94).max(1.03)
            if (effLevel.gte(11)) player.co.cores.point.effect[1] = effLevel.mul(0.03).add(1.3)
            player.co.cores.point.effect[2] = effLevel.mul(0.5).add(1)
        }

        if (player.co.cores.factor.level.gt(0)) {
            let effLevel = player.co.cores.factor.level.pow(CORE_STRENGTH[player.co.cores.factor.strength].buff)
            player.co.cores.factor.effect[0] = player.f.factorPower.pow(0.02).pow(effLevel.mul(0.1).add(1)).add(1).min("1e5000")
            if (effLevel.lt(11)) player.co.cores.factor.effect[1] = effLevel.mul(0.05).add(0.95).max(1.02)
            if (effLevel.gte(11)) player.co.cores.factor.effect[1] = effLevel.mul(0.02).add(1.28)
            player.co.cores.factor.effect[2] = effLevel.pow(1.5).mul(1.5).add(1)
        }

        if (player.co.cores.prestige.level.gt(0)) {
            let effLevel = player.co.cores.prestige.level.pow(CORE_STRENGTH[player.co.cores.prestige.strength].buff)
            player.co.cores.prestige.effect[0] = player.p.prestigePoints.pow(0.02).pow(effLevel.mul(0.1).add(1)).add(1).min("1e5000")
            if (effLevel.lt(11)) player.co.cores.prestige.effect[1] = effLevel.mul(0.04).add(0.96).max(1.02)
            if (effLevel.gte(11)) player.co.cores.prestige.effect[1] = effLevel.mul(0.02).add(1.18)
            player.co.cores.prestige.effect[2] = effLevel.pow(1.5).mul(2).add(1)
        }

        if (player.co.cores.tree.level.gt(0)) {
            let effLevel = player.co.cores.tree.level.pow(CORE_STRENGTH[player.co.cores.tree.strength].buff)
            player.co.cores.tree.effect[0] = player.t.trees.pow(0.022).pow(effLevel.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.tree.effect[1] = effLevel.mul(0.02).add(1)
            player.co.cores.tree.effect[2] = effLevel.mul(0.02).add(1)
        }

        if (player.co.cores.grass.level.gt(0)) {
            let effLevel = player.co.cores.grass.level.pow(CORE_STRENGTH[player.co.cores.grass.strength].buff)
            player.co.cores.grass.effect[0] = player.g.grass.pow(0.01).pow(effLevel.mul(0.1).add(1)).add(1).min("1e2000")
            player.co.cores.grass.effect[1] = effLevel.pow(2).mul(10).add(1)
            player.co.cores.grass.effect[2] = effLevel.pow(1.5).mul(0.2).add(1)
        }

        if (player.co.cores.grasshopper.level.gt(0)) {
            let effLevel = player.co.cores.grasshopper.level.pow(CORE_STRENGTH[player.co.cores.grasshopper.strength].buff)
            player.co.cores.grasshopper.effect[0] = player.gh.grasshoppers.pow(0.01).pow(effLevel.mul(0.1).add(1)).add(1).min("1e500")
            player.co.cores.grasshopper.effect[1] = player.gh.fertilizer.pow(0.008).pow(effLevel.mul(0.1).add(1)).add(1).min("1e500")
            player.co.cores.grasshopper.effect[2] = effLevel.pow(2).mul(5).add(1)
        }

        if (player.co.cores.code.level.gt(0)) {
            let effLevel = player.co.cores.code.level.pow(CORE_STRENGTH[player.co.cores.code.strength].buff)
            player.co.cores.code.effect[0] = player.m.codeExperience.pow(0.02).pow(effLevel.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.code.effect[1] = effLevel.mul(0.03).add(1)
            player.co.cores.code.effect[2] = effLevel.pow(2).mul(10).add(1)
        }

        if (player.co.cores.dice.level.gt(0)) {
            let effLevel = player.co.cores.dice.level.pow(CORE_STRENGTH[player.co.cores.dice.strength].buff)
            player.co.cores.dice.effect[0] = player.d.dicePoints.pow(0.02).pow(effLevel.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.dice.effect[1] = effLevel.mul(0.02).add(1)
            player.co.cores.dice.effect[2] = effLevel.pow(1.5).mul(3).add(1)
        }

        if (player.co.cores.rocket.level.gt(0)) {
            let effLevel = player.co.cores.rocket.level.pow(CORE_STRENGTH[player.co.cores.rocket.strength].buff)
            player.co.cores.rocket.effect[0] = player.rf.rocketFuel.pow(0.02).pow(effLevel.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.rocket.effect[1] = effLevel.mul(0.02).add(1)
            player.co.cores.rocket.effect[2] = effLevel.pow(1.5).mul(0.5).add(1)
        }

        if (player.co.cores.antimatter.level.gt(0)) {
            let effLevel = player.co.cores.antimatter.level.pow(CORE_STRENGTH[player.co.cores.antimatter.strength].buff)
            player.co.cores.antimatter.effect[0] = player.ad.antimatter.pow(0.04).pow(effLevel.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.antimatter.effect[1] = effLevel.mul(0.02).add(1)
            player.co.cores.antimatter.effect[2] = effLevel.pow(1.5).mul(0.2).add(1)
        }

        if (player.co.cores.infinity.level.gt(0)) {
            let effLevel = player.co.cores.infinity.level.pow(CORE_STRENGTH[player.co.cores.infinity.strength].buff)
            player.co.cores.infinity.effect[0] = player.in.infinityPoints.pow(0.03).pow(effLevel.mul(0.1).add(1)).add(1).min("1e25000")
            player.co.cores.infinity.effect[1] = effLevel.mul(0.01).add(1)
            player.co.cores.infinity.effect[2] = effLevel.pow(1.5).mul(0.5).add(1)
        }

        if (player.co.cores.checkback.level.gt(0)) {
            let effLevel = player.co.cores.checkback.level.pow(CORE_STRENGTH[player.co.cores.checkback.strength].buff)
            player.co.cores.checkback.effect[0] = effLevel.pow(0.5).mul(0.7).add(1)
            player.co.cores.checkback.effect[1] = effLevel.pow(0.5).mul(0.145).add(1)
            player.co.cores.checkback.effect[2] = effLevel.pow(0.5).mul(0.045).add(1)
        }

        if (player.co.cores.singularity.level.gt(0)) {
            let effLevel = player.co.cores.singularity.level.pow(CORE_STRENGTH[player.co.cores.singularity.strength].buff)
            player.co.cores.singularity.effect[0] = effLevel.mul(10).pow(3.5).add(1)
            player.co.cores.singularity.effect[1] = effLevel.pow(1.5).add(1)
            player.co.cores.singularity.effect[2] = effLevel.mul(8).pow(1.7).add(1)
        }
    },
    coreXPCalc(type, singularity) {
        let curr = new Decimal(1)
        switch(type) {
            case "point":
                curr = player.points.add(10).log(10).log(10).div(12).add(1)
                break;
            case "factor":
                curr = player.f.factorPower.add(10).log(10).log(10).div(10).add(1)
                break;
            case "prestige":
                curr = player.p.prestigePoints.add(10).log(10).log(10).div(12).add(1)
                break;
            case "tree":
                curr = player.t.trees.add(10).log(10).log(10).div(10).add(1)
                break;
            case "grass":
                curr = player.g.grass.add(10).log(10).log(10).div(10).add(1)
                break;
            case "grasshopper":
                curr = player.gh.grasshoppers.add(10).log(10).log(10).div(10).add(1)
                break;
            case "code":
                curr = player.m.codeExperience.add(10).log(10).log(10).div(8).add(1)
                break;
            case "dice":
                curr = player.d.dicePoints.add(10).log(10).log(10).div(8).add(1)
                break;
            case "rocket":
                curr = player.rf.rocketFuel.add(10).log(10).log(10).div(8).add(1)
                break;
            case "antimatter":
                curr = player.ad.antimatter.add(10).log(10).log(10).div(10).add(1)
                break;
            case "infinity":
                curr = player.in.infinityPoints.add(10).log(10).log(10).div(6).add(1)
                break;
            case "checkback":
                curr = player.cb.level.add(1).log(10).div(10).add(1)
                break;
            default:
                curr = new Decimal(1)
                break;
        }
        return Decimal.pow(5, singularity.add(1).log(10)).pow(curr)
    },
    singularityReset() {
        //     <----     U1 STUFF     ---->
        player.points = new Decimal(10)
        player.gain = new Decimal(0)

        player.i.upgrades.splice(0, player.i.upgrades.length)

        //     <----     RANK LAYER     ---->
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("s", 12)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
        player.r.pent = new Decimal(0)

        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)

        for (let i = 0; i < player.r.milestones.length; i++) {
            if ((!hasMilestone("s", 12) && +player.r.milestones[i] < 20) || +player.r.milestones[i] > 20) {
                player.r.milestones.splice(i, 1);
                i--;
            }
        }

        player.r.timeCubes = new Decimal(0)
        player.r.timeCubesPerSecond = new Decimal(0)
        for (let i in player.r.buyables) {
            player.r.buyables[i] = new Decimal(0)
        }
        player.r.timeReversed = false

        //     <----     FACTOR LAYER     ---->
        player.f.factorPower = new Decimal(0)
        player.f.factorPowerEffect = new Decimal(1)
        player.f.factorPowerPerSecond = new Decimal(0)

        for (let i in player.f.buyables) {
            player.f.buyables[i] = new Decimal(0)
        }

        //     <----     PRESTIGE LAYER     ---->
        player.p.prestigePoints = new Decimal(0)
        player.p.prestigePointsToGet = new Decimal(0)

        if (!hasMilestone("s", 12)) player.p.upgrades.splice(0, player.p.upgrades.length)
    
        player.p.crystals = new Decimal(0)
        player.p.crystalsToGet = new Decimal(0)
        for (let i in player.p.buyables) {
            player.p.buyables[i] = new Decimal(0)
        }

        //     <----     TREE LAYER     ---->
        player.t.trees = new Decimal(0)
        player.t.treesToGet = new Decimal(0)
        player.t.leaves = new Decimal(0)
        player.t.leavesPerSecond = new Decimal(0)

        for (let i in player.t.buyables) {
            player.t.buyables[i] = new Decimal(0)
        }

        //     <----     GRASS LAYER     ---->
        player.g.grass = new Decimal(0)
        player.g.grassVal = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.goldGrassVal = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        for (let i = 11; i < 20; i++) {
            player.g.buyables[i] = new Decimal(0)
        }

        if (!hasMilestone("s", 12)) player.g.upgrades.splice(0, player.g.upgrades.length)

        player.g.moonstone = new Decimal(0)
        player.g.moonstoneVal = new Decimal(0)
        player.g.savedMoonstone = new Decimal(0)
        player.g.moonstoneCount = new Decimal(0)
        player.g.moonstoneTimer = new Decimal(0)

        if (!hasMilestone("s", 14)) {
            player.g.moonstoneLevel = new Decimal(1)
            for (let i = 21; i < 30; i++) {
                player.g.buyables[i] = new Decimal(0)
            }
        }

        //     <----     GRASSHOPPER LAYER     ---->
        player.gh.grasshoppers = new Decimal(0)
        player.gh.grasshoppersToGet = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)
        player.gh.fertilizerPerSecond = new Decimal(0)
        player.gh.steel = new Decimal(0)
        player.gh.steelToGet = new Decimal(0)

        for (let i in player.gh.buyables) {
            player.gh.buyables[i] = new Decimal(0)
        }

        //     <----     MOD LAYER     ---->
        player.m.codeExperience = new Decimal(0)
        player.m.codeExperienceToGet = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.linesOfCodePerSecond = new Decimal(0)
        player.m.mods = new Decimal(0)
        player.m.modsToGet = new Decimal(0)

        for (let i in player.m.buyables) {
            player.m.buyables[i] = new Decimal(0)
        }

        //     <----     DICE LAYER     ---->
        player.d.dicePoints = new Decimal(0)
        player.d.diceRolls = [new Decimal(1)]
        player.d.dice = new Decimal(1)
        player.d.challengeDicePoints = new Decimal(0)
        player.d.challengeDicePointsToGet = new Decimal(0)

        for (let i in player.d.buyables) {
            player.d.buyables[i] = new Decimal(0)
        }

        player.d.upgrades.splice(0, player.d.upgrades.length)

        for (let i = 0; !hasUpgrade("s", 13) ? i < 15 : i < 11; i++) {
            player.d.diceEffects[i] = new Decimal(1)
        }

        //     <----     ROCKETFUEL LAYER     ---->
        player.rf.rocketFuel = new Decimal(0)
        player.rf.rocketFuelToGet = new Decimal(0)
        player.rf.abilityIndex = -1

        for (let i = 0; i < player.rf.abilitiesUnlocked.length; i++) {
            player.rf.abilitiesUnlocked[i] = false
        }

        for (let i = 0; i < 8; i++) {
            player.rf.abilityTimers[i] = new Decimal(0)
            player.rf.abilityEffects[i] = new Decimal(1)
        }

        player.rf.upgrades.splice(0, player.rf.upgrades.length)

        //     <----     CHECKBACK LAYER     ---->
        player.cb.xp = new Decimal(0)
        player.cb.totalxp = new Decimal(4.5)
        player.cb.level = new Decimal(1)
        if (!hasMilestone("s", 14)) player.cb.XPBoost = new Decimal(1)

        if (!hasMilestone("s", 15)) {
            for (let i = 11; i < 15; i++) {
                player.cb.buyables[i] = new Decimal(0)
            }
        }

        //     <----     U1 CHALLENGE STUFF     ---->
        player.pe.pests = new Decimal(0)
        player.pe.pestsPerSecond = new Decimal(0)
        player.pe.pestEffect = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(0)]

        player.de.antidebuffPoints = new Decimal(0)
        player.de.antidebuffPointsToGet = new Decimal(0)
        player.de.tavEssence = new Decimal(0)
        player.de.tavEssencePerSecond = new Decimal(0)
        player.de.tavPoints = new Decimal(0)
        player.de.tavPointsToGet = new Decimal(0)

        for (let i in player.de.buyables) {
            player.de.buyables[i] = new Decimal(0)
        }

        player.de.upgrades.splice(0, player.de.upgrades.length)

        //     <----     POLLINATOR LAYER     ---->
        player.pol.pollinators = new Decimal(0)
        player.pol.pollinatorsPerSecond = new Decimal(0)

        if (!hasMilestone("s", 22)) {
            player.pol.pollinatorsIndex = 0

            for (let i in player.pol.buyables) {
                player.pol.buyables[i] = new Decimal(0)
            }

            player.pol.upgrades.splice(0, player.pol.upgrades.length)
        }

        //     <----     FACTORY LAYER     ---->
        player.fa.charge = new Decimal(0)
        player.fa.chargeRate = new Decimal(0)
        player.fa.bestCharge = new Decimal(0)

        if (!hasUpgrade("sma", 104)) player.fa.milestones.splice(0, player.fa.milestones.length)

        //     <----     ANTIMATTER LAYER     ---->
        player.ad.antimatter = new Decimal(0)
        player.ad.antimatterPerSecond = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++) {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.dimensionsPerSecond[i] = new Decimal(0)
        }

        player.ad.upgrades.splice(0, player.ad.upgrades.length)

        for (let i in player.ad.buyables) {
            player.ad.buyables[i] = new Decimal(0)
        }

        if (!hasMilestone("s", 17)) player.ta.unlockedReverseBreak = false

        //     <----     INFINITY POINTS LAYER     ---->
        player.ip.activeChallenge = null
        player.in.infinityPoints = new Decimal(0)
        player.in.infinityPointsToGet = new Decimal(0)
        player.in.infinities = new Decimal(8)
        player.in.infinitiesToGet = new Decimal(0)

        player.ip.upgrades.splice(0, player.ip.upgrades.length)

        if (!hasMilestone("s", 12)) player.ip.milestones.splice(0, player.ip.milestones.length)

        if (!hasMilestone("s", 15)) {
            for (let i in player.ip.challenges) {
                player.ip.challenges[i] = 0
            }
        }
                  
        for (let i in player.ip.buyables) {
            player.ip.buyables[i] = new Decimal(0)
        }

        //     <----     INFINITY DIMENSIONS LAYER     ---->
        player.id.infinityPower = new Decimal(0)
        player.id.infinityPowerPerSecond = new Decimal(0)

        for (let i = 0; i < player.id.dimensionAmounts.length; i++) {
            player.id.dimensionAmounts[i] = new Decimal(0)
            player.id.dimensionsPerSecond[i] = new Decimal(0)
        }

        for (let i in player.id.buyables) {
            player.id.buyables[i] = new Decimal(0)
        }
        
        //     <----     TAV LAYER     ---->
        player.ta.negativeInfinityPoints = new Decimal(0)
        player.ta.negativeInfinityPointsToGet = new Decimal(0)
        player.ta.dimBoostLimit = new Decimal(1)
        player.ta.galaxyLimit = new Decimal(1)
        player.ta.highestDicePoints = new Decimal(0)
        player.ta.highestRocketFuel = new Decimal(0)
        player.ta.highestHexPoints = new Decimal(0)

        for (let i = 0; i < player.ta.dimensionPower.length; i++) {
            player.ta.dimensionPower[i] = new Decimal(0)
            player.ta.dimensionPowerPerSecond[i] = new Decimal(0)
        }

        if (!hasMilestone("s", 16)) {
            for (let i = 0; i < player.ta.dimensionAutobuyToggles.length; i++) {
                player.ta.dimensionAutobuyToggles[i] = false
            }
        }

        for (let i in player.ta.buyables) {
            player.ta.buyables[i] = new Decimal(0)
        }
        if (hasMilestone("s", 17)) {
            for (let i = 21; i < 33; i++) {
                player.ta.buyables[i] = new Decimal(1)
                if (i == 29) i++
            }
        }

        player.ta.upgrades.splice(0, player.ta.upgrades.length)

        //     <----     TAV'S DOMAIN LAYER     ---->
        player.tad.activeChallenge = null
        player.tad.currentConversion = new Decimal(-1)
        player.tad.shatteredInfinities = new Decimal(0)
        player.tad.shatteredInfinitiesToGet = new Decimal(0)
        player.tad.disfiguredInfinities = new Decimal(0)
        player.tad.disfiguredInfinitiesToGet = new Decimal(0)
        player.tad.corruptedInfinities = new Decimal(0)
        player.tad.corruptedInfinitiesToGet = new Decimal(0)

        player.tad.upgrades.splice(0, player.tad.upgrades.length)

        for (let i in player.tad.buyables) {
            player.tad.buyables[i] = new Decimal(0)
        }

        //     <----     BREAK INFINITY LAYER     ---->
        player.bi.brokenInfinities = new Decimal(0)
        player.bi.brokenInfinitiesToGet = new Decimal(0)
        if (!hasMilestone("s", 18)) player.bi.IACtoggle = false
        if (!hasMilestone("s", 18)) player.bi.NACtoggle = false

        for (let i in player.bi.buyables) {
            player.bi.buyables[i] = new Decimal(0)
        }

        player.bi.upgrades.splice(0, player.bi.upgrades.length)

        //     <----     OTF MASTERY LAYER     ---->
        player.om.diceMasteryPoints = new Decimal(0)
        player.om.diceMasteryPointsToGet = new Decimal(0)
        player.om.rocketFuelMasteryPoints = new Decimal(0)
        player.om.rocketFuelMasteryPointsToGet = new Decimal(0)
        player.om.hexMasteryPoints = new Decimal(0)
        player.om.hexMasteryPointsToGet = new Decimal(0)

        for (let i in player.om.buyables) {
            player.om.buyables[i] = new Decimal(0)
        }

        //     <----     CANTE LAYER     ---->
        player.ca.replicanti = new Decimal(1)
        player.ca.replicantiMult = new Decimal(1)
        player.ca.replicateChance = new Decimal(0)

        player.ca.galaxyDust = new Decimal(0)
        player.ca.galaxyDustToGet = new Decimal(0)

        if (!hasMilestone("s", 18)) player.ca.canteCores = new Decimal(0)
        if (!hasMilestone("s", 18)) player.ca.canteEnergy = new Decimal(0)
        player.ca.replicantiGalaxies = new Decimal(0)
        if (!hasMilestone("s", 18)) player.ca.rememberanceCores = new Decimal(0)
        player.ca.defeatedCante = false
        
        for (let i in player.ca.buyables) {
            player.ca.buyables[i] = new Decimal(0)
        }

        //     <----     A1 STUFF     ---->
        player.cp.replicantiPoints = new Decimal(1)
        player.cp.replicantiPointsMult = new Decimal(1)

        player.cp.upgrades.splice(0, player.cp.upgrades.length)

        //     <----     ALT-RANK LAYER     ---->
        player.ar.rankPoints = new Decimal(0)
        player.ar.rankPointsToGet = new Decimal(0)
        player.ar.rankPointsPerSec = new Decimal(0)

        player.ar.tierPoints = new Decimal(0)
        player.ar.tierPointsToGet = new Decimal(0)
        player.ar.tierPointsPerSec = new Decimal(0)

        player.ar.tetrPoints = new Decimal(0)
        player.ar.tetrPointsToGet = new Decimal(0)
        player.ar.tetrPointsPerSec = new Decimal(0)

        //     <----     ANONYMITY LAYER     ---->
        player.an.anonymity = new Decimal(0)
        player.an.anonymityToGet = new Decimal(0)

        player.an.upgrades.splice(0, player.an.upgrades.length)

        //     <----     PERK LAYER     ---->
        player.pr.perkPoints = new Decimal(0)
        player.pr.perkPointsToGet = new Decimal(0)
        player.pr.perkPointsChance = new Decimal(0)

        for (let i in player.pr.buyables) {
            player.pr.buyables[i] = new Decimal(0)
        }

        //     <----     REPLI-TREE LAYER     ---->
        player.rt.repliTrees = new Decimal(0)
        player.rt.repliTreesToGet = new Decimal(0)
        player.rt.repliLeaves = new Decimal(1)
        player.rt.repliLeavesMult = new Decimal(1)

        for (let i in player.rt.buyables) {
            player.rt.buyables[i] = new Decimal(0)
        }

        //     <----     REPLI-GRASS LAYER     ---->
        player.rg.repliGrass = new Decimal(1)
        player.rg.repliGrassMult = new Decimal(1)
        player.rg.savedRepliGrass = 0
        player.rg.repliGrassCount = 0

        for (let i in player.rg.buyables) {
            player.rg.buyables[i] = new Decimal(0)
        }

        //     <----     GRASS-SKIP LAYER     ---->
        if (!hasUpgrade("fu", 16)) player.gs.grassSkip = new Decimal(0)
        player.gs.grassSkipToGet = new Decimal(0)
        player.gs.grassSkippers = new Decimal(0)
        player.gs.grassSkippersPerSecond = new Decimal(0)

        if (!hasMilestone("s", 12)) player.gs.milestones.splice(0, player.gs.milestones.length)

        for (let i in player.gs.buyables) {
            player.gs.buyables[i] = new Decimal(0)
        }

        //     <----     OIL LAYER     ---->
        player.oi.oil = new Decimal(0)
        player.oi.oilToGet = new Decimal(0)

        player.oi.linkingPower = [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
        player.oi.linkingPowerPerSecond = [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]

        player.oi.protoMemories = new Decimal(0)
        player.oi.protoMemorySeconds = new Decimal(0)
        player.oi.protoMemorySecondsToGet = new Decimal(0)
        player.oi.protoMemoriesPerSecond = new Decimal(0)

        for (let i = 11; i > 20; i++) {
            player.oi.buyables[i] = new Decimal(0)
        }
        
        if (!hasUpgrade("fu", 16)) {
            for (let i = 21; i > 25; i++) {
                player.oi.buyables[i] = new Decimal(0)
            }
        }

        //     <----     RADIATION LAYER     ---->
        player.ra.radiation = new Decimal(0)
        player.ra.radiationPerSecond = new Decimal(0)

        //     <----     SINGULARITY DIMENSIONS LAYER     ---->
        player.sd.singularityPower = new Decimal(0)
        player.sd.singularityPowerPerSecond = new Decimal(0)

        for (let i = 0; i < player.sd.dimensionAmounts.length; i++) {
            player.sd.dimensionAmounts[i] = getBuyableAmount("sd", i+11)
            player.sd.dimensionsPerSecond[i] = new Decimal(0)
        }

        //     <----     TAB MANAGEMENT     ---->
        player.subtabs["r"]['stuff'] = 'Main'
        player.subtabs["f"]['stuff'] = 'Main'
        player.subtabs["p"]['stuff'] = 'Main'
        player.subtabs["g"]['stuff'] = 'Grass'
        player.subtabs["gh"]['stuff'] = 'Main'
        player.subtabs["de"]['stuff'] = 'Antidebuff'
        player.subtabs["oi"]['stuff'] = 'Main'
        player.subtabs["id"]['stuff'] = 'Dimensions'
        player.subtabs["hrm"]['realms'] = 'Essence'

        //     <----     OTF STUFF     ---->
        if (!hasMilestone("s", 21)) {
            player.po.dice = false
            player.po.rocketFuel = false
            player.po.hex = false
            if (!hasMilestone("s", 18)) {
                player.po.breakInfinity = false
                player.in.breakInfinity = false
            }
            if (hasMilestone("s", 18)) player.po.breakInfinity = true
            player.po.featureSlots = player.po.featureSlotsMax
        }

        for (let i = 0; i < player.po.halterEffects.length; i++) {
            player.po.halterEffects[i] = new Decimal(1)
        }

        //     <----     HEX OF REALMS LAYER     ---->
        player.hrm.blessLimit = new Decimal(0)
        player.hrm.activeChallenge = null
        
        for (let i in player.hrm.challenges) {
            player.hrm.challenges[i] = 0
        }

        //     <----     HEX OF POWER LAYER     ---->
        player.hpw.totalPower = new Decimal(0)
        player.hpw.power = new Decimal(0)
        player.hpw.powerGain = new Decimal(0)
        player.hpw.upgScale = [1, 1, 1, 1, 1, 1, 1, 1]
        player.hpw.vigor = 0

        player.hpw.upgrades.splice(0, player.hpw.upgrades.length)
        player.hpw.milestones.splice(0, player.hpw.milestones.length)

        //     <----     HEX OF PURITY LAYER     ---->
        player.hpu.purity = new Decimal(0)
        player.hpu.totalPurity = new Decimal(0)
        player.hpu.purityGain = new Decimal(0)
        player.hpu.purifierAssign = 1
        player.hpu.purifier = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        player.hpu.purifierEffects = [new Decimal(1), new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(0), new Decimal(1)]

        //     <----     HEX OF CURSES LAYER     ---->
        player.hcu.curses = new Decimal(0)
        player.hcu.cursesGain = new Decimal(0)

        for (let i in player.hcu.buyables) {
            player.hcu.buyables[i] = new Decimal(0)
        }

        //     <----     HEX OF VEXES LAYER     ---->
        player.hve.vex = new Decimal(0)
        player.hve.vexTotal = new Decimal(0)
        player.hve.vexGain = new Decimal(0)
        player.hve.rowCurrent = [0, 0, 0, 0, 0, 0]
        player.hve.rowSpent = [0, 0, 0, 0, 0, 0]
        
        player.hve.upgrades.splice(0, player.hve.upgrades.length)

        //     <----     HEX OF BLESSINGS LAYER     ---->
        player.hbl.blessings = new Decimal(0)
        player.hbl.blessingsGain = new Decimal(0)
        player.hbl.blessingPerSec = new Decimal(0)
        player.hbl.boons = new Decimal(0)
        player.hbl.boonsGain = new Decimal(0)
        player.hbl.blessAutomation = false
        player.hbl.minRefineInput = new Decimal(18)
        player.hbl.minRefine = new Decimal(18)
        player.hbl.boosterDeposit = 0.05
        player.hbl.boosterLevels = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        player.hbl.boosterXP = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        player.hbl.boosterEffects = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(0)]

        player.hbl.upgrades.splice(0, player.hbl.upgrades.length)

        player.hbl.milestones.splice(0, player.hbl.milestones.length)

        //     <----     HEX OF REFINEMENT LAYER     ---->
        player.hre.refinement = new Decimal(0)
        player.hre.refinementGain = new Decimal(0)
        player.hre.refinementEffect = [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], 
            [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]]

        player.hre.milestones.splice(0, player.hre.milestones.length)

        //     <----     HEX OF PROVENANCE LAYER     ---->
        for (let i = 0; i < 6; i++) {
            player.hpr.rank[i] = new Decimal(0)
            player.hpr.rankGain[i] = new Decimal(0)
            player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
        }

        //     <----     HEX STUFF     ---->
        player.h.hexPointGain = new Decimal(0)
        player.h.hexPoint = new Decimal(0)
    },
    clickables: {
        100: {
            title() {
                if (!layerShown("sma")) return "LOCKED"
                if (player.co.cores[player.co.coreIndex].strength >= 5) return "MAXED"
                return "ENHANCE"
            },
            canClick() {
                if (!layerShown("sma") || player.co.cores[player.co.coreIndex].strength >= 5) return false
                return player.sma.starmetalAlloy.gte(Decimal.pow(5, player.co.cores[player.co.coreIndex].strength + 1))
            },
            tooltip() {
                if (layerShown("sma") && player.co.cores[player.co.coreIndex].strength >= 5) {
                    return "Enhance your core: " + formatWhole(Decimal.pow(5, player.co.cores[player.co.coreIndex].strength + 1)) + " SMA"
                }
                return ""
            },
            unlocked: true,
            onClick() {
                player.sma.starmetalAlloy.sub(Decimal.pow(5, player.co.cores[player.co.coreIndex].strength + 1))
                player.co.cores[player.co.coreIndex].strength = player.co.cores[player.co.coreIndex].strength + 1
            },
            style() {
                let look = {width: "75px", minHeight: "37px", border: "0px", borderRadius: "0"}
                if (!layerShown("sma")) {
                    look.backgroundColor = "#333"
                    look.cursor = "default"
                } else if (player.co.cores[player.co.coreIndex].strength >= 5) {
                    look.backgroundColor = "#77bf5f"
                    look.cursor = "default"
                } else if (!this.canClick()) {
                    look.backgroundColor = "#bf8f8f"
                } else {
                    look.backgroundColor = "#c44"
                }
                return look
            },
        },
        101: {
            canClick() {return player.co.cores.point.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "point"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.point.color
                look.borderColor = CORE_STRENGTH[player.co.cores.point.strength].color
                return look
            },
        },
        102: {
            canClick() {return player.co.cores.factor.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "factor"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.factor.color
                look.borderColor = CORE_STRENGTH[player.co.cores.factor.strength].color
                return look
            },
        },
        103: {
            canClick() {return player.co.cores.prestige.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "prestige"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.prestige.color
                look.borderColor = CORE_STRENGTH[player.co.cores.prestige.strength].color
                return look
            },
        },
        104: {
            canClick() {return player.co.cores.tree.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "tree"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.tree.color
                look.borderColor = CORE_STRENGTH[player.co.cores.tree.strength].color
                return look
            },
        },
        105: {
            canClick() {return player.co.cores.grass.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "grass"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.grass.color
                look.borderColor = CORE_STRENGTH[player.co.cores.grass.strength].color
                return look
            },
        },
        106: {
            canClick() {return player.co.cores.grasshopper.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "grasshopper"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.grasshopper.color
                look.borderColor = CORE_STRENGTH[player.co.cores.grasshopper.strength].color
                return look
            },
        },
        107: {
            canClick() {return player.co.cores.code.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "code"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.code.color
                look.borderColor = CORE_STRENGTH[player.co.cores.code.strength].color
                return look
            },
        },
        108: {
            canClick() {return player.co.cores.dice.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "dice"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.dice.color
                look.borderColor = CORE_STRENGTH[player.co.cores.dice.strength].color
                return look
            },
        },
        109: {
            canClick() {return player.co.cores.rocket.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "rocket"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.rocket.color
                look.borderColor = CORE_STRENGTH[player.co.cores.rocket.strength].color
                return look
            },
        },
        110: {
            canClick() {return player.co.cores.antimatter.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "antimatter"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.antimatter.color
                look.borderColor = CORE_STRENGTH[player.co.cores.antimatter.strength].color
                return look
            },
        },
        111: {
            canClick() {return player.co.cores.infinity.level.gt(0)},
            unlocked: true,
            onClick() {
                player.co.coreIndex = "infinity"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                if (!this.canClick()) look.opacity = "0.3"
                look.backgroundColor = CORE_INFO.infinity.color
                look.borderColor = CORE_STRENGTH[player.co.cores.infinity.strength].color
                return look
            },
        },
        113: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "checkback"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.checkback.color
                look.borderColor = CORE_STRENGTH[player.co.cores.checkback.strength].color
                return look
            },
        },
        112: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "singularity"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.singularity.color
                look.borderColor = CORE_STRENGTH[player.co.cores.singularity.strength].color
                return look
            },
        },
        201: {
            title: "Point<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "point"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.point.color
                return look
            },
        },
        202: {
            title: "Factor<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "factor"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.factor.color
                return look
            },
        },
        203: {
            title: "Prestige<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "prestige"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.prestige.color
                return look
            },
        },
        204: {
            title: "Tree<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "tree"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.tree.color
                return look
            },
        },
        205: {
            title: "Grass<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "grass"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.grass.color
                return look
            },
        },
        206: {
            title: "<h2 style='font-size:14px'>Grasshopper</h2><br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "grasshopper"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.grasshopper.color
                return look
            },
        },
        207: {
            title: "Code<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "code"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.code.color
                return look
            },
        },
        208: {
            title: "Dice<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "dice"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.dice.color
                return look
            },
        },
        209: {
            title: "Rocket<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "rocket"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.rocket.color
                return look
            },
        },
        210: {
            title: "<h2 style='font-size:14px'>Antimatter</h2><br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "antimatter"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.antimatter.color
                return look
            },
        },
        211: {
            title: "Infinity<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "infinity"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.infinity.color
                return look
            },
        },
        212: {
            title: "Check Back<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "checkback"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.checkback.color
                return look
            },
        },
        213: {
            title: "Singularity<br>Core",
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.resetIndex = "singularity"
            },
            style() {
                let look = {width: "100px", minHeight: "75px", fontSize: "12px", color: "rgba(0,0,0,0.6)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.backgroundColor = CORE_INFO.singularity.color
                return look
            },
        },
        1000: {
            title: "<h1>Condense all of your power into a core.<br><small>(Req: 1e40 infinity points)</small>",
            canClick() { return player.in.infinityPoints.gte(1e40) },
            unlocked: true,
            onClick() {
                let val = layers.co.coreXPCalc(player.co.resetIndex, player.s.singularityPointsToGet)
                player.co.cores[player.co.resetIndex].xp = player.co.cores[player.co.resetIndex].xp.add(val)
                player.s.singularities = player.s.singularities.add(player.s.singularitiesToGet)
                player.s.singularityPoints = player.s.singularityPoints.add(player.s.singularityPointsToGet)
                player.hrm.realmEssence = player.hrm.realmEssence.add(player.hrm.realmEssenceGain)
                player.ra.storedRadiation = player.ra.storedRadiation.add(player.ra.radiation)

                layers.co.singularityReset()
                if (!hasMilestone("s", 18)) player.tab = "i"
            },
            style: { width: "500px", minHeight: "150px", background: "linear-gradient(-120deg, #6b1919 0%, #cf3a29 100%)", borderRadius: "25px"},
        },
    },
    bars: {
        coreLevel: {
            unlocked: true,
            direction: RIGHT,
            width: 519,
            height: 37,
            progress() {
                return player.co.cores[player.co.coreIndex].xp.div(player.co.cores[player.co.coreIndex].req)
            },
            baseStyle: {backgroundColor: "black"},
            fillStyle: {backgroundColor: "#933"},
            borderStyle: {border: "0px", borderLeft: "3px solid white", borderRadius: "0px"},
            display() {
                return "<h3>" + format(player.co.cores[player.co.coreIndex].xp) + "/" + format(player.co.cores[player.co.coreIndex].req) + "</h3>";
            },
        },
    },
    microtabs: {
        stuff: {
            "Fuel": {
                buttonStyle: {color: "white", borderRadius: "5px"},
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Core Fueling", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
                        ], {width: "700px", height: "50px", borderBottom: "3px solid white"}],
                        ["style-column", [
                            ["raw-html", () => {return "Currently Fueling: " + CORE_INFO[player.co.resetIndex].name}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["raw-html", () => {return "Which will give +" + format(layers.co.coreXPCalc(player.co.resetIndex, player.s.singularityPointsToGet)) + " XP"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], () => {return player.s.highestSingularityPoints.gt(0) ? {width: "700px", height: "80px", backgroundColor: "#411", borderBottom: "3px solid white"} : {width: "700px", height: "80px", backgroundColor: "#411", borderRadius: "0 0 12px 12px"}}],
                        ["style-column", [
                            ["row", [
                                ["clickable", 201], ["clickable", 202], ["clickable", 203], ["clickable", 204], ["clickable", 205],
                                ["clickable", 206], ["clickable", 207], ["clickable", 208], ["clickable", 209], ["clickable", 210],
                                ["clickable", 211]
                            ]],
                        ], () => {return player.s.highestSingularityPoints.gt(0) ? {width: "700px", backgroundColor: "black", borderRadius: "0 0 12px 12px"} : {display: "none !important"}}],
                    ], {width: "700px", backgroundColor: "#611", border: "3px solid white", borderRadius: "15px"}],
                    ["blank", "50px"],
                    ["clickable", 1000],
                ],
            },
            "Cores": {
                buttonStyle: {color: "white", borderRadius: "5px"},
                unlocked() {return player.s.highestSingularityPoints.gt(0)},
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-row", [], () => {
                            let look = {boxSizing: "border-box", width: "150px", height: "150px", border: "22px solid", borderRadius: "50%", margin: "25px"}
                            look.backgroundColor = CORE_INFO[player.co.coreIndex].color
                            look.borderColor = CORE_STRENGTH[player.co.cores[player.co.coreIndex].strength].color
                            return look
                        }],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {return "Lv." + formatWhole(player.co.cores[player.co.coreIndex].level) + " " + CORE_STRENGTH[player.co.cores[player.co.coreIndex].strength].name + " " + CORE_INFO[player.co.coreIndex].name}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "500px", height: "40px", borderBottom: "3px solid white"}],
                            ["style-column", [
                                ["raw-html", () => {return CORE_INFO[player.co.coreIndex].effect[0] + format(player.co.cores[player.co.coreIndex].effect[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return CORE_INFO[player.co.coreIndex].effect[1] + format(player.co.cores[player.co.coreIndex].effect[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return CORE_INFO[player.co.coreIndex].effect[2] + format(player.co.cores[player.co.coreIndex].effect[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "597px", height: "117px"}],
                            ["style-row", [
                                ["clickable", 100],
                                ["bar", "coreLevel"],
                            ], {width: "597px", height: "37px", borderTop: "3px solid white"}],
                        ], {borderLeft: "3px solid white"}],
                    ], {width: "800px", height: "200px", backgroundColor: "#611", border: "3px solid white", borderRadius: "15px 15px 0 0"}],
                    ["style-column", [
                        ["blank", "10px"],
                        ["row", [
                            ["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105], 
                            ["clickable", 106], ["clickable", 107], ["clickable", 108], ["clickable", 109], ["clickable", 110],
                            ["clickable", 111],
                        ]],
                        ["blank", "10px"],
                    ], {width: "800px", backgroundColor: "#411", borderLeft: "3px solid white", borderRight: "3px solid white", borderBottom: "3px solid white", borderRadius: "0 0 15px 15px"}],
                ]
            },
            "Reset Details": {
                buttonStyle: {color: "white", borderRadius: "5px"},
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Singularity is a BIG reset layer. It will reset basically everything leading up to this point." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Do not be afraid. You would rather be set back but progress than be stuck forever." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Now if you are willing to proceed, here are the features that will be reset:" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "All universe 1 content - Including steel, crystal, and time cubes." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "All universe 2 content - Including tav's domain, infinity dimensions, mastery, and replicanti." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "All universe α content - Including power and realm challenges." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "All alt-universe 1 content - Including oil and grass-skip." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Performs an XPBoost equivalent reset, and also resets XPBoost, check back buyables, and highest check back level." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Only thing that you get to keep are pets, evolutions, pet shop, epic pet stuff, automation shards, and evolution special features." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "You may keep them for now, but be prepared to lose them in the next layer :)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "100px"],
                    ["raw-html", function () { return "One more word of advice: Good luck." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ],
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", function () { return "You will gain " + format(player.s.singularityPointsToGet) + " singularity points on reset. (Based on infinity points)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", function () { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true },
})