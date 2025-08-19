addLayer("tad", {
    name: "Tav's Domain", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h2>→", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        domainResetPause: new Decimal(0),

        currentConversion: new Decimal(-1),
        //0 - Shattered 1 - Disfigured 2 - Corrupted

        shatteredInfinities: new Decimal(0),
        shatteredInfinitiesToGet: new Decimal(0),
        disfiguredInfinities: new Decimal(0),
        disfiguredInfinitiesToGet: new Decimal(0),
        corruptedInfinities: new Decimal(0),
        corruptedInfinitiesToGet: new Decimal(0),
    }},
    automate() {
        if (hasMilestone("s", 13))
        {
            buyBuyable("tad", 11)
            buyBuyable("tad", 12)
            buyBuyable("tad", 13)
            buyBuyable("tad", 14)
            buyBuyable("tad", 15)
            buyBuyable("tad", 16)
            buyBuyable("tad", 17)
            buyBuyable("tad", 18)
            buyBuyable("tad", 19)
            buyBuyable("tad", 21)
            buyBuyable("tad", 22)
            buyBuyable("tad", 23)
        }
        if (hasMilestone("s", 17))
        {
            buyUpgrade("tad", 11)
            buyUpgrade("tad", 12)
            buyUpgrade("tad", 13)
        }
    },
    nodeStyle() {
        if (options.menuType == "tree") {
            return {
                background: "linear-gradient(150deg, #b2d8d8, 50%, #094242 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#b2d8d8",
                color: "#b2d8d8",
                width: "50px",
                height: "50px",
                fontSize: "20px",
                margin: "0px 17.5px 0px 17.5px",
            }
        } else {
            return {
                background: "linear-gradient(150deg, #b2d8d8, 50%, #094242 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#b2d8d8",
                color: "#b2d8d8",
            }
        }
    },
    tooltip: "Tav's Domain",
    color: "#5b629a",
    branches: ["ta"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.tad.domainResetPause = player.tad.domainResetPause.sub(1)
        if (player.tad.domainResetPause.gt(0)) {
            layers.tad.domainReset()
        }

        //REMEMBER - ONLY ALLOW CONVERSIONS IF U ARE IN THE RIGHT OTFS

        player.tad.shatteredInfinitiesToGet = player.bi.brokenInfinities.pow(0.4).floor()
        player.tad.shatteredInfinitiesToGet = player.tad.shatteredInfinitiesToGet.mul(buyableEffect("om", 13)).floor()
        player.tad.shatteredInfinitiesToGet = player.tad.shatteredInfinitiesToGet.mul(buyableEffect("p", 18)).floor()
        player.tad.shatteredInfinitiesToGet = player.tad.shatteredInfinitiesToGet.mul(levelableEffect("pet", 209)[1]).floor()
        player.tad.shatteredInfinitiesToGet = player.tad.shatteredInfinitiesToGet.mul(levelableEffect("pet", 1101)[2]).floor()

        if (hasMilestone("s", 13)) player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(Decimal.mul(player.tad.shatteredInfinitiesToGet.mul(0.1), delta))

        player.tad.disfiguredInfinitiesToGet = player.bi.brokenInfinities.pow(0.4).floor()
        player.tad.disfiguredInfinitiesToGet = player.tad.disfiguredInfinitiesToGet.mul(buyableEffect("om", 13)).floor()
        player.tad.disfiguredInfinitiesToGet = player.tad.disfiguredInfinitiesToGet.mul(buyableEffect("p", 18)).floor()
        player.tad.disfiguredInfinitiesToGet = player.tad.disfiguredInfinitiesToGet.mul(levelableEffect("pet", 209)[1]).floor()
        player.tad.disfiguredInfinitiesToGet = player.tad.disfiguredInfinitiesToGet.mul(levelableEffect("pet", 1101)[2]).floor()

        if (hasMilestone("s", 13)) player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(Decimal.mul(player.tad.disfiguredInfinitiesToGet.mul(0.1), delta))

        player.tad.corruptedInfinitiesToGet = player.bi.brokenInfinities.pow(0.4).floor()
        player.tad.corruptedInfinitiesToGet = player.tad.corruptedInfinitiesToGet.mul(buyableEffect("om", 13)).floor()
        player.tad.corruptedInfinitiesToGet = player.tad.corruptedInfinitiesToGet.mul(buyableEffect("p", 18)).floor()
        player.tad.corruptedInfinitiesToGet = player.tad.corruptedInfinitiesToGet.mul(levelableEffect("pet", 209)[1]).floor()
        player.tad.corruptedInfinitiesToGet = player.tad.corruptedInfinitiesToGet.mul(levelableEffect("pet", 1101)[2]).floor()

        if (hasMilestone("s", 13)) player.tad.corruptedInfinities = player.tad.corruptedInfinities.add(Decimal.mul(player.tad.corruptedInfinitiesToGet.mul(0.1), delta))
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
        11: {
            title() { return "Broken Infinities<br>to<br>Shattered Infinities<br><small>(REQUIRES HEX)</small>" },
            canClick() { return !player.tad.currentConversion.eq(0) },
            unlocked() { return true },
            onClick() {
                player.tad.currentConversion = new Decimal(0)
            },
            style() {
                let look = {width: "248px", minHeight: "100px", borderRadius: "0px", fontSize: "13px"}
                this.canClick() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        12: {
            title() { return "Broken Infinities<br>to<br>Disfigured Infinities<br><small>(REQUIRES ROCKET FUEL)</small>" },
            canClick() { return !player.tad.currentConversion.eq(1)},
            unlocked() { return true },
            onClick() {
                player.tad.currentConversion = new Decimal(1)
            },
            style() {
                let look = {width: "248px", minHeight: "100px", borderRadius: "0px", fontSize: "13px"}
                this.canClick() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        13: {
            title() { return "Broken Infinities<br>to<br>Corrupted Infinities<br><small>(REQUIRES DICE)</small>" },
            canClick() { return !player.tad.currentConversion.eq(2)},
            unlocked() { return true },
            onClick() {
                player.tad.currentConversion = new Decimal(2)
            },
            style() {
                let look = {width: "250px", minHeight: "100px", borderRadius: "0px", fontSize: "13px"}
                this.canClick() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        14: {
            title() { return "Stop<br>Conversions" },
            canClick() { return !player.tad.currentConversion.eq(-1)},
            unlocked() { return true },
            onClick() {
                player.tad.currentConversion = new Decimal(-1)
            },
            style() {
                let look = {width: "200px", minHeight: "75px", border: "2px solid #122727", borderRadius: "15px", fontSize: "16px"}
                this.canClick() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        15: {
            title() { return "<h2>BREAK THE BARRIER. KILL TAV.</h2><br><h3>1,000 of each alternate broken infinity type.</h3>" },
            canClick() { return player.tad.shatteredInfinities.gt(1000) && player.tad.corruptedInfinities.gt(1000) && player.tad.disfiguredInfinities.gt(1000) },
            unlocked() { return true },
            onClick() {
                player.in.unlockedBreak = true
                player.subtabs["tad"]['stuff'] = 'Main'
                player.tab = "po"
                player.subtabs["po"]["stuff"] = "Otherworldly Features"
            },
            style: { width: '500px', "min-height": '200px', borderRadius: '15px' },
        },
    },
    bars: {},
    upgrades: {
        11: {
            title: "Productive Provenance",
            unlocked() { return true },
            description() {return "First of each provenance's effects are boosted by ^1.1."},
            cost: new Decimal(20),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Shattered Infinities",
            currencyInternalName: "shatteredInfinities",
        },
        12:
        {
            title: "Fully Fueled Abilities",
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
            title: "Diced Automation",
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
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.shatteredInfinities},
            pay(amt) { player.tad.shatteredInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity Multiplier"
            },
            display() {
                return "which are multiplying infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Shattered Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        12: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.disfiguredInfinities},
            pay(amt) { player.tad.disfiguredInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Broken Infinity Multiplier"
            },
            display() {
                return "which are multiplying broken infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Disfigured Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        13: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.corruptedInfinities},
            pay(amt) { player.tad.corruptedInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(8).pow(1.4).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Antimatter Dimension Multiplier"
            },
            display() {
                return "which are boosting antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Corrupted Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        14: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.shatteredInfinities},
            pay(amt) { player.tad.shatteredInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5).pow(1.4).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tav Point Multiplier"
            },
            display() {
                return "which are multiplying tav point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Shattered Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        15: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.24) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.disfiguredInfinities},
            pay(amt) { player.tad.disfiguredInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(10).pow(1.5).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tav Essence Multiplier"
            },
            display() {
                return "which are multiplying tav essence gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Disfigured Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        16: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.16) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.corruptedInfinities},
            pay(amt) { player.tad.corruptedInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(50).pow(1.25).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Antidebuff Point Multiplier"
            },
            display() {
                return "which are multiplying antidebuff point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Corrupted Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        17: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.shatteredInfinities},
            pay(amt) { player.tad.shatteredInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.4).add(1) },
            unlocked() {return hasUpgrade("bi", 16)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Hex Mastery Multiplier"
            },
            display() {
                return "which are multiplying hex mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Shattered Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        18: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.disfiguredInfinities},
            pay(amt) { player.tad.disfiguredInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.4).add(1) },
            unlocked() {return hasUpgrade("bi", 16)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Rocket Fuel Mastery Multiplier"
            },
            display() {
                return "which are multiplying rocket fuel mastery gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Disfigured Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        19: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.corruptedInfinities},
            pay(amt) { player.tad.corruptedInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.4).add(1) },
            unlocked() {return hasUpgrade("bi", 16)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dice Mastery Multiplier"
            },
            display() {
                return "which are multiplying dice mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Corrupted Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        21: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.26) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.shatteredInfinities},
            pay(amt) { player.tad.shatteredInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.55).mul(0.1).add(1) },
            unlocked() {return hasUpgrade("bi", 16)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "IP Multiplier"
            },
            display() {
                return "which are multiplying IP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Shattered Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        22: {
            costBase() { return new Decimal(45) },
            costGrowth() { return new Decimal(1.28) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.disfiguredInfinities},
            pay(amt) { player.tad.disfiguredInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.07).add(1) },
            unlocked() {return hasUpgrade("bi", 16)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Negative Infinity Multiplier"
            },
            display() {
                return "which are multiplying NIP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Disfigured Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
        23: {
            costBase() { return new Decimal(60) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.tad.corruptedInfinities},
            pay(amt) { player.tad.corruptedInfinities = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.7).mul(0.2).add(1) },
            unlocked() {return hasUpgrade("bi", 16)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "All-Mastery Multiplier"
            },
            display() {
                return "which are multiplying all mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Corrupted Infinities"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#5E8D8D", backgroundImage: "linear-gradient(0deg, #b2d8d8, 50%, #094242 100%)", backgroundOrigin: "border-box"},
        },
    },
    milestones: {},
    challenges: {
        11: {
            name: "Tav's Domain",
            challengeDescription() { return "<h4>Debuffs explained in challenge!<h5>\nDoes an infinity reset and a negative infinity reset, and lose all infinities and milestones. (Also resets on leaving the challenge)" },
            goalDescription() { return "None" },
            goal() { return false },
            canComplete: function () { return false },
            rewardDescription: "New types of infinities!",
            unlocked() { return true },
            onEnter() {
                player.tad.domainResetPause = new Decimal(5)
                layers.in.bigCrunch();
            },
            onExit() {
                player.tad.domainResetPause = new Decimal(5)

                player.po.hex = false
                player.po.dice = false
                player.po.rocketFuel = false
                player.po.featureSlots = new Decimal(0)
                layers.in.bigCrunch();
            },
            style: { width: '350px', height: '275px', }

        },
    },
    domainReset() {
        player.ta.negativeInfinityPause = new Decimal(5)
        player.in.infinities = new Decimal(0)
        player.bi.brokenInfinities = new Decimal(0)
        if (!hasMilestone("ip", 26) && player.in.unlockedBreak) {
            for (let i = 0; i < player.ip.milestones.length; i++) {
                if (+player.ip.milestones[i] < 25) {
                    player.ip.milestones.splice(i, 1);
                    i--;
                }
            }
        }
    },
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "black", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["row", [["challenge", 11]]],
                ]
            },
            "Infinities": {
                buttonStyle() { return { color: "black", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", function () { return "Infinity Conversions" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ], {width: "750px", border: "3px solid #122727", borderBottom: "0px", backgroundColor: "#385555", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
                    ["style-row", [
                        ["style-column", [
                            ["clickable", 11],
                        ], {width: "248px", borderRight: "2px solid #122727"}],
                        ["style-column", [
                            ["clickable", 12],
                        ], {width: "248px", borderRight: "2px solid #122727"}],
                        ["style-column", [
                            ["clickable", 13],
                        ], {width: "250px"}],
                    ], {width: "750px", border: "3px solid #122727", backgroundColor: "#7AA6A6"}],
                    ["style-column", [
                        ["raw-html", function () { return "(You must be in Tav's domain to produce the alternate broken infinity types)" }, { "color": "white", "font-size": "17px", "font-family": "monospace", lineHeight: "1.5"}],
                        ["raw-html", function () { return "(You must be in ONLY ONE otherworldy feature to be able to produce as well.)" }, { "color": "white", "font-size": "17px", "font-family": "monospace", lineHeight: "1.5"}],
                        ["raw-html", function () { return "(Infinity types are produced on infinity reset.)" }, { "color": "white", "font-size": "17px", "font-family": "monospace", lineHeight: "1.5"}],    
                    ], {width: "750px", border: "3px solid #122727", borderTop: "0px", backgroundColor: "#385555", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 15px 15px"}],
                    ["blank", "25px"],
                    ["clickable", 14],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { color: "black", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["blank", "10px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],
                        ["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16],
                        ["ex-buyable", 17], ["ex-buyable", 18], ["ex-buyable", 19],
                        ["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23]], {maxWidth: "900px"}],
                ]
            },
            "THE BARRIER": {
                buttonStyle() { return { color: "black", borderRadius: "5px" } },
                unlocked() { return !player.in.unlockedBreak },
                content: [
                    ["blank", "10px"],
                    ["row", [["clickable", 15]]],
                ]
            },
        },
    },
    tabFormat: [
        ["style-column", [
            ["raw-html", function () { return "Broken Infinities: " + formatWhole(player.bi.brokenInfinities) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ], {width: "750px", border: "3px solid #122727", borderBottom: "0px", backgroundColor: "#385555", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
        ["style-row", [
            ["style-column", [
                ["style-column", [
                    ["raw-html", function () { return "Shattered Infinities" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                ], {width: "248px", height: "40px", borderBottom: "2px solid #122727"}],
                ["style-column", [
                    ["raw-html", function () { return formatWhole(player.tad.shatteredInfinities) }, { "color": "black", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(+" + formatWhole(player.tad.shatteredInfinitiesToGet) + ")" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],    
                ], {width: "248px", height: "60px"}],
            ], {width: "248px", borderRight: "2px solid #122727"}],
            ["style-column", [
                ["style-row", [
                    ["raw-html", function () { return "Disfigured Infinities" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                ], {width: "248px", height: "40px", borderBottom: "2px solid #122727"}],
                ["style-column", [
                    ["raw-html", function () { return formatWhole(player.tad.disfiguredInfinities) }, { "color": "black", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(+" + formatWhole(player.tad.disfiguredInfinitiesToGet) + ")" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],    
                ], {width: "248px", height: "60px"}],
            ], {width: "248px", borderRight: "2px solid #122727"}],
            ["style-column", [
                ["style-row", [
                    ["raw-html", function () { return "Corrupted Infinities" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                ], {width: "250px", height: "40px", borderBottom: "2px solid #122727"}],
                ["style-column", [
                    ["raw-html", function () { return formatWhole(player.tad.corruptedInfinities) }, { "color": "black", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(+" + formatWhole(player.tad.corruptedInfinitiesToGet) + ")" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],    
                ], {width: "250px", height: "60px"}],
            ], {width: "250px"}],
        ], {width: "750px", border: "3px solid #122727", backgroundColor: "#7AA6A6", borderRadius: "0px 0px 15px 15px"}],
        ["blank", "10px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return hasUpgrade("ta", 21) || hasMilestone("s", 19)}
})
