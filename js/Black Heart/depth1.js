addLayer("depth1", {
    name: "Depth 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D1", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        player.subtabs["bh"]["stages"] = "depth1"
    },
    startData() { return {
        unlocked: true,

        gloomingUmbrite: new Decimal(0),
        dimUmbrite: new Decimal(0),

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
        return {
            background: "radial-gradient(#250121, black)",
            backgroundOrigin: "border-box",
            borderColor: "#720455",
            color: "#961d76",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginTop: "60px",
        };
    },
    tooltip: "Depth 1",
    color: "#8a0e79",
    update(delta) {
        if (player.depth1.cooldown.gt(0)) player.depth1.cooldown = player.depth1.cooldown.sub(delta)

        player.depth1.comboEffect = Decimal.pow(3, player.depth1.highestCombo)

        player.depth1.milestoneEffect = new Decimal(0)
        for (let i = 25; i < 251; i = i+25) {
            player.depth1.milestoneEffect = player.depth1.milestoneEffect.add(player.depth1.milestone[i])
        }
    },
    clickables: {
        "enter": {
            title() { return player.depth1.cooldown.lte(0) ? "<h2>Enter Depth 1" : "<h2>Cooldown: " + formatTime(player.depth1.cooldown) },
            canClick() { return player.depth1.cooldown.lte(0) },
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

                player.bh.currentStage = "depth1"
                player.bh.combo = new Decimal(player.depth1.comboStart)
                celestialiteSpawn()

                player.depth1.cooldown = BHS["depth1"].cooldown
            },
            style() {
                let look = {width: "200px", minHeight: "75px", color: "white", border: "3px solid #8a0e79", borderRadius: "20px"}
                player.depth1.cooldown.gt(0) ? look.backgroundColor = "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
    },
    upgrades: {
        1: {
            title: "Big Time",
            unlocked: true,
            description: "Unlocks Kres' \"Big Attack\" skill.",
            cost: new Decimal(150),
            currencyLocation() { return player.depth1 },
            currencyDisplayName: "Glooming Umbrite",
            currencyInternalName: "gloomingUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        2: {
            title: "Healthy Options",
            unlocked: true,
            description: "Unlocks Nav's \"Heal Spell\" skill.",
            cost: new Decimal(40),
            currencyLocation() { return player.depth1 },
            currencyDisplayName: "Dim Umbrite",
            currencyInternalName: "dimUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        3: {
            title: "Shooty Machine",
            unlocked: true,
            description: "Unlock Sel's \"Turret\" skill.",
            cost: new Decimal(3),
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
            title: "Smack",
            unlocked: true,
            description: "Unlock the general skill \"Slap\".",
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
        5: {
            title: "Old Formula",
            unlocked: true,
            description: "Buff antimatter formula by ^20.",
            cost: new Decimal(500),
            currencyLocation() {return player.depth1 },
            currencyDisplayName: "Glooming Umbrite",
            currencyInternalName: "gloomingUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        6: {
            title: "<small>Should've been here a long time ago",
            unlocked: true,
            description: "Gain 100% of time cubes per second.",
            cost: new Decimal(120),
            currencyLocation() {return player.depth1 },
            currencyDisplayName: "Dim Umbrite",
            currencyInternalName: "dimUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
    },
    buyables: {
        1: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth1.gloomingUmbrite},
            pay(amt) { player.depth1.gloomingUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Healthy</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost base character health\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Glooming Umbrite"
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
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth1.dimUmbrite},
            pay(amt) { player.depth1.dimUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Infinitier</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost depth 1 combo effect\n\
                    Currently: ^" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Dim Umbrite"
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
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.depth1.gloomingUmbrite},
            pay(amt) { player.depth1.gloomingUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(10).pow(5).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Posted</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost post-otf resources\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Glooming Umbrite"
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
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.depth1.dimUmbrite},
            pay(amt) { player.depth1.dimUmbrite = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(10, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Singular (wait no)</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost singularity points\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Dim Umbrite"
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
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth1.gloomingUmbrite) + " glooming umbrite."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth1.dimUmbrite) + " dim umbrite."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
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
                        ["raw-html", "Depth 1", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["raw-html", "<u>Cooldown", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "5 Minutes", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["raw-html", "<u>Combo Scaling", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "1.5% starting at 100", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "270px", background: "var(--layerBackground)"}],
            ], {width: "250px", height: "420px"}],
            ["style-column", [
                ["top-column", [
                    ["style-column", [
                        ["raw-html", () => {return "Highest Combo: " + formatWhole(player.depth1.highestCombo) + "/" + BHS["depth1"].comboLimit}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ], {width: "225px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "2px"}],
                    ["top-column", [
                        ["raw-html", () => {return "Boosts infinity points by x" + formatSimple(player.depth1.comboEffect)}, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "250px", height: "25px"}],
                    ["top-column", [
                        ["blank", "4px"],
                        ["raw-html", () => {return "Milestones increase skill points by +" + formatSimple(player.depth1.milestoneEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "30px", background: "var(--layerBackground)", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "272px", height: "97px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["raw-html", () => {return "<button class='bhMilestoneButton  base' style='width:257px;height:50px' onclick='player.depth1.comboStart=0'>Starting combo value: " + player.depth1.comboStart + "<br>[Click to set to 0]</button>"}],
                    ["bh-milestone", [25, "depth1", ""]],
                    ["bh-milestone", [50, "depth1", ""]],
                    ["bh-milestone", [75, "depth1", ""]],
                    ["bh-milestone", [100, "depth1", ""]],
                    ["bh-milestone", [125, "depth1", ""]],
                    ["bh-milestone", [150, "depth1", ""]],
                    ["bh-milestone", [175, "depth1", ""]],
                    ["bh-milestone", [200, "depth1", ""]],
                    ["bh-milestone", [225, "depth1", ""]],
                    ["bh-milestone", [250, "depth1", ""]],
                ], {width: "272px", height: "267px", background: "var(--miscButton)", borderBottom: "3px solid var(--regBorder)"}],
                ["style-column", [
                    ["raw-html", "<p style='line-height:1'>Clicking on a cleared milestone allows you to start at that milestones combo value.", {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "272px", height: "50px", background: "var(--miscButtonHover)", borderRadius: "0 0 27px 0"}],
            ], {width: "272px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

BHS.depth1 = {
    nameCap: "Depth 1",
    nameLow: "depth 1",
    music: "music/celestialites.mp3",
    cooldown: new Decimal(300),
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

BHC.lesserAlpha = {
    name: "Celestialite Lesser Alpha",
    symbol: "↓α",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(70),
    damage: new Decimal(6),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(9),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.gloomingUmbrite = Decimal.add(8, getRandomInt(5))
        } else {
            gain.dimUmbrite = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.lesserBeta = {
    name: "Celestialite Lesser Beta",
    symbol: "↓β",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(45),
    damage: new Decimal(6),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.gloomingUmbrite = Decimal.add(5, getRandomInt(8))
        } else {
            gain.dimUmbrite = Decimal.add(1, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserGamma = {
    name: "Celestialite Lesser Gamma",
    symbol: "↓γ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(90),
    damage: new Decimal(8),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(7),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingUmbrite = Decimal.add(9, getRandomInt(8))
        } else {
            gain.dimUmbrite = Decimal.add(2, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserDelta = {
    name: "Celestialite Lesser Delta",
    symbol: "↓δ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(110),
    damage: new Decimal(1.5),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(2.5),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.6) {
            gain.gloomingUmbrite = Decimal.add(9, getRandomInt(8))
        } else if (random > 0.6 && random < 0.9) {
            gain.dimUmbrite = Decimal.add(3, getRandomInt(3))
        } else {
            gain.darkEssence = new Decimal(1)
        }
        return gain
    },
}

BHC.lesserEpsilon = {
    name: "Celestialite Lesser Epsilon",
    symbol: "↓ε",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(175),
    damage: new Decimal(10),
    actions: {
        0: {
            effect: "instant",
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
        if (random < 0.45) {
            gain.gloomingUmbrite = Decimal.add(12, getRandomInt(7))
        } else if (random > 0.45 && random < 0.85) {
            gain.dimUmbrite = Decimal.add(4, getRandomInt(3))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.lesserZeta = {
    name: "Celestialite Lesser Zeta",
    symbol: "↓ζ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(50),
    damage: new Decimal(15),
    actions: {
        0: {
            effect: "instant",
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
            gain.gloomingUmbrite = Decimal.add(10, getRandomInt(5))
        } else if (random > 0.5 && random < 0.9) {
            gain.dimUmbrite = Decimal.add(4, getRandomInt(2))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.lesserEta = {
    name: "Celestialite Lesser Eta",
    symbol: "↓η",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(200),
    damage: new Decimal(4),
    actions: {
        0: {
            effect: "instant",
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
        if (random < 0.4) {
            gain.gloomingUmbrite = Decimal.add(15, getRandomInt(10))
        } else if (random > 0.4 && random < 0.85) {
            gain.dimUmbrite = Decimal.add(5, getRandomInt(3))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserTheta = {
    name: "Celestialite Lesser Theta",
    symbol: "↓θ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(150),
    damage: new Decimal(2),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(2),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.4) {
            gain.gloomingUmbrite = Decimal.add(12, getRandomInt(8))
        } else if (random > 0.4 && random < 0.85) {
            gain.dimUmbrite = Decimal.add(4, getRandomInt(3))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.lesserIota = {
    name: "Celestialite Lesser Iota",
    symbol: "↓ι",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(400),
    damage: new Decimal(8),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "random",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.4) {
            gain.gloomingUmbrite = Decimal.add(20, getRandomInt(12))
        } else if (random > 0.4 && random < 0.85) {
            gain.dimUmbrite = Decimal.add(5, getRandomInt(4))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserKappa = {
    name: "Celestialite Lesser Kappa",
    symbol: "↓κ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(500),
    damage: new Decimal(10),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.4) {
            gain.gloomingUmbrite = Decimal.add(25, getRandomInt(15))
        } else if (random > 0.4 && random < 0.85) {
            gain.dimUmbrite = Decimal.add(6, getRandomInt(6))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(2))
        }
        return gain
    },
}

// MINIBOSSES
BHC.lesserEnas = {
    name: "Celestialite Lesser Enas",
    symbol: "↓Ι",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(300),
    damage: new Decimal(15),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        1: {
            effect: "instant",
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(0.5),
            cooldown: new Decimal(23),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(30)
        gain.dimUmbrite = new Decimal(15)
        gain.darkEssence = new Decimal(5)
        return gain
    },
}

BHC.lesserPente = {
    name: "Celestialite Lesser Pente",
    symbol: "↓Π",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(500),
    damage: new Decimal(20),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            effect: "instant",
            type: "heal",
            target: "celestialite",
            value: new Decimal(20),
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(50)
        gain.dimUmbrite = new Decimal(25)
        gain.darkEssence = new Decimal(8)
        return gain
    },
}

BHC.lesserDeka = {
    name: "Celestialite Lesser Deka",
    symbol: "↓Δ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(750),
    damage: new Decimal(15),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1.2),
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(70)
        gain.dimUmbrite = new Decimal(35)
        gain.darkEssence = new Decimal(12)
        return gain
    },
}

BHC.lesserHekaton = {
    name: "Celestialite Lesser Hekaton",
    symbol: "↓Η",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1000),
    damage: new Decimal(30),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(20),
        },
        1: {
            effect: "instant",
            type: "effect",
            target: "celestialite",
            properties: {
                "damageMult": new Decimal(1.1), // Multiplicative Effect
            },
            cooldown: new Decimal(30),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(100)
        gain.dimUmbrite = new Decimal(50)
        gain.darkEssence = new Decimal(15)
        return gain
    },
}

BHC.lesserKhilioi = {
    name: "Celestialite Lesser Khilioi",
    symbol: "↓Χ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1250),
    damage: new Decimal(25),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(0.5),
            cooldown: new Decimal(4),
        },
        1: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        2: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(2),
            cooldown: new Decimal(24),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(150)
        gain.dimUmbrite = new Decimal(75)
        gain.darkEssence = new Decimal(20)
        return gain
    },
}

BHC.lesserMyrioi = {
    name: "Celestialite Lesser Myrioi",
    symbol: "↓Μ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1500),
    damage: new Decimal(20),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            effect: "instant",
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(20),
        },
        2: {
            effect: "instant",
            type: "effect",
            target: "celestialite",
            properties: {
                "damageMult": new Decimal(1.2),
            },
            cooldown: new Decimal(30),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(250)
        gain.dimUmbrite = new Decimal(125)
        gain.darkEssence = new Decimal(30)
        return gain
    },
}