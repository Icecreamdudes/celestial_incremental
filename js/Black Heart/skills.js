// MAKE SURE TO ADD THE SKILL TO BH LAYER SKILLDATA (DATA CAN'T BE STORED HERE)
BHA.none = {
    name: "",
    description: "",
    char: "none",
    spCost: new Decimal(0),
    curCostBase: new Decimal(1),
    curCostScale: new Decimal(1),
    currency: "darkEssence",
    unlocked: false,

    instant: true,
    cooldown: new Decimal(Infinity),
}

// General Skills
BHA.general_slap = {
    name: "Slap",
    description() {return "Deals " + formatWhole(new Decimal(75).add(player.bh.skillData["general_slap"].level.mul(15))) + "% physical damage and soft-stuns the celestialite for a second."},
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_slap"].maxLevel.div(5)) + " DMG"},
    char: "general",
    spCost: new Decimal(6),
    curCostBase: new Decimal(3),
    curCostScale: new Decimal(3),
    currency: "darkEssence",
    unlocked() {return hasUpgrade("depth1", 4)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "physical",
    properties: {
        "stun": [new Decimal(1), "soft", new Decimal(1)], // Chance / Stun-Type / Stun-Time
    },
    value() {return new Decimal(0.75).add(player.bh.skillData["general_slap"].level.mul(0.15))},
    cooldown: new Decimal(10),
    cooldownCap: new Decimal(4),
}
BHA.general_bandage = {
    name: "Bandage",
    description() {return "Heal yourself by " + formatWhole(new Decimal(10).add(player.bh.skillData["general_bandage"].level.mul(2))) + " health"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_bandage"].maxLevel) + " HP"},
    char: "general",
    spCost: new Decimal(8),
    curCostBase: new Decimal(5),
    curCostScale: new Decimal(4),
    currency: "darkEssence",
    unlocked() {return hasUpgrade("depth2", 4)},

    instant: true,
    type: "heal",
    target: "self",
    value() {return new Decimal(10).add(player.bh.skillData["general_bandage"].level.mul(2))},
    cooldown: new Decimal(15),
}
BHA.general_scream = {
    name: "Scream",
    description() {return "Taunt damage and buffs towards yourself and give yourself " + formatSimple(new Decimal(0.5).add(player.bh.skillData["general_scream"].level.mul(0.1)), 2) + " regen for 10 seconds"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_scream"].maxLevel.div(20), 2) + " RGN"},
    char: "general",
    spCost: new Decimal(12),
    curCostBase: new Decimal(8),
    curCostScale: new Decimal(5),
    currency: "darkEssence",
    unlocked() {return hasUpgrade("depth3", 4)},

    active: true,
    constantType: "effect",
    constantTarget: "self",
    effects: {
        "attributes": {"taunt": true},
        "regenAdd"() {return new Decimal(0.5).add(player.bh.skillData["general_scream"].level.mul(0.1))},
    },
    cooldown: new Decimal(30),
    duration: new Decimal(10),
}
BHA.general_block = {
    name: "Block",
    description() {return "Shield yourself and increase your defense by " + formatWhole(new Decimal(25).add(player.bh.skillData["general_block"].level.mul(5)))},
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_block"].maxLevel) + " DEF"},
    char: "general",
    spCost: new Decimal(10),
    curCostBase: new Decimal(12),
    curCostScale: new Decimal(6),
    currency: "darkEssence",
    unlocked: false,

    instant: true,
    type: "shield",
    target: "self",
    value: new Decimal(1),
    active: true,
    constantType: "effect",
    constantTarget: "self",
    effects: {
        "defenseAdd"() {return new Decimal(25).add(player.bh.skillData["general_block"].level.mul(5))}, // Multiplicative Effect
    },
    duration: new Decimal(10),
    cooldown: new Decimal(25),
}

// Kres Skills
BHA.kres_chop = {
    name: "Chop",
    description() {return "Deals " + formatWhole(new Decimal(100).add(player.bh.skillData["kres_chop"].level.mul(20))) + "% physical damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["kres_chop"].maxLevel.div(5)) + " DMG"},
    char: "kres",
    spCost: new Decimal(4),
    curCostBase: new Decimal(20),
    curCostScale: new Decimal(4),
    currency: "gloomingUmbrite",
    unlocked: true,

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "physical",
    value() {return new Decimal(1).add(player.bh.skillData["kres_chop"].level.mul(0.2))},
    cooldown: new Decimal(8),
}
BHA.kres_bigAttack = {
    name: "Big Attack",
    description() {return "Deals " + formatWhole(new Decimal(200).add(player.bh.skillData["kres_bigAttack"].level.mul(40))) + "% physical damage at the cost of taking 50% self damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["kres_bigAttack"].maxLevel) + " HP"},
    char: "kres",
    spCost: new Decimal(6),
    curCostBase: new Decimal(10),
    curCostScale: new Decimal(3),
    currency: "dimUmbrite",
    unlocked() {return hasUpgrade("depth1", 1)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "physical",
    properties: {
        "backfire": [new Decimal(1), new Decimal(0.5)], // Backfire Chance / Backfire Damage (multiple of end damage)
    },
    value() {return new Decimal(2).add(player.bh.skillData["kres_bigAttack"].level.mul(0.4))},
    cooldown: new Decimal(20),
}
BHA.kres_battleCry = {
    name: "Battle Cry",
    description() {return "Boosts the entire team's damage by +" + formatWhole(new Decimal(50).add(player.bh.skillData["kres_battleCry"].level.mul(10))) + "% for 9s"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["kres_battleCry"].maxLevel.div(5)) + " DMG"},
    char: "kres",
    spCost: new Decimal(8),
    curCostBase: new Decimal(30),
    curCostScale: new Decimal(4),
    currency: "faintUmbrite",
    unlocked() {return hasUpgrade("depth2", 1)},

    active: true,
    constantType: "effect",
    constantTarget: "allPlayer",
    effects: {
        "damageMult"() {return new Decimal(1.5).add(player.bh.skillData["kres_battleCry"].level.mul(0.1))}, // Multiplicative Effect
    },
    cooldown: new Decimal(25),
    duration: new Decimal(9),
}
BHA.kres_decapitate = {
    name: "Decapitate",
    description() {return "Soft-stuns kres for 5 seconds, then deals " + formatWhole(new Decimal(300).add(player.bh.skillData["kres_decapitate"].level.mul(60))) + "% physical damage, with a 50% chance to deal double damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["kres_decapitate"].maxLevel.div(2), 2) + " LUCK"},
    char: "kres",
    spCost: new Decimal(10),
    curCostBase: new Decimal(40),
    curCostScale: new Decimal(4),
    currency: "vividUmbrite",
    unlocked() {return hasUpgrade("depth3", 1)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "physical",
    properties: {
        "crit": [new Decimal(0.5), new Decimal(2)], // Chance / Mult
    },
    value() {return new Decimal(3).add(player.bh.skillData["kres_decapitate"].level.mul(0.6))},
    delay: 5000, // In ms
    stun: ["soft", new Decimal(5)],
    cooldown: new Decimal(30),
}
BHA.kres_berserker = {
    name: "Berserker",
    description() {return "Increases Kres' damage, agility, and regen by +" + formatWhole(new Decimal(50).add(player.bh.skillData["kres_berserker"].level.mul(10))) + "%, but gain the Berserk<small>[20%]</small> attribute"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["kres_berserker"].maxLevel.div(20), 2) + " RGN"},
    char: "kres",
    spCost: new Decimal(12),
    curCostBase: new Decimal(40),
    curCostScale: new Decimal(4),
    currency: "vividUmbrite",
    unlocked: false,

    passive: true,
    constantType: "effect",
    constantTarget: "self",
    effects: {
        "damageMult"() {return new Decimal(1.5).add(player.bh.skillData["kres_berserker"].level.mul(0.1))}, // Multiplicative Effect
        "agilityMult"() {return new Decimal(1.5).add(player.bh.skillData["kres_berserker"].level.mul(0.1))}, // Multiplicative Effect
        "regenMult"() {return new Decimal(1.5).add(player.bh.skillData["kres_berserker"].level.mul(0.1))}, // Multiplicative Effect
        "attributes": {"berserk": new Decimal(0.2)},
    },
    cooldown: new Decimal(Infinity),
}

// Nav Skills
BHA.nav_magicMissle = {
    name: "Magic Missle",
    description() {return "Deals " + formatWhole(new Decimal(100).add(player.bh.skillData["nav_magicMissle"].level.mul(20))) + "% magic damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["nav_magicMissle"].maxLevel.div(5)) + " DMG"},
    char: "nav",
    spCost: new Decimal(4),
    curCostBase: new Decimal(20),
    curCostScale: new Decimal(4),
    currency: "gloomingUmbrite",
    unlocked: true,

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "magic",
    value() {return new Decimal(1).add(player.bh.skillData["nav_magicMissle"].level.mul(0.2))},
    cooldown: new Decimal(6),
}
BHA.nav_healSpell = {
    name: "Heal Spell",
    description() {return "Randomly heal a character by " + formatWhole(new Decimal(10).add(player.bh.skillData["nav_healSpell"].level.mul(2))) + " health"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["nav_healSpell"].maxLevel) + " HP"},
    char: "nav",
    spCost: new Decimal(8),
    curCostBase: new Decimal(10),
    curCostScale: new Decimal(3),
    currency: "dimUmbrite",
    unlocked() {return hasUpgrade("depth1", 2)},

    instant: true,
    type: "heal",
    target: "randomPlayer",
    value() {return new Decimal(10).add(player.bh.skillData["nav_healSpell"].level.mul(2))},
    cooldown: new Decimal(15),
}
BHA.nav_reboundingAura = {
    name: "Rebounding Aura",
    description() {return "Grants all characters the rebound attribute for 10 seconds, which rebounds " + formatWhole(new Decimal(50).add(player.bh.skillData["nav_reboundingAura"].level.mul(10))) + "% damage back to the celestialite."},
    passiveText() {return "+" + formatSimple(player.bh.skillData["nav_reboundingAura"].maxLevel.div(2)) + " DEF"},
    char: "nav",
    spCost: new Decimal(8),
    curCostBase: new Decimal(15),
    curCostScale: new Decimal(3),
    currency: "clearUmbrite",
    unlocked() {return hasUpgrade("depth2", 2)},

    active: true,
    constantType: "effect",
    constantTarget: "allPlayer",
    effects: {
        "attributes"() {return {"rebound": new Decimal(0.5).add(player.bh.skillData["nav_reboundingAura"].level.mul(0.1))}},
    },
    cooldown: new Decimal(30),
    duration: new Decimal(10),
}
BHA.nav_fireball = {
    name: "Fireball",
    description() {return "Shoot a fireball that does " + formatWhole(new Decimal(150).add(player.bh.skillData["nav_fireball"].level.mul(30))) + "% magic damage, but has a 25% chance to backfire, dealing 50% damage to yourself"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["nav_fireball"].maxLevel.div(2)) + " LUCK"},
    char: "nav",
    spCost: new Decimal(10),
    curCostBase: new Decimal(20),
    curCostScale: new Decimal(3),
    currency: "lustrousUmbrite",
    unlocked() {return hasUpgrade("depth3", 2)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "magic",
    properties: {
        "backfire": [new Decimal(0.25), new Decimal(0.5)], // Chance / Mult
    },
    value() {return new Decimal(1.5).add(player.bh.skillData["nav_fireball"].level.mul(0.3))},
    cooldown: new Decimal(6),
}
// Add chance to heal at end of round passive (Likely through adding to a BH array variable)

// Sel Skills
BHA.sel_singleShot = {
    name: "Single Shot",
    description() {return "Deals " + formatWhole(new Decimal(75).add(player.bh.skillData["sel_singleShot"].level.mul(15))) + "% ranged damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["sel_singleShot"].maxLevel.div(2)) + " AGI"},
    char: "sel",
    spCost: new Decimal(4),
    curCostBase: new Decimal(20),
    curCostScale: new Decimal(4),
    currency: "gloomingUmbrite",
    unlocked: true,

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "ranged",
    value() {return new Decimal(0.75).add(player.bh.skillData["sel_singleShot"].level.mul(0.15))},
    cooldown: new Decimal(4),
}
BHA.sel_turret = {
    name: "Turret",
    description() {return "A turret will attack every 0.5s for 12s, dealing " + formatWhole(new Decimal(20).add(player.bh.skillData["sel_turret"].level.mul(4))) + "% ranged damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["sel_turret"].maxLevel.div(2)) + " AGI"},
    char: "sel",
    spCost: new Decimal(6),
    curCostBase: new Decimal(10),
    curCostScale: new Decimal(3),
    currency: "dimUmbrite",
    unlocked() {return hasUpgrade("depth1", 3)},

    active: true,
    constantType: "damage",
    target: "celestialite",
    method: "ranged",
    value() {return new Decimal(0.2).add(player.bh.skillData["sel_turret"].level.mul(0.04))},
    interval: new Decimal(0.5),
    duration: new Decimal(12),
    cooldown: new Decimal(30),
}
BHA.sel_energyBoost = {
    name: "Energy Boost",
    description() {return "Reduces a random characters cooldowns by " + formatTime(new Decimal(6).add(player.bh.skillData["sel_energyBoost"].level.mul(1.2)))},
    passiveText() {return "+" + formatSimple(player.bh.skillData["sel_energyBoost"].maxLevel.div(2)) + " AGI"},
    char: "sel",
    spCost: new Decimal(8),
    curCostBase: new Decimal(15),
    curCostScale: new Decimal(3),
    currency: "clearUmbrite",
    unlocked() {return hasUpgrade("depth2", 3)},

    instant: true,
    type: "cooldown",
    target: "randomPlayer",
    value() {return new Decimal(6).add(player.bh.skillData["sel_energyBoost"].level.mul(1.2))},
    cooldown: new Decimal(20),
    cooldownCap: new Decimal(6),
}
BHA.sel_arrowBarrage = {
    name: "Arrow Barrage",
    description() {return "Shoots 5 arrows that deal " + formatWhole(new Decimal(50).add(player.bh.skillData["sel_arrowBarrage"].level.mul(10))) + "% ranged damage, but have a 50% chance to miss"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["sel_arrowBarrage"].maxLevel.div(2)) + " LUCK"},
    char: "sel",
    spCost: new Decimal(10),
    curCostBase: new Decimal(20),
    curCostScale: new Decimal(3),
    currency: "lustrousUmbrite",
    unlocked() {return hasUpgrade("depth3", 3)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "ranged",
    properties: {
        "multi-hit": [5, 200],
        "miss": 0.5,
    },
    value() {return new Decimal(0.5).add(player.bh.skillData["sel_arrowBarrage"].level.mul(0.1))},
    cooldown: new Decimal(6),
}

// Add chance to multiply celestialite rewards passive (Likely through adding to a BH array variable)
// Add a passive version of turret (Likely called mini-turret)

// Eclipse Skills
BHA.eclipse_drain = {
    name: "Drain",
    description() {return "Deal +" + formatWhole(new Decimal(10).add(player.bh.skillData["eclipse_drain"].level.mul(2))) + "% true damage per second, that is uneffected by effects"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["eclipse_drain"].maxLevel.div(5), 2) + " DMG"},
    char: "eclipse",
    spCost: new Decimal(6),
    curCostBase: new Decimal(10),
    curCostScale: new Decimal(2),
    currency: "eclipseShards",
    unlocked() {return getLevelableAmount("pet", 501).gt(0)},

    passive: true,
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "regenAdd"() {return player.bh.characterData["eclipse"].damage.mul(Decimal.sub(-0.1, player.bh.skillData["eclipse_drain"].level.mul(0.02)))}, // Multiplicative Effect
    },
    cooldown: new Decimal(Infinity),
}
BHA.eclipse_motivation = {
    name: "Motivation",
    description() {
        let eff = false
        let index
        let slot
        for (let i = 0; i < 3; i++) {
            if (player.bh.characters[i].id == "eclipse") {
                index = i
                for (let j = 0; j < 4; j++) {
                    if (player.bh.characters[i].skills[j].id == "eclipse_motivation") {
                        slot = j
                        if (player.bh.characters[i].skills[j].variables["damageMult"]) eff = true
                    }
                }
            }
        }
        if (!eff) {
            return "Repeating this skill will keep boosting the team's damage by +" + formatWhole(new Decimal(2).add(player.bh.skillData["eclipse_motivation"].level.mul(0.4))) + "%, with total boost square rooted"
        } else {
            return "Repeating this skill will keep boosting the team's damage by +" + formatWhole(new Decimal(2).add(player.bh.skillData["eclipse_motivation"].level.mul(0.4))) + "%, with total boost square rooted<br><small>[+" + formatSimple(Decimal.sub(player.bh.characters[index].skills[slot].variables["damageMult"], 1).mul(100)) + "% DMG Total]"
        }
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["eclipse_motivation"].maxLevel.div(5), 2) + " DMG"},
    char: "eclipse",
    spCost: new Decimal(8),
    curCostBase: new Decimal(20),
    curCostScale: new Decimal(2.5),
    currency: "eclipseShards",
    unlocked() {return hasUpgrade("sma", 221)},

    instant: true,
    type: "effect",
    target: "allPlayer",
    properties: {
        "damageDiminish"() {return new Decimal(0.02).add(player.bh.skillData["eclipse_motivation"].level.mul(0.004))}, // Diminishing Multiplicative Effect
    },
    cooldown: new Decimal(5),
    cooldownCap: new Decimal(1),
}
BHA.eclipse_lightBarrier = {
    name: "Light Barrier",
    description() {
        let time = "time"
        if (new Decimal(1).add(player.bh.skillData["eclipse_lightBarrier"].level.mul(0.2).floor()).neq(1)) time = "times"
        let str = "Soft-stuns you for " + formatTime(new Decimal(8).sub(player.bh.skillData["eclipse_lightBarrier"].level.modulo(5).div(2))) + ", then shield all players " + formatWhole(new Decimal(1).add(player.bh.skillData["eclipse_lightBarrier"].level.mul(0.2).floor())) + " " + time
        return str
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["eclipse_lightBarrier"].maxLevel.div(2)) + " DEF"},
    char: "eclipse",
    spCost: new Decimal(10),
    curCostBase: new Decimal(30),
    curCostScale: new Decimal(3),
    currency: "eclipseShards",
    unlocked() {return hasUpgrade("sma", 222)},

    instant: true,
    type: "shield",
    target: "allPlayer",
    value() {return new Decimal(1).add(player.bh.skillData["eclipse_lightBarrier"].level.mul(0.2).floor())},
    delay() {return 8000-(player.bh.skillData["eclipse_lightBarrier"].level.modulo(5).mul(500).toNumber())}, // In ms
    stun() {return ["soft", new Decimal(8).sub(player.bh.skillData["eclipse_lightBarrier"].level.modulo(5).div(2))]},
    cooldown: new Decimal(30),
    cooldownCap: new Decimal(10),
}
BHA.eclipse_syzygy = {
    name: "Syzygy",
    description() {return "Speed up time by +" + formatWhole(new Decimal(25).add(player.bh.skillData["eclipse_syzygy"].level.mul(5))) + "%"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["eclipse_syzygy"].maxLevel.div(2)) + " AGI"},
    char: "eclipse",
    spCost: new Decimal(12),
    curCostBase: new Decimal(50),
    curCostScale: new Decimal(5),
    currency: "eclipseShards",
    unlocked() {return hasUpgrade("sma", 223)},

    passive: true,
    constantType: "effect",
    constantTarget: "self",
    effects: {
        "timeMult"() {return new Decimal(1.25).add(player.bh.skillData["eclipse_syzygy"].level.mul(0.05))}, // Multiplicative Effect
    },
    cooldown: new Decimal(Infinity),
}

// Geroa Skills
BHA.geroa_radioactiveMissile = {
    name: "Radioactive Missile",
    description() {return "Shoot 4 missiles that deal " + formatWhole(new Decimal(30).add(player.bh.skillData["geroa_radioactiveMissile"].level.mul(6))) + "% ranged damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["geroa_radioactiveMissile"].maxLevel.div(2)) + " AGI"},
    char: "geroa",
    spCost: new Decimal(8),
    curCostBase: new Decimal(1000),
    curCostScale: new Decimal(10),
    currency: "spaceRock",
    unlocked() {return getLevelableAmount("pet", 502).gt(0)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "ranged",
    properties: {
        "multi-hit": [4, 250],
    },
    value() {return new Decimal(0.3).add(player.bh.skillData["geroa_radioactiveMissile"].level.mul(0.06))},
    cooldown: new Decimal(6),
}
BHA.geroa_selfRepair = {
    name: "Self Repair",
    description() {return "If under 25% health, heal yourself for " + formatWhole(new Decimal(25).add(player.bh.skillData["geroa_selfRepair"].level.mul(5))) + " health"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["geroa_selfRepair"].maxLevel) + " HP"},
    char: "geroa",
    spCost: new Decimal(10),
    curCostBase: new Decimal(5000),
    curCostScale: new Decimal(25),
    currency: "spaceRock",
    unlocked() {return hasUpgrade("ir", 201)},

    instant: true,
    type: "heal",
    target: "self",
    value() {return new Decimal(25).add(player.bh.skillData["geroa_selfRepair"].level.mul(5))},
    conditional(index, slot) {
        if (index == 3) {console.log("what");return false}
        return player.bh.characters[index].health.lte(player.bh.characters[index].maxHealth.div(4))
    },
    cooldown: new Decimal(30),
}
BHA.geroa_cosmicRay = {
    name: "Cosmic Ray",
    description() {return "Deal " + formatWhole(new Decimal(40).add(player.bh.skillData["geroa_cosmicRay"].level.mul(8))) + "% true damage per second for 5 seconds"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["geroa_cosmicRay"].maxLevel.div(5)) + " DMG"},
    char: "geroa",
    spCost: new Decimal(12),
    curCostBase: new Decimal(20000),
    curCostScale: new Decimal(50),
    currency: "spaceRock",
    unlocked() {return hasUpgrade("ir", 202)},

    active: true,
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "regenAdd"() {return player.bh.characterData["geroa"].damage.mul(Decimal.sub(-0.4, player.bh.skillData["geroa_cosmicRay"].level.mul(0.08)))}, // Multiplicative Effect
    },
    duration: new Decimal(5),
    cooldown: new Decimal(20),
}
BHA.geroa_orbitalCannon = {
    name: "Orbital Cannon",
    description() {return "Hard-stuns Geroa for 10 seconds, then deals x" + formatWhole(new Decimal(10).add(player.bh.skillData["geroa_orbitalCannon"].level.mul(2))) + " ranged damage split into 10 hits, and hard-stuns the celestialite for 5 seconds"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["geroa_orbitalCannon"].maxLevel.div(5)) + " DMG"},
    char: "geroa",
    spCost: new Decimal(14),
    curCostBase: new Decimal(100000),
    curCostScale: new Decimal(100),
    currency: "spaceRock", // Temp, probably something else
    unlocked() {return hasUpgrade("ir", 203)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "ranged",
    properties: {
        "stun": [new Decimal(1), "hard", new Decimal(5)], // Chance / Stun-Type / Stun-Time
        "multi-hit": [10, 100], // Amount / Delay
    },
    value() {return new Decimal(1).add(player.bh.skillData["geroa_orbitalCannon"].level.mul(0.2))},
    delay: 10000, // In ms
    stun: ["hard", new Decimal(10)],
    cooldown: new Decimal(60),
}