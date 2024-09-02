addLayer("gs", {
    name: "Grass-Skip", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GS", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        grassSkip: new Decimal(0),
        grassSkipToGet: new Decimal(0),
        grassSkipReq: new Decimal(1e40),
        grassSkipEffect: new Decimal(1),
        grassSkipPause: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Grass-Skip",
    branches: ["rg"],
    color: "#bfc66a",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.gs.grassSkipPause.gt(0)) {
            layers.gs.grassSkipReset();
        }
        player.gs.grassSkipPause = player.gs.grassSkipPause.sub(1)

        player.gs.grassSkipReq = player.gs.grassSkip.pow(1.5).mul(1e4).add(1).mul(1e40)
        player.gs.grassSkipEffect = player.gs.grassSkip.pow(1.6).mul(0.4).add(1)

        if (player.cp.replicantiPoints.gte(1e40))
        {
            player.gs.grassSkipToGet = new Decimal(1)
        }
    },
    grassSkipReset()
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

        player.rg.repliGrass = new Decimal(1)

        player.rg.buyables[11] = new Decimal(0)
        player.rg.buyables[12] = new Decimal(0)
        player.rg.buyables[13] = new Decimal(0)
        player.rg.buyables[14] = new Decimal(0)
        player.rg.buyables[15] = new Decimal(0)
        player.rg.buyables[16] = new Decimal(0)
        player.rg.buyables[17] = new Decimal(0)
        player.rg.buyables[18] = new Decimal(0)

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
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '75px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '75px', }
        },
        11: {
            title() { return "<h2>Reset all content previous alt-uni 1 content, but grass-skip.<br>Req: " + formatWhole(player.gs.grassSkipReq) + " Replicanti Points" },
            canClick() { return player.cp.replicantiPoints.gte(player.gs.grassSkipReq) },
            unlocked() { return true },
            onClick() {
                player.gs.grassSkip = player.gs.grassSkip.add(player.gs.grassSkipToGet)
                player.gs.grassSkipPause = new Decimal(4)
            },
            style: { width: '400px', "min-height": '100px' },
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
            "Grass-Skip": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You are at grass-skip <h3>" + formatWhole(player.gs.grassSkip) + ". (+" + formatWhole(player.gs.grassSkipToGet) + ")"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your grass-skip boosts replicanti point multiplier by x" + format(player.gs.grassSkipEffect) + "." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Milestones"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
    ]
            },
            "Grass-Skippers": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
    ]
            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.rg.repliGrass) + "</h3> repli-grass." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 17) }
})