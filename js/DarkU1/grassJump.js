addLayer("dgj", {
    name: "<span style='text-shadow:0 0 5px #00FEFF'>Grass Jump</span>", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<span style='text-shadow:0 0 5px #00FEFF'>GJ</span>", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        grassJump: new Decimal(0),
        grassJumpReq: new Decimal(1e20),
        grassJumpGain: new Decimal(0),

        milestone1Effect: new Decimal(1),
        milestone2Effect: new Decimal(1),
        milestone3Effect: new Decimal(1),
        milestone4Effect: new Decimal(1),
        milestone6Effect: new Decimal(1),

        grassJumpers: new Decimal(0),
        grassJumpersGain: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "radial-gradient(#051C33, #060F19)",
            "background-origin": "border-box",
            "border-color": "#00488F",
            "color": "#00FEFF",
        };
    },
    tooltip: "Grass Jump",
    branches: [["dgr", "#309"]],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        let grassJumpDiv = new Decimal(1)
        
        player.dgj.grassJumpReq = Decimal.pow(1e5, player.dgj.grassJump).mul(1e20).div(grassJumpDiv)
        player.dgj.grassJumpGain = player.dgr.grass.mul(grassJumpDiv).div(1e20).add(1).ln().div(Decimal.ln(1e5))

        player.dgj.milestone1Effect = Decimal.pow(1.5, player.dgj.grassJump)
        player.dgj.milestone2Effect = Decimal.pow(2, player.dgj.grassJump)
        player.dgj.milestone3Effect = Decimal.pow(1.05, player.dgj.grassJump)
        player.dgj.milestone4Effect = buyableEffect("dgr", 13).mul(levelableEffect("st", 206)[0]).mul(buyableEffect("st", 102))
        player.dgj.milestone6Effect = Decimal.pow(1.01, player.dgj.grassJump.sub(12).max(1))

        player.dgj.grassJumpersGain = player.dgj.grassJump.div(10).mul(Decimal.pow(1.2, player.dgj.grassJump))
        if (getLevelableTier("pu", 307, true)) player.dgj.grassJumpersGain = player.dgj.grassJumpersGain.mul(levelableEffect("pu", 307)[0])
    },
    bars: {},
    clickables: {
        11: {
            title() {
                if (player.pet.legPetTimers[0].current.lte(0)) return "Reset previous content for<br>grass jumps<br>[ONLY OBTAINABLE IN ECLIPSE]"
                return "Reset previous content for<br>grass jumps<br>Req: " + format(player.dgj.grassJumpReq) + " dark grass"
            },
            canClick() { return player.pet.legPetTimers[0].current.gt(0) && player.dgr.grass.gte(player.dgj.grassJumpReq) },
            unlocked() { return true },
            onClick() {
                false ? player.dgj.grassJump = player.dgj.grassJump.add(player.dgj.grassJumpGain) : player.dgj.grassJump = player.dgj.grassJump.add(1);
                player.dgr.grass = player.dgr.grass.sub(player.dgj.grassJumpReq)

                player.le.starmetalAlloyPause = new Decimal(10)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "280px", minHeight: "80px", borderRadius: "15px", color: "white", border: "3px solid #00488F"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#002143"
                return look
            }
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dgj.grassJumpers},
            pay(amt) { player.dgj.grassJumpers = this.currency().sub(amt) },
            effect(x) {
                let bonus = getBuyableAmount(this.layer, this.id).div(25).floor()
                return getBuyableAmount(this.layer, this.id).add(1).mul(Decimal.pow(2, bonus))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pointed Jumps"
            },
            display() {
                return "Boosts dark celestialite points by +100% per level\n\
                Dark celestialite point gain is doubled every 25 levels\n\
                Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grassjumpers"
            },
            buy(mult) {
                if (mult != true) {
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
            style: {width: '275px', height: '150px', color: "white", backgroundColor: "#002447", borderColor: "#00488F"},
        },
        12: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dgj.grassJumpers},
            pay(amt) { player.dgj.grassJumpers = this.currency().sub(amt) },
            effect(x) {
                let bonus = getBuyableAmount(this.layer, this.id).div(25).floor()
                return getBuyableAmount(this.layer, this.id).add(1).mul(Decimal.pow(2, bonus))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Prancing Prestige"
            },
            display() {
                return "Boosts prestige points by +100% per level\n\
                Prestige point gain is doubled every 25 levels\n\
                Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grassjumpers"
            },
            buy(mult) {
                if (mult != true) {
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
            style: {width: '275px', height: '150px', color: "white", backgroundColor: "#002447", borderColor: "#00488F"},
        },
        13: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dgj.grassJumpers},
            pay(amt) { player.dgj.grassJumpers = this.currency().sub(amt) },
            effect(x) {
                let bonus = getBuyableAmount(this.layer, this.id).div(25).floor()
                return getBuyableAmount(this.layer, this.id).div(2).add(1).mul(Decimal.pow(2, bonus))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Bouncy Boosters"
            },
            display() {
                return "Divides booster requirement by 50% per level\n\
                Booster requirement is halved every 25 levels\n\
                Currently: /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grassjumpers"
            },
            buy(mult) {
                if (mult != true) {
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
            style: {width: '275px', height: '150px', color: "white", backgroundColor: "#002447", borderColor: "#00488F"},
        },
        14: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.dgj.grassJumpers},
            pay(amt) { player.dgj.grassJumpers = this.currency().sub(amt) },
            effect(x) {
                let bonus = getBuyableAmount(this.layer, this.id).div(25).floor()
                return getBuyableAmount(this.layer, this.id).div(2).add(1).mul(Decimal.pow(2, bonus))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Gambolling Grass"
            },
            display() {
                return "Boosts dark grass gain/cap by +50% per level\n\
                Dark grass gain/cap is doubled every 25 levels\n\
                Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grassjumpers"
            },
            buy(mult) {
                if (mult != true) {
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
            style: {width: '275px', height: '150px', color: "white", backgroundColor: "#002447", borderColor: "#00488F"},
        },
        15: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.dgj.grassJumpers},
            pay(amt) { player.dgj.grassJumpers = this.currency().sub(amt) },
            effect(x) {
                let bonus = getBuyableAmount(this.layer, this.id).div(25).floor()
                return getBuyableAmount(this.layer, this.id).div(4).add(1).mul(Decimal.pow(2, bonus))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Vaulting Vapors"
            },
            display() {
                return "Boosts cloud gain by +25% per level\n\
                Cloud gain is doubled every 25 levels\n\
                Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grassjumpers"
            },
            buy(mult) {
                if (mult != true) {
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
            style: {width: '275px', height: '150px', color: "white", backgroundColor: "#002447", borderColor: "#00488F"},
        },
        16: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dgj.grassJumpers},
            pay(amt) { player.dgj.grassJumpers = this.currency().sub(amt) },
            effect(x) {
                let bonus = getBuyableAmount(this.layer, this.id).div(25).floor()
                return getBuyableAmount(this.layer, this.id).div(20).add(1).mul(Decimal.pow(1.5, bonus))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Twitching Time"
            },
            display() {
                return "Boosts eclipse shard gain by +5% per level\n\
                Eclipse shard gain is multiplied by x1.5 every 25 levels\n\
                Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grassjumpers"
            },
            buy(mult) {
                if (mult != true) {
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
            style: {width: '275px', height: '150px', color: "white", backgroundColor: "#002447", borderColor: "#00488F"},
        },
    },
    milestones: {
        11: {
            effectDescription() { return "Increase dark grass value and capacity by 50% per grass jump<br>Currently: x" + format(player.dgj.milestone1Effect) + "." },
            done() { return player.dgj.grassJump.gte(1) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        12: {
            effectDescription() { return "Increase dark celestial point gain by 100% per grass jump<br>Currently: x" + format(player.dgj.milestone2Effect) + "." },
            done() { return player.dgj.grassJump.gte(2) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        13: {
            effectDescription() { return "Decreases eclipse timer tickspeed by 5% per grass jump<br>Currently: x" + format(player.dgj.milestone3Effect) + "." },
            done() { return player.dgj.grassJump.gte(4) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        14: {
            effectDescription() { return "All forms of dark grass automation are effected by dark grass growth speed<br>Currently: x" + format(player.dgj.milestone4Effect) + "." },
            done() { return player.dgj.grassJump.gte(6) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        15: {
            effectDescription() { return "Unlock new Aleph upgrades in the hive." },
            done() { return player.dgj.grassJump.gte(8) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        16: {
            effectDescription() { return "Replace the formulas for the dark grass buyables and scale the dark grass buyables by 1% per grass jump<br>Currently: x" + format(player.dgj.milestone6Effect) + "." },
            done() { return player.dgj.grassJump.gte(12) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
    },
    challenges: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #00488F", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["clickable", 11],
                        ["style-row", [
                            ["raw-html", () => {return player.dgj.grassJump.neq(1) ? "You have " + formatWhole(player.dgj.grassJump) + " Grass Jumps" : "You have 1 Grass Jump"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "280px", height: "74px", background: "black", border: "3px solid #00488F", borderRadius: "15px", marginLeft: "8px"}],
                    ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRadius: "13px 13px 0px 0px", width: "588px", height: "100px"}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "1", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 11],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "2", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 12],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "4", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 13],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "6", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 14],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "8", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 15],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "12", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 16],
                    ]],
                    ["style-row", [
                        ["raw-html", "Grass Jumps are not reset when leaving the dark universe.", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "588px", height: "40px"}],
                ]
            },
            "Grassjumpers": {
                buttonStyle() { return { border: "2px solid #00488F", borderRadius: "10px" } },
                unlocked() { return getLevelableTier("pu", 307, true) },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.dgj.grassJumpers) + "</h3> grassjumpers"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.dgj.grassJumpersGain) + "/s)"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                    ["row", [["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16]]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.dgr.grass) + "</h3> dark grass"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("le", 202) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})