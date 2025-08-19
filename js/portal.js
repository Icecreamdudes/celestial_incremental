var tree = [["i", "in", "s"], ["cp"], ["ch", "od"]]
addLayer("po", {
    name: "Portal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        lastUniverse: 'i',

        featureSlots: new Decimal(1),
        featureSlotsMax: new Decimal(1),
        nextResetSlots: new Decimal(1),
        dice: false,
        rocketFuel: false,
        hex: false,
        breakInfinity: false,

        keepOTFS: false,

        halterInput: new Decimal(1),
        halterEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        /*
            0 - Points
            1 - Factor Power
            2 - Prestige Points
            3 - Leaves
            4 - Trees
            5 - Grass
            6 - Grasshoppers
            7 - Fertilizer
            8 - Code Experience
            9 - Lines of Code
            10 - Mods
        */
       halterIndex: new Decimal(0),
       halterText: ["", "", "", "", "", "", "", "", "", "", ""],
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Portal",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.points.gte(Number.MAX_VALUE))
        {
            player.in.reachedInfinity = true
        }

        player.po.featureSlotsMax = new Decimal(1)
        if ((inChallenge("tad", 11) && hasUpgrade("de", 14)) || hasUpgrade("i", 28)) player.po.featureSlotsMax = player.po.featureSlotsMax.add(1)

        player.po.featureSlots = player.po.featureSlotsMax
        if (player.po.dice) {
            player.po.featureSlots = player.po.featureSlots.sub(1)
        }
        if (player.po.rocketFuel) {
            player.po.featureSlots = player.po.featureSlots.sub(1)
        }
        if (player.po.hex && !hasUpgrade("s", 18)) {
            player.po.featureSlots = player.po.featureSlots.sub(1)
        }
        if (player.po.breakInfinity) {
            player.in.breakInfinity = true
            player.po.featureSlots = player.po.featureSlots.sub(1)
        } else {
            player.in.breakInfinity = false
        }

        //IF ADDING NEW OTFS - REMEMBER TO EXIT THEM AFTER LEAVING TAVS DOMAIN

        if (player.subtabs["po"]['stuff'] == 'LORE' && player.tab != "lo") {
            player.tab = "lo"
            player.subtabs["po"]['stuff'] = 'Portals'
        }

        if (inChallenge("tad", 11) && player.po.breakInfinity) {
            player.po.breakInfinity = false
            player.po.featureSlots = player.po.featureSlots.sub(1)
        }

        player.po.halterText =
        [
            "<h2>You have " + format(player.points) + " Celestial Points.<br><h3>You are gaining " + format(player.gain) + " Celestial Points per second.<br><br><h3>Celestial Point gain: /" + format(player.po.halterEffects[0]),
            "<h2>You have " + format(player.f.factorPower) + " Factor Power.<br><h3>You are gaining " + format(player.f.factorPowerPerSecond) + " Factor Power per second.<br><br><h3>Factor Power gain: /" + format(player.po.halterEffects[1]),
            "<h2>You have " + format(player.p.prestigePoints) + " Prestige Points.<br><h3>You will gain " + format(player.p.prestigePointsToGet) + " Prestige Points on reset.<br><br><h3>Prestige Points gain: /" + format(player.po.halterEffects[2]),
            "<h2>You have " + format(player.t.leaves) + " Leaves.<br><h3>You are making " + format(player.t.leavesPerSecond) + " Leaves per second.<br><br><h3>Leaf gain: /" + format(player.po.halterEffects[3]),
            "<h2>You have " + format(player.t.trees) + " Trees.<br><h3>You will gain " + format(player.t.treesToGet) + " Trees.<br><br><h3>Tree gain: /" + format(player.po.halterEffects[4]),
            "<h2>You have " + format(player.g.grass) + " Grass.<br><h3>Current Grass Value: " + format(player.g.grassVal) + ".<br><br><h3>Grass gain: /" + format(player.po.halterEffects[5]),
            "<h2>You have " + format(player.gh.grasshoppers) + " Grasshoppers.<br><h3>You will gain " + format(player.gh.grasshoppersToGet) + " Grasshoppers on reset.<br><br><h3>Grasshopper gain: /" + format(player.po.halterEffects[6]),
            "<h2>You have " + format(player.gh.fertilizer) + " Fertilizer.<br><h3>You are gaining " + format(player.gh.fertilizerPerSecond) + " Fertilizer per second.<br><br><h3>Fertilizer gain: /" + format(player.po.halterEffects[7]),
            "<h2>You have " + format(player.m.codeExperience) + " Code Experience.<br><h3>You will gain " + format(player.m.codeExperienceToGet) + " Code Experience on reset.<br><br><h3>Code Experience gain: /" + format(player.po.halterEffects[8]),
            "<h2>You have " + format(player.m.linesOfCode) + " Lines of Code.<br><h3>You are making " + format(player.m.linesOfCodePerSecond) + " Lines of Code per second.<br><br><h3>Lines of Code gain: /" + format(player.po.halterEffects[9]),
            "<h2>You have " + format(player.m.mods) + " Mods.<br><h3>You will gain " + format(player.m.modsToGet) + " Mods.<br><br><h3>Mod gain: /" + format(player.po.halterEffects[10]),
        ]
        /*
            0 - Points
            1 - Factor Power
            2 - Prestige Points
            3 - Leaves
            4 - Trees
            5 - Grass
            6 - Grasshoppers
            7 - Fertilizer
            8 - Code Experience
            9 - Lines of Code
            10 - Mods
        */

        if (player.po.halterInput.gte(1)) {
            if (player.po.halterInput.neq(player.po.halterEffects[player.po.halterIndex])) {
               // player.rm.halterBoostCheck = false
            }
        }
        if (player.po.halterInput.lt(1)) player.po.halterEffects[player.po.halterIndex] = new Decimal(1)

    },
    branches: ["branch"],
    clickables: {
        2: {
            title() { return "Keep OTFs on reset. (Currently off)" },
            display() {
                return "You only gain them back once you reach the req.";
            },
            canClick() { return true },
            unlocked() { return ((hasMilestone("ip", 18)|| player.s.highestSingularityPoints.gt(0)) && !player.po.keepOTFS)},
            onClick() {
                player.po.keepOTFS = true
            },
            style: {
                width: '200px',
                "min-height": '75px',
                borderRadius: '10px',
            },
        },
        3: {
            title() { return "Don't keep OTFs on reset. (Currently on)" },
            canClick() { return true },
            unlocked() { return ((hasMilestone("ip", 18)|| player.s.highestSingularityPoints.gt(0)) && player.po.keepOTFS)},
            onClick() {
                player.po.keepOTFS = false
            },
            style: {
                width: '200px',
                "min-height": '75px',
                borderRadius: '10px',
            },
        },
        4: {
            title() { return "<h3>Lower" },
            canClick() { return player.po.halterIndex.gt(0) },
            unlocked() { return player.ev.evolutionsUnlocked[6] },
            onClick() {
                player.po.halterIndex = player.po.halterIndex.sub(1)
            },
            style: { width: '100px', "min-height": '100px', borderRadius: "10px 0px 0px 10px" },
        },
        5: {
            title() { return "<h3>Increase" },
            canClick() { return player.po.halterIndex.lt(10) },
            unlocked() { return player.ev.evolutionsUnlocked[6] },
            onClick() {
                player.po.halterIndex = player.po.halterIndex.add(1)
            },
            style: { width: '100px', "min-height": '100px', borderRadius: "0px" },
        },
        6: {
            title() { return "<h3>Apply Halt" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (player.po.halterInput.gte(1)) {
                    player.po.halterEffects[player.po.halterIndex] = player.po.halterInput
                } else {
                    player.po.halterEffects[player.po.halterIndex] = new Decimal(1)
                }
            },
            style() {
                if (player.ev.evolutionsUnlocked[6]) {
                    return { width: '100px', "min-height": '100px', borderRadius: "0px" }
                } else {
                    return { width: '100px', "min-height": '100px', borderRadius: "10px" }
                }
            }
        },
        7: {
            title() { return "<h3>Reset Halts" },
            canClick() { return true },
            unlocked() { return player.ev.evolutionsUnlocked[6] },
            onClick() {
                for (let i = 0; i < player.po.halterEffects.length; i++)
                {
                    player.po.halterEffects[i] = new Decimal(1)
                }
            },
            style: { width: '100px', "min-height": '100px', borderRadius: "0px" },
        },
        8: {
            title() { return "<h3>View Halts" },
            canClick() { return true },
            unlocked() { return player.ev.evolutionsUnlocked[6] },
            onClick() {
                callAlert(
                    "Celestial Point gain: /" + format(player.po.halterEffects[0]) + "\n" +
                    "Factor Power gain: /" + format(player.po.halterEffects[1]) + "\n" +
                    "Prestige Point gain: /" + format(player.po.halterEffects[2]) + "\n" +
                    "Leaf gain: /" + format(player.po.halterEffects[3]) + "\n" +
                    "Tree gain: /" + format(player.po.halterEffects[4]) + "\n" +
                    "Grass gain: /" + format(player.po.halterEffects[5]) + "\n" +
                    "Grasshopper gain: /" + format(player.po.halterEffects[6]) + "\n" +
                    "Fertilizer gain: /" + format(player.po.halterEffects[7]) + "\n" +
                    "Code Experience gain: /" + format(player.po.halterEffects[8]) + "\n" +
                    "Lines of Code gain: /" + format(player.po.halterEffects[9]) + "\n" +
                    "Mod gain: /" + format(player.po.halterEffects[10]) + "\n"
                )
            },
            style: { width: '100px', "min-height": '100px', borderRadius: "0px 10px 10px 0px" },
        },
        11: {
            title() { return "<h1>Dice" },
            display() {
                return player.po.dice ? "<h1>The die will decide your fate.<br>On" : "<h1>The die will decide your fate.<br>Off<br><h2>Req: 1e150 points";
            },
            canClick() { return player.po.featureSlots.gte(1) && (player.points.gte(1e150) || inChallenge("tad", 11)) && (!inChallenge("ip", 14) || inChallenge("ip", 14) && player.r.pent.gte(15)) },
            unlocked() { return !inChallenge("ip", 11) && !inChallenge("ip", 13) && !inChallenge("ip", 15) && !inChallenge("ip", 16) },
            onClick() {
                player.po.dice = true
            },
            style: {
                width: '200px',
                "min-height": '200px',
                background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)",
                "background-origin": "border-box",
                "border-color": "#0061ff",
                borderRadius: "20px",
            },
        },
        12: {
            title() { return "<h1>Rocket Fuel" },
            display() {
                return player.po.rocketFuel ? "<h1>Fly me to the moon.<br>On" : "<h1>Fly me to the moon.<br>Off<br><h2>Req: 1e170 points";
            },
            canClick() { return player.po.featureSlots.gte(1) && (player.points.gte(1e170) || inChallenge("tad", 11)) && (!inChallenge("ip", 14) || inChallenge("ip", 14) && player.r.pent.gte(15)) },
            unlocked() { return hasMilestone("ip", 1) && !inChallenge("ip", 11) && !inChallenge("ip", 13) && !inChallenge("ip", 15) && !inChallenge("ip", 16)  },
            onClick() {
                player.po.rocketFuel = true
            },
            style() {
                function degreesToRadians(degrees) {
                    return (degrees * Math.PI) / 180;
                }

                // Define the base hue value for dark blue (between 0 and 360 degrees)
                const darkBlueHue = 210;

                // Define the base lightness values for dark blue and light gray (between 0 and 100%)
                const darkBlueLightness = 20; // Adjust for darker blue
                const lightGrayLightness = 80; // Adjust for lighter gray

                // Calculate the current lightness value based on time (smoothly oscillating between dark blue and light gray)
                const currentTime = new Date().getTime();
                const lightnessOffset = (Math.sin(currentTime / 400) + 1) / 9; // Adjust the divisor to change oscillation speed
                const lightness1 = darkBlueLightness + (lightnessOffset * (lightGrayLightness - darkBlueLightness));
                const lightness2 = lightGrayLightness - (lightnessOffset * (lightGrayLightness - darkBlueLightness));

                // Create the gradient string using the HSL colors
                const gradient = `linear-gradient(to right, hsl(${darkBlueHue}, 80%, ${lightness1}%), hsl(${darkBlueHue}, 80%, ${lightness2}%))`;

                return {
                    width: '200px',
                    "min-height": '200px',
                    background: gradient,
                    "background-origin": "border-box",
                    "border-color": "#119B35",
                    color: "#06366e",
                    borderRadius: "20px",
                }
            },
        },
        13: {
            title() { return "<h1>Hex" },
            display() {
                return player.po.hex ? "<h1>The number 6.<br>On" : "<h1>The number 6.<br>Off";
            },
            canClick() { return player.po.featureSlots.gte(1) && (!inChallenge("ip", 14) || inChallenge("ip", 14) && player.r.pent.gte(15))},
            unlocked() { return hasChallenge("ip", 13) && !inChallenge("ip", 11) && !inChallenge("ip", 13) && !inChallenge("ip", 15) && !inChallenge("ip", 16) && !hasUpgrade("s", 18)},
            onClick() {
                player.po.hex = true
            },
            style: {
                width: '200px',
                "min-height": '200px',
                "background": "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(18,18,18,1) 100%)",
                "background-origin": "border-box",
                "color": "white",
                borderRadius: "20px",
            },
        },
        14: {
            title() { return "<h1>BREAK INFINITY" },
            display() {
                return player.po.breakInfinity ? "<h1>Get past limits.<br>On" : "<h1>Get past limits.<br>Off<br><h2>Req: Tav Defeated<br>Can't activate in Tav's domain";
            },
            canClick() { return player.po.featureSlots.gte(1) && player.in.unlockedBreak && !inChallenge("tad", 11)},
            unlocked() { return player.in.unlockedBreak },
            onClick() {
                player.po.breakInfinity = true
            },
            style: {
                width: '200px',
                "min-height": '200px',
                "border-color": "white",
                "background": "linear-gradient(315deg, #7c5423 0%, #b87400 100%)",
                "background-origin": "border-box",
                "color": "white",
                borderRadius: "20px",
            },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Otherworldly Features": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return !inChallenge("ip", 11) ? "You have <h3>" + formatWhole(player.po.featureSlots) + "/" + formatWhole(player.po.featureSlotsMax) + "</h3> free feature slots." : "No features for you!"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", function () { return inChallenge("ip", 14) ? "You can pick an OTF once you are at pent 15." : ""}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["style-row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14]], {maxWidth: "1000px"}],
                ]
            },
            "Halter": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true},
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>" + player.po.halterText[player.po.halterIndex]}],
                    ["text-input", "halterInput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5], ["clickable", 6], ["clickable", 7], ["clickable", 8]]],
                    ["blank", "25px"],
                    ["raw-html", "<h3>Enter a number greater than 1. You thought you could get away with dividing by 0?"],
                    ["raw-html", "<h4>This can help by letting you progress in OTFS while infinity is fixed. (and a whole bunch of other stuff eventually)"],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true }
})
