addLayer("spaceZone1", {
    name: "Zone I", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        spaceRocks: new Decimal(0),
        spaceGems: new Decimal(0),
        zone1Mult: new Decimal(1),

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
            background: "radial-gradient(#37078f, black)",
            backgroundOrigin: "border-box",
            borderColor: "#5e4ee6",
            color: "white",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginRight: "50px !important",
        }
        if (player.subtabs["ir"]["spaceStages"] == "spaceZone1") str.outline = "3px solid #fff"
        return str
    },
    tooltip: "Zone I",
    branches: [],
    color: "#5e4ee6",
    update(delta) {
        
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Zone I",
            canClick: true,
            unlocked: true,
            onClick() {
                player.ir.inBattle = true
                player.ir.battleStage = "zone1"
                options.fullscreen = true
                player.subtabs["ir"]['stuff'] = 'Battle'

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
            style: {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(#37078f, black)", border: "3px solid #5e4ee6", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {
        11: {
            title: "Rejuvenation",
            unlocked() { return true },
            description: "Boosts singularity point gain based on space rocks.",
            cost: new Decimal(300),
            currencyLocation() { return player.ir },
            effect() {
                return player.ir.spaceRock.pow(0.75).mul(1000).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        12: {
            title: "Replenish",
            unlocked() { return true },
            description: "Boosts oil gain based on space rocks.",
            cost: new Decimal(500),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.ir.spaceRock.pow(2.5).mul(5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        13: {
            title: "Servitude",
            unlocked() { return true },
            description: "Boosts check back XP gain based on space gems.",
            cost: new Decimal(800),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.ir.spaceGem.pow(0.25).mul(0.3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        14: {
            title: "Healing",
            unlocked() { return true },
            description: "All ships start off with 0.5 hp/sec of health regeneration.",
            cost: new Decimal(1200),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        15: {
            title: "Civilization",
            unlocked() { return true },
            description: "Unlock Space Buildings.",
            cost: new Decimal(2000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        16: {
            title: "Miniboss",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "You are able to fight the UFO miniboss at level 8, and unlock a new legendary pet.",
            cost: new Decimal(3000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        17: {
            title: "Reinforcement II",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "All ships have 30% increased max hp.",
            cost: new Decimal(5000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        18: {
            title: "Timekeeper",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "Cut ship cooldown times based on space gems.",
            effect() {
                return player.ir.spaceGem.pow(0.75).mul(0.02).add(1)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            cost: new Decimal(8000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        19: {
            title: "Iridite",
            unlocked() { return player.ir.ufoDefeated },
            description: "...",
            cost: new Decimal(10000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },

        //gems
        101: {
            title: "Impact",
            unlocked() { return true },
            description: "Unlocks the second ship: Impact.",
            cost: new Decimal(2),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        102: {
            title: "Reinforcement",
            unlocked() { return true },
            description: "All ships have 25% increased max hp.",
            cost: new Decimal(3),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        103: {
            title: "Alleviator",
            unlocked() { return true },
            description: "Battle XP requirements are cut by /1.25.",
            cost: new Decimal(5),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        104: {
            title: "Treasure",
            unlocked() { return true },
            description: "Double the probability of getting space gems from asteroids.",
            cost: new Decimal(7),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        105: {
            title: "Exploration",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "Unlock more star exploration nodes.",
            cost: new Decimal(12),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        106: {
            title: "Alleviator II",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "Battle XP requirements are cut by /1.4",
            cost: new Decimal(18),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "3px solid #5e4ee6", margin: "3px", width: "190px", maxHeight: "151px", minHeight: "151px", fontSize: "12px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },

    },
    buyables: {
    },
    tabFormat: [
        ["style-column", [
            ["style-row", [
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Zone 1", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["clickable", "enter"],
                    ], {width: "397px", height: "147px", background: "#0000003f", borderBottom: "3px solid #5e4ee6"}],

                    ["top-column", [
                        ["blank", "10px"],
                        ["style-column", [
                            ["raw-html", "Properties", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["raw-html", () => {return Decimal.sub(1.1, player.ir.levelScalingReduction).gt(1) ? "<u>Level Scaling" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return Decimal.sub(1.1, player.ir.levelScalingReduction).gt(1) ? formatSimple(Decimal.sub(1.1, player.ir.levelScalingReduction).max(1).sub(1).mul(100)) + "% starting at 20" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "397px", height: "211px", background: "#0000007f", borderBottom: "3px solid #5e4ee6"}],

                ], {width: "397px", height: "363px"}],
                ["style-column", [], {width: "403px", height: "363px"}],
            ], {width: "800px", height: "363px"}],
            ["top-column", [
                ["style-row", [
                    ["raw-html", function () { return "You have <span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(player.ir.spaceRock) + " space rocks</span> and <span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(player.ir.spaceGem) + " space gems</span>."  }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                ], {background: "#37078f", borderBottom: "3px solid #5e4ee6", width: "800px", height: "40px"}],

                ["always-scroll-column", [
                    ["row", [
                        ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],
                    ]],
                    ["row", [
                        ["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18],
                    ]],
                    ["row", [
                        ["upgrade", 19], ["upgrade", 101], ["upgrade", 102], ["upgrade", 103],
                    ]],
                    ["row", [
                        ["upgrade", 104], ["upgrade", 105], ["upgrade", 106],
                    ]],
                ], {width: "800px", height: "314px"}]

            ], {width: "800px", height: "357px"}],
        ], {width: "800px", height: "720px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})