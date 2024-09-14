addLayer("oi", {
    name: "Oil", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        oil: new Decimal(0),
        oilEffect: new Decimal(1), //boosts trees
        oilToGet: new Decimal(0),
        oilPause: new Decimal(0),

        stationPower: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        stationPowerPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        stationPowerEffect: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        stationPowerText: "",
        stationPowerTextEffect: "",
        stationPowerChoice: new Decimal(-1),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Oil",
    branches: ["rt"],
    color: "#28242c",
    update(delta) {
        let onepersec = new Decimal(1)

        player.oi.oilToGet = player.an.anonymity.div(1e25).pow(0.2)

        player.oi.oilEffect = player.oi.oil.pow(0.65).div(1.5).add(1)

        if (player.oi.oilPause.gt(0)) {
            layers.oi.oilReset();
        }
        player.oi.oilPause = player.oi.oilPause.sub(1)
    },
    oilReset()
    {
        player.ar.rankPoints = new Decimal(0)
        player.ar.tierPoints = new Decimal(0)
        player.ar.tetrPoints = new Decimal(0)
        player.cp.replicantiPoints = new Decimal(1)

        player.an.anonymity = new Decimal(0)

        player.pr.perkPoints = new Decimal(0)
        player.pr.buyables[11] = new Decimal(0)
        player.pr.buyables[12] = new Decimal(0)
        player.pr.buyables[13] = new Decimal(0)
        player.pr.buyables[14] = new Decimal(0)
        player.pr.buyables[15] = new Decimal(0)
        player.pr.buyables[16] = new Decimal(0)
        player.pr.buyables[17] = new Decimal(0)
        player.pr.buyables[18] = new Decimal(0)

        player.rt.repliTrees = new Decimal(0)
        player.rt.repliLeaves = new Decimal(1)

        player.rt.buyables[11] = new Decimal(0)
        player.rt.buyables[12] = new Decimal(0)
        player.rt.buyables[13] = new Decimal(0)
        player.rt.buyables[14] = new Decimal(0)
        player.rt.buyables[15] = new Decimal(0)
        player.rt.buyables[16] = new Decimal(0)
        player.rt.buyables[17] = new Decimal(0)
        player.rt.buyables[18] = new Decimal(0)

        for (let i = 0; i < player.an.upgrades.length; i++) {
            if (+player.an.upgrades[i] < 23) {
                player.an.upgrades.splice(i, 1);
                i--;
            }
        }
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cp"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return "<h2>Reset all content previous content (except grass and grass-skip) for oil. (Based on anonymity)" },
            canClick() { return player.oi.oilToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.oi.oil = player.oi.oil.add(player.oi.oilToGet)
                player.oi.oilPause = new Decimal(4)
            },
            style: { width: '600px', "min-height": '100px' },
        },
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
            },
            fillStyle: {
                "background-color": "#193ceb",
            },
            display() {
                return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
            },
        }, 
    },
    upgrades: {
    },
    buyables: {

    },
    milestones: {
   
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> oil." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your oil boosts trees and extends tree softcap by <h3>x" + format(player.oi.oilEffect) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.oi.oilToGet) + "</h3> oil on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],,
                    ["blank", "25px"],
        ["row", [["clickable", 11]]],
    ]

            },
            "Stations": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> oil." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
    ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "replicantiBar"]]],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasMilestone("gs", 17) }
})