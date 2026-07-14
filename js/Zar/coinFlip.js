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
        flipDelay: 0, // flip delay (seconds) tracked for the coin flip animation

        // runtime-only state
        flipping: false,
        _flipTimeoutId: null,
        _finalSide: null,

        flipCost: new Decimal(10),
        coinsFlipped: new Decimal(0),
        reductionCooldown: new Decimal(0),

        autoFlip: false,
        coinExploit: new Decimal(0),

        //softcap
        headsSoftcapStart: new Decimal(10000),
        headsSoftcapEffect: new Decimal(1),

        tailsSoftcapStart: new Decimal(10000),
        tailsSoftcapEffect: new Decimal(1),
    }},
    automate() {
        if (player.sm.buyables[103].gte(1))
        {
            buyBuyable("cf", 11)
            buyBuyable("cf", 12)
            buyBuyable("cf", 13)
            buyBuyable("cf", 14)
            buyBuyable("cf", 21)
            buyBuyable("cf", 22)
            buyBuyable("cf", 23)
            buyBuyable("cf", 24)
            buyBuyable("cf", 31)
            buyBuyable("cf", 32)
            buyBuyable("cf", 33)
            buyBuyable("cf", 34)
        }
    },
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
    color: "#f5b678ff",
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
        player.cf.flipLength = player.cf.flipLength.div(buyableEffect("wof", 12))

        player.cf.headsSoftcapStart = new Decimal(10000)
        player.cf.headsSoftcapStart = player.cf.headsSoftcapStart.mul(buyableEffect("wof", 14))
        player.cf.headsSoftcapStart = player.cf.headsSoftcapStart.mul(buyableEffect("cf", 33))
        player.cf.headsSoftcapStart = player.cf.headsSoftcapStart.mul(player.sm.chipsEffect[1])
        player.cf.headsSoftcapStart = player.cf.headsSoftcapStart.mul(levelableEffect("car", 205)[0])
        player.cf.headsSoftcapStart = player.cf.headsSoftcapStart.pow(buyableEffect("sm", 116))

        player.cf.headsSoftcapStart = player.cf.headsSoftcapStart.pow(buyableEffect("sm", 111))

        if (player.cf.heads.gte(player.cf.headsSoftcapStart))
        {
            player.cf.headsSoftcapEffect = player.cf.heads.sub(player.cf.headsSoftcapStart).pow(0.35).add(1)
            if (hasUpgrade("cbs", 16)) player.cf.headsSoftcapEffect = player.cf.headsSoftcapEffect.pow(upgradeEffect("cbs", 16)[0])
        } else
        {
            player.cf.headsSoftcapEffect = new Decimal(1)
        }


        player.cf.tailsSoftcapStart = new Decimal(10000)
        player.cf.tailsSoftcapStart = player.cf.tailsSoftcapStart.mul(buyableEffect("wof", 14))
        player.cf.tailsSoftcapStart = player.cf.tailsSoftcapStart.mul(buyableEffect("cf", 23))
        player.cf.tailsSoftcapStart = player.cf.tailsSoftcapStart.mul(player.sm.chipsEffect[1])
        player.cf.tailsSoftcapStart = player.cf.tailsSoftcapStart.mul(levelableEffect("car", 207)[0])
        player.cf.tailsSoftcapStart = player.cf.tailsSoftcapStart.pow(buyableEffect("sm", 116))

        player.cf.tailsSoftcapStart = player.cf.tailsSoftcapStart.pow(buyableEffect("sm", 111))


        if (player.cf.tails.gte(player.cf.tailsSoftcapStart))
        {
            player.cf.tailsSoftcapEffect = player.cf.tails.sub(player.cf.tailsSoftcapStart).pow(0.35).add(1)
            if (hasUpgrade("cbs", 16)) player.cf.tailsSoftcapEffect = player.cf.tailsSoftcapEffect.pow(upgradeEffect("cbs", 16)[1])
        } else
        {
            player.cf.tailsSoftcapEffect = new Decimal(1)
        }
        //heads
        player.cf.headsToGet = new Decimal(1)
        player.cf.headsToGet = player.cf.headsToGet.mul(player.cf.tailsEffect2)
        player.cf.headsToGet = player.cf.headsToGet.mul(buyableEffect("cf", 11))
        player.cf.headsToGet = player.cf.headsToGet.mul(buyableEffect("cf", 21))
        player.cf.headsToGet = player.cf.headsToGet.mul(player.wof.wheelPointsEffect3)
        player.cf.headsToGet = player.cf.headsToGet.mul(buyableEffect("wof", 11))
        player.cf.headsToGet = player.cf.headsToGet.mul(player.sm.chipsEffect[1])
        player.cf.headsToGet = player.cf.headsToGet.mul(buyableEffect("sm", 101))
        player.cf.headsToGet = player.cf.headsToGet.mul(levelableEffect("car", 204)[0])
        player.cf.headsToGet = player.cf.headsToGet.mul(buyableEffect("sme", 182))
        player.cf.headsToGet = player.cf.headsToGet.mul(buyableEffect("car", 22))
        
        player.cf.headsToGet = player.cf.headsToGet.div(player.cf.headsSoftcapEffect)

        player.cf.headsEffect = player.cf.heads.pow(0.65).add(1).pow(buyableEffect("cf", 14))
        player.cf.headsEffect2 = player.cf.heads.div(10).pow(0.25).add(1).pow(buyableEffect("cf", 14))
  
        //tails
        player.cf.tailsToGet = new Decimal(1)
        player.cf.tailsToGet = player.cf.tailsToGet.mul(player.cf.headsEffect2)
        player.cf.tailsToGet = player.cf.tailsToGet.mul(buyableEffect("cf", 11))
        player.cf.tailsToGet = player.cf.tailsToGet.mul(buyableEffect("cf", 31))
        player.cf.tailsToGet = player.cf.tailsToGet.mul(player.wof.wheelPointsEffect3)
        player.cf.tailsToGet = player.cf.tailsToGet.mul(buyableEffect("wof", 11))
        player.cf.tailsToGet = player.cf.tailsToGet.mul(player.sm.chipsEffect[1])
        player.cf.tailsToGet = player.cf.tailsToGet.mul(buyableEffect("sm", 101))
        player.cf.tailsToGet = player.cf.tailsToGet.mul(levelableEffect("car", 206)[0])
        player.cf.tailsToGet = player.cf.tailsToGet.mul(buyableEffect("sme", 182))
        player.cf.tailsToGet = player.cf.tailsToGet.mul(buyableEffect("car", 22))

        player.cf.tailsToGet = player.cf.tailsToGet.div(player.cf.tailsSoftcapEffect)


        player.cf.tailsEffect = player.cf.tails.pow(0.5).add(1).pow(buyableEffect("cf", 14))
        player.cf.tailsEffect2 = player.cf.tails.div(10).pow(0.25).add(1).pow(buyableEffect("cf", 14))

        //auto
        if (hasUpgrade("car", 13))
        {
            player.cf.heads = player.cf.heads.add(player.cf.headsToGet.mul(delta))
            player.cf.tails = player.cf.tails.add(player.cf.tailsToGet.mul(delta))
        }

        //flip prices
        if (player.cf.coinsFlipped.lt(25)) player.cf.flipCost = player.cf.coinsFlipped.pow(1.5).div(3).add(1).mul(10)
        if (player.cf.coinsFlipped.gte(25)) player.cf.flipCost = player.cf.coinsFlipped.pow(2.25).div(3).add(1).mul(10)
        if (player.cf.coinsFlipped.gte(100)) player.cf.flipCost = player.cf.coinsFlipped.pow(2.5).add(1).mul(10)
        if (player.cf.coinsFlipped.gte(500)) player.cf.flipCost = player.cf.coinsFlipped.mul(20).pow(2.75).add(1)
        if (player.cf.coinsFlipped.gte(1500)) player.cf.flipCost = player.cf.coinsFlipped.mul(20).pow(5).add(1)
        player.cf.flipCost = player.cf.flipCost.div(buyableEffect("cf", 22))
        player.cf.reductionCooldown = player.cf.reductionCooldown.sub(delta)

        if (player.cf.autoFlip)
        {
            if (player.za.chancePoints.gte(player.cf.flipCost) && !player.cf.flipping)
            {
                layers.cf.coinFlip();

                if (!hasUpgrade("za", 18)) player.za.chancePoints = player.za.chancePoints.sub(player.cf.flipCost)

                player.cf.coinsFlipped = player.cf.coinsFlipped.add(1)
            }
        }

        if (Decimal.gt(player.cf.coinExploit, 0)) {
            player.cf.coinExploit = Decimal.sub(player.cf.coinExploit, 0.01).max(0)
        }
        if (player.cf.coinExploit < 0) {
            player.cf.coinExploit = player.cf.coinExploit + delta
        }

        if (player.cf.coinExploit >= 10) {
            player.cf.heads = new Decimal(0)
            player.cf.tails = new Decimal(0)
            player.cf.coinsFlipped = new Decimal(0)

            player.cf.coinExploit = -5
            if (player.tab == "cf") makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {text: "SUPER COIN CLIP"})
        }
    },
    clickables: {
        11: {
            title() { 
                return player.cf.flipping ? player.cf.coinHeads ? "<img src='resources/coinHeads.png'style='width:" + Math.abs(Math.sin((Date.now() - player.cf.flipDelayStart) / (player.cf.flipDelayEnd - player.cf.flipDelayStart) * Math.PI) * 150) + "px;height:150px;margin:-35px;'></img>" : "<img src='resources/coinTails.png'style='width:" + Math.abs(Math.sin((Date.now() - player.cf.flipDelayStart) / (player.cf.flipDelayEnd - player.cf.flipDelayStart) * Math.PI) * 150) + "px;height:150px;margin:-35px'></img>"
                : player.cf.coinHeads ? "<img src='resources/coinHeads.png'style='width:" + Math.abs(Math.sin(Math.min(Math.PI / 2, (Date.now() - player.cf.flipDelayStart) / (player.cf.flipDelayEnd - player.cf.flipDelayStart)) * Math.PI) * 150) + "px;height:150px;margin:-35px;'></img>" : "<img src='resources/coinTails.png'style='width:" + Math.abs(Math.sin(Math.min(Math.PI / 2, (Date.now() - player.cf.flipDelayStart) / (player.cf.flipDelayEnd - player.cf.flipDelayStart)) * Math.PI) * 150) + "px;height:150px;margin:-35px'></img>"
            },
            canClick() { return !player.cf.flipping && player.za.chancePoints.gte(player.cf.flipCost)},
            tooltip() { return "<h5>Flip Length: " + format(player.cf.flipLength) + ". <h6>(I don't know what unit of measurement this is in, but it's probably seconds.)" },
            unlocked() { return true },
            onClick() {
                layers.cf.coinFlip();

                if (!hasUpgrade("za", 18)) player.za.chancePoints = player.za.chancePoints.sub(player.cf.flipCost)

                player.cf.coinsFlipped = player.cf.coinsFlipped.add(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '110px', minHeight: '110px', paddingTop: "5px", borderRadius: "150px", backgroundColor: "#00000000", borderColor: "#00000000", color: "#ffffff" },
        },
        12: {
            title() { return player.cf.autoFlip ? "Autoflip: ON" : "Autoflip: OFF" },
            canClick() { return true },
            unlocked() { return hasUpgrade("za", 14) },
            onClick() {
                if (!player.cf.autoFlip) player.cf.autoFlip = true
                else player.cf.autoFlip = false
            },
            style: {width: '300px', minHeight: '45px', color: "black", border: "2px solid #000000bf", borderRadius: "10px", backgroundImage: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)" }
        },
        13: {
            title() { return player.cf.reductionCooldown.gt(0) ? "On cooldown...<br><small>" + formatTime(player.cf.reductionCooldown) + "</small>" : "Reduce coins flipped by /1.2<br><small>That pesky softcap got to you yet?</small>"},
            canClick() { return player.cf.reductionCooldown.lte(0) },
            unlocked() { return true },
            onClick() {
                player.cf.coinsFlipped = player.cf.coinsFlipped.div(1.2).floor()
                player.cf.reductionCooldown = new Decimal(1800).div(buyableEffect("wof", 16))
            },
            style() {
                let look = {width: '300px', minHeight: '60px', border: "2px solid #000000bf", borderRadius: "10px" }
                if (this.canClick()) {
                    look.backgroundImage = "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)"
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
    },
    coinFlip() {
        if (player.cf.flipLength.gt(0.2))
        {
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
            player.cf.flipDelayEnd = endTS

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

                    player.cf.coinHeads = !player.cf.coinHeads

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
                player.cf.flipDelayStart = Date.now()
                player.cf.flipDelayEnd = Date.now() + delay

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
        } else {
            let random = getRandomInt(2)
            if (random == 0) {
                player.cf.heads = player.cf.heads.add(player.cf.headsToGet)
            } else {
                player.cf.tails = player.cf.tails.add(player.cf.tailsToGet)
            }
        }
    },
    bars: {
        coinFlip: {
            unlocked: true,
            direction: RIGHT,
            width: 240,
            height: 30,
            progress() {
                return player.cf.flipTimer.div(player.cf.flipLength)
            },
            baseStyle: {backgroundColor: "black",},
            fillStyle: {backgroundColor: "#7f5f00"},
            borderStyle: {border: "3px soild red"},
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
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #474747ff 0%, #8d8d8dff 74%)" }
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
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #474747ff 0%, #8d8d8dff 74%)" }
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
                return 'which are extending the chance point softcap by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #474747ff 0%, #8d8d8dff 74%)" }
        },
        14: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
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
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #474747ff 0%, #8d8d8dff 74%)" }
        },

        //heads
        21: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cf.heads },
            pay(amt) { player.cf.heads = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.2).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase())},
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Oooh that's my symbol!"
            },
            display() {
                return 'which are boosting heads gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Heads'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)" }
        },
        22: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.cf.heads },
            pay(amt) { player.cf.heads = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Let me flip more coins!"
            },
            display() {
                return 'which dividing coin flip cost by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Heads'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)" }
        },
        23: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.cf.heads },
            pay(amt) { player.cf.heads = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.15).mul(0.35).add(1)},
            unlocked() { return hasUpgrade("za", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Might as well extend the softcap a bit!"
            },
            display() {
                return 'which are extending the tails softcap by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Heads'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)" }
        },
        24: {
            costBase() { return new Decimal(50000) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.cf.heads },
            pay(amt) { player.cf.heads = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1)},
            unlocked() { return hasUpgrade("za", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "You're such a gambling addict!"
            },
            display() {
                return 'which are boosting wheel point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '. Kept on wheel reset.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Heads'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)" }
        },
        //tails
        31: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cf.tails },
            pay(amt) { player.cf.tails = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.2).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Nooo I hate Iridite!"
            },
            display() {
                return 'which are boosting tails gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Tails'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)" }
        },
        32: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.8) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.cf.tails },
            pay(amt) { player.cf.tails = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Let me flip coins faster!"
            },
            display() {
                return 'which dividing coin flip length by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Tails'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)" }
        },
        33: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.cf.tails },
            pay(amt) { player.cf.tails = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.15).mul(0.35).add(1)},
            unlocked() { return hasUpgrade("za", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "More creative boosts when?"
            },
            display() {
                return 'which are extending the heads softcap by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Tails'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)" }
        },
        34: {
            costBase() { return new Decimal(50000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.cf.tails },
            pay(amt) { player.cf.tails = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.25).add(1)},
            unlocked() { return hasUpgrade("za", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fuel your gambling addiction!"
            },
            display() {
                return 'which are dividing wheel spin requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Tails'
            },
            buy(mult) {
                if (mult != true && !player.sm.buyables[103].gte(1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!player.sm.buyables[103].gte(1)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '180px', height: '180px', color: "black", border: "2px solid #000000bf", backgroundImage: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)" }
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

                    ["blank", "10px"],
                    ["style-column", [
                        ["style-row", [ //coin
                            ["style-column", [
                                ["blank", "3px"],
                                ["row", [ ["bar", "coinFlip"],]],
                                ["blank", "6px"],
                                ["raw-html", function () { return player.cf.coinHeads ? "Coin is currently heads." : "Coin is currently tails." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["blank", "6px"],
                                ["row", [["clickable", 11]]],
                                ["blank", "6px"],
                                ["raw-html", function () { return "Coins flipped: " + formatWhole(player.cf.coinsFlipped) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["raw-html", function () { return "Cost to flip coin: " + format(player.cf.flipCost) + " Chance Points." }, () => {
                                    return { "color": "white", "font-size": "16px", "font-family": "monospace", display: hasUpgrade("za", 18) ? "none !important" : ""}
                                }],
                                ["blank", "6px"],
                                ["clickable", 12],
                                ["blank", "3px"],
                                ["clickable", 13],
                            ], {width: "400px", height: "250px", borderRadius: "0px"}],
                            ["style-column", [
                                ["row", [ ["layerColor-dark-buyable", 11], ["blank", "3px", {width: "3px"}], ["layerColor-dark-buyable", 12], ]],
                                ["blank", "3px", {width: "3px"}],
                                ["row", [ ["layerColor-dark-buyable", 13], ["blank", "3px", {width: "3px"}], ["layerColor-dark-buyable", 14], ]],
                            ], {width: "400px", borderRadius: "0px"}],
                        ], {width: "800px", height: "400px", background: "#00000000", borderRadius: "10px 10px 0px 0px"}],
                        ["style-row", [], {backgroundColor: "#f5b678ff", width: "100%", height: "3px"}],
                        ["style-row", [
                            ["top-column", [ //heads
                                ["blank", "6px"],
                                ["raw-html", function () { return "You have <h3>" + format(player.cf.heads) + "</h3> heads. (+" + format(player.cf.headsToGet) + ")" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["raw-html", () => { return player.cf.heads.gte(player.cf.headsSoftcapStart) ? "<small>After " + format(player.cf.headsSoftcapStart) + " heads, gain is divided by /" + format(player.cf.headsSoftcapEffect) + ".</small>" : "" }, {color: "red", fontSize: "14px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "<small>Boosts chance points by x" + format(player.cf.headsEffect) + ".</small>" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["raw-html", function () { return "<small>Boosts tails gain by x" + format(player.cf.headsEffect2) + ".</small>" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["blank", "6px"],
                                ["row", [ ["layerColor-dark-buyable", 21], ["blank", "3px", {width: "3px"}], ["layerColor-dark-buyable", 22], ]],
                                ["blank", "3px", {width: "3px"}],
                                ["row", [ ["layerColor-dark-buyable", 23], ["blank", "3px", {width: "3px"}], ["layerColor-dark-buyable", 24], ]],
                            ], {width: "400px", height: "475px", background: "#0000005f", borderRadius: "0px 0px 0px 10px"}],
                            ["top-column", [ //tails
                                ["blank", "6px"],
                                ["raw-html", function () { return "You have <h3>" + format(player.cf.tails) + "</h3> tails. (+" + format(player.cf.tailsToGet) + ")" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["raw-html", () => { return player.cf.tails.gte(player.cf.tailsSoftcapStart) ? "<small>After " + format(player.cf.tailsSoftcapStart) + " tails, gain is divided by /" + format(player.cf.tailsSoftcapEffect) + ".</small>" : "" }, {color: "red", fontSize: "14px", fontFamily: "monospace"}],
                                ["raw-html", function () { return "<small>Extends chance point softcap by x" + format(player.cf.tailsEffect) + ".</small>" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["raw-html", function () { return "<small>Boosts heads gain by x" + format(player.cf.tailsEffect2) + ".</small>" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["blank", "6px"],
                                ["row", [ ["layerColor-dark-buyable", 31], ["blank", "3px", {width: "3px"}], ["layerColor-dark-buyable", 32], ]],
                                ["blank", "3px", {width: "3px"}],
                                ["row", [ ["layerColor-dark-buyable", 33], ["blank", "3px", {width: "3px"}], ["layerColor-dark-buyable", 34], ]],
                            ], {width: "400px", height: "475px", background: "#0000007f", borderRadius: "0px 0px 10px 0px"}],
                        ]]
                    ], {background: "linear-gradient(105deg, #80613fff 0%, #9c5d4aff 74%)", border: "3px solid #f5b678ff",  borderRadius: "13px"}],

                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],

        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 12) && !player.sma.inStarmetalChallenge},
    hotkeys: [
        {
            key: "c", 
            description: "Flip Coin",
            onPress() {
                clickClickable(this.layer, 11)
            },
        }
	]
})
