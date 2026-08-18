addLayer("prj", {
    name: "Projects",
    symbol: "PJ",
    universe: "UD",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
        milestonePopups: false,

        storedTimeCapsules: new Decimal(0),
        storedTimeCapsuleEffect: new Decimal(0),

        totalProjectLevels: new Decimal(0),
        projectSpeed: new Decimal(1),
        bestProjectSpeed: new Decimal(1),

        maxFocused: new Decimal(1),
        focused: new Decimal(0),

        completedProjects: new Decimal(1),
        lightFountainFocusExtension: new Decimal(1),
        lightWellFocusExtension: new Decimal(1),
        prismFountainFocusExtension: new Decimal(1),
        
        modules: {
            1: {
                time: new Decimal(0),
                timeReq: new Decimal(60),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                automated: false,
                timeCapsuleReq: new Decimal(1),
                statReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
            2: {
                time: new Decimal(0),
                timeReq: new Decimal(1800),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                automated: false,
                timeCapsuleReq: new Decimal(1),
                statReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
            3: {
                time: new Decimal(0),
                timeReq: new Decimal(1e5),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                automated: false,
                timeCapsuleReq: new Decimal(1),
                statReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
            4: {
                time: new Decimal(0),
                timeReq: new Decimal(1e9),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                automated: false,
                timeCapsuleReq: new Decimal(1),
                statReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
        },

        milestone105Effect: new Decimal(1),
        milestone107Effect: new Decimal(1),
        milestone112Effect: new Decimal(1),
        milestone207Effect: new Decimal(1),
        milestone210Effect: new Decimal(1),
        milestone304Effect: new Decimal(1),

        pylonEnergyMax: new Decimal(1e6),
        pylonEnergy: new Decimal(0),
        pylonEnergyEffect: new Decimal(1),
        pylonEnergyEffect2: new Decimal(1),
        pylonEnergyEffect3: new Decimal(1),
        pylonEnergyEffect4: new Decimal(1),
        pylonEnergyPerSecond: new Decimal(0),
        
        pylonPassiveEffect: new Decimal(1),

        pylonTier: new Decimal(1),
        pylonTierEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#663366",
            background: "#dfffdf",
            "background-origin": "border-box",
            "border-color": "#663366",
        };
    },
    tooltip: "Projects",
    color: "#dfffdf",
    update(delta) {

        player.prj.maxFocused = new Decimal(1)
        if (hasMilestone("prj", 102)) player.prj.maxFocused = player.prj.maxFocused.add(1);
        player.prj.maxFocused = player.prj.maxFocused.add(buyableEffect("prj", 11));

        player.prj.totalProjectLevels = player.prj.modules[1].completions
        .add(player.prj.modules[2].completions)
        .add(player.prj.modules[3].completions)
        .add(player.prj.modules[4].completions)

        player.prj.projectSpeed = new Decimal(1)
        player.prj.projectSpeed = player.prj.projectSpeed.mul(player.prj.storedTimeCapsuleEffect)
        if (hasUpgrade("wel", 22)) player.prj.projectSpeed = player.prj.projectSpeed.mul(2);
        if (hasUpgrade("wel", 33)) player.prj.projectSpeed = player.prj.projectSpeed.mul(2);
        player.prj.projectSpeed = player.prj.projectSpeed.mul(player.pri.fountains[9].completionEffect);
        player.prj.projectSpeed = player.prj.projectSpeed.mul(buyableEffect("sme", 191))

        player.prj.storedTimeCapsuleEffect = player.prj.storedTimeCapsules.add(1).log(10).add(1).pow(0.5).sub(1).pow_base(10).pow(2).sub(1).div(2).add(1)

        player.prj.completedProjects = new Decimal(0)

        // PROJECT PROGRESS
        Object.keys(layers.prj.projects).forEach(i => {
            let module = player.prj.modules[i]
            let project = layers.prj.projects[i]
            module.timeSpeed = project.getTimeSpeed()
            module.timeReq = project.getTimeReq()
            module.timeCapsuleReq = project.getTimeCapsuleReq()
            module.statReq = project.getStatReq()
            module.completionEffect = project.getCompletionEffect()

            if (module.focused) {
                module.time = module.time.add(module.timeSpeed.mul(delta))
                if (module.time.gte(module.timeReq)) {
                    module.focused = false
                    module.completions = module.completions.add(1)
                    module.time = new Decimal(0)
                    player.prj.focused = player.prj.focused.sub(1)
                }
            }

            player.prj.completedProjects = player.prj.completedProjects.add(module.completions)
        });

        // MILESTONE EFFECTS

        player.prj.milestone105Effect = player.prj.projectSpeed.pow(0.2).mul(player.prj.projectSpeed.max(1).log10().mul(0.75)).add(1)
        player.prj.milestone107Effect = player.wel.light.add(1).log(10).add(1).pow(0.75).sub(1).pow_base(10).pow(1.5)
        player.prj.milestone112Effect = player.prj.projectSpeed.sub(1).div(100).add(1)
        player.prj.milestone207Effect = player.pri.prisms.add(1).log(1e4).floor().pow_base(1.5)
        player.prj.milestone210Effect = player.bum.starshines.pow_base(1.1).min(100)
        player.prj.milestone304Effect = player.wel.modules[4].completions.div(1e9).add(1).log10().pow(0.5).pow_base(10).add(1).pow(0.333)

        player.prj.lightFountainFocusExtension = player.prj.projectSpeed.pow(0.75)
        player.prj.lightWellFocusExtension = player.prj.projectSpeed.div(4).pow(0.5)
        player.prj.prismFountainFocusExtension = player.prj.projectSpeed.div(100).pow(0.75)
        // MISC

        if (player.prj.projectSpeed.gte(player.prj.bestProjectSpeed)) player.prj.bestProjectSpeed = player.prj.projectSpeed;

        // TECHNOLOGICAL PYLON

        if (player.prj.pylonBuilt)
        {
            player.prj.pylonEnergyMax = Decimal.pow(1e6, player.prj.pylonTier)

            player.prj.pylonEnergyPerSecond = new Decimal(1)
            player.prj.pylonEnergyPerSecond = player.prj.pylonEnergyPerSecond.mul(buyableEffect("prj", 11))
            player.prj.pylonEnergyPerSecond = player.prj.pylonEnergyPerSecond.mul(buyableEffect("prj", 12))
            player.prj.pylonEnergyPerSecond = player.prj.pylonEnergyPerSecond.mul(buyableEffect("prj", 13))

            player.prj.pylonPassiveEffect = player.bum.starlight.add(1).log(10).div(10).pow(0.5).div(40).mul(player.prj.pylonTierEffect).add(1)
        } else
        {
            player.prj.pylonEnergyPerSecond = new Decimal(0)

            player.prj.pylonPassiveEffect = new Decimal(1)
        }

        if (player.prj.pylonEnergy.gte(player.prj.pylonEnergyMax))
        {
            player.prj.pylonEnergy = player.prj.pylonEnergyMax
            player.prj.pylonEnergyPerSecond = new Decimal(0)
        }
        player.prj.pylonEnergy = player.prj.pylonEnergy.add(player.prj.pylonEnergyPerSecond.mul(delta).div(player.uni["UD"].tickspeed))

        player.prj.pylonEnergyEffect = player.prj.pylonEnergy.add(1).pow(player.prj.pylonTierEffect).log(10).add(1).pow(3).div(100).add(1)
        player.prj.pylonEnergyEffect2 = player.prj.pylonEnergy.add(1).pow(player.prj.pylonTierEffect).log(10).add(1).pow(0.5).sub(1).pow_base(10).pow(2).div(40).add(1)
        player.prj.pylonEnergyEffect3 = player.prj.pylonEnergy.add(1).pow(player.prj.pylonTierEffect).log(10).add(1).pow(0.875).sub(1).pow_base(10).pow(0.25).sub(1).div(10).add(1)
        player.prj.pylonEnergyEffect4 = player.prj.pylonEnergy.add(1).log(10).add(1).pow(3).pow(player.prj.pylonTierEffect).div(100).add(1)

        player.prj.pylonTierEffect = player.prj.pylonTier.sub(1).div(10).add(1)

        //tickspeed
        player.uni["UD"].tickspeed = new Decimal(1)
        player.uni["UD"].tickspeed = player.uni["UD"].tickspeed.mul(player.prj.pylonEnergyEffect)
    },
    branches: ["wel"],
    clickables: {
        1: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused)
                && player.prj.storedTimeCapsules.gte(player.prj.modules[this.id].timeCapsuleReq)
                && layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName].gte(player.prj.modules[this.id].statReq)
                && !player.prj.modules[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.prj.storedTimeCapsules = player.prj.storedTimeCapsules.sub(player.prj.modules[this.id].timeCapsuleReq)
                layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName] = layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName].sub(player.prj.modules[this.id].statReq)
                player.prj.modules[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (player.prj.modules[this.id].focused) {
                    look.backgroundColor = "#663366"
                    look.border = "3px solid #994d86"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #6633667f"
                    look.color = "white"
                }
                return look
            },
        },
        2: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused)
                && player.prj.storedTimeCapsules.gte(player.prj.modules[this.id].timeCapsuleReq)
                && layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName].gte(player.prj.modules[this.id].statReq)
                && !player.prj.modules[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.prj.storedTimeCapsules = player.prj.storedTimeCapsules.sub(player.prj.modules[this.id].timeCapsuleReq)
                layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName] = layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName].sub(player.prj.modules[this.id].statReq)
                player.prj.modules[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (player.prj.modules[this.id].focused) {
                    look.backgroundColor = "#663366"
                    look.border = "3px solid #994d86"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #6633667f"
                    look.color = "white"
                }
                return look
            },
        },
        3: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused)
                && player.prj.storedTimeCapsules.gte(player.prj.modules[this.id].timeCapsuleReq)
                && layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName].gte(player.prj.modules[this.id].statReq)
                && !player.prj.modules[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.prj.storedTimeCapsules = player.prj.storedTimeCapsules.sub(player.prj.modules[this.id].timeCapsuleReq)
                layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName] = layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName].sub(player.prj.modules[this.id].statReq)
                player.prj.modules[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (player.prj.modules[this.id].focused) {
                    look.backgroundColor = "#663366"
                    look.border = "3px solid #994d86"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #6633667f"
                    look.color = "white"
                }
                return look
            },
        },
        4: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused)
                && player.prj.storedTimeCapsules.gte(player.prj.modules[this.id].timeCapsuleReq)
                && layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName].gte(player.prj.modules[this.id].statReq)
                && !player.prj.modules[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.prj.storedTimeCapsules = player.prj.storedTimeCapsules.sub(player.prj.modules[this.id].timeCapsuleReq)
                layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName] = layers.prj.projects[this.id].statReqLocation()[layers.prj.projects[this.id].statReqInternalName].sub(player.prj.modules[this.id].statReq)
                player.prj.modules[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (player.prj.modules[this.id].focused) {
                    look.backgroundColor = "#663366"
                    look.border = "3px solid #994d86"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #6633667f"
                    look.color = "white"
                }
                return look
            },
        },
        "projects_respecFocus": {
            title() { return "<h3>Respec Focus</h3><br><small>(you won't get your stored time capsules back!)</small>" },
            canClick() {
                for (let v in player.prj.modules) {
                    if (player.prj.modules[v].focused || player.prj.modules[v].automated) return true;
                }
                return false
            },
            unlocked() { return true },
            onClick() {
                Object.keys(layers.prj.projects).forEach(i => {
                    if (player.prj.projects[i].focused) {
                        player.prj.projects[i].focused = false
                        player.prj.focused = player.prj.focused.sub(1)
                    }
                    if (player.prj.projects[i].automated) {
                        player.prj.projects[i].automated = false
                        player.prj.focused = player.prj.focused.sub(1)
                    }
                });
            },
            style() {
                let look = {width: "400px", minHeight: "75px", maxHeight: "75px", borderRadius: "10px"}
                if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        201: {
            title() { return "<h2>Build the Technological Shard Pylon</h2><br><h3 style='color:#2f2f2f'>Cost: 1e9 Technological Core Fragments</h3>" },
            canClick() { return player.cof.coreFragments[2].gte(1e9) },
            unlocked() { return !player.prj.pylonBuilt},
            onClick() {
                player.cof.coreFragments[2] = player.cof.coreFragments[2].sub(1e9)

                player.prj.pylonBuilt = true
            },
            style: {width: "600px", minHeight: "100px", maxHeight: "100px", color: "black", backgroundImage: "linear-gradient(120deg, #595A5C 0%, #9c9c9c 100%)", border: "2px solid #2f2f2f", borderRadius: "15px"},
        },
        202: {
            title() { return "Tier up the Technological Pylon" },
            canClick() { return player.prj.pylonEnergy.gte(player.prj.pylonEnergyMax) },
            unlocked() { return player.prj.pylonEnergy.gte(player.prj.pylonEnergyMax) },
            onClick() {
                player.prj.pylonEnergy = new Decimal(0)

                player.prj.pylonTier = player.prj.pylonTier.add(1)
            },
            style: {width: "738px", minHeight: "50px", color: "black", backgroundImage: "linear-gradient(120deg, #595A5C 0%, #9c9c9c 100%)", border: "2px solid #2f2f2f", borderRadius: "10px"},
        },
    },
    bars: {},
    upgrades: {},
    buyables: {
        11: {
            purchaseLimit() { return new Decimal(999) },
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(3) },
            currency() { return player.prj.storedTimeCapsules },
            pay(amt) { player.prj.storedTimeCapsules = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id)},
            unlocked() { return hasMilestone("prj", 102) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Clone"
            },
            display() {
                return 'Increases your focus cap by +' + formatSimple(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Stored Time Capsules'
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
            style: { width: '250px', height: '150px', color: "white", border: "3px solid #994d86", outline: "3px solid #663366", borderColor: "#994d86", background: "radial-gradient(circle, #12332b 0%, #00663c 100%)", margin: "6px" },
            progressColor: "#663366",
            buttonStyle() {
                return tmp.prj.buyables[11].canAfford ? {
                    background: "#dfffdf",
                    color: "black",
                } : {
                    background: "#361e1e",
                    color: "white",
                    border: "3px solid #994d867f",
                }
            },
        },
        101: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[2] },
            pay(amt) { player.cof.coreFragments[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).add(1)},
            unlocked() { return player.prj.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Technological Pylon Factor I"
            },
            display() {
                return 'which are boosting technological pylon energy by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '240px', height: '180px', color: "white", border: "2px solid #000000bf", backgroundImage: "linear-gradient(120deg, #595A5C 0%, #9c9c9c 100%)" },
            progressColor: "#9c9c9c",
        },
        102: {
            costBase() { return new Decimal(8e8) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[2] },
            pay(amt) { player.cof.coreFragments[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).add(1)},
            unlocked() { return player.prj.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Technological Pylon Factor II"
            },
            display() {
                return 'which are boosting technological pylon energy by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '240px', height: '180px', color: "white", border: "2px solid #000000bf", backgroundImage: "linear-gradient(120deg, #595A5C 0%, #9c9c9c 100%)" },
            progressColor: "#9c9c9c",
        },
        103: {
            costBase() { return new Decimal(6.4e9) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[2] },
            pay(amt) { player.cof.coreFragments[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).add(1)},
            unlocked() { return player.prj.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Technological Pylon Factor III"
            },
            display() {
                return 'which are boosting technological pylon energy by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '240px', height: '180px', color: "white", border: "2px solid #000000bf", backgroundImage: "linear-gradient(120deg, #595A5C 0%, #9c9c9c 100%)" },
            progressColor: "#9c9c9c",
        },
    },
    milestones: {
        // TIME CAPSULES
        101: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock a cloud upgrade in D1 eclipse.</small>" },
            cycleReq() { return new Decimal(1) },
            projectId() { return 1 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        102: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>x2 light well ↻ gain and unlock 1 punchcard per project ↻ up to 5.</small>" },
            cycleReq() { return new Decimal(2) },
            projectId() { return 1 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        103: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>x2 light gain and get a fourth punchcard choice.</small>" },
            cycleReq() { return new Decimal(3) },
            projectId() { return 1 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        104: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock time-based bonuses to D1 exit rewards.</small>" },
            cycleReq() { return new Decimal(4) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        105: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Project speed boosts light well speed. (x" + format(player.prj.milestone105Effect) + ")</small>" },
            cycleReq() { return new Decimal(5) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        106: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock more time energy buyables.</small>" },
            cycleReq() { return new Decimal(6) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 201) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        107: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Light reduces the D1 universe reset requirement. (/" + formatSimple(player.prj.milestone107Effect) + ")</small>" },
            cycleReq() { return new Decimal(7) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 201) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        108: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock Interspace-related SME buyables.</small>" },
            cycleReq() { return new Decimal(8) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 201) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        109: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>/1.5 to the eclipse timer tickspeed.</small>" },
            cycleReq() { return new Decimal(9) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 201) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        110: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Keep boosters on time capsule resets.</small>" },
            cycleReq() { return new Decimal(10) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 201) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        111: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(11) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 301) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        112: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            //effectDescription() { return "<small>Project speed boosts light gain. (x" + format(player.prj.milestone112Effect) + ")</small>" },
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(13) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 301) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        113: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            //effectDescription() { return "<small>Automate cloud upgrades.</small>" },
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(15) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 301) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        114: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Automate cloud buyables.</small>" },
            cycleReq() { return new Decimal(16) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 401) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        115: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(20) },
            projectId() { return 1 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 401) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        // PRISMATIC
        201: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock prismatic. Unlock focusing on one light fountain each prismatic.</small>" },
            cycleReq() { return new Decimal(1) },
            projectId() { return 2 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        202: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Enable gaining more than one prism on reset.</small>" },
            cycleReq() { return new Decimal(2) },
            projectId() { return 2 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        203: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Improve the spiral and arrow prismatic fountains. x2 Prism gain.</small>" },
            cycleReq() { return new Decimal(3) },
            projectId() { return 2 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        204: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Retain focus on prismatic.</small>" },
            cycleReq() { return new Decimal(4) },
            projectId() { return 2 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        205: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Increase focus cap by +1 and x2 stored time capsules.</small>" },
            cycleReq() { return new Decimal(5) },
            projectId() { return 2 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        206: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock the greenhouse. (in prismatic layer) (COMING SOON.)</small>" },
            cycleReq() { return new Decimal(6) },
            projectId() { return 2 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 301) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        207: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(7) },
            projectId() { return 2 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 301) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        208: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(8) },
            projectId() { return 2 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 301) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        209: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(9) },
            projectId() { return 2 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 301) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        210: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>I said COMING SOON.</small>" },
            //effectDescription() { return "<small>x1.1 light gain per starshine done. (x" + format(player.prj.milestone210Effect) + ", caps at x100)</small>" },
            cycleReq() { return new Decimal(10) },
            projectId() { return 2 },
            unlocked() { return true || hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 301) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        211: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(11) },
            projectId() { return 2 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 401) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        212: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(13) },
            projectId() { return 2 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 401) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        213: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(15) },
            projectId() { return 2 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) && hasMilestone("prj", 401) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        // BLUESHIFT
        301: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock blueshifts. Unlock focusing on one prism fountain each blueshift.</small>" },
            cycleReq() { return new Decimal(1) },
            projectId() { return 3 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        302: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock the fourth row of the pyramid. Increase focus cap by +1.</small>" },
            cycleReq() { return new Decimal(2) },
            projectId() { return 3 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        303: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock light well δ and ???. (COMING SOON.)</small>" },
            cycleReq() { return new Decimal(3) },
            projectId() { return 3 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        304: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            //effectDescription() { return "<small>δ ↻ boosts light well speed. (x" + format(player.prj.milestone304Effect) + ")</small>" },
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(4) },
            projectId() { return 3 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        305: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            //effectDescription() { return "<small>x2 stored time capsules.</small>" },
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(5) },
            projectId() { return 3 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        306: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            //effectDescription() { return "<small>Unlock auto-blueshift.</small>" },
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(6) },
            projectId() { return 3 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        307: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(7) },
            projectId() { return 3 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        308: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(8) },
            projectId() { return 3 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        309: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>COMING SOON.</small>" },
            cycleReq() { return new Decimal(9) },
            projectId() { return 3 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        310: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock blueshifts for prism wells.</small>" },
            cycleReq() { return new Decimal(10) },
            projectId() { return 3 },
            unlocked() { return hasMilestone(this.layer, this.id - 3) },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        // STARSHINE
        401: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock starshine and Bumpy's journal.</small>" },
            cycleReq() { return new Decimal(1) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        402: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>x2 starlight per project ↻ after 1. Keep fountain unlocks on blueshift.</small>" },
            cycleReq() { return new Decimal(2) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        403: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>x10 light and always generate 10%. Unlock the fifth row of the pyramid.</small>" },
            cycleReq() { return new Decimal(3) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        404: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>x10 light well ↻ and always generate 1%. Extend the AU2 star trees.</small>" },
            cycleReq() { return new Decimal(4) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        405: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Keep stored SPVs on starshine. Unlock project studies.</small>" },
            cycleReq() { return new Decimal(5) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        406: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock Prism Well ε.</small>" },
            cycleReq() { return new Decimal(6) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        407: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock the sixth row of the pyramid.</small>" },
            cycleReq() { return new Decimal(7) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        408: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Halve anti-singularity fragment cost and double goobert point gain.</small>" },
            cycleReq() { return new Decimal(8) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        409: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>Unlock the final pyramid fountain. Improve project ↻ effects.</small>" },
            cycleReq() { return new Decimal(9) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
        410: {
            requirementDescription() {return formatWhole(this.cycleReq()) + " " + layers.prj.projects[this.projectId()].title + " Project ↻"},
            effectDescription() { return "<small>x10 light gain. The grind is on.</small>" },
            cycleReq() { return new Decimal(10) },
            projectId() { return 4 },
            unlocked() { return true },
            done() { return player.prj.modules[this.projectId()].completions.gte(this.cycleReq()) },
            style() {
                let look = {border: "0px", borderRadius: "0px", width: "285px", height: "46px", margin: "0px"}
                if (hasMilestone("prj", this.id)) {
                    look.backgroundColor = "#efffef"
                    look.color = "#232e23"
                } else {
                    look.backgroundColor = "#232e23"
                    look.color = "#efffef"
                }
                return look
            },
        },
    },
    challenges: {},
    infoboxes: {},
    projects: {
        1: {
            title: "Time Capsules",
            completionEffectStat: "Starmetal Alloy",
            statReqName: "Light",
            statReqLocation() {return player.wel},
            statReqInternalName: "light",
            getCompletionEffect() {
                let completions = player.prj.modules[1].completions

                s = completions.pow(0.85).pow_base(1.15)

                s = s.pow(buyableEffect("sme", 194))

                return s
            },
            getTimeReq() {
                let completions = player.prj.modules[1].completions
                let s = new Decimal(60)

                s = s.mul(completions.add(1).pow(2))
                s = s.mul(completions.div(5).floor().pow_base(4))

                return s
            },
            getTimeCapsuleReq() {
                let completions = player.prj.modules[1].completions
                let s = completions
                
                s = s.add(completions.sub(5).max(0).pow(1.5)).mul(completions.div(5).floor().pow_base(8))

                return s.floor()
            },
            getStatReq() {
                let completions = player.prj.modules[1].completions
                if (completions.eq(0)) return new Decimal(0);
                let s = new Decimal(1e8)

                s = s.mul(completions.sub(1).pow_base(completions.add(1).div(5).ceil().pow(1.25).pow_base(20)))

                return s
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)

                return s
            },
            milestones: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115],
        },
        2: {
            title: "Prismatic",
            completionEffectStat: "Core Fragment Scores",
            statReqName: "Prisms",
            statReqLocation() {return player.pri},
            statReqInternalName: "prisms",
            getCompletionEffect() {
                let completions = player.prj.modules[2].completions

                s = completions.pow(0.85).pow_base(1.25)

                s = s.pow(buyableEffect("sme", 194))

                return s
            },
            getTimeReq() {
                let completions = player.prj.modules[2].completions
                let s = new Decimal(1800)

                s = s.mul(completions.add(1).mul(completions).div(2).add(1))
                s = s.mul(completions.div(5).floor().pow_base(6))

                return s
            },
            getTimeCapsuleReq() {
                let completions = player.prj.modules[2].completions
                let s = completions.add(1).pow(2).mul(5)
                
                s = s.add(completions.sub(5).max(0).pow(1.5)).mul(completions.div(5).floor().pow_base(12))

                return s.floor()
            },
            getStatReq() {
                let completions = player.prj.modules[2].completions
                if (completions.eq(0)) return new Decimal(0);
                let s = new Decimal(6)

                s = s.mul(completions.sub(1).pow_base(completions.add(1).div(5).ceil().pow_base(10)))

                return s
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)

                return s
            },
            milestones: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213],
        },
        3: {
            title: "Blueshift",
            completionEffectStat: "Starmetal Essence",
            statReqName: "Blueshifts",
            statReqLocation() {return player.blu},
            statReqInternalName: "totalBlueshifts",
            getCompletionEffect() {
                let completions = player.prj.modules[3].completions

                s = completions.pow(0.85).pow_base(1.2)

                s = s.pow(buyableEffect("sme", 194))

                return s
            },
            getTimeReq() {
                let completions = player.prj.modules[3].completions
                let s = new Decimal(2e4)

                s = s.mul(completions.add(1).mul(completions.pow(2)).div(2).add(1))
                s = s.mul(completions.div(5).floor().pow_base(8))

                return s
            },
            getTimeCapsuleReq() {
                let completions = player.prj.modules[3].completions
                let s = completions.add(1).pow(2).mul(200)
                
                s = s.add(completions.sub(5).max(0).pow(2)).mul(completions.div(5).floor().pow_base(16))

                return s.floor()
            },
            getStatReq() {
                let completions = player.prj.modules[3].completions
                if (completions.eq(0)) return new Decimal(0);
                let s = new Decimal(2)

                s = s.mul(completions).mul(completions.div(5).floor().add(1))

                return s
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)

                return s
            },
            milestones: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310],
        },
        4: {
            title: "Starshine",
            completionEffectStat: "Stars, post-softcap",
            statReqName: "Starlight",
            statReqLocation() {return player.bum},
            statReqInternalName: "starlight",
            getCompletionEffect() {
                let completions = player.prj.modules[4].completions

                s = completions.pow(0.85).pow_base(7)

                s = s.pow(buyableEffect("sme", 194))

                return s
            },
            getTimeReq() {
                let completions = player.prj.modules[4].completions
                let s = new Decimal(4e6)

                s = s.mul(completions.add(1).mul(completions.pow(3)).div(2).add(1))
                s = s.mul(completions.div(5).floor().pow_base(10))

                return s
            },
            getTimeCapsuleReq() {
                let completions = player.prj.modules[4].completions
                let s = completions.add(1).pow(4).mul(1e4)
                
                s = s.add(completions.sub(5).max(0).pow(4)).mul(completions.div(5).floor().pow_base(20))

                return s.floor()
            },
            getStatReq() {
                let completions = player.prj.modules[4].completions
                if (completions.eq(0)) return new Decimal(0);
                let s = new Decimal(10)

                s = s.mul(completions.sub(1).pow_base(completions.add(1).div(5).ceil().pow(1.25).pow_base(10)))

                return s
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)

                return s
            },
            milestones: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410],
        },
        // 5, Eclipse Shards,
        // 6, Pylon Energy generation (NOT multiplier),
        // 7, Singularities,
        // 8, I see you, no spoilers for what this boosts lmao,
    },
    microtabs: {
        stuff: {
            "Projects": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    // #663366
                    // #994d86
                    // #ffa8d3
                    // #dfffdf
                    let look = [
                        ["blank", "25px"],
                        ["raw-html", "You have <h3>" + formatWhole(player.prj.storedTimeCapsules) + "</h3> stored time capsules. (From Dark Universe Eclipse)", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "Boosts project speed by x" + formatSimple(player.prj.storedTimeCapsuleEffect, 2), {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["raw-html", "You are gaining <h3>" + formatSimple(player.prj.projectSpeed, 2) + "</h3> project progress /s.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "You are using " + formatWhole(player.prj.focused) + "/" + formatWhole(player.prj.maxFocused) + " focus.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "9px"],
                        ["style-row", [
                            ["rounded-ex-buyable", 11],
                        ]],
                        ["blank", "9px"],
                        ["raw-html", "You have a total of <h3>" + formatWhole(player.prj.completedProjects) + "</h3> project ↻.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "15px"],
                        ["style-row", [
                            makeProject(1),
                            ["blank", "6px", {width: "6px"}],
                            hasUpgrade("wel", 24) ? makeProject(2) : null,
                        ]],
                        ["blank", "6px", {width: "6px"}],
                        ["style-row", [
                            hasUpgrade("wel", 34) ? makeProject(3) : null,
                            ["blank", "6px", {width: "6px"}],
                            hasUpgrade("wel", 44) ? makeProject(4) : null,
                        ]],
                        ["blank", "12px"],
                        ["clickable", "projects_respecFocus"],
                        ["blank", "25px"],
                    ]
                    return look
                },
            },
            "Pylon": {
                buttonStyle() { return { color: "white", borderRadius: "8px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["left-row", [
                        ["tooltip-row", [
                            ["raw-html", "<img src='resources/fragments/technologicalFragment.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                            ["raw-html", () => { return formatWhole(player.cof.coreFragments[2])}, {width: "103px", height: "50px", color: "white", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                            ["raw-html", "<div class='bottomTooltip'>Technological Core Fragments</div>"],
                        ], {width: "158px", height: "50px",}],
                    ], {width: "158px", height: "50px", background: "black", border: "2px solid #9c9c9c", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                    ["clickable", 201],
                    ["raw-html", () => { return player.prj.pylonBuilt ? "You have <h3>" + format(player.prj.pylonEnergy) + "/" + format(player.prj.pylonEnergyMax) +  "</h3> technological pylon energy (+" + format(player.prj.pylonEnergyPerSecond) + "/s)." : "" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["raw-html", () => {return player.prj.pylonBuilt ? "Boosts UD tickspeed by x" + format(player.prj.pylonEnergyEffect) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.prj.pylonBuilt ? "Boosts light and prism well speeds by x" + format(player.prj.pylonEnergyEffect2) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.prj.pylonBuilt ? "Boosts [COMING SOON] gain by x" + format(player.prj.pylonEnergyEffect3) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.prj.pylonBuilt ? "Boosts radioactive pylon energy gain by x" + format(player.prj.pylonEnergyEffect4) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.prj.pylonBuilt ? "Passive effect: Boosts dark celestial point gain by ^" + format(player.prj.pylonPassiveEffect, 4) + " (Based on starlight)" : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.prj.pylonBuilt ? "Your technological pylon is tier " + formatWhole(player.prj.pylonTier) + ", which boosts effective pylon energy and the passive effect by ^" + formatSimple(player.prj.pylonTierEffect) + "." : ""}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["rounded-ex-buyable", 101], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 102], ["blank", "3px", {width: "3px"}], ["rounded-ex-buyable", 103],]], 
                    ["blank", "10px"],
                    ["clickable", 202],
                ],
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + formatWhole(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("wel", 21)},
    hotkeys: [
        {
            key: "f", 
            description: "Respec focus in current tab",
            onPress() {
                switch (player.tab) {
                    case "wel": {
                        switch (player.subtabs.wel.stuff) {
                            case "Fountains":
                                clickClickable("wel", "lightFountains_respecFocus")
                                break
                            default: break
                        }
                    }
                    case "prj": {
                        switch (player.subtabs.prj.stuff) {
                            case "Projects":
                                clickClickable("prj", "projects_respecFocus")
                                break
                            default: break
                        }
                    }
                    case "pri": {
                        switch (player.subtabs.pri.stuff) {
                            case "Pyramid":
                                clickClickable("pri", "prismFountains_respecFocus")
                                break
                            default: break
                        }
                    }
                    default: break
                }
            },
        },
    ]
})

const makeProject = function (id) {
    let thisProject =
        ["style-column", [
            ["style-row", [
                ["style-column", [
                    ["blank", "10px"],
                    ["raw-html", layers.prj.projects[id].title, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", player.prj.modules[id].focused ? formatTime(player.prj.modules[id].timeReq.sub(player.prj.modules[id].time).div(player.prj.modules[id].timeSpeed)) : formatTime(player.prj.modules[id].timeReq.div(player.prj.modules[id].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "<small>(" + format(player.prj.modules[id].time, 1) + "/" + format(player.prj.modules[id].timeReq, 1) + ")</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", player.prj.modules[id].timeCapsuleReq.eq(0) ? "Your first cycle is free!" : "-" + formatWhole(player.prj.modules[id].timeCapsuleReq) + " Time Capsules", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", player.prj.modules[id].statReq.eq(0) ? "" : "-" + formatWhole(player.prj.modules[id].statReq) + " " + layers.prj.projects[id].statReqName, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {background: "#994d86", borderRadius: "10px 10px 0px 0px", width: "238px", height: "41px"}],
                    ["blank", "3px"],
                    ["clickable", id],
                ], {background: "#663366", border: "3px solid #663366", borderRadius: "16px 0px 0px 0px", width: "238px", height: "166px"}],
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", player.prj.modules[id].time.gte(player.prj.modules[id].timeReq) ? "0%" : formatSimple(player.prj.modules[id].time.div(player.prj.modules[id].timeReq).min(1).max(0).mul(100), 0) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {background: "#994d86", border: "3px solid #663366", borderRadius: "100px", width: "75px", height:"75px"}]
                        ], {borderRadius: "50%", width: "125px", height:"125px", border: "3px solid #663366", margin: "-3px", marginTop: "75px",
                            background: player.prj.modules[id].time.lt(player.prj.modules[id].timeReq) ?
                            "conic-gradient(#dfffdf " + (player.prj.modules[id].time.div(player.prj.modules[id].timeReq)).min(1).max(0) * 360 + "deg, #1a001a 0deg)" : "#1a001a"
                        }],
                    ], {background: "#663366", borderRadius: "0px 81px 0px 0px", width: "153px", height: "78px"}],
                    ["style-column", [], {background: "#994d86", height: "94px"}],
                ], {border: "3px solid #663366", borderBottom: "0px", borderLeft: "0px", borderRadius: "0px 81px 0px 0px", padding: "-3px", width: "153px", height: "169px"}],
            ], {verticalAlign: "bottom"}],
            ["style-column", [
                    ["style-column", [
                    ["raw-html", formatWhole(player.prj.modules[id].completions) + " ↻<br><small>(x" + formatSimple(layers.prj.projects[id].getCompletionEffect(), 2) + " " + layers.prj.projects[id].completionEffectStat + ")</small>", {color: "white", fontSize: "16px", fontFamily: "monospace", lineHeight: "18px", display: "block", lineHeight: "1"}],
                ], {background: "#663366", border: "3px solid #994d86", borderRadius: "0px", width: "388px", height: "44px"}],
            ], {background: "#994d86", border: "3px solid #663366", borderRadius: "0px", borderTop: "0px", height: "50px"}],
            ["style-column", [
                ["always-scroll-column", [
                    ["style-row", [], {backgroundColor: "#485e48", width: "379px", height: "3px"}]
                    // MILESTONES
                ], {width: "394px", height: "150px"}],
            ], {background: "#485e48", border: "3px solid #663366", borderTop: "0px", height: "150px"}],
        ], {width: "400px"}]
    for (let i = 0; i < layers.prj.projects[id].milestones.length; i++) {
        let milestoneId = layers.prj.projects[id].milestones[i]
        let milestone = layers.prj.milestones[milestoneId]
        let thisMilestone = 
            ["style-row", [
                ["style-column", [
                    ["raw-html", formatWhole(milestone.cycleReq()) + " ↻", {color: hasMilestone("prj", milestoneId) ? "#232e23" : "#efffef", fontSize: "16px", fontFamily: "monospace"}],
                ], {backgroundColor: hasMilestone("prj", milestoneId) ? "#efffef" : "#232e23", width: "75px", height: "46px"}],
                ["style-column", [], {backgroundColor: "#485e48", width: "3px", height: "46px"}],
                ["titleless-milestone", milestoneId],
            ], {background: "#232e23", border: "3px solid #485e48", borderTop: "0px", width: "373px", height: "46px", marginRight: "9px", display: milestone.unlocked() ? "" : "none !important"}]
            thisProject[1][2][1][0][1].push(thisMilestone)
    }
    return thisProject
}