addLayer("matosLair", {
    name: "Matos' Lair", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⊘", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.matosLair.unlocked) player.subtabs["bh"]["stages"] = "matosLair"
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
        if (!player.matosLair.unlocked) {
            str = {
                background: "radial-gradient(#250106, #360802)",
                backgroundOrigin: "border-box",
                borderColor: "#0e0e0e",
                color: "black",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "20px 0 20px 20px !important",
            }
        } else {
            str = {
                background: "radial-gradient(#7D0617, #B61B08)",
                backgroundOrigin: "border-box",
                borderColor: "#2F2F2F",
                color: "black",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "20px 0 20px 20px !important",
            }
        }
        if (player.subtabs["bh"]["stages"] == "matosLair") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Matos' Lair",
    tooltipLocked: "Reach 25 combo in depth 3 to unlock.",
    branches: ["depth3"],
    color: "#b33793",
    update(delta) {
        player.matosLair.unlocked = player.depth3.milestone[25] > 0
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Matos' Lair",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("matosLair")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "radial-gradient(#7D0617, #B61B08)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
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
                        ["raw-html", "Perks for defeating Matos", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Downsides</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "You can no longer fuel cores", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "All of your cores are destroyed", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "15px"],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "Core Fragments", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "Starmetal Essence", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "15px"],
                    ["raw-html", "<u>Effects</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x2 to check back XP gain." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x1.5 to XPBoost gain." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x1e20 to golden grass." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x5 to moonstone." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x1e600 boost to infinity points." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "x1e40 boost to singularity points." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "+1,000 base radiation gain." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "+1,000 base core scrap gain." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace" }],
                ], () => {
                    let look = {width: "547px", height: "420px", background: "linear-gradient(120deg, #600954 0%, #750823 100%)", borderRadius: "0 0 0 27px"}
                    if (player.matosLair.milestone[25] == 0) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], {borderRadius: "0 0 0 27px", overflow: "hidden"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "Matos' Lair", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["style-column", [
                        ["raw-html", "3 Characters", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "Unlock Matos Perks", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "232px", height: "58px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.matosLair.milestone[25] >= 1) look.background = "#77bf5f"
                        return look
                    }],
                    ["style-column", [
                        ["raw-html", "2 Characters", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "Unlock the Mending Stat", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "232px", height: "57px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.matosLair.milestone[25] >= 2) look.background = "#77bf5f"
                        return look
                    }],
                    ["style-column", [
                        ["raw-html", "1 Character", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "+1 Rune Cap", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "232px", height: "58px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.matosLair.milestone[25] >= 3) look.background = "#77bf5f"
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
    layerShown() {return player.startedGame && player.depth2.milestone[25] > 0},
})

BHS.matosLair = {
    nameCap: "Matos' Lair",
    nameLow: "matos' lair",
    music: "music/matosTheme.mp3",
    comboLimit: 25,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 4:
                return "m10"
            case 8:
                return "m11"
            case 12:
                return "m12"
            case 16:
                return "m13"
            case 20:
                return "m14"
            case 24:
                return "matos"
            default:
                let random = Math.random()
                let cel = ["m01", "m02", "m03", "m04", "m05", "m06"]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}

BHC.m01 = {
    name: "Celestialite M-01",
    symbol: "01",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(300),
    damage: new Decimal(8),
    actions: {
        0: {
            name: "Pummel",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(2),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingUmbrite = Decimal.add(35, getRandomInt(15))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimUmbrite = Decimal.add(15, getRandomInt(15))
        } else {
            gain.darkEssence = Decimal.add(6, getRandomInt(6))
        }
        return gain
    },
}

BHC.m02 = {
    name: "Celestialite M-02",
    symbol: "02",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(350),
    damage: new Decimal(10),
    actions: {
        0: {
            name: "Triple Shot",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingUmbrite = Decimal.add(40, getRandomInt(10))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimUmbrite = Decimal.add(20, getRandomInt(10))
        } else {
            gain.darkEssence = Decimal.add(8, getRandomInt(4))
        }
        return gain
    },
}

BHC.m03 = {
    name: "Celestialite M-03",
    symbol: "03",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(150),
    damage: new Decimal(10),
    regen: new Decimal(10),
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
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(35, getRandomInt(15))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(15, getRandomInt(15))
        } else {
            gain.darkEssence = Decimal.add(6, getRandomInt(6))
        }
        return gain
    },
}

BHC.m04 = {
    name: "Celestialite M-04",
    symbol: "04",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(150),
    damage: new Decimal(8),
    attributes: {
        "air": new Decimal(0.2), // Resistance DMG Mult
        "warded": new Decimal(0.2), // Resistance DMG Mult
        "stealthy": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(40, getRandomInt(10))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(20, getRandomInt(10))
        } else {
            gain.darkEssence = Decimal.add(8, getRandomInt(4))
        }
        return gain
    },
}

BHC.m05 = {
    name: "Celestialite M-05",
    symbol: "05",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(225),
    damage: new Decimal(12),
    attributes: {
        "rebound": new Decimal(0.3), // Dmg Mult
    },
    actions: {
        0: {
            name: "Bludgeon",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.vividUmbrite = Decimal.add(35, getRandomInt(15))
        } else if (random > 0.5 && random < 0.85) {
            gain.lustrousUmbrite = Decimal.add(15, getRandomInt(15))
        } else {
            gain.darkEssence = Decimal.add(6, getRandomInt(6))
        }
        return gain
    },
}

BHC.m06 = {
    name: "Celestialite M-06",
    symbol: "06",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(325),
    damage: new Decimal(3),
    attributes: {
        "explosive": new Decimal(20), // Dmg Mult
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
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.vividUmbrite = Decimal.add(40, getRandomInt(10))
        } else if (random > 0.5 && random < 0.85) {
            gain.lustrousUmbrite = Decimal.add(20, getRandomInt(10))
        } else {
            gain.darkEssence = Decimal.add(8, getRandomInt(4))
        }
        return gain
    },
}

BHC.m10 = {
    name: "Celestialite M-10",
    symbol: "10",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(600),
    damage: new Decimal(6),
    actions: {
        0: {
            name: "Stab",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(25)
        gain.dimUmbrite = new Decimal(15)
        gain.darkEssence = new Decimal(2)
        return gain
    },
    onDeath() {
        if (player.tab == "bh") screenFlash("Long long ago, I had dreams. I had desires. I was human.", 5000)
    },
}

BHC.m11 = {
    name: "Celestialite M-11",
    symbol: "11",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(600),
    damage: new Decimal(3),
    actions: {
        0: {
            name: "Triple Shot",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(35)
        gain.dimUmbrite = new Decimal(20)
        gain.darkEssence = new Decimal(4)
        return gain
    },
    onDeath() {
        if (player.tab == "bh") screenFlash("I heard stories about a world. A beautiful world. With a sun that shined bright.", 5000)
    },
}

BHC.m12 = {
    name: "Celestialite M-12",
    symbol: "12",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(500),
    damage: new Decimal(10),
    regen: new Decimal(2),
    actions: {
        0: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        gain.faintUmbrite = new Decimal(25)
        gain.clearUmbrite = new Decimal(15)
        gain.darkEssence = new Decimal(6)
        return gain
    },
    onDeath() {
        if (player.tab == "bh") screenFlash("I wanted to see the beauty that nature has to offer, but that was impossible.", 5000)
    },
}

BHC.m13 = {
    name: "Celestialite M-13",
    symbol: "13",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(200),
    damage: new Decimal(10),
    attributes: {
        "air": new Decimal(0.2), // Resistance DMG Mult
        "warded": new Decimal(0.2), // Resistance DMG Mult
        "stealthy": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Drain",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd": new Decimal(-1), // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
    },
    reward() {
        let gain = {}
        gain.faintUmbrite = new Decimal(35)
        gain.clearUmbrite = new Decimal(20)
        gain.darkEssence = new Decimal(8)
        return gain
    },
    onDeath() {
        if (player.tab == "bh") screenFlash("The world was filled with greed. Smog polluted the entire sky. I was poor. I was suffering.", 5000)
    },
}

BHC.m14 = {
    name: "Celestialite M-14",
    symbol: "14",
    style: {
        background: "radial-gradient(#7D0617, #B61B08)",
        color: "black",
        borderColor: "#2F2F2F",
        fontSize: "60px",
    },
    health: new Decimal(400),
    damage: new Decimal(10),
    attributes: {
        "rebound": new Decimal(0.3), // Dmg Mult
    },
    actions: {
        0: {
            name: "Earthquake",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(15),
        },
    },
    reward() {
        let gain = {}
        gain.vividUmbrite = new Decimal(25)
        gain.lustrousUmbrite = new Decimal(15)
        gain.darkEssence = new Decimal(10)
        return gain
    },
    onDeath() {
        if (player.tab == "bh") screenFlash("As a celestial, I continue to suffer. But I suffer with purpose.", 5000)
    },
}

BHC.matos = {
    name: "Matos",
    icon: "resources/matos.png",
    health: new Decimal(7500),
    damage: new Decimal(6),
    actions: {
        0: {
            name: "???",
            instant: true,
            type: "function",
            target: "randomPlayer",
            onTrigger(index, slot, target) {
                
            },
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(100)
        gain.dimUmbrite = new Decimal(60)
        gain.faintUmbrite = new Decimal(150)
        gain.clearUmbrite = new Decimal(90)
        gain.vividUmbrite = new Decimal(200)
        gain.lustrousUmbrite = new Decimal(120)
        gain.darkEssence = new Decimal(25)
        return gain
    },
    onDeath() {
        player.in.infinityPoints = new Decimal(0)
        player.points = new Decimal(0)
    },
}