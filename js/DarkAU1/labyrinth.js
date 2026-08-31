addLayer("anl", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>L", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        selectedRoom: "roomA",  
        selectedRoomDisplay: "Room A",

        celestialRadiation: new Decimal(0),
        clearedRooms: {
            roomA: false,
            roomB: false,
            roomC: false,
            roomTemple: false,
            roomD: false,
            roomE: false,
            roomF: false,
            roomG: false,
            roomH: false,
        },

        propertiesText: "",
        spawnTimer: new Decimal(0),
        boogieTimer: new Decimal(0),
        timeTimer: new Decimal(0),

        marcelTimeStop: false,
        timeStopTimer: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(180deg, #27501d 0%, #4b5721 100%)",
            backgroundOrigin: "border-box",
            color: "#daff74",
            transform: "translate(0px, 0px)"
        };
    },
    tooltip: "Labyrinth",
    branches: [["sr", "#daff74"], ["tr", "#daff74"], ["ani", "#daff74"]],
    color: "#27501d",
    update(delta) {

        if (player.aniciffoLabyrinth.inLabyrinth && player.tab == "anl")
        {
            player.tab = "bh"
        }
        if (player.bh.currentStage == "none"){
            player.anl.spawnTimer = new Decimal(0)
            player.anl.boogieTimer = new Decimal(0)
            player.anl.timeTimer = new Decimal(0)
        }

        if (player.anl.selectedRoom == "roomA")
        {
            player.anl.propertiesText = "None."
        } else if (player.anl.selectedRoom == "roomB")
        {
            player.anl.propertiesText = "Radiation spawns every 3 seconds.<br>(Unaffected by time multipliers)"
        } else if (player.anl.selectedRoom == "roomC")
        {
            player.anl.propertiesText = "Radiation spawns every 3 seconds.<br>(Unaffected by time multipliers)"
        } else if (player.anl.selectedRoom == "roomTemple")
        {
            player.anl.propertiesText = "Eclipse, pass my challenge and you will be worthy."
        } else if (player.anl.selectedRoom == "roomD")
        {
            player.anl.propertiesText = "Regen is halved for all characters. (Womp womp)"
        } else if (player.anl.selectedRoom == "roomE")
        {
            player.anl.propertiesText = "Radiation spawns every 3 seconds.<br>(Unaffected by time multipliers)<br><br>Max health is multiplied by x0.75."
        } else if (player.anl.selectedRoom == "roomF")
        {
            player.anl.propertiesText = "Forced green soul attacks every 20 seconds.<br>(Unaffected by time multipliers)<br><br>Divide incremental energy gain by /1.5"
        } else if (player.anl.selectedRoom == "roomG")
        {
            player.anl.propertiesText = "Forced green soul attacks every 20 seconds.<br>(Unaffected by time multipliers)<br><br>Divide incremental energy gain by /1.5<br><br>Marcel helps you out with this stage..."
        } else if (player.anl.selectedRoom == "roomH")
        {
            player.anl.propertiesText = "A review of all previous room's minibosses.<br><br>Divide incremental energy gain by /2<br><br>Marcel helps you out with this stage..."
        }

        if ((player.bh.currentStage == "roomB" || player.bh.currentStage == "roomC" || player.bh.currentStage == "roomE") && !player.bh.bhPause && !player.anl.marcelTimeStop)
        {
            player.anl.spawnTimer = player.anl.spawnTimer.add(delta)
            if (player.anl.spawnTimer.gte(3))
            {
                makeShinies(deadlyRadiation, 1)
                player.anl.spawnTimer = new Decimal(0)
            }
        }
        if ((player.bh.currentStage == "roomG" || player.bh.currentStage == "roomH") && !player.bh.bhPause && !player.anl.marcelTimeStop)
        {
            player.anl.timeTimer = player.anl.timeTimer.add(delta)
            if (player.anl.timeTimer.gte(20))
            {
                makeShinies(marcelTimeStop, 1)
                player.anl.timeTimer = new Decimal(0)
            }
        }
        if ((inChallenge("anl", 13)||inChallenge("anl", 15)) && !player.bh.bhPause && player.aniciffoLabyrinth.inLabyrinth && !player.bh.bulletHell && player.bh.celestialite.id != "none" && !player.anl.marcelTimeStop)
        {
            player.anl.boogieTimer = player.anl.boogieTimer.add(delta)
            if (player.anl.boogieTimer.gte(8))
            {
                if (inChallenge("anl", 13)) {
                let random = getRandomInt(7)
                if (random == 0) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 3, spearSpeed: 3, spearLength: 80, spearWidth: 12, noRepeatDir: true, fourDir: false}}, {width:500, height:500, duration:12})
                } else if (random == 1) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 1, spearSpeed: 4, spearLength: 80, spearWidth: 12, yellowChance: 1, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 2) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 2, spearSpeed: 3, spearLength: 80, spearWidth: 12, yellowChance: 0.4, orbitSpeed: 0.12, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 3) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 2, spearSpeed: 3, spearLength: 80, spearWidth: 12, yellowChance: 0.1, redChance: 0.2, orbitSpeed: 0.12, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 4) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 4, spearSpeed: 4, spearLength: 80, spearWidth: 12, noRepeatDir: true, fourDir: true}}, {width:500, height:500, duration:12})
                } else if (random == 5) {
                    bulletHellGreen({
                    "greenSpearChoreography": {
                    loop: true,
                    sequence: [
                    { delay: 175, dir: 0, speed: 4, loop: true, yellow: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    { delay: 350, dir: 2, speed: 4, loop: true, yellow: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    { delay: 525, dir: 4, speed: 4, loop: true, yellow: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    { delay: 700, dir: 6, speed: 4, loop: true, yellow: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    ]
                    }
                    }, { width: 500, height: 500, duration: 18 }) 
                } else if (random == 6) {
                    bulletHellGreen({
                    "greenSpearChoreography": {
                    loop: true,
                    sequence: [
                    { delay: 250, dir: 0, speed: 4, loop: true, yellow: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    { delay: 500, dir: 6, speed: 4, loop: true, yellow: true },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    { delay: 750, dir: 4, speed: 4, loop: true, yellow: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    { delay: 1000, dir: 2, speed: 4, loop: true, yellow: true },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    ]
                    }
                    }, { width: 500, height: 500, duration: 18 }) 
                }
                } else if (inChallenge("anl", 15)) {
                    let random = getRandomInt(7)
                    if (random == 0) {
                        bulletHellGreen({"greenSpearRain": {spearPerSec: 2, spearSpeed: 4, spearLength: 80, spearWidth: 12, blueChance: 1, fourDir: false}}, {width:500, height:500, duration:16})
                    } else if (random == 1) {
                        bulletHellGreen({"greenSpearRain": {spearPerSec: 3, spearSpeed: 4, spearLength: 80, spearWidth: 12, blueChance: 0.5, redChance: 0.5, fourDir: true}}, {width:500, height:500, duration:16})
                    } else if (random == 2) {
                        bulletHellGreen({
                        "greenSpearChoreography": {
                        loop: true,
                        sequence: [
                        { delay: 200, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 400, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 600, dir: 2, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 800, dir: 2, speed: 4, loop: true, blue: true },     
                        { delay: 1000, dir: 4, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 1200, dir: 4, speed: 4, loop: true, blue: true },    
                        { delay: 1400, dir: 6, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 1600, dir: 6, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                        ]
                        }
                        }, { width: 500, height: 500, duration: 18 }) 
                    } else if (random == 3) {
                        bulletHellGreen({
                        "greenSpearChoreography": {
                        loop: true,
                        sequence: [
                        { delay: 200, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 400, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 600, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 800, dir: 0, speed: 4, loop: true, blue: true },     
                        { delay: 1000, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 1200, dir: 0, speed: 4, loop: true, blue: true },    
                        { delay: 1400, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 1600, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                        ]
                        }
                        }, { width: 500, height: 500, duration: 18 }) 
                    } else if (random == 4) {
                        bulletHellGreen({"greenSpearRain": {spearPerSec: 4, spearSpeed: 4, spearLength: 80, spearWidth: 12, blueChance: 1,fourDir: true}}, {width:500, height:500, duration:16})
                    } else if (random == 5) {
                        bulletHellGreen({"greenSpearRain": {spearPerSec: 2, spearSpeed: 4, spearLength: 80, spearWidth: 12, yellowChance: 1,  blueChance: 0.6, yellowChance: 0.4, orbitSpeed: 0.4, fourDir: false}}, {width:500, height:500, duration:16})
                    } else if (random == 6) {
                        bulletHellGreen({"greenSpearRain": {spearPerSec: 2, spearSpeed: 4, spearLength: 80, spearWidth: 12, yellowChance: 1,  blueChance: 0.25, yellowChance: 0.25, redChance: 0.25, fourDir: true}}, {width:500, height:500, duration:16})
                    }
                }
                player.anl.boogieTimer = new Decimal(0)
            }
        }
        if ((player.bh.currentStage == "roomF" || player.bh.currentStage == "roomG" ) && !player.bh.bhPause && player.aniciffoLabyrinth.inLabyrinth && !player.bh.bulletHell && player.bh.celestialite.id != "none" && !player.anl.marcelTimeStop)
        {
            player.anl.boogieTimer = player.anl.boogieTimer.add(delta)
            if (player.anl.boogieTimer.gte(20))
            {
                player.anl.boogieTimer = new Decimal(0)
                let random = getRandomInt(5)
                if (random == 0) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 4, spearSpeed: 4, spearLength: 80, spearWidth: 12, redChance: 0.5, noRepeatDir: true, fourDir: false}}, {width:500, height:500, duration:12})
                } else if (random == 1) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 2, spearSpeed: 6, spearLength: 80, spearWidth: 12, yellowChance: 0.1, noRepeatDir: true, fourDir: false}}, {width:500, height:500, duration:12})
                } else if (random == 2) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 1, spearSpeed: 4, spearLength: 80, spearWidth: 12, yellowChance: 1, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 3) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 3, spearSpeed: 4, spearLength: 80, spearWidth: 12, redChance: 0.5, yellowChance: 0.2, noRepeatDir: true, fourDir: false}}, {width:500, height:500, duration:15})
                } else if (random == 4) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 4, spearSpeed: 3, spearLength: 80, spearWidth: 12, noRepeatDir: true, fourDir: true}}, {width:500, height:500, duration:15})
                }
            }
        }

        if (player.anl.selectedRoom == "roomTemple" && (player.aniciffoLabyrinth.noxToggle || player.aniciffoLabyrinth.creationToggle))
        {
            player.anl.selectedRoom = "roomC"
            player.anl.selectedRoomDisplay = "Room C"
        }
        if (player.anl.selectedRoom == "roomC" && !(player.aniciffoLabyrinth.noxToggle || player.aniciffoLabyrinth.creationToggle) && player.anl.clearedRooms.roomC)
        {
            player.anl.selectedRoom = "roomTemple"
            player.anl.selectedRoomDisplay = "???"
        }

        if (player.universe == "U3" && player.musuniverse == "AD1") {
            player.universe = "AD1" //lazy fix
        }

        if (!player.bh.bhPause) player.anl.timeStopTimer = player.anl.timeStopTimer.sub(delta)
        if (player.anl.timeStopTimer.gt(0)) {
            player.anl.marcelTimeStop = true
        } else if (player.anl.timeStopTimer.lt(0) && player.anl.marcelTimeStop) {
            resumeZaWarudoTime()
            player.anl.marcelTimeStop = false
        } else {
            player.anl.marcelTimeStop = false
        }
    },
    clickables: {
    },
    bars: {},
    upgrades: {
        11: {
            title: "Meaningful Extension",
            unlocked: true,
            description: "Extends the incremental energy softcap by +5.",
            cost: new Decimal(6),
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                return look
            },
        },
        12: {
            title: "Meaningful Extension II",
            unlocked: true,
            description: "Extends the incremental energy softcap by +5.",
            cost: new Decimal(9),
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                return look
            },
        },
        13: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room B completion.</h3>"
                return "<h3>Strange Key</h3><br>Unlocks Room C.<br><br>Cost: 25 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(25),
            canAfford() { return player.anl.clearedRooms.roomB},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white",  margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        14: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room B completion.</h3>"
                return "<h3>Cheapstowal</h3><br>Divides bestowal buyable cost by /1.4.<br><br>Cost: 40 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(40),
            canAfford() { return player.anl.clearedRooms.roomB},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white",  margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        21: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room C and ??? completion.</h3>"
                return "<h3>Another Key</h3><br>Unlocks Room D.<br><br>Cost: 70 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(70),
            canAfford() { return player.anl.clearedRooms.roomC && player.anl.clearedRooms.roomTemple},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white",  margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        22: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room D completion.</h3>"
                return "<h3>Ascended Radiation</h3><br>There is a 0.01% chance that a dark radiation particle will spawn as an ascension shard.<br><br>Cost: 500 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(500),
            canAfford() { return player.anl.clearedRooms.roomD},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", fontSize: "9px", margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        23: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room D completion and another upgrade.</h3>"
                return "<h3>Ascended Radiation II</h3><br>Increase the ascension shard chance to 0.02%.<br><br>Cost: 2,500 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(2500),
            canAfford() { return player.anl.clearedRooms.roomD && hasUpgrade("anl", 22)},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white",  margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        31: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room E completion.</h3>"
                return "<h3>Ecliptical</h3><br>Increase Eclipse's base health by +10.<br><br>Cost: 100 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(100),
            canAfford() { return player.anl.clearedRooms.roomE},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white",  margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        32: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room E completion.</h3>"
                return "<h3>Totally Worthless</h3><br>x1.1 to incremental energy gain.<br><br>Cost: 250 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(250),
            canAfford() { return player.anl.clearedRooms.roomE},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white",  margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        33: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room F completion.</h3>"
                return "<h3>Potent Radiation</h3><br>+4 to base character potency.<br><br>Cost: 666 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(666),
            canAfford() { return player.anl.clearedRooms.roomF},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white",  margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        41: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room G completion.</h3>"
                return "<h3>Doomed</h3><br>Extend point doom softcap by x1e150,000.<br><br>Cost: 1,111 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(1111),
            canAfford() { return player.anl.clearedRooms.roomG},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white",  margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        42: {
            fullDisplay() {
                if (!this.canAfford()) return "<h3>Requires Room G completion.</h3>"
                return "<h3>Fragmented</h3><br>Boost all core fragment gain by x2.<br><br>Cost: 2,222 Celestial Radiation"
            },
            unlocked: true,
            cost: new Decimal(2222),
            canAfford() { return player.anl.clearedRooms.roomG},
            currencyLocation() { return player.anl },
            currencyDisplayName: "Celestial Radiation",
            currencyInternalName: "celestialRadiation",
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white",  margin: "2px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px",}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#455541"
                if (!this.canAfford()) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.anl.celestialRadiation},
            pay(amt) { player.anl.celestialRadiation = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(0.1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Radiation Therapy</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost base character health\n\
                    Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Celestial Radiation"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#455541"
                return look
            },
        },
        12: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.anl.celestialRadiation},
            pay(amt) { player.anl.celestialRadiation = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.5).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Starmetal Absorption</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100)\n\
                    Boost starmetal alloy gain.\n\
                    Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Celestial Radiation"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", fontSize: "9px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#455541"
                return look
            },
        },
        21: {
            costBase() { return new Decimal(14) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.anl.celestialRadiation},
            pay(amt) { player.anl.celestialRadiation = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.01).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())&& player.anl.clearedRooms.roomC},
            display() {
                if (!player.anl.clearedRooms.roomC) return "<h3>Requires Room C completion.</h3>"
                return "<h3>Radiation Relinquisher</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost dark radiation gain.\n\
                    Currently: ^" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Celestial Radiation"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", border: "3px solid rgba(0,0,0,0.5)", fontSize: "9px", margin: "2px", borderRadius: "15px",}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#455541"
                if (!player.anl.clearedRooms.roomC) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        22: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.08) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.anl.celestialRadiation},
            pay(amt) { player.anl.celestialRadiation = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(2).pow(2).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())&& player.anl.clearedRooms.roomD},
            display() {
                if (!player.anl.clearedRooms.roomD) return "<h3>Requires Room D completion.</h3>"
                return "<h3>Peace of Mind</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Boost mind radiation gain.\n\
                    Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Celestial Radiation"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", border: "3px solid rgba(0,0,0,0.5)", fontSize: "9px", margin: "2px", borderRadius: "15px",}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#455541"
                if (!player.anl.clearedRooms.roomD) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        23: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.08) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.anl.celestialRadiation},
            pay(amt) { player.anl.celestialRadiation = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(2).pow(2).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())&& player.anl.clearedRooms.roomD},
            display() {
                if (!player.anl.clearedRooms.roomD) return "<h3>Requires Room D completion.</h3>"
                return "<h3>Heart and Soul</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Boost heart radiation gain.\n\
                    Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Celestial Radiation"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", border: "3px solid rgba(0,0,0,0.5)", fontSize: "9px", margin: "2px", borderRadius: "15px",}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#455541"
                if (!player.anl.clearedRooms.roomD) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },

        31: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.05) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.anl.celestialRadiation},
            pay(amt) { player.anl.celestialRadiation = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(2).pow(1.5).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost()) && player.anl.clearedRooms.roomE},
            display() {
                if (!player.anl.clearedRooms.roomE) return "<h3>Requires Room E completion.</h3>"
                return "<h3>Decaybility</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/250)\n\
                    Boost decay and stability gain.\n\
                    Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Celestial Radiation"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", border: "3px solid rgba(0,0,0,0.5)", fontSize: "9px", margin: "2px", borderRadius: "15px",}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#455541"
                if (!player.anl.clearedRooms.roomE) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        32: {
            costBase() { return new Decimal(80) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.anl.celestialRadiation},
            pay(amt) { player.anl.celestialRadiation = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(0.1).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost()) && player.anl.clearedRooms.roomF},
            display() {
                if (!player.anl.clearedRooms.roomF) return "<h3>Requires Room F completion.</h3>"
                return "<h3>Faster Decay</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Divides dark radiation spawn time.\n\
                    Currently: /" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Celestial Radiation"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", border: "3px solid rgba(0,0,0,0.5)", fontSize: "9px", margin: "2px", borderRadius: "15px",}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#455541"
                if (!player.anl.clearedRooms.roomF) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        33: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.anl.celestialRadiation},
            pay(amt) { player.anl.celestialRadiation = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(5).pow(3).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost()) && player.anl.clearedRooms.roomF},
            display() {
                if (!player.anl.clearedRooms.roomF) return "<h3>Requires Room F completion.</h3>"
                return "<h3>Violet Resonance?</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100" + ")\n\
                    Boosts violet radiation gain.\n\
                    Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Celestial Radiation"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", border: "3px solid rgba(0,0,0,0.5)", fontSize: "9px", margin: "2px", borderRadius: "15px",}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#455541"
                if (!player.anl.clearedRooms.roomF) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
        41: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.anl.celestialRadiation},
            pay(amt) { player.anl.celestialRadiation = this.currency().sub(amt) },
            effect(x) {return Decimal.div(1, getBuyableAmount(this.layer, this.id).mul(0.02).add(1))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())&& player.anl.clearedRooms.roomG},
            display() {
                if (!player.anl.clearedRooms.roomG) return "<h3>Requires Room G completion.</h3>"
                return "<h3>Rage Inducing</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/25" + ")\n\
                    Reduce rage radiation bee requirement.\n\
                    Currently: ^" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Celestial Radiation"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {borderRadius: "15px", width: "120px", height: "120px", color: "white", border: "3px solid rgba(0,0,0,0.5)", fontSize: "9px", margin: "2px", borderRadius: "15px",}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#455541"
                if (!player.anl.clearedRooms.roomF) {look.background = "black";look.borderColor = "#3d4d39"}
                return look
            },
        },
    },
    hopeRageLevelReset() {
                player.sr.particleClick = new Decimal(0)

        player.tr.radiation.amount = new Decimal(0)
        player.tr.buyables[11] = new Decimal(0)
        player.tr.buyables[12] = new Decimal(0)
        player.tr.buyables[13] = new Decimal(0)
        player.tr.buyables[14] = new Decimal(0)
        player.tr.buyables[15] = new Decimal(0)
        player.tr.buyables[16] = new Decimal(0)
        player.tr.buyables[17] = new Decimal(0)
        player.tr.buyables[18] = new Decimal(0)
        player.tr.buyables[19] = new Decimal(0)

        player.sr.radiation.amount = new Decimal(0)
        player.sr.spaceDecay = new Decimal(0)
        player.sr.generators.amount[0] = new Decimal(0)
        player.sr.generators.amount[1] = new Decimal(0)
        player.sr.generators.amount[2] = new Decimal(0)
        player.sr.generators.amount[3] = new Decimal(0)
        player.sr.buyables[1] = new Decimal(0)
        player.sr.buyables[2] = new Decimal(0)
        player.sr.buyables[3] = new Decimal(0)
        player.sr.buyables[4] = new Decimal(0)

        for (let i = 0; i < player.sr.generators.amount.length; i++) {
            player.sr.generators.amount[i] = new Decimal(0)
        }

        player.mr.radiation.amount = new Decimal(0)
        player.mr.particleClick = new Decimal(0)

        player.hr.radiation.amount = new Decimal(0)
        player.hr.particleClick = new Decimal(0)

        player.dec.decay = new Decimal(0)
        player.dec.stability = new Decimal(0)
        player.dec.carbon14 = new Decimal(0)
        player.dec.nitrogen14 = new Decimal(0)
        player.dec.magnesium28 = new Decimal(0)
        player.dec.aluminum28 = new Decimal(0)
        player.dec.silicon28 = new Decimal(0)

        player.dec.dysprosium154 = new Decimal(0)
        player.dec.gadolinium150 = new Decimal(0)
        player.dec.samarium146 = new Decimal(0)
        player.dec.neodymium142 = new Decimal(0)

        player.subtabs["dec"]["stuff"] = "Main"

        player.dec.buyables[11] = new Decimal(0)
        player.dec.buyables[12] = new Decimal(0)
        player.dec.buyables[13] = new Decimal(0)
        player.dec.buyables[14] = new Decimal(0)
        player.dec.buyables[21] = new Decimal(0)
        player.dec.buyables[22] = new Decimal(0)
        player.dec.buyables[23] = new Decimal(0)
        player.dec.buyables[24] = new Decimal(0)
        player.dec.buyables[31] = new Decimal(0)
        player.dec.buyables[32] = new Decimal(0)
        player.dec.buyables[33] = new Decimal(0)
        player.dec.buyables[34] = new Decimal(0)
        player.dec.buyables[35] = new Decimal(0)
        player.dec.buyables[36] = new Decimal(0)

        player.dec.electrons = new Decimal(0)
        player.dec.alphaParticles = new Decimal(0)

        player.dec.buyables[41] = new Decimal(0)
        player.dec.buyables[42] = new Decimal(0)
        player.dec.buyables[43] = new Decimal(0)
        player.dec.buyables[44] = new Decimal(0)
        player.dec.buyables[45] = new Decimal(0)
        player.dec.buyables[46] = new Decimal(0)
        player.dec.buyables[47] = new Decimal(0)
        player.dec.buyables[48] = new Decimal(0)
        player.dec.buyables[49] = new Decimal(0)
        player.dec.buyables[51] = new Decimal(0)
        player.dec.buyables[52] = new Decimal(0)
        player.dec.buyables[53] = new Decimal(0)
        player.dec.buyables[54] = new Decimal(0)
        player.dec.buyables[55] = new Decimal(0)
        player.dec.buyables[56] = new Decimal(0)
        player.dec.buyables[57] = new Decimal(0)
        player.dec.buyables[58] = new Decimal(0)
        player.dec.buyables[59] = new Decimal(0)

        player.ani.darkRadiation = new Decimal(0)
        player.ani.radiation.red.amount = new Decimal(0)
        player.ani.radiation.orange.amount = new Decimal(0)
        player.ani.radiation.yellow.amount = new Decimal(0)
        player.ani.radiation.green.amount = new Decimal(0)
        player.ani.radiation.blue.amount = new Decimal(0)
        player.ani.radiation.violet.amount = new Decimal(0)

        player.ani.buyables[11] = new Decimal(0)
        player.ani.buyables[12] = new Decimal(0)
        player.ani.buyables[13] = new Decimal(0)
        player.ani.buyables[14] = new Decimal(0)
    },
    milestones: {},
    challenges: {
        11: {
            name() {
                return "Discolored (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"
            },
            completionLimit() {
                return new Decimal(5)
            },
            marked: false,
            challengeDescription() { return "<h4>All passive generation is disabled, and each successive colored radiation resets all previous colored radiation (including dark radiation)." },
            goal() {
                return Decimal.pow(1e20, challengeCompletions(this.layer, this.id)).mul(1e120)
            },
            goalDescription() { return format(Decimal.pow(1e20, challengeCompletions(this.layer, this.id)).mul(1e120)) + " Dark Radiation" },
            canComplete() {
                return player.ani.darkRadiation.gte(Decimal.pow(1e20, challengeCompletions(this.layer, this.id)).mul(1e120))
            },
            rewardEffect() {
                return Decimal.pow(5, challengeCompletions(this.layer, this.id))
            },
            rewardDescription() {
                return "Unlock Room E, and boost all space decay generators by x" + format(challengeEffect(this.layer, this.id)) + "."
            },
            onEnter() {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        layers.anl.hopeRageLevelReset();
                    }, 100*i)
                }
            },
            onExit() {

            },
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},

        },
        12: {
            name() {
                return "Nuclear Meltdown (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"
            },
            completionLimit() {
                return new Decimal(5)
            },
            marked: false,
            challengeDescription() { return "<h5>All passive generation is disabled, and deadly radiation spawns every 0.6s. Hovering over it will divide all pre-hope/rage radiation resources by /10." },
            goal() {
                return Decimal.pow(1e30, challengeCompletions(this.layer, this.id)).mul(1e100)
            },
            goalDescription() { return format(Decimal.pow(1e30, challengeCompletions(this.layer, this.id)).mul(1e100)) + " Dark Radiation" },
            canComplete() {
                return player.ani.darkRadiation.gte(Decimal.pow(1e30, challengeCompletions(this.layer, this.id)).mul(1e100))
            },
            rewardEffect() {
                return Decimal.pow(100, challengeCompletions(this.layer, this.id))
            },
            rewardDescription() {
                return "Unlocks Room F (also requires Radioactive Boogie), and boost time and space radiation gain by x" + format(challengeEffect(this.layer, this.id)) + "."
            },
            onEnter() {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        layers.anl.hopeRageLevelReset();
                    }, 100*i)
                }
            },
            onExit() {

            },
            unlocked() { return player.anl.clearedRooms.roomE},
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},

        },
        13: {
            name() {
                return "Radioactive Boogie"
            },
            completionLimit() {
                return new Decimal(1)
            },
            marked: false,
            challengeDescription() { return "<h4>Defeat Room A with green soul attacks occuring every 8 seconds." },
            goalDescription() { return "..." },
            canComplete() {
                return false
            },
            rewardEffect() {
                return false
            },
            rewardDescription() {
                return "Unlocks Room F (also requires Nuclear Meltdown), and unlock the hover option for radiation particles. (In particle toggle menu)"
            },
            onEnter() {
            },
            onExit() {

            },
            unlocked() { return player.anl.clearedRooms.roomE},
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},

        },
        14: {
            name() {
                return "Realistic Decay (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"
            },
            completionLimit() {
                return new Decimal(5)
            },
            marked: false,
            challengeDescription() { return "<h4>Dark radiation multipliers are raised by ^0.1, and based production is dependent on the square root of decay." },
            goal() {
                return Decimal.pow(1e10, challengeCompletions(this.layer, this.id)).mul(1e25)
            },
            goalDescription() { return format(Decimal.pow(1e10, challengeCompletions(this.layer, this.id)).mul(1e25)) + " Dark Radiation" },
            canComplete() {
                return player.ani.darkRadiation.gte(Decimal.pow(1e10, challengeCompletions(this.layer, this.id)).mul(1e25))
            },
            rewardEffect() {
                return Decimal.mul(0.3, challengeCompletions(this.layer, this.id)).add(1)
            },
            rewardDescription() {
                return "Unlocks Room G, and raises effects of first 3 columns of decay/stability buyables by ^" + format(challengeEffect(this.layer, this.id)) + "."
            },
            onEnter() {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        layers.anl.hopeRageLevelReset();
                    }, 100*i)
                }
            },
            onExit() {

            },
            unlocked() { return player.anl.clearedRooms.roomF},
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},

        },
        15: {
            name() {
                return "Incremented Energy (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"
            },
            completionLimit() {
                return new Decimal(5)
            },
            marked: false,
            challengeDescription() { return "<h5>Reach a certain amount of incremental energy with green soul attacks occuring every 8 seconds. (Auto completes)<br>Note: Blue spears require you to time your click when it hits the shield." },
            goal() {
                return Decimal.add(1, challengeCompletions(this.layer, this.id)).mul(200)
            },
            goalDescription() { return Decimal.add(1, challengeCompletions(this.layer, this.id)).mul(200) + " Incremental Energy" },
            canComplete() {
                return false
            },
            rewardEffect() {
                return Decimal.mul(0.05, challengeCompletions(this.layer, this.id)).add(1)
            },
            rewardDescription() {
                return "Unlocks Room H, and boost incremental energy gain by x" + format(challengeEffect(this.layer, this.id)) + "."
            },
            onEnter() {
            },
            onExit() {

            },
            unlocked() { return player.anl.clearedRooms.roomG},
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},

        },
    },
    infoboxes: {
    },
    microtabs: {
        stages: {
            "aniciffoLabyrinth": {
                unlocked: true,
                embedLayer: 'aniciffoLabyrinth',
            },
        },
        stuff: {
            "Labyrinth": {
                buttonStyle() { return { color: "white", borderRadius: "5px", borderColor: "#daff74" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                    ["theme-scroll-row", [
                                ["row-tree", universes.BH.treeL],
                    ], () => {return layerShown("roomTemple") ? {width: "891px", height: "260px", background: "radial-gradient(#113, black)", border: "3px solid #226", borderRadius: "25px 25px 0px 0px", padding: "5px"} : {width: "891px", height: "260px", background: "linear-gradient(180deg, #10220c 0%, #1f240f 100%)", border: "3px solid #606e2f", borderRadius: "25px 25px 0px 0px", padding: "5px"}}],
                    ], {width: "891px", height: "260px",borderRadius: "25px 25px 0px 0px", padding: "5px"}],
                    ["buttonless-microtabs", "stages", {borderWidth: "0"}],
                ]
            },
            "Radiation": {
                buttonStyle() { return { color: "white", borderRadius: "5px", borderColor: "#daff74" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", () => { return "You have <h3>" + formatWhole(player.anl.celestialRadiation) + "</h3> celestial radiation."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], 
                        ], {width: "794px", height: "40px", background: "#1d901a", borderBottom: "3px solid #b7ffaf", borderRadius: "22px 22px 0 0"}],
                        ["style-row", [
                            ["style-column", [
                                ["row", [["upgrade", 11], ["upgrade", 12], ["buyable", 11], ["buyable", 12], ["upgrade", 13], ["upgrade", 14],]],
                            ], {width: "791px", height: "128px", borderRight: "0px solid #b7ffaf"}],
                            ["style-column", [
                                ["row", [["buyable", 21], ["upgrade", 21], ["buyable", 22], ["buyable", 23], ["upgrade", 22], ["upgrade", 23]]],
                            ], {width: "791px", height: "128px", borderRight: "0px solid #b7ffaf"}],
                            ["style-column", [
                                ["row", [["upgrade", 31], ["upgrade", 32], ["buyable", 31], ["upgrade", 33], ["buyable", 32], ["buyable", 33]]],
                            ], {width: "791px", height: "128px", borderRight: "0px solid #b7ffaf"}],
                            ["style-column", [
                                ["row", [["buyable", 41], ["upgrade", 41], ["upgrade", 42], ]],
                            ], {width: "791px", height: "128px", borderRight: "0px solid #b7ffaf"}],
                            ["style-column", [
                            ], {width: "791px", height: "128px", borderRight: "0px solid #b7ffaf"}],
                        ], {width: "794px", height: "640px"}],
                    ], {width: "794px", height: "680px", background: "repeating-linear-gradient(45deg, #1d901a, #1d901a 20px, #4fa746 20px, #4fa746 40px)", border: "3px solid #b7ffaf", borderRadius: "25px 25px 25px 25px"}],
                ]
            },
            "Challenges": {
                buttonStyle() { return { color: "white", borderRadius: "5px", borderColor: "#daff74" } },
                unlocked() { return player.anl.clearedRooms.roomD },
                content: [
                    ["blank", "25px"],
                            ["raw-html", () => { return "All challenges perform a hope/rage level reset."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], 
                    ["blank", "25px"],
                                ["row", [["challenge", 11],["challenge", 12],["challenge", 13],]],
                                ["row", [["challenge", 14],["challenge", 15],]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.ani.darkRadiation) + "</h3> dark radiation. (+" + format(player.ani.darkRadiationToGet) + "/" + formatTime(player.ani.timer.max) + ")" }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.sma.inStarmetalChallenge && hasMilestone("rar", 16) && hasMilestone("hor", 16)},
    deactivated() { return !player.sma.inStarmetalChallenge},
})

addLayer("anld", {
    name: "Aniciffo's Labyrinth Death", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
    startData() { return {
        unlocked: true,
    }},
    clickables: {
        "Leave": {
            title: "<h2>Leave Aniciffo's Labyrinth</h2>",
            canClick: true,
            unlocked: true,
            onClick() {
                player.tab = "anl"
                player.aniciffoLabyrinth.inLabyrinth = false
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "linear-gradient(45deg, #4e4e4e 0%, #868686 100%)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ["style-column", [
    ["raw-html", "Everyone has passed out.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
    ["raw-html", "<i>Something</i> pulls you out of Aniciffo's Labyrinth.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "800px", height: "80px", backgroundColor: "rgb(39, 39, 39)", border: "3px solid #777777", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["clickable", "Leave"],
                    ["blank", "25px"],
    ],
    layerShown() {return false},
})

addLayer("aniciffoLabyrinth", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
    },
    startData() { return {
        unlocked: true,

        inLabyrinth: false, 

        creationToggle: true,
        eclipseToggle: true,
        noxToggle: true,

        aniciffoDefeated: false,

    }},
    automate() {},
    innerNodes: [["roomA",], ["roomB",], ["roomC", "roomTemple"], ["roomD",], ["roomE",],],
    innerLayer() {return player.subtabs["anl"]["stages"]},
    nodeStyle() {
        let str = {}
        str = {
            background: "linear-gradient(45deg, #3f003f 0%, #a900a9 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#3f003f",
            color: "rgba(0,0,0,0.5)",
            margin: "20px 0 0 30px !important",
        }
        return str
    },
    tooltip: "Aniciffo's Labyrinth",
    color: "#696969",
    update(delta) {
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Aniciffo's Labyrinth</h2>",
            tooltip: "You can only select the Creation, Eclipse or Nox into your party.",
            canClick() { return (player.aniciffoLabyrinth.creationToggle || player.aniciffoLabyrinth.eclipseToggle || player.aniciffoLabyrinth.noxToggle) && !player.aniciffoLabyrinth.inLabyrinth },
            unlocked: true,
            onClick() {
                player.aniciffoLabyrinth.inLabyrinth = true
                BHStageEnter(player.anl.selectedRoom, [player.aniciffoLabyrinth.creationToggle ? "creation" : "none", player.aniciffoLabyrinth.eclipseToggle ? "eclipse" : "none", player.aniciffoLabyrinth.noxToggle ? "nox" : "none"])

                player.bh.characters[0].skills[0].id = "creation_increment"
                player.bh.characters[0].skills[1].id = "creation_upgrade"
                player.bh.characters[0].skills[2].id = "creation_prestige"
                player.bh.characters[0].skills[3].id = "creation_mend"

                player.bh.characters[2].skills[0].id = "nox_bloodthirstySpear"
                player.bh.characters[2].skills[1].id = "nox_bloodDrain"
                player.bh.characters[2].skills[2].id = "nox_vampiricTransformation"
                player.bh.characters[2].skills[3].id = "nox_lastChance"
                setTimeout(() => {
                    for (let i = 0; i < 3; i++) {
                        player.bh.characters[i].health = player.bh.characters[i].maxHealth
                        player.bh.characters[i].shield = new Decimal(0)
                        player.bh.characters[i].stun = ["none", new Decimal(0)]

                    for (let j = 0; j < 4; j++) {
                        player.bh.characters[i].skills[j].duration = new Decimal(0)
                        player.bh.characters[i].skills[j].interval = new Decimal(0)
                    }
                    }
                }, 200); 
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "linear-gradient(45deg, #4e4e4e 0%, #868686 100%)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
        "Auto-Enter": {
            title() {return player.bh.autoEnter ? "<div style='margin-bottom:-20px;line-height:1'>Auto Enter<br><small>[" + BHS[player.bh.autoEnter].nameCap + "]<br>[" + formatTime(Decimal.sub(30, player.bh.autoCooldown)) + "]</small></div>" : "Auto Enter<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            tooltip: "Activates after 30 seconds when exiting a BH stage",
            onClick() {
                if (player.bh.autoEnter) {
                    player.bh.autoEnter = false
                    player.bh.autoCooldown = new Decimal(0)
                } else {
                    player.bh.autoEnter = player.anl.selectedRoom
                }
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
        "Auto-Exit": {
            title() {return player.bh.autoExit ? "Auto Exit<br><small>[Enabled]" : "Auto Exit<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.bh.autoExit) {
                    player.bh.autoExit = false
                } else {
                    player.bh.autoExit = true
                }
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
        "Creation-Toggle": {
            title() {return player.aniciffoLabyrinth.creationToggle ? "<div style='margin-bottom:-20px;line-height:1'>Creation<br><small>[Enabled]</small></div>" : "Creation<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            onClick() {
                player.aniciffoLabyrinth.creationToggle = !player.aniciffoLabyrinth.creationToggle
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
        "Eclipse-Toggle": {
            title() {return player.aniciffoLabyrinth.eclipseToggle ? "<div style='margin-bottom:-20px;line-height:1'>Eclipse<br><small>[Enabled]</small></div>" : "Eclipse<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            onClick() {
                player.aniciffoLabyrinth.eclipseToggle = !player.aniciffoLabyrinth.eclipseToggle
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
        "Nox-Toggle": {
            title() {return player.aniciffoLabyrinth.noxToggle ? "<div style='margin-bottom:-20px;line-height:1'>Nox<br><small>[Enabled]</small></div>" : "Nox<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            onClick() {
                player.aniciffoLabyrinth.noxToggle = !player.aniciffoLabyrinth.noxToggle
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
        ["style-row", [
            //different room perks i guess
            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Room A Perks", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "403px", height: "35px", borderBottom: "0px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "New radiation buyables (in U3 radiation)", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "Room B", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                ], () => {
                    let look = {width: "410px", height: "344px", background: "linear-gradient(0deg, #27501d 0%, #4b5721 100%)", borderRadius: "0 0 0 0", border: "3px solid #606e2f", borderTop: "0px", borderRight: "0px"}
                    if (!player.anl.clearedRooms.roomA) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], () => {return player.anl.selectedRoom == "roomA" ? {borderRadius: "0 0 0 0", overflow: "hidden",} : {display: "none !important"} }],
            
            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Room B Perks", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "403px", height: "35px", borderBottom: "0px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "Radiation Mastery (in U3 radiation)", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "New Celestial Radiation Upgrades", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],

                ], () => {
                    let look = {width: "410px", height: "344px", background: "linear-gradient(0deg, #27501d 0%, #4b5721 100%)", borderRadius: "0 0 0 0", border: "3px solid #606e2f", borderTop: "0px", borderRight: "0px"}
                    if (!player.anl.clearedRooms.roomB) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], () => {return player.anl.selectedRoom == "roomB" ? {borderRadius: "0 0 0 0", overflow: "hidden",} : {display: "none !important"} }],

            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Room C Perks", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "403px", height: "35px", borderBottom: "0px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "New Celestial Radiation Upgrades", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["raw-html", "<u>???</u>", {color: "#226", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "<i>Eclipse, Eclipse, Eclipse...<br>I only want Eclipse...</i>", {color: "#226", fontSize: "18px", fontFamily: "monospace"}],
                ], () => {
                    let look = {width: "410px", height: "344px", background: "linear-gradient(0deg, #27501d 0%, #4b5721 100%)", borderRadius: "0 0 0 0", border: "3px solid #606e2f", borderTop: "0px", borderRight: "0px"}
                    if (!player.anl.clearedRooms.roomC) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], () => {return player.anl.selectedRoom == "roomC" ? {borderRadius: "0 0 0 0", overflow: "hidden",} : {display: "none !important"} }],

            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Room ??? Perks", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "403px", height: "35px", borderBottom: "0px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "New Eclipse Skill", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                ], () => {
                    let look = {width: "410px", height: "344px", background: "linear-gradient(0deg, #226 0%, rgb(12, 12, 37) 100%)", borderRadius: "0 0 0 0", border: "3px solid #226", borderTop: "0px", borderRight: "0px"}
                    if (!player.anl.clearedRooms.roomTemple) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], () => {return player.anl.selectedRoom == "roomTemple" ? {borderRadius: "0 0 0 0", overflow: "hidden",} : {display: "none !important"} }],

            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Room D Perks", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "403px", height: "35px", borderBottom: "0px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "New Celestial Radiation Upgrades", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "Radiation Challenges", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                ], () => {
                    let look = {width: "410px", height: "344px", background: "linear-gradient(0deg, #1d5048 0%, #355721 100%)", borderRadius: "0 0 0 0", border: "3px solid #606e2f", borderTop: "0px", borderRight: "0px"}
                    if (!player.anl.clearedRooms.roomD) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], () => {return player.anl.selectedRoom == "roomD" ? {borderRadius: "0 0 0 0", overflow: "hidden",} : {display: "none !important"} }],

            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Room E Perks", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "403px", height: "35px", borderBottom: "0px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "New Celestial Radiation Upgrades", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "New Radiation Challenges", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                ], () => {
                    let look = {width: "410px", height: "344px", background: "linear-gradient(0deg, #1d5048 0%, #355721 100%)", borderRadius: "0 0 0 0", border: "3px solid #606e2f", borderTop: "0px", borderRight: "0px"}
                    if (!player.anl.clearedRooms.roomE) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], () => {return player.anl.selectedRoom == "roomE" ? {borderRadius: "0 0 0 0", overflow: "hidden",} : {display: "none !important"} }],
            
            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Room F Perks", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "403px", height: "35px", borderBottom: "0px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "New Celestial Radiation Upgrades", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "New Radiation Challenges", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["raw-html", "<u>Effects</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "x10,000 to radiation gain.", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "^1.1 to mastery score.", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                ], () => {
                    let look = {width: "410px", height: "344px", background: "linear-gradient(135deg, #153942 0%, #1d5045 100%)", borderRadius: "0 0 0 0", border: "3px solid #606e2f", borderTop: "0px", borderRight: "0px"}
                    if (!player.anl.clearedRooms.roomF) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], () => {return player.anl.selectedRoom == "roomF" ? {borderRadius: "0 0 0 0", overflow: "hidden",} : {display: "none !important"} }],

            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Room G Perks", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "403px", height: "35px", borderBottom: "0px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "New Celestial Radiation Upgrades", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "New Radiation Challenges", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                ], () => {
                    let look = {width: "410px", height: "344px", background: "linear-gradient(135deg, #153942 0%, #1d5045 100%)", borderRadius: "0 0 0 0", border: "3px solid #606e2f", borderTop: "0px", borderRight: "0px"}
                    if (!player.anl.clearedRooms.roomG) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], () => {return player.anl.selectedRoom == "roomG" ? {borderRadius: "0 0 0 0", overflow: "hidden",} : {display: "none !important"} }],

            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Room H Perks", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "403px", height: "35px", borderBottom: "0px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "New Celestial Radiation Upgrades", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "New Radiation Challenges", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                ], () => {
                    let look = {width: "410px", height: "344px", background: "linear-gradient(135deg, #153942 0%, #1d5045 100%)", borderRadius: "0 0 0 0", border: "3px solid #606e2f", borderTop: "0px", borderRight: "0px"}
                    if (!player.anl.clearedRooms.roomH) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], () => {return player.anl.selectedRoom == "roomH" ? {borderRadius: "0 0 0 0", overflow: "hidden",} : {display: "none !important"} }],

            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "Aniciffo's Labyrinth", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.anl.selectedRoomDisplay }, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "400px", height: "35px", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], () => {return layerShown("roomTemple") ? {width: "488px", height: "149px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)", borderRight: "3px solid #226"} : {width: "488px", height: "149px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)", borderRight: "3px solid #606e2f"}}],
                ["top-column", [
                    ["blank", "5px"],
                                    ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ["blank", "24px"],
        ["raw-html", () => { return player.anl.propertiesText }, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                ], () => {return layerShown("roomTemple") ? {width: "488px", height: "198px", background: "var(--layerBackground)", borderRight: "3px solid #226",} : {width: "488px", height: "198px", background: "var(--layerBackground)", borderRight: "3px solid #606e2f",}}],
            ], {width: "491px", height: "347px", borderLeft: "3px solid var(--regBorder)"}],
                            ["style-row", [
                    ["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"], ["blank", ["10px", "10px"]], ["clickable", "Creation-Toggle"], ["blank", ["10px", "10px"]], ["clickable", "Eclipse-Toggle"], ["blank", ["10px", "10px"]], ["clickable", "Nox-Toggle"],
                ], () => {return layerShown("roomTemple") ? {width: "901px", height: "70px", background: "var(--miscButtonDisable)", border: "3px solid #226", borderTop: "0px", borderRadius: "0 0 27px 27px"} : {width: "901px", height: "70px", background: "var(--miscButtonDisable)", border: "3px solid #606e2f", borderTop: "0px", borderRadius: "0 0 27px 27px"}}],
        ], {width: "1000px", height: "420px"}],
    ],
    layerShown() {return player.startedGame },
})
BHS.roomA = {
    nameCap: "Aniciffo's Labyrinth",
    nameLow: "aniciffo's labyrinth",
    music: "music/aniciffoLabyrinth.mp3",
    comboStart: 0,
    comboLimit: 14,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 13:
                return "h3"
            default:
                let random = Math.random()
                let cel = ["h1","h1","h1","h1","h1","h1", "h2", "h2", "h2", "h2", "h2", "h3"]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}
BHS.roomB = {
    nameCap: "Aniciffo's Labyrinth",
    nameLow: "aniciffo's labyrinth",
    music: "music/aniciffoLabyrinth.mp3",
    comboStart: 0,
    comboLimit: 14,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 13:
                return "uue"
            default:
                let random = Math.random()
                let cel = ["h1","h1", "h2", "h2", "u235", "u235", "u235", "u238",  "u238",  "u238", ]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}
BHS.roomC = {
    nameCap: "Aniciffo's Labyrinth",
    nameLow: "aniciffo's labyrinth",
    music: "music/aniciffoLabyrinth.mp3",
    comboStart: 0,
    comboLimit: 14,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 13:
                return "ubn"
            default:
                let random = Math.random()
                let cel = ["h1", "h2", "u235", "u238", "tc99", "tc99", "tc99", "at211", "at211",]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}
BHS.roomTemple = {
    nameCap: "???",
    nameLow: "???",
    music: "music/templeMiniboss.mp3",
    comboStart: 0,
    comboLimit: 1,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 0:
                return "templeMan"
        }
    },
}
BHS.roomD = {
    nameCap: "Aniciffo's Labyrinth",
    nameLow: "aniciffo's labyrinth",
    music: "music/aniciffoLabyrinth2.mp3", //new song please
    comboStart: 0,
    comboLimit: 14,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 13:
                return "ubu"
            default:
                let random = Math.random()
                let cel = ["tc99", "tc99", "at211", "at211", "es253", "es253", "es253", "es253", "sg263", "sg263", "sg263", "h3"]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}
BHS.roomE = {
    nameCap: "Aniciffo's Labyrinth",
    nameLow: "aniciffo's labyrinth",
    music: "music/aniciffoLabyrinth2.mp3", //make a new song bruh
    comboStart: 0,
    comboLimit: 14,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 13:
                return "ubb"
            default:
                let random = Math.random()
                let cel = ["h1", "h2", "u235", "u238", "es253","es253", "sg263", "sg263", "mt266", "mt266", "mt266", "mt266", "bh270", "bh270", "bh270", "bh270", "h3"]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}
BHS.roomF = {
    nameCap: "Aniciffo's Labyrinth",
    nameLow: "aniciffo's labyrinth",
    music: "music/aniciffoLabyrinth2.mp3", //just make the new song already
    comboStart: 0,
    comboLimit: 14,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 13:
                return "formaldehyde"
            default:
                let random = Math.random()
                let cel = [ "u235", "u238", "es253", "sg263", "mt266", "bh270", "tc99", "at211", "og294", "og294","og294","og294","benzene","benzene","benzene","benzene", "h3", "h3"]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}
BHS.roomG = {
    nameCap: "Aniciffo's Labyrinth",
    nameLow: "aniciffo's labyrinth",
    music: "music/aniciffoLabyrinth2.mp3", //just make the new song already
    comboStart: 0,
    comboLimit: 14,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 13:
                return "uf6"
            default:
                let random = Math.random()
                let cel = ["benzene","benzene", "chlorine", "chlorine", "chlorine", "arsine", "arsine", "stibine", "stibine", "ammonia", "ammonia", "h3",]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}
BHS.roomH = {
    nameCap: "Aniciffo's Labyrinth",
    nameLow: "aniciffo's labyrinth",
    music: "music/aniciffoLabyrinth2.mp3", //just make the new song already
    comboStart: 0,
    comboLimit: 8,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 0:
                return "h3"
            case 1:
                return "uue"
            case 2:
                return "ubn"
            case 3:
                return "ubu"
            case 4:
                return "ubb"
            case 5:
                return "formaldehyde"
            case 6:
                return "uf6"
            case 7:
                return "strychnine"
            default:
                let random = Math.random()
                let cel = ["benzene","benzene", "chlorine", "chlorine", "chlorine", "arsine", "arsine", "stibine", "stibine", "ammonia", "ammonia", "h3",]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}
//celestialites
BHC.h1 = {
    name: "Hydrogen",
    icon: "resources/celestialites/h1.png",
    health: new Decimal(2500),
    damage: new Decimal(16),
    luck: new Decimal(0),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Stable Attack",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                return player.bh.celestialite.damage
            },
            cooldown: new Decimal(4),
        },
        1: {
            name: "Radioactive Bombardment",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 4)
            },
            cooldown: new Decimal(8),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(1), 1)
        return gain
    },
}
BHC.h2 = {
    name: "Deuterium",
    icon: "resources/celestialites/h2.png",
    health: new Decimal(3250),
    damage: new Decimal(26),
    luck: new Decimal(0),
    agility: new Decimal(12),
    actions: {
        0: {
            name: "Isotope Bullet",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value() {
                return player.bh.celestialite.damage.mul(0.3)
            },
            cooldown: new Decimal(3),
        },
        1: {
            name: "Radioactive Strike",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 1)
            },
            cooldown: new Decimal(2),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(2), 1)
        return gain
    },
}
BHC.h3 = {
    name: "Tritium",
    icon: "resources/celestialites/h3.png",
    health: new Decimal(10000),
    damage: new Decimal(50),
    luck: new Decimal(0),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Radioactive Bombardment",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 3)
            },
            cooldown: new Decimal(8),
        },
        1: {
            name: "Radioactive Strike",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 1)
            },
            cooldown: new Decimal(1),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(2), 3)
        return gain
    },
}
BHC.u235 = {
    name: "Uranium-235",
    icon: "resources/celestialites/u235.png",
    health: new Decimal(3000),
    damage: new Decimal(25),
    luck: new Decimal(0),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Decay",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-12)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Isotopic Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value() {
                return player.bh.celestialite.damage.mul(0.1)
            },
            cooldown: new Decimal(5),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(2), 3)
        return gain
    },
}
BHC.u238 = {
    name: "Uranium-238",
    icon: "resources/celestialites/u238.png",
    health: new Decimal(4000),
    damage: new Decimal(50),
    luck: new Decimal(0),
    agility: new Decimal(12),
    actions: {
        0: {
            name: "Radiation Poisoning",
            passive: true,
            constantType: "effect",
            constantTarget: "randomPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-7)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Isotopic Punch",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                return player.bh.celestialite.damage.mul(0.05)
            },
            cooldown: new Decimal(2),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(2), 1)
        return gain
    },
}
BHC.uue = {
    name: "Ununennium",
    icon: "resources/celestialites/uue.png",
    health: new Decimal(22000),
    damage: new Decimal(50),
    luck: new Decimal(0),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Decay",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-12)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Rhythmic Radiation",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                bulletHellGreen({"greenSpearRain": {spearPerSec: 1.5, spearSpeed: 3, spearLength: 80, spearWidth: 12, fourDir: true}}, {width:500, height:500, duration:12})
            },
            cooldown: new Decimal(24),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(3), 3)
        return gain
    },
}
BHC.tc99 = {
    name: "Technetium-99",
    icon: "resources/celestialites/tc99.png",
    health: new Decimal(1500),
    damage: new Decimal(40),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Damage Inhibitor",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "damageMult"() {return new Decimal(0.2)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Isotopic Punch",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                return player.bh.celestialite.damage.mul(0.05)
            },
            cooldown: new Decimal(2),
        },
    },
    attributes: {
        "explosive": new Decimal(50), 
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(3), 2)
        return gain
    },
}
BHC.at211 = {
    name: "Astatine-211",
    icon: "resources/celestialites/at211.png",
    health: new Decimal(4000),
    damage: new Decimal(40),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Agility Inhibitor",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "agilityMult"() {return new Decimal(0.2)},
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Isotopic Bomb",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            value() {
                return player.bh.celestialite.damage.mul(0.05)
            },
            cooldown: new Decimal(5),
        },
    },
    attributes: {
        "explosive": new Decimal(50), 
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(3), 2)
        return gain
    },
}
BHC.ubn = {
    name: "Unbinilium",
    icon: "resources/celestialites/ubn.png",
    health: new Decimal(28000),
    damage: new Decimal(50),
    luck: new Decimal(0),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Radioactive Scattershot",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 10)
            },
            cooldown: new Decimal(14),
        },
        1: {
            name: "Rhythmic Radiation",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                bulletHellGreen({"greenSpearRain": {spearPerSec: 1, spearSpeed: 4, spearLength: 80, spearWidth: 12, fourDir: false}}, {width:500, height:500, duration:12})
            },
            cooldown: new Decimal(24),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(3), 7)
        return gain
    },
}
BHC.es253 = {
    name: "Einsteinium-253",
    icon: "resources/celestialites/es253.png",
    health: new Decimal(5000),
    damage: new Decimal(45),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Max Health Inhibitor",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "healthMult"() {return new Decimal(0.75)},
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Isotopic Curse",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "magic",
            value() {
                return player.bh.celestialite.damage.mul(0.04)
            },
            cooldown: new Decimal(3),
        },
    },
    attributes: {
        "explosive": new Decimal(50), 
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(4), 2)
        return gain
    },
}
BHC.sg263 = {
    name: "Seaborgium-263",
    icon: "resources/celestialites/sg263.png",
    health: new Decimal(6000),
    damage: new Decimal(40),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Defense Inhibitor",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "defenseMult"() {return new Decimal(0.6)},
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Isotopic Multi-Attack",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "multi-hit": [3, 300],
            },
            value() {
                return player.bh.celestialite.damage.mul(0.03)
            },
            cooldown: new Decimal(8),
        },
    },
    attributes: {
        "explosive": new Decimal(50), 
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(4), 2)
        return gain
    },
}
BHC.ubu = {
    name: "Unbiunium",
    icon: "resources/celestialites/ubu.png",
    health: new Decimal(30000),
    damage: new Decimal(50),
    defense: new Decimal(10),
    luck: new Decimal(0),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Radioactive Strike",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 1)
            },
            cooldown: new Decimal(2),
        },
        1: {
            name: "Radioactive Scattershot",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 7)
            },
            cooldown: new Decimal(16),
        },
        1: {
            name: "Rhythmic Radiation",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                let random = getRandomInt(3)

                if (random == 0) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 1.5, spearSpeed: 3, spearLength: 80, spearWidth: 12, redChance: 0.3, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 1)
                {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 1.2, spearSpeed: 4, spearLength: 80, spearWidth: 12, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 2) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 3, spearSpeed: 4, spearLength: 80, spearWidth: 12, noRepeatDir: true, fourDir: true}}, {width:500, height:500, duration:16})
                }
            },
            cooldown: new Decimal(20),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(3), 5)
        return gain
    },
}
BHC.mt266 = {
    name: "Meitnerium-266",
    icon: "resources/celestialites/mt266.png",
    health: new Decimal(4000),
    damage: new Decimal(50),
    defense: new Decimal(20),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Attack Stat Inhibitor",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "damageMult"() {return new Decimal(0.75)},
                "agilityMult"() {return new Decimal(0.75)},
                "luckMult"() {return new Decimal(0.75)},
                "potencyMult"() {return new Decimal(0.75)},
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Isotopic Multi-Multi-Attack",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            properties: {
                "multi-hit": [3, 300],
            },
            value() {
                return player.bh.celestialite.damage.mul(0.01)
            },
            cooldown: new Decimal(8),
        },
        2: {
            name: "Decay",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-8)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
    },
    attributes: {
        "rebound": new Decimal(0.04), 
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(4), 2)
        return gain
    },
}
BHC.bh270 = {
    name: "Bohrium-270",
    icon: "resources/celestialites/bh270.png",
    health: new Decimal(3000),
    damage: new Decimal(30),
    defense: new Decimal(20),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Healing Stat Inhibitor",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "healthMult"() {return new Decimal(0.75)},
                "defenseMult"() {return new Decimal(0.75)},
                "luckMult"() {return new Decimal(0.75)},
                "regenMult"() {return new Decimal(0.75)},
                "mendingMult"() {return new Decimal(0.75)},
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Isotopic Multi-Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            properties: {
                "multi-hit": [3, 300],
            },
            value() {
                return player.bh.celestialite.damage.mul(0.01)
            },
            cooldown: new Decimal(8),
        },
        2: {
            name: "Isotopic Multi-Bullet",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            properties: {
                "multi-hit": [3, 300],
            },
            value() {
                return player.bh.celestialite.damage.mul(0.02)
            },
            cooldown: new Decimal(14),
        },
        3: {
            name: "Decay",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-5)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
    },
    attributes: {
        "rebound": new Decimal(0.04), 
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(4), 2)
        return gain
    },
}
BHC.ubb = {
    name: "Unbibium",
    icon: "resources/celestialites/ubb.png",
    health: new Decimal(36000),
    damage: new Decimal(50),
    defense: new Decimal(15),
    luck: new Decimal(0),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Radioactive Throw",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 3)
            },
            cooldown: new Decimal(7),
        },
        1: {
            name: "Isotopic Multi-Multi-Attack",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            properties: {
                "multi-hit": [3, 300],
            },
            value() {
                return player.bh.celestialite.damage.mul(0.005)
            },
            cooldown: new Decimal(8),
        },
        2: {
            name: "Rhythmic Radiation",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                let random = getRandomInt(4)

                if (random == 0) {
                    bulletHellGreen({
                    "greenSpearChoreography": {
                    loop: true,
                    sequence: [
                        { delay: 300, dir: 0, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 600, dir: 2, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 900, dir: 4, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 1200, dir: 6, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    ]
                    }
                    }, { width: 500, height: 500, duration: 18 }) 
                } else if (random == 1)
                {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 1.6, spearSpeed: 4, spearLength: 80, spearWidth: 12, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 2) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 5, spearSpeed: 4, spearLength: 80, spearWidth: 12, redChance: 1, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 3) {
                bulletHellGreen({
                    "greenSpearChoreography": {
                    loop: true,
                    sequence: [
                        { delay: 300, dir: 0, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 600, dir: 2, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                        { delay: 900, dir: 0, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                        { delay: 1200, dir: 2, speed: 4, loop: true, red: false },        
                        { delay: 1500, dir: 4, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 1800, dir: 6, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                        { delay: 2100, dir: 4, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                        { delay: 2400, dir: 6, speed: 4, loop: true, red: false },                            
                        { delay: 2700, dir: 4, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 3000, dir: 0, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                        { delay: 3300, dir: 4, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                        { delay: 3600, dir: 0, speed: 4, loop: true, red: false },                  
                        { delay: 3900, dir: 6, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 4200, dir: 2, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                        { delay: 4500, dir: 6, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                        { delay: 4800, dir: 2, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                    ]
                    }
                }, { width: 500, height: 500, duration: 18 }) 
                }
                },
            cooldown: new Decimal(20),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(3), 9)
        return gain
    },
}
BHC.og294 = {
    name: "Oganesson-294",
    icon: "resources/celestialites/og294.png",
    health: new Decimal(4000),
    damage: new Decimal(30),
    defense: new Decimal(20),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Full Stat Inhibitor",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "healthMult"() {return new Decimal(0.85)},
                "defenseMult"() {return new Decimal(0.85)},
                "luckMult"() {return new Decimal(0.85)},
                "regenMult"() {return new Decimal(0.85)},
                "mendingMult"() {return new Decimal(0.85)},
                "damageMult"() {return new Decimal(0.85)},
                "agilityMult"() {return new Decimal(0.85)},
                "luckMult"() {return new Decimal(0.85)},
                "potencyMult"() {return new Decimal(0.85)},
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Isotopic Shenanigans",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            properties: {
                "crit": [0.3, 2]
            },
            value() {
                return player.bh.celestialite.damage.mul(0.15)
            },
            cooldown: new Decimal(8),
        },
        2: {
            name: "Decay",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-5)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(4), 3)
        return gain
    },
}
BHC.benzene = {
    name: "Benzene",
    icon: "resources/celestialites/benzene.png",
    health: new Decimal(7000),
    damage: new Decimal(30),
    defense: new Decimal(20),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Organic Obliteration",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            properties: {
                "crit": [0.3, 2]
            },
            value() {
                return player.bh.celestialite.damage.mul(0.02)
            },
            cooldown: new Decimal(8),
        },
        1: {
            name: "Radiation Poisoning",
            passive: true,
            constantType: "effect",
            constantTarget: "randomPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-7)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        2: {
            name: "Radioactive Strike",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 1)
            },
            cooldown: new Decimal(2),
        },
        3: {
            name: "Block",
            instant: true,
            type: "shield",
            target: "celestialite",
            value: new Decimal(1),
            cooldown: new Decimal(15),

            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "defenseAdd": new Decimal(25),
            },
            duration: new Decimal(3),
        },
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(4), 3)
        return gain
    },
}
BHC.chlorine = {
    name: "Chlorine",
    icon: "resources/celestialites/chlorine.png",
    health: new Decimal(6000),
    damage: new Decimal(40),
    defense: new Decimal(20),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Gas Poisoning",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-7)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Radioactive Strike",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 1)
            },
            cooldown: new Decimal(2),
        },
        2: {
            name: "Bonded Repair",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(250),
            cooldown: new Decimal(5),
        },
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(4), 3)
        return gain
    },
}
BHC.arsine = {
    name: "Arsine",
    icon: "resources/celestialites/arsine.png",
    health: new Decimal(8000),
    damage: new Decimal(40),
    defense: new Decimal(20),
    luck: new Decimal(0),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Gas Poisoning",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-3)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Radioactive Strike",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 1)
            },
            cooldown: new Decimal(2),
        },
        2: {
            name: "Toxic Stab",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "crit": [0.3, 2]
            },
            value() {
                return player.bh.celestialite.damage.mul(0.1)
            },
            cooldown: new Decimal(6),
        },
        3: {
            name: "Block",
            instant: true,
            type: "shield",
            target: "celestialite",
            value: new Decimal(1),
            cooldown: new Decimal(15),

            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "defenseAdd": new Decimal(25),
            },
            duration: new Decimal(3),
        },
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(5), 3)
        return gain
    },
}
BHC.ammonia = {
    name: "Ammonia",
    icon: "resources/celestialites/ammonia.png",
    health: new Decimal(8000),
    damage: new Decimal(40),
    defense: new Decimal(20),
    luck: new Decimal(10),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Stinky Smell",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-4)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Radioactive Bamboozlement",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 2)
            },
            cooldown: new Decimal(4),
        },
        2: {
            name: "Toxic Fling",
            instant: true,
            type: "ranged",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "crit": [0.3, 2]
            },
            value() {
                return player.bh.celestialite.damage.mul(0.1)
            },
            cooldown: new Decimal(6),
        },
        3: {
            name: "Block",
            instant: true,
            type: "shield",
            target: "celestialite",
            value: new Decimal(1),
            cooldown: new Decimal(15),

            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "defenseAdd": new Decimal(25),
            },
            duration: new Decimal(3),
        },
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(4), 4)
        return gain
    },
}
BHC.stibine = {
    name: "Stibine",
    icon: "resources/celestialites/stibine.png",
    health: new Decimal(8000),
    damage: new Decimal(40),
    defense: new Decimal(20),
    luck: new Decimal(10),
    agility: new Decimal(20),
    actions: {
        0: {
            name: "Pungent Odor",
            passive: true,
            constantType: "effect",
            constantTarget: "allPlayer",
            effects: {
                "regenAdd"() {return player.bh.celestialite.damage.div(-4)}, // Add to regen stat
            },
            cooldown: new Decimal(Infinity),
        },
        1: {
            name: "Radioactive Blitz",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 1)
            },
            cooldown: new Decimal(0.7),
        },
        2: {
            name: "Toxic Curse",
            instant: true,
            type: "ranged",
            target: "randomPlayer",
            method: "magic",
            properties: {
                "crit": [0.3, 2]
            },
            value() {
                return player.bh.celestialite.damage.mul(0.1)
            },
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(4), 4)
        return gain
    },
}
BHC.formaldehyde = {
    name: "Formaldehyde",
    icon: "resources/celestialites/formaldehyde.png",
    health: new Decimal(42000),
    damage: new Decimal(50),
    defense: new Decimal(25),
    luck: new Decimal(0),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Radioactive Decimation",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 8)
            },
            cooldown: new Decimal(30),
        },
        1: {
            name: "Radioactive Blitz",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 1)
            },
            cooldown: new Decimal(1.4),
        },
        2: {
            name: "Rhythmic Radiation",
            instant: true,
            type: "function",
            cooldown: new Decimal(20),
            onTrigger(index, slot, target)
            {
                let random = getRandomInt(6)

                if (random == 0) {
            bulletHellGreen({
                "greenSpearChoreography": {
        loop: true,
        sequence: [
            { delay: 400, dir: 6, speed: 4, loop: true, red: false },                                                                                                                                              
            { delay: 550, dir: 5, speed: 4, loop: true, red: false },             
            { delay: 800, dir: 4, speed: 4, loop: true, red: false },             
            { delay: 950, dir: 3, speed: 4, loop: true, red: false },             
            { delay: 1200, dir: 2, speed: 4, loop: true, red: false },                                                                                                                                              
            { delay: 1350, dir: 1, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                     
            { delay: 1600, dir: 0, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                     
            { delay: 1750, dir: 7, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                     
                ]
                }
                }, { width: 500, height: 500, duration: 18 }) 
                } else if (random == 1)
                {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 1.6, spearSpeed: 4, spearLength: 80, spearWidth: 12, yellowChance: 0.5, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 2) {
            bulletHellGreen({
                "greenSpearChoreography": {
        loop: true,
        sequence: [
            { delay: 200, dir: 6, speed: 4, loop: true, red: true },                                                                                                                                              
            { delay: 300, dir: 5, speed: 4, loop: true, red: true },             
            { delay: 500, dir: 4, speed: 4, loop: true, red: true },             
            { delay: 600, dir: 3, speed: 4, loop: true, red: true },             
            { delay: 800, dir: 2, speed: 4, loop: true, red: true },                                                                                                                                              
            { delay: 900, dir: 1, speed: 4, loop: true, red: true },                                                                                                                                                                                                                                                                                     
            { delay: 1100, dir: 0, speed: 4, loop: true, red: true },                                                                                                                                                                                                                                                                                     
            { delay: 1200, dir: 7, speed: 4, loop: true, red: true },                                                                                                                                                                                                                                                                                     
                ]
                }
                }, { width: 500, height: 500, duration: 18 }) 
                } else if (random == 3) {
                    bulletHellGreen({
                    "greenSpearChoreography": {
                    loop: true,
                    sequence: [
                    { delay: 250, dir: 0, speed: 4, loop: true, yellow: true },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    { delay: 500, dir: 2, speed: 4, loop: true, yellow: true },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    { delay: 750, dir: 4, speed: 4, loop: true, yellow: true },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    { delay: 1000, dir: 6, speed: 4, loop: true, yellow: true },                                                                                                                                                                                                                                                                                                                                                                                                                               
                    ]
                    }
                    }, { width: 500, height: 500, duration: 18 }) 
                } else if (random == 4) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 3, spearSpeed: 5, spearLength: 80, spearWidth: 12, yellowChance: 0.1, orbitSpeed: 0.3, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 5) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 4, spearSpeed: 4, spearLength: 80, spearWidth: 12, redChance: 0.5,fourDir: true}}, {width:500, height:500, duration:16})
                } else if (random == 6){
                                            bulletHellGreen({
                "greenSpearChoreography": {
        loop: true,
        sequence: [
            { delay: 400, dir: 6, speed: 4, loop: true, red: false },                                                                                                                                              
            { delay: 550, dir: 5, speed: 4, loop: true, red: false },             
            { delay: 800, dir: 4, speed: 4, loop: true, red: false },             
            { delay: 950, dir: 3, speed: 4, loop: true, red: false },             
            { delay: 1200, dir: 2, speed: 4, loop: true, red: false },                                                                                                                                              
            { delay: 1350, dir: 1, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                     
            { delay: 1600, dir: 0, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                     
            { delay: 1750, dir: 7, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                     
                ]
                }
                }, { width: 500, height: 500, duration: 18 }) 
                } 
                
            }
        },
                
            
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(3), 10)
        return gain
    },
}
BHC.uf6 = {
    name: "Uranium Hexafluoride",
    icon: "resources/celestialites/uf6.png",
    health: new Decimal(46000),
    damage: new Decimal(50),
    defense: new Decimal(25),
    luck: new Decimal(0),
    agility: new Decimal(12),
    actions: {
        0: {
            name: "Tactical Nuke",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(4)], // Chance / Stun-Type / Stun-Time
            },
            value() {
                return player.bh.celestialite.damage.mul(0.4)
            },
            cooldown: new Decimal(80),
        },
        1: {
            name: "Rhythmic Radiation",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                let random = getRandomInt(6)

                if (random == 0) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 4, spearSpeed: 3, spearLength: 80, spearWidth: 12, redChance: 0.3, fourDir: true}}, {width:500, height:500, duration:16})
                } else if (random == 1)
                {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 1.7, spearSpeed: 4, spearLength: 80, spearWidth: 12, yellowChance: 1, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 2) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 3, spearSpeed: 5, spearLength: 80, spearWidth: 12, noRepeatDir: true, fourDir: true}}, {width:500, height:500, duration:16})
                } else if (random == 3) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 4, spearSpeed: 3, spearLength: 80, spearWidth: 12, redChance: 0, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 4) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 2.4, spearSpeed: 4, spearLength: 80, spearWidth: 12, yellowChance: 0.5, redChance: 0.5, orbitSpeed: 0.15,fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 5) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 1, spearSpeed: 4, spearLength: 80, spearWidth: 12, yellowChance: 1, orbitSpeed: 10,fourDir: true}}, {width:500, height:500, duration:16})
                }
            },
            cooldown: new Decimal(20),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(3), 10)
        return gain
    },
}
BHC.strychnine = {
    name: "Strychnine",
    icon: "resources/celestialites/strychnine.png",
    health: new Decimal(60000),
    damage: new Decimal(50),
    defense: new Decimal(20),
    luck: new Decimal(0),
    agility: new Decimal(16),
    actions: {
        0: {
            name: "Tactical Nuke",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            properties: {
                "stun": [new Decimal(1), "soft", new Decimal(4)], // Chance / Stun-Type / Stun-Time
            },
            value() {
                return player.bh.celestialite.damage.mul(0.4)
            },
            cooldown: new Decimal(80),
        },
        1: {
            name: "Radioactive Blitz",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                makeShinies(deadlyRadiation, 1)
            },
            cooldown: new Decimal(1),
        },
        2: {
            name: "Rhythmic Radiation",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                let random = getRandomInt(7)

                if (random == 0) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 9, spearSpeed: 4, spearLength: 80, spearWidth: 12, redChance: 0.9, fourDir: false, noRepeatDir: true}}, {width:500, height:500, duration:16})
                } else if (random == 1)
                {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 5, spearSpeed: 4, spearLength: 80, spearWidth: 12, blueChance: 1, fourDir: true}}, {width:500, height:500, duration:16})
                } else if (random == 2) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 4, spearSpeed: 4, spearLength: 80, spearWidth: 12, blueChance: 1, noRepeatDir: false, fourDir: false}}, {width:500, height:500, duration:16})
                } else if (random == 3) {
                    bulletHellGreen({"greenSpearRain": {spearPerSec: 1.8, spearSpeed: 4, spearLength: 80, spearWidth: 12, yellowChance: 1, fourDir: true}}, {width:500, height:500, duration:16})
                } else if (random == 4) {
                       bulletHellGreen({
                        "greenSpearChoreography": {
                        loop: true,
                        sequence: [
                        { delay: 150, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 300, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 450, dir: 2, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 600, dir: 2, speed: 4, loop: true, blue: true },     
                        { delay: 750, dir: 0, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 900, dir: 0, speed: 4, loop: true, blue: true },    
                        { delay: 1050, dir: 2, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 1200, dir: 2, speed: 4, loop: true, blue: true },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                        ]
                        }
                        }, { width: 500, height: 500, duration: 18 }) 
                } else if (random == 5) {
                       bulletHellGreen({
                        "greenSpearChoreography": {
                        loop: true,
                        sequence: [
                        { delay: 200, dir: 4, speed: 4, loop: true, blue: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 400, dir: 0, speed: 4, loop: true, blue: false },                                                                                                                                                                                                                                                                                                                                                                                                                               
                        { delay: 600, dir: 4, speed: 4, loop: true, blue: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 800, dir: 0, speed: 4, loop: true, blue: false },     
                        { delay: 1000, dir: 4, speed: 4, loop: true, blue: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 1200, dir: 0, speed: 4, loop: true, blue: false },    
                        { delay: 1400, dir: 4, speed: 4, loop: true, blue: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        { delay: 1600, dir: 0, speed: 4, loop: true, blue: false },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                        ]
                        }
                        }, { width: 500, height: 500, duration: 18 }) 
                } else if (random == 6) {
                bulletHellGreen({
                "greenSpearChoreography": {
        loop: true,
        sequence: [
            { delay: 500, dir: 6, speed: 4, loop: true, yellow: true },                                                                                                                                              
            { delay: 1000, dir: 5, speed: 4, loop: true, yellow: true },             
            { delay: 1500, dir: 4, speed: 4, loop: true, yellow: true },             
            { delay: 2000, dir: 3, speed: 4, loop: true, yellow: true },             
            { delay: 2500, dir: 2, speed: 4, loop: true, yellow: true },                                                                                                                                              
            { delay: 3000, dir: 1, speed: 4, loop: true, yellow: true },                                                                                                                                                                                                                                                                                     
            { delay: 3500, dir: 0, speed: 4, loop: true, yellow: true },                                                                                                                                                                                                                                                                                     
            { delay: 4000, dir: 7, speed: 4, loop: true, yellow: true },                                                                                                                                                                                                                                                                                     
                ]
                }
                }, { width: 500, height: 500, duration: 18 }) 
                }
            },
            cooldown: new Decimal(20),
        },
    },

    reward() {
        let gain = {}

        gain.celestialRadiation = Decimal.add(getRandomInt(5), 16)
        return gain
    },
}
BHC.templeMan = {
    name: "???",
    icon: "resources/templeMan.png",
    health: new Decimal(999999999),
    damage: new Decimal(70),
    luck: new Decimal(0),
    agility: new Decimal(0),
    noRandomStats: true,
    immortal: true,
    actions: {
        0: {
            name: "???",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                if (player.bh.celestialite.attackID == 0) {
                    bulletHell({"darkRain": {bulletPerSec: 7}}, {width: window.innerWidth, height: window.innerHeight, duration: 15, transparent: true,  blindness: 500})
                } else if (player.bh.celestialite.attackID == 1) {
                    bulletHell({"delayHomingSwarm": {spawnPerSec: 4, driftTime: 1200, lockTime: 600, fireSpeed: 12, radius: 16}}, {width: window.innerWidth,height: window.innerHeight, transparent: true,  duration: 12, blindness: 500})
                } else if (player.bh.celestialite.attackID == 2) {
                    bulletHell({"darkKnifeThrow": {katanaLength: 90, katanaWidth: 12, knivesPerThrow: 2, enemySpeed: 8, knifePerSec: 2, aimTime: 600}}, {width: window.innerWidth, height: window.innerHeight, transparent: true,  duration: 15, blindness: 400})
                } else if (player.bh.celestialite.attackID == 3) {
                    bulletHell({"spinningKatanaGrid": {spacing: 150, speed: 1.2, spinSpeed: 0.02, katanaLength: 70, katanaWidth: 14}}, {width: window.innerWidth, height: window.innerHeight, transparent: true, duration: 15, blindness: 300})
                } else if (player.bh.celestialite.attackID == 4) {
                    bulletHell({"abyssalLasers": {laserPerSec: 2.5, chargeTime: 1200, lockDelay: 300, fireTime: 400, beamWidth: 24}}, {width: window.innerWidth, height: window.innerHeight, transparent: true,  duration: 15, blindness: 500})
                } else if (player.bh.celestialite.attackID == 5) {
                    bulletHell({"darkKnifeThrow": {knifeLength: 80, knifeWidth: 20, knivesPerThrow: 1, enemySpeed: 9, knifePerSec: 1}}, {width: window.innerWidth,height: window.innerHeight, duration: 25, transparent: true, timed: true, cellSize: 75, start: "cell", goal: "cell", blindness: 150})
                } else if (player.bh.celestialite.attackID == 6) {
                    bulletHell({"abyssalCrossfire": {laserPerSec: 1, katanaPerSec: 1, laserCharge: 1200, katanaAim: 800, katanaSpeed: 14}}, {width: window.innerWidth, transparent: true,  height: window.innerHeight, duration: 20, blindness: 300})
                } else if (player.bh.celestialite.attackID == 7) {
                    bulletHell({"spinningKatanaGrid": {spacing: 150, speed: 1.5, spinSpeed: 0.02, katanaLength: 70, katanaWidth: 14}}, {width: window.innerWidth, height: window.innerHeight, transparent: true, duration: 15, blindness: 300})
                } else if (player.bh.celestialite.attackID == 8) {
                    bulletHell({"delayHomingSwarm": {spawnPerSec: 7, driftTime: 1200, lockTime: 600, fireSpeed: 9, radius: 16}}, {width: window.innerWidth,height: window.innerHeight, transparent: true,  duration: 12, blindness: 300})
                } else if (player.bh.celestialite.attackID == 9) {
                    bulletHell({"darkKnifeThrow": {katanaLength: 90, katanaWidth: 12, knivesPerThrow: 1, enemySpeed: 8, knifePerSec: 4, aimTime: 800}}, {width: window.innerWidth, height: window.innerHeight, transparent: true,  duration: 15, blindness: 400})
                } else if (player.bh.celestialite.attackID == 10) {
                    bulletHell({"darkRain": {bulletPerSec: 7}}, {width: window.innerWidth, transparent: true,  height: window.innerHeight, duration: 15, blindness: 200})
                } else if (player.bh.celestialite.attackID == 11) {
                    bulletHell({"abyssalLasers": {laserPerSec: 1, chargeTime: 1200, lockDelay: 500, fireTime: 400, beamWidth: 24}}, {width: window.innerWidth,height: window.innerHeight, duration: 25, timed: true, transparent: true, cellSize: 75, start: "cell", goal: "cell", blindness: 150})
                } else if (player.bh.celestialite.attackID == 12) {
                    bulletHell({"abyssalCrossfire": {laserPerSec: 1.6, katanaPerSec: 1.4, laserCharge: 1200, katanaAim: 800, katanaSpeed: 14}}, {width: window.innerWidth, transparent: true,  height: window.innerHeight, duration: 20, blindness: 300})
                } else if (player.bh.celestialite.attackID == 13) {
                    bulletHell({"safeZoneLasers": {interval: 2000, safeWidth: 120, chargeTime: 1000, fireTime: 500}}, {width: window.innerWidth, transparent: true, height: window.innerHeight, duration: 20, blindness: 300})
                } else if (player.bh.celestialite.attackID == 14) {
                    bulletHell({"spinningKatanaGrid": {spacing: 150, speed: 1.8, spinSpeed: 0.025, katanaLength: 75, katanaWidth: 14}}, {width: window.innerWidth, height: window.innerHeight, transparent: true, duration: 15, blindness: 300})
                } else if (player.bh.celestialite.attackID == 15) {
                    bulletHell({"spinningKatanaGrid": {spacing: 300, speed: 1.5, spinSpeed: 0.02, katanaLength: 70, katanaWidth: 14}}, {width: window.innerWidth,height: window.innerHeight, duration: 25, transparent: true, timed: true, cellSize: 75, start: "cell", goal: "cell", blindness: 300})
                } else if (player.bh.celestialite.attackID == 16) {
                    bulletHell({"abyssalCrossfire": {laserPerSec: 1, katanaPerSec: 0.8, laserCharge: 1200, katanaAim: 800, katanaSpeed: 14}}, {width: window.innerWidth, transparent: true,  height: window.innerHeight, duration: 20, blindness: 100})
                } else if (player.bh.celestialite.attackID == 17) {
                    bulletHell({"safeZoneLasers": {interval: 1500, safeWidth: 80, chargeTime: 800, fireTime: 500}}, {width: window.innerWidth, transparent: true, height: window.innerHeight, duration: 20, blindness: 300})
                } else if (player.bh.celestialite.attackID == 18) {
                    bulletHell({"abyssalSanctuary": {}}, {width: window.innerWidth, height: window.innerHeight,transparent: true, duration: 32, blindness: 500})
                } else if (player.bh.celestialite.attackID >= 19) {
                    celestialiteDeath();
                }
                player.bh.celestialite.attackID = player.bh.celestialite.attackID + 1
            },
            cooldown: new Decimal(12),
        },
    },

    reward() {
        let gain = {}

        if (!player.anl.clearedRooms.roomTemple) gain.ascensionShards = Decimal.add(1)
        if (player.anl.clearedRooms.roomTemple) gain.ascensionShards = Decimal.add(0) //haha
        return gain
    },
}
//A buncha ghost layers
addLayer("roomA", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
    startData() { return {
        unlocked: true,
    }},
    nodeStyle() {
        let str = {
            background: "linear-gradient(180deg, #3c501d 0%, #4b5721 100%)",
            backgroundOrigin: "border-box",
            color: "#daff74",
            transform: "translate(0px, 0px)"
        };
        if (player.anl.selectedRoom == "roomA") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room A",
    onClick() {
        player.anl.selectedRoom = "roomA"
        player.anl.selectedRoomDisplay = "Room A"
    },
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return true},
})
addLayer("roomB", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomA", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomB"
        player.anl.selectedRoomDisplay = "Room B"
    },
    nodeStyle() {
        let str = {
            background: "linear-gradient(0deg, #27501d 0%, #3a501d 100%)",
            backgroundOrigin: "border-box",
            color: "#daff74",
            transform: "translate(25px, -40px)"
        };
        if (player.anl.selectedRoom == "roomB") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room B",
    startData() { return {
        unlocked: true,
    }},
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return player.anl.clearedRooms.roomA}, //change eventually
})
addLayer("roomC", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomC"
        player.anl.selectedRoomDisplay = "Room C"
    },
    nodeStyle() {
        let str = {
            background: "linear-gradient(90deg, #30501d 0%, #4b501d 100%)",
            backgroundOrigin: "border-box",
            color: "#b7ff74",
            transform: "translate(50px, 0px)"
        };
        if (player.anl.selectedRoom == "roomTemple") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room C",
    startData() { return {
        unlocked: true,
    }},
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return hasUpgrade("anl", 13) && !(player.anl.clearedRooms.roomC && !player.aniciffoLabyrinth.noxToggle && !player.aniciffoLabyrinth.creationToggle && player.aniciffoLabyrinth.eclipseToggle )}, //change eventually
})
addLayer("roomTemple", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⛩", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomTemple"
        player.anl.selectedRoomDisplay = "???"
    },
    nodeStyle() {
        let str = {
            background: "radial-gradient(#113, black)",
            backgroundOrigin: "border-box",
            borderColor: "#226",
            color: "#88f",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            margin: "0 0 20px 60px !important",
            transform: "translate(-5px, 10px)"
        }
        if (player.anl.selectedRoom == "roomTemple") str.outline = "3px solid #999"
        return str
    },
    tooltip: "⛩",
    startData() { return {
        unlocked: true,
    }},
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return hasUpgrade("anl", 13) && (player.anl.clearedRooms.roomC && !player.aniciffoLabyrinth.noxToggle && !player.aniciffoLabyrinth.creationToggle && player.aniciffoLabyrinth.eclipseToggle )}, //change eventually
})
addLayer("roomD", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomD"
        player.anl.selectedRoomDisplay = "Room D"
    },
    nodeStyle() {
        let str = {
            background: "linear-gradient(90deg, #1d5038 0%, #1d5024 100%)",
            backgroundOrigin: "border-box",
            color: "#46bd85",
            transform: "translate(75px, 50px)"
        };
        if (player.anl.selectedRoom == "roomD") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room D",
    startData() { return {
        unlocked: true,
    }},
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return hasUpgrade("anl", 21)},
})
addLayer("roomE", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomE"
        player.anl.selectedRoomDisplay = "Room E"
    },
    nodeStyle() {
        let str = {
            background: "linear-gradient(90deg, #15423b 0%, #1d5038 100%)",
            backgroundOrigin: "border-box",
            color: "#46bd85",
            transform: "translate(100px, -0px)"
        };
        if (player.anl.selectedRoom == "roomE") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room E",
    startData() { return {
        unlocked: true,
    }},
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return hasChallenge("anl", 11) >= 1},
})
addLayer("roomF", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomF"
        player.anl.selectedRoomDisplay = "Room F"
    },
    nodeStyle() {
        let str = {
            background: "linear-gradient(135deg, #153942 0%, #1d5045 100%)",
            backgroundOrigin: "border-box",
            color: "#318397",
            transform: "translate(125px, -25px)"
        };
        if (player.anl.selectedRoom == "roomF") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room F",
    startData() { return {
        unlocked: true,
    }},
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return (hasChallenge("anl", 12) >= 1 && hasChallenge("anl", 13) >= 1)},
})
addLayer("roomG", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomG"
        player.anl.selectedRoomDisplay = "Room G"
    },
    nodeStyle() {
        let str = {
            background: "linear-gradient(135deg, #153542 0%, #152a42 100%)",
            backgroundOrigin: "border-box",
            color: "#316997",
            transform: "translate(150px, -50px)"
        };
        if (player.anl.selectedRoom == "roomG") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room G",
    startData() { return {
        unlocked: true,
    }},
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return (hasChallenge("anl", 14) >= 1)},
})
addLayer("roomH", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomH"
        player.anl.selectedRoomDisplay = "Room H"
    },
    nodeStyle() {
        let str = {
            background: "linear-gradient(45deg, #1a265f 0%, #153242 100%)",
            backgroundOrigin: "border-box",
            color: "#314097",
            transform: "translate(175px, -70px)"
        };
        if (player.anl.selectedRoom == "roomG") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room H",
    startData() { return {
        unlocked: true,
    }},
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return (hasChallenge("anl", 15) >= 1)},
})
const deadlyRadiation = {
    image: "resources/radiation/deadlyRadiation.png",
    time() {
        let time = new Decimal(3) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    clicked: false,
    onClick(index, slot) {
        this.clicked = true
        Vue.delete(particles, this.id)
    },
    onDespawn() {
        let id = getRandomInt(3)
        bhAttack(new Decimal(100), 3, 0, id, "", "magic")
        makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>" + player.bh.characters[id].id.charAt(0).toUpperCase() + player.bh.characters[id].id.slice(1) + " has taken radioactive damage!</small>"})
    },
}
const marcelTimeStop = {
    image: "resources/radiation/clock.png",
    time() {
        let time = new Decimal(4) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    clicked: false,
    onClick(index, slot) {
        this.clicked = true
        Vue.delete(particles, this.id)

        player.anl.timeStopTimer = new Decimal(5)
        launchZaWarudoDOMEffect(this.x, this.y, 5000)
    },
}