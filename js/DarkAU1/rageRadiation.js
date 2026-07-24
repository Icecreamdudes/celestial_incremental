addLayer("rar", {
    name: "Rage Radiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {
        return player.sma.inStarmetalChallenge ? "<img src='resources/radiation/rage.png' style='width:calc(80% + 0px);height:calc(80% + 0px);margin:10%'></img>" : "RR"
    },
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        radiation: {
            current: new Decimal(0),
            max: new Decimal(6),
            amount: new Decimal(0),
            toGet: new Decimal(0),
            effect: new Decimal(1), 
            effect2: new Decimal(1), 
            toggle: true,
        },
        essence: {
            amount: new Decimal(0),
            effect: new Decimal(1), //time rads
            effect2: new Decimal(1), //aleph currencies
            req: new Decimal("1e500"),
            req2: new Decimal("1e60"),
        },
    }},
    automate() {
    },
    nodeStyle() {
        return player.sma.inStarmetalChallenge ? {
            background: "#520c61",
            backgroundOrigin: "border-box",
            color: "#f6fff5",
            transform: "translate(-20px, -5px)",
        } : 
        {
            background: "#520c61",
            backgroundOrigin: "border-box",
            color: "#ba4ad3",
            transform: "translate(0px,0px)",
        };
    },
    tooltip: "Rage Radiation",
    branches: [["mr", "#74ff8f"], ["al"]],
    color: "#520c61",
    update(delta) {
        player.rar.radiation.effect = player.rar.radiation.amount.pow(0.6).add(1)
        player.rar.radiation.effect2 = player.rar.radiation.amount.pow(0.85).div(2).add(1)

        player.rar.radiation.toGet = player.dgj.grassJumpers.pow(0.2).div(10)

        player.rar.radiation.max = new Decimal(6)

        if (player.musuniverse == "AD1" && hasUpgrade("ani", 28) && player.rar.radiation.toGet.gt(1) && player.pet.legPetTimers[0].active && player.rar.radiation.toggle) {
            player.rar.radiation.current = player.rar.radiation.current.sub(delta)
        }
        if (player.rar.radiation.current.lt(0)) {
            makeShinies(rageRadiation, new Decimal(1))
            player.rar.radiation.current = player.rar.radiation.max
        }

        //essence
        player.rar.essence.req = Decimal.mul("1e500", Decimal.pow(1e50, player.rar.essence.amount))
        player.rar.essence.req2 = player.rar.essence.amount.add(1).pow(Decimal.add(10, player.rar.essence.amount.mul(4))).mul("1e60")

        player.rar.essence.effect = player.rar.essence.amount.mul(3).pow(3).add(1)
        player.rar.essence.effect2 = player.rar.essence.amount.pow(0.4).mul(2).add(1)
    },
    rageEssenceReset() {
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h3>Reset MOST previous Alt-Dark U1 content and a nest level reset for rage essence.<br><h2>" + format(player.bee.bees) + "/" + format(player.rar.essence.req) + " Bees</h2><h2><br>" + format(player.ani.darkRadiation) + "/" + format(player.rar.essence.req2) + " Dark Radiation</h2>" },
            canClick() { return player.bee.bees.gte(player.rar.essence.req) && player.ani.darkRadiation.gte(player.rar.essence.req2) },
            unlocked() { return true },
            onClick() {
                player.rar.essence.amount = player.rar.essence.amount.add(1)
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        layers.al.prestigeReset(true)
                    }, 100*i)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "800px", minHeight: "125px", borderRadius: "15px", color: "white", border: "2px solid #ba4ad3", fontSize: "9px", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#520c61" : look.backgroundColor = "black"
                return look
            }
        },
    },
    upgrades: {

    },
    buyables: {
    },
    milestones: {
        11: {
            requirementDescription: "1 Rage Essence",
            effectDescription() { return "Gain 1% of honeycombs/royal jelly per second, unlock an effect for bees and unlock more pollen/nectar content. Also keep all nectar upgrades on aleph resets." },
            done() { return player.rar.essence.amount.gte(1) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ba4ad3", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("rar", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#520c61"}
                return look
            },
        },
        12: {
            requirementDescription: "2 Rage Essence",
            effectDescription() { return "Earn 10% of colored radiation per second, and mind/heart radiation particle requirements are reduced by /2.5." },
            done() { return player.rar.essence.amount.gte(2) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ba4ad3", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("rar", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#520c61"}
                return look
            },
        },
        13: {
            requirementDescription: "3 Rage Essence",
            effectDescription() { return "Unlock violet radiation and autobuy time radiation buyables." },
            done() { return player.rar.essence.amount.gte(3) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ba4ad3", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("rar", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#520c61"}
                return look
            },
        },
        14: {
            requirementDescription: "5 Rage Essence",
            effectDescription() { return "Gain 1% of time radiation per second and ALWAYS autobuy dark grass buyables." },
            done() { return player.rar.essence.amount.gte(5) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ba4ad3", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("rar", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#520c61"}
                return look
            },
        },
        15: {
            requirementDescription: "7 Rage Essence",
            effectDescription() { return "Gain 1% of mind radiation per second and unlock more nest upgrades." },
            done() { return player.rar.essence.amount.gte(7) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ba4ad3", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("rar", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#520c61"}
                return look
            },
        },
        16: {
            requirementDescription: "10 Rage Essence",
            effectDescription() { return "Unlock Aniciffo's labyrinth (also requires the hope milestone)." },
            done() { return player.rar.essence.amount.gte(10) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ba4ad3", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("rar", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#520c61"}
                return look
            },
        },
    },
    challenges: {},
    infoboxes: {
  
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #74ff8f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],

                    ["raw-html", () => { return "This layer is also available in Hive."}, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.rar.radiation.amount) + "</h3> rage radiation. (+" + format(player.rar.radiation.toGet) + "/" + formatTime(player.rar.radiation.max) + ")"}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Based on grassjumpers)" }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts grassjumper gain by x<h3>" + format(player.rar.radiation.effect) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts stability gain by x<h3>" + format(player.rar.radiation.effect2) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Performs a starmetal level reset and resets grassjumpers." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                ]
            },
            "Essence": {
                buttonStyle() { return { border: "2px solid #74ff8f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "15px"],
                    ["style-column", [
                    ["raw-html", () => { return "You have <h3>" + formatWhole(player.rar.essence.amount) + "</h3> rage essence."}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts time radiation gain by x<h3>" + format(player.rar.essence.effect) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Multiplies glossary effect base by x<h3>" + format(player.rar.essence.effect2) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ], {backgroundColor: "#520c61", border: "3px solid #ba4ad3", borderRadius: "13px 13px 0px 0px", width: "588px", height: "80px"}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "1", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#520c61", border: "3px solid #ba4ad3", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 11],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "2", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#520c61", border: "3px solid #ba4ad3", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 12],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "3", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#520c61", border: "3px solid #ba4ad3", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 13],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "5", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#520c61", border: "3px solid #ba4ad3", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 14],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "7", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#520c61", border: "3px solid #ba4ad3", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 15],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "10", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#520c61", border: "3px solid #ba4ad3", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 16],
                    ]],
                    ["style-row", [
                    ], {backgroundColor: "#520c61", border: "3px solid #ba4ad3", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "588px", height: "10px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.ani.darkRadiation) + "</h3> dark radiation. (+" + format(player.ani.darkRadiationToGet) + "/" + formatTime(player.ani.timer.max) + ")" }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].active ? "Boosts eclipse timer tickspeed by x<h3>" + format(player.ani.darkRadiationEffect) + "</h3>." : "Boosts length, width, and depth by x<h3>" + format(player.ani.darkRadiationEffect2) + "</h3>." }, {color: "#ffffff", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "5px"],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("ani", 28)},
    deactivated() { return false},
})
const rageRadiation = {
    image: "resources/radiation/rage.png",
    time() {
        let time = new Decimal(5) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.rar.radiation.toGet) + " Rage Radiation<br>Reset Complete!</small>"})
        player.rar.radiation.amount = player.rar.radiation.amount.add(player.rar.radiation.toGet)
        for (let i = 0; i < 60; i++) {
            layers.le.starmetalReset();

            player.dgj.grassJumpers = new Decimal(0)
            player.dgj.buyables[11] = new Decimal(0)
            player.dgj.buyables[12] = new Decimal(0)
            player.dgj.buyables[13] = new Decimal(0)
            player.dgj.buyables[14] = new Decimal(0)
            player.dgj.buyables[15] = new Decimal(0)
            player.dgj.buyables[16] = new Decimal(0)
        }
        Vue.delete(particles, this.id)
    },
}