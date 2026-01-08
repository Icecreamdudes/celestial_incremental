addLayer("wof", {
    name: "Wheel of Fortune", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>WOF", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        wheelsSpinned: new Decimal(0),
        spinCost: new Decimal(10000),

        spinLength: new Decimal(10),
        spinTimer: new Decimal(0),
        trueTimer: new Decimal(0),
        spinPause: new Decimal(0),

        //idea: just make it a single currency gain

        currentlySelectedSegment: -1,

        segmentGains: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        wheelPoints: new Decimal(0),
        wheelPointsEffect: new Decimal(1),
        wheelPointsEffect2: new Decimal(1),
        wheelPointsEffect3: new Decimal(1),
        wheelPointsMult: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(105deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)",
            "background-origin": "border-box",
            "border-color": "#5fc79cff",
            "color": "#5fc79cff",
            borderRadius: "4px",
            transform: "translateX(50px)"
        }
    },
    tooltip: "Wheel of Fortune",
    color: "#3d8165ff",
    branches: ["cf",],
    update(delta) {
        player.wof.spinLength = new Decimal(10)

        if (player.wof.spinActive)
        {
            player.wof.spinTimer = player.wof.spinTimer.add(delta) 
            player.wof.trueTimer = player.wof.trueTimer.add(delta) 

            if (player.wof.trueTimer.lt(0.1))
            {
                layers.wof.randomizeSegments()
            }
            if (player.wof.spinTimer.gte(0.2))
            {
                player.wof.currentlySelectedSegment = getRandomInt(8)
                player.wof.spinTimer = new Decimal(0)
            }
            if (player.wof.trueTimer.gte(player.wof.spinLength))
            {
                player.wof.wheelPoints = player.wof.wheelPoints.add(player.wof.segmentGains[player.wof.currentlySelectedSegment])
                player.wof.spinActive = false
                player.wof.trueTimer = new Decimal(0)
            }
        }

        player.wof.spinCost = player.wof.wheelsSpinned.pow(1.5).add(1).mul(10000)

        player.wof.spinPause = player.wof.spinPause.sub(1)
        if (player.wof.spinPause.gte(0)) {
            layers.wof.spinWheel();
        }

        //wheel points
        player.wof.wheelPointsEffect = player.wof.wheelPoints.pow(0.5).add(1)
        player.wof.wheelPointsEffect2 = player.wof.wheelPoints.pow(0.4).div(2).add(1)
        player.wof.wheelPointsEffect3 = player.wof.wheelPoints.pow(0.3).div(2).add(1)
    },
    randomizeSegments() {
        for (let i = 0; i < 8; i++) {
            let random = Math.random()
            if (random < 0.9)
            {
                player.wof.segmentGains[i] = Decimal.mul(Decimal.add(1, Decimal.mul(Math.random(), 2)), player.wof.wheelPointsMult)   
            } else
            {
                player.wof.segmentGains[i] = Decimal.mul(Decimal.add(5, Decimal.mul(Math.random(), 10)), player.wof.wheelPointsMult)      
            }
        }
    },
    spinWheel() {
        //reets everything before unlocking WOF
        player.za.chancePoints = new Decimal(0)

        player.cf.coinsFlipped = new Decimal(0)
        player.cf.heads = new Decimal(0)
        player.cf.tails = new Decimal(0)

        try {
            if (typeof window !== 'undefined' && !window.__cfInitDone) {
                // clear any leftover timeout id (might be present from a saved object)
                if (player.cf && player.cf._flipTimeoutId) {
                    try { clearTimeout(player.cf._flipTimeoutId) } catch (e) {}
                    player.cf._flipTimeoutId = null
                }

                // reset runtime flip state so the coin isn't mid-flip on a reload
                if (player.cf) {
                    player.cf.flipping = false
                    player.cf.flipTimer = new Decimal(0)
                    player.cf.coinHeads = true
                    player.cf._finalSide = null
                }

                window.__cfInitDone = true
            }
        } catch (e) { console.error("cf update init error:", e) }

        player.cf.buyables[11] = new Decimal(0)
        player.cf.buyables[12] = new Decimal(0)
        player.cf.buyables[13] = new Decimal(0)
        player.cf.buyables[14] = new Decimal(0)
        player.cf.buyables[21] = new Decimal(0)
        player.cf.buyables[22] = new Decimal(0)
        player.cf.buyables[31] = new Decimal(0)
        player.cf.buyables[32] = new Decimal(0)
    },
    clickables: {
        11: {
            title() { return "+" + format(player.wof.segmentGains[0]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 0 ? {width: '125px', "min-height": '125px', borderRadius: "15px 0px 0px 0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "15px 0px 0px 0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        12: {
            title() { return "+" + format(player.wof.segmentGains[1]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 1 ? {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        13: {
            title() { return "+" + format(player.wof.segmentGains[2]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 2 ? {width: '125px', "min-height": '125px', borderRadius: "0px 15px 0px 0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px 15px 0px 0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        14: {
            title() { return "+" + format(player.wof.segmentGains[3]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 3 ? {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        15: {
            title() { return "+" + format(player.wof.segmentGains[4]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 4 ? {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        16: {
            title() { return "+" + format(player.wof.segmentGains[5]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 5 ? {width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 15px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 15px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        17: {
            title() { return "+" + format(player.wof.segmentGains[6]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 6 ? {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },
        18: {
            title() { return "+" + format(player.wof.segmentGains[7]) + " Wheel Points"},
            display() { return "" },
            canClick() { return false },
            unlocked() { return true },
            style() { 
                return player.wof.currentlySelectedSegment == 7 ? {width: '125px', "min-height": '125px', borderRadius: "0px 0px 15px 0px", backgroundImage: "linear-gradient(180deg, #454b14ff 0%, #7c813dff 50%, #454b14ff 100%)"} : {width: '125px', "min-height": '125px', borderRadius: "0px 0px 15px 0px", backgroundImage: "linear-gradient(180deg, #144b34ff 0%, #3d8165ff 50%, #144b34ff 100%)"}
                
            },
        },

        21: {
            title() { return "SPIN!"},
            tooltip() { return "<h5>Spin Length: " + format(player.wof.spinLength) + ". <h6>(I don't know what unit of measurement this is in, but it's probably seconds.)" },
            canClick() { return player.za.chancePoints.gte(player.wof.spinCost) },
            unlocked() { return true },
            onClick() {
                player.wof.spinPause = new Decimal(7)

                player.wof.spinActive = true
                player.wof.wheelsSpinned = player.wof.wheelsSpinned.add(1)
            },
            style() { 
                return { width: '125px', "min-height": '125px', borderRadius: "0px 0px 0px 0px", border: "3px solid #0f221aff", backgroundColor: "3d8165ff" }
            },
        },
    },
    bars: {
        wheel: {
            unlocked: true,
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.wof.spinTimer.div(player.wof.spinLength)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#3d8165ff"},
            textStyle: {fontSize: "14px"},
            display() {
                return player.wof.spinActive ? "Wheel is being spun..." : "Spin the wheel!";
            },
        },
    },
    upgrades: {

    },
    buyables: {
    },
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                    ["style-column", [ //wheel 
                                            ["blank", "25px"],
                                            ["bar", "wheel"],
                                            ["blank", "25px"],
                ["raw-html", function () { return "Requires " + format(player.wof.spinCost) + " chance points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ["raw-html", function () { return "Spinning the wheel resets previous dice space content." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13],]],
                    ["row", [["clickable", 14], ["clickable", 21], ["clickable", 15],]],
                    ["row", [["clickable", 16], ["clickable", 17], ["clickable", 18],]],
                                        ["blank", "25px"],
                    ], {width: "600px", height: "700px", background: "rgba(5, 80, 28, 0.5)", border: "0px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "15px 0px 0px 15px"}],
                    


                    ["style-column", [ 
                    ["style-column", [ 
                ["raw-html", function () { return "You have <h3>" + format(player.wof.wheelPoints) + "</h3> wheel points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Boosts chance point gain by x" + format(player.wof.wheelPointsEffect) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Extends chance point softcap by x" + format(player.wof.wheelPointsEffect2) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Boosts heads and tails gain by x" + format(player.wof.wheelPointsEffect3) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "597px", height: "100px", background: "rgba(34, 124, 61, 0.5)", border: "3px solid #ccc",  borderBottom: "0px", borderTop: "0px", borderRadius: "0px 15px 0px 0px"}],
                    ["style-column", [ 



                    ], {width: "600px", height: "600px", background: "rgba(34, 124, 61, 0.5)", border: "3px solid #ccc", borderRight: "0px", borderRadius: "0px 0px 15px 0px"}],
                    ], {width: "600px", height: "700px", background: "rgba(34, 124, 61, 0.5)", border: "0px solid #ccc", borderRight: "0px", borderLeft: "0px", borderRadius: "0px 15px 15px 0px"}],
                    ], {width: "1200px", height: "700px", background: "rgba(34, 124, 61, 0)", border: "3px solid #ccc", borderRadius: "15px"}],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 13) && !player.sma.inStarmetalChallenge}
})
