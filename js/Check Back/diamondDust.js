addLayer("ev15", {
    name: "Diamond Dust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Dd", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        diamondDust: new Decimal(0),
        diamondDustToGet: new Decimal(0),
        diamondDustEffect: new Decimal(1),
    }},
    nodeStyle: {
        background: "linear-gradient(90deg, #40ffff, #c0ffff)",
    backgroundOrigin: "border-box",
    borderColor: "#206060",
    color: "#206060"
    },
    tooltip: "Diamond Dust",
    color: "#00ffff",
    branches: ["ev0"],
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        player.ev15.diamondDustToGet = player.ev0.coinDust.div(1e12).pow(0.5)
        player.ev15.diamondDustToGet = player.ev15.diamondDustToGet.mul(buyableEffect("ev15", 11))

        if (player.ev15.diamondDust.lte(1e6)) { 
            player.ev15.diamondDustEffect = player.ev15.diamondDust.pow(0.625).add(1)
        } else if (player.ev15.diamondDust.gte(1e6)) {
            let mult = player.ev15.diamondDust.div(1e6);
            player.ev15.diamondDustEffect = new Decimal(1e6).times(Decimal.pow(mult, 0.25)).pow(0.625).add(1)
        }
    },
    diamondDustReset() {
        player.ev0.coinDust = new Decimal(0)
        player.ev0.coinShards = new Decimal(0)

        for (let i = 11; i < 19; i++) {
            setBuyableAmount("ev0", i, new Decimal(0))
        }

        player.ev15.diamondDust = player.ev15.diamondDust.add(player.ev15.diamondDustToGet)
    },
    clickables: {
        11: {
            title() { return "<h2>Pressurize diamond dust, but reset previous coin dust content.</h2><br><h3>Req: 1e12 Coin Dust</h3>" },
            canClick() { return player.ev0.coinDust.gte(1e10) },
            unlocked() { return true },
            onClick() {
                layers.ev15.diamondDustReset()
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px"}
                if (this.canClick()) { 
                    look.backgroundColor = "#00ffff";
                } else { 
                    look.backgroundColor = "#bf8f8f" 
                }
                return look
            },
        }
    },
    upgrades: {
        11: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade I</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Simple, but powerful. x20 coin dust gain." + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "2 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(2),
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        12: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade II</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "The diamond dust effect on coin dust is squared." + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "8 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(8),
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        13: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade III</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Coin fragments no longer cost basic or greater fragments." + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "40 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(40),
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        14: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade IV</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Autobuy the first row of coin dust buyables." + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "480 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(480),
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        15: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade V</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Autobuy the second row of coin dust buyables." + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "19,200 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(19200),
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        /*
        16: {
            title: "Diamond Dust Upgrade VI",
            description: "Unlock coal.",
            cost: new Decimal(1800),
            currencyDisplayName: "Diamond Dust",
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            unlocked() { return false },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        */
    },
    buyables: {
        11: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(6) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ev15.diamondDust},
            pay(amt) {player.ev15.diamondDust = this.currency().sub(amt)},
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { 
                let exp = new Decimal(1);
                if (getBuyableAmount("ev15", 11).gte(10)) exp = exp.add(getBuyableAmount("ev15", 11).sub(10).div(10))
                let cost = this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase());
                return cost.pow(exp);
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Diamond Dust Doubler"
            },
            display() {
                return "which are boosting diamond dust gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Diamond Dust"
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
            style: { width: '275px', height: '150px', backgroundColor: "#40ffff", backgroundImage: 'linear-gradient(90deg, #80ffff, #00ffff)'}
        },
        12: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ev15.diamondDust},
            pay(amt) {player.ev15.diamondDust = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(20).pow(1.1).floor()},
            unlocked: true,
            cost(x) { 
                let exp = new Decimal(1);
                if (getBuyableAmount("ev15", 11).gte(10)) exp = exp.add(getBuyableAmount("ev15", 11).sub(10).div(10))
                let cost = this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) 
                return cost.pow(exp)
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Unsmith Upgrader"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " effective unsmith levels.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Diamond Dust"
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
            style: { width: '275px', height: '150px', backgroundColor: "#40ffff", backgroundImage: 'linear-gradient(90deg, #80ffff, #00ffff)'}
        },
    },
    microtabs: {
        stuff: {
            "Altar of Diamond": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#00ffff", borderRadius: "5px"} },
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#80ffff", borderRadius: "5px"} },
                unlocked() {return true},
                content: [
                     ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15],]],
                     ["blank", "15px"],
                     ["style-row", [["ex-buyable", 11], ["ex-buyable", 12],]],
                     ["blank", "15px"],
                     ["style-column", [
                        ["raw-html", "Buyable costs start increasing faster after 10 levels.", {color: "black", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "600px", height: "30px", background: "#00ffff", borderRadius: "20px"}],
                ]
            },
            "Coal": {
                 buttonStyle() { return { color: "white", borderColor: "black", backgroundColor: "#111111", borderRadius: "5px"} },
                unlocked() {return false},
                content: [
                    ["raw-html", () => {
                        return "Coming soon..."
                    },]
                ]
            }
        },
    },
    tabFormat: [
        ["blank", "10px"],
        ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/coinDust.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => {
                    if (player.ev0.coinDustPerSecond.lt(0.01)) {
                        return formatShort(player.ev0.coinDust) + "<br>" + formatShort(player.ev0.coinDustPerSecond.mul(3600)) + "/h"
                    } else {
                        return formatShort(player.ev0.coinDust) + "<br>" + formatShort(player.ev0.coinDustPerSecond) + "/s"
                    }
                }, {width: "93px", height: "50px", color: "#e7c97c", display: "inline-flex", alignItems: "center", textAlign: "start", paddingLeft: "5px"}],
                ["raw-html", () => { return "<div class='bottomTooltip'>Coin Dust<hr><small>x" + formatShort(player.ev0.coinDustEffect) + " Check Back XP</small></div>"}],
            ], () => {return !player.cb.highestLevel.gte(250) ? {width: "148px", height: "50px"} : {width: "148px", height: "50px", borderRight: "2px solid white"} }],
            ["tooltip-row", [
                 ["raw-html", "<img src='resources/diamondDust.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                 ["raw-html", () => {
                     return formatShort(player.ev15.diamondDust) + "<br>(+" + formatShort(player.ev15.diamondDustToGet) + ")"
                 }, {width: "93px", height: "50px", color: "#00ffff", display: "inline-flex", alignItems: "center", textAlign: "start", paddingLeft: "5px"}],
                 ["raw-html", () => { return "<div class='bottomTooltip'>Diamond Dust<hr><small>x" + (hasUpgrade("ev15", 12) ? formatShort(player.ev15.diamondDustEffect.pow(2)) : formatShort(player.ev15.diamondDustEffect)) + " Coin Dust<br>x" + formatShort(player.ev15.diamondDustEffect) + " Coin Shards" + (player.ev15.diamondDust.gte(1e6) ? "<br>[SOFTCAPPED]" : "") + "</small></div>"}],
             ], () => {return player.cb.highestLevel.gte(250) ? {width: "150px", height: "50px"} : {display: "none !important"}}],
        ], () => { return player.cb.highestLevel.gte(250) ? {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"} : {width: "148px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"} }
        ],
        ["blank", "25px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[15] }
})