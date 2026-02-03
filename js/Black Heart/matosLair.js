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
            style: {width: "200px", minHeight: "75px", color: "white", background: "radial-gradient(#7D0617, #B61B08)", border: "3px solid #2F2F2F", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
        ["style-row", [
            ["style-column", [

            ], {width: "272px", height: "420px", background: "var(--layerBackground)", borderRight: "3px solid var(--regBorder)", borderRadius: "0 0 0 27px"}],
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
                ], {width: "250px", height: "197px", background: "var(--layerBackground)"}],
                ["style-row", [
                    ["layer-proxy", ["bh", [
                        ["row", [["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"]]],
                    ]]],
                ], {width: "250px", height: "70px", background: "var(--miscButtonDisable)", borderTop: "3px solid var(--regBorder)"}],
            ], {width: "250px", height: "420px"}],
            ["style-column", [

            ], {width: "272px", height: "420px", background: "var(--layerBackground)", borderLeft: "3px solid var(--regBorder)", borderRadius: "0 0 27px 0"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && player.depth2.milestone[25] > 0},
})

BHS.matosLair = {
    nameCap: "Matos' Lair",
    nameLow: "matos' lair",
    music: "music/celestialites.mp3",
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