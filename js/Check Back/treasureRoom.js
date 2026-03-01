addLayer("ev14", {
    name: "Treasure Room", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Tr", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        keys: new Decimal(0),
        chestNumber: new Decimal(0),

        orbInput: new Decimal(0),
        keysToGet: new Decimal(0),

        timers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(64800),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(7200),
            },
        },
    }},
    nodeStyle: {
        background: "linear-gradient(0deg, #202020, #404040)",
    backgroundOrigin: "border-box",
    borderColor: "#000000",
    color: "#c000c0"
    },
    tooltip: "Treasure Room",
    color: "white",
    branches: ["ev2"],
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        for (let i in player.ev14.timers) {
            player.ev14.timers[i].current = player.ev14.timers[i].current.sub(onepersec.mul(delta))
        }

        // KEY MODIFIERS
        player.ev14.keysToGet = new Decimal(0);
        player.ev14.keysToGet = player.ev14.keysToGet.add(player.ev14.orbInput.div(10));
    },
    clickables: {
        // controls
        "A0": {
            title: "0%",
            canClick() {
                return true
            },
            unlocked: true,
            onClick() {
                player.ev14.orbInput = player.ev2.orbs.mul(0)
            },
            style: {
                width: "50px", 
                minHeight: "25px", 
                fontSize: "10px", 
                borderRadius: "10px",
                "background-color": "#cccccc"
            },
            tooltip: "Get a girlfriend."
        },
        "A1": {
            title: "1%",
            canClick() {
                return true
            },
            unlocked: true,
            onClick() {
                player.ev14.orbInput = player.ev2.orbs.mul(0.01)
            },
            style: {
                width: "50px", 
                minHeight: "25px", 
                fontSize: "10px", 
                borderRadius: "10px",
                "background-color": "#cccccc"
            },
        },
        "A5": {
            title: "5%",
            canClick() {
                return true
            },
            unlocked: true,
            onClick() {
                player.ev14.orbInput = player.ev2.orbs.mul(0.05)
            },
            style: {
                width: "50px", 
                minHeight: "25px", 
                fontSize: "10px", 
                borderRadius: "10px",
                "background-color": "#cccccc"
            },
        },
        "A10": {
            title: "10%",
            canClick() {
                return true
            },
            unlocked: true,
            onClick() {
                player.ev14.orbInput = player.ev2.orbs.mul(0.1)
            },
            style: {
                width: "50px", 
                minHeight: "25px", 
                fontSize: "10px", 
                borderRadius: "10px",
                "background-color": "#cccccc"
            },
        },
        "A25": {
            title: "25%",
            canClick() {
                return true
            },
            unlocked: true,
            onClick() {
                player.ev14.orbInput = player.ev2.orbs.mul(0.25)
            },
            style: {
                width: "50px", 
                minHeight: "25px", 
                fontSize: "10px", 
                borderRadius: "10px",
                "background-color": "#cccccc"
            },
        },
        "A50": {
            title: "50%",
            canClick() {
                return true
            },
            unlocked: true,
            onClick() {
                player.ev14.orbInput = player.ev2.orbs.mul(0.5)
            },
            style: {
                width: "50px", 
                minHeight: "25px", 
                fontSize: "10px", 
                borderRadius: "10px",
                "background-color": "#cccccc"
            },
        },
        "A100": {
            title: "100%",
            canClick() {
                return true
            },
            unlocked: true,
            onClick() {
                player.ev14.orbInput = player.ev2.orbs.mul(1)
            },
            style: {
                width: "50px", 
                minHeight: "25px", 
                fontSize: "10px", 
                borderRadius: "10px",
                "background-color": "#cccccc"
            },
        },
        // convert button
        0: {
            title() {
                return player.ev14.timers[0].current.gt(0) 
                ? "<h1>Check back in <br>" + formatTime(player.ev14.timers[0].current) + "." 
                : "<h1>Convert " + formatSimple(player.ev14.orbInput) + " orbs into " + formatSimple(player.ev14.keysToGet) + " keys."
            },
            canClick() { 
                return (
                    player.ev14.orbInput.gt(0) 
                    && player.ev2.orbs.gte(player.ev14.orbInput)
                    && player.ev14.timers[0].current.lt(0)
                )
            },
            unlocked: true,
            tooltip() {
                if (player.ev2.orbs.lt(player.ev14.orbInput)) return "Not enough orbs."
                if (player.ev14.orbInput.lte(0) && player.ev2.paraInput.lte(0)) return "No orbs inputted."
                return ""
            },
            onClick() {
                player.ev2.orbs = player.ev2.orbs.sub(player.ev14.orbInput)
                player.ev14.timers[0].current = player.ev14.timers[0].max
                player.ev14.keys = player.ev14.keys.add(player.ev14.keysToGet)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "60px / 30px"}
                this.canClick() ? look.backgroundColor = "#cccccc" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        // chest images
        "C1": {
            title() { return "<img src='resources/chest1.png'style='width:150px;height:120px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.ev14.chestNumber = new Decimal(1)
            },
            style: { width: "160px", minHeight: "120px", backgroundColor: "#ffffff", border: "5px solid #ffffff", borderRadius: "10px", padding: "0px" },
        },
        "C2": {
            title() { return "<img src='resources/chest2.png'style='width:150px;height:120px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.ev14.chestNumber = new Decimal(2)
            },
            style: { width: "160px", minHeight: "120px", backgroundColor: "#ffd700", border: "5px solid #ffd700", borderRadius: "10px", padding: "0px" },
        },
        "C3": {
            title() { return "<img src='resources/chest3.png'style='width:150px;height:120px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.ev14.chestNumber = new Decimal(3)
            },
            style: { width: "160px", minHeight: "120px", backgroundColor: "#ff8000", border: "5px solid #ff8000", borderRadius: "10px", padding: "0px" },
        },
        "C4": {
            title() { return "<img src='resources/chest4.png'style='width:150px;height:130px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.ev14.chestNumber = new Decimal(4)
            },
            style: { width: "160px", minHeight: "120px", backgroundColor: "#00ffff", border: "5px solid #00ffff", borderRadius: "10px", padding: "0px" },
        },
        "C5": {
            title() { return "<img src='resources/chest5.png'style='width:150px;height:130px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.ev14.chestNumber = new Decimal(5)
            },
            style: { width: "160px", minHeight: "120px", backgroundColor: "#80ff00", border: "5px solid #80ff00", borderRadius: "10px", padding: "0px" },
        },
        "C6": {
            title() { return "<img src='resources/chest6.png'style='width:150px;height:130px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.ev14.chestNumber = new Decimal(6)
            },
            style: { width: "160px", minHeight: "120px", backgroundColor: "#ff00ff", border: "5px solid #ff00ff", borderRadius: "10px", padding: "0px" },
        },
        // open chest buttons
        1: {
            title() {
                return player.ev14.timers[1].current.gt(0) 
                ? "<h1>Check back in <br>" + formatTime(player.ev14.timers[1].current) + "." 
                : "<h1>Open a Tier I Chest."
            },
            canClick() { 
                return (
                    player.ev14.keys.gte(1)
                    && player.ev14.timers[1].current.lt(1)
                )
            },
            unlocked() {return player.ev14.chestNumber == 1},
            onClick() {
                player.ev14.keys = player.ev14.keys.sub(1)
                player.ev14.timers[1].current = player.ev14.timers[1].max
                layers.ev14.openChest()
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "60px / 30px"}
                this.canClick() ? look.backgroundColor = "#ffffff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    tables: {
        1: {
            title() {
                return "Tier I Chest"
            },
            description() {
                return "<div class='chestContainer'><h3>Costs:</h3><br>" +
                formatWhole(player.ev14.keys) + "/1 Keys<br></div>" +
                "<div class='chestContainer'><h3>Loot Table:</h3><br>" +
                "25% - " + formatWhole(player.pet.petPointMult.mul(2500)) + " pet points<br>" + 
                "25% - " + formatWhole(player.pet.petPointMult.mul(1).floor()) + " of the first 9 common pets<br>" +
                "25% - " + formatWhole(player.pet.petPointMult.mul(0.5).floor()) + " of the first 9 uncommon pets<br>" +
                "25% - " + formatSimple(new Decimal(5).mul(levelableEffect("pet", 2203)[1]), 1) + " orbs</div>"
            },
        },
        2: {
            title() {
                return "Tier II Chest"
            },
            description() {
                return "<div class='chestContainer'><h3>Costs:</h3><br>" +
                formatWhole(player.ev14.keys) + "/5 Keys<br>" +
                formatWhole(player.cb.evolutionShards) + "/10 Evo Shards<br>" +
                formatWhole(player.cb.paragonShards) + "/2 Para Shards<br></div>" +
                "<div class='chestContainer'><h3>Loot Table:</h3><br>" +
                "20% - " + formatWhole(player.pet.petPointMult.mul(10000)) + " pet points<br>" + 
                "20% - " + formatWhole(player.pet.petPointMult.mul(5).floor()) + " of the first 9 common pets<br>" +
                "20% - " + formatWhole(player.pet.petPointMult.mul(2.5).floor()) + " of the first 9 uncommon pets<br>" +
                "20% - " + formatWhole(player.pet.petPointMult.mul(1).floor()) + " of the first 9 rare pets<br>" +
                "20% - " + formatSimple(new Decimal(15).mul(levelableEffect("pet", 2203)[1]), 1) + " orbs</div>"
            },
        },
    },
    openChest() {
        let random = Math.random();
        if (player.ev14.chestNumber == 1) {
            if (random < 0.25) {
                let gain = player.pet.petPointMult.mul(2500)
                player.cb.petPoints = player.cb.petPoints.add(gain)
                doPopup("none", "+" + formatWhole(gain) + " pet points!", "Resource Obtained!", 5, "#A2D800", "resources/petPoint.png")
            }
            else if (random < 0.5) {
                let gain = player.pet.petPointMult.mul(1).floor()
                player.pet.levelables[101][1] = player.pet.levelables[101][1].add(gain)
                player.pet.levelables[102][1] = player.pet.levelables[102][1].add(gain)
                player.pet.levelables[103][1] = player.pet.levelables[103][1].add(gain)
                player.pet.levelables[104][1] = player.pet.levelables[104][1].add(gain)
                player.pet.levelables[105][1] = player.pet.levelables[105][1].add(gain)
                player.pet.levelables[106][1] = player.pet.levelables[106][1].add(gain)
                player.pet.levelables[107][1] = player.pet.levelables[107][1].add(gain)
                player.pet.levelables[108][1] = player.pet.levelables[108][1].add(gain)
                player.pet.levelables[109][1] = player.pet.levelables[109][1].add(gain)
                doPopup("none", "+" + formatWhole(gain) + " of the first 9 common pets!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/commonbg.png")
            }
            else if (random < 0.75) {
                let gain = player.pet.petPointMult.mul(0.5).floor()
                player.pet.levelables[201][1] = player.pet.levelables[201][1].add(gain)
                player.pet.levelables[202][1] = player.pet.levelables[202][1].add(gain)
                player.pet.levelables[203][1] = player.pet.levelables[203][1].add(gain)
                player.pet.levelables[204][1] = player.pet.levelables[204][1].add(gain)
                player.pet.levelables[205][1] = player.pet.levelables[205][1].add(gain)
                player.pet.levelables[206][1] = player.pet.levelables[206][1].add(gain)
                player.pet.levelables[207][1] = player.pet.levelables[207][1].add(gain)
                player.pet.levelables[208][1] = player.pet.levelables[208][1].add(gain)
                player.pet.levelables[209][1] = player.pet.levelables[209][1].add(gain)
                doPopup("none", "+" + formatWhole(gain) + " of the first 9 uncommon pets!", "Pet Obtained!", 5, "#88e688", "resources/Pets/uncommonbg.png")
            }
            else {
                let gain = new Decimal(5).mul(levelableEffect("pet", 2203)[1])
                player.ev2.orbs = player.ev2.orbs.add(gain)
                doPopup("none", "+" + formatSimple(gain) + " orbs!", "Resource Obtained!", 5, "#96DED1", "resources/orbs.png")
            }
        }
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cccccc", borderRadius: "5px"} },
                unlocked() {return true},
                content: [
                    ["blank", "5px"],
                    ["raw-html", () => {
                        return "<h3>Orbs to convert:</h3>"
                    },],
                    ["blank", "5px"],
                    ["text-input", "orbInput", {width: "160px", height: "40px", backgroundColor: "rgba(0,0,0,0.4)", color: "white", fontSize: "20px", border: "0px", padding: "0px 10px"}],
                    ["blank", "10px"],
                    ["row", [["clickable", "A0"],["blank", "2.5px"],["clickable", "A1"],["blank", "2.5px"],["clickable", "A5"],["blank", "2.5px"],["clickable", "A10"],["blank", "2.5px"],["clickable", "A25"],["blank", "2.5px"],["clickable", "A50"],["blank", "2.5px"],["clickable", "A100"],]],
                    ["blank", "10px"],
                    ["clickable", 0]
                ]
            },
            "Chests": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#ffd700", borderRadius: "5px"} },
                unlocked() {return true},
                content: [
                    ["style-column", [
                        ["scroll-column", [
                            ["blank", "15px"],
                            ["style-column", [
                                ["blank", "5px"],
                                ["raw-html", "Chests", {fontSize: "36px", color: "#cccccc", fontFamily: "monospace"}],
                                ["blank", "5px"],
                                ["row", [
                                    ["clickable", "C1"],
                                    ["clickable", "C2"],
                                    ["clickable", "C3"],
                                ]],
                                ["row", [
                                    ["clickable", "C4"],
                                    ["clickable", "C5"],
                                    ["clickable", "C6"],
                                ]],
                            ], {width: "600px", background: "rgba(0,0,0,0.5)", paddingBottom: "10px", borderRadius: "15px"}],
                            ["blank", "5px"],
                            ["raw-html", function() {
                                if (player.ev14.chestNumber == 0) {
                                    return "No Chest Selected"
                                } else {
                                    return run(layers.ev14.tables[player.ev14.chestNumber].title, layers.ev14.tables[player.ev14.chestNumber])
                                }
                            }, {fontSize: "32px", color: "#cccccc", fontFamily: "monospace"}],
                            ["style-row", [], {width: "500px", height: "4px", background: "#cccccc", marginBottom: "10px"}],
                            ["raw-html", function() {
                                if (player.ev14.chestNumber == 0) {
                                    return ""
                                } else {
                                    return run(layers.ev14.tables[player.ev14.chestNumber].description, layers.ev14.tables[player.ev14.chestNumber])
                                }
                            }, {fontSize: "20px", color: "#cccccc", fontFamily: "monospace"}],
                            ["blank", "10px"],
                        ], {width: "700px", height: "525px", overflowX: "hidden"}],
                        ["style-column", [
                            ["raw-html", function() {
                                if (player.ev14.chestNumber == 0) {
                                    return "Select a chest, bruv!"
                                } else {return ""}
                            }, {fontSize: "30px", color: "#cccccc", fontFamily: "monospace"}],
                            ["clickable", 1],
                        ], {width: "700px", height: "125px", backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "0px 0px 10px 10px"}],
                    ], {width: "700px", height: "650px", border: "2px solid #cccccc", borderRadius: "10px", background: "rgba(0,0,0,0.5)"}],
                ]
            },
            "Shop": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#c000c0", borderRadius: "5px"} },
                unlocked() {return true},
                content: [
                    ["raw-html", () => {
                        return "3"
                    },]
                ]
            },
        },
    },
    tabFormat: [
        ["blank", "10px"],
        ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/orbs.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatSimple(player.ev2.orbs, 1)}, {width: "93px", height: "50px", color: "#96DED1", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Orbs<hr><small>(Gained from Daily Buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/secret.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatSimple(player.ev14.keys, 1)}, {width: "95px", height: "50px", color: "#cccccc", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Keys<hr><small>(Used to unlock treasure room chests)</small></div>"],
            ], {width: "150px", height: "50px"}],
        ], {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
        ["blank", "25px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[14] }
})