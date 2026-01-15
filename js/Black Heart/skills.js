const BHA = {}

// Kres Skills
BHA.kres_bigAttack = {
    name: "Big Attack",
    char: "kres",
    spCost: new Decimal(6),
    curCostBase: new Decimal(25),
    curCostScale: new Decimal(25),
    currency: "uncommonMatosFragments",

    effect: "instant",
    type: "damage",
    target: "celestialite",
    method: "physical",
    properties: {
        "backfire": [new Decimal(1), new Decimal(0.5)], // Backfire Chance / Backfire Damage (multiple of end damage)
    },
    value() {return new Decimal(2).add(player.bh.skillData["kres_bigAttack"].level.mul(0.2))},
    cooldown: new Decimal(20),
}