addLayer("depth2", {
    name: "Depth 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D2", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.depth2.unlocked) player.subtabs["bh"]["stages"] = "depth2"
    },
    startData() { return {
        unlocked: true,

        faintUmbrite: new Decimal(0),
        clearUmbrite: new Decimal(0),
        depth2Mult: new Decimal(1),

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
        if (!player.depth2.unlocked) {
            str = {
                background: "radial-gradient(#220119, #0b0009)",
                backgroundOrigin: "border-box",
                borderColor: "#2d0823",
                color: "#35102c",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "10px 20px 0 40px !important",
            }
        } else {
            str = {
                background: "radial-gradient(#720455, #250121)",
                backgroundOrigin: "border-box",
                borderColor: "#961d76",
                color: "#b33793",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "10px 20px 0 40px !important",
            }
        }
        if (player.subtabs["bh"]["stages"] == "depth2") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Depth 2",
    tooltipLocked: "Reach 25 combo in depth 1 to unlock.",
    branches: ["depth1"],
    color: "#b33793",
    update(delta) {
        player.depth2.unlocked = player.depth1.milestone[25] > 0

        player.depth2.comboEffect = player.depth2.highestCombo.add(1).pow(5).pow(buyableEffect("depth2", 2))

        player.depth2.milestoneEffect = new Decimal(0)
        for (let i = 25; i < 251; i = i+25) {
            player.depth2.milestoneEffect = player.depth2.milestoneEffect.add(player.depth2.milestone[i])
        }

        player.depth2.depth2Mult = new Decimal(1)
        player.depth2.depth2Mult = player.depth2.depth2Mult.mul(player.darkTemple.depth2CurMult)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Depth 2",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("depth2")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "radial-gradient(#720455, #250121)", border: "3px solid #961d76", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {
        1: {
            title: "Power of Anger",
            unlocked: true,
            description: "Unlocks Kres' \"Battle Cry\" skill.",
            cost: new Decimal(175),
            currencyLocation() { return player.depth2 },
            currencyDisplayName: "Faint Umbrite",
            currencyInternalName: "faintUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        2: {
            title: "Uno Reverse",
            unlocked: true,
            description: "Unlocks Nav's \"Rebounding Aura\" skill.",
            cost: new Decimal(50),
            currencyLocation() { return player.depth2 },
            currencyDisplayName: "Clear Umbrite",
            currencyInternalName: "clearUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        3: {
            title: "Energy Not-Drink",
            unlocked: true,
            description: "Unlock Sel's \"Energy Boost\" skill.",
            cost: new Decimal(8),
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
            title: "Anti-Boo-Boo",
            unlocked: true,
            description: "Unlock the general skill \"Bandage\".",
            cost: new Decimal(16),
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
            title: "Linking Powerer",
            unlocked: true,
            description: "Boost linking power based on singularity points.",
            cost: new Decimal(500),
            currencyLocation() { return player.depth2 },
            currencyDisplayName: "Faint Umbrite",
            currencyInternalName: "faintUmbrite",
            effect() {
                return player.s.singularityPoints.add(1).log(10).add(1).pow(1.2)
            },
            effectDisplay() { return "x" + formatShort(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", fontSize: "9px", lineHeight: "1.1", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        6: {
            title: "Replicanti Limit Breaker",
            unlocked: true,
            description: "Replicanti can go beyond 1e308, but is heavily softcapped.",
            cost: new Decimal(125),
            currencyLocation() { return player.depth2 },
            currencyDisplayName: "Clear Umbrite",
            currencyInternalName: "clearUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", fontSize: "9px", lineHeight: "1.1", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
    },
    buyables: {
        1: {
            costBase() { return new Decimal(12) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth2.faintUmbrite},
            pay(amt) { player.depth2.faintUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Deadly</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost base character damage\n\
                    Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Faint Umbrite"
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
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth2.clearUmbrite},
            pay(amt) { player.depth2.clearUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Posted</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost depth 2 combo effect\n\
                    Currently: ^" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Clear Umbrite"
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
            costBase() { return new Decimal(60) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.depth2.faintUmbrite},
            pay(amt) { player.depth2.faintUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).add(1).pow(2.5) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Faint Lights</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost star power gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Faint Umbrite"
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
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.depth2.clearUmbrite},
            pay(amt) { player.depth2.clearUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Clear Metal</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost starmetal alloy gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Clear Umbrite"
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
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth2.faintUmbrite) + " faint umbrite."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth2.clearUmbrite) + " clear umbrite."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
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
                        ["raw-html", "Depth 2", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["raw-html", () => {return Decimal.sub(1.015, player.bh.comboScalingReduction).gt(1) ? "<u>Combo Scaling" : ""}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return Decimal.sub(1.015, player.bh.comboScalingReduction).gt(1) ? formatSimple(Decimal.sub(1.015, player.bh.comboScalingReduction).max(1).sub(1).mul(100)) + "% starting at 100" : ""}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
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
                        ["raw-html", () => {return "Highest Combo: " + formatWhole(player.depth2.highestCombo) + "/" + BHS["depth2"].comboLimit}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ], {width: "225px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "2px"}],
                    ["top-column", [
                        ["raw-html", () => {return "Boosts Post-OTF Resources by x" + formatSimple(player.depth2.comboEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "25px"}],
                    ["top-column", [
                        ["blank", "4px"],
                        ["raw-html", () => {return "Milestones increase skill points by +" + formatSimple(player.depth2.milestoneEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "30px", background: "var(--layerBackground)", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "272px", height: "97px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["raw-html", () => {return "<button class='bhMilestoneButton  base' style='width:257px;height:50px' onclick='player.depth2.comboStart=0'>Starting combo value: " + player.depth2.comboStart + "<br>[Click to set to 0]</button>"}],
                    ["bh-milestone", [25, "depth2", ""]],
                    ["bh-milestone", [50, "depth2", ""]],
                    ["bh-milestone", [75, "depth2", ""]],
                    ["bh-milestone", [100, "depth2", ""]],
                    ["bh-milestone", [125, "depth2", ""]],
                    ["bh-milestone", [150, "depth2", ""]],
                    ["bh-milestone", [175, "depth2", ""]],
                    ["bh-milestone", [200, "depth2", ""]],
                    ["bh-milestone", [225, "depth2", ""]],
                    ["bh-milestone", [250, "depth2", ""]],
                ], {width: "272px", height: "267px", background: "var(--miscButton)", borderBottom: "3px solid var(--regBorder)"}],
                ["style-column", [
                    ["raw-html", "<p style='line-height:1'>Clicking on a cleared milestone allows you to start at that milestones combo value.", {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "272px", height: "50px", background: "var(--miscButtonHover)", borderRadius: "0 0 27px 0"}],
            ], {width: "272px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

BHS.depth2 = {
    nameCap: "Depth 2",
    nameLow: "depth 2",
    music: "music/blackHeart.mp3",
    comboLimit: 250,
    comboScaling: 1.015,
    comboScalingStart: 100,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 24: case 74:
                return "minorEnas"
            case 49: case 124:
                return "minorPente"
            case 99: case 174:
                return "minorDeka"
            case 149: case 224:
                return "minorHekaton"
            case 199:
                return "minorKhilioi"
            case 249:
                return "minorMyrioi"
            default:
                let random = Math.random()
                let cel = ["minorAlpha", "minorBeta", "minorGamma", "minorDelta", "minorEpsilon", "minorZeta", "minorEta", "minorTheta"]
                if (combo >= 25) cel.push("minorIota")
                if (combo >= 50) cel.push("minorKappa")
                if (combo >= 100) cel.push("minorLambda")
                if (combo >= 150) cel.push("minorMu")
                if (combo >= 200) cel.push("minorNu")
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}

BHC.minorAlpha = {
    name: "Celestialite Minor Alpha",
    symbol: "⬇α",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(100),
    damage: new Decimal(2),
    actions: {
        0: {
            name: "Dull Slash",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.6) {
            gain.faintUmbrite = Decimal.add(6, getRandomInt(6))
        } else if (random > 0.6 && random < 0.95) {
            gain.clearUmbrite = Decimal.add(1, getRandomInt(1))
        } else {
            gain.darkEssence = new Decimal(1)
        }
        return gain
    },
}

BHC.minorBeta = {
    name: "Celestialite Minor Beta",
    symbol: "⬇β",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(160),
    damage: new Decimal(12),
    actions: {
        0: {
            name: "Mindless Bludgeon",
            instant: true,
            type: "damage",
            target: "random",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.55) {
            gain.faintUmbrite = Decimal.add(7, getRandomInt(5))
        } else if (random > 0.55 && random < 0.95) {
            gain.clearUmbrite = Decimal.add(1, getRandomInt(2))
        } else {
            gain.darkEssence = new Decimal(1)
        }
        return gain
    },
}

BHC.minorGamma = {
    name: "Celestialite Minor Gamma",
    symbol: "⬇γ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(100),
    damage: new Decimal(12),
    regen: new Decimal(3),
    actions: {
        0: {
            name: "Chop",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(10, getRandomInt(8))
        } else if (random > 0.5 && random < 0.9) {
            gain.clearUmbrite = Decimal.add(2, getRandomInt(2))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.minorDelta = {
    name: "Celestialite Minor Delta",
    symbol: "⬇δ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(190),
    damage: new Decimal(6),
    regen: new Decimal(2),
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
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(8, getRandomInt(10))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(3, getRandomInt(3))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.minorEpsilon = {
    name: "Celestialite Minor Epsilon",
    symbol: "⬇ε",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(120),
    damage: new Decimal(10),
    attributes: {
        "air": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(12, getRandomInt(8))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(4, getRandomInt(3))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(1))
        }
        return gain
    },
}

BHC.minorZeta = {
    name: "Celestialite Minor Zeta",
    symbol: "⬇ζ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(130),
    damage: new Decimal(2),
    attributes: {
        "air": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Quick Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(2),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(14, getRandomInt(6))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(5, getRandomInt(3))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(1))
        }
        return gain
    },
}

BHC.minorEta = {
    name: "Celestialite Minor Eta",
    symbol: "⬇η",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(150),
    damage: new Decimal(20),
    attributes: {
        "warded": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Bludgeon",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(16),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(14, getRandomInt(6))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(5, getRandomInt(3))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(1))
        }
        return gain
    },
}

BHC.minorTheta = {
    name: "Celestialite Minor Theta",
    symbol: "⬇θ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(275),
    damage: new Decimal(10),
    attributes: {
        "warded": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Basic Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(16, getRandomInt(8))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(5, getRandomInt(5))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(2))
        }
        return gain
    },
}

BHC.minorIota = {
    name: "Celestialite Minor Iota",
    symbol: "⬇ι",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(150),
    damage: new Decimal(5),
    actions: {
        0: {
            name: "Slash",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(18, getRandomInt(8))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(6, getRandomInt(4))
        } else {
            gain.darkEssence = Decimal.add(3, getRandomInt(1))
        }
        return gain
    },
}

BHC.minorKappa = {
    name: "Celestialite Minor Kappa",
    symbol: "⬇κ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(50),
    damage: new Decimal(5),
    regen: new Decimal(5),
    actions: {
        0: {
            name: "Stone Toss",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(20, getRandomInt(10))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(8, getRandomInt(5))
        } else {
            gain.darkEssence = Decimal.add(3, getRandomInt(2))
        }
        return gain
    },
}

BHC.minorLambda = {
    name: "Celestialite Minor Lambda",
    symbol: "⬇λ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(120),
    damage: new Decimal(6),
    attributes: {
        "air": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Missile Rain",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(24, getRandomInt(6))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(10, getRandomInt(5))
        } else {
            gain.darkEssence = Decimal.add(3, getRandomInt(3))
        }
        return gain
    },
}

BHC.minorMu = {
    name: "Celestialite Minor Mu",
    symbol: "⬇μ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(200),
    damage: new Decimal(5),
    attributes: {
        "warded": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Quick Shot",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(4),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(30, getRandomInt(5))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(12, getRandomInt(6))
        } else {
            gain.darkEssence = Decimal.add(5, getRandomInt(3))
        }
        return gain
    },
}

BHC.minorNu = {
    name: "Celestialite Minor Nu",
    symbol: "⬇ν",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(100),
    damage: new Decimal(1),
    regen: new Decimal(1),
    attributes: {
        "air": new Decimal(0.2), // Resistance DMG Mult
        "warded": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Pebble Toss",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(1),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.faintUmbrite = Decimal.add(35, getRandomInt(15))
        } else if (random > 0.5 && random < 0.85) {
            gain.clearUmbrite = Decimal.add(15, getRandomInt(10))
        } else {
            gain.darkEssence = Decimal.add(6, getRandomInt(4))
        }
        return gain
    },
}

// MINIBOSSES
BHC.minorEnas = {
    name: "Celestialite Minor Enas",
    symbol: "⬇Ι",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(300),
    damage: new Decimal(10),
    regen: new Decimal(2),
    actions: {
        0: {
            name: "Mindless Chop",
            instant: true,
            type: "damage",
            target: "random",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        1: {
            name: "Triple Shot",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            value: new Decimal(0.5),
            cooldown: new Decimal(25),
        },
    },
    reward() {
        let gain = {}
        gain.faintUmbrite = new Decimal(40)
        gain.clearUmbrite = new Decimal(12)
        gain.darkEssence = new Decimal(5)
        return gain
    },
}

BHC.minorPente = {
    name: "Celestialite Minor Pente",
    symbol: "⬇Π",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(500),
    damage: new Decimal(10),
    regen: new Decimal(1),
    actions: {
        0: {
            name: "Slash",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        1: {
            name: "Earthquake",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(25),
        },
    },
    reward() {
        let gain = {}
        gain.faintUmbrite = new Decimal(80)
        gain.clearUmbrite = new Decimal(25)
        gain.darkEssence = new Decimal(8)
        return gain
    },
}

BHC.minorDeka = {
    name: "Celestialite Minor Deka",
    symbol: "⬇Δ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(750),
    damage: new Decimal(15),
    attributes: {
        "air": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Quick Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
        1: {
            name: "Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(25),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        gain.faintUmbrite = new Decimal(125)
        gain.clearUmbrite = new Decimal(50)
        gain.darkEssence = new Decimal(12)
        return gain
    },
}

BHC.minorHekaton = {
    name: "Celestialite Minor Hekaton",
    symbol: "⬇Η",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(1000),
    damage: new Decimal(15),
    attributes: {
        "warded": new Decimal(0.2), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Magic Gun",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(15),
        },
        1: {
            name: "Larger Magazine",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "damageAdd": new Decimal(15), // Additive Effect
            },
            cooldown: new Decimal(30),
        },
    },
    reward() {
        let gain = {}
        gain.faintUmbrite = new Decimal(200)
        gain.clearUmbrite = new Decimal(60)
        gain.darkEssence = new Decimal(18)
        return gain
    },
}

BHC.minorKhilioi = {
    name: "Celestialite Minor Khilioi",
    symbol: "⬇Χ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(1250),
    damage: new Decimal(4),
    regen: new Decimal(2),
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
        gain.faintUmbrite = new Decimal(300)
        gain.clearUmbrite = new Decimal(100)
        gain.darkEssence = new Decimal(40)
        return gain
    },
}

BHC.minorMyrioi = {
    name: "Celestialite Minor Myrioi",
    symbol: "⬇Μ",
    style: {
        background: "linear-gradient(90deg, #8F0E6E, #A30D40)",
        color: "black",
        borderColor: "#4A0014",
    },
    health: new Decimal(1500),
    damage: new Decimal(8),
    regen: new Decimal(2),
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
        1: {
            name: "Basic Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(2),
            cooldown: new Decimal(5),
        },
        2: {
            name: "Missile Rain",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        gain.faintUmbrite = new Decimal(600)
        gain.clearUmbrite = new Decimal(200)
        gain.darkEssence = new Decimal(80)
        return gain
    },
}