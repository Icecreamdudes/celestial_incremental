addLayer("mr", {
    name: "Mind Radiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/radiation/mind.png' style='width:calc(80% - 3px);height:calc(80% - 3px);margin:10%'></img>",
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
            background: "#00923d",
            backgroundOrigin: "border-box",
            color: "#f6fff5",
            transform: "translate(-50px, 25px)",
        };
    },
    tooltip: "Mind Radiation",
    branches: [["tr", "#74ff8f"]],
    color: "#00923d",
    update(delta) {
        player.mr.radiation.effect = player.mr.radiation.amount.pow(6).add(1)  //DCP
        player.mr.radiation.effect2 = player.mr.radiation.amount.pow(0.25).div(6.5).add(1) //Space buyable

        player.mr.radiation.toGet = player.ani.darkRadiation.pow(0.3).div(1000)

        player.mr.radiation.max = new Decimal(2)

        player.mr.particleClickReq = new Decimal(25)

        if (player.mr.particleClick.eq(player.mr.particleClickReq))
        {
            player.mr.radiation.amount = player.mr.radiation.amount.add(player.mr.radiation.toGet)

            layers.mr.mindRadiationReset();
        }

        if (player.musuniverse == "AD1" && hasUpgrade("ani", 24) && player.mr.radiation.toGet.gt(1) && !player.pet.legPetTimers[0].active && player.mr.radiation.toggle) {
            player.mr.radiation.current = player.mr.radiation.current.sub(delta)
        }
        if (player.mr.radiation.current.lt(0)) {
            makeShinies(mindRadiation, new Decimal(1))
            player.mr.radiation.current = player.mr.radiation.max
        }
    },
    mindRadiationReset() {
        player.ani.darkRadiation = new Decimal(0)
        player.ani.radiation.red.amount = new Decimal(0)
        player.ani.radiation.orange.amount = new Decimal(0)
        player.ani.radiation.yellow.amount = new Decimal(0)
        player.ani.radiation.green.amount = new Decimal(0)

        player.ani.buyables[11] = new Decimal(0)
        player.ani.buyables[12] = new Decimal(0)
        player.ani.buyables[13] = new Decimal(0)
        player.ani.buyables[14] = new Decimal(0)

        player.mr.particleClick = new Decimal(0)

        for (let i = 0; i < 60; i++) {
            layers.le.starmetalReset();
            player.ds.buyables[11] = new Decimal(0)
            player.ds.buyables[12] = new Decimal(0)
            player.ds.buyables[13] = new Decimal(0)
            player.ds.buyables[14] = new Decimal(0)
            player.ds.buyables[101] = new Decimal(0)
            player.ds.buyables[102] = new Decimal(0)
            player.ds.buyables[103] = new Decimal(0)
            player.ds.buyables[104] = new Decimal(0)
            player.ds.buyables[105] = new Decimal(0)
            player.ds.buyables[106] = new Decimal(0)
            player.ds.buyables[107] = new Decimal(0)

            setTimeout(() => {
            player.ds.spaceEnergy = new Decimal(0)
            player.ds.length = new Decimal(1)
            player.ds.width = new Decimal(1)
            player.ds.depth = new Decimal(1)
            player.ds.spissitude = new Decimal(1)
            }, 100)
        }
    },
    bars: {},
    clickables: {
    },
    upgrades: {
        11: {
            title: "Mind Upgrade I",
            unlocked() { return true },
            description: "Unlock blue radiation.",
            cost: new Decimal(10),
            currencyLocation() { return player.mr.radiation },
            currencyDisplayName: "Mind Radiation",
            currencyInternalName: "amount",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#4cad60" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#237e20" : look.backgroundColor = "#74ac72"
                return look
            }
        },
        12: {
            title: "Mind Upgrade II",
            unlocked() { return true },
            description: "Boost ROYGB radiation based on comsic radiation stones.",
            cost: new Decimal(50),
            currencyLocation() { return player.mr.radiation },
            currencyDisplayName: "Mind Radiation",
            currencyInternalName: "amount",
            effect() {
                return player.ani.stones.cosmic.amount.pow(0.95).div(10).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#4cad60" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#237e20" : look.backgroundColor = "#74ac72"
                return look
            }
        },
        13: {
            title: "Mind Upgrade III",
            unlocked() { return true },
            description: "Boost space radiation based on mind radiation.",
            cost: new Decimal(250),
            currencyLocation() { return player.mr.radiation },
            currencyDisplayName: "Mind Radiation",
            currencyInternalName: "amount",
            effect() {
                return player.mr.radiation.amount.pow(0.35).div(6).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#4cad60" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#237e20" : look.backgroundColor = "#74ac72"
                return look
            }
        },
        14: {
            title: "Mind Upgrade IV",
            unlocked() { return true },
            description: "Divide universe reset req based on dark radiation.",
            cost: new Decimal(1000),
            currencyLocation() { return player.mr.radiation },
            currencyDisplayName: "Mind Radiation",
            currencyInternalName: "amount",
            effect() {
                return player.ani.darkRadiation.pow(1.25).add(1)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#4cad60" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#237e20" : look.backgroundColor = "#74ac72"
                return look
            }
        },
        15: {
            title: "Mind Upgrade V",
            unlocked() { return true },
            description: "-1 punchcard selection from aniciffo selection cost.",
            cost: new Decimal(10000),
            currencyLocation() { return player.mr.radiation },
            currencyDisplayName: "Mind Radiation",
            currencyInternalName: "amount",
            style() {
                let look = {borderRadius: "15px", color: "black", border: "2px solid #1d901a", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#4cad60" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#237e20" : look.backgroundColor = "#74ac72"
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
                    ["raw-html", () => { return formatWhole(player.mr.particleClick) + "/" + formatWhole(player.mr.particleClickReq) + " mind radiation particles clicked."}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.mr.radiation.amount) + "</h3> mind radiation. (+" + format(player.mr.radiation.toGet) + "/" + formatTime(player.mr.radiation.max) + "/" + formatWhole(player.mr.particleClickReq) + ")"}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Based on dark radiation)" }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts dark celestial point gain by x<h3>" + format(player.mr.radiation.effect) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts space buyable effects by ^<h3>" + format(player.mr.radiation.effect2) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Performs a space radiation level reset" }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15],]],
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
const mindRadiation = {
    image: "resources/radiation/mind.png",
    time() {
        let time = new Decimal(9) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        player.mr.particleClick = player.mr.particleClick.add(1)
        if (player.mr.particleClick.lt(player.mr.particleClickReq)) makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>" + formatWhole(player.mr.particleClick) + "/" + formatWhole(player.mr.particleClickReq) + " Clicked!</small>"})
        if (player.mr.particleClick.eq(player.mr.particleClickReq)) makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.mr.radiation.toGet) + " Mind Radiation<br>Reset Complete!</small>"})
        Vue.delete(particles, this.id)
    },
    y() {
        return (Math.random() + 1) * -400
    },
    spread: 100,
    dir() {
        return (Math.random() + 1) * 100
    },
    speed() { // Randomize speed a bit
        return (Math.random() + 2) * 4
    },
}