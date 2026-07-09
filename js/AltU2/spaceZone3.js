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
        levelScaling: new Decimal(1.15),
        levelScalingStart: new Decimal(20),

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
    tooltip: "Zone III",
    branches: ["spaceZone2"],
    color: "#904ee6",
    update(delta) {
        player.spaceZone3.levelScaling = new Decimal(1.15)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Zone III",
            canClick: true,
            unlocked: true,
            onClick() {
                player.ir.inBattle = true
                player.ir.battleStage = "spaceZone3"
                options.fullscreen = true
                player.subtabs["ir"]['stuff'] = 'Battle'
                
                player.ir.primaryColor = "#e64ebd"
                player.ir.secondaryColor = "#8f0749"

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
            style: {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(#8f0749, black)", border: "3px solid #e64ebd", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
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
                            ["raw-html", "Zone III", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["clickable", "enter"],
                    ], {width: "397px", height: "147px", background: "#0000003f", borderBottom: "3px solid #5e4ee6"}],

                    ["top-column", [
                        ["blank", "10px"],
                        ["style-column", [
                            ["raw-html", "Properties", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["raw-html", () => {return Decimal.sub(1.1, player.ir.levelScalingReduction).gt(1) ? "<u>Level Scaling" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return Decimal.sub(1.1, player.ir.levelScalingReduction).gt(1) ? formatSimple(Decimal.sub(1.15, player.ir.levelScalingReduction).max(1).sub(1).mul(100)) + "% starting at 20" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "10px"],
                        ["raw-html", "<u>Deadly Decisions", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", "Choose an enemy or debuff every level", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "397px", height: "211px", background: "#0000007f", borderBottom: "3px solid #5e4ee6"}],

                ], {width: "397px", height: "363px"}],
                ["style-column", [], {width: "403px", height: "363px"}],
            ], {width: "800px", height: "363px"}],
            ["style-column", [
                // STUFF
            ], {width: "800px", height: "357px"}],
        ], {width: "800px", height: "720px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

SB_zones.spaceZone3 = {
    nameCap: "Zone III",
    nameLow: "zone iii",
    levelLimit: 100,
    asteroidLimit: 16,

    celestialiteSpawnCooldown: 600,
    celestialiteLimit: 6,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["zetaShip", "thetaShip", "iotaShip", "kappaShip"]
        if (level >= 0) cel = cel.concat(["lambdaShip", "muShip"]);

        return cel[Math.floor(Math.random()*cel.length)]
    },
    statMult: new Decimal(2.5),
    rockMult: new Decimal(5),
    gemMult: new Decimal(1.5),
}

SB_celestialites.iotaShip = {
    name: "Iota Ship",
    symbol: "ι",
    radius: 24,
    color: "#28819e",
    health: new Decimal(150),
    damage: new Decimal(7),
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
    damage: new Decimal(10),
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
    damage: new Decimal(4),
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
        celestialite.attackCooldown = 150
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
            celestialite.attackCooldown = 150
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