const DOMAIN_TREE = [["tac", "tco"], ["tsp"]]
addNode("tac", {
    color: "#5b629a",
    symbol: "Ac",
    tooltip: "Accumulation",
    canClick: true,
    onClick() {
        player.subtabs["tad"]["Domain"] = "Accumulation"
    },
    layerShown() {return true},
})
addNode("tco", {
    color: "#094242",
    symbol: "Co",
    tooltip: "Compression",
    branches: [["tac", "#2d314d"]],
    canClick: true,
    onClick() {
        player.subtabs["tad"]["Domain"] = "Compression"
    },
    layerShown() {return hasUpgrade("tad", 125)},
})
addNode("tsp", {
    color: "#703be7",
    symbol: "Sp",
    tooltip: "Specialization",
    branches: [["tac", "#2d314d"], ["tco", "#2d314d"]],
    canClick: true,
    onClick() {
        player.subtabs["tad"]["Domain"] = "Specialization"
    },
    layerShown() {return false},
})
addLayer("tad", {
    name: "Tav's Domain", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h2>→", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U2",
    innerNodes: [["tac", "tco"], ["tsp"]],
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        // MATTER
        matter: new Decimal(1),
        matterBase: new Decimal(0),
        matterGain: new Decimal(0),
        domainCap: new Decimal(1e5),
        highestCap: new Decimal(1e5),

        // ACCUMULATION - ACCUMULATORS
        accumulationCost: new Decimal(1),
        accumulationScale: new Decimal(1.1),
        accumulationMax: false,

        // COMPRESSION - COMPRESSORS
        compression: new Decimal(0),
        compressionTotal: new Decimal(0),
        compressionReq: new Decimal(1e6),
        compressionGain: new Decimal(0),
        compressionKept: new Decimal(0),
        compressionMax: false,

        // SPECIALIZATION - SPECIALIZATIONS

        // INFINITUM
        infinitum: new Decimal(0),
        infinitumGain: new Decimal(1),
        infinitumResets: new Decimal(0),
        infinitumEffect: new Decimal(1),

        // ALTERNATE INFINITIES
        altSelection: "none",
        altInfinities: {
            broken: {
                amount: new Decimal(0),
                cost1: new Decimal(100),
                cost2: new Decimal(10),
                gain: new Decimal(0),
                effect1: new Decimal(1),
                effect2: new Decimal(1),
            },
            shattered: {
                amount: new Decimal(0),
                cost1: new Decimal(100),
                cost2: new Decimal(10),
                gain: new Decimal(0),
                effect1: new Decimal(1),
                effect2: new Decimal(1),
            },
            fragmented: {
                amount: new Decimal(0),
                cost1: new Decimal(100),
                cost2: new Decimal(10),
                gain: new Decimal(0),
                effect1: new Decimal(1),
                effect2: new Decimal(1),
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(150deg, #b2d8d8, 50%, #094242 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#b2d8d8",
            color: "#b2d8d8",
        }
    },
    tooltip: "Tav's Domain",
    color: "#5b629a",
    branches: ["ta"],
    update(delta) {
        let onepersec = new Decimal(1)

        // MATTER MODIFIERS
        player.tad.matterBase = buyableEffect("tad", 11)[0]
        player.tad.matterBase = player.tad.matterBase.add(buyableEffect("tad", 12)[0])
        player.tad.matterBase = player.tad.matterBase.add(buyableEffect("tad", 21))
        player.tad.matterBase = player.tad.matterBase.add(buyableEffect("tad", 22))
        player.tad.matterBase = player.tad.matterBase.add(buyableEffect("tad", 13)[0])
        player.tad.matterBase = player.tad.matterBase.add(buyableEffect("tad", 23))
        player.tad.matterBase = player.tad.matterBase.add(buyableEffect("tad", 31))
        player.tad.matterBase = player.tad.matterBase.add(buyableEffect("tad", 32))
        player.tad.matterBase = player.tad.matterBase.add(buyableEffect("tad", 33))

        player.tad.matterGain = player.tad.matterBase
        if (hasUpgrade("tad", 111)) player.tad.matterGain = player.tad.matterGain.mul(2)
        if (hasUpgrade("tad", 113)) player.tad.matterGain = player.tad.matterGain.mul(buyableEffect("tad", 11)[1])
        if (hasUpgrade("tad", 123)) player.tad.matterGain = player.tad.matterGain.mul(buyableEffect("tad", 12)[1])
        if (hasUpgrade("tad", 133)) player.tad.matterGain = player.tad.matterGain.mul(buyableEffect("tad", 13)[1])
        if (hasUpgrade("tad", 121)) player.tad.matterGain = player.tad.matterGain.mul(player.tad.infinitumEffect)
        player.tad.matterGain = player.tad.matterGain.mul(buyableEffect("tad", 101))
        if (hasUpgrade("tad", 133)) player.tad.matterGain = player.tad.matterGain.mul(1.5) // TEMP UNTIL ACHIEVEMENTS
        if (player.tad.altInfinities.broken.amount.gte(1)) player.tad.matterGain = player.tad.matterGain.mul(player.tad.altInfinities.broken.effect1)
        player.tad.matterGain = player.tad.matterGain.mul(buyableEffect("p", 16))
        player.tad.matterGain = player.tad.matterGain.mul(levelableEffect("pet", 209)[1])


        // MATTER PER SECOND
        if (player.tad.matter.gte(player.tad.domainCap)) player.tad.matterGain = new Decimal(0)
        if (player.tad.matter.lt(player.tad.domainCap)) player.tad.matter = player.tad.matter.add(player.tad.matterGain.mul(delta)).min(player.tad.domainCap)

        // ACCUMULATION COST MODIFIERS
        player.tad.accumulationCost = new Decimal(1)
        if (hasUpgrade("tad", 112)) player.tad.accumulationCost = player.tad.accumulationCost.mul(1.5)
        if (hasUpgrade("tad", 124)) player.tad.accumulationCost = player.tad.accumulationCost.mul(1.25)
        player.tad.accumulationCost = player.tad.accumulationCost.mul(buyableEffect("tad", 102))
        if (player.tad.altInfinities.shattered.amount.gte(1)) player.tad.accumulationCost = player.tad.accumulationCost.mul(player.tad.altInfinities.shattered.effect1)

        // ACCUMULATION SCALE MODIFIERS
        player.tad.accumulationScale = new Decimal(0.1)
        if (hasUpgrade("tad", 114)) player.tad.accumulationScale = player.tad.accumulationScale.mul(1.5)
        player.tad.accumulationScale = player.tad.accumulationScale.mul(buyableEffect("tad", 103))

        // ACCUMULATION SCALE FINALE
        player.tad.accumulationScale = player.tad.accumulationScale.add(1)

        // COMPRESSION MODIFIERS
        let compressionDiv = new Decimal(1)
        if (hasUpgrade("tad", 132)) compressionDiv = compressionDiv.mul(upgradeEffect("tad", 132))
        if (player.tad.altInfinities.fragmented.amount.gte(1)) compressionDiv = compressionDiv.mul(player.tad.altInfinities.fragmented.effect1)

        player.tad.compressionReq = Decimal.pow(10, player.tad.compressionTotal).mul(1e6).div(Decimal.pow(10, player.tad.compressionKept)).div(compressionDiv)
        player.tad.compressionGain = player.tad.matter.add(1).div(1e6).mul(compressionDiv).mul(Decimal.pow(10, player.tad.compressionKept)).ln().div(new Decimal(10).ln()).add(1).sub(player.tad.compressionTotal).floor()
        if (player.tad.compressionGain.lt(1)) player.tad.compressionGain = new Decimal(0)

        player.tad.compressionKept = new Decimal(0)
        if (hasUpgrade("tad", 131)) player.tad.compressionKept = player.tad.compressionKept.add(1)

        // COLLAPSE CODE
        if (player.tad.matter.gte(player.tad.domainCap)) {
            player.subtabs["tad"]["Domain"] = "Collapse"
        }

        // INFINITUM MODIFIERS
        player.tad.infinitumGain = Decimal.pow(2, player.tad.domainCap.div(99999).log(10))
        player.tad.infinitumGain = player.tad.infinitumGain.mul(buyableEffect("tad", 104))
        if (player.tad.altInfinities.fragmented.amount.gte(10)) player.tad.infinitumGain = player.tad.infinitumGain.mul(player.tad.altInfinities.fragmented.effect2)
        player.tad.infinitumGain = player.tad.infinitumGain.mul(buyableEffect("om", 12))
        player.tad.infinitumGain = player.tad.infinitumGain.mul(buyableEffect("p", 18))
        player.tad.infinitumGain = player.tad.infinitumGain.mul(levelableEffect("pet", 1101)[1])

        // FLOOR INFINTUM GAIN
        player.tad.infinitumGain = player.tad.infinitumGain.floor()

        // INFINITUM EFFECT
        player.tad.infinitumEffect = player.tad.infinitum.add(1).pow(0.3).add(0.5)

        // ALTERNATE INFINITIES COST
        if (player.in.infinities.div(10).lt(player.tad.infinitum)) {
            player.tad.altInfinities.broken.cost1 = player.in.infinities.div(10).max(10)
            player.tad.altInfinities.broken.cost2 = player.tad.altInfinities.broken.cost1.div(10).max(1)

            player.tad.altInfinities.shattered.cost1 = player.in.infinities.div(10).max(10)
            player.tad.altInfinities.shattered.cost2 = player.tad.altInfinities.shattered.cost1.div(10).max(1)

            player.tad.altInfinities.fragmented.cost1 = player.in.infinities.div(10).max(10)
            player.tad.altInfinities.fragmented.cost2 = player.tad.altInfinities.fragmented.cost1.div(10).max(1)
        } else {
            player.tad.altInfinities.broken.cost2 = player.tad.infinitum.div(10).max(1)
            player.tad.altInfinities.broken.cost1 = player.tad.altInfinities.broken.cost2.mul(10).max(10)

            player.tad.altInfinities.shattered.cost2 = player.tad.infinitum.div(10).max(1)
            player.tad.altInfinities.shattered.cost1 = player.tad.altInfinities.shattered.cost2.mul(10).max(10)

            player.tad.altInfinities.fragmented.cost2 = player.tad.infinitum.div(10).max(1)
            player.tad.altInfinities.fragmented.cost1 = player.tad.altInfinities.fragmented.cost2.mul(10).max(10)
        }

        // ALTERNATE INFINITIES GAIN
        let t1Mult = new Decimal(1)
        if (player.tad.altInfinities.broken.amount.gte(10)) t1Mult = t1Mult.mul(player.tad.altInfinities.broken.effect2)
        t1Mult = t1Mult.mul(buyableEffect("om", 13))
        t1Mult = t1Mult.mul(levelableEffect("pet", 208)[2])
        t1Mult = t1Mult.mul(levelableEffect("pet", 1101)[2])

        player.tad.altInfinities.broken.gain = player.tad.altInfinities.broken.cost1.div(100).mul(t1Mult)
        player.tad.altInfinities.shattered.gain = player.tad.altInfinities.shattered.cost1.div(100).mul(t1Mult)
        player.tad.altInfinities.fragmented.gain = player.tad.altInfinities.fragmented.cost1.div(100).mul(t1Mult)

        // ALTERNATE INFINITIES SELECTION
        switch (player.tad.altSelection) {
            case "none":
                break;
            case "broken": case "shattered": case "fragmented":
                if (player.in.infinities.gte(player.tad.altInfinities[player.tad.altSelection].cost1.mul(delta)) && player.tad.infinitum.gte(player.tad.altInfinities[player.tad.altSelection].cost2.mul(delta))) {
                    player.in.infinities = player.in.infinities.sub(player.tad.altInfinities[player.tad.altSelection].cost1.mul(delta)).max(0)
                    player.tad.infinitum = player.tad.infinitum.sub(player.tad.altInfinities[player.tad.altSelection].cost2.mul(delta)).max(0)
                    if (player.in.infinities.lt(1)) player.in.infinities = new Decimal(0)
                    if (player.tad.infinitum.lt(0.1)) player.tad.infinitum = new Decimal(0)
                    player.tad.altInfinities[player.tad.altSelection].amount = player.tad.altInfinities[player.tad.altSelection].amount.add(player.tad.altInfinities[player.tad.altSelection].gain.mul(delta))
                }
                break;
        }

        // ALTERNATE INFINITIES EFFECTS
        player.tad.altInfinities.broken.effect1 = player.tad.altInfinities.broken.amount.pow(0.3).add(1)
        player.tad.altInfinities.broken.effect2 = player.tad.altInfinities.broken.amount.add(1).log(10).div(4).add(1)

        player.tad.altInfinities.shattered.effect1 = player.tad.altInfinities.shattered.amount.max(1).mul(10).log(10).div(10).add(1)
        player.tad.altInfinities.shattered.effect2 = player.tad.altInfinities.shattered.amount.div(2).pow(0.2).max(1)

        player.tad.altInfinities.fragmented.effect1 = player.tad.altInfinities.fragmented.amount.pow(0.3).add(1)
        player.tad.altInfinities.fragmented.effect2 = player.tad.altInfinities.fragmented.amount.div(2).pow(0.2).max(1)
    },
    clickables: {
        1: {
            title: "<h2>Return",
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["tad"]["Domain"] = "Tree"
            },
            style: {width: "100px", minHeight: "50px", background: "#5E8D8D", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px"},
        },
        2: {
            title: "<h2>DOMAIN COLLAPSE",
            canClick: true,
            unlocked: true,
            onClick() {
                player.tad.infinitum = player.tad.infinitum.add(player.tad.infinitumGain)
                player.tad.infinitumResets = player.tad.infinitumResets.add(1)
                if (player.tad.domainCap.gte(player.tad.highestCap)) player.tad.highestCap = player.tad.domainCap
                player.subtabs["tad"]["Domain"] = "Tree"
                player.subtabs["tad"]["Tabs"] = "Infinitum"

                layers.tad.domainReset(10)
            },
            style: {width: "300px", minHeight: "120px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px"},
        },
        3: {
            title: "/10",
            canClick() {return player.tad.domainCap.div(10).gte(1e5)},
            unlocked: true,
            tooltip() {return !this.canClick() ? "Cap can't go below 1e5" : ""},
            onClick() {
                player.tad.domainCap = player.tad.domainCap.div(10).floor()
                layers.tad.domainReset(10)
            },
            style() {
                let look = {width: "60px", minHeight: "50px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", borderWidth: "0", borderRadius: "0"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        4: {
            title: "/1e5",
            canClick() {return player.tad.domainCap.div(1e5).gte(1e5)},
            unlocked: true,
            tooltip() {return !this.canClick() ? "Cap can't go below 1e5" : ""},
            onClick() {
                player.tad.domainCap = player.tad.domainCap.div(1e5).floor()
                layers.tad.domainReset(10)
            },
            style() {
                let look = {width: "60px", minHeight: "50px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", borderWidth: "0", borderRadius: "0"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        5: {
            title: "/1e25",
            canClick() {return player.tad.domainCap.div(1e25).gte(1e5)},
            unlocked: true,
            tooltip() {return !this.canClick() ? "Cap can't go below 1e5" : ""},
            onClick() {
                player.tad.domainCap = player.tad.domainCap.div(1e25).floor()
                layers.tad.domainReset(10)
            },
            style() {
                let look = {width: "60px", minHeight: "50px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", borderWidth: "0", borderRadius: "0"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        6: {
            title: "x10",
            canClick() {return player.tad.highestCap.mul(10).gte(player.tad.domainCap.mul(10))},
            unlocked: true,
            tooltip() {return !this.canClick() ? "Need to beat " + formatWhole(player.tad.highestCap.mul(10)) + " cap first!" : ""},
            onClick() {
                player.tad.domainCap = player.tad.domainCap.mul(10).floor()
                layers.tad.domainReset(10)
            },
            style() {
                let look = {width: "60px", minHeight: "50px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", borderWidth: "0", borderRadius: "0"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        7: {
            title: "x1e5",
            canClick() {return player.tad.highestCap.mul(10).gte(player.tad.domainCap.mul(1e5))},
            unlocked: true,
            tooltip() {return !this.canClick() ? "Need to beat " + formatWhole(player.tad.highestCap.mul(10)) + " cap first!" : ""},
            onClick() {
                player.tad.domainCap = player.tad.domainCap.mul(1e5).floor()
                layers.tad.domainReset(10)
            },
            style() {
                let look = {width: "60px", minHeight: "50px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", borderWidth: "0", borderRadius: "0"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        8: {
            title: "x1e25",
            canClick() {return player.tad.highestCap.mul(10).gte(player.tad.domainCap.mul(1e25))},
            unlocked: true,
            tooltip() {return !this.canClick() ? "Need to beat " + formatWhole(player.tad.highestCap.mul(10)) + " cap first!" : ""},
            onClick() {
                player.tad.domainCap = player.tad.domainCap.mul(1e25).floor()
                layers.tad.domainReset(10)
            },
            style() {
                let look = {width: "60px", minHeight: "50px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", borderWidth: "0", borderRadius: "0"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        9: {
            title: "Reset cap<br>to 1e5",
            canClick() {return player.tad.domainCap.gt(1e5)},
            unlocked: true,
            onClick() {
                player.tad.domainCap = new Decimal(1e5)
                layers.tad.domainReset(10)
            },
            style() {
                let look = {width: "122px", minHeight: "50px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", borderWidth: "0", borderRadius: "0"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#484a7d" : look.backgroundColor = "#0e0e19"
                return look
            },
        },
        11: {
            title() {
                return "<h2>Compress, but reset matter and accumulation.</h2><br><h3>Req: " + format(player.tad.compressionReq) + " Matter</h3>"
            },
            canClick() { return player.tad.compressionGain.gte(1)},
            unlocked: true,
            onClick() {
                player.tad.compression = player.tad.compression.add(player.tad.compressionGain)
                player.tad.compressionTotal = player.tad.compressionTotal.add(player.tad.compressionGain)
                // RESET
                layers.tad.domainReset(2)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px"}
                if (this.canClick()) {look.color = "white";look.background = "#094242"} else {look.color = "black";look.background = "#bf8f8f"}
                return look
            },
        },
        12: {
            title() { return "Respec your compressors<br><small style='font-size:11px'>(Does a compress reset)</small>"},
            canClick() { return player.tad.compressionTotal.gt(player.tad.compression)},
            unlocked: true,
            onClick() {
                player.tad.compression = player.tad.compressionTotal
                for (let i = 101; i < 105; i++) {
                    player.tad.buyables[i] = new Decimal(0)
                }

                // RESET
                layers.tad.domainReset(2)
            },
            style() {
                let look = {width: "250px", minHeight: "40px", lineHeight: "0.9", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px"}
                if (this.canClick()) {look.color = "white";look.background = "#094242"} else {look.color = "black";look.background = "#bf8f8f"}
                return look
            },
        },
        21: {
            title: "Buy Max On",
            canClick() {return !player.tad.accumulationMax},
            unlocked: true,
            onClick() {
                player.tad.accumulationMax = true
            },
            style: {width: "80px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "10px 0 0 10px"},
        },
        22: {
            title: "Buy Max Off",
            canClick() {return player.tad.accumulationMax},
            unlocked: true,
            onClick() {
                player.tad.accumulationMax = false
            },
            style: {width: "80px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0 10px 10px 0"}
        },
        23: {
            title: "Buy Max On",
            canClick() {return !player.tad.compressionMax},
            unlocked: true,
            onClick() {
                player.tad.compressionMax = true
            },
            style() {
                let look = {width: "80px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "10px 0 0 10px"}
                if (this.canClick()) {look.color = "white";look.background = "#094242"} else {look.color = "black";look.background = "#bf8f8f"}
                return look
            },
        },
        24: {
            title: "Buy Max Off",
            canClick() {return player.tad.compressionMax},
            unlocked: true,
            onClick() {
                player.tad.compressionMax = false
            },
            style() {
                let look = {width: "80px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0 10px 10px 0"}
                if (this.canClick()) {look.color = "white";look.background = "#094242"} else {look.color = "black";look.background = "#bf8f8f"}
                return look
            },
        },
        101: {
            title() {
                if (player.tad.altSelection == "broken") return "Stop converting " + formatSimple(player.tad.altInfinities.broken.cost1, 1) + " infinities and " + formatSimple(player.tad.altInfinities.broken.cost2, 1) + " infinitums into " + formatSimple(player.tad.altInfinities.broken.gain, 1) + " broken infinities."
                return "Convert " + formatSimple(player.tad.altInfinities.broken.cost1, 1) + " infinities and " + formatSimple(player.tad.altInfinities.broken.cost2, 1) + " infinitums into " + formatSimple(player.tad.altInfinities.broken.gain, 1) + " broken infinities."
            },
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.tad.altSelection == "broken") {
                    player.tad.altSelection = "none"
                } else {
                    player.tad.altSelection = "broken"
                }
            },
            style() {
                let look = {width: "240px", minHeight: "70px", fontSize: "9px", lineHeight: "0.9", border: "3px solid rgba(0,0,0,0.3", borderRadius: "15px"}
                if (player.tad.altSelection == "broken") {look.background = "#444808";look.color = "#ccc"} else {look.background = "#7a820e";look.color = "black"}
                return look
            },
        },
        102: {
            title() {
                if (player.tad.altSelection == "shattered") return "Stop converting " + formatSimple(player.tad.altInfinities.shattered.cost1, 1) + " infinities and " + formatSimple(player.tad.altInfinities.shattered.cost2, 1) + " infinitums into " + formatSimple(player.tad.altInfinities.shattered.gain, 1) + " shattered infinities."
                return "Convert " + formatSimple(player.tad.altInfinities.shattered.cost1, 1) + " infinities and " + formatSimple(player.tad.altInfinities.shattered.cost2, 1) + " infinitums into " + formatSimple(player.tad.altInfinities.shattered.gain, 1) + " shattered infinities."
            },
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.tad.altSelection == "shattered") {
                    player.tad.altSelection = "none"
                } else {
                    player.tad.altSelection = "shattered"
                }
            },
            style() {
                let look = {width: "240px", minHeight: "70px", fontSize: "9px", lineHeight: "0.9", border: "3px solid rgba(0,0,0,0.3", borderRadius: "15px"}
                if (player.tad.altSelection == "shattered") {look.background = "#395009";look.color = "#ccc"} else {look.background = "#679010";look.color = "black"}
                return look
            },
        },
        103: {
            title() {
                if (player.tad.altSelection == "fragmented") return "Stop converting " + formatSimple(player.tad.altInfinities.fragmented.cost1, 1) + " infinities and " + formatSimple(player.tad.altInfinities.fragmented.cost2, 1) + " infinitums into " + formatSimple(player.tad.altInfinities.fragmented.gain, 1) + " fragmented infinities."
                return "Convert " + formatSimple(player.tad.altInfinities.fragmented.cost1, 1) + " infinities and " + formatSimple(player.tad.altInfinities.fragmented.cost2, 1) + " infinitums into " + formatSimple(player.tad.altInfinities.fragmented.gain, 1) + " fragmented infinities."
            },
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.tad.altSelection == "fragmented") {
                    player.tad.altSelection = "none"
                } else {
                    player.tad.altSelection = "fragmented"
                }
            },
            style() {
                let look = {width: "240px", minHeight: "70px", fontSize: "9px", lineHeight: "0.9", border: "3px solid rgba(0,0,0,0.3", borderRadius: "15px"}
                if (player.tad.altSelection == "fragmented") {look.background = "#153f05";look.color = "#ccc"} else {look.background = "#267209";look.color = "black"}
                return look
            },
        },
        201: {
            title: "KILL TAV AND BREAK INFINITY<br>Req: 250 of each T1 Alt-Infinity",
            canClick() {
                return !player.in.unlockedBreak && player.tad.altInfinities.broken.amount.gte(250) && player.tad.altInfinities.shattered.amount.gte(250) && player.tad.altInfinities.fragmented.amount.gte(250)
            },
            unlocked: true,
            onClick() {
                player.in.unlockedBreak = true
                player.tab = "po"
                player.subtabs["po"]["stuff"] = "Otherworldly Features"
            },
            style() {
                let look = {width: "300px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.3", borderRadius: "15px"}
                if (player.in.unlockedBreak) {look.background = "#77bf5f";look.cursor = "default"}
                return look
            },
        },
    },
    upgrades: {
        111: {
            title: "Infinitum (1:1)",
            unlocked: true,
            description() {return "Double matter gain."},
            cost: new Decimal(1),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        112: {
            title: "Infinitum (1:2)",
            unlocked: true,
            description() {return "Decrease accumulator cost scaling by 33%."},
            cost: new Decimal(1),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        113: {
            title: "Infinitum (1:3)",
            unlocked: true,
            description() {return "Unlock 2nd effect for Accumulator (1:1)."},
            cost: new Decimal(2),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        114: {
            title: "Infinitum (1:4)",
            unlocked: true,
            description() {return "Increase accumulator effect scaling by 50%."},
            cost: new Decimal(2),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        115: {
            title: "Infinitum (1:5)",
            unlocked: true,
            description() {return "Unlock Domain Expander."},
            cost: new Decimal(4),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        121: {
            title: "Infinitum (2:1)",
            unlocked() {return hasUpgrade("tad", 115)},
            description() {return "Unlock an infinitum effect that boosts matter gain."},
            cost: new Decimal(4),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        122: {
            title: "Infinitum (2:2)",
            unlocked() {return hasUpgrade("tad", 115)},
            description() {return "Unlock another column of accumulators."},
            cost: new Decimal(4),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        123: {
            title: "Infinitum (2:3)",
            unlocked() {return hasUpgrade("tad", 115)},
            description() {return "Unlock 2nd effect for Accumulator (1:2)."},
            cost: new Decimal(8),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        124: {
            title: "Infinitum (2:4)",
            unlocked() {return hasUpgrade("tad", 115)},
            description() {return "Decrease accumulator cost scaling by 20%."},
            cost: new Decimal(8),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        125: {
            title: "Infinitum (2:5)",
            unlocked() {return hasUpgrade("tad", 115)},
            description() {return "Unlock Compression Layer."},
            cost: new Decimal(16),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        131: {
            title: "Infinitum (3:1)",
            unlocked() {return hasUpgrade("tad", 125)},
            description() {return "Start with one compression."},
            onPurchase() {
                player.tad.compression = player.tad.compression.add(1);
                player.tad.compressionTotal = player.tad.compressionTotal.add(1);
            },
            cost: new Decimal(16),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        132: {
            title: "Infinitum (3:2)",
            unlocked() {return hasUpgrade("tad", 125)},
            description() {return "Total accumulators decrease compression cost."},
            cost: new Decimal(16),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            effect() {
                let total = new Decimal(0)
                for (let i = 11; i < 34; ) {
                    total = total.add(player.tad.buyables[i])
                    if (i % 10 == 3) {i = i+8} else {i++}
                }
                return total.div(50).add(1).pow(1.5)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        133: {
            title: "Infinitum (3:3)",
            unlocked() {return hasUpgrade("tad", 125)},
            description() {return "Unlock 2nd effect for Accumulator (1:3)."},
            tooltip: "Also gives +50% matter until I make the achievement.",
            cost: new Decimal(32),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        134: {
            title: "Infinitum (3:4)",
            unlocked() {return hasUpgrade("tad", 125)},
            description() {return "Unlock another row of accumulators."},
            cost: new Decimal(32),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
        135: {
            title: "Infinitum (3:5)",
            unlocked() {return hasUpgrade("tad", 125)},
            description() {return "Unlock alternative infinities."},
            cost: new Decimal(64),
            currencyLocation() { return player.tad },
            currencyDisplayName: "Infinitum",
            currencyInternalName: "infinitum",
            style() {
                let look = {width: "130px", minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9194FA"
                return look
            },
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(3).div(player.tad.accumulationCost).max(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tad.matter},
            pay(amt) { player.tad.matter = this.currency().sub(amt) },
            effect(x) {
                return [
                    getBuyableAmount(this.layer, this.id).mul(Decimal.pow(player.tad.accumulationScale, getBuyableAmount(this.layer, this.id))),
                    getBuyableAmount(this.layer, this.id).div(25).add(1)
                ]
            },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                if (hasUpgrade("tad", 113)) {
                    return "<h3>Accumulator [1:1]\n\
                        (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                        Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect[0], 1) + ".\n\
                        Multiplies matter gain by x" + formatSimple(tmp[this.layer].buyables[this.id].effect[1], 2) + ".\n\
                        Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
                }
                return "<h3>Accumulator [1:1]\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                    Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect[0], 1) + ".\n\
                    Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
            },
            buy() {
                if (!player.tad.accumulationMax) {
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
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : this.canAfford() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        12: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(4).div(player.tad.accumulationCost).max(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tad.matter},
            pay(amt) { player.tad.matter = this.currency().sub(amt) },
            effect(x) {
                return [
                    getBuyableAmount(this.layer, this.id).mul(4).mul(Decimal.pow(player.tad.accumulationScale, getBuyableAmount(this.layer, this.id))),
                    getBuyableAmount(this.layer, this.id).div(25).add(1)
                ]
            },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                if (hasUpgrade("tad", 123)) {
                    return "<h3>Accumulator [1:2]\n\
                        (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                        Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect[0], 1) + ".\n\
                        Multiplies matter gain by x" + formatSimple(tmp[this.layer].buyables[this.id].effect[1], 2) + ".\n\
                        Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
                }
                return "<h3>Accumulator [1:2]\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                    Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect[0], 1) + ".\n\
                    Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
            },
            buy() {
                if (!player.tad.accumulationMax) {
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
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : this.canAfford() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        13: {
            costBase() { return new Decimal(150000) },
            costGrowth() { return new Decimal(7).div(player.tad.accumulationCost).max(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tad.matter},
            pay(amt) { player.tad.matter = this.currency().sub(amt) },
            effect(x) {
                return [
                    getBuyableAmount(this.layer, this.id).mul(400).mul(Decimal.pow(player.tad.accumulationScale, getBuyableAmount(this.layer, this.id))),
                    getBuyableAmount(this.layer, this.id).div(25).add(1)
                ]
            },
            unlocked() {return hasUpgrade("tad", 122)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                if (hasUpgrade("tad", 133)) {
                    return "<h3>Accumulator [1:3]\n\
                        (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                        Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect[0], 1) + ".\n\
                        Multiplies matter gain by x" + formatSimple(tmp[this.layer].buyables[this.id].effect[1], 2) + ".\n\
                        Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
                }
                return "<h3>Accumulator [1:3]\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                    Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect[0], 1) + ".\n\
                    Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
            },
            buy() {
                if (!player.tad.accumulationMax) {
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
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : this.canAfford() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        21: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(5).div(player.tad.accumulationCost).max(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tad.matter},
            pay(amt) { player.tad.matter = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(20).mul(Decimal.pow(player.tad.accumulationScale, getBuyableAmount(this.layer, this.id)))
            },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Accumulator [2:1]\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                    Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\
                    Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
            },
            buy() {
                if (!player.tad.accumulationMax) {
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
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : this.canAfford() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        22: {
            costBase() { return new Decimal(8000) },
            costGrowth() { return new Decimal(6).div(player.tad.accumulationCost).max(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tad.matter},
            pay(amt) { player.tad.matter = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(80).mul(Decimal.pow(player.tad.accumulationScale, getBuyableAmount(this.layer, this.id)))
            },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Accumulator [2:2]\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                    Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\
                    Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
            },
            buy() {
                if (!player.tad.accumulationMax) {
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
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : this.canAfford() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        23: {
            costBase() { return new Decimal(4000000) },
            costGrowth() { return new Decimal(8).div(player.tad.accumulationCost).max(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tad.matter},
            pay(amt) { player.tad.matter = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(2000).mul(Decimal.pow(player.tad.accumulationScale, getBuyableAmount(this.layer, this.id)))
            },
            unlocked() {return hasUpgrade("tad", 122)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Accumulator [2:3]\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                    Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\
                    Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
            },
            buy() {
                if (!player.tad.accumulationMax) {
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
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : this.canAfford() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        31: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(10).div(player.tad.accumulationCost).max(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tad.matter},
            pay(amt) { player.tad.matter = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(12000).mul(Decimal.pow(player.tad.accumulationScale, getBuyableAmount(this.layer, this.id)))
            },
            unlocked() {return hasUpgrade("tad", 134)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Accumulator [3:1]\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                    Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\
                    Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
            },
            buy() {
                if (!player.tad.accumulationMax) {
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
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : this.canAfford() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        32: {
            costBase() { return new Decimal(4e9) },
            costGrowth() { return new Decimal(12).div(player.tad.accumulationCost).max(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tad.matter},
            pay(amt) { player.tad.matter = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(60000).mul(Decimal.pow(player.tad.accumulationScale, getBuyableAmount(this.layer, this.id)))
            },
            unlocked() {return hasUpgrade("tad", 134)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Accumulator [3:2]\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                    Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\
                    Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
            },
            buy() {
                if (!player.tad.accumulationMax) {
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
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : this.canAfford() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        33: {
            costBase() { return new Decimal(2e11) },
            costGrowth() { return new Decimal(14).div(player.tad.accumulationCost).max(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tad.matter},
            pay(amt) { player.tad.matter = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(400000).mul(Decimal.pow(player.tad.accumulationScale, getBuyableAmount(this.layer, this.id)))
            },
            unlocked() {return hasUpgrade("tad", 134)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Accumulator [3:3]\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)</h3>\n\
                    Increases base matter gain by +" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\
                    Cost: " + formatSimple(tmp[this.layer].buyables[this.id].cost, 1) + " Matter"
            },
            buy() {
                if (!player.tad.accumulationMax) {
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
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : this.canAfford() ? look.backgroundColor = "#5b629a" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        101: {
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tad.compression},
            pay(amt) { player.tad.compression = this.currency().sub(amt) },
            effect(x) {
                return Decimal.pow(2, getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).add(1) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Matter Compressor</h3><br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    x" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " Matter Gain<br>\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Compression"
            },
            buy() {
                if (!player.tad.compressionMax) {
                    let buyonecost = getBuyableAmount(this.layer, this.id).add(1)
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    Decimal.affordArithmeticSeries(this.currency(), 1, 1, getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumArithmeticSeries(max, 1, 1, getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {look.color = "black";look.background = "#77bf5f"} else if (this.canAfford()) {look.color = "white";look.background = "#094242"} else {look.color = "black";look.background = "#bf8f8f"}
                return look
            },
        },
        102: {
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tad.compression},
            pay(amt) { player.tad.compression = this.currency().sub(amt) },
            effect(x) {
                return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).add(1) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Accumu-Cost Compressor</h3><br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    /" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + " Accumulation Cost Scaling<br>\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Compression"
            },
            buy() {
                if (!player.tad.compressionMax) {
                    let buyonecost = getBuyableAmount(this.layer, this.id).add(1)
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    Decimal.affordArithmeticSeries(this.currency(), 1, 1, getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumArithmeticSeries(max, 1, 1, getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {look.color = "black";look.background = "#77bf5f"} else if (this.canAfford()) {look.color = "white";look.background = "#094242"} else {look.color = "black";look.background = "#bf8f8f"}
                return look
            },
        },
        103: {
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tad.compression},
            pay(amt) { player.tad.compression = this.currency().sub(amt) },
            effect(x) {
                return Decimal.pow(1.05, getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).add(1) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Accumu-Effect Compressor</h3><br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + " Accumulation Effect Scaling<br>\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Compression"
            },
            buy() {
                if (!player.tad.compressionMax) {
                    let buyonecost = getBuyableAmount(this.layer, this.id).add(1)
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    Decimal.affordArithmeticSeries(this.currency(), 1, 1, getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumArithmeticSeries(max, 1, 1, getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {look.color = "black";look.background = "#77bf5f"} else if (this.canAfford()) {look.color = "white";look.background = "#094242"} else {look.color = "black";look.background = "#bf8f8f"}
                return look
            },
        },
        104: {
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tad.compression},
            pay(amt) { player.tad.compression = this.currency().sub(amt) },
            effect(x) {
                return Decimal.pow(1.2, getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).add(1) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Infinitum Compressor</h3><br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + " Infinitum Gain<br>\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Compression"
            },
            buy() {
                if (!player.tad.compressionMax) {
                    let buyonecost = getBuyableAmount(this.layer, this.id).add(1)
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    Decimal.affordArithmeticSeries(this.currency(), 1, 1, getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumArithmeticSeries(max, 1, 1, getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {width: "150px", height: "100px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {look.color = "black";look.background = "#77bf5f"} else if (this.canAfford()) {look.color = "white";look.background = "#094242"} else {look.color = "black";look.background = "#bf8f8f"}
                return look
            },
        },
    },
    domainReset(tier = 0) {
        // MATTER
        if (tier > 0) {
            player.tad.matter = new Decimal(1)
            player.tad.matterGain = new Decimal(0)
        }

        // ACCUMULATORS
        if (tier > 1) {
            for (let i = 11; i < 34; ) {
                player.tad.buyables[i] = new Decimal(0)
                if (i % 10 == 3) {i = i+8} else {i++}
            }
        }

        // COMPRESSIONS
        if (tier > 2) {
            player.tad.compression = player.tad.compressionKept
            player.tad.compressionTotal = player.tad.compressionKept
            player.tad.compressionGain = new Decimal(0)

            for (let i = 101; i < 105; i++) {
                player.tad.buyables[i] = new Decimal(0)
            }
        }
    },
    microtabs: {
        Tabs: {
            "Domain": {
                buttonStyle() { return { color: "black", borderColor: "#7c9797", borderRadius: "5px" }},
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["buttonless-microtabs", "Domain", { 'border-width': '0px' }],
                ]
            },
            "Infinitum": {
                buttonStyle() { return { color: "black", borderColor: "#9194FA", borderRadius: "5px" }},
                unlocked() { return player.tad.infinitumResets.gt(0) },
                content: [
                    ["blank", "15px"],
                    ["row", [
                        ["raw-html", () => {return "You have " + formatSimple(player.tad.infinitum, 1) + " infinitum"}, {color: "black", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.tad.infinitumGain.gt(1) ? "(+" + formatWhole(player.tad.infinitumGain) + ")" : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return hasUpgrade("tad", 121) ? "Boosts matter gain by x" + formatSimple(player.tad.infinitumEffect) : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["upgrade", 111], ["upgrade", 112], ["upgrade", 113], ["upgrade", 114], ["upgrade", 115]]],
                    ["row", [["upgrade", 121], ["upgrade", 122], ["upgrade", 123], ["upgrade", 124], ["upgrade", 125]]],
                    ["row", [["upgrade", 131], ["upgrade", 132], ["upgrade", 133], ["upgrade", 134], ["upgrade", 135]]],
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "Domain Expander", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "Current matter cap: " + formatWhole(player.tad.domainCap)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "60px", background: "#2b2c4b", border: "3px solid black", borderRadius: "15px 15px 0 0", marginBottom: "-3px"}],
                    ["left-row", [
                        ["clickable", 3],
                        ["style-row", [], {width: "3px", height: "50px", background: "black"}],
                        ["clickable", 4],
                        ["style-row", [], {width: "3px", height: "50px", background: "black"}],
                        ["clickable", 5],
                        ["style-row", [], {width: "3px", height: "50px", background: "black"}],
                        ["clickable", 9],
                        ["style-row", [], {width: "3px", height: "50px", background: "black"}],
                        ["clickable", 6],
                        ["style-row", [], {width: "3px", height: "50px", background: "black"}],
                        ["clickable", 7],
                        ["style-row", [], {width: "3px", height: "50px", background: "black"}],
                        ["clickable", 8],
                    ], {width: "500px", height: "50px", background: "#484a7d", border: "3px solid black"}],
                    ["style-column", [
                        ["raw-html", "Domain is reset on cap change.", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "40px", background: "#2b2c4b", border: "3px solid black", borderRadius: "0 0 15px 15px", marginTop: "-3px"}],
                ]
            },
            "Alternative Infinities": {
                buttonStyle() { return { color: "black", borderColor: "#3b90fd", borderRadius: "5px" }},
                unlocked() { return hasUpgrade("tad", 135) },
                content: [
                    ["blank", "10px"],
                    ["raw-html", () => {return "You have " + formatSimple(player.in.infinities, 1) + " infinities"}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatSimple(player.tad.infinitum, 1) + " infinitum"}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "7px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {return "You have " + formatSimple(player.tad.altInfinities.broken.amount) + "<br>Broken Infinities"}, {color: "rgba(0,0,0,0.8)", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "60px", borderRadius: "10px 10px 0 0"}],
                            ["style-column", [
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1"}, true, "black", () => {return player.tad.altInfinities.broken.amount.gte(1)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "40px", height: "40px", borderRight: "3px solid #515709"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "x" + formatSimple(player.tad.altInfinities.broken.effect1, 2) + " Matter."}, true, "black", () => {return player.tad.altInfinities.broken.amount.gte(1)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "207px", height: "40px"}],
                                ], {width: "250px", height: "40px", borderBottom: "3px solid #515709"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "10"}, true, "black", () => {return player.tad.altInfinities.broken.amount.gte(10)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "40px", height: "40px", borderRight: "3px solid #515709"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "x" + formatSimple(player.tad.altInfinities.broken.effect2, 2) + " T1 Alt-Infinities."}, true, "black", () => {return player.tad.altInfinities.broken.amount.gte(10)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "207px", height: "40px"}],
                                ], {width: "250px", height: "40px", borderBottom: "3px solid #515709"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "100"}, true, "black", () => {return player.tad.altInfinities.broken.amount.gte(100)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "40px", height: "40px", borderRight: "3px solid #515709"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "<small>Auto-activate the first 4 rocket fuel abilities.</small>"}, true, "black", () => {return player.tad.altInfinities.broken.amount.gte(100)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "207px", height: "40px"}],
                                ], {width: "250px", height: "40px"}],
                            ], {width: "250px", height: "126px", background: "#6c740c", borderTop: "3px solid #515709", borderBottom: "3px solid #515709"}],
                            ["style-column", [
                                ["clickable", 101],
                            ], {width: "250px", height: "80px"}],
                        ], {width: "250px", height: "272px", background: "#889110", border: "5px solid rgba(0,0,0,0.4)", borderRadius: "15px", margin: "3px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {return "You have " + formatSimple(player.tad.altInfinities.shattered.amount) + "<br>Shattered Infinities"}, {color: "rgba(0,0,0,0.8)", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "60px", borderRadius: "10px 10px 0 0"}],
                            ["style-column", [
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1"}, true, "black", () => {return player.tad.altInfinities.shattered.amount.gte(1)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "40px", height: "40px", borderRight: "3px solid #45600a"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "/" + formatSimple(player.tad.altInfinities.shattered.effect1, 2) + " Accumulator Cost Scaling."}, true, "black", () => {return player.tad.altInfinities.shattered.amount.gte(1)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "207px", height: "40px"}],
                                ], {width: "250px", height: "40px", borderBottom: "3px solid #45600a"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "10"}, true, "black", () => {return player.tad.altInfinities.shattered.amount.gte(10)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "40px", height: "40px", borderRight: "3px solid #45600a"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "x" + formatSimple(player.tad.altInfinities.shattered.effect2, 2) + " Infinities."}, true, "black", () => {return player.tad.altInfinities.shattered.amount.gte(10)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "207px", height: "40px"}],
                                ], {width: "250px", height: "40px", borderBottom: "3px solid #45600a"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "100"}, true, "black", () => {return player.tad.altInfinities.shattered.amount.gte(100)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "40px", height: "40px", borderRight: "3px solid #45600a"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "<small>Auto-buy dice buyables.</small>"}, true, "black", () => {return player.tad.altInfinities.shattered.amount.gte(100)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "207px", height: "40px"}],
                                ], {width: "250px", height: "40px"}],
                            ], {width: "250px", height: "126px", background: "#5c800e", borderTop: "3px solid #45600a", borderBottom: "3px solid #45600a"}],
                            ["style-column", [
                                ["clickable", 102],
                            ], {width: "250px", height: "80px"}],
                        ], {width: "250px", height: "272px", background: "#73A112", border: "5px solid rgba(0,0,0,0.4)", borderRadius: "15px", margin: "3px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {return "You have " + formatSimple(player.tad.altInfinities.fragmented.amount) + "<br>Fragmented Infinities"}, {color: "rgba(0,0,0,0.8)", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "60px", borderRadius: "10px 10px 0 0"}],
                            ["style-column", [
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1"}, true, "black", () => {return player.tad.altInfinities.fragmented.amount.gte(1)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "40px", height: "40px", borderRight: "3px solid #194c06"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "/" + formatSimple(player.tad.altInfinities.fragmented.effect1, 2) + " Compression Cost."}, true, "black", () => {return player.tad.altInfinities.fragmented.amount.gte(1)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "207px", height: "40px"}],
                                ], {width: "250px", height: "40px", borderBottom: "3px solid #194c06"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "10"}, true, "black", () => {return player.tad.altInfinities.fragmented.amount.gte(10)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "40px", height: "40px", borderRight: "3px solid #194c06"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "x" + formatSimple(player.tad.altInfinities.fragmented.effect2, 2) + " Infinitum."}, true, "black", () => {return player.tad.altInfinities.fragmented.amount.gte(10)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "207px", height: "40px"}],
                                ], {width: "250px", height: "40px", borderBottom: "3px solid #194c06"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "100"}, true, "black", () => {return player.tad.altInfinities.fragmented.amount.gte(100)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "40px", height: "40px", borderRight: "3px solid #194c06"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "<small>Produce +10% infinities per second.</small>"}, true, "black", () => {return player.tad.altInfinities.fragmented.amount.gte(100)}, "rgba(0,0,0,0.5)"]],
                                    ], {width: "207px", height: "40px"}],
                                ], {width: "250px", height: "40px"}],
                            ], {width: "250px", height: "126px", background: "#226508", borderTop: "3px solid #194c06", borderBottom: "3px solid #194c06"}],
                            ["style-column", [
                                ["clickable", 103],
                            ], {width: "250px", height: "80px"}],
                        ], {width: "250px", height: "272px", background: "#2B7F0A", border: "5px solid rgba(0,0,0,0.4)", borderRadius: "15px", margin: "3px"}],
                    ], {width: "800px", height: "290px", background: "#094242", border: "5px solid rgba(0,0,0,0.4)", borderRadius: "20px"}],
                    ["style-row", [], {width: "20px", height: "25px", background: "#052727"}],
                    ["style-row", [["clickable", 201]], {width: "310px", height: "60px", background: "#094242", border: "5px solid rgba(0,0,0,0.4)", borderRadius: "20px"}]
                ]
            },
        },
        Domain: {
            "Tree": {
                buttonStyle() { return { color: "black", borderRadius: "5px" }},
                unlocked() { return true },
                content: [
                    ["tree", DOMAIN_TREE],
                ]
            },
            "Collapse": {
                buttonStyle() { return { color: "black", borderRadius: "5px" }},
                unlocked() { return true },
                content: [
                    ["blank", "100px"],
                    ["clickable", 2],
                ]
            },
            "Accumulation": {
                buttonStyle() { return { color: "black", borderRadius: "5px" }},
                unlocked() { return true },
                content: [
                    ["clickable", 1],
                    ["blank", "25px"],
                    ["row", [["clickable", 21], ["clickable", 22]]],
                    ["blank", "10px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
                    ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23]]],
                    ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33]]],
                ]
            },
            "Compression": {
                buttonStyle() { return { color: "black", borderRadius: "5px" }},
                unlocked() { return true },
                content: [
                    ["clickable", 1],
                    ["blank", "15px"],
                    ["row", [
                        ["raw-html", () => {return player.tad.compression.neq(1) ? "You are at <h3>" + formatWhole(player.tad.compression) + "</h3> compressions." : "You are at <h3>" + formatWhole(player.tad.compression) + "</h3> compression." }, {color: "black", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + formatWhole(player.tad.compressionGain) + ")"}, () => {
                            let look = {color: "black", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.tad.compressionGain.gt(0) ? look.color = "black" : look.color = "#666"
                            return look
                        }],
                    ]],
                    ["blank", "10px"],
                    ["clickable", 11],
                    ["blank", "10px"],
                    ["row", [["clickable", 23], ["clickable", 24]]],
                    ["blank", "10px"],
                    ["row", [["buyable", 101], ["buyable", 102], ["buyable", 103], ["buyable", 104]]],
                    ["blank", "10px"],
                    ["clickable", 12],
                ]
            },
            "Specialization": {
                buttonStyle() { return { color: "black", borderRadius: "5px" }},
                unlocked() { return true },
                content: [
                    ["clickable", 1],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["tooltip-row", [
            ["raw-html", () => {return "You have " + formatSimple(player.tad.matter) + " matter"}, {color: "black", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatSimple(player.tad.matterGain) + "/s)"}, () => {
                look = {color: "black", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                player.tad.matterGain.gt(0) ? look.color = "black" : look.color = "#666"
                return look
            }],
            ["raw-html", () => {return "<div class='bottomTooltip'>Base Gain<hr><small>(+" + formatSimple(player.tad.matterBase) + "/s)</small></div>"}],
        ]],
        ["tooltip-row", [
            ["raw-html", () => {return player.tad.matter.gte(player.tad.domainCap) ? "Domain limit reached." : "Domain collapses at " + formatWhole(player.tad.domainCap) + " matter."}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.tad.matterGain.gt(0) ? "<div class='bottomTooltip'>Time till collapse<hr><small>" + formatTime(player.tad.domainCap.sub(player.tad.matter).div(player.tad.matterGain)) + "</small></div>" : "<div class='bottomTooltip'>Time till collapse<hr><small>∞y ∞d ∞h ∞m ∞s</small></div>"}],
        ]],
        ["microtabs", "Tabs", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("ta", 21) || hasMilestone("s", 19)}
})
