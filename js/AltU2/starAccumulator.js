addLayer("sa", {
    name: "Star Accumulator",
    symbol: "SA",
    universe: "A2",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "#8160bf",
            backgroundOrigin: "border-box",
            borderColor: "white",
            color: "black",
        };
    },
    tooltip: "Star Accumulator",
    color: "#60478f",
    update(delta) {
        player.bum.starlightToGet = player.wel.light.div(3.4e38).pow(0.125)

        for (let i = 0; i < Object.keys(player.bum.tasks).length; i++) {
            player.bum.tasks[i+1].time = player.bum.tasks[i+1].time.add(delta)
            if (player.bum.tasks[i+1].canAddCompletion && player.bum.tasks[i+1].time.gte(player.bum.tasks[i+1].maxTime())) {
                player.bum.tasks[i+1].completions = player.bum.tasks[i+1].completions.add(1)
                player.bum.tasks[i+1].canAddCompletion = false
            }
        }
    },
    //branches: [["wel", "#fff", 40], ["wel", "#402030", 8]],
    branches: ["ir"],
    clickables: {
        11: {
            title() { return "<h2>Gain starlight, but reset previous content.</h2><br><h3><small>Req: 3.40e38 Light</small></h3>" },
            canClick() { return player.wel.light.gte(3.4e38)},
            unlocked() { return true },
            onClick() {
                player.bum.starlight = player.bum.starlight.add(player.bum.starlightToGet)
                player.wel.light = new Decimal(0)

                player.wel.tasks[1].time = new Decimal(0)
                player.wel.tasks[2].time = new Decimal(0)
                player.wel.tasks[3].time = new Decimal(0)
            },
            lightGain() {
                let gain = player.wel.lightMult
                return gain
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "8px", color: "#dfffdf", borderColor: "#dfffdf"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #180b18 0%, #dfffdf 400%)"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {
        11: {
            title: "Starlight I",
            unlocked() { return true },
            description() {return "Halve the cooldown of light modules."},
            cost: new Decimal(1),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Starlight II",
            unlocked() { return true },
            description() {return "Halve the cooldown of light tasks."},
            cost: new Decimal(1),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Starlight III",
            unlocked() { return true },
            description() {return "Light modules can gain one extra charge."},
            cost: new Decimal(1),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Starlight IV",
            unlocked() { return true },
            description() {return "Light tasks can gain one extra charge."},
            cost: new Decimal(1),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "Starlight V",
            unlocked() { return true },
            description() {return "Double light."},
            cost: new Decimal(2),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                ]
            },
        }
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && true}
})