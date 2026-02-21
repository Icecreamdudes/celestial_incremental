addLayer("sm", {
    name: "Slot Machine", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>SM", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        slotsSpinned: new Decimal(0),
        spinCost: new Decimal(1e7),

        spinLength: new Decimal(30),
        spinTimer: new Decimal(0),
        trueTimer: new Decimal(0),
        spinPause: new Decimal(0),
        spinAmount: new Decimal(0),
        spinActive: false,
        slotSpinning: 0,

        slotIndexes: [0, 0, 0],
        /*
        0 - Red
        1 - Blue
        2 - Yellow
        3 - Evo Shards
        4 - Paragon Shards
        */
        slotImages: ["", "", ""],

        //chips
        chips: [new Decimal(0), new Decimal(0), new Decimal(0)],
        chipsToGet: [new Decimal(1), new Decimal(1), new Decimal(1)],
        chipsEffect: [new Decimal(1), new Decimal(1), new Decimal(1)],

        totalChipMult: new Decimal(1),
    }},
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #c1c436ff 0%, #eaebc3ff 50%, #c1c436ff 100%)",
            "background-origin": "border-box",
            "border-color": "#635400ff",
            "color": "#635400ff",
            borderRadius: "4px",
            transform: "translateY(-0px)",
        }
    },
    tooltip: "Slot Machine",
    color: "#c1c436ff",
    branches: ["wof",],
    update(delta) {
        player.sm.slotImages = ["resources/redChip.png", "resources/blueChip.png", "resources/yellowChip.png", "resources/evoShard.png", "resources/paragonShard.png"]

        player.sm.spinLength = new Decimal(30)
        if (hasUpgrade("cbs", 11)) player.sm.spinLength = player.sm.spinLength.div(3)
        if (player.sm.spinActive)
        {
            player.sm.spinTimer = player.sm.spinTimer.add(delta)
            player.sm.trueTimer = player.sm.trueTimer.add(delta)

            // Determine which slot should be actively spinning right now.
            // Each slot will spin for `spinLength` seconds in sequence (slot 0, then 1, then 2).
            const perSlot = player.sm.spinLength.div(3)
            const total = perSlot.times(3)
            // If we've reached total duration, end the spin
            if (player.sm.trueTimer.gte(total)) {
                player.sm.spinActive = false
                player.sm.trueTimer = new Decimal(0)
                player.sm.spinTimer = new Decimal(0)
                player.sm.slotSpinning = 0
                layers.sm.evaluateRewards()
            } else {
                // Calculate current slot index (0,1,2)
                const idx = Math.floor(player.sm.trueTimer.div(perSlot).toNumber())
                player.sm.slotSpinning = Math.min(2, idx)

                // Randomize the currently spinning slot at an interval
                if (player.sm.spinTimer.gte(0.08)) {
                    layers.sm.randomizeSegments()
                    player.sm.spinTimer = new Decimal(0)
                }
            }
        }

        if (player.sm.spinAmount.lt(5)) player.sm.spinCost = player.sm.spinAmount.pow(2.5).add(1).mul(10000000)
        if (player.sm.spinAmount.gte(5)) player.sm.spinCost = player.sm.spinAmount.pow(6).add(1).mul(10000000)

        player.sm.chipsToGet = [new Decimal(1), new Decimal(1), new Decimal(1)]


        player.sm.totalChipMult = new Decimal(1)
        player.sm.totalChipMult = player.sm.totalChipMult.mul(player.sm.spinAmount.pow(0.5).add(1))
        player.sm.totalChipMult = player.sm.totalChipMult.mul(buyableEffect("sm", 108))
        if (hasUpgrade("cbs", 15)) player.sm.totalChipMult = player.sm.totalChipMult.mul(upgradeEffect("cbs", 15))

        player.sm.chipsToGet[0] = player.sm.chipsToGet[0].mul(buyableEffect("sm", 11))
        player.sm.chipsToGet[0] = player.sm.chipsToGet[0].mul(player.sm.totalChipMult)

        player.sm.chipsToGet[1] = player.sm.chipsToGet[1].mul(buyableEffect("sm", 12))
        player.sm.chipsToGet[1] = player.sm.chipsToGet[1].mul(player.sm.totalChipMult)

        player.sm.chipsToGet[2] = player.sm.chipsToGet[2].mul(buyableEffect("sm", 13))
        player.sm.chipsToGet[2] = player.sm.chipsToGet[2].mul(player.sm.totalChipMult)

        player.sm.chipsEffect[0] = player.sm.chips[0].div(2).add(1)
        player.sm.chipsEffect[1] = player.sm.chips[1].pow(0.75).div(2).add(1)
        player.sm.chipsEffect[2] = player.sm.chips[2].pow(0.5).div(2).add(1)

        player.sm.spinPause = player.sm.spinPause.sub(1)
        if (player.sm.spinPause.gte(0)) {
            layers.sm.slotReset();
        }
    },
    randomizeSegments() {
        // Weighted pick but ensure result is different from current displayed index
        const weights = [0.40, 0.25, 0.15, 0.10, 0.10] // red, blue, yellow, evo, paragon
        function pickWeighted(ws) {
            const total = ws.reduce((a,b)=>a+b,0)
            const r = Math.random() * total
            let cum = 0
            for (let i=0;i<ws.length;i++){
                cum += ws[i]
                if (r < cum) return i
            }
            return ws.length-1
        }

        const slotIdx = player.sm.slotSpinning
        const prev = player.sm.slotIndexes[slotIdx]
        let newIndex = pickWeighted(weights)
        // If we happened to pick the same index, reroll a few times to try to get a different one
        let attempts = 0
        while (newIndex === prev && attempts < 6) {
            newIndex = pickWeighted(weights)
            attempts++
        }
        // If still same after attempts, pick the next index cyclically to guarantee difference
        if (newIndex === prev) newIndex = (prev + 1) % weights.length

        player.sm.slotIndexes[slotIdx] = newIndex
    },
    evaluateRewards() {
        // Count occurrences of each symbol. If any symbol occurs twice -> double rewards (2).
        // If any symbol occurs three times -> triple rewards (3).
        let repeatedRewards = 0
        const freq = {}
        for (let i = 0; i < player.sm.slotIndexes.length; i++) {
            const v = player.sm.slotIndexes[i]
            freq[v] = (freq[v] || 0) + 1
        }
        for (const k in freq) {
            if (freq[k] >= 3) { repeatedRewards = 3; break }
            if (freq[k] == 2) repeatedRewards = 2
        }
        let mult = new Decimal(1)
        if (repeatedRewards == 2) 
        {
            mult = new Decimal(2)
            if (player.tab == "sm") makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 550, y: 450, text: "Lucky!<br><small>Double Rewards!</small>"})
        }
        if (repeatedRewards == 3) 
        {
            mult = new Decimal(4)
            if (player.tab == "sm")makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 550, y: 450, text: "Jackpot!<br><small>Quadruple Rewards!</small>"})
        }

        for (let i = 0; i < player.sm.slotIndexes.length; i++) {
            if (player.sm.slotIndexes[i] == 0) 
            {
                player.sm.chips[0] = player.sm.chips[0].add(player.sm.chipsToGet[0].mul(mult))
                if (player.tab == "sm")makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {x: 450 + i * 200, y: 500, text: "+" + format(player.sm.chipsToGet[0].mul(mult)) + " red chips."})
            }
            if (player.sm.slotIndexes[i] == 1) 
            {
                player.sm.chips[1] = player.sm.chips[1].add(player.sm.chipsToGet[1].mul(mult))
                if (player.tab == "sm")makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {x: 450 + i * 200, y: 500, text: "+" + format(player.sm.chipsToGet[1].mul(mult)) + " blue chips."})
            }
            if (player.sm.slotIndexes[i] == 2) 
            {
                player.sm.chips[2] = player.sm.chips[2].add(player.sm.chipsToGet[2].mul(mult))
                if (player.tab == "sm")makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {x: 450 + i * 200, y: 500, text: "+" + format(player.sm.chipsToGet[2].mul(mult)) + " yellow chips."})
            }
            if (player.sm.slotIndexes[i] == 3) 
            {
                player.cb.evolutionShards = player.cb.evolutionShards.add(Decimal.mul(6, mult))
                if (player.tab == "sm")makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {x: 450 + i * 200, y: 500, text: "+" + formatWhole(Decimal.mul(6, mult)) + " evolution shards."})
            }
            if (player.sm.slotIndexes[i] == 4) 
            {
                player.cb.paragonShards = player.cb.paragonShards.add(Decimal.mul(3, mult))
                if (player.tab == "sm")makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {x: 450 + i * 200, y: 500, text: "+" + formatWhole(Decimal.mul(3, mult)) + " paragon shards."})
            }
        }
    },
    spinSlots() {
        // Start a sequential spin: each slot spins for `spinLength` seconds in order
        if (player.sm.spinActive) return
        player.sm.spinActive = true
        player.sm.trueTimer = new Decimal(0)
        player.sm.spinTimer = new Decimal(0)
        // reset slot indexes visually before spinning
        player.sm.slotIndexes = [getRandomInt(5), getRandomInt(5), getRandomInt(5)]
    },
    slotReset() {
        //reets everything before unlocking slots
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
        player.cf.buyables[24] = new Decimal(0)
        player.cf.buyables[31] = new Decimal(0)
        player.cf.buyables[32] = new Decimal(0)
        player.cf.buyables[33] = new Decimal(0)
        player.cf.buyables[34] = new Decimal(0)

        player.cf.autoFlip = false

        player.wof.wheelPoints = new Decimal(0)
        player.wof.wheelsSpinned = new Decimal(0)
        player.wof.buyables[11] = new Decimal(0)
        player.wof.buyables[12] = new Decimal(0)
        player.wof.buyables[13] = new Decimal(0)
        player.wof.buyables[14] = new Decimal(0)
        player.wof.buyables[15] = new Decimal(0)
    },
    clickables: {
        11: {
            title() { return "<img src='" + player.sm.slotImages[player.sm.slotIndexes[0]] + "'style='width:calc(100%);height:calc(100%);margin:-0%'></img>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return { width: '200px', "min-height": '200px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #424242ff 0%, #818181ff 50%, #424242ff 100%)" }
                
            },
        },
        12: {
            title() { return "<img src='" + player.sm.slotImages[player.sm.slotIndexes[1]] + "'style='width:calc(100%);height:calc(100%);margin:-0%'></img>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return { width: '200px', "min-height": '200px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #424242ff 0%, #818181ff 50%, #424242ff 100%)" }
                
            },
        },
        13: {
            title() { return "<img src='" + player.sm.slotImages[player.sm.slotIndexes[2]] + "'style='width:calc(100%);height:calc(100%);margin:-0%'></img>"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return { width: '200px', "min-height": '200px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #424242ff 0%, #818181ff 50%, #424242ff 100%)" }
                
            },
        },

        21: {
            title() { return "<h2>SPIN!"},
            tooltip() { return "<h5>Spin Length: " + format(player.sm.spinLength) + ". <h6>(I don't know what unit of measurement this is in, but it's probably seconds.)" },
            canClick() { return player.za.chancePoints.gte(player.sm.spinCost) && !player.sm.spinActive },
            unlocked() { return true },
            onClick() {
                player.sm.spinPause = new Decimal(7)
                layers.sm.spinSlots();
                player.sm.spinAmount = player.sm.spinAmount.add(1)
            },
            style() { 
                return { width: '250px', "min-height": '75px', borderRadius: "15px 15px 15px 15px", border: "3px solid #0f221aff", backgroundImage: "linear-gradient(180deg, #c1c436ff 0%, #eaebc3ff 50%, #c1c436ff 100%)"}
            },
        },
        22: {
            title() { return "<h6>Do a slots reset, but gain no rewards."},
            tooltip() { return "Damn, you REALLY suck at this game." },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.sm.spinPause = new Decimal(7)
            },
            style() { 
                return { width: '125px', "min-height": '75px', borderRadius: "15px 15px 15px 15px", border: "3px solid #0f221aff", backgroundImage: "linear-gradient(180deg, #c1c436ff 0%, #eaebc3ff 50%, #c1c436ff 100%)"}
            },
        },
    },
    bars: {
        slots: {
            unlocked: true,
            direction: RIGHT,
            width: 600,
            height: 50,
            progress() {
                return player.sm.trueTimer.div(player.sm.spinLength)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "rgb(129, 112, 93, 0.5)"},
            textStyle: {fontSize: "14px"},
            display() {
                return player.sm.spinActive ? "Slots are spinning..." : "Spin the slots!";
            },
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.cb.evolutionShards },
            pay(amt) { player.cb.evolutionShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.1).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "What are these strange shards?"
            },
            display() {
                return 'which are boosting red chip gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Evolution Shards'
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
            style: { width: '194px', height: '225px', color: "black", backgroundImage: "linear-gradient(45deg, #5d51ff 0%, #af51ff 100%)" }
        },
        12: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.cb.paragonShards },
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.05).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Ooh I really like these rainbow ones"
            },
            display() {
                return 'which are boosting blue chip gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Paragon Shards'
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
            style: { width: '194px', height: '225px', color: "black", backgroundImage: "linear-gradient(45deg, #1ba861 0%, #89ee30 33%, #e79c44 67%, #cb1816 100%)" }
        },
        13: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.fi.temporalShards },
            pay(amt) { player.fi.temporalShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.05).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "These ones are boring"
            },
            display() {
                return 'which are boosting yellow chip gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Temporal Shards'
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
            style: { width: '194px', height: '225px', color: "black", backgroundImage: "linear-gradient(0deg, #2d667b 0%, #0a3870 100%)" }
        },

        //research
        101: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sm.chips[0]},
            pay(amt) { player.sm.chips[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).div(2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting heads and tails gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Red Chips"
            },
            //branches: [102, 103],
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
            style: {width: '140px', height: '140px', color: "black", background: "#ff7070ff", border: "5px solid #460000ff", borderColor: "#460000ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        102: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sm.chips[1]},
            pay(amt) { player.sm.chips[1] = this.currency().sub(amt) },
            effect(x) { return Decimal.div(1, getBuyableAmount(this.layer, this.id).pow(0.55).mul(0.3).add(1)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are weakening chance point softcap by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blue Chips"
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
            style: {width: '140px', height: '140px', color: "black", background: "#7970ffff", border: "5px solid #09035aff", borderColor: "#09035aff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        103: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.sm.chips[2]},
            pay(amt) { player.sm.chips[2] = this.currency().sub(amt) },
            effect(x) { return new Decimal(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Automatically purchase all coinflip buyables.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Yellow Chips"
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
            style: {width: '140px', height: '140px', color: "black", background: "#fffd70ff", border: "5px solid #4d4b03ff", borderColor: "#4d4b03ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        104: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.sm.chips[0]},
            pay(amt) { player.sm.chips[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).div(5).add(1) },
            unlocked() { return player.sm.buyables[101].gte(3) && player.sm.buyables[102].gte(3) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are raising the wheel amount effectiveness by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Red Chips"
            },
            branches: [101, 102],
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
            style: {width: '140px', height: '140px', color: "black", background: "#ff7070ff", border: "5px solid #460000ff", borderColor: "#460000ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        105: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sm.chips[1]},
            pay(amt) { player.sm.chips[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return player.sm.buyables[102].gte(3) && player.sm.buyables[103].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            branches: [102, 103],
            display() {
                return "which are divding wheel spin length by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blue Chips"
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
            style: {width: '140px', height: '140px', color: "black", background: "#7970ffff", border: "5px solid #09035aff", borderColor: "#09035aff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        106: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sm.chips[2]},
            pay(amt) { player.sm.chips[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.3333).mul(0.03) },
            unlocked() { return player.sm.buyables[105].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            branches: [105],
            display() {
                return "<h5>which are adding a " + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% chance of gaining an evolution shard on wheel spin.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) +  " Yellow Chips"
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
            style: {width: '140px', height: '140px', color: "black", background: "#fffd70ff", border: "5px solid #4d4b03ff", borderColor: "#4d4b03ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        107: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.sm.chips[0]},
            pay(amt) { player.sm.chips[0] = this.currency().sub(amt) },
            effect(x) { return new Decimal(1) },
            unlocked() { return player.sm.buyables[104].gte(5) && player.sm.buyables[106].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Unlock the autospinner. You are one lazy bum.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Red Chips"
            },
            branches: [104, 106],
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
            style: {width: '140px', height: '140px', color: "black", background: "#ff7070ff", border: "5px solid #460000ff", borderColor: "#460000ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        108: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.sm.chips[1]},
            pay(amt) { player.sm.chips[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.3).add(1) },
            unlocked() { return player.sm.buyables[106].gte(5) && player.sm.buyables[107].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            branches: [106, 107],
            display() {
                return "which are boosting all chip gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blue Chips"
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
            style: {width: '140px', height: '140px', color: "black", background: "#7970ffff", border: "5px solid #09035aff", borderColor: "#09035aff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        109: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.cb.evolutionShards},
            pay(amt) { player.cb.evolutionShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.05).add(1) },
            unlocked() { return player.sm.buyables[108].gte(5) && hasUpgrade("cbs", 17) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            branches: [108,],
            display() {
                return "which are extending chance point softcap by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Evolution Shards"
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
            style: {width: '140px', height: '140px', color: "black", backgroundImage: "linear-gradient(45deg, #5d51ff 0%, #af51ff 100%)", border: "5px solid #cc92ff", borderColor: "#cc92ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        111: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.7).mul(0.09).add(1) },
            unlocked() { return player.sm.buyables[108].gte(5) && hasUpgrade("cbs", 17) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            branches: [108,],
            display() {
                return "which are extending heads and tails softcap by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards"
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
            style: {width: '140px', height: '140px', color: "black", backgroundImage: "linear-gradient(45deg, #1ba861 0%, #89ee30 33%, #e79c44 67%, #cb1816 100%)", border: "5px solid #ebebeb", borderColor: "#ebebeb", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
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
                    ["style-column", [ //slots 
                    ["blank", "25px"],
                    ["raw-html", function () { return "Requires " + format(player.sm.spinCost) + " chance points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Spinning slots resets previous dice space content." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11],["clickable", 12],["clickable", 13],]],
                    ["bar", "slots"],
                    ["blank", "25px"],
                    ["row", [["clickable", 21], ["blank", "25px"], ["clickable", 22],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Double repeating slots double all rewards." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Triple repeating slots quadruple all rewards." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h5>Mult: " + format(player.sm.totalChipMult) + "x. (also based on amount of slot spins)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h5>(Only boosts chip gains)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h5>Slots spinned: " + formatWhole(player.sm.spinAmount) + "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ], {width: "625px", height: "700px", background: "rgba(69, 80, 5, 0.5)", border: "0px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "15px 0px 0px 15px"}],

                    
                    ["style-column", [ 
                    ["style-column", [ 
                        ["raw-html", function () { return "You have " + format(player.sm.chips[0]) + " red chips. (+" + format(player.sm.chipsToGet[0]) + ")" }, { "color": "#ff7070ff", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Boosts chance point gain and extends softcap by x" + format(player.sm.chipsEffect[0]) + "." }, { "color": "#ff7070ff", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "10px"],
                        ["raw-html", function () { return "You have " + format(player.sm.chips[1]) + " blue chips. (+" + format(player.sm.chipsToGet[1]) + ")" }, { "color": "#7970ffff", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Boosts heads and tails gain and extends softcap by x" + format(player.sm.chipsEffect[1]) + "." }, { "color": "#7970ffff", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "10px"],
                        ["raw-html", function () { return "You have " + format(player.sm.chips[2]) + " yellow chips. (+" + format(player.sm.chipsToGet[2]) + ")" }, { "color": "#fffd70ff", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Boosts wheel point gain by x" + format(player.sm.chipsEffect[2]) + "." }, { "color": "#fffd70ff", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "597px", height: "200px", background: "rgba(96, 107, 30, 0.5)", border: "3px solid #ccc",  borderBottom: "0px", borderTop: "0px", borderRadius: "0px 15px 0px 0px"}],
                    ["style-column", [ 
                            ["left-row", [
                    ["blank", "25px"],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "150px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/battle/temporalShards.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.fi.temporalShards)}, {width: "95px", height: "50px", color: "#0d62c4ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Temporal Shards<hr><small>(Gained from check back battles)</small></div>"],
            ], {width: "150px", height: "50px"}],
        ], {width: "450px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13],]],
                    ], {width: "600px", height: "500px", background: "rgba(96, 107, 30, 0.5)", border: "3px solid #ccc", borderRight: "0px", borderRadius: "0px 0px 15px 0px"}],
                    ], {width: "600px", height: "700px", background: "rgba(96, 107, 30, 0.5)", border: "0px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "0px 15px 15px 0px"}],
                    ], {width: "1225px", height: "700px", background: "rgba(34, 124, 61, 0)", border: "3px solid #ccc", borderRadius: "15px"}],
                ]
            },
            "Research": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "12.5px"],
                        ["raw-html", function () { return "You have " + format(player.sm.chips[0]) + " red chips. (+" + format(player.sm.chipsToGet[0]) + ")" }, { "color": "#ff7070ff", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.sm.chips[1]) + " blue chips. (+" + format(player.sm.chipsToGet[1]) + ")" }, { "color": "#7970ffff", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.sm.chips[2]) + " yellow chips. (+" + format(player.sm.chipsToGet[2]) + ")" }, { "color": "#fffd70ff", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "12.5px"],
                                    ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "150px", height: "50px"}],
        ], {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "12.5px"],
                    ["always-scroll-column", [
                        ["blank", "10px"],
                        ["row", [
                            ["ex-buyable", 101],
                            ["ex-buyable", 102],
                            ["ex-buyable", 103],
                        ]],
                        ["row", [
                            ["ex-buyable", 104],
                            ["ex-buyable", 105],
                        ]],
                        ["row", [
                            ["ex-buyable", 107],
                            ["ex-buyable", 106],
                        ]],
                        ["row", [
                            ["ex-buyable", 108],
                        ]],
                        ["row", [
                            ["ex-buyable", 109],
                            ["ex-buyable", 111],
                        ]],
                    ], {width: "775px", height: "600px", backgroundColor: "#4a4a4a80", border: "3px solid white", borderRadius: "15px 0 0 15px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 16) && !player.sma.inStarmetalChallenge}
})
//makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 550, y: 450, text: "Lucky!<br><small>Double Rewards!</small>"})
//makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 550, y: 450, text: "Jackpot!<br><small>Quadruple Rewards!</small>"})
//makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {x: 550, y: 450, text: "+ whatever"})