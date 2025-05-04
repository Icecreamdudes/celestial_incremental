addLayer("ma", {
    name: "Matos", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⊘", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        maMax: false,

        matosUnlock: false,
        hasPrimedCore: false,
        matosUnlockConditions: [false, false, false, false],
        matosUnlockConditionCount: 0,

        inBlackHeart: false,

        //character stats
        // 0 - Kres, 1 - Nav, 2 - Sel, 3 - Eclipse
        health: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        healthMax: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        damage: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        cooldown: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        attackTimer: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        fightingCelestialites: false,

        currentCelestialiteType: new Decimal(0),
        celestialiteHealth: new Decimal(0),
        celestialiteMaxHealth: new Decimal(0),
        celestialiteDamage: new Decimal(0),
        celestialiteCooldown: new Decimal(0),
        celestialiteTimer: new Decimal(0),

        celestialiteIcons: [],
        characterIcons: [],
        celestialiteNames: [],
        characterNames: [],

        log: ["", "", "", "", "", "", "", "", "", ""],

        respawnTimer: new Decimal(0),
        deadCharacters: [false, false, false],

        //second skill
        cooldown2: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        attackTimer2: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        turretDurationLeft: new Decimal(0), // Initialize turret duration left as 0

        //currencies
        commonMatosFragments: new Decimal(0),
        rareMatosFragments: new Decimal(0),
        epicMatosFragments: new Decimal(0),
        legendaryMatosFragments: new Decimal(0),

        //area
        currentDepth: new Decimal(0),

        //second area unlock
        secondAreaUnlock: false,
        epsilonCelestialitesKilled: new Decimal(0),

        //special celestialites
        regenRate: new Decimal(0),
        shieldMaxHealth: new Decimal(0),
        shieldHealth: new Decimal(0),
        airCelestialite: false,
        shieldCelestialite: false,
        regenCelestialite: false,

        //add something kill combo related
        combo: new Decimal(0),
        bestComboDepth1: new Decimal(0),
        bestComboDepth1Effect: new Decimal(1),
        bestComboDepth2: new Decimal(0),
        bestComboDepth2Effect: new Decimal(1),

        //cooldowns
        depth1Cooldown: new Decimal(0), 
        depth1CooldownMax: new Decimal(300), 
        depth2Cooldown: new Decimal(0), 
        depth2CooldownMax: new Decimal(600), 
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(120deg,rgb(138, 14, 121) 0%,rgb(168, 12, 51) 100%)",
            "background-origin": "border-box",
            "border-color": "rgb(53, 8, 19)",
            "color": "rgb(0, 0, 0)",
        };
    },
    tooltip: "Matos, Celestial of Machinery",
    branches: ["sma",],
    color: "rgb(138, 14, 121)",
    update(delta) {
        let onepersec = new Decimal(1)

        for (let i = 0; i < player.coa.corePrimes.length; i++) {
            if (player.coa.corePrimes[i].eq(5)) {
                player.ma.hasPrimedCore = true
            }
        }

        player.ma.healthMax[0] = player.ep3.kresStats[1].add(60)
        player.ma.damage[0] = player.ep3.kresStats[0].mul(0.2).add(5)
        player.ma.cooldown[0] = Decimal.div(8, player.ep3.kresStats[2].mul(0.01).add(1))
        player.ma.cooldown2[0] = Decimal.div(20, player.ep3.kresStats[2].mul(0.005).add(1))

        player.ma.healthMax[1] = player.ep4.navStats[1].add(30)
        player.ma.damage[1] = player.ep4.navStats[0].mul(0.2).add(7)
        player.ma.cooldown[1] = Decimal.div(6, player.ep4.navStats[2].mul(0.01).add(1))
        player.ma.cooldown2[1] = Decimal.div(15, player.ep4.navStats[2].mul(0.005).add(1))

        player.ma.healthMax[2] = player.ep5.selStats[1].add(45)
        player.ma.damage[2] = player.ep5.selStats[0].mul(0.2).add(3)
        player.ma.cooldown[2] = Decimal.div(4, player.ep5.selStats[2].mul(0.01).add(1))
        player.ma.cooldown2[2] = Decimal.div(30, player.ep5.selStats[2].mul(0.01).add(1))

        player.ma.damage[0] = player.ma.damage[0].mul(buyableEffect("ma", 101))
        player.ma.damage[1] = player.ma.damage[1].mul(buyableEffect("ma", 102))
        player.ma.damage[2] = player.ma.damage[2].mul(buyableEffect("ma", 103))

        player.ma.healthMax[0] = player.ma.healthMax[0].mul(buyableEffect("ma", 101))
        player.ma.healthMax[1] = player.ma.healthMax[1].mul(buyableEffect("ma", 102))
        player.ma.healthMax[2] = player.ma.healthMax[2].mul(buyableEffect("ma", 103))

        for (let i = 0; i < player.ma.attackTimer.length; i++) {
            player.ma.healthMax[i] = player.ma.healthMax[i].mul(buyableEffect("ma", 14))
            player.ma.damage[i] = player.ma.damage[i].mul(buyableEffect("ma", 15))
            player.ma.cooldown[i] = player.ma.cooldown[i].div(buyableEffect("ma", 16))
        }

        //names and icons
        player.ma.celestialiteIcons = [
            "<img src='resources/alphaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/betaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/gammaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/deltaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/epsilonMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/secret.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/zetaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/etaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/thetaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/iotaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/kappaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/lambdaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/muMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/nuMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/xiMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        ]
        player.ma.celestialiteNames = [
            "Alpha",
            "Beta",
            "Gamma",
            "Delta",
            "Epsilon",
            "No",
            "Zeta", //regenerative celestialites - they regenerate health
            "Eta",
            "Theta",
            "Iota", //air celestialites - kres can't attack them
            "Kappa",
            "Lambda",
            "Mu", //shielded celestialites - kres must break the shield before attacking
            "Nu",
            "Xi",
            //stealthy celestialites - only sel can attack them and there is a 10% chance he can break the seal
            //cursed celestialites - there is a 50% chance the character will deal the damage dealt to the celestialite, and there is a 10% chance nav can remove the celestialites ability to curse
            //explosive celestialites - they will explode when they die, dealing 20% of their max health to all characters
        ]
        player.ma.characterIcons = [
            "<img src='resources/kres.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/nav.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/sel.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        ]
        player.ma.characterNames = [
            "Kres",
            "Nav",
            "Sel",
        ]

        //timers
        for (let i = 0; i < player.ma.attackTimer.length; i++) {
            if (player.ma.attackTimer[i].gt(0)) {
                if (player.ma.fightingCelestialites) player.ma.attackTimer[i] = player.ma.attackTimer[i].sub(onepersec.mul(delta))
            }
            if (player.ma.attackTimer2[i].gt(0)) {
                if (player.ma.fightingCelestialites) player.ma.attackTimer2[i] = player.ma.attackTimer2[i].sub(onepersec.mul(delta))
            }

        }
        if (player.ma.currentCelestialiteType != 5 && player.ma.fightingCelestialites) player.ma.celestialiteTimer = player.ma.celestialiteTimer.sub(onepersec.mul(delta))
        if (player.ma.currentCelestialiteType == 5 && player.ma.fightingCelestialites) player.ma.respawnTimer = player.ma.respawnTimer.sub(onepersec.mul(delta))

        player.ma.depth1Cooldown = player.ma.depth1Cooldown.sub(onepersec.mul(delta))
        player.ma.depth2Cooldown = player.ma.depth2Cooldown.sub(onepersec.mul(delta))

        player.ma.depth1CooldownMax = new Decimal(300)
        player.ma.depth2CooldownMax = new Decimal(600)

        if (player.ma.celestialiteTimer.lt(0)) {
        player.ma.celestialiteTimer = player.ma.celestialiteCooldown;
            
            // Filter out dead characters
            let aliveCharacters = player.ma.deadCharacters
                .map((isDead, index) => (!isDead ? index : null))
                .filter(index => index !== null);
            
            if (aliveCharacters.length > 0) {
                let character = aliveCharacters[getRandomInt(aliveCharacters.length)];
                let baseDamage = player.ma.celestialiteDamage;
                let variation = baseDamage * 0.15;
                let damage = baseDamage + (Math.random() * 2 - 1) * variation;
            
                player.ma.health[character] = player.ma.health[character].sub(damage);
                    logPrint(
                    "<span style='color: hsl(308, 81.70%, 30.00%);'>The " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite attacks " + player.ma.characterNames[character] + " for " +format(damage) + " damage."
                );
            }
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown;
        }
        if (player.ma.respawnTimer.lt(0) && player.ma.currentCelestialiteType == 5)
        {
            layers.ma.generateCelestialite()
            player.ma.respawnTimer = new Decimal(-1e100)
        }
        if (player.ma.celestialiteHealth.lt(0)) {
            logPrint("The " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite died!")

            layers.ma.lootCelestialite()
            player.ma.celestialiteHealth = new Decimal(0)
            player.ma.shieldMaxHealth = new Decimal(0)
            player.ma.regenRate = new Decimal(0)
            player.ma.respawnTimer = new Decimal(5)
            player.ma.currentCelestialiteType = 5
            player.ma.combo = player.ma.combo.add(1)
        }

        if (player.ma.currentDepth.eq(1) && player.ma.combo.gt(player.ma.bestComboDepth1)) {
            player.ma.bestComboDepth1 = player.ma.combo
            logPrint("Your new highest combo for depth 1 is " + player.ma.bestComboDepth1 + "!")
        }
        if (player.ma.currentDepth.eq(2) && player.ma.combo.gt(player.ma.bestComboDepth2)) {
            player.ma.bestComboDepth2 = player.ma.combo
            logPrint("Your new highest combo for depth 2 is " + player.ma.bestComboDepth2 + "!")
        }

        player.ma.bestComboDepth1Effect = Decimal.pow(5, player.ma.bestComboDepth1.pow(1.35)).pow(0.3).add(1)
        player.ma.bestComboDepth2Effect = Decimal.pow(2, player.ma.bestComboDepth2.pow(1.3)).pow(0.3).add(1)

        if (player.ma.health[0].lt(0) && !player.ma.deadCharacters[0]) {
            player.ma.deadCharacters[0] = true
            logPrint("<span style='color: #910a27;'>Kres has died!")
        }
        if (player.ma.health[1].lt(0) && !player.ma.deadCharacters[1]) {
            player.ma.deadCharacters[1] = true
            logPrint("<span style='color: #710a91;'>Nav has died!")
        }
        if (player.ma.health[2].lt(0) && !player.ma.deadCharacters[2]) {
            player.ma.deadCharacters[2] = true
            logPrint("<span style='color: #065c19;'>Sel has died!")
        }

        if (player.ma.deadCharacters[0] && player.ma.deadCharacters[1] && player.ma.deadCharacters[2]) {
            player.subtabs["ma"]["stuff"] = "Dead"

            for (let i = 0; i < player.ma.deadCharacters.length; i++) 
            {
                player.ma.health[i] = player.ma.healthMax[i]
                player.ma.deadCharacters[i] = false
            }
            player.ma.fightingCelestialites = false
            player.ma.currentDepth = new Decimal(0)
            player.ma.combo = new Decimal(0)

            player.ma.epsilonCelestialitesKilled = new Decimal(0)
        }
        if (player.ma.epsilonCelestialitesKilled.gte(5) && !player.ma.secondAreaUnlock)
        {
            player.ma.secondAreaUnlock = true
            logPrint("<span style='color: white;'>You have killed 5 epsilon celestialites! The next depth is now unlocked!")
        }

        //special celestialites
        if (player.ma.currentCelestialiteType == 6 || player.ma.currentCelestialiteType == 7 || player.ma.currentCelestialiteType == 8)
        {
            player.ma.regenCelestialite = true
        } else {
            player.ma.regenCelestialite = false
            player.ma.regenRate = new Decimal(0)
        }
        if (player.ma.currentCelestialiteType == 9 || player.ma.currentCelestialiteType == 10 || player.ma.currentCelestialiteType == 11)
        {
            player.ma.airCelestialite = true
        } else {
            player.ma.airCelestialite = false
        }
        if (player.ma.currentCelestialiteType == 12 || player.ma.currentCelestialiteType == 13 || player.ma.currentCelestialiteType == 14)
        {
            player.ma.shieldCelestialite = true
        } else {
            player.ma.shieldCelestialite = false
            player.ma.shieldHealth = new Decimal(0)
        }
        player.ma.celestialiteHealth = player.ma.celestialiteHealth.add(player.ma.regenRate.mul(delta))
        if (player.ma.celestialiteHealth.gt(player.ma.celestialiteMaxHealth)) {
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
        }
    },
    resetFightCooldown()
    {
        player.ma.depth1Cooldown = new Decimal(0)
        player.ma.depth2Cooldown = new Decimal(0)
        player.ma.depth3Cooldown = new Decimal(0)
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false && !player.ma.inBlackHeart  },
            onClick() {
                player.tab = "s"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.ma.maMax == false },
            unlocked() { return true },
            onClick() {
                player.ma.maMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.ma.maMax == true  },
            unlocked() { return true },
            onClick() {
                player.ma.maMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        4: {
            title() { return "<h2>" + player.ma.matosUnlockConditionCount + "/4<br><h1 style='font-size: 80px;'>⊘</h1>" }, // Increased font size
            canClick() { return player.ma.matosUnlockConditions[0] && player.ma.matosUnlockConditions[1] && player.ma.matosUnlockConditions[2] && player.ma.matosUnlockConditions[3] },
            unlocked() { return true },
            onClick() {
                player.ma.matosUnlock = true
            },
            style: { width: '175px', "min-height": '175px' },
        },
        5: {
            title() { return !player.ma.matosUnlockConditions[0] ? "<h2>Fully Primed Core" : "<h1>YOU"},
            canClick() { return player.ma.hasPrimedCore == true && player.ma.matosUnlockConditions[0] == false },
            unlocked() { return true },
            onClick() {
                player.ma.matosUnlockConditions[0] = true
                player.ma.matosUnlockConditionCount += 1
            },
            style: { width: '150px', "min-height": '150px' },
            branches: [4]
        },
        6: {
            title() { return !player.ma.matosUnlockConditions[1] ? "<h2>Check Back Level 30,000" : "<h1>HAVE" },
            canClick() { return player.cb.level.gte(30000) && player.ma.matosUnlockConditions[1] == false },
            unlocked() { return true },
            onClick() {
                player.ma.matosUnlockConditions[1] = true     
                player.ma.matosUnlockConditionCount += 1
            },
            style: { width: '150px', "min-height": '150px' },
            branches: [4]
        },
        7: {
            title() { return !player.ma.matosUnlockConditions[2] ? "<h2>1e280 Replicanti Points" : "<h1>BEEN" },
            canClick() { return player.cp.replicantiPoints.gte(1e280) && player.ma.matosUnlockConditions[2] == false },
            unlocked() { return true },
            onClick() {
                player.ma.matosUnlockConditions[2] = true
                player.ma.matosUnlockConditionCount += 1
            },
            style: { width: '150px', "min-height": '150px' },
            branches: [4]
        },
        8: {
            title() { return !player.ma.matosUnlockConditions[3] ? "<h2>1e700,000 Points" : "<h1>WARNED" },
            canClick() { return player.points.gte("1e700000") && player.ma.matosUnlockConditions[3] == false },
            unlocked() { return true },
            onClick() {
                player.ma.matosUnlockConditions[3] = true
                player.ma.matosUnlockConditionCount += 1
            },
            style: { width: '150px', "min-height": '150px' },
            branches: [4]
        },
        11: {
            title() { return "<h1>Enter the black heart" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ma.inBlackHeart = true
                toggleOpt('menuShown')

                player.subtabs["ma"]["stuff"] = "Prep"
            },
            style: { width: '400px', "min-height": '150px', 'color': "white", 'background-color': "black",},
        },
        12: {
            title() { return "<h2>Leave the black heart" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ma.inBlackHeart = false
                toggleOpt('menuShown')

                player.subtabs["ma"]["stuff"] = "Black Heart"
            },
            style: { width: '200px', "min-height": '75px', 'color': "white", 'background-color': "black",},
        },
        13: {
            title() { return player.ma.depth1Cooldown.lt(0) ? "<h2>Enter Depth 1" : "<h2>Cooldown: " + formatTime(player.ma.depth1Cooldown) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["ma"]["stuff"] = "Fight"
                player.ma.fightingCelestialites = true

                for (let i = 0; i < player.ma.deadCharacters.length; i++) 
                {
                    player.ma.health[i] = player.ma.healthMax[i]
                    player.ma.deadCharacters[i] = false
                }

                player.ma.currentDepth = new Decimal(1)
                layers.ma.generateCelestialite()

                player.ma.depth1Cooldown = player.ma.depth1CooldownMax
            },
            style: { width: '200px', "min-height": '75px', 'color': "white", 'background-color': "black",},
        },
        14: {
            title() { return "Give up" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.ma.deadCharacters.length; i++) 
                {
                    player.ma.deadCharacters[i] = true
                }
            },
            style: { width: '200px', "min-height": '50px', 'color': "black", 'background-color': "white",},
        },
        15: {
            title() { return player.ma.depth2Cooldown.lt(0) ? "<h2>Enter Depth 2" : "<h2>Cooldown: " + formatTime(player.ma.depth2Cooldown) },
            canClick() { return player.ma.depth2Cooldown.lt(0) },
            unlocked() { return player.ma.secondAreaUnlock },
            onClick() {
                player.subtabs["ma"]["stuff"] = "Fight"
                player.ma.fightingCelestialites = true

                for (let i = 0; i < player.ma.deadCharacters.length; i++) 
                {
                    player.ma.health[i] = player.ma.healthMax[i]
                    player.ma.deadCharacters[i] = false
                }
                layers.ma.generateCelestialite()

                player.ma.currentDepth = new Decimal(2)
                layers.ma.generateCelestialite()

                player.ma.depth2Cooldown = player.ma.depth2CooldownMax
            },
            style: { width: '200px', "min-height": '75px', 'color': "white", 'background-color': "black",},
        },

        //icons
        101: {
            title() { return player.ma.deadCharacters[0] ? "<img src='resources/dead.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" : player.ma.characterIcons[0] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
            },
            style: { width: '150px', "min-height": '150px', 'color': "white", 'background-color': "black",},
        },
        102: {
            title() { return player.ma.deadCharacters[1] ? "<img src='resources/dead.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" : player.ma.characterIcons[1] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
            },
            style: { width: '150px', "min-height": '150px', 'color': "white", 'background-color': "black",},
        },
        103: {
            title() { return player.ma.deadCharacters[2] ? "<img src='resources/dead.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" : player.ma.characterIcons[2] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
            },
            style: { width: '150px', "min-height": '150px', 'color': "white", 'background-color': "black",},
        },
        104: {
            title() { return player.ma.celestialiteIcons[player.ma.currentCelestialiteType] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
            },
            style: { width: '150px', "min-height": '150px', 'color': "white", 'background-color': "black",},
        },

        //attacks
        201: {
            title() { return "Main Attack" },
            tooltip() { return player.ma.airCelestialite ? "Kres can't attack air celestialites" : "" },
            canClick() { return player.ma.deadCharacters[0] == false && !player.ma.airCelestialite },
            unlocked() { return player.ma.attackTimer[0].lte(0) },
            onClick() {
                let baseDamage = player.ma.damage[0];
                let variation = baseDamage.mul(0.15); // 15% variation
                let randomFactor = new Decimal(Math.random()).mul(2).sub(1); // Random value between -1 and +1
                let damage = baseDamage.add(variation.mul(randomFactor)); // Apply variation
        
                if (player.ma.currentCelestialiteType != 5 && !player.ma.airCelestialite) {
                    if (player.ma.shieldHealth.lte(0)) player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(damage);
                    if (player.ma.shieldHealth.gt(0) && player.ma.shieldCelestialite) player.ma.shieldHealth = player.ma.shieldHealth.sub(damage);
                    logPrint("<span style='color: #910a27;'>Kres attacks the " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite for " + format(damage) + " damage.</span>");
                }
                player.ma.attackTimer[0] = player.ma.cooldown[0];
            },
            style: { width: '100px', "min-height": '100px', 'color': "white", 'background-color': "#910a27" },
        },
        202: {
            title() { return "Main Attack" },
            tooltip() { return player.ma.shieldHealth.gt(0) ? "Nav can't attack shields" : "" },
            canClick() { return player.ma.deadCharacters[1] == false && player.ma.shieldHealth.lte(0)},
            unlocked() { return player.ma.attackTimer[1].lte(0) },
            onClick() {
                let baseDamage = player.ma.damage[1];
                let variation = baseDamage.mul(0.25); // 25% variation
                let randomFactor = new Decimal(Math.random()).mul(2).sub(1); // Random value between -1 and +1
                let damage = baseDamage.add(variation.mul(randomFactor)); // Apply variation
        
                if (player.ma.currentCelestialiteType != 5) {
                    if (player.ma.shieldHealth.lte(0)) player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(damage);
                    if (player.ma.shieldHealth.lte(0)) logPrint("<span style='color: #710a91;'>Nav attacks the " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite for " + format(damage) + " damage.</span>");
                }
                player.ma.attackTimer[1] = player.ma.cooldown[1];
            },
            style: { width: '100px', "min-height": '100px', 'color': "white", 'background-color': "#710a91" },
        },
        203: {
            title() { return "Main Attack" },
            tooltip() { return player.ma.shieldHealth.gt(0) ? "Sel can't attack shields" : "" },
            canClick() { return player.ma.deadCharacters[2] == false && player.ma.shieldHealth.lte(0)},
            unlocked() { return player.ma.attackTimer[2].lte(0) },
            onClick() {
                let baseDamage = player.ma.damage[2];
                let variation = baseDamage.mul(0.15); // 15% variation
                let randomFactor = new Decimal(Math.random()).mul(2).sub(1); // Random value between -1 and +1
                let damage = baseDamage.add(variation.mul(randomFactor)); // Apply variation
        
                if (player.ma.currentCelestialiteType != 5) {
                    if (player.ma.shieldHealth.lte(0)) player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(damage);
                    if (player.ma.shieldHealth.lte(0)) logPrint("<span style='color: #065c19;'>Sel attacks the " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite for " + format(damage) + " damage.</span>");
                }
                player.ma.attackTimer[2] = player.ma.cooldown[2];
            },
            style: { width: '100px', "min-height": '100px', 'color': "white", 'background-color': "#065c19" },
        },
        204: {
            title() { return "Big Attack" },
            tooltip() { return "Deals big damage at the cost of 8-12% of Kres' max HP." },
            canClick() { return player.ma.deadCharacters[0] == false && !player.ma.airCelestialite},
            unlocked() { return player.ma.attackTimer2[0].lte(0) && hasUpgrade("ma", 11) },
            onClick() {
                // Calculate base damage and variation
                let baseDamage = player.ma.damage[0].mul(2); // Double the base damage for Big Attack
                let variation = baseDamage.mul(0.3); // 30% variation
                let randomFactor = new Decimal(Math.random()).mul(2).sub(1); // Random value between -1 and +1
                let damage = baseDamage.add(variation.mul(randomFactor)); // Apply variation
        
                // Calculate self-damage as 8-12% of Kres' max HP
                let selfDamagePercentage = Math.random() * 0.04 + 0.08; // Random value between 0.08 and 0.12
                let selfDamage = player.ma.healthMax[0].mul(selfDamagePercentage);
        
                // Apply damage to the celestialite
                if (player.ma.currentCelestialiteType != 5) {
                    if (player.ma.shieldHealth.lte(0)) player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(damage);
                    if (player.ma.shieldHealth.gt(0) && player.ma.shieldCelestialite) player.ma.shieldHealth = player.ma.shieldHealth.sub(damage);
                    logPrint("<span style='color: #910a27;'>Kres BIG ATTACKS the " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite for " + format(damage) + " damage.</span>");
                }
        
                // Apply self-damage to Kres
                player.ma.health[0] = player.ma.health[0].sub(selfDamage);
                logPrint("<span style='color: #910a27;'>Kres takes " + format(selfDamage) + " self-damage from the Big Attack.</span>");
        
                // Reset Kres' attack timer
                player.ma.attackTimer2[0] = player.ma.cooldown2[0];
            },
            style: { width: '100px', "min-height": '100px', 'color': "white", 'background-color': "#910a27" },
        },
        205: {
            title() { return "Heal Spell" },
            tooltip() { return "Randomly heal a character by 5-10% of their max HP." },
            canClick() { 
                // Ensure at least one character is alive and not at max health
                return player.ma.deadCharacters.some((isDead, index) => !isDead && player.ma.health[index].lt(player.ma.healthMax[index])) && player.ma.deadCharacters[1] == false ; 
            },
            unlocked() { return player.ma.attackTimer2[1].lte(0) && hasUpgrade("ma", 12) },
            onClick() {
                // Filter out dead characters and characters at max health
                let healableCharacters = player.ma.deadCharacters
                    .map((isDead, index) => (!isDead && player.ma.health[index].lt(player.ma.healthMax[index]) ? index : null))
                    .filter(index => index !== null);
        
                if (healableCharacters.length > 0) {
                    // Select a random healable character
                    let characterIndex = healableCharacters[Math.floor(Math.random() * healableCharacters.length)];
        
                    // Calculate heal amount (10-15% of max HP)
                    let healPercentage = Math.random() * 0.05 + 0.05; // Random value between 0.10 and 0.15
                    let healAmount = player.ma.healthMax[characterIndex].mul(healPercentage);
        
                    // Apply healing
                    player.ma.health[characterIndex] = player.ma.health[characterIndex].add(healAmount);
        
                    // Ensure health does not exceed max HP
                    if (player.ma.health[characterIndex].gt(player.ma.healthMax[characterIndex])) {
                        player.ma.health[characterIndex] = player.ma.healthMax[characterIndex];
                    }
        
                    // Log the healing event
                    logPrint(
                        `<span style='color: #710a91;'>Nav heals ${player.ma.characterNames[characterIndex]} for ${format(healAmount)} HP.</span>`
                    );
                }
        
                // Reset Nav's attack timer
                player.ma.attackTimer2[1] = player.ma.cooldown2[1];
            },
            style: { width: '100px', "min-height": '100px', 'color': "white", 'background-color': "#710a91" },
        },
        206: {
            title() { return "Turret" },
            tooltip() { return "A turret will attack every 0.5s for 12s, dealing 20-30% of Sel's attack damage." },
            canClick() { return player.ma.deadCharacters[2] == false && player.ma.shieldHealth.lte(0)}, // Ensure Sel is alive
            unlocked() { return player.ma.attackTimer2[2].lte(0) && hasUpgrade("ma", 13) },
            onClick() {
                // Reset Sel's second skill cooldown
                player.ma.attackTimer2[2] = player.ma.cooldown2[2];
        
                // Turret duration and interval
                const turretDuration = 12; // 12 seconds
                const turretInterval = 0.5; // 0.5 seconds
                const turretTicks = Math.floor(turretDuration / turretInterval); // Total number of attacks
        
                // Set the turret duration left
                player.ma.turretDurationLeft = new Decimal(turretDuration);
        
                // Start the turret attacks
                let turretTick = 0;
                const turretIntervalId = setInterval(() => {
                    if (turretTick >= turretTicks || player.ma.deadCharacters[2]) {
                        // Stop the turret if duration is over or Sel dies
                        clearInterval(turretIntervalId);
                        player.ma.turretDurationLeft = new Decimal(0); // Reset turret duration left
                        return;
                    }
        
                    // Calculate turret damage (6-10% of Sel's attack damage)
                    const turretDamagePercentage = Math.random() * 0.1 + 0.2; // Random value between 0.06 and 0.10
                    const turretDamage = player.ma.damage[2].mul(turretDamagePercentage);
        
                    // Apply damage to the celestialite
                    if (player.ma.currentCelestialiteType != 5) {
                        if (player.ma.shieldHealth.lte(0)) player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(turretDamage);
                        if (player.ma.shieldHealth.lte(0)) logPrint(
                            `<span style='color: #065c19;'>Sel's turret attacks the ${player.ma.celestialiteNames[player.ma.currentCelestialiteType]} Celestialite for ${format(turretDamage)} damage.</span>`
                        );
                    }
        
                    // Decrease the turret duration left
                    player.ma.turretDurationLeft = player.ma.turretDurationLeft.sub(turretInterval);
                    turretTick++;
                }, turretInterval * 1000); // Convert interval to milliseconds
            },
            style: { width: '100px', "min-height": '100px', 'color': "white", 'background-color': "#065c19" },
        },
    },
    generateCelestialite()
    {
        let random = Math.random()

        if (player.ma.currentDepth.eq(1))
        {
        if (random > 0.75 && random < 1)
        {
            player.ma.currentCelestialiteType = 0
        }
        if (random > 0.5 && random < 0.75)
        {
            player.ma.currentCelestialiteType = 1
        }
        if (random > 0.3 && random < 0.5)
        {
            player.ma.currentCelestialiteType = 2
        }
        if (random > 0.1 && random < 0.3)
        {
            player.ma.currentCelestialiteType = 3
        }
        if (random < 0.1) 
        {
            player.ma.currentCelestialiteType = 4
        }
        if (player.ma.currentCelestialiteType == 0) {
            player.ma.celestialiteMaxHealth = Decimal.add(60, Decimal.mul(15, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(5, Decimal.mul(2, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(7, Decimal.mul(4, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 1) {
            player.ma.celestialiteMaxHealth = Decimal.add(40, Decimal.mul(10, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(5, Decimal.mul(3, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(4, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 2) {
            player.ma.celestialiteMaxHealth = Decimal.add(80, Decimal.mul(25, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(6, Decimal.mul(5, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(6, Decimal.mul(3, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 3) {
            player.ma.celestialiteMaxHealth = Decimal.add(100, Decimal.mul(20, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(1, Decimal.mul(1, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(2, Decimal.mul(1, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 4) {
            player.ma.celestialiteMaxHealth = Decimal.add(150, Decimal.mul(40, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(7, Decimal.mul(4, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(10, Decimal.mul(3, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        } else if (player.ma.currentDepth.eq(2)) 
        {
        if (random > 0.83 && random < 1)
        {
            player.ma.currentCelestialiteType = 3
        }
        if (random > 0.66 && random < 0.83)
        {
            player.ma.currentCelestialiteType = 4
        }
        if (random > 0.52 && random < 0.66)
        {
            player.ma.currentCelestialiteType = 6
        }
        if (random > 0.42 && random < 0.52)
        {
            player.ma.currentCelestialiteType = 7
        }
        if (random > 0.3 && random < 0.42)
        {
            player.ma.currentCelestialiteType = 9
        }
        if (random > 0.18 && random < 0.3)
        {
            player.ma.currentCelestialiteType = 10
        }
        if (random > 0.06 && random < 0.18)
        {
            player.ma.currentCelestialiteType = 12
        }
        if (random < 0.06)
        {
            player.ma.currentCelestialiteType = 13
        }
        if (player.ma.currentCelestialiteType == 6) {
            player.ma.celestialiteMaxHealth = Decimal.add(80, Decimal.mul(50, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(10, Decimal.mul(3, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(11, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown

            player.ma.regenRate = Decimal.add(2, Decimal.mul(2, Math.random()))
        } 
        if (player.ma.currentCelestialiteType == 7) {
            player.ma.celestialiteMaxHealth = Decimal.add(150, Decimal.mul(80, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(4, Decimal.mul(5, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(5, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown

            player.ma.regenRate = Decimal.add(2, Decimal.mul(1, Math.random()))
        } 
        if (player.ma.currentCelestialiteType == 9) {
            player.ma.celestialiteMaxHealth = Decimal.add(100, Decimal.mul(30, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(8, Decimal.mul(3, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(7, Decimal.mul(3, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        } 
        if (player.ma.currentCelestialiteType == 10) {
            player.ma.celestialiteMaxHealth = Decimal.add(100, Decimal.mul(60, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(2, Decimal.mul(1, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(2, Decimal.mul(1, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        } 
        if (player.ma.currentCelestialiteType == 12) {
            player.ma.celestialiteMaxHealth = Decimal.add(100, Decimal.mul(100, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(16, Decimal.mul(8, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(15, Decimal.mul(3, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown

            player.ma.shieldMaxHealth = Decimal.add(50, Decimal.mul(50, Math.random()))
            player.ma.shieldHealth = player.ma.shieldMaxHealth
        } 
        if (player.ma.currentCelestialiteType == 13) {
            player.ma.celestialiteMaxHealth = Decimal.add(200, Decimal.mul(150, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(7, Decimal.mul(5, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(5, Decimal.mul(3, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown

            player.ma.shieldMaxHealth = Decimal.add(100, Decimal.mul(75, Math.random()))
            player.ma.shieldHealth = player.ma.shieldMaxHealth
        } 
    }
    },
    lootCelestialite()
    {
        let random = Math.random()
        if (player.ma.currentCelestialiteType == 0) {
            if (random < 0.7)
            {
                let gain = Decimal.add(8, getRandomInt(5))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else
            {
                let gain = Decimal.add(1, getRandomInt(1))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 1) {
            if (random < 0.7)
            {
                let gain = Decimal.add(5, getRandomInt(8))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else
            {
                let gain = Decimal.add(1, getRandomInt(2))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 2) {
            if (random < 0.5)
            {
                let gain = Decimal.add(9, getRandomInt(8))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else
            {
                let gain = Decimal.add(2, getRandomInt(2))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 3) {
            if (random < 0.6)
            {
                let gain = Decimal.add(9, getRandomInt(8))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.6 && random < 0.9)
            {
                let gain = Decimal.add(3, getRandomInt(3))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else
            {
                let gain = new Decimal(1)
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 4) {
            if (random < 0.4)
            {
                let gain = Decimal.add(12, getRandomInt(7))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.4 && random < 0.85)
            {
                let gain = Decimal.add(4, getRandomInt(3))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else
            {
                let gain = Decimal.add(1, getRandomInt(1))
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            }

            if (!player.ma.secondAreaUnlock)
            {
            player.ma.epsilonCelestialitesKilled = player.ma.epsilonCelestialitesKilled.add(1)
            logPrint("<span style='color: white;'>You killed " + formatWhole(player.ma.epsilonCelestialitesKilled) + "/5 epsilon celestialites in order to unlock the next depth...")
            }
        }

        if (player.ma.currentCelestialiteType == 6) {
            if (random < 0.5)
            {
                let gain = Decimal.add(18, getRandomInt(12))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.5 && random < 0.8)
            {
                let gain = Decimal.add(6, getRandomInt(4))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.8 && random < 0.98)
            {
                let gain = Decimal.add(1, getRandomInt(2))
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else 
            {
                let gain = new Decimal(1)
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 7) {
            if (random < 0.45)
            {
                let gain = Decimal.add(22, getRandomInt(8))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.45 && random < 0.85)
            {
                let gain = Decimal.add(7, getRandomInt(5))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.85 && random < 0.985)
            {
                let gain = Decimal.add(2, getRandomInt(2))
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else 
            {
                let gain = new Decimal(1)
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 9) {
            if (random < 0.3)
            {
                let gain = Decimal.add(22, getRandomInt(8))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.3 && random < 0.8)
            {
                let gain = Decimal.add(5, getRandomInt(7))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.8 && random < 0.97)
            {
                let gain = Decimal.add(1, getRandomInt(3))
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else 
            {
                let gain = new Decimal(1)
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 10) {
            if (random < 0.1)
            {
                let gain = Decimal.add(44, getRandomInt(22))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.1 && random < 0.6)
            {
                let gain = Decimal.add(3, getRandomInt(5))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.6 && random < 0.98)
            {
                let gain = new Decimal(1)
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else 
            {
                let gain = new Decimal(1)
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 12) {
            if (random < 0.5)
            {
                let gain = Decimal.add(15, getRandomInt(10))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.5 && random < 0.9)
            {
                let gain = Decimal.add(7, getRandomInt(3))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.9 && random < 0.97)
            {
                let gain = Decimal.add(3, getRandomInt(3))
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else 
            {
                let gain = new Decimal(1)
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 13) {
            if (random < 0.4)
            {
                let gain = Decimal.add(25, getRandomInt(15))
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.4 && random < 0.8)
            {
                let gain = Decimal.add(9, getRandomInt(5))
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.8 && random < 0.94)
            {
                let gain = Decimal.add(2, getRandomInt(3))
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else 
            {
                let gain = new Decimal(1)
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
    },
    bars: {
        kresHealth: {
            unlocked() { return true },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.health[0].div(player.ma.healthMax[0])
            },
            fillStyle: {
                "background-color": "#910a27",
            },
            display() {
                return player.ma.deadCharacters[0] ? "Kres is dead." : "<h5>" + format(player.ma.health[0]) + "/" + format(player.ma.healthMax[0]) + "<h5> HP.</h5>";
            },
        },
        navHealth: {
            unlocked() { return true },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.health[1].div(player.ma.healthMax[1])
            },
            fillStyle: {
                "background-color": "#710a91",
            },
            display() {
                return player.ma.deadCharacters[1] ? "Nav is dead." : "<h5>" + format(player.ma.health[1]) + "/" + format(player.ma.healthMax[1]) + "<h5> HP.</h5>";
            },
        },
        selHealth: {
            unlocked() { return true },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.health[2].div(player.ma.healthMax[2])
            },
            fillStyle: {
                "background-color": "#065c19",
            },
            display() {
                return player.ma.deadCharacters[2] ? "Sel is dead." : "<h5>" + format(player.ma.health[2]) + "/" + format(player.ma.healthMax[2]) + "<h5> HP.</h5>";
            },
        },
        celestialiteHealth: {
            unlocked() { return player.ma.currentCelestialiteType != 5 && player.ma.shieldHealth.lte(0) },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.celestialiteHealth.div(player.ma.celestialiteMaxHealth)
            },
            fillStyle: {
                "background-color": "rgb(138, 14, 121)",
            },
            display() {
                return player.ma.regenCelestialite ?  "<h5>" + format(player.ma.celestialiteHealth) + "/" + format(player.ma.celestialiteMaxHealth) + "<h5> HP.<br>+" + format(player.ma.regenRate) + " HP/s<br/>": "<h5>" + format(player.ma.celestialiteHealth) + "/" + format(player.ma.celestialiteMaxHealth) + "<h5> HP.</h5>";
            },
        },
        celestialiteShield: {
            unlocked() { return player.ma.currentCelestialiteType != 5 && player.ma.shieldHealth.gte(0) && player.ma.shieldCelestialite },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.shieldHealth.div(player.ma.shieldMaxHealth)
            },
            fillStyle: {
                "background-color": "rgb(92, 92, 92)",
            },
            display() {
                return "<h5>" + format(player.ma.shieldHealth) + "/" + format(player.ma.shieldMaxHealth) + "<h5> Shield HP.</h5>";
            },
        },

        //attacks
        kresAttack: {
            unlocked() { return player.ma.attackTimer[0].gt(0) },
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer[0].div(player.ma.cooldown[0])
            },
            fillStyle: {
                "background-color": "#910a27",
            },
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer[0]) + "/" + formatTime(player.ma.cooldown[0]) + "<h5></h5>";
            },
        },
        navAttack: {
            unlocked() { return player.ma.attackTimer[1].gt(0) },
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer[1].div(player.ma.cooldown[1])
            },
            fillStyle: {
                "background-color": "#710a91",
            },
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer[1]) + "/" + formatTime(player.ma.cooldown[1]) + "<h5></h5>";
            },
        },
        selAttack: {
            unlocked() { return player.ma.attackTimer[2].gt(0) },
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer[2].div(player.ma.cooldown[2])
            },
            fillStyle: {
                "background-color": "#065c19",
            },
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer[2]) + "/" + formatTime(player.ma.cooldown[2]) + "<h5></h5>";
            },
        },
        celestialiteAttack: {
            unlocked() { return player.ma.celestialiteTimer.gte(0) && player.ma.currentCelestialiteType != 5 },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.celestialiteTimer.div(player.ma.celestialiteCooldown)
            },
            fillStyle: {
                "background-color": "rgb(138, 14, 121)",
            },
            display() {
                return "<h5>" + formatTime(player.ma.celestialiteTimer) + "/" + formatTime(player.ma.celestialiteCooldown) + "<h5></h5>";
            },
        },
        respawnBar: {
            unlocked() { return player.ma.currentCelestialiteType == 5 },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.respawnTimer.div(5)
            },
            fillStyle: {
                "background-color": "rgb(138, 14, 121)",
            },
            display() {
                return "<h5>" + formatTime(player.ma.respawnTimer) + "/5s<h5></h5>";
            },
        },

        kresAttack2: {
            unlocked() { return player.ma.attackTimer2[0].gt(0) && hasUpgrade("ma", 12) }, 
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer2[0].div(player.ma.cooldown2[0]);
            },
            fillStyle: {
                "background-color": "#910a27",
            },
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer2[0]) + "/" + formatTime(player.ma.cooldown2[0]) + "<h5></h5>"; 
            },
        },
        navAttack2: {
            unlocked() { return player.ma.attackTimer2[1].gt(0) && hasUpgrade("ma", 12) }, 
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer2[1].div(player.ma.cooldown2[1]);
            },
            fillStyle: {
                "background-color": "#710a91",
            },
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer2[1]) + "/" + formatTime(player.ma.cooldown2[1]) + "<h5></h5>"; 
            },
        },
        selAttack2: {
            unlocked() { return player.ma.attackTimer2[2].gt(0) && hasUpgrade("ma", 13) }, 
            direction: RIGHT,
            width: 100,
            height() { return player.ma.turretDurationLeft && player.ma.turretDurationLeft.gt(0) ? 50 : 100 },
            progress() {
                return player.ma.attackTimer2[2].div(player.ma.cooldown2[2]);
            },
            fillStyle: {
                "background-color": "#065c19",
            },
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer2[2]) + "/" + formatTime(player.ma.cooldown2[2]) + "<h5></h5>"; 
            },
        },
        turretBar: {
            unlocked() { return player.ma.turretDurationLeft && player.ma.turretDurationLeft.gt(0) && hasUpgrade("ma", 13) }, 
            direction: RIGHT,
            width: 100,
            height: 50,
            progress() {
                return player.ma.turretDurationLeft.div(12); // Divide by the total turret duration (12 seconds)
            },
            fillStyle: {
                "background-color": "#065c19",
            },
            display() {
                return "<h5>" + formatWhole(player.ma.turretDurationLeft.mul(2)) + "/24 bullets left<h5></h5>"; // Show remaining time
            },
        },
    },
    upgrades: { 
        //reminder: add upgrade that generates 100% of time cubes or something
        11:
        {
            title: "Kres Upgrade I",
            unlocked() { return true},
            description: "Unlock Kres' second skill.",
            cost: new Decimal("300"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Common Matos Fragments",
            currencyInternalName: "commonMatosFragments",
        },
        12:
        {
            title: "Nav Upgrade I",
            unlocked() { return true},
            description: "Unlock Nav's second skill.",
            cost: new Decimal("80"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Rare Matos Fragments",
            currencyInternalName: "rareMatosFragments",
        },
        13:
        {
            title: "Sel Upgrade I",
            unlocked() { return true},
            description: "Unlock Sel's second skill.",
            cost: new Decimal("5"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Epic Matos Fragments",
            currencyInternalName: "epicMatosFragments",
        },
        14:
        {
            title: "This upgrade should've been here a long time ago...",
            unlocked() { return true},
            description: "Gain 100% of time cubes per second.",
            cost: new Decimal("12"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Epic Matos Fragments",
            currencyInternalName: "epicMatosFragments",
        },
        15:
        {
            title: "Kres Upgrade II",
            unlocked() { return true},
            description: "Kres' pet level boosts his strength and defense.",
            cost: new Decimal("2500"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Common Matos Fragments",
            currencyInternalName: "commonMatosFragments",
            effect() {
                return getLevelableAmount("pet", 404)
            },
            effectDisplay() { return "+" + formatWhole(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        16:
        {
            title: "Nav Upgrade II",
            unlocked() { return true},
            description: "Nav's pet level boosts her strength and agility.",
            cost: new Decimal("300"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Rare Matos Fragments",
            currencyInternalName: "rareMatosFragments",
            effect() {
                return getLevelableAmount("pet", 405)
            },
            effectDisplay() { return "+" + formatWhole(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        17:
        {
            title: "Sel Upgrade II",
            unlocked() { return true},
            description: "Sel's pet level boosts his agility and defense.",
            cost: new Decimal("16"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Epic Matos Fragments",
            currencyInternalName: "epicMatosFragments",
            effect() {
                return getLevelableAmount("pet", 406)
            },
            effectDisplay() { return "+" + formatWhole(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        18:
        {
            title: "New Buyables",
            unlocked() { return player.ma.secondAreaUnlock},
            description: "Unlock new buyables in the stats tab.",
            cost: new Decimal("200"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Rare Matos Fragments",
            currencyInternalName: "rareMatosFragments",
        },
        19:
        {
            title: "New Formula",
            unlocked() { return player.ma.secondAreaUnlock},
            description: "Buff the antimatter formula by ^20.",
            cost: new Decimal("5000"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Common Matos Fragments",
            currencyInternalName: "commonMatosFragments",
        },
        21:
        {
            title: "Replicanti Limit Breaker",
            unlocked() { return player.ma.secondAreaUnlock},
            description: "Replicanti can go beyond 1e308, but is heavily softcapped.",
            cost: new Decimal("15"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Epic Matos Fragments",
            currencyInternalName: "epicMatosFragments",
        },
        22:
        {
            title: "Linking Powerer",
            unlocked() { return player.ma.secondAreaUnlock},
            description: "Boost all types of linking power based on singularity points.",
            cost: new Decimal("400"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Rare Matos Fragments",
            currencyInternalName: "rareMatosFragments",
            effect() {
                return player.s.singularityPoints.add(1).log10().add(1).pow(1.2)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.starmetalAlloy},
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Total Strength Boost"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " total strength to all characters.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " SMA"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.starmetalAlloy},
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Total Defense Boost"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " total defense to all characters.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " SMA"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.starmetalAlloy},
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Total Agility Boost"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " total agility to all characters.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " SMA"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.commonMatosFragments},
            pay(amt) { player.ma.commonMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(0.6) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Total Health Boost"
            },
            display() {
                return "which are boosting all characters' health by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Common Matos Fragments"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.commonMatosFragments},
            pay(amt) { player.ma.commonMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(0.6) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Total Damage Boost"
            },
            display() {
                return "which are boosting all characters' damage by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Common Matos Fragments"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            costBase() { return new Decimal(14) },
            costGrowth() { return new Decimal(1.8) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.commonMatosFragments},
            pay(amt) { player.ma.commonMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(0.5) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Total Speed Boost"
            },
            display() {
                return "which are dividing all characters' cooldowns by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Common Matos Fragments"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ma.commonMatosFragments},
            pay(amt) { player.ma.commonMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return Decimal.pow(2.5, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Singularity Point Boost"
            },
            display() {
                return "which are boosting singularity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Common Matos Fragments"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        21: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ma.rareMatosFragments},
            pay(amt) { player.ma.rareMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(player.in.infinityPoints.plus(1).log10().div(10).pow(0.85)).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity Boost"
            },
            display() {
                return "which are boosting infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (affected by infinity points)\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Rare Matos Fragments"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ma.rareMatosFragments},
            pay(amt) { player.ma.rareMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(4).pow(5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Post-OTF U1 Boost"
            },
            tooltip() {
                return "This includes rage power, time cubes, crystals, steel, pollinators, and charge."
            },
            display() {
                return "which are post-otf U1 currencies by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Rare Matos Fragments"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            costBase() { return new Decimal(9) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.rareMatosFragments},
            pay(amt) { player.ma.rareMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.04).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Starmetal Boost"
            },
            display() {
                return "which are boosting starmetal alloy gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Rare Matos Fragments"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        24: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.rareMatosFragments},
            pay(amt) { player.ma.rareMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.7).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Normality Boost"
            },
            display() {
                return "which are boosting normality gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Rare Matos Fragments"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },



        //other stuff
        101: {
            costBase() { return new Decimal(1e100) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.03).add(1)},
            unlocked() { return hasUpgrade("ma", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Kres Boost"
            },
            display() {
                return "which are boosting Kres' max health and damage by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Singularity Points"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        102: {
            costBase() { return new Decimal(1e100) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.03).add(1)},
            unlocked() { return hasUpgrade("ma", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Nav Boost"
            },
            display() {
                return "which are boosting Nav's max health and damage by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Singularity Points"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        103: {
            costBase() { return new Decimal(1e100) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.03).add(1)},
            unlocked() { return hasUpgrade("ma", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Sel Boost"
            },
            display() {
                return "which are boosting Sel's max health and damage by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Singularity Points"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

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
        t1: {
            title: "Tutorial I",
            body() { return "So... You need help with how all this mumbo jumbo works eh? Don't worry. It's simple. As a matter of fact, it's more simple than other RPGs. If you want a frame of reference, its like NGU Idle's adventure mode but with less complicated stuff and more playable characters. So basically, there are three main stats: strength, defense, and agility. Your strength boosts your attack damage, defense boosts your max health, and agility speeds up your attack cooldowns. That's basically all you need to know for now. It will get more complicated later." },
            unlocked() { return true},

        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return !player.ma.matosUnlock },
                content:
                [
  
                    ["blank", "50px"],
                    ["row", [["clickable", 5]]],
                    ["blank", "50px"],

                    ["row", [["clickable", 6],  ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["clickable", 4],  ["raw-html", function () { return "&nbsp&nbsp" }, { "color": "white", "font-size": "50px", "font-family": "monospace" }],["clickable", 7]]],
                    ["blank", "50px"],
                    ["row", [["clickable", 8]]],
                ]

            },
            "Stats": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content:
                [
  
                    ["blank", "25px"],
                    ["raw-html", function () { return "Character Stats" }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Individual characters can be upgraded once you unlock the epic pet variant)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [
                    ["column", [
                    ["raw-html", function () { return "Kres: Warrior Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Strength: <h3>" + formatWhole(player.ep3.kresStats[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Defense: <h3>" + formatWhole(player.ep3.kresStats[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Agility: <h3>" + formatWhole(player.ep3.kresStats[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }]]],
                    ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                    ["column", [
                    ["raw-html", function () { return "Nav: Mage Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Strength: <h3>" + formatWhole(player.ep4.navStats[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Defense: <h3>" + formatWhole(player.ep4.navStats[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Agility: <h3>" + formatWhole(player.ep4.navStats[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }]]],
                    ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                    ["column", [
                    ["raw-html", function () { return "Sel: Ranger Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Strength: <h3>" + formatWhole(player.ep5.selStats[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Defense: <h3>" + formatWhole(player.ep5.selStats[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Agility: <h3>" + formatWhole(player.ep5.selStats[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }]]],
                    ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                    ["column", [
                        ["raw-html", function () { return "Eclipse: ??? Class" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Strength: <h3>???" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Defense: <h3>???" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Agility: <h3>???" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }]]],
                    ]],
                    ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
        ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
        ["row", [["ex-buyable", 101], ["ex-buyable", 102], ["ex-buyable", 103]]],
    ]

            },
            "Black Heart": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content:
                [
  
                    ["blank", "25px"],
        ["row", [["clickable", 11]]],
        ["blank", "25px"],
        ["raw-html", function () { return "Depth 1 highest combo: <h3>" + formatWhole(player.ma.bestComboDepth1) + "</h3> kills, which boost infinity point gain by x" + format(player.ma.bestComboDepth1Effect) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.ma.secondAreaUnlock ? "Depth 2 highest combo: <h3>" + formatWhole(player.ma.bestComboDepth2) + "</h3> kills, which boost negative infinity point gain by x" + format(player.ma.bestComboDepth2Effect) + "." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
    ]

            },
            "Buyables and Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content:
                [
  
                    ["microtabs", "upg", { 'border-width': '0px' }],

                  ]

            },
            "Info": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content:
                [
  
                    ["blank", "25px"],
                    ["row", [["infobox", "t1"]]],

                ]

            },
            "Prep": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return false },
                content:
                [
  
                    ["blank", "25px"],
        ["raw-html", function () { return "Welcome to the black heart." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You must be prepared to fight my celestialites." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "Now. We must determine if you are truly ready or not." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12], ["clickable", 13], ["clickable", 15]]],
                    ["blank", "25px"],
                    ["row", [
                        ["column", [
                            ["raw-html", function () { return "Kres" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Max Health: <h3>" + format(player.ma.healthMax[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Average Damage: <h3>" + format(player.ma.damage[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Attack Cooldown: <h3>" + formatTime(player.ma.cooldown[0]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }]]],
                            ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                            ["column", [
                            ["raw-html", function () { return "Nav" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Max Health: <h3>" + format(player.ma.healthMax[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Average Damage: <h3>" + format(player.ma.damage[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Attack Cooldown: <h3>" + formatTime(player.ma.cooldown[1]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }]]],
                            ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                            ["column", [
                            ["raw-html", function () { return "Sel" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Max Health: <h3>" + format(player.ma.healthMax[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Average Damage: <h3>" + format(player.ma.damage[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "Attack Cooldown: <h3>" + formatTime(player.ma.cooldown[2]) + " " }, { "color": "white", "font-size": "24px", "font-family": "monospace" }]]],
                        ]],
                ]
            },
            "Fight": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return false },
                content:
                [
  
                    ["blank", "100px"],
                    ["row", [
                    ["column", [
                    ["row", [["clickable", 102]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 101], ["raw-html", function () { return "&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["clickable", 103]]],]],
                    ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                    ["row", [["clickable", 104]]],

                    ]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<hr>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [
                        ["column", [
                            ["raw-html", function () { return "Kres" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["row", [["bar", "kresHealth"]]],
                            ["row", [["bar", "kresAttack"], ["clickable", 201], ["bar", "kresAttack2"], ["clickable", 204]]],
                            ]],
                            ["blank", "25px"],
                    ["column", [
                            ["raw-html", function () { return "Nav" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["row", [["bar", "navHealth"]]],
                            ["row", [["bar", "navAttack"], ["clickable", 202], ["bar", "navAttack2"], ["clickable", 205]]],
                            ]],
                            ["blank", "25px"],
                            ["column", [
                            ["raw-html", function () { return "Sel" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["row", [["bar", "selHealth"]]],
                            ["row", [["bar", "selAttack"], ["clickable", 203],  ["column", [["bar", "selAttack2"], ["bar", "turretBar"]]], ["clickable", 206]]],
                            ]],
                            ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                            ["raw-html", function () { return "<div style=\"border-left: 2px solid white; height: 150px;\"></div>" }],
                            ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                            ["column", [
                            ["raw-html", function () { return player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["row", [["bar", "celestialiteHealth"]]],
                            ["row", [["bar", "celestialiteShield"]]],
                            ["row", [["bar", "celestialiteAttack"],]],
                            ["row", [["bar", "respawnBar"],]],
                    ["blank", "10px"],
                    ["row", [["clickable", 14]]],
    ]],
                            ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                            ["raw-html", function () { return "<div style=\"border-left: 2px solid white; height: 150px;\"></div>" }],
                            ["raw-html", function () { return "&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }],
                            ["raw-html", () => `
                                <div style="width:600px;text-align:center;margin:10px auto;">
                                    ${player.ma.log.map((x, i) => `<span style="display:block;">${x}</span>`).join("")}
                                </div>
                            `],
                    ]],
            ]
            },
            "Dead": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return false },
                content:
                [
  
                    ["blank", "200px"],
                    ["raw-html", function () { return "Everyone has died, how unfortunate." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "I had a gut feeling you would have been able to beat me." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Oh well..." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.commonMatosFragments) + "</h3> common matos fragments." }, { "color": "#9bedff", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.rareMatosFragments) + "</h3> rare matos fragments." }, { "color": "#4e7cff", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.epicMatosFragments) + "</h3> epic matos fragments." }, { "color": "#cb79ed", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.legendaryMatosFragments) + "</h3> legendary matos fragments." }, { "color": "#eed200", "font-size": "24px", "font-family": "monospace" }],
    ],  
            },
        },
        upg: {
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content:
                [
  
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.commonMatosFragments) + "</h3> common matos fragments." }, { "color": "#9bedff", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.rareMatosFragments) + "</h3> rare matos fragments." }, { "color": "#4e7cff", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.epicMatosFragments) + "</h3> epic matos fragments." }, { "color": "#cb79ed", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.legendaryMatosFragments) + "</h3> legendary matos fragments." }, { "color": "#eed200", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17]]],
        ["row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24],]],
    ]

            },
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content:
                [
  
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.commonMatosFragments) + "</h3> common matos fragments." }, { "color": "#9bedff", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.rareMatosFragments) + "</h3> rare matos fragments." }, { "color": "#4e7cff", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.epicMatosFragments) + "</h3> epic matos fragments." }, { "color": "#cb79ed", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ma.legendaryMatosFragments) + "</h3> legendary matos fragments." }, { "color": "#eed200", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13],["upgrade", 14],  ["upgrade", 15], ["upgrade", 16],["upgrade", 17],]],
                    ["row", [["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22],]],
    ]

            },
        },
    }, 

    tabFormat: [

        ["raw-html", function () { return !player.ma.inBlackHeart ? "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.le.punchcardsUnlocked[15]  }
})
function logPrint(line) {
    player.ma.log.push(line); // Push the raw HTML string directly
    if (player.ma.log.length > 10) player.ma.log.shift(); // Ensure log size remains consistent
}