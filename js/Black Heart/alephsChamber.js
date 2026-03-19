addLayer("alephsChamber", {
    name: "Alephs Chamber", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ℵ", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.alephsChamber.unlocked) player.subtabs["bh"]["stages"] = "alephsChamber"
    },
    startData() { return {
        unlocked: true,

        milestone: {
            25: 0,
        },
    }},
    automate() {},
    nodeStyle() {
        let str = {}
        if (!player.alephsChamber.unlocked) {
            str = {
                background: "linear-gradient(45deg, #120012 0%, #320032 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#120012",
                color: "rgba(0,0,0,0.5)",
                margin: "20px 0 0 30px !important",
            }
        } else {
            str = {
                background: "linear-gradient(45deg, #3f003f 0%, #a900a9 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#3f003f",
                color: "rgba(0,0,0,0.5)",
                margin: "20px 0 0 30px !important",
            }
        }
        if (player.subtabs["bh"]["stages"] == "alephsChamber") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Alephs Chamber",
    tooltipLocked: "Reach 25 combo in depth 4 to unlock.",
    branches: ["depth4"],
    color: "#b33793",
    update(delta) {
        player.alephsChamber.unlocked = player.depth4.milestone[25] > 0
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Alephs Chamber",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("alephsChamber")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "linear-gradient(45deg, #3f003f 0%, #a900a9 100%)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Perks for defeating Aleph", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "Grass Jump (in Eclipse)", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["raw-html", "<u>Effects</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Weakened Star Softcap." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Improved SP's effect on singularity gain." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x36 Hex Power." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x100 Infinitum." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x10 Emotions." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "+10 Mending." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],

                    // ALEPH PUNCHCARD -> BUFFS FIRST THREE GRASS-JUMP MILESTONES. ALSO UNLOCKS GRASS-JUMPERS, A SUBTAB WITH SOME SORT OF MECHANIC ... IDK RESEARCH GCI I GUESS 
                ], () => {
                    let look = {width: "547px", height: "420px", background: "linear-gradient(120deg, #3e003e 0%, #6a006a 100%)", borderRadius: "0 0 0 27px"}
                    if (player.alephsChamber.milestone[25] == 0) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], {borderRadius: "0 0 0 27px", overflow: "hidden"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "Alephs Chamber", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["style-column", [
                        ["raw-html", "3 Characters", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "Unlock Alephs Perks", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "232px", height: "58px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.alephsChamber.milestone[25] >= 1) look.background = "#77bf5f"
                        return look
                    }],
                    ["style-column", [
                        ["raw-html", "2 Characters", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "Unlock Potency", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "232px", height: "57px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.alephsChamber.milestone[25] >= 2) look.background = "#77bf5f"
                        return look
                    }],
                    ["style-column", [
                        ["raw-html", "1 Character", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "+1 Rune Cap", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "232px", height: "58px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.alephsChamber.milestone[25] >= 3) look.background = "#77bf5f"
                        return look
                    }],
                ], {width: "250px", height: "197px", background: "var(--layerBackground)"}],
                ["style-row", [
                    ["layer-proxy", ["bh", [
                        ["row", [["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"]]],
                    ]]],
                ], {width: "250px", height: "70px", background: "var(--miscButtonDisable)", borderTop: "3px solid var(--regBorder)", borderRadius: "0 0 27px 0"}],
            ], {width: "250px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && player.al.cocoonLevel >= 16},
})

BHS.alephsChamber = {
    nameCap: "Alephs Chamber",
    nameLow: "alephs chamber",
    music: "music/depth4.mp3",
    comboLimit: 25,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 6:
                return "ma1"
            case 12:
                return "ma2"
            case 18:
                return "ma3"
            case 24:
                return "aleph"
            default:
                let random = Math.random()
                let cel = ["m21", "m22", "m23", "m24", "m25", "m26"]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}

BHC.m21 = {
    name: "Celestialite M-21",
    symbol: "21",
    style: {
        background: "linear-gradient(to right, #BD3728, #921758)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(1000),
    damage: new Decimal(30),
    actions: {
        0: {
            name: "Slash",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
        1: {
            name: "Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingUmbrite = Decimal.add(50, getRandomInt(25))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimUmbrite = Decimal.add(25, getRandomInt(15))
        } else {
            gain.darkEssence = Decimal.add(10, getRandomInt(5))
        }
        return gain
    },
}

BHC.m22 = {
    name: "Celestialite M-22",
    symbol: "22",
    style: {
        background: "linear-gradient(to right, #BD3728, #921758)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(1100),
    damage: new Decimal(15),
    regen: new Decimal(5),
    actions: {
        0: {
            name: "Pummel",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(0.5),
            cooldown: new Decimal(1),
        },
        1: {
            name: "Pummel",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(2),
        },
        2: {
            name: "Pummel",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1.5),
            cooldown: new Decimal(3),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(50, getRandomInt(25))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(25, getRandomInt(15))
        } else {
            gain.darkEssence = Decimal.add(10, getRandomInt(5))
        }
        return gain
    },
}

BHC.m23 = {
    name: "Celestialite M-23",
    symbol: "23",
    style: {
        background: "linear-gradient(to right, #BD3728, #921758)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(500),
    damage: new Decimal(30),
    attributes: {
        "air": new Decimal(0.2), // Resistance DMG Mult
        "warded": new Decimal(0.2), // Resistance DMG Mult
        "stealthy": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Quick Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(3),
        },
        1: {
            name: "Turret",
            active: true,
            constantType: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(0.5),
            interval: new Decimal(0.5),
            duration: new Decimal(5),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.vividUmbrite = Decimal.add(50, getRandomInt(25))
        } else if (random > 0.5 && random < 0.85) {
            gain.lustrousUmbrite = Decimal.add(25, getRandomInt(15))
        } else {
            gain.darkEssence = Decimal.add(10, getRandomInt(5))
        }
        return gain
    },
}

BHC.m24 = {
    name: "Celestialite M-24",
    symbol: "24",
    style: {
        background: "linear-gradient(to right, #BD3728, #921758)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(1200),
    damage: new Decimal(30),
    attributes: {
        "daze": new Decimal(0.5),
    },
    actions: {
        0: {
            name: "Earthquake",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
        1: {
            name: "Block",
            instant: true,
            type: "shield",
            target: "celestialite",
            value: new Decimal(1),
            cooldown: new Decimal(10),

            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "defenseAdd": new Decimal(25),
            },
            duration: new Decimal(3),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingNocturnium = Decimal.add(50, getRandomInt(25))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimNocturnium = Decimal.add(25, getRandomInt(15))
        } else {
            gain.darkEssence = Decimal.add(10, getRandomInt(5))
        }
        return gain
    },
}

BHC.m25 = {
    name: "Celestialite M-25",
    symbol: "25",
    style: {
        background: "linear-gradient(to right, #BD3728, #921758)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(1300),
    damage: new Decimal(30),
    actions: {
        0: {
            name: "Poison Needle",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            properties: {
                "storeTarget": true,
            },
            value: new Decimal(1),
            cooldown: new Decimal(5),

            active: true,
            constantType: "effect",
            constantTarget: "storedTarget",
            effects: {
                "regenAdd"() {return Decimal.mul(-0.5, player.bh.celestialite.damage)}
            },
            duration: new Decimal(3),
        },
        1: {
            name: "Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingNocturnium = Decimal.add(55, getRandomInt(20))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimNocturnium = Decimal.add(30, getRandomInt(10))
        } else {
            gain.darkEssence = Decimal.add(10, getRandomInt(5))
        }
        return gain
    },
}

BHC.m26 = {
    name: "Celestialite M-26",
    symbol: "26",
    style: {
        background: "linear-gradient(to right, #BD3728, #921758)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(1400),
    damage: new Decimal(6),
    luck: new Decimal(3),
    actions: {
        0: {
            name: "Arrow Flurry",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            properties: {
                "multi-hit"() {return [player.bh.celestialite.luck.toNumber(), 200]},
                "crit": [0.5, 2],
            },
            value: new Decimal(1),
            cooldown: new Decimal(4),
        },
        1: {
            name: "Arrow Resupply",
            instant: true,
            type: "effect",
            target: "celestialite",
            noMessage: true,
            properties: {
                "luckAdd": new Decimal(1),
            },
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingNocturnium = Decimal.add(60, getRandomInt(15))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimNocturnium = Decimal.add(35, getRandomInt(5))
        } else {
            gain.darkEssence = Decimal.add(10, getRandomInt(5))
        }
        return gain
    },
}

BHC.ma1 = {
    name: "Celestialite M-A1",
    symbol: "A1",
    style: {
        background: "linear-gradient(to right, #BD3728, #921758)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(3000),
    damage: new Decimal(15),
    actions: {
        0: {
            name: "Earthquake",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(4),
        },
        0: {
            name: "Earthshake",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        0: {
            name: "Earthbreak",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(18),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingNocturnium = new Decimal(60)
        gain.dimNocturnium = new Decimal(25)
        gain.darkEssence = new Decimal(8)
        return gain
    },
}

BHC.ma2 = {
    name: "Celestialite M-A2",
    symbol: "A2",
    style: {
        background: "linear-gradient(to right, #BD3728, #921758)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(4000),
    damage: new Decimal(30),
    luck: new Decimal(6),
    actions: {
        0: {
            name: "Poison Needle",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            properties: {
                "storeTarget": true,
            },
            cooldown: new Decimal(6),

            active: true,
            constantType: "effect",
            constantTarget: "storedTarget",
            effects: {
                "regenAdd"() {return Decimal.mul(-1, player.bh.celestialite.luck)}
            },
            duration: new Decimal(3),
        },
        1: {
            name: "Increased Toxicity",
            instant: true,
            type: "effect",
            target: "celestialite",
            noMessage: true,
            properties: {
                "luckAdd": new Decimal(3),
            },
            cooldown: new Decimal(12),
        },
        2: {
            name: "Block",
            instant: true,
            type: "shield",
            target: "celestialite",
            value: new Decimal(1),
            cooldown: new Decimal(8),

            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "defenseAdd": new Decimal(25),
            },
            duration: new Decimal(3),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingNocturnium = new Decimal(70)
        gain.dimNocturnium = new Decimal(30)
        gain.darkEssence = new Decimal(12)
        return gain
    },
}

BHC.ma3 = {
    name: "Celestialite M-A3",
    symbol: "A3",
    style: {
        background: "linear-gradient(to right, #BD3728, #921758)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(5000),
    damage: new Decimal(6),
    actions: {
        0: {
            name: "Missile Flurry",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            properties: {
                "multi-hit": [5, 200],
            },
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
        1: {
            name: "Doping",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "agilityAdd": new Decimal(10),
            },
            cooldown: new Decimal(10),
        },
        2: {
            name: "Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(15),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingNocturnium = new Decimal(80)
        gain.dimNocturnium = new Decimal(35)
        gain.darkEssence = new Decimal(16)
        return gain
    },
}

BHC.aleph = {
    name: "Aleph",
    icon: "resources/aleph.png",
    health: new Decimal(15000),
    damage: new Decimal(25),
    noRandomStats: true,
    timer: new Decimal(250),
    actions: {
        0: {
            name() {
                if (player.bh.celestialite.actions[0].variables.attacks) {
                    if (player.bh.celestialite.actions[0].variables.attacks == 0) {
                        return "Slash"
                    }
                    if (player.bh.celestialite.actions[0].variables.attacks == 1) {
                        return "Piercing Shot"
                    }
                    if (player.bh.celestialite.actions[0].variables.attacks == 2) {
                        return "Stinging Flurry"
                    }
                }
                return "Slash"
            },
            instant: true,
            type: "function",
            target: "randomPlayer",
            onTrigger(index, slot, target) {
                if (!player.bh.celestialite.actions[0].variables.attacks) player.bh.celestialite.actions[0].variables.attacks = 0
                switch (player.bh.celestialite.actions[0].variables.attacks) {
                    case 0:
                        bhAttack(new Decimal(20), 3, 0, "allPlayer")
                        player.bh.celestialite.actions[0].variables.attacks = 1
                        break;
                    case 1:
                        let dmg1 = new Decimal(30)
                        let str1 = ""
                        if (Decimal.gte(0.5, Math.random())) {
                            dmg1 = dmg1.mul(2)
                            str1 = str1 + "<span style='color:#faa'>[CRIT] </span>"
                        }
                        bhAttack(dmg1, 3, 0, "randomPlayer", str1)
                        player.bh.celestialite.actions[0].variables.attacks = 2
                        break;
                    case 2:
                        for (let i = 0; i < 5; i++) {
                            setTimeout(() => {
                                bhAttack(new Decimal(10), 3, 0, "randomPlayer")
                            }, 200*i)
                        }
                        player.bh.celestialite.actions[0].variables.attacks = 0
                        break;
                    default:
                        console.log("This isn't supposed to be triggered")
                        player.bh.celestialite.actions[0].variables.attacks = 0
                        break;
                }
            },
            cooldown: new Decimal(4),
        },
        1: {
            name: "Buzzing Barrier",
            instant: true,
            type: "shield",
            target: "celestialite",
            value: new Decimal(3),
            cooldown: new Decimal(12),
            stun: ["soft", new Decimal(1), 3],

            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "defenseAdd": new Decimal(25),
            },
            duration: new Decimal(3),
        },
        2: {
            name: "Binding Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(20),

            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "regenAdd": new Decimal(10),
            },
            duration: new Decimal(5),
        },
        3: {
            name: "???",
            passive: true,
            constantType: "function",
            constantTarget: "randomPlayer",
            onTrigger(index, slot, target) {
                // MESSAGES ARE PLACEHOLDERS
                if (!player.bh.celestialite.actions[3].variables.attacks) player.bh.celestialite.actions[3].variables.attacks = 0
                if (player.bh.celestialite.health.lt(12000) && player.bh.celestialite.actions[3].variables.attacks == 0) {
                    screenFlash("Is that all you have?", 3000)
                    setTimeout(() => {
                        bulletHell({"chargingBee": {beeAmount: 5, radius: 20, enemySpeed: 5, lastTick: false}}, {width: 300, height: 300, duration: 10})
                    }, 3000)
                    player.bh.celestialite.actions[3].variables.attacks += 1
                }
                if (player.bh.celestialite.health.lt(9000) && player.bh.celestialite.actions[3].variables.attacks == 1) {
                    screenFlash("You're getting somewhere, but this isn't enough.", 3000)
                    setTimeout(() => {
                        bulletHell({"shootBee": {beesPerSec: 1.5, radius: 20, enemySpeed: 5}}, {width: 400, height: 400, duration: 10})
                    }, 3000)
                    player.bh.celestialite.actions[3].variables.attacks += 1
                }
                if (player.bh.celestialite.health.lt(6000) && player.bh.celestialite.actions[3].variables.attacks == 2) {
                    screenFlash("Much better, but keep going.", 3000)
                    setTimeout(() => {
                        bulletHell({"bouncingBees": {beeAmount: 10, radius: 20, enemySpeed: 3, chargeMult: 1.5, lastTick: false}}, {duration: 10})
                    }, 3000)
                    player.bh.celestialite.actions[3].variables.attacks += 1
                }
                if (player.bh.celestialite.health.lt(3000) && player.bh.celestialite.actions[3].variables.attacks == 3) {
                    screenFlash("Good, at this rate you should be strong enough to protect the hive.", 3000)
                    setTimeout(() => {
                        bulletHell({"waveBees": {beeRate: 5, radius: 20, gapStart: 0, gap: 200, enemySpeed: 6, waveSpeed: 4}, "shootBee": {beesPerSec: 0.5, radius: 20, enemySpeed: 4}}, {duration: 10})
                    }, 3000)
                    player.bh.celestialite.actions[3].variables.attacks += 1
                }
            },
            cooldown: new Decimal(Infinity),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingNocturnium = new Decimal(250)
        gain.dimNocturnium = new Decimal(150)
        gain.darkEssence = new Decimal(50)
        return gain
    },
}