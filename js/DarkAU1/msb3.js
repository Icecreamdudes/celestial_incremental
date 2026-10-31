//MSB
addLayer("roomGamma", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "γ", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomGamma"
        player.anl.selectedRoomDisplay = "Room γ"
    },
    nodeStyle() {
        let str = {
            background: "radial-gradient(#215355, black)",
            backgroundOrigin: "border-box",
            borderColor: "#214055",
            transform: "translate(135px, 35px)",
            color: "rgb(124, 206, 253)",
        }; 
        if (player.anl.selectedRoom == "roomGamma") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room γ",
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
        player[this.layer].levelScaling = new Decimal(1.05)
        player[this.layer].levelScalingStart = new Decimal(0)
    },
    clickables: {
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
    ["blank", "200px"],
    ],
    layerShown() {return player.anl.clearedRooms.roomBeta && player.anl.clearedRooms.roomH},
})

SB_zones.roomGamma = {
    nameCap: "Zone γ",
    nameLow: "zone γ",
    location: "labyrinth",
    unlocked() {
        return true
    },

    primaryColor: "#7ccefd",
    secondaryColor: "#214055",

    levelLimit: 20,
    asteroidLimit: 16,
    celestialiteSpawnCooldown: 150,
    celestialiteLimit: 22,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["w185", "li8", "li8", "li8", "li8", "be10", "be10", "be10", "be10", "au198",  "au198", "co60", "co60",  "os192", "am241", "i131", "i131", "pt239", "pt239",]
        if (level >= 8) cel = cel.concat(["au198", "am241",   "w185", "w185", "co60", "co60", "os192",]);

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
            SB_spawnCelestialite("aniciffo")
        }
    },
    statMult: new Decimal(1.25),
    rockMult: new Decimal(1),
    gemMult: new Decimal(1),
    xpReqMult: new Decimal(1),
    savePoints: [0],
}
// =========================================================================
// CELESTIALITE DEFINITION: TUNGSTEN-185 (NON-BOSS ELITE)
// Radioactive Beta-Emitter kinetic rammer with directional dash parry mechanic
// =========================================================================
if (typeof SB_celestialites === "undefined") {
    window.SB_celestialites = {};
}

SB_celestialites.w185 = {
    name: "Tungsten-185",
    symbol: "¹⁸⁵W",
    radius: 28,
    color: "#64748b",
    health: new Decimal(1100),
    maxHealth: new Decimal(1100),
    damage: new Decimal(30),
    bodyDamage: new Decimal(12),
    baseBodyDamage: new Decimal(12),
    regen: new Decimal(3),
    reward() {
        let gain = {};
        gain.epochFragments = Decimal.add(3, Math.random()).mul(1);
        return gain;
    },
    experienceReward() {
        return Decimal.add(4, Math.random()).mul(22);
    },
    initialize(celestialite) {
        celestialite.orbitAngle = Math.random() * Math.PI * 2;

        // Charge state: 0 = Tracking Windup, 1 = Relentless Charge, 2 = Stunned Recovery
        celestialite.chargeState = 0;
        celestialite.stateTimer = 60 + Math.floor(Math.random() * 20);
        celestialite.chargeAng = 0;
        celestialite.chargeSpeed = 0;
        celestialite.parryFlash = 0;

        celestialite.vx = 0;
        celestialite.vy = 0;
        celestialite.ax = 0;
        celestialite.ay = 0;
        celestialite.dvx = 0.94;
        celestialite.dvy = 0.94;
    },
    tick(celestialite) {
        celestialite.orbitAngle += celestialite.chargeState === 1 ? 0.09 : 0.035;
        if (celestialite.parryFlash > 0) celestialite.parryFlash--;

        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        let playerDist = Math.hypot(dx, dy) || 1;
        let targetAng = Math.atan2(dy, dx);

        switch (celestialite.chargeState) {
            case 0: { // TRACKING & WINDUP
                celestialite.bodyDamage = celestialite.baseBodyDamage;
                celestialite.stateTimer--;

                // Hover and aim at the ship
                if (playerDist > 260) {
                    celestialite.ax = Math.cos(targetAng) * 0.22;
                    celestialite.ay = Math.sin(targetAng) * 0.22;
                } else if (playerDist < 160) {
                    celestialite.ax = -Math.cos(targetAng) * 0.25;
                    celestialite.ay = -Math.sin(targetAng) * 0.25;
                } else {
                    celestialite.ax = Math.cos(targetAng + Math.PI / 2) * 0.18;
                    celestialite.ay = Math.sin(targetAng + Math.PI / 2) * 0.18;
                }

                celestialite.chargeAng = targetAng;

                if (celestialite.stateTimer <= 0) {
                    celestialite.chargeState = 1;
                    celestialite.chargeSpeed = 10;
                    celestialite.ax = 0;
                    celestialite.ay = 0;
                }
                break;
            }

            case 1: { // RELENTLESS CHARGE (NEVER STOPS UNTIL IMPACT OR PARRY)
                celestialite.chargeSpeed = Math.min(23, celestialite.chargeSpeed + 0.45);

                // Continuous slight homing tracking
                let diff = targetAng - celestialite.chargeAng;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                celestialite.chargeAng += diff * 0.055;

                celestialite.vx = Math.cos(celestialite.chargeAng) * celestialite.chargeSpeed;
                celestialite.vy = Math.sin(celestialite.chargeAng) * celestialite.chargeSpeed;

                // Collision & Parry Check
                let shipRadius = (player.ir.shipType == 3 || player.ir.shipType == 7) ? arena.ship.radius : 14;
                if (playerDist <= celestialite.radius + shipRadius + 6 && arena && arena.ship) {
                    let shipVx = arena.ship.vx || 0;
                    let shipVy = arena.ship.vy || 0;
                    let shipSpeed = Math.hypot(shipVx, shipVy);

                    let isDashing = arena.ship.dashing || 
                                    (arena.ship.dashFrames && arena.ship.dashFrames > 0) || 
                                    (arena.shipHitInvuln > 0 && shipSpeed > 14) || 
                                    shipSpeed >= 16;

                    // Direction vector from player toward Tungsten-185
                    let toEnemyX = -dx;
                    let toEnemyY = -dy;
                    let toEnemyDist = Math.hypot(toEnemyX, toEnemyY) || 1;

                    // Positive dot product confirms the dash is pointed toward the enemy
                    let dot = (shipVx * toEnemyX + shipVy * toEnemyY) / ((shipSpeed || 1) * toEnemyDist);
                    let parried = isDashing && dot > 0.45;

                    if (parried) {
                        // PARRY SUCCESS: Negate collision damage, stagger enemy, deal counter-damage
                        arena.shipHitInvuln = 45;
                        celestialite.bodyDamage = new Decimal(0);
                        celestialite.parryFlash = 25;

                        let counterDmg = Decimal.mul((arena.shipStats && arena.shipStats.attackDamage) || 35, 25).max(750);
                        celestialite.health = celestialite.health.sub(counterDmg);

                        // Knockback rebound
                        celestialite.vx = Math.cos(targetAng + Math.PI) * 16;
                        celestialite.vy = Math.sin(targetAng + Math.PI) * 16;

                        celestialite.chargeState = 2;
                        celestialite.stateTimer = 90;
                    } else {
                        // HIT: Deal heavy ramming damage and bounce off
                        celestialite.bodyDamage = celestialite.baseBodyDamage;
                        let hitDmg = celestialite.damage.mul(1.4);

                        if (typeof arena.applyShipDamage === "function") {
                            arena.applyShipDamage(hitDmg);
                        } else if (player.ir && player.ir.shipHealth) {
                            let reduction = (arena.shipStats && arena.shipStats.damageReduction) || 1;
                            player.ir.shipHealth = player.ir.shipHealth.sub(hitDmg.div(reduction));
                        }

                        celestialite.vx = Math.cos(targetAng + Math.PI) * 9;
                        celestialite.vy = Math.sin(targetAng + Math.PI) * 9;

                        celestialite.chargeState = 2;
                        celestialite.stateTimer = 55;
                    }
                }
                break;
            }

            case 2: { // STUNNED RECOVERY
                celestialite.vx *= 0.90;
                celestialite.vy *= 0.90;
                celestialite.bodyDamage = new Decimal(4);
                celestialite.stateTimer--;

                if (celestialite.stateTimer <= 0) {
                    celestialite.bodyDamage = celestialite.baseBodyDamage;
                    celestialite.chargeState = 0;
                    celestialite.stateTimer = 70 + Math.floor(Math.random() * 25);
                }
                break;
            }
        }
    },
    onAttacked(celestialite, damage, attacker) {
        if (celestialite.chargeState === 0) {
            celestialite.stateTimer = Math.max(12, celestialite.stateTimer - 5);
        }
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;

        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;

        let wrapped = arena.getVisibleWrappedCoords(
            [celestialite.x, celestialite.y],
            [celestialite.radius * 3.5, celestialite.radius * 3.5]
        );
        if (!wrapped) return;

        let [wx, wy] = wrapped;

        ctx.save();
        ctx.translate(wx + camX, wy + camY);

        // 1. PARRY SHOCKWAVE FLASH
        if (celestialite.parryFlash > 0) {
            let p = 1 - (celestialite.parryFlash / 25);
            ctx.beginPath();
            ctx.arc(0, 0, celestialite.radius + p * 55, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - p})`;
            ctx.lineWidth = 4 * (1 - p);
            ctx.stroke();
        }

        // 2. KINETIC THRUST CONE (While charging)
        if (celestialite.chargeState === 1) {
            ctx.save();
            ctx.rotate(celestialite.chargeAng);
            ctx.beginPath();
            ctx.moveTo(celestialite.radius + 18, 0);
            ctx.lineTo(-celestialite.radius * 0.6, -celestialite.radius * 1.1);
            ctx.lineTo(-celestialite.radius * 0.6, celestialite.radius * 1.1);
            ctx.closePath();
            ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }

        // 3. RADIOACTIVE BETA-EMISSION ORBITAL RINGS
        const ringRadius = celestialite.radius + 14;
        for (let i = 0; i < 2; i++) {
            ctx.save();
            ctx.rotate(celestialite.orbitAngle + (i * Math.PI / 2));

            ctx.beginPath();
            ctx.ellipse(0, 0, ringRadius, ringRadius * 0.38, 0, 0, Math.PI * 2);
            ctx.strokeStyle = celestialite.chargeState === 1 ? "rgba(56, 189, 248, 0.75)" : "rgba(148, 163, 184, 0.4)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Orbiting beta particle nodes
            let nodeAng = celestialite.orbitAngle * 2.4 + (i * Math.PI);
            let nx = Math.cos(nodeAng) * ringRadius;
            let ny = Math.sin(nodeAng) * (ringRadius * 0.38);
            ctx.beginPath();
            ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = celestialite.chargeState === 1 ? "#38bdf8" : "#e2e8f0";
            ctx.fill();

            ctx.restore();
        }

        // 4. HEAVY TUNGSTEN NUCLEUS BODY
        ctx.beginPath();
        ctx.arc(0, 0, celestialite.radius, 0, Math.PI * 2);
        ctx.fillStyle = celestialite.chargeState === 2 ? "#1e293b" : "#334155";
        ctx.fill();

        ctx.strokeStyle = celestialite.chargeState === 1 ? "#38bdf8" : (celestialite.chargeState === 2 ? "#475569" : "#94a3b8");
        ctx.lineWidth = celestialite.chargeState === 1 ? 3.5 : 2;
        ctx.stroke();

        // 5. ATOMIC SYMBOL
        ctx.font = "bold 13px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(celestialite.symbol, 0, 1);

        ctx.restore();
    },
};
SB_celestialites.be10 = {
    name: "Beryllium-10",
    symbol: "¹⁰Be",
    radius: 20,
    color: "#63b8da",
    health: new Decimal(350),
    damage: new Decimal(26),
    bodyDamage: new Decimal(1),
    regen: new Decimal(1),
    reward() {
        let gain = {}
        return gain
    },
    experienceReward() {
        return Decimal.add(5, Math.random()).mul(2)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 40
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 200

        celestialite.dvx = 0.98
        celestialite.dvy = 0.98
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
        if (celestialite.playerDist < 3000) {
            celestialite.targetingTimer = 50
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * 12,
                vy: Math.sin(celestialite.playerAng) * 12,
                life: 600,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 6,
            });
            celestialite.attackCooldown = 40
        }
        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.playerAng) * 0.3
            celestialite.ay = Math.sin(celestialite.playerAng) * 0.3
        } else {
            celestialite.ax = Math.cos(celestialite.playerAng) * 0.5
            celestialite.ay = Math.sin(celestialite.playerAng) * 0.5
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.turnTimer = 200;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 150

        celestialite.vx -= Math.cos(celestialite.playerAng) / 1.5
        celestialite.vy -= Math.sin(celestialite.playerAng) / 1.5
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
        ctx.fillStyle = "#145348";
        ctx.fill();
        ctx.strokeStyle = "#22c5b8";
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
SB_celestialites.aniciffo = {
    name: "Aniciffo, the Celestial of Radioactivity",
    symbol: "An",
    radius: 44,
    color: "#15803d",
    health: new Decimal(150000),
    maxHealth: new Decimal(150000),
    damage: new Decimal(26),
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

        celestialite.maxHealth = new Decimal(150000);
        celestialite.health = new Decimal(150000);
        celestialite.phase = 1;

        celestialite.currentAttack = "gridBombs";
        celestialite.attackInitialized = false;
        celestialite.attackTimer = 50;
        celestialite.pulseCooldown = 750;

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
        celestialite.slashHoldTimer = 0;
        celestialite.slashHit = false;
        celestialite.aimAng = 0;
        celestialite.pulseRing = 0;
        celestialite.maxPulseRing = 60;
        celestialite.gridBombs = [];
        celestialite.parallelLasers = [];
        celestialite.phase2Aura = 0;
    },

    decideAttack(celestialite) {
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        celestialite.playerAng = Math.atan2(dy, dx);
        celestialite.moveAng = celestialite.playerAng;

        if (celestialite.pulseCooldown <= 0) {
            celestialite.currentAttack = celestialite.phase === 2 ? "meltdown" : "pulse";
            celestialite.pulseCooldown = celestialite.phase === 2 ? 650 : 750;
        } else {
            if (celestialite.phase === 2) {
                let roll = Math.random();
                if (roll < 0.30) celestialite.currentAttack = "blinkDash";
                else if (roll < 0.52) celestialite.currentAttack = "parallelLasers";
                else if (roll < 0.68) celestialite.currentAttack = "gridBombs";
                else if (roll < 0.84) celestialite.currentAttack = "rapidLasers";
                else celestialite.currentAttack = "dashSlash";
            } else {
                let roll = Math.random();
                if (roll < 0.45) celestialite.currentAttack = "dashSlash";
                else if (roll < 0.75) celestialite.currentAttack = "gridBombs";
                else celestialite.currentAttack = "rapidLasers";
            }
        }
        celestialite.attackInitialized = false;
    },

    attacks: {
        // --- MOVE 1: DASH SLASH ---
        dashSlash(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 47;
                celestialite.aimAng = celestialite.playerAng;
                celestialite.slashEffect = 0;
                celestialite.slashHit = false;
                celestialite.slashProjFired = false;
            }

            if (celestialite.attackTimer > 22) {
                celestialite.slashEffect = 0;
                celestialite.vx *= 0.80;
                celestialite.vy *= 0.80;
                celestialite.ax = 0;
                celestialite.ay = 0;

                let diff = celestialite.playerAng - celestialite.aimAng;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                celestialite.aimAng += diff * 0.38;
                celestialite.swordAng = -1.4;

                if (celestialite.attackTimer === 23) {
                    const dashSpeed = 58;
                    celestialite.vx = Math.cos(celestialite.aimAng) * dashSpeed;
                    celestialite.vy = Math.sin(celestialite.aimAng) * dashSpeed;
                }
            } else if (celestialite.attackTimer > 9) {
                celestialite.vx *= 0.986;
                celestialite.vy *= 0.986;

                // Show slash arc if close OR as a final-frame fallback, but only deal damage if in range
                if (celestialite.playerDist < 150 || celestialite.attackTimer === 10) {
                    celestialite.slashEffect = 1.0;
                }

                if (celestialite.slashEffect > 0) {
                    let slashAngleDiff = celestialite.playerAng - celestialite.aimAng;
                    while (slashAngleDiff > Math.PI) slashAngleDiff -= 2 * Math.PI;
                    while (slashAngleDiff < -Math.PI) slashAngleDiff += 2 * Math.PI;

                    // Melee hit
                    if (!celestialite.slashHit && celestialite.playerDist < 200 && Math.abs(slashAngleDiff) < 1.5 && arena) {
                        celestialite.slashHit = true;
                        let slashDmg = (celestialite.damage || new Decimal(34)).mul(1.5);
                        if (typeof arena.applyShipDamage === "function") {
                            arena.applyShipDamage(slashDmg);
                        } else if (player.ir && player.ir.shipHealth) {
                            let reduction = (arena.shipStats && arena.shipStats.damageReduction) || 1;
                            player.ir.shipHealth = player.ir.shipHealth.sub(slashDmg.div(reduction));
                        }
                    }

                    // Fire a projectile arc along the slash direction
                    if (!celestialite.slashProjFired && arena && arena.bullets) {
                        celestialite.slashProjFired = true;
                        let projSpeed = 11;
                        for (let s = -1; s <= 1; s++) {
                            let projAng = celestialite.aimAng + s * 0.28;
                            arena.bullets.push({
                                type: "isotopeOrb",
                                x: celestialite.x + Math.cos(projAng) * (celestialite.radius + 10),
                                y: celestialite.y + Math.sin(projAng) * (celestialite.radius + 10),
                                vx: Math.cos(projAng) * projSpeed,
                                vy: Math.sin(projAng) * projSpeed,
                                dvx: 1, dvy: 1, ax: 0, ay: 0, dax: 1, day: 1,
                                life: 400,
                                damage: (celestialite.damage || new Decimal(34)).mul(1.2),
                                spin: projAng,
                                pierce: 0,
                                fromEnemy: true,
                                radius: 10,
                            });
                        }
                    }
                }
            } else {
                celestialite.vx *= 0.82;
                celestialite.vy *= 0.82;
                celestialite.slashEffect = Math.max(0, celestialite.slashEffect - 0.12);
                celestialite.swordAng = 1.4;

                if (celestialite.attackTimer <= 1) {
                    celestialite.slashEffect = 0;
                    celestialite.swordAng = -0.4;
                }
            }
        },

        // --- MOVE 2: GRID BOMBS ---
        gridBombs(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 71;
                celestialite.bombsFired = false;
                celestialite.slashEffect = 0;
            }

            celestialite.vx *= 0.88;
            celestialite.vy *= 0.88;

            if (!celestialite.bombsFired && celestialite.attackTimer <= 63) {
                celestialite.bombsFired = true;
                let bombCount = celestialite.phase === 2 ? (3 + Math.floor(Math.random() * 2)) : (2 + Math.floor(Math.random() * 2));

                for (let b = 0; b < bombCount; b++) {
                    let spreadOffset = bombCount === 2 ? (b === 0 ? -0.85 : 0.85) : ((b - 1) * 0.85);
                    let launchAng = celestialite.playerAng + spreadOffset + (Math.random() - 0.5) * 0.2;
                    let launchSpeed = 10 + Math.random() * 4;

                    celestialite.gridBombs.push({
                        x: celestialite.x,
                        y: celestialite.y,
                        vx: Math.cos(launchAng) * launchSpeed,
                        vy: Math.sin(launchAng) * launchSpeed,
                        fuse: 38,
                        maxFuse: 38,
                        detonating: 0,
                        explosionRadius: 80,
                        angle: launchAng,
                        pinRot: Math.random() * Math.PI * 2,
                        hitPlayer: false,
                    });
                }
            }
        },

        // --- MOVE 3: RADIATION PULSE ---
        pulse(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 46;
                celestialite.slashEffect = 0;
            }

            celestialite.vx *= 0.88;
            celestialite.vy *= 0.88;

            if (celestialite.attackTimer === 21) {
                makeShinies(deadlyRadiation, 5);
                celestialite.maxPulseRing = 48;
                celestialite.pulseRing = 48;

                if (arena && arena.bullets) {
                    for (let i = 0; i < 6; i++) {
                        let orbAng = (i * Math.PI / 3) + Math.random() * 0.2;
                        arena.bullets.push({
                            type: "isotopeOrb",
                            x: celestialite.x,
                            y: celestialite.y,
                            vx: Math.cos(orbAng) * 3.8,
                            vy: Math.sin(orbAng) * 3.8,
                            dvx: 1, dvy: 1, ax: 0, ay: 0, dax: 1, day: 1,
                            life: 400,
                            damage: (celestialite.damage || new Decimal(34)).mul(0.75),
                            spin: Math.random() * Math.PI * 2,
                            pierce: 0,
                            fromEnemy: true,
                            radius: 9,
                        });
                    }
                }
            }
        },

        // --- PHASE 2 MOVE 1: BLINK DASH ---
        blinkDash(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 600;
                celestialite.dashesLeft = 5;
                celestialite.dashPhase = "blink";
                celestialite.dashSubTimer = 0;
                celestialite.slashHit = false;
                celestialite.slashEffect = 0;
                celestialite.slashHoldTimer = 0;
                celestialite.slashProjFired = false;
            }

            // Slash arc fade
            if (celestialite.slashEffect > 0) {
                if (celestialite.slashHoldTimer > 0) {
                    celestialite.slashHoldTimer--;
                } else {
                    celestialite.slashEffect = Math.max(0, celestialite.slashEffect - 0.12);
                    if (celestialite.slashEffect === 0) celestialite.swordAng = -0.4;
                }
            }

            // 1. BLINK — instant teleport to a random position around the player
            if (celestialite.dashPhase === "blink") {
                let spawnDist = 260 + Math.random() * 80;
                let spawnAng = Math.random() * Math.PI * 2;
                celestialite.x = ((arena.ship.x + Math.cos(spawnAng) * spawnDist) % arena.width + arena.width) % arena.width;
                celestialite.y = ((arena.ship.y + Math.sin(spawnAng) * spawnDist) % arena.height + arena.height) % arena.height;

                celestialite.vx = 0;
                celestialite.vy = 0;
                celestialite.ax = 0;
                celestialite.ay = 0;
                celestialite.slashHit = false;
                celestialite.slashProjFired = false;

                // Lock aim toward player
                let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
                celestialite.aimAng = Math.atan2(closest[1] - celestialite.y, closest[0] - celestialite.x);
                celestialite.playerAng = celestialite.aimAng;
                celestialite.swordAng = -1.4;

                celestialite.dashPhase = "telegraph";
                celestialite.dashSubTimer = 36;
            }
            // 2. TELEGRAPH — hold still and track the player
            else if (celestialite.dashPhase === "telegraph") {
                celestialite.vx = 0;
                celestialite.vy = 0;

                let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
                let diff = Math.atan2(closest[1] - celestialite.y, closest[0] - celestialite.x) - celestialite.aimAng;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                celestialite.aimAng += diff * 0.25;
                celestialite.playerAng = celestialite.aimAng;

                celestialite.dashSubTimer--;
                if (celestialite.dashSubTimer <= 0) {
                    celestialite.dashPhase = "dashing";
                    celestialite.dashSubTimer = 28;
                    const dashSpeed = 62;
                    celestialite.vx = Math.cos(celestialite.aimAng) * dashSpeed;
                    celestialite.vy = Math.sin(celestialite.aimAng) * dashSpeed;
                }
            }
            // 3. DASH & SLASH
            else if (celestialite.dashPhase === "dashing") {
                celestialite.vx *= 0.97;
                celestialite.vy *= 0.97;
                celestialite.dashSubTimer--;

                if (celestialite.playerDist < 200) {
                    celestialite.slashEffect = 1.0;

                    if (!celestialite.slashHit && celestialite.playerDist < 170 && arena) {
                        celestialite.slashHit = true;
                        celestialite.slashHoldTimer = 20;
                        celestialite.swordAng = 1.3;

                        let slashDmg = (celestialite.damage || new Decimal(34));
                        if (typeof arena.applyShipDamage === "function") {
                            arena.applyShipDamage(slashDmg);
                        } else if (player.ir && player.ir.shipHealth) {
                            let reduction = (arena.shipStats && arena.shipStats.damageReduction) || 1;
                            player.ir.shipHealth = player.ir.shipHealth.sub(slashDmg.div(reduction));
                        }
                    }

                    if (!celestialite.slashProjFired && arena && arena.bullets) {
                        celestialite.slashProjFired = true;
                        let projSpeed = 10;
                        for (let s = -1; s <= 1; s++) {
                            let projAng = celestialite.aimAng + s * 0.32;
                            arena.bullets.push({
                                type: "isotopeOrb",
                                x: celestialite.x + Math.cos(projAng) * (celestialite.radius + 10),
                                y: celestialite.y + Math.sin(projAng) * (celestialite.radius + 10),
                                vx: Math.cos(projAng) * projSpeed,
                                vy: Math.sin(projAng) * projSpeed,
                                dvx: 1, dvy: 1, ax: 0, ay: 0, dax: 1, day: 1,
                                life: 400,
                                damage: (celestialite.damage || new Decimal(34)).mul(1.2),
                                spin: projAng,
                                pierce: 0,
                                fromEnemy: true,
                                radius: 10,
                            });
                        }
                    }
                }

                let speed = Math.hypot(celestialite.vx, celestialite.vy);
                if (speed < 6 || celestialite.dashSubTimer <= 0) {
                    celestialite.dashesLeft--;
                    if (celestialite.dashesLeft > 0) {
                        celestialite.dashPhase = "blink";
                    } else {
                        celestialite.vx = 0;
                        celestialite.vy = 0;
                        celestialite.attackTimer = 1;
                    }
                }
            }
        },

        // --- PHASE 2 MOVE 2: PARALLEL LASER BARRAGE ---
        parallelLasers(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 65;
                celestialite.lasersSpawned = false;
                celestialite.slashEffect = 0;
            }

            celestialite.vx *= 0.85;
            celestialite.vy *= 0.85;

            if (!celestialite.lasersSpawned && celestialite.attackTimer <= 58) {
                celestialite.lasersSpawned = true;

                let isVertical = Math.random() < 0.5;
                let spacing = 190;
                let baseCoord = isVertical ? arena.ship.x : arena.ship.y;
                let offsetShift = (Math.random() - 0.5) * 80;

                for (let i = -1; i <= 1; i++) {
                    let targetCoord = baseCoord + (i * spacing) + offsetShift;
                    let bound = isVertical ? arena.width : arena.height;
                    targetCoord = ((targetCoord % bound) + bound) % bound;

                    celestialite.parallelLasers.push({
                        axis: isVertical ? "vertical" : "horizontal",
                        coord: targetCoord,
                        fuse: 36,
                        maxFuse: 36,
                        detonating: 0,
                        pinRot: Math.random() * Math.PI * 2,
                        hitPlayer: false,
                    });
                }
            }
        },

        // --- PHASE 2 MOVE 3: CRITICAL MELTDOWN ---
        meltdown(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 55;
                celestialite.bombsFired = false;
                celestialite.slashEffect = 0;
            }

            celestialite.vx *= 0.86;
            celestialite.vy *= 0.86;

            if (!celestialite.bombsFired && celestialite.attackTimer <= 44) {
                celestialite.bombsFired = true;
                celestialite.maxPulseRing = 55;
                celestialite.pulseRing = 55;

                makeShinies(deadlyRadiation, 3);

                for (let i = 0; i < 4; i++) {
                    let bombAng = (i * Math.PI / 2) + Math.PI / 4;
                    celestialite.gridBombs.push({
                        x: celestialite.x,
                        y: celestialite.y,
                        vx: Math.cos(bombAng) * 12,
                        vy: Math.sin(bombAng) * 12,
                        fuse: 30,
                        maxFuse: 30,
                        detonating: 0,
                        explosionRadius: 90,
                        angle: bombAng,
                        pinRot: Math.random() * Math.PI * 2,
                        hitPlayer: false,
                    });
                }

                if (arena && arena.bullets) {
                    for (let i = 0; i < 8; i++) {
                        let orbAng = (i * Math.PI / 4);
                        arena.bullets.push({
                            type: "isotopeOrb",
                            x: celestialite.x,
                            y: celestialite.y,
                            vx: Math.cos(orbAng) * 4.4,
                            vy: Math.sin(orbAng) * 4.4,
                            dvx: 1, dvy: 1, ax: 0, ay: 0, dax: 1, day: 1,
                            life: 400,
                            damage: (celestialite.damage || new Decimal(34)).mul(0.8),
                            spin: Math.random() * Math.PI * 2,
                            pierce: 0,
                            fromEnemy: true,
                            radius: 9,
                        });
                    }
                }
            }
        },

        // --- MOVE: RAPID LASERS ---
        rapidLasers(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.rlShotsLeft = celestialite.phase === 2 ? 9 : 6;
                celestialite.rlShotInterval = celestialite.phase === 2 ? 9 : 12;
                celestialite.rlShotTimer = 8;
                celestialite.attackTimer = celestialite.phase === 2
                    ? 8 + (9 * 9) + 20
                    : 8 + (6 * 12) + 20;
                celestialite.slashEffect = 0;
            }

            celestialite.vx *= 0.88;
            celestialite.vy *= 0.88;
            if (celestialite.playerDist < 220) {
                celestialite.ax = -Math.cos(celestialite.playerAng) * 0.2;
                celestialite.ay = -Math.sin(celestialite.playerAng) * 0.2;
            } else {
                celestialite.ax = 0;
                celestialite.ay = 0;
            }

            if (celestialite.rlShotsLeft > 0) {
                celestialite.rlShotTimer--;
                if (celestialite.rlShotTimer <= 0) {
                    celestialite.rlShotsLeft--;
                    celestialite.rlShotTimer = celestialite.rlShotInterval;

                    if (arena && arena.bullets) {
                        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
                        let aimAng = Math.atan2(closest[1] - celestialite.y, closest[0] - celestialite.x);
                        let spreadCount = celestialite.phase === 2 ? 3 : 1;
                        for (let s = 0; s < spreadCount; s++) {
                            let spread = spreadCount === 1 ? 0 : (s - 1) * 0.18;
                            let ang = aimAng + spread;
                            let speed = celestialite.phase === 2 ? 14 : 12;
                            arena.bullets.push({
                                type: "isotopeOrb",
                                x: celestialite.x + Math.cos(ang) * (celestialite.radius + 8),
                                y: celestialite.y + Math.sin(ang) * (celestialite.radius + 8),
                                vx: Math.cos(ang) * speed,
                                vy: Math.sin(ang) * speed,
                                dvx: 1, dvy: 1, ax: 0, ay: 0, dax: 1, day: 1,
                                life: 400,
                                damage: (celestialite.damage || new Decimal(34)).mul(0.9),
                                spin: ang,
                                pierce: 0,
                                fromEnemy: true,
                                radius: 8,
                            });
                        }

                        celestialite.maxPulseRing = 14;
                        celestialite.pulseRing = 14;
                    }
                }
            }
        },
    },

    tick(celestialite) {
        if (celestialite.phase === 1 && celestialite.health.lte(celestialite.maxHealth.div(2))) {
            celestialite.phase = 2;
            celestialite.maxPulseRing = 80;
            celestialite.pulseRing = 80;
            celestialite.pulseCooldown = 0;
            celestialite.attackTimer = 1;
        }

        celestialite.attackCooldown = Infinity;
        celestialite.shootTimer = Infinity;
        celestialite.cooldown = Infinity;
        celestialite.fireCooldown = Infinity;
        celestialite.genericAttackTimer = Infinity;

        if (celestialite.pulseCooldown > 0) celestialite.pulseCooldown--;
        celestialite.phase2Aura = (celestialite.phase2Aura || 0) + 0.08;

        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        celestialite.playerAng = Math.atan2(dy, dx);

        let isDashing = celestialite.currentAttack === "dashSlash" || celestialite.currentAttack === "blinkDash";
        if (!isDashing || (celestialite.currentAttack === "dashSlash" && celestialite.attackTimer > 22)) {
            let spd = celestialite.phase === 2 ? 0.38 : 0.34;
            if (celestialite.playerDist > 300) {
                celestialite.ax = Math.cos(celestialite.playerAng) * spd;
                celestialite.ay = Math.sin(celestialite.playerAng) * spd;
            } else if (celestialite.playerDist < 160) {
                celestialite.ax = -Math.cos(celestialite.playerAng) * (spd + 0.04);
                celestialite.ay = -Math.sin(celestialite.playerAng) * (spd + 0.04);
            } else {
                celestialite.ax = Math.cos(celestialite.playerAng + Math.PI / 2) * (spd - 0.05);
                celestialite.ay = Math.sin(celestialite.playerAng + Math.PI / 2) * (spd - 0.05);
            }
        }

        if (celestialite.gridBombs) {
            for (let i = celestialite.gridBombs.length - 1; i >= 0; i--) {
                let bomb = celestialite.gridBombs[i];
                bomb.x += bomb.vx;
                bomb.y += bomb.vy;
                bomb.vx *= 0.92;
                bomb.vy *= 0.92;
                bomb.pinRot = (bomb.pinRot || 0) + 0.25;

                bomb.x = (bomb.x % arena.width + arena.width) % arena.width;
                bomb.y = (bomb.y % arena.height + arena.height) % arena.height;

                if (bomb.fuse > 0) {
                    bomb.fuse--;
                    if (bomb.fuse === 0) {
                        bomb.detonating = 25;
                        bomb.hitPlayer = false;
                    }
                } else if (bomb.detonating > 0) {
                    bomb.detonating--;

                    if (!bomb.hitPlayer && arena && arena.ship) {
                        let closestShip = arena.getClosestCoords([bomb.x, bomb.y]);
                        let relX = closestShip[0] - bomb.x;
                        let relY = closestShip[1] - bomb.y;
                        let distToBomb = Math.hypot(relX, relY);

                        let shipRadius = (player.ir.shipType == 3 || player.ir.shipType == 7) ? arena.ship.radius : 14;
                        let maxReach = Math.max(arena.canvasWidth, arena.canvasHeight) * 1.5;

                        if (distToBomb <= maxReach) {
                            let cosA = Math.cos(bomb.angle || 0);
                            let sinA = Math.sin(bomb.angle || 0);
                            let perpH = Math.abs(-relX * sinA + relY * cosA);
                            let perpV = Math.abs(relX * cosA + relY * sinA);
                            let beamHalfWidth = 10 + shipRadius;

                            if (perpH < beamHalfWidth || perpV < beamHalfWidth) {
                                bomb.hitPlayer = true;
                                let bombDmg = (celestialite.damage || new Decimal(34)).mul(1.5);
                                let dmgReduction = (arena.shipStats && arena.shipStats.damageReduction) || 1;
                                if (player.ir && player.ir.shipHealth && typeof player.ir.shipHealth.sub === "function") {
                                    player.ir.shipHealth = player.ir.shipHealth.sub(bombDmg.div(dmgReduction));
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

        if (celestialite.parallelLasers) {
            for (let i = celestialite.parallelLasers.length - 1; i >= 0; i--) {
                let laser = celestialite.parallelLasers[i];
                laser.pinRot = (laser.pinRot || 0) + 0.25;

                if (laser.fuse > 0) {
                    laser.fuse--;
                    if (laser.fuse === 0) {
                        laser.detonating = 25;
                        laser.hitPlayer = false;
                    }
                } else if (laser.detonating > 0) {
                    laser.detonating--;

                    if (arena && arena.ship) {
                        let shipRadius = (player.ir.shipType == 3 || player.ir.shipType == 7) ? arena.ship.radius : 14;
                        let beamHalfWidth = 8;
                        let dist = 0;

                        if (laser.axis === "vertical") {
                            let relX = arena.ship.x - laser.coord;
                            while (relX > arena.width / 2) relX -= arena.width;
                            while (relX < -arena.width / 2) relX += arena.width;
                            dist = Math.abs(relX);
                        } else {
                            let relY = arena.ship.y - laser.coord;
                            while (relY > arena.height / 2) relY -= arena.height;
                            while (relY < -arena.height / 2) relY += arena.height;
                            dist = Math.abs(relY);
                        }

                        if (dist < beamHalfWidth + shipRadius && !laser.hitPlayer) {
                            laser.hitPlayer = true;
                            let laserDmg = (celestialite.damage || new Decimal(34)).mul(1.5);
                            if (typeof arena.applyShipDamage === "function") {
                                arena.applyShipDamage(laserDmg);
                            } else if (player.ir && player.ir.shipHealth) {
                                let reduction = (arena.shipStats && arena.shipStats.damageReduction) || 1;
                                player.ir.shipHealth = player.ir.shipHealth.sub(laserDmg.div(reduction));
                            }
                        } else if (dist >= beamHalfWidth + shipRadius) {
                            laser.hitPlayer = false;
                        }
                    }

                    if (laser.detonating <= 0) {
                        celestialite.parallelLasers.splice(i, 1);
                    }
                }
            }
        }

        if (celestialite.currentAttack && SB_celestialites.aniciffo.attacks[celestialite.currentAttack]) {
            SB_celestialites.aniciffo.attacks[celestialite.currentAttack](celestialite);
        }

        celestialite.attackTimer--;
        if (celestialite.attackTimer <= 0) {
            SB_celestialites.aniciffo.decideAttack(celestialite);
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
        celestialite.parallelLasers = [];
        celestialite.slashEffect = 0;

        player.anl.clearedRooms.roomGamma = true;
        SB_exitRun();
    },

    draw(ctx, celestialite) {
        if (!arena) return;

        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;
        let fullScreenReach = Math.max(arena.canvasWidth, arena.canvasHeight) * 2;

        // 1. Parallel Lasers
        if (celestialite.parallelLasers && celestialite.parallelLasers.length > 0) {
            for (let laser of celestialite.parallelLasers) {
                let isVert = laser.axis === "vertical";
                let lineX = 0;
                let lineY = 0;
                if (isVert) {
                    let relX = laser.coord - arena.ship.x;
                    while (relX > arena.width / 2) relX -= arena.width;
                    while (relX < -arena.width / 2) relX += arena.width;
                    lineX = (arena.canvasWidth / 2) + relX;
                } else {
                    let relY = laser.coord - arena.ship.y;
                    while (relY > arena.height / 2) relY -= arena.height;
                    while (relY < -arena.height / 2) relY += arena.height;
                    lineY = (arena.canvasHeight / 2) + relY;
                }

                ctx.save();
                if (laser.detonating > 0) {
                    let beamAlpha = Math.min(1, laser.detonating / 8);

                    ctx.fillStyle = `rgba(34, 197, 94, ${0.45 * beamAlpha})`;
                    if (isVert) ctx.fillRect(lineX - 16, -fullScreenReach, 32, fullScreenReach * 2);
                    else ctx.fillRect(-fullScreenReach, lineY - 16, fullScreenReach * 2, 32);

                    ctx.fillStyle = `rgba(74, 222, 128, ${0.85 * beamAlpha})`;
                    if (isVert) ctx.fillRect(lineX - 8, -fullScreenReach, 16, fullScreenReach * 2);
                    else ctx.fillRect(-fullScreenReach, lineY - 8, fullScreenReach * 2, 16);

                    ctx.fillStyle = `rgba(255, 255, 255, ${beamAlpha})`;
                    if (isVert) ctx.fillRect(lineX - 3, -fullScreenReach, 6, fullScreenReach * 2);
                    else ctx.fillRect(-fullScreenReach, lineY - 3, fullScreenReach * 2, 6);

                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * beamAlpha})`;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([8, 8]);
                    ctx.beginPath();
                    if (isVert) {
                        ctx.moveTo(lineX - 10, -fullScreenReach); ctx.lineTo(lineX - 10, fullScreenReach);
                        ctx.moveTo(lineX + 10, -fullScreenReach); ctx.lineTo(lineX + 10, fullScreenReach);
                    } else {
                        ctx.moveTo(-fullScreenReach, lineY - 10); ctx.lineTo(fullScreenReach, lineY - 10);
                        ctx.moveTo(-fullScreenReach, lineY + 10); ctx.lineTo(fullScreenReach, lineY + 10);
                    }
                    ctx.stroke();

                } else if (laser.fuse > 0) {
                    let prog = 1 - (laser.fuse / laser.maxFuse);
                    let flash = Math.sin(laser.fuse * 0.45) > 0 ? 1 : 0.4;

                    ctx.strokeStyle = `rgba(239, 68, 68, ${0.35 + prog * 0.5 * flash})`;
                    ctx.lineWidth = 1.5 + prog * 2;
                    ctx.setLineDash([12, 8]);
                    ctx.beginPath();
                    if (isVert) {
                        ctx.moveTo(lineX, -fullScreenReach);
                        ctx.lineTo(lineX, fullScreenReach);
                    } else {
                        ctx.moveTo(-fullScreenReach, lineY);
                        ctx.lineTo(fullScreenReach, lineY);
                    }
                    ctx.stroke();

                    if (laser.fuse < 28) {
                        ctx.font = "bold 13px monospace";
                        ctx.fillStyle = `rgba(255, 70, 70, ${0.65 + prog * 0.35})`;
                        ctx.textAlign = "left";
                        if (isVert) ctx.fillText("Watch for Lasers", lineX + 14, (arena.canvasHeight / 2) - 80);
                        else ctx.fillText("Watch for Lasers", (arena.canvasWidth / 2) - 60, lineY - 14);
                    }

                    ctx.save();
                    let pinX = isVert ? lineX : (arena.canvasWidth / 2);
                    let pinY = isVert ? (arena.canvasHeight / 2) : lineY;
                    ctx.translate(pinX, pinY);
                    ctx.rotate(laser.pinRot);

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
                }

                ctx.restore();
            }
        }

        // 2. Grid Bombs
        if (celestialite.gridBombs && celestialite.gridBombs.length > 0) {
            for (let bomb of celestialite.gridBombs) {
                let wrapped = arena.getWrappedCoords([bomb.x, bomb.y]);
                if (!wrapped) continue;

                let bx = wrapped[0] + camX;
                let by = wrapped[1] + camY;

                ctx.save();
                ctx.translate(bx, by);

                if (bomb.detonating > 0) {
                    let beamAlpha = Math.min(1, bomb.detonating / 8);
                    let burstProgress = 1 - (bomb.detonating / 25);
                    let blastRadius = bomb.explosionRadius || 80;

                    ctx.save();
                    ctx.rotate(bomb.angle || 0);

                    ctx.fillStyle = `rgba(34, 197, 94, ${0.45 * beamAlpha})`;
                    ctx.fillRect(-fullScreenReach, -16, fullScreenReach * 2, 32);
                    ctx.fillRect(-16, -fullScreenReach, 32, fullScreenReach * 2);

                    ctx.fillStyle = `rgba(74, 222, 128, ${0.85 * beamAlpha})`;
                    ctx.fillRect(-fullScreenReach, -8, fullScreenReach * 2, 16);
                    ctx.fillRect(-8, -fullScreenReach, 16, fullScreenReach * 2);

                    ctx.fillStyle = `rgba(255, 255, 255, ${beamAlpha})`;
                    ctx.fillRect(-fullScreenReach, -3, fullScreenReach * 2, 6);
                    ctx.fillRect(-3, -fullScreenReach, 6, fullScreenReach * 2);

                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * beamAlpha})`;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([8, 8]);
                    ctx.beginPath();
                    ctx.moveTo(-fullScreenReach, -10); ctx.lineTo(fullScreenReach, -10);
                    ctx.moveTo(-fullScreenReach, 10); ctx.lineTo(fullScreenReach, 10);
                    ctx.moveTo(-10, -fullScreenReach); ctx.lineTo(-10, fullScreenReach);
                    ctx.moveTo(10, -fullScreenReach); ctx.lineTo(10, fullScreenReach);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.restore();

                    let expandR = burstProgress * blastRadius;
                    ctx.beginPath();
                    ctx.arc(0, 0, expandR, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(134, 239, 172, ${beamAlpha * 0.9})`;
                    ctx.lineWidth = 4 * beamAlpha;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(0, 0, expandR * 0.6, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * beamAlpha})`;
                    ctx.fill();

                } else if (bomb.fuse > 0) {
                    let prog = 1 - (bomb.fuse / bomb.maxFuse);
                    let flash = Math.sin(bomb.fuse * 0.45) > 0 ? 1 : 0.4;

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

                    if (bomb.fuse < 28) {
                        ctx.font = "bold 13px monospace";
                        ctx.fillStyle = `rgba(255, 70, 70, ${0.6 + prog * 0.4})`;
                        ctx.textAlign = "left";
                        ctx.fillText("Watch for Bombs", 18, -14);
                    }

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

                    ctx.beginPath();
                    ctx.arc(0, 4, 11, 0, Math.PI * 2);
                    ctx.fillStyle = "#03160a";
                    ctx.fill();
                    ctx.strokeStyle = prog > 0.65 ? "#ef4444" : "#4ade80";
                    ctx.lineWidth = 2.5;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(0, 4, 4, 0, Math.PI * 2);
                    ctx.fillStyle = prog > 0.65 ? "#ffffff" : "#bbf7d0";
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