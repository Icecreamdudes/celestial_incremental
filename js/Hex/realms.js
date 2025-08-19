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
        dreamTimer: new Decimal(60),

        realmEssence: new Decimal(0),
        realmEssenceGain: new Decimal(0),
        realmEssenceEffects: [new Decimal(1), new Decimal(1)],
    }},
    update(delta) {
        player.hrm.realmCompletions = new Decimal(0)
        for (let i in player.hrm.challenges) {
            let amt = new Decimal(challengeCompletions("hrm", i))
            if (amt.gt(3)) amt = amt.div(3).pow(0.6).mul(3)
            player.hrm.realmCompletions = player.hrm.realmCompletions.add(amt)
        }

        player.hrm.realmEffect = Decimal.pow(1.5, player.hrm.realmCompletions)

        player.hrm.realmEssenceGain = player.hrm.realmCompletions.pow(2).div(6)
        player.hrm.realmEssenceGain = player.hrm.realmEssenceGain.mul(player.le.punchcardsPassiveEffect[9])

        player.hrm.realmEssenceEffects = [new Decimal(1), new Decimal(1)]
        player.hrm.realmEssenceEffects[0] = Decimal.pow(2.5, player.hrm.realmEssence.add(1).log(6))
        player.hrm.realmEssenceEffects[1] = Decimal.pow(1.05, player.hrm.realmEssence.add(1).log(6))

        if (inChallenge("hrm", 15)) {
            player.hrm.dreamTimer = player.hrm.dreamTimer.sub(delta)
            if (player.hrm.dreamTimer.lte(0)) {
                completeChallenge("hrm", 15)
            }
        }
    },
    challenges: {
        11: {
            name() { return "Creator Realm (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"},
            completionLimit() {return buyableEffect("hpw", 1).add(3)},
            marked: false,
            goal() {return Decimal.pow(10, challengeCompletions(this.layer, this.id)).mul(1e4)},
            fullDisplay() {
                let str = "<h4>You can only reset blessing 6 times. Amended Automation is also locked.</h4>"
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatWhole(this.goal()) + " Blessings")
                if (Decimal.gte(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>COMPLETED")
                return str
            },
            canComplete() {
                return player.hbl.blessings.gte(this.goal())
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
            name() { return "Higher Plane (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"},
            completionLimit() {return buyableEffect("hpw", 2).add(3)},
            marked: false,
            goal() {return Decimal.pow(30, challengeCompletions(this.layer, this.id)).mul(1e6)},
            fullDisplay() {
                let str = "<h4>Blessing and curse features are nerfed. Purity features are heavily buffed.</h4>"
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatWhole(this.goal()) + " Blessings")
                if (Decimal.gte(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>COMPLETED")
                return str
            },
            canComplete() {
                return player.hbl.blessings.gte(this.goal())
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
            name() { return "Death Realm (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"},
            completionLimit() {return buyableEffect("hpw", 3).add(3)},
            marked: false,
            goal() {return Decimal.mul(3, challengeCompletions(this.layer, this.id)).add(3)},
            fullDisplay() {
                let str = "<h4>Hex points, blessings, and boons now decay. Base curse formula is buffed.</h4>"
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatWhole(this.goal()) + " Vexes")
                if (Decimal.gte(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>COMPLETED")
                return str
            },
            canComplete() {
                return player.hve.vexTotal.gte(this.goal())
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
        14: {
            name() { return "Dimensional Realm (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"},
            completionLimit() {return buyableEffect("hpw", 4).add(3)},
            marked: false,
            goal() {return Decimal.pow(100, challengeCompletions(this.layer, this.id)).mul(10000)},
            fullDisplay() {
                let str = "<h4>Hex points are heavily softcapped, but unlock hex of sacrifice.</h4>"
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatWhole(this.goal()) + " Sacred Energy")
                if (Decimal.gte(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>COMPLETED")
                return str
            },
            canComplete() {
                return player.hsa.sacredEnergy.gte(this.goal())
            },
            unlocked() { return hasUpgrade("hpw", 1004) || challengeCompletions(this.layer, this.id) > 0 },
            canClick() { return hasUpgrade("hpw", 1004) },
            onEnter() {
                layers.hpw.powerReset(1)
            },
            onExit() {
                layers.hpw.powerReset(1)
            },
            style: {width: '250px', height: '184px', backgroundColor: "#4c4", border: "6px solid #080", borderRadius: "13px"},
            buttonStyle() {
                let look = {height: "40px", marginTop: "5px", marginBottom: "5px", borderRadius: "20px"}
                if (this.canComplete() && inChallenge(this.layer, this.id)) look.border = "4px solid #77bf5f"
                if (!this.canClick()) look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        15: {
            name() { return "Dream Realm (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"},
            completionLimit() {return buyableEffect("hpw", 5).add(3)},
            marked: false,
            goal() {return Decimal.pow(10, challengeCompletions(this.layer, this.id)).mul(6e6)},
            fullDisplay() {
                let str = "<h4>Challenge ends after 60 seconds. Most automation is turned off.</h4>"
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatWhole(this.goal()) + " Blessings")
                if (Decimal.gte(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>COMPLETED")
                return str
            },
            canComplete() {
                return player.hbl.blessings.gte(this.goal())
            },
            unlocked() { return hasUpgrade("hpw", 1005) || challengeCompletions(this.layer, this.id) > 0 },
            canClick() { return hasUpgrade("hpw", 1005) },
            onEnter() {
                if (player.subtabs["hbl"]['stuff'] == 'blessing') player.subtabs["hbl"]['blessing'] = 'Boons'
                layers.hpw.powerReset(1)
            },
            onExit() {
                console.log(format(player.hbl.blessings))
                layers.hpw.powerReset(1)
            },
            style: {width: '250px', height: '184px', backgroundColor: "#44c", border: "6px solid #008", borderRadius: "13px"},
            buttonStyle() {
                let look = {height: "40px", marginTop: "5px", marginBottom: "5px", borderRadius: "20px"}
                if (this.canComplete() && inChallenge(this.layer, this.id)) look.border = "4px solid #77bf5f"
                if (!this.canClick()) look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        16: {
            name() { return "Void Realm (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"},
            completionLimit() {return buyableEffect("hpw", 6).add(3)},
            marked: false,
            goal() {return Decimal.mul(6, challengeCompletions(this.layer, this.id)).add(30)},
            fullDisplay() {
                let str = "<h4>The void has made you forget the concept of provenances.</h4>"
                if (inChallenge("hrm", 16)) str = "<h4>The void has made you forget the concept of ███████████.</h4>"
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatWhole(this.goal()) + " Refinements")
                if (Decimal.gte(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>COMPLETED")
                return str
            },
            canComplete() {
                return player.hre.refinement.gte(this.goal())
            },
            unlocked() { return hasUpgrade("hpw", 1006) || challengeCompletions(this.layer, this.id) > 0 },
            canClick() { return hasUpgrade("hpw", 1006) },
            onEnter() {
                layers.hpw.powerReset(1)
            },
            onExit() {
                layers.hpw.powerReset(1)
            },
            style: {width: '250px', height: '184px', backgroundColor: "#84c", border: "6px solid #408", borderRadius: "13px"},
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
            ["raw-html", () => {return (inChallenge("hrm", 14) || player.h.hexPointGain.gte(1e308)) ? "[SOFTCAPPED]" : "" }, {color: "red", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => {return inChallenge("hrm", 15) ? "Time Remaining: " + formatTime(player.hrm.dreamTimer) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
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
                ["style-row", [["challenge", 14]], {width: "250px", height: "184px", backgroundColor: "rgba(0, 0, 0, 0.3)", border: "2px solid white", margin: "5px", borderRadius: "15px"}],
                ["style-row", [["challenge", 15]], {width: "250px", height: "184px", backgroundColor: "rgba(0, 0, 0, 0.3)", border: "2px solid white", margin: "5px", borderRadius: "15px"}],
                ["style-row", [["challenge", 16]], {width: "250px", height: "184px", backgroundColor: "rgba(0, 0, 0, 0.3)", border: "2px solid white", margin: "5px", borderRadius: "15px"}],
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