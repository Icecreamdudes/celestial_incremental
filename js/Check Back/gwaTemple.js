addLayer("gwaTemple", {
    name: "Gwa Temple", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/gwa.png' style='width:50px;height:50px;border-radius:25px;margin:-25px;transform:translate(0, -12px)'></img>", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        gwaPoints: new Decimal(0),
        gwaPointsGain: new Decimal(0),
        gwaPointsEffect: new Decimal(1),

        worship: false,
        gwaWorshipTime: new Decimal(0),
        gwaWorshipCooldown: new Decimal(0),
        gwaWorshipCooldownMax: new Decimal(10),
        timeSinceGwarship: new Decimal(0),

        gwank: new Decimal(0),
        gwankGet: new Decimal(1),
        gwankReq: new Decimal(5000),
        highestGwank: new Decimal(0),
        gwankEffect: new Decimal(1),

        gwanker: new Decimal(0),
        gwankerGet: new Decimal(1),
        gwankerReq: new Decimal(10),
        highestGwanker: new Decimal(0),
        gwankerEffect: new Decimal(1),

        gwankest: new Decimal(0),
        gwankestGet: new Decimal(1),
        gwankestReq: new Decimal(10),
        highestGwankest: new Decimal(0),
        gwankestEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "#fff",
            backgroundOrigin: "border-box",
            borderColor: "#763",
        };
    },
    tooltip: "Gwa Temple",
    color: "#ffb",
    update(delta) {
        let onepersec = new Decimal(1)

        // GWA POINTS
        let gwaAmt = new Decimal(3)/*getLevelableAmount("pet", 101).add(getLevelableTier("pet", 101).mul(5).min(40))*/
        player.gwaTemple.gwaPointsGain = gwaAmt.add(1).log(2).div(6)

        if (hasUpgrade("gwaTemple", 1)) player.gwaTemple.gwaPointsGain = player.gwaTemple.gwaPointsGain.mul(2)
        if (hasUpgrade("gwaTemple", 3)) player.gwaTemple.gwaPointsGain = player.gwaTemple.gwaPointsGain.mul(upgradeEffect("gwaTemple", 3))
        if (hasUpgrade("gwaTemple", 4)) player.gwaTemple.gwaPointsGain = player.gwaTemple.gwaPointsGain.mul(upgradeEffect("gwaTemple", 4))
        if (hasUpgrade("gwaTemple", 6)) player.gwaTemple.gwaPointsGain = player.gwaTemple.gwaPointsGain.mul(4)
        if (hasUpgrade("gwaTemple", 11)) player.gwaTemple.gwaPointsGain = player.gwaTemple.gwaPointsGain.mul(4)
        player.gwaTemple.gwaPointsGain = player.gwaTemple.gwaPointsGain.mul(player.gwaTemple.gwankEffect)

        player.gwaTemple.gwaPointsEffect = hasUpgrade("gwaTemple", 5) ? player.gwaTemple.gwaPoints.add(1).log(10).pow(0.5).div(20).add(1) : new Decimal(1)

        // GWANK
        let gwankDiv = new Decimal(1)
        if (hasUpgrade("gwaTemple", 15)) gwankDiv = gwankDiv.mul(2)

        player.gwaTemple.gwankReq = layers.h.hexReq(player.gwaTemple.gwank, 5000, 1.5, gwankDiv)
        player.gwaTemple.gwankGet = false ? layers.h.hexGain(player.gwaTemple.gwaPoints, 5000, 1.5, gwankDiv).sub(player.gwaTemple.gwank) : new Decimal(1)

        player.gwaTemple.gwankEffect = player.gwaTemple.gwank.div(2).add(1).pow(1.05).pow(player.gwaTemple.gwankerEffect)

        // GWANKER
        let gwankerDiv = new Decimal(1)

        player.gwaTemple.gwankerReq = layers.h.hexReq(player.gwaTemple.gwanker, 10, 1.45, gwankerDiv)
        player.gwaTemple.gwankerGet = false ? layers.h.hexGain(player.gwaTemple.gwank, 10, 1.45, gwankerDiv).sub(player.gwaTemple.gwanker) : new Decimal(1)

        player.gwaTemple.gwankerEffect = player.gwaTemple.gwanker.div(2).add(1).pow(0.5).pow(player.gwaTemple.gwankestEffect)

        // GWANKEST
        let gwankestDiv = new Decimal(1)

        player.gwaTemple.gwankestReq = layers.h.hexReq(player.gwaTemple.gwankest, 10, 1.4, gwankestDiv)
        player.gwaTemple.gwankestGet = false ? layers.h.hexGain(player.gwaTemple.gwanker, 10, 1.4, gwankestDiv).sub(player.gwaTemple.gwankest) : new Decimal(1)

        player.gwaTemple.gwankestEffect = player.gwaTemple.gwankest.div(5).add(1).pow(0.3)

        // GWARSHIP
        player.gwaTemple.timeSinceGwarship = player.gwaTemple.timeSinceGwarship.add(delta)
        if (player.gwaTemple.worship) {
            player.gwaTemple.gwaWorshipTime = player.gwaTemple.gwaWorshipTime.add(delta)
            player.gwaTemple.gwaWorshipCooldown = player.gwaTemple.gwaWorshipCooldown.add(delta)
        }

        player.gwaTemple.gwaWorshipCooldownMax = new Decimal(10)
        if (hasUpgrade("gwaTemple", 2)) player.gwaTemple.gwaWorshipCooldownMax = player.gwaTemple.gwaWorshipCooldownMax.div(1.25)
        if (hasUpgrade("gwaTemple", 8)) player.gwaTemple.gwaWorshipCooldownMax = player.gwaTemple.gwaWorshipCooldownMax.div(1.6)
        if (hasUpgrade("gwaTemple", 11)) player.gwaTemple.gwaWorshipCooldownMax = player.gwaTemple.gwaWorshipCooldownMax.mul(2)
        if (hasUpgrade("gwaTemple", 14)) player.gwaTemple.gwaWorshipCooldownMax = player.gwaTemple.gwaWorshipCooldownMax.div(2)

        if (player.gwaTemple.gwaWorshipCooldown.gte(player.gwaTemple.gwaWorshipCooldownMax)) {
            player.gwaTemple.gwaWorshipCooldown = new Decimal(0)
            player.gwaTemple.timeSinceGwarship = new Decimal(0)
            let gain = player.gwaTemple.gwaPointsGain
            if (hasUpgrade("gwaTemple", 7) && Math.random() < 0.1) gain = gain.mul(10)
            player.gwaTemple.gwaPoints = player.gwaTemple.gwaPoints.add(gain)
            makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {x: mouseX-80+(Math.random()*10), text: "+" + formatSimple(gain), style: {color: "#ffb"}})
        }
    },
    clickables: {
        11: {
            title() {return "Reset previous gwagress, but gwank up.<br><small>Req: " + format(player.gwaTemple.gwankReq) + " Gwa Points</small>"},
            canClick() { return player.gwaTemple.gwaPoints.gte(player.gwaTemple.gwankReq) },
            unlocked() { return true },
            onClick() {
                player.gwaTemple.gwank = player.gwaTemple.gwank.add(player.gwaTemple.gwankGet)

                if (player.gwaTemple.gwank.gt(player.gwaTemple.highestGwank)) player.gwaTemple.highestGwank = player.gwaTemple.gwank

                player.gwaTemple.gwaPoints = new Decimal(0)
                player.gwaTemple.gwaPointsGain = new Decimal(0)
                player.gwaTemple.gwaWorshipCooldown = new Decimal(0)
                player.gwaTemple.timeSinceGwarship = new Decimal(0)
                for (let i = 0; i < player.gwaTemple.upgrades.length; i++) {
                    if (+player.gwaTemple.upgrades[i] < 13) {
                        if (+player.gwaTemple.upgrades[i] == 12) continue
                        player.gwaTemple.upgrades.splice(i, 1);
                        i--;
                    }
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "75px", borderRadius: "0px 17px 17px 0px", color: "black", border: "3px solid rgba(0,0,0,0.3)", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bb9" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        12: {
            title() {return "Reset previous gwagress, but gwanker up.<br><small>Req: " + format(player.gwaTemple.gwankerReq) + " Gwanks</small>"},
            canClick() { return player.gwaTemple.gwank.gte(player.gwaTemple.gwankerReq) },
            unlocked() { return true },
            onClick() {
                player.gwaTemple.gwanker = player.gwaTemple.gwanker.add(player.gwaTemple.gwankerGet)

                if (player.gwaTemple.gwanker.gt(player.gwaTemple.highestGwanker)) player.gwaTemple.highestGwanker = player.gwaTemple.gwanker

                player.gwaTemple.gwaPoints = new Decimal(0)
                player.gwaTemple.gwaPointsGain = new Decimal(0)
                player.gwaTemple.gwaWorshipCooldown = new Decimal(0)
                player.gwaTemple.timeSinceGwarship = new Decimal(0)
                for (let i = 0; i < player.gwaTemple.upgrades.length; i++) {
                    if (+player.gwaTemple.upgrades[i] < 13) {
                        if (+player.gwaTemple.upgrades[i] == 12) continue
                        player.gwaTemple.upgrades.splice(i, 1);
                        i--;
                    }
                }
                player.gwaTemple.gwank = new Decimal(0)
                player.gwaTemple.gwankGet = new Decimal(0)
                player.gwaTemple.gwankEffect = new Decimal(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "75px", borderRadius: "0px 17px 17px 0px", color: "black", border: "3px solid rgba(0,0,0,0.3)", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bb9" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        13: {
            title() {return "Reset previous gwagress, but gwankest up.<br><small>Req: " + format(player.gwaTemple.gwankestReq) + " Gwankers</small>"},
            canClick() { return player.gwaTemple.gwanker.gte(player.gwaTemple.gwankestReq) },
            unlocked() { return true },
            onClick() {
                player.gwaTemple.gwankest = player.gwaTemple.gwankest.add(player.gwaTemple.gwankestGet)

                if (player.gwaTemple.gwankest.gt(player.gwaTemple.highestGwankest)) player.gwaTemple.highestGwankest = player.gwaTemple.gwankest

                player.gwaTemple.gwaPoints = new Decimal(0)
                player.gwaTemple.gwaPointsGain = new Decimal(0)
                player.gwaTemple.gwaWorshipCooldown = new Decimal(0)
                player.gwaTemple.timeSinceGwarship = new Decimal(0)
                for (let i = 0; i < player.gwaTemple.upgrades.length; i++) {
                    if (+player.gwaTemple.upgrades[i] < 13) {
                        if (+player.gwaTemple.upgrades[i] == 12) continue
                        player.gwaTemple.upgrades.splice(i, 1);
                        i--;
                    }
                }
                player.gwaTemple.gwank = new Decimal(0)
                player.gwaTemple.gwankGet = new Decimal(0)
                player.gwaTemple.gwankEffect = new Decimal(1)
                player.gwaTemple.gwanker = new Decimal(0)
                player.gwaTemple.gwankerGet = new Decimal(0)
                player.gwaTemple.gwankerEffect = new Decimal(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "75px", borderRadius: "0px 17px 17px 0px", color: "black", border: "3px solid rgba(0,0,0,0.3)", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bb9" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    upgrades: {
        1: {
            title: "Gwanset",
            unlocked: true,
            description: "Double gwa point gain.",
            cost() {return new Decimal(0.5)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        2: {
            title: "Untrained Gwarshipper",
            unlocked: true,
            description: "Reduce gwarship time by /1.25.",
            cost() {return new Decimal(1.2)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        3: {
            title: "Gwantifiable",
            unlocked: true,
            description: "Multiply Gwa Points based on amount of Gwapgrades.",
            cost() {return new Decimal(1.5)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            effect() {
                if (hasUpgrade("gwaTemple", 9)) return Decimal.div(player.gwaTemple.upgrades.length, 4).add(1)
                return Decimal.div(player.gwaTemple.upgrades.length, 5).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        4: {
            title: "Gwanception",
            unlocked: true,
            description: "Gwa points effect gwa point gain.",
            cost() {return new Decimal(3)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            effect() {
                if (hasUpgrade("gwaTemple", 13)) return player.gwaTemple.gwaPoints.add(1).log(3).add(1)
                return player.gwaTemple.gwaPoints.add(1).log(10).add(1)
            },
            effectDisplay() { return "x" + formatSimple(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        5: {
            title: "Heard Gwayers",
            unlocked: true,
            description: "Unlock a gwa point effect.",
            cost() {return new Decimal(6)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        6: {
            title: "Gwad Gains",
            unlocked: true,
            description: "Gwad gwa point gain.",
            cost() {return new Decimal(15)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        7: {
            title: "Gwambling",
            unlocked: true,
            description: "Gain a 10% chance to gain x10 gwa points when gwarshipping",
            cost() {return new Decimal(77)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        8: {
            title: "Novice Gwarshipper",
            unlocked: true,
            description: "Reduce gwarship time by /1.6.",
            cost() {return new Decimal(200)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        9: {
            title: "Gwaint Improvement",
            unlocked: true,
            description: "Slightly improve \"Gwantifiable\"'s effect.",
            cost() {return new Decimal(300)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        10: {
            title: "Crate Gwance",
            unlocked: true,
            description: "Increase crate roll chance by +10%.",
            cost() {return new Decimal(600)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        11: {
            title: "Charged Gwarship",
            unlocked: true,
            description: "Double gwarship time, but gwadruple gwa point gain.",
            cost() {return new Decimal(1200)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        12: {
            title: "Gwankup",
            unlocked: true,
            description: "Unlock gwanks.",
            cost() {return new Decimal(2500)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        13: {
            title: "Gwaditional",
            unlocked: true,
            description: "Improve \"Gwanception\".",
            cost() {return new Decimal(7500)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        14: {
            title: "Apprentice Gwarshiper",
            unlocked: true,
            description: "Reduce gwarship time by /2.",
            cost() {return new Decimal(20000)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        15: {
            title: "Gwanked Match",
            unlocked: true,
            description: "Halve gwank requirement.",
            cost() {return new Decimal(30000)},
            currencyLocation() { return player.gwaTemple },
            currencyDisplayName: "Gwa Points",
            currencyInternalName: "gwaPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", margin: "2px", borderRadius: "15px"},
        },
        // Reduce gwarship time based on time since last gwarship
        // Buff gwankers based on gwa points (Reversal)
        // Gwank effect is based on best gwanks
        // Boost gwa points based on total gwarship time
        // Gain passive gwarship time (WAY LATER ON)
    },
    branches: ["cb"],
    microtabs: {
        Tabs: {
            "Gwapgrades": {
                buttonStyle() { return { color: "#ffb", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["always-scroll-column", [
                        ["blank", "2px"],
                        ["row", [
                            ["upgrade", 1], ["upgrade", 2], ["upgrade", 3],
                            ["upgrade", 4], ["upgrade", 5], ["upgrade", 6],
                            ["upgrade", 7], ["upgrade", 8], ["upgrade", 9],
                            ["upgrade", 10], ["upgrade", 11], ["upgrade", 12],
                            ["upgrade", 13], ["upgrade", 14], ["upgrade", 15],
                        ]],
                        ["blank", "2px"],
                    ], {width: "394px", height: "651px"}],
                ]
            },
            "Gwarks": {
                buttonStyle() { return { color: "#ffb", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["always-scroll-column", [

                    ], {width: "394px", height: "651px"}],
                ]
            },
            "Gwallenges": {
                buttonStyle() { return { color: "#ffb", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["always-scroll-column", [

                    ], {width: "394px", height: "651px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => { return "You have <h3>" + format(player.gwaTemple.gwaPoints) + "</h3> gwa points" }, {color: "#ffb", fontSize: "24px", fontFamily: "monospace" }],
            ["raw-html", () => { return "(+" + format(player.gwaTemple.gwaPointsGain) + ")"}, {color: "#ffb", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => {return hasUpgrade("gwaTemple", 5) ? "Boosts gwa pet effects by ^" + formatSimple(player.gwaTemple.gwaPointsEffect, 3) : ""}, {color: "#ffb", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => {return getLevelableAmount("pet", 1101).gt(0) ? "[Based on gwa levels and ascensions]" : "[Based on gwa levels]"}, {color: "#ffb", fontSize: "16px", fontFamily: "monospace"}],
        ["blank", "25px"],
        ["style-row", [
            ["style-column", [
                ["style-row", [
                    ["raw-html", "<button id='bigCookie' class='bigCookie gwa' onmousedown='player.gwaTemple.worship=true;event.preventDefault()' onmouseup='player.gwaTemple.worship=false' onmouseleave='player.gwaTemple.worship=false' ontouchstart='player.gwaTemple.worship=true' ontouchend='player.gwaTemple.worship=false' ontouchcancel='player.gwaTemple.worship=false' onclick=''>"],
                ], () => {return {width: "294px", height: "394px", background: `linear-gradient(to top, #ffb ${format(player.gwaTemple.gwaWorshipCooldown.div(player.gwaTemple.gwaWorshipCooldownMax).mul(100).min(100))}%, #bb9 ${format(player.gwaTemple.gwaWorshipCooldown.div(player.gwaTemple.gwaWorshipCooldownMax).mul(100).add(0.25).min(100))}%)`, border: "3px solid #29291a", borderRadius: "20px"}}],
                ["style-row", [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "Gwank " + formatWhole(player.gwaTemple.gwank)}, {color: "#ffb", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return false ? "<small style='margin-left:10px'>(+" + formatWhole(player.gwaTemple.gwankGet) + ")</small>" : ""}, () => {
                                let look = {color: "#ffb", fontSize: "20px", fontFamily: "monospace"}
                                player.gwaTemple.gwankGet.gt(0) ? look.color = "#ffb" : look.color = "#886"
                                return look
                            }],
                        ]],
                        ["raw-html", () => { return "x" + formatSimple(player.gwaTemple.gwankEffect) + " Gwa Points" }, {color: "#ffb", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "197px", height: "75px", borderRight: "3px solid #29291a"}],
                    ["clickable", 11],
                ], () => {return hasUpgrade("gwaTemple", 12) || player.gwaTemple.highestGwank.gt(0) ? {width: "350px", height: "75px", background: "#525234", border: "3px solid #29291a", borderRadius: "20px", marginTop: "10px"}: {display: "none !important"}}],
                ["style-row", [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "Gwank " + formatWhole(player.gwaTemple.gwanker)}, {color: "#ffb", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return false ? "<small style='margin-left:10px'>(+" + formatWhole(player.gwaTemple.gwankerGet) + ")</small>" : ""}, () => {
                                let look = {color: "#ffb", fontSize: "20px", fontFamily: "monospace"}
                                player.gwaTemple.gwankerGet.gt(0) ? look.color = "#ffb" : look.color = "#886"
                                return look
                            }],
                        ]],
                        ["raw-html", () => { return "^" + formatSimple(player.gwaTemple.gwankerEffect) + " Gwank Effect" }, {color: "#ffb", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "197px", height: "75px", borderRight: "3px solid #29291a"}],
                    ["clickable", 12],
                ], () => {return false || player.gwaTemple.highestGwanker.gt(0) ? {width: "350px", height: "75px", background: "#525234", border: "3px solid #29291a", borderRadius: "20px", marginTop: "10px"}: {display: "none !important"}}],
                ["style-row", [
                    ["style-column", [
                        ["row", [
                            ["raw-html", () => {return "Gwankest " + formatWhole(player.gwaTemple.gwankest)}, {color: "#ffb", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", () => {return false ? "<small style='margin-left:10px'>(+" + formatWhole(player.gwaTemple.gwankestGet) + ")</small>" : ""}, () => {
                                let look = {color: "#ffb", fontSize: "20px", fontFamily: "monospace"}
                                player.gwaTemple.gwankestGet.gt(0) ? look.color = "#ffb" : look.color = "#886"
                                return look
                            }],
                        ]],
                        ["raw-html", () => { return "^" + formatSimple(player.gwaTemple.gwankestEffect) + " Gwanker Effect" }, {color: "#ffb", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "197px", height: "75px", borderRight: "3px solid #29291a"}],
                    ["clickable", 13],
                ], () => {return false || player.gwaTemple.highestGwankest.gt(0) ? {width: "350px", height: "75px", background: "#525234", border: "3px solid #29291a", borderRadius: "20px", marginTop: "10px"}: {display: "none !important"}}],
            ], {width: "400px", height: "694px"}],
            ["top-column", [
                ["style-row", [
                    ["category-button", [() => {return "Gwapgrades"}, "Tabs", "Gwapgrades"], {width: "129px", height: "40px", background: "#414129", borderRadius: "17px 0 0 0"}],
                    ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#29291a"}],
                    ["category-button", [() => {return "Gwarks"}, "Tabs", "Gwarks", () => {return true}], {width: "130px", height: "40px", background: "#414129"}],
                    ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#29291a"}],
                    ["category-button", [() => {return "Gwallenges"}, "Tabs", "Gwallenges", () => {return true}], {width: "129px", height: "40px", background: "#414129", borderRadius: "0 17px 0 0"}],
                ], {width: "394px", height: "40px", borderBottom: "3px solid #29291a"}],
                ["buttonless-microtabs", "Tabs", { 'border-width': '0px' }],
            ], {width: "394px", height: "694px", background: "#525234", border: "3px solid #29291a", borderRadius: "20px 20px 0 20px"}],
        ], {width: "800px", height: "700px"}],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && player.po.gwaTemple },
})