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
       enhancerXPReq: [new Decimal(10), new Decimal(1000), new Decimal(25000), new Decimal(125000), new Decimal(6250000)],
       enhancersUnlocked: [true,false,false,false,false,],

       enhancerAllocated: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
       enhancePointsToAllocate: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            color: "white",
            borderColor: "#0000007f",
        }
    },
    tooltip: "Enhance",
    branches: ["gs", "rg", "fu"],
    color: "#b82fbd",
    update(delta) {
        let onepersec = new Decimal(1)

        player.en.enhancePointsToGet = player.fu.apathy.pow(0.4).div(10)
        player.en.enhancePointsToGet = player.en.enhancePointsToGet.mul(levelableEffect("pet", 1401)[0])

        player.en.enhancePointsEffect = player.en.enhancePoints.pow(0.3).add(1)

        if (player.en.enhancePointsToAllocate.lt(0)) player.en.enhancePointsToAllocate = new Decimal(0)
        if (player.en.enhancePointsToAllocate.gt(player.en.enhancePoints)) player.en.enhancePointsToAllocate = player.en.enhancePoints

        //enhancers
        player.en.enhancerXPReq = [new Decimal(10), new Decimal(1000), new Decimal(25000), new Decimal(125000), new Decimal(6250000)] //very tentative to change

        player.en.enhancerXPReq[0] = player.en.enhancerLevels[0].pow(0.5).add(1).mul(10)
        if (player.en.enhancerLevels[0].gt(10000)) player.en.enhancerXPReq[0] = player.en.enhancerLevels[0].pow(0.65).add(1).mul(10)
        
        player.en.enhancerXPReq[1] = player.en.enhancerLevels[1].pow(0.65).add(1).mul(1000)
        if (player.en.enhancerLevels[1].gt(10000)) player.en.enhancerXPReq[1] = player.en.enhancerLevels[1].pow(0.75).add(1).mul(1000)

        player.en.enhancerXPReq[2] = player.en.enhancerLevels[2].pow(0.75).add(1).mul(25000)
        if (player.en.enhancerLevels[2].gt(10000)) player.en.enhancerXPReq[2] = player.en.enhancerLevels[2].pow(0.85).add(1).mul(25000)

        for (let i = 0; i < player.en.enhancersUnlocked.length; i++) {
            player.en.enhancerXP[i] = player.en.enhancerXP[i].add(player.en.enhancerXPPerSecond[i].mul(delta))
            if (player.en.enhancerXP[i].gte(player.en.enhancerXPReq[i])) {
                 if (player.en.enhancerXPPerSecond[i].gte(player.en.enhancerXPReq[i].mul(10))) {
                player.en.enhancerLevels[i] = player.en.enhancerLevels[i].add(player.en.enhancerXPPerSecond[i].div(player.en.enhancerXPReq[i]).mul(delta).floor())
                 }
                player.en.enhancerLevels[i] = player.en.enhancerLevels[i].add(1) //tentative to change if bulk leveling is added
                player.en.enhancerXP[i] = new Decimal(0)
            }
            player.en.enhancerXPPerSecond[i] = player.en.enhancerAllocated[i]
            if (hasUpgrade("en", 14)) player.en.enhancerXPPerSecond[i] = player.en.enhancerXPPerSecond[i].mul(upgradeEffect("en", 14))
        }

        if (hasUpgrade("en", 13)) player.en.enhancersUnlocked[1] = true
        if (hasUpgrade("en", 15)) player.en.enhancersUnlocked[2] = true

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
            title() { return "<h2>Reset ALL AU1 content for enhance points.</h3><br>(based on apathy)" },
            canClick() { return player.en.enhancePointsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.add(player.en.enhancePointsToGet)

                for (let i = 0; i < 12; i++) {
                    layers.en.enhanceReset();
                } 
            },
            style: { width: "400px", minHeight: "100px", borderRadius: "15px", color: "#fff", border: "3px solid #0000007f"},
        },
        12: {
            title() { return "<h2>1%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.en.enhancePointsToAllocate = player.en.enhancePoints.mul(0.01)
            },
            style: { width: "92.5px", minHeight: "51px", borderRadius: "15px", color: "#fff", borderRadius: "0px 0px 0px 9px", border: "3px solid #5c185e"},
        },
        13: {
            title() { return "<h2>10%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.en.enhancePointsToAllocate = player.en.enhancePoints.mul(0.1)
            },
            style: { width: "92.5px", minHeight: "51px", borderRadius: "15px", color: "#fff", borderRadius: "0px 0px 0px 0px", border: "3px solid #5c185e"},
        },
        14: {
            title() { return "<h2>50%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.en.enhancePointsToAllocate = player.en.enhancePoints.mul(0.5)
            },
            style: { width: "92.5px", minHeight: "51px", borderRadius: "15px", color: "#fff", borderRadius: "0px 0px 0px 0px", border: "3px solid #5c185e"},
        },
        15: {
            title() { return "<h2>100%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.en.enhancePointsToAllocate = player.en.enhancePoints
            },
            style: { width: "92.5px", minHeight: "51px", borderRadius: "15px", color: "#fff", borderRadius: "0px 0px 9px 0px", border: "3px solid #5c185e"},
        },

        //allocation buttons
        21: {
            title() { return "<h3>Allocate</h3>" },
            canClick() { return player.en.enhancePoints.gte(player.en.enhancePointsToAllocate) && player.en.enhancePointsToAllocate.gt(0) },
            unlocked() { return player.en.enhancersUnlocked[0] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.sub(player.en.enhancePointsToAllocate)
                player.en.enhancerAllocated[0] = player.en.enhancerAllocated[0].add(player.en.enhancePointsToAllocate)
            },
            style() {
                let look = { width: "191px", minHeight: "57px", borderRadius: "15px", fontSize: "9px", color: "#fff", borderRadius: "0 0 0 9px", border: "3px solid #5c185e"}
                look.background = this.canClick() ? "#b82fbd" : "#5c185e"
                return look
            },
        },
        22: {
            title() { return "<h3>Un-Allocate</h3>" },
            canClick() { return player.en.enhancerAllocated[0].gt(0) },
            unlocked() { return player.en.enhancersUnlocked[0] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.add(player.en.enhancerAllocated[0])
                player.en.enhancerAllocated[0] = player.en.enhancerAllocated[0].sub(player.en.enhancerAllocated[0])
            },
            style() {
                let look = { width: "191px", minHeight: "57px", borderRadius: "15px", fontSize: "9px", color: "#fff", borderRadius: "0 0 9px 0", border: "3px solid #5c185e"}
                look.background = this.canClick() ? "#b82fbd" : "#5c185e"
                return look
            },
        },

        23: {
            title() { return "<h3>Allocate</h3>" },
            canClick() { return player.en.enhancePoints.gte(player.en.enhancePointsToAllocate) && player.en.enhancePointsToAllocate.gt(0) },
            unlocked() { return player.en.enhancersUnlocked[1] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.sub(player.en.enhancePointsToAllocate)
                player.en.enhancerAllocated[1] = player.en.enhancerAllocated[1].add(player.en.enhancePointsToAllocate)
            },
            style() {
                let look = { width: "191px", minHeight: "57px", borderRadius: "15px", fontSize: "9px", color: "#fff", borderRadius: "0 0 0 9px", border: "3px solid #5c185e"}
                look.background = this.canClick() ? "#b82fbd" : "#5c185e"
                return look
            },
        },
        24: {
            title() { return "<h3>Un-Allocate</h3>" },
            canClick() { return player.en.enhancerAllocated[1].gt(0) },
            unlocked() { return player.en.enhancersUnlocked[1] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.add(player.en.enhancerAllocated[1])
                player.en.enhancerAllocated[1] = player.en.enhancerAllocated[1].sub(player.en.enhancerAllocated[1])
            },
            style() {
                let look = { width: "191px", minHeight: "57px", borderRadius: "15px", fontSize: "9px", color: "#fff", borderRadius: "0 0 9px 0", border: "3px solid #5c185e"}
                look.background = this.canClick() ? "#b82fbd" : "#5c185e"
                return look
            },
        },

        25: {
            title() { return "<h3>Allocate</h3>" },
            canClick() { return player.en.enhancePoints.gte(player.en.enhancePointsToAllocate) && player.en.enhancePointsToAllocate.gt(0) },
            unlocked() { return player.en.enhancersUnlocked[2] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.sub(player.en.enhancePointsToAllocate)
                player.en.enhancerAllocated[2] = player.en.enhancerAllocated[2].add(player.en.enhancePointsToAllocate)
            },
            style() {
                let look = { width: "191px", minHeight: "57px", borderRadius: "15px", fontSize: "9px", color: "#fff", borderRadius: "0 0 0 9px", border: "3px solid #5c185e"}
                look.background = this.canClick() ? "#b82fbd" : "#5c185e"
                return look
            },
        },
        26: {
            title() { return "<h3>Un-Allocate</h3>" },
            canClick() { return player.en.enhancerAllocated[2].gt(0) },
            unlocked() { return player.en.enhancersUnlocked[2] },
            onClick() {
                player.en.enhancePoints = player.en.enhancePoints.add(player.en.enhancerAllocated[2])
                player.en.enhancerAllocated[2] = player.en.enhancerAllocated[2].sub(player.en.enhancerAllocated[2])
            },
            style() {
                let look = { width: "191px", minHeight: "57px", borderRadius: "15px", fontSize: "9px", color: "#fff", borderRadius: "0 0 9px 0", border: "3px solid #5c185e"}
                look.background = this.canClick() ? "#b82fbd" : "#5c185e"
                return look
            },
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
            width: 382,
            height: 58,
            progress() {
                return player.en.enhancerXP[0].div(player.en.enhancerXPReq[0])
            },
            baseStyle: {backgroundColor: "#5c185e", borderRadius: "0"},
            fillStyle: {backgroundColor: "#b82fbd", borderRadius: "0"},
            borderStyle: {border: "3px solid #5c185e", borderRadius: "0"},
            display() {
                return "XP: " + format(player.en.enhancerXP[0]) + "/" + format(player.en.enhancerXPReq[0]) + "<br>(+" + format(player.en.enhancerXPPerSecond[0]) + "/s)";
            },
        },
        enhancer2Bar: {
            unlocked() { return player.en.enhancersUnlocked[1] },
            direction: RIGHT,
            width: 382,
            height: 58,
            progress() {
                return player.en.enhancerXP[1].div(player.en.enhancerXPReq[1])
            },
            baseStyle: {backgroundColor: "#5c185e", borderRadius: "0"},
            fillStyle: {backgroundColor: "#b82fbd", borderRadius: "0"},
            borderStyle: {border: "3px solid #5c185e", borderRadius: "0"},
            display() {
                return "XP: " + format(player.en.enhancerXP[1]) + "/" + format(player.en.enhancerXPReq[1]) + "<br>(+" + format(player.en.enhancerXPPerSecond[1]) + "/s)";
            },
        },
        enhancer3Bar: {
            unlocked() { return player.en.enhancersUnlocked[2] },
            direction: RIGHT,
            width: 382,
            height: 58,
            progress() {
                return player.en.enhancerXP[2].div(player.en.enhancerXPReq[2])
            },
            baseStyle: {backgroundColor: "#5c185e", borderRadius: "0"},
            fillStyle: {backgroundColor: "#b82fbd", borderRadius: "0"},
            borderStyle: {border: "3px solid #5c185e", borderRadius: "0"},
            display() {
                return "XP: " + format(player.en.enhancerXP[2]) + "/" + format(player.en.enhancerXPReq[2]) + "<br>(+" + format(player.en.enhancerXPPerSecond[2]) + "/s)";
            },
        },
    },
    upgrades: {
        //upgrades for jocus essence automation, apathy automation, other boosts
        11: {
            title: "Focus Jocus",
            unlocked() { return true },
            description: "Earn 25% of jocus essence per second while in fear challenge.",
            cost: new Decimal(100),
            currencyLocation() { return player.en },
            currencyDisplayName: "Enhance Points",
            currencyInternalName: "enhancePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", },
        },
        12: {
            title: "Essence Weakener",
            unlocked() { return true },
            description: "Jocus essence weakens repli-leaf softcap, jocus essence and fear is always gained.",
            cost: new Decimal(2222),
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
            cost: new Decimal(9999),
            currencyLocation() { return player.en },
            currencyDisplayName: "Enhance Points",
            currencyInternalName: "enhancePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", width: "150px"},
        },
        14: {
            title: "Apathetic Enhancement",
            unlocked() { return true },
            description: "Apathy boosts enhncer XP gain.",
            cost: new Decimal(33333),
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
            cost: new Decimal(100000),
            currencyLocation() { return player.en },
            currencyDisplayName: "Enhance Points",
            currencyInternalName: "enhancePoints",
            effect() {
                return player.fu.fear.add(1).log10().div(20).add(1).pow(1.5)
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
                        ["blank", "10px"],
                        ["raw-html", "Enhance Points To Allocate:", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return formatSimple(player.en.enhancePointsToAllocate)}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["blank", "10px"],
                    ], {width: "400px", backgroundColor: "#b82fbd", borderRadius: "67px 67px 0 0", border: "3px solid #5c185e", borderBottom: "0px"}],
                    ["text-input", "enhancePointsToAllocate", {width: "388px", height: "25px", backgroundColor: "#2d0c2e", color: "white", fontSize: "24px", textAlign: "left", border: "0px", padding: "0 6px", borderRadius: "0 0 0 0", border: "3px solid #5c185e",}],
                    ["style-row", [
                        ["clickable", 12],
                        ["blank", "0", {width: "6px"}],
                        ["clickable", 13],
                        ["blank", "0", {width: "6px"}],
                        ["clickable", 14],
                        ["blank", "0", {width: "6px"}],
                        ["clickable", 15],
                    ], {width: "400px", padding: "6px 0", backgroundColor: "#b82fbd", borderRadius: "0 0 15px 15px", border: "3px solid #5c185e", borderTop: "0px"}],
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Replicanti Points", {color: "white", fontSize: "24px"}],
                            ["raw-html", () => {return "(Level " + formatWhole(player.en.enhancerLevels[0]) + ")"}, {color: "white", fontSize: "16px"}],
                            ["blank", "10px"],
                            ["style-column", [], {background: "#5c185e", width: "calc(100% - 12px)", height: "3px"}],
                            ["style-column", [
                                ["raw-html", () => {return "Boosts the post-softcap and challenge replicanti point multipliers by x" + format(player.en.enhancersEffect[0]) + "."}, {color: "white", fontSize: "16px"}],
                            ], {width: "calc(100% - 24px)", height: "100px"}],
                            ["style-column", [], {background: "#5c185e", width: "calc(100% - 12px)", height: "3px"}],
                            ["blank", "6px"],
                            ["raw-html", () => {return "Allocated " + format(player.en.enhancerAllocated[0]) + " enhance points."}, {color: "white", fontSize: "16px"}],
                            ["blank", "6px"],
                            ["bar", "enhancer1Bar"],
                            ["blank", "6px"],
                            ["style-row", [
                                ["clickable", 21],
                                ["blank", "0", {width: "6px"}],
                                ["clickable", 22],
                            ]],
                            ["blank", "6px"],
                        ], {width: "400px", background: "#b82fbd", border: "3px solid #0000007f", borderRadius: "67px 67px 15px 15px", margin: "3px"}],
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Replicanti Point Cap", {color: "white", fontSize: "24px"}],
                            ["raw-html", () => {return "(Level " + formatWhole(player.en.enhancerLevels[1]) + ")"}, {color: "white", fontSize: "16px"}],
                            ["blank", "10px"],
                            ["style-column", [], {background: "#5c185e", width: "calc(100% - 12px)", height: "3px"}],
                            ["style-column", [
                                ["raw-html", () => {return "Boosts the replicanti point hardcap by ^" + format(player.en.enhancersEffect[1]) + "."}, {color: "white", fontSize: "16px"}],
                            ], {width: "calc(100% - 24px)", height: "100px"}],
                            ["style-column", [], {background: "#5c185e", width: "calc(100% - 12px)", height: "3px"}],
                            ["blank", "6px"],
                            ["raw-html", () => {return "Allocated " + format(player.en.enhancerAllocated[1]) + " enhance points."}, {color: "white", fontSize: "16px"}],
                            ["blank", "6px"],
                            ["bar", "enhancer2Bar"],
                            ["blank", "6px"],
                            ["style-row", [
                                ["clickable", 23],
                                ["blank", "0", {width: "6px"}],
                                ["clickable", 24],
                            ]],
                            ["blank", "6px"],
                        ], () => {
                            return {display: hasUpgrade("en", 13) ? "" : "none !important", width: "400px", background: "#b82fbd", border: "3px solid #0000007f", borderRadius: "67px 67px 15px 15px", margin: "3px"}
                        }],
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Emotions", {color: "white", fontSize: "24px"}],
                            ["raw-html", () => {return "(Level " + formatWhole(player.en.enhancerLevels[2]) + ")"}, {color: "white", fontSize: "16px"}],
                            ["blank", "10px"],
                            ["style-column", [], {background: "#5c185e", width: "calc(100%)", height: "3px"}],
                            ["style-column", [
                                ["raw-html", () => {return "Boosts all emotion gain by x" + format(player.en.enhancersEffect[2]) + "."}, {color: "white", fontSize: "16px"}],
                            ], {width: "calc(100% - 24px)", height: "100px"}],
                            ["style-column", [], {background: "#5c185e", width: "calc(100%)", height: "3px"}],
                            ["blank", "6px"],
                            ["raw-html", () => {return "Allocated " + format(player.en.enhancerAllocated[2]) + " enhance points."}, {color: "white", fontSize: "16px"}],
                            ["blank", "6px"],
                            ["bar", "enhancer3Bar"],
                            ["blank", "6px"],
                            ["style-row", [
                                ["clickable", 25],
                                ["blank", "0", {width: "6px"}],
                                ["clickable", 26],
                            ]],
                            ["blank", "6px"],
                        ], () => {
                            return {display: hasUpgrade("en", 15) ? "" : "none !important", width: "400px", background: "#b82fbd", border: "3px solid #0000007f", borderRadius: "67px 67px 15px 15px", margin: "3px"}
                        }],
                    ], {maxWidth: "850px"}],
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => { return player.fu.enterNumb ? "You have " + formatSimple(player.fu.apathy) + " apathy." : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => { return inChallenge("fu", 12) ? "(+" + formatSimple(player.fu.apathyToGet) + ")" : "" }, () => {
                let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                player.fu.apathyToGet.gte(1) ? look.color = "white" : look.color = "gray"
                return look
            }],
        ]],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.en.enhancePoints) + "</h3> enhance points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                ["raw-html", () => {return "(+" + format(player.en.enhancePointsToGet) + ")" }, () => {
                    let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                    player.en.enhancePointsToGet.gte(1) ? look.color = "white" : look.color = "gray"
                    return look
                }],
            ]],
        ["raw-html", () => {return "Divides replicanti point cooldown by <h3>/" + format(player.en.enhancePointsEffect) + "</h3>."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.ev.evolutionsUnlocked[13] }, //ascension pet requirement
    hotkeys: [
        {
            key: "e", 
            description: "Enhance",
            onPress() {
                clickClickable(this.layer, 11)
            },
        },
    ]
})
