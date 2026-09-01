addLayer("bum", {
    name: "Bumpy",
    symbol: "BU",
    universe: "UD",
    row: 2,
    position: 0,
    startData() { return {
        unlocked: true,

        starshines: new Decimal(0),
        starshinesToGet: new Decimal(0),
        totalStarshines: new Decimal(0),

        starlight: new Decimal(0),
        starlightToGet: new Decimal(0),
        totalStarlight: new Decimal(0),

        fountainSpeed: new Decimal(1),
        
        fountains: {
            1: {
                time: new Decimal(0),
                timeReq: new Decimal(600),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
            2: {
                time: new Decimal(0),
                timeReq: new Decimal(600),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
            3: {
                time: new Decimal(0),
                timeReq: new Decimal(600),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
            4: {
                time: new Decimal(0),
                timeReq: new Decimal(600),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
            5: {
                time: new Decimal(0),
                timeReq: new Decimal(600),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
            6: {
                time: new Decimal(0),
                timeReq: new Decimal(600),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#dfffdf",
            background: "#401d40",
            "background-origin": "border-box",
            "border-color": "#dfffdf",
        };
    },
    tooltip: "Bumpy",
    color: "#dfffdf",
    update(delta) {

        // STARLIGHT
        player.bum.starlightToGet = player.wel.light.add(1).log(10).sub(75).div(6).pow_base(2)
        if (hasAchievement("achievements", 1221)) player.bum.starlightToGet = player.bum.starlightToGet.mul(1.2)
        player.bum.starlightToGet = player.bum.starlightToGet.floor()

        if (player.bum.starshines.lte(0)) player.bum.starlightToGet = player.bum.starlightToGet.min(1);

        // STARSHINES
        player.bum.starshinesToGet = new Decimal(1)
        
        // FOUNTAIN SPEED
        player.bum.fountainSpeed = player.bum.totalStarlight.pow(2).div(10)
        player.bum.fountainSpeed = player.bum.fountainSpeed.mul(player.prj.projectSpeed)

        // FOUNTAIN PROGRESS
        Object.keys(layers.bum.fountains).forEach(i => {
            let module = player.bum.fountains[i]
            let fountain = layers.bum.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.starlightReq = fountain.getStatReq()
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
    },
    starlightReset(isRewarded) {
        return;
        if (isRewarded) {
            player.bum.starlight = player.bum.starlight.add(player.bum.starlightToGet)
            player.bum.starshines = player.bum.starshines.add(player.bum.starshinesToGet)
            if (!hasAchievement("achievements", 1216)) completeAchievement("achievements", 1216);
        }
        layers.blu.blueshiftReset(false)

        Object.keys(player.blu.blueshifts).forEach(i => {
            let module = player.blu.blueshifts[i]
            module.amount = new Decimal(0)
            module.cycleGainMul = new Decimal(1)
            module.cycleSpeedRoot = new Decimal(1)
        });
        player.blu.totalBlueshifts = new Decimal(0)
        player.blu.blueshiftEffect = new Decimal(1)

        player.prj.projectSpeed = new Decimal(1)
        player.prj.storedTimeCapsules = new Decimal(0)
    },
    branches: ["prj"],
    clickables: {
        "starshineReset": {
            title() { return "<h2>Focus your light into starlight.</h2><br>Req: 1e75 Light" },
            canClick() { return player.wel.light.gte(1e75)},
            unlocked() { return true },
            onClick() {
                layers.bum.starlightReset(true)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "2px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "2px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                return look
            },
        },
        11: {
            title() { return "<h2>BU</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
        12: {
            title() { return "<h2>??</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
        13: {
            title() { return "<h2>??</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
        14: {
            title() { return "<h2>??</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
    },
    bars: {},
    upgrades: {
        11: {
            unlocked() { return true },
            condition() { return true || player.bum.starshines.gte(4) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Improve the formulas for pyramid fountain reqs, and bulk complete them.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 4 starshines done</h3>"
                }
                return s
            },
            cost: new Decimal(3),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "8px 0 0 0", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        12: {
            unlocked() { return true },
            condition() { return true || player.bum.starshines.gte(4) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Start blueshifts with your total prisms ^0.5. Retain focus on blueshift.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 4 starshines done</h3>"
                }
                return s
            },
            cost: new Decimal(3),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        13: {
            unlocked() { return true },
            condition() { return true || false },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Extend fragmentation content.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 1,000,000 time capsules stored in one run</h3>"
                }
                return s
            },
            cost: new Decimal(12),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        14: {
            unlocked() { return true },
            condition() { return true || player.prj.projectSpeed.gte(1e4) },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Blueshifts are 6.25% stronger per starlight upgrade bought.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 10,000 project speed.</h3>"
                }
                return s
            },
            cost: new Decimal(24),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px 8px 0 0", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        21: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Multiply light gain by starlight.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(60),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        22: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "+x0.1 light well speed per focus.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(300),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        23: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock a new iridite upgrade.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(400),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        24: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Blueshifts no longer reset prismatic content. Double project speed.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(4e3),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        31: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Improve the Arrow effect.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(1e5),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        32: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Improve the Spiral effect.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(1e6),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        33: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock Bumpy as a fighting character.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(4e6),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        34: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock more light fountains. Starshines no longer reset project content.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(1e7),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        41: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Double prism well speed and ↻ gain.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(1e10),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0 0 0 8px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        42: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock focus studies in blueshift layer.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(1e12),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        43: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock the technological pylon.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(1.4e14),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        44: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock the fifth project.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: ???</h3>"
                }
                return s
            },
            cost: new Decimal(1e16),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return true },
            style() {
                let look = {width: "200px", borderRadius: "0 0 8px 0", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "1.5px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    fountains: {
        1: {
            title: "Light Fountain III",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts light gain by x" + formatSimple(layers.bum.fountains[1].getCompletionEffect(), 2) + ", based on project speed"},
            currencyLocation() { return player.bum },
            currencyInternalName: "starlight",
            currencyDisplayName: "Starlight",
            getCompletionEffect() {
                let completions = player.bum.fountains[1].completions

                s = player.prj.projectSpeed.add(1).log(10).add(1).pow(0.5).sub(1).pow_base(10).pow(completions.pow(0.5))

                return s
            },
            getTimeReq() {
                let completions = player.bum.fountains[1].completions
                let s = new Decimal(60)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[1].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.bum.fountainSpeed)

                return s
            },
        },
        2: {
            title: "Focus Fountain",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Increases focus cap by +" + formatSimple(layers.bum.fountains[2].getCompletionEffect(), 2)},
            currencyLocation() { return player.bum },
            currencyInternalName: "starlight",
            currencyDisplayName: "Starlight",
            getCompletionEffect() {
                return player.bum.fountains[2].completions
            },
            getTimeReq() {
                let completions = player.bum.fountains[2].completions
                let s = new Decimal(3)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[2].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(2)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.bum.fountainSpeed)

                return s
            },
        },
        3: {
            title: "Prism Fountain",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts prism gain by x" + formatSimple(layers.bum.fountains[3].getCompletionEffect(), 2)},
            currencyLocation() { return player.bum },
            currencyInternalName: "starlight",
            currencyDisplayName: "Starlight",
            getCompletionEffect() {
                return player.bum.fountains[3].completions.pow(0.5).pow_base(1.5)
            },
            getTimeReq() {
                let completions = player.bum.fountains[3].completions
                let s = new Decimal(3)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[3].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(100)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.bum.fountainSpeed)

                return s
            },
        },
        4: {
            title: "Speed Fountain II",
            completionEffectPrefix: "x",
            completionEffectStat: "Light Well Speed",
            condition() {
                return true
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                return player.bum.fountains[4].completions.pow(0.5).pow_base(1.5)
            },
            getTimeReq() {
                let completions = player.bum.fountains[4].completions
                let s = new Decimal(3)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[4].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(1e4)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.bum.fountainSpeed)

                return s
            },
        },
        5: {
            title: "Project Fountain",
            completionEffectPrefix: "x",
            completionEffectStat: "Project Speed",
            condition() {
                return true
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                return player.bum.fountains[5].completions.pow(0.5).pow_base(1.5)
            },
            getTimeReq() {
                let completions = player.bum.fountains[5].completions
                let s = new Decimal(3)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[5].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(1e6)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.bum.fountainSpeed)

                return s
            },
        },
        6: {
            title: "Speed Fountain III",
            completionEffectPrefix: "x",
            completionEffectStat: "Prism Well Speed",
            condition() {
                return true
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                return player.bum.fountains[5].completions.pow(0.5).pow_base(1.5)
            },
            getTimeReq() {
                let completions = player.bum.fountains[5].completions
                let s = new Decimal(3)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[5].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(1e8)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)
                s = s.mul(player.bum.fountainSpeed)

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
            "Fountains": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["style-row", [
                        ]],
                        ["style-row", [
                        ]],
                        ["blank", "25px"],
                    ]
                    return look
                }
            },
            "Journal": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["style-row", [
                            ["style-row", [
                                ["clickable", 11],
                                ["blank", "0", {width: "18px"}],
                                ["clickable", 12],
                                ["blank", "0", {width: "18px"}],
                                ["clickable", 13],
                                ["blank", "0", {width: "18px"}],
                                ["clickable", 14],
                            ] ,{width: "400px"}],
                            ["style-row", [

                            ] ,{width: "6px"}],
                            ["style-row", [

                            ] ,{width: "400px"}],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-column", [
                                    
                                ], {background: "#180b18", width: "400px", height: "600px", borderRadius: "4px 0 0 4px", margin: "3px"}],
                                ["top-column", [
                                    ["blank", "12px"],
                                    ["raw-html", 
                                    "Entry BU-01:"
                                    , {color: "#dfffdfbf", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", 
                                    "Interspace</small>"
                                    , {color: "#dfffdf", fontSize: "24px", fontFamily: "monospace"}],
                                    ["style-column", [
                                        ["raw-html",
                                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                        , {color: "#dfffdfbf", fontSize: "16px", fontFamily: "monospace", textAlign: "justify", display: "inline-flex"}],
                                    ], {margin: "12px"}],
                                ], {background: "#180b18", width: "400px", height: "600px", borderRadius: "0 4px 4px 0", margin: "3px"}],
                            ], {background: "#180b187f", borderRadius: "7px 7px 0 0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0 0 7px 7px"}],
                        ], {background: "#dfffdf", border: "3px solid #dfffdf", borderRadius: "10px"}],
                        ["blank", "25px"],
                    ]
                    return look
                }
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + formatWhole(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.bum.starlight) + "</h3> starlight." }, {color: "#dfffdf", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatWhole(player.bum.starlightToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.bum.starlightToGet.gte(1)) {look.color = "#dfffdf"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["blank", "15px"],
        ["clickable", "starshineReset"],
        ["blank", "15px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return false && player.startedGame == true && hasMilestone("prj", 303)},
    hotkeys: [
        {
            key: "s", 
            description: "Starshine",
            onPress() {
                clickClickable(this.layer, "starshineReset")
            },
        },
	]
})