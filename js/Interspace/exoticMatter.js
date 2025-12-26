addLayer("exm", {
    name: "Exotic Matter",
    symbol: "EX",
    universe: "UD",
    row: 1,
    position: 2,
    startData() { return {
        unlocked: true,

        exoticMatter: new Decimal(0),
        exoticMatterGain: new Decimal(0),
        exoticMatterEffect: new Decimal(0),
        exoticMatterFactor: new Decimal(0),
        exoticMatterFactorGain: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#003f00",
            background: "linear-gradient(135deg, #10B844 0%, #ff7fbf 100%)",
            "background-origin": "border-box",
            "border-color": "#003f00",
        };
    },
    tooltip: "Exotic Matter",
    color: "#10B844",
    update(delta) {
        player.exm.exoticMatterEffect = player.exm.exoticMatter.add(1).log(10).pow(2/3).div(100).add(1);

        player.exm.exoticMatterFactorGain = player.in.infinityPoints.add(1).log(10).div(1000).pow(2)
        player.exm.exoticMatterFactorGain = player.exm.exoticMatterFactorGain.div(player.rif.tearDivisor)
        if (hasUpgrade("rif", 14)) player.exm.exoticMatterFactorGain = player.exm.exoticMatterFactorGain.mul(upgradeEffect("rif", 14));

        player.exm.exoticMatterGain = player.exm.exoticMatterFactor;
        player.exm.exoticMatterGain = player.exm.exoticMatterGain.mul(buyableEffect("exm", 1));
        player.exm.exoticMatterGain = player.exm.exoticMatterGain.mul(buyableEffect("cep", 3));
        if (hasUpgrade("rif", 22)) player.exm.exoticMatterGain = player.exm.exoticMatterGain.mul(upgradeEffect("rif", 22));

        if (player.cer.transfiguratorLayersEnabled[1]) player.exm.exoticMatter = player.exm.exoticMatter.add(player.exm.exoticMatterGain.mul(delta)); else player.exm.exoticMatterGain = new Decimal(0);
    },
    branches: [],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {
        1: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(300) },
            currency() { return player.exm.exoticMatter},
            effect(x) {
                let base = new Decimal(2)
                base = base.add(buyableEffect(this.layer, 2))
                return base.pow(getBuyableAmount(this.layer, this.id).pow(0.7))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost())},
            pay(amt) { player.exm.exoticMatter = this.currency().sub(amt) },
            title() {
                return "α-Axis"
            },
            display() {
                return "which are boosting exotic matter gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Exotic Matter"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#10B844", backgroundImage: "linear-gradient(135deg, #10B844 0%, #ff7fbf 100%"}
        },
        2: {
            costBase() { return new Decimal(5e3) },
            costGrowth() { return new Decimal(6) },
            purchaseLimit() { return new Decimal(300) },
            currency() { return player.exm.exoticMatter},
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost())},
            pay(amt) { player.exm.exoticMatter = this.currency().sub(amt) },
            title() {
                return "β-Axis"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to the base of α-Axis.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Exotic Matter"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#10B844", backgroundImage: "linear-gradient(135deg, #10B844 0%, #ff7fbf 100%"}
        },
        3: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(300) },
            currency() { return player.exm.exoticMatter},
            effect(x) { return this.effectBase().pow(getBuyableAmount(this.layer, this.id).pow(0.85)) },
            effectBase(x) { return player.exm.exoticMatter.add(1).log(10).div(5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost())},
            pay(amt) { player.exm.exoticMatter = this.currency().sub(amt) },
            title() {
                return "γ-Axis"
            },
            display() {
                return "which are boosting cere point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (affected by exotic matter)\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Exotic Matter"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#10B844", backgroundImage: "linear-gradient(135deg, #10B844 0%, #ff7fbf 100%"}
        },
        11: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(1e3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.exm.exoticMatter},
            effect(x) { return new Decimal(1.5).pow(getBuyableAmount(this.layer, this.id).pow(0.85)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost())},
            pay(amt) { player.exm.exoticMatter = this.currency().sub(amt) },
            title() {
                return "Dimensional Tear"
            },
            display() {
                return "which are multiplying abstract factor gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Exotic Matter"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#ff7fbf"}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return player.cer.cereUnlocked },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "Reset on reboot" }, {color: "#ffdfef", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "8px"],
                    ["row", [["ex-buyable", 1],["ex-buyable", 2],["ex-buyable", 3]]],
                    ["blank", "25px"],
                    ["raw-html", () => { return "Kept on reboot" }, {color: "#ffdfef", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "8px"],
                    ["row", [["ex-buyable", 11]]],
                ]
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "The product of your abstract values is <h3>" + format(player.cer.abstractProduct) + "</h3>." }, {color: "#ff7fbf", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + format(player.exm.exoticMatter) + "</h3> exotic matter." }, {color: "white", fontSize: "28px", fontFamily: "monospace"}],
            ["raw-html", () => { return player.exm.exoticMatterGain.gt(0) ? "(+" + format(player.exm.exoticMatterGain) + "/s)" : ""}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => { return "Boosts infinity points by ^" + format(player.exm.exoticMatterEffect)}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.cer.transfiguratorLayersEnabled[1] ? "" : "LAYER IS INACTIVE"}, {color: "#f00", fontSize: "36px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],layerShown() { return player.startedGame == true && player.cer.transfiguratorPowerBest.gte(2) }
})