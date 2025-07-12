var tree1 = [["h", "r", "f", "p", "re"], ["t", "g", "pe", "pol", "gh", "rf"], ["fa", "de", "m", "cb", "d"], ["rm", "gem", "oi"]]

addLayer("i", {
    name: "Incremental", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "1", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        PreOTFMult: new Decimal(1),
    }
    },
    automate() {
        if (player.i.auto == true && hasMilestone("ip", 19))
        {
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
            if (hasMilestone("s", 11)) buyUpgrade("i", 20)
        }
        if (hasMilestone("s", 17))
        {
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
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, #bababa 0%, #efefef 100%)",
            "background-origin": "border-box",
            "border-color": "#151515",
        };
    },
    tooltip: "Universe 1 - Overworld",
    branches: ["in"],
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.startedGame == false && player.tab == "i") {
            player.startedGame = true
        }

        if (player.startedGame && options.newMenu) {
            if (player.tab == "i") {
                player.tab = "u1u"
            } else if (player.tab == "in") {
                player.tab = "ip"
            } else if (player.tab == "cp" && !player.cap.cantepocalypsePrep) {
                player.tab = "a1u"
            } else if (player.tab == "po") {
                player.tab = "otherfeat"
            }
        }

        if (player.startedGame == true && player.c.cutscene1 == false) {
            player.gain = new Decimal(1)
        }

        if (player.tab == "cb" || player.tab == "ep0" || player.tab == "ep1" || player.tab == "ep2" || player.tab == "ep3" || player.tab == "ep4" || player.tab == "ep5" || player.tab == "ev" || player.tab == "ev0"
          || player.tab == "ev1" || player.tab == "ev2" || player.tab == "ev4" || player.tab == "ev8" || player.tab == "ev9" || player.tab == "ev10") {
            if (options.newMenu == false) player.universe = 0.5
            player.musuniverse = 0.5
        }
        if (player.tab == "mi") {
            if (options.newMenu == false) player.universe = 0.6
            player.musuniverse = 0.6
        }
        if (player.tab == "i" || player.tab == "u1u" || player.tab == "u1t" || player.tab == "u1l"  || player.tab == "h" || player.tab == "r" || player.tab == "f" || player.tab == "p" || player.tab == "t" || player.tab == "g"
          || player.tab == "pe" || player.tab == "pol" || player.tab == "gh" || player.tab == "rf" || player.tab == "de" || player.tab == "m" || player.tab == "d" || player.tab == "rm" ||
        player.tab == "re" || player.tab == "fa" ) {
            if (options.newMenu == false) player.universe = 1
            player.musuniverse = 1
        }

        if (player.tab == "in" || player.tab == "ad" || player.tab == "ip" || player.tab == "id" || player.tab == "tad" || player.tab == "ta" || player.tab == "bi" || player.tab == "om"
          || player.tab == "ga" || player.tab == "ca" || player.tab == "u2t" || player.tab == "u2l" || player.tab == "ro"  ) {
            if (options.newMenu == false) player.universe = 2
            player.musuniverse = 2
        }
        if (player.tab == "sme" || player.tab == "cof" || player.tab == "coa" || player.tab == "cop" || player.tab == "ra" || player.tab == "cs" || player.tab == "sd" || player.tab == "u3t" || player.tab == "u3u" || player.tab == "u3m" || player.tab == "u3l" || player.tab == "u3b" || player.tab == "sma"|| player.tab == "ma") {
            if (options.newMenu == false) player.universe = 3
            player.musuniverse = 3
        }
        if (player.tab == "ch" || player.tab == "cmh" || player.tab == "cmc" ) {
            if (options.newMenu == false) player.universe = -0.5
            player.musuniverse = -0.5
        }
        if (player.tab == "dut" || player.tab == "du" || player.tab == "dg" || player.tab == "dgr" || player.tab == "dn" || player.tab == "dp" || player.tab == "dr" || player.tab == "le"  ) {
            if (options.newMenu == false) player.universe = -0.1
            player.musuniverse = -0.1
        }
        if (player.tab == "cp" || player.tab == "ar" || player.tab == "pr" || player.tab == "an" || player.tab == "rt" || player.tab == "rg" || player.tab == "gs" || player.tab == "oi"
          || player.tab == "a1u" || player.tab == "a1t" || player.tab == "a1s"|| player.tab == "fu") {
            if (options.newMenu == false) player.universe = 1.5
            player.musuniverse = 1.5
            //startRain("#1486ff");
        } else {
            //stopRain();
        }
        if (player.tab == "au2" || player.tab == "au2t" || player.tab == "st" || player.tab == "pl") {
            if (options.newMenu == false) player.universe = 2.5
            player.musuniverse = 2.5
        }

        if (player.tab == "po" || player.tab == "otherfeat" || player.tab == "halter") {
            if (options.newMenu == false) player.universe = 0
            player.musuniverse = 0
        }

        if (player.tab == "c" || player.tab == "gt") {
            if (options.newMenu == false) player.universe = -1
            player.musuniverse = -1
        }

        if (player.tab == "od" || player.tab == "mu") {
            if (options.newMenu == false) player.universe = 1337
            player.musuniverse = 1337
        }

        //music control
        if (player.musuniverse == 1 && player.startedGame && options.musicToggle && !(inChallenge("ip", 11) || inChallenge("ip", 12) || inChallenge("ip", 13) || inChallenge("ip", 14) || inChallenge("ip", 15) || inChallenge("ip", 16) || inChallenge("ip", 17) || inChallenge("ip", 18) || inChallenge("tad", 11)) ) {
            playAndLoopAudio("music/universe1.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 1 && (inChallenge("ip", 11) || inChallenge("ip", 12) || inChallenge("ip", 13) || inChallenge("ip", 14) || inChallenge("ip", 15) || inChallenge("ip", 16) || inChallenge("ip", 17) || inChallenge("ip", 18) || inChallenge("tad", 11)) && options.musicToggle) {
            playAndLoopAudio("music/tav.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 0 && options.musicToggle) {
            playAndLoopAudio("music/portal.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 2 && options.musicToggle) {
            playAndLoopAudio("music/universe2.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 3 && options.musicToggle) {
            if (player.ma.inBlackHeart == false)
            {
                if (!player.ma.matosDefeated) playAndLoopAudio("music/singularity.mp3", options.musicVolume/10);
                if (player.ma.matosDefeated) playAndLoopAudio("music/singularity2.mp3", options.musicVolume/10);
            } else
            {
                if (!player.ma.fightingCelestialites)
                {
                    playAndLoopAudio("music/enteringBlackHeart.mp3", options.musicVolume/10);
                } else
                {
                    if (player.ma.currentDepth.eq(1)) playAndLoopAudio("music/celestialites.mp3", options.musicVolume/10);
                    if (player.ma.currentDepth.eq(2)) playAndLoopAudio("music/blackHeart.mp3", options.musicVolume/10);
                    if (player.ma.currentDepth.eq(3) && !player.ma.matosFightActive && player.ma.currentCelestialiteType != 25) playAndLoopAudio("music/matosTheme.mp3", options.musicVolume/10);
                    if (player.ma.currentDepth.eq(3) && player.ma.matosFightActive && player.ma.currentCelestialiteType == 25) playAndLoopAudio("music/matosFight.mp3", options.musicVolume/10);
                } //use blackHeart.mp3 for depth 2, matosTheme.mp3 for depth 3
            }
        } else if (player.musuniverse == 0.5 && options.musicToggle) {
            playAndLoopAudio("music/checkback.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 0.6 && options.musicToggle) {
            //playAndLoopAudio("music/mining.mp3", options.musicVolume/10);
        } else if (player.musuniverse == -0.5 && options.musicToggle) {
            if (player.tab == "cmh") playAndLoopAudio("music/hallOfCelestials.mp3", options.musicVolume/10);
            if ((player.tab == "ch" && player.subtabs["ch"]["stuff"] != "???") || player.tab == "cmc") playAndLoopAudio("music/aniciffoCutscene.mp3", options.musicVolume/10);
        } else if (player.musuniverse == -0.1 && !player.pet.activeAbilities[0] && options.musicToggle) {
            playAndLoopAudio("music/darkUni1.mp3", options.musicVolume/10);
        } else if (player.musuniverse == -0.1 && player.pet.activeAbilities[0] && options.musicToggle) {
            playAndLoopAudio("music/eclipse.mp3", options.musicVolume/10);
        } else if (player.musuniverse == -1 && options.musicToggle && player.tab == "c") {
            if (player.c.currentCutscene == 0 || player.c.currentCutscene == 1 || player.c.currentCutscene == 3 || player.c.currentCutscene == 6 || player.c.currentCutscene == 7 || player.c.currentCutscene == 9 || player.c.currentCutscene == 11 || player.c.currentCutscene == 12) {
               playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            } else if (player.c.currentCutscene == 2 || player.c.currentCutscene == 4 || player.c.currentCutscene == 5 || player.c.currentCutscene == 8 || player.c.currentCutscene == 10 || player.c.currentCutscene == 13) {
                playAndLoopAudio("music/cutsceneBox.mp3", options.musicVolume/10);
            } else if (player.c.currentCutscene == 14 || player.c.currentCutscene == 15 ) {
                playAndLoopAudio("music/singularityCutscene.mp3", options.musicVolume/10);
            } else if (player.c.currentCutscene == 16 || player.c.currentCutscene == 17 || player.c.currentCutscene == 18 || player.c.currentCutscene == 24 || player.c.currentCutscene == 25 || player.c.currentCutscene == 26 || player.c.currentCutscene == 27) {
                playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            } else if (player.c.currentCutscene == 19 || player.c.currentCutscene == 20 || player.c.currentCutscene == 21 || player.c.currentCutscene == 22 || player.c.currentCutscene == 23) {
                playAndLoopAudio("music/somethingSomething.mp3", options.musicVolume/10);
            } else if (player.c.currentCutscene == 28 || player.c.currentCutscene == 29) {
                playAndLoopAudio("music/confrontation.mp3", options.musicVolume/10);
            } else if (player.c.currentCutscene == 33 || player.c.currentCutscene == 34 || (player.c.currentCutscene == 35 && player.c.cutsceneIndex < 24)) {
                playAndLoopAudio("music/matosCutscene.mp3", options.musicVolume/10);
            } else if (player.c.currentCutscene == 35 && player.c.cutsceneIndex >= 24) {
                playAndLoopAudio("music/aniciffoCutscene.mp3", options.musicVolume/10);
            } else if (player.c.currentCutscene == 30 || player.c.currentCutscene == 31|| player.c.currentCutscene == 32) {
                playAndLoopAudio("music/novaCutscene.mp3", options.musicVolume/10);
            }
        } else if (player.musuniverse == 1.5 && options.musicToggle) {
            playAndLoopAudio("music/alt-uni1.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 2.5 && options.musicToggle) {
            playAndLoopAudio("music/space.mp3", options.musicVolume/10);
        }  else {
            stopAudio();
        }


        stopRain();
       /* if (player.universe == 1.5)
        {
            startRain("#1486ff");
        }
         else
        {
            stopRain();
        } */

        // START OF PRE-OTF-MULT MODIFIERS
        player.i.preOTFMult = new Decimal(1)
        if (hasUpgrade("s", 11)) player.i.preOTFMult = player.i.preOTFMult.mul(10)
        player.i.preOTFMult = player.i.preOTFMult.mul(player.le.punchcardsPassiveEffect[14])
        if (hasMilestone("r", 20)) player.i.preOTFMult = player.i.preOTFMult.mul(100)
        player.i.preOTFMult = player.i.preOTFMult.mul(player.d.diceEffects[15])
        if (hasMilestone("fa", 22)) player.i.preOTFMult = player.i.preOTFMult.mul(player.fa.milestoneEffect[10])

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
        player.gain = player.gain.mul(player.r.tetrEffect)
        if (hasUpgrade("p", 11)) player.gain = player.gain.mul(3)
        if (hasUpgrade("p", 12)) player.gain = player.gain.mul(upgradeEffect("p", 12))
        player.gain = player.gain.mul(buyableEffect("f", 17))
        player.gain = player.gain.mul(player.f.factorPowerEffect)
        player.gain = player.gain.mul(buyableEffect("t", 15))
        player.gain = player.gain.mul(buyableEffect("g", 14))
        player.gain = player.gain.mul(player.gh.grasshopperEffects[0])
        if (hasMilestone("r", 13)) player.gain = player.gain.mul(player.r.pentMilestone3Effect)
        player.gain = player.gain.mul(buyableEffect("m", 14))
        if (player.cb.effectActivate) player.gain = player.gain.mul(player.cb.levelEffect)
        player.gain = player.gain.mul(levelableEffect("pet", 101)[0])
        player.gain = player.gain.mul(player.d.diceEffects[0])
        if (!inChallenge("ip", 16)) player.gain = player.gain.mul(player.rf.abilityEffects[0])
        player.gain = player.gain.mul(player.ad.antimatterEffect)

        // CHALLENGE CONTENT
        player.gain = player.gain.div(player.pe.pestEffect[0])
        if (inChallenge("ip", 13)) player.gain = player.gain.pow(0.75)
        if (inChallenge("ip", 13) || player.po.hex) player.gain = player.gain.mul(player.h.hexPointsEffect[0])
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
        if (player.pol.pollinatorsIndex == 1) player.gain = player.gain.mul(player.pol.pollinatorsEffect[0])
        player.gain = player.gain.mul(buyableEffect("gh", 31))
        player.gain = player.gain.mul(player.id.infinityPowerEffect2)
        player.gain = player.gain.mul(player.r.timeCubeEffects[0])
        player.gain = player.gain.mul(player.ca.replicantiEffect3)
        player.gain = player.gain.mul(player.i.preOTFMult)
        if (player.cop.processedCoreFuel.eq(0)) player.gain = player.gain.mul(player.cop.processedCoreInnateEffects[0])

        // POWER MODIFIERS
        if (hasUpgrade("bi", 11)) player.gain = player.gain.pow(1.1)
        player.gain = player.gain.pow(player.re.realmEssenceEffect)
        if (player.cop.processedCoreFuel.eq(0)) player.gain = player.gain.pow(player.cop.processedCoreInnateEffects[1])

        // ABNORMAL MODIFIERS, PLACE NEW MODIFIERS BEFORE THIS
        if (inChallenge("ip", 18) && player.points.gt(player.points.mul(0.9 * delta))) player.points = player.points.sub(player.points.mul(0.9 * delta))
        if (player.r.timeReversed) {
            player.gain = player.gain.mul(0)
            player.points = player.points.div(player.points.add(1).log10().mul(0.1).add(1).mul(delta))
        }
        if (player.po.realmMods) player.gain = player.gain.pow(0.35)
        player.gain = player.gain.div(player.po.halterEffects[0])
        if (!player.in.breakInfinity && player.gain.gte("9.99e309")) player.gain = new Decimal("9.99e309")
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.div(player.po.halterEffects[2])
        player.t.leavesPerSecond = player.t.leavesPerSecond.div(player.po.halterEffects[3])
        player.t.treesToGet = player.t.treesToGet.div(player.po.halterEffects[4])
        player.g.grassVal = player.g.grassVal.div(player.po.halterEffects[5])

        //post otf
        let postOTFMult = new Decimal(1)
        postOTFMult = postOTFMult.mul(buyableEffect("ma", 22))

        player.h.ragePowerToGet = player.h.ragePowerToGet.mul(postOTFMult)
        player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(postOTFMult)
        player.p.crystalsToGet = player.p.crystalsToGet.mul(postOTFMult)
        player.gh.steelToGet = player.gh.steelToGet.mul(postOTFMult)
        player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(postOTFMult)
        player.fa.chargeRate = player.fa.chargeRate.mul(postOTFMult)
        player.gain = player.gain.pow(player.sd.singularityPowerEffect3)
        player.gain = player.gain.pow(player.st.starPowerEffect)

        // CELESTIAL POINT PER SECOND
        player.points = player.points.add(player.gain.mul(delta))

        // MAKE TAB WORK
        if (player.subtabs["i"]['stuff'] == 'Portal' && player.tab != "in") {
            player.po.lastUniverse = 'i'
            player.tab = "po"
            player.subtabs["i"]['stuff'] = 'Features'
        }
        if (player.subtabs["i"]['stuff'] == 'Settings' && player.tab != "in") {
            player.po.lastUniverse = 'i'
            player.tab = "settings"
            player.subtabs["i"]['stuff'] = 'Features'
        }

        player.r.timeCubes = player.r.timeCubes.add(player.r.timeCubesPerSecond.mul(delta))
        player.h.ragePower = player.h.ragePower.add(player.h.ragePowerToGet.mul(Decimal.mul(buyableEffect("fa", 201), delta)))
        player.p.crystals = player.p.crystals.add(player.p.crystalsToGet.mul(Decimal.mul(buyableEffect("fa", 202), delta)))
        if (hasUpgrade("sma", 103)) player.gh.steel = player.gh.steel.add(Decimal.mul(0.1, player.gh.steelToGet.mul(delta)))
        player.pol.pollinators = player.pol.pollinators.add(player.pol.pollinatorsPerSecond.mul(delta))
        if (player.fa.buyables[13].gte(1)) player.fa.charge = player.fa.charge.add(player.fa.chargeRate.mul(delta))

        if (hasUpgrade("s", 24)) player.in.infinityPoints = player.in.infinityPoints.add(player.in.infinityPointsToGet.mul(delta))
        if (hasUpgrade("s", 25)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet.mul(delta))
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
        11:
        {
            title: "Feature I",
            unlocked() { return true },
            description: "Unlocks Ranks.",
            cost: new Decimal(10),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        12:
        {
            title: "Feature II",
            unlocked() { return hasUpgrade("i", 11) },
            description: "Unlocks Factors.",
            cost: new Decimal(40),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        13:
        {
            title: "Tetr",
            unlocked() { return hasUpgrade("i", 12) },
            description: "Unlocks Tetr (In ranks).",
            cost: new Decimal(2500),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        14:
        {
            title: "Prestige",
            unlocked() { return hasUpgrade("i", 13) },
            description: "Unlocks Prestige.",
            cost: new Decimal(150000),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        15:
        {
            title: "Power Factors",
            unlocked() { return hasUpgrade("i", 14) },
            description: "Unlocks Power Factors (In factors).",
            cost: new Decimal(4e10),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        16:
        {
            title: "Trees",
            unlocked() { return hasUpgrade("i", 15) },
            description: "Unlocks Trees.",
            cost: new Decimal(1e15),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        17:
        {
            title: "Grass",
            unlocked() { return hasUpgrade("i", 16) },
            description: "Unlocks Grass.",
            cost: new Decimal(1e20),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        18:
        {
            title: "Pent",
            unlocked() { return hasUpgrade("i", 17) },
            description: "Unlocks Pent (in ranks).",
            cost: new Decimal(1e28),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        20:
        {
            title: "Realm Essence",
            unlocked() { return hasUpgrade("i", 18) && hasMilestone("s", 11) },
            description: "Unlocks Realm Essence.",
            cost: new Decimal(1e50),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        19:
        {
            title: "Check Back",
            unlocked() { return hasUpgrade("i", 18) },
            description: "Unlocks Check Back.",
            cost: new Decimal(1e100),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        21:
        {
            title: "OTF",
            unlocked() { return hasUpgrade("i", 19) },
            description: "Unlocks Otherworldly Features.",
            cost: new Decimal(1e150),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        22:
        {
            title: "Pollinate",
            unlocked() { return player.in.unlockedBreak},
            description: "Use the experience of debuffs and pests to create Pollinators.",
            cost: new Decimal("1e450"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        23:
        {
            title: "Steel",
            unlocked() { return hasUpgrade("i", 22) && hasUpgrade("bi", 106)},
            description: "Unlocks Steelie reset layer (in grasshop).",
            cost: new Decimal("1e800"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        24:
        {
            title: "Crystallize",
            unlocked() { return hasUpgrade("i", 23) && hasUpgrade("bi", 106)},
            description: "Unlocks Crystallize reset layer (in prestige).",
            cost: new Decimal("1e1000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        25:
        {
            title: "Productive Pollination",
            unlocked() { return hasUpgrade("i", 24) && hasUpgrade("bi", 106)},
            description: "Unlocks more Pollinator upgrades.",
            cost: new Decimal("1e1200"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        26:
        {
            title: "Time Reversal",
            unlocked() { return hasUpgrade("i", 25) && hasUpgrade("bi", 106)},
            description: "Unlocks Time Reversal (in ranks layer).",
            cost: new Decimal("1e1400"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        27:
        {
            title: "Pentomation",
            unlocked() { return hasUpgrade("i", 26) && hasUpgrade("bi", 106)},
            description: "Automatically gain pent without resetting.",
            cost: new Decimal("1e1600"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        28:
        {
            title: "2nd OTF slot...",
            unlocked() { return hasUpgrade("i", 27) && hasUpgrade("bi", 106)},
            description: "Gain a 2nd OTF slot. (doesn't stack with tav's domain)",
            cost: new Decimal("1e1800"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        29:
        {
            title: "Rage Power",
            unlocked() { return (hasUpgrade("i", 28) && hasUpgrade("bi", 106) && player.po.hex && player.ca.unlockedCante) || hasUpgrade("i", 29)},
            description: "Unlock Rage Power (requires hex, in hex).",
            cost: new Decimal("1e3333"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        31: {
            title: "Auto CDPs",
            unlocked() { return (hasUpgrade("i", 28) && hasUpgrade("bi", 106) && player.po.dice && player.ca.unlockedCante && player.ev.evolutionsUnlocked[5]) || hasUpgrade("i", 31)},
            description: "Gain 5% challenge dice points per second.",
            cost: new Decimal("1e4600"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        32: {
            title: "Completely Pentomated",
            unlocked() { return hasUpgrade("i", 28) && hasUpgrade("bi", 106)},
            description: "You can now buy max pent.",
            cost: new Decimal("1e2000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        37:
        {
            title: "Challenge I.",
            unlocked() { return inChallenge("ip", 11) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e8000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        38:
        {
            title: "Challenge II.",
            unlocked() { return inChallenge("ip", 12) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e7500"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        39:
        {
            title: "Challenge III.",
            unlocked() { return inChallenge("ip", 13) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e2000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        41:
        {
            title: "Challenge IV.",
            unlocked() { return inChallenge("ip", 14) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e7000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        101:
        {
            title: "Factory",
            unlocked() { return hasMilestone("s", 11)},
            description: "Unlocks the factory.",
            cost: new Decimal("1e16000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
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
            "Features": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("i", 11) },
                content: [
                    ["blank", "25px"],
                    ["tree", tree1],
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
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23]]],
                    ["row", [["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27], ["upgrade", 28], ["upgrade", 32]]],
                    ["row", [["upgrade", 20], ["upgrade", 29], ["upgrade", 31], ["upgrade", 101]]],
                    ["row", [["upgrade", 37], ["upgrade", 38], ["upgrade", 39], ["upgrade", 41]]],
                    ["blank", "25px"],
                ],
            },
            "Portal": {
                buttonStyle() { return { color: "black", borderRadius: "5px", borderColor: "purple", background: "linear-gradient(45deg, #8a00a9, #0061ff)" }},
                unlocked() { return hasUpgrade("i", 21) || player.in.unlockedInfinity || player.s.highestSingularityPoints.gt(0)},
                content:  [],
            },
            "Settings": {
                buttonStyle() { return { color: "white", borderRadius: "5px" }},
                unlocked() { return true },
                content: [],
            },
        },
    },

    tabFormat: [
         ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.tab != "cmc" }
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