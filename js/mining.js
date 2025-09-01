addLayer("mi", {
    name: "Mining", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        miningLevel: new Decimal(0),
        miningXP: new Decimal(0),
        miningXPReq: new Decimal(100),
        miningResources: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0, new Decimal(0), new Decimal(0), new Decimal(0))], //Stone, Dirt, Coal, Copper, Iron, Gold, Platinum
        //next update: titanium, uranium, plutonium 
        //gems for next update: topaz, ruby, sapphire, emerald, diamond
        miningBars: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], //Copper, Iron, Gold, Platinum
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(90deg,rgba(102, 229, 255, 1) 0%, rgba(250, 244, 62, 1) 100%)",
            "background-origin": "border-box",
            "border-color": "rgb(63, 98, 253)",
        };
    },
    tooltip: "Mining",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["ro", "ca"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
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
            "Mines": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                ]

            },
            "Smelting": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                ]

            },
        },
    },

    tabFormat: [
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("ev8", 23) }
})
