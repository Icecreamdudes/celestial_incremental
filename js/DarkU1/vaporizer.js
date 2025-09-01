
addLayer("dv", {
    name: "Vaporizer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(150deg,rgb(122, 122, 122) 0%,rgb(233, 233, 233) 50%,rgb(122, 122, 122) 100%)",
            "background-origin": "border-box",
            "border-color": "rgb(255, 255, 255)",
            "color": "black",
        };
    },
    tooltip: "Normality",
    branches: ["dgr"],
    color: "rgba(193, 223, 0)",
    update(delta) {
        let onepersec = new Decimal(1)

    },
    bars: {
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "du"
            },
            style: { width: '100px', "min-height": '50px', color: "black" },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.dn.nMax == false },
            unlocked() { return true },
            onClick() {
                player.dn.nMax = true
            },
            style: { width: '75px', "min-height": '50px', color: "black" }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.dn.nMax == true  },
            unlocked() { return true },
            onClick() {
                player.dn.nMax = false
            },
            style: { width: '75px', "min-height": '50px', color: "black" }
        },
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
                buttonStyle() { return { 'border-color': 'black' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "COMING SOON! (How did you even get here?)"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ]

            },
        },
    },

    tabFormat: [
         ["raw-html", function () { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["raw-html", function () { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, { "color": "#FEEF5F", "font-size": "20px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
         ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return hasUpgrade("le", 102) }
})