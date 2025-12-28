addLayer("ans", {
    name: "Anti-Singularity",
    symbol: "AS",
    row: 3,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#005f5f",
            background: "#dfffdf",
            "background-origin": "border-box",
            "border-color": "#005f5f",
        };
    },
    tooltip: "Anti-Singularity",
    color: "#dfffdf",
    update(delta) {
        

    },
    branches: ["ans"],
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
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return player.cer.cereUnlocked ? "The product of your abstract values is <h3>" + format(player.cer.abstractProduct) + "</h3>." : ""}, {color: "#ff7fbf", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true}
})