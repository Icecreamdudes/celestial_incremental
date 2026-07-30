let arena = null; // Global arena instance

// Restore arena on refresh if needed
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('arenaActive') === 'true') {
        arena = new SpaceArena(800, 600);
        arena.spawnArena();
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Upgrade definitions
const UPGRADE_POOL = {
    // Common
    attackDamageCommon: {
        name() { return "Attack Damage"},
        description() { return "+10% attack damage"},
        rarity: "common",
        effect(arena) { arena.upgrades.attackDamageCommon++; }
    },
    spaceRockGainCommon: {
        name() { return "Space Rock Gain"},
        description() { return "+10% space rock gain"},
        rarity: "common",
        effect(arena) { arena.upgrades.spaceRockGainCommon++; }
    },
    xpGainCommon: {
        name() { return "XP Gain"},
        description() { return "+10% XP gain"},
        rarity: "common",
        effect(arena) { arena.upgrades.xpGainCommon++; }
    },
    // Uncommon
    attackDamageUncommon: {
        name() { return "Attack Damage"},
        description() { return "+15% attack damage"},
        rarity: "uncommon",
        effect(arena) { arena.upgrades.attackDamageUncommon++; }
    },
    attackSpeedUncommon: {
        name() { return "Attack Speed"},
        description() { return "+5% faster attack speed"},
        rarity: "uncommon",
        effect(arena) { arena.upgrades.attackSpeedUncommon++; }
    },
    healthRegenUncommon: {
        name() { return "Health Regen"},
        description() {
            let regen = 0.5
            regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
            return "+" + formatSimple(regen, 2) + " HP/sec"
        },
        rarity: "uncommon",
        effect(arena) {
            arena.upgrades.healthRegenUncommon++;
        }
    },
    spaceRockGainUncommon: {
        name() { return "Space Rock Gain"},
        description() { return "+15% space rock gain"},
        rarity: "uncommon",
        effect(arena) { arena.upgrades.spaceRockGainUncommon++; }
    },
    xpGainUncommon: {
        name() { return "XP Gain"},
        description() { return "+15% XP gain"},
        rarity: "uncommon",
        effect(arena) { arena.upgrades.xpGainUncommon++; }
    },
    attackDamageRare: {
        name() { return "Attack Damage"},
        description() { return "+20% attack damage"},
        rarity: "rare",
        effect(arena) { arena.upgrades.attackDamageRare++; }
    },
    attackSpeedRare: {
        name() { return "Attack Speed"},
        description() { return "+7.5% faster attack speed"},
        rarity: "rare",
        effect(arena) { arena.upgrades.attackSpeedRare++; }
    },
    healthRegenRare: {
        name() { return "Health Regen"},
        description() {
            let regen = 0.75
            regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
            return "+" + formatSimple(regen, 2) + " HP/sec"
        },
        rarity: "rare",
        effect(arena) {
            arena.upgrades.healthRegenRare++;
        }
    },
    damageReductionRare: {
        name() { return "Defense"},
        description() { return "Take 10% less damage"},
        rarity: "rare",
        effect(arena) { arena.upgrades.damageReductionRare++; }
    },
    moveSpeedRare: {
        name() { return "Movement Speed"},
        description() { return "+10% max movement speed"},
        rarity: "rare",
        effect(arena) { arena.upgrades.moveSpeedRare++; }
    },
    spaceRockGainRare: {
        name() { return "Space Rock Gain"},
        description() { return "+20% space rock gain"},
        rarity: "rare",
        effect(arena) { arena.upgrades.spaceRockGainRare++; }
    },
    spaceGemGainRare: {
        name() { return "Space Gem Gain"},
        description() { return "+5% space gem gain"},
        rarity: "rare",
        effect(arena) { arena.upgrades.spaceGemGainRare++; }
    },
    bulletSizeRare: {
        name() {if (player.ir.shipType != 3 && player.ir.shipType != 7 && player.ir.shipType != 8) {return "Bullet Size"} else {return "Max Health"}},
        description() {if (player.ir.shipType != 3 && player.ir.shipType != 7 && player.ir.shipType != 8) {return "+10% bullet size"} else {return "+10% max HP"}},
        rarity: "rare",
        effect(arena) {arena.upgrades.bulletSizeRare++; }
    },
    xpGainRare: {
        name() { return "XP Gain"},
        description() { return "+20% XP gain"},
        rarity: "rare",
        effect(arena) { arena.upgrades.xpGainRare++; }
    },
    attackEpic: {
        name() { return "Attack"},
        description() { return "+20% attack damage, +7.5% faster attack speed"},
        rarity: "epic",
        effect(arena) { arena.upgrades.attackEpic++; }
    },
    xpGainEpic: {
        name() { return "XP Gain"},
        description() { return "+30% XP gain"},
        rarity: "epic",
        effect(arena) { arena.upgrades.xpGainEpic++; }
    },
    lootGainEpic: {
        name() { return "Loot Gain"},
        description() { return "+20% rock gain, +5% space gem gain"},
        rarity: "epic",
        effect(arena) { arena.upgrades.lootGainEpic++; }
    },
    defenseEpic: {
        name() { return "Defense"},
        description() {
            let regen = 0.5
            regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
            return "Take 15% less damage, +" + formatSimple(regen, 2) + " HP/sec"
        },
        rarity: "epic",
        effect(arena) { arena.upgrades.defenseEpic++; }
    },
    attackLegendary: {
        name() { return "Attack"},
        description() { return "+75% attack damage, but +25% slower attack speed"},
        rarity: "legendary",
        effect(arena) { arena.upgrades.attackLegendary++; }
    },
    dropGainLegendary: {
        name() { return "Drop Gain"},
        description() { return "+40% space rock and XP gain, +20% space gem gain"},
        rarity: "legendary",
        effect(arena) { arena.upgrades.dropGainLegendary++; }
    },
    defenseLegendary: {
        name() { return "Defense"},
        description() { return "Take 25% less damage, gain 25% more HP/sec" },
        rarity: "legendary",
        effect(arena) { arena.upgrades.defenseLegendary++; }
    },
    moveSpeedLegendary: {
        name() { return "Movement Speed"},
        description() { return "+25% max movement speed"},
        rarity: "legendary",
        effect(arena) { arena.upgrades.moveSpeedLegendary++; }
    },

    // SPACE

    spaceRockGainCommon: {
        name() { return "Space Rock Gain"},
        description() { return "+10% space rock gain"},
        rarity: "common",
        pool: "space",
        effect(arena) { arena.upgrades.spaceRockGainCommon++; }
    },
    spaceRockGainUncommon: {
        name() { return "Space Rock Gain"},
        description() { return "+15% space rock gain"},
        rarity: "uncommon",
        pool: "space",
        effect(arena) { arena.upgrades.spaceRockGainUncommon++; }
    },
    spaceRockGainRare: {
        name() { return "Space Rock Gain"},
        description() { return "+20% space rock gain"},
        rarity: "rare",
        pool: "space",
        effect(arena) { arena.upgrades.spaceRockGainRare++; }
    },
    spaceGemGainRare: {
        name() { return "Space Gem Gain"},
        description() { return "+5% space gem gain"},
        rarity: "rare",
        pool: "space",
        effect(arena) { arena.upgrades.spaceGemGainRare++; }
    },
    lootGainEpic: {
        name() { return "Loot Gain"},
        description() { return "+20% rock gain, +5% space gem gain"},
        rarity: "epic",
        pool: "space",
        effect(arena) { arena.upgrades.lootGainEpic++; }
    },
    dropGainLegendary: {
        name() { return "Drop Gain"},
        description() { return "+40% space rock and XP gain, +20% space gem gain"},
        rarity: "legendary",
        pool: "space",
        effect(arena) { arena.upgrades.dropGainLegendary++; }
    },

    // BLOOD

    bloodStoneGainCommon: {
        name() { return "Blood Stone Gain"},
        description() { return "+10% blood stone gain"},
        rarity: "common",
        pool: "blood",
        effect(arena) { arena.upgrades.bloodStoneGainCommon++; }
    },
    bloodStoneGainUncommon: {
        name() { return "Blood Stone Gain"},
        description() { return "+15% blood stone gain"},
        rarity: "uncommon",
        pool: "blood",
        effect(arena) { arena.upgrades.bloodStoneGainUncommon++; }
    },
    bloodStoneGainRare: {
        name() { return "Blood Stone Gain"},
        description() { return "+20% blood stone gain"},
        rarity: "rare",
        pool: "blood",
        effect(arena) { arena.upgrades.bloodStoneGainRare++; }
    },
    bloodGemGainRare: {
        name() { return "Blood Gem Gain"},
        description() { return "+5% blood gem gain"},
        rarity: "rare",
        pool: "blood",
        effect(arena) { arena.upgrades.bloodGemGainRare++; }
    },
    bloodLootGainEpic: {
        name() { return "Blood Loot Gain"},
        description() { return "+20% blood stone gain, +5% blood gem gain"},
        rarity: "epic",
        pool: "blood",
        effect(arena) { arena.upgrades.bloodLootGainEpic++; }
    },
    bloodLootGainLegendary: {
        name() { return "Blood Loot Gain"},
        description() { return "+40% blood stone gain, +20% blood gem gain"},
        rarity: "legendary",
        pool: "blood",
        effect(arena) { arena.upgrades.bloodLootGainLegendary++; }
    },
};

const UPGRADE_RARITIES = {
    common: {
        weight() {
            let base = 80
            return base
        },
        color: "#fff",
    },
    uncommon: {
        weight() {
            let base = this.enhanced ? 60 : 40;
            return base
        },
        color: "#4cff4c",
    },
    rare: {
        weight() {
            let base = this.enhanced ? 40 : 20;
            return base
        },
        color: "#4c8cff",
    },
    epic: {
        weight() {
            let base = this.enhanced ? 20 : 10;
            return base
        },
        color: "#b44cff",
    },
    legendary: {
        weight() {
            let base = this.enhanced ? 4 : 1;
            return base
        },
        color: "#ffd34d",
    },
};

const SHIP_STAT_FORMATTING = {
    attackDamage: {
        name: "Attack Damage",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return true},
    },
    attackSpeed: {
        name: "Attack Speed",
        valuePrefix: "x",
        valueSuffix: "",
        showCondition() {return true},
    },
    bulletSize: {
        name: "Bullet Size",
        valuePrefix: "x",
        valueSuffix: "",
        showCondition() {return true},
    },
    healthRegen: {
        name: "Health Regen",
        valuePrefix: "+",
        valueSuffix: "/s",
        showCondition() {return true},
    },
    damageReduction: {
        name: "Damage Reduction",
        valuePrefix: "/",
        valueSuffix: "",
        showCondition() {return true},
    },
    maxHp: {
        name: "Max Health",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return true},
    },
    moveSpeed: {
        name: "Movement Speed",
        valuePrefix: "x",
        valueSuffix: "",
        showCondition() {return true},
    },
    spaceRockGain: {
        name: "Space Rock Gain",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return player.tab == "ir"},
    },
    spaceGemGain: {
        name: "Space Gem Gain",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return player.tab == "ir"},
    },
    bloodStoneGain: {
        name: "Blood Stone Gain",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return player.tab == "bl"},
    },
    bloodGemGain: {
        name: "Blood Gem Gain",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return player.tab == "bl"},
    },
    xpGain: {
        name: "XP Gain",
        valuePrefix: "x",
        valueSuffix: "",
        showCondition() {return true},
    },
}

function pickUpgrades(enhanced = false) {
    let possibleUpgrades = {}
    let totalChance = 0;
    // Build Rarity Table
    for (let id of Object.keys(UPGRADE_RARITIES)) {
        possibleUpgrades[id] = []
        totalChance += UPGRADE_RARITIES[id].weight()
    }
    // Build Upgrade Table
    for (let id of Object.keys(UPGRADE_POOL)) {
        let upg = UPGRADE_POOL[id]
        if (possibleUpgrades[upg.rarity]) {
            switch (upg.pool) {
                case "space": {
                    if (player.tab == "ir") possibleUpgrades[upg.rarity].push(id);
                break; }
                case "blood": {
                    if (player.tab == "bl") possibleUpgrades[upg.rarity].push(id);
                break; }
                default : {
                    possibleUpgrades[upg.rarity].push(id);
                break; }
            }
        };
    }
    // Select Upgrades
    let chosen = [];
    while (chosen.length < 3) {
        for (let id of Object.keys(UPGRADE_RARITIES)) {
            if (totalChance * Math.random() < UPGRADE_RARITIES[id].weight()) {
                let index = Math.floor(possibleUpgrades[id].length * Math.random())
                chosen.push(possibleUpgrades[id][index])
                possibleUpgrades[id].splice(index, 1)
                break;
            } else totalChance -= UPGRADE_RARITIES[id].weight();
        }
    }
    return chosen;
}

class SpaceArena {
    /*
        Check if coordinates are visible on screen:
            - If true, then return coords with no changes.
            - If false, then screen-wrap the coords.
            - If true, then return screen-wrapped coords.
            - If false, then return null.
    */
    getVisibleWrappedCoords(xy, wh) {
        let coordX = xy[0]
        let coordY = xy[1]
        let shipX = this.ship.x
        let shipY = this.ship.y
        let maxDistX = (this.canvasWidth + wh[0]) / 2
        let maxDistY = (this.canvasHeight + wh[1]) / 2
        if (shipX > this.width - maxDistX && coordX < shipX + maxDistX - this.width) coordX += this.width;
        else if (coordX > this.width - maxDistX && shipX < coordX + maxDistX - this.width) coordX -= this.width;
        if (shipY > this.height - maxDistY && coordY < shipY + maxDistY - this.height) coordY += this.height;
        else if (coordY > this.height - maxDistY && shipY < coordY + maxDistY - this.height) coordY -= this.height;
        if (Math.abs(coordX - shipX) - (wh[0] / 2) <= (this.canvasWidth / 2) && Math.abs(coordY - shipY) - (wh[1] / 2) <= (this.canvasHeight / 2)) return [coordX, coordY];
        else return null;
    }
    getWrappedCoords(xy) {
        let coordX = xy[0]
        let coordY = xy[1]
        let shipX = this.ship.x
        let shipY = this.ship.y
        let maxDistX = this.canvasWidth / 2
        let maxDistY = this.canvasHeight / 2
        if (shipX > this.width - maxDistX && coordX < shipX + maxDistX - this.width) coordX += this.width;
        else if (coordX > this.width - maxDistX && shipX < coordX + maxDistX - this.width) coordX -= this.width;
        if (shipY > this.height - maxDistY && coordY < shipY + maxDistY - this.height) coordY += this.height;
        else if (coordY > this.height - maxDistY && shipY < coordY + maxDistY - this.height) coordY -= this.height;
        return [coordX, coordY];
    }
    /*
        Get the ship coords closest to the provided point:
        - Don't make changes if distance to ship is less than half the arena dimension.
        - ship - coord > 0 : ship, edge, coord -> coord, edge, ship.
        - NOT ship - coord > 0 : coord, edge, ship -> ship, edge, coord.
    */
    getClosestCoords(xy1, xy2 = [this.ship.x, this.ship.y]) {
        let coordX1 = xy1[0]
        let coordY1 = xy1[1]
        let coordX2 = xy2[0]
        let coordY2 = xy2[1]
        if (Math.abs(coordX2 - coordX1) > this.width / 2) coordX2 += (coordX2 - coordX1 > 0 ? -this.width : this.width);
        if (Math.abs(coordY2 - coordY1) > this.height / 2) coordY2 += (coordY2 - coordY1 > 0 ? -this.height : this.height);
        return [coordX2, coordY2];
    }
    drawMinimapIcon(color, diameter, xy) {
        this.ctx.fillStyle = color
        let aspectRatio = this.width / this.height
        let wrapped = this.getWrappedCoords([xy[0], xy[1]])
        if (aspectRatio < 1) {
            this.ctx.fillRect(
                (160 * aspectRatio * ((((xy[0] - this.ship.x + this.width / 2) % this.width + this.width) % this.width) / this.width)) + (80 * (1 - aspectRatio)) + (20 - (diameter / 2)),
                (160 * ((((xy[1] - this.ship.y + this.height / 2) % this.height + this.height) % this.height) / this.height)) + (20 - (diameter / 2)),
                diameter, diameter
            );
        } else {
            this.ctx.fillRect(
                (160 * ((((xy[0] - this.ship.x + this.width / 2) % this.width + this.width) % this.width) / this.width)) + (20 - (diameter / 2)),
                (160 * (1 / aspectRatio) * ((((xy[1] - this.ship.y + this.height / 2) % this.height + this.height) % this.height) / this.height)) + (80 * (1 - (1 / aspectRatio))) + (20 - (diameter / 2)),
                diameter, diameter
            );
        }
    }

    // Expand the arena to cover the entire screen and make it transparent
    enterFullscreen() {
        if (!this.arenaDiv || this._fullscreen) return;
        this._fullscreen = true;

        // Save previous styles and sizes so we can restore later
        this._prevArenaStyle = {
            left: this.arenaDiv.style.left,
            top: this.arenaDiv.style.top,
            transform: this.arenaDiv.style.transform,
            width: this.width,
            height: this.height,
            backgroundImage: this.arenaDiv.style.backgroundImage,
            border: this.arenaDiv.style.border,
            overflow: this.arenaDiv.style.overflow,
            zIndex: this.arenaDiv.style.zIndex,
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight,
        };
        this._prevWidth = this.width;
        this._prevHeight = this.height;

        // Apply fullscreen & transparent styles
        Object.assign(this.arenaDiv.style, {
            left: '0px',
            top: '103px',
            transform: 'none',
            width: 'calc(100vw - 6px)',
            height: 'calc(100vh - 276px)',
            backgroundImage: this._prevArenaStyle.backgroundImage,
            border: '3px solid ' + SB_zones[player.ir.battleStage].primaryColor,
            overflow: 'hidden',
            zIndex: 10000
        });
        this.canvasWidth = Math.min(3200, window.innerWidth) - 6
        this.canvasHeight = Math.min(3200, window.innerHeight) - 276

        // Resize canvas and internal dimensions to match window
        if (this.canvas) {
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
        }

        // Re-center player ship (keeps player visually centered)
        if (this.ship) {
            this.ship.x = this.width / 2;
            this.ship.y = this.height / 2;
        }

        // Keep the canvas sized during window resize while in fullscreen boss mode
        this._onWindowResize = () => {
            if (!this._fullscreen) return;
            this.canvasWidth = Math.min(3200, window.innerWidth) - 6
            this.canvasHeight = Math.min(3200, window.innerHeight) - 276
            if (this.canvas) {
                this.canvas.width = this.canvasWidth;
                this.canvas.height = this.canvasHeight;
            }
        };

        window.addEventListener('resize', this._onWindowResize);
    }

    // Restore the arena to its previous size/style
    exitFullscreen() {
        if (!this.arenaDiv || !this._fullscreen) return;
        this._fullscreen = false;

        const s = this._prevArenaStyle || {};
        Object.assign(this.arenaDiv.style, {
            left: s.left || '50%',
            top: s.top || '50%',
            transform: s.transform || 'translate(-50%, -50%)',
            backgroundImage: s.backgroundImage || 'url(resources/ui/spaceBattle/iriditeZone.png)',
            border: s.border || '3px solid #fff',
            overflow: s.overflow || 'hidden',
            zIndex: s.zIndex || 9999
        });
        this.width = this._prevArenaStyle.width
        this.height = this._prevArenaStyle.height
        this.canvasWidth = this._prevArenaStyle.canvasWidth
        this.canvasHeight = this._prevArenaStyle.canvasHeight

        // Restore canvas size and internal dimensions
        if (this.canvas) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }

        // Re-center player ship
        if (this.ship) {
            this.ship.x = this.width / 2;
            this.ship.y = this.height / 2;
        }

        if (this._onWindowResize) {
            window.removeEventListener('resize', this._onWindowResize);
            this._onWindowResize = null;
        }
    }
    constructor(canvasWidth, canvasHeight, arenaWidth, arenaHeight) {
        this.width = arenaWidth;
        this.height = arenaHeight;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.arenaDiv = null;

        // load wing GIF for Iridite (200x200). keep a loaded flag so draw can choose fallback.
        this.wingImg = new Image();
       // this.wingImg.src = 'resources/flying.gif';
        this.wingImgLoaded = false;
        this.wingImg.onload = () => { this.wingImgLoaded = true; };

        // ...existing code...

        // Ship types
        if (player.ir.shipType == 1) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                angle: 0,
                velocity: 0,
                angularVelocity: 0,
                maxVelocity: 6,
                acceleration: 0.3,
                deceleration: 0.15,
                rotationSpeed: 0.06,
                cooldown: 120,
                lastShot: 0,
                damage: 7,
                collisionDamage: 5,
            };
        }
        // hit invulnerability timer in milliseconds (prevents >3 hits/sec)
        this.shipHitInvuln = 0;
        if (player.ir.shipType == 2) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                angle: 0,
                velocity: 0,
                angularVelocity: 0,
                maxVelocity: 4,
                acceleration: 0.2,
                deceleration: 0.15,
                rotationSpeed: 0.04,
                cooldown: 500,
                lastShot: 0,
                damage: 25,
                collisionDamage: 10,
            };
        }
        if (player.ir.shipType == 3) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                vx: 0,
                vy: 0,
                radius: 30,
                gravity: 0.5,
                bounce: 0.8,
                bounceTarget: null,
                bouncing: false,
                bounceFrames: 0,
                maxVelocity: 10,
                collisionDamage: 10,
            };
            this.lastBounceClick = Date.now() - 1500;
            this.bounceCooldown = 2000; // 2 seconds in ms
            this.canvasClickListener = (e) => {
                let now = Date.now();
                this.bounceCooldown = 2000 * this.shipStats.attackSpeed
                if (now - this.lastBounceClick < this.bounceCooldown) return;
                this.lastBounceClick = now;
                let rect = this.canvas.getBoundingClientRect();
                let mx = e.clientX - rect.left;
                let my = e.clientY - rect.top;
                this.ship.bounceTarget = { x: mx, y: my };
            };
        }
        if (player.ir.shipType == 4) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                angle: 0,
                velocity: 0,
                angularVelocity: 0,
                maxVelocity: 4.5,
                acceleration: 0.25,
                deceleration: 0.15,
                rotationSpeed: 0.065,
                cooldown: 250,
                lastShot: 0,
                damage: 12,
                collisionDamage: 5,
            };
        }
        if (player.ir.shipType == 5) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                angle: 0,
                vx: 0,
                vy: 0,
                velocity: 0,
                angularVelocity: 0,
                radius: 12,
                maxVelocity: 5,
                acceleration: 0.95, // used for omnidirectional thrust
                deceleration: 0.12,
                rotationSpeed: 0.08,
                cooldown: 250,
                lastShot: 0,
                damage: 3,
                collisionDamage: 0.1,
            };
        }
        if (player.ir.shipType == 6) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                angle: 0,
                vx: 0,
                vy: 0,
                velocity: 0,
                angularVelocity: 0,
                radius: 12,
                maxVelocity: 3,
                acceleration: 0.35,
                deceleration: 0.12,
                rotationSpeed: 0.02,
                cooldown: 50,
                lastShot: 0,
                damage: 4,
                collisionDamage: 5,
            };
        }
        if (player.ir.shipType == 7) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                vx: 0,
                vy: 0,
                radius: 20,
                angle: 0,
                deceleration: 0.98,
                dash: 0.8,
                dashTarget: null,
                dashing: false,
                dashFrames: 0,
                maxVelocity: 10,
                collisionDamage: 10,
            };
            this.lastDashClick = Date.now() - 500;
            this.dashCooldown = 1000; // 1 second in ms
            this.canvasClickListener = (e) => {
                let now = Date.now();
                this.dashCooldown = 1000 * this.shipStats.attackSpeed
                if (now - this.lastDashClick < this.dashCooldown) return;
                this.lastDashClick = now;
                let rect = this.canvas.getBoundingClientRect();
                let mx = e.clientX + this.ship.x - (canvasWidth / 2) - rect.left;
                let my = e.clientY + this.ship.y - (canvasHeight / 2) - rect.top;
                this.ship.dashTarget = { x: mx, y: my };
            };
        }
        if (player.ir.shipType == 8) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                angle: 0,
                velocity: 0,
                angularVelocity: 0,
                maxVelocity: 6,
                acceleration: 0.3,
                deceleration: 0.15,
                rotationSpeed: 0.06,
                cooldown: 300,
                lastShot: 0,
                damage: 7,
                collisionDamage: 5,
                wingPhase: Math.random() * Math.PI * 2,
                _laserTimer: 0,
                _laserActive: false,
                _laserAngle: 0,
                _laserLength: 0,
                _laserSpin: 0.006,
                _laserHitCooldown: 0,
            };
        }
        if (player.ir.shipType == 9) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                angle: 0,
                velocity: 0,
                angularVelocity: 0,
                maxVelocity: 4,
                acceleration: 0.25,
                deceleration: 0.2,
                rotationSpeed: 0.06,
                cooldown: 500,
                lastShot: 0,
                damage: 40,
                collisionDamage: 0.1,
            };
        }
        if (player.ir.shipType == 10) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                angle: 0,
                velocity: 0,
                angularVelocity: 0,
                maxVelocity: 5,
                acceleration: 0.25,
                deceleration: 0.2,
                rotationSpeed: 0.02,
                cooldown: 5000,
                lastShot: 0,
                damage: 600,
                collisionDamage: 15,
            };
            this.awaitingShotCharge = false
            this.shotChargeTimer = 0
        }
        if (player.ir.shipType == 0) {
            this.ship = {
                x: arenaWidth / 2,
                y: arenaHeight / 2,
                angle: 0,
                velocity: 0,
                angularVelocity: 0,
                maxVelocity: 6,
                acceleration: 0.3,
                deceleration: 0.15,
                rotationSpeed: 0.1,
                cooldown: 120,
                lastShot: 0,
                damage: 5,
                collisionDamage: 5,
            };
        }

        this.bullets = [];
        this.asteroids = [];
        this.xpOrbs = [];
        this.keys = {};
        this.pointerDown = false;
        this.running = false;
        this.loop = null;
        this.asteroidSpawnTimer = 0;
        this.maxAsteroids = 16;
        this.lootFlashes = [];
        this.warnings = [];
        this.upgradeChoices = [];
        this.selectedUpgradeIndex = null;
        this.upgrades = this.getDefaultUpgrades();
        this.shipStats = this.getDefaultShipStats();
        this.resourceMult = 1;

        this.noxSpearCooldown = 90;

        // Enemy system
        this.enemies = [];
        this.enemyTypes = {
            // Miniboss: UFO
            ufoBoss: {
                name: "UFO Miniboss",
                radius: 48,
                color: "#7fffd4",
                healthMin: 4000,
                healthMax: 4000,
                damage: 20,
                speed: 1.2,
                wanderSpeed: 1.2,
                wanderChange: 0.02,
                bulletSpeed: 8,
                bulletCooldown: 60,
                rockDrop: [50, 80],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                    ctx.translate(enemy.x, enemy.y);
                    // UFO body
                    ctx.beginPath();
                    ctx.ellipse(0, 0, enemy.radius, enemy.radius * 0.5, 0, 0, Math.PI * 2);
                    ctx.fillStyle = enemy.color;
                    ctx.shadowColor = "#9fffd4";
                    if (!options.performanceMode) {ctx.shadowBlur = 18} else {ctx.shadowBlur = 0};
                    ctx.fill();
                    // Dome
                    ctx.beginPath();
                    ctx.ellipse(0, -10, enemy.radius * 0.6, enemy.radius * 0.35, 0, Math.PI, 2 * Math.PI);
                    ctx.fillStyle = "#d7ffff";
                    ctx.fill();
                    // Lights
                    for (let i = -3; i <= 3; i++) {
                        ctx.beginPath();
                        let lx = (i / 3) * (enemy.radius * 0.9);
                        ctx.arc(lx, 6, 4, 0, Math.PI * 2);
                        ctx.fillStyle = i % 2 === 0 ? "#ffd166" : "#89ffb4";
                        ctx.fill();
                    }
                    ctx.restore();
                }
            },
            iriditeBoss: {
                name: "Iridite, the Astral Celestial",
                radius: 64,
                color: "#f3e8ffff",
                healthMin: 50000,
                healthMax: 50000,
                damage: 6,
                speed: 0.8,
                wanderSpeed: 0.8,
                wanderChange: 0.01,
                bulletSpeed: 10,
                bulletCooldown: 40,
                rockDrop: [250, 450],
                draw: (ctx, enemy) => {
                    let wrapped = this.getVisibleWrappedCoords([enemy.x, enemy.y], [enemy.radius * 2, enemy.radius * 2])
                    if (wrapped) {

                        ctx.save();
                        ctx.translate(wrapped[0], wrapped[1]);
                        ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);

                        // wing flap drive
                        const phase = (enemy.wingPhase || 0);
                        // normalized flap t in [0,1], eased for realistic acceleration/deceleration
                        let raw = Math.sin(phase);
                        let t = (raw + 1) / 2;
                        let ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

                        const r = enemy.radius;
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
                        ctx.arc(0, 0, enemy.radius, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.restore();

                        // Draw star centered exactly in hitbox: use middle baseline so glyph is vertically centered
                        ctx.save();
                        if (!options.performanceMode) {ctx.shadowBlur = 36} else {ctx.shadowBlur = 0};
                        const fontSize = Math.max(12, Math.floor(enemy.radius * 1.4));
                        ctx.font = `${fontSize}px monospace`;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle"; // ensure center vertically
                        ctx.fillStyle = "#e0ccffff";
                        ctx.fillText("✦", 0, 8); // exact center
                        // subtle stroke for definition
                        ctx.lineWidth = 4;
                        ctx.strokeStyle = "rgba(240,200,80,0.12)";
                        ctx.strokeText("✦", 0, 8);
                        ctx.restore();

                        ctx.restore();
                    }
                }
            },
        };

        this.enemySpawnCooldown = 0;
        this.enemySpawnCooldownMax = 1000;
        this.gammaTrails = [];

        this.mobileControlsScale = 1.5
        this.pointerTouches = new Map()

        this.mobileLeftStickAngle = null
        this.mobileLeftStickDist = 0

        this.mobileRightStickAngle = null
        this.mobileRightStickDist = 0

        this.mobileRightButtonDist = 0
    }

    getDefaultUpgrades() {
        let base = {}
        for (const [i, v] of Object.entries(UPGRADE_POOL)) {base[i] = 0;}
        return base
    }
    getDefaultShipStats() {
        let base = {
            attackDamage: 1,
            attackSpeed: 1,
            bulletSize: 1,
            healthRegen: 0,
            damageReduction: 1,
            maxHp: 1,
            moveSpeed: 1,
            spaceRockGain: 1,
            spaceGemGain: 1,
            xpGain: 1,
        };
        return base
    }

    getUpgradedShipStats(upgrades = this.upgrades) {
        let shipStats = this.getDefaultShipStats()

        shipStats.attackDamage = this.ship.damage
        shipStats.attackDamage *= 1 + 0.1 * upgrades.attackDamageCommon
        shipStats.attackDamage *= 1 + 0.15 * upgrades.attackDamageUncommon
        shipStats.attackDamage *= 1 + 0.2 * upgrades.attackDamageRare
        shipStats.attackDamage *= 1 + 0.2 * upgrades.attackEpic
        shipStats.attackDamage *= 1 + 0.75 * upgrades.attackLegendary
        shipStats.attackDamage *= levelableEffect("ir", player.ir.shipType)[2].toNumber()
        if (hasMilestone("spaceZone1", 12)) shipStats.attackDamage *= 1.25;
        if (hasMilestone("spaceZone1", 14)) shipStats.attackDamage *= 1.15;
        if (hasUpgrade("ir", 22)) shipStats.attackDamage *= upgradeEffect("ir", 22).toNumber();
        if (hasUpgrade("ir", 108)) shipStats.attackDamage *= 1.15;
        if ((player.pet && player.pet.legPetTimers && player.pet.legPetTimers[1] && player.pet.legPetTimers[1].current && typeof player.pet.legPetTimers[1].current.gt === "function" && player.pet.legPetTimers[1].current.gt(0))) shipStats.attackDamage = shipStats.attackDamage.mul(1.5);

        shipStats.attackSpeed = 1
        shipStats.attackSpeed *= 1 + 0.05 * upgrades.attackSpeedUncommon
        shipStats.attackSpeed *= 1 + 0.075 * upgrades.attackSpeedRare
        shipStats.attackSpeed *= 1 + 0.075 * upgrades.attackEpic
        shipStats.attackSpeed /= 1 + 0.25 * upgrades.attackLegendary

        shipStats.maxHp = player.ir.shipHealthMax.toNumber()

        shipStats.bulletSize = 1
        if (player.ir.shipType == 3 || player.ir.shipType == 7) {
            shipStats.maxHp *= 1 + 0.1 * upgrades.bulletSizeRare
        } else {
            shipStats.bulletSize *= 1 + 0.1 * upgrades.bulletSizeRare
        }

        shipStats.healthRegen = 0
        if (hasUpgrade("ir", 14)) shipStats.healthRegen += 0.5 / 60;
        if (hasMilestone("spaceZone3", 12)) shipStats.healthRegen *= 2;
        shipStats.healthRegen += upgrades.healthRegenUncommon * 0.5 / 60
        shipStats.healthRegen += upgrades.healthRegenRare * 0.75 / 60
        shipStats.healthRegen += upgrades.defenseEpic * 0.75 / 60
        shipStats.healthRegen *= 1 + 0.25 * upgrades.defenseLegendary
        shipStats.healthRegen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()

        shipStats.damageReduction = 1
        shipStats.damageReduction *= 1 + 0.1 * upgrades.damageReductionRare
        shipStats.damageReduction *= 1 + 0.15 * upgrades.defenseEpic
        shipStats.damageReduction *= 1 + 0.25 * upgrades.defenseLegendary

        shipStats.moveSpeed = 1
        shipStats.moveSpeed *= 1 + 0.1 * upgrades.moveSpeedRare
        shipStats.moveSpeed *= 1 + 0.25 * upgrades.moveSpeedLegendary
        
        shipStats.spaceRockGain = player.ir.spaceRockMult.toNumber()
        shipStats.spaceRockGain *= 1 + 0.1 * upgrades.spaceRockGainCommon
        shipStats.spaceRockGain *= 1 + 0.15 * upgrades.spaceRockGainUncommon
        shipStats.spaceRockGain *= 1 + 0.2 * upgrades.spaceRockGainRare
        shipStats.spaceRockGain *= 1 + 0.2 * upgrades.lootGainEpic
        shipStats.spaceRockGain *= 1 + 0.4 * upgrades.dropGainLegendary
        if (player.bl.noxDefeated) shipStats.spaceRockGain *= 1 + player.ir.battleLevel.toNumber() * 0.02
        
        shipStats.spaceGemGain = player.ir.spaceGemMult.toNumber()
        shipStats.spaceGemGain *= 1 + 0.05 * upgrades.spaceGemGainRare
        shipStats.spaceGemGain *= 1 + 0.05 * upgrades.lootGainEpic
        shipStats.spaceGemGain *= 1 + 0.2 * upgrades.dropGainLegendary
        if (player.bl.noxDefeated) shipStats.spaceGemGain *= 1 + player.ir.battleLevel.toNumber() * 0.02

        shipStats.bloodStoneGain = player.bl.bloodStonesMult.toNumber()
        shipStats.bloodStoneGain *= 1 + 0.1 * upgrades.bloodStoneGainCommon
        shipStats.bloodStoneGain *= 1 + 0.15 * upgrades.bloodStoneGainUncommon
        shipStats.bloodStoneGain *= 1 + 0.2 * upgrades.bloodStoneGainRare
        shipStats.bloodStoneGain *= 1 + 0.2 * upgrades.bloodLootGainEpic
        shipStats.bloodStoneGain *= 1 + 0.4 * upgrades.bloodLootGainLegendary
        if (player.bl.noxDefeated) shipStats.bloodStoneGain *= 1 + player.ir.battleLevel.toNumber() * 0.02
        
        shipStats.bloodGemGain = player.bl.bloodGemsMult.toNumber()
        shipStats.bloodGemGain *= 1 + 0.05 * upgrades.bloodGemGainRare
        shipStats.bloodGemGain *= 1 + 0.05 * upgrades.bloodLootGainEpic
        shipStats.bloodGemGain *= 1 + 0.2 * upgrades.bloodLootGainLegendary
        if (player.bl.noxDefeated) shipStats.bloodGemGain *= 1 + player.ir.battleLevel.toNumber() * 0.02

        shipStats.xpGain = 1
        shipStats.xpGain *= 1 + 0.1 * upgrades.xpGainCommon
        shipStats.xpGain *= 1 + 0.15 * upgrades.xpGainUncommon
        shipStats.xpGain *= 1 + 0.2 * upgrades.xpGainRare
        shipStats.xpGain *= 1 + 0.3 * upgrades.xpGainEpic
        shipStats.xpGain *= 1 + 0.4 * upgrades.dropGainLegendary

        return shipStats
    }

    spawnArena() {
        this.arenaDiv = document.createElement('div');
        this.arenaDiv.id = 'space-arena';
        Object.assign(this.arenaDiv.style, {
            position: 'fixed',
            left: '50%',
            top: '547px',
            width: this.canvasWidth + 'px',
            height: this.canvasHeight + 'px',
            transform: `translate(-50%, -50%)`,
            backgroundImage: "url(resources/ui/spaceBattle/" + player.ir.battleStage + ".png)",
            border: '3px solid ' + player.ir.primaryColor,
            borderRadius: '0',
            zIndex: 9999,
            overflow: 'hidden',
	        "transition-duration": "0s",
  	        touchAction: "none",
  	        userSelect: "none",
  	        "-webkit-user-select": "none",
        });
        document.body.appendChild(this.arenaDiv);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.arenaDiv.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('pointerdown', this.handlePointerDown);
        window.addEventListener('pointerup', this.handlePointerUp);
        window.addEventListener('pointercancel', this.handlePointerCancel);
        window.addEventListener('pointermove', this.handlePointerMove);
        
        this.running = true;
        this.loop = setInterval(() => this.update(), 1000 / 60);

        if (player.ir.shipType == 3 || player.ir.shipType == 7) {
            this.canvas.addEventListener('click', this.canvasClickListener);
        }
    }

    removeArena() {
        this.running = false;
        clearInterval(this.loop);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('pointerdown', this.handlePointerDown);
        window.removeEventListener('pointerup', this.handlePointerUp);
        window.removeEventListener('pointercancel', this.handlePointerCancel);
        window.removeEventListener('pointermove', this.handlePointerMove);
        if (this.arenaDiv) document.body.removeChild(this.arenaDiv);

        if ((player.ir.shipType == 3 || player.ir.shipType == 7) && this.canvasClickListener) {
            this.canvas.removeEventListener('click', this.canvasClickListener);
        }

        // Ensure fight flags are cleared when arena closes
        this.bossActive = false;
        player.ir.iriditeFightActive = false;

        // Ensure fight flags are cleared when arena closes
        this.bossActive = false;
        player.ir.iriditeFightActive = false;

        // Exit all menus
        player.ir.menu = 0;

        // If we were in fullscreen for the Iridite fight, restore original arena
        this.exitFullscreen();
    }

    handleKeyDown = (e) => { if (player.ir.menu == 0) this.keys[e.code] = true; };
    handleKeyUp = (e) => { if (player.ir.menu == 0) this.keys[e.code] = false; };
    handlePointerDown = (e) => {
        if (player.ir.menu == 0) this.pointerDown = true;
        if (player.ir.mobileControls) {
            let rect = this.canvas.getBoundingClientRect();

            if (player.ir.shipType != 3 && player.ir.shipType != 7) {
                // LEFT STICK
                let originX = 100 * this.mobileControlsScale
                let originY = this.canvasHeight - (100 * this.mobileControlsScale)
                this.mobileLeftStickDist = Math.hypot(e.clientY - rect.top - originY, e.clientX - rect.left - originX)
                if (this.mobileLeftStickDist < this.mobileControlsScale * 80) e.action = "leftStick";
                if (player.ir.shipType == 5 || player.ir.shipType == 8) {
                    // RIGHT STICK
                    originX = this.canvasWidth - (100 * this.mobileControlsScale)
                    this.mobileRightStickDist = Math.hypot(e.clientY - rect.top - originY, e.clientX - rect.left - originX)
                    if (this.mobileRightStickDist < this.mobileControlsScale * 80) e.action = "rightStick";
                } else {
                    // RIGHT BUTTON
                    originX = this.canvasWidth - (100 * this.mobileControlsScale)
                    this.mobileRightButtonDist = Math.hypot(e.clientY - rect.top - originY, e.clientX - rect.left - originX)
                    if (this.mobileRightButtonDist < this.mobileControlsScale * 80) e.action = "rightButton";
                }
                this.pointerTouches.set(e.pointerId, {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pointerId: e.pointerId,
                    action: e.action,
                })

            }
        }
        if (player.ir.shipType == 8 && player.ir.menu == 0 && !player.ir.autoShoot) {
            if (!(player.ir.mobileControls && e.action != "rightStick")) {
                this.ship._laserActive = true
                this.ship._laserTimer = -60;
            }
        }
    };
    handlePointerMove = (e) => {
        if (!this.canvas) return;
        if (!player.ir.mobileControls) {
            let rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        }
        else if (player.ir.mobileControls && (player.ir.shipType != 3 && player.ir.shipType != 7)) {
            this.pointerTouches.forEach((value, key, map) => {
                if (value.pointerId === e.pointerId) {
                    value.clientX = e.clientX
                    value.clientY = e.clientY
                };
            })
        }
    };
    handlePointerUp = (e) => {
        if (player.ir.menu == 0) this.pointerDown = false;
        if (player.ir.shipType == 8 && player.ir.menu == 0 && this.ship._laserActive && !player.ir.autoShoot && !(player.ir.mobileControls && this.pointerTouches.get(e.pointerId).action != "rightStick")) this.ship._laserActive = false;
        if (player.ir.mobileControls && (player.ir.shipType != 3 && player.ir.shipType != 7)) {
            let p = this.pointerTouches.get(e.pointerId);
            switch (p.action) {
                case "leftStick": this.mobileLeftStickAngle = null; break;
                case "rightStick": this.mobileRightStickAngle = null; break;
                default: break;
            }
            this.pointerTouches.delete(e.pointerId);
        }
    };
    handlePointerCancel = (e) => this.handlePointerUp(e);

    shoot() {
        let now = Date.now();
        let cooldown = this.ship.cooldown / this.shipStats.attackSpeed;
        if (now - this.ship.lastShot < cooldown) return;
        this.ship.lastShot = now
        let angle = this.ship.angle || 0;
        let r = 3;
        if (player.ir.shipType == 2) r = 9;
        if (player.ir.shipType == 10) r = 12;
        r *= this.shipStats.bulletSize;
        // shipType 5 aims at the mouse and fires burst shots toward it
        if (player.ir.shipType == 5 && ((typeof this.mouseX === "number" && typeof this.mouseY === "number") || player.ir.mobileControls)) {
            if (player.ir.mobileControls) angle = this.mobileRightStickAngle || this.ship.angle;
            else angle = Math.atan2(this.mouseY - (this.canvasHeight / 2), this.mouseX - (this.canvasWidth / 2));
            // spawn a short burst (multiple pellets) per shot
            let pellets = 5;
            let spread = 0.22;
            let spd = 14 + this.shipStats.moveSpeed;
            for (let i = 0; i < pellets; i++) {
                let offset = (i / (pellets - 1) - 0.5) * spread;
                let ang = angle + offset;
                let bullet = {
                    x: this.ship.x + Math.cos(ang) * (this.ship.radius || 12),
                    y: this.ship.y + Math.sin(ang) * (this.ship.radius || 12),
                    vx: Math.cos(ang) * spd,
                    vy: Math.sin(ang) * spd,
                    life: 60,
                    radius: r,
                    damage: this.shipStats.attackDamage,
                    pierce: 0,
                    piercedAsteroids: [],
                    piercedEnemies: [],
                    fromEnemy: false,
                }
                this.bullets.push(bullet);
            }
            return;
        }
        
        if (player.ir.shipType == 8 && (typeof this.mouseX === "number" && typeof this.mouseY === "number") || (player.ir.mobileControls && player.ir.autoShoot)) {
            if (player.ir.autoShoot && !this.ship._laserActive) {
                this.ship._laserActive = true
                this.ship._laserTimer = -60
            }
            return;
        } else if (player.ir.shipType == 8) return;

        let speed = 10;
        if (player.ir.shipType == 4) speed = 25;
        if (player.ir.shipType == 6) speed = 20;
        if (player.ir.shipType == 9) speed = 12;
        if (player.ir.shipType == 10) speed = 20;
        speed *= this.shipStats.moveSpeed
        let pierce = 0;
        if (player.ir.shipType == 2) pierce = 1;
        if (player.ir.shipType == 4) pierce = 10;
        if (player.ir.shipType == 6) pierce = 2;

        let target = null;
        if (player.ir.shipType == 4 && !this.keys['KeyA'] && !this.keys['KeyD'] && !this.keys['KeyW'] && !this.keys['KeyS']) {
            let closest = null;
            let closestDist = 600;
            for (let e of this.enemies) {
                let c = this.getClosestCoords([e.x, e.y]);
                let dx = c[0] - e.x;
                let dy = c[1] - e.y;
                let d = Math.hypot(dx, dy);
                if (d < closestDist) {
                    closestDist = d;
                    closest = e;
                }
            }
            if (closest) {
                let c = this.getClosestCoords([closest.x, closest.y]);
                let timeToHit = Math.hypot(c[1] - closest.y, c[0] - closest.x) / speed
                c[0] -= closest.vx * timeToHit
                c[1] -= closest.vy * timeToHit
                angle = Math.atan2(c[1] - closest.y, c[0] - closest.x);
                angle = (angle % (2 * Math.PI)) - Math.PI
                target = closest;
                this.ship.currentTarget = closest; // keep marker for drawing
            } else {
                this.ship.currentTarget = null;
            }
        }

        // Special evolver primary shard: breaks into 3 mini-shards on impact or on hitting arena edge
        if (player.ir.shipType == 9) {
            this.bullets.push({
                x: this.ship.x + Math.cos(angle) * 20,
                y: this.ship.y + Math.sin(angle) * 20,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 60,
                radius: r,
                damage: this.shipStats.attackDamage,
                pierce: 0,
                piercedAsteroids: [],
                piercedEnemies: [],
                fromEnemy: false,
                evolverShard: true,
            });
        } else if (player.ir.shipType == 10) {
            this.bullets.push({
                x: this.ship.x + Math.cos(angle) * 20,
                y: this.ship.y + Math.sin(angle) * 20,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 60,
                radius: r,
                damage: this.shipStats.attackDamage,
                pierce: 0,
                piercedAsteroids: [],
                piercedEnemies: [],
                fromEnemy: false,
                explosive: true,
            });
        } else {
            this.bullets.push({
                x: this.ship.x + Math.cos(angle) * 20,
                y: this.ship.y + Math.sin(angle) * 20,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 60,
                radius: r,
                damage: this.shipStats.attackDamage,
                pierce: pierce,
                piercedAsteroids: [],
                piercedEnemies: [],
                fromEnemy: false,
                // homing properties (only used for sniper bullets)
                homing: player.ir.shipType == null,
                target: target,
                homingStrength: 0.18, // radians/frame max turn (tweakable)
            });
        }
    }

    // Pause asteroid minigame: freeze existing asteroids and prevent new spawns
    pauseAsteroidMinigame() {
        if (this._asteroidMinigamePaused) return;
        this._asteroidMinigamePaused = true;

        // Prevent further spawns by saving and forcing max to 0
        this._savedMaxAsteroids = this.maxAsteroids;
        this.maxAsteroids = 0;

        // Save and zero velocities (freeze asteroids)
        for (let a of this.asteroids) {
            a._savedVX = a.vx;
            a._savedVY = a.vy;
            a.vx = 0;
            a.vy = 0;

            // If your asteroids use other timers, save them too
            if (typeof a.phaseTimer !== 'undefined') a._savedPhaseTimer = a.phaseTimer;
        }

        // Optionally save the spawn timer so it continues where it left off on resume
        this._savedAsteroidSpawnTimer = this.asteroidSpawnTimer;

        // If the Iridite boss exists, save and freeze its state so it cannot move/attack
        for (let e of this.enemies.concat(this.asteroids)) {
            if (e.health.lte(0)) continue;
            if (e.type === "iriditeBoss") {
                // Save key runtime fields so we can restore them later
                e._savedBossState = {
                    vx: e.vx,
                    vy: e.vy,
                    phase: e.phase,
                    state: e.state,
                    attackTimer: e.attackTimer,
                    _actionCooldown: e._actionCooldown,
                    dashing: e.dashing,
                    dashSeqRemaining: e.dashSeqRemaining,
                    dashDistance: e.dashDistance,
                    dashSpeed: e.dashSpeed,
                    _dashState: e._dashState,
                    _dashDir: e._dashDir,
                    _dashTargets: e._dashTargets,
                    homingShotsRemaining: e.homingShotsRemaining,
                    radialShotsRemaining: e.radialShotsRemaining,
                    attackIndex: e.attackIndex,
                    _lungeTimer: e._lungeTimer,
                    _rainingTimer: e._rainingTimer,
                    _rainingInterval: e._rainingInterval,
                    _daggerPrep: e._daggerPrep,
                    _daggerCount: e._daggerCount,
                    _daggerWarnings: Array.isArray(e._daggerWarnings) ? e._daggerWarnings.slice() : null,
                    _burstShots: e._burstShots,
                    wingPhase: e.wingPhase,
                    _laserTimer: e._laserTimer,
                    _giantPrep: e._giantPrep,
                    _giantLines: Array.isArray(e._giantLines) ? e._giantLines.slice() : null,
                    _giantFired: e._giantFired,
                    _recentlyHit: e._recentlyHit,
                };

                // Mark as paused so other systems can skip interactions
                e._pausedBoss = true;

                // Freeze movement and action-related fields
                e.vx = 0;
                e.vy = 0;
                e.dashing = false;
                e._actionCooldown = 999999;
                e.attackTimer = 999999;
            }
        }
    }

    // Resume asteroid minigame: restore velocities and allow spawns again
    resumeAsteroidMinigame() {
        if (!this._asteroidMinigamePaused) return;
        this._asteroidMinigamePaused = false;

        // Restore maxAsteroids
        if (typeof this._savedMaxAsteroids !== 'undefined') {
            this.maxAsteroids = this._savedMaxAsteroids;
            delete this._savedMaxAsteroids;
        }

        // Restore asteroid velocities and timers
        for (let a of this.asteroids) {
            if (typeof a._savedVX !== 'undefined') { a.vx = a._savedVX; delete a._savedVX; }
            if (typeof a._savedVY !== 'undefined') { a.vy = a._savedVY; delete a._savedVY; }
            if (typeof a._savedPhaseTimer !== 'undefined') { a.phaseTimer = a._savedPhaseTimer; delete a._savedPhaseTimer; }
        }

        // Restore spawn timer
        if (typeof this._savedAsteroidSpawnTimer !== 'undefined') {
            this.asteroidSpawnTimer = this._savedAsteroidSpawnTimer;
            delete this._savedAsteroidSpawnTimer;
        }

        // Restore Iridite boss state if we saved it earlier
        for (let e of this.enemies.concat(this.asteroids)) {
            if (e.health.lte(0)) continue;
            if (e.type === "iriditeBoss" && e._savedBossState) {
                const s = e._savedBossState;
                e.vx = (typeof s.vx !== 'undefined') ? s.vx : 0;
                e.vy = (typeof s.vy !== 'undefined') ? s.vy : 0;
                e.phase = (typeof s.phase !== 'undefined') ? s.phase : e.phase;
                e.state = (typeof s.state !== 'undefined') ? s.state : e.state;
                e.attackTimer = (typeof s.attackTimer !== 'undefined') ? s.attackTimer : e.attackTimer;
                e._actionCooldown = (typeof s._actionCooldown !== 'undefined') ? s._actionCooldown : e._actionCooldown;
                e.dashing = (typeof s.dashing !== 'undefined') ? s.dashing : e.dashing;
                e.dashSeqRemaining = (typeof s.dashSeqRemaining !== 'undefined') ? s.dashSeqRemaining : e.dashSeqRemaining;
                e.dashDistance = (typeof s.dashDistance !== 'undefined') ? s.dashDistance : e.dashDistance;
                e.dashSpeed = (typeof s.dashSpeed !== 'undefined') ? s.dashSpeed : e.dashSpeed;
                e._dashState = (typeof s._dashState !== 'undefined') ? s._dashState : e._dashState;
                e._dashDir = (typeof s._dashDir !== 'undefined') ? s._dashDir : e._dashDir;
                e._dashTargets = (typeof s._dashTargets !== 'undefined') ? s._dashTargets : e._dashTargets;
                e.homingShotsRemaining = (typeof s.homingShotsRemaining !== 'undefined') ? s.homingShotsRemaining : e.homingShotsRemaining;
                e.radialShotsRemaining = (typeof s.radialShotsRemaining !== 'undefined') ? s.radialShotsRemaining : e.radialShotsRemaining;
                e.attackIndex = (typeof s.attackIndex !== 'undefined') ? s.attackIndex : e.attackIndex;
                e._lungeTimer = (typeof s._lungeTimer !== 'undefined') ? s._lungeTimer : e._lungeTimer;
                e._rainingTimer = (typeof s._rainingTimer !== 'undefined') ? s._rainingTimer : e._rainingTimer;
                e._rainingInterval = (typeof s._rainingInterval !== 'undefined') ? s._rainingInterval : e._rainingInterval;
                e._daggerPrep = (typeof s._daggerPrep !== 'undefined') ? s._daggerPrep : e._daggerPrep;
                e._daggerCount = (typeof s._daggerCount !== 'undefined') ? s._daggerCount : e._daggerCount;
                e._daggerWarnings = (s._daggerWarnings !== null) ? s._daggerWarnings.slice() : e._daggerWarnings;
                e._burstShots = (typeof s._burstShots !== 'undefined') ? s._burstShots : e._burstShots;
                e.wingPhase = (typeof s.wingPhase !== 'undefined') ? s.wingPhase : e.wingPhase;
                e._laserTimer = (typeof s._laserTimer !== 'undefined') ? s._laserTimer : e._laserTimer;
                e._giantPrep = (typeof s._giantPrep !== 'undefined') ? s._giantPrep : e._giantPrep;
                e._giantLines = (s._giantLines !== null) ? s._giantLines.slice() : e._giantLines;
                e._giantFired = (typeof s._giantFired !== 'undefined') ? s._giantFired : e._giantFired;
                e._recentlyHit = (typeof s._recentlyHit !== 'undefined') ? s._recentlyHit : e._recentlyHit;

                // Remove paused marker and saved state
                delete e._savedBossState;
                delete e._pausedBoss;
            }
        }
    }

    spawnAsteroid(big = false, x = null, y = null) {
        if (this.asteroids.length >= this.maxAsteroids) return;
        let size = big ? 30 + Math.random() * 15 : 10 + Math.random() * 5;
        let health = big ? getRandomInt(50) + 75 : getRandomInt(15) + 20;
        let angle = Math.random() * Math.PI * 2;
        let speed = big ? 1 + Math.random() * 1.5 : 2 + Math.random() * 2;
        let splitCount = big ? 2 + Math.floor(Math.random() * 3) : 0;
        let phaseTime = 9999999999;
        let vertexCount = big ? 8 + Math.floor(Math.random() * 4) : 8 + Math.floor(Math.random() * 3);
        let shape = this.generateConvexPolygon(size, vertexCount);

        if (player.ir.battleLevel.gte(20)) {
            health = health * Decimal.pow(1.04, player.ir.battleLevel.sub(19)).toNumber()
        }

        this.asteroids.push({
            x: x !== null ? x : Math.random() * this.width,
            y: y !== null ? y : Math.random() * this.height,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: size,
            health: health,
            maxHealth: health,
            big: big,
            splitCount: splitCount,
            phaseTimer: phaseTime,
            phased: false,
            shape: shape,
        });
    }

    spawnIridite() {
        // Prevent duplicate bosses
        if (this.enemies.some(e => e.type === "iriditeBoss" && e.alive)) return;

        player.ir.tookDamageInIriditeFight = false;

        // Clear arena of regular threats
        for (let e of this.enemies.concat(this.asteroids)) e.health = new Decimal(0);
        this.enemies = [];
        this.asteroids = [];
        // clear player bullets too so the fight starts clean
        this.bullets = this.bullets.filter(b => b.fromEnemy);

        // Mark boss active so normal spawns/asteroids stop
        this.bossActive = true;
        // ensure the global flag is set whenever the fight is active
        player.ir.iriditeFightActive = true;

        // Make the arena fullscreen & transparent for the Iridite encounter
        if (typeof this.enterFullscreen === "function") {
            this.enterFullscreen();
        }

        let amt = 1
        for (let i = 0; i < amt; i++) {
        // Decide a spawn position that is NOT on top of the player.
        // Compute safe minimum separation based on both radii and a buffer.
        const enemyRadius = (this.enemyTypes.iriditeBoss && this.enemyTypes.iriditeBoss.radius) ? this.enemyTypes.iriditeBoss.radius : 64;
        const shipRadius = (this.ship && this.ship.radius) ? this.ship.radius : 20;
        const safeBuffer = 150; // extra space so boss doesn't immediately overlap player
        const minSeparation = enemyRadius + shipRadius + safeBuffer;

        // Prefer spawning some distance from the arena center:
        const preferDistance = Math.max(this.width, this.height) * 0.35;
        const spawnDistance = Math.max(minSeparation, preferDistance);

        // Random angle and position around center, clamped to arena bounds
        let angle = Math.random() * Math.PI * 2;
        let ex = Math.round(this.width / 2 + Math.cos(angle) * spawnDistance);
        let ey = Math.round(this.height / 2 + Math.sin(angle) * spawnDistance);

        // Clamp to ensure enemy is fully inside the arena
        ex = Math.max(enemyRadius, Math.min(this.width - enemyRadius, ex));
        ey = Math.max(enemyRadius, Math.min(this.height - enemyRadius, ey));

        let enemy = {
            type: "iriditeBoss",
            x: ex,
            y: ey,
            vx: 0,
            vy: 0,
            radius: enemyRadius,
            color: this.enemyTypes.iriditeBoss.color,
            health: this.enemyTypes.iriditeBoss.healthMax,
            maxHealth: this.enemyTypes.iriditeBoss.healthMax,
            alive: true,
            phase: 1,
            state: "idle",
            attackTimer: 60,
            _actionCooldown: 0,
            dashing: false,
            dashSeqRemaining: 0,
            dashDistance: 240,
            dashSpeed: 36,
            _dashState: null,
            _dashDir: null,
            _dashTargets: null,
            homingShotsRemaining: 0,
            radialShotsRemaining: 0,
            attackIndex: 0,
            _lungeTimer: 0,
            _rainingTimer: 0,
            _rainingInterval: 0,
            _daggerPrep: 0,
            _daggerCount: 0,
            _daggerWarnings: [],
            _burstShots: 0,
            wingPhase: Math.random() * Math.PI * 2,
            _laserTimer: 0,
            _giantPrep: 0,
            _giantLines: [],
            _giantFired: false,
            _recentlyHit: 0,
        };
        this.enemies.push(enemy);
        }
    }

    generateConvexPolygon(radius, vertexCount) {
        let angles = [];
        for (let i = 0; i < vertexCount; i++) {
            angles.push((i / vertexCount) * Math.PI * 2);
        }
        angles.sort((a, b) => a - b);
        let points = [];
        for (let i = 0; i < vertexCount; i++) {
            let r = radius * (0.5 + Math.random());
            points.push({
                x: Math.cos(angles[i]) * r,
                y: Math.sin(angles[i]) * r
            });
        }
        return points;
    }

    chargeShot() {
        if (this.awaitingShotCharge) return;
        let now = Date.now();
        let cooldown = this.ship.cooldown / this.shipStats.attackSpeed;
        if (now - this.ship.lastShot < cooldown) return;
        this.awaitingShotCharge = true
        this.shotChargeTimer = 21
    }

    update() {
        
        this.arenaDiv.style.backgroundPosition = (400 - this.ship.x) + "px " + (400 - this.ship.y) + "px"

        if (player.ir.menu == 0 && !arena.bossActive && (player.ir.battleStage == "noxZone" || (player.ir.battleStage == "bloodZone1" && player.ir.battleLevel.gte(20)))) {
            this.noxSpearCooldown--
            if (this.noxSpearCooldown <= 0) {
                this.noxSpearCooldown = 90
                SB_spawnWarning("allyNoxSpear", null)
            }
        }

        // Prepare collectors used by multiple death paths
        let newAsteroids = [];
        let lootFlashPositions = [];
        let xpOrbsToAdd = [];
        if (player.ir.shipHealth.lt(0)) this.onShipDeath();
        // Helper to handle enemy death logic (drops, flags, etc.)
        const handleEnemyDeath = (enemy) => {
            if (!enemy) return;
            let celRef = SB_celestialites[enemy.type]
            // rock drop
            if (celRef && celRef.reward) {
                let reward = celRef.reward()

                if (reward.spaceRock) {
                    let amt = reward.spaceRock.mul(this.shipStats.spaceRockGain).floor();
                    amt = amt.max(1)
                    player.ir.spaceRock = player.ir.spaceRock.add(amt);
                    lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "spaceRock" });
                }
                if (reward.spaceGem) {
                    let amt = reward.spaceGem.mul(this.shipStats.spaceGemGain).floor();
                    amt = amt.max(1)
                    player.ir.spaceGem = player.ir.spaceGem.add(amt);
                    lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "spaceGem" });
                }
                if (reward.bloodStones) {
                    let amt = reward.bloodStones.mul(this.shipStats.bloodStoneGain).floor();
                    amt = amt.max(1)
                    player.bl.bloodStones = player.bl.bloodStones.add(amt);
                    lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "bloodStones" });
                }
                if (reward.bloodGems) {
                    let amt = reward.bloodGems.mul(this.shipStats.bloodGemGain).floor();
                    amt = amt.max(1)
                    player.bl.bloodGems = player.bl.bloodGems.add(amt);
                    lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "bloodGems" });
                }
            }
            // xp drop -> spawn xp orb
            if (celRef && celRef.experienceReward) {
                let amt = celRef.experienceReward()
                xpOrbsToAdd.push({ x: enemy.x, y: enemy.y, amount: amt });
            }

            // Mark Iridite defeat when boss dies
            if (enemy.type === "iriditeBoss") {
                this.bossActive = false;
                player.ir.iriditeDefeated = true;
                if (!player.ir.tookDamageInIriditeFight) player.ir.astralShipUnlocked = true;
                player.ir.iriditeFightActive = false;
                localStorage.setItem('arenaActive', 'false');
                player.ir.battleLevel = player.ir.battleLevel.add(1)
                let gain = Math.floor(5 * this.shipStats.spaceGemGain * this.resourceMult * (getBuyableAmount("sme", 156).div(20).add(1).toNumber() || 1))
                player.ir.spaceGem = player.ir.spaceGem.add(gain);
                lootFlashPositions.push({ x: enemy.x, y: enemy.y + 12, amount: 2, type: "spaceGem" });
                arena.enhanced = true;
                arena.showUpgradeChoice();
                player.ir.menu = 1
            }

            SB_celestialites[enemy.type].onDeath(enemy)

            let i = this.enemies.indexOf(enemy);
            let j = this.asteroids.indexOf(enemy);
            if (i > -1) {
                this.enemies.splice(i, 1);
            } else if (j > -1) {
                this.asteroids.splice(j, 1);
            }
        };

        // If we were in fullscreen iridite mode but the boss is gone, restore arena
        
        if (player.ir.menu > 0) {
            this.draw();
            return;
        }

        // decrement ship invulnerability timer each tick (approx 60FPS)
        const _TICK_MS = 1000 / 60;
        if (this.shipHitInvuln > 0) this.shipHitInvuln = Math.max(0, this.shipHitInvuln - _TICK_MS);

        // Hard mode check
        const hardMode = player.ir.battleLevel.gte(8);
        
        if (hardMode) this.enemySpawnCooldownMax = 700;

        // Health regen
        if (this.shipStats.healthRegen > 0) {
            player.ir.shipHealth = player.ir.shipHealth.add(this.shipStats.healthRegen);
            if (player.ir.shipHealth.gt(arena.shipStats.maxHp)) {
                player.ir.shipHealth = new Decimal(arena.shipStats.maxHp);
            }
        }

        // Ship movement
        if (player.ir.shipType == 3) {
            // Gravity
            this.ship.vy += this.ship.gravity;

            // Auto Bounce
            if (player.ir.autoShoot) {
                let now = Date.now();
                this.bounceCooldown = 2000 / this.shipStats.attackSpeed
                if (now - this.lastBounceClick >= this.bounceCooldown) {
                    this.lastBounceClick = now;
                    let rect = this.canvas.getBoundingClientRect();
                    this.ship.bounceTarget = { x: this.mouseX, y: this.mouseY };
                    if (this.ship.bounceTarget.x == undefined) {
                        this.ship.bounceTarget = {x: this.width / 2, y: this.height / 2}
                    }
                }
            }

            // Bounce click logic
            if (this.ship.bounceTarget) {
                let dx = this.ship.bounceTarget.x - this.ship.x;
                let dy = this.ship.bounceTarget.y - this.ship.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                // Calculate velocity to move toward the target, but keep moving after
                let frames = 30;
                let speed = Math.max(12, dist / frames);
                let angle = Math.atan2(dy, dx);

                this.ship.vx = Math.cos(angle) * speed;
                this.ship.vy = Math.sin(angle) * speed - (this.ship.gravity * frames) / 2;
                this.ship.bouncing = true;
                this.ship.bounceFrames = frames;
                this.ship.bounceTarget = null;
            }

            // Apply velocities
            this.ship.x += this.ship.vx;
            this.ship.y += this.ship.vy;

            // Friction for horizontal movement
            this.ship.vx *= 0.98;

            // Horizontal movement (left/right keys)
            if (this.keys['KeyA'] && player.ir.shipType != 3) this.ship.vx -= this.ship.maxVelocity * 0.2;
            if (this.keys['KeyD'] && player.ir.shipType != 3) this.ship.vx += this.ship.maxVelocity * 0.2;

            // Bounce off floor/ceiling
            if (this.ship.y + this.ship.radius > this.height) {
                this.ship.y = this.height - this.ship.radius;
                this.ship.vy = -this.ship.vy * this.ship.bounce;
            }
            if (this.ship.y - this.ship.radius < 0) {
                this.ship.y = this.ship.radius;
                this.ship.vy = -this.ship.vy * this.ship.bounce;
            }
            // Bounce off walls
            if (this.ship.x + this.ship.radius > this.width) {
                this.ship.x = this.width - this.ship.radius;
                this.ship.vx = -this.ship.vx * this.ship.bounce;
            }
            if (this.ship.x - this.ship.radius < 0) {
                this.ship.x = this.ship.radius;
                this.ship.vx = -this.ship.vx * this.ship.bounce;
            }
        } else if (player.ir.shipType == 7) {
            // Auto Dash
            if (player.ir.autoShoot) {
                let now = Date.now();
                this.dashCooldown = 1000 / this.shipStats.attackSpeed
                if (now - this.lastDashClick >= this.dashCooldown) {
                    this.lastDashClick = now;
                    let rect = this.canvas.getBoundingClientRect();
                    this.ship.dashTarget = { x: this.mouseX, y: this.mouseY };
                    if (this.ship.dashTarget.x == undefined) {
                        this.ship.dashTarget = {x: this.width / 2, y: this.height / 2}
                    }
                }
            }

            if (this.ship.dashTarget) {
                let dx = this.ship.dashTarget.x - this.ship.x;
                let dy = this.ship.dashTarget.y - this.ship.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                // Calculate velocity to move toward the target, but keep moving after
                let frames = 30;
                let speed = Math.max(12, dist / frames);
                let angle = Math.atan2(dy, dx);

                this.ship.vx = Math.cos(angle) * speed;
                this.ship.vy = Math.sin(angle) * speed;
                this.ship.dashing = true;
                this.ship.dashFrames = frames;
                this.ship.dashTarget = null;
                this.ship.angle = angle;
            }
            // Apply velocities
            this.ship.x += this.ship.vx;
            this.ship.y += this.ship.vy;

            // Apply deceleration
            this.ship.vx *= this.ship.deceleration;
            this.ship.vy *= this.ship.deceleration;

            // Wrap ship around arena edges
            if (this.ship.x < 0) this.ship.x += this.width;
            if (this.ship.x > this.width) this.ship.x -= this.width;
            if (this.ship.y < 0) this.ship.y += this.height;
            if (this.ship.y > this.height) this.ship.y -= this.height;
        } else {

            // MOBILE MOVEMENT / KEYBOARD SHOOTING
            if (!player.ir.mobileControls) {
                if (this.keys['KeyW']) {
                    this.ship.velocity += this.ship.acceleration + this.shipStats.moveSpeed * 0.1;
                } else if (this.keys['KeyS']) {
                    this.ship.velocity -= this.ship.acceleration + this.shipStats.moveSpeed * 0.1;
                } else {
                    if (this.ship.velocity > 0) {
                        this.ship.velocity -= this.ship.deceleration;
                        if (this.ship.velocity < 0) this.ship.velocity = 0;
                    } else if (this.ship.velocity < 0) {
                        this.ship.velocity += this.ship.deceleration;
                        if (this.ship.velocity > 0) this.ship.velocity = 0;
                    }
                }
                if (this.keys['KeyA']) this.ship.angle -= this.ship.rotationSpeed;
                if (this.keys['KeyD']) this.ship.angle += this.ship.rotationSpeed;
                if (this.ship.currentTarget && player.ir.shipType == 4 && !this.keys['KeyA'] && !this.keys['KeyD'] && !this.keys['KeyW'] && !this.keys['KeyS']) {
                    let target = this.ship.currentTarget
                    let closest = this.getClosestCoords([target.x, target.y])
                    let timeToHit = Math.hypot(closest[1] - target.y, closest[0] - target.x) / (25 * this.shipStats.moveSpeed)
                    closest[0] += target.vx * timeToHit
                    closest[1] += target.vy * timeToHit

                    let desired = Math.atan2(closest[1] - target.y, closest[0] - target.x);
                    let angDist = (desired - this.ship.angle + Math.PI) % (Math.PI*2) - Math.PI;
                    this.ship.angle += (angDist < 0 ? angDist + Math.PI : angDist) * 0.125;
                }
            }
            if ((!player.ir.mobileControls && (this.keys['Space'] || this.pointerDown)) || player.ir.autoShoot) {
                if (player.ir.shipType == 10) {
                    this.chargeShot()
                } else {
                    this.shoot()
                }
            }
            if (this.shotChargeTimer) this.shotChargeTimer--;
            if (this.awaitingShotCharge && this.shotChargeTimer <= 0) {
                this.shoot()
                this.awaitingShotCharge = false
            }

            let maxVel = this.ship.maxVelocity + this.shipStats.moveSpeed;
            this.ship.velocity = Math.max(-maxVel, Math.min(maxVel, this.ship.velocity));

            // Move ship
            this.ship.x += Math.cos(this.ship.angle) * this.ship.velocity;
            this.ship.y += Math.sin(this.ship.angle) * this.ship.velocity;

            // Wrap ship around arena edges
            if (this.ship.x < 0) this.ship.x += this.width;
            if (this.ship.x > this.width) this.ship.x -= this.width;
            if (this.ship.y < 0) this.ship.y += this.height;
            if (this.ship.y > this.height) this.ship.y -= this.height;
        }

        if (player.ir.mobileControls) {
            this.pointerTouches.forEach((value, key, map) => {
                if (!value.action) return;
                switch (value.action) {
                    case "leftStick": {
                        let rect = this.canvas.getBoundingClientRect();
                        let mouseX = value.clientX - rect.left;
                        let mouseY = value.clientY - rect.top;
                        let originX = 100 * this.mobileControlsScale
                        let originY = this.canvasHeight - (100 * this.mobileControlsScale)
                        this.mobileLeftStickDist = Math.hypot(mouseY - originY, mouseX - originX)
                        if (this.mobileLeftStickDist < this.mobileControlsScale * 20) {
                            this.mobileLeftStickAngle = null
                        } else {
                            this.mobileLeftStickAngle = Math.round(Math.atan2(mouseY - originY, mouseX - originX) / Math.PI * 4) * Math.PI / 4
                        }
                        
                        if (this.mobileLeftStickAngle != null) {
                            if (player.ir.shipType == 5 || player.ir.shipType == 8) {
                                // Desired Speed
                                const maxSpeed = (this.ship.maxVelocity || 3.5) + (this.shipStats.moveSpeed || 0);
                                let desiredVx = Math.cos(this.mobileLeftStickAngle) * maxSpeed
                                let desiredVy = Math.sin(this.mobileLeftStickAngle) * maxSpeed
                            
                                // Smoothly approach desired velocity (lerp) for less "wonky" feel
                                const lerpFactor = 0.16; // tweak for responsiveness vs smoothness
                                this.ship.vx += (desiredVx - this.ship.vx) * lerpFactor;
                                this.ship.vy += (desiredVy - this.ship.vy) * lerpFactor;
                            
                                // Small global damping to stabilize movement
                                this.ship.vx *= 0.995;
                                this.ship.vy *= 0.995;
                            
                                // Zero legacy forward/backwards velocity so other ship logic doesn't interfere
                                if (typeof this.ship.velocity === "number") this.ship.velocity = 0;
                            
                                // Move ship (movement completely independent of facing)
                                this.ship.x += this.ship.vx;
                                this.ship.y += this.ship.vy;
                            } else {
                            
                                let ang = this.mobileLeftStickAngle / Math.PI * 4 + 4
                                ang = Math.round(ang)
                                switch (ang) {
                                    case 0, 8: {
                                        this.ship.angle -= this.ship.rotationSpeed;
                                    break;}
                                    case 1: {
                                        this.ship.angle -= this.ship.rotationSpeed;
                                        this.ship.velocity += this.ship.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 2: {
                                        this.ship.velocity += this.ship.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 3: {
                                        this.ship.angle += this.ship.rotationSpeed;
                                        this.ship.velocity += this.ship.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 4: {
                                        this.ship.angle += this.ship.rotationSpeed;
                                    break;}
                                    case 5: {
                                        this.ship.angle += this.ship.rotationSpeed;
                                        this.ship.velocity -= this.ship.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 6: {
                                        this.ship.velocity -= this.ship.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 7: {
                                        this.ship.angle -= this.ship.rotationSpeed;
                                        this.ship.velocity -= this.ship.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    default: {
                                        this.ship.angle -= this.ship.rotationSpeed;
                                    break;};
                                }
                            
                                // Wrap ship around arena edges
                                if (this.ship.x < 0) this.ship.x += this.width;
                                if (this.ship.x > this.width) this.ship.x -= this.width;
                                if (this.ship.y < 0) this.ship.y += this.height;
                                if (this.ship.y > this.height) this.ship.y -= this.height;
                            }
                        } else {
                            if (this.ship.velocity > 0) {
                                this.ship.velocity -= this.ship.deceleration;
                                if (this.ship.velocity < 0) this.ship.velocity = 0;
                            } else if (this.ship.velocity < 0) {
                                this.ship.velocity += this.ship.deceleration;
                                if (this.ship.velocity > 0) this.ship.velocity = 0;
                            }
                        }
                    break;}
                    case "rightStick": {
                        let rect = this.canvas.getBoundingClientRect();
                        let mouseX = value.clientX - rect.left;
                        let mouseY = value.clientY - rect.top;
                        let originX = this.canvasWidth - (100 * this.mobileControlsScale)
                        let originY = this.canvasHeight - (100 * this.mobileControlsScale)
                        this.mobileRightStickDist = Math.hypot(mouseY - originY, mouseX - originX)
                        if (this.mobileRightStickDist < this.mobileControlsScale * 20) {
                            this.mobileRightStickAngle = null
                        } else {
                            this.mobileRightStickAngle = Math.atan2(mouseY - originY, mouseX - originX)
                        }
                        
                        if (this.mobileRightStickAngle != null) {
                            this.ship.angle = this.mobileRightStickAngle
                            this.shoot()
                        }
                    break;}
                    case "rightButton": {
                        if (player.ir.shipType == 10) {
                            this.chargeShot()
                        } else {
                            this.shoot()
                            if (this.ship.currentTarget && player.ir.shipType == 4) {
                                let target = this.ship.currentTarget
                                let closest = this.getClosestCoords([target.x, target.y])
                                let timeToHit = Math.hypot(closest[1] - target.y, closest[0] - target.x) / (25 * this.shipStats.moveSpeed)
                                closest[0] += target.vx * timeToHit
                                closest[1] += target.vy * timeToHit
                            
                                let desired = Math.atan2(closest[1] - target.y, closest[0] - target.x);
                                let angDist = (desired - this.ship.angle + Math.PI) % (Math.PI*2) - Math.PI;
                                this.ship.angle += (angDist < 0 ? angDist + Math.PI : angDist) * 0.125;
                            }
                        }
                    break;}
                    default: break;
                }
            })
        } else {
            this.mobileLeftStickAngle = null
            this.mobileRightStickAngle = null
        }
        if (this.ship.velocity > 0) {
            this.ship.velocity -= this.ship.deceleration;
            if (this.ship.velocity < 0) this.ship.velocity = 0;
        } else if (this.ship.velocity < 0) {
            this.ship.velocity += this.ship.deceleration;
            if (this.ship.velocity > 0) this.ship.velocity = 0;
        }
        
        if (player.ir.shipType == 5 || player.ir.shipType == 8) {
            // Omnidirectional movement: smooth thrust toward desired velocity (rotation is purely visual)
            if (typeof this.ship.vx !== "number") this.ship.vx = 0;
            if (typeof this.ship.vy !== "number") this.ship.vy = 0;

            // Build input vector
            let ix = 0, iy = 0;
            if (!player.ir.mobileControls) {
                if (this.keys['KeyW']) iy -= 1;
                if (this.keys['KeyS']) iy += 1;
                if (this.keys['KeyA']) ix -= 1;
                if (this.keys['KeyD']) ix += 1;
            }
            // Desired speed (account for moveSpeed upgrades)
            const maxSpeed = (this.ship.maxVelocity || 3.5) + (this.shipStats.moveSpeed || 0);
            let desiredVx = 0, desiredVy = 0;
            if (ix !== 0 || iy !== 0) {
                let len = Math.hypot(ix, iy) || 1;
                desiredVx = (ix / len) * maxSpeed;
                desiredVy = (iy / len) * maxSpeed;
            }
            // Smoothly approach desired velocity (lerp) for less "wonky" feel
            const lerpFactor = 0.16; // tweak for responsiveness vs smoothness
            this.ship.vx += (desiredVx - this.ship.vx) * lerpFactor;
            this.ship.vy += (desiredVy - this.ship.vy) * lerpFactor;
            // Small global damping to stabilize movement
            this.ship.vx *= 0.995;
            this.ship.vy *= 0.995;
            // Zero legacy forward/backwards velocity so other ship logic doesn't interfere
            if (typeof this.ship.velocity === "number") this.ship.velocity = 0;
            // Move ship (movement completely independent of facing)
            this.ship.x += this.ship.vx;
            this.ship.y += this.ship.vy;
            // Wrap ship around arena edges
            if (this.ship.x < 0) this.ship.x += this.width;
            if (this.ship.x > this.width) this.ship.x -= this.width;
            if (this.ship.y < 0) this.ship.y += this.height;
            if (this.ship.y > this.height) this.ship.y -= this.height;
            // Rotation purely visual: smoothly face the mouse (won't affect movement)
            if (typeof this.mouseX === "number" && typeof this.mouseY === "number") {
                let desired = Math.atan2(this.mouseY - this.canvasHeight / 2, this.mouseX - this.canvasWidth / 2);
                let diff = desired - this.ship.angle;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                // smaller rotation step for smoothness
                this.ship.angle += Math.sign(diff) * Math.min(Math.abs(diff), Math.max(0.04, this.ship.rotationSpeed || 0.08));
            }
            if (player.ir.shipType == 8) {
                // animate wings
                if (typeof this.ship.wingPhase !== "number") this.ship.wingPhase = 0;
                this.ship.wingPhase += 0.12;
                // handle laser firing
                if (this.ship._laserActive) {
                    // Laser follows mouse direction
                    if ((typeof this.mouseX === "number" && typeof this.mouseY === "number") || this.mobileRightStickAngle != null || (player.ir.mobileControls && player.ir.autoShoot)) {
                        let desired = (player.ir.mobileControls) ? -this.mobileRightStickAngle || -this.ship.angle : -Math.atan2(this.mouseY - (this.canvasHeight / 2), this.mouseX - (this.canvasWidth / 2));
                        let diff = desired - (this.ship._laserAngle || 0);
                        while (diff > Math.PI) diff -= 2 * Math.PI;
                        while (diff < -Math.PI) diff += 2 * Math.PI;
                        this.ship._laserAngle = (this.ship._laserAngle || 0) + diff * 0.15;
                        this.ship._laserLength = 750 //Math.min(300, Math.hypot(this.mouseX - (this.canvasWidth / 2), this.mouseY - (this.canvasHeight / 2))) * 3
                    }
                    if (this.ship._laserHitCooldown > 0) this.ship._laserHitCooldown--;
                    if (this.ship._laserActive && this.ship._laserHitCooldown <= 0) {
                        let dmg = this.shipStats.attackDamage;
                        let ang = -this.ship._laserAngle;
                        let ux = Math.cos(ang), uy = Math.sin(ang);
                        let beamLen = Math.max(this.width, this.height) * 1.5;
                        let thickness = (this.ship.radius || 12) * 0.8;
                        // Check enemies
                        for (let enemy of this.enemies.concat(this.asteroids)) {
                            let closest = this.getClosestCoords([enemy.x, enemy.y])
                            let ex = enemy.x - closest[0];
                            let ey = enemy.y - closest[1];
                            if (Math.hypot(ex, ey) > this.ship._laserLength) continue;
                            let proj = ex * ux + ey * uy;
                            let perp = Math.abs(ex * (-uy) + ey * ux);
                            if (proj > -enemy.radius && proj < beamLen && perp < thickness + enemy.radius) {
                                if (!enemy.invulnerable) enemy.health = enemy.health.sub(dmg);
                                SB_celestialites[enemy.type].onAttacked(enemy, dmg, "ship")
                                if (enemy.health.lte(0)) handleEnemyDeath(enemy);
                            }
                        }
                        // Check asteroids
                        for (let a of this.asteroids) {
                            let ax = a.x - this.ship.x;
                            let ay = a.y - this.ship.y;
                            let proj = ax * ux + ay * uy;
                            let perp = Math.abs(ax * (-uy) + ay * ux);
                            if (proj > -a.size && proj < beamLen && perp < thickness + a.size) {
                                a.health -= dmg;
                            }
                        }
                        this.ship._laserHitCooldown = 6;
                    }
                    this.ship._laserTimer++;
                } else {
                    this.ship._laserActive = false;
                }
            }
        
        }
        for (let bullet of this.bullets) {
            // Homing behavior: enemy homing bullets should home to the player;
            // player-fired homing bullets should home to enemies.
            if (bullet.homing) {
                if (bullet.fromEnemy) {
                    // Home to player: compute desired and rotate toward it with clamped turn.
                    let closest = this.getClosestCoords([bullet.x, bullet.y])
                    let desired = Math.atan2(closest[1] - bullet.y, closest[0] - bullet.x);
                    let current = Math.atan2(bullet.vy, bullet.vx);
                    let diff = desired - current;
                    while (diff > Math.PI) diff -= 2 * Math.PI;
                    while (diff < -Math.PI) diff += 2 * Math.PI;
                    let maxTurn = bullet.homingStrength || 0.18;
                    let turn = Math.max(-maxTurn, Math.min(maxTurn, diff));
                    let speed = Math.hypot(bullet.vx, bullet.vy) || 1;
                    let newAngle = current + turn;
                    bullet.vx = Math.cos(newAngle) * speed;
                    bullet.vy = Math.sin(newAngle) * speed;
                } else {
                    // Player-fired homing: seek the nearest enemy
                    if ((!bullet.target || !bullet.target.health.gt(0)) && this.enemies.length) {
                        let closest = null;
                        let closestDist = Infinity;
                        for (let e of this.enemies) {
                            if (e.health.lte(0)) continue;
                            let c = this.getClosestCoords([bullet.x, bullet.y], [e.x, e.y]);
                            let dx = c[0] - this.ship.x;
                            let dy = c[1] - this.ship.y;
                            let d = Math.hypot(dx, dy);
                            if (d < closestDist) {
                                closestDist = d;
                                closest = e;
                            }
                        }
                        bullet.target = closest;
                    }

                    if (bullet.target && bullet.target.health.gt(0)) {
                        let closest = this.getClosestCoords([bullet.target.x, bullet.target.y])
                        let timeToHit = Math.hypot(closest[1] - bullet.y, closest[0] - bullet.x) / (Math.hypot(bullet.vx, bullet.vy) || 1)
                        closest[0] += bullet.target.vx * timeToHit
                        closest[1] += bullet.target.vy * timeToHit

                        let desired = Math.atan2(bullet.target.y - bullet.y, bullet.target.x - bullet.x);
                        let current = Math.atan2(bullet.vy, bullet.vx);
                        let diff = desired - current;
                        while (diff > Math.PI) diff -= 2 * Math.PI;
                        while (diff < -Math.PI) diff += 2 * Math.PI;

                        let maxTurn = bullet.homingStrength || 0.12;
                        let turn = Math.max(-maxTurn, Math.min(maxTurn, diff));
                        let speed = Math.hypot(bullet.vx, bullet.vy) || 1;
                        let newAngle = current + turn;
                        bullet.vx = Math.cos(newAngle) * speed;
                        bullet.vy = Math.sin(newAngle) * speed;
                    }
                }
            }

            bullet.x += bullet.vx;
            bullet.y += bullet.vy;
            if (bullet.x < 0) bullet.x = this.width;
            if (bullet.x > this.width) bullet.x = 0;
            if (bullet.y < 0) bullet.y = this.height;
            if (bullet.y > this.height) bullet.y = 0;
            bullet.life--;

            // Evolver shard edge collision: primary shard breaks into 3 mini shards when hitting arena edge
            if (bullet.evolverShard) {
                if (bullet.x < 0 || bullet.x > this.width || bullet.y < 0 || bullet.y > this.height) {
                    // spawn 4 mini shards
                        for (let k = 0; k < 4; k++) {
                        const ang = Math.random() * Math.PI * 2;
                        const spd = 6 + Math.random() * 4;
                        this.bullets.push({
                            x: Math.max(0, Math.min(this.width, bullet.x)),
                            y: Math.max(0, Math.min(this.height, bullet.y)),
                            vx: Math.cos(ang) * spd,
                            vy: Math.sin(ang) * spd,
                            life: 120,
                            damage: (bullet.damage || 1) * 0.2,
                            pierce: 0,
                            piercedAsteroids: [],
                            piercedEnemies: [],
                            fromEnemy: false,
                            evolverMini: true,
                            radius: 4,
                        });
                    }
                    bullet.life = 0;
                }
            }

            // Massive sword bouncing logic
            if (bullet.massiveSword) {
                bullet.rot = (bullet.rot || 0) + (bullet.rotSpd || 0.15);
                // bounce on edges without damping for the massive sword
                if (bullet.x < 0) { bullet.x = 0; bullet.vx = -bullet.vx; }
                if (bullet.x > this.width) { bullet.x = this.width; bullet.vx = -bullet.vx; }
                if (bullet.y < 0) { bullet.y = 0; bullet.vy = -bullet.vy; }
                if (bullet.y > this.height) { bullet.y = this.height; bullet.vy = -bullet.vy; }
            }
            // mini evolver shards bounce off edges until they hit an enemy
            if (bullet.evolverMini) {
                if (bullet.x < 0) { bullet.x = 0; bullet.vx = -bullet.vx * 0.9; }
                if (bullet.x > this.width) { bullet.x = this.width; bullet.vx = -bullet.vx * 0.9; }
                if (bullet.y < 0) { bullet.y = 0; bullet.vy = -bullet.vy * 0.9; }
                if (bullet.y > this.height) { bullet.y = this.height; bullet.vy = -bullet.vy * 0.9; }
                // slight damping to avoid infinite bouncing
                bullet.vx *= 0.998;
                bullet.vy *= 0.998;
            }
        }

        // Asteroid spawning (disabled in hard mode or while boss active)
        if (!this.bossActive) {
            this.asteroidSpawnTimer++;
            if (this.asteroidSpawnTimer > 30) {
                this.asteroidSpawnTimer = 0;
                SB_spawnNaturalAsteroid()
            }
        }

        // Enemy spawning (Alpha, Beta, Gamma + hard-mode types when active) with cooldown
        // TEMP
        if ((player.ir.battleLevel.gte(3) || player.ir.battleStage == "iriditeZone" || player.ir.battleStage == "spaceZone4" || player.ir.battleStage == "bloodZone1" || player.ir.battleStage == "noxZone") && !this.bossActive) {
            let aliveEnemies = this.enemies.concat(this.asteroids).filter(e => e.alive).length;
            if (this.enemySpawnCooldown > 0) {
                this.enemySpawnCooldown--;
            }
            if (this.enemySpawnCooldown <= 0) {
                SB_spawnNaturalCelestialite()
            }
        }

        // Update enemies
        for (let enemy of this.enemies.concat(this.asteroids)) {
            enemy.health = enemy.health.add(enemy.regen.div(60)).min(enemy.maxHealth)
            SB_celestialites[enemy.type].tick(enemy)
            if (enemy.type === "iriditeBoss") {
                // If the asteroid minigame is paused, also pause Iridite boss actions
                if (this._asteroidMinigamePaused) {
                    // Skip AI updates for the boss while paused (keeps current position/state)
                    continue;
                }
                player.ir.iriditePhase = enemy.phase


                // ensure wingPhase exists and animate it (controls flap)
                if (typeof enemy.wingPhase !== "number") enemy.wingPhase = Math.random() * Math.PI * 2;
                // speed scales subtly with phase so later phases flap a bit faster
                enemy.wingPhase += 0.16 + enemy.phase * 0.02;
                if (enemy.wingPhase > 1e9) enemy.wingPhase = enemy.wingPhase % (Math.PI * 2);

                // Phase management based on remaining health
                const pct = enemy.health / enemy.maxHealth;
                let newPhase = 1;
                if (pct <= 0.4) newPhase = 4;
                else if (pct <= 0.6) newPhase = 3;
                else if (pct <= 0.8) newPhase = 2;
                if (newPhase !== enemy.phase) {
                    enemy.phase = newPhase;
                    enemy.state = "idle";
                    enemy.attackTimer = 150;
                    // change some parameters by phase
                    if (enemy.phase === 2) { enemy.dashDistance = 260; enemy.dashSpeed = 8; }
                    if (enemy.phase === 3) { enemy.dashDistance = 320; enemy.dashSpeed = 10; }
                    if (enemy.phase === 4) { enemy.dashDistance = 420; enemy.dashSpeed = 12; }
                }

                // decide next action if idle and not currently dashing
                if (!enemy.dashing && enemy.state === "idle") {
                    enemy.attackTimer--;
                    if (enemy.attackTimer <= 0) {
                        let r = Math.random();
                        let dr = ((dist - 400) / 1600);
                        // make dagger and shortBurst available in all phases;
                        // add laser possibility in phase 3+
                        if (enemy.phase === 1) {
                            if (Math.random() < dr) enemy.state = "lunge";
                            else if (r < 0.3) enemy.state = "dagger"; // 30%
                            else if (r < 0.5) enemy.state = "homing"; // 20%
                            else if (r < 0.75) enemy.state = "radial"; // 25%
                            else enemy.state = "shortBurst"; // 25%
                        } else if (enemy.phase === 2) {
                            if (Math.random() < dr) enemy.state = "lunge";
                            else if (r < 0.25) enemy.state = "dagger"; // 25%
                            else if (r < 0.4) enemy.state = "homing"; // 15%
                            else if (r < 0.6) enemy.state = "radial"; // 20%
                            else if (r < 0.8) enemy.state = "shortBurst"; // 20%
                            else enemy.state = "raining"; // 20%
                        } else if (enemy.phase === 3) {
                            if (r < 0.2) enemy.state = "homing";
                            else if (r < 0.38) enemy.state = "raining";
                            else if (r < 0.54) enemy.state = "dagger";
                            else if (r < 0.64) enemy.state = "burst";
                            else if (r < 0.72) enemy.state = "giant";
                            else if (r < 0.8) enemy.state = "laser";
                            else enemy.state = "lunge";
                        } else {
                            // phase 4 (very aggressive)
                            if (r < 0.08) enemy.state = "homing";
                            else if (r < 0.18) enemy.state = "raining";
                            else if (r < 0.34) enemy.state = "dagger";
                            else if (r < 0.54) enemy.state = "burst";
                            else if (r < 0.66) enemy.state = "giant";
                            else if (r < 0.88) enemy.state = "laser";
                            else enemy.state = "lunge";
                        }

                        // setup counters / targets for chosen attack
                        if (enemy.state === "radial") {
                            enemy.radialShotsRemaining = 2 + enemy.phase;
                            enemy._actionCooldown = 9;
                        } else if (enemy.state === "homing") {
                            enemy.homingShotsRemaining = 3 + Math.floor(enemy.phase);
                            enemy._actionCooldown = 18;
                        } else if (enemy.state === "dashSequence") {
                            enemy.dashSeqRemaining = 2 + enemy.phase;
                            enemy._dashState = "prepare";
                            enemy._actionCooldown = 6;
                            enemy.dashing = true;
                            enemy._dashTargets = [];
                            const margin = Math.max(80, enemy.radius + 40);
                            for (let i = 0; i < enemy.dashSeqRemaining; i++) {
                                let tx = margin + Math.random() * (this.width - margin * 2);
                                let ty = margin + Math.random() * (this.height - margin * 2);
                                enemy._dashTargets.push({ x: tx, y: ty });
                            }
                            enemy.dashSpeed = Math.max(8, (enemy.phase * 1) + 8);
                            enemy._dashTimer = 300;
                        } else if (enemy.state === "lunge") {
                            enemy._lungeTimer = 40 + Math.floor(enemy.phase * 6); // frames lunge lasts
                        } else if (enemy.state === "raining") {
                            enemy._rainingTimer = 240 + enemy.phase * 60; // total raining duration
                            enemy._rainingInterval = Math.max(6, 18 - enemy.phase * 2);
                        } else if (enemy.state === "dagger") {
                            // choose dagger variation: legacy arena-lines or converge-circle (phase>=2)
                            enemy._daggerPrep = 48;
                            enemy._daggerFired = false;
                            enemy._daggerLines = [];
                            enemy._daggerConverge = null;
                            // 60% chance to do converging circle when phase >= 2
                            if (enemy.phase >= 2 && Math.random() < 0.60) {
                                enemy._daggerConverge = { point: null, origins: [], prep: enemy._daggerPrep };
                            }
                            // prep counters used later
                        } else if (enemy.state === "giant") {
                            // Giant bouncing-star attack setup
                            enemy._giantPrep = 54;
                            enemy._giantFired = false;
                            enemy._giantLines = [];
                            enemy._giantLife = 260 + Math.floor(enemy.phase * 40); // exist for a few seconds
                            enemy._giantSpeed = 8 + enemy.phase * 1.2;
                            // plan 5 directions around player
                            let count = 5;
                            for (let i = 0; i < count; i++) {
                                let baseAng = ang + (i - (count - 1) / 2) * 0.28 + (Math.random() - 0.5) * 0.18;
                                let cosA = Math.cos(baseAng), sinA = Math.sin(baseAng);
                                let cx = enemy.x, cy = enemy.y;
                                let ts = [];
                                if (Math.abs(cosA) > 1e-6) {
                                    ts.push((0 - cx) / cosA);
                                    ts.push((this.width - cx) / cosA);
                                }
                                if (Math.abs(sinA) > 1e-6) {
                                    ts.push((0 - cy) / sinA);
                                    ts.push((this.height - cy) / sinA);
                                }
                                ts = ts.filter(t => isFinite(t));
                                if (ts.length < 2) ts = [-1000, 1000];
                                let tMin = Math.min(...ts), tMax = Math.max(...ts);
                                let x1 = cx + cosA * tMin, y1 = cy + sinA * tMin;
                                let x2 = cx + cosA * tMax, y2 = cy + sinA * tMax;
                                enemy._giantLines.push({ x1, y1, x2, y2, timer: enemy._giantPrep, ang });
                            }
                        } else if (enemy.state === "shortBurst") {
                            enemy._shortBurstShots = 2 + Math.floor(enemy.phase / 2);
                            enemy._actionCooldown = 10;
                        } else if (enemy.state === "burst") {
                            enemy._burstShots = 2; // shoot shotgun twice
                            enemy._actionCooldown = 10;
                        } else if (enemy.state === "laser") {
                            // laser duration and rotation speed
                            enemy._laserTimer = 180 + enemy.phase * 40; // frames total (3s +)
                            enemy._laserActive = false;
                            enemy._laserAngle = Math.atan2(closest[1] - enemy.y, closest[0] - enemy.x);
                            enemy._laserSpin = (Math.random() < 0.5 ? 1 : -1) * (0.006 + enemy.phase * 0.004); // radians/frame
                            enemy._laserHitCooldown = 0;
                        }
                    }
                }

                // Radial volley
                if (enemy.state === "radial") {
                    if (enemy._actionCooldown <= 0) {
                        let pieces = 14 + enemy.phase * 2;
                        let baseSpread = (enemy.phase >= 3) ? 0.5 : 0;
                        for (let i = 0; i < pieces; i++) {
                            let baseAng = (i / pieces) * Math.PI * 2 + (Math.random() - 0.5) * baseSpread;
                            let spd = 6;
                            this.bullets.push({
                                x: enemy.x + Math.cos(baseAng) * (enemy.radius - 6),
                                y: enemy.y + Math.sin(baseAng) * (enemy.radius - 6),
                                vx: Math.cos(baseAng) * spd,
                                vy: Math.sin(baseAng) * spd,
                                life: 240,
                                damage: 5,
                                pierce: 0,
                                fromEnemy: true,
                                homing: false,
                                star: true
                            });
                        }
                        enemy.radialShotsRemaining--;
                        enemy._actionCooldown = 12;
                    } else {
                        enemy._actionCooldown--;
                    }
                    if (enemy.radialShotsRemaining <= 0) {
                        enemy.state = "idle";
                        enemy.attackTimer = 60 - enemy.phase * 10;
                    }
                }

                // Homing volley (enemy homing bullets that target the player)
                if (enemy.state === "homing") {
                    if (enemy._actionCooldown <= 0) {
                        // spawn homing projectile aimed at player (initial direction toward player)
                        let ang = Math.atan2(closest[1] - enemy.y, closest[0] - enemy.x) + (Math.random() - 0.5) * 0.12;
                        let spd = 3.5; // stronger initial speed
                        // normalize (defensive) and set vx/vy
                        let vx = Math.cos(ang) * spd;
                        let vy = Math.sin(ang) * spd;
                        this.bullets.push({
                            x: enemy.x + Math.cos(ang) * (enemy.radius - 8),
                            y: enemy.y + Math.sin(ang) * (enemy.radius - 8),
                            vx: vx,
                            vy: vy,
                            life: 250,
                            damage: 5,
                            pierce: 0,
                            fromEnemy: true,
                            homing: true,
                            homingToPlayer: true, // explicit: these home to player
                            homingStrength: 0.16 + enemy.phase * 0.02, // allow faster turn to avoid orbit
                            star: true,
                            size: 20 // drawing hint for larger homing projectile
                        });
                        enemy.homingShotsRemaining--;
                        enemy._actionCooldown = 14;
                    } else {
                        enemy._actionCooldown--;
                    }
                    if (enemy.homingShotsRemaining <= 0) {
                        enemy.state = "idle";
                        enemy.attackTimer = 60 - enemy.phase * 10;
                    }
                }
                // --- Lunge: single directed dash toward player (any phase) ---
                if (enemy.state === "lunge") {
                    // End lunge if close to the player
                    if (dist < 150) {
                        enemy.state = "idle";
                        enemy.attackTimer = 60 - enemy.phase * 10;
                        enemy._lungeHit = 0;
                    }
                    if (enemy._lungeTimer > 0) {
                        // compute normalized direction to player
                        let strength = 6 + enemy.phase * 1.5; // per-frame movement
                        let vx = (dx / dist) * strength;
                        let vy = (dy / dist) * strength;
                        enemy.x += vx;
                        enemy.y += vy;

                        // light contact damage while lunging (once per hit cooldown)
                        let shipRadius = player.ir.shipType == 3 || player.ir.shipType == 7 ? this.ship.radius : 12;
                        let sdx = closest[0] - enemy.x;
                        let sdy = closest[1] - enemy.y;
                        let sdist = Math.hypot(sdx, sdy);
                        if (sdist < enemy.radius + shipRadius) {
                            if (!enemy._lungeHit) {
                                enemy._lungeHit = 18; // few frames cooldown
                                let impactDmg = (6 + enemy.phase * 3) / this.shipStats.damageReduction;
                                this.applyShipDamage(impactDmg);
                            }
                        }
                        if (enemy._lungeHit && enemy._lungeHit > 0) enemy._lungeHit--;

                        enemy._lungeTimer--;
                    } else {
                        enemy.state = "idle";
                        enemy.attackTimer = 60 - enemy.phase * 10;
                        enemy._lungeHit = 0;
                    }
                }

                // --- Raining stars (phase 2+) : spawn many falling star projectiles from top ---
                if (enemy.state === "raining") {
                    if (enemy._rainingTimer > 0) {
                        enemy._rainingTimer--;
                        enemy._rainingInterval--;
                        if (enemy._rainingInterval <= 0) {
                            enemy._rainingInterval = Math.max(6, 18 - enemy.phase * 2);
                            // spawn a small cluster each tick
                            let count = 2 + Math.floor(enemy.phase / 2);
                            for (let i = 0; i < count; i++) {
                                let rPos = Math.random() - 0.5
                                let rAng = Math.random() - 0.5
                                let sx = enemy.x + (rPos * 1200 * Math.cos(ang + (Math.PI/2))) - (600 * Math.cos(ang));
                                let sy = enemy.y + (rPos * 1200 * Math.sin(ang + (Math.PI/2))) - (600 * Math.sin(ang));
                                let vx = Math.cos(ang + (rAng * 0.125 * Math.PI)) * 6;
                                let vy = Math.sin(ang + (rAng * 0.125 * Math.PI)) * 6;
                                this.bullets.push({
                                    x: sx,
                                    y: sy,
                                    vx: vx,
                                    vy: vy,
                                    life: 600,
                                    damage: 4 + enemy.phase,
                                    pierce: 0,
                                    fromEnemy: true,
                                    homing: false,
                                    star: true
                                });
                            }
                        }
                    } else {
                        enemy.state = "idle";
                        enemy.attackTimer = 60 - enemy.phase * 10;
                    }
                }

                // --- Dagger attack (phase 2+): warn with red lines across arena, or converge-circle variant ---
                if (enemy.state === "dagger") {
                    // CONVERGE VARIANT: spawn many dagger origins around perimeter that aim at one converge point
                    if (enemy._daggerConverge) {
                        if (!enemy._daggerConverge.point) {
                            // choose a random interior converge point (biased toward player)
                            const jitter = 80;
                            const cx = Math.max(80, Math.min(this.width - 80, closest[0] + (Math.random() - 0.5) * jitter));
                            const cy = Math.max(80, Math.min(this.height - 80, closest[1] + (Math.random() - 0.5) * jitter));
                            enemy._daggerConverge.point = { x: cx, y: cy };
                            // choose origins around the arena edge
                            const originCount = 8 + Math.floor(enemy.phase * 2);
                            enemy._daggerConverge.origins = [];
                            for (let i = 0; i < originCount; i++) {
                                let side = i % 4;
                                let ox = 0, oy = 0;
                                if (side === 0) { ox = Math.random() * this.width; oy = -20 - Math.random() * 40; }
                                if (side === 1) { ox = this.width + 20 + Math.random() * 40; oy = Math.random() * this.height; }
                                if (side === 2) { ox = Math.random() * this.width; oy = this.height + 20 + Math.random() * 40; }
                                if (side === 3) { ox = -20 - Math.random() * 40; oy = Math.random() * this.height; }
                                enemy._daggerConverge.origins.push({ x: ox, y: oy, timer: enemy._daggerPrep });
                            }
                        }

                        // countdown prep, flash converge point and origins (these are the red warning lines)
                        if (enemy._daggerPrep > 0) {
                            enemy._daggerPrep--;
                            for (let o of enemy._daggerConverge.origins) o.timer = enemy._daggerPrep;
                        } else if (!enemy._daggerFired) {
                            // spawn daggers from each origin converging toward point
                            const tgt = enemy._daggerConverge.point;
                            for (let o of enemy._daggerConverge.origins) {
                                let dx = tgt.x - o.x, dy = tgt.y - o.y;
                                let dist = Math.hypot(dx, dy) || 1;
                                let nx = dx / dist, ny = dy / dist;
                                let spd = 10 + enemy.phase * 1.4;
                                this.bullets.push({
                                    x: o.x,
                                    y: o.y,
                                    vx: nx * spd,
                                    vy: ny * spd,
                                    life: Math.floor(dist / spd) + 90,
                                    damage: 8 + enemy.phase * 4,
                                    pierce: 0,
                                    fromEnemy: true,
                                    dagger: true,
                                    star: true,
                                    daggerLine: { x1: o.x, y1: o.y, x2: tgt.x, y2: tgt.y }
                                });
                            }
                            enemy._daggerFired = true;
                            enemy._daggerEndDelay = 36;
                        } else {
                            enemy._daggerEndDelay--;
                            if (enemy._daggerEndDelay <= 0) {
                                enemy._daggerConverge = null;
                                enemy._daggerFired = false;
                                enemy.state = "idle";
                                enemy.attackTimer = 50 - enemy.phase * 8;
                            }
                        }
                    } else {
                        // legacy line-based dagger across arena (single-line warnings then dagger along line)
                        if (!enemy._daggerLines || enemy._daggerLines.length === 0) {
                            enemy._daggerLines = [];
                            let lineCount = 2 + Math.min(5, Math.floor(enemy.phase) + 1);
                            enemy._daggerPrep = 48;
                            for (let i = 0; i < lineCount; i++) {
                                let base = Math.atan2(closest[1] - enemy.y, closest[0] - enemy.x);
                                let baseAng = base + (Math.random() - 0.5) * 1.2 + (i - (lineCount - 1) / 2) * 0.18;
                                let cosA = Math.cos(baseAng), sinA = Math.sin(baseAng);
                                let cx = enemy.x, cy = enemy.y;
                                let ts = [];
                                if (Math.abs(cosA) > 1e-6) {
                                    ts.push((0 - cx) / cosA);
                                    ts.push((this.width - cx) / cosA);
                                }
                                if (Math.abs(sinA) > 1e-6) {
                                    ts.push((0 - cy) / sinA);
                                    ts.push((this.height - cy) / sinA);
                                }
                                ts = ts.filter(t => isFinite(t));
                                if (ts.length < 2) { ts = [-1000, 1000]; cosA = 1; sinA = 0; }
                                let tMin = Math.min(...ts), tMax = Math.max(...ts);
                                let x1 = cx + cosA * tMin, y1 = cy + sinA * tMin;
                                let x2 = cx + cosA * tMax, y2 = cy + sinA * tMax;
                                enemy._daggerLines.push({ x1, y1, x2, y2, timer: enemy._daggerPrep });
                            }
                            enemy._daggerFired = false;
                        }

                        if (enemy._daggerPrep > 0) {
                            enemy._daggerPrep--;
                            for (let ln of enemy._daggerLines) ln.timer = enemy._daggerPrep;
                        } else if (!enemy._daggerFired) {
                            for (let ln of enemy._daggerLines) {
                                let daggerPerLine = 1 + Math.floor(enemy.phase / 1);
                                let dx = ln.x2 - ln.x1, dy = ln.y2 - ln.y1;
                                let dist = Math.hypot(dx, dy) || 1;
                                let nx = dx / dist, ny = dy / dist;
                                for (let k = 0; k < daggerPerLine; k++) {
                                    let startT = (k + 0.5) / daggerPerLine;
                                    let sx = ln.x1 + nx * dist * (startT * 0.2);
                                    let sy = ln.y1 + ny * dist * (startT * 0.2);
                                    let spd = 10 + enemy.phase * 1.2;
                                    this.bullets.push({
                                        x: sx,
                                        y: sy,
                                        vx: nx * spd,
                                        vy: ny * spd,
                                        life: Math.floor(dist / spd) + 120,
                                        damage: 9 + enemy.phase * 4,
                                        pierce: 0,
                                        fromEnemy: true,
                                        dagger: true,
                                        star: true,
                                        daggerLine: { x1: ln.x1, y1: ln.y1, x2: ln.x2, y2: ln.y2 }
                                    });
                                }
                            }
                            enemy._daggerFired = true;
                            enemy._daggerEndDelay = 30;
                        } else {
                            enemy._daggerEndDelay--;
                            if (enemy._daggerEndDelay <= 0) {
                                enemy._daggerLines = [];
                                enemy._daggerFired = false;
                                enemy.state = "idle";
                                enemy.attackTimer = 80 - enemy.phase * 12;
                            }
                        }
                    }
                }

                // --- Giant bouncing-star attack logic ---
                if (enemy.state === "giant") {
                    if (enemy._giantPrep > 0) {
                        enemy._giantPrep--;
                        for (let ln of enemy._giantLines) ln.timer = enemy._giantPrep;
                    } else if (!enemy._giantFired) {
                        for (let ln of enemy._giantLines) {
                            let ang = ln.ang || Math.atan2(ln.y2 - ln.y1, ln.x2 - ln.x1);
                            let spd = enemy._giantSpeed || 8;
                            let bx = enemy.x + Math.cos(ang) * (enemy.radius - 8);
                            let by = enemy.y + Math.sin(ang) * (enemy.radius - 8);
                            let life = enemy._giantLife || 240;
                            this.bullets.push({
                                x: bx,
                                y: by,
                                vx: Math.cos(ang) * spd,
                                vy: Math.sin(ang) * spd,
                                life: life,
                                _maxLife: life,
                                damage: 6 + enemy.phase * 3,
                                pierce: 0,
                                fromEnemy: true,
                                giant: true,
                                star: true,
                                radius: 18,
                            });
                        }
                        enemy._giantFired = true;
                        enemy._giantEndDelay = 120;
                    } else {
                        enemy._giantEndDelay--;
                        if (enemy._giantEndDelay <= 0) {
                            enemy._giantLines = [];
                            enemy._giantFired = false;
                            enemy.state = "idle";
                            enemy.attackTimer = 90 - enemy.phase * 14;
                        }
                    }
                }

                // --- Short Burst: quick aimed volleys at the player (all phases) ---
                if (enemy.state === "shortBurst") {
                    if (enemy._shortBurstShots > 0) {
                        if (enemy._actionCooldown <= 0) {
                            let base = Math.atan2(closest[1] - enemy.y, closest[0] - enemy.x);
                            let pellets = 6 + Math.floor(enemy.phase * 1.5);
                            let spread = 0.28 - enemy.phase * 0.02;
                            let speed = 10 + enemy.phase * 0.6;
                            for (let i = 0; i < pellets; i++) {
                                let offset = (i / (pellets - 1) - 0.5) * spread + (Math.random() - 0.5) * 0.02;
                                let ang = base + offset;
                                this.bullets.push({
                                    x: enemy.x + Math.cos(ang) * (enemy.radius - 8),
                                    y: enemy.y + Math.sin(ang) * (enemy.radius - 8),
                                    vx: Math.cos(ang) * speed,
                                    vy: Math.sin(ang) * speed,
                                    life: 200,
                                    damage: 5 + Math.floor(enemy.phase * 1.2),
                                    pierce: 0,
                                    fromEnemy: true,
                                    homing: false,
                                    star: true
                                });
                            }
                            enemy._shortBurstShots--;
                            enemy._actionCooldown = 16;
                        } else {
                            enemy._actionCooldown--;
                        }
                    } else {
                        enemy.state = "idle";
                        enemy.attackTimer = 60 - enemy.phase * 9;
                    }
                }

                // --- Laser attack (phase 3+): rotating sustained beam that damages along its line ---
                if (enemy.state === "laser") {
                    if (enemy._laserTimer > 0) {
                        // start active after brief windup
                        if (!enemy._laserActive && enemy._laserTimer < (180 + enemy.phase * 40) - 8) {
                            enemy._laserActive = true;
                        }
                        // rotate beam angle
                        enemy._laserAngle += enemy._laserSpin;
                        // damage check once per few frames using cooldown
                        if (enemy._laserHitCooldown > 0) enemy._laserHitCooldown--;
                        // check ship intersection with beam (in world space)
                        if (enemy._laserActive && enemy._laserHitCooldown <= 0) {
                            // compute perpendicular distance to beam line
                            let bx = closest[0] - enemy.x;
                            let by = closest[1] - enemy.y;
                            let ang = enemy._laserAngle;
                            let ux = Math.cos(ang), uy = Math.sin(ang);
                            // projection along beam
                            let proj = bx * ux + by * uy;
                            // perpendicular distance
                            let perp = Math.abs(bx * (-uy) + by * ux);
                            // beam effective length and thickness
                            let beamLen = Math.max(this.width, this.height) * 1.5;
                            let thickness = enemy.radius * 0.9;
                            if (proj > -enemy.radius && proj < beamLen && perp < thickness + (player.ir.shipType == 3 || player.ir.shipType == 7 ? this.ship.radius : 12)) {
                                // apply damage once per short cooldown
                                let dmg = (6 + enemy.phase * 1) / this.shipStats.damageReduction;
                                this.applyShipDamage(dmg);
                                enemy._laserHitCooldown = 8; // frames between hits
                            }
                        }
                        enemy._laserTimer--;
                    } else {
                        // laser finished
                        enemy._laserActive = false;
                        enemy.state = "idle";
                        enemy.attackTimer = 140 - enemy.phase * 16;
                    }
                }

                // --- Burst attack (phase 3+): shotgun burst toward player, repeated twice ---
                if (enemy.state === "burst") {
                    if (enemy._burstShots > 0) {
                        if (enemy._actionCooldown <= 0) {
                            // spawn shotgun spread aimed at player
                            let base = Math.atan2(closest[1] - enemy.y, closest[0] - enemy.x);
                            let pellets = 7 + enemy.phase; // number of pellets
                            let spread = 0.36; // total spread radians
                            let speed = 9 + enemy.phase * 0.6;
                            for (let i = 0; i < pellets; i++) {
                                let offset = (i / (pellets - 1) - 0.5) * spread;
                                let ang = base + offset + (Math.random() - 0.5) * 0.03;
                                this.bullets.push({
                                    x: enemy.x + Math.cos(ang) * (enemy.radius - 8),
                                    y: enemy.y + Math.sin(ang) * (enemy.radius - 8),
                                    vx: Math.cos(ang) * speed,
                                    vy: Math.sin(ang) * speed,
                                    life: 220,
                                    damage: 5 + enemy.phase * 1,
                                    pierce: 0,
                                    fromEnemy: true,
                                    homing: false,
                                    star: true
                                });
                            }
                            enemy._burstShots--;
                            enemy._actionCooldown = 12;
                        } else {
                            enemy._actionCooldown--;
                        }
                    } else {
                        enemy.state = "idle";
                        enemy.attackTimer = 80 - enemy.phase * 9;
                    }
                }
                // Dash sequence using precomputed random targets
                if (enemy.dashing) {

                    if (!enemy._dashState) enemy._dashState = "prepare";

                    // In dash 'prepare' select next target and compute direction
                    if (enemy._dashState === "prepare") {
                        // If the global dash timer expired, end dash sequence immediately
                        if (typeof enemy._dashTimer === "number" && enemy._dashTimer <= 0) {
                            enemy.dashing = false;
                            enemy._dashState = null;
                            enemy._dashVel = null;
                            enemy.state = "idle";
                            enemy.attackTimer = 120 - enemy.phase * 12;
                        } else {
                            let targetPos = null;
                            if (enemy._dashTargets && enemy._dashTargets.length > 0) {
                                targetPos = enemy._dashTargets.shift();
                            } else {
                                targetPos = { x: closest[0], y: closest[1] };
                            }
                            enemy._dashDir = { x: dx / dist, y: dy / dist };
                            // store target pos & remaining distance so we can know when to pick next
                            enemy._dashTargetPos = targetPos;
                            enemy._dashRemainingDistance = dist;
                            // set continuous dash velocity similar to gamma/delta behavior (no trails)
                            enemy._dashVel = { x: enemy._dashDir.x * (enemy.dashSpeed || 36), y: enemy._dashDir.y * (enemy.dashSpeed || 36) };
                            enemy._dashState = "moving";
                            // lock state so boss doesn't pick other attacks mid-dash
                            enemy.state = "dashing";
                        }
                    }

                    // moving: apply continuous velocity each update frame (like gamma/delta)
                    if (enemy._dashState === "moving") {
                        // global dash timer tick
                        if (typeof enemy._dashTimer === "number") enemy._dashTimer--;

                        // move by dash velocity
                        enemy.x += enemy._dashVel.x;
                        enemy.y += enemy._dashVel.y;

                        // decrement remaining distance toward current target
                        let moved = Math.hypot(enemy._dashVel.x, enemy._dashVel.y) || 0;
                        enemy._dashRemainingDistance -= moved;

                        // contact damage (apply once per collision and immediately knockback & damage)
                        let sx = closest[0] - enemy.x;
                        let sy = closest[1] - enemy.y;
                        let sdist = Math.hypot(sx, sy);
                        let shipRadius = player.ir.shipType == 3 || player.ir.shipType == 7 ? this.ship.radius : 12;
                        if (sdist < enemy.radius + shipRadius) {
                            // prevent fast repeated damage by using a short cooldown flag on enemy
                            if (!enemy._recentlyHit) {
                                enemy._recentlyHit = 6; // frames of invuln for player from this contact
                                // reduced dash damage to make attack less violent
                                let impactDmg = (5) / this.shipStats.damageReduction;
                                this.applyShipDamage(impactDmg);
                                // reduced knockback
                                let kn = Math.atan2(closest[1] - enemy.y, closest[0] - enemy.x);
                                if (player.ir.shipType == 3 || player.ir.shipType == 7) {
                                    this.ship.vx += Math.cos(kn) * 6;
                                    this.ship.vy += Math.sin(kn) * 6;
                                } else {
                                    closest[0] += Math.cos(kn) * 4;
                                    closest[1] += Math.sin(kn) * 4;
                                }
                                if (player.ir.shipHealth.lte(0)) this.onShipDeath();
                            }
                        }
                        // reduce hit cooldown counter
                        if (enemy._recentlyHit && enemy._recentlyHit > 0) enemy._recentlyHit--;

                        // If we've reached the current dash target, count one dash done and prepare next
                        if (enemy._dashRemainingDistance <= 0) {
                            enemy.dashSeqRemaining--;
                            // If the global dash timer expired or no more dashes left, stop
                            if ((typeof enemy._dashTimer === "number" && enemy._dashTimer <= 0) || enemy.dashSeqRemaining <= 0) {
                                enemy.dashing = false;
                                enemy._dashState = null;
                                enemy._dashVel = null;
                                enemy.state = "idle";
                                enemy.attackTimer = 100 - enemy.phase * 14;
                            } else {
                                // prepare next dash target immediately
                                enemy._dashState = "prepare";
                            }
                        }

                        // If the global dash timer expired mid-dash, stop immediately
                        if (typeof enemy._dashTimer === "number" && enemy._dashTimer <= 0) {
                            enemy.dashing = false;
                            enemy._dashState = null;
                            enemy._dashVel = null;
                            enemy.state = "idle";
                            enemy.attackTimer = 100 - enemy.phase * 14;
                        }
                    }

                }

                // Follow player when idle (instead of drifting to center)
                if (!enemy.dashing && enemy.state === "idle") {
                    let dx = closest[0] - enemy.x;
                    let dy = closest[1] - enemy.y;
                    let dist = Math.hypot(dx, dy) || 1;
                    // follow speed small; slightly increase by phase so later phases close gap faster
                    let followSpeed = 0.5 + enemy.phase * 0.25;
                    enemy.x += (dx / dist) * followSpeed;
                    enemy.y += (dy / dist) * followSpeed;
                    // subtle jitter so movement looks organic
                    if (!enemy.wanderAngle) enemy.wanderAngle = Math.random() * Math.PI * 2;
                    enemy.wanderAngle += (Math.random() - 0.5) * 0.01;
                }

                // continue to next enemy after special boss handling
                enemy.x = ((enemy.x % this.width) + this.width) % this.width
                enemy.y = ((enemy.y % this.height) + this.height) % this.height
                continue;
            }

            // Generic wander updates
            SB_updateMovement(enemy)

            // --- UFO Miniboss behavior ---
            if (enemy.type === "ufoBoss") {
                // Hovering: maintain an orbit distance ~220 from player
                let dx = closest[0] - enemy.x;
                let dy = closest[1] - enemy.y;
                let dist = Math.hypot(dx, dy) || 1;
                let desiredDist = 220;
                // Move toward or away to keep distance
                let moveSpeed = 2.5;
                if (dist > desiredDist + 10) {
                    enemy.vx = (dx / dist) * moveSpeed;
                    enemy.vy = (dy / dist) * moveSpeed;
                } else if (dist < desiredDist - 10) {
                    enemy.vx = -(dx / dist) * moveSpeed;
                    enemy.vy = -(dy / dist) * moveSpeed;
                } else {
                    // small orbit / wobble
                    let wobble = 0.02;
                    enemy.wanderAngle += (Math.random() - 0.5) * wobble;
                    enemy.vx = Math.cos(enemy.wanderAngle) * 0.8;
                    enemy.vy = Math.sin(enemy.wanderAngle) * 0.8;
                }
                // Apply movement unless dashing (dash overrides)
                if (!enemy.dashing) {
                    enemy.x += enemy.vx;
                    enemy.y += enemy.vy;
                }
                // Attack state machine
                enemy.attackTimer--;
                if (!enemy.dashing && enemy.attackTimer <= 0 && enemy.state === "idle") {
                    // pick an attack
                    let r = Math.random();
                    if (r < 0.6) {
                        enemy.state = "burst";
                        enemy.burstShots = 6;
                    }  else {
                        enemy.state = "spin";
                        enemy.spinTimer = 90;
                        enemy.spinAngle = 0;
                    }
                }
                // Burst: shoot a short burst aimed at player
                if (enemy.state === "burst") {
                    if (enemy.burstShots > 0 && (enemy.burstIntervalCounter === undefined || enemy.burstIntervalCounter <= 0)) {
                        enemy.burstIntervalCounter = enemy.burstInterval;
                        // shoot a spread toward player
                        let base = Math.atan2(closest[1] - enemy.y, closest[0] - enemy.x);
                        let spread = 0.24;
                        let bulletsThisShot = 3;
                        for (let i = 0; i < bulletsThisShot; i++) {
                            let offset = (i / (bulletsThisShot - 1) - 0.5) * spread;
                            let ang = base + offset;
                            let spd = this.enemyTypes.ufoBoss.bulletSpeed;
                            this.bullets.push({
                                x: enemy.x + Math.cos(ang) * enemy.radius,
                                y: enemy.y + Math.sin(ang) * enemy.radius,
                                vx: Math.cos(ang) * spd,
                                vy: Math.sin(ang) * spd,
                                life: 120,
                                damage: 5,
                                pierce: 0,
                                piercedAsteroids: [],
                                fromEnemy: true,
                            });
                        }
                        enemy.burstShots--;
                    }
                    if (enemy.burstIntervalCounter !== undefined) enemy.burstIntervalCounter--;
                    if (enemy.burstShots <= 0 && enemy.burstIntervalCounter <= 0) {
                        enemy.state = "idle";
                        enemy.attackTimer = 70;
                    }
                }
                // Spin: rotate and spray bullets in 360 over time
                if (enemy.state === "spin") {
                    // spawn a handful of bullets each frame at current spinAngle
                    let bulletsPerFrame = 1;
                    for (let i = 0; i < bulletsPerFrame; i++) {
                        let ang = enemy.spinAngle + (i / bulletsPerFrame) * (Math.PI * 2);
                        let spd = 6;
                        this.bullets.push({
                            x: enemy.x + Math.cos(ang) * (enemy.radius - 6),
                            y: enemy.y + Math.sin(ang) * (enemy.radius - 6),
                            vx: Math.cos(ang) * spd,
                            vy: Math.sin(ang) * spd,
                            life: 120,
                            damage: 6,
                            pierce: 0,
                            piercedAsteroids: [],
                            fromEnemy: true
                        });
                    }
                    // advance spin angle to rotate spray
                    enemy.spinAngle += 0.125;
                    enemy.spinTimer--;
                    if (enemy.spinTimer <= 0) {
                        enemy.state = "idle";
                        enemy.attackTimer = 100;
                    }
                }
                // Keep UFO inside arena bounds (simple clamp)
                if (enemy.x < enemy.radius) enemy.x = enemy.radius;
                if (enemy.x > this.width - enemy.radius) enemy.x = this.width - enemy.radius;
                if (enemy.y < enemy.radius) enemy.y = enemy.radius;
                if (enemy.y > this.height - enemy.radius) enemy.y = this.height - enemy.radius;
                // continue to next enemy handling
                enemy.x = ((enemy.x % this.width) + this.width) % this.width
                enemy.y = ((enemy.y % this.height) + this.height) % this.height
                continue;
            }

            enemy.x = ((enemy.x % this.width) + this.width) % this.width
            enemy.y = ((enemy.y % this.height) + this.height) % this.height
            
            if (enemy.health.lte(0)) {
                handleEnemyDeath(enemy);
                continue;
            }
        }

        // Gamma Ship trail damage
        if (this.gammaTrails) {
            for (let trail of this.gammaTrails) {
                let closest = this.getClosestCoords([trail.x, trail.y])
                trail.timer--;
                let dx = closest[0] - trail.x;
                let dy = closest[1] - trail.y;
                let shipRadius = player.ir.shipType == 3 || player.ir.shipType == 7 ? this.ship.radius : 12;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < trail.radius + shipRadius && trail.timer > 0) {
                    let dmg = trail.damage / this.shipStats.damageReduction;
                    
                    if (!this._asteroidMinigamePaused) {
                        if (player.ir.shipType == 3 || player.ir.shipType == 7) dmg /= 4;
                            player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
                        if (player.ir.shipHealth.lte(0)) {
                            this.onShipDeath();
                        }
                    }
                }
            }
            this.gammaTrails = this.gammaTrails.filter(trail => trail.timer > 0);
        }

        for (let i in this.warnings) {
            let warning = this.warnings[i]
            let warnRef = SB_warnings[warning.type]
            if (!warning.ready && warning.timer <= warnRef.postReadyTimer) {
                warnRef.onReady(warning);
                warning.ready = true;
            }
            SB_updateMovement(warning)
            warnRef.tick(warning)
            warning.timer--
            if (warning.x < 0) warning.x = 0;
            if (warning.x > this.width) warning.x = this.width;
            if (warning.y < 0) warning.y = 0;
            if (warning.y > this.height) warning.y = this.height;
        }
        this.warnings = this.warnings.filter(warning => warning.timer >= 0);

        // Bullet-enemy collision (player bullets only)
        for (let bullet of this.bullets) {
            // allow normal player bullets OR special vampire spear bullets to hit enemies
            if (bullet.fromEnemy && !bullet.vampireSpear) continue;
            if (bullet.noCollision) continue;
            for (let enemy of this.enemies.concat(this.asteroids)) {
                    // Skip interactions with paused Iridite boss
                if (enemy._pausedBoss) continue;
                // avoid hitting same enemy multiple times per bullet
                if (bullet.piercedEnemies && bullet.piercedEnemies.includes(enemy)) continue;
                let dx = bullet.x - enemy.x;
                let dy = bullet.y - enemy.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < enemy.radius + bullet.radius) {
                    let bDmg = (typeof bullet.damage === 'number') ? bullet.damage : (bullet.damage && bullet.damage.toNumber ? bullet.damage.toNumber() : Number(bullet.damage || 0));
                    if (!enemy.invulnerable) enemy.health = enemy.health.sub(bDmg);
                    SB_celestialites[enemy.type].onAttacked(enemy, bDmg, "ship")

                    // Vampire spear knockback: push enemies away along bullet velocity
                    if (bullet.vampireSpear) {
                        try {
                            let nx = (typeof bullet.vx === 'number') ? bullet.vx : 0;
                            let ny = (typeof bullet.vy === 'number') ? bullet.vy : 0;
                            let nlen = Math.sqrt(nx * nx + ny * ny) || 1;
                            nx /= nlen; ny /= nlen;
                            // stronger knockback: apply to knockback velocity so physics feels smoother
                            let kb = (typeof bullet.knockback === 'number') ? bullet.knockback : 18;
                            enemy._knockbackVx = (enemy._knockbackVx || 0) + nx * kb;
                            enemy._knockbackVy = (enemy._knockbackVy || 0) + ny * kb;
                            // longer knockback duration
                            enemy._knockbackTimer = Math.max(enemy._knockbackTimer || 0, 18);
                        } catch (err) { /* ignore knockback errors */ }
                    }

                    // Handle piercing bullets: decrement pierce and mark enemy as pierced
                    if (typeof bullet.pierce === "number" && bullet.pierce > 0) {
                        bullet.pierce--;
                        if (!bullet.piercedEnemies) bullet.piercedEnemies = [];
                        bullet.piercedEnemies.push(enemy);
                        // bullet remains alive until pierce runs out (< 0)
                        if (bullet.pierce < 0) bullet.life = 0;
                    } else {
                        // non-piercing: destroy bullet on hit
                        // If this is an evolver primary shard, spawn 3 mini shards on impact
                        if (bullet.evolverShard) {
                            for (let k = 0; k < 4; k++) {
                                const ang = Math.random() * Math.PI * 2;
                                const spd = 6 + Math.random() * 4;
                                this.bullets.push({
                                    x: enemy.x,
                                    y: enemy.y,
                                    vx: Math.cos(ang) * spd,
                                    vy: Math.sin(ang) * spd,
                                    life: 120,
                                    damage: (bullet.damage || 1) * 0.2,
                                    pierce: 0,
                                    piercedAsteroids: [],
                                    piercedEnemies: [],
                                    fromEnemy: false,
                                    evolverMini: true,
                                    radius: 4,
                                });
                            }
                        }
                        if (bullet.explosive) {
                            arena.bullets.push({
                                x: enemy.x,
                                y: enemy.y,
                                vx: 0,
                                vy: 0,
                                life: 3,
                                damage: 0,
                                pierce: 100,
                                piercedAsteroids: [],
                                piercedEnemies: [],
                                fromEnemy: false,
                                noCollision: true,
                                radius: 64,
                            });
                            if (bullet.life > 0) {
                                for (let enemy2 of this.enemies.concat(this.asteroids)) {
                                    let dx = bullet.x - enemy2.x;
                                    let dy = bullet.y - enemy2.y;
                                    let dist = Math.sqrt(dx * dx + dy * dy);
                                    if (dist < 256) {
                                        enemy2.health = enemy2.health.sub(bDmg * (1 - dist / 128));
                                    }
                                }
                            }
                        }
                        bullet.life = 0;
                    }

                    if (enemy.health.lte(0)) {
                        handleEnemyDeath(enemy);
                    }

                    // stop scanning further enemies only if bullet was destroyed
                    if (bullet.life <= 0) break;
                }
            }
        }
        

        // Enemy bullets hit player (also include vampire spear projectiles)
        for (let bullet of this.bullets) {
            if (!bullet.fromEnemy && !bullet.vampireSpear) continue;
            let dx = bullet.x - this.ship.x;
            let dy = bullet.y - this.ship.y;
            let shipRadius = player.ir.shipType == 3 || player.ir.shipType == 7 ? this.ship.radius : 12;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let bulletRadius = (typeof bullet.radius === "number") ? bullet.radius : (bullet.fromEnemy && bullet.homing ? 10 : 6);
            // account for projectile radius (giant bullets are larger)
            if (dist < shipRadius + bulletRadius) {
                 // ensure each enemy projectile only deals damage once
                if (!bullet._hitPlayer) {
                    bullet._hitPlayer = true;
                    let dmg = bullet.damage / this.shipStats.damageReduction;
                    if (player.ir.shipType == 3 || player.ir.shipType == 7) dmg /= 1.5;
                    player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
                    if (bullet.type) SB_projectiles[bullet.type].onHit(bullet, "player");
                
                    // remove the projectile immediately so it can't deal damage again
                    bullet.life = 0;
                }
            }
        }

        // remove dead/consumed bullets so homing projectiles vanish on hit
        this.bullets = this.bullets.filter(b => b.life > 0);

        // Ship-enemy collision
        for (let enemy of this.enemies.concat(this.asteroids)) {
            // Skip collisions for a paused Iridite boss
            if (enemy._pausedBoss) continue;
            let dx = this.ship.x - enemy.x;
            let dy = this.ship.y - enemy.y;
            let shipRadius = player.ir.shipType == 3 || player.ir.shipType == 7 ? this.ship.radius : 12;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < enemy.radius + shipRadius && !enemy.attached) {
                let enemyDmg = new Decimal(this.ship.collisionDamage * this.shipStats.attackDamage);
                if (enemyDmg.isNan() || enemyDmg.lt(0)) enemyDmg = new Decimal(0);
                if (player.ir.shipType != 3 && player.ir.shipType != 7 && !enemy.invulnerable) enemy.health = enemy.health.sub(enemyDmg.mul(0.1));
                if (player.ir.shipType == 3 && !enemy.invulnerable) enemy.health = enemy.health.sub(enemyDmg.mul(1.5));
                if (player.ir.shipType == 7 && !enemy.invulnerable) enemy.health = enemy.health.sub(enemyDmg);
                SB_celestialites[enemy.type].onAttacked(enemy, enemyDmg, "ship")

                let shipDmgRaw = enemy.bodyDamage.toNumber() / this.shipStats.damageReduction * enemy.damage.toNumber();
                let shipDmg = (typeof shipDmgRaw === 'number') ? shipDmgRaw : (shipDmgRaw.toNumber ? shipDmgRaw.toNumber() : Number(shipDmgRaw));
                if (Number.isNaN(shipDmg) || !isFinite(shipDmg) || shipDmg < 0) shipDmg = 3 * (typeof this.shipStats.damageReduction === 'number' ? this.shipStats.damageReduction : (this.shipStats.damageReduction.toNumber ? this.shipStats.damageReduction.toNumber() : Number(this.shipStats.damageReduction)));
                if (player.ir.iriditeFightActive) shipDmg /= 12;
                if (player.ir.shipType == 3 || player.ir.shipType == 7) shipDmg /= 20;
                if (!this._asteroidMinigamePaused) this.applyShipDamage(shipDmg);

                if (player.ir.shipType == 3) {
                    let angle = Math.atan2(dy, dx);
                    let bounceSpeed = Math.max(8, Math.abs(this.ship.vy) * this.ship.bounce);
                    if (Number.isNaN(bounceSpeed) || !isFinite(bounceSpeed) || bounceSpeed < 0) bounceSpeed = 8;
                    this.ship.vy = Math.sin(angle) * bounceSpeed;
                    this.ship.x += Math.cos(angle) * bounceSpeed;
                } else if (player.ir.shipType == 7) {
                    let angle = Math.atan2(dy, dx);
                    let speed = Math.abs(Math.sqrt(Math.pow(this.ship.vx, 2) + Math.pow(this.ship.vy, 2)))
                    if (Number.isNaN(speed) || !isFinite(speed) || speed < 0) speed = 0
                    this.ship.vy += Math.sin(angle) * 6/(Math.sqrt(speed+1));
                    this.ship.vx += Math.cos(angle) * 6/(Math.sqrt(speed+1));
                } else {
                    this.ship.velocity = -2;
                }
                
                if (enemy.health.lte(0) || enemy.health.isNan()) handleEnemyDeath(enemy);
                if ((player.ir.shipHealth.isNaN && player.ir.shipHealth.isNan()) || !player.ir.shipHealth.isFinite() || player.ir.shipHealth.lt(0)) player.ir.shipHealth = new Decimal(0);

                if (player.ir.shipHealth.lte(0)) {
                    this.onShipDeath();
                }
            }
        }

        // Add loot flashes
        for (let pos of lootFlashPositions) {
            if (pos.type == "spaceRock") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${formatWhole(pos.amount)} space rock`,
                    timer: 120,
                    color: "#ffe066",
                    style: "18px monospace"
                });
            }
            if (pos.type == "spaceGem") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${formatWhole(pos.amount)} space gem`,
                    timer: 240,
                    color: "#66e8ff",
                    style: "24px monospace"
                });
            }
            if (pos.type == "bloodStones") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${formatWhole(pos.amount)} blood stone`,
                    timer: 120,
                    color: "#bf0000",
                    style: "18px monospace"
                });
            }
            if (pos.type == "bloodGems") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${formatWhole(pos.amount)} blood gem`,
                    timer: 240,
                    color: "#f5b8d7",
                    style: "24px monospace"
                });
            }
        }

        // Add XP orbs
        for (let orb of xpOrbsToAdd) {
            this.xpOrbs.push({
                x: orb.x,
                y: orb.y,
                amount: orb.amount,
                picked: false,
                timer: 600
            });
        }

        // Update XP orbs (move toward ship, pick up if close)
        for (let orb of this.xpOrbs) {
            let closest = this.getClosestCoords([orb.x, orb.y])
            let dx = closest[0] - orb.x;
            let dy = closest[1] - orb.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let speed = 2;
            if (dist > 5) {
                orb.x += dx / dist * speed;
                orb.y += dy / dist * speed;
            }
            if (dist < 30 && !orb.picked) {
                player.ir.battleXP = player.ir.battleXP.add(orb.amount * this.shipStats.xpGain);
                addLevelableXP("ir", player.ir.shipType, orb.amount * this.shipStats.xpGain)
                orb.picked = true;
            }
            orb.x = ((orb.x % this.width) + this.width) % this.width
            orb.y = ((orb.y % this.height) + this.height) % this.height
            orb.timer--;
        }
        this.xpOrbs = this.xpOrbs.filter(orb => !orb.picked && orb.timer > 0);

        // Update special projectiles
        for (let projectile of this.bullets) {
            if (!projectile.type) continue;
            SB_projectiles[projectile.type].tick(projectile)
        }

        this.draw();
    }

    // Apply damage to player's ship respecting invulnerability frames
    // Returns true if damage was applied, false if blocked by invuln
    applyShipDamage(dmg) {
        // When asteroid minigame is paused, ship should not take damage
        if (this._asteroidMinigamePaused) return false;
        // invulnerability duration: ~333ms (max 3 hits per second)
        const INVULN_MS = 1000 / 3;
        if (this.shipHitInvuln && this.shipHitInvuln > 0) return false;

        if (this.enemies.concat(this.asteroids).some(e => e.type === "iriditeBoss" && e.health.gt(0))) {
            player.ir.tookDamageInIriditeFight = true;
        }

        // grant invulnerability
        this.shipHitInvuln = INVULN_MS;
        try {
            if (player.ir.shipHealth && typeof player.ir.shipHealth.sub === 'function') {
                // Decimal-friendly subtraction
                player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
            } else if (typeof player.ir.shipHealth === 'number') {
                const raw = (typeof dmg === 'number') ? dmg : (dmg && dmg.toNumber ? dmg.toNumber() : Number(dmg));
                player.ir.shipHealth = Math.max(0, player.ir.shipHealth - raw);
            }
        } catch (e) {
            // fallback numeric
            try {
                const raw = (typeof dmg === 'number') ? dmg : (dmg && dmg.toNumber ? dmg.toNumber() : Number(dmg));
                if (typeof player.ir.shipHealth === 'number') player.ir.shipHealth = Math.max(0, player.ir.shipHealth - raw);
            } catch (e2) {}
        }

        // clamp/validate health value
        try {
            if ((player.ir.shipHealth.isNaN && player.ir.shipHealth.isNan()) || !player.ir.shipHealth.isFinite || player.ir.shipHealth < 0) player.ir.shipHealth = new Decimal(0);
        } catch (e) {
            if (typeof player.ir.shipHealth === 'number' && player.ir.shipHealth < 0) player.ir.shipHealth = 0;
        }

        // death check
        try {
            if (player.ir.shipHealth && player.ir.shipHealth.lte && player.ir.shipHealth.lte(0)) this.onShipDeath();
            else if (typeof player.ir.shipHealth === 'number' && player.ir.shipHealth <= 0) this.onShipDeath();
        } catch (e) {}
        return true;
    }

    createSmallAsteroid(x, y) {
        let size = 20 + Math.random() * 10;
        let health = 20;
        let angle = Math.random() * Math.PI * 2;
        let speed = 2 + Math.random() * 2;
        let phaseTime = 99999999999999;
        let shape = this.generateConvexPolygon(size, 5 + Math.floor(Math.random() * 3));

        if (player.ir.battleLevel.gte(20)) {
            health = health * Decimal.pow(1.04, player.ir.battleLevel.sub(19)).toNumber()
        }

        return {
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: size,
            health: health,
            maxHealth: health,
            big: false,
            splitCount: 0,
            phaseTimer: phaseTime,
            phased: false,
            shape: shape,
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw ship
        this.ctx.save();
        this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);
        if (player.ir.shipType == 3) {
            this.ctx.beginPath();
            this.ctx.arc(this.ship.x, this.ship.y, this.ship.radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = "#a7a7a7ff";
            this.ctx.shadowColor = "#ffffffff";
            if (!options.performanceMode) {this.ctx.shadowBlur = 16} else {this.ctx.shadowBlur = 0};
            this.ctx.fill();
            
        }
        if (player.ir.shipType == 1) {
            
            this.ctx.rotate(this.ship.angle);
            this.ctx.beginPath();
            this.ctx.moveTo(20, 0);
            this.ctx.lineTo(-15, 12);
            this.ctx.lineTo(-10, 0);
            this.ctx.lineTo(-15, -12);
            this.ctx.closePath();
            this.ctx.fillStyle = "#eaf6f7";
            this.ctx.fill();
            
        }
        if (player.ir.shipType == 2) {
            
            this.ctx.rotate(this.ship.angle);
            this.ctx.beginPath();
            this.ctx.moveTo(20, 0);
            this.ctx.lineTo(-20, 25);
            this.ctx.lineTo(-30, 0);
            this.ctx.lineTo(-20, -25);
            this.ctx.closePath();
            this.ctx.fillStyle = "#eaf6f7";
            this.ctx.fill();
            
        }
        if (player.ir.shipType == 4) {
            // Sniper-style ship: long barrel and scope
            
            this.ctx.rotate(this.ship.angle);
            // Body
            this.ctx.fillStyle = "#dbefff";
            this.ctx.beginPath();
            this.ctx.moveTo(20, 0);
            this.ctx.lineTo(-20, 20);
            this.ctx.lineTo(-30, 0);
            this.ctx.lineTo(-20, -20);
            this.ctx.fill();
            // Long barrel
            this.ctx.fillStyle = "#eaf6f7";
            this.ctx.fillRect(10, -3, 36, 6);
            // Scope / cockpit
            this.ctx.beginPath();
            this.ctx.arc(-6, 0, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = "#9fb8ff";
            this.ctx.fill();
            // small accent
            this.ctx.strokeStyle = "#89a6ff";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
        }
        if (player.ir.shipType == 5) {
            // Small UFO (player ship) — visual match to miniboss but smaller & different color
            
            //this.ctx.rotate(this.ship.angle || 0);
            const r = this.ship.radius || 12;
            const bodyR = r * 1.4;

            // Main saucer body
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, bodyR, bodyR * 0.5, 0, 0, Math.PI * 2);
            this.ctx.fillStyle = "#66d9ff"; // distinct color from miniboss
            this.ctx.shadowColor = "#66d9ff";
            if (!options.performanceMode) {this.ctx.shadowBlur = 10} else {this.ctx.shadowBlur = 0};
            this.ctx.fill();

            // Dome
            this.ctx.beginPath();
            this.ctx.ellipse(0, -r * 0.45, bodyR * 0.6, bodyR * 0.35, 0, Math.PI, 2 * Math.PI);
            this.ctx.fillStyle = "#e6fbff";
            this.ctx.fill();

            // Small underside lights
            for (let i = -2; i <= 2; i++) {
                this.ctx.beginPath();
                const lx = (i / 2) * (bodyR * 0.9);
                this.ctx.arc(lx, r * 0.25, Math.max(1.5, r * 0.35), 0, Math.PI * 2);
                this.ctx.fillStyle = i % 2 === 0 ? "#ffd166" : "#89ffb4";
                this.ctx.fill();
            }

            // subtle stroke
            this.ctx.strokeStyle = "rgba(0,0,0,0.15)";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            
        }
        if (player.ir.shipType == 6) {
            
            this.ctx.rotate(this.ship.angle);
 
            this.ctx.beginPath();
            this.ctx.moveTo(35, 0); 
            this.ctx.lineTo(-5, 20); 
            this.ctx.lineTo(10, 20); 
            this.ctx.lineTo(-20, 10); 
            this.ctx.lineTo(-20, -10); 
            this.ctx.lineTo(10, -20); 
            this.ctx.lineTo(-5, -20); 

            this.ctx.closePath(); 

            this.ctx.fillStyle = "#a27aebff"; 
            this.ctx.strokeStyle = "#6e39d1ff";
            this.ctx.lineWidth = 2;

            this.ctx.fill();
            this.ctx.stroke(); 

            
        }
        if (player.ir.shipType == 7) {
            
            this.ctx.rotate(this.ship.angle);
 
            // BODY
            this.ctx.fillStyle = "#f8de7eff";
            this.ctx.strokeStyle = "#000000ff";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(0, 15);
            this.ctx.lineTo(6, 6); 
            this.ctx.lineTo(30, 0); 
            this.ctx.lineTo(6, -6);
            this.ctx.lineTo(0, -15);
            this.ctx.lineTo(-6, -6);
            this.ctx.lineTo(-18, 0);
            this.ctx.lineTo(-6, 6);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();

            
        }
        if (player.ir.shipType == 8) {
            
            this.ctx.rotate(Math.PI);

            // Miniature Iridite visuals
            const r = this.ship.radius * 2 || 24;
            const phase = (this.ship.wingPhase || 0);
            let raw = Math.sin(phase);
            let t = (raw + 1) / 2;
            let ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const spreadBase = 0.9 + ease * 0.6;
            const tipBend = Math.sin(phase * 1.9) * (0.6 + ease * 0.6);

            this.ctx.shadowColor = "rgba(240,230,255,0.7)";
            if (!options.performanceMode) {this.ctx.shadowBlur = 15} else {this.ctx.shadowBlur = 0};
                
            const drawWing = (mirror = false) => {
                if (mirror) this.ctx.scale(-1, 1);
                let baseAngle = -0.22 - tipBend * 0.14;
                //this.ctx.rotate(baseAngle);

                const groups = [
                    { count: 6, len: r * 1.2, width: r * 0.35, offset: 0.0, light: -8 },
                    { count: 5, len: r * 0.9, width: r * 0.28, offset: 0.1, light: -2 },
                    { count: 4, len: r * 0.6, width: r * 0.2, offset: 0.2, light: 6 }
                ];

                for (let gi = 0; gi < groups.length; gi++) {
                    const g = groups[gi];
                    const groupSpread = (0.72 + gi * 0.18) * (0.9 + ease * 0.15);
                    for (let i = 0; i < g.count; i++) {
                        let norm = (i / (g.count - 1)) - 0.5;
                        let bx = r * 0.06 + norm * r * (0.48 - gi * 0.02);
                        let by = r * 0.02 + Math.abs(norm) * r * 0.06 + g.offset * r;
                        let featherAngle = norm * groupSpread + tipBend * (0.32 + gi * 0.12);
                        let len = g.len * (0.86 + (1 - Math.abs(norm)) * 0.22 - gi * 0.07);
                        let width = g.width * (0.82 - gi * 0.08) * (1 - Math.abs(norm) * 0.5);

                        this.ctx.save();
                        this.ctx.translate(bx, by);
                        this.ctx.rotate(featherAngle);
                        this.ctx.beginPath();
                        this.ctx.moveTo(0, 0);
                        this.ctx.quadraticCurveTo(len * 0.35, -width * 0.6, len * 0.92, -width * 0.08);
                        this.ctx.lineTo(len * 0.86, width * 0.14);
                        this.ctx.quadraticCurveTo(len * 0.38, width * 0.6, 0, 0);
                        this.ctx.closePath();
                        let fg = this.ctx.createLinearGradient(0, -width, len, width);
                        fg.addColorStop(0, `rgba(${240 + g.light},${236 + g.light},${255 - g.light},0.9)`);
                        fg.addColorStop(1, `rgba(${210 + g.light},${208 + g.light},${232 - g.light},0.8)`);
                        this.ctx.fillStyle = fg;
                        this.ctx.fill();
                        this.ctx.restore();
                    }
                }
            };

            this.ctx.translate(0.25*r, 0);
            drawWing(false);
            this.ctx.translate(-0.5*r, 0);
            drawWing(true);
            this.ctx.translate(-0.25*r, 0.25*r);

            this.ctx.save();
            if (!options.performanceMode) {this.ctx.shadowBlur = 20} else {this.ctx.shadowBlur = 0};
            const fontSize = Math.max(12, Math.floor(r * 1.5));
            this.ctx.font = `${fontSize}px monospace`;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillStyle = "#fff";
            this.ctx.fillText("✦", 0, 0);

            this.ctx.restore();
        }

        if (player.ir.shipType == 8 && this.ship._laserActive) {
            const elapsed = Math.min(1, 1 + (this.ship._laserTimer / 60));
            const windup = 8;
            const progress = Math.max(0, elapsed);
            const angle = this.ship._laserAngle || this.ship.angle || 0;
            const beamLen = this.ship._laserLength;
            const r = this.ship.radius || 12;
            const maxThickness = r * 0.8;
            const thickness = (progress * 0.5 + 0.5) * maxThickness;

            this.ctx.translate(0, -4);
            this.ctx.rotate(angle);
            this.ctx.globalCompositeOperation = "lighter";
            let g = this.ctx.createLinearGradient(0, -thickness * 2, beamLen, thickness * 2);
            g.addColorStop(0, `rgba(200,120,255,${0.12 + 0.28 * progress})`);
            g.addColorStop(0.1, `rgba(255,120,180,${0.18 + 0.32 * progress})`);
            g.addColorStop(0.6, `rgba(180,255,255,${0.06 + 0.18 * progress})`);
            g.addColorStop(1, `rgba(200,120,255,${0.02 + 0.06 * progress})`);
            this.ctx.fillStyle = g;
            this.ctx.beginPath();
            this.ctx.rect(0, -thickness, beamLen, thickness * 2);
            this.ctx.fill();
            this.ctx.fillStyle = `rgba(255,220,160,${0.9 * (0.5 + 0.5 * progress)})`;
            this.ctx.fillRect(0, -Math.max(1, thickness * 0.12), beamLen, Math.max(1, thickness * 0.12) * 2);
            this.ctx.globalCompositeOperation = "source-over";
        }

        // Evolver ship (shipType 9) — triangle shape with blue-purple gradient and dividing line
        if (player.ir.shipType == 9) {
            this.ctx.rotate(this.ship.angle);
            let lenShip = Math.max(18, this.ship.radius || 20);

            // blue-purple gradient
            let triG = this.ctx.createLinearGradient(15, 0, -15, 0);
            triG.addColorStop(0, '#5fb8ff');
            triG.addColorStop(0.5, '#7c4dff');
            triG.addColorStop(1, '#9aa7ff');

            this.ctx.beginPath();
            this.ctx.moveTo(20, 0);
            this.ctx.lineTo(-10, 15);
            this.ctx.lineTo(-15, 0);
            this.ctx.lineTo(-10, -15);
            this.ctx.closePath();
            this.ctx.fillStyle = triG;
            this.ctx.fill();

            // black outline
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = Math.max(2, lenShip * 0.1);
            this.ctx.stroke();

            // dividing line through the middle
            this.ctx.beginPath();
            this.ctx.moveTo(-15, 0);
            this.ctx.lineTo(20, 0);
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = Math.max(1, lenShip * 0.05);
            this.ctx.stroke();

        }
        if (player.ir.shipType == 10) {
            this.ctx.rotate(this.ship.angle);
            this.ctx.strokeStyle = "#30bf78";
            this.ctx.fillStyle = "#30bf78";
            // Body Background
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 21, 0, Math.PI * 2);
            this.ctx.fill();
            // Left Cannon
            this.ctx.fillStyle = "#dfffdf";
            this.ctx.moveTo(20, 0);
            this.ctx.beginPath();
            this.ctx.lineTo(0, -5);
            this.ctx.lineTo(75, -5);
            this.ctx.lineTo(65, -15);
            this.ctx.lineTo(0, -15);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            // Right Cannon
            this.ctx.moveTo(20, 0);
            this.ctx.beginPath();
            this.ctx.lineTo(0, 5);
            this.ctx.lineTo(75, 5);
            this.ctx.lineTo(65, 15);
            this.ctx.lineTo(0, 15);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            // Body
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 20, 0, Math.PI * 2);
            this.ctx.fill();
            // Cockpit
            
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 16, 0, Math.PI * 2);
            this.ctx.fillStyle = "#400020";
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(0, 0, 4, 0, Math.PI * 2);
            if (this.awaitingShotCharge && this.shotChargeTimer <= 3) this.ctx.fillStyle = "#fff";
            else this.ctx.fillStyle = "#800040"
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(10, 0, 4, 0, Math.PI * 2);
            if (this.awaitingShotCharge && this.shotChargeTimer <= 21) this.ctx.fillStyle = "#ff7f7f";
            else this.ctx.fillStyle = "#800040"
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(5, Math.sqrt(3) * 5, 4, 0, Math.PI * 2);
            if (this.awaitingShotCharge && this.shotChargeTimer <= 18) this.ctx.fillStyle = "#ffff7f";
            else this.ctx.fillStyle = "#800040"
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(-5, Math.sqrt(3) * 5, 4, 0, Math.PI * 2);
            if (this.awaitingShotCharge && this.shotChargeTimer <= 15) this.ctx.fillStyle = "#7fff7f";
            else this.ctx.fillStyle = "#800040"
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(-10, 0, 4, 0, Math.PI * 2);
            if (this.awaitingShotCharge && this.shotChargeTimer <= 12) this.ctx.fillStyle = "#7fffff";
            else this.ctx.fillStyle = "#800040"
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(-5, -Math.sqrt(3) * 5, 4, 0, Math.PI * 2);
            if (this.awaitingShotCharge && this.shotChargeTimer <= 9) this.ctx.fillStyle = "#7f7fff";
            else this.ctx.fillStyle = "#800040"
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(5, -Math.sqrt(3) * 5, 4, 0, Math.PI * 2);
            if (this.awaitingShotCharge && this.shotChargeTimer <= 6) this.ctx.fillStyle = "#ff7fff";
            else this.ctx.fillStyle = "#800040"
            this.ctx.fill();

        }
        this.ctx.restore();

        // Draw warns
        for (let i = this.warnings.length - 1; i >= 0; i--) {
            let warning = this.warnings[i];
            let remainingDistance = warning.dist
            let currentPos = [warning.x, warning.y]
            let nextPos = [warning.x, warning.y]
            let warnRef = SB_warnings[warning.type]

            let down = warning.ang < 0
            let right = Math.abs(warning.ang) < Math.PI / 2
            let j = 0
            
            while (remainingDistance > 0) {
                j++
                this.ctx.save()
                this.ctx.fillStyle = "#ff7f00";
                this.ctx.lineWidth = warnRef.width;
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                this.ctx.moveTo(currentPos[0], currentPos[1])
                if (warning.timer > warnRef.postReadyTimer) {
                    let wrapped = this.getVisibleWrappedCoords([warning.x, warning.y], [8, 8])
                    if (wrapped) {
                        this.ctx.beginPath()
                        this.ctx.arc(wrapped[0], wrapped[1], 4, 0, 360)
                        this.ctx.fill()
                    }
                }
                this.ctx.beginPath()

                // Get distance to next point of screen looping
                // Vertical Wall
                let hx = Math.abs((right ? this.width - currentPos[0] : currentPos[0]) / Math.cos(warning.ang)) || 0
                // Horizontal Wall
                let hy = Math.abs((!down ? this.height - currentPos[1] : currentPos[1]) / Math.sin(warning.ang)) || 0
                let currentDistance = Math.min(hx, hy)

                if (remainingDistance < currentDistance) {
                    // ^ This needs to account for screen wrapping

                    // Finish
                    
                    nextPos[0] = currentPos[0] + Math.cos(warning.ang) * remainingDistance
                    nextPos[1] = currentPos[1] + Math.sin(warning.ang) * remainingDistance

                    let g = this.ctx.createLinearGradient(
                        currentPos[0] - (warning.dist - remainingDistance) * Math.cos(warning.ang),
                        currentPos[1] - (warning.dist - remainingDistance) * Math.sin(warning.ang),
                        nextPos[0],
                        nextPos[1]
                    );
                    
                    let gStart = Math.min(1, Math.max(0, 1 - warning.timer / warnRef.postReadyTimer))
                    g.addColorStop(gStart, 'rgba(255, 128, 0, 0)');
                    g.addColorStop(gStart, 'rgba(255, 128, 0, 0.5)');
                    g.addColorStop(1, 'rgba(255, 128, 0, 0)');
                    this.ctx.strokeStyle = g;
                    
                    this.ctx.moveTo(currentPos[0] - (warning.dist - remainingDistance) * Math.cos(warning.ang), currentPos[1] - (warning.dist - remainingDistance) * Math.sin(warning.ang))
                    this.ctx.lineTo(nextPos[0], nextPos[1])
                    this.ctx.closePath()
                    this.ctx.stroke();

                    remainingDistance = 0
                } else {
                    // Keep going

                    this.ctx.moveTo(currentPos[0] - (warning.dist - remainingDistance) * Math.cos(warning.ang), currentPos[1] - (warning.dist - remainingDistance) * Math.sin(warning.ang))
                    
                    let g
                    if (hx < hy) {
                        nextPos[0] = right ? this.width : 0
                        nextPos[1] = currentPos[1] + currentDistance * Math.sin(warning.ang)
                        g = this.ctx.createLinearGradient(
                            currentPos[0] - (warning.dist - remainingDistance) * Math.cos(warning.ang),
                            currentPos[1] - (warning.dist - remainingDistance) * Math.sin(warning.ang),
                            nextPos[0] + (remainingDistance - currentDistance) * Math.cos(warning.ang), 
                            nextPos[1] + (remainingDistance - currentDistance) * Math.sin(warning.ang)
                        );
                        currentPos[0] = !right ? this.width : 0
                        currentPos[1] = nextPos[1]
                    } else {
                        nextPos[0] = currentPos[0] + currentDistance * Math.cos(warning.ang)
                        nextPos[1] = !down ? this.height : 0
                        g = this.ctx.createLinearGradient(
                            currentPos[0] - (warning.dist - remainingDistance) * Math.cos(warning.ang),
                            currentPos[1] - (warning.dist - remainingDistance) * Math.sin(warning.ang),
                            nextPos[0] + (remainingDistance - currentDistance) * Math.cos(warning.ang),
                            nextPos[1] + (remainingDistance - currentDistance) * Math.sin(warning.ang)
                        );
                        currentPos[0] = nextPos[0]
                        currentPos[1] = down ? this.height : 0
                    }

                    remainingDistance -= currentDistance

                    let gStart = Math.min(1, Math.max(0, 1 - warning.timer / warnRef.postReadyTimer))
                    g.addColorStop(gStart, 'rgba(255, 128, 0, 0)');
                    g.addColorStop(gStart, 'rgba(255, 128, 0, 0.5)');
                    g.addColorStop(1, 'rgba(255, 128, 0, 0)');
                    this.ctx.strokeStyle = g;

                    this.ctx.lineTo(nextPos[0] + remainingDistance * Math.cos(warning.ang), nextPos[1] + remainingDistance * Math.sin(warning.ang))
                    this.ctx.closePath()
                    this.ctx.stroke();
                }
                this.ctx.restore()
                if (remainingDistance > 100000) {console.warn("uh oh"); break; }
                if (j >= 100) {console.warn("BIG uh oh: " + remainingDistance); break; }
            }
        }

        // Draw gamma trails
        if (this.gammaTrails) {
            for (let trail of this.gammaTrails) {
                let wrapped = this.getVisibleWrappedCoords([trail.x, trail.y], [trail.radius * 2, trail.radius * 2])
                if (wrapped != null) {
                    this.ctx.save();
                    this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                    this.ctx.globalAlpha = Math.max(0.2, trail.timer / 180);
                    this.ctx.beginPath();
                    this.ctx.arc(wrapped[0], wrapped[1], trail.radius, 0, 2 * Math.PI);
                    this.ctx.fillStyle = "#b44cff";
                    this.ctx.fill();
                    this.ctx.restore();
                }
            }
        }

        // Draw bullets
        for (let bullet of this.bullets) {
            if (bullet.type && SB_projectiles[bullet.type]) {
                SB_projectiles[bullet.type].draw(this.ctx, bullet);
                continue;
            }

            let radius = bullet.radius || 20
            let wrapped = this.getVisibleWrappedCoords([bullet.x, bullet.y], [radius * 2, radius * 2])
            if (!wrapped) continue;
            // Skip ritual projectiles - RitualArena handles these with custom visuals
            if (bullet.ritualOrb || bullet.ritualBlade) continue;
            
            if (bullet.massiveSword) {
                // Draw a large, spinning metallic sword
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                this.ctx.rotate(bullet.rot || 0);

                let r = bullet.radius || 80;
                let bladeLen = r * 1.5;
                let bladeW = r * 0.3;

                // Blade
                let grad = this.ctx.createLinearGradient(-bladeW/2, 0, bladeW/2, 0);
                grad.addColorStop(0, "#888");
                grad.addColorStop(0.5, "#eee");
                grad.addColorStop(1, "#888");
                this.ctx.fillStyle = grad;
                this.ctx.beginPath();
                this.ctx.moveTo(0, -bladeLen); // Tip
                this.ctx.lineTo(-bladeW/2, -bladeLen * 0.2);
                this.ctx.lineTo(-bladeW/2, 0);
                this.ctx.lineTo(bladeW/2, 0);
                this.ctx.lineTo(bladeW/2, -bladeLen * 0.2);
                this.ctx.closePath();
                this.ctx.fill();

                // Blade Edge Highlight
                this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                this.ctx.lineWidth = 2;
                this.ctx.stroke();

                // Crossguard
                this.ctx.fillStyle = "#553300";
                this.ctx.fillRect(-bladeW * 1.2, 0, bladeW * 2.4, bladeW * 0.4);

                // Handle
                this.ctx.fillStyle = "#331100";
                this.ctx.fillRect(-bladeW * 0.2, bladeW * 0.4, bladeW * 0.4, bladeW * 0.8);

                // Pommel
                this.ctx.fillStyle = "#553300";
                this.ctx.beginPath();
                this.ctx.arc(0, bladeW * 1.3, bladeW * 0.3, 0, Math.PI * 2);
                this.ctx.fill();

                // Glow
                this.ctx.shadowColor = "rgba(255, 0, 0, 0.5)";
                if (!options.performanceMode) {this.ctx.shadowBlur = 20} else {this.ctx.shadowBlur = 0};
                this.ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
                this.ctx.lineWidth = 4;
                this.ctx.stroke();

                this.ctx.restore();
            } else if (bullet.star) {
                // draw mini-star glyph for thematic boss/projectiles
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                let ang = Math.atan2(bullet.vy, bullet.vx || 0);
                this.ctx.rotate(ang);
                // determine font size; giant bullets are significantly larger
                let fontSize = 10;
                if (bullet.giant) fontSize = Math.max(36, (bullet.radius || 18) * 1.6);
                else if (bullet.fromEnemy && bullet.homing) fontSize = 20;
                else if (bullet.fromEnemy) fontSize = 14;
                else if (bullet.size) fontSize = Math.max(fontSize, bullet.size / 1.2);
                // optional giant base glow
                if (bullet.giant) {
                    this.ctx.save();
                    this.ctx.globalCompositeOperation = "lighter";
                    this.ctx.fillStyle = "rgba(255,220,140,0.14)";
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, (bullet.radius || 18) * 1.4, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                }
                this.ctx.font = `${fontSize}px monospace`;
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                this.ctx.fillStyle = bullet.fromEnemy ? "#ffeecb" : "#ffff00";//ffec8b
                this.ctx.shadowColor = "#fff1";
                if (!options.performanceMode) {this.ctx.shadowBlur = 6} else {this.ctx.shadowBlur = 0};
                this.ctx.fillText("✦", 0, 0);
                this.ctx.restore();
            } else {
                this.ctx.save();

                let r = bullet.radius || 3;
                this.ctx.beginPath();
                this.ctx.arc(wrapped[0] + (this.canvasWidth / 2) - this.ship.x, wrapped[1] + (this.canvasHeight / 2) - this.ship.y, r, 0, 2 * Math.PI);
                this.ctx.fillStyle = bullet.fromEnemy ? "#ff4444" : "#ffff00";
                this.ctx.fill();
                this.ctx.restore();
            }
            // Evolver primary shard rendering (crystal shard with facets)
            if (bullet.evolverShard) {
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                let ang = Math.atan2(bullet.vy, bullet.vx || 0);
                this.ctx.rotate(ang);
                let len = Math.min(56, (bullet.radius || 26) * 2);

                // crystal gradients matching ship
                let mainG = this.ctx.createLinearGradient(len, 0, -len * 0.7, 0);
                mainG.addColorStop(0, '#5fb8ff');
                mainG.addColorStop(0.5, '#7c4dff');
                mainG.addColorStop(1, '#9aa7ff');
                let facetG = this.ctx.createLinearGradient(0, -len * 0.5, 0, len * 0.5);
                facetG.addColorStop(0, '#3f51b5');
                facetG.addColorStop(1, '#00bcd4');


                // main crystal body
                this.ctx.beginPath();
                this.ctx.moveTo(len, 0);
                this.ctx.lineTo(len * 0.3, -len * 0.4);
                this.ctx.lineTo(-len * 0.5, -len * 0.2);
                this.ctx.lineTo(-len * 0.7, 0);
                this.ctx.lineTo(-len * 0.5, len * 0.2);
                this.ctx.lineTo(len * 0.3, len * 0.4);
                this.ctx.closePath();
                this.ctx.fillStyle = mainG;
                this.ctx.fill();
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = Math.max(2, len * 0.1);
                this.ctx.stroke();

                // facet lines
                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.3, -len * 0.4);
                this.ctx.lineTo(-len * 0.5, len * 0.2);
                this.ctx.strokeStyle = 'rgba(255,255,255,0.6)';
                this.ctx.lineWidth = Math.max(1, len * 0.05);
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.3, len * 0.4);
                this.ctx.lineTo(-len * 0.5, -len * 0.2);
                this.ctx.stroke();

                // side facets
                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.3, -len * 0.4);
                this.ctx.lineTo(0, -len * 0.6);
                this.ctx.lineTo(-len * 0.5, -len * 0.2);
                this.ctx.closePath();
                this.ctx.fillStyle = facetG;
                this.ctx.fill();

                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.3, len * 0.4);
                this.ctx.lineTo(0, len * 0.6);
                this.ctx.lineTo(-len * 0.5, len * 0.2);
                this.ctx.closePath();
                this.ctx.fillStyle = facetG;
                this.ctx.fill();

                // highlights
                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.5, -len * 0.1);
                this.ctx.lineTo(len * 0.2, 0);
                this.ctx.lineTo(len * 0.5, len * 0.1);
                this.ctx.closePath();
                this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
                this.ctx.fill();

                this.ctx.restore();
            }
            // Evolver mini shard rendering (small blue bullet)
            if (bullet.evolverMini) {
                this.ctx.save();
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                this.ctx.beginPath();
                let r = bullet.radius || 4;
                this.ctx.arc(wrapped[0], wrapped[1], r, 0, 2 * Math.PI);
                this.ctx.fillStyle = '#5fb8ff';
                this.ctx.fill();
                this.ctx.strokeStyle = '#2c3e50';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                this.ctx.restore();
            }
            // Evolver mini shard rendering (smaller triangle)
            if (bullet.evolverMini) {
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                let ang = Math.atan2(bullet.vy, bullet.vx || 0);
                this.ctx.rotate(ang);
                let len = Math.min(8, bullet.radius || 6);
                // mini shards use the same family as the ship but slightly desaturated
                let g2 = this.ctx.createLinearGradient(len, 0, -len * 0.6, 0);
                g2.addColorStop(0, 'rgba(241,182,255,0.95)');
                g2.addColorStop(0.5, 'rgba(154,167,255,0.95)');
                g2.addColorStop(1, 'rgba(95,184,255,0.95)');
                this.ctx.beginPath();
                this.ctx.moveTo(len, 0);
                this.ctx.lineTo(-len * 0.6, -len * 0.5);
                this.ctx.lineTo(-len * 0.6, len * 0.5);
                this.ctx.closePath();
                this.ctx.fillStyle = g2;
                this.ctx.fill();
                this.ctx.lineWidth = Math.max(1, len * 0.2);
                this.ctx.strokeStyle = '#0b0b0b';
                this.ctx.stroke();
                this.ctx.restore();
            }
        }

        // Draw XP orbs
        for (let orb of this.xpOrbs) {
            this.ctx.save();
            //this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
            let wrapped = this.getVisibleWrappedCoords([orb.x, orb.y], [4, 4])
            if (wrapped != null) {
                this.ctx.globalAlpha = 0.8;
                this.ctx.beginPath();
                this.ctx.arc(wrapped[0] + (this.canvasWidth / 2) - this.ship.x, wrapped[1] + (this.canvasHeight / 2) - this.ship.y, 4, 0, 2 * Math.PI);
                this.ctx.shadowBlur = 4;
                this.ctx.shadowColor = "#0000ff";
                this.ctx.fillStyle = "white";
                this.ctx.fill();
            }
            this.ctx.restore();
        }

        // Draw Enemies
        for (let enemy of this.enemies.concat(this.asteroids)) {
            let type = SB_celestialites[enemy.type];
            let wrapped = this.getVisibleWrappedCoords([enemy.x, enemy.y], [enemy.radius * 2, enemy.radius * 2])
            if (type && type.draw && wrapped) {
                type.draw(this.ctx, enemy);
                if (enemy.type == "muShip") this.ctx.globalAlpha = Math.max(1 - enemy.playerDist / 300, 0);
                this.ctx.save();
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                this.ctx.fillStyle = "#151230";
                this.ctx.fillRect(wrapped[0] - enemy.radius - 2, wrapped[1] - enemy.radius - 20, enemy.radius * 2 + 4, 13);
                let barWidth = enemy.radius * 2 * enemy.health.div(enemy.maxHealth).toNumber();
                this.ctx.fillStyle = "#bf0000";
                this.ctx.fillRect(wrapped[0] - enemy.radius, wrapped[1] - enemy.radius - 18, barWidth, 9);

                let t = formatSimple(enemy.health.floor().max(0)) + "/" + formatSimple(enemy.maxHealth.floor())
                this.ctx.font = "12px monospace";
                this.ctx.fillStyle = "#151230";
                this.ctx.textAlign = "center";
                this.ctx.fillText(t, wrapped[0] + 1, wrapped[1] - enemy.radius - 9 + 1)
                this.ctx.fillText(t, wrapped[0] + 1, wrapped[1] - enemy.radius - 9 - 1)
                this.ctx.fillText(t, wrapped[0] - 1, wrapped[1] - enemy.radius - 9 + 1)
                this.ctx.fillText(t, wrapped[0] - 1, wrapped[1] - enemy.radius - 9 - 1)
                this.ctx.fillStyle = "white";
                this.ctx.fillText(t, wrapped[0], wrapped[1] - enemy.radius - 9)
                
                this.ctx.restore();
            }
            this.ctx.globalAlpha = 1;

            if (enemy.type === "iriditeBoss") {
                // NEW: Laser visual when active or winding-up
                if (enemy._laserTimer && enemy._laserTimer > 0) {
                    // show winding glow for first frames, then full beam
                    const laserTotal = 180 + enemy.phase * 40;
                    const elapsed = laserTotal - enemy._laserTimer;
                    const windup = 8;
                    const progress = Math.max(0, Math.min(1, (elapsed - windup) / (laserTotal - windup)));
                    const angle = enemy._laserAngle || Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
                    // beam parameters
                    const beamLen = Math.max(this.width, this.height) * 1.5;
                    const maxThickness = Math.max(16, enemy.radius * 1.0 + enemy.phase * 2);
                    const thickness = windup > elapsed ? (maxThickness * (elapsed / windup)) : (maxThickness * (0.6 + 0.4 * progress));
                    // draw glow
                    this.ctx.save();
                    this.ctx.translate(enemy.x + (this.canvasWidth / 2) - this.ship.x, enemy.y + (this.canvasHeight / 2) - this.ship.y);
                    this.ctx.rotate(angle);
                    // additive glow
                    this.ctx.globalCompositeOperation = "lighter";
                    // long soft gradient
                    let g = this.ctx.createLinearGradient(0, -thickness * 2, beamLen, thickness * 2);
                    g.addColorStop(0, `rgba(200,120,255,${0.12 + 0.28 * progress})`);
                    g.addColorStop(0.1, `rgba(255,120,180,${0.18 + 0.32 * progress})`);
                    g.addColorStop(0.6, `rgba(180,255,255,${0.06 + 0.18 * progress})`);
                    g.addColorStop(1, `rgba(200,120,255,${0.02 + 0.06 * progress})`);
                    this.ctx.fillStyle = g;
                    this.ctx.beginPath();
                    this.ctx.rect(0, -thickness, beamLen, thickness * 2);
                    this.ctx.fill();
                    // core bright stripe
                    this.ctx.fillStyle = `rgba(255,220,160,${0.9 * (0.5 + 0.5 * progress)})`;
                    this.ctx.fillRect(0, -Math.max(2, thickness * 0.12), beamLen * 0.75, Math.max(2, thickness * 0.12) * 2);
                    // sparks along beam
                    for (let i = 0; i < 12; i++) {
                        let t = Math.random() * (0.85);
                        let x = t * beamLen;
                        let y = (Math.random() - 0.5) * thickness * 1.6;
                        this.ctx.fillStyle = `rgba(255,${200 + Math.floor(Math.random()*55)},${180},${0.12 + Math.random()*0.3})`;
                        this.ctx.fillRect(x, y, 2 + Math.random() * 4, 1 + Math.random() * 3);
                    }
                    this.ctx.restore();
                    this.ctx.globalCompositeOperation = "source-over";
                }
            }
            if (enemy.type === "iriditeBoss") {
                // support both legacy _daggerWarnings and new _daggerLines shape to be safe
                if (enemy._daggerWarnings && enemy._daggerWarnings.length > 0) {
                    for (let warn of enemy._daggerWarnings) {
                        let alpha = Math.max(0.12, Math.min(0.95, warn.timer / 60));
                        this.ctx.save();
                        this.ctx.strokeStyle = `rgba(255,40,40,${alpha})`;
                        this.ctx.lineWidth = 2 + Math.max(0, 4 * alpha);
                        this.ctx.beginPath();
                        this.ctx.moveTo(enemy.x + (this.canvasWidth / 2) - this.ship.x, enemy.y + (this.canvasHeight / 2) - this.ship.y);
                        this.ctx.lineTo(warn.tx + (this.canvasWidth / 2) - this.ship.x, warn.ty + (this.canvasHeight / 2) - this.ship.y);
                        this.ctx.stroke();
                        this.ctx.fillStyle = `rgba(255,50,50,${alpha})`;
                        this.ctx.beginPath();
                        this.ctx.arc(warn.tx + (this.canvasWidth / 2) - this.ship.x, warn.ty + (this.canvasHeight / 2) - this.ship.y, 6 * alpha + 2, 0, Math.PI * 2);
                        this.ctx.fill();
                        this.ctx.restore();
                        if (typeof warn.timer === "number") warn.timer--;
                    }
                    enemy._daggerWarnings = enemy._daggerWarnings.filter(w => w.timer > 0);
                }
                // NEW: draw arena-spanning dagger warning lines
                if (enemy._daggerLines && enemy._daggerLines.length > 0) {
                    for (let ln of enemy._daggerLines) {
                        let prepMax = 48; // should match prep chosen in update
                        let alpha = Math.max(0.08, Math.min(0.95, (ln.timer || 0) / prepMax));
                        this.ctx.save();
                        this.ctx.strokeStyle = `rgba(255,60,60,${0.25 * alpha})`;
                        this.ctx.lineWidth = 14 * (0.3 + 0.7 * alpha);
                        this.ctx.beginPath();
                        this.ctx.moveTo(ln.x1 + (this.canvasWidth / 2) - this.ship.x, ln.y1 + (this.canvasHeight / 2) - this.ship.y);
                        this.ctx.lineTo(ln.x2 + (this.canvasWidth / 2) - this.ship.x, ln.y2 + (this.canvasHeight / 2) - this.ship.y);
                        this.ctx.stroke();
                        // sharp red core
                        this.ctx.strokeStyle = `rgba(255,20,20,${0.95 * alpha})`;
                        this.ctx.lineWidth = 2;
                        this.ctx.beginPath();
                        this.ctx.moveTo(ln.x1 + (this.canvasWidth / 2) - this.ship.x, ln.y1 + (this.canvasHeight / 2) - this.ship.y);
                        this.ctx.lineTo(ln.x2 + (this.canvasWidth / 2) - this.ship.x, ln.y2 + (this.canvasHeight / 2) - this.ship.y);
                        this.ctx.stroke();
                        // little markers along the line
                        const markers = 6;
                        for (let m = 0; m < markers; m++) {
                            let t = m / (markers - 1);
                            let mx = ln.x1 + (ln.x2 - ln.x1) * t;
                            let my = ln.y1 + (ln.y2 - ln.y1) * t;
                            this.ctx.fillStyle = `rgba(255,90,90,${0.6 * alpha})`;
                            this.ctx.beginPath();
                            this.ctx.arc(mx + (this.canvasWidth / 2) - this.ship.x, my + (this.canvasHeight / 2) - this.ship.y, 2 + 2 * alpha, 0, Math.PI * 2);
                            this.ctx.fill();
                        }
                        this.ctx.restore();
                        if (typeof ln.timer === "number") ln.timer = Math.max(0, ln.timer - 1);
                    }
                    enemy._daggerLines = enemy._daggerLines.filter(l => (l.timer === undefined) || l.timer >= 0);
                }

                // Draw converge dagger warnings (origins->point)
                if (enemy._daggerConverge && enemy._daggerConverge.point) {
                    const tgt = enemy._daggerConverge.point;
                    for (let o of enemy._daggerConverge.origins) {
                        let alpha = Math.max(0.08, Math.min(0.95, (o.timer || enemy._daggerPrep) / (enemy._daggerPrep || 48)));
                        this.ctx.save();
                        this.ctx.strokeStyle = `rgba(255,60,60,${0.18 * alpha})`;
                        this.ctx.lineWidth = 6 * (0.4 + 0.6 * alpha);
                        this.ctx.beginPath();
                        this.ctx.moveTo(o.x, o.y);
                        this.ctx.lineTo(tgt.x, tgt.y);
                        this.ctx.stroke();
                        this.ctx.fillStyle = `rgba(255,40,40,${0.95 * alpha})`;
                        this.ctx.beginPath();
                        this.ctx.arc(o.x, o.y, 4 + 4 * alpha, 0, Math.PI * 2);
                        this.ctx.fill();
                        this.ctx.restore();
                        if (typeof o.timer === "number") o.timer = Math.max(0, o.timer - 1);
                    }
                    this.ctx.save();
                    this.ctx.fillStyle = "rgba(255,90,90,0.95)";
                    this.ctx.beginPath();
                    this.ctx.arc(enemy._daggerConverge.point.x, enemy._daggerConverge.point.y, 8, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                }

                // Draw giant attack warning lines if present
                if (enemy._giantLines && enemy._giantLines.length > 0) {
                    for (let ln of enemy._giantLines) {
                        let prepMax = enemy._giantPrep || 54;
                        let alpha = Math.max(0.06, Math.min(0.95, (ln.timer || prepMax) / prepMax));
                        this.ctx.save();
                        this.ctx.strokeStyle = `rgba(255,200,80,${0.14 * alpha})`;
                        this.ctx.lineWidth = 10 * (0.3 + 0.7 * alpha);
                        this.ctx.beginPath();
                        this.ctx.moveTo(ln.x1, ln.y1);
                        this.ctx.lineTo(ln.x2, ln.y2);
                        this.ctx.stroke();
                        this.ctx.strokeStyle = `rgba(255,90,40,${0.95 * alpha})`;
                        this.ctx.lineWidth = 2;
                        this.ctx.beginPath();
                        this.ctx.moveTo(ln.x1, ln.y1);
                        this.ctx.lineTo(ln.x2, ln.y2);
                        this.ctx.stroke();
                        this.ctx.restore();
                        if (typeof ln.timer === "number") ln.timer = Math.max(0, ln.timer - 1);
                    }
                }
            }
        }

        // Draw sniper auto-aim target cross if present
        if (player.ir.shipType == 4 && this.ship.currentTarget && this.ship.currentTarget.health.gt(0)) {
            let t = this.ship.currentTarget;
            let wrapped = this.getVisibleWrappedCoords([t.x, t.y], [t.radius * 2, t.radius * 2])
            if (wrapped) {
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                this.ctx.beginPath();
                this.ctx.moveTo(-16, 0);
                this.ctx.lineTo(16, 0);
                this.ctx.moveTo(0, -16);
                this.ctx.lineTo(0, 16);
                this.ctx.moveTo(0, 0);
                this.ctx.arc(0, 0, 4, 0, Math.PI * 2);
                this.ctx.strokeStyle = "#ff4444";
                this.ctx.lineWidth = 6;
                this.ctx.stroke();
                this.ctx.strokeStyle = "yellow";
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                this.ctx.restore();
            };
        }

        // Draw loot flashes
        for (let i = this.lootFlashes.length - 1; i >= 0; i--) {
            let flash = this.lootFlashes[i];
            let wrapped = this.getVisibleWrappedCoords([flash.x, flash.y - 30 - (120 - flash.timer)], [400, 50])
            if (wrapped != null) {
                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, flash.timer / 120);
                this.ctx.font = flash.style;
                this.ctx.fillStyle = flash.color;
                this.ctx.textAlign = "center";
                this.ctx.fillText(
                    flash.text,
                    wrapped[0] + (this.canvasWidth / 2) - this.ship.x,
                    wrapped[1] + (this.canvasHeight / 2) - this.ship.y,
                );
                this.ctx.restore();
            }            
            flash.timer--;
            if (flash.timer <= 0) this.lootFlashes.splice(i, 1);
        }

        // Draw minimap

        this.ctx.save();
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = "#0000007f";
        this.ctx.strokeStyle = player.ir.primaryColor;
        this.ctx.lineWidth = 3;
        let aspectRatio = this.width / this.height
        if (aspectRatio < 1) {
            this.ctx.fillRect(20 + (80 * (1 - aspectRatio)), 20, 160 * aspectRatio, 160);
            this.ctx.strokeRect(20 + (80 * (1 - aspectRatio)), 20, 160 * aspectRatio, 160);
        } else {
            this.ctx.fillRect(20, 20 + (80 * (1 - (1 / aspectRatio))), 160, 160 * (1 / aspectRatio));
            this.ctx.strokeRect(20, 20 + (80 * (1 - (1 / aspectRatio))), 160, 160 * (1 / aspectRatio));
        }
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(98, 98, 4, 4);
        
        for (let asteroid of this.asteroids) {
            this.ctx.save();
            this.drawMinimapIcon("gray", 4, [asteroid.x, asteroid.y])
            this.ctx.restore();
        }
        for (let orb of this.xpOrbs) {
            this.ctx.save();
            this.drawMinimapIcon("blue", 2, [orb.x, orb.y])
            this.ctx.restore();
        }
        for (let bullet of this.bullets) {
            this.ctx.save();
            if (bullet.fromEnemy) {
                this.drawMinimapIcon("red", 2, [bullet.x, bullet.y])
            } else {
                this.drawMinimapIcon("yellow", 2, [bullet.x, bullet.y])
            }
            this.ctx.restore();
        }
        if (player.ir.shipType == 8 && this.ship._laserActive) {
            this.ctx.save();
            this.ctx.fillStyle = "yellow"
            this.ctx.translate(100, 100)
            this.ctx.rotate(-this.ship._laserAngle)
            this.ctx.fillRect(0, -1, this.ship._laserLength / Math.min(this.width, this.height) * 160, 2)
            this.ctx.restore();
        }
        for (let enemy of this.enemies) {
            this.ctx.save();
            if (enemy.type == "muShip") {
                if (enemy.playerDist < 300 || Math.random() < 0.00333 || enemy.targetingTimer > 0) this.drawMinimapIcon("red", 4, [enemy.x, enemy.y])
            } else this.drawMinimapIcon("red", 4, [enemy.x, enemy.y]);
            this.ctx.restore();
        }
        for (let trail of this.gammaTrails) {
            this.ctx.save();
            this.drawMinimapIcon("red", 2, [trail.x, trail.y])
            this.ctx.restore();
        }

        // Draw mobile controls
        if (player.ir.mobileControls && (player.ir.shipType != 3 && player.ir.shipType != 7)) {
            this.ctx.save();
            this.ctx.globalAlpha = 1
            this.ctx.lineWidth = 3;

            // LEFT STICK

            // OUTER CIRCLE
            this.ctx.fillStyle = "#ffff003f";
            this.ctx.beginPath();
            this.ctx.ellipse(100 * this.mobileControlsScale, this.canvasHeight - (100 * this.mobileControlsScale), 80 * this.mobileControlsScale, 80 * this.mobileControlsScale, 0, 0, 360);
            this.ctx.closePath();
            this.ctx.fill();

            // INNER CIRCLE
            this.ctx.fillStyle = "#0000003f";
            this.ctx.beginPath();
            this.ctx.ellipse(100 * this.mobileControlsScale, this.canvasHeight - (100 * this.mobileControlsScale), 40 * this.mobileControlsScale + 6, 40 * this.mobileControlsScale + 6, 0, 0, 360);
            this.ctx.closePath();
            this.ctx.fill();

            // STICK
            this.ctx.fillStyle = "#ffff00bf";
            this.ctx.beginPath();
            if (this.mobileLeftStickAngle == null) {
                this.ctx.ellipse(100 * this.mobileControlsScale, this.canvasHeight - (100 * this.mobileControlsScale), 40 * this.mobileControlsScale, 40 * this.mobileControlsScale, 0, 0, 360);
            } else {
                this.ctx.ellipse(100 * this.mobileControlsScale + Math.cos(this.mobileLeftStickAngle) * 40 * this.mobileControlsScale, this.canvasHeight - (100 * this.mobileControlsScale) + Math.sin(this.mobileLeftStickAngle) * 40 * this.mobileControlsScale, 40 * this.mobileControlsScale, 40 * this.mobileControlsScale, 0, 0, 360);
            }
            this.ctx.closePath();
            this.ctx.fill();

            // OUTLINE
            this.ctx.strokeStyle = "#ffff006e";
            this.ctx.beginPath();
            this.ctx.arc(100 * this.mobileControlsScale, this.canvasHeight - (100 * this.mobileControlsScale), (80 * this.mobileControlsScale), 0, 360);
            this.ctx.stroke();
            
            if (player.ir.shipType == 5 || player.ir.shipType == 8) {
                // RIGHT STICK
                // OUTER CIRCLE
                this.ctx.fillStyle = "#ffff003f";
                this.ctx.beginPath();
                this.ctx.ellipse(this.canvasWidth - (100 * this.mobileControlsScale), this.canvasHeight - (100 * this.mobileControlsScale), 80 * this.mobileControlsScale, 80 * this.mobileControlsScale, 0, 0, 360);
                this.ctx.closePath();
                this.ctx.fill();
                // INNER CIRCLE
                this.ctx.fillStyle = "#0000003f";
                this.ctx.beginPath();
                this.ctx.ellipse(this.canvasWidth - (100 * this.mobileControlsScale), this.canvasHeight - (100 * this.mobileControlsScale), 40 * this.mobileControlsScale + 6, 40 * this.mobileControlsScale + 6, 0, 0, 360);
                this.ctx.closePath();
                this.ctx.fill();
                // STICK
                this.ctx.fillStyle = "#ffff00bf";
                this.ctx.beginPath();
                if (this.mobileRightStickAngle == null) {
                    this.ctx.ellipse(this.canvasWidth - (100 * this.mobileControlsScale), this.canvasHeight - (100 * this.mobileControlsScale), 40 * this.mobileControlsScale, 40 * this.mobileControlsScale, 0, 0, 360);
                } else {
                    this.ctx.ellipse(this.canvasWidth - (100 * this.mobileControlsScale) + Math.cos(this.mobileRightStickAngle) * 40 * this.mobileControlsScale, this.canvasHeight - (100 * this.mobileControlsScale) + Math.sin(this.mobileRightStickAngle) * 40 * this.mobileControlsScale, 40 * this.mobileControlsScale, 40 * this.mobileControlsScale, 0, 0, 360);
                }
                this.ctx.closePath();
                this.ctx.fill();
                // OUTLINE
                this.ctx.strokeStyle = "#ffff006e";
                this.ctx.beginPath();
                this.ctx.arc(this.canvasWidth - (100 * this.mobileControlsScale), this.canvasHeight - (100 * this.mobileControlsScale), (80 * this.mobileControlsScale), 0, 360);
                this.ctx.stroke();
            } else if (!player.ir.autoShoot) {
                // RIGHT BUTTON
                // OUTER CIRCLE
                this.ctx.fillStyle = "#ffff003f";
                this.ctx.beginPath();
                this.ctx.ellipse(this.canvasWidth - (100 * this.mobileControlsScale), this.canvasHeight - (100 * this.mobileControlsScale), 80 * this.mobileControlsScale, 80 * this.mobileControlsScale, 0, 0, 360);
                this.ctx.closePath();
                this.ctx.fill();
                // INNER CIRCLE
                this.ctx.fillStyle = "#0000003f";
                this.ctx.beginPath();
                this.ctx.ellipse(this.canvasWidth - (100 * this.mobileControlsScale), this.canvasHeight - (100 * this.mobileControlsScale), 71 * this.mobileControlsScale + 6, 71 * this.mobileControlsScale + 6, 0, 0, 360);
                this.ctx.closePath();
                this.ctx.fill();
                // OUTLINE
                this.ctx.strokeStyle = "#ffff006e";
                this.ctx.beginPath();
                this.ctx.arc(this.canvasWidth - (100 * this.mobileControlsScale), this.canvasHeight - (100 * this.mobileControlsScale), (80 * this.mobileControlsScale), 0, 360);
                this.ctx.stroke();
                // TEXT
                this.ctx.fillStyle = "#ffff00bf";
                this.ctx.font = "bold 48px monospace";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Shoot", this.canvasWidth - (100 * this.mobileControlsScale), this.canvasHeight - (100 * this.mobileControlsScale) + 12);
            }

            this.ctx.restore();
        }

        // Draw upgrade choice overlay (unchanged)
        if (player.ir.menu > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.375;
            this.ctx.fillStyle =player.ir.secondaryColor;
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.restore();
            
            if (player.ir.menu == 1) {
                this.ctx.save();
                this.ctx.moveTo(this.ship.x + (this.canvasWidth / 2), this.ship.y + (this.canvasHeight / 2));
                this.ctx.globalAlpha = 1;
                this.ctx.font = "bold 48px monospace";
                this.ctx.fillStyle = "#fff";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Choose an Upgrade!", this.canvasWidth / 2, this.canvasHeight / 2 - 100);

                let spacing = 262.5;
                let boxWidth = 250;
                let boxHeight = 150;
                let totalWidth = spacing * (this.upgradeChoices.length - 1) + boxWidth;
                let startX = (this.canvasWidth - totalWidth) / 2;
                let boxY = (this.canvasHeight - boxHeight) / 2;

                for (let i = 0; i < this.upgradeChoices.length; i++) {
                    let upg = UPGRADE_POOL[this.upgradeChoices[i]];
                    let boxX = startX + i * spacing;

                    this.ctx.save();
                    this.ctx.globalAlpha = 1;
                    this.ctx.fillStyle = "#000080";
                    this.ctx.strokeStyle = UPGRADE_RARITIES[upg.rarity].color;
                    this.ctx.lineWidth = 3;
                    this.ctx.beginPath();
                    this.ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 10);
                    this.ctx.fill();
                    this.ctx.stroke();

                    if (this.selectedUpgradeIndex === i) {
                        this.ctx.save();
                        this.ctx.strokeStyle = "#ffe066";
                        this.ctx.lineWidth = 3;
                        this.ctx.beginPath();
                        this.ctx.roundRect(boxX + 3, boxY + 3, boxWidth - 6, boxHeight - 6, 7);
                        this.ctx.stroke();
                        this.ctx.restore();
                    }

                    this.ctx.font = "bold 24px monospace";
                    this.ctx.fillStyle = UPGRADE_RARITIES[upg.rarity].color;
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(upg.name(), boxX + boxWidth / 2, boxY + 30);

                    let rarityText = upg.rarity.charAt(0).toUpperCase() + upg.rarity.slice(1);
                    this.ctx.font = "italic 18px monospace";
                    this.ctx.fillStyle = UPGRADE_RARITIES[upg.rarity].color;
                    this.ctx.fillText(rarityText, boxX + boxWidth / 2, boxY + 54);

                    this.ctx.font = "16px monospace";
                    this.ctx.fillStyle = "#fff";
                    let desc = upg.description();
                    let descLines = [];
                    let words = desc.split(" ");
                    let line = "";
                    for (let w = 0; w < words.length; w++) {
                        let testLine = line + words[w] + " ";
                        let metrics = this.ctx.measureText(testLine);
                        if (metrics.width > boxWidth - 40 && line.length > 0) {
                            descLines.push(line.trim());
                            line = words[w] + " ";
                        } else {
                            line = testLine;
                        }
                    }
                    descLines.push(line.trim());
                    for (let l = 0; l < descLines.length; l++) {
                        this.ctx.fillText(descLines[l], boxX + boxWidth / 2, boxY + 78 + l * 18);
                    }
                    this.ctx.restore();
                }

                if (this.selectedUpgradeIndex !== null) {
                    let confirmWidth = 250;
                    let confirmHeight = 50;
                    let confirmX = this.canvasWidth / 2 - confirmWidth / 2;
                    let confirmY = boxY + boxHeight + 12;
                    this.ctx.save();
                    this.ctx.globalAlpha = 1;
                    this.ctx.fillStyle = "#000080";
                    this.ctx.strokeStyle = "#ffe066";
                    this.ctx.lineWidth = 3;
                    this.ctx.beginPath();
                    this.ctx.roundRect(confirmX, confirmY, confirmWidth, confirmHeight, 10);
                    this.ctx.fill();
                    this.ctx.stroke();

                    this.ctx.font = "bold 24px monospace";
                    this.ctx.fillStyle = "#fff";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText("Confirm", confirmX + confirmWidth / 2, confirmY + confirmHeight / 2 + 10);
                    this.ctx.restore();

                    let upgrades = structuredClone(this.upgrades)
                    upgrades[this.upgradeChoices[this.selectedUpgradeIndex]]++
                    let potentialShipStats = this.getUpgradedShipStats(upgrades)
                    let matches = []
                    for (const [i, v] of Object.entries(potentialShipStats)) {
                        if (typeof(v) === "object") {
                            if (!v.eq(this.shipStats[i])) matches.push(i);
                        } else if (v != this.shipStats[i]) matches.push(i);
                    }

                    for (let i = 0; i < matches.length; i++) {
                        let key = matches[i]
                        let statMul = 1
                        if (key == "healthRegen") statMul *= 60;
                        this.ctx.save();
                        this.ctx.globalAlpha = 1;
                        this.ctx.fillStyle = player.ir.secondaryColor;
                        this.ctx.strokeStyle = player.ir.primaryColor;
                        this.ctx.lineWidth = 3;
                        this.ctx.beginPath();
                        this.ctx.roundRect(this.canvasWidth / 2 - 387.5, confirmY + 62 + i * 61, 775, 50, 10);
                        this.ctx.fill();
                        this.ctx.stroke();

                        this.ctx.font = "bold 24px monospace";
                        this.ctx.fillStyle = "#fff";
                        this.ctx.textAlign = "left";
                        this.ctx.fillText(SHIP_STAT_FORMATTING[key].name, this.canvasWidth / 2 - 375, confirmY + 97 + i * 61, 775);

                        this.ctx.font = "bold 24px monospace";
                        this.ctx.fillStyle = "#fff";
                        this.ctx.textAlign = "right";
                        this.ctx.fillText(SHIP_STAT_FORMATTING[key].valuePrefix + formatSimple(this.shipStats[key] * statMul, 2) + SHIP_STAT_FORMATTING[key].valueSuffix + " → " + SHIP_STAT_FORMATTING[key].valuePrefix + formatSimple(potentialShipStats[key] * statMul, 2) + SHIP_STAT_FORMATTING[key].valueSuffix, this.canvasWidth / 2 + 375, confirmY + 97 + i * 61, 750);

                        this.ctx.restore();
                    }
                }
            } else if (player.ir.menu == 2) {
                this.ctx.save();
                this.ctx.globalAlpha = 1;
                this.ctx.font = "bold 48px monospace";
                this.ctx.fillStyle = "#fff";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Stats", this.canvasWidth / 2, this.canvasHeight / 2 - 325);
                let matches = []
                for (const [i, v] of Object.entries(this.shipStats)) {
                    if (SHIP_STAT_FORMATTING[i].showCondition()) matches.push(i);
                };
                for (let i = 0; i < matches.length; i++) {
                    let key = matches[i]
                    let statMul = this.shipStats[key]
                    if (key == "healthRegen") statMul *= 60;
                    
                    this.ctx.save();
                    this.ctx.globalAlpha = 1;
                    this.ctx.fillStyle = player.ir.secondaryColor;
                    this.ctx.strokeStyle = player.ir.primaryColor;
                    this.ctx.lineWidth = 3;
                    this.ctx.beginPath();
                    this.ctx.roundRect(this.canvasWidth / 2 - 387.5, (this.canvasHeight / 2 - 278) + i * 61, 775, 50, 10);
                    this.ctx.fill();
                    this.ctx.stroke();

                    this.ctx.font = "bold 24px monospace";
                    this.ctx.fillStyle = "#fff";
                    this.ctx.textAlign = "left";
                    this.ctx.fillText(SHIP_STAT_FORMATTING[key].name, this.canvasWidth / 2 - 375, (this.canvasHeight / 2 - 243) + i * 61, 775);

                    this.ctx.font = "bold 24px monospace";
                    this.ctx.fillStyle = "#fff";
                    this.ctx.textAlign = "right";
                    this.ctx.fillText(SHIP_STAT_FORMATTING[key].valuePrefix + formatSimple(statMul, 2) + SHIP_STAT_FORMATTING[key].valueSuffix, this.canvasWidth / 2 + 375, (this.canvasHeight / 2 - 243) + i * 61, 750);
                    
                    this.ctx.restore();
                }
            }

            this.ctx.restore();
        }
    }

    showUpgradeChoice() {
        this.ship._laserActive = false
        player.ir.menu = 1;
        this.upgradeChoices = pickUpgrades();
        this.selectedUpgradeIndex = null;
        this.pauseEvents();

        this.canvas.onclick = (e) => {
            if (player.ir.menu != 1) return;
            let rect = this.canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            let spacing = 262.5;
            let boxWidth = 250;
            let boxHeight = 150;
            let totalWidth = spacing * (this.upgradeChoices.length - 1) + boxWidth;
            let startX = (this.canvasWidth - totalWidth) / 2;
            let boxY = (this.canvasHeight - boxHeight) / 2;

            for (let i = 0; i < this.upgradeChoices.length; i++) {
                let boxX = startX + i * spacing;
                if (
                    x > boxX &&
                    x < boxX + boxWidth &&
                    y > boxY &&
                    y < boxY + boxHeight
                ) {
                    this.selectedUpgradeIndex = i;
                    this.draw();
                    return;
                }
            }

            if (this.selectedUpgradeIndex !== null) {
                let confirmWidth = 250;
                let confirmHeight = 50;
                let confirmX = this.canvasWidth / 2 - confirmWidth / 2;
                let confirmY = boxY + boxHeight + 12;
                if (
                    x > confirmX &&
                    x < confirmX + confirmWidth &&
                    y > confirmY &&
                    y < confirmY + confirmHeight
                ) {
                    let upg = UPGRADE_POOL[this.upgradeChoices[this.selectedUpgradeIndex]];
                    upg.effect(this);
                    player.ir.menu = 0;
                    this.upgradeChoices = [];
                    this.selectedUpgradeIndex = null;
                    this.resumeEvents();
                    this.canvas.onclick = null;
                    return;
                }
            }
        };
    }

    pauseEvents() {
        this.running = false;
    }

    resumeEvents() {
        this.running = true;
        if (!this.loop) {
            this.loop = setInterval(() => this.update(), 1000 / 60);
        }
    }

    onShipDeath() {
        // Ensure iridite flags reset if player dies during the fight
        if (player.ir.iriditeFightActive) {
            player.ir.iriditeFightActive = false;
        }
        if (arena) {
            arena.removeArena();
            arena = null;
        }
        player.ir.battleLevel = new Decimal(1);
        player.ir.battleXP = new Decimal(0);
        if (arena) arena.shipStats = arena.getDefaultShipStatMults();
        if (player.tab == "ir") player.subtabs["ir"]['stuff'] = "Lose";
        if (player.tab == "bl") player.subtabs["bl"]['stuff'] = "Lose";
        if (player.tab == "cbs") player.subtabs["cbs"]['stuff'] = "Lose";
        localStorage.setItem('arenaActive', 'false');
    }
}

function summonIridite() {
    if (!arena) {
        console.warn("summonIridite: no active arena instance");
        return;
    }
    if (arena.bossActive) {
        console.warn("summonIridite: a boss is already active");
        return;
    }

    // Clear existing normal enemies/asteroids/bullets for isolated boss fight
    arena.enemies.forEach(e => e.alive = false);
    arena.enemies = [];
    arena.asteroids = [];
    arena.bullets = arena.bullets.filter(b => b.fromEnemy); // keep existing enemy bullets if desired

    // Mark boss active and spawn
    arena.bossActive = true;
    if (typeof arena.spawnIridite === "function") {
        
        arena.spawnIridite();
    } else {
        console.warn("summonIridite: arena.spawnIridite not available");
    }
    screenFlash("— Iridite, the Astral Celestial —", 1200)
}
window.summonIridite = summonIridite;

function pauseAsteroidMinigame() {
    if (!arena) return;
    if (typeof arena.pauseAsteroidMinigame === 'function') arena.pauseAsteroidMinigame();
}
window.pauseAsteroidMinigame = pauseAsteroidMinigame;

function resumeAsteroidMinigame() {
    if (!arena) return;
    if (typeof arena.resumeAsteroidMinigame === 'function') arena.resumeAsteroidMinigame();
}
window.resumeAsteroidMinigame = resumeAsteroidMinigame;

