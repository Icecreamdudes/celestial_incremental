const BHC = {}
const BHS = {}

BHS.template = {
    nameCap: "Stage template",
    nameLow: "stage template",
    music: "music/celestialites.mp3",
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
            type: "damage",
            properties: {
                "multi-hit": 3, // How many hits
                "crit": [new Decimal(0.2), new Decimal(2)], // Crit Chance / Crit Multiplier
            },
            value: this.damage,
            cooldown: new Decimal(5),
        },
        1: {
            type: "heal",
            properties: {
                "multi-heal": 3, // How many heals
                "crit": [new Decimal(0.2), new Decimal(2)], // Crit Chance / Crit Multiplier
            },
            value: new Decimal(10),
            cooldown: new Decimal(12),
        },
        2: {
            type: "buff",
            properties: {
                "damage": new Decimal(1.1), // Multiplicative Buff
                "health": new Decimal(1.1), // Multiplicative Buff
            },
            cooldown: new Decimal(17),
        },
        3: {
            type: "reset",
            cooldown: new Decimal(23),
        },
    },
    reward() {
        let gain = {}
        gain.commonMatosFragment = 100
        gain.rareMatosFragment = 25
        gain.epicMatosFragment = 10
        gain.legendaryMatosFragment = 5
        return gain
    },
}
addLayer("bh", {
    name: "Black Heart", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♥", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        celestialite: {
            id: "none",
            health: new Decimal(100),
            maxHealth: new Decimal(100),
            damage: new Decimal(0),
            defense: new Decimal(0),
            regen: new Decimal(0),
            shield: new Decimal(0), // Not same as previous, is a prevent damage stack
            actions: {
                0: {
                    variables: {},
                    cooldown: new Decimal(0),
                },
                1: {
                    variables: {},
                    cooldown: new Decimal(0),
                },
                2: {
                    variables: {},
                    cooldown: new Decimal(0),
                },
                3: {
                    variables: {},
                    cooldown: new Decimal(0),
                },
            },
        },

        characters: {
            0: {
                id: "none",
                health: new Decimal(100),
                maxHealth: new Decimal(100),
                damage: new Decimal(0),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                shield: new Decimal(0),
                skills: {
                    0: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                    1: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                    2: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                    3: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                },
            },
            1: {
                id: "none",
                health: new Decimal(100),
                maxHealth: new Decimal(100),
                damage: new Decimal(0),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                shield: new Decimal(0),
                skills: {
                    0: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                    1: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                    2: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                    3: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                },
            },
            2: {
                id: "none",
                health: new Decimal(100),
                maxHealth: new Decimal(100),
                damage: new Decimal(0),
                defense: new Decimal(0),
                regen: new Decimal(0),
                agility: new Decimal(0),
                luck: new Decimal(0),
                shield: new Decimal(0),
                skills: {
                    0: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                    1: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                    2: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                    3: {
                        id: "none",
                        variables: {},
                        duration: new Decimal(0),
                        cooldown: new Decimal(0),
                    },
                },
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #333 0%, #222 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#8a0e79",
            color: "black",
        };
    },
    tooltip: "Black Heart",
    branches: ["ma"],
    color: "#8a0e79",
    update(delta) {

    },
    clickables: {},
    bars: {},
    microtabs: {
        stuff: {

        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})