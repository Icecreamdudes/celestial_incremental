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

        player.ev15.diamondDustToGet = player.ev0.coinDust.div(1e11).pow(0.5)
        player.ev15.diamondDustToGet = player.ev15.diamondDustToGet.mul(buyableEffect("ev15", 11))
        if (hasUpgrade("ev15", 16)) player.ev15.diamondDustToGet = player.ev15.diamondDustToGet.mul(upgradeEffect("ev15", 16))
        if (hasUpgrade("ev15", 18)) player.ev15.diamondDustToGet = player.ev15.diamondDustToGet.mul(upgradeEffect("ev15", 18))
        if (hasUpgrade("ev15", 20)) player.ev15.diamondDustToGet = player.ev15.diamondDustToGet.mul(upgradeEffect("ev15", 20))

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
            title() { return "<h2>Pressurize diamond dust, but reset previous coin dust content.</h2><br><h3>Req: 1e11 Coin Dust</h3>" },
            canClick() { return player.ev0.coinDust.gte(1e11) },
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
                "Simple, but powerful. x10 coin dust gain." + // MIDDLE
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
        16: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade VI</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Shards of ascension boost diamond dust gain.<br>" + // MIDDLE
                "Currently: x" + format(tmp[this.layer].upgrades[this.id].effect) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "24,000,000 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(2.4e7),
            effect() {
                let base = player.cbs.ascensionShards;
                let exp = new Decimal(0.6);
                let eff = base.plus(1).pow(exp);
                return eff;
            },
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        17: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade VII</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Decrease the cost growth of the first diamond dust buyable by 1.<br>" + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "5.40e9 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(5.4e9),
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        18: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade VIII</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Pet points and XPBoost jointly boost diamond dust gain.<br>" + // MIDDLE
                "Currently: x" + format(tmp[this.layer].upgrades[this.id].effect) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "7.20e11 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(7.2e11),
            effect() {
                let pp = player.cb.petPoints;
                let xpb = player.cb.XPBoost;
                let divider = new Decimal(5);
                let eff1 = pp.plus(1).log10().div(divider).plus(1);
                let eff2 = xpb.plus(1).log10().div(divider).plus(1);
                let eff = eff1.times(eff2);
                return eff;
            },
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        19: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade IX</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Diamond dust boosts the second coin fragment effect.<br>" + // MIDDLE
                "Currently: ^" + format(tmp[this.layer].upgrades[this.id].effect) +
                (upgradeEffect("ev15", 19).gte(5) ? "<br>[HARDCAPPED]" : (upgradeEffect("ev15", 19).gte(4) ? "<br>[SOFTCAPPED]" : "")) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "1.20e13 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(1.2e13),
            effect() {
                let base = player.ev15.diamondDust;
                let exp = new Decimal(0.45);
                let softexp = new Decimal(0.25);
                let eff = base.plus(1).log10().plus(1).pow(exp);
                if (eff.gt(4)) eff = eff.div(4).pow(softexp).mul(4);
                if (eff.gt(5)) eff = new Decimal(5);
                return eff;
            },
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        20: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade X</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Diamond dust boosts its own gain.<br>" + // MIDDLE
                "Currently: x" + format(tmp[this.layer].upgrades[this.id].effect) +
                (upgradeEffect("ev15", 20).gte(100) ? "<br>[SOFTCAPPED]" : "") +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "6.00e17 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(6e17),
            effect() {
                let base = player.ev15.diamondDust;
                let exp = new Decimal(1.25);
                let softexp = new Decimal(0.25);
                let eff = base.plus(1).log10().plus(1).pow(exp);
                if (eff.gt(100)) eff = eff.div(100).pow(softexp).mul(4);
                return eff;
            },
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        21: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade XI</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Shards of ascension boost buyable caps.<br>" + // MIDDLE
                "Currently: +" + formatWhole(tmp[this.layer].upgrades[this.id].effect) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "1.80e22 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(1.8e22),
            effect() {
                let base = player.cbs.ascensionShards;
                let exp = new Decimal(0.7);
                let eff = base.plus(1).pow(exp).floor();
                return eff;
            },
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        22: {
            unlocked: true,
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Diamond Dust Upgrade XII</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Unlock a third row of coin dust buyables.<br>[NOT IMPLEMENTED YET]" + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "9.00e25 Diamond Dust" + // BOTTOM
                "</div></div>"
            },
            cost: new Decimal(9e25),
            currencyInternalName: "diamondDust",
            currencyLayer: "ev15",
            //style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "250px", height: "125px"}
                return look
            },
        },
        /*
        "C": {
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
            costBase() { 
                let base = new Decimal(6) 
                return base;
            },
            costGrowth() { 
                let growth = new Decimal(6)
                if (hasUpgrade("ev15", 17)) growth = growth.sub(1)
                return growth;
            },
            purchaseLimit() { 
                let cap = new Decimal(25)
                if (hasUpgrade("ev15", 21)) cap = cap.plus(upgradeEffect("ev15", 21))
                return cap
            },
            currency() { return player.ev15.diamondDust},
            pay(amt) {player.ev15.diamondDust = this.currency().sub(amt)},
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { 
                let exp = new Decimal(1);
                // if (getBuyableAmount("ev15", 11).gte(10)) exp = exp.add(getBuyableAmount("ev15", 11).sub(10).div(10))
                let cost = this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase());
                let totalCost = cost.pow(exp);
                return totalCost;
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
            purchaseLimit() { 
                let cap = new Decimal(25)
                if (hasUpgrade("ev15", 21)) cap = cap.plus(upgradeEffect("ev15", 21))
                return cap
            },
            currency() { return player.ev15.diamondDust},
            pay(amt) {player.ev15.diamondDust = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(20).pow(1.1).floor()},
            unlocked: true,
            cost(x) { 
                let exp = new Decimal(1);
                // if (getBuyableAmount("ev15", 12).gte(10)) exp = exp.add(getBuyableAmount("ev15", 11).sub(10).div(10))
                let cost = this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) 
                let totalCost = cost.pow(exp)
                return totalCost;
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Unsmith Upgrader"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " effective unsmith levels.\n\
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
                     ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], 
                     ["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18],
                    ["upgrade", 19], ["upgrade", 20], ["upgrade", 21], ["upgrade", 22],]],
                     ["blank", "15px"],
                     ["style-row", [["ex-buyable", 11], ["ex-buyable", 12],]],
                     ["blank", "15px"],
                     /*
                     ["style-column", [
                        ["raw-html", "Buyable costs start increasing faster after 10 levels.", {color: "black", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "600px", height: "30px", background: "#00ffff", borderRadius: "20px"}], */
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