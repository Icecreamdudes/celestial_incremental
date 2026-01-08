
addLayer("fi", {
    name: "Fighting", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Fight", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        battleCapacity: new Decimal(4),
        battleCapacityAvailable: new Decimal(4),
        battleCapacityCost: new Decimal(1),

        /*
        pet: {
            401: {
                health: new Decimal(150),
                healthMax: new Decimal(150),
                damage: new Decimal(25),
                damageMax: new Decimal(25),
            },
        },
        */

        petMaxHP: [[new Decimal(150),new Decimal(150),new Decimal(150),new Decimal(150),new Decimal(150),new Decimal(150),], [new Decimal(250), new Decimal(250)]],
        petMaxMaxHP: [[new Decimal(150),new Decimal(150),new Decimal(150),new Decimal(150),new Decimal(150),new Decimal(150),], [new Decimal(250), new Decimal(250)]],
        petDamage: [[new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),], [new Decimal(25), new Decimal(25)]],
        petMaxDamage: [[new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),new Decimal(25),], [new Decimal(25), new Decimal(25)]],

        petTitle: "",
        
        selectedMaxHP: new Decimal(0),
        selectedMaxMaxHP: new Decimal(0),
        selectedDamage: new Decimal(0),
        selectedMaxDamage: new Decimal(0),

        damageTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(600),
                base: new Decimal(1), //damage gain is affected by starmetal binding level
                gain: new Decimal(1),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(1800),
                base: new Decimal(2),
                gain: new Decimal(2),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(5400),
                base: new Decimal(5),
                gain: new Decimal(5),
            },
            3: {
                current: new Decimal(0),
                max: new Decimal(16200),
                base: new Decimal(12),
                gain: new Decimal(12),
            },
        },

        healthTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(600),
                base: new Decimal(1), //health gain is affected by normal pet level
                gain: new Decimal(1),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(1800),
                base: new Decimal(2),
                gain: new Decimal(2),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(5400),
                base: new Decimal(5),
                gain: new Decimal(5),
            },
            3: {
                current: new Decimal(0),
                max: new Decimal(16200),
                base: new Decimal(12),
                gain: new Decimal(12),
            },
        },

        petIndex: new Decimal(0),
        rarityIndex: new Decimal(0),

        selectedPets: [[false, false, false, false, false, false], [false]],
        selectedIDs: [],

        battleTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(600),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(1200),
            },
        },
        battleButtonTimers: [new Decimal(0),new Decimal(0),], 
        battleButtonTimersMax: [new Decimal(600),new Decimal(1200),], 

        battleTier: new Decimal(0),
        inBattle: false,

        temporalShards: new Decimal(0),
        temporalDust: new Decimal(0),

        tier1BestWave: new Decimal(0),
        tier2BestWave: new Decimal(0),

        //milestones
        milestone101Effect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Fighting",
    color: "#8b0000ff",
    branches: [],
    update(delta) {
        player.fi.battleCapacity = new Decimal(4)

        //player.fi.petMaxHP = [[new Decimal(100),new Decimal(150),new Decimal(100),new Decimal(200),new Decimal(150),new Decimal(100),], [new Decimal(250)]]
        //player.fi.petDamage = [[new Decimal(25),new Decimal(20),new Decimal(20),new Decimal(15),new Decimal(25),new Decimal(20),], [new Decimal(25)]]

        player.fi.petTitle = run(layers.sme.levelables[layers.sme.levelables.index].title, layers.sme.levelables[layers.sme.levelables.index]).toString()


        if (layers.sme.levelables.index != 0) {
            player.fi.selectedMaxHP = tmp.sme.levelables[layers.sme.levelables.index].effect[0]
            player.fi.selectedMaxMaxHP = tmp.sme.levelables[layers.sme.levelables.index].effect[3]
            player.fi.selectedDamage = tmp.sme.levelables[layers.sme.levelables.index].effect[1]
            player.fi.selectedMaxDamage = tmp.sme.levelables[layers.sme.levelables.index].effect[4]
        }

        let damageFactor = new Decimal(1)
        if (layers.sme.levelables.index < 200) damageFactor = player.sme.levelables[layers.sme.levelables.index][0].mul(0.75)
        if (layers.sme.levelables.index > 200) damageFactor = player.sme.levelables[layers.sme.levelables.index][0].mul(3.25)

        let healthFactor = new Decimal(1)
        if (layers.sme.levelables.index < 200) healthFactor = player.sme.levelables[layers.sme.levelables.index][0].mul(2.5)
        if (layers.sme.levelables.index > 200) healthFactor = player.sme.levelables[layers.sme.levelables.index][0].mul(15)

        for (let i in player.fi.damageTimers) {
            player.fi.damageTimers[i].current = player.fi.damageTimers[i].current.sub(delta)
            player.fi.damageTimers[i].gain = player.fi.damageTimers[i].base.mul(damageFactor)
        }

        for (let i in player.fi.healthTimers) {
            player.fi.healthTimers[i].current = player.fi.healthTimers[i].current.sub(delta)
            player.fi.healthTimers[i].gain = player.fi.healthTimers[i].base.mul(healthFactor)
        }

        if (player.fi.rarityIndex == 0) {
            player.fi.battleCapacityCost = new Decimal(1)
        }
        if (player.fi.rarityIndex == 1) {
            player.fi.battleCapacityCost = new Decimal(2)
        }

        player.fi.battleTimers[0].max = new Decimal(600)
        player.fi.battleTimers[1].max = new Decimal(1200)

        for (let i in player.fi.battleTimers) {
            player.fi.battleTimers[i].current = player.fi.battleTimers[i].current.sub(delta)
        }

        player.fi.selectedIDs = [];
        for (let rarity = 0; rarity < player.fi.selectedPets.length; rarity++) {
            for (let i = 0; i < player.fi.selectedPets[rarity].length; i++) {
                if (player.fi.selectedPets[rarity][i]) {
                    let id = rarity === 0 ? 101 + i : 201 + i;
                    player.fi.selectedIDs.push(id);
                }

                for (let rarity = 0; rarity < player.fi.petMaxMaxHP.length; rarity++) {
                    for (let i = 0; i < player.fi.petMaxMaxHP[rarity].length; i++) {
                     // Get starmetal binding level for this pet
                    let petID = rarity === 0 ? 101 + i : 201 + i;
                    let starmetalLevel = player.sme.levelables[petID][0];
                    let baseHP = rarity === 0 ? new Decimal(150) : new Decimal(250);
                    let baseDMG = new Decimal(25);
                    if (rarity == 0) player.fi.petMaxMaxHP[rarity][i] = baseHP.add(starmetalLevel.mul(25));
                    if (rarity == 1) player.fi.petMaxMaxHP[rarity][i] = baseHP.add(starmetalLevel.mul(125));
                    if (rarity == 0) player.fi.petMaxDamage[rarity][i] = baseDMG.add(starmetalLevel.mul(5));
                    if (rarity == 1) player.fi.petMaxDamage[rarity][i] = baseDMG.add(starmetalLevel.mul(25));
                    }
                }

                for (let rarity = 0; rarity < player.fi.petMaxHP.length; rarity++) {
                    for (let i = 0; i < player.fi.petMaxHP[rarity].length; i++) {
                        // Cap petMaxHP to petMaxMaxHP
                        if (player.fi.petMaxHP[rarity][i].gt(player.fi.petMaxMaxHP[rarity][i])) {
                            player.fi.petMaxHP[rarity][i] = player.fi.petMaxMaxHP[rarity][i];
                        }   
                        // Cap petDamage to petMaxDamage
                        if (player.fi.petDamage[rarity][i].gt(player.fi.petMaxDamage[rarity][i])) {
                            player.fi.petDamage[rarity][i] = player.fi.petMaxDamage[rarity][i];
                        }   
                    }
                }
            }
        }

    player.fi.milestone101Effect = player.fi.tier1BestWave.pow(0.6).div(25).add(1)
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', minHeight: '50px' },
        },
        2: {
            title() { return "<h3>Select this pet" },
            canClick() {
                if (layers.sme.levelables.index > 100) {
                    return player.fi.battleCapacityAvailable.gte(player.fi.battleCapacityCost) && !getLevelableTier("sme", layers.sme.levelables.index, true) && !player.fi.selectedPets[Number(layers.sme.levelables.index.toString()[0])-1][Number(layers.sme.levelables.index.toString()[2])-1]
                } else {
                    return player.fi.battleCapacityAvailable.gte(player.fi.battleCapacityCost) && !getLevelableTier("sme", layers.sme.levelables.index, true)
                }
            },
            unlocked() { return true },
            onClick() {
                setLevelableTier("sme", layers.sme.levelables.index, true)
                player.fi.selectedPets[player.fi.rarityIndex][player.fi.petIndex] = true
                player.fi.battleCapacityAvailable = player.fi.battleCapacityAvailable.sub(player.fi.battleCapacityCost)
            },
            style: { width: '100px', minHeight: '25px' },
        },
        3: {
            title() { return "<h3>Unselect this pet" },
            canClick() {
                if (layers.sme.levelables.index > 100) {
                    return getLevelableTier("sme", layers.sme.levelables.index, true) || player.fi.selectedPets[Number(layers.sme.levelables.index.toString()[0])-1][Number(layers.sme.levelables.index.toString()[2])-1]
                } else {
                    return getLevelableTier("sme", layers.sme.levelables.index, true)
                }
            },
            unlocked() { return true },
            onClick() {
                setLevelableTier("sme", layers.sme.levelables.index, false)
                player.fi.selectedPets[player.fi.rarityIndex][player.fi.petIndex] = false
                player.fi.battleCapacityAvailable = player.fi.battleCapacityAvailable.add(player.fi.battleCapacityCost)
            },
            style: { width: '100px', minHeight: '25px' },
        },
        11: {
            title() { return "Pet Binding" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Pet Binding"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        12: {
            title() { return "Punchcard Binding" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Punchcard Binding"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        13: {
            title() { return "Preparation" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Prep"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#8b0000ff", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        14: {
            title() { return "Stat Buttons" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Stat Buttons"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(-90deg, #06366e, #1f599bff)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        15: {
            title() { return "Battle" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Battle"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(90deg, #85300fff, #af1b08ff)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        16: {
            title() { return "Shop" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle },
            onClick() {
                player.subtabs["fi"]["content"] = "Shop"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(90deg, #2e7ae4, #4ac5e6)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        17: {
            title() { return "Milestones" },
            canClick() { return true },
            unlocked() { return !player.fi.inBattle && hasUpgrade("fi", 15)},
            onClick() {
                player.subtabs["fi"]["content"] = "Milestones"
            },
            style: {width: "125px", minHeight: "60px", backgroundImage: "linear-gradient(90deg, #2e7ae4, #073e8bff)", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },

        //stat buttons
        101: {
            title() { return player.fi.damageTimers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.fi.damageTimers[0].current) + "." : "<h3>+" + format(player.fi.damageTimers[0].gain) + " DMG."},
            canClick() { return player.fi.damageTimers[0].current.lte(0) && layers.sme.levelables.index != 0 },
            unlocked() { return true },
            onClick() {
                player.fi.petDamage[player.fi.rarityIndex][player.fi.petIndex] = player.fi.petDamage[player.fi.rarityIndex][player.fi.petIndex].add(player.fi.damageTimers[0].gain)
                player.fi.damageTimers[0].current = player.fi.damageTimers[0].max
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#052a55ff",},
        },
        102: {
            title() { return player.fi.healthTimers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.fi.healthTimers[0].current) + "." : "<h3>+" + format(player.fi.healthTimers[0].gain) + " HP."},
            canClick() { return player.fi.healthTimers[0].current.lte(0) && layers.sme.levelables.index != 0 },
            unlocked() { return true },
            onClick() {
                player.fi.petMaxHP[player.fi.rarityIndex][player.fi.petIndex] = player.fi.petMaxHP[player.fi.rarityIndex][player.fi.petIndex].add(player.fi.healthTimers[0].gain)
                player.fi.healthTimers[0].current = player.fi.healthTimers[0].max
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px",  borderLeft: "0px", backgroundColor: "#6e0606ff",},
        },
        103: {
            title() { return "Damage Button 2" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#0a4385ff",},
        },
        104: {
            title() { return "Health Button 2" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#991111ff",},
        },
        105: {
            title() { return "Damage Button 3" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#1763b9ff",},
        },
        106: {
            title() { return "Health Button 3" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#b41c1cff",},
        },
        107: {
            title() { return "Damage Button 4" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#2574ceff",},
        },
        108: {
            title() { return "Health Button 4" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
            },
            style: { width: '150px', minHeight: '43.75px', borderRadius: "0px", border: "2px solid white", borderTop: "0px", borderLeft: "0px", backgroundColor: "#ce2b2bff",},
        },

        //battle
        201: {
            title() { return player.fi.battleTimers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.fi.battleTimers[0].current) + "." : "<h3>Fight Tier I Enemies"},
            canClick() { return player.fi.battleTimers[0].current.lte(0) && player.fi.battleCapacityAvailable.lt(player.fi.battleCapacity) },
            unlocked() { return true },
            onClick() {
                layers.ba.selectCelestialites()
                player.ma.inBlackHeart = true //bruh shouldve named this variable smth else :sob:
                player.tab = "ba"
                toggleOpt('menuShown')
                player.ba.log = []
                player.ba.currentAttack = 0
                player.ba.petIndex = new Decimal(0)
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
                player.ba.currentAttackSequence = []
                player.fi.battleTier = new Decimal(1)
                player.fi.battleTimers[0].current = player.fi.battleTimers[0].max

                player.ba.petIDs = player.fi.selectedIDs

                player.ba.petHealths = []
                player.ba.petMaxHealths = []
                player.ba.petDamagesPreBuff = []
                player.ba.petDamages = []
                player.ba.celestialiteIDs = [] 
                for (let i = 0; i < player.fi.selectedIDs.length; i++) {
                let health = new Decimal(levelableEffect("sme", player.fi.selectedIDs[i])[0])
                player.ba.petHealths.push(health);
                }
                for (let i = 0; i < player.fi.selectedIDs.length; i++) {
                let health = new Decimal(levelableEffect("sme", player.fi.selectedIDs[i])[0])
                player.ba.petMaxHealths.push(health);
                }
                for (let i = 0; i < player.fi.selectedIDs.length; i++) {
                let damage = new Decimal(levelableEffect("sme", player.fi.selectedIDs[i])[1])
                player.ba.petDamagesPreBuff.push(damage);
                }

                player.ba.round = new Decimal(1)
                player.ba.wave = new Decimal(1)

                player.fi.inBattle = true
                player.subtabs["ba"]["content"] = "Main"

                player.ba.currentlyAttacking = false
                player.ba.celestialitesAttacking = false

                player.ba.attackPower = player.ba.attackPowerMax
                player.ba.actionTimer = new Decimal(60)

                player.ba.curswordBlessing = false
                player.ba.immobilizedCelestialite = -1
                player.ba.cookieThorns = false
                player.ba.turret = false
                player.ba.drainCelestialite = -1

                player.ba.celestialiteIndex = new Decimal(0)
                layers.ba.selectCelestialites()

                pauseUniverse("U1", "pause", true)
                pauseUniverse("UA", "pause", true)
                pauseUniverse("U2", "pause", true)
                pauseUniverse("A1", "pause", true)
                pauseUniverse("A2", "pause", true)
                pauseUniverse("U3", "pause", true)
            },
            style() {
                let look = {width: "300px", minHeight: "75px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#8b0000ff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        202: {
            title() { return player.fi.battleTimers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.fi.battleTimers[1].current) + "." : "<h3>Fight Tier II Enemies"},
            canClick() { return player.fi.battleTimers[1].current.lte(0) && player.fi.battleCapacityAvailable.lt(player.fi.battleCapacity) },
            unlocked() { return hasMilestone("fi", 102) },
            onClick() {
                layers.ba.selectCelestialites()
                player.ma.inBlackHeart = true //bruh shouldve named this variable smth else :sob:
                player.tab = "ba"
                toggleOpt('menuShown')
                player.ba.log = []
                player.ba.currentAttack = 0
                player.ba.petIndex = new Decimal(0)
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
                player.ba.currentAttackSequence = []
                player.fi.battleTier = new Decimal(2)
                player.fi.battleTimers[1].current = player.fi.battleTimers[1].max

                player.ba.petIDs = player.fi.selectedIDs

                player.ba.petHealths = []
                player.ba.petMaxHealths = []
                player.ba.petDamagesPreBuff = []
                player.ba.petDamages = []
                player.ba.celestialiteIDs = [] 
                for (let i = 0; i < player.fi.selectedIDs.length; i++) {
                let health = new Decimal(levelableEffect("sme", player.fi.selectedIDs[i])[0])
                player.ba.petHealths.push(health);
                }
                for (let i = 0; i < player.fi.selectedIDs.length; i++) {
                let health = new Decimal(levelableEffect("sme", player.fi.selectedIDs[i])[0])
                player.ba.petMaxHealths.push(health);
                }
                for (let i = 0; i < player.fi.selectedIDs.length; i++) {
                let damage = new Decimal(levelableEffect("sme", player.fi.selectedIDs[i])[1])
                player.ba.petDamagesPreBuff.push(damage);
                }

                player.ba.round = new Decimal(1)
                player.ba.wave = new Decimal(1)

                player.fi.inBattle = true
                player.subtabs["ba"]["content"] = "Main"

                player.ba.currentlyAttacking = false
                player.ba.celestialitesAttacking = false

                player.ba.attackPower = player.ba.attackPowerMax
                player.ba.actionTimer = new Decimal(60)

                player.ba.curswordBlessing = false
                player.ba.immobilizedCelestialite = -1
                player.ba.cookieThorns = false
                player.ba.turret = false
                player.ba.drainCelestialite = -1

                player.ba.celestialiteIndex = new Decimal(0)
                layers.ba.selectCelestialites()

                pauseUniverse("U1", "pause", true)
                pauseUniverse("UA", "pause", true)
                pauseUniverse("U2", "pause", true)
                pauseUniverse("A1", "pause", true)
                pauseUniverse("A2", "pause", true)
                pauseUniverse("U3", "pause", true)
            },
            style() {
                let look = {width: "300px", minHeight: "75px", borderRadius: "30px / 15px"}
                this.canClick() ? look.background = "linear-gradient(90deg, #5c090dff, #910050ff)" : look.background = "#bf8f8f"
                return look
            },
        },
    },
    levelables: {
    },
    bars: {

    },
    upgrades: {
        11: {
            title: "Classic XP Upgrade",
            unlocked() { return true},
            description: "Boosts Check Back XP Gain based on unspent temporal dust.",
            cost: new Decimal("5"),
            currencyLocation() { return player.fi },
            currencyDisplayName: "Temporal Dust",
            currencyInternalName: "temporalDust",
            effect() {
                return player.fi.temporalDust.pow(0.65).mul(0.05).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {width: "150px", height: "110px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", borderRight: "0px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                hasUpgrade(this.layer, this.id) ? look.background = "#06366e" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        12: {
            title: "Starmetal Time Crunch",
            unlocked() { return true},
            description: "Divides Starmetal Essence generator time requirements by /2.",
            cost: new Decimal("8"),
            currencyLocation() { return player.fi },
            currencyDisplayName: "Temporal Dust",
            currencyInternalName: "temporalDust",
            style() {
                let look = {width: "150px", height: "110px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", borderRight: "0px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                hasUpgrade(this.layer, this.id) ? look.background = "#06366e" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        13: {
            title: "Another XPBoost",
            unlocked() { return true},
            description: "Unlocks a third XPBoost button.",
            cost: new Decimal("12"),
            currencyLocation() { return player.fi },
            currencyDisplayName: "Temporal Dust",
            currencyInternalName: "temporalDust",
            style() {
                let look = {width: "150px", height: "110px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", borderRight: "0px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                hasUpgrade(this.layer, this.id) ? look.background = "#06366e" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        14: {
            title: "XPBoost Time Crunch",
            unlocked() { return true},
            description: "Divides XPBoost button cooldown by /2.",
            cost: new Decimal("1"),
            currencyLocation() { return player.fi },
            currencyDisplayName: "Temporal Shards",
            currencyInternalName: "temporalShards",
            style() {
                let look = {width: "150px", height: "110px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", borderRight: "0px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                hasUpgrade(this.layer, this.id) ? look.background = "#06366e" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        15: {
            title: "Milestones",
            unlocked() { return true},
            description: "Unlocks milestones.",
            cost: new Decimal("2"),
            currencyLocation() { return player.fi },
            currencyDisplayName: "Temporal Shards",
            currencyInternalName: "temporalShards",
            style() {
                let look = {width: "150px", height: "110px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", borderRight: "0px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                hasUpgrade(this.layer, this.id) ? look.background = "#06366e" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        //next upgrade, unlocks new pet evolutions


        //tier 2
        21: {
            title: "Matossian Reduction",
            unlocked() { return hasMilestone("fi", 102)},
            description: "Reduce matos softcap scaling by -0.1%",
            cost: new Decimal("30"),
            currencyLocation() { return player.fi },
            currencyDisplayName: "Temporal Dust",
            currencyInternalName: "temporalDust",
            style() {
                let look = {width: "150px", height: "110px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", borderRight: "0px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                hasUpgrade(this.layer, this.id) ? look.background = "#06366e" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        22: {
            title: "Cookie Hunter",
            unlocked() { return hasMilestone("fi", 102)},
            description: "Boost cookie gain based on best tier 2 wave.",
            cost: new Decimal("5"),
            currencyLocation() { return player.fi },
            currencyDisplayName: "Temporal Shards",
            currencyInternalName: "temporalShards",
            effect() {
                return player.fi.tier2BestWave.mul(0.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {width: "150px", height: "110px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", borderRight: "0px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                hasUpgrade(this.layer, this.id) ? look.background = "#06366e" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        23: {
            title: "Iridian Boost",
            unlocked() { return hasMilestone("fi", 102)},
            description: "Boost star gain based on temporal shards.",
            cost: new Decimal("80"),
            currencyLocation() { return player.fi },
            currencyDisplayName: "Temporal Dust",
            currencyInternalName: "temporalDust",
            effect() {
                return player.fi.temporalShards.pow(1.5).mul(0.4).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {width: "150px", height: "110px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", borderRight: "0px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                hasUpgrade(this.layer, this.id) ? look.background = "#06366e" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        24: {
            title: "Union of Red",
            unlocked() { return hasMilestone("fi", 102)},
            description: "Boost hex of power based on singularity points.",
            cost: new Decimal("12"),
            currencyLocation() { return player.fi },
            currencyDisplayName: "Temporal Shards",
            currencyInternalName: "temporalShards",
            effect() {
                return player.s.singularityPoints.plus(1).log10().pow(0.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {width: "150px", height: "110px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", borderRight: "0px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                hasUpgrade(this.layer, this.id) ? look.background = "#06366e" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
    },
    buyables: {},
    milestones: {
        101: {
            requirementDescription: "<h3>Tier I Wave 5",
            effectDescription() {return "Boost Black Heart damage based on best tier 1 wave.<br>Currently: x" + format(player.fi.milestone101Effect) + "."},
            done() { return player.fi.tier1BestWave.gte(5) && hasUpgrade("fi", 15)},
            style() {
                let look = {width: "517px", height: "94px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                !hasMilestone(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        102: {
            requirementDescription: "<h3>Tier I Wave 10",
            effectDescription() {return "Unlock Battle Tier 2"},
            done() { return player.fi.tier1BestWave.gte(10) && hasUpgrade("fi", 15)},
            style() {
                let look = {width: "517px", height: "94px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                !hasMilestone(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
        103: {
            requirementDescription: "<h3>Tier I Wave 15",
            effectDescription() {return "Multiply pet points gain by x1.15."},
            done() { return player.fi.tier1BestWave.gte(15) && hasUpgrade("fi", 15)},
            style() {
                let look = {width: "517px", height: "94px", color: "rgba(255, 255, 255, 1)", border: "3px solid rgba(0,0,0,1)", transform: "scale(1)", borderRadius: "0px",}
                !hasMilestone(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #06366e 0%,  #105cb3ff 100%)"
                return look
            }
        },
    },
    challenges: {},
    infoboxes: {},
    microtabs: {
        content: {
            "Pet Binding": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["layer-proxy", ["sme", [
                                        ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2]], {width: '100px', height: '40px' }],
                            ]],
                        ], {width: "550px", height: "175px", backgroundColor: "#29132eff", borderBottom: "3px solid #cb79ed"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Epic", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#28182f", borderBottom: "3px solid #cb79ed", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101],["levelable", 102],["levelable", 103],["levelable", 104],["levelable", 105],]],
                                ["row", [["levelable", 106],]],
                            ], {width: "525px", backgroundColor: "#28182f", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201],["levelable", 202],]],
                            ], {width: "525px", backgroundColor: "#2f2a00", padding: "5px"}],

                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", backgroundColor: "#161616", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                    ]]]
                ],
            },
            "Punchcard Binding": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                ],
            },
            "Prep": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                        ["raw-html", function () { return "Battle Capacity: " + formatWhole(player.fi.battleCapacityAvailable) + "/" + formatWhole(player.fi.battleCapacity) + "." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Select pets you want to bring into battle." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                                    ["blank", "10px"],
                        ["row", [["clickable", 2],["clickable", 3],]],
                    ], {width: "550px", height: "175px", backgroundImage: "linear-gradient(90deg, #640d0dff, #920044ff)", borderBottom: "3px solid #cb79ed"}],       
                        ["layer-proxy", ["sme", [
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Epic", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#28182f", borderBottom: "3px solid #cb79ed", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101],["levelable", 102],["levelable", 103],["levelable", 104],["levelable", 105],]],
                                ["row", [["levelable", 106],]],
                            ], {width: "525px", backgroundColor: "#28182f", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "62px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201],["levelable", 202],]],
                            ], {width: "525px", backgroundColor: "#2f2a00", padding: "5px"}],

                        ], {width: "550px", height: "522px"}],
                    ]]]
                    ], {width: "550px", height: "700px", backgroundImage: "linear-gradient(90deg, #640d0dff, #920044ff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                ],
            },
            "Stat Buttons": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                    ["style-column", [
                        ["style-row", [
                            ["style-column", [
                                ["style-row", [["hoverless-clickable", 101], ["hoverless-clickable", 102]], {width: '300px', height: '43.75px' }],
                                ["style-row", [["hoverless-clickable", 103], ["hoverless-clickable", 104]], {width: '300px', height: '43.75px' }],
                                ["style-row", [["hoverless-clickable", 105], ["hoverless-clickable", 106]], {width: '300px', height: '43.75px' }],
                                ["style-row", [["hoverless-clickable", 107], ["hoverless-clickable", 108]], {width: '300px', height: '43.75px' }],
                            ], {width: "300px", height: "175px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)",}],  
                            ["style-column", [
                        ["raw-html", function () { return player.fi.petTitle }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Max Health: " + player.fi.selectedMaxHP + "/" + player.fi.selectedMaxMaxHP }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Damage: " + player.fi.selectedDamage + "/" + player.fi.selectedMaxDamage}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "(Stat gains are based on starmetal binding level)" }, { "color": "white", "font-size": "10px", "font-family": "monospace" }],
                            ], {width: "250px", height: "175px", backgroundColor: "#29132eff",}],  
                        ], {width: "550px", height: "175px", backgroundColor: "#29132eff",}], 
                    ], {width: "550px", height: "175px", backgroundColor: "#29132eff", borderBottom: "3px solid #cb79ed"}],    
                    ["layer-proxy", ["sme", [
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Epic", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#28182f", borderBottom: "3px solid #cb79ed", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101],["levelable", 102],["levelable", 103],["levelable", 104],["levelable", 105],]],
                                ["row", [["levelable", 106],]],
                            ], {width: "525px", backgroundColor: "#28182f", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "62px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201],["levelable", 202],]],
                            ], {width: "525px", backgroundColor: "#2f2a00", padding: "5px"}],

                        ], {width: "550px", height: "522px"}],
                    ]]]
                    ], {width: "550px", height: "700px", backgroundImage: "linear-gradient(90deg, #06366e, #1f599bff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                ],
            },
            "Battle": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                    ["style-row", [["clickable", 201]], {width: '300px', height: '100px' }], // make sure theres a 25px gap in between each
                    ["style-row", [["clickable", 202]], {width: '300px', height: '100px' }],
                    ["style-row", [], {width: '300px', height: '500px' }],
                    ], {width: "550px", height: "700px", backgroundImage: "linear-gradient(-90deg, #85300fff, #af1b08ff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                ],
            },
            "Shop": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                    ["style-row", [
                ["tooltip-row", [
                ["raw-html", "<img src='resources/battle/temporalDust.png'style='width:60px;height:60px;margin:5px'></img>", {width: "70px", height: "70px", display: "block"}],
                ["raw-html", () => { return "You have " + formatWhole(player.fi.temporalDust) + " temporal dust."}, {width: "180px", height: "50px", color: "#06366e", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Temporal Dust<hr><small>(Gained from battle)</small></div>"],
                      ]],
                ["tooltip-row", [
                ["raw-html", "<img src='resources/battle/temporalShards.png'style='width:60px;height:60px;margin:5px'></img>", {width: "70px", height: "70px", display: "block"}],
                ["raw-html", () => { return "You have " + formatWhole(player.fi.temporalShards) + " temporal shards."}, {width: "180px", height: "50px", color: "#06366e", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Temporal Shards<hr><small>(Gained from battle)</small></div>"],
                      ]],                
                    ], {width: '550px', height: '80px', borderBottom: "3px solid rgb(218, 218, 218)", }], 
                    ["style-row", [
                    ["always-scroll-row", [
                    ["tooltip-row", [
                ["raw-html", () => { return "Tier I Upgrades"}, {width: "125px", height: "120px", color: "white", backgroundColor: "#06366e",  display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                      ]],   
                    ["upgrade", 11], 
                    ["upgrade", 12], 
                    ["upgrade", 13], 
                    ["upgrade", 14], 
                    ["upgrade", 15], 
                      
                    ], {width: '550px', height: '135px', borderBottom: "3px solid rgb(218, 218, 218)", }],
                    ], {width: '550px', height: '135px', borderBottom: "3px solid rgb(218, 218, 218)", }], 
                                        ["style-row", [
                    ["always-scroll-row", [
                    ["tooltip-row", [
                    ["raw-html", () => { return "Tier II Upgrades"}, {width: "125px", height: "120px", color: "white", backgroundColor: "#06366e",  display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                    ]],     
                    ["upgrade", 21], 
                    ["upgrade", 22], 
                    ["upgrade", 23], 
                    ["upgrade", 24], 
                    ], {width: '550px', height: '135px', borderBottom: "3px solid rgb(218, 218, 218)", }],
                    ], {width: '550px', height: '135px', borderBottom: "3px solid rgb(218, 218, 218)", }], 
                    ["style-row", [
                    ], {width: '550px', height: '350px', borderBottom: "3px solid rgb(218, 218, 218)", }], 
                    ], {width: "550px", height: "700px", backgroundImage: "linear-gradient(90deg, #2e7ae4, #4ac5e6)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                ],
            },
            "Milestones": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                    ["always-scroll-column", [
                    ["milestone", 101], 
                    ["milestone", 102], 
                    ["milestone", 103], 
                    ], {width: "550px", height: "100px", backgroundImage: "linear-gradient(-90deg, #2e7ae4, #073e8bff)", borderBottom: "2px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                    
                    ["style-row", [
                    ], {width: '550px', height: '600px', backgroundImage: "repeating-linear-gradient(45deg, #032049ff 0 15px, #02142cff 0 30px)", }], 
                    ], {width: "550px", height: "700px", backgroundImage: "linear-gradient(-90deg, #2e7ae4, #073e8bff)", border: "0px solid rgb(218, 218, 218)", borderRadius: "0px 0px 0px 0px"}],
                ],
            },
        },
    },
    tabFormat: [
        ["blank", "10px"],
        ["style-row", [
            ["scroll-column", [
                ["hoverless-clickable", 11], /*["hoverless-clickable", 12],*/ ["hoverless-clickable", 13], ["hoverless-clickable", 14], ["hoverless-clickable", 15], ["hoverless-clickable", 16],["hoverless-clickable", 17],
            ], {width: "125px", height: "700px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderRight: "3px solid white"}],
            ["buttonless-microtabs", "content", { 'border-width': '0px' }],
        ], {border: "3px solid white"}],
    ],
    layerShown() { return player.startedGame == true }
})
