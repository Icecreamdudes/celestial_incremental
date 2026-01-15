BHS.depth1 = {
    nameCap: "Depth 1",
    nameLow: "depth 1",
    music: "music/celestialites.mp3",
    cooldown: new Decimal(300),
    comboLimit: 250,
    comboScaling: 1.015,
    comboScalingStart: 100,
    generateCelestialite(combo) {
        switch (combo) {
            case 24:
                return "lesserEnas"
            case 49: case 74:
                return "lesserPente"
            case 99: case 124:
                return "lesserDeka"
            case 149: case 174:
                return "lesserHekaton"
            case 199: case 224:
                return "lesserKhilioi"
            case 249:
                return "lesserMyrioi"
            default:
                let random = Math.random()
                let cel = ["lesserAlpha", "lesserBeta", "lesserGamma", "lesserDelta", "lesserEpsilon"]
                if (combo >= 25) cel.push("lesserZeta")
                if (combo >= 50) cel.push("lesserEta")
                if (combo >= 100) cel.push("lesserTheta")
                if (combo >= 150) cel.push("lesserIota")
                if (combo >= 200) cel.push("lesserKappa")
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}

BHC.lesserAlpha = {
    name: "Celestialite Lesser Alpha",
    symbol: "↓α",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(70),
    damage: new Decimal(6),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(9),
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

BHC.lesserBeta = {
    name: "Celestialite Lesser Beta",
    symbol: "↓β",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(45),
    damage: new Decimal(6),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(5),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.commonMatosFragment = Decimal.add(5, getRandomInt(8))
        } else {
            gain.rareMatosFragment = Decimal.add(1, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserGamma = {
    name: "Celestialite Lesser Gamma",
    symbol: "↓γ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(90),
    damage: new Decimal(8),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(7),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.commonMatosFragment = Decimal.add(9, getRandomInt(8))
        } else {
            gain.rareMatosFragment = Decimal.add(2, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserDelta = {
    name: "Celestialite Lesser Delta",
    symbol: "↓δ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(110),
    damage: new Decimal(1.5),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(2.5),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.6) {
            gain.commonMatosFragment = Decimal.add(9, getRandomInt(8))
        } else if (random > 0.6 && random < 0.9) {
            gain.rareMatosFragment = Decimal.add(3, getRandomInt(3))
        } else {
            gain.epicMatosFragment = new Decimal(1)
        }
        return gain
    },
}

BHC.lesserEpsilon = {
    name: "Celestialite Lesser Epsilon",
    symbol: "↓ε",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(175),
    damage: new Decimal(10),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.45) {
            gain.commonMatosFragment = Decimal.add(12, getRandomInt(7))
        } else if (random > 0.45 && random < 0.85) {
            gain.rareMatosFragment = Decimal.add(4, getRandomInt(3))
        } else {
            gain.epicMatosFragment = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.lesserZeta = {
    name: "Celestialite Lesser Zeta",
    symbol: "↓ζ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(50),
    damage: new Decimal(15),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(6),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.5) {
            gain.commonMatosFragment = Decimal.add(10, getRandomInt(5))
        } else if (random > 0.5 && random < 0.9) {
            gain.rareMatosFragment = Decimal.add(4, getRandomInt(2))
        } else {
            gain.epicMatosFragment = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.lesserEta = {
    name: "Celestialite Lesser Eta",
    symbol: "↓η",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(200),
    damage: new Decimal(4),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.4) {
            gain.commonMatosFragment = Decimal.add(15, getRandomInt(10))
        } else if (random > 0.4 && random < 0.85) {
            gain.rareMatosFragment = Decimal.add(5, getRandomInt(3))
        } else {
            gain.epicMatosFragment = Decimal.add(1, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserTheta = {
    name: "Celestialite Lesser Theta",
    symbol: "↓θ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(150),
    damage: new Decimal(2),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(2),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.4) {
            gain.commonMatosFragment = Decimal.add(12, getRandomInt(8))
        } else if (random > 0.4 && random < 0.85) {
            gain.rareMatosFragment = Decimal.add(4, getRandomInt(3))
        } else {
            gain.epicMatosFragment = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.lesserIota = {
    name: "Celestialite Lesser Iota",
    symbol: "↓ι",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(400),
    damage: new Decimal(8),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "random",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.4) {
            gain.commonMatosFragment = Decimal.add(20, getRandomInt(12))
        } else if (random > 0.4 && random < 0.85) {
            gain.rareMatosFragment = Decimal.add(5, getRandomInt(4))
        } else {
            gain.epicMatosFragment = Decimal.add(1, getRandomInt(2))
        }
        return gain
    },
}

BHC.lesserKappa = {
    name: "Celestialite Lesser Kappa",
    symbol: "↓κ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(500),
    damage: new Decimal(10),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.4) {
            gain.commonMatosFragment = Decimal.add(25, getRandomInt(15))
        } else if (random > 0.4 && random < 0.85) {
            gain.rareMatosFragment = Decimal.add(6, getRandomInt(6))
        } else {
            gain.epicMatosFragment = Decimal.add(2, getRandomInt(2))
        }
        return gain
    },
}

// MINIBOSSES
BHC.lesserEnas = {
    name: "Celestialite Lesser Enas",
    symbol: "↓Ι",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(500),
    damage: new Decimal(15),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        1: {
            effect: "instant",
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(0.5),
            cooldown: new Decimal(23),
        },
    },
    reward() {
        let gain = {}
        gain.commonMatosFragment = new Decimal(30)
        gain.rareMatosFragment = new Decimal(15)
        gain.epicMatosFragment = new Decimal(5)
        return gain
    },
}

BHC.lesserPente = {
    name: "Celestialite Lesser Pente",
    symbol: "↓Π",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(750),
    damage: new Decimal(20),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            effect: "instant",
            type: "heal",
            target: "celestialite",
            value: new Decimal(20),
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        gain.commonMatosFragment = new Decimal(50)
        gain.rareMatosFragment = new Decimal(25)
        gain.epicMatosFragment = new Decimal(10)
        return gain
    },
}

BHC.lesserDeka = {
    name: "Celestialite Lesser Deka",
    symbol: "↓Δ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1000),
    damage: new Decimal(15),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1.2),
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        gain.commonMatosFragment = new Decimal(70)
        gain.rareMatosFragment = new Decimal(35)
        gain.epicMatosFragment = new Decimal(15)
        return gain
    },
}

BHC.lesserHekaton = {
    name: "Celestialite Lesser Hekaton",
    symbol: "↓Η",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1250),
    damage: new Decimal(30),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(20),
        },
        1: {
            effect: "instant",
            type: "effect",
            target: "celestialite",
            properties: {
                "damageMult": new Decimal(1.1), // Multiplicative Effect
            },
            cooldown: new Decimal(30),
        },
    },
    reward() {
        let gain = {}
        gain.commonMatosFragment = new Decimal(100)
        gain.rareMatosFragment = new Decimal(50)
        gain.epicMatosFragment = new Decimal(20)
        return gain
    },
}

BHC.lesserKhilioi = {
    name: "Celestialite Lesser Khilioi",
    symbol: "↓Χ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(1500),
    damage: new Decimal(25),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(0.5),
            cooldown: new Decimal(4),
        },
        1: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(10),
        },
        2: {
            effect: "instant",
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(2),
            cooldown: new Decimal(24),
        },
    },
    reward() {
        let gain = {}
        gain.commonMatosFragment = new Decimal(150)
        gain.rareMatosFragment = new Decimal(75)
        gain.epicMatosFragment = new Decimal(30)
        return gain
    },
}

BHC.lesserMyrioi = {
    name: "Celestialite Lesser Myrioi",
    symbol: "↓Μ",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(2000),
    damage: new Decimal(20),
    actions: {
        0: {
            effect: "instant",
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(8),
        },
        1: {
            effect: "instant",
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(20),
        },
        2: {
            effect: "instant",
            type: "effect",
            target: "celestialite",
            properties: {
                "damageMult": new Decimal(1.2),
            },
            cooldown: new Decimal(30),
        },
    },
    reward() {
        let gain = {}
        gain.commonMatosFragment = new Decimal(250)
        gain.rareMatosFragment = new Decimal(125)
        gain.epicMatosFragment = new Decimal(50)
        return gain
    },
}