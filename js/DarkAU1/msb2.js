//MSB
addLayer("roomBeta", {
    name: "Aniciffo's Labyrinth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "β", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    branches: [["roomB", "#daff74"]],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
        onClick() {
        player.anl.selectedRoom = "roomBeta"
        player.anl.selectedRoomDisplay = "Room β"
    },
    nodeStyle() {
        let str = {
            background: "radial-gradient(#215355, black)",
            backgroundOrigin: "border-box",
            borderColor: "#215355",
            transform: "translate(180px, -100px)",
            color: "rgb(124, 253, 188)",
        }; 
        if (player.anl.selectedRoom == "roomBeta") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Room β",
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
    layerShown() {return player.anl.clearedRooms.roomAlpha && player.anl.clearedRooms.roomD},
})

SB_zones.roomBeta = {
    nameCap: "Zone β",
    nameLow: "zone β",
    location: "labyrinth",
    unlocked() {
        return true
    },

    primaryColor: "#7AFAB7",
    secondaryColor: "#215355",

    levelLimit: 20,
    asteroidLimit: 16,
    celestialiteSpawnCooldown: 100,
    celestialiteLimit: 26,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["li8", "li8", "li8", "li8", "li8", "li8", "li8", "li8", "li8", "li8",  "co60", "co60", "am241", "i131", "pt239", "pt239", "pt239", "au198", "au198", "au198", "au198"]
        if (level >= 8) cel = cel.concat(["au198", "au198",  "co60", "co60","os192","os192","os192","os192","os192",]);

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
            SB_spawnCelestialite("marcelClone")
        }
    },
    statMult: new Decimal(1),
    rockMult: new Decimal(1),
    gemMult: new Decimal(1),
    xpReqMult: new Decimal(1),
    savePoints: [0],
}
SB_celestialites.li8 = {
    name: "Lithium-8",
    symbol: "⁸Li",
    radius: 18,
    color: "#3054bf",
    health: new Decimal(250),
    damage: new Decimal(6),
    bodyDamage: new Decimal(2),
    regen: new Decimal(1),
    reward() {
        let gain = {}
        return gain
    },
    experienceReward() {
        return Decimal.add(5, Math.random()).mul(1.5)
    },
    initialize(celestialite) {
        celestialite.targetingTimer = 0
        celestialite.turnTimer = 200

        celestialite.dvx = 0.98
        celestialite.dvy = 0.98
    },
    tick(celestialite) {
        // Decrease timers
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

SB_celestialites.pt239 = {
    name: "Plutonium-239",
    symbol: "Pu",
    massNumber: "239",
    radius: 32,
    color: "#0ceac5",
    health: new Decimal(1400),
    maxHealth: new Decimal(1400),
    damage: new Decimal(14),
    bodyDamage: new Decimal(2),
    regen: new Decimal(15),
    boss: false,
    customAttacks: true,

    reward() {
        let gain = {};
        gain.epochFragments = Decimal.mul(3, Decimal.add(1, Math.random())).floor();
        return gain;
    },
    experienceReward() {
        return new Decimal(36);
    },

    initialize(celestialite) {
        celestialite.initialized = true;
        celestialite.state = 0; // 0: Neutral Spacing, 1: Single Bomb Throw
        celestialite.stateTimer = 0;
        celestialite.actionTimer = 45 + Math.floor(Math.random() * 25);
        celestialite.electronSpin = Math.random() * Math.PI * 2;

        // Suppress standard engine red pellet attacks
        celestialite.attackCooldown = Infinity;
        celestialite.shootTimer = Infinity;
        celestialite.cooldown = Infinity;
        celestialite.fireCooldown = Infinity;
        celestialite.genericAttackTimer = Infinity;

        celestialite.dvx = 0.94;
        celestialite.dvy = 0.94;

        // Bomb collection
        celestialite.gridBombs = [];
    },

    tick(celestialite) {
        if (!celestialite.initialized) {
            this.initialize(celestialite);
        }

        // Keep standard firing suppressed
        celestialite.attackCooldown = Infinity;
        celestialite.shootTimer = Infinity;
        celestialite.cooldown = Infinity;
        celestialite.fireCooldown = Infinity;
        celestialite.genericAttackTimer = Infinity;

        // Orbital electron rotation
        celestialite.electronSpin = (celestialite.electronSpin + 0.05) % (Math.PI * 2);

        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        let targetAng = Math.atan2(dy, dx);

        // ==========================================
        // 1. UPDATE CROSS BOMBS
        // ==========================================
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
                        bomb.detonating = 20; // 20 frames beam blast duration
                        bomb.hitPlayer = false;
                    }
                } else if (bomb.detonating > 0) {
                    bomb.detonating--;

                    if (!bomb.hitPlayer && arena && arena.ship) {
                        let wrappedCoords = arena.getWrappedCoords([bomb.x, bomb.y]);
                        let relX = arena.ship.x - wrappedCoords[0];
                        let relY = arena.ship.y - wrappedCoords[1];

                        let distToBomb = Math.hypot(relX, relY);
                        let maxReach = Math.max(arena.canvasWidth, arena.canvasHeight) * 1.5;

                        if (distToBomb <= maxReach) {
                            let cosA = Math.cos(bomb.angle || 0);
                            let sinA = Math.sin(bomb.angle || 0);

                            let perp1 = Math.abs(-relX * sinA + relY * cosA);
                            let perp2 = Math.abs(relX * cosA + relY * sinA);

                            let shipRadius = (player.ir.shipType == 3 || player.ir.shipType == 7) ? arena.ship.radius : 14;
                            let beamHalfWidth = 14;

                            if (perp1 < beamHalfWidth + shipRadius || perp2 < beamHalfWidth + shipRadius) {
                                bomb.hitPlayer = true;
                                let bombDmg = (celestialite.damage || new Decimal(14)).mul(1.5);
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

        // ==========================================
        // 2. STATE MACHINE (BOMB ATTACK ONLY)
        // ==========================================
        switch (celestialite.state) {
            case 0: { // Neutral Orbit & Spacing
                celestialite.actionTimer--;

                if (celestialite.playerDist > 320) {
                    celestialite.ax = Math.cos(targetAng) * 0.22;
                    celestialite.ay = Math.sin(targetAng) * 0.22;
                } else if (celestialite.playerDist < 160) {
                    celestialite.ax = -Math.cos(targetAng) * 0.25;
                    celestialite.ay = -Math.sin(targetAng) * 0.25;
                } else {
                    celestialite.ax = Math.cos(targetAng + Math.PI / 2) * 0.18;
                    celestialite.ay = Math.sin(targetAng + Math.PI / 2) * 0.18;
                }

                // Sole Attack: Transition directly to throwing 1 bomb
                if (celestialite.actionTimer <= 0) {
                    celestialite.state = 1;
                    celestialite.stateTimer = 70;
                    celestialite.bombsFired = false;
                }
                break;
            }

            case 1: { // ATTACK: THROW EXACTLY 1 BOMB
                celestialite.stateTimer--;
                celestialite.vx *= 0.88;
                celestialite.vy *= 0.88;

                if (!celestialite.bombsFired && celestialite.stateTimer <= 60) {
                    celestialite.bombsFired = true;
                    let launchAng = targetAng + (Math.random() - 0.5) * 0.3;
                    let launchSpeed = 8;

                    celestialite.gridBombs.push({
                        x: celestialite.x,
                        y: celestialite.y,
                        vx: Math.cos(launchAng) * launchSpeed,
                        vy: Math.sin(launchAng) * launchSpeed,
                        fuse: 45,
                        maxFuse: 45,
                        detonating: 0,
                        angle: Math.random() * Math.PI * 0.5,
                        pinRot: Math.random() * Math.PI * 2,
                        hitPlayer: false,
                    });
                }

                if (celestialite.stateTimer <= 0) {
                    celestialite.state = 0;
                    celestialite.actionTimer = 55 + Math.floor(Math.random() * 25);
                }
                break;
            }
        }
    },

    onAttacked(celestialite, damage, attacker) {
        if (celestialite.state === 0) {
            celestialite.actionTimer = Math.max(10, celestialite.actionTimer - 6);
        }
    },

    onDeath(celestialite) {
        celestialite.gridBombs = [];
    },

    draw(ctx, celestialite) {
        if (!arena) return;

        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;
        let fullScreenReach = Math.max(arena.canvasWidth, arena.canvasHeight) * 2;

        // ==========================================
        // 1. DRAW GRID BOMBS & BEAMS (#0ceac5 THEME)
        // ==========================================
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

                    ctx.save();
                    ctx.rotate(bomb.angle || 0);

                    // Outer Cherenkov Cyan Haze
                    ctx.fillStyle = `rgba(12, 234, 197, ${0.45 * beamAlpha})`;
                    ctx.fillRect(-fullScreenReach, -16, fullScreenReach * 2, 32);
                    ctx.fillRect(-16, -fullScreenReach, 32, fullScreenReach * 2);

                    // Inner Intense Aquamarine Energy Laser
                    ctx.fillStyle = `rgba(94, 234, 212, ${0.85 * beamAlpha})`;
                    ctx.fillRect(-fullScreenReach, -8, fullScreenReach * 2, 16);
                    ctx.fillRect(-8, -fullScreenReach, 16, fullScreenReach * 2);

                    // Piercing Core Line
                    ctx.fillStyle = `rgba(255, 255, 255, ${beamAlpha})`;
                    ctx.fillRect(-fullScreenReach, -3, fullScreenReach * 2, 6);
                    ctx.fillRect(-3, -fullScreenReach, 6, fullScreenReach * 2);

                    // Dashed Accent Outline
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * beamAlpha})`;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([8, 8]);
                    ctx.beginPath();
                    ctx.moveTo(-fullScreenReach, -10); ctx.lineTo(fullScreenReach, -10);
                    ctx.moveTo(-fullScreenReach, 10); ctx.lineTo(fullScreenReach, 10);
                    ctx.moveTo(-10, -fullScreenReach); ctx.lineTo(-10, fullScreenReach);
                    ctx.moveTo(10, -fullScreenReach); ctx.lineTo(10, fullScreenReach);
                    ctx.stroke();

                    // Central Detonation Burst
                    ctx.beginPath();
                    ctx.arc(0, 0, 32 * (1 - bomb.detonating / 20), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${beamAlpha})`;
                    ctx.fill();

                    ctx.restore();

                } else if (bomb.fuse > 0) {
                    let prog = 1 - (bomb.fuse / bomb.maxFuse);
                    let flash = Math.sin(bomb.fuse * 0.4) > 0 ? 1 : 0.4;

                    ctx.save();
                    ctx.rotate(bomb.angle || 0);
                    ctx.strokeStyle = `rgba(12, 234, 197, ${0.4 + prog * 0.5 * flash})`;
                    ctx.lineWidth = 1.5 + prog * 2;
                    ctx.setLineDash([12, 8]);

                    ctx.beginPath();
                    ctx.moveTo(-fullScreenReach, 0); ctx.lineTo(fullScreenReach, 0);
                    ctx.moveTo(0, -fullScreenReach); ctx.lineTo(0, fullScreenReach);
                    ctx.stroke();
                    ctx.restore();

                    if (bomb.fuse < 35) {
                        ctx.font = "bold 13px monospace";
                        ctx.fillStyle = `rgba(12, 234, 197, ${0.7 + prog * 0.3})`;
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
                    ctx.fillStyle = "#02241f";
                    ctx.fill();
                    ctx.strokeStyle = prog > 0.7 ? "#ffffff" : "#0ceac5";
                    ctx.lineWidth = 2.5;
                    ctx.stroke();

                    // Center Fuse Pip
                    ctx.beginPath();
                    ctx.arc(0, 4, 4, 0, Math.PI * 2);
                    ctx.fillStyle = prog > 0.7 ? "#ffffff" : "#a7f3d0";
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        // ==========================================
        // 2. DRAW CELESTIALITE BODY (ISOTOPE FORMAT)
        // ==========================================
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2.5, celestialite.radius * 2.5]);
        if (!wrapped) return;

        ctx.save();
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);

        let cx = wrapped[0];
        let cy = wrapped[1];

        // Orbiting Isotope Electron Shells
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(celestialite.electronSpin || 0);

        // Orbit Shell 1
        ctx.beginPath();
        ctx.ellipse(0, 0, celestialite.radius + 8, (celestialite.radius + 8) * 0.38, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(12, 234, 197, 0.45)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Electron Pip 1
        ctx.beginPath();
        ctx.arc(celestialite.radius + 8, 0, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Orbit Shell 2 (Tilted)
        ctx.beginPath();
        ctx.ellipse(0, 0, celestialite.radius + 8, (celestialite.radius + 8) * 0.38, Math.PI / 2, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(12, 234, 197, 0.3)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Electron Pip 2
        ctx.beginPath();
        ctx.arc(0, celestialite.radius + 8, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.restore();

        // Core Nucleus Body (Standard Isotope Base Circle)
        ctx.beginPath();
        ctx.arc(cx, cy, celestialite.radius, 0, 2 * Math.PI);
        ctx.fillStyle = celestialite.color;
        ctx.shadowColor = "#003b32";
        if (!options.performanceMode) {
            ctx.shadowBlur = 8;
        } else {
            ctx.shadowBlur = 0;
        }
        ctx.fill();

        // Isotope Chemical Symbol (Center)
        ctx.font = "bold 26px monospace";
        ctx.fillStyle = "#003b32";
        ctx.textAlign = "center";
        ctx.fillText(celestialite.symbol, cx + 4, cy + 9);

        // Isotope Mass Number Superscript (Top-Left)
        ctx.font = "bold 12px monospace";
        ctx.textAlign = "right";
        ctx.fillText(celestialite.massNumber || "239", cx - 8, cy - 6);

        ctx.restore();
    }
};

SB_celestialites.os192 = {
    name: "Osmium-192",
    symbol: "Os",
    massNumber: "192",
    radius: 34,
    color: "#38bdf8",
    health: new Decimal(2500),
    maxHealth: new Decimal(2500),
    damage: new Decimal(22),
    bodyDamage: new Decimal(3), 
    regen: new Decimal(3),
    boss: false,
    customAttacks: true,

    reward() {
        let gain = {};
        gain.epochFragments = Decimal.mul(4, Decimal.add(1, Math.random())).floor();
        return gain;
    },
    experienceReward() {
        return new Decimal(55);
    },

    initialize(celestialite) {
        celestialite.initialized = true;
        celestialite.state = 0; // 0: Neutral Positioning, 1: Shockwave Charge & Release
        celestialite.stateTimer = 0;
        celestialite.actionTimer = 45 + Math.floor(Math.random() * 25);
        celestialite.electronSpin = Math.random() * Math.PI * 2;
        celestialite.densityPulse = 0;

        // Suppress default engine red pellet shooting
        celestialite.attackCooldown = Infinity;
        celestialite.shootTimer = Infinity;
        celestialite.cooldown = Infinity;
        celestialite.fireCooldown = Infinity;
        celestialite.genericAttackTimer = Infinity;

        // High inertia physics
        celestialite.dvx = 0.96;
        celestialite.dvy = 0.96;

        // Active radial shockwaves collection
        celestialite.shockwaves = [];
    },

    tick(celestialite) {
        if (!celestialite.initialized) {
            this.initialize(celestialite);
        }

        // Keep standard generic firing suppressed
        celestialite.attackCooldown = Infinity;
        celestialite.shootTimer = Infinity;
        celestialite.cooldown = Infinity;
        celestialite.fireCooldown = Infinity;
        celestialite.genericAttackTimer = Infinity;

        // Fast electron spin
        celestialite.electronSpin = (celestialite.electronSpin + 0.06) % (Math.PI * 2);
        celestialite.densityPulse = (celestialite.densityPulse + 0.08) % (Math.PI * 2);

        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        let targetAng = Math.atan2(dy, dx);

        // ==========================================
        // 1. UPDATE EXPANDING RADIAL SHOCKWAVES
        // ==========================================
        if (celestialite.shockwaves) {
            for (let i = celestialite.shockwaves.length - 1; i >= 0; i--) {
                let wave = celestialite.shockwaves[i];
                wave.radius += wave.speed;
                wave.life--;

                // Shockwave collision with player ship
                if (arena && arena.ship) {
                    let relX = arena.ship.x - wave.x;
                    if (relX > arena.width / 2) relX -= arena.width;
                    if (relX < -arena.width / 2) relX += arena.width;

                    let relY = arena.ship.y - wave.y;
                    if (relY > arena.height / 2) relY -= arena.height;
                    if (relY < -arena.height / 2) relY += arena.height;

                    let distToWaveOrigin = Math.hypot(relX, relY);
                    let shipRadius = (player.ir.shipType == 3 || player.ir.shipType == 7) ? arena.ship.radius : 14;
                    let waveHalfThickness = wave.thickness / 2;

                    // Check if player's hitbox overlaps the ring crest
                    let isTouchingWave = Math.abs(distToWaveOrigin - wave.radius) < (waveHalfThickness + shipRadius);

                    if (isTouchingWave) {
                        // Detect whether player is actively executing a dash
                        let shipSpeed = Math.hypot(arena.ship.vx || 0, arena.ship.vy || 0);
                        let isDashing = arena.ship.dashing || 
                                        arena.ship.isDashing || 
                                        (arena.ship.dashTimer && arena.ship.dashTimer > 0) || 
                                        (arena.ship.dashDuration && arena.ship.dashDuration > 0) || 
                                        shipSpeed >= 16;

                        if (isDashing) {
                            // Player successfully phase-dashed through the shockwave
                            wave.passedShip = true;
                        } else if (!wave.passedShip && !wave.hitPlayer) {
                            // Hit by shockwave without dashing
                            wave.hitPlayer = true;
                            let shockDmg = (celestialite.damage || new Decimal(22)).mul(1.6);

                            if (typeof arena.applyShipDamage === "function") {
                                arena.applyShipDamage(shockDmg);
                            } else if (player.ir && player.ir.shipHealth) {
                                let reduction = (arena.shipStats && arena.shipStats.damageReduction) || 1;
                                player.ir.shipHealth = player.ir.shipHealth.sub(shockDmg.div(reduction));
                            }
                        }
                    }
                }

                // Remove shockwave when its lifespan expires
                if (wave.life <= 0 || wave.radius >= wave.maxRadius) {
                    celestialite.shockwaves.splice(i, 1);
                }
            }
        }

        // ==========================================
        // 2. STATE MACHINE
        // ==========================================
        switch (celestialite.state) {
            case 0: { // Steady Stalking & Positioning
                celestialite.actionTimer--;

                if (celestialite.playerDist > 300) {
                    celestialite.ax = Math.cos(targetAng) * 0.24;
                    celestialite.ay = Math.sin(targetAng) * 0.24;
                } else if (celestialite.playerDist < 170) {
                    celestialite.ax = -Math.cos(targetAng) * 0.28;
                    celestialite.ay = -Math.sin(targetAng) * 0.28;
                } else {
                    celestialite.ax = Math.cos(targetAng + Math.PI / 2) * 0.20;
                    celestialite.ay = Math.sin(targetAng + Math.PI / 2) * 0.20;
                }

                if (celestialite.actionTimer <= 0) {
                    celestialite.state = 1;
                    celestialite.stateTimer = 60; // 35-frame telegraph charge + 25-frame recovery
                    celestialite.waveEmitted = false;
                }
                break;
            }

            case 1: { // DENSE SHOCKWAVE EMISSION
                celestialite.stateTimer--;
                celestialite.vx *= 0.88;
                celestialite.vy *= 0.88;

                // Release radial shockwave after charging
                if (!celestialite.waveEmitted && celestialite.stateTimer <= 25) {
                    celestialite.waveEmitted = true;

                    celestialite.shockwaves.push({
                        x: celestialite.x,
                        y: celestialite.y,
                        radius: celestialite.radius,
                        speed: 5.8, // Speed of shockwave expansion
                        thickness: 18,
                        maxRadius: Math.max(arena.canvasWidth, arena.canvasHeight) * 0.9,
                        life: 140,
                        hitPlayer: false,
                        passedShip: false,
                    });
                }

                if (celestialite.stateTimer <= 0) {
                    celestialite.state = 0;
                    celestialite.actionTimer = 55 + Math.floor(Math.random() * 25);
                }
                break;
            }
        }
    },

    onAttacked(celestialite, damage, attacker) {
        if (celestialite.state === 0) {
            celestialite.actionTimer = Math.max(12, celestialite.actionTimer - 6);
        }
    },

    onDeath(celestialite) {
        celestialite.shockwaves = [];
    },

    draw(ctx, celestialite) {
        if (!arena) return;

        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;

        // ==========================================
        // 1. DRAW EXPANDING RADIAL SHOCKWAVES
        // ==========================================
        if (celestialite.shockwaves && celestialite.shockwaves.length > 0) {
            for (let wave of celestialite.shockwaves) {
                let wrapped = arena.getWrappedCoords([wave.x, wave.y]);
                if (!wrapped) continue;

                let wx = wrapped[0] + camX;
                let wy = wrapped[1] + camY;
                let fadeAlpha = Math.min(1, wave.life / 30);

                ctx.save();
                ctx.translate(wx, wy);

                // Outer Dense Metallic Blue Aura
                ctx.beginPath();
                ctx.arc(0, 0, wave.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(14, 165, 233, ${0.4 * fadeAlpha})`;
                ctx.lineWidth = wave.thickness + 10;
                ctx.stroke();

                // Main Sharp Shockwave Crest
                ctx.beginPath();
                ctx.arc(0, 0, wave.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.9 * fadeAlpha})`;
                ctx.lineWidth = wave.thickness;
                ctx.stroke();

                // Blinding White Cutting Wavefront
                ctx.beginPath();
                ctx.arc(0, 0, wave.radius + (wave.thickness * 0.25), 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(240, 249, 255, ${0.95 * fadeAlpha})`;
                ctx.lineWidth = 3;
                ctx.stroke();

                // Dashed Density Distortion Sub-Ring
                ctx.beginPath();
                ctx.arc(0, 0, Math.max(0, wave.radius - (wave.thickness * 0.35)), 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(224, 242, 254, ${0.6 * fadeAlpha})`;
                ctx.lineWidth = 2;
                ctx.setLineDash([12, 10]);
                ctx.stroke();

                ctx.restore();
            }
        }

        // ==========================================
        // 2. DRAW CELESTIALITE BODY (ISOTOPE FORMAT)
        // ==========================================
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2.5, celestialite.radius * 2.5]);
        if (!wrapped) return;

        let cx = wrapped[0] + camX;
        let cy = wrapped[1] + camY;

        ctx.save();

        // Telegraph Charge Inward Distortion (Before firing shockwave)
        if (celestialite.state === 1 && celestialite.stateTimer > 25) {
            let chargeProg = (60 - celestialite.stateTimer) / 35;
            let chargeRadius = celestialite.radius + 36 * (1 - chargeProg);

            ctx.save();
            ctx.translate(cx, cy);
            ctx.beginPath();
            ctx.arc(0, 0, chargeRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 + chargeProg * 0.5})`;
            ctx.lineWidth = 2.5;
            ctx.setLineDash([8, 6]);
            ctx.stroke();
            ctx.restore();
        }

        // Orbiting Isotope Electron Shells
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(celestialite.electronSpin || 0);

        // Orbit Shell 1
        ctx.beginPath();
        ctx.ellipse(0, 0, celestialite.radius + 9, (celestialite.radius + 9) * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Electron Node 1
        ctx.beginPath();
        ctx.arc(celestialite.radius + 9, 0, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Orbit Shell 2 (Perpendicular Axis)
        ctx.beginPath();
        ctx.ellipse(0, 0, celestialite.radius + 9, (celestialite.radius + 9) * 0.4, Math.PI / 2, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Electron Node 2
        ctx.beginPath();
        ctx.arc(0, celestialite.radius + 9, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.restore();

        // Dense Nucleus Body (Standard Isotope Base Circle)
        ctx.beginPath();
        ctx.arc(cx, cy, celestialite.radius, 0, 2 * Math.PI);
        ctx.fillStyle = celestialite.color;
        ctx.shadowColor = "#0369a1";
        if (!options.performanceMode) {
            ctx.shadowBlur = 9;
        } else {
            ctx.shadowBlur = 0;
        }
        ctx.fill();

        // Isotope Chemical Symbol ("Os")
        ctx.font = "bold 26px monospace";
        ctx.fillStyle = "#082f49";
        ctx.textAlign = "center";
        ctx.fillText(celestialite.symbol, cx + 4, cy + 9);

        // Isotope Mass Number Superscript ("192")
        ctx.font = "bold 12px monospace";
        ctx.textAlign = "right";
        ctx.fillText(celestialite.massNumber || "192", cx - 8, cy - 6);

        ctx.restore();
    }
};
if (typeof SB_projectiles === "undefined") {
    window.SB_projectiles = {};
}

if (typeof SB_projectiles === "undefined") {
    window.SB_projectiles = {};
}

SB_projectiles.marcelKnife = {
    template(celestialite, extra = {}) {
        let ang = extra.ang !== undefined ? extra.ang : 0;
        let spd = extra.speed || 14;
        return {
            type: "marcelKnife",
            x: extra.x || (celestialite ? celestialite.x : 0),
            y: extra.y || (celestialite ? celestialite.y : 0),
            vx: extra.suspended ? 0 : Math.cos(ang) * spd,
            vy: extra.suspended ? 0 : Math.sin(ang) * spd,
            dvx: 1,
            dvy: 1,
            ax: 0,
            ay: 0,
            dax: 1,
            day: 1,
            ang: ang,
            currentSpeed: spd,
            maxSpeed: 24,
            knifePhase: extra.suspended ? 2 : 0,
            phaseTimer: 0,
            life: extra.life || 250,
            initialLife: extra.life || 250,
            damage: extra.damage || (celestialite ? celestialite.damage : new Decimal(26)),
            pierce: 0,
            fromEnemy: true,
            radius: 7,
            isKnife: true,
            suspended: !!extra.suspended,
            ...extra
        };
    },

    tick(bullet) {
        if (!bullet) return;

        // Frozen completely in place during Time Stop
        if (bullet.suspended) {
            bullet.vx = 0;
            bullet.vy = 0;
            return;
        }

        bullet.phaseTimer = (bullet.phaseTimer || 0) + 1;

        if (bullet.knifePhase === 0) {
            bullet.currentSpeed = (bullet.currentSpeed || 15) * 0.90;
            bullet.vx = Math.cos(bullet.ang) * bullet.currentSpeed;
            bullet.vy = Math.sin(bullet.ang) * bullet.currentSpeed;

            if (bullet.phaseTimer >= 20 || bullet.currentSpeed < 0.8) {
                bullet.knifePhase = 1;
                bullet.phaseTimer = 0;
                bullet.currentSpeed = 0;
                bullet.vx = 0;
                bullet.vy = 0;
            }
        } else if (bullet.knifePhase === 1) {
            bullet.vx = 0;
            bullet.vy = 0;
            if (bullet.phaseTimer >= 10) {
                bullet.knifePhase = 2;
                bullet.phaseTimer = 0;
            }
        } else if (bullet.knifePhase === 2) {
            bullet.currentSpeed = Math.min(bullet.maxSpeed || 24, (bullet.currentSpeed || 0) + 2.0);
            bullet.vx = Math.cos(bullet.ang) * bullet.currentSpeed;
            bullet.vy = Math.sin(bullet.ang) * bullet.currentSpeed;
        }
    },

    onHit(bullet, target) {},

    draw(ctx, bullet) {
    if (!arena || !bullet) return;
    let camX = (arena.canvasWidth / 2) - arena.ship.x;
    let camY = (arena.canvasHeight / 2) - arena.ship.y;
    let wrapped = arena.getWrappedCoords([bullet.x, bullet.y]);
    if (!wrapped) return;

    let bx = wrapped[0] + camX;
    let by = wrapped[1] + camY;

    ctx.save();
    ctx.translate(bx, by);

    let ang = bullet.ang !== undefined ? bullet.ang : Math.atan2(bullet.vy, bullet.vx || 0);
    ctx.rotate(ang);

    let s = 0.9;
    let len = 32 * s;
    let bw = 4.2 * s;

    // Pommel Loop
    let ringX = -14 * s;
    let outerR = 5.2 * s;
    let innerR = 2.6 * s;
    ctx.fillStyle = "#334155";
    ctx.strokeStyle = "#14532d";
    ctx.lineWidth = 1 * s;
    ctx.beginPath();
    ctx.arc(ringX, 0, outerR, 0, Math.PI * 2);
    ctx.arc(ringX, 0, innerR, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Grip
    let handleStart = ringX + outerR * 0.85;
    let handleEnd = 1.5 * s;
    let hw = 1.6 * s;
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 0.9 * s;
    ctx.beginPath();
    ctx.rect(handleStart, -hw, handleEnd - handleStart, hw * 2);
    ctx.fill();
    ctx.stroke();

    // Crossguard
    let gw = 1.2 * s;
    let gh = 5.5 * s;
    let gx = 1.5 * s;
    ctx.fillStyle = "#475569";
    ctx.strokeStyle = "#166534";
    ctx.lineWidth = 1 * s;
    ctx.beginPath();
    ctx.rect(gx, -gh, gw, gh * 2);
    ctx.fill();
    ctx.stroke();

    // Faceted Blade
    let bladeStartX = gx + gw;
    ctx.fillStyle = "#dcfce7";
    ctx.strokeStyle = "#14532d";
    ctx.lineWidth = 0.8 * s;
    ctx.beginPath();
    ctx.moveTo(len, 0);
    ctx.lineTo(bladeStartX, -bw);
    ctx.lineTo(bladeStartX, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#143d26";
    ctx.beginPath();
    ctx.moveTo(len, 0);
    ctx.lineTo(bladeStartX, 0);
    ctx.lineTo(bladeStartX, bw);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Spine Ridge
    ctx.strokeStyle = "#86efac";
    ctx.lineWidth = 0.8 * s;
    ctx.beginPath();
    ctx.moveTo(len * 0.96, 0);
    ctx.lineTo(bladeStartX, 0);
    ctx.stroke();

    ctx.restore();
    }
};

SB_celestialites.marcelClone = {
    name: "Marcel's Clone",
    symbol: "M",
    radius: 32,
    color: "#94a3b8",
    health: new Decimal(100000),
    maxHealth: new Decimal(100000),
    damage: new Decimal(25),
    bodyDamage: new Decimal(4),
    regen: new Decimal(4),
    boss: true,
    customAttacks: true,

    imageSrc: "resources/battle/msbClone.png",
    sprite: null,

    reward() {
        return {
            spaceRock: Decimal.mul(120, Decimal.add(2, Math.random())),
            spaceGem: Decimal.mul(18, Decimal.add(1, Math.random())),
            epochFragments: new Decimal(15),
        };
    },
    experienceReward() {
        return new Decimal(650);
    },

    initialize(celestialite) {
        screenFlash("— Marcel's Clone —", 1200);
        arena.enterFullscreen();
        arena.enemies = [];
        arena.bullets = [];
        arena.asteroids = [];
        arena.xpOrbs = [];
        arena.gammaTrails = [];
        arena.enemySpawnCooldown = arena.enemySpawnCooldownMax;
        arena.bossActive = true;
        player.ir.marcelCloneFought = true;

        celestialite.maxHealth = new Decimal(100000);
        celestialite.health = new Decimal(100000);
        celestialite.phase = 1;

        celestialite.currentAttack = "rapidKnives";
        celestialite.attackInitialized = false;
        celestialite.attackTimer = 60;
        celestialite.timeStopCooldown = 900;

        celestialite.attackCooldown = Infinity;
        celestialite.shootTimer = Infinity;
        celestialite.cooldown = Infinity;
        celestialite.fireCooldown = Infinity;
        celestialite.genericAttackTimer = Infinity;

        celestialite.dvx = 0.94;
        celestialite.dvy = 0.94;
        celestialite.aimAng = 0;
        celestialite.dashMist = [];

        celestialite.frozenPlayerPos = null;
        celestialite.suspendedKnives = [];

        if (!this.sprite) {
            this.sprite = new Image();
            this.sprite.src = this.imageSrc;
        }
    },

    decideAttack(celestialite) {
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        celestialite.playerAng = Math.atan2(dy, dx);
        celestialite.moveAng = celestialite.playerAng;

        if (celestialite.timeStopCooldown <= 0) {
            celestialite.currentAttack = "timeStop";
            celestialite.timeStopCooldown = 900;
        } else {
            celestialite.currentAttack = Math.random() < 0.60 ? "rapidKnives" : "dash";
        }
        celestialite.attackInitialized = false;
    },

    attacks: {
        rapidKnives(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 85;
                celestialite.knivesLeft = 8;
                celestialite.fireDelay = 0;
            }

            celestialite.vx *= 0.92;
            celestialite.vy *= 0.92;

            if (celestialite.fireDelay > 0) {
                celestialite.fireDelay--;
            }

            if (celestialite.knivesLeft > 0 && celestialite.fireDelay <= 0 && arena && arena.bullets) {
                celestialite.knivesLeft--;
                celestialite.fireDelay = 9;

                let ang = celestialite.playerAng + (Math.random() - 0.5) * 0.08;
                let startSpeed = 17;

                arena.bullets.push(SB_projectiles.marcelKnife.template(celestialite, {
                    x: celestialite.x + Math.cos(ang) * (celestialite.radius + 12),
                    y: celestialite.y + Math.sin(ang) * (celestialite.radius + 12),
                    ang: ang,
                    speed: startSpeed,
                    life: 180,
                    damage: celestialite.damage || new Decimal(26),
                }));
            }
        },

        dash(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 44;
                celestialite.aimAng = celestialite.playerAng;
                celestialite.dashed = false;
            }

            if (celestialite.attackTimer > 32) {
                celestialite.vx *= 0.84;
                celestialite.vy *= 0.84;

                let diff = celestialite.playerAng - celestialite.aimAng;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                celestialite.aimAng += diff * 0.35;

                if (celestialite.attackTimer === 33) {
                    celestialite.dashed = true;
                    const dashSpeed = 42;
                    celestialite.vx = Math.cos(celestialite.aimAng) * dashSpeed;
                    celestialite.vy = Math.sin(celestialite.aimAng) * dashSpeed;
                }
            } else if (celestialite.attackTimer > 14) {
                celestialite.vx *= 0.96;
                celestialite.vy *= 0.96;

                for (let p = 0; p < 3; p++) {
                    let offAng = celestialite.aimAng + Math.PI + (Math.random() - 0.5) * 1.2;
                    let offDist = Math.random() * 8;
                    celestialite.dashMist.push({
                        x: celestialite.x + Math.cos(offAng) * offDist,
                        y: celestialite.y + Math.sin(offAng) * offDist,
                        vx: (Math.random() - 0.5) * 1.5 - (celestialite.vx * 0.08),
                        vy: (Math.random() - 0.5) * 1.5 - (celestialite.vy * 0.08),
                        radius: 10 + Math.random() * 8,
                        maxRadius: 24 + Math.random() * 8,
                        timer: 28 + Math.floor(Math.random() * 12),
                        maxTimer: 40,
                    });
                }
            } else {
                celestialite.vx *= 0.88;
                celestialite.vy *= 0.88;
            }
        },

        timeStop(celestialite) {
            if (!celestialite.attackInitialized) {
                celestialite.attackInitialized = true;
                celestialite.attackTimer = 220;
                celestialite.suspendedKnives = [];
                celestialite.knifeCooldown = 0;

                if (arena && arena.ship) {
                    celestialite.frozenPlayerPos = { x: arena.ship.x, y: arena.ship.y };
                    let closest = arena.getClosestCoords([celestialite.x, celestialite.y], [arena.ship.x, arena.ship.y]);
                    celestialite.orbitAng = Math.atan2(celestialite.y - closest[1], celestialite.x - closest[0]);

                    if (typeof launchZaWarudoDOMEffect === "function" && arena.canvas) {
                        let rect = arena.canvas.getBoundingClientRect();
                        let camX = (arena.canvasWidth / 2) - arena.ship.x;
                        let camY = (arena.canvasHeight / 2) - arena.ship.y;
                        let wrapped = arena.getWrappedCoords([celestialite.x, celestialite.y]);
                        if (wrapped) {
                            let screenX = rect.left + wrapped[0] + camX;
                            let screenY = rect.top + wrapped[1] + camY;
                            launchZaWarudoDOMEffect(screenX, screenY, 1000000);
                        }
                    }
                } else {
                    celestialite.orbitAng = 0;
                }
            }

            // 1. Freeze player and lock weapons
            if (celestialite.frozenPlayerPos && arena && arena.ship) {
                arena.ship.x = celestialite.frozenPlayerPos.x;
                arena.ship.y = celestialite.frozenPlayerPos.y;
                arena.ship.vx = 0;
                arena.ship.vy = 0;
                arena.ship.velocity = 0;
                arena.ship.dashFrames = 0;
                arena.ship.dashing = false;
                arena.pointerDown = false;
                arena.ship.lastShot = Date.now() + 1000;

                if (arena.keys) {
                    arena.keys['KeyW'] = false;
                    arena.keys['KeyS'] = false;
                    arena.keys['KeyA'] = false;
                    arena.keys['KeyD'] = false;
                    arena.keys['Space'] = false;
                    arena.keys['ShiftLeft'] = false;
                    arena.keys['ShiftRight'] = false;
                    arena.keys['Shift'] = false;
                }
                arena.mobileLeftStickAngle = null;
                arena.mobileRightStickAngle = null;
            }

            // 2. Freeze existing projectiles in stasis
            if (arena && arena.bullets) {
                for (let b of arena.bullets) {
                    b.x -= b.vx;
                    b.y -= b.vy;
                    b.life = (b.life || 100) + 1;
                }
            }

            // 3. Wide orbit at a great distance (530px - 610px)
            if (celestialite.frozenPlayerPos) {
                celestialite.vx = 0;
                celestialite.vy = 0;
                celestialite.ax = 0;
                celestialite.ay = 0;

                celestialite.orbitAng += 0.024;
                let currentOrbitRadius = 570 + Math.sin(celestialite.orbitAng * 2) * 40;

                let targetX = celestialite.frozenPlayerPos.x + Math.cos(celestialite.orbitAng) * currentOrbitRadius;
                let targetY = celestialite.frozenPlayerPos.y + Math.sin(celestialite.orbitAng) * currentOrbitRadius;

                celestialite.x = ((targetX % arena.width) + arena.width) % arena.width;
                celestialite.y = ((targetY % arena.height) + arena.height) % arena.height;

                let closestPlayer = arena.getClosestCoords([celestialite.x, celestialite.y], [celestialite.frozenPlayerPos.x, celestialite.frozenPlayerPos.y]);
                let baseAimAng = Math.atan2(closestPlayer[1] - celestialite.y, closestPlayer[0] - celestialite.x);
                celestialite.playerAng = baseAimAng;

                if (celestialite.attackTimer > 25 && celestialite.attackTimer < 100) {
                    if (celestialite.knifeCooldown > 0) {
                        celestialite.knifeCooldown--;
                    } else {
                        celestialite.knifeCooldown = 11;

                        // Alternates between dead-on target and angled flanking knives
                        let isDirect = (celestialite.suspendedKnives.length % 2 === 0);
                        let aimError = 0;
                        if (!isDirect) {
                            let sign = Math.random() < 0.5 ? 1 : -1;
                            aimError = sign * (0.14 + Math.random() * 0.20);
                        }
                        let knifeAng = baseAimAng + aimError;

                        let depthVariation = (Math.random() - 0.5) * 70;
                        let spawnDist = celestialite.radius + 16 + depthVariation;
                        let kx = celestialite.x + Math.cos(knifeAng) * spawnDist;
                        let ky = celestialite.y + Math.sin(knifeAng) * spawnDist;

                        celestialite.suspendedKnives.push(SB_projectiles.marcelKnife.template(celestialite, {
                            x: ((kx % arena.width) + arena.width) % arena.width,
                            y: ((ky % arena.height) + arena.height) % arena.height,
                            ang: knifeAng,
                            speed: 13.5,
                            life: 260,
                            damage: (celestialite.damage || new Decimal(26)).mul(1.2),
                            suspended: true,
                        }));
                    }
                }
            }

            // 5. Time resumes
            if (celestialite.attackTimer <= 1) {
                celestialite.frozenPlayerPos = null;

                if (typeof resumeZaWarudoTime === "function") {
                    resumeZaWarudoTime();
                }

                if (arena && arena.bullets) {
                    for (let knife of celestialite.suspendedKnives) {
                        knife.suspended = false;
                        knife.knifePhase = 2;
                        knife.vx = Math.cos(knife.ang) * knife.currentSpeed;
                        knife.vy = Math.sin(knife.ang) * knife.currentSpeed;
                        arena.bullets.push(knife);
                    }
                }
                celestialite.suspendedKnives = [];
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

        if (celestialite.timeStopCooldown > 0) {
            celestialite.timeStopCooldown--;
        }

        let closest = arena.getClosestCoords([celestialite.x, celestialite.y]);
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        celestialite.playerAng = Math.atan2(dy, dx);

        if (celestialite.currentAttack !== "timeStop" && (celestialite.currentAttack !== "dash" || celestialite.attackTimer > 32)) {
            if (celestialite.playerDist > 320) {
                celestialite.ax = Math.cos(celestialite.playerAng) * 0.22;
                celestialite.ay = Math.sin(celestialite.playerAng) * 0.22;
            } else if (celestialite.playerDist < 180) {
                celestialite.ax = -Math.cos(celestialite.playerAng) * 0.26;
                celestialite.ay = -Math.sin(celestialite.playerAng) * 0.26;
            } else {
                celestialite.ax = Math.cos(celestialite.playerAng + Math.PI / 2) * 0.20;
                celestialite.ay = Math.sin(celestialite.playerAng + Math.PI / 2) * 0.20;
            }
        }

        if (celestialite.suspendedKnives && celestialite.suspendedKnives.length > 0) {
            for (let knife of celestialite.suspendedKnives) {
                SB_projectiles.marcelKnife.tick(knife);
            }
        }

        if (celestialite.dashMist) {
            for (let mist of celestialite.dashMist) {
                mist.x += mist.vx;
                mist.y += mist.vy;
                mist.vx *= 0.95;
                mist.vy *= 0.95;
                mist.radius += (mist.maxRadius - mist.radius) * 0.05;
                mist.timer--;
            }
            celestialite.dashMist = celestialite.dashMist.filter(m => m.timer > 0);
        }

        if (celestialite.currentAttack && SB_celestialites.marcelClone.attacks[celestialite.currentAttack]) {
            SB_celestialites.marcelClone.attacks[celestialite.currentAttack](celestialite);
        }

        celestialite.attackTimer--;
        if (celestialite.attackTimer <= 0) {
            SB_celestialites.marcelClone.decideAttack(celestialite);
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

        if (celestialite.currentAttack === "timeStop" && typeof resumeZaWarudoTime === "function") {
            resumeZaWarudoTime();
        }

        celestialite.suspendedKnives = [];
        celestialite.dashMist = [];
        celestialite.frozenPlayerPos = null;

        player.anl.clearedRooms.roomBeta = true
        player.ir.battleXP = player.ir.battleXPReq;
    },

    draw(ctx, celestialite) {
        if (!arena) return;

        let camX = (arena.canvasWidth / 2) - arena.ship.x;
        let camY = (arena.canvasHeight / 2) - arena.ship.y;

        if (celestialite.currentAttack === "timeStop") {
            let t = celestialite.attackTimer;
            ctx.save();

            let vignetteAlpha = t > 185 ? (205 - t) / 20 * 0.42 : (t < 20 ? t / 20 * 0.42 : 0.42);
            ctx.fillStyle = `rgba(15, 23, 42, ${vignetteAlpha})`;
            ctx.fillRect(0, 0, arena.canvasWidth, arena.canvasHeight);

            if (t > 175) {
                let waveR = (205 - t) * 55;
                ctx.beginPath();
                ctx.arc(arena.canvasWidth / 2, arena.canvasHeight / 2, waveR, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(226, 232, 240, 0.75)";
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            ctx.font = "bold 20px monospace";
            ctx.fillStyle = `rgba(241, 245, 249, ${0.7 + Math.sin(t * 0.2) * 0.3})`;
            ctx.textAlign = "center";
            ctx.fillText("— THE WORLD —", arena.canvasWidth / 2, 80);

            ctx.restore();
        }

        if (celestialite.dashMist && celestialite.dashMist.length > 0) {
            ctx.save();
            if (!options.performanceMode) ctx.globalCompositeOperation = "lighter";

            for (let mist of celestialite.dashMist) {
                let wrapped = arena.getWrappedCoords([mist.x, mist.y]);
                if (!wrapped) continue;

                let drawX = wrapped[0] + camX;
                let drawY = wrapped[1] + camY;
                let alpha = Math.max(0, mist.timer / mist.maxTimer);

                let g = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, mist.radius);
                g.addColorStop(0, `rgba(241, 245, 249, ${0.6 * alpha})`);
                g.addColorStop(0.4, `rgba(148, 163, 184, ${0.4 * alpha})`);
                g.addColorStop(1, `rgba(15, 23, 42, 0)`);

                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(drawX, drawY, mist.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        if (celestialite.suspendedKnives && celestialite.suspendedKnives.length > 0) {
            for (let knife of celestialite.suspendedKnives) {
                SB_projectiles.marcelKnife.draw(ctx, knife);
            }
        }

        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 3, celestialite.radius * 3]);
        if (!wrapped) return;

        let bx = wrapped[0] + camX;
        let by = wrapped[1] + camY;

        ctx.save();
        ctx.translate(bx, by);

        let img = SB_celestialites.marcelClone.sprite;
        if (img && img.complete && img.naturalWidth !== 0) {
            let r = celestialite.radius;
            ctx.rotate(celestialite.playerAng);
            ctx.drawImage(img, -r, -r, r * 2, r * 2);
        } else {
            ctx.rotate(celestialite.playerAng);
            const r = celestialite.radius;
            ctx.fillStyle = "#64748b";
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(r, 0);
            ctx.lineTo(-r * 0.8, r * 0.7);
            ctx.lineTo(-r * 0.4, 0);
            ctx.lineTo(-r * 0.8, -r * 0.7);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    }
};