addLayer("rm", {
    name: "RM", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RM", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        blankMods: new Decimal(0),
        blankModsToGet: new Decimal(0),
    }
    },
    automate() {

    },
    nodeStyle() {
        return {
            "background-image": "linear-gradient(0deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)",
            "background-origin": "border-box",
            "color": "white",
        }
    },
    tooltip: "Mods",
    color: "grey",
    update(delta) {
        let onepersec = new Decimal(1)

        player.rm.blankModsToGet = player.m.mods.pow(0.01).add(1)
    },
    branches: ["m", "cb"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "i"
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
            "Main": {
                buttonStyle() { return { 'color': 'grey' } },
                unlocked() { return true },
                content:
                [
                ]
            },
        },
    }, 

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.rm.blankMods) + "</h3> Blank Mods" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.m.codeExperienceToGet.gt(1) ? "You will gain <h3>" + format(player.rm.blankModsToGet) + "</h3> blank mods on reset." : ""}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],

                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.po.realmMods}
})
/*        codeExperience: new Decimal(0),
        codeExperienceToGet: new Decimal(0),
        codeExperiencePause: new Decimal(0),

        linesOfCode: new Decimal(0),
        linesOfCodePerSecond: new Decimal(0),

        mods: new Decimal(0),
        modsEffect: new Decimal(1),
        modsToGet: new Decimal(1),
        modsReq: new Decimal(100),

        modSoftcap: new Decimal(1),
        modSoftcapStart: new Decimal(10),*/