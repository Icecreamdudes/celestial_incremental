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
        totalRealmEssence: new Decimal(0),
        realmEssenceGain: new Decimal(0),
        realmEssenceEffects: [new Decimal(1), new Decimal(1)],
    }},
    update(delta) {
        player.hrm.realmCompletions = new Decimal(0)
        for (let i in player.hrm.challenges) {
            let amt = new Decimal(challengeCompletions("hrm", i))
            if (amt.gt(3)) amt = amt.sub(3).mul(2/3).add(3)
            if (amt.gt(5)) amt = amt.sub(5).div(2).add(5)
            player.hrm.realmCompletions = player.hrm.realmCompletions.add(amt)
        }

        player.hrm.realmEffect = Decimal.pow(1.5, player.hrm.realmCompletions)

        player.hrm.realmEssenceGain = Decimal.pow(1.35, player.hrm.realmCompletions).sub(1)
        player.hrm.realmEssenceGain = player.hrm.realmEssenceGain.mul(buyableEffect("hrm", 6))

        player.hrm.realmEssenceEffects = [new Decimal(1), new Decimal(1)]
        player.hrm.realmEssenceEffects[0] = Decimal.pow(2.5, player.hrm.realmEssence.add(1).log(6))
        player.hrm.realmEssenceEffects[1] = player.hrm.realmEssence.add(1).log(6).mul(0.05).add(1)

        if (player.hrm.realmEssence.gte(7776)) player.hrm.realmEssenceEffects[0] = Decimal.pow(1.5, player.hrm.realmEssence.div(7776).log(6)).mul(98)
        if (player.hrm.realmEssence.gte(60466176)) player.hrm.realmEssenceEffects[1] = player.hrm.realmEssence.div(60466176).log(6).mul(0.01).add(1.5)

        if (inChallenge("hrm", 15)) {
            player.hrm.dreamTimer = player.hrm.dreamTimer.sub(delta)
            if (player.hrm.dreamTimer.lte(0)) {
                completeChallenge("hrm", 15)
            }
        }
    },
    clickables: {
        1: {
            title() { return "Respec Upgrades<br><small style='font-size:11px'>(Does a power reset)</small>"},
            canClick() {return player.hrm.realmEssence.lt(player.hrm.totalRealmEssence)},
            unlocked: true,
            onClick() {
                if (confirm("Are you sure you want to do a power reset?")) {
                    player.hrm.realmEssence = player.hrm.totalRealmEssence
                    for (let i = 1; i < 7; i++) {
                        player.hrm.buyables[i] = new Decimal(0)
                    }
                    layers.hpw.powerReset(0)
                }
            },
            style() {
                let look = {width: "250px", minHeight: "40px", color: "black", lineHeight: "0.9", border: "2px solid black", borderRadius: "15px"}
                this.canClick() ? look.background = "linear-gradient(90deg, #c88, #ca8, #cca, #8c8, #8cc, #88c, #a8c)" : look.background = "#bf8f8f"
                return look
            },
        },
    },
    buyables: {
        1: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(12) },
            currency() { return player.hrm.realmEssence},
            pay(amt) { player.hrm.realmEssence = this.currency().sub(amt) },
            effect(x) {
                if (getBuyableAmount(this.layer, this.id).lt(1)) return new Decimal(0)
                return Decimal.pow(6, getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RE-1</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/12)\n\
                    Keep some power on singularity resets\n\
                    Currently: " + formatWhole(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Realm Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(180deg, #c88, #ca8, #cca, #8c8, #8cc, #88c, #a8c)"
                return look
            },
        },
        2: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(6) },
            currency() { return player.hrm.realmEssence},
            pay(amt) { player.hrm.realmEssence = this.currency().sub(amt) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RE-2</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/6)\n\
                    Keep some miracles on resets.\n\
                    Currently: " + formatWhole(getBuyableAmount(this.layer, this.id)) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Realm Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(180deg, #c88, #ca8, #cca, #8c8, #8cc, #88c, #a8c)"
                return look
            },
        },
        3: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(6) },
            purchaseLimit() { return new Decimal(30) },
            currency() { return player.hrm.realmEssence},
            pay(amt) { player.hrm.realmEssence = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(0.1)
            },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RE-3</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/30)\n\
                    Increase IP Booster softcap exponent.\n\
                    Currently: +" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Realm Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(180deg, #c88, #ca8, #cca, #8c8, #8cc, #88c, #a8c)"
                return look
            },
        },
        4: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(25) },
            purchaseLimit() { return new Decimal(60) },
            currency() { return player.hrm.realmEssence},
            pay(amt) { player.hrm.realmEssence = this.currency().sub(amt) },
            effect(x) {
                return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RE-4</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/60)\n\
                    Multiply hex points by x1.5<br><small>(ignoring softcaps)</small>\n\
                    Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Realm Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(180deg, #c88, #ca8, #cca, #8c8, #8cc, #88c, #a8c)"
                return look
            },
        },
        5: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(50) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.hrm.realmEssence},
            pay(amt) { player.hrm.realmEssence = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(0.05).add(1)
            },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RE-5</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Raise all first realm might effects.\n\
                    Currently: ^" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Realm Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(180deg, #c88, #ca8, #cca, #8c8, #8cc, #88c, #a8c)"
                return look
            },
        },
        6: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(30) },
            currency() { return player.hrm.realmEssence},
            pay(amt) { player.hrm.realmEssence = this.currency().sub(amt) },
            effect(x) {
                return Decimal.pow(2, getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>RE-6</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/30)\n\
                    Double realm essence.\n\
                    Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Realm Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(180deg, #c88, #ca8, #cca, #8c8, #8cc, #88c, #a8c)"
                return look
            },
        },
    },
    challenges: {
        11: {
            name() { return "Creator Realm (" + challengeCompletions(this.layer, this.id) + "/" + this.completionLimit() + ")"},
            completionLimit() {return buyableEffect("hpw", 1).add(3)},
            marked: false,
            goal() {return Decimal.pow(10, challengeCompletions(this.layer, this.id)).mul(1e4)},
            fullDisplay() {
                let str = "<h4>You can only reset blessing 6 times. Amended Automation is also locked.</h4>"
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatShortWhole(this.goal()) + " Blessings")
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
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatShortWhole(this.goal()) + " Blessings")
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
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatShortWhole(this.goal()) + " Vexes")
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
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatShortWhole(this.goal()) + " Sacred Energy")
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
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatShortWhole(this.goal()) + " Blessings")
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
            goal() {return Decimal.mul(6, challengeCompletions(this.layer, this.id)).add(90)},
            fullDisplay() {
                let str = "<h4>The void has made you forget the concept of provenances.</h4>"
                if (inChallenge("hrm", 16)) str = "<h4>The void has made you forget the concept of ███████████.</h4>"
                if (Decimal.lt(challengeCompletions(this.layer, this.id), this.completionLimit())) str = str.concat("<br>Goal: " + formatShortWhole(this.goal()) + " Refinements")
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
    microtabs: {
        realm: {
            "Challenges": {
                buttonStyle() { return {borderColor: "#ccc", borderRadius: "5px"}},
                unlocked: true,
                content: [
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
                ],
            },
            "Essence": {
                buttonStyle() { return {borderColor: "#ccc", borderRadius: "5px"}},
                unlocked() {return layerShown("s")},
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "You have <h3>" + formatShort(player.hrm.realmEssence) + "</h3> Realm Essence."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "(+" + formatShort(player.hrm.realmEssenceGain) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts Pre-Power resources by x" + format(player.hrm.realmEssenceEffects[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.hrm.realmEssence.gte(7776) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts Checkback Tickspeed by x" + format(player.hrm.realmEssenceEffects[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.hrm.realmEssence.gte(60466176) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", marginLeft: "8px"}],
                        ]],
                    ], {width: "600px", height: "75px", background: "linear-gradient(90deg, #530000, #533a00, #515300, #0e5300, #00531d, #005349, #004677, #003153, #230053, #4f0053)", borderTop: "3px solid white", borderLeft: "3px solid white", borderRight: "3px solid white", borderRadius: "20px 20px 0px 0px"}],
                    ["style-column", [
                        ["clickable", 1],
                        ["blank", "5px"],
                        ["row", [["buyable", 1], ["buyable", 2], ["buyable", 3], ["buyable", 4], ["buyable", 5], ["buyable", 6]]],
                    ], {width: "760px", height: "180px", background: "linear-gradient(90deg, #2f0000, #2f2100, #2e2f00, #082f00, #002f10, #002f2a, #004677, #001c2f, #14002f, #2d002f)", border: "3px solid white", borderRadius: "20px"}],
                    ["style-column", [
                        ["raw-html", "Realm essence gain is based on realm challenge clears,<br>and is gained on singularity reset.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ], {width: "600px", height: "50px", background: "linear-gradient(90deg, #530000, #533a00, #515300, #0e5300, #00531d, #005349, #004677, #003153, #230053, #4f0053)", borderBottom: "3px solid white", borderLeft: "3px solid white", borderRight: "3px solid white", borderRadius: "0 0 20px 20px"}]
                ],
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
        ["blank", "5px"],
        ["microtabs", "realm", {borderWidth: "0px"}],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("bi", 27) || hasMilestone("s", 11)}, // Decides if this node is shown or not.
});