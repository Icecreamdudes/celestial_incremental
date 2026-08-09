addLayer("db", {
    name: "Boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "D1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    universe: "D1",
    startData() { return {
        unlocked: true,

        bestBoosters: new Decimal(0),
        boosters: new Decimal(0),
        boosterEffect: new Decimal(0),
        boosterReq: new Decimal(1e9),
        boosterReqDivisor: new Decimal(1),
        boosterReqRoot: new Decimal(1),
        boosterBulk: new Decimal(1),

        //milestones
        milestone1Effect: new Decimal(1),
        milestone2Effect: new Decimal(1),
        milestone4Effect: new Decimal(1),
        milestone8Effect: new Decimal(1),
        milestone9Effect: new Decimal(1),

        permaMilestone4Effect: new Decimal(1),

        milestoneTab: 0,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #6e64c4 0%,rgb(86, 84, 192) 50%,rgb(37, 101, 153) 100%)",
            "background-origin": "border-box",
            "border-color": "#9f98d4",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Boosters",
    branches: [["dp", "#309"]],
    color: "#6e64c4",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.db.boosters.lt(3)) player.db.boosterReq = Decimal.pow(4, player.db.boosters.add(1)).mul(1e8).floor()
        if (player.db.boosters.gte(3)) player.db.boosterReq = Decimal.pow(6, player.db.boosters.pow(1.25).add(1)).mul(1e10).floor()
        if (player.db.boosters.gte(7)) player.db.boosterReq = Decimal.pow(9, player.db.boosters.pow(1.4).add(1)).mul(1e10).floor()

        player.db.boosterReqDivisor = new Decimal(1)
        player.db.boosterReqRoot = new Decimal(1)
        if (getLevelableTier("pu", 109, true)) player.db.boosterReqDivisor = player.db.boosterReqDivisor.mul(levelableEffect("pu", 109)[0])
        if (getLevelableTier("pu", 109, true)) player.db.boosterReqDivisor = player.db.boosterReqDivisor.mul(levelableEffect("pu", 109)[1])
        if (getLevelableTier("pu", 208, true)) player.db.boosterReqDivisor = player.db.boosterReqDivisor.mul(levelableEffect("pu", 208)[0])
        if (getLevelableTier("pu", 208, true)) player.db.boosterReqDivisor = player.db.boosterReqDivisor.mul(buyableEffect("dp", 16))
        if (getLevelableTier("pu", 307, true)) player.db.boosterReqDivisor = player.db.boosterReqDivisor.mul(levelableEffect("pu", 307)[0])
        player.db.boosterReqDivisor = player.db.boosterReqDivisor.mul(buyableEffect("dgj", 13))
        if (hasUpgrade("sma", 207)) player.db.boosterReqDivisor = player.db.boosterReqDivisor.mul(upgradeEffect("sma", 207))
        player.db.boosterReqDivisor = player.db.boosterReqDivisor.div(levelableEffect("car", 405)[0])
    
        player.db.boosterReqRoot = player.db.boosterReqRoot.div(buyableEffect("dv", 13))
    
        player.db.boosterBulk = player.du.points.pow(player.db.boosterReqRoot).add(1).div(1e8).mul(player.db.boosterReqDivisor).log(4).sub(player.db.boosters).max(0).floor();
        if (player.db.boosters.add(player.db.boosterBulk).gte(3)) player.db.boosterBulk = player.du.points.pow(player.db.boosterReqRoot).add(1).div(1e10).mul(player.db.boosterReqDivisor).log(6).sub(1).root(1.25).add(1).sub(player.db.boosters).max(new Decimal(3).sub(player.db.boosters)).max(0).floor();
        if (player.db.boosters.add(player.db.boosterBulk).gte(7)) player.db.boosterBulk = player.du.points.pow(player.db.boosterReqRoot).add(1).div(1e10).mul(player.db.boosterReqDivisor).log(9).sub(1).root(1.4).add(1).sub(player.db.boosters).max(new Decimal(7).sub(player.db.boosters)).max(0).floor();
        if (!hasUpgrade("dv", 13)) player.db.boosterBulk = player.db.boosterBulk.min(1);

        player.db.boosterReq = player.db.boosterReq.div(player.db.boosterReqDivisor).root(player.db.boosterReqRoot)
        if (player.db.boosters.gte(100)) { 
            player.db.boosterReq = player.db.boosterReq.pow(player.db.boosters.sub(100).mul(0.05).add(1))
        }

        player.db.boosterEffect = Decimal.pow(5, player.db.boosters)
        if (hasUpgrade("dv", 12)) player.db.boosterEffect = player.db.boosterEffect.pow(player.dgr.grassEclipseEffect);
        player.db.boosterEffect = player.db.boosterEffect.pow(buyableEffect("dt", 12))

        if (player.db.boosters.gt(player.db.bestBoosters)) { 
            player.db.bestBoosters = player.db.boosters
        }

        player.db.milestone1Effect = Decimal.pow(100, player.db.boosters.pow(0.75))
        player.db.milestone2Effect = player.du.points.add(1).pow(0.15).div(30).add(1)
        player.db.milestone4Effect = player.db.boosters.sub(11).max(0).pow(0.666).pow_base(2.5)
        player.db.milestone8Effect = player.sma.starmetalAlloy.div(1e10).add(1).log(10).pow(2).div(100).add(1)
        player.db.milestone9Effect = player.pet.eclipseTimerTickspeedDivisor

        player.db.permaMilestone4Effect = player.db.bestBoosters.sub(12).pow(0.35).div(10).add(1)
    },
    bars: {},
    clickables: {
        1: {
            title() { return "<h3>Reset on Universe Reset</h3>" },
            canClick() { return player.db.milestoneTab == 1 },
            unlocked() { return true },
            onClick() { player.db.milestoneTab = 0 },
            onHold() {},
            style() {
                let look = {width: "294px", minHeight: "50px", borderRadius: "10px 0px 0px 0px", border: "3px solid #0000003f", color: "white"}
                if (this.canClick()) {
                    look.backgroundColor = "#6e64c4"
                } else {
                    look.backgroundColor =  "#363161"
                }
                return look
            }
        },
        2: {
            title() { return "<h3>Permanent</h3>" },
            canClick() { return player.db.milestoneTab == 0 },
            unlocked() { return true },
            onClick() { player.db.milestoneTab = 1 },
            onHold() {},
            style() {
                let look = {width: "294px", minHeight: "50px", borderRadius: "0px 10px 0px 0px", border: "3px solid #0000003f", color: "white"}
                if (this.canClick()) {
                    look.backgroundColor = "#6e64c4"
                } else {
                    look.backgroundColor =  "#363161"
                }
                return look
            }
        },
        11: {
            title() { return "<h2>Reset previous content for boosters.<br>Req: " + format(player.db.boosterReq) + " points</h2>" },
            canClick() { return player.du.points.gte(player.db.boosterReq) && !player.dg.generatorResetSafety},
            unlocked() { return true },
            onClick() {
                player.db.boosters = player.db.boosters.add(player.db.boosterBulk)
                player.db.boosterBulk = new Decimal(0)

                player.dg.generatorResetSafety = true

                layers.dg.generatorReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #6e64c4", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    upgrades: {},
    buyables: {},
    milestones: {
        11: {
            requirementDescription: "1 Booster",
            effectDescription() { return "Boosters divide the eclipse shard requirement.<br>Currently: /" + format(player.db.milestone1Effect) + "." },
            done() { return player.db.boosters.gte(1) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        12: {
            requirementDescription: "3 Boosters",
            effectDescription() { return "Point gain is boosted by itself.<br>Currently: x" + format(player.db.milestone2Effect) + "." },
            done() { return player.db.boosters.gte(3) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        13: {
            requirementDescription: "7 Boosters",
            effectDescription() { return "Boost rank points by x1000, tier points by x100, tetr points by x10." },
            done() { return player.db.boosters.gte(7) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        14: {
            requirementDescription: "12 Boosters",
            effectDescription() { return "Gain 10% of grass value per second, and boost grass value and capacity based on boosters.<br>Currently: x" + format(player.db.milestone4Effect) + "." },
            unlocked() {return player.ir.iriditeDefeated && getBuyableAmount("sme", 161).gte(1)},
            done() { return player.db.boosters.gte(12) && getBuyableAmount("sme", 161).gte(1) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        15: {
            requirementDescription: "16 Boosters",
            effectDescription() { return "Gain 100% of prestige points per second and autobuy all prestige point buyables." },
            unlocked() {return player.ir.iriditeDefeated && getBuyableAmount("sme", 161).gte(2)},
            done() { return player.db.boosters.gte(16) && getBuyableAmount("sme", 161).gte(2) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        16: {
            requirementDescription: "30 Boosters",
            effectDescription() { return "Autobuy all grass buyables." },
            unlocked() {return player.ir.iriditeDefeated && getBuyableAmount("sme", 161).gte(3)},
            done() { return player.db.boosters.gte(30) && getBuyableAmount("sme", 161).gte(3) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        17: {
            requirementDescription: "45 Boosters",
            effectDescription() { return "/2 to the eclipse timer tickspeed." },
            unlocked() { return player.lightRift.interspaceUnlocked },
            done() { return player.db.boosters.gte(45) && player.lightRift.interspaceUnlocked },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        18: {
            requirementDescription: "90 Boosters",
            effectDescription() { return "Starmetal alloy reduces the eclipse timer tickspeed.<br>Currently: /" + format(player.db.milestone8Effect) + "." },
            unlocked() { return player.lightRift.interspaceUnlocked },
            done() { return player.db.boosters.gte(90) && player.lightRift.interspaceUnlocked },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        19: {
            requirementDescription: "100 Boosters",
            effectDescription() { return "Divisors to the eclipse timer tickspeed multiply D1 tickspeed.<br>Currently: x" + format(player.db.milestone9Effect) + "." },
            unlocked() { return player.lightRift.interspaceUnlocked },
            done() { return player.db.boosters.gte(100) && player.lightRift.interspaceUnlocked },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        101: {
            requirementDescription: "1 Total Booster",
            effectDescription: "x1.25 to check back XP gain.",
            done() { return player.db.bestBoosters.gte(1) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        102: {
            requirementDescription: "5 Total Boosters",
            effectDescription: "x1.2 to starmetal alloy and eclipse shard gain.",
            done() { return player.db.bestBoosters.gte(5) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        103: {
            requirementDescription: "10 Total Boosters",
            effectDescription() {return player.matosLair.milestone[25] == 0 ? "[BUFFED FEATURE NOT UNLOCKED]" : "/1.4 to starmetal essence generator time."},
            unlocked() { return player.matosLair.milestone[25] >= 1 },
            done() { return player.db.bestBoosters.gte(10) && player.matosLair.milestone[25] >= 1 },
            unlocked() {return player.matosLair.milestone[25] >= 1},
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        104: {
            requirementDescription: "15 Total Boosters",
            effectDescription() {return player.matosLair.milestone[25] == 0 ? "[BUFFED FEATURE NOT UNLOCKED]" : "Best boosters divides star exploration times.<br>Currently: /" + format(player.db.permaMilestone4Effect) + "." },
            unlocked() { return player.matosLair.milestone[25] >= 1 },
            done() { return player.db.bestBoosters.gte(15) && player.matosLair.milestone[25] >= 1 },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        105: {
            requirementDescription: "20 Total Boosters",
            effectDescription() {return "Reduce black heart combo softcap scaling by -0.2%."},
            done() {return player.db.bestBoosters.gte(20)},
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        106: {
            requirementDescription: "30 Total Boosters",
            effectDescription() { return "/2 to the eclipse timer tickspeed.<br>"},
            unlocked() { return player.lightRift.interspaceUnlocked },
            done() { return player.db.bestBoosters.gte(30) && player.lightRift.interspaceUnlocked },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        107: {
            requirementDescription: "70 Total Boosters",
            effectDescription() { return "Increase the \"Auto-Draw Req Divider\" buyable level cap by highest boosters.<br>Currently: +" + formatWhole(player.db.bestBoosters) + "."},
            unlocked() { return player.lightRift.interspaceUnlocked },
            done() { return player.db.bestBoosters.gte(70) && player.lightRift.interspaceUnlocked },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        108: {
            requirementDescription: "85 Total Boosters",
            effectDescription() { return "x1.2 to starmetal alloy and eclipse shard gain again.<br>"},
            unlocked() { return player.lightRift.interspaceUnlocked },
            done() { return player.db.bestBoosters.gte(85) && player.lightRift.interspaceUnlocked },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("db", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
    },
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #6e64c4", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ['blank', '25px'],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + formatWhole(player.db.boosters) + "</h3> boosters." + (hasUpgrade("dv", 13) ? ("<span style='color:" + (player.db.boosterBulk.gte(1) ? "white" : "gray") + "'> (+" + formatWhole(player.db.boosterBulk) + ")</span>") : "") + (player.db.boosters.gte(100) ? "<small><span style='color:red'> [SOFTCAPPED]</span></small>" : "")}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ]],
                    ["raw-html", () => {return "(Best boosters: " + formatWhole(player.db.bestBoosters) + ")"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Boosts point gain by x" + format(player.db.boosterEffect)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ['blank', '25px'],
                    ["row", [["clickable", 11]]],
                    ['blank', '25px'],
                ]
            },
            "Milestones": {
                buttonStyle() { return { border: "2px solid #6e64c4", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ['blank', '25px'],
                    ["row", [
                        ["style-column", [
                            ["style-row", [
                                ["clickable", 1], ["clickable", 2],
                            ], {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRadius: "13px 13px 0px 0px", width: "588px", height: "50px"}],
                            
                            // RESET ON UNIVERSE RESET
                            ["style-column", [
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "1", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[11].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 11],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "3", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[12].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 12],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "7", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[13].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 13],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "12", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[14].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 14],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "16", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[15].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 15],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "30", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[16].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 16],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "45", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[17].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 17],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "90", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[18].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 18],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "100", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[19].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 19],
                            ]],
                            ], () => {return player.db.milestoneTab == 0 ? {} : {display: "none !important"}}],

                            // PERMANENT
                            ["style-column", [
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "1", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[101].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 101],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "5", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[102].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 102],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "10", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[103].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 103],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "15", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[104].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 104],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "20", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[105].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 105],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "30", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[106].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 106],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "70", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[107].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 107],
                            ]],
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", "85", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                                ], () => {
                                    let look =  {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}
                                    look.display = tmp.db.milestones[108].unlocked ? "" : "none !important"
                                    return look
                                }],
                                ["titleless-milestone", 108],
                            ]],
                            ], () => {return player.db.milestoneTab == 1 ? {} : {display: "none !important"}}],
                            ["style-row", [
                            ], {backgroundColor: "#6e64c4", border: "3px solid #9f98d4", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "588px", height: "15px"}],
                        ]],
                        ['blank', '25px'],
                    ]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace" }],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace" }],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ['blank', '25px'],
    ],
    layerShown() {
        return hasUpgrade("le", 101) ? true : 'ghost' 
     },
    deactivated() { return !player.sma.inStarmetalChallenge},
    hotkeys: [
        {
            key: "b", 
            description: "Reset for Boosters",
            onPress() {
                clickClickable(this.layer, 11)
            },
        },  
    ]
})