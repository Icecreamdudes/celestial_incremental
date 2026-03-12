addLayer("depth4", {
    name: "Depth 4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D4", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.depth4.unlocked) player.subtabs["bh"]["stages"] = "depth4"
    },
    startData() { return {
        unlocked: true,

        gloomingNocturnium: new Decimal(0),
        dimNocturnium: new Decimal(0),
        depth4Mult: new Decimal(1),

        highestCombo: new Decimal(0),
        comboEffect: new Decimal(1),
        comboStart: 0,

        milestone: {
            25: 0,
            50: 0,
            75: 0,
            100: 0,
            125: 0,
            150: 0,
            175: 0,
            200: 0,
            225: 0,
            250: 0,
        },
        milestoneEffect: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        let str = {}
        if (!player.depth4.unlocked) {
            str = {
                background: "radial-gradient(#2d002d, #1a001a)",
                backgroundOrigin: "border-box",
                borderColor: "#150015",
                color: "#390039",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                marginLeft: "10px !important",
            }
        } else {
            str = {
                background: "radial-gradient(#980098, #590059)",
                backgroundOrigin: "border-box",
                borderColor: "#470047",
                color: "#c000c0",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                marginLeft: "10px !important",
            }
        }
        if (player.subtabs["bh"]["stages"] == "depth4") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Depth 4",
    tooltipLocked: "Progress further into the hive to unlock.",
    branches: ["depth3"],
    color: "#c000c0",
    update(delta) {
        player.depth4.unlocked = player.al.cocoonLevel >= 16

        player.depth4.comboEffect = Decimal.pow(1.05, player.depth4.highestCombo).pow(buyableEffect("depth4", 2))

        player.depth4.milestoneEffect = new Decimal(0)
        for (let i = 25; i < 251; i = i+25) {
            player.depth4.milestoneEffect = player.depth4.milestoneEffect.add(player.depth4.milestone[i])
        }

        player.depth4.depth4Mult = new Decimal(1)
        player.depth4.depth4Mult = player.depth4.depth4Mult.mul(player.darkTemple.depth4CurMult)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Depth 4",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("depth4")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "radial-gradient(#980098, #590059)", border: "3px solid #370037", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {
        1: {
            title: "You don't need to be hit",
            unlocked: true,
            description: "Unlock the general skill \"Block\".",
            cost: new Decimal(250),
            currencyLocation() { return player.depth4 },
            currencyDisplayName: "Glooming Nocturnium",
            currencyInternalName: "gloomingNocturnium",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        2: {
            title: "Classic Projectile",
            unlocked: true,
            description: "Unlock the general skill \"Poison Needle\".",
            cost: new Decimal(75),
            currencyLocation() { return player.depth4 },
            currencyDisplayName: "Dim Nocturnium",
            currencyInternalName: "dimNocturnium",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        3: {
            title: "Calm down with the scaling",
            unlocked: true,
            description: "Reduce black heart combo softcap scaling by -0.2%",
            cost: new Decimal(1000),
            currencyLocation() { return player.bh },
            currencyDisplayName: "Dark Essence",
            currencyInternalName: "darkEssence",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        4: {
            title: "Scattered Buffs",
            unlocked: true,
            description: "Unlock a new upgrade for each character",
            cost: new Decimal(2500),
            currencyLocation() { return player.bh },
            currencyDisplayName: "Dark Essence",
            currencyInternalName: "darkEssence",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        5: {
            title: "Unscrapped",
            unlocked: true,
            description: "Unlock new core scrap upgrades",
            cost: new Decimal(750),
            currencyLocation() { return player.depth4 },
            currencyDisplayName: "Glooming Nocturnium",
            currencyInternalName: "gloomingNocturnium",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        6: {
            title: "Mutiny",
            unlocked: true,
            description: "Unlock a new legendary pet",
            cost: new Decimal(200),
            currencyLocation() { return player.depth4 },
            currencyDisplayName: "Dim Nocturnium",
            currencyInternalName: "dimNocturnium",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
    },
    buyables: {
        1: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth4.gloomingNocturnium},
            pay(amt) { player.depth4.gloomingNocturnium = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Regenerative</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost character regen\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect.sub(1), 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Glooming Nocturnium"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "100px", color: "white", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "#250121"
                return look
            },
        },
        2: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth4.dimNocturnium},
            pay(amt) { player.depth4.dimNocturnium = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Scrap-Chipper</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost depth 4 combo effect\n\
                    Currently: ^" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Dim Nocturnium"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "100px", color: "white", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "#250121"
                return look
            },
        },
        3: {
            costBase() { return new Decimal(80) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.depth4.gloomingNocturnium},
            pay(amt) { player.depth4.gloomingNocturnium = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Score!</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost core fragment scores\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Glooming Nocturnium"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "100px", color: "white", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "#250121"
                return look
            },
        },
        4: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.depth4.dimNocturnium},
            pay(amt) { player.depth4.dimNocturnium = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Generational</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost SME gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Dim Nocturnium"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "100px", color: "white", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "#250121"
                return look
            },
        },
    },
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth4.gloomingNocturnium) + " glooming nocturnium."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth4.dimNocturnium) + " dim nocturnium."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.bh.darkEssence) + " dark essence."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "272px", height: "72px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["blank", "2px"],
                    ["row", [["upgrade", 1], ["upgrade", 2]]],
                    ["row", [["upgrade", 3], ["upgrade", 4]]],
                    ["row", [["upgrade", 5], ["upgrade", 6]]],
                    ["row", [["buyable", 1], ["buyable", 2]]],
                    ["row", [["buyable", 3], ["buyable", 4]]],
                    ["blank", "2px"],
                ], {width: "272px", height: "345px", background: "var(--miscButton)", borderRadius: "0 0 0 27px"}],
            ], {width: "272px", height: "420px", borderRight: "3px solid var(--regBorder)"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "Depth 4", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["raw-html", () => {return Decimal.sub(1.025, player.bh.comboScalingReduction).gt(1) ? "<u>Combo Scaling" : ""}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return Decimal.sub(1.025, player.bh.comboScalingReduction).gt(1) ? formatSimple(Decimal.sub(1.025, player.bh.comboScalingReduction).max(1).sub(1).mul(100)) + "% starting at 100" : ""}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["raw-html", "<u>Health Drain", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "1 HP/s", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "197px", background: "var(--layerBackground)"}],
                ["style-row", [
                    ["layer-proxy", ["bh", [
                        ["row", [["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"]]],
                    ]]],
                ], {width: "250px", height: "70px", background: "var(--miscButtonDisable)", borderTop: "3px solid var(--regBorder)"}],
            ], {width: "250px", height: "420px"}],
            ["style-column", [
                ["top-column", [
                    ["style-column", [
                        ["raw-html", () => {return "Highest Combo: " + formatWhole(player.depth4.highestCombo) + "/" + BHS["depth4"].comboLimit}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ], {width: "225px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "2px"}],
                    ["top-column", [
                        ["raw-html", () => {return "Boosts core scraps by x" + formatSimple(player.depth4.comboEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "25px"}],
                    ["top-column", [
                        ["blank", "4px"],
                        ["raw-html", () => {return "Milestones increase skill points by +" + formatSimple(player.depth4.milestoneEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "30px", background: "var(--layerBackground)", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "272px", height: "97px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["raw-html", () => {return "<button class='bhMilestoneButton  base' style='width:257px;height:50px' onclick='player.depth4.comboStart=0'>Starting combo value: " + player.depth4.comboStart + "<br>[Click to set to 0]</button>"}],
                    ["bh-milestone", [25, "depth4", ""]],
                    ["bh-milestone", [50, "depth4", ""]],
                    ["bh-milestone", [75, "depth4", ""]],
                    ["bh-milestone", [100, "depth4", ""]],
                    ["bh-milestone", [125, "depth4", ""]],
                    ["bh-milestone", [150, "depth4", ""]],
                    ["bh-milestone", [175, "depth4", ""]],
                    ["bh-milestone", [200, "depth4", ""]],
                    ["bh-milestone", [225, "depth4", ""]],
                    ["bh-milestone", [250, "depth4", ""]],
                ], {width: "272px", height: "267px", background: "var(--miscButton)", borderBottom: "3px solid var(--regBorder)"}],
                ["style-column", [
                    ["raw-html", "<p style='line-height:1'>Clicking on a cleared milestone allows you to start at that milestones combo value.", {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "272px", height: "50px", background: "var(--miscButtonHover)", borderRadius: "0 0 27px 0"}],
            ], {width: "272px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && player.al.cocoonLevel > 0},
})

BHS.depth4 = {
    nameCap: "Depth 4",
    nameLow: "depth 4",
    music: "music/depth4.mp3",
    comboLimit: 250,
    comboScaling: 1.025,
    comboScalingStart: 100,
    healthDrain: new Decimal(1),
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 24: case 74:
                return "majorEnas"
            case 49: case 124:
                return "majorPente"
            case 99: case 174:
                return "majorDeka"
            case 149: case 224:
                return "majorHekaton"
            case 199:
                return "majorKhilioi"
            case 249:
                return "majorMyrioi"
            default:
                let random = Math.random()
                let cel = ["majorAlpha", "majorBeta", "majorGamma", "majorDelta", "majorEpsilon", "majorZeta", /*"majorEta", "majorTheta", "majorIota"*/]
                if (combo >= 25) cel.push("majorKappa")
                if (combo >= 50) cel.push("majorLambda")
                if (combo >= 100) cel.push("majorMu")
                if (combo >= 150) cel.push("majorNu")
                if (combo >= 200) cel.push("majorXi")
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}

BHC.majorAlpha = {
    name: "Celestialite Major Alpha",
    symbol: "⇑α",
    style: {
        background: "linear-gradient(45deg, #5943A3, #8749BD)",
        color: "black",
        borderColor: "#321374",
    },
    health: new Decimal(400),
    damage: new Decimal(25),
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
        1: {
            name: "Magic Stimulant",
            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "damageMult": new Decimal(2),
            },
            duration: new Decimal(10),
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingNocturnium = Decimal.add(10, getRandomInt(5))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimNocturnium = Decimal.add(2, getRandomInt(2))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(1))
        }
        return gain
    },
}

BHC.majorBeta = {
    name: "Celestialite Major Beta",
    symbol: "⇑β",
    style: {
        background: "linear-gradient(45deg, #5943A3, #8749BD)",
        color: "black",
        borderColor: "#321374",
    },
    health: new Decimal(550),
    damage: new Decimal(10),
    regen: new Decimal(1),
    attributes: {
        "daze": new Decimal(0.5),
    },
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
            name: "Bludgeon",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(5),
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingNocturnium = Decimal.add(12, getRandomInt(6))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimNocturnium = Decimal.add(3, getRandomInt(2))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(1))
        }
        return gain
    },
}

BHC.majorGamma = {
    name: "Celestialite Major Gamma",
    symbol: "⇑γ",
    style: {
        background: "linear-gradient(45deg, #5943A3, #8749BD)",
        color: "black",
        borderColor: "#321374",
    },
    health: new Decimal(500),
    damage: new Decimal(20),
    attributes: {
        "daze": new Decimal(0.5),
    },
    actions: {
        0: {
            name: "Basic Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(4),
        },
        1: {
            name: "Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(18),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingNocturnium = Decimal.add(15, getRandomInt(5))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimNocturnium = Decimal.add(4, getRandomInt(3))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(2))
        }
        return gain
    },
}

BHC.majorDelta = {
    name: "Celestialite Major Delta",
    symbol: "⇑δ",
    style: {
        background: "linear-gradient(45deg, #5943A3, #8749BD)",
        color: "black",
        borderColor: "#321374",
    },
    health: new Decimal(600),
    damage: new Decimal(10),
    actions: {
        0: {
            name: "Triple Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            properties: {
                "multi-hit": [3, 300],
            },
            value: new Decimal(1),
            cooldown: new Decimal(6),
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
            gain.gloomingNocturnium = Decimal.add(18, getRandomInt(5))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimNocturnium = Decimal.add(4, getRandomInt(4))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(2))
        }
        return gain
    },
}

BHC.majorEpsilon = {
    name: "Celestialite Major Epsilon",
    symbol: "⇑ε",
    style: {
        background: "linear-gradient(45deg, #5943A3, #8749BD)",
        color: "black",
        borderColor: "#321374",
    },
    health: new Decimal(450),
    damage: new Decimal(5),
    regen: new Decimal(2),
    actions: {
        0: {
            name: "Pummel Flurry",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "multi-hit": [5, 200],
            },
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
        1: {
            name: "Adrenaline",
            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "agilityAdd": new Decimal(100),
            },
            duration: new Decimal(5),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingNocturnium = Decimal.add(20, getRandomInt(5))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimNocturnium = Decimal.add(5, getRandomInt(4))
        } else {
            gain.darkEssence = Decimal.add(3, getRandomInt(2))
        }
        return gain
    },
}

BHC.majorZeta = {
    name: "Celestialite Major Zeta",
    symbol: "⇑ζ",
    style: {
        background: "linear-gradient(45deg, #5943A3, #8749BD)",
        color: "black",
        borderColor: "#321374",
    },
    health: new Decimal(550),
    damage: new Decimal(15),
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
            cooldown: new Decimal(6),

            active: true,
            constantType: "effect",
            constantTarget: "storedTarget",
            effects: {
                "regenAdd": new Decimal(-5)
            },
            duration: new Decimal(3),
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
            gain.gloomingNocturnium = Decimal.add(20, getRandomInt(8))
        } else if (random > 0.5 && random < 0.85) {
            gain.dimNocturnium = Decimal.add(5, getRandomInt(5))
        } else {
            gain.darkEssence = Decimal.add(3, getRandomInt(2))
        }
        return gain
    },
}
// ==--- MAIN GIMMICKS

// Poison via negative regen active skill
// Active Poison attack / Block
// Active Poison attack / Strong Regular Attack
// Passive Poison that hits all (including celestialite) / Block

// Multi-hit attacks
// Multi-hit attack / Block
// Multi-hit attack / AGI buff

// Crit attacks (one that has a luck increase with it would be cool)
// Crit attack / Heal
// Crit attack / DMG buff
// Crit attack / LUCK buff

// Daze Attribute
// Daze / 2 Attacks (One fast and weak, the other slow and strong)
// Daze / Attack & Heal
// Daze / Multi-hit Attack / LUCK buff

// ==--- SIDE ACTIONS

// Heals
// Blocks
// Stat buffs

// MINIBOSS IDEAS

// Dazed, has a crit attack, and a multi-hit attack, but also an action that increases luck

// Has an attack that deals poison, and the damage from the poison increases from a seperate skill. Also a heal for funsies. (Probably done by basing the poison damage from a seperate stat and increasing that stat)

// Boss who has a multi-hit attack, and a skill that increases the amount of multi-hits it does (likely by tying it to a stat and increasing that stat)

// Boss that has an action with a really low chance to crit, and an action that massively increases agility

// Boss with a smaller amount of health, but 2 block skills and a multi-hit crit attack.

// Boss who has a missable poison attack, a critable multi-hit attack, a missable heal, and a missable poison multi-hit critable attack. (silly)