addLayer("prj", {
    name: "Projects",
    symbol: "PJ",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
        milestonePopups: false,

        storedTimeCapsules: new Decimal(0),
        storedTimeCapsuleEffect: new Decimal(0),

        totalProjectLevels: new Decimal(0),
        projectSpeed: new Decimal(1),

        maxFocused: new Decimal(1),
        focused: new Decimal(0),
        
        modules: {
            1: {
                time: new Decimal(0),
                timeReq: new Decimal(120),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                timeCapsuleReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
            2: {
                time: new Decimal(0),
                timeReq: new Decimal(3600),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),

                focused: false,
                timeCapsuleReq: new Decimal(1),
                completionEffect: new Decimal(1),
            },
        },

        milestone105Effect: new Decimal(1),
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
        player.prj.totalProjectLevels = player.prj.modules[1].completions

        player.prj.projectSpeed = new Decimal(1)
        player.prj.projectSpeed = player.prj.projectSpeed.mul(levelableEffect("pu", 307)[1])
        player.prj.projectSpeed = player.prj.projectSpeed.mul(player.prj.storedTimeCapsuleEffect)

        player.prj.storedTimeCapsuleEffect = player.prj.storedTimeCapsules.add(1).log(10).add(1).pow(0.5).sub(1).pow_base(10).pow(2).sub(1).div(10).add(1)

        // PROJECT PROGRESS
        Object.keys(layers.prj.projects).forEach(i => {
            let module = player.prj.modules[i]
            let project = layers.prj.projects[i]
            module.timeSpeed = project.getTimeSpeed()
            module.timeReq = project.getTimeReq()
            module.timeCapsuleReq = project.getTimeCapsuleReq()

            if (module.focused) {
                module.time = module.time.add(module.timeSpeed.mul(delta))
                if (module.time.gte(module.timeReq)) {
                    module.focused = false
                    module.completions = module.completions.add(1)
                    module.time = new Decimal(0)
                }
            }
        });

        // MILESTONE EFFECTS

        player.prj.milestone105Effect = player.prj.projectSpeed.pow(0.25).mul(player.prj.projectSpeed.log10()).add(1)
    },
    branches: ["wel"],
    clickables: {
        1: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.storedTimeCapsules.gte(player.prj.modules[this.id].timeCapsuleReq) && !player.prj.modules[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.prj.storedTimeCapsules = player.prj.storedTimeCapsules.sub(player.prj.modules[this.id].timeCapsuleReq)
                player.prj.modules[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffa8d3"
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
        2: {
            title() { return "<h3>Focus</h3>" },
            canClick() { return player.prj.storedTimeCapsules.gte(player.prj.modules[this.id].timeCapsuleReq) && !player.prj.modules[this.id].focused},
            unlocked() { return true },
            onClick() {
                player.prj.storedTimeCapsules = player.prj.storedTimeCapsules.sub(player.prj.modules[this.id].timeCapsuleReq)
                player.prj.modules[this.id].focused = true
            },
            style() {
                let look = {width: "238px", minHeight: "45px", borderRadius: "0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffa8d3"
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
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {
        // TIME CAPSULES
        101: {
            onComplete() {
                doPopup("none", "Time Capsules<br>is now level " + formatWhole(player.prj.modules[1].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock time capsules.</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock more light buyables.</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock more punchcards and another punchcard choice slot.</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock the ability to extend eclipse duration with stored time capsules.</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Project progress gain boosts light well speed. (x" + format(player.prj.milestone105Effect) + ")</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock more time energy buyables.</small>" },
            cycleReq() { return new Decimal(6) },
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
        107: {
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock a permanent booster milestone.</small>" },
            cycleReq() { return new Decimal(7) },
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
        108: {
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock extra time capsules.</small>" },
            cycleReq() { return new Decimal(8) },
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
        109: {
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>/2 to the eclipse timer tickspeed.</small>" },
            cycleReq() { return new Decimal(9) },
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
        110: {
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock an epic punchcard.</small>" },
            cycleReq() { return new Decimal(10) },
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
        // PRISMATIC
        201: {
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock the prismatic reset and double light gain.</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>???</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>???</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>???</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock the third row of light upgrades.</small>" },
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
            onComplete() {
                doPopup("none", "Prismatic<br>is now level " + formatWhole(player.prj.modules[2].completions) + "!", "Project Level-Up!", 5, "#dfffdf")
            },
            effectDescription() { return "<small>Unlock even more light buyables.</small>" },
            cycleReq() { return new Decimal(6) },
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
    },
    challenges: {},
    infoboxes: {},
    projects: {
        1: {
            title: "Time Capsules",
            completionEffectStat: "Starmetal Alloy",
            getCompletionEffect() {
                let completions = player.prj.modules[1].completions

                s = completions.pow(0.85).pow_base(1.15)

                return s
            },
            getTimeReq() {
                let completions = player.prj.modules[1].completions
                let s = new Decimal(120)

                s = s.mul(completions.add(1).pow(2))
                if (completions.gte(5)) {
                    s = s.mul(4)
                }

                return s
            },
            getTimeCapsuleReq() {
                let completions = player.prj.modules[1].completions
                let s = completions
                
                if (completions.gte(5)) {
                    s = s.add(completions.sub(5).pow(2)).mul(2)
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)

                return s
            },
            milestones: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
        },
        2: {
            title: "Prismatic",
            completionEffectStat: "Core Fragment Scores",
            getCompletionEffect() {
                let completions = player.prj.modules[2].completions

                s = completions.pow(0.85).pow_base(1.25)

                return s
            },
            getTimeReq() {
                let completions = player.prj.modules[2].completions
                let s = new Decimal(3600)

                s = s.mul(completions.add(1).mul(completions).div(2).add(1))
                if (completions.gte(5)) {
                    s = s.mul(6)
                }

                return s
            },
            getTimeCapsuleReq() {
                let completions = player.prj.modules[2].completions
                let s = completions.add(1).pow(1.5).mul(3)
                
                if (completions.gte(5)) {
                    s = s.add(completions.sub(5).pow(1.25)).mul(10)
                }

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.prj.projectSpeed)

                return s
            },
            milestones: [201, 202, 203, 204, 205, 206,]// 207, 208, 209, 210],
        }
        // 3: x(1.2^n) Starmetal XP Value
        // 4: x(2^n) Plasma
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
                        ["raw-html", "Boosts project speed by x" + format(player.prj.storedTimeCapsuleEffect), {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["raw-html", "You are gaining <h3>" + format(player.prj.projectSpeed) + "</h3> project progress /s.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "You are focusing on 0/1 projects.", {color: "#ccc", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["style-row", [
                            makeProject(1),
                            ["blank", "6px", {width: "6px"}],
                            hasUpgrade("wel", 23) ? makeProject(2) : null,
                        ]],
                    ["blank", "25px"]]
                    return look
                },
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("wel", 21)}
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
                    ], {background: "#994d86", borderRadius: "10px 10px 0px 0px", width: "238px", height:"25px"}],
                    ["blank", "3px"],
                    ["clickable", id],
                ], {background: "#663366", border: "3px solid #663366", borderRadius: "16px 0px 0px 0px", width: "238px", height: "150px"}],
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", player.prj.modules[id].time.gte(player.prj.modules[id].timeReq) ? "0%" : formatShortestWhole(player.prj.modules[id].time.div(player.prj.modules[id].timeReq).min(1).max(0).mul(100)) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ], {background: "#994d86", border: "3px solid #663366", borderRadius: "100px", width: "75px", height:"75px"}]
                        ], {borderRadius: "50%", width: "125px", height:"125px", border: "3px solid #663366", margin: "-3px", marginTop: "75px",
                            background: player.prj.modules[id].time.lt(player.prj.modules[id].timeReq) ?
                            "conic-gradient(#dfffdf " + (player.prj.modules[id].time.div(player.prj.modules[id].timeReq)).min(1).max(0) * 360 + "deg, #1a001a 0deg)" : "#1a001a"
                        }],
                    ], {background: "#663366", borderRadius: "0px 81px 0px 0px", width: "153px", height: "78px"}],
                    ["style-column", [], {background: "#994d86", height: "78px"}],
                ], {border: "3px solid #663366", borderBottom: "0px", borderLeft: "0px", borderRadius: "0px 81px 0px 0px", padding: "-3px", width: "153px", height: "153px"}],
            ], {verticalAlign: "bottom"}],
            ["style-row", [
                ["style-column", [
                    ["raw-html", formatWhole(player.prj.modules[id].completions) + " ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "75px"}],
                ["style-column", [], {width: "3px", height: "46px"}],
                ["style-column", [
                    ["raw-html", "<small>(x" + format(layers.prj.projects[id].getCompletionEffect()) + " " + layers.prj.projects[id].completionEffectStat + ")</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "292px", marginRight: "14px"}],
            ], {background: "#994d86", border: "3px solid #663366", borderTop: "0px", height: "25px"}],
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