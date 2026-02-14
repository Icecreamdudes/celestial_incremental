// BH variables are declared in game.js
BHS.none = {
    nameCap: "None",
    nameLow: "none",
    music: "music/celestialites.mp3",
    cooldown: new Decimal(0),
    comboLimit: 25,
    comboScaling: 1.015,
    comboScalingStart: 100,
    generateCelestialite(combo) {return "none"},
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

BHC.none = {
    name: "No Celestialite",
    symbol: "?",
    style: {
        background: "#555",
        color: "black",
        borderColor: "black",
    },
    actions: {},
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
            name: "Thoughtless Pummels",
            instant: true,
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
            name: "Blood Absorption",
            instant: true,
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
            name: "Mindless Rage",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "damageMult": new Decimal(1.1), // Multiplicative Effect
                "healthMult": new Decimal(1.1), // Multiplicative Effect
            },
            cooldown: new Decimal(17),
        },
        3: {
            name: "Adrenaline",
            instant: true,
            type: "reset",
            target: "celestialite",
            cooldown: new Decimal(23),
        },
    },
    reward() {
        let gain = {}
        gain.gloomingUmbrite = 100
        gain.dimUmbrite = 25
        gain.darkEssence = 10
        return gain
    },
}

BH_CURRENCY = {
    "gloomingUmbrite": ["Glooming Umbrite", "depth1"],
    "dimUmbrite": ["Dim Umbrite", "depth1"],
    "faintUmbrite": ["Faint Umbrite", "depth2"],
    "clearUmbrite": ["Clear Umbrite", "depth2"],
    "vividUmbrite": ["Vivid Umbrite", "depth3"],
    "lustrousUmbrite": ["Lustrous Umbrite", "depth3"],
    "darkEssence": ["Dark Essence", "bh"],
    "eclipseShards": ["Eclipse Shards", "sma"],
    "spaceRock": ["Space Rocks", "ir"],
}

// Celestialite who has there explosion value equal to their max health, and an action that constantly reduces their max health called defuse (FOR LAB)

addLayer("bh", {
    name: "Black Heart", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BH", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    innerNodes: [["darkTemple", "depth1", "depth2"], ["matosLair", "depth3"]],
    innerLayer() {return player.subtabs["bh"]["stages"]},
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        unlockConditions: {
            core: false,
            level: false,
            replicanti: false,
            points: false,
            done: false,
        },

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
            agility: new Decimal(0),
            luck: new Decimal(0),
            mending: new Decimal(0),
            shield: new Decimal(0), // Not same as previous, is a prevent damage stack
            stun: ["none", new Decimal(0)],
            randomMult: new Decimal(1),
            attributes: {},
            actions: {
                0: {
                    variables: {},
                    duration: new Decimal(0),
                    cooldown: new Decimal(0),
                    interval: new Decimal(0),
                },
                1: {
                    variables: {},
                    duration: new Decimal(0),
                    cooldown: new Decimal(0),
                    interval: new Decimal(0),
                },
                2: {
                    variables: {},
                    duration: new Decimal(0),
                    cooldown: new Decimal(0),
                    interval: new Decimal(0),
                },
                3: {
                    variables: {},
                    duration: new Decimal(0),
                    cooldown: new Decimal(0),
                    interval: new Decimal(0),
                },
            },
        },

        // Current Character Data
        characters: {
            0: {
                id: "kres",
                page: 0,
                health: new Decimal(100),
                maxHealth: new Decimal(100),
                damage: new Decimal(0),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                mending: new Decimal(0),
                shield: new Decimal(0),
                stun: ["none", new Decimal(0)],
                attributes: {},
                skills: {
                    0: {
                        id: "kres_chop",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                    1: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                    2: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                    3: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                },
            },
            1: {
                id: "nav",
                page: 0,
                health: new Decimal(100),
                maxHealth: new Decimal(100),
                damage: new Decimal(0),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                mending: new Decimal(0),
                shield: new Decimal(0),
                stun: ["none", new Decimal(0)],
                attributes: {},
                skills: {
                    0: {
                        id: "nav_magicMissle",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                    1: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                    2: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                    3: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                },
            },
            2: {
                id: "sel",
                page: 0,
                health: new Decimal(100),
                maxHealth: new Decimal(100),
                damage: new Decimal(0),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                mending: new Decimal(0),
                shield: new Decimal(0),
                stun: ["none", new Decimal(0)],
                attributes: {},
                skills: {
                    0: {
                        id: "sel_singleShot",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                    1: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                    2: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                    3: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                        cooldownMax: new Decimal(0),
                        interval: new Decimal(0),
                        auto: false,
                    },
                },
            },
        },

        // Saved Character Data
        characterData: {
            "kres": {
                selected: true,
                skills: {
                    0: "kres_chop",
                    1: "none",
                    2: "none",
                    3: "none",
                },
                usedSP: new Decimal(4),
                health: new Decimal(80),
                damage: new Decimal(7),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(5),
                luck: new Decimal(0),
                mending: new Decimal(0),
            },
            "nav": {
                selected: true,
                skills: {
                    0: "nav_magicMissle",
                    1: "none",
                    2: "none",
                    3: "none",
                },
                usedSP: new Decimal(4),
                health: new Decimal(60),
                damage: new Decimal(9),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(5),
                luck: new Decimal(0),
                mending: new Decimal(0),
            },
            "sel": {
                selected: true,
                skills: {
                    0: "sel_singleShot",
                    1: "none",
                    2: "none",
                    3: "none",
                },
                usedSP: new Decimal(4),
                health: new Decimal(60),
                damage: new Decimal(6),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(8),
                luck: new Decimal(0),
                mending: new Decimal(0),
            },
            "eclipse": {
                selected: false,
                skills: {
                    0: "eclipse_drain",
                    1: "none",
                    2: "none",
                    3: "none",
                },
                usedSP: new Decimal(6),
                health: new Decimal(100),
                damage: new Decimal(10),
                defense: new Decimal(10),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                mending: new Decimal(0),
            },
            "geroa": {
                selected: false,
                skills: {
                    0: "geroa_radioactiveMissile",
                    1: "none",
                    2: "none",
                    3: "none",
                },
                usedSP: new Decimal(8),
                health: new Decimal(50),
                damage: new Decimal(5),
                defense: new Decimal(5),
                regen: new Decimal(0.5),
                agility: new Decimal(10),
                luck: new Decimal(0),
                mending: new Decimal(0),
            },
        },

        // Saved Skill Stats
        skillData: {
            // GENERAL
            "general_slap": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "general_bandage": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "general_scream": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "general_block": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},

            // KRES
            "kres_chop": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "kres_bigAttack": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "kres_battleCry": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "kres_decapitate": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "kres_berserker": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},

            // NAV
            "nav_magicMissle": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "nav_healSpell": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "nav_reboundingAura": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "nav_fireball": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},

            // SEL
            "sel_singleShot": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "sel_turret": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "sel_energyBoost": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "sel_arrowBarrage": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},

            // ECLIPSE
            "eclipse_drain": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "eclipse_motivation": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "eclipse_lightBarrier": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "eclipse_syzygy": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},

            // GEROA
            "geroa_radioactiveMissile": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "geroa_selfRepair": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "geroa_cosmicRay": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
            "geroa_orbitalCannon": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
        },

        // General Variables
        autoEnter: false,
        autoExit: false,
        autoCooldown: new Decimal(0),
        bhPause: false,
        respawnTimer: new Decimal(5),
        respawnMax: new Decimal(5),
        combo: new Decimal(0),
        comboScaling: new Decimal(1.015),
        comboScalingStart: new Decimal(100),
        comboSoftcap: new Decimal(1),
        timeSpeed: new Decimal(1),
        maxSkillPoints: new Decimal(10),
        skillCostDiv: new Decimal(1),
        log: ["", "", "", "", "", "", "", "", "", ""],
        inputCharSelection: 0,
        inputSkillSelection: 0,
        characterSelection: "kres",
        skillSelection: "kres_chop",
        bulletHell: false,

        // General Currencies
        darkEssence: new Decimal(0),
        //darkEther
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "radial-gradient(#222, black)",
            backgroundOrigin: "border-box",
            borderColor: "#8a0e79",
            color: "#aa2798",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
        };
    },
    tooltip: "Black Heart",
    color: "#8a0e79",
    branches: ["sma"],
    update(delta) {
        let normTime = delta
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
                agilityMult: new Decimal(1),
                agilityAdd: new Decimal(0),
                luckMult: new Decimal(1),
                luckAdd: new Decimal(0),
                mendingMult: new Decimal(1),
                mendingAdd: new Decimal(0),
                attributes: [],
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
                agilityMult: new Decimal(1),
                agilityAdd: new Decimal(0),
                luckMult: new Decimal(1),
                luckAdd: new Decimal(0),
                mendingMult: new Decimal(1),
                mendingAdd: new Decimal(0),
                attributes: [],
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
                agilityMult: new Decimal(1),
                agilityAdd: new Decimal(0),
                luckMult: new Decimal(1),
                luckAdd: new Decimal(0),
                mendingMult: new Decimal(1),
                mendingAdd: new Decimal(0),
                attributes: [],
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
                agilityMult: new Decimal(1),
                agilityAdd: new Decimal(0),
                luckMult: new Decimal(1),
                luckAdd: new Decimal(0),
                mendingMult: new Decimal(1),
                mendingAdd: new Decimal(0),
                attributes: [],
            },
            timeAdd: new Decimal(0),
            timeMult: new Decimal(1),
        }

        // Stage Code
        player.bh.comboScalingStart = new Decimal(Infinity)
        if (BHS[player.bh.currentStage].comboScalingStart) player.bh.comboScalingStart = BHS[player.bh.currentStage].comboScalingStart

        player.bh.comboSoftcap = new Decimal(1)
        if (player.bh.combo.gte(player.bh.comboScalingStart)) player.bh.comboSoftcap = Decimal.pow(player.bh.comboScaling, player.bh.combo.sub(player.bh.comboScalingStart))

        if (player.subtabs["bh"]["stuff"] == "bullet") {
            player.bh.bulletHell = true
        } else {
            player.bh.bulletHell = false
        }

        if (player.bh.currentStage == "none" && player.bh.autoEnter) player.bh.autoCooldown = player.bh.autoCooldown.add(normTime)
        if (player.bh.autoCooldown.gte(30) && player.bh.autoEnter) {
            player.bh.autoCooldown = new Decimal(0)
            BHStageEnter(player.bh.autoEnter)
        }

        if (player.bh.autoExit && (player.subtabs["bh"]["stuff"] == "dead" || player.subtabs["bh"]["stuff"] == "win")) clickClickable("bh", "Leave")

        // Check if unpaused and in stage
        if (!player.bh.bhPause && player.bh.currentStage != "none") {
            // Only trigger when celestialite id is set
            if (player.bh.celestialite.id != "none") {
                // Celestialite Regen
                if (player.bh.celestialite.regen.neq(0)) {
                    player.bh.celestialite.health = player.bh.celestialite.health.add(player.bh.celestialite.regen.mul(delta)).min(player.bh.celestialite.maxHealth)
                }

                if (player.bh.celestialite.stun[1].gt(0)) {
                    player.bh.celestialite.stun[1] = player.bh.celestialite.stun[1].sub(delta)
                }

                // Cycle, increment cooldowns, and trigger celestialite actions
                for (let i = 0; i < 4; i++) {
                    if (BHC[player.bh.celestialite.id].actions[i]) {
                        if ((player.bh.celestialite.stun[1].gt(0) && player.bh.celestialite.stun[0] == "hard") || player.bh.bulletHell) continue
                        let curStun = player.bh.celestialite.stun[1].gt(0) && player.bh.celestialite.stun[0] == "soft"
                        let instant = BHC[player.bh.celestialite.id].actions[i].instant
                        let active = BHC[player.bh.celestialite.id].actions[i].active
                        let passive = BHC[player.bh.celestialite.id].actions[i].passive
                        if (player.bh.celestialite.actions[i].duration.gt(0)) player.bh.celestialite.actions[i].duration = player.bh.celestialite.actions[i].duration.sub(delta)
                        if (BHC[player.bh.celestialite.id].actions[i].func) BHC[player.bh.celestialite.id].actions[i].func() // Run function if there
                        if (instant || active) {
                            if (!curStun) player.bh.celestialite.actions[i].cooldown = player.bh.celestialite.actions[i].cooldown.add(delta)
                            if (player.bh.celestialite.actions[i].cooldown.gte(BHC[player.bh.celestialite.id].actions[i].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))) {
                                if (!BHC[player.bh.celestialite.id].actions[i].conditional || BHC[player.bh.celestialite.id].actions[i].conditional(3, i)) {
                                    if (instant) bhAction(3, i)
                                    if (active) {
                                        player.bh.celestialite.actions[i].cooldown = new Decimal(0)
                                        player.bh.celestialite.actions[i].duration = BHC[player.bh.celestialite.id].actions[i].duration
                                    }
                                }
                            }
                        }

                        // Calculate Variables (and remove inactive active)
                        if (passive || (active && player.bh.celestialite.actions[i].duration.gt(0))) {
                            if (BHC[player.bh.celestialite.id].actions[i].onTrigger) {
                                BHC[player.bh.celestialite.id].actions[i].onTrigger(3, i, BHC[player.bh.celestialite.id].actions[i].constantTarget)
                            } else if (BHC[player.bh.celestialite.id].actions[i].interval) {
                                player.bh.celestialite.actions[i].interval = player.bh.celestialite.actions[i].interval.add(delta)
                                if (player.bh.celestialite.actions[i].interval.gte(BHC[player.bh.celestialite.id].actions[i].interval)) {
                                    player.bh.celestialite.actions[i].interval = new Decimal(0)
                                    if (!BHC[player.bh.celestialite.id].actions[i].conditional || BHC[player.bh.celestialite.id].actions[i].conditional(3, i)) {
                                        bhAction(3, i, true)
                                    }
                                }
                            } else {
                                let properties = BHC[player.bh.celestialite.id].actions[i].effects
                                if (Object.keys(properties).length === 0) continue
                                let target = calcTarget(i, BHC[player.bh.celestialite.id].actions[i].constantTarget, "effect")
                                for (let k in properties) {
                                    if (k == "target") continue
                                    for (let t = 0; t < target.length; t++) {
                                        let val = run(properties[k], properties)
                                        if (k == "attributes") {
                                            bhTemp[target[t]][k] = Object.assign({}, bhTemp[target[t]][k], val)
                                            continue
                                        }
                                        if (k.includes("time")) {
                                            if (k == "timeAdd") {
                                                bhTemp[k] = bhTemp[k].add(val)
                                            } else {
                                                bhTemp[k] = bhTemp[k].mul(val)
                                            }
                                            continue
                                        }
                                        if (k.includes("Add")) {
                                            bhTemp[target[t]][k] = bhTemp[target[t]][k].add(val)
                                        } else {
                                            bhTemp[target[t]][k] = bhTemp[target[t]][k].mul(val)
                                        }
                                    }
                                }
                            }
                        }

                        let variables = {...player.bh.celestialite.actions[i].variables}
                        if (Object.hasOwn(variables, "attacks")) delete variables.attacks
                        if (Object.keys(variables).length === 0) continue
                        let target = calcTarget(i, variables.target, "effect")
                        for (let k in variables) {
                            if (k == "target") continue
                            for (let t = 0; t < target.length; t++) {
                                let val = run(variables[k], variables)
                                if (k == "attributes") {
                                    bhTemp[target[t]][k] = Object.assign({}, bhTemp[target[t]][k], val)
                                    continue
                                }
                                if (k.includes("time")) {
                                    if (k == "timeAdd") {
                                        bhTemp[k] = bhTemp[k].add(val)
                                    } else {
                                        bhTemp[k] = bhTemp[k].mul(val)
                                    }
                                    continue
                                }
                                if (k.includes("Add")) {
                                    bhTemp[target[t]][k] = bhTemp[target[t]][k].add(val)
                                } else {
                                    bhTemp[target[t]][k] = bhTemp[target[t]][k].mul(val)
                                }
                            }
                        }                        
                    }
                }

                // Kill Celestialite
                if (player.bh.celestialite.health.lte(0) && !BHC[player.bh.celestialite.id].immortal) {
                    celestialiteDeath()
                }
            }

            // Cycle Characters
            for (let i = 0; i < 3; i++) {
                // Check if character is dead before doing anything
                if (player.bh.characters[i].health.lte(0)) continue

                // Character Regen
                if (player.bh.characters[i].regen.neq(0)) {
                    player.bh.characters[i].health = player.bh.characters[i].health.add(player.bh.characters[i].regen.mul(delta)).min(player.bh.characters[i].maxHealth)
                }

                if (player.bh.characters[i].stun[1].gt(0)) {
                    player.bh.characters[i].stun[1] = player.bh.characters[i].stun[1].sub(delta)
                }

                // Cycle through character skills
                for (let j = 0; j < 4; j++) {
                    if (player.bh.characters[i].skills[j].id == "none") continue
                    if ((player.bh.characters[i].stun[1].gt(0) && player.bh.characters[i].stun[0] == "hard") || player.bh.bulletHell) continue
                    let curStun = player.bh.characters[i].stun[1].gt(0) && player.bh.characters[i].stun[0] == "soft"
                    let instant = BHA[player.bh.characters[i].skills[j].id].instant
                    let active = BHA[player.bh.characters[i].skills[j].id].active
                    let passive = BHA[player.bh.characters[i].skills[j].id].passive
                    if (player.bh.characters[i].skills[j].duration.gt(0)) player.bh.characters[i].skills[j].duration = player.bh.characters[i].skills[j].duration.sub(delta)
                    if (instant || active) {
                        if (!curStun) player.bh.characters[i].skills[j].cooldown = player.bh.characters[i].skills[j].cooldown.add(delta)
                        if (player.bh.characters[i].skills[j].auto && player.bh.characters[i].skills[j].cooldown.gte(player.bh.characters[i].skills[j].cooldownMax.mul(2))) {
                            if (!BHA[player.bh.characters[i].skills[j].id].conditional || BHA[player.bh.characters[i].skills[j].id].conditional(i, j)) {
                                if (instant) bhAction(i, j)
                                if (active) {
                                    player.bh.characters[i].skills[j].cooldown = new Decimal(0)
                                    player.bh.characters[i].skills[j].duration = BHA[player.bh.characters[i].skills[j].id].duration
                                }
                            }
                        }
                    }

                    // Calculate Variables (and remove inactive active)
                    if (passive || (active && player.bh.characters[i].skills[j].duration.gt(0))) {
                        if (BHA[player.bh.characters[i].skills[j].id].interval) {
                            player.bh.characters[i].skills[j].interval = player.bh.characters[i].skills[j].interval.add(delta)
                            if (player.bh.characters[i].skills[j].interval.gte(BHA[player.bh.characters[i].skills[j].id].interval)) {
                                player.bh.characters[i].skills[j].interval = new Decimal(0)
                                if (!BHA[player.bh.characters[i].skills[j].id].conditional || BHA[player.bh.characters[i].skills[j].id].conditional(i, j)) {
                                    bhAction(i, j, true)
                                }
                            }
                        } else {
                            let properties = BHA[player.bh.characters[i].skills[j].id].effects
                            if (Object.keys(properties).length === 0) continue
                            let target = calcTarget(i, BHA[player.bh.characters[i].skills[j].id].constantTarget, "effect")
                            for (let k in properties) {
                                if (k == "target") continue
                                for (let t = 0; t < target.length; t++) {
                                    let val = run(properties[k], properties)
                                    if (k == "attributes") {
                                        bhTemp[target[t]][k] = Object.assign({}, bhTemp[target[t]][k], val)
                                        continue
                                    }
                                    if (k.includes("time")) {
                                        if (k == "timeAdd") {
                                            bhTemp[k] = bhTemp[k].add(val)
                                        } else {
                                            bhTemp[k] = bhTemp[k].mul(val)
                                        }
                                        continue
                                    }
                                    if (k.includes("Add")) {
                                        bhTemp[target[t]][k] = bhTemp[target[t]][k].add(val)
                                    } else {
                                        bhTemp[target[t]][k] = bhTemp[target[t]][k].mul(val)
                                    }
                                }
                            }
                        }
                    }

                    let variables = player.bh.characters[i].skills[j].variables
                    if (Object.keys(variables).length === 0) continue
                    let target = calcTarget(i, variables.target, "effect")
                    for (let k in variables) {
                        if (k == "target") continue
                        for (let t = 0; t < target.length; t++) {
                            let val = run(variables[k], variables)
                            if (k == "attributes") {
                                bhTemp[target[t]][k] = Object.assign({}, bhTemp[target[t]][k], val)
                                continue
                            }
                            if (k.includes("time")) {
                                if (k == "timeAdd") {
                                    bhTemp[k] = bhTemp[k].add(val)
                                } else {
                                    bhTemp[k] = bhTemp[k].mul(val)
                                }
                                continue
                            }
                            if (k.includes("Add")) {
                                bhTemp[target[t]][k] = bhTemp[target[t]][k].add(val)
                            } else {
                                bhTemp[target[t]][k] = bhTemp[target[t]][k].mul(val)
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

        // Death Code
        if (player.bh.currentStage != "none") {
            if ((player.bh.characters[0].health.lte(0) || player.bh.characters[0].id == "none") && (player.bh.characters[1].health.lte(0) || player.bh.characters[1].id == "none") && (player.bh.characters[2].health.lte(0) || player.bh.characters[2].id == "none")) {
                for (let i = 0; i < 3; i++) {
                    player.bh.characters[i].health = player.bh.characters[i].maxHealth
                    player.bh.characters[i].shield = new Decimal(0)
                    for (let j = 0; j < 4; j++) {
                        player.bh.characters[i].skills[j].variables = {}
                    }
                }

                player.bh.currentStage = "none"
                player.bh.combo = new Decimal(0)
                player.bh.celestialite.id = "none"

                player.subtabs["bh"]["stuff"] = "dead"
            }
        }

        // =-- Calculate celestialite stats --=
        let scale = new Decimal(1)
        if (player.bh.combo.gte(player.bh.comboScalingStart)) scale = Decimal.pow(player.bh.comboScaling, player.bh.combo.sub(player.bh.comboScalingStart))
            
        player.bh.celestialite.maxHealth = BHC[player.bh.celestialite.id].health ?? new Decimal(0)
        player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.mul(player.bh.celestialite.randomMult)
        player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.add(bhTemp[3].healthAdd)
        player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.mul(bhTemp[3].healthMult)
        player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.mul(scale)

        player.bh.celestialite.damage = BHC[player.bh.celestialite.id].damage ?? new Decimal(0)
        player.bh.celestialite.damage = player.bh.celestialite.damage.mul(player.bh.celestialite.randomMult)
        player.bh.celestialite.damage = player.bh.celestialite.damage.add(bhTemp[3].damageAdd)
        player.bh.celestialite.damage = player.bh.celestialite.damage.mul(bhTemp[3].damageMult)
        player.bh.celestialite.damage = player.bh.celestialite.damage.mul(scale)

        player.bh.celestialite.defense = BHC[player.bh.celestialite.id].defense ?? new Decimal(0)
        player.bh.celestialite.defense = player.bh.celestialite.defense.mul(player.bh.celestialite.randomMult)
        player.bh.celestialite.defense = player.bh.celestialite.defense.add(bhTemp[3].defenseAdd)
        player.bh.celestialite.defense = player.bh.celestialite.defense.mul(bhTemp[3].defenseMult)
        player.bh.celestialite.defense = player.bh.celestialite.defense.mul(scale)

        player.bh.celestialite.regen = BHC[player.bh.celestialite.id].regen ?? new Decimal(0)
        player.bh.celestialite.regen = player.bh.celestialite.regen.mul(player.bh.celestialite.randomMult)
        player.bh.celestialite.regen = player.bh.celestialite.regen.add(bhTemp[3].regenAdd)
        player.bh.celestialite.regen = player.bh.celestialite.regen.mul(bhTemp[3].regenMult)
        player.bh.celestialite.regen = player.bh.celestialite.regen.mul(scale)

        player.bh.celestialite.attributes = BHC[player.bh.celestialite.id].attributes ?? {}
        player.bh.celestialite.attributes = Object.assign({}, player.bh.celestialite.attributes, bhTemp[3].attributes)

        // =-- Calculate general stats --=
        player.bh.maxSkillPoints = new Decimal(10)
        player.bh.maxSkillPoints = player.bh.maxSkillPoints.add(player.darkTemple.spAdd)
        player.bh.maxSkillPoints = player.bh.maxSkillPoints.add(player.depth1.milestoneEffect)
        player.bh.maxSkillPoints = player.bh.maxSkillPoints.add(player.depth2.milestoneEffect)
        player.bh.maxSkillPoints = player.bh.maxSkillPoints.add(player.depth3.milestoneEffect)

        player.bh.skillCostDiv = new Decimal(1)
        player.bh.skillCostDiv = player.bh.skillCostDiv.mul(player.darkTemple.skillCost)

        player.bh.timeSpeed = new Decimal(1)
        player.bh.timeSpeed = player.bh.timeSpeed.add(bhTemp.timeAdd)
        player.bh.timeSpeed = player.bh.timeSpeed.mul(bhTemp.timeMult)

        // =-- HEALTH STUFF --= //
        let healthBase = new Decimal(1)
        healthBase = healthBase.add(buyableEffect("depth1", 1))
        healthBase = healthBase.add(player.darkTemple.hpMult)
        if (hasUpgrade("ep2", 9101)) healthBase = healthBase.add(upgradeEffect("ep2", 9101))

        let healthAdd = new Decimal(0)
        healthAdd = healthAdd.add(player.darkTemple.hpAdd)
        healthAdd = healthAdd.add(player.bh.skillData["general_bandage"].maxLevel)
        healthAdd = healthAdd.add(player.bh.skillData["kres_bigAttack"].maxLevel)
        healthAdd = healthAdd.add(player.bh.skillData["nav_healSpell"].maxLevel)
        healthAdd = healthAdd.add(player.bh.skillData["geroa_selfRepair"].maxLevel)
        healthAdd = healthAdd.add(buyableEffect("sp", 12))

        // =-- DAMAGE STUFF --= //
        let damageBase = new Decimal(1)
        damageBase = damageBase.add(buyableEffect("depth2", 1))
        damageBase = damageBase.add(player.darkTemple.dmgMult)
        if (hasUpgrade("ep2", 9103)) damageBase = damageBase.add(upgradeEffect("ep2", 9103))

        let damageAdd = new Decimal(0)
        damageAdd = damageAdd.add(player.darkTemple.dmgAdd)
        damageAdd = damageAdd.add(player.bh.skillData["general_slap"].maxLevel.div(5))
        damageAdd = damageAdd.add(player.bh.skillData["kres_chop"].maxLevel.div(5))
        damageAdd = damageAdd.add(player.bh.skillData["kres_battleCry"].maxLevel.div(5))
        damageAdd = damageAdd.add(player.bh.skillData["nav_magicMissle"].maxLevel.div(5))
        damageAdd = damageAdd.add(player.bh.skillData["eclipse_drain"].maxLevel.div(5))
        damageAdd = damageAdd.add(player.bh.skillData["eclipse_motivation"].maxLevel.div(5))
        damageAdd = damageAdd.add(player.bh.skillData["geroa_cosmicRay"].maxLevel.div(5))
        damageAdd = damageAdd.add(player.bh.skillData["geroa_orbitalCannon"].maxLevel.div(5))
        damageAdd = damageAdd.add(buyableEffect("sp", 22))

        // =-- REGEN STUFF --= //
        let regenBase = new Decimal(1)

        let regenAdd = new Decimal(0)
        regenAdd = regenAdd.add(player.darkTemple.rgnAdd)
        regenAdd = regenAdd.add(player.bh.skillData["general_scream"].maxLevel.div(20))
        regenAdd = regenAdd.add(player.bh.skillData["kres_berserker"].maxLevel.div(20))

        // =-- AGILITY STUFF --= //
        let agilityBase = new Decimal(1)
        agilityBase = agilityBase.add(buyableEffect("depth3", 1))

        let agilityAdd = new Decimal(0)
        agilityAdd = agilityAdd.add(player.darkTemple.agiAdd)
        agilityAdd = agilityAdd.add(player.bh.skillData["sel_singleShot"].maxLevel.div(2))
        agilityAdd = agilityAdd.add(player.bh.skillData["sel_turret"].maxLevel.div(2))
        agilityAdd = agilityAdd.add(player.bh.skillData["sel_energyBoost"].maxLevel.div(2))
        agilityAdd = agilityAdd.add(player.bh.skillData["eclipse_syzygy"].maxLevel.div(2))
        agilityAdd = agilityAdd.add(player.bh.skillData["geroa_radioactiveMissile"].maxLevel.div(2))
        agilityAdd = agilityAdd.add(buyableEffect("sp", 32))

        // =-- DEFENSE STUFF --= //
        let defenseBase = new Decimal(1)

        let defenseAdd = new Decimal(0)
        defenseAdd = defenseAdd.add(player.darkTemple.defAdd)
        defenseAdd = defenseAdd.add(player.bh.skillData["general_block"].maxLevel.div(2))
        defenseAdd = defenseAdd.add(player.bh.skillData["nav_reboundingAura"].maxLevel.div(2))
        defenseAdd = defenseAdd.add(player.bh.skillData["eclipse_lightBarrier"].maxLevel.div(2))
        defenseAdd = defenseAdd.add(levelableEffect("pet", 310)[1])

        // =-- LUCK STUFF --= //
        let luckBase = new Decimal(1)

        let luckAdd = new Decimal(0)
        luckAdd = luckAdd.add(player.darkTemple.luckAdd)
        luckAdd = luckAdd.add(player.bh.skillData["kres_decapitate"].maxLevel.div(2))
        luckAdd = luckAdd.add(player.bh.skillData["nav_fireball"].maxLevel.div(2))
        luckAdd = luckAdd.add(player.bh.skillData["sel_arrowBarrage"].maxLevel.div(2))
        if (hasUpgrade("ep2", 9105)) luckAdd = luckAdd.add(upgradeEffect("ep2", 9105))

        // =-- MENDING STUFF --= //
        let mendingBase = new Decimal(1)

        let mendingAdd = new Decimal(0)

        // =-- STAT CALCULATION --=
        for (let i = 0; i < 3; i++) {
            // HEALTH
            player.bh.characters[i].maxHealth = BHP[player.bh.characters[i].id].health ?? new Decimal(0)
            player.bh.characters[i].maxHealth = player.bh.characters[i].maxHealth.mul(healthBase)
            player.bh.characters[i].maxHealth = player.bh.characters[i].maxHealth.add(healthAdd)
            player.bh.characters[i].maxHealth = player.bh.characters[i].maxHealth.add(bhTemp[i].healthAdd)
            player.bh.characters[i].maxHealth = player.bh.characters[i].maxHealth.mul(bhTemp[i].healthMult)

            // DAMAGE
            player.bh.characters[i].damage = BHP[player.bh.characters[i].id].damage ?? new Decimal(0)
            player.bh.characters[i].damage = player.bh.characters[i].damage.mul(damageBase)
            player.bh.characters[i].damage = player.bh.characters[i].damage.add(damageAdd)
            player.bh.characters[i].damage = player.bh.characters[i].damage.add(bhTemp[i].damageAdd)
            player.bh.characters[i].damage = player.bh.characters[i].damage.mul(bhTemp[i].damageMult)

            // DEFENSE
            player.bh.characters[i].defense = BHP[player.bh.characters[i].id].defense ?? new Decimal(0)
            player.bh.characters[i].defense = player.bh.characters[i].defense.mul(defenseBase)
            player.bh.characters[i].defense = player.bh.characters[i].defense.add(defenseAdd)
            player.bh.characters[i].defense = player.bh.characters[i].defense.add(bhTemp[i].defenseAdd)
            player.bh.characters[i].defense = player.bh.characters[i].defense.mul(bhTemp[i].defenseMult)

            // REGEN
            player.bh.characters[i].regen = BHP[player.bh.characters[i].id].regen ?? new Decimal(0)
            player.bh.characters[i].regen = player.bh.characters[i].regen.mul(defenseBase)
            player.bh.characters[i].regen = player.bh.characters[i].regen.add(regenAdd)
            player.bh.characters[i].regen = player.bh.characters[i].regen.add(bhTemp[i].regenAdd)
            player.bh.characters[i].regen = player.bh.characters[i].regen.mul(bhTemp[i].regenMult)

            // AGILITY
            player.bh.characters[i].agility = BHP[player.bh.characters[i].id].agility ?? new Decimal(0)
            player.bh.characters[i].agility = player.bh.characters[i].agility.mul(agilityBase)
            player.bh.characters[i].agility = player.bh.characters[i].agility.add(agilityAdd)
            player.bh.characters[i].agility = player.bh.characters[i].agility.add(bhTemp[i].agilityAdd)
            player.bh.characters[i].agility = player.bh.characters[i].agility.mul(bhTemp[i].agilityMult)

            // LUCK
            player.bh.characters[i].luck = BHP[player.bh.characters[i].id].luck ?? new Decimal(0)
            player.bh.characters[i].luck = player.bh.characters[i].luck.mul(luckBase)
            player.bh.characters[i].luck = player.bh.characters[i].luck.add(luckAdd)
            player.bh.characters[i].luck = player.bh.characters[i].luck.add(bhTemp[i].luckAdd)
            player.bh.characters[i].luck = player.bh.characters[i].luck.mul(bhTemp[i].luckMult)

            // MENDING
            player.bh.characters[i].mending = BHP[player.bh.characters[i].id].mending ?? new Decimal(0)
            player.bh.characters[i].mending = player.bh.characters[i].mending.mul(mendingBase)
            player.bh.characters[i].mending = player.bh.characters[i].mending.add(mendingAdd)
            player.bh.characters[i].mending = player.bh.characters[i].mending.add(bhTemp[i].mendingAdd)
            player.bh.characters[i].mending = player.bh.characters[i].mending.mul(bhTemp[i].mendingMult)

            if (player.matosLair.milestone[25] < 2) player.bh.characters[i].mending = new Decimal(0)

            // ATTRIBUTES
            player.bh.characters[i].attributes = BHP[player.bh.characters[i].id].attributes ?? {}
            player.bh.characters[i].attributes = Object.assign({}, player.bh.characters[i].attributes, bhTemp[i].attributes)

            for (let j = 0; j < 4; j++) {
                player.bh.characters[i].skills[j].cooldownMax = BHA[player.bh.characters[i].skills[j].id].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.characters[i].agility)))
                if (BHA[player.bh.characters[i].skills[j].id].cooldownCap) player.bh.characters[i].skills[j].cooldownMax = player.bh.characters[i].skills[j].cooldownMax.max(BHA[player.bh.characters[i].skills[j].id].cooldownCap)
            }
        }

        // =-- STORED STAT CALCULATIONS --=
        for (let i in player.bh.characterData) {
            // HEALTH
            player.bh.characterData[i].health = BHP[i].health
            player.bh.characterData[i].health = player.bh.characterData[i].health.mul(healthBase)
            player.bh.characterData[i].health = player.bh.characterData[i].health.add(healthAdd)

            // DAMAGE
            player.bh.characterData[i].damage = BHP[i].damage
            player.bh.characterData[i].damage = player.bh.characterData[i].damage.mul(damageBase)
            player.bh.characterData[i].damage = player.bh.characterData[i].damage.add(damageAdd)

            // DEFENSE
            player.bh.characterData[i].defense = BHP[i].defense
            player.bh.characterData[i].defense = player.bh.characterData[i].defense.mul(defenseBase)
            player.bh.characterData[i].defense = player.bh.characterData[i].defense.add(defenseAdd)
            
            // REGEN
            player.bh.characterData[i].regen = BHP[i].regen
            player.bh.characterData[i].regen = player.bh.characterData[i].regen.mul(regenBase)
            player.bh.characterData[i].regen = player.bh.characterData[i].regen.add(regenAdd)
            
            // AGILITY
            player.bh.characterData[i].agility = BHP[i].agility
            player.bh.characterData[i].agility = player.bh.characterData[i].agility.mul(agilityBase)
            player.bh.characterData[i].agility = player.bh.characterData[i].agility.add(agilityAdd)
            
            // LUCK
            player.bh.characterData[i].luck = BHP[i].luck
            player.bh.characterData[i].luck = player.bh.characterData[i].luck.mul(luckBase)
            player.bh.characterData[i].luck = player.bh.characterData[i].luck.add(luckAdd)
            
            // MENDING
            player.bh.characterData[i].mending = BHP[i].mending
            player.bh.characterData[i].mending = player.bh.characterData[i].mending.mul(mendingBase)
            player.bh.characterData[i].mending = player.bh.characterData[i].mending.add(mendingAdd)

            if (player.matosLair.milestone[25] < 2) player.bh.characterData[i].mending = new Decimal(0)
        }
    },
    clickables: {
        "Unlock-Clear": {
            title() {
                let amt = 0
                for (let i in player.bh.unlockConditions) {
                    if (player.bh.unlockConditions[i]) amt += 1
                }
                return "<h2>" + amt + "/4<br><h1>OPEN THE DEPTHS</h1>"
            }, // Increased font size
            canClick() { return player.bh.unlockConditions.core && player.bh.unlockConditions.level && player.bh.unlockConditions.replicanti && player.bh.unlockConditions.points },
            unlocked: true,
            onClick() {
                player.bh.unlockConditions.done = true
                player.subtabs["bh"]["stuff"] = "party"
            },
            style: {width: "175px", minHeight: "175px", border: "5px solid #8a0e79", borderRadius: "15px"},
        },
        "Unlock-0": {
            title() {
                return !player.bh.unlockConditions.core ? "<h2>Max Strength Core</h2>" : "<h1>YOU"
            },
            canClick() {
                let max = false
                for (let prop in player.co.cores) {
                    if (player.co.cores[prop].strength == 4) {
                        max = true
                    }
                }
                return max && !player.bh.unlockConditions.core
            },
            unlocked: true,
            onClick() {
                player.bh.unlockConditions.core = true
            },
            style() {
                let look = {width: "150px", minHeight: "150px", border: "5px solid #8a0e79", borderRadius: "15px"}
                if (player.bh.unlockConditions.core) {
                    look.backgroundColor = "#45073c"
                    look.color = "white"
                    look.cursor = "default"
                } else if (this.canClick()) {look.backgroundColor = "#8a0e79"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
            branches: [["Unlock-Clear", "#8a0e79"]]
        },
        "Unlock-1": {
            title() {
                return !player.bh.unlockConditions.level ? "<h2>Check Back Level</h2><br>" + formatShortWhole(player.cb.level) + "/20,000" : "<h1>HAVE"
            },
            canClick() { return player.cb.level.gte(20000) && !player.bh.unlockConditions.level },
            unlocked: true,
            onClick() {
                player.bh.unlockConditions.level = true
            },
            style() {
                let look = {width: "150px", minHeight: "150px", border: "5px solid #8a0e79", borderRadius: "15px"}
                if (player.bh.unlockConditions.level) {
                    look.backgroundColor = "#45073c"
                    look.color = "white"
                    look.cursor = "default"
                } else if (this.canClick()) {look.backgroundColor = "#8a0e79"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
            branches: [["Unlock-Clear", "#8a0e79"]]
        },
        "Unlock-2": {
            title() { return !player.bh.unlockConditions.replicanti ? "<h2>Replicanti Points</h2><br>" + formatWhole(player.cp.replicantiPoints) + "/1e280" : "<h1>BEEN" },
            canClick() { return player.cp.replicantiPoints.gte(1e280) && !player.bh.unlockConditions.replicanti },
            unlocked: true,
            onClick() {
                player.bh.unlockConditions.replicanti = true
            },
            style() {
                let look = {width: "150px", minHeight: "150px", border: "5px solid #8a0e79", borderRadius: "15px"}
                if (player.bh.unlockConditions.replicanti) {
                    look.backgroundColor = "#45073c"
                    look.color = "white"
                    look.cursor = "default"
                } else if (this.canClick()) {look.backgroundColor = "#8a0e79"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
            branches: [["Unlock-Clear", "#8a0e79"]]
        },
        "Unlock-3": {
            title() { return !player.bh.unlockConditions.points ? "<h2>Points</h2><br>" + formatWhole(player.points) + "<br>/1e300,000" : "<h1>WARNED" },
            canClick() { return player.points.gte("1e300000") && !player.bh.unlockConditions.points },
            unlocked: true,
            onClick() {
                player.bh.unlockConditions.points = true
            },
            style() {
                let look = {width: "150px", minHeight: "150px", border: "5px solid #8a0e79", borderRadius: "15px"}
                if (player.bh.unlockConditions.points) {
                    look.backgroundColor = "#45073c"
                    look.color = "white"
                    look.cursor = "default"
                } else if (this.canClick()) {look.backgroundColor = "#8a0e79"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
            branches: [["Unlock-Clear", "#8a0e79"]]
        },
        "Leave": {
            title() { return "<h2>Leave the black heart" },
            canClick: true,
            unlocked: true,
            onClick() {
                console.log("ye")
                options.fullscreen = false

                player.subtabs["bh"]["stuff"] = "stages"
            },
            style() {
                let look = {width: "200px", minHeight: "75px", color: "white", backgroundColor: "black", border: "3px solid #8a0e79", borderRadius: "20px", margin: "-1.5px"}
                return look
            },
        },
        "Pause": {
            title() { return player.bh.bhPause ? "Unpause" : "Pause" },
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.bh.bhPause) {
                    player.bh.bhPause = false
                } else {
                    player.bh.bhPause = true
                }
            },
            style() {
                let look = {width: "125px", minHeight: "40px", color: "black", border: "3px solid rgba(0,0,0,0.5)", backgroundColor: "white", borderRadius: "15px"}
                if (player.bh.bhPause) look.backgroundColor = "#888"
                return look
            },
        },
        "Fullscreen": {
            title: "Fullscreen",
            canClick: true,
            unlocked: true,
            onClick() {
                if (options.fullscreen) {
                    options.fullscreen = false
                } else {
                    options.fullscreen = true
                }
            },
            style() {
                let look = {width: "125px", minHeight: "40px", color: "black", fontSize: "9px", border: "3px solid rgba(0,0,0,0.5)", backgroundColor: "white", borderRadius: "15px"}
                if (options.fullscreen) look.backgroundColor = "#888"
                return look
            },
        },
        "Give-Up": {
            title() { return "Give up" },
            canClick: true,
            unlocked: true,
            onClick() {
                for (let i = 0; i < 3; i++) {
                    player.bh.characters[i].health = new Decimal(-Infinity)
                }
            },
            style: {width: "250px", minHeight: "40px", color: "black", border: "3px solid rgba(0,0,0,0.5)", backgroundColor: "white", borderRadius: "15px"},
        },
        "Auto-Enter": {
            title() {return player.bh.autoEnter ? "<div style='margin-bottom:-20px;line-height:1'>Auto Enter<br><small>[" + BHS[player.bh.autoEnter].nameCap + "]<br>[" + formatTime(Decimal.sub(30, player.bh.autoCooldown)) + "]</small></div>" : "Auto Enter<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            tooltip: "Activates after 30 seconds when exiting a BH stage",
            onClick() {
                if (player.bh.autoEnter) {
                    player.bh.autoEnter = false
                    player.bh.autoCooldown = new Decimal(0)
                } else {
                    player.bh.autoEnter = player.subtabs["bh"]["stages"]
                }
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
        "Auto-Exit": {
            title() {return player.bh.autoExit ? "Auto Exit<br><small>[Enabled]" : "Auto Exit<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.bh.autoExit) {
                    player.bh.autoExit = false
                } else {
                    player.bh.autoExit = true
                }
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
        "C0-Icon": {
            title() {
                if (player.bh.characters[0].health.lte(0) && player.bh.characters[0].id != "none") {
                    return "<img src='resources/dead.png'style='width:149px;height:149px;margin-left:-1.5px;margin-bottom:-6px'></img>"
                } else {
                    return "<img src='" + BHP[player.bh.characters[0].id].icon + "'style='width:149px;height:149px;margin-left:-1.5px;margin-bottom:-6px'></img>"
                }
            },
            canClick: false,
            unlocked() {return player.bh.characters[0].id != "none"},
            onClick() {},
            style: {width: "150px", minHeight: "150px", color: "white", background: "transparent", padding: "0", cursor: "default", userSelect: "none"},
        },
        "C0-Skill-0": {
            title() {
                if (player.bh.characters[0].skills[0].id == "none") return ""
                let str = BHA[player.bh.characters[0].skills[0].id].name
                if (player.bh.characters[0].skills[0].auto && player.bh.characters[0].skills[0].id != "none" && !BHA[player.bh.characters[0].skills[0].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[0].skills[0].cooldown.sub(player.bh.characters[0].skills[0].cooldownMax)) + "/" + formatTime(player.bh.characters[0].skills[0].cooldownMax) + "]"
                }
                if (player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[0].skills[0].id].description, BHA[player.bh.characters[0].skills[0].id])},
            canClick() {
                return player.bh.characters[0].health.gt(0) && player.bh.characters[0].skills[0].id != "none" &&
                    !BHA[player.bh.characters[0].skills[0].id].passive && player.bh.characters[0].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[0].skills[0].id].conditional || BHA[player.bh.characters[0].skills[0].id].conditional(0, 0))
            },
            unlocked() {return player.bh.characters[0].skills[0].cooldown.gte(player.bh.characters[0].skills[0].cooldownMax) || player.bh.characters[0].skills[0].id == "none" || BHA[player.bh.characters[0].skills[0].id].passive},
            onClick() {
                if (BHA[player.bh.characters[0].skills[0].id].instant) {
                    bhAction(0, 0)
                }
                if (BHA[player.bh.characters[0].skills[0].id].active) {
                    player.bh.characters[0].skills[0].cooldown = new Decimal(0)
                    player.bh.characters[0].skills[0].duration = BHA[player.bh.characters[0].skills[0].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[0].skills[0].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[0].skills[0].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[0].skills[0].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C0-Skill-1": {
            title() {
                if (player.bh.characters[0].skills[1].id == "none") return ""
                let str = BHA[player.bh.characters[0].skills[1].id].name
                if (player.bh.characters[0].skills[1].auto && player.bh.characters[0].skills[1].id != "none" && !BHA[player.bh.characters[0].skills[1].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[0].skills[1].cooldown.sub(player.bh.characters[0].skills[1].cooldownMax)) + "/" + formatTime(player.bh.characters[0].skills[1].cooldownMax) + "]"
                }
                if (player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[0].skills[1].id].description, BHA[player.bh.characters[0].skills[1].id])},
            canClick() {
                return player.bh.characters[0].health.gt(0) && player.bh.characters[0].skills[1].id != "none" &&
                    !BHA[player.bh.characters[0].skills[1].id].passive && player.bh.characters[0].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[0].skills[1].id].conditional || BHA[player.bh.characters[0].skills[1].id].conditional(0, 1))
            },
            unlocked() {return player.bh.characters[0].skills[1].cooldown.gte(player.bh.characters[0].skills[1].cooldownMax) || player.bh.characters[0].skills[1].id == "none" || BHA[player.bh.characters[0].skills[1].id].passive},
            onClick() {
                if (BHA[player.bh.characters[0].skills[1].id].instant) {
                    bhAction(0, 1)
                }
                if (BHA[player.bh.characters[0].skills[1].id].active) {
                    player.bh.characters[0].skills[1].cooldown = new Decimal(0)
                    player.bh.characters[0].skills[1].duration = BHA[player.bh.characters[0].skills[1].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[0].skills[1].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[0].skills[1].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[0].skills[1].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C0-Skill-2": {
            title() {
                if (player.bh.characters[0].skills[2].id == "none") return ""
                let str = BHA[player.bh.characters[0].skills[2].id].name
                if (player.bh.characters[0].skills[2].auto && player.bh.characters[0].skills[2].id != "none" && !BHA[player.bh.characters[0].skills[2].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[0].skills[2].cooldown.sub(player.bh.characters[0].skills[2].cooldownMax)) + "/" + formatTime(player.bh.characters[0].skills[2].cooldownMax) + "]"
                }
                if (player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[0].skills[2].id].description, BHA[player.bh.characters[0].skills[2].id])},
            canClick() {
                return player.bh.characters[0].health.gt(0) && player.bh.characters[0].skills[2].id != "none" &&
                    !BHA[player.bh.characters[0].skills[2].id].passive && player.bh.characters[0].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[0].skills[2].id].conditional || BHA[player.bh.characters[0].skills[2].id].conditional(0, 2))
            },
            unlocked() {return player.bh.characters[0].skills[2].cooldown.gte(player.bh.characters[0].skills[2].cooldownMax) || player.bh.characters[0].skills[2].id == "none" || BHA[player.bh.characters[0].skills[2].id].passive},
            onClick() {
                if (BHA[player.bh.characters[0].skills[2].id].instant) {
                    bhAction(0, 2)
                }
                if (BHA[player.bh.characters[0].skills[2].id].active) {
                    player.bh.characters[0].skills[2].cooldown = new Decimal(0)
                    player.bh.characters[0].skills[2].duration = BHA[player.bh.characters[0].skills[2].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[0].skills[2].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[0].skills[2].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[0].skills[2].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C0-Skill-3": {
            title() {
                if (player.bh.characters[0].skills[3].id == "none") return ""
                let str = BHA[player.bh.characters[0].skills[3].id].name
                if (player.bh.characters[0].skills[3].auto && player.bh.characters[0].skills[3].id != "none" && !BHA[player.bh.characters[0].skills[3].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[0].skills[3].cooldown.sub(player.bh.characters[0].skills[3].cooldownMax)) + "/" + formatTime(player.bh.characters[0].skills[3].cooldownMax) + "]"
                }
                if (player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[0].skills[3].id].description, BHA[player.bh.characters[0].skills[3].id])},
            canClick() {
                return player.bh.characters[0].health.gt(0) && player.bh.characters[0].skills[3].id != "none" &&
                    !BHA[player.bh.characters[0].skills[3].id].passive && player.bh.characters[0].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[0].skills[3].id].conditional || BHA[player.bh.characters[0].skills[3].id].conditional(0, 3))
            },
            unlocked() {return player.bh.characters[0].skills[3].cooldown.gte(player.bh.characters[0].skills[3].cooldownMax) || player.bh.characters[0].skills[3].id == "none" || BHA[player.bh.characters[0].skills[3].id].passive},
            onClick() {
                if (BHA[player.bh.characters[0].skills[3].id].instant) {
                    bhAction(0, 3)
                }
                if (BHA[player.bh.characters[0].skills[3].id].active) {
                    player.bh.characters[0].skills[3].cooldown = new Decimal(0)
                    player.bh.characters[0].skills[3].duration = BHA[player.bh.characters[0].skills[3].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[0].skills[3].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[0].skills[3].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[0].skills[3].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C1-Icon": {
            title() {
                if (player.bh.characters[1].health.lte(0) && player.bh.characters[1].id != "none") {
                    return "<img src='resources/dead.png'style='width:149px;height:149px;margin-left:-1.5px;margin-bottom:-6px'></img>"
                } else {
                    return "<img src='" + BHP[player.bh.characters[1].id].icon + "'style='width:149px;height:149px;margin-left:-1.5px;margin-bottom:-6px'></img>"
                }
            },
            canClick: false,
            unlocked() {return player.bh.characters[1].id != "none"},
            onClick() {},
            style: {width: "150px", minHeight: "150px", color: "white", background: "transparent", padding: "0", cursor: "default", userSelect: "none"},
        },
        "C1-Skill-0": {
            title() {
                if (player.bh.characters[1].skills[0].id == "none") return ""
                let str = BHA[player.bh.characters[1].skills[0].id].name
                if (player.bh.characters[1].skills[0].auto && player.bh.characters[1].skills[0].id != "none" && !BHA[player.bh.characters[1].skills[0].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[1].skills[0].cooldown.sub(player.bh.characters[1].skills[0].cooldownMax)) + "/" + formatTime(player.bh.characters[1].skills[0].cooldownMax) + "]"
                }
                if (player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[1].skills[0].id].description, BHA[player.bh.characters[1].skills[0].id])},
            canClick() {
                return player.bh.characters[1].health.gt(0) && player.bh.characters[1].skills[0].id != "none" &&
                    !BHA[player.bh.characters[1].skills[0].id].passive && player.bh.characters[1].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[1].skills[0].id].conditional || BHA[player.bh.characters[1].skills[0].id].conditional(1, 0))
            },
            unlocked() {return player.bh.characters[1].skills[0].cooldown.gte(player.bh.characters[1].skills[0].cooldownMax) || player.bh.characters[1].skills[0].id == "none" || BHA[player.bh.characters[1].skills[0].id].passive},
            onClick() {
                if (BHA[player.bh.characters[1].skills[0].id].instant) {
                    bhAction(1, 0)
                }
                if (BHA[player.bh.characters[1].skills[0].id].active) {
                    player.bh.characters[1].skills[0].cooldown = new Decimal(0)
                    player.bh.characters[1].skills[0].duration = BHA[player.bh.characters[1].skills[0].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[1].skills[0].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[1].skills[0].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[1].skills[0].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C1-Skill-1": {
            title() {
                if (player.bh.characters[1].skills[1].id == "none") return ""
                let str = BHA[player.bh.characters[1].skills[1].id].name
                if (player.bh.characters[1].skills[1].auto && player.bh.characters[1].skills[1].id != "none" && !BHA[player.bh.characters[1].skills[1].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[1].skills[1].cooldown.sub(player.bh.characters[1].skills[1].cooldownMax)) + "/" + formatTime(player.bh.characters[1].skills[1].cooldownMax) + "]"
                }
                if (player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[1].skills[1].id].description, BHA[player.bh.characters[1].skills[1].id])},
            canClick() {
                return player.bh.characters[1].health.gt(0) && player.bh.characters[1].skills[1].id != "none" &&
                    !BHA[player.bh.characters[1].skills[1].id].passive && player.bh.characters[1].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[1].skills[1].id].conditional || BHA[player.bh.characters[1].skills[1].id].conditional(1, 1))
            },
            unlocked() {return player.bh.characters[1].skills[1].cooldown.gte(player.bh.characters[1].skills[1].cooldownMax) || player.bh.characters[1].skills[1].id == "none" || BHA[player.bh.characters[1].skills[1].id].passive},
            onClick() {
                if (BHA[player.bh.characters[1].skills[1].id].instant) {
                    bhAction(1, 1)
                }
                if (BHA[player.bh.characters[1].skills[1].id].active) {
                    player.bh.characters[1].skills[1].cooldown = new Decimal(0)
                    player.bh.characters[1].skills[1].duration = BHA[player.bh.characters[1].skills[1].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[1].skills[1].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[1].skills[1].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[1].skills[1].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C1-Skill-2": {
            title() {
                if (player.bh.characters[1].skills[2].id == "none") return ""
                let str = BHA[player.bh.characters[1].skills[2].id].name
                if (player.bh.characters[1].skills[2].auto && player.bh.characters[1].skills[2].id != "none" && !BHA[player.bh.characters[1].skills[2].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[1].skills[2].cooldown.sub(player.bh.characters[1].skills[2].cooldownMax)) + "/" + formatTime(player.bh.characters[1].skills[2].cooldownMax) + "]"
                }
                if (player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[1].skills[2].id].description, BHA[player.bh.characters[1].skills[2].id])},
            canClick() {
                return player.bh.characters[1].health.gt(0) && player.bh.characters[1].skills[2].id != "none" &&
                    !BHA[player.bh.characters[1].skills[2].id].passive && player.bh.characters[1].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[1].skills[2].id].conditional || BHA[player.bh.characters[1].skills[2].id].conditional(1, 2))
            },
            unlocked() {return player.bh.characters[1].skills[2].cooldown.gte(player.bh.characters[1].skills[2].cooldownMax) || player.bh.characters[1].skills[2].id == "none" || BHA[player.bh.characters[1].skills[2].id].passive},
            onClick() {
                if (BHA[player.bh.characters[1].skills[2].id].instant) {
                    bhAction(1, 2)
                }
                if (BHA[player.bh.characters[1].skills[2].id].active) {
                    player.bh.characters[1].skills[2].cooldown = new Decimal(0)
                    player.bh.characters[1].skills[2].duration = BHA[player.bh.characters[1].skills[2].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[1].skills[2].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[1].skills[2].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[1].skills[2].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C1-Skill-3": {
            title() {
                if (player.bh.characters[1].skills[3].id == "none") return ""
                let str = BHA[player.bh.characters[1].skills[3].id].name
                if (player.bh.characters[1].skills[3].auto && player.bh.characters[1].skills[3].id != "none" && !BHA[player.bh.characters[1].skills[3].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[1].skills[3].cooldown.sub(player.bh.characters[1].skills[3].cooldownMax)) + "/" + formatTime(player.bh.characters[1].skills[3].cooldownMax) + "]"
                }
                if (player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[1].skills[3].id].description, BHA[player.bh.characters[1].skills[3].id])},
            canClick() {
                return player.bh.characters[1].health.gt(0) && player.bh.characters[1].skills[3].id != "none" &&
                    !BHA[player.bh.characters[1].skills[3].id].passive && player.bh.characters[1].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[1].skills[3].id].conditional || BHA[player.bh.characters[1].skills[3].id].conditional(1, 3))
            },
            unlocked() {return player.bh.characters[1].skills[3].cooldown.gte(player.bh.characters[1].skills[3].cooldownMax) || player.bh.characters[1].skills[3].id == "none" || BHA[player.bh.characters[1].skills[3].id].passive},
            onClick() {
                if (BHA[player.bh.characters[1].skills[3].id].instant) {
                    bhAction(1, 3)
                }
                if (BHA[player.bh.characters[1].skills[3].id].active) {
                    player.bh.characters[1].skills[3].cooldown = new Decimal(0)
                    player.bh.characters[1].skills[3].duration = BHA[player.bh.characters[1].skills[3].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[1].skills[3].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[1].skills[3].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[1].skills[3].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C2-Icon": {
            title() {
                if (player.bh.characters[2].health.lte(0) && player.bh.characters[2].id != "none") {
                    return "<img src='resources/dead.png'style='width:149px;height:149px;margin-left:-1.5px;margin-bottom:-6px'></img>"
                } else {
                    return "<img src='" + BHP[player.bh.characters[2].id].icon + "'style='width:149px;height:149px;margin-left:-1.5px;margin-bottom:-6px'></img>"
                }
            },
            canClick: false,
            unlocked() {return player.bh.characters[2].id != "none"},
            onClick() {},
            style: {width: "150px", minHeight: "150px", color: "white", background: "transparent", padding: "0", cursor: "default", userSelect: "none"},
        },
        "C2-Skill-0": {
            title() {
                if (player.bh.characters[2].skills[0].id == "none") return ""
                let str = BHA[player.bh.characters[2].skills[0].id].name
                if (player.bh.characters[2].skills[0].auto && player.bh.characters[2].skills[0].id != "none" && !BHA[player.bh.characters[2].skills[0].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[2].skills[0].cooldown.sub(player.bh.characters[2].skills[0].cooldownMax)) + "/" + formatTime(player.bh.characters[2].skills[0].cooldownMax) + "]"
                }
                if (player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[2].skills[0].id].description, BHA[player.bh.characters[2].skills[0].id])},
            canClick() {
                return player.bh.characters[2].health.gt(0) && player.bh.characters[2].skills[0].id != "none" &&
                    !BHA[player.bh.characters[2].skills[0].id].passive && player.bh.characters[2].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[2].skills[0].id].conditional || BHA[player.bh.characters[2].skills[0].id].conditional(2, 0))
            },
            unlocked() {return player.bh.characters[2].skills[0].cooldown.gte(player.bh.characters[2].skills[0].cooldownMax) || player.bh.characters[2].skills[0].id == "none" || BHA[player.bh.characters[2].skills[0].id].passive},
            onClick() {
                if (BHA[player.bh.characters[2].skills[0].id].instant) {
                    bhAction(2, 0)
                }
                if (BHA[player.bh.characters[2].skills[0].id].active) {
                    player.bh.characters[2].skills[0].cooldown = new Decimal(0)
                    player.bh.characters[2].skills[0].duration = BHA[player.bh.characters[2].skills[0].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[2].skills[0].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[2].skills[0].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[2].skills[0].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C2-Skill-1": {
            title() {
                if (player.bh.characters[2].skills[1].id == "none") return ""
                let str = BHA[player.bh.characters[2].skills[1].id].name
                if (player.bh.characters[2].skills[1].auto && player.bh.characters[2].skills[1].id != "none" && !BHA[player.bh.characters[2].skills[1].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[2].skills[1].cooldown.sub(player.bh.characters[2].skills[1].cooldownMax)) + "/" + formatTime(player.bh.characters[2].skills[1].cooldownMax) + "]"
                }
                if (player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[2].skills[1].id].description, BHA[player.bh.characters[2].skills[1].id])},
            canClick() {
                return player.bh.characters[2].health.gt(0) && player.bh.characters[2].skills[1].id != "none" &&
                    !BHA[player.bh.characters[2].skills[1].id].passive && player.bh.characters[2].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[2].skills[1].id].conditional || BHA[player.bh.characters[2].skills[1].id].conditional(2, 1))
            },
            unlocked() {return player.bh.characters[2].skills[1].cooldown.gte(player.bh.characters[2].skills[1].cooldownMax) || player.bh.characters[2].skills[1].id == "none" || BHA[player.bh.characters[2].skills[1].id].passive},
            onClick() {
                if (BHA[player.bh.characters[2].skills[1].id].instant) {
                    bhAction(2, 1)
                }
                if (BHA[player.bh.characters[2].skills[1].id].active) {
                    player.bh.characters[2].skills[1].cooldown = new Decimal(0)
                    player.bh.characters[2].skills[1].duration = BHA[player.bh.characters[2].skills[1].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[2].skills[1].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[2].skills[1].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[2].skills[1].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C2-Skill-2": {
            title() {
                if (player.bh.characters[2].skills[2].id == "none") return ""
                let str = BHA[player.bh.characters[2].skills[2].id].name
                if (player.bh.characters[2].skills[2].auto && player.bh.characters[2].skills[2].id != "none" && !BHA[player.bh.characters[2].skills[2].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[2].skills[2].cooldown.sub(player.bh.characters[2].skills[2].cooldownMax)) + "/" + formatTime(player.bh.characters[2].skills[2].cooldownMax) + "]"
                }
                if (player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[2].skills[2].id].description, BHA[player.bh.characters[2].skills[2].id])},
            canClick() {
                return player.bh.characters[2].health.gt(0) && player.bh.characters[2].skills[2].id != "none" &&
                    !BHA[player.bh.characters[2].skills[2].id].passive && player.bh.characters[2].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[2].skills[2].id].conditional || BHA[player.bh.characters[2].skills[2].id].conditional(2, 2))
            },
            unlocked() {return player.bh.characters[2].skills[2].cooldown.gte(player.bh.characters[2].skills[2].cooldownMax) || player.bh.characters[2].skills[2].id == "none" || BHA[player.bh.characters[2].skills[2].id].passive},
            onClick() {
                if (BHA[player.bh.characters[2].skills[2].id].instant) {
                    bhAction(2, 2)
                }
                if (BHA[player.bh.characters[2].skills[2].id].active) {
                    player.bh.characters[2].skills[2].cooldown = new Decimal(0)
                    player.bh.characters[2].skills[2].duration = BHA[player.bh.characters[2].skills[2].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[2].skills[2].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[2].skills[2].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[2].skills[2].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C2-Skill-3": {
            title() {
                if (player.bh.characters[2].skills[3].id == "none") return ""
                let str = BHA[player.bh.characters[2].skills[3].id].name
                if (player.bh.characters[2].skills[3].auto && player.bh.characters[2].skills[3].id != "none" && !BHA[player.bh.characters[2].skills[3].id].passive) {
                    str = str + "<br><small style='font-size:10px'>[" + formatTime(player.bh.characters[2].skills[3].cooldown.sub(player.bh.characters[2].skills[3].cooldownMax)) + "/" + formatTime(player.bh.characters[2].skills[3].cooldownMax) + "]"
                }
                if (player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
            tooltip() {return run(BHA[player.bh.characters[2].skills[3].id].description, BHA[player.bh.characters[2].skills[3].id])},
            canClick() {
                return player.bh.characters[2].health.gt(0) && player.bh.characters[2].skills[3].id != "none" &&
                    !BHA[player.bh.characters[2].skills[3].id].passive && player.bh.characters[2].stun[1].lte(0) &&
                    (!BHA[player.bh.characters[2].skills[3].id].conditional || BHA[player.bh.characters[2].skills[3].id].conditional(2, 3))
            },
            unlocked() {return player.bh.characters[2].skills[3].cooldown.gte(player.bh.characters[2].skills[3].cooldownMax) || player.bh.characters[2].skills[3].id == "none" || BHA[player.bh.characters[2].skills[3].id].passive},
            onClick() {
                if (BHA[player.bh.characters[2].skills[3].id].instant) {
                    bhAction(2, 3)
                }
                if (BHA[player.bh.characters[2].skills[3].id].active) {
                    player.bh.characters[2].skills[3].cooldown = new Decimal(0)
                    player.bh.characters[2].skills[3].duration = BHA[player.bh.characters[2].skills[3].id].duration
                }
            },
            style() {
                let passive = BHA[player.bh.characters[2].skills[3].id].passive
                let look = {width: "100px", minHeight: "100px", background: "#361e1e", color: "white", borderRadius: "15px"}
                if (player.bh.characters[2].skills[3].duration.gt(0)) {look.minHeight = "50px";look.borderRadius = "15px 15px 0 0"}
                if (this.canClick() || passive) look.background = BHP[BHA[player.bh.characters[2].skills[3].id].char].color
                if (passive) look.backgroundImage = "linear-gradient(rgba(0,0,0,0.5))"
                return look
            },
        },
        "C0-Auto-S0": {
            title: "Auto<br>S1",
            canClick() {return player.bh.characters[0].skills[0].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[0].skills[0].auto) {
                    player.bh.characters[0].skills[0].auto = false
                } else {
                    player.bh.characters[0].skills[0].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[0].skills[0].id].char].color
                if (!player.bh.characters[0].skills[0].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C0-Auto-S1": {
            title: "Auto<br>S2",
            canClick() {return player.bh.characters[0].skills[1].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[0].skills[1].auto) {
                    player.bh.characters[0].skills[1].auto = false
                } else {
                    player.bh.characters[0].skills[1].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[0].skills[1].id].char].color
                if (!player.bh.characters[0].skills[1].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C0-Auto-S2": {
            title: "Auto<br>S3",
            canClick() {return player.bh.characters[0].skills[2].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[0].skills[2].auto) {
                    player.bh.characters[0].skills[2].auto = false
                } else {
                    player.bh.characters[0].skills[2].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[0].skills[2].id].char].color
                if (!player.bh.characters[0].skills[2].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C0-Auto-S3": {
            title: "Auto<br>S4",
            canClick() {return player.bh.characters[0].skills[3].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[0].skills[3].auto) {
                    player.bh.characters[0].skills[3].auto = false
                } else {
                    player.bh.characters[0].skills[3].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[0].skills[3].id].char].color
                if (!player.bh.characters[0].skills[3].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C1-Auto-S0": {
            title: "Auto<br>S1",
            canClick() {return player.bh.characters[1].skills[0].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[1].skills[0].auto) {
                    player.bh.characters[1].skills[0].auto = false
                } else {
                    player.bh.characters[1].skills[0].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[1].skills[0].id].char].color
                if (!player.bh.characters[1].skills[0].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C1-Auto-S1": {
            title: "Auto<br>S2",
            canClick() {return player.bh.characters[1].skills[1].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[1].skills[1].auto) {
                    player.bh.characters[1].skills[1].auto = false
                } else {
                    player.bh.characters[1].skills[1].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[1].skills[1].id].char].color
                if (!player.bh.characters[1].skills[1].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C1-Auto-S2": {
            title: "Auto<br>S3",
            canClick() {return player.bh.characters[1].skills[2].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[1].skills[2].auto) {
                    player.bh.characters[1].skills[2].auto = false
                } else {
                    player.bh.characters[1].skills[2].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[1].skills[2].id].char].color
                if (!player.bh.characters[1].skills[2].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C1-Auto-S3": {
            title: "Auto<br>S4",
            canClick() {return player.bh.characters[1].skills[3].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[1].skills[3].auto) {
                    player.bh.characters[1].skills[3].auto = false
                } else {
                    player.bh.characters[1].skills[3].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[1].skills[3].id].char].color
                if (!player.bh.characters[1].skills[3].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C2-Auto-S0": {
            title: "Auto<br>S1",
            canClick() {return player.bh.characters[2].skills[0].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[2].skills[0].auto) {
                    player.bh.characters[2].skills[0].auto = false
                } else {
                    player.bh.characters[2].skills[0].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[2].skills[0].id].char].color
                if (!player.bh.characters[2].skills[0].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C2-Auto-S1": {
            title: "Auto<br>S2",
            canClick() {return player.bh.characters[2].skills[1].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[2].skills[1].auto) {
                    player.bh.characters[2].skills[1].auto = false
                } else {
                    player.bh.characters[2].skills[1].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[2].skills[1].id].char].color
                if (!player.bh.characters[2].skills[1].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C2-Auto-S2": {
            title: "Auto<br>S3",
            canClick() {return player.bh.characters[2].skills[2].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[2].skills[2].auto) {
                    player.bh.characters[2].skills[2].auto = false
                } else {
                    player.bh.characters[2].skills[2].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[2].skills[2].id].char].color
                if (!player.bh.characters[2].skills[2].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "C2-Auto-S3": {
            title: "Auto<br>S4",
            canClick() {return player.bh.characters[2].skills[3].id != "none"},
            unlocked: true,
            onClick() {
                if (player.bh.characters[2].skills[3].auto) {
                    player.bh.characters[2].skills[3].auto = false
                } else {
                    player.bh.characters[2].skills[3].auto = true
                }
            },
            style() {
                let look = {width: "50px", minHeight: "30px", color: "white", fontSize: "8px", lineHeight: "1", background: "#340000", borderRadius: "10px"}
                look.background = BHP[BHA[player.bh.characters[2].skills[3].id].char].color
                if (!player.bh.characters[2].skills[3].auto) look.filter = "brightness(50%)"
                return look
            },
        },
        "Celestialite-Icon": {
            title() {
                if (BHC[player.bh.celestialite.id].icon) {
                    return "<img src='" + BHC[player.bh.celestialite.id].icon + "'style='width:149px;height:149px;margin-left:-1.5px;margin-bottom:-6px'></img>"
                } else {
                    return BHC[player.bh.celestialite.id].symbol
                }
            },
            canClick: false,
            unlocked: true,
            onClick() {},
            style() {
                if (BHC[player.bh.celestialite.id].icon) return {width: "150px", minHeight: "150px", color: "white", backgroundColor: "transparent", margin: "10px", padding: "0", cursor: "default", userSelect: "none"}
                let look = {width: "150px", minHeight: "150px", color: "white", fontSize: "75px", backgroundColor: "transparent", border: "6px solid", padding: "0", borderRadius: "0", cursor: "default", userSelect: "none"}
                if (BHC[player.bh.celestialite.id].style) look = Object.assign({}, look, BHC[player.bh.celestialite.id].style)
                return look
            },
        },
        "Char-C0-Icon": {
            title() {
                return "<img src='" + BHP[player.bh.characters[0].id].icon + "'style='width:100px;height:100px;margin-left:-2px;margin-bottom:-4px'></img>"
            },
            canClick() {return player.subtabs["bh"]["party"] == "characters"},
            unlocked: true,
            onClick() {
                player.bh.inputCharSelection = 0
            },
            style: {width: "100px", minHeight: "100px", color: "white", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"},
        },
        "Char-C0-S0": {
            title() {
                if (player.bh.characters[0].skills[0].id == "none") return ""
                return BHA[player.bh.characters[0].skills[0].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[0].skills[0].id].description, BHA[player.bh.characters[0].skills[0].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 0
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[0].skills[0].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[0].skills[0].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C0-S1": {
            title() {
                if (player.bh.characters[0].skills[1].id == "none") return ""
                return BHA[player.bh.characters[0].skills[1].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[0].skills[1].id].description, BHA[player.bh.characters[0].skills[1].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 1
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[0].skills[1].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[0].skills[1].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C0-S2": {
            title() {
                if (player.bh.characters[0].skills[2].id == "none") return ""
                return BHA[player.bh.characters[0].skills[2].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[0].skills[2].id].description, BHA[player.bh.characters[0].skills[2].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 2
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[0].skills[2].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[0].skills[2].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C0-S3": {
            title() {
                if (player.bh.characters[0].skills[3].id == "none") return ""
                return BHA[player.bh.characters[0].skills[3].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[0].skills[3].id].description, BHA[player.bh.characters[0].skills[3].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 3
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[0].skills[3].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[0].skills[3].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C0-Page": {
            title: "???",
            canClick: false,
            unlocked: true,
            onClick() {
                if (player.bh.characters[0].page == 0) {
                    player.bh.characters[0].page = 1
                } else {
                    player.bh.characters[0].page = 0
                }
            },
            style: {width: "148px", minHeight: "26px", color: "var(--textColor)", background: "var(--miscButton)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "10px"},
        },
        "Char-C1-Icon": {
            title() {
                return "<img src='" + BHP[player.bh.characters[1].id].icon + "'style='width:100px;height:100px;margin-left:-2px;margin-bottom:-4px'></img>"
            },
            canClick() {return player.subtabs["bh"]["party"] == "characters"},
            unlocked: true,
            onClick() {
                player.bh.inputCharSelection = 1
            },
            style: {width: "100px", minHeight: "100px", color: "white", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"},
        },
        "Char-C1-S0": {
            title() {
                if (player.bh.characters[1].skills[0].id == "none") return ""
                return BHA[player.bh.characters[1].skills[0].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[1].skills[0].id].description, BHA[player.bh.characters[1].skills[0].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 4
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[1].skills[0].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[1].skills[0].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C1-S1": {
            title() {
                if (player.bh.characters[1].skills[1].id == "none") return ""
                return BHA[player.bh.characters[1].skills[1].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[1].skills[1].id].description, BHA[player.bh.characters[1].skills[1].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 5
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[1].skills[1].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[1].skills[1].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C1-S2": {
            title() {
                if (player.bh.characters[1].skills[2].id == "none") return ""
                return BHA[player.bh.characters[1].skills[2].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[1].skills[2].id].description, BHA[player.bh.characters[1].skills[2].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 6
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[1].skills[2].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[1].skills[2].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C1-S3": {
            title() {
                if (player.bh.characters[1].skills[3].id == "none") return ""
                return BHA[player.bh.characters[1].skills[3].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[1].skills[3].id].description, BHA[player.bh.characters[1].skills[3].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 7
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[1].skills[3].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[1].skills[3].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C1-Page": {
            title: "???",
            canClick: false,
            unlocked: true,
            onClick() {
                if (player.bh.characters[1].page == 0) {
                    player.bh.characters[1].page = 1
                } else {
                    player.bh.characters[1].page = 0
                }
            },
            style: {width: "148px", minHeight: "26px", color: "var(--textColor)", background: "var(--miscButton)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "10px"},
        },
        "Char-C2-Icon": {
            title() {
                return "<img src='" + BHP[player.bh.characters[2].id].icon + "'style='width:100px;height:100px;margin-left:-2px;margin-bottom:-4px'></img>"
            },
            canClick() {return player.subtabs["bh"]["party"] == "characters"},
            unlocked: true,
            onClick() {
                player.bh.inputCharSelection = 2
            },
            style: {width: "100px", minHeight: "100px", color: "white", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"},
        },
        "Char-C2-S0": {
            title() {
                if (player.bh.characters[2].skills[0].id == "none") return ""
                return BHA[player.bh.characters[2].skills[0].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[2].skills[0].id].description, BHA[player.bh.characters[2].skills[0].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 8
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[2].skills[0].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[2].skills[0].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C2-S1": {
            title() {
                if (player.bh.characters[2].skills[1].id == "none") return ""
                return BHA[player.bh.characters[2].skills[1].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[2].skills[1].id].description, BHA[player.bh.characters[2].skills[1].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 9
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[2].skills[1].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[2].skills[1].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C2-S2": {
            title() {
                if (player.bh.characters[2].skills[2].id == "none") return ""
                return BHA[player.bh.characters[2].skills[2].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[2].skills[2].id].description, BHA[player.bh.characters[2].skills[2].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 10
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[2].skills[2].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[2].skills[2].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C2-S3": {
            title() {
                if (player.bh.characters[2].skills[3].id == "none") return ""
                return BHA[player.bh.characters[2].skills[3].id].name
            },
            tooltip() {return run(BHA[player.bh.characters[2].skills[3].id].description, BHA[player.bh.characters[2].skills[3].id])},
            canClick() {return player.subtabs["bh"]["party"] == "skills"},
            unlocked: true,
            onClick() {
                player.bh.inputSkillSelection = 11
            },
            style() {
                let look = {width: "45px", minHeight: "45px", color: "white", fontSize: "5px", backgroundColor: "transparent", padding: "0", cursor: "default", userSelect: "none", borderRadius: "0"}
                player.bh.characters[2].skills[3].id != "none" ? look.backgroundColor = BHP[BHA[player.bh.characters[2].skills[3].id].char].color : look.backgroundColor = "#333"
                return look
            },
        },
        "Char-C2-Page": {
            title: "???",
            canClick: false,
            unlocked: true,
            onClick() {
                if (player.bh.characters[2].page == 0) {
                    player.bh.characters[2].page = 1
                } else {
                    player.bh.characters[2].page = 0
                }
            },
            style: {width: "148px", minHeight: "26px", color: "var(--textColor)", background: "var(--miscButton)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "10px"},
        },
        "Select-Character": {
            title() {return player.bh.characterData[player.bh.characterSelection].selected ? "Unselect Character" : "Select Character"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.bh.characterData[player.bh.characterSelection].selected) {
                    player.bh.characterData[player.bh.characterSelection].selected = false
                    for (let i = 0; i < 3; i++) {
                        if (player.bh.characters[i].id == player.bh.characterSelection) {
                            player.bh.characters[i].id = "none"
                            for (let j = 0; j < 4; j++) {
                                player.bh.characters[i].skills[j].id = "none"
                            }
                        }
                    }
                } else {
                    if (player.bh.characters[player.bh.inputCharSelection].id != "none") player.bh.characterData[player.bh.characters[player.bh.inputCharSelection].id].selected = false
                    player.bh.characters[player.bh.inputCharSelection].id = player.bh.characterSelection

                    player.bh.characterData[player.bh.characterSelection].selected = true
                    for (let i = 0; i < 4; i++) {
                        player.bh.characters[player.bh.inputCharSelection].skills[i].id = player.bh.characterData[player.bh.characterSelection].skills[i]
                    }
                }
            },
            style() {
                let look = {width: "340px", minHeight: "40px", color: "var(--textColor)", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                !player.bh.characterData[player.bh.characterSelection].selected ? look.backgroundColor = "var(--miscButtonHover)" : look.backgroundColor = "var(--miscButton)"
                return look
            },
        },
        "Char-Kres": {
            title() {return "<img src='" + BHP["kres"].icon + "'style='width:100px;height:100px;margin-left:-2px;margin-bottom:-4px'></img>"},
            canClick: true,
            unlocked: true,
            onClick() {
                player.bh.characterSelection = "kres"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", background: "transparent", padding: "0", borderRadius: "0", margin: "2px"}
                if (player.bh.characterData.kres.selected) look.filter = "brightness(50%)"
                return look
            },
        },
        "Char-Nav": {
            title() {return "<img src='" + BHP["nav"].icon + "'style='width:100px;height:100px;margin-left:-2px;margin-bottom:-4px'></img>"},
            canClick: true,
            unlocked: true,
            onClick() {
                player.bh.characterSelection = "nav"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", background: "transparent", padding: "0", borderRadius: "0", margin: "2px"}
                if (player.bh.characterData.nav.selected) look.filter = "brightness(50%)"
                return look
            },
        },
        "Char-Sel": {
            title() {return "<img src='" + BHP["sel"].icon + "'style='width:100px;height:100px;margin-left:-2px;margin-bottom:-4px'></img>"},
            canClick: true,
            unlocked: true,
            onClick() {
                player.bh.characterSelection = "sel"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", background: "transparent", padding: "0", borderRadius: "0", margin: "2px"}
                if (player.bh.characterData.sel.selected) look.filter = "brightness(50%)"
                return look
            },
        },
        "Char-Eclipse": {
            title() {return "<img src='" + BHP["eclipse"].icon + "'style='width:100px;height:100px;margin-left:-2px;margin-bottom:-4px'></img>"},
            canClick: true,
            unlocked() {return getLevelableAmount("pet", 501).gt(0)},
            onClick() {
                player.bh.characterSelection = "eclipse"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", background: "transparent", padding: "0", borderRadius: "0", margin: "2px"}
                if (player.bh.characterData.eclipse.selected) look.filter = "brightness(50%)"
                return look
            },
        },
        "Char-Geroa": {
            title() {return "<img src='" + BHP["geroa"].icon + "'style='width:100px;height:100px;margin-left:-2px;margin-bottom:-4px'></img>"},
            canClick: true,
            unlocked() {return getLevelableAmount("pet", 502).gt(0)},
            onClick() {
                player.bh.characterSelection = "geroa"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", background: "transparent", padding: "0", borderRadius: "0", margin: "2px"}
                if (player.bh.characterData.geroa.selected) look.filter = "brightness(50%)"
                return look
            },
        },
        "Skill-Equip": {
            title() {return player.bh.skillData[player.bh.skillSelection].selected[0] != "none" ? "Unequip Skill" : "Equip Skill"},
            canClick() {
                let skillsel = player.bh.skillData[player.bh.skillSelection]
                let inputchar = player.bh.characters[Math.floor(player.bh.inputSkillSelection/4)].id
                let oldSkillName = player.bh.characters[Math.floor(player.bh.inputSkillSelection/4)].skills[player.bh.inputSkillSelection%4].id
                if (inputchar == "none") return false // Set false if input character is none
                if (skillsel.selected[0] != "none") return true // Set true if skill is already equipped
                if (BHA[player.bh.skillSelection].char != "general" && BHA[player.bh.skillSelection].char != inputchar) return false // Set false if skill isn't equippable by character
                let baseCost = Decimal.sumArithmeticSeries(player.bh.skillData[player.bh.skillSelection].level, 1, 1, 0).mul(Decimal.add(1, BHA[player.bh.skillSelection].spCost.div(5).floor())).add(BHA[player.bh.skillSelection].spCost)
                if (oldSkillName != "none") { // If there is already a skill equipped, subtract its cost from the current skills cost
                    let oldCost = Decimal.sumArithmeticSeries(player.bh.skillData[oldSkillName].level, 1, 1, 0).mul(Decimal.add(1, BHA[oldSkillName].spCost.div(5).floor())).add(BHA[oldSkillName].spCost)
                    baseCost = baseCost.sub(oldCost)
                }
                return player.bh.maxSkillPoints.sub(player.bh.characterData[inputchar].usedSP).gte(baseCost) // Compare skill cost to SP left, and if you have enough, return true
            },
            unlocked: true,
            onClick() {
                let spCost = Decimal.sumArithmeticSeries(player.bh.skillData[player.bh.skillSelection].level, 1, 1, 0).mul(Decimal.add(1, BHA[player.bh.skillSelection].spCost.div(5).floor())).add(BHA[player.bh.skillSelection].spCost)
                let currChar = player.bh.skillData[player.bh.skillSelection].selected[0]
                let currSkill = player.bh.skillData[player.bh.skillSelection].selected[1]
                let pastChar = Math.floor(player.bh.inputSkillSelection/4)
                let pastSkill = player.bh.inputSkillSelection%4
                if (player.bh.skillData[player.bh.skillSelection].selected[0] != "none") { // If skill is selected
                    player.bh.skillData[player.bh.skillSelection].selected = ["none", 0] // Unselect skill
                    for (let i = 0; i < 3; i++) { // If character is currently equipped, unequip the skill from it
                        if (player.bh.characters[i].id == currChar) {
                            for (let j = 0; j < 4; j++) {
                                if (player.bh.characters[i].skills[j].id == player.bh.skillSelection) player.bh.characters[i].skills[j].id = "none"
                            }
                        }
                    }
                    player.bh.characterData[currChar].usedSP = player.bh.characterData[currChar].usedSP.sub(spCost) // Give back SP from that equipped skill
                    player.bh.characterData[currChar].skills[currSkill] = "none" // Unequip skill from stored skill data
                } else {
                    if (player.bh.characters[pastChar].skills[pastSkill].id != "none") { // If there is an old skill, remove the old one
                        let pastSkillName = player.bh.characters[pastChar].skills[pastSkill].id
                        let pastSkillCost = Decimal.sumArithmeticSeries(player.bh.skillData[pastSkillName].level, 1, 1, 0).mul(Decimal.add(1, BHA[pastSkillName].spCost.div(5).floor())).add(BHA[pastSkillName].spCost)
                        player.bh.skillData[pastSkillName].selected = ["none", 0] // Unselect old skill
                        player.bh.characterData[player.bh.characters[pastChar].id].usedSP = player.bh.characterData[player.bh.characters[pastChar].id].usedSP.sub(pastSkillCost) // Give back SP from old skill
                        player.bh.characterData[player.bh.characters[pastChar].id].skills[pastSkill] = "none" // Unequip old skill from stored character data
                    }
                    player.bh.skillData[player.bh.skillSelection].selected = [player.bh.characters[pastChar].id, pastSkill] // Equip new skill
                    player.bh.characters[pastChar].skills[pastSkill].id = player.bh.skillSelection // Equip new skill to character
                    player.bh.characterData[player.bh.characters[pastChar].id].usedSP = player.bh.characterData[player.bh.characters[pastChar].id].usedSP.add(spCost) // Subtract SP cost for that character
                    player.bh.characterData[player.bh.characters[pastChar].id].skills[pastSkill] = player.bh.skillSelection // Equip skill to character data
                }
            },
            style() {
                let look = {width: "110px", minHeight: "40px", color: "var(--textColor)", fontSize: "9px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                player.bh.skillData[player.bh.skillSelection].selected[0] != "none" ? look.backgroundColor = "var(--miscButton)" : this.canClick() ? look.backgroundColor = "var(--miscButtonHover)" : look.backgroundColor = "var(--miscButtonDisable)"
                return look
            },
        },
        "Skill-Buy-Level": {
            title: "Increase<br>Level Cap",
            canClick() {
                let cost = BHA[player.bh.skillSelection].curCostScale.pow(player.bh.skillData[player.bh.skillSelection].maxLevel).mul(BHA[player.bh.skillSelection].curCostBase).div(player.bh.skillCostDiv).floor()
                return player[BH_CURRENCY[BHA[player.bh.skillSelection].currency][1]][BHA[player.bh.skillSelection].currency].gte(cost)
            },
            unlocked: true,
            onClick() {
                let cost = BHA[player.bh.skillSelection].curCostScale.pow(player.bh.skillData[player.bh.skillSelection].maxLevel).mul(BHA[player.bh.skillSelection].curCostBase).div(player.bh.skillCostDiv).floor()
                player[BH_CURRENCY[BHA[player.bh.skillSelection].currency][1]][BHA[player.bh.skillSelection].currency] = player[BH_CURRENCY[BHA[player.bh.skillSelection].currency][1]][BHA[player.bh.skillSelection].currency].sub(cost)
                player.bh.skillData[player.bh.skillSelection].maxLevel = player.bh.skillData[player.bh.skillSelection].maxLevel.add(1)
            },
            style() {
                let look = {width: "110px", minHeight: "40px", color: "var(--textColor)", fontSize: "9px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                this.canClick() ? look.backgroundColor = "var(--miscButtonHover)" : look.backgroundColor = "var(--miscButtonDisable)"
                return look
            },
        },
        "Skill-Level-Increase": {
            title: "Increase Level",
            canClick() {
                if (player.bh.skillData[player.bh.skillSelection].level.gte(player.bh.skillData[player.bh.skillSelection].maxLevel)) return false
                if (player.bh.skillData[player.bh.skillSelection].selected[0] != "none") {
                    let currChar = player.bh.skillData[player.bh.skillSelection].selected[0]
                    return player.bh.maxSkillPoints.sub(player.bh.characterData[currChar].usedSP).gte(Decimal.add(1, BHA[player.bh.skillSelection].spCost.div(5).floor()).mul(player.bh.skillData[player.bh.skillSelection].level.add(1)))
                }
                return true
            },
            unlocked: true,
            onClick() {
                player.bh.skillData[player.bh.skillSelection].level = player.bh.skillData[player.bh.skillSelection].level.add(1)
                if (player.bh.skillData[player.bh.skillSelection].selected[0] != "none") {
                    let currChar = player.bh.skillData[player.bh.skillSelection].selected[0]
                    player.bh.characterData[currChar].usedSP = player.bh.characterData[currChar].usedSP.add(Decimal.add(1, BHA[player.bh.skillSelection].spCost.div(5).floor()).mul(player.bh.skillData[player.bh.skillSelection].level))
                }
                
            },
            style() {
                let look = {width: "78px", minHeight: "40px", color: "var(--textColor)", fontSize: "9px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                this.canClick() ? look.backgroundColor = "var(--miscButtonHover)" : look.backgroundColor = "var(--miscButtonDisable)"
                return look
            },
        },
        "Skill-Level-Decrease": {
            title: "Decrease Level",
            canClick() {
                return player.bh.skillData[player.bh.skillSelection].level.gt(0)
            },
            unlocked: true,
            onClick() {
                player.bh.skillData[player.bh.skillSelection].level = player.bh.skillData[player.bh.skillSelection].level.sub(1)
                if (player.bh.skillData[player.bh.skillSelection].selected[0] != "none") {
                    let currChar = player.bh.skillData[player.bh.skillSelection].selected[0]
                    player.bh.characterData[currChar].usedSP = player.bh.characterData[currChar].usedSP.sub(Decimal.add(1, BHA[player.bh.skillSelection].spCost.div(5).floor()).mul(player.bh.skillData[player.bh.skillSelection].level.add(1)))
                }
            },
            style() {
                let look = {width: "77px", minHeight: "40px", color: "var(--textColor)", fontSize: "9px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                this.canClick() ? look.backgroundColor = "var(--miscButtonHover)" : look.backgroundColor = "var(--miscButtonDisable)"
                return look
            },
        },
    },
    bars: {
        "celestialite-Health": {
            unlocked: true,
            direction: RIGHT,
            width: 250,
            height: 40,
            progress() {
                if (player.bh.celestialite.id == "none") return player.bh.respawnTimer.div(player.bh.respawnMax)
                return player.bh.celestialite.health.div(player.bh.celestialite.maxHealth)
            },
            borderStyle: {border: "2px solid white", borderRadius: "15px", margin: "-1px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.celestialite.stun[1].gt(0)) {
                    if (player.bh.celestialite.stun[0] == "hard") return {backgroundColor: "#393a0d"}
                    return {backgroundColor: "#73741A"}
                }
                return {backgroundColor: "#8a0e79"}
            },
            textStyle: {userSelect: "none", lineHeight: "1"},
            display() {
                if (player.bh.celestialite.id == "none") return "<h5>" + formatTime(player.bh.respawnTimer) + "/" + formatTime(player.bh.respawnMax)
                let str = "<h5>" + format(player.bh.celestialite.health) + "/" + format(player.bh.celestialite.maxHealth) + " HP"
                if (player.bh.celestialite.shield.gt(0)) str = str + " [⛊" + formatWhole(player.bh.celestialite.shield) + "]"
                if (player.bh.celestialite.stun[1].gt(0)) str = str + "<br>[Stunned for " + formatTime(player.bh.celestialite.stun[1]) + "]"
                return str
            },
        },
        "celestialite-A0": {
            unlocked() { return player.bh.celestialite.id != "none" && BHC[player.bh.celestialite.id].actions[0] },
            direction: RIGHT,
            width: 125,
            height() { return player.bh.celestialite.actions[0].duration.gt(0) ? 25 : 40 },
            progress() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[0]) return new Decimal(0)
                if (BHC[player.bh.celestialite.id].actions[0].passive) return new Decimal(1)
                return player.bh.celestialite.actions[0].cooldown.div(BHC[player.bh.celestialite.id].actions[0].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))
            },
            borderStyle() {return player.bh.celestialite.actions[0].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if ((BHC[player.bh.celestialite.id].actions[0] && BHC[player.bh.celestialite.id].actions[0].passive) || player.bh.celestialite.stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: "#8a0e79"}
            },
            textStyle() {return player.bh.celestialite.actions[0].duration.gt(0) ? {userSelect: "none", lineHeight: "1", fontSize: "12px"} : {userSelect: "none", lineHeight: "1"}},
            display() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[0]) return ""
                let str = "<h5>" + BHC[player.bh.celestialite.id].actions[0].name + "<br>" + formatTime(player.bh.celestialite.actions[0].cooldown) + "/" + formatTime(BHC[player.bh.celestialite.id].actions[0].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))
                if (BHC[player.bh.celestialite.id].actions[0].passive) str = "<h5>" + BHC[player.bh.celestialite.id].actions[0].name + "<br>[PASSIVE]"
                if ((!BHC[player.bh.celestialite.id].actions[0].passive || player.bh.celestialite.stun[0] == "hard") && player.bh.celestialite.stun[1].gt(0)) str = str + "<br><p style='font-size:8px'>[STUNNED]"
                return str
            },
        },
        "celestialite-A0-duration": {
            unlocked() {return player.bh.celestialite.actions[0].duration.gt(0)},
            direction: RIGHT,
            width: 125,
            height: 13,
            progress() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[0] || !BHC[player.bh.celestialite.id].actions[0].duration) return new Decimal(0)
                return player.bh.celestialite.actions[0].duration.div(BHC[player.bh.celestialite.id].actions[0].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.celestialite.stun[0] == "hard" && player.bh.celestialite.stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: "#8a0e79"}
            },
            textStyle: {userSelect: "none", lineHeight: "1", fontSize: "10px"},
            display() {
                if (!BHC[player.bh.celestialite.id].actions[0].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.celestialite.actions[0].duration) + "/" + formatTime(BHC[player.bh.celestialite.id].actions[0].duration)
                if (player.bh.celestialite.stun[0] == "hard" && player.bh.celestialite.stun[1].gt(0)) str = str + "<br><p style='font-size:8px'>[STUNNED]"
                return str
            },
        },
        "celestialite-A1": {
            unlocked() { return player.bh.celestialite.id != "none" && BHC[player.bh.celestialite.id].actions[1] },
            direction: RIGHT,
            width: 125,
            height() { return player.bh.celestialite.actions[1].duration.gt(0) ? 25 : 40 },
            progress() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[1]) return new Decimal(0)
                if (BHC[player.bh.celestialite.id].actions[1].passive) return new Decimal(1)
                return player.bh.celestialite.actions[1].cooldown.div(BHC[player.bh.celestialite.id].actions[1].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))
            },
            borderStyle() {return player.bh.celestialite.actions[1].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if ((BHC[player.bh.celestialite.id].actions[1] && BHC[player.bh.celestialite.id].actions[1].passive) || player.bh.celestialite.stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: "#8a0e79"}
            },
            textStyle() {return player.bh.celestialite.actions[1].duration.gt(0) ? {userSelect: "none", lineHeight: "1", fontSize: "12px"} : {userSelect: "none", lineHeight: "1"}},
            display() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[1]) return ""
                let str = "<h5>" + BHC[player.bh.celestialite.id].actions[1].name + "<br>" + formatTime(player.bh.celestialite.actions[1].cooldown) + "/" + formatTime(BHC[player.bh.celestialite.id].actions[1].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))
                if (BHC[player.bh.celestialite.id].actions[1].passive) str = "<h5>" + BHC[player.bh.celestialite.id].actions[1].name + "<br>[PASSIVE]"
                if ((!BHC[player.bh.celestialite.id].actions[1].passive || player.bh.celestialite.stun[0] == "hard") && player.bh.celestialite.stun[1].gt(0)) str = str + "<br><p style='font-size:8px'>[STUNNED]"
                return str
            },
        },
        "celestialite-A1-duration": {
            unlocked() {return player.bh.celestialite.actions[1].duration.gt(0)},
            direction: RIGHT,
            width: 125,
            height: 13,
            progress() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[1] || !BHC[player.bh.celestialite.id].actions[1].duration) return new Decimal(0)
                return player.bh.celestialite.actions[1].duration.div(BHC[player.bh.celestialite.id].actions[1].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.celestialite.stun[0] == "hard" && player.bh.celestialite.stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: "#8a0e79"}
            },
            textStyle: {userSelect: "none", lineHeight: "1", fontSize: "10px"},
            display() {
                if (!BHC[player.bh.celestialite.id].actions[1].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.celestialite.actions[1].duration) + "/" + formatTime(BHC[player.bh.celestialite.id].actions[1].duration)
                if (player.bh.celestialite.stun[0] == "hard" && player.bh.celestialite.stun[1].gt(0)) str = str + "<br><p style='font-size:8px'>[STUNNED]"
                return str
            },
        },
        "celestialite-A2": {
            unlocked() { return player.bh.celestialite.id != "none" && BHC[player.bh.celestialite.id].actions[2] },
            direction: RIGHT,
            width: 125,
            height() { return player.bh.celestialite.actions[2].duration.gt(0) ? 25 : 40 },
            progress() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[2]) return new Decimal(0)
                if (BHC[player.bh.celestialite.id].actions[2].passive) return new Decimal(1)
                return player.bh.celestialite.actions[2].cooldown.div(BHC[player.bh.celestialite.id].actions[2].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))
            },
            borderStyle() {return player.bh.celestialite.actions[2].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if ((BHC[player.bh.celestialite.id].actions[2] && BHC[player.bh.celestialite.id].actions[2].passive) || player.bh.celestialite.stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: "#8a0e79"}
            },
            textStyle() {return player.bh.celestialite.actions[2].duration.gt(0) ? {userSelect: "none", lineHeight: "1", fontSize: "12px"} : {userSelect: "none", lineHeight: "1"}},
            display() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[2]) return ""
                let str = "<h5>" + BHC[player.bh.celestialite.id].actions[2].name + "<br>" + formatTime(player.bh.celestialite.actions[2].cooldown) + "/" + formatTime(BHC[player.bh.celestialite.id].actions[2].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))
                if (BHC[player.bh.celestialite.id].actions[2].passive) str = "<h5>" + BHC[player.bh.celestialite.id].actions[2].name + "<br>[PASSIVE]"
                if ((!BHC[player.bh.celestialite.id].actions[2].passive || player.bh.celestialite.stun[0] == "hard") && player.bh.celestialite.stun[1].gt(0)) str = str + "<br><p style='font-size:8px'>[STUNNED]"
                return str
            },
        },
        "celestialite-A2-duration": {
            unlocked() {return player.bh.celestialite.actions[2].duration.gt(0)},
            direction: RIGHT,
            width: 125,
            height: 13,
            progress() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[2] || !BHC[player.bh.celestialite.id].actions[2].duration) return new Decimal(0)
                return player.bh.celestialite.actions[2].duration.div(BHC[player.bh.celestialite.id].actions[2].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.celestialite.stun[0] == "hard" && player.bh.celestialite.stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: "#8a0e79"}
            },
            textStyle: {userSelect: "none", lineHeight: "1", fontSize: "10px"},
            display() {
                if (!BHC[player.bh.celestialite.id].actions[2].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.celestialite.actions[2].duration) + "/" + formatTime(BHC[player.bh.celestialite.id].actions[2].duration)
                if (player.bh.celestialite.stun[0] == "hard" && player.bh.celestialite.stun[1].gt(0)) str = str + "<br><p style='font-size:8px'>[STUNNED]"
                return str
            },
        },
        "celestialite-A3": {
            unlocked() { return player.bh.celestialite.id != "none" && BHC[player.bh.celestialite.id].actions[3] },
            direction: RIGHT,
            width: 125,
            height() { return player.bh.celestialite.actions[3].duration.gt(0) ? 25 : 40 },
            progress() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[3]) return new Decimal(0)
                if (BHC[player.bh.celestialite.id].actions[3].passive) return new Decimal(1)
                return player.bh.celestialite.actions[3].cooldown.div(BHC[player.bh.celestialite.id].actions[3].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))
            },
            borderStyle() {return player.bh.celestialite.actions[3].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if ((BHC[player.bh.celestialite.id].actions[3] && BHC[player.bh.celestialite.id].actions[3].passive) || player.bh.celestialite.stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: "#8a0e79"}
            },
            textStyle() {return player.bh.celestialite.actions[3].duration.gt(0) ? {userSelect: "none", lineHeight: "1", fontSize: "12px"} : {userSelect: "none", lineHeight: "1"}},
            display() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[3]) return ""
                let str = "<h5>" + BHC[player.bh.celestialite.id].actions[3].name + "<br>" + formatTime(player.bh.celestialite.actions[3].cooldown) + "/" + formatTime(BHC[player.bh.celestialite.id].actions[3].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))
                if (BHC[player.bh.celestialite.id].actions[3].passive) str = "<h5>" + BHC[player.bh.celestialite.id].actions[3].name + "<br>[PASSIVE]"
                if ((!BHC[player.bh.celestialite.id].actions[3].passive || player.bh.celestialite.stun[0] == "hard") && player.bh.celestialite.stun[1].gt(0)) str = str + "<br><p style='font-size:8px'>[STUNNED]"
                return str
            },
        },
        "celestialite-A3-duration": {
            unlocked() {return player.bh.celestialite.actions[3].duration.gt(0)},
            direction: RIGHT,
            width: 125,
            height: 13,
            progress() {
                if (!BHC[player.bh.celestialite.id].actions || !BHC[player.bh.celestialite.id].actions[3] || !BHC[player.bh.celestialite.id].actions[3].duration) return new Decimal(0)
                return player.bh.celestialite.actions[3].duration.div(BHC[player.bh.celestialite.id].actions[3].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.celestialite.stun[0] == "hard" && player.bh.celestialite.stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: "#8a0e79"}
            },
            textStyle: {userSelect: "none", lineHeight: "1", fontSize: "10px"},
            display() {
                if (!BHC[player.bh.celestialite.id].actions[3].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.celestialite.actions[3].duration) + "/" + formatTime(BHC[player.bh.celestialite.id].actions[3].duration)
                if (player.bh.celestialite.stun[0] == "hard" && player.bh.celestialite.stun[1].gt(0)) str = str + "<br><p style='font-size:8px'>[STUNNED]"
                return str
            },
        },
        "C0-Health": {
            unlocked: true,
            direction: RIGHT,
            width: 200,
            height: 30,
            progress() {
                if (player.bh.characters[0].maxHealth.lte(0)) return new Decimal(0)
                return player.bh.characters[0].health.div(player.bh.characters[0].maxHealth)
            },
            borderStyle: {border: "2px solid white", borderRadius: "15px", margin: "-1px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[0].stun[1].gt(0)) {
                    if (player.bh.characters[0].stun[0] == "hard") return {backgroundColor: "#393a0d"}
                    return {backgroundColor: "#73741A"}
                }
                return {backgroundColor: "#449353"}
            },
            textStyle: {userSelect: "none", lineHeight: "1"},
            display() {
                if (player.bh.characters[0].id == "none") return ""
                if (player.bh.characters[0].health.lte(0)) return BHP[player.bh.characters[0].id].name + " is dead"
                let str = "<h5>" + formatSimple(player.bh.characters[0].health) + "/" + formatSimple(player.bh.characters[0].maxHealth) + " HP"
                if (player.bh.characters[0].shield.gt(0)) str = str + " [⛊" + formatWhole(player.bh.characters[0].shield) + "]"
                if (player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[Stunned for " + formatTime(player.bh.characters[0].stun[1]) + "]"
                return str
            },
        },
        "C0-S0-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C0-Skill-0"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[0].skills[0].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[0].skills[0].cooldown.div(player.bh.characters[0].skills[0].cooldownMax);
            },
            borderStyle() {return player.bh.characters[0].skills[0].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[0].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[0].skills[0].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[0].skills[0].cooldown) + "/" + formatTime(player.bh.characters[0].skills[0].cooldownMax)
                if (player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C0-S0-Duration": {
            unlocked() {return player.bh.characters[0].skills[0].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[0].skills[0].id].duration) return new Decimal(0)
                return player.bh.characters[0].skills[0].duration.div(BHA[player.bh.characters[0].skills[0].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[0].stun[0] == "hard" && player.bh.characters[0].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[0].skills[0].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[0].skills[0].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[0].skills[0].duration) + "/" + formatTime(BHA[player.bh.characters[0].skills[0].id].duration)
                if (player.bh.characters[0].stun[0] == "hard" && player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C0-S1-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C0-Skill-1"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[0].skills[1].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[0].skills[1].cooldown.div(player.bh.characters[0].skills[1].cooldownMax);
            },
            borderStyle() {return player.bh.characters[0].skills[1].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[0].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[0].skills[1].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[0].skills[1].cooldown) + "/" + formatTime(player.bh.characters[0].skills[1].cooldownMax)
                if (player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C0-S1-Duration": {
            unlocked() {return player.bh.characters[0].skills[1].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[0].skills[1].id].duration) return new Decimal(0)
                return player.bh.characters[0].skills[1].duration.div(BHA[player.bh.characters[0].skills[1].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[0].stun[0] == "hard" && player.bh.characters[0].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[0].skills[1].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[0].skills[1].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[0].skills[1].duration) + "/" + formatTime(BHA[player.bh.characters[0].skills[1].id].duration)
                if (player.bh.characters[0].stun[0] == "hard" && player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C0-S2-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C0-Skill-2"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[0].skills[2].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[0].skills[2].cooldown.div(player.bh.characters[0].skills[2].cooldownMax);
            },
            borderStyle() {return player.bh.characters[0].skills[2].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[0].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[0].skills[2].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[0].skills[2].cooldown) + "/" + formatTime(player.bh.characters[0].skills[2].cooldownMax)
                if (player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C0-S2-Duration": {
            unlocked() {return player.bh.characters[0].skills[2].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[0].skills[2].id].duration) return new Decimal(0)
                return player.bh.characters[0].skills[2].duration.div(BHA[player.bh.characters[0].skills[2].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[0].stun[0] == "hard" && player.bh.characters[0].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[0].skills[2].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[0].skills[2].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[0].skills[2].duration) + "/" + formatTime(BHA[player.bh.characters[0].skills[2].id].duration)
                if (player.bh.characters[0].stun[0] == "hard" && player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C0-S3-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C0-Skill-3"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[0].skills[3].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[0].skills[3].cooldown.div(player.bh.characters[0].skills[3].cooldownMax);
            },
            borderStyle() {return player.bh.characters[0].skills[3].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[0].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[0].skills[3].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[0].skills[3].cooldown) + "/" + formatTime(player.bh.characters[0].skills[3].cooldownMax)
                if (player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C0-S3-Duration": {
            unlocked() {return player.bh.characters[0].skills[3].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[0].skills[3].id].duration) return new Decimal(0)
                return player.bh.characters[0].skills[3].duration.div(BHA[player.bh.characters[0].skills[3].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[0].stun[0] == "hard" && player.bh.characters[0].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[0].skills[3].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[0].skills[3].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[0].skills[3].duration) + "/" + formatTime(BHA[player.bh.characters[0].skills[3].id].duration)
                if (player.bh.characters[0].stun[0] == "hard" && player.bh.characters[0].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C1-Health": {
            unlocked: true,
            direction: RIGHT,
            width: 200,
            height: 30,
            progress() {
                if (player.bh.characters[1].maxHealth.lte(0)) return new Decimal(0)
                return player.bh.characters[1].health.div(player.bh.characters[1].maxHealth)
            },
            borderStyle: {border: "2px solid white", borderRadius: "15px", margin: "-1px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[1].stun[1].gt(0)) {
                    if (player.bh.characters[1].stun[0] == "hard") return {backgroundColor: "#393a0d"}
                    return {backgroundColor: "#73741A"}
                }
                return {backgroundColor: "#449353"}
            },
            textStyle: {userSelect: "none", lineHeight: "1"},
            display() {
                if (player.bh.characters[1].id == "none") return ""
                if (player.bh.characters[1].health.lte(0)) return BHP[player.bh.characters[1].id].name + " is dead"
                let str = "<h5>" + formatSimple(player.bh.characters[1].health) + "/" + formatSimple(player.bh.characters[1].maxHealth) + " HP"
                if (player.bh.characters[1].shield.gt(0)) str = str + " [⛊" + formatWhole(player.bh.characters[1].shield) + "]"
                if (player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[Stunned for " + formatTime(player.bh.characters[1].stun[1]) + "]"
                return str
            },
        },
        "C1-S0-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C1-Skill-0"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[1].skills[0].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[1].skills[0].cooldown.div(player.bh.characters[1].skills[0].cooldownMax);
            },
            borderStyle() {return player.bh.characters[1].skills[0].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[1].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[1].skills[0].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[1].skills[0].cooldown) + "/" + formatTime(player.bh.characters[1].skills[0].cooldownMax)
                if (player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C1-S0-Duration": {
            unlocked() {return player.bh.characters[1].skills[0].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[1].skills[0].id].duration) return new Decimal(0)
                return player.bh.characters[1].skills[0].duration.div(BHA[player.bh.characters[1].skills[0].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[1].stun[0] == "hard" && player.bh.characters[1].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[1].skills[0].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[1].skills[0].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[1].skills[0].duration) + "/" + formatTime(BHA[player.bh.characters[1].skills[0].id].duration)
                if (player.bh.characters[1].stun[0] == "hard" && player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C1-S1-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C1-Skill-1"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[1].skills[1].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[1].skills[1].cooldown.div(player.bh.characters[1].skills[1].cooldownMax);
            },
            borderStyle() {return player.bh.characters[1].skills[1].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[1].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[1].skills[1].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[1].skills[1].cooldown) + "/" + formatTime(player.bh.characters[1].skills[1].cooldownMax)
                if (player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C1-S1-Duration": {
            unlocked() {return player.bh.characters[1].skills[1].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[1].skills[1].id].duration) return new Decimal(0)
                return player.bh.characters[1].skills[1].duration.div(BHA[player.bh.characters[1].skills[1].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[1].stun[0] == "hard" && player.bh.characters[1].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[1].skills[1].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[1].skills[1].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[1].skills[1].duration) + "/" + formatTime(BHA[player.bh.characters[1].skills[1].id].duration)
                if (player.bh.characters[1].stun[0] == "hard" && player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C1-S2-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C1-Skill-2"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[1].skills[2].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[1].skills[2].cooldown.div(player.bh.characters[1].skills[2].cooldownMax);
            },
            borderStyle() {return player.bh.characters[1].skills[2].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[1].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[1].skills[2].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[1].skills[2].cooldown) + "/" + formatTime(player.bh.characters[1].skills[2].cooldownMax)
                if (player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C1-S2-Duration": {
            unlocked() {return player.bh.characters[1].skills[2].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[1].skills[2].id].duration) return new Decimal(0)
                return player.bh.characters[1].skills[2].duration.div(BHA[player.bh.characters[1].skills[2].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[1].stun[0] == "hard" && player.bh.characters[1].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[1].skills[2].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[1].skills[2].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[1].skills[2].duration) + "/" + formatTime(BHA[player.bh.characters[1].skills[2].id].duration)
                if (player.bh.characters[1].stun[0] == "hard" && player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C1-S3-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C1-Skill-3"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[1].skills[3].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[1].skills[3].cooldown.div(player.bh.characters[1].skills[3].cooldownMax);
            },
            borderStyle() {return player.bh.characters[1].skills[3].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[1].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[1].skills[3].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[1].skills[3].cooldown) + "/" + formatTime(player.bh.characters[1].skills[3].cooldownMax)
                if (player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C1-S3-Duration": {
            unlocked() {return player.bh.characters[1].skills[3].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[1].skills[3].id].duration) return new Decimal(0)
                return player.bh.characters[1].skills[3].duration.div(BHA[player.bh.characters[1].skills[3].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[1].stun[0] == "hard" && player.bh.characters[1].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[1].skills[3].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[1].skills[3].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[1].skills[3].duration) + "/" + formatTime(BHA[player.bh.characters[1].skills[3].id].duration)
                if (player.bh.characters[1].stun[0] == "hard" && player.bh.characters[1].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C2-Health": {
            unlocked: true,
            direction: RIGHT,
            width: 200,
            height: 30,
            progress() {
                if (player.bh.characters[2].maxHealth.lte(0)) return new Decimal(0)
                return player.bh.characters[2].health.div(player.bh.characters[2].maxHealth)
            },
            borderStyle: {border: "2px solid white", borderRadius: "15px", margin: "-1px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[2].stun[1].gt(0)) {
                    if (player.bh.characters[2].stun[0] == "hard") return {backgroundColor: "#393a0d"}
                    return {backgroundColor: "#73741A"}
                }
                return {backgroundColor: "#449353"}
            },
            textStyle: {userSelect: "none", lineHeight: "1"},
            display() {
                if (player.bh.characters[2].id == "none") return ""
                if (player.bh.characters[2].health.lte(0)) return BHP[player.bh.characters[2].id].name + " is dead"
                let str = "<h5>" + formatSimple(player.bh.characters[2].health) + "/" + formatSimple(player.bh.characters[2].maxHealth) + " HP"
                if (player.bh.characters[2].shield.gt(0)) str = str + " [⛊" + formatWhole(player.bh.characters[2].shield) + "]"
                if (player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[Stunned for " + formatTime(player.bh.characters[2].stun[1]) + "]"
                return str
            },
        },
        "C2-S0-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C2-Skill-0"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[2].skills[0].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[2].skills[0].cooldown.div(player.bh.characters[2].skills[0].cooldownMax);
            },
            borderStyle() {return player.bh.characters[2].skills[0].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[2].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[2].skills[0].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[2].skills[0].cooldown) + "/" + formatTime(player.bh.characters[2].skills[0].cooldownMax)
                if (player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C2-S0-Duration": {
            unlocked() {return player.bh.characters[2].skills[0].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[2].skills[0].id].duration) return new Decimal(0)
                return player.bh.characters[2].skills[0].duration.div(BHA[player.bh.characters[2].skills[0].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[2].stun[0] == "hard" && player.bh.characters[2].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[2].skills[0].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[2].skills[0].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[2].skills[0].duration) + "/" + formatTime(BHA[player.bh.characters[2].skills[0].id].duration)
                if (player.bh.characters[2].stun[0] == "hard" && player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C2-S1-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C2-Skill-1"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[2].skills[1].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[2].skills[1].cooldown.div(player.bh.characters[2].skills[1].cooldownMax);
            },
            borderStyle() {return player.bh.characters[2].skills[1].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[2].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[2].skills[1].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[2].skills[1].cooldown) + "/" + formatTime(player.bh.characters[2].skills[1].cooldownMax)
                if (player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C2-S1-Duration": {
            unlocked() {return player.bh.characters[2].skills[1].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[2].skills[1].id].duration) return new Decimal(0)
                return player.bh.characters[2].skills[1].duration.div(BHA[player.bh.characters[2].skills[1].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[2].stun[0] == "hard" && player.bh.characters[2].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[2].skills[1].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[2].skills[1].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[2].skills[1].duration) + "/" + formatTime(BHA[player.bh.characters[2].skills[1].id].duration)
                if (player.bh.characters[2].stun[0] == "hard" && player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C2-S2-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C2-Skill-2"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[2].skills[2].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[2].skills[2].cooldown.div(player.bh.characters[2].skills[2].cooldownMax);
            },
            borderStyle() {return player.bh.characters[2].skills[2].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[2].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[2].skills[2].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[2].skills[2].cooldown) + "/" + formatTime(player.bh.characters[2].skills[2].cooldownMax)
                if (player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C2-S2-Duration": {
            unlocked() {return player.bh.characters[2].skills[2].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[2].skills[2].id].duration) return new Decimal(0)
                return player.bh.characters[2].skills[2].duration.div(BHA[player.bh.characters[2].skills[2].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[2].stun[0] == "hard" && player.bh.characters[2].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[2].skills[2].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[2].skills[2].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[2].skills[2].duration) + "/" + formatTime(BHA[player.bh.characters[2].skills[2].id].duration)
                if (player.bh.characters[2].stun[0] == "hard" && player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C2-S3-Cooldown": {
            unlocked() { return !tmp.bh.clickables["C2-Skill-3"].unlocked }, 
            direction: RIGHT,
            width: 100,
            height() { return player.bh.characters[2].skills[3].duration.gt(0) ? 50 : 100 },
            progress() {
                return player.bh.characters[2].skills[3].cooldown.div(player.bh.characters[2].skills[3].cooldownMax);
            },
            borderStyle() {return player.bh.characters[2].skills[3].duration.gt(0) ? {border: "0", borderRadius: "15px 15px 0 0"} : {border: "0", borderRadius: "15px"}},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[2].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[2].skills[3].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                let str = "<h5>" + formatTime(player.bh.characters[2].skills[3].cooldown) + "/" + formatTime(player.bh.characters[2].skills[3].cooldownMax)
                if (player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        "C2-S3-Duration": {
            unlocked() {return player.bh.characters[2].skills[3].duration.gt(0)}, 
            direction: RIGHT,
            width: 100,
            height: 48,
            progress() {
                if (!BHA[player.bh.characters[2].skills[3].id].duration) return new Decimal(0)
                return player.bh.characters[2].skills[3].duration.div(BHA[player.bh.characters[2].skills[3].id].duration);
            },
            borderStyle: {border: "0", borderTop: "2px solid white", borderRadius: "0 0 15px 15px"},
            baseStyle: {background: "rgba(0,0,0,0.5)"},
            fillStyle() {
                if (player.bh.characters[2].stun[0] == "hard" && player.bh.characters[2].stun[1].gt(0)) return {backgroundColor: "#361e1e"}
                return {backgroundColor: BHP[BHA[player.bh.characters[2].skills[3].id].char].color}
            },
            textStyle: {userSelect: "none"},
            display() {
                if (!BHA[player.bh.characters[2].skills[3].id].duration) return new Decimal(0)
                let str = "<h5>" + formatTime(player.bh.characters[2].skills[3].duration) + "/" + formatTime(BHA[player.bh.characters[2].skills[3].id].duration)
                if (player.bh.characters[2].stun[0] == "hard" && player.bh.characters[2].stun[1].gt(0)) str = str + "<br>[STUNNED]"
                return str
            },
        },
        // #588b3e / #1d881d / #449353 for health maybe
        // #64476d for corruption maybe
    },
    microtabs: {
        stages: {
            "depth1": {
                unlocked: true,
                embedLayer: 'depth1',
            },
            "depth2": {
                unlocked: true,
                embedLayer: 'depth2',
            },
            "depth3": {
                unlocked: true,
                embedLayer: 'depth3',
            },
            "matosLair": {
                unlocked: true,
                embedLayer: 'matosLair',
            },
            "darkTemple": {
                unlocked: true,
                embedLayer: 'darkTemple',
            },
        },
        party: {
            "characters": {
                content: [
                    ["style-column", [
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", () => {return BHP[player.bh.characterSelection].name}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                                ], {width: "145px", height: "30px", background: "var(--miscButtonDisable)", borderRadius: "10px"}],
                                ["blank", "6px"],
                                ["raw-html", () => {return "<img src='" + BHP[player.bh.characterSelection].icon + "'style='width:140px;height:140px;margin-bottom:-3px;border:3px solid black'></img>"}],
                            ], {width: "154px", height: "195px", background: "black", borderRight: "3px solid var(--regBorder)"}],
                            ["style-column", [
                                ["row", [
                                    ["column", [
                                        ["row", [
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>HP</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characterData[player.bh.characterSelection].health)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px", marginRight: "4px"}],
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>DMG</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characterData[player.bh.characterSelection].damage)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px"}],
                                        ]],
                                        ["blank", "4px"],
                                        ["row", [
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>RGN</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characterData[player.bh.characterSelection].regen, 2)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px", marginRight: "4px"}],
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>AGI</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characterData[player.bh.characterSelection].agility)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px"}],
                                        ]],
                                        ["blank", "4px"],
                                        ["row", [
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>DEF</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characterData[player.bh.characterSelection].defense)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px", marginRight: "4px"}],
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>LUCK</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characterData[player.bh.characterSelection].luck)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px"}],
                                        ]],
                                    ]],
                                    ["style-column", [
                                        ["row", [
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>MND</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characterData[player.bh.characterSelection].mending)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], () => {
                                                let look = {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px", marginRight: "4px"}
                                                if (player.matosLair.milestone[25] < 2) {look.filter = "brightness(0%) blur(2px)"; look.userSelect = "none"}
                                                return look
                                            }],
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>???</h3><hr style='width:60px'>0"}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], () => {
                                                let look = {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px"}
                                                if (true) {look.filter = "brightness(0%) blur(2px)"; look.userSelect = "none"}
                                                return look
                                            }],
                                        ]],
                                        ["blank", "4px"],
                                        ["row", [
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>???</h3><hr style='width:60px'>0"}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], () => {
                                                let look = {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px", marginRight: "4px"}
                                                if (true) {look.filter = "brightness(0%) blur(2px)"; look.userSelect = "none"}
                                                return look
                                            }],
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>???</h3><hr style='width:60px'>0"}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], () => {
                                                let look = {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px"}
                                                if (true) {look.filter = "brightness(0%) blur(2px)"; look.userSelect = "none"}
                                                return look
                                            }],
                                        ]],
                                        ["blank", "4px"],
                                        ["row", [
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>???</h3><hr style='width:60px'>0"}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], () => {
                                                let look = {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px", marginRight: "4px"}
                                                if (true) {look.filter = "brightness(0%) blur(2px)"; look.userSelect = "none"}
                                                return look
                                            }],
                                            ["style-column", [
                                                ["raw-html", () => {return "<h3>???</h3><hr style='width:60px'>0"}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                            ], () => {
                                                let look = {width: "80px", height: "45px", background: "var(--layerBackground)", borderRadius: "10px"}
                                                if (true) {look.filter = "brightness(0%) blur(2px)"; look.userSelect = "none"}
                                                return look
                                            }],
                                        ]],
                                    ], {marginLeft: "4px"}],
                                ], {width: "340px", height: "152px"}],
                                ["left-row", [
                                    ["clickable", "Select-Character"],
                                ], {width: "340px", height: "40px", borderTop: "3px solid var(--regBorder)", overflow: "hidden"}]
                            ], {width: "340px", height: "195px"}],
                        ], {width: "497px", height: "195px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                        ["theme-scroll-column", [
                            ["blank", "2px"],
                            ["row", [
                                ["clickable", "Char-Kres"], ["clickable", "Char-Nav"], ["clickable", "Char-Sel"], ["clickable", "Char-Eclipse"], ["clickable", "Char-Geroa"],
                            ]],
                        ], {width: "497px", height: "480px"}],
                    ], {width: "497px", height: "677px"}],
                ]
            },
            "skills": {
                content: [
                    ["style-column", [
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", () => {return "Selecting:<br><small>" + BHP[player.bh.characters[Math.floor(player.bh.inputSkillSelection/4)].id].name + " S" + (player.bh.inputSkillSelection%4+1)}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                                ], {width: "100px", height: "40px", background: "var(--layerBackground)", borderRadius: "10px"}],
                                ["blank", "5px"],
                                ["raw-html", () => {return "<img src='" + BHP[player.bh.characters[Math.floor(player.bh.inputSkillSelection/4)].id].icon + "'style='width:85px;height:85px;margin-bottom:-3px;border:3px solid black'></img>"}],
                                ["blank", "5px"],
                                ["style-column", [
                                    ["raw-html", () => {
                                        if (player.bh.characters[Math.floor(player.bh.inputSkillSelection/4)].id == "none") return "Skill Points<br>0/" + formatWhole(player.bh.maxSkillPoints)
                                        return "Skill Points<br>" + formatWhole(player.bh.maxSkillPoints.sub(player.bh.characterData[player.bh.characters[Math.floor(player.bh.inputSkillSelection/4)].id].usedSP)) + "/" + formatWhole(player.bh.maxSkillPoints)
                                    }, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                                ], {width: "100px", height: "40px", background: "var(--layerBackground)", borderRadius: "10px"}],
                            ], {width: "110px", height: "195px", borderRight: "3px solid var(--regBorder)"}],
                            ["style-column", [
                                ["top-column", [
                                    ["blank", "10px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {
                                                if (BHA[player.bh.skillSelection].passive) return BHA[player.bh.skillSelection].name + "<br><p style='font-size:14px'>[PASSIVE]"
                                                return BHA[player.bh.skillSelection].name + "<br><p style='font-size:14px'>Cooldown: " + formatTime(BHA[player.bh.skillSelection].cooldown)
                                            }, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                                        ], {width: "250px", height: "50px", background: "var(--layerBackground)", borderRadius: "10px", marginRight: "5px"}],
                                        ["column", [
                                            ["style-column", [
                                                ["raw-html", () => {return "[Lv " + formatWhole(player.bh.skillData[player.bh.skillSelection].level.add(1)) + "/" + formatWhole(player.bh.skillData[player.bh.skillSelection].maxLevel.add(1)) + "]"}, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                                            ], {width: "110px", height: "20px", paddingBottom: "2px", background: "var(--layerBackground)", borderRadius: "10px"}],
                                            ["blank", "5px"],
                                            ["style-column", [
                                                ["raw-html", () => {return "SP Cost: " + formatWhole(Decimal.sumArithmeticSeries(player.bh.skillData[player.bh.skillSelection].level, 1, 1, 0).mul(Decimal.add(1, BHA[player.bh.skillSelection].spCost.div(5).floor())).add(BHA[player.bh.skillSelection].spCost))}, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                                            ], {width: "110px", height: "21px", paddingBottom: "2px", background: "var(--layerBackground)", borderRadius: "10px"}],
                                        ]],
                                    ]],
                                    ["blank", "5px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<p style='line-height:1.2'>" + run(BHA[player.bh.skillSelection].description, BHA[player.bh.skillSelection])}, {color: "var(--textColor)", fontSize: "13px", fontFamily: "monospace"}],
                                        ], {width: "240px", height: "70px", padding: "5px 5px", background: "var(--layerBackground)", borderRadius: "10px", marginRight: "5px"}],
                                        ["column", [
                                            ["style-column", [
                                                ["raw-html", () => {return "<p style='line-height:1'><u>Passive</u><br><small>" + run(BHA[player.bh.skillSelection].passiveText, BHA[player.bh.skillSelection]) + "</small></p>"}, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                                            ], {width: "110px", height: "30px", background: "var(--layerBackground)", borderRadius: "10px", marginBottom: "5px"}],
                                            ["style-column", [
                                                ["raw-html", () => {
                                                    let str = "<p style='line-height:1'><u>Level Up Cost</u><br><small>"
                                                    let cost = BHA[player.bh.skillSelection].curCostScale.pow(player.bh.skillData[player.bh.skillSelection].maxLevel).mul(BHA[player.bh.skillSelection].curCostBase).div(player.bh.skillCostDiv).floor()
                                                    return str + formatSimple(cost) + " " + BH_CURRENCY[BHA[player.bh.skillSelection].currency][0] + "</small></p>"
                                                }, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                                            ], {width: "100px", height: "35px", background: "var(--layerBackground)", padding: "5px", borderRadius: "10px"}],
                                        ]],
                                    ]],
                                ], {width: "384px", height: "152px"}],
                                ["left-row", [
                                    ["clickable", "Skill-Equip"],
                                    ["style-row", [], {width: "3px", height: "40px", background: "var(--regBorder)"}],
                                    ["clickable", "Skill-Buy-Level"],
                                    ["style-row", [], {width: "3px", height: "40px", background: "var(--regBorder)"}],
                                    ["clickable", "Skill-Level-Decrease"],
                                    ["style-row", [], {width: "3px", height: "40px", background: "var(--regBorder)"}],
                                    ["clickable", "Skill-Level-Increase"],
                                ], {width: "384px", height: "40px", borderTop: "3px solid var(--regBorder)", overflow: "hidden"}],
                            ], {width: "384px", height: "195px"}],
                        ], {width: "497px", height: "195px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                        ["theme-scroll-column", [
                            ["blank", "4px"],
                            "bh-skills",
                        ], {width: "497px", height: "480px"}],
                    ], {width: "497px", height: "677px"}],
                ]
            },
            "equipment": {
                content: [
                    ["style-column", [
                        
                    ], {width: "497px", height: "677px", background: "var(--layerBackground)"}],
                ]
            },
        },
        stuff: {
            "unlock": {
                unlocked() { return !player.bh.unlockConditions.done },
                content: [
                    ["blank", "50px"],
                    ["row", [["clickable", "Unlock-0"]]],
                    ["blank", "50px"],
                    ["row", [
                        ["clickable", "Unlock-1"],
                        ["raw-html", "&nbsp&nbsp", {color: "white", fontSize: "50px", fontFamily: "monospace"}],
                        ["clickable", "Unlock-Clear"],
                        ["raw-html", "&nbsp&nbsp", {color: "white", fontSize: "50px", fontFamily: "monospace"}],
                        ["clickable", "Unlock-2"],
                    ]],
                    ["blank", "50px"],
                    ["row", [["clickable", "Unlock-3"]]],
                ]
            },
            "party": {
                content: [
                    ["style-row", [
                        ["category-button", ["Party", "stuff", "party"], {width: "399px", height: "40px", background: "var(--layerBackground)", borderRadius: "27px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "var(--regBorder)"}],
                        ["category-button", ["Stages", "stuff", "stages"], {width: "398px", height: "40px", background: "var(--layerBackground)", borderRadius: "0 27px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid var(--regBorder)", borderRadius: "30px 30px 0 0", marginBottom: "-3px"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-row", [
                                ["style-column", [
                                    ["style-column", [["hoverless-clickable", "Char-C0-Icon"]], () => {
                                        let look = {width: "100px", height: "100px", border: "3px solid"}
                                        player.bh.inputCharSelection == 0 && player.subtabs["bh"]["party"] == "characters" ? look.borderColor = "white" : look.borderColor = "black"
                                        return look
                                    }],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["style-column", [["hoverless-clickable", "Char-C0-S0"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid", marginRight: "4px"}
                                            player.bh.inputSkillSelection == 0 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                        ["style-column", [["hoverless-clickable", "Char-C0-S1"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid"}
                                            player.bh.inputSkillSelection == 1 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                    ]],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["style-column", [["hoverless-clickable", "Char-C0-S2"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid", marginRight: "4px"}
                                            player.bh.inputSkillSelection == 2 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                        ["style-column", [["hoverless-clickable", "Char-C0-S3"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid"}
                                            player.bh.inputSkillSelection == 3 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                    ]],
                                ], {width: "106px", height: "218px", marginRight: "10px"}],
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {return BHP[player.bh.characters[0].id].name}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "148px", height: "26px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ["blank", "4px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>HP</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[0].maxHealth)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px", marginRight: "4px"}],
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>DMG</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[0].damage)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ]],
                                    ["blank", "4px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>RGN</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[0].regen, 2)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px", marginRight: "4px"}],
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>AGI</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[0].agility)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ]],
                                    ["blank", "4px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>DEF</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[0].defense)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px", marginRight: "4px"}],
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>LUCK</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[0].luck)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ]],
                                    ["blank", "4px"],
                                    ["clickable", "Char-C0-Page"],
                                ], {width: "148px", height: "202px", padding: "8px", background: "var(--miscButtonHover)", borderRadius: "10px"}],
                            ], {width: "280px", height: "218px", padding: "10px", borderBottom: "3px solid var(--regBorder)"}],
                            ["style-row", [
                                ["style-column", [
                                    ["style-column", [["hoverless-clickable", "Char-C1-Icon"]], () => {
                                        let look = {width: "100px", height: "100px", border: "3px solid"}
                                        player.bh.inputCharSelection == 1 && player.subtabs["bh"]["party"] == "characters" ? look.borderColor = "white" : look.borderColor = "black"
                                        return look
                                    }],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["style-column", [["hoverless-clickable", "Char-C1-S0"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid", marginRight: "4px"}
                                            player.bh.inputSkillSelection == 4 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                        ["style-column", [["hoverless-clickable", "Char-C1-S1"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid"}
                                            player.bh.inputSkillSelection == 5 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                    ]],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["style-column", [["hoverless-clickable", "Char-C1-S2"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid", marginRight: "4px"}
                                            player.bh.inputSkillSelection == 6 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                        ["style-column", [["hoverless-clickable", "Char-C1-S3"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid"}
                                            player.bh.inputSkillSelection == 7 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                    ]],
                                ], {width: "106px", height: "218px", marginRight: "10px"}],
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {return BHP[player.bh.characters[1].id].name}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "148px", height: "26px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ["blank", "4px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>HP</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[1].maxHealth)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px", marginRight: "4px"}],
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>DMG</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[1].damage)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ]],
                                    ["blank", "4px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>RGN</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[1].regen, 2)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px", marginRight: "4px"}],
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>AGI</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[1].agility)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ]],
                                    ["blank", "4px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>DEF</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[1].defense)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px", marginRight: "4px"}],
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>LUCK</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[1].luck)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ]],
                                    ["blank", "4px"],
                                    ["clickable", "Char-C1-Page"],
                                ], {width: "148px", height: "202px", padding: "8px", background: "var(--miscButtonHover)", borderRadius: "10px"}],
                            ], {width: "280px", height: "218px", padding: "10px", borderBottom: "3px solid var(--regBorder)"}],
                            ["style-row", [
                                ["style-column", [
                                    ["style-column", [["hoverless-clickable", "Char-C2-Icon"]], () => {
                                        let look = {width: "100px", height: "100px", border: "3px solid"}
                                        player.bh.inputCharSelection == 2 && player.subtabs["bh"]["party"] == "characters" ? look.borderColor = "white" : look.borderColor = "black"
                                        return look
                                    }],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["style-column", [["hoverless-clickable", "Char-C2-S0"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid", marginRight: "4px"}
                                            player.bh.inputSkillSelection == 8 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                        ["style-column", [["hoverless-clickable", "Char-C2-S1"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid"}
                                            player.bh.inputSkillSelection == 9 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                    ]],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["style-column", [["hoverless-clickable", "Char-C2-S2"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid", marginRight: "4px"}
                                            player.bh.inputSkillSelection == 10 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                        ["style-column", [["hoverless-clickable", "Char-C2-S3"]], () => {
                                            let look = {width: "45px", height: "45px", border: "3px solid"}
                                            player.bh.inputSkillSelection == 11 && player.subtabs["bh"]["party"] == "skills" ? look.borderColor = "white" : look.borderColor = "black"
                                            return look
                                        }],
                                    ]],
                                ], {width: "106px", height: "218px", marginRight: "10px"}],
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {return BHP[player.bh.characters[2].id].name}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "148px", height: "26px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ["blank", "4px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>HP</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[2].maxHealth)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px", marginRight: "4px"}],
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>DMG</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[2].damage)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ]],
                                    ["blank", "4px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>RGN</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[2].regen, 2)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px", marginRight: "4px"}],
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>AGI</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[2].agility)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ]],
                                    ["blank", "4px"],
                                    ["row", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>DEF</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[2].defense)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px", marginRight: "4px"}],
                                        ["style-column", [
                                            ["raw-html", () => {return "<h3>LUCK</h3><hr style='width:60px'>" + formatShortSimple(player.bh.characters[2].luck)}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "72px", height: "45px", background: "var(--miscButton)", borderRadius: "10px"}],
                                    ]],
                                    ["blank", "4px"],
                                    ["clickable", "Char-C2-Page"],
                                ], {width: "148px", height: "202px", padding: "8px", background: "var(--miscButtonHover)", borderRadius: "10px"}],

                            ], {width: "280px", height: "218px", padding: "10px"}],
                        ], {width: "300px", height: "720px", background: "var(--scroll4)", borderRight: "3px solid var(--regBorder)", borderRadius: "0 0 0 27px"}],
                        ["style-column", [
                            ["style-row", [
                                ["category-button", ["Characters", "party", "characters"], {width: "164px", height: "40px", background: "var(--miscButton)"}],
                                ["style-row", [], {width: "3px", height: "40px", backgroundColor: "var(--regBorder)"}],
                                ["category-button", ["Skills", "party", "skills"], {width: "163px", height: "40px", background: "var(--miscButton)"}],
                                ["style-row", [
                                    ["raw-html", "???", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                                ], {width: "164px", height: "40px", backgroundColor: "var(--miscButtonDisable)", borderLeft: "3px solid var(--regBorder)", userSelect: "none"}],
                            ], {width: "497px", height: "40px", borderBottom: "3px solid var(--regBorder)"}],
                            ["style-column", [
                                ["buttonless-microtabs", "party", {borderWidth: "0"}],
                            ], {width: "497px", height: "677px"}],
                        ], {width: "497px", height: "720px", background: "var(--miscButton)"}],
                    ], {width: "800px", height: "720px", border: "3px solid var(--regBorder)", borderRadius: "0 0 0 30px"}],
                ],
            },
            "stages": {
                content: [
                    ["style-row", [
                        ["category-button", ["Party", "stuff", "party"], {width: "399px", height: "40px", background: "var(--layerBackground)", borderRadius: "27px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "var(--regBorder)"}],
                        ["category-button", ["Stages", "stuff", "stages"], {width: "398px", height: "40px", background: "var(--layerBackground)", borderRadius: "0 27px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid var(--regBorder)", borderRadius: "30px 30px 0 0", marginBottom: "-3px"}],
                    ["style-column", [
                        ["theme-scroll-row", [
                            ["row-tree", universes.BH.tree],
                        ], {width: "750px", height: "297px", padding: "0 25px", background: "linear-gradient(90deg, rgba(50, 50, 50, 0.5) 0%, rgba(0, 0, 0, 0.5) 150%)", borderBottom: "3px solid var(--regBorder)"}],
                        ["style-column", [
                            ["buttonless-microtabs", "stages", {borderWidth: "0"}],
                        ], {width: "800px", height: "420px", borderRadius: "0 0 27px 27px"}],
                    ], {width: "800px", height: "720px", border: "3px solid var(--regBorder)", borderRadius: "0 0 30px 30px"}],
                ],
            },
            "battle": {
                content: [
                    ["row", [
                        ["column", [
                            ["row", [
                                ["style-column", [
                                    ["clickable", "C0-Icon"], 
                                    ["style-row", [
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[0].attributes.air ? "≋<div class='bottomTooltip' style='margin-top:0px'>Air<hr>Has " + formatSimple(Decimal.sub(1, player.bh.characters[0].attributes.air).mul(100)) + "% resistance to<br>melee attacks.</div>" : ""}, {color: "#ccc", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[0].attributes.warded ? "⬢<div class='bottomTooltip' style='margin-top:0px'>Warded<hr>Has " + formatSimple(Decimal.sub(1, player.bh.characters[0].attributes.warded).mul(100)) + "% resistance to<br>magic attacks.</div>" : ""}, {color: "#ccccff", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[0].attributes.stealthy ? "☉<div class='bottomTooltip' style='margin-top:0px'>Stealthy<hr>Has " + formatSimple(Decimal.sub(1, player.bh.characters[0].attributes.stealthy).mul(100)) + "% resistance to<br>ranged attacks.</div>" : ""}, {color: "#78866b", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[0].attributes.berserk ? "✹<div class='bottomTooltip' style='margin-top:0px'>Berserk<hr>Actions always do<br>" + formatSimple(Decimal.mul(player.bh.characters[0].attributes.berserk, 100)) + "% self damage.</div>" : ""}, {color: "#ff6666", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[0].attributes.rebound ? "⭟<div class='bottomTooltip' style='margin-top:0px'>Rebound<hr>Reflects " + formatSimple(Decimal.mul(player.bh.characters[0].attributes.rebound, 100)) + "% damage back<br>towards the attacker.</div>" : ""}, {color: "#63697A", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[0].attributes.explosive ? "✺<div class='bottomTooltip' style='margin-top:0px'>Explosive<hr>Explodes upon death,<br>dealing " + formatSimple(player.bh.characters[0].attributes.explosive) + " damage to<br>all team members.</div>" : ""}, {color: "#ee8700", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                    ], {width: "100px", height: "30px", marginTop: "-35px"}],
                                ], {margin: "5px"}],
                                ["style-column", [
                                    ["clickable", "C1-Icon"],
                                    ["style-row", [
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[1].attributes.air ? "≋<div class='bottomTooltip' style='margin-top:0px'>Air<hr>Has " + formatSimple(Decimal.sub(1, player.bh.characters[1].attributes.air).mul(100)) + "% resistance to<br>melee attacks.</div>" : ""}, {color: "#ccc", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[1].attributes.warded ? "⬢<div class='bottomTooltip' style='margin-top:0px'>Warded<hr>Has " + formatSimple(Decimal.sub(1, player.bh.characters[1].attributes.warded).mul(100)) + "% resistance to<br>magic attacks.</div>" : ""}, {color: "#ccccff", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[1].attributes.stealthy ? "☉<div class='bottomTooltip' style='margin-top:0px'>Stealthy<hr>Has " + formatSimple(Decimal.sub(1, player.bh.characters[1].attributes.stealthy).mul(100)) + "% resistance to<br>ranged attacks.</div>" : ""}, {color: "#78866b", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[1].attributes.berserk ? "✹<div class='bottomTooltip' style='margin-top:0px'>Berserk<hr>Actions always do<br>" + formatSimple(Decimal.mul(player.bh.characters[1].attributes.berserk, 100)) + "% self damage.</div>" : ""}, {color: "#ff6666", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[1].attributes.rebound ? "⭟<div class='bottomTooltip' style='margin-top:0px'>Rebound<hr>Reflects " + formatSimple(Decimal.mul(player.bh.characters[1].attributes.rebound, 100)) + "% damage back<br>towards the attacker.</div>" : ""}, {color: "#63697A", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                        ["tooltip-row", [["raw-html", () => {return player.bh.characters[1].attributes.explosive ? "✺<div class='bottomTooltip' style='margin-top:0px'>Explosive<hr>Explodes upon death,<br>dealing " + formatSimple(player.bh.characters[1].attributes.explosive) + " damage to<br>all team members.</div>" : ""}, {color: "#ee8700", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                    ], {width: "100px", height: "30px", marginTop: "-35px"}],
                                ], {margin: "5px"}],
                            ]],
                            ["style-column", [
                                ["clickable", "C2-Icon"],
                                ["style-row", [
                                    ["tooltip-row", [["raw-html", () => {return player.bh.characters[2].attributes.air ? "≋<div class='bottomTooltip' style='margin-top:0px'>Air<hr>Has " + formatSimple(Decimal.sub(1, player.bh.characters[2].attributes.air).mul(100)) + "% resistance to<br>melee attacks.</div>" : ""}, {color: "#ccc", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                    ["tooltip-row", [["raw-html", () => {return player.bh.characters[2].attributes.warded ? "⬢<div class='bottomTooltip' style='margin-top:0px'>Warded<hr>Has " + formatSimple(Decimal.sub(1, player.bh.characters[2].attributes.warded).mul(100)) + "% resistance to<br>magic attacks.</div>" : ""}, {color: "#ccccff", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                    ["tooltip-row", [["raw-html", () => {return player.bh.characters[2].attributes.stealthy ? "☉<div class='bottomTooltip' style='margin-top:0px'>Stealthy<hr>Has " + formatSimple(Decimal.sub(1, player.bh.characters[2].attributes.stealthy).mul(100)) + "% resistance to<br>ranged attacks.</div>" : ""}, {color: "#78866b", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                    ["tooltip-row", [["raw-html", () => {return player.bh.characters[2].attributes.berserk ? "✹<div class='bottomTooltip' style='margin-top:0px'>Berserk<hr>Actions always do<br>" + formatSimple(Decimal.mul(player.bh.characters[2].attributes.berserk, 100)) + "% self damage.</div>" : ""}, {color: "#ff6666", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                    ["tooltip-row", [["raw-html", () => {return player.bh.characters[2].attributes.rebound ? "⭟<div class='bottomTooltip' style='margin-top:0px'>Rebound<hr>Reflects " + formatSimple(Decimal.mul(player.bh.characters[2].attributes.rebound, 100)) + "% damage back<br>towards the attacker.</div>" : ""}, {color: "#63697A", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                    ["tooltip-row", [["raw-html", () => {return player.bh.characters[2].attributes.explosive ? "✺<div class='bottomTooltip' style='margin-top:0px'>Explosive<hr>Explodes upon death,<br>dealing " + formatSimple(player.bh.characters[2].attributes.explosive) + " damage to<br>all team members.</div>" : ""}, {color: "#ee8700", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                ], {width: "100px", height: "30px", marginTop: "-35px"}],
                            ], {margin: "5px"}],
                        ]],
                        ["blank", ["100px", "100px"]],
                        ["column", [
                            ["clickable", "Celestialite-Icon"],
                            ["style-row", [
                                ["tooltip-row", [["raw-html", () => {return player.bh.celestialite.attributes.air ? "≋<div class='bottomTooltip' style='margin-top:0px'>Air<hr>Has " + formatSimple(Decimal.sub(1, player.bh.celestialite.attributes.air).mul(100)) + "% resistance to<br>melee attacks.</div>" : ""}, {color: "#ccc", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                ["tooltip-row", [["raw-html", () => {return player.bh.celestialite.attributes.warded ? "⬢<div class='bottomTooltip' style='margin-top:0px'>Warded<hr>Has " + formatSimple(Decimal.sub(1, player.bh.celestialite.attributes.warded).mul(100)) + "% resistance to<br>magic attacks.</div>" : ""}, {color: "#ccccff", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                ["tooltip-row", [["raw-html", () => {return player.bh.celestialite.attributes.stealthy ? "☉<div class='bottomTooltip' style='margin-top:0px'>Stealthy<hr>Has " + formatSimple(Decimal.sub(1, player.bh.celestialite.attributes.stealthy).mul(100)) + "% resistance to<br>ranged attacks.</div>" : ""}, {color: "#78866b", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                ["tooltip-row", [["raw-html", () => {return player.bh.celestialite.attributes.berserk ? "✹<div class='bottomTooltip' style='margin-top:0px'>Berserk<hr>Actions always do<br>" + formatSimple(Decimal.mul(player.bh.celestialite.attributes.berserk, 100)) + "% self damage.</div>" : ""}, {color: "#ff6666", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                ["tooltip-row", [["raw-html", () => {return player.bh.celestialite.attributes.rebound ? "⭟<div class='bottomTooltip' style='margin-top:0px'>Rebound<hr>Reflects " + formatSimple(Decimal.mul(player.bh.celestialite.attributes.rebound, 100)) + "% damage back<br>towards the attacker.</div>" : ""}, {color: "#63697A", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                                ["tooltip-row", [["raw-html", () => {return player.bh.celestialite.attributes.explosive ? "✺<div class='bottomTooltip' style='margin-top:0px'>Explosive<hr>Explodes upon death,<br>dealing " + formatSimple(player.bh.celestialite.attributes.explosive) + " damage to<br>all team members.</div>" : ""}, {color: "#ee8700", fontSize: "30px", fontFamily: "monospace", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black"}]]],
                            ], {width: "100px", height: "30px", marginTop: "-35px"}],
                        ], {}],
                    ]],
                    ["blank", "40px"],
                    ["row", [
                        ["style-column", [
                            ["blank", "5px"],
                            ["raw-html", () => {return BHP[player.bh.characters[0].id].name}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["bar", "C0-Health"],
                            ["row", [
                                ["style-column", [["clickable", "C0-Skill-0"], ["bar", "C0-S0-Cooldown"], ["bar", "C0-S0-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                ["style-column", [["clickable", "C0-Skill-1"], ["bar", "C0-S1-Cooldown"], ["bar", "C0-S1-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                            ]],
                            ["row", [
                                ["style-column", [["clickable", "C0-Skill-2"], ["bar", "C0-S2-Cooldown"], ["bar", "C0-S2-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                ["style-column", [["clickable", "C0-Skill-3"], ["bar", "C0-S3-Cooldown"], ["bar", "C0-S3-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                            ]],
                            ["row", [
                                ["style-row", [["clickable", "C0-Auto-S0"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                                ["style-row", [["clickable", "C0-Auto-S1"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                                ["style-row", [["clickable", "C0-Auto-S2"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                                ["style-row", [["clickable", "C0-Auto-S3"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                            ]],
                            ["blank", "10px"],
                        ], () => {return player.bh.characters[0].id != "none" && player.bh.characters[0].health.gt(0) ? {width: "225px", height: "320px", background: "rgba(0,0,0,0.2)", border: "3px solid white", borderRadius: "30px", margin: "5px",} : {display: "none !important"}}],
                        ["style-column", [
                            ["blank", "5px"],
                            ["raw-html", () => {return BHP[player.bh.characters[1].id].name}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["bar", "C1-Health"],
                            ["row", [
                                ["style-column", [["clickable", "C1-Skill-0"], ["bar", "C1-S0-Cooldown"], ["bar", "C1-S0-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                ["style-column", [["clickable", "C1-Skill-1"], ["bar", "C1-S1-Cooldown"], ["bar", "C1-S1-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                            ]],
                            ["row", [
                                ["style-column", [["clickable", "C1-Skill-2"], ["bar", "C1-S2-Cooldown"], ["bar", "C1-S2-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                ["style-column", [["clickable", "C1-Skill-3"], ["bar", "C1-S3-Cooldown"], ["bar", "C1-S3-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                            ]],
                            ["row", [
                                ["style-row", [["clickable", "C1-Auto-S0"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                                ["style-row", [["clickable", "C1-Auto-S1"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                                ["style-row", [["clickable", "C1-Auto-S2"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                                ["style-row", [["clickable", "C1-Auto-S3"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                            ]],
                            ["blank", "10px"],
                        ], () => {return player.bh.characters[1].id != "none" && player.bh.characters[1].health.gt(0) ? {width: "225px", height: "320px", background: "rgba(0,0,0,0.2)", border: "3px solid white", borderRadius: "30px", margin: "5px",} : {display: "none !important"}}],
                        ["style-column", [
                            ["blank", "5px"],
                            ["raw-html", () => {return BHP[player.bh.characters[2].id].name}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["bar", "C2-Health"],
                            ["row", [
                                ["style-column", [["clickable", "C2-Skill-0"], ["bar", "C2-S0-Cooldown"], ["bar", "C2-S0-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                ["style-column", [["clickable", "C2-Skill-1"], ["bar", "C2-S1-Cooldown"], ["bar", "C2-S1-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                            ]],
                            ["row", [
                                ["style-column", [["clickable", "C2-Skill-2"], ["bar", "C2-S2-Cooldown"], ["bar", "C2-S2-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                                ["style-column", [["clickable", "C2-Skill-3"], ["bar", "C2-S3-Cooldown"], ["bar", "C2-S3-Duration"]], {width: "100px", height: "100px", border: "2px solid white", borderRadius: "17px", margin: "-1px"}],
                            ]],
                            ["row", [
                                ["style-row", [["clickable", "C2-Auto-S0"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                                ["style-row", [["clickable", "C2-Auto-S1"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                                ["style-row", [["clickable", "C2-Auto-S2"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                                ["style-row", [["clickable", "C2-Auto-S3"]], {width: "50px", height: "30px", border: "2px solid white", borderRadius: "12px", margin: "-1px"}],
                            ]],
                            ["blank", "10px"],
                        ], () => {return player.bh.characters[2].id != "none" && player.bh.characters[2].health.gt(0) ? {width: "225px", height: "320px", background: "rgba(0,0,0,0.2)", border: "3px solid white", borderRadius: "30px", margin: "5px",} : {display: "none !important"}}],
                        ["blank", ["50px", "50px"]],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {return BHC[player.bh.celestialite.id].name}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => {
                                    if (player.bh.currentStage == "none") {
                                        return "Kill Combo: " + formatShortestWhole(player.bh.combo)
                                    } else if (player.bh.combo.gte(player[player.bh.currentStage].highestCombo)) {
                                        return "Kill Combo: " + formatShortestWhole(player.bh.combo) + "/" + BHS[player.bh.currentStage].comboLimit
                                    } else {
                                        return "Kill Combo: <span style='color:gray'>" + formatShortestWhole(player.bh.combo) + "</span>/" + BHS[player.bh.currentStage].comboLimit
                                    }
                                }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return player.bh.combo.gte(player.bh.comboScalingStart) ? "[SOFTCAP: x" + formatShort(player.bh.comboSoftcap) + " Celestialite Stats]" : ""}, {color: "red", fontSize: "12px", fontFamily: "monospace"}],
                            ], {width: "300px", height: "60px"}],
                            ["style-column", [
                                ["bar", "celestialite-Health"],
                                ["row", [
                                    ["style-column", [["bar", "celestialite-A0"], ["bar", "celestialite-A0-duration"]], () => {return BHC[player.bh.celestialite.id].actions[0] ? {width: "125px", height: "40px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                    ["style-column", [["bar", "celestialite-A1"], ["bar", "celestialite-A1-duration"]], () => {return BHC[player.bh.celestialite.id].actions[1] ? {width: "125px", height: "40px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                ]],
                                ["row", [
                                    ["style-column", [["bar", "celestialite-A2"], ["bar", "celestialite-A2-duration"]], () => {return BHC[player.bh.celestialite.id].actions[2] ? {width: "125px", height: "40px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                    ["style-column", [["bar", "celestialite-A3"], ["bar", "celestialite-A3-duration"]], () => {return BHC[player.bh.celestialite.id].actions[3] ? {width: "125px", height: "40px", border: "2px solid white", borderRadius: "17px", margin: "-1px"} : {display: "none !important"}}],
                                ]],
                            ], {width: "300px", height: "155px"}],
                            ["blank", "10px"],
                            ["row", [
                                ["clickable", "Pause"],
                                ["clickable", "Fullscreen"],
                                ["clickable", "Give-Up"],
                            ]],
                        ], {width: "300px", height: "320px", background: "rgba(0,0,0,0.2)", border: "3px solid white", borderRadius: "30px"}],
                    ]],
                    ["top-column", [
                        ["raw-html", () => `${player.bh.log.map((x, i) => `<span style="display:block;">${x}</span>`).join("")}`],
                    ], {width: "700px", minHeight: "206px", textAlign: "center", background: "rgba(0,0,0,0.5)", border: "3px solid white", borderRadius: "30px", padding: "12px 0", marginTop: "5px"}],
                ],
            },
            "bullet": {
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["style-column", [
                            ["raw-html", () => {return BHP[player.bh.characters[0].id].name}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["bar", "C0-Health"],
                        ], () => {return player.bh.characters[0].id != "none" ? {background: "rgba(0,0,0,0.3)", border: "2px solid white", padding: "-2px", borderRadius: "15px"} : {display: "none !important"}}],
                        ["blank", ["10px", "10px"]],
                        ["style-column", [
                            ["raw-html", () => {return BHP[player.bh.characters[1].id].name}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["bar", "C1-Health"],
                        ], () => {return player.bh.characters[1].id != "none" ? {background: "rgba(0,0,0,0.3)", border: "2px solid white", padding: "-2px", borderRadius: "15px"} : {display: "none !important"}}],
                        ["blank", ["10px", "10px"]],
                        ["style-column", [
                            ["raw-html", () => {return BHP[player.bh.characters[2].id].name}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["bar", "C2-Health"],
                        ], () => {return player.bh.characters[2].id != "none" ? {background: "rgba(0,0,0,0.3)", border: "2px solid white", padding: "-2px", borderRadius: "15px"} : {display: "none !important"}}],
                    ]],
                ],
            },
            "dead": {
                content: [
                    ["blank", "200px"],
                    ["style-column", [
                        ["raw-html", "Everyone has passed out.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", "<i>Something</i> pulls you out of the black heart.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "800px", height: "80px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["clickable", "Leave"],
                    ["blank", "25px"],
                ],
            },
            "win": {
                content: [
                    ["style-column", [
                        ["raw-html", "You have reached the end of this stage.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", "You leave with your spoils.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "800px", height: "80px", backgroundColor: "#1b0218", border: "3px solid #8a0e79", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["top-column", [
                        ["raw-html", () => `${player.bh.log.map((x, i) => `<span style="display:block;">${x}</span>`).join("")}`],
                    ], {width: "700px", minHeight: "206px", textAlign: "center", background: "#1b0218", border: "3px solid #8a0e79", borderRadius: "30px", padding: "12px 0"}],
                    ["blank", "25px"],
                    ["clickable", "Leave"],
                    ["blank", "25px"],
                ],
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", {borderWidth: "0"}],
        ["blank", "25px"],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})