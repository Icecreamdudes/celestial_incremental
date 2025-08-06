addLayer("hrm", {
    name: "Hex of Realms",
    symbol: "Re", // Decides what text appears on the node.
    tooltip: "Realms", // Decides the nodes tooltip
    color: "white", // Decides the nodes color.
    nodeStyle: {color: "#ccc", background: "linear-gradient(180deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)", borderColor: "#0061ff"}, // Decides the nodes style, in CSS format.
    branches: ["hpw"], // Decides the nodes branches.
    startData() { return {
        realmCompletions: new Decimal(0),
        realmEffect: new Decimal(1),
        blessLimit: new Decimal(0),

        realmEssence: new Decimal(0),
        realmEssenceGain: new Decimal(0),
        realmEssenceEffect: [
            [new Decimal(1), new Decimal(1)],
            [new Decimal(1), new Decimal(1)],
            [new Decimal(1), new Decimal(1)],
            [new Decimal(1), new Decimal(1)],
            [new Decimal(1), new Decimal(1)],
            [new Decimal(1), new Decimal(1)]
        ],
    }},
    update(delta) {
        player.hrm.realmCompletions = new Decimal(0)
        for (let i in player.hrm.challenges) {
            player.hrm.realmCompletions = player.hrm.realmCompletions.add(challengeCompletions("hrm", i))
        }

        player.hrm.realmEffect = Decimal.pow(1.5, player.hrm.realmCompletions)

        player.hrm.realmEssenceGain = player.hrm.realmCompletions.pow(2).div(6)
        player.hrm.realmEssenceGain = player.hrm.realmEssenceGain.mul(player.le.punchcardsPassiveEffect[9])

        for (let i = 0; i < 6; i++) {
            player.hrm.realmEssenceEffect[i] = [new Decimal(1), new Decimal(1)]
        }

        if (player.hrm.realmEssence.gte(6)) {
            player.hrm.realmEssenceEffect[0][0] = player.hrm.realmEssence.log(6).add(1).mul(1.5)
            player.hrm.realmEssenceEffect[0][1] = player.hrm.realmEssence.log(6).mul(0.12).add(1)
        }
        if (player.hrm.realmEssence.gte(36)) {
            player.hrm.realmEssenceEffect[1][0] = Decimal.pow(3, player.hrm.realmEssence.log(6).sub(1).pow(0.9))
            player.hrm.realmEssenceEffect[1][1] = Decimal.pow(2, player.hrm.realmEssence.log(6).pow(0.9))
        }
        if (player.hrm.realmEssence.gte(216)) {
            player.hrm.realmEssenceEffect[2][0] = Decimal.pow(6, player.hrm.realmEssence.log(6).sub(2).pow(0.9))
            player.hrm.realmEssenceEffect[2][1] = player.hrm.realmEssence.log(6).sub(1).mul(0.03).add(1)
        }
        if (player.hrm.realmEssence.gte(1296)) {
            player.hrm.realmEssenceEffect[3][0] = player.hrm.realmEssence.log(6).sub(1).mul(0.5)
            player.hrm.realmEssenceEffect[3][1] = Decimal.pow(6, player.hrm.realmEssence.log(6).sub(3).pow(0.9))
        }
        if (player.hrm.realmEssence.gte(7776)) {
            player.hrm.realmEssenceEffect[4][0] = Decimal.pow(3, player.hrm.realmEssence.log(6).sub(4).pow(0.9))
            player.hrm.realmEssenceEffect[4][1] = player.hrm.realmEssence.log(6).sub(3).mul(0.06).add(1)
        }
        if (player.hrm.realmEssence.gte(46656)) {
            player.hrm.realmEssenceEffect[5][0] = player.hrm.realmEssence.log(6).sub(5).mul(0.12).add(1)
            player.hrm.realmEssenceEffect[5][1] = Decimal.pow(2, player.hrm.realmEssence.log(6).sub(5).pow(0.9))
        }
    },
    challenges: {
        11: {
            name() { return "Creator Realm (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit + ")"},
            completionLimit: 3,
            marked: false,
            fullDisplay() {
                let str = "<h4>You can only reset blessing 6 times. Amended Automation is also locked.</h4>"
                if (challengeCompletions(this.layer, this.id) == 0) str = str.concat("<br>Goal: 10,000 Blessings")
                if (challengeCompletions(this.layer, this.id) == 1) str = str.concat("<br>Goal: 100,000 Blessings")
                if (challengeCompletions(this.layer, this.id) == 2) str = str.concat("<br>Goal: 1,000,000 Blessings")
                if (challengeCompletions(this.layer, this.id) > 2) str = str.concat("<br><p style='color:#4c4'>COMPLETED</p>")
                return str
            },
            canComplete() {
                if (challengeCompletions(this.layer, this.id) == 0) return player.hbl.blessings.gte(1e4)
                if (challengeCompletions(this.layer, this.id) == 1) return player.hbl.blessings.gte(1e5)
                if (challengeCompletions(this.layer, this.id) == 2) return player.hbl.blessings.gte(1e6)
                return player.hbl.blessings.gte(1e7)
            },
            unlocked() { return hasUpgrade("hpw", 1001) || challengeCompletions(this.layer, this.id) > 0 },
            canClick() { return hasUpgrade("hpw", 1001) },
            onEnter() {
                layers.hpw.powerReset(1)
            },
            onExit() {
                layers.hpw.powerReset(1)
            },
            style: {width: '250px', height: '184px', backgroundColor: "#c44", border: "6px solid #800", borderRadius: "13px"},
            buttonStyle() {
                let look = {height: "40px", marginTop: "5px", marginBottom: "5px", borderRadius: "20px"}
                if (this.canComplete() && inChallenge(this.layer, this.id)) look.border = "4px solid #77bf5f"
                if (!this.canClick()) look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        12: {
            name() { return "Higher Plane (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit + ")"},
            completionLimit: 3,
            marked: false,
            fullDisplay() {
                let str = "<h4>Blessing and curse features are nerfed. Purity features are heavily buffed.</h4>"
                if (challengeCompletions(this.layer, this.id) == 0) str = str.concat("<br>Goal: 1e6 Blessings")
                if (challengeCompletions(this.layer, this.id) == 1) str = str.concat("<br>Goal: 1e8 Blessings")
                if (challengeCompletions(this.layer, this.id) == 2) str = str.concat("<br>Goal: 1e10 Blessings")
                if (challengeCompletions(this.layer, this.id) > 2) str = str.concat("<br><p style='color:#4c4'>COMPLETED</p>")
                return str
            },
            canComplete() {
                if (challengeCompletions(this.layer, this.id) == 0) return player.hbl.blessings.gte(1e6)
                if (challengeCompletions(this.layer, this.id) == 1) return player.hbl.blessings.gte(1e8)
                if (challengeCompletions(this.layer, this.id) == 2) return player.hbl.blessings.gte(1e10)
                return player.hbl.blessings.gte(1e12)
            },
            unlocked() { return hasUpgrade("hpw", 1002) || challengeCompletions(this.layer, this.id) > 0 },
            canClick() { return hasUpgrade("hpw", 1002) },
            onEnter() {
                layers.hpw.powerReset(1)
            },
            onExit() {
                layers.hpw.powerReset(1)
            },
            style: {width: '250px', height: '184px', backgroundColor: "#c84", border: "6px solid #840", borderRadius: "13px"},
            buttonStyle() {
                let look = {height: "40px", marginTop: "5px", marginBottom: "5px", borderRadius: "20px"}
                if (this.canComplete() && inChallenge(this.layer, this.id)) look.border = "4px solid #77bf5f"
                if (!this.canClick()) look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        13: {
            name() { return "Death Realm (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit + ")"},
            completionLimit: 3,
            marked: false,
            fullDisplay() {
                let str = "<h4>Hex points, blessings, and boons now decay. Base curse formula is buffed.</h4>"
                if (challengeCompletions(this.layer, this.id) == 0) str = str.concat("<br>Goal: 3 Vexes")
                if (challengeCompletions(this.layer, this.id) == 1) str = str.concat("<br>Goal: 6 Vexes")
                if (challengeCompletions(this.layer, this.id) == 2) str = str.concat("<br>Goal: 9 Vexes")
                if (challengeCompletions(this.layer, this.id) > 2) str = str.concat("<br><p style='color:#4c4'>COMPLETED</p>")
                return str
            },
            canComplete() {
                if (challengeCompletions(this.layer, this.id) == 0) return player.hve.vexTotal.gte(3)
                if (challengeCompletions(this.layer, this.id) == 1) return player.hve.vexTotal.gte(6)
                if (challengeCompletions(this.layer, this.id) == 2) return player.hve.vexTotal.gte(9)
                return player.hve.vexTotal.gte(12)
            },
            unlocked() { return hasUpgrade("hpw", 1003) || challengeCompletions(this.layer, this.id) > 0 },
            canClick() { return hasUpgrade("hpw", 1003) },
            onEnter() {
                layers.hpw.powerReset(1)
            },
            onExit() {
                layers.hpw.powerReset(1)
            },
            style: {width: '250px', height: '184px', backgroundColor: "#cc4", border: "6px solid #880", borderRadius: "13px"},
            buttonStyle() {
                let look = {height: "40px", marginTop: "5px", marginBottom: "5px", borderRadius: "20px"}
                if (this.canComplete() && inChallenge(this.layer, this.id)) look.border = "4px solid #77bf5f"
                if (!this.canClick()) look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    microtabs: {
        realms: {
            "Challenges": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked() {return hasUpgrade("bi", 27)},
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["style-row", [
                            ["raw-html", () => { return "Realm Completion Bonus: x" + format(new Decimal(player.hrm.realmEffect), 1) + " Power" }, {color: "white", fontSize: "22px", fontFamily: "monospace"}],
                        ], {width: "800px", height: "47px", backgroundColor: "rgba(0, 0, 0, 0.5)", borderBottom: "3px solid white", borderRadius: "17px 17px 0px 0px"}],
                        ["style-row", [
                            ["style-row", [["challenge", 11]], {width: "250px", height: "184px", backgroundColor: "rgba(0, 0, 0, 0.3)", border: "2px solid white", margin: "5px", borderRadius: "15px"}],
                            ["style-row", [["challenge", 12]], {width: "250px", height: "184px", backgroundColor: "rgba(0, 0, 0, 0.3)", border: "2px solid white", margin: "5px", borderRadius: "15px"}],
                            ["style-row", [["challenge", 13]], {width: "250px", height: "184px", backgroundColor: "rgba(0, 0, 0, 0.3)", border: "2px solid white", margin: "5px", borderRadius: "15px"}],
                        ], {width: "800px", height: "200px", backgroundColor: "rgba(0, 0, 0, 0.75)", paddingTop: "5px"}],
                        ["style-row", [
                            ["style-row", [], {width: "250px", height: "184px", backgroundColor: "rgba(0, 0, 0, 0.3)", border: "2px solid white", margin: "5px", borderRadius: "15px"}],
                            ["style-row", [], {width: "250px", height: "184px", backgroundColor: "rgba(0, 0, 0, 0.3)", border: "2px solid white", margin: "5px", borderRadius: "15px"}],
                            ["style-row", [], {width: "250px", height: "184px", backgroundColor: "rgba(0, 0, 0, 0.3)", border: "2px solid white", margin: "5px", borderRadius: "15px"}],
                        ], {width: "800px", height: "200px", backgroundColor: "rgba(0, 0, 0, 0.75)", paddingBottom: "5px"}],
                        ["style-row", [
                            ["raw-html", "Unlock new realms through mights", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "800px", height: "37px", backgroundColor: "rgba(0, 0, 0, 0.5)", borderTop: "3px solid white", borderRadius: "0px 0px 17px 17px"}],
                    ], {width: "800px", height: "500px", background: "linear-gradient(90deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)", border: "3px solid white", borderRadius: "20px"}],
                ],
            },
            "Essence": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked() {return hasMilestone("s", 11)},
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["style-row", [
                            ["raw-html", () => {return "You have <h3>" + format(player.hrm.realmEssence) + "</h3> Realm Essence."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "(+" + format(player.hrm.realmEssenceGain) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                        ], {width: "625px", height: "47px", backgroundColor: "rgba(0, 0, 0, 0.5)", borderBottom: "3px solid white", borderRadius: "17px 17px 0px 0px"}],
                        ["style-column", [
                            ["style-row", [
                                ["raw-html", "Effects", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
                            ], {width: "500px", height: "50px", marginBottom: "-10px"}],
                            ["style-row", [
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "6 Realm Essence", {color: "rgba(0,0,0,0.6)", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "34px", backgroundColor: "#c44", borderBottom: "3px solid #400", borderRadius: "10px 10px 0px 0px"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[0][0]) + "<br>Blessings"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px", borderBottom: "3px solid #400"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[0][1]) + "<br>Check Back XP"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px"}],
                                ], () => {
                                    let look = {width: "190px", height: "120px", backgroundColor: "#933", border: "3px solid #400", margin: "5px", borderRadius: "10px", userSelect: "none"}
                                    if (player.hrm.realmEssence.lt(6)) look.opacity = "0.3"
                                    return look
                                }],

                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "36 Realm Essence", {color: "rgba(0,0,0,0.6)", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "34px", backgroundColor: "#c84", borderBottom: "3px solid #420", borderRadius: "10px 10px 0px 0px"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[1][0]) + "<br>Hex Points"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px", borderBottom: "3px solid #420"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[1][1]) + "<br>Pre-OTF Resources"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px"}],
                                ], () => {
                                    let look = {width: "190px", height: "120px", backgroundColor: "#963", border: "3px solid #420", margin: "5px", borderRadius: "10px", userSelect: "none"}
                                    if (player.hrm.realmEssence.lt(36)) look.opacity = "0.3"
                                    return look
                                }],

                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "216 Realm Essence", {color: "rgba(0,0,0,0.6)", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "34px", backgroundColor: "#cc4", borderBottom: "3px solid #440", borderRadius: "10px 10px 0px 0px"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[2][0]) + "<br>Curses"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px", borderBottom: "3px solid #440"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[2][1]) + "<br>XPBoost"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px"}],
                                ], () => {
                                    let look = {width: "190px", height: "120px", backgroundColor: "#993", border: "3px solid #440", margin: "5px", borderRadius: "10px", userSelect: "none"}
                                    if (player.hrm.realmEssence.lt(216)) look.opacity = "0.3"
                                    return look
                                }],

                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "1,296 Realm Essence", {color: "rgba(0,0,0,0.6)", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "34px", backgroundColor: "#4c4", borderBottom: "3px solid #040", borderRadius: "10px 10px 0px 0px"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[3][0]) + "<br>Power"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px", borderBottom: "3px solid #040"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[3][1]) + "<br>Infinity Points"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px"}],
                                ], () => {
                                    let look = {width: "190px", height: "120px", backgroundColor: "#393", border: "3px solid #040", margin: "5px", borderRadius: "10px", userSelect: "none"}
                                    if (player.hrm.realmEssence.lt(1296)) look.opacity = "0.3"
                                    return look
                                }],

                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "7,776 Realm Essence", {color: "rgba(0,0,0,0.8)", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "34px", backgroundColor: "#44c", borderBottom: "3px solid #004", borderRadius: "10px 10px 0px 0px"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "/" + format(player.hrm.realmEssenceEffect[4][0]) + "<br>Refinement Req"}, {color: "rgba(0,0,0,0.8)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px", borderBottom: "3px solid #004"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "/" + format(player.hrm.realmEssenceEffect[4][1]) + "<br>XP Button Cooldown"}, {color: "rgba(0,0,0,0.8)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px"}],
                                ], () => {
                                    let look = {width: "190px", height: "120px", backgroundColor: "#339", border: "3px solid #004", margin: "5px", borderRadius: "10px", userSelect: "none"}
                                    if (player.hrm.realmEssence.lt(7776)) look.opacity = "0.3"
                                    return look
                                }],

                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "46,656 Realm Essence", {color: "rgba(0,0,0,0.6)", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "34px", backgroundColor: "#84c", borderBottom: "3px solid #204", borderRadius: "10px 10px 0px 0px"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[5][0]) + "<br>Jinx Score"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px", borderBottom: "3px solid #204"}],
                                    ["style-column", [
                                        ["raw-html", () => {return "x" + format(player.hrm.realmEssenceEffect[5][1]) + "<br>Singularity Points"}, {color: "rgba(0,0,0,0.6)", fontSize: "14px", fontFamily: "monospace"}],
                                    ], {width: "190px", height: "40px"}],
                                ], () => {
                                    let look = {width: "190px", height: "120px", backgroundColor: "#639", border: "3px solid #204", margin: "5px", borderRadius: "10px", userSelect: "none"}
                                    if (player.hrm.realmEssence.lt(46656)) look.opacity = "0.3"
                                    return look
                                }],
                                
                            ], {width: "625px", height: "280px"}],
                        ], {width: "625px", height: "320px", backgroundColor: "rgba(0, 0, 0, 0.75)"}],
                        ["style-row", [
                            ["raw-html", "Realm essence gain is based on realm challenge clears,<br>and is gained on singularity reset.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ], {width: "625px", height: "47px", backgroundColor: "rgba(0, 0, 0, 0.5)", borderTop: "3px solid white", borderRadius: "0px 0px 17px 17px"}],
                    ], {width: "625px", height: "420px", background: "linear-gradient(90deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)", border: "3px solid white", borderRadius: "20px"}],
                ],
            },
        }
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.h.hexPointGain.eq(0) ? "" : player.h.hexPointGain.gt(0) ? "(+" + format(player.h.hexPointGain) + "/s)" : "<span style='color:red'>(" + format(player.h.hexPointGain) + "/s)</span>"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["style-column", [
            ["raw-html", "Hex of Realms", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", background: "linear-gradient(90deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "10px"],
        ["microtabs", "realms", {borderWidth: "0px"}],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("bi", 27) || hasMilestone("s", 11)}, // Decides if this node is shown or not.
});