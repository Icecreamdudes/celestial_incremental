addLayer("pf", {
    name: "Puzzle Fighting", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PF", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #333 0%, #666 100%)",
            "background-origin": "border-box",
        }
    },
    tooltip: "Puzzle Fighting",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["ak"],
    clickables: {
        "Map": {
            title: "Map",
            canClick() {return true},
            onClick() {player.subtabs["pf"]["stuff"] = "Map"},
            style() {
                let look = {width: "406px", minHeight: "40px", border: "5px solid var(--regBorder)", borderRadius: "40px 0px 0px 0px", color: "white"}
                if (player.subtabs["pf"]["stuff"] == "Map") {
                    look.backgroundColor = "var(--regBorder)"
                    look.cursor = "default"
                } else {
                    look.backgroundColor = "rgba(0,0,0,0)"
                    look.cursor = "default"
                }
                return look
            },
        },
        "Upgrades": {
            title: "Upgrades",
            canClick() {return true},
            onClick() {player.subtabs["pf"]["stuff"] = "Upgrades"},
            style() {
                let look = {width: "406px", minHeight: "40px", border: "5px solid var(--regBorder)", borderRadius: "0px 40px 0px 0px", color: "white"}
                if (player.subtabs["pf"]["stuff"] == "Upgrades") {
                    look.backgroundColor = "var(--regBorder)"
                    look.cursor = "default"
                } else {
                    look.backgroundColor = "rgba(0,0,0,0)"
                    look.cursor = "default"
                }
                return look
            },
        }
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Map": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["row", [
                        ["clickable", "Map"],
                        ["clickable", "Upgrades"],
                    ]],
                    ["style-column", [
                        "blank",
                    ], {width: "800px", height: "360px", border: "5px solid var(--regBorder)", borderRadius: "0px 0px 40px 40px"}]
                ]
            },
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["row", [
                        ["clickable", "Map"],
                        ["clickable", "Upgrades"],
                    ]],
                    ["style-column", [
                        "blank",
                    ], {width: "800px", height: "360px", border: "5px solid var(--regBorder)", borderRadius: "0px 0px 40px 40px"}]
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ak.puzzlePoints) + "</h3> puzzle points. (+" + format(player.ak.puzzlePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true } // change later
})