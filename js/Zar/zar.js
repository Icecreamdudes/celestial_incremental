addLayer("za", {
    name: "Zar", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>⚅", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        chancePoints: new Decimal(0),
        chancePointsPerSecond: new Decimal(0),

        chancePointsSoftcapStart: new Decimal(100),
        chancePointsSoftcapEffect: new Decimal(1),

        zarUnlocked: false,
        zarReqs: [false, false, false, false, false, false]
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, #474747ff 0%, #8d8d8dff 100%)",
            "background-origin": "border-box",
            "border-color": "#ddddddff",
            "color": "#0e0e0eff",
            borderRadius: "4px",
            transform: "translateY(-0px)"
        }
    },
    tooltip: "Zar, the Celestial of Chance",
    color: "#ddddddff",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.za.zarReqs[0] && player.za.zarReqs[1] && player.za.zarReqs[2] && player.za.zarReqs[3] && player.za.zarReqs[4] && player.za.zarReqs[5])
        {
            player.za.zarUnlocked = true
        }

        player.za.chancePointsSoftcapStart = new Decimal(100)
        player.za.chancePointsSoftcapStart = player.za.chancePointsSoftcapStart.mul(player.cf.tailsEffect)
        player.za.chancePointsSoftcapStart = player.za.chancePointsSoftcapStart.mul(buyableEffect("cf", 13))
        player.za.chancePointsSoftcapStart = player.za.chancePointsSoftcapStart.mul(player.wof.wheelPointsEffect2)

        if (player.za.chancePoints.gte(player.za.chancePointsSoftcapStart))
        {
            player.za.chancePointsSoftcapEffect = player.za.chancePoints.sub(player.za.chancePointsSoftcapStart).pow(0.75).add(1)
            player.za.chancePointsSoftcapEffect = player.za.chancePointsSoftcapEffect.pow(buyableEffect("wof", 15))
        } else
        {
            player.za.chancePointsSoftcapEffect = new Decimal(1)
        }

        if (hasUpgrade("za", 11)) player.za.chancePointsPerSecond = new Decimal(1)
        player.za.chancePointsPerSecond = player.za.chancePointsPerSecond.div(player.za.chancePointsSoftcapEffect)
        player.za.chancePointsPerSecond = player.za.chancePointsPerSecond.mul(player.cf.headsEffect)
        player.za.chancePointsPerSecond = player.za.chancePointsPerSecond.mul(buyableEffect("cf", 12))
        player.za.chancePointsPerSecond = player.za.chancePointsPerSecond.mul(player.wof.wheelPointsEffect)

        player.za.chancePoints = player.za.chancePoints.add(player.za.chancePointsPerSecond.mul(delta))
    },
    clickables: {
        11: {
            title() { return !player.za.zarReqs[0] ? "1e25 Bees" : "REQ CLEARED"},
            canClick() { return !player.za.zarReqs[0] && player.bee.bees.gte(1e25)},
            unlocked() { return true },
            onClick() {
                player.za.zarReqs[0] = true

                if (player.za.zarUnlocked)
                {
                    player.subtabs["za"]["stuff"] = "Main"
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '100px', "min-height": '100px', borderRadius: "100px", backgroundColor: "#202020ff", borderColor: "#000000ff", color: "#ffffff" },
        },
        12: {
            title() { return !player.za.zarReqs[1] ? "1e800,000 Points" : "REQ CLEARED"},
            canClick() { return !player.za.zarReqs[1] && player.points.gte("1e800000")},
            unlocked() { return true },
            onClick() {
                player.za.zarReqs[1] = true

                if (player.za.zarUnlocked)
                {
                    player.subtabs["za"]["stuff"] = "Main"
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '100px', "min-height": '100px', borderRadius: "100px", backgroundColor: "#202020ff", borderColor: "#000000ff", color: "#ffffff" },
        },
        13: {
            title() { return !player.za.zarReqs[2] ? "1e130 Hex Points" : "REQ CLEARED"},
            canClick() { return !player.za.zarReqs[2] && player.h.hexPoint.gte(1e130)},
            unlocked() { return true },
            onClick() {
                player.za.zarReqs[2] = true

                if (player.za.zarUnlocked)
                {
                    player.subtabs["za"]["stuff"] = "Main"
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '100px', "min-height": '100px', borderRadius: "100px", backgroundColor: "#202020ff", borderColor: "#000000ff", color: "#ffffff" },
        },
        14: {
            title() { return !player.za.zarReqs[3] ? "1e8,000 IP" : "REQ CLEARED"},
            canClick() { return !player.za.zarReqs[3] && player.in.infinityPoints.gte("1e8000")},
            unlocked() { return true },
            onClick() {
                player.za.zarReqs[3] = true

                if (player.za.zarUnlocked)
                {
                    player.subtabs["za"]["stuff"] = "Main"
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '100px', "min-height": '100px', borderRadius: "100px", backgroundColor: "#202020ff", borderColor: "#000000ff", color: "#ffffff" },
        },
        15: {
            title() { return !player.za.zarReqs[4] ? "3e6 Check Back Level" : "REQ CLEARED"},
            canClick() { return !player.za.zarReqs[4] && player.cb.level.gte(3e6)},
            unlocked() { return true },
            onClick() {
                player.za.zarReqs[4] = true

                if (player.za.zarUnlocked)
                {
                    player.subtabs["za"]["stuff"] = "Main"
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '100px', "min-height": '100px', borderRadius: "100px", backgroundColor: "#202020ff", borderColor: "#000000ff", color: "#ffffff" },
        },
        16: {
            title() { return !player.za.zarReqs[5] ? "1e8 Starmetal Alloy" : "REQ CLEARED"},
            canClick() { return !player.za.zarReqs[5] && player.sma.starmetalAlloy.gte(1e8)},
            unlocked() { return true },
            onClick() {
                player.za.zarReqs[5] = true

                if (player.za.zarUnlocked)
                {
                    player.subtabs["za"]["stuff"] = "Main"
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '100px', "min-height": '100px', borderRadius: "100px", backgroundColor: "#202020ff", borderColor: "#000000ff", color: "#ffffff" },
        },
    },
    bars: {},
    upgrades: {
        11: {
            title: "It begins lmao",
            unlocked() { return true },
            description: "Earn 1 chance point per second. How lame.",
            cost: new Decimal(0),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Why wait so long?",
            unlocked() { return hasUpgrade("za", 11) },
            description: "Unlock coin flip.",
            cost: new Decimal(100),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Spinny spinny wheel haha",
            unlocked() { return hasUpgrade("za", 12) },
            description: "Unlock the wheel of fortune!!!",
            cost: new Decimal(10000),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Damn you're lazy",
            unlocked() { return hasUpgrade("za", 13) },
            description: "Unlock the autoflipper... get a load of this guy.",
            cost: new Decimal(100000),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "More buyables cause why not :)",
            unlocked() { return hasUpgrade("za", 14) },
            description: "Unlock more heads and tails buyables.",
            cost: new Decimal(1000000),
            currencyLocation() { return player.za },
            currencyDisplayName: "Chance Points",
            currencyInternalName: "chancePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Unlock": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return !player.za.zarUnlocked },
                content: [
                    ["blank", "25px"],
                    ["style-column", [      
                    ["row", [["clickable", 11], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }],["clickable", 12]]],
                    ["blank", "75px"],
                    ["row", [["clickable", 13], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }],["clickable", 14]]],
                    ["blank", "75px"],
                    ["row", [["clickable", 15], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }],["clickable", 16]]],
                    ], {width: "600px", height: "600px", backgroundColor: "#ddddddff", border: "3px solid #363636ff", borderRadius: "20px"}], //make this look like a dice

                ]
            },
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["blank", "5px"],
                        ["raw-html", function () { return "My amazing upgrades" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "5px"],
                        ["row", [ ["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14],["upgrade", 15],]],
                        ["blank", "5px"],
                    ], {width: "800px", background: "#313131ff", border: "3px solid #ccc", borderRadius: "15px"}],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && !player.sma.inStarmetalChallenge}
})
