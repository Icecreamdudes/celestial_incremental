addLayer("ne", {
    name: "Nectar", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "NE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        alpha: {
            amount: new Decimal(0),
            gain: new Decimal(0),
            effect: new Decimal(1),
        },
        beta: {
            amount: new Decimal(0),
            gain: new Decimal(0),
            effect: new Decimal(1),
        },
        gamma: {
            amount: new Decimal(0),
            gain: new Decimal(0),
            effect: new Decimal(1),
        },
        delta: {
            amount: new Decimal(0),
            gain: new Decimal(0),
            effect: new Decimal(1),
        },
    }},
    automate() {},
    nodeStyle() {
        return {borderColor: "#6d3701"}
    },
    tooltip: "Nectar",
    color: "#db6f02",
    branches: ["fl"],
    update(delta) {
        let onepersec = new Decimal(1)

        let allGain = new Decimal(1)
        allGain = allGain.mul(player.fl.glossaryEffects.nectar)
        allGain = allGain.mul(buyableEffect("bee", 42))
        allGain = allGain.mul(player.ne.delta.effect)
        allGain = allGain.mul(buyableEffect("al", 201))
        allGain = allGain.mul(player.ho.effects.nectar.effect)
        if (hasUpgrade("ho", 2)) allGain = allGain.mul(upgradeEffect("ho", 2))

        player.ne.alpha.gain = player.bee.bees.div(1e5).pow(Decimal.add(0.5, buyableEffect("bee", 43)))
        player.ne.alpha.gain = player.ne.alpha.gain.mul(allGain)
        if (hasUpgrade("ne", 101)) player.ne.alpha.gain = player.ne.alpha.gain.mul(2)
        player.ne.alpha.gain = player.ne.alpha.gain.mul(buyableEffect("bee", 41))
        if (hasUpgrade("ne", 202)) player.ne.alpha.gain = player.ne.alpha.gain.mul(upgradeEffect("ne", 202))
        if (hasUpgrade("ne", 301)) player.ne.alpha.gain = player.ne.alpha.gain.mul(upgradeEffect("ne", 301))
        player.ne.alpha.gain = player.ne.alpha.gain.mul(player.ho.effects.alpha.effect)

        if (hasUpgrade("al", 203) && player.bee.path == 2) player.ne.alpha.amount = player.ne.alpha.amount.add(player.ne.alpha.gain.mul(delta))

        player.ne.beta.gain = player.ne.alpha.amount.div(100).pow(Decimal.add(0.65, buyableEffect("bee", 43)))
        player.ne.beta.gain = player.ne.beta.gain.mul(allGain)

        player.ne.gamma.gain = player.ne.beta.amount.div(100).pow(Decimal.add(0.6, buyableEffect("bee", 43)))
        player.ne.gamma.gain = player.ne.gamma.gain.mul(allGain)

        player.ne.delta.gain = player.ne.gamma.amount.div(100).pow(Decimal.add(0.55, buyableEffect("bee", 43)))
        player.ne.delta.gain = player.ne.delta.gain.mul(allGain)

        if (!hasUpgrade("ne", 302)) {
            player.ne.alpha.effect = player.ne.alpha.amount.pow(0.7).add(1)
        } else {
            player.ne.alpha.effect = player.ne.alpha.amount.pow(0.8).add(1)
        }
        player.ne.beta.effect = player.ne.beta.amount.add(1).log(10).pow(0.5).add(1)
        player.ne.gamma.effect = player.ne.gamma.amount.add(1).log(10).pow(0.5).div(3)
        player.ne.delta.effect = player.ne.delta.amount.add(1).log(10).pow(0.5).div(3).add(1)
        if (hasUpgrade("al", 204) && player.ne.delta.amount.gte(1)) player.ne.delta.effect = player.ne.delta.effect.add(player.ne.delta.amount.pow(0.08).sub(1))

        if (player.tab == "ne" && player.bee.path == 0) player.bee.path = 2
    },
    clickables: {
        1: {
            title() { return "Gain Nectar α, but reset previous content.<br><small>Req: 100,000 Bees</small>" },
            canClick() { return player.bee.bees.gte(1e5) },
            unlocked: true,
            onClick() {
                player.ne.alpha.amount = player.ne.alpha.amount.add(player.ne.alpha.gain)
                
                player.bee.bees = new Decimal(1)
            },
            style: {width: '300px', minHeight: '80px', fontSize: "12px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: '15px'},
        },
        2: {
            title() { return "Gain Nectar β, but reset previous content.<br><small>Req: 100 Nectar α</small>" },
            canClick() { return player.ne.alpha.amount.gte(100) },
            unlocked: true,
            onClick() {
                player.ne.beta.amount = player.ne.beta.amount.add(player.ne.beta.gain)
                
                player.bee.bees = new Decimal(1)
                player.ne.alpha.amount = new Decimal(0)
            },
            style: {width: '300px', minHeight: '80px', fontSize: "12px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: '15px'},
        },
        3: {
            title() { return "Gain Nectar γ, but reset previous content.<br><small>Req: 100 Nectar β</small>" },
            canClick() { return player.ne.beta.amount.gte(100) },
            unlocked: true,
            onClick() {
                player.ne.gamma.amount = player.ne.gamma.amount.add(player.ne.gamma.gain)
                
                player.bee.bees = new Decimal(1)
                player.ne.alpha.amount = new Decimal(0)
                player.ne.beta.amount = new Decimal(0)
            },
            style: {width: '300px', minHeight: '80px', fontSize: "12px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: '15px'},
        },
        4: {
            title() { return "Gain Nectar δ, but reset previous content.<br><small>Req: 100 Nectar γ</small>" },
            canClick() { return player.ne.gamma.amount.gte(100) },
            unlocked: true,
            onClick() {
                player.ne.delta.amount = player.ne.delta.amount.add(player.ne.delta.gain)
                
                player.bee.bees = new Decimal(1)
                player.ne.alpha.amount = new Decimal(0)
                player.ne.beta.amount = new Decimal(0)
                player.ne.gamma.amount = new Decimal(0)
            },
            style: {width: '300px', minHeight: '80px', fontSize: "12px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: '15px'},
        },
    },
    upgrades: {
        101: {
            title: "Nector α-1",
            unlocked: true,
            description: "Double Nectar α Gain.",
            cost: new Decimal(5),
            currencyLocation() { return player.ne.alpha },
            currencyDisplayName: "Nectar α",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        102: {
            title: "Nector α-2",
            unlocked: true,
            description: "Triple bees per second.",
            cost: new Decimal(20),
            currencyLocation() { return player.ne.alpha },
            currencyDisplayName: "Nectar α",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        103: {
            title: "Nector α-3",
            unlocked: true,
            description: "Unlock Nectar β.",
            cost: new Decimal(100),
            currencyLocation() { return player.ne.alpha },
            currencyDisplayName: "Nectar α",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },

        201: {
            title: "Nector β-1",
            unlocked: true,
            description: "Unlock green flowers.",
            cost: new Decimal(5),
            currencyLocation() { return player.ne.beta },
            currencyDisplayName: "Nectar β",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        202: {
            title: "Nector β-2",
            unlocked: true,
            description: "Buff nectar α based on total nectar upgrades.",
            cost: new Decimal(20),
            currencyLocation() { return player.ne.beta },
            currencyDisplayName: "Nectar β",
            currencyInternalName: "amount",
            effect() {
                return Decimal.pow(1.25, player.ne.upgrades.length)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        203: {
            title: "Nector β-3",
            unlocked: true,
            description: "Unlock Nectar γ.",
            cost: new Decimal(100),
            currencyLocation() { return player.ne.beta },
            currencyDisplayName: "Nectar β",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },

        301: {
            title: "Nector γ-1",
            unlocked: true,
            description: "Boost nectar α based on total research.",
            cost: new Decimal(5),
            currencyLocation() { return player.ne.gamma },
            currencyDisplayName: "Nectar γ",
            currencyInternalName: "amount",
            effect() {
                return player.bee.totalResearch.pow(0.7).div(10).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 1) }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        302: {
            title: "Nector γ-2",
            unlocked: true,
            description: "Improve nector α effect.",
            cost: new Decimal(20),
            currencyLocation() { return player.ne.gamma },
            currencyDisplayName: "Nectar γ",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        303: {
            title: "Nector γ-3",
            unlocked: true,
            description: "Unlock Nectar δ.",
            cost: new Decimal(100),
            currencyLocation() { return player.ne.gamma },
            currencyDisplayName: "Nectar γ",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },

        401: {
            title: "Nector δ-1",
            unlocked: true,
            description: "Unlock a new nectar research.",
            cost: new Decimal(5),
            currencyLocation() { return player.ne.delta },
            currencyDisplayName: "Nectar δ",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        402: {
            title: "Nector δ-2",
            unlocked: true,
            description: "Decrease time between green flower growth by /2.",
            cost: new Decimal(20),
            currencyLocation() { return player.ne.delta },
            currencyDisplayName: "Nectar δ",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        403: {
            title: "Nector δ-3",
            unlocked: true,
            description: "Double picking power.",
            cost: new Decimal(100),
            currencyLocation() { return player.ne.delta },
            currencyDisplayName: "Nectar δ",
            currencyInternalName: "amount",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },

    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return player.bee.bees.eq(1) ? "You have <h3>" + format(player.bee.bees) + "</h3> bee." : "You have <h3>" + format(player.bee.bees) + "</h3> bees."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.bee.bps) + "/s)" }, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "5px"}],
        ]],
        ["blank", "25px"],
        ["row", [
            ["style-column", [
                ["style-column", [
                    ["row", [
                        ["raw-html", () => {return "You have " + format(player.ne.alpha.amount) + " Nectar α"}, {color: "#161616", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.ne.alpha.gain) + ")"}, {color: "#161616", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "Boosts BPS by x" + formatSimple(player.ne.alpha.effect, 2)}, {color: "#161616", fontSize: "14px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["clickable", 1],
                ], {width: "400px", height: "147px", borderBottom: "3px solid #6d3701"}],
                ["style-row", [
                    ["upgrade", 101], ["upgrade", 102], ["upgrade", 103]
                ], {width: "400px", height: "150px", background: "#c5b4a3", borderRadius: "0 0 17px 17px"}],
            ], {width: "400px", height: "300px", background: "#f7e2cc", border: "3px solid #6d3701", margin: "0 3px 3px 0", borderRadius: "20px"}],
            ["style-column", [
                ["style-column", [
                    ["row", [
                        ["raw-html", () => {return "You have " + format(player.ne.beta.amount) + " Nectar β"}, {color: "#161616", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.ne.beta.gain) + ")"}, {color: "#161616", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "Boosts flower gain by x" + formatSimple(player.ne.beta.effect, 2)}, {color: "#161616", fontSize: "14px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["clickable", 2],
                ], {width: "400px", height: "147px", borderBottom: "3px solid #6d3701"}],
                ["style-row", [
                    ["upgrade", 201], ["upgrade", 202], ["upgrade", 203]
                ], {width: "400px", height: "150px", background: "#c09d7a", borderRadius: "0 0 17px 17px"}],
            ], () => {return hasUpgrade("ne", 103) ? {width: "400px", height: "300px", background: "#f0c599", border: "3px solid #6d3701", margin: "0 0 3px 3px", borderRadius: "20px"} : {display: "none !important"}}],
            ["style-column", [
                ["style-column", [
                    ["row", [
                        ["raw-html", () => {return "You have " + format(player.ne.gamma.amount) + " Nectar γ"}, {color: "#161616", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.ne.gamma.gain) + ")"}, {color: "#161616", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "Boosts glossary effect base by +" + formatSimple(player.ne.gamma.effect, 2)}, {color: "#161616", fontSize: "14px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["clickable", 3],
                ], {width: "400px", height: "147px", borderBottom: "3px solid #6d3701"}],
                ["style-row", [
                    ["upgrade", 301], ["upgrade", 302], ["upgrade", 303]
                ], {width: "400px", height: "150px", background: "#ba8652", borderRadius: "0 0 17px 17px"}],
            ], () => {return hasUpgrade("ne", 203) ? {width: "400px", height: "300px", background: "#e9a867", border: "3px solid #6d3701", margin: "3px 3px 0 0", borderRadius: "20px"} : {display: "none !important"}}],
            ["style-column", [
                ["style-column", [
                    ["row", [
                        ["raw-html", () => {return "You have " + format(player.ne.delta.amount) + " Nectar δ"}, {color: "#161616", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.ne.delta.gain) + ")"}, {color: "#161616", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "Boosts nectar gain by x" + formatSimple(player.ne.delta.effect, 2)}, {color: "#161616", fontSize: "14px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["clickable", 4],
                ], {width: "400px", height: "147px", borderBottom: "3px solid #6d3701"}],
                ["style-row", [
                    ["upgrade", 401], ["upgrade", 402], ["upgrade", 403]
                ], {width: "400px", height: "150px", background: "#b46f29", borderRadius: "0 0 17px 17px"}],
            ], () => {return hasUpgrade("ne", 303) ? {width: "400px", height: "300px", background: "#e28b34", border: "3px solid #6d3701", margin: "3px 0 0 3px", borderRadius: "20px"} : {display: "none !important"}}],
        ], {width: "820px"}],
    ],
    layerShown() { return player.startedGame && player.bee.totalResearch.gte(25) && player.bee.path != 1 }
})
