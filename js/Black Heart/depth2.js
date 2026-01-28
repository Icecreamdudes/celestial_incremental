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

        cooldown: new Decimal(0),
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
                margin: "10px 0 0 60px",
            }
        } else {
            str = {
                background: "radial-gradient(#720455, #250121)",
                backgroundOrigin: "border-box",
                borderColor: "#961d76",
                color: "#b33793",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "10px 0 0 60px",
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
        if (player.depth2.cooldown.gt(0)) player.depth2.cooldown = player.depth2.cooldown.sub(delta)

        player.depth2.comboEffect = Decimal.pow(2, player.depth2.highestCombo)

        player.depth2.milestoneEffect = new Decimal(0)
        for (let i = 25; i < 251; i = i+25) {
            player.depth2.milestoneEffect = player.depth2.milestoneEffect.add(player.depth2.milestone[i])
        }
    },
    clickables: {
        "enter": {
            title() { return player.depth2.cooldown.lte(0) ? "<h2>Enter Depth 2" : "<h2>Cooldown: " + formatTime(player.depth2.cooldown) },
            canClick() { return player.depth2.cooldown.lte(0) },
            unlocked: true,
            onClick() {
                player.subtabs["bh"]["stuff"] = "battle"

                for (let i = 0; i < 3; i++) {
                    player.bh.characters[i].health = player.bh.characters[i].maxHealth

                    for (let j = 0; j < 4; j++) {
                        player.bh.characters[i].skills[j].cooldown = player.bh.characters[i].skills[j].cooldownMax
                        player.bh.characters[i].skills[j].duration = new Decimal(0)
                        player.bh.characters[i].skills[j].interval = new Decimal(0)
                    }
                }

                player.bh.currentStage = "depth2"
                player.bh.combo = new Decimal(player.depth2.comboStart)
                celestialiteSpawn()

                player.depth2.cooldown = BHS["depth2"].cooldown
            },
            style() {
                let look = {width: "200px", minHeight: "75px", color: "white", border: "3px solid #8a0e79", borderRadius: "20px"}
                player.depth2.cooldown.gt(0) ? look.backgroundColor = "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
    },
    upgrades: {
        1: {
            title: "Power of Anger",
            unlocked: true,
            description: "Unlocks Kres' \"Battle Cry\" skill.",
            cost: new Decimal(200),
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
            cost: new Decimal(60),
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
            cost: new Decimal(6),
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
            cost: new Decimal(10),
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
            cost: new Decimal(750),
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
            cost: new Decimal(180),
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
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth2.faintUmbrite},
            pay(amt) { player.depth2.faintUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Deadly</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost base character damage\n\
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
        2: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth2.clearUmbrite},
            pay(amt) { player.depth2.clearUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).pow(2.5).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Normality</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost normality gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + "\n\ \n\
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
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.depth2.faintUmbrite},
            pay(amt) { player.depth2.faintUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(4).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Faint Lights</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost star gain\n\
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
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.depth2.clearUmbrite},
            pay(amt) { player.depth2.clearUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Shards-o-Shards</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost CB XP Button ESC\n\
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
                    ["raw-html", "<u>Cooldown", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "10 Minutes", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["raw-html", "<u>Combo Scaling", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "1.5% starting at 100", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "270px", background: "var(--layerBackground)"}],
            ], {width: "250px", height: "420px"}],
            ["style-column", [
                ["top-column", [
                    ["style-column", [
                        ["raw-html", () => {return "Highest Combo: " + formatWhole(player.depth2.highestCombo) + "/" + BHS["depth2"].comboLimit}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ], {width: "225px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "2px"}],
                    ["top-column", [
                        ["raw-html", () => {return "Boosts NIP by x" + formatSimple(player.depth2.comboEffect)}, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "250px", height: "25px"}],
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
    music: "music/celestialites.mp3",
    cooldown: new Decimal(600),
    comboLimit: 250,
    comboScaling: 1.015,
    comboScalingStart: 100,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 24:
                return "lesserEnas"
            case 49: case 74:
                return "lesserPente"
            case 99: case 124:
                return "lesserDeka"
            case 149: case 174:
                return "lesserHekaton"
            case 199: case 224:
                return "lesserKhilioi"
            case 249:
                return "lesserMyrioi"
            default:
                let random = Math.random()
                let cel = ["lesserAlpha", "lesserBeta", "lesserGamma", "lesserDelta", "lesserEpsilon"]
                if (combo >= 25) cel.push("lesserZeta")
                if (combo >= 50) cel.push("lesserEta")
                if (combo >= 100) cel.push("lesserTheta")
                if (combo >= 150) cel.push("lesserIota")
                if (combo >= 200) cel.push("lesserKappa")
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}