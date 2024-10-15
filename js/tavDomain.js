addLayer("tad", {
    name: "Tav's Domain", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h2>→", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        domainResetPause: new Decimal(0),

        currentConversion: new Decimal(0),
        //1 - Shattered 2 - Disfigured 3 - Corrupted

        shatteredInfinities: new Decimal(0),
        shatteredInfinitiesToGet: new Decimal(0),
        disfiguredInfinities: new Decimal(0),
        disfiguredInfinitiesToGet: new Decimal(0),
        corruptedInfinities: new Decimal(0),
        corruptedInfinitiesToGet: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)",
            "background-origin": "border-box",
            "border-color": "#31aeb0",
            "color": "#008080",
        };
      },
    
    tooltip: "Tav, the Celestial of Limits",
    color: "#333c81",
    update(delta) {
        let onepersec = new Decimal(1)

        player.tad.domainResetPause = player.tad.domainResetPause.sub(1)
        if (player.tad.domainResetPause.gt(0))
        {
            layers.tad.domainReset()
        }

        //REMEMBER - ONLY ALLOW CONVERSIONS IF U ARE IN THE RIGHT OTFS

        player.tad.shatteredInfinitiesToGet = player.bi.brokenInfinities.pow(0.4)
        player.tad.shatteredInfinitiesToGet = player.tad.shatteredInfinitiesToGet.mul(buyableEffect("om", 13))
        player.tad.shatteredInfinitiesToGet = player.tad.shatteredInfinitiesToGet.mul(buyableEffect("p", 18))
        
        player.tad.disfiguredInfinitiesToGet = player.bi.brokenInfinities.pow(0.4)
        player.tad.disfiguredInfinitiesToGet = player.tad.disfiguredInfinitiesToGet.mul(buyableEffect("om", 13))
        player.tad.disfiguredInfinitiesToGet = player.tad.disfiguredInfinitiesToGet.mul(buyableEffect("p", 18))

        player.tad.corruptedInfinitiesToGet = player.bi.brokenInfinities.pow(0.4)
        player.tad.corruptedInfinitiesToGet = player.tad.corruptedInfinitiesToGet.mul(buyableEffect("om", 13))
        player.tad.corruptedInfinitiesToGet = player.tad.corruptedInfinitiesToGet.mul(buyableEffect("p", 18))
    },
    branches: ["ad", "ip"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "ta"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return "<h3>Convert broken infinities to shattered infinities" },
            canClick() { return player.po.hex && !player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && !player.tad.currentConversion.eq(0) },
            unlocked() { return true },
            onClick() {
                player.tad.currentConversion = new Decimal(0)
            },
            style: { width: '200px', "min-height": '100px',},
        },
        12: {
            title() { return "<h3>Convert broken infinities to disfigured infinities" },
            canClick() { return !player.po.hex && !player.po.dice && player.po.rocketFuel && inChallenge("tad", 11) && !player.tad.currentConversion.eq(1)},
            unlocked() { return true },
            onClick() {
                player.tad.currentConversion = new Decimal(1)
            },
            style: { width: '200px', "min-height": '100px',},
        },
        13: {
            title() { return "<h3>Convert broken infinities to corrupted infinities" },
            canClick() { return !player.po.hex && player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && !player.tad.currentConversion.eq(2)},
            unlocked() { return true },
            onClick() {
                player.tad.currentConversion = new Decimal(2)
            },
            style: { width: '200px', "min-height": '100px',},
        },
        14: {
            title() { return "<h3>Stop Converions" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.tad.currentConversion = new Decimal(-1)
            },
            style: { width: '200px', "min-height": '100px',},
        },
        15: {
            title() { return "<h3>BREAK THE BARRIER. KILL TAV.<br>1,000 of each alternate broken infinity type." },
            canClick() { return player.tad.shatteredInfinities.gt(1000) && player.tad.corruptedInfinities.gt(1000) && player.tad.disfiguredInfinities.gt(1000) },
            unlocked() { return true },
            onClick() {
                player.in.unlockedBreak = true
                player.tab = 'po'
                player.subtabs["po"]['stuff'] = 'Otherworldly Features'
            },
            style: { width: '500px', "min-height": '200px',},
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Hex Buyable Automation",
            unlocked() { return true },
            description: "Autobuys hex buyables (not blessings).",
            cost: new Decimal(20),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Shattered Infinities",
            currencyInternalName: "shatteredInfinities",
        },
        12:
        {
            title: "Rocket Fuel Ability Automation",
            unlocked() { return true },
            description: "Auto activates the first four rocket fuel abilities.",
            cost: new Decimal(20),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Disfigured Infinities",
            currencyInternalName: "disfiguredInfinities",
            style: { width: '125px', height: '100px', }
        },
        13:
        {
            title: "Dice Buyable Automation",
            unlocked() { return true },
            description: "Autobuys dice buyables.",
            cost: new Decimal(20),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Corrupted Infinities",
            currencyInternalName: "corruptedInfinities",
        },
        14:
        {
            title: "Shattering",
            unlocked() { return player.cap.reqSelect.eq(2) },
            description: ".",
            cost: new Decimal(4e7),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Shattered Infinities",
            currencyInternalName: "shatteredInfinities",
        },
        15:
        {
            title: "Disfiguration",
            unlocked() { return player.cap.reqSelect.eq(2) },
            description: ".",
            cost: new Decimal(4e7),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Disfigured Infinities",
            currencyInternalName: "disfiguredInfinities",
            style: { width: '125px', height: '100px', }
        },
        16:
        {
            title: "Corruption",
            unlocked() { return player.cap.reqSelect.eq(2) },
            description: ".",
            cost: new Decimal(4e7),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Corrupted Infinities",
            currencyInternalName: "corruptedInfinities",
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.tad.shatteredInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Infinity Multiplier"
            },
            display() {
                return "which are multiplying infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Shattered Infinities"
            },
            buy() {
                let base = new Decimal(3)
                let growth = 1.25
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.shatteredInfinities = player.tad.shatteredInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.shatteredInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.shatteredInfinities = player.tad.shatteredInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        12: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.tad.disfiguredInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Broken Infinity Multiplier"
            },
            display() {
                return "which are multiplying broken infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Disfigured Infinities"
            },
            buy() {
                let base = new Decimal(4)
                let growth = 1.15
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.disfiguredInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        13: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(2) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(4).pow(1.4).add(1) },
            unlocked() { return true },
            canAfford() { return player.tad.corruptedInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Antimatter Dimension Multiplier"
            },
            display() {
                return "which are boosting antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Corrupted Infinities"
            },
            buy() {
                let base = new Decimal(2)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.corruptedInfinities = player.tad.corruptedInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.corruptedInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.corruptedInfinities = player.tad.corruptedInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        14: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(6) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5).pow(1.4).add(1) },
            unlocked() { return true },
            canAfford() { return player.tad.shatteredInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Tav Point Multiplier"
            },
            display() {
                return "which are multiplying tav point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Shattered Infinities"
            },
            buy() {
                let base = new Decimal(6)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.shatteredInfinities = player.tad.shatteredInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.shatteredInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.shatteredInfinities = player.tad.shatteredInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        15: {
            cost(x) { return new Decimal(1.24).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(10).pow(1.5).add(1) },
            unlocked() { return true },
            canAfford() { return player.tad.disfiguredInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Tav Essence Multiplier"
            },
            display() {
                return "which are multiplying tav essence gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Disfigured Infinities"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.24
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.disfiguredInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        16: {
            cost(x) { return new Decimal(1.16).pow(x || getBuyableAmount(this.layer, this.id)).mul(8) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(50).pow(1.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.tad.corruptedInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Antidebuff Point Multiplier"
            },
            display() {
                return "which are multiplying antidebuff point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Corrupted Infinities"
            },
            buy() {
                let base = new Decimal(8)
                let growth = 1.16
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.corruptedInfinities = player.tad.corruptedInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.corruptedInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.corruptedInfinities = player.tad.corruptedInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        17: {
            cost(x) { return new Decimal(1.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(15) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.4).add(1) },
            unlocked() { return hasUpgrade("bi", 16) },
            canAfford() { return player.tad.shatteredInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Hex Mastery Multiplier"
            },
            display() {
                return "which are multiplying hex mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Shattered Infinities"
            },
            buy() {
                let base = new Decimal(15)
                let growth = 1.22
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.shatteredInfinities = player.tad.shatteredInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.shatteredInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.shatteredInfinities = player.tad.shatteredInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        18: {
            cost(x) { return new Decimal(1.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(15) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.4).add(1)  },
            unlocked() { return hasUpgrade("bi", 16) },
            canAfford() { return player.tad.disfiguredInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Rocket Fuel Mastery Multiplier"
            },
            display() {
                return "which are multiplying rocket fuel mastery gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Disfigured Infinities"
            },
            buy() {
                let base = new Decimal(15)
                let growth = 1.22
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.disfiguredInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        19: {
            cost(x) { return new Decimal(1.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(15) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.4).add(1) },
            unlocked() { return hasUpgrade("bi", 16) },
            canAfford() { return player.tad.corruptedInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Dice Mastery Multiplier"
            },
            display() {
                return "which are multiplying dice mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Corrupted Infinities"
            },
            buy() {
                let base = new Decimal(15)
                let growth = 1.22
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.corruptedInfinities = player.tad.corruptedInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.corruptedInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.corruptedInfinities = player.tad.corruptedInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        21: {
            cost(x) { return new Decimal(1.26).pow(x || getBuyableAmount(this.layer, this.id)).mul(30) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.55).mul(0.1).add(1) },
            unlocked() { return hasUpgrade("bi", 16) },
            canAfford() { return player.tad.shatteredInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>IP Multiplier"
            },
            display() {
                return "which are multiplying IP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Shattered Infinities"
            },
            buy() {
                let base = new Decimal(30)
                let growth = 1.26
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.shatteredInfinities = player.tad.shatteredInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.shatteredInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.shatteredInfinities = player.tad.shatteredInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        22: {
            cost(x) { return new Decimal(1.28).pow(x || getBuyableAmount(this.layer, this.id)).mul(45) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.07).add(1)  },
            unlocked() { return hasUpgrade("bi", 16) },
            canAfford() { return player.tad.disfiguredInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Negative Infinity Multiplier"
            },
            display() {
                return "which are multiplying NIP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Disfigured Infinities"
            },
            buy() {
                let base = new Decimal(45)
                let growth = 1.28
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.disfiguredInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
        23: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(60) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.7).mul(0.2).add(1) },
            unlocked() { return hasUpgrade("bi", 16) },
            canAfford() { return player.tad.corruptedInfinities.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>All-Mastery Multiplier"
            },
            display() {
                return "which are all mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Corrupted Infinities"
            },
            buy() {
                let base = new Decimal(60)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.tad.corruptedInfinities = player.tad.corruptedInfinities.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.tad.corruptedInfinities, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.tad.corruptedInfinities = player.tad.corruptedInfinities.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '100px', }
        },
    },
    milestones: {

    },
    challenges: {
        11: {
            name: "Tav's Domain",
            challengeDescription() { return "<h4>Debuffs explained in challenge!<h5>\nDoes an infinity reset, negative infinity reset, lose all infinities and milestones. (Also resets on challenge leave)" },
            goalDescription() { return "None" },
            goal() { return false },
            canComplete: function () { return false },
            rewardDescription: "New types of infinities!",
            unlocked() { return true },
            onEnter() {
                player.tad.domainResetPause = new Decimal(5)
                player.in.infinityPause = new Decimal(16)
            },
            onExit() {
                player.tad.domainResetPause = new Decimal(5)
                player.in.infinityPause = new Decimal(16)

                player.po.hex = false
                player.po.dice = false
                player.po.rocketFuel = false
                player.po.featureSlots = new Decimal(0)
            },
            style: { width: '350px', height: '275px', }

        },
    },
    domainReset()
    {
        player.ta.negativeInfinityPause = new Decimal(5)
        player.in.infinities = new Decimal(0)
        player.bi.brokenInfinities = new Decimal(0)
        if (!hasMilestone("ip", 25) && player.in.unlockedBreak)
        {
            for (let i = 0; i < player.ip.milestones.length; i++) {
                if (+player.ip.milestones[i] < 25) {
                    player.ip.milestones.splice(i, 1);
                    i--;
                }
            }
        }
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["challenge", 11]]],
                ]

            },
            "Infinities": {
                buttonStyle() { return { 'color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["microtabs", "infinities", { 'border-width': '0px' }],
                    ["raw-html", function () { return "(You must be in Tav's domain to produce the alternate broken infinity types)" }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(You must be in ONLY ONE otherworldy feature to be able to produce as well.)" }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Infinity types are produced on infinity reset.)" }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],

        ]

            },
            "Buyables and Upgrades": {
                buttonStyle() { return { 'color': 'black' } },
                unlocked() { return true }, 
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.tad.shatteredInfinities) + "</h3> shattered infinities." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.tad.disfiguredInfinities) + "</h3> disfigured infinities." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.tad.corruptedInfinities) + "</h3> corrupted infinities." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
                    ["row", [["buyable", 14], ["buyable", 15], ["buyable", 16]]],
                    ["row", [["buyable", 17], ["buyable", 18], ["buyable", 19]]],
                    ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23]]],

                ]

            },
            "THE BARRIER": {
                buttonStyle() { return { 'color': 'black' } },
                unlocked() { return !player.in.unlockedBreak },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.tad.shatteredInfinities) + "</h3> shattered infinities." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.tad.disfiguredInfinities) + "</h3> disfigured infinities." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.tad.corruptedInfinities) + "</h3> corrupted infinities." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 15]]],
                ]

            },
        },
        infinities: {
            "Shattered": {
                buttonStyle() { return { 'color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return player.tad.currentConversion.eq(0) ? "You are producing shattered infinities." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.tad.currentConversion.eq(1) ? "You are producing disfigured infinities." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.tad.currentConversion.eq(2) ? "You are producing corrupted infinities." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.tad.currentConversion.eq(-1) ? "You are not producing an alternate broken infinity type." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.bi.brokenInfinities) + "</h3> broken infinities." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.tad.shatteredInfinities) + "</h3> shattered infinities. (REQUIRES HEX)" }, { "color": "black", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.tad.shatteredInfinitiesToGet) + "</h3> shattered infinities per conversion." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 14]]],
                    ["blank", "25px"],
                ]

            },
            "Disfigured": {
                buttonStyle() { return { 'color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return player.tad.currentConversion.eq(0) ? "You are producing shattered infinities." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.tad.currentConversion.eq(1) ? "You are producing disfigured infinities." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.tad.currentConversion.eq(2) ? "You are producing corrupted infinities." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.bi.brokenInfinities) + "</h3> broken infinities." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.tad.disfiguredInfinities) + "</h3> disfigured infinities. (REQUIRES ROCKET FUEL)" }, { "color": "black", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.tad.disfiguredInfinitiesToGet) + "</h3> disfigured infinities per conversion." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12], ["clickable", 14]]],
                    ["blank", "25px"],
                ]

            },
            "Corrupted": {
                buttonStyle() { return { 'color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return player.tad.currentConversion.eq(0) ? "You are producing shattered infinities." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.tad.currentConversion.eq(1) ? "You are producing disfigured infinities." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.tad.currentConversion.eq(2) ? "You are producing corrupted infinities." : ""}, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.bi.brokenInfinities) + "</h3> broken infinities." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.tad.corruptedInfinities) + "</h3> corrupted infinities. (REQUIRES DICE)" }, { "color": "black", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.tad.corruptedInfinitiesToGet) + "</h3> corrupted infinities per conversion." }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 13], ["clickable", 14]]],
                    ["blank", "25px"],
                ]

            },
        },
    }, 

    tabFormat: [
         ["raw-html", function () { return "You have <h3>" + format(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "black", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You will gain <h3>" + format(player.ta.negativeInfinityPointsToGet) + "</h3> on reset." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return false}
})