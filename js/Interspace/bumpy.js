addLayer("bum", {
    name: "Cere",
    symbol: "BU",
    universe: "UD",
    row: 2,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#bf00bf",
            background: "#dfffdf",
            "background-origin": "border-box",
            "border-color": "#bf00bf",
        };
    },
    tooltip: "Bumpy",
    color: "#dfffdf",
    update(delta) {
    },
    branches: ["dxp"],
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
            "Projects": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return formatWhole(new Decimal(10)) + "%" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {background: "#994d86", border: "3px solid #663366", borderRadius: "100px", width: "75px", height:"75px"}]
                        ], () => {
                            let look = {borderRadius: "50%", width: "150px", height:"150px"}
                            look.background = "conic-gradient(#dfffdf " + "36" + "deg, #180b18 0deg)"
                            return look
                        }],
                        ["blank", "25px"],
                        ["style-column", [

                            ], {background: "#994d86", borderRadius: "0px 0px 5px 5px", height:"150px"}]
                    ], {background: "#663366",border: "3px solid #663366", borderRadius: "103px 103px 8px 8px", width: "150px"}],
                    ["blank", "25px"],
                ]
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true}
})