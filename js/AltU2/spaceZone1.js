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
        levelScaling: new Decimal(1.1),
        levelScalingStart: new Decimal(20),

        selectedStageStart: 0,
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
        player.spaceZone1.levelScaling = new Decimal(1.1)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Zone I",
            canClick: true,
            unlocked: true,
            onClick() {
                player.ir.inBattle = true
                player.ir.battleStage = "spaceZone1"
                options.fullscreen = true
                player.subtabs["ir"]['stuff'] = 'Battle'

                player.ir.primaryColor = SB_zones[this.layer].primaryColor
                player.ir.secondaryColor = SB_zones[this.layer].secondaryColor

                arena = new SpaceArena(800, 800, 3200, 3200);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                pauseUniverseAll(["A2", "DS"], "pause", true)

                player.ir.shipHealth = player.ir.shipHealthMax

                player.ir.ufoFought = false
                player.ir.iriditeFought = false
            },
            style: {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(#37078f, black)", border: "3px solid #5e4ee6", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
        "startStage0": {
            title: "0",
            canClick() {return true},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = 0
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (player[this.layer].selectedStageStart == 0) look.outline = "3px solid white";
                return look
            },
        },
        "startStage20": {
            title: "20",
            canClick() {return player.spaceZone1.highestLevel.gte(20)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = 20
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (player[this.layer].selectedStageStart == 20) look.outline = "3px solid white";
                return look
            },
        },
        "startStage40": {
            title: "40",
            canClick() {return player.spaceZone1.highestLevel.gte(40)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = 40
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (player[this.layer].selectedStageStart == 40) look.outline = "3px solid white";
                return look
            },
        },
        "startStage60": {
            title: "60",
            canClick() {return player.spaceZone1.highestLevel.gte(60)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = 60
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (player[this.layer].selectedStageStart == 60) look.outline = "3px solid white";
                return look
            },
        },
        "startStage80": {
            title: "80",
            canClick() {return player.spaceZone1.highestLevel.gte(80)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = 80
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (player[this.layer].selectedStageStart == 80) look.outline = "3px solid white";
                return look
            },
        },
        "switchSides": {
            title: "?",
            canClick() {return player.spaceZone1.highestLevel.gte(100)},
            unlocked: true,
            onClick() {
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #5e4ee6", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#37078f, black)"
                if (false) look.outline = "3px solid white";
                return look
            },
        },
    },
    milestones: {
        11: {
            requirementDescription: "Level 20",
            effectDescription() { return "Boost space dust gain by x3." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(20) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", borderRadius: "10px"}
                if (hasMilestone("ir", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
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
                if (hasMilestone("ir", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
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
                if (hasMilestone("ir", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
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
                if (hasMilestone("ir", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
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
                if (hasMilestone("ir", this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
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
                        ["raw-html", () => {return Decimal.sub(1.1, player.ir.levelScalingReduction).gt(1) ? "<u>Level Scaling" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return Decimal.sub(1.1, player.ir.levelScalingReduction).gt(1) ? formatSimple(Decimal.sub(1.1, player.ir.levelScalingReduction).max(1).sub(1).mul(100)) + "% starting at 20" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "397px", height: "211px", background: "#0000007f", borderBottom: "3px solid #5e4ee6"}],

                ], {width: "397px", height: "363px"}],
                ["style-column", [
                    
                ], {width: "403px", height: "363px"}],
            ], {width: "800px", height: "363px"}],
            ["top-column", [
                ["style-row", [
                    ["raw-html", () => {return "Highest Level: " + formatWhole(player[player.ir.battleStage].highestLevel) + "<span style='font-size:16px'> / " + formatWhole(SB_zones[player.ir.battleStage].levelLimit) + "</span>"}, {color: "white", textShadow: "0 0 10px white", fontSize: "24px", fontFamily: "monospace"}],
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

        return cel[Math.floor(Math.random()*cel.length)]
    },
    generateAsteroid(level) {
        let random = Math.random()
        if (random < 0.25) return "mediumAsteroid";
        else return "smallAsteroid";
    },
    statMult: new Decimal(1),
    rockMult: new Decimal(1),
    gemMult: new Decimal(1),
}

SB_celestialites.smallAsteroid = {
    name: "Small Asteroid",
    symbol: "1",
    radius: 20,
    color: "#afafaf",
    health: new Decimal(20),
    damage: new Decimal(5),
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
    damage: new Decimal(10),
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
        celestialite.shape = arena.generateConvexPolygon(celestialite.radius, 7 + Math.floor(Math.random() * 4));

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
    bodyDamage: new Decimal(4),
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
    bodyDamage: new Decimal(4),
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
    bodyDamage: new Decimal(4),
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
    damage: new Decimal(4),
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
    bodyDamage: new Decimal(4),
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
