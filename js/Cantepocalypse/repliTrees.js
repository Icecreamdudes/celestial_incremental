addLayer("rt", {
    name: "Repli-Trees", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RT", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        repliTrees: new Decimal(0),
        repliTreesEffect: new Decimal(1),
        repliTreeReq: new Decimal(10),
        repliTreesToGet: new Decimal(1),

        repliTreeSoftcapEffect: new Decimal(1),
        repliTreeSoftcapStart: new Decimal(10),

        repliLeaves: new Decimal(1),
        repliLeavesMult: new Decimal(1),
        repliLeavesTimer: new Decimal(0),
        repliLeavesTimerReq: new Decimal(6),
    }
    },
    automate() {
        if (hasMilestone("gs", 16))
        {
            buyBuyable("rt", 11)
            buyBuyable("rt", 12)
            buyBuyable("rt", 13)
            buyBuyable("rt", 14)
            buyBuyable("rt", 15)
            buyBuyable("rt", 16)
            buyBuyable("rt", 17)
            buyBuyable("rt", 18)
        }
    },
    nodeStyle() {
    },
    tooltip: "Repli-Trees",
    branches: ["an"],
    color: "#1cffac",
    update(delta) {
        let onepersec = new Decimal(1)

        // START OF REPLI-LEAVES MODIFIERS
        let preLeavesMult = buyableEffect("rt", 11)
        preLeavesMult = preLeavesMult.mul(player.rg.repliGrassEffect2)
        preLeavesMult = preLeavesMult.mul(levelableEffect("pet", 402)[2])
        if (hasUpgrade("cs", 402)) preLeavesMult = preLeavesMult.mul(100)

        // REPLI-TREE SOFTCAP START (NEEDED FOR NERFS)
        player.rt.repliTreeSoftcapStart = new Decimal(10)
        player.rt.repliTreeSoftcapStart = player.rt.repliTreeSoftcapStart.mul(buyableEffect("rt", 18))
        player.rt.repliTreeSoftcapStart = player.rt.repliTreeSoftcapStart.mul(buyableEffect("rg", 18))
        player.rt.repliTreeSoftcapStart = player.rt.repliTreeSoftcapStart.mul(player.oi.oilEffect)
        player.rt.repliTreeSoftcapStart = player.rt.repliTreeSoftcapStart.mul(buyableEffect("fu", 47))

        // REPLI-LEAVES NERFS
        if (inChallenge("fu", 11)) preLeavesMult = preLeavesMult.pow(0.2)
        player.rt.repliTreeSoftcapEffect = player.rt.repliTrees.sub(player.rt.repliTreeSoftcapStart).pow(1.25).div(10).add(1)
        if (player.rt.repliTrees.gte(player.rt.repliTreeSoftcapStart)) {
            preLeavesMult = preLeavesMult.div(player.rt.repliTreeSoftcapEffect)
        }

        // CONVERT TO PROPER MULTIPLIER
        player.rt.repliLeavesMult = preLeavesMult.add(1)

        // REPLI-LEAVES PER SECOND
        player.rt.repliLeavesTimer = player.rt.repliLeavesTimer.add(onepersec.mul(delta))

        // REPLI-TREE EFFECT
        player.rt.repliTreesEffect = player.rt.repliTrees.pow(0.7).add(1)

        // REPLI-LEAVES REQUIREMENT
        player.rt.repliLeavesTimerReq = new Decimal(6)
        if (hasUpgrade("an", 21)) player.rt.repliLeavesTimerReq = player.rt.repliLeavesTimerReq.sub(1.5)
        player.rt.repliLeavesTimerReq = player.rt.repliLeavesTimerReq.div(buyableEffect("rt", 12))

        // REPLI-LEAVES TIMER CODE
        if (player.rt.repliLeavesTimer.gte(player.rt.repliLeavesTimerReq)) {
            player.rt.repliLeaves = player.rt.repliLeaves.mul(player.rt.repliLeavesMult)
            player.rt.repliLeavesTimer = new Decimal(0)
        }

        //----------------------------------------

        // START OF REPLI-TREE MODIFIERS
        player.rt.repliTreesToGet = new Decimal(1)
        player.rt.repliTreesToGet = player.rt.repliTreesToGet.mul(buyableEffect("rt", 14))
        player.rt.repliTreesToGet = player.rt.repliTreesToGet.mul(buyableEffect("gs", 17))
        player.rt.repliTreesToGet = player.rt.repliTreesToGet.mul(player.oi.oilEffect)
        player.rt.repliTreesToGet = player.rt.repliTreesToGet.mul(player.oi.linkingPowerEffect[3])

        // REPLI-TREE NERFS
        if (inChallenge("fu", 11)) player.rt.repliTreesToGet = player.rt.repliTreesToGet.pow(0.2)

        // REPLI-TREE REQUIREMENT
        player.rt.repliTreeReq = player.rt.repliTrees.mul(0.5).add(1).pow(1.2).mul(10)
        player.rt.repliTreeReq = player.rt.repliTreeReq.div(buyableEffect("rt", 13))

        // REPLI-TREE GAIN CODE
        if (player.rt.repliLeaves.gte(player.rt.repliTreeReq)) {
            player.rt.repliTrees = player.rt.repliTrees.add(player.rt.repliTreesToGet)
            player.rt.repliLeaves = new Decimal(1)
        }
    },
    clickables: {
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
        repliTreeBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                if (player.rt.repliTreeReq.gte(1e9)) return player.rt.repliLeaves.add(1).log(10).div(player.rt.repliTreeReq.add(1).log(10))
                return player.rt.repliLeaves.div(player.rt.repliTreeReq)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#7734eb"},
            borderStyle: {borderBottom: "0px", borderRadius: "10px 10px 0px 0px"},
            display() {
                return "<h5>" + format(player.rt.repliLeaves) + "/" + format(player.rt.repliTreeReq) + "<h5> Repli-Leaves to gain a Repli-Tree.";
            },
        },
        repliLeafBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.rt.repliLeavesTimer.div(player.rt.repliLeavesTimerReq)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#7734eb"},
            borderStyle: {borderRadius: "0px 0px 10px 10px"},
            display() {
                return "Time: " + formatTime(player.rt.repliLeavesTimer) + "/" + formatTime(player.rt.repliLeavesTimerReq);
            },
        },
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.an.anonymity},
            pay(amt) { player.an.anonymity = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.3).mul(0.2) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Leaf Mult"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to the repli-leaf multiplier.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anonymity"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        12: {
            costBase() { return new Decimal(20000) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.an.anonymity},
            pay(amt) { player.an.anonymity = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Leaf Cooldown"
            },
            display() {
                return "which are dividing the repli-leaf cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anonymity"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        13: {
            costBase() { return new Decimal(40000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.an.anonymity},
            pay(amt) { player.an.anonymity = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.5).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Tree Req"
            },
            display() {
                return "which are dividing the repli-tree req by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anonymity"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        14: {
            costBase() { return new Decimal(70000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.an.anonymity},
            pay(amt) { player.an.anonymity = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Trees"
            },
            display() {
                return "which are boosting repli-tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anonymity"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        15: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.rt.repliTrees},
            pay(amt) { player.rt.repliTrees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Point Booster"
            },
            display() {
                return "which are boosting replicanti point mult by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        16: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.rt.repliTrees},
            pay(amt) { player.rt.repliTrees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).pow(0.6).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Perk Point Booster"
            },
            display() {
                return "which are boosting perk points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        17: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.rt.repliTrees},
            pay(amt) { player.rt.repliTrees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(100).pow(2.5).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Softcap Extender"
            },
            display() {
                return "which are extending the second replicanti point softcap start by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        18: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.rt.repliTrees},
            pay(amt) { player.rt.repliTrees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).pow(0.75).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Softcap Extender"
            },
            display() {
                return "which are extending repli-tree softcap start by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You have " + formatWhole(player.rt.repliTrees) + " repli-trees"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.rt.repliTreesToGet, 1) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "Boosts anonymity gain by x" + format(player.rt.repliTreesEffect)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Repli-Leaves mult: x" + format(player.rt.repliLeavesMult, 4)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.rt.repliTrees.gte(player.rt.repliTreeSoftcapStart) ? "After " + formatWhole(player.rt.repliTreeSoftcapStart) + " repli-trees, repli-leaf mult is divided by " + format(player.rt.repliTreeSoftcapEffect) : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["bar", "repliTreeBar"]]],
                    ["row", [["bar", "repliLeafBar"]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                        ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => { return "You have <h3>" + format(player.an.anonymity) + "</h3> anonymity." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => { return "(+" + format(player.an.anonymityToGet) + ")" }, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 15) }
})