addLayer("n", {
    name: "Nests", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        nest: new Decimal(0),
        nestGain: new Decimal(0),
        highestNest: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(135deg, #E5BD3F, #E172B5)",
            borderColor: "#714c3d"
        }
    },
    tooltip: "Nests",
    color: "#E3987A",
    branches: ["al"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (false) {
            player.n.nestGain = Decimal.pow(2, player.al.honeycomb.mul(player.al.royalJelly).div(1e50).add(1).log(1e10))
        } else {
            player.n.nestGain = new Decimal(1)
        }

        player.n.nestGain = player.n.nestGain.floor() // KEEP AT END
    },
    clickables: {
        1: {
            title() { return "<h2>Condense all your previous work<br>into a nest.</h2><br><h3>Requires: 1e25 Honeycombs and Royal Jelly</h3>"},
            canClick() { return player.al.honeycomb.gte(1e25) && player.al.royalJelly.gte(1e25)},
            unlocked: true,
            onClick() {
                player.n.nest = player.n.nest.add(player.n.nestGain)
                if (player.n.nest.gt(player.n.highestNest)) player.n.highestNest = player.n.nest
                layers.al.prestigeReset(true)
            },
            style() {
                let look = {width: "500px", minHeight: "100px", borderRadius: "15px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(135deg, #E5BD3F, #E172B5)"
                    look.border = "3px solid #714c3d"
                } else {
                    look.background = "#bf8f8f"
                    look.border = "3px solid rgba(0,0,0,0.5)"
                }
                return look
            },
        },
    },
    upgrades: {
        11: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nest Upgrade 1:1</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "<br>Unlock purple flowers<br>" + // MIDDLE
                "<br></div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "1 Nest" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(1),
            currencyLocation() { return player.n },
            currencyInternalName: "nest",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        // Unlock nest base formula
        // Unlock natural pylon
        // Unlock wax layer
        // Buyable that decrease all flower timers
        // Unlocks for higher tier purple flowers
        // Keep Gatherer v2
        // Buyable that multiplies most flower research caps
        // Keep flower progress on aleph resets
        
    },
    microtabs: {
        Tabs: {
            "Main": {
                buttonStyle: {borderColor: "#E3987A", borderRadius: "15px"},
                unlocked: true,
                content: [
                    ["blank", "5px"],
                    ["tooltip-row", [
                        ["raw-html", () => {return player.n.nest.eq(1) ? "You have <h3>" + formatWhole(player.n.nest) + "</h3> Nest." : "You have <h3>" + formatWhole(player.n.nest) + "</h3> Nests." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return false ? "(+" + formatWhole(player.n.nestGain) + ")" : ""}, () => {
                            let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                            player.al.honeycomb.gte(1e25) && player.al.royalJelly.gte(1e25) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                        ["raw-html", () => {return false ? "<div class='bottomTooltip'>Base Formula<hr><small>2^(log<sub>1e10</sub>((Honeycombs*Royal Jelly)/1e50))</small></div>" : ""}],
                    ]],
                    ["blank", "10px"],
                    ["clickable", 1],
                    ["blank", "10px"],
                    ["upgrade", 11],
                ],
            },
        },
    },
    tabFormat: [
        ["raw-html", () => {return "You have " + format(player.al.honeycomb) + " Honeycombs"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => {return "You have " + format(player.al.royalJelly) + " Royal Jelly"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["microtabs", "Tabs", {borderWidth: "0"}],
        ["blank", "20px"],
    ],
    layerShown() { return player.startedGame && hasMilestone("dgj", 14)}
})