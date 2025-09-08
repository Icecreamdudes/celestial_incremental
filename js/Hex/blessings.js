addLayer("hbl", {
    name: "Hex of Blessings",
    symbol: "Bl", // Decides what text appears on the node.
    tooltip: "Blessings", // Decides the nodes tooltip
    color: "#ffbf00", // Decides the nodes color.
    branches: ["hre"], // Decides the nodes branches.
    startData() { return {
        blessings: new Decimal(0),
        blessingsGain: new Decimal(0),
        blessingPerSec: new Decimal(0),
        boons: new Decimal(0),
        boonsGain: new Decimal(0),
        blessAutomation: false,
        minRefineInput: new Decimal(0),
        minRefine: new Decimal(1),

        boosterLevels: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        boosterXP: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        boosterReq: [new Decimal(6), new Decimal(12), new Decimal(36), new Decimal(600), new Decimal(3600), new Decimal(21600)],
        boosterEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(0)],
        boosterDeposit: 0.05,
    }},
    automate() {
        if (player.hbl.blessAutomation && player.hre.refinement.gte(player.hbl.minRefine)) {
            clickClickable("hbl", 1)
        }
    },
    update(delta) {
        player.hbl.blessingsGain = new Decimal(0)
        if (player.hre.refinement.gte(18)) player.hbl.blessingsGain = player.hre.refinement.sub(16).pow(1.6).div(2)
        player.hbl.blessingsGain = player.hbl.blessingsGain.mul(player.hbl.boosterEffects[4])
        if (hasMilestone("hbl", 1)) player.hbl.blessingsGain = player.hbl.blessingsGain.mul(2)
        if (hasMilestone("hbl", 1) || inChallenge("hrm", 12)) player.hbl.blessingsGain = player.hbl.blessingsGain.mul(player.hpu.purifierEffects[1])
        if (hasUpgrade("hpw", 1)) player.hbl.blessingsGain = player.hbl.blessingsGain.mul(upgradeEffect("hpw", 1))
        player.hbl.blessingsGain = player.hbl.blessingsGain.mul(player.hre.refinementEffect[4][0])
        if (hasMilestone("hpw", 3) && player.hbl.blessings.lt(6e5) && !inChallenge("hrm", 13)) player.hbl.blessingsGain = player.hbl.blessingsGain.mul(2)
        if (hasMilestone("hpw", 6) && player.hbl.blessings.lt(6e5) && !inChallenge("hrm", 13)) player.hbl.blessingsGain = player.hbl.blessingsGain.mul(2)
        if (hasUpgrade("hpw", 71)) player.hbl.blessingsGain = player.hbl.blessingsGain.mul(upgradeEffect("hpw", 71))
        if (hasUpgrade("hve", 31)) player.hbl.blessingsGain = player.hbl.blessingsGain.mul(3)
        player.hbl.blessingsGain = player.hbl.blessingsGain.mul(player.h.prePowerMult)

        // POWER AND AUTOMATION
        if (hasUpgrade("hve", 62)) player.hbl.blessingsGain = player.hbl.blessingsGain.pow(1.03)

        let bps = player.hpu.purifierEffects[4]
        if (hasMilestone("s", 13) && !inChallenge("hrm", 11)) bps = bps.add(0.06)
        player.hbl.blessingPerSec = player.hbl.blessingsGain.mul(bps)
        if (inChallenge("hrm", 13)) player.hbl.blessingPerSec = player.hbl.blessingPerSec.sub(player.hbl.blessings.mul(0.06))
        if (player.hbl.blessings.add(player.hbl.blessingPerSec.mul(delta)).gt(0)) player.hbl.blessings = player.hbl.blessings.add(player.hbl.blessingPerSec.mul(delta))
        
        // BOON START
        player.hbl.boonsGain = player.hbl.blessings.pow(1.6).div(6)
        player.hbl.boonsGain = player.hbl.boonsGain.mul(player.hbl.boosterEffects[1])
        player.hbl.boonsGain = player.hbl.boonsGain.mul(player.hre.refinementEffect[3][0])
        player.hbl.boonsGain = player.hbl.boonsGain.mul(buyableEffect("hcu", 108))
        if (hasMilestone("hbl", 4)) player.hbl.boonsGain = player.hbl.boonsGain.mul(2)
        if (hasMilestone("hbl", 4) || inChallenge("hrm", 12)) player.hbl.boonsGain = player.hbl.boonsGain.mul(player.hpu.purifierEffects[1])
        player.hbl.boonsGain = player.hbl.boonsGain.mul(player.h.prePowerMult)

        // POWER AND AUTOMATION
        if (inChallenge("hrm", 12)) player.hbl.boonsGain = player.hbl.boonsGain.pow(0.6)

        if (inChallenge("hrm", 13)) player.hbl.boonsGain = player.hbl.boonsGain.sub(player.hbl.boons.mul(0.06))
        if (player.hbl.boons.add(player.hbl.boonsGain.mul(delta)).gt(0)) player.hbl.boons = player.hbl.boons.add(player.hbl.boonsGain.mul(delta))
        if (hasUpgrade("hpw", 51) && !inChallenge("hrm", 15)) {
            for (let i = 0; i < 6; i++) {
                player.hbl.boosterXP[i] = player.hbl.boosterXP[i].add(player.hbl.boons.mul(0.1).mul(delta))
            }
        }

        player.hbl.boosterReq[0] = Decimal.pow(6, player.hbl.boosterLevels[0])
        player.hbl.boosterReq[1] = Decimal.pow(12, player.hbl.boosterLevels[1].add(1))
        player.hbl.boosterReq[2] = Decimal.pow(30, player.hbl.boosterLevels[2].add(1))
        player.hbl.boosterReq[3] = Decimal.pow(60, player.hbl.boosterLevels[3].add(2))
        player.hbl.boosterReq[4] = Decimal.pow(120, player.hbl.boosterLevels[4].add(2))
        player.hbl.boosterReq[5] = Decimal.pow(180, player.hbl.boosterLevels[5].add(2))

        for (let i = 0; i < 6; i++) {
            if (player.hbl.boosterXP[i].gte(player.hbl.boosterReq[i].mul(0.99))) {
                player.hbl.boosterXP[i] = new Decimal(0)
                player.hbl.boosterLevels[i] = player.hbl.boosterLevels[i].add(1)
            }
        }

        player.hbl.boosterEffects[0] = Decimal.pow(1.3, player.hbl.boosterLevels[0])
        if (hasMilestone("hre", 2)) player.hbl.boosterEffects[0] = player.hbl.boosterEffects[0].mul(player.hbl.boosterXP[0].div(player.hbl.boosterReq[0]).mul(0.15).add(1))
        if (player.hbl.boosterEffects[0].gte(1e9)) player.hbl.boosterEffects[0] = player.hbl.boosterEffects[0].div(1e9).pow(0.3).mul(1e9)
        if (!inChallenge("hrm", 12)) player.hbl.boosterEffects[0] = player.hbl.boosterEffects[0].pow(player.hpu.purifierEffects[3])
        
        player.hbl.boosterEffects[1] = Decimal.pow(1.6, player.hbl.boosterLevels[1])
        if (hasMilestone("hre", 2)) player.hbl.boosterEffects[1] = player.hbl.boosterEffects[1].mul(player.hbl.boosterXP[1].div(player.hbl.boosterReq[1]).mul(0.3).add(1))

        player.hbl.boosterEffects[2] = Decimal.pow(Decimal.mul(0.06, player.hbl.boosterEffects[5]).add(1), player.hbl.boosterLevels[2])
        if (hasMilestone("hre", 2)) player.hbl.boosterEffects[2] = player.hbl.boosterEffects[2].mul(player.hbl.boosterXP[2].div(player.hbl.boosterReq[2]).mul(Decimal.mul(0.03, player.hbl.boosterEffects[5])).add(1))
        if (player.hbl.boosterEffects[2].gte(1e9)) player.hbl.boosterEffects[2] = player.hbl.boosterEffects[2].div(1e9).pow(Decimal.add(0.3, buyableEffect("hrm", 3))).mul(1e9)

        if (!hasUpgrade("hpw", 12)) player.hbl.boosterEffects[3] = Decimal.pow(2, player.hbl.boosterLevels[3])
        if (hasUpgrade("hpw", 12)) player.hbl.boosterEffects[3] = Decimal.pow(3, player.hbl.boosterLevels[3])
        if (hasMilestone("hre", 2)) {
            if (!hasUpgrade("hpw", 12)) player.hbl.boosterEffects[3] = player.hbl.boosterEffects[3].mul(player.hbl.boosterXP[3].div(player.hbl.boosterReq[3]).mul(0.5).add(1))
            if (hasUpgrade("hpw", 12)) player.hbl.boosterEffects[3] = player.hbl.boosterEffects[3].mul(player.hbl.boosterXP[3].div(player.hbl.boosterReq[3]).add(1))
        }
        if (player.hbl.boosterEffects[3].gte(1e12)) player.hbl.boosterEffects[3] = player.hbl.boosterEffects[3].div(1e12).pow(0.3).mul(1e12)

        if (!hasUpgrade("hve", 32)) player.hbl.boosterEffects[4] = Decimal.pow(1.5, player.hbl.boosterLevels[4])
        if (hasUpgrade("hve", 32)) player.hbl.boosterEffects[4] = Decimal.pow(1.6, player.hbl.boosterLevels[4])
        if (hasMilestone("hre", 2)) {
            if (!hasUpgrade("hve", 32)) player.hbl.boosterEffects[4] = player.hbl.boosterEffects[4].mul(player.hbl.boosterXP[4].div(player.hbl.boosterReq[4]).mul(0.25).add(1))
            if (hasUpgrade("hve", 32)) player.hbl.boosterEffects[4] = player.hbl.boosterEffects[4].mul(player.hbl.boosterXP[4].div(player.hbl.boosterReq[4]).mul(0.3).add(1))
        }

        if (!hasMilestone("hbl", 2)) player.hbl.boosterEffects[5] = Decimal.pow(2, player.hbl.boosterLevels[5])
        if (hasMilestone("hbl", 2)) player.hbl.boosterEffects[5] = Decimal.pow(2.3, player.hbl.boosterLevels[5])
        if (hasMilestone("hre", 2)) {
            if (!hasMilestone("hbl", 2)) player.hbl.boosterEffects[5] = player.hbl.boosterEffects[5].mul(player.hbl.boosterXP[5].div(player.hbl.boosterReq[5]).mul(0.5).add(1))
            if (hasMilestone("hbl", 2)) player.hbl.boosterEffects[5] = player.hbl.boosterEffects[5].mul(player.hbl.boosterXP[5].div(player.hbl.boosterReq[5]).mul(0.65).add(1))
        }
        if (player.hbl.boosterEffects[5].gte(16)) player.hbl.boosterEffects[5] = player.hbl.boosterEffects[5].log(2.4).mul(5)

        // AUTOMATION LIMIT
        if (player.hbl.minRefineInput.gte(1)) player.hbl.minRefine = player.hbl.minRefineInput.floor()
        if (player.hbl.minRefineInput.lt(1)) player.hbl.minRefine = new Decimal(1)
    },
    clickables: {
        1: {
            title() {
                if (inChallenge("hrm", 16)) return "<h2>Bless, but reset hex points and refinement.</h2><br><h3>Req: 18 Refinements.</h3>"
                return "<h2>Bless, but reset hex points, provenance, and refinement.</h2><br><h3>Req: 18 Refinements.</h3>"
            },
            canClick() {
                if (!inChallenge("hrm", 11)) return player.hre.refinement.gte(18)
                if (inChallenge("hrm", 11)) return player.hre.refinement.gte(18) && player.hrm.blessLimit.lt(6)
            },
            unlocked: true,
            onClick() {
                player.hbl.blessings = player.hbl.blessings.add(player.hbl.blessingsGain)
                if (inChallenge("hrm", 11)) player.hrm.blessLimit = player.hrm.blessLimit.add(1)

                // RESET CODE
                player.hre.refinement = new Decimal(0)
                player.hre.refinementGain = new Decimal(0)
                player.hre.refinementEffect = [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]]
                for (let i = 0; i < 6; i++) {
                    player.hpr.rank[i] = new Decimal(0)
                    player.hpr.rankGain[i] = new Decimal(0)
                    player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
                }
                player.h.hexPointGain = new Decimal(0)
                player.h.hexPoint = new Decimal(0)
            },
            style: {width: "400px", minHeight: "100px", border: "2px solid black", borderRadius: "15px"},
        },
        2: {
            title() {
                let str = "<h3>Hex Point Booster <small>Lv." + formatWhole(player.hbl.boosterLevels[0]) + "</small></h3><br>(" + formatWhole(player.hbl.boosterXP[0]) + "/" + formatWhole(player.hbl.boosterReq[0]) + ")<br>x" + format(player.hbl.boosterEffects[0]) + " Hex Points<br><small>(Hold to deposit boons)</small>"
                if (player.hbl.boosterEffects[0].pow(Decimal.div(1, player.hpu.purifierEffects[3])).gte(1e9)) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                return str
            },
            canClick: true,
            unlocked: true,
            onHold() {
                let amt = player.hbl.boosterReq[0].mul(player.hbl.boosterDeposit).min(player.hbl.boosterReq[0].sub(player.hbl.boosterXP[0]))
                if (player.hbl.boons.gte(amt)) {
                    player.hbl.boosterXP[0] = player.hbl.boosterXP[0].add(amt)
                    player.hbl.boons = player.hbl.boons.sub(amt)
                    if (player.hbl.boosterXP[0].gte(player.hbl.boosterReq[0].mul(0.99))) {
                        player.hbl.boosterXP[0] = new Decimal(0)
                        player.hbl.boosterLevels[0] = player.hbl.boosterLevels[0].add(1)
                        player.hbl.boosterReq[0] = Decimal.pow(6, player.hbl.boosterLevels[0])
                    }
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.hbl.boosterXP[0].div(player.hbl.boosterReq[0]).mul(100).min(100))}%, #cc9800 ${format(player.hbl.boosterXP[0].div(player.hbl.boosterReq[0]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        3: {
            title() { return "<h3>Boon Booster <small>Lv." + formatWhole(player.hbl.boosterLevels[1]) + "</small></h3><br>(" + formatWhole(player.hbl.boosterXP[1]) + "/" + formatWhole(player.hbl.boosterReq[1]) + ")<br>x" + format(player.hbl.boosterEffects[1]) + " Boons<br><small>(Hold to deposit boons)</small>" },
            canClick: true,
            unlocked: true,
            onHold() {
                let amt = player.hbl.boosterReq[1].mul(player.hbl.boosterDeposit).min(player.hbl.boosterReq[1].sub(player.hbl.boosterXP[1]))
                if (player.hbl.boons.gte(amt)) {
                    player.hbl.boosterXP[1] = player.hbl.boosterXP[1].add(amt)
                    player.hbl.boons = player.hbl.boons.sub(amt)
                    if (player.hbl.boosterXP[1].gte(player.hbl.boosterReq[1].mul(0.99))) {
                        player.hbl.boosterXP[1] = new Decimal(0)
                        player.hbl.boosterLevels[1] = player.hbl.boosterLevels[1].add(1)
                        player.hbl.boosterReq[1] = Decimal.pow(12, player.hbl.boosterLevels[1].add(1))
                    }
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.hbl.boosterXP[1].div(player.hbl.boosterReq[1]).mul(100).min(100))}%, #cc9800 ${format(player.hbl.boosterXP[1].div(player.hbl.boosterReq[1]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        4: {
            title() {
                let str = "<h3>IP Booster <small>Lv." + formatWhole(player.hbl.boosterLevels[2]) + "</small></h3><br>(" + formatWhole(player.hbl.boosterXP[2]) + "/" + formatWhole(player.hbl.boosterReq[2]) + ")<br>x" + format(player.hbl.boosterEffects[2]) + " Infinity Points<br><small>(Hold to deposit boons)</small>"
                if (player.hbl.boosterEffects[2].gte(1e9)) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                return str
            },
            canClick: true,
            unlocked: true,
            onHold() {
                let amt = player.hbl.boosterReq[2].mul(player.hbl.boosterDeposit).min(player.hbl.boosterReq[2].sub(player.hbl.boosterXP[2]))
                if (player.hbl.boons.gte(amt)) {
                    player.hbl.boosterXP[2] = player.hbl.boosterXP[2].add(amt)
                    player.hbl.boons = player.hbl.boons.sub(amt)
                    if (player.hbl.boosterXP[2].gte(player.hbl.boosterReq[2].mul(0.99))) {
                        player.hbl.boosterXP[2] = new Decimal(0)
                        player.hbl.boosterLevels[2] = player.hbl.boosterLevels[2].add(1)
                        player.hbl.boosterReq[2] = Decimal.pow(30, player.hbl.boosterLevels[2].add(1))
                    }
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.hbl.boosterXP[2].div(player.hbl.boosterReq[2]).mul(100).min(100))}%, #cc9800 ${format(player.hbl.boosterXP[2].div(player.hbl.boosterReq[2]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        5: {
            title() {
                let str = "<h3>Refiner Req Booster <small>Lv." + formatWhole(player.hbl.boosterLevels[3]) + "</small></h3><br>(" + formatWhole(player.hbl.boosterXP[3]) + "/" + formatWhole(player.hbl.boosterReq[3]) + ")<br>/" + format(player.hbl.boosterEffects[3]) + " Refinement Req<br><small>(Hold to deposit boons)</small>"
                if (player.hbl.boosterEffects[3].gte(1e12)) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                return str
            },
            canClick: true,
            unlocked() {return hasUpgrade("ta", 15)},
            onHold() {
                let amt = player.hbl.boosterReq[3].mul(player.hbl.boosterDeposit).min(player.hbl.boosterReq[3].sub(player.hbl.boosterXP[3]))
                if (player.hbl.boons.gte(amt)) {
                    player.hbl.boosterXP[3] = player.hbl.boosterXP[3].add(amt)
                    player.hbl.boons = player.hbl.boons.sub(amt)
                    if (player.hbl.boosterXP[3].gte(player.hbl.boosterReq[3].mul(0.99))) {
                        player.hbl.boosterXP[3] = new Decimal(0)
                        player.hbl.boosterLevels[3] = player.hbl.boosterLevels[3].add(1)
                        player.hbl.boosterReq[3] = Decimal.pow(60, player.hbl.boosterLevels[3].add(2))
                    }
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.hbl.boosterXP[3].div(player.hbl.boosterReq[3]).mul(100).min(100))}%, #cc9800 ${format(player.hbl.boosterXP[3].div(player.hbl.boosterReq[3]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        6: {
            title() { return "<h3>Blessing Booster <small>Lv." + formatWhole(player.hbl.boosterLevels[4]) + "</small></h3><br>(" + formatWhole(player.hbl.boosterXP[4]) + "/" + formatWhole(player.hbl.boosterReq[4]) + ")<br>x" + format(player.hbl.boosterEffects[4]) + " Blessings<br><small>(Hold to deposit boons)</small>" },
            canClick: true,
            unlocked() {return hasUpgrade("ta", 15)},
            onHold() {
                let amt = player.hbl.boosterReq[4].mul(player.hbl.boosterDeposit).min(player.hbl.boosterReq[4].sub(player.hbl.boosterXP[4]))
                if (player.hbl.boons.gte(amt)) {
                    player.hbl.boosterXP[4] = player.hbl.boosterXP[4].add(amt)
                    player.hbl.boons = player.hbl.boons.sub(amt)
                    if (player.hbl.boosterXP[4].gte(player.hbl.boosterReq[4].mul(0.99))) {
                        player.hbl.boosterXP[4] = new Decimal(0)
                        player.hbl.boosterLevels[4] = player.hbl.boosterLevels[4].add(1)
                        player.hbl.boosterReq[4] = Decimal.pow(120, player.hbl.boosterLevels[4].add(2))
                    }
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.hbl.boosterXP[4].div(player.hbl.boosterReq[4]).mul(100).min(100))}%, #cc9800 ${format(player.hbl.boosterXP[4].div(player.hbl.boosterReq[4]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        7: {
            title() {
                let str = "<h3>IP Booster Booster <small>Lv." + formatWhole(player.hbl.boosterLevels[5]) + "</small></h3><br>(" + formatWhole(player.hbl.boosterXP[5]) + "/" + formatWhole(player.hbl.boosterReq[5]) + ")<br>x" + format(player.hbl.boosterEffects[5]) + " IP Booster Base<br><small>(Hold to deposit boons)</small>"
                if (player.hbl.boosterEffects[5].gte(16)) str = str.concat("<br><small style='color:darkred'>[SOFTLOCKED]</small>")
                return str
            },
            canClick: true,
            unlocked() {return hasUpgrade("ta", 15)},
            onHold() {
                let amt = player.hbl.boosterReq[5].mul(player.hbl.boosterDeposit).min(player.hbl.boosterReq[5].sub(player.hbl.boosterXP[5]))
                if (player.hbl.boons.gte(amt)) {
                    player.hbl.boosterXP[5] = player.hbl.boosterXP[5].add(amt)
                    player.hbl.boons = player.hbl.boons.sub(amt)
                    if (player.hbl.boosterXP[5].gte(player.hbl.boosterReq[5].mul(0.99))) {
                        player.hbl.boosterXP[5] = new Decimal(0)
                        player.hbl.boosterLevels[5] = player.hbl.boosterLevels[5].add(1)
                        player.hbl.boosterReq[5] = Decimal.pow(180, player.hbl.boosterLevels[5].add(2))
                    }
                }
            },
            style() {
                return {background: `linear-gradient(to right, #ffbf00 ${format(player.hbl.boosterXP[5].div(player.hbl.boosterReq[5]).mul(100).min(100))}%, #cc9800 ${format(player.hbl.boosterXP[5].div(player.hbl.boosterReq[5]).mul(100).add(0.25).min(100))}%)`, width: "250px", minHeight: "100px", border: "2px solid black", borderRadius: "10px", margin: "3px"}
            },
        },
        101: {
            title() {
                if (player.hbl.blessAutomation) return "<h2>Automatically click the bless button</h2><br><h3>[ON]</h3>"
                return "<h2>Automatically click the bless button</h2><br><h3>[OFF]</h3>"
            },
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.hbl.blessAutomation) {
                    player.hbl.blessAutomation = false
                } else {
                    player.hbl.blessAutomation = true
                }
            },
            style() {
                let look = {width: "300px", minHeight: "100px", border: "0px", padding: "10px"}
                hasMilestone("hre", 12) ? look.borderRadius = "0 0 0 13px" : look.borderRadius = "0 0 13px 13px"
                if (player.hbl.blessAutomation) look.backgroundColor = "#ffbf00"
                if (!player.hbl.blessAutomation) look.backgroundColor = "#cc9800"
                return look
            }
        },
        102: {
            title: "5%",
            canClick() { return player.hbl.boosterDeposit != 0.05},
            unlocked() { return hasMilestone("hre", 7)},
            onClick() {
                player.hbl.boosterDeposit = 0.05
            },
            style: {width: "50px", minHeight: "40px", borderRadius: "0px"},
        },
        103: {
            title: "25%",
            canClick() { return player.hbl.boosterDeposit != 0.25},
            unlocked() { return hasMilestone("hre", 7)},
            onClick() {
                player.hbl.boosterDeposit = 0.25
            },
            style: {width: "50px", minHeight: "40px", borderRadius: "0px"},
        },
        104: {
            title: "100%",
            canClick() { return player.hbl.boosterDeposit != 1},
            unlocked() { return hasMilestone("hre", 7)},
            onClick() {
                player.hbl.boosterDeposit = 1
            },
            style: {width: "50px", minHeight: "40px", borderRadius: "0 13px 13px 0"},
        },
    },
    upgrades: {
        1: {
            title: "Grace I",
            unlocked() {return tmp.hbl.microtabs.blessing.Graces.unlocked},
            description: "Increase jinx cap based on NIP.",
            cost: new Decimal(60),
            currencyLocation() { return player.hbl },
            currencyDisplayName: "Blessings",
            currencyInternalName: "blessings",
            effect() {
                let eff = player.ta.negativeInfinityPoints.add(1).log(6).pow(0.6).ceil()
                if (inChallenge("hrm", 12)) eff = eff.pow(0.3).ceil()
                if (eff.gte(9)) eff = eff.div(9).pow(0.3).mul(9).ceil().min(18)
                return eff
            },
            effectDisplay() {
                if (upgradeEffect(this.layer, this.id).lt(9)) return "+" + formatWhole(upgradeEffect(this.layer, this.id))
                if (upgradeEffect(this.layer, this.id).lt(18)) return "+" + formatWhole(upgradeEffect(this.layer, this.id)) + "<br><small style='color:red'>[SOFTCAPPED]</small>"
                return "+" + formatWhole(upgradeEffect(this.layer, this.id)) + "<br><small style='color:red'>[HARDCAPPED]</small>"
            }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"},
        },
        2: {
            title: "Grace II",
            unlocked() {return tmp.hbl.microtabs.blessing.Graces.unlocked},
            description: "IP boosts hex point gain.",
            cost: new Decimal(180),
            currencyLocation() { return player.hbl },
            currencyDisplayName: "Blessings",
            currencyInternalName: "blessings",
            effect() {
                let eff = player.in.infinityPoints.add(1).log(6).pow(0.6).add(1)
                if (inChallenge("hrm", 12)) eff = eff.pow(0.3)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"},
        },
        3: {
            title: "Grace III",
            unlocked() {return tmp.hbl.microtabs.blessing.Graces.unlocked},
            description: "Infinities reduce refinement req.",
            cost: new Decimal(360),
            currencyLocation() { return player.hbl },
            currencyDisplayName: "Blessings",
            currencyInternalName: "blessings",
            effect() {
                let eff = player.in.infinities.add(1).log(3).pow(0.6).add(1)
                if (inChallenge("hrm", 12)) eff = eff.pow(0.3)
                return eff
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"},
        },
        4: {
            title: "Grace IV",
            unlocked() { return hasUpgrade("bi", 12) },
            description: "Alternative infinities boost curse gain.",
            cost: new Decimal(720),
            currencyLocation() { return player.hbl },
            currencyDisplayName: "Blessings",
            currencyInternalName: "blessings",
            effect() {
                let eff = player.tad.shatteredInfinities.mul(player.tad.disfiguredInfinities).mul(player.tad.corruptedInfinities).add(1).log(6).pow(2).add(1).pow(player.hpu.purifierEffects[5])
                if (inChallenge("hrm", 12)) eff = eff.pow(0.3)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"},
        },
        5: {
            title: "Grace V",
            unlocked() { return hasUpgrade("bi", 12) },
            description: "Highest Rocket fuel boosts hex point gain.",
            cost: new Decimal(1440),
            currencyLocation() { return player.hbl },
            currencyDisplayName: "Blessings",
            currencyInternalName: "blessings",
            effect() {
                let eff = player.ta.highestRocketFuel.add(1).log(6).pow(0.6).add(1)
                if (inChallenge("hrm", 12)) eff = eff.pow(0.3)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"},
        },
        6: {
            title: "Grace VI",
            unlocked() { return hasUpgrade("bi", 12) },
            description() {
                if (inChallenge("hrm", 16)) return "Highest Dice Points boosts refiner 1 effects."
                return "Highest Dice Points boosts provenance effects."
            },
            cost: new Decimal(2880),
            currencyLocation() { return player.hbl },
            currencyDisplayName: "Blessings",
            currencyInternalName: "blessings",
            effect() {
                let eff = player.ta.highestDicePoints.add(1).log(60).pow(0.1).mul(0.6).add(1)
                if (inChallenge("hrm", 12)) eff = eff.pow(0.3)
                if (inChallenge("hrm", 16)) eff = eff.pow(0.5).sub(1)
                return eff
            },
            effectDisplay() {
                if (inChallenge("hrm", 16)) return "+^" + format(upgradeEffect(this.layer, this.id))
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"},
        },
    },
    milestones: {
        1: {
            requirementDescription: "<h3>3,600 Blessings",
            effectDescription() { return "x" + format(new Decimal(2).mul(player.hpu.purifierEffects[1])) + " Blessings."},
            done() { return player.hbl.blessings.gte(3600) && tmp.hbl.microtabs.blessing.Miracles.unlocked},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        2: {
            requirementDescription: "<h3>6,000 Blessings",
            effectDescription: "Increase base of IP Booster Booster by +0.3.",
            done() { return player.hbl.blessings.gte(6000) && tmp.hbl.microtabs.blessing.Miracles.unlocked},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        3: {
            requirementDescription: "<h3>12,000 Blessings",
            effectDescription: "Increase jinx cap by 6.",
            done() { return player.hbl.blessings.gte(12000) && tmp.hbl.microtabs.blessing.Miracles.unlocked},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        4: {
            requirementDescription: "<h3>36,000 Blessings",
            effectDescription() { return "x" + format(new Decimal(2).mul(player.hpu.purifierEffects[1])) + " Boons."},
            done() { return player.hbl.blessings.gte(36000) && tmp.hbl.microtabs.blessing.Miracles.unlocked},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        5: {
            requirementDescription: "<h3>120,000 Blessings",
            effectDescription() {
                if (inChallenge("hrm", 16)) return "Boost refiner 1 effects by +^0.3."
                return "Boost provenenace effects by x1.3."
            },
            done() { return player.hbl.blessings.gte(120000) && tmp.hbl.microtabs.blessing.Miracles.unlocked},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        6: {
            requirementDescription: "<h3>360,000 Blessings",
            effectDescription: "Increase base of Λ-Jinx by +0.02.",
            done() { return player.hbl.blessings.gte(360000) && tmp.hbl.microtabs.blessing.Miracles.unlocked},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
    },
    microtabs: {
        blessing: {
            "Boons": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["blank", "5px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.hbl.boons) + "</h3> boons." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.hbl.boonsGain.eq(0) ? "" : player.hbl.boonsGain.gt(0) ? "(+" + format(player.hbl.boonsGain) + "/s)" : "<span style='color:red'>(" + format(player.hbl.boonsGain) + "/s)</span>" }, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ["raw-html", () => {return inChallenge("hrm", 12) && player.hbl.boonsGain.gt(0) ? "<small>[SOFTCAPPED]</small>" : "" }, {color: "red", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["blank", "10px"],
                    ["row", [["clickable", 2], ["clickable", 3], ["clickable", 4]]],
                    ["row", [["clickable", 5], ["clickable", 6], ["clickable", 7]]],
                    ["blank", "10px"],
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Deposit Rate", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "98px", height: "40px", borderRight: "2px solid black"}],
                        ["clickable", 102], ["clickable", 103], ["clickable", 104]
                    ], () => {
                        if (hasMilestone("hre", 7)) return {width: "250px", height: "40px", backgroundColor: "#332600", border: "2px solid black", borderRadius: "15px"}
                        return {display: "none !important"}
                    }],
                ]
            },
            "Graces": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked() { return hasUpgrade("ta", 18) || hasUpgrade("bi", 12)},
                content: [
                    ["blank", "5px"],
                    ["row", [["upgrade", 1], ["upgrade", 2], ["upgrade", 3]]],
                    ["row", [["upgrade", 4], ["upgrade", 5], ["upgrade", 6]]],
                ]
            },
            "Miracles": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked() { return hasUpgrade("bi", 103) && !inChallenge("hrm", 12)},
                content: [
                    ["blank", "5px"],
                    ["milestone", 1],
                    ["milestone", 2],
                    ["milestone", 3],
                    ["milestone", 4],
                    ["milestone", 5],
                    ["milestone", 6],
                ]
            },
            "Autoclicker": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked() {return hasMilestone("hre", 5) && !inChallenge("hrm", 15)},
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["style-column", [
                            ["style-row", [
                                ["raw-html", "Autoclicker", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "300px", height: "48px", borderBottom: "2px solid white"}],
                            ["clickable", 101],
                        ], () => {
                            if (hasMilestone("hre", 12)) return {width: "300px", height: "150px", backgroundColor: "#332600", border: "2px solid white", borderRadius: "15px 0 0 15px"}
                            return {width: "300px", height: "150px", backgroundColor: "#332600", border: "2px solid white", borderRadius: "15px"}
                        }],
                        ["style-column", [
                            ["style-row", [
                                ["raw-html", "Min. Refinement", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "300px", height: "48px", borderBottom: "2px solid white"}],
                            ["style-column", [
                                ["raw-html", () => { return "Current minimum: " + formatWhole(player.hbl.minRefine)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["blank", "10px"],
                                ["text-input", "minRefineInput", {backgroundColor: "#191300", color: "white", width: "180px", padding: "0 10px", textAlign: "left", fontSize: "28px", border: "2px solid black"}],
                            ], {width: "300px", height: "100px"}],
                        ], () => {
                            if (hasMilestone("hre", 12)) return {width: "300px", height: "150px", backgroundColor: "#332600", border: "2px solid white", borderLeft: "0px", borderRadius: "0 15px 15px 0"}
                            return {display: "none !important"}
                        }],
                    ]],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.h.hexPointGain.eq(0) ? "" : player.h.hexPointGain.gt(0) ? "(+" + format(player.h.hexPointGain) + "/s)" : "<span style='color:red'>(" + format(player.h.hexPointGain) + "/s)</span>"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
            ["raw-html", () => {return (inChallenge("hrm", 14) || player.h.hexPointGain.gte(1e308)) ? "[SOFTCAPPED]" : "" }, {color: "red", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => {return inChallenge("hrm", 15) ? "Time Remaining: " + formatTime(player.hrm.dreamTimer) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["style-column", [
            ["raw-html", "Hex of Blessings", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", backgroundColor: "#4c3900", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "10px"],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.hbl.blessings) + "</h3> blessings." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.hbl.blessingsGain) + ")" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
            ["raw-html", () => {return player.hbl.blessingPerSec.eq(0) ? "" : player.hbl.blessingPerSec.gt(0) ? "(+" + format(player.hbl.blessingPerSec) + "/s)" : "<span style='color:red'>(" + format(player.hbl.blessingPerSec) + "/s)</span>" }, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => {return inChallenge("hrm", 11) ? "Bless resets left: " + formatWhole(player.hrm.blessLimit) + "/6" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["clickable", 1],
        ["blank", "5px"],
        ["microtabs", "blessing", {borderWidth: "0px"}],
        ["blank", "25px"],
    ],
    layerShown() { return hasChallenge("ip", 13) }, // Decides if this node is shown or not.
});