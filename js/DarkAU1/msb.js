//MSB
addLayer("roomAlpha", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "α", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomAlpha"
        player.anl.selectedRoomDisplay = "Room α"
    },
    nodeStyle() {
        let str = {
            background: "radial-gradient(#215521, black)",
            backgroundOrigin: "border-box",
            borderColor: "#215521",
            transform: "translate(-20px, 20px)",
            color: "#7cfd87",
        }; 
        if (player.anl.selectedRoom == "roomAlpha") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room α",
    startData() { return {
        unlocked: true,
        zoneAlphaMult: new Decimal(1),

        highestLevel: new Decimal(0),
        LevelStart: new Decimal(0),
        levelScaling: new Decimal(1.08),
        levelScalingStart: new Decimal(5),

        selectedStageStart: new Decimal(0),
    }},
    update(delta) {
        player[this.layer].levelScaling = new Decimal(1.08)
        player[this.layer].levelScalingStart = new Decimal(10)
    },
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return player.anl.clearedRooms.roomB},
})

SB_zones.roomAlpha = {
    nameCap: "Zone α",
    nameLow: "zone α",
    location: "labyrinth",
    unlocked() {
        return true
    },

    primaryColor: "#4ee681",
    secondaryColor: "#034d34",

    levelLimit: 20,
    asteroidLimit: 16,
    celestialiteSpawnCooldown: 250,
    celestialiteLimit: 14,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["co60", "co60",  "co60",  "i131",  "i131",  "i131", "am241"]
        if (level >= 8) cel = cel.concat(["au198", "au198"]);

        return cel[Math.floor(Math.random()*cel.length)]
    },
    generateAsteroid(level) {
        return "smallAsteroid";
    },
    levelUp(level) {
        if (level.eq(20)) {
            arena.enemies = []
            arena.asteroids = []
            arena.xpOrbs = []
            arena.gammaTrails = []
            arena.bossActive = true;
            arena.enemySpawnCooldown = arena.enemySpawnCooldownMax;
            SB_spawnCelestialite("aniciffo1")
        }
    },
    statMult: new Decimal(1),
    rockMult: new Decimal(1),
    gemMult: new Decimal(1),
    xpReqMult: new Decimal(1),
    savePoints: [0],
}

//cels
SB_celestialites.co60 = {
    name: "Cobalt-60",
    symbol: "⁶⁰Co",
    radius: 26,
    color: "#22c55e",
    health: new Decimal(600),
    damage: new Decimal(14),
    bodyDamage: new Decimal(3),
    regen: new Decimal(1),
    reward() {
        let gain = {};
        gain.epochFragments = Decimal.add(1, Math.random()).mul(1);
        return gain;
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(18);
    },
    initialize(celestialite) {
        celestialite.dashState = 0; // 0: Stalk, 1: Wind-up, 2: Dashing
        celestialite.dashCooldown = 50 + Math.floor(Math.random() * 25);
        celestialite.dashTimer = 0;
        celestialite.dashAng = 0;

        celestialite.orbitAngle = Math.random() * Math.PI * 2;
        celestialite.moveAng = Math.random() * Math.PI * 2;
        celestialite.turnTimer = 300;
        celestialite.dvx = 0.96;
        celestialite.dvy = 0.96;
    },
    tick(celestialite) {
        celestialite.orbitAngle += 0.04;

        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        let aimAng = Math.atan2(dy, dx);

        switch (celestialite.dashState) {
            case 0: { // STALK
                celestialite.dashCooldown--;
                celestialite.turnTimer--;

                if (celestialite.playerDist < 650) {
                    celestialite.moveAng = aimAng;
                    celestialite.ax = Math.cos(celestialite.moveAng) * 0.18;
                    celestialite.ay = Math.sin(celestialite.moveAng) * 0.18;
                } else {
                    if (celestialite.turnTimer <= 0) {
                        celestialite.moveAng = Math.random() * Math.PI * 2;
                        celestialite.turnTimer = 240;
                    }
                    celestialite.ax = Math.cos(celestialite.moveAng) * 0.08;
                    celestialite.ay = Math.sin(celestialite.moveAng) * 0.08;
                }

                if (celestialite.dashCooldown <= 0 && celestialite.playerDist < 500) {
                    celestialite.dashState = 1;
                    celestialite.dashTimer = 30;
                    celestialite.dashAng = aimAng;
                }
                break;
            }

            case 1: { // WIND-UP / AIM LOCK
                celestialite.dashTimer--;
                celestialite.vx *= 0.82;
                celestialite.vy *= 0.82;
                celestialite.ax = 0;
                celestialite.ay = 0;

                if (celestialite.dashTimer > 6) {
                    let diff = aimAng - celestialite.dashAng;
                    while (diff > Math.PI) diff -= 2 * Math.PI;
                    while (diff < -Math.PI) diff += 2 * Math.PI;
                    celestialite.dashAng += diff * 0.25;
                }

                if (celestialite.dashTimer <= 0) {
                    celestialite.dashState = 2;
                    celestialite.dashTimer = 18;
                    const dashSpeed = 19;

                    celestialite.vx = Math.cos(celestialite.dashAng) * dashSpeed;
                    celestialite.vy = Math.sin(celestialite.dashAng) * dashSpeed;

                    for (let i = 0; i < 4; i++) {
                        let bulletAng = celestialite.dashAng + Math.PI + (i - 1.5) * (Math.PI / 6);
                        arena.bullets.push({
                            x: celestialite.x,
                            y: celestialite.y,
                            vx: Math.cos(bulletAng) * 2.5,
                            vy: Math.sin(bulletAng) * 2.5,
                            life: 100,
                            damage: celestialite.damage.mul(0.5),
                            pierce: 0,
                            piercedAsteroids: [],
                            piercedEnemies: [],
                            fromEnemy: true,
                            radius: 3,
                        });
                    }
                }
                break;
            }

            case 2: { // DASHING
                celestialite.dashTimer--;
                celestialite.ax = 0;
                celestialite.ay = 0;
                celestialite.vx *= 0.985;
                celestialite.vy *= 0.985;

                if (celestialite.dashTimer <= 0) {
                    celestialite.dashState = 0;
                    celestialite.dashCooldown = 100 + Math.floor(Math.random() * 40);
                }
                break;
            }
        }
    },
    onAttacked(celestialite, damage, attacker) {
        if (celestialite.dashState === 0) {
            celestialite.dashCooldown = Math.max(15, celestialite.dashCooldown - 20);
        }
        celestialite.vx -= Math.cos(celestialite.dashAng || 0) * 0.4;
        celestialite.vy -= Math.sin(celestialite.dashAng || 0) * 0.4;
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 3, celestialite.radius * 3]);
        if (!wrapped) return;

        let [wx, wy] = wrapped;
        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;

        ctx.save();
        ctx.translate(wx + camX, wy + camY);

        // 1. Aim Line during charge
        if (celestialite.dashState === 1) {
            ctx.save();
            ctx.rotate(celestialite.dashAng);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(360, 0);
            ctx.strokeStyle = "rgba(74, 222, 128, 0.7)";
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 6]);
            ctx.stroke();
            ctx.restore();
        }

        // 2. Orbital Rings
        const ringRadius = celestialite.radius + 7;
        for (let i = 0; i < 2; i++) {
            ctx.save();
            ctx.rotate(celestialite.orbitAngle + (i * Math.PI / 2));

            ctx.beginPath();
            ctx.ellipse(0, 0, ringRadius, ringRadius * 0.4, 0, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(74, 222, 128, 0.45)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            let nodeAng = celestialite.orbitAngle * 2.2 + (i * Math.PI);
            let nx = Math.cos(nodeAng) * ringRadius;
            let ny = Math.sin(nodeAng) * (ringRadius * 0.4);
            ctx.beginPath();
            ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#86efac";
            ctx.fill();

            ctx.restore();
        }

        // 3. Green Isotope Body
        ctx.beginPath();
        ctx.arc(0, 0, celestialite.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#15803d";
        ctx.fill();

        ctx.strokeStyle = celestialite.dashState === 2 ? "#bbf7d0" : "#4ade80";
        ctx.lineWidth = celestialite.dashState === 2 ? 3.5 : 2;
        ctx.stroke();

        // 4. Text Symbol
        ctx.font = "bold 14px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(celestialite.symbol, 0, 1);

        ctx.restore();
    },
};
SB_celestialites.i131 = {
    name: "Iodine-131",
    symbol: "¹³¹I",
    radius: 32,
    color: "#529e81",
    health: new Decimal(1000),
    damage: new Decimal(2),
    bodyDamage: new Decimal(1),
    regen: new Decimal(1),
    reward() {
        let gain = {};
        gain.epochFragments = Decimal.add(2, Math.random()).mul(1);
        return gain;
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(20)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 60
        celestialite.trailCooldown = 10
        celestialite.defenseCooldown = 0
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 200

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.965
        celestialite.dvy = 0.965
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
                damage: 3
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
                    damage: celestialite.damage.mul(10),
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
                damage: 4
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
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 3.5, celestialite.radius * 3.5]);
        if (!wrapped) return;

        let [wx, wy] = wrapped;
        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;

        ctx.save();
        ctx.translate(wx + camX, wy + camY);


        ctx.beginPath();
        ctx.arc(0, 0, celestialite.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#14532d";
        ctx.fill();
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "bold 15px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(celestialite.symbol, 0, 1);

        ctx.restore();
    },
}
SB_celestialites.am241 = {
    name: "Americium-241",
    symbol: "²⁴¹Am",
    radius: 46,
    color: "#63ac46",
    health: new Decimal(2500),
    damage: new Decimal(20),
    bodyDamage: new Decimal(2),
    regen: new Decimal(2),
    reward() {
        let gain = {};
        gain.epochFragments = Decimal.add(2, Math.random()).mul(2);
        return gain;
    },
    experienceReward() {
        return Decimal.add(5, Math.random()).mul(35);
    },

    onPulse(celestialite) {
        makeShinies(deadlyRadiation, 1)
    },

    initialize(celestialite) {
        // Enforce stationary state
        celestialite.vx = 0;
        celestialite.vy = 0;
        celestialite.ax = 0;
        celestialite.ay = 0;
        celestialite.dvx = 0;
        celestialite.dvy = 0;

        celestialite.orbitAngle = Math.random() * Math.PI * 2;
        celestialite.pulseInterval = 480;
        celestialite.pulseTimer = 480;
    },
    tick(celestialite) {
        // Keep locked in place
        celestialite.vx = 0;
        celestialite.vy = 0;
        celestialite.ax = 0;
        celestialite.ay = 0;

        celestialite.orbitAngle += 0.02;

        // 4-second timer countdown
        celestialite.pulseTimer--;
        if (celestialite.pulseTimer <= 0) {
            this.onPulse(celestialite);
            celestialite.pulseTimer = celestialite.pulseInterval;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        // Prevent knockback displacement
        celestialite.vx = 0;
        celestialite.vy = 0;
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 3, celestialite.radius * 3]);
        if (!wrapped) return;

        let [wx, wy] = wrapped;
        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;

        ctx.save();
        ctx.translate(wx + camX, wy + camY);

        // 1. Multi-Layered Atomic Orbital Rings (5 shells)
        const numRings = 5;
        const ringRadius = celestialite.radius + 18;

        for (let i = 0; i < numRings; i++) {
            ctx.save();
            ctx.rotate(celestialite.orbitAngle * (0.6 + i * 0.08) + (i * Math.PI / numRings));

            ctx.beginPath();
            ctx.ellipse(0, 0, ringRadius, ringRadius * 0.36, 0, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(74, 222, 128, 0.32)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Orbiting electron node
            let nodeAng = celestialite.orbitAngle * (1.8 + i * 0.25) + (i * (Math.PI * 2 / numRings));
            let nx = Math.cos(nodeAng) * ringRadius;
            let ny = Math.sin(nodeAng) * (ringRadius * 0.36);

            ctx.beginPath();
            ctx.arc(nx, ny, 3, 0, Math.PI * 2);
            ctx.fillStyle = "#9fef86";
            ctx.fill();

            ctx.restore();
        }

        // 2. Charge Progress Ring (fills up towards the 4s pulse)
        let progress = 1 - (celestialite.pulseTimer / celestialite.pulseInterval);
        ctx.beginPath();
        ctx.arc(0, 0, celestialite.radius + 4, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * progress));
        ctx.strokeStyle = "rgba(159, 239, 134, 0.75)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 3. Dense Heavy Nucleus
        ctx.beginPath();
        ctx.arc(0, 0, celestialite.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#2b5314";
        ctx.fill();

        ctx.strokeStyle = "#99de4a";
        ctx.lineWidth = 3;
        ctx.stroke();

        // 4. Atomic Symbol
        ctx.font = "bold 18px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(celestialite.symbol, 0, 1);

        ctx.restore();
    },
};
SB_celestialites.au198 = {
    name: "Gold-198",
    symbol: "¹⁹⁸Au",
    radius: 28,
    color: "#eab308",
    health: new Decimal(700),
    damage: new Decimal(26),
    bodyDamage: new Decimal(2),
    regen: new Decimal(50),
    reward() {
        let gain = {};
        gain.epochFragments = Decimal.add(2, Math.random()).mul(1);
        return gain;
    },
    experienceReward() {
        return Decimal.add(3, Math.random()).mul(20);
    },
    initialize(celestialite) {
        // Enforce strictly stationary movement
        celestialite.vx = 0;
        celestialite.vy = 0;
        celestialite.ax = 0;
        celestialite.ay = 0;
        celestialite.dvx = 0;
        celestialite.dvy = 0;

        celestialite.orbitAngle = Math.random() * Math.PI * 2;

        // Teleport state: 0 = Idle, 1 = Warning Active, 2 = Pre-Attack Delay
        celestialite.teleportState = 0;
        celestialite.teleportCooldown = 20 + Math.floor(Math.random() * 15);
        celestialite.warningTimer = 0;
        celestialite.warningTimerMax = 28; 
        celestialite.shootDelay = 0;

        celestialite.targetX = celestialite.x;
        celestialite.targetY = celestialite.y;
    },
    tick(celestialite) {
        // Keep completely locked in place
        celestialite.vx = 0;
        celestialite.vy = 0;
        celestialite.ax = 0;
        celestialite.ay = 0;

        celestialite.orbitAngle += 0.035;

        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        let aimAng = Math.atan2(dy, dx);

        switch (celestialite.teleportState) {
            case 0: { // IDLE / STATIONARY
                celestialite.teleportCooldown--;

                if (celestialite.teleportCooldown <= 0) {
                    // Pick a landing position 80 to 160 units away from the player
                    let warpDist = 80 + Math.random() * 80;
                    let warpAng = Math.random() * Math.PI * 2;
                    let pPos = arena.getClosestCoords([celestialite.x, celestialite.y]);

                    let destX = (pPos[0] + Math.cos(warpAng) * warpDist + arena.width) % arena.width;
                    let destY = (pPos[1] + Math.sin(warpAng) * warpDist + arena.height) % arena.height;

                    celestialite.targetX = destX;
                    celestialite.targetY = destY;
                    celestialite.warningTimer = celestialite.warningTimerMax;
                    celestialite.teleportState = 1;
                }
                break;
            }

            case 1: { // TELEPORT WARNING (Telegraph active at target destination)
                celestialite.warningTimer--;

                if (celestialite.warningTimer <= 0) {
                    // Teleport instantly to the warned location
                    celestialite.x = celestialite.targetX;
                    celestialite.y = celestialite.targetY;
                    celestialite.shootDelay = 12; // Brief 0.2s pause after landing
                    celestialite.teleportState = 2;
                }
                break;
            }

            case 2: { // POST-WARP BURST ATTACK
                celestialite.shootDelay--;

                if (celestialite.shootDelay <= 0) {
                    // Recalculate aim angle from new position
                    let newClosest = arena.getClosestCoords([celestialite.x, celestialite.y]);
                    let newAim = Math.atan2(newClosest[1] - celestialite.y, newClosest[0] - celestialite.x);

                    // Shoot a 3-bullet spread towards the player
                    for (let i = -1; i <= 1; i++) {
                        let bulletAng = newAim + i * 0.22;
                        arena.bullets.push({
                            x: celestialite.x + Math.cos(bulletAng) * (celestialite.radius + 4),
                            y: celestialite.y + Math.sin(bulletAng) * (celestialite.radius + 4),
                            vx: Math.cos(bulletAng) * 3.5,
                            vy: Math.sin(bulletAng) * 3.5,
                            life: 140,
                            damage: celestialite.damage,
                            pierce: 0,
                            piercedAsteroids: [],
                            piercedEnemies: [],
                            fromEnemy: true,
                            radius: 3.5,
                        });
                    }

                    // Reset to idle cooldown
                    celestialite.teleportState = 0;
                    celestialite.teleportCooldown = 150 + Math.floor(Math.random() * 60);
                }
                break;
            }
        }
    },
    onAttacked(celestialite, damage, attacker) {
        // Prevent knockback displacement
        celestialite.vx = 0;
        celestialite.vy = 0;
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;

        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;

        // 1. DRAW TELEPORT WARNING INDICATOR (At destination while State 1 is active)
        if (celestialite.teleportState === 1) {
            let wrappedTarget = arena.getVisibleWrappedCoords(
                [celestialite.targetX, celestialite.targetY],
                [celestialite.radius * 4, celestialite.radius * 4]
            );

            if (wrappedTarget) {
                let [tx, ty] = wrappedTarget;
                let progress = 1 - (celestialite.warningTimer / celestialite.warningTimerMax);
                let currentRadius = celestialite.radius + (1 - progress) * 28;

                ctx.save();
                ctx.translate(tx + camX, ty + camY);

                // Warning circle contracting towards landing size
                ctx.beginPath();
                ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(250, 204, 21, ${0.4 + progress * 0.5})`;
                ctx.lineWidth = 2;
                ctx.setLineDash([6, 5]);
                ctx.stroke();

                // Static target boundary
                ctx.beginPath();
                ctx.arc(0, 0, celestialite.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(234, 179, 8, ${0.12 + progress * 0.18})`;
                ctx.fill();
                ctx.strokeStyle = "rgba(253, 224, 71, 0.7)";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([]);
                ctx.stroke();

                // Center crosshair
                ctx.beginPath();
                ctx.moveTo(-7, 0); ctx.lineTo(7, 0);
                ctx.moveTo(0, -7); ctx.lineTo(0, 7);
                ctx.strokeStyle = "#fef08a";
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.restore();
            }
        }

        // 2. DRAW GOLD-198 CELESTIALITE BODY (At current location)
        let wrapped = arena.getVisibleWrappedCoords(
            [celestialite.x, celestialite.y],
            [celestialite.radius * 3, celestialite.radius * 3]
        );
        if (!wrapped) return;

        let [wx, wy] = wrapped;

        ctx.save();
        ctx.translate(wx + camX, wy + camY);

        // Simple Golden Orbital Rings (2 crossing shells)
        const ringRadius = celestialite.radius + 14;
        for (let i = 0; i < 2; i++) {
            ctx.save();
            ctx.rotate(celestialite.orbitAngle + (i * Math.PI / 2));

            ctx.beginPath();
            ctx.ellipse(0, 0, ringRadius, ringRadius * 0.4, 0, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(234, 179, 8, 0.45)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Orbiting electron node
            let nodeAng = celestialite.orbitAngle * 2.2 + (i * Math.PI);
            let nx = Math.cos(nodeAng) * ringRadius;
            let ny = Math.sin(nodeAng) * (ringRadius * 0.4);
            ctx.beginPath();
            ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#fef08a";
            ctx.fill();

            ctx.restore();
        }

        // Gold Isotope Nucleus Body
        ctx.beginPath();
        ctx.arc(0, 0, celestialite.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#854d0e";
        ctx.fill();

        ctx.strokeStyle = celestialite.teleportState === 2 ? "#fef08a" : "#eab308";
        ctx.lineWidth = celestialite.teleportState === 2 ? 3.5 : 2;
        ctx.stroke();

        // Atomic Symbol
        ctx.font = "bold 13px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(celestialite.symbol, 0, 1);

        ctx.restore();
    },
};

if (typeof SB_projectiles === "undefined") {
    window.SB_projectiles = {};
}

SB_projectiles.isotopeOrb = {
    tick(bullet) {
        if (!bullet || !arena) return;
        bullet.spin = (bullet.spin || 0) + 0.08;

        // Gentle homing toward the nearest ship position
        let closest = arena.getClosestCoords([bullet.x, bullet.y]);
        let dx = closest[0] - bullet.x;
        let dy = closest[1] - bullet.y;
        let dist = Math.hypot(dx, dy) || 1;

        // Normalize and apply a small steering acceleration
        let homingStrength = 0.18;
        bullet.ax = (dx / dist) * homingStrength;
        bullet.ay = (dy / dist) * homingStrength;

        // Cap speed so the orb doesn't infinitely accelerate
        let speed = Math.hypot(bullet.vx, bullet.vy);
        let maxSpeed = 10;
        if (speed > maxSpeed) {
            bullet.vx = (bullet.vx / speed) * maxSpeed;
            bullet.vy = (bullet.vy / speed) * maxSpeed;
        }
    },
    draw(ctx, bullet) {
        if (!arena || !bullet) return;
        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;
        let wrapped = arena.getVisibleWrappedCoords([bullet.x, bullet.y], [32, 32]);
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0] + camX, wrapped[1] + camY);

        ctx.save();
        ctx.rotate(bullet.spin || 0);
        ctx.beginPath();
        ctx.ellipse(0, 0, 14, 6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(134, 239, 172, 0.65)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(14, 0, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
        ctx.fillStyle = "#0f381a";
        ctx.fill();
        ctx.strokeStyle = "#4ade80";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#bbf7d0";
        ctx.fill();

        ctx.restore();
    }
};

SB_celestialites.aniciffo1 = {
    name: "Aniciffo, the Celestial of Radioactivity",
    symbol: "An",
    radius: 44,
    color: "#15803d",
    health: new Decimal(50000),
    damage: new Decimal(28),
    bodyDamage: new Decimal(0),
    regen: new Decimal(4),
    boss: true,
    customAttacks: true,

    reward() {
        let gain = {};
        gain.epochFragments = Decimal.add(5, Math.random()).mul(15);
        return gain;
    },
    experienceReward() {
        return new Decimal(500);
    },

    initialize(celestialite) {
        screenFlash("— Aniciffo, the Celestial of Radioactivity —", 1200);
        arena.enterFullscreen();
        arena.enemies = [];
        arena.bullets = [];
        arena.asteroids = [];
        arena.xpOrbs = [];
        arena.gammaTrails = [];
        arena.enemySpawnCooldown = arena.enemySpawnCooldownMax;
        arena.bossActive = true;
        player.ir.aniciffoFought = true;

        celestialite.maxHealth = new Decimal(50000);
        celestialite.health = new Decimal(50000);
        celestialite.phase = 1;

        celestialite.currentAttack = "gridBombs";
        celestialite.attackInitialized = false;
        celestialite.attackTimer = 60;
        celestialite.pulseCooldown = 900; // 15-second cooldown

        celestialite.attackCooldown = Infinity;
        celestialite.shootTimer = Infinity;
        celestialite.cooldown = Infinity;
        celestialite.fireCooldown = Infinity;
        celestialite.genericAttackTimer = Infinity;

        celestialite.moveAng = Math.random() * Math.PI * 2;
        celestialite.dvx = 0.95;
        celestialite.dvy = 0.95;
        celestialite.swordAng = -0.4;
        celestialite.slashEffect = 0;
        celestialite.slashHit = false;
        celestialite.aimAng = 0;
        celestialite.pulseRing = 0;
        celestialite.gridBombs = [];
    },

    decideAttack(celestialite) {
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        celestialite.playerAng = Math.atan2(dy, dx);
        celestialite.moveAng = celestialite.playerAng;

        if (celestialite.pulseCooldown <= 0) {
            celestialite.currentAttack = "pulse";
            celestialite.pulseCooldown = 900;
        } else {
            celestialite.currentAttack = Math.random() < 0.60 ? "dashSlash" : "gridBombs";
        }
        celestialite.attackInitialized = false;
    },

    attacks: {
        dashSlash(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 56; // 30-tick windup + 16-tick dash + 10-tick slash
                celestialite.aimAng = celestialite.playerAng;
                celestialite.slashEffect = 0;
                celestialite.slashHit = false;
            }

            // A. 500ms (30 Ticks) Telegraph Aim Guide
            if (celestialite.attackTimer > 26) {
                celestialite.slashEffect = 0;
                celestialite.vx *= 0.80;
                celestialite.vy *= 0.80;
                celestialite.ax = 0;
                celestialite.ay = 0;

                let diff = celestialite.playerAng - celestialite.aimAng;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                celestialite.aimAng += diff * 0.35;
                celestialite.swordAng = -1.4;

                // Launch dash at tick 27
                if (celestialite.attackTimer === 27) {
                    const dashSpeed = 48; // High speed for long dash distance
                    celestialite.vx = Math.cos(celestialite.aimAng) * dashSpeed;
                    celestialite.vy = Math.sin(celestialite.aimAng) * dashSpeed;
                }
            }
            // B. High-Speed Extended Dash Thrust
            else if (celestialite.attackTimer > 10) {
                celestialite.vx *= 0.988;
                celestialite.vy *= 0.988;

                if (celestialite.playerDist < 110 || celestialite.attackTimer === 11) {
                    celestialite.slashEffect = 1.0;

                    let slashAngleDiff = celestialite.playerAng - celestialite.aimAng;
                    while (slashAngleDiff > Math.PI) slashAngleDiff -= 2 * Math.PI;
                    while (slashAngleDiff < -Math.PI) slashAngleDiff += 2 * Math.PI;

                    if (!celestialite.slashHit && celestialite.playerDist < 215 && Math.abs(slashAngleDiff) < 1.5 && arena) {
                        celestialite.slashHit = true;
                        let slashDmg = (celestialite.damage || new Decimal(28)).mul(1.5);
                        if (typeof arena.applyShipDamage === "function") {
                            arena.applyShipDamage(slashDmg);
                        } else if (player.ir && player.ir.shipHealth) {
                            let reduction = (arena.shipStats && arena.shipStats.damageReduction) || 1;
                            player.ir.shipHealth = player.ir.shipHealth.sub(slashDmg.div(reduction));
                        }
                    }
                }
            }
            // C. Recovery & Slash Arc Fade
            else {
                celestialite.vx *= 0.82;
                celestialite.vy *= 0.82;
                celestialite.slashEffect = Math.max(0, celestialite.slashEffect - 0.1);
                celestialite.swordAng = 1.4;

                if (celestialite.attackTimer <= 1) {
                    celestialite.slashEffect = 0;
                    celestialite.swordAng = -0.4;
                }
            }
        },

        gridBombs(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 85; // Full 1.4s cycle synchronized with bomb fuse
                celestialite.bombsFired = false;
                celestialite.slashEffect = 0;
            }

            celestialite.vx *= 0.88;
            celestialite.vy *= 0.88;

            // Throw 2 to 3 bombs at tick 75 after brief windup
            if (!celestialite.bombsFired && celestialite.attackTimer <= 75) {
                celestialite.bombsFired = true;
                let bombCount = 2 + Math.floor(Math.random() * 2); // Exactly 2 or 3 bombs

                for (let b = 0; b < bombCount; b++) {
                    let spreadOffset = bombCount === 2 ? (b === 0 ? -0.85 : 0.85) : ((b - 1) * 0.9);
                    let launchAng = celestialite.playerAng + spreadOffset + (Math.random() - 0.5) * 0.2;
                    let launchSpeed = 8 + Math.random() * 4;

                    celestialite.gridBombs.push({
                        x: celestialite.x,
                        y: celestialite.y,
                        vx: Math.cos(launchAng) * launchSpeed,
                        vy: Math.sin(launchAng) * launchSpeed,
                        fuse: 45,      // Exactly 45 ticks (0.75s) fuse
                        maxFuse: 45,
                        detonating: 0,
                        angle: Math.random() * Math.PI * 0.5,
                        pinRot: Math.random() * Math.PI * 2,
                        hitPlayer: false,
                    });
                }
            }
        },

        pulse(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 55;
                celestialite.slashEffect = 0;
            }

            celestialite.vx *= 0.88;
            celestialite.vy *= 0.88;

            if (celestialite.attackTimer === 25) {
                if (typeof makeShinies === "function") {
                    makeShinies(typeof deadlyRadiation !== "undefined" ? deadlyRadiation : "deadlyRadiation", 5);
                }
                celestialite.pulseRing = 48;

                if (arena && arena.bullets) {
                    for (let i = 0; i < 6; i++) {
                        let orbAng = (i * Math.PI / 3) + Math.random() * 0.2;
                        arena.bullets.push({
                            type: "isotopeOrb",
                            x: celestialite.x,
                            y: celestialite.y,
                            vx: Math.cos(orbAng) * 3.2,
                            vy: Math.sin(orbAng) * 3.2,
                            life: 110,
                            damage: (celestialite.damage || new Decimal(28)).mul(0.75),
                            spin: Math.random() * Math.PI * 2,
                            pierce: 0,
                            piercedAsteroids: [],
                            piercedEnemies: [],
                            fromEnemy: true,
                            radius: 9,
                        });
                    }
                }
            }
        },
    },

    tick(celestialite) {
        celestialite.phase = 5 - celestialite.health.div(celestialite.maxHealth).mul(4).ceil().toNumber();

        celestialite.attackCooldown = Infinity;
        celestialite.shootTimer = Infinity;
        celestialite.cooldown = Infinity;
        celestialite.fireCooldown = Infinity;
        celestialite.genericAttackTimer = Infinity;

        if (celestialite.pulseCooldown > 0) celestialite.pulseCooldown--;

        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        celestialite.playerAng = Math.atan2(dy, dx);

        if (celestialite.currentAttack !== "dashSlash" || celestialite.attackTimer > 26) {
            if (celestialite.playerDist > 300) {
                celestialite.ax = Math.cos(celestialite.playerAng) * 0.28;
                celestialite.ay = Math.sin(celestialite.playerAng) * 0.28;
            } else if (celestialite.playerDist < 160) {
                celestialite.ax = -Math.cos(celestialite.playerAng) * 0.30;
                celestialite.ay = -Math.sin(celestialite.playerAng) * 0.30;
            } else {
                celestialite.ax = Math.cos(celestialite.playerAng + Math.PI / 2) * 0.24;
                celestialite.ay = Math.sin(celestialite.playerAng + Math.PI / 2) * 0.24;
            }
        }

        // Update grid bombs
        if (celestialite.gridBombs) {
            for (let i = celestialite.gridBombs.length - 1; i >= 0; i--) {
                let bomb = celestialite.gridBombs[i];
                bomb.x += bomb.vx;
                bomb.y += bomb.vy;
                bomb.vx *= 0.92;
                bomb.vy *= 0.92;
                bomb.pinRot = (bomb.pinRot || 0) + 0.22;

                bomb.x = (bomb.x % arena.width + arena.width) % arena.width;
                bomb.y = (bomb.y % arena.height + arena.height) % arena.height;

                if (bomb.fuse > 0) {
                    bomb.fuse--;
                    if (bomb.fuse === 0) {
                        bomb.detonating = 20; // 20 frames blast duration
                        bomb.hitPlayer = false;
                    }
                } else if (bomb.detonating > 0) {
                    bomb.detonating--;

                    if (!bomb.hitPlayer && arena && arena.ship) {
                        // Use getWrappedCoords for clean, uncorrupted relative position
                        let wrappedCoords = arena.getWrappedCoords([bomb.x, bomb.y]);
                        let relX = arena.ship.x - wrappedCoords[0];
                        let relY = arena.ship.y - wrappedCoords[1];

                        let distToBomb = Math.hypot(relX, relY);
                        let maxReach = Math.max(arena.canvasWidth, arena.canvasHeight) * 1.5;

                        // Only check collision if bomb is within screen span
                        if (distToBomb <= maxReach) {
                            let cosA = Math.cos(bomb.angle || 0);
                            let sinA = Math.sin(bomb.angle || 0);

                            // Distance from player to the two perpendicular laser lines
                            let perp1 = Math.abs(-relX * sinA + relY * cosA);
                            let perp2 = Math.abs(relX * cosA + relY * sinA);

                            let shipRadius = (player.ir.shipType == 3 || player.ir.shipType == 7) ? arena.ship.radius : 14;
                            let beamHalfWidth = 14;

                            if (perp1 < beamHalfWidth + shipRadius || perp2 < beamHalfWidth + shipRadius) {
                                bomb.hitPlayer = true;
                                let bombDmg = (celestialite.damage || new Decimal(28)).mul(1.5);
                                if (typeof arena.applyShipDamage === "function") {
                                    arena.applyShipDamage(bombDmg);
                                } else if (player.ir && player.ir.shipHealth) {
                                    let reduction = (arena.shipStats && arena.shipStats.damageReduction) || 1;
                                    player.ir.shipHealth = player.ir.shipHealth.sub(bombDmg.div(reduction));
                                }
                            }
                        }
                    }

                    if (bomb.detonating <= 0) {
                        celestialite.gridBombs.splice(i, 1);
                    }
                }
            }
        }

        if (celestialite.currentAttack && SB_celestialites.aniciffo1.attacks[celestialite.currentAttack]) {
            SB_celestialites.aniciffo1.attacks[celestialite.currentAttack](celestialite);
        }

        celestialite.attackTimer--;
        if (celestialite.attackTimer <= 0) {
            SB_celestialites.aniciffo1.decideAttack(celestialite);
        }
    },

    onAttacked(celestialite, damage, attacker) {},

    onDeath(celestialite) {
        arena.exitFullscreen();
        arena.bullets = [];
        arena.asteroids = [];
        arena.xpOrbs = [];
        arena.gammaTrails = [];
        arena.bossActive = false;

        celestialite.gridBombs = [];
        celestialite.slashEffect = 0;

        player.anl.clearedRooms.roomAlpha = true
        SB_exitRun()
    },

    draw(ctx, celestialite) {
        if (!arena) return;

        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;
        let fullScreenReach = Math.max(arena.canvasWidth, arena.canvasHeight) * 2;

        // 1. Draw Full-Screen Grid Bombs & Beams
        if (celestialite.gridBombs && celestialite.gridBombs.length > 0) {
            for (let bomb of celestialite.gridBombs) {
                // Use getWrappedCoords so bomb coordinates never get corrupted by large sizes
                let wrapped = arena.getWrappedCoords([bomb.x, bomb.y]);
                if (!wrapped) continue;

                let bx = wrapped[0] + camX;
                let by = wrapped[1] + camY;

                ctx.save();
                ctx.translate(bx, by);

                // A. DETONATION: Full-Screen Lasers
                if (bomb.detonating > 0) {
                    let beamAlpha = Math.min(1, bomb.detonating / 8);

                    ctx.save();
                    ctx.rotate(bomb.angle || 0);

                    // Outer Emerald Glow
                    ctx.fillStyle = `rgba(34, 197, 94, ${0.45 * beamAlpha})`;
                    ctx.fillRect(-fullScreenReach, -16, fullScreenReach * 2, 32);
                    ctx.fillRect(-16, -fullScreenReach, 32, fullScreenReach * 2);

                    // Inner Toxic Energy Laser
                    ctx.fillStyle = `rgba(74, 222, 128, ${0.85 * beamAlpha})`;
                    ctx.fillRect(-fullScreenReach, -8, fullScreenReach * 2, 16);
                    ctx.fillRect(-8, -fullScreenReach, 16, fullScreenReach * 2);

                    // Piercing White Core Line
                    ctx.fillStyle = `rgba(255, 255, 255, ${beamAlpha})`;
                    ctx.fillRect(-fullScreenReach, -3, fullScreenReach * 2, 6);
                    ctx.fillRect(-3, -fullScreenReach, 6, fullScreenReach * 2);

                    // Dashed Pixel Outline
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * beamAlpha})`;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([8, 8]);
                    ctx.beginPath();
                    ctx.moveTo(-fullScreenReach, -10); ctx.lineTo(fullScreenReach, -10);
                    ctx.moveTo(-fullScreenReach, 10); ctx.lineTo(fullScreenReach, 10);
                    ctx.moveTo(-10, -fullScreenReach); ctx.lineTo(-10, fullScreenReach);
                    ctx.moveTo(10, -fullScreenReach); ctx.lineTo(10, fullScreenReach);
                    ctx.stroke();

                    // Central Burst Pip
                    ctx.beginPath();
                    ctx.arc(0, 0, 36 * (1 - bomb.detonating / 20), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${beamAlpha})`;
                    ctx.fill();

                    ctx.restore();

                } else if (bomb.fuse > 0) {
                    // B. TELEGRAPH: Full-Screen Rails
                    let prog = 1 - (bomb.fuse / bomb.maxFuse);
                    let flash = Math.sin(bomb.fuse * 0.4) > 0 ? 1 : 0.4;

                    ctx.save();
                    ctx.rotate(bomb.angle || 0);
                    ctx.strokeStyle = `rgba(239, 68, 68, ${0.35 + prog * 0.5 * flash})`;
                    ctx.lineWidth = 1.5 + prog * 2;
                    ctx.setLineDash([12, 8]);

                    ctx.beginPath();
                    ctx.moveTo(-fullScreenReach, 0); ctx.lineTo(fullScreenReach, 0);
                    ctx.moveTo(0, -fullScreenReach); ctx.lineTo(0, fullScreenReach);
                    ctx.stroke();
                    ctx.restore();

                    if (bomb.fuse < 35) {
                        ctx.font = "bold 13px monospace";
                        ctx.fillStyle = `rgba(255, 70, 70, ${0.6 + prog * 0.4})`;
                        ctx.textAlign = "left";
                        ctx.fillText("Watch for Bombs", 18, -14);
                    }

                    // Spinning Pinwheel
                    ctx.save();
                    ctx.rotate(bomb.pinRot);
                    ctx.strokeStyle = "#ffffff";
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    for (let s = 0; s < 4; s++) {
                        let sa = s * Math.PI / 2;
                        ctx.moveTo(Math.cos(sa) * 4, Math.sin(sa) * 4);
                        ctx.lineTo(Math.cos(sa) * 12, Math.sin(sa) * 12);
                    }
                    ctx.stroke();
                    ctx.restore();

                    // Bomb Body
                    ctx.beginPath();
                    ctx.arc(0, 4, 11, 0, Math.PI * 2);
                    ctx.fillStyle = "#03160a";
                    ctx.fill();
                    ctx.strokeStyle = prog > 0.7 ? "#ef4444" : "#4ade80";
                    ctx.lineWidth = 2.5;
                    ctx.stroke();

                    // Center Fuse Pip
                    ctx.beginPath();
                    ctx.arc(0, 4, 4, 0, Math.PI * 2);
                    ctx.fillStyle = prog > 0.7 ? "#ffffff" : "#bbf7d0";
                    ctx.fill();
                }

                ctx.restore();
            }
        }

       // 3. Boss Body & Effects
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 4, celestialite.radius * 4]);
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0] + camX, wrapped[1] + camY);

        if (celestialite.phase === 2) {
            let pulse = Math.sin(celestialite.phase2Aura || 0) * 8;
            let auraRadius = Math.max(0, celestialite.radius + 14 + pulse);
            ctx.beginPath();
            ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(74, 222, 128, 0.45)";
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 6]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        let isAiming = (celestialite.currentAttack === "dashSlash" && celestialite.attackTimer > 22) ||
                       (celestialite.currentAttack === "blinkDash" && celestialite.dashPhase === "telegraph");

        if (isAiming) {
            ctx.save();
            ctx.rotate(celestialite.aimAng);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(850, 0);
            ctx.strokeStyle = celestialite.phase === 2 ? "rgba(134, 239, 172, 0.85)" : "rgba(74, 222, 128, 0.75)";
            ctx.lineWidth = celestialite.phase === 2 ? 3.5 : 2.8;
            ctx.setLineDash([10, 6]);
            ctx.stroke();
            ctx.restore();
        }

        if (celestialite.pulseRing > 0) {
            let maxRing = celestialite.maxPulseRing || 60;
            let currentRadius = Math.max(0, (maxRing - celestialite.pulseRing) * 5.5);
            ctx.beginPath();
            ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(134, 239, 172, ${Math.max(0, celestialite.pulseRing / maxRing)})`;
            ctx.lineWidth = 3.5;
            ctx.stroke();
            celestialite.pulseRing--;
        }

        // Colossal Slash Arc Render
        if (celestialite.slashEffect > 0) {
            ctx.save();
            ctx.rotate(celestialite.aimAng);

            ctx.beginPath();
            ctx.arc(15, 0, celestialite.radius + 152, -1.5, 1.5);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.45 * celestialite.slashEffect})`;
            ctx.lineWidth = 38 * celestialite.slashEffect;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(15, 0, celestialite.radius + 142, -1.45, 1.45);
            ctx.strokeStyle = `rgba(74, 222, 128, ${celestialite.slashEffect})`;
            ctx.lineWidth = 20 * celestialite.slashEffect;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(15, 0, celestialite.radius + 136, -1.35, 1.35);
            ctx.strokeStyle = `rgba(255, 255, 255, ${celestialite.slashEffect})`;
            ctx.lineWidth = 8 * celestialite.slashEffect;
            ctx.stroke();

            ctx.restore();
        }

        // Determine Directional Facing (Right = 1, Left = -1)
        let facing = 1;
        if (isAiming) {
            facing = Math.cos(celestialite.aimAng) >= 0 ? 1 : -1;
        } else if (Math.abs(celestialite.vx) > 0.15) {
            facing = celestialite.vx > 0 ? 1 : -1;
        } else {
            facing = Math.cos(celestialite.playerAng || 0) >= 0 ? 1 : -1;
        }

        // Render Aniciffo Animated Sprite via BHB_drawAniciffo
        BHB_drawAniciffo(
            ctx,
            0,
            0,
            celestialite.swordAng ?? -0.4,
            celestialite.phase || 1,
            104,
            104,
            null,
            facing,
            true
        );

        ctx.restore();
    }
};