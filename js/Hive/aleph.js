const COCOON_MILESTONE = [new Decimal(1), new Decimal(10), new Decimal(100), new Decimal(1000), new Decimal(10000), new Decimal(100000), new Decimal(1e6), new Decimal(1e7), new Decimal(1e8), new Decimal(1e9), new Decimal(1e14), new Decimal(1e16), new Decimal(1e18), new Decimal(1e20), new Decimal(1e22), new Decimal(1e25)]
addLayer("al", {
    name: "Aleph, the Celestial of Swarms", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ℵ", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        honeycomb: new Decimal(0),
        honeycombGain: new Decimal(0),
        highestHoneycomb: new Decimal(0),

        royalJelly: new Decimal(0),
        royalJellyGain: new Decimal(0),
        highestRoyalJelly: new Decimal(0),

        cocoonLevel: 0,
        alephFreedom: false,

        show: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #3f003f 0%, #a900a9 100%)",
            "background-origin": "border-box",
            "border-color": "#3f003f",
        };
    },
    tooltip: "Aleph, the Celestial of Swarms",
    color: "white",
    branches: ["bb", "ho"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (!player.al.show && (player.al.honeycomb.gt(0) || player.al.royalJelly.gt(0))) player.al.show = true

        // START OF HONEYCOMBS
        player.al.honeycombGain = player.bb.beeBread.div(1e10).pow(0.25)
        if (player.al.cocoonLevel >= 1) player.al.honeycombGain = player.al.honeycombGain.mul(1.5)

        // FLOOR HONEYCOMBS
        player.al.honeycombGain = player.al.honeycombGain.floor()

        // START OF ROYAL JELLY
        player.al.royalJellyGain = player.ho.honey.div(1e10).pow(0.25)
        if (player.al.cocoonLevel >= 1) player.al.royalJellyGain = player.al.royalJellyGain.mul(1.5)

        // FLOOR HONEYCOMBS
        player.al.royalJellyGain = player.al.royalJellyGain.floor()

        if (player.al.honeycomb.gt(player.al.highestHoneycomb)) player.al.highestHoneycomb = player.al.honeycomb
        if (player.al.royalJelly.gt(player.al.highestRoyalJelly)) player.al.highestRoyalJelly = player.al.royalJelly

        for (let i = player.al.cocoonLevel; i < COCOON_MILESTONE.length; i++) {
            if (player.al.highestHoneycomb.gte(COCOON_MILESTONE[i]) && player.al.highestRoyalJelly.gte(COCOON_MILESTONE[i])) {
                player.al.cocoonLevel = i+1
            }
        }
    },
    prestigeReset() {
        // BEES
        player.bee.bees = new Decimal(1)
        player.bee.bps = new Decimal(0)
        player.bee.totalResearch = new Decimal(0)
        player.bee.path = 0
        for (let i in player.bee.buyables) {
            player.bee.buyables[i] = new Decimal(0)
        }

        // FLOWER
        player.subtabs.fl.Glossary = "Red"
        for (let thing in player.fl.timers) {
            player.fl.timers[thing].pause = false
        }
        player.fl.pickingPower = new Decimal(1)
        player.fl.flowerGain = new Decimal(1)
        player.fl.glossaryBase = new Decimal(1)
        for (let i in player.fl.glossary) {
            player.fl.glossary[i] = new Decimal(0)
        }
        for (let i in player.fl.glossaryEffect) {
            player.fl.glossaryEffects[i] = new Decimal(1)
        }
        player.fl.glossaryIndex = 0
        player.fl.glossaryRig = 0
        for (let i = 1; i < 506; ) {
            setGridData("fl", i, [0, new Decimal(1)])

            // Increase i value
            if (i % 5 == 0) {
                i = i+96
            } else {
                i++
            }
        }

        if (player.al.cocoonLevel >= 7) {
            for (let i = 101; i < 116; ) {
                player.fl.glossary[i] = new Decimal(1)

                // Increase i value
                if (i % 5 == 0) {
                    i = i+6
                } else {
                    i++
                }
            }
        }

        player.fl.gatherer[1].id = 101
        player.fl.gatherer[1].current = new Decimal(0)
        player.fl.gatherer[1].max = new Decimal(5)
        player.fl.gatherer[1].power = new Decimal(0)
        player.fl.gatherer[1].mult = new Decimal(1)
        
        player.fl.gatherer[2].id = 505
        player.fl.gatherer[2].current = new Decimal(0)

        player.fl.buyables[1] = new Decimal(0)
        player.fl.buyables[2] = new Decimal(0)
        player.fl.buyables[3] = new Decimal(0)

        // POLLEN
        player.bpl.pollen = new Decimal(0)
        player.bpl.roles.drone.amount = new Decimal(0)
        player.bpl.roles.worker.amount = new Decimal(0)
        player.bpl.roles.queen.amount = new Decimal(0)
        player.bpl.roles.empress.amount = new Decimal(0)
        player.bpl.upgrades.splice(0, player.bpl.upgrades.length)

        // NECTAR
        player.ne.alpha.amount = new Decimal(0)
        player.ne.alpha.gain = new Decimal(0)
        player.ne.alpha.effect = new Decimal(1)
        player.ne.beta.amount = new Decimal(0)
        player.ne.beta.gain = new Decimal(0)
        player.ne.beta.effect = new Decimal(1)
        player.ne.gamma.amount = new Decimal(0)
        player.ne.gamma.gain = new Decimal(0)
        player.ne.gamma.effect = new Decimal(1)
        player.ne.delta.amount = new Decimal(0)
        player.ne.delta.gain = new Decimal(0)
        player.ne.delta.effect = new Decimal(1)
        player.ne.epsilon.amount = new Decimal(0)
        player.ne.epsilon.gain = new Decimal(0)
        player.ne.epsilon.effect = new Decimal(1)
        player.ne.upgrades.splice(0, player.ne.upgrades.length)

        // BEE BREAD
        player.bb.beeBreadPerSecond = new Decimal(0)
        player.bb.beeBread = new Decimal(0)
        player.bb.beeBreadGain = new Decimal(0)
        player.bb.breadMilestone = 0
        player.bb.breadMilestoneHighest = 0
        player.bb.breadTier = new Decimal(1),
        player.bb.breadTierMult = new Decimal(1)
        player.bb.breadEffects = [
            new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), 
            new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
        ]

        // HONEY
        player.ho.cell = new Decimal(0)
        player.ho.cellGain = new Decimal(0)

        player.ho.honey = new Decimal(0)
        player.ho.honeyPerSecond = new Decimal(0)

        for (let i in player.ho.effects) {
            player.ho.effects[i].level = new Decimal(0)
            player.ho.effects[i].xp = new Decimal(0)
            player.ho.effects[i].req = new Decimal(1)
            player.ho.effects[i].effect = new Decimal(1)
        }
        player.ho.upgrades.splice(0, player.ho.upgrades.length)
    },
    clickables: {
        1: {
            title() { return "<h3>Gain Honeycombs, but reset previous content.</h3><br>Req: 1e10 Bee Bread<br>[While in Pollen Path]" },
            canClick() { return player.bb.beeBread.gte(1e10) && player.bee.path == 1 },
            unlocked: true,
            onClick() {
                player.al.honeycomb = player.al.honeycomb.add(player.al.honeycombGain)
                layers.al.prestigeReset()
            },
            style() {
                let look = { width: '300px', minHeight: '90px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '15px'}
                if (this.canClick()) {look.background = "#e5bd3f"} else {look.background = "#bf8f8f"}
                return look
            },
        },
        2: {
            title() { return "<h3>Gain Royal Jelly, but reset previous content.</h3><br>Req: 1e10 Honey<br>[While in Nectar Path]" },
            canClick() { return player.ho.honey.gte(1e10) && player.bee.path == 2 },
            unlocked: true,
            onClick() {
                player.al.royalJelly = player.al.royalJelly.add(player.al.royalJellyGain)
                layers.al.prestigeReset()
            },
            style() {
                let look = { width: '300px', minHeight: '90px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '15px'}
                if (this.canClick()) {look.background = "#e172b5"} else {look.background = "#bf8f8f"}
                return look
            },
        },
    },
    upgrades: {
        101: {
            title: "Honeycomb <small>(1, 1)</small>",
            unlocked: true,
            description: "Double BPS and flower gain.",
            cost: new Decimal(1),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycomb",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        102: {
            title: "Honeycomb <small>(1, 2)</small>",
            unlocked: true,
            description: "x2 Picking Power and Bee-Bread.",
            cost: new Decimal(3),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        103: {
            title: "Honeycomb <small>(1, 3)</small>",
            unlocked: true,
            description: "Produce 100% of bee drones per second.",
            cost: new Decimal(10),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        104: {
            title: "Honeycomb <small>(2, 1)</small>",
            unlocked: true,
            description: "Improve bee queen effect.",
            cost: new Decimal(20),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        105: {
            title: "Honeycomb <small>(2, 2)</small>",
            unlocked: true,
            description: "Unlock a new pollen research.",
            cost: new Decimal(50),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        106: {
            title: "Honeycomb <small>(2, 3)</small>",
            unlocked: true,
            description: "Produce 50% of bee workers per second.",
            cost: new Decimal(200),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        107: {
            title: "Honeycomb <small>(3, 1)</small>",
            unlocked: true,
            description: "Boost BB tier multiplier by x10.",
            cost: new Decimal(350),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        108: {
            title: "Honeycomb <small>(3, 2)</small>",
            unlocked: true,
            description: "Boost pollen gain based on bees.",
            cost: new Decimal(1200),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            effect() {
                return player.bee.bees.add(1).log(1e10).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        109: {
            title: "Honeycomb <small>(3, 3)</small>",
            unlocked: true,
            description: "Produce 25% of bee queens per second.",
            cost: new Decimal(5000),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        110: {
            title: "Honeycomb <small>(4, 1)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Triple BPS and flower Gain.",
            cost: new Decimal(100000),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        111: {
            title: "Honeycomb <small>(4, 2)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Unlock the forgotten pollen upgrade.",
            cost: new Decimal(400000),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        112: {
            title: "Honeycomb <small>(4, 3)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Replace pollen cooldown with constant pollen production.",
            cost: new Decimal(1.2e6),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        113: {
            title: "Honeycomb <small>(5, 1)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Remove BB GEB milestone cap.",
            cost: new Decimal(4e6),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        114: {
            title: "Honeycomb <small>(5, 2)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Unlock a new bee bread milestone.",
            cost: new Decimal(2e7),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        115: {
            title: "Honeycomb <small>(5, 3)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Auto-buy pollen upgrades when on pollen path.",
            cost: new Decimal(8e7),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        116: {
            title: "Honeycomb <small>(6, 1)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Boost BPS based on picking power.",
            cost: new Decimal(1e14),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            effect() {
                return player.fl.pickingPower.add(1).log(2).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        117: {
            title: "Honeycomb <small>(6, 2)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Unlock a new bee bread research.",
            cost: new Decimal(1e15),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        118: {
            title: "Honeycomb <small>(6, 3)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "No longer reset when gaining BB tier.",
            cost: new Decimal(1e16),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        119: {
            title: "Honeycomb <small>(7, 1)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Boost bee bread based on honey.",
            cost: new Decimal(1e17),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            effect() {
                return player.ho.honey.add(1).log(10).add(1).pow(0.5)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        120: {
            title: "Honeycomb <small>(7, 2)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Unlock empress bees in pollen.",
            cost: new Decimal(1e18),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        121: {
            title: "Honeycomb <small>(7, 3)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Automatically gain BB tiers.",
            cost: new Decimal(1e19),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        122: {
            title: "Honeycomb <small>(8, 1)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Unlock a new bee bread milestone.",
            cost: new Decimal(1e20),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        123: {
            title: "Honeycomb <small>(8, 2)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Improve BB tier requirement formula.",
            cost: new Decimal(1e21),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        124: {
            title: "Honeycomb <small>(8, 3)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Produce 10% of empress bees per second.",
            cost: new Decimal(1e22),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        125: {
            title: "Honeycomb <small>(9, 1)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Double pre-aleph gain.",
            cost: new Decimal(1e23),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        126: {
            title: "Honeycomb <small>(9, 2)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Raise pollen gain by ^1.01.",
            cost: new Decimal(1e24),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        127: {
            title: "Honeycomb <small>(9, 3)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Automate nectar upgrades when on pollen path.",
            cost: new Decimal(1e25),
            currencyLocation() { return player.al },
            currencyDisplayName: "Honeycombs",
            currencyInternalName: "honeycomb",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },

        201: {
            title: "Royal J. <small>(1, 1)</small>",
            unlocked: true,
            description: "x1.2 Glossary Effect Base.",
            cost: new Decimal(1),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        202: {
            title: "Royal J. <small>(1, 2)</small>",
            unlocked: true,
            description: "x2 Picking Power and Honey-Cells.",
            cost: new Decimal(3),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        203: {
            title: "Royal J. <small>(1, 3)</small>",
            unlocked: true,
            description: "Produce 100% of nectar α per second.",
            cost: new Decimal(10),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        204: {
            title: "Royal J. <small>(2, 1)</small>",
            unlocked: true,
            description: "Improve Nectar δ's effect.",
            cost: new Decimal(20),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        205: {
            title: "Royal J. <small>(2, 2)</small>",
            unlocked: true,
            description: "Unlock a new nectar research.",
            cost: new Decimal(50),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        206: {
            title: "Royal J. <small>(2, 3)</small>",
            unlocked: true,
            description: "Produce 50% of nectar β per second.",
            cost: new Decimal(200),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        207: {
            title: "Royal J. <small>(3, 1)</small>",
            unlocked: true,
            description: "Boost cell effect bases by x1.1.",
            cost: new Decimal(350),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        208: {
            title: "Royal J. <small>(3, 2)</small>",
            unlocked: true,
            description: "Remove flower cell's cap.",
            cost: new Decimal(1200),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        209: {
            title: "Royal J. <small>(3, 3)</small>",
            unlocked: true,
            description: "Produce 25% of nectar γ per second.",
            cost: new Decimal(5000),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        210: {
            title: "Royal J. <small>(4, 1)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "x1.1 Glossary Effect Base.",
            cost: new Decimal(100000),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        211: {
            title: "Royal J. <small>(4, 2)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Unlock a second effect for Nector δ-3.",
            cost: new Decimal(400000),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        212: {
            title: "Royal J. <small>(4, 3)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Produce 10% of nectar δ per second.",
            cost: new Decimal(1.2e6),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        213: {
            title: "Royal J. <small>(5, 1)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Unlock a second effect for flower cell.",
            cost: new Decimal(4e6),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        214: {
            title: "Royal J. <small>(5, 2)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Unlock pollen cell.",
            cost: new Decimal(2e7),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        215: {
            title: "Royal J. <small>(5, 3)</small>",
            unlocked() {return player.tad.hiveExpand},
            description: "Auto-buy nectar upgrades when on nectar path.",
            cost: new Decimal(8e7),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        216: {
            title: "Royal J. <small>(6, 1)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Boost BPS based on GEB Multiplier.",
            cost: new Decimal(1e14),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            effect() {
                return player.fl.glossaryBase.pow(0.85)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        217: {
            title: "Royal J. <small>(6, 2)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Unlock a new honey-cell research.",
            cost: new Decimal(1e15),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        218: {
            title: "Royal J. <small>(6, 3)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Auto-buy honey upgrades when on nectar path.",
            cost: new Decimal(1e16),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        219: {
            title: "Royal J. <small>(7, 1)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Boost honey-cells based on BB.",
            cost: new Decimal(1e17),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            effect() {
                return player.bb.beeBread.add(1).log(10).add(1).pow(0.5)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id), 2) }, // Add formatting to the effect
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        220: {
            title: "Royal J. <small>(7, 2)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Unlock nectar ε upgrades.",
            cost: new Decimal(1e18),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        221: {
            title: "Royal J. <small>(7, 3)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Produce 5% of nectar ε per second.",
            cost: new Decimal(1e19),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        222: {
            title: "Royal J. <small>(8, 1)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Unlock bee bread cell.",
            cost: new Decimal(1e20),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        223: {
            title: "Royal J. <small>(8, 2)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Improve all honey upgrades.",
            cost: new Decimal(1e21),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        224: {
            title: "Royal J. <small>(8, 3)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Automate nectar ε upgrades on nectar path.",
            cost: new Decimal(1e22),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        225: {
            title: "Royal J. <small>(9, 1)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Double pre-aleph gain.",
            cost: new Decimal(1e23),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        226: {
            title: "Royal J. <small>(9, 2)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Raise nectar gain by ^1.01.",
            cost: new Decimal(1e24),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        227: {
            title: "Royal J. <small>(9, 3)</small>",
            unlocked() {return hasChallenge("fu", 12)},
            description: "Automate pollen upgrades when on nectar path.",
            cost: new Decimal(1e25),
            currencyLocation() { return player.al },
            currencyDisplayName: "Royal Jelly",
            currencyInternalName: "royalJelly",
            style() {
                let look = {minHeight: "100px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background = "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
    },
    buyables: {
        101: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.al.honeycomb},
            pay(amt) { player.al.honeycomb = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(2, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>HC-1</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Double pollen gain\n\
                    Currently: x" + formatWhole(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Honeycombs"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        102: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.al.honeycomb},
            pay(amt) { player.al.honeycomb = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>HC-2</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Unlock +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " cubic blue flowers\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Honeycombs"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        103: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(1e3) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.al.honeycomb},
            pay(amt) { player.al.honeycomb = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>HC-3</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Unlock +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " cubic pink flowers\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Honeycombs"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        104: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(30) },
            currency() { return player.al.honeycomb},
            pay(amt) { player.al.honeycomb = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(10, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>HC-4</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/30)\n\
                    Decuple pollinator gain\n\
                    Currently: x" + formatWhole(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Honeycombs"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        105: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(30) },
            purchaseLimit() { return new Decimal(15) },
            currency() { return player.al.honeycomb},
            pay(amt) { player.al.honeycomb = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>HC-5</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/15)\n\
                    x1.1 starmetal alloy gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Honeycombs"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },
        106: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.al.honeycomb},
            pay(amt) { player.al.honeycomb = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(2, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>HC-6</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Double pre-power hex resource gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Honeycombs"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e5bd3f"
                return look
            },
        },

        201: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.al.royalJelly},
            pay(amt) { player.al.royalJelly = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(1.4, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RJ-1</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    x1.4 nectar gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Royal Jelly"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        202: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.al.royalJelly},
            pay(amt) { player.al.royalJelly = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RJ-2</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Unlock +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " cubic green flowers\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Royal Jelly"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        203: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(1e3) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.al.royalJelly},
            pay(amt) { player.al.royalJelly = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RJ-3</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Unlock +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " cubic yellow flowers\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Royal Jelly"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        204: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(30) },
            currency() { return player.al.royalJelly},
            pay(amt) { player.al.royalJelly = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(2, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RJ-4</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/30)\n\
                    Double moonstone gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 1) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Royal Jelly"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        205: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(30) },
            purchaseLimit() { return new Decimal(15) },
            currency() { return player.al.royalJelly},
            pay(amt) { player.al.royalJelly = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(1.05, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RJ-5</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/15)\n\
                    x1.05 starmetal essence gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Royal Jelly"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
        206: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.al.royalJelly},
            pay(amt) { player.al.royalJelly = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(1.2, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RJ-6</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    x1.2 hex power gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Royal Jelly"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "105px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#e172b5"
                return look
            },
        },
    },
    bars: {
        Cocoon1: {
            unlocked: true,
            direction: UP,
            width: 125,
            height: 600,
            progress() {
                let base = 1/16
                for (let i = 1; i < COCOON_MILESTONE.length; i++) {
                    if (player.al.highestHoneycomb.lt(COCOON_MILESTONE[i])) return player.al.highestHoneycomb.sub(COCOON_MILESTONE[i-1]).div(COCOON_MILESTONE[i].sub(COCOON_MILESTONE[i-1])).mul(base).add(base*i)
                }
                return new Decimal(1)
            },
            baseStyle: {background: "linear-gradient(0deg, #967d4a, #bd9d5b)", marginRight: "-3px"},
            fillStyle: {backgroundColor: "#e5bd3f66"},
            borderStyle: {border: "3px solid #726241", borderTopLeftRadius: "100px 200px", borderTopRightRadius: "0", borderBottomLeftRadius: "80px 360px", borderBottomRightRadius: "0"},
            textStyle: {userSelect: "none"},
            display() {
                let str = "<div style='width:125px;height:600px;display:flex;flex-direction:column'>"
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:4px;border-bottom:4px dotted #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:4px;border-bottom:4px dotted #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid transparent'></div>")
                return str
            },
        },
        Cocoon2: {
            unlocked: true,
            direction: UP,
            width: 125,
            height: 600,
            progress() {
                let base = 1/16
                for (let i = 1; i < COCOON_MILESTONE.length; i++) {
                    if (player.al.highestRoyalJelly.lt(COCOON_MILESTONE[i])) return player.al.highestRoyalJelly.sub(COCOON_MILESTONE[i-1]).div(COCOON_MILESTONE[i].sub(COCOON_MILESTONE[i-1])).mul(base).add(base*i)
                }
                return new Decimal(1)
            },
            baseStyle: {background: "linear-gradient(0deg, #967d4a, #bd9d5b)"},
            fillStyle: {backgroundColor: "#e172b566"},
            borderStyle: {border: "3px solid #726241", borderTopLeftRadius: "0", borderTopRightRadius: "150px 178px", borderBottomLeftRadius: "0", borderBottomRightRadius: "150px 246px"},
            textStyle: {userSelect: "none"},
            display() {
                let str = "<div style='width:125px;height:600px;display:flex;flex-direction:column'>"
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:4px;border-bottom:4px dotted #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:4px;border-bottom:4px dotted #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid #726241'></div>")
                str = str.concat("<div style='width:125px;flex:1;box-sizing:border-box;padding:5px;border-bottom:2px solid transparent'></div>")
                return str
            },
        },
    },
    microtabs: {
        Tabs: {
            "Main": {
                buttonStyle: {borderColor: "#a900a9", borderRadius: "15px"},
                unlocked: true,
                content: [
                    ["blank", "10px"],
                    ["style-row", [
                        ["style-column", [
                            ["top-column", [
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.al.honeycomb) + " Honeycombs"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "(+" + formatWhole(player.al.honeycombGain) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "10px"],
                                ["clickable", 1],
                            ], {width: "400px", height: "162px", background: "#2d250c", borderBottom: "3px solid #a900a9", borderRadius: "17px 14px 0 0"}],
                            ["always-scroll-column", [
                                ["blank", "5px"],
                                ["row", [["upgrade", 101], ["upgrade", 102], ["upgrade", 103]]],
                                ["row", [["upgrade", 104], ["upgrade", 105], ["upgrade", 106]]],
                                ["row", [["upgrade", 107], ["upgrade", 108], ["upgrade", 109]]],
                                ["row", [["upgrade", 110], ["upgrade", 111], ["upgrade", 112]]],
                                ["row", [["upgrade", 113], ["upgrade", 114], ["upgrade", 115]]],
                                ["row", [["upgrade", 116], ["upgrade", 117], ["upgrade", 118]]],
                                ["row", [["upgrade", 119], ["upgrade", 120], ["upgrade", 121]]],
                                ["row", [["upgrade", 122], ["upgrade", 123], ["upgrade", 124]]],
                                ["row", [["upgrade", 125], ["upgrade", 126], ["upgrade", 127]]],
                                ["blank", "5px"],
                            ], {width: "400px", height: "327px", borderBottom: "3px solid #a900a9"}],
                            ["style-row", [
                                ["buyable", 101], ["buyable", 102], ["buyable", 103],
                                ["buyable", 104], ["buyable", 105], ["buyable", 106],
                            ], {width: "400px", height: "230px", background: "#2d250c", borderRadius: "0 0 14px 17px"}],
                        ], {width: "400px", height: "725px", background: "#161206", borderRight: "3px solid #a900a9", borderRadius: "17px", marginRight: "-1.5px"}],
                        ["style-column", [
                            ["top-column", [
                                ["blank", "10px"],
                                ["raw-html", () => {return "You have " + formatWhole(player.al.royalJelly) + " Royal Jelly"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "(+" + formatWhole(player.al.royalJellyGain) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "10px"],
                                ["clickable", 2],
                            ], {width: "400px", height: "162px", background: "#2d1624", borderBottom: "3px solid #a900a9", borderRadius: "17px 14px 0 0"}],
                            ["always-scroll-column", [
                                ["blank", "5px"],
                                ["row", [["upgrade", 201], ["upgrade", 202], ["upgrade", 203]]],
                                ["row", [["upgrade", 204], ["upgrade", 205], ["upgrade", 206]]],
                                ["row", [["upgrade", 207], ["upgrade", 208], ["upgrade", 209]]],
                                ["row", [["upgrade", 210], ["upgrade", 211], ["upgrade", 212]]],
                                ["row", [["upgrade", 213], ["upgrade", 214], ["upgrade", 215]]],
                                ["row", [["upgrade", 216], ["upgrade", 217], ["upgrade", 218]]],
                                ["row", [["upgrade", 219], ["upgrade", 220], ["upgrade", 221]]],
                                ["row", [["upgrade", 222], ["upgrade", 223], ["upgrade", 224]]],
                                ["row", [["upgrade", 225], ["upgrade", 226], ["upgrade", 227]]],
                                ["blank", "5px"],
                            ], {width: "400px", height: "327px", borderBottom: "3px solid #a900a9"}],
                            ["style-row", [
                                ["buyable", 201], ["buyable", 202], ["buyable", 203],
                                ["buyable", 204], ["buyable", 205], ["buyable", 206],
                            ], {width: "400px", height: "230px", background: "#2d1624", borderRadius: "0 0 17px 14px"}],
                        ], {width: "400px", height: "725px", background: "#160b12", borderLeft: "3px solid #a900a9", borderRadius: "17px", marginLeft: "-1.5px"}],
                    ], {width: "803px", height: "725px", background: "#a900a9", border: "3px solid #a900a9", borderRadius: "20px"}],
                ],
            },
            "Cocoon": {
                buttonStyle: {borderColor: "#a900a9", borderRadius: "15px"},
                unlocked: true,
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "Highest Honeycombs", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ], {width: "399px", height: "40px", background: "#2d250c", borderRadius: "17px 0 0 0"}],
                                ["style-column", [
                                    ["raw-html", () => {return formatWhole(player.al.highestHoneycomb)}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ], {width: "399px", height: "30px", background: "#161206", borderRadius: "0"}],
                            ], {width: "399px", height: "70px", borderRight: "3px solid #a900a9"}],
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "Highest Royal Jelly", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ], {width: "398px", height: "40px", background: "#2d1624", borderRadius: "0 17px 0 0"}],
                                ["style-column", [
                                    ["raw-html", () => {return formatWhole(player.al.highestRoyalJelly)}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ], {width: "398px", height: "30px", background: "#160b12", borderRadius: "0"}],
                            ], {width: "398px", height: "70px"}],
                        ], {width: "800px", height: "70px", borderBottom: "3px solid #a900a9", borderRadius: "17px 17px 0 0"}],
                        ["style-row", [
                            ["style-row", [
                                ["column", [
                                    ["style-row", [], {width: "3px", height: "23px", background: "#726241", marginRight: "-3px"}],
                                    ["bar", "Cocoon1"],
                                    ["blank", "23px"],
                                ]],
                                ["bar", "Cocoon2"],
                            ], {width: "399px", height: "652px", borderRight: "3px solid #a900a9"}],
                            ["top-column", [
                                ["style-column", [
                                    ["raw-html", "Current Effects", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                    ["raw-html", "Requires both resources to obtain effect", {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                                ], {width: "398px", height: "63px", background: "#250025", borderBottom: "3px solid #a900a9"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1"}, true, "white", () => {return player.al.cocoonLevel >= 1}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "x1.5 Aleph Resources"}, true, "white", () => {return player.al.cocoonLevel >= 1}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "10"}, true, "white", () => {return player.al.cocoonLevel >= 2}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "Unlock a new bee research"}, true, "white", () => {return player.al.cocoonLevel >= 2}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 1 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "100"}, true, "white", () => {return player.al.cocoonLevel >= 3}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "Unlock flower rigging"}, true, "white", () => {return player.al.cocoonLevel >= 3}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 2 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1,000"}, true, "white", () => {return player.al.cocoonLevel >= 4}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "Unlock a new bee research"}, true, "white", () => {return player.al.cocoonLevel >= 4}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 3 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "10,000"}, true, "white", () => {return player.al.cocoonLevel >= 5}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return player.al.cocoonLevel >= 5 ? "Enhance Tav's Domain" : "Enhance a celestial power"}, true, "white", () => {return player.al.cocoonLevel >= 5}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 4 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "100,000"}, true, "white", () => {return player.al.cocoonLevel >= 6}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "Skip picking flower stems"}, true, "white", () => {return player.al.cocoonLevel >= 6}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 5 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1,000,000"}, true, "white", () => {return player.al.cocoonLevel >= 7}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "<p style='font-size:12px;line-height:1'>Start with 1 of each<br>circular/pentagonal red flower</p>"}, true, "white", () => {return player.al.cocoonLevel >= 7}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 6 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "10,000,000"}, true, "white", () => {return player.al.cocoonLevel >= 8}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "Halve all flower cooldowns"}, true, "white", () => {return player.al.cocoonLevel >= 8}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 7 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "100,000,000"}, true, "white", () => {return player.al.cocoonLevel >= 9}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "Unlock a new bee research"}, true, "white", () => {return player.al.cocoonLevel >= 9}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 8 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1e9"}, true, "white", () => {return player.al.cocoonLevel >= 10}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return player.al.cocoonLevel >= 10 ? "Enhance Funify" : "Enhance a celestial power"}, true, "white", () => {return player.al.cocoonLevel >= 10}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 9 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1e14"}, true, "white", () => {return player.al.cocoonLevel >= 11}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "Improve flower rigging"}, true, "white", () => {return player.al.cocoonLevel >= 11}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 10 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1e16"}, true, "white", () => {return player.al.cocoonLevel >= 12}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["tooltip-row", [
                                        ["color-text", [() => {return "Triple Pre-Aleph Resources"}, true, "white", () => {return player.al.cocoonLevel >= 12}, "gray"]],
                                        ["raw-html", "<div class='bottomTooltip'>Disclaimer<hr><small>Nectar has Pre-Aleph multiplier<br>applied at ^0.5 strength</small></div>"],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 11 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1e18"}, true, "white", () => {return player.al.cocoonLevel >= 13}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "<p style='font-size:13px'>Bee Research no longer spends bees</p>"}, true, "white", () => {return player.al.cocoonLevel >= 13}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 12 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1e20"}, true, "white", () => {return player.al.cocoonLevel >= 14}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "Unlock a new bee research"}, true, "white", () => {return player.al.cocoonLevel >= 14}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 13 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1e22"}, true, "white", () => {return player.al.cocoonLevel >= 15}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "x2 Aleph Resources"}, true, "white", () => {return player.al.cocoonLevel >= 15}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 14 ? {width: "398px", height: "35px", background: "#190019", borderBottom: "2px solid #a900a9"} : {display: "none !important"}}],
                                ["style-row", [
                                    ["style-row", [
                                        ["color-text", [() => {return "1e25"}, true, "white", () => {return player.al.cocoonLevel >= 16}, "gray"]],
                                    ], {width: "115px", height: "35px", borderRight: "2px solid #a900a9"}],
                                    ["style-row", [
                                        ["color-text", [() => {return "COMING SOON"}, true, "white", () => {return player.al.cocoonLevel >= 16}, "gray"]],
                                    ], {width: "281px", height: "35px"}],
                                ], () => {return player.al.cocoonLevel >= 15 ? {width: "398px", height: "35px", background: "#190019", borderRadius: "0 0 17px 0"} : {display: "none !important"}}],
                            ], {width: "398px", height: "652px"}],
                        ], {width: "800px", height: "652px"}],
                    ], {width: "800px", height: "725px", background: "#0c000c", border: "3px solid #a900a9", borderRadius: "20px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["style-row", [
            ["raw-html", () => {return "You have " + format(player.bb.beeBread) + " Bee Bread"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(" + format(player.bb.beeBreadPerSecond) + "/s)"}, {color: "white", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["style-row", [
            ["raw-html", () => {return "You have " + format(player.ho.honey) + " Honey"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(" + format(player.ho.honeyPerSecond) + "/s)"}, {color: "white", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["microtabs", "Tabs", {borderWidth: "0"}],
        ["blank", "20px"],
    ],
    layerShown() { return player.startedGame && (player.bee.totalResearch.gte(95) || player.al.show) }
})
