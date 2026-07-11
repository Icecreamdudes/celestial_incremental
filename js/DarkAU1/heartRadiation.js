addLayer("hr", {
    name: "Heart Radiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/radiation/heart.png' style='width:calc(80% + 1px);height:calc(80% + 1px);margin:10%'></img>",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        particleClick: new Decimal(0),
        particleClickReq: new Decimal(25),
        radiation: {
            current: new Decimal(0),
            max: new Decimal(2),
            amount: new Decimal(0),
            toGet: new Decimal(0),
            effect: new Decimal(1), //dark celestial points
            effect2: new Decimal(1), //space buyable effects 
            toggle: true,
        },
    }},
    automate() {
    },
    nodeStyle() {
        return {
            background: "#55142a",
            backgroundOrigin: "border-box",
            color: "#f6fff5",
            transform: "translate(50px, -5px)",
        };
    },
    tooltip: "Heart Radiation",
    branches: [["sr", "#74ff8f"]],
    color: "#55142a",
    update(delta) {
        player.hr.radiation.effect = player.hr.radiation.amount.pow(6).add(1)  //DCP
        player.hr.radiation.effect2 = player.hr.radiation.amount.pow(3.5).add(1) //Dark Grass

        player.hr.radiation.toGet = player.ani.darkRadiation.pow(0.2).div(100)
        player.hr.radiation.toGet = player.hr.radiation.toGet.mul(buyableEffect("dec", 13))
        player.hr.radiation.toGet = player.hr.radiation.toGet.mul(buyableEffect("tr", 18))

        player.hr.radiation.max = new Decimal(2)

        player.hr.particleClickReq = new Decimal(25)

        if (player.hr.particleClick.eq(player.hr.particleClickReq))
        {
            player.hr.radiation.amount = player.hr.radiation.amount.add(player.hr.radiation.toGet)

            layers.hr.heartRadiationReset();
        }

        if (player.musuniverse == "AD1" && hasUpgrade("ani", 24) && player.hr.radiation.toGet.gt(1) && player.pet.legPetTimers[0].active && player.hr.radiation.toggle) {
            player.hr.radiation.current = player.hr.radiation.current.sub(delta)
        }
        if (player.hr.radiation.current.lt(0)) {
            makeShinies(heartRadiation, new Decimal(1))
            player.hr.radiation.current = player.hr.radiation.max
        }
    },
    heartRadiationReset() {
        player.ani.darkRadiation = new Decimal(0)
        player.ani.radiation.red.amount = new Decimal(0)
        player.ani.radiation.orange.amount = new Decimal(0)
        player.ani.radiation.yellow.amount = new Decimal(0)
        player.ani.radiation.green.amount = new Decimal(0)

        player.ani.buyables[11] = new Decimal(0)
        player.ani.buyables[12] = new Decimal(0)
        player.ani.buyables[13] = new Decimal(0)
        player.ani.buyables[14] = new Decimal(0)

        player.hr.particleClick = new Decimal(0)

        for (let i = 0; i < 60; i++) {
            layers.le.starmetalReset();
            player.dv.buyables[11] = new Decimal(0)
            player.dv.buyables[12] = new Decimal(0)
            player.dv.buyables[13] = new Decimal(0)
            player.dv.buyables[14] = new Decimal(0)
            player.dv.buyables[15] = new Decimal(0)
            player.dv.buyables[16] = new Decimal(0)

            setTimeout(() => {
            player.dv.clouds = new Decimal(0)
            }, 100)
        }
    },
    bars: {},
    clickables: {
    },
    upgrades: {
        11: {
            title: "Heart Upgrade I",
            unlocked() { return true },
            description: "Autobuy vaporizer buyables. (works without aniciffo punchcard)",
            cost: new Decimal(10),
            currencyLocation() { return player.hr.radiation },
            currencyDisplayName: "Heart Radiation",
            currencyInternalName: "amount",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #55142a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#e20951" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#8b2648" : look.backgroundColor = "#ff6095"
                return look
            }
        },
        12: {
            title: "Heart Upgrade II",
            unlocked() { return true },
            description: "Boost dark radiation based on temporal radiation stones.",
            cost: new Decimal(50),
            currencyLocation() { return player.hr.radiation },
            currencyDisplayName: "Heart Radiation",
            currencyInternalName: "amount",
            effect() {
                return player.ani.stones.temporal.amount.pow(1.05).div(8).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #55142a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#e20951" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#8b2648" : look.backgroundColor = "#ff6095"
                return look
            }
        },
        13: {
            title: "Heart Upgrade III",
            unlocked() { return true },
            description: "Boost time radiation based on heart radiation.",
            cost: new Decimal(250),
            currencyLocation() { return player.hr.radiation },
            currencyDisplayName: "Heart Radiation",
            currencyInternalName: "amount",
            effect() {
                return player.hr.radiation.amount.pow(0.45).div(5).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #55142a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#e20951" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#8b2648" : look.backgroundColor = "#ff6095"
                return look
            }
        },
        14: {
            title: "Heart Upgrade IV",
            unlocked() { return true },
            description: "Boost dark celestial point gain based on dark radiation.",
            cost: new Decimal(1000),
            currencyLocation() { return player.hr.radiation },
            currencyDisplayName: "Heart Radiation",
            currencyInternalName: "amount",
            effect() {
                return player.ani.darkRadiation.pow(1.1).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "15px", width: "125px", color: "black", border: "2px solid #55142a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#e20951" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#8b2648" : look.backgroundColor = "#ff6095"
                return look
            }
        },
        15: {
            title: "Heart Upgrade V",
            unlocked() { return true },
            description: "Remove the eclipse cooldown entirely.",
            cost: new Decimal(10000),
            currencyLocation() { return player.hr.radiation },
            currencyDisplayName: "Heart Radiation",
            currencyInternalName: "amount",
            style() {
                let look = {borderRadius: "15px", width: "125px", color: "black", border: "2px solid #55142a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#e20951" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#8b2648" : look.backgroundColor = "#ff6095"
                return look
            }
        },
        16: {
            title: "Heart Upgrade VI",
            unlocked() { return true },
            description: "Unlock more time buyables.",
            cost: new Decimal(1e7),
            currencyLocation() { return player.hr.radiation },
            currencyDisplayName: "Heart Radiation",
            currencyInternalName: "amount",
            style() {
                let look = {borderRadius: "15px", width: "125px", color: "black", border: "2px solid #55142a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#e20951" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#8b2648" : look.backgroundColor = "#ff6095"
                return look
            }
        },
        17: {
            title: "Heart Upgrade VII",
            unlocked() { return true },
            description: "Gain 10% of each primary decay isotope per dark radiation click.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.hr.radiation },
            currencyDisplayName: "Heart Radiation",
            currencyInternalName: "amount",
            style() {
                let look = {borderRadius: "15px", width: "125px", color: "black", border: "2px solid #55142a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#e20951" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#8b2648" : look.backgroundColor = "#ff6095"
                return look
            }
        },
        18: {
            title: "Heart Upgrade VIII",
            unlocked() { return true },
            description: "Unlock the alpha decay punchcard.",
            cost: new Decimal(1e11),
            currencyLocation() { return player.hr.radiation },
            currencyDisplayName: "Heart Radiation",
            currencyInternalName: "amount",
            style() {
                let look = {borderRadius: "15px", width: "125px", color: "black", border: "2px solid #55142a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#e20951" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#8b2648" : look.backgroundColor = "#ff6095"
                return look
            }
        },
    },
    buyables: {
    },
    milestones: {},
    challenges: {},
    infoboxes: {
  
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #74ff8f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return formatWhole(player.hr.particleClick) + "/" + formatWhole(player.hr.particleClickReq) + " heart radiation particles clicked."}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.hr.radiation.amount) + "</h3> heart radiation. (+" + format(player.hr.radiation.toGet) + "/" + formatTime(player.hr.radiation.max) + "/" + formatWhole(player.hr.particleClickReq) + ")"}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Based on dark radiation)" }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts dark celestial point gain by x<h3>" + format(player.hr.radiation.effect) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts dark grass gain by x<h3>" + format(player.hr.radiation.effect2) + "</h3>. (ONLY IN ECLIPSE)" }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Performs a space radiation level reset but resets vaporizer instead of space energy." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],]],
                    ["row", [["upgrade", 17], ["upgrade", 18], ]],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.ani.darkRadiation) + "</h3> dark radiation. (+" + format(player.ani.darkRadiationToGet) + "/" + formatTime(player.ani.timer.max) + ")" }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].active ? "Boosts eclipse timer tickspeed by x<h3>" + format(player.ani.darkRadiationEffect) + "</h3>." : "Boosts length, width, and depth by x<h3>" + format(player.ani.darkRadiationEffect2) + "</h3>." }, {color: "#ffffff", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "5px"],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.sma.inStarmetalChallenge && hasUpgrade("ani", 24)},
    deactivated() { return !player.sma.inStarmetalChallenge},
})
const heartRadiation = {
    image: "resources/radiation/heart.png",
    time() {
        let time = new Decimal(9) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        player.hr.particleClick = player.hr.particleClick.add(1)
        if (player.hr.particleClick.lt(player.hr.particleClickReq)) makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>" + formatWhole(player.hr.particleClick) + "/" + formatWhole(player.hr.particleClickReq) + " Clicked!</small>"})
        if (player.hr.particleClick.eq(player.hr.particleClickReq)) makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.hr.radiation.toGet) + " Heart Radiation<br>Reset Complete!</small>"})
        Vue.delete(particles, this.id)
    },
    y() {
        return (Math.random() + 1) * 1000
    },
    spread: 100,
    dir() {
        return (Math.random() + 1) * 100
    },
    speed() { // Randomize speed a bit
        return (Math.random() + 2) * -4
    },
}