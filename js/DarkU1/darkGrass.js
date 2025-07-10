
addLayer("dgr", {
    name: "Dark Grass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DG", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        //NOTE: MAKE ALL OF THIS STUFF RESET ON STARMETAL RESET
        grass: new Decimal(0),
        grassEffect: new Decimal(1),
        grassValue: new Decimal(1),
        
        maxGrass: new Decimal(1),

        grassTimer: new Decimal(0),
        grassTimerReq: new Decimal(10),
        lastPickedText: "",
    }},
    automate() {
        if (hasUpgrade("dn", 13))
        {
            buyBuyable("dgr", 11)
            buyBuyable("dgr", 12)
            buyBuyable("dgr", 13)
            buyBuyable("dgr", 14)
            buyBuyable("dgr", 15)
            buyBuyable("dgr", 16)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #147363 0%,rgb(29, 72, 83) 50%,rgb(30, 75, 100) 100%)",
            "background-origin": "border-box",
            "border-color": "#008556",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Dark Grass",
    branches: [["dg", "#4f0694"]],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)
        for (let i = 1; i <= tmp.dgr.grid.cols; i++) {
            for (let j = 1; j <= tmp.dgr.grid.rows; j++) {
                let val = i + "0" + j
                if (getGridData("dgr", val).gte(player.dgr.maxGrass)) {
                    setGridData("dgr", val, player.dgr.maxGrass)
                }
            }
        }

        // MAX GRASS
        player.dgr.maxGrass = new Decimal(1)
        player.dgr.maxGrass = player.dgr.maxGrass.mul(buyableEffect("dgr", 11))
        if (player.le.punchcards[11]) player.dgr.maxGrass = player.dgr.maxGrass.mul(player.le.punchcardsEffect[11])
        if (player.le.punchcards[12]) player.dgr.maxGrass = player.dgr.maxGrass.mul(player.le.punchcardsEffect[12])
        if (player.le.punchcards[13]) player.dgr.maxGrass = player.dgr.maxGrass.mul(player.le.punchcardsEffect[13])
        if (player.le.punchcards[14]) player.dgr.maxGrass = player.dgr.maxGrass.mul(player.le.punchcardsEffect[14])
        player.dgr.maxGrass = player.dgr.maxGrass.mul(levelableEffect("st", 109)[0])
        
        // MAX GRASS SOFTCAP
        if (player.dgr.maxGrass.gte(1e100)) player.dgr.maxGrass = player.dgr.maxGrass.div(1e100).pow(0.2).mul(1e100)

        // GRASS VALUE
        player.dgr.grassValue = new Decimal(1)
        player.dgr.grassValue = player.dgr.grassValue.mul(buyableEffect("dgr", 12))
        if (player.le.punchcards[11]) player.dgr.grassValue = player.dgr.grassValue.mul(player.le.punchcardsEffect[11])
        if (player.le.punchcards[12]) player.dgr.grassValue = player.dgr.grassValue.mul(player.le.punchcardsEffect[12])
        if (player.le.punchcards[13]) player.dgr.grassValue = player.dgr.grassValue.mul(player.le.punchcardsEffect[13])
        if (player.le.punchcards[14]) player.dgr.grassValue = player.dgr.grassValue.mul(player.le.punchcardsEffect[14])
        player.dgr.grassValue = player.dgr.grassValue.mul(levelableEffect("st", 108)[0])

        // GRASS VALUE SOFTCAP
        if (player.dgr.grassValue.gte(1e100)) player.dgr.grassValue = player.dgr.grassValue.div(1e100).pow(0.2).mul(1e100)

        if (hasUpgrade("le", 22)) player.dgr.grassTimer = player.dgr.grassTimer.add(onepersec.mul(delta))
        player.dgr.grassTimerReq = new Decimal(10)
        player.dgr.grassTimerReq = player.dgr.grassTimerReq.div(buyableEffect("dgr", 13))
        player.dgr.grassTimerReq = player.dgr.grassTimerReq.div(levelableEffect("st", 206)[0])
        player.dgr.grassTimerReq = player.dgr.grassTimerReq.div(buyableEffect("st", 102))
        if (player.dgr.grassTimer.gte(player.dgr.grassTimerReq)) {
            layers.dgr.addGrass();
            player.dgr.grassTimer = new Decimal(0)
        }

        if (player.dgr.grass.lt(1e10)) {
            player.dgr.grassEffect = player.dgr.grass.add(1).log(10).mul(0.1).add(1)
        } else if (player.dgr.grass.lt(1e50) && player.dgr.grass.gte(1e10)) {
            player.dgr.grassEffect = player.dgr.grass.div(1e10).add(1).log(10).mul(0.05).add(2)
        } else if (player.dgr.grass.lt(1e100) && player.dgr.grass.gte(1e50)) {
            player.dgr.grassEffect = player.dgr.grass.div(1e50).add(1).log(10).mul(0.02).add(4)
        } else if (player.dgr.grass.lt("1e1000") && player.dgr.grass.gte(1e100)) {
            player.dgr.grassEffect = player.dgr.grass.div(1e100).add(1).log(10).mul(0.005).add(5)
        } else if (player.dgr.grass.gte("1e1000")) {
            player.dgr.grassEffect = player.dgr.grass.div("1e1000").add(1).log(10).pow(0.5).mul(0.05).add(9.5)
        }
        
    },
    addGrass(){
        let row = getRandomInt(5) + 1
        let column = getRandomInt(5) + 1
        let val = column + "0" + row

        setGridData("dgr", val, getGridData("dgr", val).add(player.dgr.grassValue))
        player.dgr.lastPickedText = "Last grown plot: (" + formatWhole(row - 1) + ", " + formatWhole(column - 1) + ")"
    },
    bars: {
        grassBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 375,
            height: 25,
            progress() {
                return player.dgr.grassTimer.div(player.dgr.grassTimerReq)
            },
            baseStyle: {
                backgroundColor: "black",
            },
            fillStyle: {
                backgroundColor: "#006a44",
            },
            borderStyle: {
                border: "0px solid",
                borderTop: "2px solid #006a44",
                borderBottom: "2px solid #006a44",
                borderRadius: "0px",
            },
            display() {
                return "Time: " + formatTime(player.dgr.grassTimer) + "/" + formatTime(player.dgr.grassTimerReq);
            },
        },
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "du"
            },
            style: { width: "100px", minHeight: "50px", color: "white", borderRadius: "10px", border: "2px solid #006a44" },
        },
    },
    grid: {
        rows: 5,
        cols: 5,
        getStartData(id) {
            return new Decimal(0)
        },
        getTitle(data, id) {
            return format(getGridData("dgr", id))
        },
        getCanClick(data, id) {
            return getGridData("dgr", id).gt(0)
        },
        onClick(data, id) {
            player.dgr.grass = player.dgr.grass.add(getGridData("dgr", id))
            setGridData("dgr", id, new Decimal(0))
        },
        getStyle(data, id) {
            let look = {width: "75px", height: "75px", fontSize: "7px", borderRadius: "0px"}
            getGridData("dgr", id).eq(0) ? look.backgroundColor = "#081707" : getGridData("dgr", id).lt(player.dgr.maxGrass) ? look.backgroundColor = "#1a4516" : look.backgroundColor = "#2b7326"
            getGridData("dgr", id).eq(0) ? look.color = "dimgray" : look.color = "white"
            return look
        }
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(1500) },
            currency() { return player.dgr.grass},
            pay(amt) { player.dgr.grass = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2).pow(0.7).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Capacity Increaser"
            },
            display() {
                return "which are multiplying max grass per plot by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#003522", borderColor: "#006a44" }
        },
        12: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(1500) },
            currency() { return player.dgr.grass},
            pay(amt) { player.dgr.grass = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Value Multiplier"
            },
            display() {
                return "which are boosting dark grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#003522", borderColor: "#006a44" }
        },
        13: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.dgr.grass},
            pay(amt) { player.dgr.grass = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Speed-Upper"
            },
            display() {
                return "which are reducing time required to grow grass by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#003522", borderColor: "#006a44" }
        },
        14: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dgr.grass},
            pay(amt) { player.dgr.grass = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.3).pow(1.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Point Grasser"
            },
            display() {
                return "which are boosting point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#003522", borderColor: "#006a44" }
        },
        15: {
            costBase() { return new Decimal(35) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dgr.grass},
            pay(amt) { player.dgr.grass = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).pow(1.15).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Rank-Tier-Tetr Grasser"
            },
            display() {
                return "which are boosting rank/tier/tetr point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#003522", borderColor: "#006a44" }
        },
        16: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.7) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dgr.grass},
            pay(amt) { player.dgr.grass = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).pow(1.15).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Prestige Grasser"
            },
            display() {
                return "which are boosting prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#003522", borderColor: "#006a44" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #006a44", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-row", [
                            ["raw-html", function () { return player.dgr.lastPickedText }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "375px", borderRadius: "0px", paddingTop: "5px", paddingBottom: "5px"}],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "Grass Value", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ["raw-html", () => { return (player.dgr.grassValue.gte(1e100)) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
                                ], {width: "185px", height: "40px", borderBottom: "2px solid #006a44", borderRadius: "0px"}],
                                ["style-row", [
                                    ["raw-html", function () { return format(player.dgr.grassValue) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ], {width: "185px", borderRadius: "0px", paddingTop: "2.5px", paddingBottom: "2.5px"}],
                            ], {width: "185px", borderRight: "2px solid #006a44", borderRadius: "0px"}],
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "Max Grass/Plot", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ["raw-html", () => { return (player.dgr.maxGrass.gte(1e100)) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
                                ], {width: "188px", height: "40px", borderBottom: "2px solid #006a44", borderRadius: "0px"}],
                                ["style-row", [
                                    ["raw-html", function () { return format(player.dgr.maxGrass) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ], {width: "188px", borderRadius: "0px", paddingTop: "2.5px", paddingBottom: "2.5px"}],
                            ], {width: "188px", borderRadius: "0px"}],
                        ], {width: "375px", backgroundColor: "#002a1b", borderTop: "2px solid #006a44", borderRadius: "0px"}],
                        ["bar", "grassBar"],
                        "grid",
                        ["style-column", [
                            ["raw-html", function () { return "Click on a plot to collect the grass." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "375px", borderTop: "2px solid #006a44", borderRadius: "0px", paddingTop: "5px", paddingBottom: "5px"}],
                    ], {width: "375px", backgroundColor: "#003522", border: "2px solid #006a44", borderRadius: "0px"}],
                ]
            },
            "Buyables": {
                buttonStyle() { return { border: "2px solid #006a44", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 11],["dark-buyable", 12],["dark-buyable", 13],]],
                    ["row", [["dark-buyable", 14],["dark-buyable", 15],["dark-buyable", 16],]],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => { return "You have <h3>" + format(player.dgr.grass) + "</h3> dark grass, which boosts generator power effect by ^" + format(player.dgr.grassEffect) }, {color: "white", fontSize: "24px", fontFamily: "monospace", paddingRight: "10px"}],
            ["raw-html", () => { return (player.dgr.grass.lt(1e50) && player.dgr.grass.gte(1e10)) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace"}],
            ["raw-html", () => { return (player.dgr.grass.lt(1e100) && player.dgr.grass.gte(1e50)) ? "[SOFTCAPPED<sup>2</sup>]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace"}],
            ["raw-html", () => { return (player.dgr.grass.lt("1e1000") && player.dgr.grass.gte(1e100)) ? "[SOFTCAPPED<sup>3</sup>]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace"}],
            ["raw-html", () => { return player.dgr.grass.gte("1e1000") ? "[SOFTCAPPED<sup>4</sup>]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", function () { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, { "color": "#FEEF5F", "font-size": "20px", "font-family": "monospace" }],
        ]],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return hasUpgrade("le", 22) }
})