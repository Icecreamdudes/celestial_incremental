addLayer("bl", {
    name: "Blood", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BL", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "D1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        blood: new Decimal(0),
        bloodEffect: new Decimal(1),
        bloodToGet: new Decimal(1),

        bloodStones: new Decimal(0),
        bloodStonesMult: new Decimal(1),
        bloodGems: new Decimal(0),
        bloodGemsMult: new Decimal(1),

        bloodDrain: false,
        bloodDrainPerSecond: new Decimal(0.1),

        xpGainPercentage: new Decimal(0),

        noxFightActive: false,
        noxDefeated: false,
        foughtNox: false,
    }},
    automate() {
        if (hasMilestone("bloodZone1", 14)) {
            buyBuyable("bl", 21)
            buyBuyable("bl", 22)
            buyBuyable("bl", 23)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #410f2aff 0%, #4f1818 50%, #290303ff 100%)",
            "background-origin": "border-box",
            "border-color": "#f57171",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Blood",
    branches: [["le", "#f57171"]],
    color: "#4f1818",
    update(delta) {
        let onepersec = new Decimal(1)

        if (arena == null && player.subtabs["bl"]['stuff'] == 'Battle') {
            player.subtabs["bl"]['stuff'] = "Refresh Page :(";
        }
        
        bloodGain = player.du.points.plus(1).log10().div(100)
        
        player.bl.bloodToGet = player.bl.blood.pow(2).add(bloodGain).root(2).sub(player.bl.blood)
        player.bl.bloodToGet = player.bl.bloodToGet.mul(buyableEffect("bl", 23))
        player.bl.bloodToGet = player.bl.bloodToGet.mul(buyableEffect("bl", 102))
        if (getLevelableTier("pu", 401, true)) player.bl.bloodToGet = player.bl.bloodToGet.mul(levelableEffect("pu", 401)[0])
        player.bl.bloodToGet = player.bl.bloodToGet.mul(levelableEffect("car", 412)[0])
        player.bl.bloodToGet = player.bl.bloodToGet.mul(levelableEffect("st", 303)[0])

        if (player.bl.bloodToGet.gte(10)) player.bl.bloodToGet = player.bl.bloodToGet.div(10).pow(0.2).mul(10)

        player.bl.bloodEffect = player.bl.blood.pow(0.15).div(15).add(1)
        if (player.bl.blood.gte(6713)) player.bl.bloodEffect = player.bl.blood.add(1).log(2).div(100).add(1.123)

        if (player.bl.bloodDrain && player.bl.blood.gte(0))
        {
            player.bl.bloodDrainPerSecond = Decimal.mul(0.1, player.bl.blood.pow(0.2))
            player.bl.bloodDrainPerSecond = player.bl.bloodDrainPerSecond.mul(buyableEffect("bl", 101)[1])
            player.bl.bloodDrainPerSecond = player.bl.bloodDrainPerSecond.div(buyableEffect("bl", 12))
        } else
        {
            player.bl.bloodDrain = false
            player.bl.bloodDrainPerSecond = new Decimal(0)
            if (hasMilestone("bloodZone1", 12) && player.bl.bloodToGet.gte(1)) player.bl.blood = player.bl.blood.add(player.bl.bloodToGet.mul(delta).mul(0.1).div(player.uni.D1.tickspeed));
        }
        if (player.bl.blood.lte(0))
        {
            player.bl.blood = new Decimal(0)
        }
        player.bl.blood = player.bl.blood.sub(player.bl.bloodDrainPerSecond.mul(delta).div(player.uni.D1.tickspeed))

        player.bl.xpGainPercentage = new Decimal(0.003)
        player.bl.xpGainPercentage = player.bl.xpGainPercentage.mul(buyableEffect("bl", 101)[0])
        player.bl.xpGainPercentage = player.bl.xpGainPercentage.mul(buyableEffect("bl", 11))

        if (!player.pet.legPetTimers[0].active)
        {
            for (let prop in player.pu.levelables) {
                if (getLevelableTier("pu", prop, true)) {
                    if (player.bl.bloodDrain) addLevelableXP("pu", prop, player.le.starmetalAlloyToGetTrue.mul(player.bl.xpGainPercentage.mul(delta).div(player.uni.D1.tickspeed)).floor())
                }
            }
        } else
        {
            for (let prop in player.pu.levelables) {
                if (getLevelableTier("pu", prop, true)) {
                    if (player.bl.bloodDrain) addLevelableXP("pu", prop, player.le.eclipseShardsToGetTrue.mul(player.le.eclipseShardsValue).mul(player.bl.xpGainPercentage.mul(delta).div(player.uni.D1.tickspeed)).floor())
                }
            }
        }

        // BLOOD STONES
        player.bl.bloodStones = player.bl.bloodStones.floor()

        player.bl.bloodStonesMult = new Decimal(1)
        player.bl.bloodStonesMult = player.bl.bloodStonesMult.mul(buyableEffect("sme", 155))
        player.bl.bloodStonesMult = player.bl.bloodStonesMult.mul(buyableEffect("bl", 15))
        if (player.bl.noxDefeated) player.bl.bloodStonesMult = player.bl.bloodStonesMult.mul(0.5)

        // BLOOD GEMS
        player.bl.bloodGems = player.bl.bloodGems.floor()

        player.bl.bloodGemsMult = new Decimal(1)
        player.bl.bloodGemsMult = player.bl.bloodGemsMult.mul(buyableEffect("sme", 155))
        player.bl.bloodGemsMult = player.bl.bloodGemsMult.mul(buyableEffect("bl", 15))

        // SPAWN NOX
        if (player.ir.battleLevel.gte(20) && !player.bl.foughtNox && player.tab == "bl")
        {
            spawnNox();
            player.bl.foughtNox = true
        }
    },
    bars: {},
    clickables: {
        11: {
            title() { return player.ir.timers[player.ir.shipType].current.lte(0) ? "<h2>Enter Blood Battle" : "<h2>Cooldown: " + formatTime(player.ir.timers[player.ir.shipType].current)},
            canClick() { return player.ir.timers[player.ir.shipType].current.lte(0) },
            unlocked() { return true },
            tooltip() { return "Blood... The elixir of humanity." },
            onClick() {
                player.ir.inBattle = true
                options.fullscreen = true
                player.subtabs["bl"]['stuff'] = 'Battle'

                arena = new BloodArena(1200, 600);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                player.ir.shipHealth = player.ir.shipHealthMax
                let regen = 0
                if (hasUpgrade("ir", 14)) regen += 0.5
                regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
                if (regen > 0) arena.upgradeEffects.healthRegen = regen / 60
                player.bl.noxFightActive = false

            },
            style: { width: '300px', "min-height": '100px', color: "white" },
        },
        12: {
            title() { return "Leave Battle" },
            canClick() { return true },
            unlocked() { return !player.bl.noxFightActive || player.subtabs["bl"]["stuff"] == "Refresh Page :("|| player.subtabs["bl"]["stuff"] == "Lose"},
            onClick() {
                player.ir.inBattle = false
                options.fullscreen = false
                player.subtabs["bl"]['stuff'] = 'stages'

                if (arena) {
                    arena.removeArena();
                    arena = null;
                }
                localStorage.setItem('arenaActive', 'false');

                player.ir.timers[player.ir.shipType].current = player.ir.timers[player.ir.shipType].max

                player.ir.battleXP = new Decimal(0)
                player.ir.battleLevel = new Decimal(1)

                player.bl.foughtNox = false
                player.bl.noxFightActive = false
            },
            style() {
                let look = {width: "258px", minHeight: "50px", color: "white", border: "3px solid " + "#bf0000", borderRadius: "10px"}
                if (this.canClick()) {
                    look.background = "#7f0000"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
        13: {
            title() { return player.ir.autoShoot ? "<h2>Auto-Shoot<br>[ENABLED]" : "<h2>Auto-Shoot<br>[DISABLED]" },
            canClick() { return true },
            unlocked() { return !player.ir.noxFightActive},
            onClick() {
                if (player.ir.autoShoot) {
                    player.ir.autoShoot = false
                } else {
                    player.ir.autoShoot = true
                }
            },
            style: {width: "200px", minHeight: '100px', color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },

        101: {
            title() { return "<h2>Perform a starmetal equivalent reset for blood. (Based on points, decreases with blood)" },
            canClick() { return player.bl.bloodToGet.gte(1) && !player.le.universeResetSafety },
            unlocked() { return true },
            onClick() {
                player.bl.blood = player.bl.blood.add(player.bl.bloodToGet)

                player.le.universeResetSafety = true

                layers.le.starmetalReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #f57171", margin: "1px"}
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
                let look = {width: "200px", minHeight: "100px", borderRadius: "15px 0px 0px 15px", color: "white", border: "2px solid #f57171", margin: "1px"}
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
                let look = {width: "200px", minHeight: "100px", borderRadius: "0px 15px 15px 0px", color: "white", border: "2px solid #f57171", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        1001: {
            title() {return "W"},
            canClick: true,
            unlocked() { return !player.ir.noxFightActive},
            onClick() {
                document.dispatchEvent(new KeyboardEvent('keydown', {key: 'w', code: 'KeyW', bubbles: true}))
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 'w', code: 'KeyW', bubbles: true}))
                }, 100)
            },
            style: {width: "50px", minHeight: "50px", fontSize: "12px", color: "white", backgroundColor: "#222", border: "2px solid white", margin: "-1px"}
        },
        1002: {
            title() {return "A"},
            canClick: true,
            unlocked() { return !player.ir.noxFightActive},
            onClick() {
                document.dispatchEvent(new KeyboardEvent('keydown', {key: 'a', code: 'KeyA', bubbles: true}))
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 'a', code: 'KeyA', bubbles: true}))
                }, 100)
            },
            style: {width: "50px", minHeight: "50px", fontSize: "12px", color: "white", backgroundColor: "#222", border: "2px solid white", margin: "-1px"}
        },
        1003: {
            title() {return "S"},
            canClick: true,
            unlocked() { return !player.ir.noxFightActive},
            onClick() {
                document.dispatchEvent(new KeyboardEvent('keydown', {key: 's', code: 'KeyS', bubbles: true}))
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 's', code: 'KeyS', bubbles: true}))
                }, 100)
            },
            style: {width: "50px", minHeight: "50px", fontSize: "12px", color: "white", backgroundColor: "#222", border: "2px solid white", margin: "-1px"}
        },
        1004: {
            title() {return "D"},
            canClick: true,
            unlocked() { return !player.ir.noxFightActive},
            onClick() {
                document.dispatchEvent(new KeyboardEvent('keydown', {key: 'd', code: 'KeyD', bubbles: true}))
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 'd', code: 'KeyD', bubbles: true}))
                }, 100)
            },
            style: {width: "50px", minHeight: "50px", fontSize: "12px", color: "white", backgroundColor: "#222", border: "2px solid white", margin: "-1px"}
        },
    },
    bloodReset() {
    },
    upgrades: {
        11: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ff0000;text-shadow:0 0 8px #ff0000'>" + "Level B1-20 Cleared" + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "The Vampire Knight",
            unlocked() { return true },
            description() { return "Unlocks Nox Zone."},
            canAfford() {return player.bloodZone1.highestLevel.gte(20)},
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f5b8b8", outline: "3px solid #ff0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.bl.bloodStones},
            pay(amt) { player.bl.bloodStones = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            description() {
                return "Boosts punchcard XP gained by draining blood by +x0.1.<br>(x" + formatSimple(this.effect()) + ")"
            },
            currencyDisplayName: "Blood Stones",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Pure Drainage" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#bf0000;text-shadow:0 0 8px #bf0000'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f57171", outline: "3px solid #bf0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#000000"
                return look
            },
        },
        12: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.bl.bloodStones},
            pay(amt) { player.bl.bloodStones = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            description() {
                return "Reduces blood draining speed by +/0.1.<br>(/" + formatSimple(this.effect()) + ")"
            },
            currencyDisplayName: "Blood Stones",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Efficient Drainage" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#bf0000;text-shadow:0 0 8px #bf0000'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f57171", outline: "3px solid #bf0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#000000"
                return look
            },
        },
        13: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.bl.bloodStones},
            pay(amt) { player.bl.bloodStones = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            description() {
                return "Boosts ship regen by +x0.05.<br>(x" + formatSimple(this.effect(), 2) + ")"
            },
            currencyDisplayName: "Blood Stones",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Rejuvenating Blood" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#bf0000;text-shadow:0 0 8px #bf0000'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f57171", outline: "3px solid #bf0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#000000"
                return look
            },
        },
        14: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.bl.bloodStones},
            pay(amt) { player.bl.bloodStones = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            description() {
                return "Reduces the ship battle XP requirement by +/0.02.<br>(/" + formatSimple(this.effect(), 2) + ")"
            },
            currencyDisplayName: "Blood Stones",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Allieviating Blood" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#bf0000;text-shadow:0 0 8px #bf0000'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f57171", outline: "3px solid #bf0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#000000"
                return look
            },
        },
        15: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.bl.bloodStones},
            pay(amt) { player.bl.bloodStones = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            description() {
                return "Boosts ship battle loot gain by +x0.01.<br>(x" + formatSimple(this.effect(), 2) + ")"
            },
            currencyDisplayName: "Blood Stones",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Blood Drill-Tip" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#bf0000;text-shadow:0 0 8px #bf0000'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f57171", outline: "3px solid #bf0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#000000"
                return look
            },
        },
        16: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.bl.bloodStones},
            pay(amt) { player.bl.bloodStones = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.001) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            description() {
                return "Reduces blood battle level softcap scaling by -0.1%.<br>(-" + formatSimple(this.effect().mul(100), 2) + "%)"
            },
            currencyDisplayName: "Blood Stones",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Blood Decay" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#bf0000;text-shadow:0 0 8px #bf0000'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f57171", outline: "3px solid #bf0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#000000"
                return look
            },
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
                return "which are reducing starmetal requirement by ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + "\n\Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Blood."
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    if (!hasMilestone("bloodZone1", 14)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#420303ff", borderColor: "#f57171" }
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
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    if (!hasMilestone("bloodZone1", 14)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#420303ff", borderColor: "#f57171" }
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
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    if (!hasMilestone("bloodZone1", 14)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#420303ff", borderColor: "#f57171" }
        },

        // Blood Gems
        101: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.075) },
            purchaseLimit() { return new Decimal(30) },
            currency() { return player.bl.bloodGems},
            pay(amt) { player.bl.bloodGems = this.currency().sub(amt) },
            effect(x) { return [getBuyableAmount(this.layer, this.id).mul(0.1).add(1), getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(0.5)] },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            description() {
                return "Boosts punchcard XP gained by draining blood by +x0.1. Affects blood draining speed at a square-rooted rate.<br>(x" + formatSimple(this.effect()[0], 2) + ", x" + formatSimple(this.effect()[1], 2) + ")"
            },
            currencyDisplayName: "Blood Gems",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Enhanced Drainage" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#f5b8d7;text-shadow:0 0 8px #f5b8d7'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f57171", outline: "3px solid #f5b8d7", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#000000"
                return look
            },
        },
        102: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(30) },
            currency() { return player.bl.bloodGems},
            pay(amt) { player.bl.bloodGems = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            description() {
                return "Boosts blood gain by +x0.05.<br>(x" + formatSimple(this.effect(), 2) + ")"
            },
            currencyDisplayName: "Blood Gems",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Glistening Blood" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#f5b8d7;text-shadow:0 0 8px #f5b8d7'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f57171", outline: "3px solid #f5b8d7", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#000000"
                return look
            },
        },
        103: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.125) },
            purchaseLimit() { return new Decimal(30) },
            currency() { return player.bl.bloodGems},
            pay(amt) { player.bl.bloodGems = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            description() {
                return "Boosts ship health by +x0.01.<br>(x" + formatSimple(this.effect(), 2) + ")"
            },
            currencyDisplayName: "Blood Gems",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Blood Fuel" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#f5b8d7;text-shadow:0 0 8px #f5b8d7'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#f57171", outline: "3px solid #f5b8d7", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#000000"
                return look
            },
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stages: {
            "bloodZone1": {
                unlocked: true,
                embedLayer: 'bloodZone1',
            },
            "noxZone": {
                unlocked: true,
                embedLayer: 'noxZone',
            },
        },
        stuff2: {
            "Blood": {
                buttonStyle() { return { border: "2px solid #f57171", borderRadius: "10px" } },
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
                    ["row", [
                        ["raw-html", () => {return "Boosts punchcard efficiency by ^" + formatSimple(player.bl.bloodEffect, 3) + ". (Only active effects)"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.bl.blood.gte(6713) ? "<small style='margin-left: 10px'>[SOFTCAPPED]</small>" : ""}, {color: "red", fontSize: "20px", fontFamily: "monospace"}],
                    ]],
                    ["blank", "25px"],
                    ["row", [["clickable", 101]]],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 21], ["dark-buyable", 22], ["dark-buyable", 23],]], 
                    ["blank", "25px"],
                    ["raw-html", () => {return "You are draining " + format(player.bl.bloodDrainPerSecond) + " blood per second."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.pet.legPetTimers[0].current.lte(0) ? "You will gain " + format(player.bl.xpGainPercentage.mul(100)) + "% of punchcard XP per second. (+"+ format(player.le.starmetalAlloyToGetTrue.mul(player.bl.xpGainPercentage)) +"/s) <br>(Only the currently active ones)" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.pet.legPetTimers[0].current.gt(0) ? "You will gain " + format(player.bl.xpGainPercentage.mul(100)) + "% of punchcard XP per second. (+"+ format(player.le.eclipseShardsToGetTrue.mul(player.bl.xpGainPercentage)) +"/s) <br>(Only the currently active ones)" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 102], ["clickable", 103]]],
                    ["blank", "25px"],
                ]
            },
            "Blood Battle": {
                buttonStyle() { return { border: "2px solid #f57171", borderRadius: "10px" } },
                unlocked() { return !player.ir.inBattle },
                content: [
                    ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
                ]
            },
        },
        stuff: {
            "ships": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#4f1818"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["category-button", ["Ships", "stuff", "ships"], {width: "265px", height: "40px", background: "#4f1818", borderRadius: "13px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],
                        ["category-button", ["Stages", "stuff", "stages"], {width: "264px", height: "40px", background: "#4f1818", borderRadius: "0 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],
                        ["category-button", ["Upgrades", "stuff", "upgrades"], {width: "265px", height: "40px", background: "#4f1818", borderRadius: "0 13px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid #f57171", borderRadius: "16px 16px 0 0", marginBottom: "-3px"}],
                    ["layer-proxy", ["ir", [
                        ["style-column", [
                            ["style-row", [
                                ["style-column", [

                                ], {background: "#0000007f", width: "247px", height: "300px"}],
                                ["style-column", [
                                    ["clickable", 17],
                                    ["raw-html", "notice for testers: only one mobile control scheme is implemented, and not all ships are 100% done. unarmed is not set up, sniper does not auto-turn.", {color: "yellow", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "radial-gradient(circle, white -100%, #00000000 50%)", borderLeft: "3px solid #f57171", borderRight: "3px solid #f57171", width: "300px", height: "300px"}],
                                ["style-column", [

                                ], {background: "#0000007f", width: "247px", height: "300px"}],
                            ], {borderBottom: "3px solid #f57171", width: "800px", height: "300px"}],
                            ["style-row", [
                                ["style-column", [
                                    ["levelable-display", [
                                        ["style-row", [["clickable", 2],], {width: '100px', height: '40px' }],
                                    ]],
                                ], {width: "550px", height: "175px", backgroundColor: "#1a0808", borderBottom: "3px solid #f57171", borderRadius: "2px 2px 0 0"}],
                                ["always-scroll-column", [
                                    ["style-column", [
                                        ["raw-html", "Ships", {color: "#f57171", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "541px", height: "40px", backgroundColor: "#401313", borderBottom: "3px solid #f57171",  borderLeft: "3px solid #f57171",  userSelect: "none"}],
                                    ["style-column", [
                                        ["row", [["levelable", 1], ["levelable", 2],["levelable", 3],["levelable", 4],["levelable", 5],]],
                                        ["row", [["levelable", 6],["levelable", 7],["levelable", 8],["levelable", 9],["levelable", 10],]],
                                    ], {width: "531px", height: "260px", backgroundColor: "#290c0c", borderLeft: "3px solid #f57171", padding: "5px"}],
                                ], {width: "556px", height: "240px"}],
                            ], {width: "800px", height: "417px"}],
                        ], {width: "800px", height: "720px", background: "radial-gradient(circle, #290c0c 0%, #4f1818 200%)", border: "3px solid #f57171", borderRadius: "0"}]
                    ]]],
                    ["blank", "25px"],
                ],
            },
            "stages": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#4f1818"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["category-button", ["Ships", "stuff", "ships"], {width: "265px", height: "40px", background: "#4f1818", borderRadius: "13px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],
                        ["category-button", ["Stages", "stuff", "stages"], {width: "264px", height: "40px", background: "#4f1818", borderRadius: "0 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],
                        ["category-button", ["Upgrades", "stuff", "upgrades"], {width: "265px", height: "40px", background: "#4f1818", borderRadius: "0 13px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid #f57171", borderRadius: "16px 16px 0 0", marginBottom: "-3px"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["buttonless-microtabs", "stages", {borderWidth: "0"}],
                            ], {width: "800px", height: "720px", borderRadius: "0"}],
                        ], {width: "397px", height: "720px", borderRadius: "0"}],
                        ["style-column", [
                            ["centered-draggable-scroll-row", [
                                ["style-row", [

                                    // Connections
                                    
                                    ["style-column", [
                                        createConnectionComponent(0, 0, 100, 0, "#f57171"),
                                    ], () => {
                                        return {display: hasUpgrade("bl", 11) ? "" : "none !important", width: "0", height: "0"}
                                    }],

                                    // Blood Zone I
                                    ["tooltip-row", [
                                        ["category-button", ["I", "stages", "bloodZone1"], () => {
                                            let str = {
                                                width: "75px",
                                                height: "75px",
                                                background: "radial-gradient(#4f1818, black)",
                                                border: "4px solid #f57171",
                                                borderRadius: "50%",
                                                color: "white",
                                                fontSize: "32px",
                                                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                                            }
                                            if (player.subtabs["bl"]["stages"] == "bloodZone1") str.outline = "3px solid #fff"
                                            return str
                                        }],
                                        ["raw-html", () => {return "<div class='bottomTooltip'>Blood Zone I</div>"}],
                                    ], {width: "0", height: "0", position: "relative", left: "0", top: "0"}],

                                    // Nox Zone
                                    ["tooltip-row", [
                                        ["category-button", ["🌢", "stages", "noxZone"], () => {
                                            let str = {
                                                width: "75px",
                                                height: "75px",
                                                background: "radial-gradient(#5e1818, black)",
                                                border: "4px solid #f5b8b8",
                                                borderRadius: "50%",
                                                color: "white",
                                                fontSize: "32px",
                                                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                                                display: hasUpgrade("bl", 11) ? "" : "none !important",
                                            }
                                            if (player.subtabs["bl"]["stages"] == "noxZone") str.outline = "3px solid #fff"
                                            return str
                                        }],
                                        ["raw-html", () => {return "<div class='bottomTooltip'>Nox Zone</div>"}],
                                    ], {width: "0", height: "0", position: "relative", left: "100px", top: "0"}],

                                ], {width: "1044px", height: "1044px", backgroundImage: "url(resources/ui/spaceBattle/bloodMap.png)"}],
                            ], {width: "400px", height: "360px", borderLeft: "3px solid #f57171", borderBottom: "3px solid #f57171", flexFlow: "column"}],
                            ["blank", "357px"],
                        ], {width: "403px", height: "720px"}],
                    ], {width: "800px", height: "720px", background: "radial-gradient(circle, #290c0c 0%, #4f1818 200%)", border: "3px solid #f57171", borderRadius: "0"}],
                    ["blank", "25px"],
                ],
            },
            "upgrades": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#4f1818"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["category-button", ["Ships", "stuff", "ships"], {width: "265px", height: "40px", background: "#4f1818", borderRadius: "13px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],
                        ["category-button", ["Stages", "stuff", "stages"], {width: "264px", height: "40px", background: "#4f1818", borderRadius: "0 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],
                        ["category-button", ["Upgrades", "stuff", "upgrades"], {width: "265px", height: "40px", background: "#4f1818", borderRadius: "0 13px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid #f57171", borderRadius: "16px 16px 0 0", marginBottom: "-3px"}],
                    ["top-column", [
                        ["style-row", [
                            ["raw-html", function () { return "You have <span style='color:#bf0000;text-shadow:0 0 8px #bf0000'>" + formatWhole(player.bl.bloodStones) + " blood stones</span> and <span style='color:#f5b8d7;text-shadow:0 0 8px #f5b8d7'>" + formatWhole(player.bl.bloodGems) + " blood gems</span>."  }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                            
                        ], {background: "#4f1818", borderBottom: "3px solid #f57171", width: "800px", height: "40px"}],
                        ["style-row", [
                            ["centered-draggable-scroll-row", [
                                
                                ["style-row", [

                                    // Zone I Upgrades
                                    ["style-column", [
                                        ["style-column", [
                                            ["style-row", [
                                                ["buyable", 11],
                                                ["buyable", 13],
                                                ["buyable", 15],
                                            ]],
                                            ["style-row", [
                                                ["buyable", 12],
                                                ["buyable", 14],
                                                ["buyable", 16],
                                            ]],
                                            ["style-row", [
                                                ["buyable", 101],
                                                ["buyable", 102],
                                                ["buyable", 103],
                                            ]],
                                        ], {width: "636px", background: "#f571713f", border: "3px solid #f57171", borderRadius: "19px"}],
                                    ], {width: "0", height: "0", position: "relative", left: "-318px", top: "0"}],
                                    
                                    // Zone I -> Nox Zone Connection

                                    ["style-column", [
                                                ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(90deg, #f57171, #f5b8b8) border-box", border: "3px solid #0000", borderRadius: "0", width: "212px", height: "162px"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "327px", top: "0"}
                                        look.display = hasMilestone("bloodZone1", 11) ? "" : "none !important"
                                        return look
                                    }],
                                    ["style-column", [
                                        ["style-row", [
                                            ["style-row", [
                                                ["upgrade", 11],
                                            ]],
                                        ], {width: "218px", background: "linear-gradient(90deg, #f571713f, #f5b8b83f)", borderRadius: "0"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "327px", top: "0"}
                                        look.display = hasMilestone("bloodZone1", 11) ? "" : "none !important"
                                        return look
                                    }],

                                ], {width: "4000px", height: "4000px", backgroundImage: "url(resources/ui/spaceBattle/bloodZone1.png)"}],
                            ], {width: "800px", height: "677px", flexFlow: "column"}]
                        ]],
                        /*["style-row", [
                            ["raw-html", function () { return "You have <span style='color:#bfbfbf;text-shadow:0 0 8px #bfbfbf'>" + formatWhole(player.cb.evolutionShards) + " ES</span> and <span style='color:#796d85;text-shadow:0 0 8px #796d85'>" + formatWhole(player.cb.paragonShards) + " PS</span>."  }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                            
                        ], {background: "#4f1818", borderTop: "3px solid #f57171", width: "800px", height: "40px"}],*/
                    ], {width: "800px", height: "720px", background: "linear-gradient(120deg, #0F0D25 0%, #0E0921 100%)", border: "3px solid #f57171", borderRadius: "0"}],
                    ["blank", "25px"],
                ],
            },
            "Battle": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#4f1818"}},
                unlocked() { return false },
                content() { return [
                    ["layer-proxy", ["ir", [
                        ["style-column", [], {height: (arena && arena._fullscreen) ? "10px" : "0"}],
                        ["style-column", [
                            ["raw-html", "Level: " + formatWhole(player.ir.battleLevel) + "<span style='font-size:16px'> / " + formatWhole(SB_zones[player.ir.battleStage].levelLimit) + "</span>", { "color": "white", textShadow: "0 0 10px white", "font-size": "24px", "font-family": "monospace", lineHeight: "1" }],
                            ["style-row", [
                                ["raw-html", "<small>[SOFTCAP: x" + format(player.ir.levelScalingMult) + " Asteroid and Celestialite Stats]</small>", { "color": "red", textShadow: "0 0 10px red", "font-size": "16px", "font-family": "monospace", marginLeft: "6px", marginRight: "6px" }],
                            ], {lineHeight: "1", marginLeft: "6px", marginRight: "6px", display: player.ir.battleLevel.gte(player[player.ir.battleStage].levelScalingStart) ? "" : "none !important"}]
                        ], {width: "800px", height: "50px", background: player.ir.secondaryColor, borderRadius: "13px 13px 0 0", border: "3px solid " + player.ir.primaryColor, borderBottom: "0", display: (arena && arena._fullscreen) ? "none !important" : ""}],
                        ["row", [["ex-bar", "healthBar"], ["ex-bar", "xpBar"],]],
                        ["style-column", [], {height: (arena && arena._fullscreen) ? "calc(100vh - 279px)" : "800px"}],
                        ["row", [["ex-bar", "bossHealthBar"],]],
                        ["style-column", [
                            ["blank", "9px", {width: "6px"}],
                            ["raw-html", "Use W and S to more forwards or backwards, A to D to rotate, and Space or Mouse to shoot.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "9px", {width: "6px"}],
                            ["row", [
                                ["clickable", 12], ["blank", "6px", {width: "6px"}], ["clickable", 15], ["blank", "6px", {width: "6px"}], ["clickable", 16],
                            ]],
                        ], {width: (arena && arena._fullscreen) ? "calc(100vw - 6px)" : "800px", height: "100px", background: player.ir.secondaryColor, borderRadius: (arena && arena._fullscreen) ? "0px" : "0 0 13px 13px", border: "3px solid " + player.ir.primaryColor, borderTop: "0px"}]
                    ]],
                ]]}
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
        ["style-column", [
            ["raw-html", () => { return !player.ir.inBattle ? "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => { return !player.ir.inBattle ? "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." : "" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ["raw-html", () => { return !player.ir.inBattle ? "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
            ["raw-html", () => { return !player.ir.inBattle && player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
            ["raw-html", () => { return !player.ir.inBattle && player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ], () => {
            return {display: arena ? "none !important" : ""}
        }],
        ["microtabs", "stuff2", { 'border-width': '0px' }],
    ],
    layerShown() { return getLevelableTier("pu", 401, true) },
    deactivated() { return !player.sma.inStarmetalChallenge},
    hotkeys: [
        {
            key: "l", 
            description: "Reset for Blood",
            onPress() {
                clickClickable(this.layer, 101)
            },
        }
	]
})