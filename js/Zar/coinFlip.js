addLayer("cf", {
    name: "Coin Flip", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>CF", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        heads: new Decimal(0),
        headsEffect: new Decimal(1),
        headsEffect2: new Decimal(1),
        headsToGet: new Decimal(0),

        tails: new Decimal(0),
        tailsEffect: new Decimal(1),
        tailsEffect2: new Decimal(1),
        tailsToGet: new Decimal(0),

        coinHeads: true, //tails if false
        flipLength: new Decimal(5), //how long the coin flip lasts (seconds)
        flipTimer: new Decimal(0), // elapsed flip time (seconds)

        // runtime-only state
        flipping: false,
        _flipTimeoutId: null,
        _finalSide: null,

        flipCost: new Decimal(10),
        coinsFlipped: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(105deg, #80613fff 0%, #9c5d4aff 74%)",
            "background-origin": "border-box",
            "border-color": "#f5b678ff",
            "color": "#241b12ff",
            borderRadius: "4px",
            transform: "translateX(-50px)"
        }
    },
    tooltip: "Coin Flip",
    color: "#80613fff",
    branches: ["za",],
    update(delta) {
        // one-time client-side reset after a page load to clear any saved timers
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

        // keep a sensible default
        player.cf.flipLength = new Decimal(5)
        player.cf.flipLength = player.cf.flipLength.div(buyableEffect("cf", 32))

        //heads
        player.cf.headsToGet = new Decimal(1)
        player.cf.headsToGet = player.cf.headsToGet.mul(player.cf.tailsEffect2)
        player.cf.headsToGet = player.cf.headsToGet.mul(buyableEffect("cf", 11))
        player.cf.headsToGet = player.cf.headsToGet.mul(buyableEffect("cf", 21))
        player.cf.headsToGet = player.cf.headsToGet.mul(player.wof.wheelPointsEffect3)

        player.cf.headsEffect = player.cf.heads.pow(0.65).add(1).pow(buyableEffect("cf", 14))
        player.cf.headsEffect2 = player.cf.heads.div(10).pow(0.25).add(1).pow(buyableEffect("cf", 14))
  
        //tails
        player.cf.tailsToGet = new Decimal(1)
        player.cf.tailsToGet = player.cf.tailsToGet.mul(player.cf.headsEffect2)
        player.cf.tailsToGet = player.cf.tailsToGet.mul(buyableEffect("cf", 11))
        player.cf.tailsToGet = player.cf.tailsToGet.mul(buyableEffect("cf", 31))
        player.cf.tailsToGet = player.cf.tailsToGet.mul(player.wof.wheelPointsEffect3)

        player.cf.tailsEffect = player.cf.tails.pow(0.5).add(1).pow(buyableEffect("cf", 14))
        player.cf.tailsEffect2 = player.cf.tails.div(10).pow(0.25).add(1).pow(buyableEffect("cf", 14))

        //flip prices
        if (player.cf.coinsFlipped.lt(25)) player.cf.flipCost = player.cf.coinsFlipped.pow(1.5).div(3).add(1).mul(10)
        if (player.cf.coinsFlipped.gte(25)) player.cf.flipCost = player.cf.coinsFlipped.pow(2.25).div(3).add(1).mul(10)
        player.cf.flipCost = player.cf.flipCost.div(buyableEffect("cf", 22))

    },
    clickables: {
        11: {
            title() { return player.cf.coinHeads ? "<img src='resources/coinHeads.png'style='width:150px;height:150px;margin:-35px;'></img>" : "<img src='resources/coinTails.png'style='width:150px;height:150px;margin:-35px'></img>"},
            canClick() { return !player.cf.flipping && player.za.chancePoints.gte(player.cf.flipCost)},
            tooltip() { return "<h5>Flip Length: " + format(player.cf.flipLength) + ". <h6>(I don't know what unit of measurement this is in, but it's probably seconds.)" },
            unlocked() { return true },
            onClick() {
                layers.cf.coinFlip();

                player.za.chancePoints = player.za.chancePoints.sub(player.cf.flipCost)

                player.cf.coinsFlipped = player.cf.coinsFlipped.add(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '100px', "min-height": '100px', borderRadius: "1000px", backgroundColor: "#202020ff", borderColor: "#000000ff", color: "#ffffff" },
        },
    },
    coinFlip() {
        // Run a decaying-rate visible toggle until the flip ends, updating player.cf.flipTimer
        try {
            // prevent double-start
            if (player.cf.flipping) return

            // clear any existing timeout
            if (player.cf._flipTimeoutId) {
                clearTimeout(player.cf._flipTimeoutId)
                player.cf._flipTimeoutId = null
            }

            // length in seconds
            let L = (player.cf.flipLength && player.cf.flipLength.toNumber) ? player.cf.flipLength.toNumber() : 5
            if (!isFinite(L) || L <= 0) L = 5

            const r0 = 25 // starting flips/sec
            const r1 = 0.5 // ending flips/sec

            const startTS = Date.now()
            const endTS = startTS + L * 1000

            player.cf.flipping = true
            player.cf.flipTimer = new Decimal(0)

            // choose and store the final side now to ensure an unbiased 50/50 outcome
            player.cf._finalSide = Math.random() < 0.5

            const tick = () => {
                const now = Date.now()
                const elapsedMs = now - startTS
                const msLeft = Math.max(0, endTS - now)

                // update elapsed timer (seconds)
                player.cf.flipTimer = Decimal.min(player.cf.flipLength, new Decimal(elapsedMs / 1000))

                if (msLeft <= 0) {
                    // finish: settle on the pre-determined final side (fair 50/50)
                    player.cf.coinHeads = !!player.cf._finalSide

                    // award heads or tails amount
                    try {
                        if (player.cf.coinHeads) {
                            player.cf.heads = player.cf.heads.add(player.cf.headsToGet)
                        } else {
                            player.cf.tails = player.cf.tails.add(player.cf.tailsToGet)
                        }
                    } catch (e) { console.error('award error', e) }

                    player.cf.flipping = false
                    if (player.cf._flipTimeoutId) {
                        clearTimeout(player.cf._flipTimeoutId)
                        player.cf._flipTimeoutId = null
                    }
                    // ensure bar shows full
                    player.cf.flipTimer = new Decimal(L)
                    // clear final-side marker
                    player.cf._finalSide = null
                    return
                }

                const frac = msLeft / (L * 1000) // 1 -> 0
                const currentRate = r1 + (r0 - r1) * (frac * frac)

                // visible toggle
                player.cf.coinHeads = !player.cf.coinHeads

                // schedule next tick
                let delay = 1000 / Math.max(currentRate, 0.0001)
                delay = Math.max(10, Math.min(2000, delay))

                player.cf._flipTimeoutId = setTimeout(tick, delay)
            }

            // start immediately with a random initial side
            player.cf.coinHeads = Math.random() < 0.5
            player.cf._flipTimeoutId = setTimeout(tick, 0)
        } catch (e) {
            console.error("coinFlip error:", e)
            player.cf.flipping = false
            if (player.cf._flipTimeoutId) {
                clearTimeout(player.cf._flipTimeoutId)
                player.cf._flipTimeoutId = null
            }
        }
    },
    bars: {
        coinFlip: {
            unlocked: true,
            direction: RIGHT,
            width: 300,
            height: 30,
            progress() {
                return player.cf.flipTimer.div(player.cf.flipLength)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#683e31ff"},
            textStyle: {fontSize: "14px"},
            display() {
                return player.cf.flipping ? "Coin is being flipped..." : "Flip the coin!";
            },
        },
    },
    upgrades: {

    },
    buyables: {
        11: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Booster on both sides??? Equality! How fun!!!"
            },
            display() {
                return 'which are boosting both heads and tails gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
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
            style: { width: '192px', height: '221px', color: "black", backgroundImage: "linear-gradient(120deg, #474747ff 0%, #8d8d8dff 100%)" }
        },
        12: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.35).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Boosting itself... How lame :("
            },
            display() {
                return 'which are boosting chance points by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
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
            style: { width: '192px', height: '221px', color: "black", backgroundImage: "linear-gradient(120deg, #474747ff 0%, #8d8d8dff 100%)" }
        },
        13: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.15).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Extending softcap eh?"
            },
            display() {
                return 'which are extending the chance points softcap by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
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
            style: { width: '192px', height: '221px', color: "black", backgroundImage: "linear-gradient(120deg, #474747ff 0%, #8d8d8dff 100%)" }
        },
        14: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Making everything more powerful I guess."
            },
            display() {
                return 'which are raising heads and tails effects by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
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
            style: { width: '192px', height: '221px', color: "black", backgroundImage: "linear-gradient(120deg, #474747ff 0%, #8d8d8dff 100%)" }
        },

        //heads
        21: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cf.heads },
            pay(amt) { player.cf.heads = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.2).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Heads > Tails (I'm not biased because my symbol is on it)."
            },
            display() {
                return 'which are boosting heads gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Heads'
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
            style: { width: '192px', height: '221px', color: "black", backgroundImage: "linear-gradient(120deg, rgb(129, 112, 93) 0%, rgb(156, 93, 74) 100%)" }
        },
        22: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cf.heads },
            pay(amt) { player.cf.heads = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Let me flip more coins please!"
            },
            display() {
                return 'which dividing coin flip cost by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Heads'
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
            style: { width: '192px', height: '221px', color: "black", backgroundImage: "linear-gradient(120deg, rgb(129, 112, 93) 0%, rgb(156, 93, 74) 100%)" }
        },
        
        //tails
        31: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cf.tails },
            pay(amt) { player.cf.tails = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.2).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Bruh why is Iridite even the symbol for tails I hate her"
            },
            display() {
                return 'which are boosting tails gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Tails'
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
            style: { width: '192px', height: '221px', color: "black", backgroundImage: "linear-gradient(120deg, rgb(129, 112, 93) 0%, rgb(156, 93, 74) 100%)" }
        },
        32: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.8) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.cf.tails },
            pay(amt) { player.cf.tails = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Let me flip coins faster!"
            },
            display() {
                return 'which dividing coin flip length by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Tails'
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
            style: { width: '192px', height: '221px', color: "black", backgroundImage: "linear-gradient(120deg, rgb(129, 112, 93) 0%, rgb(156, 93, 74) 100%)" }
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
                    //make any of the columns scrollable when needed

                    ["blank", "25px"],
                    ["style-row", [
                    ["style-column", [ //heads
                    ["style-column", [ 
                    ["raw-html", function () { return "You have <h3>" + format(player.cf.heads) + "</h3> heads. (+" + format(player.cf.headsToGet) + ")" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Boosts chance points by x" + format(player.cf.headsEffect) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Boosts tails gain by x" + format(player.cf.headsEffect2) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "400px", height: "97px", background: "rgb(129, 112, 93, 0.5)", border: "3px solid #ccc", borderBottom: "0px", borderTop: "0px", borderLeft: "0px", borderRadius: "15px 0px 0px 0px"}],   
                    ["style-column", [ 
                    ["row", [["ex-buyable", 21],["ex-buyable", 22],]],
                    ], {width: "400px", height: "600px", background: "rgb(129, 112, 93, 0.5)", border: "3px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "0px 0px 0px 15px"}],  
                    ], {width: "400px", height: "700px", background: "rgb(129, 112, 93, 0.5)", border: "0px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "15px 0px 0px 15px"}],
                    
                    
                    ["style-column", [ //coin
                    ["style-column", [ 
                    ["row", [ ["bar", "coinFlip"],]],
                    ["blank", "5px"],
                    ["raw-html", function () { return player.cf.coinHeads ? "Coin is currently heads." : "Coin is currently tails." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Coins flipped: " + formatWhole(player.cf.coinsFlipped) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Cost to flip coin: " + format(player.cf.flipCost) + " Chance Points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [ ["clickable", 11],]],
                    ], {width: "394px", height: "247px", background: "rgb(156, 93, 74, 0.5)", border: "0px solid #ccc",   borderRadius: "0px"}],
                    ["style-column", [ 
                    ["row", [["ex-buyable", 11],["ex-buyable", 12],]],
                    ["row", [["ex-buyable", 13],["ex-buyable", 14],]],
    
                    ], {width: "394px", height: "450px", background: "rgb(156, 93, 74, 0.5)", border: "3px solid #ccc", borderBottom: "0px", borderRight: "0px", borderLeft: "0px", borderRadius: "0px"}],
                    ], {width: "394px", height: "700px", background: "rgb(156, 93, 74, 0.5)", border: "3px solid #ccc",  borderRadius: "0px"}],


                    ["style-column", [ //tails
                    ["style-column", [ 
                    ["raw-html", function () { return "You have <h3>" + format(player.cf.tails) + "</h3> tails. (+" + format(player.cf.tailsToGet) + ")" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Extends chance point softcap by x" + format(player.cf.tailsEffect) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Boosts heads gain by x" + format(player.cf.tailsEffect2) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "400px", height: "97px", background: "rgb(128, 87, 54, 0.5)", border: "3px solid #ccc",  borderBottom: "0px", borderTop: "0px", borderLeft: "0px", borderRadius: "15px 15px 0px 15px"}],
                    ["style-column", [ 
                    ["row", [["ex-buyable", 31],["ex-buyable", 32],]],



                    ], {width: "400px", height: "600px", background: "rgb(128, 87, 54, 0.5)", border: "3px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "0px 0px 15px 0px"}],
                    ], {width: "400px", height: "700px", background: "rgb(128, 87, 54, 0.5)", border: "0px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "0px 15px 15px 0px"}],
                    ], {width: "1200px", height: "700px", background: "rgb(129, 112, 93, 0.5)", border: "3px solid #ccc", borderRadius: "15px"}],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],

        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 12) && !player.sma.inStarmetalChallenge}
})
