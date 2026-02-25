addLayer("ev14", {
    name: "Treasure Room", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Tr", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        keys: new Decimal(0),

        orbInput: new Decimal(0),
        keysToGet: new Decimal(0),

        timers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(64800),
                base: new Decimal(1),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(32400),
                base: new Decimal(1),
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
    },
    clickables: {
        0: {
            title() {
                return player.ev14.timers[0].current.gt(0) 
                ? "<h1>Check back in <br>" + formatTime(player.ev2.timers[0].current) + "." 
                : "<h1>Convert " + formatSimple(player.ev14.orbInput) + " orbs into " + formatSimple(player.ev14.keysToGet) + " keys."
            },
            canClick() { return (player.ev2.evoInput.gt(0) || player.ev2.paraInput.gt(0)) && player.cb.evolutionShards.gte(player.ev2.evoInput) && player.cb.paragonShards.gte(player.ev2.paraInput) && player.ev2.shardBoost.lte(1)},
            unlocked: true,
            tooltip() {
                if (player.ev2.orbs.lt(player.ev14.orbInput)) return "Not enough orbs."
                if (player.ev14.orbInput.lte(0) && player.ev2.paraInput.lte(0)) return "No orbs inputted."
                return ""
            },
            onClick() {
                player.ev2.orbs = player.ev2.orbs.sub(player.ev14.orbInput)
                player.ev2.shardBoost = player.ev2.potentialBoost
            },
            style: {width: '400px', minHeight: '100px', borderRadius: "60px / 30px"},
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
                    ["blank", "25px"],
                    ["clickable", 0]
                ]
            },
            "Chests": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#ffd700", borderRadius: "5px"} },
                unlocked() {return true},
                content: [
                    ["raw-html", () => {
                        return "2"
                    },]
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
                ["raw-html", () => { return "0"}, {width: "95px", height: "50px", color: "#cccccc", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Keys<hr><small>(Used to unlock treasure room chests)</small></div>"],
            ], {width: "150px", height: "50px"}],
        ], {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
        ["blank", "25px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[14] }
})