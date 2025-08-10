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
        realmEssenceEffects: [new Decimal(1), new Decimal(1)],
    }},
    update(delta) {
        player.hrm.realmCompletions = new Decimal(0)
        for (let i in player.hrm.challenges) {
            player.hrm.realmCompletions = player.hrm.realmCompletions.add(challengeCompletions("hrm", i))
        }

        player.hrm.realmEffect = Decimal.pow(1.5, player.hrm.realmCompletions)

        player.hrm.realmEssenceGain = player.hrm.realmCompletions.pow(2).div(6)
        player.hrm.realmEssenceGain = player.hrm.realmEssenceGain.mul(player.le.punchcardsPassiveEffect[9])

        player.hrm.realmEssenceEffects = [new Decimal(1), new Decimal(1)]
        player.hrm.realmEssenceEffects[0] = Decimal.pow(2.5, player.hrm.realmEssence.add(1).log(6))
        player.hrm.realmEssenceEffects[1] = Decimal.pow(1.05, player.hrm.realmEssence.add(1).log(6))

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
    microtabs: {},
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return player.h.hexPointGain.eq(0) ? "" : player.h.hexPointGain.gt(0) ? "(+" + format(player.h.hexPointGain) + "/s)" : "<span style='color:red'>(" + format(player.h.hexPointGain) + "/s)</span>"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["style-column", [
            ["raw-html", "Hex of Realms", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", background: "linear-gradient(90deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "25px"],
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
                ["raw-html", "Unlock new realm challenges through mights", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ], {width: "800px", height: "37px", backgroundColor: "rgba(0, 0, 0, 0.5)", borderTop: "3px solid white", borderRadius: "0px 0px 17px 17px"}],
        ], () => {
            let look = {width: "800px", height: "500px", background: "linear-gradient(90deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)", border: "3px solid white", borderRadius: "20px"}
            if (!hasUpgrade("bi", 27)) {look.opacity = "0.3";look.userSelect = "none"}
            return look
        }],
        ["blank", "25px"],
        ["style-column", [
            ["style-column", [
                ["row", [
                    ["raw-html", () => {return "You have <h3>" + format(player.hrm.realmEssence) + "</h3> Realm Essence."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "(+" + format(player.hrm.realmEssenceGain) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                ]],
                ["raw-html", () => {return "Boosts Pre-Power resources by x" + format(player.hrm.realmEssenceEffects[0]) + "<br>Boosts Checkback Tickspeed by x" + format(player.hrm.realmEssenceEffects[1]) }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ], {width: "600px", height: "77px", backgroundColor: "rgba(0,0,0,0.3)", borderBottom: "3px solid white", borderRadius: "17px 17px 0px 0px"}],
            ["style-column", [
                ["raw-html", "Realm essence gain is based on realm challenge clears,<br>and is gained on singularity reset.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
            ], {width: "600px", height: "50px", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: "0 0 17px 17px"}]
        ], () => {return layerShown("s") ? {width: "600px", height: "130px", background: "linear-gradient(90deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)", border: "3px solid white", borderRadius: "20px"} : {display: "none !important"}}],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("bi", 27) || hasMilestone("s", 11)}, // Decides if this node is shown or not.
});