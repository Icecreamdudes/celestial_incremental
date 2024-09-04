addLayer("ad", {
    name: "Antimatter Dimensions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AD", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        antimatter: new Decimal(0),
        antimatterEffect: new Decimal(1),
        antimatterPerSecond: new Decimal(0),

        dimensionsUnlocked: [true, true, true, true, false, false, false, false],
        dimensionAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionCosts: [new Decimal(10),new Decimal(100),new Decimal(10000),new Decimal(1e6),new Decimal(1e9),new Decimal(1e13),new Decimal(1e18),new Decimal(1e24),],
        dimensionsPurchased: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionMult: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        dimensionText: ["", "", "", "", "", "", "", ""],

        tickspeedMult: new Decimal(1.1),

        //dimb
        dimBoostPause: new Decimal(0),
        dimBoostAmount: new Decimal(0),
        dimBoostReq: new Decimal(2),
        dimBoostDimCost: new Decimal(3), //index
        dimBoostEffect: new Decimal(1),
        dimBoostMult: new Decimal(2),
        dimBoostText: "",

        //galxy
        galaxyPause: new Decimal(0),
        galaxyAmount: new Decimal(0),
        galaxyReq: new Decimal(4),
        galaxyDimCost: new Decimal(7), //index
        galaxyEffect: new Decimal(1),
        galaxyBase: new Decimal(0.02),
        galaxyText: "",

        extraDimsGalaxiesLocked: true, //6 dims, 1 galaxy
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, rgba(0,255,202,1) 0%, rgba(30,181,22,1) 100%)",
            "background-origin": "border-box",
            "border-color": "#119B35",
        };
      },
    
    tooltip: "Antimatter Dimensions",
    color: "rgba(30,181,22,1)",
    update(delta) {
        let onepersec = new Decimal(1)

        if (!hasUpgrade("bi", 22)) player.ad.antimatterEffect = player.points.pow(3).plus(1).log10().pow(player.ad.antimatter.plus(1).log10().pow(0.24)).mul(player.ad.antimatter.div(player.ad.antimatter.mul(2).add(1))).add(1)
        if (hasUpgrade("bi", 22)) player.ad.antimatterEffect = player.points.pow(player.points.plus(1).log10().pow(2)).plus(1).log10().pow(player.ad.antimatter.plus(1).log10().pow(0.24)).mul(player.ad.antimatter.div(player.ad.antimatter.mul(2).add(1))).add(1)

        if (inChallenge("tad", 11)) player.ad.antimatterEffect = player.ad.antimatterEffect.pow(buyableEffect("de", 18))
        if (hasUpgrade("bi", 108)) player.ad.antimatterEffect = player.ad.antimatterEffect.pow(1.6)
        if (hasUpgrade("bi", 113)) player.ad.antimatterEffect = player.ad.antimatterEffect.pow(3)

        player.ad.dimensionText = [
            "1st dimension (" + format(player.ad.dimensionMult[0]) + "x): " + format(player.ad.dimensionAmounts[0]) + " (+" + format(player.ad.dimensionsPerSecond[0]) + "/s)",
            "2nd dimension (" + format(player.ad.dimensionMult[1]) + "x): " + format(player.ad.dimensionAmounts[1]) + " (+" + format(player.ad.dimensionsPerSecond[1]) + "/s)",
            "3rd dimension (" + format(player.ad.dimensionMult[2]) + "x): " + format(player.ad.dimensionAmounts[2]) + " (+" + format(player.ad.dimensionsPerSecond[2]) + "/s)",
            "4th dimension (" + format(player.ad.dimensionMult[3]) + "x): " + format(player.ad.dimensionAmounts[3]) + " (+" + format(player.ad.dimensionsPerSecond[3]) + "/s)",
            "5th dimension (" + format(player.ad.dimensionMult[4]) + "x): " + format(player.ad.dimensionAmounts[4]) + " (+" + format(player.ad.dimensionsPerSecond[4]) + "/s)",
            "6th dimension (" + format(player.ad.dimensionMult[5]) + "x): " + format(player.ad.dimensionAmounts[5]) + " (+" + format(player.ad.dimensionsPerSecond[5]) + "/s)",
            "7th dimension (" + format(player.ad.dimensionMult[6]) + "x): " + format(player.ad.dimensionAmounts[6]) + " (+" + format(player.ad.dimensionsPerSecond[6]) + "/s)",
            "8th dimension (" + format(player.ad.dimensionMult[7]) + "x): " + format(player.ad.dimensionAmounts[7]),
        ]

        player.ad.antimatter = player.ad.antimatter.add(player.ad.antimatterPerSecond.mul(delta))

        player.ad.antimatterPerSecond = player.ad.dimensionAmounts[0].mul(player.ad.dimensionMult[0])
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("ad", 1))
        if (hasUpgrade("ad", 12)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(upgradeEffect("ad", 12))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.ad.dimBoostEffect)
        if (hasUpgrade("ip", 12)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(upgradeEffect("ip", 12))
        if (hasUpgrade("ad", 17)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(upgradeEffect("ad", 17))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("gh", 23))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("gh", 24))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.cb.commonPetEffects[5][0])
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.ta.dimensionPowerEffects[0])
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("ip", 14))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("ta", 36))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("bi", 13))
        if (inChallenge("tad", 11)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.pow(0.55)
        if (inChallenge("tad", 11)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("de", 12))
        if (inChallenge("tad", 11)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("de", 18))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("tad", 13))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.om.hexMasteryPointsEffect)
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("om", 15))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("gh", 35))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("gh", 37))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.id.infinityPowerEffect)
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.h.ragePowerEffect)

        if (player.ad.antimatter.gt(1e300) && player.ad.extraDimsGalaxiesLocked) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.pow(0.1)
        if (player.ad.antimatter.gt(1e300) && !player.ad.extraDimsGalaxiesLocked && !hasUpgrade("bi", 21)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.pow(Decimal.div(1, Decimal.div(player.ad.antimatter.log10(), 310)))
        if (player.ad.antimatter.gt(1e300) && !player.ad.extraDimsGalaxiesLocked && hasUpgrade("bi", 21)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.pow(Decimal.div(1, Decimal.div(player.ad.antimatter.log10(), 355)))

        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("ta", 37))
        if (hasUpgrade("ip", 43)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(upgradeEffect("ip", 43))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("rm", 31))

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
        {
            player.ad.dimensionAmounts[i] = player.ad.dimensionAmounts[i].add(player.ad.dimensionsPerSecond[i].mul(delta))
            player.ad.dimensionMult[i] = Decimal.pow(2, player.ad.dimensionsPurchased[i])
        }
        for (let i = 0; i < player.ad.dimensionAmounts.length-1; i++)
        {
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionAmounts[i+1].mul(player.ad.dimensionMult[i+1].div(10))

            //mults
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("ad", 1))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.ad.dimBoostEffect)
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("gh", 23))
            if (hasUpgrade("ad", 17)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(upgradeEffect("ad", 17))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.cb.rarePetEffects[4][0])
            if (player.ad.antimatter.gt(1e300) && player.ad.extraDimsGalaxiesLocked) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].pow(0.1)
            if (player.ad.antimatter.gt(1e300) && !player.ad.extraDimsGalaxiesLocked && !hasUpgrade("bi", 21)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].pow(0.96)
            if (player.ad.antimatter.gt(1e300) && !player.ad.extraDimsGalaxiesLocked && hasUpgrade("bi", 21)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].pow(0.975)
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.ta.dimensionPowerEffects[i])
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("ip", 14))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("ta", 36))
            if (hasUpgrade("ip", 43)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(upgradeEffect("ip", 43))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("bi", 13))
            if (inChallenge("tad", 11)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].pow(0.55)
            if (inChallenge("tad", 11)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("de", 12))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("tad", 13))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.om.hexMasteryPointsEffect)
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("gh", 37))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.id.infinityPowerEffect)
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.h.ragePowerEffect)
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("rm", 31))
        }
        player.ad.dimensionsPerSecond[0] = player.ad.dimensionsPerSecond[0].mul(player.cb.uncommonPetEffects[5][0])
        player.ad.dimensionsPerSecond[1] = player.ad.dimensionsPerSecond[1].mul(player.cb.uncommonPetEffects[6][0])
        player.ad.dimensionsPerSecond[2] = player.ad.dimensionsPerSecond[2].mul(player.cb.uncommonPetEffects[5][1])
        player.ad.dimensionsPerSecond[3] = player.ad.dimensionsPerSecond[3].mul(player.cb.uncommonPetEffects[6][1])
        player.ad.dimensionsPerSecond[4] = player.ad.dimensionsPerSecond[4].mul(player.cb.uncommonPetEffects[5][2])
        player.ad.dimensionsPerSecond[5] = player.ad.dimensionsPerSecond[5].mul(player.cb.uncommonPetEffects[6][2])

        if (hasUpgrade("ip", 13)) player.ad.dimensionsPerSecond[6] = player.ad.dimensionsPerSecond[6].mul(upgradeEffect("ip", 13))
        player.ad.dimensionsPerSecond[6] = player.ad.dimensionsPerSecond[6].mul(player.cb.commonPetEffects[5][1])
        
        player.ad.dimensionCosts = [new Decimal(10),new Decimal(100),new Decimal(10000),new Decimal(1e6),new Decimal(1e9),new Decimal(1e13),new Decimal(1e18),new Decimal(1e24),]

        player.ad.dimensionCosts[0] = player.ad.dimensionCosts[0].mul(Decimal.pow(1e3, player.ad.dimensionsPurchased[0]))
        player.ad.dimensionCosts[1] = player.ad.dimensionCosts[1].mul(Decimal.pow(1e4, player.ad.dimensionsPurchased[1]))
        player.ad.dimensionCosts[2] = player.ad.dimensionCosts[2].mul(Decimal.pow(1e5, player.ad.dimensionsPurchased[2]))
        player.ad.dimensionCosts[3] = player.ad.dimensionCosts[3].mul(Decimal.pow(1e6, player.ad.dimensionsPurchased[3]))
        player.ad.dimensionCosts[4] = player.ad.dimensionCosts[4].mul(Decimal.pow(1e8, player.ad.dimensionsPurchased[4]))
        player.ad.dimensionCosts[5] = player.ad.dimensionCosts[5].mul(Decimal.pow(1e10, player.ad.dimensionsPurchased[5]))
        player.ad.dimensionCosts[6] = player.ad.dimensionCosts[6].mul(Decimal.pow(1e12, player.ad.dimensionsPurchased[6]))
        player.ad.dimensionCosts[7] = player.ad.dimensionCosts[7].mul(Decimal.pow(1e15, player.ad.dimensionsPurchased[7]))

        if (player.ad.dimBoostAmount.gte(1)) player.ad.dimensionsUnlocked[4] = true
        if (player.ad.dimBoostAmount.gte(2)) player.ad.dimensionsUnlocked[5] = true
        if (player.ad.dimBoostAmount.gte(3)) player.ad.dimensionsUnlocked[6] = true
        if (player.ad.dimBoostAmount.gte(4)) player.ad.dimensionsUnlocked[7] = true

        //tickspeed
        player.ad.tickspeedMult = new Decimal(1.125)
        player.ad.tickspeedMult = player.ad.tickspeedMult.add(player.ad.galaxyEffect)
        player.ad.tickspeedMult = player.ad.tickspeedMult.add(buyableEffect("ca", 22))
        //dimboost

        if (player.ad.dimBoostAmount.gt(4)) 
        {
            player.ad.dimBoostReq = player.ad.dimBoostAmount.sub(4).mul(2).add(2)
        } else
        {
            player.ad.dimBoostReq = new Decimal(2)
        }
        if (player.ad.dimBoostAmount.lte(4)) 
        {
        player.ad.dimBoostDimCost = player.ad.dimBoostAmount.add(3)
        } else
        {
            player.ad.dimBoostDimCost = new Decimal(7)
        }

        player.ad.dimBoostMult = new Decimal(2)
        player.ad.dimBoostMult = player.ad.dimBoostMult.mul(buyableEffect("ca", 21))
        player.ad.dimBoostEffect = Decimal.pow(player.ad.dimBoostMult, player.ad.dimBoostAmount)

        if (player.ad.dimBoostDimCost.eq(3)) player.ad.dimBoostText = "Req: " + player.ad.dimBoostReq + " 4th dimensions."
        if (player.ad.dimBoostDimCost.eq(4)) player.ad.dimBoostText = "Req: " + player.ad.dimBoostReq + " 5th dimensions."
        if (player.ad.dimBoostDimCost.eq(5)) player.ad.dimBoostText = "Req: " + player.ad.dimBoostReq + " 6th dimensions."
        if (player.ad.dimBoostDimCost.eq(6)) player.ad.dimBoostText = "Req: " + player.ad.dimBoostReq + " 7th dimensions."
        if (player.ad.dimBoostDimCost.eq(7)) player.ad.dimBoostText = "Req: " + player.ad.dimBoostReq + " 8th dimensions."

        if (player.ad.dimBoostPause.gt(0))
        {
            if (!hasUpgrade("bi", 112)) layers.ad.dimBoostReset()
        }
        player.ad.dimBoostPause = player.ad.dimBoostPause.sub(1)

        //galaxy

        player.ad.galaxyDimCost = new Decimal(7)
        player.ad.galaxyReq = player.ad.galaxyAmount.add(1).mul(4)

        player.ad.galaxyBase = new Decimal(0.01)
        player.ad.galaxyBase = player.ad.galaxyBase.mul(player.ca.galaxyDustEffect)
        player.ad.galaxyEffect = player.ad.galaxyBase.mul(player.ad.galaxyAmount.add(player.ca.replicantiGalaxies))

        player.ad.galaxyText = "Req: " + player.ad.galaxyReq + " 8th dimensions."

        if (player.ad.galaxyPause.gt(0))
        {
            if (!hasUpgrade("bi", 112)) layers.ad.galaxyReset()
        }
        player.ad.galaxyPause = player.ad.galaxyPause.sub(1)


        if (!hasChallenge("ip", 18)) player.ad.extraDimsGalaxiesLocked = true
        if (hasChallenge("ip", 18)) player.ad.extraDimsGalaxiesLocked = false
    },
    branches: [""],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
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
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "<h3>" + formatWhole(player.ad.dimBoostAmount) + " Dimension Boosts<br><h3>" + player.ad.dimBoostText + " <br>x" + format(player.ad.dimBoostEffect) + " to dimensions." },
            canClick() { return player.ad.extraDimsGalaxiesLocked ? player.ad.dimensionAmounts[player.ad.dimBoostDimCost].gte(player.ad.dimBoostReq) && (player.ad.dimBoostAmount.lt(6)) : player.ad.dimensionAmounts[player.ad.dimBoostDimCost].gte(player.ad.dimBoostReq)},
            unlocked() { return true },
            onClick() {
                player.ad.dimBoostAmount = player.ad.dimBoostAmount.add(1)
                if (!hasUpgrade("bi", 25)) player.ad.dimBoostPause = new Decimal(6)
            },
            style: { width: '300px', "min-height": '75px' },
        },
        12: {
            title() { return "<h3>" + formatWhole(player.ad.galaxyAmount) + " Antimatter Galaxies<br><h3>" + player.ad.galaxyText + " +" + format(player.ad.galaxyEffect) + " to tickspeed base." },
            canClick() { return  player.ad.extraDimsGalaxiesLocked ? player.ad.dimensionAmounts[player.ad.galaxyDimCost].gte(player.ad.galaxyReq) && (player.ad.galaxyAmount.lt(1)) : player.ad.dimensionAmounts[player.ad.galaxyDimCost].gte(player.ad.galaxyReq)},
            unlocked() { return true },
            onClick() {
                player.ad.galaxyAmount = player.ad.galaxyAmount.add(1)
                if (!hasUpgrade("bi", 25)) player.ad.galaxyPause = new Decimal(6)
            },
            style: { width: '300px', "min-height": '75px' },
        },
        13: {
            title() { return "<h1>REVERSE BREAK INFINITY" },
            canClick() { return true },
            unlocked() { return !player.ta.unlockedReverseBreak },
            onClick() {
                player.ta.unlockedReverseBreak = true
            },
            style: { width: '400px', "min-height": '160px' },
        },
        14: {
            title() { return "<h1>REVERSE FIX INFINITY" },
            canClick() { return true },
            unlocked() { return player.ta.unlockedReverseBreak },
            onClick() {
                player.ta.unlockedReverseBreak = false
            },
            style: { width: '400px', "min-height": '160px' },
        },
        15: {
            title() { return "<h2>REVERSE CRUNCH" },
            canClick() { return player.ad.antimatter.gte('1e308') },
            unlocked() { return true },
            onClick() {
                layers.revc.reverseCrunch()
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)
            },
            style: { width: '300px', "min-height": '120px' },
        },
    },
    dimBoostReset()
    {
        player.ad.antimatter = new Decimal(10)

        player.ad.buyables[1] = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
        {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.dimensionsPurchased[i] = new Decimal(0)
        }
        
    },
    galaxyReset()
    {
        player.ad.antimatter = new Decimal(10)

        player.ad.buyables[1] = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
        {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.dimensionsPurchased[i] = new Decimal(0)
        }

        player.ad.dimensionsUnlocked[4] = false
        player.ad.dimensionsUnlocked[5] = false
        player.ad.dimensionsUnlocked[6] = false
        player.ad.dimensionsUnlocked[7] = false
        
        player.ad.dimBoostAmount = new Decimal(0)
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "AD Upgrade I",
            unlocked() { return true },
            description: "Gives you 10 antimatter. Spend it wisely.",
            cost: new Decimal(0),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            onPurchase()
            {
                player.ad.antimatter = new Decimal(10)
            }
        }, 
        12:
        {
            title: "AD Upgrade II",
            unlocked() { return true },
            description: "Antimatter boosts itself.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        13:
        {
            title: "AD Upgrade III",
            unlocked() { return true },
            description: "Unlocks the portal.",
            cost: new Decimal(1e25),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
        },
        14:
        {
            title: "AD Upgrade IV",
            unlocked() { return player.in.infinities.gte(2) },
            description: "Boosts grass based on antimatter.",
            cost: new Decimal(1e34),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.3).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        15:
        {
            title: "AD Upgrade V",
            unlocked() { return player.in.infinities.gte(2) },
            description: "Boosts trees and leaves based on antimatter.",
            cost: new Decimal(1e40),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.35).div(4).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        16:
        {
            title: "AD Upgrade VI",
            unlocked() { return player.in.infinities.gte(2) },
            description: "Boosts grasshoppers and fertilizer based on antimatter.",
            cost: new Decimal(1e50),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.25).div(8).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        17:
        {
            title: "AD Upgrade VII",
            unlocked() { return player.in.infinities.gte(3) },
            description: "Infinities boost antimatter dimensions.",
            cost: new Decimal(1e64),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.in.infinities.pow(0.2).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        18:
        {
            title: "AD Upgrade VIII",
            unlocked() { return player.in.infinities.gte(3) },
            description: "Boosts mods and lines of code based on antimatter.",
            cost: new Decimal(1e78),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.15).div(12).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        19:
        {
            title: "AD Upgrade IX",
            unlocked() { return player.in.infinities.gte(3) },
            description: "Increase factor effect base based on antimatter.",
            cost: new Decimal(1e92),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().div(2500)
            },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        21:
        {
            title: "AD Upgrade X",
            unlocked() { return player.in.infinities.gte(3) },
            description: "Boosts code experience based on antimatter.",
            cost: new Decimal(1e110),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.1).div(20).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
    },
    buyables: {
        1: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return new Decimal.pow(player.ad.tickspeedMult, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            canAfford() { return player.ad.antimatter.gte(this.cost()) },
            title() {
                return format(buyableEffect("ad", 1)) + "x to dimensions (x" + format(player.ad.tickspeedMult, 3) + ".)<br/>Tickspeed Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM."
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 10
                if (player.buyMax == false && !hasUpgrade("bi", 105))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ad.antimatter, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '400px', height: '50px', }
        },
        11: {
            cost(x) { return player.ad.dimensionCosts[0] },
            unlocked() { return player.ad.dimensionsUnlocked[0] },
            canAfford() { return player.ad.antimatter.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1e3
                if (player.buyMax == false && !hasUpgrade("bi", 105))
                {
                    let buyonecost = new Decimal(growth).pow(player.ad.dimensionsPurchased[0]).mul(base)
                    if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(buyonecost)
                    player.ad.dimensionsPurchased[0] = player.ad.dimensionsPurchased[0].add(1)
                    player.ad.dimensionAmounts[0] = player.ad.dimensionAmounts[0].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ad.antimatter, base, growth, player.ad.dimensionsPurchased[0])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.ad.dimensionsPurchased[0])
                if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(cost)

                player.ad.dimensionsPurchased[0] = player.ad.dimensionsPurchased[0].add(max)
                player.ad.dimensionAmounts[0] = player.ad.dimensionAmounts[0].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        12: {
            cost(x) { return player.ad.dimensionCosts[1] },
            unlocked() { return player.ad.dimensionsUnlocked[1] },
            canAfford() { return player.ad.antimatter.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 1e4
                if (player.buyMax == false && !hasUpgrade("bi", 105))
                {
                    let buyonecost = new Decimal(growth).pow(player.ad.dimensionsPurchased[1]).mul(base)
                    if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(buyonecost)
                    player.ad.dimensionsPurchased[1] = player.ad.dimensionsPurchased[1].add(1)
                    player.ad.dimensionAmounts[1] = player.ad.dimensionAmounts[1].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ad.antimatter, base, growth, player.ad.dimensionsPurchased[1])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.ad.dimensionsPurchased[1])
                if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(cost)

                player.ad.dimensionsPurchased[1] = player.ad.dimensionsPurchased[1].add(max)
                player.ad.dimensionAmounts[1] = player.ad.dimensionAmounts[1].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        13: {
            cost(x) { return player.ad.dimensionCosts[2] },
            unlocked() { return player.ad.dimensionsUnlocked[2] },
            canAfford() { return player.ad.antimatter.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                let base = new Decimal(1e4)
                let growth = 1e5
                if (player.buyMax == false && !hasUpgrade("bi", 105))
                {
                    let buyonecost = new Decimal(growth).pow(player.ad.dimensionsPurchased[2]).mul(base)
                    if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(buyonecost)
                    player.ad.dimensionsPurchased[2] = player.ad.dimensionsPurchased[2].add(1)
                    player.ad.dimensionAmounts[2] = player.ad.dimensionAmounts[2].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ad.antimatter, base, growth, player.ad.dimensionsPurchased[2])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.ad.dimensionsPurchased[2])
                if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(cost)

                player.ad.dimensionsPurchased[2] = player.ad.dimensionsPurchased[2].add(max)
                player.ad.dimensionAmounts[2] = player.ad.dimensionAmounts[2].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        14: {
            cost(x) { return player.ad.dimensionCosts[3] },
            unlocked() { return player.ad.dimensionsUnlocked[3] },
            canAfford() { return player.ad.antimatter.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                let base = new Decimal(1e6)
                let growth = 1e6
                if (player.buyMax == false && !hasUpgrade("bi", 105))
                {
                    let buyonecost = new Decimal(growth).pow(player.ad.dimensionsPurchased[3]).mul(base)
                    if (!hasUpgrade("bi", 105))  player.ad.antimatter = player.ad.antimatter.sub(buyonecost)
                    player.ad.dimensionsPurchased[3] = player.ad.dimensionsPurchased[3].add(1)
                    player.ad.dimensionAmounts[3] = player.ad.dimensionAmounts[3].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ad.antimatter, base, growth, player.ad.dimensionsPurchased[3])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.ad.dimensionsPurchased[3])
                if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(cost)

                player.ad.dimensionsPurchased[3] = player.ad.dimensionsPurchased[3].add(max)
                player.ad.dimensionAmounts[3] = player.ad.dimensionAmounts[3].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        15: {
            cost(x) { return player.ad.dimensionCosts[4] },
            unlocked() { return player.ad.dimensionsUnlocked[4] },
            canAfford() { return player.ad.antimatter.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                let base = new Decimal(1e9)
                let growth = 1e8
                if (player.buyMax == false && !hasUpgrade("bi", 105))
                {
                    let buyonecost = new Decimal(growth).pow(player.ad.dimensionsPurchased[4]).mul(base)
                    if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(buyonecost)
                    player.ad.dimensionsPurchased[4] = player.ad.dimensionsPurchased[4].add(1)
                    player.ad.dimensionAmounts[4] = player.ad.dimensionAmounts[4].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ad.antimatter, base, growth, player.ad.dimensionsPurchased[4])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.ad.dimensionsPurchased[4])
                if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(cost)

                player.ad.dimensionsPurchased[4] = player.ad.dimensionsPurchased[4].add(max)
                player.ad.dimensionAmounts[4] = player.ad.dimensionAmounts[4].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        16: {
            cost(x) { return player.ad.dimensionCosts[5] },
            unlocked() { return player.ad.dimensionsUnlocked[5] },
            canAfford() { return player.ad.antimatter.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                let base = new Decimal(1e13)
                let growth = 1e10
                if (player.buyMax == false && !hasUpgrade("bi", 105))
                {
                    let buyonecost = new Decimal(growth).pow(player.ad.dimensionsPurchased[5]).mul(base)
                    if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(buyonecost)
                    player.ad.dimensionsPurchased[5] = player.ad.dimensionsPurchased[5].add(1)
                    player.ad.dimensionAmounts[5] = player.ad.dimensionAmounts[5].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ad.antimatter, base, growth, player.ad.dimensionsPurchased[5])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.ad.dimensionsPurchased[5])
                if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(cost)

                player.ad.dimensionsPurchased[5] = player.ad.dimensionsPurchased[5].add(max)
                player.ad.dimensionAmounts[5] = player.ad.dimensionAmounts[5].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        17: {
            cost(x) { return player.ad.dimensionCosts[6] },
            unlocked() { return player.ad.dimensionsUnlocked[6] },
            canAfford() { return player.ad.antimatter.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                let base = new Decimal(1e18)
                let growth = 1e12
                if (player.buyMax == false && !hasUpgrade("bi", 105))
                {
                    let buyonecost = new Decimal(growth).pow(player.ad.dimensionsPurchased[6]).mul(base)
                    if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(buyonecost)
                    player.ad.dimensionsPurchased[6] = player.ad.dimensionsPurchased[6].add(1)
                    player.ad.dimensionAmounts[6] = player.ad.dimensionAmounts[6].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ad.antimatter, base, growth, player.ad.dimensionsPurchased[6])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.ad.dimensionsPurchased[6])
                if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(cost)

                player.ad.dimensionsPurchased[6] = player.ad.dimensionsPurchased[6].add(max)
                player.ad.dimensionAmounts[6] = player.ad.dimensionAmounts[6].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        18: {
            cost(x) { return player.ad.dimensionCosts[7] },
            unlocked() { return player.ad.dimensionsUnlocked[7] },
            canAfford() { return player.ad.antimatter.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                let base = new Decimal(1e24)
                let growth = 1e15
                if (player.buyMax == false && !hasUpgrade("bi", 105))
                {
                    let buyonecost = new Decimal(growth).pow(player.ad.dimensionsPurchased[7]).mul(base)
                    if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(buyonecost)
                    player.ad.dimensionsPurchased[7] = player.ad.dimensionsPurchased[7].add(1)
                    player.ad.dimensionAmounts[7] = player.ad.dimensionAmounts[7].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ad.antimatter, base, growth, player.ad.dimensionsPurchased[7])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.ad.dimensionsPurchased[7])
                if (!hasUpgrade("bi", 105)) player.ad.antimatter = player.ad.antimatter.sub(cost)

                player.ad.dimensionsPurchased[7] = player.ad.dimensionsPurchased[7].add(max)
                player.ad.dimensionAmounts[7] = player.ad.dimensionAmounts[7].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
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
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21]]],
                ]

            },
            "Dimensions": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["buyable", 1], ["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["raw-html", function () { return player.ad.dimensionsUnlocked[0] ? player.ad.dimensionText[0] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 11]]],
                    ["row", [["raw-html", function () { return player.ad.dimensionsUnlocked[1] ? player.ad.dimensionText[1] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 12]]],
                    ["row", [["raw-html", function () { return player.ad.dimensionsUnlocked[2] ? player.ad.dimensionText[2] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 13]]],
                    ["row", [["raw-html", function () { return player.ad.dimensionsUnlocked[3] ? player.ad.dimensionText[3] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 14]]],
                    ["row", [["raw-html", function () { return player.ad.dimensionsUnlocked[4] ? player.ad.dimensionText[4] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 15]]],
                    ["row", [["raw-html", function () { return player.ad.dimensionsUnlocked[5] ? player.ad.dimensionText[5] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 16]]],
                    ["row", [["raw-html", function () { return player.ad.dimensionsUnlocked[6] ? player.ad.dimensionText[6] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 17]]],
                    ["row", [["raw-html", function () { return player.ad.dimensionsUnlocked[7] ? player.ad.dimensionText[7] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 18]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 12]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ad.extraDimsGalaxiesLocked ?  "You are capped at 6 dimension boosts and 1 galaxy (for now)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.ad.extraDimsGalaxiesLocked ?  "Progress gets halted at 1e300 antimatter." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return !player.ad.extraDimsGalaxiesLocked ?  "Progress gets softcapped at 1e300 antimatter." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
    ]

            },
            "Reverse Break": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.cb.evolvedLevels[3].gte(1) },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 13], ["clickable", 14]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 15]]],
         ["raw-html", function () { return "(+" + format(player.ta.negativeInfinityPointsToGet) + " NIP)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter, which boosts points by x" + format(player.ad.antimatterEffect) + " (based on points and antimatter)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("ip", 11)}
})
