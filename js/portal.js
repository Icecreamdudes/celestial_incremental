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
        halter: {
            points: {
                enabled: 0,
                halt: new Decimal(1),
            },
            factor: {
                enabled: 0,
                halt: new Decimal(1),
            },
            prestige: {
                enabled: 0,
                halt: new Decimal(1),
            },
            trees: {
                enabled: 0,
                halt: new Decimal(1),
            },
            grass: {
                enabled: 0,
                halt: new Decimal(1),
            },
            goldenGrass: {
                enabled: 0,
                halt: new Decimal(1),
            },
            grasshoppers: {
                enabled: 0,
                halt: new Decimal(1),
            },
            code: {
                enabled: 0,
                halt: new Decimal(1),
            },
            mods: {
                enabled: 0,
                halt: new Decimal(1),
            },
            xp: {
                enabled: 0,
                halt: new Decimal(1),
            },
            antimatter: {
                enabled: 0,
                halt: new Decimal(1),
            },
            infinities: {
                enabled: 0,
                halt: new Decimal(1),
            },
            ip: {
                enabled: 0,
                halt: new Decimal(1),
            },
            nip: {
                enabled: 0,
                halt: new Decimal(1),
            },
        },
        halterID: "points",
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Portal",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.points.gte(Number.MAX_VALUE)) {
            player.in.reachedInfinity = true
        }

        player.po.featureSlotsMax = new Decimal(1)
        if (hasUpgrade("i", 28)) player.po.featureSlotsMax = player.po.featureSlotsMax.add(1)

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

        if (player.po.halterInput.lt(1)) player.po.halter[player.po.halterID].halt = new Decimal(1)

    },
    clickables: {
        2: {
            title() { return "Keep OTFs on reset. (Currently off)" },
            display() {
                return "You only gain them back once you reach the req.";
            },
            canClick() { return true },
            unlocked() { return ((hasMilestone("ip", 18) || player.s.highestSingularityPoints.gt(0) || player.po.breakInfinity) && !player.po.keepOTFS)},
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
            unlocked() { return ((hasMilestone("ip", 18) || player.s.highestSingularityPoints.gt(0) || player.po.breakInfinity) && player.po.keepOTFS)},
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
            title() { return "<h3>Disable Halter" },
            canClick() {return player.po.halter[player.po.halterID].enabled != 0},
            unlocked: true,
            onClick() {
                player.po.halter[player.po.halterID].enabled = 0
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0 0 0 12px"},
        },
        5: {
            title() { return "<h3>Enable Halter<br>[DIVIDE]" },
            canClick() {return player.po.halter[player.po.halterID].enabled != 1},
            unlocked: true,
            onClick() {
                player.po.halter[player.po.halterID].enabled = 1
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0"},
        },
        6: {
            title() { return "<h3>Enable Halter<br>[HARDCAP]" },
            canClick() {return player.po.halter[player.po.halterID].enabled != 2},
            unlocked: true,
            onClick() {
                player.po.halter[player.po.halterID].enabled = 2
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0"},
        },
        7: {
            title() { return "<h3>Apply Halt" },
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.po.halterInput.gte(1)) {
                    player.po.halter[player.po.halterID].halt = player.po.halterInput
                } else {
                    player.po.halter[player.po.halterID].halt = new Decimal(1)
                }
            },
            style() {
                if (player.ev.evolutionsUnlocked[6]) {
                    return {width: "100px", minHeight: "100px", borderRadius: "0"}
                } else {
                    return {width: "100px", minHeight: "100px", borderRadius: "0 0 12px 0"}
                }
            }
        },
        8: {
            title() { return "<h3>Disable All Halts" },
            canClick: true,
            unlocked() { return player.ev.evolutionsUnlocked[6] },
            onClick() {
                for (let i in player.po.halter) {
                    player.po.halter[i].enabled = 0
                }
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0 0 12px 0"},
        },
        11: {
            title() { return "<h1>Dice" },
            display() {
                return player.po.dice ? "<h1>The die will decide your fate.<br>On" : "<h1>The die will decide your fate.<br>Off<br><h2>Req: 1e150 points";
            },
            canClick() { return player.po.featureSlots.gte(1) && player.points.gte(1e150) && (!inChallenge("ip", 14) || inChallenge("ip", 14) && player.r.pent.gte(15)) },
            unlocked() { return !inChallenge("ip", 11) && !inChallenge("ip", 13) && !inChallenge("ip", 15) && !inChallenge("ip", 16) },
            onClick() {
                if (!hasAchievement("achievements", 19)) completeAchievement("achievements", 19)
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
            canClick() { return player.po.featureSlots.gte(1) && player.points.gte(1e170) && (!inChallenge("ip", 14) || inChallenge("ip", 14) && player.r.pent.gte(15)) },
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
                return player.po.hex ? "<h1>The number 6.<br>On<br><h2>(Progress is kept between infinities)</h2>" : "<h1>The number 6.<br>Off<br><h2>(Progress is kept between infinities)</h2>";
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
                return player.po.breakInfinity ? "<h1>Get past limits.<br>On" : "<h1>Get past limits.<br>Off<br><h2>Req: Tav Defeated";
            },
            canClick() { return player.po.featureSlots.gte(1)},
            unlocked() { return player.in.unlockedBreak || hasMilestone("s", 11) },
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

        30: {
            title: "<small>Celestial Points",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.points) + "<br>(+" + formatSimple(player.gain) + "/s)<hr style='border:1px solid black'>"
                if (player.po.halter.points.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.points.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.points.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.points.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.points.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.points.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked: true,
            onClick() {
                player.po.halterID = "points"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#ccc", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "points") look.border = "3px solid red"
                return look
            },
        },
        31: {
            title: "<small>Factor Power",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.f.factorPower) + "<br>(+" + formatSimple(player.f.factorPowerPerSecond) + "/s)<hr style='border:1px solid black'>"
                if (player.po.halter.factor.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.factor.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.factor.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.factor.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.factor.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.factor.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "factor"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#83cecf", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "factor") look.border = "3px solid red"
                return look
            },
        },
        32: {
            title: "<small>Prestige Points",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.p.prestigePoints) + "<br>(+" + formatSimple(player.p.prestigePointsToGet) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.prestige.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.prestige.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.prestige.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.prestige.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.prestige.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.prestige.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "prestige"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#31aeb0", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "prestige") look.border = "3px solid red"
                return look
            },
        },
        33: {
            title: "<small>Trees",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.t.trees) + "<br>(+" + formatSimple(player.t.treesToGet) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.trees.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.trees.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.trees.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.trees.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.trees.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.trees.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "trees"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#237538", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "trees") look.border = "3px solid red"
                return look
            },
        },
        34: {
            title: "<small>Grass",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.g.grass) + "<br>(+" + formatSimple(player.g.grassVal) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.grass.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.grass.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.grass.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.grass.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.grass.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.grass.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "grass"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#119B35", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "grass") look.border = "3px solid red"
                return look
            },
        },
        35: {
            title: "<small>Golden Grass",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.g.goldGrass) + "<br>(+" + formatSimple(player.g.goldGrassVal) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.goldenGrass.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.goldenGrass.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.goldenGrass.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.goldenGrass.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.goldenGrass.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.goldenGrass.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "goldenGrass"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#ffcf40", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "goldenGrass") look.border = "3px solid red"
                return look
            },
        },
        36: {
            title: "<small>Grasshoppers",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.gh.grasshoppers) + "<br>(+" + formatSimple(player.gh.grasshoppersToGet) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.grasshoppers.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.grasshoppers.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.grasshoppers.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.grasshoppers.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.grasshoppers.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.grasshoppers.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "grasshoppers"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#19e04d", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "grasshoppers") look.border = "3px solid red"
                return look
            },
        },
        37: {
            title: "<small>Code Experience",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.m.codeExperience) + "<br>(+" + formatSimple(player.m.codeExperienceToGet) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.code.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.code.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.code.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.code.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.code.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.code.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "code"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#2a84c5", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "code") look.border = "3px solid red"
                return look
            },
        },
        38: {
            title: "<small>Mods",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.m.mods) + "<br>(+" + formatSimple(player.m.modsToGet) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.mods.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.mods.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.mods.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.mods.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.mods.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.mods.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "mods"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#116bab", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "mods") look.border = "3px solid red"
                return look
            },
        },
        39: {
            title: "<small>Checkback XP",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.cb.xp) + "<br>(+" + formatSimple(player.cb.xpTimers[0].base) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.xp.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.xp.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.xp.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.xp.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.xp.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.xp.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "xp"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#094599", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "xp") look.border = "3px solid red"
                return look
            },
        },
        40: {
            title: "<small>Antimatter",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.ad.antimatter) + "<br>(+" + formatSimple(player.ad.antimatterPerSecond) + "/s)<hr style='border:1px solid black'>"
                if (player.po.halter.antimatter.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.antimatter.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.antimatter.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.antimatter.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.antimatter.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.antimatter.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "antimatter"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#1eb516", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "antimatter") look.border = "3px solid red"
                return look
            },
        },
        41: {
            title: "<small>Infinities",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.in.infinities) + "<br>(+" + formatSimple(player.in.infinitiesToGet) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.infinities.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.infinities.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.infinities.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.infinities.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.infinities.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.infinities.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "infinities"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#d3a165", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "infinities") look.border = "3px solid red"
                return look
            },
        },
        42: {
            title: "<small>Infinity Points",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.in.infinityPoints) + "<br>(+" + formatSimple(player.in.infinityPointsToGet) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.ip.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.ip.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.ip.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.ip.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.ip.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.ip.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "ip"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#ffbf00", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "ip") look.border = "3px solid red"
                return look
            },
        },
        43: {
            title: "<small>NIP",
            display() {
                let str = "<hr style='border:1px solid black'>" + formatSimple(player.ta.negativeInfinityPoints) + "<br>(+" + formatSimple(player.ta.negativeInfinityPointsToGet) + ")<hr style='border:1px solid black'>"
                if (player.po.halter.nip.enabled == 0) {str = str.concat("{" + formatSimple(player.po.halter.nip.halt) + "}<br><span style='color:red'>[DISABLED]")}
                if (player.po.halter.nip.enabled == 1) {str = str.concat("/" + formatSimple(player.po.halter.nip.halt) + "<br><span style='color:green'>[ENABLED]")}
                if (player.po.halter.nip.enabled == 2) {str = str.concat("Cap: " + formatSimple(player.po.halter.nip.halt) + "<br><span style='color:green'>[ENABLED]")}
                return str
            },
            canClick: true,
            unlocked() {return player.ev.evolutionsUnlocked[6]},
            onClick() {
                player.po.halterID = "nip"
            },
            style() {
                let look = {width: "150px", minHeight: "100px", fontSize: "12px", background: "#b2d8d8", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px", margin: "3px"}
                if (player.po.halterID == "nip") look.border = "3px solid red"
                return look
            },
        },

        101: {
            title() {return player.uni.U1.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("U1")},
            onClick() {
                pauseUniverse("U1")
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.uni.U1.paused) {look.backgroundColor = "#aaa"} else {look.backgroundColor = "#fff"}
                return look
            }
        },
        102: {
            title() {return player.uni.U2.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("U2")},
            onClick() {
                pauseUniverse("U2")
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.uni.U2.paused) {look.backgroundColor = "#0f871c"} else {look.backgroundColor = "#10e96b"}
                return look
            }
        },
        103: {
            title() {return player.uni.U3.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("U3")},
            onClick() {
                pauseUniverse("U3")
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.uni.U3.paused) {look.backgroundColor = "#880000"} else {look.backgroundColor = "#bb0000"}
                return look
            }
        },

        201: {
            title() {return player.uni.CB.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("CB")},
            onClick() {
                pauseUniverse("CB")
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.uni.CB.paused) {look.backgroundColor = "#06306b"} else {look.backgroundColor = "#2157a3"}
                return look
            }
        },
        202: {
            title() {return player.uni.UA.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("UA")},
            onClick() {
                pauseUniverse("UA")
            },
            style() {
                let look = {width: "200px", minHeight: "50px", color: "white", background: "black", border: "5px solid", borderRadius: "0 0 12px 12px"}
                if (player.uni.UA.paused) {look.borderColor = "#0043b2"} else {look.borderColor = "#0061ff"}
                return look
            }
        },
        203: {
            title() {return player.uni.UB.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("UB")},
            onClick() {
                pauseUniverse("UB")
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.uni.UB.paused) {look.backgroundColor = "#938600"} else {look.backgroundColor = "#f6e000"}
                return look
            }
        },
        204: {
            title() {return player.uni.DS.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("DS")},
            onClick() {
                pauseUniverse("DS")
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.uni.UB.paused) {look.backgroundColor = "#666666ff"} else {look.backgroundColor = "rgb(161, 161, 161)"}
                return look
            }
        },

        301: {
            title() {return player.uni.A1.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("A1")},
            onClick() {
                pauseUniverse("A1")
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.uni.A1.paused) {look.backgroundColor = "#064461"} else {look.backgroundColor = "#4A7D94"}
                return look
            }
        },
        302: {
            title() {return player.uni.A2.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("A2")},
            onClick() {
                pauseUniverse("A2")
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.uni.A2.paused) {look.backgroundColor = "#36305D"} else {look.backgroundColor = "#5A4FCF"}
                return look
            }
        },

        401: {
            title() {return player.pet.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return uniShown("CB") && player.cb.highestLevel.gte(10)},
            onClick() {
                if (player.pet.paused) {
                    player.pet.paused = false
                } else {
                    player.pet.paused = true
                }
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.pet.paused) {look.backgroundColor = "#3656b2"} else {look.backgroundColor = "#5f89ff"}
                return look
            }
        },
        402: {
            title() {return player.pu.paused ? "PAUSED<br>▶" : "UNPAUSED<br>⏸"},
            canClick: true,
            unlocked() {return hasUpgrade("sma", 14)},
            onClick() {
                if (player.pu.paused) {
                    player.pu.paused = false
                } else {
                    player.pu.paused = true
                }
            },
            style() {
                let look = {width: "200px", minHeight: "50px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0 0 12px 12px"}
                if (player.pu.paused) {look.backgroundColor = "#6272b2"} else {look.backgroundColor = "#97acff"}
                return look
            }
        },
    },
    microtabs: {
        halt: {
            "Halter": {
                buttonStyle() {return {color: "white", borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["blank", "25px"],
                        ["style-column", [
                            ["style-row", [
                            ["clickable", 30], ["clickable", 31], ["clickable", 32], ["clickable", 33],
                            ["clickable", 34], ["clickable", 35], ["clickable", 36], ["clickable", 37],
                            ["clickable", 38], ["clickable", 39], ["clickable", 40], ["clickable", 41],
                            ["clickable", 42], ["clickable", 43],
                        ], {maxWidth: "650px"}],
                        ["blank", "25px"],
                        ["style-column", [
                            ["text-input", "halterInput", () => {
                                let look = {width: "350px", height: "50px", color: "white", textAlign: "left", fontSize: "32px", background: "rgba(0,0,0,0.5)", borderWidth: "0", borderBottom: "3px solid white", borderRadius: "12px 12px 0 0", padding: "0 25px 0 25px"}
                                if (player.ev.evolutionsUnlocked[6]) look.width = "450px"
                                return look
                            }],
                            ["row", [["clickable", 4], ["clickable", 5], ["clickable", 6], ["clickable", 7], ["clickable", 8]]],
                        ], () => {
                            let look = {width: "400px", border: "3px solid white", borderRadius: "15px"}
                            if (player.ev.evolutionsUnlocked[6]) look.width = "500px"
                            return look
                        }],
                        ["blank", "25px"],
                        ["raw-html", "<h3>Enter a number greater than 1. You thought you could get away with dividing by 0?"],
                        ["raw-html", "<h4>This can help by letting you progress in OTFS while infinity is fixed.<br>(and a whole bunch of other stuff eventually)"],
                    ], {width: "650px", background: "rgba(0,0,0,0.3)", border: "3px solid white", borderRadius: "30px", padding: "10px"}],
                ],
            },
            "Pauser": {
                buttonStyle() {return {color: "white", borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "Welcome to the Universe Pauser.<br><small>Paused universes have offline progress.<br>Effect values are not saved on page refresh.</small>", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "600px", height: "75px", background: "rgba(0,0,0,0.3)", border: "3px solid white", borderRadius: "15px"}],
                    ["blank", "10px"],
                    ["row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Universe 1", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 101],
                        ], () => {return uniShown("U1") ? {width: "200px", height: "100px", background: "#ccc", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Universe 2", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 102],
                        ], () => {return uniShown("U2") ? {width: "200px", height: "100px", background: "#10B844", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Universe 3", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 103],
                        ], () => {return uniShown("U3") ? {width: "200px", height: "100px", background: "#aa0000", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                    ]],
                    ["row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Check Back", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 201],
                        ], () => {return uniShown("CB") ? {width: "200px", height: "100px", background: "#094599", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Pets", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 401],
                        ], () => {return uniShown("CB") && player.cb.highestLevel.gte(10) ? {width: "200px", height: "100px", background: "#4e7cff", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Universe α", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 202],
                        ], () => {return uniShown("UA") ? {width: "200px", height: "100px", background: "black", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                    ]],
                    ["row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Alt-Universe 1", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 301],
                        ], () => {return uniShown("A1") ? {width: "200px", height: "100px", background: "#28617B", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Punchcards", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 402],
                        ], () => {return hasUpgrade("sma", 14) ? {width: "200px", height: "100px", background: "#8CA3FF", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Alt-Universe 2", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 302],
                        ], () => {return uniShown("A2") ? {width: "200px", height: "100px", background: "#484096", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                    ]],
                    ["row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Universe β", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 203],
                        ], () => {return uniShown("UB") ? {width: "200px", height: "100px", background: "#c4b300", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Universe ε", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "200px", height: "47px", borderBottom: "3px solid white"}],
                            ["clickable", 204],
                        ], () => {return uniShown("DS") ? {width: "200px", height: "100px", background: "#666666ff", border: "3px solid white", borderRadius: "15px", margin: "5px"} : {display: "none !important"}}],
                    ]],
                ],
            },
        },
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
                buttonStyle() {return { color: "white", borderRadius: "5px" } },
                unlocked() {
                    let halt = false
                    for (i in player.po.halter) {
                        if (player.po.halter[i].enabled > 0) halt = true
                    }
                    for (thing in universes) {
                        if (player.uni[thing].paused) halt = true
                    }
                    return hasMilestone("ip", 23) || halt
                },
                content: [
                    ["microtabs", "halt", {borderWidth: "0px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true }
})
