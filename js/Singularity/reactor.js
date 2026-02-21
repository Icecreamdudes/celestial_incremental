addLayer("rea", {
    name: "Reactor",
    symbol: "RE",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        nodeTimer: 0,
        nodeTimerMax: 5,
        nodesAvailable: (() => {
            let a = []
            for (let i = 1; i <= 15; i++) {
                for (let j = 1; j <= 15; j++) {
                    a.push(i + (j < 10 ? "0" + j : j))
                }
            }
            a.splice(a.indexOf("108"), 1)
            return a
        })(),

        plasma: new Decimal(0),
        plasmaToGet: new Decimal(1),
        plasmaEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(-120deg, #0e8a4c 0%, #8bff17 100%)",
            "background-origin": "border-box",
            "border-color": "#3d1616",
            "color": "#3d1616",
        };
        /*return {
            color: "#005f5f",
            background: "#c8e6c8",
            "background-origin": "border-box",
            "border-color": "#005f5f",
        };*/
    },
    tooltip: "Reactor",
    color: "#2d8a0e",
    update(delta) {
        player.rea.plasmaEffect = new Decimal(2).pow(player.rea.plasma.add(1).log(10).pow(1.5))
        if (player.rea.plasmaEffect.gte(1e100)) player.rea.plasmaEffect = player.rea.plasmaEffect.div(1e100).pow(0.5).mul(1e100)
        else if (player.rea.plasmaEffect.gte(1e25)) player.rea.plasmaEffect = player.rea.plasmaEffect.div(1e25).pow(0.25).mul(1e25)

        player.rea.plasmaToGet = new Decimal(1)

        createReactorNode()
    },
    branches: ["ra", "sd"],
    clickables: {
        
    },
    bars: {},
    upgrades: {
        /*11: {
            title: "CE-1",
            unlocked() { return player.cer.transfiguratorPowerBest.gte(1) },
            description() {return "Boost cere points based on paradox core fragments.<br>Currently: x" + format(this.effect())},
            cost: new Decimal(1e4),
            currencyLocation() { return player.cep },
            currencyDisplayName: "Cere Points",
            currencyInternalName: "cerePoints",
            effect() { return player.cof.coreFragments[3].pow(0.15).add(1) },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },*/
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rea.plasma},
            pay(amt) { player.rea.plasma = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).div(2).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Damage Booster"
            },
            display() {
                return 'which are boosting reactor damage by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Plasma'
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
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rea.plasma},
            pay(amt) { player.rea.plasma = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).div(2).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Plasma Booster"
            },
            display() {
                return 'which are boosting plasma by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Plasma'
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
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(30) },
            currency() { return player.rea.plasma},
            pay(amt) { player.rea.plasma = this.currency().sub(amt) },
            effect(x) { return new Decimal(1).sub(getBuyableAmount(this.layer, this.id).mul(0.02))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Weakener"
            },
            display() {
                return 'which are raising the radiation softcap by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Plasma'
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
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.rea.plasma},
            pay(amt) { player.rea.plasma = this.currency().sub(amt) },
            effect(x) { return new Decimal(5).pow(getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pre-OTF Quintupler"
            },
            display() {
                return 'which are boosting pre-OTF currencies by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Plasma'
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
            style: { width: '275px', height: '150px', }
        },
        15: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.rea.plasma},
            pay(amt) { player.rea.plasma = this.currency().sub(amt) },
            effect(x) { return new Decimal(3).pow(getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Post-OTF Tripler"
            },
            display() {
                return 'which are boosting post-OTF currencies by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Plasma'
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
            style: { width: '275px', height: '150px', }
        },
        16: {
            costBase() { return new Decimal(1e3) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(300) },
            currency() { return player.rea.plasma},
            pay(amt) { player.rea.plasma = this.currency().sub(amt) },
            effect(x) { return new Decimal(100).pow(getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "SP Centupler"
            },
            display() {
                return 'which are boosting singularity points by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Plasma'
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
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.ra.radiation) + "</h3> radiation (" + format(player.ra.radiationPerSecond) + "/s)" }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "After " + format(player.ra.radiationSoftcapStart) + " radiation, radiation gain is divided by /" + format(player.ra.radiationSoftcapEffect)},
                        () => {return player.ra.radiation.gte(player.ra.radiationSoftcapStart) ? {color: "red", fontSize: "16px", fontFamily: "monospace"} : {color: "gray", fontSize: "0px", fontFamily: "monospace"}}],
                    ["blank", "10px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.rea.plasma) + "</h3> plasma (+" + format(player.rea.plasmaToGet) + ")" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["row", [
                        ["raw-html", function () { return "Boosts radiation by x" + format(player.rea.plasmaEffect) }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => {
                            if (player.rea.plasmaEffect.lt(1e25)) {
                                return ""
                            } else if (player.rea.plasmaEffect.lt(1e100)) {
                                return "[SOFTCAPPED]"
                            } else {
                                return "[SOFTCAPPED<sup>2</sup>]"
                            }
                        }, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            // LEVEL
                        ], {background: "#0d2904", border: "3px solid #2d8a0e", borderRadius: "8px 0px 0px 8px", width: "200px", height: "600px"}],
                        ["style-row", [
                            ["raw-html", function () { return "<canvas id='reactorCanvas' width='600' height='600'></canvas>" }, {}],
                        ], {border: "3px solid #2d8a0e", borderLeft: "0px", width: "600px", height: "600px"}],
                    ], {background: "#0000007f", borderRadius: "8px", width: "809px", height: "600px"}],
                    ["blank", "25px"],
                ]
            },
            "Buyables": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.ra.radiation) + "</h3> radiation (" + format(player.ra.radiationPerSecond) + "/s)" }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "After " + format(player.ra.radiationSoftcapStart) + " radiation, radiation gain is divided by /" + format(player.ra.radiationSoftcapEffect)},
                        () => {return player.ra.radiation.gte(player.ra.radiationSoftcapStart) ? {color: "red", fontSize: "16px", fontFamily: "monospace"} : {color: "gray", fontSize: "0px", fontFamily: "monospace"}}],
                    ["blank", "10px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.rea.plasma) + "</h3> plasma (+" + format(player.rea.plasmaToGet) + ")" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["row", [
                        ["raw-html", function () { return "Boosts radiation by x" + format(player.rea.plasmaEffect) }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => {
                            if (player.rea.plasmaEffect.lt(1e25)) {
                                return ""
                            } else if (player.rea.plasmaEffect.lt(1e100)) {
                                return "[SOFTCAPPED]"
                            } else {
                                return "[SOFTCAPPED<sup>2</sup>]"
                            }
                        }, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["blank", "25px"],
                    ["style-row", [
                        ["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],
                        ["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16]
                    ], {maxWidth: "840px"}],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.s.singularityPointsToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.in.infinityPoints.gte(1e40)) {look.color = "white"} else {look.color = "gray"} 
                return look
            }],
            ["raw-html", () => {return player.in.infinityPoints.gte("2.71e3793") ? "[SOFTCAPPED<sup>2</sup>]" : player.in.infinityPoints.gte(2.5e193) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && true}
})

function animate() {
    const canvas = document.getElementById("reactorCanvas")
    if (canvas) {
        let ctx = canvas.getContext('2d')

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 3;
        ctx.fillStyle = "#0d2904";
        ctx.strokeStyle = "#2d8a0e";
        ctx.save()
        ctx.beginPath();
        ctx.arc(300, 600, 20, 20, -90, 90);
        ctx.fill()
        ctx.stroke();
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = "16px Monospace"
        for (let i = 0; i < 14; i++) {
            for (let j = 0; j < 15; j++) {
                let t = tiles[i][j]
                if(t != 0) {
                    if (t == 1) {
                        ctx.fillStyle = "#8bff17"
                        ctx.strokeStyle = "#2d8a0e"
                    } else {
                        ctx.fillStyle = "#0d2904"
                        ctx.strokeStyle = "#2d8a0e"
                    }
                    ctx.fillRect(40*j, 40*i, 40, 40)
                    ctx.strokeRect(40*j, 40*i, 40, 40)
                    if (t == 1) {
                        ctx.fillStyle = "#0d2904"
                        ctx.fillText("1", 40*j + 20, 40*i + 20)
                    }
                }
            }
        }
        ctx.fillStyle = "#c6ff8c"
        for (let i = 0; i < bullets.length; i++) {
        ctx.beginPath();
            bullets[i][0] += Math.cos(bullets[i][2])
            bullets[i][1] += Math.sin(bullets[i][2])
            ctx.arc(bullets[i][0], bullets[i][1], 5, 5, 0, 360);
            ctx.fill()
        }
        ctx.reastore()
    }
    requestAnimationFrame(animate);
}

animate()

let tiles = []
for (let i = 0; i < 14; i++) {
    tiles.push([])
    for (let j = 0; j < 15; j++) {
        tiles[tiles.length-1].push(0)
    }
}

let canShoot = true
let bullets = []

function createReactorNode() {

    let moveOn = true
    let elligibleRow = 13
    let elligibleTiles = []
    
    for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 15; j++) {
            if (tiles[i][j] == 0) {
                moveOn = false
                elligibleTiles.push(j)
            }
        }
        if (!moveOn) {
            elligibleRow = i
            break
        }
    }
    tiles[elligibleRow][elligibleTiles[Math.floor(Math.random() * elligibleTiles.length)]] = Math.floor(Math.random() * 1.1) + 1
}

function createReactorBullet(event) {
    if (!canShoot) return

    if (player.tab != 're' || player.subtabs.rea.stuff != 'Main') return

    bullets.push([300, 575, Math.atan2(event.pageX, event.pageY)])
}

addEventListener("click", createReactorBullet)