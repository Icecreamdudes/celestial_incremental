addLayer("depth3", {
    name: "Depth 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D3", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        player.subtabs["bh"]["stages"] = "depth3"
    },
    startData() { return {
        unlocked: true,

        vividUmbrite: new Decimal(0),
        lustrousUmbrite: new Decimal(0),

        cooldown: new Decimal(0),
        highestCombo: new Decimal(0),
        comboEffect: new Decimal(1),
        comboStart: 0,

        milestone: {
            25: 0,
            50: 0,
            75: 0,
            100: 0,
            125: 0,
            150: 0,
            175: 0,
            200: 0,
            225: 0,
            250: 0,
        },
        milestoneEffect: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "radial-gradient(#720804, #720455)",
            backgroundOrigin: "border-box",
            borderColor: "#961d76",
            color: "#b33793",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
        };
    },
    tooltip: "Depth 3",
    branches: ["depth2"],
    color: "#b33793",
    update(delta) {
        if (player.depth3.cooldown.gt(0)) player.depth3.cooldown = player.depth3.cooldown.sub(delta)

        player.depth3.comboEffect = Decimal.pow(1.15, player.depth3.highestCombo)

        player.depth3.milestoneEffect = new Decimal(0)
        for (let i = 25; i < 251; i = i+25) {
            player.depth3.milestoneEffect = player.depth3.milestoneEffect.add(player.depth3.milestone[i])
        }
    },
    clickables: {
        "enter": {
            title() { return player.depth3.cooldown.lte(0) ? "<h2>Enter Depth 3" : "<h2>Cooldown: " + formatTime(player.depth3.cooldown) },
            canClick() { return player.depth3.cooldown.lte(0) },
            unlocked: true,
            onClick() {
                player.subtabs["bh"]["stuff"] = "battle"

                for (let i = 0; i < 3; i++) {
                    player.bh.characters[i].health = player.bh.characters[i].maxHealth

                    for (let j = 0; j < 4; j++) {
                        player.bh.characters[i].skills[j].cooldown = player.bh.characters[i].skills[j].cooldownMax
                        player.bh.characters[i].skills[j].duration = new Decimal(0)
                        player.bh.characters[i].skills[j].interval = new Decimal(0)
                    }
                }

                player.bh.currentStage = "depth3"
                player.bh.combo = new Decimal(player.depth3.comboStart)
                celestialiteSpawn()

                player.depth3.cooldown = BHS["depth3"].cooldown
            },
            style() {
                let look = {width: "200px", minHeight: "75px", color: "white", border: "3px solid #8a0e79", borderRadius: "20px"}
                player.depth3.cooldown.gt(0) ? look.backgroundColor = "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth3.vividUmbrite) + " vivid umbrite."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.depth3.lustrousUmbrite) + " lustrous umbrite."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.bh.darkEssence) + " dark essence."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "272px", height: "72px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["blank", "2px"],
                    ["row", [["upgrade", 1], ["upgrade", 2]]],
                    ["row", [["upgrade", 3], ["upgrade", 4]]],
                    ["row", [["upgrade", 5], ["upgrade", 6]]],
                    ["row", [["buyable", 1], ["buyable", 2]]],
                    ["row", [["buyable", 3], ["buyable", 4]]],
                    ["blank", "2px"],
                ], {width: "272px", height: "325px", background: "var(--miscButton)", borderRadius: "0 0 0 27px"}],
            ], {width: "272px", height: "400px", borderRight: "3px solid var(--regBorder)"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "Depth 3", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["raw-html", "<u>Cooldown", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "15 Minutes", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["raw-html", "<u>Combo Scaling", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "1.5% starting at 100", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "250px", background: "var(--layerBackground)"}],
            ], {width: "250px", height: "400px"}],
            ["style-column", [
                ["top-column", [
                    ["style-column", [
                        ["raw-html", () => {return "Highest Combo: " + formatWhole(player.depth3.highestCombo) + "/" + BHS["depth3"].comboLimit}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ], {width: "225px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "2px"}],
                    ["top-column", [
                        ["raw-html", () => {return "Boosts singularity points by x" + formatSimple(player.depth3.comboEffect)}, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "250px", height: "25px"}],
                    ["top-column", [
                        ["blank", "4px"],
                        ["raw-html", () => {return "Milestones increase skill points by +" + formatSimple(player.depth3.milestoneEffect)}, {color: "var(--textColor)", fontSize: "11px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "30px", background: "var(--layerBackground)", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "272px", height: "97px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["raw-html", () => {return "<button class='bhMilestoneButton  base' style='width:257px;height:50px' onclick='player.depth3.comboStart=0'>Starting combo value: " + player.depth3.comboStart + "<br>[Click to set to 0]</button>"}],
                    ["bh-milestone", [25, "depth3", ""]],
                    ["bh-milestone", [50, "depth3", ""]],
                    ["bh-milestone", [75, "depth3", ""]],
                    ["bh-milestone", [100, "depth3", ""]],
                    ["bh-milestone", [125, "depth3", ""]],
                    ["bh-milestone", [150, "depth3", ""]],
                    ["bh-milestone", [175, "depth3", ""]],
                    ["bh-milestone", [200, "depth3", ""]],
                    ["bh-milestone", [225, "depth3", ""]],
                    ["bh-milestone", [250, "depth3", ""]],
                ], {width: "272px", height: "247px", background: "var(--miscButton)", borderBottom: "3px solid var(--regBorder)"}],
                ["style-column", [
                    ["raw-html", "<p style='line-height:1'>Clicking on a cleared milestone allows you to start at that milestones combo value.", {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "272px", height: "50px", background: "var(--miscButtonHover)", borderRadius: "0 0 27px 0"}],
            ], {width: "272px", height: "400px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "800px", height: "400px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

BHS.depth3 = {
    nameCap: "Depth 3",
    nameLow: "depth 3",
    music: "music/celestialites.mp3",
    cooldown: new Decimal(900),
    comboLimit: 250,
    comboScaling: 1.015,
    comboScalingStart: 100,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 24:
                return "lesserEnas"
            case 49: case 74:
                return "lesserPente"
            case 99: case 124:
                return "lesserDeka"
            case 149: case 174:
                return "lesserHekaton"
            case 199: case 224:
                return "lesserKhilioi"
            case 249:
                return "lesserMyrioi"
            default:
                let random = Math.random()
                let cel = ["lesserAlpha", "lesserBeta", "lesserGamma", "lesserDelta", "lesserEpsilon"]
                if (combo >= 25) cel.push("lesserZeta")
                if (combo >= 50) cel.push("lesserEta")
                if (combo >= 100) cel.push("lesserTheta")
                if (combo >= 150) cel.push("lesserIota")
                if (combo >= 200) cel.push("lesserKappa")
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}