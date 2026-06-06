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
        murkyUmbrite: new Decimal(0),
        depth1Mult: new Decimal(1),

        highestCombo: new Decimal(0),
        lowestCombo: new Decimal(0),
        comboEffect: new Decimal(1),
        negComboEffect: new Decimal(1),
        comboStart: 0,

        milestone: {
            "-250": 0,
            "-225": 0,
            "-200": 0,
            "-175": 0,
            "-150": 0,
            "-125": 0,
            "-100": 0,
            "-75": 0,
            "-50": 0,
            "-25": 0,
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
        negToggle: false,
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#250121, black)",
            backgroundOrigin: "border-box",
            borderColor: "#720455",
            color: "#961d76",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginRight: "50px !important",
        }
        if (player.subtabs["bh"]["stages"] == "depth1") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Depth 1",
    color: "#8a0e79",
    update(delta) {
        player.depth1.comboEffect = Decimal.pow(3, player.depth1.highestCombo.min(250)).pow(buyableEffect("depth1", 2))
        player.depth1.negComboEffect = player.depth1.lowestCombo.div(-10).add(1)

        player.depth1.milestoneEffect = new Decimal(0)
        for (let i in player.depth1.milestone) {
            player.depth1.milestoneEffect = player.depth1.milestoneEffect.add(player.depth1.milestone[i])
        }
        player.depth1.milestoneEffect = player.depth1.milestoneEffect.pow(buyableEffect("depth1", 103))
        
        player.depth1.depth1Mult = new Decimal(1)
        player.depth1.depth1Mult = player.depth1.depth1Mult.mul(player.darkTemple.depth1CurMult)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Depth 1",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("depth1")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "radial-gradient(#250121, black)", border: "3px solid #720455", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
        "neg": {
            title: "Swap Sides",
            canClick: true,
            unlocked() {return hasUpgrade("darkTemple", 10)},
            onClick() {
                if (player.subtabs["depth1"]["stuff"] == "negative") {
                    player.subtabs["depth1"]["stuff"] = "positive"
                } else {
                    player.subtabs["depth1"]["stuff"] = "negative"
                }
            },
            style() {
                let look = {width: "250px", minHeight: "30px", color: "var(--textColor)", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0", padding: "0 5px"}
                if (player.subtabs["depth1"]["stuff"] == "negative") {
                    look.background = "var(--miscButtonHover)"
                } else {
                    look.background = "var(--menuBackground)"
                }
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
            cost: new Decimal(400),
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
            title: "Collectors Edition",
            unlocked: true,
            description: "Unlock new celestial themed punchcards.",
            cost: new Decimal(100),
            currencyLocation() {return player.depth1 },
            currencyDisplayName: "Dim Umbrite",
            currencyInternalName: "dimUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },


        101: {
            title: "Multi Darkness",
            unlocked() {return hasUpgrade("darkTemple", 10)},
            description: "Increase the base stats of all characters by 5%.",
            cost: new Decimal(25000),
            currencyLocation() { return player.depth1 },
            currencyDisplayName: "Glooming Umbrite",
            currencyInternalName: "gloomingUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        102: {
            title: "Tiring Darkness",
            unlocked() {return hasUpgrade("darkTemple", 10)},
            description: "Unlocks the general skill \"Rest\".",
            cost: new Decimal(10000),
            currencyLocation() { return player.depth1 },
            currencyDisplayName: "Dim Umbrite",
            currencyInternalName: "dimUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        103: {
            title: "Exponential Darkness",
            unlocked() {return hasUpgrade("darkTemple", 10)},
            description: "Unlock Exponentiation in Tav's Domain.",
            cost: new Decimal(250000),
            currencyLocation() { return player.depth1 },
            currencyDisplayName: "Glooming Umbrite",
            currencyInternalName: "gloomingUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        104: {
            title: "Vast Darkness",
            unlocked() {return hasUpgrade("darkTemple", 10)},
            description: "Unlock a new DU1 space buyable.",
            cost: new Decimal(100000),
            currencyLocation() { return player.depth1 },
            currencyDisplayName: "Dim Umbrite",
            currencyInternalName: "dimUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        105: {
            title: "Stable Darkness",
            unlocked() {return hasUpgrade("darkTemple", 10)},
            description: "Reduce negative scaling by 1%.",
            cost: new Decimal(250),
            currencyLocation() { return player.depth1 },
            currencyDisplayName: "Murky Umbrite",
            currencyInternalName: "murkyUmbrite",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        106: {
            title: "Double Darkness",
            unlocked() {return hasUpgrade("darkTemple", 10)},
            description: "Slap now has a 10% chance to hit twice.",
            cost: new Decimal(1000),
            currencyLocation() { return player.depth1 },
            currencyDisplayName: "Murky Umbrite",
            currencyInternalName: "murkyUmbrite",
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
            purchaseLimit() { return new Decimal(20).mul(buyableEffect("depth1", 102)).floor() },
            currency() { return player.depth1.gloomingUmbrite},
            pay(amt) { player.depth1.gloomingUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Healthy</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")\n\
                    Boost base character health\n\
                    Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%\n\ \n\
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
            purchaseLimit() { return new Decimal(20).mul(buyableEffect("depth1", 102)).floor() },
            currency() { return player.depth1.dimUmbrite},
            pay(amt) { player.depth1.dimUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Infinitier</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")\n\
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
            purchaseLimit() { return new Decimal(10).mul(buyableEffect("depth1", 102)).floor() },
            currency() { return player.depth1.gloomingUmbrite},
            pay(amt) { player.depth1.gloomingUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).pow(3).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Normality</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")\n\
                    Boost normality gain\n\
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
            purchaseLimit() { return new Decimal(10).mul(buyableEffect("depth1", 102)).floor() },
            currency() { return player.depth1.dimUmbrite},
            pay(amt) { player.depth1.dimUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Shards-o-Shards</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")\n\
                    Boost CB XP Button ESC\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
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
        101: {
            costBase() { return new Decimal(5000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth1.gloomingUmbrite},
            pay(amt) { player.depth1.gloomingUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Healthiest</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost character health\n\
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
        102: {
            costBase() { return new Decimal(2000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth1.dimUmbrite},
            pay(amt) { player.depth1.dimUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Darkened Caps</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost regular Depth 1 buyable caps\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
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
        103: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.depth1.murkyUmbrite},
            pay(amt) { player.depth1.murkyUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Vague Bonuses</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Increase Depth 1 milestone effect exponent\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect.sub(1), 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Murky Umbrite"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "100px", lineHeight: "1", color: "white", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "#250121"
                return look
            },
        },
        104: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.depth1.murkyUmbrite},
            pay(amt) { player.depth1.murkyUmbrite = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Abated Bestowals</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Decrease bestowal buyable cost\n\
                    Currently: /" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Murky Umbrite"
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
    microtabs: {
        stuff: {
            "positive": {
                unlocked: true,
                content: [
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
                                ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "5px"}],
                                ["clickable", "enter"],
                            ], {width: "250px", height: "127px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                            ["top-column", [
                                ["style-column", [
                                    ["clickable", "neg"]
                                ], () => {return hasUpgrade("darkTemple", 10) ? {width: "250px", height: "30px", borderBottom: "3px solid var(--regBorder)"} : {display: "none !important"}}],
                                ["blank", "10px"],
                                ["style-column", [
                                    ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                                ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                                ["raw-html", () => {return Decimal.sub(1.015, player.bh.comboScalingReduction).gt(1) ? "<u>Combo Scaling" : ""}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => {return Decimal.sub(1.015, player.bh.comboScalingReduction).gt(1) ? formatSimple(Decimal.sub(1.015, player.bh.comboScalingReduction).max(1).sub(1).mul(100)) + "% starting at 100" : ""}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "217px", background: "var(--layerBackground)"}],
                            ["style-row", [
                                ["layer-proxy", ["bh", [
                                    ["row", [["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"]]],
                                ]]],
                            ], {width: "250px", height: "70px", background: "var(--miscButtonDisable)", borderTop: "3px solid var(--regBorder)"}],
                        ], {width: "250px", height: "420px"}],
                        ["style-column", [
                            ["top-column", [
                                ["style-column", [
                                    ["raw-html", () => {return "Highest Combo: " + formatWhole(player.depth1.highestCombo.min(250)) + "/" + BHS["depth1"].comboLimit}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                                ], {width: "225px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "2px"}],
                                ["top-column", [
                                    ["raw-html", () => {return "Boosts infinity points by x" + formatSimple(player.depth1.comboEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                                ], {width: "272px", height: "25px"}],
                                ["top-column", [
                                    ["blank", "4px"],
                                    ["raw-html", () => {return "Milestones increase skill points by +" + formatSimple(player.depth1.milestoneEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                                ], {width: "272px", height: "30px", background: "var(--layerBackground)", borderTop: "3px solid var(--regBorder)"}],
                            ], {width: "272px", height: "97px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                            ["theme-scroll-column", [
                                ["raw-html", () => {return "<button class='bhMilestoneButton base' style='width:257px;height:50px' onclick='player.depth1.comboStart=0'>Starting combo value: " + player.depth1.comboStart + "<br>[Click to set to 0]</button>"}],
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
            },
            "negative": {
                unlocked() {return player.depth2.lowestCombo.lt(0)},
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {
                                    return "<p>You have " + formatShortWhole(player.depth1.gloomingUmbrite) + " glooming umbrite.<br>\n\
                                        You have " + formatShortWhole(player.depth1.dimUmbrite) + " dim umbrite.<br>\n\
                                        You have " + formatShortWhole(player.depth1.murkyUmbrite) + " murky umbrite.<br>\n\
                                        You have " + formatShortWhole(player.bh.darkEther) + " dark ether.</p>"
                                }, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "272px", height: "72px", background: "var(--layerBackground)", borderBottom: "3px solid var(--regBorder)"}],
                            ["theme-scroll-column", [
                                ["blank", "2px"],
                                ["row", [["upgrade", 101], ["upgrade", 102]]],
                                ["row", [["upgrade", 105], ["upgrade", 106]]],
                                ["row", [["upgrade", 103], ["upgrade", 104]]],
                                ["row", [["buyable", 101], ["buyable", 102]]],
                                ["row", [["buyable", 103], ["buyable", 104]]],
                                ["blank", "2px"],
                            ], {width: "272px", height: "345px", background: "var(--miscButtonDisable)", borderRadius: "0 0 0 27px"}],
                        ], {width: "272px", height: "420px", borderRight: "3px solid var(--regBorder)"}],
                        ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "Depth 1", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                                ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "5px"}],
                                ["clickable", "enter"],
                            ], {width: "250px", height: "127px", background: "var(--miscButton)", borderBottom: "3px solid var(--regBorder)"}],
                            ["top-column", [
                                ["style-column", [
                                    ["clickable", "neg"]
                                ], () => {return hasUpgrade("darkTemple", 10) ? {width: "250px", height: "30px", borderBottom: "3px solid var(--regBorder)"} : {display: "none !important"}}],
                                ["blank", "10px"],
                                ["style-column", [
                                    ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                                ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                                ["raw-html", () => {return "<u>Negative"}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Combo scaling increases based on combo value"}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "217px", background: "var(--miscButtonDisable)"}],
                            ["style-row", [
                                ["layer-proxy", ["bh", [
                                    ["row", [["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"]]],
                                ]]],
                            ], {width: "250px", height: "70px", background: "var(--miscButton)", borderTop: "3px solid var(--regBorder)"}],
                        ], {width: "250px", height: "420px"}],
                        ["style-column", [
                            ["top-column", [
                                ["style-column", [
                                    ["raw-html", () => {return "Lowest Combo: " + formatWhole(player.depth1.lowestCombo.max(-250)) + "/-" + BHS["depth1"].comboLimit}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                                ], {width: "225px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "2px"}],
                                ["top-column", [
                                    ["raw-html", () => {return "Boosts base IP gain by ^" + formatSimple(player.depth1.negComboEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                                ], {width: "272px", height: "25px"}],
                                ["top-column", [
                                    ["blank", "4px"],
                                    ["raw-html", () => {return "Milestones increase skill points by +" + formatSimple(player.depth1.milestoneEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                                ], {width: "272px", height: "30px", background: "var(--menuBackground)", borderTop: "3px solid var(--regBorder)"}],
                            ], {width: "272px", height: "97px", background: "var(--layerBackground)", borderBottom: "3px solid var(--regBorder)"}],
                            ["theme-scroll-column", [
                                ["raw-html", () => {return "<button class='bhMilestoneButton base' style='width:257px;height:50px' onclick='player.depth1.comboStart=-1'>Starting combo value: " + player.depth1.comboStart + "<br>[Click to set to -1]</button>"}],
                                ["bh-milestone", ["-25", "depth1", ""]],
                                ["bh-milestone", ["-50", "depth1", ""]],
                                ["bh-milestone", ["-75", "depth1", ""]],
                                ["bh-milestone", ["-100", "depth1", ""]],
                                ["bh-milestone", ["-125", "depth1", ""]],
                                ["bh-milestone", ["-150", "depth1", ""]],
                                ["bh-milestone", ["-175", "depth1", ""]],
                                ["bh-milestone", ["-200", "depth1", ""]],
                                ["bh-milestone", ["-225", "depth1", ""]],
                                ["bh-milestone", ["-250", "depth1", ""]],
                            ], {width: "272px", height: "267px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                            ["style-column", [
                                ["raw-html", "<p style='line-height:1'>Clicking on a cleared milestone allows you to start at that milestones combo value.", {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "272px", height: "50px", background: "var(--layerBackground)", borderRadius: "0 0 27px 0"}],
                        ], {width: "272px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
                    ], {width: "800px", height: "420px"}],
                ],
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", {borderWidth: "0"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

BHS.depth1 = {
    nameCap: "Depth 1",
    nameLow: "depth 1",
    music: "music/celestialites.mp3",
    comboLimit: 250,
    comboScaling: 1.015,
    comboScalingStart: 100,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 24: case 74:
                return "lesserEnas"
            case 49: case 124:
                return "lesserPente"
            case 99: case 174:
                return "lesserDeka"
            case 149: case 224:
                return "lesserHekaton"
            case 199:
                return "lesserKhilioi"
            case 249:
                return "lesserMyrioi"
            case -24: case -74:
                return "lesserYi"
            case -49: case -124:
                return "lesserEr"
            case -99: case -174:
                return "lesserSan"
            case -149: case -224:
                return "lesserSi"
            case -199:
                return "lesserWu"
            case -249:
                return "lesserLiu"
            default:
                let random = Math.random()
                let cel = ["lesserAlpha", "lesserBeta", "lesserGamma", "lesserDelta", "lesserEpsilon"]
                if (combo >= 25) cel.push("lesserZeta")
                if (combo >= 50) cel.push("lesserEta")
                if (combo >= 100) cel.push("lesserTheta")
                if (combo >= 150) cel.push("lesserIota")
                if (combo >= 200) cel.push("lesserKappa")
                if (combo < 0) cel = ["lesserEnas", "lesserPente", "lesserDeka", "lesserHekaton", "lesserKhilioi", "lesserMyrioi", "lesserDyo", "lesserTria"]
                if (combo <= -25) cel.push("lesserTessera")
                if (combo <= -50) cel.push("lesserExi")
                if (combo <= -100) cel.push("lesserEpta")
                if (combo <= -150) cel.push("lesserOkto")
                if (combo <= -200) cel.push("lesserEnnea")
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}


BHC.squid = {
    name: "Squid",
    symbol: "🦑",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(8888),
    damage: new Decimal(8),
    attributes: {
        "anima": new Decimal(0.5), // Resistance DMG Mult
        "negative": new Decimal(0.5), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "Slap",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            name: "Slap",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(9),
        },
        2: {
            name: "Slap",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        3: {
            name: "Slap",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(11),
        },
        4: {
            name: "Slap",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(12),
        },
        5: {
            name: "Slap",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(13),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(888)
        gain.dimUmbrite = new Decimal(88)
        return gain
    },
}

BHC.lesserAlpha = {
    name: "Celestialite Lesser Alpha",
    symbol: "⇓α",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(70),
    damage: new Decimal(6),
    actions: {
        0: {
            name: "Chop",
            instant: true,
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
    symbol: "⇓β",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(45),
    damage: new Decimal(6),
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
    symbol: "⇓γ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(90),
    damage: new Decimal(8),
    actions: {
        0: {
            name: "Stab",
            instant: true,
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
    symbol: "⇓δ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(110),
    damage: new Decimal(1.5),
    actions: {
        0: {
            name: "Pummel",
            instant: true,
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
    symbol: "⇓ε",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(175),
    damage: new Decimal(10),
    actions: {
        0: {
            name: "Bludgeon",
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
    symbol: "⇓ζ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(50),
    damage: new Decimal(15),
    actions: {
        0: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.gloomingUmbrite = Decimal.add(12, getRandomInt(7))
        } else if (random > 0.5 && random < 0.9) {
            gain.dimUmbrite = Decimal.add(5, getRandomInt(3))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.lesserEta = {
    name: "Celestialite Lesser Eta",
    symbol: "⇓η",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(200),
    damage: new Decimal(4),
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
        if (random < 0.4) {
            gain.gloomingUmbrite = Decimal.add(15, getRandomInt(10))
        } else if (random > 0.4 && random < 0.85) {
            gain.dimUmbrite = Decimal.add(5, getRandomInt(4))
        } else {
            gain.darkEssence = Decimal.add(1, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserTheta = {
    name: "Celestialite Lesser Theta",
    symbol: "⇓θ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(150),
    damage: new Decimal(2),
    actions: {
        0: {
            name: "Triple Shot",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(2),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.4) {
            gain.gloomingUmbrite = Decimal.add(18, getRandomInt(12))
        } else if (random > 0.4 && random < 0.8) {
            gain.dimUmbrite = Decimal.add(6, getRandomInt(4))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserIota = {
    name: "Celestialite Lesser Iota",
    symbol: "⇓ι",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(400),
    damage: new Decimal(8),
    actions: {
        0: {
            name: "Aerial Missile",
            instant: true,
            type: "damage",
            target: "random",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.4) {
            gain.gloomingUmbrite = Decimal.add(24, getRandomInt(16))
        } else if (random > 0.4 && random < 0.8) {
            gain.dimUmbrite = Decimal.add(10, getRandomInt(5))
        } else {
            gain.darkEssence = Decimal.add(2, getRandomInt(3))
        }
        return gain
    },
}

BHC.lesserKappa = {
    name: "Celestialite Lesser Kappa",
    symbol: "⇓κ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(500),
    damage: new Decimal(10),
    actions: {
        0: {
            name: "Earthquake",
            instant: true,
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
            gain.gloomingUmbrite = Decimal.add(35, getRandomInt(15))
        } else if (random > 0.4 && random < 0.8) {
            gain.dimUmbrite = Decimal.add(15, getRandomInt(8))
        } else {
            gain.darkEssence = Decimal.add(3, getRandomInt(3))
        }
        return gain
    },
}

// MINIBOSSES
BHC.lesserEnas = {
    name: "Celestialite Lesser Enas",
    symbol: "⇓Ι",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(300),
    damage: new Decimal(15),
    negMult: new Decimal(2.6),
    actions: {
        0: {
            name: "Chop",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        1: {
            name: "Slash",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(0.5),
            cooldown: new Decimal(23),
        },
    },
    reward() {
        let gain = {}
        if (player.bh.combo.gte(0)) {
            gain.gloomingUmbrite = new Decimal(30)
            gain.dimUmbrite = new Decimal(10)
            gain.darkEssence = new Decimal(3)
        } else {
            gain.gloomingUmbrite = new Decimal(80)
            gain.dimUmbrite = new Decimal(25)
            if (Math.random() < 0.3) gain.murkyUmbrite = new Decimal(1)
            if (Math.random() < 0.1) gain.darkEther = new Decimal(1)
        }
        return gain
    },
}

BHC.lesserPente = {
    name: "Celestialite Lesser Pente",
    symbol: "⇓Π",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(500),
    damage: new Decimal(20),
    negMult: new Decimal(1.8),
    actions: {
        0: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            name: "Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(25),
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        if (player.bh.combo.gte(0)) {
            gain.gloomingUmbrite = new Decimal(60)
            gain.dimUmbrite = new Decimal(20)
            gain.darkEssence = new Decimal(6)
        } else {
            gain.gloomingUmbrite = new Decimal(110)
            gain.dimUmbrite = new Decimal(35)
            if (Math.random() < 0.4) gain.murkyUmbrite = new Decimal(1)
            if (Math.random() < 0.125) gain.darkEther = new Decimal(1)
        }
        return gain
    },
}

BHC.lesserDeka = {
    name: "Celestialite Lesser Deka",
    symbol: "⇓Δ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(750),
    damage: new Decimal(15),
    negMult: new Decimal(1.4),
    actions: {
        0: {
            name: "Stab",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            name: "Lunge",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1.2),
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        if (player.bh.combo.gte(0)) {
            gain.gloomingUmbrite = new Decimal(100)
            gain.dimUmbrite = new Decimal(35)
            gain.darkEssence = new Decimal(10)
        } else {
            gain.gloomingUmbrite = new Decimal(140)
            gain.dimUmbrite = new Decimal(50)
            if (Math.random() < 0.5) gain.murkyUmbrite = new Decimal(1)
            if (Math.random() < 0.15) gain.darkEther = new Decimal(1)
        }
        return gain
    },
}

BHC.lesserHekaton = {
    name: "Celestialite Lesser Hekaton",
    symbol: "⇓Η",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1000),
    damage: new Decimal(30),
    negMult: new Decimal(1.2),
    actions: {
        0: {
            name: "Blast",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(20),
        },
        1: {
            name: "Damage Enchantment",
            instant: true,
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
        if (player.bh.combo.gte(0)) {
            gain.gloomingUmbrite = new Decimal(150)
            gain.dimUmbrite = new Decimal(50)
            gain.darkEssence = new Decimal(15)
        } else {
            gain.gloomingUmbrite = new Decimal(180)
            gain.dimUmbrite = new Decimal(60)
            if (Math.random() < 0.3) gain.murkyUmbrite = new Decimal(2)
            if (Math.random() < 0.175) gain.darkEther = new Decimal(1)
        }
        return gain
    },
}

BHC.lesserKhilioi = {
    name: "Celestialite Lesser Khilioi",
    symbol: "⇓Χ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1250),
    damage: new Decimal(25),
    negMult: new Decimal(1.1),
    actions: {
        0: {
            name: "Quick Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(0.5),
            cooldown: new Decimal(4),
        },
        1: {
            name: "Basic Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        2: {
            name: "Focus Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(2),
            cooldown: new Decimal(24),
        },
    },
    reward() {
        let gain = {}
        if (player.bh.combo.gte(0)) {
            gain.gloomingUmbrite = new Decimal(250)
            gain.dimUmbrite = new Decimal(80)
            gain.darkEssence = new Decimal(30)
        } else {
            gain.gloomingUmbrite = new Decimal(275)
            gain.dimUmbrite = new Decimal(90)
            if (Math.random() < 0.4) gain.murkyUmbrite = new Decimal(2)
            if (Math.random() < 0.2) gain.darkEther = new Decimal(1)
        }
        return gain
    },
}

BHC.lesserMyrioi = {
    name: "Celestialite Lesser Myrioi",
    symbol: "⇓Μ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1500),
    damage: new Decimal(20),
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
        1: {
            name: "First Aid",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(20),
        },
        2: {
            name: "Rage",
            instant: true,
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
        if (player.bh.combo.gte(0)) {
            gain.gloomingUmbrite = new Decimal(500)
            gain.dimUmbrite = new Decimal(175)
            gain.darkEssence = new Decimal(60)
        } else {
            gain.gloomingUmbrite = new Decimal(500)
            gain.dimUmbrite = new Decimal(175)
            if (Math.random() < 0.5) gain.murkyUmbrite = new Decimal(2)
            if (Math.random() < 0.25) gain.darkEther = new Decimal(1)
        }
        return gain
    },
}

BHC.lesserDyo = {
    name: "Celestialite Lesser Dyo",
    symbol: "⇓δ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1200),
    damage: new Decimal(25),
    actions: {
        0: {
            name: "Stab",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            name: "Punt",
            instant: true,
            type: "damage",
            target: "randomPlayerHeal",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(300)
        gain.dimUmbrite = new Decimal(100)
        if (Math.random() < 0.3) gain.murkyUmbrite = new Decimal(2)
        if (Math.random() < 0.2) gain.darkEther = new Decimal(1)
        return gain
    },
}

BHC.lesserTria = {
    name: "Celestialite Lesser Tria",
    symbol: "⇓τ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1250),
    damage: new Decimal(20),
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
        1: {
            name: "Decapitate",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(3),
            stun: ["soft", new Decimal(5), 1],
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(350)
        gain.dimUmbrite = new Decimal(125)
        if (Math.random() < 0.35) gain.murkyUmbrite = new Decimal(2)
        if (Math.random() < 0.215) gain.darkEther = new Decimal(1)
        return gain
    },
}

BHC.lesserTessera = {
    name: "Celestialite Lesser Tessera",
    symbol: "⇓Τ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1300),
    damage: new Decimal(30),
    actions: {
        0: {
            name: "Drain",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-12)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Motivation",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "damageDiminish": new Decimal(0.05), // Diminishing Multiplicative Effect
            },
            cooldown: new Decimal(3),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(400)
        gain.dimUmbrite = new Decimal(150)
        if (Math.random() < 0.4) gain.murkyUmbrite = new Decimal(2)
        if (Math.random() < 0.23) gain.darkEther = new Decimal(1)
        return gain
    },
}

BHC.lesserExi = {
    name: "Celestialite Lesser Exi",
    symbol: "⇓έ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1350),
    damage: new Decimal(35),
    actions: {
        0: {
            name: "Devour",
            passive: true,
            constantType: "effect",
            constantTarget: "randomPlayerHeal",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-12)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        2: {
            name: "Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(100),
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(450)
        gain.dimUmbrite = new Decimal(160)
        if (Math.random() < 0.45) gain.murkyUmbrite = new Decimal(2)
        if (Math.random() < 0.245) gain.darkEther = new Decimal(1)
        return gain
    },
}

BHC.lesserEpta = {
    name: "Celestialite Lesser Epta",
    symbol: "⇓ε",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1400),
    damage: new Decimal(40),
    actions: {
        0: {
            name: "Slap",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            name: "Quick Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
        2: {
            name: "Battle Cry",
            active: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "damageMult": new Decimal(1.5), // Multiplicative Effect
            },
            cooldown: new Decimal(25),
            duration: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(500)
        gain.dimUmbrite = new Decimal(175)
        if (Math.random() < 0.5) gain.murkyUmbrite = new Decimal(2)
        if (Math.random() < 0.26) gain.darkEther = new Decimal(1)
        return gain
    },
}

BHC.lesserOkto = {
    name: "Celestialite Lesser Okto",
    symbol: "⇓ο",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1450),
    damage: new Decimal(45),
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
            name: "Charge Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(3),
            stun: ["soft", new Decimal(3), 2],
            cooldown: new Decimal(12),
        },
        2: {
            name: "Frantic Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1),
            cooldown: new Decimal(3),
            conditional(index, slot) {
                return player.bh.celestialite.health.lte(player.bh.celestialite.maxHealth.div(5))
            },
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(600)
        gain.dimUmbrite = new Decimal(200)
        if (Math.random() < 0.55) gain.murkyUmbrite = new Decimal(2)
        if (Math.random() < 0.275) gain.darkEther = new Decimal(1)
        return gain
    },
}

BHC.lesserEnnea = {
    name: "Celestialite Lesser Ennea",
    symbol: "⇓Ε",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1500),
    damage: new Decimal(50),
    actions: {
        0: {
            name: "Drain",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-15)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Punt",
            instant: true,
            type: "damage",
            target: "randomPlayerHeal",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        2: {
            name: "Decapitate",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(3),
            stun: ["soft", new Decimal(5), 2],
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(750)
        gain.dimUmbrite = new Decimal(250)
        if (Math.random() < 0.3) gain.murkyUmbrite = new Decimal(4)
        if (Math.random() < 0.3) gain.darkEther = new Decimal(1)
        return gain
    },
}

// Negative Minibosses (Chinese Numbers)
BHC.lesserYi = {
    name: "Celestialite Lesser Yi",
    symbol: "⇓一",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
        fontSize: "40px",
    },
    health: new Decimal(5000),
    damage: new Decimal(30),
    actions: {
        0: {
            name: "Drain",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-12)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Motivation",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "damageDiminish": new Decimal(0.05), // Diminishing Multiplicative Effect
            },
            cooldown: new Decimal(3),
        },
        2: {
            name: "Slap",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        3: {
            name: "Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(100),
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(2000)
        gain.dimUmbrite = new Decimal(750)
        gain.murkyUmbrite = new Decimal(10)
        gain.darkEther = new Decimal(3)
        return gain
    },
}

BHC.lesserEr = {
    name: "Celestialite Lesser Er",
    symbol: "⇓二",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
        fontSize: "40px",
    },
    health: new Decimal(6000),
    damage: new Decimal(35),
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
            name: "Charge Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(3),
            stun: ["soft", new Decimal(3), 2],
            cooldown: new Decimal(12),
        },
        2: {
            name: "Block",
            instant: true,
            type: "shield",
            target: "celestialite",
            value: new Decimal(1),

            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "defenseAdd": new Decimal(20), // Multiplicative Effect
            },
            cooldown: new Decimal(20),
            duration: new Decimal(5),
        },
        3: {
            name: "Emergency Medkit",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(100),
            cooldown: new Decimal(30),
            conditional(index, slot) {
                return player.bh.celestialite.health.lte(player.bh.celestialite.maxHealth.div(5))
            },
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(3000)
        gain.dimUmbrite = new Decimal(1125)
        gain.murkyUmbrite = new Decimal(15)
        gain.darkEther = new Decimal(4)
        return gain
    },
}

BHC.lesserSan = {
    name: "Celestialite Lesser San",
    symbol: "⇓三",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
        fontSize: "40px",
    },
    health: new Decimal(7000),
    damage: new Decimal(40),
    actions: {
        0: {
            name: "Earth Tremor",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(0.2),
            cooldown: new Decimal(2),
        },
        1: {
            name: "Earthquake",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        2: {
            name: "Earth Upheaval",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(3),
            cooldown: new Decimal(25),
        },
        3: {
            name: "Earth Spasm",
            instant: true,
            type: "reset",
            target: "celestialite",
            cooldown: new Decimal(45),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(4000)
        gain.dimUmbrite = new Decimal(1500)
        gain.murkyUmbrite = new Decimal(20)
        gain.darkEther = new Decimal(5)
        return gain
    },
}

BHC.lesserSi = {
    name: "Celestialite Lesser Si",
    symbol: "⇓四",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
        fontSize: "40px",
    },
    health: new Decimal(8000),
    damage: new Decimal(45),
    actions: {
        0: {
            name: "Slash",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(0.5),
            cooldown: new Decimal(5),
        },
        1: {
            name: "Punt",
            instant: true,
            type: "damage",
            target: "randomPlayerHeal",
            method: "physical",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(2)], // Chance / Stun-Type / Stun-Time
            },
            value: new Decimal(1),
            cooldown: new Decimal(9),
        },
        2: {
            name: "Sword Dance",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "multi-hit": [8, 100],
            },
            value: new Decimal(0.25),
            cooldown: new Decimal(16),
        },
        3: {
            name: "Last Stand",
            passive: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "damageMult": new Decimal(2),
            },
            conditional(index, slot) {
                return player.bh.celestialite.health.lte(player.bh.celestialite.maxHealth.div(5))
            },
            cooldown: new Decimal(Infinity),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(5000)
        gain.dimUmbrite = new Decimal(1875)
        gain.murkyUmbrite = new Decimal(25)
        gain.darkEther = new Decimal(6)
        return gain
    },
}

BHC.lesserWu = {
    name: "Celestialite Lesser Wu",
    symbol: "⇓五",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
        fontSize: "40px",
    },
    health: new Decimal(9000),
    damage: new Decimal(50),
    actions: {
        0: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(0.3),
            properties: {
                "multi-hit"() {
                    if (!player.bh.celestialite.actions[0].variables.bullets) player.bh.celestialite.actions[0].variables.bullets = 1
                    return [player.bh.celestialite.actions[0].variables.bullets, 200]
                }
            },
            cooldown: new Decimal(8),
        },
        1: {
            name: "Missile Increase",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                if (!player.bh.celestialite.actions[0].variables.bullets) player.bh.celestialite.actions[0].variables.bullets = 1
                player.bh.celestialite.actions[0].variables.bullets += 1
                bhLog("<span style='color: #8b0e7a'>" + run(BHC[player.bh.celestialite.id].name, BHC[player.bh.celestialite.id]) + " increases its missile count.")
            },
            cooldown: new Decimal(20),
        },
        2: {
            name: "Damage Enchantment",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "damageMult": new Decimal(1.1), // Multiplicative Effect
            },
            cooldown: new Decimal(30),
        },
        3: {
            name: "Bullet Time",
            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "agilityAdd": new Decimal(20), // Multiplicative Effect
            },
            cooldown: new Decimal(45),
            duration: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(6000)
        gain.dimUmbrite = new Decimal(2250)
        gain.murkyUmbrite = new Decimal(30)
        gain.darkEther = new Decimal(7)
        return gain
    },
}

BHC.lesserLiu = {
    name: "Celestialite Lesser Liu",
    symbol: "⇓六",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
        fontSize: "40px",
    },
    health: new Decimal(10000),
    damage: new Decimal(55),
    actions: {
        0: {
            name: "Chop",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            name: "Slash",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(0.5),
            cooldown: new Decimal(18),
        },
        2: {
            name: "Decapitate",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(3),
            stun: ["soft", new Decimal(5), 2],
            cooldown: new Decimal(45),
        },
        3: {
            name: "Annihilate",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(10),
            stun: ["soft", new Decimal(10), 2],
            cooldown: new Decimal(100),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = new Decimal(7000)
        gain.dimUmbrite = new Decimal(2625)
        gain.murkyUmbrite = new Decimal(35)
        gain.darkEther = new Decimal(8)
        return gain
    },
}