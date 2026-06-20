
const createClickableConnection = function(id_1, id_2, color) {
    return ["style-row", [], {
        position: "relative",
            left: () => {return ((layers.cbs.clickables[id_1].xPos + layers.cbs.clickables[id_2].xPos) / 2) - 50 + "px"},
            top: () => {return ((layers.cbs.clickables[id_1].yPos + layers.cbs.clickables[id_2].yPos) / 2) + "px"},
            transform: () => {return "rotate(" + Math.atan2(layers.cbs.clickables[id_2].yPos - layers.cbs.clickables[id_1].yPos, layers.cbs.clickables[id_2].xPos - layers.cbs.clickables[id_1].xPos) + "rad)"},
            width: () => {return Math.sqrt(Math.pow(layers.cbs.clickables[id_2].yPos - layers.cbs.clickables[id_1].yPos, 2) + Math.pow(layers.cbs.clickables[id_2].xPos - layers.cbs.clickables[id_1].xPos, 2)) + "px"},
            height: "0px", border: "2px solid " + color, borderBottom: "0", marginLeft: "100px", marginTop: "-2px"
        }]
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
            background: "linear-gradient(180deg, #094599 0%, #062a5eff 50%, #094599 100%)",
            "background-origin": "border-box",
            "border-color": "#3466acff",
            "color": "#3466acff",
            borderRadius: "4px",
            transform: "translateX(-50px)",
        }
    },
    tooltip: "Check Back Shrine",
    color: "#3466acff",
    branches: ["sm",],
    update(delta) {
        if (arena == null && player.subtabs["cbs"]['stuff'] == 'Battle') {
            player.subtabs["cbs"]['stuff'] = "Refresh Page :(";
        }

        if (cutsceneActive && player.tab == "cbs")
        {
            player.ir.shipHealth = player.ir.shipHealthMax
        }

        if (!player.cbs.ritualSpiritActive && player.ir.inBattle && player.tab == "cbs" && player.ir.shipHealth.gt(0))
        {
            player.cbs.ascensionShards = player.cbs.ascensionShards.add(1)

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
            player.ir.battleLevel = new Decimal(0)

            player.cbs.inBattle = false
            player.cbs.ritualSpiritActive = false

            if (player.uni.U1.paused == true) pauseUniverseAll(["DS", "A2"], "unpause", true) // The if statement is a poor method to prevent checkback resource dupe

            screenFlash("Ritual Success.\nYou have earned a Shard of Ascension.", 3000)
        }

        player.cbs.ritualCosts[0] = Decimal.mul(player.cbs.ascensionShards.pow(1.25).mul(0.2).add(1), 50).floor()
        player.cbs.ritualCosts[1] = Decimal.mul(player.cbs.ascensionShards.pow(1.125).mul(0.15).add(1), 15).floor()

        player.cbs.ritualSpiritCooldownMax = new Decimal(21600)
        player.cbs.ritualSpiritCooldown = player.cbs.ritualSpiritCooldown.sub(delta)


        //pylon
        player.cbs.pylonEnergyMax = Decimal.pow(1e5, player.cbs.pylonTier.pow(0.7))

        if (player.cbs.pylonBuilt) {
            player.cbs.pylonEnergyToGet = new Decimal(1)
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(buyableEffect("cbs", 101))
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(buyableEffect("cbs", 102))
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(buyableEffect("cbs", 103))
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(player.n.pylonEnergyEffect3)
            player.cbs.pylonEnergyToGet = player.cbs.pylonEnergyToGet.mul(levelableEffect("pu", 215)[1])

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
        11: {
            title() { return player.cbs.ritualSpiritCooldown.lte(0) ? "<h2>Ritual<br><h4>Cost: " + formatWhole(player.cbs.ritualCosts[0]) + " Evolution Shards<br><h4>" + formatWhole(player.cbs.ritualCosts[1]) + " Paragon Shards" : "<h2>Check back in " + formatTime(player.cbs.ritualSpiritCooldown)},
            canClick() { return player.cb.evolutionShards.gte(player.cbs.ritualCosts[0]) && player.cb.paragonShards.gte(player.cbs.ritualCosts[1]) && player.cbs.ritualSpiritCooldown.lte(0) }, //change this eventually
            unlocked() { return true },
            tooltip() { return "Gives +4 movement speed, +2 HP/sec, and 40% damage reduction." },
            onClick() {
                player.ir.inBattle = true
                options.fullscreen = true
                player.subtabs["cbs"]['stuff'] = 'Battle'

                arena = new RitualArena(1200, 600);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                player.ir.shipHealth = player.ir.shipHealthMax
                let regen = 0
                if (hasUpgrade("ir", 14)) regen += 0.5
                regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
                if (regen > 0) arena.upgradeEffects.hpRegen = regen / 60

                arena.upgradeEffects.attackDamage *= levelableEffect("ir", player.ir.shipType)[2]
                arena.upgradeEffects.moveSpeed += 4
                arena.upgradeEffects.hpRegen += 2 / 60
                summonSpirit();

                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.cbs.ritualCosts[0])
                player.cb.paragonShards = player.cb.paragonShards.sub(player.cbs.ritualCosts[1])

                player.cbs.ritualSpiritCooldown = player.cbs.ritualSpiritCooldownMax

                pauseUniverseAll(["DS", "A2"], "pause", true)
            },
            style: { width: '300px', "min-height": '100px', color: "white" },
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
                player.ir.battleLevel = new Decimal(0)

                player.cbs.inBattle = false
                player.cbs.ritualSpiritActive = false

                pauseUniverseAll(["DS", "A2"], "unpause", true)
            },
            style: {width: "200px", minHeight: '100px', color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },
        13: {
            title() { return "<h2>Reactivate the Check Back Shrine<br>Cost: 1 Shard of Ascension" },
            canClick() { return player.cbs.ascensionShards.gte(1) },
            unlocked() { return !player.cbs.shrineReactivated},
            onClick() {
                player.cbs.ascensionShards = player.cbs.ascensionShards.sub(1)

                player.cbs.shrineReactivated = true
            },
            style: {width: "600px", minHeight: "200px", color: "#1b110eff", backgroundImage: "linear-gradient(180deg, #094599 0%, #062a5eff 50%, #094599 100%)", border: "3px solid rgba(0,0,0,0.5)", color: "#c6f7ff", borderRadius: "15px"},
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
            style: {width: "600px", minHeight: "200px", color: "#1b110eff", backgroundImage: "linear-gradient(180deg, #094599 0%, #062a5eff 50%, #094599 100%)", border: "3px solid rgba(0,0,0,0.5)", color: "#c6f7ff", borderRadius: "15px"},
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
            title() { return "<h2>Blessings II" },
            canClick() { return player.cbs.shrineTab != 1 },
            unlocked() { return true },
            onClick() { player.cbs.shrineTab = 1 },
            style() {
                let look = {width: "203px", minHeight: "50px", color: "#fff", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0px"}
                if (this.canClick()) {
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
        101: {
            title() { return "<h2>1</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 1 },
            xPos: 75,
            yPos: -129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        102: {
            title() { return "<h2>2</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 2 },
            xPos: 129.903810568,
            yPos: -75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        103: {
            title() { return "<h2>3</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 3 },
            xPos: 150,
            yPos: 0,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        104: {
            title() { return "<h2>4</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 4 },
            xPos: 129.903810568,
            yPos: 75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        105: {
            title() { return "<h2>5</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 5 },
            xPos: 75,
            yPos: 129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        106: {
            title() { return "<h2>6</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 6 },
            xPos: 0,
            yPos: 150,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        107: {
            title() { return "<h2>7</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 7 },
            xPos: -75,
            yPos: 129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        108: {
            title() { return "<h2>8</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 8 },
            xPos: -129.903810568,
            yPos: 75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        109: {
            title() { return "<h2>9</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 9 },
            xPos: -150,
            yPos: 0,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        110: {
            title() { return "<h2>10</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 10 },
            xPos: -129.903810568,
            yPos: -75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        111: {
            title() { return "<h2>11</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 11 },
            xPos: -75,
            yPos: -129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        112: {
            title() { return "<h2>12</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() { player.cbs.blessing1Selection = 12 },
            xPos: 0,
            yPos: -150,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "#c6f7ff", border: "3px solid #c6f7ff", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "#c6f7ff"
                    look.color = "#062a5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #094599 0%, #062a5e 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        113: {
            title() { return "<h2>13</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: 75,
            yPos: -129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        114: {
            title() { return "<h2>14</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: 129.903810568,
            yPos: -75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        115: {
            title() { return "<h2>15</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: 150,
            yPos: 0,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        116: {
            title() { return "<h2>16</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: 129.903810568,
            yPos: 75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        117: {
            title() { return "<h2>17</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: 75,
            yPos: 129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        118: {
            title() { return "<h2>18</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: 0,
            yPos: 150,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        119: {
            title() { return "<h2>19</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: -75,
            yPos: 129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        120: {
            title() { return "<h2>20</h2>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: -129.903810568,
            yPos: 75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        121: {
            title() { return "<h2>21</h2>" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: -150,
            yPos: 0,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        122: {
            title() { return "<h2>22</h2>" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: -129.903810568,
            yPos: -75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        123: {
            title() { return "<h2>23</h2>" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: -75,
            yPos: -129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },
        124: {
            title() { return "<h2>24</h2>" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                
            },
            xPos: 0,
            yPos: -150,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", color: "white", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #3466ac 0%, #203f6b 70%)"
                } else {
                    look.background = "black"
                    look.color = "#637c80"
                    look.border = "3px solid #637c80"
                }
                return look
            },
        },

        201: {
            title() { return "I" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 1 },
            xPos: 75,
            yPos: -129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #808080 0%, #5e5e5e 70%)"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        202: {
            title() { return "II" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 2 },
            xPos: 129.903810568,
            yPos: -75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        203: {
            title() { return "III" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 3 },
            xPos: 150,
            yPos: 0,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.background = "#ff7070"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        204: {
            title() { return "IV" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 4 },
            xPos: 129.903810568,
            yPos: 75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "linear-gradient(45deg, #5d51ff 0%, #af51ff 100%)"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        205: {
            title() { return "V" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 5 },
            xPos: 75,
            yPos: 129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #808080 0%, #5e5e5e 70%)"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        206: {
            title() { return "VI" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 6 },
            xPos: 0,
            yPos: 150,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        207: {
            title() { return "VII" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 7 },
            xPos: -75,
            yPos: 129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.background = "#7970ff"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        208: {
            title() { return "VIII" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 8 },
            xPos: -129.903810568,
            yPos: 75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "linear-gradient(45deg, #1ba861 0%, #89ee30 33%, #e79c44 67%, #cb1816 100%)"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        209: {
            title() { return "IX" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 9 },
            xPos: -150,
            yPos: 0,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "radial-gradient(circle, #808080 0%, #5e5e5e 70%)"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        210: {
            title() { return "X" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 10 },
            xPos: -129.903810568,
            yPos: -75,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        211: {
            title() { return "XI" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 11 },
            xPos: -75,
            yPos: -129.903810568,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.background = "#fffd70"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
        212: {
            title() { return "XII" },
            canClick() { return hasUpgrade(this.layer, this.id - 190) },
            unlocked() { return true },
            onClick() { player.cbs.factorSelection = 12 },
            xPos: 0,
            yPos: -150,
            style() {
                let look = {margin: "-28px", left: this.xPos + "px", top: this.yPos + "px", width: "50px", minHeight: "50px", maxHeight: "50px", border: "3px solid white", borderRadius: "25px", position: "relative"}
                if (hasUpgrade(this.layer, this.id - 90)) {
                    look.background = "white"
                    look.color = "#5e5e5e"
                } else if (this.canClick()) {
                    look.backgroundImage = "linear-gradient(45deg, #c6f7ff 0%, #d5abff 100%)"
                    look.border = "3px solid black"
                } else {
                    look.background = "black"
                    look.color = "#808080"
                    look.border = "3px solid #808080"
                }
                return look
            },
        },
    },
    bars: {
    },
    upgrades: {
        11: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return true },
            description() {{return "Boosts chance points based on check back level. (x" + format(this.effect()) + ")"}},
            cost: new Decimal(5e14),
            currencyLocation() { return player.za },
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
            effect() {
                return player.cb.level.pow(0.2).div(4).add(1)
            },
        },    
        12: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Boosts wheel points based on best chance points. (x" + format(this.effect()) + ")"}},
            cost: new Decimal(2e16),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
            effect() {
                return player.za.bestChancePoints.div(1e12).pow(0.15).div(10).add(1)
            },
        },    
        13: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Reduce slot machine spin time by /3."}},
            cost: new Decimal(3e17),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
        },  
        14: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Chance point softcap start weakens chance point softcap. (^" + format(this.effect()) + ")"}},
            cost: new Decimal(5e18),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
            effect() {
                return Decimal.div(1, player.za.chancePointsSoftcapStart.plus(1).log10().div(55).add(1))
            },
        }, 
        15: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Best chance points boost total chip gain. (x" + format(this.effect()) + ")"}},
            cost: new Decimal(4e21),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
            effect() {
                return player.za.bestChancePoints.div(1e16).pow(0.08).div(10).add(1)
            },
        }, 
        16: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Heads and and tails softcap start weaken heads and tails softcap. (^" + format(this.effect()[0]) + ", ^" + format(this.effect()[1]) + ")"}},
            cost: new Decimal(1e24),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
            effect() {
                return [Decimal.div(1, player.cf.headsSoftcapStart.plus(1).log10().div(40).add(1)), Decimal.div(1, player.cf.tailsSoftcapStart.plus(1).log10().div(40).add(1))]
            },
        }, 
        17: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() {{return "Unlock some rather unique slot machine researches."}},
            cost: new Decimal(1e28),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
        }, 

        //check back blessings
        18: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Check back level boosts check back XP gain. (x" + format(this.effect()) + ")"},
            cost: new Decimal(1e38),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
            effect() {
                return player.cb.level.pow(0.2).div(8).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        }, 
        19: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Ascension Shards boost Evolution Shard Chance. (x" + format(this.effect()) + ")"},
            cost: new Decimal(1e42),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
            effect() {
                return player.cbs.ascensionShards.pow(0.3).div(2).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        }, 
        20: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Unlocks another XP button."},
            cost: new Decimal(1e60),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
        },
        21: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Ascension rituals completed in under 2 minutes yield an extra Shard of Ascension."},
            cost: new Decimal(1e300),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
        },
        22: {
            fullDisplay() {return hasUpgrade(this.layer, this.id) ? "BOUGHT!" : "BUY"},
            unlocked() { return player.cbs.shrineReactivated },
            description() { return "Unlock a new zone in space battle. [COMING SOON]"},
            cost: new Decimal("1e500"),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style() {
                let look = {borderRadius: "10px", color: "white", fontSize: "20px", width: "300px", minHeight: "50px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#c6f7ff"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#062a5e"
                } else if (!canAffordUpgrade(this.layer, this.id)) {
                    look.backgroundColor =  "#361e1e"
                    look.border =  "3px solid #663737"
                    look.color =  "#c6f7ff"
                } else {
                    look.backgroundColor = "#3466ac"
                    look.border =  "3px solid #c6f7ff"
                    look.color =  "#c6f7ff"
                }
                return look
            },
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.05).add(1)},
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #474747ff 0%, #8d8d8dff 100%)" }
        },
        12: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(1.875) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.05).add(1)},
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #474747ff 0%, #8d8d8dff 100%)" }
        },
        13: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.za.chancePoints },
            pay(amt) { player.za.chancePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.05).add(1)},
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #474747ff 0%, #8d8d8dff 100%)" }
        },
        14: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(333) },
            currency() { return player.cf.heads },
            pay(amt) { player.cf.heads = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.55).mul(0.04).add(1)},
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, rgb(129, 112, 93) 0%, rgb(156, 93, 74) 100%)" }
        },
        15: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(333) },
            currency() { return player.cf.tails },
            pay(amt) { player.cf.tails = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.55).mul(0.04).add(1)},
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, rgb(129, 112, 93) 0%, rgb(156, 93, 74) 100%)" }
        },
        16: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(333) },
            currency() { return player.wof.wheelPoints },
            pay(amt) { player.wof.wheelPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.55).mul(0.04).add(1)},
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #144b34ff 0%, #3d8165ff 100%)" }
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
            style: { width: '275px', height: '150px', color: "black", backgroundColor: "#ff7070ff" }
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
            style: { width: '275px', height: '150px', color: "black", backgroundColor: "#7970ffff" }
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
            style: { width: '275px', height: '150px', color: "black", backgroundColor: "#fffd70ff" }
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
        stuff: {
            "Ritual": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                                                                    ["left-row", [
                    ["blank", "25px"],
                                ["tooltip-row", [
                ["raw-html", "<img src='resources/ascensionShard.png'style='width:75px;height:75px;margin:12.5px'></img>", {width: "100px", height: "100px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cbs.ascensionShards)}, {width: "95px", height: "100px", color: "#c6f7ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px", fontSize: "24px"}],
                ["raw-html", "<div class='bottomTooltip'>Shards of Ascension<hr><small>(Gained from ascension rituals)</small></div>"],
            ], {width: "700px", height: "100px"}],
        ], {width: "700px", height: "100px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px 10px 0px 0px", userSelect: "none"}],
                                                ["left-row", [
                    ["blank", "25px"],
                ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "348px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "350px", height: "50px", borderRight: "0px solid white"}],
        ], {width: "700px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "0px 0px 10px 10px", borderTop: "0px",  userSelect: "none"}],
                    ["blank", "25px"],
                    ["layer-proxy", ["ir", [
                    ["style-row", [
                    ["style-column", [
                    ["blank", "25px"],
                    ["layer-proxy", ["cbs", [["style-row", [["clickable", 11],],]]]],
                    ["blank", "5px"],
                ["raw-html", () => { return player.cbs.ascensionShards.gt(0) ? "<h5>Note from Dev: If you're worrying about having to fight this guy like a billion times, don't worry as there will be other ways to obtain ascension shards in the future." : ""}, { color: "#c6f7ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px", fontSize: "12px"}],
                    ["blank", "5px"],
                    ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2],], {width: '100px', height: '40px' }],
                            ]],
                    ], {width: "550px", height: "175px", backgroundImage: "linear-gradient(180deg, #205197ff 0%, #1c375cff 50%, #205197ff 100%)", border: "3px solid #6094ddff", borderRight: "3px solid #6094ddff", borderRadius: "2px 2px 0 0"}],
                    ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Ships", {color: "#6094ddff", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "541px", height: "40px", backgroundColor: "#205197ff", borderBottom: "3px solid #6094ddff",  borderLeft: "3px solid #6094ddff",  userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 1], ["levelable", 2],["levelable", 3],["levelable", 4],["levelable", 5],]],
                                ["row", [["levelable", 6], ["levelable", 7], ["levelable", 8], ["levelable", 9]]],
                            ], {width: "531px", height: "250px", backgroundColor: "#112138ff", borderLeft: "3px solid #6094ddff", padding: "5px"}],
                        ], {width: "556px", height: "220px" }],
                    ["blank", "25px"],
                        ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #6094ddff", backgroundColor: "#1c375cff", borderRadius: "15px 15px 15px 15px"}],
                ]]]
                ]
            },
            "Check Back Factors": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13],]],
                    ["row", [["ex-buyable", 14],["ex-buyable", 15],["ex-buyable", 16],]],
                    ["row", [["ex-buyable", 17],["ex-buyable", 18],["ex-buyable", 19],]],

                ]
            },
            "Shrine": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    
                    // REACTIVATE
                    ["clickable", 13],
                    
                    // SHARDS
                    ["style-row", [
                        ["left-row", [
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/evoShard.png'style='width:44px;height:44px;margin:0px;margin-top:3px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "147px", height: "100px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px", fontSize: "16px"}],
                                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
                            ], {width: "203px", height: "50px"}],
                            ["style-row", [], {background: "#094599", width: "3px", height: "50px"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/paragonShard.png'style='width:44px;height:44px;margin:0px;margin-top:3px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "147px", height: "100px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px", fontSize: "16px"}],
                                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
                            ], {width: "203px", height: "50px"}],
                            ["style-row", [], {background: "#094599", width: "3px", height: "50px"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/ascensionShard.png'style='width:44px;height:44px;margin:0px;margin-top:3px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatWhole(player.cbs.ascensionShards)}, {width: "147px", height: "100px", color: "#c6f7ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px", fontSize: "16px"}],
                                ["raw-html", "<div class='bottomTooltip'>Shards of Ascension<hr><small>(Gained from ascension rituals)</small></div>"],
                            ], {width: "203px", height: "50px"}],
                            ["style-row", [], {background: "#094599", width: "3px", height: "50px"}],
                            ["row", [
                                ["raw-html", "<img src='resources/fragments/temporalFragment.png'style='width:44px;height:44px;margin:0px;margin-top:3px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatWhole(player.cof.coreFragments[6])}, {width: "147px", height: "100px", color: "#6ba9bf", display: "inline-flex", alignItems: "center", paddingLeft: "5px", fontSize: "16px"}],
                            ], {width: "203px", height: "50px"}],
                        ], {width: "821px", height: "50px", backgroundColor: "black", borderRadius: "0px 0px 0px 0px", userSelect: "none"}],
                    ], {background: "#041d40", border: "3px solid #094599", borderRadius: "0px 0px 0px 0px", width: "821px", height: "50px"}],
                    
                    // TAB SELECTION
                    ["style-row", [
                        ["hoverless-clickable", 21],
                        ["style-row", [], {backgroundColor: "#094599", width: "3px", height: "50px"}],
                        ["hoverless-clickable", 22],
                        ["style-row", [], {backgroundColor: "#094599", width: "3px", height: "50px"}],
                        ["hoverless-clickable", 23], 
                        ["style-row", [], {backgroundColor: "#094599", width: "3px", height: "50px"}],
                        ["hoverless-clickable", 24], 
                    ], {background: "#041d40", border: "3px solid #094599", borderTop: "0px", borderRadius: "0px", width: "821px", height: "50px"}],
                    
                    // BLESSINGS I
                    ["style-row", [
                        ["style-row", [
                            ["style-row", [
                                createClickableConnection(101, 105, "#094599"),
                                createClickableConnection(102, 106, "#094599"),
                                createClickableConnection(103, 107, "#094599"),
                                createClickableConnection(104, 108, "#094599"),
                                createClickableConnection(105, 109, "#094599"),
                                createClickableConnection(106, 110, "#094599"),
                                createClickableConnection(107, 111, "#094599"),
                                createClickableConnection(108, 112, "#094599"),
                                createClickableConnection(109, 101, "#094599"),
                                createClickableConnection(110, 102, "#094599"),
                                createClickableConnection(111, 103, "#094599"),
                                createClickableConnection(112, 104, "#094599"),

                                createClickableConnection(101, 104, "#094599"),
                                createClickableConnection(102, 105, "#094599"),
                                createClickableConnection(103, 106, "#094599"),
                                createClickableConnection(104, 107, "#094599"),
                                createClickableConnection(105, 108, "#094599"),
                                createClickableConnection(106, 109, "#094599"),
                                createClickableConnection(107, 110, "#094599"),
                                createClickableConnection(108, 111, "#094599"),
                                createClickableConnection(109, 112, "#094599"),
                                createClickableConnection(110, 101, "#094599"),
                                createClickableConnection(111, 102, "#094599"),
                                createClickableConnection(112, 103, "#094599"),
                                ["style-row", [], {
                                    position: "relative",
                                    left: () => {return ((Math.cos(Date.now() / 6000 % 1000 * 2 * Math.PI)) * 50) + "px"},
                                    top: () => {return (Math.sin(Date.now() / 6000 % 1000 * 2 * Math.PI) * 50) + "px"},
                                    transform: () => {return "rotate(" + ((Date.now() / 6000 % 1000 * 2 * Math.PI)) + "rad"},
                                    width: "100px",
                                    height: "0px", background: "#c6f7ff", border: "1px solid #c6f7ff", margin: "-1px"
                                }],
                                ["style-row", [], {
                                    position: "relative",
                                    left: () => {return ((Math.cos(Date.now() / 72000 % 1000 * 2 * Math.PI)) * 25) + "px"},
                                    top: () => {return (Math.sin(Date.now() / 72000 % 1000 * 2 * Math.PI) * 25) + "px"},
                                    transform: () => {return "rotate(" + ((Date.now() / 72000 % 1000 * 2 * Math.PI)) + "rad"},
                                    width: "50px",
                                    height: "0px", background: "#094599", border: "2px solid #094599", margin: "-2px"
                                }],
                                ["style-row", [], {
                                    position: "relative",
                                    left: "0px",
                                    top: "0px",
                                    width: "0px",
                                    height: "0px", background: "#c6f7ff", border: "8px solid #c6f7ff", margin: "-8px", borderRadius: "8px"
                                }],
                            ], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 101]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 102]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 103]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 104]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 105]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 106]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 107]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 108]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 109]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 110]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 111]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 112]], {width: "0", height: "0"}],
                        ], {background: "radial-gradient(circle, #094599 -50%, #00000000 70%)", borderRadius: "200px", width: "360px", height: "360px", margin: "20px"}],
                        ["blank", "3px", {width: "3px"}],
                        ["style-row", [
                            ["style-column", [
                                ["blank", "6px"],
                                ["raw-html", () => {return "~ Blessing " + player.cbs.blessing1Selection + " ~"}, {color: "#c6f7ff", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "6px"],
                                ["style-row", [], {backgroundColor: "#094599", width: "360px", height: "3px"}],
                                ["blank", "6px"],
                                ["style-column", [
                                    ["raw-html", () => {return layers.cbs.upgrades[10 + player.cbs.blessing1Selection].description()}, {color: "#c6f7ff", fontSize: "16px", fontFamily: "monospace"}],
                                ], {width: "348px"}],
                                ["blank", "6px"],
                                ["style-row", [], {backgroundColor: "#094599", width: "360px", height: "3px"}],
                                ["blank", "15px"],
                                ["style-column", [
                                    ["raw-html", () => {return "Costs " + format(layers.cbs.upgrades[10 + player.cbs.blessing1Selection].cost) + " Chance Points"}, {color: "#c6f7ff", fontSize: "16px", fontFamily: "monospace"}],
                                ], {width: "348px"}],
                                ["blank", "6px"],
                                ["upgrade", () => {return 10 + player.cbs.blessing1Selection}],
                            ]]
                        ], {background: "radial-gradient(circle, #094599 0%, #062a5e 100%)", border: "3px solid #094599", borderRadius: "10px", width: "360px", height: "360px", margin: "20px"}],
                    ], () => {
                        return {background: "#041d40", border: "3px solid #094599", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "821px", height: "412px", display: player.cbs.shrineTab == 0 ? "" : "none !important"}
                    }],

                    // BLESSINGS II
                    ["style-row", [
                        ["style-row", [
                            ["style-row", [
                                createClickableConnection(113, 117, "#3466ac"),
                                createClickableConnection(114, 118, "#3466ac"),
                                createClickableConnection(115, 119, "#3466ac"),
                                createClickableConnection(116, 120, "#3466ac"),
                                createClickableConnection(117, 121, "#3466ac"),
                                createClickableConnection(118, 122, "#3466ac"),
                                createClickableConnection(119, 123, "#3466ac"),
                                createClickableConnection(120, 124, "#3466ac"),
                                createClickableConnection(121, 113, "#3466ac"),
                                createClickableConnection(122, 114, "#3466ac"),
                                createClickableConnection(123, 115, "#3466ac"),
                                createClickableConnection(124, 116, "#3466ac"),

                                createClickableConnection(101, 104, "#3466ac"),
                                createClickableConnection(102, 105, "#3466ac"),
                                createClickableConnection(103, 106, "#3466ac"),
                                createClickableConnection(104, 107, "#3466ac"),
                                createClickableConnection(105, 108, "#3466ac"),
                                createClickableConnection(106, 109, "#3466ac"),
                                createClickableConnection(107, 110, "#3466ac"),
                                createClickableConnection(108, 111, "#3466ac"),
                                createClickableConnection(109, 112, "#3466ac"),
                                createClickableConnection(110, 101, "#3466ac"),
                                createClickableConnection(111, 102, "#3466ac"),
                                createClickableConnection(112, 103, "#3466ac"),
                                ["style-row", [], {
                                    position: "relative",
                                    left: () => {return ((Math.cos(Date.now() / 6000 % 1000 * 2 * Math.PI)) * 50) + "px"},
                                    top: () => {return (Math.sin(Date.now() / 6000 % 1000 * 2 * Math.PI) * 50) + "px"},
                                    transform: () => {return "rotate(" + ((Date.now() / 6000 % 1000 * 2 * Math.PI)) + "rad"},
                                    width: "100px",
                                    height: "0px", background: "#3466ac", border: "1px solid #3466ac", margin: "-1px"
                                }],
                                ["style-row", [], {
                                    position: "relative",
                                    left: () => {return ((Math.cos(Date.now() / 72000 % 1000 * 2 * Math.PI)) * 25) + "px"},
                                    top: () => {return (Math.sin(Date.now() / 72000 % 1000 * 2 * Math.PI) * 25) + "px"},
                                    transform: () => {return "rotate(" + ((Date.now() / 72000 % 1000 * 2 * Math.PI)) + "rad"},
                                    width: "50px",
                                    height: "0px", background: "#c6f7ff", border: "2px solid #c6f7ff", margin: "-2px"
                                }],
                                ["style-row", [], {
                                    position: "relative",
                                    left: "0px",
                                    top: "0px",
                                    width: "0px",
                                    height: "0px", background: "#c6f7ff", border: "8px solid #c6f7ff", margin: "-8px", borderRadius: "8px"
                                }],
                            ], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 113]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 114]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 115]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 116]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 117]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 118]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 119]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 120]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 121]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 122]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 123]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 124]], {width: "0", height: "0"}],
                        ], {background: "radial-gradient(circle, #3466ac -50%, #00000000 70%)", borderRadius: "200px", width: "360px", height: "360px", margin: "20px"}],
                        ["blank", "3px", {width: "3px"}],
                        ["style-row", [

                        ], {background: "radial-gradient(circle, #3466ac 0%, #203f6b 100%)", border: "3px solid #3466ac", borderRadius: "10px", width: "360px", height: "360px", margin: "20px"}],
                    ], () => {
                        return {background: "#102036", border: "3px solid #094599", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "821px", height: "412px", display: player.cbs.shrineTab == 1 ? "" : "none !important"}
                    }],

                    // FACTORS
                    ["style-row", [
                        ["style-row", [
                            ["style-row", [
                                createClickableConnection(201, 205, "white"),
                                createClickableConnection(202, 206, "white"),
                                createClickableConnection(203, 207, "white"),
                                createClickableConnection(204, 208, "white"),
                                createClickableConnection(205, 209, "white"),
                                createClickableConnection(206, 210, "white"),
                                createClickableConnection(207, 211, "white"),
                                createClickableConnection(208, 212, "white"),
                                createClickableConnection(209, 201, "white"),
                                createClickableConnection(210, 202, "white"),
                                createClickableConnection(211, 203, "white"),
                                createClickableConnection(212, 204, "white"),

                                createClickableConnection(201, 204, "#536580"),
                                createClickableConnection(202, 205, "#536580"),
                                createClickableConnection(203, 206, "#536580"),
                                createClickableConnection(204, 207, "#536580"),
                                createClickableConnection(205, 208, "#536580"),
                                createClickableConnection(206, 209, "#536580"),
                                createClickableConnection(207, 210, "#536580"),
                                createClickableConnection(208, 211, "#536580"),
                                createClickableConnection(209, 212, "#536580"),
                                createClickableConnection(210, 201, "#536580"),
                                createClickableConnection(211, 202, "#536580"),
                                createClickableConnection(212, 203, "#536580"),
                                ["style-row", [], {
                                    position: "relative",
                                    left: () => {return ((Math.cos(Date.now() / 6000 % 1000 * 2 * Math.PI)) * 50) + "px"},
                                    top: () => {return (Math.sin(Date.now() / 6000 % 1000 * 2 * Math.PI) * 50) + "px"},
                                    transform: () => {return "rotate(" + ((Date.now() / 6000 % 1000 * 2 * Math.PI)) + "rad"},
                                    width: "100px",
                                    height: "0px", background: "#536580", border: "1px solid #536580", margin: "-1px"
                                }],
                                ["style-row", [], {
                                    position: "relative",
                                    left: () => {return ((Math.cos(Date.now() / 72000 % 1000 * 2 * Math.PI)) * 25) + "px"},
                                    top: () => {return (Math.sin(Date.now() / 72000 % 1000 * 2 * Math.PI) * 25) + "px"},
                                    transform: () => {return "rotate(" + ((Date.now() / 72000 % 1000 * 2 * Math.PI)) + "rad"},
                                    width: "50px",
                                    height: "0px", background: "#536580", border: "2px solid #536580", margin: "-2px"
                                }],
                                ["style-row", [], {
                                    position: "relative",
                                    left: "0px",
                                    top: "0px",
                                    width: "0px",
                                    height: "0px", background: "#536580", border: "8px solid #536580", margin: "-8px", borderRadius: "8px"
                                }],
                            ], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 201]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 202]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 203]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 204]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 205]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 206]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 207]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 208]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 209]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 210]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 211]], {width: "0", height: "0"}],
                            ["style-column", [["clickable", 212]], {width: "0", height: "0"}],
                        ], {background: "radial-gradient(circle, #536580 -50%, #00000000 70%)", borderRadius: "200px", width: "360px", height: "360px", margin: "20px"}],
                        ["blank", "3px", {width: "3px"}],
                        ["style-row", [
                            ["style-column", [
                                ["blank", "6px"],
                                ["raw-html", () => {return "~ Factor " + layers.cbs.clickables[player.cbs.factorSelection + 200].title() + " ~"}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "6px"],
                                ["style-row", [], {backgroundColor: "black", width: "360px", height: "3px"}],
                                ["blank", "6px"],
                                ["style-row", [], {backgroundColor: "black", width: "360px", height: "3px"}],
                                ["blank", "6px"],
                            ]]
                        ], () => {
                            let look = {border: "3px solid black", borderRadius: "10px", width: "360px", height: "360px", margin: "20px"}
                            switch (player.cbs.factorSelection) {
                                case 1: look.background = "radial-gradient(circle, #808080 0%, #5e5e5e 70%)"; break;
                                case 2: look.background = "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)"; break;
                                case 3: look.background = "#ff7070"; break;
                                case 4: look.background = "linear-gradient(45deg, #5d51ff 0%, #af51ff 100%)"; break;
                                case 5: look.background = "radial-gradient(circle, #808080 0%, #5e5e5e 70%)"; break;
                                case 6: look.background = "linear-gradient(105deg, #bf905e 0%, #d17c62 74%)"; break;
                                case 7: look.background = "#7970ff"; break;
                                case 8: look.background = "linear-gradient(45deg, #1ba861 0%, #89ee30 33%, #e79c44 67%, #cb1816 100%)"; break;
                                case 9: look.background = "radial-gradient(circle, #808080 0%, #5e5e5e 70%)"; break;
                                case 10: look.background = "linear-gradient(120deg, #1f7350 0%, #5abf95 100%)"; break;
                                case 11: look.background = "fffd70"; break;
                                case 12: look.background = "linear-gradient(45deg, #c6f7ff 0%, #d5abff 100%)"; break;
                                default: look.background = "radial-gradient(circle, #536580 0%, #333f4f 100%)"; break;
                            }
                            return look
                        }],
                    ], () => {
                        return {background: "#1b2029", border: "3px solid #094599", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "821px", height: "412px", display: player.cbs.shrineTab == 2 ? "" : "none !important"}
                    }],

                    // PYLON
                    ["style-column", [
                        
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

                    ], () => {
                        return {background: "linear-gradient(90deg, #2a6378 0%, #09366e 100%)", border: "3px solid #094599", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "821px", height: "412px", display: player.cbs.shrineTab == 3 ? "" : "none !important"}
                    }],

                    //
                    ["blank", "25px"],
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
                    ]]],
                ]
            },
            "Refresh Page :(": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "why did you refresh the page... now you have to wait another long interval of time." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["clickable", 12],
                ]
            },
            "Lose": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Ritual failed." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["clickable", 12],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return !player.ir.inBattle ? "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return !player.ir.inBattle && player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 19) && !player.sma.inStarmetalChallenge}
})

// Enhanced Phase Transition Manager for dramatic boss phase changes
class PhaseTransitionManager {
    constructor(arena) {
        this.arena = arena;
        this.currentPhase = 1;
        this.transitionInProgress = false;
        this.transitionEffects = [];
        this.transitionTimer = 0;
        this.transitionDuration = 2000; // 2 seconds
        
        // Phase configurations
        this.phaseConfigs = {
            1: {
                healthThreshold: { min: 0.4, max: 1.0 },
                visualConfig: {
                    auraIntensity: 1.0,
                    glowColor: '#88eaff',
                    particleRate: 30,
                    scaleModifier: 1.0
                },
                behaviorConfig: {
                    attackFrequency: 1.0,
                    movementSpeed: 1.0,
                    aggressionLevel: 1.0,
                    availableAttacks: ['orbBarrage', 'charge', 'dashAttack', 'spectralBlades']
                }
            },
            2: {
                healthThreshold: { min: 0, max: 0.4 },
                visualConfig: {
                    auraIntensity: 1.5,
                    glowColor: '#ff88ea',
                    particleRate: 50,
                    scaleModifier: 1.1
                },
                behaviorConfig: {
                    attackFrequency: 1.3,
                    movementSpeed: 1.2,
                    aggressionLevel: 1.5,
                    availableAttacks: ['orbBarrage', 'charge', 'dashAttack', 'spectralBlades', 'pulse', 'summonMinions', 'ringOfSpirits', 'teleportStrike']
                }
            },
            3: {
                healthThreshold: { min: 0.0, max: 0 }, //desperation phase (scrapped)
                visualConfig: {
                    auraIntensity: 2.0,
                    glowColor: '#ff4488',
                    particleRate: 60,
                    scaleModifier: 1.2
                },
                behaviorConfig: {
                    attackFrequency: 1.5,
                    movementSpeed: 1.5,
                    aggressionLevel: 2.0,
                    availableAttacks: ['orbBarrage', 'charge', 'dashAttack', 'spectralBlades', 'pulse', 'summonMinions', 'ringOfSpirits', 'teleportStrike', 'chaosMode'] //laser isnt there for now
                }
            }
        };
    }
    
    triggerPhaseTransition(boss, newPhase) {
        if (this.transitionInProgress || newPhase === this.currentPhase) return false;
        
        this.transitionInProgress = true;
        this.transitionTimer = this.transitionDuration;
        this.currentPhase = newPhase;
        
        // Make boss temporarily invulnerable
        if (boss) {
            boss._invulnerable = true;
            boss._originalColor = boss.color;
        }
        
        // Create dramatic transition effects
        this.createTransitionEffects(boss, newPhase);
        
        return true;
    }
    
    createTransitionEffects(boss, phase) {
        if (!boss || !this.arena.effectsManager) return;
        
        const config = this.phaseConfigs[phase];
        if (!config) return;
        
        // Screen effects based on phase
        const intensity = 8 + phase * 4;
        const duration = 600 + phase * 200;
        
        this.arena.effectsManager.addScreenShake(intensity, duration);
        // Removed excessive flash effect per user feedback
        
        // Particle explosion (reduced count)
        const particleCount = 15 + phase * 8;
        this.arena.effectsManager.createParticles('phaseTransition', boss.x, boss.y, particleCount, { spread: 100 });
        
        // Create expanding energy ring effect
        if (this.arena.telegraphSystem) {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    this.arena.telegraphSystem.createCircleTelegraph(
                        boss.x, boss.y, 50 + i * 30, 800, config.visualConfig.glowColor
                    );
                }, i * 200);
            }
        }
    }
    
    updateTransition(delta, boss) {
        if (!this.transitionInProgress) return;
        
        this.transitionTimer -= delta;
        
        if (this.transitionTimer <= 0) {
            this.completeTransition(boss);
        } else {
            // Update transition visual effects
            this.updateTransitionVisuals(boss, delta);
        }
    }
    
    updateTransitionVisuals(boss, delta) {
        if (!boss) return;
        
        const progress = 1 - (this.transitionTimer / this.transitionDuration);
        const config = this.phaseConfigs[this.currentPhase];
        
        if (config && this.arena.effectsManager) {
            // Pulse effect during transition
            const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.01);
            
            // Emit transition particles (reduced frequency)
            if (Math.random() < 0.3) {
                this.arena.effectsManager.createParticles('phaseTransition', 
                    boss.x + (Math.random() - 0.5) * boss.radius * 2,
                    boss.y + (Math.random() - 0.5) * boss.radius * 2,
                    1 + Math.floor(progress * 2)
                );
            }
        }
    }
    
    completeTransition(boss) {
        this.transitionInProgress = false;
        this.transitionTimer = 0;
        
        // Remove invulnerability
        if (boss) {
            boss._invulnerable = false;
            if (boss._originalColor) {
                boss.color = boss._originalColor;
                delete boss._originalColor;
            }
            
            // Apply phase-specific visual changes
            this.applyPhaseVisuals(boss);
        }
    }
    
    applyPhaseVisuals(boss) {
        const config = this.phaseConfigs[this.currentPhase];
        if (!config || !boss) return;
        
        // Update boss visual properties
        boss._phaseConfig = config.visualConfig;
        boss.color = config.visualConfig.glowColor;
        
        // Create final phase activation effect (reduced particles)
        if (this.arena.effectsManager) {
            this.arena.effectsManager.createParticles('energyBurst', boss.x, boss.y, 10, { spread: 60 });
        }
    }
    
    getPhaseConfig(phase) {
        return this.phaseConfigs[phase] || this.phaseConfigs[1];
    }
    
    isInTransition() {
        return this.transitionInProgress;
    }
    
    cleanup() {
        this.transitionInProgress = false;
        this.transitionEffects.length = 0;
        this.transitionTimer = 0;
    }
}

// Enhanced Telegraph System for attack warnings and visual indicators
class TelegraphSystem {
    constructor(arena) {
        this.arena = arena;
        this.telegraphs = [];
        this.warningThresholds = {
            minor: 1000,    // 1 second warning
            major: 1500,    // 1.5 second warning
            ultimate: 2000  // 2 second warning
        };
    }
    
    createTelegraph(type, config) {
        const telegraph = {
            type: type,
            warningTime: config.warningTime || this.warningThresholds.minor,
            remainingTime: config.warningTime || this.warningThresholds.minor,
            intensity: 0,
            position: config.position || { x: 0, y: 0 },
            shape: config.shape || 'circle',
            color: config.color || '#ff4444',
            size: config.size || 50,
            maxSize: config.maxSize || config.size || 50,
            active: true,
            data: config.data || {} // Additional data for specific telegraph types
        };
        
        this.telegraphs.push(telegraph);
        return telegraph;
    }
    
    createLineTelegraph(x1, y1, x2, y2, warningTime = 1200, color = '#b4ebff') {
        return this.createTelegraph('line', {
            warningTime: warningTime,
            color: color,
            data: { x1, y1, x2, y2 }
        });
    }
    
    createCircleTelegraph(x, y, radius, warningTime = 1000, color = '#ff6666') {
        return this.createTelegraph('circle', {
            position: { x, y },
            size: radius,
            warningTime: warningTime,
            color: color,
            shape: 'circle'
        });
    }
    
    createAreaTelegraph(x, y, width, height, warningTime = 1500, color = '#ffaa44') {
        return this.createTelegraph('area', {
            position: { x, y },
            warningTime: warningTime,
            color: color,
            shape: 'rectangle',
            data: { width, height }
        });
    }
    
    updateTelegraphs(delta) {
        for (let i = this.telegraphs.length - 1; i >= 0; i--) {
            const telegraph = this.telegraphs[i];
            if (!telegraph.active) {
                this.telegraphs.splice(i, 1);
                continue;
            }
            
            telegraph.remainingTime -= delta;
            telegraph.intensity = Math.max(0, Math.min(1, 1 - (telegraph.remainingTime / telegraph.warningTime)));
            
            if (telegraph.remainingTime <= 0) {
                telegraph.active = false;
            }
        }
    }
    
    renderTelegraphs(ctx) {
        if (!ctx) return;
        
        for (const telegraph of this.telegraphs) {
            if (!telegraph.active) continue;
            
            ctx.save();
            
            // Calculate pulsing alpha based on intensity
            const pulseSpeed = 3;
            const pulseOffset = Date.now() * 0.01 * pulseSpeed;
            const pulse = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(pulseOffset));
            const alpha = telegraph.intensity * pulse;
            
            ctx.globalAlpha = alpha;
            
            // Set color with intensity-based brightness
            const colorIntensity = 0.3 + 0.7 * telegraph.intensity;
            ctx.strokeStyle = this.adjustColorIntensity(telegraph.color, colorIntensity);
            ctx.fillStyle = this.adjustColorIntensity(telegraph.color, colorIntensity * 0.3);
            
            // Line width increases with intensity
            ctx.lineWidth = 2 + telegraph.intensity * 4;
            
            switch (telegraph.shape) {
                case 'line':
                    this.renderLineTelegraph(ctx, telegraph);
                    break;
                case 'circle':
                    this.renderCircleTelegraph(ctx, telegraph);
                    break;
                case 'rectangle':
                    this.renderAreaTelegraph(ctx, telegraph);
                    break;
            }
            
            ctx.restore();
        }
    }
    
    renderLineTelegraph(ctx, telegraph) {
        const data = telegraph.data;
        ctx.beginPath();
        ctx.moveTo(data.x1, data.y1);
        ctx.lineTo(data.x2, data.y2);
        ctx.stroke();
        
        // Add arrow head
        const angle = Math.atan2(data.y2 - data.y1, data.x2 - data.x1);
        const arrowLength = 15 + telegraph.intensity * 10;
        ctx.beginPath();
        ctx.moveTo(data.x2, data.y2);
        ctx.lineTo(data.x2 - arrowLength * Math.cos(angle - 0.3), data.y2 - arrowLength * Math.sin(angle - 0.3));
        ctx.moveTo(data.x2, data.y2);
        ctx.lineTo(data.x2 - arrowLength * Math.cos(angle + 0.3), data.y2 - arrowLength * Math.sin(angle + 0.3));
        ctx.stroke();
    }
    
    renderCircleTelegraph(ctx, telegraph) {
        const radius = telegraph.size + telegraph.intensity * 10;
        ctx.beginPath();
        ctx.arc(telegraph.position.x, telegraph.position.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }
    
    renderAreaTelegraph(ctx, telegraph) {
        const data = telegraph.data;
        const x = telegraph.position.x - data.width / 2;
        const y = telegraph.position.y - data.height / 2;
        ctx.beginPath();
        ctx.rect(x, y, data.width, data.height);
        ctx.stroke();
        ctx.fill();
    }
    
    adjustColorIntensity(color, intensity) {
        // Simple color intensity adjustment
        if (color.startsWith('#')) {
            const r = parseInt(color.substr(1, 2), 16);
            const g = parseInt(color.substr(3, 2), 16);
            const b = parseInt(color.substr(5, 2), 16);
            return `rgba(${Math.floor(r * intensity)}, ${Math.floor(g * intensity)}, ${Math.floor(b * intensity)}, 1)`;
        }
        return color;
    }
    
    clearTelegraphs() {
        this.telegraphs.length = 0;
    }
    
    cleanup() {
        this.clearTelegraphs();
    }
}

// Enhanced Visual Effects Manager for particle systems and visual polish
class VisualEffectsManager {
    constructor(arena) {
        this.arena = arena;
        this.particleSystems = new Map();
        this.lightingEffects = [];
        this.screenEffects = [];
        this.trailSystems = new Map();
        this.particles = [];
        this.screenShake = { intensity: 0, duration: 0, elapsed: 0 };
        this.flashEffect = { color: '#ffffff', intensity: 0, duration: 0, elapsed: 0 };
    }
    
    // Particle system management
    createParticleSystem(type, config) {
        const system = {
            type: type,
            particles: [],
            config: { ...config },
            active: true,
            emissionTimer: 0
        };
        this.particleSystems.set(type, system);
        return system;
    }
    
    // Create individual particles
    createParticles(type, x, y, count = 1, config = {}) {
        const baseConfig = this.getParticleConfig(type);
        for (let i = 0; i < count; i++) {
            const particle = {
                type: type,
                x: x + (Math.random() - 0.5) * (config.spread || 0),
                y: y + (Math.random() - 0.5) * (config.spread || 0),
                vx: (Math.random() - 0.5) * (baseConfig.speed?.max || 4),
                vy: (Math.random() - 0.5) * (baseConfig.speed?.max || 4),
                life: baseConfig.lifetime || 1000,
                maxLife: baseConfig.lifetime || 1000,
                size: baseConfig.size?.start || 3,
                maxSize: baseConfig.size?.start || 3,
                color: baseConfig.color?.start || '#ffffff',
                alpha: 1.0,
                gravity: baseConfig.gravity || 0,
                friction: baseConfig.friction || 1,
                active: true
            };
            this.particles.push(particle);
        }
    }
    
    getParticleConfig(type) {
        const configs = {
            energyBurst: {
                lifetime: 2000,
                speed: { min: 2, max: 8 },
                color: { start: '#ffffff', end: '#88eaff' },
                size: { start: 0, end: 0 },
                gravity: 0.1
            },
            impactSpark: {
                lifetime: 800,
                speed: { min: 5, max: 15 },
                color: { start: '#ffff88', end: '#ff8888' },
                size: { start: 3, end: 1 },
                friction: 0.95
            },
            trailParticle: {
                lifetime: 1200,
                speed: { min: 1, max: 3 },
                color: { start: '#88eaff', end: 'rgba(136, 234, 255, 0)' },
                size: { start: 2, end: 0 },
                friction: 0.98
            },
            auraParticle: {
                lifetime: 3000,
                speed: { min: 0.5, max: 2 },
                color: { start: '#88eaff', end: 'rgba(136, 234, 255, 0.3)' },
                size: { start: 1, end: 3 },
                gravity: -0.02
            },
            phaseTransition: {
                lifetime: 1500,
                speed: { min: 8, max: 20 },
                color: { start: '#ffffff', end: '#ff88ea' },
                size: { start: 6, end: 0 },
                gravity: 0
            }
            ,
            lotusPetal: {
                lifetime: 1400,
                speed: { min: 0.5, max: 2 },
                color: { start: '#b366ff', end: 'rgba(150,80,255,0)' },
                size: { start: 18, end: 8 },
                gravity: -0.005,
                friction: 0.98
            },
            lotusShard: {
                lifetime: 1200,
                speed: { min: 4, max: 18 },
                color: { start: '#d7a3ff', end: 'rgba(200,130,255,0)' },
                size: { start: 3, end: 1 },
                friction: 0.96
            }
        };
        return configs[type] || configs.energyBurst;
    }
    
    updateParticleSystems(delta) {
        // Update individual particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            if (!p.active) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Update particle physics
            p.life -= delta;
            if (p.life <= 0) {
                p.active = false;
                continue;
            }
            
            // Apply physics
            p.vy += p.gravity * delta;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.x += p.vx * delta / 16.67; // normalize to 60fps
            p.y += p.vy * delta / 16.67;
            
            // Update visual properties based on life
            const lifeRatio = p.life / p.maxLife;
            p.alpha = Math.max(0, lifeRatio);
            p.size = p.maxSize * (0.2 + 0.8 * lifeRatio);
        }
        
        // Update screen effects
        if (this.screenShake.duration > 0) {
            this.screenShake.elapsed += delta;
            if (this.screenShake.elapsed >= this.screenShake.duration) {
                this.screenShake.intensity = 0;
                this.screenShake.duration = 0;
            }
        }
        
        if (this.flashEffect.duration > 0) {
            this.flashEffect.elapsed += delta;
            const progress = this.flashEffect.elapsed / this.flashEffect.duration;
            this.flashEffect.intensity = Math.max(0, 1 - progress);
            if (progress >= 1) {
                this.flashEffect.duration = 0;
                this.flashEffect.intensity = 0;
            }
        }
    }
    
    renderParticleSystems(ctx) {
        if (!ctx) return;
        
        // Apply screen shake
        if (this.screenShake.intensity > 0) {
            const shakeX = (Math.random() - 0.5) * this.screenShake.intensity;
            const shakeY = (Math.random() - 0.5) * this.screenShake.intensity;
            ctx.save();
            ctx.translate(shakeX, shakeY);
        }
        
        // Render particles
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        
        for (const particle of this.particles) {
            if (!particle.active || particle.alpha <= 0) continue;
            
            ctx.save();
            ctx.globalAlpha = particle.alpha;
            // Custom rendering for special particle types
            if (particle.type === 'lotusPetal') {
                const lifeRatio = particle.life / particle.maxLife;
                const petalSize = particle.size * (0.6 + 0.8 * lifeRatio);
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.angle || 0);
                const g = ctx.createRadialGradient(0, 0, 0, 0, 0, petalSize * 1.6);
                g.addColorStop(0, particle.color);
                g.addColorStop(0.6, 'rgba(160,80,255,0.25)');
                g.addColorStop(1, 'rgba(160,80,255,0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.ellipse(0, 0, petalSize * 1.2, petalSize, 0, 0, Math.PI * 2);
                ctx.fill();
                // inner glass highlight
                ctx.globalAlpha = particle.alpha * 0.6;
                ctx.fillStyle = 'rgba(220,180,255,0.9)';
                ctx.beginPath();
                ctx.ellipse(0, -petalSize * 0.15, petalSize * 0.5, petalSize * 0.35, 0, 0, Math.PI * 2);
                ctx.fill();
            } else if (particle.type === 'lotusShard') {
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.angle || 0);
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.moveTo(0, -particle.size);
                ctx.lineTo(particle.size, particle.size);
                ctx.lineTo(-particle.size, particle.size);
                ctx.closePath();
                ctx.fill();
                // glow
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = 'rgba(180,120,255,0.45)';
                ctx.beginPath();
                ctx.arc(0, 0, particle.size * 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            } else {
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
        
        ctx.restore();
        
        // Apply flash effect
        if (this.flashEffect.intensity > 0) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = this.flashEffect.color;
            ctx.globalAlpha = this.flashEffect.intensity * 0.3;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();
        }
        
        // Restore from screen shake
        if (this.screenShake.intensity > 0) {
            ctx.restore();
        }
    }
    
    // Screen-wide effects
    addScreenShake(intensity, duration) {
        this.screenShake.intensity = Math.max(this.screenShake.intensity, intensity);
        this.screenShake.duration = Math.max(this.screenShake.duration, duration);
        this.screenShake.elapsed = 0;
    }
    
    addFlashEffect(color, intensity, duration) {
        this.flashEffect.color = color;
        this.flashEffect.intensity = intensity;
        this.flashEffect.duration = duration;
        this.flashEffect.elapsed = 0;
    }
    
    // Cleanup
    cleanup() {
        this.particles.length = 0;
        this.particleSystems.clear();
        this.lightingEffects.length = 0;
        this.screenEffects.length = 0;
        this.trailSystems.clear();
    }
}

// RitualArena: simplified arena derived from SpaceArena.
// This file keeps arena visuals and basic update/draw behavior,
// but removes Nox, blood-enemy logic, and vampire spear systems.
class RitualArena extends SpaceArena {
    constructor(width, height) {
        super(width, height);
        // make sure upgradeEffects exist for compatibility
        if (!this.upgradeEffects) this.upgradeEffects = {};
        this.upgradeEffects.attackDamage = this.upgradeEffects.attackDamage || 1;
        this.upgradeEffects.damageReduction = this.upgradeEffects.damageReduction || 1;
        this.upgradeEffects.xpGain = this.upgradeEffects.xpGain || 1;
        this.upgradeEffects.lootGain = this.upgradeEffects.lootGain || 1;
        
        // Initialize enhanced visual effects system
        this.effectsManager = new VisualEffectsManager(this);
        this.telegraphSystem = new TelegraphSystem(this);
        this.phaseManager = new PhaseTransitionManager(this);
        
        // Nav - the helpful mage
        this.nav = {
            x: width / 2,
            y: height / 2,
            targetX: width / 2,
            targetY: height / 2,
            angle: 0,
            radius: 32,
            cooldown: 0,
            img: new Image(),
            loaded: false,
            animTimer: 0
        };
        this.nav.img.src = 'resources/navWisp.png';
        this.nav.img.onload = () => { this.nav.loaded = true; };
        
        // Player skill tracking for adaptive feedback
        this.skillTracker = {
            nearMisses: 0,
            consecutiveDodges: 0,
            lastDamageTime: 0,
            skillLevel: 1.0 // 1.0 = normal, higher = more skilled
        };
        
        // Custom draw function for ritual projectiles
        this.draw = () => {
            if (!this.ctx) return;
            const ctx = this.ctx;
            
            // Let parent class handle everything first (including default bullet rendering)
            if (typeof super.draw === 'function') super.draw();
            
            // Now draw ritual-themed projectiles on top, matching ritualSpirit sprite
            for (let bullet of this.bullets) {
                if (bullet.ritualOrb || bullet.ritualBlade) {
                    // Ritual-themed projectiles matching ritualSpirit visual style
                    ctx.save();
                    ctx.translate(bullet.x, bullet.y);
                    
                    // Rotate based on velocity to face movement direction
                    let angle = Math.atan2(bullet.vy, bullet.vx);
                    ctx.rotate(angle + Math.PI / 2);
                    
                    // Glow effect
                    ctx.globalCompositeOperation = 'lighter';
                    let g = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
                    g.addColorStop(0, 'rgba(136, 234, 255, 0.9)');
                    g.addColorStop(0.5, 'rgba(136, 234, 255, 0.3)');
                    g.addColorStop(1, 'rgba(136, 234, 255, 0)');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(0, 0, 16, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.globalCompositeOperation = 'source-over';
                    
                    // Spirit core (tear-drop shape matching ritualSpirit)
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.moveTo(0, -10);
                    ctx.quadraticCurveTo(7, 0, 0, 10);
                    ctx.quadraticCurveTo(-7, 0, 0, -10);
                    ctx.fill();
                    
                    // Inner cyan glow
                    ctx.fillStyle = '#88eaff';
                    ctx.beginPath();
                    ctx.moveTo(0, -6);
                    ctx.quadraticCurveTo(4, 0, 0, 6);
                    ctx.quadraticCurveTo(-4, 0, 0, -6);
                    ctx.fill();
                    
                    ctx.restore();
                    
                    // Add trail particles for enhanced projectiles (reduced frequency)
                    if (this.effectsManager && Math.random() < 0.1) {
                        this.effectsManager.createParticles('trailParticle', bullet.x, bullet.y, 1);
                    }
                } else if (bullet.navFireball) {
                    // Draw Nav's purple fireballs
                    ctx.save();
                    ctx.translate(bullet.x, bullet.y);
                    
                    // Rotating effect for fireball
                    ctx.rotate(Date.now() * 0.01);
                    
                    // Outer purple glow
                    ctx.globalCompositeOperation = 'lighter';
                    let g = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
                    g.addColorStop(0, 'rgba(160, 64, 255, 0.8)');
                    g.addColorStop(0.6, 'rgba(100, 30, 200, 0.4)');
                    g.addColorStop(1, 'rgba(100, 30, 200, 0)');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(0, 0, 16, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Inner core
                    ctx.fillStyle = '#f0d0ff';
                    ctx.beginPath();
                    ctx.arc(0, 0, 8, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.restore();
                    
                    // Fireball trail particles
                    if (this.effectsManager && Math.random() < 0.2) {
                     //   this.effectsManager.createParticles('energyBurst', bullet.x, bullet.y, 1, { spread: 5 });
                    }
                }
            }

            // Draw Nav
            if (this.nav) {
                ctx.save();
                ctx.translate(this.nav.x, this.nav.y);
                
                // Slight bobbing and swaying
                let bob = Math.sin(this.nav.animTimer) * 5;
                let sway = Math.sin(this.nav.animTimer * 0.5) * 0.1;
                ctx.rotate(sway);
                
                // Glow around Nav
                ctx.globalCompositeOperation = 'lighter';
                let g = ctx.createRadialGradient(0, bob, 0, 0, bob, this.nav.radius * 1.5);
                g.addColorStop(0, 'rgba(160, 64, 255, 0.4)');
                g.addColorStop(1, 'rgba(160, 64, 255, 0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(0, bob, this.nav.radius * 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
                
                if (this.nav.loaded) {
                    // Draw the Nav sprite (purple wisp with witches hat)
                    ctx.drawImage(this.nav.img, -this.nav.radius, -this.nav.radius + bob, this.nav.radius * 2, this.nav.radius * 2);
                } else {
                    // Fallback wisp visual if image fails to load
                    ctx.fillStyle = '#a040ff';
                    ctx.beginPath();
                    ctx.arc(0, bob, this.nav.radius * 0.8, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Simple witch hat shape
                    ctx.fillStyle = '#201040';
                    ctx.beginPath();
                    ctx.moveTo(-this.nav.radius, bob - 5);
                    ctx.lineTo(this.nav.radius, bob - 5);
                    ctx.lineTo(0, bob - this.nav.radius * 1.5);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();
            }
            
            // Render enhanced visual effects
            if (this.effectsManager) {
                this.effectsManager.renderParticleSystems(ctx);
            }
            
            // Render telegraph warnings
            if (this.telegraphSystem) {
                this.telegraphSystem.renderTelegraphs(ctx);
            }
            
            // Render player invulnerability indicator
            if (this.ship && this.ship._invulnerable && this.ship._invulnerabilityTimer > 0) {
                ctx.save();
                const alpha = 0.3 + 0.3 * Math.sin(Date.now() * 0.02);
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = '#88eaff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(this.ship.x, this.ship.y, (this.ship.radius || 15) + 8, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
        };
        
        // enemyTypes entry so SpaceArena's draw loop can render the boss
        this.enemyTypes.ritualSpirit = {
            radius: 64,
            color: '#88eaff',
            healthMax: 25000,
            draw: (ctx, enemy) => {
                ctx.save();
                // animation-driven bob and sway
                let t = (enemy._anim || 0) / 12;
                let bob = Math.sin(t) * 8;

                // Get phase configuration for visual scaling
                const phaseConfig = enemy._phaseConfig || { auraIntensity: 1.0, glowColor: '#88eaff', scaleModifier: 1.0 };
                const auraIntensity = phaseConfig.auraIntensity || 1.0;
                const glowColor = phaseConfig.glowColor || '#88eaff';
                const scaleModifier = phaseConfig.scaleModifier || 1.0;
                
                // Apply phase-based scaling
                const scaledRadius = enemy.radius * scaleModifier;

                // large soft aura with phase-based intensity
                ctx.globalCompositeOperation = 'lighter';
                let g = ctx.createRadialGradient(enemy.x, enemy.y + bob, scaledRadius * 0.1, enemy.x, enemy.y + bob, scaledRadius * 2.4 * auraIntensity);
                
                // Use phase-specific colors with simpler approach
                g.addColorStop(0, 'rgba(210,255,255,0.95)');
                g.addColorStop(0.35, `rgba(136,234,255,${0.4 * auraIntensity})`);
                g.addColorStop(0.7, `rgba(136,234,255,${0.15 * auraIntensity})`);
                g.addColorStop(1, 'rgba(136,234,255,0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(enemy.x, enemy.y + bob, scaledRadius * 2.4 * auraIntensity, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';

                // Humanoid figure with phase-based scaling
                ctx.save();
                ctx.translate(enemy.x, enemy.y + bob);
                ctx.scale(scaleModifier, scaleModifier);
                let sway = Math.sin(t * 0.8) * 6;
                ctx.rotate(sway * 0.03);

                // Robe/Body (flowing bottom) - simplified colors
                let bodyG = ctx.createLinearGradient(0, -enemy.radius * 0.5, 0, enemy.radius * 1.5);
                bodyG.addColorStop(0, '#88eaff');
                bodyG.addColorStop(0.6, '#4ac6ff');
                bodyG.addColorStop(1, 'rgba(74, 198, 255, 0)');
                ctx.fillStyle = bodyG;
                ctx.beginPath();
                ctx.moveTo(-enemy.radius * 0.45, 0);
                // Torso
                ctx.quadraticCurveTo(-enemy.radius * 0.5, enemy.radius * 0.5, -enemy.radius * 0.8, enemy.radius * 1.4);
                // Bottom flow with enhanced animation in higher phases
                const flowIntensity = 1 + (auraIntensity - 1) * 0.5;
                for (let i = 0; i < 3; i++) {
                    let off = Math.sin(t * 1.5 * flowIntensity + i) * 10 * flowIntensity;
                    ctx.quadraticCurveTo(-enemy.radius * 0.4 + i * 20, enemy.radius * 1.6 + off, enemy.radius * 0.1 + i * 20, enemy.radius * 1.4);
                }
                ctx.lineTo(enemy.radius * 0.45, 0);
                ctx.closePath();
                ctx.fill();

                // Torso highlight/detail with phase-based intensity
                ctx.strokeStyle = `rgba(255,255,255,${0.3 * auraIntensity})`;
                ctx.lineWidth = 2 * scaleModifier;
                ctx.beginPath();
                ctx.moveTo(-enemy.radius * 0.2, enemy.radius * 0.2);
                ctx.lineTo(0, enemy.radius * 0.6);
                ctx.lineTo(enemy.radius * 0.2, enemy.radius * 0.2);
                ctx.stroke();

                // Head & Hood - simplified
                ctx.fillStyle = '#66d4ff';
                ctx.beginPath();
                ctx.arc(0, -enemy.radius * 0.45, enemy.radius * 0.45, Math.PI, 0);
                ctx.ellipse(0, -enemy.radius * 0.45, enemy.radius * 0.45, enemy.radius * 0.6, 0, 0, Math.PI);
                ctx.fill();

                // Face area
                ctx.fillStyle = '#0a1a2a';
                ctx.beginPath();
                ctx.ellipse(0, -enemy.radius * 0.45, enemy.radius * 0.25, enemy.radius * 0.35, 0, 0, Math.PI * 2);
                ctx.fill();

                // Glowing Eyes with phase-based intensity
                let eyePulse = (0.8 + Math.sin(t * 2) * 0.2) * auraIntensity;
                ctx.shadowColor = '#fff';
                if (!options.performanceMode) {ctx.shadowBlur = 8 * eyePulse} else {ctx.shadowBlur = 0};
                ctx.fillStyle = `rgba(255, 255, 255, ${eyePulse})`;
                ctx.beginPath();
                // Left eye
                ctx.ellipse(-enemy.radius * 0.1, -enemy.radius * 0.48, enemy.radius * 0.06, enemy.radius * 0.03, 0.2, 0, Math.PI * 2);
                // Right eye
                ctx.ellipse(enemy.radius * 0.1, -enemy.radius * 0.48, enemy.radius * 0.06, enemy.radius * 0.03, -0.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Arms - simplified
                ctx.strokeStyle = '#88eaff';
                ctx.lineCap = 'round';
                ctx.lineWidth = 7 * scaleModifier;
                
                // Left arm with enhanced movement in higher phases
                ctx.beginPath();
                ctx.moveTo(-enemy.radius * 0.4, -enemy.radius * 0.1);
                let lArmX = -enemy.radius * 1.1 + Math.sin(t * 0.7 * flowIntensity) * 10 * flowIntensity;
                let lArmY = enemy.radius * 0.4 + Math.cos(t * 0.7 * flowIntensity) * 10 * flowIntensity;
                ctx.quadraticCurveTo(-enemy.radius * 0.9, -enemy.radius * 0.1, lArmX, lArmY);
                ctx.stroke();
                // Hand glow with phase intensity
                ctx.fillStyle = `rgba(255,255,255,${auraIntensity})`;
                ctx.beginPath();
                ctx.arc(lArmX, lArmY, 5 * scaleModifier, 0, Math.PI * 2);
                ctx.fill();

                // Right arm
                ctx.beginPath();
                ctx.moveTo(enemy.radius * 0.4, -enemy.radius * 0.1);
                let rArmX = enemy.radius * 1.1 + Math.cos(t * 0.7 * flowIntensity) * 10 * flowIntensity;
                let rArmY = enemy.radius * 0.4 + Math.sin(t * 0.7 * flowIntensity) * 10 * flowIntensity;
                ctx.quadraticCurveTo(enemy.radius * 0.9, -enemy.radius * 0.1, rArmX, rArmY);
                ctx.stroke();
                // Hand glow
                ctx.beginPath();
                ctx.arc(rArmX, rArmY, 5 * scaleModifier, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();

                // draw sword trail for dash attack
                if (enemy._swordTrail && enemy._swordTrail.length) {
                    ctx.save();
                    ctx.globalCompositeOperation = 'lighter';
                    for (let i = 0; i < enemy._swordTrail.length; i++) {
                        let trail = enemy._swordTrail[i];
                        let alpha = 0.8 * (i / enemy._swordTrail.length);
                        let width = 20 * (i / enemy._swordTrail.length);
                        
                        // Draw sword trail as elongated ellipse
                        ctx.save();
                        ctx.translate(trail.x, trail.y);
                        ctx.rotate(trail.angle);
                        
                        // Sword glow
                        let g = ctx.createLinearGradient(-40, -width/2, 40, width/2);
                        g.addColorStop(0, `rgba(180,235,255,0)`);
                        g.addColorStop(0.5, `rgba(180,235,255,${alpha * 0.6})`);
                        g.addColorStop(1, `rgba(180,235,255,0)`);
                        ctx.fillStyle = g;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, 50, width/2, 0, 0, Math.PI * 2);
                        ctx.fill();
                        
                        // Sword core
                        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, 35, width/4, 0, 0, Math.PI * 2);
                        ctx.fill();
                        
                        ctx.restore();
                    }
                    ctx.restore();
                }

                // beam visual (laser sweep) with enhanced effects
                if (enemy._laserTimer && enemy._laserTimer > 0) {
                    const laserTotal = enemy._laserTotal || 180;
                    const elapsed = laserTotal - enemy._laserTimer;
                    const windup = 12;
                    const progress = Math.max(0, Math.min(1, (elapsed - windup) / (laserTotal - windup)));
                    const angle = enemy._laserAngle || 0;
                    const beamLen = Math.max(ctx.canvas.width, ctx.canvas.height) * 1.5;
                    const maxThickness = Math.max(22, enemy.radius * 1.2 + (enemy.phase || 1) * 4);
                    const thickness = windup > elapsed ? (maxThickness * (elapsed / windup)) : (maxThickness * (0.6 + 0.4 * progress));
                    
                    ctx.save();
                    ctx.translate(enemy.x, enemy.y);
                    ctx.rotate(angle);
                    
                    // Enhanced beam with multiple layers
                    ctx.globalCompositeOperation = 'lighter';
                    
                    // Outer glow layer
                    let outerGr = ctx.createLinearGradient(0, -thickness * 3, beamLen, thickness * 3);
                    outerGr.addColorStop(0, `rgba(160,220,255,${0.05 + 0.1 * progress})`);
                    outerGr.addColorStop(0.5, `rgba(220,200,255,${0.08 + 0.12 * progress})`);
                    outerGr.addColorStop(1, `rgba(160,220,255,${0.01 + 0.02 * progress})`);
                    ctx.fillStyle = outerGr;
                    ctx.beginPath();
                    ctx.rect(0, -thickness * 2, beamLen, thickness * 4);
                    ctx.fill();
                    
                    // Main beam layer
                    let gr = ctx.createLinearGradient(0, -thickness * 2, beamLen, thickness * 2);
                    gr.addColorStop(0, `rgba(160,220,255,${0.12 + 0.28 * progress})`);
                    gr.addColorStop(0.5, `rgba(220,200,255,${0.18 + 0.32 * progress})`);
                    gr.addColorStop(1, `rgba(160,220,255,${0.02 + 0.06 * progress})`);
                    ctx.fillStyle = gr;
                    ctx.beginPath();
                    ctx.rect(0, -thickness, beamLen, thickness * 2);
                    ctx.fill();
                    
                    // Core beam layer
                    let coreGr = ctx.createLinearGradient(0, -thickness * 0.5, beamLen, thickness * 0.5);
                    coreGr.addColorStop(0, `rgba(255,255,255,${0.3 + 0.5 * progress})`);
                    coreGr.addColorStop(0.5, `rgba(255,255,255,${0.4 + 0.6 * progress})`);
                    coreGr.addColorStop(1, `rgba(255,255,255,${0.1 + 0.2 * progress})`);
                    ctx.fillStyle = coreGr;
                    ctx.beginPath();
                    ctx.rect(0, -thickness * 0.3, beamLen, thickness * 0.6);
                    ctx.fill();
                    
                    ctx.restore();
                    ctx.globalCompositeOperation = 'source-over';
                    
                    // Add screen distortion effect during active beam (further reduced intensity)
                    if (progress > 0.1 && this.effectsManager) {
                        // Create subtle screen shake during beam (reduced intensity)
                        const shakeIntensity = 0.5 + progress * 1;
                        this.effectsManager.addScreenShake(shakeIntensity, 50);
                    }
                }

                ctx.restore();
            }
        };
        // small minions/orbs for later attacks
        this.enemyTypes.ritualMinion = {
            radius: 18,
            color: '#5fe8ff',
            healthMax: 400,
            draw: (ctx, e) => {
                ctx.save();
                let t = (e._anim || 0) / 8;
                let bob = Math.sin(t) * 4;
                
                ctx.globalCompositeOperation = 'lighter';
                // Aura
                let g = ctx.createRadialGradient(e.x, e.y + bob, 2, e.x, e.y + bob, e.radius * 1.5);
                g.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                g.addColorStop(1, 'rgba(95, 232, 255, 0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(e.x, e.y + bob, e.radius * 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Core (tear-drop spirit shape)
                ctx.save();
                ctx.translate(e.x, e.y + bob);
                let ang = Math.atan2(e.vy, e.vx) + Math.PI/2;
                ctx.rotate(ang);
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.moveTo(0, -e.radius * 0.8);
                ctx.quadraticCurveTo(e.radius * 0.6, 0, 0, e.radius * 0.8);
                ctx.quadraticCurveTo(-e.radius * 0.6, 0, 0, -e.radius * 0.8);
                ctx.fill();
                ctx.restore();
                
                ctx.restore();
            }
        };
        this.enemyTypes.ritualOrb = {
            radius: 10,
            color: '#9ff5ff',
            healthMax: 200,
            draw: (ctx, e) => {
                ctx.save();
                ctx.fillStyle = e.color || '#9ff5ff';
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        };
        // avoid blood-specific collections
        this._bloodLootRanges = null;
        this._vampireWarns = null;
        this._vampireBeams = null;
        this.bossActive = false;
    }

    spawnArena() {
        this.arenaDiv = document.createElement('div');
        this.arenaDiv.id = 'ritual-arena';
        Object.assign(this.arenaDiv.style, {
            position: 'fixed',
            left: '50%',
            top: '50%',
            width: (this.width || 800) + 'px',
            height: (this.height || 600) + 'px',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(180deg, #1b1830 0%, #2b2544 50%, #1b1830 100%)',
            border: '2px solid #ccc',
            opacity: 0.8,
            zIndex: 1,
            overflow: 'hidden'
        });
        document.body.appendChild(this.arenaDiv);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width || 800;
        this.canvas.height = this.height || 600;
        this.arenaDiv.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);

        this.running = true;
        this.loop = setInterval(() => this.update(), 1000 / 60);

        if (player && player.ir && player.ir.shipType == 3) {
            this.canvas.addEventListener('click', this.canvasClickListener);
        }
    }

    // Expand arena to full-screen and make transparent for boss fights
    enterFullscreenBossMode() {
        try {
            if (this._bossFullscreen) return;
            this._prevStyles = {
                width: this.arenaDiv.style.width,
                height: this.arenaDiv.style.height,
                left: this.arenaDiv.style.left,
                top: this.arenaDiv.style.top,
                transform: this.arenaDiv.style.transform,
                background: this.arenaDiv.style.background,
                zIndex: this.arenaDiv.style.zIndex,
                opacity: this.arenaDiv.style.opacity
            };
            Object.assign(this.arenaDiv.style, {
                left: '0px',
                top: '0px',
                width: (window.innerWidth) + 'px',
                height: (window.innerHeight) + 'px',
                transform: 'none',
                background: 'rgba(0,0,0,0.12)',
                zIndex: 9999,
                opacity: 1
            });
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this._bossFullscreen = true;
        } catch (e) { console.warn('enterFullscreenBossMode failed', e); }
    }

    exitFullscreenBossMode() {
        try {
            if (!this._bossFullscreen) return;
            const s = this._prevStyles || {};
            Object.assign(this.arenaDiv.style, {
                left: s.left || '50%',
                top: s.top || '50%',
                width: s.width || (this.width || 800) + 'px',
                height: s.height || (this.height || 600) + 'px',
                transform: s.transform || 'translate(-50%, -50%)',
                background: s.background || 'linear-gradient(180deg, #1b1830 0%, #2b2544 50%, #1b1830 100%)',
                zIndex: s.zIndex || 1,
                opacity: s.opacity || 0.8
            });
            this.canvas.width = parseInt(this.arenaDiv.style.width) || 800;
            this.canvas.height = parseInt(this.arenaDiv.style.height) || 600;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this._bossFullscreen = false;
        } catch (e) { console.warn('exitFullscreenBossMode failed', e); }
    }

    // delegate to base spawnEnemy but do not allow blood-specific types
    spawnEnemy(typeName) {
        if (!typeName) return;
        const disallowedPrefix = 'blood';
        if (typeof typeName === 'string' && typeName.toLowerCase().includes('blood')) return;
        if (typeof super.spawnEnemy === 'function') return super.spawnEnemy(typeName);
    }

    // Enhanced damage feedback system
    takeDamage(amount) {
        // Call parent damage handling if it exists
        if (typeof super.takeDamage === 'function') {
            super.takeDamage(amount);
        } else {
            // Basic damage handling if parent doesn't have it
            if (this.ship && player && player.ir) {
                player.ir.shipHealth = player.ir.shipHealth.sub(amount);
            }
        }
        
        // Update skill tracking
        this.skillTracker.lastDamageTime = Date.now();
        this.skillTracker.consecutiveDodges = 0;
        this.skillTracker.skillLevel = Math.max(0.5, this.skillTracker.skillLevel - 0.1);
        
        // Check if player is struggling
        if (this.skillTracker.skillLevel < 0.7) {
            this.onPlayerStruggling();
        }
        
        // Set temporary invulnerability visual indicator
        if (this.ship) {
            this.ship._invulnerable = true;
            this.ship._invulnerabilityTimer = 1000; // 1 second
        }
    }
    
    // Enhanced hit feedback when player hits boss (reduced effects)
    onBossHit(boss, damage) {
        if (this.effectsManager && boss) {
            // Hit impact particles (reduced count)
            this.effectsManager.createParticles('impactSpark', boss.x, boss.y, 3, { spread: 20 });
            
            // Subtle screen shake for satisfying feedback (reduced intensity)
            this.effectsManager.addScreenShake(1, 100);
            
            // Removed excessive hit flash effect per user feedback
        }
    }
    
    // Track near misses for skillful play feedback
    onNearMiss(projectile) {
        if (!this.ship || !projectile) return;
        
        const distance = Math.hypot(this.ship.x - projectile.x, this.ship.y - projectile.y);
        const nearMissThreshold = 40; // pixels
        
        if (distance <= nearMissThreshold) {
            this.skillTracker.nearMisses++;
            this.skillTracker.consecutiveDodges++;
            
            // Provide positive visual feedback for near miss (reduced particles)
            if (this.effectsManager) {
                this.effectsManager.createParticles('auraParticle', this.ship.x, this.ship.y, 2, { spread: 15 });
            }
            
            // Increase skill level based on consecutive dodges
            if (this.skillTracker.consecutiveDodges >= 5) {
                this.skillTracker.skillLevel = Math.min(2.0, this.skillTracker.skillLevel + 0.1);
                this.onSkillfulPlay();
            }
        }
    }
    
    // Reward skillful play with visual feedback (reduced effects)
    onSkillfulPlay() {
        if (this.effectsManager && this.ship) {
            // Create rewarding visual effect (reduced particles)
            //this.effectsManager.createParticles('energyBurst', this.ship.x, this.ship.y, 4, { spread: 30 });
            // Removed excessive skillful play flash effect per user feedback
        }
    }
    
    // Provide subtle assistance for struggling players
    onPlayerStruggling() {
        if (this.skillTracker.skillLevel < 0.7) {
            // Slightly increase telegraph warning times
            if (this.telegraphSystem) {
                this.telegraphSystem.warningThresholds.minor += 100;
                this.telegraphSystem.warningThresholds.major += 150;
                this.telegraphSystem.warningThresholds.ultimate += 200;
            }
        }
    }

    // disable asteroids if desired
    spawnAsteroid(big = false, x = null, y = null) {
        // intentionally disabled for RitualArena by default
    }

    removeArena() {
        try {
            // Cleanup visual effects
            if (this.effectsManager) {
                this.effectsManager.cleanup();
            }
            
            // Cleanup telegraph system
            if (this.telegraphSystem) {
                this.telegraphSystem.cleanup();
            }
            
            // Cleanup phase manager
            if (this.phaseManager) {
                this.phaseManager.cleanup();
            }
            
            // Reset skill tracker
            if (this.skillTracker) {
                this.skillTracker = {
                    nearMisses: 0,
                    consecutiveDodges: 0,
                    lastDamageTime: 0,
                    skillLevel: 1.0
                };
            }
            
            // Call parent cleanup
            if (typeof super.removeArena === 'function') {
                super.removeArena();
            } else {
                // Manual cleanup if parent doesn't have removeArena
                if (this.arenaDiv && this.arenaDiv.parentNode) {
                    this.arenaDiv.parentNode.removeChild(this.arenaDiv);
                }
                if (this.loop) {
                    clearInterval(this.loop);
                }
                this.running = false;
                
                // Remove event listeners
                window.removeEventListener('keydown', this.handleKeyDown);
                window.removeEventListener('keyup', this.handleKeyUp);
                window.removeEventListener('mousedown', this.handleMouseDown);
                window.removeEventListener('mouseup', this.handleMouseUp);
                window.removeEventListener('mousemove', this.handleMouseMove);
                try { if (player && player.cbs) player.cbs.ritualSpiritActive = false; } catch (e) {}
            }
        } catch (e) {
            console.warn('RitualArena removeArena error', e);
        }
    }

    // disable asteroids if desired
    spawnAsteroid(big = false, x = null, y = null) {
        // intentionally disabled for RitualArena by default
    }

    

    update(delta) {
        // keep minimal: allow boss AI for `ritualSpirit`, then let SpaceArena handle physics/collisions/draw
        const dtMs = (typeof delta === 'number') ? delta : (1000 / 60);

        // Update visual effects system
        if (this.effectsManager) {
            this.effectsManager.updateParticleSystems(dtMs);
        }
        
        // Update telegraph system
        if (this.telegraphSystem) {
            this.telegraphSystem.updateTelegraphs(dtMs);
        }
        
        // Update player invulnerability timer
        if (this.ship && this.ship._invulnerabilityTimer > 0) {
            this.ship._invulnerabilityTimer -= dtMs;
            if (this.ship._invulnerabilityTimer <= 0) {
                this.ship._invulnerable = false;
            }
        }
        
        // Check for ship death
        if (player && player.ir && player.ir.shipHealth.lte(0)) {
            if (typeof this.onShipDeath === 'function') {
                this.onShipDeath();
            }
        }
        
        // Track near misses for skillful play feedback
        if (this.ship && this.bullets) {
            for (const bullet of this.bullets) {
                if (bullet.fromEnemy && bullet.active !== false) {
                    this.onNearMiss(bullet);
                }
            }
        }

        // Pause if upgrade choice active
        if (this.upgradeChoiceActive) {
            if (typeof this.draw === 'function') this.draw();
            return;
        }

        // Update Nav
        if (this.nav && this.ship) {
            // Nav follows player with some delay/bobbing
            this.nav.animTimer += dtMs * 0.005;
            let bobX = Math.sin(this.nav.animTimer * 0.8) * 20;
            let bobY = Math.cos(this.nav.animTimer * 1.2) * 20;
            
            // Target position is behind/to the side of player
            let followDist = 60;
            let followAngle = (this.ship.angle || 0) + Math.PI * 0.8;
            this.nav.targetX = this.ship.x + Math.cos(followAngle) * followDist + bobX;
            this.nav.targetY = this.ship.y + Math.sin(followAngle) * followDist + bobY;
            
            // Smoothly move Nav to target
            this.nav.x += (this.nav.targetX - this.nav.x) * 0.1;
            this.nav.y += (this.nav.targetY - this.nav.y) * 0.1;
            
            // Shooting logic
            if (this.nav.cooldown > 0) {
                this.nav.cooldown -= dtMs;
            } else if (this.enemies && this.enemies.length > 0) {
                // Find closest alive enemy
                let closestEnemy = null;
                let minDist = Infinity;
                for (let e of this.enemies) {
                    if (e && e.alive) {
                        let d = Math.hypot(e.x - this.nav.x, e.y - this.nav.y);
                        if (d < minDist) {
                            minDist = d;
                            closestEnemy = e;
                        }
                    }
                }
                
                if (closestEnemy && minDist < 1000) {
                    // Shoot fireball
                    let ang = Math.atan2(closestEnemy.y - this.nav.y, closestEnemy.x - this.nav.x);
                    let spd = 14;
                    this.bullets.push({
                        x: this.nav.x,
                        y: this.nav.y,
                        vx: Math.cos(ang) * spd,
                        vy: Math.sin(ang) * spd,
                        life: 220,
                        damage: 10 * (this.upgradeEffects.attackDamage || 1),
                        navFireball: true,
                        color: '#a040ff'
                    });
                    this.nav.cooldown = 250; // Roughly 1.33 shots per second
                }
            }
        }

        // Pre-update: simple boss AI for ritualSpirit
        try {
            if (this.enemies && this.enemies.length) {
                for (let enemy of this.enemies) {
                    if (!enemy || !enemy.alive) continue;
                    if (enemy.type !== 'ritualSpirit') continue;

                    // init
                    if (!enemy._init) {
                        enemy._init = true;
                        enemy.phase = 1;
                        enemy.state = 'idle';
                        enemy.attackTimer = 90;
                        enemy._barrageTimer = 0; enemy._barrageTick = 0;
                        enemy._chargeTimer = 0; enemy._chargeTick = 0;
                        enemy._dashTimer = 0; enemy._dashTick = 0; enemy._dashPrep = 0; enemy._dashTargetX = null; enemy._dashTargetY = null; enemy._dashStartX = null; enemy._dashStartY = null; enemy._dashProgress = 0; enemy._swordTrail = [];
                        // new abilities
                        enemy._bladeTimer = 0; enemy._bladeTick = 0; enemy._bladePrep = 0; enemy._bladeLines = [];
                        enemy._ringTimer = 0; enemy._ringTick = 0;
                        enemy._teleportTimer = 0; enemy._teleportPrep = 0; enemy._teleportTarget = null;
                        enemy._laserTimer = 0; enemy._laserTotal = 180; enemy._laserAngle = 0;
                        enemy._anim = enemy._anim || 0;
                    }

                    // animate
                    enemy._anim = (enemy._anim || 0) + 1;

                    // phase by health with enhanced transition system
                    let pct = (enemy.health || 0) / Math.max(1, enemy.maxHealth || 1);
                    let newPhase = pct > 0.4 ? 1 : (pct > 0 ? 2 : 3);
                    if (newPhase !== enemy.phase) {
                        // Use the phase transition manager
                        if (this.phaseManager && this.phaseManager.triggerPhaseTransition(enemy, newPhase)) {
                            enemy.phase = newPhase;
                            enemy.state = 'idle';
                            enemy.attackTimer = 60;
                        }
                    }
                    
                    // Update phase transition if in progress
                    if (this.phaseManager) {
                        this.phaseManager.updateTransition(dtMs, enemy);
                    }
                    
                    // Skip attack logic if in transition or invulnerable
                    if (enemy._invulnerable || (this.phaseManager && this.phaseManager.isInTransition())) {
                        continue;
                    }
                    
                    // Continuously emit aura particles based on phase (further reduced frequency)
                    if (this.effectsManager && Math.random() < 0.05) {
                        const auraCount = Math.max(1, Math.floor((enemy.phase || 1) * 0.5));
                        this.effectsManager.createParticles('auraParticle', 
                            enemy.x + (Math.random() - 0.5) * enemy.radius * 2, 
                            enemy.y + (Math.random() - 0.5) * enemy.radius * 2, 
                            auraCount);
                    }

                    // decrement timers
                    enemy.attackTimer = (typeof enemy.attackTimer === 'number') ? enemy.attackTimer - 1 : 0;
                    if (enemy._barrageTimer > 0) enemy._barrageTimer--;
                    if (enemy._chargeTimer > 0) enemy._chargeTimer--;
                    if (enemy._dashTimer > 0) enemy._dashTimer--;
                    if (enemy._dashPrep > 0) enemy._dashPrep--;
                    if (enemy._summonTimer > 0) enemy._summonTimer--;
                    if (enemy._bladeTimer > 0) enemy._bladeTimer--;
                    if (enemy._bladePrep > 0) enemy._bladePrep--;
                    if (enemy._ringTimer > 0) enemy._ringTimer--;
                    if (enemy._ringTick > 0) enemy._ringTick--;
                    if (enemy._teleportTimer > 0) enemy._teleportTimer--;
                    if (enemy._teleportPrep > 0) enemy._teleportPrep--;
                    if (enemy._laserTimer > 0) enemy._laserTimer--;

                    // choose attacks
                    if (enemy.attackTimer <= 0) {
                        enemy.attackTimer = 70 + Math.floor(Math.random() * 80);
                        let options = ['orbBarrage','charge','dashAttack','spectralBlades'];
                        if (enemy.phase >= 2) options = options.concat(['pulse','summonMinions','ringOfSpirits','teleportStrike']);
                        if (enemy.phase >= 3) options = options.concat(['laserSweep','ringOfSpirits','spectralBlades']);

                        if (enemy.phase >= 3 && Math.random() < 0.35) {
                            // phase 3: multiple overlapping effects
                            enemy._barrageTimer = 200;
                            enemy._dashTimer = 140;
                            enemy._pulseTimer = 160;
                            enemy._bladeTimer = 220;
                            enemy._ringTimer = 240;
                        } else {
                            let a = options[Math.floor(Math.random() * options.length)];
                            if (a === 'orbBarrage') enemy._barrageTimer = 160;
                            if (a === 'charge') enemy._chargeTimer = 80;
                            if (a === 'dashAttack') { enemy._dashPrep = 60; enemy._dashTimer = 80; }
                            if (a === 'pulse') enemy._pulseTimer = 40;
                            if (a === 'summonMinions') enemy._summonTimer = 1;
                            if (a === 'spectralBlades') { enemy._bladePrep = 40; enemy._bladeTimer = 180; }
                            if (a === 'ringOfSpirits') { enemy._ringTimer = 220; }
                            if (a === 'teleportStrike') { enemy._teleportPrep = 36; }
                            if (a === 'laserSweep') { 
                                enemy._laserTotal = 220; 
                                enemy._laserTimer = enemy._laserTotal; 
                                enemy._laserAngle = Math.atan2((this.ship?this.ship.y:0) - enemy.y, (this.ship?this.ship.x:0) - enemy.x) + (Math.random()-0.5)*0.6;
                                
                                // Create enhanced laser telegraph
                                if (this.telegraphSystem) {
                                    const beamLength = Math.max(this.width, this.height) * 1.5;
                                    const beamEndX = enemy.x + Math.cos(enemy._laserAngle) * beamLength;
                                    const beamEndY = enemy.y + Math.sin(enemy._laserAngle) * beamLength;
                                    this.telegraphSystem.createLineTelegraph(
                                        enemy.x, enemy.y, beamEndX, beamEndY,
                                        1800, // 1.8 second warning
                                        '#dcccff'
                                    );
                                }
                            }
                        }
                    }

                    // Orb barrage: periodic radial bursts
                    if (enemy._barrageTimer > 0) {
                        enemy._barrageTick = (enemy._barrageTick || 0) + 1;
                        if (enemy._barrageTick >= 12) {
                            enemy._barrageTick = 0;
                            let pieces = 8;
                            for (let i = 0; i < pieces; i++) {
                                let ang = (i / pieces) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
                                let spd = 6 + Math.random() * 2;
                                this.bullets.push({ x: enemy.x, y: enemy.y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, life: 200, damage: 4.5 * (this.upgradeEffects.attackDamage || 1), pierce: 0, fromEnemy: true, ritualOrb: true });
                            }
                            // Add energy burst particles
                            if (this.effectsManager) {
                                this.effectsManager.createParticles('energyBurst', enemy.x, enemy.y, 15, { spread: 20 });
                            }
                        }
                    }

                    // Spectral blades: telegraph then bursts of fast blades aimed at player
                    if (enemy._bladePrep > 0) {
                        // Create enhanced telegraph lines using the new system
                        if (!enemy._bladeTelegraphsCreated) {
                            enemy._bladeTelegraphsCreated = true;
                            let pieces = 1 + (enemy.phase || 2) * 1;
                            for (let i = 0; i < pieces; i++) {
                                let ang = (i / pieces) * Math.PI * 2 + (Math.random() - 0.5) * 0.18;
                                let tx = enemy.x + Math.cos(ang) * Math.max(this.width, this.height);
                                let ty = enemy.y + Math.sin(ang) * Math.max(this.width, this.height);
                                
                                if (this.telegraphSystem) {
                                    this.telegraphSystem.createLineTelegraph(
                                        enemy.x, enemy.y, tx, ty, 
                                        enemy._bladePrep * 16.67, // Convert to milliseconds
                                        '#b4ebff'
                                    );
                                }
                            }
                        }
                    } else {
                        enemy._bladeTelegraphsCreated = false;
                    }
                    if (enemy._bladeTimer > 0) {
                        enemy._bladeTick = (enemy._bladeTick || 0) + 1;
                        if (enemy._bladeTick >= 8) {
                            enemy._bladeTick = 0;
                            let pieces = 2 + (enemy.phase || 1);
                            for (let i = 0; i < pieces; i++) {
                                let aim = Math.atan2((this.ship?this.ship.y:enemy.y) - enemy.y, (this.ship?this.ship.x:enemy.x) - enemy.x);
                                let spread = (i - (pieces - 1) / 2) * 0.08;
                                let ang = aim + spread + (Math.random() - 0.5) * 0.02;
                                let spd = 12 + Math.random() * 4;
                                this.bullets.push({ x: enemy.x + Math.cos(ang) * enemy.radius, y: enemy.y + Math.sin(ang) * enemy.radius, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, life: 120, damage: 6.5 * (this.upgradeEffects.attackDamage || 1), pierce: 0, fast: true, fromEnemy: true, ritualBlade: true });
                            }
                            // Add impact spark particles at blade spawn
                            if (this.effectsManager) {
                                this.effectsManager.createParticles('impactSpark', enemy.x, enemy.y, 8, { spread: 30 });
                            }
                        }
                    } else enemy._bladeLines = [];

                    // Ring of spirits: spawn homing orbs that circle outward with tactical positioning
                    if (enemy._ringTimer > 0) {
                        enemy._ringTick = (enemy._ringTick || 0) + 1;
                        if (enemy._ringTick >= 20) {
                            enemy._ringTick = 0;
                            
                            // Strategic positioning: create patterns that challenge player movement
                            let playerAngle = this.ship ? Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x) : 0;
                            let ringPhase = (enemy._ringTimer / 220) * Math.PI * 2; // Full rotation over attack duration
                            
                            // Create 3 orbs in a tactical formation
                            for (let i = 0; i < 3; i++) {
                                // Position orbs to create escape route challenges
                                let baseAngle = playerAngle + (i - 1) * 0.8 + Math.sin(ringPhase + i) * 0.4;
                                let spd = 2.4 + Math.random() * 1.6;
                                
                                // Spawn position with slight randomization
                                let spawnRadius = enemy.radius + 20;
                                let spawnX = enemy.x + Math.cos(baseAngle) * spawnRadius;
                                let spawnY = enemy.y + Math.sin(baseAngle) * spawnRadius;
                                
                                this.bullets.push({ 
                                    x: spawnX, y: spawnY, 
                                    vx: Math.cos(baseAngle) * spd, 
                                    vy: Math.sin(baseAngle) * spd, 
                                    life: 360, 
                                    damage: 3 * (this.upgradeEffects.attackDamage || 1), 
                                    homing: true, 
                                    fromEnemy: true, 
                                    ritualOrb: true 
                                });
                                
                                // Add spawn effect for each orb
                                if (this.effectsManager) {
                                    this.effectsManager.createParticles('energyBurst', spawnX, spawnY, 5, { spread: 10 });
                                }
                            }
                            
                            // Add ring formation visual effect
                            if (this.effectsManager && enemy._ringTick === 0) {
                                this.effectsManager.createParticles('auraParticle', enemy.x, enemy.y, 8, { spread: 60 });
                            }
                        }
                    }

                    // Teleport strike: show target prep, then warp and slash
                    if (enemy._teleportPrep > 0) {
                        // pick a target once
                        if (!enemy._teleportTarget) {
                            let tx = (this.ship ? this.ship.x : (this.width / 2)) + (Math.random() - 0.5) * 160;
                            let ty = (this.ship ? this.ship.y : (this.height / 2)) + (Math.random() - 0.5) * 120;
                            enemy._teleportTarget = { x: Math.max(40, Math.min(this.width - 40, tx)), y: Math.max(40, Math.min(this.height - 40, ty)) };
                            
                            // Create enhanced telegraph for teleport target
                            if (this.telegraphSystem) {
                                this.telegraphSystem.createCircleTelegraph(
                                    enemy._teleportTarget.x, enemy._teleportTarget.y, 
                                    40, enemy._teleportPrep * 16.67, '#c8faff'
                                );
                            }
                        }
                        // when prep finishes, teleport and do a fast radial slash
                        if (enemy._teleportPrep <= 1) {
                            // teleport
                            enemy.x = enemy._teleportTarget.x; enemy.y = enemy._teleportTarget.y;
                            enemy._teleportTarget = null;
                            // slash
                            let pieces = 36;
                            for (let i = 0; i < pieces; i++) {
                                let ang = (i / pieces) * Math.PI * 2 + (Math.random() - 0.5) * 0.06;
                                let spd = 7 + Math.random() * 3;
                                this.bullets.push({ x: enemy.x + Math.cos(ang) * (enemy.radius + 6), y: enemy.y + Math.sin(ang) * (enemy.radius + 6), vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, life: 160, damage: 5 * (this.upgradeEffects.attackDamage || 1), fromEnemy: true, ritualBlade: true });
                            }
                            // Add dramatic teleport effects (reduced flash)
                            if (this.effectsManager) {
                                this.effectsManager.createParticles('phaseTransition', enemy.x, enemy.y, 25, { spread: 50 });
                                this.effectsManager.addScreenShake(8, 300);
                                // Removed excessive teleport flash effect per user feedback
                            }
                        }
                    }

                    // Laser sweep is handled by _laserTimer/Angle; actual beam visual is drawn in draw(), and here we can spawn a damaging core when it completes
                    if (enemy._laserTimer === 1) {
                        // finalize: spawn fast heavy projectiles along beam direction
                        let angle = enemy._laserAngle || 0;
                        let beamPieces = 26;
                        for (let i = 0; i < beamPieces; i++) {
                            let r = (i / beamPieces) * Math.max(this.width, this.height) * 0.9;
                            let x = enemy.x + Math.cos(angle) * r;
                            let y = enemy.y + Math.sin(angle) * r;
                            // small explosive projectiles outward
                            let spread = (Math.random() - 0.5) * 0.6;
                            this.bullets.push({ x: x, y: y, vx: Math.cos(angle + spread) * 6, vy: Math.sin(angle + spread) * 6, life: 180, damage: 6.5 * (this.upgradeEffects.attackDamage || 1), fromEnemy: true, ritualBlade: true });
                        }
                        
                        // Add dramatic completion effects (reduced screen shake)
                        if (this.effectsManager) {
                            this.effectsManager.addScreenShake(6, 300);
                            this.effectsManager.createParticles('impactSpark', enemy.x, enemy.y, 20, { spread: 40 });
                            
                            // Create residual energy effects along the beam path
                            for (let i = 0; i < 8; i++) {
                                let r = (i / 8) * Math.max(this.width, this.height) * 0.7;
                                let x = enemy.x + Math.cos(angle) * r;
                                let y = enemy.y + Math.sin(angle) * r;
                                this.effectsManager.createParticles('energyBurst', x, y, 3, { spread: 15 });
                            }
                        }
                    }

                    // Dash Attack with Visual Sword: boss dashes toward player with a sword trail
                    if (enemy._dashTimer > 0 && this.ship) {
                        enemy._dashTick = (enemy._dashTick || 0) + 1;
                        
                        // Telegraph the dash
                        if (enemy._dashPrep > 0) {
                            enemy._dashPrep--;
                            // Store target position
                            if (!enemy._dashTargetX) {
                                enemy._dashTargetX = this.ship.x;
                                enemy._dashTargetY = this.ship.y;
                                
                                // Create enhanced dash telegraph
                                if (this.telegraphSystem) {
                                    this.telegraphSystem.createLineTelegraph(
                                        enemy.x, enemy.y, enemy._dashTargetX, enemy._dashTargetY,
                                        enemy._dashPrep * 16.67, // Convert to milliseconds
                                        '#ffaa66'
                                    );
                                }
                            }
                        } else {
                            // Execute the dash
                            if (!enemy._dashStartX) {
                                enemy._dashStartX = enemy.x;
                                enemy._dashStartY = enemy.y;
                                enemy._dashProgress = 0;
                            }
                            
                            enemy._dashProgress += 0.05;
                            if (enemy._dashProgress >= 1) {
                                enemy._dashTimer = 0;
                                enemy._dashStartX = null;
                                enemy._dashStartX = null;
                                enemy._dashTargetX = null;
                                enemy._dashTargetY = null;
                                enemy._dashProgress = 0;
                                enemy._swordTrail = [];
                            } else {
                                // Lerp position
                                enemy.x = enemy._dashStartX + (enemy._dashTargetX - enemy._dashStartX) * enemy._dashProgress;
                                enemy.y = enemy._dashStartY + (enemy._dashTargetY - enemy._dashStartY) * enemy._dashProgress;
                                
                                // Add sword trail effect
                                if (!enemy._swordTrail) enemy._swordTrail = [];
                                enemy._swordTrail.push({
                                    x: enemy.x, y: enemy.y,
                                    alpha: 1.0,
                                    angle: Math.atan2(enemy._dashTargetY - enemy._dashStartY, enemy._dashTargetX - enemy._dashStartX)
                                });
                                
                                // Damage player if close
                                if (this.ship) {
                                    let dx = this.ship.x - enemy.x;
                                    let dy = this.ship.y - enemy.y;
                                    let dist = Math.sqrt(dx * dx + dy * dy);
                                    if (dist < enemy.radius + 30) {
                                        this.takeDamage(3.5 * (this.upgradeEffects.attackDamage || 1)); // Reduced from 14 to 3.5 (4x less)
                                    }
                                }
                            }
                        }
                    }

                    // Summon small spirits (simple minions)
                    if (enemy._summonTimer > 0) {
                        enemy._summonTimer = 0;
                        for (let i = 0; i < 3; i++) {
                            let a = Math.random() * Math.PI * 2;
                            let r = (enemy.radius || 64) * (0.6 + Math.random() * 0.6);
                            let ne = { type: 'ritualMinion', x: enemy.x + Math.cos(a) * r, y: enemy.y + Math.sin(a) * r, vx: (Math.random()-0.5)*1.5, vy:(Math.random()-0.5)*1.5, radius:18, health:200, maxHealth:200, alive:true };
                            this.enemies.push(ne);
                        }
                    }

                    // keep boss on-screen
                    if (enemy.x < enemy.radius) enemy.x = enemy.radius;
                    if (enemy.x > this.width - enemy.radius) enemy.x = this.width - enemy.radius;
                    if (enemy.y < enemy.radius) enemy.y = enemy.radius;
                    if (enemy.y > this.height - enemy.radius) enemy.y = this.height - enemy.radius;

                    // death handling
                    if (enemy.alive && enemy.health <= 0) {
                        enemy.alive = false;
                        this.bossActive = false;
                        
                        // Add dramatic death effects (reduced intensity)
                        if (this.effectsManager) {
                            this.effectsManager.createParticles('phaseTransition', enemy.x, enemy.y, 50, { spread: 120 });
                            this.effectsManager.createParticles('energyBurst', enemy.x, enemy.y, 30, { spread: 100 });
                            this.effectsManager.addScreenShake(8, 600);
                            // Removed excessive death flash effect per user feedback
                        }
                        
                        try { if (typeof this.exitFullscreenBossMode === 'function') this.exitFullscreenBossMode(); } catch (e) {}
                        player.cbs.ascensionShards = player.cbs.ascensionShards.add(1)
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
                        player.ir.battleLevel = new Decimal(0)

                        player.cbs.inBattle = false
                        player.cbs.ritualSpiritActive = false

                        pauseUniverseAll(["DS", "A2"], "unpause", true)
                    }
                }
            }
        } catch (e) { console.warn('RitualArena boss AI error', e); }

        // simple minion/orb behaviour so they feel alive
        if (this.enemies && this.enemies.length) {
            for (let m of this.enemies) {
                if (!m || !m.alive) continue;
                if (m.type === 'ritualMinion') {
                    m._anim = (m._anim || 0) + 1;
                    m.x += (m.vx || 0);
                    m.y += (m.vy || 0);
                    // mild homing towards player if close
                    if (this.ship) {
                        let dx = this.ship.x - m.x, dy = this.ship.y - m.y;
                        let dist = Math.hypot(dx, dy) || 1;
                        if (dist < 10000) {
                            m.vx += (dx / dist) * 0.16;
                            m.vy += (dy / dist) * 0.16;
                        }
                        m.vx *= 0.99; m.vy *= 0.99;
                    }
                }
                if (m.type === 'ritualOrb') {
                    m._anim = (m._anim || 0) + 1;
                    // slowly home to player
                    if (this.ship) {
                        let ang = Math.atan2(this.ship.y - m.y, this.ship.x - m.x);
                        m.vx += Math.cos(ang) * 0.06; m.vy += Math.sin(ang) * 0.06;
                        m.vx *= 0.985; m.vy *= 0.985;
                        m.x += m.vx; m.y += m.vy;
                    }
                }
            }
        }

        // let base class handle bullets, collisions and drawing
        if (typeof super.update === 'function') super.update(delta);
        try {
            if (player && player.cbs) {
                const bossAlive = !!(this.bossActive && this.enemies && this.enemies.some(e => e && e.type === 'ritualSpirit' && e.alive));
                player.cbs.ritualSpiritActive = bossAlive;
            }
        } catch (e) {}
    }
}

/*
             player.ir.inBattle = true
                options.fullscreen = true
                player.subtabs["cbs"]['stuff'] = 'Battle'

                arena = new RitualArena(1800, 600);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                player.ir.shipHealth = player.ir.shipHealthMax
                if (hasUpgrade("ir", 14)) arena.upgradeEffects.hpRegen += 0.5 / 60

                arena.upgradeEffects.attackDamage *= levelableEffect("ir", player.ir.shipType)[2]
                pauseUniverseAll(["DS", "A2"], "pause", true)
*/

//alternatively make the ritual a bullet hell attack

// Global helper to summon the ritual spirit boss from anywhere.
function summonSpirit() {
    try {
        // Ensure we have a RitualArena instance
        if (!(arena && arena.constructor && arena.constructor.name === 'RitualArena')) {
            try {
                arena = new RitualArena((typeof window !== 'undefined' && window.innerWidth) ? window.innerWidth : 1800, (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 600);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');
            } catch (e) { console.warn('failed to create RitualArena', e); }
        }

        if (!arena) return;

        // prevent duplicate boss
        if (arena.enemies && arena.enemies.some(e => e && e.type === 'ritualSpirit' && e.alive)) return;

        // set player battle state if available
        try {
            if (player) {
                player.ir.inBattle = true;
                if (options) {
                    options.fullscreen = true;
                }
                player.subtabs = player.subtabs || {};
                player.subtabs["cbs"] = player.subtabs["cbs"] || {};
                player.subtabs["cbs"]["stuff"] = 'Battle';
            }
        } catch (e) {}

        // clear existing enemies and spawn the ritualSpirit
        arena.enemies = arena.enemies || [];
        for (let e of arena.enemies) if (e) e.alive = false;
        arena.enemies.length = 0;

        let angle = Math.random() * Math.PI * 2;
        let dist = Math.max(arena.width, arena.height) * 0.35;
        let ex = Math.round(arena.width / 2 + Math.cos(angle) * dist);
        let ey = Math.round(arena.height / 2 + Math.sin(angle) * dist);
        ex = Math.max(80, Math.min(arena.width - 80, ex));
        ey = Math.max(80, Math.min(arena.height - 80, ey));

        let boss = {
            type: 'ritualSpirit',
            x: ex, y: ey, vx: 0, vy: 0,
            radius: 64,
            color: '#88eaff',
            health: 25000,
            maxHealth: 25000,
            alive: true,
            phase: 1,
            _phaseConfig: {
                auraIntensity: 1.0,
                glowColor: '#88eaff',
                scaleModifier: 1.0
            },
            state: 'idle',
            attackTimer: 90,
            _barrageTimer: 0,
            _barrageTick: 0,
            _chargeTimer: 0,
            _chargeTick: 0,
            _pulseTimer: 0,
            _homingTimer: 0,
            _summonTimer: 0,
        };

        arena.enemies.push(boss);
        arena.bossActive = true;
        try { if (player && player.cbs) player.cbs.ritualSpiritActive = true; } catch (e) {}
        // expand arena to full-screen for boss
        try { if (typeof arena.enterFullscreenBossMode === 'function') arena.enterFullscreenBossMode(); } catch (e) {}
        try { if (player && player.cbs) player.cbs.inBattle = true; } catch (e) {}
    } catch (e) { console.warn('summonSpirit global failed', e); }
}

try { if (typeof window !== 'undefined') window.summonSpirit = summonSpirit; } catch (e) {}