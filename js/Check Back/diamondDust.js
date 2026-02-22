addLayer("ev13", {
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
    color: "white",
    branches: ["ev0"],
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        player.ev13.diamondDustToGet = player.ev0.coinDust.div(1e9).pow(0.75).mul(2)

        player.ev13.diamondDustEffect = player.ev13.diamondDust.pow(0.625).add(1)
    },
    diamondDustReset() {
        player.ev0.coinDust = new Decimal(0)
        player.ev0.coinShards = new Decimal(0)

        for (let i = 11; i < 19; i++) {
            setBuyableAmount("ev0", i, new Decimal(0))
        }

        player.ev13.diamondDust = player.ev13.diamondDust.add(player.ev13.diamondDustToGet)
    },
    clickables: {
        11: {
            title() { return "<h2>Produce diamond dust, but reset previous coin dust content.</h2><br><h3>Req: 1e9 Coin Dust</h3>" },
            canClick() { return player.ev0.coinDust.gte(1e9) },
            unlocked() { return true },
            onClick() {
                layers.ev13.diamondDustReset()
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#00ffff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        }
    },
    upgrades: {
        11: {
            title: "Diamond Dust Upgrade I",
            description: "Simple, but powerful. x500 coin dust gain.",
            cost: new Decimal(1),
            currencyDisplayName: "Diamond Dust",
            currencyInternalName: "diamondDust",
            currencyLayer: "ev13",
            unlocked() { return true },
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        }
    },
    microtabs: {
        stuff: {
            "Main": {
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
                     ["style-row", [["upgrade", 11]]]
                ]
            },
            "Coal": {
                 buttonStyle() { return { color: "white", borderColor: "black", backgroundColor: "#111111", borderRadius: "5px"} },
                unlocked() {return true},
                content: [
                    ["raw-html", () => {
                        return "2"
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
                     return formatShort(player.ev13.diamondDust) + "<br>(+" + formatShort(player.ev13.diamondDustToGet) + ")"
                 }, {width: "93px", height: "50px", color: "#00ffff", display: "inline-flex", alignItems: "center", textAlign: "start", paddingLeft: "5px"}],
                 ["raw-html", () => { return "<div class='bottomTooltip'>Diamond Dust<hr><small>x" + formatShort(player.ev13.diamondDustEffect) + " Coin Shards</small></div>"}],
             ], () => {return player.cb.highestLevel.gte(250) ? {width: "150px", height: "50px"} : {display: "none !important"}}],
        ], () => { return player.cb.highestLevel.gte(250) ? {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"} : {width: "148px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"} }
        ],
        ["blank", "25px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[13] }
})