addLayer("spaceZone4", {
    name: "Zone IV", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "IV", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        zone4Mult: new Decimal(1),
        
        highestLevel: new Decimal(0),
        LevelStart: new Decimal(0),
        levelScaling: new Decimal(1.15),
        levelScalingStart: new Decimal(20),

        selectedStageStart: new Decimal(0),
        milestone11Effect: new Decimal(1),
        milestone12Effect: new Decimal(1),
        milestone13Effect: new Decimal(1),
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
    tooltip: "Zone IV",
    branches: ["spaceZone2"],
    color: "#904ee6",
    update(delta) {
        player[this.layer].levelScaling = new Decimal(1.15)
        if (hasUpgrade("ir", 23)) player[this.layer].levelScaling = player[this.layer].levelScaling.sub(0.02);
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("pl", 17));
        player[this.layer].levelScaling = player[this.layer].levelScaling.max(1)
        player[this.layer].levelScalingStart = new Decimal(20)

        player.spaceZone4.milestone11Effect = player.au2.stars.add(1).log(10).pow(10).div(1e15).add(1)
        player.spaceZone4.milestone12Effect = player.bum.starlight.add(1).log(10).pow(1.5).div(10).add(1)
        player.spaceZone4.milestone13Effect = player.wel.light.add(1).log(10).pow(8).div(1e18).add(1)
    },
    clickables: {
        "enter": {
            title() {
                let str = "<h2>Enter Zone IV"
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
                let look = {width: "350px", minHeight: "75px", color: "white", border: "3px solid #bf41bf", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "radial-gradient(#802080, black)" : "#361e1e"
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
                let look = {background: "#361e1e", border: "3px solid #bf41bf", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#802080, black)"
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
                let look = {background: "#361e1e", border: "3px solid #bf41bf", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#802080, black)"
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
                let look = {background: "#361e1e", border: "3px solid #bf41bf", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#802080, black)"
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
                let look = {background: "#361e1e", border: "3px solid #bf41bf", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#802080, black)"
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
                let look = {background: "#361e1e", border: "3px solid #bf41bf", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#802080, black)"
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
                let look = {background: "#361e1e", border: "3px solid #bf41bf", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
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
            effectDescription() { return "Boost light gain based on stars.<br>(x" + formatSimple(player.spaceZone4.milestone11Effect) + ")" },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(20) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        12: {
            requirementDescription: "Level 40",
            effectDescription() { return "Boost all pylon energy generation based on starlight.<br>(x" + formatSimple(player.spaceZone4.milestone12Effect) + ")." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(40) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        13: {
            requirementDescription: "Level 60",
            effectDescription() { return "Boost star gain (after softcap) based on light.<br>(x" + formatSimple(player.spaceZone4.milestone13Effect) + ")" },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(60) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        14: {
            requirementDescription: "Level 80",
            effectDescription() { return "Boost all core fragment scores by x2." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(80) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", borderRadius: "10px"}
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
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", borderRadius: "10px"}
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
                            ["raw-html", "Zone IV", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
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
                        ["blank", "10px"],
                        ["raw-html", "<u>Time Attack", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", "A deadly timer counts down to your doom", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
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
                        ["style-row", [], {background: "#bf41bf", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#bf41bf", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                    ]],
                    // DISTANCE LINE
                    ["style-row", [
                        ["clickable", "startStage0"],
                        ["style-row", [], {background: "#bf41bf", width: "40px", height: "3px"}],
                        ["clickable", "startStage20"],
                        ["style-row", [], {background: "#bf41bf", width: "40px", height: "3px"}],
                        ["clickable", "startStage40"],
                        ["style-row", [], {background: "#bf41bf", width: "40px", height: "3px"}],
                        ["clickable", "startStage60"],
                        ["style-row", [], {background: "#bf41bf", width: "40px", height: "3px"}],
                        ["clickable", "startStage80"],
                        ["style-row", [], {background: "#bf41bf", width: "40px", height: "3px"}],
                        ["clickable", "switchSides"],
                    ]],
                    // BOTTOM CONNECTORS
                    ["style-row", [
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#bf41bf", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#bf41bf", width: "3px", height: "22px"}],
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

SB_zones.spaceZone4 = {
    nameCap: "Zone IV",
    nameLow: "zone iv",
    location: "space",
    unlocked() {
        return hasUpgrade("ir", 32)
    },

    primaryColor: "#bf41bf",
    secondaryColor: "#802080",

    levelLimit: 100,
    asteroidLimit: 16,
    celestialiteSpawnCooldown: 450,
    celestialiteLimit: 6,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["deltaShip", "lambdaShip", "muShip", "nuShip", "xiShip"]
        if (level >= 20) cel = cel.concat(["omicronShip", "piShip"]);

        return cel[Math.floor(Math.random()*cel.length)]
    },
    generateAsteroid(level) {
        let random = Math.random()
        if (random < 0.25) return "mediumAsteroid";
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
    statMult: new Decimal(20),
    rockMult: new Decimal(12.5),
    gemMult: new Decimal(2.5),
    savePoints: [
        0, 20, 40, 60, 80
    ],
}

SB_celestialites.nuShip = {
    name: "Nu Ship",
    symbol: "ν",
    radius: 22,
    color: "#289e63",
    health: new Decimal(50),
    damage: new Decimal(8),
    bodyDamage: new Decimal(2),
    regen: new Decimal(0.5),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(20)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(2.5)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(20)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 3
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
        if (celestialite.playerDist < 600) {
            celestialite.targetingTimer = 150
        };
            celestialite.playerAng = Math.atan2(dy, dx);

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            let random = Math.random() * Math.PI * 2
            arena.bullets.push({
                x: celestialite.x + Math.cos(random) * (celestialite.radius),
                y: celestialite.y + Math.sin(random) * (celestialite.radius),
                vx: Math.cos(random),
                vy: Math.sin(random),
                life: 45,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 4,
            });
            celestialite.attackCooldown = 3
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.2
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.2
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.4
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.4
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = celestialite.playerAng
            celestialite.turnTimer = 600;
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

SB_celestialites.xiShip = {
    name: "Xi Ship",
    symbol: "ξ",
    radius: 28,
    color: "#95ed95",
    health: new Decimal(200),
    damage: new Decimal(4),
    bodyDamage: new Decimal(2),
    regen: new Decimal(0.5),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(20)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(2.5)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(20)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 240
        celestialite.burstsRemaining = 30
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 600

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
        if (celestialite.playerDist < 600) {
            celestialite.targetingTimer = 90
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if ((celestialite.attackCooldown <= 0 || (celestialite.attackCooldown <= celestialite.burstsRemaining * 3)) && celestialite.targetingTimer > 0) {
            celestialite.burstsRemaining--
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng + (Math.PI / 2 * (Math.random() - 0.5))) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng + (Math.PI / 2 * (Math.random() - 0.5))) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng + (Math.PI / 2 * (Math.random() - 0.5))) * 6,
                vy: Math.sin(celestialite.playerAng + (Math.PI / 2 * (Math.random() - 0.5))) * 6,
                life: 120,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 6,
            });
            if (celestialite.attackCooldown <= 0) {
                celestialite.burstsRemaining = 30
                celestialite.attackCooldown = 240
            }
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.2
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.2
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.5
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.5
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 90

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
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}

SB_celestialites.omicronShip = {
    name: "Omicron Ship",
    symbol: "ο",
    radius: 20,
    color: "#008060",
    health: new Decimal(75),
    damage: new Decimal(3),
    bodyDamage: new Decimal(2),
    regen: new Decimal(0.5),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(25)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(3)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(25)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 180
        celestialite.defenseCooldown = 0
        celestialite.burstsRemaining = 4
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 600

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.9
        celestialite.dvy = 0.9
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.attackCooldown--;
        celestialite.defenseCooldown--;
        celestialite.targetingTimer--;
        celestialite.turnTimer--;

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
        if ((celestialite.attackCooldown <= 0 || (celestialite.attackCooldown <= celestialite.burstsRemaining * 15)) && celestialite.targetingTimer > 0) {
            celestialite.burstsRemaining--
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * 4,
                vy: Math.sin(celestialite.playerAng) * 4,
                life: 120,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 6,
            });
            if (celestialite.attackCooldown <= 0) {
                if (celestialite.defenseCooldown > 0) celestialite.moveAng = celestialite.playerAng;
                celestialite.burstsRemaining = 4
                celestialite.attackCooldown = 180
            }
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.5
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.5
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng)
            celestialite.ay = Math.sin(celestialite.moveAng)
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 150

        if (celestialite.defenseCooldown <= 0) {
            arena.bullets.push({
                x: celestialite.x,
                y: celestialite.y,
                vx: 0,
                vy: 0,
                life: 3,
                damage: new Decimal(0),
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 36,
            });

            let teleportAngle = Math.random() * Math.PI * 2
            celestialite.x = arena.ship.x + Math.cos(teleportAngle) * 400,
            celestialite.y = arena.ship.y + Math.sin(teleportAngle) * 400,

            arena.bullets.push({
                x: celestialite.x,
                y: celestialite.y,
                vx: 0,
                vy: 0,
                life: 3,
                damage: new Decimal(0),
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 36,
            });

            let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
            let dx = closest[0] - celestialite.x;
            let dy = closest[1] - celestialite.y;
            celestialite.playerAng = Math.atan2(dy, dx);
            celestialite.moveAng = celestialite.playerAng + (Math.PI / 4 * (Math.random() - 0.5))
            celestialite.defenseCooldown = 150;
            celestialite.attackCooldown = 90
        }
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

SB_celestialites.piShip = {
    name: "Pi Ship",
    symbol: "π",
    radius: 36,
    color: "#804080",
    health: new Decimal(300),
    damage: new Decimal(6),
    bodyDamage: new Decimal(2),
    regen: new Decimal(2),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.99) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(25)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(10)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(25)
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(7)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 60 + Math.random() * 120
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
        if (celestialite.playerDist < 600) {
            celestialite.targetingTimer = 150
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            for (let i = 0; i < 12; i++)
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng + (Math.PI * 2 * (i / 12))) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng + (Math.PI * 2 * (i / 12))) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng + (Math.PI * 2 * (i / 12))) * 2,
                vy: Math.sin(celestialite.playerAng + (Math.PI * 2 * (i / 12))) * 2,
                life: 180,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 4,
            });
            celestialite.attackCooldown = 60 + Math.random() * 120
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.04
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.04
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.16
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.16
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
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
