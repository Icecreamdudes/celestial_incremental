const BHC = {}
const BHS = {}

BHC.none = {
    name: "",
    symbol: "?",
    style: {
        background: "#333",
        color: "black",
        borderColor: "#111",
    },
}

BHS.template = {
    nameCap: "Stage template",
    nameLow: "stage template",
    music: "music/celestialites.mp3",
    cooldown: new Decimal(300),
    comboLimit: 500,
    comboScaling: 1.015,
    comboScalingStart: 100,
    healthDrain: new Decimal(1),
    timer: new Decimal(300),
    generateCelestialite(combo) {
        let random = Math.random()

        // Check for miniboss round
        if (combo%25 == 24) {
            return "template"
        }

        // Regular Rounds
        return "template"
    },
}

BHC.template = {
    name: "Celestialite Template",
    symbol: "Tmp",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    attributes: {
        "explosive": new Decimal(50), // Damage
    },
    health: new Decimal(1000),
    damage: new Decimal(5),
    defense: new Decimal(20), // Defense is calculated as incoming damage divided by 100/(100+Defense)
    regen: new Decimal(1),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            properties: {
                "multi-hit": 3, // How many hits
                "crit": [new Decimal(0.2), new Decimal(2)], // Crit Chance / Crit Multiplier
                "backfire": [new Decimal(0.1), new Decimal(0.5)], // Backfire Chance / Backfire Damage (multiple of end damage)
            },
            value: this.damage,
            cooldown: new Decimal(5),
        },
        1: {
            effect: "instant",
            type: "heal",
            target: "celestialite",
            properties: {
                "multi-heal": 3, // How many heals
                "crit": [new Decimal(0.2), new Decimal(2)], // Crit Chance / Crit Multiplier
            },
            value: new Decimal(10),
            cooldown: new Decimal(12),
        },
        2: {
            effect: "instant",
            type: "effect",
            target: "celestialite",
            properties: {
                "damageMult": new Decimal(1.1), // Multiplicative Effect
                "healthMult": new Decimal(1.1), // Multiplicative Effect
            },
            cooldown: new Decimal(17),
        },
        3: {
            effect: "instant",
            type: "reset",
            target: "celestialite",
            cooldown: new Decimal(23),
        },
    },
    reward() {
        let gain = {}
        gain.commonMatosFragment = 100
        gain.rareMatosFragment = 25
        gain.epicMatosFragment = 10
        gain.legendaryMatosFragment = 5
        return gain
    },
}

addLayer("bh", {
    name: "Black Heart", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♥", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        // Stage Data
        currentStage: "none",

        // Celestialite Data
        celestialite: {
            id: "none",
            health: new Decimal(100),
            maxHealth: new Decimal(100),
            damage: new Decimal(0),
            defense: new Decimal(0),
            regen: new Decimal(0),
            shield: new Decimal(0), // Not same as previous, is a prevent damage stack
            actions: {
                0: {
                    variables: {},
                    duration: new Decimal(0),
                    cooldown: new Decimal(0),
                },
                1: {
                    variables: {},
                    duration: new Decimal(0),
                    cooldown: new Decimal(0),
                },
                2: {
                    variables: {},
                    duration: new Decimal(0),
                    cooldown: new Decimal(0),
                },
                3: {
                    variables: {},
                    duration: new Decimal(0),
                    cooldown: new Decimal(0),
                },
            },
        },

        // Current Character Data
        characters: {
            0: {
                id: "none",
                health: new Decimal(100),
                maxHealth: new Decimal(100),
                damage: new Decimal(0),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                shield: new Decimal(0),
                skills: {
                    0: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                    1: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                    2: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                    3: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                },
            },
            1: {
                id: "none",
                health: new Decimal(100),
                maxHealth: new Decimal(100),
                damage: new Decimal(0),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                shield: new Decimal(0),
                skills: {
                    0: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                    1: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                    2: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                    3: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                },
            },
            2: {
                id: "none",
                health: new Decimal(100),
                maxHealth: new Decimal(100),
                damage: new Decimal(0),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                shield: new Decimal(0),
                skills: {
                    0: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                    1: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                    2: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                    3: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        auto: false,
                    },
                },
            },
        },

        // Saved Character Stats
        characterData: {
            "kres": {
                health: new Decimal(80),
                damage: new Decimal(7),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(5),
                luck: new Decimal(0),
            },
            "nav": {
                health: new Decimal(60),
                damage: new Decimal(9),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(5),
                luck: new Decimal(0),
            },
            "sel": {
                health: new Decimal(60),
                damage: new Decimal(6),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(8),
                luck: new Decimal(0),
            },
            "eclipse": {
                health: new Decimal(100),
                damage: new Decimal(10),
                defense: new Decimal(10),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
            },
            "geroa": {
                health: new Decimal(50),
                damage: new Decimal(5),
                defense: new Decimal(5),
                regen: new Decimal(0.5),
                agility: new Decimal(10),
                luck: new Decimal(0),
            },
        },

        // Saved Skill Stats
        skillData: {
            "kres_bigAttack": {
                selected: false,
                level: new Decimal(0),
            },
        },

        // General Variables
        bhPause: false,
        respawnTimer: new Decimal(5),
        combo: new Decimal(0),
        comboScaling: new Decimal(1.015),
        comboScalingStart: new Decimal(100),
        timeSpeed: new Decimal(1)
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #333 0%, #222 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#8a0e79",
            color: "black",
        };
    },
    tooltip: "Black Heart",
    branches: ["ma"],
    color: "#8a0e79",
    update(delta) {
        // Increase time speed
        delta = Decimal.mul(delta, player.bh.timeSpeed)

        let bhTemp = {
            0: {
                healthMult: new Decimal(1),
                healthAdd: new Decimal(0),
                damageMult: new Decimal(1),
                damageAdd: new Decimal(0),
                defenseMult: new Decimal(1),
                defenseAdd: new Decimal(0),
                regenMult: new Decimal(1),
                regenAdd: new Decimal(0),
            },
            1: {
                healthMult: new Decimal(1),
                healthAdd: new Decimal(0),
                damageMult: new Decimal(1),
                damageAdd: new Decimal(0),
                defenseMult: new Decimal(1),
                defenseAdd: new Decimal(0),
                regenMult: new Decimal(1),
                regenAdd: new Decimal(0),
            },
            2: {
                healthMult: new Decimal(1),
                healthAdd: new Decimal(0),
                damageMult: new Decimal(1),
                damageAdd: new Decimal(0),
                defenseMult: new Decimal(1),
                defenseAdd: new Decimal(0),
                regenMult: new Decimal(1),
                regenAdd: new Decimal(0),
            },
            3: {
                healthMult: new Decimal(1),
                healthAdd: new Decimal(0),
                damageMult: new Decimal(1),
                damageAdd: new Decimal(0),
                defenseMult: new Decimal(1),
                defenseAdd: new Decimal(0),
                regenMult: new Decimal(1),
                regenAdd: new Decimal(0),
            }
        }

        // Check if unpaused, in tab, and in stage
        if (!player.bh.bhPause && player.tab == "bh" && player.bh.currentStage != "none") {
            // Only trigger when celestialite id is set
            if (player.bh.celestialite.id != "none") {
                // Celestialite Regen
                if (player.bh.celestialite.health.lt(player.bh.celestialite.maxHealth) && player.bh.celestialite.regen.gt(0)) {
                    player.bh.celestialite.health = player.bh.celestialite.health.add(player.bh.celestialite.regen.mul(delta)).min(player.bh.celestialite.maxHealth)
                }

                // Cycle, increment cooldowns, and trigger celestialite actions
                for (let i = 0; i < 4; i++) {
                    if (BHC[player.bh.celestialite.id].actions[i]) {
                        let effect = BHA[player.bh.celestialite.actions[i].id].effect
                        if (player.bh.celestialite.actions[i].duration.gt(0)) player.bh.celestialite.actions[i].duration = player.bh.celestialite.actions[i].duration.sub(delta)
                        if (effect == "instant" || effect == "active") {
                            player.bh.celestialite.actions[i].cooldown = player.bh.celestialite.actions[i].cooldown.add(delta)
                            if (player.bh.celestialite.actions[i].cooldown.gte(BHC[player.bh.celestialite.id].actions[i].cooldown)) {
                                if (effect == "instant") bhAction(3, i)
                                if (effect == "active") {
                                    player.bh.celestialite.actions[i].cooldown = new Decimal(0)
                                    player.bh.celestialite.actions[i].duration = BHA[player.bh.celestialite.actions[i].id].duration
                                }
                            }
                        }

                        // Calculate Variables (and remove inactive active)
                        if (effect == "active" && player.bh.celestialite.actions[i].duration.lte(0)) continue
                        let variables = player.bh.celestialite.actions[i].variables
                        if (Object.keys(variables).length === 0) continue
                        let target = variables.target
                        for (let k in variables) {
                            if (k == "target") continue
                            for (let t in target) {
                                if (k.includes("Mult")) {
                                    bhTemp[t][k] = bhTemp[t][k].mul(variables[k])
                                } else {
                                    bhTemp[t][k] = bhTemp[t][k].add(variables[k])
                                }
                            }
                        }
                    }
                }

                // Kill Celestialite
                if (player.bh.celestialite.health.lte(0)) {
                    celestialiteDeath()
                }
            }

            // Cycle Characters
            for (let i = 0; i < 3; i++) {
                // Check if character is dead before doing anything
                if (player.bh.characters[i].health.lte(0)) continue

                // Character Regen
                if (player.bh.characters[i].health.lt(player.bh.characters[i].maxHealth) && player.bh.characters[i].regen.gt(0)) {
                    player.bh.characters[i].health = player.bh.characters[i].health.add(player.bh.characters[i].regen.mul(delta)).min(player.bh.characters[i].maxHealth)
                }

                // Cycle through character skills
                for (let j = 0; j < 4; i++) {
                    if (player.bh.characters[i].skills[j].id == "none") continue
                    let effect = BHA[player.bh.characters[i].skills[j].id].effect
                    if (player.bh.characters[i].skills[j].duration.gt(0)) player.bh.characters[i].skills[j].duration = player.bh.characters[i].skills[j].duration.sub(delta)
                    if (effect == "instant" || effect == "active") {
                        player.bh.characters[i].skills[j].cooldown = player.bh.characters[i].skills[j].cooldown.add(delta)
                        if (player.bh.characters[i].skills[j].auto && player.bh.characters[i].skills[j].cooldown.gte(BHA[player.bh.characters[i].skills[j].id].cooldown.mul(2))) {
                            if (effect == "instant") bhAction(i, j)
                            if (effect == "active") {
                                player.bh.characters[i].skills[j].cooldown = new Decimal(0)
                                player.bh.characters[i].skills[j].duration = BHA[player.bh.characters[i].skills[j].id].duration
                            }
                        }
                    }

                    // Calculate Variables (and remove inactive active)
                    if (effect == "active" && player.bh.characters[i].skills[j].duration.lte(0)) continue
                    let variables = player.bh.characters[i].skills[j].variables
                    if (Object.keys(variables).length === 0) continue
                    let target = variables.target
                    for (let k in variables) {
                        if (k == "target") continue
                        for (let t in target) {
                            if (k.includes("Mult")) {
                                bhTemp[t][k] = bhTemp[t][k].mul(variables[k])
                            } else {
                                bhTemp[t][k] = bhTemp[t][k].add(variables[k])
                            }
                        }
                    }
                }
            }
            
            // Spawn Celestialite
            if (player.bh.respawnTimer.gt(0)) player.bh.respawnTimer = player.bh.respawnTimer.sub(delta)
            if (player.bh.celestialite.id == "none" && player.bh.respawnTimer.lte(0)) {
                celestialiteSpawn()
            }
        }

        // =-- Calculate celestialite stats --=
        let scale = new Decimal(1)
        if (player.bh.combo.gte(player.bh.comboScalingStart)) scale = Decimal.pow(player.bh.comboScaling, player.bh.combo.sub(player.bh.comboScalingStart))
            
        player.bh.celestialite.maxHealth = BHC[player.bh.celestialite.id].health ?? new Decimal(0)
        player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.add(bhTemp[3].healthAdd)
        player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.mul(bhTemp[3].healthMult)
        player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.mul(scale)

        player.bh.celestialite.damage = BHC[player.bh.celestialite.id].damage ?? new Decimal(0)
        player.bh.celestialite.damage = player.bh.celestialite.damage.add(bhTemp[3].damageAdd)
        player.bh.celestialite.damage = player.bh.celestialite.damage.mul(bhTemp[3].damageMult)
        player.bh.celestialite.damage = player.bh.celestialite.damage.mul(scale)

        player.bh.celestialite.defense = BHC[player.bh.celestialite.id].defense ?? new Decimal(0)
        player.bh.celestialite.defense = player.bh.celestialite.defense.add(bhTemp[3].defenseAdd)
        player.bh.celestialite.defense = player.bh.celestialite.defense.mul(bhTemp[3].defenseMult)
        player.bh.celestialite.defense = player.bh.celestialite.defense.mul(scale)

        player.bh.celestialite.regen = BHC[player.bh.celestialite.id].regen ?? new Decimal(0)
        player.bh.celestialite.regen = player.bh.celestialite.regen.add(bhTemp[3].regenAdd)
        player.bh.celestialite.regen = player.bh.celestialite.regen.mul(bhTemp[3].regenMult)
        player.bh.celestialite.regen = player.bh.celestialite.regen.mul(scale)

        // =-- Calculate character stats --=
        for (let i = 0; i < 3; i++) {
            player.bh.characters[i].maxHealth = BHP[player.bh.characters[i].id].health ?? new Decimal(0)
            player.bh.characters[i].maxHealth = player.bh.characters[i].maxHealth.add(bhTemp[i].healthAdd)
            player.bh.characters[i].maxHealth = player.bh.characters[i].maxHealth.mul(bhTemp[i].healthMult)

            player.bh.characters[i].damage = BHP[player.bh.characters[i].id].damage ?? new Decimal(0)
            player.bh.characters[i].damage = player.bh.characters[i].damage.add(bhTemp[i].damageAdd)
            player.bh.characters[i].damage = player.bh.characters[i].damage.mul(bhTemp[i].damageMult)

            player.bh.characters[i].defense = BHP[player.bh.characters[i].id].defense ?? new Decimal(0)
            player.bh.characters[i].defense = player.bh.characters[i].defense.add(bhTemp[i].defenseAdd)
            player.bh.characters[i].defense = player.bh.characters[i].defense.mul(bhTemp[i].defenseMult)

            player.bh.characters[i].regen = BHP[player.bh.characters[i].id].regen ?? new Decimal(0)
            player.bh.characters[i].regen = player.bh.characters[i].regen.add(bhTemp[i].regenAdd)
            player.bh.characters[i].regen = player.bh.characters[i].regen.mul(bhTemp[i].regenMult)

            player.bh.characters[i].agility = BHP[player.bh.characters[i].id].agility ?? new Decimal(0)

            player.bh.characters[i].luck = BHP[player.bh.characters[i].id].luck ?? new Decimal(0)
        }
    },
    clickables: {},
    bars: {},
    microtabs: {
        stuff: {

        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})