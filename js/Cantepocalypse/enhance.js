addLayer("en", {
    name: "Enhance", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        enhancePoints: new Decimal(0),
        enhancePointsEffect: new Decimal(1),
        enhancePointsToGet: new Decimal(0),

        enhancerLevels: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        enhancersEffect: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        /*
            0 - Repli-Point mult
            1 - Hardcap
            2 - Emotions
        */
       enhancerXP: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
       enhancerXPPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
       enhancerXPReq: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
       enhancersUnlocked: [true,false,false,false,false,],

       enhancerAllocated: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
       enhancePointsToAllocate: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Enhance",
    branches: ["gs", "rg", "fu"],
    color: "#b82fbd",
    update(delta) {
        let onepersec = new Decimal(1)

        player.en.enhancePointsToGet = player.fu.apathy.pow(0.4).div(10)

        player.en.enhancePointsEffect = player.en.enhancePoints.pow(0.3).add(1)

        if (player.en.enhancePointsToAllocate.lt(0)) player.en.enhancePointsToAllocate = new Decimal(0)
        if (player.en.enhancePointsToAllocate.gt(player.en.enhancePoints)) player.en.enhancePointsToAllocate = player.en.enhancePoints

        //enhancers
        for (let i = 0; i < player.en.enhancersUnlocked.length; i++) {
            player.en.enhancerXP[i] = player.en.enhancerXP[i].add(player.en.enhancerXPPerSecond[i].mul(delta))
            if (player.en.enhancerXP[i].gte(player.en.enhancerXPReq[i])) {
                player.en.enhancerLevels[i] = player.en.enhancerLevels[i].add(1) //tentative to change if bulk leveling is added
                player.en.enhancerXP[i] = new Decimal(0)
            }
            player.en.enhancerXPPerSecond[i] = player.en.enhancerAllocated[i]
            if (hasUpgrade("en", 14)) player.en.enhancerXPPerSecond[i] = player.en.enhancerXPPerSecond[i].mul(upgradeEffect("en", 14))
        }

        if (hasUpgrade("en", 13)) player.en.enhancersUnlocked[1] = true
        if (hasUpgrade("en", 15)) player.en.enhancersUnlocked[2] = true

        player.en.enhancerXPReq = [new Decimal(10), new Decimal(1000), new Decimal(25000), new Decimal(125000), new Decimal(6250000)] //very tentative to change

        player.en.enhancerXPReq[0] = player.en.enhancerLevels[0].pow(0.5).add(1).mul(10)
        if (player.en.enhancerLevels[0].gt(10000)) player.en.enhancerXPReq[0] = player.en.enhancerLevels[0].pow(0.65).add(1).mul(10)
        
        player.en.enhancerXPReq[1] = player.en.enhancerLevels[1].pow(0.65).add(1).mul(1000)
        if (player.en.enhancerLevels[1].gt(10000)) player.en.enhancerXPReq[1] = player.en.enhancerLevels[1].pow(0.75).add(1).mul(1000)

        player.en.enhancerXPReq[2] = player.en.enhancerLevels[2].pow(0.75).add(1).mul(25000)
        if (player.en.enhancerLevels[2].gt(10000)) player.en.enhancerXPReq[2] = player.en.enhancerLevels[2].pow(0.85).add(1).mul(25000)

        player.en.enhancersEffect[0] = player.en.enhancerLevels[0].pow(0.75).add(1)
        player.en.enhancersEffect[1] = player.en.enhancerLevels[1].pow(0.8).div(50).add(1)
        player.en.enhancersEffect[2] = player.en.enhancerLevels[2].pow(2).add(1)
    },
    enhanceReset() {
        player.ar.rankPoints = new Decimal(0)
        player.ar.tierPoints = new Decimal(0)
        player.ar.tetrPoints = new Decimal(0)
        player.cp.replicantiPoints = new Decimal(1)

        player.an.anonymity = new Decimal(0)

        player.pr.perkPoints = new Decimal(0)
        player.pr.buyables[11] = new Decimal(0)
        player.pr.buyables[12] = new Decimal(0)
        player.pr.buyables[13] = new Decimal(0)
        player.pr.buyables[14] = new Decimal(0)
        player.pr.buyables[15] = new Decimal(0)
        player.pr.buyables[16] = new Decimal(0)
        player.pr.buyables[17] = new Decimal(0)
        player.pr.buyables[18] = new Decimal(0)

        player.rt.repliTrees = new Decimal(0)
        player.rt.repliLeaves = new Decimal(1)

        player.rt.buyables[11] = new Decimal(0)
        player.rt.buyables[12] = new Decimal(0)
        player.rt.buyables[13] = new Decimal(0)
        player.rt.buyables[14] = new Decimal(0)
        player.rt.buyables[15] = new Decimal(0)
        player.rt.buyables[16] = new Decimal(0)
        player.rt.buyables[17] = new Decimal(0)
        player.rt.buyables[18] = new Decimal(0)

        if (!hasUpgrade("s", 15) || inChallenge("fu", 11)) {
            for (let i = 0; i < player.an.upgrades.length; i++) {
                if (+player.an.upgrades[i] < 24) {
                    player.an.upgrades.splice(i, 1);
                    i--;
                }
            }
        }
        
        player.rg.repliGrass = new Decimal(1)

        player.rg.buyables[11] = new Decimal(0)
        player.rg.buyables[12] = new Decimal(0)
        player.rg.buyables[13] = new Decimal(0)
        player.rg.buyables[14] = new Decimal(0)
        player.rg.buyables[15] = new Decimal(0)
        player.rg.buyables[16] = new Decimal(0)
        player.rg.buyables[17] = new Decimal(0)
        player.rg.buyables[18] = new Decimal(0)

        for (let i = 1; i < 509; ) {
            setGridData("rg", i, new Decimal(1))

            // Increase i value
            if (i % 10 == 8) {
                i = i+93
            } else {
                i++
            }
        }

        if (!hasUpgrade("fu", 13) || inChallenge("fu", 11) || inChallenge("fu", 12)) {
            player.gs.grassSkip = new Decimal(0)
        }
        player.gs.grassSkippers = new Decimal(0)
        if (!hasMilestone("s", 12) || inChallenge("fu", 11) || inChallenge("fu", 12)) {
            for (let i = 0; i < player.gs.milestones.length; i++) {
                if (hasUpgrade("fu", 20) && +player.gs.milestones[i] == 18 || +player.gs.milestones[i] == 22) continue
                if (+player.gs.milestones[i] < 100) {
                    player.gs.milestones.splice(i, 1);
                    i--;
                }
            }
        }
        player.gs.buyables[11] = new Decimal(0)
        player.gs.buyables[12] = new Decimal(0)
        player.gs.buyables[13] = new Decimal(0)
        player.gs.buyables[14] = new Decimal(0)
        player.gs.buyables[15] = new Decimal(0)
        player.gs.buyables[16] = new Decimal(0)
        player.gs.buyables[17] = new Decimal(0)
        player.gs.buyables[18] = new Decimal(0)

        //oil
        player.oi.oil = new Decimal(0)

        player.oi.linkingPower = [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),]
        player.oi.linkerChoice = new Decimal(0)

        player.oi.protoMemories = new Decimal(0)
        player.oi.protoMemorySeconds = new Decimal(0)

        player.oi.buyables[11] = new Decimal(0)
        player.oi.buyables[12] = new Decimal(0)
        player.oi.buyables[13] = new Decimal(0)
        player.oi.buyables[14] = new Decimal(0)
        player.oi.buyables[15] = new Decimal(0)
        player.oi.buyables[16] = new Decimal(0)
        player.oi.buyables[17] = new Decimal(0)
        player.oi.buyables[18] = new Decimal(0)
        player.oi.buyables[19] = new Decimal(0)

        if (!hasUpgrade("fu", 13)) {
            player.oi.buyables[21] = new Decimal(0)
            player.oi.buyables[22] = new Decimal(0)
            player.oi.buyables[23] = new Decimal(0)
            player.oi.buyables[24] = new Decimal(0)
        }

        for (let i = 0; i < player.cp.upgrades.length; i++) {
            if (+player.cp.upgrades[i] < 19) {
                player.cp.upgrades.splice(i, 1);
                i--;
            }
        }

        player.fu.fun = new Decimal(0)

        player.fu.sfrgt = new Decimal(0)

        player.fu.happiness = new Decimal(0)
        player.fu.happinessProduce = true

        player.fu.sadness = new Decimal(0)
        player.fu.sadnessProduce = true

        player.fu.anger = new Decimal(0)
        player.fu.angerProduce = true

        player.fu.fear = new Decimal(0)
        player.fu.fearProduce = true

        player.fu.numb = new Decimal(0)
        player.fu.numbProduce = true

        player.fu.jocusEssence = new Decimal(0)

        player.fu.apathy = new Decimal(0)

        player.fu.buyables[11] = new Decimal(0)
        player.fu.buyables[12] = new Decimal(0)
        player.fu.buyables[13] = new Decimal(0)
        player.fu.buyables[14] = new Decimal(0)
        player.fu.buyables[15] = new Decimal(0)
        player.fu.buyables[16] = new Decimal(0)
        player.fu.buyables[17] = new Decimal(0)
        player.fu.buyables[18] = new Decimal(0)
        player.fu.buyables[21] = new Decimal(0)
        player.fu.buyables[22] = new Decimal(0)
        player.fu.buyables[23] = new Decimal(0)
        player.fu.buyables[24] = new Decimal(0)
        player.fu.buyables[31] = new Decimal(0)
        player.fu.buyables[32] = new Decimal(0)
        player.fu.buyables[33] = new Decimal(0)
        player.fu.buyables[34] = new Decimal(0)
        player.fu.buyables[35] = new Decimal(0)
        player.fu.buyables[36] = new Decimal(0)
        player.fu.buyables[37] = new Decimal(0)
        player.fu.buyables[38] = new Decimal(0)
        player.fu.buyables[41] = new Decimal(0)
        player.fu.buyables[42] = new Decimal(0)
        player.fu.buyables[43] = new Decimal(0)
        player.fu.buyables[44] = new Decimal(0)
        player.fu.buyables[45] = new Decimal(0)
        player.fu.buyables[46] = new Decimal(0)
        player.fu.buyables[47] = new Decimal(0)
        player.fu.buyables[48] = new Decimal(0)
        player.fu.buyables[51] = new Decimal(0)
        player.fu.buyables[52] = new Decimal(0)
        player.fu.buyables[53] = new Decimal(0)
        player.fu.buyables[54] = new Decimal(0)
        player.fu.buyables[55] = new Decimal(0)
        player.fu.buyables[56] = new Decimal(0)
        player.fu.buyables[57] = new Decimal(0)
        player.fu.buyables[58] = new Decimal(0)
        player.fu.buyables[61] = new Decimal(0)
        player.fu.buyables[62] = new Decimal(0)
        player.fu.buyables[63] = new Decimal(0)
        player.fu.buyables[64] = new Decimal(0)
        player.fu.buyables[65] = new Decimal(0)
        player.fu.buyables[66] = new Decimal(0)
        player.fu.buyables[67] = new Decimal(0)
        player.fu.buyables[68] = new Decimal(0)
        player.fu.buyables[71] = new Decimal(0)
        player.fu.buyables[72] = new Decimal(0)
        player.fu.buyables[73] = new Decimal(0)
        player.fu.buyables[74] = new Decimal(0)
        player.fu.buyables[81] = new Decimal(0)
        player.fu.buyables[82] = new Decimal(0)
        player.fu.buyables[83] = new Decimal(0)
        player.fu.buyables[84] = new Decimal(0)
        player.fu.buyables[85] = new Decimal(0)
        player.fu.buyables[86] = new Decimal(0)
        player.fu.buyables[87] = new Decimal(0)
        player.fu.buyables[88] = new Decimal(0)
        player.fu.buyables[89] = new Decimal(0)
        player.fu.buyables[90] = new Decimal(0)
        player.fu.buyables[91] = new Decimal(0)
        player.fu.buyables[92] = new Decimal(0)

        for (let i = 0; i < player.fu.upgrades.length; i++) {
            if (+player.fu.upgrades[i] < 200) {
                player.fu.upgrades.splice(i, 1);
                i--;
            }
        }
    },
    clickables: {
        11: {
            title() { return "<h2>Reset ALL AU1 content for enhance points.</h3>" },
            canClick() { return player.en.enhancePointsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.add(player.en.enhancePointsToGet)

                for (let i = 0; i < 12; i++) {
                    layers.en.enhanceReset();
                } 
            },
            style: { width: "400px", minHeight: "100px", borderRadius: "15px", color: "#fff"},
        },
        12: {
            title() { return "<h2>1%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.en.enhancePointsToAllocate = player.en.enhancePoints.mul(0.01)
            },
            style: { width: "100px", minHeight: "50px", borderRadius: "15px", color: "#fff", "border-radius": "0px 0px 0px 15px", border: "3px solid #ccc", "borderRight": "0px"},
        },
        13: {
            title() { return "<h2>10%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.en.enhancePointsToAllocate = player.en.enhancePoints.mul(0.1)
            },
            style: { width: "100px", minHeight: "50px", borderRadius: "15px", color: "#fff", "border-radius": "0px 0px 0px 0px", border: "3px solid #ccc", "borderLeft": "0px", "borderRight": "0px"},
        },
        14: {
            title() { return "<h2>50%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.en.enhancePointsToAllocate = player.en.enhancePoints.mul(0.5)
            },
            style: { width: "100px", minHeight: "50px", borderRadius: "15px", color: "#fff", "border-radius": "0px 0px 0px 0px", border: "3px solid #ccc", "borderLeft": "0px", "borderRight": "0px"},
        },
        15: {
            title() { return "<h2>100%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.en.enhancePointsToAllocate = player.en.enhancePoints
            },
            style: { width: "100px", minHeight: "50px", borderRadius: "15px", color: "#fff", "border-radius": "0px 0px 15px 0px", border: "3px solid #ccc", "borderLeft": "0px"},
        },

        //allocation buttons
        21: {
            title() { return "<h3>Allocate</h3>" },
            canClick() { return player.en.enhancePoints.gte(player.en.enhancePointsToAllocate) },
            unlocked() { return player.en.enhancersUnlocked[0] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.sub(player.en.enhancePointsToAllocate)
                player.en.enhancerAllocated[0] = player.en.enhancerAllocated[0].add(player.en.enhancePointsToAllocate)
            },
            style: { width: "80px", minHeight: "81px", borderRadius: "15px", fontSize: "8px", color: "#fff", "border-radius": "0px 0px 0px 0px", border: "3px solid #ccc", borderLeft: "0px"},
        },
        22: {
            title() { return "<h3>Un-Allocate</h3>" },
            canClick() { return player.en.enhancerAllocated[0].gt(0) },
            unlocked() { return player.en.enhancersUnlocked[0] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.add(player.en.enhancerAllocated[0])
                player.en.enhancerAllocated[0] = player.en.enhancerAllocated[0].sub(player.en.enhancerAllocated[0])
            },
            style: { width: "80px", minHeight: "81px", borderRadius: "15px", fontSize: "8px", color: "#fff", "border-radius": "0px 15px 0px 0px", border: "3px solid #ccc", borderLeft: "0px"},
        },

        23: {
            title() { return "<h3>Allocate</h3>" },
            canClick() { return player.en.enhancePoints.gte(player.en.enhancePointsToAllocate) },
            unlocked() { return player.en.enhancersUnlocked[1] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.sub(player.en.enhancePointsToAllocate)
                player.en.enhancerAllocated[1] = player.en.enhancerAllocated[1].add(player.en.enhancePointsToAllocate)
            },
            style: { width: "80px", minHeight: "80px", borderRadius: "15px", fontSize: "8px", color: "#fff", "border-radius": "0px 0px 0px 0px", border: "2px solid #ccc", borderLeft: "0px", borderTop: "0px"},
        },
        24: {
            title() { return "<h3>Un-Allocate</h3>" },
            canClick() { return player.en.enhancerAllocated[1].gt(0) },
            unlocked() { return player.en.enhancersUnlocked[1] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.add(player.en.enhancerAllocated[1])
                player.en.enhancerAllocated[1] = player.en.enhancerAllocated[1].sub(player.en.enhancerAllocated[1])
            },
            style: { width: "80px", minHeight: "80px", borderRadius: "15px", fontSize: "8px", color: "#fff", "border-radius": "0px 0px 0px 0px", border: "2px solid #ccc", borderLeft: "0px", borderTop: "0px"},
        },

        25: {
            title() { return "<h3>Allocate</h3>" },
            canClick() { return player.en.enhancePoints.gte(player.en.enhancePointsToAllocate) },
            unlocked() { return player.en.enhancersUnlocked[2] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.sub(player.en.enhancePointsToAllocate)
                player.en.enhancerAllocated[2] = player.en.enhancerAllocated[2].add(player.en.enhancePointsToAllocate)
            },
            style: { width: "80px", minHeight: "80px", borderRadius: "15px", fontSize: "8px", color: "#fff", "border-radius": "0px 0px 0px 0px", border: "2px solid #ccc", borderLeft: "0px", borderTop: "0px"},
        },
        26: {
            title() { return "<h3>Un-Allocate</h3>" },
            canClick() { return player.en.enhancerAllocated[2].gt(0) },
            unlocked() { return player.en.enhancersUnlocked[2] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.add(player.en.enhancerAllocated[2])
                player.en.enhancerAllocated[2] = player.en.enhancerAllocated[2].sub(player.en.enhancerAllocated[2])
            },
            style: { width: "80px", minHeight: "80px", borderRadius: "15px", fontSize: "8px", color: "#fff", "border-radius": "0px 0px 0px 0px", border: "2px solid #ccc", borderLeft: "0px", borderTop: "0px"},
        },
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
                } else {
                    return new Decimal(1)
                }
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#193ceb"},
            display() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
                } else {
                    return "<p style='color:red'>[HARDCAPPED]</p>"
                }
            },
        },

        enhancer1Bar: {
            unlocked() { return player.en.enhancersUnlocked[0] },
            direction: RIGHT,
            width: 400,
            height: 76,
            progress() {
                return player.en.enhancerXP[0].div(player.en.enhancerXPReq[0])
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)", "border-radius": "0px 0px 0px 0px",},
            fillStyle: {backgroundColor: "#b82fbd"},
            display() {
                return "XP: " + format(player.en.enhancerXP[0]) + "/" + format(player.en.enhancerXPReq[0]) + "\n+" + format(player.en.enhancerXPPerSecond[0]) + " XP/s";
            },
        },
        enhancer2Bar: {
            unlocked() { return player.en.enhancersUnlocked[1] },
            direction: RIGHT,
            width: 400,
            height: 76,
            progress() {
                return player.en.enhancerXP[1].div(player.en.enhancerXPReq[1])
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)", "border-radius": "0px 0px 0px 0px"},
            fillStyle: {backgroundColor: "#b82fbd"},
            display() {
                return "XP: " + format(player.en.enhancerXP[1]) + "/" + format(player.en.enhancerXPReq[1]) + "\n+" + format(player.en.enhancerXPPerSecond[1]) + " XP/s";
            },
        },
        enhancer3Bar: {
            unlocked() { return player.en.enhancersUnlocked[2] },
            direction: RIGHT,
            width: 400,
            height: 76,
            progress() {
                return player.en.enhancerXP[2].div(player.en.enhancerXPReq[2])
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)", "border-radius": "0px 0px 0px 0px"},
            fillStyle: {backgroundColor: "#b82fbd"},
            display() {
                return "XP: " + format(player.en.enhancerXP[2]) + "/" + format(player.en.enhancerXPReq[2]) + "\n+" + format(player.en.enhancerXPPerSecond[2]) + " XP/s";
            },
        },
    },
    upgrades: {
        //upgrades for jocus essence automation, apathy automation, other boosts
        11: {
            title: "Focus Jocus",
            unlocked() { return true },
            description: "Earn 25% of jocus essence per second while in fear challenge.",
            cost: new Decimal(10),
            currencyLocation() { return player.en },
            currencyDisplayName: "Enhance Points",
            currencyInternalName: "enhancePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", },
        },
        12: {
            title: "Essence Weakener",
            unlocked() { return true },
            description: "Jocus essence weakens repli-leaf softcap, jocus essence and fear is always gained.",
            cost: new Decimal(33),
            currencyLocation() { return player.en },
            currencyDisplayName: "Enhance Points",
            currencyInternalName: "enhancePoints",
            effect() {
                return Decimal.div(1, player.fu.jocusEssence.pow(0.2).add(1))
            },
            effectDisplay() { return "^" + formatSimple(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", width: "150px"},
        },
        13: {
            title: "Next Enhancer",
            unlocked() { return true },
            description: "Unlocks the next enhancer, and raises the first replicanti point softcap effect by ^0.01.",
            cost: new Decimal(500),
            currencyLocation() { return player.en },
            currencyDisplayName: "Enhance Points",
            currencyInternalName: "enhancePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", width: "150px"},
        },
        14: {
            title: "Apathetic Enhancement",
            unlocked() { return true },
            description: "Apathy boosts enhncer XP gain.",
            cost: new Decimal(2500),
            currencyLocation() { return player.en },
            currencyDisplayName: "Enhance Points",
            currencyInternalName: "enhancePoints",
            effect() {
                return player.fu.apathy.pow(0.1).div(5).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px",},
        },
        15: {
            title: "Emotional Enhancer",
            unlocked() { return true },
            description: "Unlocks the third enhancer, and fear raises first 3 emotion effects.", //MAKE THIS ENHANCER PLEASE
            cost: new Decimal(10000),
            currencyLocation() { return player.en },
            currencyDisplayName: "Enhance Points",
            currencyInternalName: "enhancePoints",
            effect() {
                return player.fu.fear.pow(0.125).div(4).add(1)
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", width: "150px"},
        },
    },
    buyables: {
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["clickable", 11],
                    ["blank", "25px"],
                    ["row", [
                    ["upgrade", 11],
                    ["upgrade", 12],
                    ["upgrade", 13],
                    ["upgrade", 14],
                    ["upgrade", 15],
                    ]],
                ]
            },
            "Enhancers": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", () => {return "Enhance Points To Allocate: " + format(player.en.enhancePointsToAllocate) + "."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "394px", height: "40px", backgroundColor: "#b82fbd", "border-radius": "15px 15px 0px 0px", border: "3px solid #ccc", borderBottom: "0px"}],
                    ["text-input", "enhancePointsToAllocate", {width: "344px", height: "25px", backgroundColor: "#232b2b", color: "white", fontSize: "24px", textAlign: "left", border: "0px", padding: "0px 25px", "border-radius": "0px 0px 0px 0px", border: "3px solid #ccc", borderBottom: "0px",}],
                    ["row", [
                    ["clickable", 12],["clickable", 13],["clickable", 14],["clickable", 15],
                    ]],
                    ["blank", "25px"],
                    ["style-row", [
                    ["raw-html", () => { return player.en.enhancersUnlocked[0] ? "<div style='width:500px;min-height:80px;background-color:#b82fbd;border-radius:15px 0px 0px 0px;border:3px solid #ccc;border-right:0px;color:white;font-size:12px;padding:16px;box-sizing:border-box;'>" +
                        "Level " + formatWhole(player.en.enhancerLevels[0]) + " Replicanti Point Enhancer<br>Boosts post-softcap and challenge replicanti point mult by x" + format(player.en.enhancersEffect[0]) + ".<br>Allocated " + format(player.en.enhancerAllocated[0]) + " enhance points." +
                        "</div>" : "" }, {width: "500px"}],
                    ["bar", "enhancer1Bar"],
                    ["clickable", 21],
                    ["clickable", 22],
                    ],],
                    ["style-row", [
                    ["raw-html", () => { return player.en.enhancersUnlocked[1] ? "<div style='width:500px;min-height:80px;background-color:#b82fbd;border-radius:0px 0px 0px 0px;border:3px solid #ccc;border-right:0px;border-top:0px;color:white;font-size:12px;padding:16px;box-sizing:border-box;'>" +
                        "Level " + formatWhole(player.en.enhancerLevels[1]) + " Replicanti Hardcap Enhancer<br>Raises replicanti point hardcap by ^" + format(player.en.enhancersEffect[1]) + ".<br>Allocated " + format(player.en.enhancerAllocated[1]) + " enhance points." +
                        "</div>" : "" }, {width: "500px"}],
                    ["bar", "enhancer2Bar"],
                    ["clickable", 23],
                    ["clickable", 24],
                    ],],
                    ["style-row", [
                    ["raw-html", () => { return player.en.enhancersUnlocked[2] ? "<div style='width:500px;min-height:80px;background-color:#b82fbd;border-radius:0px 0px 0px 0px;border:3px solid #ccc;border-right:0px;border-top:0px;color:white;font-size:12px;padding:16px;box-sizing:border-box;'>" +
                        "Level " + formatWhole(player.en.enhancerLevels[2]) + " Emotional Enhancer<br>Boosts all emotion gain by x" + format(player.en.enhancersEffect[2]) + ".<br>Allocated " + format(player.en.enhancerAllocated[2]) + " enhance points." +
                        "</div>" : "" }, {width: "500px"}],
                    ["bar", "enhancer3Bar"],
                    ["clickable", 25],
                    ["clickable", 26],
                    ],],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.en.enhancePoints) + "</h3> enhance points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                ["raw-html", () => {return "(+" + format(player.en.enhancePointsToGet) + ")" }, () => {
                    let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                    player.en.enhancePointsToGet.gte(1) ? look.color = "white" : look.color = "gray"
                    return look
                }],
            ]],
        ["raw-html", () => {return "Divides replicanti point cooldown by <h3>/" + format(player.en.enhancePointsEffect) + "</h3>."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => {return "(Based on Apathy)"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && false} //ascension pet requirement
})
