var treeAU2 = [["st"], ["pl", "se"], ["ir"]]
addLayer("au2", {
    name: "Alt-Universe 2: Cosmic Cosmos", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A2", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        au2Unlocked: false,

        stars: new Decimal(0),
        starsToGet: new Decimal(0),
        
        //softcap
        starSoftcapStart: new Decimal(1000000),
        starSoftcapEffect: new Decimal(1),
        starSoftcapActive: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, #5A4FCF 0%, #242124 74%)",
            "background-origin": "border-box",
            "border-color": "#270052",
        }
    },
    tooltip: "Alt-Universe 2: Cosmic Cosmos",
    color: "#5A4FCF",
    branches: ["in", "cp"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.subtabs["au2"]['stuff'] == 'Portal') {
            player.po.lastUniverse = 'au2'
            player.tab = "po"
            player.subtabs["au2"]['stuff'] = 'Main'
        }
        if (player.subtabs["au2"]['stuff'] == 'Settings') {
            player.po.lastUniverse = 'au2'
            player.tab = "settings"
            player.subtabs["au2"]['stuff'] = 'Main'
        }

        player.au2.starsToGet = Decimal.mul(player.ro.rocketParts, player.ro.activatedFuel.pow(0.3)).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(levelableEffect("st", 209)[0]).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(buyableEffect("st", 201)).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(buyableEffect("ma", 31)).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(levelableEffect("pet", 501)[0]).floor()
        // player.au2.starsToGet = player.au2.starsToGet.mul(player.le.punchcardsPassiveEffect[17]).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(buyableEffect("cof", 29)).floor()
        player.au2.starsToGet = player.au2.starsToGet.mul(levelableEffect("pu", 109)[2]).floor()

        //Star Softcap
        player.au2.starSoftcapStart = new Decimal(1000000)

        if (player.au2.starsToGet.gte(player.au2.starSoftcapStart))
        {
            player.au2.starSoftcapEffect = player.au2.starsToGet.sub(1000000).pow(Decimal.add(0.1, player.au2.starsToGet.plus(1).log10().div(50)))
            player.au2.starsToGet = player.au2.starsToGet.div(player.au2.starSoftcapEffect).add(700000)
            player.au2.starSoftcapActive = true  
        } else
        {
            player.au2.starSoftcapEffect = new Decimal(1)
            player.au2.starSoftcapActive = false  
        }

        if (player.ro.rocketIndex.eq(1)) player.au2.starsToGet = player.au2.starsToGet.mul(5)
        player.au2.starsToGet = player.au2.starsToGet.mul(player.se.starExploreEffect[0][0]).floor()
        if (hasUpgrade("fi", 23)) player.au2.starsToGet = player.au2.starsToGet.mul(upgradeEffect("fi", 23))
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "po"
            },
            style: { width: '100px', "min-height": '50px' },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["tree", treeAU2],
                ]
            },
            "Portal": {
                buttonStyle() { return { color: "black", borderRadius: "5px", borderColor: "purple", background: "linear-gradient(45deg, #8a00a9, #0061ff)"}},
                unlocked() { return true },
                content: [],
            },
            "Settings": {
                buttonStyle() { return { color: "white", borderRadius: "5px" }},
                unlocked() { return true },
                content: [],
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain " + formatWhole(player.au2.starsToGet) + " stars on reset." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && player.au2.au2Unlocked && !player.sma.inStarmetalChallenge}
})
