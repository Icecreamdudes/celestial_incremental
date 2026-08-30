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
                return "Boosts all forms of ship regen by +x0.05.<br>(x" + formatSimple(this.effect(), 2) + ")"
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
            unlocked() { return !player.pet.legPetTimers[0].current.gt(0) },
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
            unlocked() { return !player.pet.legPetTimers[0].current.gt(0) },
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
        shipSelection: {
            "shipSelectionProgression": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#4f1818"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    return [
                        ["style-row", [
                            ["category-button", ["Space", "shipSelectionProgression", "space"], {width: player.ir.inBattle ? "398.5px" : "264px", height: "50px", background: "#37078f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#f571717f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#f57171"}],
                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "265px", height: "50px", background: "#00003f", borderRadius: "0"}],
                            ], {display: hasUpgrade("le", 201) ? "none !important" : ""}],
                            ["style-row", [
                                ["category-button", ["Blood", "shipSelectionProgression", "blood"], {width: player.ir.inBattle ? "398.5px" : "265px", height: "50px", background: "#4f1818", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#f571717f"), borderRadius: "0"}],
                            ], {display: hasUpgrade("le", 201) ? "" : "none !important"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                        ["style-row", [], {background: player.ir.inBattle ? player.ir.primaryColor : "#f57171", width: player.ir.inBattle ? "800px" : "532px", height: "3px"}],
                        ["buttonless-microtabs", "shipSelectionProgression", {borderWidth: "0"}],
                    ]
                },
            },
            "shipSelectionStats": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#4f1818"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    return [
                        ["style-row", [], {width: "0", height: "0"}],
                        ["style-row", [
                            ["category-button", ["Final Stats", "shipSelectionStats", "finalStats"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#f571717f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#f57171"}],
                            ["category-button", ["Base Stats", "shipSelectionStats", "baseStats"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#f571717f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#f57171"}],
                            ["category-button", ["Upgrade Effects", "shipSelectionStats", "upgradeEffects"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#f571717f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#f57171"}],
                            ["category-button", ["Upgrade Counts", "shipSelectionStats", "upgradeCounts"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#f571717f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#f57171"}],
                            
                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.secondaryColor + "7f", borderRadius: "0"}],
                            ], {display: player.ev.evolutionsUnlocked[13] ? "none !important" : ""}],
                            ["style-row", [
                                ["category-button", ["Salvaged Upgrades", "shipSelectionStats", "salvagedUpgrades"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#f571717f"), borderRadius: "0"}],
                            ], {display: player.ev.evolutionsUnlocked[13] ? "" : "none !important"}],

                        ], {width: player.ir.inBattle ? "800px" : "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                        ["style-row", [], {background: player.ir.inBattle ? player.ir.primaryColor : "#f57171", width: player.ir.inBattle ? "800px" : "532px", height: "3px"}],
                        ["buttonless-microtabs", "shipSelectionStats", {borderWidth: "0"}],
                    ]
                },
            },
        },
        shipSelectionProgression: {
            "space": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let maxListWidth = player.ir.inBattle ? 376 : 245
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                                let container = [["style-row", [], {width: player.ir.inBattle ? "782px" : "514px", marginRight: "24px"}]]
                                if (player.ir.shipBattleSaveCurrent == null || player.ir.shipType == 0) return container;
                                for (let [i, v] of Object.entries(SB_zones)) {
                                    if (!v.location || !v.unlocked() || (v.location && v.location != "space")) continue;
                                    let element = ["style-column", [
                                        ["style-column", [
                                            ["style-row", [
                                                ["raw-html", v.nameCap, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {background: v.secondaryColor, borderBottom: "3px solid" + v.primaryColor, borderRadius: "12px 12px 0 0", width: maxListWidth + "px", height: "25px"}],
                                            ["style-row", [
                                            ], {background: "black", borderRadius: "0 0 12px 12px", width: maxListWidth + "px", height: "27.5px"}],
                                        ], {background: "#37078f", borderRadius: "12px", width: maxListWidth + "px", height: "55.5px"}],
                                    ], {background: "#151230", border: "3px solid" + v.primaryColor, borderRadius: "15px", width: maxListWidth + "px", height: "55.5px", marginBottom: "6px", marginBottom: "6px", marginRight: "6px"}]
                                    let len = v.savePoints.length
                                    for (let i2 = 0; i2 < len; i2++) {
                                        let corners = "0 0"
                                        if (i2 == len - 1) corners += " 12px"; else corners += " 0";
                                        if (i2 == 0) corners += " 12px"; else corners += " 0";
                                        element[1][0][1][1][1].push(
                                            ["style-row", [
                                                ["raw-html", v.savePoints[i2] + 20, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {background: player.ir.shipBattleSaveCurrent && (player.ir.shipBattleSaveCurrent.perZoneHighestLevels[i] && player.ir.shipBattleSaveCurrent.perZoneHighestLevels[i][i2 * 20]) ? v.secondaryColor : "#361e1e", border: "3px solid " + v.primaryColor + "7f", borderRadius: corners, width: ((maxListWidth - len * 6) / len) + "px", height: "21.5px"}],
                                        )
                                    }
                                    container[0][1].push(element)
                                }
                                container.push(["style-column", [
                                    ["raw-html", "Each level can provide upgrades ONLY ONCE per save.<br>Repeated levels instead provide <span style='color:#ffb366;text-shadow:0 0 8px #ffb366'>space junk</span>.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "502px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: "repeating-linear-gradient(135deg, #1b0447 0 15px, #150336 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                },
            },
            "blood": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let maxListWidth = player.ir.inBattle ? 376 : 245
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                                let container = [["style-row", [], {width: player.ir.inBattle ? "782px" : "514px", marginRight: "24px"}]]
                                if (player.ir.shipBattleSaveCurrent == null || player.ir.shipType == 0) return container;
                                for (let [i, v] of Object.entries(SB_zones)) {
                                    if (!v.location || !v.unlocked() || (v.location && v.location != "blood")) continue;
                                    let element = ["style-column", [
                                        ["style-column", [
                                            ["style-row", [
                                                ["raw-html", v.nameCap, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {background: v.secondaryColor, borderBottom: "3px solid" + v.primaryColor, borderRadius: "12px 12px 0 0", width: maxListWidth + "px", height: "25px"}],
                                            ["style-row", [
                                            ], {background: "black", borderRadius: "0 0 12px 12px", width: maxListWidth + "px", height: "27.5px"}],
                                        ], {background: "#37078f", borderRadius: "12px", width: maxListWidth + "px", height: "55.5px"}],
                                    ], {background: "#151230", border: "3px solid" + v.primaryColor, borderRadius: "15px", width: maxListWidth + "px", height: "55.5px", marginBottom: "6px", marginBottom: "6px", marginRight: "6px"}]
                                    let len = v.savePoints.length
                                    for (let i2 = 0; i2 < len; i2++) {
                                        let corners = "0 0"
                                        if (i2 == len - 1) corners += " 12px"; else corners += " 0";
                                        if (i2 == 0) corners += " 12px"; else corners += " 0";
                                        element[1][0][1][1][1].push(
                                            ["style-row", [
                                                ["raw-html", v.savePoints[i2] + 20, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {background: player.ir.shipBattleSaveCurrent && (player.ir.shipBattleSaveCurrent.perZoneHighestLevels[i] && player.ir.shipBattleSaveCurrent.perZoneHighestLevels[i][i2 * 20]) ? v.secondaryColor : "#361e1e", border: "3px solid " + v.primaryColor + "7f", borderRadius: corners, width: ((maxListWidth - len * 6) / len) + "px", height: "21.5px"}],
                                        )
                                    }
                                    container[0][1].push(element)
                                }
                                container.push(["style-column", [
                                    ["raw-html", "Each level can provide upgrades ONLY ONCE per save.<br>Repeated levels instead provide <span style='color:#ffb366;text-shadow:0 0 8px #ffb366'>space junk</span>.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "502px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: "repeating-linear-gradient(135deg, #260b0b 0 15px, #1c0808 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                },
            },
        },
        shipSelectionStats: {
            "finalStats": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                                let container = []
                                if (player.ir.shipBattleSaveCurrent == null || player.ir.shipType == 0) return container;
                                let shipStats = SB_getUpgradedShipStats(arena ? arena.upgrades : player.ir.shipBattleSaveCurrent.upgrades)
                                let baseStats = SB_ships[SB_shipNames[player.ir.shipBattleSaveCurrent.shipType]].baseStats
                                for (let [i, v] of Object.entries(shipStats)) {
                                    let statFormat = SHIP_STAT_FORMATTING[i]
                                    let prefix = statFormat.valuePrefix
                                    let suffix = statFormat.valueSuffix
                                    if ((i == "bloodStoneGain" || i == "bloodGemGain") && !hasUpgrade("le", 201)) {
                                        continue;
                                    }
                                    if (i == "healthRegen") {
                                        v *= 60
                                    }
                                    if (i == "attackSpeed") {
                                        v *= (1000 / baseStats.attackSpeed)
                                        prefix = ""
                                        suffix = "/s"
                                    }
                                    if (i == "bulletSize") {
                                        v *= baseStats.bulletRadius
                                        prefix = ""
                                    }
                                    if (i == "moveSpeed") {
                                        v *= baseStats.moveSpeed
                                        prefix = ""
                                    }
                                    container.push(["style-column", [
                                        ["style-row", [
                                            ["left-row", [
                                                ["raw-html", statFormat.name, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                            ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                            ["right-row", [
                                                ["raw-html", prefix + formatSimple(v, 2) + suffix, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                        ], {background: color2, borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                    ], {background: "#151230", border: "3px solid " + color1, borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                                }
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "baseStats": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            let shipStats = SB_ships[SB_shipNames[player.ir.shipBattleSaveCurrent.shipType]].baseStats
                            for (let [i, v] of Object.entries(SB_getDefaultShipStats())) {
                                v = shipStats[i]
                                let statFormat = SHIP_STAT_FORMATTING[i]
                                let prefix = statFormat.valuePrefix
                                let suffix = statFormat.valueSuffix
                                if ((i == "bloodStoneGain" || i == "bloodGemGain") && !hasUpgrade("le", 201)) {
                                    continue;
                                }
                                if (i == "attackSpeed") {
                                    v = 1000 / v
                                    prefix = ""
                                    suffix = "/s"
                                }
                                if (i == "bulletSize") {
                                    v = shipStats.bulletRadius
                                    prefix = ""
                                }
                                if (i == "moveSpeed") {
                                    prefix = ""
                                }
                                if (i == "spaceRockGain" || i == "spaceGemGain" || i == "bloodStoneGain" || i == "bloodGemGain") {
                                    prefix = "x"
                                }
                                if (i == "healthRegen") {
                                    v *= 60
                                }
                                container.push(["style-column", [
                                    ["style-row", [
                                        ["left-row", [
                                            ["raw-html", statFormat.name, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                        ["right-row", [
                                            ["raw-html", prefix + formatSimple(v, 2) + suffix, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                    ], {background: color2, borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                ], {background: "#151230", border: "3px solid " + color1, borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "upgradeEffects": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            for (let [i, v] of Object.entries(arena ? SB_getUpgradeMultis(arena.upgrades) : player.ir.shipBattleSaveCurrent.upgradeMultis)) {
                                let statFormat = SHIP_STAT_FORMATTING[i]
                                let prefix = "x"
                                if (i == "healthRegen") {
                                    v *= 60
                                    prefix = "+"
                                }
                                container.push(["style-column", [
                                    ["style-row", [
                                        ["left-row", [
                                            ["raw-html", statFormat.name, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                        ["right-row", [
                                            ["raw-html", prefix + formatSimple(v, 2) + SHIP_STAT_FORMATTING[i].valueSuffix, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                    ], {background: "#00007f", borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                ], {background: "#151230", border: "3px solid " + color1, borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                            container.push(["style-column", [
                                ["raw-html", "Each upgrade stacks additively with others of its exact type, but multiplicatively with all others.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                            ], {width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "upgradeCounts": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            let entries = Object.entries(arena ? arena.upgrades : player.ir.shipBattleSaveCurrent.upgrades)
                            let entriesIndex = 0
                            for (let [i, v] of entries) {
                                entriesIndex++
                                if (v <= 0) continue;
                                let upgrade = UPGRADE_POOL[i]
                                container.push(["style-column", [
                                    ["tooltip-row", [
                                        ["left-row", [
                                            ["raw-html", upgrade.name(), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                        ["right-row", [
                                            ["raw-html", formatWhole(v, 2), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                        ["raw-html", "<div class='bottomTooltip'>" + upgrade.description() + "</div>"],
                                    ], {borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                ], {background: "#00007f border-box", border: "3px solid " + UPGRADE_RARITIES[upgrade.rarity].color + "bf", borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                            container.push(["style-column", [
                                ["raw-html", "Each upgrade stacks additively with others of its exact type, but multiplicatively with all others.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                            ], {width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "salvagedUpgrades": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            let entries = Object.entries(arena ? arena.upgrades : player.ir.shipBattleSaveCurrent.bankedUpgrades)
                            let entriesIndex = 0
                            for (let [i, v] of entries) {
                                entriesIndex++
                                if (v <= 0) continue;
                                let upgrade = UPGRADE_POOL[i]
                                container.push(["style-column", [
                                    ["tooltip-row", [
                                        ["left-row", [
                                            ["raw-html", upgrade.name(), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                        ["right-row", [
                                            ["raw-html", formatWhole(v, 2), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                        ["raw-html", "<div class='bottomTooltip'>" + upgrade.description() + "</div>"],
                                    ], {borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                ], {background: "#00007f border-box", border: "3px solid " + UPGRADE_RARITIES[upgrade.rarity].color + "bf", borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                            container.push(["style-column", [
                                ["raw-html", "Each upgrade stacks additively with others of its exact type, but multiplicatively with all others.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                            ], {width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
        },
        ships: {
            "levelables": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#361e1e"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["blank", "5.5px"],
                            ["raw-html", () => {return "Ship Selected: <span style='color:#ffff00'>" + (player.ir.shipBattleSaveCurrent == null ? "<span style='color:#aaa2f2'>None" : (layers.ir.levelables[player.ir.shipBattleSaveCurrent.shipType].title() + " " + (player.ir.shipBattleSaveCurrent.slot === -2 ? "(Latest Run)" : player.ir.shipBattleSaveCurrent.slot === -1 ? "<span style='color:#aaa2f2'>(New Run)" : ("<span style='color:#aaa2f2'>(Slot #" + (player.ir.shipBattleSaveCurrent.slot + 1) + ")"))))}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "8.5px"],
                            ["layer-proxy", ["ir", [["clickable", "newRun"]]]],
                        ], {width: "535px"}],
                        ["style-column", [
                            ["blank", "33px"],
                            ["layer-proxy", ["ir", [["clickable", "toggleMobileControls"]]]],
                        ], {width: "259px", marginRight: "6px"}],
                    ], {width: "800px", minHeight: "95px", background: "#00007f"}],
                    ["style-row", [], {width: "800px", height: "3px", background: "#f57171"}],
                    ["always-scroll-column", [
                        ["top-column", [
                            ["layer-proxy", ["ir", [["row", [
                                ["dark-extended-levelable", 1], ["dark-extended-levelable", 2],
                                ["dark-extended-levelable", 3], ["dark-extended-levelable", 4],
                                ["dark-extended-levelable", 5], ["dark-extended-levelable", 6],
                                ["dark-extended-levelable", 7], ["dark-extended-levelable", 8],
                                ["dark-extended-levelable", 9], ["dark-extended-levelable", 10],
                            ]]]]],
                        ], {width: "780px", minHeight: "573px", background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", padding: "3px", marginRight: "20px"}],
                    ], {width: "800px", height: "579px"}],
                ]
            },
            "saves": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#361e1e"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["blank", "5.5px"],
                            ["raw-html", () => {return "Ship Selected: <span style='color:#ffff00'>" + (player.ir.shipBattleSaveCurrent == null ? "<span style='color:#aaa2f2'>None" : (layers.ir.levelables[player.ir.shipBattleSaveCurrent.shipType].title() + " " + (player.ir.shipBattleSaveCurrent.slot === -2 ? "(Latest Run)" : player.ir.shipBattleSaveCurrent.slot === -1 ? "<span style='color:#aaa2f2'>(New Run)" : ("<span style='color:#aaa2f2'>(Slot #" + (player.ir.shipBattleSaveCurrent.slot + 1) + ")"))))}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "8.5px"],
                            ["layer-proxy", ["ir", [["clickable", "newRun"]]]],
                        ], {width: "535px"}],
                        ["style-column", [
                            ["blank", "33px"],
                            ["layer-proxy", ["ir", [["clickable", "toggleMobileControls"]]]],
                        ], {width: "259px", marginRight: "6px"}],
                    ], {width: "800px", minHeight: "95px", background: "#00007f"}],
                    ["style-row", [], {width: "800px", height: "3px", background: "#f57171"}],
                    ["style-row", [
                        ["top-column", [
                            ["style-column", () => {
                                let container = []
                                if (player.ir.shipBattleSaveCurrent == null) return container;
                                container.push(
                                    ["style-column", [
                                        ["raw-html", "<i>" + layers.ir.levelables[player.ir.shipBattleSaveCurrent.shipType].lore() + "</i>", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                    ], {width: "508px"}],
                                )
                                return container
                            }, {background: "#00007f", width: "532px", height: "82px"}],
                            ["style-row", [], {background: "#f57171", width: "532px", height: "3px"}],
                            ["style-row", [
                                ["category-button", ["Progression", "shipSelection", "shipSelectionProgression"], {width: "264px", height: "50px", background: "#00005f", border: "3px solid #f571717f", borderRadius: "0"}],
                                ["style-row", [], {width: "3px", height: "50px", backgroundColor: "#f57171"}],
                                ["category-button", ["Stats", "shipSelection", "shipSelectionStats"], {width: "265px", height: "50px", background: "#00005f", border: "3px solid #f571717f", borderRadius: "0"}],
                            ], {width: "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                            ["style-row", [], {background: "#f57171", width: "532px", height: "3px"}],
                            ["buttonless-microtabs", "shipSelection", {borderWidth: "0"}],
                        ], {borderRight: "3px solid #f57171", height: "579px"}],
                        ["always-scroll-column", [
                            ["top-column", () => {
                                let container = []
                                let maxSaves = 3
                                if (hasUpgrade('ir', 107)) maxSaves++;
                                if (player.bl.noxDefeated) maxSaves++;
                                for (let i = 0; i < maxSaves; i++) {
                                    let save = player.ir.shipBattleSaves[i]
                                    container.push(["style-column", [
                                        ["style-column", [
                                            ["raw-html", "Slot #" + (i + 1), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "25px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["style-column", [
                                            ["raw-html", (save == null ? "<span style='color:#aaa2f2'>Empty" : (
                                                layers.ir.levelables[save.shipType].title()
                                                + "<br><span style='color:#aaa2f2;font-size:12px'>Upgrade Count: " + formatSimple(save.upgradeCount, 2)
                                                + "<br>Upgrade Score: " + formatSimple(save.upgradeScore, 2)
                                            )), { "color": "yellow", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "98px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["layer-proxy", ["ir", [["clickable", "loadShipSave_" + i]]]],
                                    ], {background: "#151230", border: "3px solid #5e4ee6", borderRadius: "15px", marginBottom: "6px", width: "232px", height: "179px"}])
                                }
                                return container
                            }, {width: "238px", minHeight: "567px", background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", padding: "6px", paddingBottom: "0", marginRight: "0px"}],
                        ], {width: "265px", height: "579px"}],
                    ], {width: "800px", height: "579px"}],
                ]
            },
            "automation": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#361e1e"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "5.5px"],
                            ["raw-html", function () { return "You have <span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(player.ir.spaceRock) + " space rocks</span>, <span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(player.ir.spaceGem) + " space gems</span>, and <span style='color:#ffb366;text-shadow:0 0 8px #ffb366'>" + formatWhole(player.ir.spaceJunk) + " space junk</span>."  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "8.5px"],
                        ], {width: "800px"}],
                        ["style-row", [
                            ["style-column", [
                                ["layer-proxy", ["ir", [["clickable", "gainAutoStats"]]]],
                            ], {width: "535px"}],
                            ["style-row", [
                                ["layer-proxy", ["ir", [["clickable", "toggleMobileControls"]]]],
                            ], {width: "259px", marginRight: "6px"}],
                        ], {width: "800px", marginRight: "6px"}],
                    ], {width: "800px", minHeight: "95px", background: "#00007f"}],
                    ["style-row", [], {width: "800px", height: "3px", background: "#f57171"}],
                    ["style-row", [
                        ["top-column", [
                            ["style-row", [
                                ["category-button", ["Space Junk Upgrades", "automation", "spaceJunkUpgrades"], {width: "264px", height: "50px", background: "#00005f", border: "3px solid #f571717f", borderRadius: "0"}],
                                ["style-row", [], {width: "3px", height: "50px", backgroundColor: "#f57171"}],
                                ["category-button", [() => {return "Ship Upgrades<br><small>(Reroll in " + formatSimpleTime(player.ir.shipUpgradeRerollTimer) + ")"}, "automation", "shipUpgrades"], {width: "264px", height: "50px", background: "#00005f", border: "3px solid #f571717f", borderRadius: "0"}],
                                //["style-row", [], {width: "3px", height: "50px", backgroundColor: "#f57171"}],
                                /*["style-row", [
                                    ["style-row", [
                                        ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                    ], {width: "176px", height: "50px", background: "#00003f", borderRadius: "0"}],
                                ], () => {return {display: hasUpgrade("ir", 302) ? "none !important" : ""}}],
                                ["style-row", [
                                    ["category-button", ["Resource Extraction", "automation", "resourceExtraction"], {width: "176px", height: "50px", background: "#00005f", border: "3px solid #f571717f", borderRadius: "0"}],
                                ], () => {return {display: hasUpgrade("ir", 302) ? "" : "none !important"}}],*/
                            ], {}],

                            ["style-row", [], {background: "#f57171", width: "532px", height: "3px"}],
                            ["buttonless-microtabs", "automation", {borderWidth: "0"}],
                        ], {background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", borderRight: "3px solid #f57171", width: "532px", height: "579px"}],
                        
                        ["always-scroll-column", [
                            ["top-column", () => {
                                let container = []
                                let maxSaves = 3
                                if (hasUpgrade('ir', 107)) maxSaves++;
                                if (player.bl.noxDefeated) maxSaves++;
                                for (let i = 0; i < maxSaves; i++) {
                                    let save = player.ir.shipBattleSaves[i]
                                    container.push(["style-column", [
                                        ["style-column", [
                                            ["raw-html", "Slot #" + (i + 1), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "25px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["style-column", [
                                            ["raw-html", (save == null ? "<span style='color:#aaa2f2'>Empty" : (
                                                layers.ir.levelables[save.shipType].title()
                                                + "<br><span style='color:#aaa2f2;font-size:12px'>Upgrade Count: " + formatSimple(save.upgradeCount, 2)
                                                + "<br>Upgrade Score: " + formatSimple(save.upgradeScore, 2)
                                            )), { "color": "yellow", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "98px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["layer-proxy", ["ir", [["clickable", "loadShipSave_" + i]]]],
                                    ], {background: "#151230", border: "3px solid #5e4ee6", borderRadius: "15px", marginBottom: "6px", width: "232px", height: "179px"}])
                                }
                                return container
                            }, {width: "238px", minHeight: "567px", background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", padding: "6px", paddingBottom: "0", marginRight: "0px"}],
                        ], {width: "265px", height: "579px"}],
                    ], {width: "800px", height: "579px"}],
                ]
            },
        },
        automation: {
            "spaceJunkUpgrades": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [["layer-proxy", ["ir", [
                    ["blank", "4.5px"],
                    ["style-row", [
                        ["buyable", 301], ["buyable", 302],
                    ]],
                    ["style-row", [
                        ["buyable", 303], ["upgrade", 301],
                    ]],
                    ["style-row", [
                        ["upgrade", 302], ["upgrade", 303],
                    ]],
                    ["blank", "4.5px"],
                    ["raw-html", "Gain <span style='color:#ffb366;text-shadow:0 0 6px #ffb366'>space junk</span> in place of ship level-up upgrades you're already obtained.", { "color": "#aaa2f2", "font-size": "12px", "font-family": "monospace" }],
                ]]]],
            },
            "shipUpgrades": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [["layer-proxy", ["ir", [
                    ["blank", "4.5px"],
                    ["style-column", [
                        ["style-row", [
                            ["upgrade", 401], ["upgrade", 402],
                        ]],
                        ["style-row", [
                            ["upgrade", 403], ["upgrade", 404],
                        ]],
                        ["style-row", [
                            ["upgrade", 405], ["upgrade", 406],
                        ]],
                        ["style-row", [
                            ["upgrade", 407], ["upgrade", 408],
                        ]],
                        ["style-row", [
                            ["upgrade", 409], ["upgrade", 410],
                        ]],
                        ["style-row", [
                            ["upgrade", 411], ["upgrade", 412],
                        ]],
                    ]],
                    ["blank", "4.5px"],
                    ["raw-html", "You must have a saved ship selected in order to purchase ship upgrades.", { "color": "#aaa2f2", "font-size": "12px", "font-family": "monospace" }],
                ]]]],
            },
            "resourceExtraction": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [

                ],
            },
        },
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
                        ["category-button", ["Ships", "stuff", "ships"], {width: "265px", height: "40px", background: "#4f1818", border: "3px solid #f571717f", borderRadius: "13px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],
                        ["category-button", ["Stages", "stuff", "stages"], {width: "264px", height: "40px", background: "#4f1818", border: "3px solid #f571717f", borderRadius: "0 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],
                        ["category-button", ["Upgrades", "stuff", "upgrades"], {width: "265px", height: "40px", background: "#4f1818", border: "3px solid #f571717f", borderRadius: "0 13px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid #f57171", borderRadius: "16px 16px 0 0", marginBottom: "-3px"}],
                    ["top-column", [
                        ["style-row", [
                            ["category-button", ["Levelables", "ships", "levelables"], {width: "265px", height: "40px", background: "#381111", border: "3px solid #f571717f", borderRadius: "10"}],
                            ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],

                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "264px", height: "40px", background: "#00003f", borderRadius: "0"}],
                            ], () => {return {display: hasMilestone("spaceZone1", 11) ? "none !important" : ""}}],
                            ["style-row", [
                                ["category-button", ["Saves", "ships", "saves"], {width: "264px", height: "40px", background: "#381111", border: "3px solid #f571717f", borderRadius: "0"}],
                            ], () => {return {display: hasMilestone("spaceZone1", 11) ? "" : "none !important"}}],

                            ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#f57171"}],

                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "265px", height: "40px", background: "#00003f", borderRadius: "0"}],
                            ], () => {return {display: player.ev.evolutionsUnlocked[13] ? "none !important" : ""}}],
                            ["style-row", [
                                ["category-button", ["Space Junk", "ships", "automation"], {width: "265px", height: "40px", background: "#381111", border: "3px solid #f571717f", borderRadius: "0"}],
                            ], () => {return {display: player.ev.evolutionsUnlocked[13] ? "" : "none !important"}}],

                        ], {width: "800px", height: "40px", borderBottom: "3px solid #f57171", borderRadius: "0"}],
                        ["style-column", [
                            ["buttonless-microtabs", "ships", {borderWidth: "0"}],
                        ], {width: "800px", height: "677px", borderRadius: "0"}],
                    ], {width: "800px", height: "720px", background: "radial-gradient(circle, #260b0b 0%, #4f1818 200%)", border: "3px solid #f57171", borderRadius: "0"}],
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
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return false },
                content() {

                    let container = []
                    switch (player.ir.menu) {
                        case 1: { // IN UPGRADE SELECTION
                            container.push(
                                ["top-column", [
                                    ["style-row", [
                                        ["category-button", ["Level-Up Upgrades", "battleUpgradeSelection", "experience"], {width: "398.5px", height: "50px", background: "#00005f", border: "3px solid " + player.ir.primaryColor + "7f", borderRadius: "0"}],
                                        ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.primaryColor}],
                                        ["style-row", [
                                            ["style-row", [
                                                ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                            ], {width: "398.5px", height: "50px", background: "#00003f", borderRadius: "0"}],
                                        ], {display: player.ev.evolutionsUnlocked[13] ? "none !important" : ""}],
                                        ["style-row", [
                                            ["category-button", ["Salvaged Upgrades", "battleUpgradeSelection", "salvage"], {width: "398.5px", height: "50px", background: "#00005f", border: "3px solid " + player.ir.primaryColor + "7f", borderRadius: "0"}],
                                        ], {display: player.ev.evolutionsUnlocked[13] ? "" : "none !important"}],
                                    ], {background: "black", width: "800px", height: "50px", borderRadius: "16px 16px 0 0"}],
                                    ["style-row", [], {background: player.ir.primaryColor, width: "800px", height: "3px"}],
                                    ["buttonless-microtabs", "battleUpgradeSelection", {borderWidth: "0"}],
                                ], {background: ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "2f 0 15px, " + player.ir.secondaryColor + "3f 0 30px)"), height: "800px"}],
                            )
                        break; }
                        case 2: { // IN STATS
                            container.push(
                                ["top-column", [
                                    ["style-row", [
                                        ["category-button", ["Progression", "shipSelection", "shipSelectionProgression"], {width: "398.5px", height: "50px", background: player.ir.secondaryColor + "bf", border: "3px solid " + player.ir.primaryColor + "7f", borderRadius: "0"}],
                                        ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.primaryColor}],
                                        ["category-button", ["Stats", "shipSelection", "shipSelectionStats"], {width: "398.5px", height: "50px", background: player.ir.secondaryColor + "bf", border: "3px solid " + player.ir.primaryColor + "7f", borderRadius: "0"}],
                                    ], {width: "800px", height: "50px", borderRadius: "16px 16px 0 0"}],
                                    ["style-row", [], {background: player.ir.primaryColor, width: "800px", height: "3px"}],
                                    ["buttonless-microtabs", "shipSelection", {borderWidth: "0"}],
                                ], {height: "800px"}],
                            )
                        break; }
                        default: { // IN NOTHING
                        break; };
                    }

                    return [
                        ["style-column", [], {height: (arena && arena._fullscreen) ? "10px" : "0"}],
                        ["style-column", [
                            ["raw-html", "Level: " + formatWhole(player.ir.battleLevel) + "<span style='font-size:16px'> / " + formatWhole(SB_zones[player.ir.battleStage].levelLimit) + "</span>", { "color": "white", textShadow: "0 0 10px white", "font-size": "24px", "font-family": "monospace", lineHeight: "1" }],
                            ["style-row", [
                                ["raw-html", "<small>[SOFTCAP: x" + format(player.ir.levelScalingMult) + " Asteroid and Celestialite Stats]</small>", { "color": "red", textShadow: "0 0 10px red", "font-size": "16px", "font-family": "monospace", marginLeft: "6px", marginRight: "6px" }],
                            ], {lineHeight: "1", marginLeft: "6px", marginRight: "6px", display: player.ir.battleLevel.gt(player[player.ir.battleStage].levelScalingStart) ? "" : "none !important"}]
                        ], {width: "800px", height: "50px", background: player.ir.secondaryColor, borderRadius: "13px 13px 0 0", border: "3px solid " + player.ir.primaryColor, borderBottom: "0", display: (arena && arena._fullscreen) ? "none !important" : ""}],
                        ["layer-proxy", ["ir", [["row", [["ex-bar", "healthBar"], ["ex-bar", "xpBar"],]]]]],
                        ["style-column", [
                        ], {display: player.ir.menu != 0 ? "none !important" : "", border: "3px solid " + player.ir.primaryColor, borderTop: "0", borderBottom: "0", height: (arena && arena._fullscreen) ? "calc(100vh - 279px)" : "800px", width: (arena && arena._fullscreen) ? "calc(100vw - 6px)" : "800px"}],
                        ["style-column", [
                            ["style-column", container, {marginLeft: "-3px", border: "3px solid " + player.ir.primaryColor, background: player.ir.menu != 2 ? "transparent" : "black"}]
                        ], {display: player.ir.menu == 0 ? "none !important" : "",  height: (arena && arena._fullscreen) ? "calc(100vh - 279px)" : "800px", width: (arena && arena._fullscreen) ? "calc(100vw - 6px)" : "800px"}],
                        ["style-column", [], {background: player.ir.primaryColor, width: (arena && arena._fullscreen) ? "calc(100vw)" : "806px", height: "3px"}],
                        ["layer-proxy", ["ir", [["row", [["ex-bar", "bossHealthBar"],]]]]],
                        ["layer-proxy", ["ir", [["style-column", [
                            ["blank", "9px", {width: "6px"}],
                            ["raw-html", "Use W and S to more forwards or backwards, A to D to rotate, and Space or Mouse to shoot.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "9px", {width: "6px"}],
                            ["row", [
                                ["clickable", 12], ["blank", "6px", {width: "6px"}], ["clickable", 15], ["blank", "6px", {width: "6px"}], ["clickable", 16],
                            ]],
                        ], {width: (arena && arena._fullscreen) ? "calc(100vw - 6px)" : "800px", height: "100px", background: player.ir.secondaryColor, borderRadius: (arena && arena._fullscreen) ? "0px" : "0 0 13px 13px", border: "3px solid " + player.ir.primaryColor, borderTop: "0px"}],]]]
                    ]
                }
            },
            "Refresh Page :(": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You baboon. WHY DID YOU REFRESH THE PAGE???" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["layer-proxy", ["ir", [["clickable", 12]]]],
                ]
            },
            "Lose": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You lost." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["layer-proxy", ["ir", [["clickable", 12]]]],
                ]
            },
        },
        battleUpgradeSelection: {
            "experience": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content() {
                    return [
                        ["style-column", [
                            ["raw-html", "<h2>Choose an Upgrade!", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["layer-proxy", ["ir", [["style-row", [
                                ["clickable", "levelUpUpgrade_0"],
                                ["clickable", "levelUpUpgrade_1"],
                                ["clickable", "levelUpUpgrade_2"],
                            ], {width: "800px", background: player.ir.secondaryColor, height: "174px", border: "3px solid " + player.ir.primaryColor, borderLeft: "0", borderRight: "0"}]]]],
                            ["blank", "10px"],
                            ["layer-proxy", ["ir", [["clickable", "levelUpUpgrade_confirm"]]]],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "salvage": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content() {
                    return [
                        ["style-column", [
                            ["raw-html", "<h2>Choose a Salvaged Upgrade!", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["style-row", [
                                ["style-row", [], {background: "#00007f7f", borderRadius: "10px", width: "250px", height: "150px", margin: "6px", display: arena && arena.salvagedUpgradeChoices.length > 0 ? "none !important" : ""}],
                                ["layer-proxy", ["ir", [["clickable", "salvagedUpgrade_0"]]]],
                                ["style-row", [], {background: "#00007f7f", borderRadius: "10px", width: "250px", height: "150px", margin: "6px", display: arena && arena.salvagedUpgradeChoices.length > 1 ? "none !important" : ""}],
                                ["layer-proxy", ["ir", [["clickable", "salvagedUpgrade_1"]]]],
                                ["style-row", [], {background: "#00007f7f", borderRadius: "10px", width: "250px", height: "150px", margin: "6px", display: arena && arena.salvagedUpgradeChoices.length > 2 ? "none !important" : ""}],
                                ["layer-proxy", ["ir", [["clickable", "salvagedUpgrade_2"]]]],
                            ], {width: "800px", background: "radial-gradient(circle, #ffb366, " + player.ir.secondaryColor + ")", height: "174px", border: "3px solid " + player.ir.primaryColor, borderLeft: "0", borderRight: "0"}],
                            ["blank", "10px"],
                            ["layer-proxy", ["ir", [["clickable", "salvagedUpgrade_confirm"]]]],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
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