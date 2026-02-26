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

        fountainSpeed: new Decimal(0),

        modules: {
            1: {
                time: new Decimal(0),
                timeReq: new Decimal(120),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                timeCapsuleReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
        },

        blueshifts: new Decimal(0),
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
        
        player.pri.fountainSpeed = player.pri.prisms.pow(2)

        // FOUNTAIN PROGRESS
        Object.keys(layers.pri.fountains).forEach(i => {
            let module = player.pri.modules[i]
            let fountain = layers.pri.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.timeCapsuleReq = fountain.getTimeCapsuleReq()
            module.completionEffect = fountain.getCompletionEffect()

            if (module.focused) {
                module.time = module.time.add(module.timeSpeed.mul(delta))
                if (module.time.gte(module.timeReq)) {
                    module.focused = false
                    module.completions = module.completions.add(1)
                    module.time = new Decimal(0)
                }
            }
        });
    },
    prismReset(isRewarded) {
        if (isRewarded) {
            player.pri.prisms = player.pri.prisms.add(player.pri.prismsToGet)
        }

        player.wel.light = new Decimal(0)

        player.wel.fountains[1].time = new Decimal(0)
        player.wel.fountains[1].completions = new Decimal(0)
        player.wel.fountains[2].time = new Decimal(0)
        player.wel.fountains[2].completions = new Decimal(0)
        player.wel.fountains[3].time = new Decimal(0)
        player.wel.fountains[3].completions = new Decimal(0)
        player.wel.fountains[4].time = new Decimal(0)
        player.wel.fountains[4].completions = new Decimal(0)

        setBuyableAmount("wel", 11, new Decimal(0))
        setBuyableAmount("wel", 12, new Decimal(0))
        setBuyableAmount("wel", 13, new Decimal(0))
        setBuyableAmount("wel", 14, new Decimal(0))
    },
    branches: ["wel", "prj"],
    clickables: {
        1: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.storedTimeCapsules.gte(player.pri.modules[this.id].timeCapsuleReq) && !player.pri.modules[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.prj.storedTimeCapsules = player.prj.storedTimeCapsules.sub(player.pri.modules[this.id].timeCapsuleReq)
                player.pri.modules[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        101: {
            title() { return "<h2>Form your light into Prisms.</h2><br>Req: 1e15 Light" },
            canClick() { return player.wel.light.gte(1e15)},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)"
                    look.border = "3px solid #335966"
                    look.color = "#335966"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #d6ebff"
                    look.color = "#d6ebff"
                }
                return look
            },
        },
        201: {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.light.gte(1e15)},
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
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(99) },
            currency() { return player.pri.prisms},
            pay(amt) { player.pri.prisms = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Light Cycle Boost'
            },
            display() {
                return 'which are boosting light well cycles by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Prisms'
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
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #335966", background: "#4d9999", color: "black", margin: "3px"}
        },
        12: {
            condition() { return player.pri.bestPrisms.gte(1) },
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(4) },
            currency() { return player.pri.prisms},
            pay(amt) { player.pri.prisms = this.currency().sub(amt) },
            effect(x) { return player.wel.light.add(1).log(10).pow(2).div(20).pow(getBuyableAmount(this.layer, this.id).pow(0.5))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Light Boost'
            },
            display() {
                return 'which are boosting light based on itself by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Prisms'
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
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #335966", background: "#4d9999", color: "black", margin: "3px"}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    fountains: {
        1: {
            title: "Light Cycle Fountain",
            completionEffectStat: "Light Well Cycles",
            getCompletionEffect() {
                let completions = player.pri.modules[1].completions

                s = completions.pow(0.75).pow_base(2)

                return s
            },
            getTimeReq() {
                let completions = player.pri.modules[1].completions
                let s = new Decimal(600)

                s = s.mul(completions.add(1).pow(2))
                s = s.mul(completions.pow_base(1.5))
                if (completions.gte(50)) {
                    s = s.pow(1.05)
                }

                return s
            },
            getTimeCapsuleReq() {
                let completions = player.pri.modules[1].completions
                let s = completions.floor().add(1).pow(1.25)
                
                if (completions.gte(50)) {
                    s = s.mul(completions.sub(50).pow_base(1.1))
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
    },
    microtabs: {
        stuff: {
            "Prisms": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["clickable", 101],
                        ["blank", "25px"],
                        ["raw-html", "You have <h3>" + formatWhole(player.prj.storedTimeCapsules) + "</h3> stored time capsules. (From Dark Universe Eclipse)", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "Boosts project speed by x" + format(player.prj.storedTimeCapsuleEffect), {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["raw-html", "You are gaining <h3>" + format(player.prj.projectSpeed) + "</h3> fountain progress /s.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "<small>Prisms boost fountain progress gain by x" + format(player.pri.fountainSpeed) + "</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "You are focusing on 0/1 interspace projects.", {color: "#ccc", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["style-row", [
                            makePrismFountain(1),
                            ["blank", "6px", {width: "6px"}],
                            //hasUpgrade("wel", 23) ? makePrismFountain(2) : null,
                        ]],
                    ]
                    return look
                }
            },
            "Wavelength": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return hasMilestone("prj", 301) },
                content() {
                    return [
                        ["blank", "25px"],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", 
                                    "<small>When a well's timer gets below 0.2s, you can do a blueshift. Blueshifting resets everything prismatic does, as well as all well cycles. Each blueshift done divides cycle speed and increases cycle gain for its respective well. You also gain multipliers from total blueshifts done.</small>"
                                , {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {background: "#4d9999", borderRadius: "10px", width: "610px", height: "100px", padding: "3px"}],                   
                        ], {background: "#335966", borderRadius: "13px", padding: "3px"}],
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
                                ["clickable", 201],
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
const makePrismFountain = function (id) {
    let thisFountain =
        ["style-column", [
            ["style-row", [
                ["style-column", [
                    ["blank", "10px"],
                    ["raw-html", layers.pri.fountains[id].title, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", player.pri.modules[id].timeSpeed.lte(0) ? "<span style='color:#ff7f7f'>Can't Complete w/o Prisms!</span>" : (player.pri.modules[id].focused ? formatTime(player.pri.modules[id].timeReq.sub(player.pri.modules[id].time).div(player.pri.modules[id].timeSpeed)) : formatTime(player.pri.modules[id].timeReq.div(player.pri.modules[id].timeSpeed))) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "<small>(" + format(player.pri.modules[id].time, 1) + "/" + format(player.pri.modules[id].timeReq, 1) + ")</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", player.pri.modules[id].timeCapsuleReq.eq(0) ? "Your first cycle is free!" : "-" + formatWhole(player.pri.modules[id].timeCapsuleReq) + " Time Capsules", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "238px", height:"25px"}],
                    ["blank", "3px"],
                    ["clickable", id],
                ], {background: "#335966", border: "3px solid #335966", borderRadius: "16px 0px 0px 0px", width: "238px", height: "150px"}],
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", player.pri.modules[id].time.gte(player.pri.modules[id].timeReq) ? "0%" : formatShortestWhole(player.pri.modules[id].time.div(player.pri.modules[id].timeReq).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}]
                        ], {borderRadius: "50%", width: "125px", height:"125px", border: "3px solid #335966", margin: "-3px", marginTop: "75px",
                            background: player.pri.modules[id].time.lt(player.pri.modules[id].timeReq) ?
                            "conic-gradient(#d6ebff " + (player.pri.modules[id].time.div(player.pri.modules[id].timeReq)).min(1).max(0) * 360 + "deg, #000d1a 0deg)" : "#000d1a"
                        }],
                    ], {background: "#335966", borderRadius: "0px 81px 0px 0px", width: "153px", height: "78px"}],
                    ["style-column", [], {background: "#4d9999", height: "78px"}],
                ], {border: "3px solid #335966", borderBottom: "0px", borderLeft: "0px", borderRadius: "0px 81px 0px 0px", padding: "-3px", width: "153px", height: "153px"}],
            ], {verticalAlign: "bottom"}],
            ["style-row", [
                ["style-column", [
                    ["raw-html", formatWhole(player.pri.modules[id].completions) + " ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "75px"}],
                ["style-column", [], {width: "3px", height: "46px"}],
                ["style-column", [
                    ["raw-html", "<small>(x" + formatShort(layers.pri.fountains[id].getCompletionEffect()) + " " + layers.pri.fountains[id].completionEffectStat + ")</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "292px", marginRight: "14px"}],
            ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "0px 0px 10px 10px", borderTop: "0px", height: "25px"}],
        ], {width: "400px"}]
    return thisFountain
}