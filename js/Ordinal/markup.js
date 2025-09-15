const baseShiftCost = [new Decimal("200"), new Decimal("1000"), new Decimal("10000"), new Decimal("350000"), new Decimal("1e12"), new Decimal("1e21"), new Decimal("1e100")]

addLayer("mu", {
    name: "Markup", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MU", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        bsr: new Decimal(0), // BASE SHIFT RESETS

        // CURRENCIES
        cp: new Decimal(0), // CURRENCY POWER
        cb: new Decimal(0), // CURRENCY BOOSTER

        // CURRENCY GAIN
        pg: new Decimal(0), // POWER GAIN
        
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Markup",
    color: "#DAA520",
    branches: [],
    update(delta) {
        let onepersec = new Decimal(1)

        // POWER GAIN
        player.mu.pg = new Decimal(layers.mu.powerBase(player.od.co, player.od.ob))
    },
    powerBase(num, base, iter=0){ // Ordinal Number, Ordinal Base, Iteration
        if (base.lte(iter)) return 0
        num = num.floor().max(0)
        if (num.eq(0) && iter == 0) return 0
        let n = new Decimal(0)
        if (num.lt(base.sqr()) && iter == 0) {
            return new Decimal(0)
        } else if (num.lt(base)) {
            return num
        } else {
            let exponent = num.log(base).floor()
            let s = layers.mu.powerBase(exponent, base, 1)
            let coef = num.div(base.pow(exponent).round()).floor()
            let rem = num.sub(base.pow(exponent).round().mul(coef)).round()
            n=n.add(Decimal.pow(10, s).mul(coef)) // 10 modifiable with upgrades later
            if (rem.lt(base)) {
                n = n.add(rem)
            } else {
                n = n.add(layers.mu.powerBase(rem, base, iter+1))
            }
            return n
        }
    },
    clickables: {
        101: {
            title() { return "Reset ordinal, but gain +" + formatWhole(player.mu.pg) + " ordinal power." },
            canClick() { return player.mu.pg.gte(100) },
            unlocked() { return true },
            onClick() {
                // RESET ORDINAL
                player.od.ops = new Decimal(0)
                player.od.co = new Decimal(0)

                // GAIN POWER
                player.mu.cp = player.mu.cp.add(player.mu.pg)
            },
            style() {
                let look = {width: "300px", minHeight: "100px", fontSize: '12px', border: '3px solid white', borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "black" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        102: {
            title() { return "Base Shift<br>Decrease ordinal base by 1<br>Cost: " + format(baseShiftCost[player.mu.bsr]) },
            canClick() { return player.mu.cp.gte(baseShiftCost[player.mu.bsr]) },
            unlocked() { return true },
            onClick() {
                // RESET ORDINAL
                player.od.ops = new Decimal(0)
                player.od.co = new Decimal(0)

                // RESET POWER
                player.mu.pg = new Decimal(0)
                player.mu.cp = new Decimal(0)

                // INCREASE BASE
                player.mu.bsr = player.mu.bsr.add(1)
                player.od.ob = player.od.ob.sub(1)
            },
            style() {
                let look = {width: "300px", minHeight: "100px", fontSize: '12px', border: '3px solid white', borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "black" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        Content: {
            "Markup": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["scroll-column", [
                        ["blank", "25px"],
                        ["row", [
                            ["clickable", 101], ["raw-html", "&nbsp;", {fontSize: "25px"}], ["clickable", 102],
                        ]],
                    ], {width: "800px", height: "550px"}],
                ]
            },
        }
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
        ["raw-html", () => {return "You have " + format(player.mu.cp) + " Ordinal Power."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["blank", "25px"],
        ["microtabs", "Content", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && layerShown("od") },
    deactivated() { return true},
})