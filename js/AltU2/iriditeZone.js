addLayer("iriditeZone", {
    name: "Iridite Zone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✦", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        highestLevel: new Decimal(0),
        LevelStart: new Decimal(0),
        levelScaling: new Decimal(1.1),
        levelScalingStart: new Decimal(20),
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#151230)",
            backgroundOrigin: "border-box",
            borderColor: "#904ee6",
            color: "white",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginRight: "50px !important",
        }
        if (player.subtabs["ir"]["spaceStages"] == "spaceZone2") str.outline = "3px solid #fff"
        return str
    },
    tooltip: "Iridite Zone",
    branches: ["spaceZone2"],
    color: "#904ee6",
    update(delta) {
        
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Iridite Zone",
            canClick: true,
            unlocked: true,
            onClick() {
                player.ir.inBattle = true
                player.ir.battleStage = "iriditeZone"
                options.fullscreen = true
                player.subtabs["ir"]['stuff'] = 'Battle'

                player.ir.primaryColor = "white"
                player.ir.secondaryColor = "#151230"

                arena = new SpaceArena(800, 800, 3200, 3200);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                pauseUniverseAll(["A2", "DS"], "pause", true)

                player.ir.shipHealth = player.ir.shipHealthMax
                if (hasUpgrade("ir", 14)) arena.upgradeEffects.hpRegen += 0.5 / 60

                arena.upgradeEffects.attackDamage *= levelableEffect("ir", player.ir.shipType)[2]

                player.ir.ufoFought = false
                player.ir.iriditeFought = false
            },
            style: {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(#151230)", border: "3px solid white", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
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
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Iridite Zone", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["clickable", "enter"],
                    ], {width: "397px", height: "360px", background: "#0000003f", borderBottom: "3px solid #5e4ee6"}],

                   
                ], {width: "397px", height: "363px"}],
                ["style-column", [], {width: "403px", height: "363px"}],
            ], {width: "800px", height: "363px"}],
            ["style-column", [
                    ["style-column", [
                        ["raw-html", "Perks for defeating Iridite", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "5px"}],
                        ["raw-html", "<u>Unlocks</u>", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => { return player.pol.unlockHive == 2 ? "The Hive" : "Larva (In Pollinators)" }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "New Punchcards", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "New Dark Universe 1 Upgrades", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "New Singularity Upgrades", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "New Starmetal Studies", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "10px"],
                        ["raw-html", "<u>Effects</u>", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", "^2 to 2nd antimatter softcap start.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "Weakened 3rd replicanti point softcap.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "Keep hex progress on singularity reset.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "x50 dice sides.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "x1e12 post-OTF currencies.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", "/1.5 starmetal essence generator cooldowns", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
            ], {background: "#151230", width: "800px", height: "357px"}],
        ], {width: "800px", height: "720px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})