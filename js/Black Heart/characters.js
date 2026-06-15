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
    health() {return new Decimal(80).mul(buyableEffect("sp", 12)).mul(player.bh.baseMult)},
    damage() {return new Decimal(6).mul(buyableEffect("sp", 12)).mul(player.bh.baseMult)},
    defense: new Decimal(0),
    regen() {
        if (hasUpgrade("sp", 11)) return new Decimal(0.25).mul(buyableEffect("sp", 12)).mul(player.bh.baseMult)
        if (hasUpgrade("depth2", 101)) return new Decimal(0.1).mul(buyableEffect("sp", 12)).mul(player.bh.baseMult)
        return new Decimal(0)
    },
    agility() {return new Decimal(5).mul(buyableEffect("sp", 12)).mul(player.bh.baseMult)},
    luck: new Decimal(0),
    mending: new Decimal(0),
    potency() {return new Decimal(10).mul(buyableEffect("sp", 12)).mul(player.bh.baseMult)},
}
BHP.nav = {
    name: "Nav",
    color: "#710a91",
    icon: "resources/nav.png",
    health() {return new Decimal(50).mul(buyableEffect("sp", 22)).mul(player.bh.baseMult)},
    damage() {return new Decimal(8).mul(buyableEffect("sp", 22)).mul(player.bh.baseMult)},
    defense() {return hasUpgrade("sp", 21) ? new Decimal(10).mul(buyableEffect("sp", 22)).mul(player.bh.baseMult) : new Decimal(0)},
    regen() {return hasUpgrade("depth2", 101) ? new Decimal(0.1).mul(buyableEffect("sp", 22)).mul(player.bh.baseMult) : new Decimal(0)},
    agility() {return new Decimal(5).mul(buyableEffect("sp", 22)).mul(player.bh.baseMult)},
    luck: new Decimal(0),
    mending() {return new Decimal(10).mul(buyableEffect("sp", 22)).mul(player.bh.baseMult)},
    potency: new Decimal(0),
}
BHP.sel = {
    name() {return player.ir.iriditeDefeated ? "Sel's Husk" : "Sel"},
    color: "#065c19",
    icon() {return player.ir.iriditeDefeated ? "resources/sel_husk.png" : "resources/sel.png"},
    health() {return new Decimal(65).mul(buyableEffect("sp", 32)).mul(player.bh.baseMult)},
    damage() {return new Decimal(4).mul(buyableEffect("sp", 32)).mul(player.bh.baseMult)},
    defense: new Decimal(0),
    regen() {return hasUpgrade("depth2", 101) ? new Decimal(0.1).mul(buyableEffect("sp", 32)).mul(player.bh.baseMult) : new Decimal(0)},
    agility() {return new Decimal(8).mul(buyableEffect("sp", 32)).mul(player.bh.baseMult)},
    luck() {return hasUpgrade("sp", 31) ? new Decimal(10).mul(buyableEffect("sp", 32)).mul(player.bh.baseMult) : new Decimal(0)},
    mending: new Decimal(0),
    potency() {return new Decimal(5).mul(buyableEffect("sp", 32)).mul(player.bh.baseMult)},
}
BHP.eclipse = {
    name: "Eclipse",
    color: "#b68c18",
    icon: "resources/eclipse.png",
    health() {return hasUpgrade("sma", 225) ? new Decimal(100).mul(player.bh.baseMult) : new Decimal(80).mul(player.bh.baseMult)},
    damage() {return hasUpgrade("sma", 226) ? new Decimal(12).mul(player.bh.baseMult) : new Decimal(10).mul(player.bh.baseMult)},
    defense() {return hasUpgrade("sma", 225) ? new Decimal(10).mul(player.bh.baseMult) : new Decimal(5).mul(player.bh.baseMult)},
    regen() {return hasUpgrade("depth2", 101) ? new Decimal(0.1).mul(player.bh.baseMult) : new Decimal(0)},
    agility() {return hasUpgrade("sma", 226) ? new Decimal(5).mul(player.bh.baseMult) : new Decimal(0)},
    luck: new Decimal(0),
    mending() {return new Decimal(5).mul(player.bh.baseMult)},
    potency() {return new Decimal(10).mul(player.bh.baseMult)},
}
BHP.geroa = {
    name: "Geroa",
    color: "#536bdb",
    icon: "resources/geroa.png",
    health() {return hasUpgrade("ir", 205) ? new Decimal(60).mul(player.bh.baseMult) : new Decimal(50).mul(player.bh.baseMult)},
    damage() {
        let dmg = new Decimal(5)
        if (hasUpgrade("ir", 205)) dmg = dmg.mul(1.2)
        if (hasUpgrade("ir", 206)) dmg = dmg.mul(1.5)
        return dmg.mul(player.bh.baseMult)
    },
    defense() {return hasUpgrade("ir", 205) ? new Decimal(6).mul(player.bh.baseMult) : new Decimal(5).mul(player.bh.baseMult)},
    regen() {return hasUpgrade("ir", 205) ? new Decimal(0.6).mul(player.bh.baseMult) : new Decimal(0.5).mul(player.bh.baseMult)},
    agility() {return hasUpgrade("ir", 205) ? new Decimal(12).mul(player.bh.baseMult) : new Decimal(10).mul(player.bh.baseMult)},
    luck: new Decimal(0),
    mending() {return hasUpgrade("ir", 205) ? new Decimal(6).mul(player.bh.baseMult) : new Decimal(5).mul(player.bh.baseMult)},
    potency: new Decimal(0),
}
BHP.vespasian = {
    name: "Vespasian",
    color: "#7f6b4e",
    icon: "resources/vespasian.png",
    health() {return new Decimal(100).mul(player.bh.baseMult)},
    damage() {return hasUpgrade("laboratory", 13) ? new Decimal(10).mul(player.bh.baseMult) : new Decimal(6).mul(player.bh.baseMult)},
    defense() {return new Decimal(10).mul(player.bh.baseMult)},
    regen() {return new Decimal(0.25).mul(player.bh.baseMult)},
    agility() {return hasUpgrade("laboratory", 3) ? new Decimal(15).mul(player.bh.baseMult) : new Decimal(5).mul(player.bh.baseMult)},
    luck: new Decimal(0),
    mending() {return new Decimal(5).mul(player.bh.baseMult)},
    potency() {return new Decimal(5).mul(player.bh.baseMult)},
}
BHP.creation = {
    name: "The Creation",
    color: "#8a76b0", //linear-gradient(90deg, #7a97b9, #8a76b0)
    icon: "resources/player.png",
    health: new Decimal(125),
    damage: new Decimal(5),
    defense: new Decimal(15),
    regen: new Decimal(0.4),
    agility: new Decimal(5),
    luck: new Decimal(2.5),
    mending() {return new Decimal(5).mul(player.bh.baseMult)},
    potency() {return new Decimal(5).mul(player.bh.baseMult)},
}
BHP.diceFive = {
    name() {return player.zarDungeon.zarDefeated ? "Dice Five's Husk" : "Dice Five"},
    color: "#a3a3a3", 
    icon() {return player.zarDungeon.zarDefeated ? "resources/diceFiveFHusk.png" : "resources/diceFiveF.png"},
    health: new Decimal(75),
    damage: new Decimal(3),
    defense: new Decimal(5),
    regen: new Decimal(0),
    agility: new Decimal(5),
    luck: new Decimal(50),
    mending: new Decimal(5),
    potency: new Decimal(5),
    mending() {return new Decimal(5).mul(player.bh.baseMult)},
    potency() {return new Decimal(5).mul(player.bh.baseMult)},
}