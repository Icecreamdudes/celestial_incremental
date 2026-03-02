addLayer("ca", {
    name: "Cante, Celestial of Replicanti", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() { return "Ξ"} , // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U2",
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

        replicantiSoftcap: new Decimal(1),

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

        canteTrial1: false,
        canteTrial2: false,
        canteTrial3: false,
        canteTrial4: false,
        canteTrialCount: 0,

        cantepocalypseUnlock: false,
        cantepocalypsePrep: false,
        defeatedCante: false,
    }},
    automate() {
        if (hasMilestone("s", 16)) {
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
        player.ca.replicantiMult = player.ca.replicantiMult.mul(buyableEffect("g", 26))
        player.ca.replicantiMult = player.ca.replicantiMult.mul(levelableEffect("pet", 108)[0])
        if (hasUpgrade("ep0", 11)) player.ca.replicantiMult = player.ca.replicantiMult.mul(upgradeEffect("ep0", 11))
        if (hasUpgrade("bi", 117)) player.ca.replicantiMult = player.ca.replicantiMult.mul(3)
        if (hasUpgrade("hpw", 1062)) player.ca.replicantiMult = player.ca.replicantiMult.mul(3)
        player.ca.replicantiMult = player.ca.replicantiMult.mul(player.cof.coreFragmentEffects[5])
        
        player.ca.replicantiMult = player.ca.replicantiMult.div(player.ca.replicantiSoftcap)

        player.ca.replicantiTimerReq = new Decimal(1)
        player.ca.replicantiTimerReq = player.ca.replicantiTimerReq.div(buyableEffect("ca", 13))
        player.ca.replicantiTimerReq = player.ca.replicantiTimerReq.div(buyableEffect("ca", 16))
        player.ca.replicantiTimerReq = player.ca.replicantiTimerReq.div(buyableEffect("ca", 19))

        player.ca.replicateChance = new Decimal(0.02)
        player.ca.replicateChance = player.ca.replicateChance.add(buyableEffect("ca", 11))
        player.ca.replicateChance = player.ca.replicateChance.add(buyableEffect("ca", 14))
        player.ca.replicateChance = player.ca.replicateChance.add(buyableEffect("ca", 17))

        if (player.ca.unlockedCante && hasUpgrade("bi", 24)) player.ca.replicantiTimer = player.ca.replicantiTimer.add(onepersec.mul(delta))

        if (player.ca.replicantiTimer.gte(player.ca.replicantiTimerReq)) {
            layers.ca.replicantiMultiply();
        }

        if (player.ca.replicanti.gt(1)) { player.ca.replicantiEffect = player.ca.replicanti.add(1).log(10).pow(1.05).mul(10).add(1) } else { player.ca.replicantiEffect = new Decimal(1) }
        if (player.ca.replicanti.gt(1)) { player.ca.replicantiEffect2 = player.ca.replicanti.add(1).log(10).pow(1.17).mul(10).add(1) } else { player.ca.replicantiEffect2 = new Decimal(1) }
        player.ca.replicantiEffect3 = player.ca.replicanti.pow(0.5)
        
        if (hasUpgrade("bi", 117)) {
            player.ca.replicantiEffect = player.ca.replicantiEffect.pow(player.ca.replicanti.plus(1).log(10).pow(0.4))
            player.ca.replicantiEffect2 = player.ca.replicantiEffect2.pow(player.ca.replicanti.plus(1).log(10).pow(0.45))
            player.ca.replicantiEffect3 = player.ca.replicantiEffect3.pow(player.ca.replicanti.plus(1).log(10).pow(0.4))
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
        player.ca.galaxyDustToGet = player.ca.galaxyDustToGet.mul(buyableEffect("cof", 28))

        if (hasMilestone("s", 13)) player.ca.galaxyDust = player.ca.galaxyDust.add(Decimal.mul(player.ca.galaxyDustToGet.mul(0.01), delta))

        player.ca.galaxyDustEffect = player.ca.galaxyDust.plus(1).log10().mul(0.1).add(1)
        player.ca.galaxyDustEffect = player.ca.galaxyDustEffect.pow(buyableEffect("cof", 27))

        //rep galax
        player.ca.replicantiGalaxiesCap = buyableEffect("ca", 23)
        if (hasUpgrade("cs", 1003)) player.ca.replicantiGalaxies = player.ca.replicantiGalaxiesCap

        //rememberance
        player.ca.rememberanceCoreCost = player.ca.rememberanceCores.add(1).pow(1.5).mul(1000)
        player.ca.rememberanceCoresEffect = player.ca.rememberanceCores.mul(0.05).add(1)

        if (player.ca.replicanti.gte("1.8e308")) {
            player.ca.replicantiSoftcap = Decimal.pow(10, player.ca.replicanti.div(1.79e308).add(1).log(1e100))
        } else {
            player.ca.replicantiSoftcap = new Decimal(1)
        }

        // Cantepocalypse Stuff
        if (player.ca.canteTrialCount >= 4) {
            player.ca.cantepocalypseUnlock = true
            if (player.tab == "ca" && player.subtabs["ca"]['stuff'] == 'Trials' && !hasUpgrade("cp", 18) && player.s.highestSingularityPoints.eq(0)) {
                player.ca.cantepocalypsePrep = true
            }
        }
    },
    gainCanteCore() {
        let leftover = new Decimal(0)
        leftover = player.ca.canteEnergy.sub(player.ca.canteEnergyReq)
        player.ca.canteCores = player.ca.canteCores.add(1)
        player.ca.canteEnergy = new Decimal(0)
        player.ca.canteEnergy = player.ca.canteEnergy.add(leftover)
    },
    convertRememberanceCore() {
        player.ca.canteCores = player.ca.canteCores.sub(1)
        player.oi.protoMemories = player.oi.protoMemories.sub(player.ca.rememberanceCoreCost)
        player.ca.rememberanceCores = player.ca.rememberanceCores.add(1)
    },
    replicantiMultiply() {
        let random = new Decimal(0)
        random = Math.random()
        if (random < player.ca.replicateChance) {
            if (player.ca.replicanti.lt(1.79e308) || hasUpgrade("ma", 21)) {
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
        15: {
            title() { return "<h3>Convert a cante core into a rememberance core</h3><br>Cost: " + format(player.ca.rememberanceCoreCost) + " Proto Memories" },
            canClick() { return player.ca.canteCores.gte(1) && player.oi.protoMemories.gte(player.ca.rememberanceCoreCost) },
            unlocked: true,
            onClick() {
                layers.ca.convertRememberanceCore();
            },
            style: {width: "300px", minHeight: "100px", borderRadius: "15px"},
        },
        16: {
            title() { return "<h2>REMEMBER THE PROTO OVERWORLD.<br>DESTROY CANTE.<br>END THE SUFFERING.</h2><br><br><h3>[REQ: 10 Rememberance Cores]</h3>" },
            canClick() { return player.ca.rememberanceCores.gte(10) },
            unlocked() { return true },
            onClick() {
                player.ca.defeatedCante = true
                player.tab = 'ca'
                player.subtabs["ca"]['stuff'] = 'Main'
            },
            style() {
                let look = {width: "450px", minHeight: "150px", color: "white", border: "8px solid #626170", borderRadius: "40px"}
                this.canClick() ? look.backgroundColor = "#4b4a5b" : look.backgroundColor = "#361e1e"
                return look
            },
        },
        101: {
            title() {
                if (player.ca.canteTrial1) return "<img src='resources/lock_unlocked.png' width='90px' height='90px' style='margin-bottom:-5px'></img>"
                return "<img src='resources/lock_locked.png' width='90px' height='90px' style='margin-bottom:-5px'></img>"
            },
            canClick() {return !player.ca.canteTrial1 && challengeCompletions("ip", 11) >= 2 && challengeCompletions("ip", 12) >= 2 && challengeCompletions("ip", 13) >= 2 && challengeCompletions("ip", 14) >= 2},
            unlocked: true,
            tooltip: "Conquer the second clears of the infinity challenges.",
            onClick() {
                player.ca.canteTrial1 = true
                player.ca.canteTrialCount += 1
            },
            style() {
                let look = {width: "100px", minHeight: "100px", background: "transparent", border: "none", borderRadius: "50%", padding: "0", boxShadow: "0 0 !important"}
                if (player.ca.canteTrial1) look.cursor = "default"
                return look
            },
        },
        102: {
            title() {
                if (player.ca.canteTrial2) return "<img src='resources/lock_unlocked.png' width='90px' height='90px' style='margin-bottom:-5px'></img>"
                return "<img src='resources/lock_locked.png' width='90px' height='90px' style='margin-bottom:-5px'></img>"
            },
            canClick() {return !player.ca.canteTrial2 && getLevelableTier("pet", 101).gte(1)},
            unlocked: true,
            tooltip: "Ascend a cat-like companion.",
            onClick() {
                player.ca.canteTrial2 = true
                player.ca.canteTrialCount += 1
            },
            style() {
                let look = {width: "100px", minHeight: "100px", background: "transparent", border: "none", borderRadius: "50%", padding: "0", boxShadow: "0 0 !important"}
                if (player.ca.canteTrial2) look.cursor = "default"
                return look
            },
        },
        103: {
            title() {
                if (player.ca.canteTrial3) return "<img src='resources/lock_unlocked.png' width='90px' height='90px' style='margin-bottom:-5px'></img>"
                return "<img src='resources/lock_locked.png' width='90px' height='90px' style='margin-bottom:-5px'></img>"
            },
            canClick() {return !player.ca.canteTrial3 && (challengeCompletions("hrm", 13) > 0)},
            unlocked: true,
            tooltip: "Survive a remnant of the realm of death.",
            onClick() {
                player.ca.canteTrial3 = true
                player.ca.canteTrialCount += 1
            },
            style() {
                let look = {width: "100px", minHeight: "100px", background: "transparent", border: "none", borderRadius: "50%", padding: "0", boxShadow: "0 0 !important"}
                if (player.ca.canteTrial3) look.cursor = "default"
                return look
            },
        },
        104: {
            title() {
                if (player.ca.canteTrial4) return "<img src='resources/lock_unlocked.png' width='90px' height='90px' style='margin-bottom:-5px'></img>"
                return "<img src='resources/lock_locked.png' width='90px' height='90px' style='margin-bottom:-5px'></img>"
            },
            canClick() {return !player.ca.canteTrial4 && player.ca.replicanti.gte(1.79e308)},
            unlocked: true,
            tooltip: "Cap out your replicanti.",
            onClick() {
                player.ca.canteTrial4 = true
                player.ca.canteTrialCount += 1
            },
            style() {
                let look = {width: "100px", minHeight: "100px", background: "transparent", border: "none", borderRadius: "50%", padding: "0", boxShadow: "0 0 !important"}
                if (player.ca.canteTrial4) look.cursor = "default"
                return look
            },
        },
    },
    bars: {
        bar: {
            unlocked: true,
            direction: RIGHT,
            width: 700,
            height: 50,
            progress() {
                return player.ca.canteEnergy.div(player.ca.canteEnergyReq)
            },
            borderStyle: {border: "3px solid white", borderBottom: "0px", borderRadius: "20px 20px 0 0"},
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#05415c"},
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
                if (player.ca.replicantiTimerReq.lte(0.05)) return new Decimal(1)
                return player.ca.replicantiTimer.div(player.ca.replicantiTimerReq)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#193ceb"},
            display() {
                if (player.ca.replicantiTimerReq.lte(0.05)) return "Interval Maxed"
                return "Time: " + formatTime(player.ca.replicantiTimer) + "/" + formatTime(player.ca.replicantiTimerReq);
            },
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1e18) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(78) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.005) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicate Chance"
            },
            display() {
                return "which are increasing replicate chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"},
        },
        12: {
            costBase() { return new Decimal(1e19) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.075) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Mult"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"},
        },
        13: {
            costBase() { return new Decimal(1e20) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.075).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Interval"
            },
            display() {
                return "which are dividing replicanti interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"},
        },
        14: {
            costBase() { return new Decimal(1e13) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(78) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.005) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicate Chance+"
            },
            display() {
                return "which are increasing replicate chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"},
        },
        15: {
            costBase() { return new Decimal(1e14) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.075) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Mult+"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"},
        },
        16: {
            costBase() { return new Decimal(1e15) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.075).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Interval+"
            },
            display() {
                return "which are dividing replicanti interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"},
        },
        17: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ca.galaxyDust},
            pay(amt) { player.ca.galaxyDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.008) },
            unlocked() {return hasUpgrade('bi', 26)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicate Chance++"
            },
            display() {
                return "which are increasing replicate chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"},
        },
        18: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ca.galaxyDust},
            pay(amt) { player.ca.galaxyDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05) },
            unlocked() {return hasUpgrade('bi', 26)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Mult++"
            },
            display() {
                return "which are increasing replicanti mult by +" + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"},
        },
        19: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ca.galaxyDust},
            pay(amt) { player.ca.galaxyDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() {return hasUpgrade('bi', 26)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Interval++"
            },
            display() {
                return "which are dividing replicanti interval by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#44ABD9", backgroundImage: "linear-gradient(0deg, #0a82b9 0%, #7dd3f9 100%)", backgroundOrigin: "border-box"},
        },
        21: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ca.galaxyDust},
            pay(amt) { player.ca.galaxyDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dimension Boost Base"
            },
            display() {
                return "which are multiplying the dimension boost base by " + format(tmp[this.layer].buyables[this.id].effect) + "x.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#333c81', color: 'white'},
        },
        22: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ca.galaxyDust},
            pay(amt) { player.ca.galaxyDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tickspeed Base"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to ADs tickspeed base.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#333c81', color: 'white'},
        },
        23: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ca.galaxyDust},
            pay(amt) { player.ca.galaxyDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "MAX REPLICANTI GALAXIES"
            },
            display() {
                return "which are increasing replicanti galaxy capacity by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#333c81', color: 'white'},
        },
        24: {
            costBase() { return new Decimal(150) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ca.galaxyDust},
            pay(amt) { player.ca.galaxyDust = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).mul(player.ca.galaxyDust.pow(0.3)).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "INFINITY POINTS"
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (also based on galaxy dust)\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Galaxy Dust"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '275px', height: '150px', backgroundColor: '#333c81', color: 'white'},
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
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
                    ["raw-html", () => {return "You have <h3>" + format(player.ca.replicanti) + "</h3> replicanti." }, { "color": "white", "font-size": "26px", "font-family": "monospace" }],
                    ["raw-html", () => {return "Boosts infinity points by x" + format(player.ca.replicantiEffect)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Boosts infinity dimensions by x" + format(player.ca.replicantiEffect2)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Boosts points by x" + format(player.ca.replicantiEffect3)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return !hasUpgrade("ma", 21) ? "(Caps out at 1.79e308 replicanti)" : "After 1.79e308 replicanti, Replicanti Mult is divided by /" + format(player.ca.replicantiSoftcap) + "."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["bar", "replicantiBar"]]],
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", function () { return "Replicanti Mult: " + format(player.ca.replicantiMult) + "x" }, { "color": "white", "font-size": "22px", "font-family": "monospace" }],
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
                    ["raw-html", () => {return "You have <h3>" + format(player.ca.replicanti) + "</h3> replicanti." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.ca.galaxyDust) + "</h3> galaxy dust"}, {color: "#979EE8", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.ca.galaxyDustToGet) + ")"}, () => {
                            let look = {color: "#979EE8", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.ca.replicanti.gte(1e10) ? look.color = "#979EE8" : look.color = "gray"
                            return look
                        }],
                    ]],
                    ["raw-html", () => {return "Boosts antimatter galaxy effect base by x" + format(player.ca.galaxyDustEffect)}, {color: "#979EE8", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24]], {maxWidth: "1200px"}],
                    ["blank", "25px"],
                    ["raw-html", () => {return "You have <h3>" + formatWhole(player.ca.replicantiGalaxies) + "/" + formatWhole(player.ca.replicantiGalaxiesCap) + "</h3> replicanti galaxies." }, {color: "#979EE8", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "(They just act like regular antimatter galaxies)" }, {color: "#979EE8", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 13]]],
                ]
            },
            "Cante Energy": {
                buttonStyle() { return { color: "white", background: "#05415c", borderColor: "#086894", borderRadius: "5px" } },
                unlocked() { return player.ca.unlockedCante },
                content: [
                    ["blank", "25px"],
                    ["bar", "bar"],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", () => {return "You have <h3>" + formatWhole(player.ca.canteCores) + "</h3> Cante cores."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Energy multiplier: <h3>" + format(player.ca.canteEnergyMult) + "</h3>x"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "20px"],
                            ["raw-html", "Cante energy is gained by clicking on check back buttons.", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                            ["blank", "10px"],
                        ], () => {return hasUpgrade("cp", 18) ? {width: "347px", height: "220px", borderRight: "3px solid white"} : {width: "700px", height: "220px"}}],
                        ["style-column", [
                            ["raw-html", () => {return "You have <h3>" + formatWhole(player.ca.rememberanceCores) + "</h3> remembrance cores."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Boosts cante energy gain by x<h3>" + format(player.ca.rememberanceCoresEffect) + "</h3>."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "10px"],
                            ["raw-html", () => {return "You have <h3>" + format(player.oi.protoMemories) + "</h3> proto memories."}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                            ["blank", "20px"],
                            ["clickable", 15],
                        ], () => {return hasUpgrade("cp", 18) ? {width: "350px", height: "220px"} : {display: "none !important"}}],
                    ], {width: "700px", background: "#086894", border: "3px solid white", borderRadius: "0 0 20px 20px"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 14]]],
                ]
            },
            "Trials": {
                buttonStyle() { return { color: "white", background: "#1F1E33", borderColor: "#626170", borderRadius: "5px" } },
                unlocked() { return player.ca.unlockedCante && hasUpgrade("bi", 28) },
                content: [
                    ["blank", "25px"],
                    ["top-column", [
                        ["blank", "25px"],
                        ["style-row", [
                            ["raw-html", () => {return player.ca.canteTrialCount >= 4 ? "THERE IS NO RETURN ..." : "You must pass 4 trials in order to start the ???."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "500px", height: "100px", background: "rgba(0,0,0,0.3)", border: "3px solid #626170", borderRadius: "20px"}],
                        ["blank", "25px"],
                        ["style-row", [
                            ["style-column", [
                                ["clickable", 101],
                                ["blank", "75px"],
                                ["clickable", 102],
                            ], {width: "146px", height: "500px"}],
                            ["style-row", [], {width: "8px", height: "500px", background: "#353447"}],
                            ["style-column", [
                                ["clickable", 103],
                                ["blank", "75px"],
                                ["clickable", 104],
                            ], {width: "146px", height: "500px"}],
                        ], () => {return player.ca.canteTrialCount < 4 ? {width: "300px", height: "500px", background: "#4b4a5b", border: "8px solid #353447", borderRadius: "150px 150px 0 0"} : {display: "none !important"}}],
                        ["style-row", [
                            ["style-row", [], {width: "146px", height: "500px", background: "#4b4a5b", border: "8px solid #353447", borderRadius: "0 150px 0 0", marginRight: "-8px"}],
                            ["style-row", [
                                ["tree", [["cp"]]],
                            ], {width: "300px", height: "500px", background: "radial-gradient(#000000, #181828)", border: "8px solid #353447", borderRadius: "150px 150px 0 0"}],
                            ["style-row", [], {width: "146px", height: "500px", background: "#4b4a5b", border: "8px solid #353447", borderRadius: "150px 0 0 0", marginLeft: "-8px"}],
                        ], () => {return player.ca.canteTrialCount >= 4 ? {} : {display: "none !important"}}],
                    ], {width: "700px", height: "700px", background: "#181828", border: "3px solid #626170", borderRadius: "20px"}],
                ]
            },
            "THE BARRIER": {
                buttonStyle() { return { color: "white", background: "#1F1E33", borderColor: "#626170", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("cp", 18) && !player.ca.defeatedCante },
                content: [
                    ["blank", "100px"],
                    ["clickable", 16],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return (player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("bi", 24)) || hasMilestone("s", 19)}
})

// i came up with this guy's name
