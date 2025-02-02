addLayer("gs", {
    name: "Grass-Skip", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GS", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        grassSkip: new Decimal(0),
        grassSkipToGet: new Decimal(0),
        grassSkipReq: new Decimal(1e40),
        grassSkipEffect: new Decimal(1),
        grassSkipPause: new Decimal(0),

        //grassSkippers
        grassSkippers: new Decimal(0),
        grassSkippersEffect: new Decimal(1),
        grassSkippersPerSecond: new Decimal(0),

        //milestone
        milestone2Effect: new Decimal(1),
        milestone8Effect: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
        if (hasMilestone("s", 16) && !inChallenge("fu", 11))
        {
            buyBuyable('gs', 11)
            buyBuyable('gs', 12)
            buyBuyable('gs', 13)
            buyBuyable('gs', 14)
            buyBuyable('gs', 15)
            buyBuyable('gs', 16)
            buyBuyable('gs', 17)
            buyBuyable('gs', 18)
        }
    },
    tooltip: "Grass-Skip",
    branches: ["rg"],
    color: "#bfc66a",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.gs.grassSkipPause.gt(0)) {
            layers.gs.grassSkipReset();
        }
        player.gs.grassSkipPause = player.gs.grassSkipPause.sub(1)

        if (player.gs.grassSkip.lt(15)) player.gs.grassSkipReq = player.gs.grassSkip.mul(Decimal.pow(1e2, player.gs.grassSkip)).pow(1.5).add(1).mul(1e40)
        if (player.gs.grassSkip.gte(15)) player.gs.grassSkipReq = player.gs.grassSkip.mul(Decimal.pow(1e3, player.gs.grassSkip)).pow(1.5).add(1).mul(1e35)
        player.gs.grassSkipEffect = player.gs.grassSkip.add(buyableEffect("fu", 24)).pow(2.4).add(1)

        if (player.cp.replicantiPoints.gte(1e40))
        {
            player.gs.grassSkipToGet = new Decimal(1)
        }

        player.gs.grassSkippers = player.gs.grassSkippers.add(player.gs.grassSkippersPerSecond.mul(delta))

        player.gs.grassSkippersPerSecond = player.gs.grassSkip.add(buyableEffect("fu", 24)).pow(5)
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("gs", 11))
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("gs", 12))
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("gs", 13))
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("gs", 14))
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(player.oi.linkingPowerEffect[5])
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("fu", 57))
        if (inChallenge("fu", 11)) player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.pow(0.2)

        player.gs.grassSkippersEffect = player.gs.grassSkippers.pow(0.275).add(1)

        player.gs.milestone2Effect = player.cp.replicantiPoints.plus(1).log10().pow(1.35).add(1)
        if (player.gs.grassSkip.gte(15)) {
            player.gs.milestone8Effect = player.gs.grassSkip.add(buyableEffect("fu", 24)).sub(10).div(5).pow(0.9).add(1)
        } else {
            player.gs.milestone8Effect = player.gs.grassSkip.add(buyableEffect("fu", 24)).div(15).add(1)
        }

        if (player.subtabs["oi"]['stuff'] == 'REMEMBERANCE CORES')
        {
            player.tab = 'ca'
            player.subtabs["ca"]['stuff'] = 'REMEMBERANCE CORES'
            player.subtabs["oi"]['stuff'] = 'Main'
        }

        player.gs.grassSkipReq = player.gs.grassSkipReq.div(buyableEffect("fu", 72))
    },
    grassSkipReset()
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

        if (!hasMilestone("gs", 14))
        {
            player.rg.repliGrass = new Decimal(1)

            player.rg.buyables[11] = new Decimal(0)
            player.rg.buyables[12] = new Decimal(0)
            player.rg.buyables[13] = new Decimal(0)
            player.rg.buyables[14] = new Decimal(0)
            player.rg.buyables[15] = new Decimal(0)
            player.rg.buyables[16] = new Decimal(0)
            player.rg.buyables[17] = new Decimal(0)
            player.rg.buyables[18] = new Decimal(0)
        }

        if (!hasUpgrade("s", 14))
        {
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
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
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
        11: {
            title() { return "<h2>Reset all content previous alt-uni 1 content, but grass-skip.<br>Req: " + formatWhole(player.gs.grassSkipReq) + " Replicanti Points" },
            canClick() { return player.cp.replicantiPoints.gte(player.gs.grassSkipReq) },
            unlocked() { return true },
            onClick() {
                player.gs.grassSkip = player.gs.grassSkip.add(player.gs.grassSkipToGet)
                player.gs.grassSkipPause = new Decimal(4)
            },
            style: { width: '400px', "min-height": '100px' },
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
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.gs.grassSkippers.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass-Skipper Factor I."
            },
            display() {
                return "which are multiplying grass-skippers by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers."
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.2
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.gs.grassSkippers = player.gs.grassSkippers.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.gs.grassSkippers, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.gs.grassSkippers = player.gs.grassSkippers.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(25)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.gs.grassSkippers.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass-Skipper Factor II."
            },
            display() {
                return "which are multiplying grass-skippers by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers."
            },
            buy() {
                let base = new Decimal(25)
                let growth = 1.25
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.gs.grassSkippers = player.gs.grassSkippers.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.gs.grassSkippers, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.gs.grassSkippers = player.gs.grassSkippers.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(40)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.gs.grassSkippers.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass-Skipper Factor III."
            },
            display() {
                return "which are multiplying grass-skippers by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers."
            },
            buy() {
                let base = new Decimal(40)
                let growth = 1.3
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.gs.grassSkippers = player.gs.grassSkippers.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.gs.grassSkippers, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.gs.grassSkippers = player.gs.grassSkippers.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(100)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.gs.grassSkippers.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass-Skipper Factor IV."
            },
            display() {
                return "which are multiplying grass-skippers by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers."
            },
            buy() {
                let base = new Decimal(100)
                let growth = 1.35
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.gs.grassSkippers = player.gs.grassSkippers.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.gs.grassSkippers, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.gs.grassSkippers = player.gs.grassSkippers.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(2500)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.gs.grassSkippers.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Perk Point Skip Booster."
            },
            display() {
                return "which are boosting perk points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers."
            },
            buy() {
                let base = new Decimal(2500)
                let growth = 1.25
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.gs.grassSkippers = player.gs.grassSkippers.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.gs.grassSkippers, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.gs.grassSkippers = player.gs.grassSkippers.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(6000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.gs.grassSkippers.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Anonymity Skip Booster."
            },
            display() {
                return "which are boosting anonymity by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers."
            },
            buy() {
                let base = new Decimal(6000)
                let growth = 1.3
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.gs.grassSkippers = player.gs.grassSkippers.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.gs.grassSkippers, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.gs.grassSkippers = player.gs.grassSkippers.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(15000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).add(1) },
            unlocked() { return true },
            canAfford() { return player.gs.grassSkippers.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Tree Skip Booster."
            },
            display() {
                return "which are boosting repli-trees by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers."
            },
            buy() {
                let base = new Decimal(15000)
                let growth = 1.35
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.gs.grassSkippers = player.gs.grassSkippers.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.gs.grassSkippers, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.gs.grassSkippers = player.gs.grassSkippers.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(40000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).add(1) },
            unlocked() { return true },
            canAfford() { return player.gs.grassSkippers.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Repli-Grass Skip Booster."
            },
            display() {
                return "which are boosting the repli-grass mult by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers."
            },
            buy() {
                let base = new Decimal(40000)
                let growth = 1.4
                if (player.buyMax == false && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.gs.grassSkippers = player.gs.grassSkippers.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.gs.grassSkippers, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                if (!hasMilestone("s", 16)) player.gs.grassSkippers = player.gs.grassSkippers.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {
        11: {
            requirementDescription: "<h3>Grass-Skip 1",
            effectDescription: "Unlock Grass-Skippers",
            done() { return player.gs.grassSkip.gte(1) },
            style: { width: '800px', "min-height": '75px' },
        },
        12: {
            requirementDescription: "<h3>Grass-Skip 2",
            effectDescription() { return "Replicanti Points boost themselves at a reduced rate. Currently: " + format(player.gs.milestone2Effect)+"x" },
            done() { return player.gs.grassSkip.gte(2) },
            style: { width: '800px', "min-height": '75px' },
        },
        13: {
            requirementDescription: "<h3>Grass-Skip 3",
            effectDescription() { return "Autobuy perk buyables." },
            done() { return player.gs.grassSkip.gte(3) },
            style: { width: '800px', "min-height": '75px' },
        },
        14: {
            requirementDescription: "<h3>Grass-Skip 4",
            effectDescription() { return "Keep repli-grass content on reset." },
            done() { return player.gs.grassSkip.gte(4) },
            style: { width: '800px', "min-height": '75px' },
        },
        15: {
            requirementDescription: "<h3>Grass-Skip 7",
            effectDescription() { return "Gain 10% of anonymity per second." },
            done() { return player.gs.grassSkip.gte(7) },
            style: { width: '800px', "min-height": '75px' },
        },
        16: {
            requirementDescription: "<h3>Grass-Skip 11",
            effectDescription() { return "Autobuy repli-tree buyables." },
            done() { return player.gs.grassSkip.gte(11) },
            style: { width: '800px', "min-height": '75px' },
        },
        17: {
            requirementDescription: "<h3>Grass-Skip 15",
            effectDescription() { return "Unlocks oil." },
            done() { return player.gs.grassSkip.gte(15) },
            style: { width: '800px', "min-height": '75px' },
        },
        18: {
            requirementDescription: "<h3>Grass-Skip 20",
            effectDescription() { return "Grass-Skips boost pollinator gain. Currently: " + format(player.gs.milestone8Effect)+"x" },
            done() { return player.gs.grassSkip.gte(15) },
            style: { width: '800px', "min-height": '75px' },
        },
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Grass-Skip": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return !player.fu.buyables[24].gte(1) ? "You are at grass-skip <h3>" + formatWhole(player.gs.grassSkip) + ". (+" + formatWhole(player.gs.grassSkipToGet) + ")" : "You are at grass-skip <h3>" + formatWhole(player.gs.grassSkip) + " + " +  formatWhole(buyableEffect("fu", 24)) +". (+" + formatWhole(player.gs.grassSkipToGet) + ")"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your grass-skip boosts multiplies the replicanti point multiplier by x" + format(player.gs.grassSkipEffect) + "." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Milestones"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["milestone", 11]]],
                    ["row", [["milestone", 12]]],
                    ["row", [["milestone", 13]]],
                    ["row", [["milestone", 14]]],
                    ["row", [["milestone", 15]]],
                    ["row", [["milestone", 16]]],
                    ["row", [["milestone", 17]]],
                    ["row", [["milestone", 18]]],
                ]
            },
            "Grass-Skippers": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasMilestone("gs", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.gs.grassSkippers) + "</h3> grass-skippers." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.gs.grassSkippersPerSecond) + "</h3> grass-skippers per second." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your grass-skippers are boosting rank, tier, and tetr points by x<h3>" + format(player.gs.grassSkippersEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicanti point Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "replicantiBar"]]],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 17) }
})
