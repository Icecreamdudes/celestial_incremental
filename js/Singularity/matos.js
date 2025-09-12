addLayer("ma", {
    name: "Matos, Celestial of Machinery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⊘", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        maMax: false,

        matosUnlock: false,
        hasMaxStrengthCore: false,
        matosUnlockConditions: [false, false, false, false],
        matosUnlockConditionCount: 0,

        inBlackHeart: false,

        eclipseStats: [new Decimal(0), new Decimal(0), new Decimal(0)], // Eclipse stats, 0 - damage, 1 - health, 2 - cooldown

        //character stats
        // 0 - Kres, 1 - Nav, 2 - Sel, 3 - Eclipse
        health: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        healthMax: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        damage: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        cooldown: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        attackTimer: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        healthRegen: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        selectedCharacters: [true, true, true, false],
        charactersSelected: 3, // How many characters are selected, max is 3

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
        deadCharacters: [false, false, false, false],

        //second skill
        cooldown2: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        attackTimer2: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        turretDurationLeft: new Decimal(0), // Initialize turret duration left as 0
        motivationCount: new Decimal(0),
        motivationEffect: new Decimal(1),

        //third skill
        cooldown3: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        attackTimer3: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        teamBuffDuration: new Decimal(0),
        curseSpellDuration: new Decimal(0),
        energyBoostDuration: new Decimal(0),
        energyBoostSelected: new Decimal(0),

        //currencies
        commonMatosFragments: new Decimal(0),
        rareMatosFragments: new Decimal(0),
        epicMatosFragments: new Decimal(0),
        legendaryMatosFragments: new Decimal(0),
        matosFragmentMult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],

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
        stealthyCelestialite: false,
        cursedCelestialite: false,
        explosiveCelestialite: false,
        matos: false,

        //add something kill combo related
        combo: new Decimal(0),
        bestComboDepth1: new Decimal(0),
        bestComboDepth1Effect: new Decimal(1),
        bestComboDepth1Effect2: new Decimal(1),
        bestComboDepth2: new Decimal(0),
        bestComboDepth2Effect: new Decimal(1),
        bestComboDepth2Effect2: new Decimal(1),
        bestComboDepth3: new Decimal(0),
        bestComboDepth3Effect: new Decimal(1),
        bestComboDepth3Effect2: new Decimal(1),

        //kept kill combo percentage
        keptCombo: [new Decimal(0), new Decimal(0), new Decimal(0)],

        //cooldowns
        depth1Cooldown: new Decimal(0), 
        depth1CooldownMax: new Decimal(300), 
        depth2Cooldown: new Decimal(0), 
        depth2CooldownMax: new Decimal(600), 
        depth3Cooldown: new Decimal(0), 
        depth3CooldownMax: new Decimal(900), 

        //matos bossfight
        omegaCelestialitesKilled: new Decimal(0),
        matosFightActive: false,

        matosToggle: true,

        attacksDone: new Decimal(0),

        matosDefeated: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #8a0e79 0%, #a80c33 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#350813",
            color: "rgb(0, 0, 0)",
        };
    },
    tooltip: "Matos, Celestial of Machinery",
    branches: ["sma",],
    color: "#8a0e79",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ma.eclipseStats = [
            new Decimal(25),
            new Decimal(25),
            new Decimal(25),
        ]

        for (let prop in player.co.cores) {
            if (player.co.cores[prop].strength == 4) {
                player.ma.hasMaxStrengthCore = true
            }
        }

        // Add this at the start of the update(delta) function, after let onepersec = new Decimal(1)
        for (let i = 0; i < player.ma.deadCharacters.length; i++) {
            if  (!player.ma.selectedCharacters[i]) {
                player.ma.deadCharacters[i] = true;
            }
        }

        player.ma.healthMax[0] = player.ep3.kresStats[1].add(60)
        player.ma.damage[0] = player.ep3.kresStats[0].mul(0.2).add(5)
        player.ma.cooldown[0] = Decimal.div(8, player.ep3.kresStats[2].mul(0.01).add(1))
        player.ma.cooldown2[0] = Decimal.div(20, player.ep3.kresStats[2].mul(0.005).add(1))
        player.ma.cooldown3[0] = Decimal.div(25, player.ep3.kresStats[2].mul(0.008).add(1))

        player.ma.healthMax[1] = player.ep4.navStats[1].add(30)
        player.ma.damage[1] = player.ep4.navStats[0].mul(0.2).add(7)
        player.ma.cooldown[1] = Decimal.div(6, player.ep4.navStats[2].mul(0.01).add(1))
        player.ma.cooldown2[1] = Decimal.div(15, player.ep4.navStats[2].mul(0.005).add(1))
        player.ma.cooldown3[1] = Decimal.div(30, player.ep4.navStats[2].mul(0.008).add(1))

        player.ma.healthMax[2] = player.ep5.selStats[1].add(45)
        player.ma.damage[2] = player.ep5.selStats[0].mul(0.2).add(3)
        player.ma.cooldown[2] = Decimal.div(4, player.ep5.selStats[2].mul(0.01).add(1))
        player.ma.cooldown2[2] = Decimal.div(30, player.ep5.selStats[2].mul(0.01).add(1))
        player.ma.cooldown3[2] = Decimal.div(20, player.ep5.selStats[2].mul(0.008).add(1))

        player.ma.eclipseStats = [new Decimal(25),new Decimal(25),new Decimal(25),]
        player.ma.eclipseStats[0] = player.ma.eclipseStats[0].add(buyableEffect("ma", 201))
        player.ma.eclipseStats[1] = player.ma.eclipseStats[1].add(buyableEffect("ma", 202))
        player.ma.eclipseStats[2] = player.ma.eclipseStats[2].add(buyableEffect("ma", 203))

        if (player.pet.levelables[501][0].gte(1))
        {
            player.ma.healthMax[3] = player.ma.eclipseStats[1].add(50)
            player.ma.damage[3] = player.ma.eclipseStats[0].mul(0.04).add(1)
            player.ma.cooldown[3] = Decimal.div(5, player.ma.eclipseStats[2].mul(0.01).add(1))
            //player.ma.cooldown2[3] = Decimal.div(15, player.ma.eclipseStats[2].mul(0.005).add(1))
            //player.ma.cooldown3[3] = Decimal.div(30, player.ma.eclipseStats[2].mul(0.008).add(1))
        } else
        {
            player.ma.healthMax[3] = new Decimal(0)
            player.ma.damage[3] = new Decimal(0)
            player.ma.cooldown[3] = new Decimal(0)
            player.ma.cooldown2[3] = new Decimal(0)
            player.ma.cooldown3[3] = new Decimal(0)
        }

        player.ma.damage[0] = player.ma.damage[0].mul(buyableEffect("ma", 101))
        player.ma.damage[1] = player.ma.damage[1].mul(buyableEffect("ma", 102))
        player.ma.damage[2] = player.ma.damage[2].mul(buyableEffect("ma", 103))
        player.ma.damage[3] = player.ma.damage[3].mul(buyableEffect("ma", 103))

        player.ma.healthMax[0] = player.ma.healthMax[0].mul(buyableEffect("ma", 101))
        player.ma.healthMax[1] = player.ma.healthMax[1].mul(buyableEffect("ma", 102))
        player.ma.healthMax[2] = player.ma.healthMax[2].mul(buyableEffect("ma", 103))
        player.ma.healthMax[3] = player.ma.healthMax[3].mul(buyableEffect("ma", 103))

        player.ma.healthRegen[0] = buyableEffect("ma", 35)
        player.ma.healthRegen[1] = buyableEffect("ma", 36)
        player.ma.healthRegen[2] = buyableEffect("ma", 37)
        player.ma.healthRegen[3] = buyableEffect("ma", 38)


        player.ma.motivationEffect = player.ma.motivationCount.pow(0.5).mul(0.02).add(1)

        for (let i = 0; i < player.ma.damage.length; i++) {
            if (player.ma.teamBuffDuration.gt(0))
            {
                player.ma.damage[i] = player.ma.damage[i].mul(1.5)
            }
            player.ma.damage[i] = player.ma.damage[i].mul(player.ma.motivationEffect)
        }

        if (player.ma.energyBoostDuration.gt(0)) {
            player.ma.cooldown[player.ma.energyBoostSelected] = player.ma.cooldown[player.ma.energyBoostSelected].div(2) 
            player.ma.cooldown2[player.ma.energyBoostSelected] = player.ma.cooldown2[player.ma.energyBoostSelected].div(2) 
            player.ma.cooldown3[player.ma.energyBoostSelected] = player.ma.cooldown3[player.ma.energyBoostSelected].div(2) 
        }


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
            "<img src='resources/omicronMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/piMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/rhoMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/sigmaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/tauMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/upsilonMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/phiMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/chiMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/psiMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/omegaMatos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/matos.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
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
            //stealthy celestialites - only sel can attack them and there is a 15% chance he can break the seal
            "Omicron",
            "Pi",
            "Rho",
            //cursed celestialites - there is a 50% chance the character will deal the damage dealt to the celestialite, and there is a 10% chance nav can remove the celestialites ability to curse
            "Sigma",
            "Tau",
            "Upsilon",
            //explosive celestialites - they will explode when they die, dealing 20% of their max health to all characters
            "Phi",
            "Chi",
            "Psi",
            //Matos' minion
            "Omega",
            //matos (even though not a celestialite)
            "Matos"
        ]
        player.ma.characterIcons = [
            "<img src='resources/kres.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/nav.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/sel.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/eclipse.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        ]
        player.ma.characterNames = [
            "Kres",
            "Nav",
            "Sel",
            "Eclipse",
        ]

        //timers
        for (let i = 0; i < player.ma.attackTimer.length; i++) {
            if (player.ma.attackTimer[i].gt(0)) {
                if (player.ma.fightingCelestialites) player.ma.attackTimer[i] = player.ma.attackTimer[i].sub(onepersec.mul(delta))
            }
            if (player.ma.attackTimer2[i].gt(0)) {
                if (player.ma.fightingCelestialites) player.ma.attackTimer2[i] = player.ma.attackTimer2[i].sub(onepersec.mul(delta))
            }
            if (player.ma.attackTimer3[i].gt(0)) {
                if (player.ma.fightingCelestialites) player.ma.attackTimer3[i] = player.ma.attackTimer3[i].sub(onepersec.mul(delta))
            }
        }
        player.ma.teamBuffDuration = player.ma.teamBuffDuration.sub(onepersec.mul(delta))
        player.ma.curseSpellDuration = player.ma.curseSpellDuration.sub(onepersec.mul(delta))
        player.ma.energyBoostDuration = player.ma.energyBoostDuration.sub(onepersec.mul(delta))
        if (player.ma.currentCelestialiteType != 5 && player.ma.fightingCelestialites) player.ma.celestialiteTimer = player.ma.celestialiteTimer.sub(onepersec.mul(delta))
        if (player.ma.currentCelestialiteType == 5 && player.ma.fightingCelestialites) player.ma.respawnTimer = player.ma.respawnTimer.sub(onepersec.mul(delta))

        player.ma.depth1Cooldown = player.ma.depth1Cooldown.sub(onepersec.mul(delta))
        player.ma.depth2Cooldown = player.ma.depth2Cooldown.sub(onepersec.mul(delta))
        player.ma.depth3Cooldown = player.ma.depth3Cooldown.sub(onepersec.mul(delta))

        player.ma.depth1CooldownMax = new Decimal(300)
        player.ma.depth2CooldownMax = new Decimal(600)
        player.ma.depth3CooldownMax = new Decimal(900)

        if (player.subtabs["ma"]["stuff"] == "Bullet Hell")
        {
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown;
        }
        if (player.ma.celestialiteTimer.lt(0) && player.subtabs["ma"]["stuff"] != "Bullet Hell") {
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
                if (player.ma.currentCelestialiteType == 25) damage = new Decimal(8)
            
                if (player.ma.curseSpellDuration.gt(0)) {
                    player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(damage);
                    if (player.ma.currentCelestialiteType != 25) logPrint("<span style='color: hsl(308, 81.70%, 30.00%);'>The " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite is cursed, dealing " + format(damage) + " self damage.");
                    if (player.ma.currentCelestialiteType == 25) logPrint("<span style='color: rgb(139, 14, 52);'>Matos is cursed, dealing " + format(damage) + " self damage.");
                    if (player.ma.cursedCelestialite) {
                    // 30% chance to reflect damage to attacker
                    if (Math.random() < 0.3) {
                    player.ma.health[character] = player.ma.health[character].sub(damage);
                    logPrint(
                    "<span style='color: hsl(308, 81.70%, 30.00%);'>Cursed celestialite reflects " +
                    format(damage) +
                    " damage back to " +
                    player.ma.characterNames[character] +
                    "! (Double curse lmao)</span>"
                     );
                }
                }
                }
                player.ma.health[character] = player.ma.health[character].sub(damage);
                if (player.ma.currentCelestialiteType != 25) { logPrint(
                    "<span style='color: hsl(308, 81.70%, 30.00%);'>The " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite attacks " + player.ma.characterNames[character] + " for " +format(damage) + " damage."
                ); }
                if (player.ma.currentCelestialiteType == 25) { logPrint(
                    "<span style='color:rgb(139, 14, 52);'>Matos attacks " + player.ma.characterNames[character] + " for " +format(damage) + " damage."
                ); }
            }
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown;
        }
        if (player.ma.respawnTimer.lt(0) && player.ma.currentCelestialiteType == 5)
        {
            layers.ma.generateCelestialite()
            player.ma.respawnTimer = new Decimal(-1e100)
        }
        if (player.ma.celestialiteHealth.lt(0) && player.ma.currentCelestialiteType != 25) {
            if (player.ma.currentCelestialiteType != 25) logPrint("The " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite died!")
            if (player.ma.currentCelestialiteType == 25) logPrint("Matos has been defeated!")

            layers.ma.lootCelestialite()
            player.ma.celestialiteHealth = new Decimal(0)
            player.ma.shieldMaxHealth = new Decimal(0)
            player.ma.regenRate = new Decimal(0)
            player.ma.respawnTimer = new Decimal(5)
            player.ma.currentCelestialiteType = 5
            player.ma.combo = player.ma.combo.add(1)

                    // --- EXPLOSIVE CELESTIALITES (Phi, Chi, Psi, Omega: types 21, 22, 23, 25) ---
        // Place this in lootCelestialite() after a celestialite dies:
        if (player.ma.explosiveCelestialite) 
            {
            // Random explosion damage between 10% and 15% of max health
let explosionPercent = 0.10 + Math.random() * 0.05;
for (let i = 0; i < player.ma.health.length; i++) {
    if (!player.ma.deadCharacters[i]) {
        let explosionDmg = player.ma.healthMax[i].mul(explosionPercent);
        player.ma.health[i] = player.ma.health[i].sub(explosionDmg);
        logPrint(
            "<span style='color:rgb(238, 135, 0);'>Explosion! " +
            player.ma.characterNames[i] +
            " takes " +
            format(explosionDmg) +
            " damage!</span>"
        );
    }
}
        }
        }
        if (player.ma.currentDepth.eq(1) && player.ma.combo.gt(player.ma.bestComboDepth1)) {
            player.ma.bestComboDepth1 = player.ma.combo
            logPrint("Your new highest combo for depth 1 is " + player.ma.bestComboDepth1 + "!")
        }
        if (player.ma.currentDepth.eq(2) && player.ma.combo.gt(player.ma.bestComboDepth2)) {
            player.ma.bestComboDepth2 = player.ma.combo
            logPrint("Your new highest combo for depth 2 is " + player.ma.bestComboDepth2 + "!")
        }
        if (player.ma.currentDepth.eq(3) && player.ma.combo.gt(player.ma.bestComboDepth3)) {
            player.ma.bestComboDepth3 = player.ma.combo
            logPrint("Your new highest combo for depth 3 is " + player.ma.bestComboDepth3 + "!")
        }
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
        if (player.ma.health[3].lt(0) && !player.ma.deadCharacters[3]) {
            player.ma.deadCharacters[3] = true
            logPrint("<span style='color: hsl(44, 76.70%, 40.40%);'>Eclipse has died!")
        }

        if (player.ma.deadCharacters[0] && player.ma.deadCharacters[1] && player.ma.deadCharacters[2] && player.ma.deadCharacters[3] && player.subtabs["ma"]["stuff"] == "Fight") {
            player.subtabs["ma"]["stuff"] = "Dead"

            for (let i = 0; i < player.ma.deadCharacters.length; i++) 
            {
                player.ma.health[i] = player.ma.healthMax[i]
                player.ma.deadCharacters[i] = false
            }

            player.ma.fightingCelestialites = false
            player.ma.currentDepth = new Decimal(0)
            player.ma.combo = new Decimal(0)
            player.ma.currentCelestialiteType = new Decimal(0)

            player.ma.attacksDone = new Decimal(0)
            player.ma.epsilonCelestialitesKilled = new Decimal(0)
            player.ma.omegaCelestialitesKilled = new Decimal(0)
            player.ma.motivationCount  = new Decimal(0)
            player.ma.matosFightActive = false
        }
        if (player.ma.epsilonCelestialitesKilled.gte(5) && !player.ma.secondAreaUnlock)
        {
            player.ma.secondAreaUnlock = true
            logPrint("<span style='color: white;'>You have killed 5 epsilon celestialites! The next depth is now unlocked!")
        }
        if (player.ma.omegaCelestialitesKilled.gte(5))
        {
            player.ma.matosFightActive = true
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
        } else
        {
            player.ma.shieldCelestialite = false
            player.ma.shieldHealth = new Decimal(0)
            player.ma.shieldMaxHealth = new Decimal(0)

        }
        if (player.ma.currentCelestialiteType == 15 || player.ma.currentCelestialiteType == 16 || player.ma.currentCelestialiteType == 17)
        {
            player.ma.stealthyCelestialite = true
        }  else
        {
            player.ma.stealthyCelestialite = false
        }
        if (player.ma.currentCelestialiteType == 18 || player.ma.currentCelestialiteType == 19 || player.ma.currentCelestialiteType == 20)
        {
            player.ma.cursedCelestialite = true
        }  else
        {
            player.ma.cursedCelestialite = false
        }
        if (player.ma.currentCelestialiteType == 21 || player.ma.currentCelestialiteType == 22 || player.ma.currentCelestialiteType == 23)
        { 
            player.ma.explosiveCelestialite = true
        } else
        {
            player.ma.explosiveCelestialite = false
        }
        player.ma.celestialiteHealth = player.ma.celestialiteHealth.add(player.ma.regenRate.mul(delta))
        if (player.ma.celestialiteHealth.gt(player.ma.celestialiteMaxHealth)) {
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
        }

        player.ma.bestComboDepth1Effect = Decimal.pow(3, player.ma.bestComboDepth1)
        if (hasMilestone("ma", 104)) player.ma.bestComboDepth1Effect = Decimal.pow(3.6, player.ma.bestComboDepth1)
        player.ma.bestComboDepth2Effect = Decimal.pow(2, player.ma.bestComboDepth2)
        if (hasMilestone("ma", 204)) player.ma.bestComboDepth2Effect = Decimal.pow(2.3, player.ma.bestComboDepth2)
        player.ma.bestComboDepth3Effect = Decimal.pow(1.15, player.ma.bestComboDepth3)
        if (hasMilestone("ma", 304)) player.ma.bestComboDepth3Effect = Decimal.pow(1.2, player.ma.bestComboDepth3)

        player.ma.bestComboDepth1Effect2 = new Decimal(1)
        if (hasMilestone("ma", 102)) player.ma.bestComboDepth1Effect2 = player.ma.bestComboDepth1.mul(0.01).max(1)
        player.ma.bestComboDepth2Effect2 = new Decimal(1)
        if (hasMilestone("ma", 202)) player.ma.bestComboDepth2Effect2 = player.ma.bestComboDepth2.mul(0.01).max(1).pow(0.9)
        player.ma.bestComboDepth3Effect2 = new Decimal(1)
        if (hasMilestone("ma", 302)) player.ma.bestComboDepth3Effect2 = player.ma.bestComboDepth3.mul(0.01).max(1).pow(0.8)

        //Kept code
        player.ma.keptCombo[0] = new Decimal(0.1)
        if (hasMilestone("ma", 103)) player.ma.keptCombo[0] = player.ma.keptCombo[0].add(0.15)
        if (hasMilestone("ma", 105)) player.ma.keptCombo[0] = player.ma.keptCombo[0].add(0.20)
        if (hasMilestone("ma", 107)) player.ma.keptCombo[0] = player.ma.keptCombo[0].add(0.25)
        if (hasMilestone("ma", 109)) player.ma.keptCombo[0] = player.ma.keptCombo[0].add(0.30)

        player.ma.keptCombo[1] = new Decimal(0.1)
        if (hasMilestone("ma", 203)) player.ma.keptCombo[1] = player.ma.keptCombo[1].add(0.15)
        if (hasMilestone("ma", 205)) player.ma.keptCombo[1] = player.ma.keptCombo[1].add(0.20)
        if (hasMilestone("ma", 207)) player.ma.keptCombo[1] = player.ma.keptCombo[1].add(0.25)
        if (hasMilestone("ma", 209)) player.ma.keptCombo[1] = player.ma.keptCombo[1].add(0.30)

        player.ma.keptCombo[2] = new Decimal(0.1)
        if (hasMilestone("ma", 303)) player.ma.keptCombo[2] = player.ma.keptCombo[2].add(0.15)
        if (hasMilestone("ma", 305)) player.ma.keptCombo[2] = player.ma.keptCombo[2].add(0.20)
        if (hasMilestone("ma", 307)) player.ma.keptCombo[2] = player.ma.keptCombo[2].add(0.25)
        if (hasMilestone("ma", 309)) player.ma.keptCombo[2] = player.ma.keptCombo[2].add(0.30)

        // Fragment Multipliers
        player.ma.matosFragmentMult[0] = new Decimal(1)
        player.ma.matosFragmentMult[0] = player.ma.matosFragmentMult[0].mul(player.ma.bestComboDepth1Effect2)

        player.ma.matosFragmentMult[1] = new Decimal(1)
        player.ma.matosFragmentMult[1] = player.ma.matosFragmentMult[1].mul(player.ma.bestComboDepth2Effect2)

        player.ma.matosFragmentMult[2] = new Decimal(1)
        player.ma.matosFragmentMult[2] = player.ma.matosFragmentMult[2].mul(player.ma.bestComboDepth3Effect2)
        
        player.ma.matosFragmentMult[3] = new Decimal(1)
        if (hasMilestone("ma", 108)) player.ma.matosFragmentMult[3] = player.ma.matosFragmentMult[3].mul(2)
        if (hasMilestone("ma", 208)) player.ma.matosFragmentMult[3] = player.ma.matosFragmentMult[3].mul(2)
        if (hasMilestone("ma", 308)) player.ma.matosFragmentMult[3] = player.ma.matosFragmentMult[3].mul(2)

        //eclipse
        if (
            player.ma.selectedCharacters[3] &&
            !player.ma.deadCharacters[3] &&
            player.ma.currentCelestialiteType != 5 &&
            player.ma.fightingCelestialites
        ) {
            // Drain from shield if present, otherwise from health
            if (player.ma.shieldHealth && player.ma.shieldHealth.gt(0) && player.ma.shieldCelestialite) {
                player.ma.shieldHealth = player.ma.shieldHealth.sub(player.ma.damage[3].mul(delta));
                if (player.ma.shieldHealth.lt(0)) player.ma.shieldHealth = new Decimal(0);
            } else {
                player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(player.ma.damage[3].mul(delta));
            }
        }

       if (player.tab == "c")
       {
            player.ma.health[0] = player.ma.healthMax[0]
            player.ma.health[1] = player.ma.healthMax[1]
            player.ma.health[2] = player.ma.healthMax[2]
            player.ma.health[3] = player.ma.healthMax[3]
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
       }
        if (player.ma.inBlackHeart)
        {
        player.ma.health[0] = player.ma.health[0].add(player.ma.healthRegen[0].mul(delta))
        player.ma.health[1] = player.ma.health[1].add(player.ma.healthRegen[1].mul(delta))
        player.ma.health[2] = player.ma.health[2].add(player.ma.healthRegen[2].mul(delta))
        player.ma.health[3] = player.ma.health[3].add(player.ma.healthRegen[3].mul(delta))
        }

        for (let i = 0; i < player.ma.health.length; i++) {
        if (player.ma.health[i].gt(player.ma.healthMax[i])) {
            player.ma.health[i] = player.ma.healthMax[i].plus(0);
        }
        }    

        if (player.ma.matosFightActive && player.ma.currentCelestialiteType == 25)
        {
            if (player.ma.celestialiteHealth.lt(7000) && player.ma.attacksDone.eq(0))   
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("This is what Nova wanted all along!", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    whiteDiamondAttack(10, 700, 500, 2)
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(6500) && player.ma.attacksDone.eq(1))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("He is our lord. He will save us all from this torture.", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    bulletRainAttack(12, 700, 500, 10)
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(6000) && player.ma.attacksDone.eq(2))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("Once he comes back, so will civilization!", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    movingCircleRadialBurstAttack(12, 700, 500, 1200, 18, 6, 5)
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(5500) && player.ma.attacksDone.eq(3))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("And it is too late for you guys... I have enough power!", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    knifeThrowAttack(15, 500, 300, 1.2)
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(5000) && player.ma.attacksDone.eq(4))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("I can bring Nova and the Novasent back!", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    bouncingDiamondsAttack(15, 700, 500, 6, 3);
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(4500) && player.ma.attacksDone.eq(5))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("Our great civilization will fluorish! The sun will shine! The sky will be clear!", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    layers.ma.generatePhase1Attack()
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(4000) && player.ma.attacksDone.eq(6))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("My hopes. My dreams. They will all become true.", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    layers.ma.generatePhase1Attack()
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(3500) && player.ma.attacksDone.eq(7))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("NOVA WILL SAVE US ALL.", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    radialKnifeBurstAttack(12, 500, 500, 1500, 5, 8);
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(3000) && player.ma.attacksDone.eq(8))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("NOVA WILL BRING US PEACE.", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    knifeRainAttack(duration = 15, width = 700, height = 500, knifeRate = 1.5, bulletRate = 7)
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(2500) && player.ma.attacksDone.eq(9))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("NOVA WILL BRING US GLORY.", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    mazeAttack(15, 750, 500, 50)
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(2000) && player.ma.attacksDone.eq(10))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("NOVA WILL BRING US GREATNESS.", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    shiftingKnifeArenaAttack(duration = 15, arenaW = 300, arenaH = 300, knifeRate = 2, borderW = 1000, borderH = 500)
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(1500) && player.ma.attacksDone.eq(11))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("Nova will....", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    bombExplosionAttack()
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(1000) && player.ma.attacksDone.eq(12))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("Nova will.......", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    layers.ma.generatePhase2Attack()
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(500) && player.ma.attacksDone.eq(13))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("looks like my time is up...", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    layers.ma.generatePhase2Attack()
                }, 3000)
                }
                player.ma.attacksDone = player.ma.attacksDone.add(1)
            }
            if (player.ma.celestialiteHealth.lt(50) && player.ma.attacksDone.eq(14))
            {
                player.ma.celestialiteTimer = player.ma.celestialiteCooldown
                flashScreen("BUT I CAN'T LET YOU GUYS CONTINUE", 3000)
                if (player.subtabs["ma"]["stuff"] != "Bullet Hell") {
                setTimeout(() => {
                    ultimateAttackSequence();
                }, 3000)
                player.ma.attacksDone = player.ma.attacksDone.add(1)
                }
                setTimeout(() => {
                    if (player.subtabs["ma"]["stuff"] == "Bullet Hell" && player.ma.currentCelestialiteType == 25)
                    {
                                    player.ma.matosDefeated = true
                                    player.ma.inBlackHeart = false
                                    player.ma.matosFightActive = false
                        for (let i = 0; i < player.ma.deadCharacters.length; i++) 
            {
                player.ma.health[i] = player.ma.healthMax[i]
                player.ma.deadCharacters[i] = false
            }
            player.ma.fightingCelestialites = false
            player.ma.currentDepth = new Decimal(0)
            player.ma.combo = new Decimal(0)

            player.ma.attacksDone = new Decimal(0)
            player.ma.epsilonCelestialitesKilled = new Decimal(0)
            player.ma.omegaCelestialitesKilled = new Decimal(0)
            player.ma.motivationCount  = new Decimal(0)
            player.ma.matosFightActive = false

           player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(Decimal.mul(700, player.ma.matosFragmentMult[0]))
           player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(Decimal.mul(300, player.ma.matosFragmentMult[1]))
           player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(Decimal.mul(50, player.ma.matosFragmentMult[2]))
           player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(Decimal.mul(5, player.ma.matosFragmentMult[3]))

           player.subtabs["ma"]["stuff"] = "Win"
                    }
                }, 54000)
            }
        }
    },
    generatePhase1Attack(){
        let random = Math.random()
        if (random < 0.2) {
            whiteDiamondAttack(10, 700, 500, 2)
        } else if (random > 0.2 && random < 0.4)
        {
            bulletRainAttack(12, 700, 500, 10)
        } else if (random > 0.4 && random < 0.6)
        {
            movingCircleRadialBurstAttack(12, 700, 500, 1200, 18, 6, 5)
        } else if (random > 0.6 && random < 0.7)
        {
            knifeThrowAttack(15, 500, 300, 1.2)
        } else 
        {
            bouncingDiamondsAttack(15, 700, 500, 6, 3);
        }
    },
    generatePhase2Attack(){
        let random = Math.random()
        if (random < 0.2) {
            radialKnifeBurstAttack(12, 500, 500, 1500, 5, 8);
        } else if (random > 0.2 && random < 0.4)
        {
            knifeRainAttack(duration = 15, width = 700, height = 500, knifeRate = 1.5, bulletRate = 7)
        } else if (random > 0.4 && random < 0.6)
        {
            mazeAttack(15, 750, 500, 50)
        } else if (random > 0.6 && random < 0.7)
        {
            shiftingKnifeArenaAttack(duration = 15, arenaW = 300, arenaH = 300, knifeRate = 2, borderW = 1000, borderH = 500)
        } else 
        {
            bombExplosionAttack()
        }
    },
    resetFightCooldown() {
        player.ma.depth1Cooldown = new Decimal(0)
        player.ma.depth2Cooldown = new Decimal(0)
        player.ma.depth3Cooldown = new Decimal(0)
    },
    clickables: {
        4: {
            title() { return "<h2>" + player.ma.matosUnlockConditionCount + "/4<br><h1 style='font-size: 80px;'>⊘</h1>" }, // Increased font size
            canClick() { return player.ma.matosUnlockConditions[0] && player.ma.matosUnlockConditions[1] && player.ma.matosUnlockConditions[2] && player.ma.matosUnlockConditions[3] },
            unlocked() { return true },
            onClick() {
                player.ma.matosUnlock = true
            },
            style: {width: "175px", minHeight: "175px", border: "5px solid #8a0e79", borderRadius: "15px"},
        },
        5: {
            title() {
                return !player.ma.matosUnlockConditions[0] ? "<h2>Max Strength Core</h2>" : "<h1>YOU"
            },
            canClick() { return player.ma.hasMaxStrengthCore == true && player.ma.matosUnlockConditions[0] == false },
            unlocked() { return true },
            onClick() {
                player.ma.matosUnlockConditions[0] = true
                player.ma.matosUnlockConditionCount += 1
            },
            style() {
                let look = {width: "150px", minHeight: "150px", border: "5px solid #8a0e79", borderRadius: "15px"}
                if (player.ma.matosUnlockConditions[0]) {
                    look.backgroundColor = "#45073c"
                    look.color = "white"
                    look.cursor = "default"
                } else if (this.canClick()) {look.backgroundColor = "#8a0e79"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
            branches: [[4, "#8a0e79"]]
        },
        6: {
            title() {
                return !player.ma.matosUnlockConditions[1] ? "<h2>Check Back Level</h2><br>" + formatShortWhole(player.cb.level) + "/20,000" : "<h1>HAVE"
            },
            canClick() { return player.cb.level.gte(20000) && player.ma.matosUnlockConditions[1] == false },
            unlocked: true,
            onClick() {
                player.ma.matosUnlockConditions[1] = true
                player.ma.matosUnlockConditionCount += 1
            },
            style() {
                let look = {width: "150px", minHeight: "150px", border: "5px solid #8a0e79", borderRadius: "15px"}
                if (player.ma.matosUnlockConditions[1]) {
                    look.backgroundColor = "#45073c"
                    look.color = "white"
                    look.cursor = "default"
                } else if (this.canClick()) {look.backgroundColor = "#8a0e79"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
            branches: [[4, "#8a0e79"]]
        },
        7: {
            title() { return !player.ma.matosUnlockConditions[2] ? "<h2>Replicanti Points</h2><br>" + formatWhole(player.cp.replicantiPoints) + "/1e280" : "<h1>BEEN" },
            canClick() { return player.cp.replicantiPoints.gte(1e280) && player.ma.matosUnlockConditions[2] == false },
            unlocked() { return true },
            onClick() {
                player.ma.matosUnlockConditions[2] = true
                player.ma.matosUnlockConditionCount += 1
            },
            style() {
                let look = {width: "150px", minHeight: "150px", border: "5px solid #8a0e79", borderRadius: "15px"}
                if (player.ma.matosUnlockConditions[2]) {
                    look.backgroundColor = "#45073c"
                    look.color = "white"
                    look.cursor = "default"
                } else if (this.canClick()) {look.backgroundColor = "#8a0e79"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
            branches: [[4, "#8a0e79"]]
        },
        8: {
            title() { return !player.ma.matosUnlockConditions[3] ? "<h2>Points</h2><br>" + formatWhole(player.points) + "<br>/1e300,000" : "<h1>WARNED" },
            canClick() { return player.points.gte("1e300000") && player.ma.matosUnlockConditions[3] == false },
            unlocked() { return true },
            onClick() {
                player.ma.matosUnlockConditions[3] = true
                player.ma.matosUnlockConditionCount += 1
            },
            style() {
                let look = {width: "150px", minHeight: "150px", border: "5px solid #8a0e79", borderRadius: "15px"}
                if (player.ma.matosUnlockConditions[3]) {
                    look.backgroundColor = "#45073c"
                    look.color = "white"
                    look.cursor = "default"
                } else if (this.canClick()) {look.backgroundColor = "#8a0e79"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
            branches: [[4, "#8a0e79"]]
        },
        11: {
            title() { return "<h1>Enter the black heart" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ma.combo = new Decimal(0)
                player.ma.inBlackHeart = true

                player.subtabs["ma"]["stuff"] = "Prep"
            },
            style: {width: "400px", minHeight: "150px", color: "white", backgroundColor: "black", border: "3px solid #8a0e79", borderRadius: "20px"},
        },
        12: {
            title() { return "<h2>Leave the black heart" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ma.inBlackHeart = false

                player.subtabs["ma"]["stuff"] = "Black Heart"
            },
            style() {
                let look = {width: "200px", minHeight: "75px", color: "white", backgroundColor: "black", border: "3px solid #8a0e79", margin: "-1.5px"}
                if (player.subtabs["ma"]["stuff"] == "Dead" || player.subtabs["ma"]["stuff"] == "Win") {look.borderRadius = "20px"} else {look.borderRadius = "20px 0 0 20px"}
                return look
            },
        },
        13: {
            title() { return player.ma.depth1Cooldown.lt(0) ? "<h2>Enter Depth 1" : "<h2>Cooldown: " + formatTime(player.ma.depth1Cooldown) },
            canClick() { return player.ma.depth1Cooldown.lt(0) },
            unlocked() { return true },
            onClick() {
                player.subtabs["ma"]["stuff"] = "Fight"
                player.ma.fightingCelestialites = true

                for (let i = 0; i < player.ma.deadCharacters.length; i++) {
                    if (player.ma.selectedCharacters[i]) {
                        player.ma.health[i] = player.ma.healthMax[i];
                        player.ma.deadCharacters[i] = false;
                    } else {
                        player.ma.deadCharacters[i] = true;
                    }
                }

                player.ma.currentDepth = new Decimal(1)
                if (player.ma.keepCombo1) player.ma.combo = player.ma.bestComboDepth1.mul(player.ma.keptCombo[0])
                layers.ma.generateCelestialite()

                player.ma.depth1Cooldown = player.ma.depth1CooldownMax
            },
            style() {
                let look = {width: "200px", minHeight: "75px", color: "white", border: "3px solid #8a0e79", margin: "-1.5px"}
                player.ma.depth1Cooldown.gte(0) ? look.backgroundColor = "#361e1e" : look.backgroundColor = "black"
                player.ma.secondAreaUnlock ? look.borderRadius = "0" : look.borderRadius = "0 20px 20px 0"
                return look
            },
        },
        14: {
            title() { return "Give up" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.ma.deadCharacters.length; i++) {
                    player.ma.deadCharacters[i] = true
                }
            },
            style: {width: "200px", minHeight: "50px", color: "black", backgroundColor: "white", borderRadius: "15px"},
        },
        15: {
            title() { return player.ma.depth2Cooldown.lt(0) ? "<h2>Enter Depth 2" : "<h2>Cooldown: " + formatTime(player.ma.depth2Cooldown) },
            canClick() { return player.ma.depth2Cooldown.lt(0) },
            unlocked() { return player.ma.secondAreaUnlock },
            onClick() {
                player.subtabs["ma"]["stuff"] = "Fight"
                player.ma.fightingCelestialites = true

                for (let i = 0; i < player.ma.deadCharacters.length; i++) {
                    player.ma.health[i] = player.ma.healthMax[i]
                    player.ma.deadCharacters[i] = false
                }
                layers.ma.generateCelestialite()

                player.ma.currentDepth = new Decimal(2)
                if (player.ma.keepCombo2) player.ma.combo = player.ma.bestComboDepth2.mul(player.ma.keptCombo[1])
                layers.ma.generateCelestialite()

                player.ma.depth2Cooldown = player.ma.depth2CooldownMax
            },
            style() {
                let look = {width: "200px", minHeight: "75px", color: "white", border: "3px solid #8a0e79", margin: "-1.5px"}
                player.ma.depth2Cooldown.gte(0) ? look.backgroundColor = "#361e1e" : look.backgroundColor = "black"
                hasUpgrade("ma", 27) ? look.borderRadius = "0" : look.borderRadius = "0 20px 20px 0"
                return look
            },
        },
        16: {
            title() { return player.ma.selectedCharacters[0] ? "<h2>Selected" : "<h2>Not Selected" },
            canClick() { return player.ma.charactersSelected < 3 || player.ma.selectedCharacters[0] },
            unlocked() { return true },
            onClick() {
                player.ma.selectedCharacters[0] = !player.ma.selectedCharacters[0];
                if (player.ma.selectedCharacters[0]) {
                    player.ma.charactersSelected += 1;
                } else {
                    player.ma.charactersSelected -= 1;
                }
            },
            style() {
                let look = {width: "247px", minHeight: "50px", color: "white", backgroundColor: "black", borderRadius: "0 0 0 17px"}
                player.ma.selectedCharacters[0] ? look.backgroundColor = "#1a3b0f" : look.backgroundColor = "#361e1e"
                return look
            },
        },
        17: {
            title() { return player.ma.selectedCharacters[1] ? "<h2>Selected" : "<h2>Not Selected" },
            canClick() { return player.ma.charactersSelected < 3 || player.ma.selectedCharacters[1] },
            unlocked() { return true },
            onClick() {
                player.ma.selectedCharacters[1] = !player.ma.selectedCharacters[1];
                if (player.ma.selectedCharacters[1]) {
                    player.ma.charactersSelected += 1;
                } else {
                    player.ma.charactersSelected -= 1;
                }
            },
            style() {
                let look = {width: "247px", minHeight: "50px", color: "white", backgroundColor: "black", borderRadius: "0"}
                player.ma.selectedCharacters[1] ? look.backgroundColor = "#1a3b0f" : look.backgroundColor = "#361e1e"
                return look
            },
        },
        18: {
            title() { return player.ma.selectedCharacters[2] ? "<h2>Selected" : "<h2>Not Selected" },
            canClick() { return player.ma.charactersSelected < 3 || player.ma.selectedCharacters[2] },
            unlocked() { return true },
            onClick() {
                player.ma.selectedCharacters[2] = !player.ma.selectedCharacters[2];
                if (player.ma.selectedCharacters[2]) {
                    player.ma.charactersSelected += 1;
                } else {
                    player.ma.charactersSelected -= 1;
                }
            },
            style() {
                let look = {width: "247px", minHeight: "50px", color: "white", backgroundColor: "black", borderRadius: "0 0 17px 0"}
                player.ma.selectedCharacters[2] ? look.backgroundColor = "#1a3b0f" : look.backgroundColor = "#361e1e"
                return look
            },
        },
        19: {
            title() { return player.ma.selectedCharacters[3] ? "<h2>Selected" : "<h2>Not Selected" },
            canClick() { return player.ma.charactersSelected < 3 || player.ma.selectedCharacters[3] },
            unlocked() { return player.pet.levelables[501][0].gte(1) },
            onClick() {
                player.ma.selectedCharacters[3] = !player.ma.selectedCharacters[3];
                if (player.ma.selectedCharacters[3]) {
                    player.ma.charactersSelected += 1;
                } else {
                    player.ma.charactersSelected -= 1;
                }
            },
            style() {
                let look = {width: "247px", minHeight: "50px", color: "white", backgroundColor: "black", borderRadius: "0 0 17px 17px"}
                player.ma.selectedCharacters[3] ? look.backgroundColor = "#1a3b0f" : look.backgroundColor = "#361e1e"
                return look
            },
        },
        21: {
            title() { return player.ma.depth3Cooldown.lt(0) ? "<h2>Enter Depth 3" : "<h2>Cooldown: " + formatTime(player.ma.depth3Cooldown) },
            canClick() { return player.ma.depth3Cooldown.lt(0) },
            unlocked() { return hasUpgrade("ma", 27) },
            onClick() {
                player.subtabs["ma"]["stuff"] = "Fight"
                player.ma.fightingCelestialites = true

                for (let i = 0; i < player.ma.deadCharacters.length; i++) {
                    player.ma.health[i] = player.ma.healthMax[i]
                    player.ma.deadCharacters[i] = false
                }
                layers.ma.generateCelestialite()

                player.ma.currentDepth = new Decimal(3)
                if (player.ma.keepCombo3) player.ma.combo = player.ma.bestComboDepth3.mul(player.ma.keptCombo[2])
                layers.ma.generateCelestialite()

                player.ma.depth3Cooldown = player.ma.depth3CooldownMax
            },
            style() {
                let look = {width: "200px", minHeight: "75px", color: "white", border: "3px solid #8a0e79", borderRadius: "0 20px 20px 0", margin: "-1.5px"}
                player.ma.depth3Cooldown.gte(0) ? look.backgroundColor = "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
        //icons
        101: {
            title() { return player.ma.deadCharacters[0] ? "<img src='resources/dead.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" : player.ma.characterIcons[0] },
            canClick() { return false },
            unlocked() { return player.ma.selectedCharacters[0] },
            onClick() {},
            style: {width: "150px", minHeight: "150px", color: "white", backgroundColor: "black", margin: "15px"},
        },
        102: {
            title() { return player.ma.deadCharacters[1] ? "<img src='resources/dead.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" : player.ma.characterIcons[1] },
            canClick() { return false },
            unlocked() { return player.ma.selectedCharacters[1] },
            onClick() {},
            style: {width: "150px", minHeight: "150px", color: "white", backgroundColor: "black", margin: "15px"},
        },
        103: {
            title() { return player.ma.deadCharacters[2] ? "<img src='resources/dead.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" : player.ma.characterIcons[2] },
            canClick() { return false },
            unlocked() { return player.ma.selectedCharacters[2] },
            onClick() {},
            style: {width: "150px", minHeight: "150px", color: "white", backgroundColor: "black", margin: "15px"},
        },
        104: {
            title() { return player.ma.celestialiteIcons[player.ma.currentCelestialiteType] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {},
            style: {width: "150px", minHeight: "150px", color: "white", backgroundColor: "black"},
        },
        105: {
            title() { return player.ma.deadCharacters[3] ? "<img src='resources/dead.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" : player.ma.characterIcons[3] },
            canClick() { return false },
            unlocked() { return player.ma.selectedCharacters[3] },
            onClick() {},
            style: {width: "150px", minHeight: "150px", color: "white", backgroundColor: "black", margin: "15px"},
        },

        //attacks
        201: {
            title() { return "Main Attack" },
            tooltip() { return player.ma.airCelestialite ? "Kres can't attack air celestialites" : player.ma.stealthyCelestialite ? "Kres can't attack stealthy celestialites" : "" },
            canClick() { return !player.ma.deadCharacters[0] && !player.ma.airCelestialite && !player.ma.stealthyCelestialite },
            unlocked() { return (player.ma.attackTimer[0].lte(0) || !this.canClick()) && player.ma.selectedCharacters[0] },
            onClick() {
                let baseDamage = player.ma.damage[0];
                let variation = baseDamage.mul(0.15); // 15% variation
                let randomFactor = new Decimal(Math.random()).mul(2).sub(1); // Random value between -1 and +1
                let damage = baseDamage.add(variation.mul(randomFactor)); // Apply variation
        
                if (player.ma.currentCelestialiteType != 5 && !player.ma.airCelestialite) {
                    if (player.ma.shieldHealth.lte(0)) player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(damage);
                    if (player.ma.shieldHealth.gt(0) && player.ma.shieldCelestialite) player.ma.shieldHealth = player.ma.shieldHealth.sub(damage);
                    if (player.ma.currentCelestialiteType != 25) logPrint("<span style='color: #910a27;'>Kres attacks the " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite for " + format(damage) + " damage.</span>");
                    if (player.ma.currentCelestialiteType == 25) logPrint("<span style='color: #910a27;'>Kres attacks Matos for " + format(damage) + " damage.</span>");
                }
                player.ma.attackTimer[0] = player.ma.cooldown[0];
                
                if (player.ma.cursedCelestialite) {
                    // 30% chance to reflect damage to attacker
                    if (Math.random() < 0.3) {
                        player.ma.health[0] = player.ma.health[0].sub(damage);
                        logPrint(
                            "<span style='color: #910a27;'>Cursed celestialite reflects " +
                            format(damage) +
                            " damage back to " +
                            player.ma.characterNames[0] +
                            "!</span>"
                        );
                    }
                }
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                !this.canClick() ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#910a27"
                return look
            },
        },
        202: {
            title() { return "Main Attack" },
            tooltip() { return player.ma.shieldHealth.gt(0) ? "Nav can't attack shields" : player.ma.stealthyCelestialite ? "Nav can't attack stealthy celestialites" : "" },
            canClick() { return !player.ma.deadCharacters[1] && player.ma.shieldHealth.lte(0) && !player.ma.stealthyCelestialite},
            unlocked() { return (player.ma.attackTimer[1].lte(0) || !this.canClick()) && player.ma.selectedCharacters[1] },
            onClick() {
                let baseDamage = player.ma.damage[1];
                let variation = baseDamage.mul(0.25); // 25% variation
                let randomFactor = new Decimal(Math.random()).mul(2).sub(1); // Random value between -1 and +1
                let damage = baseDamage.add(variation.mul(randomFactor)); // Apply variation
        
                if (player.ma.currentCelestialiteType != 5) {
                    if (player.ma.shieldHealth.lte(0)) player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(damage);
                    if (player.ma.shieldHealth.lte(0) && player.ma.currentCelestialiteType != 25) logPrint("<span style='color: #710a91;'>Nav attacks the " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite for " + format(damage) + " damage.</span>");
                    if (player.ma.shieldHealth.lte(0) && player.ma.currentCelestialiteType == 25) logPrint("<span style='color: #710a91;'>Nav attacks Matos for " + format(damage) + " damage.</span>");
                }
                player.ma.attackTimer[1] = player.ma.cooldown[1];

                if (player.ma.cursedCelestialite) {
                    // 30% chance to reflect damage to attacker
                    if (Math.random() < 0.3) {
                        player.ma.health[1] = player.ma.health[1].sub(damage);
                        logPrint(
                            "<span style='color: #710a91;'>Cursed celestialite reflects " +
                            format(damage) +
                            " damage back to " +
                            player.ma.characterNames[1] +
                            "!</span>"
                        );
                    }
                }
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                !this.canClick() ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#710a91"
                return look
            },
        },
        203: {
            title() { return "Main Attack" },
            tooltip() { return player.ma.shieldHealth.gt(0) ? "Sel can't attack shields" : "" },
            canClick() { return !player.ma.deadCharacters[2] && player.ma.shieldHealth.lte(0)},
            unlocked() { return (player.ma.attackTimer[2].lte(0) || !this.canClick()) && player.ma.selectedCharacters[2] },
            onClick() {
                let baseDamage = player.ma.damage[2];
                let variation = baseDamage.mul(0.15); // 15% variation
                let randomFactor = new Decimal(Math.random()).mul(2).sub(1); // Random value between -1 and +1
                let damage = baseDamage.add(variation.mul(randomFactor)); // Apply variation
        
                if (player.ma.currentCelestialiteType != 5) {
                    if (player.ma.shieldHealth.lte(0)) player.ma.celestialiteHealth = player.ma.celestialiteHealth.sub(damage);
                    if (player.ma.shieldHealth.lte(0) && player.ma.currentCelestialiteType != 25) logPrint("<span style='color: #065c19;'>Sel attacks the " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite for " + format(damage) + " damage.</span>");
                    if (player.ma.shieldHealth.lte(0) && player.ma.currentCelestialiteType == 25) logPrint("<span style='color: #065c19;'>Sel attacks Matos for " + format(damage) + " damage.</span>");
                }
                player.ma.attackTimer[2] = player.ma.cooldown[2];

                if (player.ma.cursedCelestialite) {
                    // 30% chance to reflect damage to attacker
                    if (Math.random() < 0.3) {
                        player.ma.health[2] = player.ma.health[2].sub(damage);
                        logPrint(
                            "<span style='color: #065c19;'>Cursed celestialite reflects " +
                            format(damage) +
                            " damage back to " +
                            player.ma.characterNames[2] +
                            "!</span>"
                        );
                    }
                }
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                !this.canClick() ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#065c19"
                return look
            },
        },
        204: {
            title() { return "Big Attack" },
            tooltip() { return player.ma.airCelestialite ? "Kres can't attack air celestialites" : player.ma.stealthyCelestialite ? "Kres can't attack stealthy celestialites" : "Deals big damage at the cost of 8-12% of Kres' max HP." },
            canClick() { return !player.ma.deadCharacters[0] && !player.ma.airCelestialite && !player.ma.stealthyCelestialite},
            unlocked() { return (player.ma.attackTimer2[0].lte(0) || !this.canClick()) && hasUpgrade("ma", 11) && player.ma.selectedCharacters[0] },
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
                    if (player.ma.currentCelestialiteType != 25) logPrint("<span style='color: #910a27;'>Kres BIG ATTACKS the " + player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite for " + format(damage) + " damage.</span>");
                    if (player.ma.currentCelestialiteType == 25) logPrint("<span style='color: #910a27;'>Kres BIG ATTACKS Matos for " + format(damage) + " damage.</span>");
                }
        
                // Apply self-damage to Kres
                player.ma.health[0] = player.ma.health[0].sub(selfDamage);
                logPrint("<span style='color: #910a27;'>Kres takes " + format(selfDamage) + " self-damage from the Big Attack.</span>");
        
                // Reset Kres' attack timer
                player.ma.attackTimer2[0] = player.ma.cooldown2[0];

                if (player.ma.cursedCelestialite) {
                // 30% chance to reflect damage to attacker
                if (Math.random() < 0.3) {
                player.ma.health[0] = player.ma.health[0].sub(damage);
                logPrint(
                    "<span style='color: #910a27;'>Cursed celestialite reflects " +
                    format(damage) +
                    " damage back to " +
                    player.ma.characterNames[0] +
                    "!</span>"
                );
                }
                }
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                !this.canClick() ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#910a27"
                return look
            },
        },
        205: {
            title() { return "Heal Spell" },
            tooltip() { return "Randomly heal a character by 5-10% of their max HP." },
            canClick() { 
                // Ensure at least one character is alive and not at max health
                return player.ma.deadCharacters.some((isDead, index) => !isDead && player.ma.health[index].lt(player.ma.healthMax[index])) && !player.ma.deadCharacters[1] ; 
            },
            unlocked() { return (player.ma.attackTimer2[1].lte(0) || !this.canClick()) && hasUpgrade("ma", 12) && player.ma.selectedCharacters[1] },
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
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                !this.canClick() ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#710a91"
                return look
            },
        },
        206: {
            title() { return "Turret" },
            tooltip() { return player.ma.shieldHealth.gt(0) ? "Sel can't attack shields" : "A turret will attack every 0.5s for 12s, dealing 20-30% of Sel's attack damage." },
            canClick() { return !player.ma.deadCharacters[2] && player.ma.shieldHealth.lte(0)}, // Ensure Sel is alive
            unlocked() { return (player.ma.attackTimer2[2].lte(0) || !this.canClick()) && hasUpgrade("ma", 13) && player.ma.selectedCharacters[2] },
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
                        if (player.ma.shieldHealth.lte(0) && player.ma.currentCelestialiteType != 25) logPrint(
                            `<span style='color: #065c19;'>Sel's turret attacks the ${player.ma.celestialiteNames[player.ma.currentCelestialiteType]} Celestialite for ${format(turretDamage)} damage.</span>`
                        );
                        if (player.ma.shieldHealth.lte(0) && player.ma.currentCelestialiteType == 25) logPrint(
                            `<span style='color: #065c19;'>Sel's turret attacks Matos for ${format(turretDamage)} damage.</span>`
                        );
                                        if (player.ma.cursedCelestialite) {
                        // 30% chance to reflect damage to attacker
                        if (Math.random() < 0.3) {
                        player.ma.health[2] = player.ma.health[2].sub(turretDamage);
                        logPrint(
                        "<span style='color: #065c19;'>Cursed celestialite reflects " +
                        format(turretDamage) +
                        " damage back to " +
                        player.ma.characterNames[2] +
                        "!</span>"
                        );
                }
                }
                    }
        
                    // Decrease the turret duration left
                    player.ma.turretDurationLeft = player.ma.turretDurationLeft.sub(turretInterval);
                    turretTick++;
                }, turretInterval * 1000); // Convert interval to milliseconds
            },
            style() {
                let look = {width: "100px", color: "white"}
                if (player.ma.turretDurationLeft && player.ma.turretDurationLeft.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"} else {look.minHeight = "100px";look.borderRadius = "15px"}
                !this.canClick() ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#065c19"
                return look
            },
        },
        207: {
            title() { return "Team Buff" },
            tooltip() { return "Boosts the entire team's damage by 50% for 9s." },
            canClick() { return !player.ma.deadCharacters[0] },
            unlocked() { return (player.ma.attackTimer3[0].lte(0) || !this.canClick()) && hasUpgrade("ma", 23) && player.ma.selectedCharacters[0] },
            onClick() {

                logPrint("<span style='color: #910a27;'>Kres buffs the entire team!</span>");

                player.ma.teamBuffDuration = new Decimal(9); // Set the buff duration to 9 seconds
        
                // Reset Kres' attack timer
                player.ma.attackTimer3[0] = player.ma.cooldown3[0];
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                if (player.ma.teamBuffDuration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"} else {look.minHeight = "100px";look.borderRadius = "15px"}
                !this.canClick() ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#910a27"
                return look
            },
        },
        208: {
            title() { return "Curse Spell" },
            tooltip() { return "Curses the enemy for 10s, which reflects damage back to the enemy." },
            canClick() { return !player.ma.deadCharacters[1] },
            unlocked() { return (player.ma.attackTimer3[1].lte(0) || !this.canClick()) && hasUpgrade("ma", 24) && player.ma.selectedCharacters[1] },
            onClick() {

                logPrint("<span style='color: #710a91;'>Nav curses the enemy!</span>");

                player.ma.curseSpellDuration = new Decimal(10); // Set the curse duration to 10 seconds

                // Reset Kres' attack timer
                player.ma.attackTimer3[1] = player.ma.cooldown3[1];
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                if (player.ma.curseSpellDuration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"} else {look.minHeight = "100px";look.borderRadius = "15px"}
                !this.canClick() ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#710a91"
                return look
            },
        },
        209: {
            title() { return "Energy Boost" },
            tooltip() { return "A random character's cooldown is halved for 6s." },
            canClick() { return !player.ma.deadCharacters[2] },
            unlocked() { return (player.ma.attackTimer3[2].lte(0) || !this.canClick()) && hasUpgrade("ma", 25) && player.ma.selectedCharacters[2] },
            onClick() {

                let aliveCharacters = player.ma.deadCharacters
                .map((isDead, index) => (!isDead ? index : null))
                .filter(index => index !== null);
            
                if (aliveCharacters.length > 0) {
                    let character = aliveCharacters[getRandomInt(aliveCharacters.length)];
                    player.ma.energyBoostSelected = character; // Store the selected character for the energy boost
                    logPrint("<span style='color: #065c19;'>Sel gives " + player.ma.characterNames[character] + " an energy boost!</span>");

                player.ma.cooldown[character] = new Decimal(0)
                player.ma.cooldown2[character] = new Decimal(0)
                if (character != 2) player.ma.cooldown3[character] = new Decimal(0)
                }

                player.ma.energyBoostDuration = new Decimal(6); // Set the energy boost duration to 6 seconds

                // Reset Kres' attack timer
                player.ma.attackTimer3[2] = player.ma.cooldown3[2];
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                if (player.ma.energyBoostDuration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"} else {look.minHeight = "100px";look.borderRadius = "15px"}
                !this.canClick() ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#065c19"
                return look
            },
        },
        //eclipse stuff
        211: {
            title() { return "Eclipse is draining health:<br>" + format(player.ma.damage[3]) + "/s" },
            tooltip() { return "" },
            canClick() { return false },
            unlocked() { return player.ma.selectedCharacters[3] },
            onClick() {},
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                player.ma.deadCharacters[3] == false ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#b68c18"
                return look
            },
        },
        212: {
            title() { return "Motivate" },
            tooltip() { return "Repeating this skill will keep boosting the team's damage.<br>Currently: x" + format(player.ma.motivationEffect) + "." },
            canClick() { return !player.ma.deadCharacters[3] },
            unlocked() { return (player.ma.attackTimer[3].lte(0) || !this.canClick()) && hasUpgrade("sma", 221) && player.ma.selectedCharacters[3] },
            onClick() {
                player.ma.motivationCount = player.ma.motivationCount.add(1)
                logPrint("<span style='color: #b68c18;'>Eclipse motivates the team, now the effect is x" + format(player.ma.motivationEffect) + ".");

                // Reset Eclipse' attack timer
                player.ma.attackTimer[3] = player.ma.cooldown[3];
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", borderRadius: "15px"}
                player.ma.deadCharacters[3] == false ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#b68c18"
                return look
            },
        },
    },
    generateCelestialite() {
        let random = Math.random()

        if (player.ma.currentDepth.eq(1)) {
            if (random > 0.75 && random < 1) player.ma.currentCelestialiteType = 0
            if (random > 0.5 && random < 0.75) player.ma.currentCelestialiteType = 1
            if (random > 0.3 && random < 0.5) player.ma.currentCelestialiteType = 2
            if (random > 0.1 && random < 0.3) player.ma.currentCelestialiteType = 3
            if (random < 0.1) player.ma.currentCelestialiteType = 4
        } else if (player.ma.currentDepth.eq(2)) {
            if (random > 0.83 && random < 1) player.ma.currentCelestialiteType = 3
            if (random > 0.66 && random < 0.83) player.ma.currentCelestialiteType = 4
            if (random > 0.52 && random < 0.66) player.ma.currentCelestialiteType = 6
            if (random > 0.42 && random < 0.52) player.ma.currentCelestialiteType = 7
            if (random > 0.3 && random < 0.42) player.ma.currentCelestialiteType = 9
            if (random > 0.18 && random < 0.3) player.ma.currentCelestialiteType = 10
            if (random > 0.06 && random < 0.18) player.ma.currentCelestialiteType = 12
            if (random < 0.06) player.ma.currentCelestialiteType = 13
        } else if (player.ma.currentDepth.eq(3) && !player.ma.matosFightActive) {
            let r = Math.random();
            if (r < 0.15) {
                player.ma.currentCelestialiteType = 24; // omega
            } else {
                // 12 types, each gets (1-0.15)/12 = 0.0708333...
                let rest = (r - 0.15) / 0.0708333;
                let idx = Math.floor(rest);
                const types = [8, 11, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
                player.ma.currentCelestialiteType = types[idx];
            }
        } else if (player.ma.currentDepth.eq(3) && player.ma.matosFightActive) {
            player.ma.currentCelestialiteType = 25
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
        if (player.ma.currentCelestialiteType == 8) {
            player.ma.celestialiteMaxHealth = Decimal.add(250, Decimal.mul(60, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(8, Decimal.mul(5, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(5, Decimal.mul(3, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown

            player.ma.regenRate = Decimal.add(2, Decimal.mul(2, Math.random()))
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
        if (player.ma.currentCelestialiteType == 11) {
            player.ma.celestialiteMaxHealth = Decimal.add(200, Decimal.mul(40, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(4, Decimal.mul(3, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(2, Decimal.mul(2, Math.random()))
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
        if (player.ma.currentCelestialiteType == 14) {
            player.ma.celestialiteMaxHealth = Decimal.add(100, Decimal.mul(10, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(5, Decimal.mul(3, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(3, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown

            player.ma.shieldMaxHealth = Decimal.add(225, Decimal.mul(50, Math.random()))
            player.ma.shieldHealth = player.ma.shieldMaxHealth
        }
        if (player.ma.currentCelestialiteType == 15) { //stealthy
            player.ma.celestialiteMaxHealth = Decimal.add(150, Decimal.mul(30, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(1.5, Decimal.mul(1, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(0.8, Decimal.mul(0.4, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 16) { 
            player.ma.celestialiteMaxHealth = Decimal.add(200, Decimal.mul(50, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(4, Decimal.mul(3, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(2, Decimal.mul(1.5, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 17) { 
            player.ma.celestialiteMaxHealth = Decimal.add(250, Decimal.mul(100, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(6, Decimal.mul(4, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(3, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 18) { //cursed
            player.ma.celestialiteMaxHealth = Decimal.add(175, Decimal.mul(25, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(4, Decimal.mul(2, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(2, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 19) { 
            player.ma.celestialiteMaxHealth = Decimal.add(250, Decimal.mul(30, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(5, Decimal.mul(2, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(4, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 20) { 
            player.ma.celestialiteMaxHealth = Decimal.add(150, Decimal.mul(150, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(9, Decimal.mul(4, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(7, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 21) { //explosive
            player.ma.celestialiteMaxHealth = Decimal.add(125, Decimal.mul(25, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(10, Decimal.mul(5, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(3, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 22) { 
            player.ma.celestialiteMaxHealth = Decimal.add(250, Decimal.mul(75, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(3, Decimal.mul(2, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(3, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 23) { 
            player.ma.celestialiteMaxHealth = Decimal.add(300, Decimal.mul(50, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(2, Decimal.mul(1, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(3, Decimal.mul(1, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 24) { //matos minion
            player.ma.celestialiteMaxHealth = Decimal.add(500, Decimal.mul(250, Math.random()))
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(4, Decimal.mul(3, Math.random()))
            player.ma.celestialiteCooldown = Decimal.add(5, Decimal.mul(2, Math.random()))
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.currentCelestialiteType == 25) { //matos
            player.ma.celestialiteMaxHealth = new Decimal(7500)
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.celestialiteDamage = Decimal.add(8, Decimal.mul(0, Math.random()))
            player.ma.celestialiteCooldown = new Decimal(7)
            player.ma.celestialiteTimer = player.ma.celestialiteCooldown
        }
        if (player.ma.combo.gte(100) && player.ma.currentCelestialiteType != 25) { // STAT INCREASE POST 100 COMBO
            let mult = new Decimal(1.015)
            if (hasMilestone("ma", 106)) mult = mult.sub(0.001)
            if (hasMilestone("ma", 206)) mult = mult.sub(0.001)
            if (hasMilestone("ma", 306)) mult = mult.sub(0.001)
            let statSoftcap = Decimal.pow(mult, player.ma.combo.sub(100))
            player.ma.celestialiteMaxHealth = player.ma.celestialiteMaxHealth.mul(statSoftcap)
            player.ma.celestialiteHealth = player.ma.celestialiteMaxHealth
            player.ma.shieldMaxHealth = player.ma.shieldMaxHealth.mul(statSoftcap)
            player.ma.shieldHealth = player.ma.shieldMaxHealth
            player.ma.celestialiteDamage = player.ma.celestialiteDamage.mul(statSoftcap)
        }
    },
    lootCelestialite() {
        let random = Math.random()
        if (player.ma.currentCelestialiteType == 0) {
            if (random < 0.7) {
                let gain = Decimal.add(8, getRandomInt(5)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else {
                let gain = Decimal.add(1, getRandomInt(1)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 1) {
            if (random < 0.7) {
                let gain = Decimal.add(5, getRandomInt(8)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else {
                let gain = Decimal.add(1, getRandomInt(2)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 2) {
            if (random < 0.5) {
                let gain = Decimal.add(9, getRandomInt(8)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else {
                let gain = Decimal.add(2, getRandomInt(2)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 3) {
            if (random < 0.6) {
                let gain = Decimal.add(9, getRandomInt(8)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.6 && random < 0.9) {
                let gain = Decimal.add(3, getRandomInt(3)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 4) {
            if (random < 0.4) {
                let gain = Decimal.add(12, getRandomInt(7)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.4 && random < 0.85) {
                let gain = Decimal.add(4, getRandomInt(3)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else {
                let gain = Decimal.add(1, getRandomInt(1)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            }

            if (!player.ma.secondAreaUnlock) {
                player.ma.epsilonCelestialitesKilled = player.ma.epsilonCelestialitesKilled.add(1)
                logPrint("<span style='color: white;'>You killed " + formatWhole(player.ma.epsilonCelestialitesKilled) + "/5 epsilon celestialites in order to unlock the next depth...")
            }
        }

        if (player.ma.currentCelestialiteType == 6) {
            if (random < 0.5) {
                let gain = Decimal.add(18, getRandomInt(12)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.5 && random < 0.8) {
                let gain = Decimal.add(6, getRandomInt(4)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.8 && random < 0.98) {
                let gain = Decimal.add(1, getRandomInt(2)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 7) {
            if (random < 0.45) {
                let gain = Decimal.add(22, getRandomInt(8)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.45 && random < 0.85) {
                let gain = Decimal.add(7, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.85 && random < 0.985) {
                let gain = Decimal.add(2, getRandomInt(2)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 8) {
            if (random < 0.3) {
                let gain = Decimal.add(30, getRandomInt(10)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.30 && random < 0.5) {
                let gain = Decimal.add(15, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.5 && random < 0.85) {
                let gain = Decimal.add(1).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 9) {
            if (random < 0.3) {
                let gain = Decimal.add(22, getRandomInt(8)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.3 && random < 0.8) {
                let gain = Decimal.add(5, getRandomInt(7)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.8 && random < 0.97) {
                let gain = Decimal.add(1, getRandomInt(3)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 10) {
            if (random < 0.1) {
                let gain = Decimal.add(44, getRandomInt(22)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.1 && random < 0.6) {
                let gain = Decimal.add(3, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.6 && random < 0.98) {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 11) {
            if (random < 0.4) {
                let gain = Decimal.add(20, getRandomInt(10)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.4 && random < 0.7) {
                let gain = Decimal.add(10, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.7 && random < 0.85) {
                let gain = Decimal.add(1, getRandomInt(3)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 12) {
            if (random < 0.5) {
                let gain = Decimal.add(15, getRandomInt(10)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.5 && random < 0.9) {
                let gain = Decimal.add(7, getRandomInt(3)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.9 && random < 0.97) {
                let gain = Decimal.add(3, getRandomInt(3)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 13) {
            if (random < 0.4) {
                let gain = Decimal.add(25, getRandomInt(15)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.4 && random < 0.8) {
                let gain = Decimal.add(9, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.8 && random < 0.94) {
                let gain = Decimal.add(2, getRandomInt(3)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 14) {
            if (random < 0.2) {
                let gain = Decimal.add(40, getRandomInt(10)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.2 && random < 0.7) {
                let gain = Decimal.add(10, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.7 && random < 0.85) {
                let gain = Decimal.add(1, getRandomInt(2)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 15) { //stealthy
            if (random < 0.4) {
                let gain = Decimal.add(15, getRandomInt(10)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.4 && random < 0.85) {
                let gain = Decimal.add(1, getRandomInt(1)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 16) { 
            if (random < 0.6) {
                let gain = Decimal.add(10, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.6 && random < 0.95) {
                let gain = Decimal.add(2, getRandomInt(2)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = Decimal.add(1, getRandomInt(1)).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 17) { 
            if (random < 0.5) {
                let gain = Decimal.add(5, getRandomInt(15)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.5 && random < 0.8) {
                let gain = Decimal.add(2, getRandomInt(3)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 18) { //cursed
            if (random < 0.85) {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 19) {
            if (random < 0.75) {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 20) { 
            if (random < 0.75) {
                let gain = Decimal.add(1, getRandomInt(1)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 21) { //explosive
            if (random < 0.3) {
                let gain = Decimal.add(45, getRandomInt(10)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.30 && random < 0.5) {
                let gain = Decimal.add(18, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.5 && random < 0.85) {
                let gain = Decimal.add(1, getRandomInt(1)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 22) { 
            if (random < 0.4) {
                let gain = Decimal.add(25, getRandomInt(15)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.4 && random < 0.7) {
                let gain = Decimal.add(15, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.7 && random < 0.85) {
                let gain = Decimal.add(2, getRandomInt(2)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else  {
                let gain = new Decimal(1).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 23) { 
            if (random < 0.2) {
                let gain = Decimal.add(45, getRandomInt(15)).mul(player.ma.matosFragmentMult[0])
                player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain)
                logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            } else if (random > 0.2 && random < 0.7) {
                let gain = Decimal.add(15, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
                player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain)
                logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            } else if (random > 0.7 && random < 0.85) {
                let gain = Decimal.add(2, getRandomInt(2)).mul(player.ma.matosFragmentMult[2])
                player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain)
                logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            } else {
                let gain = Decimal.add(1, getRandomInt(1)).mul(player.ma.matosFragmentMult[3])
                player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain)
                logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
            }
        }
        if (player.ma.currentCelestialiteType == 24) { //omega
            let gain1 = Decimal.add(25, getRandomInt(10)).mul(player.ma.matosFragmentMult[0])
            player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain1)
            logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain1) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
            let gain2 = Decimal.add(10, getRandomInt(5)).mul(player.ma.matosFragmentMult[1])
            player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain2)
            logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain2) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
            let gain3 = Decimal.add(1, getRandomInt(1)).mul(player.ma.matosFragmentMult[2])
            player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain3)
            logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain3) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
            if (player.ma.omegaCelestialitesKilled.lte(5) && !player.ma.matosToggle) {
                player.ma.omegaCelestialitesKilled = player.ma.omegaCelestialitesKilled.add(1)
                logPrint("<span style='color: white;'>You killed " + formatWhole(player.ma.omegaCelestialitesKilled) + "/5 omega celestialites...")
                if (player.ma.omegaCelestialitesKilled.eq(1)) {
                    flashScreen("Long long ago, I had dreams. I had desires. I was human.", 5000)
                }  
                if (player.ma.omegaCelestialitesKilled.eq(2)) {
                    flashScreen("I heard stories about a world. A beautiful world. With a sun that shined bright.", 5000)
                }   
                if (player.ma.omegaCelestialitesKilled.eq(3)) {
                    flashScreen("I wanted to see the beauty that nature has to offer, but that was impossible.", 5000)
                } 
                if (player.ma.omegaCelestialitesKilled.eq(4)) {
                    flashScreen("The world was filled with greed. Smog polluted the entire sky. I was poor. I was suffering.", 5000)
                } 
                if (player.ma.omegaCelestialitesKilled.eq(5)) {
                    flashScreen("As a celestial, I continue to suffer. But I suffer with purpose.", 5000)
                } 
            }
        }
    },
    bars: {
        kresHealth: {
            unlocked() { return player.ma.selectedCharacters[0] },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.health[0].div(player.ma.healthMax[0])
            },
            borderStyle: {borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#910a27"},
            textStyle: {userSelect: "none"},
            display() {
                return player.ma.deadCharacters[0] ? "Kres is dead." : "<h5>" + format(player.ma.health[0]) + "/" + format(player.ma.healthMax[0]) + "<h5> HP.</h5>";
            },
        },
        navHealth: {
            unlocked() { return player.ma.selectedCharacters[1] },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.health[1].div(player.ma.healthMax[1])
            },
            borderStyle: {borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#710a91"},
            textStyle: {userSelect: "none"},
            display() {
                return player.ma.deadCharacters[1] ? "Nav is dead." : "<h5>" + format(player.ma.health[1]) + "/" + format(player.ma.healthMax[1]) + "<h5> HP.</h5>";
            },
        },
        selHealth: {
            unlocked() { return player.ma.selectedCharacters[2] },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.health[2].div(player.ma.healthMax[2])
            },
            borderStyle: {borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#065c19"},
            textStyle: {userSelect: "none"},
            display() {
                return player.ma.deadCharacters[2] ? "Sel is dead." : "<h5>" + format(player.ma.health[2]) + "/" + format(player.ma.healthMax[2]) + "<h5> HP.</h5>";
            },
        },
        eclipseHealth: {
            unlocked() { return player.ma.selectedCharacters[3] },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.ma.health[3].div(player.ma.healthMax[3])
            },
            borderStyle: {borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "hsl(44, 76.70%, 40.40%)"},
            textStyle: {userSelect: "none"},
            display() {
                return player.ma.deadCharacters[3] ? "Eclipse is dead." : "<h5>" + format(player.ma.health[3]) + "/" + format(player.ma.healthMax[3]) + "<h5> HP.</h5>";
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
            borderStyle() {return player.ma.celestialiteTimer.gte(0) && player.ma.currentCelestialiteType != 5 ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "rgb(138, 14, 121)"},
            textStyle: {userSelect: "none"},
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
            borderStyle() {return player.ma.celestialiteTimer.gte(0) && player.ma.currentCelestialiteType != 5 ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "rgb(92, 92, 92)"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + format(player.ma.shieldHealth) + "/" + format(player.ma.shieldMaxHealth) + "<h5> Shield HP.</h5>";
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
            borderStyle: {border: "0", borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "rgb(138, 14, 121)"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.respawnTimer) + "/5s<h5></h5>";
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
            borderStyle: {border: "2px solid white", borderRadius: "0 0 15px 15px", margin: "-1px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "rgb(138, 14, 121)"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.celestialiteTimer) + "/" + formatTime(player.ma.celestialiteCooldown) + "<h5></h5>";
            },
        },
        //attacks
        kresAttack: {
            unlocked() { return !tmp.ma.clickables[201].unlocked },
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer[0].div(player.ma.cooldown[0])
            },
            borderStyle: {border: "0", borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#910a27"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer[0]) + "/" + formatTime(player.ma.cooldown[0]) + "<h5></h5>";
            },
        },
        navAttack: {
            unlocked() { return !tmp.ma.clickables[202].unlocked },
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer[1].div(player.ma.cooldown[1])
            },
            borderStyle: {border: "0", borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#710a91"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer[1]) + "/" + formatTime(player.ma.cooldown[1]) + "<h5></h5>";
            },
        },
        selAttack: {
            unlocked() { return !tmp.ma.clickables[203].unlocked },
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer[2].div(player.ma.cooldown[2])
            },
            borderStyle: {border: "0", borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#065c19"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer[2]) + "/" + formatTime(player.ma.cooldown[2]) + "<h5></h5>";
            },
        },
        kresAttack2: {
            unlocked() { return !tmp.ma.clickables[204].unlocked }, 
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer2[0].div(player.ma.cooldown2[0]);
            },
            borderStyle: {border: "0", borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#910a27"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer2[0]) + "/" + formatTime(player.ma.cooldown2[0]) + "<h5></h5>"; 
            },
        },
        navAttack2: {
            unlocked() { return !tmp.ma.clickables[205].unlocked }, 
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer2[1].div(player.ma.cooldown2[1]);
            },
            borderStyle: {border: "0", borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#710a91"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer2[1]) + "/" + formatTime(player.ma.cooldown2[1]) + "<h5></h5>"; 
            },
        },
        selAttack2: {
            unlocked() {return !tmp.ma.clickables[206].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.ma.turretDurationLeft && player.ma.turretDurationLeft.gt(0) ? 50 : 100 },
            progress() {
                return player.ma.attackTimer2[2].div(player.ma.cooldown2[2]);
            },
            borderStyle() {return player.ma.turretDurationLeft && player.ma.turretDurationLeft.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#065c19"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer2[2]) + "/" + formatTime(player.ma.cooldown2[2]) + "<h5></h5>"; 
            },
        },
        turretBar: {
            unlocked() { return player.ma.turretDurationLeft && player.ma.turretDurationLeft.gt(0) && hasUpgrade("ma", 13) }, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                return player.ma.turretDurationLeft.div(12); // Divide by the total turret duration (12 seconds)
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#065c19"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatWhole(player.ma.turretDurationLeft.mul(2)) + "/24 bullets left<h5></h5>"; // Show remaining time
            },
        },
        kresAttack3: {
            unlocked() { return !tmp.ma.clickables[207].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.ma.teamBuffDuration.gt(0) ? 50 : 100 },
            progress() {
                return player.ma.attackTimer3[0].div(player.ma.cooldown3[0]);
            },
            borderStyle() {return player.ma.teamBuffDuration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#910a27"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer3[0]) + "/" + formatTime(player.ma.cooldown3[0]) + "<h5></h5>"; 
            },
        },
        teamBuffBar: {
            unlocked() { return player.ma.teamBuffDuration.gt(0) && hasUpgrade("ma", 23) && player.ma.selectedCharacters[0] }, 
            direction: RIGHT,
            width: 100,
            height: 50,
            progress() {
                return player.ma.teamBuffDuration.div(9); // Divide by the total team buff duration (9 seconds)
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#910a27"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.teamBuffDuration) + "/9.00s<h5></h5>"; 
            },
        },
        navAttack3: {
            unlocked() { return !tmp.ma.clickables[208].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.ma.curseSpellDuration.gt(0) ? 50 : 100 },
            progress() {
                return player.ma.attackTimer3[1].div(player.ma.cooldown3[1]);
            },
            borderStyle() {return player.ma.curseSpellDuration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#710a91"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer3[1]) + "/" + formatTime(player.ma.cooldown3[1]) + "<h5></h5>"; 
            },
        },
        curseSpellBar: {
            unlocked() { return player.ma.curseSpellDuration.gt(0) && hasUpgrade("ma", 24) && player.ma.selectedCharacters[1] }, 
            direction: RIGHT,
            width: 100,
            height: 50,
            progress() {
                return player.ma.curseSpellDuration.div(10); // Divide by the total curse duration (10 seconds)
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#710a91"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.curseSpellDuration) + "/10.00s<h5></h5>"; 
            },
        },
        selAttack3: {
            unlocked() { return !tmp.ma.clickables[209].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.ma.energyBoostDuration.gt(0) ? 50 : 100 },
            progress() {
                return player.ma.attackTimer3[2].div(player.ma.cooldown3[2]);
            },
            borderStyle() {return player.ma.energyBoostDuration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#065c19"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer3[2]) + "/" + formatTime(player.ma.cooldown3[2]) + "<h5></h5>"; 
            },
        },
        energyBoostBar: {
            unlocked() { return player.ma.energyBoostDuration.gt(0) && hasUpgrade("ma", 25) && player.ma.selectedCharacters[2] }, 
            direction: RIGHT,
            width: 100,
            height: 50,
            progress() {
                return player.ma.energyBoostDuration.div(6); // Divide by the total energy boost duration (6 seconds)
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#065c19"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.energyBoostDuration) + "/6.00s<h5></h5>"; 
            },
        },
        eclipseAttack2: {
            unlocked() { return !tmp.ma.clickables[212].unlocked },
            direction: RIGHT,
            width: 100,
            height: 100,
            progress() {
                return player.ma.attackTimer[3].div(player.ma.cooldown[3])
            },
            borderStyle: {borderTop: "2px solid white", borderRadius: "15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#b68c18"},
            textStyle: {userSelect: "none"},
            display() {
                return "<h5>" + formatTime(player.ma.attackTimer[3]) + "/" + formatTime(player.ma.cooldown[3]) + "<h5></h5>";
            },
        },
    },
    upgrades: {
        11: {
            title: "Kres Upgrade I",
            unlocked: true,
            description: "Unlock Kres' second skill.",
            cost: new Decimal("300"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Common Matos Fragments",
            currencyInternalName: "commonMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #4d767f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9bedff"
                return look
            },
        },
        12: {
            title: "Nav Upgrade I",
            unlocked: true,
            description: "Unlock Nav's second skill.",
            cost: new Decimal("80"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Rare Matos Fragments",
            currencyInternalName: "rareMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #273e7f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#4e7cff"
                return look
            },
        },
        13: {
            title: "Sel Upgrade I",
            unlocked: true,
            description: "Unlock Sel's second skill.",
            cost: new Decimal("5"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Epic Matos Fragments",
            currencyInternalName: "epicMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #653c76", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#cb79ed"
                return look
            },
        },
        14: {
            title: "This upgrade should've been here a long time ago...",
            unlocked: true,
            description: "Gain 100% of time cubes per second.",
            cost: new Decimal("12"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Epic Matos Fragments",
            currencyInternalName: "epicMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #653c76", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#cb79ed"
                return look
            },
        },
        15: {
            title: "Kres Upgrade II",
            unlocked: true,
            description: "Kres' pet level boosts his strength and defense.",
            cost: new Decimal("2500"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Common Matos Fragments",
            currencyInternalName: "commonMatosFragments",
            effect() {
                return getLevelableAmount("pet", 404)
            },
            effectDisplay() { return "+" + formatWhole(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #4d767f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9bedff"
                return look
            },
        },
        16: {
            title: "Nav Upgrade II",
            unlocked: true,
            description: "Nav's pet level boosts her strength and agility.",
            cost: new Decimal("300"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Rare Matos Fragments",
            currencyInternalName: "rareMatosFragments",
            effect() {
                return getLevelableAmount("pet", 405)
            },
            effectDisplay() { return "+" + formatWhole(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #273e7f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#4e7cff"
                return look
            },
        },
        17: {
            title: "Sel Upgrade II",
            unlocked: true,
            description: "Sel's pet level boosts his agility and defense.",
            cost: new Decimal("16"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Epic Matos Fragments",
            currencyInternalName: "epicMatosFragments",
            effect() {
                return getLevelableAmount("pet", 406)
            },
            effectDisplay() { return "+" + formatWhole(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #653c76", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#cb79ed"
                return look
            },
        },
        18: {
            title: "New Buyables",
            unlocked: true,
            description: "Unlock new buyables in the stats tab.",
            cost: new Decimal("200"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Rare Matos Fragments",
            currencyInternalName: "rareMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #273e7f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#4e7cff"
                return look
            },
        },
        19: {
            title: "Old Formula",
            unlocked: true,
            description: "Buff the antimatter formula by ^10.",
            cost: new Decimal("5000"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Common Matos Fragments",
            currencyInternalName: "commonMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #4d767f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9bedff"
                return look
            },
        },
        21: {
            title: "Replicanti Limit Breaker",
            unlocked: true,
            description: "Replicanti can go beyond 1e308, but is heavily softcapped.",
            cost: new Decimal("15"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Epic Matos Fragments",
            currencyInternalName: "epicMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #653c76", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#cb79ed"
                return look
            },
        },
        22: {
            title: "Linking Powerer",
            unlocked: true,
            description: "Boost linking power based on singularity points.",
            cost: new Decimal("400"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Rare Matos Fragments",
            currencyInternalName: "rareMatosFragments",
            effect() {
                return player.s.singularityPoints.add(1).log10().add(1).pow(1.2)
            },
            effectDisplay() { return "x" + formatShort(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #273e7f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#4e7cff"
                return look
            },
        },
        23: {
            title: "Kres Upgrade III",
            unlocked: true,
            description: "Unlock Kres' third skill.",
            cost: new Decimal("1"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Legendary Matos Fragments",
            currencyInternalName: "legendaryMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #776900", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#eed200"
                return look
            },
        },
        24: {
            title: "Nav Upgrade III",
            unlocked: true,
            description: "Unlock Nav's third skill.",
            cost: new Decimal("1"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Legendary Matos Fragments",
            currencyInternalName: "legendaryMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #776900", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#eed200"
                return look
            },
        },
        25: {
            title: "Sel Upgrade III",
            unlocked: true,
            description: "Unlock Sel's third skill.",
            cost: new Decimal("1"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Legendary Matos Fragments",
            currencyInternalName: "legendaryMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #776900", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#eed200"
                return look
            },
        },
        26: {
            title: "New Buyables II",
            unlocked: true,
            description: "Unlock more buyables in the buyables tab.",
            cost: new Decimal("2"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Legendary Matos Fragments",
            currencyInternalName: "legendaryMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #776900", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#eed200"
                return look
            },
        },
        27: {
            title: "Third Depth",
            unlocked: true,
            description: "Unlock the third (and final) depth layer.",
            cost: new Decimal("5"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Legendary Matos Fragments",
            currencyInternalName: "legendaryMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #776900", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#eed200"
                return look
            },
        },
        28: {
            title: "Health Regen",
            unlocked: true,
            description: "Unlocks health regen buyables (in buyable tab).",
            cost: new Decimal("40"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Epic Matos Fragments",
            currencyInternalName: "epicMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #653c76", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#cb79ed"
                return look
            },
        },
        29: {
            title: "New Formula",
            unlocked: true,
            description: "Singularity gain is boosted based on SP gain.",
            cost: new Decimal("7500"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Common Matos Fragments",
            currencyInternalName: "commonMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #4d767f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9bedff"
                return look
            },
        },
        30: {
            title: "Fragmented Colors",
            unlocked: true,
            description: "Boost realm essence based on matos fragments.",
            cost: new Decimal("800"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Rare Matos Fragments",
            currencyInternalName: "rareMatosFragments",
            effect() {
                let amt = player.ma.commonMatosFragments.mul(player.ma.rareMatosFragments).mul(player.ma.epicMatosFragments).mul(player.ma.legendaryMatosFragments)
                amt = amt.add(1).log(10000).pow(0.5).add(1)
                if (amt.gte(10)) amt = amt.div(10).pow(0.1).mul(10)
                return amt
            },
            effectDisplay() { return "x" + formatShort(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #273e7f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#4e7cff"
                return look
            },
        },
        31: {
            title: "Combo Consummation",
            unlocked: true,
            description: "Unlock combo milestones.",
            cost: new Decimal("10000"),
            currencyLocation() { return player.ma },
            currencyDisplayName: "Common Matos Fragments",
            currencyInternalName: "commonMatosFragments",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", border: "3px solid #4d767f", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#9bedff"
                return look
            },
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
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Total Strength Boost"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " total strength to all characters (except eclipse).\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Starmetal Alloy"
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
            style: { width: "275px", height: "150px", color: "white"}
        },
        12: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.starmetalAlloy},
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Total Defense Boost"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " total defense to all characters (except eclipse).\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Starmetal Alloy"
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
            style: { width: "275px", height: "150px", color: "white"}
        },
        13: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.starmetalAlloy},
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Total Agility Boost"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " total agility to all characters (except eclipse).\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Starmetal Alloy"
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
            style: { width: "275px", height: "150px", color: "white"}
        },
        14: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.commonMatosFragments},
            pay(amt) { player.ma.commonMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(0.6) },
            unlocked: true,
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
            style: { width: "275px", height: "150px", backgroundColor: "#9bedff"}
        },
        15: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.commonMatosFragments},
            pay(amt) { player.ma.commonMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(0.6) },
            unlocked: true,
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
            style: { width: "275px", height: "150px", backgroundColor: "#9bedff"}
        },
        16: {
            costBase() { return new Decimal(14) },
            costGrowth() { return new Decimal(1.8) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.commonMatosFragments},
            pay(amt) { player.ma.commonMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(0.5) },
            unlocked: true,
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
            style: { width: "275px", height: "150px", backgroundColor: "#9bedff"}
        },
        17: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ma.commonMatosFragments},
            pay(amt) { player.ma.commonMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return Decimal.pow(2.5, getBuyableAmount(this.layer, this.id)) },
            unlocked: true,
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
            style: { width: "275px", height: "150px", backgroundColor: "#9bedff"}
        },
        21: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.rareMatosFragments},
            pay(amt) { player.ma.rareMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(player.in.infinityPoints.add(1).log(10).div(10).pow(0.85)) },
            unlocked: true,
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
            style: { width: "275px", height: "150px", backgroundColor: "#4e7cff"}
        },
        22: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.rareMatosFragments},
            pay(amt) { player.ma.rareMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(4).pow(5).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Post-OTF U1 Boost"
            },
            tooltip() {
                return "This includes time cubes, crystals, steel, pollinators, and charge."
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
            style: { width: "275px", height: "150px", backgroundColor: "#4e7cff"}
        },
        23: {
            costBase() { return new Decimal(9) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.rareMatosFragments},
            pay(amt) { player.ma.rareMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.04).add(1) },
            unlocked: true,
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
            style: { width: "275px", height: "150px", backgroundColor: "#4e7cff"}
        },
        24: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ma.rareMatosFragments},
            pay(amt) { player.ma.rareMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.7).add(1)},
            unlocked: true,
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
            style: { width: "275px", height: "150px", backgroundColor: "#4e7cff"}
        },
        31: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ma.epicMatosFragments},
            pay(amt) { player.ma.epicMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1)},
            unlocked() { return hasUpgrade("ma", 26) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Star Boost"
            },
            display() {
                return "which are boosting star gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Epic Matos Fragments"
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
            style: { width: "275px", height: "150px", backgroundColor: "#cb79ed"}
        },
        32: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ma.epicMatosFragments},
            pay(amt) { player.ma.epicMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2)},
            unlocked() { return hasUpgrade("ma", 26) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Star Power Boost"
            },
            display() {
                return "which are boosting star power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Epic Matos Fragments"
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
            style: { width: "275px", height: "150px", backgroundColor: "#cb79ed"}
        },
        33: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.ma.epicMatosFragments},
            pay(amt) { player.ma.epicMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.04).add(1)},
            unlocked() { return hasUpgrade("ma", 26) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "CB Button Automation Boost"
            },
            display() {
                return "which are dividing check back XP button automation times by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Epic Matos Fragments"
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
            style: { width: "275px", height: "150px", backgroundColor: "#cb79ed"}
        },
        34: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.ma.epicMatosFragments},
            pay(amt) { player.ma.epicMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.04).add(1)},
            unlocked() { return hasUpgrade("ma", 26) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "CB Pet Button Automation Boost"
            },
            display() {
                return "which are dividing check back pet button automation times by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Epic Matos Fragments"
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
            style: { width: "275px", height: "150px", backgroundColor: "#cb79ed"}
        },
        //health regen
        35: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ma.legendaryMatosFragments},
            pay(amt) { player.ma.legendaryMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.15)},
            unlocked() { return hasUpgrade("ma", 28) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Kres Health Regen"
            },
            display() {
                return "which are providing " + format(tmp[this.layer].buyables[this.id].effect) + " health regen to Kres.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Legendary Matos Fragments"
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
            style: { width: "275px", height: "150px", backgroundColor: "#eed200"}
        }, 
        36: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ma.legendaryMatosFragments},
            pay(amt) { player.ma.legendaryMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.15)},
            unlocked() { return hasUpgrade("ma", 28) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Nav Health Regen"
            },
            display() {
                return "which are providing " + format(tmp[this.layer].buyables[this.id].effect) + " health regen to Nav.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Legendary Matos Fragments"
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
            style: { width: "275px", height: "150px", backgroundColor: "#eed200"}
        }, 
        37: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ma.legendaryMatosFragments},
            pay(amt) { player.ma.legendaryMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.15)},
            unlocked() { return hasUpgrade("ma", 28) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Sel Health Regen"
            },
            display() {
                return "which are providing " + format(tmp[this.layer].buyables[this.id].effect) + " health regen to Sel.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Legendary Matos Fragments"
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
            style: { width: "275px", height: "150px", backgroundColor: "#eed200"}
        }, 
        38: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ma.legendaryMatosFragments},
            pay(amt) { player.ma.legendaryMatosFragments = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.15)},
            unlocked() { return hasUpgrade("ma", 28) && player.pet.levelables[501][0].gte(1)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Eclipse Health Regen"
            },
            display() {
                return "which are providing " + format(tmp[this.layer].buyables[this.id].effect) + " health regen to Eclipse.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Legendary Matos Fragments"
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
            style: { width: "275px", height: "150px", backgroundColor: "#eed200"}
        }, 
        //other stuff
        101: {
            costBase() { return new Decimal(1e100) },
            costGrowth() { return new Decimal(1e10) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1)},
            unlocked() { return hasUpgrade("ma", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Kres Boost"
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
            style: {width: "275px", height: "150px", backgroundColor: "#aa0000", backgroundImage: "linear-gradient(180deg, red 0%, black 125%)", backgroundOrigin: "border-box"}
        },
        102: {
            costBase() { return new Decimal(1e100) },
            costGrowth() { return new Decimal(1e10) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1)},
            unlocked() { return hasUpgrade("ma", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Nav Boost"
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
            style: {width: "275px", height: "150px", backgroundColor: "#aa0000", backgroundImage: "linear-gradient(180deg, red 0%, black 125%)", backgroundOrigin: "border-box"}
        },
        103: {
            costBase() { return new Decimal(1e100) },
            costGrowth() { return new Decimal(1e10) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1)},
            unlocked() { return hasUpgrade("ma", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Sel Boost"
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
            style: {width: "275px", height: "150px", backgroundColor: "#aa0000", backgroundImage: "linear-gradient(180deg, red 0%, black 125%)", backgroundOrigin: "border-box"}
        },
        //eclipse
        201: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.eclipseShards},
            pay(amt) { player.sma.eclipseShards = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.pet.levelables[501][0].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Eclipse Strength Boost"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " total strength to eclipse.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Eclipse Shards"
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
            style: { width: '275px', height: '150px', "background-color": "rgb(245, 255, 104)" }
        },
        202: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.eclipseShards},
            pay(amt) { player.sma.eclipseShards = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.pet.levelables[501][0].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Eclipse Defense Boost"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " total defense to eclipse.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Eclipse Shards"
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
            style: { width: '275px', height: '150px', "background-color": "rgb(245, 255, 104)" }
        },
        203: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.eclipseShards},
            pay(amt) { player.sma.eclipseShards = this.currency().sub(amt).floor() },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.pet.levelables[501][0].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Eclipse Agility Boost"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " total agility to eclipse.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Eclipse Shards"
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
            style: { width: '275px', height: '150px', "background-color": "rgb(245, 255, 104)" }
        },
    },
    milestones: {
        101: {
            requirementDescription: "<h3>100 Depth 1 Combo",
            effectDescription: "Keep 10% of highest Depth 1 combo",
            toggles: [["ma", "keepCombo1"]],
            done() { return player.ma.bestComboDepth1.gte(100) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "90px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        102: {
            requirementDescription: "<h3>150 Depth 1 Combo",
            effectDescription: "Unlock a second Depth 1 combo effect.",
            done() { return player.ma.bestComboDepth1.gte(150) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        103: {
            requirementDescription: "<h3>200 Depth 1 Combo",
            effectDescription: "Improve first Depth 1 milestone by +15%",
            done() { return player.ma.bestComboDepth1.gte(200) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        104: {
            requirementDescription: "<h3>250 Depth 1 Combo",
            effectDescription: "Improve first Depth 1 combo effect.",
            done() { return player.ma.bestComboDepth1.gte(250) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        105: {
            requirementDescription: "<h3>300 Depth 1 Combo",
            effectDescription: "Improve first Depth 1 milestone by +20%",
            done() { return player.ma.bestComboDepth1.gte(300) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        106: {
            requirementDescription: "<h3>350 Depth 1 Combo",
            effectDescription: "Reduce combo softcap scaling by -0.1%.",
            done() { return player.ma.bestComboDepth1.gte(350) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        107: {
            requirementDescription: "<h3>400 Depth 1 Combo",
            effectDescription: "Improve first Depth 1 milestone by +25%",
            done() { return player.ma.bestComboDepth1.gte(400) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        108: {
            requirementDescription: "<h3>450 Depth 1 Combo",
            effectDescription: "Double legendary matos fragment gain.",
            done() { return player.ma.bestComboDepth1.gte(450) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        109: {
            requirementDescription: "<h3>500 Depth 1 Combo",
            effectDescription: "Improve first Depth 1 milestone by +30%",
            done() { return player.ma.bestComboDepth1.gte(500) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },

        201: {
            requirementDescription: "<h3>100 Depth 2 Combo",
            effectDescription: "Keep 10% of highest Depth 2 combo",
            toggles: [["ma", "keepCombo2"]],
            done() { return player.ma.bestComboDepth2.gte(100) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "90px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        202: {
            requirementDescription: "<h3>150 Depth 2 Combo",
            effectDescription: "Unlock a second Depth 2 combo effect.",
            done() { return player.ma.bestComboDepth2.gte(150) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        203: {
            requirementDescription: "<h3>200 Depth 2 Combo",
            effectDescription: "Improve first Depth 2 milestone by +15%",
            done() { return player.ma.bestComboDepth2.gte(200) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        204: {
            requirementDescription: "<h3>250 Depth 2 Combo",
            effectDescription: "Improve first Depth 2 combo effect.",
            done() { return player.ma.bestComboDepth2.gte(250) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        205: {
            requirementDescription: "<h3>300 Depth 2 Combo",
            effectDescription: "Improve first Depth 2 milestone by +20%",
            done() { return player.ma.bestComboDepth2.gte(300) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        206: {
            requirementDescription: "<h3>350 Depth 2 Combo",
            effectDescription: "Reduce combo softcap scaling by -0.1%.",
            done() { return player.ma.bestComboDepth2.gte(350) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        207: {
            requirementDescription: "<h3>400 Depth 2 Combo",
            effectDescription: "Improve first Depth 2 milestone by +25%",
            done() { return player.ma.bestComboDepth1.gte(400) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        208: {
            requirementDescription: "<h3>450 Depth 2 Combo",
            effectDescription: "Double legendary matos fragment gain.",
            done() { return player.ma.bestComboDepth2.gte(450) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        209: {
            requirementDescription: "<h3>500 Depth 2 Combo",
            effectDescription: "Improve first Depth 2 milestone by +30%",
            done() { return player.ma.bestComboDepth2.gte(500) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },

        301: {
            requirementDescription: "<h3>100 Depth 3 Combo",
            effectDescription: "Keep 10% of highest Depth 3 combo",
            toggles: [["ma", "keepCombo3"]],
            done() { return player.ma.bestComboDepth3.gte(100) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "90px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        302: {
            requirementDescription: "<h3>150 Depth 3 Combo",
            effectDescription: "Unlock a second Depth 3 combo effect.",
            done() { return player.ma.bestComboDepth3.gte(150) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        303: {
            requirementDescription: "<h3>200 Depth 3 Combo",
            effectDescription: "Improve first Depth 3 milestone by +15%",
            done() { return player.ma.bestComboDepth3.gte(200) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        304: {
            requirementDescription: "<h3>250 Depth 3 Combo",
            effectDescription: "Improve first Depth 3 combo effect.",
            done() { return player.ma.bestComboDepth3.gte(250) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        305: {
            requirementDescription: "<h3>300 Depth 3 Combo",
            effectDescription: "Improve first Depth 3 milestone by +20%",
            done() { return player.ma.bestComboDepth3.gte(300) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        306: {
            requirementDescription: "<h3>350 Depth 3 Combo",
            effectDescription: "Reduce combo softcap scaling by -0.1%.",
            done() { return player.ma.bestComboDepth3.gte(350) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        307: {
            requirementDescription: "<h3>400 Depth 3 Combo",
            effectDescription: "Improve first Depth 3 milestone by +25%",
            done() { return player.ma.bestComboDepth3.gte(400) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        308: {
            requirementDescription: "<h3>450 Depth 3 Combo",
            effectDescription: "Double legendary matos fragment gain.",
            done() { return player.ma.bestComboDepth3.gte(450) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
        309: {
            requirementDescription: "<h3>500 Depth 3 Combo",
            effectDescription: "Improve first Depth 3 milestone by +30%",
            done() { return player.ma.bestComboDepth3.gte(500) && hasUpgrade("ma", 31)},
            style: {boxSizing: "border-box", width: '585px', height: "60px", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "0px", marginBottom: "-5px"},
        },
    },
    challenges: {},
    infoboxes: {
        t1: {
            title: "Tutorial I",
            body() { return "So... You need help with how all this mumbo jumbo works eh? Don't worry. It's simple. As a matter of fact, it's more simple than other RPGs. If you want a frame of reference, its like NGU Idle's adventure mode but with less complicated stuff and more playable characters. So basically, there are three main stats: strength, defense, and agility. Your strength boosts your attack damage, defense boosts your max health, and agility speeds up your attack cooldowns. That's basically all you need to know for now. It will get more complicated later." },
            unlocked: true,
        },
        mystery: {
            title: "Secret Message",
            body() { return "It's me, Eclipse. Well, that's the name the others gave me. Ever since I transformed into this form I have been unable to speak. A strange force has preserved me in this form. I think it was a celestial, but I don't see why a celestial would ever do this. I have been granted with immense power at the cost of my voice. But you may be asking, how am I speaking to you right now? For some reason, an intense bond has been formed between us. I saw flashes of red, purple, and green light. I think it came from some sort of gemstones. Who knows. I am able to send you these superphysical messages now, I guess. I'll tell you my story." },
            unlocked() { return player.pet.levelables[501][0].gte(1)},
            style: { "color": "rgb(245, 255, 104)" }
        },
        mystery2: {
            title: "Secret Message II",
            body() { return "There once was a civilization here a long time ago. We built large cities, filled to the brim with factories. The rich managed to live a comfortable lifestyle while a majority of the population suffered. I ruled that civilization once. I was the civilization's last leader. I thought that giving offerings to the celestials would bring us peace and prosperity. That was a lie. One day, everything changed. A celestial was born in our universe. It was Matos. Matos had been fueled by a deep sense of hatred and anger. He attacked our civilization using large beams of energy, powered by singularity cores. This resulted in the extinction of humanity." },
            unlocked() { return player.pet.levelables[501][0].gte(2)},
            style: { "color": "rgb(245, 255, 104)" }
        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return !player.ma.matosUnlock },
                content: [
                    ["blank", "50px"],
                    ["row", [["clickable", 5]]],
                    ["blank", "50px"],
                    ["row", [
                        ["clickable", 6],
                        ["raw-html", "&nbsp&nbsp", {color: "white", fontSize: "50px", fontFamily: "monospace"}],
                        ["clickable", 4],
                        ["raw-html", "&nbsp&nbsp", {color: "white", fontSize: "50px", fontFamily: "monospace"}],
                        ["clickable", 7],
                    ]],
                    ["blank", "50px"],
                    ["row", [["clickable", 8]]],
                ]
            },
            "Stats": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "Character Stats", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ["raw-html", "(Individual characters can be upgraded once you unlock the epic pet variant)", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "750px", height: "70px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px 20px 0 0"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Kres: Warrior Class", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "247px", height: "40px", backgroundColor: "#480513", borderBottom: "3px solid #8a0e79"}],
                            ["style-column", [
                                ["raw-html", () => {return "Strength: <h3>" + formatWhole(player.ep3.kresStats[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Defense: <h3>" + formatWhole(player.ep3.kresStats[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Agility: <h3>" + formatWhole(player.ep3.kresStats[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "247px", height: "87px", backgroundColor: "#1d0207", borderRadius: "0 0 0 17px"}],
                        ], {width: "247px", height: "130px", borderRadius: "0 0 0 17px"}],
                        ["style-column", [], {width: "3px", height: "130px", backgroundColor: "#8a0e79"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Nav: Mage Class", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "40px", backgroundColor: "#380548", borderBottom: "3px solid #8a0e79"}],
                            ["style-column", [
                                ["raw-html", () => {return "Strength: <h3>" + formatWhole(player.ep4.navStats[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Defense: <h3>" + formatWhole(player.ep4.navStats[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Agility: <h3>" + formatWhole(player.ep4.navStats[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", backgroundColor: "#16021d"}],
                        ], {width: "250px", height: "130px"}],
                        ["style-column", [], {width: "3px", height: "130px", backgroundColor: "#8a0e79"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Sel: Ranger Class", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "247px", height: "40px", backgroundColor: "#065c19", borderBottom: "3px solid #8a0e79"}],
                            ["style-column", [
                                ["raw-html", () => {return "Strength: <h3>" + formatWhole(player.ep5.selStats[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Defense: <h3>" + formatWhole(player.ep5.selStats[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Agility: <h3>" + formatWhole(player.ep5.selStats[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "247px", height: "87px", backgroundColor: "#032e0c", borderRadius: "0 0 17px 0"}],
                        ], {width: "247px", height: "130px", borderRadius: "0 0 17px 0"}],
                    ], {width: "750px", height: "130px", backgroundColor: "#8a0e79", border: "3px solid #8a0e79", borderRadius: "0 0 20px 20px", marginTop: "-3px"}],
                    ["blank", "10px"],
                    ["raw-html", () => { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                    ["row", [["ex-buyable", 101], ["ex-buyable", 102], ["ex-buyable", 103]]],
                ]
            },
            "Eclipse": {
                buttonStyle: {borderColor: "#f5ff68", color: "white", borderRadius: "15px"},
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart && player.pet.levelables[501][0].gte(1) },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Eclipse: Support Class", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ], {width: "250px", height: "40px", backgroundColor: "#5b460c", borderBottom: "3px solid #8a0e79", borderRadius: "17px 17px 0 0"}],
                        ["style-column", [
                            ["raw-html", () => {return "Strength: <h3>" + formatWhole(player.ma.eclipseStats[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Defense: <h3>" + formatWhole(player.ma.eclipseStats[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Agility: <h3>" + formatWhole(player.ma.eclipseStats[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "250px", height: "87px", backgroundColor: "#241c04", borderRadius: "0 0 17px 17px"}],
                    ], {width: "250px", height: "130px", backgroundColor: "#8a0e79", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["blank", "10px"],
                    ["raw-html", () => {return "You have <h3>" + formatWhole(player.sma.eclipseShards) + "</h3> eclipse shards"}, {color: "#f5ff68", fontSize: "24px", fontFamily: "monospace"}],
                    ["blank", "10px"]
                    ["row", [["ex-buyable", 201], ["ex-buyable", 202], ["ex-buyable", 203]]],
                ]
            },
            "Black Heart": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", () => {return "Depth 1 highest combo: " + formatWhole(player.ma.bestComboDepth1) + " kills"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "Boosts IP gain by x" + format(player.ma.bestComboDepth1Effect)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return hasMilestone("ma", 102) ? "Boosts common matos fragment gain by x" + formatShort(player.ma.bestComboDepth1Effect2) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],

                        ["style-row", [], () => {return player.ma.secondAreaUnlock ? {width: "600px", height: "5px"} : {display: "none !important"}}],
                        ["raw-html", () => {return player.ma.secondAreaUnlock ? "Depth 2 highest combo: " + formatWhole(player.ma.bestComboDepth2) + " kills" : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return player.ma.secondAreaUnlock ? "Boosts NIP gain by x" + format(player.ma.bestComboDepth2Effect) : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return hasMilestone("ma", 2202) ? "Boosts rare matos fragment gain by x" + formatShort(player.ma.bestComboDepth2Effect2) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        
                        ["style-row", [], () => {return hasUpgrade("ma", 27) ? {width: "600px", height: "5px"} : {display: "none !important"}}],
                        ["raw-html", () => {return hasUpgrade("ma", 27) ? "Depth 3 highest combo: " + formatWhole(player.ma.bestComboDepth3) + " kills" : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return hasUpgrade("ma", 27) ? "Boosts SP gain by x" + format(player.ma.bestComboDepth3Effect) : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return hasMilestone("ma", 302) ? "Boosts epic matos fragment gain by x" + formatShort(player.ma.bestComboDepth3Effect2) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "600px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px", paddingTop: "10px", paddingBottom: "10px"}],
                    ["blank", "25px"],
                    ["microtabs", "combo", {borderWidth: "0px"}],
                ]
            },
            "Buyables and Upgrades": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content: [
                    ["microtabs", "upg", { 'border-width': '0px' }],
                ]
            },
            "Perks": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return player.ma.matosDefeated && !player.ma.inBlackHeart  },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "Perks for defeating Matos", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", backgroundImage: "linear-gradient(120deg, #8a0e79 0%, #a80c33 100%)", borderBottom: "5px", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
                    ["style-column", [
                        ["raw-html", () => { return "Downside: You can no longer fuel cores, and all your cores are destroyed." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Unlocks: Core Fragments and Starmetal Essence." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["raw-html", () => { return "x2 to check back XP gain." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "x1.5 to XPBoost gain." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "x1e20 to golden grass." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "x5 to moonstone." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "x1e600 boost to infinity points." }, {color: "white", fontSize: "18px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "x1e40 boost to singularity points." }, {color: "white", fontSize: "18px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "+1000 base radiation gain." }, {color: "white", fontSize: "18px", fontFamily: "monospace" }],
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", backgroundImage: "linear-gradient(120deg, #8a0e79 0%, #a80c33 100%)", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 15px 15px"}]
                ]
            },
            "Info": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content: [
                    ["blank", "25px"],
                    ["row", [["infobox", "t1"]]],
                    ["row", [["infobox", "mystery"]]],
                ]
            },
            "Prep": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "Welcome to the black heart.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", "You must be prepared to fight my celestialites.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", "Now. We must determine if you are truly ready or not.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "750px", height: "110px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 12], ["clickable", 13], ["clickable", 15], ["clickable", 21]]],
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Kres", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "247px", height: "40px", backgroundColor: "#480513", borderBottom: "3px solid #8a0e79", borderRadius: "17px 0 0 0"}],
                            ["style-column", [
                                ["raw-html", () => {return "Max Health: <h3>" + format(player.ma.healthMax[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average Damage: <h3>" + format(player.ma.damage[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Attack Cooldown: <h3>" + formatTime(player.ma.cooldown[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return hasUpgrade("ma", 28) ? "Health Regen: <h3>" + format(player.ma.healthRegen[0]) + "/s" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "247px", height: "104px", backgroundColor: "#1d0207", borderBottom: "3px solid #8a0e79"}],
                            ["clickable", 16],
                        ], {width: "247px", height: "200px", borderRadius: "17px 0 0 17px"}],
                        ["style-column", [], {width: "3px", height: "200px", backgroundColor: "#8a0e79"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Nav", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "40px", backgroundColor: "#380548", borderBottom: "3px solid #8a0e79"}],
                            ["style-column", [
                                ["raw-html", () => {return "Max Health: <h3>" + format(player.ma.healthMax[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average Damage: <h3>" + format(player.ma.damage[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Attack Cooldown: <h3>" + formatTime(player.ma.cooldown[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return hasUpgrade("ma", 28) ? "Health Regen: <h3>" + format(player.ma.healthRegen[1]) + "/s" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "104px", backgroundColor: "#16021d", borderBottom: "3px solid #8a0e79"}],
                            ["clickable", 17],
                        ], {width: "250px", height: "200px"}],
                        ["style-column", [], {width: "3px", height: "200px", backgroundColor: "#8a0e79"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Sel", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "247px", height: "40px", backgroundColor: "#065c19", borderBottom: "3px solid #8a0e79", borderRadius: "0 17px 0 0"}],
                            ["style-column", [
                                ["raw-html", () => {return "Max Health: <h3>" + format(player.ma.healthMax[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average Damage: <h3>" + format(player.ma.damage[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Attack Cooldown: <h3>" + formatTime(player.ma.cooldown[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return hasUpgrade("ma", 28) ? "Health Regen: <h3>" + format(player.ma.healthRegen[2]) + "/s" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "247px", height: "104px", backgroundColor: "#032e0c", borderBottom: "3px solid #8a0e79"}],
                            ["clickable", 18],
                        ], {width: "247px", height: "200px", borderRadius: "0 0 17px 17px"}],
                    ], {width: "750px", height: "200px", backgroundColor: "#8a0e79", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Eclipse: Support Class", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ], {width: "250px", height: "40px", backgroundColor: "#5b460c", borderBottom: "3px solid #8a0e79"}],
                        ["style-column", [
                            ["raw-html", () => {return "Max Health: <h3>" + format(player.ma.healthMax[3])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Average Damage: <h3>" + format(player.ma.damage[3])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Attack Cooldown: <h3>" + formatTime(player.ma.cooldown[3])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("ma", 28) ? "Health Regen: <h3>" + format(player.ma.healthRegen[3]) + "/s" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "250px", height: "104px", backgroundColor: "#241c04", borderBottom: "3px solid #8a0e79"}],
                        ["clickable", 19],
                    ], () => {return player.pet.levelables[501][0].gte(1) ? {width: "250px", height: "200px", backgroundColor: "#8a0e79", border: "3px solid #8a0e79", borderRadius: "0 0 20px 20px", marginTop: "-3px"} : {display: "none !important"}}],
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", () => {return "You need " + formatWhole(player.ma.charactersSelected) + "/3 characters selected to progress."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "650px", height: "40px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                ]
            },
            "Bullet Hell": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["row", [["bar", "kresHealth"], ["bar", "navHealth"], ["bar", "selHealth"], ["bar", "eclipseHealth"]]],
                    ["blank", "25px"],
                    ["raw-html", "Use WASD to dodge the attacks.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                ]
            },
            "Fight": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["column", [
                            ["row", [["clickable", 102], ["clickable", 105]]],
                            ["row", [["clickable", 101], ["clickable", 103]]],
                        ]],
                        ["blank", ["150px", "150px"]],
                        ["row", [["clickable", 104]]],
                    ]],
                    ["blank", "10px"],
                    ["style-row", [
                        ["style-row", [
                            ["style-column", [
                                ["raw-html", "Kres", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["blank", "5px"],
                                ["bar", "kresHealth"],
                                ["row", [
                                    ["style-row", [["bar", "kresAttack"], ["clickable", 201]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                    ["style-row", [["bar", "kresAttack2"], ["clickable", 204]], () => {return hasUpgrade("ma", 11) ? {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                ]],
                                ["row", [
                                    ["style-column", [["clickable", 207], ["bar", "kresAttack3"], ["bar", "teamBuffBar"]], () => {return hasUpgrade("ma", 23) ? {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                ]],
                            ], () => {return player.ma.selectedCharacters[0] ? {width: "215px"} : {display: "none !important"}}],
                            ["style-column", [
                                ["raw-html", "Nav", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["blank", "5px"],
                                ["bar", "navHealth"],
                                ["row", [
                                    ["style-row", [["bar", "navAttack"], ["clickable", 202]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                    ["style-row", [["bar", "navAttack2"], ["clickable", 205]], () => {return hasUpgrade("ma", 12) ? {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                ]],
                                ["row", [
                                    ["style-column", [["clickable", 208], ["bar", "navAttack3"], ["bar", "curseSpellBar"]], () => {return hasUpgrade("ma", 24) ? {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                ]],
                            ], () => {return player.ma.selectedCharacters[1] ? {width: "215px"} : {display: "none !important"}}],
                            ["style-column", [
                                ["raw-html", "Sel", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["blank", "5px"],
                                ["bar", "selHealth"],
                                ["row", [
                                    ["style-row", [["bar", "selAttack"], ["clickable", 203]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                    ["style-column", [["clickable", 206], ["bar", "selAttack2"], ["bar", "turretBar"]], () => {return hasUpgrade("ma", 13) ? {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                ]],
                                ["row", [
                                    ["style-column", [["clickable", 209], ["bar", "selAttack3"], ["bar", "energyBoostBar"]], () => {return hasUpgrade("ma", 25) ? {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                ]],
                            ], () => {return player.ma.selectedCharacters[2] ? {width: "215px"} : {display: "none !important"}}],
                            ["style-column", [
                                ["raw-html", "Eclipse", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ["blank", "5px"],
                                ["bar", "eclipseHealth"],
                                ["row", [
                                    ["style-row", [["clickable", 211]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                    ["style-row", [["clickable", 212], ["bar", "eclipseAttack2"]], () => {return hasUpgrade("sma", 221) ? {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                ]],
                            ], () => {return player.ma.selectedCharacters[3] ? {width: "215px"} : {display: "none !important"}}],
                        ], {width: "700px", height: "300px", backgroundColor: "rgba(0,0,0,0.2)", border: "2px solid white", borderRadius: "30px", margin: "5px"}],
                        ["style-column", [
                            ["raw-html", () => {return player.ma.currentCelestialiteType != 25 ? player.ma.celestialiteNames[player.ma.currentCelestialiteType] + " Celestialite" : player.ma.celestialiteNames[player.ma.currentCelestialiteType]}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", () => {
                                if (player.ma.currentDepth.eq(1)) return "Kill Combo: " + formatShortestWhole(player.ma.combo) + "/" + formatShortestWhole(player.ma.bestComboDepth1)
                                if (player.ma.currentDepth.eq(2)) return "Kill Combo: " + formatShortestWhole(player.ma.combo) + "/" + formatShortestWhole(player.ma.bestComboDepth2)
                                if (player.ma.currentDepth.eq(3)) return "Kill Combo: " + formatShortestWhole(player.ma.combo) + "/" + formatShortestWhole(player.ma.bestComboDepth3)
                                return "Kill Combo: " + formatShortestWhole(player.ma.combo)
                            }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "10px"],
                            ["style-row", [
                                ["bar", "celestialiteHealth"],
                                ["bar", "celestialiteShield"],
                                ["bar", "respawnBar"],
                            ], () => {return player.ma.celestialiteTimer.gte(0) && player.ma.currentCelestialiteType != 5 ? {width: "200px", height: "50px", border: "2px solid white", borderRadius: "17px 17px 0 0 ", margin: "-1px 50px -1px 50px"} : {width: "200px", height: "50px", border: "2px solid white", borderRadius: "17px", margin: "-1px 50px -1px 50px"}}],
                            ["bar", "celestialiteAttack"],
                            ["blank", "10px"],
                            ["clickable", 14],
                        ], {width: "300px", height: "300px", backgroundColor: "rgba(0,0,0,0.2)", border: "2px solid white", borderRadius: "30px", margin: "5px"}],
                        ["style-column", [
                            ["raw-html", () => `${player.ma.log.map((x, i) => `<span style="display:block;">${x}</span>`).join("")}`],
                        ], {width: "600px", textAlign: "center", background: "rgba(0,0,0,0.5)", border: "2px solid white", borderRadius: "30px", padding: "12px 0", margin: "5px"}],
                    ], {maxWidth: "1400px"}],
                ]
            },
            "Dead": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return false },
                content: [
                    ["blank", "200px"],
                    ["style-column", [
                        ["raw-html", () => { return "Everyone has died, how unfortunate." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "I had a gut feeling you would have been able to beat me." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Oh well..." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "800px", height: "110px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.commonMatosFragments) + "</h3> common matos fragments."}, {color: "#9bedff", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.rareMatosFragments) + "</h3> rare matos fragments."}, {color: "#4e7cff", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.epicMatosFragments) + "</h3> epic matos fragments."}, {color: "#cb79ed", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.legendaryMatosFragments) + "</h3> legendary matos fragments."}, {color: "#eed200", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "110px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                ],  
            },
            "Win": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return false },
                content: [
                    ["blank", "200px"],
                    ["style-column", [
                        ["raw-html", "You won.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", "Here are your winnings:", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "+" + formatShortestWhole(Decimal.mul(700, player.ma.matosFragmentMult[0])) + " common matos fragments."}, {color: "#9bedff", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "+" + formatShortestWhole(Decimal.mul(300, player.ma.matosFragmentMult[1])) + " rare matos fragments."}, {color: "#4e7cff", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "+" + formatShortestWhole(Decimal.mul(50, player.ma.matosFragmentMult[2])) + " epic matos fragments."}, {color: "#cb79ed", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "+" + formatShortestWhole(Decimal.mul(5, player.ma.matosFragmentMult[3])) + " legendary matos fragments."}, {color: "#eed200", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "600px", height: "180px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "Don't forget to check the new tab in the Matos layer for extra rewards.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", "Matos is dead, but we can use simulations so you can refight him.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", "Also, a lot of things have changed around here. Good luck.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "800px", height: "180px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                ],  
            },
        },
        upg: {
            "Buyables": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.commonMatosFragments) + "</h3> common matos fragments."}, {color: "#9bedff", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.rareMatosFragments) + "</h3> rare matos fragments."}, {color: "#4e7cff", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.epicMatosFragments) + "</h3> epic matos fragments."}, {color: "#cb79ed", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.legendaryMatosFragments) + "</h3> legendary matos fragments."}, {color: "#eed200", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "110px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["style-row", [
                        ["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17],
                        ["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24],
                        ["ex-buyable", 31], ["ex-buyable", 32], ["ex-buyable", 33], ["ex-buyable", 34],
                        ["ex-buyable", 35], ["ex-buyable", 36], ["ex-buyable", 37], ["ex-buyable", 38],
                    ], {maxWidth: "1200px"}],
                ]
            },
            "Upgrades": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() { return player.ma.matosUnlock && !player.ma.inBlackHeart },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.commonMatosFragments) + "</h3> common matos fragments."}, {color: "#9bedff", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.rareMatosFragments) + "</h3> rare matos fragments."}, {color: "#4e7cff", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.epicMatosFragments) + "</h3> epic matos fragments."}, {color: "#cb79ed", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "You have <h3>" + formatShortWhole(player.ma.legendaryMatosFragments) + "</h3> legendary matos fragments."}, {color: "#eed200", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "110px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["blank", "25px"],
                        ["row", [ // Common
                            ["upgrade", 11], ["upgrade", 15], ["upgrade", 19], ["upgrade", 29], ["upgrade", 31],
                        ]],
                        ["row", [ // Rare
                            ["upgrade", 12], ["upgrade", 16], ["upgrade", 18], ["upgrade", 22], ["upgrade", 30],
                        ]],
                        ["row", [ // Epic
                            ["upgrade", 13], ["upgrade", 17], ["upgrade", 14], ["upgrade", 21], ["upgrade", 28],
                        ]],
                        ["row", [ // Legendary
                            ["upgrade", 23], ["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27],
                        ]],
                ]
            },
        },
        combo: {
            "None": {
                buttonStyle: {display: "none !important"},
                unlocked: true,
                content: [
                    
                ]
            },
            "Depth 1": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() {return hasUpgrade("ma", 31)},
                content: [
                    ["blank", "10px"],
                    ["always-scroll-column", [
                        ["milestone", 101],
                        ["milestone", 102],
                        ["milestone", 103],
                        ["milestone", 104],
                        ["milestone", 105],
                        ["milestone", 106],
                        ["milestone", 107],
                        ["milestone", 108],
                        ["milestone", 109],
                    ], {width: "600px", height: "400px", backgroundColor: "rgba(0,0,0,0.5)", border: "3px solid #8a0e79"}],
                ]
            },
            "Depth 2": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() {return hasUpgrade("ma", 31)},
                content: [
                    ["blank", "10px"],
                    ["always-scroll-column", [
                        ["milestone", 201],
                        ["milestone", 202],
                        ["milestone", 203],
                        ["milestone", 204],
                        ["milestone", 205],
                        ["milestone", 206],
                        ["milestone", 207],
                        ["milestone", 208],
                        ["milestone", 209],
                    ], {width: "600px", height: "400px", backgroundColor: "rgba(0,0,0,0.5)", border: "3px solid #8a0e79"}],
                ]
            },
            "Depth 3": {
                buttonStyle: {color: "white", borderRadius: "15px"},
                unlocked() {return hasUpgrade("ma", 31)},
                content: [
                    ["blank", "10px"],
                    ["always-scroll-column", [
                        ["milestone", 301],
                        ["milestone", 302],
                        ["milestone", 303],
                        ["milestone", 304],
                        ["milestone", 305],
                        ["milestone", 306],
                        ["milestone", 307],
                        ["milestone", 308],
                        ["milestone", 309],
                    ], {width: "600px", height: "400px", backgroundColor: "rgba(0,0,0,0.5)", border: "3px solid #8a0e79"}],
                ]
            }
        },
    }, 
    tabFormat: [
        ["row", [
            ["raw-html", () => {return !player.ma.inBlackHeart ? "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points": ""}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return !player.ma.inBlackHeart ? "(+" + format(player.s.singularityPointsToGet) + ")" : ""}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.in.infinityPoints.gte(1e40)) {look.color = "white"} else {look.color = "gray"} 
                return look
            }],
            ["raw-html", () => {return player.ma.inBlackHeart ? "" : player.in.infinityPoints.gte("2.71e3793") ? "[SOFTCAPPED<sup>2</sup>]" : player.in.infinityPoints.gte(2.5e193) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && tmp.pu.levelables[302].canClick }
})
function logPrint(line) {
    player.ma.log.push(line); // Push the raw HTML string directly
    if (player.ma.log.length > 10) player.ma.log.shift(); // Ensure log size remains consistent
}

function takeDamage() {
    // Only take damage in Bullet Hell
    if (!player || !player.subtabs || !player.subtabs["ma"] || player.subtabs["ma"]["stuff"] !== "Bullet Hell") return;

    const now = Date.now();
    // Immortality frames: only allow damage every 400ms
    if (typeof window.lastDamageTime !== "number") window.lastDamageTime = 0;
    if (now - window.lastDamageTime < 400) return;
    window.lastDamageTime = now;

    // Find all alive characters (not dead)
    if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return;
    const alive = [];
    for (let i = 0; i < player.ma.health.length; i++) {
        // Use .gt/.lte if Decimal, else use JS numbers
        const hp = player.ma.health[i];
        const isAlive = !player.ma.deadCharacters[i] && (
            (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
        );
        if (isAlive) alive.push(i);
    }
    if (alive.length === 0) return;

    // Pick a random alive character
    const idx = alive[Math.floor(Math.random() * alive.length)];
    // Remove random amount of health (6-10)
    const dmg = 6 + Math.floor(Math.random() * 4);

    // Subtract using Decimal if needed
    if (typeof player.ma.health[idx] === "object" && typeof player.ma.health[idx].sub === "function") {
        player.ma.health[idx] = player.ma.health[idx].sub(dmg);
        if (player.ma.health[idx].lte(0)) {
            player.ma.health[idx] = new Decimal(0);
            player.ma.deadCharacters[idx] = true;
        }
    } else {
        player.ma.health[idx] = Math.max(0, player.ma.health[idx] - dmg);
        if (player.ma.health[idx] === 0) player.ma.deadCharacters[idx] = true;
    }
}

function flashScreen(message, duration) {
    // Remove any existing flash overlay
    const old = document.getElementById("flash-overlay");
    if (old) old.remove();

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "flash-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "#fff";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.2s";

    // Create text
    const text = document.createElement("div");
    text.innerText = message;
    text.style.color = "#000";
    text.style.fontSize = "3vw";
    text.style.fontWeight = "bold";
    text.style.textAlign = "center";
    text.style.textShadow = "0 2px 8px #fff";
    overlay.appendChild(text);

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => {
            if (overlay.parentNode) overlay.remove();
        }, 200);
    }, duration);
}