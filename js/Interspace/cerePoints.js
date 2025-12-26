addLayer("cep", {
    name: "Cere Points",
    symbol: "CE",
    universe: "UD",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        cerePoints: new Decimal(0),
        cerePointsGain: new Decimal(0),
        cerePointsEffect: new Decimal(0),
        cerePointsFactor: new Decimal(0),
        cerePointsFactorGain: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#7f003f",
            background: "linear-gradient(135deg, #ccc 0%, #ff7fbf 100%)",
            "background-origin": "border-box",
            "border-color": "#7f003f",
        };
    },
    tooltip: "Cere Points",
    color: "#ccc",
    update(delta) {
        player.cep.cerePointsEffect = player.cep.cerePoints.add(1).log(10).pow(2/3).div(100).add(1);

        player.cep.cerePointsFactorGain = player.points.add(1).log(10).div(300000).pow(10)
        player.cep.cerePointsFactorGain = player.cep.cerePointsFactorGain.div(player.rif.tearDivisor)
        if (hasUpgrade("rif", 14)) player.cep.cerePointsFactorGain = player.cep.cerePointsFactorGain.mul(upgradeEffect("rif", 14));
        player.cep.cerePointsFactorGain = player.cep.cerePointsFactorGain.add(1).pow(buyableEffect("cep", 11)).sub(1)

        player.cep.cerePointsGain = player.cep.cerePointsFactor;
        player.cep.cerePointsGain = player.cep.cerePointsGain.mul(buyableEffect("cep", 1));
        player.cep.cerePointsGain = player.cep.cerePointsGain.mul(buyableEffect("cep", 2));
        player.cep.cerePointsGain = player.cep.cerePointsGain.mul(buyableEffect("exm", 3));
        if (hasUpgrade("rif", 11)) player.cep.cerePointsGain = player.cep.cerePointsGain.mul(upgradeEffect("rif", 11));
        if (hasUpgrade("rif", 12)) player.cep.cerePointsGain = player.cep.cerePointsGain.mul(upgradeEffect("rif", 12));

        if (player.cer.transfiguratorLayersEnabled[0]) player.cep.cerePoints = player.cep.cerePoints.add(player.cep.cerePointsGain.mul(delta)); else player.cep.cerePointsGain = new Decimal(0);
    },
    branches: [],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {
        1: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cep.cerePoints},
            effect(x) { return new Decimal(1.5).pow(getBuyableAmount(this.layer, this.id).pow(0.85)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost())},
            pay(amt) { player.cep.cerePoints = this.currency().sub(amt) },
            title() {
                return "Cere Pointer"
            },
            display() {
                return "which are boosting cere point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Cere Points"
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
            style: { width: '275px', height: '150px', backgroundColor: "#ccc", backgroundImage: "linear-gradient(135deg, #ccc 0%, #ff7fbf 100%"}
        },
        2: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(300) },
            currency() { return player.cep.cerePoints},
            effect(x) { return this.effectBase().pow(getBuyableAmount(this.layer, this.id).pow(0.85)) },
            effectBase(x) { return player.points.add(1).log(10).div(1e5).add(1).pow(0.5) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost())},
            pay(amt) { player.cep.cerePoints = this.currency().sub(amt) },
            title() {
                return "Point Synergy"
            },
            display() {
                return "which are boosting cere point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (affected by celestial points)\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Cere Points"
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
            style: { width: '275px', height: '150px', backgroundColor: "#ccc", backgroundImage: "linear-gradient(135deg, #ccc 0%, #ff7fbf 100%"}
        },
        3: {
            costBase() { return new Decimal(1e20) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(300) },
            currency() { return player.cep.cerePoints},
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id).pow(0.75)) },
            unlocked() { return player.cer.transfiguratorPowerBest.gte(1) && player.cer.transfiguratorLayersEnabled[1] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost())},
            pay(amt) { player.cep.cerePoints = this.currency().sub(amt) },
            title() {
                return "Cere Matterer"
            },
            display() {
                return "which are boosting exotic matter gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Cere Points"
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
            style: { width: '275px', height: '150px', backgroundColor: "#ccc", backgroundImage: "linear-gradient(135deg, #ccc 0%, #ff7fbf 100%"}
        },
        11: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(1e3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cep.cerePoints},
            effect(x) { return new Decimal(1).add(getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.2)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost())},
            pay(amt) { player.cep.cerePoints = this.currency().sub(amt) },
            title() {
                return "Super Synergy"
            },
            display() {
                return "which are raising cere point factor gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Cere Points"
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
            ["raw-html", () => { return "You have <h3>" + format(player.cep.cerePoints) + "</h3> cere points." }, {color: "white", fontSize: "28px", fontFamily: "monospace"}],
            ["raw-html", () => { return player.cep.cerePointsGain.gt(0) ? "(+" + format(player.cep.cerePointsGain) + "/s)" : ""}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => { return "Boosts celestial points by ^" + format(player.cep.cerePointsEffect)}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.cer.transfiguratorLayersEnabled[0] ? "" : "LAYER IS INACTIVE"}, {color: "#f00", fontSize: "36px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && player.cer.transfiguratorPowerBest.gte(1) }
})