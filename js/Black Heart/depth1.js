BHS.Depth1 = {
    nameCap: "Depth 1",
    nameLow: "depth 1",
    music: "music/celestialites.mp3",
    comboLimit: 500,
    comboScaling: 1.015,
    comboScalingStart: 100,
    generateCelestialite(combo) {
        let random = Math.random()

        // Check for miniboss round
        if (combo%25 == 24) {
            return "BHC_D1AZ"
        }

        return "BHC_D1AA"
    }
}

BHC.D1AA = {
    name: "Celestialite D1:AA",
    symbol: "AA",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health() {return Decimal.add(60, Decimal.mul(15, Math.random()))},
    actions: {
        0: {
            type: "damage",
            damage() {return Decimal.add(5, Decimal.mul(2, Math.random()))},
            cooldown() {return Decimal.add(7, Decimal.mul(4, Math.random()))},
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.commonMatosFragment = Decimal.add(8, getRandomInt(5))
        } else {
            gain.rareMatosFragment = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.D1AZ = {
    name: "Celestialite D1:AZ",
    symbol: "AZ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(300),
    defense: new Decimal(5),
    actions: {
        0: {
            type: "damage",
            damage: new Decimal(10),
            cooldown: new Decimal(5)
        },
        1: {
            type: "damage",
            damage: new Decimal(25),
            cooldown: new Decimal(22.5),
        },
    },
    reward() {
        let gain = {}
        gain.commonMatosFragment = 25
        gain.rareMatosFragment = 5
        return gain
    },
}