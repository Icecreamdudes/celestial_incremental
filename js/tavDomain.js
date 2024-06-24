addLayer("tad", {
    name: "Tav's Domain", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h2>→", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        domainResetPause: new Decimal(0),
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

        player.tad.domainResetPause = player.tad.domainResetPause.sub(1)
        if (player.tad.domainResetPause.gt(0))
        {
            layers.tad.domainReset()
        }
    },
    branches: ["ad", "ip"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "ta"
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
        11: {
            name: "Tav's Domain",
            challengeDescription() { return "<h4>Debuffs explained in challenge!<h5>\nDoes an infinity reset, negative infinity reset, lose all infinities and milestones. (Also resets on challenge leave)" },
            goalDescription() { return "None" },
            goal() { return false },
            canComplete: function () { return false },
            rewardDescription: "New types of infinities!",
            unlocked() { return true },
            onEnter() {
                player.tad.domainResetPause = new Decimal(5)
                player.in.infinityPause = new Decimal(16)
            },
            onExit() {
                player.tad.domainResetPause = new Decimal(5)
                player.in.infinityPause = new Decimal(16)
            },
            style: { width: '350px', height: '275px', }

        },
    },
    domainReset()
    {
        player.ta.negativeInfinityPause = new Decimal(5)
        player.in.infinities = new Decimal(0)
        for (let i = 0; i < player.ip.milestones.length; i++) {
            if (+player.ip.milestones[i] < 20) {
                player.ip.milestones.splice(i, 1);
                i--;
            }
        }
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["challenge", 11]]],
                ]

            },
            "Infinities": {
                buttonStyle() { return { 'color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                ]

            },
        },
    }, 

    tabFormat: [
         ["raw-html", function () { return "You have <h3>" + format(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "black", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You will gain <h3>" + format(player.ta.negativeInfinityPointsToGet) + "</h3> on reset." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return false}
})