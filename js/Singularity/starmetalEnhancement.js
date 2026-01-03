addLayer("smn", {
    name: "Starmetal Enhancement",
    symbol: "SMN",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        enhancePoints: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            //background: "linear-gradient(180deg, #e64545 0%, #d95798 25%, #cc7ee6 50%, #7390e6, 75%,  #60ebc8 100%)",
            background: "linear-gradient(120deg, #bf9a32 0%, #eb609a 50%, #d460eb 100%)",
            "background-origin": "border-box",
            "border-color": "#282363",
            "color": "#282363",
        };
    },
    tooltip: "Starmetal Enhancement",
    color: "#d460eb",
    update(delta) {
        

    },
    branches: ["ma", "sma"],
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
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Armory": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    
                ]
            },
            "Infusion": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + formatWhole(player.smn.enhancePoints) + "</h3> enhance points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && true}
})