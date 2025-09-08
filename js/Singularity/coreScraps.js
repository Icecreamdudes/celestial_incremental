const CORE_SCRAP = {
    point: {
        name: "Point Core Scrap",
        effect: "Boosts time cube effects by ^",
    },
    factor: {
        name: "Factor Core Scrap",
        effect: "Increases factor power effect softcap by +^",
    },
    prestige: {
        name: "Prestige Core Scrap",
        effect: "Increases prestige effect softcaps by +^",
    },
    tree: {
        name: "Tree Core Scrap",
        effect: "Increases tree effect softcap by +^",
    },
    grass: {
        name: "Grass Core Scrap",
        effect: "Increases grass effect softcaps by +^",
    },
    grasshopper: {
        name: "Grasshopper Core Scrap",
        effect: "Increases grasshopper effect softcaps by ^",
    },
    code: {
        name: "Code Core Scrap",
        effect: "Boosts mod gain by ^",
    },
    dice: {
        name: "Dice Core Scrap",
        effect: "Boosts tier 1 booster dice effects by ^",
    },
    rocket: {
        name: "Rocket Core Scrap",
        effect: "Boosts rocket fuel effects by ^",
    },
    antimatter: {
        name: "Antimatter Core Scrap",
        effect: "Boosts antimatter softcap base by x",
    },
    infinity: {
        name: "Infinity Core Scrap",
        effect: "Boosts base infinity point gain by ^",
    },
    checkback: {
        name: "Check Back Core Scrap",
        effect: "Boosts check back xp by x",
    },
    radioactive: {
        name: "Radioactive Core Scrap",
        effect: "Boosts radiation gain by x",
    },
}
addLayer("cs", {
    name: "Core Scraps", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CS", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        scraps: {
            point: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            factor: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(0),
            },
            prestige: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            tree: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            grass: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            grasshopper: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            code: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            dice: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            rocket: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            antimatter: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            infinity: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            checkback: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
            radioactive: {
                amount: new Decimal(0),
                gain: new Decimal(0),
                effect: new Decimal(1),
            },
        },

        scrapIndex: "point",

        coreScraps: new Decimal(0),
        coreScrapsToGet: new Decimal(0),

        scrapCoreOnReset: false,

        resourceCoreScraps: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0), ],
        resourceCoreScrapsToGet: new Decimal(0),

        coreScrapMax: false,

        paragonScraps: new Decimal(0),
        paragonScrapsEffect: new Decimal(1),
        canBuyParagonScraps: false,
    
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #4f4b45 0%, #2b2522 100%)",
            "background-origin": "border-box",
            "border-color": "#ababab",
            "color": "#ababab",
        };
    },
    tooltip: "Core Scraps",
    branches: ["ra", "sd"],
    color: "#4f4b45",
    update(delta) {
        let onepersec = new Decimal(1)

        // SCRAP GAIN
        for (let prop in player.cs.scraps) {
            player.cs.scraps[prop].gain = Decimal.pow(1.15, player.co.cores[prop].level).sub(1)
            if (player.cs.scraps[prop].gain.gte(1000)) player.cs.scraps[prop].gain = player.cs.scraps[prop].gain.div(1000).pow(0.5).mul(1000) // BASE SOFTCAP

            if (hasUpgrade("fu", 19)) player.cs.scraps[prop].gain = player.cs.scraps[prop].gain.mul(player.s.singularitiesEffect)
            player.cs.scraps[prop].gain = player.cs.scraps[prop].gain.mul(levelableEffect("pu", 204)[2])
            if (hasUpgrade("sma", 102)) player.cs.scraps[prop].gain = player.cs.scraps[prop].gain.mul(upgradeEffect("sma", 102))
            player.cs.scraps[prop].gain = player.cs.scraps[prop].gain.mul(buyableEffect("ep0", 11))
            player.cs.scraps[prop].gain = player.cs.scraps[prop].gain.mul(levelableEffect("pet", 309)[1])

            // FLOOR SCRAP GAIN
            if (hasUpgrade("sma", 107)) player.cs.scraps[prop].amount = player.cs.scraps[prop].amount.add(player.cs.scraps[prop].gain.mul(0.01).mul(delta))
            if (!hasUpgrade("sma", 107)) player.cs.scraps[prop].gain = player.cs.scraps[prop].gain.floor()
        }

        player.cs.scraps.point.effect = player.cs.scraps.point.amount.add(1).log(10).mul(0.5).add(1)
        if (player.cs.scraps.point.effect.gte(1e10)) player.cs.scraps.point.effect = player.cs.scraps.point.amount.add(1).log(10).mul(0.2).add(4)

        player.cs.scraps.factor.effect = player.cs.scraps.factor.amount.add(1).log(10).mul(0.02)
        if (player.cs.scraps.factor.amount.gte(1e10)) player.cs.scraps.factor.effect = player.cs.scraps.factor.amount.add(1).log(10).mul(0.002).add(0.18).min(0.4)

        player.cs.scraps.prestige.effect = player.cs.scraps.prestige.amount.add(1).log(10).mul(0.02)
        if (player.cs.scraps.prestige.amount.gte(1e10)) player.cs.scraps.prestige.effect = player.cs.scraps.prestige.amount.add(1).log(10).mul(0.002).add(0.18).min(0.4)

        player.cs.scraps.tree.effect = player.cs.scraps.tree.amount.add(1).log(10).mul(0.02)
        if (player.cs.scraps.tree.amount.gte(1e10)) player.cs.scraps.tree.effect = player.cs.scraps.tree.amount.add(1).log(10).mul(0.002).add(0.18).min(0.4)

        player.cs.scraps.grass.effect = player.cs.scraps.grass.amount.add(1).log(10).mul(0.02)
        if (player.cs.scraps.grass.amount.gte(1e10)) player.cs.scraps.grass.effect = player.cs.scraps.grass.amount.add(1).log(10).mul(0.002).add(0.18).min(0.4)

        player.cs.scraps.grasshopper.effect = player.cs.scraps.grasshopper.amount.add(1).log(10).mul(0.01)
        if (player.cs.scraps.grasshopper.amount.gte(1e10)) player.cs.scraps.grasshopper.effect = player.cs.scraps.grasshopper.amount.add(1).log(10).mul(0.001).add(0.09).min(0.2)

        player.cs.scraps.code.effect = player.cs.scraps.code.amount.add(1).log(10).mul(0.01).add(1)
        if (player.cs.scraps.code.amount.gte(1e10)) player.cs.scraps.code.effect = player.cs.scraps.code.amount.add(1).log(10).mul(0.001).add(1.09)

        player.cs.scraps.dice.effect = player.cs.scraps.dice.amount.add(1).log(10).pow(2).add(1)
        if (player.cs.scraps.dice.amount.gte(1e10)) player.cs.scraps.dice.effect = player.cs.scraps.dice.amount.add(1).log(10).mul(0.2).add(18)

        player.cs.scraps.rocket.effect = player.cs.scraps.rocket.amount.add(1).log(10).mul(0.1).add(1)
        if (player.cs.scraps.rocket.amount.gte(1e10)) player.cs.scraps.rocket.effect = player.cs.scraps.rocket.amount.add(1).log(10).mul(0.01).add(1.9)

        player.cs.scraps.antimatter.effect = player.cs.scraps.antimatter.amount.add(1).log(10).mul(0.05).add(1)
        if (player.cs.scraps.antimatter.amount.gte(1e10)) player.cs.scraps.antimatter.effect = player.cs.scraps.antimatter.amount.add(1).log(10).mul(0.005).add(1.45)

        player.cs.scraps.infinity.effect = player.cs.scraps.infinity.amount.add(1).log(10).mul(0.2).add(1)
        if (player.cs.scraps.infinity.amount.gte(1e10)) player.cs.scraps.infinity.effect = player.cs.scraps.infinity.amount.add(1).log(10).mul(0.02).add(2.8)

        player.cs.scraps.checkback.effect = player.cs.scraps.checkback.amount.add(1).log(10).mul(0.7).add(1)
        if (player.cs.scraps.checkback.amount.gte(1e10)) player.cs.scraps.checkback.effect = player.cs.scraps.checkback.amount.add(1).log(10).mul(0.07).add(7.3)

        player.cs.scraps.radioactive.effect = Decimal.pow(2, player.cs.scraps.radioactive.amount.add(1).log(10))
        if (player.cs.scraps.radioactive.effect.gte(1e10)) player.cs.scraps.radioactive.effect = Decimal.pow(1.2, player.cs.scraps.radioactive.amount.add(1).log(10)).mul(165.4)
    },
    clickables: {
        1: {
            title: "Scrap Core",
            canClick() { return player.cs.scraps[player.cs.scrapIndex].gain.gte(1) },
            unlocked() {return !hasUpgrade("sma", 107)},
            onClick() {
                player.cs.scraps[player.cs.scrapIndex].amount = player.cs.scraps[player.cs.scrapIndex].amount.add(player.cs.scraps[player.cs.scrapIndex].gain)
                player.co.cores[player.cs.scrapIndex].xp = new Decimal(0)
                player.co.cores[player.cs.scrapIndex].totalxp = new Decimal(0)
                player.co.cores[player.cs.scrapIndex].level = new Decimal(0)
            },
            style() {
                let look = {width: "274px", minHeight: "47px", border: "3px solid #333", fontSize: "14px", borderRadius: "0px"}
                if (!this.canClick()) {
                    look.color = "rgba(0,0,0,0.8)"
                    look.backgroundColor = "#bf8f8f"
                } else {
                    look.color = "white"
                    look.backgroundColor = "#666"
                }
                return look
            },
        },
        2: {
            title() {
                if (!player.ev.evolutionsUnlocked[9]) return "LOCKED"
                return "Sacrifice Scrap"
            },
            tooltip() {
                let str = "+" + format(player.cs.scraps[player.cs.scrapIndex].amount.add(1).log(10).mul(player.ev4.offeringsBase)) + " Offerings"
                str = str.concat("<br><small>(" + format(player.ev4.offerings) + "/" + formatWhole(player.ev4.offeringReq) + ")</small>")
                if (player.ev.evolutionsUnlocked[9]) return str
                return ""
            },
            canClick() { return player.cs.scraps[player.cs.scrapIndex].amount.gt(0) && player.ev.evolutionsUnlocked[9]},
            unlocked: true,
            onClick() {
                player.ev4.offerings = player.ev4.offerings.add(player.cs.scraps[player.cs.scrapIndex].amount.add(1).log(10).mul(player.ev4.offeringsBase))
                player.cs.scraps[player.cs.scrapIndex].amount = new Decimal(0)
            },
            style() {
                let look = {width: "273px", minHeight: "47px", border: "3px solid #333", fontSize: "14px", borderRadius: "0px"}
                if (hasUpgrade("sma", 107)) look.width = "550px"
                if (!player.ev.evolutionsUnlocked[9]) {
                    look.color = "white"
                    look.backgroundColor = "#333"
                    look.cursor = "default"
                } else if (!this.canClick()) {
                    look.color = "rgba(0,0,0,0.8)"
                    look.backgroundColor = "#bf8f8f"
                } else {
                    look.color = "white"
                    look.backgroundColor = "#666"
                }
                return look
            },
        },
        101: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "point"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.point.color
                look.borderColor = CORE_STRENGTH[player.co.cores.point.strength].color
                return look
            },
        },
        102: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "factor"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.factor.color
                look.borderColor = CORE_STRENGTH[player.co.cores.factor.strength].color
                return look
            },
        },
        103: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "prestige"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.prestige.color
                look.borderColor = CORE_STRENGTH[player.co.cores.prestige.strength].color
                return look
            },
        },
        104: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "tree"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.tree.color
                look.borderColor = CORE_STRENGTH[player.co.cores.tree.strength].color
                return look
            },
        },
        105: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "grass"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.grass.color
                look.borderColor = CORE_STRENGTH[player.co.cores.grass.strength].color
                return look
            },
        },
        106: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "grasshopper"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.grasshopper.color
                look.borderColor = CORE_STRENGTH[player.co.cores.grasshopper.strength].color
                return look
            },
        },
        107: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "code"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.code.color
                look.borderColor = CORE_STRENGTH[player.co.cores.code.strength].color
                return look
            },
        },
        108: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "dice"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.dice.color
                look.borderColor = CORE_STRENGTH[player.co.cores.dice.strength].color
                return look
            },
        },
        109: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "rocket"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.rocket.color
                look.borderColor = CORE_STRENGTH[player.co.cores.rocket.strength].color
                return look
            },
        },
        110: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "antimatter"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.antimatter.color
                look.borderColor = CORE_STRENGTH[player.co.cores.antimatter.strength].color
                return look
            },
        },
        111: {
            canClick: true,
            unlocked: true,
            onClick() {
                player.cs.scrapIndex = "infinity"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.infinity.color
                look.borderColor = CORE_STRENGTH[player.co.cores.infinity.strength].color
                return look
            },
        },
        112: {
            canClick: true,
            unlocked() {return hasUpgrade("s", 20)},
            onClick() {
                player.cs.scrapIndex = "checkback"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.checkback.color
                look.borderColor = CORE_STRENGTH[player.co.cores.checkback.strength].color
                return look
            },
        },
        113: {
            canClick: true,
            unlocked() {return hasUpgrade("sma", 106)},
            onClick() {
                player.cs.scrapIndex = "radioactive"
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "15px solid", borderRadius: "50%", margin: "5px"}
                look.backgroundColor = CORE_INFO.radioactive.color
                look.borderColor = CORE_STRENGTH[player.co.cores.radioactive.strength].color
                return look
            },
        },
    },
    bars: {},
    upgrades: {
        101: {
            title: "Properly Ranked",
            unlocked() {return player.cs.scrapIndex == "point"},
            description: "Replace ranks hardcap with a heavy softcap.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.point },
            currencyDisplayName: "Point Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.point.color}
                return look
            },
        },
        102: {
            title: "Pent up",
            unlocked() {return player.cs.scrapIndex == "point"},
            description: "Improve pent effect formula.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.point },
            currencyDisplayName: "Point Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.point.color}
                return look
            },
        },
        103: {
            title: "Time Tesseract",
            unlocked() {return player.cs.scrapIndex == "point"},
            description: "Raise time cube gain by ^1.1.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.point },
            currencyDisplayName: "Point Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.point.color}
                return look
            },
        },
        201: {
            title: "Factored Factors",
            unlocked() {return player.cs.scrapIndex == "factor"},
            description: "Fuse factors and improve factor effects.",
            cost: new Decimal(1e3),
            onPurchase() {
                for (let i in player.f.buyables) {
                    player.f.buyables[i] = new Decimal(0)
                }
                player.subtabs["f"]['stuff'] = 'Factored'
            },
            currencyLocation() { return player.cs.scraps.factor },
            currencyDisplayName: "Factor Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.factor.color}
                return look
            },
        },
        202: {
            title: "Powered Power",
            unlocked() {return player.cs.scrapIndex == "factor"},
            description: "Double hex power gain.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.factor },
            currencyDisplayName: "Factor Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.factor.color}
                return look
            },
        },
        203: {
            title: "Fitted Factors",
            unlocked() {return player.cs.scrapIndex == "factor"},
            description: "Multiply factor base by x8,000.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.factor },
            currencyDisplayName: "Factor Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.factor.color}
                return look
            },
        },
        301: {
            title: "Practical Prestige",
            unlocked() {return player.cs.scrapIndex == "prestige"},
            description: "Raise 1st prestige effect by ^1.05. (Ignoring softcap)",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.prestige },
            currencyDisplayName: "Prestige Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.prestige.color}
                return look
            },
        },
        302: {
            title: "Dark Duplicate",
            unlocked() {return player.cs.scrapIndex == "prestige"},
            description: "Improve Dark Starmetal Upgrade IV.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.prestige },
            currencyDisplayName: "Prestige Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.prestige.color}
                return look
            },
        },
        303: {
            title: "Clearer Crystals",
            unlocked() {return player.cs.scrapIndex == "prestige"},
            description: "Improve crystal effect.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.prestige },
            currencyDisplayName: "Prestige Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.prestige.color}
                return look
            },
        },
        401: {
            title: "Unbefitting Branches",
            unlocked() {return player.cs.scrapIndex == "tree"},
            description: "Raise tree gain by ^1.1, but raise tree requirement by ^1.5.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.tree },
            currencyDisplayName: "Tree Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.tree.color}
                return look
            },
        },
        402: {
            title: "Cloned Cotyledons",
            unlocked() {return player.cs.scrapIndex == "tree"},
            description: "Centuple repli-leaf multiplier.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.tree },
            currencyDisplayName: "Tree Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.tree.color}
                return look
            },
        },
        403: {
            title: "Pruning Power",
            unlocked() {return player.cs.scrapIndex == "tree"},
            description: "Cube tree buyable effects.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.tree },
            currencyDisplayName: "Tree Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.tree.color}
                return look
            },
        },
        501: {
            title: "Mowed Grass",
            unlocked() {return player.cs.scrapIndex == "grass"},
            description: "Boost grass value by x1e450, but divide grass capacity by /45.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.grass },
            currencyDisplayName: "Grass Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.grass.color}
                return look
            },
        },
        502: {
            title: "Golden Seeds",
            unlocked() {return player.cs.scrapIndex == "grass"},
            description: "Square golden grass effect.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.grass },
            currencyDisplayName: "Grass Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.grass.color}
                return look
            },
        },
        503: {
            title: "Masterful Moon",
            unlocked() {return player.cs.scrapIndex == "grass"},
            description: "Improve third moonstone level effect.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.grass },
            currencyDisplayName: "Grass Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.grass.color}
                return look
            },
        },
        601: {
            title: "Symbiotic Studies",
            unlocked() {return player.cs.scrapIndex == "grasshopper"},
            description: "Unlock new grasshopper studies.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.grasshopper },
            currencyDisplayName: "Grasshopper Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.grasshopper.color}
                return look
            },
        },
        602: {
            title: "Hopscotch",
            unlocked() {return player.cs.scrapIndex == "grasshopper"},
            description: "Unlock a new grass-skip effect that boosts grasshoppers.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.grasshopper },
            currencyDisplayName: "Grasshopper Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.grasshopper.color}
                return look
            },
        },
        603: {
            title: "Cubic Casting",
            unlocked() {return player.cs.scrapIndex == "grasshopper"},
            description: "Cube foundry buyables.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.grasshopper },
            currencyDisplayName: "Grasshopper Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.grasshopper.color}
                return look
            },
        },
        701: {
            title: "Updating Base",
            unlocked() {return player.cs.scrapIndex == "code"},
            description: "Unlock a code experience effect that buffs factor base.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.code },
            currencyDisplayName: "Code Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.code.color}
                return look
            },
        },
        702: {
            title: "Sloppy Code",
            unlocked() {return player.cs.scrapIndex == "code"},
            description: "Multiply mod gain by x1e15, but raise mod requirement by ^5.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.code },
            currencyDisplayName: "Code Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.code.color}
                return look
            },
        },
        703: {
            title: "Lazy Coding",
            unlocked() {return player.cs.scrapIndex == "code"},
            description: "Idk man.<br>Heres ^1.1 mods<br>I guess.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.code },
            currencyDisplayName: "Code Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.code.color}
                return look
            },
        },
        801: {
            title: "Boosted Boosters",
            unlocked() {return player.cs.scrapIndex == "dice"},
            description: "Multiply Dice score by x10.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.dice },
            currencyDisplayName: "Dice Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.dice.color}
                return look
            },
        },
        802: {
            title: "Truly Rigged",
            unlocked() {return player.cs.scrapIndex == "dice"},
            description: "Booster dice always lands on the rigged option.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.dice },
            currencyDisplayName: "Dice Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.dice.color}
                return look
            },
        },
        803: {
            title: "Counted Challenges",
            unlocked() {return player.cs.scrapIndex == "dice"},
            description: "Gain a challenge dice effect that boosts dice score.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.dice },
            currencyDisplayName: "Dice Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.dice.color}
                return look
            },
        },
        901: {
            title: "Undiluted fuel",
            unlocked() {return player.cs.scrapIndex == "rocket"},
            description: "Improve infinity point ability formula.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.rocket },
            currencyDisplayName: "Rocket Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.rocket.color}
                return look
            },
        },
        902: {
            title: "Self-fueling boosts",
            unlocked() {return player.cs.scrapIndex == "rocket"},
            description: "Auto-activate the last three rocket fuel abilities.<br>(With highest RF)",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.rocket },
            currencyDisplayName: "Rocket Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.rocket.color}
                return look
            },
        },
        903: {
            title: "Fueled Generators",
            unlocked() {return player.cs.scrapIndex == "rocket"},
            description: "Square generator and charger buyables.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.rocket },
            currencyDisplayName: "Rocket Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.rocket.color}
                return look
            },
        },
        1001: {
            title: "Developed Dimensions",
            unlocked() {return player.cs.scrapIndex == "antimatter"},
            description: "Raise dimension boost by ^10.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.antimatter },
            currencyDisplayName: "Antimatter Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.antimatter.color}
                return look
            },
        },
        1002: {
            title: "Denser Galaxies",
            unlocked() {return player.cs.scrapIndex == "antimatter"},
            description: "Increase galaxy cap and triple galaxy effect base.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.antimatter },
            currencyDisplayName: "Antimatter Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.antimatter.color}
                return look
            },
        },
        1003: {
            title: "Galactic Replication",
            unlocked() {return player.cs.scrapIndex == "antimatter"},
            description: "Automate Replicanti Galaxy gain.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.antimatter },
            currencyDisplayName: "Antimatter Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.antimatter.color}
                return look
            },
        },
        1101: {
            title: "Boundless Pollination",
            unlocked() {return player.cs.scrapIndex == "infinity"},
            description: "Unlock the water pollinator.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.infinity },
            currencyDisplayName: "Infinity Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.infinity.color}
                return look
            },
        },
        1102: {
            title: "Infinitier Dimensions",
            unlocked() {return player.cs.scrapIndex == "infinity"},
            description: "Double ID softcap base.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.infinity },
            currencyDisplayName: "Infinity Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.infinity.color}
                return look
            },
        },
        1103: {
            title: "Opposites Attract",
            unlocked() {return player.cs.scrapIndex == "infinity"},
            description: "Improve IP Upgrade (4, 2).",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.infinity },
            currencyDisplayName: "Infinity Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.infinity.color}
                return look
            },
        },
        1201: {
            title: "Gilded Dust",
            unlocked() {return player.cs.scrapIndex == "checkback"},
            description: "Improve coin dust effect formula.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.checkback },
            currencyDisplayName: "Check Back Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.checkback.color}
                return look
            },
        },
        1202: {
            title: "Altered Altar",
            unlocked() {return player.cs.scrapIndex == "checkback"},
            description: "Multiply offering gain by x1.5.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.checkback },
            currencyDisplayName: "Check Back Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.checkback.color}
                return look
            },
        },
        1203: {
            title: "Check Sooner",
            unlocked() {return player.cs.scrapIndex == "checkback"},
            description: "Multiply checkback tickspeed by x1.1.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.checkback },
            currencyDisplayName: "Check Back Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.checkback.color}
                return look
            },
        },
        1301: {
            title: "Reduced Exposure",
            unlocked() {return player.cs.scrapIndex == "radioactive"},
            description: "Divide and extend the radiation softcap by /10.",
            cost: new Decimal(1e3),
            currencyLocation() { return player.cs.scraps.radioactive },
            currencyDisplayName: "Radioactive Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.radioactive.color}
                return look
            },
        },
        1302: {
            title: "Controlled Reactions",
            unlocked() {return player.cs.scrapIndex == "radioactive"},
            description: "Reduce SD radiation usage by /5.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.cs.scraps.radioactive },
            currencyDisplayName: "Radioactive Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.radioactive.color}
                return look
            },
        },
        1303: {
            title: "Non-ionizing Radiation",
            unlocked() {return player.cs.scrapIndex == "radioactive"},
            description: "Slightly reduce the radiation softcap.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.cs.scraps.radioactive },
            currencyDisplayName: "Radioactive Core Scraps",
            currencyInternalName: "amount",
            style() {
                let look = {color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#77bf5f"}
                else if (!canAffordUpgrade(this.layer, this.id)) {look.backgroundColor =  "#bf8f8f"}
                else {look.backgroundColor = CORE_INFO.radioactive.color}
                return look
            },
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {return "Lv." + formatWhole(player.co.cores[player.cs.scrapIndex].level) + "<br>" + CORE_INFO[player.cs.scrapIndex].name}, {color: "white", fontSize: "22px", fontFamily: "monospace"}],
                            ], {width: "247px", height: "50px", borderBottom: "3px solid #ababab"}],
                            ["style-row", [], () => {
                                let look = {boxSizing: "border-box", width: "150px", height: "150px", border: "22px solid", borderRadius: "50%", margin: "25px auto"}
                                look.backgroundColor = CORE_INFO[player.cs.scrapIndex].color
                                look.borderColor = CORE_STRENGTH[player.co.cores[player.cs.scrapIndex].strength].color
                                return look
                            }],
                        ], {width: "247px", height: "250px"}],
                        ["style-column", [
                            ["style-column", [
                                ["row", [
                                    ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps[player.cs.scrapIndex].amount) + " <small>" + CORE_SCRAP[player.cs.scrapIndex].name + "</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps[player.cs.scrapIndex].gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps[player.cs.scrapIndex].gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                                ]],
                                ["row", [
                                    ["raw-html", () => {return CORE_SCRAP[player.cs.scrapIndex].effect + format(player.cs.scraps[player.cs.scrapIndex].effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", () => {return player.cs.scraps[player.cs.scrapIndex].amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
                                ]],
                            ], {width: "530px", height: "60px"}],
                            ["style-row", [
                                ["upgrade", 101], ["upgrade", 102], ["upgrade", 103],
                                ["upgrade", 201], ["upgrade", 202], ["upgrade", 203],
                                ["upgrade", 301], ["upgrade", 302], ["upgrade", 303],
                                ["upgrade", 401], ["upgrade", 402], ["upgrade", 403],
                                ["upgrade", 501], ["upgrade", 502], ["upgrade", 503],
                                ["upgrade", 601], ["upgrade", 602], ["upgrade", 603],
                                ["upgrade", 701], ["upgrade", 702], ["upgrade", 703],
                                ["upgrade", 801], ["upgrade", 802], ["upgrade", 803],
                                ["upgrade", 901], ["upgrade", 902], ["upgrade", 903],
                                ["upgrade", 1001], ["upgrade", 1002], ["upgrade", 1003],
                                ["upgrade", 1101], ["upgrade", 1102], ["upgrade", 1103],
                                ["upgrade", 1201], ["upgrade", 1202], ["upgrade", 1203],
                                ["upgrade", 1301], ["upgrade", 1302], ["upgrade", 1303],
                            ], {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}],
                            ["style-row", [
                                ["clickable", 1],
                                ["style-row", [], () => {return !hasUpgrade("sma", 107) ? {width: "3px", height: "47px", backgroundColor: "#ababab"} : {display: "none !important"}}],
                                ["clickable", 2]
                            ], {width: "550px", height: "47px", backgroundColor: "#111", borderTop: "3px solid #ababab"}],
                        ], {width: "550px", height: "250px", borderLeft: "3px solid #ababab"}],
                    ], {width: "800px", height: "250px", backgroundColor: "#4f4b45", border: "3px solid #ababab", borderRadius: "15px 15px 0 0"}],
                    ["style-column", [
                        ["blank", "10px"],
                        ["row", [
                            ["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105], 
                            ["clickable", 106], ["clickable", 107], ["clickable", 108], ["clickable", 109], ["clickable", 110],
                            ["clickable", 111], ["clickable", 112], ["clickable", 113],
                        ]],
                        ["blank", "10px"],
                    ], {width: "800px", backgroundColor: "#2b2522", borderLeft: "3px solid #ababab", borderRight: "3px solid #ababab", borderBottom: "3px solid #ababab", borderRadius: "0 0 15px 15px"}],
                ]
            },
        },
    }, 

    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.s.singularityPointsToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.in.infinityPoints.gte(1e40)) {look.color = "white"} else {look.color = "gray"} 
                return look
            }],
            ["raw-html", () => {return player.s.singularityPointsToGet.gte(2.71e3793) ? "[SOFTCAPPED<sup>2</sup>]" : player.s.singularityPointsToGet.gte(1e20) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("s", 19)  }
})
