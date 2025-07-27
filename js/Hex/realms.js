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
    }},
    update(delta) {
        player.hrm.realmCompletions = new Decimal(0)
        for (let i = 11; i < 13; i++) {
            player.hrm.realmCompletions = player.hrm.realmCompletions.add(challengeCompletions("hrm", i))
        }

        player.hrm.realmEffect = Decimal.pow(1.5, player.hrm.realmCompletions)
    },
    challenges: {
        11: {
            name() { return "Creator Realm (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit + ")"},
            completionLimit: 3,
            marked: false,
            fullDisplay() {
                let str = "<h4>You can only reset blessing 6 times. Amended Automation is also locked.</h4>"
                if (challengeCompletions(this.layer, this.id) == 0) str = str.concat("<br>Goal: 6,000 Blessings")
                if (challengeCompletions(this.layer, this.id) == 1) str = str.concat("<br>Goal: 60,000 Blessings")
                if (challengeCompletions(this.layer, this.id) == 2) str = str.concat("<br>Goal: 600,000 Blessings")
                if (challengeCompletions(this.layer, this.id) > 2) str = str.concat("<br><p style='color:#4c4'>COMPLETED</p>")
                return str
            },
            canComplete() {
                if (challengeCompletions(this.layer, this.id) == 0) return player.hbl.blessings.gte(6000)
                if (challengeCompletions(this.layer, this.id) == 1) return player.hbl.blessings.gte(60000)
                if (challengeCompletions(this.layer, this.id) == 2) return player.hbl.blessings.gte(600000)
                return player.hbl.blessings.gte(1e6)
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
                ["raw-html", "Unlock new realms through mights", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ], {width: "800px", height: "37px", backgroundColor: "rgba(0, 0, 0, 0.5)", borderTop: "3px solid white", borderRadius: "0px 0px 17px 17px"}],
        ], {width: "800px", height: "500px", background: "linear-gradient(90deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("bi", 27) }, // Decides if this node is shown or not.
});