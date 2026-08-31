addLayer("dt", {
    name: "Time Capsules", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    universe: "D1",
    startData() { return {
        unlocked: true,

        timeCapsuleResetSafety: false,

        timeCapsules: new Decimal(0),
        timeCapsuleEffect: new Decimal(1),
        timeCapsulesToGet: new Decimal(0),
        storedToGet: new Decimal(0),

        timeEnergy: new Decimal(0),
        timeEnergyEffect: new Decimal(1),
        timeEnergyToGet: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #12332b 0%, #00663c 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#29a653",
            color: "#eaf6f7",
        };
    },
    tooltip: "Time Capsules",
    branches: [["dv", "#309"]],
    color: "#29a653",
    update(delta) {
        let onepersec = new Decimal(1)

        player.dt.timeCapsulesToGet = player.dv.clouds.div(1e25).pow(0.2)
        if (getLevelableTier("pu", 114, true)) player.dt.timeCapsulesToGet = player.dt.timeCapsulesToGet.mul(levelableEffect("pu", 114)[0])
        if (getLevelableTier("pu", 215, true)) player.dt.timeCapsulesToGet = player.dt.timeCapsulesToGet.mul(levelableEffect("pu", 215)[0])
        if (hasAchievement("achievements", 1204)) player.dt.timeCapsulesToGet = player.dt.timeCapsulesToGet.mul(1.1)

        player.dt.timeCapsulesToGet = player.dt.timeCapsulesToGet.floor()

        player.dt.timeCapsuleEffect = player.dt.timeCapsules.add(1).log(10).add(1).pow(0.5).sub(1).pow_base(10).pow(1.5).sub(1).div(2).add(1)
        player.dt.timeCapsuleEffect = player.dt.timeCapsuleEffect.pow(buyableEffect("dt", 15))

        // time energy
        
        player.dt.timeEnergyToGet = player.dt.timeCapsules.pow(2)
        player.dt.timeEnergyToGet = player.dt.timeEnergyToGet.mul(buyableEffect("dt", 11))
        if (getLevelableTier("pu", 214, true)) player.dt.timeEnergyToGet = player.dt.timeEnergyToGet.mul(levelableEffect("pu", 214)[0])
        if (hasAchievement("achievements", 1215)) player.dt.timeCapsulesToGet = player.dt.timeCapsulesToGet.mul(2)

        player.dt.timeEnergy = player.dt.timeEnergy.add(player.dt.timeEnergyToGet.mul(delta))

        player.dt.timeEnergyEffect = player.dt.timeEnergy.add(1).log(10).pow(1.5).div(50).add(1)

        // stored

        player.dt.storedToGet = player.dt.timeCapsules.div(100).log(10).add(1).pow(0.2).sub(1).pow_base(10).sub(1).mul(5).add(1)
        player.dt.storedToGet = player.dt.storedToGet.mul(buyableEffect("dt", 16))
        player.dt.storedToGet = player.dt.storedToGet.mul(player.pri.fountains[6].completionEffect)
        player.dt.storedToGet = player.dt.storedToGet.mul(buyableEffect("st", 207))
        if (hasMilestone("prj", 104)) player.dt.storedToGet = player.dt.storedToGet.mul(player.sma.eclipseExitTime.min(86400).div(2700).add(1).pow(0.3));
        player.dt.storedToGet = player.dt.storedToGet.floor()
        if (hasMilestone("prj", 205)) player.dt.storedToGet = player.dt.storedToGet.mul(2);
        if (hasMilestone("prj", 305)) player.dt.storedToGet = player.dt.storedToGet.mul(2);

        if (player.dt.timeCapsules.lt(100)) player.dt.storedToGet = new Decimal(0);
        if (getLevelableTier("pu", 214, true)) player.dt.storedToGet = player.dt.storedToGet.add(1);
        if (hasAchievement("achievements", 1206)) player.dt.storedToGet = player.dt.storedToGet.add(1);
        
        // reset cooldown
        
        player.dt.timeCapsuleResetSafety = false
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h3>Reset previous content, but gain time capsules. (based on clouds)</h3><br>Req: 1e25 Clouds" },
            canClick() { return player.dt.timeCapsulesToGet.gte(1) && !player.dt.timeCapsuleResetSafety },
            unlocked() { return true },
            onClick() {
                layers.dt.timeCapsuleReset();

                player.dt.timeCapsuleResetSafety = true
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", maxHeight: "100px", borderRadius: "10px", color: "white", border: "2px solid #29a653", padding: "8px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    timeCapsuleReset() {
        player.dt.timeCapsules = player.dt.timeCapsules.add(player.dt.timeCapsulesToGet)

        player.db.boosters = new Decimal(0)
        player.db.boosterBulk = new Decimal(0)

        layers.dg.generatorReset()

        if (!hasMilestone("prj", 110)) {
            player.db.boosters = new Decimal(0)
            for (let i = 0; i < player.db.milestones.length; i++) {
                if (+player.db.milestones[i] < 101) {
                    player.db.milestones.splice(i, 1);
                    i--;
                }
            }
        }

        player.dv.clouds = new Decimal(0)

        player.dv.buyables[11] = new Decimal(0)
        player.dv.buyables[12] = new Decimal(0)
        player.dv.buyables[13] = new Decimal(0)
        player.dv.buyables[14] = new Decimal(0)
        player.dv.buyables[15] = new Decimal(0)
        player.dv.buyables[16] = new Decimal(0)

        player.dgr.grass = new Decimal(0)
        for (let i = 1; i < (tmp.dgr.grid.cols + "0" + (tmp.dgr.grid.rows + 1)); ) {
            setGridData("dgr", i, new Decimal(0))

            // Increase i value
            if (i % tmp.dgr.grid.rows == 0) {
                i = i+(101-tmp.dgr.grid.rows)
            } else {
                i++
            }
        }

        player.dgr.buyables[11] = new Decimal(0)
        player.dgr.buyables[12] = new Decimal(0)
        player.dgr.buyables[13] = new Decimal(0)
        player.dgr.buyables[14] = new Decimal(0)
        player.dgr.buyables[15] = new Decimal(0)
        player.dgr.buyables[16] = new Decimal(0)

        if (hasUpgrade("dv", 11)) player.dv.upgrades = [11, 14];
        else player.dv.upgrades = [14];
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dt.timeEnergy},
            pay(amt) { player.dt.timeEnergy = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(1.5)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Speed-Up"
            },
            display() {
                return "which are boosting time energy and cloud gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Energy"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (true) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "black", }
        },
        12: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dt.timeEnergy},
            pay(amt) { player.dt.timeEnergy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).div(20).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Power-Up"
            },
            display() {
                return "which are boosting the booster effect by ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Energy"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (true) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "black", }
        },
        13: {
            costBase() { return new Decimal(1e3) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dt.timeEnergy},
            pay(amt) { player.dt.timeEnergy = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Running Out of Time"
            },
            display() {
                return "which are reducing the eclipse timer tickspeed by /" + format(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Energy"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (true) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "black", }
        },
        14: {
            costBase() { return new Decimal(1e20) },
            costGrowth() { return new Decimal(40) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dt.timeEnergy},
            pay(amt) { player.dt.timeEnergy = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(0.5).pow_base(2)
                return eff
            },
            unlocked() { return hasMilestone("prj", 106) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Make Haste"
            },
            display() {
                return "which are boosting D1 tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Energy"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (true) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "black", }
        },
        15: {
            costBase() { return new Decimal(1e25) },
            costGrowth() { return new Decimal(60) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dt.timeEnergy},
            pay(amt) { player.dt.timeEnergy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).div(10).add(1) },
            unlocked() { return hasMilestone("prj", 106) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Intense Forces"
            },
            display() {
                return "which are boosting the time capsule effect by ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Energy"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (true) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "black", }
        },
        16: {
            costBase() { return new Decimal(1e30) },
            costGrowth() { return new Decimal(1e2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dt.timeEnergy},
            pay(amt) { player.dt.timeEnergy = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(0.85).pow_base(1.25)
                return eff
            },
            unlocked() { return hasMilestone("prj", 106) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "All Your Focus"
            },
            display() {
                return "which are multiplying stored time capsules by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Energy"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (true) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "black", }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #29a653", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["raw-html", () => { return "You have " + formatWhole(player.dt.timeCapsules) + " time capsules."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "(+" + formatWhole(player.dt.timeCapsulesToGet) + ")"}, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.dt.timeCapsulesToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Boosts D1 tickspeed by x" + format(player.dt.timeCapsuleEffect) + "."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "You will store " + formatWhole(player.dt.storedToGet) + " time capsules when you leave D1."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => { return "You have " + format(player.dt.timeEnergy) + " time energy."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "(+" + format(player.dt.timeEnergyToGet) + "/s)"}, () => {
                            let look = {color: "white", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}
                            player.dt.timeEnergyToGet.gt(0) ? look.display = "" : look.display = "none !important"
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Boosts eclipse shard xp value by x" + format(player.dt.timeEnergyEffect) + "."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [
                        ["dark-buyable", 11], ["dark-buyable", 12], ["dark-buyable", 13], 
                    ]],
                    ["row", [
                        ["dark-buyable", 14], ["dark-buyable", 15], ["dark-buyable", 16], 
                    ]],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return hasUpgrade("dv", 14) },
    deactivated() { return !player.sma.inStarmetalChallenge},
    hotkeys: [
        {
            key: "t", 
            description: "Reset for Time Capsules",
            onPress() {
                clickClickable(this.layer, 11)
            },
        },  
    ],
})