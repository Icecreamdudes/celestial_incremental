addLayer("an", {
    name: "Anonymity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AN", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        anonymity: new Decimal(0),
        anonymityToGet: new Decimal(0),
    }
    },
    automate() {
        if (hasMilestone("s", 17) && !inChallenge("fu", 11))
        {
            buyUpgrade("an", 11)
            buyUpgrade("an", 12)
            buyUpgrade("an", 13)
            buyUpgrade("an", 14)
            buyUpgrade("an", 15)
            buyUpgrade("an", 16)
            buyUpgrade("an", 17)
            buyUpgrade("an", 18)
            buyUpgrade("an", 19)
            buyUpgrade("an", 21)
            buyUpgrade("an", 22)
            buyUpgrade("an", 23)
        }
    },
    nodeStyle() {},
    tooltip: "Anonymity",
    branches: ["ar"],
    color: "#0c04c1",
    update(delta) {
        let onepersec = new Decimal(1)

        player.an.anonymityToGet = player.cp.replicantiPoints.div(250000).pow(0.25)
        if (hasUpgrade("an", 17)) player.an.anonymityToGet = player.an.anonymityToGet.mul(upgradeEffect("an", 17))
        player.an.anonymityToGet = player.an.anonymityToGet.mul(player.rt.repliTreesEffect)
        player.an.anonymityToGet = player.an.anonymityToGet.mul(buyableEffect("rg", 17))
        player.an.anonymityToGet = player.an.anonymityToGet.mul(buyableEffect("gs", 16))
        player.an.anonymityToGet = player.an.anonymityToGet.mul(player.oi.linkingPowerEffect[2])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(levelableEffect("pet", 1206)[0])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(levelableEffect("pet", 402)[1])
        if (hasMilestone("fa", 18)) player.an.anonymityToGet = player.an.anonymityToGet.mul(player.fa.milestoneEffect[7])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(buyableEffect("fu", 46))
        player.an.anonymityToGet = player.an.anonymityToGet.mul(levelableEffect("pu", 103)[2])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(levelableEffect("pet", 405)[0])
        player.an.anonymityToGet = player.an.anonymityToGet.mul(buyableEffect("st", 108))

        // ALWAYS AFTER
        if (inChallenge("fu", 11)) player.an.anonymityToGet = player.an.anonymityToGet.pow(0.2)
        if (inChallenge("fu", 11)) player.an.anonymityToGet = player.an.anonymityToGet.mul(player.fu.jocusEssenceEffect)

        if (hasMilestone("gs", 15)) player.an.anonymity = player.an.anonymity.add(player.an.anonymityToGet.mul(Decimal.mul(delta, 0.1)))
    },
    clickables: {
        11: {
            title() { return "<h2>Reset previous content except perks for anonymity.</h2><br><h3>(based on replicanti points)</h3>" },
            canClick() { return player.an.anonymityToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.an.anonymity = player.an.anonymity.add(player.an.anonymityToGet)

                player.ar.rankPoints = new Decimal(0)
                player.ar.tierPoints = new Decimal(0)
                player.ar.tetrPoints = new Decimal(0)
                player.cp.replicantiPoints = new Decimal(1)
            },
            style: { width: "400px", minHeight: "100px", borderRadius: "15px"},
        },
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
                } else {
                    return new Decimal(1)
                }
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#193ceb"},
            display() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
                } else {
                    return "<p style='color:red'>[HARDCAPPED]</p>"
                }
            },
        },
    },
    upgrades: {
        11: {
            title: "Anonymity I",
            unlocked() { return true },
            description: "Multiplies replicanti mult by x1.5.",
            cost: new Decimal(2),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Anonymity II",
            unlocked() { return true },
            description: "Multiplies replicanti mult based on anonymity.",
            cost: new Decimal(5),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            effect() {
                return player.an.anonymity.plus(1).log10().pow(1.25).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Anonymity III",
            unlocked() { return true },
            description: "Gain 5% of rank points per second.",
            cost: new Decimal(16),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Anonymity IV",
            unlocked() { return true },
            description: "Extend the first and second softcap by x1,000.",
            cost: new Decimal(48),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "Anonymity V",
            unlocked() { return true },
            description: "Gain 25% of rank points per second, and gain 5% of tier points per second.",
            cost: new Decimal(212),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "Anonymity VI",
            unlocked() { return true },
            description: "Boost perk points based on anonymity.",
            cost: new Decimal(666),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            effect() {
                return player.an.anonymity.pow(0.15).div(6).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        17: {
            title: "Anonymity VII",
            unlocked() { return true },
            description: "Boost anonymity based on perk points.",
            cost: new Decimal(2345),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            effect() {
                return player.pr.perkPoints.pow(0.2).div(3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        18: {
            title: "Anonymity VIII",
            unlocked() { return true },
            description: "Gain 100% of rank points per second, and gain 25% of tier points per second, and gain 5% of tetr points per second.",
            cost: new Decimal(15000),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        19: {
            title: "Anonymity IX",
            unlocked() { return true },
            description: "Extend first and second softcap based on anonymity.",
            cost: new Decimal(250000),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            effect() {
                return player.an.anonymity.pow(0.75).mul(6).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: "Anonymity X",
            unlocked() { return true },
            description: "Reduce repli-leaf time by 1.5s.",
            cost: new Decimal(4e6),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        22: {
            title: "Anonymity XI",
            unlocked() { return true },
            description: "Weaken second softcap based on second softcap start.",
            cost: new Decimal(6e7),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            effect() {
                return player.cp.replicantiSoftcap2Start.plus(1).log10().pow(0.65).mul(5).add(1)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style: {width: "135px", color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
        23: {
            title: "Anonymity XII",
            unlocked() { return true },
            description: "Multiplies replicanti mult more based on anonymity.",
            cost: new Decimal(2e10),
            currencyLocation() { return player.an },
            currencyDisplayName: "Anonymity",
            currencyInternalName: "anonymity",
            effect() {
                return player.an.anonymity.plus(1).log10().pow(0.8).mul(1.7).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid #060260", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["raw-html", () => { return "You have <h3>" + format(player.an.anonymity) + "</h3> anonymity." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "(+" + format(player.an.anonymityToGet) + ")" }, () => {
                            let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                            player.an.anonymityToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                    ]],
                    ["blank", "10px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
                        ["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23]], {maxWidth: "850px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => {return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["row", [["bar", "replicantiBar"]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 14) }
})
