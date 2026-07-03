addLayer("dec", {
    name: "Decay", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        decay: new Decimal(0),
        decayPerSecond: new Decimal(0),
        decayEffect: new Decimal(1),

        stability: new Decimal(0),
        stabilityPerSecond: new Decimal(0),
        stabilityEffect: new Decimal(1),
    }},
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(180deg, #74e3ff 0%, #74ffd1 100%)",
            backgroundOrigin: "border-box",
            color: "#112429",
            transform: "translate(0px, 0px)",
        };
    },
    tooltip: "Decay",
    branches: [["ani", "#74e3ff"], ["sr", "#74e3ff"], ["tr", "#74e3ff"]],
    color: "#74e3ff",
    update(delta) {
        //decay
        player.dec.decay = player.dec.decay.add(player.dec.decayPerSecond.mul(delta))

        //stability
        player.dec.stability = player.dec.stability.add(player.dec.stabilityPerSecond.mul(delta))

        if (getLevelableTier("pu", 501, true)) player.dec.stabilityPerSecond = player.dec.stabilityPerSecond.mul(levelableEffect("pu", 501)[0])
    },
    bars: {},
    clickables: {
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
                buttonStyle() { return { border: "2px solid #74e3ff", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "Unlike other Alt-Dark U1 content, some decay content is reset on exiting D1." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
        ["raw-html", () => { return "You have <h3>" + format(player.dec.decay) + "</h3> decay." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.decayPerSecond) + "</h3> decay per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
        ["raw-html", () => { return "You have <h3>" + format(player.dec.stability) + "</h3> stability." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.stabilityPerSecond) + "</h3> stability per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],

                ]
            },
            "Carbon-14": {
                buttonStyle() { return { border: "2px solid #74e3ff", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],

                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.ani.darkRadiation) + "</h3> dark radiation. (+" + format(player.ani.darkRadiationToGet) + "/" + formatTime(player.ani.timer.max) + ")" }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].active ? "Boosts eclipse timer tickspeed by x<h3>" + format(player.ani.darkRadiationEffect) + "</h3>." : "Boosts length, width, and depth by x<h3>" + format(player.ani.darkRadiationEffect2) + "</h3>." }, {color: "#ffffff", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "5px"],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.sma.inStarmetalChallenge && hasUpgrade("ani", 26)},
    deactivated() { return !player.sma.inStarmetalChallenge},
})