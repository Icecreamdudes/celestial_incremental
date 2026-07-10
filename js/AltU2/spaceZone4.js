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
        levelScaling: new Decimal(1.1),
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
    tooltip: "Zone IV",
    branches: ["spaceZone2"],
    color: "#904ee6",
    update(delta) {
        player.spaceZone4.levelScaling = new Decimal(1.2)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Zone IV",
            canClick: true,
            unlocked: true,
            onClick() {
                player.ir.inBattle = true
                player.ir.battleStage = "spaceZone4"
                options.fullscreen = true
                player.subtabs["ir"]['stuff'] = 'Battle'

                player.ir.primaryColor = "#bf41bf"
                player.ir.secondaryColor = "#802080"

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
            style: {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(#802080, black)", border: "3px solid #bf41bf", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
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
                            ["raw-html", "Zone IV", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["clickable", "enter"],
                    ], {width: "397px", height: "147px", background: "#0000003f", borderBottom: "3px solid #5e4ee6"}],

                    ["top-column", [
                        ["blank", "10px"],
                        ["style-column", [
                            ["raw-html", "Properties", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["raw-html", () => {return Decimal.sub(1.1, player.ir.levelScalingReduction).gt(1) ? "<u>Level Scaling" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return Decimal.sub(1.1, player.ir.levelScalingReduction).gt(1) ? formatSimple(Decimal.sub(1.2, player.ir.levelScalingReduction).max(1).sub(1).mul(100)) + "% starting at 20" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "10px"],
                        ["raw-html", "<u>Time Attack", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", "A deadly timer counts down to your doom", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
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

SB_zones.spaceZone4 = {
    nameCap: "Zone IV",
    nameLow: "zone iv",
    levelLimit: 100,
    asteroidLimit: 16,

    celestialiteSpawnCooldown: 450,
    celestialiteLimit: 5,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["deltaShip", "lambdaShip", "muShip", "nuShip", "xiShip"]
        if (level >= 20) cel = cel.concat(["omicronShip", "piShip"]);

        return cel[Math.floor(Math.random()*cel.length)]
    },
    statMult: new Decimal(5),
    rockMult: new Decimal(12.5),
    gemMult: new Decimal(2.5),
}

SB_celestialites.nuShip = {
    name: "Nu Ship",
    symbol: "ν",
    radius: 22,
    color: "#289e63",
    health: new Decimal(50),
    damage: new Decimal(8),
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
    health: new Decimal(50),
    damage: new Decimal(2),
    regen: new Decimal(0.25),
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
