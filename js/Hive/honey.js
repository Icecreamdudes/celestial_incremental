addLayer("ho", {
    name: "Honey", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HO", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        cell: new Decimal(0),
        cellGain: new Decimal(0),

        honey: new Decimal(0),
        honeyPerSecond: new Decimal(0),

        effects: {
            bee: {
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: new Decimal(1),
            },
            flower: {
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: new Decimal(1),
            },
            alpha: {
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: new Decimal(1),
            },
            nectar: {
                level: new Decimal(0),
                xp: new Decimal(0),
                req: new Decimal(1),
                effect: new Decimal(1),
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {borderColor: "#654700"}
    },
    tooltip: "Honey",
    color: "#cb8e00",
    branches: ["ne"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.ho.cellGain = player.ne.delta.amount.div(100).pow(0.5)
        player.ho.cellGain = player.ho.cellGain.mul(buyableEffect("bee", 61))
        player.ho.cellGain = player.ho.cellGain.mul(player.fl.glossaryEffects.honey)
        if (hasUpgrade("ho", 4)) player.ho.cellGain = player.ho.cellGain.mul(upgradeEffect("ho", 4))
        if (hasUpgrade("al", 202)) player.ho.cellGain = player.ho.cellGain.mul(2)

        //FLOOR VALUE
        player.ho.cellGain = player.ho.cellGain.floor()

        player.ho.honeyPerSecond = player.ho.cell.div(10)
        player.ho.honeyPerSecond = player.ho.honeyPerSecond.mul(buyableEffect("bee", 62))
        if (hasUpgrade("ho", 1)) player.ho.honeyPerSecond = player.ho.honeyPerSecond.mul(upgradeEffect("ho", 1))
        if (hasUpgrade("ho", 6)) player.ho.honeyPerSecond = player.ho.honeyPerSecond.mul(upgradeEffect("ho", 6))
        player.ho.honey = player.ho.honey.add(player.ho.honeyPerSecond.mul(delta))

        if (player.ho.cell.gte(1)) player.ho.effects.bee.xp = player.ho.effects.bee.xp.add(player.ho.honey.mul(delta))
        player.ho.effects.bee.req = Decimal.pow(3, player.ho.effects.bee.level).mul(10)
        player.ho.effects.bee.effect = Decimal.pow(Decimal.mul(0.3, buyableEffect("bee", 63)).add(1), player.ho.effects.bee.level)

        if (player.ho.cell.gte(5)) player.ho.effects.flower.xp = player.ho.effects.flower.xp.add(player.ho.honey.mul(delta))
        player.ho.effects.flower.req = Decimal.pow(4, player.ho.effects.flower.level).mul(1000)
        player.ho.effects.flower.effect = player.ho.effects.flower.level.mul(Decimal.mul(0.1, buyableEffect("bee", 63))).div(2)

        if (player.ho.cell.gte(50)) player.ho.effects.alpha.xp = player.ho.effects.alpha.xp.add(player.ho.honey.mul(delta))
        player.ho.effects.alpha.req = Decimal.pow(5, player.ho.effects.alpha.level).mul(10000)
        player.ho.effects.alpha.effect = Decimal.pow(Decimal.mul(0.25, buyableEffect("bee", 63)).add(1), player.ho.effects.alpha.level)

        if (player.ho.cell.gte(200)) player.ho.effects.nectar.xp = player.ho.effects.nectar.xp.add(player.ho.honey.mul(delta))
        player.ho.effects.nectar.req = Decimal.pow(6, player.ho.effects.nectar.level).mul(100000)
        player.ho.effects.nectar.effect = Decimal.pow(Decimal.mul(0.1, buyableEffect("bee", 63)).add(1), player.ho.effects.nectar.level)
        
        for (let i in player.ho.effects) {
            if (player.ho.effects[i].xp.gte(player.ho.effects[i].req)) {
                if (i == "flower" && player.ho.effects[i].level.eq(25)) continue
                player.ho.effects[i].level = player.ho.effects[i].level.add(1)
                player.ho.effects[i].xp = new Decimal(0)
            }
        }
    },
    clickables: {
        1: {
            title() { return "Gain honey-cells, but reset previous content<br><small>Req: 100 Nectar δ</small>"},
            canClick() { return player.ne.delta.amount.gte(100)},
            unlocked: true,
            onClick() {
                player.ho.cell = player.ho.cell.add(player.ho.cellGain)

                player.bee.bees = new Decimal(1)
                player.ne.alpha.amount = new Decimal(0)
                player.ne.alpha.gain = new Decimal(0)
                player.ne.alpha.effect = new Decimal(1)
                player.ne.beta.amount = new Decimal(0)
                player.ne.beta.gain = new Decimal(0)
                player.ne.beta.effect = new Decimal(1)
                player.ne.gamma.amount = new Decimal(0)
                player.ne.gamma.gain = new Decimal(0)
                player.ne.gamma.effect = new Decimal(1)
                player.ne.delta.amount = new Decimal(0)
                player.ne.delta.gain = new Decimal(0)
                player.ne.delta.effect = new Decimal(1)
                player.ne.upgrades.splice(0, player.ne.upgrades.length)
            },
            style: {width: "250px", minHeight: "97px", fontSize: "12px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0px 0px 17px 0px"},
        },
    },
    bars: {
        effect1: {
            unlocked() {return player.ho.cell.gte(1)},
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return player.ho.effects.bee.xp.div(player.ho.effects.bee.req)
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#a27100"},
            borderStyle: {border: "3px solid white", borderRadius: "25px"},
            textStyle: {userSelect: "none"},
            display() {
                return "Bee Cell Lv." + formatWhole(player.ho.effects.bee.level) + " | [" + format(player.ho.effects.bee.xp) + "/" + format(player.ho.effects.bee.req) + "] | x" + format(player.ho.effects.bee.effect) + " BPS"
            },
        },
        effect2: {
            unlocked() {return player.ho.cell.gte(5)},
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                if (player.ho.effects.flower.level.gte(25)) return new Decimal(1)
                return player.ho.effects.flower.xp.div(player.ho.effects.flower.req)
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#a27100"},
            borderStyle: {border: "3px solid white", borderRadius: "25px"},
            textStyle: {userSelect: "none"},
            display() {
                if (player.ho.effects.flower.level.gte(25)) return "Flower Cell Lv." + formatWhole(player.ho.effects.flower.level) + "/25 | [MAX] | x" + format(player.ho.effects.flower.effect) + " GEB"
                return "Flower Cell Lv." + formatWhole(player.ho.effects.flower.level) + "/25 | [" + format(player.ho.effects.flower.xp) + "/" + format(player.ho.effects.flower.req) + "] | +" + commaFormat(player.ho.effects.flower.effect, 2) + " GEB"
            },
        },
        effect3: {
            unlocked() {return player.ho.cell.gte(50)},
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return player.ho.effects.alpha.xp.div(player.ho.effects.alpha.req)
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#a27100"},
            borderStyle: {border: "3px solid white", borderRadius: "25px"},
            textStyle: {userSelect: "none"},
            display() {
                return "Alpha Cell Lv." + formatWhole(player.ho.effects.alpha.level) + " | [" + format(player.ho.effects.alpha.xp) + "/" + format(player.ho.effects.alpha.req) + "] | x" + format(player.ho.effects.alpha.effect) + " Nectar α"
            },
        },
        effect4: {
            unlocked() {return player.ho.cell.gte(200)},
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return player.ho.effects.nectar.xp.div(player.ho.effects.nectar.req)
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#a27100"},
            borderStyle: {border: "3px solid white", borderRadius: "25px"},
            textStyle: {userSelect: "none"},
            display() {
                return "Nectar Cell Lv." + formatWhole(player.ho.effects.nectar.level) + " | [" + format(player.ho.effects.nectar.xp) + "/" + format(player.ho.effects.nectar.req) + "] | x" + format(player.ho.effects.nectar.effect) + " Nectar"
            },
        },
        cellBar: {
            unlocked: true,
            direction: UP,
            width: 250,
            height: 465,
            progress() {
                let base = 0.1
                if (true) base = 0.125
                if (player.ho.cell.lte(0)) return new Decimal(0)
                if (player.ho.cell.lt(1)) return player.ho.cell.mul(base)
                if (player.ho.cell.lt(5)) return player.ho.cell.sub(1).div(4).mul(base).add(base)
                if (player.ho.cell.lt(15)) return player.ho.cell.sub(5).div(10).mul(base).add(base*2)
                if (player.ho.cell.lt(50)) return player.ho.cell.sub(15).div(35).mul(base).add(base*3)
                if (player.ho.cell.lt(100)) return player.ho.cell.sub(50).div(50).mul(base).add(base*4)
                if (player.ho.cell.lt(200)) return player.ho.cell.sub(100).div(100).mul(base).add(base*5)
                if (player.ho.cell.lt(1000)) return player.ho.cell.sub(200).div(800).mul(base).add(base*6)
                if (player.ho.cell.lt(2500)) return player.ho.cell.sub(1000).div(1500).mul(base).add(base*7)
                return new Decimal(1)
            },
            baseStyle: {background: "linear-gradient(0deg, #281c00, #3c2a00)"},
            fillStyle: {backgroundColor: "#cb8e00cc"},
            borderStyle: {borderLeft: "0px", borderRight: "0px", borderTop: "3px solid white", borderBottom: "3px solid white", borderRadius: "0"},
            textStyle: {fontSize: "11px", userSelect: "none"},
            display() {
                let str = "<div style='width:250px;height:465px;display:flex;flex-direction:column'>"
                if (false) str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid white'>?? Cells<hr style='width:200px;margin-bottom:3px'>Unlock Bee Bread Cell</div>")
                if (false) str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid white'>?? Cells<hr style='width:200px;margin-bottom:3px'>Unlock Pollen Cell</div>")
                str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid white'>2,500 Cells<hr style='width:200px;margin-bottom:3px'>Unlock Honey Upgrades</div>")
                str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid white'>1,000 Cells<hr style='width:200px;margin-bottom:3px'>Unlock a new honey research</div>")
                str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid white'>200 Cells<hr style='width:200px;margin-bottom:3px'>Unlock Nectar Cell</div>")
                str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid white'>100 Cells<hr style='width:200px;margin-bottom:3px'>Half time between Yellow Flower Growth</div>")
                str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid white'>50 Cells<hr style='width:200px;margin-bottom:3px'>Unlock Alpha Cell</div>")
                str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid white'>15 Cells<hr style='width:200px;margin-bottom:3px'>Unlock Yellow Flowers</div>")
                str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid white'>5 Cells<hr style='width:200px;margin-bottom:3px'>Unlock Flower Cell</div>")
                str = str.concat("<div style='width:250px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid transparent'>1 Cell<hr style='width:200px;margin-bottom:3px'>Unlock Bee Cell</div>")
                return str
            },
        },
    },
    upgrades: {
        1: {
            title: "Honey 1",
            unlocked() {return player.ho.cell.gte(2500)},
            description: "Double honey gain per honey upgrade.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.ho },
            currencyDisplayName: "Honey",
            currencyInternalName: "honey",
            effect() {
                return Decimal.pow(2, player.ho.upgrades.length)
            },
            effectDisplay() { return "x" + formatWhole(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {width: "175px", minHeight: "80px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        2: {
            title: "Honey 2",
            unlocked() {return player.ho.cell.gte(2500)},
            description: "Total cell level boosts nectar.",
            cost: new Decimal(3e6),
            currencyLocation() { return player.ho },
            currencyDisplayName: "Honey",
            currencyInternalName: "honey",
            effect() {
                let lvl = new Decimal(0)
                for (let i in player.ho.effects) {
                    lvl = lvl.add(player.ho.effects[i].level)
                }
                return lvl.div(100).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style: {width: "175px", minHeight: "80px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        3: {
            title: "Honey 3",
            unlocked() {return player.ho.cell.gte(2500)},
            description: "Nectar β boosts picking power.",
            cost: new Decimal(1e7),
            currencyLocation() { return player.ho },
            currencyDisplayName: "Honey",
            currencyInternalName: "honey",
            effect() {
                return player.ne.beta.amount.add(1).log(10).div(10).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style: {width: "175px", minHeight: "80px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        4: {
            title: "Honey 4",
            unlocked() {return player.ho.cell.gte(2500)},
            description: "Nectar γ boosts honey-cells.",
            cost: new Decimal(4e7),
            currencyLocation() { return player.ho },
            currencyDisplayName: "Honey",
            currencyInternalName: "honey",
            effect() {
                return player.ne.gamma.amount.pow(0.03)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style: {width: "175px", minHeight: "80px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        5: {
            title: "Honey 5",
            unlocked() {return player.ho.cell.gte(2500)},
            description: "Honey-cells boost flower gain.",
            cost: new Decimal(2e8),
            currencyLocation() { return player.ho },
            currencyDisplayName: "Honey",
            currencyInternalName: "honey",
            effect() {
                return player.ho.cell.add(1).log(10).div(4).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style: {width: "175px", minHeight: "80px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        6: {
            title: "Honey 6",
            unlocked() {return player.ho.cell.gte(2500)},
            description: "Glossary effect base boosts honey.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.ho },
            currencyDisplayName: "Honey",
            currencyInternalName: "honey",
            effect() {
                return player.fl.glossaryBase.sub(1).div(2).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style: {width: "175px", minHeight: "80px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return player.bee.bees.eq(1) ? "You have <h3>" + format(player.bee.bees) + "</h3> bee." : "You have <h3>" + format(player.bee.bees) + "</h3> bees."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.bee.bps) + "/s)" }, {color: "white", fontSize: "14px", fontFamily: "monospace", marginLeft: "5px"}],
        ]],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.ne.delta.amount) + "</h3> Nectar δ."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.ne.delta.gain) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace", marginLeft: "5px"}],
        ]],
        ["blank", "10px"],
        ["row", [
            ["style-column", [
                ["top-column", [
                    ["blank", "15px"],
                    ["row", [
                        ["raw-html", () => {return "You have " + format(player.ho.honey) + " Honey."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "<small>(+" + format(player.ho.honeyPerSecond) + "/s)</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["blank", "15px"],
                    ["bar", "effect1"],
                    ["blank", "10px"],
                    ["bar", "effect2"],
                    ["blank", "10px"],
                    ["bar", "effect3"],
                    ["blank", "10px"],
                    ["bar", "effect4"],
                ], {width: "550px", height: "450px"}],
                ["style-row", [
                    ["upgrade", 1], ["upgrade", 2], ["upgrade", 3], ["upgrade", 4], ["upgrade", 5], ["upgrade", 6]
                ], () => {return player.ho.cell.gte(2500) ? {width: "550px", height: "172px", background: "#0f0a00", borderTop: "3px solid white", borderRadius: "0 0 0 17px"} : {width: "550px", height: "150px"}}],
            ], {width: "550px", height: "625px", backgroundColor: "#1e1500", border: "3px solid white", borderRadius: "20px 0 0 20px"}],
            ["style-column", [
                ["style-column", [
                    ["raw-html", "Honey-Cells<hr style='width:200px'>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["row", [
                        ["raw-html", () => {return formatWhole(player.ho.cell)}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + formatWhole(player.ho.cellGain) + ")"}, {color: "white", fontSize: "14px", fontFamily: "monospace", marginLeft: "7px"}],
                    ]],

                ], {width: "250px", height: "57px"}],
                ["bar", "cellBar"],
                ["clickable", 1],
            ], {width: "250px", height: "625px", borderRight: "3px solid white", borderTop: "3px solid white", borderBottom: "3px solid white", borderRadius: "0px 20px 20px 0px"}],
        ]],
    ],
    layerShown() { return player.startedGame && player.bee.totalResearch.gte(60) && player.bee.path != 1 }
})
