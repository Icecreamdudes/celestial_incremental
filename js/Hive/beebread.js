const bbMilestone = [
    [new Decimal(1), new Decimal(15625), new Decimal(1e9), new Decimal(1.5e16), new Decimal(1e21), new Decimal(1e29), new Decimal(1e36), new Decimal(1e45), new Decimal(1e120), new Decimal(1e270)],
    [new Decimal(1), new Decimal(25), new Decimal(1000), new Decimal(250000), new Decimal(1e7), new Decimal(5e9), new Decimal(1e12), new Decimal(1e15), new Decimal(1e40), new Decimal(1e90)],
    [new Decimal(1), new Decimal(15625), new Decimal(1e9), new Decimal(1.5e16), new Decimal(1e21), new Decimal(1e29), new Decimal(1e36), new Decimal(1e45), new Decimal(1e120), new Decimal(1e270)],
]

addLayer("bb", {
    name: "Bee Bread", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BB", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        beeBread: new Decimal(0), // Currency Bee Bread
        beeBreadPerSecond: new Decimal(0),
        beeBreadGain: new Decimal(0),

        breadMilestone: 0,
        breadMilestoneHighest: 0,
        breadTier: new Decimal(1),
        breadTierReq: new Decimal(1000),
        breadTierMult: new Decimal(1),

        breadEffects: [
            new Decimal(1), // Bees
            new Decimal(1), // Pollen
            new Decimal(1), // Pollen Cooldown
            new Decimal(1), // Glossary Effect Base
            new Decimal(1), // Pollen Conversion Rate
            new Decimal(1), // Picking Power
            new Decimal(1), // Pentagonal Pink Flowers
            new Decimal(1), // Pink Flower Growth
            new Decimal(1), // Nectar
            new Decimal(1), // Cell
        ],
    }},
    automate() {},
    nodeStyle() {
        return {
            backgroundColor: "#986F4C",
            borderColor: "#4c3726",
        }
    },
    tooltip: "Bee Bread",
    color: "#986F4C",
    branches: ["bpl"],
    update(delta) {
        let onepersec = new Decimal(1)

        // Bee Bread Gain
        if (player.bee.path == 1) {
            if (player.bpl.pollen.lt(1e12)) {
                player.bb.beeBreadGain = player.bpl.pollen.div(1e12)
            } else {
                player.bb.beeBreadGain = player.bpl.pollen.div(1e12).pow(0.5)
            }
        } else {
            if (player.bpl.pollen.lt(1e42)) {
                player.bb.beeBreadGain = player.bpl.pollen.div(1e42)
            } else {
                player.bb.beeBreadGain = player.bpl.pollen.div(1e42).pow(0.3)
            }
        }
        player.bb.beeBreadGain = player.bb.beeBreadGain.mul(buyableEffect("bee", 51))
        player.bb.beeBreadGain = player.bb.beeBreadGain.mul(player.fl.glossaryEffects.beeBread)
        if (hasUpgrade("al", 102)) player.bb.beeBreadGain = player.bb.beeBreadGain.mul(2)
        if (hasUpgrade("al", 119)) player.bb.beeBreadGain = player.bb.beeBreadGain.mul(upgradeEffect("al", 119))
        player.bb.beeBreadGain = player.bb.beeBreadGain.mul(player.bee.preAlephMult)

        // Per Second
        player.bb.beeBread = player.bb.beeBread.add(player.bb.beeBreadPerSecond.mul(delta))

        // Bee Bread Tier Requirement
        let exp = new Decimal(2)
        if (hasUpgrade("al", 123)) exp = exp.mul(0.75)
        player.bb.breadTierReq = new Decimal(10).pow(player.bb.breadTier.add(1).pow(exp))
        if (player.bee.path != 1) player.bb.breadTierReq = player.bb.breadTierReq.pow(3)

        if (hasUpgrade("al", 121) && player.bb.beeBread.gte(player.bb.breadTierReq)) {
            player.bb.breadTier = player.bb.breadTier.add(1)
        }

        // Bee Bread Tier Multiplier
        player.bb.breadTierMult = new Decimal(2)
        player.bb.breadTierMult = player.bb.breadTierMult.mul(buyableEffect("bee", 52))
        if (hasUpgrade("al", 107)) player.bb.breadTierMult = player.bb.breadTierMult.mul(10)

        // Raise by BB tier
        player.bb.breadTierMult = player.bb.breadTierMult.pow(player.bb.breadTier.sub(1)) // Bread Tier Multiplier

        // Bee Bread Effects
        let amt = player.bb.beeBread
        if (player.bee.path != 1) amt = amt.pow(2/3)
        amt = amt.pow(player.ho.effects.bread.effect)
        player.bb.breadEffects[0] = amt.mul(player.bb.breadTierMult).pow(0.3).add(1) // BPS
        player.bb.breadEffects[1] = amt.div(bbMilestone[player.bee.path][1]).mul(player.bb.breadTierMult).pow(0.2).add(1) // Pollen
        player.bb.breadEffects[2] = amt.div(bbMilestone[player.bee.path][2]).mul(player.bb.breadTierMult).pow(0.2).add(1).log(10).add(0.8).max(1).min(5) // Pollen Cooldown
        if (!hasUpgrade("al", 113) || player.bb.breadEffects[3].lt(1.5)) {
            player.bb.breadEffects[3] = amt.div(bbMilestone[player.bee.path][3]).mul(player.bb.breadTierMult).pow(0.1).add(1).log(10).mul(2).sub(0.5).max(0).min(1.5) // Glossary Effect Base
        } else {
            player.bb.breadEffects[3] = amt.div(bbMilestone[player.bee.path][3]).mul(player.bb.breadTierMult).pow(0.1).add(1).log(10).div(1.25).add(0.7).max(0) // Glossary Effect Base Without Cap
        }
        player.bb.breadEffects[4] = amt.div(bbMilestone[player.bee.path][4]).mul(player.bb.breadTierMult).pow(0.1).add(1).log(10).add(0.8).max(1) // Pollen Conversion Rate
        player.bb.breadEffects[5] = amt.div(bbMilestone[player.bee.path][5]).mul(player.bb.breadTierMult).pow(0.2).add(1).log(10).add(0.8).max(1) // Picking Power
        player.bb.breadEffects[6] = amt.div(bbMilestone[player.bee.path][6]).mul(player.bb.breadTierMult).pow(0.5).add(1).log(100).add(1).floor().min(5) // Pentagonal Pink Flowers
        player.bb.breadEffects[7] = amt.div(bbMilestone[player.bee.path][7]).mul(player.bb.breadTierMult).pow(0.1).add(1).log(10).add(0.7).max(1).min(2) // Pink Flower Growth
        player.bb.breadEffects[8] = amt.div(bbMilestone[player.bee.path][8]).mul(player.bb.breadTierMult).pow(0.3).add(1).log(10).add(0.7).max(1) // Nectar
        player.bb.breadEffects[9] = amt.div(bbMilestone[player.bee.path][8]).mul(player.bb.breadTierMult).add(1).log(10).div(50).sub(0.3).max(1).min(1.25) // Cell Base

        // Check for milestones
        let mile = 8
        if (hasUpgrade("al", 114)) mile = 9
        if (hasUpgrade("al", 122)) mile = 10
        for (let i = player.bb.breadMilestone; i < mile; i++) {
            if (player.bb.beeBread.gte(bbMilestone[player.bee.path][i])) {
                if (player.bb.breadMilestoneHighest < i+1) player.bb.breadMilestoneHighest = i+1
                player.bb.breadMilestone = i+1
            }
        }
    },
    prestigeReset() {
        player.bee.bees = new Decimal(1)

        player.bpl.pollen = new Decimal(0)
        player.bpl.pollenGain = new Decimal(0)
        player.bpl.roles.drone.amount = new Decimal(0)
        player.bpl.roles.worker.amount = new Decimal(0)
        player.bpl.roles.queen.amount = new Decimal(0)
        player.bpl.roles.empress.amount = new Decimal(0)
        player.bpl.upgrades.splice(0, player.bpl.upgrades.length)
        
        setTimeout(() => {
            player.bpl.pollen = new Decimal(0)
            player.bpl.pollenGain = new Decimal(0)
        }, 100)
    },
    clickables: {
        11: {
            title() { return "Increase Bee Bread/s<br>but reset previous content.<br>Gain: " + format(player.bb.beeBreadGain) + " BB/s"},
            canClick() { return (player.bee.path == 1 && player.bpl.pollen.gte(1e10)) || player.bpl.pollen.gte(1e40)},
            unlocked() { return true},
            onClick() {
                layers.bb.prestigeReset()
                player.bb.beeBreadPerSecond = player.bb.beeBreadPerSecond.add(player.bb.beeBreadGain)
            },
            style() {
                let look = { width: '250px', minHeight: '100px', border: "0", borderRadius: '0px'}
                if (this.canClick()) {look.background = "#5b422d"; look.color = "white"} else {look.background = "#bf8f8f"; look.color = "black"}
                return look
            },
        },
        12: {
            title() {
                if (hasUpgrade("al", 118)) return "Increase your Bee Bread tier.<br>Req: " + format(player.bb.breadTierReq) + " BB"
                return "Increase your Bee Bread tier<br>but reset previous content.<br>Req: " + format(player.bb.breadTierReq) + " BB"
            },
            canClick() { return player.bb.beeBread.gte(player.bb.breadTierReq)},
            unlocked() { return true },
            onClick() {
                if (!hasUpgrade("al", 118)) {
                    player.bb.beeBreadPerSecond = new Decimal(0)
                    player.bb.beeBread = new Decimal(0)
                    player.bb.breadMilestone = 0
                    layers.bb.prestigeReset()
                }
                player.bb.breadTier = player.bb.breadTier.add(1)
            },
            style() {
                let look = { width: '250px', minHeight: '100px', border: "0", borderRadius: '0px'}
                if (this.canClick()) {look.background = "#5b422d"; look.color = "white"} else {look.background = "#bf8f8f"; look.color = "black"}
                return look
            },
        },
    },
    bars: {
        bbBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 450,
            height: 35,
            progress() {
                if ((hasUpgrade("al", 114) && player.bb.breadMilestone >= 9) || (!hasUpgrade("al", 114) && player.bb.breadMilestone >= 8)) return new Decimal(0)
                return player.bb.beeBread.div(bbMilestone[player.bee.path][player.bb.breadMilestone])
            },
            borderStyle: {
                border: "0px solid #1e160f",
                borderRadius: "0px"
            },
            baseStyle: {
                backgroundColor: "#6a4d35"
            },
            fillStyle: {
                backgroundColor: "#886344"
            },
            textStyle: {
                color: "white",
                fontSize: "18px",
            },
            display() {
                if ((player.bb.breadMilestone < 8) || (hasUpgrade("al", 114) && player.bb.breadMilestone < 9) || (hasUpgrade("al", 122) && player.bb.breadMilestone < 10)) {
                    return format(player.bb.beeBread) + "/" + format(bbMilestone[player.bee.path][player.bb.breadMilestone]) + " Bee Bread (" + format(player.bb.beeBreadPerSecond) + "/s)"
                } else {
                    return format(player.bb.beeBread) + " Bee Bread (" + format(player.bb.beeBreadPerSecond) + "/s)"
                }
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return player.bee.bees.eq(1) ? "You have <h3>" + format(player.bee.bees) + "</h3> bee" : "You have <h3>" + format(player.bee.bees) + "</h3> bees"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.bee.bps) + "/s)" }, {color: "white", fontSize: "14px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.bpl.pollen) + "</h3> pollen"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return hasUpgrade("al", 112) ? "(+" + format(player.bpl.pollenGain) + "/s)" : "(+" + format(player.bpl.pollenGain) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["style-row", [["clickable", 11], ["style-row", [], {width: "3px", height: "100px", background: "#1e160f"}], ["clickable", 12]], {border: "3px solid #1e160f", backgroundColor: "#986F4C"}],
        ["style-row", [
            ["tooltip-row", [
                ["raw-html", () => {return "T" + formatWhole(player.bb.breadTier)}, {color: "#1e160f", fontSize: "20px", fontFamily: "monospace"}],
                ["raw-html", () => {return "<div class='bottomTooltip'>Tier " + formatWhole(player.bb.breadTier) + "<hr><small>x" + formatWhole(player.bb.breadTierMult) + " BB effectiveness</small></div>"}],
            ], { width: "50px", height: "35px", backgroundColor: "#ac8b6f", borderRight: "3px solid #1e160f", borderRadius: "0px" }],
            ["bar", "bbBar"],
        ], {borderLeft: "3px solid #1e160f",borderRight: "3px solid #1e160f"}],
        ["top-column", [
            ["blank", "10px"],
            ["color-text", [() => {return "Bee gain: x" + formatSimple(player.bb.breadEffects[0], 2)}, true, "white", () => {return player.bb.breadMilestone >= 1}, "gray"]],
            ["color-text", [() => {return "Pollen gain: x" + formatSimple(player.bb.breadEffects[1], 2)}, () => {return player.bb.breadMilestoneHighest >= 1}, "white", () => {return player.bb.breadMilestone >= 2}, "gray"]],
            ["color-text", [() => {return hasUpgrade("al", 112) ? "Pollen Per Second: x" + formatSimple(player.bb.breadEffects[2], 2) + " <small>[Cap x5]</small>" : "Pollen cooldown: /" + formatSimple(player.bb.breadEffects[2], 2) + " <small>[Cap /5]</small>"}, () => {return player.bb.breadMilestoneHighest >= 2}, "white", () => {return player.bb.breadMilestone >= 3}, "gray"]],
            ["color-text", [() => {
                if (hasUpgrade("al", 113)) { return "Glossary effect base: +" + commaFormat(player.bb.breadEffects[3], 2)}
                return "Glossary effect base: +" + commaFormat(player.bb.breadEffects[3], 2) + " <small>[Cap +1.5]</small>"
            }, () => {return player.bb.breadMilestoneHighest >= 3}, "white", () => {return player.bb.breadMilestone >= 4}, "gray"]],
            ["color-text", [() => {return "Pollen conversion rate: x" + formatSimple(player.bb.breadEffects[4], 2)}, () => {return player.bb.breadMilestoneHighest >= 4}, "white", () => {return player.bb.breadMilestone >= 5}, "gray"]],
            ["color-text", [() => {return "Picking Power: x" + formatSimple(player.bb.breadEffects[5], 2)}, () => {return player.bb.breadMilestoneHighest >= 5}, "white", () => {return player.bb.breadMilestone >= 6}, "gray"]],
            ["color-text", [() => {return "Unlock +" + formatWhole(player.bb.breadEffects[6]) + " pentagonal pink flowers <small>[Cap +5]</small>"}, () => {return player.bb.breadMilestoneHighest >= 6}, "white", () => {return player.bb.breadMilestone >= 7}, "gray"]],
            ["color-text", [() => {return "Pink Flower Growth Speed: /" + formatSimple(player.bb.breadEffects[7], 2) + " <small>[Cap /2]</small>"}, () => {return player.bb.breadMilestoneHighest >= 7}, "white", () => {return player.bb.breadMilestone >= 8}, "gray"]],
            ["color-text", [() => {return "Nectar: x" + formatSimple(player.bb.breadEffects[8], 2)}, () => {return player.bb.breadMilestoneHighest >= 8 && hasUpgrade("al", 114)}, "white", () => {return player.bb.breadMilestone >= 9}, "gray"]],
            ["color-text", [() => {return "Cell Effect Bases: x" + formatSimple(player.bb.breadEffects[9], 2) + " <small>[Cap x1.25]</small>"}, () => {return player.bb.breadMilestoneHighest >= 9 && hasUpgrade("al", 122)}, "white", () => {return player.bb.breadMilestone >= 10}, "gray"]],
        ], {height: "210px", border: "3px solid #1e160f", backgroundColor: "#3c2c1e"}],
    ],
    layerShown() { return player.startedGame && ((player.bee.totalResearch.gte(60) && player.bee.path == 1) || (player.bee.totalResearch.gte(170) && player.bee.path == 2))}
})
