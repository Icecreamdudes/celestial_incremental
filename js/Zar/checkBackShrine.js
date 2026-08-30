
let getShrineUpgradeTreeLeft = function(x) {
    return (-106.5 + 212 * x)
}
let getShrineUpgradeTreeTop = function(x) {
    return (137 * x)
}
let createShrineUpgradeConnection = function(xy1_b, xy2_b) {
    let xy1 = [getShrineUpgradeTreeLeft(xy1_b[0]), getShrineUpgradeTreeTop(xy1_b[1])]
    let xy2 = [getShrineUpgradeTreeLeft(xy2_b[0]), getShrineUpgradeTreeTop(xy2_b[1])]
    return ["style-row", [["style-row", [], {
        position: "relative",
            left: () => {return (106 + (xy1[0] + xy2[0]) / 2) + "px"},
            top: () => {return ((xy1[1] + xy2[1]) / 2) + "px"},
            transform: () => {return "rotate(" + Math.atan2(xy2[1] - xy1[1], xy2[0] - xy1[0]) + "rad)"},
            width: () => {return Math.hypot(xy2[1] - xy1[1], xy2[0] - xy1[0]) + "px"},
            height: "12px", background: "#3383ab",
    }]], {width: "0", height: "0"}]
}
let createShrineUpgrade = function(type, id, xy) {
    return ["style-column", [
        [type, id],
    ], {width: "0", height: "0", position: "relative", left: getShrineUpgradeTreeLeft(xy[0]) + "px", top: getShrineUpgradeTreeTop(xy[1]) + "px"}]
}

addLayer("cbs", {
    name: "Check Back Shrine", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>CBS", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        ascensionShards: new Decimal(0),

        inBattle: false, 
        ritualSpiritActive: false,

        ritualSpiritCooldown: new Decimal(0),
        ritualSpiritCooldownMax: new Decimal(21600),

        ritualCosts: [new Decimal(20), new Decimal(6)],
        
        shrineReactivated: false,
        shrineTab: 0,
        blessing1Selection: 1,
        blessing2Selection: 1,
        factorSelection: 1,
        pylonSelection: 1,

        pylonBuilt: false,
        pylonEnergyMax: new Decimal(1),
        pylonEnergy: new Decimal(0),
        pylonEnergyEffect: new Decimal(1), //cb tickspeed
        pylonEnergyEffect2: new Decimal(1), 
        pylonEnergyEffect3: new Decimal(1),
        pylonEnergyEffect4: new Decimal(1),
        pylonPassiveEffect: new Decimal(1),
        pylonEnergyToGet: new Decimal(0),

        pylonTier: new Decimal(1),
        pylonTierEffect: new Decimal(1),

        energyTimerMax: new Decimal(86400),
        energyTimer: new Decimal(0),
        
    }},
    nodeStyle() {
        return {
            background: "linear-gradient(180deg, #064666 0%, #032333 50%, #064666 100%)",
            "background-origin": "border-box",
            "border-color": "#3383ab",
            "color": "#3383ab",
            borderRadius: "4px",
            transform: "translateX(-50px)",
        }
    },
    tooltip: "Check Back Shrine",
    color: "#c6f7ff",
    branches: ["sm",],
    update(delta) {
        if (arena == null && player.subtabs["cbs"]['stuff'] == 'Battle') {
            player.subtabs["cbs"]['stuff'] = "Refresh Page :(";
        }

        if (cutsceneActive && player.tab == "cbs")
        {
            player.ir.shipHealth = player.ir.shipHealthMax
        }

        player.cbs.ritualCosts[0] = player.cbs.ascensionShards.min(100).pow(0.5).pow_base(3).mul(50).floor()
        player.cbs.ritualCosts[1] = player.cbs.ascensionShards.min(100).pow(0.5).pow_base(2.5).mul(15).floor()

        player.cbs.ritualSpiritCooldownMax = new Decimal(21600)
        player.cbs.ritualSpiritCooldown = new Decimal(0) // TEMP
        //player.cbs.ritualSpiritCooldown = player.cbs.ritualSpiritCooldown.sub(delta)

        //pylon
        player.cbs.pylonEnergyMax = Decimal.pow(1e5, player.cbs.pylonTier.pow(0.7))

        if (player.cbs.pylonBuilt) {
            player.cbs.pylonEnergyToGet = new Decimal(1)
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(buyableEffect("cbs", 101))
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(buyableEffect("cbs", 102))
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(buyableEffect("cbs", 103))
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(player.n.pylonEnergyEffect3)
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(levelableEffect("pu", 215)[1])
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(buyableEffect("ev0", 24))

            player.cbs.pylonPassiveEffect = player.pol.pollinators.plus(1).log10().pow(0.002).div(5).add(1).pow(player.cbs.pylonTierEffect)
        } else {
            player.cbs.pylonEnergyToGet = new Decimal(0)

            player.cbs.pylonPassiveEffect = new Decimal(1)
        }

        if (player.cbs.pylonEnergy.gte(player.cbs.pylonEnergyMax)) {
            player.cbs.pylonEnergy = player.cbs.pylonEnergyMax
            player.cbs.pylonEnergyToGet = new Decimal(0)
        }

        let effectivePylonEnergy = player.cbs.pylonEnergy.pow(player.cbs.pylonTierEffect)
        player.cbs.pylonEnergyEffect = effectivePylonEnergy.pow(0.02).div(3).add(1)
        player.cbs.pylonEnergyEffect2 = effectivePylonEnergy.pow(0.1).div(3).add(1)
        player.cbs.pylonEnergyEffect3 = effectivePylonEnergy.pow(0.05).div(4).add(1)
        player.cbs.pylonEnergyEffect4 = effectivePylonEnergy.pow(0.05).div(50)

        player.cbs.pylonTierEffect = player.cbs.pylonTier.sub(1).div(10).add(1)

        player.cbs.energyTimerMax = new Decimal(86400)
        player.cbs.energyTimer = player.cbs.energyTimer.add(Decimal.mul(delta, player.cb.cbTickspeed))
        if (player.cbs.energyTimer.gte(player.cbs.energyTimerMax)) {
            player.cbs.energyTimer = new Decimal(0)
            player.cbs.pylonEnergy = player.cbs.pylonEnergy.add(player.cbs.pylonEnergyToGet)
        }
    },
    clickables: {
        "enter": {
            tooltip() { return "Gives +25% movement speed and +2 HP/s. Halves effective level-up upgrades." },
            title() {
                let str = "<h2>Perform Ritual</h2>"
                str += (player.cbs.ritualSpiritCooldown.lte(0) ? ("<br>Requires:<br>" + formatWhole(player.cbs.ritualCosts[0]) + " Evolution Shards<br>" + formatWhole(player.cbs.ritualCosts[1]) + " Paragon Shards") : ("Check back in " + formatTime(player.cbs.ritualSpiritCooldown)))
                let timer = new Decimal(0)
                if (player.ir.shipBattleSaveCurrent != null) {
                    timer = player.ir.timers[player.ir.shipBattleSaveCurrent.shipType].current.max(timer);
                    if (player.ir.shipBattleSaveCurrent.slot >= 0) timer = timer.max(player.ir.saveTimers[player.ir.shipBattleSaveCurrent.slot].current)
                }
                if (timer.gt(0)) str += "<br>(Ship Cooling Down: " + formatTime(timer) + ")";
                return str
            },
            canClick() {return player.cb.evolutionShards.gte(player.cbs.ritualCosts[0]) && player.cb.paragonShards.gte(player.cbs.ritualCosts[1]) && player.cbs.ritualSpiritCooldown.lte(0) && player.ir.shipBattleSaveCurrent != null && player.ir.timers[player.ir.shipBattleSaveCurrent.shipType].current.lte(0) && (player.ir.shipBattleSaveCurrent.slot < 0 || player.ir.saveTimers[player.ir.shipBattleSaveCurrent.slot].current.lte(0))},
            unlocked: true,
            onClick() {
                SB_enterRun("ascensionRitual")

                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.cbs.ritualCosts[0])
                player.cb.paragonShards = player.cb.paragonShards.sub(player.cbs.ritualCosts[1])
                player.cbs.ritualSpiritCooldown = player.cbs.ritualSpiritCooldownMax

                SB_spawnCelestialite("ritualSpirit")
                for (let [i, v] of Object.entries(arena.upgrades)) {
                    arena.upgrades[i] = v / 2
                }

                arena.upgrades.moveSpeedLegendary += 1
                arena.upgrades.healthRegenUncommon += 4
            },
            style() {
                let look = {width: "250px", minHeight: "250px", maxHeight: "250px", color: "white", border: "3px solid #000000", borderRadius: "15px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "linear-gradient(180deg, #064666 0%, #032333 50%, #064666 100%)" : "#361e1e"
                look.backgroundImage = "url(resources/ascensionShardDark.png)"
                look.backgroundSize = "244px 244px"
                return look
            },
        },
        12: {
            title() { return "<h2>Leave Battle" },
            canClick() { return true },
            unlocked() { return !player.bl.noxFightActive || player.subtabs["bl"]["stuff"] == "Refresh Page :("|| player.subtabs["bl"]["stuff"] == "Lose"},
            onClick() {
                player.ir.inBattle = false
                options.fullscreen = false
                player.subtabs["cbs"]['stuff'] = 'Ritual'

                if (arena) {
                    arena.removeArena();
                    arena = null;
                }
                localStorage.setItem('arenaActive', 'false');

                player.ir.timers[player.ir.shipType].current = player.ir.timers[player.ir.shipType].max

                player.ir.battleXP = new Decimal(0)
                player.ir.battleLevel = new Decimal(1)

                player.cbs.inBattle = false
                player.cbs.ritualSpiritActive = false

                pauseUniverseAll(["DS", "A2"], "unpause", true)
            },
            style: {width: "200px", minHeight: '100px', color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },
        13: {
            title() { return "<h2>Reactivate the Check Back Shrine</h2><br>Cost: 1 Shard of Ascension" },
            canClick() { return player.cbs.ascensionShards.gte(1) },
            unlocked() { return !player.cbs.shrineReactivated},
            onClick() {
                player.cbs.ascensionShards = player.cbs.ascensionShards.sub(1)

                player.cbs.shrineReactivated = true
                //player.cbs.shrineReactivated = false

            },
            style() {
                let look = {width: "600px", minHeight: "100px", maxHeight: "100px", color: "white", border: "3px solid #c6f7ff", borderRadius: "15px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"}
                look.background = "linear-gradient(180deg, #064666 0%, #032333 50%, #064666 100%)"
                return look
            },
        },
        14: {
            title() { return "<h2>Build the Temporal Shard Pylon<br>Cost: 5 Shards of Ascension, 250 Paragon Shards, 1,000 Evolution Shards, and 10,000 Temporal Fragments" },
            canClick() { return player.cbs.ascensionShards.gte(5) && player.cb.paragonShards.gte(250) && player.cb.evolutionShards.gte(1000) && player.cof.coreFragments[6].gte(10000) },
            unlocked() { return !player.cbs.pylonBuilt},
            onClick() {
                player.cbs.ascensionShards = player.cbs.ascensionShards.sub(5)
                player.cb.paragonShards = player.cb.paragonShards.sub(250)
                player.cb.evolutionShards = player.cb.evolutionShards.sub(1000)
                player.cof.coreFragments[6] = player.cof.coreFragments[6].sub(10000)

                player.cbs.pylonBuilt = true
            },
            style: {width: "600px", minHeight: "200px", backgroundImage: "linear-gradient(180deg, #094599 0%, #062a5eff 50%, #094599 100%)", border: "3px solid rgba(0,0,0,0.5)", color: "#c6f7ff", borderRadius: "15px"},
        },
        15: {
            title() { return "Tier up the Temporal Pylon" },
            canClick() { return player.cbs.pylonEnergy.gte(player.cbs.pylonEnergyMax) },
            unlocked() { return player.cbs.pylonEnergy.gte(player.cbs.pylonEnergyMax) },
            onClick() {
                player.cbs.pylonEnergy = new Decimal(0)

                player.cbs.pylonTier = player.cbs.pylonTier.add(1)
            },
            style: {width: "738px", minHeight: "50px", color: "#c6f7ff", backgroundImage: "linear-gradient(180deg, #094599 0%, #062a5eff 50%, #094599 100%)", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "10px"},
        },
        21: {
            title() { return "<h2>Blessings" },
            canClick() { return player.cbs.shrineTab != 0 },
            unlocked() { return true },
            onClick() { player.cbs.shrineTab = 0 },
            style() {
                let look = {width: "203px", minHeight: "50px", color: "#c6f7ff", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #094599 0%, #062a5eff 50%, #094599 100%)"
                } else {
                    look.color = "#c6f7ff"
                    look.backgroundColor = "black"
                }
                return look
            },
        },
        22: {
            title() { return true ? "<h2>???" : "<h2>Blessings II" },
            canClick() { return false && player.cbs.shrineTab != 1 },
            unlocked() { return true },
            onClick() { player.cbs.shrineTab = 1 },
            style() {
                let look = {width: "203px", minHeight: "50px", color: "#fff", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0px"}
                if (true) {
                    look.color = "#ccc"
                    look.border = "3px solid #000"
                    look.background = "linear-gradient( #222, #000, #222)"
                } else if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #3466ac 0%, #203f6b 50%, #3466ac 100%)"
                } else {
                    look.color = "#c6f7ff"
                    look.backgroundColor = "black"
                }
                return look
            },
        },
        23: {
            title() { return "<h2>Factors" },
            canClick() { return player.cbs.shrineTab != 2 },
            unlocked() { return true },
            onClick() { player.cbs.shrineTab = 2 },
            style() {
                let look = {width: "203px", minHeight: "50px", color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(90deg, #474747ff 0%, #8d8d8dff 100%)"
                    look.border = "3px solid #242424"
                } else {
                    look.color = "#c6f7ff"
                    look.backgroundColor = "black"
                }
                return look
            },
        },
        24: {
            title() { return "<h2>Pylon" },
            canClick() { return player.cbs.shrineTab != 3 },
            unlocked() { return true },
            onClick() { player.cbs.shrineTab = 3 },
            style() {
                let look = {width: "203px", minHeight: "50px", color: "#c6f7ff", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(90deg, #2a6378 0%, #09366e 100%)"
                } else {
                    look.color = "#c6f7ff"
                    look.backgroundColor = "black"
                }
                return look
            },
        },
    },
    bars: {
    },
    upgrades: {
        11: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing I",
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Boosts chance points based on check back level. (x" + format(this.effect()) + ")"}},
            cost: new Decimal(5e14),
            currencyLocation() { return player.za },
            currencyInternalName: "chancePoints",
            currencyDisplayName: "Chance Points",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
            effect() {
                return player.cb.level.pow(0.2).div(4).add(1)
            },
        },    
        12: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing II",
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Boosts wheel points based on best chance points. (x" + format(this.effect()) + ")"}},
            cost: new Decimal(2e16),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
            effect() {
                return player.za.bestChancePoints.div(1e12).pow(0.15).div(10).add(1)
            },
        },    
        13: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing III",
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Reduce slot machine spin time by /3."}},
            cost: new Decimal(3e17),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
        },  
        14: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing IV",
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Chance point softcap start weakens chance point softcap. (^" + format(this.effect()) + ")"}},
            cost: new Decimal(5e18),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
            effect() {
                return Decimal.div(1, player.za.chancePointsSoftcapStart.plus(1).log10().div(55).add(1))
            },
        }, 
        15: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing V",
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Best chance points boost total chip gain. (x" + format(this.effect()) + ")"}},
            cost: new Decimal(4e21),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
            effect() {
                return player.za.bestChancePoints.div(1e16).pow(0.08).div(10).add(1)
            },
        }, 
        16: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing VI",
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Heads and and tails softcap start weaken heads and tails softcap. (^" + format(this.effect()[0]) + ", ^" + format(this.effect()[1]) + ")"}},
            cost: new Decimal(1e24),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
            effect() {
                return [Decimal.div(1, player.cf.headsSoftcapStart.plus(1).log10().div(40).add(1)), Decimal.div(1, player.cf.tailsSoftcapStart.plus(1).log10().div(40).add(1))]
            },
        }, 
        17: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing VII",
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Unlock some rather unique slot machine researches."}},
            cost: new Decimal(1e28),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
        }, 

        //check back blessings
        18: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing VIII",
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Check back level boosts check back XP gain. (x" + format(this.effect()) + ")"},
            cost: new Decimal(1e38),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
            effect() {
                return player.cb.level.pow(0.2).div(8).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        }, 
        19: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing IX",
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Ascension Shards boost Evolution Shard Chance. (x" + format(this.effect()) + ")"},
            cost: new Decimal(1e42),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
            effect() {
                return player.cbs.ascensionShards.pow(0.3).div(2).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        }, 
        20: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing X",
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Unlocks another XP button."},
            cost: new Decimal(1e60),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
        },
        21: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing XI",
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Ascension rituals completed in under 2 minutes yield an extra Shard of Ascension."},
            cost: new Decimal(1e300),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
        },
        22: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:65px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:black'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Blessing XII",
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Unlock a new zone in space battle. [COMING SOON]"},
            cost: new Decimal("1e500"),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "black", borderWidth: "3px", borderColor: "#064666", outline: "3px solid #c6f7ff", width: "200px", maxHeight: "125px", minHeight: "125px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#bf8f8f" : look.backgroundColor = "#064666"
                return look
            },
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.66666666).mul(0.05).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back XP Factor I"
            },
            display() {
                return 'which are boosting XP gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "linear-gradient(105deg, #474747ff 0%, #8d8d8dff 74%)", margin: "6px" },
            progressColor: "#3383ab",
        },
        12: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.66666666).mul(0.05).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back XP Factor II"
            },
            display() {
                return 'which are boosting XP gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "linear-gradient(105deg, #474747ff 0%, #8d8d8dff 74%)", margin: "6px" },
            progressColor: "#3383ab",
        },
        13: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(3.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.66666666).mul(0.05).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back XP Factor III"
            },
            display() {
                return 'which are boosting XP gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Chance Points'
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "linear-gradient(105deg, #474747ff 0%, #8d8d8dff 74%)", margin: "6px" },
            progressColor: "#3383ab",
        },
        14: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(333) },
            currency() { return player.cf.heads },
            pay(amt) { player.cf.heads = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back XPBoost Factor I"
            },
            display() {
                return 'which are boosting XPBoost gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Heads'
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)", margin: "6px" },
            progressColor: "#3383ab",
        },
        15: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(333) },
            currency() { return player.cf.tails },
            pay(amt) { player.cf.tails = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back XPBoost Factor II"
            },
            display() {
                return 'which are boosting XPBoost gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Tails'
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)", margin: "6px" },
            progressColor: "#3383ab",
        },
        16: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(333) },
            currency() { return player.wof.wheelPoints },
            pay(amt) { player.wof.wheelPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back XPBoost Factor III"
            },
            display() {
                return 'which are boosting XPBoost gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)", margin: "6px" },
            progressColor: "#3383ab",
        },
        17: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sm.chips[0] },
            pay(amt) { player.sm.chips[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.03).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Tickspeed Factor I"
            },
            display() {
                return 'which are boosting check back tickspeed by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Red Chips'
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "#ff7070ff", margin: "6px" },
            progressColor: "#3383ab",
        },
        18: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sm.chips[1] },
            pay(amt) { player.sm.chips[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.03).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Tickspeed Factor II"
            },
            display() {
                return 'which are boosting check back tickspeed by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Blue Chips'
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "#7970ffff", margin: "6px" },
            progressColor: "#3383ab",
        },
        19: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sm.chips[2] },
            pay(amt) { player.sm.chips[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.03).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Tickspeed Factor III"
            },
            display() {
                return 'which are boosting check back tickspeed by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Yellow Chips'
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "#fffd70ff", margin: "6px" },
            progressColor: "#3383ab",
        },
        21: {
            costBase() { return new Decimal(1e3) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(33) },
            currency() { return player.cb.evolutionShards },
            pay(amt) { player.cb.evolutionShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Pet Point Factor I"
            },
            display() {
                return 'which are boosting pet point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "linear-gradient(45deg, #5d51ff 0%, #af51ff 100%)", margin: "6px" },
            progressColor: "#3383ab",
        },
        22: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(33) },
            currency() { return player.cb.paragonShards },
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Pet Point Factor II"
            },
            display() {
                return 'which are boosting pet point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "linear-gradient(45deg, #1ba861 0%, #89ee30 33%, #e79c44 67%, #cb1816 100%)", margin: "6px" },
            progressColor: "#3383ab",
        },
        23: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.04) },
            purchaseLimit() { return new Decimal(33) },
            currency() { return player.cbs.ascensionShards },
            pay(amt) { player.cbs.ascensionShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Pet Point Factor III"
            },
            display() {
                return 'which are boosting pet point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Ascension Shards'
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
            style: { width: '248px', height: '150px', color: "black", border: "3px solid", outline: "3px solid #064666", borderColor: "#032333", background: "linear-gradient(45deg, #c6f7ff 0%, #d5abff 100%)", margin: "6px" },
            progressColor: "#3383ab",
        },
        101: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[6] },
            pay(amt) { player.cof.coreFragments[6] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).add(1)},
            unlocked() { return player.cbs.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Temporal Pylon Factor I"
            },
            display() {
                return 'which are boosting temporal pylon energy by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '250px', height: '150px', color: "white", backgroundColor: "#2a6378", backgroundImage: "linear-gradient(120deg, #2a6378 0%, #09366e 100%)" }
        },
        102: {
            costBase() { return new Decimal(1500) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[6] },
            pay(amt) { player.cof.coreFragments[6] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).add(1)},
            unlocked() { return player.cbs.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Temporal Pylon Factor II"
            },
            display() {
                return 'which are boosting temporal pylon energy by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '250px', height: '150px', color: "white", backgroundColor: "#2a6378", backgroundImage: "linear-gradient(120deg, #2a6378 0%, #09366e 100%)" }
        },
        103: {
            costBase() { return new Decimal(5000) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[6] },
            pay(amt) { player.cof.coreFragments[6] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).add(1)},
            unlocked() { return player.cbs.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Temporal Pylon Factor III"
            },
            display() {
                return 'which are boosting temporal pylon energy by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '250px', height: '150px', color: "white", backgroundColor: "#2a6378", backgroundImage: "linear-gradient(120deg, #2a6378 0%, #09366e 100%)" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        shipSelection: {
            "shipSelectionProgression": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#4f1818"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    return [
                        ["style-row", [
                            ["category-button", ["Space", "shipSelectionProgression", "space"], {width: player.ir.inBattle ? "398.5px" : "264px", height: "50px", background: "#37078f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#3383ab7f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#3383ab"}],
                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "265px", height: "50px", background: "#00003f", borderRadius: "0"}],
                            ], {display: hasUpgrade("le", 201) ? "none !important" : ""}],
                            ["style-row", [
                                ["category-button", ["Blood", "shipSelectionProgression", "blood"], {width: player.ir.inBattle ? "398.5px" : "265px", height: "50px", background: "#4f1818", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#3383ab7f"), borderRadius: "0"}],
                            ], {display: hasUpgrade("le", 201) ? "" : "none !important"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                        ["style-row", [], {background: player.ir.inBattle ? player.ir.primaryColor : "#3383ab", width: player.ir.inBattle ? "800px" : "532px", height: "3px"}],
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
                            ["category-button", ["Final Stats", "shipSelectionStats", "finalStats"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#3383ab7f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#3383ab"}],
                            ["category-button", ["Base Stats", "shipSelectionStats", "baseStats"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#3383ab7f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#3383ab"}],
                            ["category-button", ["Upgrade Effects", "shipSelectionStats", "upgradeEffects"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#3383ab7f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#3383ab"}],
                            ["category-button", ["Upgrade Counts", "shipSelectionStats", "upgradeCounts"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#3383ab7f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#3383ab"}],
                            
                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.secondaryColor + "7f", borderRadius: "0"}],
                            ], {display: player.ev.evolutionsUnlocked[13] ? "none !important" : ""}],
                            ["style-row", [
                                ["category-button", ["Salvaged Upgrades", "shipSelectionStats", "salvagedUpgrades"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#3383ab7f"), borderRadius: "0"}],
                            ], {display: player.ev.evolutionsUnlocked[13] ? "" : "none !important"}],

                        ], {width: player.ir.inBattle ? "800px" : "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                        ["style-row", [], {background: player.ir.inBattle ? player.ir.primaryColor : "#3383ab", width: player.ir.inBattle ? "800px" : "532px", height: "3px"}],
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
                    ["style-row", [], {width: "800px", height: "3px", background: "#3383ab"}],
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
                    ["style-row", [], {width: "800px", height: "3px", background: "#3383ab"}],
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
                            ["style-row", [], {background: "#3383ab", width: "532px", height: "3px"}],
                            ["style-row", [
                                ["category-button", ["Progression", "shipSelection", "shipSelectionProgression"], {width: "264px", height: "50px", background: "#00005f", border: "3px solid #3383ab7f", borderRadius: "0"}],
                                ["style-row", [], {width: "3px", height: "50px", backgroundColor: "#3383ab"}],
                                ["category-button", ["Stats", "shipSelection", "shipSelectionStats"], {width: "265px", height: "50px", background: "#00005f", border: "3px solid #3383ab7f", borderRadius: "0"}],
                            ], {width: "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                            ["style-row", [], {background: "#3383ab", width: "532px", height: "3px"}],
                            ["buttonless-microtabs", "shipSelection", {borderWidth: "0"}],
                        ], {borderRight: "3px solid #3383ab", height: "579px"}],
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
                    ["style-row", [], {width: "800px", height: "3px", background: "#3383ab"}],
                    ["style-row", [
                        ["top-column", [
                            ["style-row", [
                                ["category-button", ["Space Junk Upgrades", "automation", "spaceJunkUpgrades"], {width: "264px", height: "50px", background: "#00005f", border: "3px solid #3383ab7f", borderRadius: "0"}],
                                ["style-row", [], {width: "3px", height: "50px", backgroundColor: "#3383ab"}],
                                ["category-button", [() => {return "Ship Upgrades<br><small>(Reroll in " + formatSimpleTime(player.ir.shipUpgradeRerollTimer) + ")"}, "automation", "shipUpgrades"], {width: "264px", height: "50px", background: "#00005f", border: "3px solid #3383ab7f", borderRadius: "0"}],
                                //["style-row", [], {width: "3px", height: "50px", backgroundColor: "#3383ab"}],
                                /*["style-row", [
                                    ["style-row", [
                                        ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                    ], {width: "176px", height: "50px", background: "#00003f", borderRadius: "0"}],
                                ], () => {return {display: hasUpgrade("ir", 302) ? "none !important" : ""}}],
                                ["style-row", [
                                    ["category-button", ["Resource Extraction", "automation", "resourceExtraction"], {width: "176px", height: "50px", background: "#00005f", border: "3px solid #3383ab7f", borderRadius: "0"}],
                                ], () => {return {display: hasUpgrade("ir", 302) ? "" : "none !important"}}],*/
                            ], {}],

                            ["style-row", [], {background: "#3383ab", width: "532px", height: "3px"}],
                            ["buttonless-microtabs", "automation", {borderWidth: "0"}],
                        ], {background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", borderRight: "3px solid #3383ab", width: "532px", height: "579px"}],
                        
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
        stuff: {
            "Ritual": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return !player.ir.inBattle },
                content: [
                    ["buttonless-microtabs", "stuff2", { 'border-width': '0px' }],
                ]
            },
            "Check Back Factors": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["row", [ ["rounded-ex-buyable", 11],["rounded-ex-buyable", 12],["rounded-ex-buyable", 13]]],
                        ["row", [ ["rounded-ex-buyable", 14],["rounded-ex-buyable", 15],["rounded-ex-buyable", 16]]],
                        ["row", [ ["rounded-ex-buyable", 17],["rounded-ex-buyable", 18],["rounded-ex-buyable", 19]]],
                        ["row", [ ["rounded-ex-buyable", 21],["rounded-ex-buyable", 22],["rounded-ex-buyable", 23]]],
                    ], {width: "800px", background: "linear-gradient(180deg, #064666 0%, #032333 50%, #064666 100%)", border: "3px solid #3383ab", borderRadius: "22px"}],
                    ["blank", "25px"],
                ]
            },
            "Pylon": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return !player.ir.inBattle && player.cbs.shrineReactivated },
                content: [
                    ["blank", "25px"],
                    ["left-row", [
                        ["tooltip-row", [
                            ["raw-html", "<img src='resources/fragments/temporalFragment.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                            ["raw-html", () => { return formatWhole(player.cof.coreFragments[6])}, {width: "103px", height: "50px", color: "white", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                            ["raw-html", "<div class='bottomTooltip'>Temporal Core Fragments</div>"],
                        ], {width: "158px", height: "50px",}],
                    ], {width: "158px", height: "50px", background: "black", border: "2px solid #c6f7ff", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                    ["clickable", 14],
                    ["raw-html", () => { return player.cbs.pylonBuilt ? "You will earn pylon energy in " + formatTime(player.cbs.energyTimerMax.sub(player.cbs.energyTimer)) + "." : "" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return player.cbs.pylonBuilt ? "You have <h3>" + format(player.cbs.pylonEnergy) + "/" + format(player.cbs.pylonEnergyMax) +  "</h3> temporal pylon energy (+" + format(player.cbs.pylonEnergyToGet) + ")." : "" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["raw-html", () => {return player.cbs.pylonBuilt ? "Boosts CB tickspeed by x" + format(player.cbs.pylonEnergyEffect) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.cbs.pylonBuilt ? "Boosts pet point gain by x" + format(player.cbs.pylonEnergyEffect2) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.cbs.pylonBuilt ? "Boosts crate roll chance by x" + format(player.cbs.pylonEnergyEffect3) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.cbs.pylonBuilt ? "Boosts base paradox pylon energy gain by +" + format(player.cbs.pylonEnergyEffect4, 3) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.cbs.pylonBuilt ? "Passive effect: Boosts pollinator gain by ^" + format(player.cbs.pylonPassiveEffect) + " (Based on pollinators)" : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.cbs.pylonBuilt ? "Your temporal pylon is tier " + formatWhole(player.cbs.pylonTier) + ", which boosts effective pylon energy and the passive effect by ^" + format(player.cbs.pylonTierEffect) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["rounded-ex-buyable", 101], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 102], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 103],]], 
                    ["blank", "10px"],
                    ["clickable", 15],
                ],
            },
            "Battle": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return false },
                content() {

                    let container = []
                    switch (player.ir.menu) {
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
                    ["raw-html", function () { return "why did you refresh the page... now you have to wait another long interval of time." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["layer-proxy", ["ir", [["clickable", 12]]]],
                ]
            },
            "Lose": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Ritual failed." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["layer-proxy", ["ir", [["clickable", 12]]]],
                ]
            },
        },
        stuff2: {
            "ships": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#064666"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["category-button", ["Ships", "stuff2", "ships"], {width: "398.5px", height: "40px", background: "#064666", border: "3px solid #3383ab7f", borderRadius: "13px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#3383ab"}],
                        ["category-button", ["Ritual", "stuff2", "stages"], {width: "398.5px", height: "40px", background: "#064666", border: "3px solid #3383ab7f", borderRadius: "0 13px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid #3383ab", borderRadius: "16px 16px 0 0", marginBottom: "-3px"}],
                    ["top-column", [
                        ["style-row", [
                            ["category-button", ["Levelables", "ships", "levelables"], {width: "265px", height: "40px", background: "#05354d", border: "3px solid #3383ab7f", borderRadius: "10"}],
                            ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#3383ab"}],

                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "264px", height: "40px", background: "#00003f", borderRadius: "0"}],
                            ], () => {return {display: hasMilestone("spaceZone1", 11) ? "none !important" : ""}}],
                            ["style-row", [
                                ["category-button", ["Saves", "ships", "saves"], {width: "264px", height: "40px", background: "#05354d", border: "3px solid #3383ab7f", borderRadius: "0"}],
                            ], () => {return {display: hasMilestone("spaceZone1", 11) ? "" : "none !important"}}],

                            ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#3383ab"}],

                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "265px", height: "40px", background: "#00003f", borderRadius: "0"}],
                            ], () => {return {display: player.ev.evolutionsUnlocked[13] ? "none !important" : ""}}],
                            ["style-row", [
                                ["category-button", ["Space Junk", "ships", "automation"], {width: "265px", height: "40px", background: "#05354d", border: "3px solid #3383ab7f", borderRadius: "0"}],
                            ], () => {return {display: player.ev.evolutionsUnlocked[13] ? "" : "none !important"}}],

                        ], {width: "800px", height: "40px", borderBottom: "3px solid #3383ab", borderRadius: "0"}],
                        ["style-column", [
                            ["buttonless-microtabs", "ships", {borderWidth: "0"}],
                        ], {width: "800px", height: "677px", borderRadius: "0"}],
                    ], {width: "800px", height: "720px", background: "radial-gradient(circle, #032333 0%, #064666 200%)", border: "3px solid #3383ab", borderRadius: "0"}],
                    ["blank", "25px"],
                ],
            },
            "stages": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#064666"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["category-button", ["Ships", "stuff2", "ships"], {width: "398.5px", height: "40px", background: "#064666", border: "3px solid #3383ab7f", borderRadius: "13px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#3383ab"}],
                        ["category-button", ["Ritual", "stuff2", "stages"], {width: "398.5px", height: "40px", background: "#064666", border: "3px solid #3383ab7f", borderRadius: "0 13px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid #3383ab", borderRadius: "16px 16px 0 0", marginBottom: "-3px"}],
                    ["style-row", [
                    ["blank", "25px"],
                    
                    // UPGRADES
                    ["style-row", [
                        createShrineUpgrade("upgrade", 11, [0, -2]),
                        createShrineUpgrade("upgrade", 12, [1, -2]),
                        createShrineUpgrade("upgrade", 13, [1.3, -1]),
                        createShrineUpgrade("upgrade", 14, [1.3, 0]),
                        createShrineUpgrade("upgrade", 15, [1.3, 1]),
                        createShrineUpgrade("upgrade", 16, [1, 2]),
                        createShrineUpgrade("upgrade", 17, [0, 2]),
                        createShrineUpgrade("upgrade", 18, [-1, 2]),
                        createShrineUpgrade("upgrade", 19, [-1.3, 1]),
                        createShrineUpgrade("upgrade", 20, [-1.3, 0]),
                        createShrineUpgrade("upgrade", 21, [-1.3, -1]),
                        createShrineUpgrade("upgrade", 22, [-1, -2]),
                        ["style-row", [
                            ["left-row", [
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.cb.evolutionShards)}, {width: "95px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "150px", height: "50px", borderRight: "3px solid #c6f7ff"}],
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.cb.paragonShards) }, {width: "95px", height: "50px", color: "#4c64ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "150px", height: "50px"}],
                            ], {width: "300px", height: "50px", backgroundColor: "black", border: "3px solid #c6f7ff", borderRadius: "10px", userSelect: "none"}],
                            ["blank", "6px"],
                            ["clickable", "enter"],
                            ["blank", "6px"],
                            ["left-row", [
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/ascensionShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.cbs.ascensionShards)}, {width: "245px", height: "50px", color: "#c6f7ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px", fontSize: "24px"}],
                                ], {width: "300px", height: "50px"}],
                            ], {width: "300px", height: "50px", backgroundColor: "black", border: "3px solid #c6f7ff", borderRadius: "10px", userSelect: "none"}],
                            ["blank", () => {return player.cbs.shrineReactivated ? "0px" : "12px"}],
                            ["clickable", 13],
                        ], {width: "0", height: "0"}]
                    ], {background: "radial-gradient(circle, #c6f7ff 0%, #00000000 70%)", width: "640px", height: "640px", flexFlow: "column"}],
                    ["blank", "25px"],
                        
                    ], {width: "800px", height: "720px", background: "radial-gradient(circle, #064666 50%, black 100%)", border: "3px solid #3383ab", borderRadius: "0"}],
                    ["blank", "25px"],
                ],
            },
        },
    },
    tabFormat: [
        ["style-column", [
            ["raw-html", function () { return !player.ir.inBattle ? "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
            ["raw-html", () => { return !player.ir.inBattle && player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ], () => {
            return {display: arena ? "none !important" : ""}
        }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 19) && !player.sma.inStarmetalChallenge}
})