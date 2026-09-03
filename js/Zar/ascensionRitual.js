SB_zones.ascensionRitual = {
    nameCap: "Ascension Ritual",
    nameLow: "ascension ritual",
    location: "unknown",
    unlocked() {
        return hasUpgrade("za", 19)
    },

    primaryColor: "#3383ab",
    secondaryColor: "#064666",

    levelLimit: 1,
    asteroidLimit: 1,
    celestialiteSpawnCooldown: 600,
    celestialiteLimit: 1,
    generateCelestialite(level) {
        return "alphaShip" // lmao
    },
    generateAsteroid(level) {
        return "smallAsteroid";
    },
    levelUp(level) {
    },
    statMult: new Decimal(1),
    rockMult: new Decimal(1),
    gemMult: new Decimal(1),
    xpReqMult: new Decimal(999),
    savePoints: [
        0
    ],
} // SB_spawnCelestialite("ritualSpirit")

SB_celestialites.ritualSpirit = {
    name: "Ritual Spirit",
    symbol: "x",
    radius: 64,
    color: '#88eaff',
    health: new Decimal(5e4),
    damage: new Decimal(6),
    regen: new Decimal(20),
    bodyDamage: new Decimal(0.5),
    reward() {
        return {}
    },
    experienceReward() {
        return new Decimal(0)
    },
    initialize(celestialite) {

        arena.enterFullscreen()
        arena.enemies = []
        arena.bullets = []
        arena.asteroids = []
        arena.xpOrbs = []
        arena.gammaTrails = []
        arena.enemySpawnCooldown = arena.enemySpawnCooldownMax;
        arena.bossActive = true

        celestialite.healthMax = player.cbs.ascensionShards.mul(1e4).add(5e4)
        celestialite.health = player.cbs.ascensionShards.mul(1e4).add(5e4)
        celestialite.regen = player.cbs.ascensionShards.add(5)
        celestialite.damage = player.cbs.ascensionShards.mul(1.2).add(6)

        let angle = Math.random() * Math.PI * 2;
        let dist = Math.max(arena.width, arena.height) * 0.35;
        let ex = Math.round(arena.width / 2 + Math.cos(angle) * dist);
        let ey = Math.round(arena.height / 2 + Math.sin(angle) * dist);
        ex = Math.max(80, Math.min(arena.width - 80, ex));
        ey = Math.max(80, Math.min(arena.height - 80, ey));

        celestialite.x = ex
        celestialite.y = ey
        celestialite.vx = 0
        celestialite.vy = 0
        celestialite.dvx = 0.875
        celestialite.dvy = 0.875
        celestialite.phase = 1
        celestialite.phaseMiddle = 1
        celestialite.phaseMiddleTimer = -1
        celestialite.currentAttack = 'idle'
        celestialite.attackTimer = 120
        celestialite._anim = 0
    },
    decideAttack(celestialite) {
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        celestialite.playerAng = Math.atan2(dy, dx);
        celestialite.moveAng = celestialite.playerAng;
        celestialite.moveAng = (celestialite.moveAng + (Math.PI * 3)) % (Math.PI * 2) - Math.PI;
        // Decide on an attack
        
        if (celestialite.playerDist < 800) {
            //let options = ['summonMinions', 'teleport'];
            
            let options = ['directionalBarrage', 'longSpinningBarrage', 'radialBarrage', 'teleport'];
            if (celestialite.phase >= 2) options = options.concat(['spinningBarrage', 'summonMinions']);
            if (celestialite.phase >= 3) options = options.concat(['wideDirectionalBarrage']);
            if (celestialite.phase >= 4) options = options.concat(['spinningBarrage', 'teleport']);
            if ((celestialite.invulnerable && celestialite.phaseMiddle == 2) || (celestialite.invulnerable && celestialite.phaseMiddle == 4)) options = ['spinningBarrage', 'teleport'];
            if (celestialite.invulnerable && celestialite.phaseMiddle == 3) options = ['shortIdle', 'teleport'];
            
            if (options.length > 1) options.splice(options.indexOf(celestialite.currentAttack), 1);
            celestialite.currentAttack = options[Math.floor(Math.random() * options.length)];
        } else {
            celestialite.currentAttack = "teleport";
        }
        celestialite.attackInitialized = false
    },
    attacks: {
        idle(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 120
            }
            // Attack
            // NONE
        },
        shortIdle(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 30
            }
            // Attack
            // NONE
        },
        directionalBarrage(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 300
            }
            // Attack
            if ((celestialite.attackTimer / 8) % 1 == 0 && celestialite.attackTimer > 60) {
                for (i = 0; i < 3; i++) {
                    let ang = celestialite.playerAng + ((i - 0.5) * Math.PI / 32) + (Math.random() - 0.5) * Math.PI / 128
                    SB_spawnProjectile("ritualBlade", celestialite, null, {
                        vx: Math.cos(ang) * 15,
                        vy: Math.sin(ang) * 15,
                    })
                }
            }
        },
        wideDirectionalBarrage(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 240
            }
            // Attack
            if ((celestialite.attackTimer / 8) % 1 == 0 && celestialite.attackTimer > 60) {
                for (i = 0; i < 2; i++) {
                    let ang = celestialite.playerAng + ((i - 0.5) * Math.PI / 32) + (Math.random() - 0.5) * Math.PI / 128
                    SB_spawnProjectile("ritualBlade", celestialite, null, {
                        vx: Math.cos(ang) * 15,
                        vy: Math.sin(ang) * 15,
                    })
                }
            }
            if ((celestialite.attackTimer / 8) % 1 == 0 && celestialite.attackTimer > 75 && celestialite.attackTimer < 225) {
                for (i = 0; i < 2; i++) {
                    let ang = celestialite.playerAng + ((i - 0.5) * Math.PI / 8) + (Math.random() - 0.5) * Math.PI / 8
                    SB_spawnProjectile("ritualBlade", celestialite, null, {
                        vx: Math.cos(ang) * 12,
                        vy: Math.sin(ang) * 12,
                    })
                }
            }
        },
        spinningBarrage(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 60
            }
            // Attack
            if ((celestialite.attackTimer / 2) % 1 == 0 && celestialite.attackTimer > 30) {
                let ang = celestialite.playerAng + (celestialite.attackTimer / 30) * Math.PI + Math.PI / 2
                SB_spawnProjectile("ritualBlade", celestialite, null, {
                    vx: Math.cos(ang) * 15,
                    vy: Math.sin(ang) * 15,
                })
            }
        },
        longSpinningBarrage(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 300
            }
            // Attack
            if ((celestialite.attackTimer / 2) % 1 == 0 && celestialite.attackTimer > 30) {
                let ang = celestialite.playerAng + (celestialite.attackTimer / 30) * Math.PI + Math.PI / 2
                SB_spawnProjectile("ritualBlade", celestialite, null, {
                    vx: Math.cos(ang) * 12,
                    vy: Math.sin(ang) * 12,
                })
            }
        },
        radialBarrage(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 300
            }
            // Attack
            if ((celestialite.attackTimer / 16) % 1 == 0 && celestialite.attackTimer > 60) {
                for (i = 0; i < 6; i++) {
                    let ang = (i * Math.PI / 3) + (Math.random() - 0.5) * Math.PI / 48
                    SB_spawnProjectile("ritualBlade", celestialite, null, {
                        vx: Math.cos(ang) * 12,
                        vy: Math.sin(ang) * 12,
                    })
                }
                if (celestialite.attackTimer < 270) {
                    for (i = 0; i < 3; i++) {
                        let ang = celestialite.playerAng + ((i - 1) * Math.PI / 16) + (Math.random() - 0.5) * Math.PI / 128
                        SB_spawnProjectile("ritualBlade", celestialite, null, {
                            vx: Math.cos(ang) * 15,
                            vy: Math.sin(ang) * 15,
                        })
                    }
                }
            }
        },
        summonMinions(celestialite) {
            if (arena.enemies.length >= 7) {
                SB_celestialites[celestialite.type].decideAttack(celestialite);
                return;
            }
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 30
            }
            // Attack
            if ((celestialite.attackTimer / 10) % 1 == 0) {
                let ang = celestialite.playerAng + (celestialite.attackTimer / 30) * Math.PI + Math.PI / 2
                SB_spawnCelestialite("ritualMinion", {
                    x: celestialite.x,
                    y: celestialite.y,
                    preferredSpeed: celestialite.attackTimer / 150 * (Math.random() + 0.5),
                })
            }
        },
        teleport(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 30
            }
            // Attack
            if (celestialite.attackTimer == 15) {
                let ang = Math.random() * Math.PI * 2
                let dist = Math.random() * 200 + 400
                celestialite.x = arena.ship.x + dist * Math.cos(ang)
                celestialite.y = arena.ship.y + dist * Math.sin(ang)
                if (celestialite.phase >= 3) {
                    for (i = 0; i < 12; i++) {
                        let ang = celestialite.playerAng + ((i - 5.5) * Math.PI / 6) + (Math.random() - 0.5) * Math.PI / 32
                        SB_spawnProjectile("ritualBlade", celestialite, null, {
                            vx: Math.cos(ang) * 12,
                            vy: Math.sin(ang) * 12,
                        })
                    }
                }
            }
        },
    },
    tick(celestialite) {
        celestialite.phase = Math.max(celestialite.phase, 5 - celestialite.health.div(celestialite.maxHealth).mul(4).ceil().toNumber())
        celestialite._anim += 1
        celestialite.phaseMiddleTimer -= 1

        if (celestialite.phaseMiddle != celestialite.phase && celestialite.phaseMiddleTimer <= 0) {
            celestialite.phaseMiddle = celestialite.phase
            celestialite.phaseMiddleTimer = 600
            celestialite.invulnerable = true
            celestialite.attackTimer = 0
        }
        if (celestialite.phaseMiddleTimer <= 0) {
            celestialite.invulnerable = false
        }

        // Get distance/angle to the player
        if (true) {
            let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
            let dx = closest[0] - celestialite.x;
            let dy = closest[1] - celestialite.y;
            celestialite.playerDist = Math.hypot(dx, dy) || 1;
            celestialite.playerAng = Math.atan2(dy, dx);
        }

        // Decide on a move angle
        if (true) {
            celestialite.moveAng = celestialite.playerAng;
            celestialite.moveAng = (celestialite.moveAng + (Math.PI * 3)) % (Math.PI * 2) - Math.PI;
        }

        // Decide on an attack
        celestialite.attackTimer--
        if (celestialite.attackTimer <= 0) SB_celestialites[celestialite.type].decideAttack(celestialite);

        // Move
        if ((celestialite.currentAttack == "dagger") && celestialite.attackTimer % 90 > 30) {
            celestialite.ax = 0
            celestialite.ay = 0
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
        }
        if (celestialite.playerDist > 800) {
            celestialite.ax += Math.cos(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            celestialite.ay += Math.sin(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
        }
        if ((celestialite.phase >= 2 && celestialite.phaseMiddle == 1) || celestialite.currentAttack == "teleport") {
            celestialite.ax = 0
            celestialite.ay = 0
        }

        // Attack
        SB_celestialites[celestialite.type].attacks[celestialite.currentAttack](celestialite)
    },
    onAttacked(celestialite, damage, attacker) {},
    onDeath(celestialite) {
        arena.exitFullscreen()
        arena.bullets = []
        arena.asteroids = []
        arena.xpOrbs = []
        arena.gammaTrails = []
        arena.bossActive = false

        player.cbs.ascensionShards = player.cbs.ritualDuration < 90 ? player.cbs.ascensionShards.add(2) : player.cbs.ascensionShards.add(1)
        player.ir.battleXP = player.ir.battleXPReq

        screenFlash("Ritual Success.\nYou have earned a Shard of Ascension.", 3000)
    },
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 6, celestialite.radius * 6])
        if (wrapped) {
            ctx.save();
            ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
            // animation-driven bob and sway
            let t = (celestialite._anim || 0) / 12;
            let bob = Math.sin(t) * 8;
            // Get phase configuration for visual scaling
            let auraIntensity, glowColor, scaleModifier
            switch (celestialite.phase) {
                case 1: {
                    auraIntensity = 1
                    glowColor = "#88eaff"
                    scaleModifier = 1
                break; }
                case 2: {
                    auraIntensity = 1.1
                    glowColor = "#879bff"
                    scaleModifier = 1.05
                break; }
                case 3: {
                    auraIntensity = 1.2
                    glowColor = "#c387ff"
                    scaleModifier = 1.1
                break; }
                case 4: {
                    auraIntensity = 1.3
                    glowColor = "#ff87eb"
                    scaleModifier = 1.15
                break; }
                default: {
                    auraIntensity = 1
                    glowColor = "#88eaff"
                    scaleModifier = 1
                break; }
            }
            
            // Apply phase-based scaling
            const scaledRadius = celestialite.radius * scaleModifier;
            // large soft aura with phase-based intensity
            ctx.globalCompositeOperation = 'lighter';
            let g = ctx.createRadialGradient(wrapped[0], wrapped[1] + bob, scaledRadius * 0.1, wrapped[0], wrapped[1] + bob, scaledRadius * 2.4 * auraIntensity);
            
            // Use phase-specific colors with simpler approach
            if (celestialite.invulnerable) {
            g.addColorStop(0, 'rgba(209, 228, 255,0.95)');
            g.addColorStop(0.35, `rgba(135, 165, 255,${0.4 * auraIntensity})`);
            g.addColorStop(0.7, `rgba(135, 165, 255,${0.15 * auraIntensity})`);
            g.addColorStop(1, 'rgba(135, 165, 255,0)');
            } else {
            g.addColorStop(0, 'rgba(210,255,255,0.95)');
            g.addColorStop(0.35, `rgba(136,234,255,${0.4 * auraIntensity})`);
            g.addColorStop(0.7, `rgba(136,234,255,${0.15 * auraIntensity})`);
            g.addColorStop(1, 'rgba(136,234,255,0)');
            }
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(wrapped[0], wrapped[1] + bob, scaledRadius * 2.4 * auraIntensity, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
            // Humanoid figure with phase-based scaling
            ctx.save();
            ctx.translate(wrapped[0], wrapped[1] + bob);
            ctx.scale(scaleModifier, scaleModifier);
            let sway = Math.sin(t * 0.8) * 6;
            ctx.rotate(sway * 0.03);
            // Robe/Body (flowing bottom) - simplified colors
            let bodyG = ctx.createLinearGradient(0, -celestialite.radius * 0.5, 0, celestialite.radius * 1.5);
            if (celestialite.invulnerable) {
                bodyG.addColorStop(0, '#87a5ff');
                bodyG.addColorStop(0.6, '#4a59ff');
                bodyG.addColorStop(1, '#4a59ff00');
            } else {
                bodyG.addColorStop(0, '#88eaff');
                bodyG.addColorStop(0.6, '#4ac6ff');
                bodyG.addColorStop(1, '#4ac6ff00');
            }
            ctx.fillStyle = bodyG;
            ctx.beginPath();
            ctx.moveTo(-celestialite.radius * 0.45, 0);
            // Torso
            ctx.quadraticCurveTo(-celestialite.radius * 0.5, celestialite.radius * 0.5, -celestialite.radius * 0.8, celestialite.radius * 1.4);
            // Bottom flow with enhanced animation in higher phases
            const flowIntensity = 1 + (auraIntensity - 1) * 0.5;
            for (let i = 0; i < 3; i++) {
                let off = Math.sin(t * 1.5 * flowIntensity + i) * 10 * flowIntensity;
                ctx.quadraticCurveTo(-celestialite.radius * 0.4 + i * 20, celestialite.radius * 1.6 + off, celestialite.radius * 0.1 + i * 20, celestialite.radius * 1.4);
            }
            ctx.lineTo(celestialite.radius * 0.45, 0);
            ctx.closePath();
            ctx.fill();
            // Torso highlight/detail with phase-based intensity
            ctx.strokeStyle = `rgba(255,255,255,${0.3 * auraIntensity})`;
            ctx.lineWidth = 2 * scaleModifier;
            ctx.beginPath();
            ctx.moveTo(-celestialite.radius * 0.2, celestialite.radius * 0.2);
            ctx.lineTo(0, celestialite.radius * 0.6);
            ctx.lineTo(celestialite.radius * 0.2, celestialite.radius * 0.2);
            ctx.stroke();
            // Head & Hood - simplified
            ctx.fillStyle = celestialite.invulnerable ? '#6673ff' : '#66d4ff';
            ctx.beginPath();
            ctx.arc(0, -celestialite.radius * 0.45, celestialite.radius * 0.45, Math.PI, 0);
            ctx.ellipse(0, -celestialite.radius * 0.45, celestialite.radius * 0.45, celestialite.radius * 0.6, 0, 0, Math.PI);
            ctx.fill();
            // Face area
            ctx.fillStyle = '#0a1a2a';
            ctx.beginPath();
            ctx.ellipse(0, -celestialite.radius * 0.45, celestialite.radius * 0.25, celestialite.radius * 0.35, 0, 0, Math.PI * 2);
            ctx.fill();
            // Glowing Eyes with phase-based intensity
            let eyePulse = (0.8 + Math.sin(t * 2) * 0.2) * auraIntensity;
            ctx.shadowColor = '#fff';
            if (!options.performanceMode) {ctx.shadowBlur = 8 * eyePulse} else {ctx.shadowBlur = 0};
            ctx.fillStyle = `rgba(255, 255, 255, ${eyePulse})`;
            ctx.beginPath();
            // Left eye
            ctx.ellipse(-celestialite.radius * 0.1, -celestialite.radius * 0.48, celestialite.radius * 0.06, celestialite.radius * 0.03, 0.2, 0, Math.PI * 2);
            // Right eye
            ctx.ellipse(celestialite.radius * 0.1, -celestialite.radius * 0.48, celestialite.radius * 0.06, celestialite.radius * 0.03, -0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            // Arms - simplified
            ctx.strokeStyle = '#88eaff';
            ctx.lineCap = 'round';
            ctx.lineWidth = 7 * scaleModifier;

            // Left arm with enhanced movement in higher phases
            ctx.beginPath();
            ctx.moveTo(-celestialite.radius * 0.4, -celestialite.radius * 0.1);
            let lArmX = -celestialite.radius * 1.1 + Math.sin(t * 0.7 * flowIntensity) * 10 * flowIntensity;
            let lArmY = celestialite.radius * 0.4 + Math.cos(t * 0.7 * flowIntensity) * 10 * flowIntensity;
            ctx.quadraticCurveTo(-celestialite.radius * 0.9, -celestialite.radius * 0.1, lArmX, lArmY);
            ctx.stroke();
            // Hand glow with phase intensity
            ctx.fillStyle = `rgba(255,255,255,${auraIntensity})`;
            ctx.beginPath();
            ctx.arc(lArmX, lArmY, 5 * scaleModifier, 0, Math.PI * 2);
            ctx.fill();
            // Right arm
            ctx.beginPath();
            ctx.moveTo(celestialite.radius * 0.4, -celestialite.radius * 0.1);
            let rArmX = celestialite.radius * 1.1 + Math.cos(t * 0.7 * flowIntensity) * 10 * flowIntensity;
            let rArmY = celestialite.radius * 0.4 + Math.sin(t * 0.7 * flowIntensity) * 10 * flowIntensity;
            ctx.quadraticCurveTo(celestialite.radius * 0.9, -celestialite.radius * 0.1, rArmX, rArmY);
            ctx.stroke();
            // Hand glow
            ctx.beginPath();
            ctx.arc(rArmX, rArmY, 5 * scaleModifier, 0, Math.PI * 2);
            ctx.fill();
            if (celestialite.currentAttack == "teleport") {
                ctx.fillStyle = "rgba(192,255,255," + ((15 - Math.abs(15 - celestialite.attackTimer)) / 15) + ")";
                ctx.beginPath();
                ctx.arc(0, 0, (Math.abs(15 - celestialite.attackTimer) / 15) * 256, 0, Math.PI * 2)
                ctx.fill();
            }
            ctx.restore();
            ctx.restore();
            /*
            // draw sword trail for dash attack
            if (celestialite._swordTrail && celestialite._swordTrail.length) {
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                for (let i = 0; i < celestialite._swordTrail.length; i++) {
                    let trail = celestialite._swordTrail[i];
                    let alpha = 0.8 * (i / celestialite._swordTrail.length);
                    let width = 20 * (i / celestialite._swordTrail.length);

                    // Draw sword trail as elongated ellipse
                    ctx.save();
                    ctx.translate(trail.x, trail.y);
                    ctx.rotate(trail.angle);

                    // Sword glow
                    let g = ctx.createLinearGradient(-40, -width/2, 40, width/2);
                    g.addColorStop(0, `rgba(180,235,255,0)`);
                    g.addColorStop(0.5, `rgba(180,235,255,${alpha * 0.6})`);
                    g.addColorStop(1, `rgba(180,235,255,0)`);
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, 50, width/2, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Sword core
                    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, 35, width/4, 0, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.restore();
                }
                ctx.restore();
            }
            // beam visual (laser sweep) with enhanced effects
            if (celestialite._laserTimer && celestialite._laserTimer > 0) {
                const laserTotal = celestialite._laserTotal || 180;
                const elapsed = laserTotal - celestialite._laserTimer;
                const windup = 12;
                const progress = Math.max(0, Math.min(1, (elapsed - windup) / (laserTotal - windup)));
                const angle = celestialite._laserAngle || 0;
                const beamLen = Math.max(ctx.canvas.width, ctx.canvas.height) * 1.5;
                const maxThickness = Math.max(22, celestialite.radius * 1.2 + (celestialite.phase || 1) * 4);
                const thickness = windup > elapsed ? (maxThickness * (elapsed / windup)) : (maxThickness * (0.6 + 0.4 * progress));

                ctx.save();
                ctx.translate(wrapped[0], wrapped[1]);
                ctx.rotate(angle);

                // Enhanced beam with multiple layers
                ctx.globalCompositeOperation = 'lighter';

                // Outer glow layer
                let outerGr = ctx.createLinearGradient(0, -thickness * 3, beamLen, thickness * 3);
                outerGr.addColorStop(0, `rgba(160,220,255,${0.05 + 0.1 * progress})`);
                outerGr.addColorStop(0.5, `rgba(220,200,255,${0.08 + 0.12 * progress})`);
                outerGr.addColorStop(1, `rgba(160,220,255,${0.01 + 0.02 * progress})`);
                ctx.fillStyle = outerGr;
                ctx.beginPath();
                ctx.rect(0, -thickness * 2, beamLen, thickness * 4);
                ctx.fill();

                // Main beam layer
                let gr = ctx.createLinearGradient(0, -thickness * 2, beamLen, thickness * 2);
                gr.addColorStop(0, `rgba(160,220,255,${0.12 + 0.28 * progress})`);
                gr.addColorStop(0.5, `rgba(220,200,255,${0.18 + 0.32 * progress})`);
                gr.addColorStop(1, `rgba(160,220,255,${0.02 + 0.06 * progress})`);
                ctx.fillStyle = gr;
                ctx.beginPath();
                ctx.rect(0, -thickness, beamLen, thickness * 2);
                ctx.fill();

                // Core beam layer
                let coreGr = ctx.createLinearGradient(0, -thickness * 0.5, beamLen, thickness * 0.5);
                coreGr.addColorStop(0, `rgba(255,255,255,${0.3 + 0.5 * progress})`);
                coreGr.addColorStop(0.5, `rgba(255,255,255,${0.4 + 0.6 * progress})`);
                coreGr.addColorStop(1, `rgba(255,255,255,${0.1 + 0.2 * progress})`);
                ctx.fillStyle = coreGr;
                ctx.beginPath();
                ctx.rect(0, -thickness * 0.3, beamLen, thickness * 0.6);
                ctx.fill();

                ctx.restore();
                ctx.globalCompositeOperation = 'source-over';

                // Add screen distortion effect during active beam (further reduced intensity)
                if (progress > 0.1 && this.effectsManager) {
                    // Create subtle screen shake during beam (reduced intensity)
                    const shakeIntensity = 0.5 + progress * 1;
                    this.effectsManager.addScreenShake(shakeIntensity, 50);
                }
            }
            */
            //ctx.restore();
        }
    }
}

SB_celestialites.ritualMinion = {
    name: "Ritual Spirit Minion",
    symbol: "x",
    radius: 16,
    color: "#ffffe0",
    health: new Decimal(500),
    damage: new Decimal(5),
    bodyDamage: new Decimal(2),
    regen: new Decimal(-5),
    reward() {
        let gain = {}
        return gain
    },
    experienceReward() {
        return new Decimal(0)
    },
    initialize(celestialite) {
        celestialite._anim = 0

        celestialite.healthMax = player.cbs.ascensionShards.mul(100).add(500)
        celestialite.health = player.cbs.ascensionShards.mul(100).add(500)
        celestialite.regen = player.cbs.ascensionShards.mul(-2).add(-10)
        celestialite.damage = player.cbs.ascensionShards.add(5)

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.99
        celestialite.dvy = 0.99
    },
    tick(celestialite) {
        celestialite._anim++
        // Decrease timers

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 600) {
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        celestialite.moveAng = celestialite.moveAng = celestialite.playerAng

        // Handle celestialite movement changes
        celestialite.ax = Math.cos(celestialite.moveAng) * celestialite.preferredSpeed
        celestialite.ay = Math.sin(celestialite.moveAng) * celestialite.preferredSpeed
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
        if (wrapped) {
            ctx.save();
            ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
            //ctx.translate(wrapped[0], wrapped[1]);
            
            let t = (celestialite._anim || 0) / 8;
            let bob = Math.sin(t) * 4;
            
            ctx.globalCompositeOperation = 'lighter';
            // Aura
            let g = ctx.createRadialGradient(wrapped[0], wrapped[1] + bob, 2, wrapped[0], wrapped[1] + bob, celestialite.radius * 1.5);
            g.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            g.addColorStop(1, 'rgba(95, 232, 255, 0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(wrapped[0], wrapped[1] + bob, celestialite.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
            // Core (tear-drop spirit shape)
            ctx.save();
            ctx.translate(wrapped[0], wrapped[1] + bob);
            let ang = Math.atan2(celestialite.vy, celestialite.vx) + Math.PI/2;
            ctx.rotate(ang);
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.moveTo(0, -celestialite.radius * 0.8);
            ctx.quadraticCurveTo(celestialite.radius * 0.6, 0, 0, celestialite.radius * 0.8);
            ctx.quadraticCurveTo(-celestialite.radius * 0.6, 0, 0, -celestialite.radius * 0.8);
            ctx.fill();
            ctx.restore();
            
            ctx.restore();
            
        }
    },
}

// PROJECTILES

SB_projectiles.ritualBlade = {
    template(celestialite, warning) {
        let source = warning !== null ? warning : celestialite
        let ang = warning !== null ? warning.ang : celestialite.playerAng
        let speed = (warning !== null && warning.speed) ? warning.speed : 8
        return {
            x: source.x,
            y: source.y,
            vx: Math.cos(ang) * speed,
            vy: Math.sin(ang) * speed,
            dvx: 1,
            dvy: 1,
            ax: 0,
            ay: 0,
            dax: 1,
            day: 1,
            life: 120,
            initialLife: 120,
            damage: celestialite !== null ? celestialite.damage : player.cbs.ascensionShards.mul(2).add(10),
            pierce: 3,
            radius: 12,
            fromEnemy: true,
            star: true,
            ang: ang
        }
    },
    initialize(projectile) {
    },
    tick(projectile) {
        if (projectile.life < 15) {
            let m = projectile.life / 15
            projectile.radius = m * 4
            projectile.damage = projectile.celestialite ? projectile.celestialite.damage.mul(m) : new Decimal(m * 6)
        };
    },
    onHit(projectile, attacker) {
        if (projectile.warning) projectile.warning.timer = 0;
    },
    draw(ctx, projectile) {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([projectile.x, projectile.y], [projectile.radius * 2, projectile.radius * 2])
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);

        // Ritual-themed projectiles matching ritualSpirit visual style
        
        // Rotate based on velocity to face movement direction
        let angle = Math.atan2(projectile.vy, projectile.vx);
        ctx.rotate(angle + Math.PI / 2);
        
        // Glow effect
        ctx.globalCompositeOperation = 'lighter';
        let g = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
        g.addColorStop(0, 'rgba(136, 234, 255, 0.9)');
        g.addColorStop(0.5, 'rgba(136, 234, 255, 0.3)');
        g.addColorStop(1, 'rgba(136, 234, 255, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalCompositeOperation = 'source-over';
        
        // Spirit core (tear-drop shape matching ritualSpirit)
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.quadraticCurveTo(7, 0, 0, 10);
        ctx.quadraticCurveTo(-7, 0, 0, -10);
        ctx.fill();
        
        // Inner cyan glow
        ctx.fillStyle = '#88eaff';
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.quadraticCurveTo(4, 0, 0, 6);
        ctx.quadraticCurveTo(-4, 0, 0, -6);
        ctx.fill();
        
        ctx.restore();
                    
    },
}

// OLD CODE IS BELOW; MAY WANT TO ADD PARTICLES BACK AT SOME POINT



















/*

// Enhanced Phase Transition Manager for dramatic boss phase changes
class PhaseTransitionManager {
    constructor(arena) {
        this.arena = arena;
        this.currentPhase = 1;
        this.transitionInProgress = false;
        this.transitionEffects = [];
        this.transitionTimer = 0;
        this.transitionDuration = 2000; // 2 seconds
        
        // Phase configurations
        this.phaseConfigs = {
            1: {
                healthThreshold: { min: 0.4, max: 1.0 },
                visualConfig: {
                    auraIntensity: 1.0,
                    glowColor: '#88eaff',
                    particleRate: 30,
                    scaleModifier: 1.0
                },
                behaviorConfig: {
                    attackFrequency: 1.0,
                    movementSpeed: 1.0,
                    aggressionLevel: 1.0,
                    availableAttacks: ['orbBarrage', 'charge', 'dashAttack', 'spectralBlades']
                }
            },
            2: {
                healthThreshold: { min: 0, max: 0.4 },
                visualConfig: {
                    auraIntensity: 1.5,
                    glowColor: '#ff88ea',
                    particleRate: 50,
                    scaleModifier: 1.1
                },
                behaviorConfig: {
                    attackFrequency: 1.3,
                    movementSpeed: 1.2,
                    aggressionLevel: 1.5,
                    availableAttacks: ['orbBarrage', 'charge', 'dashAttack', 'spectralBlades', 'pulse', 'summonMinions', 'ringOfSpirits', 'teleportStrike']
                }
            },
            3: {
                healthThreshold: { min: 0.0, max: 0 }, //desperation phase (scrapped)
                visualConfig: {
                    auraIntensity: 2.0,
                    glowColor: '#ff4488',
                    particleRate: 60,
                    scaleModifier: 1.2
                },
                behaviorConfig: {
                    attackFrequency: 1.5,
                    movementSpeed: 1.5,
                    aggressionLevel: 2.0,
                    availableAttacks: ['orbBarrage', 'charge', 'dashAttack', 'spectralBlades', 'pulse', 'summonMinions', 'ringOfSpirits', 'teleportStrike', 'chaosMode'] //laser isnt there for now
                }
            }
        };
    }
    
    triggerPhaseTransition(boss, newPhase) {
        if (this.transitionInProgress || newPhase === this.currentPhase) return false;
        
        this.transitionInProgress = true;
        this.transitionTimer = this.transitionDuration;
        this.currentPhase = newPhase;
        
        // Make boss temporarily invulnerable
        if (boss) {
            boss._invulnerable = true;
            boss._originalColor = boss.color;
        }
        
        // Create dramatic transition effects
        this.createTransitionEffects(boss, newPhase);
        
        return true;
    }
    
    createTransitionEffects(boss, phase) {
        if (!boss || !this.arena.effectsManager) return;
        
        const config = this.phaseConfigs[phase];
        if (!config) return;
        
        // Screen effects based on phase
        const intensity = 8 + phase * 4;
        const duration = 600 + phase * 200;
        
        this.arena.effectsManager.addScreenShake(intensity, duration);
        // Removed excessive flash effect per user feedback
        
        // Particle explosion (reduced count)
        const particleCount = 15 + phase * 8;
        this.arena.effectsManager.createParticles('phaseTransition', boss.x, boss.y, particleCount, { spread: 100 });
        
        // Create expanding energy ring effect
        if (this.arena.telegraphSystem) {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    this.arena.telegraphSystem.createCircleTelegraph(
                        boss.x, boss.y, 50 + i * 30, 800, config.visualConfig.glowColor
                    );
                }, i * 200);
            }
        }
    }
    updateTransition(delta, boss) {
        if (!this.transitionInProgress) return;
        
        this.transitionTimer -= delta;
        
        if (this.transitionTimer <= 0) {
            this.completeTransition(boss);
        } else {
            // Update transition visual effects
            this.updateTransitionVisuals(boss, delta);
        }
    }
    
    updateTransitionVisuals(boss, delta) {
        if (!boss) return;
        
        const progress = 1 - (this.transitionTimer / this.transitionDuration);
        const config = this.phaseConfigs[this.currentPhase];
        
        if (config && this.arena.effectsManager) {
            // Pulse effect during transition
            const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.01);
            
            // Emit transition particles (reduced frequency)
            if (Math.random() < 0.3) {
                this.arena.effectsManager.createParticles('phaseTransition', 
                    boss.x + (Math.random() - 0.5) * boss.radius * 2,
                    boss.y + (Math.random() - 0.5) * boss.radius * 2,
                    1 + Math.floor(progress * 2)
                );
            }
        }
    }
    
    completeTransition(boss) {
        this.transitionInProgress = false;
        this.transitionTimer = 0;
        
        // Remove invulnerability
        if (boss) {
            boss._invulnerable = false;
            if (boss._originalColor) {
                boss.color = boss._originalColor;
                delete boss._originalColor;
            }
            
            // Apply phase-specific visual changes
            this.applyPhaseVisuals(boss);
        }
    }
    
    applyPhaseVisuals(boss) {
        const config = this.phaseConfigs[this.currentPhase];
        if (!config || !boss) return;
        
        // Update boss visual properties
        boss._phaseConfig = config.visualConfig;
        boss.color = config.visualConfig.glowColor;
        
        // Create final phase activation effect (reduced particles)
        if (this.arena.effectsManager) {
            this.arena.effectsManager.createParticles('energyBurst', boss.x, boss.y, 10, { spread: 60 });
        }
    }
    
    getPhaseConfig(phase) {
        return this.phaseConfigs[phase] || this.phaseConfigs[1];
    }
    
    isInTransition() {
        return this.transitionInProgress;
    }
    
    cleanup() {
        this.transitionInProgress = false;
        this.transitionEffects.length = 0;
        this.transitionTimer = 0;
    }
}

// Enhanced Telegraph System for attack warnings and visual indicators
class TelegraphSystem {
    constructor(arena) {
        this.arena = arena;
        this.telegraphs = [];
        this.warningThresholds = {
            minor: 1000,    // 1 second warning
            major: 1500,    // 1.5 second warning
            ultimate: 2000  // 2 second warning
        };
    }
    
    createTelegraph(type, config) {
        const telegraph = {
            type: type,
            warningTime: config.warningTime || this.warningThresholds.minor,
            remainingTime: config.warningTime || this.warningThresholds.minor,
            intensity: 0,
            position: config.position || { x: 0, y: 0 },
            shape: config.shape || 'circle',
            color: config.color || '#ff4444',
            size: config.size || 50,
            maxSize: config.maxSize || config.size || 50,
            active: true,
            data: config.data || {} // Additional data for specific telegraph types
        };
        
        this.telegraphs.push(telegraph);
        return telegraph;
    }
    
    createLineTelegraph(x1, y1, x2, y2, warningTime = 1200, color = '#b4ebff') {
        return this.createTelegraph('line', {
            warningTime: warningTime,
            color: color,
            data: { x1, y1, x2, y2 }
        });
    }
    
    createCircleTelegraph(x, y, radius, warningTime = 1000, color = '#ff6666') {
        return this.createTelegraph('circle', {
            position: { x, y },
            size: radius,
            warningTime: warningTime,
            color: color,
            shape: 'circle'
        });
    }
    
    createAreaTelegraph(x, y, width, height, warningTime = 1500, color = '#ffaa44') {
        return this.createTelegraph('area', {
            position: { x, y },
            warningTime: warningTime,
            color: color,
            shape: 'rectangle',
            data: { width, height }
        });
    }
    
    updateTelegraphs(delta) {
        for (let i = this.telegraphs.length - 1; i >= 0; i--) {
            const telegraph = this.telegraphs[i];
            if (!telegraph.active) {
                this.telegraphs.splice(i, 1);
                continue;
            }
            
            telegraph.remainingTime -= delta;
            telegraph.intensity = Math.max(0, Math.min(1, 1 - (telegraph.remainingTime / telegraph.warningTime)));
            
            if (telegraph.remainingTime <= 0) {
                telegraph.active = false;
            }
        }
    }
    
    renderTelegraphs(ctx) {
        if (!ctx) return;
        
        for (const telegraph of this.telegraphs) {
            if (!telegraph.active) continue;
            
            ctx.save();
            
            // Calculate pulsing alpha based on intensity
            const pulseSpeed = 3;
            const pulseOffset = Date.now() * 0.01 * pulseSpeed;
            const pulse = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(pulseOffset));
            const alpha = telegraph.intensity * pulse;
            
            ctx.globalAlpha = alpha;
            
            // Set color with intensity-based brightness
            const colorIntensity = 0.3 + 0.7 * telegraph.intensity;
            ctx.strokeStyle = this.adjustColorIntensity(telegraph.color, colorIntensity);
            ctx.fillStyle = this.adjustColorIntensity(telegraph.color, colorIntensity * 0.3);
            
            // Line width increases with intensity
            ctx.lineWidth = 2 + telegraph.intensity * 4;
            
            switch (telegraph.shape) {
                case 'line':
                    this.renderLineTelegraph(ctx, telegraph);
                    break;
                case 'circle':
                    this.renderCircleTelegraph(ctx, telegraph);
                    break;
                case 'rectangle':
                    this.renderAreaTelegraph(ctx, telegraph);
                    break;
            }
            
            ctx.restore();
        }
    }
    
    renderLineTelegraph(ctx, telegraph) {
        const data = telegraph.data;
        ctx.beginPath();
        ctx.moveTo(data.x1, data.y1);
        ctx.lineTo(data.x2, data.y2);
        ctx.stroke();
        
        // Add arrow head
        const angle = Math.atan2(data.y2 - data.y1, data.x2 - data.x1);
        const arrowLength = 15 + telegraph.intensity * 10;
        ctx.beginPath();
        ctx.moveTo(data.x2, data.y2);
        ctx.lineTo(data.x2 - arrowLength * Math.cos(angle - 0.3), data.y2 - arrowLength * Math.sin(angle - 0.3));
        ctx.moveTo(data.x2, data.y2);
        ctx.lineTo(data.x2 - arrowLength * Math.cos(angle + 0.3), data.y2 - arrowLength * Math.sin(angle + 0.3));
        ctx.stroke();
    }
    
    renderCircleTelegraph(ctx, telegraph) {
        const radius = telegraph.size + telegraph.intensity * 10;
        ctx.beginPath();
        ctx.arc(telegraph.position.x, telegraph.position.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }
    
    renderAreaTelegraph(ctx, telegraph) {
        const data = telegraph.data;
        const x = telegraph.position.x - data.width / 2;
        const y = telegraph.position.y - data.height / 2;
        ctx.beginPath();
        ctx.rect(x, y, data.width, data.height);
        ctx.stroke();
        ctx.fill();
    }
    
    adjustColorIntensity(color, intensity) {
        // Simple color intensity adjustment
        if (color.startsWith('#')) {
            const r = parseInt(color.substr(1, 2), 16);
            const g = parseInt(color.substr(3, 2), 16);
            const b = parseInt(color.substr(5, 2), 16);
            return `rgba(${Math.floor(r * intensity)}, ${Math.floor(g * intensity)}, ${Math.floor(b * intensity)}, 1)`;
        }
        return color;
    }
    
    clearTelegraphs() {
        this.telegraphs.length = 0;
    }
    
    cleanup() {
        this.clearTelegraphs();
    }
}

// Enhanced Visual Effects Manager for particle systems and visual polish
class VisualEffectsManager {
    constructor(arena) {
        this.arena = arena;
        this.particleSystems = new Map();
        this.lightingEffects = [];
        this.screenEffects = [];
        this.trailSystems = new Map();
        this.particles = [];
        this.screenShake = { intensity: 0, duration: 0, elapsed: 0 };
        this.flashEffect = { color: '#ffffff', intensity: 0, duration: 0, elapsed: 0 };
    }
    
    // Particle system management
    createParticleSystem(type, config) {
        const system = {
            type: type,
            particles: [],
            config: { ...config },
            active: true,
            emissionTimer: 0
        };
        this.particleSystems.set(type, system);
        return system;
    }
    
    // Create individual particles
    createParticles(type, x, y, count = 1, config = {}) {
        const baseConfig = this.getParticleConfig(type);
        for (let i = 0; i < count; i++) {
            const particle = {
                type: type,
                x: x + (Math.random() - 0.5) * (config.spread || 0),
                y: y + (Math.random() - 0.5) * (config.spread || 0),
                vx: (Math.random() - 0.5) * (baseConfig.speed?.max || 4),
                vy: (Math.random() - 0.5) * (baseConfig.speed?.max || 4),
                life: baseConfig.lifetime || 1000,
                maxLife: baseConfig.lifetime || 1000,
                size: baseConfig.size?.start || 3,
                maxSize: baseConfig.size?.start || 3,
                color: baseConfig.color?.start || '#ffffff',
                alpha: 1.0,
                gravity: baseConfig.gravity || 0,
                friction: baseConfig.friction || 1,
                active: true
            };
            this.particles.push(particle);
        }
    }
    
    getParticleConfig(type) {
        const configs = {
            energyBurst: {
                lifetime: 2000,
                speed: { min: 2, max: 8 },
                color: { start: '#ffffff', end: '#88eaff' },
                size: { start: 0, end: 0 },
                gravity: 0.1
            },
            impactSpark: {
                lifetime: 800,
                speed: { min: 5, max: 15 },
                color: { start: '#ffff88', end: '#ff8888' },
                size: { start: 3, end: 1 },
                friction: 0.95
            },
            trailParticle: {
                lifetime: 1200,
                speed: { min: 1, max: 3 },
                color: { start: '#88eaff', end: 'rgba(136, 234, 255, 0)' },
                size: { start: 2, end: 0 },
                friction: 0.98
            },
            auraParticle: {
                lifetime: 3000,
                speed: { min: 0.5, max: 2 },
                color: { start: '#88eaff', end: 'rgba(136, 234, 255, 0.3)' },
                size: { start: 1, end: 3 },
                gravity: -0.02
            },
            phaseTransition: {
                lifetime: 1500,
                speed: { min: 8, max: 20 },
                color: { start: '#ffffff', end: '#ff88ea' },
                size: { start: 6, end: 0 },
                gravity: 0
            }
            ,
            lotusPetal: {
                lifetime: 1400,
                speed: { min: 0.5, max: 2 },
                color: { start: '#b366ff', end: 'rgba(150,80,255,0)' },
                size: { start: 18, end: 8 },
                gravity: -0.005,
                friction: 0.98
            },
            lotusShard: {
                lifetime: 1200,
                speed: { min: 4, max: 18 },
                color: { start: '#d7a3ff', end: 'rgba(200,130,255,0)' },
                size: { start: 3, end: 1 },
                friction: 0.96
            }
        };
        return configs[type] || configs.energyBurst;
    }
    
    updateParticleSystems(delta) {
        // Update individual particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            if (!p.active) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Update particle physics
            p.life -= delta;
            if (p.life <= 0) {
                p.active = false;
                continue;
            }
            
            // Apply physics
            p.vy += p.gravity * delta;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.x += p.vx * delta / 16.67; // normalize to 60fps
            p.y += p.vy * delta / 16.67;
            
            // Update visual properties based on life
            const lifeRatio = p.life / p.maxLife;
            p.alpha = Math.max(0, lifeRatio);
            p.size = p.maxSize * (0.2 + 0.8 * lifeRatio);
        }
        
        // Update screen effects
        if (this.screenShake.duration > 0) {
            this.screenShake.elapsed += delta;
            if (this.screenShake.elapsed >= this.screenShake.duration) {
                this.screenShake.intensity = 0;
                this.screenShake.duration = 0;
            }
        }
        
        if (this.flashEffect.duration > 0) {
            this.flashEffect.elapsed += delta;
            const progress = this.flashEffect.elapsed / this.flashEffect.duration;
            this.flashEffect.intensity = Math.max(0, 1 - progress);
            if (progress >= 1) {
                this.flashEffect.duration = 0;
                this.flashEffect.intensity = 0;
            }
        }
    }
    
    renderParticleSystems(ctx) {
        if (!ctx) return;
        
        // Apply screen shake
        if (this.screenShake.intensity > 0) {
            const shakeX = (Math.random() - 0.5) * this.screenShake.intensity;
            const shakeY = (Math.random() - 0.5) * this.screenShake.intensity;
            ctx.save();
            ctx.translate(shakeX, shakeY);
        }
        
        // Render particles
        ctx.save();
        ctx.translate((this.arena.canvasWidth / 2) - this.arena.ship.x, (this.arena.canvasHeight / 2) - this.arena.ship.y);
        ctx.globalCompositeOperation = 'lighter';
        
        for (const particle of this.particles) {
            if (!particle.active || particle.alpha <= 0) continue;
            
            ctx.save();
            ctx.globalAlpha = particle.alpha;
            // Custom rendering for special particle types
            if (particle.type === 'lotusPetal') {
                const lifeRatio = particle.life / particle.maxLife;
                const petalSize = particle.size * (0.6 + 0.8 * lifeRatio);
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.angle || 0);
                const g = ctx.createRadialGradient(0, 0, 0, 0, 0, petalSize * 1.6);
                g.addColorStop(0, particle.color);
                g.addColorStop(0.6, 'rgba(160,80,255,0.25)');
                g.addColorStop(1, 'rgba(160,80,255,0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.ellipse(0, 0, petalSize * 1.2, petalSize, 0, 0, Math.PI * 2);
                ctx.fill();
                // inner glass highlight
                ctx.globalAlpha = particle.alpha * 0.6;
                ctx.fillStyle = 'rgba(220,180,255,0.9)';
                ctx.beginPath();
                ctx.ellipse(0, -petalSize * 0.15, petalSize * 0.5, petalSize * 0.35, 0, 0, Math.PI * 2);
                ctx.fill();
            } else if (particle.type === 'lotusShard') {
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.angle || 0);
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.moveTo(0, -particle.size);
                ctx.lineTo(particle.size, particle.size);
                ctx.lineTo(-particle.size, particle.size);
                ctx.closePath();
                ctx.fill();
                // glow
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = 'rgba(180,120,255,0.45)';
                ctx.beginPath();
                ctx.arc(0, 0, particle.size * 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            } else {
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
        
        ctx.restore();
        
        // Apply flash effect
        if (this.flashEffect.intensity > 0) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = this.flashEffect.color;
            ctx.globalAlpha = this.flashEffect.intensity * 0.3;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();
        }
        
        // Restore from screen shake
        if (this.screenShake.intensity > 0) {
            ctx.restore();
        }
    }
    
    // Screen-wide effects
    addScreenShake(intensity, duration) {
        this.screenShake.intensity = Math.max(this.screenShake.intensity, intensity);
        this.screenShake.duration = Math.max(this.screenShake.duration, duration);
        this.screenShake.elapsed = 0;
    }
    
    addFlashEffect(color, intensity, duration) {
        this.flashEffect.color = color;
        this.flashEffect.intensity = intensity;
        this.flashEffect.duration = duration;
        this.flashEffect.elapsed = 0;
    }
    
    // Cleanup
    cleanup() {
        this.particles.length = 0;
        this.particleSystems.clear();
        this.lightingEffects.length = 0;
        this.screenEffects.length = 0;
        this.trailSystems.clear();
    }
}

// RitualArena: simplified arena derived from SpaceArena.
// This file keeps arena visuals and basic update/draw behavior,
// but removes Nox, blood-enemy logic, and vampire spear systems.
class RitualArena extends SpaceArena {
    constructor(canvasWidth, canvasHeight, arenaWidth, arenaHeight) {
        super(canvasWidth, canvasHeight, arenaWidth, arenaHeight);
        // make sure upgradeEffects exist for compatibility
        if (!this.upgradeEffects) this.upgradeEffects = {};
        this.upgradeEffects.attackDamage = this.upgradeEffects.attackDamage || 1;
        this.upgradeEffects.damageReduction = this.upgradeEffects.damageReduction || 1;
        this.upgradeEffects.xpGain = this.upgradeEffects.xpGain || 1;
        this.upgradeEffects.rockGain = this.upgradeEffects.rockGain || 1;
        
        // Initialize enhanced visual effects system
        this.effectsManager = new VisualEffectsManager(this);
        this.telegraphSystem = new TelegraphSystem(this);
        this.phaseManager = new PhaseTransitionManager(this);
        
        // Nav - the helpful mage
        this.nav = {
            x: arenaWidth / 2,
            y: arenaHeight / 2,
            targetX: arenaWidth / 2,
            targetY: arenaHeight / 2,
            angle: 0,
            radius: 32,
            cooldown: 0,
            img: new Image(),
            loaded: false,
            animTimer: 0
        };
        this.nav.img.src = 'resources/navWisp.png';
        this.nav.img.onload = () => { this.nav.loaded = true; };
        
        // Player skill tracking for adaptive feedback
        this.skillTracker = {
            nearMisses: 0,
            consecutiveDodges: 0,
            lastDamageTime: 0,
            skillLevel: 1.0 // 1.0 = normal, higher = more skilled
        };
        
        // Custom draw function for ritual projectiles
        this.draw = () => {
            if (!this.ctx) return;
            const ctx = this.ctx;
            
            // Let parent class handle everything first (including default bullet rendering)
            if (typeof super.draw === 'function') super.draw();
            
            // Now draw ritual-themed projectiles on top, matching ritualSpirit sprite
            for (let bullet of this.bullets) {
                if (bullet.ritualOrb || bullet.ritualBlade) {
                    // Ritual-themed projectiles matching ritualSpirit visual style
                    ctx.save();
                    let wrapped = this.getVisibleWrappedCoords([bullet.x, bullet.y], [bullet.radius * 2 + 32, bullet.radius * 2 + 32])
                    if (wrapped === null) continue;
                    ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                    ctx.translate(wrapped[0], wrapped[1]);
                    
                    // Rotate based on velocity to face movement direction
                    let angle = Math.atan2(bullet.vy, bullet.vx);
                    ctx.rotate(angle + Math.PI / 2);
                    
                    // Glow effect
                    ctx.globalCompositeOperation = 'lighter';
                    let g = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
                    g.addColorStop(0, 'rgba(136, 234, 255, 0.9)');
                    g.addColorStop(0.5, 'rgba(136, 234, 255, 0.3)');
                    g.addColorStop(1, 'rgba(136, 234, 255, 0)');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(0, 0, 16, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.globalCompositeOperation = 'source-over';
                    
                    // Spirit core (tear-drop shape matching ritualSpirit)
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.moveTo(0, -10);
                    ctx.quadraticCurveTo(7, 0, 0, 10);
                    ctx.quadraticCurveTo(-7, 0, 0, -10);
                    ctx.fill();
                    
                    // Inner cyan glow
                    ctx.fillStyle = '#88eaff';
                    ctx.beginPath();
                    ctx.moveTo(0, -6);
                    ctx.quadraticCurveTo(4, 0, 0, 6);
                    ctx.quadraticCurveTo(-4, 0, 0, -6);
                    ctx.fill();
                    
                    ctx.restore();
                    
                    // Add trail particles for enhanced projectiles (reduced frequency)
                    if (this.effectsManager && Math.random() < 0.1) {
                        this.effectsManager.createParticles('trailParticle', bullet.x, bullet.y, 1);
                    }
                } else if (bullet.navFireball) {
                    // Draw Nav's purple fireballs
                    ctx.save();
                    ctx.translate(bullet.x, bullet.y);
                    
                    // Rotating effect for fireball
                    ctx.rotate(Date.now() * 0.01);
                    
                    // Outer purple glow
                    ctx.globalCompositeOperation = 'lighter';
                    let g = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
                    g.addColorStop(0, 'rgba(160, 64, 255, 0.8)');
                    g.addColorStop(0.6, 'rgba(100, 30, 200, 0.4)');
                    g.addColorStop(1, 'rgba(100, 30, 200, 0)');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(0, 0, 16, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Inner core
                    ctx.fillStyle = '#f0d0ff';
                    ctx.beginPath();
                    ctx.arc(0, 0, 8, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.restore();
                    
                    // Fireball trail particles
                    if (this.effectsManager && Math.random() < 0.2) {
                     //   this.effectsManager.createParticles('energyBurst', bullet.x, bullet.y, 1, { spread: 5 });
                    }
                }
            }

            // Draw Nav
            if (this.nav) {
                ctx.save();
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                ctx.translate(this.nav.x, this.nav.y);
                
                // Slight bobbing and swaying
                let bob = Math.sin(this.nav.animTimer) * 5;
                let sway = Math.sin(this.nav.animTimer * 0.5) * 0.1;
                ctx.rotate(sway);
                
                // Glow around Nav
                ctx.globalCompositeOperation = 'lighter';
                let g = ctx.createRadialGradient(0, bob, 0, 0, bob, this.nav.radius * 1.5);
                g.addColorStop(0, 'rgba(160, 64, 255, 0.4)');
                g.addColorStop(1, 'rgba(160, 64, 255, 0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(0, bob, this.nav.radius * 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
                
                if (this.nav.loaded) {
                    // Draw the Nav sprite (purple wisp with witches hat)
                    ctx.drawImage(this.nav.img, -this.nav.radius, -this.nav.radius + bob, this.nav.radius * 2, this.nav.radius * 2);
                } else {
                    // Fallback wisp visual if image fails to load
                    ctx.fillStyle = '#a040ff';
                    ctx.beginPath();
                    ctx.arc(0, bob, this.nav.radius * 0.8, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Simple witch hat shape
                    ctx.fillStyle = '#201040';
                    ctx.beginPath();
                    ctx.moveTo(-this.nav.radius, bob - 5);
                    ctx.lineTo(this.nav.radius, bob - 5);
                    ctx.lineTo(0, bob - this.nav.radius * 1.5);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();
            }
            
            // Render enhanced visual effects
            if (this.effectsManager) {
                this.effectsManager.renderParticleSystems(ctx);
            }
            
            // Render telegraph warnings
            if (this.telegraphSystem) {
                this.telegraphSystem.renderTelegraphs(ctx);
            }
            
            // Render player invulnerability indicator
            if (this.ship && this.ship._invulnerable && this.ship._invulnerabilityTimer > 0) {
                ctx.save();
                const alpha = 0.3 + 0.3 * Math.sin(Date.now() * 0.02);
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = '#88eaff';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(this.ship.x, this.ship.y, (this.ship.radius || 15) + 8, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
        };

        // small minions/orbs for later attacks
        this.enemyTypes.ritualMinion = {
            radius: 18,
            color: '#5fe8ff',
            healthMax: 400,
            draw: (ctx, e) => {
                ctx.save();
                let t = (e._anim || 0) / 8;
                let bob = Math.sin(t) * 4;
                
                ctx.globalCompositeOperation = 'lighter';
                // Aura
                let g = ctx.createRadialGradient(e.x, e.y + bob, 2, e.x, e.y + bob, e.radius * 1.5);
                g.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                g.addColorStop(1, 'rgba(95, 232, 255, 0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(e.x, e.y + bob, e.radius * 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Core (tear-drop spirit shape)
                ctx.save();
                ctx.translate(e.x, e.y + bob);
                let ang = Math.atan2(e.vy, e.vx) + Math.PI/2;
                ctx.rotate(ang);
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.moveTo(0, -e.radius * 0.8);
                ctx.quadraticCurveTo(e.radius * 0.6, 0, 0, e.radius * 0.8);
                ctx.quadraticCurveTo(-e.radius * 0.6, 0, 0, -e.radius * 0.8);
                ctx.fill();
                ctx.restore();
                
                ctx.restore();
            }
        };
        this.enemyTypes.ritualOrb = {
            radius: 10,
            color: '#9ff5ff',
            healthMax: 200,
            draw: (ctx, e) => {
                ctx.save();
                ctx.fillStyle = e.color || '#9ff5ff';
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        };
        // avoid blood-specific collections
        this._bloodLootRanges = null;
        this._vampireWarns = null;
        this._vampireBeams = null;
        this.bossActive = false;
    }

    spawnArena() {
        this.arenaDiv = document.createElement('div');
        this.arenaDiv.id = 'ritual-arena';
        Object.assign(this.arenaDiv.style, {
            position: 'fixed',
            left: '50%',
            top: '547px',
            width: this.canvasWidth + 'px',
            height: this.canvasHeight + 'px',
            transform: `translate(-50%, -50%)`,
            backgroundImage: "url(resources/ui/spaceBattle/ascensionRitual.png)",
            border: '3px solid ' + player.ir.primaryColor,
            borderRadius: '0',
            zIndex: 9999,
            overflow: 'hidden',
	        "transition-duration": "0s",
        });
        document.body.appendChild(this.arenaDiv);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width || 800;
        this.canvas.height = this.height || 600;
        this.arenaDiv.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);

        this.running = true;
        this.loop = setInterval(() => this.update(), 1000 / 60);

        if (player && player.ir && player.ir.shipType == 3) {
            this.canvas.addEventListener('click', this.canvasClickListener);
        }
    }

    // Expand arena to full-screen and make transparent for boss fights
    enterFullscreenBossMode() {
        try {
            if (this._bossFullscreen) return;
            this._prevStyles = {
                width: this.arenaDiv.style.width,
                height: this.arenaDiv.style.height,
                left: this.arenaDiv.style.left,
                top: this.arenaDiv.style.top,
                transform: this.arenaDiv.style.transform,
                background: this.arenaDiv.style.background,
                zIndex: this.arenaDiv.style.zIndex,
                opacity: this.arenaDiv.style.opacity
            };
            Object.assign(this.arenaDiv.style, {
                left: '0px',
                top: '0px',
                width: (window.innerWidth) + 'px',
                height: (window.innerHeight) + 'px',
                transform: 'none',
                background: 'rgba(0,0,0,0.12)',
                zIndex: 9999,
                opacity: 1
            });
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this._bossFullscreen = true;
        } catch (e) { console.warn('enterFullscreenBossMode failed', e); }
    }

    exitFullscreenBossMode() {
        try {
            if (!this._bossFullscreen) return;
            const s = this._prevStyles || {};
            Object.assign(this.arenaDiv.style, {
                left: s.left || '50%',
                top: s.top || '50%',
                width: s.width || (this.width || 800) + 'px',
                height: s.height || (this.height || 600) + 'px',
                transform: s.transform || 'translate(-50%, -50%)',
                background: s.background || 'linear-gradient(180deg, #1b1830 0%, #2b2544 50%, #1b1830 100%)',
                zIndex: s.zIndex || 1,
                opacity: s.opacity || 0.8
            });
            this.canvas.width = parseInt(this.arenaDiv.style.width) || 800;
            this.canvas.height = parseInt(this.arenaDiv.style.height) || 600;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this._bossFullscreen = false;
        } catch (e) { console.warn('exitFullscreenBossMode failed', e); }
    }

    // delegate to base spawnEnemy but do not allow blood-specific types
    spawnEnemy(typeName) {
        if (!typeName) return;
        const disallowedPrefix = 'blood';
        if (typeof typeName === 'string' && typeName.toLowerCase().includes('blood')) return;
        if (typeof super.spawnEnemy === 'function') return super.spawnEnemy(typeName);
    }

    // Enhanced damage feedback system
    takeDamage(amount) {
        // Call parent damage handling if it exists
        if (typeof super.takeDamage === 'function') {
            super.takeDamage(amount);
        } else {
            // Basic damage handling if parent doesn't have it
            if (this.ship && player && player.ir) {
                player.ir.shipHealth = player.ir.shipHealth.sub(amount);
            }
        }
        
        // Update skill tracking
        this.skillTracker.lastDamageTime = Date.now();
        this.skillTracker.consecutiveDodges = 0;
        this.skillTracker.skillLevel = Math.max(0.5, this.skillTracker.skillLevel - 0.1);
        
        // Check if player is struggling
        if (this.skillTracker.skillLevel < 0.7) {
            this.onPlayerStruggling();
        }
        
        // Set temporary invulnerability visual indicator
        if (this.ship) {
            this.ship._invulnerable = true;
            this.ship._invulnerabilityTimer = 1000; // 1 second
        }
    }
    
    // Enhanced hit feedback when player hits boss (reduced effects)
    onBossHit(boss, damage) {
        if (this.effectsManager && boss) {
            // Hit impact particles (reduced count)
            this.effectsManager.createParticles('impactSpark', boss.x, boss.y, 3, { spread: 20 });
            
            // Subtle screen shake for satisfying feedback (reduced intensity)
            this.effectsManager.addScreenShake(1, 100);
            
            // Removed excessive hit flash effect per user feedback
        }
    }
    
    // Track near misses for skillful play feedback
    onNearMiss(projectile) {
        if (!this.ship || !projectile) return;
        
        const distance = Math.hypot(this.ship.x - projectile.x, this.ship.y - projectile.y);
        const nearMissThreshold = 40; // pixels
        
        if (distance <= nearMissThreshold) {
            this.skillTracker.nearMisses++;
            this.skillTracker.consecutiveDodges++;
            
            // Provide positive visual feedback for near miss (reduced particles)
            if (this.effectsManager) {
                this.effectsManager.createParticles('auraParticle', this.ship.x, this.ship.y, 2, { spread: 15 });
            }
            
            // Increase skill level based on consecutive dodges
            if (this.skillTracker.consecutiveDodges >= 5) {
                this.skillTracker.skillLevel = Math.min(2.0, this.skillTracker.skillLevel + 0.1);
                this.onSkillfulPlay();
            }
        }
    }
    
    // Reward skillful play with visual feedback (reduced effects)
    onSkillfulPlay() {
        if (this.effectsManager && this.ship) {
            // Create rewarding visual effect (reduced particles)
            //this.effectsManager.createParticles('energyBurst', this.ship.x, this.ship.y, 4, { spread: 30 });
            // Removed excessive skillful play flash effect per user feedback
        }
    }
    
    // Provide subtle assistance for struggling players
    onPlayerStruggling() {
        if (this.skillTracker.skillLevel < 0.7) {
            // Slightly increase telegraph warning times
            if (this.telegraphSystem) {
                this.telegraphSystem.warningThresholds.minor += 100;
                this.telegraphSystem.warningThresholds.major += 150;
                this.telegraphSystem.warningThresholds.ultimate += 200;
            }
        }
    }

    // disable asteroids if desired
    spawnAsteroid(big = false, x = null, y = null) {
        // intentionally disabled for RitualArena by default
    }

    removeArena() {
        try {
            // Cleanup visual effects
            if (this.effectsManager) {
                this.effectsManager.cleanup();
            }
            
            // Cleanup telegraph system
            if (this.telegraphSystem) {
                this.telegraphSystem.cleanup();
            }
            
            // Cleanup phase manager
            if (this.phaseManager) {
                this.phaseManager.cleanup();
            }
            
            // Reset skill tracker
            if (this.skillTracker) {
                this.skillTracker = {
                    nearMisses: 0,
                    consecutiveDodges: 0,
                    lastDamageTime: 0,
                    skillLevel: 1.0
                };
            }
            
            // Call parent cleanup
            if (typeof super.removeArena === 'function') {
                super.removeArena();
            } else {
                // Manual cleanup if parent doesn't have removeArena
                if (this.arenaDiv && this.arenaDiv.parentNode) {
                    this.arenaDiv.parentNode.removeChild(this.arenaDiv);
                }
                if (this.loop) {
                    clearInterval(this.loop);
                }
                this.running = false;
                
                // Remove event listeners
                window.removeEventListener('keydown', this.handleKeyDown);
                window.removeEventListener('keyup', this.handleKeyUp);
                window.removeEventListener('mousedown', this.handleMouseDown);
                window.removeEventListener('mouseup', this.handleMouseUp);
                window.removeEventListener('mousemove', this.handleMouseMove);
                try { if (player && player.cbs) player.cbs.ritualSpiritActive = false; } catch (e) {}
            }
        } catch (e) {
            console.warn('RitualArena removeArena error', e);
        }
    }
    
    update(delta) {
        // keep minimal: allow boss AI for `ritualSpirit`, then let SpaceArena handle physics/collisions/draw
        const dtMs = (typeof delta === 'number') ? delta : (1000 / 60);

        // Update visual effects system
        if (this.effectsManager) {
            this.effectsManager.updateParticleSystems(dtMs);
        }
        
        // Update telegraph system
        if (this.telegraphSystem) {
            this.telegraphSystem.updateTelegraphs(dtMs);
        }
        
        // Update player invulnerability timer
        if (this.ship && this.ship._invulnerabilityTimer > 0) {
            this.ship._invulnerabilityTimer -= dtMs;
            if (this.ship._invulnerabilityTimer <= 0) {
                this.ship._invulnerable = false;
            }
        }
        
        // Check for ship death
        if (player && player.ir && player.ir.shipHealth.lte(0)) {
            if (typeof this.onShipDeath === 'function') {
                this.onShipDeath();
            }
        }
        
        // Track near misses for skillful play feedback
        if (this.ship && this.bullets) {
            for (const bullet of this.bullets) {
                if (bullet.fromEnemy && bullet.active !== false) {
                    this.onNearMiss(bullet);
                }
            }
        }

        // Pause if upgrade choice active
        if (this.upgradeChoiceActive) {
            if (typeof this.draw === 'function') this.draw();
            return;
        }

        // Update Nav
        if (this.nav && this.ship) {
            // Nav follows player with some delay/bobbing
            this.nav.animTimer += dtMs * 0.005;
            let bobX = Math.sin(this.nav.animTimer * 0.8) * 20;
            let bobY = Math.cos(this.nav.animTimer * 1.2) * 20;
            
            // Target position is behind/to the side of player
            let followDist = 60;
            let followAngle = (this.ship.angle || 0) + Math.PI * 0.8;
            this.nav.targetX = this.ship.x + Math.cos(followAngle) * followDist + bobX;
            this.nav.targetY = this.ship.y + Math.sin(followAngle) * followDist + bobY;
            
            // Smoothly move Nav to target
            this.nav.x += (this.nav.targetX - this.nav.x) * 0.1;
            this.nav.y += (this.nav.targetY - this.nav.y) * 0.1;
            
            // Shooting logic
            if (this.nav.cooldown > 0) {
                this.nav.cooldown -= dtMs;
            } else if (this.enemies && this.enemies.length > 0) {
                // Find closest alive enemy
                let closestEnemy = null;
                let minDist = Infinity;
                for (let e of this.enemies) {
                    if (e && e.alive) {
                        let d = Math.hypot(e.x - this.nav.x, e.y - this.nav.y);
                        if (d < minDist) {
                            minDist = d;
                            closestEnemy = e;
                        }
                    }
                }
                
                if (closestEnemy && minDist < 1000) {
                    // Shoot fireball
                    let ang = Math.atan2(closestEnemy.y - this.nav.y, closestEnemy.x - this.nav.x);
                    let spd = 14;
                    this.bullets.push({
                        x: this.nav.x,
                        y: this.nav.y,
                        vx: Math.cos(ang) * spd,
                        vy: Math.sin(ang) * spd,
                        life: 220,
                        damage: 10 * (this.upgradeEffects.attackDamage || 1),
                        navFireball: true,
                        color: '#a040ff',
                        radius: 8,
                    });
                    this.nav.cooldown = 250; // Roughly 1.33 shots per second
                }
            }
        }

        // Pre-update: simple boss AI for ritualSpirit
        try {
            if (this.enemies && this.enemies.length) {
                for (let enemy of this.enemies) {
                    if (!enemy) continue;
                    if (enemy.type !== 'ritualSpirit') continue;

                    // init
                    if (!enemy._init) {
                        enemy._init = true;
                        enemy.phase = 1;
                        enemy.state = 'idle';
                        enemy.attackTimer = 90;
                        enemy._barrageTimer = 0; enemy._barrageTick = 0;
                        enemy._chargeTimer = 0; enemy._chargeTick = 0;
                        enemy._dashTimer = 0; enemy._dashTick = 0; enemy._dashPrep = 0; enemy._dashTargetX = null; enemy._dashTargetY = null; enemy._dashStartX = null; enemy._dashStartY = null; enemy._dashProgress = 0; enemy._swordTrail = [];
                        // new abilities
                        enemy._bladeTimer = 0; enemy._bladeTick = 0; enemy._bladePrep = 0; enemy._bladeLines = [];
                        enemy._ringTimer = 0; enemy._ringTick = 0;
                        enemy._teleportTimer = 0; enemy._teleportPrep = 0; enemy._teleportTarget = null;
                        enemy._laserTimer = 0; enemy._laserTotal = 180; enemy._laserAngle = 0;
                        enemy._anim = enemy._anim || 0;
                    }

                    // animate
                    enemy._anim = (enemy._anim || 0) + 1;

                    // phase by health with enhanced transition system
                    let pct = (enemy.health || new Decimal(0)) / new Decimal(1).max(enemy.maxHealth || new Decimal(0));
                    let newPhase = pct > 0.4 ? 1 : (pct > 0 ? 2 : 3);
                    if (newPhase !== enemy.phase) {
                        // Use the phase transition manager
                        if (this.phaseManager && this.phaseManager.triggerPhaseTransition(enemy, newPhase)) {
                            enemy.phase = newPhase;
                            enemy.state = 'idle';
                            enemy.attackTimer = 60;
                        }
                    }
                    
                    // Update phase transition if in progress
                    if (this.phaseManager) {
                        this.phaseManager.updateTransition(dtMs, enemy);
                    }
                    
                    // Skip attack logic if in transition or invulnerable
                    if (enemy._invulnerable || (this.phaseManager && this.phaseManager.isInTransition())) {
                        continue;
                    }
                    
                    // Continuously emit aura particles based on phase (further reduced frequency)
                    if (this.effectsManager && Math.random() < 0.05) {
                        const auraCount = Math.max(1, Math.floor((enemy.phase || 1) * 0.5));
                        this.effectsManager.createParticles('auraParticle', 
                            enemy.x + (Math.random() - 0.5) * enemy.radius * 2, 
                            enemy.y + (Math.random() - 0.5) * enemy.radius * 2, 
                            auraCount);
                    }

                    // decrement timers
                    enemy.attackTimer = (typeof enemy.attackTimer === 'number') ? enemy.attackTimer - 1 : 0;
                    if (enemy._barrageTimer > 0) enemy._barrageTimer--;
                    if (enemy._chargeTimer > 0) enemy._chargeTimer--;
                    if (enemy._dashTimer > 0) enemy._dashTimer--;
                    if (enemy._dashPrep > 0) enemy._dashPrep--;
                    if (enemy._summonTimer > 0) enemy._summonTimer--;
                    if (enemy._bladeTimer > 0) enemy._bladeTimer--;
                    if (enemy._bladePrep > 0) enemy._bladePrep--;
                    if (enemy._ringTimer > 0) enemy._ringTimer--;
                    if (enemy._ringTick > 0) enemy._ringTick--;
                    if (enemy._teleportTimer > 0) enemy._teleportTimer--;
                    if (enemy._teleportPrep > 0) enemy._teleportPrep--;
                    if (enemy._laserTimer > 0) enemy._laserTimer--;

                    // choose attacks
                    if (enemy.attackTimer <= 0) {
                        enemy.attackTimer = 70 + Math.floor(Math.random() * 80);
                        let options = ['orbBarrage','charge','dashAttack','spectralBlades'];
                        if (enemy.phase >= 2) options = options.concat(['pulse','summonMinions','ringOfSpirits','teleportStrike']);
                        if (enemy.phase >= 3) options = options.concat(['laserSweep','ringOfSpirits','spectralBlades']);

                        if (enemy.phase >= 3 && Math.random() < 0.35) {
                            // phase 3: multiple overlapping effects
                            enemy._barrageTimer = 200;
                            enemy._dashTimer = 140;
                            enemy._pulseTimer = 160;
                            enemy._bladeTimer = 220;
                            enemy._ringTimer = 240;
                        } else {
                            let a = options[Math.floor(Math.random() * options.length)];
                            if (a === 'orbBarrage') enemy._barrageTimer = 160;
                            if (a === 'charge') enemy._chargeTimer = 80;
                            if (a === 'dashAttack') { enemy._dashPrep = 60; enemy._dashTimer = 80; }
                            if (a === 'pulse') enemy._pulseTimer = 40;
                            if (a === 'summonMinions') enemy._summonTimer = 1;
                            if (a === 'spectralBlades') { enemy._bladePrep = 40; enemy._bladeTimer = 180; }
                            if (a === 'ringOfSpirits') { enemy._ringTimer = 220; }
                            if (a === 'teleportStrike') { enemy._teleportPrep = 36; }
                            if (a === 'laserSweep') { 
                                enemy._laserTotal = 220; 
                                enemy._laserTimer = enemy._laserTotal; 
                                enemy._laserAngle = Math.atan2((this.ship?this.ship.y:0) - enemy.y, (this.ship?this.ship.x:0) - enemy.x) + (Math.random()-0.5)*0.6;
                                
                                // Create enhanced laser telegraph
                                if (this.telegraphSystem) {
                                    const beamLength = Math.max(this.width, this.height) * 1.5;
                                    const beamEndX = enemy.x + Math.cos(enemy._laserAngle) * beamLength;
                                    const beamEndY = enemy.y + Math.sin(enemy._laserAngle) * beamLength;
                                    this.telegraphSystem.createLineTelegraph(
                                        enemy.x, enemy.y, beamEndX, beamEndY,
                                        1800, // 1.8 second warning
                                        '#dcccff'
                                    );
                                }
                            }
                        }
                    }

                    // Orb barrage: periodic radial bursts
                    if (enemy._barrageTimer > 0) {
                        enemy._barrageTick = (enemy._barrageTick || 0) + 1;
                        if (enemy._barrageTick >= 12) {
                            enemy._barrageTick = 0;
                            let pieces = 8;
                            for (let i = 0; i < pieces; i++) {
                                let ang = (i / pieces) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
                                let spd = 6 + Math.random() * 2;
                                this.bullets.push({ x: enemy.x, y: enemy.y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, life: 120, damage: 4.5 * (this.upgradeEffects.attackDamage || 1), pierce: 0, fromEnemy: true, ritualOrb: true, radius: 8, });
                            }
                            // Add energy burst particles
                            if (this.effectsManager) {
                                this.effectsManager.createParticles('energyBurst', enemy.x, enemy.y, 15, { spread: 20 });
                            }
                        }
                    }

                    // Spectral blades: telegraph then bursts of fast blades aimed at player
                    if (enemy._bladePrep > 0) {
                        // Create enhanced telegraph lines using the new system
                        if (!enemy._bladeTelegraphsCreated) {
                            enemy._bladeTelegraphsCreated = true;
                            let pieces = 1 + (enemy.phase || 2) * 1;
                            for (let i = 0; i < pieces; i++) {
                                let ang = (i / pieces) * Math.PI * 2 + (Math.random() - 0.5) * 0.18;
                                let tx = enemy.x + Math.cos(ang) * Math.max(this.width, this.height);
                                let ty = enemy.y + Math.sin(ang) * Math.max(this.width, this.height);
                                
                                if (this.telegraphSystem) {
                                    this.telegraphSystem.createLineTelegraph(
                                        enemy.x, enemy.y, tx, ty, 
                                        enemy._bladePrep * 16.67, // Convert to milliseconds
                                        '#b4ebff'
                                    );
                                }
                            }
                        }
                    } else {
                        enemy._bladeTelegraphsCreated = false;
                    }
                    if (enemy._bladeTimer > 0) {
                        enemy._bladeTick = (enemy._bladeTick || 0) + 1;
                        if (enemy._bladeTick >= 8) {
                            enemy._bladeTick = 0;
                            let pieces = 2 + (enemy.phase || 1);
                            for (let i = 0; i < pieces; i++) {
                                let aim = Math.atan2((this.ship?this.ship.y:enemy.y) - enemy.y, (this.ship?this.ship.x:enemy.x) - enemy.x);
                                let spread = (i - (pieces - 1) / 2) * 0.08;
                                let ang = aim + spread + (Math.random() - 0.5) * 0.02;
                                let spd = 12 + Math.random() * 4;
                                this.bullets.push({ x: enemy.x + Math.cos(ang) * enemy.radius, y: enemy.y + Math.sin(ang) * enemy.radius, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, life: 120, damage: 6.5 * (this.upgradeEffects.attackDamage || 1), pierce: 0, fast: true, fromEnemy: true, ritualBlade: true, radius: 8, });
                            }
                            // Add impact spark particles at blade spawn
                            if (this.effectsManager) {
                                this.effectsManager.createParticles('impactSpark', enemy.x, enemy.y, 8, { spread: 30 });
                            }
                        }
                    } else enemy._bladeLines = [];

                    // Ring of spirits: spawn homing orbs that circle outward with tactical positioning
                    if (enemy._ringTimer > 0) {
                        enemy._ringTick = (enemy._ringTick || 0) + 1;
                        if (enemy._ringTick >= 20) {
                            enemy._ringTick = 0;
                            
                            // Strategic positioning: create patterns that challenge player movement
                            let playerAngle = this.ship ? Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x) : 0;
                            let ringPhase = (enemy._ringTimer / 220) * Math.PI * 2; // Full rotation over attack duration
                            
                            // Create 3 orbs in a tactical formation
                            for (let i = 0; i < 3; i++) {
                                // Position orbs to create escape route challenges
                                let baseAngle = playerAngle + (i - 1) * 0.8 + Math.sin(ringPhase + i) * 0.4;
                                let spd = 2.4 + Math.random() * 1.6;
                                
                                // Spawn position with slight randomization
                                let spawnRadius = enemy.radius + 20;
                                let spawnX = enemy.x + Math.cos(baseAngle) * spawnRadius;
                                let spawnY = enemy.y + Math.sin(baseAngle) * spawnRadius;
                                
                                this.bullets.push({ 
                                    x: spawnX, y: spawnY, 
                                    vx: Math.cos(baseAngle) * spd, 
                                    vy: Math.sin(baseAngle) * spd, 
                                    life: 120, 
                                    damage: 3 * (this.upgradeEffects.attackDamage || 1), 
                                    homing: true, 
                                    fromEnemy: true, 
                                    ritualOrb: true,
                                    radius: 8,
                                });
                                
                                // Add spawn effect for each orb
                                if (this.effectsManager) {
                                    this.effectsManager.createParticles('energyBurst', spawnX, spawnY, 5, { spread: 10 });
                                }
                            }
                            
                            // Add ring formation visual effect
                            if (this.effectsManager && enemy._ringTick === 0) {
                                this.effectsManager.createParticles('auraParticle', enemy.x, enemy.y, 8, { spread: 60 });
                            }
                        }
                    }

                    // Teleport strike: show target prep, then warp and slash
                    if (enemy._teleportPrep > 0) {
                        // pick a target once
                        if (!enemy._teleportTarget) {
                            let tx = (this.ship ? this.ship.x : (this.width / 2)) + (Math.random() - 0.5) * 160;
                            let ty = (this.ship ? this.ship.y : (this.height / 2)) + (Math.random() - 0.5) * 120;
                            enemy._teleportTarget = { x: Math.max(40, Math.min(this.width - 40, tx)), y: Math.max(40, Math.min(this.height - 40, ty)) };
                            
                            // Create enhanced telegraph for teleport target
                            if (this.telegraphSystem) {
                                this.telegraphSystem.createCircleTelegraph(
                                    enemy._teleportTarget.x, enemy._teleportTarget.y, 
                                    40, enemy._teleportPrep * 16.67, '#c8faff'
                                );
                            }
                        }
                        // when prep finishes, teleport and do a fast radial slash
                        if (enemy._teleportPrep <= 1) {
                            // teleport
                            enemy.x = enemy._teleportTarget.x; enemy.y = enemy._teleportTarget.y;
                            enemy._teleportTarget = null;
                            // slash
                            let pieces = 36;
                            for (let i = 0; i < pieces; i++) {
                                let ang = (i / pieces) * Math.PI * 2 + (Math.random() - 0.5) * 0.06;
                                let spd = 7 + Math.random() * 3;
                                this.bullets.push({ x: enemy.x + Math.cos(ang) * (enemy.radius + 6), y: enemy.y + Math.sin(ang) * (enemy.radius + 6), vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, life: 120, damage: 5 * (this.upgradeEffects.attackDamage || 1), fromEnemy: true, ritualBlade: true, radius: 8, });
                            }
                            // Add dramatic teleport effects (reduced flash)
                            if (this.effectsManager) {
                                this.effectsManager.createParticles('phaseTransition', enemy.x, enemy.y, 25, { spread: 50 });
                                this.effectsManager.addScreenShake(8, 300);
                                // Removed excessive teleport flash effect per user feedback
                            }
                        }
                    }

                    // Laser sweep is handled by _laserTimer/Angle; actual beam visual is drawn in draw(), and here we can spawn a damaging core when it completes
                    if (enemy._laserTimer === 1) {
                        // finalize: spawn fast heavy projectiles along beam direction
                        let angle = enemy._laserAngle || 0;
                        let beamPieces = 26;
                        for (let i = 0; i < beamPieces; i++) {
                            let r = (i / beamPieces) * Math.max(this.width, this.height) * 0.9;
                            let x = enemy.x + Math.cos(angle) * r;
                            let y = enemy.y + Math.sin(angle) * r;
                            // small explosive projectiles outward
                            let spread = (Math.random() - 0.5) * 0.6;
                            this.bullets.push({ x: x, y: y, vx: Math.cos(angle + spread) * 6, vy: Math.sin(angle + spread) * 6, life: 120, damage: 6.5 * (this.upgradeEffects.attackDamage || 1), fromEnemy: true, ritualBlade: true });
                        }
                        
                        // Add dramatic completion effects (reduced screen shake)
                        if (this.effectsManager) {
                            this.effectsManager.addScreenShake(6, 300);
                            this.effectsManager.createParticles('impactSpark', enemy.x, enemy.y, 20, { spread: 40 });
                            
                            // Create residual energy effects along the beam path
                            for (let i = 0; i < 8; i++) {
                                let r = (i / 8) * Math.max(this.width, this.height) * 0.7;
                                let x = enemy.x + Math.cos(angle) * r;
                                let y = enemy.y + Math.sin(angle) * r;
                                this.effectsManager.createParticles('energyBurst', x, y, 3, { spread: 15 });
                            }
                        }
                    }

                    // Dash Attack with Visual Sword: boss dashes toward player with a sword trail
                    if (enemy._dashTimer > 0 && this.ship) {
                        enemy._dashTick = (enemy._dashTick || 0) + 1;
                        
                        // Telegraph the dash
                        if (enemy._dashPrep > 0) {
                            enemy._dashPrep--;
                            // Store target position
                            if (!enemy._dashTargetX) {
                                enemy._dashTargetX = this.ship.x;
                                enemy._dashTargetY = this.ship.y;
                                
                                // Create enhanced dash telegraph
                                if (this.telegraphSystem) {
                                    this.telegraphSystem.createLineTelegraph(
                                        enemy.x, enemy.y, enemy._dashTargetX, enemy._dashTargetY,
                                        enemy._dashPrep * 16.67, // Convert to milliseconds
                                        '#ffaa66'
                                    );
                                }
                            }
                        } else {
                            // Execute the dash
                            if (!enemy._dashStartX) {
                                enemy._dashStartX = enemy.x;
                                enemy._dashStartY = enemy.y;
                                enemy._dashProgress = 0;
                            }
                            
                            enemy._dashProgress += 0.05;
                            if (enemy._dashProgress >= 1) {
                                enemy._dashTimer = 0;
                                enemy._dashStartX = null;
                                enemy._dashStartX = null;
                                enemy._dashTargetX = null;
                                enemy._dashTargetY = null;
                                enemy._dashProgress = 0;
                                enemy._swordTrail = [];
                            } else {
                                // Lerp position
                                enemy.x = enemy._dashStartX + (enemy._dashTargetX - enemy._dashStartX) * enemy._dashProgress;
                                enemy.y = enemy._dashStartY + (enemy._dashTargetY - enemy._dashStartY) * enemy._dashProgress;
                                
                                // Add sword trail effect
                                if (!enemy._swordTrail) enemy._swordTrail = [];
                                enemy._swordTrail.push({
                                    x: enemy.x, y: enemy.y,
                                    alpha: 1.0,
                                    angle: Math.atan2(enemy._dashTargetY - enemy._dashStartY, enemy._dashTargetX - enemy._dashStartX)
                                });
                                
                                // Damage player if close
                                if (this.ship) {
                                    let dx = this.ship.x - enemy.x;
                                    let dy = this.ship.y - enemy.y;
                                    let dist = Math.sqrt(dx * dx + dy * dy);
                                    if (dist < enemy.radius + 30) {
                                        this.takeDamage(3.5 * (this.upgradeEffects.attackDamage || 1)); // Reduced from 14 to 3.5 (4x less)
                                    }
                                }
                            }
                        }
                    }

                    // Summon small spirits (simple minions)
                    if (enemy._summonTimer > 0) {
                        enemy._summonTimer = 0;
                        for (let i = 0; i < 3; i++) {
                            let a = Math.random() * Math.PI * 2;
                            let r = (enemy.radius || 64) * (0.6 + Math.random() * 0.6);
                            let ne = { type: 'ritualMinion', x: enemy.x + Math.cos(a) * r, y: enemy.y + Math.sin(a) * r, vx: (Math.random()-0.5)*1.5, vy:(Math.random()-0.5)*1.5, radius:18, health:200, maxHealth:200 };
                            this.enemies.push(ne);
                        }
                    }

                    // keep boss on-screen
                    if (enemy.x < enemy.radius) enemy.x = enemy.radius;
                    if (enemy.x > this.width - enemy.radius) enemy.x = this.width - enemy.radius;
                    if (enemy.y < enemy.radius) enemy.y = enemy.radius;
                    if (enemy.y > this.height - enemy.radius) enemy.y = this.height - enemy.radius;

                    // death handling
                    if (enemy.health <= 0) {
                        // HEALTH GOES BELOW 0
                        this.bossActive = false;
                        
                        // Add dramatic death effects (reduced intensity)
                        if (this.effectsManager) {
                            this.effectsManager.createParticles('phaseTransition', enemy.x, enemy.y, 50, { spread: 120 });
                            this.effectsManager.createParticles('energyBurst', enemy.x, enemy.y, 30, { spread: 100 });
                            this.effectsManager.addScreenShake(8, 600);
                            // Removed excessive death flash effect per user feedback
                        }
                        
                        try { if (typeof this.exitFullscreenBossMode === 'function') this.exitFullscreenBossMode(); } catch (e) {}
                        player.ir.inBattle = false
                        options.fullscreen = false
                        player.subtabs["cbs"]['stuff'] = 'Ritual'

                        if (arena) {
                            arena.removeArena();
                            arena = null;
                        }
                        localStorage.setItem('arenaActive', 'false');

                        player.ir.timers[player.ir.shipType].current = player.ir.timers[player.ir.shipType].max

                        player.ir.battleXP = new Decimal(0)
                        player.ir.battleLevel = new Decimal(1)

                        player.cbs.inBattle = false
                        player.cbs.ritualSpiritActive = false

                        pauseUniverseAll(["DS", "A2"], "unpause", true)
                    }
                }
            }
        } catch (e) { console.warn('RitualArena boss AI error', e); }

        // simple minion/orb behaviour so they feel alive
        if (this.enemies && this.enemies.length) {
            for (let m of this.enemies) {
                if (!m || !m.alive) continue;
                if (m.type === 'ritualMinion') {
                    m._anim = (m._anim || 0) + 1;
                    m.x += (m.vx || 0);
                    m.y += (m.vy || 0);
                    // mild homing towards player if close
                    if (this.ship) {
                        let dx = this.ship.x - m.x, dy = this.ship.y - m.y;
                        let dist = Math.hypot(dx, dy) || 1;
                        if (dist < 10000) {
                            m.vx += (dx / dist) * 0.16;
                            m.vy += (dy / dist) * 0.16;
                        }
                        m.vx *= 0.99; m.vy *= 0.99;
                    }
                }
                if (m.type === 'ritualOrb') {
                    m._anim = (m._anim || 0) + 1;
                    // slowly home to player
                    if (this.ship) {
                        let ang = Math.atan2(this.ship.y - m.y, this.ship.x - m.x);
                        m.vx += Math.cos(ang) * 0.06; m.vy += Math.sin(ang) * 0.06;
                        m.vx *= 0.985; m.vy *= 0.985;
                        m.x += m.vx; m.y += m.vy;
                    }
                }
            }
        }

        // let base class handle bullets, collisions and drawing
        if (typeof super.update === 'function') super.update(delta);
        try {
            if (player && player.cbs) {
                const bossAlive = !!(this.bossActive && this.enemies && this.enemies.some(e => e && e.type === 'ritualSpirit' && e.health.gt(0)));
                player.cbs.ritualSpiritActive = bossAlive;
            }
        } catch (e) {}
    }
}

//alternatively make the ritual a bullet hell attack

*/