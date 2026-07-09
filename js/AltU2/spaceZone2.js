addLayer("spaceZone2", {
    name: "Zone II", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "II", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        zone2Mult: new Decimal(1),
        
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
    tooltip: "Zone II",
    branches: ["spaceZone1"],
    color: "#904ee6",
    update(delta) {
        player.spaceZone2.levelScaling = new Decimal(1.1)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Zone II",
            canClick: true,
            unlocked: true,
            onClick() {
                player.ir.inBattle = true
                player.ir.battleStage = "spaceZone2"
                options.fullscreen = true
                player.subtabs["ir"]['stuff'] = 'Battle'

                player.ir.primaryColor = "#904ee6"
                player.ir.secondaryColor = "#64078f"

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
            style: {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(#64078f, black)", border: "3px solid #904ee6", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
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
                            ["raw-html", "Zone II", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
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
                        ["blank", "10px"],
                        ["raw-html", "<u>Iridite", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", "Iridite will begin attacking at 10", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
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

SB_zones.spaceZone2 = {
    nameCap: "Zone II",
    nameLow: "zone ii",
    levelLimit: 100,
    asteroidLimit: 16,

    celestialiteSpawnCooldown: 750,
    celestialiteLimit: 4,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["deltaShip", "epsilonShip", "zetaShip"]
        if (level >= 20) cel = cel.concat(["etaShip", "thetaShip"]);

        return cel[Math.floor(Math.random()*cel.length)]
    },
    statMult: new Decimal(1.5),
    rockMult: new Decimal(2),
    gemMult: new Decimal(1.25),
}

SB_celestialites.zetaShip = {
    name: "Zeta Ship",
    symbol: "ζ",
    radius: 24,
    color: "#9e2863",
    health: new Decimal(150),
    damage: new Decimal(7),
    regen: new Decimal(1),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(10)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(1.5)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(10)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 300
        celestialite.burstsRemaining = 2
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 450

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.9875
        celestialite.dvy = 0.9875
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
        if ((celestialite.attackCooldown <= 0 || (celestialite.attackCooldown <= 40 && celestialite.burstsRemaining >= 2) || (celestialite.attackCooldown <= 20 && celestialite.burstsRemaining >= 1)) && celestialite.targetingTimer > 0) {
            celestialite.burstsRemaining--
            for (let i = 0; i < celestialite.burstsRemaining + 2; i++) {
                arena.bullets.push({
                    x: celestialite.x + Math.cos(celestialite.playerAng + (Math.PI / 4 * (i - (celestialite.burstsRemaining / 2 + 0.5)))) * (celestialite.radius),
                    y: celestialite.y + Math.sin(celestialite.playerAng + (Math.PI / 4 * (i - (celestialite.burstsRemaining / 2 + 0.5)))) * (celestialite.radius),
                    vx: Math.cos(celestialite.playerAng + (Math.PI / 4 * (i - (celestialite.burstsRemaining / 2 + 0.5)))) * 3,
                    vy: Math.sin(celestialite.playerAng + (Math.PI / 4 * (i - (celestialite.burstsRemaining / 2 + 0.5)))) * 3,
                    life: 300,
                    damage: celestialite.damage,
                    pierce: 0,
                    piercedAsteroids: [],
                    fromEnemy: true,
                    radius: 4,
                });
            }
            if (celestialite.attackCooldown <= 0) {
                celestialite.burstsRemaining = 2
                celestialite.attackCooldown = 300
                celestialite.moveAng = celestialite.playerAng
            }
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.025
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.025
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.1
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.1
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 450;
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
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}

SB_celestialites.etaShip = {
    name: "Eta Ship",
    symbol: "η",
    radius: 20,
    color: "#bf6078",
    health: new Decimal(125),
    damage: new Decimal(4),
    regen: new Decimal(5),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.95) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(12)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(2)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(10)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 150
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
            celestialite.targetingTimer = 300
            celestialite.playerAng = Math.atan2(dy, dx);
            celestialite.moveAng = celestialite.playerAng
            if (celestialite.health.lte(celestialite.maxHealth / 2)) celestialite.moveAng += Math.PI;
        };

        // Attack the player
        if (celestialite.targetingTimer > 0) {
            if (celestialite.attackCooldown <= 0) {
                arena.bullets.push({
                    x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                    y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                    vx: Math.cos(celestialite.playerAng) * 3,
                    vy: Math.sin(celestialite.playerAng) * 3,
                    life: 300,
                    damage: celestialite.damage,
                    pierce: 0,
                    piercedAsteroids: [],
                    fromEnemy: true,
                    radius: 4,
                });

                celestialite.attackCooldown = 120 + (Math.random() * 60)
            }
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.333
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.333
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng)
            celestialite.ay = Math.sin(celestialite.moveAng)
        }
        if (celestialite.health.lte(celestialite.maxHealth / 2)) {
            celestialite.ax *= 0.75
            celestialite.ay *= 0.75
        }
        if (celestialite.turnTimer <= 0 && celestialite.targetingTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 300

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

SB_celestialites.thetaShip = {
    name: "Theta Ship",
    symbol: "θ",
    radius: 36,
    color: "#800020",
    health: new Decimal(300),
    damage: new Decimal(8),
    regen: new Decimal(0),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.75) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(12)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(1.5)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(14)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 10
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
                vx: Math.cos(celestialite.playerAng) * 4,
                vy: Math.sin(celestialite.playerAng) * 4,
                life: 45,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 6,
            });
            celestialite.attackCooldown = 10
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
        celestialite.targetingTimer = 300
        celestialite.regen = celestialite.regen.sub(damage / 4)

        celestialite.vx += Math.cos(celestialite.playerAng) * 0.75
        celestialite.vy += Math.sin(celestialite.playerAng) * 0.75
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