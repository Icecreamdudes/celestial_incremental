
addLayer("fi", {
    name: "Fighting", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Fight", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        battleCapacity: new Decimal(4),
        battleCapacityAvailable: new Decimal(4),
        battleCapacityCost: new Decimal(1),

        petMaxHP: [[new Decimal(150),new Decimal(150),new Decimal(150),new Decimal(150),new Decimal(150),new Decimal(100),], [new Decimal(250)]],
        petDamage: [[new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),], [new Decimal(25)]],

        petTitle: "",
        
        selectedMaxHP: new Decimal(0),
        selectedDamage: new Decimal(0),

        damageButtonBaseGain: [new Decimal(1),new Decimal(2),new Decimal(5),new Decimal(12),], //damage gain is affected by starmetal binding level
        healthButtonBaseGain: [new Decimal(1),new Decimal(2),new Decimal(5),new Decimal(12),], //health gain is affected by normal pet level

        damageButtonGain: [new Decimal(1),new Decimal(2),new Decimal(5),new Decimal(12),], 
        healthButtonGain: [new Decimal(1),new Decimal(2),new Decimal(5),new Decimal(12),], 

        damageButtonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),], 
        healthButtonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),], 

        damageButtonTimersMax: [new Decimal(600),new Decimal(1800),new Decimal(5400),new Decimal(16200),],
        healthButtonTimersMax: [new Decimal(600),new Decimal(1800),new Decimal(5400),new Decimal(16200),], 

        petIndex: new Decimal(0),
        rarityIndex: new Decimal(0),

        selectedPets: [[false, false, false, false, false, false], [false]],
        selectedIDs: [],

        battleButtonTimers: [new Decimal(0),], 
        battleButtonTimersMax: [new Decimal(1800),], 

        battleTier: new Decimal(0),
        inBattle: false,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Fighting",
    color: "#8b0000ff",
    branches: [],
    update(delta) {
        player.fi.battleCapacity = new Decimal(4)

        //player.fi.petMaxHP = [[new Decimal(100),new Decimal(150),new Decimal(100),new Decimal(200),new Decimal(150),new Decimal(100),], [new Decimal(250)]]
        //player.fi.petDamage = [[new Decimal(25),new Decimal(20),new Decimal(20),new Decimal(15),new Decimal(25),new Decimal(20),], [new Decimal(25)]]

        player.fi.petTitle = tmp.sme.levelables[layers.sme.levelables.index].title.toString()


        if (layers.sme.levelables.index != 0)
        {
            player.fi.selectedMaxHP = tmp.sme.levelables[layers.sme.levelables.index].effect[0]
            player.fi.selectedDamage = tmp.sme.levelables[layers.sme.levelables.index].effect[1]
        }

        let damageFactor = new Decimal(1)
        if (layers.sme.levelables.index < 200) damageFactor = player.sme.levelables[layers.sme.levelables.index][0].mul(0.75)
        if (layers.sme.levelables.index > 200) damageFactor = player.sme.levelables[layers.sme.levelables.index][0].mul(3.25)

        let healthFactor = new Decimal(1)
        if (layers.sme.levelables.index < 200) healthFactor = player.sme.levelables[layers.sme.levelables.index][0].mul(2.5)
        if (layers.sme.levelables.index > 200) healthFactor = player.sme.levelables[layers.sme.levelables.index][0].mul(15)

        for (let i = 0; i < player.fi.damageButtonTimers.length; i++)
        {
            player.fi.damageButtonTimers[i] = player.fi.damageButtonTimers[i].sub(delta)
            player.fi.healthButtonTimers[i] = player.fi.healthButtonTimers[i].sub(delta)

            player.fi.damageButtonGain[i] = player.fi.damageButtonBaseGain[i].mul(damageFactor)
            player.fi.healthButtonGain[i] = player.fi.healthButtonBaseGain[i].mul(healthFactor)
        }

        for (let i = 0; i < player.fi.battleButtonTimers.length; i++)
        {
            player.fi.battleButtonTimers[i] = player.fi.battleButtonTimers[i].sub(delta)
        }

        if (player.fi.rarityIndex == 0)
        {
            player.fi.battleCapacityCost = new Decimal(1)
        }
        if (player.fi.rarityIndex == 1)
        {
            player.fi.battleCapacityCost = new Decimal(2)
        }

        for (let i = 0; i < player.fi.battleButtonTimers.length; i++)
        {
            player.fi.battleButtonTimers[i] = player.fi.battleButtonTimers[i].sub(delta)
        }

        player.fi.selectedIDs = [];
        for (let rarity = 0; rarity < player.fi.selectedPets.length; rarity++) {
        for (let i = 0; i < player.fi.selectedPets[rarity].length; i++) {
        if (player.fi.selectedPets[rarity][i]) {
            let id = rarity === 0 ? 101 + i : 201 + i;
            player.fi.selectedIDs.push(id);
        }
    }
}
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', minHeight: '50px' },
        },
        2: {
            title() { return "<h3>Select this pet" },
            canClick() { return player.fi.battleCapacityAvailable.gte(player.fi.battleCapacityCost) && player.sme.levelables[layers.sme.levelables.index][2] == false },
            unlocked() { return true },
            onClick() {
                player.sme.levelables[layers.sme.levelables.index][2] = true
                player.fi.selectedPets[player.fi.rarityIndex][player.fi.petIndex] = true
                player.fi.battleCapacityAvailable = player.fi.battleCapacityAvailable.sub(player.fi.battleCapacityCost)
            },
            style: { width: '100px', minHeight: '25px' },
        },
        3: {
            title() { return "<h3>Unselect this pet" },
            canClick() { return player.sme.levelables[layers.sme.levelables.index][2] == true  },
            unlocked() { return true },
            onClick() {
                player.sme.levelables[layers.sme.levelables.index][2] = false
                player.fi.selectedPets[player.fi.rarityIndex][player.fi.petIndex] = false
                player.fi.battleCapacityAvailable = player.fi.battleCapacityAvailable.add(player.fi.battleCapacityCost)
            },
            style: { width: '100px', minHeight: '25px' },
        },
        11: {
            title() { return "Pet Binding" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Pet Binding"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        12: {
            title() { return "Punchcard Binding" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Punchcard Binding"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        13: {
            title() { return "Preparation" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Prep"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#8b0000ff", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        14: {
            title() { return "Stat Buttons" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Stat Buttons"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(-90deg, #06366e, #1f599bff)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        15: {
            title() { return "Battle" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Battle"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(90deg, #85300fff, #af1b08ff)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },

        //stat buttons
        101: {
            title() { return player.fi.damageButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.fi.damageButtonTimers[0]) + "." : "<h3>+" + format(player.fi.damageButtonGain[0]) + " DMG."},
            canClick() { return player.fi.damageButtonTimers[0].lte(0) && layers.sme.levelables.index != 0 },
            unlocked() { return true },
            onClick() {
                player.fi.petDamage[player.fi.rarityIndex][player.fi.petIndex] = player.fi.petDamage[player.fi.rarityIndex][player.fi.petIndex].add(player.fi.damageButtonGain[0])
                player.fi.damageButtonTimers[0] = player.fi.damageButtonTimersMax[0]
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#052a55ff",},
        },
        102: {
            title() { return player.fi.healthButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.fi.healthButtonTimers[0]) + "." : "<h3>+" + format(player.fi.healthButtonGain[0]) + " HP."},
            canClick() { return player.fi.healthButtonTimers[0].lte(0) && layers.sme.levelables.index != 0 },
            unlocked() { return true },
            onClick() {
                player.fi.petMaxHP[player.fi.rarityIndex][player.fi.petIndex] = player.fi.petMaxHP[player.fi.rarityIndex][player.fi.petIndex].add(player.fi.healthButtonGain[0])
                player.fi.healthButtonTimers[0] = player.fi.healthButtonTimersMax[0]
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px",  borderLeft: "0px", backgroundColor: "#6e0606ff",},
        },
        103: {
            title() { return "Damage Button 2" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#0a4385ff",},
        },
        104: {
            title() { return "Health Button 2" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#991111ff",},
        },
        105: {
            title() { return "Damage Button 3" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#1763b9ff",},
        },
        106: {
            title() { return "Health Button 3" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#b41c1cff",},
        },
        107: {
            title() { return "Damage Button 4" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#2574ceff",},
        },
        108: {
            title() { return "Health Button 4" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#ce2b2bff",},
        },

        //battle
        201: {
            title() { return player.fi.battleButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.fi.battleButtonTimers[0]) + "." : "<h3>Fight Tier I Enemies"},
            canClick() { return player.fi.battleButtonTimers[0].lte(0) && player.fi.battleCapacityAvailable.lt(player.fi.battleCapacity) },
            unlocked() { return true },
            onClick() {
                player.ma.inBlackHeart = true //bruh shouldve named this variable smth else :sob:
                player.tab = "ba"
                toggleOpt('menuShown')

                player.ba.petIndex = new Decimal(0)
                player.ba.celestialiteIndex = new Decimal(0)

                player.fi.battleTier = new Decimal(1)
                player.fi.battleButtonTimers[0] = player.fi.battleButtonTimersMax[0]

                player.ba.petIDs = player.fi.selectedIDs

                player.ba.petHealths = []
                player.ba.petMaxHealths = []
                player.ba.petDamages = []
                player.ba.celestialiteIDs = [] 
                for (let i = 0; i < player.fi.selectedIDs.length; i++) {
                let health = new Decimal(levelableEffect("sme", player.fi.selectedIDs[i])[0])
                player.ba.petHealths.push(health);
                }
                for (let i = 0; i < player.fi.selectedIDs.length; i++) {
                let health = new Decimal(levelableEffect("sme", player.fi.selectedIDs[i])[0])
                player.ba.petMaxHealths.push(health);
                }
                for (let i = 0; i < player.fi.selectedIDs.length; i++) {
                let health = new Decimal(levelableEffect("sme", player.fi.selectedIDs[i])[1])
                player.ba.petDamages.push(health);
                }

                layers.ba.selectCelestialites()

                player.ba.round = new Decimal(1)
                player.ba.wave = new Decimal(1)

                player.fi.inBattle = true
                player.subtabs["ba"]["content"] = "Main"
            },
            style() {
                let look = {width: "300px", minHeight: "75px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#8b0000ff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    levelables: {
    },
    bars: {

    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        content: {
            "Pet Binding": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["layer-proxy", ["sme", [
                                        ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2]], {width: '100px', height: '40px' }],
                            ]],
                        ], {width: "550px", height: "175px", backgroundColor: "#29132eff", borderBottom: "3px solid #cb79ed"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Epic", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#28182f", borderBottom: "3px solid #cb79ed", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101],["levelable", 102],["levelable", 103],["levelable", 104],["levelable", 105],]],
                                ["row", [["levelable", 106],]],
                            ], {width: "525px", backgroundColor: "#28182f", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201],]],
                            ], {width: "525px", backgroundColor: "#2f2a00", padding: "5px"}],

                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", backgroundColor: "#161616", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                    ]]]
                ],
            },
            "Punchcard Binding": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                ],
            },
            "Prep": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                        ["raw-html", function () { return "Battle Capacity: " + formatWhole(player.fi.battleCapacityAvailable) + "/" + formatWhole(player.fi.battleCapacity) + "." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Select pets you want to bring into battle." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                                    ["blank", "10px"],
                        ["row", [["clickable", 2],["clickable", 3],]],
                    ], {width: "550px", height: "175px", backgroundImage: "linear-gradient(90deg, #640d0dff, #920044ff)", borderBottom: "3px solid #cb79ed"}],       
                        ["layer-proxy", ["sme", [
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Epic", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#28182f", borderBottom: "3px solid #cb79ed", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101],["levelable", 102],["levelable", 103],["levelable", 104],["levelable", 105],]],
                                ["row", [["levelable", 106],]],
                            ], {width: "525px", backgroundColor: "#28182f", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "62px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201],]],
                            ], {width: "525px", backgroundColor: "#2f2a00", padding: "5px"}],

                        ], {width: "550px", height: "522px"}],
                    ]]]
                    ], {width: "550px", height: "700px", backgroundImage: "linear-gradient(90deg, #640d0dff, #920044ff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                ],
            },
            "Stat Buttons": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                    ["style-column", [
                        ["style-row", [
                            ["style-column", [
                                ["style-row", [["hoverless-clickable", 101], ["hoverless-clickable", 102]], {width: '300px', height: '43.75px' }],
                                ["style-row", [["hoverless-clickable", 103], ["hoverless-clickable", 104]], {width: '300px', height: '43.75px' }],
                                ["style-row", [["hoverless-clickable", 105], ["hoverless-clickable", 106]], {width: '300px', height: '43.75px' }],
                                ["style-row", [["hoverless-clickable", 107], ["hoverless-clickable", 108]], {width: '300px', height: '43.75px' }],
                            ], {width: "300px", height: "175px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)",}],  
                            ["style-column", [
                        ["raw-html", function () { return player.fi.petTitle }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Max Health: " + player.fi.selectedMaxHP}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Damage: " + player.fi.selectedDamage}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "(Stat gains are based on starmetal binding level)" }, { "color": "white", "font-size": "10px", "font-family": "monospace" }],
                            ], {width: "250px", height: "175px", backgroundColor: "#29132eff",}],  
                        ], {width: "550px", height: "175px", backgroundColor: "#29132eff",}], 
                    ], {width: "550px", height: "175px", backgroundColor: "#29132eff", borderBottom: "3px solid #cb79ed"}],    
                    ["layer-proxy", ["sme", [
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Epic", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#28182f", borderBottom: "3px solid #cb79ed", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101],["levelable", 102],["levelable", 103],["levelable", 104],["levelable", 105],]],
                                ["row", [["levelable", 106],]],
                            ], {width: "525px", backgroundColor: "#28182f", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "62px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201],]],
                            ], {width: "525px", backgroundColor: "#2f2a00", padding: "5px"}],

                        ], {width: "550px", height: "522px"}],
                    ]]]
                    ], {width: "550px", height: "700px", backgroundImage: "linear-gradient(90deg, #06366e, #1f599bff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                ],
            },
            "Battle": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                    ["style-row", [["clickable", 201]], {width: '300px', height: '100px' }], // make sure theres a 25px gap in between each
                    ["style-row", [], {width: '300px', height: '600px' }],
                    ], {width: "550px", height: "700px", backgroundImage: "linear-gradient(-90deg, #85300fff, #af1b08ff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                ],
            },
            "Fight": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [

                ],
            },
        },
    },
    tabFormat: [
        ["blank", "10px"],
        ["style-row", [
            ["scroll-column", [
                ["hoverless-clickable", 11], ["hoverless-clickable", 12], ["hoverless-clickable", 13], ["hoverless-clickable", 14], ["hoverless-clickable", 15],
            ], {width: "125px", height: "700px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderRight: "3px solid white"}],
            ["buttonless-microtabs", "content", { 'border-width': '0px' }],
        ], {border: "3px solid white"}],
    ],
    layerShown() { return player.startedGame == true }
})
