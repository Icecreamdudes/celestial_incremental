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
        lightWellCycleEffectPrismaticExponent: new Decimal(1),
        
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
            5: {
                time: new Decimal(0),
                maxTime: new Decimal(60),
                timeSpeed: new Decimal(1),
                completionsGain: new Decimal(1),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                
                completionsEffect: new Decimal(1),
            },
            6: {
                time: new Decimal(0),
                maxTime: new Decimal(1800),
                timeSpeed: new Decimal(1),
                completionsGain: new Decimal(1),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                
                completionsEffect: new Decimal(1),
            },
            7: {
                time: new Decimal(0),
                maxTime: new Decimal(21600),
                timeSpeed: new Decimal(1),
                completionsGain: new Decimal(1),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                
                completionsEffect: new Decimal(1),
            },
            8: {
                time: new Decimal(0),
                maxTime: new Decimal(259200),
                timeSpeed: new Decimal(1),
                completionsGain: new Decimal(1),
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                
                completionsEffect: new Decimal(1),
            },
        },

        fountains: {
            1: {
                time: new Decimal(0),
                timeReq: new Decimal(60),
                timeSpeed: new Decimal(1),
                lightReq: new Decimal(5),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                completionEffect: new Decimal(1),
            },
            2: {
                time: new Decimal(0),
                timeReq: new Decimal(2.7e4),
                timeSpeed: new Decimal(1),
                lightReq: new Decimal(1.5e3),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                completionEffect: new Decimal(1),
            },
            3: {
                time: new Decimal(0),
                timeReq: new Decimal(6e6),
                timeSpeed: new Decimal(1),
                lightReq: new Decimal(5e4),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                completionEffect: new Decimal(1),
            },
            4: {
                time: new Decimal(0),
                timeReq: new Decimal(5e8),
                timeSpeed: new Decimal(1),
                lightReq: new Decimal(1.5e6),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                completionEffect: new Decimal(1),
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

        player.wel.lightWellCycleEffectPrismaticExponent = new Decimal(1)
        if (player.pri.totalPrisms.gt(0)) {
            player.wel.lightWellCycleEffectPrismaticExponent = player.wel.lightWellCycleEffectPrismaticExponent.mul(player.pri.defraction)
        }

        player.wel.lightWellCycleEffectSoftcap = new Decimal(0.5)


        player.wel.lightMult = new Decimal(1)
        player.wel.lightMult = player.wel.lightMult.mul(player.wel.fountains[1].completionEffect)
        player.wel.lightMult = player.wel.lightMult.mul(player.wel.fountains[2].completionEffect)
        if (hasUpgrade("wel", 13)) {

            if (player.wel.modules[1].completions.gte(1e3)) player.wel.modules[1].completionsEffect = player.wel.modules[1].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).mul(0.01).add(1);
            else player.wel.modules[1].completionsEffect = player.wel.modules[1].completions.mul(0.01).add(1);
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[1].completionsEffect)

            if (player.wel.modules[2].completions.gte(1e3)) player.wel.modules[2].completionsEffect = player.wel.modules[2].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).mul(0.05).add(1);
            else player.wel.modules[2].completionsEffect = player.wel.modules[2].completions.mul(0.05).add(1);
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[2].completionsEffect)

            if (player.wel.modules[3].completions.gte(1e3)) player.wel.modules[3].completionsEffect = player.wel.modules[3].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).mul(0.01).add(1);
            else player.wel.modules[3].completionsEffect = player.wel.modules[3].completions.mul(0.01).add(1);
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[3].completionsEffect)

            if (player.wel.modules[4].completions.gte(1e3)) player.wel.modules[4].completionsEffect = player.wel.modules[4].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).div(1e9).add(1);
            else player.wel.modules[4].completionsEffect = player.wel.modules[4].completions.div(1e9).add(1);
            player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[4].completionsEffect)
        }
        if (hasUpgrade("wel", 14)) player.wel.lightMult = player.wel.lightMult.mul(2);
        player.wel.lightMult = player.wel.lightMult.mul(levelableEffect("pu", 114)[1])
        if (hasMilestone("prj", 103)) player.wel.lightMult = player.wel.lightMult.mul(2);
        if (hasMilestone("prj", 201)) player.wel.lightMult = player.wel.lightMult.mul(2);
        player.wel.lightMult = player.wel.lightMult.mul(player.pri.fountains[2].completionEffect)
        
        // WELLS

        player.wel.modules[1].maxTime = new Decimal(10)
        player.wel.modules[2].maxTime = new Decimal(60)
        player.wel.modules[3].maxTime = new Decimal(300)
        player.wel.modules[4].maxTime = new Decimal(3600)
        player.wel.modules[5].maxTime = new Decimal(60)
        player.wel.modules[6].maxTime = new Decimal(1800)
        player.wel.modules[7].maxTime = new Decimal(21600)
        player.wel.modules[8].maxTime = new Decimal(259200)

        for (let i = 1; i < Object.keys(player.wel.modules).length + 1; i++) {
            player.wel.modules[i].time = player.wel.modules[i].time.add(player.wel.modules[i].timeSpeed.mul(delta))

            // CYCLE SPEED
            player.wel.modules[i].timeSpeed = new Decimal(1)
            player.wel.modules[i].timeSpeed = player.wel.modules[i].timeSpeed.mul(player.wel.fountains[4].completionEffect)
            player.wel.modules[i].timeSpeed = player.wel.modules[i].timeSpeed.mul(levelableEffect("pu", 214)[1])
            if (hasMilestone("prj", 105)) player.wel.modules[i].timeSpeed = player.wel.modules[i].timeSpeed.mul(player.prj.milestone105Effect)

            // CYCLE GAIN
            player.wel.modules[i].completionsGain = new Decimal(1)
            player.wel.modules[i].completionsGain = player.wel.modules[i].completionsGain.mul(player.wel.fountains[3].completionEffect)
            player.wel.modules[i].completionsGain = player.wel.modules[i].completionsGain.mul(levelableEffect("pu", 215)[1])
            if (hasMilestone("prj", 102)) player.wel.modules[i].completionsGain = player.wel.modules[i].completionsGain.mul(2);
            player.wel.modules[i].completionsGain = player.wel.modules[i].completionsGain.mul(player.pri.fountains[1].completionEffect)
        }
        
        // FOUNTAIN PROGRESS
        Object.keys(layers.wel.fountains).forEach(i => {
            let module = player.wel.fountains[i]
            let fountain = layers.wel.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.lightReq = fountain.getLightReq()
            module.completionEffect = fountain.getCompletionEffect()

            if (module.focused) {
                module.time = module.time.add(module.timeSpeed.mul(delta))
                if (module.time.gte(module.timeReq)) {
                    module.focused = false
                    module.completions = module.completions.add(1)
                    module.time = new Decimal(0)
                    player.prj.focused = player.prj.focused.sub(1)
                }
            }
        });

        // PRISM WELLS

        if (player.wel.modules[5].completions.gte(1e3)) player.wel.modules[5].completionsEffect = player.wel.modules[5].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).mul(0.01).add(1);
        else player.wel.modules[5].completionsEffect = player.wel.modules[5].completions.mul(0.01).add(1);
        player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[5].completionsEffect)

        if (player.wel.modules[6].completions.gte(1e3)) player.wel.modules[6].completionsEffect = player.wel.modules[6].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).mul(0.05).add(1);
        else player.wel.modules[6].completionsEffect = player.wel.modules[6].completions.mul(0.05).add(1);
        player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[6].completionsEffect)

        if (player.wel.modules[7].completions.gte(1e3)) player.wel.modules[7].completionsEffect = player.wel.modules[7].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).mul(0.01).add(1);
        else player.wel.modules[7].completionsEffect = player.wel.modules[7].completions.mul(0.01).add(1);
        player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[7].completionsEffect)

        if (player.wel.modules[8].completions.gte(1e3)) player.wel.modules[8].completionsEffect = player.wel.modules[8].completions.div(1e3).pow(player.wel.lightWellCycleEffectSoftcap).mul(1e3).div(1e9).add(1);
        else player.wel.modules[8].completionsEffect = player.wel.modules[8].completions.div(1e9).add(1);
        player.wel.lightMult = player.wel.lightMult.mul(player.wel.modules[8].completionsEffect)

        //

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
                    s += "Unlock the first light fountain.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
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
            condition() { return player.wel.fountains[1].completions.gte(8) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Well cycles boost well yield.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 8 Light Fountain Cycles</h3>"
                }
                return s
            },
            cost: new Decimal(250),
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
            condition() { return player.wel.fountains[2].completions.gte(4) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Double light gain.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 4 Light Fountain II Cycles</h3>"
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
                    s += "Unlock projects and increase focus cap by +1.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: 1,000,000 light well α yield.</h3>"
                }
                return s
            },
            cost: new Decimal(5e7),
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
                    s += "Double project speed.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
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
            condition() { return player.pri.prisms.gte(12) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Triple stored time capsules and light gained.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: 12 prisms</h3>"
                }
                return s
            },
            cost: new Decimal(1e18),
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
        31: {
            unlocked() { return hasUpgrade("wel", 24) },
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
            cost: new Decimal(1e24),
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
        32: {
            unlocked() { return hasUpgrade("wel", 31) },
            condition() { return player.pri.blueshifts.gte(4) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Improve the 3rd and 4th light fountain effects.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: 4 Blueshifts</h3>"
                }
                return s
            },
            cost: new Decimal(1e30),
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
        33: {
            unlocked() { return hasUpgrade("wel", 31) },
            condition() { return player.pri.blueshifts.gte(4) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Prism fountain speed slightly boosts project speed.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: 60 total Prism Fountain cycles</h3>"
                }
                return s
            },
            cost: new Decimal(1e38),
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
        34: {
            unlocked() { return hasUpgrade("wel", 31) },
            condition() { return false },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock the fourth project and double light well speed.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: 2 δ Blueshifts</h3>"
                }
                return s
            },
            cost: new Decimal(1e50),
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
        41: {
            unlocked() { return hasUpgrade("wel", 34) },
            condition() { return player.bum.starlight.gte(67) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "x67 light lmao.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: 67 Starlight</h3>"
                }
                return s
            },
            cost: new Decimal(6.7e67),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px 0px 0px 10px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
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
        42: {
            unlocked() { return hasUpgrade("wel", 34) },
            condition() { return player.wel.modules[3].completions.gte(1e9) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock more starlight buyables.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: Time Capsule Project level 15</h3>"
                }
                return s
            },
            cost: new Decimal(1e99),
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
        43: {
            unlocked() { return hasUpgrade("wel", 34) },
            condition() { return false },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Triple ALL well speeds.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: Prism Well γ unlocked</h3>"
                }
                return s
            },
            cost: new Decimal(1e128),
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
        44: {
            unlocked() { return hasUpgrade("wel", 34) },
            condition() { return false },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "(COMING SOON)</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><br><h3>Req: 60 total Project levels</h3>"
                }
                return s
            },
            cost: new Decimal(1e150),
            currencyLocation() { return player.wel },
            currencyDisplayName: "Light",
            currencyInternalName: "light",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px 0px 10px 0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
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
                tickProjects(player.wel.modules[this.id].maxTime.div(player.wel.modules[this.id].timeSpeed).div(4))
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.wel.lightMult
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
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
                tickProjects(player.wel.modules[this.id].maxTime.div(player.wel.modules[this.id].timeSpeed).div(4))
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(5)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
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
                tickProjects(player.wel.modules[this.id].maxTime.div(player.wel.modules[this.id].timeSpeed).div(4))
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(20)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
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
                tickProjects(player.wel.modules[this.id].maxTime.div(player.wel.modules[this.id].timeSpeed).div(4))
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.wel.lightMult
                gain = gain.mul(50)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
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
        5: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[this.id].time.gte(player.wel.modules[this.id].maxTime)},
            unlocked() { return true },
            onClick() {
                tickProjects(player.wel.modules[this.id].maxTime.div(player.wel.modules[this.id].timeSpeed).div(4))
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.pri.prismsToGet
                gain = gain.mul(0.01)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#d6ebff"
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
        6: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[this.id].time.gte(player.wel.modules[this.id].maxTime)},
            unlocked() { return true },
            onClick() {
                tickProjects(player.wel.modules[this.id].maxTime.div(player.wel.modules[this.id].timeSpeed).div(4))
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.pri.prismsToGet
                gain = gain.mul(0.1)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#d6ebff"
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
        7: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[this.id].time.gte(player.wel.modules[this.id].maxTime)},
            unlocked() { return true },
            onClick() {
                tickProjects(player.wel.modules[this.id].maxTime.div(player.wel.modules[this.id].timeSpeed).div(4))
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.pri.prismsToGet
                gain = gain.mul(1)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#d6ebff"
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
        8: {
            title() { return "<h3>Collect</h3> ↻" },
            canClick() { return player.wel.modules[this.id].time.gte(player.wel.modules[this.id].maxTime)},
            unlocked() { return true },
            onClick() {
                tickProjects(player.wel.modules[this.id].maxTime.div(player.wel.modules[this.id].timeSpeed).div(4))
                player.wel.light = player.wel.light.add(layers.wel.clickables[this.id].lightGain())
                player.wel.modules[this.id].time = new Decimal(0)
                player.wel.modules[this.id].completions = player.wel.modules[this.id].completions.add(player.wel.modules[this.id].completionsGain)
            },
            lightGain() {
                let gain = player.pri.prismsToGet
                gain = gain.mul(10)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#d6ebff"
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
        101: {
            title() { return "<h3>Respec Interspace Focus</h3><br><small>(you won't get your light back!)</small>" },
            canClick() { return player.prj.focused.gt(0)},
            unlocked() { return true },
            onClick() {
                player.prj.focused = new Decimal(0)
                Object.keys(layers.wel.fountains).forEach(i => {
                    player.wel.fountains[i].focused = false
                });
                Object.keys(layers.prj.projects).forEach(i => {
                    player.prj.modules[i].focused = false
                });
                Object.keys(layers.pri.fountains).forEach(i => {
                    player.pri.fountains[i].focused = false
                });
            },
            style() {
                let look = {width: "400px", minHeight: "75px", maxHeight: "75px", borderRadius: "10px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
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
        1001: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.wel.light.gte(player.wel.fountains[this.id - 1000].lightReq) && !player.wel.fountains[this.id - 1000].focused},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.sub(player.wel.fountains[this.id - 1000].lightReq)
                player.prj.focused = player.prj.focused.add(1)
                player.wel.fountains[this.id - 1000].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
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
        1002: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.wel.light.gte(player.wel.fountains[this.id - 1000].lightReq) && !player.wel.fountains[this.id - 1000].focused},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.sub(player.wel.fountains[this.id - 1000].lightReq)
                player.prj.focused = player.prj.focused.add(1)
                player.wel.fountains[this.id - 1000].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
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
        1003: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.wel.light.gte(player.wel.fountains[this.id - 1000].lightReq) && !player.wel.fountains[this.id - 1000].focused},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.sub(player.wel.fountains[this.id - 1000].lightReq)
                player.prj.focused = player.prj.focused.add(1)
                player.wel.fountains[this.id - 1000].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
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
        1004: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.wel.light.gte(player.wel.fountains[this.id - 1000].lightReq) && !player.wel.fountains[this.id - 1000].focused},
            unlocked() { return true },
            onClick() {
                player.wel.light = player.wel.light.sub(player.wel.fountains[this.id - 1000].lightReq)
                player.prj.focused = player.prj.focused.add(1)
                player.wel.fountains[this.id - 1000].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffd3"
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
    },
    fountains: {
        1: {
            title: "Light Fountain",
            completionEffectStat: "Light",
            condition() {
                return true
            },
            getCompletionEffect() {
                let completions = player.wel.fountains[1].completions.pow(0.9)

                let s = completions.add(1).mul(completions.pow_base(1.1))

                return s.floor()
            },
            getTimeReq() {
                let completions = player.wel.fountains[1].completions
                let s = new Decimal(60)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(Math.pow(1.3, 1.1)))
                if (completions.gte(1e3)) {
                    s = s.pow(1.05)
                }

                return s
            },
            getLightReq() {
                let completions = player.wel.fountains[1].completions
                let s = new Decimal(5)

                s = s.mul(completions.mul(0.25).add(1))
                s = s.mul(completions.pow_base(1.3))
                if (completions.gte(1e3)) {
                    s = s.pow(1.05)
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.wel.light)
                s = s.mul(player.prj.projectSpeed)

                return s
            },
        },
        2: {
            title: "Light Fountain II",
            completionEffectStat: "Light",
            condition() {
                return player.wel.bestLight.gte(1.5e3)
            },
            getCompletionEffect() {
                let completions = player.wel.fountains[2].completions.pow(0.9)

                let s = completions.add(1).mul(completions.pow_base(1.08))

                return s.floor()
            },
            getTimeReq() {
                let completions = player.wel.fountains[2].completions
                let s = new Decimal(2.7e4)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(Math.pow(1.5, 1.1)))
                if (completions.gte(1e3)) {
                    s = s.pow(1.05)
                }

                return s
            },
            getLightReq() {
                let completions = player.wel.fountains[2].completions
                let s = new Decimal(1.5e3)

                s = s.mul(completions.mul(0.25).add(1))
                s = s.mul(completions.pow_base(1.5))
                if (completions.gte(1e3)) {
                    s = s.pow(1.05)
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.wel.light)
                s = s.mul(player.prj.projectSpeed)

                return s
            },
        },
        3: {
            title: "Light Cycle Fountain",
            completionEffectStat: "Light Well Cycles",
            condition() {
                return player.wel.bestLight.gte(5e4)
            },
            getCompletionEffect() {
                let completions = player.wel.fountains[3].completions

                let s = completions.pow(1.5).add(1)//.mul(completions.pow_base(1.04))

                return s.floor()
            },
            getTimeReq() {
                let completions = player.wel.fountains[3].completions
                let s = new Decimal(3e6)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(Math.pow(5, 1.1)))
                if (completions.gte(1e3)) {
                    s = s.pow(1.05)
                }

                return s
            },
            getLightReq() {
                let completions = player.wel.fountains[3].completions
                let s = new Decimal(5e4)

                s = s.mul(completions.mul(0.25).add(1))
                s = s.mul(completions.pow_base(5))
                if (completions.gte(1e3)) {
                    s = s.pow(1.05)
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.wel.light)
                s = s.mul(player.prj.projectSpeed)

                return s
            },
        },
        4: {
            title: "Light Speed Fountain",
            completionEffectStat: "Light Well Speed",
            condition() {
                return player.wel.bestLight.gte(1.5e6)
            },
            getCompletionEffect() {
                let completions = player.wel.fountains[4].completions

                let s = completions.mul(0.25)/*.mul(completions.pow_base(1.03))*/.add(1)

                return s.floor()
            },
            getTimeReq() {
                let completions = player.wel.fountains[4].completions
                let s = new Decimal(1e8)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(Math.pow(4, 1.1)))
                if (completions.gte(1e3)) {
                    s = s.pow(1.05)
                }

                return s
            },
            getLightReq() {
                let completions = player.wel.fountains[4].completions
                let s = new Decimal(1.5e6)

                s = s.mul(completions.mul(0.25).add(1))
                s = s.mul(completions.pow_base(4))
                if (completions.gte(1e3)) {
                    s = s.pow(1.05)
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.wel.light)
                s = s.mul(player.prj.projectSpeed)

                return s
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
                    ]
                    return look
                },
            },
            "Wells": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return hasUpgrade("wel", 11) },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            // light well alpha
                            ["style-column", [
                                ["style-column", [
                                    ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["raw-html", formatShortestWhole(player.wel.modules[1].time.div(player.wel.modules[1].maxTime).min(1).max(0).mul(100).floor()) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                            ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                                        ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #336659", marginTop: "81px",
                                            background: player.wel.modules[1].time.lt(player.wel.modules[1].maxTime) ?
                                            "conic-gradient(#ffdfdf " + (player.wel.modules[1].time.div(player.wel.modules[1].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                                        }],
                                    ], {background: "#4d9973", height: "75px", borderRadius: "75px 75px 0 0"}],
                                    ["style-column", [], {height: "61px"}],
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", player.wel.modules[1].time.lt(player.wel.modules[1].maxTime) ? formatTime(player.wel.modules[1].maxTime.sub(player.wel.modules[1].time).div(player.wel.modules[1].timeSpeed)) : formatTime(player.wel.modules[1].maxTime.div(player.wel.modules[1].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                            ["raw-html", "+" + formatWhole(layers.wel.clickables[1].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", 1],
                                    ["blank", "3px"],
                                    ["style-column", [
                                        ["raw-html", formatShortWhole(player.wel.modules[1].completions) + " α ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                        ["raw-html", "(x" + formatShort(player.wel.modules[1].completionsEffect) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace", display: hasUpgrade("wel", 13) ? "" : "none !important"}],
                                    ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", height: "44px"}],
                                ], {background: "#336659", border: "3px solid #336659", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                                ["blank", "9px"],                  
                            ]],
                        ]],
                        ["blank", "10px"],
                        ["raw-html", "All light well cycle effect scaling is ^" + format(player.wel.lightWellCycleEffectPrismaticExponent, 3) + " due to refraction!", {color: "#ffff00", fontSize: "16px", fontFamily: "monospace", display: (player.wel.modules[1].completions.gte(1e3) ? "" : "none !important")}],
                        ["blank", "10px"],
                        ["raw-html", "All light well cycle effect scaling is ^" + format(player.wel.lightWellCycleEffectSoftcap, 3) + " after 1,000!", {color: "#ff7f00", fontSize: "16px", fontFamily: "monospace", display: (player.wel.modules[1].completions.gte(1e3) ? "" : "none !important")}],
                        ["blank", "25px"],
                        ["row", []],
                        ["blank", "25px"]
                    ]
                    if (player.wel.modules[1].completions.gte(50)) {
                            // light well beta
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                        ["style-column", [
                            ["style-column", [
                                    ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["raw-html", formatShortestWhole(player.wel.modules[2].time.div(player.wel.modules[2].maxTime).min(1).max(0).mul(100).floor()) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                            ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                                        ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #336659", marginTop: "81px",
                                            background: player.wel.modules[2].time.lt(player.wel.modules[2].maxTime) ?
                                            "conic-gradient(#ffdfdf " + (player.wel.modules[2].time.div(player.wel.modules[2].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                                        }],
                                    ], {background: "#4d9973", height: "75px", borderRadius: "75px 75px 0 0"}],
                                    ["style-column", [], {height: "61px"}],
                            ["blank", "9px"],
                            ["raw-html", "Light Well β", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[2].time.lt(player.wel.modules[2].maxTime) ? formatTime(player.wel.modules[2].maxTime.sub(player.wel.modules[2].time).div(player.wel.modules[2].timeSpeed)) : formatTime(player.wel.modules[2].maxTime.div(player.wel.modules[2].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatWhole(layers.wel.clickables[2].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 2],
                            ["blank", "3px"],
                            ["style-column", [
                                ["raw-html", formatShortWhole(player.wel.modules[2].completions) + " β ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", "(x" + formatShort(player.wel.modules[2].completionsEffect) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace", display: hasUpgrade("wel", 13) ? "" : "none !important"}],
                            ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", height: "44px"}],
                        
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                        ["blank", "9px"],
                    ]],
                    )
                    } else {
                            // light well beta locked
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "<h2>Light Well β<h2><br><h3>Req: 50 α ↻</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "323px", lineHeight: "1"}],
                            ["blank", "9px"],
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
                                            ["style-column", [
                                                ["raw-html", formatShortestWhole(player.wel.modules[3].time.div(player.wel.modules[3].maxTime).min(1).max(0).mul(100).floor()) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                            ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                                        ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #336659", marginTop: "81px",
                                            background: player.wel.modules[3].time.lt(player.wel.modules[3].maxTime) ?
                                            "conic-gradient(#ffdfdf " + (player.wel.modules[3].time.div(player.wel.modules[3].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                                        }],
                                    ], {background: "#4d9973", height: "75px", borderRadius: "75px 75px 0 0"}],
                                    ["style-column", [], {height: "61px"}],
                            ["blank", "9px"],
                            ["raw-html", "Light Well γ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[3].time.lt(player.wel.modules[3].maxTime) ? formatTime(player.wel.modules[3].maxTime.sub(player.wel.modules[3].time).div(player.wel.modules[3].timeSpeed)) : formatTime(player.wel.modules[3].maxTime.div(player.wel.modules[3].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatWhole(layers.wel.clickables[3].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 3],
                            ["blank", "3px"],
                            ["style-column", [
                                ["raw-html", formatShortWhole(player.wel.modules[3].completions) + " γ ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", "(x" + formatShort(player.wel.modules[3].completionsEffect) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace", display: hasUpgrade("wel", 13) ? "" : "none !important"}],
                            ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", height: "44px"}],
                        
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                        ["blank", "9px"],    
                    ]],
                    )
                    } else {
                            // light well gamma locked
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "<h2>Light Well γ</h2><br><h3>Req: 500 β ↻</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "323px", lineHeight: "1"}],
                            ["blank", "9px"],
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
                                            ["style-column", [
                                                ["raw-html", formatShortestWhole(player.wel.modules[4].time.div(player.wel.modules[4].maxTime).min(1).max(0).mul(100).floor()) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                            ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}],
                                        ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #336659", marginTop: "81px",
                                            background: player.wel.modules[4].time.lt(player.wel.modules[4].maxTime) ?
                                            "conic-gradient(#ffdfdf " + (player.wel.modules[4].time.div(player.wel.modules[4].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#a8ffd3"
                                        }],
                                    ], {background: "#4d9973", height: "75px", borderRadius: "75px 75px 0 0"}],
                                    ["style-column", [], {height: "61px"}],
                            ["blank", "9px"],
                            ["raw-html", "Light Well δ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[4].time.lt(player.wel.modules[4].maxTime) ? formatTime(player.wel.modules[4].maxTime.sub(player.wel.modules[4].time).div(player.wel.modules[4].timeSpeed)) : formatTime(player.wel.modules[4].maxTime.div(player.wel.modules[4].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatWhole(layers.wel.clickables[3].lightGain()) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 4],
                            ["blank", "3px"],
                            ["style-column", [
                                ["raw-html", formatShortWhole(player.wel.modules[4].completions) + " δ ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", "(x" + formatShort(player.wel.modules[4].completionsEffect) + " Light)", {color: "white", fontSize: "12px", fontFamily: "monospace", display: hasUpgrade("wel", 13) ? "" : "none !important"}],
                            ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", height: "44px"}],
                        ], {background: "#336659",border: "3px solid #336659", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                        ["blank", "9px"],
                    ]],
                    )
                    } else {
                            // light well delta locked
                        look[1][1].push(["blank", "1px"])
                        look[1][1].push(
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "<h2>Light Well δ</h2><br><h3>Req: 1e9 γ ↻</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "323px", lineHeight: "1"}],
                            ["blank", "9px"],
                        ]],
                    )
                    }

                    // PRISM WELLS

                    }
                    if (true) {
                        // prism well epsilon
                        look[7][1].push(["blank", "1px"])
                        look[7][1].push(
                        ["style-column", [
                            ["style-column", [
                                    ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["raw-html", formatShortestWhole(player.wel.modules[5].time.div(player.wel.modules[5].maxTime).min(1).max(0).mul(100).floor()) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                            ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}],
                                        ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #335966", marginTop: "81px",
                                            background: player.wel.modules[5].time.lt(player.wel.modules[5].maxTime) ?
                                            "conic-gradient(#ffdfdf " + (player.wel.modules[5].time.div(player.wel.modules[5].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#d6ebff"
                                        }],
                                    ], {background: "#4d9999", height: "75px", borderRadius: "75px 75px 0 0"}],
                                    ["style-column", [], {height: "61px"}],
                            ["blank", "9px"],
                            ["raw-html", "Prism Well ε", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[5].time.lt(player.wel.modules[5].maxTime) ? formatTime(player.wel.modules[5].maxTime.sub(player.wel.modules[5].time).div(player.wel.modules[5].timeSpeed)) : formatTime(player.wel.modules[5].maxTime.div(player.wel.modules[5].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatWhole(layers.wel.clickables[5].lightGain()) + " Prisms", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["clickable", 5],
                            ["blank", "3px"],
                            ["style-column", [
                                ["raw-html", formatShortWhole(player.wel.modules[5].completions) + " ε ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", "(x" + formatShort(player.wel.modules[5].completionsEffect) + " Prisms)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                            ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", height: "44px"}],
                        
                        ], {background: "#335966",border: "3px solid #335966", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                        ["blank", "9px"],
                    ]],
                    )
                    }
                    if (true) {
                        if (player.wel.modules[5].completions.gte(50)) {
                            // prism well zeta
                            look[7][1].push(["blank", "1px"])
                            look[7][1].push(
                            ["style-column", [
                                ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["style-column", [
                                                    ["raw-html", formatShortestWhole(player.wel.modules[6].time.div(player.wel.modules[6].maxTime).min(1).max(0).mul(100).floor()) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                                ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}],
                                            ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #335966", marginTop: "81px",
                                                background: player.wel.modules[6].time.lt(player.wel.modules[6].maxTime) ?
                                                "conic-gradient(#ffdfdf " + (player.wel.modules[6].time.div(player.wel.modules[6].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#d6ebff"
                                            }],
                                        ], {background: "#4d9999", height: "75px", borderRadius: "75px 75px 0 0"}],
                                        ["style-column", [], {height: "61px"}],
                                ["blank", "9px"],
                                ["raw-html", "Prism Well ζ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", player.wel.modules[6].time.lt(player.wel.modules[6].maxTime) ? formatTime(player.wel.modules[6].maxTime.sub(player.wel.modules[6].time).div(player.wel.modules[6].timeSpeed)) : formatTime(player.wel.modules[6].maxTime.div(player.wel.modules[6].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "9px"],
                                ["style-column", [
                                        ["raw-html", "+" + formatWhole(layers.wel.clickables[5].lightGain()) + " Prisms", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                ["blank", "3px"],
                                ["clickable", 5],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatShortWhole(player.wel.modules[6].completions) + " ζ ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShort(player.wel.modules[6].completionsEffect) + " Prisms)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", height: "44px"}],
                            
                            ], {background: "#335966",border: "3px solid #335966", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                            ["blank", "9px"],
                        ]],
                        )
                        } else {
                                // prism well zeta locked
                            look[7][1].push(["blank", "1px"])
                            look[7][1].push(
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "<h2>Prism Well ζ<h2><br><h3>Req: 500 ε ↻</h3>", {color: "white", fontSize: "10px"}],
                                    ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "323px", lineHeight: "1"}],
                                ["blank", "9px"],
                            ]],
                        )
                        }
                    }
                    if (player.wel.modules[5].completions.gte(50)) {
                        if (player.wel.modules[6].completions.gte(1e6)) {
                            // prism well eta
                            look[7][1].push(["blank", "1px"])
                            look[7][1].push(
                            ["style-column", [
                                ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["style-column", [
                                                    ["raw-html", formatShortestWhole(player.wel.modules[6].time.div(player.wel.modules[6].maxTime).min(1).max(0).mul(100).floor()) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                                ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}],
                                            ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #335966", marginTop: "81px",
                                                background: player.wel.modules[6].time.lt(player.wel.modules[6].maxTime) ?
                                                "conic-gradient(#ffdfdf " + (player.wel.modules[6].time.div(player.wel.modules[6].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#d6ebff"
                                            }],
                                        ], {background: "#4d9999", height: "75px", borderRadius: "75px 75px 0 0"}],
                                        ["style-column", [], {height: "61px"}],
                                ["blank", "9px"],
                                ["raw-html", "Prism Well η", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", player.wel.modules[6].time.lt(player.wel.modules[6].maxTime) ? formatTime(player.wel.modules[6].maxTime.sub(player.wel.modules[6].time).div(player.wel.modules[6].timeSpeed)) : formatTime(player.wel.modules[6].maxTime.div(player.wel.modules[6].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "9px"],
                                ["style-column", [
                                        ["raw-html", "+" + formatWhole(layers.wel.clickables[5].lightGain()) + " Prisms", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                ["blank", "3px"],
                                ["clickable", 5],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatShortWhole(player.wel.modules[6].completions) + " η ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShort(player.wel.modules[6].completionsEffect) + " Prisms)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", height: "44px"}],
                            
                            ], {background: "#335966",border: "3px solid #335966", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                            ["blank", "9px"],
                        ]],
                        )
                        } else {
                                // prism well eta locked
                            look[7][1].push(["blank", "1px"])
                            look[7][1].push(
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "<h2>Prism Well η<h2><br><h3>Req: 1,000,000 ζ ↻</h3>", {color: "white", fontSize: "10px"}],
                                    ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "323px", lineHeight: "1"}],
                                ["blank", "9px"],
                            ]],
                        )
                        }
                    }
                    if (player.wel.modules[6].completions.gte(1e6)) {
                        if (player.wel.modules[7].completions.gte(1e12)) {
                            // prism well theta
                            look[7][1].push(["blank", "1px"])
                            look[7][1].push(
                            ["style-column", [
                                ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["style-column", [
                                                    ["raw-html", formatShortestWhole(player.wel.modules[6].time.div(player.wel.modules[6].maxTime).min(1).max(0).mul(100).floor()) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                                ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}],
                                            ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #335966", marginTop: "81px",
                                                background: player.wel.modules[6].time.lt(player.wel.modules[6].maxTime) ?
                                                "conic-gradient(#ffdfdf " + (player.wel.modules[6].time.div(player.wel.modules[6].maxTime)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#d6ebff"
                                            }],
                                        ], {background: "#4d9999", height: "75px", borderRadius: "75px 75px 0 0"}],
                                        ["style-column", [], {height: "61px"}],
                                ["blank", "9px"],
                                ["raw-html", "Prism Well θ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", player.wel.modules[6].time.lt(player.wel.modules[6].maxTime) ? formatTime(player.wel.modules[6].maxTime.sub(player.wel.modules[6].time).div(player.wel.modules[6].timeSpeed)) : formatTime(player.wel.modules[6].maxTime.div(player.wel.modules[6].timeSpeed)) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "9px"],
                                ["style-column", [
                                        ["raw-html", "+" + formatWhole(layers.wel.clickables[5].lightGain()) + " Prisms", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                ["blank", "3px"],
                                ["clickable", 5],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatShortWhole(player.wel.modules[6].completions) + " θ ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShort(player.wel.modules[6].completionsEffect) + " Prisms)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", height: "44px"}],
                            
                            ], {background: "#335966",border: "3px solid #335966", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                            ["blank", "9px"],
                        ]],
                        )
                        } else {
                                // prism well theta locked
                            look[7][1].push(["blank", "1px"])
                            look[7][1].push(
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "<h2>Prism Well θ<h2><br><h3>Req: 1e12 η ↻</h3>", {color: "white", fontSize: "10px"}],
                                    ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "323px", lineHeight: "1"}],
                                ["blank", "9px"],
                            ]],
                        )
                        }
                    }
                    return look
                },
            },
            "Fountains": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return hasUpgrade("wel", 12) },
                content() {
                    let look = [
                        ["style-column", [
                            ["blank", "25px"],
                            ["raw-html", "You are gaining <h3>" + formatWhole(player.wel.light.mul(player.prj.projectSpeed)) + "</h3> fountain progress /s.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["raw-html", "<small>Light gives a base progress rate of " + formatWhole(player.wel.light) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["raw-html", "You are focusing on " + formatWhole(player.prj.focused) + "/" + formatWhole(player.prj.maxFocused) + " interspace tasks.", {color: "#ccc", fontSize: "18px", fontFamily: "monospace"}],
                            ["blank", "25px"],
                        ]],
                        ["style-row", [

                        ]],
                        ["blank", "6px"],
                        ["style-row", [

                        ]],
                        ["blank", "6px"],
                        ["style-row", [

                        ]],
                        ["blank", "6px"],
                        ["style-row", [

                        ]],
                        ["blank", "25px"],
                        ["clickable", 101],
                        ["blank", "25px"],
                    ]
                    if (hasUpgrade("wel", 12)) {
                        look[1][1].push(
                            makeWellFountain(1)
                        )
                        if (layers.wel.fountains[2].condition()) {
                            look[1][1].push(
                                ["blank", "6px", {width: "6px"}],
                                makeWellFountain(2)
                            )
                        } else {
                            look[1][1].push(
                                    ["blank", "6px", {width: "6px"}],
                                ["style-column", [
                                    ["raw-html", "<h2>Light Fountain II</h2><br><h3>Req: 1,500 Light</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black", border: "3px solid #663737", width: "394px", height: "204px", borderRadius: "10px 81px 10px 10px", lineHeight: "1"}]
                            )
                        }
                        if (layers.wel.fountains[2].condition()) {
                            if (layers.wel.fountains[3].condition()) {
                                look[3][1].push(
                                    makeWellFountain(3)
                                )
                            } else {
                                look[3][1].push(
                                    ["blank", "6px", {width: "6px"}],
                                    ["style-column", [
                                        ["raw-html", "<h2>Light Cycle Fountain</h2><br><h3>Req: 50,000 Light</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black", border: "3px solid #663737", width: "394px", height: "204px", borderRadius: "10px 81px 10px 10px", lineHeight: "1"}]
                                )
                            }
                        }
                        if (layers.wel.fountains[3].condition()) {
                            if (layers.wel.fountains[4].condition()) {
                                look[3][1].push(
                                    ["blank", "6px", {width: "6px"}],
                                    makeWellFountain(4)
                                )
                            } else {
                                look[3][1].push(
                                    ["blank", "6px", {width: "6px"}],
                                    ["style-column", [
                                        ["raw-html", "<h2>Light Speed Fountain</h2><br><h3>Req: 1,500,000 Light</h3>", {color: "white", fontSize: "10px"}],
                                ], {background: "black", border: "3px solid #663737", width: "394px", height: "204px", borderRadius: "10px 81px 10px 10px", lineHeight: "1"}]
                                )
                            }
                        }
                        /*if (layers.wel.fountains[5].condition()) {
                            look[5][1].push(
                                ["blank", "6px", {width: "6px"}],
                                makeWellFountain(5)
                            )
                        } else if (layers.wel.fountains[5].unlocked()) {
                            look[5][1].push(
                                ["blank", "6px", {width: "6px"}],
                                ["style-column", [
                                    ["raw-html", "<h2>Project Speed Fountain</h2><br><h3>Req: 1e9 Light</h3>", {color: "white", fontSize: "10px"}],
                            ], {background: "black", border: "3px solid #663737", width: "394px", height: "204px", borderRadius: "10px 81px 10px 10px", lineHeight: "1"}]
                            )
                        }*/
                    }
                    return look
                }
            }
        },
    },
    tabFormat() {
        let look = [
            ["raw-html", "You have <h3>" + formatWhole(player.wel.light) + "</h3> light.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["microtabs", "stuff", { 'border-width': '0px' }],
        ]
        return look
    },
    playerhown() { return player.startedGame == true}
})

const makeWellFountain = function (id) {
    let thisFountain =
        ["style-column", [
            ["style-row", [
                ["style-column", [
                    ["blank", "10px"],
                    ["raw-html", layers.wel.fountains[id].title, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", player.wel.fountains[id].timeSpeed.lte(0) ? "<span style='color:#ff7f7f'>Can't Complete w/o Light!</span>" : (player.wel.fountains[id].focused ? formatTime(player.wel.fountains[id].timeReq.sub(player.wel.fountains[id].time).div(player.wel.fountains[id].timeSpeed)) : formatTime(player.wel.fountains[id].timeReq.div(player.wel.fountains[id].timeSpeed))) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", "<small>(" + format(player.wel.fountains[id].time) + "/" + format(player.wel.fountains[id].timeReq) + ")</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", player.wel.fountains[id].lightReq.eq(0) ? "Your first cycle is free!" : "-" + formatWhole(player.wel.fountains[id].lightReq) + " Light", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "238px", height:"25px"}],
                    ["blank", "3px"],
                    ["clickable", id + 1000],
                ], {background: "#336659", border: "3px solid #336659", borderRadius: "16px 0px 0px 0px", width: "238px", height: "150px"}],
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", player.wel.fountains[id].time.gte(player.wel.fountains[id].timeReq) ? "0%" : formatShortestWhole(player.wel.fountains[id].time.div(player.wel.fountains[id].timeReq).min(1).max(0).mul(100).floor()) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "100px", width: "75px", height:"75px"}]
                        ], {borderRadius: "50%", width: "125px", height:"125px", border: "3px solid #336659", margin: "-3px", marginTop: "75px",
                            background: player.wel.fountains[id].time.lt(player.wel.fountains[id].timeReq) ?
                            "conic-gradient(#ffdfdf " + (player.wel.fountains[id].time.div(player.wel.fountains[id].timeReq)).min(1).max(0) * 360 + "deg, #0b1711 0deg)" : "#0b1711"
                        }],
                    ], {background: "#336659", borderRadius: "0px 81px 0px 0px", width: "153px", height: "78px"}],
                    ["style-column", [], {background: "#4d9973", height: "78px"}],
                ], {border: "3px solid #336659", borderBottom: "0px", borderLeft: "0px", borderRadius: "0px 81px 0px 0px", padding: "-3px", width: "153px", height: "153px"}],
            ], {verticalAlign: "bottom"}],
            ["style-column", [
                    ["style-column", [
                    ["raw-html", formatWhole(player.wel.fountains[id].completions) + " ↻<br><small>(x" + formatWhole(layers.wel.fountains[id].getCompletionEffect()) + " " + layers.wel.fountains[id].completionEffectStat + ")</small>", {color: "white", fontSize: "16px", fontFamily: "monospace", lineHeight: "18px", display: "block"}],
                ], {background: "#336659", border: "3px solid #4d9973", borderRadius: "0px 0px 7px 7px", width: "388px", height: "44px"}],
            ], {background: "#4d9973", border: "3px solid #336659", borderRadius: "0px 0px 10px 10px", borderTop: "0px", height: "50px"}],
        ], {width: "400px"}]
    return thisFountain
}

const tickProjects = function (time) {
    Object.keys(layers.prj.projects).forEach(i => {
        let module = player.prj.modules[i]
        if (module.focused) {
            module.time = module.time.add(module.timeSpeed.mul(time))
            if (module.time.gte(module.timeReq)) {
                module.focused = false
                module.completions = module.completions.add(1)
                module.time = new Decimal(0)
                player.prj.focused = player.prj.focused.sub(1)
            }
        }
    });
}