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

    effect: "instant",
    cooldown: new Decimal(Infinity),
}

// General Skills
BHA.general_slap = {
    name: "Slap",
    description() {return "Deals " + formatWhole(new Decimal(75).add(player.bh.skillData["general_slap"].level.mul(15))) + "% physical damage and stuns the celestialite for a second."},
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_slap"].maxLevel.div(5)) + " DMG"},
    char: "general",
    spCost: new Decimal(6),
    curCostBase: new Decimal(2),
    curCostScale: new Decimal(2),
    currency: "darkEssence",
    unlocked: true,

    effect: "instant",
    type: "damage",
    target: "celestialite",
    method: "physical",
    properties: {
        "stun": [new Decimal(1), new Decimal(1)], // Chance / Time
    },
    value() {return new Decimal(0.75).add(player.bh.skillData["general_slap"].level.mul(0.15))},
    cooldown: new Decimal(10),
}
BHA.general_bandage = {
    name: "Bandage",
    description() {return "Heal yourself by " + formatWhole(new Decimal(10).add(player.bh.skillData["general_bandage"].level.mul(2))) + " health"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_bandage"].maxLevel) + " HP"},
    char: "general",
    spCost: new Decimal(8),
    curCostBase: new Decimal(2),
    curCostScale: new Decimal(2),
    currency: "darkEssence",
    unlocked: true,

    effect: "instant",
    type: "heal",
    target: "self",
    value() {return new Decimal(10).add(player.bh.skillData["general_bandage"].level.mul(2))},
    cooldown: new Decimal(15),
}

// Kres Skills
BHA.kres_chop = {
    name: "Chop",
    description() {return "Deals " + formatWhole(new Decimal(100).add(player.bh.skillData["kres_chop"].level.mul(20))) + "% physical damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["kres_chop"].maxLevel.div(5)) + " DMG"},
    char: "kres",
    spCost: new Decimal(6),
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(25),
    currency: "gloomingUmbrite",
    unlocked: true,

    effect: "instant",
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
    spCost: new Decimal(4),
    curCostBase: new Decimal(10),
    curCostScale: new Decimal(10),
    currency: "dimUmbrite",
    unlocked: true,

    effect: "instant",
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
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(25),
    currency: "faintUmbrite",
    unlocked: true,

    effect: "active",
    type: "effect",
    target: "allPlayer",
    properties: {
        "damageMult"() {return new Decimal(1.5).add(player.bh.skillData["kres_battleCry"].level.mul(0.1))}, // Multiplicative Effect
    },
    cooldown: new Decimal(25),
    duration: new Decimal(9),
}
BHA.kres_berserker = {
    name: "Berserker",
    description() {return "Increases Kres' damage, agility, and regen by +" + formatWhole(new Decimal(50).add(player.bh.skillData["kres_berserker"].level.mul(10))) + "%, but gain the Berserk<small>[20%]</small> attribute"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["kres_berserker"].maxLevel.div(20), 2) + " RGN"},
    char: "kres",
    spCost: new Decimal(5),
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(25),
    currency: "vividUmbrite",
    unlocked: true,

    effect: "passive",
    type: "effect",
    target: "self",
    properties: {
        "damageMult"() {return new Decimal(1.5).add(player.bh.skillData["kres_berserker"].level.mul(0.1))}, // Multiplicative Effect
        "agilityMult"() {return new Decimal(1.5).add(player.bh.skillData["kres_berserker"].level.mul(0.1))}, // Multiplicative Effect
        "regenMult"() {return new Decimal(1.5).add(player.bh.skillData["kres_berserker"].level.mul(0.1))}, // Multiplicative Effect
        "attributes": {"berserk": new Decimal(0.2)},
    },
    cooldown: new Decimal(Infinity),
}
BHA.kres_decapitate = {
    name: "Decapitate",
    description() {return "Stuns kres for 5 seconds, then deals " + formatWhole(new Decimal(200).add(player.bh.skillData["kres_decapitate"].level.mul(40))) + "% physical damage, with a 50% chance to deal double damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["kres_decapitate"].maxLevel.div(2), 2) + " LUCK"},
    char: "kres",
    spCost: new Decimal(10),
    curCostBase: new Decimal(10),
    curCostScale: new Decimal(10),
    currency: "lustrousUmbrite",
    unlocked: true,

    effect: "instant",
    type: "damage",
    target: "celestialite",
    method: "physical",
    properties: {
        "crit": [new Decimal(0.5), new Decimal(2)], // Chance / Mult
    },
    value() {return new Decimal(2).add(player.bh.skillData["kres_decapitate"].level.mul(0.4))},
    delay: 5000, // In ms
    stun: new Decimal(5),
    cooldown: new Decimal(40),
}

// Nav Skills
BHA.nav_magicMissle = {
    name: "Magic Missle",
    description() {return "Deals " + formatWhole(new Decimal(100).add(player.bh.skillData["nav_magicMissle"].level.mul(20))) + "% magic damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["nav_magicMissle"].maxLevel.div(5)) + " DMG"},
    char: "nav",
    spCost: new Decimal(6),
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(25),
    currency: "gloomingUmbrite",
    unlocked: true,

    effect: "instant",
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
    curCostScale: new Decimal(10),
    currency: "dimUmbrite",
    unlocked: true,

    effect: "instant",
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
    spCost: new Decimal(10),
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(25),
    currency: "faintUmbrite",
    unlocked: true,

    effect: "active",
    type: "effect",
    target: "allPlayer",
    properties: {
        "attributes"() {return {"rebound": new Decimal(0.5).add(player.bh.skillData["nav_reboundingAura"].level.mul(0.1))}},
    },
    cooldown: new Decimal(30),
    duration: new Decimal(10),
}
// Add chance to heal at end of round passive (Likely through adding to a BH array variable)

// Sel Skills
BHA.sel_singleShot = {
    name: "Single Shot",
    description() {return "Deals " + formatWhole(new Decimal(100).add(player.bh.skillData["sel_singleShot"].level.mul(20))) + "% ranged damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["sel_singleShot"].maxLevel.div(2)) + " AGI"},
    char: "sel",
    spCost: new Decimal(6),
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(25),
    currency: "gloomingUmbrite",
    unlocked: true,

    effect: "instant",
    type: "damage",
    target: "celestialite",
    method: "ranged",
    value() {return new Decimal(1).add(player.bh.skillData["sel_singleShot"].level.mul(0.2))},
    cooldown: new Decimal(4),
}
BHA.sel_turret = {
    name: "Turret",
    description() {return "A turret will attack every 0.5s for 12s, dealing " + formatWhole(new Decimal(20).add(player.bh.skillData["sel_turret"].level.mul(4))) + "% ranged damage"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["sel_turret"].maxLevel.div(2)) + " AGI"},
    char: "sel",
    spCost: new Decimal(6),
    curCostBase: new Decimal(10),
    curCostScale: new Decimal(10),
    currency: "dimUmbrite",
    unlocked: true,

    effect: "active",
    type: "damage",
    target: "celestialite",
    method: "ranged",
    value() {return new Decimal(0.2).add(player.bh.skillData["sel_turret"].level.mul(0.04))},
    interval: new Decimal(0.5),
    duration: new Decimal(12),
    cooldown: new Decimal(30),
}

// Add chance to multiply celestialite rewards passive (Likely through adding to a BH array variable)
// Add a passive version of turret (Likely called mini-turret)

// Eclipse Skills
BHA.eclipse_drain = {
    name: "Drain",
    description() {return "Deal +" + formatWhole(new Decimal(10).add(player.bh.skillData["eclipse_drain"].level.mul(2))) + "% true damage per second, that is uneffected by effects"},
    passiveText() {return "+" + formatSimple(player.bh.skillData["eclipse_drain"].maxLevel.div(5), 2) + " DMG"},
    char: "eclipse",
    spCost: new Decimal(8),
    curCostBase: new Decimal(10),
    curCostScale: new Decimal(2),
    currency: "eclipseShards",
    unlocked: true,

    effect: "passive",
    type: "effect",
    target: "celestialite",
    properties: {
        "regenAdd"() {return player.bh.characterData["eclipse"].damage.mul(Decimal.sub(-0.1, player.bh.skillData["eclipse_drain"].level.mul(0.02)))}, // Multiplicative Effect
    },
    cooldown: new Decimal(Infinity),
}

// Geroa Skills
BHA.geroa_orbitalCannon = {
    name: "Orbital Cannon",
    description() {return "Stuns Geroa for 10 seconds, then deals " + formatWhole(new Decimal(400).add(player.bh.skillData["geroa_orbitalCannon"].level.mul(80))) + "% ranged damage split into 10 hits, and stuns the celestialite for 5 seconds."},
    passiveText() {return "+" + formatSimple(player.bh.skillData["geroa_orbitalCannon"].maxLevel.div(5)) + " DMG"},
    char: "geroa",
    spCost: new Decimal(12),
    curCostBase: new Decimal(10),
    curCostScale: new Decimal(10),
    currency: "lustrousUmbrite", // Temp, probably something else
    unlocked: true,

    effect: "instant",
    type: "damage",
    target: "celestialite",
    method: "ranged",
    properties: {
        "stun": [new Decimal(1), new Decimal(5)], // Chance / Time
        "multi-hit": [10, 100], // Amount / Delay
    },
    value() {return new Decimal(0.4).add(player.bh.skillData["geroa_orbitalCannon"].level.mul(0.08))},
    delay: 10000, // In ms
    stun: new Decimal(10),
    cooldown: new Decimal(60),
}