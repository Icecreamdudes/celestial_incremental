addLayer("smn", {
    name: "Starmetal Enhancement",
    symbol: "SMN",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #dec88c 0%, #ffb3d1 50%, #f2b3ff 100%)",
            "background-origin": "border-box",
            "border-color": "#993667",
            "color": "#993667",
        };
    },
    tooltip: "Starmetal Enhancement",
    color: "#993667",
    update(delta) {
        

    },
    branches: ["cer"],
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
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return false && player.startedGame == true}
})