
addLayer("dgr", {
    name: "Dark Grass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DG", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,


        grMax: false,

        //NOTE: MAKE ALL OF THIS STUFF RESET ON STARMETAL RESET
        grass: new Decimal(0),
        grassEffect: new Decimal(1),
        grassValue: new Decimal(1),
        
        grassPlots: [
            [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
            [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
            [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
            [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
            [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        ],
        maxGrass: new Decimal(1),

        grassTimer: new Decimal(0),
        grassTimerReq: new Decimal(10),
        lastPickedText: "",

        clickableColors: [
            ["", "", "", "", "",],
            ["", "", "", "", "",],
            ["", "", "", "", "",],
            ["", "", "", "", "",],
            ["", "", "", "", "",],
            ["", "", "", "", "",],
        ],
    }
    },
    automate() {
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
    branches: ["dg"],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)
        for (let i = 0; i < player.dgr.grassPlots.length; i++)
        {
            for (let j = 0; j < player.dgr.grassPlots[i].length; j++)
            {
                if (player.dgr.grassPlots[i][j].gte(player.dgr.maxGrass))
                {
                    player.dgr.grassPlots[i][j] = player.dgr.maxGrass
                }
            }
        }
        for (let i = 0; i < player.dgr.grassPlots.length; i++)
        {
            for (let j = 0; j < player.dgr.grassPlots[i].length; j++)
            {
                if (player.dgr.grassPlots[i][j].eq(0))
                {
                    player.dgr.clickableColors[i][j] = "#021c00"
                }
                if (player.dgr.grassPlots[i][j].gt(0) && player.dgr.grassPlots[i][j].lt(player.dgr.maxGrass))
                {
                    player.dgr.clickableColors[i][j] = "#289120"
                }
                if (player.dgr.grassPlots[i][j].eq(player.dgr.maxGrass))
                {
                    player.dgr.clickableColors[i][j] = "#57e64c"
                }
            }
        }

        player.dgr.maxGrass = new Decimal(1)
        player.dgr.maxGrass = player.dgr.maxGrass.mul(buyableEffect("dgr", 11))
        if (player.le.punchcards[11]) player.dgr.maxGrass = player.dgr.maxGrass.mul(player.le.punchcardsEffect[11])
        if (player.le.punchcards[12]) player.dgr.maxGrass = player.dgr.maxGrass.mul(player.le.punchcardsEffect[12])
        if (player.le.punchcards[13]) player.dgr.maxGrass = player.dgr.maxGrass.mul(player.le.punchcardsEffect[13])
        if (player.le.punchcards[14]) player.dgr.maxGrass = player.dgr.maxGrass.mul(player.le.punchcardsEffect[14])

        player.dgr.grassValue = new Decimal(1)
        player.dgr.grassValue = player.dgr.grassValue.mul(buyableEffect("dgr", 12))
        if (player.le.punchcards[11]) player.dgr.grassValue = player.dgr.grassValue.mul(player.le.punchcardsEffect[11])
        if (player.le.punchcards[12]) player.dgr.grassValue = player.dgr.grassValue.mul(player.le.punchcardsEffect[12])
        if (player.le.punchcards[13]) player.dgr.grassValue = player.dgr.grassValue.mul(player.le.punchcardsEffect[13])
        if (player.le.punchcards[14]) player.dgr.grassValue = player.dgr.grassValue.mul(player.le.punchcardsEffect[14])

        if (hasUpgrade("le", 22)) player.dgr.grassTimer = player.dgr.grassTimer.add(onepersec.mul(delta))
        player.dgr.grassTimerReq = new Decimal(10)
        player.dgr.grassTimerReq = player.dgr.grassTimerReq.div(buyableEffect("dgr", 13))
        if (player.dgr.grassTimer.gte(player.dgr.grassTimerReq))
        {
            layers.dgr.addGrass();
            player.dgr.grassTimer = new Decimal(0)
        }

        player.dgr.grassEffect = player.dgr.grass.pow(0.4).div(10).add(1)
    },
    addGrass(){
        let row = getRandomInt(5)
        let column = getRandomInt(5)

        player.dgr.grassPlots[row][column] = player.dgr.grassPlots[row][column].add(player.dgr.grassValue)
        player.dgr.lastPickedText = "Last grown plot: (" + formatWhole(row) + ", " + formatWhole(column) + ")"
    },
    bars: {
        grassBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                return player.dgr.grassTimer.div(player.dgr.grassTimerReq)
            },
            fillStyle: {
                "background-color": "#147363",
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
            style: { width: '100px', "min-height": '50px', color: "white" },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.dgr.grMax == false },
            unlocked() { return true },
            onClick() {
                player.dgr.grMax = true
            },
            style: { width: '75px', "min-height": '50px', color: "white" }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.dgr.grMax == true  },
            unlocked() { return true },
            onClick() {
                player.dgr.grMax = false
            },
            style: { width: '75px', "min-height": '50px', color: "white" }
        },
        
        //grass plots
        100: {
            title() { return format(player.dgr.grassPlots[0][0]); },
            canClick() { return player.dgr.grassPlots[0][0].gt(0); },
            unlocked() { return true; },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[0][0]);
                player.dgr.grassPlots[0][0] = new Decimal(0);
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[0][0], color: "black", "font-size": "10px" }; },
        },
        101: {
            title() { return format(player.dgr.grassPlots[0][1]) },
            canClick() { return player.dgr.grassPlots[0][1].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[0][1])
                player.dgr.grassPlots[0][1] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[0][1], color: "black", "font-size": "10px" }; },
        },
        102: {
            title() { return format(player.dgr.grassPlots[0][2]) },
            canClick() { return player.dgr.grassPlots[0][2].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[0][2])
                player.dgr.grassPlots[0][2] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[0][2], color: "black", "font-size": "10px" }; },
        },
        103: {
            title() { return format(player.dgr.grassPlots[0][3]) },
            canClick() { return player.dgr.grassPlots[0][3].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[0][3])
                player.dgr.grassPlots[0][3] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[0][3], color: "black", "font-size": "10px" }; },

        },
        104: {
            title() { return format(player.dgr.grassPlots[0][4]) },
            canClick() { return player.dgr.grassPlots[0][4].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[0][4])
                player.dgr.grassPlots[0][4] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[0][4], color: "black", "font-size": "10px" }; },

        },
        110: {
            title() { return format(player.dgr.grassPlots[1][0]) },
            canClick() { return player.dgr.grassPlots[1][0].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[1][0])
                player.dgr.grassPlots[1][0] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[1][0], color: "black", "font-size": "10px" }; },

        },
        111: {
            title() { return format(player.dgr.grassPlots[1][1]) },
            canClick() { return player.dgr.grassPlots[1][1].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[1][1])
                player.dgr.grassPlots[1][1] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[1][1], color: "black", "font-size": "10px" }; },

        },
        112: {
            title() { return format(player.dgr.grassPlots[1][2]) },
            canClick() { return player.dgr.grassPlots[1][2].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[1][2])
                player.dgr.grassPlots[1][2] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[1][2], color: "black", "font-size": "10px" }; },

        },
        113: {
            title() { return format(player.dgr.grassPlots[1][3]) },
            canClick() { return player.dgr.grassPlots[1][3].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[1][3])
                player.dgr.grassPlots[1][3] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[1][3], color: "black", "font-size": "10px" }; },

        },
        114: {
            title() { return format(player.dgr.grassPlots[1][4]) },
            canClick() { return player.dgr.grassPlots[1][4].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[1][4])
                player.dgr.grassPlots[1][4] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[1][4], color: "black", "font-size": "10px" }; },

        },
        120: {
            title() { return format(player.dgr.grassPlots[2][0]) },
            canClick() { return player.dgr.grassPlots[2][0].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[2][0])
                player.dgr.grassPlots[2][0] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[2][0], color: "black", "font-size": "10px" }; },

        },
        121: {
            title() { return format(player.dgr.grassPlots[2][1]) },
            canClick() { return player.dgr.grassPlots[2][1].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[2][1])
                player.dgr.grassPlots[2][1] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[2][1], color: "black", "font-size": "10px" }; },

        },
        122: {
            title() { return format(player.dgr.grassPlots[2][2]) },
            canClick() { return player.dgr.grassPlots[2][2].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[2][2])
                player.dgr.grassPlots[2][2] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[2][2], color: "black", "font-size": "10px" }; },

        },
        123: {
            title() { return format(player.dgr.grassPlots[2][3]) },
            canClick() { return player.dgr.grassPlots[2][3].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[2][3])
                player.dgr.grassPlots[2][3] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[2][3], color: "black", "font-size": "10px" }; },

        },
        124: {
            title() { return format(player.dgr.grassPlots[2][4]) },
            canClick() { return player.dgr.grassPlots[2][4].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[2][4])
                player.dgr.grassPlots[2][4] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[2][4], color: "black", "font-size": "10px" }; },

        },
        130: {
            title() { return format(player.dgr.grassPlots[3][0]) },
            canClick() { return player.dgr.grassPlots[3][0].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[3][0])
                player.dgr.grassPlots[3][0] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[3][0], color: "black", "font-size": "10px" }; },

        },
        131: {
            title() { return format(player.dgr.grassPlots[3][1]) },
            canClick() { return player.dgr.grassPlots[3][1].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[3][1])
                player.dgr.grassPlots[3][1] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[3][1], color: "black", "font-size": "10px" }; },

        },
        132: {
            title() { return format(player.dgr.grassPlots[3][2]) },
            canClick() { return player.dgr.grassPlots[3][2].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[3][2])
                player.dgr.grassPlots[3][2] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[3][2], color: "black", "font-size": "10px" }; },

        },
        133: {
            title() { return format(player.dgr.grassPlots[3][3]) },
            canClick() { return player.dgr.grassPlots[3][3].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[3][3])
                player.dgr.grassPlots[3][3] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[3][3], color: "black", "font-size": "10px" }; },

        },
        134: {
            title() { return format(player.dgr.grassPlots[3][4]) },
            canClick() { return player.dgr.grassPlots[3][4].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[3][4])
                player.dgr.grassPlots[3][4] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[3][4], color: "black", "font-size": "10px" }; },

        },
        140: {
            title() { return format(player.dgr.grassPlots[4][0]) },
            canClick() { return player.dgr.grassPlots[4][0].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[4][0])
                player.dgr.grassPlots[4][0] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[4][0], color: "black", "font-size": "10px" }; },

        },
        141: {
            title() { return format(player.dgr.grassPlots[4][1]) },
            canClick() { return player.dgr.grassPlots[4][1].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[4][1])
                player.dgr.grassPlots[4][1] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[4][1], color: "black", "font-size": "10px" }; },

        },
        142: {
            title() { return format(player.dgr.grassPlots[4][2]) },
            canClick() { return player.dgr.grassPlots[4][2].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[4][2])
                player.dgr.grassPlots[4][2] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[4][2], color: "black", "font-size": "10px" }; },

        },
        143: {
            title() { return format(player.dgr.grassPlots[4][3]) },
            canClick() { return player.dgr.grassPlots[4][3].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[4][3])
                player.dgr.grassPlots[4][3] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[4][3], color: "black", "font-size": "10px" }; },

        },
        144: {
            title() { return format(player.dgr.grassPlots[4][4]) },
            canClick() { return player.dgr.grassPlots[4][4].gt(0)  },
            unlocked() { return true },
            onClick() {
                player.dgr.grass = player.dgr.grass.add(player.dgr.grassPlots[4][4])
                player.dgr.grassPlots[4][4] = new Decimal(0)
            },
            style() { return { width: '75px', "min-height": '75px', "background-color": player.dgr.clickableColors[4][4], color: "black", "font-size": "10px" }; },

        },
    },

    upgrades: {

    },
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
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,500<br/>Grass Capacity Increaser"
            },
            display() {
                return "which are multiplying max grass per plot by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy() {
                if (player.dgr.grMax == false) {
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
            style: { width: '275px', height: '150px', color: "white" }
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
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,500<br/>Grass Value Multiplier"
            },
            display() {
                return "which are boosting dark grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy() {
                if (player.dgr.grMax == false) {
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
            style: { width: '275px', height: '150px', color: "white" }
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
                return format(getBuyableAmount(this.layer, this.id), 0) + "/50<br/>Grass Speed-Upper"
            },
            display() {
                return "which are reducing time required to grow grass by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy() {
                if (player.dgr.grMax == false) {
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
            style: { width: '275px', height: '150px', color: "white" }
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
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/>Point Grasser"
            },
            display() {
                return "which are boosting point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy() {
                if (player.dgr.grMax == false) {
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
            style: { width: '275px', height: '150px', color: "white" }
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
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/>Rank-Tier-Tetr Grasser"
            },
            display() {
                return "which are boosting rank/tier/tetr point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy() {
                if (player.dgr.grMax == false) {
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
            style: { width: '275px', height: '150px', color: "white" }
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
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/>Prestige Grasser"
            },
            display() {
                return "which are boosting prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Grass"
            },
            buy() {
                if (player.dgr.grMax == false) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {

    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'border-color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.dgr.lastPickedText }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Max grass per plot: <h3>" + format(player.dgr.maxGrass) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["bar", "grassBar"],
                    ["blank", "25px"],
                    ["row", [["clickable", 100], ["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104]]],
                    ["row", [["clickable", 110], ["clickable", 111], ["clickable", 112], ["clickable", 113], ["clickable", 114]]],
                    ["row", [["clickable", 120], ["clickable", 121], ["clickable", 122], ["clickable", 123], ["clickable", 124]]],
                    ["row", [["clickable", 130], ["clickable", 131], ["clickable", 132], ["clickable", 133], ["clickable", 134]]],
                    ["row", [["clickable", 140], ["clickable", 141], ["clickable", 142], ["clickable", 143], ["clickable", 144]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Click on a plot to collect the grass." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

                ]

            },
            "Buyables": {
                buttonStyle() { return { 'border-color': 'black' } },
                unlocked() { return true },
                content:
                [
        ["blank", "25px"],
        ["row", [["clickable", 2], ["clickable", 3]]],
        ["blank", "25px"],
        ["row", [["buyable", 11],["buyable", 12],["buyable", 13],]],
        ["row", [["buyable", 14],["buyable", 15],["buyable", 16],]],

                ]

            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.dgr.grass) + "</h3> dark grass, which boosts generator gain by x" + format(player.dgr.grassEffect) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "Grass value: <h3>" + format(player.dgr.grassValue) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return hasUpgrade("le", 22) }
})