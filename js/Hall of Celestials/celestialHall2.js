addLayer("ch2", {
    name: "Hall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CH", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        celestialIndex: new Decimal(0),
        celestialTexts: ["", "", "",],
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(90deg, #b762df 0%, #7d69c0 100%)",
            "background-origin": "border-box",
            "border-color": "#2e0054",
        }
    },
    tooltip: "Hall",
    color: "#7d69c0",
    branches: ["ch"],
    update(delta) {
        let onepersec = new Decimal(1)
        
        player.ch2.celestialTexts = [
            "Aniciffo, the Celestial of Radioactivity",
            "",
            "",
        ]
    },
    clickables: {
        11: {
            title() { return "<img src='resources/aniciffo.png' style='width:calc(135%);height:calc(135%);margin:-15px -15px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return "Aniciffo, the Celestial of Radioactivity" },
            onClick() {
                player.ch2.celestialIndex = new Decimal(0)
            },
            style: { width: '75px', "min-height": '75px' },
        },
        12: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            tooltip() { return ""},
            onClick() {
                player.ch2.celestialIndex = new Decimal(1)
            },
            style: { width: '75px', "min-height": '75px' }, 
        },
        13: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            tooltip() { return ""},
            onClick() {
                player.ch2.celestialIndex = new Decimal(2)
            },
            style: { width: '75px', "min-height": '75px' }, 
        },
        14: {
            title() { return "<img src='resources/mysteryAvon.png' style='width:calc(135%);height:calc(135%);margin:-15px -15px'></img>" },
            canClick() { return false },
            unlocked() { return true },
            tooltip() { return ""},
            onClick() {

            },
            style: { width: '125px', "min-height": '125px' }, 
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Aniciffo, the Celestial of Radioactivity",
            body() { return "<img src='resources/aniciffo.png' width='100' height='100'><br>Aniciffo's story is such one filled with sadness and despair. Forced from an early age to a chamber just to serve as energy... a purpose he didn't want, Just to watch that be destroyed without being able to do anything about it. It does make me think, whats the nature of said \"celestial evil\"? Some Celestials like Aleph contained theirs, But aniciffo didn't..and yet he never killed a single human. Could it be the source of said power that determines it?" },
            unlocked() { return player.ch2.celestialIndex.eq(0) },
            titleStyle: {
                "background-color": "#6dc464",
                "border-color": "#1d901a",
                "color": "#084906",
            },
            bodyStyle: {
                "background": "linear-gradient(150deg, #6dc464 0%, #1d901a 100%)", 
                "border-color": "#74ff8f",
                "color": "#084906",
            },
        },
    },
    microtabs: {
        stuff: {
            "Hall": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["microtabs", "hall", { 'border-width': '0px' }],
                ]
            },
        },
        hall: {
            "Hall": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["row", [["raw-html", () => { return "<small>Celestial #" + formatWhole(player.ch2.celestialIndex.add(1)) + "</small><br>" + player.ch2.celestialTexts[player.ch2.celestialIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["blank", "25px"],
                    ["row", [["clickable", 11],]],
                    ["blank", "150px"],
                    ["row", [["clickable", 14],]],
                    ["blank", "100px"],
                    ["row", [["clickable", 12], ["blank", ["350px", "25px"]], ["clickable", 13],]],
                    ["blank", "50px"],
                    ["infobox", 1],


                ]
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && player.anl.aniciffoDefeated && !player.sma.inStarmetalChallenge}
})
