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
        reductionCooldown: new Decimal(0),

        //idea: just make it a single currency gain

        currentlySelectedSegment: -1,

        segmentGains: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],

        wheelPoints: new Decimal(0),
        wheelPointsEffect: new Decimal(1),
        wheelPointsEffect2: new Decimal(1),
        wheelPointsEffect3: new Decimal(1),
        wheelPointsMult: new Decimal(1),

        autoSpin: false,
        generateSpin: true,
    }},
    automate() {
        if (hasUpgrade("car", 17))
        {
            buyBuyable("wof", 11)
            buyBuyable("wof", 12)
            buyBuyable("wof", 13)
            buyBuyable("wof", 14)
            buyBuyable("wof", 15)
            buyBuyable("wof", 16)
        }
    },
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
    color: "#a6dec7",
    branches: ["cf",],
    update(delta) {
        player.wof.spinLength = new Decimal(10)
        player.wof.spinLength = player.wof.spinLength.div(buyableEffect("sm", 105))

        if (player.wof.spinActive)
        {
            player.wof.spinTimer = player.wof.spinTimer.add(delta) 
            player.wof.trueTimer = player.wof.trueTimer.add(delta) 

            if (player.wof.spinTimer.gte(0.2))
            {
                player.wof.currentlySelectedSegment = getRandomInt(8)
                player.wof.spinTimer = new Decimal(0)
            }
            if (player.wof.trueTimer.gte(player.wof.spinLength))
            {
                player.wof.wheelPoints = player.wof.wheelPoints.add(player.wof.segmentGains[player.wof.currentlySelectedSegment].mul(player.wof.wheelPointsMult))
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
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(player.wof.wheelsSpinned.pow(buyableEffect("sm", 104).pow(levelableEffect("car", 209)[0])).pow(0.65).add(1))
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(buyableEffect("wof", 13))
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(buyableEffect("cf", 24))
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(player.sm.chipsEffect[2])
        if (hasUpgrade("cbs", 12)) player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(upgradeEffect("cbs", 12))
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(levelableEffect("car", 208)[0])
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(buyableEffect("sme", 183))
        player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(buyableEffect("car", 32))
        if (player.zarDungeon.zarDefeated) player.wof.wheelPointsMult = player.wof.wheelPointsMult.mul(100)

        if (hasUpgrade("car", 12)) player.wof.wheelPoints = player.wof.wheelPoints.add(player.wof.wheelPointsMult.mul(Decimal.mul(delta, 0.25)))

        if (player.wof.autoSpin) {
            if (player.za.chancePoints.gte(player.wof.spinCost) && !player.wof.spinActive)
            {
                player.wof.spinPause = new Decimal(7)

                player.wof.spinActive = true
                player.wof.wheelsSpinned = player.wof.wheelsSpinned.add(1)
            }
        }
        
        if (player.wof.generateSpin) player.wof.wheelsSpinned = player.wof.wheelsSpinned.add(buyableEffect("sm", 112).mul(delta))

        player.wof.reductionCooldown = player.wof.reductionCooldown.sub(delta)
    },
    randomizeSegments() {
        for (let i = 0; i < 8; i++) {
            let luckChance = 0.9
            if (hasUpgrade("cs", 804)) luckChance = 0.8
            let random = Math.random()
            if (random < luckChance)
            {
                player.wof.segmentGains[i] = Decimal.add(1, Decimal.mul(Math.random(), 2))
            } else
            {
                player.wof.segmentGains[i] = Decimal.add(4, Decimal.mul(Math.random(), 8))  
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
            title() { return player.wof.autoSpin ? "Autospin: ON" : "Autospin: OFF" },
            canClick() { return true },
            unlocked() { return player.sm.buyables[107].gte(1) },
            onClick() {
                player.wof.autoSpin = !player.wof.autoSpin
            },
            style: {width: '300px', minHeight: '45px', color: "black", border: "2px solid #000000bf", borderRadius: "10px", backgroundImage: "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)" }
        },
        12: {
            title() { return player.wof.reductionCooldown.gt(0) ? "On cooldown...<br><small>" + formatTime(player.wof.reductionCooldown) + "</small>" : "Reduce wheels spun by /1.15<br><small>You suck at this game.</small>"},
            canClick() { return player.wof.reductionCooldown.lte(0) },
            unlocked() { return true },
            onClick() {
                player.wof.wheelsSpinned = player.wof.wheelsSpinned.div(1.15).floor()
                player.wof.reductionCooldown = new Decimal(2700)
            },
            style() {
                let look = {width: '300px', minHeight: '60px', border: "2px solid #000000bf", borderRadius: "10px" }
                if (this.canClick()) {
                    look.backgroundImage = "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)"
                    look.border = "2px solid black"
                    look.color = "black"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "2px solid #663737"
                    look.color = "white"
                }
                return look
            }
        },
        13: {
            title() { return player.wof.generateSpin ? "Passive Spin Gain: ON" : "Passive Spin Gain: OFF" },
            canClick() { return true },
            unlocked() { return player.sm.buyables[112].gte(1) },
            onClick() {
                if (!player.wof.generateSpin) player.wof.generateSpin = true
                else player.wof.generateSpin = false
            },
            style() {
                let look = {width: '300px', minHeight: '60px', border: "2px solid #000000bf", borderRadius: "10px" }
                if (this.canClick()) {
                    look.backgroundImage = "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)"
                    look.border = "2px solid black"
                    look.color = "black"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "2px solid #663737"
                    look.color = "white"
                }
                return look
            }
        },
        
        101: {
            title() { return "<h2>x" + format(player.wof.segmentGains[0]) + "</h2>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                let look = {width: '125px', "min-height": '125px', borderRadius: "15px 0px 0px 0px", borderTop: "3px solid black", borderLeft: "3px solid black"}
                if (player.wof.currentlySelectedSegment == 0) {
                    look.background = "linear-gradient(180deg, #709948 0%, #bbff78 50%, #709948 100%)"
                } else {
                    look.background = "linear-gradient(180deg, #1f7350 0%, #5abf95 50%, #1f7350 100%)"
                }
                return look                
            },
        },
        102: {
            title() { return "<h2>x" + format(player.wof.segmentGains[1]) + "</h2>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                let look = {width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 0px", borderTop: "3px solid black"}
                if (player.wof.currentlySelectedSegment == 1) {
                    look.background = "linear-gradient(180deg, #709948 0%, #bbff78 50%, #709948 100%)"
                } else {
                    look.background = "linear-gradient(180deg, #1f7350 0%, #5abf95 50%, #1f7350 100%)"
                }
                return look                
            },
        },
        103: {
            title() { return "<h2>x" + format(player.wof.segmentGains[2]) + "</h2>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                let look = {width: '125px', "min-height": '125px', borderRadius: "0px 15px 0px 0px", borderTop: "3px solid black", borderRight: "3px solid black"}
                if (player.wof.currentlySelectedSegment == 2) {
                    look.background = "linear-gradient(180deg, #709948 0%, #bbff78 50%, #709948 100%)"
                } else {
                    look.background = "linear-gradient(180deg, #1f7350 0%, #5abf95 50%, #1f7350 100%)"
                }
                return look                
            },
        },
        104: {
            title() { return "<h2>x" + format(player.wof.segmentGains[3]) + "</h2>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                let look = {width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 0px", borderLeft: "3px solid black"}
                if (player.wof.currentlySelectedSegment == 3) {
                    look.background = "linear-gradient(180deg, #709948 0%, #bbff78 50%, #709948 100%)"
                } else {
                    look.background = "linear-gradient(180deg, #1f7350 0%, #5abf95 50%, #1f7350 100%)"
                }
                return look                
            },
        },
        105: {
            title() { return "<h2>x" + format(player.wof.segmentGains[4]) + "</h2>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                let look = {width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 0px", borderRight: "3px solid black"}
                if (player.wof.currentlySelectedSegment == 4) {
                    look.background = "linear-gradient(180deg, #709948 0%, #bbff78 50%, #709948 100%)"
                } else {
                    look.background = "linear-gradient(180deg, #1f7350 0%, #5abf95 50%, #1f7350 100%)"
                }
                return look                
            },
        },
        106: {
            title() { return "<h2>x" + format(player.wof.segmentGains[5]) + "</h2>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                let look = {width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 15px", borderBottom: "3px solid black", borderLeft: "3px solid black"}
                if (player.wof.currentlySelectedSegment == 5) {
                    look.background = "linear-gradient(180deg, #709948 0%, #bbff78 50%, #709948 100%)"
                } else {
                    look.background = "linear-gradient(180deg, #1f7350 0%, #5abf95 50%, #1f7350 100%)"
                }
                return look                
            },
        },
        107: {
            title() { return "<h2>x" + format(player.wof.segmentGains[6]) + "</h2>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                let look = {width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 0px", borderBottom: "3px solid black"}
                if (player.wof.currentlySelectedSegment == 6) {
                    look.background = "linear-gradient(180deg, #709948 0%, #bbff78 50%, #709948 100%)"
                } else {
                    look.background = "linear-gradient(180deg, #1f7350 0%, #5abf95 50%, #1f7350 100%)"
                }
                return look                
            },
        },
        108: {
            title() { return "<h2>x" + format(player.wof.segmentGains[7]) + "</h2>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                let look = {width: '125px', "min-height": '125px', borderRadius: "0px 0px 15px 0px", borderBottom: "3px solid black", borderRight: "3px solid black"}
                if (player.wof.currentlySelectedSegment == 7) {
                    look.background = "linear-gradient(180deg, #709948 0%, #bbff78 50%, #709948 100%)"
                } else {
                    look.background = "linear-gradient(180deg, #1f7350 0%, #5abf95 50%, #1f7350 100%)"
                }
                return look                
            },
        },
        201: {
            title() { return "<h2>SPIN!!!</h2>"},
            tooltip() { return "<h5>Spin Length: " + format(player.wof.spinLength) + ". <h6>(I don't know what unit of measurement this is in, but it's probably seconds.)" },
            canClick() { return player.za.chancePoints.gte(player.wof.spinCost) && !player.wof.spinActive },
            unlocked() { return true },
            onClick() {
                layers.wof.randomizeSegments()
                player.wof.spinPause = new Decimal(7)

                player.wof.spinActive = true
                player.wof.wheelsSpinned = player.wof.wheelsSpinned.add(1)
                layers.wof.randomizeSegments()
            },
            style() {
                let look = {width: '125px', minHeight: '125px', border: "2px solid black", borderRadius: "0px" }
                if (this.canClick()) {
                    look.backgroundColor = "#a6dec7"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            }
        },
    },
    bars: {
        wheel: {
            unlocked: true,
            direction: RIGHT,
            width: 240,
            height: 30,
            progress() {
                return player.wof.trueTimer.div(player.wof.spinLength)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#3d8165"},
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
                if (mult != true && !hasUpgrade("car", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("car", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", background: "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)" }
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
                if (mult != true && !hasUpgrade("car", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("car", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", background: "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)" }
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
                if (mult != true && !hasUpgrade("car", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("car", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", background: "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)" }
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
                if (mult != true && !hasUpgrade("car", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("car", 17))this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", background: "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)" }
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
                if (mult != true && !hasUpgrade("car", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("car", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", background: "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)" }
        },
        16: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.wof.wheelPoints },
            pay(amt) { player.wof.wheelPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "You won't need that, right?"
            },
            display() {
                return 'which are reducing the coin flip divider cooldown by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", background: "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)" }
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
                    ["blank", "10px"],
                    ["style-column", [
                        ["style-row", [ //wheel
                            ["style-column", [
                                ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103],]],
                                ["row", [["clickable", 104], ["clickable", 201], ["clickable", 105],]],
                                ["row", [["clickable", 106], ["clickable", 107], ["clickable", 108],]],
                            ], {width: "400px", height: "250px", borderRadius: "0px"}],
                            ["style-column", [
                                ["blank", "3px"],
                                ["row", [ ["bar", "wheel"],]],
                                ["blank", "10px"],
                                ["style-row", [
                                    ["raw-html", function () { return "Spinning the wheel resets previous dice space content." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ], {padding: "6px"}],
                                ["raw-html", function () { return "Requires " + format(player.wof.spinCost) + " chance points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["blank", "10px"],
                                ["raw-html", function () { return "Wheels spun: " + formatWhole(player.wof.wheelsSpinned) + "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["raw-html", function () { return "<small>Boosts wheel point gain by x" + format(player.wof.wheelsSpinned.pow(buyableEffect("sm", 104)).pow(0.65).add(1)) + ".<br>(based on amount of wheel spins)</small>" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["blank", "10px"],
                                ["clickable", 11],
                                ["blank", "3px"],
                                ["clickable", 12],
                                ["blank", "3px"],
                                ["clickable", 13],
                            ], {width: "400px", height: "250px", borderRadius: "0px"}],
                        ], {width: "800px", height: "400px", background: "#00000000", borderRadius: "10px 10px 0px 0px"}],
                        ["style-row", [], {backgroundColor: "#5fc79cff", width: "100%", height: "3px"}],
                        ["style-row", [
                            ["top-column", [ //upgrades
                                ["blank", "6px"],
                                ["raw-html", function () { return "You have <h3>" + format(player.wof.wheelPoints) + "</h3> wheel points. (+" + format(player.wof.wheelPointsMult) + " base)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["raw-html", function () { return "<small>Boosts chance point gain by x" + format(player.wof.wheelPointsEffect) + ".</small>" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["raw-html", function () { return "<small>Extends chance point softcap by x" + format(player.wof.wheelPointsEffect2) + ".</small>" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["raw-html", function () { return "<small>Boosts heads and tails gain by x" + format(player.wof.wheelPointsEffect3) + ".</small>" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["blank", "6px"],
                                ["row", [
                                    ["layerColor-dark-buyable", 11],
                                    ["blank", "3px", {width: "3px"}],
                                    ["layerColor-dark-buyable", 12],
                                    ["blank", "3px", {width: "3px"}],
                                    ["layerColor-dark-buyable", 13],
                                    ["blank", "3px", {width: "3px"}],
                                    ["layerColor-dark-buyable", 14],
                                ]],
                                    ["blank", "3px", {width: "3px"}],
                                ["row", [
                                    ["layerColor-dark-buyable", 15],
                                    ["blank", "3px", {width: "3px"}],
                                    ["layerColor-dark-buyable", 16],
                                ]],
                            ], {width: "800px", height: "475px", background: "#0000005f", borderRadius: "0px 0px 10px 10px"}],
                        ]]
                    ], {background: "linear-gradient(105deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)", border: "3px solid #5fc79cff",  borderRadius: "13px"}],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 13) && !player.sma.inStarmetalChallenge},
    hotkeys: [
        {
            key: "w", 
            description: "Spin Wheel",
            onPress() {
                clickClickable(this.layer, 21)
            },
        }
	]
})
