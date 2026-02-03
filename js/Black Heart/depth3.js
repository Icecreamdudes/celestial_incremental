addLayer("depth3", {
    name: "Depth 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D3", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.depth3.unlocked) player.subtabs["bh"]["stages"] = "depth3"
    },
    startData() { return {
        unlocked: true,

        vividUmbrite: new Decimal(0),
        lustrousUmbrite: new Decimal(0),
        depth3Mult: new Decimal(1),

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
        if (!player.depth3.unlocked) {
            str = {
                background: "radial-gradient(#220201, #220119)",
                backgroundOrigin: "border-box",
                borderColor: "#2d0823",
                color: "#35102c",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                marginRight: "20px !important",
            }
        } else {
            str = {
                background: "radial-gradient(#720804, #720455)",
                backgroundOrigin: "border-box",
                borderColor: "#961d76",
                color: "#b33793",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                marginRight: "20px !important",
            }
        }
        if (player.subtabs["bh"]["stages"] == "depth3") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Depth 3",
    tooltipLocked: "Reach 25 combo in depth 2 to unlock.",
    branches: ["depth2"],
    color: "#b33793",
    update(delta) {
        player.depth3.unlocked = player.depth2.milestone[25] > 0

        player.depth3.comboEffect = Decimal.pow(1.15, player.depth3.highestCombo).pow(buyableEffect("depth3", 2))

        player.depth3.milestoneEffect = new Decimal(0)
        for (let i = 25; i < 251; i = i+25) {
            player.depth3.milestoneEffect = player.depth3.milestoneEffect.add(player.depth3.milestone[i])
        }

        player.depth3.depth3Mult = new Decimal(1)
        player.depth3.depth3Mult = player.depth3.depth3Mult.mul(player.darkTemple.depth3CurMult)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Depth 3",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("depth3")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "radial-gradient(#720804, #410230)", border: "3px solid #961d76", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {
        1: {
            title: "Executioner",
            unlocked: true,
            description: "Unlocks Kres' \"Decapitate\" skill.",
            cost: new Decimal(200),
            currencyLocation() { return player.depth3 },
            currencyDisplayName: "Vivid Umbrite",
            currencyInternalName: "vividUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        2: {
            title: "Arson!",
            unlocked: true,
            description: "Unlocks Nav's \"Fireball\" skill.",
            cost: new Decimal(60),
            currencyLocation() { return player.depth3 },
            currencyDisplayName: "Lustrous Umbrite",
            currencyInternalName: "lustrousUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        3: {
            title: "Quintuple Kill",
            unlocked: true,
            description: "Unlock Sel's \"Arrow Barrage\" skill.",
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
        4: {
            title: "Now let me see your war face!",
            unlocked: true,
            description: "Unlock the general skill \"Scream\".",
            cost: new Decimal(12),
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
            title: "New Formula",
            unlocked: true,
            description: "Singularity gain is boosted based on SP gain.",
            cost: new Decimal(600),
            currencyLocation() { return player.depth3 },
            currencyDisplayName: "Vivid Umbrite",
            currencyInternalName: "vividUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        6: {
            title: "Colors From Darkness",
            unlocked: true,
            description: "Boost realm essence based on dark essence.",
            cost: new Decimal(150),
            currencyLocation() { return player.depth3 },
            currencyDisplayName: "Lustrous Umbrite",
            currencyInternalName: "lustrousUmbrite",
            effect() {
                let amt = player.bh.darkEssence.add(1).log(10).div(2).add(1)
                if (amt.gte(10)) amt = amt.div(10).pow(0.1).mul(10)
                return amt
            },
            effectDisplay() { return "x" + formatShort(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
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
            currency() { return player.depth3.vividUmbrite},
            pay(amt) { player.depth3.vividUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Speedy</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost base character agility\n\
                    Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Vivid Umbrite"
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
            costBase() { return new Decimal(7) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth3.lustrousUmbrite},
            pay(amt) { player.depth3.lustrousUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Non-Singular</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost depth 3 combo effect\n\
                    Currently: ^" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Lustrous Umbrite"
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
            currency() { return player.depth3.vividUmbrite},
            pay(amt) { player.depth3.vividUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(4).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Vivid Stars</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost star gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Vivid Umbrite"
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
            currency() { return player.depth3.lustrousUmbrite},
            pay(amt) { player.depth3.lustrousUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(0.03).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Crates-o-Crates</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost CB crate roll chance\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Lustrous Umbrite"
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
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth3.vividUmbrite) + " vivid umbrite."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth3.lustrousUmbrite) + " lustrous umbrite."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
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
                        ["raw-html", "Depth 3", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["raw-html", "<u>Combo Scaling", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "1.5% starting at 100", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
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
                        ["raw-html", () => {return "Highest Combo: " + formatWhole(player.depth3.highestCombo) + "/" + BHS["depth3"].comboLimit}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ], {width: "225px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "2px"}],
                    ["top-column", [
                        ["raw-html", () => {return "Boosts singularity points by x" + formatSimple(player.depth3.comboEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "25px"}],
                    ["top-column", [
                        ["blank", "4px"],
                        ["raw-html", () => {return "Milestones increase skill points by +" + formatSimple(player.depth3.milestoneEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "30px", background: "var(--layerBackground)", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "272px", height: "97px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["raw-html", () => {return "<button class='bhMilestoneButton  base' style='width:257px;height:50px' onclick='player.depth3.comboStart=0'>Starting combo value: " + player.depth3.comboStart + "<br>[Click to set to 0]</button>"}],
                    ["bh-milestone", [25, "depth3", ""]],
                    ["bh-milestone", [50, "depth3", ""]],
                    ["bh-milestone", [75, "depth3", ""]],
                    ["bh-milestone", [100, "depth3", ""]],
                    ["bh-milestone", [125, "depth3", ""]],
                    ["bh-milestone", [150, "depth3", ""]],
                    ["bh-milestone", [175, "depth3", ""]],
                    ["bh-milestone", [200, "depth3", ""]],
                    ["bh-milestone", [225, "depth3", ""]],
                    ["bh-milestone", [250, "depth3", ""]],
                ], {width: "272px", height: "267px", background: "var(--miscButton)", borderBottom: "3px solid var(--regBorder)"}],
                ["style-column", [
                    ["raw-html", "<p style='line-height:1'>Clicking on a cleared milestone allows you to start at that milestones combo value.", {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "272px", height: "50px", background: "var(--miscButtonHover)", borderRadius: "0 0 27px 0"}],
            ], {width: "272px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && player.depth1.milestone[25] > 0},
})

BHS.depth3 = {
    nameCap: "Depth 3",
    nameLow: "depth 3",
    music: "music/celestialites.mp3",
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

BHC.greaterAlpha = {
    name: "Celestialite Greater Alpha",
    symbol: "⬆α",
    style: {
        background: "linear-gradient(90deg, #5900B4, #8D0048)",
        color: "black",
        borderColor: "#520040",
    },
    health: new Decimal(280),
    damage: new Decimal(10),
    regen: new Decimal(3),
    actions: {
        0: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(7),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.vividUmbrite = Decimal.add(8, getRandomInt(6))
        } else if (random > 0.5 && random < 0.85) {
            gain.lustrousUmbrite = Decimal.add(2, getRandomInt(1))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}