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
        levelScaling: new Decimal(1.08),
        levelScalingStart: new Decimal(0),

        selectedStageStart: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#151230)",
            backgroundOrigin: "border-box",
            borderColor: "#ffffff",
            color: "white",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginRight: "50px !important",
        }
        if (player.subtabs["ir"]["spaceStages"] == "iriditeZone") str.outline = "3px solid #fff"
        return str
    },
    tooltip: "Iridite Zone",
    branches: ["spaceZone2"],
    color: "#ffffff",
    update(delta) {
        player[this.layer].levelScaling = new Decimal(1.08)
        if (hasUpgrade("ir", 23)) player[this.layer].levelScaling = player[this.layer].levelScaling.sub(0.02);
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("pl", 17));
        player[this.layer].levelScaling = player[this.layer].levelScaling.max(1)
        player[this.layer].levelScalingStart = new Decimal(0)
    },
    clickables: {
        "enter": {
            title() {
                let str = "<h2>Enter Iridite Zone"
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
                let look = {width: "350px", minHeight: "75px", color: "white", border: "3px solid white", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "radial-gradient(#151230)" : "#361e1e"
                return look
            },
        },
        "startStage0": {
            title: "0",
            canClick() {return true},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(0)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid white", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#151230)"
                if (player[this.layer].selectedStageStart.eq(0)) look.outline = "3px solid white";
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
                    
                    ["top-column", [
                        ["blank", "10px"],
                        ["style-column", [
                            ["raw-html", "Properties", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ], {width: "350px", height: "35px", borderBottom: "2px solid #5e4ee6", marginBottom: "10px"}],
                        ["raw-html", () => {return Decimal.sub(player[player.subtabs["ir"]["stages"]].levelScaling, player.ir.levelScalingReduction).gt(1) ? "<u>Level Scaling" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return Decimal.sub(player[player.subtabs["ir"]["stages"]].levelScaling, player.ir.levelScalingReduction).gt(1) ? formatSimple(Decimal.sub(player[player.subtabs["ir"]["stages"]].levelScaling, player.ir.levelScalingReduction).max(1).sub(1).mul(100)) + "% starting at " + formatWhole(player[player.subtabs["ir"]["stages"]].levelScalingStart.add(1)) : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "10px"],
                        ["raw-html", "<u>Iridite", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", "Iridite will always be attacking", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
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
    location: "space",
    unlocked() {
        return hasUpgrade("ir", 19)
    },

    primaryColor: "#5e4ee6",
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
    levelUp(level) {
        // || level.eq(2)
        if (level.modulo(1).eq(0)) {
            SB_spawnCelestialite("iridite")
        }
    },
    statMult: new Decimal(4),
    rockMult: new Decimal(3),
    gemMult: new Decimal(1.75),
    xpReqMult: new Decimal(3),
    savePoints: [
        0,
    ],
}

SB_celestialites.iridite = {
    name: "Iridite, the Astral Celestial",
    symbol: "iridite",
    radius: 64,
    color: "#ffffff",
    health: new Decimal(2e5),
    damage: new Decimal(6),
    bodyDamage: new Decimal(0.5),
    regen: new Decimal(20),
    reward() {
        let gain = {}
        let random = Math.random()
        gain.spaceGem = Decimal.add(1, Math.random()).mul(5)
        return gain
    },
    experienceReward() {
        return Decimal.add(2, Math.random()).mul(9)
    },
    initialize(celestialite) {
        screenFlash("— Iridite, the Astral Celestial —", 1200)
        arena.enterFullscreen()
        arena.enemies = []
        arena.bullets = []
        arena.asteroids = []
        arena.xpOrbs = []
        arena.gammaTrails = []
        arena.enemySpawnCooldown = arena.enemySpawnCooldownMax;
        arena.bossActive = true
        player.ir.iriditeFought = true

        // Stat changes
        celestialite.maxHealth = new Decimal(1e5)
        celestialite.health = new Decimal(1e5)
        celestialite.damage = new Decimal(8)
        celestialite.regen = new Decimal(20)

        celestialite.phase = 1
        //celestialite.currentAttack = ['dagger', 'radial', 'shortBurst', 'homing'][Math.floor(Math.random() * 4)];
        celestialite.currentAttack = 'dagger';
        celestialite.attackInitialized = true

        
        celestialite.wingPhase = Math.random() * Math.PI * 2,
        celestialite.attackTimer = 150

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.vMoveAng = 0
        celestialite.dvx = 0.875
        celestialite.dvy = 0.875
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
            let options = ['dagger', 'radial', 'shortBurst', 'homing', 'charge', 'teleport'];
            if (celestialite.phase >= 2) options = options.concat(['radialDagger', 'raining']);
            if (celestialite.phase >= 3) options = options.concat(['giant', 'laser']);
            if (celestialite.phase >= 4) options = options.concat(['laser', 'charge', 'teleport']);
            options.splice(options.indexOf(celestialite.currentAttack), 1)
            celestialite.currentAttack = options[Math.floor(Math.random() * options.length)];
        } else if (celestialite.playerDist < 1200) {
            celestialite.currentAttack = Math.random() < 0.5 ? "charge" : "teleport";
        } else {
            celestialite.currentAttack = "teleport";
        }
        celestialite.attackInitialized = false
    },
    attacks: {
        dagger(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 300
            }
            // Attack
            if ((celestialite.attackTimer / 90) % 1 == 0) {
                if (celestialite.phase >= 3) {
                    for (i = 0; i < 7; i++) {
                        SB_spawnWarning("iriditeDagger", celestialite, {
                            vx: celestialite.vx,
                            vy: celestialite.vy,
                            dvx: 0.875,
                            dvy: 0.875,
                            targetAng: celestialite.playerAng + ((i - 3) * Math.PI / 8)
                        })
                    }
                } else {
                    for (i = 0; i < 5; i++) {
                        SB_spawnWarning("iriditeDagger", celestialite, {
                            vx: celestialite.vx,
                            vy: celestialite.vy,
                            dvx: 0.875,
                            dvy: 0.875,
                            targetAng: celestialite.playerAng + ((i - 2) * Math.PI / 8)
                        })
                    }
                }
            }
        },
        radial(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 150
            }
            // Attack
            if (celestialite.attackTimer == 90 || celestialite.attackTimer == 60 || celestialite.attackTimer == 30 || celestialite.attackTimer == 75 || celestialite.attackTimer == 45) {
                for (i = 0; i < 12; i++) {
                    let ang = celestialite.playerAng + ((i / 12) * Math.PI * 2)
                    SB_spawnProjectile("iriditeDagger", celestialite, null, {
                        vx: Math.cos(ang) * (celestialite.attackTimer / 30 + 3),
                        vy: Math.sin(ang) * (celestialite.attackTimer / 30 + 3),
                        ang: ang,
                        radius: 8,
                    });
                }
            }
        },
        shortBurst(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 120
            }
            // Attack
            if (celestialite.attackTimer == 90 || celestialite.attackTimer == 60 || celestialite.attackTimer == 30 || celestialite.attackTimer == 75 || celestialite.attackTimer == 45) {
                for (i = 0; i < 5; i++) {
                    let ang = celestialite.playerAng + ((i - 2) * Math.PI / 16)
                    SB_spawnProjectile("iriditeDagger", celestialite, null, {
                        vx: Math.cos(ang) * (celestialite.attackTimer / 30 + 3),
                        vy: Math.sin(ang) * (celestialite.attackTimer / 30 + 3),
                        ang: ang,
                        radius: 8,
                    });
                }
            }
        },
        homing(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 150
            }
            // Attack
            if ((celestialite.attackTimer / (12 - celestialite.phase)) % 1 == 0 && celestialite.attackTimer != 150 && celestialite.attackTimer != 0) {
                SB_spawnProjectile("iriditeHoming", celestialite)
            }
        },
        charge(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 150
            }
            // Attack
        },
        teleport(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 60
            }
            // Attack
            if (celestialite.attackTimer == 30) {
                let ang = Math.random() * Math.PI * 2
                let dist = Math.random() * 200 + 400
                celestialite.x = arena.ship.x + dist * Math.cos(ang)
                celestialite.y = arena.ship.y + dist * Math.sin(ang)
            }
        },
        radialDagger(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 90
                for (i = 0; i < 6; i++) {
                    let ang = Math.random() * Math.PI * 2
                    let revAng = (ang + Math.PI * 3) % (Math.PI * 2) - Math.PI
                    let dist = 800 + Math.random() * 400
                    SB_spawnWarning("iriditeDagger", celestialite, {
                        x: arena.ship.x - Math.cos(ang) * dist,
                        y: arena.ship.y - Math.sin(ang) * dist,
                        ang: revAng,
                        targetAng: revAng,
                    })
                }
            }
            // Attack
            // NONE
        },
        raining(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 450
            }
            // Attack
            if ((celestialite.attackTimer / 9) % 1 == 0 && celestialite.attackTimer < 420 && celestialite.attackTimer > 60) {
                SB_spawnProjectile("iriditeRain", celestialite)
            }
        },
        giant(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 300
            }
            // Attack
            if ((celestialite.attackTimer / 90) % 1 == 0) {
                if (celestialite.phase >= 4) {
                    for (i = 0; i < 7; i++) {
                        SB_spawnWarning("iriditeGiant", celestialite, {
                            vx: celestialite.vx,
                            vy: celestialite.vy,
                            dvx: 0.875,
                            dvy: 0.875,
                            targetAng: celestialite.playerAng + ((i - 3) * Math.PI / 8)
                        })
                    }
                } else {
                    for (i = 0; i < 5; i++) {
                        SB_spawnWarning("iriditeGiant", celestialite, {
                            vx: celestialite.vx,
                            vy: celestialite.vy,
                            dvx: 0.875,
                            dvy: 0.875,
                            targetAng: celestialite.playerAng + ((i - 2) * Math.PI / 8)
                        })
                    }
                }
            }
        },
        laser(celestialite) {
            // Initialize attack
            if (!celestialite.attackInitialized) { celestialite.attackInitialized = true;
                celestialite.attackTimer = 150
            }
            // Attack
            if (celestialite.attackTimer < 60) {
                let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
                let bx = closest[0] - celestialite.x;
                let by = closest[1] - celestialite.y;
                let perpDist = Math.abs(bx * (-Math.sin(celestialite.moveAng)) + by * Math.cos(celestialite.moveAng));
                if (celestialite.playerDist < 1600 && perpDist < 16 + arena.ship.radius) {
                    player.ir.shipHealth = player.ir.shipHealth.sub(celestialite.damage.mul(0.1));
                }
            }
        },
    },
    tick(celestialite) {
        celestialite.phase = 5 - celestialite.health.div(celestialite.maxHealth).mul(4).ceil().toNumber()
        celestialite.wingPhase += 0.16 + celestialite.phase * 0.04;
        celestialite.wingPhase %= Math.PI * 2;

        // Get distance/angle to the player
        if (celestialite.currentAttack != "radialDagger") {
            let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
            let dx = closest[0] - celestialite.x;
            let dy = closest[1] - celestialite.y;
            celestialite.playerDist = Math.hypot(dx, dy) || 1;
            celestialite.playerAng = Math.atan2(dy, dx);
        }

        // Decide on a move angle
        if (celestialite.currentAttack == "charge") {
            let angDist = ( (celestialite.playerAng) - celestialite.moveAng + 3 * Math.PI ) % (Math.PI*2) - Math.PI;
            celestialite.moveAng += (angDist < -Math.PI ? angDist + (Math.PI * 2) : angDist) * 0.03125;
            celestialite.moveAng = (celestialite.moveAng + (Math.PI * 3)) % (Math.PI * 2) - Math.PI;
        } else if (celestialite.currentAttack == "laser") {
            if (celestialite.attackTimer > 90) {
                let angDist = ( (celestialite.playerAng) - celestialite.moveAng + 3 * Math.PI ) % (Math.PI*2) - Math.PI;
                celestialite.vMoveAng = Math.max(-Math.PI / 16, Math.min(Math.PI / 16, angDist < -Math.PI ? angDist + (Math.PI * 2) : angDist));
            }
            celestialite.moveAng += celestialite.vMoveAng;
            celestialite.moveAng = (celestialite.moveAng + (Math.PI * 3)) % (Math.PI * 2) - Math.PI;
        } else {
            celestialite.moveAng = celestialite.playerAng;
            celestialite.moveAng = (celestialite.moveAng + (Math.PI * 3)) % (Math.PI * 2) - Math.PI;
        }

        // Decide on an attack
        celestialite.attackTimer--
        if (celestialite.attackTimer <= 0) SB_celestialites[celestialite.type].decideAttack(celestialite);
        if (celestialite.phase == 3 && celestialite.attackTimer % 30 == 1) {
            if (Math.random() < 0.2) SB_spawnProjectile("iriditeRain", celestialite);
        } else if (celestialite.phase == 4 && celestialite.attackTimer % 15 == 1) {
            if (Math.random() < 0.4) SB_spawnProjectile("iriditeRain", celestialite);
        }

        // Move
        if ((celestialite.currentAttack == "dagger" || celestialite.currentAttack == "giant" || celestialite.currentAttack == "laser") && celestialite.attackTimer % 90 > 30) {
            celestialite.ax = 0
            celestialite.ay = 0
        } else if ((celestialite.currentAttack == "radial" || celestialite.currentAttack == "shortBurst") && celestialite.attackTimer > 30) {
            celestialite.ax = 0
            celestialite.ay = 0
        } else if (celestialite.currentAttack == "radialDagger" && celestialite.attackTimer > 30) {
            celestialite.ax = 0
            celestialite.ay = 0
        } else if (celestialite.currentAttack == "raining" && celestialite.attackTimer > 30) {
            celestialite.ax = 0
            celestialite.ay = 0
        } else if (celestialite.currentAttack == "charge") {
            if (celestialite.attackTimer < 120) {
                celestialite.ax = Math.cos(celestialite.moveAng) * (0.6 + celestialite.phase * 0.15) * Math.min(2.5, (celestialite.playerDist + 400) / 400)
                celestialite.ay = Math.sin(celestialite.moveAng) * (0.6 + celestialite.phase * 0.15) * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            } else {
                celestialite.ax = 0
                celestialite.ay = 0
            }
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
        }
        if (celestialite.playerDist > 800) {
            celestialite.ax += Math.cos(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            celestialite.ay += Math.sin(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
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

        player.ir.iriditeDefeated = true
        player.ir.battleXP = player.ir.battleXPReq
    },
    draw: (ctx, celestialite) => {
        if (!arena) return;

        if (celestialite.currentAttack == "laser") {
            if (celestialite.attackTimer < 60) {
                let source = {
                    x: celestialite.x,
                    y: celestialite.y,
                    length: 1600,
                    width: celestialite.attackTimer < 6 ? Math.pow(celestialite.attackTimer / 15, 0.5) * 64 : Math.pow(1 - ((celestialite.attackTimer - 6) / 54), 0.5) * 64,
                    ang: celestialite.moveAng,
                    timer: 1,
                }
                let sourceRef = {
                    postReadyTimer: 1,
                    style(ctx, warning, xy1, xy2) {
                        let g = ctx.createLinearGradient(xy1[0], xy1[1], xy2[0], xy2[1]);
                        g.addColorStop(0, `rgba(200,120,255,${0.12 + 0.28 * (1 - celestialite.attackTimer / 60)})`);
                        g.addColorStop(0.1, `rgba(255,120,180,${0.18 + 0.32 * (1 - celestialite.attackTimer / 60)})`);
                        g.addColorStop(0.6, `rgba(180,255,255,${0.06 + 0.18 * (1 - celestialite.attackTimer / 60)})`);
                        g.addColorStop(1, `rgba(200,120,255,${0.02 + 0.06 * (1 - celestialite.attackTimer / 60)})`);
                        return g
                    },
                }
                arena.drawWrappingLine(source, sourceRef)
                source.width /= 4
                sourceRef.style = (ctx, warning, xy1, xy2) => {
                    return `rgba(255,234,202,${0.75 + 0.25 * (1 - celestialite.attackTimer / 60)})`
                }
                arena.drawWrappingLine(source, sourceRef)
            } else {
                arena.drawWrappingLine({
                    x: celestialite.x,
                    y: celestialite.y,
                    length: 1600,
                    width: Math.pow(1 - (celestialite.attackTimer - 60) / 90, 0.5) * 16,
                    ang: celestialite.moveAng,
                    timer: 1,
                }, {
                    postReadyTimer: 1,
                    style() {
                        if (celestialite.attackTimer < 90) {
                            return "rgb(255, 0, 0, 0.125)"
                        } else {
                            return "rgb(255, 128, 0, " + ((celestialite.attackTimer - 60) / 180) + ")"
                        }
                    },
                })
            }
        }

        let wrapped = arena.getVisibleWrappedCoords([celestialite.x, celestialite.y], [celestialite.radius * 2, celestialite.radius * 2])
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        
        // wing flap drive
        const phase = (celestialite.wingPhase || 0);
        // normalized flap t in [0,1], eased for realistic acceleration/deceleration
        let raw = Math.sin(phase);
        let t = (raw + 1) / 2;
        let ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const r = celestialite.radius;
        // wider spread on upstroke, tighter on downstroke
        const spreadBase = 0.9 + ease * 0.6;
        const tipBend = Math.sin(phase * 1.9) * (0.6 + ease * 0.6);
        // Glow for whole boss
        ctx.shadowColor = "rgba(240,230,255,0.9)";
        if (!options.performanceMode) {ctx.shadowBlur = 30} else {ctx.shadowBlur = 0}
        // wing drawing function; draws a richer, layered feather set (no back/filler blob)
        const drawWing = (mirror = false) => {
            ctx.save();
            if (mirror) ctx.scale(-1, 1);
            // root transform (each wing attached slightly outward)
            ctx.translate(r * 0.56, r * 0.02);
            // base rotation: open/close with flap
            let baseAngle = -0.22 - tipBend * 0.14;
            ctx.rotate(baseAngle);
            // three feather groups: primaries, secondaries, coverts — fuller counts and gradual taper
            const groups = [
                { count: 8, len: r * 1.08, width: r * 0.32, offset: 0.0, light: -8 },
                { count: 7, len: r * 0.82, width: r * 0.26, offset: 0.08, light: -2 },
                { count: 6, len: r * 0.56, width: r * 0.2, offset: 0.16, light: 6 },
                { count: 4, len: r * 0.36, width: r * 0.14, offset: 0.28, light: 10 } // extra small coverts for fullness
            ];
            for (let gi = 0; gi < groups.length; gi++) {
                const g = groups[gi];
                // angular spread for this group
                const groupSpread = (0.72 + gi * 0.18) * (0.9 + ease * 0.15);
                for (let i = 0; i < g.count; i++) {
                    // normalized position along wing span - center is 0
                    let norm = (i / (g.count - 1)) - 0.5;
                    // base position along the wing
                    let bx = r * 0.06 + norm * r * (0.48 - gi * 0.02);
                    let by = r * 0.02 + Math.abs(norm) * r * 0.06 + g.offset * r;
                    // feather angle and variation
                    let featherAngle = norm * groupSpread + tipBend * (0.32 + gi * 0.12);
                    // feather shape
                    let len = g.len * (0.86 + (1 - Math.abs(norm)) * 0.22 - gi * 0.07);
                    let width = g.width * (0.82 - gi * 0.08) * (1 - Math.abs(norm) * 0.5);
                    ctx.save();
                    ctx.translate(bx, by);
                    ctx.rotate(featherAngle);
                    // feather silhouette with slight concave edge for natural look
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.quadraticCurveTo(len * 0.35, -width * 0.6, len * 0.92, -width * 0.08);
                    ctx.lineTo(len * 0.86, width * 0.14);
                    ctx.quadraticCurveTo(len * 0.38, width * 0.6, 0, 0);
                    ctx.closePath();
                    // feather gradient for depth
                    let fg = ctx.createLinearGradient(0, -width, len, width);
                    fg.addColorStop(0, `rgba(${240 + g.light},${236 + g.light},${255 - g.light},0.98)`);
                    fg.addColorStop(0.5, `rgba(${232 + g.light},${226 + g.light},${246 - g.light},0.92)`);
                    fg.addColorStop(1, `rgba(${210 + g.light},${208 + g.light},${232 - g.light},0.86)`);
                    ctx.fillStyle = fg;
                    ctx.fill();
                    // central shaft highlight (subtle)
                    ctx.beginPath();
                    ctx.moveTo(len * 0.08, -width * 0.02);
                    ctx.lineTo(len * 0.72, -width * 0.02);
                    ctx.strokeStyle = "rgba(255,255,255,0.24)";
                    ctx.lineWidth = Math.max(1, r * 0.01);
                    ctx.stroke();
                    ctx.restore();
                }
            }
            // Outer rim/fold to shape the wing edge (thin stroke)
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(r * 0.18, -r * 0.5 * spreadBase, r * 0.95, -r * 0.28 * spreadBase, r * 1.04, -r * 0.04);
            ctx.lineTo(r * 0.92, r * 0.02);
            ctx.bezierCurveTo(r * 0.6, r * 0.42 * spreadBase, r * 0.18, r * 0.46 * spreadBase, 0, r * 0.28);
            ctx.closePath();
            ctx.strokeStyle = "rgba(255,255,255,0.12)";
            ctx.lineWidth = Math.max(1, r * 0.02);
            ctx.stroke();
            ctx.restore();
            ctx.restore();
        };
        // Draw left and right wings (right wing mirrored to avoid vertical inversion)
        drawWing(false); // left-looking (draws to right in local coords)
        drawWing(true);  // mirrored right wing
        // Thin white circle showing hitbox (centered)
        ctx.save();
        ctx.shadowBlur = 0;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.beginPath();
        ctx.arc(0, 0, celestialite.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        // Draw star centered exactly in hitbox: use middle baseline so glyph is vertically centered
        ctx.save();
        if (!options.performanceMode) {ctx.shadowBlur = 36} else {ctx.shadowBlur = 0};
        const fontSize = Math.max(12, Math.floor(celestialite.radius * 1.4));
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; // ensure center vertically
        ctx.fillStyle = "#e0ccffff";
        ctx.fillText("✦", 0, 8); // exact center
        ctx.fillStyle = "rgba(255,255,255," + (0 + (celestialite.phase - 1) * 0.25) + ")";
        ctx.fillText("✦", 0, 8); // exact center
        // subtle stroke for definition
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(240,200,80," + (0.12 + celestialite.phase * 0.06) + ")";
        ctx.strokeText("✦", 0, 8);
        ctx.restore();
        if (celestialite.currentAttack == "teleport") {
            ctx.fillStyle = "rgba(255,255,255," + ((30 - Math.abs(30 - celestialite.attackTimer)) / 30) + ")";
            ctx.beginPath();
            ctx.arc(0, 0, (Math.abs(30 - celestialite.attackTimer) / 30) * 128, 0, Math.PI * 2)
            ctx.fill();
        }
        ctx.restore();
    },
}

SB_celestialites.largeAsteroid = {
    name: "Large Asteroid",
    symbol: "3",
    radius: 50,
    color: "#afafaf",
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
        celestialite.shape = arena.generateConvexPolygon(celestialite.radius, 5 + Math.floor(Math.random() * 3));

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
    damage: new Decimal(3),
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
                life: 300,
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
    damage: new Decimal(3),
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
                vx: Math.cos(celestialite.playerAng) * (1 + Math.random()) * 1.25,
                vy: Math.sin(celestialite.playerAng) * (1 + Math.random()) * 1.25,
                life: 300,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                star: true,
                homing: true,
                homingStrength: 0.025,
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
    damage: new Decimal(3),
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
    radius: 24,
    color: "#ffe0e0",
    health: new Decimal(200),
    damage: new Decimal(5),
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
                life: 240,
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

// PROJECTILES

SB_projectiles.iriditeDagger = {
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
            life: 240,
            initialLife: 240,
            damage: celestialite !== null ? celestialite.damage.mul(2) : new Decimal(24),
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

        let ang = Math.atan2(projectile.vy, projectile.vx || 0);
        ctx.rotate(ang);
        // determine font size; giant projectiles are significantly larger
        let fontSize = projectile.radius * 2;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#d5ccff";
        ctx.shadowColor = "#fff1";
        if (!options.performanceMode) {ctx.shadowBlur = 6} else {ctx.shadowBlur = 0};
        ctx.fillText("✦", 0, 0);
        ctx.restore();
    },
}

SB_projectiles.iriditeHoming = {
    template(celestialite, warning = {}) {
        let ang = Math.random() < 0.5 ? Math.PI / 2 : -Math.PI / 2
        return {
            x: celestialite.x + Math.cos(celestialite.playerAng + ang) * celestialite.radius,
            y: celestialite.y + Math.sin(celestialite.playerAng + ang) * celestialite.radius,
            vx: Math.cos(celestialite.playerAng + ang) * 6,
            vy: Math.sin(celestialite.playerAng + ang) * 6,
            dvx: 1,
            dvy: 1,
            ax: 0,
            ay: 0,
            dax: 1,
            day: 1,
            ang: celestialite.playerAng + ang,
            life: 300,
            damage: celestialite.damage.div(2),
            pierce: 0,
            piercedAsteroids: [],
            fromEnemy: true,
            star: true,
            homing: true,
            homingStrength: 1 / 64,
            radius: 8,
        };
    },
    initialize(projectile) {
    },
    tick(projectile) {
        projectile.homingStrength = projectile.life / 9000
        if (projectile.life < 15) {
            let m = projectile.life / 15
            projectile.radius = m * 4
            projectile.damage = projectile.celestialite ? projectile.celestialite.damage.mul(m) : new Decimal(m * 6)
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

        let ang = Math.atan2(projectile.vy, projectile.vx || 0);
        ctx.rotate(ang);
        // determine font size; giant projectiles are significantly larger
        let fontSize = projectile.radius * 2;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffeecb";
        ctx.shadowColor = "#fff1";
        if (!options.performanceMode) {ctx.shadowBlur = 6} else {ctx.shadowBlur = 0};
        ctx.fillText("✦", 0, 0);
        ctx.restore();
    },
}

SB_projectiles.iriditeRain = {
    template(celestialite, warning) {
        let ang = Math.random() * Math.PI + Math.PI / 2
        let power = Math.random() * 96
        return {
            x: celestialite.x,
            y: celestialite.y,
            vx: Math.cos(celestialite.playerAng + ang) * power,
            vy: Math.sin(celestialite.playerAng + ang) * power,
            dvx: 0.925,
            dvy: 0.925,
            ax: Math.cos(celestialite.playerAng) * 0.75,
            ay: Math.sin(celestialite.playerAng) * 0.75,
            dax: 0.996,
            day: 0.996,
            ang: celestialite.playerAng,
            life: 240,
            damage: celestialite.damage.div(2),
            pierce: 0,
            piercedAsteroids: [],
            fromEnemy: true,
            star: true,
            radius: 8,
        };
    },
    initialize(projectile) {
    },
    tick(projectile) {
        projectile.homingStrength = projectile.life / 9000
        if (projectile.life < 15) {
            let m = projectile.life / 15
            projectile.radius = m * 4
            projectile.damage = projectile.celestialite ? projectile.celestialite.damage.mul(m) : new Decimal(m * 6)
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

        let ang = Math.atan2(projectile.vy, projectile.vx || 0);
        ctx.rotate(ang);
        // determine font size; giant projectiles are significantly larger
        let fontSize = projectile.radius * 2;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#d5ccff";
        ctx.shadowColor = "#fff1";
        if (!options.performanceMode) {ctx.shadowBlur = 6} else {ctx.shadowBlur = 0};
        ctx.fillText("✦", 0, 0);
        ctx.lineWidth = 4
        ctx.strokeStyle = "#8266ff7f"
        ctx.lineJoin = "round"
        ctx.beginPath()
        ctx.moveTo(0, 0);
        if (projectile.life > 225) ctx.lineTo(-Math.sqrt(Math.hypot(projectile.vx, projectile.vy)) * 16, 0);
        ctx.stroke()
        ctx.restore();
    },
}

SB_projectiles.iriditeGiant = {
    template(celestialite, warning) {
        let source = warning !== null ? warning : celestialite
        let ang = warning !== null ? warning.ang : celestialite.playerAng
        let speed = (warning !== null && warning.speed) ? warning.speed : 12
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
            life: 160,
            initialLife: 160,
            damage: celestialite !== null ? celestialite.damage.mul(3) : new Decimal(36),
            pierce: 3,
            radius: 24,
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

        let ang = Math.atan2(projectile.vy, projectile.vx || 0);
        ctx.rotate(ang);
        // determine font size; giant projectiles are significantly larger
        let fontSize = projectile.radius * 2;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffd580";
        ctx.shadowColor = "#fff1";
        if (!options.performanceMode) {ctx.shadowBlur = 6} else {ctx.shadowBlur = 0};
        ctx.fillText("✦", 0, 0);
        ctx.restore();
    },
}


// WARNINGS

SB_warnings.iriditeDagger = {
    readyTimer: 60,
    postReadyTimer: 240,
    length: 1920,
    width: 2,
    fade: true,
    initialize(warning) {
    },
    tick(warning) {
        let angDist = (warning.targetAng - warning.ang) % (Math.PI*2) - Math.PI;
        warning.ang += (angDist < 0 ? angDist + Math.PI : angDist) * 0.125;
        warning.ang = ((warning.ang + 3 * Math.PI) % (Math.PI * 2)) - Math.PI
    },
    onReady(warning) {
        warning.targetAng = warning.ang
        SB_spawnProjectile("iriditeDagger", warning.celestialite, warning);
        arena.warnings.splice(arena.warnings.indexOf(warning), 1)
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
SB_warnings.iriditeGiant = {
    readyTimer: 60,
    postReadyTimer: 160,
    length: 1920,
    width: 2,
    initialize(warning) {
    },
    tick(warning) {
        let angDist = (warning.targetAng - warning.ang) % (Math.PI*2) - Math.PI;
        warning.ang += (angDist < 0 ? angDist + Math.PI : angDist) * 0.125;
        warning.ang = ((warning.ang + 3 * Math.PI) % (Math.PI * 2)) - Math.PI
    },
    onReady(warning) {
        warning.targetAng = warning.ang
        SB_spawnProjectile("iriditeGiant", warning.celestialite, warning);
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