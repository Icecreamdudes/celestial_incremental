addLayer("hsa", {
    name: "Hex of Sacrifice",
    symbol: "Sa", // Decides what text appears on the node.
    tooltip: "Sacrifice", // Decides the nodes tooltip
    color: "#fffdd0", // Decides the nodes color.
    nodeStyle: {background: "linear-gradient(180deg, #fffdd0, #fdfff6)", borderColor: "#7F7E68"}, // Decides the nodes style, in CSS format.
    branches: ["hpr"], // Decides the nodes branches.
    startData() { return {
        sacredEnergy: new Decimal(0),
        sacredEnergyGain: new Decimal(0),
        sacredEffect: new Decimal(0),
    }},
    update(delta) {
        player.hsa.sacredEnergyGain = new Decimal(0)
        if (player.hpr.rank[0].gt(0)) player.hsa.sacredEnergyGain = player.hpr.rank[0].log(6).mul(0.5)
        if (player.hpr.rank[1].gt(0)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(player.hpr.rank[1].log(6).add(1).mul(2))
        if (player.hpr.rank[2].gt(0)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(player.hpr.rank[2].log(6).add(1).mul(3))
        if (player.hpr.rank[3].gt(0)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(player.hpr.rank[3].log(6).add(1).mul(4))
        if (player.hpr.rank[4].gt(0)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(player.hpr.rank[4].log(6).add(1).mul(5))
        if (player.hpr.rank[5].gt(0)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(player.hpr.rank[5].log(6).add(1).mul(6))
        if (hasUpgrade("hsa", 12)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(2)
        if (hasUpgrade("hsa", 14)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(upgradeEffect("hsa", 14))
        if (hasUpgrade("hsa", 16)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(upgradeEffect("hsa", 16))
        if (hasUpgrade("hsa", 22)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(upgradeEffect("hsa", 22))
        if (hasUpgrade("hsa", 24)) player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(upgradeEffect("hsa", 24))
        player.hsa.sacredEnergyGain = player.hsa.sacredEnergyGain.mul(buyableEffect("hsa", 1))

        if (hasUpgrade("hsa", 26)) player.hsa.sacredEnergy = player.hsa.sacredEnergy.add(player.hsa.sacredEnergyGain.mul(0.1).mul(delta))

        if (player.hsa.sacredEnergy.lt(46655)) player.hsa.sacredEffect = player.hsa.sacredEnergy.add(1).log(6).mul(0.05)
        if (player.hsa.sacredEnergy.gte(46655) && player.hsa.sacredEnergy.lt(1.7e20)) player.hsa.sacredEffect = player.hsa.sacredEnergy.add(1).log(6).mul(0.01).add(0.24).min(0.6)
        if (player.hsa.sacredEnergy.gte(1.7e20)) player.hsa.sacredEffect = player.hsa.sacredEnergy.add(1).log(6).mul(0.001).add(0.474).min(0.6)
    },
    clickables: {
        1: {
            title: "<h2>Sacrifice your provenances for sacred energy.</h2><br><h3>Req: 1 β-Provenance</h3>",
            canClick() { return player.hpr.rank[1].gte(1)},
            unlocked: true,
            onClick() {
                player.hsa.sacredEnergy = player.hsa.sacredEnergy.add(player.hsa.sacredEnergyGain)

                // RESET CODE
                for (let i = 0; i < 6; i++) {
                    player.hpr.rank[i] = new Decimal(0)
                    player.hpr.rankGain[i] = new Decimal(0)
                    player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style: {width: "400px", minHeight: "100px", color: "rgba(0,0,0,0.6)", border: "2px solid rgba(0,0,0,0.6)", borderRadius: "15px"},
        },
    },
    upgrades: {
        11: {
            title: "Simplicity",
            unlocked: true,
            description: "Double hex point gain after softcap.",
            cost: new Decimal(1),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Clarity",
            unlocked: true,
            description: "Double sacred energy gain.",
            cost: new Decimal(2),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Coherence",
            unlocked: true,
            description: "Sacred energy boosts hex point gain after softcap.",
            cost: new Decimal(8),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            effect() {
                if (hasUpgrade("hsa", 23)) return Decimal.pow(2, player.hsa.sacredEnergy.add(1).log(6))
                return Decimal.pow(1.5, player.hsa.sacredEnergy.add(1).log(6))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Perspicuity",
            unlocked: true,
            description: "Jinx score boosts sacred energy gain.",
            cost: new Decimal(36),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            effect() { return player.hcu.jinxTotal.div(100)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "Directness",
            unlocked: true,
            description: "Divide provenance requirements by /1.3.",
            cost: new Decimal(240),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "Lucidity",
            unlocked: true,
            description: "Refinements boost sacred energy gain.",
            cost: new Decimal(1200),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            effect() { return player.hre.refinement.add(1).pow(0.6)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: "Aware",
            unlocked() {return challengeCompletions("hrm", 14) >= 1},
            description: "Total power above 360,000 boosts hex point gain after softcap.",
            cost: new Decimal(9000),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            effect() {
                if (player.hpw.totalPower.gte(360000)) return player.hpw.totalPower.div(360000).log(6).add(1)
                return new Decimal(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        22: {
            title: "Alert",
            unlocked() {return challengeCompletions("hrm", 14) >= 1},
            description: "Total mights above 25 boosts sacred energy gain.",
            cost: new Decimal(60000),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            effect() {
                if (player.hpw.totalPower.gte(25)) return Decimal.sub(player.hpw.upgTotal, 25).mul(0.2).add(1)
                return new Decimal(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        23: {
            title: "Cognizant",
            unlocked() {return challengeCompletions("hrm", 14) >= 1},
            description: "Improve Coherence's formula.",
            cost: new Decimal(360000),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        24: {
            title: "Attentive",
            unlocked() {return challengeCompletions("hrm", 14) >= 2},
            description: "Total sacred upgrades buff sacred energy gain.",
            cost: new Decimal(2.4e6),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            effect() {
                return new Decimal(0.15).mul(player.hsa.upgrades.length).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        25: {
            title: "Mindful",
            unlocked() {return challengeCompletions("hrm", 14) >= 2},
            description: "Double jinx score.",
            cost: new Decimal(9e6),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        26: {
            title: "Conscious",
            unlocked() {return challengeCompletions("hrm", 14) >= 2},
            description: "Produce 10% sacred energy per second.",
            cost: new Decimal(3e7),
            currencyLocation() { return player.hsa },
            currencyDisplayName: "Sacred Energy",
            currencyInternalName: "sacredEnergy",
            style: {color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {
        1: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.hsa.sacredEnergy},
            pay(amt) { player.hsa.sacredEnergy = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return challengeCompletions("hrm", 14) >= 3},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Comprehensibility</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100)\n\
                    Double sacred energy.\n\
                    Currently: " + formatWhole(tmp[this.layer].buyables[this.id].effect) + "x\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Sacred Energy"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
        2: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.hsa.sacredEnergy},
            pay(amt) { player.hsa.sacredEnergy = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return challengeCompletions("hrm", 14) >= 3},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Intelligence</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Double hex points after softcap.\n\
                    Currently: " + formatWhole(tmp[this.layer].buyables[this.id].effect) + "x\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Sacred Energy"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.6)", borderColor: "rgba(0,0,0,0.6)", borderRadius: "15px", margin: "2px"},
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points."}, {color: "rgba(0,0,0,0.6)", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.h.hexPointGain.eq(0) ? "" : player.h.hexPointGain.gt(0) ? "(+" + format(player.h.hexPointGain) + "/s)" : "<span style='color:red'>(" + format(player.h.hexPointGain) + "/s)</span>"}, {color: "rgba(0,0,0,0.6)", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
            ["raw-html", () => {return (inChallenge("hrm", 14) || player.h.hexPointGain.gte(1e308)) ? "[SOFTCAPPED]" : "" }, {color: "rgba(255,0,0,0.6)", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => {return inChallenge("hrm", 15) ? "Time Remaining: " + formatTime(player.hrm.dreamTimer) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["style-column", [
            ["raw-html", "Hex of Sacrifice", {color: "rgba(0,0,0,0.6)", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", background: "linear-gradient(90deg, #fffdd0, #fdfff6)", border: "3px solid #ccc", borderRadius: "20px"}],
        ["blank", "10px"],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.hsa.sacredEnergy) + "</h3> sacred energy." }, {color: "rgba(0,0,0,0.6)", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.hsa.sacredEnergyGain) + ")" }, () => {
                let look = {color: "rgba(0,0,0,0.6)", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                player.hpr.rank[1].gte(1) ? look.color = "rgba(0,0,0,0.6)" : look.color = "rgba(100,100,100,0.6)"
                return look
            }],
        ]],
        ["row", [
            ["raw-html", () => {return "Adds +" + format(player.hsa.sacredEffect, 3) + " to the hex point softcap exponent." }, {color: "rgba(0,0,0,0.6)", fontSize: "16px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.hsa.sacredEffect.gte(0.6) ? "[HARDCAPPED]" : player.hsa.sacredEffect.gte(0.5) ? "[SOFTCAPPED<sup>2</sup>]" : player.hsa.sacredEffect.gte(0.3) ? "[SOFTCAPPED]" : "" }, {color: "rgba(255,0,0,0.6)", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["clickable", 1],
        ["blank", "10px"],
        ["style-row", [
            ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
            ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ["upgrade", 25], ["upgrade", 26],
            ["buyable", 1], ["buyable", 2],
        ], {maxWidth: "800px"}],
        ["blank", "25px"],
    ],
    layerShown() { return inChallenge("hrm", 14)}, // Decides if this node is shown or not.
});