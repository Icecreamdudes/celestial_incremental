addLayer("blu", {
    name: "Blueshift",
    symbol: "BL",
    universe: "UD",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        totalBlueshifts: new Decimal(0),
        bestBlueshifts: new Decimal(0),
        blueshifts: {
            1: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(10),
            },
            2: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(20),
            },
            3: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(40),
            },
            4: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(1e3),
            },
            5: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(6),
            },
            6: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(12),
            },
            7: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(24),
            },
            8: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(96),
            },
        },
        /*
            IDEAS FOR WELL-BASED BLUESHIFT EFFECTS:

            alpha: gain x(2^x^0.75) more light well cycles
            beta: 
            gamma: gain +^0.1 more prisms from light
            delta: prism fountain cycles are 10% more effective

            epsilon: speed up light wells by x(2^x^0.75)
            zeta: 
            eta: gain +^0.05 more starlight from light
            theta: starlight fountain cycles are 10% more effective
        */
        blueshiftEffectBase: new Decimal(2),
        blueshiftEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#303080",
            background: "linear-gradient(45deg, #a1a1ff 50%, #b58cde 100%)",
            "background-origin": "border-box",
            "border-color": "#303080",
        };
    },
    tooltip: "Blueshift",
    color: "#ffffd1",
    update(delta) {
        player.blu.blueshiftEffectBase = new Decimal(2)
        player.blu.blueshiftEffect = player.blu.totalBlueshifts.pow(0.75).pow_base(player.blu.blueshiftEffectBase)

        // BLUESHIFTS
        
        player.blu.blueshifts[1].shiftBase = new Decimal(10)
        player.blu.blueshifts[2].shiftBase = new Decimal(20)
        player.blu.blueshifts[3].shiftBase = new Decimal(40)
        player.blu.blueshifts[4].shiftBase = new Decimal(800)
        player.blu.blueshifts[5].shiftBase = new Decimal(6)
        player.blu.blueshifts[6].shiftBase = new Decimal(12)
        player.blu.blueshifts[7].shiftBase = new Decimal(24)
        player.blu.blueshifts[8].shiftBase = new Decimal(400)

        player.blu.totalBlueshifts = new Decimal(0)
        for (let i = 1; i < Object.keys(player.blu.blueshifts).length + 1; i++) {
            let blueshift = player.blu.blueshifts[i]

            blueshift.cycleGainMul = blueshift.shiftBase.pow(blueshift.amount)
            blueshift.cycleSpeedRoot = blueshift.amount.add(1)
            player.blu.totalBlueshifts = player.blu.totalBlueshifts.add(blueshift.amount)
        }
        if (player.blu.bestBlueshifts.lt(player.blu.totalBlueshifts)) player.blu.bestBlueshifts = player.blu.totalBlueshifts;

        player.blu.milestone11Effect = player.blu.blueshifts[1].amount.mul(0.1).add(1)
        player.blu.milestone12Effect = player.blu.blueshifts[2].amount.mul(0.2).add(1)
        player.blu.milestone13Effect = player.blu.blueshifts[3].amount.mul(0.2).add(1)
        player.blu.milestone14Effect = player.blu.blueshifts[4].amount.mul(0.25).add(1)
    },
    blueshiftReset(isRewarded, id) {
        if (isRewarded) {
            player.blu.blueshifts[id].amount = player.blu.blueshifts[id].amount.add(1)
            if (!hasAchievement("achievements", 1211)) completeAchievement("achievements", 1211);
        }
        layers.pri.prismReset(false)

        player.wel.modules[4].time = player.wel.modules[4].maxTime
        player.wel.modules[4].timeSpeed = new Decimal(0)
        player.wel.modules[4].completions = new Decimal(0)

        if (player.wel.fountains[1].focused) {
            player.wel.fountains[1].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.wel.fountains[1].automated) {
            player.wel.fountains[1].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.wel.fountains[2].focused) {
            player.wel.fountains[2].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.wel.fountains[2].automated) {
            player.wel.fountains[2].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.wel.fountains[3].focused) {
            player.wel.fountains[3].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.wel.fountains[3].automated) {
            player.wel.fountains[3].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.wel.fountains[4].focused) {
            player.wel.fountains[4].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.wel.fountains[4].automated) {
            player.wel.fountains[4].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }

        player.pri.fountains[1].completions = new Decimal(0)
        player.pri.fountains[1].canAddCompletion = false
        if (player.pri.fountains[1].focused) {
            player.pri.fountains[1].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[1].automated) {
            player.pri.fountains[1].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        player.pri.fountains[2].completions = new Decimal(0)
        player.pri.fountains[2].canAddCompletion = false
        if (player.pri.fountains[2].focused) {
            player.pri.fountains[2].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[2].automated) {
            player.pri.fountains[2].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        player.pri.fountains[3].completions = new Decimal(0)
        player.pri.fountains[3].canAddCompletion = false
        if (player.pri.fountains[3].focused) {
            player.pri.fountains[3].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[3].automated) {
            player.pri.fountains[3].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        player.pri.fountains[4].completions = new Decimal(0)
        player.pri.fountains[4].canAddCompletion = false
        if (player.pri.fountains[4].focused) {
            player.pri.fountains[4].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[4].automated) {
            player.pri.fountains[4].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        player.pri.fountains[5].completions = new Decimal(0)
        player.pri.fountains[5].canAddCompletion = false
        if (player.pri.fountains[5].focused) {
            player.pri.fountains[5].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[5].automated) {
            player.pri.fountains[5].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        player.pri.fountains[6].completions = new Decimal(0)
        player.pri.fountains[6].canAddCompletion = false
        if (player.pri.fountains[6].focused) {
            player.pri.fountains[6].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[6].automated) {
            player.pri.fountains[6].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        
        player.pri.fountains[7].completions = new Decimal(0)
        player.pri.fountains[7].canAddCompletion = false
        if (player.pri.fountains[7].focused) {
            player.pri.fountains[7].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[7].automated) {
            player.pri.fountains[7].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        player.pri.fountains[8].completions = new Decimal(0)
        player.pri.fountains[8].canAddCompletion = false
        if (player.pri.fountains[8].focused) {
            player.pri.fountains[8].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[8].automated) {
            player.pri.fountains[8].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        player.pri.fountains[9].completions = new Decimal(0)
        player.pri.fountains[9].canAddCompletion = false
        if (player.pri.fountains[9].focused) {
            player.pri.fountains[9].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[9].automated) {
            player.pri.fountains[9].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        player.pri.fountains[10].completions = new Decimal(0)
        player.pri.fountains[10].canAddCompletion = false
        if (player.pri.fountains[10].focused) {
            player.pri.fountains[10].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.pri.fountains[10].automated) {
            player.pri.fountains[10].automated = false
            player.prj.focused = player.prj.focused.sub(1)
        }

        player.pri.prisms = new Decimal(0)
        player.pri.prismsToGet = new Decimal(0)
        player.pri.bestPrisms = new Decimal(0)
        player.pri.totalPrisms = new Decimal(4)
        player.pri.bestPrismsInOneReset = new Decimal(0)
        
        for (let i = 1; i < Object.keys(player.wel.modules).length + 1; i++) {
            player.wel.modules[i].bestCompletions = new Decimal(0)
        }

        player.wel.lightGen = new Decimal(0)
    },
    branches: ["wel"],
    clickables: {
        "lightWell1_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[1].maxTime.div(player.wel.modules[1].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                layers.blu.blueshiftReset(true, 1)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "lightWell2_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[2].maxTime.div(player.wel.modules[2].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                layers.blu.blueshiftReset(true, 2)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "lightWell3_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[3].maxTime.div(player.wel.modules[3].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                layers.blu.blueshiftReset(true, 3)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "lightWell4_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[4].maxTime.div(player.wel.modules[4].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                layers.blu.blueshiftReset(true, 4)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {
        11: {
            requirementDescription: "1 Blueshift",
            effectDescription() { return "+x0.1 prism gain per OoM of light, per α blueshift. (x" + format(player.blu.milestone11Effect, 1) + ")" },
            done() { return player.blu.totalBlueshifts.gte(1) },
            style() {
                let look = {width: "506px", minHeight: "69px", maxHeight: "69px", marginLeft: "3px", marginRight: "3px", color: "white", outline: "3px solid #2f2f80", borderRadius: "0px"}
                if (hasMilestone("blu", this.id)) {
                    look.backgroundColor = "#2f2f80"
                    look.border = "3px solid #4242b3"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        12: {
            requirementDescription: "2 Blueshifts",
            effectDescription() { return "+x0.2 effective pyramid ↻, per β blueshift. (x" + format(player.blu.milestone12Effect, 1) + ")" },
            done() { return player.blu.totalBlueshifts.gte(2) },
            style() {
                let look = {width: "506px", minHeight: "69px", maxHeight: "69px", marginLeft: "3px", marginRight: "3px", color: "white", outline: "3px solid #2f2f80", borderRadius: "0px"}
                if (hasMilestone("blu", this.id)) {
                    look.backgroundColor = "#2f2f80"
                    look.border = "3px solid #4242b3"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        13: {
            requirementDescription: "3 Blueshifts",
            effectDescription() { return "+x0.2 to the blueshift effect base, per γ blueshift. (x" + format(player.blu.milestone13Effect, 1) + ")" },
            done() { return player.blu.totalBlueshifts.gte(3) },
            style() {
                let look = {width: "506px", minHeight: "69px", maxHeight: "69px", marginLeft: "3px", marginRight: "3px", color: "white", outline: "3px solid #2f2f80", borderRadius: "0px"}
                if (hasMilestone("blu", this.id)) {
                    look.backgroundColor = "#2f2f80"
                    look.border = "3px solid #4242b3"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
        14: {
            requirementDescription: "4 Blueshifts",
            effectDescription() { return "+/0.25 light well speed and duration per blueshift. (/" + format(player.blu.milestone14Effect, 2) + ")" },
            done() { return player.blu.totalBlueshifts.gte(4) },
            style() {
                let look = {width: "506px", minHeight: "69px", maxHeight: "69px", marginLeft: "3px", marginRight: "3px", color: "white", outline: "3px solid #2f2f80", borderRadius: "0px"}
                if (hasMilestone("blu", this.id)) {
                    look.backgroundColor = "#2f2f80"
                    look.border = "3px solid #4242b3"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                }
                return look
            },
        },
    },
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Blueshifts": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    return [
                        ["blank", "25px"],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", 
                                    "<small>When a well's timer gets at or below 0.1s, you can do a blueshift. Blueshifting resets everything prismatic does, as well as prisms and the pyramid's fountains. Each blueshift done roots cycle speed and increases yield for its respective well. You also gain multipliers from total blueshifts done.</small>"
                                , {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {background: "#2f2f80", border: "3px solid #4242b3", borderRadius: "10px", width: "600px", padding: "12px"}],                   
                        ], {background: "#2f2f80", borderRadius: "13px", padding: "3px", width: "630px"}],
                        ["blank", "25px"],
                        ["raw-html", "You have blueshifted <h3>" + formatWhole(player.blu.totalBlueshifts) + "</h3> times.", {color: "#ffffd1", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "<small>Boosts light well ↻" + (hasMilestone("prj", 111) ? " and prism" : "") + " gain by x" + formatSimple(player.blu.blueshiftEffect) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],

                        ["style-row", [

                            // alpha
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[1].maxTime.div(player.wel.modules[1].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "lightWell1_blueshift"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[1].amount) + " α →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatWhole(player.blu.blueshifts[1].cycleGainMul) + " α Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[1].cycleSpeedRoot) + " α Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],

                            ["blank", "", {width: "6px"}],

                            // beta
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well β", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[2].maxTime.div(player.wel.modules[2].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "lightWell2_blueshift"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[2].amount) + " β →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatWhole(player.blu.blueshifts[2].cycleGainMul) + " β Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[2].cycleSpeedRoot) + " β Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],

                            ["blank", "", {width: "6px"}],

                            // gamma
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well γ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[3].maxTime.div(player.wel.modules[3].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "lightWell3_blueshift"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[3].amount) + " γ →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatWhole(player.blu.blueshifts[3].cycleGainMul) + " γ Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[3].cycleSpeedRoot) + " γ Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],

                            ["blank", "", {width: "6px"}],
                            /*
                            // delta
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well δ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[4].maxTime.div(player.wel.modules[4].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "lightWell4_blueshift"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[4].amount) + " δ →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatWhole(player.blu.blueshifts[4].cycleGainMul) + " δ Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[4].cycleSpeedRoot) + " δ Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px", display: hasMilestone("prj", 303) ? "" : "none !important"}],
                            */
                        ]],
                        ["style-column", [
                            ["blank", "1400px"],
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", 
                                        "<small>touch grass</small>"
                                    , {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ], {background: "#2f2f80", border: "3px solid #4242b3", borderRadius: "10px", width: "624px", padding: "3px"}],                   
                            ], {background: "#2f2f80", borderRadius: "13px", padding: "3px", width: "630px"}],
                        ], {display: player.blu.totalBlueshifts.gte(5) ? "" : "none !important"}],
                        ["blank", "25px"],
                    ]
                }
            },
        },
    },
    tabFormat: [
        ["style-column", [
            ["raw-html", () => {return "Light wells operate at <h3>x" + format(player.wel.lightWellSpeed) + "</h3> speed."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ],  () => {return {display: player.wel.lightWellSpeed.gt(1) ? "" : "none !important"}}],
        ["style-column", [
            ["raw-html", () => {return "<small>Next blueshift at <h3>x" + formatWhole(
                player.blu.blueshifts[1].amount.add(1).pow_base(100)
                .min(player.blu.blueshifts[2].amount.add(1).pow_base(600))
                .min(player.blu.blueshifts[3].amount.add(1).pow_base(3000))
                .min(player.blu.blueshifts[4].amount.add(1).pow_base(24190000))
            ) + "</h3> speed.</small>"}, {color: "white", textShadow: "1px 1px 0 #3f3fff, -1px 1px 0 #3f3fff, 1px -1px 0 #3f3fff, -1px -1px 0 #3f3fff", fontSize: "18px", fontFamily: "monospace"}],
        ],  () => {return {display: hasMilestone("prj", 301) ? "" : "none !important"}}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 301)},
    hotkeys: [
        {
            key: "!", 
            description: "Blueshift light well α",
            onPress() {
                clickClickable(this.layer, "lightWell1_blueshift")
            },
        },
        {
            key: "@", 
            description: "Blueshift light well β",
            onPress() {
                clickClickable(this.layer, "lightWell2_blueshift")
            },
        },
        {
            key: "#", 
            description: "Blueshift light well γ",
            onPress() {
                clickClickable(this.layer, "lightWell3_blueshift")
            },
        },/*
        {
            key: "$", 
            description: "Blueshift light well δ",
            onPress() {
                clickClickable(this.layer, "lightWell4_blueshift")
            },
        },*/
	]
})