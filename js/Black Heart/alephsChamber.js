addLayer("alephsChamber", {
    name: "Alephs Chamber", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ℵ", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.alephsChamber.unlocked) player.subtabs["bh"]["stages"] = "alephsChamber"
    },
    startData() { return {
        unlocked: true,

        milestone: {
            25: 0,
        },
    }},
    automate() {},
    nodeStyle() {
        let str = {}
        if (!player.alephsChamber.unlocked) {
            str = {
                background: "linear-gradient(45deg, #120012 0%, #320032 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#120012",
                color: "rgba(0,0,0,0.5)",
                margin: "20px 0 0 30px !important",
            }
        } else {
            str = {
                background: "linear-gradient(45deg, #3f003f 0%, #a900a9 100%)",
                backgroundOrigin: "border-box",
                borderColor: "#3f003f",
                color: "rgba(0,0,0,0.5)",
                margin: "20px 0 0 30px !important",
            }
        }
        if (player.subtabs["bh"]["stages"] == "alephsChamber") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Alephs Chamber",
    tooltipLocked: "Reach 25 combo in depth 4 to unlock.",
    branches: ["depth4"],
    color: "#b33793",
    update(delta) {
        player.alephsChamber.unlocked = player.depth4.milestone[25] > 0
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Alephs Chamber",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("alephsChamber")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "linear-gradient(45deg, #3f003f 0%, #a900a9 100%)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
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
                        ["raw-html", "Perks for defeating Aleph", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "Grass Jump (in Eclipse)", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["raw-html", "<u>Effects</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "TEMP." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                ], () => {
                    let look = {width: "547px", height: "420px", background: "linear-gradient(120deg, #3e003e 0%, #6a006a 100%)", borderRadius: "0 0 0 27px"}
                    if (player.alephsChamber.milestone[25] == 0) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], {borderRadius: "0 0 0 27px", overflow: "hidden"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "Alephs Chamber", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["style-column", [
                        ["raw-html", "3 Characters", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "Unlock Alephs Perks", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "232px", height: "58px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.alephsChamber.milestone[25] >= 1) look.background = "#77bf5f"
                        return look
                    }],
                    ["style-column", [
                        ["raw-html", "2 Characters", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "Unlock ???", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "232px", height: "57px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.alephsChamber.milestone[25] >= 2) look.background = "#77bf5f"
                        return look
                    }],
                    ["style-column", [
                        ["raw-html", "1 Character", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "+1 Rune Cap", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "232px", height: "58px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.alephsChamber.milestone[25] >= 3) look.background = "#77bf5f"
                        return look
                    }],
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

BHS.alephsChamber = {
    nameCap: "Alephs Chamber",
    nameLow: "alephs chamber",
    music: "music/depth4.mp3",
    comboLimit: 25,
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