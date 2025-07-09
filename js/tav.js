addLayer("ta", {
    name: "Tav", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h2>→", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        reachedNegativeInfinity: false,
        unlockedReverseBreak: false,

        //negative infinity
        negativeInfinityPause: new Decimal(0),

        negativeInfinityPoints: new Decimal(0),
        negativeInfinityPointsToGet: new Decimal(1),

        dimensionPowerIndex: new Decimal(0),
        dimensionPower: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        dimensionPowerPerSecond: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        dimensionPowerEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],

        dimensionAutobuyToggles: [false, false, false, false, false, false, false, false, false, false, false,],
        dimensionAutobuyTimeReq: [new Decimal(3), new Decimal(3.5), new Decimal(4), new Decimal(4.5), new Decimal(5), new Decimal(5.5), new Decimal(6), new Decimal(6.5), new Decimal(4),new Decimal(10),new Decimal(25),],
        dimensionAutobuyTimer: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        dimboostToggle: false,
        dimboostLimit: new Decimal(1),
        dimboostLimitInput: new Decimal(1),

        galaxyLimit: new Decimal(1),
        galaxyLimitInput: new Decimal(1),

        highestDicePoints: new Decimal(0),
        highestRocketFuel: new Decimal(0),
        highestHex1Points: new Decimal(0),

    }
    },
    automate() {
        if (hasUpgrade("bi", 104))
        {
            buyBuyable("ta", 11)
            buyBuyable("ta", 12)
            buyBuyable("ta", 13)
            buyBuyable("ta", 14)
            buyBuyable("ta", 15)
            buyBuyable("ta", 16)
            buyBuyable("ta", 17)
            buyBuyable("ta", 18)

            buyBuyable("ta", 21)
            buyBuyable("ta", 22)
            buyBuyable("ta", 23)
            buyBuyable("ta", 24)
            buyBuyable("ta", 25)
            buyBuyable("ta", 26)
            buyBuyable("ta", 27)
            buyBuyable("ta", 28)
            buyBuyable("ta", 29)

            buyBuyable("ta", 31)
            buyBuyable("ta", 32)
            buyBuyable("ta", 33)
            buyBuyable("ta", 34)
            buyBuyable("ta", 35)
            buyBuyable("ta", 36)
            buyBuyable("ta", 37)

            buyBuyable("ta", 41)
            buyBuyable("ta", 42)
            buyBuyable("ta", 43)
            buyBuyable("ta", 44)
            buyBuyable("ta", 45)
            buyBuyable("ta", 46)
            buyBuyable("ta", 47)
            buyBuyable("ta", 48)
            buyBuyable("ta", 49)

            buyBuyable("ta", 51)
            buyBuyable("ta", 52)
            buyBuyable("ta", 53)
        }
        if (hasMilestone("s", 17))
        {
            buyUpgrade("ta", 11)
            buyUpgrade("ta", 12)
            buyUpgrade("ta", 13)
            buyUpgrade("ta", 14)
            buyUpgrade("ta", 15)
            buyUpgrade("ta", 16)
            buyUpgrade("ta", 17)
            buyUpgrade("ta", 18)
            buyUpgrade("ta", 19)
            buyUpgrade("ta", 21)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)",
            "background-origin": "border-box",
            "border-color": "#31aeb0",
            "color": "#008080",
        };
      },

    tooltip: "Tav, the Celestial of Limits",
    color: "#b2d8d8",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.ad.antimatter.gte(Number.MAX_VALUE))
        {
            player.ta.reachedNegativeInfinity = true
        }

        if (player.ta.reachedNegativeInfinity && !player.ta.unlockedReverseBreak) {
            if ((!hasUpgrade("ta", 13) && player.ta.negativeInfinityPoints.lt(1000)) && player.ta.reachedNegativeInfinity && (!player.s.highestSingularityPoints.gt(0) || player.ad.antimatter.gte(1e308))) 
            {
                player.tab = "revc"
            }
            else if (hasUpgrade("ta", 13) || player.ta.negativeInfinityPoints.gte(1000))
            {
                layers.revc.reverseCrunch()
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)

            }
        }  else if (player.tab == "revc")
        {
            if (options.newMenu) {
                player.tab = "ip"
            } else {
                player.tab = "in"
            }
        }

        if (!player.ta.unlockedReverseBreak) player.ta.negativeInfinityPointsToGet = new Decimal(1)
        if (player.ta.unlockedReverseBreak && !hasMilestone("r", 26)) player.ta.negativeInfinityPointsToGet = Decimal.pow(2, player.ad.antimatter.div(1e308).add(1).log(1e308)).mul(10)
        if (player.ta.unlockedReverseBreak && hasMilestone("r", 26)) player.ta.negativeInfinityPointsToGet = Decimal.pow(5, player.ad.antimatter.div(1e308).add(1).log(1e308)).mul(10)
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("ip", 12))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("ta", 34))
        if (hasUpgrade('ip', 41)) player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(upgradeEffect("ip", 41))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("f", 51))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("f", 52))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("f", 53))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("f", 54))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("f", 55))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("f", 56))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("f", 57))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("f", 58))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("ta", 51))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("ta", 52))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("ta", 53))
        if (hasUpgrade('bi', 102)) player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(upgradeEffect("bi", 102))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(player.om.rocketFuelMasteryPointsEffect)
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("tad", 22))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("r", 13))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("rm", 32))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(levelableEffect("pet", 208)[1])
        if (hasMilestone("fa", 15)) player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(player.fa.milestoneEffect[4])
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(player.sd.singularityPowerEffect)
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("ra", 16))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(player.le.punchcardsPassiveEffect[2])
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(player.r.pentMilestone13Effect)
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("st", 301))

        player.ta.negativeInfinityPause = player.ta.negativeInfinityPause.sub(1)
        if (player.ta.negativeInfinityPause.gt(0)) {
            layers.ta.negativeInfinityReset();
        }

        player.ta.dimensionPowerPerSecond[0] = buyableEffect("ta", 11)
        player.ta.dimensionPowerPerSecond[1] = buyableEffect("ta", 12)
        player.ta.dimensionPowerPerSecond[2] = buyableEffect("ta", 13)
        player.ta.dimensionPowerPerSecond[3] = buyableEffect("ta", 14)
        player.ta.dimensionPowerPerSecond[4] = buyableEffect("ta", 15)
        player.ta.dimensionPowerPerSecond[5] = buyableEffect("ta", 16)
        player.ta.dimensionPowerPerSecond[6] = buyableEffect("ta", 17)
        player.ta.dimensionPowerPerSecond[7] = buyableEffect("ta", 18)
        for (let i = 0; i < player.ta.dimensionPowerEffects.length; i++) {
            player.ta.dimensionPowerEffects[i] = player.ta.dimensionPower[i].pow(0.6).div(10).add(1)
            player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(buyableEffect("ip", 13))
            player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(buyableEffect("ta", 35))
            if (hasUpgrade('ta', 12)) player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(upgradeEffect("ta", 12))
            if (hasUpgrade('ip', 44)) player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(upgradeEffect("ip", 44))
            player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(buyableEffect("om", 14))
            player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(buyableEffect("gh", 36))
            player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(levelableEffect("pet", 209)[0])
            player.ta.dimensionPower[i] = player.ta.dimensionPower[i].add(player.ta.dimensionPowerPerSecond[i].mul(delta))
        }

        for (let i = 0; i < 11; i++) {
            if (player.ta.dimensionAutobuyToggles[i]) player.ta.dimensionAutobuyTimer[i] = player.ta.dimensionAutobuyTimer[i].add(onepersec.mul(delta))
            if (player.ta.dimensionAutobuyTimer[i].gte(player.ta.dimensionAutobuyTimeReq[i])) {
                if (i == 0 && player.ta.buyables[21].gte(1)) {
                    buyBuyable("ad", 11)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 1 && player.ta.buyables[22].gte(1)) {
                    buyBuyable("ad", 12)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 2 && player.ta.buyables[23].gte(1)) {
                    buyBuyable("ad", 13)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 3 && player.ta.buyables[24].gte(1)) {
                    buyBuyable("ad", 14)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 4 && player.ta.buyables[25].gte(1)) {
                    buyBuyable("ad", 15)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 5 && player.ta.buyables[26].gte(1)) {
                    buyBuyable("ad", 16)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 6 && player.ta.buyables[27].gte(1)) {
                    buyBuyable("ad", 17)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 7 && player.ta.buyables[28].gte(1)) {
                    buyBuyable("ad", 18)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 8 && player.ta.buyables[29].gte(1)) {
                    buyBuyable("ad", 1)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 9 && player.ta.buyables[31].gte(1) && (!hasUpgrade("ta", 14) || hasUpgrade("ta", 14) && getBuyableAmount("ad", 2).lt(player.ta.dimboostLimit))) {
                    if (!player.ta.dimboostToggle || player.ta.dimboostToggle && getBuyableAmount("ad", 3).gte(player.ta.galaxyLimit)) {
                        buyBuyable("ad", 2)
                        player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                    } else {
                        if (getBuyableAmount("ad", 2).lt(4)) {
                            buyBuyable("ad", 2)
                            player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                        }
                    }
                }
                if (i == 10 && player.ta.buyables[32].gte(1)) {
                    if (!hasUpgrade("ta", 14) || hasUpgrade("ta", 14) && getBuyableAmount("ad", 3).lt(player.ta.galaxyLimit)) {
                        buyBuyable("ad", 3)
                        player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                    }
                }
            }
        }
        player.ta.dimensionAutobuyTimeReq = [new Decimal(3), new Decimal(3.5), new Decimal(4), new Decimal(4.5), new Decimal(5), new Decimal(5.5), new Decimal(6), new Decimal(6.5), new Decimal(4),new Decimal(10),new Decimal(25),]
        player.ta.dimensionAutobuyTimeReq[0] = player.ta.dimensionAutobuyTimeReq[0].div(buyableEffect("ta", 21))
        player.ta.dimensionAutobuyTimeReq[1] = player.ta.dimensionAutobuyTimeReq[1].div(buyableEffect("ta", 22))
        player.ta.dimensionAutobuyTimeReq[2] = player.ta.dimensionAutobuyTimeReq[2].div(buyableEffect("ta", 23))
        player.ta.dimensionAutobuyTimeReq[3] = player.ta.dimensionAutobuyTimeReq[3].div(buyableEffect("ta", 24))
        player.ta.dimensionAutobuyTimeReq[4] = player.ta.dimensionAutobuyTimeReq[4].div(buyableEffect("ta", 25))
        player.ta.dimensionAutobuyTimeReq[5] = player.ta.dimensionAutobuyTimeReq[5].div(buyableEffect("ta", 26))
        player.ta.dimensionAutobuyTimeReq[6] = player.ta.dimensionAutobuyTimeReq[6].div(buyableEffect("ta", 27))
        player.ta.dimensionAutobuyTimeReq[7] = player.ta.dimensionAutobuyTimeReq[7].div(buyableEffect("ta", 28))
        player.ta.dimensionAutobuyTimeReq[8] = player.ta.dimensionAutobuyTimeReq[8].div(buyableEffect("ta", 29))
        player.ta.dimensionAutobuyTimeReq[9] = player.ta.dimensionAutobuyTimeReq[9].div(buyableEffect("ta", 31))
        player.ta.dimensionAutobuyTimeReq[10] = player.ta.dimensionAutobuyTimeReq[10].div(buyableEffect("ta", 32))

        if (player.ta.dimboostLimitInput.gte(0)) player.ta.dimboostLimit = player.ta.dimboostLimitInput.floor()
        if (player.ta.dimboostLimitInput.lt(0)) player.ta.dimboostLimit = new Decimal(0)

        if (player.ta.galaxyLimitInput.gte(0)) player.ta.galaxyLimit = player.ta.galaxyLimitInput.floor()
        if (player.ta.galaxyLimitInput.lt(0)) player.ta.galaxyLimit = new Decimal(0)
    },
    negativeInfinityReset()
    {
        player.ad.antimatter = new Decimal(10)

        player.ad.buyables[1] = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
        {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.buyables[11+i] = new Decimal(0)
        }

        player.ad.buyables[2] = new Decimal(0)
        player.ad.buyables[3] = new Decimal(0)

        for (let i = 0; i < player.ta.dimensionPower.length; i++)
        {
            player.ta.dimensionPower[i] = new Decimal(0)
        }
    },
    branches: ["ad"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '50px', borderRadius: '5px 0px 0px 5px' }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', borderRadius: '0px 5px 5px 0px' }
        },
        4: {
            title() { return "<h3>Lower Dimension" },
            canClick() { return player.ta.dimensionPowerIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionPowerIndex = player.ta.dimensionPowerIndex.sub(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        5: {
            title() { return "<h3>Increase Dimension" },
            canClick() { return player.ta.dimensionPowerIndex.lt(7) },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionPowerIndex = player.ta.dimensionPowerIndex.add(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        11: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        14: {
            title() { return "<h2>ENTER" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "tad"
            },
            style: { width: '200px', "min-height": '100px',},
        },
        15: {
            title() { return "<h2>REVERSE CRUNCH" },
            canClick() { return player.ad.antimatter.gte('1e308') },
            unlocked() { return true },
            onClick() {
                player.ad.revCrunchPause = new Decimal(6)
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '300px', "min-height": '120px', borderRadius: '15px' },
        },
        16: {
            title() { return "<h2>REVERSE BREAK INFINITY" },
            canClick() { return true },
            unlocked() { return !player.ta.unlockedReverseBreak},
            onClick() {
                player.ta.unlockedReverseBreak = true
            },
            style: { width: '200px', "min-height": '80px', borderRadius: '15px' },
        },
        17: {
            title() { return "<h2>REVERSE FIX INFINITY" },
            canClick() { return true },
            unlocked() { return player.ta.unlockedReverseBreak},
            onClick() {
                player.ta.unlockedReverseBreak = false
            },
            style: { width: '200px', "min-height": '80px', borderRadius: '15px' },
        },
        18: {
            title() { return "<h3>Toggle<br>On" },
            canClick() { return !player.ta.dimboostToggle },
            unlocked() { return true },
            onClick() {
                player.ta.dimboostToggle = true
            },
            style: { width: '100px', "min-height": '100px', borderRadius: '15px 0px 0px 15px' },
        },
        19: {
            title() { return "<h3>Toggle<br>Off" },
            canClick() { return player.ta.dimboostToggle },
            unlocked() { return true },
            onClick() {
                player.ta.dimboostToggle = false
            },
            style: { width: '100px', "min-height": '100px', borderRadius: '0px 15px 15px 0px' },
        },
        101: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[0] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[0] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        102: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[0] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[0] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        103: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[1] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[1] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        104: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[1] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[1] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        105: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[2] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[2] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        106: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[2] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[2] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        107: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[3] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[3] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        108: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[3] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[3] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        109: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[4] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[4] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        110: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[4] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[4] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        111: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[5] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[5] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        112: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[5] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[5] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        113: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[6] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[6] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        114: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[6] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[6] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        115: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[7] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[7] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        116: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[7] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[7] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        117: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[8] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[8] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        118: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[8] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[8] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        119: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[9] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[9] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        120: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[9] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[9] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
        121: {
            title() { return "<h3>On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[10] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[10] = true
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px' },
        },
        122: {
            title() { return "<h3>Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[10] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[10] = false
            },
            style: { width: '50px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Negative Upgrade I",
            unlocked() { return true },
            description: "Unlocks Buyables.",
            cost: new Decimal(1),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
        12:
        {
            title: "Negative Upgrade II",
            unlocked() { return true },
            description: "NIP boosts Dimension Power gain.",
            cost: new Decimal(3),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            effect() {
                return player.ta.negativeInfinityPoints.pow(0.75).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', "min-height": '120px' },
        },
        13:
        {
            title: "Negative Upgrade III",
            unlocked() { return hasUpgrade("ta", 12) },
            description: "Skip the reverse crunch button.",
            cost: new Decimal(8),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
        14:
        {
            title: "Negative Upgrade IV",
            unlocked() { return hasUpgrade("ta", 13) },
            description: "Unlock limiters for Dimboost and Galaxy autobuyers. Unlock new IP upgrades.",
            cost: new Decimal(20),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
        15:
        {
            title: "Negative Upgrade V",
            unlocked() { return hasUpgrade("ta", 14) },
            description: "Unlock infinity point factors (in factors).",
            cost: new Decimal(88),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
        16:
        {
            title: "Negative Upgrade VI",
            unlocked() { return hasUpgrade("ta", 15) },
            description: "Unlock negative infinity point factors.",
            cost: new Decimal(444),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
        17:
        {
            title: "Negative Upgrade VII",
            unlocked() { return hasUpgrade("ta", 16) },
            description: "Unlock the OTF synergizer.",
            cost: new Decimal(2000),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
        18:
        {
            title: "Negative Upgrade VIII",
            unlocked() { return hasUpgrade("ta", 17) },
            description: "Boost hex points based on NIP.",
            cost: new Decimal(15000),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            effect() {
                return player.ta.negativeInfinityPoints.pow(0.55).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', "min-height": '120px' },
        },
        19:
        {
            title: "Negative Upgrade IX",
            unlocked() { return hasUpgrade("ta", 18) },
            description: "Unlock 3 more OTF synergizer buyables.",
            cost: new Decimal(30000),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
        21:
        {
            title: "Negative Upgrade X",
            unlocked() { return hasUpgrade("ta", 19) },
            description: "Unlock TAV'S DOMAIN and broken infinities.",
            cost: new Decimal(1000000),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return true},
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " NIP"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '60px', borderRadius: '10px'}
        },
        12: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " NIP"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '60px', borderRadius: '10px'}
        },
        13: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " NIP"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '60px', borderRadius: '10px'}
        },
        14: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " NIP"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '60px', borderRadius: '10px'}
        },
        15: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " NIP"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '60px', borderRadius: '10px'}
        },
        16: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " NIP"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '60px', borderRadius: '10px'}
        },
        17: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " NIP"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '60px', borderRadius: '10px'}
        },
        18: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return true},
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " NIP"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '60px', borderRadius: '10px'}
        },
        21: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "1st Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.15
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        22: {
            cost(x) { return new Decimal(1.16).pow(x || getBuyableAmount(this.layer, this.id)).mul(1.5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "2nd Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1.5)
                let growth = 1.16
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        23: {
            cost(x) { return new Decimal(1.17).pow(x || getBuyableAmount(this.layer, this.id)).mul(2) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "3rd Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(2)
                let growth = 1.17
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        24: {
            cost(x) { return new Decimal(1.18).pow(x || getBuyableAmount(this.layer, this.id)).mul(2.5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "4th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(2.5)
                let growth = 1.18
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        25: {
            cost(x) { return new Decimal(1.19).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "5th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(3)
                let growth = 1.19
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        26: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(3.5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "6th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(3.5)
                let growth = 1.2
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        27: {
            cost(x) { return new Decimal(1.21).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "7th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(4)
                let growth = 1.21
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        28: {
            cost(x) { return new Decimal(1.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(4.5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "8th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(4.5)
                let growth = 1.22
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        29: {
            cost(x) { return new Decimal(1.175).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Tickspeed Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(3)
                let growth = 1.175
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        31: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(8) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Dimboost Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(8)
                let growth = 1.3
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        32: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(12) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "Galaxy Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(12)
                let growth = 1.4
                if (player.buyMax == false && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        // TAV BUYABLES
        33: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "IP Buyable"
            },
            display() {
                return "which are multiplying infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(1)
                let growth = 1.1
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        34: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "NIP Buyable"
            },
            display() {
                return "which are multiplying negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(3)
                let growth = 1.15
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        35: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.4).pow(1.1).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "DIMP Buyable"
            },
            display() {
                return "which are multiplying all dimension power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(5)
                let growth = 1.2
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        36: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(8) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.3).pow(1.05).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "AD Buyable"
            },
            display() {
                return "which are multiplying all antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(8)
                let growth = 1.25
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        37: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(14) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(100).pow(1.2).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return "AM Buyable"
            },
            display() {
                return "which are multiplying antimatter (ignoring softcap) by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy(mult) {
                let base = new Decimal(14)
                let growth = 1.3
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },


        //OTFS
        41: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) },
            title() {
                return "Dice-Dice Synergy"
            },
            display() {
                return "which are multiplying dice point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy(mult) {
                let base = new Decimal(1e25)
                let growth = 100
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        42: {
            cost(x) { return new Decimal(33).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e18) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return true },
            canAfford() { return player.rf.rocketFuel.gte(this.cost()) },
            title() {
                return "Rocket Fuel-Dice Synergy"
            },
            display() {
                return "which are multiplying dice point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Rocket Fuel"
            },
            buy(mult) {
                let base = new Decimal(1e18)
                let growth = 33
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.rf.rocketFuel = player.rf.rocketFuel.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.rf.rocketFuel, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.rf.rocketFuel = player.rf.rocketFuel.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        43: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e20) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return "Hex-Dice Synergy"
            },
            display() {
                return "which are multiplying dice point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy(mult) {
                let base = new Decimal(1e20)
                let growth = 10
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        44: {
            cost(x) { return new Decimal(40).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.9).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) },
            title() {
                return "Dice-Rocket Fuel Synergy"
            },
            display() {
                return "which are multiplying rocket fuel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy(mult) {
                let base = new Decimal(1e25)
                let growth = 40
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        45: {
            cost(x) { return new Decimal(22).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e18) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.9).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return true },
            canAfford() { return player.rf.rocketFuel.gte(this.cost()) },
            title() {
                return "Rocket Fuel-Rocket Fuel Synergy"
            },
            display() {
                return "which are multiplying rocket fuel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Rocket Fuel"
            },
            buy(mult) {
                let base = new Decimal(1e18)
                let growth = 22
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.rf.rocketFuel = player.rf.rocketFuel.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.rf.rocketFuel, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.rf.rocketFuel = player.rf.rocketFuel.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        46: {
            cost(x) { return new Decimal(8).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e20) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.9).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return "Hex-Rocket Fuel Synergy"
            },
            display() {
                return "which are multiplying rocket fuel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy(mult) {
                let base = new Decimal(1e20)
                let growth = 8
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        47: {
            cost(x) { return new Decimal(66).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) },
            title() {
                return "Dice-Hex Synergy"
            },
            display() {
                return "which are multiplying all hex point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy(mult) {
                let base = new Decimal(1e25)
                let growth = 66
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        48: {
            cost(x) { return new Decimal(25).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e18) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.15).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return true },
            canAfford() { return player.rf.rocketFuel.gte(this.cost()) },
            title() {
                return "Rocket Fuel-Hex Synergy"
            },
            display() {
                return "which are multiplying all hex point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Rocket Fuel"
            },
            buy(mult) {
                let base = new Decimal(1e18)
                let growth = 25
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.rf.dicePoints = player.rf.rocketFuel.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.rf.rocketFuel, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.rf.rocketFuel = player.rf.rocketFuel.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        49: {
            cost(x) { return new Decimal(9).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e20) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.125).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return "Hex-Hex Synergy"
            },
            display() {
                return "which are multiplying all hex point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy(mult) {
                let base = new Decimal(1e20)
                let growth = 9
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        51: {
            cost(x) { return new Decimal(1000).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e30) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.5).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return hasUpgrade("ta", 19) },
            canAfford() { return player.d.dicePoints.gte(this.cost()) },
            title() {
                return "Dice-NIP Synergy"
            },
            display() {
                return "which are multiplying NIP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy(mult) {
                let base = new Decimal(1e30)
                let growth = 1000
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        52: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e20) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.5).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return hasUpgrade("ta", 19) },
            canAfford() { return player.rf.rocketFuel.gte(this.cost()) },
            title() {
                return "Rocket Fuel-NIP Synergy"
            },
            display() {
                return "which are multiplying NIP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Rocket Fuel"
            },
            buy(mult) {
                let base = new Decimal(1e20)
                let growth = 100
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.rf.rocketFuel = player.rf.rocketFuel.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.rf.rocketFuel, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.rf.rocketFuel = player.rf.rocketFuel.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        53: {
            cost(x) { return new Decimal(1e5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e40) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.5).add(1).pow(buyableEffect("cs", 31)) },
            unlocked() { return hasUpgrade("ta", 19) },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return "Hex-NIP Synergy"
            },
            display() {
                return "which are multiplying NIP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy(mult) {
                let base = new Decimal(1e40)
                let growth = 1e5
                if (mult != true && !hasUpgrade("bi", 104))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 104)) player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 104)) player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Dimension Power": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [
                        ["style-column", [
                            ["raw-html", function () { return "1st Dimensional Power (" + format(buyableEffect("ta", 11)) + "x): " + format(player.ta.dimensionPower[0]) + " (+" + format(player.ta.dimensionPowerPerSecond[0]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["raw-html", function () { return "Boosts antimatter by x" + format(player.ta.dimensionPowerEffects[0])}, { color: "white", fontSize: "16px", fontFamily: "monospace" }]
                        ], {width: "800px"}],
                        ["buyable", 11]]],
                    ["row", [
                        ["style-column", [
                            ["raw-html", function () { return "2nd Dimensional Power (" + format(buyableEffect("ta", 12)) + "x): " + format(player.ta.dimensionPower[1]) + " (+" + format(player.ta.dimensionPowerPerSecond[1]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["raw-html", function () { return "Boosts 1st dimensions by x" + format(player.ta.dimensionPowerEffects[1])}, { color: "white", fontSize: "16px", fontFamily: "monospace" }]
                        ], {width: "800px"}],
                        ["buyable", 12]]],
                    ["row", [
                        ["style-column", [
                            ["raw-html", function () { return "3rd Dimensional Power (" + format(buyableEffect("ta", 13)) + "x): " + format(player.ta.dimensionPower[2]) + " (+" + format(player.ta.dimensionPowerPerSecond[2]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["raw-html", function () { return "Boosts 2nd dimensions by x" + format(player.ta.dimensionPowerEffects[2])}, { color: "white", fontSize: "16px", fontFamily: "monospace" }]
                        ], {width: "800px"}],
                        ["buyable", 13]]],
                    ["row", [
                        ["style-column", [
                            ["raw-html", function () { return "4th Dimensional Power (" + format(buyableEffect("ta", 14)) + "x): " + format(player.ta.dimensionPower[3]) + " (+" + format(player.ta.dimensionPowerPerSecond[3]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["raw-html", function () { return "Boosts 3rd dimensions by x" + format(player.ta.dimensionPowerEffects[3])}, { color: "white", fontSize: "16px", fontFamily: "monospace" }]
                        ], {width: "800px"}],
                        ["buyable", 14]]],
                    ["row", [
                        ["style-column", [
                            ["raw-html", function () { return "5th Dimensional Power (" + format(buyableEffect("ta", 15)) + "x): " + format(player.ta.dimensionPower[4]) + " (+" + format(player.ta.dimensionPowerPerSecond[4]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["raw-html", function () { return "Boosts 4th dimensions by x" + format(player.ta.dimensionPowerEffects[4])}, { color: "white", fontSize: "16px", fontFamily: "monospace" }]
                        ], {width: "800px"}],
                        ["buyable", 15]]],
                    ["row", [
                        ["style-column", [
                            ["raw-html", function () { return "6th Dimensional Power (" + format(buyableEffect("ta", 16)) + "x): " + format(player.ta.dimensionPower[5]) + " (+" + format(player.ta.dimensionPowerPerSecond[5]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["raw-html", function () { return "Boosts 5th dimensions by x" + format(player.ta.dimensionPowerEffects[5])}, { color: "white", fontSize: "16px", fontFamily: "monospace" }]
                        ], {width: "800px"}],
                        ["buyable", 16]]],
                    ["row", [
                        ["style-column", [
                            ["raw-html", function () { return "7th Dimensional Power (" + format(buyableEffect("ta", 17)) + "x): " + format(player.ta.dimensionPower[6]) + " (+" + format(player.ta.dimensionPowerPerSecond[6]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["raw-html", function () { return "Boosts 6th dimensions by x" + format(player.ta.dimensionPowerEffects[6])}, { color: "white", fontSize: "16px", fontFamily: "monospace" }]
                        ], {width: "800px"}],
                        ["buyable", 17]]],
                    ["row", [
                        ["style-column", [
                            ["raw-html", function () { return "8th Dimensional Power (" + format(buyableEffect("ta", 18)) + "x): " + format(player.ta.dimensionPower[7]) + " (+" + format(player.ta.dimensionPowerPerSecond[7]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["raw-html", function () { return "Boosts 7th dimensions by x" + format(player.ta.dimensionPowerEffects[7])}, { color: "white", fontSize: "16px", fontFamily: "monospace" }]
                        ], {width: "800px"}],
                        ["buyable", 18]]],
                ]
            },
            "Automation": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["microtabs", "auto", { 'border-width': '0px' }],
                ]

            },
            "Buyables and Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 33], ["ex-buyable", 34], ["ex-buyable", 35]]],
                    ["row", [["ex-buyable", 36], ["ex-buyable", 37]]],
                ]

            },
            "OTF Synergizer": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("ta", 17) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.d.dicePoints) + "</h3> dice points. (highest: "  + format(player.ta.highestDicePoints) + ")" }, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.rf.rocketFuel) + "</h3> rocket fuel. (highest: "  + format(player.ta.highestRocketFuel) + ")"}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                    ["raw-html", function () { return player.po.hex ? "You have <h3>" + format(player.h.hexPoints[0]) + "</h3> hex 1 points. (highest: " + format(player.ta.highestHex1Points) + ")" :""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                    ["raw-html", function () { return !player.po.hex ? "You have <h3><s>" + format(player.h.hexPoints[0]) + "</s></h3> hex 1 points. (highest: " + format(player.ta.highestHex1Points) + ")" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Highest values get updated on infinity resets." }, { color: "white", fontSize: "16px", fontFamily: "monospace" }],
                    ["raw-html", function () { return "Tip: Use the halter for OTF progression." }, { color: "white", fontSize: "16px", fontFamily: "monospace" }],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 41], ["ex-buyable", 42], ["ex-buyable", 43], ["ex-buyable", 51]]],
                    ["row", [["ex-buyable", 44], ["ex-buyable", 45], ["ex-buyable", 46], ["ex-buyable", 52]]],
                    ["row", [["ex-buyable", 47], ["ex-buyable", 48], ["ex-buyable", 49], ["ex-buyable", 53]]],
                    ["blank", "25px"],
                ]
            },
            "RESET": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return getLevelableAmount("pet", 1101).gte(1) },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 15]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 16], ["clickable", 17]]],

                ]
            },
        },
        auto: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h4>You need at least 1 of the buyable to start autobuying." }, { color: "white", fontSize: "16px", fontFamily: "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 21], ["clickable", 101], ["clickable", 102], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[0].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[0].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 22], ["clickable", 103], ["clickable", 104], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[1].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[1].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 23], ["clickable", 105], ["clickable", 106], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[2].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[2].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 24], ["clickable", 107], ["clickable", 108], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[3].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[3].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 25], ["clickable", 109], ["clickable", 110], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[4].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[4].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 26], ["clickable", 111], ["clickable", 112], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[5].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[5].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 27], ["clickable", 113], ["clickable", 114], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[6].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[6].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 28], ["clickable", 115], ["clickable", 116], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[7].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[7].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 29], ["clickable", 117], ["clickable", 118], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[8].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[8].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 31], ["clickable", 119], ["clickable", 120], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[9].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[9].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                    ["row", [["buyable", 32], ["clickable", 121], ["clickable", 122], 
                        ["style-row", [
                            ["raw-html", function () { return player.ta.dimensionAutobuyTimer[10].toStringWithDecimalPlaces(2) + "s/" + player.ta.dimensionAutobuyTimeReq[10].toStringWithDecimalPlaces(2) + "s" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "200px"}],
                    ]],
                ]
            },
            "Control Panel": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("ta", 14) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>Dimboost Autobuy limit: " + formatWhole(player.ta.dimboostLimit) + "." }],
                    ["text-input", "dimboostLimitInput", {
                        color: "var(--color)",
                        width: "400px",
                        fontFamily: "Calibri",
                        "text-align": "left",
                        fontSize: "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>Only Dimboost to unlock new Dimensions until Galaxy Autobuy Limit" }],
                    ["row", [["clickable", 18], ["clickable", 19]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>Galaxy Autobuy limit: " + formatWhole(player.ta.galaxyLimit) + "." }],
                    ["text-input", "galaxyLimitInput", {
                        color: "var(--color)",
                        width: "400px",
                        fontFamily: "Calibri",
                        "text-align": "left",
                        fontSize: "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter." }, { color: "white", fontSize: "16px", fontFamily: "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { color: "white", fontSize: "12px", fontFamily: "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
        ["raw-html", function () { return "You will gain <h3>" + format(player.ta.negativeInfinityPointsToGet) + "</h3> on reset." }, { color: "white", fontSize: "16px", fontFamily: "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && hasChallenge("ip", 18)}
})
addLayer("revc", {
    name: "Reverse Crunch", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        spawnedWisps: false,

        minipause: new Decimal(0)
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Ranks",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "revc" && !player.bigc.spawnedWisps)
        {
            createWisps('black', 50, 3);
            player.bigc.spawnedWisps = true
        } else if (player.tab != "revc")
        {
            removeWisps();
        }

        player.revc.minipause = player.revc.minipause.sub(1)
        if (player.revc.minipause.gt(0))
        {
            layers.revc.reverseCrunch();
        }
    },
    branches: ["branch"],
    clickables: {
        11: {
            title() { return "<h2>REVERSE CRUNCH" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)
                if (options.newMenu) {
                    player.tab = "ip"
                } else {
                    player.tab = "in"
                }
                player.revc.minipause = new Decimal(3)
             },
            style: { width: '300px', "min-height": '120px' },
        },
    },
    reverseCrunch(){
        player.ta.reachedNegativeInfinity = false
        player.ta.negativeInfinityPause = new Decimal(5)
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    tabFormat: [
        ["raw-html", function () { return "<h2>1e308 antimatter- amazing." }, { color: "black", fontSize: "16px", fontFamily: "monospace" }],
        ["blank", "150px"],
        ["row", [["clickable", 11]]],
    ],
    layerShown() { return (player.startedGame == true && hasChallenge("ip", 18)) || hasMilestone("s", 19)}
})
window.addEventListener('load', function() {
    player.bigc.spawnedWisps = false

});
