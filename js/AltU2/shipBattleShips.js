const SB_shipNames = [ // TEMPORARY BEFORE MOVING TO A NEW SYSTEM
    "",
    "cruiser",
    "impact",
    "unarmed",
    "sniper",
    "ufo",
    "streamliner",
    "stinger",
    "astral",
    "evolver",
    "railgun",
]

SB_ships.cruiser = {
    name: "Cruiser",
    baseStats: {

        // DEFENSE
        maxHp: 100,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 7,
        bodyDamage: 1,
        attackSpeed: 120,

        // AGILITY
        moveSpeed: 6,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.impact = {
    name: "Impact",
    baseStats: {

        // DEFENSE
        maxHp: 150,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 25,
        bodyDamage: 1,
        attackSpeed: 500,

        // AGILITY
        moveSpeed: 4,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.unarmed = {
    name: "Unarmed",
    baseStats: {

        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 15,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 16,
        bodyDamage: 1,
        attackSpeed: 1500,

        // AGILITY
        moveSpeed: 10,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.sniper = {
    name: "Sniper",
    baseStats: {

        // DEFENSE
        maxHp: 100,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 12,
        bodyDamage: 1,
        attackSpeed: 250,

        // AGILITY
        moveSpeed: 4.5,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.ufo = {
    name: "UFO",
    baseStats: {

        // DEFENSE
        maxHp: 50,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 3,
        bodyDamage: 1,
        attackSpeed: 250,

        // AGILITY
        moveSpeed: 5,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.streamliner = {
    name: "Streamliner",
    baseStats: {

        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 4,
        bodyDamage: 1,
        attackSpeed: 50,

        // AGILITY
        moveSpeed: 3,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.stinger = {
    name: "Stinger",
    baseStats: {

        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 10,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 12,
        bodyDamage: 1,
        attackSpeed: 1000,

        // AGILITY
        moveSpeed: 10,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.astral = {
    name: "Astral",
    baseStats: {

        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 7,
        bodyDamage: 1,
        attackSpeed: 300,

        // AGILITY
        moveSpeed: 6,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.evolver = {
    name: "Evolver",
    baseStats: {

        // DEFENSE
        maxHp: 100,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 40,
        bodyDamage: 1,
        attackSpeed: 500,

        // AGILITY
        moveSpeed: 4,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.railgun = {
    name: "Railgun",
    baseStats: {

        // DEFENSE
        maxHp: 100,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 600,
        bodyDamage: 1,
        attackSpeed: 5000,

        // AGILITY
        moveSpeed: 4.5,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 0.5,
        spaceRockGain: 1.5,
        spaceGemGain: 1.5,
        bloodStoneGain: 1.5,
        bloodGemGain: 1.5,

    },
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}