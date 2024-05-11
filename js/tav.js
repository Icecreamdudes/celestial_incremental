addLayer("ta", {
    name: "Tav", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h2>→", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        reachedNegativeInfinity: false,
        unlockedReverseBreak: false,

        //negative infinity
        negativeInfinityPause: new Decimal(0),

        negativeInfinityPoints: new Decimal(0),
        negativeInfinityPointsToGet: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)",
            "background-origin": "border-box",
            "border-color": "#31aeb0",
            "color": "#008080",
        };
      },
    
    tooltip: "Tav, the Celestial of Limits",
    color: "#333c81",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.ad.antimatter.gte(Number.MAX_VALUE))
        {
            player.ta.reachedNegativeInfinity = true
        }

        if (player.ta.reachedNegativeInfinity && !player.ta.unlockedReverseBreak)
        {
            if (!player.revc.skip) 
            {
                player.tab = "revc"
            } /* else if (hasMilestone("ip", 21))
            {
                layers.bigc.crunch()

            } */
        }

        player.ta.negativeInfinityPointsToGet = new Decimal(1)
        
        player.ta.negativeInfinityPause = player.ta.negativeInfinityPause.sub(1)
        if (player.ta.negativeInfinityPause.gt(0))
        {
            layers.ta.negativeInfinityReset();
        }
    },
    negativeInfinityReset()
    {
        player.ad.antimatter = new Decimal(10)

        player.ad.buyables[1] = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
        {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.dimensionsPurchased[i] = new Decimal(0)
        }

        player.ad.dimensionsUnlocked[4] = false
        player.ad.dimensionsUnlocked[5] = false
        player.ad.dimensionsUnlocked[6] = false
        player.ad.dimensionsUnlocked[7] = false
        
        player.ad.dimBoostAmount = new Decimal(0)
        player.ad.galaxyAmount = new Decimal(0)

        player.in.infinityPause = new Decimal(2)
    },
    branches: ["ad", "ip"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
    },
    bars: {
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
            "Negative Infinity": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.ta.negativeInfinityPointsToGet) + "</h3> on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && hasChallenge("ip", 18)}
})
addLayer("revc", {
    name: "Reverse Crunch", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        spawnedWisps: false,
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Ranks",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "revc" && !player.bigc.spawnedWisps)
        {
            createWisps('black', 50, 3);
            player.bigc.spawnedWisps = true
        } else if (player.tab != "revc")
        {
            removeWisps();
        }
    },
    branches: ["branch"],
    clickables: {
        11: {
            title() { return "<h2>REVERSE CRUNCH" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"

                layers.revc.reverseCrunch()
            },
            style: { width: '300px', "min-height": '120px' },
        },
        
    },
    reverseCrunch(){
        player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)

        player.ta.negativeInfinityPause = new Decimal(5)
        player.ta.reachedNegativeInfinity = false
    }, 
    bars: {
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

    tabFormat: [
                    ["raw-html", function () { return "<h2>1e308 antimatter- amazing." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "150px"],
                    ["row", [["clickable", 11]]],
    ],
    layerShown() { return player.startedGame == true }
})
window.addEventListener('load', function() {
    player.bigc.spawnedWisps = false

});