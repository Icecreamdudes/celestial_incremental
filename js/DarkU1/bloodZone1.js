addLayer("bloodZone1", {
    name: "Blood Zone I", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "D1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        zone1Mult: new Decimal(1),

        highestLevel: new Decimal(0),
        LevelStart: new Decimal(0),
        levelScaling: new Decimal(1.15),
        levelScalingStart: new Decimal(20),

        selectedStageStart: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#4f1818, black)",
            backgroundOrigin: "border-box",
            borderColor: "#f57171",
            color: "white",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginRight: "50px !important",
        }
        if (player.subtabs["bl"]["stages"] == "bloodZone1") str.outline = "3px solid #fff"
        return str
    },
    tooltip: "Blood Zone I",
    branches: [],
    color: "#f57171",
    update(delta) {
        player[this.layer].levelScaling = new Decimal(1.15)
        if (hasUpgrade("ir", 23)) player[this.layer].levelScaling = player[this.layer].levelScaling.sub(0.02);
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("pl", 17));
        player[this.layer].levelScaling = player[this.layer].levelScaling.sub(buyableEffect("bl", 16));
        player[this.layer].levelScaling = player[this.layer].levelScaling.max(1)
        player[this.layer].levelScalingStart = new Decimal(20)
    },
    clickables: {
        "enter": {
            title() {
                let str = "<h2>Enter Blood Zone I"
                if (player[this.layer].selectedStageStart.gt(0)) str += "</h2><br>(Level " + formatWhole(player[this.layer].selectedStageStart) + ")";
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
                let look = {width: "350px", minHeight: "75px", color: "white", background: "radial-gradient(#4f1818, black)", border: "3px solid #f57171", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "radial-gradient(#4f1818, black)" : "#361e1e"
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
                let look = {background: "#361e1e", border: "3px solid #f57171", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#4f1818, black)"
                if (player[this.layer].selectedStageStart.eq(0)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage20": {
            title: "20",
            canClick() {return player.bloodZone1.highestLevel.gte(20)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(20)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #f57171", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#4f1818, black)"
                if (player[this.layer].selectedStageStart.eq(20)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage40": {
            title: "40",
            canClick() {return player.bloodZone1.highestLevel.gte(40)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(40)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #f57171", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#4f1818, black)"
                if (player[this.layer].selectedStageStart.eq(40)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage60": {
            title: "60",
            canClick() {return player.bloodZone1.highestLevel.gte(60)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(60)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #f57171", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#4f1818, black)"
                if (player[this.layer].selectedStageStart.eq(60)) look.outline = "3px solid white";
                return look
            },
        },
        "startStage80": {
            title: "80",
            canClick() {return player.bloodZone1.highestLevel.gte(80)},
            unlocked: true,
            onClick() {
                player[this.layer].selectedStageStart = new Decimal(80)
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #f57171", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "106px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (this.canClick()) look.background = "radial-gradient(#4f1818, black)"
                if (player[this.layer].selectedStageStart.eq(80)) look.outline = "3px solid white";
                return look
            },
        },
        "switchSides": {
            title: "X",
            canClick() {return player[this.layer].highestLevel.gte(100)},
            unlocked: true,
            onClick() {
            },
            style() {
                let look = {background: "#361e1e", border: "3px solid #f57171", borderRadius: "42px", color: "white", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black", fontSize: "16px", fontFamily: "monospace", width: "48px", minHeight: "48px", maxHeight: "48px", margin: "0"}
                if (player[this.layer].highestLevel.gte(100)) look.background = "#1a3b0f"
                if (false) look.outline = "3px solid white";
                return look
            },
        },
    },
    milestones: {
        11: {
            requirementDescription: "Level 20",
            effectDescription() { return "Keep blood battle buyables on D1 exit. Unlock something in blood battle upgrades." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(20) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#f57171", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        12: {
            requirementDescription: "Level 40",
            effectDescription() { return "Passively generate 10% of blood gain per second when blood is not being drained." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(40) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#f57171", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        13: {
            requirementDescription: "Level 60",
            effectDescription() { return "Unlock a new ship.<br>[COMING SOON]" },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(60) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#f57171", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        14: {
            requirementDescription: "Level 80",
            effectDescription() { return "Automate blood buyables." },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(80) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#f57171", borderRadius: "10px"}
                if (hasMilestone(this.layer, this.id)) {look.backgroundColor = "#1a3b0f"} else {look.backgroundColor = "#361e1e"}
                return look
            },
        },
        15: {
            requirementDescription: "Level 100",
            effectDescription() { return "???" },
            description() {return ""},
            done() { return player[this.layer].highestLevel.gte(100) },
            style() {
                let look = {width: "350px", minHeight: "75px", color: "white", borderWidth: "3px", borderColor: "#f57171", borderRadius: "10px"}
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
                            ["raw-html", "Blood Zone I", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
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
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "<u>Nox", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", "Nox will begin assisting at 20", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], () => {return {display: hasMilestone("bloodZone1", 11) ? "" : "none !important"}}]
                    ], {width: "397px", height: "210px", background: "#0000007f", borderBottom: "3px solid #f57171"}],

                ], {width: "397px", height: "363px"}],
                ["style-column", [
                    
                ], {width: "403px", height: "363px"}],
            ], {width: "800px", height: "363px"}],
            ["top-column", [
                ["style-row", [
                    ["raw-html", () => {return "Highest Level: " + formatWhole(player[player.subtabs["bl"]["stages"]].highestLevel) + "<span style='font-size:16px'> / " + formatWhole(SB_zones[player.subtabs["bl"]["stages"]].levelLimit) + "</span>"}, {color: "white", textShadow: "0 0 10px white", fontSize: "24px", fontFamily: "monospace"}],
                ], {borderBottom: "3px solid #f57171", width: "800px", height: "50px"}],
                ["style-column", [
                    // TOP MILESTONES
                    ["style-row", [
                        ["titleless-milestone", 11],
                        ["style-row", [], {width: "22px"}],
                        ["titleless-milestone", 13],
                    ]],
                    // TOP CONNECTORS
                    ["style-row", [
                        ["style-row", [], {width: "144.4px"}],
                        ["style-row", [], {background: "#f57171", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#f57171", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                    ]],
                    // DISTANCE LINE
                    ["style-row", [
                        ["clickable", "startStage0"],
                        ["style-row", [], {background: "#f57171", width: "40px", height: "3px"}],
                        ["clickable", "startStage20"],
                        ["style-row", [], {background: "#f57171", width: "40px", height: "3px"}],
                        ["clickable", "startStage40"],
                        ["style-row", [], {background: "#f57171", width: "40px", height: "3px"}],
                        ["clickable", "startStage60"],
                        ["style-row", [], {background: "#f57171", width: "40px", height: "3px"}],
                        ["clickable", "startStage80"],
                        ["style-row", [], {background: "#f57171", width: "40px", height: "3px"}],
                        ["clickable", "switchSides"],
                    ]],
                    // BOTTOM CONNECTORS
                    ["style-row", [
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#f57171", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "288.8px"}],
                        ["style-row", [], {background: "#f57171", width: "3px", height: "22px"}],
                        ["style-row", [], {width: "144.4px"}],
                    ]],
                    // BOTTOM MILESTONES
                    ["style-row", [
                        ["titleless-milestone", 12],
                        ["style-row", [], {width: "22px"}],
                        ["titleless-milestone", 14],
                    ]],
                ], {background: "#0000007f", width: "800px", height: "304px"}],
            ], {width: "800px", height: "357px"}],
        ], {width: "800px", height: "720px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

SB_zones.bloodZone1 = {
    nameCap: "Zone I",
    nameLow: "zone i",
    location: "blood",
    unlocked() {
        return true
    },

    primaryColor: "#f57171",
    secondaryColor: "#4f1818",

    levelLimit: 100,
    asteroidLimit: 0,
    celestialiteSpawnCooldown: 60,
    celestialiteLimit: 12,
    generateCelestialite(level) {
        if (typeof level == "object") level = level.toNumber();
        
        let cel = ["leech", "bloodBat"]
        let cel2 = ["bloodEye", "largeLeech", "largeBloodBat"]
        if (level >= 40) cel = cel.concat(["whiteLeech", "whiteBloodBat"]);
        if (level >= 60) cel2 = cel2.concat(["redBloodEye"]);

        if (Math.random() < player.ir.battleLevel.toNumber() / 200 ) {
            return cel2[Math.floor(Math.random()*cel2.length)]
        } else {
            return cel[Math.floor(Math.random()*cel.length)]
        }
    },
    generateAsteroid(level) {
        return "smallAsteroid";
    },
    levelUp(level) {
    },
    statMult: new Decimal(3),
    rockMult: new Decimal(1),
    gemMult: new Decimal(1),
    xpReqMult: new Decimal(6),
    savePoints: [
        0, 20, 40, 60, 80
    ],
}


SB_celestialites.leech = {
    name: "Leech",
    symbol: "leech",
    radius: 14,
    color: "#7a0000",
    health: new Decimal(150),
    damage: new Decimal(10),
    bodyDamage: new Decimal(1),
    regen: new Decimal(2),
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
        celestialite.wrigglePhase += 0.1;
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
            let speed = celestialite.attachGracePeriod > 0 ? 0.1 : 0.2
            celestialite.ax = Math.cos(celestialite.moveAng) * speed * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            celestialite.ay = Math.sin(celestialite.moveAng) * speed
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.4
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.4
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
            grad.addColorStop(0, celestialite.attached ? '#ff8b8b' : '#7a0000');
            grad.addColorStop(1, '#330000');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(x, y, segR, segR * 0.95, Math.sin(t * Math.PI) * 0.1, 0, Math.PI * 2);
            ctx.fill();
        }
        // head with mouth detail
        ctx.beginPath();
        ctx.ellipse(len / 2, Math.sin(celestialite.wrigglePhase + Math.PI * 1.1) * amp * 0.25, r * 0.95, r * 1.05, 0, 0, Math.PI * 2);
        ctx.fillStyle = celestialite.attached ? '#ff8b8b' : '#8b0000';
        ctx.fill();
        // tiny teeth
        ctx.strokeStyle = '#ffdddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(len / 2 - r * 0.2, -r * 0.05);
        ctx.lineTo(len / 2 + r * 0.1, 0);
        ctx.lineTo(len / 2 - r * 0.2, r * 0.05);
        ctx.stroke();
        ctx.restore();
    },
}

SB_celestialites.bloodBat = {
    name: "Blood Bat",
    symbol: "bloodBat",
    radius: 14,
    color: "#7a0000",
    health: new Decimal(100),
    damage: new Decimal(10),
    bodyDamage: new Decimal(1),
    regen: new Decimal(2),
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
        celestialite.attackCooldown = 120
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
                vx: Math.cos(celestialite.playerAng) * 3,
                vy: Math.sin(celestialite.playerAng) * 3,
                life: 300,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 4,
            });
            celestialite.attackCooldown = 120
            celestialite.preferredDistance = 150 + Math.random() * 150
            celestialite.preferredSpeed = 0.25 + Math.random() * 0.25
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
        let flap = (celestialite.wrigglePhase || 0) * 6;
        // body
        ctx.beginPath();
        ctx.ellipse(0, 0, celestialite.radius * 0.9, celestialite.radius * 0.7, 0, 0, Math.PI * 2);
        let g = ctx.createLinearGradient(-celestialite.radius, -celestialite.radius, celestialite.radius, celestialite.radius);
        g.addColorStop(0, '#8b0019');
        g.addColorStop(1, '#330002');
        ctx.fillStyle = g;
        ctx.fill();
        // wings (left)
        ctx.save();
        ctx.rotate(-0.5 + Math.sin(flap) * 0.25);
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.quadraticCurveTo(-celestialite.radius * 2.2, -celestialite.radius * 0.9, -celestialite.radius * 1.1, -celestialite.radius * 1.5);
        ctx.quadraticCurveTo(-celestialite.radius * 0.4, -celestialite.radius * 0.8, -6, 0);
        ctx.fillStyle = '#4d0006';
        ctx.fill();
        ctx.restore();
        // wings (right)
        ctx.save();
        ctx.rotate(0.5 - Math.sin(flap) * 0.25);
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.quadraticCurveTo(celestialite.radius * 2.2, -celestialite.radius * 0.9, celestialite.radius * 1.1, -celestialite.radius * 1.5);
        ctx.quadraticCurveTo(celestialite.radius * 0.4, -celestialite.radius * 0.8, 6, 0);
        ctx.fillStyle = '#4d0006';
        ctx.fill();
        ctx.restore();
        // face
        ctx.beginPath();
        ctx.fillStyle = '#220000';
        ctx.ellipse(0, -4, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },
}

SB_celestialites.bloodEye = {
    name: "Blood Eye",
    symbol: "bloodEye",
    radius: 32,
    color: "#7a0000",
    health: new Decimal(750),
    damage: new Decimal(20),
    bodyDamage: new Decimal(1),
    regen: new Decimal(2),
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
                arena.bullets.push({
                    x: celestialite.x + Math.cos(ang) * (celestialite.radius),
                    y: celestialite.y + Math.sin(ang) * (celestialite.radius),
                    vx: Math.cos(ang) * 4,
                    vy: Math.sin(ang) * 4,
                    life: 180,
                    damage: celestialite.damage,
                    pierce: 0,
                    piercedAsteroids: [],
                    fromEnemy: true,
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
        ctx.fillStyle = '#ffdcdc';
        ctx.fill();
        // iris
        ctx.beginPath();
        ctx.arc(r * 0.25, 0, r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#6b0000';
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

SB_celestialites.largeLeech = {
    name: "Large Leech",
    symbol: "largeLeech",
    radius: 28,
    color: "#7a0000",
    health: new Decimal(450),
    damage: new Decimal(20),
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
        celestialite.attached = false
        celestialite.attachGracePeriod = 60
        celestialite.attachedTimer = 0

        celestialite.targetingTimer = 0
        celestialite.turnTimer = 600

        celestialite.moveAng = Math.random() * Math.PI * 2
        celestialite.dvx = 0.875
        celestialite.dvy = 0.875
    },
    tick(celestialite) {
        // Decrease timers
        celestialite.wrigglePhase += 0.075;
        celestialite.attachGracePeriod--;
        celestialite.targetingTimer--;
        if (celestialite.targetingTimer > 0) celestialite.turnTimer--;

        // Calculate distance to the player
        let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
        let dx = closest[0] - celestialite.x;
        let dy = closest[1] - celestialite.y;
        celestialite.playerDist = Math.hypot(dx, dy) || 1;

        // Latch onto the player at close range
        if (!celestialite.attached && celestialite.playerDist < 54 && celestialite.attachGracePeriod <= 0) {
            if (Math.hypot(arena.ship.vx, arena.ship.vy) < 8) celestialite.attached = true;
            else celestialite.attachGracePeriod = 6;
        };

        // Reset the targeting cooldown the player if they're close
        if (celestialite.playerDist < 600 && !celestialite.attached) {
            celestialite.targetingTimer = 300
            celestialite.playerAng = Math.atan2(dy, dx);
            celestialite.moveAng = celestialite.playerAng
        };

        // Handle celestialite movement changes
        if (celestialite.targetingTimer > 0) {
            let speed = celestialite.attachGracePeriod > 0 ? 0.1 : 0.2
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.2 * Math.min(2.5, (celestialite.playerDist + 400) / 400)
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.2
        } else {
            celestialite.ax = Math.cos(celestialite.moveAng) * 0.4
            celestialite.ay = Math.sin(celestialite.moveAng) * 0.4
        }
        if (celestialite.turnTimer <= 0) {
            celestialite.moveAng = Math.random() * Math.PI * 2
            celestialite.turnTimer = 600;
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
        if (celestialite.playerDist < 114) {
            celestialite.ax *= 3
            celestialite.ay *= 3
        }
    },
    onAttacked(celestialite, damage, attacker) {
        celestialite.targetingTimer = 300

        celestialite.vx -= Math.cos(celestialite.playerAng) / 8
        celestialite.vy -= Math.sin(celestialite.playerAng) / 8
    },
    onDeath(celestialite) {
        for (let i = 0; i < 2; i++) {
            let spawnAngle = Math.random() * Math.PI * 2
            SB_spawnCelestialite("leech", {
                x: celestialite.x + Math.cos(spawnAngle) * 28,
                y: celestialite.y + Math.sin(spawnAngle) * 28,
                moveAng: celestialite.moveAng,
            })
        }
    },
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
            grad.addColorStop(0, celestialite.attached ? '#ff8b8b' : '#7a0000');
            grad.addColorStop(1, '#330000');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(x, y, segR, segR * 0.95, Math.sin(t * Math.PI) * 0.1, 0, Math.PI * 2);
            ctx.fill();
        }
        // head with mouth detail
        ctx.beginPath();
        ctx.ellipse(len / 2, Math.sin(celestialite.wrigglePhase + Math.PI * 1.1) * amp * 0.125, r * 0.475, r * 0.525, 0, 0, Math.PI * 2);
        ctx.fillStyle = celestialite.attached ? '#ff8b8b' : '#8b0000';
        ctx.fill();
        // tiny teeth
        ctx.strokeStyle = '#ffdddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(len / 2 - r * 0.1, -r * 0.025);
        ctx.lineTo(len / 2 + r * 0.05, 0);
        ctx.lineTo(len / 2 - r * 0.1, r * 0.025);
        ctx.stroke();
        ctx.restore();
    },
}

SB_celestialites.largeBloodBat = {
    name: "Large Blood Bat",
    symbol: "largeBloodBat",
    radius: 28,
    color: "#7a0000",
    health: new Decimal(500),
    damage: new Decimal(20),
    bodyDamage: new Decimal(1),
    regen: new Decimal(2),
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
        celestialite.attackCooldown = 60
        celestialite.turnTimer = 600

        celestialite.preferredDistance = 250 + Math.random() * 100
        celestialite.preferredSpeed = 1

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
                vx: Math.cos(celestialite.playerAng) * 3,
                vy: Math.sin(celestialite.playerAng) * 3,
                life: 300,
                damage: celestialite.damage,
                pierce: 0,
                piercedAsteroids: [],
                fromEnemy: true,
                radius: 8,
            });
            celestialite.attackCooldown = 60
            celestialite.preferredDistance = 150 + Math.random() * 150
            celestialite.preferredSpeed = 0.5 + Math.random() * 0.5
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

        celestialite.vx -= Math.cos(celestialite.playerAng) / 8
        celestialite.vy -= Math.sin(celestialite.playerAng) / 8
    },
    onDeath(celestialite) {
        for (let i = 0; i < 2; i++) {
            let spawnAngle = Math.random() * Math.PI * 2
            SB_spawnCelestialite("bloodBat", {
                x: celestialite.x + Math.cos(spawnAngle) * 28,
                y: celestialite.y + Math.sin(spawnAngle) * 28,
                moveAng: celestialite.moveAng,
            })
        }
    },
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
        g.addColorStop(0, '#8b0019');
        g.addColorStop(1, '#330002');
        ctx.fillStyle = g;
        ctx.fill();
        // wings (left)
        ctx.save();
        ctx.rotate(-0.5 + Math.sin(flap) * 0.25);
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.quadraticCurveTo(-celestialite.radius * 2.2, -celestialite.radius * 0.9, -celestialite.radius * 1.1, -celestialite.radius * 1.5);
        ctx.quadraticCurveTo(-celestialite.radius * 0.4, -celestialite.radius * 0.8, -6, 0);
        ctx.fillStyle = '#4d0006';
        ctx.fill();
        ctx.restore();
        // wings (right)
        ctx.save();
        ctx.rotate(0.5 - Math.sin(flap) * 0.25);
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.quadraticCurveTo(celestialite.radius * 2.2, -celestialite.radius * 0.9, celestialite.radius * 1.1, -celestialite.radius * 1.5);
        ctx.quadraticCurveTo(celestialite.radius * 0.4, -celestialite.radius * 0.8, 6, 0);
        ctx.fillStyle = '#4d0006';
        ctx.fill();
        ctx.restore();
        // face
        ctx.beginPath();
        ctx.fillStyle = '#220000';
        ctx.ellipse(0, -4, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },
}
