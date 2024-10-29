var tree = [["cp"]]
addLayer("cap", {
    name: "Cante, the Celestial of Replicanti", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ξ", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        reqDisplayIndex: new Decimal(0),
        reqDisplay: "",

        reqSelect: new Decimal(0),

        reqsPassed: [false, false, false, false],
        passingReqs: [false, false, false, false],

        quizInput: new Decimal(0),
        quizNumber: new Decimal(0),
        quizText: '',
        quizQuestions: ["", "", "", "", "", "", "", "", ""],
        quizAnswers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),
            new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),
        ],
        quizIndex: new Decimal(0),
        quizHigher: new Decimal(0),
        quizLower: new Decimal(0),

        cantepocalypseUnlock: false,
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
            "background-origin": "border-box",
            "border-color": "#0f354c",
        };
    },
    
    tooltip: "Cante, the Celestial of Replicanti",
    color: "#727884",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.cap.reqDisplayIndex.eq(0))
        {
            player.cap.reqDisplay = "Recall the challenges and reach further like you never have before."
        } else if (player.cap.reqDisplayIndex.eq(1))
        {
            player.cap.reqDisplay = "Be removed from all of your friendly companions."
        } else if (player.cap.reqDisplayIndex.eq(2))
        {
            player.cap.reqDisplay = "Revisit the previous celestial and go beyond."
        } else if (player.cap.reqDisplayIndex.eq(3))
        {
            player.cap.reqDisplay = "Answer questions about your journey so far."
        }

        if (hasUpgrade("i", 31) && hasUpgrade("i", 32) && hasUpgrade("i", 33) && hasUpgrade("i", 34))
        {
            player.cap.passingReqs[0] = true
        }
        if (hasUpgrade("tad", 14) && hasUpgrade("tad", 15) && hasUpgrade("tad", 16))
        {
            player.cap.passingReqs[2] = true
        }

        player.cap.quizNumber = player.cap.quizInput

        player.cap.quizQuestions = ["log10(infinity points) + check back level", "log10(points)/pet points", "(cante energy/cante energy req) * cante cores",
             "log10(negative infinity points) + cante cores^4",
             "pet points - (check back level * log10(infinities))", 
             "log10(broken infinities) + infinities on reset + (evolution shards * paragon shards)", 
             "log1000(points) + log100(points) + log10(steel)", ""]

        if (player.cap.quizIndex.eq(7))
        {
            player.cap.passingReqs[3] = true
            player.subtabs["cap"]['stuff'] = 'Main'
        }
        if (player.cap.cantepocalypseUnlock)
        {
            player.subtabs["cap"]['stuff'] = 'CANTEPOCALYPSE'
        }

        player.cap.quizAnswers = 
        [
            player.in.infinityPoints.plus(1).log10().add(player.cb.level),
            player.points.plus(1).log10().div(player.cb.petPoints.add(0.01)),
            player.ca.canteEnergy.div(player.ca.canteEnergyReq).mul(player.ca.canteCores),
            player.ta.negativeInfinityPoints.plus(1).log10().add(player.ca.canteCores.pow(4)),
            player.cb.petPoints.sub(player.cb.level.mul(player.in.infinities.plus(1).log10())),
            player.bi.brokenInfinities.plus(1).log10().add(player.in.infinitiesToGet.add(player.cb.evolutionShards.mul(player.cb.paragonShards))),
            player.points.plus(1).log(1000).add(player.points.plus(1).log(100).add(player.gh.steel.plus(1).log10())),
            new Decimal(0)
        ]

        if (player.cap.quizIndex.lt(7)) player.cap.quizLower = player.cap.quizAnswers[player.cap.quizIndex].sub(player.cap.quizAnswers[player.cap.quizIndex].mul(0.05))
        if (player.cap.quizIndex.lt(7)) player.cap.quizHigher = player.cap.quizAnswers[player.cap.quizIndex].add(player.cap.quizAnswers[player.cap.quizIndex].mul(0.05))

        if (player.cap.reqsPassed[0] && player.cap.reqsPassed[1] && player.cap.reqsPassed[2] && player.cap.reqsPassed[3])
        {
            player.cap.cantepocalypseUnlock = true
        }
    },
    checkPetReq()
    {
        let petList = [];
        petList = player.cb.commonPetAmounts.concat(player.cb.uncommonPetAmounts.concat(player.cb.rarePetAmounts))

        let total = new Decimal(0)
        for (let i = 0; i < petList.length; i++)
        {
            total = total.add(petList[i])
        }

        if (total.eq(0))
        {
            return true
        } else
        {
            return false
        }
    },
    branches: ["ta", "om"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "ca"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return "<h1>I" },
            canClick() { return true },
            unlocked() { return !player.cap.reqsPassed[0] },
            onClick() {
                player.cap.reqDisplayIndex = new Decimal(0)
            },
            style: { width: '75px', "min-height": '75px' },
        },
        12: {
            title() { return "<h1>II" },
            canClick() { return true },
            unlocked() { return !player.cap.reqsPassed[1] },
            onClick() {
                player.cap.reqDisplayIndex = new Decimal(1)
        player.cap.passingReqs[1] = layers.cap.checkPetReq()
    },
            style: { width: '75px', "min-height": '75px' },
        },
        13: {
            title() { return "<h1>III" },
            canClick() { return true },
            unlocked() { return !player.cap.reqsPassed[2] },
            onClick() {
                player.cap.reqDisplayIndex = new Decimal(2)
            },
            style: { width: '75px', "min-height": '75px' },
        },
        14: {
            title() { return "<h1>IV" },
            canClick() { return true },
            unlocked() { return !player.cap.reqsPassed[3] },
            onClick() {
                player.cap.reqDisplayIndex = new Decimal(3)
            },
            style: { width: '75px', "min-height": '75px' },
        },
        15: {
            title() { return "Select this requirement" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.cap.reqSelect = player.cap.reqDisplayIndex
            },
            style: { width: '200px', "min-height": '75px' },
        },
        16: {
            title() { return "Pass this requirement" },
            canClick() { return true },
            unlocked() { return player.cap.passingReqs[player.cap.reqSelect] &&  player.cap.passingReqs[player.cap.reqDisplayIndex]},
            onClick() {
                player.cap.reqsPassed[player.cap.reqSelect] = true
            },
            style: { width: '200px', "min-height": '75px' },
        },
        17: {
            title() { return "Check Answer" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (player.cap.quizNumber.gt(player.cap.quizLower) && player.cap.quizNumber.lt(player.cap.quizHigher))
                {
                    player.cap.quizIndex = player.cap.quizIndex.add(1)
                    player.cap.quizText = "You got the question right! Keep going!!!!"
                }
                else
                {
                    player.cap.quizIndex = new Decimal(0)
                    player.cap.quizText = "You got the question wrong >:( go back to the beginning..."
                }
            },
            style: { width: '200px', "min-height": '75px' },
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
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.ca.unlockedCante && !player.cap.cantepocalypseUnlock },
                content:
                [
        ["raw-html", function () { return "You must pass 4 puzzles in order to start the ???." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are currently solving puzzle " + formatWhole(player.cap.reqSelect.add(1)) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["raw-html", function () { return player.cap.reqDisplay }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14]]],
        ["blank", "25px"],
        ["row", [["clickable", 15]]],
        ["raw-html", function () { return "A button will appear below when you have passed the requirements for the puzzle." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "Having trouble figuring out what to do? Join the discord server. (Cheating hehe)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["clickable", 16]]],
    ]
            },
            "QUIZ": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.cap.reqSelect.eq(3) && !player.cap.passingReqs[3] },
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "If the answer is close enough it can work." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "Your answer: " + format(player.cap.quizNumber) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["raw-html", function () { return player.cap.quizQuestions[player.cap.quizIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["text-input", "quizInput", {
            color: "var(--color)",
            width: "400px",
            "font-family": "Calibri",
            "text-align": "left",
            "font-size": "32px",
            border: "2px solid #ffffff17",
            background: "var(--background)",
        }],
        ["blank", "25px"],
        ["row", [["clickable", 17]]],
        ["blank", "25px"],
        ["raw-html", function () { return player.cap.quizText }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
          ]
            },
            "CANTEPOCALYPSE": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.cap.cantepocalypseUnlock },
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "THERE IS NO RETURN..." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["tree", tree],
    ]
            },
        },
        
    }, 

    tabFormat: [        
            
        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("bi", 24)}
})
