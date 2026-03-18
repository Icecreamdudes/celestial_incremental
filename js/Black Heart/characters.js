// Sadly a necessary addition to the code
BHP.none = {
    name: "None",
    color: "#333",
    icon: "resources/secret.png",
    health: new Decimal(0),
    damage: new Decimal(0),
    defense: new Decimal(0),
    regen: new Decimal(0),
    agility: new Decimal(0),
    luck: new Decimal(0),
    mending: new Decimal(0),
    potency: new Decimal(0),
}
BHP.general = {
    name: "Player",
    color: "#666",
    icon: "resources/player.png",
    health: new Decimal(100),
    damage: new Decimal(10),
    defense: new Decimal(10),
    regen: new Decimal(1),
    agility: new Decimal(10),
    luck: new Decimal(10),
    mending: new Decimal(0),
    potency: new Decimal(0),
}
// Start of characters
BHP.kres = {
    name: "Kres",
    color: "#910a27",
    icon: "resources/kres.png",
    health() {return new Decimal(80).mul(buyableEffect("sp", 12))},
    damage() {return new Decimal(6).mul(buyableEffect("sp", 12))},
    defense: new Decimal(0),
    regen() {return hasUpgrade("sp", 11) ? new Decimal(0.25).mul(buyableEffect("sp", 12)) : new Decimal(0)},
    agility() {return new Decimal(5).mul(buyableEffect("sp", 12))},
    luck: new Decimal(0),
    mending: new Decimal(0),
    potency() {return new Decimal(10).mul(buyableEffect("sp", 12))},
}
BHP.nav = {
    name: "Nav",
    color: "#710a91",
    icon: "resources/nav.png",
    health() {return new Decimal(50).mul(buyableEffect("sp", 22))},
    damage() {return new Decimal(8).mul(buyableEffect("sp", 22))},
    defense() {return hasUpgrade("sp", 21) ? new Decimal(10).mul(buyableEffect("sp", 22)) : new Decimal(0)},
    regen: new Decimal(0),
    agility() {return new Decimal(5).mul(buyableEffect("sp", 22))},
    luck: new Decimal(0),
    mending() {return new Decimal(10).mul(buyableEffect("sp", 22))},
    potency: new Decimal(0),
}
BHP.sel = {
    name() {return player.ir.iriditeDefeated ? "Sel's Husk" : "Sel"},
    color: "#065c19",
    icon() {return player.ir.iriditeDefeated ? "resources/sel_husk.png" : "resources/sel.png"},
    health() {return new Decimal(65).mul(buyableEffect("sp", 32))},
    damage() {return new Decimal(4).mul(buyableEffect("sp", 32))},
    defense: new Decimal(0),
    regen: new Decimal(0),
    agility() {return new Decimal(8).mul(buyableEffect("sp", 32))},
    luck() {return hasUpgrade("sp", 31) ? new Decimal(10).mul(buyableEffect("sp", 32)) : new Decimal(0)},
    mending: new Decimal(0),
    potency() {return new Decimal(5).mul(buyableEffect("sp", 32))},
}
BHP.eclipse = {
    name: "Eclipse",
    color: "#b68c18",
    icon: "resources/eclipse.png",
    health() {return hasUpgrade("sma", 225) ? new Decimal(100) : new Decimal(80)},
    damage() {return hasUpgrade("sma", 226) ? new Decimal(12) : new Decimal(10)},
    defense() {return hasUpgrade("sma", 225) ? new Decimal(10) : new Decimal(5)},
    regen: new Decimal(0),
    agility() {return hasUpgrade("sma", 226) ? new Decimal(5) : new Decimal(0)},
    luck: new Decimal(0),
    mending: new Decimal(5),
    potency: new Decimal(10),
}
BHP.geroa = {
    name: "Geroa",
    color: "#536bdb",
    icon: "resources/geroa.png",
    health() {return hasUpgrade("ir", 205) ? new Decimal(60) : new Decimal(50)},
    damage() {
        let dmg = new Decimal(5)
        if (hasUpgrade("ir", 205)) dmg = dmg.mul(1.2)
        if (hasUpgrade("ir", 206)) dmg = dmg.mul(1.5)
        return dmg
    },
    defense() {return hasUpgrade("ir", 205) ? new Decimal(6) : new Decimal(5)},
    regen() {return hasUpgrade("ir", 205) ? new Decimal(0.6) : new Decimal(0.5)},
    agility() {return hasUpgrade("ir", 205) ? new Decimal(12) : new Decimal(10)},
    luck: new Decimal(0),
    mending() {return hasUpgrade("ir", 205) ? new Decimal(6) : new Decimal(5)},
    potency: new Decimal(0),
}
BHP.vespasian = {
    name: "Vespasian",
    color: "#7f6b4e",
    icon: "resources/feddy.gif",
    health: new Decimal(100),
    damage: new Decimal(6),
    defense: new Decimal(10),
    regen: new Decimal(0.25),
    agility: new Decimal(5),
    luck: new Decimal(0),
    mending: new Decimal(5),
    potency: new Decimal(5),
}