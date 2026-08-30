addLayer("spaceZone3", {
    name: "Zone III", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "III", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        zone3Mult: new Decimal(1),
        
        highestLevel: new Decimal(0),
        LevelStart: new Decimal(0),
        levelScaling: new Decimal(1.12),
        levelScalingStart: new Decimal(20),

        selectedStageStart: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#8f0749, black)",
            backgroundOrigin: "border-box",
            borderColor: "#e64ebd",
            color: "white",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginRight: "50px !important",
        }
        if (player.subtabs["ir"]["spaceStages"] == "spaceZone2") str.outline = "3px solid #fff"
        return str
    },
    tooltip: "Zone III",
    branches: ["spaceZone2"],
    color: "#e64ebd",
    update(delta) {
        player[this.layer].levelScaling = new Decimal(1.12)
        if (hasUpgrade("ir", 23)) player[this.layer].levelScaling = player[this.layer].levelScaling.sub(0.02);
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("pl", 17));
        player[this.layer].levelScaling = player[this.layer].levelScaling.max(1)
        player[this.layer].levelScalingStart = new Decimal(20)
    },
    clickables: {
        "enter": {
            title() {
                let str = "<h2>Enter Zone III"
                if (player[this.layer].selectedStageStart.gt(0)) str += "</h2><br>(Level " + formatWhole(player[this.layer].selectedStageStart) + ")";
                let timer = new Decimal(0)
                if (player.ir.shipBattleSaveCurrent != null) {
                    timer = player.ir.timers[player.ir.shipBattleSaveCurrent.shipType].current.max(timer);
                    if (player.ir.shipBattleSaveCurrent.slot >= 0) timer = timer.max(player.ir.saveTimers[player.ir.shipBattleSaveCurrent.slot].current)
                }
                if (timer.gt(0)) str += "</h2><br>(Ship Cooling Down: " + formatTime(timer) + ")";
                return str
            },
            canClick() {return player.ir.shipBattleSaveCurrent != null && player.ir.timers[player.ir.shipBattleSaveCurrent.shipType].current.lte(0) && (player.ir.shipBattleSaveCurrent.slot < 0 || player.ir.saveTimers[player.ir.shipBattleSaveCurrent.slot].current.lte(0))},
            unlocked: true,
            onClick() {
                SB_enterRun(this.layer)
            },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", border: "3px solid #e64ebd", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "radial-gradient(#8f0749, black)" : "#361e1e"
                return look
            },
        },
        "startStage0": {
            title: "0",
            canClick() {return true},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(0)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #e64ebd", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#8f0749, black)"
                if (player[this.layer].selectedStageStart.eq(0)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage20": {
            title: "20",
            canClick() {return player[this.layer].highestLevel.gte(20)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(20)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #e64ebd", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#8f0749, black)"
                if (player[this.layer].selectedStageStart.eq(20)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage40": {
            title: "40",
            canClick() {return player[this.layer].highestLevel.gte(40)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(40)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #e64ebd", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#8f0749, black)"
                if (player[this.layer].selectedStageStart.eq(40)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage60": {
            title: "60",
            canClick() {return player[this.layer].highestLevel.gte(60)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(60)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #e64ebd", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#8f0749, black)"
                if (player[this.layer].selectedStageStart.eq(60)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage80": {
            title: "80",
            canClick() {return player[this.layer].highestLevel.gte(80)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(80)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #e64ebd", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#8f0749, black)"
                if (player[this.layer].selectedStageStart.eq(80)) look.outline = "3px solid white";
                return look
            },
        },
        "switchSides": {
            title: "X",
            canClick() {return player[this.layer].highestLevel.gte(100)},
            unlocked: true,
            onClick() {
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #e64ebd", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (player[this.layer].highestLevel.gte(100)) look.background = "#1a3b0f"
                if (false) look.outline = "3px solid white";
                return look
            },
        },
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {
        11: {
            requirementDescription: "Level 20",
            effectDescription() { return "Improve the \"Repair\" Iridite upgrade effect by ^2." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(20) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        12: {
            requirementDescription: "Level 40",
            effectDescription() { return "All ships start with twice as much health regen." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(40) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        13: {
            requirementDescription: "Level 60",
            effectDescription() { return "Improve the \"Flourish\" Iridite upgrade effect by ^4." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(60) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        14: {
            requirementDescription: "Level 80",
            effectDescription() { return "Improve the \"Solar Power\" Iridite upgrade effect by ^1.5." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(80) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        15: {
            requirementDescription: "Level 100",
            effectDescription() { return "???" },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(100) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
    },
    tabFormat: [
        ["style-column", [
            ["style-row", [
                ["style-column", [
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", "Zone III", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["clickable", "enter"],
                    ], {width: "397px", height: "147px", background: "#0000003f", borderBottom: "3px solid #5e4ee6"}],

                    ["top-column", [
                        ["blank", "10px"],
                        ["style-column", [
                            ["raw-html", "Properties", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["raw-html", () => {return Decimal.sub(player[player.subtabs["ir"]["stages"]].levelScaling, player.ir.levelScalingReduction).gt(1) ? "<u>Level Scaling" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return Decimal.sub(player[player.subtabs["ir"]["stages"]].levelScaling, player.ir.levelScalingReduction).gt(1) ? formatSimple(Decimal.sub(player[player.subtabs["ir"]["stages"]].levelScaling, player.ir.levelScalingReduction).max(1).sub(1).mul(100)) + "% starting at " + formatWhole(player[player.subtabs["ir"]["stages"]].levelScalingStart.add(1)) : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "397px", height: "210px", background: "#0000007f", borderBottom: "3px solid #5e4ee6"}],

                ], {width: "397px", height: "363px"}],
                ["style-column", [], {width: "403px", height: "363px"}],
            ], {width: "800px", height: "363px"}],
            ["top-column", [
                ["style-row", [
                    ["raw-html", () => {return "Highest Level: " + formatWhole(player[player.subtabs["ir"]["stages"]].highestLevel) + "<span style='font-size:16px'> / " + formatWhole(SB_zones[player.subtabs["ir"]["stages"]].levelLimit) + "</span>"}, {color: "white", textShadow: "0 0 10px white", fontSize: "24px", fontFamily: "monospace"}],
                ], {borderBottom: "3px solid #5e4ee6", width: "800px", height: "50px"}],
                ["style-column", [
                    // TOP MILESTONES
                    ["style-row", [
                        ["titleless-milestone", 11],
                        ["style-row", [], {width: "22px"}],
                        ["titleless-milestone", 13],
                    ]],
                    // TOP CONNECTORS
                    ["style-row", [
                        ["style-row", [], {width: "144.4px"}],
                        ["style-row", [], {background: "#e64ebd", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#e64ebd", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                    ]],
                    // DISTANCE LINE
                    ["style-row", [
                        ["clickable", "startStage0"],
                        ["style-row", [], {background: "#e64ebd", width: "40px", height: "3px"}],
                        ["clickable", "startStage20"],
                        ["style-row", [], {background: "#e64ebd", width: "40px", height: "3px"}],
                        ["clickable", "startStage40"],
                        ["style-row", [], {background: "#e64ebd", width: "40px", height: "3px"}],
                        ["clickable", "startStage60"],
                        ["style-row", [], {background: "#e64ebd", width: "40px", height: "3px"}],
                        ["clickable", "startStage80"],
                        ["style-row", [], {background: "#e64ebd", width: "40px", height: "3px"}],
                        ["clickable", "switchSides"],
                    ]],
                    // BOTTOM CONNECTORS
                    ["style-row", [
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#e64ebd", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#e64ebd", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "144.4px"}],
                    ]],
                    // BOTTOM MILESTONES
                    ["style-row", [
                        ["titleless-milestone", 12],
                        ["style-row", [], {width: "22px"}],
                        ["titleless-milestone", 14],
                    ]],
                ], {background: "#0000007f", width: "800px", height: "304px"}],
            ], {width: "800px", height: "357px"}],
        ], {width: "800px", height: "720px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

SB_zones.spaceZone3 = {
    nameCap: "Zone III",
    nameLow: "zone iii",
    location: "space",
    unlocked() {
        return hasUpgrade("ir", 25)
    },

    primaryColor: "#e64ebd",
    secondaryColor: "#8f0749",

    levelLimit: 100,
    asteroidLimit: 16,
    celestialiteSpawnCooldown: 600,
    celestialiteLimit: 6,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["zetaShip", "thetaShip", "iotaShip", "kappaShip"]
        if (level >= 20) cel = cel.concat(["lambdaShip", "muShip"]);
        if (level >= 40) cel = cel.concat(["nuShip", "xiShip"]);
        if (level >= 60) cel = cel.concat(["kappaShip", "iotaShip"]);
        if (level >= 80) cel = cel.concat(["piShip"]);
        if (level >= 99) cel = cel.concat(["omicronShip"]);

        return cel[Math.floor(Math.random()*cel.length)]
    },
    generateAsteroid(level) {
        let random = Math.random()
        if (random < 0.05) return "largeAsteroid";
        if (random < 0.3) return "mediumAsteroid";
        else return "smallAsteroid";
    },
    levelUp(level) {
        if (level.modulo(20).eq(0)) {
            arena.enemies = []
            arena.asteroids = []
            arena.xpOrbs = []
            arena.gammaTrails = []
            arena.bossActive = true;
            arena.enemySpawnCooldown = arena.enemySpawnCooldownMax;
            SB_spawnCelestialite("ufo")
        }
    },
    statMult: new Decimal(6),
    rockMult: new Decimal(5),
    gemMult: new Decimal(1.5),
    xpReqMult: new Decimal(4),
    savePoints: [
        0, 20, 40, 60, 80
    ],
}

SB_celestialites.iotaShip = {
    name: "Iota Ship",
    symbol: "ι",
    radius: 24,
    color: "#28819e",
    health: new Decimal(150),
    damage: new Decimal(6),
    bodyDamage: new Decimal(2),
    regen: new Decimal(3),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(15)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(1.5)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(13)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 240
        celestialite.burstsRemaining = 4
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 450

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.95
        celestialite.dvy = 0.95
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.attackCooldown--;
        celestialite.targetingTimer--;
        celestialite.turnTimer--;

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 900) {
            celestialite.targetingTimer = 150
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if ((celestialite.attackCooldown <= 60 && celestialite.burstsRemaining >= 4)) {
            celestialite.moveAng = celestialite.playerAng
        }
        if ((celestialite.attackCooldown <= 0 || (celestialite.attackCooldown <= 60 && celestialite.burstsRemaining >= 4) || (celestialite.attackCooldown <= 45 && celestialite.burstsRemaining >= 3) || (celestialite.attackCooldown <= 30 && celestialite.burstsRemaining >= 2) || (celestialite.attackCooldown <= 15 && celestialite.burstsRemaining >= 1)) && celestialite.targetingTimer > 0) {
            celestialite.burstsRemaining--
            for (let i = 0; i < celestialite.burstsRemaining + 2; i++) {
                arena.bullets.push({
                    x: celestialite.x + Math.cos(celestialite.playerAng + (Math.PI / 8 * (i - (celestialite.burstsRemaining / 4 + 1.75)))) * (celestialite.radius),
                    y: celestialite.y + Math.sin(celestialite.playerAng + (Math.PI / 8 * (i - (celestialite.burstsRemaining / 4 + 1.75)))) * (celestialite.radius),
                    vx: Math.cos(celestialite.playerAng + (Math.PI / 8 * (i - (celestialite.burstsRemaining / 4 + 1.75)))) * 3,
                    vy: Math.sin(celestialite.playerAng + (Math.PI / 8 * (i - (celestialite.burstsRemaining / 4 + 1.75)))) * 3,
                    life: 240,
                    damage: celestialite.damage,
                    pierce: 0,
                    piercedAsteroids: [],
                    fromEnemy: true,
                    radius: 4,
                });
            }
            if (celestialite.attackCooldown <= 0) {
                celestialite.burstsRemaining = 4
                celestialite.attackCooldown = 240
            }
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.2
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.2
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.4
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.4
        }
        if (celestialite.turnTimer <= 0 && celestialite.targetingTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 450;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 150

        celestialite.vx -= Math.cos(celestialite.playerAng) / 8
        celestialite.vy -= Math.sin(celestialite.playerAng) / 8
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (wrapped) {
            ctx.save();
            ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
            ctx.beginPath();
            ctx.arc(wrapped[0], wrapped[1], celestialite.radius, 0, 2 * Math.PI);
            ctx.fillStyle = celestialite.color;
            ctx.shadowColor = celestialite.color;
            if (!options.performanceMode) {ctx.shadowBlur = 8} else {ctx.shadowBlur = 0};
            ctx.fill();
            ctx.font = "bold 32px monospace";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}

SB_celestialites.kappaShip = {
    name: "Kappa Ship",
    symbol: "κ",
    radius: 30,
    color: "#6fdede",
    health: new Decimal(175),
    damage: new Decimal(5),
    bodyDamage: new Decimal(1),
    regen: new Decimal(3),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.85) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(20)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(15)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 300
        celestialite.burstsRemaining = 16
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 150

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.9
        celestialite.dvy = 0.9
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.attackCooldown--;
        celestialite.targetingTimer--;
        celestialite.turnTimer--;

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 900) {
            celestialite.targetingTimer = 150
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if ((celestialite.attackCooldown <= 60 && celestialite.burstsRemaining >= 16)) {
            celestialite.moveAng = celestialite.playerAng + (Math.random() - 0.5) * Math.PI * 4
        }
        if ((celestialite.attackCooldown <= 0 || (celestialite.attackCooldown <= celestialite.burstsRemaining * 10)) && celestialite.targetingTimer > 0) {
            celestialite.burstsRemaining--
            for (let i = 0; i < 2; i++) {
                arena.bullets.push({
                    x: celestialite.x + Math.cos(celestialite.playerAng + (Math.PI / 8 * celestialite.burstsRemaining) + i * Math.PI) * (celestialite.radius),
                    y: celestialite.y + Math.sin(celestialite.playerAng + (Math.PI / 8 * celestialite.burstsRemaining) + i * Math.PI) * (celestialite.radius),
                    vx: Math.cos(celestialite.playerAng + (Math.PI / 8 * celestialite.burstsRemaining) + i * Math.PI) * 3,
                    vy: Math.sin(celestialite.playerAng + (Math.PI / 8 * celestialite.burstsRemaining) + i * Math.PI) * 3,
                    life: 160,
                    damage: celestialite.damage,
                    pierce: 0,
                    piercedAsteroids: [],
                    fromEnemy: true,
                    radius: 4,
                });
            }
            if (celestialite.attackCooldown <= 0) {
                celestialite.burstsRemaining = 16
                celestialite.attackCooldown = 300
                celestialite.moveAng = celestialite.playerAng
            }
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            if (celestialite.attackCooldown > 190 && celestialite.attackCooldown < 570) {
                celestialite.ax = Math.cos(celestialite.moveAng) * 0.375
                celestialite.ay = Math.sin(celestialite.moveAng) * 0.375
            } else {
                celestialite.ax = 0
                celestialite.ay = 0
            }
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.75
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.75
        }
        if (celestialite.turnTimer <= 0 && celestialite.targetingTimer > 0) {
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * 3,
                vy: Math.sin(celestialite.playerAng) * 3,
                life: 240,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 4,
            });
            celestialite.turnTimer = 300;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 150

        celestialite.vx -= Math.cos(celestialite.playerAng)
        celestialite.vy -= Math.sin(celestialite.playerAng)
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (wrapped) {
            ctx.save();
            ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
            ctx.beginPath();
            ctx.arc(wrapped[0], wrapped[1], celestialite.radius, 0, 2 * Math.PI);
            ctx.fillStyle = celestialite.color;
            ctx.shadowColor = celestialite.color;
            if (!options.performanceMode) {ctx.shadowBlur = 8} else {ctx.shadowBlur = 0};
            ctx.fill();
            ctx.font = "bold 32px monospace";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}

SB_celestialites.lambdaShip = {
    name: "Lambda Ship",
    symbol: "λ",
    radius: 24,
    color: "#004040",
    health: new Decimal(100),
    damage: new Decimal(6),
    bodyDamage: new Decimal(2),
    regen: new Decimal(3),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.8) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(20)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(15)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 120
        celestialite.targetingTimer = 0

        celestialite.preferredDistance = 250 + Math.random() * 100

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.9
        celestialite.dvy = 0.9
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.attackCooldown--;
        celestialite.targetingTimer--;

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 600) {
            celestialite.targetingTimer = 150
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * 2,
                vy: Math.sin(celestialite.playerAng) * 2,
                life: 600,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 4,
            });
            celestialite.attackCooldown = 120
            celestialite.preferredDistance = 250 + Math.random() * 100
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.moveAng = celestialite.playerAng + Math.PI / 2
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.375 + (Math.cos(celestialite.playerAng) * (celestialite.playerDist / celestialite.preferredDistance - 1))
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.375 + (Math.sin(celestialite.playerAng) * (celestialite.playerDist / celestialite.preferredDistance - 1))
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.75
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.75
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 150

        celestialite.vx -= Math.cos(celestialite.playerAng) * 2
        celestialite.vy -= Math.sin(celestialite.playerAng) * 2
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (wrapped) {
            ctx.save();
            ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
            ctx.beginPath();
            ctx.arc(wrapped[0], wrapped[1], celestialite.radius, 0, 2 * Math.PI);
            ctx.fillStyle = celestialite.color;
            ctx.shadowColor = celestialite.color;
            if (!options.performanceMode) {ctx.shadowBlur = 8} else {ctx.shadowBlur = 0};
            ctx.fill();
            ctx.font = "bold 32px monospace";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}

SB_celestialites.muShip = {
    name: "Mu Ship",
    symbol: "μ",
    radius: 32,
    color: "#000",
    health: new Decimal(150),
    damage: new Decimal(12),
    bodyDamage: new Decimal(2),
    regen: new Decimal(1),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.85) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(15)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(2)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(18)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 30
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 600

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.975
        celestialite.dvy = 0.975
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.attackCooldown--;
        celestialite.targetingTimer--;
        celestialite.turnTimer--;

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 300) {
            celestialite.targetingTimer = 60
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * 2,
                vy: Math.sin(celestialite.playerAng) * 2,
                life: 180,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 4,
            });
            celestialite.attackCooldown = 30
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.05
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.05
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.1
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.1
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 60

        celestialite.vx -= Math.cos(celestialite.playerAng) / 8
        celestialite.vy -= Math.sin(celestialite.playerAng) / 8
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (wrapped && celestialite.playerDist < 300) {
            ctx.save();
            ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
            ctx.beginPath();
            ctx.globalAlpha = 1 - celestialite.playerDist / 300
            ctx.arc(wrapped[0], wrapped[1], celestialite.radius, 0, 2 * Math.PI);
            ctx.fillStyle = celestialite.color;
            ctx.shadowColor = celestialite.color;
            if (!options.performanceMode) {ctx.shadowBlur = 8} else {ctx.shadowBlur = 0};
            ctx.fill();
            ctx.font = "bold 32px monospace";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}