addLayer("ca", {
    name: "Cante, Celestial of Replicanti", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() { return "Ξ"} , // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        unlockedCante: false,

        replicanti: new Decimal(1),
        replicantiEffect: new Decimal(1),
        replicantiEffect2: new Decimal(1),
        replicantiEffect3: new Decimal(1),
        replicantiMult: new Decimal(1),

        replicateChance: new Decimal(0.01),

        replicantiTimer: new Decimal(0),
        replicantiTimerReq: new Decimal(60),

        galaxyDust: new Decimal(0),
        galaxyDustEffect: new Decimal(1),
        galaxyDustToGet: new Decimal(0),

        canteCores: new Decimal(0),

        canteEnergy: new Decimal(0),
        canteEnergyReq: new Decimal(100),
        canteEnergyMult: new Decimal(1),

        replicantiGalaxies: new Decimal(0),
        replicantiGalaxiesCap: new Decimal(0),

        rememberanceCores: new Decimal(0),
        rememberanceCoresEffect: new Decimal(0),
        rememberanceCoreCost: new Decimal(1000),

        defeatedCante: false,
    }},
    automate() {
        if (hasMilestone("s", 16))
        {
            buyBuyable("ca", 11)
            buyBuyable("ca", 12)
            buyBuyable("ca", 13)
            buyBuyable("ca", 14)
            buyBuyable("ca", 15)
            buyBuyable("ca", 16)
            buyBuyable("ca", 17)
            buyBuyable("ca", 18)
            buyBuyable("ca", 19)
            buyBuyable("ca", 21)
            buyBuyable("ca", 22)
            buyBuyable("ca", 23)
            buyBuyable("ca", 24)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
            "background-origin": "border-box",
            "border-color": "#0f354c",
        };
    },
    tooltip: "Cante, the Celestial of Replicanti",
    color: "white",
    branches: ["bi"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.ca.replicantiMult = new Decimal(1.05)
        player.ca.replicantiMult = player.ca.replicantiMult.add(buyableEffect("ca", 12))
        player.ca.replicantiMult = player.ca.replicantiMult.add(buyableEffect("ca", 15))
        player.ca.replicantiMult = player.ca.replicantiMult.add(buyableEffect("ca", 18))
        player.ca.replicantiMult = player.ca.replicantiMult.add(buyableEffect("rm", 34))
        player.ca.replicantiMult = player.ca.replicantiMult.mul(buyableEffect("g", 26))
        player.ca.replicantiMult = player.ca.replicantiMult.mul(levelableEffect("pet", 108)[0])
        if (hasUpgrade("ep0", 11)) player.ca.replicantiMult = player.ca.replicantiMult.mul(upgradeEffect("ep0", 11))

        // SOFTCAP
        if (hasMilestone("r", 29) && player.ca.replicanti.gte(1.79e308)) player.ca.replicantiMult = player.ca.replicantiMult.div(Decimal.pow(10, player.ca.replicanti.div(1.79e308).add(1).log(1e100)))

        player.ca.replicantiTimerReq = new Decimal(1)
        player.ca.replicantiTimerReq = player.ca.replicantiTimerReq.div(buyableEffect("ca", 13))
        player.ca.replicantiTimerReq = player.ca.replicantiTimerReq.div(buyableEffect("ca", 16))
        player.ca.replicantiTimerReq = player.ca.replicantiTimerReq.div(buyableEffect("ca", 19))

        player.ca.replicateChance = new Decimal(0.02)
        player.ca.replicateChance = player.ca.replicateChance.add(buyableEffect("ca", 11))
        player.ca.replicateChance = player.ca.replicateChance.add(buyableEffect("ca", 14))
        player.ca.replicateChance = player.ca.replicateChance.add(buyableEffect("ca", 17))

        if (player.ca.unlockedCante && hasUpgrade("bi", 24)) player.ca.replicantiTimer = player.ca.replicantiTimer.add(onepersec.mul(delta))

        if (player.ca.replicantiTimer.gte(player.ca.replicantiTimerReq))
        {
            layers.ca.replicantiMultiply();
        }

        if (player.ca.replicanti.gt(1)) { player.ca.replicantiEffect = player.ca.replicanti.add(1).log(10).pow(1.05).mul(10).add(1) } else { player.ca.replicantiEffect = new Decimal(1) }
        if (player.ca.replicanti.gt(1)) { player.ca.replicantiEffect2 = player.ca.replicanti.add(1).log(10).pow(1.17).mul(10).add(1) } else { player.ca.replicantiEffect2 = new Decimal(1) }
        player.ca.replicantiEffect3 = player.ca.replicanti.pow(0.5)

        // EFFECT INCREASE POST SOFTCAP
        if (player.ca.replicanti.gte(1.79e308) && hasMilestone("r", 29)) {
            let magnitude = player.ca.replicanti.div(1.79e308).add(1).log(1e100).add(1)
            player.ca.replicantiEffect = player.ca.replicantiEffect.pow(magnitude)
            player.ca.replicantiEffect2 = player.ca.replicantiEffect2.pow(magnitude)
            player.ca.replicantiEffect3 = player.ca.replicantiEffect3.pow(magnitude)
        }

        //CANTE
        player.ca.canteEnergyMult = new Decimal(1)
        player.ca.canteEnergyMult = player.ca.canteEnergyMult.mul(player.ca.rememberanceCoresEffect)
        player.ca.canteEnergyMult = player.ca.canteEnergyMult.mul(levelableEffect("pet", 403)[0])

        if (player.ca.canteEnergy.gte(player.ca.canteEnergyReq))
        {
            layers.ca.gainCanteCore()
        }

        player.ca.canteEnergyReq = player.ca.canteCores.mul(10).add(100)

        player.ca.galaxyDustToGet = player.ca.replicanti.plus(1).log10().pow(0.8)
        player.ca.galaxyDustToGet = player.ca.galaxyDustToGet.mul(levelableEffect("pet", 108)[1])
        if (hasMilestone("fa", 19)) player.ca.galaxyDustToGet = player.ca.galaxyDustToGet.mul(player.fa.milestoneEffect[8])
        player.ca.galaxyDustToGet = player.ca.galaxyDustToGet.mul(buyableEffect("fu", 44))

        if (hasMilestone("s", 13)) player.ca.galaxyDust = player.ca.galaxyDust.add(Decimal.mul(player.ca.galaxyDustToGet.mul(0.01), delta))

        player.ca.galaxyDustEffect = player.ca.galaxyDust.plus(1).log10().mul(0.1).add(1)

        //rep galax
        player.ca.replicantiGalaxiesCap = buyableEffect("ca", 23)

        //rememberance
        player.ca.rememberanceCoreCost = player.ca.rememberanceCores.add(1).pow(1.5).mul(1000)
        player.ca.rememberanceCoresEffect = player.ca.rememberanceCores.mul(0.05).add(1)
    },
    gainCanteCore()
    {
        let leftover = new Decimal(0)
        leftover = player.ca.canteEnergy.sub(player.ca.canteEnergyReq)
        player.ca.canteCores = player.ca.canteCores.add(1)
        player.ca.canteEnergy = new Decimal(0)
        player.ca.canteEnergy = player.ca.canteEnergy.add(leftover)
    },
    convertRememberanceCore()
    {
        player.ca.canteCores = player.ca.canteCores.sub(1)
        player.oi.protoMemories = player.oi.protoMemories.sub(player.ca.rememberanceCoreCost)
        player.ca.rememberanceCores = player.ca.rememberanceCores.add(1)
    },
    replicantiMultiply()
    {
        let random = new Decimal(0)
        random = Math.random()
        if (random < player.ca.replicateChance) {
            if (player.ca.replicanti.lt(1.79e308) || hasMilestone("r", 29)) {
                player.ca.replicanti = player.ca.replicanti.mul(player.ca.replicantiMult)
            } else {
                player.ca.replicanti = new Decimal(1.79e308)
            }
        }
        player.ca.replicantiTimer = new Decimal(0)
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
            title() { return "<h1>UNLOCK" },
            canClick() { return player.cb.level.gte(250) && player.ad.antimatter.gte("1e600") && player.in.infinities.gte(100000) && player.h.hexPoint.gte(1e36) && player.ta.highestDicePoints.gte(1e50) && player.cb.petPoints.gte(500) },
            unlocked() { return true},
            onClick() {
                player.ca.unlockedCante = true
                player.subtabs["ca"]['stuff'] = 'Main'
            },
            style: { width: '400px', "min-height": '160px', borderRadius: '15px' },
        },
        12: {
            title() { return "<h3>Reset replicanti, but gain galaxy dust. (Req: 1e10 replicanti)" },
            canClick() { return player.ca.replicanti.gte(1e10) },
            unlocked() { return true },
            onClick() {
                player.ca.galaxyDust = player.ca.galaxyDust.add(player.ca.galaxyDustToGet)
                player.ca.replicanti = new Decimal(1)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", border: '3px solid #241c44', borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#333c81" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        13: {
            title() { return "<h3>Reset replicanti, but gain a replicanti galaxy.<br>(Req: 1.79e308 replicanti)" },
            canClick() { return player.ca.replicanti.gte(1.79e308) && player.ca.replicantiGalaxies.lt(player.ca.replicantiGalaxiesCap) },
            unlocked() { return true },
            onClick() {
                player.ca.replicantiGalaxies = player.ca.replicantiGalaxies.add(1)
                player.ca.replicanti = new Decimal(1)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", border: '3px solid #241c44', borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#333c81" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        14: {
            title() { return "<h2>CONTEMPLATE INFINITY" },
            canClick() { return true },
            unlocked() { return hasUpgrade("bi", 28) },
            onClick() {
                player.tab = "cap"
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px' },
        },
        15: {
            title() { return "<h3>CONVERT A CANTE CORE INTO A REMEMBERANCE CORE" },
            canClick() { return player.ca.canteCores.gte(1) && player.oi.protoMemories.gte(player.ca.rememberanceCoreCost) },
            unlocked() { return true },
            onClick() {
                layers.ca.convertRememberanceCore();
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px' },
        },
        16: {
            title() { return "<h3>REMEMBER THE PROTO OVERWORLD. DESTROY CANTE. END THE SUFFERING. (REQ: 10 Rememberance Cores)" },
            canClick() { return player.ca.rememberanceCores.gte(10) },
            unlocked() { return true },
            onClick() {
                player.ca.defeatedCante = true
                player.tab = 'ca'
                player.microtabs["ca"]['stuff'] = 'Main'
            },
            style: { width: '500px', "min-height": '200px', borderRadius: '20px' },
        },
    },
    bars: {
        bar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 800,
            height: 50,
            progress() {
                return player.ca.canteEnergy.div(player.ca.canteEnergyReq)
            },
            fillStyle: {
                "background-color": "#193ceb",
            },
            display() {
                return "<h5>" + format(player.ca.canteEnergy) + "/" + formatWhole(player.ca.canteEnergyReq) + "<h5> Cante energy to gain a cante core.</h5>";
            },
        },
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.ca.replicantiTimer.div(player.ca.replicantiTimerReq)
            },
            fillStyle: {
                "background-color": "#193ceb",
            },
            display() {
                return "Time: " + formatTime(player.ca.replicantiTimer) + "/" + formatTime(player.ca.replicantiTimerReq);
            },
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e18) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.005) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Replicate Chance"
            },
            display() {
                return "which are increasing replicate chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(1e18)
                let growth = 10
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"}
        },
        12: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e19) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.075) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Replicanti Mult"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(1e19)
                let growth = 10
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"}
        },
        13: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e20) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.075).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Replicanti Interval"
            },
            display() {
                return "which are dividing replicanti interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(1e20)
                let growth = 100
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"}
        },
        14: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e13) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.005) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Replicate Chance+"
            },
            display() {
                return "which are increasing replicate chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(1e13)
                let growth = 10
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"}
        },
        15: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e14) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.075) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Replicanti Mult+"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(1e14)
                let growth = 10
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"}
        },
        16: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e15) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.075).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Replicanti Interval+"
            },
            display() {
                return "which are dividing replicanti interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(1e15)
                let growth = 100
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"}
        },
        17: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.008) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return "Replicate Chance++"
            },
            display() {
                return "which are increasing replicate chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                let base = new Decimal(3)
                let growth = 2
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"}
        },
        18: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(6) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05) },
            unlocked() { return hasUpgrade("bi", 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return "Replicanti Mult++"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                let base = new Decimal(6)
                let growth = 3
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"}
        },
        19: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return "Replicanti Interval++"
            },
            display() {
                return "which are dividing replicanti interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                let base = new Decimal(4)
                let growth = 10
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"}
        },
        21: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return "Dimension Boost Base"
            },
            display() {
                return "which are multiplying the dimension boost base by " + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.5
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#333c81', color: 'white'}
        },
        22: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(20) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return "Tickspeed Base"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to the tickspeed base.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                let base = new Decimal(20)
                let growth = 1.3
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#333c81', color: 'white'}
        },
        23: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return "MAX REPLICANTI GALAXIES"
            },
            display() {
                return "which are increasing replicanti galaxy capacity by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                let base = new Decimal(50)
                let growth = 3
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#333c81', color: 'white'}
        },
        24: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(150) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).mul(player.ca.galaxyDust.pow(0.3)).add(1) },
            unlocked() { return hasUpgrade('bi', 26) },
            canAfford() { return player.ca.galaxyDust.gte(this.cost()) },
            title() {
                return "INFINITY POINTS"
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (also based on galaxy dust)\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                let base = new Decimal(150)
                let growth = 1.4
                if (mult != true && !hasMilestone("s", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ca.galaxyDust = player.ca.galaxyDust.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ca.galaxyDust, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("s", 16)) player.ca.galaxyDust = player.ca.galaxyDust.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#333c81', color: 'white'}
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
            "Unlock": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return !player.ca.unlockedCante },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Unlock Replicanti:" }, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return formatWhole(player.cb.level) + "/250 Check Back Level" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return format(player.ad.antimatter) + "/1e600 Antimatter" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return formatWhole(player.in.infinities) + "/100,000 Infinities" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return format(player.h.hexPoint) + "/1e36 Hex Points" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return format(player.ta.highestDicePoints) + "/1e50 Highest Dice Points" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return format(player.cb.petPoints) + "/500 Pet Points" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                ]
            },
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.ca.unlockedCante },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.ca.replicanti) + "</h3> replicanti." }, { "color": "white", "font-size": "26px", "font-family": "monospace" }],
                    ["raw-html", function () { return "which boosts infinity points by <h3>" + format(player.ca.replicantiEffect) + "</h3>x, infinity dimensions by <h3>" + format(player.ca.replicantiEffect2) + "</h3>x, and points by <h3>" + format(player.ca.replicantiEffect3) + "</h3>x." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return !hasMilestone("r", 29) ? "(Caps out at 1.79e308 replicanti)" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["bar", "replicantiBar"]]],
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", function () { return "Replicanti Mult: " + format(player.ca.replicantiMult) + "x" }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
                        ["raw-html", () => {return hasMilestone("r", 29) && player.ca.replicanti.gte(1.79e308) ? "[SOFTCAPPED]" : ""}, { color: "red", fontSize: "18px", fontFamily: "monospace", paddingLeft: "10px"}]
                    ]],
                    ["raw-html", function () { return "Replicate Chance: " + format(player.ca.replicateChance.mul(100)) + "%" }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],
                        ["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16],
                        ["ex-buyable", 17], ["ex-buyable", 18], ["ex-buyable", 19]], {maxWidth: "900px"}],
                ]
            },
            "Galaxy Dust": {
                buttonStyle() { return { borderColor: "#241c44", backgroundColor: "#333c81", color: "white", borderRadius: "5px" }  },
                unlocked() { return player.ca.unlockedCante && hasUpgrade("bi", 26) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.ca.replicanti) + "</h3> replicanti." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.ca.galaxyDust) + "</h3> galaxy dust." }, { "color": "#979EE8", "font-size": "26px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Galaxy dust multiplies antimatter galaxy effect base by <h3>" + format(player.ca.galaxyDustEffect) + "</h3>x." }, { "color": "#979EE8", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.ca.galaxyDustToGet) + "</h3> galaxy dust on reset." }, { "color": "#979EE8", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24]], {maxWidth: "1200px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ca.replicantiGalaxies) + "/" + formatWhole(player.ca.replicantiGalaxiesCap) + "</h3> replicanti galaxies." }, { "color": "#979EE8", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(They just act like regular antimatter galaxies)" }, { "color": "#979EE8", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 13]]],
                ]
            },
            "CELESTIAL": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.ca.unlockedCante },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ca.canteCores) + "</h3> Cante cores." }, { "color": "white", "font-size": "26px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["bar", "bar"]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Energy multiplier: <h3>" + format(player.ca.canteEnergyMult) + "</h3>x" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Cante energy is gained by clicking on check back buttons." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Cante cores will have many uses in the future." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 14]]],
                ]
            },
            "REMEMBERANCE CORES": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("cp", 18) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ca.rememberanceCores) + "</h3> rememberance cores." }, { "color": "white", "font-size": "26px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your rememberance cores boost cante energy gain by x<h3>" + format(player.ca.rememberanceCoresEffect) + "</h3>." }, { "color": "white", "font-size": "26px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ca.canteCores) + "</h3> cante cores." }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.protoMemories) + "</h3> proto memories." }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 15]]],
                    ["raw-html", function () { return "Cost: <h3>" + format(player.ca.rememberanceCoreCost) + "</h3> proto memories." }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
                ]
            },
            "THE BARRIER": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("cp", 18) && !player.ca.defeatedCante },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 16]]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return (player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("bi", 24)) || hasMilestone("s", 19)}
})

// i came up with this guy's name
