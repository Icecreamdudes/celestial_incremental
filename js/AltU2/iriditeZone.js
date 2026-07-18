addLayer("iriditeZone", {
    name: "Iridite Zone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✦", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        highestLevel: new Decimal(0),
        LevelStart: new Decimal(0),
        levelScaling: new Decimal(1.1),
        levelScalingStart: new Decimal(10),

        selectedStageStart: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#151230)",
            backgroundOrigin: "border-box",
            borderColor: "#904ee6",
            color: "white",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginRight: "50px !important",
        }
        if (player.subtabs["ir"]["spaceStages"] == "spaceZone2") str.outline = "3px solid #fff"
        return str
    },
    tooltip: "Iridite Zone",
    branches: ["spaceZone2"],
    color: "#904ee6",
    update(delta) {
        player[this.layer].levelScaling = new Decimal(1.1)
        if (hasUpgrade("ir", 23)) player[this.layer].levelScaling = player[this.layer].levelScaling.sub(0.02);
        player[this.layer].levelScaling = player[this.layer].levelScaling.max(1)
        player[this.layer].levelScalingStart = new Decimal(10)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Iridite Zone",
            canClick: true,
            unlocked: true,
            onClick() {
                player.ir.inBattle = true
                player.ir.battleStage = "iriditeZone"
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
            style: {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(#151230)", border: "3px solid white", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
        "startStage0": {
            title: "0",
            canClick() {return true},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = 0
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid white", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#151230)"
                if (player[this.layer].selectedStageStart == 0) look.outline = "3px solid white";
                return look
            },
        },
        "switchSides": {
            title: "X",
            canClick() {return false},
            unlocked: true,
            onClick() {
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid white", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (player.ir.iriditeDefeated) look.background = "#1a3b0f"
                if (false) look.outline = "3px solid white";
                return look
            },
        },
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {
        11: {
            requirementDescription: "Iridite Defeated",
            effectDescription() { return "Unlock Iridite's Perks." },
            description() {return ""},
            done() { return player.ir.iriditeDefeated },
            style() {
                let look = {width: "334px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "white", borderRadius: "10px"}
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
                            ["raw-html", "Iridite Zone", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["clickable", "enter"],

                    ], {width: "397px", height: "147px", background: "#0000003f", borderBottom: "3px solid #5e4ee6"}],
                    
                    ["style-column", [
                        ["titleless-milestone", 11],
                        ["style-row", [
                            ["style-row", [], {width: "144.4px"}],
                            ["style-row", [], {background: "white", width: "3px", height: "22px"}],
                        ]],
                        ["style-row", [
                            ["clickable", "startStage0"],
                            ["style-row", [], {background: "white", width: "94px", height: "3px"}],
                            ["clickable", "switchSides"],
                        ]],
                    ], {width: "397px", height: "210px", background: "#0000007f", borderBottom: "3px solid #5e4ee6"}],
                   
                ], {width: "397px", height: "363px"}],
                ["style-column", [], {width: "403px", height: "363px"}],
            ], {width: "800px", height: "363px"}],
            ["style-column", [
                ["style-column", [
                    ["raw-html", "Perks for defeating Iridite", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                ], {width: "500px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "5px"}],
                ["raw-html", "<u>Unlocks</u>", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ["raw-html", () => { return player.pol.unlockHive == 2 ? "The Hive" : "Larva (In Pollinators)" }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "New Punchcards", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "New Dark Universe 1 Upgrades", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "New Singularity Upgrades", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "New Starmetal Studies", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["blank", "10px"],
                ["raw-html", "<u>Effects</u>", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ["raw-html", "^2 to 2nd antimatter softcap start.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "Weakened 3rd replicanti point softcap.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "Keep hex progress on singularity reset.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "x50 dice sides.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "x1e12 post-OTF currencies.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                ["raw-html", "/1.5 starmetal essence generator cooldowns", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
            ], () => {
                let look = {background: "#151230", width: "800px", height: "357px"}
                if (!player.ir.iriditeDefeated) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"};
                return look
            }],
        ], {width: "800px", height: "720px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

SB_zones.iriditeZone = {
    nameCap: "Iridite Zone",
    nameLow: "iridite zone",

    primaryColor: "#ffffff",
    secondaryColor: "#151230",

    levelLimit: 20,
    asteroidLimit: 16,
    celestialiteSpawnCooldown: 300,
    celestialiteLimit: 4,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["betaShip", "gammaShip", "zetaShip", "iridianShip1", "iridianShip2"]
        if (level >= 10) cel = cel.concat(["deltaShip", "etaShip", "iridianShip3", "iridianShip4"]);

        return cel[Math.floor(Math.random()*cel.length)]
    },
    generateAsteroid(level) {
        let random = Math.random()
        if (random < 0.05) return "largeAsteroid";
        if (random < 0.3) return "mediumAsteroid";
        else return "smallAsteroid";
    },
    statMult: new Decimal(2),
    rockMult: new Decimal(3),
    gemMult: new Decimal(1.75),
}

SB_celestialites.largeAsteroid = {
    name: "Large Asteroid",
    symbol: "3",
    radius: 50,
    color: "#6f6f6f",
    health: new Decimal(180),
    damage: new Decimal(1),
    bodyDamage: new Decimal(3),
    regen: new Decimal(0),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.96) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(8)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(1, Math.random()).mul(6)
    },
    initialize(celestialite) {
        celestialite.shape = arena.generateConvexPolygon(celestialite.radius, 9 + Math.floor(Math.random() * 5));

        let moveAng = Math.random() * Math.PI * 2
        let speed = 1 + Math.random()
        celestialite.vx = Math.cos(moveAng) * speed
        celestialite.vy = Math.sin(moveAng) * speed
    },
    tick(celestialite) {},
    onAttacked(celestialite, damage, attacker) {},
    onDeath(celestialite) {
        for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
            let moveAng = Math.random() * Math.PI * 2
            let speed = (1 + Math.random()) * 1.25
            SB_spawnAsteroid("mediumAsteroid", {
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

SB_celestialites.iridianShip1 = {
    name: "Iridian Ship 1",
    symbol: "1",
    radius: 32,
    color: "#e0e0ff",
    health: new Decimal(250),
    damage: new Decimal(2),
    bodyDamage: new Decimal(1),
    regen: new Decimal(5),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
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
        celestialite.attackCooldown = 60
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
            celestialite.targetingTimer = 60
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            celestialite.moveAng = celestialite.playerAng + (Math.PI * 0.5 * (Math.random() - 0.5))
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * 4,
                vy: Math.sin(celestialite.playerAng) * 4,
                life: 600,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                star: true,
                radius: 4,
            });
            celestialite.attackCooldown = 60
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
            ctx.beginPath();
            ctx.arc(wrapped[0], wrapped[1], celestialite.radius, 0, 2 * Math.PI);
            ctx.fillStyle = celestialite.color;
            ctx.shadowColor = "#37078f";
            if (!options.performanceMode) {ctx.shadowBlur = 8} else {ctx.shadowBlur = 0};
            ctx.fill();
            ctx.font = "bold 32px monospace";
            ctx.fillStyle = "#37078f";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}

SB_celestialites.iridianShip2 = {
    name: "Iridian Ship 2",
    symbol: "2",
    radius: 28,
    color: "#ffffe0",
    health: new Decimal(200),
    damage: new Decimal(2),
    bodyDamage: new Decimal(1),
    regen: new Decimal(3),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.8) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(15)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random())
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(17)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 90
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
            celestialite.targetingTimer = 60
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            celestialite.moveAng = celestialite.playerAng + (Math.PI * 0.5 * (Math.random() - 0.5))
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * (1 + Math.random()),
                vy: Math.sin(celestialite.playerAng) * (1 + Math.random()),
                life: 300,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                star: true,
                homing: true,
                radius: 4,
            });
            celestialite.attackCooldown = 90
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
            ctx.beginPath();
            ctx.arc(wrapped[0], wrapped[1], celestialite.radius, 0, 2 * Math.PI);
            ctx.fillStyle = celestialite.color;
            ctx.shadowColor = "#3d08a1";
            if (!options.performanceMode) {ctx.shadowBlur = 8} else {ctx.shadowBlur = 0};
            ctx.fill();
            ctx.font = "bold 32px monospace";
            ctx.fillStyle = "#3d08a1";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}
SB_celestialites.iridianShip3 = {
    name: "Iridian Ship 3",
    symbol: "3",
    radius: 20,
    color: "#ffe0ff",
    health: new Decimal(150),
    damage: new Decimal(2),
    bodyDamage: new Decimal(3),
    regen: new Decimal(1),
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
        return Decimal.add(2, Math.random()).mul(17)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 120
        celestialite.trailCooldown = 15
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
        celestialite.targetingTimer--;
        celestialite.turnTimer--;

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 600) {
            celestialite.targetingTimer = 60
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            celestialite.moveAng = celestialite.playerAng + (Math.PI * 0.5 * (Math.random() - 0.5))
            celestialite.attackCooldown = 120
        }

        // Spawn a poison trail
        if (celestialite.trailCooldown <= 0) {
            arena.gammaTrails.push({
                x: celestialite.x,
                y: celestialite.y,
                radius: 24,
                timer: 90,
                damage: 1
            });
            celestialite.trailCooldown = 15
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
            ctx.beginPath();
            ctx.arc(wrapped[0], wrapped[1], celestialite.radius, 0, 2 * Math.PI);
            ctx.fillStyle = celestialite.color;
            ctx.shadowColor = "#490abf";
            if (!options.performanceMode) {ctx.shadowBlur = 8} else {ctx.shadowBlur = 0};
            ctx.fill();
            ctx.font = "bold 32px monospace";
            ctx.fillStyle = "#490abf";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}

SB_celestialites.iridianShip4 = {
    name: "Iridian Ship 4",
    symbol: "4",
    radius: 32,
    color: "#ffe0e0",
    health: new Decimal(150),
    damage: new Decimal(2),
    bodyDamage: new Decimal(1),
    regen: new Decimal(2),
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.9) {
            gain.spaceRock = Decimal.add(1, Math.random()).mul(20)
        } else {
            gain.spaceGem = Decimal.add(1, Math.random()).mul(2)
        }
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(20)
    },
    initialize(celestialite) {
        celestialite.attackCooldown = 120
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
            celestialite.targetingTimer = 60
            celestialite.playerAng = Math.atan2(dy, dx);
        };

        // Attack the player
        if (celestialite.attackCooldown <= 0 && celestialite.targetingTimer > 0) {
            celestialite.moveAng = celestialite.playerAng + (Math.PI * (Math.random() - 0.5))
            arena.bullets.push({
                x: celestialite.x + Math.cos(celestialite.playerAng) * (celestialite.radius),
                y: celestialite.y + Math.sin(celestialite.playerAng) * (celestialite.radius),
                vx: Math.cos(celestialite.playerAng) * 6,
                vy: Math.sin(celestialite.playerAng) * 6,
                life: 600,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                star: true,
                radius: 4,
            });
            celestialite.attackCooldown = 120
        }

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.06
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.06
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.12
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.12
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 60

        celestialite.vx -= Math.cos(celestialite.playerAng) / 4
        celestialite.vy -= Math.sin(celestialite.playerAng) / 4
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
            ctx.shadowColor = "#620680";
            if (!options.performanceMode) {ctx.shadowBlur = 8} else {ctx.shadowBlur = 0};
            ctx.fill();
            ctx.font = "bold 32px monospace";
            ctx.fillStyle = "#620680";
            ctx.textAlign = "center";
            ctx.fillText(celestialite.symbol, wrapped[0], wrapped[1] + 9);
            ctx.restore();
        }
    },
}
