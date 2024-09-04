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
    },
    nodeStyle() {
    },
    tooltip: "Repli-Trees",
    branches: ["ar"],
    color: "#1cffac",
    update(delta) {
        let onepersec = new Decimal(1)

        multAdd = new Decimal(0)
        multAdd = buyableEffect("rt", 11)
        multAdd = multAdd.mul(player.rg.repliGrassEffect2)

        player.rt.repliLeavesTimerReq = new Decimal(6)
        if (hasUpgrade("an", 21)) player.rt.repliLeavesTimerReq = player.rt.repliLeavesTimerReq.sub(1.5)
        player.rt.repliLeavesTimerReq = player.rt.repliLeavesTimerReq.div(buyableEffect("rt", 12))

        player.rt.repliTreesSoftcapStart = new Decimal(10)
        player.rt.repliTreesSoftcapStart = player.rt.repliTreesSoftcapStart.mul(buyableEffect("rt", 18))
        player.rt.repliTreesSoftcapStart = player.rt.repliTreesSoftcapStart.mul(buyableEffect("rg", 18))

        player.rt.repliTreeSoftcapEffect = player.rt.repliTrees.sub(player.rt.repliTreeSoftcapStart).pow(1.25).div(10).add(1)
        if (player.rt.repliTrees.gte(player.rt.repliTreeSoftcapStart))
        {
            multAdd = multAdd.div(player.rt.repliTreeSoftcapEffect)
        }

        player.rt.repliLeavesMult = multAdd.add(1)

        player.rt.repliLeavesTimer = player.rt.repliLeavesTimer.add(onepersec.mul(delta))

        player.rt.repliTreesEffect = player.rt.repliTrees.pow(0.7).add(1)

        player.rt.repliTreeReq = player.rt.repliTrees.mul(0.5).add(1).pow(1.2).mul(10)
        player.rt.repliTreeReq = player.rt.repliTreeReq.div(buyableEffect("rt", 13))

        player.rt.repliTreesToGet = new Decimal(1)
        player.rt.repliTreesToGet = player.rt.repliTreesToGet.mul(buyableEffect("rt", 14))
        player.rt.repliTreesToGet = player.rt.repliTreesToGet.mul(buyableEffect("gs", 17))

        if (player.rt.repliLeavesTimer.gte(player.rt.repliLeavesTimerReq))
        {
            layers.rt.repliLeavesMultiply();
            player.rt.repliLeavesTimer = new Decimal(0)
        }

        if (player.rt.repliLeaves.gte(player.rt.repliTreeReq)) {
            player.rt.repliTrees = player.rt.repliTrees.add(player.rt.repliTreesToGet) 
            player.rt.repliLeaves = new Decimal(1)
        }
    },
    repliLeavesMultiply()
    {
        player.rt.repliLeaves = player.rt.repliLeaves.mul(player.rt.repliLeavesMult)
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cp"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '75px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '75px', }
        },
    },
    bars: {
        repliTreeBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.rt.repliLeaves.div(player.rt.repliTreeReq)
            },
            fillStyle: {
                "background-color": "#7734eb",
            },
            display() {
                return "<h5>" + format(player.rt.repliLeaves) + "/" + format(player.rt.repliTreeReq) + "<h5> Repli-Leaves to gain a Repli-Tree.";
            },
        },
        replileafBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.rt.repliLeavesTimer.div(player.rt.repliLeavesTimerReq)
            },
            fillStyle: {
                "background-color": "#7734eb",
            },
            display() {
                return "Time: " + formatTime(player.rt.repliLeavesTimer) + "/" + formatTime(player.rt.repliLeavesTimerReq);
            },
        }, 
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.3).mul(0.2) },
            unlocked() { return true },
            canAfford() { return player.an.anonymity.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Leaf Mult."
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to the repli-leaf multiplier.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anonymity."
            },
            buy() {
                let base = new Decimal(10000)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.an.anonymity = player.an.anonymity.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.an.anonymity, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.an.anonymity = player.an.anonymity.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(20000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1)},
            unlocked() { return true },
            canAfford() { return player.an.anonymity.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Leaf Cooldown."
            },
            display() {
                return "which are dividing the repli-leaf cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anonymity."
            },
            buy() {
                let base = new Decimal(20000)
                let growth = 3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.an.anonymity = player.an.anonymity.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.an.anonymity, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.an.anonymity = player.an.anonymity.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(40000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.5).add(1)},
            unlocked() { return true },
            canAfford() { return player.an.anonymity.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Tree Req."
            },
            display() {
                return "which are dividing the repli-tree req by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anonymity."
            },
            buy() {
                let base = new Decimal(40000)
                let growth = 1.4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.an.anonymity = player.an.anonymity.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.an.anonymity, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.an.anonymity = player.an.anonymity.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(70000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1)},
            unlocked() { return true },
            canAfford() { return player.an.anonymity.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Trees."
            },
            display() {
                return "which are boosting repli-tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anonymity."
            },
            buy() {
                let base = new Decimal(70000)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.an.anonymity = player.an.anonymity.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.an.anonymity, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.an.anonymity = player.an.anonymity.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(4)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).add(1)},
            unlocked() { return true },
            canAfford() { return player.rt.repliTrees.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicanti Point Booster."
            },
            display() {
                return "which are boosting replicanti point mult by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Trees."
            },
            buy() {
                let base = new Decimal(4)
                let growth = 1.25
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rt.repliTrees = player.rt.repliTrees.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rt.repliTrees, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.rt.repliTrees = player.rt.repliTrees.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(6)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).pow(0.6).add(1)},
            unlocked() { return true },
            canAfford() { return player.rt.repliTrees.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Perk Point Booster."
            },
            display() {
                return "which are boosting perk points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Trees."
            },
            buy() {
                let base = new Decimal(6)
                let growth = 1.4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rt.repliTrees = player.rt.repliTrees.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rt.repliTrees, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.rt.repliTrees = player.rt.repliTrees.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(8)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(100).pow(2.5).add(1)},
            unlocked() { return true },
            canAfford() { return player.rt.repliTrees.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Replicanti Softcap Extender."
            },
            display() {
                return "which are extending the second replicanti point softcap start by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Trees."
            },
            buy() {
                let base = new Decimal(8)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rt.repliTrees = player.rt.repliTrees.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rt.repliTrees, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.rt.repliTrees = player.rt.repliTrees.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).pow(0.75).add(1)},
            unlocked() { return true },
            canAfford() { return player.rt.repliTrees.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Tree Softcap Extender."
            },
            display() {
                return "which are extending repli-tree softcap start by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Trees."
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.rt.repliTrees = player.rt.repliTrees.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.rt.repliTrees, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.rt.repliTrees = player.rt.repliTrees.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {
   
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>You have " + formatWhole(player.rt.repliTrees) + "<h2> repli-trees, which boost anonymity gain by x" + format(player.rt.repliTreesEffect) + "."}],
                    ["raw-html", function () { return "<h2>You will gain " + format(player.rt.repliTreesToGet, 1) + "<h2> repli-trees." }],
                    ["raw-html", function () { return "<h2>Repli-Leaves mult: x" + format(player.rt.repliLeavesMult, 4) + "<h2>." }],
                    ["raw-html", function () { return player.rt.repliTrees.gte(player.rt.repliTreesSoftcapStart) ? "After " + formatWhole(player.rt.repliTreeSoftcapStart) + " repli-trees, repli-leaf mult is divided by " + format(player.rt.repliTreeSoftcapEffect) + " (Based on repli-trees)" : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["bar", "repliTreeBar"]]],
                    ["row", [["bar", "replileafBar"]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                ]
            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.an.anonymity) + "</h3> anonymity." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 15) }
})