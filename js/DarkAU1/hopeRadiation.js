addLayer("hor", {
    name: "Hope Radiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {
        return player.sma.inStarmetalChallenge ? "<img src='resources/radiation/hope.png' style='width:calc(80% + 0px);height:calc(80% + 0px);margin:10%'></img>" : "HR"
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
            effect: new Decimal(1), //fun points
            effect2: new Decimal(1), //decay
            toggle: true,
        },

        essence: {
            amount: new Decimal(0),
            effect: new Decimal(1), //space rads?
            effect2: new Decimal(1), //fourth softcap
            req: new Decimal("1e50000"),
            req2: new Decimal("1e60"),
        },
    }},
    automate() {
    },
    nodeStyle() {
        return player.sma.inStarmetalChallenge ? {
            background: "#ffde55",
            backgroundOrigin: "border-box",
            color: "#f6fff5",
            transform: "translate(17.5px,27.5px)",
        } : 
        {
            background: "#ffde55",
            backgroundOrigin: "border-box",
            color: "#685a21",
            transform: "translate(0px,0px)",
        };
    },
    tooltip: "Hope Radiation",
    branches: [["hr", "#74ff8f"], ["fu"]],
    color: "#ffde55",
    update(delta) {
        player.hor.radiation.effect = player.hor.radiation.amount.pow(1.2).add(1)
        player.hor.radiation.effect2 = player.hor.radiation.amount.pow(0.8).div(2).add(1)

        player.hor.radiation.toGet = player.funify.funPoints.pow(0.1).div(100)

        player.hor.radiation.max = new Decimal(6)

        if (player.musuniverse == "AD1" && hasUpgrade("ani", 28) && player.hor.radiation.toGet.gt(1) && !player.pet.legPetTimers[0].active && player.hor.radiation.toggle) {
            player.hor.radiation.current = player.hor.radiation.current.sub(delta)
        }
        if (player.hor.radiation.current.lt(0)) {
            makeShinies(hopeRadiation, new Decimal(1))
            player.hor.radiation.current = player.hor.radiation.max
        }

        //essence
        player.hor.essence.req = Decimal.mul("1e100000", Decimal.pow("1e75000", player.hor.essence.amount.mul(2.25)))
        player.hor.essence.req2 = player.hor.essence.amount.add(1).pow(Decimal.add(10, player.hor.essence.amount.mul(4))).mul("1e60")

        player.hor.essence.effect = player.hor.essence.amount.mul(2).pow(3).add(1)
        player.hor.essence.effect2 = Decimal.div(1, player.hor.essence.amount.pow(0.5).div(10).add(1))
    },
    hopeEssenceReset() {
        layers.en.enhanceReset()

        player.sr.particleClick = new Decimal(0)

        player.tr.radiation.amount = new Decimal(0)
        player.tr.buyables[11] = new Decimal(0)
        player.tr.buyables[12] = new Decimal(0)
        player.tr.buyables[13] = new Decimal(0)
        player.tr.buyables[14] = new Decimal(0)
        player.tr.buyables[15] = new Decimal(0)
        player.tr.buyables[16] = new Decimal(0)
        player.tr.buyables[17] = new Decimal(0)
        player.tr.buyables[18] = new Decimal(0)
        player.tr.buyables[19] = new Decimal(0)

        player.sr.radiation.amount = new Decimal(0)
        player.sr.spaceDecay = new Decimal(0)
        player.sr.generators.amount[0] = new Decimal(0)
        player.sr.generators.amount[1] = new Decimal(0)
        player.sr.generators.amount[2] = new Decimal(0)
        player.sr.generators.amount[3] = new Decimal(0)
        player.sr.buyables[1] = new Decimal(0)
        player.sr.buyables[2] = new Decimal(0)
        player.sr.buyables[3] = new Decimal(0)
        player.sr.buyables[4] = new Decimal(0)

        for (let i = 0; i < player.sr.generators.amount.length; i++) {
            player.sr.generators.amount[i] = new Decimal(0)
        }

        player.mr.radiation.amount = new Decimal(0)
        player.mr.particleClick = new Decimal(0)

        player.hr.radiation.amount = new Decimal(0)
        player.hr.particleClick = new Decimal(0)

        player.dec.decay = new Decimal(0)
        player.dec.stability = new Decimal(0)
        player.dec.carbon14 = new Decimal(0)
        player.dec.nitrogen14 = new Decimal(0)
        player.dec.magnesium28 = new Decimal(0)
        player.dec.aluminum28 = new Decimal(0)
        player.dec.silicon28 = new Decimal(0)

        player.dec.dysprosium154 = new Decimal(0)
        player.dec.gadolinium150 = new Decimal(0)
        player.dec.samarium146 = new Decimal(0)
        player.dec.neodymium142 = new Decimal(0)

        player.subtabs["dec"]["stuff"] = "Main"

        player.dec.buyables[11] = new Decimal(0)
        player.dec.buyables[12] = new Decimal(0)
        player.dec.buyables[13] = new Decimal(0)
        player.dec.buyables[14] = new Decimal(0)
        player.dec.buyables[21] = new Decimal(0)
        player.dec.buyables[22] = new Decimal(0)
        player.dec.buyables[23] = new Decimal(0)
        player.dec.buyables[24] = new Decimal(0)
        player.dec.buyables[31] = new Decimal(0)
        player.dec.buyables[32] = new Decimal(0)
        player.dec.buyables[33] = new Decimal(0)
        player.dec.buyables[34] = new Decimal(0)
        player.dec.buyables[35] = new Decimal(0)
        player.dec.buyables[36] = new Decimal(0)

        player.dec.electrons = new Decimal(0)
        player.dec.alphaParticles = new Decimal(0)

        player.dec.buyables[41] = new Decimal(0)
        player.dec.buyables[42] = new Decimal(0)
        player.dec.buyables[43] = new Decimal(0)
        player.dec.buyables[44] = new Decimal(0)
        player.dec.buyables[45] = new Decimal(0)
        player.dec.buyables[46] = new Decimal(0)
        player.dec.buyables[47] = new Decimal(0)
        player.dec.buyables[48] = new Decimal(0)
        player.dec.buyables[49] = new Decimal(0)
        player.dec.buyables[51] = new Decimal(0)
        player.dec.buyables[52] = new Decimal(0)
        player.dec.buyables[53] = new Decimal(0)
        player.dec.buyables[54] = new Decimal(0)
        player.dec.buyables[55] = new Decimal(0)
        player.dec.buyables[56] = new Decimal(0)
        player.dec.buyables[57] = new Decimal(0)
        player.dec.buyables[58] = new Decimal(0)
        player.dec.buyables[59] = new Decimal(0)

        player.ani.darkRadiation = new Decimal(0)
        player.ani.radiation.red.amount = new Decimal(0)
        player.ani.radiation.orange.amount = new Decimal(0)
        player.ani.radiation.yellow.amount = new Decimal(0)
        player.ani.radiation.green.amount = new Decimal(0)
        player.ani.radiation.blue.amount = new Decimal(0)
        player.ani.radiation.violet.amount = new Decimal(0)

        player.ani.buyables[11] = new Decimal(0)
        player.ani.buyables[12] = new Decimal(0)
        player.ani.buyables[13] = new Decimal(0)
        player.ani.buyables[14] = new Decimal(0)

        layers.le.starmetalReset();
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h3>Reset MOST previous Alt-Dark U1 content and an enhance point level reset for hope essence.<br><h2>" + format(player.cp.replicantiPoints) + "/" + format(player.hor.essence.req) + " Replicanti Points</h2><h2><br>" + format(player.ani.darkRadiation) + "/" + format(player.hor.essence.req2) + " Dark Radiation</h2>" },
            canClick() { return player.cp.replicantiPoints.gte(player.hor.essence.req) && player.ani.darkRadiation.gte(player.hor.essence.req2) },
            unlocked() { return true },
            onClick() {
                player.hor.essence.amount = player.hor.essence.amount.add(1)
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        layers.hor.hopeEssenceReset();
                    }, 100*i)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "800px", minHeight: "125px", borderRadius: "15px", color: "white", border: "2px solid #ffde55", fontSize: "9px", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
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
            requirementDescription: "1 Hope Essence",
            effectDescription() { return "Unlock an effect for replicanti points and generate 100% of apathy per second. Also unlock more enhance content." },
            done() { return player.hor.essence.amount.gte(1) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ffde55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("hor", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#685a21"}
                return look
            },
        },
        12: {
            requirementDescription: "2 Hope Essence",
            effectDescription() { return "Earn 10% of dark radiation and decay generator gain per second, and space/time radiation spawn time is halved." },
            done() { return player.hor.essence.amount.gte(2) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ffde55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("hor", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#685a21"}
                return look
            },
        },
        13: {
            requirementDescription: "3 Hope Essence",
            effectDescription() { return "Unlock a new emotion and autobuy space generators." },
            done() { return player.hor.essence.amount.gte(3) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ffde55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("hor", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#685a21"}
                return look
            },
        },
        14: {
            requirementDescription: "5 Hope Essence",
            effectDescription() { return "Earn 1% of space radiation per second, and automatically dark funify without resetting." },
            done() { return player.hor.essence.amount.gte(5) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ffde55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("hor", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#685a21"}
                return look
            },
        },
        15: {
            requirementDescription: "7 Hope Essence",
            effectDescription() { return "Earn 1% of heart radiation per second and unlock even more enhance content." },
            done() { return player.hor.essence.amount.gte(7) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ffde55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("hor", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#685a21"}
                return look
            },
        },
        16: {
            requirementDescription: "10 Hope Essence",
            effectDescription() { return "Unlock Aniciffo's labyrinth (also requires the rage milestone)." },
            done() { return player.hor.essence.amount.gte(10) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ffde55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("hor", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#685a21"}
                return look
            },
        },
        17: {
            requirementDescription: "14 Hope Essence",
            effectDescription() { return "Autobuy all funify buyables (Doesn't require Aniciffo)." },
            done() { return player.hor.essence.amount.gte(14) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "black", border: "3px solid #ffde55", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("hor", this.id)) {look.backgroundColor = "#77bf5f"} else {look.backgroundColor = "#685a21"}
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

                    ["raw-html", () => { return "This layer is also available in Alt-Universe 1."}, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.hor.radiation.amount) + "</h3> hope radiation. (+" + format(player.hor.radiation.toGet) + "/" + formatTime(player.hor.radiation.max) + ")"}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Based on fun points)" }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts fun point gain by x<h3>" + format(player.hor.radiation.effect) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts decay gain by x<h3>" + format(player.hor.radiation.effect2) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Performs a starmetal level reset and resets funify." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
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
                    ["raw-html", () => { return "You have <h3>" + formatWhole(player.hor.essence.amount) + "</h3> hope essence."}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts space radiation gain by x<h3>" + format(player.hor.essence.effect) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Raises fourth replicanti point softcap divider by ^<h3>" + format(player.hor.essence.effect2) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ], {backgroundColor: "#685a21", border: "3px solid #ffde55", borderRadius: "13px 13px 0px 0px", width: "588px", height: "80px"}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "1", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#685a21", border: "3px solid #ffde55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 11],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "2", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#685a21", border: "3px solid #ffde55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 12],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "3", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#685a21", border: "3px solid #ffde55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 13],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "5", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#685a21", border: "3px solid #ffde55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 14],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "7", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#685a21", border: "3px solid #ffde55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 15],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "10", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#685a21", border: "3px solid #ffde55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 16],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "14", {color: "rgba(0,0,0,0.6)", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#685a21", border: "3px solid #ffde55", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 17],
                    ]],
                    ["style-row", [
                    ], {backgroundColor: "#685a21", border: "3px solid #ffde55", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "588px", height: "10px"}],
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
const hopeRadiation = {
    image: "resources/radiation/hope.png",
    time() {
        let time = new Decimal(5) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.hor.radiation.toGet) + " Hope Radiation<br>Reset Complete!</small>"})
        player.hor.radiation.amount = player.hor.radiation.amount.add(player.hor.radiation.toGet)
        for (let i = 0; i < 60; i++) {
            layers.le.starmetalReset();

            player.funify.funify = new Decimal(0)
            player.funify.funPoints = new Decimal(0)

            player.funify.buyables[11] = new Decimal(0)
            player.funify.buyables[12] = new Decimal(0)
            player.funify.buyables[13] = new Decimal(0)
            player.funify.buyables[14] = new Decimal(0)
            player.funify.buyables[15] = new Decimal(0)
            player.funify.buyables[16] = new Decimal(0)
        }
        Vue.delete(particles, this.id)
    },
        onHover(){
        if (player.ani.hover) {
        makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.hor.radiation.toGet) + " Hope Radiation<br>Reset Complete!</small>"})
        player.hor.radiation.amount = player.hor.radiation.amount.add(player.hor.radiation.toGet)
        for (let i = 0; i < 60; i++) {
            layers.le.starmetalReset();

            player.funify.funify = new Decimal(0)
            player.funify.funPoints = new Decimal(0)

            player.funify.buyables[11] = new Decimal(0)
            player.funify.buyables[12] = new Decimal(0)
            player.funify.buyables[13] = new Decimal(0)
            player.funify.buyables[14] = new Decimal(0)
            player.funify.buyables[15] = new Decimal(0)
            player.funify.buyables[16] = new Decimal(0)
        }
        Vue.delete(particles, this.id)
        }
    }
}