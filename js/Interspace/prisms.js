addLayer("pri", {
    name: "Prisms",
    symbol: "PR",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        prisms: new Decimal(0),
        prismsToGet: new Decimal(0),

        /*
            Red: Singularities
            Orange: Infinities
            Yellow: Golden Grass
            Green: Light
            Blue: Check Back XP
            Indigo: ???
            Violet: SMA
            White: Celestial Points
        */
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#335966",
            background: "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)",
            "background-origin": "border-box",
            "border-color": "#335966",
        };
    },
    tooltip: "Prisms",
    color: "#d6ebff",
    update(delta) {
        player.pri.prismsToGet = player.wel.light.div(65536).pow(0.2)

    },
    prismReset(isRewarded) {
        if (isRewarded) {
            player.pri.prisms = player.pri.prisms.add(player.pri.prismsToGet)
            player.wel.light = new Decimal(0)
        }

        player.wel.modules[1].time = new Decimal(0)
        player.wel.modules[1].completions = new Decimal(0)
        player.wel.modules[2].time = new Decimal(0)
        player.wel.modules[2].completions = new Decimal(0)
        player.wel.modules[3].time = new Decimal(0)
        player.wel.modules[3].completions = new Decimal(0)

        setBuyableAmount("wel", 11, new Decimal(0))
        setBuyableAmount("wel", 12, new Decimal(0))
    },
    branches: ["ans"],
    clickables: {
        11: {
            title() { return "<h2>Form your light into prisms.</h2><br><h3><small>Req: 65,536 Light</small></h3>" },
            canClick() { return player.wel.light.gte(65536)},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", color: "#d6ebff", border: "2px solid #d6ebff", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(45deg, #403030 0%, #204030 33%, #303840 66%, #402040 100%)"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Prisms": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    return [
                        ["blank", "25px"],
                        ["clickable", 11],
                        ["blank", "25px"],
                    ]
                }
            },
            "Wavelength": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    return [
                        ["blank", "25px"],
                        ["raw-html", "this will unlock after having an alpha well timer under 0.1s...", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                    ]
                }
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + format(player.pri.prisms) + "</h3> prisms." }, {color: "#d6ebff", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.pri.prismsToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.pri.prismsToGet.gt(1)) {look.color = "#d6ebff"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && true}
})