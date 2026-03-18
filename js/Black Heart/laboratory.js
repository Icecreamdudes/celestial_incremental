addLayer("laboratory", {
    name: "The Laboratory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {return player.laboratory.unlocked ? "LA" : "??"}, // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.laboratory.unlocked) player.subtabs["bh"]["stages"] = "laboratory"
    },
    startData() { return {
        unlocked: true,

        matosDust: new Decimal(0),
        matosShard: new Decimal(0),
        matosFragment: new Decimal(0),
        matosEssence: new Decimal(0),

        matosMult: new Decimal(1),
        cooldown: new Decimal(0),
        cooldownMax: new Decimal(1800),
    }},
    automate() {},
    nodeStyle() {
        let str = {}
        if (!player.laboratory.unlocked) {
            str = {
                background: "linear-gradient(45deg, #131e0f 0%, #323c1f 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#071b00",
                color: "#0c3000",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "0 0 20px 10px !important",
            }
        } else {
            str = {
                background: "linear-gradient(135deg, #426535 0%, #A8C86A 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#185A00",
                color: "#2BA200",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "0 0 20px 10px !important",
            }
        }
        if (player.subtabs["bh"]["stages"] == "laboratory") str.outline = "3px solid #999"
        return str
    },
    tooltip: "The Laboratory",
    tooltipLocked: "Obtain ???.",
    branches: ["depth4", "matosLair"],
    color: "#b33793",
    update(delta) {
        player.laboratory.unlocked = getLevelableAmount("pet", 503).gt(0) || getLevelableTier("pet", 503).gt(0)

        player.laboratory.matosMult = new Decimal(1)

        player.laboratory.cooldown = player.laboratory.cooldown.sub(delta)

        player.laboratory.cooldownMax = new Decimal(1800)
    },
    clickables: {
        "enter": {
            title() {return player.laboratory.cooldown.lte(0) ? "<h2>Enter the Laboratory" : "Check back in " + formatTime(player.laboratory.cooldown) + "."},
            canClick() {return player.laboratory.cooldown.lte(0)},
            unlocked: true,
            onClick() {
                BHStageEnter("laboratory")
                player.laboratory.cooldown = player.laboratory.cooldownMax
            },
            style() {
                let look = {width: "200px", minHeight: "75px", color: "white", background: "linear-gradient(135deg, #426535 0%, #A8C86A 100%)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"}
                if (player.laboratory.cooldown.gt(0)) look.background = "#bf8f8f"
                return look
            },
        },
    },
    upgrades: {
        // 6 upgrades that effect Vespasian
        // 3 upgrades that buff external things based on matos currencies

        // As examples: charge, 

        // 3 upgrades that increase the timer
        // 3 upgrades that decrease the cooldown
    },
    buyables: {
        // a buyable that increases currency mult chance
        // a buyable that decreases combo scaling
        
    },
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => {return "You have " + formatShortWhole(player.laboratory.matosDust) + " Matos Dust."}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have " + formatShortWhole(player.laboratory.matosShard) + " Matos Shards."}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "270px", height: "72px"}],
                    ["style-column", [
                        ["raw-html", () => {return "You have " + formatShortWhole(player.laboratory.matosFragment) + " Matos Fragments."}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have " + formatShortWhole(player.laboratory.matosEssence) + " Matos Essence."}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return false ? {width: "270px", height: "72px"}: {display: "none !important"}}],
                ], {width: "547px", height: "72px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["blank", "2px"],
                    ["row", [["upgrade", 1], ["upgrade", 2]]],
                    ["row", [["upgrade", 3], ["upgrade", 4]]],
                    ["row", [["upgrade", 5], ["upgrade", 6]]],
                    ["row", [["buyable", 1], ["buyable", 2]]],
                    ["row", [["buyable", 3], ["buyable", 4]]],
                    ["blank", "2px"],
                ], {width: "547px", height: "345px", background: "var(--miscButton)", borderRadius: "0 0 0 27px"}],
            ], {width: "547px", height: "420px", borderRadius: "0 0 0 27px"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "The Laboratory", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["raw-html", () => {return Decimal.sub(2, player.bh.comboScalingReduction).gt(1) ? "<u>Combo Scaling" : ""}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return Decimal.sub(2, player.bh.comboScalingReduction).gt(1) ? formatSimple(Decimal.sub(2, player.bh.comboScalingReduction).max(1).sub(1).mul(100)) + "%" : ""}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["raw-html", "<u>Timed", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return formatTime(BHS.laboratory.timer())}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "<u>Cooldown", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return formatTime(player.laboratory.cooldownMax)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
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

BHS.laboratory = {
    nameCap: "The Laboratory",
    nameLow: "the laboratory",
    music: "music/depth4.mp3",
    comboLimit: Infinity,
    comboScaling: 2,
    comboScalingStart: 0,
    respawnTime: new Decimal(0),
    timer() {return new Decimal(120).mul(levelableEffect("pet", 503)[3])},
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 0:
                return "f00"
            case 1:
                return "f01"
            case 2:
                return "f02"
            case 3:
                return "f03"
            case 4:
                return "f04"
            case 5:
                return "f05"
            case 6:
                return "f06"
            case 7:
                return "f07"
            case 8:
                return "f08"
            case 9:
                return "f09"
            case 10:
                return "f10"
            default:
                let random = Math.random()
                let cel = ["f00", "f01", "f02", "f03", "f04", "f05", "f06", "f07", "f08", "f09", "f10"]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}

BHC.f00 = {
    name: "Celestialite F-00",
    symbol: "00",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
        0: {
            name: "Quick Shot?",
            instant: true,
            type: "damage",
            target: "celestialite",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f01 = {
    name: "Celestialite F-01",
    symbol: "01",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    mending: new Decimal(10),
    actions: {
        0: {
            name: "Bandage<br><small>(That's it?)</small>",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(5),
            cooldown: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f02 = {
    name: "Celestialite F-02",
    symbol: "02",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
        0: {
            name: "Slippery Knife",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            properties: {
                "backfire": [1, 1],
            },
            cooldown: new Decimal(5),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f03 = {
    name: "Celestialite F-03",
    symbol: "03",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
        0: {
            name: "Doping",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "agilityAdd": new Decimal(2),
            },
            cooldown: new Decimal(2),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f04 = {
    name: "Celestialite F-04",
    symbol: "04",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f05 = {
    name: "Celestialite F-05",
    symbol: "05",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
        0: {
            name: "Fun Fact",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target) {
                let random = Math.floor(Math.random()*10)
                switch (random) {
                    case 0:
                        bhLog("<span style='color: #fff'>Fun Fact: Grasshoppers have their ears located on their abdomens.")
                        break;
                    case 1:
                        bhLog("<span style='color: #fff'>Fun Fact: Gravity is slightly weaker in Antimatter World.")
                        break;
                    case 2:
                        bhLog("<span style='color: #fff'>Fun Fact: Dice rigging was made by Zar himself due to him getting frustrated at waiting too much.")
                        break;
                    case 3:
                        bhLog("<span style='color: #fff'>Fun Fact: It's still always watching!")
                        break;
                    case 4:
                        bhLog("<span style='color: #fff'>Fun Fact: Your steel is made of grasshoppers ... somehow.")
                        break;
                    case 5:
                        bhLog("<span style='color: #fff'>Fun Fact: Matos didn't make the black heart, he's just a squatter.")
                        break;
                    case 6:
                        bhLog("<span style='color: #fff'>Fun Fact: Matos wasn't very good at making celestialites.")
                        break;
                    case 7:
                        bhLog("<span style='color: #fff'>Fun Fact: Aleph has no clue where her spirit came from, and has never found another one since.")
                        break;
                    case 8:
                        bhLog("<span style='color: #fff'>Fun Fact: One of the older experiments tried to escape, but got disintegrated by the dark essence surrounding this lab. I miss them.")
                        break;
                    case 9:
                        bhLog("<span style='color: #fff'>Fun Fact: If you hold the coin clipper button for 20 seconds you can perform a super coin clip!")
                        break;
                }
            },
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f06 = {
    name: "Celestialite F-06",
    symbol: "06",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
        0: {
            name: "Spoon",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(0.01),
            cooldown: new Decimal(4),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f07 = {
    name: "Celestialite F-07",
    symbol: "07",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
        0: {
            name: "Skill Refresh",
            instant: true,
            type: "reset",
            target: "random",
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f08 = {
    name: "Celestialite F-08",
    symbol: "08",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
        0: {
            name: "Implode",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(100),
            cooldown: new Decimal(120),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f09 = {
    name: "Celestialite F-09",
    symbol: "09",
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
        0: {
            name: "Expanded Vitality",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "healthAdd"() {return Decimal.pow(2, player.bh.combo).mul(10)},
            },
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

BHC.f10 = {
    name() {return player.bh.celestialite.actions[0].variables.attacks ? "Gwa" : "Celestialite F-10"},
    symbol: "10",
    icon() {return player.bh.celestialite.actions[0].variables.attacks ? "resources/gwa.png" : false},
    style: {
        background: "linear-gradient(135deg, #A8C86A, #426535)",
        color: "black",
        borderColor: "#185A00",
        fontSize: "60px",
    },
    health: new Decimal(100),
    damage: new Decimal(5),
    actions: {
        0: {
            name() {
                if (player.bh.celestialite.actions[0].variables.attacks) {
                    if (player.bh.celestialite.actions[0].variables.attacks == 0) {
                        return "???"
                    }
                    if (player.bh.celestialite.actions[0].variables.attacks == 1) {
                        return "Gwa"
                    }
                }
                return "???"
            },
            instant: true,
            type: "function",
            target: "randomPlayer",
            onTrigger(index, slot, target) {
                if (!player.bh.celestialite.actions[0].variables.attacks) player.bh.celestialite.actions[0].variables.attacks = 0
                switch (player.bh.celestialite.actions[0].variables.attacks) {
                    case 0:
                        player.bh.celestialite.actions[0].variables.attacks = 1
                        break;
                    case 1:
                        bhLog("<span style='color: #fff'>Gwa")
                        break;
                    default:
                        console.log("This isn't supposed to be triggered")
                        player.bh.celestialite.actions[0].variables.attacks = 0
                        break;
                }
            },
            cooldown: new Decimal(5),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.3 && player.bh.combo.gte(5)) {
            gain.matosShard = Decimal.pow(2, player.bh.combo).div(32)
        } else if (random < 0.5 && player.bh.combo.gte(10)) {
            gain.matosFragment = Decimal.pow(2, player.bh.combo).div(1024)
        } else if (random < 0.6 && player.bh.combo.gte(15)) {
            gain.matosEssence = Decimal.pow(2, player.bh.combo).div(32768)
        } else {
            gain.matosDust = Decimal.pow(2, player.bh.combo)
        }
        return gain
    },
}

// Pot of Greed (just puts a gag message in the log)

// Subtract 0.1 seconds from the timer =-15TH COMBO-=

// Dazes itself

// Changes icon and name to gwa =-10TH COMBO-=

// Passive that constantly stuns the celestialite

// 1d100 (99% chance to miss)

// Multiplies maximum health ... but not current health

// Increase size of celestialite icon

// Spawn a failed cookie (gives a random amount of matos resources)