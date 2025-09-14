
addLayer("ba", {
    name: "Battle", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Battle", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        round: new Decimal(0),
        wave: new Decimal(1),

        selectedID: new Decimal(0),
        infoTexts: [],
        celestialiteTexts: [],

        petIDs: [],
        petHealths: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        petMaxHealths: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        petDamages: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        petIndex: new Decimal(0),
        petImage: "",
        log: ["", "", "", "", "", "", "", "", "", ""],
        log2: ["", "", "", "", "", "", "", "", "", ""],

        celestialiteIDs: [],
        celestialiteImages: [],
        celestialiteNames: [],
        celestialiteHealths: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        celestialiteMaxHealths: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        celestialiteDamages: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        celestialiteIndex: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Fighting",
    color: "white",
    branches: [],
    update(delta) {
        player.ba.infoTexts = [];
        for (let i = 0; i < player.ba.petIDs.length; i++) {
            let text = "<h1>" + tmp.sme.levelables[player.ba.petIDs[i]].title + ": <br><h2>" + formatWhole(player.ba.petHealths[i]) + " HP/" + formatWhole(player.ba.petMaxHealths[i]) + " HP<br>" + formatWhole(player.ba.petDamages[i]) + " DMG<br>";
            player.ba.infoTexts.push(text);
        }
        player.ba.celestialiteTexts = [];
        for (let i = 0; i < player.ba.celestialiteIDs.length; i++) {
            let text = "<h1>" + player.ba.celestialiteNames[player.ba.celestialiteIDs[i]] + ": <br><h2>" + formatWhole(player.ba.celestialiteHealths[i]) + " HP/" + formatWhole(player.ba.celestialiteMaxHealths[i]) + " HP<br>" + formatWhole(player.ba.celestialiteDamages[i]) + " DMG<br>";
            player.ba.celestialiteTexts.push(text);
        }

        if (player.fi.inBattle) player.ba.petImage = tmp.sme.levelables[player.ba.petIDs[player.ba.petIndex]].image

        player.ba.celestialiteImages = 
        [
            "resources/battle/temporalAlpha.png",
            "resources/battle/temporalBeta.png",
            "resources/battle/temporalGamma.png",
            "resources/battle/temporalDelta.png",
        ]
        player.ba.celestialiteNames = 
        [
            "Temporal Alpha Celestialite",
            "Temporal Beta Celestialite",
            "Temporal Gamma Celestialite",
            "Temporal Delta Celestialite",
        ]

        //pet deaths

        if (player.fi.inBattle)
        {
            for (let i = 0; i < player.ba.petIDs.length; i++)
            {
                if (player.ba.petHealths[i].lte(0) && player.ba.petIDs.length > 1)
                {
                    layers.ba.petDeath(i)
                }

                if (player.ba.petHealths[i].lte(0) && player.ba.petIDs.length == 1)
                {
                    player.subtabs["ba"]["content"] = "Lose"
                    player.fi.inBattle = false
                }
            }
            //celestialite deaths
            for (let i = 0; i < player.ba.celestialiteIDs.length; i++)
            {
                if (player.ba.celestialiteHealths[i].lte(0) && player.ba.celestialiteIDs.length > 1)
                {
                    layers.ba.celestialiteDeath(i)
                }

                if (player.ba.celestialiteHealths[i].lte(0) && player.ba.celestialiteIDs.length == 1)
                {
                    layers.ba.selectCelestialites();
                    player.ba.wave = player.ba.wave.add(1)
                    player.ba.round = new Decimal(1)

                    //dont forget loot and stuff
                }
            }
            //make all timer stuff here
        }
    },
    selectCelestialites() {
        if (player.fi.battleTier.eq(1))
        {
            player.ba.celestialiteIDs = []
            let celestialiteAmount = getRandomInt(3) + 2
            for (let i = 0; i < celestialiteAmount; i++) {
                let celestialiteID = getRandomInt(4)
                player.ba.celestialiteIDs.push(celestialiteID)
            }
        }
        player.ba.celestialiteHealths = []
        player.ba.celestialiteMaxHealths = []
        player.ba.celestialiteDamages = []
        for (let i = 0; i < player.ba.celestialiteIDs.length; i++)
        {
            if (player.ba.celestialiteIDs[i] == 0)
            {
                let health = Decimal.mul(Math.random(), 50).add(75)
                let damage = Decimal.mul(Math.random(), 5).add(15)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)
            }
            if (player.ba.celestialiteIDs[i] == 1)
            {
                let health = Decimal.mul(Math.random(), 75).add(100)
                let damage = Decimal.mul(Math.random(), 7.5).add(20)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)
            }
            if (player.ba.celestialiteIDs[i] == 2)
            {
                let health = Decimal.mul(Math.random(), 60).add(125)
                let damage = Decimal.mul(Math.random(), 7.5).add(15)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)
            }
            if (player.ba.celestialiteIDs[i] == 3)
            {
                let health = Decimal.mul(Math.random(), 80).add(150)
                let damage = Decimal.mul(Math.random(), 10).add(20)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)
            }
        }
    },
    petDeath(index){
        if (player.ba.petIndex.add(1).eq(player.ba.petIDs.length)) {
            player.ba.petIndex = player.ba.petIndex.sub(1)
        }
        // Remove only the element at 'index' from each array
        player.ba.petIDs.splice(index, 1);
        player.ba.petHealths.splice(index, 1);
        player.ba.petMaxHealths.splice(index, 1);
        player.ba.petDamages.splice(index, 1);
        // All remaining elements will automatically shift down to fill the lowest indices
    },
    celestialiteDeath(index){
        if (player.ba.celestialiteIndex.add(1).eq(player.ba.celestialiteIDs.length)) {
            player.ba.celestialiteIndex = player.ba.celestialiteIndex.sub(1)
        }
        // Remove only the element at 'index' from each array
        player.ba.celestialiteIDs.splice(index, 1);
        player.ba.celestialiteHealths.splice(index, 1);
        player.ba.celestialiteMaxHealths.splice(index, 1);
        player.ba.celestialiteDamages.splice(index, 1);
        // All remaining elements will automatically shift down to fill the lowest indices
    },
    clickables: {
        1: {
            title() { return "<h2>Leave Battle" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ma.inBlackHeart = false
                player.fi.inBattle = false
                player.fi.battleTier = new Decimal(0)
                toggleOpt('menuShown')

                player.tab = "cb"

                player.ba.petHealths = []
                player.ba.petMaxHealths = []
                player.ba.petDamages = []
                player.ba.celestialiteIDs = [] 

                player.ba.petIndex = new Decimal(0)
            },
            style: { width: '200px', "min-height": '75px', 'color': "black", 'background-color': "white",},
        },
        2: {
            title() { return "<h2>->" },
            canClick() { return player.ba.petIndex.add(1).lt(player.ba.petIDs.length) },
            unlocked() { return true },
            onClick() {
                player.ba.petIndex = player.ba.petIndex.add(1)
            },
            style: { width: '75px', "min-height": '75px', 'color': "black",},
        },
        3: {
            title() { return "<h2><-" },
            canClick() { return player.ba.petIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.ba.petIndex = player.ba.petIndex.sub(1)
            },
            style: { width: '75px', "min-height": '75px', 'color': "black",},
        },
        4: {
            title() { return "<img src='" + player.ba.petImage + "'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
            },
            style: { width: '150px', "min-height": '150px', 'color': "black",},
        },
        5: {
            title() { return "<h2>->" },
            canClick() { return player.ba.celestialiteIndex.add(1).lt(player.ba.celestialiteIDs.length) },
            unlocked() { return true },
            onClick() {
                player.ba.celestialiteIndex = player.ba.celestialiteIndex.add(1)
            },
            style: { width: '75px', "min-height": '75px', 'color': "black",},
        },
        6: {
            title() { return "<h2><-" },
            canClick() { return player.ba.celestialiteIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.ba.celestialiteIndex = player.ba.celestialiteIndex.sub(1)
            },
            style: { width: '75px', "min-height": '75px', 'color': "black",},
        },
        7: {
            title() { return "<img src='" + player.ba.celestialiteImages[player.ba.celestialiteIDs[player.ba.celestialiteIndex]] + "'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
            },
            style: { width: '150px', "min-height": '150px', 'color': "black",},
        },
    },
    levelables: {
    },
    bars: {
        healthBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.fi.inBattle ? player.ba.petHealths[player.ba.petIndex].div(player.ba.petMaxHealths[player.ba.petIndex]) : new Decimal(0)
            },
            fillStyle: {
                "background-color": "hsla(9, 89%, 25%, 1.00)",
            },
            display() {
                return "<h5>" + format(player.ba.petHealths[player.ba.petIndex]) + "/" + format(player.ba.petMaxHealths[player.ba.petIndex]) + "<h5> HP.</h5>";
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
        },
        celestialiteHealthBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.fi.inBattle ? player.ba.celestialiteHealths[player.ba.celestialiteIndex].div(player.ba.celestialiteMaxHealths[player.ba.celestialiteIndex]) : new Decimal(0)
            },
            fillStyle: {
                "background-color": "#073b77",
            },
            display() {
                return "<h5>" + format(player.ba.celestialiteHealths[player.ba.celestialiteIndex]) + "/" + format(player.ba.celestialiteMaxHealths[player.ba.celestialiteIndex]) + "<h5> HP.</h5>";
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
        },
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        content: {
            "Main": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                        ["raw-html", function () { return "Round " + formatWhole(player.ba.round) + ", Wave " + formatWhole(player.ba.wave) }, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["style-row", [
                        ["style-column", [
                           ["always-scroll-column", [
                           ["raw-html", function () { return "<br><br><br>" + player.ba.infoTexts.join("<br>") }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
                        ], {width: "300px", height: "300px", backgroundImage: "linear-gradient(90deg, #220d04ff, #4b0e07ff)", border: "0px solid rgb(218, 218, 218)", borderBottom: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                           ["style-column", [
                        ["raw-html", () => `
                        <div style="width:296px;height:368px;text-align:center;margin:10px auto;background:#000000;border:2px solid #888;border-radius:0px;padding:12px 0;">
                        ${player.ba.log.map((x, i) => `<span style="display:block;">${x}</span>`).join("")}
                        </div>
                        `],
                        ], {width: "300px", height: "400px", backgroundImage: "linear-gradient(-90deg, #220d04ff, #1d0401ff)", border: "0px solid rgb(218, 218, 218)", borderRight: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ], {width: "300px", height: "700px", backgroundImage: "linear-gradient(-90deg, #85300fff, #85300fff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ["style-column", [
                        ["row", [["clickable", 4],]],
                        ["blank", "25px"],
                        ["raw-html", function () { return tmp.sme.levelables[player.ba.petIDs[player.ba.petIndex]].title }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["bar", "healthBar"]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return formatWhole(player.ba.petIndex.add(1)) + "/" + formatWhole(player.ba.petIDs.length) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 3],["clickable", 2],]],
                        ], {width: "600px", height: "700px", backgroundImage: "linear-gradient(-90deg, #85300fff, #4b1703ff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ["style-column", [
                        ["row", [["clickable", 7],]],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.ba.celestialiteNames[player.ba.celestialiteIDs[player.ba.celestialiteIndex]] }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["bar", "celestialiteHealthBar"]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return formatWhole(player.ba.celestialiteIndex.add(1)) + "/" + formatWhole(player.ba.celestialiteIDs.length) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 6],["clickable", 5],]],
                        ], {width: "600px", height: "700px", backgroundImage: "linear-gradient(-90deg, #4b1703ff, #85300fff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ["style-column", [
                           ["always-scroll-column", [
                           ["raw-html", function () { return "<br><br><br>" + player.ba.celestialiteTexts.join("<br>") }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
                        ], {width: "298px", height: "300px", backgroundImage: "linear-gradient(-90deg, #03172eff, #0b284bff)", border: "0px solid rgb(218, 218, 218)", borderLeft: "3px solid rgb(218, 218, 218)", borderBottom: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                           ["style-column", [
                        ["raw-html", () => `
                        <div style="width:296px;height:368px;text-align:center;margin:10px auto;background:#000000;border:2px solid #888;border-radius:0px;padding:12px 0;">
                        ${player.ba.log2.map((x, i) => `<span style="display:block;">${x}</span>`).join("")}
                        </div>
                        `],
                        ], {width: "300px", height: "400px", backgroundImage: "linear-gradient(-90deg, #220d04ff, #1d0401ff)", border: "0px solid rgb(218, 218, 218)", borderRight: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ], {width: "300px", height: "700px", backgroundImage: "linear-gradient(-90deg, #85300fff, #692205ff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ], {width: "1800px", height: "700px", backgroundImage: "linear-gradient(-90deg, #85300fff, #85300fff)", border: "3px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ["blank", "25px"],
                        ["row", [["clickable", 1],]],
                ],
            },
            "Lose": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                        ["raw-html", function () { return "You Lost" }, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 1],]],
                ],
            },
        },
    },
    tabFormat: [
        ["blank", "10px"],
        ["buttonless-microtabs", "content", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true }
})
function logPrintBattle(line) {
    player.ba.log.push(line); // Push the raw HTML string directly
    if (player.ba.log.length > 20) player.ba.log.shift(); // Ensure log size remains consistent
}
function logPrintCelestialite(line) {
    player.ba.log2.push(line); // Push the raw HTML string directly
    if (player.ba.log2.length > 20) player.ba.log2.shift(); // Ensure log size remains consistent
}