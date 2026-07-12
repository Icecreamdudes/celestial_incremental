
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
        11: {
            title() { return player.cbs.ritualSpiritCooldown.lte(0) ? "<h2>Ritual<br><h4>Cost: " + formatWhole(player.cbs.ritualCosts[0]) + " Evolution Shards<br><h4>" + formatWhole(player.cbs.ritualCosts[1]) + " Paragon Shards" : "<h2>Check back in " + formatTime(player.cbs.ritualSpiritCooldown)},
            canClick() { return player.cb.evolutionShards.gte(player.cbs.ritualCosts[0]) && player.cb.paragonShards.gte(player.cbs.ritualCosts[1]) && player.cbs.ritualSpiritCooldown.lte(0) }, //change this eventually
            unlocked() { return true },
            tooltip() { return "Gives +4 movement speed, +2 HP/sec, and 40% damage reduction." },
            onClick() {
                player.ir.inBattle = true
                options.fullscreen = true
                player.subtabs["cbs"]['stuff'] = 'Battle'

                arena = new RitualArena(800, 800, 3200, 3200);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                player.ir.shipHealth = player.ir.shipHealthMax
                if (hasUpgrade("ir", 14)) arena.upgrades.healthRegenUncommon += 1
                arena.upgrades.moveSpeedLegendary += 1
                arena.upgrades.healthRegenUncommon += 2
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
                content() { return [["layer-proxy", ["ir", [
                    ["style-column", [], {height: (arena && arena._iriditeFullscreen) ? "10px" : "0"}],
                    ["style-column", [
                        ["raw-html", "Level " + formatWhole(player.ir.battleLevel) + "<span style='font-size:16px'> / " + formatWhole(SB_zones[player.ir.battleStage].levelLimit) + "</span>", { "color": "white", textShadow: "0 0 10px white", "font-size": "24px", "font-family": "monospace", lineHeight: "1" }],
                        ["style-row", [
                            ["raw-html", "<small>[SOFTCAP: x" + format(player.ir.levelScalingMult) + " Asteroid and Celestialite Stats]</small>", { "color": "red", textShadow: "0 0 10px red", "font-size": "16px", "font-family": "monospace", marginLeft: "6px", marginRight: "6px" }],
                        ], {lineHeight: "1", marginLeft: "6px", marginRight: "6px", display: player.ir.battleLevel.gte(player[player.ir.battleStage].levelScalingStart) ? "" : "none !important"}]
                    ], {width: "800px", height: "50px", background: "#00334d", borderRadius: "13px 13px 0 0", border: "3px solid #004d73", borderBottom: "0", display: (arena && arena._iriditeFullscreen) ? "none !important" : ""}],
                    ["row", [["ex-bar", "healthBar"], ["ex-bar", "xpBar"],]],
                    ["style-column", [], {height: (arena && arena._iriditeFullscreen) ? "calc(100vh - 279px)" : "800px"}],
                    ["row", [["ex-bar", "bossHealthBar"],]],
                    ["style-column", [
                        ["blank", "9px", {width: "6px"}],
                        ["raw-html", "Use W and S to more forwards or backwards, A to D to rotate, and Space or Mouse to shoot.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "9px", {width: "6px"}],
                        ["row", [
                            ["clickable", 12], ["blank", "6px", {width: "6px"}], ["clickable", 15], ["blank", "6px", {width: "6px"}], ["clickable", 16],
                        ]],
                    ], {width: (arena && arena._iriditeFullscreen) ? "calc(100vw - 6px)" : "800px", height: "100px", background: "#00334d", borderRadius: (arena && arena._iriditeFullscreen) ? "0px" : "0 0 13px 13px", border: "3px solid #004d73", borderTop: "0px"}],
                ]]]]}
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