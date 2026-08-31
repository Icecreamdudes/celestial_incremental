addLayer("pri", {
    name: "Prismatic",
    symbol: "PR",
    universe: "UD",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        prisms: new Decimal(0),
        bestPrisms: new Decimal(0),
        totalPrisms: new Decimal(0),
        prismsToGet: new Decimal(0),
        bestPrismsInOneReset: new Decimal(0),

        autoPrismaticToggle: false,
        autoPrismaticInput: new Decimal(0),
        autoPrismaticAmount: new Decimal(1),
        autoPrismaticType: false, // False: Amount ; True: Time
        autoPrismaticTime: new Decimal(0),

        fountainSpeed: new Decimal(0),
        totalFountainCycles: new Decimal(0),

        prismFountainReqDivisor: new Decimal(1),

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
                prismReq: new Decimal(1),
            },
            2: {
                time: new Decimal(0),
                timeReq: new Decimal(1.2e3),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            3: {
                time: new Decimal(0),
                timeReq: new Decimal(1.5e4),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            4: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            5: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            6: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            7: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            8: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            9: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            10: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            11: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            12: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            13: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            14: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
            15: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                prismReq: new Decimal(1),
            },
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#335966",
            background: "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)",
            "background-origin": "border-box",
            "border-color": "#335966",
        };
    },
    tooltip: "Prismatic",
    color: "#d6ebff",
    update(delta) {

        // Auto-prismatic functionality
        if (player.pri.prismsToGet.gte(player.pri.autoPrismaticAmount) && player.pri.autoPrismaticToggle && !player.pri.autoPrismaticType && player.wel.light.gte(1e15)) {
            layers.pri.prismReset(true)
        }
        if (player.pri.autoPrismaticToggle && player.pri.autoPrismaticType) {
            player.pri.autoPrismaticTime = player.pri.autoPrismaticTime.add(delta);
            if (player.pri.autoPrismaticTime.gte(player.pri.autoPrismaticAmount) && player.wel.light.gte(1e15)) {
                player.pri.autoPrismaticTime = new Decimal(0)
                layers.pri.prismReset(true)
            }
        }

        // Set auto prismatic values
        if (player.pri.autoPrismaticInput.gte(1) && !player.pri.autoPrismaticType) player.pri.autoPrismaticAmount = player.pri.autoPrismaticInput
        if (player.pri.autoPrismaticInput.lt(1) && !player.pri.autoPrismaticType) player.pri.autoPrismaticAmount = new Decimal(1)
        if (player.pri.autoPrismaticInput.gte(0) && player.pri.autoPrismaticType) player.pri.autoPrismaticAmount = player.pri.autoPrismaticInput
        if (player.pri.autoPrismaticInput.lt(0) && player.pri.autoPrismaticType) player.pri.autoPrismaticAmount = new Decimal(1)

        let prismGainGrowth = new Decimal(1.5)
        player.pri.prismsToGet = player.wel.light.add(1).log(10).sub(15).pow_base(prismGainGrowth)
        if (!hasMilestone("prj", 202)) player.pri.prismsToGet = player.pri.prismsToGet.min(1);

        if (hasMilestone("prj", 203)) player.pri.prismsToGet = player.pri.prismsToGet.mul(2);
        player.pri.prismsToGet = player.pri.prismsToGet.mul(player.pri.fountains[8].completionEffect);
        if (player.wel.modules[3].completions.gte(1e12)) player.pri.prismsToGet = player.pri.prismsToGet.mul(player.wel.modules[4].completionEffect);
        if (hasAchievement("achievements", 1214)) player.pri.prismsToGet = player.pri.prismsToGet.mul(1.2);

        player.pri.prismsToGet = player.pri.prismsToGet.floor()

        if (player.pri.bestPrisms.lt(player.pri.prisms)) player.pri.bestPrisms = player.pri.prisms;
        
        player.pri.fountainSpeed = player.pri.totalPrisms.div(10)
        if (hasUpgrade("wel", 41)) player.pri.fountainSpeed = player.pri.fountainSpeed.mul(player.prj.projectSpeed.sub(1).div(100).add(1));

        // FOUNTAIN REQ DIVISOR
        player.pri.prismFountainReqDivisor = new Decimal(1)
        //if (hasAchievement("achievements", 1209)) player.pri.prismFountainReqDivisor = player.pri.prismFountainReqDivisor.mul(1.25);

        // FOUNTAIN PROGRESS
        player.pri.totalFountainCycles = 0
        Object.keys(layers.pri.fountains).forEach(i => {
            let module = player.pri.fountains[i]
            player.pri.totalFountainCycles += module.completions.toNumber()
            let fountain = layers.pri.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.prismReq = fountain.getprismReq()
            module.completionEffect = fountain.getCompletionEffect()

            player.pri.fountains[i].focusTimerMax = player.prj.prismFountainFocusExtension.mul(4).div(Math.pow(1.4, i - 1))
            if (player.pri.fountains[i].isFocused) {
                player.pri.fountains[i].focusTimer = player.pri.fountains[i].focusTimer.sub(delta)
                if (player.pri.prisms.gte(module.prismReq) && module.timeSpeed.gt(0)) module.time = module.time.add(module.timeSpeed.div(player.pri.totalPrisms).mul(player.pri.totalPrisms.sub(module.prismReq)).mul(delta));
                if (player.pri.fountains[i].focusTimer.lte(0) && !hasUpgrade("bum", 11)) {
                    player.pri.fountains[i].isFocused = false
                    player.pri.fountains[i].focusTimer = player.pri.fountains[i].focusTimerMax
                    player.prj.focused = player.prj.focused.sub(1)
                }
            } else {
                player.pri.fountains[i].focusTimer = player.pri.fountains[i].focusTimerMax
            }
            if (module.focused) {
                module.time = module.time.add(module.timeSpeed.mul(delta))
            }
            if (module.time.gte(module.timeReq)) {
                if (module.focused) {
                    player.prj.focused = player.prj.focused.sub(1);
                    module.focused = false
                }
                module.completions = module.completions.add(1)
                module.time = new Decimal(0)
                switch (i) {
                    case '2': case '3':
                        if (player.pri.fountains[2].completions.gt(0) && player.pri.fountains[3].completions.gt(0) && !hasAchievement("achievements", 1208)) completeAchievement("achievements", 1208);
                        break;
                    case '4': case '5': case '6':
                        if (player.pri.fountains[4].completions.gt(0) && player.pri.fountains[5].completions.gt(0) && player.pri.fountains[6].completions.gt(0) && !hasAchievement("achievements", 1209)) completeAchievement("achievements", 1209);
                        break;
                    case '7': case '8': case '9': case '10':
                        if (player.pri.fountains[7].completions.gt(0)) {
                            if (!hasAchievement("achievements", 1212)) completeAchievement("achievements", 1212);
                            if (player.pri.fountains[7].completions.gt(0) && player.pri.fountains[8].completions.gt(0) && player.pri.fountains[9].completions.gt(0) && !hasAchievement("achievements", 1214)) completeAchievement("achievements", 1214);
                        }
                        break;
                    default:
                        console.log(i)
                        break;
                }
            }
        });
        player.pri.totalFountainCycles = new Decimal(player.pri.totalFountainCycles)
    },
    /*
    player.pri.fountains[1].completions = new Decimal(0); player.pri.fountains[2].completions = new Decimal(0);
player.pri.fountains[3].completions = new Decimal(0); player.pri.fountains[4].completions = new Decimal(0);
player.pri.fountains[5].completions = new Decimal(0); player.pri.fountains[6].completions = new Decimal(0);
player.pri.fountains[7].completions = new Decimal(0); player.pri.fountains[8].completions = new Decimal(0);
player.pri.fountains[9].completions = new Decimal(0); player.pri.fountains[10].completions = new Decimal(0);
 */
    prismReset(isRewarded) {
        if (isRewarded) {
            player.pri.prisms = player.pri.prisms.add(player.pri.prismsToGet)
            player.pri.totalPrisms = player.pri.totalPrisms.add(player.pri.prismsToGet)
            if (player.pri.prismsToGet.gt(player.pri.bestPrismsInOneReset)) player.pri.bestPrismsInOneReset = player.pri.prismsToGet;
            if (!hasAchievement("achievements", 1207)) completeAchievement("achievements", 1207);
        }

        player.wel.light = new Decimal(0)
        player.wel.bestLight = new Decimal(0)

        player.wel.modules[1].time = player.wel.modules[1].maxTime
        player.wel.modules[1].timeSpeed = new Decimal(0)
        player.wel.modules[1].completions = new Decimal(0)
        player.wel.modules[2].time = player.wel.modules[2].maxTime
        player.wel.modules[2].timeSpeed = new Decimal(0)
        player.wel.modules[2].completions = new Decimal(0)
        player.wel.modules[3].time = player.wel.modules[3].maxTime
        player.wel.modules[3].timeSpeed = new Decimal(0)
        player.wel.modules[3].completions = new Decimal(0)

        player.wel.fountains[1].completions = new Decimal(0)
        player.wel.fountains[1].time = new Decimal(0)
        player.wel.fountains[1].canAddCompletion = false
        player.wel.fountains[2].completions = new Decimal(0)
        player.wel.fountains[2].time = new Decimal(0)
        player.wel.fountains[2].canAddCompletion = false
        player.wel.fountains[3].completions = new Decimal(0)
        player.wel.fountains[3].time = new Decimal(0)
        player.wel.fountains[3].canAddCompletion = false
        player.wel.fountains[4].completions = new Decimal(0)
        player.wel.fountains[4].time = new Decimal(0)
        player.wel.fountains[4].canAddCompletion = false

        if (!hasMilestone('prj', 204)) {
            if (player.wel.fountains[1].focused) {
                player.wel.fountains[1].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[1].isFocused) {
                player.wel.fountains[1].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[2].focused) {
                player.wel.fountains[2].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[2].isFocused) {
                player.wel.fountains[2].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[3].focused) {
                player.wel.fountains[3].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[3].isFocused) {
                player.wel.fountains[3].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[4].focused) {
                player.wel.fountains[4].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[4].isFocused) {
                player.wel.fountains[4].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
        }
    },
    branches: ["wel"],
    clickables: {
        1: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        2: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        3: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        4: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        5: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        6: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        7: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        8: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        9: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        10: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        11: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        12: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        13: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        14: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        15: {
            title() { return "<h3>Pour</h3>" },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && player.pri.prisms.gte(player.pri.fountains[this.id].prismReq) && !player.pri.fountains[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.pri.prisms = player.pri.prisms.sub(player.pri.fountains[this.id].prismReq)
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id].focused = true
            },
            style() {
                let look = {width: layers.pri.fountains[this.id].canAuto() ? "108px" : "219px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id].focused || player.pri.fountains[this.id].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        "prismaticReset": {
            title() { return "<h2>" + (hasMilestone("prj", 202) ? "Form your light into prisms." : "Form your light into a prism.") + "</h2><br>Req: 1e15 Light" },
            canClick() { return player.wel.light.gte(1e15)},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)"
                    look.border = "3px solid #335966"
                    look.color = "#335966"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #d6ebff"
                    look.color = "#d6ebff"
                }
                return look
            },
        },
        "prismFountains_respecFocus": {
            title() { return "<h3>Respec Focus</h3><br><small>(you won't get your prisms back! don't be silly!)</small>" },
            canClick() {
                for (let v in player.pri.fountains) {
                    if (player.pri.fountains[v].focused || player.pri.fountains[v].isFocused) return true;
                }
                return false
            },
            unlocked() { return true },
            onClick() {
                Object.keys(player.pri.fountains).forEach(i => {
                    if (player.pri.fountains[i].focused) {
                        player.pri.fountains[i].focused = false
                        player.prj.focused = player.prj.focused.sub(1)
                    }
                    if (player.pri.fountains[i].isFocused) {
                        player.pri.fountains[i].isFocused = false
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
        1001: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true

                if (player.pri.fountains[this.id - 1000].focused) {
                    player.pri.fountains[this.id - 1000].focused = false
                    player.prj.focused = player.prj.focused.sub(1)
                }
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1002: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1003: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1004: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1005: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1006: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1007: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1008: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1009: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1010: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1011: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1012: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1013: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1014: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        1015: {
            title() { return "<h3>Focus</h3>" + (hasUpgrade("bum", 11) ? "" : ("<br><small>(" + formatSimpleTime(player.pri.fountains[this.id - 1000].focusTimer, 1) + ")")) },
            canClick() { return player.prj.focused.lt(player.prj.maxFocused) && !player.pri.fountains[this.id - 1000].isFocused },
            unlocked() { return layers.pri.fountains[this.id - 1000].canAuto() },
            onClick() {
                player.prj.focused = player.prj.focused.add(1)
                player.pri.fountains[this.id - 1000].isFocused = true
            },
            style() {
                let look = {width: "108px", minHeight: "45px", borderRadius: "0px"}
                if (player.pri.fountains[this.id - 1000].isFocused) {
                    look.backgroundColor = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                } else if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #3359667f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #3359667f"
                    look.color = "white"
                }
                return look
            },
        },
        "autoPrismaticToggle": {
            title() {return player.pri.autoPrismaticToggle ? "Auto-Reset: ON" : "Auto-Reset: OFF"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.pri.autoPrismaticToggle) {
                    player.pri.autoPrismaticToggle = false
                } else {
                    player.pri.autoPrismaticToggle = true
                }
            },
            style() {
                let look = {width: "194px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "12px", border: "3px solid #0000003f", borderRadius: "0 0 7px 0"}
                if (player.pri.autoPrismaticToggle) {look.backgroundColor = "#a8ffff"} else {look.backgroundColor = "#4d9999"}
                return look
            },
        },
        "autoPrismaticAmount": {
            title() { return "Amount" },
            canClick() { return player.pri.autoPrismaticType },
            unlocked() { return true },
            onClick() {
                player.pri.autoPrismaticType = false
            },
            style() {
                let look = {width: "95.5px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "12px", border: "3px solid #0000003f", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                }
                return look
            },
        },
        "autoPrismaticTime": {
            title() { return "Time" },
            canClick() { return !player.pri.autoPrismaticType },
            unlocked() { return true },
            onClick() {
                player.pri.autoPrismaticType = true
            },
            style() {
                let look = {width: "95.5px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "12px", border: "3px solid #0000003f", borderRadius: "0 7px 0 0"}
                if (this.canClick()) {
                    look.backgroundColor = "#a8ffff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    fountains: {
        1: {
            title: "Tetrahedron",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Light, based on Light",
            condition() {
                return true
            },
            unlocked() {
                return true
            },
            canAuto() {
                return player.blu.totalBlueshifts.gte(1) && hasMilestone("prj", 301)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[1].completions.pow(0.75)

                s = player.wel.light.add(1).log10().div(4).add(1).pow(completions).log(10).add(1).pow(0.5).sub(1).pow_base(10).sub(1).mul(3).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[1].completions
                let s = completions.div(8).add(1).pow(4)

                s = s.mul(completions.sub(20).max(0).pow_base(1.25))
                s = s.pow(1.0625).mul(10)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[1].completions
                let s = completions.div(8).add(1).pow(4)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.25))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        2: {
            title: "Spiral",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Light Well ↻",
            condition() {
                return player.pri.fountains[1].completions.gt(0)
            },
            unlocked() {
                return true
            },
            canAuto() {
                return player.blu.totalBlueshifts.gte(2) && hasMilestone("prj", 301)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[2].completions

                s = completions.add(1)
                if (hasMilestone("prj", 203)) s = s.pow(1.5);

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[2].completions
                let s = completions.div(8).add(1).pow(3)

                s = s.mul(completions.sub(20).max(0).pow_base(1.1))
                s = s.pow(1.0625).mul(12)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[2].completions
                let s = completions.div(8).add(1).pow(3)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.1))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        3: {
            title: "Arrow",
            completionEffectPrefix: "/",
            completionEffectSuffix: " Light Fountain Req",
            condition() {
                return player.pri.fountains[1].completions.gt(0)
            },
            unlocked() {
                return true
            },
            canAuto() {
                return player.blu.totalBlueshifts.gte(3) && hasMilestone("prj", 301)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[3].completions

                s = completions.add(1).pow(2)
                if (hasMilestone("prj", 203)) s = s.pow(1.5)

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[3].completions
                let s = completions.div(8).add(1).pow(3)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.1))
                s = s.pow(1.0625).mul(12)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[3].completions
                let s = completions.div(8).add(1).pow(3)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.1))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        4: {
            title: "Octahedron",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Light, based on Prisms",
            condition() {
                return player.pri.fountains[1].completions.gte(8)
            },
            unlocked() {
                return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0)
            },
            canAuto() {
                return player.blu.totalBlueshifts.gte(4) && hasMilestone("prj", 301)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[4].completions.pow(0.75)

                s = player.pri.prisms.add(1).log10().div(4).add(1).pow(completions).log(10).add(1).pow(0.5).sub(1).pow_base(10).sub(1).mul(8).add(1).pow(2)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[4].completions
                let s = completions.div(4).add(1).pow(5)

                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(120)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[4].completions
                let s = completions.div(4).add(1).pow(5)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.mul(8)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        5: {
            title: "Cone",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Light Well Speed",
            condition() {
                return player.pri.bestPrismsInOneReset.gte(100)
            },
            unlocked() {
                return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0)
            },
            canAuto() {
                return player.blu.totalBlueshifts.gte(5) && hasMilestone("prj", 301)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[5].completions

                s = completions.pow(0.75).pow_base(1.5).sub(1).div(2).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[5].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(1.5))
                s = s.mul(completions.sub(20).max(0).pow_base(1.25))
                s = s.pow(1.0625).mul(1e3)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[5].completions
                let s = completions.pow_base(1.5).mul(50)
                s = s.mul(completions.sub(20).max(0).pow_base(1.25))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        6: {
            title: "Hourglass",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Stored Time Capsules",
            condition() {
                return player.pri.fountains[2].completions.gte(10) && player.pri.fountains[3].completions.gte(10)
            },
            unlocked() {
                return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0)
            },
            canAuto() {
                return player.blu.totalBlueshifts.gte(6) && hasMilestone("prj", 301)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[6].completions

                s = completions.pow(0.8).pow_base(1.2).sub(1).mul(2.5).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[6].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(2))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(2.4e3)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[6].completions
                let s = completions.pow_base(2).mul(50)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        7: {
            title: "Dodecahedron",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Light, based on well ↻",
            condition() {
                return player.pri.fountains[4].completions.gte(20)
            },
            unlocked() {
                return (player.pri.fountains[4].completions.gt(0) || player.pri.fountains[5].completions.gt(0) || player.pri.fountains[6].completions.gt(0)) && hasMilestone("prj", 302)
            },
            canAuto() {
                return player.blu.totalBlueshifts.gte(7) && hasMilestone("prj", 301)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[7].completions.pow(0.75)

                s = player.wel.wellCycleProduct.log10().div(36).pow(8).add(1).pow(completions).log(10).add(1).pow(0.5).sub(1).pow_base(10).pow(2)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[7].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(completions))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                s = s.pow(1.0625).mul(4.8e8)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[7].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(completions))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                
                s = s.mul(1.2e7)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        8: {
            title: "Lense",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Prisms",
            condition() {
                return player.pri.bestPrismsInOneReset.gte(1e6)
            },
            unlocked() {
                return (player.pri.fountains[4].completions.gt(0) || player.pri.fountains[5].completions.gt(0) || player.pri.fountains[6].completions.gt(0)) && hasMilestone("prj", 302)
            },
            canAuto() {
                return player.blu.totalBlueshifts.gte(8) && hasMilestone("prj", 301)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[8].completions

                let s = completions.add(1).mul(completions).div(2).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[8].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(3))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                s = s.pow(1.0625).mul(4e7)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[8].completions
                let s = completions.pow_base(3).mul(1e6)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        9: {
            title: "Pentagon",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Project Speed",
            condition() {
                return player.prj.bestProjectSpeed.gte(400)
            },
            unlocked() {
                return (player.pri.fountains[4].completions.gt(0) || player.pri.fountains[5].completions.gt(0) || player.pri.fountains[6].completions.gt(0)) && hasMilestone("prj", 302)
            },
            canAuto() {
                return player.blu.totalBlueshifts.gte(9) && hasMilestone("prj", 301)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[9].completions

                s = completions.div(4).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[9].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(5))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1e9)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[9].completions
                let s = completions.pow_base(5).mul(1e7)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        10: {
            title: "Cube",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Light",
            condition() {
                return player.wel.light.gte(1e100)
            },
            unlocked() {
                return (player.pri.fountains[7].completions.gt(0) || player.pri.fountains[8].completions.gt(0) || player.pri.fountains[9].completions.gt(0)) && hasMilestone("prj", 403)
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[10].completions

                s = completions.pow(0.75).pow_base(4)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[10].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1.4e13)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[10].completions
                let s = completions.pow_base(4).mul(1e11)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        11: {
            title: "Star",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Starlight",
            condition() {
                return player.bum.starshines.gte(100)
            },
            unlocked() {
                return (player.pri.fountains[7].completions.gt(0) || player.pri.fountains[8].completions.gt(0) || player.pri.fountains[9].completions.gt(0)) && hasMilestone("prj", 403)
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[11].completions

                s = completions.pow(0.75).pow_base(1.25)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[11].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1.4e13)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[11].completions
                let s = completions.pow_base(4).mul(1e11)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        12: {
            title: "Gear",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Study Speed",
            condition() {
                return player.prj.bestProjectSpeed.gte(1e4)
            },
            unlocked() {
                return (player.pri.fountains[7].completions.gt(0) || player.pri.fountains[8].completions.gt(0) || player.pri.fountains[9].completions.gt(0)) && hasMilestone("prj", 403)
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[12].completions

                s = completions.pow(0.75).pow_base(1.25)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[12].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1.4e13)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[12].completions
                let s = completions.pow_base(4).mul(1e11)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        13: {
            title: "Mirror",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Prism Well ↻",
            condition() {
                return player.pri.prisms.gte(1e30)
            },
            unlocked() {
                return (player.pri.fountains[10].completions.gt(0) || player.pri.fountains[11].completions.gt(0) || player.pri.fountains[12].completions.gt(0)) && hasMilestone("prj", 407)
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[13].completions

                let s = completions.pow(1.5).add(1).mul(completions.pow(0.9).pow_base(1.05))

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[13].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1.4e13)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[13].completions
                let s = completions.pow_base(4).mul(1e11)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        14: {
            title: "Bulb",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Prism Well Speed",
            condition() {
                return player.pri.fountains[10].completions.gte(20)
            },
            unlocked() {
                return (player.pri.fountains[10].completions.gt(0) || player.pri.fountains[11].completions.gt(0) || player.pri.fountains[12].completions.gt(0)) && hasMilestone("prj", 407)
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[14].completions

                let s = completions.div(4).add(1)

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[14].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1.4e13)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[14].completions
                let s = completions.pow_base(4).mul(1e11)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        15: {
            title: "Ring",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Effective Pyramid Fountain ↻",
            condition() {
                return false
            },
            unlocked() {
                return (player.pri.fountains[13].completions.gt(0) || player.pri.fountains[14].completions.gt(0)) && hasMilestone("prj", 409)
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[15].completions

                let s = completions.div(4).add(1)

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[15].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1.4e13)

                return s
            },
            getprismReq() {
                let completions = player.pri.fountains[15].completions
                let s = completions.pow_base(4).mul(1e11)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
    },
    microtabs: {
        stuff: {
            "Pyramid": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["style-column", [
                            ["blank", "15px"],
                            ["raw-html", "You are gaining <h3>" + format(player.pri.fountainSpeed, 1) + "</h3> fountain progress /s.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["raw-html", "<small>Total prisms give a base progress rate of " + format(player.pri.totalPrisms.div(10), 1) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["blank", "25px"],
                            ["raw-html", "You are using " + formatWhole(player.prj.focused) + "/" + formatWhole(player.prj.maxFocused) + " focus.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["style-column", [
                                ["raw-html", "<small>Fountain requirements are reduced by /" + formatSimple(player.pri.prismFountainReqDivisor, 2) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {display: player.pri.prismFountainReqDivisor.gt(1) ? "" : "none !important"}],
                            ["style-column", [
                                ["tooltip-row", [
                                    ["raw-html", "<small>Base fountain focus duration is " + formatSimpleTime(player.prj.prismFountainFocusExtension.mul(4), 1) + ", reduced for each consecutive fountain.</small>", {color: "#dfffdf", fontSize: "18px", fontFamily: "monospace"}],
                                    ["raw-html", "<div class='bottomTooltip'>4 * (Project Speed / 100)<sup>0.75</div>"],
                                ], {}],
                            ], {display: hasMilestone("prj", 301) && !hasUpgrade("bum", 11) ? "" : "none !important"}],
                            ["blank", "16px"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "13px 13px 0 0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                            ], {width: "0", height: "0"}],
                            makePrismFountain(1, false)
                        ]],
                        ["blank", "6px", {width: "6px"}],
                        ["style-row", [
                        ]],
                        ["blank", "6px", {width: "6px"}],
                        ["style-row", [
                        ]],
                        ["blank", "6px", {width: "6px"}],
                        ["style-row", [
                        ]],
                        ["blank", "6px", {width: "6px"}],
                        ["style-row", [
                        ]],
                        ["blank", "6px", {width: "6px"}],
                        ["style-row", [
                        ]],
                        ["blank", "6px", {width: "6px"}],
                        ["style-row", [
                        ]],
                        ["blank", "25px", {width: "6px"}],
                        ["clickable", "prismFountains_respecFocus"],
                    ]

                    // Spiral
                    if (layers.pri.fountains[2].unlocked()) {
                            look[3][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "16px 0 0 0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[2].condition()) {
                            look[3][1].push(makePrismFountain(2, true))
                        } else {
                            look[3][1].push(
                                ["style-column", [
                                    ["raw-html", "Spiral<br><small>Req: 1 Tetrahedron ↻</small>", {color: "white", fontSize: "16px"}],
                                ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    // Arrow
                    if (layers.pri.fountains[3].unlocked()) {
                        look[3][1].push(["blank", "6px", {width: "6px"}])
                            look[3][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0 13px 0 0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[3].condition()) {
                            look[3][1].push(makePrismFountain(3, true))
                        } else {
                            look[3][1].push(
                                ["style-column", [
                                    ["raw-html", "Arrow<br><small>Req: 1 Tetrahedron ↻</small>", {color: "white", fontSize: "16px"}],
                                ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    // Octahedron
                    if (layers.pri.fountains[4].unlocked()) {
                            look[5][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "13px 0 0 0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[4].condition()) {
                            look[5][1].push(makePrismFountain(4, false))
                        } else {
                            look[5][1].push(
                                ["style-column", [
                                    ["raw-html", "Octahedron<br><small>Req: 8 Tetrahedron ↻</small>", {color: "white", fontSize: "16px"}],
                                ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    // Cone
                    if (layers.pri.fountains[5].unlocked()) {
                        look[5][1].push(["blank", "6px", {width: "6px"}])
                            look[5][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[5].condition()) {
                            look[5][1].push(makePrismFountain(5, false))
                        } else {
                            look[5][1].push(
                                ["style-column", [
                                    ["raw-html", "Cone<br><small>Req: +100 Prisms in one reset</small>", {color: "white", fontSize: "16px"}],
                                ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    // hourglass
                    if (layers.pri.fountains[6].unlocked()) {
                        look[5][1].push(["blank", "6px", {width: "6px"}])
                            look[5][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0 13px 0 0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[6].condition()) {
                            look[5][1].push(makePrismFountain(6, false))
                        } else {
                            look[5][1].push(
                            ["style-column", [
                                ["raw-html", "Hourglass<br><small>Req: 10 Spiral ↻ and 10 Arrow ↻</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    // dodecahedron
                    if (layers.pri.fountains[7].unlocked()) {
                            look[7][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[7].condition()) {
                            look[7][1].push(makePrismFountain(7, false))
                        } else {
                            look[7][1].push(
                            ["style-column", [
                                ["raw-html", "Dodecahedron<br><small>Req: 20 Octahedron ↻</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }
                    // lense
                    if (layers.pri.fountains[8].unlocked()) {
                        look[7][1].push(["blank", "6px", {width: "6px"}])
                            look[7][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[8].condition()) {
                            look[7][1].push(makePrismFountain(8, false))
                        } else {
                            look[7][1].push(
                            ["style-column", [
                                ["raw-html", "Lense<br><small>Req: +1,000,000 Prisms in one reset</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    // pentagon
                    if (layers.pri.fountains[9].unlocked()) {
                        look[7][1].push(["blank", "6px", {width: "6px"}])
                            look[7][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[9].condition()) {
                            look[7][1].push(makePrismFountain(9, false))
                        } else {
                            look[7][1].push(
                            ["style-column", [
                                ["raw-html", "Pentagon<br><small>Req: 400 Project Speed</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    // cube
                    if (layers.pri.fountains[10].unlocked()) {
                        look[9][1].push(["blank", "6px", {width: "6px"}])
                            look[9][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[10].condition()) {
                            look[9][1].push(makePrismFountain(10, false))
                        } else {
                            look[9][1].push(
                            ["style-column", [
                                ["raw-html", "Cube<br><small>Req: 1e100 Light</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }
                    // star
                    if (layers.pri.fountains[11].unlocked()) {
                        look[9][1].push(["blank", "6px", {width: "6px"}])
                            look[9][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[11].condition()) {
                            look[9][1].push(makePrismFountain(11, false))
                        } else {
                            look[9][1].push(
                            ["style-column", [
                                ["raw-html", "Star<br><small>Req: 100 times Starshined</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }
                    // gear
                    if (layers.pri.fountains[12].unlocked()) {
                        look[9][1].push(["blank", "6px", {width: "6px"}])
                            look[9][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[12].condition()) {
                            look[9][1].push(makePrismFountain(12, false))
                        } else {
                            look[9][1].push(
                            ["style-column", [
                                ["raw-html", "Gear<br><small>Req: 10,000 Project Speed</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    // mirror
                    if (layers.pri.fountains[13].unlocked()) {
                        look[11][1].push(["blank", "6px", {width: "6px"}])
                            look[11][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[13].condition()) {
                            look[11][1].push(makePrismFountain(13, false))
                        } else {
                            look[11][1].push(
                            ["style-column", [
                                ["raw-html", "Mirror<br><small>Req: 1e30 Prisms</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }
                    // bulb
                    if (layers.pri.fountains[14].unlocked()) {
                        look[11][1].push(["blank", "6px", {width: "6px"}])
                            look[11][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[14].condition()) {
                            look[11][1].push(makePrismFountain(14, false))
                        } else {
                            look[11][1].push(
                            ["style-column", [
                                ["raw-html", "Bulb<br><small>Req: 20 Cube ↻</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    // ring
                    if (layers.pri.fountains[15].unlocked()) {
                        look[13][1].push(["blank", "6px", {width: "6px"}])
                            look[13][1].push(
                                ["style-column", [
                                    ["style-column", [], {background: "#d6ebff", border: "3px solid #d6ebff", borderRadius: "0", borderRight: "0", width: "271px", height: "225px", marginLeft: "-6px"}],
                                ], {width: "0", height: "0"}],
                            )
                        if (layers.pri.fountains[15].condition()) {
                            look[13][1].push(makePrismFountain(15, false))
                        } else {
                            look[13][1].push(
                            ["style-column", [
                                ["raw-html", "Ring<br><small>Req: ???</small>", {color: "white", fontSize: "16px"}],
                            ], {background: "black", border: "3px solid #663737", width: "256px", height: "216px", borderRadius: "10px", lineHeight: "1"}],
                            )
                        }
                    }

                    return look
                }
            },
            "Greenhouse": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return hasMilestone("prj", 206) },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["raw-html", 
                        "COMING SOON..."
                        , {color: "#dfffdf", fontSize: "32px", fontFamily: "monospace"}],
                    ]
                    return look
                }
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + formatWhole(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["style-row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.pri.prisms) + "</h3> prisms." }, {color: "#d6ebff", fontSize: "24px", fontFamily: "monospace"}],
            ["style-row", [
                ["raw-html", () => {return "(+" + formatWhole(player.pri.prismsToGet) + ")"}, () => {
                    let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                    if (player.pri.prismsToGet.gte(1)) {look.color = "#d6ebff"} else {look.color = "gray"}
                    return look
                }],
            ], () => {return {display: hasMilestone("prj", 202) ? "" : "none !important"}}],
        ]],
        ["raw-html", () => {return "(" + formatSimple(player.pri.totalPrisms) + " total)"}, {color: "#d6ebff", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "15px"],
        ["style-row", [
            ["clickable", "prismaticReset"],
            ["style-row", [
                ["blank", "3px", {width: "6px"}],
                ["style-row", [
                    ["style-column", [
                        ["blank", "8px"],
                        ["style-column", [
                            ["raw-html", () => {return player.pri.autoPrismaticType ? "Auto-Reset Time" : "Auto-Reset Amount"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "200px", height: "25px"}],
                        ["blank", "8px"],
                        ["style-column", [
                            ["raw-html", () => {return player.pri.autoPrismaticType ? formatTime(player.pri.autoPrismaticTime) + "/" + formatTime(player.pri.autoPrismaticAmount) : "+" + formatWhole(player.pri.autoPrismaticAmount) + " Prisms"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "197px", height: "25px", background: "#4d9999", marginLeft: "3px", borderRadius: "10px 10px 0 0"}],
                        ["blank", "3px"],
                        ["text-input", "autoPrismaticInput", {width: "197px", height: "25px", marginLeft: "3px", backgroundColor: "#1a2d33", color: "white", fontSize: "16px", textAlign: "center", border: "0px", borderRadius: "0 0 0 7px", padding: "0px 0px"}],
                    ], {width: "200px", height: "100px"}],
                    ["style-column", [
                        ["row", [["clickable", "autoPrismaticAmount"], ["blank", "3px", {width: "3px"}], ["clickable", "autoPrismaticTime"]]],
                        ["blank", "3px"],
                        ["clickable", "autoPrismaticToggle"],
                    ], {width: "200px", height: "100px"}],
                ], {width: "400px", height: "100px", backgroundColor: "#335966", borderRadius: "10px"}],
            ], () => {return {display: hasMilestone("prj", 206) && false ? "" : "none !important"}}],
        ]],
        ["blank", "15px"],
        ["style-column", [
            ["microtabs", "stuff", { 'border-width': '0px' }],
        ], () => {
            return {display: player.pri.bestPrisms.gt(0) ? "" : "none !important"}
        }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 201)},
    hotkeys: [
        {
            key: "p", 
            description: "Prismatic",
            onPress() {
                clickClickable(this.layer, "lightWell1_blueshift")
            },
        },
    ]
})
const makePrismFountain = function (id, effectIsWhole) {
    let thisFountain =
        ["style-row", [
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                            ], {background: "#d6ebff", borderRadius: "0", width: "25px", height: (format(player.pri.fountains[id].time.div(player.pri.fountains[id].timeReq).min(1).max(0).mul(207))) + "px", marginTop: (format(new Decimal(207).sub(player.pri.fountains[id].time.div(player.pri.fountains[id].timeReq).min(1).max(0).mul(207)))) + "px"}],
                        ], {background: "#0b1417", borderRadius: "10px 0 0 10px", width: "31px", height: "207px"}],
                    ], {width: "31px", height: "0"}],
                    ["style-column", [
                        ["style-column", [
                        ], {border: "3px solid #4d9999", borderRadius: "10px 0 0 10px", width: "25px", height: "207px"}],
                    ], {width: "31px", height: "0"}],
                ], {background: "#4d9999", borderRadius: "10px 0 0 10px", width: "31px", height: "213px"}],
            ], {background: "#335966", border: "3px solid #335966", borderRadius: "10px 0 0 10px", borderRight: "0", width: "31px", height: "213px"}],
            ["style-column", [
                ["style-column", [
                    ["blank", "10px"],
                    ["raw-html", layers.pri.fountains[id].title, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", player.pri.fountains[id].timeSpeed.lte(0) ? "<span style='color:#ff7f7f;font-size:14px'>Can't Complete w/o Prisms!</span>" : (player.pri.fountains[id].focused ? formatTime(player.pri.fountains[id].timeReq.sub(player.pri.fountains[id].time).div(player.pri.fountains[id].timeSpeed)) : formatTime(player.pri.fountains[id].timeReq.div(player.pri.fountains[id].timeSpeed).mul(player.pri.fountains[id].time.div(player.pri.fountains[id].timeReq).neg().add(1)))) + " CD", {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", "<small>(" + format(player.pri.fountains[id].time, 1) + "/" + format(player.pri.fountains[id].timeReq, 1) + ")</small>", {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", player.pri.fountains[id].prismReq.eq(0) ? "Your first cycle is free!" : "-" + formatWhole(player.pri.fountains[id].prismReq) + " Prisms", {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                    ], {background: "#4d9999", borderRadius: "0 10px 0px 0px", width: "219px", height:"25px"}],
                    ["blank", "3px"],
                    ["style-row", [
                        ["hoverless-clickable", id],
                        ["style-row", [
                            ["blank", "3px", {width: "3px"}],
                        ], {display: layers.pri.fountains[id].canAuto() ? "" : "none !important"}],
                        ["hoverless-clickable", id + 1000],
                    ], {height: "45px"}]
                ], {background: "#335966", border: "3px solid #335966", borderRadius: "0 10px 0px 0px", width: "219px", height: "150px"}],
                ["style-column", [
                    ["style-column", [
                        ["raw-html", formatWhole(player.pri.fountains[id].completions) + " ↻<br><small>(" + layers.pri.fountains[id].completionEffectPrefix + (effectIsWhole ? formatSimple(layers.pri.fountains[id].getCompletionEffect(), 2) : formatSimple(layers.pri.fountains[id].getCompletionEffect(), 2)) + layers.pri.fountains[id].completionEffectSuffix + ")</small>", {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                    ], {background: "#335966", border: "3px solid #4d9999", borderRadius: "0px 0px 7px 0px", width: "216px", height: "54px"}],
                ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "0px 0px 10px 0px", borderTop: "0px", borderLeft: "0px", height: "60px"}],
            ], {width: "225px"}]
        ]]
    return thisFountain
}