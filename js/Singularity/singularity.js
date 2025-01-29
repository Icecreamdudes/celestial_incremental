var tree3 = [["coa", "cop"], ["ra", "cs", "sd"]]
addLayer("s", {
    name: "Universe 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "3", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        singularityPoints: new Decimal(0),
        singularityPointsToGet: new Decimal(0),
        singularityTime: new Decimal(0),

        singularities: new Decimal(0),
        singularitiesToGet: new Decimal(0),

        highestSingularityPoints: new Decimal(0),

        sMax: false,
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, red 0%, black 100%)",
            "background-origin": "border-box",
            "border-color": "#800000",
        }
      },

    tooltip: "Universe 3 - Domain of Singularity",
    color: "white",
    update(delta) {

        let onepersec = new Decimal(1)
        if (player.subtabs["s"]['stuff'] == 'Portal')
        {
            player.po.lastUniverse = 's'
            player.tab = "po"
            player.subtabs["s"]['stuff'] = 'Features'
        }

        player.s.singularitiesToGet = new Decimal(1)

        if (player.in.infinityPoints.pow(0.125).div(15000).lt(1e20)) 
        {
            player.s.singularityPointsToGet = player.in.infinityPoints.pow(0.125).div(15000)
        } else
        {
            player.s.singularityPointsToGet = Decimal.mul(1e20, player.in.infinityPoints.pow(0.02).div(55000))
        }


        if (hasUpgrade("ev8", 22)) player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(upgradeEffect("ev8", 22))
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(buyableEffect("s", 11))
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(buyableEffect("fu", 16))
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(player.fu.angerEffect2)
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(player.cb.evolvedEffects[9][1])

        if (player.s.singularityPoints.gte(player.s.highestSingularityPoints))
        {
            player.s.highestSingularityPoints = player.s.singularityPoints
        }

        player.s.singularityTime = player.s.singularityTime.add(onepersec.mul(delta))
    },
    branches: ["in"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "po"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.s.sMax == false },
            unlocked() { return true },
            onClick() {
                player.s.sMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.s.sMax == true  },
            unlocked() { return true },
            onClick() {
                player.s.sMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Singularity Upgrade I",
            unlocked() { return true},
            description: "Boost all pre-OTF currencies by x10.",
            cost: new Decimal("2"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
        },
        12:
        {
            title: "Singularity Upgrade II",
            unlocked() { return true},
            description: "Gain 4% of all mastery points per second, and gain is based on highest of each currency.",
            cost: new Decimal("50"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: { width: '150px', "min-height": '120px' },
        },
        13:
        {
            title: "Singularity Upgrade III",
            unlocked() { return true},
            description: "Boost pollinators, crystal, and time cubes based on unspent singularity points.",
            cost: new Decimal("3600"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            effect() {
                return player.s.singularityPoints.pow(1.2).div(5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x' }, // Add formatting to the effect
            style: { width: '175px', "min-height": '120px' },
        },
        14:
        {
            title: "Singularity Upgrade IV",
            unlocked() { return true},
            description: "Keep anonymity upgrades on grass-skip, oil, and proto memory resets.",
            cost: new Decimal("800000"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: { width: '135px', "min-height": '120px' },
        },
        15:
        {
            title: "Singularity Upgrade V",
            unlocked() { return true},
            description: "Stay at pent 30 on all resets.",
            cost: new Decimal("4e7"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: { width: '125px', "min-height": '120px' },
        },
        16:
        {
            title: "Singularity Upgrade VI",
            unlocked() { return true},
            description: "Tetrate check back effect to the ^^1.003.",
            cost: new Decimal("1e10"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: { width: '125px', "min-height": '120px' },
        },
        17:
        {
            title: "Singularity Upgrade VII",
            unlocked() { return true},
            description: "Unlock an additional OTF slot.",
            cost: new Decimal("5e12"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: { width: '125px', "min-height": '120px' },
        },
        18:
        {
            title: "Singularity Upgrade VIII",
            unlocked() { return true},
            description: "Unlock core scraps, and both check back studies are always at max.",
            cost: new Decimal("1e23"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: { width: '125px', "min-height": '120px' },
        },
        19:
        {
            title: "Singularity Upgrade IX",
            unlocked() { return true},
            description: "Unlock paragon scraps (in core scraps).",
            cost: new Decimal("1e27"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: { width: '125px', "min-height": '120px' },
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2,getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>SP Doubler"
            },
            display() {
                return "which are multiplying singularity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.sMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(3,getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>IP Tripler"
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.sMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(100, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Steel Centupler"
            },
            display() {
                return "which are multiplying steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.sMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {
        11: {
            requirementDescription: "<h3>1 Singularity",
            effectDescription: "Start every singularity reset with 8 infinities. No longer have to rebeat Tav (Break infinity always unlocked). Unlock realm essence and the factory.",
            done() { return player.s.singularities.gte(1) },
            style: { width: '800px', "min-height": '75px' },
        },
        12: {
            requirementDescription: "<h3>2 Singularities",
            effectDescription: "No more having to unlock portal in cantepocalypse, keep all infinity and grass-skip milestones. Unlock the charger and new pet evolutions.",
            done() { return player.s.singularities.gte(2) },
            style: { width: '800px', "min-height": '75px' },
        },
        13: {
            requirementDescription: "<h3>3 Singularities",
            effectDescription: "Always set automation tier to hex, produce 10% of alternate broken infinities per second, produce 1% of galaxy dust per second, autobuy infinity power and alt inf buyables, and unlock radiation.",
            done() { return player.s.singularities.gte(3) },
            style: { width: '800px', "min-height": '85px' },
        },
        14: {
            requirementDescription: "<h3>4 Singularities",
            effectDescription: "Keep XPBoost on singularity resets, unlock new goldsmith and marcelacoplao content, keep moonstone buyables on reset, and unlock singularity dimensions.",
            done() { return player.s.singularities.gte(4) },
            style: { width: '800px', "min-height": '75px' },
        },
        15: {
            requirementDescription: "<h3>5 Singularities",
            effectDescription: "Keep check back buyables on singularity resets, realm mods don't cost cante cores on activation and gain 1% of each realm mod per second, keep challenges on reset, and unlock new radiation and singularity point buyables.",
            done() { return player.s.singularities.gte(5) },
            style: { width: '800px', "min-height": '85px' },
        },
        16: {
            requirementDescription: "<h3>6 Singularities",
            effectDescription: "Autobuy blessings, realm mod, challenge dice points, crystal, steel, pollinator, time cube, replicanti, galaxy dust, repli-grass, grass-skippers, linkers, and proto memory buyables, and gain 10% of blank mods per second.",
            done() { return player.s.singularities.gte(6) },
            style: { width: '800px', "min-height": '85px' },
        },
        17: {
            requirementDescription: "<h3>7 Singularities",
            effectDescription: "Autobuy infinity dimensions, autobuy all pre-singularity upgrades, have one of every antimatter dimensions autobuyer and unlock funify.",
            done() { return player.s.singularities.gte(7) },
            style: { width: '800px', "min-height": '75px' },
        },
        18: {
            requirementDescription: "<h3>12 Singularities",
            effectDescription: "Start singularity with infinity broken and alt-uni 1 unlocked, singularity resets don't change the screen, and autocruncher toggles don't get reset.",
            done() { return player.s.singularities.gte(12) },
            style: { width: '800px', "min-height": '75px' },
        },
        19: {
            requirementDescription: "<h3>25 Singularities",
            effectDescription: "Start each singularity with every universe 2 layer unlocked, and hex is kept on singularity reset, and always autobuy tetr, and autoroll cooldown is 10x shorter.",
            done() { return player.s.singularities.gte(12) },
            style: { width: '800px', "min-height": '75px' },
        },
        //REMINDER: MAKE THE TIME MACHINE at some point
    },
    challenges: {
    },
    infoboxes: {
        1: {
            title: "Singularity",
            body() { return "When mass is confined to an infinitely small point of space, it forms a singularity. Singularities are much more powerful versions of infinities, but their power was neglected by the original seven due to unknown reasons. It was believed that the power of singularity causes celestials to go rogue, as they become remorseless and evil due to some superphysical power. Others say that the original seven avoided using the power of singularity as it would lead to the destruction of worlds. The original seven opted to utilize eternities, which was an infinite concentration of time, instead of matter." },
            unlocked() { return hasMilestone("s", 11) },      
        },
        2: {
            title: "Singularity Core",
            body() { return "Matos, the celestial of machines discovered a way of controlling the power of singularity without being affected by it's negative properties. By extracting the power from singularities and concentrating them into a core. The power is protected by a layer of starmetal, which is a metal extracted from dying stars. However, the singularity core is still unstable. It needs a fuel source in order to be stabilized. With all three of these factors, a the power of singularities can be used through cores. Matos gave his cores to other celestials in order to make them stronger. He eventually started mass producing cores, with using two machines: The core assembler, and the core processor." },
            unlocked() { return hasMilestone("s", 19) },      
        },
    },
    microtabs: {
        stuff: {
            "Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["tree", tree3],
                ]

            },
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
        ["row", [["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14],["aupgrade", 15],["aupgrade", 16],["upgrade", 17],]],
        ["row", [["upgrade", 18],["upgrade", 19],]],
    ]

            },
            "Singularity Milestones": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.s.singularities) + "</h3> singularities." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.s.singularitiesToGet) + "</h3> singularities on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["milestone", 11],]],
        ["row", [["milestone", 12],]],
        ["row", [["milestone", 13],]],
        ["row", [["milestone", 14],]],
        ["row", [["milestone", 15],]],
        ["row", [["milestone", 16],]],
        ["row", [["milestone", 17],]],
        ["row", [["milestone", 18],]],
        ["row", [["milestone", 19],]],
    ]

            },
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("s", 15) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain " + format(player.s.singularityPointsToGet) + " singularity points on reset. (Based on infinity points)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.s.singularityPointsToGet.gte(1e20) ? "(softcapped)" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2],["clickable", 3],]],
                    ["blank", "25px"],
                ["row", [["buyable", 11],["buyable", 12],["buyable", 13],]],
    ]

            },
            "Portal": {
                buttonStyle() { return { 'color': 'black', 'border-color': 'purple', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', } },
                unlocked() { return hasUpgrade("ad", 13) || player.s.highestSingularityPoints.gte(0)},
                content:
                [
                ]
            },
            "Settings": settingsMicrotab,
        },
    },

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain " + format(player.s.singularityPointsToGet) + " singularity points on reset. (Based on infinity points)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return player.s.singularityPointsToGet.gte(1e20) ? "(softcapped)" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["microtabs", "stuff", { 'border-width': '0px' }], 
        ],
    layerShown() { return player.startedGame == true && player.ca.defeatedCante || player.s.highestSingularityPoints.gt(0)}
})
