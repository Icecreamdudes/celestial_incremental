addLayer("dgj", {
    name: "<span style='text-shadow:0 0 5px #00FEFF'>Grass Jump</span>", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<span style='text-shadow:0 0 5px #00FEFF'>GJ</span>", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        grassJump: new Decimal(0),
        grassJumpReq: new Decimal(1e30),
        grassJumpGain: new Decimal(0),

        milestone1Effect: new Decimal(1),
        milestone2Effect: new Decimal(1),
        milestone3Effect: new Decimal(1),
        milestone4Effect: new Decimal(1),
        milestone6Effect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "radial-gradient(#051C33, #060F19)",
            "background-origin": "border-box",
            "border-color": "#00488F",
            "color": "#00FEFF",
        };
    },
    tooltip: "Grass Jump",
    branches: [["dgr", "#309"]],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        let grassJumpDiv = new Decimal(1)
        
        player.dgj.grassJumpReq = Decimal.pow(1e10, player.dgj.grassJump).mul(1e30).div(grassJumpDiv)
        player.dgj.grassJumpGain = player.dgr.grass.mul(grassJumpDiv).div(1e30).add(1).ln().div(Decimal.ln(1e10))

        player.dgj.milestone1Effect = Decimal.pow(1.5, player.dgj.grassJump)
        player.dgj.milestone2Effect = Decimal.pow(2, player.dgj.grassJump)
        player.dgj.milestone3Effect = Decimal.pow(1.05, player.dgj.grassJump)
        player.dgj.milestone4Effect = buyableEffect("dgr", 13).mul(levelableEffect("st", 206)[0]).mul(buyableEffect("st", 102))
        player.dgj.milestone6Effect = Decimal.pow(1.01, player.dgj.grassJump.sub(12).max(1))
    },
    bars: {},
    clickables: {
        11: {
            title() {
                if (player.pet.legPetTimers[0].current.lte(0)) return "Reset previous content for<br>grass jumps<br>[ONLY OBTAINABLE IN ECLIPSE]"
                return "Reset previous content for<br>grass jumps<br>Req: " + format(player.dgj.grassJumpReq) + " dark grass"
            },
            canClick() { return player.pet.legPetTimers[0].current.gt(0) && player.dgr.grass.gte(player.dgj.grassJumpReq) },
            unlocked() { return true },
            onClick() {
                false ? player.dgj.grassJump = player.dgj.grassJump.add(player.dgj.grassJumpGain) : player.dgj.grassJump = player.dgj.grassJump.add(1);
                player.dgr.grass = player.dgr.grass.sub(player.dgj.grassJumpReq)

                player.le.starmetalAlloyPause = new Decimal(10)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "280px", minHeight: "80px", borderRadius: "15px", color: "white", border: "3px solid #00488F"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#002143"
                return look
            }
        },
    },
    upgrades: {},
    buyables: {},
    milestones: {
        11: {
            effectDescription() { return "Increase dark grass value and capacity by 50% per grass jump<br>Currently: x" + format(player.dgj.milestone1Effect) + "." },
            done() { return player.dgj.grassJump.gte(1) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        12: {
            effectDescription() { return "Increase dark celestial point gain by 100% per grass jump<br>Currently: x" + format(player.dgj.milestone2Effect) + "." },
            done() { return player.dgj.grassJump.gte(2) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        13: {
            effectDescription() { return "Increase eclipse timer duration by 5% per grass jump<br>Currently: x" + format(player.dgj.milestone3Effect) + "." },
            done() { return player.dgj.grassJump.gte(4) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        14: {
            effectDescription() { return "All forms of dark grass automation are effected by dark grass growth speed<br>Currently: x" + format(player.dgj.milestone4Effect) + "." },
            done() { return player.dgj.grassJump.gte(6) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        15: {
            effectDescription() { return "Unlock new Aleph upgrades in the hive." },
            done() { return player.dgj.grassJump.gte(8) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        16: {
            effectDescription() { return "Replace the formulas for the dark grass buyables and scale the dark grass buyables by 1% per grass jump<br>Currently: x" + format(player.dgj.milestone6Effect) + "." },
            done() { return player.dgj.grassJump.gte(12) },
            style() {
                let look = {width: "500px", minHeight: "75px", color: "white", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px"}
                if (hasMilestone("dgj", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
    },
    challenges: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #00488F", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["clickable", 11],
                        ["style-row", [
                            ["raw-html", () => {return player.dgj.grassJump.neq(1) ? "You have " + formatWhole(player.dgj.grassJump) + " Grass Jumps" : "You have 1 Grass Jump"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "280px", height: "74px", background: "black", border: "3px solid #00488F", borderRadius: "15px", marginLeft: "8px"}],
                    ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRadius: "13px 13px 0px 0px", width: "588px", height: "100px"}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "1", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 11],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "2", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 12],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "4", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 13],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "6", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 14],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "8", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 15],
                    ]],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", "12", {color: "white", fontSize: "32px", fontFamily: "monospace"}],
                        ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderRight: "0px", borderTop: "0px", borderRadius: "0px", width: "75px", height: "75px"}],
                        ["titleless-milestone", 16],
                    ]],
                    ["style-row", [
                    ], {backgroundColor: "#002e5c", border: "3px solid #00488F", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "588px", height: "15px"}],
                ]
            },
            "Grassjumpers": {
                buttonStyle() { return { border: "2px solid #00488F", borderRadius: "10px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.dgr.grass) + "</h3> dark grass"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("le", 202) || player.dgj.grassJump.gt(0) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})