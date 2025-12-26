var tree1 = [["i"], ["r", "f"], ["p", "t", "g"], ["gh", "pe", "pol", "m"], ["de", "rf", "d"], ["cb", "oi", "fa"]]
addLayer("i", {
    name: "Origin", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OR", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        preOTFMult: new Decimal(1),
        postOTFMult: new Decimal(1),

        cutsceneInput: new Decimal(0),
        cutsceneInputAmount: new Decimal(0),
    }
    },
    automate() {
        if (player.i.auto == true && hasMilestone("ip", 19)) {
            buyUpgrade("i", 11)
            buyUpgrade("i", 12)
            buyUpgrade("i", 13)
            buyUpgrade("i", 14)
            buyUpgrade("i", 15)
            buyUpgrade("i", 16)
            buyUpgrade("i", 17)
            buyUpgrade("i", 18)
            buyUpgrade("i", 19)
            buyUpgrade("i", 21)
        }
        if (hasMilestone("s", 17)) {
            buyUpgrade("i", 11)
            buyUpgrade("i", 12)
            buyUpgrade("i", 13)
            buyUpgrade("i", 14)
            buyUpgrade("i", 15)
            buyUpgrade("i", 16)
            buyUpgrade("i", 17)
            buyUpgrade("i", 18)
            buyUpgrade("i", 19)
            buyUpgrade("i", 21)
            buyUpgrade("i", 22)
            buyUpgrade("i", 23)
            buyUpgrade("i", 24)
            buyUpgrade("i", 25)
            buyUpgrade("i", 26)
            buyUpgrade("i", 27)
            buyUpgrade("i", 28)
            buyUpgrade("i", 29)
            buyUpgrade("i", 30)
            buyUpgrade("i", 31)
            buyUpgrade("i", 32)
            buyUpgrade("i", 33)
            buyUpgrade("i", 34)
            buyUpgrade("i", 35)
            buyUpgrade("i", 36)
            buyUpgrade("i", 37)
            buyUpgrade("i", 38)
            buyUpgrade("i", 39)
            buyUpgrade("i", 41)
            buyUpgrade("i", 101)
    }},
    nodeStyle: {
        background: "linear-gradient(315deg, #bababa 0%, #efefef 100%)",
        backgroundOrigin: "border-box",
        borderColor: "#333",
    },
    tooltip: "Origin",
    branches: ["r", "f"],
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

       // stopRain()

        // START OF PRE-OTF-MULT MODIFIERS
        player.i.preOTFMult = new Decimal(1)
        if (hasUpgrade("s", 11)) player.i.preOTFMult = player.i.preOTFMult.mul(10)
        player.i.preOTFMult = player.i.preOTFMult.mul(levelableEffect("pu", 301)[1])
        if (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) player.i.preOTFMult = player.i.preOTFMult.mul(player.hre.refinementEffect[5][1])
        if (hasMilestone("r", 20)) player.i.preOTFMult = player.i.preOTFMult.mul(100)
        player.i.preOTFMult = player.i.preOTFMult.mul(player.d.diceEffects[15])
        if (hasMilestone("fa", 22)) player.i.preOTFMult = player.i.preOTFMult.mul(player.fa.milestoneEffect[10])

        //----------------------------------------

        //cutscene
        player.i.cutsceneInputAmount = player.i.cutsceneInput.floor()
        if (player.i.cutsceneInput.lt(0)) player.i.cutsceneInputAmount = new Decimal(0)
        // START OF POST-OTF-MULT MODIFIERS
        player.i.postOTFMult = new Decimal(1)
        player.i.postOTFMult = player.i.postOTFMult.mul(buyableEffect("ma", 22))

        //----------------------------------------

        // START OF CELESTIAL POINT MODIFIERS
        player.gain = new Decimal(1)
        player.gain = player.gain.mul(player.r.rankEffect)
        player.gain = player.gain.mul(player.r.tierEffect)
        player.gain = player.gain.mul(buyableEffect("f", 11))
        player.gain = player.gain.mul(buyableEffect("f", 12))
        player.gain = player.gain.mul(buyableEffect("f", 13))
        player.gain = player.gain.mul(buyableEffect("f", 14))
        player.gain = player.gain.mul(buyableEffect("f", 15))
        player.gain = player.gain.mul(buyableEffect("f", 16))
        player.gain = player.gain.mul(buyableEffect("f", 17))
        player.gain = player.gain.mul(buyableEffect("f", 18))
        if (hasUpgrade("cs", 201)) player.gain = player.gain.mul(buyableEffect("f", 101))
        player.gain = player.gain.mul(player.r.tetrEffect)
        if (hasUpgrade("p", 11)) player.gain = player.gain.mul(3)
        if (hasUpgrade("p", 12)) player.gain = player.gain.mul(player.p.prestigeEffect)
        player.gain = player.gain.mul(player.f.factorPowerEffect)
        player.gain = player.gain.mul(buyableEffect("t", 15))
        player.gain = player.gain.mul(buyableEffect("g", 14))
        player.gain = player.gain.mul(player.gh.grasshopperEffects[0])
        if (hasMilestone("r", 13)) player.gain = player.gain.mul(player.g.grassEffect2)
        player.gain = player.gain.mul(buyableEffect("m", 14))
        if (player.cb.effectActivate) player.gain = player.gain.mul(player.cb.levelEffect)
        player.gain = player.gain.mul(levelableEffect("pet", 101)[0])
        player.gain = player.gain.mul(player.d.diceEffects[0])
        if (!inChallenge("ip", 16)) player.gain = player.gain.mul(player.rf.abilityEffects[0])
        player.gain = player.gain.mul(player.ad.antimatterEffect)
        if (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) player.gain = player.gain.mul(player.hpr.rankEffect[0][0])
        if (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) player.gain = player.gain.mul(player.hpr.rankEffect[1][0])
        if (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) player.gain = player.gain.mul(player.hpr.rankEffect[2][0])
        if (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) player.gain = player.gain.mul(player.hpr.rankEffect[3][0])
        if (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) player.gain = player.gain.mul(player.hpr.rankEffect[4][0])
        if (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) player.gain = player.gain.mul(player.hpr.rankEffect[5][0])

        // CHALLENGE CONTENT
        player.gain = player.gain.div(player.pe.pestEffect[0])
        if (inChallenge("ip", 13)) player.gain = player.gain.pow(0.75)
        if (inChallenge("ip", 14)) player.gain = player.gain.div(player.r.challengeIVEffect)
        if (inChallenge("ip", 15)) player.gain = player.gain.pow(0.9)
        if (hasUpgrade("d", 13)) player.gain = player.gain.mul(upgradeEffect("d", 13))
        if (hasUpgrade("d", 17)) player.gain = player.gain.mul(upgradeEffect("d", 17))
        if (inChallenge("ip", 16)) player.gain = player.gain.pow(0.05)
        if (inChallenge("ip", 16)) player.gain = player.gain.mul(player.rf.abilityEffects[0])
        if (hasUpgrade("rf", 16)) player.gain = player.gain.mul(upgradeEffect("rf", 16))
        if (inChallenge("ip", 18)) player.gain = player.gain.pow(0.4)
        if (player.de.antidebuffIndex.eq(0)) player.gain = player.gain.mul(player.de.antidebuffEffect)
        if (inChallenge("tad", 11)) player.gain = player.gain.pow(0.45)
        if (inChallenge("tad", 11)) player.gain = player.gain.pow(buyableEffect("de", 11))
        if (inChallenge("tad", 11)) player.gain = player.gain.mul(player.de.tavPointsEffect)
        if (hasUpgrade("de", 15) && inChallenge("tad", 11)) player.gain = player.gain.mul(upgradeEffect("de", 15))

        // CONTINUED REGULAR MODIFIERS
        if (player.pol.pollinatorEffects.beetle.enabled) player.gain = player.gain.mul(player.pol.pollinatorEffects.beetle.effects[0])
        player.gain = player.gain.mul(buyableEffect("gh", 31))
        player.gain = player.gain.mul(player.id.infinityPowerEffect2)
        player.gain = player.gain.mul(player.r.timeCubeEffects[0])
        player.gain = player.gain.mul(player.ca.replicantiEffect3)
        player.gain = player.gain.mul(player.i.preOTFMult)
        player.gain = player.gain.mul(player.co.cores.point.effect[0])
        if (hasUpgrade("ep2", 1)) player.gain = player.gain.mul(upgradeEffect("ep2", 1))

        // POWER MODIFIERS
        if (hasUpgrade("bi", 11)) player.gain = player.gain.pow(1.1)
        player.gain = player.gain.pow(player.co.cores.point.effect[1])
        player.gain = player.gain.pow(player.sd.singularityPowerEffect3)
        player.gain = player.gain.pow(player.st.starPowerEffect)
        player.gain = player.gain.pow(player.se.starsExploreEffect[0][1])
        player.gain = player.gain.pow(levelableEffect("ir", 2)[0])
        player.gain = player.gain.pow(player.cof.coreFragmentEffects[0])
        player.gain = player.gain.pow(buyableEffect("cof", 12))
        player.gain = player.gain.pow(player.cep.cerePointsEffect)

        // ABNORMAL MODIFIERS, PLACE NEW MODIFIERS BEFORE THIS
        if (inChallenge("ip", 18) && player.points.gt(player.points.mul(0.9 * delta))) player.points = player.points.sub(player.points.mul(0.9 * delta))
        if (player.r.timeReversed) {
            player.gain = player.gain.mul(0)
            player.points = player.points.div(player.points.add(1).log10().mul(0.1).add(1).mul(delta))
        }
        player.gain = player.gain.div(player.po.halterEffects[0])
        if (!player.in.breakInfinity && player.gain.gte("9.99e309")) player.gain = new Decimal("9.99e309")

        // CELESTIAL POINT PER SECOND
        player.points = player.points.add(player.gain.mul(delta))
    },
    bars: {
        infbar: {
            unlocked() { return hasUpgrade("i", 21) && !player.in.unlockedInfinity },
            direction: RIGHT,
            width: 700,
            height: 50,
            progress() {
                return player.points.add(1).log10().div("308.25")
            },
            fillStyle: { backgroundColor: "#b28500" },
            borderStyle: { border: "3px solid" },
            display() {
                return "<h2>" + format(player.points.add(1).log10().div("308.25").mul(100)) + "%</h2>";
            },
        },
    },
    upgrades: {
        11: {
            title: "Feature I",
            unlocked() { return true },
            description: "Unlocks Ranks.",
            cost: new Decimal(10),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Feature II",
            unlocked() { return hasUpgrade("i", 11) },
            description: "Unlocks Factors.",
            cost: new Decimal(40),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Tetr",
            unlocked() { return hasUpgrade("i", 12) },
            description: "Unlocks Tetr (In ranks).",
            cost: new Decimal(2500),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Prestige",
            unlocked() { return hasUpgrade("i", 13) },
            description: "Unlocks Prestige.",
            cost: new Decimal(150000),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "Power Factors",
            unlocked() { return hasUpgrade("i", 14) },
            description: "Unlocks Power Factors (In factors).",
            cost: new Decimal(4e10),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "Trees",
            unlocked() { return hasUpgrade("i", 15) },
            description: "Unlocks Trees.",
            cost: new Decimal(1e15),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        17: {
            title: "Grass",
            unlocked() { return hasUpgrade("i", 16) },
            description: "Unlocks Grass.",
            cost: new Decimal(1e20),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        18: {
            title: "Pent",
            unlocked() { return hasUpgrade("i", 17) },
            description: "Unlocks Pent (in ranks).",
            cost: new Decimal(1e28),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        19: {
            title: "Check Back",
            unlocked() { return hasUpgrade("i", 18) },
            description: "Unlocks Check Back.",
            cost: new Decimal(1e100),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: "OTF",
            unlocked() { return hasUpgrade("i", 19) },
            description: "Unlocks Otherworldly Features.",
            cost: new Decimal(1e150),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        22: {
            title: "Pollinate",
            unlocked() { return player.in.unlockedBreak},
            description: "Use the experience of debuffs and pests to create Pollinators.",
            cost: new Decimal("1e450"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        23: {
            title: "Steel",
            unlocked() { return hasUpgrade("i", 22) && hasUpgrade("bi", 106)},
            description: "Unlocks Steelie reset layer (in grasshop).",
            cost: new Decimal("1e800"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        24: {
            title: "Crystallize",
            unlocked() { return hasUpgrade("i", 23) && hasUpgrade("bi", 106)},
            description: "Unlocks Crystallize reset layer (in prestige).",
            cost: new Decimal("1e1000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        25: {
            title: "Productive Pollination",
            unlocked() { return hasUpgrade("i", 24) && hasUpgrade("bi", 106)},
            description: "Unlocks more Pollinator upgrades.",
            cost: new Decimal("1e1200"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        26: {
            title: "Time Reversal",
            unlocked() { return hasUpgrade("i", 25) && hasUpgrade("bi", 106)},
            description: "Unlocks Time Reversal (in ranks layer).",
            cost: new Decimal("1e1400"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        27: {
            title: "Pentomation",
            unlocked() { return hasUpgrade("i", 26) && hasUpgrade("bi", 106)},
            description: "Automatically gain pent without resetting.",
            cost: new Decimal("1e1600"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        28: {
            title: "2nd OTF slot...",
            unlocked() { return hasUpgrade("i", 27) && hasUpgrade("bi", 106)},
            description: "Gain a 2nd OTF slot. (doesn't stack with tav's domain)",
            cost: new Decimal("1e1800"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        29: {
            title: "True Refinement",
            unlocked() { return hasUpgrade("i", 32) && hasUpgrade("bi", 106) && player.ca.unlockedCante},
            description: "Unlock Hex of Purity.",
            cost: new Decimal("1e3000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        30: {
            title: "Hexing Power",
            unlocked() { return hasUpgrade("i", 29) && hasUpgrade("bi", 106) && player.ca.unlockedCante},
            description: "Unlock Hex of Power.",
            cost: new Decimal("1e3600"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        31: {
            title: "Auto CDPs",
            unlocked() { return (hasUpgrade("i", 28) && hasUpgrade("bi", 106) && player.po.dice && player.ca.unlockedCante && player.ev.evolutionsUnlocked[5]) || hasUpgrade("i", 31)},
            description: "Gain 5% challenge dice points per second.",
            cost: new Decimal("1e4600"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        32: {
            title: "Completely Pentomated",
            unlocked() { return hasUpgrade("i", 28) && hasUpgrade("bi", 106)},
            description: "You can now buy max pent.",
            cost: new Decimal("1e2400"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        37: {
            title: "Challenge I.",
            unlocked() { return inChallenge("ip", 11) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e9000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        38: {
            title: "Challenge II.",
            unlocked() { return inChallenge("ip", 12) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e12000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        39: {
            title: "Challenge III.",
            unlocked() { return inChallenge("ip", 13) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e2400"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        41: {
            title: "Challenge IV.",
            unlocked() { return inChallenge("ip", 14) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e7000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        101: {
            title: "Factory",
            unlocked() { return hasMilestone("s", 11)},
            description: "Unlocks the factory.",
            cost: new Decimal("1e16000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    clickables: {
        11: {
            title() { return "<h2>Replay Cutscene" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.c.cutscene[player.i.cutsceneInput] = true
            },
            style: { width: '300px', "min-height": '60px' },
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Superphysical Values",
            body() { return "Based on my research, a superphysical value refers to currencies such as points, prestige points, and infinity points; they aren't tangible items that physical beings can interact with, but they still exist in the universe for varying purposes. The main reason superphysical values exist within a Universe is to give structure and reason within the universe. They can also be used to promote growth of a real, non-superphysical value or physical objects. This also prevents total chaos from spawning. Superphysical values can be used to promote the growth of both real, physical values and other superphysical values. When a Universe is created, a default Superphysical Value is created with it. Superphysical Values can transform and evolve either by reaching a certain amount and causing a forced transformation, or through a manual transformation process." },
            unlocked() { return true },      
        },
        2: {
            title: "Foresight",
            body() { return "The power of sensing superphysical values is a power only a few can achieve. However, this is not so rare among us celestials. I don\'t know why, but this power is within our nature. Superphysical values aren\'t visible by eye, but they are visible using some kind of sensors, which are also made of superphysical values. I\'ve yet to name these sensors. Some advanced forms of foresight can lead to the manipulation of super physical values. Cante can manipulate replicanti, and Nova can manipulate singularity. Another advanced form of foresight is using superphysical values in physical ways. I, for example, can manipulate the laws of physics using superphysical values." },
            unlocked() { return hasUpgrade("i", 15) },       
        },
        3: {
            title: "Universe",
            body() { return "Throughout my time of traversing the multiverse, I've noticed many different types of universes. The first type is an empty universe. Theses universes only consist of boundaries, and within those boundaries, are nothing. The second type is a non-living universe. These universes have an abundance of matter, but a lack of living organisms. The third type universe is a living universe. These universes contain lifeforms, and even advanced civilizations in some cases. The final type of universe is a fantasy universe. These universes contain magic power, which can lead to the universe containing different supernatural elements within it. Now. I am trying to create a fifth type of universe. A universe that runs completely on superphysical values. It would benefit the celestials a lot." },
            unlocked() { return hasUpgrade("i", 21) },      
        },
        4: {
            title: "Realms",
            body() { return "The multiverse is divided into six realms. Each realm containing a certain amount of universes, and some realms are higher than others on a metaphysical plane. There are six realms: The creator realm, the higher plane of existence, the death realm, the dimensional realm, the dream realm, and the void. It is believed that long ago, a being of immense power had split the multiverse into the realms. Over time, each realm started to develop their own unique traits and lifeforms. Eventually, the realms started to have contact with one another, and a multiversal scale conflict broke out. Over time, some realms formed alliances against others. We are still in war." },
            unlocked() { return player.ca.defeatedCante || player.s.highestSingularityPoints.gt(0)},      
        },
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
                        ["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23],
                        ["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27], ["upgrade", 28], ["upgrade", 32],
                        ["upgrade", 29], ["upgrade", 30], ["upgrade", 31], ["upgrade", 101],
                        ["upgrade", 37], ["upgrade", 38], ["upgrade", 39], ["upgrade", 41]], {maxWidth: "800px"}],
                ],
            },
            "Lore": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true},
                content: [
                    ["blank", "25px"],
                    ["infobox", "1"],
                    ["infobox", "2"],
                    ["infobox", "3"],
                    ["infobox", "4"],
                ],
            },
            "Cutscene Rewatch": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true},
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Note: THIS FEATURE IS HEAVILY BUGGED AND UNOPTIMIZED" }, { "color": "red", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "(Note: Cutscene requirements must be met in order to rewatch a cutscene.)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Cutscene IDs start at 0.)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Current Cutscene ID: " + formatWhole(player.i.cutsceneInput) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [
                    ["text-input", "cutsceneInput", {
                        color: "var(--color)",
                        width: "400px",
                        height: "48px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                    ["clickable", 11],
                    ]],
                ],
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() {
        if (player.startedGame == false) return true
        return !player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge
    }
})
function callAlert(message, imageUrl, imagePosition = 'top') {
    return new Promise((resolve) => {
        // Check if a modal already exists on the page
        if (document.querySelector('.modal-container')) {
            return; // If a modal is already present, exit the function
        }

        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Create modal message
        const modalMessage = document.createElement('p');
        modalMessage.innerHTML = message.replace(/\n/g, '<br>'); // Replace '\n' with a line break

        // Append modal message to modal content
        modalContent.appendChild(modalMessage);

        // If imageUrl is provided and imagePosition is 'top', create image element and append it to modal content before the message
        if (imageUrl && imagePosition === 'top') {
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl; // Set image source
            modalContent.insertBefore(imageElement, modalMessage);
        }

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Next';
        closeButton.addEventListener('click', closeModal);

        // Append close button to modal content
        modalContent.appendChild(closeButton);

        // If imageUrl is provided and imagePosition is 'bottom', create image element and append it to modal content after the message and button
        if (imageUrl && imagePosition === 'bottom') {
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl; // Set image source
            modalContent.appendChild(imageElement);
        }

        // Append modal content to modal container
        modalContainer.appendChild(modalContent);

        // Append modal container to body
        document.body.appendChild(modalContainer);

        // Show the modal
        modalContainer.style.display = 'flex';
        modalContainer.style.alignItems = 'center';
        modalContainer.style.justifyContent = 'center';
        modalContainer.style.zIndex = '5';

        // Apply background color and increase width
        modalContent.style.background = '#ccc'; // Grey background
        modalContent.style.width = '30%'; // Adjust the width as needed

        // Function to close the modal
        function closeModal() {
            modalContainer.style.display = 'none';
            // Optionally, remove the modal from the DOM after closing
            document.body.removeChild(modalContainer);
            resolve();
        }
    });
}
    document.addEventListener('keydown', function(event) {
        if (event.altKey && options.toggleHotkey) {
            if (!options.musicToggle) 
            {
                options.musicToggle = true
                doPopup("milestone", "Music is toggled on.", "Milestone Gotten!", 3, "#ffffff")
            } else
            {
                options.musicToggle = false
                doPopup("milestone", "Music is toggled off.", "Milestone Gotten!", 3, "#ffffff")
            }
        }
    });