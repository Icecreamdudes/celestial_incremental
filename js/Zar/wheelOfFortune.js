addLayer("wof", {
    name: "Wheel of Fortune", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>WOF", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        wheelsSpinned: new Decimal(0),
        spinCost: new Decimal(10000),

        spinLength: new Decimal(10),
        spinTimer: new Decimal(0),
        trueTimer: new Decimal(0),
        spinPause: new Decimal(0),

        //idea: just make it a single currency gain

        currentlySelectedSegment: -1,

        segmentGains: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        wheelPoints: new Decimal(0),
        wheelPointsEffect: new Decimal(1),
        wheelPointsEffect2: new Decimal(1),
        wheelPointsEffect3: new Decimal(1),
        wheelPointsMult: new Decimal(1),

        autoSpin: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(105deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)",
            "background-origin": "border-box",
            "border-color": "#5fc79cff",
            "color": "#5fc79cff",
            borderRadius: "4px",
            transform: "translateX(50px)"
        }
    },
    tooltip: "Wheel of Fortune",
    color: "#3d8165ff",
    branches: ["cf",],
    update(delta) {
        player.wof.spinLength = new Decimal(10)
        player.wof.spinLength = player.wof.spinLength.div(buyableEffect("sm", 105))

        if (player.wof.spinActive)
        {
            player.wof.spinTimer = player.wof.spinTimer.add(delta) 
            player.wof.trueTimer = player.wof.trueTimer.add(delta) 

            if (player.wof.trueTimer.lt(0.1))
            {
                layers.wof.randomizeSegments()
            }
            if (player.wof.spinTimer.gte(0.2))
            {
                player.wof.currentlySelectedSegment = getRandomInt(8)
                player.wof.spinTimer = new Decimal(0)
            }
            if (player.wof.trueTimer.gte(player.wof.spinLength))
            {
                player.wof.wheelPoints = player.wof.wheelPoints.add(player.wof.segmentGains[player.wof.currentlySelectedSegment])
                player.wof.spinActive = false

                    let guarantee = buyableEffect("sm", 106).div(100).floor()
                    let chance = buyableEffect("sm", 106).sub(guarantee.mul(100))
                    if (chance.gte(Math.random())) {
                        guarantee = guarantee.add(1)
                        chance = new Decimal(0)
                    }
                    if (guarantee.gt(0)) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(guarantee);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        doPopup("none", "+" + formatWhole(guarantee) + " Evolution Shard!", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                        if (player.tab == "wof") makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 560, y: 550, text: "Evolution Shards Earned!"})
                    }
                    player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(chance);

                player.wof.trueTimer = new Decimal(0)
            }
        }

        if (player.wof.wheelsSpinned.lt(20)) player.wof.spinCost = player.wof.wheelsSpinned.pow(1.5).add(1).mul(10000)
        if (player.wof.wheelsSpinned.gte(20)) player.wof.spinCost = player.wof.wheelsSpinned.pow(2.25).add(1).mul(10000)
        if (player.wof.wheelsSpinned.gte(150)) player.wof.spinCost = player.wof.wheelsSpinned.mul(5).pow(5).add(1).mul(10000)
        if (player.wof.wheelsSpinned.gte(250)) player.wof.spinCost = player.wof.wheelsSpinned.mul(5).pow(10).add(1).mul(10000)
        player.wof.spinCost = player.wof.spinCost.div(buyableEffect("cf", 34))

        player.wof.spinPause = player.wof.spinPause.sub(1)
        if (player.wof.spinPause.gte(0)) {
            layers.wof.spinWheel();
        }

        //wheel points
        player.wof.wheelPointsEffect = player.wof.wheelPoints.pow(0.5).add(1)
        player.wof.wheelPointsEffect2 = player.wof.wheelPoints.pow(0.4).div(2).add(1)
        player.wof.wheelPointsEffect3 = player.wof.wheelPoints.pow(0.3).div(2).add(1)

        player.wof.wheelPointsMult = new Decimal(1)
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(player.wof.wheelsSpinned.pow(buyableEffect("sm", 104)).pow(0.65).add(1))
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(buyableEffect("wof", 13))
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(buyableEffect("cf", 24))
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(player.sm.chipsEffect[2])
        if (hasUpgrade("cbs", 12)) player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(upgradeEffect("cbs", 12))

        if (player.wof.autoSpin) {
            if (player.za.chancePoints.gte(player.wof.spinCost) && !player.wof.spinActive)
            {
                player.wof.spinPause = new Decimal(7)

                player.wof.spinActive = true
                player.wof.wheelsSpinned = player.wof.wheelsSpinned.add(1)
            }
        }
    },
    randomizeSegments() {
        for (let i = 0; i < 8; i++) {
            let random = Math.random()
            if (random < 0.9)
            {
                player.wof.segmentGains[i] = Decimal.mul(Decimal.add(1, Decimal.mul(Math.random(), 2)), player.wof.wheelPointsMult)   
            } else
            {
                player.wof.segmentGains[i] = Decimal.mul(Decimal.add(5, Decimal.mul(Math.random(), 10)), player.wof.wheelPointsMult)      
            }
        }
    },
    spinWheel() {
        //reets everything before unlocking WOF
        player.za.chancePoints = new Decimal(0)

        player.cf.coinsFlipped = new Decimal(0)
        player.cf.heads = new Decimal(0)
        player.cf.tails = new Decimal(0)

        try {
            if (typeof window !== 'undefined' && !window.__cfInitDone) {
                // clear any leftover timeout id (might be present from a saved object)
                if (player.cf && player.cf._flipTimeoutId) {
                    try { clearTimeout(player.cf._flipTimeoutId) } catch (e) {}
                    player.cf._flipTimeoutId = null
                }

                // reset runtime flip state so the coin isn't mid-flip on a reload
                if (player.cf) {
                    player.cf.flipping = false
                    player.cf.flipTimer = new Decimal(0)
                    player.cf.coinHeads = true
                    player.cf._finalSide = null
                }

                window.__cfInitDone = true
            }
        } catch (e) { console.error("cf update init error:", e) }

        player.cf.buyables[11] = new Decimal(0)
        player.cf.buyables[12] = new Decimal(0)
        player.cf.buyables[13] = new Decimal(0)
        player.cf.buyables[14] = new Decimal(0)
        player.cf.buyables[21] = new Decimal(0)
        player.cf.buyables[22] = new Decimal(0)
        player.cf.buyables[23] = new Decimal(0)
        player.cf.buyables[31] = new Decimal(0)
        player.cf.buyables[32] = new Decimal(0)
        player.cf.buyables[33] = new Decimal(0)
        player.cf.buyables[34] = new Decimal(0)
    },
    clickables: {
        11: {
            title() { return "+" + format(player.wof.segmentGains[0]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 0 ? {width: '125px', "min-height": '125px', borderRadius: "15px 0px 0px 0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "15px 0px 0px 0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        12: {
            title() { return "+" + format(player.wof.segmentGains[1]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 1 ? {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        13: {
            title() { return "+" + format(player.wof.segmentGains[2]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 2 ? {width: '125px', "min-height": '125px', borderRadius: "0px 15px 0px 0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px 15px 0px 0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        14: {
            title() { return "+" + format(player.wof.segmentGains[3]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 3 ? {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        15: {
            title() { return "+" + format(player.wof.segmentGains[4]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 4 ? {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        16: {
            title() { return "+" + format(player.wof.segmentGains[5]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 5 ? {width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 15px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 15px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        17: {
            title() { return "+" + format(player.wof.segmentGains[6]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 6 ? {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        18: {
            title() { return "+" + format(player.wof.segmentGains[7]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 7 ? {width: '125px', "min-height": '125px', borderRadius: "0px 0px 15px 0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px 0px 15px 0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },

        21: {
            title() { return "SPIN!"},
            tooltip() { return "<h5>Spin Length: " + format(player.wof.spinLength) + ". <h6>(I don't know what unit of measurement this is in, but it's probably seconds.)" },
            canClick() { return player.za.chancePoints.gte(player.wof.spinCost) },
            unlocked() { return true },
            onClick() {
                player.wof.spinPause = new Decimal(7)

                player.wof.spinActive = true
                player.wof.wheelsSpinned = player.wof.wheelsSpinned.add(1)
            },
            style() { 
                return { width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 0px", border: "3px solid #0f221aff", backgroundColor: "3d8165ff" }
            },
        },
        22: {
            title() { return "Do a wheel reset, but gain no rewards."},
            tooltip() { return "<h5>You suck at this game" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.wof.spinPause = new Decimal(7)
            },
            style() { 
                return { width: '250px', "min-height": '75px', borderRadius: "15px 15px 15px 15px", border: "3px solid #0f221aff", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
            },
        },
        23: {
            title() { return player.wof.autoSpin ? "Autospin: ON" : "Autospin: OFF" },
            canClick() { return true },
            unlocked() { return player.sm.buyables[107].gte(1) },
            onClick() {
                if (!player.wof.autoSpin) player.wof.autoSpin = true
                else player.wof.autoSpin = false
            },
            style() { 
                return { width: '250px', "min-height": '75px', borderRadius: "15px 15px 15px 15px", border: "3px solid #0f221aff", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
            },
        },
    },
    bars: {
        wheel: {
            unlocked: true,
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.wof.trueTimer.div(player.wof.spinLength)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#3d8165ff"},
            textStyle: {fontSize: "14px"},
            display() {
                return player.wof.spinActive ? "Wheel is being spun..." : "Spin the wheel!";
            },
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.wof.wheelPoints },
            pay(amt) { player.wof.wheelPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Booster on both sides... Equality... How boring."
            },
            display() {
                return 'which are boosting both heads and tails gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Wheel Points'
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
            style: { width: '194px', height: '225px', color: "black", backgroundImage: "linear-gradient(120deg, #144b34ff 0%, #3d8165ff 100%)" }
        },
        12: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.wof.wheelPoints },
            pay(amt) { player.wof.wheelPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Are there buyables just repeating themselves?"
            },
            display() {
                return 'which are dividing coin flip length by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Wheel Points'
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
            style: { width: '194px', height: '225px', color: "black", backgroundImage: "linear-gradient(120deg, #144b34ff 0%, #3d8165ff 100%)" }
        },
        13: {
            costBase() { return new Decimal(7) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.wof.wheelPoints },
            pay(amt) { player.wof.wheelPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Why does everything have to be self synergy?"
            },
            display() {
                return 'which are boosting wheel point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Wheel Points'
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
            style: { width: '194px', height: '225px', color: "black", backgroundImage: "linear-gradient(120deg, #144b34ff 0%, #3d8165ff 100%)" }
        },
        14: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.wof.wheelPoints },
            pay(amt) { player.wof.wheelPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Everything gets softcapped hehe"
            },
            display() {
                return 'which are extending heads and tails softcap by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Wheel Points'
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
            style: { width: '194px', height: '225px', color: "black", backgroundImage: "linear-gradient(120deg, #144b34ff 0%, #3d8165ff 100%)" }
        },
        15: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(15) },
            currency() { return player.wof.wheelPoints },
            pay(amt) { player.wof.wheelPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.div(1, getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.15).add(1)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "I love softcaps!"
            },
            display() {
                return 'which are weakening the chance point softcap by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Wheel Points'
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
            style: { width: '194px', height: '225px', color: "black", backgroundImage: "linear-gradient(120deg, #144b34ff 0%, #3d8165ff 100%)" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],

                    ["style-row", [
                    ["style-column", [ //wheel 
                    ["blank", "10px"],
                    ["row", [["clickable", 22],]],
                    ["blank", "10px"],
                    ["bar", "wheel"],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Requires " + format(player.wof.spinCost) + " chance points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Spinning the wheel resets previous dice space content." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13],]],
                    ["row", [["clickable", 14], ["clickable", 21], ["clickable", 15],]],
                    ["row", [["clickable", 16], ["clickable", 17], ["clickable", 18],]],
                    ["blank", "10px"],
                    ["raw-html", function () { return player.sm.buyables[106].gte(1) ? "<h5>ESC: " + format(buyableEffect("sm", 106).mul(100)) + "%" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h6>Mult: " + format(player.wof.wheelPointsMult) + "x. (also based on amount of wheel spins)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h6>Wheels spinned: " + formatWhole(player.wof.wheelsSpinned) + "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ], {width: "600px", height: "700px", background: "rgba(5, 80, 28, 0.5)", border: "0px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "15px 0px 0px 15px"}],

                    
                    ["style-column", [ 
                    ["style-column", [ 
                    ["raw-html", function () { return "You have <h3>" + format(player.wof.wheelPoints) + "</h3> wheel points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Boosts chance point gain by x" + format(player.wof.wheelPointsEffect) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Extends chance point softcap by x" + format(player.wof.wheelPointsEffect2) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Boosts heads and tails gain by x" + format(player.wof.wheelPointsEffect3) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "597px", height: "100px", background: "rgba(34, 124, 61, 0.5)", border: "3px solid #ccc",  borderBottom: "0px", borderTop: "0px", borderRadius: "0px 15px 0px 0px"}],
                    ["style-column", [ 
                    ["blank", "12.5px"],
                    ["row", [["clickable", 23],]],
                    ["blank", "12.5px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],]],
                    ["row", [["ex-buyable", 14], ["ex-buyable", 15],]],
                    ], {width: "600px", height: "600px", background: "rgba(34, 124, 61, 0.5)", border: "3px solid #ccc", borderRight: "0px", borderRadius: "0px 0px 15px 0px"}],
                    ], {width: "600px", height: "700px", background: "rgba(34, 124, 61, 0.5)", border: "0px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "0px 15px 15px 0px"}],
                    ], {width: "1200px", height: "700px", background: "rgba(34, 124, 61, 0)", border: "3px solid #ccc", borderRadius: "15px"}],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 13) && !player.sma.inStarmetalChallenge}
})
