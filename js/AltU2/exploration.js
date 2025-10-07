
addLayer("se", {
    name: "Star Exploration", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        currentPosition: [new Decimal(0), new Decimal(0)], 

        starsExploreCount: [[new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], [new Decimal(0), new Decimal(0)], [new Decimal(0)] ], //first index refers to letter, second refers to number
        starsExploreEffect: [[new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1)]], //first index refers to letter, second refers to number
        starExploreTimes: [[new Decimal(180), new Decimal(300), new Decimal(540), new Decimal(1200), new Decimal(2400), new Decimal(7200)], [new Decimal(3600), new Decimal(5400)], [new Decimal(1800)]], //first index refers to letter, second refers to number
        currentStar: [new Decimal(0), new Decimal(0),], 
        currentlyTravelling: false,

        explorationTime: new Decimal(0),
        
        starNames: [],
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #0e0146ff 0%, #011146ff 50%, #013046ff 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#00a2ffff",
            color: "#eaf6f7",
        };
    },
    tooltip: "Star Exploration",
    branches: ["st"],
    color: "#279ccf",
    update(delta) {
        if (player.se.currentlyTravelling)
        {
            player.se.explorationTime = player.se.explorationTime.sub(delta)

            if (player.se.explorationTime.lte(player.se.starExploreTimes[player.se.currentStar[0][player.se.currentStar[1]]]))
            {
                layers.se.arriveAtStar(player.se.currentStar[0], player.se.currentStar[1])
            }
        }

        player.se.starNames = 
        [
            [
                "A0",
                "A1",
                "A2",
                "A3",
                "A4",
                "A5",
            ],
            [
                "B0",
                "B1",
            ],
            [
                "C0"
            ]
        ]

        player.se.starExploreTimes = 
        [
            [
                new Decimal(180),
                new Decimal(300),
                new Decimal(540),
                new Decimal(1200),
                new Decimal(2400),
                new Decimal(7200),
            ],
            [
                new Decimal(3600),
                new Decimal(5400),
            ],
            [
                new Decimal(1800)
            ]
        ]

        player.se.starsExploreEffect = [
            [
                player.se.starsExploreCount[0][0].pow(0.8).mul(0.2).add(1),
                player.se.starsExploreCount[0][1].pow(0.04).mul(0.1).add(1),
                player.id.infinityPower.pow(0.125).add(1).pow(player.se.starsExploreCount[0][2].pow(0.5)),
                player.rf.rocketFuel.pow(0.125).add(1).pow(player.se.starsExploreCount[0][3].pow(0.4)),
                player.gh.grasshoppers.pow(0.075).add(1).pow(player.se.starsExploreCount[0][4].pow(0.65)),
                player.gh.steel.pow(0.07).add(1).pow(player.se.starsExploreCount[0][5].pow(0.6)),
            ],
            [
                player.s.singularityPoints.pow(0.08).add(1).pow(player.se.starsExploreCount[1][0].pow(0.3)),
                player.ra.radiation.pow(0.2).add(1).pow(player.se.starsExploreCount[1][1].pow(0.35)),
            ],
            [
                player.se.starsExploreCount[2][0].pow(0.6).mul(0.4).add(1),
            ]
        ]
    },
    arriveAtStar(x, y)
    {
        player.se.starsExploreCount[x][y] = player.se.starsExploreCount[x][y].add(1)
        player.se.currentPosition = player.se.currentStar
        player.se.currentlyTravelling = false
    },
    bars: {
        explorationBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return player.se.explorationTime.div(player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]])
            },
            borderStyle: {border: "0", border: "2px solid white",},
            baseStyle: {background: "rgba(0, 0, 0, 0.5)",},
            fillStyle: { backgroundImage: "linear-gradient(15deg, #3011bdff 0%, #1640caff 50%, #155e80ff 100%)"},
            display() {
                return player.se.currentlyTravelling ? "<h5>" + formatTime(player.se.explorationTime) + "/" + formatTime(player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]) + "<h5> time to reach " + player.se.starNames[player.se.currentStar[0]][player.se.currentStar[1]] + ".</h5>" : "Currently at " + player.se.starNames[player.se.currentPosition[0]][player.se.currentPosition[1]] + "";
            },
        },
    },
    clickables: {
        1: {
            title() { return "<h2>Stop Travel" },
            canClick() { return player.se.currentlyTravelling },
            unlocked() { return true },
            onClick() {
                player.se.currentlyTravelling = false
            },
            style: { width: '200px', "min-height": '50px' },
        },
        11: {
            title() { return "A0" },
            tooltip() { return "Visited " + formatWhole(player.se.starsExploreCount[0][0]) + " times.<br>Boosts star gain by x" + format(player.se.starsExploreEffect[0][0]) + "." },
            canClick() { 
                return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(1)) || (player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(0)) && !player.se.currentlyTravelling
            },
            unlocked() { return true },
            onClick() {
                player.se.currentStar = [new Decimal(0), new Decimal(0)]

                player.se.explorationTime = player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]
                player.se.currentlyTravelling = true
            },
            style() {
                let look = {width: "75px", minHeight: "75px", borderRadius: "100px", fontSize: '12px', color: "white",}
                player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(0) ? look.border = "3px solid #ff0000ff" : look.border = "3px solid #ffffff",
                look.backgroundImage = "linear-gradient(60deg, #927bf7ff 0%, #674ddbff 50%, #4e35c0ff 100%)"
                return look
            },
        },
        12: {
            title() { return "A1" },
            tooltip() { return "Visited " + formatWhole(player.se.starsExploreCount[0][1]) + " times.<br>Boosts point gain by ^" + format(player.se.starsExploreEffect[0][1]) + "." },
            canClick() { 
                return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(0)) || (player.se.currentStar[0].eq(0) && player.se.currentStar[1].eq(2)) || (player.se.currentPosition[0].eq(2) && player.se.currentPosition[1].eq(0)) && !player.se.currentlyTravelling
            },
            branches: ["11"],
            unlocked() { return true },
            onClick() {
                player.se.currentStar = [new Decimal(0), new Decimal(1)]

                player.se.explorationTime = player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]
                player.se.currentlyTravelling = true
            },
            style() {
                let look = {width: "75px", minHeight: "75px", borderRadius: "100px", fontSize: '12px', color: "white",}
                player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(1) ? look.border = "3px solid #ff0000ff" : look.border = "3px solid #ffffff",
                look.backgroundImage = "linear-gradient(-60deg, #4e35c0ff 0%, #3d2996ff 50%, #2b1d69ff 100%)"
                return look
            },
        },
        13: {
            title() { return "A2" },
            tooltip() { return "Visited " + formatWhole(player.se.starsExploreCount[0][2]) + " times.<br>Boosts all infinity dimensions by x" + format(player.se.starsExploreEffect[0][2]) + ". (Affected by infinity power)" },
            canClick() { 
                return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(1)) || (player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(0)) || (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(3)) || (player.se.currentPosition[0].eq(2) && player.se.currentPosition[1].eq(0)) && !player.se.currentlyTravelling
            },
            branches: ["12"],
            unlocked() { return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(1)) || player.se.starsExploreCount[0][2].gte(1) },
            onClick() {
                player.se.currentStar = [new Decimal(0), new Decimal(2)]

                player.se.explorationTime = player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]
                player.se.currentlyTravelling = true
            },
            style() {
                let look = {width: "75px", minHeight: "75px", borderRadius: "100px", fontSize: '12px', color: "white",}
                player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(2) ? look.border = "3px solid #ff0000ff" : look.border = "3px solid #ffffff",
                look.backgroundImage = "linear-gradient(315deg, #5A4FCF 0%, #242124 74%)"
                return look
            },
        }, 
        14: {
            title() { return "A3" },
            tooltip() { return "Visited " + formatWhole(player.se.starsExploreCount[0][3]) + " times.<br>Boosts rocket fuel by x" + format(player.se.starsExploreEffect[0][3]) + " (affected by rocket fuel)." },
            canClick() { 
                return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(2)) || (player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(1)) || (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(4)) && !player.se.currentlyTravelling
            },
            branches: ["13", "22"],
            unlocked() { return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(2)) || (player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(1)) || player.se.starsExploreCount[0][3].gte(1)},
            onClick() {
                player.se.currentStar = [new Decimal(0), new Decimal(3)]

                player.se.explorationTime = player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]
                player.se.currentlyTravelling = true
            },
            style() {
                let look = {width: "75px", minHeight: "75px", borderRadius: "100px", fontSize: '12px', color: "white",}
                player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(3) ? look.border = "3px solid #ff0000ff" : look.border = "3px solid #ffffff",
                look.backgroundImage = "linear-gradient(-315deg, #271ab9ff 0%, #1e033dff 74%)"
                return look
            },
        }, 
        15: {
            title() { return "A4" },
            tooltip() { return "Visited " + formatWhole(player.se.starsExploreCount[0][4]) + " times.<br>Boosts grasshoppers by x" + format(player.se.starsExploreEffect[0][4]) + " (affected by grasshopppers)." },
            canClick() { 
                return (player.se.currentPosition[0].eq(2) && player.se.currentPosition[1].eq(0)) || (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(5)) || (player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(1)) || (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(3)) && !player.se.currentlyTravelling
            },
            branches: ["31", "14", "22"],
            unlocked() { return ((player.se.currentPosition[0].eq(2) && player.se.currentPosition[1].eq(0)) || (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(5)) || (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(3)) && player.se.starsExploreCount[2][0].gte(1)) || player.se.starsExploreCount[0][4].gte(1)},
            onClick() {
                player.se.currentStar = [new Decimal(0), new Decimal(4)]

                player.se.explorationTime = player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]
                player.se.currentlyTravelling = true
            },
            style() {
                let look = {width: "75px", minHeight: "75px", borderRadius: "100px", fontSize: '12px', color: "white",}
                player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(4) ? look.border = "3px solid #ff0000ff" : look.border = "3px solid #ffffff",
                look.backgroundImage = "linear-gradient(180deg, #140129ff 0%, #750e8fff 74%)"
                return look
            },
        }, 
        16: {
            title() { return "A5" },
            tooltip() { return "UNLOCKS IRIDITE.<br>Visited " + formatWhole(player.se.starsExploreCount[0][5]) + " times.<br>Boosts steel by x" + format(player.se.starsExploreEffect[0][5]) + " (affected by steel)." },
            canClick() { 
                return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(4)) && !player.se.currentlyTravelling
            },
            branches: ["15"],
            unlocked() { return ((player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(4))) || player.se.starsExploreCount[0][5].gte(1)},
            onClick() {
                player.se.currentStar = [new Decimal(0), new Decimal(5)]

                player.se.explorationTime = player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]
                player.se.currentlyTravelling = true
            },
            style() {
                let look = {width: "75px", minHeight: "75px", borderRadius: "100px", fontSize: '12px', color: "white",}
                player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(5) ? look.border = "3px solid #ff0000ff" : look.border = "3px solid #ffffff",
                look.backgroundImage = "linear-gradient(180deg, #140129ff 0%, #750e8fff, #2a0e8fff 74%)"
                return look
            },
        }, 

        //B1 boosts singularity points
        21: {
            title() { return "B0" },
            tooltip() { return "Visited " + formatWhole(player.se.starsExploreCount[1][0]) + " times.<br>Boosts all singularity by x" + format(player.se.starsExploreEffect[1][0]) + ". (Affected by singularity points)" },
            canClick() { 
                return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(2)) || (player.se.currentStar[0].eq(1) && player.se.currentStar[1].eq(1)) || (player.se.currentStar[0].eq(0) && player.se.currentStar[1].eq(0)) && !player.se.currentlyTravelling
            },
            branches: ["13", "11"],
            unlocked() { return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(2)) || player.se.starsExploreCount[1][0].gte(1) },
            onClick() {
                player.se.currentStar = [new Decimal(1), new Decimal(0)]

                player.se.explorationTime = player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]
                player.se.currentlyTravelling = true
            },
            style() {
                let look = {width: "75px", minHeight: "75px", borderRadius: "100px", fontSize: '12px', color: "white",}
                player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(0) ? look.border = "3px solid #ff0000ff" : look.border = "3px solid #ffffff",
                look.backgroundImage = "linear-gradient(315deg, #460000ff 0%, #6b0311ff 74%)"
                return look
            },
        }, 
        22: {
            title() { return "B1" },
            tooltip() { return "Visited " + formatWhole(player.se.starsExploreCount[1][1]) + " times.<br>Boosts all radiation by x" + format(player.se.starsExploreEffect[1][1]) + ". (Affected by radiation)" },
            canClick() { 
                return (player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(0)) || (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(4)) || (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(3)) || (player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(1)) && !player.se.currentlyTravelling
            },
            branches: ["21"],
            unlocked() { return (player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(0)) || player.se.starsExploreCount[1][1].gte(1) },
            onClick() {
                player.se.currentStar = [new Decimal(1), new Decimal(1)]

                player.se.explorationTime = player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]
                player.se.currentlyTravelling = true
            },
            style() {
                let look = {width: "75px", minHeight: "75px", borderRadius: "100px", fontSize: '12px', color: "white",}
                player.se.currentPosition[0].eq(1) && player.se.currentPosition[1].eq(1) ? look.border = "3px solid #ff0000ff" : look.border = "3px solid #ffffff",
                look.backgroundImage = "linear-gradient(315deg, #7e2323ff 0%, #8b112cff 74%)"
                return look
            },
        }, 

        //c
        31: {
            title() { return "C0" },
            tooltip() { return "Visited " + formatWhole(player.se.starsExploreCount[2][0]) + " times.<br>Boosts check back xp by x" + format(player.se.starsExploreEffect[2][0]) + "." },
            canClick() { 
                return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(2)) || (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(4)) && !player.se.currentlyTravelling
            },
            branches: ["13", "12"],
            unlocked() { return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(2) && player.se.starsExploreCount[0][3].gte(1)) || player.se.starsExploreCount[2][0].gte(1) },
            onClick() {
                player.se.currentStar = [new Decimal(2), new Decimal(0)]

                player.se.explorationTime = player.se.starExploreTimes[player.se.currentStar[0]][player.se.currentStar[1]]
                player.se.currentlyTravelling = true
            },
            style() {
                let look = {width: "75px", minHeight: "75px", borderRadius: "100px", fontSize: '12px', color: "white",}
                player.se.currentPosition[0].eq(2) && player.se.currentPosition[1].eq(0) ? look.border = "3px solid #ff0000ff" : look.border = "3px solid #ffffff",
                look.backgroundImage = "linear-gradient(315deg, #094599 0%, #042e68ff 74%)"
                return look
            },
        }, 
    },
    levelables: {},
    upgrades: {},
    buyables: {
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {

        },
    },
    tabFormat: [
        ["bar", "explorationBar"],
        ["blank", "25px"],
        ["row", [["clickable", 1]]],
        ["blank", "25px"],
        ["row", [["clickable", 11]]],
        ["blank", "50px"],
        ["row", [["clickable", 21], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], 
        ["clickable", 12]]],
        ["blank", "50px"],
        ["row", [["clickable", 22], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 13], ["raw-html", function () { return (player.se.currentPosition[0].eq(0) && player.se.currentPosition[1].eq(2) && player.se.starsExploreCount[0][3].gte(1)) || player.se.starsExploreCount[2][0].gte(1)? "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 31]]],
        ["blank", "50px"],
        ["row", [["clickable", 14]]],
        ["blank", "50px"],
        ["row", [["clickable", 15]]],
        ["blank", "50px"],
        ["row", [["clickable", 16]]],
        ["blank", "25px"],
    ],
    layerShown() { return player.ro.rocket2Unlocked }
})
