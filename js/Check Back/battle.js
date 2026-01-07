
addLayer("ba", {
    name: "Battle", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Battle", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        round: new Decimal(0),
        wave: new Decimal(1),

        selectedID: new Decimal(0),
        infoTexts: [],
        celestialiteTexts: [],

        petIDs: [],
        petHealths: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        petMaxHealths: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        petDamagesPreBuff: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        petDamages: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        petIndex: new Decimal(0),
        petImage: "",
        log: ["", "", "", "", "", "",],
        log2: ["", "", "", "", "", "",],

        celestialiteIDs: [],
        celestialiteImages: [],
        celestialiteNames: [],
        celestialiteHealths: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        celestialiteMaxHealths: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        celestialiteDamages: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        celestialiteIndex: new Decimal(0),

        currentAttackSequence: [],
        currentAttackSequenceTexts: [],
        currentAttack: 0,
        /* example

           written in the form [a, b, c, d, e, f]
           where a is pet ID
           b is the attack ID
           and c is the celestialite ID 
           and d s the pet ID in terms of the fight itself
           e is rarity
           f is another pet id 
           e and f are for ability ID

           [101, 0, 3]
           [103, 1, 2]
        
        */

        attackPower: new Decimal(0),
        attackPowerMax: new Decimal(25),

        actionTimer: new Decimal(0),
        actionTimerMax: new Decimal(60),

        currentlyAttacking: false,
        celestialitesAttacking: false,

        abilityID: [],
        petAbilityNames: [
            [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
            [["", "", ""],["", "", ""],],
        ],
        petAbilityAPCosts: [
            [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
            [["", "", ""],["", "", ""],],
        ],
        petAbilityDescriptions: [
            [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
            [["", "", ""],["", "", ""],],
        ],
        petAbilitiesAvailable: [
            [[true, true], [true, true], [true, true], [true, true], [true, true], [true, true],],
            [[true, true, true], [true, true, true]],
        ],
        spentAttackPower: new Decimal(0),

        //abilities
        curswordBlessing: false,
        immobilizedCelestialite: -1,
        cookieThorns: false,
        turret: false,
        cosmicRay: false,
        selID: new Decimal(0),
        geroaID: new Decimal(0),
        drainCelestialite: -1,
        eclipseID: new Decimal(0),
        motivatedPets: [],

        //celestialite abilities
        celestialiteAbilities: [
            
        ],
        /*
        0 - none
        1 - crit chance
        2 - multihit
        */

        abilityID: [0, 1]
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Fighting",
    color: "white",
    branches: [],
    update(delta) {
        if (player.ba.petIndex < 0) player.ba.petIndex = 0
        if (player.fi.battleTier.neq(0))
        {
                    player.ba.infoTexts = [];
        for (let i = 0; i < player.ba.petIDs.length; i++) {
            let text = "<h1>" + run(layers.sme.levelables[player.ba.petIDs[i]].title, layers.sme.levelables[player.ba.petIDs[i]]) + ": <br><h2>" + formatWhole(player.ba.petHealths[i]) + " HP/" + formatWhole(player.ba.petMaxHealths[i]) + " HP<br>" + formatWhole(player.ba.petDamages[i]) + " DMG<br>";
            player.ba.infoTexts.push(text);
        }
        player.ba.celestialiteTexts = [];
        for (let i = 0; i < player.ba.celestialiteIDs.length; i++) {
            let text = "<h1>" + player.ba.celestialiteNames[player.ba.celestialiteIDs[i]] + ": <br><h2>" + formatWhole(player.ba.celestialiteHealths[i]) + " HP/" + formatWhole(player.ba.celestialiteMaxHealths[i]) + " HP<br>" + formatWhole(player.ba.celestialiteDamages[i]) + " DMG<br>";
            player.ba.celestialiteTexts.push(text);
        }
        player.ba.currentAttackSequenceTexts = [];
        for (let i = 0; i < player.ba.currentAttackSequence.length; i++) {
            let text = player.ba.petAbilityNames[player.ba.currentAttackSequence[i][4]][player.ba.currentAttackSequence[i][5]][player.ba.currentAttackSequence[i][1]] + " -> " + player.ba.celestialiteNames[player.ba.celestialiteIDs[player.ba.currentAttackSequence[i][2]]];
            player.ba.currentAttackSequenceTexts.push(text);
        }

        for (let i = 0; i < player.ba.petIDs.length; i++)
        {
            player.ba.petDamages[i] = player.ba.petDamagesPreBuff[i]
            if (player.ba.motivatedPets && player.ba.motivatedPets.includes(i)) {
            player.ba.petDamages[i] = player.ba.petDamages[i].mul(1.4);
            }
            if (player.ba.curswordBlessing)
            {
                player.ba.petDamages[i] = player.ba.petDamages[i].mul(1.2)
            }
        }

        //ability control
        if (player.ba.curswordBlessing) {
            player.ba.petAbilitiesAvailable[0][0][1] = false
        }
        if (player.ba.cookieThorns) {
            player.ba.petAbilitiesAvailable[0][2][1] = false
        }
        if (player.ba.turret) {
            player.ba.petAbilitiesAvailable[0][5][1] = false
        }

        if (player.fi.inBattle) player.ba.petImage = run(layers.sme.levelables[player.ba.petIDs[player.ba.petIndex]].image, layers.sme.levelables[player.ba.petIDs[player.ba.petIndex]])

        player.ba.celestialiteImages = [
            "resources/battle/temporalAlpha.png",
            "resources/battle/temporalBeta.png",
            "resources/battle/temporalGamma.png",
            "resources/battle/temporalDelta.png",
            "resources/battle/temporalEpsilon.png",
            "resources/battle/temporalZeta.png",
            "resources/battle/temporalEta.png",
            "resources/battle/temporalTheta.png",
        ]
        player.ba.celestialiteNames = [
            "Temporal Alpha Celestialite",
            "Temporal Beta Celestialite",
            "Temporal Gamma Celestialite",
            "Temporal Delta Celestialite",
            "Temporal Epsilon Celestialite",
            "Temporal Zeta Celestialite",
            "Temporal Eta Celestialite",
            "Temporal Theta Celestialite",
        ]

        //pet deaths

        if (player.fi.inBattle)
        {
            for (let i = 0; i < player.ba.petIDs.length; i++)
            {
                if (player.ba.petHealths[i].lte(0) && player.ba.petIDs.length > 1)
                {
                    layers.ba.petDeath(i)
                }

                if (player.ba.petHealths[i].lte(0) && player.ba.petIDs.length == 1)
                {
                    player.subtabs["ba"]["content"] = "Lose"
                    player.fi.inBattle = false

                }
            }
            //celestialite deaths
            for (let i = 0; i < player.ba.celestialiteIDs.length; i++)
            {
                if (player.ba.celestialiteHealths[i].lte(0) && player.ba.celestialiteIDs.length >= 1)
                {
                    layers.ba.celestialiteDeath(i)
                    player.ba.drainCelestialite = -1
                }
                if (player.ba.celestialiteIDs.length == 0)
                {
                    layers.ba.selectCelestialites();
                    player.ba.wave = player.ba.wave.add(1)
                    player.ba.round = new Decimal(1)

                    let random = Math.random()

                    if (random < 0.05)
                    {
                        player.fi.temporalShards = player.fi.temporalShards.add(1)
                        logPrintBattle("<span style='color: #625fffff;'>You found a temporal shard! (You have " + formatWhole(player.fi.temporalShards) + ".)" ) 
                    }
                    logPrintBattle("<br>New wave has started.<br>" )

                    player.ba.attackPower = player.ba.attackPower.add(10)

                    //dont forget loot and stuff

                    player.ba.curswordBlessing = false
                    player.ba.cookieThorns = false
                    player.ba.turret = false

                                for (let i = 0; i < player.ba.petAbilitiesAvailable.length; i++) {
                for (let j = 0; j < player.ba.petAbilitiesAvailable[i].length; j++) {
                    if (Array.isArray(player.ba.petAbilitiesAvailable[i][j])) {
                        for (let k = 0; k < player.ba.petAbilitiesAvailable[i][j].length; k++) {
                            player.ba.petAbilitiesAvailable[i][j][k] = true;
                            }
                        } 
                    else {
                    player.ba.petAbilitiesAvailable[i][j] = true;
                }
                }
              
            }
                }
            }
            //make all timer stuff here

            if (player.ba.drainCelestialite >= 0) {
                let damage = player.ba.petDamages[player.ba.eclipseID].mul(0.01)
                player.ba.celestialiteHealths[player.ba.drainCelestialite] = player.ba.celestialiteHealths[player.ba.drainCelestialite].sub(damage.mul(delta))
            }
        }


        player.ba.attackPowerMax = new Decimal(25)
        if (player.ba.attackPower.gt(player.ba.attackPowerMax))
        {
            player.ba.attackPower = player.ba.attackPowerMax
        }

        if (player.ba.currentlyAttacking == false && player.ba.celestialitesAttacking == false)
        {
            player.ba.actionTimerMax = new Decimal(60)
        } else
        {
            player.ba.actionTimerMax = new Decimal(2)
        }

        player.ba.actionTimer = player.ba.actionTimer.sub(delta)

        for (let i = 0; i < player.ba.petHealths.length; i++)
        {
            if (player.ba.petHealths[i].gte(player.ba.petMaxHealths[i]))
            {
                player.ba.petHealths[i] = player.ba.petMaxHealths[i]
            }
        }

        player.ba.abilityID = [
            Math.floor((player.ba.petIDs[player.ba.petIndex] - 101) / 100),
            (player.ba.petIDs[player.ba.petIndex] - 101) % 100
        ];
        player.ba.petAbilityNames = 
        [
            [
                ["Cursword Slash", "Cursword Blessing"],
                ["Flamethrower", "Dragon's Roar"],
                ["Team Feed", "Cookie Thorns"],
                ["Big Attack", "Axe Throw"],
                ["Magic Attack", "Heal Spell"],
                ["Rapid Bowfire", "Turret"],
            ],
            [
                ["Drain", "Motivate", "Shield"],
                ["Cosmic Ray", "Radioactive Missile", "Self-Repair"],
            ],
        ]
        player.ba.petAbilityDescriptions = 
        [
            [
                [
                "Deals 75% of damage, with a 30% chance of dealing 200% damage.",
                "x1.2 buff to team damage for the rest of the wave."
                ],
                [
                "Deals 25% of damage to all celestialites.", 
                "A celestialite is unable to attack for a round."
                ],
                [
                "Heals 5% of HP for all teammates.", 
                "Deals 50% of damage to all celestialites that attack cookie for the rest of the wave."
                ],
                [
                "Deals 120% of damage, but 40% of the damage is self inflicted.", 
                "50% chance to deal 200% damage."
                ],
                [
                "Deals 100% of damage, but a 25% of the attack backfiring and dealing 60% self damage.", 
                "Heals the lowest HP member by 20% of their Max HP."
                ],
                [
                "Deals 50% of damage to 2 random celestialites.", 
                "Deals 25% of damage to a random celestialite every round for the rest of the wave."
                ],
            ],
            [
                [
                "Drains a celestialite's health by 1% of damage per second for the rest of the wave.", 
                "Random teammate deals x1.4 damage for the rest of the wave.", 
                "Shields random teammate for the rest of the wave from 50% of incoming damage."
                ],
                [
                "Deals 33% of damage any time a celestialite attacks for the round.", 
                "Deals 100% of damage to a target celestialite, then 25% of damage to all the others.", 
                "Heals back to 70% of HP. Only usable if currently less than 25% of HP."
                ],
            ],
        ]
        player.ba.petAbilityAPCosts = 
        [
            [
                [new Decimal(2), new Decimal(10),],
                [new Decimal(3), new Decimal(2),],
                [new Decimal(2), new Decimal(4),],
                [new Decimal(2), new Decimal(2),],
                [new Decimal(2), new Decimal(5),],
                [new Decimal(3), new Decimal(8),],
            ],
            [
                [new Decimal(6), new Decimal(6), new Decimal(4),],
                [new Decimal(4), new Decimal(5), new Decimal(6),],
            ],
        ]

        if (player.ba.actionTimer.lte(0) && !player.ba.currentlyAttacking && !player.ba.celestialitesAttacking)
        {
            player.ba.currentlyAttacking = true
            player.ba.actionTimer = new Decimal(2)
        }
        if (player.ba.currentlyAttacking)
        {
            if (player.ba.actionTimer.lte(0))
            {
                layers.ba.petAbility(player.ba.currentAttackSequence[player.ba.currentAttack][4], 
                    player.ba.currentAttackSequence[player.ba.currentAttack][5], 
                    player.ba.currentAttackSequence[player.ba.currentAttack][1],
                    player.ba.currentAttackSequence[player.ba.currentAttack][2],
                    player.ba.currentAttackSequence[player.ba.currentAttack][3],
                    )
                player.ba.currentAttack++
                player.ba.actionTimer = player.ba.actionTimerMax
            }

        }
        if (player.ba.currentAttack == player.ba.currentAttackSequence.length && player.ba.currentlyAttacking)
        {
            player.ba.currentlyAttacking = false
            player.ba.celestialitesAttacking = true
            logPrintBattle("<span style='color: #625fffff;'><br>Celestialites will begin attacking.<br>" )
            player.ba.currentAttack = 0

            if (player.ba.turret)
            {
                let damage = player.ba.petDamages[player.ba.selID].mul(0.33)
                let random = getRandomInt(player.ba.celestialiteIDs.length)

                player.ba.celestialiteHealths[random] = player.ba.celestialiteHealths[random].sub(damage)
                logPrintBattle("Sel's turret shoots " + player.ba.celestialiteNames[player.ba.celestialiteIDs[random]] + " for " + formatWhole(damage) + " damage!" )
            }
        }
        if (player.ba.celestialitesAttacking)
        {
            if (player.ba.actionTimer.lte(0))
            {
                if (player.ba.cosmicRay)
                {
                    let damage = player.ba.petDamages[player.ba.geroaID].mul(0.25)
                    player.ba.celestialiteHealths[player.ba.currentAttack] = player.ba.celestialiteHealths[player.ba.currentAttack].sub(damage)
                    logPrintBattle("Geroa blasts a cosmic ray at " + player.ba.celestialiteNames[player.ba.celestialiteIDs[player.ba.currentAttack]] + " for " + formatWhole(damage) + " damage!" )
                }
                layers.ba.celestialiteAbility(player.ba.currentAttack)
                player.ba.currentAttack++
                player.ba.actionTimer = player.ba.actionTimerMax
            }
        }
        if (player.ba.currentAttack == player.ba.celestialiteIDs.length && player.ba.celestialitesAttacking)
        {
            player.ba.attackPower = player.ba.attackPower.add(5) //change to variable if needed
            player.ba.spentAttackPower = new Decimal(0)
            player.ba.currentAttackSequence = []
            for (let i = 0; i < player.ba.petAbilitiesAvailable.length; i++) {
                for (let j = 0; j < player.ba.petAbilitiesAvailable[i].length; j++) {
                    if (Array.isArray(player.ba.petAbilitiesAvailable[i][j])) {
                        for (let k = 0; k < player.ba.petAbilitiesAvailable[i][j].length; k++) {
                            player.ba.petAbilitiesAvailable[i][j][k] = true;
                            }
                        } 
                    else {
                    player.ba.petAbilitiesAvailable[i][j] = true;
                }
                }
            }

            player.ba.celestialitesAttacking = false
            logPrintBattle("<br>New round has started.<br>" )
            player.ba.actionTimer = new Decimal(60)
            player.ba.currentAttack = 0

            player.ba.round = player.ba.round.add(1)

            player.ba.immobilizedCelestialite = -1
            player.ba.targetCelestialite = -1
            player.ba.cosmicRay = false
        }

        if (player.ba.wave.gte(player.fi.tier1BestWave) && player.fi.battleTier.eq(1))
        {
            player.fi.tier1BestWave = player.ba.wave
        }
        if (player.ba.wave.gte(player.fi.tier2BestWave) && player.fi.battleTier.eq(2))
        {
            player.fi.tier2BestWave = player.ba.wave
        }
        }
    },
    petAbility(rarity, petID, attackID, celestialiteID, petID2) {
        //rarity, petID, and attackID refer to the ability itself
        //petID2 refers to the ID of the pet that runs the ability
        if (rarity == 0 && petID == 0 && attackID == 0)
        {
            let random = Math.random()
            if (random < 0.8)
            {
                let damage = player.ba.petDamages[petID2].mul(0.75)
                player.ba.celestialiteHealths[celestialiteID] = player.ba.celestialiteHealths[celestialiteID].sub(damage)
                logPrintBattle("Dotknight slashes the " + player.ba.celestialiteNames[player.ba.celestialiteIDs[celestialiteID]] + " for " + formatWhole(damage) + " damage!" )
            } else
            {
                let damage = player.ba.petDamages[petID2].mul(2)
                player.ba.celestialiteHealths[celestialiteID] = player.ba.celestialiteHealths[celestialiteID].sub(damage)
                logPrintBattle("<span style='color: #910a0aff;'>Dotknight slashes the " + player.ba.celestialiteNames[player.ba.celestialiteIDs[celestialiteID]] + " for " + formatWhole(damage) + " damage! (CRITICAL HIT!)" )
            }
        }
        if (rarity == 0 && petID == 0 && attackID == 1)
        {
            player.ba.curswordBlessing = true 

            logPrintBattle("Dotknight blesses the team for this wave!" )
        }
        if (rarity == 0 && petID == 1 && attackID == 0)
        {
            player.ba.curswordBlessing = true 

            let damage = player.ba.petDamages[petID2].mul(0.25)
            for (let i = 0; i < player.ba.celestialiteHealths.length; i++)
            {
                player.ba.celestialiteHealths[i] = player.ba.celestialiteHealths[i].sub(damage)
            }
            logPrintBattle("The dragon spews out a fire that damages all celestialites for " + formatWhole(damage) + " damage!" )
        }
        if (rarity == 0 && petID == 1 && attackID == 1)
        {
            player.ba.immobilizedCelestialite = celestialiteID

            //make sure this doesnt work on bosses

            logPrintBattle("The dragon roars, causing the " + player.ba.celestialiteNames[player.ba.celestialiteIDs[celestialiteID]] + " to be shaken with fear! (Unable to attack this round)" )

        }
        if (rarity == 0 && petID == 2 && attackID == 0)
        {
            for (let i = 0; i < player.ba.petIDs.length; i++)
            {
                player.ba.petHealths[i] = player.ba.petHealths[i].add(player.ba.petMaxHealths[i].mul(0.05))
            }

            logPrintBattle("The cookie feeds all the teammates, healing each by 5% of their max hp." )

        }
        if (rarity == 0 && petID == 2 && attackID == 1)
        {
            player.ba.cookieThorns = true 

            logPrintBattle("Cookie will now deal thorns damage for the rest of the wave!" )
        }
        if (rarity == 0 && petID == 3 && attackID == 0)
        {
            let damage = player.ba.petDamages[petID2].mul(1.2)
            let selfDamage = player.ba.petDamages[petID2].mul(0.4)
            player.ba.celestialiteHealths[celestialiteID] = player.ba.celestialiteHealths[celestialiteID].sub(damage)
            player.ba.petHealths[petID2] = player.ba.petHealths[petID2].sub(selfDamage)
            logPrintBattle("Kres attacks the " + player.ba.celestialiteNames[player.ba.celestialiteIDs[celestialiteID]] + " for " + formatWhole(damage) + " damage, but deals " + formatWhole(selfDamage) +  " self-damage.")
        }
        if (rarity == 0 && petID == 3 && attackID == 1)
        {
            let random = Math.random()
            if (random < 0.5)
            {
                logPrintBattle("Damn. You missed!" )
            } else
            {
                let damage = player.ba.petDamages[petID2].mul(2)
                player.ba.celestialiteHealths[celestialiteID] = player.ba.celestialiteHealths[celestialiteID].sub(damage)
                logPrintBattle("<span style='color: #910a0aff;'>Kres throws his axe at the " + player.ba.celestialiteNames[player.ba.celestialiteIDs[celestialiteID]] + " for " + formatWhole(damage) + " damage! (Nice shot!)" )
            }
        }
        if (rarity == 0 && petID == 4 && attackID == 0)
        {
            let random = Math.random()
            if (random < 0.2)
            {
                let damage = player.ba.petDamages[petID2].mul(0.6)
                logPrintBattle("<span style='color: #810a91ff;'>Uh oh! The spell backfires and Nav takes " + formatWhole(damage) + " damage.")
            } else
            {
                let damage = player.ba.petDamages[petID2]
                player.ba.celestialiteHealths[celestialiteID] = player.ba.celestialiteHealths[celestialiteID].sub(damage)
                logPrintBattle("Nav casts a deadly spell at the " + player.ba.celestialiteNames[player.ba.celestialiteIDs[celestialiteID]] + " for " + formatWhole(damage) + " damage!" )
            }
        }
        if (rarity == 0 && petID == 4 && attackID == 1)
        {
             // Find teammate with lowest HP
            let lowestIndex = 0;
            for (let i = 1; i < player.ba.petIDs.length; i++) {
            if (player.ba.petHealths[i].lt(player.ba.petHealths[lowestIndex])) {
                lowestIndex = i;
            }
            }
            // Heal by 20% of max HP
            let healAmount = player.ba.petMaxHealths[lowestIndex].mul(0.2);
            player.ba.petHealths[lowestIndex] = player.ba.petHealths[lowestIndex].add(healAmount);
            // Clamp to max HP
            if (player.ba.petHealths[lowestIndex].gt(player.ba.petMaxHealths[lowestIndex])) {
            player.ba.petHealths[lowestIndex] = player.ba.petMaxHealths[lowestIndex];
            }
            logPrintBattle("Nav heals " + run(layers.sme.levelables[player.ba.petIDs[lowestIndex]].title, layers.sme.levelables[player.ba.petIDs[lowestIndex]]) + " for " + formatWhole(healAmount) + " HP!");
        }
        if (rarity == 0 && petID == 5 && attackID == 0)
        {
            // Get two unique random celestialite indices
            let indices = [];
            if (player.ba.celestialiteIDs.length > 1) {
                while (indices.length < 2) {
                    let idx = getRandomInt(player.ba.celestialiteIDs.length);
                    if (!indices.includes(idx)) indices.push(idx);
                }
            } else {
                indices = [0];
            }
            let damage = player.ba.petDamages[petID2].mul(0.5);
            for (let i = 0; i < indices.length; i++) {
                player.ba.celestialiteHealths[indices[i]] = player.ba.celestialiteHealths[indices[i]].sub(damage);
                logPrintBattle("Sel fires a rapid shot at " + player.ba.celestialiteNames[player.ba.celestialiteIDs[indices[i]]] + " for " + formatWhole(damage) + " damage!");
            }
        }
        if (rarity == 0 && petID == 5 && attackID == 1)
        {
            player.ba.turret = true
            player.ba.selID = petID2

            logPrintBattle("Sel places his turret down." )
        }
        if (rarity == 1 && petID == 0 && attackID == 0)
        {
            let damage = player.ba.petDamages[player.ba.eclipseID].mul(0.01)
            player.ba.drainCelestialite = celestialiteID
            player.ba.eclipseID = petID2

            logPrintBattle("<span style='color: #ccb73dff;'>Eclipse is draining health from " + player.ba.celestialiteNames[player.ba.celestialiteIDs[celestialiteID]] + " at a rate of " + formatWhole(damage) + " health/s." )
        }
        if (rarity == 1 && petID == 0 && attackID == 1)
        {
            // Pick a random teammate
            let teammateCount = player.ba.petIDs.length;
            let randomIndex = getRandomInt(teammateCount);
            player.ba.motivatedPets = [randomIndex]; // Store the index for reference

            logPrintBattle("<span style='color: #ccb73dff;'>Eclipse motivates " + run(layers.sme.levelables[player.ba.petIDs[randomIndex]].title, layers.sme.levelables[player.ba.petIDs[randomIndex]]) + ", giving them x1.4 damage for the rest of the wave!");
        }
        if (rarity == 1 && petID == 1 && attackID == 0)
        {
            player.ba.cosmicRay = true
            player.ba.geroaID = petID2

            logPrintBattle("<span style='color: #18c058ff;'>Geroa activates cosmic ray!");
        }
        if (rarity == 1 && petID == 1 && attackID == 1)
        {
            let damage = player.ba.petDamages[petID2].mul(1)
            player.ba.celestialiteHealths[celestialiteID] = player.ba.celestialiteHealths[celestialiteID].sub(damage)

            let damage2 = player.ba.petDamages[petID2].mul(0.25)
            for (let i = 0; i < player.ba.celestialiteHealths.length; i++)
            {
                player.ba.celestialiteHealths[i] = player.ba.celestialiteHealths[i].sub(damage2)
            }

            logPrintBattle("<span style='color: #18c058ff;'>Geroa launches at a radioactive missile at the " + player.ba.celestialiteNames[player.ba.celestialiteIDs[celestialiteID]] + ", dealing " + formatWhole(damage) + " damage!" )
            logPrintBattle("<span style='color: #18c058ff;'>The blast impact reaches all the other celestialites, dealing an adittional " + formatWhole(damage2) + " damage." )
        }
    },
    celestialiteAbility(ID) 
    {
        let damage = player.ba.celestialiteDamages[ID]
        let name = player.ba.celestialiteNames[player.ba.celestialiteIDs[ID]]

        if (ID != player.ba.immobilizedCelestialite)
        {
            let random = getRandomInt(player.ba.petIDs.length)

            if (player.ba.celestialiteAbilities[ID] == 0)
            {
                player.ba.petHealths[random] = player.ba.petHealths[random].sub(damage)
                logPrintBattle("The " + name + " attacks " + run(layers.sme.levelables[player.ba.petIDs[random]].title, layers.sme.levelables[player.ba.petIDs[random]]) + " for " + formatWhole(damage) + " damage." )
            }

            if (player.ba.celestialiteAbilities[ID] == 1)
            {
                let random2 = Math.random()

                if (random2 < 0.3)
                {
                    let newDamage = damage.mul(2.5)
                    player.ba.petHealths[random] = player.ba.petHealths[random].sub(damage)
                    logPrintBattle("<span style='color: #910a0aff;'>The " + name + " attacks " + run(layers.sme.levelables[player.ba.petIDs[random]].title, layers.sme.levelables[player.ba.petIDs[random]]) + " for " + formatWhole(newDamage) + " damage. (CRIT!)" )
                    player.ba.petHealths[random] = player.ba.petHealths[random].sub(damage)
                } else
                {
                    logPrintBattle("The " + name + " attacks " + run(layers.sme.levelables[player.ba.petIDs[random]].title, layers.sme.levelables[player.ba.petIDs[random]]) + " for " + formatWhole(damage) + " damage." )
                }
            }
            if (player.ba.celestialiteAbilities[ID] == 2)
            {
                let random2 = getRandomInt(player.ba.petIDs.length)

                player.ba.petHealths[random2] = player.ba.petHealths[random2].sub(damage)
                player.ba.petHealths[random] = player.ba.petHealths[random].sub(damage)
                logPrintBattle("The " + name + " attacks " + run(layers.sme.levelables[player.ba.petIDs[random]].title, layers.sme.levelables[player.ba.petIDs[random]]) + " and " + run(layers.sme.levelables[player.ba.petIDs[random2]].title, layers.sme.levelables[player.ba.petIDs[random2]]) + " for " + formatWhole(damage) + " damage." )
            }


            if (player.ba.petIDs[random] == 103 && player.ba.cookieThorns)
            {
                let thornsDamage = player.ba.petDamages[random].mul(0.5)
                player.ba.celestialiteHealths[ID] = player.ba.celestialiteHealths[ID].sub(thornsDamage)
                logPrintBattle("<span style='color: #810a91ff;'>Cookie thorns is activated, and the " + player.ba.celestialiteNames[player.ba.celestialiteIDs[ID]] + " takes " + formatWhole(thornsDamage) + " damage!" ) 
            }
        } else
        {
            logPrintBattle("The " + name + " is immobilized." )
        }

    },
    selectCelestialites() {
        player.ba.celestialiteIDs = []
        player.ba.celestialiteIndex = new Decimal(0)
        if (player.fi.battleTier.eq(1))
        {
            player.ba.celestialiteIDs = []
            let celestialiteAmount = getRandomInt(3) + 2
            for (let i = 0; i < celestialiteAmount; i++) {
                let celestialiteID = getRandomInt(4)
                player.ba.celestialiteIDs.push(celestialiteID)
            }
        }
        if (player.fi.battleTier.eq(2))
        {
            player.ba.celestialiteIDs = []
            let celestialiteAmount = getRandomInt(2) + 3
            for (let i = 0; i < celestialiteAmount; i++) {
                let celestialiteID = getRandomInt(6) + 2
                player.ba.celestialiteIDs.push(celestialiteID)
            }
        }
        player.ba.celestialiteHealths = []
        player.ba.celestialiteMaxHealths = []
        player.ba.celestialiteDamages = []
        player.ba.celestialiteAbilities = []
        for (let i = 0; i < player.ba.celestialiteIDs.length; i++)
        {
            if (player.ba.celestialiteIDs[i] == 0)
            {
                let health = Decimal.mul(Math.random(), 50).add(75)
                let damage = Decimal.mul(Math.random(), 5).add(15)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)

                player.ba.celestialiteAbilities.push(0)
            }
            if (player.ba.celestialiteIDs[i] == 1)
            {
                let health = Decimal.mul(Math.random(), 75).add(100)
                let damage = Decimal.mul(Math.random(), 7.5).add(20)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)

                player.ba.celestialiteAbilities.push(0)
            }
            if (player.ba.celestialiteIDs[i] == 2)
            {
                let health = Decimal.mul(Math.random(), 60).add(125)
                let damage = Decimal.mul(Math.random(), 7.5).add(15)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)

                player.ba.celestialiteAbilities.push(0)
            }
            if (player.ba.celestialiteIDs[i] == 3)
            {
                let health = Decimal.mul(Math.random(), 80).add(150)
                let damage = Decimal.mul(Math.random(), 10).add(20)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)

                player.ba.celestialiteAbilities.push(0)
            }
            if (player.ba.celestialiteIDs[i] == 4)
            {
                let health = Decimal.mul(Math.random(), 60).add(120)
                let damage = Decimal.mul(Math.random(), 6).add(25)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)

                player.ba.celestialiteAbilities.push(1)
            }
            if (player.ba.celestialiteIDs[i] == 5)
            {
                let health = Decimal.mul(Math.random(), 40).add(160)
                let damage = Decimal.mul(Math.random(), 7).add(20)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)

                player.ba.celestialiteAbilities.push(1)
            }
            if (player.ba.celestialiteIDs[i] == 6)
            {
                let health = Decimal.mul(Math.random(), 25).add(100)
                let damage = Decimal.mul(Math.random(), 4).add(10)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)

                player.ba.celestialiteAbilities.push(2)
            }
            if (player.ba.celestialiteIDs[i] == 7)
            {
                let health = Decimal.mul(Math.random(), 40).add(150)
                let damage = Decimal.mul(Math.random(), 5).add(12)

                player.ba.celestialiteHealths.push(health)
                player.ba.celestialiteMaxHealths.push(health)
                player.ba.celestialiteDamages.push(damage)

                player.ba.celestialiteAbilities.push(2)
            }
        }

        player.ba.celestialiteIndex = new Decimal(0)
    },
    petDeath(index){
        if (player.ba.petIndex.add(1).eq(player.ba.petIDs.length)) {
            player.ba.petIndex = player.ba.petIndex.sub(1)
            if (player.ba.petIndex < 0) player.ba.petIndex = 0
        }
        logPrintBattle("<span style='color: #bb0067ff;'>" + run(layers.sme.levelables[player.ba.petIDs[index]].title, layers.sme.levelables[player.ba.petIDs[index]]) + " is dead!" ) 
        // Remove only the element at 'index' from each array
        player.ba.petIDs.splice(index, 1);
        player.ba.petHealths.splice(index, 1);
        player.ba.petMaxHealths.splice(index, 1);
        player.ba.petDamages.splice(index, 1);
        // All remaining elements will automatically shift down to fill the lowest indices
    },
celestialiteDeath(index){

    if (player.ba.celestialiteIndex.add(1).eq(player.ba.celestialiteIDs.length)) {
        player.ba.celestialiteIndex = player.ba.celestialiteIndex.sub(1)
    }
    logPrintBattle("<span style='color: #625fffff;'>" + player.ba.celestialiteNames[player.ba.celestialiteIDs[index]] + " is dead!" ) 

    // Redirect attacks targeting this celestialite to a random remaining one
    if (player.ba.celestialiteIDs.length > 1) {
        let remainingIndices = [];
        for (let i = 0; i < player.ba.celestialiteIDs.length; i++) {
            if (i !== index) remainingIndices.push(i);
        }
        // After splice, the indices will shift, so store the old ID
        let deadCelestialiteID = player.ba.celestialiteIDs[index];
        // Update all queued attacks
        for (let i = 0; i < player.ba.currentAttackSequence.length; i++) {
            // currentAttackSequence[i][2] is the celestialite index at the time of queueing
            // If it matches the dead celestialite, redirect
            if (player.ba.currentAttackSequence[i][2] === index) {
                // Pick a new random target from remaining
                let newTarget = remainingIndices[getRandomInt(remainingIndices.length)];
                player.ba.currentAttackSequence[i][2] = newTarget;
            }
            // If the target index was after the removed one, decrement by 1 due to splice
            else if (player.ba.currentAttackSequence[i][2] > index) {
                player.ba.currentAttackSequence[i][2] -= 1;
            }
        }
    }

    //looting
    if (player.ba.celestialiteIDs[index] == 0)
    {
        let dustGain = getRandomInt(3) + 1

        player.fi.temporalDust = player.fi.temporalDust.add(dustGain)
        logPrintBattle("<span style='color: #ffffffff;'>You have found " + formatWhole(dustGain) + " temporal dust! (You have " + formatWhole(player.fi.temporalDust) + ".)"  ) 

        let random = Math.random()

        if (random < 0.04)
        {
            player.fi.temporalShards = player.fi.temporalShards.add(1)
            logPrintBattle("<span style='color: #625fffff;'>You found a temporal shard! (You have " + formatWhole(player.fi.temporalShards) + ".)" ) 
        }
    }
    if (player.ba.celestialiteIDs[index] == 1)
    {
        let dustGain = getRandomInt(3) + 2

        player.fi.temporalDust = player.fi.temporalDust.add(dustGain)
        logPrintBattle("<span style='color: #ffffffff;'>You have found " + formatWhole(dustGain) + " temporal dust! (You have " + formatWhole(player.fi.temporalDust) + ".)" ) 

        let random = Math.random()

        if (random < 0.05)
        {
            player.fi.temporalShards = player.fi.temporalShards.add(1)
            logPrintBattle("<span style='color: #625fffff;'>You found a temporal shard! (You have " + formatWhole(player.fi.temporalShards) + ".)" ) 
        }
    }
    if (player.ba.celestialiteIDs[index] == 2)
    {
        let dustGain = getRandomInt(3) + getRandomInt(2) + 2

        player.fi.temporalDust = player.fi.temporalDust.add(dustGain)
        logPrintBattle("<span style='color: #ffffffff;'>You have found " + formatWhole(dustGain) + " temporal dust! (You have " + formatWhole(player.fi.temporalDust) + ".)" ) 

        let random = Math.random()

        if (random < 0.06)
        {
            player.fi.temporalShards = player.fi.temporalShards.add(1)
            logPrintBattle("<span style='color: #625fffff;'>You found a temporal shard! (You have " + formatWhole(player.fi.temporalShards) + ".)" ) 
        }
    }
    if (player.ba.celestialiteIDs[index] == 3)
    {
        let dustGain = getRandomInt(4) + getRandomInt(3) + 2

        player.fi.temporalDust = player.fi.temporalDust.add(dustGain)
        logPrintBattle("<span style='color: #ffffffff;'>You have found " + formatWhole(dustGain) + " temporal dust! (You have " + formatWhole(player.fi.temporalDust) + ".)" ) 

        let random = Math.random()

        if (random < 0.07)
        {
            player.fi.temporalShards = player.fi.temporalShards.add(1)
            logPrintBattle("<span style='color: #625fffff;'>You found a temporal shard! (You have " + formatWhole(player.fi.temporalShards) + ".)" ) 
        }
    }

    //REMINDER: MAKE NEW REWARDS
    if (player.ba.celestialiteIDs[index] == 4) 
    {
        let dustGain = getRandomInt(5) + getRandomInt(3) + 2

        player.fi.temporalDust = player.fi.temporalDust.add(dustGain)
        logPrintBattle("<span style='color: #ffffffff;'>You have found " + formatWhole(dustGain) + " temporal dust! (You have " + formatWhole(player.fi.temporalDust) + ".)" ) 

        let random = Math.random()

        if (random < 0.08)
        {
            player.fi.temporalShards = player.fi.temporalShards.add(1)
            logPrintBattle("<span style='color: #625fffff;'>You found a temporal shard! (You have " + formatWhole(player.fi.temporalShards) + ".)" ) 
        }
    }
    if (player.ba.celestialiteIDs[index] == 5) 
    {
        let dustGain = getRandomInt(3) + getRandomInt(4) + 4

        player.fi.temporalDust = player.fi.temporalDust.add(dustGain)
        logPrintBattle("<span style='color: #ffffffff;'>You have found " + formatWhole(dustGain) + " temporal dust! (You have " + formatWhole(player.fi.temporalDust) + ".)" ) 

        let random = Math.random()

        if (random < 0.09)
        {
            player.fi.temporalShards = player.fi.temporalShards.add(1)
            logPrintBattle("<span style='color: #625fffff;'>You found a temporal shard! (You have " + formatWhole(player.fi.temporalShards) + ".)" ) 
        }
    }
    if (player.ba.celestialiteIDs[index] == 6) 
    {
        let dustGain = getRandomInt(5) + getRandomInt(5) + 2

        player.fi.temporalDust = player.fi.temporalDust.add(dustGain)
        logPrintBattle("<span style='color: #ffffffff;'>You have found " + formatWhole(dustGain) + " temporal dust! (You have " + formatWhole(player.fi.temporalDust) + ".)" ) 

        let random = Math.random()

        if (random < 0.1)
        {
            player.fi.temporalShards = player.fi.temporalShards.add(1)
            logPrintBattle("<span style='color: #625fffff;'>You found a temporal shard! (You have " + formatWhole(player.fi.temporalShards) + ".)" ) 
        }
    }
    if (player.ba.celestialiteIDs[index] == 7) 
    {
        let dustGain = getRandomInt(6) + getRandomInt(7) + 1

        player.fi.temporalDust = player.fi.temporalDust.add(dustGain)
        logPrintBattle("<span style='color: #ffffffff;'>You have found " + formatWhole(dustGain) + " temporal dust! (You have " + formatWhole(player.fi.temporalDust) + ".)" ) 

        let random = Math.random()

        if (random < 0.11)
        {
            player.fi.temporalShards = player.fi.temporalShards.add(1)
            logPrintBattle("<span style='color: #625fffff;'>You found a temporal shard! (You have " + formatWhole(player.fi.temporalShards) + ".)" ) 
        }
    }
    // Remove only the element at 'index' from each array
    player.ba.celestialiteIDs.splice(index, 1);
    player.ba.celestialiteHealths.splice(index, 1);
    player.ba.celestialiteMaxHealths.splice(index, 1);
    player.ba.celestialiteDamages.splice(index, 1);
    player.ba.celestialiteAbilities.splice(index, 1);
    // All remaining elements will automatically shift down to fill the lowest indices
},
    clickables: {
        1: {
            title() { return "<h3>Leave Battle" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ma.inBlackHeart = false
                player.fi.inBattle = false
                player.fi.battleTier = new Decimal(0)
                toggleOpt('menuShown')

                player.tab = "cb"

                player.ba.petHealths = []
                player.ba.petMaxHealths = []
                player.ba.petDamages = []
                player.ba.celestialiteIDs = [] 

                player.ba.petIndex = new Decimal(0)
                player.ba.currentlyAttacking = false

                pauseUniverse("U1", "unpause", true)
                pauseUniverse("UA", "unpause", true)
                pauseUniverse("U2", "unpause", true)
                pauseUniverse("A1", "unpause", true)
                pauseUniverse("A2", "unpause", true)
                pauseUniverse("U3", "unpause", true)

                player.universe = "CB"
            },
            style: { width: '100px', "min-height": '100px', 'color': "black", 'background-color': "white",},
        },
        2: {
            title() { return "<h2>->" },
            canClick() { return player.ba.petIndex.add(1).lt(player.ba.petIDs.length) },
            unlocked() { return true },
            onClick() {
                player.ba.petIndex = player.ba.petIndex.add(1)
            },
            style: { width: '75px', "min-height": '75px', 'color': "black",},
        },
        3: {
            title() { return "<h2><-" },
            canClick() { return player.ba.petIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.ba.petIndex = player.ba.petIndex.sub(1)
                if (player.ba.petIndex < 0) player.ba.petIndex = 0
            },
            style: { width: '75px', "min-height": '75px', 'color': "black",},
        },
        4: {
            title() { return "<img src='" + player.ba.petImage + "'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
            },
            style: { width: '150px', "min-height": '150px', 'color': "black",},
        },
        5: {
            title() { return "<h2>->" },
            canClick() { return player.ba.celestialiteIndex.add(1).lt(player.ba.celestialiteIDs.length) },
            unlocked() { return true },
            onClick() {
                player.ba.celestialiteIndex = player.ba.celestialiteIndex.add(1)
            },
            style: { width: '75px', "min-height": '75px', 'color': "black",},
        },
        6: {
            title() { return "<h2><-" },
            canClick() { return player.ba.celestialiteIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.ba.celestialiteIndex = player.ba.celestialiteIndex.sub(1)
            },
            style: { width: '75px', "min-height": '75px', 'color': "black",},
        },
        7: {
            title() { return "<img src='" + player.ba.celestialiteImages[player.ba.celestialiteIDs[player.ba.celestialiteIndex]] + "'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
            },
            style: { width: '150px', "min-height": '150px', 'color': "black",},
        },
        8: {
            title() { return "Reset Abilities" }, //make the skill name vary by pet
            canClick() { return !player.ba.currentlyAttacking  },
            unlocked() { return true },
            onClick() {
                player.ba.attackPower = player.ba.attackPower.add(player.ba.spentAttackPower)
                player.ba.spentAttackPower = new Decimal(0)

                player.ba.currentAttackSequence = []

                for (let i = 0; i < player.ba.petAbilitiesAvailable.length; i++) {
                    for (let j = 0; j < player.ba.petAbilitiesAvailable[i].length; j++) {
                        if (Array.isArray(player.ba.petAbilitiesAvailable[i][j])) {
                             for (let k = 0; k < player.ba.petAbilitiesAvailable[i][j].length; k++) {
                                player.ba.petAbilitiesAvailable[i][j][k] = true;
                             }
                        } 
                        else {
                        player.ba.petAbilitiesAvailable[i][j] = true;
                }
             }
}
            },
            style: { width: '100px', "min-height": '100px', 'color': "black",},
        },
        9: {
            title() { return "Start Attack" }, //make the skill name vary by pet
            canClick() { return !player.ba.currentlyAttacking && !player.ba.celestialitesAttacking  },
            unlocked() { return true },
            onClick() {
                let timeDecrease = player.ba.actionTimer.sub(2).max(0)

                // Make timer skills tick
                if (player.ba.drainCelestialite >= 0) {
                    let damage = player.ba.petDamages[player.ba.eclipseID].mul(0.01)
                    player.ba.celestialiteHealths[player.ba.drainCelestialite] = player.ba.celestialiteHealths[player.ba.drainCelestialite].sub(damage.mul(timeDecrease))
                }

                player.ba.actionTimer = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'color': "black",},
        },
        11: {
            title() { return player.fi.battleTier.neq(0) ? player.ba.petAbilityNames[player.ba.abilityID[0]][player.ba.abilityID[1]][0] : ""}, //make the skill name vary by pet
            tooltip() { return player.fi.battleTier.neq(0) ? "AP Cost: " + formatWhole(player.ba.petAbilityAPCosts[player.ba.abilityID[0]][player.ba.abilityID[1]][0]) + ".<br>" + player.ba.petAbilityDescriptions[player.ba.abilityID[0]][player.ba.abilityID[1]][0] : ""},
            canClick() { return player.fi.battleTier.neq(0) ? player.ba.petAbilitiesAvailable[player.ba.abilityID[0]][player.ba.abilityID[1]][0] && player.ba.attackPower.gte(player.ba.petAbilityAPCosts[player.ba.abilityID[0]][player.ba.abilityID[1]][0]) : false },
            unlocked() { return true },
            onClick() {
                player.ba.currentAttackSequence.push([player.ba.petIDs[player.ba.petIndex], 0, player.ba.celestialiteIndex, player.ba.petIndex, player.ba.abilityID[0], player.ba.abilityID[1]])

                player.ba.attackPower = player.ba.attackPower.sub(player.ba.petAbilityAPCosts[player.ba.abilityID[0]][player.ba.abilityID[1]][0])
                player.ba.spentAttackPower = player.ba.spentAttackPower.add(player.ba.petAbilityAPCosts[player.ba.abilityID[0]][player.ba.abilityID[1]][0])
                player.ba.petAbilitiesAvailable[player.ba.abilityID[0]][player.ba.abilityID[1]][0] = false
            },
            style: { width: '100px', "min-height": '100px', 'color': "black",},
        },
        12: {
            title() { return player.fi.battleTier.neq(0) ? player.ba.petAbilityNames[player.ba.abilityID[0]][player.ba.abilityID[1]][1] : ""},
            tooltip() { return player.fi.battleTier.neq(0) ? "AP Cost: " + formatWhole(player.ba.petAbilityAPCosts[player.ba.abilityID[0]][player.ba.abilityID[1]][1]) + ".<br>" + player.ba.petAbilityDescriptions[player.ba.abilityID[0]][player.ba.abilityID[1]][1] : ""},
            canClick() { return player.fi.battleTier.neq(0) ? player.ba.petAbilitiesAvailable[player.ba.abilityID[0]][player.ba.abilityID[1]][1] && player.ba.attackPower.gte(player.ba.petAbilityAPCosts[player.ba.abilityID[0]][player.ba.abilityID[1]][1]) : false },
            unlocked() { return true },
            onClick() {
                player.ba.currentAttackSequence.push([player.ba.petIDs[player.ba.petIndex], 1, player.ba.celestialiteIndex, player.ba.petIndex, player.ba.abilityID[0], player.ba.abilityID[1]])

                player.ba.attackPower = player.ba.attackPower.sub(player.ba.petAbilityAPCosts[player.ba.abilityID[0]][player.ba.abilityID[1]][1])
                player.ba.spentAttackPower = player.ba.spentAttackPower.add(player.ba.petAbilityAPCosts[player.ba.abilityID[0]][player.ba.abilityID[1]][1])
                player.ba.petAbilitiesAvailable[player.ba.abilityID[0]][player.ba.abilityID[1]][1] = false
            },
            style: { width: '100px', "min-height": '100px', 'color': "black",},
        },
        13: {
            title() { return "Skill III" },
            canClick() { return true },
            unlocked() { return false }, //change eventually
            onClick() {
            },
            style: { width: '100px', "min-height": '100px', 'color': "black",},
        },
    },
    levelables: {
    },
    bars: {
        healthBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.fi.inBattle ? player.ba.petHealths[player.ba.petIndex].div(player.ba.petMaxHealths[player.ba.petIndex]) : new Decimal(0)
            },
            fillStyle: {
                "background-color": "hsla(9, 89%, 25%, 1.00)",
            },
            display() {
                return "<h5>" + format(player.ba.petHealths[player.ba.petIndex]) + "/" + format(player.ba.petMaxHealths[player.ba.petIndex]) + "<h5> HP.</h5>";
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
        },
        celestialiteHealthBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() {
                return player.fi.inBattle ? player.ba.celestialiteHealths[player.ba.celestialiteIndex].div(player.ba.celestialiteMaxHealths[player.ba.celestialiteIndex]) : new Decimal(0)
            },
            fillStyle: {
                "background-color": "#073b77",
            },
            display() {
                return "<h5>" + format(player.ba.celestialiteHealths[player.ba.celestialiteIndex]) + "/" + format(player.ba.celestialiteMaxHealths[player.ba.celestialiteIndex]) + "<h5> HP.</h5>";
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
        },
        attackPowerBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() {
                return player.ba.attackPower.div(player.ba.attackPowerMax)
            },
            fillStyle: {
                "background-color": "hsla(150, 89%, 25%, 1.00)",
            },
            display() {
                return "<h5>" + formatWhole(player.ba.attackPower) + "/" + formatWhole(player.ba.attackPowerMax) + "<h5> AP.</h5>";
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
        },
        timeBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 800,
            height: 50,
            progress() {
                return player.ba.actionTimer.div(player.ba.actionTimerMax )
            },
            fillStyle: {
                "background-color": "hsla(268, 71%, 36%, 1.00)",
            },
            display() {
                return "<h5>" + formatTime(player.ba.actionTimer) + "/" + formatTime(player.ba.actionTimerMax) + "<h5></h5>";
            },
            baseStyle: {background: "rgba(0,0,0,0.5)"},
        },
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        content: {
            "Main": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["always-scroll-column", [
                                ["raw-html", () => { return player.ba.infoTexts.join("<br>") }, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                            ], {width: "297px", height: "300px", padding: "25px 0", backgroundImage: "linear-gradient(90deg, #220d04ff, #4b0e07ff)", border: "0px solid rgb(218, 218, 218)", borderBottom: "3px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                            ["always-scroll-column", [
                                ["raw-html", () => { return player.ba.currentAttackSequenceTexts.join("<br>") }, {color: "white", fontSize: "10px", fontFamily: "monospace"}],
                            ], {width: "287px", height: "447px", padding: "25px 5px", backgroundImage: "linear-gradient(-90deg, #000000ff, #0f0f0fff)", border: "0px solid rgb(218, 218, 218)", borderRight: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ], {width: "297px", height: "850px", bg: "linear-gradient(-90deg, #85300fff, #85300fff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return "Round " + formatWhole(player.ba.round) + ", Wave " + formatWhole(player.ba.wave) }, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                                ["bar", "timeBar"],
                                ["blank", "10px"],
                                ["raw-html", () => { return "Prepare your attack!" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                            ], {width: "1200px", height: "148px", bg: "linear-gradient(-90deg, #85300fff, #4b1703ff)", borderBottom: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                            ["style-row", [
                                ["style-column", [
                                ["row", [["clickable", 4],]],
                                ["blank", "25px"],
                                ["raw-html", () => { return run(layers.sme.levelables[player.ba.petIDs[player.ba.petIndex]].title, layers.sme.levelables[player.ba.petIDs[player.ba.petIndex]]) }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                                ["row", [["bar", "healthBar"]]],
                                ["blank", "25px"],
                                ["raw-html", () => { return formatWhole(player.ba.petIndex.add(1)) + "/" + formatWhole(player.ba.petIDs.length) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                ["row", [["clickable", 3],["clickable", 2],]],
                                ], {width: "600px", height: "500px", bg: "linear-gradient(-90deg, #85300fff, #4b1703ff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                                ["style-column", [
                                    ["clickable", 7],
                                    ["blank", "25px"],
                                    ["raw-html", () => { return player.ba.celestialiteNames[player.ba.celestialiteIDs[player.ba.celestialiteIndex]] }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                                    ["bar", "celestialiteHealthBar"],
                                    ["blank", "25px"],
                                    ["raw-html", () => { return formatWhole(player.ba.celestialiteIndex.add(1)) + "/" + formatWhole(player.ba.celestialiteIDs.length) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                    ["row", [["clickable", 6],["clickable", 5]]],
                                ], {width: "600px", height: "500px", bg: "linear-gradient(-90deg, #4b1703ff, #85300fff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                            ], {width: "1200px", height: "500px", bg: "linear-gradient(-90deg, #85300fff, #4b1703ff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                            ["style-row", [
                                ["column", [
                                    ["bar", "attackPowerBar"],
                                    ["blank", "10px"],
                                    ["row", [["clickable", 11],["clickable", 12], ["blank", "25px"],["clickable", 8],["clickable", 9],["clickable", 1]]],
                                ]],
                            ], {width: "1200px", height: "198px", bg: "linear-gradient(90deg, #220606ff, #180c02ff)", borderTop: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ], {width: "1200px", height: "850px", bg: "linear-gradient(-90deg, #521c07ff, #4b1703ff)", border: "0px solid rgb(218, 218, 218)", borderLeft: "3px solid rgb(218, 218, 218)", borderRight: "3px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ["style-column", [
                            ["always-scroll-column", [
                                ["raw-html", () => { return player.ba.celestialiteTexts.join("<br>") }, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                            ], {width: "297px", height: "300px", padding: "25px 0", backgroundImage: "linear-gradient(-90deg, #03172eff, #0b284bff)", border: "0px solid rgb(218, 218, 218)", borderBottom: "3px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                            ["top-column", [
                                ["raw-html", () => `
                                ${player.ba.log.map((x, i) => `<span style="display:block;">${x}</span>`).join("")}
                                `],
                            ], {width: "287px", height: "447px", padding: "25px 5px", backgroundImage: "linear-gradient(-90deg, #000000ff, #0f0f0fff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                        ], {width: "297px", height: "497px", bg: "linear-gradient(-90deg, #85300fff, #692205ff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                    ], {width: "1800px", height: "850px", bg: "linear-gradient(-90deg, #85300fff, #85300fff)", border: "3px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                ],
            },
            "Lose": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                        ["raw-html", function () { return "You Lost" }, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 1],]],
                ],
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "content", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true }
})
function logPrintBattle(line) {
    player.ba.log.push(line); // Push the raw HTML string directly
    if (player.ba.log.length > 6) player.ba.log.shift(); // Ensure log size remains consistent
}
function logPrintCelestialite(line) {
    player.ba.log2.push(line); // Push the raw HTML string directly
    if (player.ba.log2.length > 20) player.ba.log2.shift(); // Ensure log size remains consistent
}