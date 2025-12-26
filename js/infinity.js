var tree2 = [["in"], ["ad", "ip"], ["ta", "tad"], ["bi", "id", "om"], ["ca", "ro"/*, ["mi"]*/]]
addLayer("in", {
    name: "Roots", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RO", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        unlockedInfinity: false,
        reachedInfinity: false,
        unlockedBreak: false,
        breakInfinity: false,

        infinityPoints: new Decimal(0),
        infinityPointsToGet: new Decimal(0),

        infinities: new Decimal(0),
        infinitiesToGet: new Decimal(1),

        delay: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, #1e6 0%, #181 100%)",
            "background-origin": "border-box",
            "border-color": "#333",
        }
    },
    shouldNotify() {
        if (player["ip"].activeChallenge && canCompleteChallenge("ip", player["ip"].activeChallenge)) {
		    return true
	    }
        return false
    },
    tooltip: "Roots",
    color: "#1b4",
    branches: ["ad", "ip"],
    update(delta) {
        let onepersec = new Decimal(1)

        // USED FOR RESETTING OLD FILES
        if (player.in.delay.gt(0)) {
            player.in.delay = player.in.delay.sub(delta)
            if (player.in.delay.gt(0) && player.in.delay.lte(1)) {
                layers.in.bigCrunch()
                layers.ta.negativeInfinityReset()
                for (let i = 0; i < player.r.milestones.length; i++) {
                    if (+player.r.milestones[i] > 20) {
                        player.r.milestones.splice(i, 1);
                        i--;
                    }
                }
                player.in.delay = new Decimal(0)
            }
        }

        // UNI 2 UNLOCK VARIABLE
        if (player.in.infinityPoints.gt(0)) {
            player.in.unlockedInfinity = true
        }

        // REACH INFINITY CODE (1e308 POINTS ROUGHLY)
        if (player.in.reachedInfinity) {
            if (!player.in.breakInfinity) {
                if (inChallenge("ip", 11) && !hasChallenge("ip", 11)) {
                    player.ip.challenges[11] = 1
                    completeChallenge("ip", 11)
                }
                if (inChallenge("ip", 12) && !hasChallenge("ip", 12)) {
                    player.ip.challenges[12] = 1
                    completeChallenge("ip", 12)
                }
                if (inChallenge("ip", 13) && !hasChallenge("ip", 13)) {
                    player.ip.challenges[13] = 1
                    completeChallenge("ip", 13)
                }
                if (inChallenge("ip", 14) && !hasChallenge("ip", 14)) {
                    player.ip.challenges[14] = 1
                    completeChallenge("ip", 14)
                }
                if (inChallenge("ip", 15) && !hasChallenge("ip", 15)) {
                    player.ip.challenges[15] = 1
                    completeChallenge("ip", 15)
                }
                if (inChallenge("ip", 16) && !hasChallenge("ip", 16)) {
                    player.ip.challenges[16] = 1
                    completeChallenge("ip", 16)
                }
                if (inChallenge("ip", 18) && !hasChallenge("ip", 18)) {
                    player.ip.challenges[18] = 1
                    completeChallenge("ip", 18)
                }
                if (inChallenge("tad", 11)) {
                    if (player.bi.brokenInfinities.gt(player.tad.shatteredInfinitiesToGet) && (player.po.hex || hasUpgrade("s", 18)) && !player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(0)) {
                        player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(player.tad.shatteredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.shatteredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.disfiguredInfinitiesToGet) && (!player.po.hex || hasUpgrade("s", 18)) && !player.po.dice && player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(1)) {
                        player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(player.tad.disfiguredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.disfiguredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.corruptedInfinitiesToGet) && (!player.po.hex || hasUpgrade("s", 18)) && player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(2)) {
                        player.tad.corruptedInfinities = player.tad.corruptedInfinities.add(player.tad.corruptedInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.corruptedInfinitiesToGet)
                    }
                }
                if (!hasMilestone("ip", 21) && ((!player.s.highestSingularityPoints.gt(0)))) {
                    player.tab = "bigc"
                } else {
                    layers.bigc.crunch()
                }
            }
        }

        //----------------------------------------

        // INFINITY POINT BASE
        if (!player.in.breakInfinity) player.in.infinityPointsToGet = new Decimal(1)
        if (player.in.breakInfinity && !hasUpgrade("bi", 111)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log10().div(10)
        if (player.in.breakInfinity && hasUpgrade("bi", 111)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log10().div(2).pow(1.25)
        if (player.in.breakInfinity && hasUpgrade("bi", 115)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log10().pow(1.5)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.cs.scraps.infinity.effect)

        // START OF INFINITY POINT MODIFIERS
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.hbl.boosterEffects[2])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ip", 11))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.d.diceEffects[11])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.rf.abilityEffects[5])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("cb", 12))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ta", 33))
        if (hasUpgrade("ip", 42)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("ip", 42))
        if (hasUpgrade("bi", 101)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("bi", 101))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.om.diceMasteryPointsEffect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("tad", 21))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("gh", 38))
        if (hasUpgrade("bi", 23)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("bi", 23))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.ca.replicantiEffect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("id", 24))
        if (hasUpgrade("hpw", 1063)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("hpw", 1063))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ca", 24))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(levelableEffect("pet", 403)[1])
        if (hasMilestone("fa", 11)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.fa.milestoneEffect[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.sd.singularityPowerEffect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("s", 12))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("fu", 17))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.fu.sadnessEffect2)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.co.cores.infinity.effect[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(levelableEffect("pu", 101)[2])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(levelableEffect("pet", 404)[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ma", 21))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.ma.bestComboDepth1Effect)
        if (hasMilestone("r", 21)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.r.pentMilestone11Effect)
        if (player.pol.pollinatorEffects.water.enabled) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.pol.pollinatorEffects.water.effects[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("st", 301))
        if (player.ma.matosDefeated) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul("1e600")
        if (hasUpgrade("rif", 13)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("rif", 13))

        // POWER MODIFIERS
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.co.cores.infinity.effect[1])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(buyableEffect("sb", 103))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(levelableEffect("ir", 4)[1]).floor()
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.cof.coreFragmentEffects[3])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.exm.exoticMatterEffect)

        // AUTOMATION
        if (hasUpgrade("s", 24)) player.in.infinityPoints = player.in.infinityPoints.add(player.in.infinityPointsToGet.mul(delta))

        //----------------------------------------

        // START OF INFINITIES MODIFIERS
        player.in.infinitiesToGet = new Decimal(1)
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("bi", 11))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("tad", 11))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("om", 11))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("p", 15))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(levelableEffect("pet", 1101)[0])
        if (hasUpgrade("ep2", 14)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(upgradeEffect("ep2", 14))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.co.cores.infinity.effect[2])
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(levelableEffect("ir", 2)[1])
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("cof", 23))

        if (hasUpgrade("hpw", 1061)) player.in.infinities = player.in.infinities.add(player.in.infinitiesToGet.mul(0.1).mul(delta))
    },
    bigCrunch() {
        if (hasUpgrade("ta", 17)) {
            if (player.d.dicePoints.gt(player.ta.highestDicePoints)) {
                player.ta.highestDicePoints = player.d.dicePoints
            }
            if (player.rf.rocketFuel.gt(player.ta.highestRocketFuel)) {
                player.ta.highestRocketFuel = player.rf.rocketFuel
            }
            if (player.h.hexPoint.gt(player.ta.highestHexPoints)) {
                if (player.po.hex || hasUpgrade("s", 18)) player.ta.highestHexPoints = player.h.hexPoint
            }
        }

        //     <----     U1 STUFF     ---->
        player.points = new Decimal(10)
        player.gain = new Decimal(0)

        if (!hasMilestone("ip", 25)) {
            for (let i = 0; i < player.i.upgrades.length; i++) {
                if (+player.i.upgrades[i] < 22) {
                    player.i.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        //     <----     RANK LAYER     ---->
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("ip", 15) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
        player.r.pent = new Decimal(0)

        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)

        if (!hasMilestone("ip", 15) && !inChallenge("ip", 14)) {
            for (let i = 0; i < player.r.milestones.length; i++) {
                if (+player.r.milestones[i] < 20) {
                    player.r.milestones.splice(i, 1);
                    i--;
                }
            }
        }
        
        //     <----     FACTOR LAYER     ---->
        player.f.factorPower = new Decimal(0)
        player.f.factorPowerEffect = new Decimal(1)
        player.f.factorPowerPerSecond = new Decimal(0)

        for (let i in player.f.buyables) {
            player.f.buyables[i] = new Decimal(0)
        }

        //     <----     PRESTIGE LAYER     ---->
        player.p.prestigePoints = new Decimal(0)
        player.p.prestigePointsToGet = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14)) player.p.upgrades.splice(0, player.p.upgrades.length)

        //     <----     TREE LAYER     ---->
        player.t.trees = new Decimal(0)
        player.t.treesToGet = new Decimal(0)
        player.t.leaves = new Decimal(0)
        player.t.leavesPerSecond = new Decimal(0)

        for (let i in player.t.buyables) {
            player.t.buyables[i] = new Decimal(0)
        }

        //     <----     GRASS LAYER     ---->
        player.g.grass = new Decimal(0)
        player.g.grassVal = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.goldGrassVal = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        for (let i = 11; i < 19; i++) {
            player.g.buyables[i] = new Decimal(0)
        }

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14)) player.g.upgrades.splice(0, player.g.upgrades.length)

        //     <----     GRASSHOPPER LAYER     ---->
        player.gh.grasshoppers = new Decimal(0)
        player.gh.grasshoppersToGet = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)
        player.gh.fertilizerPerSecond = new Decimal(0)

        for (let i = 1; i < 20; i++) {
            player.gh.buyables[i] = new Decimal(0)
        }

        //     <----     MOD LAYER     ---->
        player.m.codeExperience = new Decimal(0)
        player.m.codeExperienceToGet = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.linesOfCodePerSecond = new Decimal(0)
        player.m.mods = new Decimal(0)
        player.m.modsToGet = new Decimal(0)

        for (let i = 11; i < 15; i++) {
            player.m.buyables[i] = new Decimal(0)
        }

        //     <----     DICE LAYER     ---->
        player.d.dicePoints = new Decimal(0)
        player.d.diceRolls = [new Decimal(1)]
        player.d.dice = new Decimal(1)

        for (let i = 0; i < 11; i++) {
            player.d.diceEffects[i] = new Decimal(1)
        }

        for (let i = 11; i < 16; i++) {
            player.d.buyables[i] = new Decimal(0)
        }

        if (!inChallenge("ip", 15)) {
            player.d.challengeDicePoints = new Decimal(0)
            player.d.challengeDicePointsToGet = new Decimal(0)

            player.d.upgrades.splice(0, player.d.upgrades.length)

            for (let i = 21; i < 25; i++) {
                player.d.buyables[i] = new Decimal(0)
            }
        }

        //     <----     ROCKETFUEL LAYER     ---->
        player.rf.rocketFuel = new Decimal(0)
        player.rf.rocketFuelToGet = new Decimal(0)
        player.rf.abilityIndex = -1

        for (let i = 0; i < player.rf.abilitiesUnlocked.length; i++) {
            player.rf.abilitiesUnlocked[i] = false
        }

        for (let i = 0; i < 5; i++) {
            player.rf.abilityTimers[i] = new Decimal(0)
            player.rf.abilityEffects[i] = new Decimal(1)
        }

        player.rf.upgrades.splice(0, player.rf.upgrades.length)

        //     <----     U1 CHALLENGE STUFF     ---->
        player.pe.pests = new Decimal(0)
        player.pe.pestsPerSecond = new Decimal(0)
        player.pe.pestEffect = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(0)]

        player.de.antidebuffPoints = new Decimal(0)
        player.de.antidebuffPointsToGet = new Decimal(0)
        player.de.antidebuffEffect = new Decimal(1)
        player.de.antidebuffPointsEffect = new Decimal(1)

        //     <----     POLLINATOR LAYER     ---->
        player.pol.pollinators = new Decimal(0)
        player.pol.pollinatorsPerSecond = new Decimal(0)

        //     <----     FACTORY LAYER     ---->
        player.fa.charge = new Decimal(0)
        player.fa.chargeRate = new Decimal(0)


        //     <----     ANTIMATTER LAYER     ---->
        if (!hasMilestone("ip", 14)) {
            if (player.in.infinities.eq(0)) player.ad.antimatter = new Decimal(10)
            player.ad.antimatterPerSecond = new Decimal(0)

            for (let i = 0; i < player.ad.dimensionAmounts.length; i++) {
                player.ad.dimensionAmounts[i] = new Decimal(0)
                player.ad.dimensionsPerSecond[i] = new Decimal(0)
            }

            for (let i in player.ad.buyables) {
                player.ad.buyables[i] = new Decimal(0)
            }
        }

        //     <----     OTF STUFF     ---->
        if (!player.po.keepOTFS) {
            player.po.dice = false
            player.po.rocketFuel = false
            player.po.hex = false
            player.po.breakInfinity = false
            player.in.breakInfinity = false
            player.po.featureSlots = player.po.featureSlotsMax
        }

        //     <----     MASTERY POINT STUFF     ---->
        if (hasUpgrade("bi", 14)) {
            if (player.po.dice) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
            if (player.po.rocketFuel) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
            if (player.po.hex || hasUpgrade("s", 18)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
        }
    },
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Infinity",
            body() { return "Tav, the celestial of limits, has placed a barrier on the superphysical value of celestial points. He introduced the magic number: 1.7976931...e308. A constant value that represented the point at which celestial points condensed into an infinity. When celestial points are condensed into an infinity, it also produces infinity points as a byproduct. This process is called a big crunch. Infinities are an ancient power, tracing back to the time of the original seven." },
            unlocked() { return true },      
        },
        2: {
            title: "Celestial",
            body() { return "It is safe to conclude the following information about a celestial: Celestials are comprised of a physical aspect, and a superphysical aspect. Both aspects contain immense powers that are incomprehensible by normal life forms. Most of us were once a different life form, humans included. It is unknown what causes us to be celestials. It can be very hard for us to travel between universes, only the most skilled of celestials can. Many unknowns are still present. We don't know who rules the celestials. We don't know why celestials exist. We don't know what our true limits are. It is only a matter of time until I figure everything out." },
            unlocked() { return hasUpgrade("bi", 18) },      
        },
        3: {
            title: "Otherworldly Features",
            body() { return "Otherworldly Features were created by a group of celestials called the Novasent. So far, I have only discovered three of them: Dice, Rocket Fuel, and Hex. The superphysical values that are a part of OTFs are artificial. I find dice to be the most intriguing. The entropic value of these OTFs are fascinating. Randomness isn't too common within SPVs, and especially not artificial SPVs. Zar, the celestial that created this OTF, is a very mysterious celestial. I've heard that he is the strongest of all the novasent. Rocket fuel is also very powerful, as it can lead into multiple universes. It was created by Iridite, the Astral Celestial. I've spoken with her once. She is an insanely smart celestial, but she seems to have psychopathic tendencies. Apparently Iridite and Zar don't get along very well... Hex is the last of the main three OTFs.  This SPV is extremely rare, as instead of representing one number, it is a list of numbers. This one was created by Tera, the Celestial of Tiers. Tera is the most mysterious of the three novasent. I don't have any information on this celestial... Apparently there is an entire universe dedicated to Hex. How strange is that??" },
            unlocked() { return hasUpgrade("bi", 26) },      
        },
    },
    microtabs: {
        stuff: {
            "Lore": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                        ["blank", "25px"],
                        ["infobox", "1"],
                        ["infobox", "2"],
                        ["infobox", "3"],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.ad.antimatterPerSecond) + "/s)"}, () => {
                look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                player.ad.antimatterPerSecond.gt(0) ? look.color = "white" : look.color = "gray"
                return look
            }],
        ]],
        ["raw-html", () => {return "Boosts points by x" + format(player.ad.antimatterEffect) + " (based on points and antimatter)"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && !player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge}
})
addLayer("bigc", {
    name: "Big Crunch", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        spawnedWisps: false,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Big Crunch",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "bigc" && !player.bigc.spawnedWisps)
        {
            player.bigc.spawnedWisps = true
        } else if (player.tab != "bigc")
        {
            removeWisps();
        }
    },
    branches: ["branch"],
    clickables: {
        11: {
            title() { return "<h2>BIG CRUNCH" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "ip"

                layers.bigc.crunch()
            },
            style: { width: '300px', "min-height": '120px' },
        },
    },
    crunch(){
        player.in.infinityPoints = player.in.infinityPoints.add(player.in.infinityPointsToGet)
        player.in.infinities = player.in.infinities.add(player.in.infinitiesToGet)
        if (player.po.dice) player.ip.diceRuns = player.ip.diceRuns.add(1)
        if (player.po.rocketFuel) player.ip.rocketFuelRuns = player.ip.rocketFuelRuns.add(1)
        if (player.po.hex || hasUpgrade("s", 18)) player.ip.hexRuns = player.ip.hexRuns.add(1)
        if (hasUpgrade("ta", 17)) {
            if (player.d.dicePoints.gt(player.ta.highestDicePoints)) {
                player.ta.highestDicePoints = player.d.dicePoints
            }
            if (player.rf.rocketFuel.gt(player.ta.highestRocketFuel)) {
                player.ta.highestRocketFuel = player.rf.rocketFuel
            }
            if (player.h.hexPoint.gt(player.ta.highestHexPoints)) {
                if (player.po.hex || hasUpgrade("s", 18)) player.ta.highestHexPoints = player.h.hexPoint
            }
        }
        layers.in.bigCrunch()
        player.in.reachedInfinity = false
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    tabFormat: [
        ["raw-html", function () { return "<h2>1e308 celestial points- impossible." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "150px"],
        ["row", [["clickable", 11]]],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true }
})
window.addEventListener('load', function() {
    player.bigc.spawnedWisps = false

});
