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
                    ["raw-html", () => { return "TEMP." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
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
                        ["raw-html", "Unlock ???", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
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
    health: new Decimal(800),
    damage: new Decimal(20),
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
    health: new Decimal(850),
    damage: new Decimal(10),
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
    damage: new Decimal(20),
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
    health: new Decimal(900),
    damage: new Decimal(20),
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
    health: new Decimal(950),
    damage: new Decimal(20),
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
                "regenAdd": new Decimal(-10)
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
    health: new Decimal(1000),
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
            cooldown: new Decimal(10),
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