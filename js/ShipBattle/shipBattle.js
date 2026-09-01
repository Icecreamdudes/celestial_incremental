addLayer("shipBattle", {
    name: "Ship Battle", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✦", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "SB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        shipType: "cruiser",
        
        theme: {
            primaryColor: "#5e4ee6",
            secondaryColor: "#37078f",
            backgroundColor: "#151230",
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "#151230",
            backgroundOrigin: "border-box",
            borderColor: "#5e4ee6",
            color: "#eaf6f7",
        };
    },
    tooltip: "Ship Battle",
    branches: [],
    color: "#ffffff",
    update(delta) {
        let onepersec = new Decimal(1)

        // UI THEMES - DEPENDENT ON TAB
        switch (player.tab) {
            case "ir": {
                player.shipBattle.theme = {
                    primaryColor: "#5e4ee6",
                    secondaryColor: "#37078f",
                    backgroundColor: "#151230",
                    primaryTextColor: "#ffffff",
                    secondaryTextColor: "#aaa2f2",
                }
            break;}
            case "bl": {
                player.shipBattle.theme = {
                    primaryColor: "#f57171",
                    secondaryColor: "#4f1818",
                    backgroundColor: "#260b0b",
                    primaryTextColor: "#ffffff",
                    secondaryTextColor: "#f2cbcb",
                }
            break;}
            case "cbs": {
                player.shipBattle.theme = {
                    primaryColor: "#3383ab",
                    secondaryColor: "#064666",
                    backgroundColor: "#032333",
                    primaryTextColor: "#ffffff",
                    secondaryTextColor: "#c6f7ff",
                }
            break;}
            default: {
                player.shipBattle.theme = {
                    primaryColor: "#5e4ee6",
                    secondaryColor: "#37078f",
                    backgroundColor: "#151230",
                    primaryTextColor: "#ffffff",
                    secondaryTextColor: "#aaa2f2",
                }
            break;}
        }

    },
    clickables: {
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {
    },
    tabFormat: [
    ],
    layerShown() {return player.startedGame == true},
})