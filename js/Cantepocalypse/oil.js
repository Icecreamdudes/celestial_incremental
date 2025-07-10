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
        linkerBought: false,

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
        if (hasMilestone("s", 16) && !inChallenge("fu", 11))
        {
            buyBuyable('oi', 11)
            buyBuyable('oi', 12)
            buyBuyable('oi', 13)
            buyBuyable('oi', 14)
            buyBuyable('oi', 15)
            buyBuyable('oi', 16)
            buyBuyable('oi', 21)
            buyBuyable('oi', 22)
            buyBuyable('oi', 23)
            buyBuyable('oi', 24)
        }
    },
    nodeStyle() {},
    tooltip: "Oil",
    branches: ["rt", "rm", "cb", "m"],
    color: "#3c3642",
    update(delta) {
        let onepersec = new Decimal(1)

        player.oi.oilToGet = player.an.anonymity.div(1e25).pow(0.2)
        player.oi.oilToGet = player.oi.oilToGet.mul(levelableEffect("pet", 1206)[1])
        if (player.pol.pollinatorsIndex == 8) player.oi.oilToGet = player.oi.oilToGet.mul(player.pol.pollinatorsEffect[17])
        if (hasMilestone("fa", 17)) player.oi.oilToGet = player.oi.oilToGet.mul(player.fa.milestoneEffect[6])
        player.oi.oilToGet = player.oi.oilToGet.mul(buyableEffect("ra", 15))
        player.oi.oilToGet = player.oi.oilToGet.mul(player.fu.funEffect)
        if (hasUpgrade("fu", 12)) player.oi.oilToGet = player.oi.oilToGet.mul(upgradeEffect("fu", 12))
        player.oi.oilToGet = player.oi.oilToGet.mul(player.le.punchcardsPassiveEffect[4])
        player.oi.oilToGet = player.oi.oilToGet.mul(levelableEffect("pet", 405)[1])
        player.oi.oilToGet = player.oi.oilToGet.mul(buyableEffect("st", 107))

        // KEEP AFTER
        if (inChallenge("fu", 11)) player.oi.oilToGet = player.oi.oilToGet.pow(0.2)

        if (!inChallenge("fu", 11)) player.oi.oil = player.oi.oil.add(player.oi.oilToGet.mul(Decimal.mul(buyableEffect("fa", 204), delta)))

        player.oi.oilEffect = player.oi.oil.pow(0.65).div(1.5).add(1)

        if (player.oi.oilPause.gt(0)) {
            layers.oi.oilReset();
        }
        player.oi.oilPause = player.oi.oilPause.sub(1)


        player.oi.linkingPowerPerSecond[0] = player.points.abs().plus(1).log10().pow(0.21).mul(buyableEffect('oi', 11))
        player.oi.linkingPowerPerSecond[1] = player.f.factorPower.abs().plus(1).log10().pow(0.25).mul(buyableEffect('oi', 12))
        player.oi.linkingPowerPerSecond[2] = player.p.prestigePoints.abs().plus(1).log10().pow(0.215).mul(buyableEffect('oi', 13))
        player.oi.linkingPowerPerSecond[3] = player.t.trees.abs().plus(1).log10().pow(0.285).mul(buyableEffect('oi', 14))
        player.oi.linkingPowerPerSecond[4] = player.g.grass.abs().plus(1).log10().pow(0.255).mul(buyableEffect('oi', 15))
        player.oi.linkingPowerPerSecond[5] = player.gh.grasshoppers.abs().plus(1).log10().pow(0.27).mul(buyableEffect('oi', 16))

        for (let i = 0; i < player.oi.linkingPower.length; i++) {
            player.oi.linkingPowerPerSecond[i] = player.oi.linkingPowerPerSecond[i].mul(player.gs.milestone10Effect)

            // KEEP MULTIPLIERS BEFORE THIS
            if (inChallenge("fu", 11)) player.oi.linkingPowerPerSecond[i] = player.oi.linkingPowerPerSecond[i].pow(0.1)
                if (hasUpgrade('ma', 22)) player.oi.linkingPowerPerSecond[i] = player.oi.linkingPowerPerSecond[i].mul(upgradeEffect('ma', 22))
            player.oi.linkingPower[i] = player.oi.linkingPower[i].add(player.oi.linkingPowerPerSecond[i].mul(delta))
        }

        player.oi.linkingPowerEffect[0] = player.oi.linkingPower[0].pow(0.4).add(1)
        player.oi.linkingPowerEffect[1] = player.oi.linkingPower[1].pow(0.175).add(1)
        player.oi.linkingPowerEffect[2] = player.oi.linkingPower[2].pow(0.3).add(1)
        player.oi.linkingPowerEffect[3] = player.oi.linkingPower[3].pow(0.225).add(1)
        player.oi.linkingPowerEffect[4] = player.oi.linkingPower[4].pow(0.2).add(1)
        player.oi.linkingPowerEffect[5] = player.oi.linkingPower[5].pow(0.25).add(1)

        player.oi.protoMemoriesPerSecond = player.oi.linkingPower[0].mul(player.oi.linkingPower[1].mul(player.oi.linkingPower[2].mul(player.oi.linkingPower[3].mul(player.oi.linkingPower[4].mul(player.oi.linkingPower[5]))))).plus(1).pow(0.55).div(1e7)
        player.oi.protoMemoriesPerSecond = player.oi.protoMemoriesPerSecond.mul(levelableEffect("pet", 403)[2])
        player.oi.protoMemoriesPerSecond = player.oi.protoMemoriesPerSecond.mul(player.fu.funEffect2)

        player.oi.protoMemorySecondsToGet = player.cp.replicantiPoints.plus(1).log10().mul(8).pow(0.5)
        if (hasUpgrade("fu", 14)) player.oi.protoMemorySecondsToGet = player.oi.protoMemorySecondsToGet.mul(upgradeEffect("fu", 14))

        if (player.oi.protoMemorySeconds.gt(0)) {
            player.oi.protoMemories = player.oi.protoMemories.add(player.oi.protoMemoriesPerSecond.mul(delta))
            player.oi.protoMemorySeconds = player.oi.protoMemorySeconds.sub(onepersec.mul(delta))
        } else {
            player.oi.protoMemorySeconds = new Decimal(0)
        }

        if (!player.oi.linkerBought) {
            if (getBuyableAmount("oi", 11).gt(0) && getBuyableAmount("oi", 12).gt(0) && getBuyableAmount("oi", 13).gt(0) && getBuyableAmount("oi", 14).gt(0) && getBuyableAmount("oi", 15).gt(0) && getBuyableAmount("oi", 16).gt(0)) player.oi.linkerBought = true
        }
    },
    oilReset() {
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


        player.rg.repliGrass = new Decimal(1)

        player.rg.buyables[11] = new Decimal(0)
        player.rg.buyables[12] = new Decimal(0)
        player.rg.buyables[13] = new Decimal(0)
        player.rg.buyables[14] = new Decimal(0)
        player.rg.buyables[15] = new Decimal(0)
        player.rg.buyables[16] = new Decimal(0)
        player.rg.buyables[17] = new Decimal(0)
        player.rg.buyables[18] = new Decimal(0)

        if (!hasUpgrade("s", 15)) {
            for (let i = 0; i < player.an.upgrades.length; i++) {
                if (+player.an.upgrades[i] < 24) {
                    player.an.upgrades.splice(i, 1);
                    i--;
                }
            }
        }
    },
    clickables: {
        1: {
            title() { return "<h2>Return (A1)" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cp"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "<h2>Return (U1)" },
            canClick() { return true },
            unlocked() { return (hasUpgrade("cp", 18) && options.newMenu == false) },
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
            title() { return "<h2>Reset all previous content (except grass-skip) for oil.</h2><br><h3>(Based on anonymity)</h3>" },
            canClick() { return player.oi.oilToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.oi.oil = player.oi.oil.add(player.oi.oilToGet)
                player.oi.oilPause = new Decimal(4)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '600px', "min-height": '100px', borderRadius: '15px' },
        },
        14: {
            title() {
                if (!player.oi.linkerBought) {
                    return "<h2>Gaining production time locked until all linking powers obtained.</h2>"
                } else {
                    return "<h2>DO an oil reset and reset linking power for production time.</h2><br><h3>Req: 1e60 replicanti points<br>(Based on replicanti points)</h3>"
                }
            },
            canClick() { return player.cp.replicantiPoints.gte(1e60) && player.oi.linkerBought },
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
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '600px', "min-height": '100px', borderRadius: '15px' },
        },
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
                } else {
                    return new Decimal(1)
                }
            },
            fillStyle: {backgroundColor: "#193ceb"},
            display() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
                } else {
                    return "<p style='color:red'>[HARDCAPPED]</p>"
                }
            },
        },
    },
    upgrades: {},
    buyables: {
        11: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return "Point Linker"
            },
            display() {
                return "which are multiplying point linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy(mult) {
                let base = new Decimal(5)
                let growth = 1.5
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return "Factor Power Linker"
            },
            display() {
                return "which are multiplying factor power linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy(mult) {
                let base = new Decimal(5)
                let growth = 1.5
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return "Prestige Point Linker"
            },
            display() {
                return "which are multiplying prestige point linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy(mult) {
                let base = new Decimal(5)
                let growth = 1.5
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return "Tree Linker"
            },
            display() {
                return "which are multiplying tree linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy(mult) {
                let base = new Decimal(5)
                let growth = 1.5
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return "Grass Linker"
            },
            display() {
                return "which are multiplying grass linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy(mult) {
                let base = new Decimal(5)
                let growth = 1.5
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.oil = player.oi.oil.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.oi.oil.gte(this.cost()) },
            title() {
                return "Grasshopper Linker"
            },
            display() {
                return "which are multiplying grasshopper linking power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Oil"
            },
            buy(mult) {
                let base = new Decimal(5)
                let growth = 1.5
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.oil = player.oi.oil.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.oil, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.oil = player.oi.oil.sub(cost)

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
                return "Steel Rememberance"
            },
            display() {
                return "which are multiplying steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Proto Memories"
            },
            buy(mult) {
                let base = new Decimal(20)
                let growth = 1.2
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.protoMemories = player.oi.protoMemories.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.protoMemories, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.protoMemories = player.oi.protoMemories.sub(cost)

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
                return "Crystal Rememberance"
            },
            display() {
                return "which are multiplying crystal gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Proto Memories"
            },
            buy(mult) {
                let base = new Decimal(35)
                let growth = 1.25
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.protoMemories = player.oi.protoMemories.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.protoMemories, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.protoMemories = player.oi.protoMemories.sub(cost)

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
                return "Time Cube Rememberance"
            },
            display() {
                return "which are multiplying time cube gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Proto Memories"
            },
            buy(mult) {
                let base = new Decimal(50)
                let growth = 1.3
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.protoMemories = player.oi.protoMemories.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.protoMemories, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.protoMemories = player.oi.protoMemories.sub(cost)

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
                return "Rage Power Rememberance"
            },
            display() {
                return "which are multiplying rage power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Proto Memories"
            },
            buy(mult) {
                let base = new Decimal(80)
                let growth = 1.35
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.oi.protoMemories = player.oi.protoMemories.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.oi.protoMemories, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.oi.protoMemories = player.oi.protoMemories.sub(cost)

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
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
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
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("cp", 18) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> oil." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", () => { return "Linking Powers"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "825px", height: "30px", backgroundColor: "#0c1a36", borderLeft: "3px solid #0c1a36", borderRight: "3px solid #0c1a36", borderTop: "3px solid #0c1a36"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Point Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "30px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[0]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[0]) + "/s)</small>"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ["raw-html", () => { return "x" + format(player.oi.linkingPowerEffect[0]) + "<small> Replicanti Point Mult</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],    
                            ], {width: "273px", height: "67px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "100px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Factor Power Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "30px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[1]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[1]) + "/s)</small>"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ["raw-html", () => { return "x" + format(player.oi.linkingPowerEffect[1]) + "<small> Perk Points</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],    
                            ], {width: "273px", height: "67px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "100px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Prestige Point Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "30px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[2]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[2]) + "/s)</small>"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ["raw-html", () => { return "x" + format(player.oi.linkingPowerEffect[2]) + "<small> Anonymity</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],    
                            ], {width: "273px", height: "67px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "100px"}],
                    ], {width: "825px", border: "3px solid #0c1a36"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Tree Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "30px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[3]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[3]) + "/s)</small>"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ["raw-html", () => { return "x" + format(player.oi.linkingPowerEffect[3]) + "<small> Repli-Trees</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],    
                            ], {width: "273px", height: "67px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "100px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Grass Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "30px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[4]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[4]) + "/s)</small>"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ["raw-html", () => { return "x" + format(player.oi.linkingPowerEffect[4]) + "<small> Repli-Grass Mult</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],    
                            ], {width: "273px", height: "67px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "100px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Grasshopper Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "30px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[5]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[5]) + "/s)</small>"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ["raw-html", () => { return "x" + format(player.oi.linkingPowerEffect[5]) + "<small> Grass-Skippers</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],    
                            ], {width: "273px", height: "67px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "100px"}],
                    ], {width: "825px", borderLeft: "3px solid #0c1a36", borderRight: "3px solid #0c1a36", borderBottom: "3px solid #0c1a36"}],
                    ["style-column", [
                        ["raw-html", () => { return "(Each linking power is based on it's respective currency)"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "825px", height: "30px", backgroundColor: "#0c1a36", borderLeft: "3px solid #0c1a36", borderRight: "3px solid #0c1a36", borderBottom: "3px solid #0c1a36"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                    ["row", [["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16]]],
                ]
            },
            "PROTO MEMORIES": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("cp", 18) },
                content:
                [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Point Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[0]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[0]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Factor Power Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[1]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[1]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Prestige Point Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[2]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[2]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px"}],
                    ], {width: "825px", border: "3px solid #0c1a36"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Tree Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[3]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[3]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Grass Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[4]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[4]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px", borderRight: "3px solid #0c1a36"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Grasshopper Linking Power"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "20px", backgroundColor: "#102143", borderBottom: "3px solid #0c1a36"}],
                            ["style-column", [
                                ["raw-html", () => { return format(player.oi.linkingPower[5]) + "<small> (+" + format(player.oi.linkingPowerPerSecond[5]) + "/s)</small>"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "273px", height: "27px", backgroundColor: "#162e5e"}],
                        ], {width: "273px", height: "50px"}],
                    ], {width: "825px", borderLeft: "3px solid #0c1a36", borderRight: "3px solid #0c1a36", borderBottom: "3px solid #0c1a36"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.protoMemories) + "</h3> proto memories." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.oi.protoMemorySeconds.gt(0) ? "You are gaining <h3>" + format(player.oi.protoMemoriesPerSecond) + "</h3> proto memories per second. (based on total linking power)" : "You currently have no proto memory production time." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatTime(player.oi.protoMemorySeconds) + "</h3> to produce proto memories." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + formatTime(player.oi.protoMemorySecondsToGet) + "</h3> of proto memory production on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 14]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24]]],
                ]
            },
            "REMEMBERANCE CORES": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("cp", 18) },
                content: [
                    ["layer-proxy", ["ca", [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.ca.rememberanceCores) + "</h3> rememberance cores." }, { "color": "white", "font-size": "26px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Your rememberance cores boost cante energy gain by x<h3>" + format(player.ca.rememberanceCoresEffect) + "</h3>." }, { "color": "white", "font-size": "26px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.ca.canteCores) + "</h3> cante cores." }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.oi.protoMemories) + "</h3> proto memories." }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 15]]],
                        ["raw-html", function () { return "Cost: <h3>" + format(player.ca.rememberanceCoreCost) + "</h3> proto memories." }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],    
                    ]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "replicantiBar"]]],
        ["row", [["clickable", 1], ["clickable", 2]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasMilestone("gs", 17) }
})
