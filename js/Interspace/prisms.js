addLayer("pri", {
    name: "Prismatic",
    symbol: "PR",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        prisms: new Decimal(0),
        bestPrisms: new Decimal(0),
        prismsToGet: new Decimal(0),

        /*
            Red: Singularities
            Orange: Infinities
            Yellow: Golden Grass
            Green: Light
            Blue: Check Back XP
            Indigo: ???
            Violet: SMA
            White: Celestial Points
        */
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#335966",
            background: "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)",
            "background-origin": "border-box",
            "border-color": "#335966",
        };
    },
    tooltip: "Prismatic",
    color: "#d6ebff",
    update(delta) {
        player.pri.prismsToGet = player.wel.light.add(1).log(10).sub(15).pow_base(1.5).floor()

        if (player.pri.bestPrisms.lt(player.pri.prisms)) player.pri.bestPrisms = player.pri.prisms;
    },
    prismReset(isRewarded) {
        if (isRewarded) {
            player.pri.prisms = player.pri.prisms.add(player.pri.prismsToGet)
        }

        player.wel.light = new Decimal(0)

        player.wel.modules[1].time = new Decimal(0)
        player.wel.modules[2].time = new Decimal(0)
        player.wel.modules[3].time = new Decimal(0)

        setBuyableAmount("wel", 11, new Decimal(0))
        setBuyableAmount("wel", 12, new Decimal(0))
        setBuyableAmount("wel", 13, new Decimal(0))
        setBuyableAmount("wel", 14, new Decimal(0))
    },
    branches: ["wel", "prj"],
    clickables: {
        1: {
            title() { return "<h2>Form your light into Prisms.</h2><br>Req: 1e16 Light" },
            canClick() { return player.wel.light.gte(1e16)},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)"
                    look.border = "2px solid #335966"
                    look.color = "#335966"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "2px solid #d6ebff"
                    look.color = "#d6ebff"
                }
                return look
            },
        },
        101: {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.light.gte(1e16)},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 10px 10px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {
        11: {
            condition() { return player.pri.bestPrisms.gte(1) },
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(99) },
            currency() { return player.pri.prisms},
            pay(amt) { player.pri.prisms = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Well Cycle Boost"
            },
            display() {
                return 'which are boosting light well cycles by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Prisms'
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #607080", background: "#d6ebff", color: "#000000df"}
        },
        12: {
            condition() { return player.pri.bestPrisms.gte(1) },
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(36) },
            currency() { return player.pri.prisms},
            pay(amt) { player.pri.prisms = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Well Speed Boost"
            },
            display() {
                return 'which are speeding up light wells by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Prisms'
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #607080", background: "#d6ebff", color: "#000000df"}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Prisms": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["clickable", 1],
                        ["blank", "25px"],
                    ]
                    /*if (layers.pri.buyables[11].condition()) {
                        look[3][1].push(
                            //["layerColor-dark-buyable", 11],
                            //["layerColor-dark-buyable", 12],
                        )
                    } else {
                        look[3][1].push(
                            ["style-column", [
                                ["raw-html", "<h2>Well Cycle Boost</h2><br><h3>Req: 1 Prism</h3>", {color: "#ffdfdf", fontSize: "10px"}],
                            ], {background: "#361e1e", border: "3px solid #663737", width: "194px", height: "174px", borderRadius: "0px", lineHeight: "1"}]
                        )
                        look[3][1].push(
                            ["style-column", [
                                ["raw-html", "<h2>Well Speed Boost</h2><br><h3>Req: 1 Prism</h3>", {color: "#ffdfdf", fontSize: "10px"}],
                            ], {background: "#361e1e", border: "3px solid #663737", width: "194px", height: "174px", borderRadius: "0px", lineHeight: "1"}]
                        )
                    }*/
                    return look
                }
            },
            "Wavelength": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    return [
                        ["blank", "25px"],
                        ["style-column", [
                        ["raw-html", 
                            "<small>When a well's timer gets below 0.2s, you can do a blueshift. Blueshifting resets everything prismatic does, as well as all well cycles. Each blueshift done divides cycle speed and increases cycle gain for its respective well. You also gain multipliers from total blueshifts done.</small>"
                        , {color: "#a1b0bf", fontSize: "18px", fontFamily: "monospace"}],
                        ], {background: "#0000003f", border: "3px solid #0000003f", borderRadius: "10px", width: "610px", height: "100px", padding: "4px"}],
                        ["blank", "25px"],
                        ["raw-html", "You have blueshifted 1 times.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "<small>Boosts light well cycle gain by x1.5.</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "10px"],
                        ["style-row", [
                            ["style-column", [
                                ["blank", "9px"],
                                ["raw-html", "Light Well α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", "<small>(0.67/0.2s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "9px"],
                                ["style-column", [
                                    ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                ["blank", "3px"],
                                ["clickable", 101],
                            ]],
                        ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],
                    ["blank", "9px"],
                    ["raw-html", "1 α →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "(x100 α ↻)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", "(/7.07 α ↻ Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", "(2√ α ↻ Spd)", {color: "#ff7f00", fontSize: "12px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                    ]
                }
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.pri.prisms) + "</h3> prisms." }, {color: "#d6ebff", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatWhole(player.pri.prismsToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.pri.prismsToGet.gte(1)) {look.color = "#d6ebff"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 201)}
})