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

        //singularity
        singularityButtonTimers: [new Decimal(0), new Decimal(0),],
        singularityButtonTimersMax: [new Decimal(600), new Decimal(3600),],
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
            player.epic.bannerButtonTimersMax[i] = player.epic.bannerButtonTimersMax[i].div(buyableEffect("ep3", 13))

            player.epic.bannerButtonTimers[i] = player.epic.bannerButtonTimers[i].sub(onepersec.mul(delta))
        }


        player.epic.singularityButtonTimersMax = [new Decimal(1800), new Decimal(10800),]

        for (let i = 0; i < player.epic.singularityButtonTimersMax.length; i++)
        {
            player.epic.singularityButtonTimersMax[i] = player.epic.singularityButtonTimersMax[i].div(buyableEffect("ep4", 13))

            player.epic.singularityButtonTimers[i] = player.epic.singularityButtonTimers[i].sub(onepersec.mul(delta))
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

        //singularity
        21: {
            title() { return player.epic.singularityButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.epic.singularityButtonTimers[0]) + "." : "<h3>Sacrifice 3 evo shards for rewards!"},
            canClick() { return player.epic.singularityButtonTimers[0].lt(0) && player.cb.evolutionShards.gte(3)},
            unlocked() { return true },
            tooltip() { return "<h5>25% - Common Crate<br>25% - Rare Crate<br>50% - Singularity Fragments"},
            onClick() {
                player.epic.singularityButtonTimers[0] = player.epic.singularityButtonTimersMax[0]
                player.cb.evolutionShards = player.cb.evolutionShards.sub(3)

                layers.epic.evoBanner();
            },
            style: { width: '225px', "min-height": '50px', 'border-radius': "30%" },
        },
        22: {
            title() { return player.epic.singularityButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.epic.singularityButtonTimers[1]) + "." : "<h3>Sacrifice 3 paragon shards for rewards!"},
            canClick() { return player.epic.singularityButtonTimers[1].lt(0) && player.cb.paragonShards.gte(3)},
            unlocked() { return true },
            tooltip() { return "<h5>12% - Rare Crate<br>16% - Singularity Crate<br>2% - Legendary Gems<br>70% - Singularity Fragments"},
            onClick() {
                player.epic.singularityButtonTimers[1] = player.epic.singularityButtonTimersMax[1]
                player.cb.paragonShards = player.cb.paragonShards.sub(3)

                layers.epic.paragonBanner();
            },
            style: { width: '225px', "min-height": '50px', 'border-radius': "30%" },
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
    evoBanner()
    {
        let rng = Math.random()
        if (rng > 0.3)
        {
            let gainedFragments = getRandomInt(2) + 2
            player.cb.epicPetFragments[3] = player.cb.epicPetFragments[3].add(gainedFragments);
            callAlert("You gained " + formatWhole(gainedFragments) + " Singularity Fragments!", "resources/singularityEpicPetFragment.png");
        } else if (rng > 0.15)
        {
            layers.cb.petButton1()
        } else if (rng < 0.15)
        {
            layers.cb.petButton3()
        }
    },
    paragonBanner()
    {
        let rng = Math.random()
        if (rng > 0.3)
        {
            let gainedFragments = getRandomInt(3) + 4
            player.cb.epicPetFragments[3] = player.cb.epicPetFragments[3].add(gainedFragments);
            callAlert("You gained " + formatWhole(gainedFragments) + " Singularity Fragments!", "resources/singularityEpicPetFragment.png");
        } else if (rng > 0.18)
        {
            layers.cb.petButton6()
        } else if (rng > 0.02)
        {
            layers.cb.petButton7()
        } else if (rng < 0.02)
        {
            let random = getRandomInt(3)
            let gainedGems = getRandomInt(5) + 6
            if (random == 0)
            {
                player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(gainedGems);
                if (!(player.ps.togglealert == false && player.tab == "ps")) {
                    callAlert("You gained " + formatWhole(gainedGems) + " Red Legendary Gems!", "resources/redLegendaryPetGem.png");
                }
            }
            if (random == 1)
            {
                player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(gainedGems);
                if (!(player.ps.togglealert == false && player.tab == "ps")) {
                    callAlert("You gained " + formatWhole(gainedGems) + " Purple Legendary Gems!", "resources/purpleLegendaryPetGem.png");
                }
            }
            if (random == 2)
            {
                player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(gainedGems);
                if (!(player.ps.togglealert == false && player.tab == "ps")) {
                    callAlert("You gained " + formatWhole(gainedGems) + " Green Legendary Gems!", "resources/greenLegendaryPetGem.png");
                }
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
            "Singularity Fragments": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return hasUpgrade("s", 23) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.epicPetFragments[3]) + "</h3> singularity fragments." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards."  }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.paragonShards) + "</h3> paragon shards."  }, { "color": "#2842eb", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 21],]],
                    ["row", [["clickable", 22],]],

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

        max: false,
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
            if (hasUpgrade("ev8", 21)) player.ep0.dotknightPointsToGet[i] = player.ep0.dotknightPointsToGet[i].mul(1.4)
            player.ep0.dotknightPointsToGet[i] = player.ep0.dotknightPointsToGet[i].mul(buyableEffect("ep1", 13))
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
            title() { return player.cb.epicPetLevels[5].gt(0) ? "<img src='resources/selEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[5].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep5"
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
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.ep0.max == false },
            unlocked() { return true },
            onClick() {
                player.ep0.max = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.ep0.max == true  },
            unlocked() { return true },
            onClick() {
                player.ep0.max = false
            },
            style: { width: '75px', "min-height": '50px', }
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
        11: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep0.dotknightPoints},
            pay(amt) { player.ep0.dotknightPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.04).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Dotknight Scraps'
            },
            display() {
                return 'which are boosting main core scrap gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dotknight Points'
            },
            buy() {
                if (player.ep0.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(35) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep0.dotknightPoints},
            pay(amt) { player.ep0.dotknightPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Dotknight Offerings'
            },
            display() {
                return 'which are boosting offering gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dotknight Points'
            },
            buy() {
                if (player.ep0.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep0.dotknightPoints},
            pay(amt) { player.ep0.dotknightPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Dotknight Cookies'
            },
            display() {
                return 'which are boosting cookie point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dotknight Points'
            },
            buy() {
                if (player.ep0.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
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
                    ["blank", "25px"],
                    ["row", [["clickable", 4],["clickable", 5]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13],]],
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

        max: false,
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
            if (hasUpgrade("ev8", 21)) player.ep1.dragonPointsToGet[i] = player.ep1.dragonPointsToGet[i].mul(1.4)
            player.ep1.dragonPointsToGet[i] = player.ep1.dragonPointsToGet[i].mul(buyableEffect("ep2", 13))
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
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.ep1.max == false },
            unlocked() { return true },
            onClick() {
                player.ep1.max = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.ep1.max == true  },
            unlocked() { return true },
            onClick() {
                player.ep1.max = false
            },
            style: { width: '75px', "min-height": '50px', }
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
        11: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep1.dragonPoints},
            pay(amt) { player.ep1.dragonPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Dragon Starmetal'
            },
            display() {
                return 'which are boosting starmetal alloy gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dragon Points'
            },
            buy() {
                if (player.ep1.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(35) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep1.dragonPoints},
            pay(amt) { player.ep1.dragonPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(1.1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Dragon Emotions'
            },
            display() {
                return 'which are boosting happiness, sadness, anger, and fear gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dragon Points'
            },
            buy() {
                if (player.ep1.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep1.dragonPoints},
            pay(amt) { player.ep1.dragonPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Dragon Dotknights'
            },
            display() {
                return 'which are boosting cookie point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dragon Points'
            },
            buy() {
                if (player.ep1.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
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
                    ["blank", "25px"],
                    ["row", [["clickable", 4],["clickable", 5]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
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

        max: false,
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
            if (hasUpgrade("ev8", 21)) player.ep2.cookiePointsToGet[i] = player.ep2.cookiePointsToGet[i].mul(1.4)
            player.ep2.cookiePointsToGet[i] = player.ep2.cookiePointsToGet[i].mul(buyableEffect("ep0", 13))
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
            title() { return player.cb.epicPetLevels[3].gt(0) ? "<img src='resources/kresEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[3].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep3"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.ep2.max == false },
            unlocked() { return true },
            onClick() {
                player.ep2.max = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.ep2.max == true  },
            unlocked() { return true },
            onClick() {
                player.ep2.max = false
            },
            style: { width: '75px', "min-height": '50px', }
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
        11: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep2.cookiePoints},
            pay(amt) { player.ep2.cookiePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Cookie Moonstone'
            },
            display() {
                return 'which are boosting moonstone gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Cookie Points'
            },
            buy() {
                if (player.ep2.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
        costBase() { return new Decimal(40) },
        costGrowth() { return new Decimal(1.15) },
        purchaseLimit() { return new Decimal(100) },
        currency() { return player.ep2.cookiePoints},
        pay(amt) { player.ep2.cookiePoints = this.currency().sub(amt) },
        effect(x) { return new getBuyableAmount(this.layer, this.id).mul(3).pow(2).add(1) },
        unlocked() { return true },
        cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
        canAfford() { return this.currency().gte(this.cost()) },
        title() {
            return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Cookie Grass-Skippers'
        },
        display() {
            return 'which are boosting grass-skipper gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Cookie Points'
        },
        buy() {
            if (player.ep2.max == false) {
                let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                this.pay(buyonecost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            } else {
                let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                this.pay(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
        },
        style: { width: '275px', height: '150px', }
        
    },
    13: {
        costBase() { return new Decimal(50) },
        costGrowth() { return new Decimal(1.2) },
        purchaseLimit() { return new Decimal(100) },
        currency() { return player.ep2.cookiePoints},
        pay(amt) { player.ep2.cookiePoints = this.currency().sub(amt) },
        effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
        unlocked() { return true },
        cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
        canAfford() { return this.currency().gte(this.cost()) },
        title() {
            return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Cookie Dragons'
        },
        display() {
            return 'which are boosting cookie point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Cookie Points'
        },
        buy() {
            if (player.ep2.max == false) {
                let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                this.pay(buyonecost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            } else {
                let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                this.pay(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
        },
        style: { width: '275px', height: '150px', }
    },
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
                    ["blank", "25px"],
                    ["row", [["clickable", 4],["clickable", 5]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
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
addLayer("ep3", {
    name: "Ep3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP3", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        kresPoints: new Decimal(0),
        kresPointsMax: new Decimal(100),
        kresPointsPerSecond: new Decimal(0),

        max: false,

        kresStats: [new Decimal(7), new Decimal(8), new Decimal(5)]
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Kres",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep3.kresPointsMax = new Decimal(100)
        player.ep3.kresPointsMax = player.ep3.kresPointsMax.add(buyableEffect("ep3", 11))

        player.ep3.kresPointsPerSecond = player.cb.epicPetLevels[3].pow(1.1).div(10)
        player.ep3.kresPoints = player.ep3.kresPoints.add(player.ep3.kresPointsPerSecond.mul(delta))

        if (player.ep3.kresPoints.gte(player.ep3.kresPointsMax))
        {
            player.ep3.kresPoints = player.ep3.kresPointsMax
        }

        player.ep3.kresStats = [new Decimal(7), new Decimal(8), new Decimal(5)]
        player.ep3.kresStats[0] = player.ep3.kresStats[0].add(buyableEffect("ep3", 1))
        player.ep3.kresStats[1] = player.ep3.kresStats[1].add(buyableEffect("ep3", 2))
        player.ep3.kresStats[2] = player.ep3.kresStats[2].add(buyableEffect("ep3", 3))
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
            title() { return player.cb.epicPetLevels[4].gt(0) ? "<img src='resources/navknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[4].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep4"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.ep3.max == false },
            unlocked() { return true },
            onClick() {
                player.ep3.max = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.ep3.max == true  },
            unlocked() { return true },
            onClick() {
                player.ep3.max = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        1: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000 Strength'
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
            },
            buy() {
                if (player.ep3.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '150px', height: '75px', }
        },
        2: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000 Defense'
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
            },
            buy() {
                if (player.ep3.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '150px', height: '75px', }
        },
        3: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000 Agility'
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
            },
            buy() {
                if (player.ep3.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '150px', height: '75px', }
        },
        
        11: {
            purchaseLimit() { return new Decimal(990) },
            currency() { return player.ep3.kresPoints},
            pay() { player.ep3.kresPoints = player.ep3.kresPoints.sub(player.ep3.kresPointsMax) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10) },
            unlocked() { return true },
            cost(x) { return player.ep3.kresPointsMax },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/990<br/>Capacity Increaser'
            },
            display() {
                return 'which are boosting kres point capacity by +' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: Max Kres Points'
            },
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.03).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Kres XP'
            },
            display() {
                return 'which are boosting check back XP gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
            },
            buy() {
                if (player.ep3.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep3.kresPoints},
            pay(amt) { player.ep3.kresPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Kres Epic Pets'
            },
            display() {
                return 'which are dividing epic pet fragmentation cooldown by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Kres Points'
            },
            buy() {
                if (player.ep3.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
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
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11],["buyable", 12],["buyable", 13],]],

                ]
            },
            "Stats": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Kres: Warrior Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Strength: <h3>" + formatWhole(player.ep3.kresStats[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Defense: <h3>" + formatWhole(player.ep3.kresStats[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Agility: <h3>" + formatWhole(player.ep3.kresStats[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["row", [["buyable", 1],["buyable", 2],["buyable", 3],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These stats will be helpful for the future!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },

        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep3.kresPoints) + "/" + format(player.ep3.kresPointsMax) + "</h3> kres points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ep3.kresPointsPerSecond) + "</h3> kres points per second. (based on level)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
addLayer("ep4", {
    name: "Ep4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP4", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        navPoints: new Decimal(0),
        navPointsMax: new Decimal(100),
        navPointsPerSecond: new Decimal(0),
        navLevelEffect: new Decimal(1),

        max: false,
        navStats: [new Decimal(9), new Decimal(6), new Decimal(5)]
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Nav",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep4.navPointsMax = new Decimal(100)
        player.ep4.navPointsMax = player.ep4.navPointsMax.add(buyableEffect("ep4", 11))

        player.ep4.navPointsPerSecond = player.cb.epicPetLevels[4].pow(1.1).div(10)
        player.ep4.navPoints = player.ep4.navPoints.add(player.ep4.navPointsPerSecond.mul(delta))

        if (player.ep4.navPoints.gte(player.ep4.navPointsMax))
        {
            player.ep4.navPoints = player.ep4.navPointsMax
        }

        player.ep4.navStats = [new Decimal(7), new Decimal(6), new Decimal(7)]
        player.ep4.navStats[0] = player.ep4.navStats[0].add(buyableEffect("ep4", 1))
        player.ep4.navStats[1] = player.ep4.navStats[1].add(buyableEffect("ep4", 2))
        player.ep4.navStats[2] = player.ep4.navStats[2].add(buyableEffect("ep4", 3))
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
            title() { return player.cb.epicPetLevels[3].gt(0) ? "<img src='resources/kresEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[3].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep3"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return player.cb.epicPetLevels[5].gt(0) ? "<img src='resources/selknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[5].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep5"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.ep4.max == false },
            unlocked() { return true },
            onClick() {
                player.ep4.max = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.ep4.max == true  },
            unlocked() { return true },
            onClick() {
                player.ep4.max = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        1: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000 Strength'
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
            },
            buy() {
                if (player.ep4.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '150px', height: '75px', }
        },
        2: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000 Defense'
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
            },
            buy() {
                if (player.ep4.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '150px', height: '75px', }
        },
        3: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000 Agility'
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
            },
            buy() {
                if (player.ep4.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '150px', height: '75px', }
        },

        11: {
            purchaseLimit() { return new Decimal(990) },
            currency() { return player.ep4.navPoints},
            pay() { player.ep4.navPoints = player.ep4.navPoints.sub(player.ep4.navPointsMax) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10) },
            unlocked() { return true },
            cost(x) { return player.ep4.navPointsMax },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/990<br/>Capacity Increaser'
            },
            display() {
                return 'which are boosting nav point capacity by +' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: Max Nav Points'
            },
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.7).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Nav Pet Points'
            },
            display() {
                return 'which are boosting pet point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
            },
            buy() {
                if (player.ep4.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep4.navPoints},
            pay(amt) { player.ep4.navPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.55).mul(0.02).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Nav Singularity Fragments'
            },
            display() {
                return 'which are dividing singularity fragmentation cooldown by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Nav Points'
            },
            buy() {
                if (player.ep4.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
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
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11],["buyable", 12],["buyable", 13],]],
                ]
            },
            "Stats": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Nav: Mage Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Strength: <h3>" + formatWhole(player.ep4.navStats[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Defense: <h3>" + formatWhole(player.ep4.navStats[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Agility: <h3>" + formatWhole(player.ep4.navStats[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["row", [["buyable", 1],["buyable", 2],["buyable", 3],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These stats will be helpful for the future!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },

        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep4.navPoints) + "/" + format(player.ep4.navPointsMax) + "</h3> nav points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ep4.navPointsPerSecond) + "</h3> nav points per second. (based on level)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
addLayer("ep5", {
    name: "Ep5", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EP5", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        selPoints: new Decimal(0),
        selPointsMax: new Decimal(100),
        selPointsPerSecond: new Decimal(0),
        selLevelEffect: new Decimal(1),

        max: false,

        selStats: [new Decimal(6), new Decimal(6), new Decimal(8)]
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Sel",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ep5.selPointsMax = new Decimal(100)
        player.ep5.selPointsMax = player.ep5.selPointsMax.add(buyableEffect("ep5", 11))

        player.ep5.selPointsPerSecond = player.cb.epicPetLevels[5].pow(1.1).div(10)
        player.ep5.selPoints = player.ep5.selPoints.add(player.ep5.selPointsPerSecond.mul(delta))

        if (player.ep5.selPoints.gte(player.ep5.selPointsMax))
        {
            player.ep5.selPoints = player.ep5.selPointsMax
        }

        player.ep5.selStats = [new Decimal(6), new Decimal(6), new Decimal(8)]
        player.ep5.selStats[0] = player.ep5.selStats[0].add(buyableEffect("ep5", 1))
        player.ep5.selStats[1] = player.ep5.selStats[1].add(buyableEffect("ep5", 2))
        player.ep5.selStats[2] = player.ep5.selStats[2].add(buyableEffect("ep5", 3))
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
            title() { return player.cb.epicPetLevels[4].gt(0) ? "<img src='resources/navEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[4].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep3"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        3: {
            title() { return player.cb.epicPetLevels[0].gt(0) ? "<img src='resources/dotknightknightEpicPet.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>" : "<img src='resources/secret.png'style='width:calc(100%);height:calc(100%);margin:-20%'></img>"},
            canClick() { return player.cb.epicPetLevels[0].gt(0) },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "ep0"
            },
            style: { width: '50px', "min-height": '50px', 'border-radius': "0%", 'border-width': "0px", 'padding': "0px", 'background-color': '#6600A6' },
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.ep5.max == false },
            unlocked() { return true },
            onClick() {
                player.ep5.max = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.ep5.max == true  },
            unlocked() { return true },
            onClick() {
                player.ep5.max = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        1: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000 Strength'
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
            },
            buy() {
                if (player.ep5.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '150px', height: '75px', }
        },
        2: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000 Defense'
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
            },
            buy() {
                if (player.ep5.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '150px', height: '75px', }
        },
        3: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000 Agility'
            },
            display() {
                return 'Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
            },
            buy() {
                if (player.ep5.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '150px', height: '75px', }
        },

        11: {
            purchaseLimit() { return new Decimal(990) },
            currency() { return player.ep5.selPoints},
            pay() { player.ep5.selPoints = player.ep5.selPoints.sub(player.ep5.selPointsMax) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10) },
            unlocked() { return true },
            cost(x) { return player.ep5.selPointsMax },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/990<br/>Capacity Increaser'
            },
            display() {
                return 'which are boosting sel point capacity by +' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: Max Sel Points'
            },
            buy() {
                    this.pay()
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.65).mul(0.035).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Sel XPBoost'
            },
            display() {
                return 'which are boosting XPBoost gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
            },
            buy() {
                if (player.ep5.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep5.selPoints},
            pay(amt) { player.ep5.selPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.45).mul(0.04).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/100<br/>Sel XPBoost Cooldown'
            },
            display() {
                return 'which are dividing XPBoost button cooldown by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Sel Points'
            },
            buy() {
                if (player.ep5.max == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)
    
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
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
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11],["buyable", 12],["buyable", 13],]],
                ]
            },
            "Stats": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#cb79ed',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Sel: Ranger Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Strength: <h3>" + formatWhole(player.ep5.selStats[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Defense: <h3>" + formatWhole(player.ep5.selStats[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Agility: <h3>" + formatWhole(player.ep5.selStats[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                    ["blank", "25px"],
                    ["row", [["buyable", 1],["buyable", 2],["buyable", 3],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "These stats will be helpful for the future!" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ep5.selPoints) + "/" + format(player.ep5.selPointsMax) + "</h3> sel points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ep5.selPointsPerSecond) + "</h3> sel points per second. (based on level)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 2], ["clickable", 1], ["clickable", 3]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true  }
})
