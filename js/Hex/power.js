addLayer("hpw", {
    name: "Hex of Power",
    symbol: "Pw", // Decides what text appears on the node.
    tooltip: "Power", // Decides the nodes tooltip
    color: "#ff5555", // Decides the nodes color.
    nodeStyle: {borderColor: "#5e0000"}, // Decides the nodes style, in CSS format.
    branches: ["hbl"], // Decides the nodes branches.
    startData() { return {
        power: new Decimal(0),
        totalPower: new Decimal(0),
        powerGain: new Decimal(0),
        upgScale: [1, 1, 1, 1, 1, 1, 1, 1],
        vigor: 0,
    }},
    update(delta) {
        player.hpw.powerGain = Decimal.pow(2, player.hbl.blessings.add(1).div(6e5).log(6))
        if (hasUpgrade("hpw", 11)) player.hpw.powerGain = player.hpw.powerGain.mul(2)
        player.hpw.powerGain = player.hpw.powerGain.mul(player.hre.refinementEffect[5][0])
        player.hpw.powerGain = player.hpw.powerGain.mul(player.hrm.realmEffect)
        if (hasUpgrade("hpw", 72)) player.hpw.powerGain = player.hpw.powerGain.mul(2)

        player.hpw.powerGain = player.hpw.powerGain.floor() // To keep power to whole numbers
    },
    powerReset(type) {
        // TEMP REALM
        player.hrm.blessLimit = new Decimal(0)

        // PURITY
        player.hpu.purity = player.hpu.keptPurity
        player.hpu.totalPurity = player.hpu.keptPurity
        player.hpu.purityGain = new Decimal(0)
        player.hpu.purifier = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        
        let extra = new Decimal(0)
        if (hasUpgrade("hpw", 41)) extra = extra.add(1)
        if (type == 2 && hasUpgrade("hve", 33)) extra = extra.add(1)
        player.hpu.purifier[1] = extra
        player.hpu.purifier[4] = extra

        player.hpu.purifierEffects = [new Decimal(1), new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(0), new Decimal(1)]

        // CURSES
        player.hcu.curses = new Decimal(0)
        player.hcu.cursesGain = new Decimal(0)
        for (let i = 101; i < 109; i++) {
            player.hcu.buyables[i] = new Decimal(0)
        }
        if (!hasMilestone("hpw", 4)) player.hcu.buyables[109] = new Decimal(0)
        player.hcu.buyables[110] = new Decimal(0)
        player.hcu.buyables[111] = new Decimal(0)
        if (!hasMilestone("hpw", 4)) player.hcu.buyables[112] = new Decimal(0)

        // VEXES
        if (type != 2) {
            player.hve.vex = new Decimal(0)
            player.hve.vexTotal = new Decimal(0)
            player.hve.vexGain = new Decimal(0)
            player.hve.rowCurrent = [0, 0, 0, 0, 0, 0]
            player.hve.rowSpent = [0, 0, 0, 0, 0, 0]
            for (let i = 0; i < player.hve.upgrades.length; i++) {
                player.hve.upgrades.splice(i, 1);
                i--;
            }
        }

        // BLESSINGS
        player.hbl.blessings = new Decimal(0)
        player.hbl.blessingsGain = new Decimal(0)
        player.hbl.blessingPerSec = new Decimal(0)
        player.hbl.boons = new Decimal(0)
        player.hbl.boonsGain = new Decimal(0)
        player.hbl.blessAutomation = false
        player.hbl.boosterLevels[0] = new Decimal(0)
        player.hbl.boosterLevels[1] = new Decimal(0)
        if (!hasMilestone("hpw", 2)) player.hbl.boosterLevels[2] = new Decimal(0)
        player.hbl.boosterLevels[3] = new Decimal(0)
        player.hbl.boosterLevels[4] = new Decimal(0)
        if (!hasMilestone("hpw", 2)) player.hbl.boosterLevels[5] = new Decimal(0)
        player.hbl.boosterXP = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        player.hbl.boosterEffects = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(0)]
        for (let i = 0; i < player.hbl.upgrades.length; i++) {
            if (type != 1 && +player.hbl.upgrades[i] > player.hpw.vigor) {
                player.hbl.upgrades.splice(i, 1);
                i--;
            }
            if (type == 1) {
                player.hbl.upgrades.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < player.hbl.milestones.length; i++) {
            player.hbl.milestones.splice(i, 1);
            i--;
        }

        // REFINEMENT
        player.hre.refinement = new Decimal(0)
        player.hre.refinementGain = new Decimal(0)
        player.hre.refinementEffect = [[new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)], [new Decimal(1), new Decimal(1)]]
        
        // RANK
        for (let i = 0; i < 6; i++) {
            player.hpr.rank[i] = new Decimal(0)
            player.hpr.rankGain[i] = new Decimal(0)
            player.hpr.rankEffect[i] = [new Decimal(1), new Decimal(1)]
        }

        // HEX POINTS
        player.h.hexPointGain = new Decimal(0)
        player.h.hexPoint = new Decimal(0)
    },
    clickables: {
        1: {
            title() { return "<h2>Amplify Power, but reset previous hex content.</h2><br><h3>Req: 600,000 Blessings</h3>"},
            canClick() { return player.hbl.blessings.gte(6e5)},
            unlocked: true,
            onClick() {
                player.hpw.power = player.hpw.power.add(player.hpw.powerGain)
                player.hpw.totalPower = player.hpw.totalPower.add(player.hpw.powerGain)
                layers.hpw.powerReset(0)
            },
            style: {width: "400px", minHeight: "100px", border: "2px solid black", borderRadius: "15px"},
        },
        2: {
            title() { return "Respec your mights<br><small style='font-size:11px'>(Does a power reset)</small>"},
            canClick() { return hasUpgrade("hpw", 1) || hasUpgrade("hpw", 2)},
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to do a power reset?")) {
                    player.hpw.power = player.hpw.totalPower
                    for (let i = 0; i < player.hpw.upgrades.length; i++) {
                        player.hpw.upgrades.splice(i, 1);
                        i--;
                    }
                    player.hpw.upgScale = [1, 1, 1, 1, 1, 1, 1, 1]
                    setTimeout(() => {layers.hpw.powerReset(0)}, 500)
                }
            },
            style: {width: "250px", minHeight: "40px", lineHeight: "0.9", border: "2px solid black", borderRadius: "15px"},
        },
    },
    upgrades: {
        1: {
            title: "Might 1:1",
            unlocked: true,
            description: "Boost blessings based on power.",
            cost() {return new Decimal(1).pow(player.hpw.upgScale[0])},
            onPurchase() {player.hpw.upgScale[0] = player.hpw.upgScale[0] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            effect() {
                return player.hpw.power.add(1).log(6).add(1).mul(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
            style: {margin: "10px", borderRadius: "15px"},
        },
        2: {
            title: "Might 1:2",
            unlocked: true,
            description: "Boost hex points based on power.",
            cost() {return new Decimal(1).pow(player.hpw.upgScale[0])},
            onPurchase() {player.hpw.upgScale[0] = player.hpw.upgScale[0] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            effect() {
                if (hasUpgrade("hpw", 1031)) return player.hpw.power.add(1).pow(3).log(1.6).add(1).mul(6)
                return player.hpw.power.add(1).log(2).add(1).mul(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
            style: {margin: "10px", borderRadius: "15px"},
        },
        11: {
            title: "Might 2:1",
            unlocked: true,
            description: "Double power gain.",
            branches: [12],
            cost() {return new Decimal(3).pow(player.hpw.upgScale[1])},
            canAfford() { return hasUpgrade("hpw", 12)},
            onPurchase() {player.hpw.upgScale[1] = player.hpw.upgScale[1] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },
        12: {
            title: "Might 2:2",
            unlocked: true,
            description: "Increase the base of Refiner Req Booster by 1.",
            branches: [1, 2],
            cost() {return new Decimal(3).pow(player.hpw.upgScale[1])},
            canAfford() { return hasUpgrade("hpw", 1) || hasUpgrade("hpw", 2)},
            onPurchase() {player.hpw.upgScale[1] = player.hpw.upgScale[1] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },
        21: {
            title: "Might 3:1",
            unlocked: true,
            description: "Gain 1 free purity.",
            branches: [12],
            cost() {return new Decimal(9).pow(player.hpw.upgScale[2])},
            canAfford() { return hasUpgrade("hpw", 12)},
            onPurchase() {
                player.hpu.purity = player.hpu.purity.add(1)
                player.hpu.totalPurity = player.hpu.totalPurity.add(1)
                player.hpw.upgScale[2] = player.hpw.upgScale[2] + 1
            },
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },
        22: {
            title: "Might 3:2",
            unlocked: true,
            description: "Boost curse gain based on refinement.",
            branches: [12],
            cost() {return new Decimal(9).pow(player.hpw.upgScale[2])},
            canAfford() { return hasUpgrade("hpw", 12)},
            onPurchase() {player.hpw.upgScale[2] = player.hpw.upgScale[2] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            effect() {
                return Decimal.pow(6, player.hre.refinement.div(6).pow(0.66))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
            style: {margin: "10px", borderRadius: "15px"},
        },
        31: {
            title: "Might 4:1",
            unlocked: true,
            description: "Unlock 3 new purifiers.",
            branches: [21],
            cost() {return new Decimal(27).pow(player.hpw.upgScale[3])},
            canAfford() { return hasUpgrade("hpw", 21)},
            onPurchase() {player.hpw.upgScale[3] = player.hpw.upgScale[3] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },
        32: {
            title: "Might 4:2",
            unlocked: true,
            description: "Boost jinx cap based on jinx score.",
            branches: [22],
            cost() {return new Decimal(27).pow(player.hpw.upgScale[3])},
            canAfford() { return hasUpgrade("hpw", 22)},
            onPurchase() {player.hpw.upgScale[3] = player.hpw.upgScale[3] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            effect() {
                return player.hcu.jinxTotal.pow(1.6).add(1).log(6).floor()
            },
            effectDisplay() { return "+" + formatWhole(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {margin: "10px", borderRadius: "15px"},
        },
        41: {
            title: "Might 5:1",
            unlocked: true,
            description: "Multiplied Miracles and Amended Automation gain a free level.",
            branches: [31],
            cost() {return new Decimal(240).pow(player.hpw.upgScale[4])},
            canAfford() { return hasUpgrade("hpw", 31)},
            onPurchase() {
                player.hpw.upgScale[4] = player.hpw.upgScale[4] + 1
                player.hpu.purifier[1] = player.hpu.purifier[1].add(1)
                player.hpu.purifier[4] = player.hpu.purifier[4].add(1)
            },
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },
        42: {
            title: "Might 5:2",
            unlocked: true,
            description: "Unlock Hex of Vexes.",
            branches: [32],
            cost() {return new Decimal(240).pow(player.hpw.upgScale[4])},
            canAfford() { return hasUpgrade("hpw", 32)},
            onPurchase() {player.hpw.upgScale[4] = player.hpw.upgScale[4] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },
        51: {
            title: "Might 6:1",
            unlocked: true,
            description: "Deposit 10% of boons per second.",
            branches: [41, 42],
            cost() {return new Decimal(3600).pow(player.hpw.upgScale[5])},
            canAfford() { return hasUpgrade("hpw", 41) || hasUpgrade("hpw", 42)},
            onPurchase() {player.hpw.upgScale[5] = player.hpw.upgScale[5] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },
        61: {
            title: "Might 7:1",
            unlocked: true,
            description: "Reduce the softcap on Amended Automation.",
            branches: [51],
            cost() {return new Decimal(12000).pow(player.hpw.upgScale[6])},
            canAfford() { return hasUpgrade("hpw", 51)},
            onPurchase() {player.hpw.upgScale[6] = player.hpw.upgScale[6] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },
        62: {
            title: "Might 7:2",
            unlocked: true,
            description: "Add a new effect to Hex of Vexes.",
            branches: [51],
            cost() {return new Decimal(12000).pow(player.hpw.upgScale[6])},
            canAfford() { return hasUpgrade("hpw", 51)},
            onPurchase() {player.hpw.upgScale[6] = player.hpw.upgScale[6] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },
        71: {
            title: "Might 8:1",
            unlocked: true,
            description: "Boost blessings based on mights.",
            branches: [61, 62],
            cost() {return new Decimal(600000).pow(player.hpw.upgScale[7])},
            canAfford() { return hasUpgrade("hpw", 61) || hasUpgrade("hpw", 62)},
            onPurchase() {player.hpw.upgScale[7] = player.hpw.upgScale[7] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            effect() {
                return new Decimal(0.2).mul(player.hpw.upgrades.length).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id), 1) + "x" }, // Add formatting to the effect
            style: {margin: "10px", borderRadius: "15px"},
        },
        72: {
            title: "Might 8:2",
            unlocked: true,
            description: "Double power gain.",
            branches: [71],
            cost() {return new Decimal(1200).pow(player.hpw.upgScale[7])},
            canAfford() { return hasUpgrade("hpw", 71)},
            onPurchase() {player.hpw.upgScale[7] = player.hpw.upgScale[7] + 1},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px"},
        },

        1001: {
            title: "Might A:0",
            unlocked() { return hasUpgrade("bi", 27) },
            description: "Unlock the Creator Realm challenge.",
            branches: [12],
            cost() {return new Decimal(36)},
            canAfford() { return hasUpgrade("hpw", 12)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #f00"},
        },
        1002: {
            title: "Might B:0",
            unlocked() { return hasUpgrade("bi", 27) },
            description: "Unlock the Higher Plane challenge.",
            branches: [31],
            cost() {return new Decimal(216)},
            canAfford() { return hasUpgrade("hpw", 31)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #f80"},
        },
        1003: {
            title: "Might C:0",
            unlocked() { return hasUpgrade("bi", 27) },
            description: "Unlock the Death Realm challenge.",
            branches: [42],
            cost() {return new Decimal(1296)},
            canAfford() { return hasUpgrade("hpw", 42)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #ff0"},
        },
        1004: {
            title: "Might D:0",
            unlocked() { return hasUpgrade("bi", 27) },
            description: "Unlock the Dimensional Realm challenge.",
            branches: [71],
            cost() {return new Decimal(1679616)},
            canAfford() { return hasUpgrade("hpw", 61)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #0f0"},
        },
        1011: {
            title: "Might A:1",
            unlocked() {return challengeCompletions("hrm", 11) >= 1},
            description: "Boost check back xp based on power.",
            branches: [1001],
            cost() {return new Decimal(6)},
            canAfford() { return hasUpgrade("hpw", 1001)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            effect() {
                return player.hpw.power.add(1).log(10).mul(0.05).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #f00"},
        },
        1012: {
            title: "Might A:2",
            unlocked() {return challengeCompletions("hrm", 11) >= 2},
            description: "Raise rank, tier, tetr, and pent effects by ^1.18.",
            branches: [1001],
            cost() {return new Decimal(36)},
            canAfford() { return hasUpgrade("hpw", 1001)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #f00"},
        },
        1013: {
            title: "Might A:3",
            unlocked() {return challengeCompletions("hrm", 11) >= 3},
            description: "Multiply factor base by x120.",
            branches: [1001],
            cost() {return new Decimal(216)},
            canAfford() { return hasUpgrade("hpw", 1001)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #f00"},
        },
        1021: {
            title: "Might B:1",
            unlocked() {return challengeCompletions("hrm", 12) >= 1},
            description: "Boost crystals and steel based on power.",
            branches: [1002],
            cost() {return new Decimal(36)},
            canAfford() { return hasUpgrade("hpw", 1002)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            effect() {
                return player.hpw.power.add(1).pow(0.2).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #f80"},
        },
        1022: {
            title: "Might B:2",
            unlocked() {return challengeCompletions("hrm", 12) >= 2},
            description: "Raise prestige points gain by ^1.36.",
            branches: [1002],
            cost() {return new Decimal(216)},
            canAfford() { return hasUpgrade("hpw", 1002)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #f80"},
        },
        1023: {
            title: "Might B:3",
            unlocked() {return challengeCompletions("hrm", 12) >= 3},
            description: "Raise tree gain by ^1.24.",
            branches: [1002],
            cost() {return new Decimal(1296)},
            canAfford() { return hasUpgrade("hpw", 1002)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #f80"},
        },
        1031: {
            title: "Might C:1",
            unlocked() {return challengeCompletions("hrm", 13) >= 1},
            description: "Improve Might 1:2's effect.",
            branches: [1003],
            cost() {return new Decimal(216)},
            canAfford() { return hasUpgrade("hpw", 1003)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #ff0"},
        },
        1032: {
            title: "Might C:2",
            unlocked() {return challengeCompletions("hrm", 13) >= 2},
            description: "Raise grass gain by ^1.18.",
            branches: [1003],
            cost() {return new Decimal(1296)},
            canAfford() { return hasUpgrade("hpw", 1003)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #ff0"},
        },
        1033: {
            title: "Might C:3",
            unlocked() {return challengeCompletions("hrm", 13) >= 3},
            description: "Raise golden grass gain by ^1.06.",
            branches: [1003],
            cost() {return new Decimal(7776)},
            canAfford() { return hasUpgrade("hpw", 1003)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #ff0"},
        },
        1041: {
            title: "Might D:1",
            unlocked() {return challengeCompletions("hrm", 13) >= 1},
            description: "Boost infinity dimensions based on power.",
            branches: [1004],
            cost() {return new Decimal(1296)},
            canAfford() { return hasUpgrade("hpw", 1004)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            effect() {
                return player.hpw.power.add(1).pow(0.3).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #0f0"},
        },
        1042: {
            title: "Might D:2",
            unlocked() {return challengeCompletions("hrm", 13) >= 2},
            description: "Raise grasshopper gain by ^1.1.",
            branches: [1004],
            cost() {return new Decimal(7776)},
            canAfford() { return hasUpgrade("hpw", 1004)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #0f0"},
        },
        1043: {
            title: "Might D:3",
            unlocked() {return challengeCompletions("hrm", 13) >= 3},
            description: "Raise mod gain by ^1.1.",
            branches: [1004],
            cost() {return new Decimal(46656)},
            canAfford() { return hasUpgrade("hpw", 1004)},
            currencyLocation() { return player.hpw },
            currencyDisplayName: "Power",
            currencyInternalName: "power",
            style: {margin: "10px", borderRadius: "15px", border: "2px solid #0f0"},
        },
    },
    milestones: {
        1: {
            requirementDescription: "<h3>1 Total Power",
            effectDescription: "Keep a grace on power reset per vigor.",
            onComplete() { player.hpw.vigor = player.hpw.vigor + 1 },
            done() { return player.hpw.totalPower.gte(1)},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        2: {
            requirementDescription: "<h3>6 Total Power",
            effectDescription: "Keep IP related boosters on power resets.",
            onComplete() { player.hpw.vigor = player.hpw.vigor + 1 },
            done() { return player.hpw.totalPower.gte(6)},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        3: {
            requirementDescription: "<h3>36 Total Power",
            effectDescription: "Double blessing gain below power requirement.",
            onComplete() { player.hpw.vigor = player.hpw.vigor + 1 },
            done() { return player.hpw.totalPower.gte(36)},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        4: {
            requirementDescription: "<h3>216 Total Power",
            effectDescription: "Keep NIP related jinxes on power resets.",
            onComplete() { player.hpw.vigor = player.hpw.vigor + 1 },
            done() { return player.hpw.totalPower.gte(216)},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        5: {
            requirementDescription: "<h3>1296 Total Power",
            effectDescription: "Buying jinxes no longer spends curses.",
            onComplete() { player.hpw.vigor = player.hpw.vigor + 1 },
            done() { return player.hpw.totalPower.gte(1296)},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
        6: {
            requirementDescription: "<h3>7776 Total Power",
            effectDescription: "Double blessing gain below power requirement again.",
            onComplete() { player.hpw.vigor = player.hpw.vigor + 1 },
            done() { return player.hpw.totalPower.gte(7776)},
            style: {width: '500px', height: "50px", borderRadius: "10px"},
        },
    },
    microtabs: {
        power: {
            "Mights": {
                buttonStyle() { return {borderColor: "#5e0000", borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["blank", "5px"],
                    ["raw-html", "<i>Mights increase cost of other mights on the same row.</i>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["clickable", 2],
                    ["row", [
                        ["blank", ["140px", "140px"]],
                        ["upgrade", 1],
                        ["upgrade", 2],
                        ["style-row", [["upgrade", 1011]], {width: "140px", height: "140px"}],
                    ]],
                    ["row", [
                        ["blank", ["140px", "140px"]],
                        ["upgrade", 11],
                        ["upgrade", 12],
                        ["style-row", [["upgrade", 1001]], {width: "140px", height: "140px"}],
                        ["style-row", [["upgrade", 1012]], {width: "140px", height: "140px"}],
                    ]],
                    ["row", [
                        ["style-row", [["upgrade", 1021]], {width: "140px", height: "140px"}],
                        ["blank", ["70px", "140px"]],
                        ["upgrade", 21],
                        ["upgrade", 22],
                        ["style-row", [["upgrade", 1013]], {width: "140px", height: "140px"}],
                        ["blank", ["70px", "140px"]],
                    ]],
                    ["row", [
                        ["style-row", [["upgrade", 1022]], {width: "140px", height: "140px"}],
                        ["style-row", [["upgrade", 1002]], {width: "140px", height: "140px"}],
                        ["upgrade", 31],
                        ["upgrade", 32],
                        ["blank", ["70px", "140px"]],
                        ["style-row", [["upgrade", 1031]], {width: "140px", height: "140px"}],
                        ["blank", ["70px", "140px"]],
                    ]],
                    ["row", [
                        ["blank", ["70px", "140px"]],
                        ["style-row", [["upgrade", 1023]], {width: "140px", height: "140px"}],
                        ["blank", ["70px", "140px"]],
                        ["upgrade", 41],
                        ["upgrade", 42],
                        ["style-row", [["upgrade", 1003]], {width: "140px", height: "140px"}],
                        ["style-row", [["upgrade", 1032]], {width: "140px", height: "140px"}],
                    ]],
                    ["row", [
                        ["blank", ["280px", "140px"]],
                        ["upgrade", 51],
                        ["blank", ["140px", "140px"]],
                        ["style-row", [["upgrade", 1033]], {width: "140px", height: "140px"}],
                    ]],
                    ["row", [
                        ["upgrade", 61],
                        ["upgrade", 62],
                    ]],
                    ["row", [
                        ["style-row", [["upgrade", 1004]], {width: "140px", height: "140px"}],
                        ["upgrade", 71],
                        ["upgrade", 72],
                    ]],
                ],
            },
            "Vigors": {
                buttonStyle() { return {borderColor: "#5e0000", borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["raw-html", () => {return "You have <h3>" + formatWhole(player.hpw.totalPower) + "</h3> total power." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["milestone", 1],
                    ["milestone", 2],
                    ["milestone", 3],
                    ["milestone", 4],
                    ["milestone", 5],
                    ["milestone", 6],
                ],
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.h.hexPointGain.eq(0) ? "" : player.h.hexPointGain.gt(0) ? "(+" + format(player.h.hexPointGain) + "/s)" : "<span style='color:red'>(" + format(player.h.hexPointGain) + "/s)</span>"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["style-column", [
            ["raw-html", "Hex of Power", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", backgroundColor: "#4c1919", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "10px"],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + formatWhole(player.hpw.power) + "</h3> Power." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.hbl.blessings.gte(6e5) ? "(+" + formatWhole(player.hpw.powerGain) + ")" : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["clickable", 1],
        ["blank", "5px"],
        ["microtabs", "power", {borderWidth: "0px"}],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("i", 30) }, // Decides if this node is shown or not.
});