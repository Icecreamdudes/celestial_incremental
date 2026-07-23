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
        levelScalingStart: new Decimal(10),

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
        player[this.layer].levelScaling = new Decimal(1.15)
        if (hasUpgrade("ir", 23)) player[this.layer].levelScaling = player[this.layer].levelScaling.sub(0.02);
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("pl", 17));
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("bl", 16));
        player[this.layer].levelScaling = player[this.layer].levelScaling.max(1)
        player[this.layer].levelScalingStart = new Decimal(10)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Nox Zone",
            canClick: true,
            unlocked: true,
            onClick() {
                player.ir.inBattle = true
                player.ir.battleStage = "noxZone"
                options.fullscreen = true
                player.subtabs["bl"]['stuff'] = 'Battle'

                player.ir.primaryColor = SB_zones[this.layer].primaryColor
                player.ir.secondaryColor = SB_zones[this.layer].secondaryColor

                arena = new SpaceArena(800, 800, 3200, 3200);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                pauseUniverseAll(["A2", "DS", "D1"], "pause", true)

                player.ir.shipHealth = player.ir.shipHealthMax

                player.ir.ufoFought = false
                player.ir.iriditeFought = false
            },
            style: {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(#5e1818, black)", border: "3px solid #f5b8b8", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
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
                        ["raw-html", () => {return Decimal.sub(player[player.subtabs["bl"]["stages"]].levelScaling, player.ir.levelScalingReduction).gt(1) ? formatSimple(Decimal.sub(player[player.subtabs["bl"]["stages"]].levelScaling, player.ir.levelScalingReduction).max(1).sub(1).mul(100)) + "% starting at " + formatWhole(player[player.subtabs["bl"]["stages"]].levelScalingStart) : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
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
                ["raw-html", "Gain +2% more ship battle resources per in-battle level.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
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

SB_zones.noxZone = {
    nameCap: "Nox Zone",
    nameLow: "nox zone",

    primaryColor: "#f5b8b8",
    secondaryColor: "#5e1818",
    levelLimit: 20,
    asteroidLimit: 0,
    celestialiteSpawnCooldown: 60,
    celestialiteLimit: 16,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["leech", "whiteLeech", "bloodBat", "whiteBloodBat"]
        let cel2 = ["bloodEye", "largeLeech", "largeBloodBat"]

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
        if (level.modulo(20).eq(0)) {/*
            arena.enemies = []
            arena.asteroids = []
            arena.xpOrbs = []
            arena.gammaTrails = []
            arena.bossActive = true;
            arena.enemySpawnCooldown = arena.enemySpawnCooldownMax;
            SB_spawnCelestialite("ufo")*/
        }
    },
    statMult: new Decimal(1.5),
    rockMult: new Decimal(1.5),
    gemMult: new Decimal(1.5),
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
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(5)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(4)
    },
    initialize(celestialite) {
        celestialite.wrigglePhase = 0
        celestialite.attachGracePeriod = 60
        celestialite.attached = false

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
        if (!celestialite.attached && celestialite.attachGracePeriod <= 0 && celestialite.playerDist < 40) celestialite.attached = true;

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 600 && !celestialite.attached) {
            celestialite.targetingTimer = 300
            celestialite.playerAng = Math.atan2(dy, dx);
            celestialite.moveAng = celestialite.playerAng
        };

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.3 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.3
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
    regen: new Decimal(2),
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
        return Decimal.add(2, Math.random()).mul(5)
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