addLayer("bl", {
    name: "Blood", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BL", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        blood: new Decimal(0),
        bloodEffect: new Decimal(1),
        bloodToGet: new Decimal(1),

        bloodStones: new Decimal(0),

        bloodDrain: false,
        bloodDrainPerSecond: new Decimal(0.1),

        xpGainPercentage: new Decimal(0),
    }},
    automate() {

    },
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #410f2aff 0%, #4f1818ff 50%, #290303ff 100%)",
            "background-origin": "border-box",
            "border-color": "#f57171ff",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Blood",
    branches: [["le", "#f57171ff"]],
    color: "#4f1818ff",
    update(delta) {
        let onepersec = new Decimal(1)

        if (arena == null && player.subtabs["bl"]['stuff'] == 'Battle') {
            player.subtabs["bl"]['stuff'] = "Refresh Page :(";
        }
        player.bl.bloodToGet = player.du.points.plus(1).log10().div(100).div(player.bl.blood.add(1).add(player.bl.bloodToGet))
        if (getLevelableBool("pu", 401)) player.bl.bloodToGet = player.bl.bloodToGet.mul(levelableEffect("pu", 401)[0])
        player.bl.bloodToGet = player.bl.bloodToGet.mul(buyableEffect("bl", 23))

        player.bl.bloodEffect = player.bl.blood.pow(0.25).div(10).add(1)

        if (player.bl.bloodDrain && player.bl.blood.gte(0))
        {
            player.bl.bloodDrainPerSecond = Decimal.mul(0.1, player.bl.blood.pow(0.2))
            player.bl.bloodDrainPerSecond = player.bl.bloodDrainPerSecond.mul(buyableEffect("bl", 11)[1])
            player.bl.bloodDrainPerSecond = player.bl.bloodDrainPerSecond.div(buyableEffect("bl", 13))
        } else
        {
            player.bl.bloodDrain = false
            player.bl.bloodDrainPerSecond = new Decimal(0)
        }
        if (player.bl.blood.lte(0))
        {
            player.bl.blood = new Decimal(0)
        }
        player.bl.blood = player.bl.blood.sub(player.bl.bloodDrainPerSecond.mul(delta))

        player.bl.xpGainPercentage = new Decimal(0.01)
        player.bl.xpGainPercentage = player.bl.xpGainPercentage.mul(buyableEffect("bl", 11)[0])
        player.bl.xpGainPercentage = player.bl.xpGainPercentage.mul(buyableEffect("bl", 12))

        if (!player.pet.activeAbilities[0])
        {
            for (let prop in player.pu.levelables) {
                if (getLevelableBool("pu", prop)) {
                    if (player.bl.bloodDrain) addLevelableXP("pu", prop, player.le.starmetalAlloyToGetTrue.mul(player.bl.xpGainPercentage.mul(delta)).floor())
                }
            }
        } else
        {
            for (let prop in player.pu.levelables) {
                if (getLevelableBool("pu", prop)) {
                    if (player.bl.bloodDrain) addLevelableXP("pu", prop, player.le.eclipseShardsToGetTrue.mul(player.bl.xpGainPercentage.mul(delta)).floor())
                }
            }
        }

        player.bl.bloodStones = player.bl.bloodStones.floor()
    },
    bars: {},
    clickables: {
        11: {
            title() { return player.ir.shipCooldownTimers[player.ir.shipType].lte(0) ? "<h2>Enter Blood Battle" : "<h2>Cooldown: " + formatTime(player.ir.shipCooldownTimers[player.ir.shipType])},
            canClick() { return player.ir.shipCooldownTimers[player.ir.shipType].lte(0) },
            unlocked() { return true },
            tooltip() { return "Blood... The elixir of humanity." },
            onClick() {
                player.ir.inBattle = true
                player.ma.inBlackHeart = true
                player.subtabs["bl"]['stuff'] = 'Battle'

                arena = new BloodArena(1200, 600);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                player.ir.shipHealth = player.ir.shipHealthMax
                if (hasUpgrade("ir", 14)) arena.upgradeEffects.hpRegen += 0.5 / 60

                arena.upgradeEffects.attackDamage *= levelableEffect("ir", player.ir.shipType)[2]
            },
            style: { width: '300px', "min-height": '100px', color: "white" },
        },
        12: {
            title() { return "<h2>Leave Battle" },
            canClick() { return true },
            unlocked() { return !player.ir.iriditeFightActive || player.subtabs["ir"]["stuff"] == "Refresh Page :("},
            onClick() {
                player.ir.inBattle = false
                player.ma.inBlackHeart = false
                player.subtabs["bl"]['stuff'] = 'Blood Battle'

                if (arena) {
                    arena.removeArena();
                    arena = null;
                }
                localStorage.setItem('arenaActive', 'false');

                player.ir.shipCooldownTimers[player.ir.shipType] = player.ir.shipCooldownMax[player.ir.shipType]

                player.ir.battleXP = new Decimal(0)
                player.ir.battleLevel = new Decimal(0)
            },
            style: { width: '300px', "min-height": '100px', color: "white" },
        },

        101: {
            title() { return "<h2>Perform a starmetal equivalent reset for blood. (Based on points, decreases with blood)" },
            canClick() { return player.bl.bloodToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.bl.blood = player.bl.blood.add(player.bl.bloodToGet)

                player.le.starmetalAlloyPause = new Decimal(10)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #f57171ff", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        102: {
            title() { return "<h2>Start draining blood into punchcards." },
            canClick() { return !player.bl.bloodDrain },
            unlocked() { return true },
            onClick() {
                player.bl.bloodDrain = true
            },
            style() {
                let look = {width: "200px", minHeight: "100px", borderRadius: "15px 0px 0px 15px", color: "white", border: "2px solid #f57171ff", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        103: {
            title() { return "<h2>Stop draining blood into punchcards." },
            canClick() { return player.bl.bloodDrain },
            unlocked() { return true },
            onClick() {
                player.bl.bloodDrain = false
            },
            style() {
                let look = {width: "200px", minHeight: "100px", borderRadius: "0px 15px 15px 0px", color: "white", border: "2px solid #f57171ff", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    bloodReset() {
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.bl.bloodStones},
            pay(amt) { player.bl.bloodStones = this.currency().sub(amt) },
            effect(x) { return [getBuyableAmount(this.layer, this.id).pow(0.5).div(5).add(1), getBuyableAmount(this.layer, this.id).pow(0.4).div(8).add(1)] },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Enhanced Drainage"
            },
            display() {
                return "which are boosting punchcard XP gain by x" + format(tmp[this.layer].buyables[this.id].effect[0]) + ".\n\also multiplying drain rate by x" + format(tmp[this.layer].buyables[this.id].effect[1]) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blood Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#420303ff", borderColor: "#f57171ff" }
        },
        12: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.bl.bloodStones},
            pay(amt) { player.bl.bloodStones = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.45).div(7).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pure Drainage"
            },
            display() {
                return "which are boosting punchcard XP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blood Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#420303ff", borderColor: "#f57171ff" }
        },
        13: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.bl.bloodStones},
            pay(amt) { player.bl.bloodStones = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).div(10).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Blood Preservation"
            },
            display() {
                return "which are dividing blood drain rate by /" + format(tmp[this.layer].buyables[this.id].effect) + "\n\Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blood Stones"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#420303ff", borderColor: "#f57171ff" }
        },

        //regular blood
        21: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.bl.blood},
            pay(amt) { player.bl.blood = this.currency().sub(amt) },
            effect(x) { return Decimal.div(1, getBuyableAmount(this.layer, this.id).add(1).pow(0.1)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Bloody Reduction"
            },
            display() {
                return "which are reducing starmetal requirement by ^" + format(tmp[this.layer].buyables[this.id].effect) + "\n\Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blood."
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#420303ff", borderColor: "#f57171ff" }
        },
        22: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.bl.blood},
            pay(amt) { player.bl.blood = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(2).pow(0.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Bloody Alloy"
            },
            display() {
                return "which are boosting starmetal alloy gain by x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blood."
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#420303ff", borderColor: "#f57171ff" }
        },
        23: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.bl.blood},
            pay(amt) { player.bl.blood = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(3).pow(0.4).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Bloody Blood"
            },
            display() {
                return "which are boosting blood gain by x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blood."
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#420303ff", borderColor: "#f57171ff" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #f57171ff", borderRadius: "10px" } },
                unlocked() { return !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.bl.blood) + "</h3> blood."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.bl.bloodToGet) + ")" }, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.bl.bloodToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],

                    ]],
                    ["raw-html", () => {return "Boosts punchcard efficiency by ^" + format(player.bl.bloodEffect) + ". (Only active effects)"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 101]]],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 21], ["dark-buyable", 22], ["dark-buyable", 23],]], 
                    ["blank", "25px"]

                ]
            },
            "Blood Draining": {
                buttonStyle() { return { border: "2px solid #f57171ff", borderRadius: "10px" } },
                unlocked() { return !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.bl.blood) + "</h3> blood."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.bl.bloodToGet) + ")" }, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.bl.bloodToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                //        ["raw-html", () => {return (player.dp.prestigePointsToGet.gte(1e250)) ? "[SOFTCAPPED<sup>2</sup>]" : player.du.points.div(1000).pow(0.25).gte(1e7) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "You are draining " + format(player.bl.bloodDrainPerSecond) + " blood per second."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return !player.pet.activeAbilities[0] ? "You will gain " + format(player.bl.xpGainPercentage.mul(100)) + "% of punchcard XP per second. (+"+ format(player.le.starmetalAlloyToGetTrue.mul(player.bl.xpGainPercentage)) +"/s) <br>(Only the currently active ones)" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.pet.activeAbilities[0] ? "You will gain " + format(player.bl.xpGainPercentage.mul(100)) + "% of punchcard XP per second. (+"+ format(player.le.eclipseShardsToGetTrue.mul(player.bl.xpGainPercentage)) +"/s) <br>(Only the currently active ones)" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 102], ["clickable", 103]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have " + formatWhole(player.bl.bloodStones) + " blood stones." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 11], ["dark-buyable", 12], ["dark-buyable", 13],]], 

                ]
            },
            "Blood Battle": {
                buttonStyle() { return { border: "2px solid #f57171ff", borderRadius: "10px" } },
                unlocked() { return !player.ir.inBattle },
                content: [
                ["layer-proxy", ["ir", [
                    ["blank", "25px"],
                    ["style-row", [
                    ["style-column", [
                    ["blank", "25px"],
                    ["layer-proxy", ["bl", [
                    ["clickable", 11],
                    ]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have " + formatWhole(player.bl.bloodStones) + " blood stones." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2],], {width: '100px', height: '40px' }],
                            ]],
                    ], {width: "550px", height: "175px", backgroundColor: "rgba(43, 10, 18, 1)", border: "3px solid #ff8989ff", borderRight: "3px solid #ff8989ff", borderRadius: "2px 2px 0 0"}],
                    ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Ships", {color: "#ff8989ff", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "541px", height: "40px", backgroundColor: "#1f0000ff", borderBottom: "3px solid #ff8989ff",  borderLeft: "3px solid #ff8989ff",  userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 1], ["levelable", 2],["levelable", 3],["levelable", 4],["levelable", 5],]],
                                ["row", [["levelable", 6],]],
                            ], {width: "531px", height: "250px", backgroundColor: "rgba(43, 10, 18, 1)", borderLeft: "3px solid #ff8989ff", padding: "5px"}],
                        ], {width: "556px", height: "220px"}],
                    ["blank", "25px"],
                        ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #ff8989ff", backgroundColor: "#290303ff", borderRadius: "15px 15px 15px 15px"}],
                ]]]
            ]
            },
            "Battle": {
                buttonStyle() { return { border: "2px solid #f57171ff", borderRadius: "10px" } },
                unlocked() { return false },
                content: [
                ["layer-proxy", ["ir", [

                                        ["raw-html", function () { return "Level: " + formatWhole(player.ir.battleLevel) }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Use W and S to more forwards or backwards, A to D to rotate, and Space or Mouse to shoot." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["bar", "healthBar"], ["bar", "xpBar"],]],
                    ["blank", "650px"],
                    ["row", [["layer-proxy", ["bl", [["clickable", 12]]]], ["clickable", 13], ["blank", "50px"],
                                                            ["style-column", [
                            ["clickable", 1001],
                            ["row", [["clickable", 1002], ["clickable", 1003], ["clickable", 1004]]],
                        ], {width: "150px", height: "100px"}],     
                ]],  
            ]]],
                ]
            },
            "Refresh Page :(": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You baboon. WHY DID YOU REFRESH THE PAGE???" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

                    ["blank", "25px"],
                    ["clickable", 12],
                ]
            },
            "Lose": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You lost." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

                    ["blank", "25px"],
                    ["clickable", 12],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return !player.ir.inBattle ? "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return !player.ir.inBattle ? "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." : "" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return !player.ir.inBattle ? "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return !player.ir.inBattle && player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return !player.ir.inBattle && player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return getLevelableBool("pu", 401) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})

// BloodArena: same as SpaceArena but with a dark red background
// and no enemies/asteroids (disabled for now). Use this when
// you want the same ship behavior but an empty, blood-themed arena.
class BloodArena extends SpaceArena {
    constructor(width, height) {
        super(width, height);

        // Ensure we have a writable enemyTypes object and add Blood-themed enemies
        this.enemyTypes = Object.assign({}, this.enemyTypes || {});

        // Ensure upgradeEffects exist so damage modifiers from `ir` apply correctly
        if (!this.upgradeEffects) this.upgradeEffects = {};
        this.upgradeEffects.attackDamage = this.upgradeEffects.attackDamage || 1;
        this.upgradeEffects.damageReduction = this.upgradeEffects.damageReduction || 1;
        this.upgradeEffects.xpGain = this.upgradeEffects.xpGain || 1;
        this.upgradeEffects.lootGain = this.upgradeEffects.lootGain || 1;

        // Leech: attaches to the ship and deals drain (visualized as segmented worm)
        this.enemyTypes.leech = {
            name: "Leech",
            radius: 14,
            color: "#7a0000",
            healthMin: 100,
            healthMax: 150,
            damage: 2,
            wanderSpeed: 1.6,
            wanderChange: 0.14,
            xpDrop: [12, 20],
            // Highly-detailed segmented slither sprite
            draw: (ctx, enemy) => {
                ctx.save();
                ctx.translate(enemy.x, enemy.y);
                let ang = enemy.angle || 0;
                ctx.rotate(ang);
                let r = enemy.radius || 14;
                let len = r * 3.6;
                if (typeof enemy.wrigglePhase !== 'number') enemy.wrigglePhase = Math.random() * Math.PI * 2;
                let amp = enemy.attached ? r * 0.5 : r * 1.1;
                let segs = 9;
                for (let i = 0; i <= segs; i++) {
                    let t = i / segs;
                    let x = -len / 2 + t * len;
                    let phase = enemy.wrigglePhase + t * Math.PI * 2.6;
                    let y = Math.sin(phase) * amp * (1 - Math.abs(2 * t - 1) * 0.95);
                    let segR = r * (0.55 + 0.75 * (1 - Math.abs(2 * t - 1)));
                    // subtle venation gradient
                    let grad = ctx.createLinearGradient(x - segR, y - segR, x + segR, y + segR);
                    grad.addColorStop(0, enemy.attached ? '#ff8b8b' : '#7a0000');
                    grad.addColorStop(1, '#330000');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.ellipse(x, y, segR, segR * 0.95, Math.sin(t * Math.PI) * 0.1, 0, Math.PI * 2);
                    ctx.fill();
                }
                // head with mouth detail
                ctx.beginPath();
                ctx.ellipse(len / 2, Math.sin(enemy.wrigglePhase + Math.PI * 1.1) * amp * 0.25, r * 0.95, r * 1.05, 0, 0, Math.PI * 2);
                ctx.fillStyle = enemy.attached ? '#ff8b8b' : '#8b0000';
                ctx.fill();
                // tiny teeth
                ctx.strokeStyle = '#ffdddd';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(len / 2 - r * 0.2, -r * 0.05);
                ctx.lineTo(len / 2 + r * 0.1, 0);
                ctx.lineTo(len / 2 - r * 0.2, r * 0.05);
                ctx.stroke();
                ctx.restore();
            }
        };

        // Eye: large floating eye that stares and fires bursts, dashes toward ship
        this.enemyTypes.eye = {
            name: "Eye",
            radius: 36,
            color: "#b30000",
            healthMin: 450,
            healthMax: 600,
            damage: 6,
            wanderSpeed: 0.6,
            wanderChange: 0.02,
            xpDrop: [80, 120],
            draw: (ctx, enemy) => {
                ctx.save();
                ctx.translate(enemy.x, enemy.y);
                // eye always looks at ship
                let ang = enemy.angle || 0;
                ctx.rotate(ang);
                let r = enemy.radius || 36;
                // sclera
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.fillStyle = '#ffdcdc';
                ctx.fill();
                // iris
                ctx.beginPath();
                ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
                ctx.fillStyle = '#6b0000';
                ctx.fill();
                // pupil
                ctx.beginPath();
                ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
                ctx.fillStyle = '#000';
                ctx.fill();
                // glossy highlight
                ctx.beginPath();
                ctx.arc(-r * 0.18, -r * 0.22, r * 0.08, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.fill();
                ctx.restore();
            }
        };

        // Large Leech: big leech that splits into smaller leeches on death
        this.enemyTypes.largeLeech = {
            name: "Large Leech",
            radius: 30,
            color: "#5a0000",
            healthMin: 500,
            healthMax: 800,
            damage: 4,
            wanderSpeed: 1.0,
            wanderChange: 0.08,
            xpDrop: [120, 180],
            draw: (ctx, enemy) => {
                // reuse leech drawing with scaled parameters
                ctx.save();
                ctx.translate(enemy.x, enemy.y);
                let ang = enemy.angle || 0;
                ctx.rotate(ang);
                let r = enemy.radius || 30;
                let len = r * 4.2;
                if (typeof enemy.wrigglePhase !== 'number') enemy.wrigglePhase = Math.random() * Math.PI * 2;
                let amp = enemy.attached ? r * 0.4 : r * 0.9;
                let segs = 10;
                for (let i = 0; i <= segs; i++) {
                    let t = i / segs;
                    let x = -len / 2 + t * len;
                    let phase = enemy.wrigglePhase + t * Math.PI * 2.4;
                    let y = Math.sin(phase) * amp * (1 - Math.abs(2 * t - 1) * 0.9);
                    let segR = r * (0.6 + 0.6 * (1 - Math.abs(2 * t - 1)));
                    let grad = ctx.createLinearGradient(x - segR, y - segR, x + segR, y + segR);
                    grad.addColorStop(0, enemy.attached ? '#ffb3b3' : '#6a0000');
                    grad.addColorStop(1, '#2b0000');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.ellipse(x, y, segR, segR * 0.95, Math.sin(t * Math.PI) * 0.08, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        };

        // Blood Machine removed: replaced by vampire spear mechanics (handled below)

        // BloodBat: fast flittering bat that dashes and deals contact damage
        this.enemyTypes.bloodBat = {
            name: "Blood Bat",
            radius: 18,
            color: "#6a0011",
            healthMin: 120,
            healthMax: 220,
            damage: 5,
            wanderSpeed: 2.6,
            wanderChange: 0.2,
            xpDrop: [17, 26],
            draw: (ctx, enemy) => {
                ctx.save();
                ctx.translate(enemy.x, enemy.y);
                let flap = (enemy.wrigglePhase || 0) * 6;
                // body
                ctx.beginPath();
                ctx.ellipse(0, 0, enemy.radius * 0.9, enemy.radius * 0.7, 0, 0, Math.PI * 2);
                let g = ctx.createLinearGradient(-enemy.radius, -enemy.radius, enemy.radius, enemy.radius);
                g.addColorStop(0, '#8b0019');
                g.addColorStop(1, '#330002');
                ctx.fillStyle = g;
                ctx.fill();
                // wings (left)
                ctx.save();
                ctx.rotate(-0.5 + Math.sin(flap) * 0.25);
                ctx.beginPath();
                ctx.moveTo(-6, 0);
                ctx.quadraticCurveTo(-enemy.radius * 2.2, -enemy.radius * 0.9, -enemy.radius * 1.1, -enemy.radius * 1.5);
                ctx.quadraticCurveTo(-enemy.radius * 0.4, -enemy.radius * 0.8, -6, 0);
                ctx.fillStyle = '#4d0006';
                ctx.fill();
                ctx.restore();
                // wings (right)
                ctx.save();
                ctx.rotate(0.5 - Math.sin(flap) * 0.25);
                ctx.beginPath();
                ctx.moveTo(6, 0);
                ctx.quadraticCurveTo(enemy.radius * 2.2, -enemy.radius * 0.9, enemy.radius * 1.1, -enemy.radius * 1.5);
                ctx.quadraticCurveTo(enemy.radius * 0.4, -enemy.radius * 0.8, 6, 0);
                ctx.fillStyle = '#4d0006';
                ctx.fill();
                ctx.restore();
                // face
                ctx.beginPath();
                ctx.fillStyle = '#220000';
                ctx.ellipse(0, -4, 4, 3, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        };

        // Sanguine Skiff: a small floating ship that fires homing droplets
        this.enemyTypes.sanguineSkiff = {
            name: "Sanguine Skiff",
            radius: 22,
            color: "#9a001d",
            healthMin: 260,
            healthMax: 420,
            damage: 9,
            wanderSpeed: 1.1,
            wanderChange: 0.08,
            xpDrop: [24, 30],
            draw: (ctx, enemy) => {
                ctx.save();
                ctx.translate(enemy.x, enemy.y);
                let ang = enemy.angle || 0;
                ctx.rotate(ang);
                let r = enemy.radius || 22;
                // hull
                ctx.beginPath();
                ctx.moveTo(-r * 0.9, -r * 0.25);
                ctx.quadraticCurveTo(0, -r * 1.1, r * 0.9, -r * 0.25);
                ctx.quadraticCurveTo(r * 0.6, r * 0.7, -r * 0.6, r * 0.7);
                ctx.closePath();
                let g2 = ctx.createLinearGradient(-r, -r, r, r);
                g2.addColorStop(0, '#c81b2b');
                g2.addColorStop(1, '#3a0000');
                ctx.fillStyle = g2;
                ctx.fill();
                // cockpit glass
                ctx.beginPath();
                ctx.ellipse(0, -r * 0.05, r * 0.35, r * 0.2, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(30,10,10,0.6)';
                ctx.fill();
                // engine glow
                ctx.beginPath();
                ctx.ellipse(-r * 0.5, r * 0.25, r * 0.25, r * 0.14, 0, 0, Math.PI * 2);
                ctx.fillStyle = '#ff6f6f';
                ctx.fill();
                ctx.restore();
            }
        };
        // Spawn timers / caps
        this._leechSpawnTimer = 0;
        // spawn much more infrequently by default (frames at ~60fps)
        this._leechSpawnInterval = 300; // ~5s
        this._batSpawnTimer = 0;
        this._batSpawnInterval = 600; // ~10s
        this._skiffSpawnTimer = 0;
        this._skiffSpawnInterval = 900; // ~15s
        this._maxLeeches = 4;
        this._maxBats = 5;
        this._maxSkiffs = 3;
        // custom loot ranges for BloodArena enemies (bloodStones)
        this._bloodLootRanges = {
            leech: [1, 1],
            bloodBat: [1, 1],
            sanguineSkiff: [1, 2]
        };
        // extend ranges for level-6 enemies
        this._bloodLootRanges.eye = [2, 4];
        this._bloodLootRanges.largeLeech = [3, 5];
        // bloodMachine loot removed (bloodMachine removed)

        // Level 6+ spawn timers and caps
        this._eyeSpawnTimer = 0;
        this._eyeSpawnInterval = 1200; // ~20s
        this._maxEyes = 2;

        this._largeLeechSpawnTimer = 0;
        this._largeLeechSpawnInterval = 1500; // ~25s
        this._maxLargeLeeches = 2;

        // machine spawn timers removed (bloodMachine removed)
        // Vampire knight support (invisible ally that throws spears)
        this._vampireTimer = 0;
        this._vampireInterval = 60; // frames (~1s)
        this._vampireWarns = []; // {x1,y1,x2,y2,timer}
        this._vampireBeams = []; // persistent beams created when a spear is fired {x1,y1,x2,y2,timer,maxTimer}
        this._vampirePrep = 48; // frames of warning before spear thrown
    }

    spawnArena() {
        // Create a similar arena div/canvas but with a blood-red background
        this.arenaDiv = document.createElement('div');
        this.arenaDiv.id = 'blood-arena';
        Object.assign(this.arenaDiv.style, {
            position: 'fixed',
            left: '50%',
            top: '50%',
            width: this.width + 'px',
            height: this.height + 'px',
            transform: `translate(-50%, -50%)`,
            background: '#2b0000', // dark red
            border: '3px solid #fff',
            zIndex: 9999,
            overflow: 'hidden',
        });
        document.body.appendChild(this.arenaDiv);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.arenaDiv.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        
        this.running = true;
        this.loop = setInterval(() => this.update(), 1000 / 60);

        if (player.ir.shipType == 3) {
            this.canvas.addEventListener('click', this.canvasClickListener);
        }
    }

    // Allow specific blood-themed enemy spawns (delegates to base SpaceArena spawn)
    spawnEnemy(typeName) {
        if (!typeName) return;
        const allowed = ['leech', 'bloodBat', 'sanguineSkiff', 'eye', 'largeLeech'];
        if (!allowed.includes(typeName)) return;
        if (typeof super.spawnEnemy === 'function') {
            const res = super.spawnEnemy(typeName);
            // Post-init shim: ensure enemies spawned have numeric health/maxHealth and some AI fields
            try {
                for (let i = this.enemies.length - 1; i >= 0; i--) {
                    let e = this.enemies[i];
                    if (!e || e._bloodInit) continue;
                    e._bloodInit = true;
                    e.type = e.type || typeName;
                    // Ensure numeric health fields
                    const t = this.enemyTypes[e.type] || {};
                    if (typeof e.maxHealth === 'undefined') {
                        if (t.healthMax != null && t.healthMin != null) {
                            e.maxHealth = Math.floor(t.healthMin + Math.random() * (t.healthMax - t.healthMin + 1));
                        } else {
                            e.maxHealth = (e.health && e.health > 0) ? e.health : 100;
                        }
                    }
                    if (typeof e.health === 'undefined') e.health = e.maxHealth;
                    // AI defaults
                    e.wanderAngle = e.wanderAngle || (Math.random() * Math.PI * 2);
                    e.wrigglePhase = e.wrigglePhase || Math.random() * Math.PI * 2;
                    e.burstTimer = e.burstTimer || 0;
                    e.shootCooldown = e.shootCooldown || 0;
                    e.attached = !!e.attached;
                    e.drainCooldown = (typeof e.drainCooldown === 'number') ? e.drainCooldown : 0; // ms until next discrete drain
                }
            } catch (err) { console.warn('post-init spawnEnemy blood arena', err); }
            return res;
        }
    }

    // Disable asteroid spawning in blood arena for now
    spawnAsteroid(big = false, x = null, y = null) {
        // intentionally left blank; asteroids disabled in BloodArena
    }

    // Per-frame update: run AI for blood enemies, auto-spawn, then call base update for physics/collisions
    update(delta) {
        // normalize delta to milliseconds (fallback to 60fps tick)
        const dtMs = (typeof delta === 'number') ? delta : (1000 / 60);

        // Pause all enemy AI and spawning while an upgrade choice is active
        if (this.upgradeChoiceActive) {
            if (typeof this.draw === 'function') this.draw();
            return;
        }

        try {
            // Pre-update AI: move enemies according to their type
                    if (this.enemies && this.enemies.length) {
                for (let enemy of this.enemies) {
                    if (!enemy.alive) continue;
                    // apply knockback velocity if present (smooth displacement)
                    try {
                        if (enemy._knockbackTimer && (enemy._knockbackVx || enemy._knockbackVy)) {
                            enemy.x += (enemy._knockbackVx || 0);
                            enemy.y += (enemy._knockbackVy || 0);
                            // decay knockback velocity each frame
                            enemy._knockbackVx = (enemy._knockbackVx || 0) * 0.84;
                            enemy._knockbackVy = (enemy._knockbackVy || 0) * 0.84;
                            enemy._knockbackTimer = Math.max(0, (enemy._knockbackTimer || 0) - 1);
                        }
                    } catch (err) { /* ignore */ }
                    const type = enemy.type;
                    // LEECH behavior
                    if (type === 'leech') {
                        // seeker toward ship until attached
                        if (!enemy.attached) {
                            if (this.ship) {
                                let dx = this.ship.x - enemy.x;
                                let dy = this.ship.y - enemy.y;
                                let dist = Math.hypot(dx, dy) || 1;
                                // point toward the player
                                enemy.angle = Math.atan2(dy, dx);
                                // slither lateral offset (small)
                                enemy.wrigglePhase = (enemy.wrigglePhase || 0) + 0.18;
                                let amp = (enemy.radius || 14) * 0.9;
                                let lateral = Math.sin(enemy.wrigglePhase) * amp;
                                let spd = (enemy.wanderSpeed || 1.6);
                                // move toward player with a small perpendicular slither
                                enemy.x += (dx / dist) * spd + (-dy / dist) * lateral * 0.06;
                                enemy.y += (dy / dist) * spd + (dx / dist) * lateral * 0.06;
                                if (dist < enemy.radius + (this.ship.radius || 12)) {
                                    enemy.attached = true;
                                    enemy.attachOffset = { x: enemy.x - this.ship.x, y: enemy.y - this.ship.y };
                                }
                            }
                        } else {
                            // follow ship position with offset and slither
                            if (this.ship) {
                                enemy.x = this.ship.x + (enemy.attachOffset ? enemy.attachOffset.x : 0);
                                enemy.y = this.ship.y + (enemy.attachOffset ? enemy.attachOffset.y : 0);
                                let dx = this.ship.x - enemy.x;
                                let dy = this.ship.y - enemy.y;
                                enemy.angle = Math.atan2(dy, dx);
                            }
                            enemy.wrigglePhase = (enemy.wrigglePhase || 0) + 0.26;
                            // Discrete drain: subtract 5 HP once per second using a cooldown (ms)
                            enemy.drainCooldown = (typeof enemy.drainCooldown === 'number') ? enemy.drainCooldown - dtMs : -dtMs;
                            while (typeof enemy.drainCooldown === 'number' && enemy.drainCooldown <= 0) {
                                enemy.drainCooldown += 1000; // schedule next drain in 1s
                                const drainAmount = (() => { try { return new Decimal(5); } catch (e) { return 5; } })();
                                try {
                                    if (player && player.ir && player.ir.shipHealth !== undefined && typeof player.ir.shipHealth.sub === 'function') {
                                        player.ir.shipHealth = player.ir.shipHealth.sub(drainAmount);
                                        if (player.ir.shipHealth.lte(0)) this.onShipDeath();
                                    } else if (player && player.shipHealth !== undefined && typeof player.shipHealth === 'number') {
                                        let num = (drainAmount.toNumber ? drainAmount.toNumber() : drainAmount);
                                        player.shipHealth = Math.max(0, player.shipHealth - num);
                                        if (player.shipHealth <= 0 && typeof this.onShipDeath === 'function') this.onShipDeath();
                                    }
                                } catch (e) {
                                    if (player && typeof player.hp === 'number') {
                                        let num = (drainAmount.toNumber ? drainAmount.toNumber() : drainAmount);
                                        player.hp = Math.max(0, player.hp - num);
                                    }
                                }
                            }
                        }
                    }

                    // BLOODBAT behavior: flit and dash
                    if (type === 'bloodBat') {
                        // flap progression
                        enemy.wrigglePhase = (enemy.wrigglePhase || 0) + 0.4;
                        if (!enemy._dashTimer || enemy._dashTimer <= 0) {
                            // wander normally
                            if (!enemy.wanderTimer || enemy.wanderTimer <= 0) {
                                enemy.wanderTimer = 30 + Math.floor(Math.random() * 60);
                                // bias occasionally toward player
                                if (this.ship && Math.random() < 0.6) {
                                    let dx = this.ship.x - enemy.x;
                                    let dy = this.ship.y - enemy.y;
                                    enemy.wanderAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
                                } else {
                                    enemy.wanderAngle += (Math.random() - 0.5) * 1.2;
                                }
                            }
                            enemy.wanderTimer--;
                            let sp = enemy.wanderSpeed || 2.6;
                            enemy.x += Math.cos(enemy.wanderAngle) * sp;
                            enemy.y += Math.sin(enemy.wanderAngle) * sp;

                            // small chance to start dash
                            if (Math.random() < 0.012 && this.ship) {
                                enemy._dashTimer = 18 + Math.floor(Math.random() * 12);
                                let dx = this.ship.x - enemy.x;
                                let dy = this.ship.y - enemy.y;
                                enemy._dashAngle = Math.atan2(dy, dx);  
                            }
                        } else {
                            // dashing
                            enemy._dashTimer--;
                            let dashSpeed = 5.2;
                            enemy.x += Math.cos(enemy._dashAngle) * dashSpeed;
                            enemy.y += Math.sin(enemy._dashAngle) * dashSpeed;
                        }
                        // keep inside arena by wrapping
                        if (enemy.x < 0) enemy.x = this.width;
                        if (enemy.x > this.width) enemy.x = 0;
                        if (enemy.y < 0) enemy.y = this.height;
                        if (enemy.y > this.height) enemy.y = 0;
                    }

                    // EYE behavior: fires bursts and occasionally dashes
                    if (type === 'eye') {
                        // face player
                        if (this.ship) {
                            let dx = this.ship.x - enemy.x;
                            let dy = this.ship.y - enemy.y;
                            enemy.angle = Math.atan2(dy, dx);
                        }
                        // slow float movement
                        enemy.wrigglePhase = (enemy.wrigglePhase || 0) + 0.02;
                        let spd = enemy.wanderSpeed || 0.6;
                        enemy.x += Math.cos((enemy.wanderAngle || 0)) * spd * 0.2;
                        enemy.y += Math.sin((enemy.wanderAngle || 0)) * spd * 0.2;

                        // burst firing
                        enemy.burstTimer = (typeof enemy.burstTimer === 'number') ? enemy.burstTimer - 1 : 0;
                        if (enemy.burstTimer <= 0) {
                            enemy.burstTimer = 80 + Math.floor(Math.random() * 60);
                            // fire a short radial burst towards player
                            if (this.ship) {
                                let base = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
                                let pieces = 8;
                                for (let i = 0; i < pieces; i++) {
                                    let ang = base + (i - (pieces-1)/2) * 0.18 + (Math.random()-0.5)*0.06;
                                    let sp = 6;
                                    this.bullets.push({
                                        x: enemy.x + Math.cos(ang) * (enemy.radius - 6),
                                        y: enemy.y + Math.sin(ang) * (enemy.radius - 6),
                                        vx: Math.cos(ang) * sp,
                                        vy: Math.sin(ang) * sp,
                                        life: 160,
                                        damage: 8 * (this.upgradeEffects.attackDamage || 1),
                                        pierce: 0,
                                        fromEnemy: true,
                                    });
                                }
                            }
                        }

                        // occasional dash
                        if (!enemy._dashTimer || enemy._dashTimer <= 0) {
                            if (Math.random() < 0.008 && this.ship) {
                                let dx = this.ship.x - enemy.x;
                                let dy = this.ship.y - enemy.y;
                                enemy._dashAngle = Math.atan2(dy, dx);
                                enemy._dashTimer = 22 + Math.floor(Math.random() * 18);
                            }
                        } else {
                            enemy._dashTimer--;
                            let dashSpeed = 8;
                            enemy.x += Math.cos(enemy._dashAngle) * dashSpeed;
                            enemy.y += Math.sin(enemy._dashAngle) * dashSpeed;
                        }
                        // clamp inside arena
                        if (enemy.x < enemy.radius) enemy.x = enemy.radius;
                        if (enemy.x > this.width - enemy.radius) enemy.x = this.width - enemy.radius;
                        if (enemy.y < enemy.radius) enemy.y = enemy.radius;
                        if (enemy.y > this.height - enemy.radius) enemy.y = this.height - enemy.radius;
                    }

                    // LARGE LEECH behavior: similar to leech but slower and tougher
                    if (type === 'largeLeech') {
                        if (!enemy.attached) {
                            if (this.ship) {
                                let dx = this.ship.x - enemy.x;
                                let dy = this.ship.y - enemy.y;
                                let dist = Math.hypot(dx, dy) || 1;
                                enemy.angle = Math.atan2(dy, dx);
                                enemy.wrigglePhase = (enemy.wrigglePhase || 0) + 0.12;
                                let amp = (enemy.radius || 30) * 0.7;
                                let lateral = Math.sin(enemy.wrigglePhase) * amp;
                                let spd2 = (enemy.wanderSpeed || 1.0);
                                enemy.x += (dx / dist) * spd2 + (-dy / dist) * lateral * 0.04;
                                enemy.y += (dy / dist) * spd2 + (dx / dist) * lateral * 0.04;
                                if (dist < enemy.radius + (this.ship.radius || 12)) {
                                    enemy.attached = true;
                                    enemy.attachOffset = { x: enemy.x - this.ship.x, y: enemy.y - this.ship.y };
                                }
                            }
                        } else {
                            if (this.ship) {
                                enemy.x = this.ship.x + (enemy.attachOffset ? enemy.attachOffset.x : 0);
                                enemy.y = this.ship.y + (enemy.attachOffset ? enemy.attachOffset.y : 0);
                                let dx = this.ship.x - enemy.x;
                                let dy = this.ship.y - enemy.y;
                                enemy.angle = Math.atan2(dy, dx);
                            }
                            enemy.wrigglePhase = (enemy.wrigglePhase || 0) + 0.14;
                            // slower drain: 8 HP per second
                            enemy.drainCooldown = (typeof enemy.drainCooldown === 'number') ? enemy.drainCooldown - dtMs : -dtMs;
                            while (typeof enemy.drainCooldown === 'number' && enemy.drainCooldown <= 0) {
                                enemy.drainCooldown += 1000;
                                try { this.applyShipDamage(new Decimal(8)); } catch (e) { this.applyShipDamage(8); }
                            }
                        }
                    }

                    // (Formerly Blood Machine behavior removed.)

                    // SANGUINE SKIFF: follow and shoot homing droplets
                    if (type === 'sanguineSkiff') {
                        if (this.ship) {
                            let dx = this.ship.x - enemy.x;
                            let dy = this.ship.y - enemy.y;
                            let dist = Math.hypot(dx, dy) || 1;
                            let ang = Math.atan2(dy, dx);
                            enemy.angle = ang;
                            // gentle follow
                            let sp = enemy.wanderSpeed || 1.1;
                            enemy.x += Math.cos(ang) * sp;
                            enemy.y += Math.sin(ang) * sp;
                        }
                        // shooting
                        enemy.shootCooldown = (typeof enemy.shootCooldown === 'number') ? enemy.shootCooldown - 1 : 0;
                        if (enemy.shootCooldown <= 0) {
                            enemy.shootCooldown = 90 + Math.floor(Math.random() * 60);
                            // fire a homing droplet (represented as an enemy bullet)
                            if (this.ship) {
                                let speed = 2.6;
                                let angle = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
                                this.bullets.push({
                                    x: enemy.x + Math.cos(angle) * enemy.radius,
                                    y: enemy.y + Math.sin(angle) * enemy.radius,
                                    vx: Math.cos(angle) * speed,
                                    vy: Math.sin(angle) * speed,
                                    life: 300,
                                    damage: (this.enemyTypes.sanguineSkiff.damage || 10) * (this.upgradeEffects.attackDamage || 1),
                                    pierce: 0,
                                    piercedAsteroids: [],
                                    fromEnemy: true,
                                });
                            }
                        }
                    }

                }
            }
        } catch (e) { console.warn('BloodArena AI error', e); }

        // Auto-spawn logic (simple): only when not a boss fight
        try {
            if (!this.bossActive) {
                let leeches = (this.enemies || []).filter(e => e && e.type === 'leech' && e.alive).length;
                let bats = (this.enemies || []).filter(e => e && e.type === 'bloodBat' && e.alive).length;
                let skiffs = (this.enemies || []).filter(e => e && e.type === 'sanguineSkiff' && e.alive).length;

                if (leeches < this._maxLeeches) {
                    this._leechSpawnTimer++;
                    if (this._leechSpawnTimer >= this._leechSpawnInterval) {
                        this._leechSpawnTimer = 0;
                        this.spawnEnemy('leech');
                    }
                } else this._leechSpawnTimer = Math.min(this._leechSpawnTimer, this._leechSpawnInterval - 1);

                if (bats < this._maxBats) {
                    this._batSpawnTimer++;
                    if (this._batSpawnTimer >= this._batSpawnInterval) {
                        this._batSpawnTimer = 0;
                        this.spawnEnemy('bloodBat');
                    }
                } else this._batSpawnTimer = Math.min(this._batSpawnTimer, this._batSpawnInterval - 1);

                if (skiffs < this._maxSkiffs) {
                    this._skiffSpawnTimer++;
                    if (this._skiffSpawnTimer >= this._skiffSpawnInterval) {
                        this._skiffSpawnTimer = 0;
                        this.spawnEnemy('sanguineSkiff');
                    }
                } else this._skiffSpawnTimer = Math.min(this._skiffSpawnTimer, this._skiffSpawnInterval - 1);
                // Level 6+ stronger enemies
                try {
                    const level6 = player && player.ir && typeof player.ir.battleLevel !== 'undefined' && player.ir.battleLevel.gte && player.ir.battleLevel.gte(6);
                    if (level6) {
                        let eyes = (this.enemies || []).filter(e => e && e.type === 'eye' && e.alive).length;
                        if (eyes < this._maxEyes) {
                            this._eyeSpawnTimer++;
                            if (this._eyeSpawnTimer >= this._eyeSpawnInterval) {
                                this._eyeSpawnTimer = 0;
                                this.spawnEnemy('eye');
                            }
                        } else this._eyeSpawnTimer = Math.min(this._eyeSpawnTimer, this._eyeSpawnInterval - 1);

                        let large = (this.enemies || []).filter(e => e && e.type === 'largeLeech' && e.alive).length;
                        if (large < this._maxLargeLeeches) {
                            this._largeLeechSpawnTimer++;
                            if (this._largeLeechSpawnTimer >= this._largeLeechSpawnInterval) {
                                this._largeLeechSpawnTimer = 0;
                                this.spawnEnemy('largeLeech');
                            }
                        } else this._largeLeechSpawnTimer = Math.min(this._largeLeechSpawnTimer, this._largeLeechSpawnInterval - 1);

                        // bloodMachine spawns removed
                        // Level 12: vampire knight throws spears (invisible ally)
                        try {
                            const level12 = player && player.ir && typeof player.ir.battleLevel !== 'undefined' && player.ir.battleLevel.gte && player.ir.battleLevel.gte(12);
                            if (level12) {
                                this._vampireTimer++;
                                if (this._vampireTimer >= this._vampireInterval) {
                                    this._vampireTimer = 0;
                                    // pick a random alive enemy to target
                                    let alive = (this.enemies || []).filter(e => e && e.alive);
                                    if (alive.length > 0) {
                                        let target = alive[Math.floor(Math.random() * alive.length)];
                                        // choose an origin offscreen from a random side
                                        let side = Math.floor(Math.random() * 4);
                                        let ox = 0, oy = 0;
                                        if (side === 0) { ox = Math.random() * this.width; oy = -48; }
                                        if (side === 1) { ox = this.width + 48; oy = Math.random() * this.height; }
                                        if (side === 2) { ox = Math.random() * this.width; oy = this.height + 48; }
                                        if (side === 3) { ox = -48; oy = Math.random() * this.height; }
                                        // schedule a warning line from origin to the target's current position
                                        this._vampireWarns.push({ x1: ox, y1: oy, x2: target.x, y2: target.y, timer: this._vampirePrep, dmg: 18, speed: 14 });
                                    }
                                }
                            }
                        } catch (e) {}
                    }
                } catch (e) {}
            }
        } catch (e) { console.warn('BloodArena spawn error', e); }

        // Call base update to handle bullets, collisions and draw
        if (typeof super.update === 'function') super.update();

        // After base update, convert any loot that would have been space rocks
        // into `player.bl.bloodStones`. We only award once per-dead-enemy.
        try {
            if (!player.bl) player.bl = player.bl || {};
            for (let enemy of (this.enemies || [])) {
                if (!enemy) continue;
                if (!enemy.alive && !enemy._bloodLootHandled) {
                    // If a Large Leech died, spawn several small leeches at its position
                    try {
                        if (enemy.type === 'largeLeech' && !enemy._bloodSplitDone) {
                            enemy._bloodSplitDone = true;
                            // spawn 3-4 smaller leeches clustered around the death point
                            let count = 3 + Math.floor(Math.random() * 2);
                            for (let i = 0; i < count; i++) {
                                // use spawnEnemy then place at enemy coords
                                this.spawnEnemy('leech');
                                try {
                                    let ne = this.enemies && this.enemies.length ? this.enemies[this.enemies.length - 1] : null;
                                    if (ne) {
                                        let ang = Math.random() * Math.PI * 2;
                                        let dist = (enemy.radius || 30) * (0.6 + Math.random() * 0.6);
                                        ne.x = (enemy.x || 0) + Math.cos(ang) * dist;
                                        ne.y = (enemy.y || 0) + Math.sin(ang) * dist;
                                    }
                                } catch (e) {}
                            }
                        }
                    } catch (e) {}
                    enemy._bloodLootHandled = true;
                    const rng = this._bloodLootRanges && this._bloodLootRanges[enemy.type];
                    if (!rng) continue;
                    let minR = rng[0], maxR = rng[1];
                    let amt = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
                    // apply loot multipliers similar to SpaceArena logic
                    try {
                        amt = Math.max(0, Math.floor(amt * (this.upgradeEffects.lootGain || 1)));
                    } catch (e) {}
                    //try { amt = Math.max(0, Math.floor(amt * levelableEffect("pet", 502)[1])); } catch (e) {}
                    //try { amt = Math.max(0, Math.floor(amt * levelableEffect("pu", 212)[1])); } catch (e) {}

                    // award as Decimal if available
                    try {
                        if (player.bl && player.bl.bloodStones !== undefined && typeof player.bl.bloodStones.add === 'function') {
                            player.bl.bloodStones = player.bl.bloodStones.add(amt);
                        } else if (player.bl) {
                            player.bl.bloodStones = (player.bl.bloodStones || 0) + amt;
                        }
                    } catch (e) {
                        // fallback numeric
                        try { player.bl.bloodStones = (player.bl.bloodStones || 0) + amt; } catch (e2) {}
                    }

                    // optional loot flash if arena supports it
                    try {
                        if (this.lootFlashes && Array.isArray(this.lootFlashes)) {
                            this.lootFlashes.push({ x: enemy.x, y: enemy.y, text: `+${amt} blood stones`, timer: 120, color: "#ff6b6b", style: "18px monospace" });
                        }
                    } catch (e) {}
                }
            }
        } catch (e) { console.warn('BloodArena loot conversion error', e); }

        // Draw health bars overlay (consistent with iridite.js style)
        try {
            if (!this.ctx) return;
            for (let enemy of this.enemies) {
                if (!enemy.alive) continue;
                let type = this.enemyTypes[enemy.type];
                // compute numeric health fractions safely
                let h = Number(enemy.health || 0);
                let mh = Number(enemy.maxHealth || enemy.health || 1);
                let pct = Math.max(0, Math.min(1, mh > 0 ? h / mh : 0));
                let barWidth = (enemy.radius || 12) * 2 * pct;
                this.ctx.save();
                this.ctx.fillStyle = '#ff4444';
                this.ctx.fillRect(enemy.x - (enemy.radius || 12), enemy.y - (enemy.radius || 12) - 18, barWidth, 6);
                this.ctx.font = '14px monospace';
                this.ctx.fillStyle = '#fff';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(Math.max(0, Math.floor(h)) + '/' + Math.floor(mh), enemy.x, enemy.y - (enemy.radius || 12) - 6);
                this.ctx.restore();
            }
            // draw vampire knight warnings (red aiming lines) and decrement timers
            try {
                if (this._vampireWarns && this._vampireWarns.length) {
                    for (let i = this._vampireWarns.length - 1; i >= 0; i--) {
                        let w = this._vampireWarns[i];
                        // draw an animated laser-style warning beam for the vampire spear
                        try {
                            this.ctx.save();
                            // direction and slight extension beyond target for visual punch
                            let angWarn = Math.atan2(w.y2 - w.y1, w.x2 - w.x1);
                            let ux = Math.cos(angWarn), uy = Math.sin(angWarn);
                            // ensure beam endpoints are well outside the arena for entire duration
                            const arenaW = this.width || (typeof window !== 'undefined' ? window.innerWidth : 800);
                            const arenaH = this.height || (typeof window !== 'undefined' ? window.innerHeight : 600);
                            const bw = Math.hypot(arenaW, arenaH) * 2 + 800;
                            let sx = w.x1 - ux * bw, sy = w.y1 - uy * bw;
                            let ex = w.x1 + ux * bw, ey = w.y1 + uy * bw;
                            // progress 0..1 (0=just started, 1=about to fire)
                            let prog = Math.max(0, Math.min(1, 1 - (w.timer / (this._vampirePrep || 1))));
                            // beam widths and alpha scale with progress (pulse toward fire)
                            let beamW = 3 + 6 * prog; // thinner beams

                            // outer glow (thinner)
                            this.ctx.strokeStyle = `rgba(255,90,90,${0.12 + 0.28 * prog})`;
                            this.ctx.lineWidth = Math.max(6, beamW + 8);
                            this.ctx.beginPath();
                            this.ctx.moveTo(sx, sy);
                            this.ctx.lineTo(ex, ey);
                            this.ctx.stroke();

                            // mid gradient streak
                            let g = this.ctx.createLinearGradient(sx, sy, ex, ey);
                            g.addColorStop(0, `rgba(255,120,120,${0.18 + 0.22 * prog})`);
                            g.addColorStop(0.6, `rgba(255,50,50,${0.5 * prog})`);
                            g.addColorStop(1, `rgba(255,10,10,0)`);
                            this.ctx.strokeStyle = g;
                            this.ctx.lineWidth = beamW;
                            this.ctx.beginPath();
                            this.ctx.moveTo(sx, sy);
                            this.ctx.lineTo(ex, ey);
                            this.ctx.stroke();

                            // bright core (thinner)
                            this.ctx.strokeStyle = `rgba(255,220,220,${0.65 * prog})`;
                            this.ctx.lineWidth = Math.max(1, beamW * 0.28);
                            this.ctx.beginPath();
                            this.ctx.moveTo(sx, sy);
                            this.ctx.lineTo(ex, ey);
                            this.ctx.stroke();

                            // origin charge pulse
                            this.ctx.fillStyle = `rgba(255,160,160,${0.5 * prog})`;
                            this.ctx.beginPath();
                            this.ctx.arc(w.x1, w.y1, 6 + 10 * prog, 0, Math.PI * 2);
                            this.ctx.fill();

                            // target flare
                            this.ctx.fillStyle = `rgba(255,80,80,${0.9 * prog})`;
                            this.ctx.beginPath();
                            this.ctx.arc(w.x2, w.y2, 3 + 8 * prog, 0, Math.PI * 2);
                            this.ctx.fill();

                            this.ctx.restore();
                        } catch (err) {
                            // fallback: simple line
                            this.ctx.save();
                            this.ctx.strokeStyle = 'rgba(255,60,60,0.65)';
                            this.ctx.lineWidth = 3;
                            this.ctx.beginPath();
                            this.ctx.moveTo(w.x1, w.y1);
                            this.ctx.lineTo(w.x2, w.y2);
                            this.ctx.stroke();
                            this.ctx.restore();
                        }
                        // decrement timer
                        w.timer--;
                        if (w.timer <= 0) {
                            // spawn spear projectile from x1,y1 toward x2,y2
                            try {
                                let dx = w.x2 - w.x1, dy = w.y2 - w.y1;
                                let dist = Math.hypot(dx, dy) || 1;
                                let ang = Math.atan2(dy, dx);
                                let spd = w.speed || 12;
                                // compute spear life (frames) and create a persistent beam that lasts slightly longer
                                let spearLife = Math.floor(dist / spd) + 60;
                                let beamExtra = 30; // beam persists this many frames after spear expires
                                try {
                                    // beam endpoints: extend far beyond the arena bounds in both directions
                                    let bw = Math.hypot(this.width || 800, this.height || 600) * 2 + 800;
                                    let nx = Math.cos(ang), ny = Math.sin(ang);
                                    let sx = w.x1 - nx * bw, sy = w.y1 - ny * bw;
                                    let ex = w.x1 + nx * bw, ey = w.y1 + ny * bw;
                                    this._vampireBeams.push({ x1: sx, y1: sy, x2: ex, y2: ey, timer: spearLife + beamExtra, maxTimer: spearLife + beamExtra });
                                } catch (err) { /* ignore beam creation errors */ }

                                this.bullets.push({
                                    x: w.x1,
                                    y: w.y1,
                                    vx: Math.cos(ang) * spd,
                                    vy: Math.sin(ang) * spd,
                                    life: spearLife,
                                    damage: w.dmg || 18,
                                    pierce: 3,
                                    radius: 10,
                                    fromEnemy: false,
                                    vampireSpear: true,
                                    spear: true,
                                    rot: ang,
                                    // visual tuning for a more realistic spear (no spin)
                                    shaftLen: 56,
                                    shaftW: 6,
                                    tipLen: 18,
                                    // knockback strength applied to enemies on hit
                                    knockback: 12,
                                });
                            } catch (e) {}
                            this._vampireWarns.splice(i, 1);
                        }
                    }
                }
            } catch (e) { console.warn('Vampire warns draw/spawn error', e); }
            // draw persistent vampire beams (created when spears fire) and decrement timers
            try {
                if (this._vampireBeams && this._vampireBeams.length) {
                    for (let bi = this._vampireBeams.length - 1; bi >= 0; bi--) {
                        let B = this._vampireBeams[bi];
                        try {
                            let prog = (B.timer / (B.maxTimer || 1));
                            let fade = Math.max(0, Math.min(1, prog));
                            this.ctx.save();
                            // draw a thinner outer glow
                            this.ctx.strokeStyle = `rgba(255,80,80,${0.12 * fade})`;
                            this.ctx.lineWidth = 10 * (0.5 + 0.5 * fade);
                            this.ctx.beginPath();
                            this.ctx.moveTo(B.x1, B.y1);
                            this.ctx.lineTo(B.x2, B.y2);
                            this.ctx.stroke();
                            // bright core (smaller)
                            this.ctx.strokeStyle = `rgba(255,180,180,${0.8 * fade})`;
                            this.ctx.lineWidth = 4 * (0.5 + 0.6 * fade);
                            this.ctx.beginPath();
                            this.ctx.moveTo(B.x1, B.y1);
                            this.ctx.lineTo(B.x2, B.y2);
                            this.ctx.stroke();
                            this.ctx.restore();
                        } catch (err) {}
                        B.timer -= 1;
                        if (B.timer <= 0) this._vampireBeams.splice(bi, 1);
                    }
                }
            } catch (e) { console.warn('Vampire beams draw error', e); }

            // draw vampire spears (special bullets)
            try {
                for (let b of (this.bullets || [])) {
                    if (!b || !b.vampireSpear) continue;
                    let x = b.x, y = b.y;
                    // compute angle; allow rot to be animated by spin
                    let ang = b.rot !== undefined ? b.rot : Math.atan2(b.vy || 0, b.vx || 1);
                    // keep the spear rotation fixed (no spin)
                    ang = b.rot !== undefined ? b.rot : Math.atan2(b.vy || 0, b.vx || 1);
                    this.ctx.save();
                    this.ctx.translate(x, y);
                    this.ctx.rotate(ang);

                    // spear geometry
                    let shaftLen = b.shaftLen || 56;
                    let shaftW = b.shaftW || 6;
                    let tipLen = b.tipLen || 18;

                    // shaft: subtle wood/blood gradient
                    try {
                        let g = this.ctx.createLinearGradient(-12, 0, shaftLen, 0);
                        g.addColorStop(0, '#3a1f1f');
                        g.addColorStop(0.5, '#8b3b3b');
                        g.addColorStop(1, '#2b0d0d');
                        this.ctx.fillStyle = g;
                        this.ctx.beginPath();
                        this.ctx.rect(-12, -shaftW / 2, shaftLen + 12, shaftW);
                        this.ctx.fill();

                        // light highlight along the shaft
                        this.ctx.strokeStyle = 'rgba(255,180,180,0.18)';
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(-8, -shaftW / 4);
                        this.ctx.lineTo(shaftLen, -shaftW / 4);
                        this.ctx.stroke();

                        // fletching / small vanes near the butt of the spear
                        for (let f = 0; f < 3; f++) {
                            let fx = -6 - f * 6;
                            this.ctx.beginPath();
                            this.ctx.fillStyle = f % 2 ? '#331515' : '#4a1a1a';
                            this.ctx.moveTo(fx, 0);
                            this.ctx.lineTo(fx - 8, -4 - f * 0.5);
                            this.ctx.lineTo(fx - 8, 4 + f * 0.5);
                            this.ctx.closePath();
                            this.ctx.fill();
                        }

                        // spear head: metallic gradient, polygon with a small tang
                        let gh = this.ctx.createLinearGradient(shaftLen - tipLen, 0, shaftLen + tipLen, 0);
                        gh.addColorStop(0, '#e8e8e8');
                        gh.addColorStop(0.5, '#cccccc');
                        gh.addColorStop(1, '#666666');
                        this.ctx.fillStyle = gh;
                        this.ctx.beginPath();
                        this.ctx.moveTo(shaftLen, 0);
                        this.ctx.lineTo(shaftLen - tipLen, -tipLen * 0.6);
                        this.ctx.lineTo(shaftLen - tipLen * 0.6, 0);
                        this.ctx.lineTo(shaftLen - tipLen, tipLen * 0.6);
                        this.ctx.closePath();
                        this.ctx.fill();

                        // subtle edge highlight on head
                        this.ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                        this.ctx.lineWidth = 0.8;
                        this.ctx.stroke();

                        // small blood smear near the tip for visual feedback
                        this.ctx.fillStyle = 'rgba(180,30,30,0.85)';
                        this.ctx.beginPath();
                        this.ctx.ellipse(shaftLen - tipLen * 0.15, 0, Math.max(2, shaftW / 2), Math.max(2, shaftW / 3), 0, 0, Math.PI * 2);
                        this.ctx.fill();
                    } catch (err) {
                        // fallback simple spear if gradient calls fail
                        this.ctx.strokeStyle = '#ff3b3b';
                        this.ctx.lineWidth = shaftW;
                        this.ctx.beginPath();
                        this.ctx.moveTo(-12, 0);
                        this.ctx.lineTo(shaftLen, 0);
                        this.ctx.stroke();
                        this.ctx.beginPath();
                        this.ctx.fillStyle = '#ff0000';
                        this.ctx.moveTo(shaftLen, 0);
                        this.ctx.lineTo(shaftLen - tipLen, -tipLen * 0.5);
                        this.ctx.lineTo(shaftLen - tipLen, tipLen * 0.5);
                        this.ctx.closePath();
                        this.ctx.fill();
                    }

                    this.ctx.restore();
                }
            } catch (e) { console.warn('Vampire spear draw error', e); }
        } catch (e) { console.warn('BloodArena draw overlay error', e); }
    }
}