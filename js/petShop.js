addLayer("ps", {
    name: "Pet Shop", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PS", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        priceResetTimer: new Decimal(0),
        priceResetTimerMax: new Decimal(21600),

        commonPetPrices: [new Decimal(8), new Decimal(8),new Decimal(8),new Decimal(8),new Decimal(8), new Decimal(8),new Decimal(8), new Decimal(8),new Decimal(8)],
        uncommonPetPrices: [new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25)],
        rarePetPrices: [new Decimal(200),new Decimal(200),new Decimal(200),new Decimal(200),new Decimal(200),new Decimal(200),new Decimal(200),],

        commonPetsBought: new Decimal(0),
        uncommonPetsBought: new Decimal(0),
        rarePetsBought: new Decimal(0),

        commonDisplay: [],
        commonDisplayIndex: new Decimal(0),

        uncommonDisplay: [],
        uncommonDisplayIndex: new Decimal(0),

        rareDisplay: [],
        rareDisplayIndex: new Decimal(0),

        unlockedMisc: false,
        unlockedMisc2: false,
        togglealert: true,

        miscIndex: new Decimal(0),
        miscDisplay: [],

        evoShardsBought: new Decimal(0),
        evoShardsCost: new Decimal(250),

        paraShardsBought: new Decimal(0),
        paraShardsCost: new Decimal(5000),

        crate1Bought: new Decimal(0),
        crate1Cost: new Decimal(6),

        crate2Bought: new Decimal(0),
        crate2Cost: new Decimal(20),

        crate3Bought: new Decimal(0),
        crate3Cost: new Decimal(35),

        crate4Bought: new Decimal(0),
        crate4Cost: new Decimal(150),

        crate5Bought: new Decimal(0),
        crate5Cost: new Decimal(50),

        crate6Bought: new Decimal(0),
        crate6Cost: new Decimal(200),
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
            "Spider cost: " + format(player.ps.commonPetPrices[5]),
            "Blob cost: " + format(player.ps.commonPetPrices[6]),
            "Replicator cost: " + format(player.ps.commonPetPrices[7]),
            "Smoke cost: " + format(player.ps.commonPetPrices[8]),
        ]

        player.ps.uncommonDisplay = [
            "Teste cost: " + format(player.ps.uncommonPetPrices[0]),
            "Star cost: " + format(player.ps.uncommonPetPrices[1]),
            "Normal Face cost: " + format(player.ps.uncommonPetPrices[2]),
            "Shark cost: " + format(player.ps.uncommonPetPrices[3]),
            "THE WATCHING EYE cost: " + format(player.ps.uncommonPetPrices[4]),
            "Clock cost: " + format(player.ps.uncommonPetPrices[5]),
            "Trollface cost: " + format(player.ps.uncommonPetPrices[6]),
            "Infinity Breaker cost: " + format(player.ps.uncommonPetPrices[7]),
            "John cost: " + format(player.ps.uncommonPetPrices[8]),
        ]

        player.ps.rareDisplay = [
            "Nova cost: " + format(player.ps.rarePetPrices[0]),
            "Dice cost: " + format(player.ps.rarePetPrices[1]),
            "Drippy Ufo cost: " + format(player.ps.rarePetPrices[2]),
            "Goofy Ahh Thing cost: " + format(player.ps.rarePetPrices[3]),
            "Antimatter cost: " + format(player.ps.rarePetPrices[4]),
            "Hex Shadow cost: " + format(player.ps.rarePetPrices[5]),
            "Grass Square cost: " + format(player.ps.rarePetPrices[6]),
        ]

        player.ps.commonPetPrices = [new Decimal(10), new Decimal(10),new Decimal(10),new Decimal(10),new Decimal(10), new Decimal(10),new Decimal(10),new Decimal(10),new Decimal(10)]
        for (let i = 0; i < player.ps.commonPetPrices.length; i++)
        {
            player.ps.commonPetPrices[i] = player.ps.commonPetPrices[i].add(player.ps.commonPetsBought.mul(2))
        }

        player.ps.uncommonPetPrices = [new Decimal(30),new Decimal(30),new Decimal(30),new Decimal(30),new Decimal(30),new Decimal(30),new Decimal(30),new Decimal(30),new Decimal(30)]
        for (let i = 0; i < player.ps.uncommonPetPrices.length; i++)
        {
            player.ps.uncommonPetPrices[i] = player.ps.uncommonPetPrices[i].add(player.ps.uncommonPetsBought.mul(5))
        }

        player.ps.rarePetPrices = [new Decimal(200),new Decimal(200),new Decimal(200),new Decimal(200),new Decimal(200),new Decimal(200),new Decimal(200),]
        for (let i = 0; i < player.ps.rarePetPrices.length; i++)
        {
            player.ps.rarePetPrices[i] = player.ps.rarePetPrices[i].add(player.ps.rarePetsBought.mul(25))
        }

        if (player.cb.highestLevel.gte(65)) player.ps.unlockedMisc = true
        if (player.cb.highestLevel.gte(3000)) player.ps.unlockedMisc2 = true

        player.ps.evoShardsCost = new Decimal(250)
        player.ps.evoShardsCost = player.ps.evoShardsCost.add(player.ps.evoShardsBought.mul(50))

        player.ps.paraShardsCost = new Decimal(5000)
        player.ps.paraShardsCost = player.ps.paraShardsCost.add(player.ps.paraShardsBought.mul(1000))

        player.ps.crate1Cost = new Decimal(6)
        player.ps.crate1Cost = player.ps.crate1Cost.add(player.ps.crate1Bought.mul(3))

        player.ps.crate2Cost = new Decimal(20)
        player.ps.crate2Cost = player.ps.crate2Cost.add(player.ps.crate2Bought.mul(5))

        player.ps.crate3Cost = new Decimal(35)
        player.ps.crate3Cost = player.ps.crate3Cost.add(player.ps.crate3Bought.mul(7))

        player.ps.crate4Cost = new Decimal(150)
        player.ps.crate4Cost = player.ps.crate4Cost.add(player.ps.crate4Bought.mul(35))

        player.ps.crate5Cost = new Decimal(50)
        player.ps.crate5Cost = player.ps.crate5Cost.add(player.ps.crate5Bought.mul(15))

        player.ps.crate6Cost = new Decimal(200)
        player.ps.crate6Cost = player.ps.crate6Cost.add(player.ps.crate6Bought.mul(50))

        player.ps.miscDisplay = [
            "Evo shard cost: " + format(player.ps.evoShardsCost),
            "Crate 1 cost: " + format(player.ps.crate1Cost),
            "Crate 2 cost: " + format(player.ps.crate2Cost),
            "Crate 3 cost: " + format(player.ps.crate3Cost),
            "Crate 4 cost: " + format(player.ps.crate4Cost),
            "Crate 5 cost: " + format(player.ps.crate5Cost),
            "Crate 6 cost: " + format(player.ps.crate6Cost),
            "Paragon shard cost: " + format(player.ps.paraShardsCost),
        ]
    },
    resetPrices()
    {
        player.ps.commonPetsBought = new Decimal(0)
        player.ps.uncommonPetsBought = new Decimal(0)
        player.ps.rarePetsBought = new Decimal(0)
        player.ps.evoShardsBought = new Decimal(0)
        player.ps.paraShardsBought = new Decimal(0)
        player.ps.crate1Bought = new Decimal(0)
        player.ps.crate2Bought = new Decimal(0)
        player.ps.crate3Bought = new Decimal(0)
        player.ps.crate4Bought = new Decimal(0)
        player.ps.crate5Bought = new Decimal(0)
        player.ps.crate6Bought = new Decimal(0)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
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
            unlocked() { return player.ps.miscIndex == 0 && player.ps.unlockedMisc },
            onClick() {
                player.ps.evoShardsBought = player.ps.evoShardsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.evoShardsCost)
                player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained an Evolution Shard!", "resources/evoShard.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        23: {
            title() { return "Common Crate" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc },
            onClick() {
                player.ps.miscIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        24: {
            title() { return "Buy Common Crate" },
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
            title() { return "Common/<br>Uncommon Crate" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc },
            onClick() {
                player.ps.miscIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        26: {
            title() { return "Buy Common/<br>Uncommon Crate" },
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
        27: {
            title() { return "Uncommon Crate" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.miscIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        28: {
            title() { return "Buy Uncommon Crate" },
            canClick() { return player.cb.petPoints.gte(player.ps.crate3Cost) },
            unlocked() { return player.ps.miscIndex == 3 },
            tooltip() { return "16% - Teste<br>16% - Star<br>16% - Normal Face<br>16% - Shark<br>16% - THE WATCHING EYE<br>12% - Goofy Ahh Thing<br>8% - Evo Shard"},
            onClick() {
                player.ps.crate3Bought = player.ps.crate3Bought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.crate3Cost)
                layers.cb.petButton3();
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        29: {
            title() { return "Antimatter Crate" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.miscIndex = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        31: {
            title() { return "Buy Antimatter Crate" },
            canClick() { return player.cb.petPoints.gte(player.ps.crate4Cost) },
            unlocked() { return player.ps.miscIndex == 4 },
            tooltip() { return "25% - Spider<br>25% - Blob<br>15% - Clock<br>15% - Trollface<br>15% - Antimatter<br>5% - Evo Shards"},
            onClick() {
                player.ps.crate4Bought = player.ps.crate4Bought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.crate4Cost)
                layers.cb.petButton4();
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        32: {
            title() { return "Replicanti Crate" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.miscIndex = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        33: {
            title() { return "Buy Replicanti Crate" },
            canClick() { return player.cb.petPoints.gte(player.ps.crate5Cost) },
            unlocked() { return player.ps.miscIndex == 5 },
            tooltip() { return "25% - Replicator<br>25% - Smoke<br>15% - Infinity Breaker<br>15% - John<br>10% - Hex Shadow<br>10% - Grass Square"},
            onClick() {
                player.ps.crate5Bought = player.ps.crate5Bought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.crate5Cost)
                layers.cb.petButton5();
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        34: {
            title() { return "Rare Crate" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.miscIndex = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        35: {
            title() { return "Buy Rare Crate" },
            canClick() { return player.cb.petPoints.gte(player.ps.crate6Cost) },
            unlocked() { return player.ps.miscIndex == 6 },
            tooltip() { return "10% - Nova<br>10% - Dice<br>10% - Drippy Ufo<br>10% - Goofy Ahh Thing<br>10% - Antimatter<br>10% - Hex Shadow<br>10% - Grass Square<br>30% - Epic Pet Fragment"},
            onClick() {
                player.ps.crate6Bought = player.ps.crate6Bought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.crate6Cost)
                layers.cb.petButton6();
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        36: {
            title() { return "<img src='resources/paragonShard.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.miscIndex = new Decimal(7)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        37: {
            title() { return "Buy Paragon Shard" },
            canClick() { return player.cb.petPoints.gte(player.ps.paraShardsCost) },
            unlocked() { return player.ps.miscIndex == 7 },
            onClick() {
                player.ps.paraShardsBought = player.ps.paraShardsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.paraShardsCost)
                player.cb.paragonShards = player.cb.paragonShards.add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a PARAGON SHARD!", "resources/paragonShard.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        //Commons
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Gwa!", "resources/gwaCommonPet.png");
                }
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained an Egg Guy!", "resources/eggCommonPet.png");
                }
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained an Unsmith!", "resources/unsmithCommonPet.png");
                }
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Gd Checkpoint!", "resources/checkpointCommonPet.png");
                }
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Slax!", "resources/slaxCommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        112: {
            title() { return player.cb.commonPetImage[5] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.commonDisplayIndex = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        113: {
            title() { return player.cb.commonPetImage[6] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.commonDisplayIndex = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        114: {
            title() { return player.cb.commonPetImage[7] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.commonDisplayIndex = new Decimal(7)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        115: {
            title() { return player.cb.commonPetImage[8] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.commonDisplayIndex = new Decimal(8)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        116: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.commonPetPrices[5]) },
            unlocked() { return player.ps.commonDisplayIndex == 5 },
            onClick() {
                player.ps.commonPetsBought = player.ps.commonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.commonPetPrices[5])
                player.cb.commonPetAmounts[5] = player.cb.commonPetAmounts[5].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Spider!", "resources/spiderCommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        117: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.commonPetPrices[6]) },
            unlocked() { return player.ps.commonDisplayIndex == 6 },
            onClick() {
                player.ps.commonPetsBought = player.ps.commonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.commonPetPrices[6])
                player.cb.commonPetAmounts[6] = player.cb.commonPetAmounts[6].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Blob!", "resources/blobCommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        118: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.commonPetPrices[7]) },
            unlocked() { return player.ps.commonDisplayIndex == 7 },
            onClick() {
                player.ps.commonPetsBought = player.ps.commonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.commonPetPrices[0])
                player.cb.commonPetAmounts[7] = player.cb.commonPetAmounts[7].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Replicator!", "resources/replicatorCommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        119: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.commonPetPrices[8]) },
            unlocked() { return player.ps.commonDisplayIndex == 8 },
            onClick() {
                player.ps.commonPetsBought = player.ps.commonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.commonPetPrices[8])
                player.cb.commonPetAmounts[8] = player.cb.commonPetAmounts[8].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Smoke!", "resources/smokeCommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        //Uncommons
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Teste!", "resources/testeUncommonPet.png");
                }
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Star!", "resources/starUncommonPet.png");
                }
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Normal Face!", "resources/normalFaceUncommonPet.png");
                }
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Shark!", "resources/sharkUncommonPet.png");
                }
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
                if (player.ps.togglealert == true) {
                    callAlert("You gained THE WATCHING EYE!", "resources/eyeUncommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        212: {
            title() { return player.cb.uncommonPetImage[5] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.uncommonDisplayIndex = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        213: {
            title() { return player.cb.uncommonPetImage[6] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.uncommonDisplayIndex = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        214: {
            title() { return player.cb.uncommonPetImage[7] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.uncommonDisplayIndex = new Decimal(7)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        215: {
            title() { return player.cb.uncommonPetImage[8] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.uncommonDisplayIndex = new Decimal(8)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        216: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.uncommonPetPrices[5]) },
            unlocked() { return player.ps.uncommonDisplayIndex == 5 },
            onClick() {
                player.ps.uncommonPetsBought = player.ps.uncommonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.uncommonPetPrices[5])
                player.cb.uncommonPetAmounts[5] = player.cb.uncommonPetAmounts[5].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Clock!", "resources/clockUncommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        217: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.uncommonPetPrices[6]) },
            unlocked() { return player.ps.uncommonDisplayIndex == 6 },
            onClick() {
                player.ps.uncommonPetsBought = player.ps.uncommonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.uncommonPetPrices[6])
                player.cb.uncommonPetAmounts[6] = player.cb.uncommonPetAmounts[6].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Trollface!", "resources/trollUncommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        218: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.uncommonPetPrices[7]) },
            unlocked() { return player.ps.uncommonDisplayIndex == 7 },
            onClick() {
                player.ps.uncommonPetsBought = player.ps.uncommonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.uncommonPetPrices[7])
                player.cb.uncommonPetAmounts[7] = player.cb.uncommonPetAmounts[7].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Infinity Breaker!", "resources/infinityBreakerUncommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        219: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.uncommonPetPrices[8]) },
            unlocked() { return player.ps.uncommonDisplayIndex == 8 },
            onClick() {
                player.ps.uncommonPetsBought = player.ps.uncommonPetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.uncommonPetPrices[8])
                player.cb.uncommonPetAmounts[8] = player.cb.uncommonPetAmounts[8].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a John!", "resources/johnUncommonPet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        //Rares
        301: {
            title() { return player.cb.rarePetImage[0] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.rareDisplayIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        302: {
            title() { return player.cb.rarePetImage[1] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.rareDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        303: {
            title() { return player.cb.rarePetImage[2] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.rareDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        304: {
            title() { return player.cb.rarePetImage[3] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.rareDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        305: {
            title() { return player.cb.rarePetImage[4] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.rareDisplayIndex = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        306: {
            title() { return player.cb.rarePetImage[5] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.rareDisplayIndex = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        307: {
            title() { return player.cb.rarePetImage[6] },
            canClick() { return true },
            unlocked() { return player.ps.unlockedMisc2 },
            onClick() {
                player.ps.rareDisplayIndex = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        311: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.rarePetPrices[0]) },
            unlocked() { return player.ps.rareDisplayIndex == 0 },
            onClick() {
                player.ps.rarePetsBought = player.ps.rarePetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.rarePetPrices[0])
                player.cb.rarePetAmounts[0] = player.cb.rarePetAmounts[0].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Nova!", "resources/novaRarePet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        312: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.rarePetPrices[1]) },
            unlocked() { return player.ps.rareDisplayIndex == 1 },
            onClick() {
                player.ps.rarePetsBought = player.ps.rarePetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.rarePetPrices[1])
                player.cb.rarePetAmounts[1] = player.cb.rarePetAmounts[1].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Dice!", "resources/diceRarePet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        313: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.rarePetPrices[2]) },
            unlocked() { return player.ps.rareDisplayIndex == 2 },
            onClick() {
                player.ps.rarePetsBought = player.ps.rarePetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.rarePetPrices[2])
                player.cb.rarePetAmounts[2] = player.cb.rarePetAmounts[2].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Drippy Ufo!", "resources/ufoRarePet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        314: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.rarePetPrices[3]) },
            unlocked() { return player.ps.rareDisplayIndex == 3 },
            onClick() {
                player.ps.rarePetsBought = player.ps.rarePetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.rarePetPrices[3])
                player.cb.rarePetAmounts[3] = player.cb.rarePetAmounts[3].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Goofy Ahh Thing!", "resources/goofyAhhThingRarePet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        315: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.rarePetPrices[4]) },
            unlocked() { return player.ps.rareDisplayIndex == 4 },
            onClick() {
                player.ps.rarePetsBought = player.ps.rarePetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.rarePetPrices[4])
                player.cb.rarePetAmounts[4] = player.cb.rarePetAmounts[4].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Antimatter!", "resources/antimatterRarePet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        316: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.rarePetPrices[5]) },
            unlocked() { return player.ps.rareDisplayIndex == 5 },
            onClick() {
                player.ps.rarePetsBought = player.ps.rarePetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.rarePetPrices[5])
                player.cb.rarePetAmounts[5] = player.cb.rarePetAmounts[5].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Hex Shadow!", "resources/hexShadowRarePet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        317: {
            title() { return "Buy Pet" },
            canClick() { return player.cb.petPoints.gte(player.ps.rarePetPrices[6]) },
            unlocked() { return player.ps.rareDisplayIndex == 6 },
            onClick() {
                player.ps.rarePetsBought = player.ps.rarePetsBought.add(1)
                player.cb.petPoints = player.cb.petPoints.sub(player.ps.rarePetPrices[6])
                player.cb.rarePetAmounts[6] = player.cb.rarePetAmounts[6].add(1);
                if (player.ps.togglealert == true) {
                    callAlert("You gained a Grass Square!", "resources/grassSquareRarePet.png");
                }
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "5%" },
        },
        901: {
            title() { return "Purchase Alert On" },
            canClick() { return player.ps.togglealert == false },
            unlocked() { return true },
            onClick() {
                player.ps.togglealert = true
            },
            style: { width: '75px', "min-height": '75px', }
        },
        902: {
            title() { return "Purchase Alert Off" },
            canClick() { return player.ps.togglealert == true  },
            unlocked() { return true },
            onClick() {
                player.ps.togglealert = false
            },
            style: { width: '75px', "min-height": '75px', }
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
                    ["row", [["clickable", 22], ["clickable", 37], ["clickable", 24], ["clickable", 26], ["clickable", 28], ["clickable", 31], ["clickable", 33], ["clickable", 35]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ps.unlockedMisc ? player.ps.miscDisplay[player.ps.miscIndex] : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 21], ["clickable", 36], ["clickable", 23], ["clickable", 25], ["clickable", 27], ["clickable", 29], ["clickable", 32], ["clickable", 34]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 901], ["clickable", 902]]],
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
                        ["row", [["clickable", 106], ["clickable", 107], ["clickable", 108], ["clickable", 109], ["clickable", 111], ["clickable", 116], ["clickable", 117], ["clickable", 118], ["clickable", 119]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.ps.commonDisplay[player.ps.commonDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105], ["clickable", 112], ["clickable", 113], ["clickable", 114], ["clickable", 115]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 901], ["clickable", 902]]],
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
                    ["row", [["clickable", 206], ["clickable", 207], ["clickable", 208], ["clickable", 209], ["clickable", 211], ["clickable", 216], ["clickable", 217], ["clickable", 218], ["clickable", 219]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ps.uncommonDisplay[player.ps.uncommonDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 201], ["clickable", 202], ["clickable", 203], ["clickable", 204], ["clickable", 205], ["clickable", 212], ["clickable", 213], ["clickable", 214], ["clickable", 215]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 901], ["clickable", 902]]],
                ]

            },
            "Rare": {
                buttonStyle() { return { 'color': '#4e7cff', 'border-color': '#4e7cff'  } },
                unlocked() { return player.ps.unlockedMisc2 },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 311], ["clickable", 312], ["clickable", 313], ["clickable", 314], ["clickable", 315], ["clickable", 316], ["clickable", 317],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ps.rareDisplay[player.ps.rareDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 301], ["clickable", 302], ["clickable", 303], ["clickable", 304], ["clickable", 305], ["clickable", 306], ["clickable", 307],]],
                    ["blank", "25px"],
                    ["row", [["clickable", 901], ["clickable", 902]]],
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
