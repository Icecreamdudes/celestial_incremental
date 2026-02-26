addLayer("wel", {
    name: "Wells of Light",
    symbol: "WE",
    row: 0,
    position: 0,
    startData() { return {
        unlocked: true,

        light: new Decimal(0),
        bestLight: new Decimal(0),
        lightMult: new Decimal(1),
        lightModuleEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        lightWellCycleEffectSoftcap: new Decimal(0.5),
        
        modules: {
            1: {
                time: new Decimal(0),
                maxTime: new Decimal(10),
                timeSpeed: new Decimal(1),
                completionsGain: new Decimal(1),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                completionsEffect: new Decimal(1),
            },
            2: {
                time: new Decimal(0),
                maxTime: new Decimal(60),
                timeSpeed: new Decimal(1),
                completionsGain: new Decimal(1),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                completionsEffect: new Decimal(1),
            },
            3: {
                time: new Decimal(0),
                maxTime: new Decimal(300),
                timeSpeed: new Decimal(1),
                completionsGain: new Decimal(1),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                
                completionsEffect: new Decimal(1),
            },
            4: {
                time: new Decimal(0),
                maxTime: new Decimal(3600),
                timeSpeed: new Decimal(1),
                completionsGain: new Decimal(1),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                
                completionsEffect: new Decimal(1),
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#00664d",
            background: "#a8ffd3",
            "background-origin": "border-box",
            "border-color": "#00664d",
        };
    },
    tooltip: "Wells of Light",
    color: "#ffdfdf",
    update(delta) {

        // LIGHT

        player.wel.lightWellCycleEffectSoftcap = new Decimal(0.5)

        player.wel.lightMult = new Decimal(1)
        player.wel.lightMult = player.wel.lightMult.mul(buyableEffect("wel", 11))
        player.wel.lightMult = player.wel.lightMult.mul(buyableEffect("wel", 12))
        if (hasUpgrade("wel", 13)) {

            if (player.wel.modules[1].completions.gte(1e3)) player.wel.modules[1].completionsEffect = player.wel.modules[1].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).mul(0.02).add(1);
            else player.wel.modules[1].completionsEffect = player.wel.modules[1].completions.mul(0.02).add(1);
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[1].completionsEffect)

            if (player.wel.modules[2].completions.gte(1e3)) player.wel.modules[2].completionsEffect = player.wel.modules[2].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).mul(0.1).add(1);
            else player.wel.modules[2].completionsEffect = player.wel.modules[2].completions.mul(0.1).add(1);
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[2].completionsEffect)

            if (player.wel.modules[3].completions.gte(1e3)) player.wel.modules[3].completionsEffect = player.wel.modules[3].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).mul(0.01).add(1);
            else player.wel.modules[3].completionsEffect = player.wel.modules[3].completions.mul(0.01).add(1);
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[3].completionsEffect)

            if (player.wel.modules[4].completions.gte(1e3)) player.wel.modules[4].completionsEffect = player.wel.modules[4].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).div(1e9).add(1);
            else player.wel.modules[4].completionsEffect = player.wel.modules[4].completions.div(1e9).add(1);
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[4].completionsEffect)
        }
        if (hasUpgrade("wel", 14)) player.wel.lightMult = player.wel.lightMult.mul(2)
        player.wel.lightMult = player.wel.lightMult.mul(levelableEffect("pu", 113)[1])
        if (hasMilestone("prj", 201)) player.wel.lightMult = player.wel.lightMult.mul(2)
        player.wel.lightMult = player.wel.lightMult.mul(buyableEffect("pri", 12))
        
        // WELLS

        player.wel.modules[1].maxTime = new Decimal(10)
        player.wel.modules[2].maxTime = new Decimal(60)
        player.wel.modules[3].maxTime = new Decimal(300)
        player.wel.modules[4].maxTime = new Decimal(3600)

        for (let i = 1; i < Object.keys(player.wel.modules).length + 1; i++) {
            player.wel.modules[i].time = player.wel.modules[i].time.add(player.wel.modules[i].timeSpeed.mul(delta))

            // CYCLE SPEED
            player.wel.modules[i].timeSpeed = new Decimal(1)
            player.wel.modules[i].timeSpeed = player.wel.modules[i].timeSpeed.mul(buyableEffect("wel", 14))
            player.wel.modules[i].timeSpeed = player.wel.modules[i].timeSpeed.mul(levelableEffect("pu", 213)[1])
            if (hasMilestone("prj", 105)) player.wel.modules[i].timeSpeed = player.wel.modules[i].timeSpeed.mul(player.prj.milestone105Effect)

            // CYCLE GAIN
            player.wel.modules[i].completionsGain = new Decimal(1)
            player.wel.modules[i].completionsGain = player.wel.modules[i].completionsGain.mul(buyableEffect("wel", 13))
            player.wel.modules[i].completionsGain = player.wel.modules[i].completionsGain.mul(levelableEffect("pu", 214)[1])
            player.wel.modules[i].completionsGain = player.wel.modules[i].completionsGain.mul(buyableEffect("pri", 11))
        }

        if (player.wel.bestLight.lt(player.wel.light)) player.wel.bestLight = player.wel.light;
    },
    branches: [],
    bars: {},
    upgrades: {
        11: {
            unlocked() { return true },
            fullDisplay() {
                let s = "<h2>"
                s += "Unlock light well α.</h2><br><br><h3>Cost: Free!</h3>"
                return s
            },
            cost: new Decimal(0),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "8px 0px 0px 0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#ffdfdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        12: {
            unlocked() { return hasUpgrade("wel", 11) },
            condition() { return player.wel.bestLight.gte(5) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock light buyables.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 5 Light</h3>"
                }
                return s
            },
            cost: new Decimal(5),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#ffdfdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        13: {
            unlocked() { return hasUpgrade("wel", 11) },
            condition() { return getBuyableAmount("wel", 11).gte(8) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Well cycles boost well yield.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 8 Light Boost levels</h3>"
                }
                return s
            },
            cost: new Decimal(100),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#ffdfdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        14: {
            unlocked() { return hasUpgrade("wel", 11) },
            condition() { return getBuyableAmount("wel", 12).gte(4) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Double light gain.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 4 Light Boost II levels</h3>"
                }
                return s
            },
            cost: new Decimal(1.5e4),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px 8px 0px 0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#ffdfdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        21: {
            unlocked() { return hasUpgrade("wel", 14) },
            condition() { return player.wel.lightMult.gte(1e6) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock projects.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: 1,000,000 light well α yield.</h3>"
                }
                return s
            },
            cost: new Decimal(2.5e7),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#ffdfdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        22: {
            unlocked() { return hasUpgrade("wel", 21) },
            condition() { return player.wel.modules[2].completions.gte(500) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock more light buyables.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: Light Well γ unlocked</h3>"
                }
                return s
            },
            cost: new Decimal(1e9),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#ffdfdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        23: {
            unlocked() { return hasUpgrade("wel", 21) },
            condition() { return hasMilestone("prj", 105) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock the second project.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: Time Capsule Project level 5</h3>"
                }
                return s
            },
            cost: new Decimal(1e13),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#ffdfdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        24: {
            unlocked() { return hasUpgrade("wel", 21) },
            condition() { return player.wel.modules[1].maxTime.div(player.wel.modules[1].timeSpeed).lte(0.2) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock the third project.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: 0.2s Light Well cycle timer</h3>"
                }
                return s
            },
            cost: new Decimal(1e6),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#4d9973"
                    look.border = "3px solid #336659"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#ffdfdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
    },
    buyables: {
        11: {
            condition() { return true },
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1e3) },
            currency() { return player.wel.light},
            pay(amt) { player.wel.light = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(getBuyableAmount(this.layer, this.id).mul(0.01).add(1))},
            unlocked() { return hasUpgrade("wel", 12) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Light Boost"
            },
            display() {
                return 'which are boosting light by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Light'
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
            style: { width: '194px', height: '174px', borderRadius: "5px 0px 0px 5px", border: "3px solid #336659", background: "#4d9973", color: "#000000df", margin: "1.5px"}
        },
        12: {
            condition() { return player.wel.bestLight.gte(1.5e3) },
            costBase() { return new Decimal(1.5e3) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(1e3) },
            currency() { return player.wel.light},
            pay(amt) { player.wel.light = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(getBuyableAmount(this.layer, this.id).mul(0.0075).add(1))},
            unlocked() { return layers.wel.buyables[11].condition() || getBuyableAmount("wel", 11).gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Light Boost II"
            },
            display() {
                return 'which are boosting light by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Light'
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
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #336659", background: "#4d9973", color: "#000000df", margin: "1.5px"}
        },
        13: {
            condition() { return player.wel.bestLight.gte(5e4) },
            costBase() { return new Decimal(5e4) },
            costGrowth() { return new Decimal(6) },
            purchaseLimit() { return new Decimal(99) },
            currency() { return player.wel.light},
            pay(amt) { player.wel.light = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Light Cycle Boost"
            },
            display() {
                return 'which are boosting light well cycles by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Light'
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
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #336659", background: "#4d9973", color: "#000000df", margin: "1.5px"}
        },
        14: {
            condition() { return player.wel.bestLight.gte(1.5e6) },
            costBase() { return new Decimal(1.5e6) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(36) },
            currency() { return player.wel.light},
            pay(amt) { player.wel.light = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Light Speed Boost"
            },
            display() {
                return 'which are boosting light well speed by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Light'
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
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #336659", background: "#4d9973", color: "#000000df", margin: "1.5px"}
        },
        101: {
            condition() { return player.wel.bestLight.gte(1e8) },
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.wel.light},
            pay(amt) { player.wel.light = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(100, getBuyableAmount(this.layer, this.id).pow(0.75))},
            unlocked() { return hasUpgrade("wel", 22) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dark Celestial Point Boost"
            },
            display() {
                return 'which are boosting dark celestial points by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Light'
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
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #336659", background: "#4d9973", color: "#000000df", margin: "1.5px"}
        },
        102: {
            condition() { return player.wel.bestLight.gte(1e11) },
            costBase() { return new Decimal(1e11) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.wel.light},
            pay(amt) { player.wel.light = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).add(1)},
            unlocked() { return hasUpgrade("wel", 22) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Starmetal XP Value Boost"
            },
            display() {
                return 'which are boosting starmetal XP value by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Light'
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
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #336659", background: "#4d9973", color: "#000000df", margin: "1.5px"}
        },
        103: {
            condition() { return player.wel.bestLight.gte(1e15) },
            costBase() { return new Decimal(1e15) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.wel.light},
            pay(amt) { player.wel.light = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.75).pow_base(1.5)},
            unlocked() { return hasUpgrade("wel", 22) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Space and Time Boost"
            },
            display() {
                return 'which are boosting space energy and time capsules by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Light'
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
            style: { width: '194px', height: '174px', borderRadius: "0px", border: "3px solid #336659", background: "#4d9973", color: "#000000df", margin: "1.5px"}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    clickables: {
        1: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[this.id].time.gte(player.wel.modules[this.id].maxTime)},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.wel.lightMult
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 10px 10px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        2: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[this.id].time.gte(player.wel.modules[this.id].maxTime)},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(5)
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 10px 10px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        3: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[this.id].time.gte(player.wel.modules[this.id].maxTime)},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(20)
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 10px 10px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        4: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[this.id].time.gte(player.wel.modules[this.id].maxTime)},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(50)
                return gain
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 0px 10px 10px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], 
                        ]],
                        ["row", [
                            ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],
                        ]],
                        ["row", [
                            ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34],
                        ]],
                        ["row", [
                            ["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44],
                        ]],
                        ["blank", "25px"],
                        ["style-row", [

                        ]],
                        ["blank", "25px"],
                        ["style-row", [

                        ]],
                        ["blank", "25px"],
                    ]
                    if (hasUpgrade("wel", 12)) {
                        look[6][1].push(
                            ["layerColor-dark-buyable", 11],
                        )
                        if (layers.wel.buyables[12].condition()) {
                            look[6][1].push(
                                ["layerColor-dark-buyable", 12],
                            )
                        } else {
                            look[6][1].push(
                                ["style-column", [
                                    ["raw-html", "<h2>Light Boost II</h2><br><h3>Req: 1,500 Light</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black", border: "3px solid #663737", width: "194px", height: "174px", borderRadius: "0px", lineHeight: "1"}]
                            )
                        }
                        if (layers.wel.buyables[12].condition()) {
                            if (layers.wel.buyables[13].condition()) {
                                look[6][1].push(
                                    ["layerColor-dark-buyable", 13],
                                )
                            } else {
                                look[6][1].push(
                                    ["style-column", [
                                        ["raw-html", "<h2>Light Cycle Boost</h2><br><h3>Req: 50,000 Light</h3>", {color: "white", fontSize: "10px"}],
                                    ], {background: "black", border: "3px solid #663737", width: "194px", height: "174px", borderRadius: "0px", lineHeight: "1"}]
                                )
                            }
                        }
                        if (layers.wel.buyables[13].condition()) {
                            if (layers.wel.buyables[14].condition()) {
                                look[6][1].push(
                                    ["layerColor-dark-buyable", 14],
                                )
                            } else {
                                look[6][1].push(
                                    ["style-column", [
                                        ["raw-html", "<h2>Light Speed Boost</h2><br><h3>Req: 1,500,000 Light</h3>", {color: "white", fontSize: "10px"}],
                                    ], {background: "black", border: "3px solid #663737", width: "194px", height: "174px", borderRadius: "0px", lineHeight: "1"}]
                                )
                            }
                        }
                        if (true) {
                            look[8][1].push(
                                ["layerColor-dark-buyable", 101],
                            )
                        }
                        if (layers.wel.buyables[101].condition()) {
                            if (layers.wel.buyables[102].condition()) {
                                look[8][1].push(
                                    ["layerColor-dark-buyable", 102],
                                )
                            } else {
                                look[8][1].push(
                                    ["style-column", [
                                        ["raw-html", "<h2>Starmetal XP Boost</h2><br><h3>Req: 1.00e11 Light</h3>", {color: "white", fontSize: "10px"}],
                                    ], {background: "black", border: "3px solid #663737", width: "194px", height: "174px", borderRadius: "0px", lineHeight: "1"}]
                                )
                            }
                        }
                        if (layers.wel.buyables[102].condition()) {
                            if (layers.wel.buyables[103].condition()) {
                                look[8][1].push(
                                    ["layerColor-dark-buyable", 103],
                                )
                            } else {
                                look[8][1].push(
                                    ["style-column", [
                                        ["raw-html", "<h2>Space and Time Boost</h2><br><h3>Req: 1.00e15 Light</h3>", {color: "white", fontSize: "10px"}],
                                    ], {background: "black", border: "3px solid #663737", width: "194px", height: "174px", borderRadius: "0px", lineHeight: "1"}]
                                )
                            }
                        }
                    }
                    return look
                },
            },
            "Wells": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            // light well alpha
                        ["style-column", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[1].time.div(player.wel.modules[1].maxTime).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[1].time.lt(player.wel.modules[1].maxTime) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[1].time.div(player.wel.modules[1].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Well α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[1].time.lt(player.wel.modules[1].maxTime) ? formatTime(player.wel.modules[1].maxTime.sub(player.wel.modules[1].time).div(player.wel.modules[1].timeSpeed)) : formatTime(player.wel.modules[1].maxTime.div(player.wel.modules[1].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[1].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 1],
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                    ["blank", "9px"],
                    ["raw-html", formatShortWhole(player.wel.modules[1].completions) + " α ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "(x" + formatShort(player.wel.modules[1].completionsEffect) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ]],
                    ]],
                    ["blank", "10px"],
                    ["raw-html", "All light well cycle effect scaling is reduced by ^" + format(player.wel.lightWellCycleEffectSoftcap) + " after 1,000!", {color: "#ff7f00", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", []],
                    ["blank", "25px"]]
                    if (player.wel.modules[1].completions.gte(50)) {
                            // light well beta
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                        ["style-column", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[2].time.div(player.wel.modules[2].maxTime).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[2].time.lt(player.wel.modules[2].maxTime) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[2].time.div(player.wel.modules[2].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Well β", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[2].time.lt(player.wel.modules[2].maxTime) ? formatTime(player.wel.modules[2].maxTime.sub(player.wel.modules[2].time).div(player.wel.modules[2].timeSpeed)) : formatTime(player.wel.modules[2].maxTime.div(player.wel.modules[2].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[2].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 2],
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                    ["blank", "9px"],
                    ["raw-html", formatShortWhole(player.wel.modules[2].completions) + " β ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "(x" + formatShort(player.wel.modules[2].completionsEffect) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ]],
                    )
                    } else {
                            // light well beta locked
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "<h2>Light Well β<h2><br><h3>Req: 50 α ↻</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "283px", lineHeight: "1"}],
                            ["blank", "9px"],
                            ["style-column", [], {height: "40px"}],
                        ]],
                    )
                    }
                    if (player.wel.modules[1].completions.gte(50)) {
                    if (player.wel.modules[2].completions.gte(500)) {
                            // light well gamma
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                        ["style-column", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[3].time.div(player.wel.modules[3].maxTime).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[3].time.lt(player.wel.modules[3].maxTime) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[3].time.div(player.wel.modules[3].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Well γ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[3].time.lt(player.wel.modules[3].maxTime) ? formatTime(player.wel.modules[3].maxTime.sub(player.wel.modules[3].time).div(player.wel.modules[3].timeSpeed)) : formatTime(player.wel.modules[3].maxTime.div(player.wel.modules[3].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[3].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 3],
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                    ["blank", "9px"],
                    ["raw-html", formatShortWhole(player.wel.modules[3].completions) + " γ ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "(x" + formatShort(player.wel.modules[3].completionsEffect) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ]],
                    )
                    } else {
                            // light well gamma locked
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "<h2>Light Well γ</h2><br><h3>Req: 500 β ↻</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "283px", lineHeight: "1"}],
                            ["blank", "9px"],
                            ["style-column", [], {height: "40px"}],
                        ]],
                    )
                    }
                    }
                    if (player.wel.modules[2].completions.gte(500)) {
                    if (player.wel.modules[3].completions.gte(1e9)) {
                            // light well delta
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                        ["style-column", [
                            ["style-column", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", formatShortestWhole(player.wel.modules[4].time.div(player.wel.modules[4].maxTime).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                            ], {borderRadius: "50%", width: "150px", height:"150px",
                                background: player.wel.modules[4].time.lt(player.wel.modules[4].maxTime) ?
                                "conic-gradient(#ffdfdf " + (player.wel.modules[4].time.div(player.wel.modules[4].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                            }
                            ],
                            ["blank", "9px"],
                            ["raw-html", "Light Well δ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[4].time.lt(player.wel.modules[4].maxTime) ? formatTime(player.wel.modules[4].maxTime.sub(player.wel.modules[4].time).div(player.wel.modules[4].timeSpeed)) : formatTime(player.wel.modules[4].maxTime.div(player.wel.modules[4].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShort(layers.wel.clickables[3].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 4],
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                    ["blank", "9px"],
                    ["raw-html", formatShortWhole(player.wel.modules[4].completions) + " δ ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "(x" + formatShort(player.wel.modules[4].completionsEffect) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ]],
                    )
                    } else {
                            // light well delta locked
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "<h2>Light Well δ</h2><br><h3>Req: 1e9 γ ↻</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "283px", lineHeight: "1"}],
                            ["blank", "9px"],
                            ["style-column", [], {height: "40px"}],
                        ]],
                    )
                    }
                    }
                    return look
                },
            },
        },
    },
    tabFormat() {
        let look = [
            ["raw-html", "You have <h3>" + format(player.wel.light) + "</h3> light.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["microtabs", "stuff", { 'border-width': '0px' }],
        ]
        return look
    },
    playerhown() { return player.startedGame == true}
})