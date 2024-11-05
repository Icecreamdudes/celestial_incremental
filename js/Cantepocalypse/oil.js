addLayer("oi", {
    name: "Oil", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        oil: new Decimal(0),
        oilEffect: new Decimal(1), //boosts trees
        oilToGet: new Decimal(0),
        oilPause: new Decimal(0),

        linkingPower: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        linkingPowerPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        linkingPowerEffect: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        linkerTexts: ["","","","","","",],
        linkerTextEffects: ["","","","","","",],
        linkerChoice: new Decimal(0),

        /*
        0 - Replicanti Points -> Points
        1 - Perk Points -> Factor Power
        2 - Anonymity -> Prestige Points
        3 - Repli-Trees -> Trees
        4 - Repli-Grass -> Grass
        5 - Grass-Skippers -> Grasshoppers
        */

        protoMemories: new Decimal(0),
        protoMemorySeconds: new Decimal(0),
        protoMemorySecondsToGet: new Decimal(0),
        protoMemoriesPerSecond: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Oil",
    branches: ["rt", "rm", "cb", "m"],
    color: "#28242c",
    update(delta) {
        let onepersec = new Decimal(1)

        player.oi.oilToGet = player.an.anonymity.div(1e25).pow(0.2)
        player.oi.oilToGet = player.oi.oilToGet.mul(player.cb.evolvedEffects[8][1])

        player.oi.oilEffect = player.oi.oil.pow(0.65).div(1.5).add(1)

        if (player.oi.oilPause.gt(0)) {
            layers.oi.oilReset();
        }
        player.oi.oilPause = player.oi.oilPause.sub(1)

        player.oi.linkerTexts = [
            "You have " + format(player.oi.linkingPower[0]) + " point linking power (+" + format(player.oi.linkingPowerPerSecond[0]) + "/s)\n(Based on points)",
            "You have " + format(player.oi.linkingPower[1]) + " factor power linking power (+" + format(player.oi.linkingPowerPerSecond[1]) + "/s)\n(Based on factor power)",
            "You have " + format(player.oi.linkingPower[2]) + " prestige point linking power (+" + format(player.oi.linkingPowerPerSecond[2]) + "/s)\n(Based on prestige points)",
            "You have " + format(player.oi.linkingPower[3]) + " trees linking power (+" + format(player.oi.linkingPowerPerSecond[3]) + "/s)\n(Based on trees)",
            "You have " + format(player.oi.linkingPower[4]) + " grass linking power (+" + format(player.oi.linkingPowerPerSecond[4]) + "/s)\n(Based on grass)",
            "You have " + format(player.oi.linkingPower[5]) + " grasshopper linking power (+" + format(player.oi.linkingPowerPerSecond[5]) + "/s)\n(Based on grasshoppers)",
        ]

        player.oi.linkerTextEffects = [
            "which boosts the replicanti point multiplier by x" + format(player.oi.linkingPowerEffect[0]) + ".",
            "which boosts perk points by x" + format(player.oi.linkingPowerEffect[1]) + ".",
            "which boosts anonymity by x" + format(player.oi.linkingPowerEffect[2]) + ".",
            "which boosts repli-trees by x" + format(player.oi.linkingPowerEffect[3]) + ".",
            "which boosts the repli-grass multiplier by x" + format(player.oi.linkingPowerEffect[4]) + ".",
            "which boosts grass-skippers by x" + format(player.oi.linkingPowerEffect[5]) + ".",
        ]

        for (let i = 0; i < player.oi.linkingPower.length; i++)
        {
            player.oi.linkingPower[i] = player.oi.linkingPower[i].add(player.oi.linkingPowerPerSecond[i].mul(delta))
        }
        
        player.oi.linkingPowerPerSecond[0] = player.points.abs().plus(1).log10().pow(0.21).mul(buyableEffect('oi', 11))
        player.oi.linkingPowerPerSecond[1] = player.f.factorPower.abs().plus(1).log10().pow(0.25).mul(buyableEffect('oi', 12))
        player.oi.linkingPowerPerSecond[2] = player.p.prestigePoints.abs().plus(1).log10().pow(0.215).mul(buyableEffect('oi', 13))
        player.oi.linkingPowerPerSecond[3] = player.t.trees.abs().plus(1).log10().pow(0.285).mul(buyableEffect('oi', 14))
        player.oi.linkingPowerPerSecond[4] = player.g.grass.abs().plus(1).log10().pow(0.255).mul(buyableEffect('oi', 15))
        player.oi.linkingPowerPerSecond[5] = player.gh.grasshoppers.abs().plus(1).log10().pow(0.27).mul(buyableEffect('oi', 16))
        
        player.oi.linkingPowerEffect[0] = player.oi.linkingPower[0].pow(0.4).add(1)
        player.oi.linkingPowerEffect[1] = player.oi.linkingPower[1].pow(0.175).add(1)
        player.oi.linkingPowerEffect[2] = player.oi.linkingPower[2].pow(0.3).add(1)
        player.oi.linkingPowerEffect[3] = player.oi.linkingPower[3].pow(0.225).add(1)
        player.oi.linkingPowerEffect[4] = player.oi.linkingPower[4].pow(0.2).add(1)
        player.oi.linkingPowerEffect[5] = player.oi.linkingPower[5].pow(0.25).add(1)

        player.oi.protoMemoriesPerSecond = player.oi.linkingPower[0].mul(player.oi.linkingPower[1].mul(player.oi.linkingPower[2].mul(player.oi.linkingPower[3].mul(player.oi.linkingPower[4].mul(player.oi.linkingPower[5]))))).plus(1).pow(0.55).div(1e7)

        player.oi.protoMemorySecondsToGet = player.cp.replicantiPoints.plus(1).log10().mul(8).pow(0.5)

        if (player.oi.protoMemorySeconds.gt(0))
        {
            player.oi.protoMemories = player.oi.protoMemories.add(player.oi.protoMemoriesPerSecond.mul(delta))
            player.oi.protoMemorySeconds = player.oi.protoMemorySeconds.sub(onepersec.mul(delta))
        } else
        {
            player.oi.protoMemorySeconds = new Decimal(0)
        }
    },
    oilReset()
    {
        player.ar.rankPoints = new Decimal(0)
        player.ar.tierPoints = new Decimal(0)
        player.ar.tetrPoints = new Decimal(0)
        player.cp.replicantiPoints = new Decimal(1)

        player.an.anonymity = new Decimal(0)

        player.pr.perkPoints = new Decimal(0)
        player.pr.buyables[11] = new Decimal(0)
        player.pr.buyables[12] = new Decimal(0)
        player.pr.buyables[13] = new Decimal(0)
        player.pr.buyables[14] = new Decimal(0)
        player.pr.buyables[15] = new Decimal(0)
        player.pr.buyables[16] = new Decimal(0)
        player.pr.buyables[17] = new Decimal(0)
        player.pr.buyables[18] = new Decimal(0)

        player.rt.repliTrees = new Decimal(0)
        player.rt.repliLeaves = new Decimal(1)

        player.rt.buyables[11] = new Decimal(0)
        player.rt.buyables[12] = new Decimal(0)
        player.rt.buyables[13] = new Decimal(0)
        player.rt.buyables[14] = new Decimal(0)
        player.rt.buyables[15] = new Decimal(0)
        player.rt.buyables[16] = new Decimal(0)
        player.rt.buyables[17] = new Decimal(0)
        player.rt.buyables[18] = new Decimal(0)

        for (let i = 0; i < player.an.upgrades.length; i++) {
            if (+player.an.upgrades[i] < 23) {
                player.an.upgrades.splice(i, 1);
                i--;
            }
        }
    },
    clickables: {
        1: {
            title() { return "<h2>Return (A1)" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cp"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "<h2>Return (U1)" },
            canClick() { return true },
            unlocked() { return hasUpgrade("cp", 18) },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        3: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        4: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "<h2>Reset all content previous content (except grass and grass-skip) for oil. (Based on anonymity)" },
            canClick() { return player.oi.oilToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.oi.oil = player.oi.oil.add(player.oi.oilToGet)
                player.oi.oilPause = new Decimal(4)
            },
            style: { width: '600px', "min-height": '100px' },
        },
        12: {
            title() { return "<h3>Previous" },
            canClick() { return player.oi.linkerChoice.gt(0) },
            unlocked() { return true },
            onClick() {
                player.oi.linkerChoice = player.oi.linkerChoice.sub(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        13: {
            title() { return "<h3>Next" },
            canClick() { return player.oi.linkerChoice.lt(5) },
            unlocked() { return true },
            onClick() {
                player.oi.linkerChoice = player.oi.linkerChoice.add(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        14: {
            title() { return "<h2>DO an oil reset and reset linking power for production time. (Based on replicanti points) (Req: 1e60 replicanti points)" },
            canClick() { return player.cp.replicantiPoints.gte(1e60) },
            unlocked() { return true },
            onClick() {
                player.oi.protoMemorySeconds = player.oi.protoMemorySeconds.add(player.oi.protoMemorySecondsToGet)
                player.oi.oilPause = new Decimal(4)

                player.oi.linkingPower[0] = new Decimal(0)
                player.oi.linkingPower[1] = new Decimal(0)
                player.oi.linkingPower[2] = new Decimal(0)
                player.oi.linkingPower[3] = new Decimal(0)
                player.oi.linkingPower[4] = new Decimal(0)
                player.oi.linkingPower[5] = new Decimal(0)
            },
            style: { width: '600px', "min-height": '100px' },
        },
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
            },
            fillStyle: {
                "background-color": "#193ceb",
            },
            display() {
                return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
            },
        }, 
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.oi.linkerChoice.eq(0) },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Point Linker"
            },
            display() {
                return "which are multiplying point linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.oi.linkerChoice.eq(1) },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Factor Power Linker"
            },
            display() {
                return "which are multiplying factor power linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.oi.linkerChoice.eq(2) },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Prestige Point Linker"
            },
            display() {
                return "which are multiplying prestige point linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.oi.linkerChoice.eq(3) },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Tree Linker"
            },
            display() {
                return "which are multiplying tree linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.oi.linkerChoice.eq(4) },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass Linker"
            },
            display() {
                return "which are multiplying grass linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.oi.linkerChoice.eq(5) },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grasshopper Linker"
            },
            display() {
                return "which are multiplying grasshopper linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        21: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(20) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(10).pow(2.4).add(1) },
            unlocked() { return true },
            canAfford() { return player.oi.protoMemories.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Steel Rememberance"
            },
            display() {
                return "which are multiplying steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Proto Memories"
            },
            buy() {
                let base = new Decimal(20)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.protoMemories = player.oi.protoMemories.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.protoMemories, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.protoMemories = player.oi.protoMemories.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(35) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5).pow(1.45).add(1) },
            unlocked() { return true },
            canAfford() { return player.oi.protoMemories.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Crystal Rememberance"
            },
            display() {
                return "which are multiplying crystal gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Proto Memories"
            },
            buy() {
                let base = new Decimal(35)
                let growth = 1.25
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.protoMemories = player.oi.protoMemories.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.protoMemories, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.protoMemories = player.oi.protoMemories.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(3).pow(1.35).add(1) },
            unlocked() { return true },
            canAfford() { return player.oi.protoMemories.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Time Cube Rememberance"
            },
            display() {
                return "which are multiplying time cube gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Proto Memories"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.protoMemories = player.oi.protoMemories.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.protoMemories, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.protoMemories = player.oi.protoMemories.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        24: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(80) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(1.5).pow(0.85).add(1) },
            unlocked() { return true },
            canAfford() { return player.oi.protoMemories.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Rage Power Rememberance"
            },
            display() {
                return "which are multiplying rage power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Proto Memories"
            },
            buy() {
                let base = new Decimal(80)
                let growth = 1.35
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.protoMemories = player.oi.protoMemories.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.oi.protoMemories, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.oi.protoMemories = player.oi.protoMemories.sub(cost)

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
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> oil." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your oil boosts repli-trees and extends repli-tree softcap by <h3>x" + format(player.oi.oilEffect) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.oi.oilToGet) + "</h3> oil on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],,
                    ["blank", "25px"],
        ["row", [["clickable", 11]]],
    ]

            },
            "Linkers": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("cp", 18) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> oil." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.oi.linkerTexts[player.oi.linkerChoice] }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.oi.linkerTextEffects[player.oi.linkerChoice] }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"], 
                    ["row", [["clickable", 12], ["clickable", 13]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14], ["buyable", 15], ["buyable", 16]]],
    ]

            },
            "PROTO MEMORIES": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("cp", 18) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.linkingPower[0]) + "</h3> point linking power. (+" + format(player.oi.linkingPowerPerSecond[0]) + "/s)"  }, { "color": "white", "font-size": "14px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.linkingPower[1]) + "</h3> factor power linking power. (+" + format(player.oi.linkingPowerPerSecond[1]) + "/s)" }, { "color": "white", "font-size": "14px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.linkingPower[2]) + "</h3> prestige point linking power. (+" + format(player.oi.linkingPowerPerSecond[2]) + "/s)"}, { "color": "white", "font-size": "14px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.linkingPower[3]) + "</h3> tree linking power. (+" + format(player.oi.linkingPowerPerSecond[3]) + "/s)" }, { "color": "white", "font-size": "14px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.linkingPower[4]) + "</h3> grass linking power. (+" + format(player.oi.linkingPowerPerSecond[4]) + "/s)" }, { "color": "white", "font-size": "14px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.linkingPower[5]) + "</h3> grasshopper linking power. (+" + format(player.oi.linkingPowerPerSecond[5]) + "/s)" }, { "color": "white", "font-size": "14px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.protoMemories) + "</h3> proto memories." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.oi.protoMemoriesPerSecond) + "</h3> proto memories per second. (based on total linking power)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatTime(player.oi.protoMemorySeconds) + "</h3> to produce proto memories." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + formatTime(player.oi.protoMemorySecondsToGet) + "</h3> of proto memory production on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 14]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 3], ["clickable", 4]]],
                    ["blank", "25px"], 
                    ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24]]],
                ]
            },
            "REMEMBERANCE CORES": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("cp", 18) },
                content:
                [
                ]
            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "replicantiBar"]]],
        ["row", [["clickable", 1], ["clickable", 2]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasMilestone("gs", 17) }
})