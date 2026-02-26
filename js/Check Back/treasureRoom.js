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
                max: new Decimal(32400),
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
        "C1": {
            title() { return "<img src='resources/chest1.png'style='width:150px;height:120px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.ev14.chestNumber = new Decimal(1)
            },
            style: { width: "160px", minHeight: "120px", backgroundColor: "#808080", border: "5px solid #808080", borderRadius: "10px", padding: "0px" },
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
            style: { width: "160px", minHeight: "120px", backgroundColor: "#00c0c0", border: "5px solid #00c0c0", borderRadius: "10px", padding: "0px" },
        },
        "C5": {
            title() { return "<img src='resources/chest5.png'style='width:150px;height:130px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.ev14.chestNumber = new Decimal(5)
            },
            style: { width: "160px", minHeight: "120px", backgroundColor: "#408000", border: "5px solid #408000", borderRadius: "10px", padding: "0px" },
        },
        "C6": {
            title() { return "<img src='resources/chest6.png'style='width:150px;height:130px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true},
            unlocked() { return true },
            onClick() {
                player.ev14.chestNumber = new Decimal(6)
            },
            style: { width: "160px", minHeight: "120px", backgroundColor: "#800080", border: "5px solid #800080", borderRadius: "10px", padding: "0px" },
        },
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