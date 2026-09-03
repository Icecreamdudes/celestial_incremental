addLayer("evolutionField", {
    name: "Evolution Field", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ev", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        evolutionFieldMult: new Decimal(1),

        highestCombo: new Decimal(0),
        comboEffect: new Decimal(1),
        comboStart: 0,

        milestone: {
            10: 0,
            20: 0,
            30: 0,
            40: 0,
            50: 0,
            60: 0,
            70: 0,
            80: 0,
            90: 0,
            100: 0,
        },
        milestoneEffect: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#64078f, black)",
            backgroundOrigin: "border-box",
            borderColor: "#904ee6",
            color: "white",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginRight: "50px !important",
        }
        if (player.subtabs["ir"]["spaceStages"] == "spaceZone2") str.outline = "3px solid #fff"
        return str
    },
    tooltip: "Evolution Field",
    branches: ["spaceZone2"],
    color: "#904ee6",
    update(delta) {
        
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Evolution Field",
            canClick: true,
            unlocked: true,
            onClick() {
                player.ir.inBattle = true
                player.ir.battleStage = "spaceZone3"
                options.fullscreen = true
                player.subtabs["ir"]['stuff'] = 'Battle'
                
                player.ir.primaryColor = "#d487fd"
                player.ir.secondaryColor = "#4b79ff"

                arena = new SpaceArena(800, 800, 800, 800);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                pauseUniverseAll(["A2", "SB", "DS"], "pause", true)

                player.ir.shipHealth = player.ir.shipHealthMax

                player.ir.ufoFought = false
                player.ir.iriditeFought = false
            },
            style: {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(black, #4b79ff) border-box", border: "3px solid #0000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {
    },
    buyables: {
    },
    tabFormat: [
        ["style-column", [
            ["style-row", [
                ["style-column", [
                    ["hoverless-clickable", "enter"],
                    ["style-column", [
                        ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(90deg, #d487fd, #4b79ff) border-box", border: "3px solid #0000", borderRadius: "20px", width: "344px", minHeight: "69px"}],
                    ], {width: "0", height: "0", position: "relative", left: "-175px", top: "-37.5px", pointerEvents: "none"}],
                ], {width: "397px", height: "363px"}],
                ["style-column", [], {width: "403px", height: "363px"}],
            ], {width: "800px", height: "363px"}],
            ["style-column", [
            ], {width: "800px", height: "357px"}],
        ], {width: "800px", height: "720px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})