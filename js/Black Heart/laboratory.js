addLayer("laboratory", {
    name: "The Laboratory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {return player.laboratory.unlocked ? "LA" : "??"}, // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.laboratory.unlocked) player.subtabs["bh"]["stages"] = "laboratory"
    },
    startData() { return {
        unlocked: true,

        matosDust: new Decimal(0),
        matosShard: new Decimal(0),
        matosFragment: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        let str = {}
        if (!player.laboratory.unlocked) {
            str = {
                background: "linear-gradient(45deg, #131e0f 0%, #323c1f 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#071b00",
                color: "#0c3000",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "0 0 20px 10px !important",
            }
        } else {
            str = {
                background: "linear-gradient(135deg, #426535 0%, #A8C86A 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#185A00",
                color: "#2BA200",
                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                margin: "0 0 20px 10px !important",
            }
        }
        if (player.subtabs["bh"]["stages"] == "laboratory") str.outline = "3px solid #999"
        return str
    },
    tooltip: "The Laboratory",
    tooltipLocked: "Obtain ???.",
    branches: ["depth4", "matosLair"],
    color: "#b33793",
    update(delta) {
        player.laboratory.unlocked = getLevelableAmount("pet", 503).gt(0) || getLevelableTier("pet", 503).gt(0)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter the Laboratory",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("laboratory")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "linear-gradient(135deg, #426535 0%, #A8C86A 100%)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return "You have " + formatShortWhole(player.laboratory.matosDust) + " Matos Dust."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.laboratory.matosShard) + " Matos Shard."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.laboratory.matosFragment) + " Matos Fragment."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "547px", height: "72px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["blank", "2px"],
                    ["row", [["upgrade", 1], ["upgrade", 2]]],
                    ["row", [["upgrade", 3], ["upgrade", 4]]],
                    ["row", [["upgrade", 5], ["upgrade", 6]]],
                    ["row", [["buyable", 1], ["buyable", 2]]],
                    ["row", [["buyable", 3], ["buyable", 4]]],
                    ["blank", "2px"],
                ], {width: "547px", height: "345px", background: "var(--miscButton)", borderRadius: "0 0 0 27px"}],
            ], {width: "547px", height: "420px", borderRadius: "0 0 0 27px"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "The Laboratory", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [

                ], {width: "250px", height: "197px", background: "var(--layerBackground)"}],
                ["style-row", [
                    ["layer-proxy", ["bh", [
                        ["row", [["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"]]],
                    ]]],
                ], {width: "250px", height: "70px", background: "var(--miscButtonDisable)", borderTop: "3px solid var(--regBorder)", borderRadius: "0 0 27px 0"}],
            ], {width: "250px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && player.al.cocoonLevel >= 16},
})

BHS.laboratory = {
    nameCap: "The Laboratory",
    nameLow: "the laboratory",
    music: "music/depth4.mp3",
    comboLimit: Infinity,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 4:
                return "m10"
            case 8:
                return "m11"
            case 12:
                return "m12"
            case 16:
                return "m13"
            case 20:
                return "m14"
            case 24:
                return "matos"
            default:
                let random = Math.random()
                let cel = ["m01", "m02", "m03", "m04", "m05", "m06"]
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}