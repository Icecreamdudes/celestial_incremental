addLayer("matosLair", {
    name: "Matos' Lair", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⊘", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.matosLair.unlocked) player.subtabs["bh"]["stages"] = "matosLair"
    },
    startData() { return {
        unlocked: true,

        matosDefeated: false,
    }},
    automate() {},
    nodeStyle() {
        let str = {}
        if (!player.matosLair.unlocked) {
            str = {
                background: "radial-gradient(#250106, #360802)",
                backgroundOrigin: "border-box",
                borderColor: "#0e0e0e",
                color: "black",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "20px 0 20px 20px !important",
            }
        } else {
            str = {
                background: "radial-gradient(#7D0617, #B61B08)",
                backgroundOrigin: "border-box",
                borderColor: "#2F2F2F",
                color: "black",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "20px 0 20px 20px !important",
            }
        }
        if (player.subtabs["bh"]["stages"] == "matosLair") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Matos' Lair",
    tooltipLocked: "Reach 25 combo in depth 3 to unlock.",
    branches: ["depth3"],
    color: "#b33793",
    update(delta) {
        player.matosLair.unlocked = player.depth3.milestone[25] > 0
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Matos' Lair",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("matosLair")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "radial-gradient(#7D0617, #B61B08)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Perks for defeating Matos", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Downsides</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "You can no longer fuel cores", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "All of your cores are destroyed", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "15px"],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "Core Fragments", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "Starmetal Essence", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "15px"],
                    ["raw-html", "<u>Effects</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x2 to check back XP gain." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x1.5 to XPBoost gain." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x1e20 to golden grass." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x5 to moonstone." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x1e600 boost to infinity points." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "x1e40 boost to singularity points." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "+1,000 base radiation gain." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "+1,000 base core scrap gain." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace" }],
                ], () => {
                    let look = {width: "547px", height: "420px", background: "linear-gradient(120deg, #600954 0%, #750823 100%)", borderRadius: "0 0 0 27px"}
                    if (true) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], {overflow: "hidden"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "Matos' Lair", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["raw-html", "Boss Stage", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                ], {width: "250px", height: "197px", background: "var(--layerBackground)"}],
                ["style-row", [
                    ["layer-proxy", ["bh", [
                        ["row", [["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"]]],
                    ]]],
                ], {width: "250px", height: "70px", background: "var(--miscButtonDisable)", borderTop: "3px solid var(--regBorder)", borderRadius: "0 0 27px 0"}],
            ], {width: "250px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && player.depth2.milestone[25] > 0},
})

BHS.matosLair = {
    nameCap: "Matos' Lair",
    nameLow: "matos' lair",
    music: "music/matosTheme.mp3",
    comboLimit: 25,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 24:
                return "matos"
            default:
                let random = Math.random()
                let cel = ["lesserAlpha", "lesserBeta", "lesserGamma", "lesserDelta", "lesserEpsilon"]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}