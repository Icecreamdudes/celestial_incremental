const CORE_STRENGTH = [
    {
        name: "Faulty",
        color: "#b5b5b5",
        buff: 1,
    }, {
        name: "Weak",
        color: "#ebcc6e",
        buff: 1.05,
    }, {
        name: "Average",
        color: "#cf7429",
        buff: 1.1,
    }, {
        name: "Strong",
        color: "#cf3a29",
        buff: 1.15,
    }, {
        name: "Pinnacle",
        color: "#4a1616",
        buff: 1.2,
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
            player.co.cores.point.effect[0] = player.points.pow(0.035).pow(player.co.cores.point.level.mul(0.1).add(1)).add(1).min("1e25000")
            if (player.co.cores.point.level.lt(11)) player.co.cores.point.effect[1] = player.co.cores.point.level.mul(0.06).add(0.94).max(1.03)
            if (player.co.cores.point.level.gte(11)) player.co.cores.point.effect[1] = player.co.cores.point.level.mul(0.03).add(1.3)
            player.co.cores.point.effect[2] = player.co.cores.point.level.mul(0.5).add(1)
        }

        if (player.co.cores.factor.level.gt(0)) {
            player.co.cores.factor.effect[0] = player.f.factorPower.pow(0.02).pow(player.co.cores.factor.level.mul(0.1).add(1)).add(1).min("1e5000")
            if (player.co.cores.factor.level.lt(11)) player.co.cores.factor.effect[1] = player.co.cores.factor.level.mul(0.05).add(0.95).max(1.02)
            if (player.co.cores.factor.level.gte(11)) player.co.cores.factor.effect[1] = player.co.cores.factor.level.mul(0.02).add(1.28)
            player.co.cores.factor.effect[2] = player.co.cores.factor.level.pow(1.5).mul(1.5).add(1)
        }

        if (player.co.cores.prestige.level.gt(0)) {
            player.co.cores.prestige.effect[0] = player.p.prestigePoints.pow(0.02).pow(player.co.cores.prestige.level.mul(0.1).add(1)).add(1).min("1e5000")
            if (player.co.cores.prestige.level.lt(11)) player.co.cores.prestige.effect[1] = player.co.cores.prestige.level.mul(0.04).add(0.96).max(1.02)
            if (player.co.cores.prestige.level.gte(11)) player.co.cores.prestige.effect[1] = player.co.cores.prestige.level.mul(0.02).add(1.18)
            player.co.cores.prestige.effect[2] = player.co.cores.prestige.level.pow(1.5).mul(2).add(1)
        }

        if (player.co.cores.tree.level.gt(0)) {
            player.co.cores.tree.effect[0] = player.t.trees.pow(0.022).pow(player.co.cores.tree.level.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.tree.effect[1] = player.co.cores.tree.level.mul(0.02).add(1)
            player.co.cores.tree.effect[2] = player.co.cores.tree.level.mul(0.02).add(1)
        }

        if (player.co.cores.grass.level.gt(0)) {
            player.co.cores.grass.effect[0] = player.g.grass.pow(0.01).pow(player.co.cores.grass.level.mul(0.1).add(1)).add(1).min("1e2000")
            player.co.cores.grass.effect[1] = player.co.cores.grass.level.pow(2).mul(10).add(1)
            player.co.cores.grass.effect[2] = player.co.cores.grass.level.pow(1.5).mul(0.2).add(1)
        }

        if (player.co.cores.grasshopper.level.gt(0)) {
            player.co.cores.grasshopper.effect[0] = player.gh.grasshoppers.pow(0.01).pow(player.co.cores.grasshopper.level.mul(0.1).add(1)).add(1).min("1e500")
            player.co.cores.grasshopper.effect[1] = player.gh.fertilizer.pow(0.008).pow(player.co.cores.grasshopper.level.mul(0.1).add(1)).add(1).min("1e500")
            player.co.cores.grasshopper.effect[2] = player.co.cores.grasshopper.level.pow(2).mul(5).add(1)
        }

        if (player.co.cores.code.level.gt(0)) {
            player.co.cores.code.effect[0] = player.m.codeExperience.pow(0.02).pow(player.co.cores.code.level.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.code.effect[1] = player.co.cores.code.level.mul(0.03).add(1)
            player.co.cores.code.effect[2] = player.co.cores.code.level.pow(2).mul(10).add(1)
        }

        if (player.co.cores.dice.level.gt(0)) {
            player.co.cores.dice.effect[0] = player.d.dicePoints.pow(0.02).pow(player.co.cores.dice.level.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.dice.effect[1] = player.co.cores.dice.level.mul(0.02).add(1)
            player.co.cores.dice.effect[2] = player.co.cores.dice.level.pow(1.5).mul(3).add(1)
        }

        if (player.co.cores.rocket.level.gt(0)) {
            player.co.cores.rocket.effect[0] = player.rf.rocketFuel.pow(0.02).pow(player.co.cores.rocket.level.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.rocket.effect[1] = player.co.cores.rocket.level.mul(0.02).add(1)
            player.co.cores.rocket.effect[2] = player.co.cores.rocket.level.pow(1.5).mul(0.5).add(1)
        }

        if (player.co.cores.antimatter.level.gt(0)) {
            player.co.cores.antimatter.effect[0] = player.ad.antimatter.pow(0.04).pow(player.co.cores.antimatter.level.mul(0.1).add(1)).add(1).min("1e5000")
            player.co.cores.antimatter.effect[1] = player.co.cores.antimatter.level.mul(0.02).add(1)
            player.co.cores.antimatter.effect[2] = player.co.cores.antimatter.level.pow(1.5).mul(0.2).add(1)
        }

        if (player.co.cores.infinity.level.gt(0)) {
            player.co.cores.infinity.effect[0] = player.in.infinityPoints.pow(0.03).pow(player.co.cores.infinity.level.mul(0.1).add(1)).add(1).min("1e25000")
            player.co.cores.infinity.effect[1] = player.co.cores.infinity.level.mul(0.01).add(1)
            player.co.cores.infinity.effect[2] = player.co.cores.infinity.level.pow(1.5).mul(0.5).add(1)
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
    clickables: {
        100: {
            title() {
                return "LOCKED"
            },
            canClick() {
                return false
            },
            unlocked: true,
            onClick() {

            },
            style() {
                let look = {width: "75px", minHeight: "37px", border: "0px", borderRadius: "0"}
                if (!this.canClick()) look.backgroundColor = "#333"
                return look
            },
        },
        101: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "point"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.point.color
                look.borderColor = CORE_STRENGTH[player.co.cores.point.strength].color
                return look
            },
        },
        102: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "factor"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.factor.color
                look.borderColor = CORE_STRENGTH[player.co.cores.factor.strength].color
                return look
            },
        },
        103: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "prestige"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.prestige.color
                look.borderColor = CORE_STRENGTH[player.co.cores.prestige.strength].color
                return look
            },
        },
        104: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "tree"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.tree.color
                look.borderColor = CORE_STRENGTH[player.co.cores.tree.strength].color
                return look
            },
        },
        105: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "grass"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.grass.color
                look.borderColor = CORE_STRENGTH[player.co.cores.grass.strength].color
                return look
            },
        },
        106: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "grasshopper"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.grasshopper.color
                look.borderColor = CORE_STRENGTH[player.co.cores.grasshopper.strength].color
                return look
            },
        },
        107: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "code"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.code.color
                look.borderColor = CORE_STRENGTH[player.co.cores.code.strength].color
                return look
            },
        },
        108: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "dice"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.dice.color
                look.borderColor = CORE_STRENGTH[player.co.cores.dice.strength].color
                return look
            },
        },
        109: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "rocket"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.rocket.color
                look.borderColor = CORE_STRENGTH[player.co.cores.rocket.strength].color
                return look
            },
        },
        110: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "antimatter"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.antimatter.color
                look.borderColor = CORE_STRENGTH[player.co.cores.antimatter.strength].color
                return look
            },
        },
        111: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.co.coreIndex = "infinity"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
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
        1000: {
            title: "<h1>Condense all of your power into a core.<br><small>(Req: 1e40 infinity points)</small>",
            canClick() { return player.in.infinityPoints.gte(1e40) },
            unlocked: true,
            onClick() {
                let val = layers.co.coreXPCalc(player.co.resetIndex, player.s.singularityPointsToGet)
                player.co.cores[player.co.resetIndex].xp = player.co.cores[player.co.resetIndex].xp.add(val)
                player.s.singularities = player.s.singularities.add(player.s.singularitiesToGet)
                player.s.singularityPoints = player.s.singularityPoints.add(player.s.singularityPointsToGet)
                player.re.halterEssence = player.re.halterEssence.add(player.rm.halterBoostEffect)
                player.ra.storedRadiation = player.ra.storedRadiation.add(player.ra.radiation)

                player.coa.singularityPause = new Decimal(12)
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
            fillStyle: {backgroundColor: "#822"},
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
                        ], {width: "600px", height: "50px", borderBottom: "3px solid white"}],
                        ["style-column", [
                            ["raw-html", () => {return "Currently Fueling: " + CORE_INFO[player.co.resetIndex].name}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["raw-html", () => {return "Which will give +" + format(layers.co.coreXPCalc(player.co.resetIndex, player.s.singularityPointsToGet)) + " XP"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "600px", height: "80px", backgroundColor: "#411", borderBottom: "3px solid white"}],
                        ["style-column", [
                            ["row", [
                                ["clickable", 201], ["clickable", 202], ["clickable", 203], ["clickable", 204], ["clickable", 205],
                                ["clickable", 206], ["clickable", 207], ["clickable", 208], ["clickable", 209], ["clickable", 210],
                                ["clickable", 211]
                            ]],
                        ], {width: "600px", backgroundColor: "black", borderRadius: "0 0 12px 12px"}],
                    ], {width: "600px", backgroundColor: "#611", border: "3px solid white", borderRadius: "15px"}],
                    ["blank", "50px"],
                    ["clickable", 1000],
                ],
            },
            "Cores": {
                buttonStyle: {color: "white", borderRadius: "5px"},
                unlocked: true,
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
                    ["raw-html", function () { return "Singularity is a BIG reset layer. It will reset basically everything leading up to this point." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Do not be afraid. You would rather be set back but progress than be stuck forever." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Now if you are willing to proceed, here are the features that will be reset:" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "All universe 1 content - Including steel, crystal, time cubes, and rage power." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "All universe 2 content - Including tav's domain, infinity dimensions, mastery, and replicanti." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "All alternate universe 1 content - Including oil and grass-skip." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Performs an XPBoost equivalent reset, and also resets XPBoost, check back buyables, and highest check back level." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Only thing that you get to keep are pets, evolutions, pet shop, epic pet stuff, automation shards, and evolution special features." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You may keep them for now, but be prepared to lose them in the next layer :)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "100px"],
                    ["raw-html", function () { return "One more word of advice: Good luck." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
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