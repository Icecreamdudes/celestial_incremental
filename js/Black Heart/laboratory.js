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
        highestCombo: new Decimal(0),

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
        if (hasUpgrade("laboratory", 14)) player.laboratory.cooldownMax = player.laboratory.cooldownMax.div(upgradeEffect("laboratory", 14))
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
        1: {
            title: "MD-01",
            unlocked: true,
            description: "Unlocks Vespasians \"Paralytic Bite\" skill.",
            cost: new Decimal(64),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Dust",
            currencyInternalName: "matosDust",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        2: {
            title: "MD-02",
            unlocked: true,
            description: "Unlocks Vespasians \"Overdrive\" skill.",
            cost: new Decimal(1024),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Dust",
            currencyInternalName: "matosDust",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        3: {
            title: "MD-03",
            unlocked: true,
            description: "Increases Vespasians base agility by +10.",
            cost: new Decimal(16384),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Dust",
            currencyInternalName: "matosDust",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        4: {
            title: "MD-04",
            unlocked: true,
            description: "Increase laboratory timer based on matos dust.",
            cost: new Decimal(131072),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Dust",
            currencyInternalName: "matosDust",
            effect() {
                return player.laboratory.matosDust.add(1).log(10).div(10).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        5: {
            title: "MD-05",
            unlocked: true,
            description: "Decuple ID softcap base and raise IDs effects by ^10.",
            cost: new Decimal(256),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Dust",
            currencyInternalName: "matosDust",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        6: {
            title: "MD-06",
            unlocked: true,
            description: "Boost base core scrap gain based on core fragments.",
            cost: new Decimal(4096),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Dust",
            currencyInternalName: "matosDust",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },

        11: {
            title: "MD-11",
            unlocked() {return player.laboratory.highestCombo.gt(5)},
            description: "Unlocks Vespasians \"Impale\" skill.",
            cost: new Decimal(4),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Shards",
            currencyInternalName: "matosShard",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        12: {
            title: "MD-12",
            unlocked() {return player.laboratory.highestCombo.gt(5)},
            description: "Unlocks Vespasians \"Peak Performance\" skill.",
            cost: new Decimal(64),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Shards",
            currencyInternalName: "matosShard",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        13: {
            title: "MD-13",
            unlocked() {return player.laboratory.highestCombo.gt(5)},
            description: "Increases Vespasians base damage by +4.",
            cost: new Decimal(1024),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Shards",
            currencyInternalName: "matosShard",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        14: {
            title: "MD-14",
            unlocked() {return player.laboratory.highestCombo.gt(5)},
            description: "Reduce laboratory cooldown based on matos shards.",
            cost: new Decimal(16384),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Shards",
            currencyInternalName: "matosShard",
            effect() {
                return player.laboratory.matosShard.add(1).log(10).div(10).add(1)
            },
            effectDisplay() { return "/" + formatSimple(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        15: {
            title: "MD-15",
            unlocked() {return player.laboratory.highestCombo.gt(5)},
            description: "Improve stored space energy formula.",
            cost: new Decimal(16),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Shards",
            currencyInternalName: "matosShard",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        16: {
            title: "MD-16",
            unlocked() {return player.laboratory.highestCombo.gt(5)},
            description: "Unlock a 6th starmetal essence generator.",
            cost: new Decimal(256),
            currencyLocation() { return player.laboratory },
            currencyDisplayName: "Matos Dust",
            currencyInternalName: "matosShard",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
    },
    buyables: {
        1: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.laboratory.matosDust},
            pay(amt) { player.laboratory.matosDust = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(1000).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>MD-07</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/25)\n\
                    Reduce combo scaling\n\
                    Currently: -" + formatShortSimple(tmp[this.layer].buyables[this.id].effect.sub(1).mul(100), 2) + "%\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Matos Dust"
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
            costBase() { return new Decimal(32) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.laboratory.matosDust},
            pay(amt) { player.laboratory.matosDust = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(100, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>MD-08</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Boost charge gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Matos Dust"
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

        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.laboratory.matosShard},
            pay(amt) { player.laboratory.matosShard = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked() {return player.laboratory.highestCombo.gt(5)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>MD-17</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/25)\n\
                    Increase chance to double celestialite rewards\n\
                    Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.sub(1).mul(100)) + "%\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Matos Shards"
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
        12: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.laboratory.matosShard},
            pay(amt) { player.laboratory.matosShard = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked() {return player.laboratory.highestCombo.gt(5)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>MD-18</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Raise steel gain\n\
                    Currently: ^" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Matos Shards"
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
            ["theme-scroll-column", [
                ["style-row", [
                    ["raw-html", () => {return "You have " + formatWhole(player.laboratory.matosDust) + " Matos Dust."}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                ], {width: "547px", height: "35px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["blank", "4px"],
                ["row", [["upgrade", 1], ["upgrade", 2], ["upgrade", 3], ["upgrade", 4]]],
                ["row", [["upgrade", 5], ["upgrade", 6], ["buyable", 1], ["buyable", 2]]],
                ["blank", "4px"],
                ["style-row", [
                    ["raw-html", () => {return "You have " + formatWhole(player.laboratory.matosShard) + " Matos Shards."}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                ], () => {return player.laboratory.highestCombo.gt(5) ? {width: "547px", height: "35px", background: "var(--miscButtonHover)", borderTop: "3px solid var(--regBorder)", borderBottom: "3px solid var(--regBorder)"} : {display: "none !important"}}],
                ["blank", "4px"],
                ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                ["row", [["upgrade", 15], ["upgrade", 16], ["buyable", 11], ["buyable", 12]]],
                ["blank", "4px"],
            ], {width: "547px", height: "420px", background: "var(--miscButton)", borderRadius: "0 0 0 27px"}],
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
    timer() {
        let time = new Decimal(120)
        time = time.mul(levelableEffect("pet", 503)[3])
        if (hasUpgrade("laboratory", 4)) time = time.mul(upgradeEffect("laboratory", 4))
        return time
    },
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
        0: {
            name: "Spin",
            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "attributes"() {return {"daze": new Decimal(0.5)}},
            },
            duration: new Decimal(5),
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

// Passive that constantly stuns the celestialite

// 1d100 (99% chance to miss)

// Increase size of celestialite icon

// Spawn a failed cookie (gives a random amount of matos resources)