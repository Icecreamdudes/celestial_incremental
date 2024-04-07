addLayer("ps", {
    name: "Pet Shop", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PS", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        priceResetTimer: new Decimal(0),
        priceResetTimerMax: new Decimal(21600),

        commonPetPrices: [new Decimal(5), new Decimal(5),new Decimal(5),new Decimal(5),new Decimal(5)],
        uncommonPetPrices: [new Decimal(15),new Decimal(15),new Decimal(15),new Decimal(15),new Decimal(15)],

        commonPetsBought: new Decimal(0),
        uncommonPetsBought: new Decimal(0),

        commonDisplay: [],
        commonDisplayIndex: new Decimal(0),

        uncommonDisplay: [],
        uncommonDisplayIndex: new Decimal(0),

        unlockedMisc: false,

        miscIndex: new Decimal(0),
        miscDisplay: [],

        evoShardsBought: new Decimal(0),
        evoShardsCost: new Decimal(100),

        crate1Bought: new Decimal(0),
        crate1Cost: new Decimal(6),

        crate2Bought: new Decimal(0),
        crate2Cost: new Decimal(20),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Pet Shop",
    color: "#06366e",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ps.priceResetTimerMax = new Decimal(21600)
        player.ps.priceResetTimer = player.ps.priceResetTimer.sub(onepersec.mul(delta))

        player.ps.commonDisplay = [
        "Gwa cost: " + format(player.ps.commonPetPrices[0]),
        "Egg Guy cost: " + format(player.ps.commonPetPrices[1]),
        "Unsmith cost: " + format(player.ps.commonPetPrices[2]),
        "Gd Checkpoint cost: " + format(player.ps.commonPetPrices[3]),
        "Slax cost: " + format(player.ps.commonPetPrices[4]),
        ]

        player.ps.uncommonDisplay = [
            "Teste cost: " + format(player.ps.uncommonPetPrices[0]),
            "Star cost: " + format(player.ps.uncommonPetPrices[1]),
            "Normal Face cost: " + format(player.ps.uncommonPetPrices[2]),
            "Shark cost: " + format(player.ps.uncommonPetPrices[3]),
            "THE WATCHING EYE cost: " + format(player.ps.uncommonPetPrices[4]),
        ]

        player.ps.commonPetPrices = [new Decimal(5), new Decimal(5),new Decimal(5),new Decimal(5),new Decimal(5)]
        for (let i = 0; i < player.ps.commonPetPrices.length; i++)
        {
            player.ps.commonPetPrices[i] = player.ps.commonPetPrices[i].add(player.ps.commonPetsBought)
        }
        
        player.ps.uncommonPetPrices = [new Decimal(15),new Decimal(15),new Decimal(15),new Decimal(15),new Decimal(15)]
        for (let i = 0; i < player.ps.uncommonPetPrices.length; i++)
        {
            player.ps.uncommonPetPrices[i] = player.ps.uncommonPetPrices[i].add(player.ps.uncommonPetsBought.mul(3))
        }

        if (player.cb.level.gte(65)) player.ps.unlockedMisc = true

        player.ps.evoShardsCost = new Decimal(250)
        player.ps.evoShardsCost = player.ps.evoShardsCost.add(player.ps.evoShardsBought.mul(50))

        player.ps.crate1Cost = new Decimal(6)
        player.ps.crate1Cost = player.ps.crate1Cost.add(player.ps.crate1Bought.mul(3))

        player.ps.crate2Cost = new Decimal(20)
        player.ps.crate2Cost = player.ps.crate2Cost.add(player.ps.crate2Bought.mul(5))

        player.ps.miscDisplay = [
            "Evo shard cost: " + format(player.ps.evoShardsCost),
            "Crate 1 cost: " + format(player.ps.crate1Cost),
            "Crate 2 cost: " + format(player.ps.crate2Cost),
        ]
    },
    resetPrices()
    {
        player.ps.commonPetsBought = new Decimal(0)
        player.ps.uncommonPetsBought = new Decimal(0)
        player.ps.evoShardsBought = new Decimal(0)
        player.ps.crate1Bought = new Decimal(0)
        player.ps.crate2Bought = new Decimal(0)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "cb"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return player.ps.priceResetTimer.gt(0) ? "<h3>Check back in <br>" + formatTime(player.ps.priceResetTimer) + "." : "<h3>Reset Shop Prices"},
            canClick() { return player.ps.priceResetTimer.lt(0) },
            unlocked() { return player.ps.priceResetTimer },
            onClick() {
                layers.ps.resetPrices();
                player.ps.priceResetTimer = player.ps.priceResetTimerMax
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        21: {
            title() { return "<img src='resources/evoShard.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc },
            onClick() {
                player.ps.miscIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        22: {
            title() { return "Buy Evo Shard" },
            canClick() { return player.cb.petPoints.gte(player.ps.evoShardsCost) },
            unlocked() { return player.ps.miscIndex == 0 },
            onClick() {
                player.ps.evoShardsBought = player.ps.evoShardsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.evoShardsCost)
                player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                callAlert("You gained an Evolution Shard!", "resources/evoShard.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        23: {
            title() { return "Crate 1" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc },
            onClick() {
                player.ps.miscIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        24: {
            title() { return "Buy Crate 1" },
            canClick() { return player.cb.petPoints.gte(player.ps.crate1Cost) },
            unlocked() { return player.ps.miscIndex == 1 },
            tooltip() { return "27% - Gwa<br>22% - Egg Guy<br>17% - Unsmith<br>16% - Gd Checkpoint<br>13% - Slax<br>5% - Teste"},
            onClick() {
                player.ps.crate1Bought = player.ps.crate1Bought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.crate1Cost)
                layers.cb.petButton1();
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        25: {
            title() { return "Crate 2" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc },
            onClick() {
                player.ps.miscIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        26: {
            title() { return "Buy Crate 2" },
            canClick() { return player.cb.petPoints.gte(player.ps.crate2Cost) },
            unlocked() { return player.ps.miscIndex == 2 },
            tooltip() { return "7% - Gwa<br>7% - Egg Guy<br>7% - Unsmith<br>7% - Gd Checkpoint<br>7% - Slax<br>11% - Teste<br>12% - Star<br>12% - Normal Face<br>12% - Shark<br>12% - THE WATCHING EYE<br>7% - Nova"},
            onClick() {
                player.ps.crate2Bought = player.ps.crate2Bought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.crate2Cost)
                layers.cb.petButton2();
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        101: {
            title() { return player.cb.commonPetImage[0] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.commonDisplayIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        102: {
            title() { return player.cb.commonPetImage[1] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.commonDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        103: {
            title() { return player.cb.commonPetImage[2] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.commonDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        104: {
            title() { return player.cb.commonPetImage[3] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.commonDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        105: {
            title() { return player.cb.commonPetImage[4] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.commonDisplayIndex = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        106: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.commonPetPrices[0]) },
            unlocked() { return player.ps.commonDisplayIndex == 0 },
            onClick() {
                player.ps.commonPetsBought = player.ps.commonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.commonPetPrices[0])
                player.cb.commonPetAmounts[0] = player.cb.commonPetAmounts[0].add(1);
                callAlert("You gained a Gwa!", "resources/gwaCommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        107: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.commonPetPrices[1]) },
            unlocked() { return player.ps.commonDisplayIndex == 1 },
            onClick() {
                player.ps.commonPetsBought = player.ps.commonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.commonPetPrices[1])
                player.cb.commonPetAmounts[1] = player.cb.commonPetAmounts[1].add(1);
                callAlert("You gained an Egg Guy!", "resources/eggCommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        108: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.commonPetPrices[2]) },
            unlocked() { return player.ps.commonDisplayIndex == 2 },
            onClick() {
                player.ps.commonPetsBought = player.ps.commonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.commonPetPrices[2])
                player.cb.commonPetAmounts[2] = player.cb.commonPetAmounts[2].add(1);
                callAlert("You gained an Unsmith!", "resources/unsmithCommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        109: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.commonPetPrices[3]) },
            unlocked() { return player.ps.commonDisplayIndex == 3 },
            onClick() {
                player.ps.commonPetsBought = player.ps.commonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.commonPetPrices[0])
                player.cb.commonPetAmounts[3] = player.cb.commonPetAmounts[3].add(1);
                callAlert("You gained a Gd Checkpoint!", "resources/checkpointCommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        111: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.commonPetPrices[4]) },
            unlocked() { return player.ps.commonDisplayIndex == 4 },
            onClick() {
                player.ps.commonPetsBought = player.ps.commonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.commonPetPrices[4])
                player.cb.commonPetAmounts[4] = player.cb.commonPetAmounts[4].add(1);
                callAlert("You gained a Slax!", "resources/slaxCommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        201: {
            title() { return player.cb.uncommonPetImage[0] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.uncommonDisplayIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        202: {
            title() { return player.cb.uncommonPetImage[1] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.uncommonDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        203: {
            title() { return player.cb.uncommonPetImage[2] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.uncommonDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        204: {
            title() { return player.cb.uncommonPetImage[3] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.uncommonDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        205: {
            title() { return player.cb.uncommonPetImage[4] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ps.uncommonDisplayIndex = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        206: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.uncommonPetPrices[0]) },
            unlocked() { return player.ps.uncommonDisplayIndex == 0 },
            onClick() {
                player.ps.uncommonPetsBought = player.ps.uncommonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.uncommonPetPrices[0])
                player.cb.uncommonPetAmounts[0] = player.cb.uncommonPetAmounts[0].add(1);
                callAlert("You gained a Teste!", "resources/testeUncommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        207: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.uncommonPetPrices[1]) },
            unlocked() { return player.ps.uncommonDisplayIndex == 1 },
            onClick() {
                player.ps.uncommonPetsBought = player.ps.uncommonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.uncommonPetPrices[1])
                player.cb.uncommonPetAmounts[1] = player.cb.uncommonPetAmounts[1].add(1);
                callAlert("You gained a Star!", "resources/starUncommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        208: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.uncommonPetPrices[2]) },
            unlocked() { return player.ps.uncommonDisplayIndex == 2 },
            onClick() {
                player.ps.uncommonPetsBought = player.ps.uncommonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.uncommonPetPrices[2])
                player.cb.uncommonPetAmounts[2] = player.cb.uncommonPetAmounts[2].add(1);
                callAlert("You gained a Normal Face!", "resources/normalFaceUncommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        209: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.uncommonPetPrices[3]) },
            unlocked() { return player.ps.uncommonDisplayIndex == 3 },
            onClick() {
                player.ps.uncommonPetsBought = player.ps.uncommonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.uncommonPetPrices[0])
                player.cb.uncommonPetAmounts[3] = player.cb.uncommonPetAmounts[3].add(1);
                callAlert("You gained a Shark!", "resources/sharkUncommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        211: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.uncommonPetPrices[4]) },
            unlocked() { return player.ps.uncommonDisplayIndex == 4 },
            onClick() {
                player.ps.uncommonPetsBought = player.ps.uncommonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.uncommonPetPrices[4])
                player.cb.uncommonPetAmounts[4] = player.cb.uncommonPetAmounts[4].add(1);
                callAlert("You gained THE WATCHING EYE!", "resources/eyeUncommonPet.png");
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
    },
    bars: {
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
            "Miscellaneous": {
                buttonStyle() { return { 'color': 'white', 'border-color': 'white'  } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["raw-html", function () { return !player.ps.unlockedMisc ? "Unlocks at check back level 65!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 22], ["clickable", 24], ["clickable", 26]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ps.miscDisplay[player.ps.miscIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 21], ["clickable", 23], ["clickable", 25]]],
                ]

            },
            "Common": {
                buttonStyle() { return { 'color': '#9bedff', 'border-color': '#9bedff'  } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["clickable", 11]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 106], ["clickable", 107], ["clickable", 108], ["clickable", 109], ["clickable", 111]]],
                        ["blank", "25px"],
        ["raw-html", function () { return player.ps.commonDisplay[player.ps.commonDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "25px"],
                        ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105]]],
                ]

            },
            "Uncommon": {
                buttonStyle() { return { 'color': '#88e688', 'border-color': '#88e688'  } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 206], ["clickable", 207], ["clickable", 208], ["clickable", 209], ["clickable", 211]]],
                    ["blank", "25px"],
    ["raw-html", function () { return player.ps.uncommonDisplay[player.ps.uncommonDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
    ["blank", "25px"],
                    ["row", [["clickable", 201], ["clickable", 202], ["clickable", 203], ["clickable", 204], ["clickable", 205]]],
                ]

            },
        },
    }, 

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.cb.petPoints) + "</h3> pet points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return false }
})