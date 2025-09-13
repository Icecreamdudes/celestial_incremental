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
            if (player.cs.scraps[prop].gain.gte(1000)) player.cs.scraps[prop].gain = player.cs.scraps[prop].gain.div(1000).pow(0.1).mul(1000) // BASE SOFTCAP
            if (player.ma.matosDefeated) player.cs.scraps[prop].gain = player.cs.scraps[prop].gain.add(1000)

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
                let look = {minHeight: "47px", border: "3px solid #333", fontSize: "14px", borderRadius: "0px"}
                if (player.ma.matosDefeated) {
                    look.width = "800px"
                } else if (hasUpgrade("sma", 107)) {
                    look.width = "550px"
                } else {
                    look.width = "273px"
                }
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
                player.subtabs["cs"]["scrap"] = "point"
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
                player.subtabs["cs"]["scrap"] = "factor"
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
                player.subtabs["cs"]["scrap"] = "prestige"
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
                player.subtabs["cs"]["scrap"] = "tree"
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
                player.subtabs["cs"]["scrap"] = "grass"
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
                player.subtabs["cs"]["scrap"] = "grasshopper"
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
                player.subtabs["cs"]["scrap"] = "code"
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
                player.subtabs["cs"]["scrap"] = "dice"
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
                player.subtabs["cs"]["scrap"] = "rocket"
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
                player.subtabs["cs"]["scrap"] = "antimatter"
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
                player.subtabs["cs"]["scrap"] = "infinity"
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
                player.subtabs["cs"]["scrap"] = "checkback"
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
                player.subtabs["cs"]["scrap"] = "radioactive"
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
        scrap: {
            "point": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.point.amount) + " <small>Point Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.point.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.point.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts time cube effects by ^" + formatShort(player.cs.scraps.point.effect)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.point.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 101], ["upgrade", 102], ["upgrade", 103],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "factor": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.factor.amount) + " <small>Factor Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.factor.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.factor.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Increases factor power effect softcap by +^" + formatShort(player.cs.scraps.factor.effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.factor.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 201], ["upgrade", 202], ["upgrade", 203],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "prestige": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.prestige.amount) + " <small>Prestige Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.prestige.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.prestige.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Increases prestige effect softcaps by +^" + formatShort(player.cs.scraps.prestige.effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.prestige.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 301], ["upgrade", 302], ["upgrade", 303],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "tree": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.tree.amount) + " <small>Tree Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.tree.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.tree.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Increases tree effect softcap by +^" + formatShort(player.cs.scraps.tree.effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.tree.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 401], ["upgrade", 402], ["upgrade", 403],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "grass": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.grass.amount) + " <small>Grass Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.grass.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.grass.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Increases grass effect softcaps by +^" + formatShort(player.cs.scraps.grass.effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.grass.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 501], ["upgrade", 502], ["upgrade", 503],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "grasshopper": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.grasshopper.amount) + " <small>Grasshopper Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.grasshopper.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.grasshopper.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Increases grasshopper effect softcaps by +^" + formatShort(player.cs.scraps.grasshopper.effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.grasshopper.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 601], ["upgrade", 602], ["upgrade", 603],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "code": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.code.amount) + " <small>Code Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.code.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.code.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts mod gain by ^" + formatShort(player.cs.scraps.code.effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.code.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 701], ["upgrade", 702], ["upgrade", 703],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "dice": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.dice.amount) + " <small>Dice Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.dice.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.dice.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts tier 1 booster dice effects by ^" + formatShort(player.cs.scraps.dice.effect)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.dice.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 801], ["upgrade", 802], ["upgrade", 803],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "rocket": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.rocket.amount) + " <small>Rocket Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.rocket.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.rocket.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts rocket fuel effects by ^" + formatShort(player.cs.scraps.rocket.effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.rocket.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 901], ["upgrade", 902], ["upgrade", 903],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "antimatter": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.antimatter.amount) + " <small>Antimatter Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.antimatter.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.antimatter.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts antimatter softcap base by x" + formatShort(player.cs.scraps.antimatter.effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.antimatter.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 1001], ["upgrade", 1002], ["upgrade", 1003],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "infinity": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.infinity.amount) + " <small>Infinity Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.infinity.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.infinity.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts base infinity point gain by ^" + formatShort(player.cs.scraps.infinity.effect, 3)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.infinity.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 1101], ["upgrade", 1102], ["upgrade", 1103],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "checkback": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.checkback.amount) + " <small>Check Back Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.checkback.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.checkback.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts check back xp by x" + formatShort(player.cs.scraps.checkback.effect)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.checkback.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 1201], ["upgrade", 1202], ["upgrade", 1203],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
            "radioactive": {
                content: [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "<small>You have</small> " + formatShorterWhole(player.cs.scraps.radioactive.amount) + " <small>Radioactive Core Scrap</small>"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return hasUpgrade("sma", 107) ? "(+" + formatShort(player.cs.scraps.radioactive.gain.mul(0.01)) + "/s)" : "(+" + formatShorterWhole(player.cs.scraps.radioactive.gain) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts radiation gain by x" + formatShort(player.cs.scraps.radioactive.effect)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.cs.scraps.radioactive.amount.gte(1e10) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "530px", height: "60px"}],
                    ["style-row", [
                        ["upgrade", 1301], ["upgrade", 1302], ["upgrade", 1303],
                    ], () => {return !player.ma.matosDefeated ? {width: "378px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"} : {width: "748px", height: "130px", backgroundColor: "#3d3834", borderRadius: "15px", marginBottom: "10px"}}],
                ]
            },
        },
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
                        ], () => {return !player.ma.matosDefeated ? {width: "247px", height: "250px"} : {display: "none !important"}}],
                        ["style-column", [
                            ["buttonless-microtabs", "scrap", {borderWidth: "0px"}],
                            ["style-row", [
                                ["clickable", 1],
                                ["style-row", [], () => {return !hasUpgrade("sma", 107) ? {width: "3px", height: "47px", backgroundColor: "#ababab"} : {display: "none !important"}}],
                                ["clickable", 2]
                            ], () => {return !player.ma.matosDefeated ? {width: "550px", height: "47px", backgroundColor: "#111", borderTop: "3px solid #ababab"} : {width: "800px", height: "47px", backgroundColor: "#111", borderTop: "3px solid #ababab"}}],
                        ], () => {return !player.ma.matosDefeated ? {width: "550px", height: "250px", borderLeft: "3px solid #ababab"} : {width: "800px", height: "250px"}}],
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
            ["raw-html", () => {return player.in.infinityPoints.gte("2.71e3793") ? "[SOFTCAPPED<sup>2</sup>]" : player.in.infinityPoints.gte(2.5e193) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("s", 19)  }
})
