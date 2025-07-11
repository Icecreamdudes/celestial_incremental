addLayer("leg", {
    name: "leg", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "LEG", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        legendaryGemsToGetMin: new Decimal(0),
        legendaryGemsToGetMax: new Decimal(0),

        legendaryGemTimer: new Decimal(0),
        legendaryGemTimerMax: new Decimal(86400),

        gemEffects: [new Decimal(1), new Decimal(1), new Decimal(1)], // Red, Purple, Green
        
        //summon
        summonReqs: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], // Red, Purple, Green
        summonTimer: new Decimal(0),
        summonTimer: new Decimal(21600),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Legendary Pets",
    color: "#fe9400",
    update(delta) {
        let onepersec = new Decimal(1)

        player.leg.legendaryGemsToGetMin = player.cb.XPBoost.pow(0.2).div(2).floor()
        player.leg.legendaryGemsToGetMax = player.cb.XPBoost.pow(0.25).div(2).floor()

        player.leg.legendaryGemTimerMax = new Decimal(86400)
        player.leg.legendaryGemTimer = player.leg.legendaryGemTimer.sub(onepersec.mul(delta))

        player.leg.summonTimerMax = new Decimal(21600)
        player.leg.summonTimer = player.leg.summonTimer.sub(onepersec.mul(delta))

        player.leg.gemEffects[0] = player.cb.legendaryPetGems[0].pow(0.1).div(5).add(1)
        player.leg.gemEffects[1] = player.cb.legendaryPetGems[1].pow(0.07).div(10).add(1)
        player.leg.gemEffects[2] = player.cb.legendaryPetGems[2].pow(0.05).div(7).add(1)

        const now = new Date();
        const hours = now.getHours();

        if (hours > 0 && hours < 3) {
            player.leg.summonReqs = [
                new Decimal(20),
                new Decimal(10),
                new Decimal(10),
                new Decimal(32),
                new Decimal(0),
            ]
        }
        if (hours > 3 && hours < 6) {
            player.leg.summonReqs = [
                new Decimal(15),
                new Decimal(15),
                new Decimal(10),
                new Decimal(28),
                new Decimal(1),
            ]
        }
        if (hours > 6 && hours < 9) {
            player.leg.summonReqs = [
                new Decimal(10),
                new Decimal(20),
                new Decimal(10),
                new Decimal(24),
                new Decimal(2),
            ]
        }
        if (hours > 9 && hours < 12) {
            player.leg.summonReqs = [
                new Decimal(10),
                new Decimal(15),
                new Decimal(15),
                new Decimal(20),
                new Decimal(3),
            ]
        }
        if (hours > 12 && hours < 15) {
            player.leg.summonReqs = [
                new Decimal(10),
                new Decimal(10),
                new Decimal(20),
                new Decimal(16),
                new Decimal(4),
            ]
        }
        if (hours > 15 && hours < 18) {
            player.leg.summonReqs = [
                new Decimal(15),
                new Decimal(10),
                new Decimal(15),
                new Decimal(12),
                new Decimal(5),
            ]
        }
        if (hours > 18 && hours < 20) {
            player.leg.summonReqs = [
                new Decimal(30),
                new Decimal(5),
                new Decimal(5),
                new Decimal(8),
                new Decimal(6),
            ]
        }
        if (hours > 20 && hours < 22) {
            player.leg.summonReqs = [
                new Decimal(5),
                new Decimal(30),
                new Decimal(5),
                new Decimal(4),
                new Decimal(7),
            ]
        }
        if (hours > 22 && hours < 24) {
            player.leg.summonReqs = [
                new Decimal(5),
                new Decimal(5),
                new Decimal(30),
                new Decimal(3),
                new Decimal(8),
            ]
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
            title() { return player.leg.legendaryGemTimer.gt(0) ? "<h3>Check back in <br>" + formatTime(player.leg.legendaryGemTimer) + "." : "Reset for legendary gems."},
            canClick() { return player.leg.legendaryGemTimer.lt(0) },
            unlocked() { return true },
            //tooltip() { return player.cb.highestLevel.gte(35) ? "Immortality Shard Rarity: 0.5%" : ""},
            onClick() {
                const redGemGain = randomInt(player.leg.legendaryGemsToGetMin, player.leg.legendaryGemsToGetMax)
                const purpleGemGain = randomInt(player.leg.legendaryGemsToGetMin, player.leg.legendaryGemsToGetMax)
                const greenGemGain = randomInt(player.leg.legendaryGemsToGetMin, player.leg.legendaryGemsToGetMax)
    
                // Add the gems to the player's inventory
                player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(redGemGain)
                player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(purpleGemGain)
                player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(greenGemGain)

                player.leg.legendaryGemTimer = player.leg.legendaryGemTimerMax

                layers.leg.gemReset();

            },
            onHold() { clickClickable(this.layer, this.id) },
            style: {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"},
        },
        12: {
            title() { return player.leg.summonTimer.gt(0) ? "<h3>Check back in <br>" + formatTime(player.leg.summonTimer) + "." : "SUMMON."},
            canClick() { return player.leg.summonTimer.lte(0) && player.cb.legendaryPetGems[0].gte(player.leg.summonReqs[0]) && player.cb.legendaryPetGems[1].gte(player.leg.summonReqs[1]) && player.cb.legendaryPetGems[2].gte(player.leg.summonReqs[2]) && player.cb.evolutionShards.gte(player.leg.summonReqs[3]) && player.cb.paragonShards.gte(player.leg.summonReqs[4]) },
            unlocked() { return true },
            tooltip() { return "25% - 14 of every common pet<br>25% - 10 of every uncommon pet<br>15% - 6 of every rare pet<br>10% - Epic pet and singularity fragments<br>10% - A lot of pet points<br>15% - LEGENDARY PET SUMMON" },
            onClick() {
                player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].sub(player.leg.summonReqs[0])
                player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].sub(player.leg.summonReqs[1])
                player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].sub(player.leg.summonReqs[2])
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.leg.summonReqs[3])
                player.cb.paragonShards = player.cb.paragonShards.sub(player.leg.summonReqs[4])

                player.leg.summonTimer = player.leg.summonTimerMax

                layers.leg.legendarySummon();

            },
            onHold() { clickClickable(this.layer, this.id) },
            style: {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"},
        },
    },
    gemReset()
    {
        player.cb.xp = new Decimal(0)
        player.cb.totalxp = new Decimal(0)
        player.cb.level = new Decimal(0)
        player.cb.highestLevel = new Decimal(0)
        player.cb.XPBoost = new Decimal(1)
        //reset xp, levels, highest level, xp boost
    },
    legendarySummon() {
        let random = Math.random();
        if (random < 0.25) {
            player.pet.levelables[101][1] = player.pet.levelables[101][1].add(14)
            player.pet.levelables[102][1] = player.pet.levelables[101][1].add(14)
            player.pet.levelables[103][1] = player.pet.levelables[101][1].add(14)
            player.pet.levelables[104][1] = player.pet.levelables[104][1].add(14)
            player.pet.levelables[105][1] = player.pet.levelables[105][1].add(14)
            player.pet.levelables[106][1] = player.pet.levelables[106][1].add(14)
            player.pet.levelables[107][1] = player.pet.levelables[107][1].add(14)
            player.pet.levelables[108][1] = player.pet.levelables[108][1].add(14)
            player.pet.levelables[109][1] = player.pet.levelables[109][1].add(14)
            callAlert("You gained 14 of every common pet!", "resources/commonbg.png");
        } else if (random < 0.5) {
            player.pet.levelables[201][1] = player.pet.levelables[201][1].add(10)
            player.pet.levelables[202][1] = player.pet.levelables[202][1].add(10)
            player.pet.levelables[203][1] = player.pet.levelables[203][1].add(10)
            player.pet.levelables[204][1] = player.pet.levelables[204][1].add(10)
            player.pet.levelables[205][1] = player.pet.levelables[205][1].add(10)
            player.pet.levelables[206][1] = player.pet.levelables[206][1].add(10)
            player.pet.levelables[207][1] = player.pet.levelables[207][1].add(10)
            player.pet.levelables[208][1] = player.pet.levelables[208][1].add(10)
            player.pet.levelables[209][1] = player.pet.levelables[209][1].add(10)
            callAlert("You gained 10 of every uncommon pet!", "resources/uncommonbg.png");
        } else if (random < 0.65) {
            player.pet.levelables[301][1] = player.pet.levelables[301][1].add(4)
            player.pet.levelables[302][1] = player.pet.levelables[302][1].add(4)
            player.pet.levelables[303][1] = player.pet.levelables[303][1].add(4)
            player.pet.levelables[304][1] = player.pet.levelables[304][1].add(4)
            player.pet.levelables[305][1] = player.pet.levelables[305][1].add(4)
            player.pet.levelables[306][1] = player.pet.levelables[306][1].add(4)
            player.pet.levelables[307][1] = player.pet.levelables[307][1].add(4)
            player.pet.levelables[308][1] = player.pet.levelables[308][1].add(4)
            player.pet.levelables[309][1] = player.pet.levelables[309][1].add(4)
            callAlert("You gained 4 of every rare pet!", "resources/rarebg.png");
        } else if (random < 0.75) {
            let random2 = getRandomInt(6, 10)
            player.pet.singularityFragments = player.pet.singularityFragments.add(random2)
            player.cb.epicPetFragments[0] = player.cb.epicPetFragments[0].add(random2)
            player.cb.epicPetFragments[1] = player.cb.epicPetFragments[1].add(random2)
            player.cb.epicPetFragments[2] = player.cb.epicPetFragments[2].add(random2)
            player.cb.epicPetFragments[3] = player.cb.epicPetFragments[3].add(random2)

            callAlert("You gained " + random2 + " of every epic and singularity fragment!", "resources/epicbg.png");

        } else if (random < 0.9) {
            let random3 = getRandomInt(1000, 2000)
            random3 = random3 * player.pet.petPointMult

            player.cb.petPoints = player.cb.petPoints.add(random3)
            callAlert("You gained " + formatWhole(random3) + " pet points!", "resources/petPoint.png");
        } else {
            player.pet.levelables[501][1] = player.pet.levelables[501][1].add(1)
            callAlert("Eclipse becomes stronger.", "resources/eclipseLegendaryPet.png"); //Make sure to change this when you add more legendary pets
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
            "Gems": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#fe9400',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                            ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/redLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.legendaryPetGems[0])}, {width: "93px", height: "50px", color: "red", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                        return "<div class='bottomTooltip'>Red Legendary Gems<hr><small>x" + format(player.leg.gemEffects[0]) + " to XP</small></div>"
                }],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                        ["tooltip-row", [
                ["raw-html", "<img src='resources/purpleLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.legendaryPetGems[1])}, {width: "93px", height: "50px", color: "purple", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                    return "<div class='bottomTooltip'>Purple Legendary Gems<hr><small>x" + format(player.leg.gemEffects[1]) + " to Pet Points</small></div>"
                }],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/greenLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.legendaryPetGems[2])}, {width: "95px", height: "50px", color: "green", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                    return "<div class='bottomTooltip'>Green Legendary Gems<hr><small>x" + format(player.leg.gemEffects[2]) + " to XPBoost</small></div>"
                }],
            ], {width: "150px", height: "50px", borderRight: "2px solid white"}],
                                    ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "95px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
            ], {width: "150px", height: "50px", borderRight: "2px solid white"}],
                        ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.paragonShards) }, {width: "95px", height: "50px", color: "#4c64ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
            ], {width: "150px", height: "50px"}],
        ], {width: "750px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.leg.legendaryGemsToGetMin) + " to " + formatWhole(player.leg.legendaryGemsToGetMax) + "</h3> of each gem on reset. (based on XPBoost)" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                            ["style-column", [
                    ["raw-html", function () { return "Summoning Altar" }, { "color": "black", "font-size": "36px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Gems requirements are dependent on the current time of day)" }, { "color": "black", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Current Requirements:" }, { "color": "black", "font-size": "24px", "font-family": "monospace" }],
                                                ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/redLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.leg.summonReqs[0])}, {width: "93px", height: "50px", color: "red", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                        ["tooltip-row", [
                ["raw-html", "<img src='resources/purpleLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.leg.summonReqs[1])}, {width: "93px", height: "50px", color: "purple", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/greenLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.leg.summonReqs[2])}, {width: "95px", height: "50px", color: "green", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
            ], {width: "150px", height: "50px", borderRight: "2px solid white"}],
                        ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.leg.summonReqs[3])}, {width: "95px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
            ], {width: "150px", height: "50px", borderRight: "2px solid white"}],
                        ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.leg.summonReqs[4]) }, {width: "95px", height: "50px", color: "#4c64ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
            ], {width: "150px", height: "50px"}],
        ], {width: "750px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],

                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", backgroundColor: "#f5b942", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 15px 15px"}],
                ]
            },
            "Pets": {
                buttonStyle() { return { 'color': 'black', 'border-color': "black", 'background-color': '#fe9400',} },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
        ["layer-proxy", ["pet", [
                    ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2]], {width: '100px', height: '40px'}],
                                ["style-row", [["clickable", 5], ["clickable", 31], ["clickable", 6], ["clickable", 7], ["clickable", 8], ["clickable", 21]], {width: '125px', height: '40px'}],
                                ["style-row", [["clickable", 3], ["clickable", 4], ["clickable", 22]], {width: '200px', height: '40px'}],
                            ]],
                        ], {width: "550px", height: "175px", borderBottom: "3px solid white"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.cb.highestLevel.gte(1000000) ? {width: "535px", height: "40px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 501]]],
                            ], () => { return player.cb.highestLevel.gte(1000000) ? {width: "525px", backgroundColor: "#171500", padding: "5px"} : {display: "none !important"}}],

                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", backgroundColor: "#161616", border: "3px solid rgb(255, 255, 255)",}],

        ]]]
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
function randomInt(min, max) {
    min = Math.ceil(min.toNumber());
    max = Math.floor(max.toNumber());
    return Math.floor(Math.random() * (max - min + 1)) + min;
}