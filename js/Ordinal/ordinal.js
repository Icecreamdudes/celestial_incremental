var tree = [["mu"]]
addLayer("od", {
    name: "Ordinal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OD", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        // NECESSARY DATA
        ob: new Decimal(10), // ORDINAL BASE

        // CURRENCIES
        co: new Decimal(0), // CURRENCY ORDINAL

        // CURRENCY GAIN
        ops: new Decimal(0), // ORDINAL PER SECOND
        
    }},
    automate() {},
    nodeStyle() {
        return {
            backgroundImage: "linear-gradient(0deg, #256413, #49AE1E)",
            backgroundOrigin: "border-box",
            borderColor: "black",
            color: "black",
        };
    },
    tooltip: "Ordinal",
    color: "white",
    branches: [],
    update(delta) {
        let onepersec = new Decimal(1)

        // TAB FUNCTIONALITY
        if (player.subtabs["od"]['stuff'] == 'Portal') {
            player.po.lastUniverse = 'od'
            player.tab = "po"
            player.subtabs["od"]['stuff'] = 'Features'
        }
        if (player.subtabs["od"]['stuff'] == 'Settings') {
            player.po.lastUniverse = 'od'
            player.tab = "settings"
            player.subtabs["od"]['stuff'] = 'Features'
        }

        // ORDINAL GAIN
        player.od.ops = new Decimal(1)
        player.od.co = player.od.co.add(player.od.ops.mul(delta))

    },
    ordinalDisplay(num, base, iter=0) { // Ordinal Number, Ordinal Base, Iteration
        let maxIter = 3 // Max Iterations
        if (iter >= maxIter) return "..."
        num = num.floor().max(0)
        if (num.eq(0) && iter == 0) return 0
        let str = ""
        if (num.lt(base)) {
            return num.toString()
        } else {
            let exponent = num.log(base).add(1e-14).floor()
            let s = layers.od.ordinalDisplay(exponent, base, 0)
            str += (iter > 0 ? "+" : "") + "ω" + (exponent.gt(1) ? "<sup>" + s + "</sup>" : "")
            if (str.includes("...")) return str
            let coef = num.div(base.pow(exponent).round()).add(1e-14).floor()
            if (coef.gt(1)) str += coef
            let rem = num.sub(base.pow(exponent).round().mul(coef)).round()
            if (rem.lt(base)) {
                if (rem.gt(0)) str += "+" + (iter >= maxIter-1 ? "..." : rem)
            } else if (exponent.log(base).add(1e-14).floor().lt(maxIter)) {
                str += layers.od.ordinalDisplay(rem, base, iter+1)
            } else {
                str += "+..."
            }
            return str
        }
    },
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Features": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["tree", tree],
                ]
            },
            "Portal": {
                buttonStyle() { return { color: "black", borderRadius: "5px", 'border-color': 'purple', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', } },
                unlocked() { return true},
                content: []
            },
            "Settings": {
                buttonStyle() { return { color: "white", borderRadius: "5px" }},
                unlocked() { return true },
                content: [],
            },
        },
    },
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["raw-html", () => {return layers.od.ordinalDisplay(player.od.co, player.od.ob)}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                ["raw-html", () => {return "(+" + formatWhole(player.od.ops) + "/s)"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ], {width:"500px", height: "73px", borderRight: "2px solid white"}],
            ["style-row", [
                ["raw-html", () => {return formatWhole(player.od.ob)}, {color: "white", fontSize: "30px", fontFamily: "monospace"}],
            ], {width:"75px", height: "73px", backgroundColor: "#333333", borderRadius: "0px 20px 20px 0px"}],
        ], {width: "577px", border: "2px solid white", borderRadius: "20px"}],
        ["blank", "25px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return /* player.startedGame == true */ false }
})
