addLayer("spaceZone1", {
    name: "Zone I", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        zone1Mult: new Decimal(1),

        highestLevel: new Decimal(0),
        LevelStart: new Decimal(0),
        levelScaling: new Decimal(1.08),
        levelScalingStart: new Decimal(20),

        selectedStageStart: new Decimal(0),
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
        player[this.layer].levelScaling = new Decimal(1.08)
        if (hasUpgrade("ir", 23)) player[this.layer].levelScaling = player[this.layer].levelScaling.sub(0.02);
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("pl", 17));
        player[this.layer].levelScaling = player[this.layer].levelScaling.max(1)
        player[this.layer].levelScalingStart = new Decimal(20)
    },
    clickables: {
        "enter": {
            title() {
                let str = "<h2>Enter Zone I"
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
                let look = {width: "350px", minHeight: "75px", color: "white", border: "3px solid #5e4ee6", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "radial-gradient(#37078f, black)" : "#361e1e"
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
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (player[this.layer].selectedStageStart.eq(0)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage20": {
            title: "20",
            canClick() {return player.spaceZone1.highestLevel.gte(20)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(20)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (player[this.layer].selectedStageStart.eq(20)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage40": {
            title: "40",
            canClick() {return player.spaceZone1.highestLevel.gte(40)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(40)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (player[this.layer].selectedStageStart.eq(40)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage60": {
            title: "60",
            canClick() {return player.spaceZone1.highestLevel.gte(60)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(60)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (player[this.layer].selectedStageStart.eq(60)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage80": {
            title: "80",
            canClick() {return player.spaceZone1.highestLevel.gte(80)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(80)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
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
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (player[this.layer].highestLevel.gte(100)) look.background = "#1a3b0f"
                if (false) look.outline = "3px solid white";
                return look
            },
        },
    },
    milestones: {
        11: {
            requirementDescription: "Level 20",
            effectDescription() { return "Boost space dust gain by x3. Unlock more space dust buyables." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(20) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        12: {
            requirementDescription: "Level 40",
            effectDescription() { return "All ships deal 25% more damage." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(40) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        13: {
            requirementDescription: "Level 60",
            effectDescription() { return "The first star dimension effect hardcap is replaced with a softcap." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(60) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        14: {
            requirementDescription: "Level 80",
            effectDescription() { return "All ships deal 15% more damage." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(80) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", borderRadius: "10px"}
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
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", borderRadius: "10px"}
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
                            ["raw-html", "Zone I", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
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
                ["style-column", [
                    
                ], {width: "403px", height: "363px"}],
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
                        ["style-row", [], {background: "#5e4ee6", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#5e4ee6", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                    ]],
                    // DISTANCE LINE
                    ["style-row", [
                        ["clickable", "startStage0"],
                        ["style-row", [], {background: "#5e4ee6", width: "40px", height: "3px"}],
                        ["clickable", "startStage20"],
                        ["style-row", [], {background: "#5e4ee6", width: "40px", height: "3px"}],
                        ["clickable", "startStage40"],
                        ["style-row", [], {background: "#5e4ee6", width: "40px", height: "3px"}],
                        ["clickable", "startStage60"],
                        ["style-row", [], {background: "#5e4ee6", width: "40px", height: "3px"}],
                        ["clickable", "startStage80"],
                        ["style-row", [], {background: "#5e4ee6", width: "40px", height: "3px"}],
                        ["clickable", "switchSides"],
                    ]],
                    // BOTTOM CONNECTORS
                    ["style-row", [
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#5e4ee6", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#5e4ee6", width: "3px", height: "22px"}],
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

SB_zones.spaceZone1 = {
    nameCap: "Zone I",
    nameLow: "zone i",
    location: "space",
    unlocked() {
        return true
    },

    primaryColor: "#5e4ee6",
    secondaryColor: "#37078f",

    levelLimit: 100,
    asteroidLimit: 16,
    celestialiteSpawnCooldown: 750,
    celestialiteLimit: 4,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["alphaShip", "betaShip", "gammaShip"]
        if (level >= 20) cel = cel.concat(["deltaShip", "epsilonShip"]);
        if (level >= 40) cel = cel.concat(["zetaShip", "etaShip"]);
        if (level >= 60) cel = cel.concat(["gammaShip", "deltaShip", "iotaShip"]);
        if (level >= 80) cel = cel.concat(["kappaShip"]);

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
    statMult: new Decimal(1),
    rockMult: new Decimal(1),
    gemMult: new Decimal(1),
    xpReqMult: new Decimal(1),
    savePoints: [
        0, 20, 40, 60, 80
    ],
}

SB_celestialites.smallAsteroid = {
    name: "Small Asteroid",
    symbol: "1",
    radius: 20,
    color: "#6f6f6f",
    health: new Decimal(20),
    damage: new Decimal(1),
    bodyDamage: new Decimal(1),
    regen: new Decimal(0),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.99) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(2)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(1, Math.random()).mul(2)
    },
    initialize(celestialite) {
        celestialite.shape = arena.generateConvexPolygon(celestialite.radius, 5 + Math.floor(Math.random() * 3));

        let moveAng = Math.random() * Math.PI * 2
        let speed = (1 + Math.random()) * 1.5
        celestialite.vx = Math.cos(moveAng) * speed
        celestialite.vy = Math.sin(moveAng) * speed
    },
    tick(celestialite) {},
    onAttacked(celestialite, damage, attacker) {},
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (wrapped != null) {
            ctx.save();
            ctx.translate(wrapped[0], wrapped[1]);
            ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
            ctx.beginPath();
            let shape = celestialite.shape;
            if (shape && shape.length > 0) {
                ctx.moveTo(shape[0].x, shape[0].y);
                for (let i = 1; i < shape.length; i++) {
                    ctx.lineTo(shape[i].x, shape[i].y);
                }
                ctx.closePath();
            }
            ctx.fillStyle = celestialite.color;
            ctx.fill();
            ctx.restore();
        }
    },
}

SB_celestialites.mediumAsteroid = {
    name: "Medium Asteroid",
    symbol: "2",
    radius: 35,
    color: "#8f8f8f",
    health: new Decimal(60),
    damage: new Decimal(1),
    bodyDamage: new Decimal(2),
    regen: new Decimal(0),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.98) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(4)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(1, Math.random()).mul(4)
    },
    initialize(celestialite) {
        celestialite.shape = arena.generateConvexPolygon(celestialite.radius, 5 + Math.floor(Math.random() * 3));

        let moveAng = Math.random() * Math.PI * 2
        let speed = (1 + Math.random()) * 1.25
        celestialite.vx = Math.cos(moveAng) * speed
        celestialite.vy = Math.sin(moveAng) * speed
    },
    tick(celestialite) {},
    onAttacked(celestialite, damage, attacker) {},
    onDeath(celestialite) {
        for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
            let moveAng = Math.random() * Math.PI * 2
            let speed = (1 + Math.random()) * 1.5
            SB_spawnAsteroid("smallAsteroid", {
                x: celestialite.x,
                y: celestialite.y,
                vx: Math.cos(moveAng) * speed,
                vy: Math.sin(moveAng) * speed,
            })
        }
    },
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (wrapped != null) {
            ctx.save();
            ctx.translate(wrapped[0], wrapped[1]);
            ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
            ctx.beginPath();
            let shape = celestialite.shape;
            if (shape && shape.length > 0) {
                ctx.moveTo(shape[0].x, shape[0].y);
                for (let i = 1; i < shape.length; i++) {
                    ctx.lineTo(shape[i].x, shape[i].y);
                }
                ctx.closePath();
            }
            ctx.fillStyle = celestialite.color;
            ctx.fill();
            ctx.restore();
        }
    },
}

SB_celestialites.alphaShip = {
    name: "Alpha Ship",
    symbol: "α",
    radius: 24,
    color: "#3054bf",
    health: new Decimal(150),
    damage: new Decimal(6),
    bodyDamage: new Decimal(1),
    regen: new Decimal(1),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(5)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(6)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 150
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
            celestialite.attackCooldown = 150
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

SB_celestialites.betaShip = {
    name: "Beta Ship",
    symbol: "β",
    radius: 24,
    color: "#5430bf",
    health: new Decimal(125),
    damage: new Decimal(4),
    bodyDamage: new Decimal(1),
    regen: new Decimal(1),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(6)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(7)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 300
        celestialite.burstsRemaining = 2
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 450

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
        if ((celestialite.attackCooldown <= 0 || (celestialite.attackCooldown <= 40 && celestialite.burstsRemaining >= 2) || (celestialite.attackCooldown <= 20 && celestialite.burstsRemaining >= 1)) && celestialite.targetingTimer > 0) {
            celestialite.burstsRemaining--
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * 3,
                vy: Math.sin(celestialite.playerAng) * 3,
                life: 450,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 4,
            });
            if (celestialite.attackCooldown <= 0) {
                celestialite.burstsRemaining = 2
                celestialite.attackCooldown = 300
            }
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.03
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.03
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.12
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.12
        }
        if (celestialite.turnTimer <= 0) {
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

SB_celestialites.gammaShip = {
    name: "Gamma Ship",
    symbol: "γ",
    radius: 28,
    color: "#9b30bf",
    health: new Decimal(100),
    damage: new Decimal(2),
    bodyDamage: new Decimal(1),
    regen: new Decimal(1),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.85) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(7)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(8)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 300
        celestialite.trailCooldown = 60
        celestialite.defenseCooldown = 0
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 600

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.975
        celestialite.dvy = 0.975
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.attackCooldown--;
        celestialite.trailCooldown--;
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
            celestialite.targetingTimer = 300
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng),
                vy: Math.sin(celestialite.playerAng),
                life: 600,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 4,
            });
            celestialite.moveAng = celestialite.playerAng
            celestialite.attackCooldown = 300
        }

        // Spawn a poison trail
        if (celestialite.trailCooldown <= 0) {
            arena.gammaTrails.push({
                x: celestialite.x,
                y: celestialite.y,
                radius: 24,
                timer: 180,
                damage: 1
            });
            celestialite.trailCooldown = 60
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.1
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.1
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.2
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.2
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 300
        
        if (celestialite.defenseCooldown < 0) {
            for (let i = 0; i < 9; i++) {
                arena.bullets.push({
                    x: celestialite.x + Math.cos(celestialite.playerAng + (Math.PI * 2 * (i / 9))) * (celestialite.radius),
                    y: celestialite.y + Math.sin(celestialite.playerAng + (Math.PI * 2 * (i / 9))) * (celestialite.radius),
                    vx: Math.cos(celestialite.playerAng + (Math.PI * 2 * (i / 9))),
                    vy: Math.sin(celestialite.playerAng + (Math.PI * 2 * (i / 9))),
                    life: 300,
                    damage: celestialite.damage,
                    pierce: 0,
                    piercedAsteroids: [],
                    fromEnemy: true,
                });
            }
            arena.gammaTrails.push({
                x: celestialite.x,
                y: celestialite.y,
                radius: 48,
                timer: 180,
                damage: 1.5
            });
            celestialite.trailCooldown = 120
            celestialite.defenseCooldown = 450

            celestialite.moveAng = celestialite.playerAng + Math.PI
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.1
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.1
            celestialite.vx /= 2
            celestialite.vx = celestialite.ax * 90
            celestialite.vy /= 2
            celestialite.vy = celestialite.ay * 90

            celestialite.vx -= Math.cos(celestialite.playerAng) / 4
            celestialite.vy -= Math.sin(celestialite.playerAng) / 4
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

SB_celestialites.deltaShip = {
    name: "Delta Ship",
    symbol: "δ",
    radius: 28,
    color: "#bf60bf",
    health: new Decimal(150),
    damage: new Decimal(1),
    bodyDamage: new Decimal(4),
    regen: new Decimal(2),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(8)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(1.5)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(8)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 150
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
            celestialite.targetingTimer = 300
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.targetingTimer > 0) {
            if (celestialite.attackCooldown <= 0) {
                celestialite.attackCooldown = 120 + (Math.random() * 60)
            }
            if (celestialite.attackCooldown > 120) {
                celestialite.moveAng = celestialite.moveAng = celestialite.playerAng
            }
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.2
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.2
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.3
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.3
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 300

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

SB_celestialites.epsilonShip = {
    name: "Epsilon Ship",
    symbol: "ε",
    radius: 36,
    color: "#dea6de",
    health: new Decimal(250),
    damage: new Decimal(4),
    bodyDamage: new Decimal(1),
    regen: new Decimal(4),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.85) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(7)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(7)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 240
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
            for (let i = 0; i < 5; i++)
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng + (Math.PI * 2 * (i / 5))) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng + (Math.PI * 2 * (i / 5))) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng + (Math.PI * 2 * (i / 5))) * 2,
                vy: Math.sin(celestialite.playerAng + (Math.PI * 2 * (i / 5))) * 2,
                life: 450,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 4,
            });
            celestialite.attackCooldown = 240
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.03
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.03
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.06
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.06
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
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}

SB_celestialites.ufo = {
    name: "UFO",
    symbol: "ufo",
    radius: 48,
    color: "#7f7f7f",
    health: new Decimal(2500),
    damage: new Decimal(3),
    bodyDamage: new Decimal(1),
    regen: new Decimal(0),
    reward() {
        let gain = {}
        let random = Math.random()
        gain.spaceGem = new Decimal(5)
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(6)
    },
    initialize(celestialite) {
        player.ir.ufoFought = true

        // LIGHTS
        celestialite.lightColors = []
        celestialite.possibleLightColors = [
            "#FFFF00", "#BFFF40", "#80FF80", "40FFBF", "#00FFFF",
        ]
        for (i = 0; i < 7; i++) {
            celestialite.lightColors.push(celestialite.possibleLightColors[Math.floor(Math.random() * celestialite.possibleLightColors)])
        }

        // TIMERS
        celestialite.lightTimer = 30
        let random = Math.random()
        if (random < 0.333) {
            celestialite.attackType = "burst"
            celestialite.attackCooldown = 180
            celestialite.burstsRemaining = 4
            celestialite.attackSetsRemaining = 2
        } else if (random < 0.666) {
            celestialite.attackType = "spiral"
            celestialite.attackCooldown = 300
            celestialite.burstsRemaining = 32
            celestialite.attackSetsRemaining = 2
            celestialite.targetAngle = Math.random() * Math.PI * 2
        } else {
            celestialite.attackType = "sweep"
            celestialite.attackCooldown = 240
            celestialite.burstsRemaining = 6
            celestialite.attackSetsRemaining = 2
        }
        celestialite.targetAngle = celestialite.playerAng

        celestialite.moveAng = celestialite.playerAng
        celestialite.dvx = 0.95
        celestialite.dvy = 0.95

        let ang = Math.random() * Math.PI * 2
        celestialite.x = arena.ship.x + Math.cos(ang) * 350
        celestialite.y = arena.ship.y + Math.sin(ang) * 350
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.lightTimer--;
        celestialite.attackCooldown--;

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Always target the player
        celestialite.playerAng = Math.atan2(dy, dx);

        // Attack the player
        if (celestialite.attackType != "sniper" && celestialite.playerDist > 600) {
            celestialite.attackType = "sniper"
            celestialite.attackCooldown = 60
            celestialite.burstsRemaining = 2
        } else 
        switch (celestialite.attackType) {
            case "burst" : {
                if (celestialite.attackCooldown < celestialite.burstsRemaining * 15) {
                    celestialite.burstsRemaining--
                    for (let i = 0; i < 5; i++) {
                        arena.bullets.push({
                            x: celestialite.x + Math.cos(celestialite.playerAng + (Math.PI / 16 * (i - 2))) * (celestialite.radius),
                            y: celestialite.y + Math.sin(celestialite.playerAng + (Math.PI / 16 * (i - 2))) * (celestialite.radius),
                            vx: Math.cos(celestialite.playerAng + (Math.PI / 16 * (i - 2))) * (2 + 2 * (celestialite.burstsRemaining/4)) * (celestialite.playerDist / 400 + 1),
                            vy: Math.sin(celestialite.playerAng + (Math.PI / 16 * (i - 2))) * (2 + 2 * (celestialite.burstsRemaining/4)) * (celestialite.playerDist / 400 + 1),
                            life: 240,
                            damage: celestialite.damage,
                            pierce: 0,
                            piercedAsteroids: [],
                            fromEnemy: true,
                            radius: 4,
                            star: true,
                        });
                    }
                    if (celestialite.attackCooldown <= 0) {
                        if (celestialite.attackSetsRemaining > 0) {
                            celestialite.attackSetsRemaining--
                            celestialite.burstsRemaining = 4
                            celestialite.attackCooldown = 180
                        } else {
                            let random = Math.random()
                            if (random < 0.5) {
                                celestialite.attackType = "spiral"
                                celestialite.attackCooldown = 240
                                celestialite.burstsRemaining = 32
                                celestialite.attackSetsRemaining = 2
                                celestialite.targetAngle = Math.random() * Math.PI * 2
                            } else {
                                celestialite.attackType = "sweep"
                                celestialite.attackCooldown = 180
                                celestialite.burstsRemaining = 6
                                celestialite.attackSetsRemaining = 2
                            }
                        }
                    
                    }
                }
            break;}
            case "spiral" : {
                if (celestialite.attackCooldown < celestialite.burstsRemaining * 4) {
                    celestialite.burstsRemaining--
                    for (let i = 0; i < 2; i++) {
                        arena.bullets.push({
                            x: celestialite.x + Math.cos(celestialite.targetAngle + (celestialite.burstsRemaining * Math.PI * 2 / 16) + (Math.PI * i)) * (celestialite.radius),
                            y: celestialite.y + Math.sin(celestialite.targetAngle + (celestialite.burstsRemaining * Math.PI * 2 / 16) + (Math.PI * i)) * (celestialite.radius),
                            vx: Math.cos(celestialite.targetAngle + (celestialite.burstsRemaining * Math.PI * 2 / 16) + (Math.PI * i)) * (celestialite.playerDist / 400 + 1) * 2,
                            vy: Math.sin(celestialite.targetAngle + (celestialite.burstsRemaining * Math.PI * 2 / 16) + (Math.PI * i)) * (celestialite.playerDist / 400 + 1) * 2,
                            life: 240,
                            damage: celestialite.damage,
                            pierce: 0,
                            piercedAsteroids: [],
                            fromEnemy: true,
                            radius: 4,
                            star: true,
                        });
                    }
                    if (celestialite.attackCooldown <= 0) {
                        if (celestialite.attackSetsRemaining > 0) {
                            celestialite.attackSetsRemaining--
                            celestialite.burstsRemaining = 32
                            celestialite.attackCooldown = 240
                            celestialite.targetAngle = Math.random() * Math.PI * 2
                        } else {
                            let random = Math.random()
                            if (random < 0.5) {
                                celestialite.attackType = "burst"
                                celestialite.attackCooldown = 180
                                celestialite.burstsRemaining = 4
                                celestialite.attackSetsRemaining = 2
                            } else {
                                celestialite.attackType = "sweep"
                                celestialite.attackCooldown = 180
                                celestialite.burstsRemaining = 6
                                celestialite.attackSetsRemaining = 2
                            }
                        }
                    }
                }
            break;}
            case "sweep" : {
                if (celestialite.attackCooldown < celestialite.burstsRemaining * 10) {
                    celestialite.burstsRemaining--
                    for (let i = 0; i < 5; i++) {
                        arena.bullets.push({
                            x: celestialite.x + Math.cos(celestialite.playerAng + (Math.PI / 8 * (i - 2 + 0.5 * (celestialite.burstsRemaining - 3)))) * (celestialite.radius),
                            y: celestialite.y + Math.sin(celestialite.playerAng + (Math.PI / 8 * (i - 2 + 0.5 * (celestialite.burstsRemaining - 3)))) * (celestialite.radius),
                            vx: Math.cos(celestialite.playerAng + (Math.PI / 8 * (i - 2 + 0.5 * (celestialite.burstsRemaining - 3)))) * (2 + 2 * (celestialite.burstsRemaining/4)) * (celestialite.playerDist / 400 + 1) * 0.5,
                            vy: Math.sin(celestialite.playerAng + (Math.PI / 8 * (i - 2 + 0.5 * (celestialite.burstsRemaining - 3)))) * (2 + 2 * (celestialite.burstsRemaining/4)) * (celestialite.playerDist / 400 + 1) * 0.5,
                            life: 360,
                            damage: celestialite.damage,
                            pierce: 0,
                            piercedAsteroids: [],
                            fromEnemy: true,
                            radius: 4,
                            star: true,
                        });
                    }
                    if (celestialite.attackCooldown <= 0) {
                        if (celestialite.attackSetsRemaining > 0) {
                            celestialite.attackSetsRemaining--
                            celestialite.burstsRemaining = 6
                            celestialite.attackCooldown = 180
                        } else {
                            let random = Math.random()
                            if (random < 0.5) {
                                celestialite.attackType = "burst"
                                celestialite.attackCooldown = 180
                                celestialite.burstsRemaining = 4
                                celestialite.attackSetsRemaining = 2
                            } else {
                                celestialite.attackType = "spiral"
                                celestialite.attackCooldown = 240
                                celestialite.burstsRemaining = 32
                                celestialite.attackSetsRemaining = 2
                                celestialite.targetAngle = Math.random() * Math.PI * 2
                            }
                        }
                    }
                }
            break;}
            case "sniper" : {
                if (celestialite.attackCooldown <= celestialite.burstsRemaining * 20) {
                    celestialite.burstsRemaining--
                    let ang = (Math.random() - 0.5) * Math.PI / 8
                    for (let i = 0; i < 5; i++) {
                        arena.bullets.push({
                            x: celestialite.x + Math.cos(celestialite.playerAng + ang + (Math.PI / 64 * (i - 2))) * (celestialite.radius),
                            y: celestialite.y + Math.sin(celestialite.playerAng + ang + (Math.PI / 64 * (i - 2))) * (celestialite.radius),
                            vx: Math.cos(celestialite.playerAng + ang + (Math.PI / 64 * (i - 2))) * (2 + 2 * (celestialite.burstsRemaining/16)) * (celestialite.playerDist / 400 + 1) * 3,
                            vy: Math.sin(celestialite.playerAng + ang + (Math.PI / 64 * (i - 2))) * (2 + 2 * (celestialite.burstsRemaining/16)) * (celestialite.playerDist / 400 + 1) * 3,
                            life: 120,
                            damage: celestialite.damage.mul(1.5),
                            pierce: 0,
                            piercedAsteroids: [],
                            fromEnemy: true,
                            radius: 8,
                            star: true,
                        });
                    }
                    if (celestialite.playerDist > 600) {
                        celestialite.attackType = "sniper"
                        celestialite.attackCooldown = 60
                        celestialite.burstsRemaining = 2
                    } else {
                        let random = Math.random()
                        if (random < 0.333) {
                            celestialite.attackType = "burst"
                            celestialite.attackCooldown = 180
                            celestialite.burstsRemaining = 4
                            celestialite.attackSetsRemaining = 2
                        } else if (random < 0.666) {
                            celestialite.attackType = "spiral"
                            celestialite.attackCooldown = 300
                            celestialite.burstsRemaining = 32
                            celestialite.attackSetsRemaining = 2
                            celestialite.targetAngle = Math.random() * Math.PI * 2
                        } else {
                            celestialite.attackType = "sweep"
                            celestialite.attackCooldown = 240
                            celestialite.burstsRemaining = 2
                            celestialite.attackSetsRemaining = 2
                        }
                    }
                }
            break;}
            default: break;
        }

        // Handle celestialite movement changes
        celestialite.moveAng = celestialite.playerAng
        celestialite.ax = Math.cos(celestialite.moveAng) * 2 * Math.min(1, (celestialite.playerDist - 200) / 3200)
        celestialite.ay = Math.sin(celestialite.moveAng) * 2 * Math.min(1, (celestialite.playerDist - 200) / 3200)
        if (celestialite.attackType == "sniper") {
            celestialite.ax *= 2
            celestialite.ay *= 2
        }
        // Change UFO light colors
        if (celestialite.lightTimer <= 0) {
            celestialite.lightColors = []
            for (i = 0; i < 7; i++) {
                celestialite.lightColors.push(celestialite.possibleLightColors[Math.floor(Math.random() * celestialite.possibleLightColors.length)])
            }
            celestialite.lightTimer = 30
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.vx -= Math.cos(celestialite.playerAng) / 16
        celestialite.vy -= Math.sin(celestialite.playerAng) / 16
    },
    onDeath(celestialite) {
        arena.xpOrbs = []
        player.ir.ufoDefeated = true
        player.ir.battleXP = player.ir.battleXPReq
        arena.bossActive = false
    },
    draw: (ctx, celestialite) => {
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (!wrapped) return;
        ctx.save();
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        ctx.translate(wrapped[0], wrapped[1]);
        if (celestialite.invulnerable) ctx.globalAlpha = 0.25;
        // UFO body
        ctx.beginPath();
        ctx.ellipse(0, 0, celestialite.radius, celestialite.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = player.ir.primaryColor;
        ctx.shadowColor = player.ir.primaryColor;
        if (!options.performanceMode) {ctx.shadowBlur = 18} else {ctx.shadowBlur = 0};
        ctx.fill();
        // Dome
        ctx.beginPath();
        ctx.ellipse(0, -10, celestialite.radius * 0.6, celestialite.radius * 0.35, 0, Math.PI, 2 * Math.PI);
        ctx.ellipse(0, -10, celestialite.radius * 0.6, celestialite.radius * 0.175, 0, 0, Math.PI);
        ctx.fillStyle = "#d7ffff";
        ctx.fill();
        // Lights
        for (let i = -3; i <= 3; i++) {
            ctx.beginPath();
            let lx = (i / 3) * (celestialite.radius * 0.9);
            ctx.arc(lx, 12 * Math.sin(Math.PI * (i + 3) / 6), 4, 0, Math.PI * 2);
            ctx.fillStyle = celestialite.lightColors[i + 3];
            ctx.fill();
        }
        ctx.restore();
    },
}