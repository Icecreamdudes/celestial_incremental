addLayer("coa", {
    name: "Core Assembler", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CA", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        coreStrengthOdds: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        /*
        0 - faultly
        1 - weak
        2 - average
        3 - strong
        4 - pinnacle
        */

        coreStrengths: [new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),],
        coreFuelSources: [new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),new Decimal(-1),],
        coreOccupied: [false,false,false,false,false,false,false,false,false,false,],
        coreStrengthText: ["None", "None", "None", "None", "None", "None", "None", "None","None", "None",],
        coreFuelSourceText: ["None", "None", "None", "None", "None", "None", "None", "None","None", "None",],
        coreStrengthColor: ["","","","","","","","","","",],
        coreFuelSourceColor: ["","","","","","","","","","",],
        coreIndex: new Decimal(0),
        coreCount: new Decimal(0),

        coreInnateEffects: [[],[],[],[],[],[],[],[],[],[],],
        coreInnateEffectText: ["","","","","","","","","","",],

        nextCoreStrength: new Decimal(0),
        nextCoreFuel: new Decimal(0),
        nextCoreInnateEffects: [],
        nextCoreInnateEffectsText: "",

        nextCoreColorFuel: "",
        nextCoreColorStrength: "",
        nextCoreColorPrime: "",
        
        strengthColors: [],
        strengthBuffs: [],
        strengths: [],
        fuelColors: [],
        fuels: [],
        primeColors: [],
        primes: [],
        effectTexts: [],

        viewingStrength: new Decimal(0),
        luckLevel: new Decimal(1),

        singularityPause: new Decimal(0),

        /*
        Batch 1:
        0 - Points
        1 - Factor Power
        2 - Prestige Points

        Batch 2:
        3 - Trees
        4 - Grass

        Batch 3:
        5 - Grasshoppers
        6 - Code Experience

        Batch 4:
        7 - Dice Points
        8 - Rocket Fuel

        Batch 5:
        9 - Antimatter
        10 - Infinity Points 
        */
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(-120deg, #6b1919 0%, #000000 100%)",
            "background-origin": "border-box",
            "border-color": "#260300",
            "color": "#8c3129",
        };
    },
    tooltip: "Core Assembler",
    branches: ["cop"],
    color: "#8c3129",
    update(delta) {
        let onepersec = new Decimal(1)
        player.coa.strengthColors = [
            "#b5b5b5",
            "#ebcc6e",
            "#cf7429",
            "#cf3a29",
            "#4a1616",
        ]
        player.coa.fuelColors = [
            "#5c5c5c",
            "#83cecf",
            "#31aeb0",
            "#0B6623",
            "#119B35",
            "#19e04d",
            "#0951a6",
            "#363636",
            "#2f4f57",
            "#0FFFCA",
            "#FFBF00",
        ]
        player.coa.primeColors = [
            "#58d4ed",
            "#359edb",
            "#204db0",
            "#060d91",
            "#360c6e",
            "#30074a",
        ]

        player.coa.strengths = 
        [
            "Faulty",
            "Weak",
            "Average",
            "Strong",
            "Pinnacle",
        ]
        player.coa.fuels = 
        [
            "Point",
            "Factor Power",
            "Prestige Point",
            "Tree",
            "Grass",
            "Grasshopper",
            "Code Experience",
            "Dice Point",
            "Rocket Fuel",
            "Antimatter",
            "Infinity Point",
        ]
        player.coa.primes = 
        [
            null,
            "1st Prime",
            "2nd Prime",
            "3rd Prime",
            "4th Prime",
            "5th Prime",
        ]

        player.coa.nextCoreColorStrength = player.coa.strengthColors[player.coa.viewingStrength]
        player.coa.nextCoreColorFuel = player.coa.fuelColors[player.coa.nextCoreFuel]

        if (player.tab == "coa" && (player.subtabs["coa"]["stuff"] == "Assembly" || player.subtabs["coa"]["stuff"] == "Fuel Selection")) setCoreColors(document.getElementById("nextCore"), player.coa.nextCoreColorFuel, player.coa.nextCoreColorStrength, null); //null for now


        player.coa.strengthBuffs = 
        [
            new Decimal(1),
            new Decimal(1.1),
            new Decimal(1.2),
            new Decimal(1.3),
            new Decimal(1.4),
        ]

        player.coa.coreStrengthOdds = 
        [
            70,
            25,
            5,
            0,
            0,
        ]

        for (let i = 0; i < player.coa.coreFuelSourceText.length; i++)
        {
            player.coa.coreFuelSourceText[i] = player.coa.fuels[player.coa.coreFuelSources[i]]
            player.coa.coreStrengthText[i] = player.coa.strengths[player.coa.coreStrengths[i]]

            player.coa.coreFuelSourceColor[i] = player.coa.fuelColors[player.coa.coreFuelSources[i]]
            player.coa.coreStrengthColor[i] = player.coa.strengthColors[player.coa.coreStrengths[i]]

            player.coa.coreInnateEffects[i] = layers.coa.determineEffect(player.coa.coreFuelSources[i], player.coa.coreStrengths[i])
            player.coa.coreInnateEffectText[i] = layers.coa.determineText(player.coa.coreFuelSources[i], player.coa.coreStrengths[i])

            if ((player.tab == "coa" && (player.subtabs["coa"]["stuff"] == "Inventory")) || (player.tab == "cop" && (player.subtabs["cop"]["stuff"] == "Processor")) || (player.tab == "ra" && (player.subtabs["ra"]["stuff"] == "Main"))  || (player.tab == "ev9" && player.subtabs["ev9"]["stuff"] == "Core Sacrifice")) setCoreColors(document.getElementById("core"+i), player.coa.coreFuelSourceColor[i], player.coa.coreStrengthColor[i], null);
        }

        player.coa.nextCoreInnateEffects = layers.coa.determineEffect(player.coa.nextCoreFuel, player.coa.viewingStrength)
        player.coa.nextCoreInnateEffectsText = layers.coa.determineText(player.coa.nextCoreFuel, player.coa.viewingStrength)

        if (player.coa.singularityPause.gt(0))
        {
            layers.coa.singularityReset();
        }
        player.coa.singularityPause = player.coa.singularityPause.sub(onepersec)


        player.coa.coreCount = new Decimal(0)
        for (let i = 0; i < player.coa.coreOccupied.length; i++)
        {
            if (player.coa.coreFuelSources[i].eq(-1))
            {
                player.coa.coreOccupied[i] = false
            } else
            {
                player.coa.coreOccupied[i] = true
                player.coa.coreCount = player.coa.coreCount.add(1)
            }
        }
    },
    determineEffect(fuel, strength)
    {
        /*
        0 - Points
        1 - Factor Power
        2 - Prestige Points
        3 - Trees
        4 - Grass
        5 - Grasshoppers
        6 - Code Experience
        7 - Dice Points
        8 - Rocket Fuel
        9 - Antimatter
        10 - Infinity Points 
        */
        if (fuel == 0)
        {
            if (player.s.highestSingularityPoints.pow(0.15).div(25).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.6))
            {
                return [
                    player.points.pow(0.07).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"),
                    player.s.highestSingularityPoints.pow(0.15).div(25).add(1).pow(player.coa.strengthBuffs[strength]),
                    player.s.singularityTime.pow(0.125).add(1).pow(player.coa.strengthBuffs[strength])
                ]//points, points, replicanti points
            } else
            {
                return [             
                player.points.pow(0.07).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"),
                Decimal.add(1.6, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(250)), 
                player.s.singularityTime.pow(0.125).add(1).pow(player.coa.strengthBuffs[strength])] //points, points, replicanti points
            }
        }
        if (fuel == 1)
        {
            if (player.s.highestSingularityPoints.pow(0.15).div(30).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.6))
            {
            return [player.f.factorPower.pow(0.06).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
            player.s.highestSingularityPoints.pow(0.15).div(30).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.2).add(1).pow(player.coa.strengthBuffs[strength])] //factor power, factor power, factor base, 
            } else
            {
                return [player.f.factorPower.pow(0.06).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
                Decimal.add(1.6, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(300)), 
                player.s.singularityTime.pow(0.2).add(1).pow(player.coa.strengthBuffs[strength])] //factor power, factor power, factor base, 
            }
        }
        if (fuel == 2)
        {
            if (player.s.highestSingularityPoints.pow(0.14).div(30).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.6))
            {
            return [player.p.prestigePoints.pow(0.06).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
            player.s.highestSingularityPoints.pow(0.14).div(30).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.225).add(1).pow(player.coa.strengthBuffs[strength])] //prestige points, prestige points, crystal 
            } else
            {
                return [player.p.prestigePoints.pow(0.06).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
                Decimal.add(1.6, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(325)), 
                player.s.singularityTime.pow(0.225).add(1).pow(player.coa.strengthBuffs[strength])] //prestige points, prestige points, crystal 
            }
        }
        if (fuel == 3)
        {
            if (player.s.highestSingularityPoints.pow(0.12).div(35).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.6))
            {
            return [player.t.trees.pow(0.065).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
            player.s.highestSingularityPoints.pow(0.12).div(35).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.t.leaves.pow(0.05).add(1).pow(player.coa.strengthBuffs[strength]), player.s.singularityTime.pow(0.225).add(1).pow(player.coa.strengthBuffs[strength])] //trees, trees, leaves, repli-leaves
            } else
            {
                return [player.p.prestigePoints.pow(0.065).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
                Decimal.add(1.65, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(350)), 
                player.s.singularityTime.pow(0.225).add(1).pow(player.coa.strengthBuffs[strength])] //prestige points, prestige points, crystal 
            }
        }
        if (fuel == 4)
        {
            if (player.s.highestSingularityPoints.pow(0.09).div(35).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.5))
            {
            return [player.g.grass.pow(0.07).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
            player.s.highestSingularityPoints.pow(0.09).div(35).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.175).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.08).div(2).add(1).pow(player.coa.strengthBuffs[strength])] //grass, grass, golden grass, moonstone
            } else
            {
                return [player.g.grass.pow(0.07).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
                Decimal.add(1.5, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(300)), 
                player.s.singularityTime.pow(0.175).add(1).pow(player.coa.strengthBuffs[strength]), 
                player.s.singularityTime.pow(0.08).div(2).add(1).pow(player.coa.strengthBuffs[strength])] //grass, grass, golden grass, moonstone
            }
        }
        if (fuel == 5)
        {
            if (player.s.highestSingularityPoints.pow(0.07).div(40).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.1))
            {
            return [player.gh.grasshoppers.pow(0.05).add(1).pow(player.coa.strengthBuffs[strength]).min("1e5000"), 
            player.s.highestSingularityPoints.pow(0.07).div(40).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.highestSingularityPoints.pow(0.06).div(45).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.16).mul(10).add(1).pow(player.coa.strengthBuffs[strength])] //grasshoppers, grasshoppers, fertilizer, steel
            } else
            {
                return [player.gh.grasshoppers.pow(0.05).add(1).pow(player.coa.strengthBuffs[strength]).min("1e5000"), 
                Decimal.add(1.1, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(2400)), 
                Decimal.add(1.1, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(2800)), 
                player.s.singularityTime.pow(0.16).mul(10).add(1).pow(player.coa.strengthBuffs[strength])] //grasshoppers, grasshoppers, fertilizer, steel
            }
        }
        if (fuel == 6)
        {
            if (player.s.highestSingularityPoints.pow(0.11).div(45).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.5))
            {
            return [player.m.codeExperience.pow(0.055).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
            player.s.highestSingularityPoints.pow(0.11).div(45).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.m.mods.pow(0.05).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.3).mul(1000).add(1).pow(player.coa.strengthBuffs[strength])] //code exp, code exp, mods, lines of code
            } else
            {
                return [player.m.codeExperience.pow(0.055).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
                Decimal.add(1.5, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(1000)), 
                player.m.mods.pow(0.05).add(1).pow(player.coa.strengthBuffs[strength]), 
                player.s.singularityTime.pow(0.3).mul(1000).add(1).pow(player.coa.strengthBuffs[strength])] //code exp, code exp, mods, lines of code
            }
        }
        if (fuel == 7)
        {
            if (player.s.highestSingularityPoints.pow(0.07).div(45).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.35))
            {
            return [player.d.dicePoints.pow(0.05).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
            player.s.highestSingularityPoints.pow(0.07).div(45).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.175).add(1).pow(player.coa.strengthBuffs[strength])] //dice points, dice points, cdp
            } else
            {
                return [player.d.dicePoints.pow(0.05).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
                Decimal.add(1.35, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(2200)), 
                player.s.singularityTime.pow(0.175).add(1).pow(player.coa.strengthBuffs[strength])] //dice points, dice points, cdp
            }
        }
        if (fuel == 8)
        {
            if (player.s.highestSingularityPoints.pow(0.07).div(50).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.35))
            {
            return [player.rf.rocketFuel.pow(0.055).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
            player.s.highestSingularityPoints.pow(0.07).div(50).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.015).div(6).add(1).pow(player.coa.strengthBuffs[strength])] //rocket fuel, rocket fuel, check back button cooldown
            } else
            {
                return [player.rf.rocketFuel.pow(0.055).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
                Decimal.add(1.35, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(2500)), 
                player.s.singularityTime.pow(0.015).div(6).add(1).pow(player.coa.strengthBuffs[strength])] //rocket fuel, rocket fuel, check back button cooldown
            }
        }
        if (fuel == 9)
        {
            if (player.s.highestSingularityPoints.pow(0.04).div(25).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.3))
            {
            return [player.ad.antimatter.pow(0.075).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
            player.s.highestSingularityPoints.pow(0.04).div(25).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.01).div(10).add(1).pow(player.coa.strengthBuffs[strength])] //antimatter, antimatter dims, tickspeed base
            } else 
            {
                return [player.ad.antimatter.pow(0.075).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
                Decimal.add(1.3, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(3000)), 
                player.s.singularityTime.pow(0.01).div(10).add(1).pow(player.coa.strengthBuffs[strength])] //antimatter, antimatter dims, tickspeed base
            }
        }
        if (fuel == 10)
        {
            if (player.s.highestSingularityPoints.pow(0.06).div(50).add(1).pow(player.coa.strengthBuffs[strength]).lt(1.3))
            {
            return [player.in.infinityPoints.pow(0.06).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
            player.s.highestSingularityPoints.pow(0.06).div(50).add(1).pow(player.coa.strengthBuffs[strength]), 
            player.s.singularityTime.pow(0.1).div(4).add(1).pow(player.coa.strengthBuffs[strength])] //ip, ip, inf,
            } else
            {
                return [player.in.infinityPoints.pow(0.06).add(1).pow(player.coa.strengthBuffs[strength]).min("1e50000"), 
                Decimal.add(1.3, player.s.highestSingularityPoints.pow(player.coa.strengthBuffs[strength]).plus(1).log10().div(3000)), 
                player.s.singularityTime.pow(0.1).div(4).add(1).pow(player.coa.strengthBuffs[strength])] //ip, ip, inf,
            }
        }
    },
    determineText(fuel, strength)
    {
        /*
        0 - Points
        1 - Factor Power
        2 - Prestige Points
        3 - Trees
        4 - Grass
        5 - Grasshoppers
        6 - Code Experience
        7 - Dice Points
        8 - Rocket Fuel
        9 - Antimatter
        10 - Infinity Points 
        */
        if (fuel == 0)
        {
            return "Boosts points based on itself: x" + format(layers.coa.determineEffect(0, strength)[0]) 
            + "<br>Boosts points based on highest singularity points: ^" + format(layers.coa.determineEffect(0, strength)[1]) 
            + "<br>Boosts replicanti point multiplier based on time spent in singularity: x" + format(layers.coa.determineEffect(0, strength)[2]) 
        }
        if (fuel == 1)
        {
            return "Boosts factor power based on itself: x" + format(layers.coa.determineEffect(1, strength)[0]) 
            + "<br>Boosts factor power based on highest singularity points: ^" + format(layers.coa.determineEffect(1, strength)[1]) 
            + "<br>Boosts factor base based on time spent in singularity: x" + format(layers.coa.determineEffect(1, strength)[2]) 
        }
        if (fuel == 2)
        {
            return "Boosts prestige points based on itself: x" + format(layers.coa.determineEffect(2, strength)[0]) 
            + "<br>Boosts prestige points based on highest singularity points: ^" + format(layers.coa.determineEffect(2, strength)[1]) 
            + "<br>Boosts crystals based on time spent in singularity: x" + format(layers.coa.determineEffect(2, strength)[2]) 
        }
        if (fuel == 3)
        {
            return "Boosts trees based on itself: x" + format(layers.coa.determineEffect(3, strength)[0]) 
            + "<br>Boosts trees based on highest singularity points: ^" + format(layers.coa.determineEffect(3, strength)[1]) 
            + "<br>Boosts leaves based on itself: x" + format(layers.coa.determineEffect(3, strength)[2]) 
            + "<br>Boosts repli-leaf mult based on time spent in singularity: x" + format(layers.coa.determineEffect(3, strength)[3]) 
        }
        if (fuel == 4)
        {
            return "Boosts grass based on itself: x" + format(layers.coa.determineEffect(4, strength)[0]) 
            + "<br>Boosts grass based on highest singularity points: ^" + format(layers.coa.determineEffect(4, strength)[1]) 
            + "<br>Boosts golden grass based on time spent in singularity: x" + format(layers.coa.determineEffect(4, strength)[2]) 
            + "<br>Boosts moonstone based on time spent in singularity: x" + format(layers.coa.determineEffect(4, strength)[3]) 
        }
        if (fuel == 5)
        {
            return "Boosts grasshoppers based on itself: x" + format(layers.coa.determineEffect(5, strength)[0]) 
            + "<br>Boosts grasshoppers based on highest singularity points: ^" + format(layers.coa.determineEffect(5, strength)[1]) 
            + "<br>Boosts fertilizer based on highest singularity points: ^" + format(layers.coa.determineEffect(5, strength)[2]) 
            + "<br>Boosts steel based on time spent in singularity: x" + format(layers.coa.determineEffect(5, strength)[3]) 
        }
        if (fuel == 6)
        {
            return "Boosts code experience based on itself: x" + format(layers.coa.determineEffect(6, strength)[0]) 
            + "<br>Boosts code experience based on highest singularity points: ^" + format(layers.coa.determineEffect(6, strength)[1]) 
            + "<br>Boosts mods based on itself: x" + format(layers.coa.determineEffect(6, strength)[2]) 
            + "<br>Boosts lines of code based on time spent in singularity: x" + format(layers.coa.determineEffect(6, strength)[3]) 
        }
        if (fuel == 7)
        {
            return "Boosts dice points based on itself: x" + format(layers.coa.determineEffect(7, strength)[0]) 
            + "<br>Boosts dice points based on highest singularity points: ^" + format(layers.coa.determineEffect(7, strength)[1]) 
            + "<br>Boosts challenge dice points based on time spent in singularity: x" + format(layers.coa.determineEffect(7, strength)[2]) 
        }
        if (fuel == 8)
        {
            return "Boosts rocket fuel based on itself: x" + format(layers.coa.determineEffect(8, strength)[0]) 
            + "<br>Boosts rocket fuel based on highest singularity points: ^" + format(layers.coa.determineEffect(8, strength)[1]) 
            + "<br>Divides check back button cooldown based on time spent in singularity: /" + format(layers.coa.determineEffect(8, strength)[2]) 
        }
        if (fuel == 9)
        {
            return "Boosts antimatter based on itself: x" + format(layers.coa.determineEffect(9, strength)[0]) 
            + "<br>Boosts antimatter dimensions based on highest singularity points: ^" + format(layers.coa.determineEffect(9, strength)[1]) 
            + "<br>Boosts tickspeed based on time spent in singularity: x" + format(layers.coa.determineEffect(9, strength)[2]) 
        }
        if (fuel == 10)
        {
            return "Boosts infinity points based on itself: x" + format(layers.coa.determineEffect(10, strength)[0]) 
            + "<br>Boosts infinity points based on highest singularity points: ^" + format(layers.coa.determineEffect(10, strength)[1]) 
            + "<br>Boosts infinities based on time spent in singularity: x" + format(layers.coa.determineEffect(10, strength)[2]) 
        }
    },
    generateCoreStrength()
    {
        let random = getRandomInt(100);

        let thresholds = [
            player.coa.coreStrengthOdds[0],
            player.coa.coreStrengthOdds[0] + player.coa.coreStrengthOdds[1],
            player.coa.coreStrengthOdds[0] + player.coa.coreStrengthOdds[1] + player.coa.coreStrengthOdds[2],
            player.coa.coreStrengthOdds[0] + player.coa.coreStrengthOdds[1] + player.coa.coreStrengthOdds[2] + player.coa.coreStrengthOdds[3],
            100 // cumulative odds should add up to 100
        ];
        
        if (random < thresholds[0]) {
            return new Decimal(0);
        } else if (random < thresholds[1]) {
            return new Decimal(1);
        } else if (random < thresholds[2]) {
            return new Decimal(2);
        } else if (random < thresholds[3]) {
            return new Decimal(3);
        } else {
            return new Decimal(4);
        }
    },
    generateCore()
    {
        //MAKE CODE
        if (player.coa.coreCount.lt(10))
        {
            for (let i = 0; i < player.coa.coreOccupied.length; i++)
            {
                if (player.coa.coreOccupied[i] == false)
                {
                    player.coa.coreOccupied[i] = true
                    player.coa.coreFuelSources[i] = player.coa.nextCoreFuel

                    let strength = layers.coa.generateCoreStrength()
                    player.coa.coreStrengths[i] = strength
                    player.ra.unequippedRadiationValue[i] = strength.add(1).mul(10).add(getRandomInt(10)).mul(buyableEffect("cs", 13))
                    player.ra.unequippedRadiationOutput[i] = Decimal.mul(strength.add(1).mul(10).add(getRandomInt(10)), Decimal.mul(Decimal.add(2, Math.random()), 0.1)).mul(buyableEffect("cs", 11))

                    player.coa.coreCount = player.coa.coreCount.add(1)
                    break;
                }
            }
        }
    },
    clearCores()
    {
        for (let i = 0; i < player.coa.coreFuelSourceText.length; i++)
        {
            player.coa.coreOccupied[i] = false
            player.coa.coreFuelSources[i] = -1
            player.coa.coreStrengths[i] = -1
            player.coa.coreCount = new Decimal(0)
            
            player.ra.unequippedRadiationValue[i] = new Decimal(0)
            player.ra.unequippedRadiationOutput[i] = new Decimal(0)
        }
    },
    singularityReset()
    {
        if (!hasMilestone("s", 18)) player.tab = "i"
        if (!hasMilestone("s", 11)) player.in.unlockedBreak = false

        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)
        if (!hasUpgrade("s", 15)) player.r.pent = new Decimal(0)
        if (hasUpgrade("s", 15)) player.r.pent = new Decimal(30)

        player.f.factorUnlocks = [true, true, true, false, false, false, false, false]
        player.f.factorGain = new Decimal(1)

        player.f.factorPower = new Decimal(0)
        player.f.factorPowerEffect = new Decimal(1)
        player.f.factorPowerPerSecond = new Decimal(0)
        player.f.powerFactorUnlocks = [true, true, true, false, false, false, false, false]

        player.f.buyables[1] = new Decimal(0)
        player.f.buyables[2] = new Decimal(0)
        player.f.buyables[3] = new Decimal(0)
        player.f.buyables[4] = new Decimal(0)
        player.f.buyables[5] = new Decimal(0)
        player.f.buyables[6] = new Decimal(0)
        player.f.buyables[7] = new Decimal(0)
        player.f.buyables[8] = new Decimal(0)
        player.f.buyables[11] = new Decimal(0)
        player.f.buyables[12] = new Decimal(0)
        player.f.buyables[13] = new Decimal(0)
        player.f.buyables[14] = new Decimal(0)
        player.f.buyables[15] = new Decimal(0)
        player.f.buyables[16] = new Decimal(0)
        player.f.buyables[17] = new Decimal(0)
        player.f.buyables[18] = new Decimal(0)
        player.f.buyables[19] = new Decimal(0)
        player.f.buyables[21] = new Decimal(0)
        player.f.buyables[22] = new Decimal(0)
        player.f.buyables[23] = new Decimal(0)
        player.f.buyables[24] = new Decimal(0)
        player.f.buyables[25] = new Decimal(0)
        player.f.buyables[26] = new Decimal(0)
        player.f.buyables[27] = new Decimal(0)
        player.f.buyables[28] = new Decimal(0)
        player.f.buyables[29] = new Decimal(0)
        player.f.buyables[31] = new Decimal(0)
        player.f.buyables[32] = new Decimal(0)
        player.f.buyables[33] = new Decimal(0)
        player.f.buyables[34] = new Decimal(0)
        player.f.buyables[35] = new Decimal(0)
        player.f.buyables[36] = new Decimal(0)
        player.f.buyables[37] = new Decimal(0)
        player.f.buyables[38] = new Decimal(0)
        player.f.buyables[39] = new Decimal(0)
        player.f.buyables[41] = new Decimal(0)
        player.f.buyables[42] = new Decimal(0)
        player.f.buyables[43] = new Decimal(0)
        player.f.buyables[44] = new Decimal(0)
        player.f.buyables[45] = new Decimal(0)
        player.f.buyables[46] = new Decimal(0)
        player.f.buyables[47] = new Decimal(0)
        player.f.buyables[48] = new Decimal(0)
        player.f.buyables[49] = new Decimal(0)
        player.f.buyables[51] = new Decimal(0)
        player.f.buyables[52] = new Decimal(0)
        player.f.buyables[53] = new Decimal(0)
        player.f.buyables[54] = new Decimal(0)
        player.f.buyables[55] = new Decimal(0)
        player.f.buyables[56] = new Decimal(0)
        player.f.buyables[57] = new Decimal(0)
        player.f.buyables[58] = new Decimal(0)

        player.p.prestigePoints = new Decimal(0)

        for (let i = 0; i < player.p.upgrades.length; i++) {
            if (+player.p.upgrades[i] < 24) {
                player.p.upgrades.splice(i, 1);
                i--;
            }
        }

        player.t.buyables[11] = new Decimal(0)
        player.t.buyables[12] = new Decimal(0)
        player.t.buyables[13] = new Decimal(0)
        player.t.buyables[14] = new Decimal(0)
        player.t.buyables[15] = new Decimal(0)
        player.t.buyables[16] = new Decimal(0)
        player.t.buyables[17] = new Decimal(0)
        player.t.buyables[18] = new Decimal(0)

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        player.g.buyables[11] = new Decimal(0)
        player.g.buyables[12] = new Decimal(0)
        player.g.buyables[13] = new Decimal(0)
        player.g.buyables[14] = new Decimal(0)
        player.g.buyables[15] = new Decimal(0)
        player.g.buyables[16] = new Decimal(0)
        player.g.buyables[17] = new Decimal(0)
        player.g.buyables[18] = new Decimal(0)

        for (let i = 0; i < player.g.upgrades.length; i++) {
            if (+player.g.upgrades[i] < 23) {
                player.g.upgrades.splice(i, 1);
                i--;
            }
        }

            for (let i = 0; i < player.r.milestones.length; i++) {
                if (+player.r.milestones[i] < 20) {
                    player.r.milestones.splice(i, 1);
                    i--;
                }
            }

        player.g.grass = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        player.gh.grasshoppers = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)

        player.gh.buyables[11] = new Decimal(0)
        player.gh.buyables[12] = new Decimal(0)
        player.gh.buyables[13] = new Decimal(0)
        player.gh.buyables[14] = new Decimal(0)
        player.gh.buyables[15] = new Decimal(0)
        player.gh.buyables[16] = new Decimal(0)
        player.gh.buyables[17] = new Decimal(0)
        player.gh.buyables[18] = new Decimal(0)
        player.gh.buyables[19] = new Decimal(0)
        player.gh.buyables[21] = new Decimal(0)
        player.gh.buyables[22] = new Decimal(0)

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        player.m.buyables[11] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[14] = new Decimal(0)

        //dice
        player.d.dicePoints = new Decimal(0)
        player.d.diceRolls = [new Decimal(1)]
        player.d.dice = new Decimal(1)

        player.d.buyables[11] = new Decimal(0)
        player.d.buyables[12] = new Decimal(0)
        player.d.buyables[13] = new Decimal(0)
        player.d.buyables[14] = new Decimal(0)
        player.d.buyables[15] = new Decimal(0)

        for (let i = 0; i < 18; i++)
        {
            player.d.diceEffects[i] = new Decimal(1)
        }

        //rf
        player.rf.rocketFuel = new Decimal(0)
        for (let i = 0; i < player.rf.abilitiesUnlocked.length; i++)
        {
            player.rf.abilitiesUnlocked[i] = false
        }
        for (let i = 0; i < 4; i++)
        {
            player.rf.abilityTimers[i] = new Decimal(0)
        }

        for (let i = 0; i < player.rf.upgrades.length; i++) {
            if (+player.rf.upgrades[i] < 18) {
                player.rf.upgrades.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < player.i.upgrades.length; i++) {
            if (+player.i.upgrades[i] < 36) {
                player.i.upgrades.splice(i, 1);
                i--;
            }
        }

            player.po.dice = false
            player.po.rocketFuel = false
            player.po.hex = false
            if (!hasMilestone("s", 18)) player.po.breakInfinity = false
            if (hasMilestone("s", 18)) player.po.breakInfinity = true
            player.po.realmMods = false
            player.po.featureSlots = player.po.featureSlotsMax


        //reset antimatter stuff
            player.ad.antimatter = new Decimal(0)

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
            player.ad.galaxyAmount = new Decimal(0)

            for (let i = 0; i < player.ad.upgrades.length; i++) {
                if (+player.ad.upgrades[i] < 100) {
                    player.ad.upgrades.splice(i, 1);
                    i--;
                }
            }

        if (!hasMilestone("s", 16))
        {
            player.ta.unlockedReverseBreak = false
        }
        player.ad.buyables[1] = new Decimal(0)
        player.ad.buyables[2] = new Decimal(0)
        player.ad.buyables[3] = new Decimal(0)

        player.ad.buyables[11] = new Decimal(0)
        player.ad.buyables[12] = new Decimal(0)
        player.ad.buyables[13] = new Decimal(0)
        player.ad.buyables[14] = new Decimal(0)
        player.ad.buyables[15] = new Decimal(0)
        player.ad.buyables[16] = new Decimal(0)
        player.ad.buyables[17] = new Decimal(0)
        player.ad.buyables[18] = new Decimal(0)

        //challenge stuff
        player.pe.pests = new Decimal(0)

        player.d.challengeDicePoints = new Decimal(0)
        player.d.buyables[21] = new Decimal(0)
        player.d.buyables[22] = new Decimal(0)
        player.d.buyables[23] = new Decimal(0)
        player.d.buyables[24] = new Decimal(0)

        for (let i = 0; i < player.d.upgrades.length; i++) {
            if (+player.d.upgrades[i] < 100) {
                player.d.upgrades.splice(i, 1);
                i--;
            }
        }


        player.de.antidebuffPoints = new Decimal(0)

        //STUFF THAT GETS RESET ON SINGULARITY

        //check back
        player.cb.xp = new Decimal(0)
        player.cb.level = new Decimal(1)
        player.cb.highestLevel = new Decimal(1)
        if (!hasMilestone("s", 14)) player.cb.XPBoost = new Decimal(1)

        if (!hasMilestone("s", 15))
        {
        player.cb.buyables[11] = new Decimal(0)
        player.cb.buyables[12] = new Decimal(0)
        player.cb.buyables[13] = new Decimal(0)
        player.cb.buyables[14] = new Decimal(0)
        }

        //universe 1 such
        player.gh.steel = new Decimal(0)
        player.gh.buyables[31] = new Decimal(0)
        player.gh.buyables[32] = new Decimal(0)
        player.gh.buyables[33] = new Decimal(0)
        player.gh.buyables[34] = new Decimal(0)
        player.gh.buyables[35] = new Decimal(0)
        player.gh.buyables[36] = new Decimal(0)
        player.gh.buyables[37] = new Decimal(0)
        player.gh.buyables[38] = new Decimal(0)

        player.r.timeCubes = new Decimal(0)
        player.r.buyables[11] = new Decimal(0)
        player.r.buyables[12] = new Decimal(0)
        player.r.buyables[13] = new Decimal(0)
        player.r.buyables[14] = new Decimal(0)

        player.p.crystals = new Decimal(0)
        player.p.buyables[11] = new Decimal(0)
        player.p.buyables[12] = new Decimal(0)
        player.p.buyables[13] = new Decimal(0)
        player.p.buyables[14] = new Decimal(0)
        player.p.buyables[15] = new Decimal(0)
        player.p.buyables[16] = new Decimal(0)
        player.p.buyables[17] = new Decimal(0)
        player.p.buyables[18] = new Decimal(0)

        //hex
        for (let i = 0; i<player.h.hex; i++)
        {
            player.h.hexPoints[i] = new Decimal(0)
        }
        player.h.hexResetIndex = new Decimal(0)
        if (!hasMilestone("s", 19)) player.h.hex = new Decimal(0)
        player.h.automationTier = new Decimal(0)
        player.h.ragePower = new Decimal(0)
        player.h.hexPoints[0] = new Decimal(0)

        player.h.buyables[11] = new Decimal(0)
        player.h.buyables[12] = new Decimal(0)
        player.h.buyables[13] = new Decimal(0)
        player.h.buyables[14] = new Decimal(0)
        player.h.buyables[15] = new Decimal(0)
        player.h.buyables[16] = new Decimal(0)
        player.h.buyables[17] = new Decimal(0)
        player.h.buyables[18] = new Decimal(0)
        player.h.buyables[19] = new Decimal(0)
        player.h.buyables[21] = new Decimal(0)
        player.h.buyables[22] = new Decimal(0)
        player.h.buyables[23] = new Decimal(0)

        //realm mods
        player.rm.blankMods = new Decimal(0),

        player.rm.realmMods = [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),]
        player.rm.realmEnergy = [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),]
        player.rm.halterBoost = new Decimal(0)

        player.rm.buyables[11] = new Decimal(0)
        player.rm.buyables[12] = new Decimal(0)
        player.rm.buyables[13] = new Decimal(0)
        player.rm.buyables[14] = new Decimal(0)
        player.rm.buyables[15] = new Decimal(0)
        player.rm.buyables[16] = new Decimal(0)
        player.rm.buyables[17] = new Decimal(0)
        player.rm.buyables[18] = new Decimal(0)
        player.rm.buyables[19] = new Decimal(0)
        player.rm.buyables[21] = new Decimal(0)
        player.rm.buyables[22] = new Decimal(0)
        player.rm.buyables[23] = new Decimal(0)
        player.rm.buyables[24] = new Decimal(0)
        player.rm.buyables[25] = new Decimal(0)
        player.rm.buyables[26] = new Decimal(0)
        player.rm.buyables[27] = new Decimal(0)
        player.rm.buyables[28] = new Decimal(0)
        player.rm.buyables[29] = new Decimal(0)
        player.rm.buyables[31] = new Decimal(0)
        player.rm.buyables[32] = new Decimal(0)
        player.rm.buyables[33] = new Decimal(0)
        player.rm.buyables[34] = new Decimal(0)

        //moonstone
        player.g.moonstone = new Decimal(0)

        if (!hasMilestone("s", 14))
        {
            player.g.moonstoneLevel = new Decimal(1)
            player.g.buyables[21] = new Decimal(0)
            player.g.buyables[22] = new Decimal(0)
            player.g.buyables[23] = new Decimal(0)
            player.g.buyables[24] = new Decimal(0)
            player.g.buyables[25] = new Decimal(0)
            player.g.buyables[26] = new Decimal(0)
            player.g.buyables[27] = new Decimal(0)
            player.g.buyables[28] = new Decimal(0)
            player.g.buyables[29] = new Decimal(0)
        }

        //debuff
        player.de.buyables[11] = new Decimal(0)
        player.de.buyables[12] = new Decimal(0)
        player.de.buyables[13] = new Decimal(0)
        player.de.buyables[14] = new Decimal(0)
        player.de.buyables[15] = new Decimal(0)
        player.de.buyables[16] = new Decimal(0)
        player.de.buyables[17] = new Decimal(0)
        player.de.buyables[18] = new Decimal(0)
        for (let i = 0; i < player.de.upgrades.length; i++) {
            if (+player.de.upgrades[i] < 100) {
                player.de.upgrades.splice(i, 1);
                i--;
            }
        }
        player.de.antidebuffPoints = new Decimal(0)
        player.de.tavEssence = new Decimal(0)
        player.de.tavPoints = new Decimal(0)

        //UNI 2 STUFF?
        for (let i = 0; i < player.ip.upgrades.length; i++) {
            if (+player.ip.upgrades[i] < 100) {
                player.ip.upgrades.splice(i, 1);
                i--;
            }
        }
        if (!hasMilestone("s", 12))
        {
            for (let i = 0; i < player.ip.milestones.length; i++) {
                if (+player.ip.milestones[i] < 100) {
                    player.ip.milestones.splice(i, 1);
                    i--;
                }
            }
        }
        if (!hasMilestone("s", 15))
        {
        player.ip.challenges[11] = 0
        player.ip.challenges[12] = 0
        player.ip.challenges[13] = 0
        player.ip.challenges[14] = 0
        player.ip.challenges[15] = 0
        player.ip.challenges[16] = 0
        player.ip.challenges[17] = 0
        player.ip.challenges[18] = 0
        }
                    
        player.ip.buyables[11] = new Decimal(0)
        player.ip.buyables[12] = new Decimal(0)
        player.ip.buyables[13] = new Decimal(0)
        player.ip.buyables[14] = new Decimal(0)

        player.in.infinityPoints = new Decimal(0)
        if (!hasMilestone("s", 12)) player.in.infinities = new Decimal(0)
        if (hasMilestone("s", 12)) player.in.infinities = new Decimal(8)

        //inf dimensions
        player.id.infinityPower = new Decimal(0)
        player.id.dimensionUnlockAmount = new Decimal(0)

        player.id.buyables[11] = new Decimal(0)
        player.id.buyables[12] = new Decimal(0)
        player.id.buyables[13] = new Decimal(0)
        player.id.buyables[14] = new Decimal(0)
        player.id.buyables[15] = new Decimal(0)
        player.id.buyables[16] = new Decimal(0)
        player.id.buyables[17] = new Decimal(0)
        player.id.buyables[18] = new Decimal(0)
        player.id.buyables[22] = new Decimal(0)
        player.id.buyables[23] = new Decimal(0)
        player.id.buyables[24] = new Decimal(0)

        for (let i = 0; i < player.id.dimensionAmounts.length; i++)
        {
            player.id.dimensionAmounts[i] = new Decimal(0)
            player.id.dimensionsPurchased[i] = new Decimal(0)
        }
        
        //tav
        player.ta.negativeInfinityPoints = new Decimal(0)
        player.ta.buyables[11] = new Decimal(0)
        player.ta.buyables[12] = new Decimal(0)
        player.ta.buyables[13] = new Decimal(0)
        player.ta.buyables[14] = new Decimal(0)
        player.ta.buyables[15] = new Decimal(0)
        player.ta.buyables[16] = new Decimal(0)
        player.ta.buyables[17] = new Decimal(0)
        player.ta.buyables[18] = new Decimal(0)
        player.ta.buyables[19] = new Decimal(0)
        player.ta.buyables[33] = new Decimal(0)
        player.ta.buyables[34] = new Decimal(0)
        player.ta.buyables[35] = new Decimal(0)
        player.ta.buyables[36] = new Decimal(0)
        player.ta.buyables[37] = new Decimal(0)
        player.ta.buyables[38] = new Decimal(0)
        player.ta.buyables[39] = new Decimal(0)
        player.ta.buyables[41] = new Decimal(0)
        player.ta.buyables[42] = new Decimal(0)
        player.ta.buyables[43] = new Decimal(0)
        player.ta.buyables[44] = new Decimal(0)
        player.ta.buyables[45] = new Decimal(0)
        player.ta.buyables[46] = new Decimal(0)
        player.ta.buyables[47] = new Decimal(0)
        player.ta.buyables[48] = new Decimal(0)
        player.ta.buyables[49] = new Decimal(0)
        player.ta.buyables[51] = new Decimal(0)
        player.ta.buyables[52] = new Decimal(0)
        player.ta.buyables[53] = new Decimal(0)

        if (!hasMilestone("s", 17))
        {
        player.ta.buyables[21] = new Decimal(0)
        player.ta.buyables[22] = new Decimal(0)
        player.ta.buyables[23] = new Decimal(0)
        player.ta.buyables[24] = new Decimal(0)
        player.ta.buyables[25] = new Decimal(0)
        player.ta.buyables[26] = new Decimal(0)
        player.ta.buyables[27] = new Decimal(0)
        player.ta.buyables[28] = new Decimal(0)
        player.ta.buyables[29] = new Decimal(0)
        player.ta.buyables[31] = new Decimal(0)
        player.ta.buyables[32] = new Decimal(0)
        } else {
            player.ta.buyables[21] = new Decimal(1)
            player.ta.buyables[22] = new Decimal(1)
            player.ta.buyables[23] = new Decimal(1)
            player.ta.buyables[24] = new Decimal(1)
            player.ta.buyables[25] = new Decimal(1)
            player.ta.buyables[26] = new Decimal(1)
            player.ta.buyables[27] = new Decimal(1)
            player.ta.buyables[28] = new Decimal(1)
            player.ta.buyables[29] = new Decimal(1)
            player.ta.buyables[31] = new Decimal(1)
            player.ta.buyables[32] = new Decimal(1)
        }

        for (let i = 0; i < player.ta.dimensionPower.length; i++)
        {
            player.ta.dimensionPower[i] = new Decimal(0)
        }
        if (!hasMilestone("s", 16))
        {
        for (let i = 0; i < player.ta.dimensionAutobuyToggles.length; i++)
        {
            player.ta.dimensionAutobuyToggles[i] = false
        }
        }
        player.ta.dimBoostLimit = new Decimal(1)
        player.ta.galaxyLimit = new Decimal(1)

        player.ta.highestDicePoints = new Decimal(0)
        player.ta.highestRocketFuel = new Decimal(0)
        player.ta.highestHex1Points = new Decimal(0)
        for (let i = 0; i < player.ta.upgrades.length; i++) {
            if (+player.ta.upgrades[i] < 100) {
                player.ta.upgrades.splice(i, 1);
                i--;
            }
        }
        //otf mastery
        player.om.diceMasteryPoints = new Decimal(0)
        player.om.rocketFuelMasteryPoints = new Decimal(0)
        player.om.hexMasteryPoints = new Decimal(0)
        player.om.buyables[11] = new Decimal(0)
        player.om.buyables[12] = new Decimal(0)
        player.om.buyables[13] = new Decimal(0)
        player.om.buyables[14] = new Decimal(0)
        player.om.buyables[15] = new Decimal(0)
        player.om.buyables[16] = new Decimal(0)

        //binf
        player.bi.brokenInfinities = new Decimal(0)
        player.bi.buyables[11] = new Decimal(0)
        player.bi.buyables[12] = new Decimal(0)
        player.bi.buyables[13] = new Decimal(0)
        if (!hasMilestone("s", 18)) player.bi.IACtoggle = false
        if (!hasMilestone("s", 18)) player.bi.NACtoggle = false
        for (let i = 0; i < player.bi.upgrades.length; i++) {
            if (+player.bi.upgrades[i] < 200) {
                player.bi.upgrades.splice(i, 1);
                i--;
            }
        }


        //domain
        player.tad.currentConversion = new Decimal(0)
        player.tad.shatteredInfinities = new Decimal(0)
        player.tad.disfiguredInfinities = new Decimal(0)
        player.tad.corruptedInfinities = new Decimal(0)
        for (let i = 0; i < player.tad.upgrades.length; i++) {
            if (+player.tad.upgrades[i] < 100) {
                player.tad.upgrades.splice(i, 1);
                i--;
            }
        }
        player.tad.buyables[11] = new Decimal(0)
        player.tad.buyables[12] = new Decimal(0)
        player.tad.buyables[13] = new Decimal(0)
        player.tad.buyables[14] = new Decimal(0)
        player.tad.buyables[15] = new Decimal(0)
        player.tad.buyables[16] = new Decimal(0)
        player.tad.buyables[17] = new Decimal(0)
        player.tad.buyables[18] = new Decimal(0)
        player.tad.buyables[19] = new Decimal(0)
        player.tad.buyables[21] = new Decimal(0)
        player.tad.buyables[22] = new Decimal(0)
        player.tad.buyables[23] = new Decimal(0)

        //cant
        player.ca.replicanti = new Decimal(1)

        player.ca.galaxyDust = new Decimal(0)
        player.ca.canteCores = new Decimal(0)
        player.ca.canteEnergy = new Decimal(0)
        player.ca.replicantiGalaxies = new Decimal(0)
        player.ca.rememberanceCores = new Decimal(0)
        player.ca.defeatedCante = false
        
        player.ca.buyables[11] = new Decimal(0)
        player.ca.buyables[12] = new Decimal(0)
        player.ca.buyables[13] = new Decimal(0)
        player.ca.buyables[14] = new Decimal(0)
        player.ca.buyables[15] = new Decimal(0)
        player.ca.buyables[16] = new Decimal(0)
        player.ca.buyables[17] = new Decimal(0)
        player.ca.buyables[18] = new Decimal(0)
        player.ca.buyables[19] = new Decimal(0)
        player.ca.buyables[21] = new Decimal(0)
        player.ca.buyables[22] = new Decimal(0)
        player.ca.buyables[23] = new Decimal(0)
        player.ca.buyables[24] = new Decimal(0)


        //alt uni1
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

        player.rg.repliGrass = new Decimal(1)

        player.rg.buyables[11] = new Decimal(0)
        player.rg.buyables[12] = new Decimal(0)
        player.rg.buyables[13] = new Decimal(0)
        player.rg.buyables[14] = new Decimal(0)
        player.rg.buyables[15] = new Decimal(0)
        player.rg.buyables[16] = new Decimal(0)
        player.rg.buyables[17] = new Decimal(0)
        player.rg.buyables[18] = new Decimal(0)

        for (let i = 0; i < player.an.upgrades.length; i++) {
            if (+player.an.upgrades[i] < 100) {
                player.an.upgrades.splice(i, 1);
                i--;
            }
        }

        //grasskip
        if (!hasUpgrade("fu", 16)) player.gs.grassSkip = new Decimal(0)
        player.gs.grassSkippers = new Decimal(0)
        if (!hasMilestone("s", 12))
        {
        for (let i = 0; i < player.gs.milestones.length; i++) {
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
        
        if (!hasUpgrade("fu", 16))
        {
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

        //poll
        player.pol.pollinators = new Decimal(0)
        player.pol.pollinatorsIndex = 0

        player.pol.buyables[11] = new Decimal(0)
        player.pol.buyables[12] = new Decimal(0)
        player.pol.buyables[13] = new Decimal(0)
        player.pol.buyables[14] = new Decimal(0)
        
        for (let i = 0; i < player.pol.upgrades.length; i++) {
            if (+player.pol.upgrades[i] < 100) {
                player.pol.upgrades.splice(i, 1);
                i--;
            }
        }

        //tab management
        player.subtabs["r"]['stuff'] = 'Main'
        player.subtabs["f"]['stuff'] = 'Main'
        player.subtabs["p"]['stuff'] = 'Main'
        player.subtabs["g"]['stuff'] = 'Main'
        player.subtabs["gh"]['stuff'] = 'Main'
        player.subtabs["h"]['stuff'] = 'Main'
        player.subtabs["de"]['stuff'] = 'Antidebuff'
        player.subtabs["oi"]['stuff'] = 'Main'
        player.subtabs["id"]['stuff'] = 'Dimensions'


        //core
        if (player.cop.unprocessCoreOnReset) 
        {
            layers.cop.unprocessCore();
        }

        player.fa.charge = new Decimal(0)
        player.fa.bestCharge = new Decimal(0)
        for (let i = 0; i < player.fa.milestones.length; i++) {
            if (+player.fa.milestones[i] < 100) {
                player.fa.milestones.splice(i, 1);
                i--;
            }
        }

        player.ra.radiation = new Decimal(0)

        //sing dims
        player.sd.singularityPower = new Decimal(0)

        for (let i = 0; i < player.sd.dimensionAmounts.length; i++)
        {
            player.sd.dimensionAmounts[i] = getBuyableAmount("sd", i+11)
        }
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "s"
            },
            style: { width: '100px', "min-height": '50px',  },
        },
        2: {
            title() { return "Faulty" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.viewingStrength = new Decimal(0)
            },
            style: { width: '75px', "min-height": '75px', 'background-color': '#b5b5b5' },
        },
        3: {
            title() { return "Weak" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.viewingStrength = new Decimal(1)
            },
            style: { width: '75px', "min-height": '75px', 'background-color': '#ebcc6e' },
        },
        4: {
            title() { return "Average" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.viewingStrength = new Decimal(2)
            },
            style: { width: '75px', "min-height": '75px', 'background-color': '#cf7429' },
        },
        5: {
            title() { return "Strong" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.viewingStrength = new Decimal(3)
            },
            style: { width: '75px', "min-height": '75px', 'background-color': '#cf3a29'},
        },
        6: {
            title() { return "Pinnacle" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.viewingStrength = new Decimal(4)
            },
            style: { width: '75px', "min-height": '75px', 'background-color': '#4a1616' },
        },
        11: {
            title() { return "Points" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'background-color': '#eaf6f7' },
        },
        12: {
            title() { return "Factor Power" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'background-color': '#83cecf' },
        },
        13: {
            title() { return "Prestige Points" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'background-color': '#31aeb0' },
        },
        14: {
            title() { return "Trees" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'background-color': '#0b6623' },
        },
        15: {
            title() { return "Grass" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'background-color': '#119b35' },
        },
        16: {
            title() { return "Grasshoppers" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'background-color': '#19e04d' },
        },
        17: {
            title() { return "Code Experience" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'background-color': '#0951a6' },
        },
        18: {
            title() { return "Dice Points" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(7)
            },
            style: { width: '100px', "min-height": '100px', 'background-image': 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)' , 'border-color': '#0061ff'  },
        },
        19: {
            title() { return "Rocket Fuel" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(8)
            },
            style: { width: '100px', "min-height": '100px', 'background-image': 'linear-gradient(90deg, #21599e 0%, #87bdff 100%)' , 'border-color': '#119B35' },
        },
        21: {
            title() { return "Antimatter" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(9)
            },
            style: { width: '100px', "min-height": '100px', 'background-image': 'linear-gradient(140deg, rgba(0,255,202,1) 0%, rgba(30,181,22,1) 100%)' , 'border-color': '#119B35' },
        },
        22: {
            title() { return "Infinity Points" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.nextCoreFuel = new Decimal(10)
            },
            style: { width: '100px', "min-height": '100px', 'background-image': 'linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)' , 'border-color': '#7c5423' },
        },




        //cores
        101: {
            title() { return "<div id=core0 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 0
            },
            style: { width: '140px', "min-height": '140px' },
        },
        102: {
            title() { return "<div id=core1 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 1
            },
            style: { width: '140px', "min-height": '140px' },
        },
        103: {
            title() { return "<div id=core2 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 2
            },
            style: { width: '140px', "min-height": '140px' },
        },
        104: {
            title() { return "<div id=core3 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 3
            },
            style: { width: '140px', "min-height": '140px' },
        },
        105: {
            title() { return "<div id=core4 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 4
            },
            style: { width: '140px', "min-height": '140px' },
        },
        106: {
            title() { return "<div id=core5 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 5
            },
            style: { width: '140px', "min-height": '140px' },
        },
        107: {
            title() { return "<div id=core6 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 6
            },
            style: { width: '140px', "min-height": '140px' },
        },
        108: {
            title() { return "<div id=core7 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 7
            },
            style: { width: '140px', "min-height": '140px' },
        },
        109: {
            title() { return "<div id=core8 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 8
            },
            style: { width: '140px', "min-height": '140px' },
        },
        111: {
            title() { return "<div id=core9 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 9
            },
            style: { width: '140px', "min-height": '140px' },
        },
        112: {
            title() { return "Remove this core." },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (player.ev.evolutionsUnlocked[9]) player.ev4.offerings = player.ev4.offerings.add(player.ev9.offeringsOnSacrifice[player.coa.coreIndex])
                    
                if (player.coa.coreOccupied[player.coa.coreIndex])
                {
                    player.coa.coreCount = player.coa.coreCount.sub(1)
                }
                player.coa.coreFuelSources[player.coa.coreIndex] = new Decimal(-1)
                player.coa.coreStrengths[player.coa.coreIndex] = new Decimal(-1)
                player.coa.coreOccupied[player.coa.coreIndex] = false
            },
            style: { width: '140px', "min-height": '70px' },
        },

        //RESET
        201: {
            title() { return "<h1>Condense all of your power into a singularity core. (Req: 1e40 infinity points)" },
            canClick() { return player.in.infinityPoints.gte(1e40) },
            unlocked() { return true },
            onClick() {
                if (player.cs.coreScrapMax && player.cop.processedCoreFuel.neq(-1)) layers.cs.scrapCore();
                layers.coa.generateCore();
                player.s.singularities = player.s.singularities.add(player.s.singularitiesToGet)
                player.s.singularityPoints = player.s.singularityPoints.add(player.s.singularityPointsToGet)
                player.re.halterEssence = player.re.halterEssence.add(player.rm.halterBoostEffect)
                player.ra.storedRadiation = player.ra.storedRadiation.add(player.ra.radiation)

                player.coa.singularityPause = new Decimal(12)
                if (!hasMilestone("s", 18)) player.tab = "i"

                if (hasMilestone("s", 11))
                {
                    player.in.infinities = new Decimal(8)
                }

            },
            style: { width: '600px', "min-height": '200px', 'background-image': 'linear-gradient(-120deg, #6b1919 0%, #cf3a29 100%)' },
        },
    },
    bars: {
    },
    upgrades: { 
    },
    buyables: {

    },
    milestones: {
   
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Assembly": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
        ["raw-html", function () { return "Next Core: " + player.coa.strengths[player.coa.viewingStrength] + " " + player.coa.fuels[player.coa.nextCoreFuel] + " Singularity Core"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [
                        ["column", [
                            ["raw-html", function () { return "Core Strength Luck Level: " + formatWhole(player.coa.luckLevel) + "/10"}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Core Strength Odds:" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Faulty: " + formatWhole(player.coa.coreStrengthOdds[0]) + "%" }, { "color": "#b5b5b5", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Weak: " + formatWhole(player.coa.coreStrengthOdds[1]) + "%" }, { "color": "#ebcc6e", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Average: " + formatWhole(player.coa.coreStrengthOdds[2]) + "%" }, { "color": "#cf7429", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Strong: " + formatWhole(player.coa.coreStrengthOdds[3]) + "%" }, { "color": "#cf3a29", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Pinnacle: " + formatWhole(player.coa.coreStrengthOdds[4]) + "%" }, { "color": "#4a1616", "font-size": "16px", "font-family": "monospace" }],
                        ]],
                    ["raw-html", function () { return " <div id=nextCore class=singularityCore><div class=centerCircle></div>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["column", [
                        ["raw-html", function () { return "Current Fuel Source: " + player.coa.fuels[player.coa.nextCoreFuel] }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Innate Effects:<br>" + player.coa.nextCoreInnateEffectsText }, { "color": "white", "text-align": "justify", "font-size": "16px", "font-family": "monospace" }],
                    ]], ]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "View strength:" }, { "color": "white", "text-align": "justify", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["clickable", 2], ["clickable", 3], ["clickable", 4], ["clickable", 5], ["clickable", 6]]],
                    ["raw-html", function () { return "Note: This does not choose the next strength, strength is determined by the odds." }, { "color": "white", "text-align": "justify", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 201]]],
    ]

            },
            "Fuel Selection": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.s.highestSingularityPoints.gt(0) }, //remove the e
                content:
                [
                    ["blank", "25px"],
        ["raw-html", function () { return "Select a fuel source." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "Current fuel source: " + player.coa.fuels[player.coa.nextCoreFuel] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "<div id=nextCore class=singularityCore><div class=centerCircle></div>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18], ["clickable", 19], ["clickable", 21], ["clickable", 22]]],
                ]

            },
            "Inventory": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.coa.strengths[player.coa.coreStrengths[player.coa.coreIndex]] + " " + player.coa.fuels[player.coa.coreFuelSources[player.coa.coreIndex]] + " Singularity Core"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["raw-html", function () { return "Innate Effects:<br>" + player.coa.coreInnateEffectText[player.coa.coreIndex] }, { "color": "white", "text-align": "justify", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
                    ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105], ["clickable", 106], ["clickable", 107], ["clickable", 108], ["clickable", 109], ["clickable", 111]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 112]]],
                ]

            },
            "Reset Details": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "Singularity is a BIG reset layer. It will reset basically everything leading up to this point." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "Do not be afraid. You would rather be set back but progress than be stuck forever." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "Now if you are willing to proceed, here are the features that will be reset:" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["raw-html", function () { return "All universe 1 content - Including steel, crystal, time cubes, and rage power." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "All universe 2 content - Including tav's domain, infinity dimensions, mastery, and replicanti." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "All alternate universe 1 content - Including oil and grass-skip." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "Performs an XPBoost equivalent reset, and also resets XPBoost, check back buyables, and highest check back level." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["raw-html", function () { return "Only thing that you get to keep are pets, evolutions, pet shop, epic pet stuff, automation shards, and evolution special features." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You may keep them for now, but be prepared to lose them in the next layer :)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "100px"],
        ["raw-html", function () { return "One more word of advice: Good luck." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
    ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain " + format(player.s.singularityPointsToGet) + " singularity points on reset. (Based on infinity points)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true  }
})

function setCoreColors(coreElement, color1, color2, centerColor) {
    coreElement.style.setProperty("--color1", color1);
    coreElement.style.setProperty("--color2", color2);

    const centerCircle = coreElement.querySelector(".centerCircle");
    if (centerColor) {
      centerCircle.style.setProperty("--centerColor", centerColor);
      centerCircle.style.display = "block"; // Show the center circle
    } else {
      centerCircle.style.display = "none"; // Hide the center circle
    }
  }
