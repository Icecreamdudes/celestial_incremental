addLayer("noxZone", {
    name: "Nox Zone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "D1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        highestLevel: new Decimal(0),
        LevelStart: new Decimal(0),
        levelScaling: new Decimal(1.15),
        levelScalingStart: new Decimal(0),

        selectedStageStart: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#5e1818, black)",
            backgroundOrigin: "border-box",
            borderColor: "#f57171",
            color: "white",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginRight: "50px !important",
        }
        if (player.subtabs["bl"]["stages"] == "noxZone") str.outline = "3px solid #fff"
        return str
    },
    tooltip: "Nox Zone",
    branches: [],
    color: "#f5b8b8",
    update(delta) {
        player[this.layer].levelScaling = new Decimal(1.1)
        if (hasUpgrade("ir", 23)) player[this.layer].levelScaling = player[this.layer].levelScaling.sub(0.02);
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("pl", 17));
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("bl", 16));
        player[this.layer].levelScaling = player[this.layer].levelScaling.max(1)
        player[this.layer].levelScalingStart = new Decimal(0)
    },
    clickables: {
        "enter": {
            title() {
                let str = "<h2>Enter Nox Zone"
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
                let look = {width: "350px", minHeight: "75px", color: "white", border: "3px solid #f5b8b8", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "radial-gradient(#5e1818, black)" : "#361e1e"
                return look
            },
        },
    },
    milestones: {
        11: {
            requirementDescription: "Nox Defeated",
            effectDescription() { return "Unlock Nox's Perks." },
            description() {return ""},
            done() { return player.bl.noxDefeated },
            style() {
                let look = {width: "334px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#f5b8b8", borderRadius: "10px"}
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
                            ["raw-html", "Nox Zone", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #f57171", marginBottom: "10px"}],
                        ["clickable", "enter"],

                    ], {width: "397px", height: "147px", background: "#0000003f", borderBottom: "3px solid #f57171"}],
                    
                    ["top-column", [
                        ["blank", "10px"],
                        ["style-column", [
                            ["raw-html", "Properties", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #f57171", marginBottom: "10px"}],
                        ["raw-html", () => {return Decimal.sub(player[player.subtabs["bl"]["stages"]].levelScaling, player.ir.levelScalingReduction).gt(1) ? "<u>Level Scaling" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return Decimal.sub(player[player.subtabs["bl"]["stages"]].levelScaling, player.ir.levelScalingReduction).gt(1) ? formatSimple(Decimal.sub(player[player.subtabs["bl"]["stages"]].levelScaling, player.ir.levelScalingReduction).max(1).sub(1).mul(100)) + "% starting at " + formatWhole(player[player.subtabs["bl"]["stages"]].levelScalingStart.add(1)) : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "10px"],
                        ["raw-html", "<u>Nox", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", "Nox will always be assisting", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "397px", height: "210px", background: "#0000007f", borderBottom: "3px solid #f57171"}],

                ], {width: "397px", height: "363px"}],
                ["style-column", [], {width: "403px", height: "363px"}],
            ], {width: "800px", height: "363px"}],
            ["top-column", [
                ["style-row", [], {height: "10px"}],
                ["style-column", [
                    ["raw-html", "Perks for defeating Nox", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                ], {width: "500px", height: "35px", borderBottom: "2px solid #f5b8b8", marginBottom: "5px"}],
                ["raw-html", "<u>Downside</u>", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ["raw-html", "Gain half as many blood stones.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["blank", "10px"],
                ["raw-html", "<u>Unlocks</u>", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ["raw-html", "[Coming Soon]", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["blank", "10px"],
                ["raw-html", "<u>Effects</u>", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ["raw-html", "\"Humanity\" punchcard cost decreased from 5 -> 3.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "Gain +2% more ship battle resources and XP per in-battle level.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "+1 ship battle save slot.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
            ], () => {
                let look = {background: "#5e1818", width: "800px", height: "357px"}
                if (!player.bl.noxDefeated) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"};
                return look
            }],
        ], {width: "800px", height: "720px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

// ZONE

SB_zones.noxZone = {
    nameCap: "Nox Zone",
    nameLow: "nox zone",
    location: "blood",
    unlocked() {
        return hasUpgrade("bl", 11)
    },

    primaryColor: "#f5b8b8",
    secondaryColor: "#5e1818",
    
    levelLimit: 20,
    asteroidLimit: 0,
    celestialiteSpawnCooldown: 60,
    celestialiteLimit: 12,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["leech", "whiteLeech", "bloodBat", "whiteBloodBat"]
        let cel2 = ["bloodEye", "redBloodEye", "largeLeech", "largeBloodBat"]

        if (Math.random() < player.ir.battleLevel.toNumber() / 40 ) {
            return cel2[Math.floor(Math.random()*cel2.length)]
        } else {
            return cel[Math.floor(Math.random()*cel.length)]
        }
    },
    generateAsteroid(level) {
        return "smallAsteroid";
    },
    levelUp(level) {
        if (level.modulo(20).eq(0)) {
            SB_spawnCelestialite("nox")
        }
    },
    statMult: new Decimal(4.44),
    rockMult: new Decimal(1.5),
    gemMult: new Decimal(1.5),
    xpReqMult: new Decimal(6.66),
    savePoints: [
        0, 
    ],
}

// CELESTIALITES

SB_celestialites.nox = {
    name: "Nox, the Vampire Knight",
    symbol: "nox",
    radius: 64,
    color: "#7a0000",
    health: new Decimal(5e5),
    damage: new Decimal(30),
    bodyDamage: new Decimal(0.125),
    regen: new Decimal(16),
    reward() {
        let gain = {}
        let random = Math.random()
        gain.bloodGems = Decimal.add(1, Math.random()).mul(5)
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(9)
    },
    initialize(celestialite) {
        screenFlash("— Nox, the Vampire Knight —", 1200)
        arena.enterFullscreen()
        arena.enemies = []
        arena.bullets = []
        arena.asteroids = []
        arena.xpOrbs = []
        arena.gammaTrails = []
        arena.enemySpawnCooldown = arena.enemySpawnCooldownMax;
        arena.bossActive = true
        player.bl.foughtNox = true

        // Stat changes
        celestialite.maxHealth = new Decimal(5e5)
        celestialite.health = new Decimal(5e5)
        celestialite.damage = new Decimal(30)
        celestialite.regen = new Decimal(16)

        celestialite.phase = 1
        celestialite.currentAttack = ['barrage', 'charge', 'fireball'][Math.floor(Math.random() * 3)];
        celestialite.attackInitialized = true
        celestialite.isBat = false
        celestialite.orbitDirection = false

        celestialite.attackTimer = 150

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.875
        celestialite.dvy = 0.875
    },
    decideAttack(celestialite) {
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        celestialite.playerAng = Math.atan2(dy, dx);
        // Decide on an attack
        let options = ['barrage', 'fireball'];
        if (!celestialite.isBat) options = options.concat(['charge', 'orbit']);
        if (celestialite.phase >= 2) options = options.concat(['burstSpears', 'toggleBat', 'spinningSword']);
        options.splice(options.indexOf(celestialite.currentAttack), 1)
        if (celestialite.playerDist < 800) {
            celestialite.currentAttack = options[Math.floor(Math.random() * options.length)];
        } else {
            celestialite.currentAttack = "charge";
        }
        celestialite.attackInitialized = false
    },
    attacks: {
        barrage(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 150
            }
            // Attack
            if ((celestialite.attackTimer / 30) % 1 == 0) {
                let random = Math.random() * Math.PI * 2
                for (i = 0; i < 5; i++) {
                    SB_spawnWarning("noxSpear", celestialite, {
                        dvx: 0.875,
                        dvy: 0.875,
                        ax: Math.cos(random) * 2,
                        ay: Math.sin(random) * 2,
                    })
                }
                celestialite.ax = Math.cos(random) * 2
                celestialite.ay = Math.sin(random) * 2
            }
        },
        charge(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 180
            }
            // Attack
            if (celestialite.attackTimer > 30) {
                let random = Math.random() * Math.PI * 2
                arena.bullets.push({
                    x: celestialite.x + Math.cos(random) * (celestialite.radius),
                    y: celestialite.y + Math.sin(random) * (celestialite.radius),
                    vx: Math.cos(random) * 8,
                    vy: Math.sin(random) * 8,
                    life: 30,
                    damage: celestialite.damage / 4,
                    pierce: 0,
                    piercedAsteroids: [],
                    fromEnemy: true,
                    radius: 6,
                });
            } else if (celestialite.attackTimer == 30) {
                let random = Math.random() * Math.PI * 2
                for (i = 0; i < 5; i++) {
                    SB_spawnWarning("noxSpear", celestialite, {
                        dvx: 0.875,
                        dvy: 0.875,
                        ax: celestialite.ax,
                        ay: celestialite.ay,
                        vx: celestialite.vx,
                        vy: celestialite.vy,
                    })
                }
            }
        },
        orbit(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 180
                celestialite.orbitDirection = Math.random() < 0.5
            }
            // Attack
            let random = Math.random() * Math.PI * 2
            arena.bullets.push({
                x: celestialite.x + Math.cos(random) * (celestialite.radius),
                y: celestialite.y + Math.sin(random) * (celestialite.radius),
                vx: Math.cos(random) * 8,
                vy: Math.sin(random) * 8,
                life: 30,
                damage: celestialite.damage / 4,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 6,
            });
            if (celestialite.attackTimer / 10 % 1 == 0) {
                for (i = 0; i < 2; i++) {
                    SB_spawnWarning("noxSpear", celestialite)
                }
            }
        },
        fireball(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 150
            }
            // Attack
            if (celestialite.attackTimer / 15 % 1 == 0) {
                SB_spawnProjectile("noxFireball", celestialite)
                let random = Math.random() * Math.PI * 2
                SB_spawnProjectile("noxFireball", celestialite, {
                    ang: celestialite.playerAng + (Math.random()-0.5) * Math.PI / 4
                })
            }
        },
        burstSpears(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 60
            }
            // Attack
            if ((celestialite.attackTimer / 5) % 1 == 0) {
                SB_spawnWarning("noxSpear", celestialite, {
                    targetAng: celestialite.playerAng + ((celestialite.attackTimer / 5) - 5.5) * Math.PI / 16,
                })
            }
        },
        toggleBat(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 30
                celestialite.isBat = !celestialite.isBat
                celestialite.orbitDirection = Math.random() < 0.5
            }
            // Attack
        },
        spinningSword(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 150
            }
            // Attack
            if (celestialite.attackTimer / 15 % 1 == 0) {
                SB_spawnProjectile("noxSpinningSword", celestialite)
            }
        },
    },
    tick(celestialite) {
        celestialite.phase = celestialite.health.lte(5e4) ? 2 : 1

        // Get distance/angle to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;
        celestialite.playerAng = Math.atan2(dy, dx);

        // Decide on a move angle
        if (celestialite.isBat) {
            celestialite.moveAng = celestialite.playerAng + (celestialite.orbitDirection ? Math.PI / 2 : -Math.PI / 2)
        }
        else if (celestialite.currentAttack == "charge") {
            let angDist = ( (celestialite.playerAng) - celestialite.moveAng + 3 * Math.PI ) % (Math.PI*2) - Math.PI;
            celestialite.moveAng += (angDist < -Math.PI ? angDist + Math.PI * 2 : angDist) * 0.03125;
        }
        else if (celestialite.currentAttack == "orbit") {
            let angDist = ( (celestialite.playerAng - (celestialite.orbitDirection ? 15*Math.PI/8 : 21*Math.PI/8)) - celestialite.moveAng + Math.PI ) % (Math.PI * 2) - Math.PI;
            celestialite.moveAng += (angDist < -Math.PI ? angDist + Math.PI * 2 : angDist) * 0.0625;
        } else {
            celestialite.moveAng = celestialite.playerAng;
        }
        celestialite.moveAng = (celestialite.moveAng + Math.PI * 3) % (Math.PI * 2) - Math.PI

        // Decide on an attack
        celestialite.attackTimer--
        if (celestialite.attackTimer <= 0) SB_celestialites[celestialite.type].decideAttack(celestialite);
        if (celestialite.isBat && celestialite.attackTimer % 10 == 5) {
            for (let i = 0; i < 3; i++) {
                arena.bullets.push({
                    x: celestialite.x + Math.cos(celestialite.playerAng + (i - 1) * Math.PI / 32) * celestialite.radius,
                    y: celestialite.y + Math.sin(celestialite.playerAng + (i - 1) * Math.PI / 32) * celestialite.radius,
                    vx: Math.cos(celestialite.playerAng + (i - 1) * Math.PI / 32) * 6,
                    vy: Math.sin(celestialite.playerAng + (i - 1) * Math.PI / 32) * 6,
                    life: 180,
                    damage: celestialite.damage / 4,
                    pierce: 0,
                    piercedAsteroids: [],
                    fromEnemy: true,
                    radius: 4,
                });
            }
        }

        // Move
        if (celestialite.isBat) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 3 + (Math.cos(celestialite.playerAng) * (celestialite.playerDist / 300 - 1) * 2)
            celestialite.ay = Math.sin(celestialite.moveAng) * 3 + (Math.sin(celestialite.playerAng) * (celestialite.playerDist / 300 - 1) * 2)
        } else if (celestialite.currentAttack == "barrage") {
            // Freeze
        } else if (celestialite.currentAttack == "orbit" || (celestialite.currentAttack == "charge" && celestialite.attackTimer > 30)) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 2
            celestialite.ay = Math.sin(celestialite.moveAng) * 2
        } else if (celestialite.currentAttack != "burstSpears") {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
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

        player.bl.noxDefeated = true
        player.ir.battleXP = player.ir.battleXPReq
    },
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (!wrapped) return;
        
        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        let t = (celestialite._pulseTimer || 0);
        let r = celestialite.radius || 64;
        // Check for bat transformation during batCircle attack
        if (celestialite.isBat) {
            // Draw Bat
            let flap = Math.sin(t * 0.2) * 0.5;
            ctx.fillStyle = "#330000";
            // Wings
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-r * 0.8, -r * (0.5 + flap), -r * 1.5, 0);
            ctx.quadraticCurveTo(-r * 0.8, r * 0.2, 0, 0);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(r * 0.8, -r * (0.5 + flap), r * 1.5, 0);
            ctx.quadraticCurveTo(r * 0.8, r * 0.2, 0, 0);
            ctx.fill();
            // Body
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.4, r * 0.25, 0, 0, Math.PI * 2);
            ctx.fill();
            // Eyes
            ctx.fillStyle = "#ff0000";
            ctx.beginPath(); ctx.arc(-r * 0.1, -r * 0.05, 3, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(r * 0.1, -r * 0.05, 3, 0, Math.PI * 2); ctx.fill();
        } else {
            // Draw Vampire Knight
            let bob = Math.sin(t * 0.05) * 10;
            ctx.translate(0, bob);
            // Cape (animated flap)
            let flap = Math.sin(t * 0.1) * 5;
            ctx.fillStyle = "#6a0000"; // Deeper vampire red
            ctx.beginPath();
            ctx.moveTo(-r * 0.5, -r * 0.2);
            ctx.lineTo(-r * 1.3 - flap, r * 1.3);
            ctx.lineTo(0, r * 0.9);
            ctx.lineTo(r * 1.3 + flap, r * 1.3);
            ctx.lineTo(r * 0.5, -r * 0.2);
            ctx.closePath();
            ctx.fill();
            // Shield (as seen in image)
            ctx.save();
            ctx.translate(r * 0.6, r * 0.2);
            ctx.rotate(0.1);
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "#ff0000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, -r * 0.5);
            ctx.lineTo(r * 0.4, -r * 0.3);
            ctx.lineTo(r * 0.4, r * 0.4);
            ctx.lineTo(0, r * 0.7);
            ctx.lineTo(-r * 0.4, r * 0.4);
            ctx.lineTo(-r * 0.4, -r * 0.3);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Shield detail
            ctx.strokeStyle = "#ff0000";
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(0, -r * 0.3); ctx.lineTo(0, r * 0.5); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(-r * 0.2, 0); ctx.lineTo(r * 0.2, 0); ctx.stroke();
            ctx.restore();
            // Body/Armor (Red/White/Black armor as in image)
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(-r * 0.4, -r * 0.2);
            ctx.lineTo(r * 0.4, -r * 0.2);
            ctx.lineTo(r * 0.3, r * 0.6);
            ctx.lineTo(-r * 0.3, r * 0.6);
            ctx.closePath();
            ctx.fill();
            // Red armor trim
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(-r * 0.4, -r * 0.2, r * 0.8, r * 0.1);
            ctx.fillRect(-r * 0.3, r * 0.4, r * 0.6, r * 0.1);
            // Red Hair (as seen in image)
            ctx.fillStyle = "#d40000";
            ctx.beginPath();
            ctx.arc(0, -r * 0.55, r * 0.32, Math.PI, 2 * Math.PI);
            ctx.fill();
            // Hair spikes
            ctx.beginPath();
            ctx.moveTo(-r * 0.3, -r * 0.6); ctx.lineTo(-r * 0.4, -r * 0.4); ctx.lineTo(-r * 0.2, -r * 0.5);
            ctx.moveTo(r * 0.3, -r * 0.6); ctx.lineTo(r * 0.4, -r * 0.4); ctx.lineTo(r * 0.2, -r * 0.5);
            ctx.fill();
            // Head (Pale skin)
            ctx.fillStyle = "#fff0f0";
            ctx.beginPath();
            ctx.arc(0, -r * 0.5, r * 0.25, 0, Math.PI * 2);
            ctx.fill();
            // Eyes (glowing)
            let glow = 0.5 + 0.5 * Math.abs(Math.sin(t * 0.1));
            ctx.fillStyle = `rgba(255, 0, 0, ${glow})`;
            ctx.beginPath(); ctx.arc(-r * 0.08, -r * 0.55, 4, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(r * 0.08, -r * 0.55, 4, 0, Math.PI * 2); ctx.fill();
            // Pulsing Aura
            ctx.beginPath();
            let auraR = r * (1.2 + 0.1 * Math.sin(t * 0.1));
            let grad = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, auraR);
            grad.addColorStop(0, "rgba(255, 0, 0, 0.2)");
            grad.addColorStop(1, "rgba(255, 0, 0, 0)");
            ctx.fillStyle = grad;
            ctx.arc(0, 0, auraR, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    },
}

SB_celestialites.whiteLeech = {
    name: "White Leech",
    symbol: "whiteLeech",
    radius: 10,
    color: "#7a0000",
    health: new Decimal(100),
    damage: new Decimal(5),
    bodyDamage: new Decimal(1),
    regen: new Decimal(4),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.99) {
            gain.bloodStones = Decimal.add(1, Math.random())
        } else {
            gain.bloodGems = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(3)
    },
    initialize(celestialite) {
        celestialite.wrigglePhase = 0
        celestialite.attachGracePeriod = 60
        celestialite.attached = false
        celestialite.attachedTimer = 0

        celestialite.targetingTimer = 0
        celestialite.turnTimer = 600

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.875
        celestialite.dvy = 0.875
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.wrigglePhase += 0.15;
        celestialite.attachGracePeriod--;
        celestialite.targetingTimer--;
        if (celestialite.targetingTimer > 0) celestialite.turnTimer--;

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Latch onto the player at close range
        if (!celestialite.attached && celestialite.attachGracePeriod <= 0 && celestialite.playerDist < 40) {
            if (Math.hypot(arena.ship.vx, arena.ship.vy) < 8) celestialite.attached = true;
            else celestialite.attachGracePeriod = 6;
        }

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 600 && !celestialite.attached) {
            celestialite.targetingTimer = 300
            celestialite.playerAng = Math.atan2(dy, dx);
            celestialite.moveAng = celestialite.playerAng
        };

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            let speed = celestialite.attachGracePeriod > 0 ? 0.15 : 0.3
            celestialite.ax = Math.cos(celestialite.moveAng) * speed * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            celestialite.ay = Math.sin(celestialite.moveAng) * speed
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.6
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.6
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
        }
        if (celestialite.playerDist < 100) {
            celestialite.ax *= 3
            celestialite.ay *= 3
        }

        // Attached behavior
        if (celestialite.attached) {
            celestialite.x = arena.ship.x - Math.cos(celestialite.moveAng) * 28
            celestialite.y = arena.ship.y - Math.sin(celestialite.moveAng) * 28
            celestialite.vx = 0
            celestialite.vy = 0
            celestialite.ax = 0
            celestialite.ay = 0

            celestialite.attachedTimer++
            celestialite.regen = SB_celestialites[celestialite.type].regen.mul(4).sub(celestialite.attachedTimer / 30 * arena.shipStats.attackDamage)
            if (celestialite.attachedTimer > 150) {
                celestialite.attached = false
                celestialite.attachGracePeriod = 60;
                celestialite.regen = SB_celestialites[celestialite.type].regen
                celestialite.attachedTimer = 0
            };

            player.ir.shipHealth = player.ir.shipHealth.sub(celestialite.damage.div(60))
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
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        let ang = celestialite.playerAng || 0;
        ctx.rotate(ang);
        let r = celestialite.radius;
        let len = r * 3.6;
        if (typeof celestialite.wrigglePhase !== 'number') celestialite.wrigglePhase = Math.random() * Math.PI * 2;
        let amp = celestialite.attached ? r * 0.5 : r * 1.1;
        let segs = 9;
        for (let i = 0; i <= segs; i++) {
            let t = i / segs;
            let x = -len / 2 + t * len;
            let phase = celestialite.wrigglePhase + t * Math.PI * 2.6;
            let y = Math.sin(phase) * amp * (1 - Math.abs(2 * t - 1) * 0.95);
            let segR = r * (0.55 + 0.75 * (1 - Math.abs(2 * t - 1)));
            // subtle venation gradient
            let grad = ctx.createLinearGradient(x - segR, y - segR, x + segR, y + segR);
            grad.addColorStop(0, celestialite.attached ? '#ffffff' : '#7a7a7a');
            grad.addColorStop(1, '#333333');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(x, y, segR, segR * 0.95, Math.sin(t * Math.PI) * 0.1, 0, Math.PI * 2);
            ctx.fill();
        }
        // head with mouth detail
        ctx.beginPath();
        ctx.ellipse(len / 2, Math.sin(celestialite.wrigglePhase + Math.PI * 1.1) * amp * 0.25, r * 0.95, r * 1.05, 0, 0, Math.PI * 2);
        ctx.fillStyle = celestialite.attached ? '#ffffff' : '#8b8b8b';
        ctx.fill();
        // tiny teeth
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(len / 2 - r * 0.2, -r * 0.05);
        ctx.lineTo(len / 2 + r * 0.1, 0);
        ctx.lineTo(len / 2 - r * 0.2, r * 0.05);
        ctx.stroke();
        ctx.restore();
    },
}

SB_celestialites.whiteBloodBat = {
    name: "White Blood Bat",
    symbol: "whiteBloodBat",
    radius: 10,
    color: "#7a0000",
    health: new Decimal(50),
    damage: new Decimal(2),
    bodyDamage: new Decimal(1),
    regen: new Decimal(4),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.99) {
            gain.bloodStones = Decimal.add(1, Math.random())
        } else {
            gain.bloodGems = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(3)
    },
    initialize(celestialite) {
        celestialite.wrigglePhase = 0

        celestialite.targetingTimer = 0
        celestialite.attackCooldown = 45
        celestialite.turnTimer = 600

        celestialite.preferredDistance = 250 + Math.random() * 100
        celestialite.preferredSpeed = 0.5

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.875
        celestialite.dvy = 0.875
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.wrigglePhase += 0.1;
        celestialite.attackCooldown--;
        celestialite.targetingTimer--;
        if (celestialite.targetingTimer > 0) celestialite.turnTimer--;

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
        };
        
        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * 5,
                vy: Math.sin(celestialite.playerAng) * 5,
                life: 120,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 3,
            });
            celestialite.attackCooldown = 45
            celestialite.preferredDistance = 150 + Math.random() * 150
            celestialite.preferredSpeed = 0.375 + Math.random() * 0.375
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.moveAng = celestialite.playerAng + Math.PI / 2
            celestialite.ax = Math.cos(celestialite.moveAng) * celestialite.preferredSpeed + (Math.cos(celestialite.playerAng) * (celestialite.playerDist / celestialite.preferredDistance - 1))
            celestialite.ay = Math.sin(celestialite.moveAng) * celestialite.preferredSpeed + (Math.sin(celestialite.playerAng) * (celestialite.playerDist / celestialite.preferredDistance - 1))
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
        celestialite.targetingTimer = 300

        celestialite.vx -= Math.cos(celestialite.playerAng) / 2
        celestialite.vy -= Math.sin(celestialite.playerAng) / 2
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        let flap = (celestialite.wrigglePhase || 0) * 6;
        // body
        ctx.beginPath();
        ctx.ellipse(0, 0, celestialite.radius * 0.9, celestialite.radius * 0.7, 0, 0, Math.PI * 2);
        let g = ctx.createLinearGradient(-celestialite.radius, -celestialite.radius, celestialite.radius, celestialite.radius);
        g.addColorStop(0, '#8b8b8b');
        g.addColorStop(1, '#333333');
        ctx.fillStyle = g;
        ctx.fill();
        // wings (left)
        ctx.save();
        ctx.rotate(-0.5 + Math.sin(flap) * 0.25);
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.quadraticCurveTo(-celestialite.radius * 2.2, -celestialite.radius * 0.9, -celestialite.radius * 1.1, -celestialite.radius * 1.5);
        ctx.quadraticCurveTo(-celestialite.radius * 0.4, -celestialite.radius * 0.8, -6, 0);
        ctx.fillStyle = '#4d4d4d';
        ctx.fill();
        ctx.restore();
        // wings (right)
        ctx.save();
        ctx.rotate(0.5 - Math.sin(flap) * 0.25);
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.quadraticCurveTo(celestialite.radius * 2.2, -celestialite.radius * 0.9, celestialite.radius * 1.1, -celestialite.radius * 1.5);
        ctx.quadraticCurveTo(celestialite.radius * 0.4, -celestialite.radius * 0.8, 6, 0);
        ctx.fillStyle = '#4d4d4d';
        ctx.fill();
        ctx.restore();
        // face
        ctx.beginPath();
        ctx.fillStyle = '#222222';
        ctx.ellipse(0, -4, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },
}

SB_celestialites.redBloodEye = {
    name: "Red Blood Eye",
    symbol: "redBloodEye",
    radius: 24,
    color: "#7a0000",
    health: new Decimal(500),
    damage: new Decimal(10),
    bodyDamage: new Decimal(1),
    regen: new Decimal(4),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.97) {
            gain.bloodStones = Decimal.add(1, Math.random()).mul(3)
        } else {
            gain.bloodGems = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(9)
    },
    initialize(celestialite) {
        celestialite.wrigglePhase = 0

        celestialite.targetingTimer = 0
        celestialite.attackCooldown = 210
        celestialite.turnTimer = 600

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.875
        celestialite.dvy = 0.875
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.wrigglePhase += 0.1;
        celestialite.attackCooldown--;
        celestialite.targetingTimer--;
        if (celestialite.targetingTimer > 0) celestialite.turnTimer--;

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 600) {
            celestialite.targetingTimer = 450
            celestialite.playerAng = Math.atan2(dy, dx);
            celestialite.moveAng = celestialite.playerAng
        };
        
        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            for (i = 0; i < 9; i++) {
                let ang = celestialite.playerAng + Math.PI / 16 * (i - 4)
                let speed = 3 + Math.random() * 3
                arena.bullets.push({
                    x: celestialite.x + Math.cos(ang) * (celestialite.radius),
                    y: celestialite.y + Math.sin(ang) * (celestialite.radius),
                    vx: Math.cos(ang) * speed,
                    vy: Math.sin(ang) * speed,
                    life: 180,
                    damage: celestialite.damage,
                    pierce: 0,
                    piercedAsteroids: [],
                    fromEnemy: true,
                    homing: true,
                    homingStrength: 0.025,
                    radius: 4,
                });
            }
            celestialite.attackCooldown = 240
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            if (celestialite.attackCooldown > 30 && celestialite.attackCooldown < 210 ) {
                if (celestialite.playerDist > 300) {
                    celestialite.ax = Math.cos(celestialite.moveAng) * 0.5
                    celestialite.ay = Math.sin(celestialite.moveAng) * 0.5
                } else {
                    celestialite.ax = 0
                    celestialite.ay = 0
                }
            }
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.5
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.5
            celestialite.attackCooldown = 240
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 450;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 450

        celestialite.vx -= Math.cos(celestialite.playerAng) / 8
        celestialite.vy -= Math.sin(celestialite.playerAng) / 8
    },
    onDeath(celestialite) {},
    draw: (ctx, celestialite) => {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        // eye always looks at ship
        let ang = celestialite.playerAng;
        ctx.rotate(ang);
        let r = celestialite.radius;
        // sclera
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffbfbf';
        ctx.fill();
        // iris
        ctx.beginPath();
        ctx.arc(r * 0.25, 0, r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#bf0000';
        ctx.fill();
        // pupil
        ctx.beginPath();
        ctx.arc(r * 0.25, 0, r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.restore();
        ctx.save();

        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        // glossy highlight
        ctx.beginPath();
        ctx.arc(-r * 0.1875 + 0.25 * r * Math.cos(ang), -r * 0.1875 + 0.25 * r * Math.sin(ang), r * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();
        ctx.restore();
    },
}

// PROJECTILES

SB_projectiles.noxSpear = {
    template(celestialite, warning = {}) {
        return {
            x: warning ? warning.x : celestialite.x,
            y: warning ? warning.y : celestialite.y,
            vx: Math.cos(warning ? warning.ang : celestialite.ang) * 12,
            vy: Math.sin(warning ? warning.ang : celestialite.ang) * 12,
            dvx: 1,
            dvy: 1,
            ax: 0,
            ay: 0,
            dax: 1,
            day: 1,
            life: 120,
            initialLife: 120,
            damage: celestialite ? celestialite.damage : new Decimal(16),
            pierce: 3,
            radius: 10,
            fromEnemy: true,
            vampireSpear: true,
            spear: true,
            ang: warning ? warning.ang : celestialite.ang,
            shaftLen: 56,
            shaftW: 6,
            tipLen: 18,
            knockback: 12,
            originX: warning ? warning.x : celestialite.x,
            originY: warning ? warning.y : celestialite.y,
        }
    },
    initialize(projectile) {
    },
    tick(projectile) {
        if (projectile.life < 15) {
            let m = projectile.life / 15
            projectile.radius = m * 10
            projectile.shaftLen = m * 56
            projectile.shaftW = m * 6
            projectile.tipLen = m * 18
            projectile.damage = projectile.celestialite ? projectile.celestialite.damage.mul(m) : Decimal.mul(48, m)
        };
    },
    onHit(projectile, attacker) {
        projectile.warning.timer = 0
    },
    draw(ctx, projectile) {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([projectile.x, projectile.y], [projectile.radius * 2, projectile.radius * 2])
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        // compute angle; allow ang to be animated by spin
        let ang = projectile.ang !== undefined ? projectile.ang : Math.atan2(projectile.vy || 0, projectile.vx || 1);
        // keep the spear rotation fixed (no spin)
        ang = projectile.ang !== undefined ? projectile.ang : Math.atan2(projectile.vy || 0, projectile.vx || 1);
        ctx.rotate(ang);
        // spear geometry
        let shaftLen = projectile.shaftLen || 56;
        let shaftW = projectile.shaftW || 6;
        let tipLen = projectile.tipLen || 18;
        // shaft: subtle wood/blood gradient
        try {
            let g = ctx.createLinearGradient(-12, 0, shaftLen, 0);
            g.addColorStop(0, '#3a1f1f');
            g.addColorStop(0.5, '#8b3b3b');
            g.addColorStop(1, '#2b0d0d');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.rect(-12, -shaftW / 2, shaftLen + 12, shaftW);
            ctx.fill();
            // light highlight along the shaft
            ctx.strokeStyle = 'rgba(255,180,180,0.18)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-8, -shaftW / 4);
            ctx.lineTo(shaftLen, -shaftW / 4);
            ctx.stroke();
            // fletching / small vanes near the butt of the spear
            for (let f = 0; f < 3; f++) {
                let fx = -6 - f * 6;
                ctx.beginPath();
                ctx.fillStyle = f % 2 ? '#331515' : '#4a1a1a';
                ctx.moveTo(fx, 0);
                ctx.lineTo(fx - 8, -4 - f * 0.5);
                ctx.lineTo(fx - 8, 4 + f * 0.5);
                ctx.closePath();
                ctx.fill();
            }
            // spear head: metallic gradient, polygon with a small tang
            let gh = ctx.createLinearGradient(shaftLen - tipLen, 0, shaftLen + tipLen, 0);
            gh.addColorStop(0, '#e8e8e8');
            gh.addColorStop(0.5, '#cccccc');
            gh.addColorStop(1, '#666666');
            ctx.fillStyle = gh;
            ctx.beginPath();
            ctx.moveTo(shaftLen, 0);
            ctx.lineTo(shaftLen - tipLen, -tipLen * 0.6);
            ctx.lineTo(shaftLen - tipLen * 0.6, 0);
            ctx.lineTo(shaftLen - tipLen, tipLen * 0.6);
            ctx.closePath();
            ctx.fill();
            // subtle edge highlight on head
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
            // small blood smear near the tip for visual feedback
            ctx.fillStyle = 'rgba(180,30,30,0.85)';
            ctx.beginPath();
            ctx.ellipse(shaftLen - tipLen * 0.15, 0, Math.max(2, shaftW / 2), Math.max(2, shaftW / 3), 0, 0, Math.PI * 2);
            ctx.fill();
        } catch (err) {
            // fallback simple spear if gradient calls fail
            ctx.strokeStyle = '#ff3b3b';
            ctx.lineWidth = shaftW;
            ctx.beginPath();
            ctx.moveTo(-12, 0);
            ctx.lineTo(shaftLen, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = '#ff0000';
            ctx.moveTo(shaftLen, 0);
            ctx.lineTo(shaftLen - tipLen, -tipLen * 0.5);
            ctx.lineTo(shaftLen - tipLen, tipLen * 0.5);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    },
}

SB_projectiles.noxFireball = {
    template(celestialite, warning = {}) {
        let projectile = {
            x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius || 64),
            y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius || 64),
            vx: Math.cos(celestialite.playerAng) * 14,
            vy: Math.sin(celestialite.playerAng) * 14,
            dvx: 1,
            dvy: 1,
            ax: 0,
            ay: 0,
            dax: 1,
            day: 1,
            life: 180,
            damage: celestialite.damage,
            pierce: 0,
            fromEnemy: true,
            fireball: true,
            radius: 14 + Math.floor(Math.random() * 6),
            flamePulse: Math.random() * Math.PI * 2
        }
        projectile.maxRadius = projectile.radius
        return projectile
    },
    initialize(projectile) {
    },
    tick(projectile) {
        if (projectile.life < 15) {
            let m = projectile.life / 15
            projectile.radius = m * projectile.maxRadius
            projectile.damage = projectile.celestialite.damage.mul(m)
        };
    },
    onHit(projectile, attacker) {
    },
    draw(ctx, projectile) {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([projectile.x, projectile.y], [projectile.radius * 2, projectile.radius * 2])
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        
        // flame pulse for flicker
        let pulse = 0.8 + 0.2 * Math.sin((projectile.flamePulse || 0) + (projectile.life || 0) * 0.12);
        let g = ctx.createRadialGradient(0, 0, 0, 0, 0, projectile.radius * 2);
        g.addColorStop(0, `rgba(255,255,200,${0.95 * pulse})`);
        g.addColorStop(0.3, `rgba(255,140,40,${0.9 * pulse})`);
        g.addColorStop(0.6, `rgba(200,40,20,${0.7 * pulse})`);
        g.addColorStop(1, `rgba(60,10,10,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, projectile.radius * (1 + 0.18 * Math.sin((projectile.flamePulse || 0) + (projectile.life || 0) * 0.08)), 0, Math.PI * 2);
        ctx.fill();
        // small core
        ctx.fillStyle = 'rgba(255,240,200,0.85)';
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(3, projectile.radius * 0.28), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },
}
SB_projectiles.noxSpinningSword = {
    template(celestialite, warning = {}) {
        return {
            x: celestialite.x + Math.cos(celestialite.playerAng + (Math.sign(Math.random()-0.5) * Math.PI/2)) * (celestialite.radius || 64),
            y: celestialite.y + Math.sin(celestialite.playerAng + (Math.sign(Math.random()-0.5) * Math.PI/2)) * (celestialite.radius || 64),
            vx: Math.cos(celestialite.playerAng + (Math.sign(Math.random()-0.5) * Math.PI/2)) * 15,
            vy: Math.sin(celestialite.playerAng + (Math.sign(Math.random()-0.5) * Math.PI/2)) * 15,
            dvx: 1,
            dvy: 1,
            ax: 0,
            ay: 0,
            dax: 1,
            day: 1,
            life: 120,
            damage: celestialite.damage.mul(1.5),
            pierce: 0,
            fromEnemy: true,
            homing: true,
            homingStrength: 0.25,
            radius: 20,
        }
    },
    initialize(projectile) {
    },
    tick(projectile) {
        projectile.homing = projectile.life > 90 && projectile.life < 105
        if (projectile.life < 15) {
            let m = projectile.life / 15
            projectile.radius = m * 24
            projectile.damage = projectile.celestialite.damage.mul(m * 1.5)
        };
    },
    onHit(projectile, attacker) {
    },
    draw(ctx, projectile) {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([projectile.x, projectile.y], [projectile.radius * 2, projectile.radius * 2])
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        ctx.rotate((projectile.life / 4) || 0);
        let r = projectile.radius * 2;
        let bladeLen = r * 1.5;
        let bladeW = r * 0.3;

        // Blade
        let grad = ctx.createLinearGradient(-bladeW/2, 0, bladeW/2, 0);
        grad.addColorStop(0, "#888");
        grad.addColorStop(0.5, "#eee");
        grad.addColorStop(1, "#888");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -bladeLen); // Tip
        ctx.lineTo(-bladeW/2, -bladeLen * 0.2);
        ctx.lineTo(-bladeW/2, 0);
        ctx.lineTo(bladeW/2, 0);
        ctx.lineTo(bladeW/2, -bladeLen * 0.2);
        ctx.closePath();
        ctx.fill();
        // Blade Edge Highlight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Crossguard
        ctx.fillStyle = "#553300";
        ctx.fillRect(-bladeW * 1.2, 0, bladeW * 2.4, bladeW * 0.4);
        // Handle
        ctx.fillStyle = "#331100";
        ctx.fillRect(-bladeW * 0.2, bladeW * 0.4, bladeW * 0.4, bladeW * 0.8);
        // Pommel
        ctx.fillStyle = "#553300";
        ctx.beginPath();
        ctx.arc(0, bladeW * 1.3, bladeW * 0.3, 0, Math.PI * 2);
        ctx.fill();
        // Glow
        ctx.shadowColor = "rgba(255, 0, 0, 0.5)";
        if (!options.performanceMode) {ctx.shadowBlur = 20} else {ctx.shadowBlur = 0};
        ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();
    },
}

// WARNINGS

SB_warnings.noxSpear = {
    readyTimer: 30,
    postReadyTimer: 120,
    length: 1440,
    width: 2,
    initialize(warning) {
        warning.targetAng = warning.celestialite.playerAng + ((Math.random() - 0.5) * Math.PI)
    },
    tick(warning) {
        let angDist = (warning.targetAng - warning.ang) % (Math.PI*2) - Math.PI;
        warning.ang += (angDist < 0 ? angDist + Math.PI : angDist) * 0.125;
        warning.ang = ((warning.ang + 3 * Math.PI) % (Math.PI * 2)) - Math.PI
    },
    onReady(warning) {
        warning.targetAng = warning.ang
        SB_spawnProjectile("noxSpear", warning.celestialite, warning);
        warning.vx = 0
        warning.vy = 0
    },
    style(ctx, warning, xy1, xy2) {
        let warningRef = SB_warnings[warning.type]
        let g = ctx.createLinearGradient(xy1[0], xy1[1], xy2[0], xy2[1]);
        let gStart = Math.min(1, Math.max(0, 1 - warning.timer / warningRef.postReadyTimer))
        g.addColorStop(gStart, 'rgba(255, 128, 0, 0)');
        g.addColorStop(gStart, 'rgba(255, 128, 0, ' + (warningRef.fade ? (warning.timer - warningRef.postReadyTimer) / warningRef.readyTimer * 0.5 : 0.5) + ')');
        g.addColorStop(1, 'rgba(255, 128, 0, 0)');
        return g
    },
}
SB_warnings.allyNoxSpear = {
    readyTimer: 0,
    postReadyTimer: 120,
    length: 1440,
    width: 2,
    initialize(warning) {
        if (arena.enemies.length > 0) {
            let targetDist = 1000000
            let target = 0
            for (let i = 0; i < arena.enemies.length; i++) {
                let celestialite = arena.enemies[0]
                let closest = arena.getClosestCoords([warning.x, warning.y], [celestialite.x, celestialite.y])
                let length = Math.hypot(closest[0] - celestialite.x, closest[1] - celestialite.y)
                if (targetDist > length) {
                    targetDist = length
                    target = i
                }
            }
            let targetCel = arena.enemies[target]
            warning.ang = Math.atan2(warning.y - targetCel.y, warning.x - targetCel.x)
            warning.x = targetCel.x - Math.cos(warning.ang) * 600
            warning.y = targetCel.y - Math.sin(warning.ang) * 600
        } else {
            warning.ang = (Math.random() - 0.5) * Math.PI * 2
            warning.x = Math.random() * arena.width
            warning.y = Math.random() * arena.height
        }
    },
    tick(warning) {
    },
    onReady(warning) {
        warning.targetAng = warning.ang
        SB_spawnProjectile("noxSpear", null, warning, {
            fromEnemy: false,
            damage: new Decimal(48),
            //damage: Decimal.div(arena.shipStats.attackDamage, levelableEffect("ir", player.ir.shipType)[2].toNumber()).div(arena.ship.damage).mul(48),
        });
    },
    style(ctx, warning, xy1, xy2) {
        let warningRef = SB_warnings[warning.type]
        let g = ctx.createLinearGradient(xy1[0], xy1[1], xy2[0], xy2[1]);
        let gStart = Math.min(1, Math.max(0, 1 - warning.timer / warningRef.postReadyTimer))
        g.addColorStop(gStart, 'rgba(255, 128, 0, 0)');
        g.addColorStop(gStart, 'rgba(255, 128, 0, ' + (warningRef.fade ? (warning.timer - warningRef.postReadyTimer) / warningRef.readyTimer * 0.5 : 0.5) + ')');
        g.addColorStop(1, 'rgba(255, 128, 0, 0)');
        return g
    },
}