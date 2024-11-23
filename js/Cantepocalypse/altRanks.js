addLayer("ar", {
    name: "Alternate Ranks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AR", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        rankPoints: new Decimal(0),
        rankPointsToGet: new Decimal(0),
        rankPointsEffect: new Decimal(0),

        tierPoints: new Decimal(0),
        tierPointsToGet: new Decimal(0),
        tierPointsEffect: new Decimal(1),

        tetrPoints: new Decimal(0),
        tetrPointsToGet: new Decimal(0),
        tetrPointsEffect: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Alternate Ranks",
    color: "#1486ff",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ar.rankPointsToGet = player.cp.replicantiPoints.sub(1).pow(0.35)
        player.ar.rankPointsEffect = player.ar.rankPoints.pow(0.45).mul(0.005)
        player.ar.rankPointsToGet = player.ar.rankPointsToGet.mul(player.ar.tierPointsEffect)
        player.ar.rankPointsToGet = player.ar.rankPointsToGet.mul(buyableEffect("pr", 13))
        player.ar.rankPointsToGet = player.ar.rankPointsToGet.mul(player.ar.tetrPointsEffect)
        player.ar.rankPointsToGet = player.ar.rankPointsToGet.mul(player.gs.grassSkippersEffect)

        if (hasUpgrade("an", 13)) player.ar.rankPoints = player.ar.rankPoints.add(player.ar.rankPointsToGet.mul(Decimal.mul(delta, 0.05)))
        if (hasUpgrade("an", 15)) player.ar.rankPoints = player.ar.rankPoints.add(player.ar.rankPointsToGet.mul(Decimal.mul(delta, 0.25)))
        if (hasUpgrade("an", 18)) player.ar.rankPoints = player.ar.rankPoints.add(player.ar.rankPointsToGet.mul(delta))

        player.ar.tierPointsToGet = player.ar.rankPoints.mul(0.1).pow(0.4)
        player.ar.tierPointsEffect = player.ar.tierPoints.pow(0.65).add(1)
        player.ar.tierPointsToGet = player.ar.tierPointsToGet.mul(buyableEffect("pr", 14))
        player.ar.tierPointsToGet = player.ar.tierPointsToGet.mul(player.ar.tetrPointsEffect)
        player.ar.tierPointsToGet = player.ar.tierPointsToGet.mul(player.gs.grassSkippersEffect)

        if (hasUpgrade("an", 15)) player.ar.tierPoints = player.ar.tierPoints.add(player.ar.tierPointsToGet.mul(Decimal.mul(delta, 0.05)))
        if (hasUpgrade("an", 18)) player.ar.tierPoints = player.ar.tierPoints.add(player.ar.tierPointsToGet.mul(Decimal.mul(delta, 0.25)))

        player.ar.tetrPointsToGet = player.ar.tierPoints.mul(0.1).pow(0.4)
        player.ar.tetrPointsEffect = player.ar.tetrPoints.pow(0.5).add(1)
        player.ar.tetrPointsToGet = player.ar.tetrPointsToGet.mul(buyableEffect("rg", 16))
        player.ar.tetrPointsToGet = player.ar.tetrPointsToGet.mul(player.gs.grassSkippersEffect)
        if (hasUpgrade("an", 18)) player.ar.tetrPoints = player.ar.tetrPoints.add(player.ar.tetrPointsToGet.mul(Decimal.mul(delta, 0.05)))
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cp"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return "<h3>Reset replicanti points for rank points." },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ar.rankPoints = player.ar.rankPoints.add(player.ar.rankPointsToGet)
                player.cp.replicantiPoints = new Decimal(1)
            },
            style: { width: '400px', "min-height": '50px'},
        },
        12: {
            title() { return "<h3>Reset replicanti points and rank points for tier points." },
            canClick() { return player.ar.tierPointsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.ar.tierPoints = player.ar.tierPoints.add(player.ar.tierPointsToGet)
                player.ar.rankPoints = new Decimal(0)
                player.cp.replicantiPoints = new Decimal(1)
            },
            style: { width: '400px', "min-height": '50px'},
        },
        13: {
            title() { return "<h3>Reset replicanti points, rank points and tier points for tetr points." },
            canClick() { return player.ar.tetrPointsToGet.gte(1) },
            unlocked() { return hasUpgrade("cp", 13) },
            onClick() {
                player.ar.tetrPoints = player.ar.tetrPoints.add(player.ar.tetrPointsToGet)
                player.ar.tierPoints = new Decimal(0)
                player.ar.rankPoints = new Decimal(0)
                player.cp.replicantiPoints = new Decimal(1)
            },
            style: { width: '400px', "min-height": '50px'},
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
        ["raw-html", function () { return "You have <h3>" + format(player.ar.rankPoints) + "</h3> rank points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain <h3>" + format(player.ar.rankPointsToGet) + "</h3> rank points on reset. (Based on replicanti points)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "Rank points add <h3>+" + format(player.ar.rankPointsEffect) + "</h3> to the replicanti mult." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 11]]],
        ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + format(player.ar.tierPoints) + "</h3> tier points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain <h3>" + format(player.ar.tierPointsToGet) + "</h3> tier points on reset. (Based on rank points)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "Tier boost rank points by <h3>x" + format(player.ar.tierPointsEffect) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 12]]],
        ["blank", "25px"],
        ["raw-html", function () { return hasUpgrade("cp", 13) ? "You have <h3>" + format(player.ar.tetrPoints) + "</h3> tetr points." : "" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return hasUpgrade("cp", 13) ? "You will gain <h3>" + format(player.ar.tetrPointsToGet) + "</h3> tetr points on reset. (Based on tier points)" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return hasUpgrade("cp", 13) ? "Tetr boost rank and tier points by <h3>x" + format(player.ar.tetrPointsEffect) + "</h3>." : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 13]]],
    ]

            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicanti points Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "replicantiBar"]]],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 11) }
})

// hai icecreamdude-senpai :3
