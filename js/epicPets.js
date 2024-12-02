addLayer("epic", {
    name: "Epic", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EPIC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        bannerCommons: [new Decimal(0), new Decimal(0)],
        bannerUncommons: [new Decimal(0), new Decimal(0)],
        bannerRares: [new Decimal(0)],

        bannerIndex: new Decimal(0),

        bannerResetTimer: new Decimal(0),
        bannerResetTimerMax: new Decimal(21600),
        bannerDisplays:
        [
            "",
            "",
            "",
            "",
            "",
        ],

        bannerButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0), ],
        bannerButtonTimersMax: [new Decimal(900), new Decimal(2700), new Decimal(7200), ],

        commonIndex: new Decimal(0),
        uncommonIndex: new Decimal(0),
        rareIndex: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Epic Fragmentation",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.epic.bannerResetTimer = player.epic.bannerResetTimer.sub(onepersec.mul(delta))
        if (player.epic.bannerResetTimer.lte(0))
        {
            layers.epic.refreshBanner();
        }

        player.epic.bannerResetTimerMax = new Decimal(21600)
        player.epic.bannerDisplays =
        [
            "You have " + formatWhole(player.cb.commonPetAmounts[player.epic.bannerCommons[0]]) + " of this pet.",
            "You have " + formatWhole(player.cb.commonPetAmounts[player.epic.bannerCommons[1]]) + " of this pet.",
            "You have " + formatWhole(player.cb.uncommonPetAmounts[player.epic.bannerUncommons[0]]) + " of this pet.",
            "You have " + formatWhole(player.cb.uncommonPetAmounts[player.epic.bannerUncommons[1]]) + " of this pet.",
            "You have " + formatWhole(player.cb.rarePetAmounts[player.epic.bannerRares[0]]) + " of this pet.",
        ]

        player.epic.bannerButtonTimersMax = [new Decimal(900), new Decimal(2700), new Decimal(7200),]

        for (let i = 0; i < player.epic.bannerButtonTimersMax.length; i++)
        {
            player.epic.bannerButtonTimers[i] = player.epic.bannerButtonTimers[i].sub(onepersec.mul(delta))
        }
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
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        11: {
            title() { return player.cb.commonPetImage[player.epic.bannerCommons[0]] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.epic.bannerIndex = new Decimal(0)
                player.epic.commonIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#7d3f98" },
        },
        12: {
            title() { return player.cb.commonPetImage[player.epic.bannerCommons[1]] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.epic.bannerIndex = new Decimal(1)
                player.epic.commonIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#7d3f98" },
        },
        13: {
            title() { return player.cb.uncommonPetImage[player.epic.bannerUncommons[0]] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.epic.bannerIndex = new Decimal(2)
                player.epic.uncommonIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#7d3f98" },
        },
        14: {
            title() { return player.cb.uncommonPetImage[player.epic.bannerUncommons[1]] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.epic.bannerIndex = new Decimal(3)
                player.epic.uncommonIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#7d3f98" },
        },
        15: {
            title() { return player.cb.rarePetImage[player.epic.bannerRares[0]] },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.epic.bannerIndex = new Decimal(4)
                player.epic.rareIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#7d3f98" },
        },
        16: {
            title() { return player.epic.bannerButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.epic.bannerButtonTimers[0]) + "." : "<h3>Sacrifice a common pet for rewards!"},
            canClick() { return player.epic.bannerButtonTimers[0].lt(0) &&  player.cb.commonPetAmounts[player.epic.bannerCommons[player.epic.commonIndex]].gte(1)},
            unlocked() { return player.epic.bannerIndex.eq(0) || player.epic.bannerIndex.eq(1)},
            tooltip() { return "<h5>50% - Common Crate<br>10% - Common/Uncommon Crate<br>5% - Uncommon Crate<br>35% - Epic Pet Fragment"},
            onClick() {
                player.epic.bannerButtonTimers[0] = player.epic.bannerButtonTimersMax[0]
                player.cb.commonPetAmounts[player.epic.bannerCommons[player.epic.commonIndex]] = player.cb.commonPetAmounts[player.epic.bannerCommons[player.epic.commonIndex]].sub(1)

                layers.epic.commonPetBanner();
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        17: {
            title() { return player.epic.bannerButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.epic.bannerButtonTimers[1]) + "." : "<h3>Sacrifice an uncommon pet for rewards!"},
            canClick() { return player.epic.bannerButtonTimers[1].lt(0) &&  player.cb.uncommonPetAmounts[player.epic.bannerUncommons[player.epic.uncommonIndex]].gte(1)},
            unlocked() { return player.epic.bannerIndex.eq(2) || player.epic.bannerIndex.eq(3)},
            tooltip() { return "<h5>20% - Common/Uncommon Crate<br>15% - Uncommon Crate<br>15% - Replicanti Crate<br>50% - Epic Pet Fragment"},
            onClick() {
                player.epic.bannerButtonTimers[1] = player.epic.bannerButtonTimersMax[1]
                player.cb.uncommonPetAmounts[player.epic.bannerUncommons[player.epic.uncommonIndex]] = player.cb.uncommonPetAmounts[player.epic.bannerUncommons[player.epic.uncommonIndex]].sub(1)

                layers.epic.uncommonPetBanner();
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        18: {
            title() { return player.epic.bannerButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.epic.bannerButtonTimers[2]) + "." : "<h3>Sacrifice a rare pet for rewards!"},
            canClick() { return player.epic.bannerButtonTimers[2].lt(0) &&  player.cb.rarePetAmounts[player.epic.bannerRares[player.epic.rareIndex]].gte(1)},
            unlocked() { return player.epic.bannerIndex.eq(4)},
            tooltip() { return "<h5>15% - Antimatter Crate<br>15% - Rare Crate<br>70% - Epic Pet Fragment"},
            onClick() {
                player.epic.bannerButtonTimers[2] = player.epic.bannerButtonTimersMax[2]
                player.cb.rarePetAmounts[player.epic.bannerRares[player.epic.rareIndex]] = player.cb.rarePetAmounts[player.epic.bannerRares[player.epic.rareIndex]].sub(1)

                layers.epic.rarePetBanner();
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
    },
    refreshBanner()
    {
        for (let i = 0; i < player.epic.bannerCommons.length; i++)
        {
            player.epic.bannerCommons[i] = getRandomInt(player.cb.commonPetLevels.length)
        }
        for (let i = 0; i < player.epic.bannerUncommons.length; i++)
        {
            player.epic.bannerUncommons[i] = getRandomInt(player.cb.uncommonPetLevels.length)
        }
        for (let i = 0; i < player.epic.bannerRares.length; i++)
        {
            player.epic.bannerRares[i] = getRandomInt(player.cb.rarePetLevels.length)
        }

        player.epic.bannerResetTimer = player.epic.bannerResetTimerMax
    },
    commonPetBanner()
    {
        let rng = Math.random()

        if (rng > 0.5)
        {
            layers.cb.petButton1()
        } else if (rng > 0.4 && rng < 0.5)
        {
            layers.cb.petButton2()
        } else if (rng > 0.35 && rng < 0.4)
        {
            layers.cb.petButton3()
        } else if (rng < 0.35)
        {
            let random =  getRandomInt(3)
            let random1 =  getRandomInt(4)
            let gainedFragments = 1
            if (random == 0)
            {
                player.cb.epicPetFragments[0] = player.cb.epicPetFragments[0].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1)
            {
                player.cb.epicPetFragments[1] = player.cb.epicPetFragments[1].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment4.png");
            }
            else if (random == 2)
            {
                player.cb.epicPetFragments[2] = player.cb.epicPetFragments[2].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment4.png");
            }
        }
    },
    uncommonPetBanner()
    {
        let rng = Math.random()

        if (rng > 0.8)
        {
            layers.cb.petButton2()
        } else if (rng > 0.65 && rng < 0.8)
        {
            layers.cb.petButton3()
        } else if (rng > 0.5 && rng < 0.65)
        {
            layers.cb.petButton5()
        } else if (rng < 0.5)
        {
            let random = getRandomInt(3)
            let random1 = getRandomInt(4)
            let gainedFragments = getRandomInt(2) + 1
            if (random == 0)
            {
                player.cb.epicPetFragments[0] = player.cb.epicPetFragments[0].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1)
            {
                player.cb.epicPetFragments[1] = player.cb.epicPetFragments[1].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment4.png");
            }
            else if (random == 2)
            {
                player.cb.epicPetFragments[2] = player.cb.epicPetFragments[2].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment4.png");
            }
        }
    },
    rarePetBanner()
    {
        let rng = Math.random()

        if (rng > 0.85)
        {
            layers.cb.petButton4()
        } else if (rng > 0.7 && rng < 0.85)
        {
            layers.cb.petButton6()
        } else if (rng < 0.7)
        {
            let random = getRandomInt(3)
            let random1 = getRandomInt(4)
            let gainedFragments = getRandomInt(2) + 2
            if (random == 0)
            {
                player.cb.epicPetFragments[0] = player.cb.epicPetFragments[0].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1)
            {
                player.cb.epicPetFragments[1] = player.cb.epicPetFragments[1].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment4.png");
            }
            else if (random == 2)
            {
                player.cb.epicPetFragments[2] = player.cb.epicPetFragments[2].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment4.png");
            }
        }
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
            "Main": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Current Banner" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Banner resets in " + formatTime(player.epic.bannerResetTimer) + "."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.epic.bannerDisplays[player.epic.bannerIndex]}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 16], ["clickable", 17], ["clickable", 18]]],
                ]
            },
        },
    },

    tabFormat: [
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
addLayer("ep0", {
    name: "Ep0", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP0", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        dotknightPoints: new Decimal(0),
        dotknightLevelEffect: new Decimal(1),
        dotknightPointsToGet: [new Decimal(1), new Decimal(3), new Decimal(8),],
        dotknightPointButtonUnlocks: [false, false, false,],
        dotknightPointButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0),],
        dotknightPointButtonTimersMax: [new Decimal(60), new Decimal(240), new Decimal(600),],

        dotknightUnlockText: '',
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Dotknight",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep0.dotknightLevelEffect = player.cb.epicPetLevels[0].pow(1.1).div(10).add(1)

        player.ep0.dotknightPointsToGet = [new Decimal(1), new Decimal(3), new Decimal(8),]
        for (let i = 0; i < player.ep0.dotknightPointsToGet.length; i++)
        {
            player.ep0.dotknightPointsToGet[i] = player.ep0.dotknightPointsToGet[i].mul(player.ep0.dotknightLevelEffect)
            if (hasUpgrade("ep2", 13)) player.ep0.dotknightPointsToGet[i] = player.ep0.dotknightPointsToGet[i].mul(upgradeEffect("ep2", 13))
        }

        for (let i = 0; i < player.ep0.dotknightPointButtonTimers.length; i++)
        {
            player.ep0.dotknightPointButtonTimers[i] = player.ep0.dotknightPointButtonTimers[i].sub(onepersec.mul(delta))
        }
        player.ep0.dotknightPointButtonTimersMax = [new Decimal(60), new Decimal(240), new Decimal(600),]

        if (player.cb.epicPetLevels[0].gte(1))
        {
            player.ep0.dotknightPointButtonUnlocks[0] = true
            player.ep0.dotknightUnlockText = "You will unlock the next button at level 3!"
        }
        if (player.cb.epicPetLevels[0].gte(3))
        {
            player.ep0.dotknightPointButtonUnlocks[1] = true
            player.ep0.dotknightUnlockText = "You will unlock the next button at level 6!"
        }
        if (player.cb.epicPetLevels[0].gte(6))
        {
            player.ep0.dotknightPointButtonUnlocks[2] = true
            player.ep0.dotknightUnlockText = "You will unlock the next button at level ???"
        }
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
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        2: {
            title() { return player.cb.epicPetLevels[2].gt(0) ? "<img src='resources/cookieEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[2].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep2"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return player.cb.epicPetLevels[1].gt(0) ? "<img src='resources/dragonEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[1].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep1"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        11: {
            title() { return player.ep0.dotknightPointButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.dotknightPointButtonTimers[0]) + "." : "<h3>+" + format(player.ep0.dotknightPointsToGet[0]) + " Dotknight Points."},
            canClick() { return player.ep0.dotknightPointButtonTimers[0].lt(0) },
            unlocked() { return player.ep0.dotknightPointButtonUnlocks[0] },
            tooltip() { return "Evo Shard Rarity: 1%"},
            onClick() {
                player.ep0.dotknightPoints = player.ep0.dotknightPoints.add(player.ep0.dotknightPointsToGet[0])
                player.ep0.dotknightPointButtonTimers[0] = player.ep0.dotknightPointButtonTimersMax[0]

                    let random = getRandomInt(100)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        callAlert("You gained an Evolution Shard! (1%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(1);
                    }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        12: {
            title() { return player.ep0.dotknightPointButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.dotknightPointButtonTimers[1]) + "." : "<h3>+" + format(player.ep0.dotknightPointsToGet[1]) + " Dotknight Points."},
            canClick() { return player.ep0.dotknightPointButtonTimers[1].lt(0) },
            unlocked() { return player.ep0.dotknightPointButtonUnlocks[1] },
            tooltip() { return "Evo Shard Rarity: 2%"},
            onClick() {
                player.ep0.dotknightPoints = player.ep0.dotknightPoints.add(player.ep0.dotknightPointsToGet[1])
                player.ep0.dotknightPointButtonTimers[1] = player.ep0.dotknightPointButtonTimersMax[1]

                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        callAlert("You gained an Evolution Shard! (2%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(2);
                    }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        13: {
            title() { return player.ep0.dotknightPointButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep0.dotknightPointButtonTimers[2]) + "." : "<h3>+" + format(player.ep0.dotknightPointsToGet[2]) + " Dotknight Points."},
            canClick() { return player.ep0.dotknightPointButtonTimers[2].lt(0) },
            unlocked() { return player.ep0.dotknightPointButtonUnlocks[2] },
            tooltip() { return "DOUBLE Evo Shard Rarity: 2%"},
            onClick() {
                player.ep0.dotknightPoints = player.ep0.dotknightPoints.add(player.ep0.dotknightPointsToGet[2])
                player.ep0.dotknightPointButtonTimers[2] = player.ep0.dotknightPointButtonTimersMax[2]

                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        callAlert("You gained 2 Evolution Shards! (2%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(4)
                    }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Dotknight Upgrade I",
            unlocked() { return true },
            description() { return "Boosts replicanti mult based on dotknight points." },
            cost: new Decimal(100),
            currencyLocation() { return player.ep0 },
            currencyDisplayName: "Dotknight Points",
            currencyInternalName: "dotknightPoints",
            effect() {
                return player.ep0.dotknightPoints.pow(0.2).div(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        12:
        {
            title: "Dotknight Upgrade II",
            unlocked() { return true },
            description() { return "Boosts time cubes based on dotknight points." },
            cost: new Decimal(250),
            currencyLocation() { return player.ep0 },
            currencyDisplayName: "Dotknight Points",
            currencyInternalName: "dotknightPoints",
            effect() {
                return player.ep0.dotknightPoints.pow(0.35).div(5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        13:
        {
            title: "Dotknight Upgrade III",
            unlocked() { return true },
            description() { return "Boosts dragon points based on dotknight points." },
            cost: new Decimal(500),
            currencyLocation() { return player.ep0 },
            currencyDisplayName: "Dotknight Points",
            currencyInternalName: "dotknightPoints",
            effect() {
                return player.ep0.dotknightPoints.pow(0.25).div(20).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
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
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ep0.dotknightUnlockText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Dotknight Level: x<h3>" + format(player.ep0.dotknightLevelEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["row", [["clickable", 12]]],
                    ["row", [["clickable", 13]]],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep0.dotknightPoints) + "</h3> dotknight points." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
addLayer("ep1", {
    name: "Ep1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP1", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        dragonPoints: new Decimal(0),
        dragonLevelEffect: new Decimal(1),
        dragonPointsToGet: [new Decimal(0.04), new Decimal(0.1), new Decimal(0.2),],
        dragonPointButtonUnlocks: [false, false, false,],
        dragonPointButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0),],
        dragonPointButtonTimersMax: [new Decimal(1), new Decimal(3), new Decimal(8),],

        dragonUnlockText: '',
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Dragon",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep1.dragonLevelEffect = player.cb.epicPetLevels[1].pow(1.15).div(14).add(1)

        player.ep1.dragonPointsToGet = [new Decimal(0.2), new Decimal(0.45), new Decimal(0.9),]
        for (let i = 0; i < player.ep1.dragonPointsToGet.length; i++)
        {
            player.ep1.dragonPointsToGet[i] = player.ep1.dragonPointsToGet[i].mul(player.ep1.dragonLevelEffect)
            if (hasUpgrade("ep0", 13)) player.ep1.dragonPointsToGet[i] = player.ep1.dragonPointsToGet[i].mul(upgradeEffect("ep0", 13))
        }

        for (let i = 0; i < player.ep1.dragonPointButtonTimers.length; i++)
        {
            player.ep1.dragonPointButtonTimers[i] = player.ep1.dragonPointButtonTimers[i].sub(onepersec.mul(delta))
        }
        player.ep1.dragonPointButtonTimersMax = [new Decimal(1), new Decimal(3), new Decimal(8),]

        if (player.cb.epicPetLevels[1].gte(1))
        {
            player.ep1.dragonPointButtonUnlocks[0] = true
            player.ep1.dragonUnlockText = "You will unlock the next button at level 2!"
        }
        if (player.cb.epicPetLevels[1].gte(2))
        {
            player.ep1.dragonPointButtonUnlocks[1] = true
            player.ep1.dragonUnlockText = "You will unlock the next button at level 7!"
        }
        if (player.cb.epicPetLevels[1].gte(7))
        {
            player.ep1.dragonPointButtonUnlocks[2] = true
            player.ep1.dragonUnlockText = "You will unlock the next button at level ???"
        }
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
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        2: {
            title() { return player.cb.epicPetLevels[0].gt(0) ? "<img src='resources/dotknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[0].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep0"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return player.cb.epicPetLevels[2].gt(0) ? "<img src='resources/cookieEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[2].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep2"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        11: {
            title() { return player.ep1.dragonPointButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.dragonPointButtonTimers[0]) + "." : "<h3>+" + format(player.ep1.dragonPointsToGet[0]) + " Dragon Points."},
            canClick() { return player.ep1.dragonPointButtonTimers[0].lt(0) },
            unlocked() { return player.ep1.dragonPointButtonUnlocks[0] },
            tooltip() { return "Paragon Shard Rarity: 0.04%"},
            onClick() {
                player.ep1.dragonPoints = player.ep1.dragonPoints.add(player.ep1.dragonPointsToGet[0])
                player.ep1.dragonPointButtonTimers[0] = player.ep1.dragonPointButtonTimersMax[0]

                    let random = getRandomInt(2500)
                    if (random == 1)
                    {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        callAlert("You gained an Paragon Shard! (0.04%)", "resources/paragonShard.png");
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(0.04);
                    }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        12: {
            title() { return player.ep1.dragonPointButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.dragonPointButtonTimers[1]) + "." : "<h3>+" + format(player.ep1.dragonPointsToGet[1]) + " Dragon Points."},
            canClick() { return player.ep1.dragonPointButtonTimers[1].lt(0) },
            unlocked() { return player.ep1.dragonPointButtonUnlocks[1] },
            tooltip() { return "Paragon Shard Rarity: 0.1%"},
            onClick() {
                player.ep1.dragonPoints = player.ep1.dragonPoints.add(player.ep1.dragonPointsToGet[1])
                player.ep1.dragonPointButtonTimers[1] = player.ep1.dragonPointButtonTimersMax[1]

                    let random = getRandomInt(1000)
                    if (random == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        callAlert("You gained an Paragon Shard! (0.1%)", "resources/paragonShard.png");
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(0.1);
                    }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        13: {
            title() { return player.ep1.dragonPointButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep1.dragonPointButtonTimers[2]) + "." : "<h3>+" + format(player.ep1.dragonPointsToGet[2]) + " Dragon Points."},
            canClick() { return player.ep1.dragonPointButtonTimers[2].lt(0) },
            unlocked() { return player.ep1.dragonPointButtonUnlocks[2] },
            tooltip() { return "Paragon Shard Rarity: 0.2%"},
            onClick() {
                player.ep1.dragonPoints = player.ep1.dragonPoints.add(player.ep1.dragonPointsToGet[2])
                player.ep1.dragonPointButtonTimers[2] = player.ep1.dragonPointButtonTimersMax[2]

                    let random = getRandomInt(500)
                    if (random == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        callAlert("You gained a Paragon Shard! (0.2%)", "resources/paragonShard.png");
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(0.2);
                    }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Dragon Upgrade I",
            unlocked() { return true },
            description() { return "Boosts crystals based on dragon points." },
            cost: new Decimal(100),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Dragon Points",
            currencyInternalName: "dragonPoints",
            effect() {
                return player.ep1.dragonPoints.pow(0.5).div(3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        12:
        {
            title: "Dragon Upgrade II",
            unlocked() { return true },
            description() { return "Boosts tickspeed base based on dragon points." },
            cost: new Decimal(250),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Dragon Points",
            currencyInternalName: "dragonPoints",
            effect() {
                return player.ep1.dragonPoints.pow(0.15).div(70).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        13:
        {
            title: "Dragon Upgrade III",
            unlocked() { return true },
            description() { return "Boosts cookie points based on dragon points." },
            cost: new Decimal(500),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Dragon Points",
            currencyInternalName: "dragonPoints",
            effect() {
                return player.ep1.dragonPoints.pow(0.25).div(20).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
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
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ep1.dragonUnlockText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Dragon Level: x<h3>" + format(player.ep1.dragonLevelEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["row", [["clickable", 12]]],
                    ["row", [["clickable", 13]]],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep1.dragonPoints) + "</h3> dragon points." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
addLayer("ep2", {
    name: "Ep2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP2", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        cookiePoints: new Decimal(0),
        cookieLevelEffect: new Decimal(1),
        cookiePointsToGet: [new Decimal(10), new Decimal(25), new Decimal(60),],
        cookiePointButtonUnlocks: [false, false, false,],
        cookiePointButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0),],
        cookiePointButtonTimersMax: [new Decimal(600), new Decimal(1500), new Decimal(4000),],

        cookieUnlockText: '',
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Cookie",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep2.cookieLevelEffect = player.cb.epicPetLevels[2].pow(1.12).div(12).add(1)

        player.ep2.cookiePointsToGet = [new Decimal(10), new Decimal(25), new Decimal(60),]
        for (let i = 0; i < player.ep2.cookiePointsToGet.length; i++)
        {
            player.ep2.cookiePointsToGet[i] = player.ep2.cookiePointsToGet[i].mul(player.ep2.cookieLevelEffect)
            if (hasUpgrade("ep1", 13)) player.ep2.cookiePointsToGet[i] = player.ep2.cookiePointsToGet[i].mul(upgradeEffect("ep1", 13))
        }

        for (let i = 0; i < player.ep2.cookiePointButtonTimers.length; i++)
        {
            player.ep2.cookiePointButtonTimers[i] = player.ep2.cookiePointButtonTimers[i].sub(onepersec.mul(delta))
        }
        player.ep2.cookiePointButtonTimersMax = [new Decimal(600), new Decimal(1500), new Decimal(4000),]

        if (player.cb.epicPetLevels[2].gte(1))
        {
            player.ep2.cookiePointButtonUnlocks[0] = true
            player.ep2.cookieUnlockText = "You will unlock the next button at level 2!"
        }
        if (player.cb.epicPetLevels[2].gte(2))
        {
            player.ep2.cookiePointButtonUnlocks[1] = true
            player.ep2.cookieUnlockText = "You will unlock the next button at level 7!"
        }
        if (player.cb.epicPetLevels[2].gte(7))
        {
            player.ep2.cookiePointButtonUnlocks[2] = true
            player.ep2.cookieUnlockText = "You will unlock the next button at level ???"
        }
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
            style: { width: '100px', "min-height": '50px', 'background-image': '#febc06' },
        },
        2: {
            title() { return player.cb.epicPetLevels[1].gt(0) ? "<img src='resources/dragonEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[1].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep1"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return player.cb.epicPetLevels[0].gt(0) ? "<img src='resources/dotknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[0].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep0"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        11: {
            title() { return player.ep2.cookiePointButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep2.cookiePointButtonTimers[0]) + "." : "<h3>+" + format(player.ep2.cookiePointsToGet[0]) + " Cookie Points."},
            canClick() { return player.ep2.cookiePointButtonTimers[0].lt(0) },
            unlocked() { return player.ep2.cookiePointButtonUnlocks[0] },
            tooltip() { return "Evolution Shard Rarity: 10%<br>Paragon Shard Rarity: 1%"},
            onClick() {
                player.ep2.cookiePoints = player.ep2.cookiePoints.add(player.ep2.cookiePointsToGet[0])
                player.ep2.cookiePointButtonTimers[0] = player.ep2.cookiePointButtonTimersMax[0]

                let random = getRandomInt(10)
                if (random == 1) {
                    player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                    player.cb.pityEvoCurrent = new Decimal(0);
                    callAlert("You gained an Evolution Shard! (10%)", "resources/evoShard.png");
                } else {
                    player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(10);
                }

                let random1 = getRandomInt(100)
                if (random1 == 1) {
                    player.cb.paragonShards = player.cb.paragonShards.add(1);
                    player.cb.pityParaCurrent = new Decimal(0);
                    callAlert("You gained a Paragon Shard! (1%)", "resources/paragonShard.png");
                } else {
                    player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(1);
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        12: {
            title() { return player.ep2.cookiePointButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep2.cookiePointButtonTimers[1]) + "." : "<h3>+" + format(player.ep2.cookiePointsToGet[1]) + " Cookie Points."},
            canClick() { return player.ep2.cookiePointButtonTimers[1].lt(0) },
            unlocked() { return player.ep2.cookiePointButtonUnlocks[1] },
            tooltip() { return "Evolution Shard Rarity: 20%<br>Paragon Shard Rarity: 2.5%"},
            onClick() {
                player.ep2.cookiePoints = player.ep2.cookiePoints.add(player.ep2.cookiePointsToGet[1])
                player.ep2.cookiePointButtonTimers[1] = player.ep2.cookiePointButtonTimersMax[1]

                let random = getRandomInt(5)
                if (random == 1) {
                    player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                    player.cb.pityEvoCurrent = new Decimal(0);
                    callAlert("You gained an Evolution Shard! (20%)", "resources/evoShard.png");
                } else {
                    player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(20);
                }

                let random1 = getRandomInt(40)
                if (random1 == 1) {
                    player.cb.paragonShards = player.cb.paragonShards.add(1);
                    player.cb.pityParaCurrent = new Decimal(0);
                    callAlert("You gained a Paragon Shard! (2.5%)", "resources/paragonShard.png");
                } else {
                    player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(2.5);
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        13: {
            title() { return player.ep2.cookiePointButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.ep2.cookiePointButtonTimers[2]) + "." : "<h3>+" + format(player.ep2.cookiePointsToGet[2]) + " Cookie Points."},
            canClick() { return player.ep2.cookiePointButtonTimers[2].lt(0) },
            unlocked() { return player.ep2.cookiePointButtonUnlocks[2] },
            tooltip() { return "Evolution Shard Rarity: 33%<br>Paragon Shard Rarity: 4%"},
            onClick() {
                player.ep2.cookiePoints = player.ep2.cookiePoints.add(player.ep2.cookiePointsToGet[2])
                player.ep2.cookiePointButtonTimers[2] = player.ep2.cookiePointButtonTimersMax[2]

                    let random = getRandomInt(3)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        callAlert("You gained an Evolution Shard! (33%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(33);
                    }

                    let random1 = getRandomInt(25)
                    if (random1 == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        callAlert("You gained a Paragon Shard! (4%)", "resources/paragonShard.png");
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(4);
                    }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Cookie Upgrade I",
            unlocked() { return true },
            description() { return "Boosts dimension boost base based on cookie points." },
            cost: new Decimal(100),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookie Points",
            currencyInternalName: "cookiePoints",
            effect() {
                return player.ep2.cookiePoints.pow(0.15).div(80).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        12:
        {
            title: "Cookie Upgrade II",
            unlocked() { return true },
            description() { return "Boosts challenge dice points based on cookie points." },
            cost: new Decimal(250),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookie Points",
            currencyInternalName: "cookiePoints",
            effect() {
                return player.ep2.cookiePoints.pow(1.1).div(2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
        13:
        {
            title: "Cookie Upgrade III",
            unlocked() { return true },
            description() { return "Boosts dotknight points based on cookie points." },
            cost: new Decimal(500),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookie Points",
            currencyInternalName: "cookiePoints",
            effect() {
                return player.ep2.cookiePoints.pow(0.25).div(20).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
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
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ep2.cookieUnlockText }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Cookie Level: x<h3>" + format(player.ep2.cookieLevelEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["row", [["clickable", 12]]],
                    ["row", [["clickable", 13]]],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep2.cookiePoints) + "</h3> cookie points." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
