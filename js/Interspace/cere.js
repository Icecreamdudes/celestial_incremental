addLayer("cer", {
    name: "Cere",
    symbol: "⇕",
    universe: "UD",
    row: 4,
    position: 0,
    startData() { return {
        unlocked: true,

        cereUnlocked: false,
        transfiguratorPower: new Decimal(0),
        transfiguratorPowerBest: new Decimal(0),
        transfiguratorPowerSpendable: new Decimal(0),
        transfiguratorLayersEnabled: [false, false, false, false],

        rebootCooldown: new Decimal(0),
        rebootCooldownSpeed: new Decimal(1),

        abstractProduct: new Decimal(0),
        abstractEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#ff7fbf",
            background: "#ffdfef",
            "background-origin": "border-box",
            "border-color": "#ff7fbf",
        };
    },
    tooltip: "Cere, the Celestial of Cycles",
    color: "#ffdfef",
    update(delta) {
    },
    branches: [],
    clickables: {
        1: {
            title() { return "<h2>" + (player.cer.cereUnlocked ? (this.canClick() ? "Tier-up the transfigurator to tier " + formatWhole(player.cer.transfiguratorPower.add(1)): "Insufficient resources to tier-up") : "DESTROY CERE'S CORE") + "</h2>" },
            canClick() { return player.in.infinities.gte(new Decimal(1e16).mul(new Decimal(100).pow(player.cer.transfiguratorPower))) && player.cof.coreFragments[3].gte(new Decimal(1e3).mul(new Decimal(4).pow(player.cer.transfiguratorPower))) && player.cer.abstractProduct.gte(new Decimal(1e12).mul(new Decimal(1e12).pow(player.cer.transfiguratorPower.pow(2))).div(1e12).sub(1))},
            unlocked() { return true },
            onClick() {
                player.cer.cereUnlocked = true
                player.cer.transfiguratorPower = player.cer.transfiguratorPower.add(1)
                player.cer.transfiguratorPowerSpendable = player.cer.transfiguratorPowerSpendable.add(1)
                if (player.cer.transfiguratorPower.gt(player.cer.transfiguratorPowerBest)) player.cer.transfiguratorPowerBest = player.cer.transfiguratorPower;
            },
            style() {
                let look = {width: "600px", minHeight: "75px", borderRadius: "0px 0px 5px 5px", color: "black"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffdfef"
                } else {
                    look.background = "#bf8f8f"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Cycle": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                ]
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return player.cer.cereUnlocked ? "The product of your abstract values is <h3>" + format(player.cer.abstractProduct) + ".</h3>" : ""}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.cer.cereUnlocked ? "Boosts negative infinity points by ^" + format(player.cer.abstractEffect) + "" : "" }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && false}
})