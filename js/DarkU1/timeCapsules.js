addLayer("dt", {
    name: "Time Capsules", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        timeCapsulePause: new Decimal(0),

        timeCapsules: new Decimal(0),
        timeCapsuleEffect: new Decimal(1),
        timeCapsulesToGet: new Decimal(0),
        storedToGet: new Decimal(0),

        // TODO: D1 tickspeed boost from time capsules
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #12332b 0%, #00663c 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#29a653",
            color: "#eaf6f7",
        };
    },
    tooltip: "Time Capsules",
    branches: [["dv", "#309"]],
    color: "rgba(193, 223, 0)",
    update(delta) {
        let onepersec = new Decimal(1)

        player.dt.timeCapsulesToGet = player.du.points.pow(0.02)

        player.dt.timeCapsulePause = player.dt.timeCapsulePause.sub(1)
        if (player.dt.timeCapsulePause.gte(1)) layers.dt.timeCapsuleReset();

        player.dt.timeCapsuleEffect = player.dt.timeCapsules.add(1).log(10).pow(2).div(2).add(1)

        // stored

        player.dt.storedToGet = Decimal.pow(10, player.dt.timeCapsules.add(1).log(10).add(1).pow(0.5).sub(1)).pow(2).div(25)
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h2>Reset previous content for time capsules.<br>(based on clouds)</h2>" },
            canClick() { return player.dt.timeCapsulesToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.dt.timeCapsules = player.dt.timeCapsules.add(player.dt.timeCapsulesToGet)
                player.dt.timeCapsulePause = new Decimal(6)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #00663c", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    timeCapsuleReset()
    {
        player.du.points = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.tetr = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)

        player.dp.prestigePoints = new Decimal(0)
        player.dp.buyables[11] = new Decimal(0)
        player.dp.buyables[12] = new Decimal(0)
        player.dp.buyables[13] = new Decimal(0)
        player.dp.buyables[14] = new Decimal(0)
        player.dp.buyables[15] = new Decimal(0)
        player.dp.buyables[16] = new Decimal(0)

        player.db.boosters = new Decimal(0)
        for (let i = 0; i < player.db.milestones.length; i++) {
            if (+player.db.milestones[i] < 101) {
                player.db.milestones.splice(i, 1);
                i--;
            }
        }

        // put vaporizer stuff here

        player.dgr.grass = new Decimal(0)
        for (let i = 1; i < (tmp.dgr.grid.cols + "0" + (tmp.dgr.grid.rows + 1)); ) {
            setGridData("dgr", i, new Decimal(0))

            // Increase i value
            if (i % tmp.dgr.grid.rows == 0) {
                i = i+(101-tmp.dgr.grid.rows)
            } else {
                i++
            }
        }

        player.dgr.buyables[11] = new Decimal(0)
        player.dgr.buyables[12] = new Decimal(0)
        player.dgr.buyables[13] = new Decimal(0)
        player.dgr.buyables[14] = new Decimal(0)
        player.dgr.buyables[15] = new Decimal(0)
        player.dgr.buyables[16] = new Decimal(0)
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #00663c", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["raw-html", () => { return "You have " + format(player.dt.timeCapsules) + " time capsules"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "(+" + format(player.dt.timeCapsulesToGet) + ")"}, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.dt.timeCapsulesToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Boosts D1 tickspeed and eclipse shard xp value by x" + format(player.dt.timeCapsuleEffect) + "."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "You will store " + format(player.dt.storedToGet) + " time capsules when you leave D1."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return true /*hasUpgrade("le", 102)*/ },
    deactivated() { return !player.sma.inStarmetalChallenge},
})