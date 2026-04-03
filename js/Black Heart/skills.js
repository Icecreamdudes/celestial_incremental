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
    description(char) {
        let heal = new Decimal(10).add(player.bh.skillData["general_bandage"].level.mul(2))
        if (player.matosLair.milestone[25] >= 2) heal = heal.mul(char.mending.div(10).add(1))
        return "Heal yourself by " + formatWhole(heal) + " health"
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_bandage"].maxLevel) + " HP"},
    char: "general",
    spCost: new Decimal(8),
    curCostBase: new Decimal(5),
    curCostScale: new Decimal(5),
    currency: "darkEssence",
    unlocked() {return hasUpgrade("depth2", 4)},

    instant: true,
    type: "heal",
    target: "self",
    value() {return new Decimal(10).add(player.bh.skillData["general_bandage"].level.mul(2))},
    cooldown: new Decimal(15),
    cooldownCap: new Decimal(5),
}
BHA.general_scream = {
    name: "Scream",
    description(char) {
        let effect = new Decimal(0.5).add(player.bh.skillData["general_scream"].level.mul(0.1))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        return "Taunt damage and buffs towards yourself and give yourself " + formatSimple(effect, 2) + " regen for 10 seconds"
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_scream"].maxLevel.div(40), 2) + " RGN"},
    char: "general",
    spCost: new Decimal(12),
    curCostBase: new Decimal(8),
    curCostScale: new Decimal(8),
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
    cooldownCap: new Decimal(5),
}
BHA.general_recklessAbandon = {
    name: "Reckless Abandon",
    description(char) {
        let effect = new Decimal(20).add(player.bh.skillData["general_recklessAbandon"].level.mul(2))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        return "Convert " + formatWhole(new Decimal(25).add(player.bh.skillData["general_recklessAbandon"].level.mul(5))) + "% of your health into damage, at " + formatSimple(effect) + "% efficiency"
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_recklessAbandon"].maxLevel) + " HP"},
    char: "general",
    spCost: new Decimal(10),
    curCostBase: new Decimal(15),
    curCostScale: new Decimal(2),
    currency: "temporalShard",
    unlocked() {return hasUpgrade("stagnantSynestia", 4)},

    passive: true,
    constantType: "effect",
    constantTarget: "self",
    effects: {
        "damageAdd"(char) {return char.health.mul(Decimal.add(0.25, player.bh.skillData["general_recklessAbandon"].level.mul(0.05)).mul(Decimal.add(0.2, player.bh.skillData["general_recklessAbandon"].level.mul(0.02))))}, // Additive Effect
        "healthMult"(char) {return Decimal.sub(1, Decimal.add(0.25, player.bh.skillData["general_recklessAbandon"].level.mul(0.05)))}, // Multiplicative Effect
    },
    cooldown: new Decimal(Infinity),
}
BHA.general_block = {
    name: "Block",
    description(char) {
        let effect = new Decimal(25).add(player.bh.skillData["general_block"].level.mul(5))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        return "Shield yourself and increase your defense by " + formatSimple(effect)
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_block"].maxLevel.div(2)) + " DEF"},
    char: "general",
    spCost: new Decimal(10),
    curCostBase: new Decimal(50),
    curCostScale: new Decimal(4),
    currency: "gloomingNocturnium",
    unlocked() {return hasUpgrade("depth4", 1)},

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
    cooldownCap: new Decimal(5),
}
BHA.general_poisonNeedle = {
    name: "Poison Needle",
    description() {return "Shoot a poison needle that does " + formatWhole(new Decimal(75).add(player.bh.skillData["general_poisonNeedle"].level.mul(15))) + "% ranged damage, then " + formatWhole(new Decimal(10).add(player.bh.skillData["general_poisonNeedle"].level.mul(2))) + "% spirit damage per second for 5 seconds"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_poisonNeedle"].maxLevel.div(2)) + " AGI"},
    char: "general",
    spCost: new Decimal(14),
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(3),
    currency: "dimNocturnium",
    unlocked() {return hasUpgrade("depth4", 2)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "ranged",
    value() {return new Decimal(0.75).add(player.bh.skillData["general_poisonNeedle"].level.mul(0.15))},

    active: true,
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "regenAdd"(char) {
            let damage = char.damage.mul(Decimal.sub(-0.1, player.bh.skillData["general_poisonNeedle"].level.mul(0.02)))
            damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.defense)))
            return damage
        },
    },
    duration: new Decimal(5),
    cooldown: new Decimal(10),
    cooldownCap: new Decimal(2),
}

//Rest: Character is unavailable to perform actions for 20 seconds but regen is boosted by x4
// Skill that disables regen but increases damage.

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
    cooldownCap: new Decimal(2),
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
    cooldown: new Decimal(15),
    cooldownCap: new Decimal(4),
}
BHA.kres_battleCry = {
    name: "Battle Cry",
    description(char) {
        let effect = new Decimal(50).add(player.bh.skillData["kres_battleCry"].level.mul(10))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        return "Boosts the entire team's damage by +" + formatSimple(effect) + "% for 9s"
    },
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
    cooldownCap: new Decimal(4.5),
}
BHA.kres_decapitate = {
    name: "Decapitate",
    description(char) {return "Soft-stuns kres for 5 seconds, then deals " + formatWhole(new Decimal(300).add(player.bh.skillData["kres_decapitate"].level.mul(60))) + "% physical damage, with a " + formatSimple(Decimal.mul(50, Decimal.div(Decimal.add(100, char.luck), 100))) + "% chance to deal double damage"},
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
    stun() {return ["soft", new Decimal(5), player.bh.skillData["kres_decapitate"].selected[1]]},
    cooldown: new Decimal(30),
    cooldownCap: new Decimal(5),
}
BHA.kres_berserker = {
    name: "Berserker",
    description(char) {
        let effect = new Decimal(50).add(player.bh.skillData["kres_berserker"].level.mul(10))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        return "Increases Kres' damage, agility, and regen by +" + formatSimple(effect) + "%, but gain the Berserk<small>[20%]</small> attribute"
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["kres_berserker"].maxLevel.div(40), 2) + " RGN"},
    char: "kres",
    spCost: new Decimal(12),
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(3),
    currency: "temporalDust",
    unlocked() {return hasUpgrade("stagnantSynestia", 1)},

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
    cooldownCap: new Decimal(1.5),
}
BHA.nav_healSpell = {
    name: "Heal Spell",
    description(char) {
        let heal = new Decimal(10).add(player.bh.skillData["nav_healSpell"].level.mul(2))
        if (player.matosLair.milestone[25] >= 2) heal = heal.mul(char.mending.div(10).add(1))
        return "Randomly heal a character by " + formatWhole(heal) + " health"
    },
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
    cooldownCap: new Decimal(5),
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
    cooldownCap: new Decimal(5),
}
BHA.nav_fireball = {
    name: "Fireball",
    description(char) {return "Shoot a fireball that does " + formatWhole(new Decimal(150).add(player.bh.skillData["nav_fireball"].level.mul(30))) + "% magic damage, but has a " + formatSimple(Decimal.div(25, Decimal.div(Decimal.add(100, char.luck), 100))) + "% chance to backfire, dealing 50% damage to yourself"},
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
    cooldownCap: new Decimal(1.5),
}
BHA.nav_soulShred = {
    name: "Soul Shred",
    description(char) {return "Gain a " + formatSimple(Decimal.mul(8, Decimal.div(Decimal.add(100, char.luck), 100))) + "% chance to deal " + formatWhole(new Decimal(20).add(player.bh.skillData["nav_soulShred"].level.mul(4))) + "% spirit damage per second for 10 seconds when Nav does an action"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["nav_soulShred"].maxLevel.div(2)) + " LUCK"},
    char: "nav",
    spCost: new Decimal(12),
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(3),
    currency: "temporalDust",
    unlocked() {return hasUpgrade("stagnantSynestia", 2)},

    passive: true,
    active: true,
    actionChance() {return [player.bh.skillData["nav_soulShred"].selected[1], 0.08]},
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "regenAdd"(char) {
            let damage = char.damage.mul(Decimal.sub(-0.2, player.bh.skillData["nav_soulShred"].level.mul(0.04)))
            damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.defense)))
            return damage
        },
    },
    duration: new Decimal(10),
    cooldown: new Decimal(Infinity),
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
    cooldownCap: new Decimal(1),
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
    cooldownCap: new Decimal(6),
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
    cooldownCap: new Decimal(10),
}
BHA.sel_arrowBarrage = {
    name: "Arrow Barrage",
    description(char) {return "Shoots 5 arrows that deal " + formatWhole(new Decimal(50).add(player.bh.skillData["sel_arrowBarrage"].level.mul(10))) + "% ranged damage, but have a " + formatSimple(Decimal.div(50, Decimal.div(Decimal.add(100, char.luck), 100))) + "% chance to miss"},
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
    cooldownCap: new Decimal(2),
}
BHA.sel_scavenger = {
    name: "Scavenger",
    description(char) {
        let effect = new Decimal(10).add(player.bh.skillData["sel_scavenger"].level.mul(2))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        return "Gain a +" + formatSimple(effect) + "% chance to double celestialite rewards"
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["sel_scavenger"].maxLevel.div(2)) + " LUCK"},
    char: "sel",
    spCost: new Decimal(12),
    curCostBase: new Decimal(12),
    curCostScale: new Decimal(2),
    currency: "temporalShard",
    unlocked() {return hasUpgrade("stagnantSynestia", 3)},

    passive: true,
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "curAdd"() {return new Decimal(0.1).add(player.bh.skillData["sel_scavenger"].level.mul(0.02))}, // Multiplicative Effect
    },
    cooldown: new Decimal(Infinity),
}

// Add a passive version of turret (Likely called mini-turret)

// Eclipse Skills
BHA.eclipse_drain = {
    name: "Drain",
    description() {return "Deal " + formatWhole(new Decimal(10).add(player.bh.skillData["eclipse_drain"].level.mul(2))) + "% spirit damage per second"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["eclipse_drain"].maxLevel.div(5)) + " DMG"},
    char: "eclipse",
    spCost: new Decimal(6),
    curCostBase: new Decimal(5),
    curCostScale: new Decimal(2),
    currency: "eclipseShards",
    unlocked() {return getLevelableAmount("pet", 501).gt(0)},

    passive: true,
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "regenAdd"(char) {
            let damage = char.damage.mul(Decimal.sub(-0.1, player.bh.skillData["eclipse_drain"].level.mul(0.02)))
            damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.defense)))
            return damage
        }, // Multiplicative Effect
    },
    cooldown: new Decimal(Infinity),
}
BHA.eclipse_motivation = {
    name: "Motivation",
    description(char) {
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
        let effect = new Decimal(2).add(player.bh.skillData["eclipse_motivation"].level.mul(0.4))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        if (!eff) {
            return "Repeating this skill will keep boosting the team's damage by +" + formatSimple(effect) + "%, with total boost square rooted"
        } else {
            return "Repeating this skill will keep boosting the team's damage by +" + formatSimple(effect) + "%, with total boost square rooted<br><small>[+" + formatSimple(Decimal.sub(player.bh.characters[index].skills[slot].variables["damageMult"], 1).mul(100)) + "% DMG Total]"
        }
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["eclipse_motivation"].maxLevel.div(5), 2) + " DMG"},
    char: "eclipse",
    spCost: new Decimal(8),
    curCostBase: new Decimal(10),
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
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(3),
    currency: "eclipseShards",
    unlocked() {return hasUpgrade("sma", 222)},

    instant: true,
    type: "shield",
    target: "allPlayer",
    value() {return new Decimal(1).add(player.bh.skillData["eclipse_lightBarrier"].level.mul(0.2).floor())},
    stun() {return ["soft", new Decimal(8).sub(player.bh.skillData["eclipse_lightBarrier"].level.modulo(5).div(2)), player.bh.skillData["eclipse_lightBarrier"].selected[1]]},
    cooldown: new Decimal(30),
    cooldownCap: new Decimal(10),
}
BHA.eclipse_solarRetinopathy = {
    name: "Solar Retinopathy",
    description() {return "Shoot a solar ray that deals " + formatWhole(new Decimal(75).add(player.bh.skillData["eclipse_solarRetinopathy"].level.mul(15))) + "% spirit damage and dazes the celestial for 3 seconds."},
    passiveText() {return "+" + formatSimple(player.bh.skillData["eclipse_solarRetinopathy"].maxLevel.div(5)) + " DMG"},
    char: "eclipse",
    spCost: new Decimal(12),
    curCostBase: new Decimal(100),
    curCostScale: new Decimal(4),
    currency: "eclipseShards",
    unlocked() {return hasUpgrade("sma", 223)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "true",
    value() {return new Decimal(0.75).add(player.bh.skillData["eclipse_solarRetinopathy"].level.mul(0.15))},
    active: true,
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "attributes"() {return {"daze": new Decimal(0.5)}},
    },
    duration: new Decimal(3),
    cooldown: new Decimal(15),
    cooldownCap: new Decimal(6),
}
BHA.eclipse_syzygy = {
    name: "Syzygy",
    description(char) {
        let effect = new Decimal(25).add(player.bh.skillData["eclipse_syzygy"].level.mul(5))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        return "Speed up time by +" + formatSimple(effect) + "%"
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["eclipse_syzygy"].maxLevel.div(2)) + " AGI"},
    char: "eclipse",
    spCost: new Decimal(14),
    curCostBase: new Decimal(500),
    curCostScale: new Decimal(5),
    currency: "eclipseShards",
    unlocked() {return hasUpgrade("sma", 224)},

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
    curCostScale: new Decimal(1000),
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
    cooldownCap: new Decimal(1.5),
}
BHA.geroa_selfRepair = {
    name: "Self Repair",
    description(char) {
        let heal = new Decimal(25).add(player.bh.skillData["geroa_selfRepair"].level.mul(5))
        if (player.matosLair.milestone[25] >= 2) heal = heal.mul(char.mending.div(10).add(1))
        return "If under 25% health, heal yourself for " + formatWhole(heal) + " health"
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["geroa_selfRepair"].maxLevel) + " HP"},
    char: "geroa",
    spCost: new Decimal(10),
    curCostBase: new Decimal(5000),
    curCostScale: new Decimal(2500),
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
    cooldownCap: new Decimal(10),
}
BHA.geroa_cosmicRay = {
    name: "Cosmic Ray",
    description() {return "Deal " + formatWhole(new Decimal(40).add(player.bh.skillData["geroa_cosmicRay"].level.mul(8))) + "% spirit damage per second for 5 seconds"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["geroa_cosmicRay"].maxLevel.div(5)) + " DMG"},
    char: "geroa",
    spCost: new Decimal(12),
    curCostBase: new Decimal(20000),
    curCostScale: new Decimal(5000),
    currency: "spaceRock",
    unlocked() {return hasUpgrade("ir", 202)},

    active: true,
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "regenAdd"(char) {
            let damage = char.damage.mul(Decimal.sub(-0.4, player.bh.skillData["geroa_cosmicRay"].level.mul(0.08)))
            damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.defense)))
            return damage
        }, // Multiplicative Effect
    },
    duration: new Decimal(5),
    cooldown: new Decimal(20),
    cooldownCap: new Decimal(5),
}
BHA.geroa_orbitalCannon = {
    name: "Orbital Cannon",
    description() {return "Hard-stuns Geroa for 10 seconds, then deals x" + formatWhole(new Decimal(10).add(player.bh.skillData["geroa_orbitalCannon"].level.mul(2))) + " ranged damage split into 10 hits, and hard-stuns the celestialite for 5 seconds"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["geroa_orbitalCannon"].maxLevel.div(5)) + " DMG"},
    char: "geroa",
    spCost: new Decimal(14),
    curCostBase: new Decimal(100000),
    curCostScale: new Decimal(10000),
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
    stun() {return ["hard", new Decimal(10), player.bh.skillData["geroa_cosmicRay"].selected[1]]},
    cooldown: new Decimal(60),
    cooldownCap: new Decimal(10),
}
BHA.geroa_defenseSatellites = {
    name: "Defense Satellites",
    description() {return "Geroa's satellites shoot 3 lasers every 3 seconds, dealing " + formatWhole(new Decimal(15).add(player.bh.skillData["geroa_defenseSatellites"].level.mul(3))) + "% ranged damage each"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["geroa_defenseSatellites"].maxLevel.div(5)) + " DMG"},
    char: "geroa",
    spCost: new Decimal(16),
    curCostBase: new Decimal(1e6),
    curCostScale: new Decimal(1e5),
    currency: "spaceRock",
    unlocked() {return hasUpgrade("ir", 204)},

    passive: true,
    constantType: "damage",
    target: "celestialite",
    method: "ranged",
    properties: {
        "multi-hit": [3, 100],
    },
    value() {return new Decimal(0.15).add(player.bh.skillData["geroa_defenseSatellites"].level.mul(0.03))},
    interval: new Decimal(3),
    cooldown: new Decimal(Infinity),
}

// Vespasian Skills
BHA.vespasian_poisonStinger = {
    name: "Poison Stinger",
    description() {return "Shoots 3 poison stingers that do " + formatWhole(new Decimal(25).add(player.bh.skillData["vespasian_poisonStinger"].level.mul(5))) + "% ranged damage, then " + formatWhole(new Decimal(10).add(player.bh.skillData["vespasian_poisonStinger"].level.mul(2))) + "% spirit damage per second for 5 seconds"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["vespasian_poisonStinger"].maxLevel.div(2)) + " AGI"},
    char: "vespasian",
    spCost: new Decimal(10),
    curCostBase: new Decimal(64),
    curCostScale: new Decimal(4),
    currency: "matosDust",
    unlocked: true,

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "ranged",
    value() {return new Decimal(0.25).add(player.bh.skillData["vespasian_poisonStinger"].level.mul(0.05))},
    properties: {
        "multi-hit": [3, 250],
    },

    active: true,
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "regenAdd"(char) {
            let damage = char.damage.mul(Decimal.sub(-0.1, player.bh.skillData["vespasian_poisonStinger"].level.mul(0.02)))
            damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.defense)))
            return damage
        },
    },
    duration: new Decimal(5),
    cooldown: new Decimal(10),
    cooldownCap: new Decimal(2),
}

BHA.vespasian_paralyticBite = {
    name: "Paralytic Bite",
    description() {return "Bite the enemy for " + formatSimple(new Decimal(75).add(player.bh.skillData["vespasian_paralyticBite"].level.mul(15))) + "% physical damage, then reduce the celestialites agility and defense by " + formatSimple(new Decimal(15).add(player.bh.skillData["vespasian_paralyticBite"].level.mul(3))) + " for 5 seconds"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["vespasian_paralyticBite"].maxLevel.div(2)) + " AGI"},
    char: "vespasian",
    spCost: new Decimal(12),
    curCostBase: new Decimal(256),
    curCostScale: new Decimal(6),
    currency: "matosDust",
    unlocked() {return hasUpgrade("laboratory", 1)},

    instant: true,
    type: "damage",
    target: "celestialite",
    method: "physical",
    value() {return new Decimal(0.75).add(player.bh.skillData["vespasian_paralyticBite"].level.mul(0.05))},

    active: true,
    constantType: "effect",
    constantTarget: "celestialite",
    effects: {
        "defenseAdd"() {return new Decimal(-15).sub(player.bh.skillData["vespasian_paralyticBite"].level.mul(3))},
        "agilityAdd"() {return new Decimal(-15).sub(player.bh.skillData["vespasian_paralyticBite"].level.mul(3))},
    },
    duration: new Decimal(5),
    cooldown: new Decimal(12),
    cooldownCap: new Decimal(2),
}

BHA.vespasian_overdrive = {
    name: "Overdrive",
    description(char) {
        let effect = new Decimal(new Decimal(50).add(player.bh.skillData["vespasian_overdrive"].level.mul(10)))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        return "Buff Vespasians damage and agility by " + formatSimple(effect) + "%, reduce defense by " + formatSimple(new Decimal(25).add(player.bh.skillData["vespasian_overdrive"].level.mul(5))) + ", and nullify regen for 8 seconds"
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["vespasian_overdrive"].maxLevel.div(2)) + " DEF"},
    char: "vespasian",
    spCost: new Decimal(14),
    curCostBase: new Decimal(4096),
    curCostScale: new Decimal(8),
    currency: "matosDust",
    unlocked() {return hasUpgrade("laboratory", 2)},

    active: true,
    constantType: "effect",
    constantTarget: "self",
    effects: {
        "damageMult"() {return new Decimal(1.5).add(player.bh.skillData["vespasian_overdrive"].level.div(10))},
        "agilityMult"() {return new Decimal(1.5).add(player.bh.skillData["vespasian_overdrive"].level.div(10))},
        "defenseAdd"() {return new Decimal(-25).sub(player.bh.skillData["vespasian_overdrive"].level.mul(5))},
        "regenMult"() {return new Decimal(0)},
    },
    duration: new Decimal(8),
    cooldown: new Decimal(20),
    cooldownCap: new Decimal(4),
}

BHA.vespasian_impale = {
    name: "Impale",
    description(char) {return "Deals " + formatSimple(new Decimal(new Decimal(150).add(player.bh.skillData["vespasian_impale"].level.mul(30)))) + "% physical damage with a " + formatSimple(Decimal.mul(50, Decimal.div(Decimal.add(100, char.luck), 100))) + "% chance to deal double damage, at the cost of taking 50% self damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["vespasian_impale"].maxLevel.div(2)) + " LUCK"},
    char: "vespasian",
    spCost: new Decimal(16),
    curCostBase: new Decimal(16),
    curCostScale: new Decimal(4),
    currency: "matosShard",
    unlocked() {return hasUpgrade("laboratory", 11)},

    instant: true,
    type: "damage",
    target: "celestialite",
    properties: {
        "crit": [new Decimal(0.3), new Decimal(2)],
        "backfire": [new Decimal(1), new Decimal(0.5)],
    },
    value() {return new Decimal(1.5).add(player.bh.skillData["vespasian_impale"].level.mul(0.3))},
    cooldown: new Decimal(15),
    cooldownCap: new Decimal(3),
}

BHA.vespasian_peakPerformance = {
    name: "Peak Performance",
    description(char) {
        let eff = false
        let index
        let slot
        for (let i = 0; i < 3; i++) {
            if (player.bh.characters[i].id == "vespasian") {
                index = i
                for (let j = 0; j < 4; j++) {
                    if (player.bh.characters[i].skills[j].id == "vespasian_peakPerformance") {
                        slot = j
                        if (player.bh.characters[i].skills[j].variables["damageMult"]) eff = true
                    }
                }
            }
        }
        let effect = new Decimal(new Decimal(100).add(player.bh.skillData["vespasian_peakPerformance"].level.mul(20)))
        if (player.alephsChamber.milestone[25] >= 2) effect = effect.mul(Decimal.div(char.potency.add(100), 100))
        if (!eff) {
            return "Buff damage by up to " + formatSimple(effect) + "% based on your current health"
        } else {
            return "Buff damage by up to " + formatSimple(effect) + "% based on your current health<br><small>[Currently: +" + formatSimple(Decimal.sub(Decimal.sub(player.bh.characters[index].skills[slot].variables["damageMult"], 1).mul(100))) + "% DMG]"
        }
    },
    passiveText() {return "+" + formatSimple(player.bh.skillData["vespasian_peakPerformance"].maxLevel) + " HP"},
    char: "vespasian",
    spCost: new Decimal(18),
    curCostBase: new Decimal(18),
    curCostScale: new Decimal(6),
    currency: "matosShard",
    unlocked() {return hasUpgrade("laboratory", 12)},

    passive: true,
    constantType: "effect",
    constantTarget: "self",
    effects: {
        "damageMult"(char) {
            if (char.maxHealth) {
                return char.health.div(char.maxHealth).mul(new Decimal(new Decimal(1).add(player.bh.skillData["vespasian_peakPerformance"].level.div(5)))).add(1)
            } else {
                return new Decimal(new Decimal(2).add(player.bh.skillData["vespasian_peakPerformance"].level.div(5)))
            }
        },
    },
    cooldown: new Decimal(Infinity)
}

// NON-VESPASIAN SKILL IDEAS

// A skill that temporarily increases team agility and decreases celestialite agility

// A skill that increases the teams regen stat (like motivation, the total is square rooted)

// A passive skill that gives the chance for an action to trigger a team buff that doubles damage

// A skill that passively gives you one of the three resistance attributes. Has an instant part of it that cycles the attribute