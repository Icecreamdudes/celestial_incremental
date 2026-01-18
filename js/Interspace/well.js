addLayer("wel", {
    name: "Wells of Light",
    symbol: "WE",
    row: 0,
    position: 0,
    startData() { return {
        unlocked: true,
        bhLoop: 0,

        light: new Decimal(0),
        bestLight: new Decimal(0),
        lightMult: new Decimal(1),
        lightEffect: new Decimal(0),
        lightModuleEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        
        modules: {
            1: {
                time: new Decimal(0),
                maxTime() {
                    let amt = new Decimal(10)
                    if (hasUpgrade("bum", 11)) amt = amt.div(2)
                    return amt
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
            2: {
                time: new Decimal(0),
                maxTime() {
                    let amt = new Decimal(60)
                    if (hasUpgrade("bum", 11)) amt = amt.div(2)
                    return amt
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
            3: {
                time: new Decimal(0),
                maxTime() {
                    let amt = new Decimal(3)
                    if (hasUpgrade("bum", 11)) amt = amt.div(2)
                    return amt
                },
                timeSpeed() {
                    return new Decimal(1)
                },
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#00664d",
            background: "#a8ffd3",
            "background-origin": "border-box",
            "border-color": "#00664d",
        };
    },
    tooltip: "Wells of Light",
    color: "#ffdfdf",
    update(delta) {
        player.wel.bhLoop += delta / 10
        player.wel.bhLoop %= 1

        player.wel.lightMult = new Decimal(1)
        player.wel.lightMult = player.wel.lightMult.mul(buyableEffect("wel", 11))
        player.wel.lightMult = player.wel.lightMult.mul(buyableEffect("wel", 12))
        if (hasUpgrade("wel", 13)) {
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[1].completions.mul(0.02).add(1))
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[2].completions.mul(0.1).add(1))
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[3].completions.mul(0.01).add(1))
        }
        if (hasUpgrade("wel", 14)) player.wel.lightMult = player.wel.lightMult.mul(2)
        
        for (let i = 0; i < Object.keys(player.wel.modules).length; i++) {
            player.wel.modules[i+1].time = player.wel.modules[i+1].time.add(delta)
        }

        player.wel.lightEffect = player.wel.light.add(1).pow(0.1)

        if (player.wel.bestLight.lt(player.wel.light)) player.wel.bestLight = player.wel.light;
    },
    branches: ["pri", "prj", ["bum", "#fff", 40], ["bum", "#402030", 8]],
    bars: {},
    upgrades: {
        11: {
            unlocked() { return true },
            condition() { return player.in.infinities.gte(1e25) || true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock light well α.</h2><br><br><h3>Cost: Free!</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 1e25 Infinities</h3>"
                }
                return s
            },
            cost: new Decimal(0),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "8px 0px 0px 8px", border: "3px solid #0000007f", color: "#000000df", padding: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "#2e2323"
                    look.border = "3px solid #5e4747"
                    look.color = "#ffdfdf"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.backgroundColor = "#bf8f8f"
                }
                return look
            },
        },
        12: {
            unlocked() { return layers.wel.upgrades[11].condition() || hasUpgrade("wel", 11) },
            condition() { return player.wel.bestLight.gte(5) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock light buyables.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 5 Light</h3>"
                }
                return s
            },
            cost: new Decimal(5),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "#2e2323"
                    look.border = "3px solid #5e4747"
                    look.color = "#ffdfdf"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.backgroundColor = "#bf8f8f"
                }
                return look
            },
        },
        13: {
            unlocked() { return layers.wel.upgrades[12].condition() || hasUpgrade("wel", 12) },
            condition() { return getBuyableAmount("wel", 11).gte(8) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Well cycles boost well yield.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 8 Light Boost levels</h3>"
                }
                return s
            },
            cost: new Decimal(50),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "#2e2323"
                    look.border = "3px solid #5e4747"
                    look.color = "#ffdfdf"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.backgroundColor = "#bf8f8f"
                }
                return look
            },
        },
        14: {
            unlocked() { return layers.wel.upgrades[13].condition() || hasUpgrade("wel", 13) },
            condition() { return getBuyableAmount("wel", 12).gte(4) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id)) {
                    s += "Double light gain and unlock prisms.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else if (this.condition()) {
                    s += "...</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 4 Light Boost II levels</h3>"
                }
                return s
            },
            cost: new Decimal(1.5e4),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px 8px 8px 0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "#2e2323"
                    look.border = "3px solid #5e4747"
                    look.color = "#ffdfdf"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.backgroundColor = "#bf8f8f"
                }
                return look
            },
        },
    },
    buyables: {
        11: {
            condition() { return true },
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1e3) },
            currency() { return player.wel.light},
            pay(amt) { player.wel.light = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(getBuyableAmount(this.layer, this.id).mul(0.01).add(1))},
            unlocked() { return hasUpgrade("wel", 12) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Light Boost"
            },
            display() {
                return 'which are boosting light by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Light'
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
            style: { width: '194px', height: '174px', borderRadius: "5px 0px 0px 5px", border: "3px solid #336659", background: "#4d9973", color: "#000000df"}
        },
        12: {
            condition() { return player.wel.bestLight.gte(1.5e3) },
            costBase() { return new Decimal(1.5e3) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(1e3) },
            currency() { return player.wel.light},
            pay(amt) { player.wel.light = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(getBuyableAmount(this.layer, this.id).mul(0.0075).add(1))},
            unlocked() { return layers.wel.buyables[11].condition() || getBuyableAmount("wel", 11).gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Light Boost II"
            },
            display() {
                return 'which are boosting light by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Light'
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
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #336659", background: "#4d9973", color: "#000000df"}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    clickables: {
        1: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[1].time.gte(player.wel.modules[this.id].maxTime())},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(1)
            },
            lightGain() {
                let gain = player.wel.lightMult
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        2: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[2].time.gte(player.wel.modules[this.id].maxTime())},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(1)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(5)
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
        3: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[3].time.gte(player.wel.modules[this.id].maxTime())},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(1)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(0.25)
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], 
                        ]],
                        ["row", [
                            ["upgrade", 21], ["upgrade", 22], ["upgrade", 23],
                        ]],
                        ["row", [
                            ["upgrade", 31], ["upgrade", 32],
                        ]],
                        ["row", [
                            ["upgrade", 41],
                        ]],
                        ["blank", "25px"],
                        ["style-row", [

                        ]]
                    ]
                    if (hasUpgrade("wel", 12)) {
                        look[6][1].push(
                            ["ex-buyable", 11],
                        )
                        if (layers.wel.buyables[12].condition()) {
                            look[6][1].push(
                                ["ex-buyable", 12],
                            )
                        } else {
                            look[6][1].push(
                                ["style-column", [
                                    ["raw-html", "<h2>Light Boost II</h2><br><h3>Req: 1,500 Light</h3>", {color: "#ffdfdf", fontSize: "10px"}],
                                ], {background: "#2e2323", border: "3px solid #5e4747", width: "194px", height: "174px", borderRadius: "0px", lineHeight: "1"}]
                            )
                        }
                    }
                    return look
                },
            },
            "Wells": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            // light well alpha
                        ["style-column", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[1].time.div(player.wel.modules[1].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[1].time.lt(player.wel.modules[1].maxTime()) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[1].time.div(player.wel.modules[1].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Well α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[1].time.lt(player.wel.modules[1].maxTime()) ? formatTime(player.wel.modules[1].maxTime().sub(player.wel.modules[1].time)) : formatTime(player.wel.modules[1].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[1].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 1],
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                    ["blank", "9px"],
                    ["raw-html", formatShortestWhole(player.wel.modules[1].completions) + " α ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "(x" + formatShort(player.wel.modules[1].completions.mul(0.02).add(1)) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ]],
                    ]],
                    ["blank", "9px"],
                    ["blank", "25px"]]
                    if (player.wel.modules[1].completions.gte(50)) {
                            // light well beta
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                        ["style-column", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[2].time.div(player.wel.modules[2].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[2].time.lt(player.wel.modules[2].maxTime()) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[2].time.div(player.wel.modules[2].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Well β", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[2].time.lt(player.wel.modules[2].maxTime()) ? formatTime(player.wel.modules[2].maxTime().sub(player.wel.modules[2].time)) : formatTime(player.wel.modules[2].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[2].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 2],
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                    ["blank", "9px"],
                    ["raw-html", formatShortestWhole(player.wel.modules[2].completions) + " β ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "(x" + formatShort(player.wel.modules[2].completions.mul(0.1).add(1)) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ]],
                    )
                    } else {
                            // light well beta locked
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "<h2>Light Well β<h2><br><h3>Req: 50 α ↻</h3>", {color: "#ffdfdf", fontSize: "10px"}],
                                ], {background: "#2e2323",border: "3px solid #5e4747", borderRadius: "103px 103px 8px 8px", width: "150px", height: "283px", lineHeight: "1"}],
                            ["blank", "9px"],
                            ["style-column", [], {height: "40px"}],
                        ]],
                    )
                    }
                    if (player.wel.modules[1].completions.gte(50)) {
                    if (player.wel.modules[2].completions.gte(500)) {
                            // light well gamma
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                        ["style-column", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[3].time.div(player.wel.modules[3].maxTime()).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[3].time.lt(player.wel.modules[3].maxTime()) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[3].time.div(player.wel.modules[3].maxTime())).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Well γ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[3].time.lt(player.wel.modules[3].maxTime()) ? formatTime(player.wel.modules[3].maxTime().sub(player.wel.modules[3].time)) : formatTime(player.wel.modules[3].maxTime()) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[3].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "5px 5px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 3],
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                    ["blank", "9px"],
                    ["raw-html", formatShortestWhole(player.wel.modules[3].completions) + " γ ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "(x" + formatShort(player.wel.modules[3].completions.mul(0.01).add(1)) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ]],
                    )
                    } else {
                            // light well gamma locked
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "<h2>Light Well γ</h2><br><h3>Req: 500 β ↻</h3>", {color: "#ffdfdf", fontSize: "10px"}],
                                ], {background: "#2e2323",border: "3px solid #5e4747", borderRadius: "103px 103px 8px 8px", width: "150px", height: "283px", lineHeight: "1"}],
                            ["blank", "9px"],
                            ["style-column", [], {height: "40px"}],
                        ]],
                    )
                    }
                    }
                    return look
                },
            },
        },
    },
    tabFormat() {
        let look = [
            ["raw-html", "You have <h3>" + format(player.wel.light) + "</h3> light.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["microtabs", "stuff", { 'border-width': '0px' }],
        ]
        return look
    },
    playerhown() { return player.startedGame == true}
})  