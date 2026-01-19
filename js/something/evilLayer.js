addLayer("evil", {
    name: "Evil Layer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✺", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        celUnlocked: false,

        isInThisTab: false,
        wasInThisTab: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "black",
            background: "linear-gradient(0deg, black -100%, red 100%)",
            "background-origin": "border-box",
            "border-color": "black",
        };
    },
    tooltip: "Evil Layer",
    color: "#600080",
    update(delta) {
        let onepersec = new Decimal(1)
        player.evil.isInThisTab = player.tab == "evil"
        if (player.evil.isInThisTab && !player.evil.wasInThisTab) {
	        let items = document.getElementsByClassName("scrollCentered")
	        for (let i = 0; i < items.length; i++) {
    	        items[i].scrollLeft = (items[i].scrollWidth - items[i].clientWidth ) / 2;
    	        items[i].scrollTop = (items[i].scrollHeight - items[i].clientHeight ) / 2;
	        }
        }
        player.evil.wasInThisTab = player.evil.isInThisTab
    },
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["centered-draggable-scroll-row", [
                        ["style-column", [
                            ["style-row", [
                                ["tooltip-row", [
                                    ["raw-html", () => {return "✺"}, {color: "#408060", fontSize: "64px", marginBottom: "100px", fontFamily: "monospace"}],
                                    ["raw-html", "<div class='bottomTooltip'>A celestial is sealed here. You'll<br>need a TON of power to unleash it.</div>"],
                                ], {backgroundColor: () => {return player.evil.celUnlocked ? "#8fbfbf": "#000000"}, border: () => {return "3px solid " + (player.evil.celUnlocked ? "white": "#408060")}, borderRadius: "10px", width: "100px", minHeight: "92px", maxHeight: "92px", paddingBottom: "8px"}],
                            ], {background: "repeating-linear-gradient(45deg, #0f001f 0 15px, #150526 0 30px)", width: "4000px", height: "4000px"}],
                        ], {width: "4000px", height: "4000px"}]
                    ], {border: "3px solid #600080", width: "800px", height: "800px", flexFlow: "column", scrollLeft: "2000px"}],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return true }
})