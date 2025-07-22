var treeCH = [["ch"]]
addLayer("ch", {
    name: "Hall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CH", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        celestialIndex: new Decimal(0),
        celestialTexts: ["", "", "",],
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #8801aa 0%, #0260fe 100%)",
            "background-origin": "border-box",
            "border-color": "#2e0054",
        }
    },
    tooltip: "Hall",
    color: "#0260fe",
    branches: ["cp"],
    update(delta) {
        let onepersec = new Decimal(1)
        
        player.ch.celestialTexts = [
            "Tav, the Celestial of Limits",
            "Cante, the Celestial of Replicanti",
            "Jocus, the Celestial of Law",
        ]
    },
    clickables: {
        11: {
            title() { return "<h1>→" },
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return "Tav, the Celestial of Limits" },
            onClick() {
                player.ch.celestialIndex = new Decimal(0)
            },
            style: { width: '50px', "min-height": '50px' }, //tav
            branches: [12]
        },
        12: {
            title() { return "<h1>Ξ" },
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return "Cante, the Celestial of Replicanti" },
            onClick() {
                player.ch.celestialIndex = new Decimal(1)
            },
            style: { width: '50px', "min-height": '50px' }, //cante
        },
        13: {
            title() { return "<h1>☻" },
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return "Jocus, the Celestial of Fun" },
            onClick() {
                player.ch.celestialIndex = new Decimal(2)
            },
            style: { width: '50px', "min-height": '50px' }, //jocus
            branches: [11]
        },
        14: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                //player.ch.celestialIndex = new Decimal(2)
            },
            style: { width: '50px', "min-height": '50px' }, //matos
        },
        15: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                //player.ch.celestialIndex = new Decimal(2)
            },
            style: { width: '50px', "min-height": '50px' }, //aleph
        },
        16: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                //player.ch.celestialIndex = new Decimal(2)
            },
            style: { width: '50px', "min-height": '50px' }, //zar
        },
        17: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                //player.ch.celestialIndex = new Decimal(2)
            },
            style: { width: '50px', "min-height": '50px' }, //iridite
        },
        18: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                //player.ch.celestialIndex = new Decimal(2)
            },
            style: { width: '50px', "min-height": '50px' }, //tera
        },
        19: {
            title() { return "<h1>☉" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
                //player.ch.celestialIndex = new Decimal(2)
            },
            style: { width: '75px', "min-height": '75px' }, //nova
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Tav, the Celestial of Limits",
            body() { return "I have recently met Tav. Turns out, he is the nicest celestial I have ever met. This is strange, especially since Tav is a rare type of celestial where the celestial originates as a celestial, instead of being a different lifeform that got transformed into a celestial. Tav was created in order to protect against Cante, who is another celestial. Me and Cante have a very complicated relationship. We were supposed to design a superphysical universe together, but Cante's greed and exponentially rising power led him to cause it's destruction. As a result the original seven was forced to create Tav in order to oppose Cante's powers, and along with Tav came the barrier." },
            unlocked() { return player.ch.celestialIndex.eq(0) },      
        },
        2: {
            title: "Cante, the Celestial of Replicanti",
            body() { return "Cante, Cante, Cante... That is a name I will never forget. We used to be great friends, when he was a part of the original seven. We were supposed to design the ideal superphysical universe. It was a universe that contained the most powerful of all superphysical values. But once we finished, Cante took matters into his own hands. He decided to take a portion of the superphysical values from our universe and run away. Without Cante's support, the universe fell apart into ruin. Cante's power exponentially rose, as well as his greed. The higher celestials were forced to seal Cante away using Tav, the celestial of limits. Cante's power should decrease..." },
            unlocked() { return player.ch.celestialIndex.eq(1) },      
        },
        3: {
            title: "Jocus, the Celestial of Fun",
            body() { return "When I first met Jocus, one thing that stood out is their extreme insanity. I don't understand anything about this guy, but all I know is that Jocus idolizes Cante a little bit too much, despite being Nova's servant. I still don't know much about Jocus... seems like a normal celestial that lost it's mind over time." },
            unlocked() { return player.ch.celestialIndex.eq(2) },      
        },
    },
    microtabs: {
        stuff: {
            "Hall": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["row", [["raw-html", function () { return "Celestial Constellation #1 - ????, the Celestial of ???????????" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 12], ]],
                    ["blank", "12.5px"],
                    ["row", [["clickable", 13], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["clickable", 14],]],
                    ["blank", "6.125px"],
                    ["row", [["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "0px", "font-family": "monospace" }],  ["clickable", 19],]],
                    ["blank", "6.125px"],
                    ["row", [["clickable", 15], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["clickable", 16],]],
                    ["blank", "12.5px"],
                    ["row", [["clickable", 17], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 18], ]],
                    ["blank", "25px"],
                    ["infobox", 1],
                    ["infobox", 2],
                    ["infobox", 3],
                    //NOTE: REMEMBER TO KEEP PASTING THIS INTO MENULAYERS.JS
                ]
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && player.fu.defeatedJocus && !player.sma.inStarmetalChallenge}
})
