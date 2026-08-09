//shipBattleSkip(new Decimal(17), {attackDamage: 3, damageReduction: 0.3, attackSpeed: 0.8, lootGain: 1.8, gemGain: 1.2})
function shipBattleSkip(level = new Decimal(0), upgEffect = {}) {
    player.ir.inBattle = true
    options.fullscreen = true
    if (player.tab == "ir") {
        player.subtabs["ir"]['stuff'] = 'Battle'

        arena = new SpaceArena(1200, 600);
        arena.spawnArena();
        localStorage.setItem('arenaActive', 'true');

        pauseUniverseAll(["U3", "A2", "DS", "D1"], "pause", true)
    } else {
        player.subtabs["bl"]['stuff'] = 'Battle'

        arena = new BloodArena(1200, 600);
        arena.spawnArena();
        localStorage.setItem('arenaActive', 'true');
    }

    player.ir.shipHealth = player.ir.shipHealthMax
    let regen = 0
    if (hasUpgrade("ir", 14)) regen += 0.5
    regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
    if (regen > 0) arena.shipStats.healthRegen = regen / 60

    arena.shipStats.attackDamage *= levelableEffect("ir", player.ir.shipType)[2]
    arena.shipStats = Object.assign(arena.shipStats, upgEffect)

    if (player.tab == "ir") {
        if (level.lte(8)) player.ir.ufoFought = false
        if (level.lte(16)) player.ir.iriditeFought = false
    } else {
        if (level.lte(20)) player.bl.noxFightActive = false
    }
    player.ir.battleLevel = level
}

const createConnectionComponent = function(x1, y1, x2, y2, color) {
    return ["style-row", [], {
        position: "relative",
            left: () => {return ((x1 + x2) / 2) - 50 + "px"},
            top: () => {return ((y1 + y2) / 2) + "px"},
            transform: () => {return "rotate(" + Math.atan2(y2 - y1, x2 - x1) + "rad)"},
            width: () => {return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)) + "px"},
            height: "0px", border: "3px dotted " + color, borderBottom: "0", margin: "-3px",
        }]
}

addLayer("ir", {
    name: "Iridite",
    symbol: "✦",
    universe: "A2",
    row: 1,
    position: 0,
    innerLayer() {return player.subtabs["ir"]["stages"]},
    startData() { return {
        unlocked: true,
        iriditeUnlocked: false,

        inBattle: false,
        menu: 0,
        mobileControls: 0,
        battleStage: "spaceZone1",
        levelScalingMult: new Decimal(1),

        shipHealth: new Decimal(0),
        shipHealthMax: new Decimal(100),
        shipDamageMult: new Decimal(1),

        spaceRock: new Decimal(0),
        spaceRockMult: new Decimal(1),
        spaceGem: new Decimal(0),
        spaceGemMult: new Decimal(1),

        primaryColor: "#5e4ee6",
        secondaryColor: "#37078f",

        shipBattleSaveCurrent: null,
        shipBattleSaves: [null, null, null, null, null, null,],

        selectingShip: false,

        shipType: 1,
        sendCooldownTimer: new Decimal(0),
        send: {
            0: {
                max: new Decimal(0),
                onClick(isRewarded) {},
                statDisplay() {return "Nothing"}
            },
            1: {
                max: new Decimal(600),
                onClick(isRewarded) {
                    let gain = new Decimal(200)
                    gain = gain.mul(levelableEffect("pet", 502)[2])
                    gain = gain.mul(getLevelableAmount("ir", 1).mul(0.1).add(1))
                    if (isRewarded) player.ir.spaceRock = player.ir.spaceRock.add(gain);
                    return gain
                },
                statDisplay() {return "Space Rock"}
            },
            2: {
                max: new Decimal(900),
                onClick(isRewarded) {
                    let gain = new Decimal(1)
                    if (hasUpgrade("ir", 104)) gain = gain.mul(2);
                    gain = gain.mul(getLevelableAmount("ir", 2).mul(0.02).add(1))
                    if (isRewarded) player.ir.spaceGem = player.ir.spaceGem.add(gain);
                    return gain
                },
                statDisplay() {return "Space Gem"}
            },
            3: {
                max: new Decimal(3600),
                onClick(isRewarded) {
                    let gain = new Decimal(1e3)
                    gain = gain.mul(levelableEffect("pet", 502)[2])
                    gain = gain.mul(getLevelableAmount("ir", 3).mul(0.1).add(1))
                    if (isRewarded) player.ir.spaceRock = player.ir.spaceRock.add(gain);
                    return gain
                },
                statDisplay() {return "Space Rock"}
            },
            4: {
                max: new Decimal(5400),
                onClick(isRewarded) {
                    let gain = new Decimal(3)
                    if (hasUpgrade("ir", 104)) gain = gain.mul(2);
                    gain = gain.mul(getLevelableAmount("ir", 4).mul(0.02).add(1))
                    if (isRewarded) player.ir.spaceGem = player.ir.spaceGem.add(gain);
                    return gain
                },
                statDisplay() {return "Space Gem"}
            },
            5: {
                max: new Decimal(21600),
                onClick(isRewarded) {
                    let gain = new Decimal(4e3)
                    gain = gain.mul(levelableEffect("pet", 502)[2])
                    gain = gain.mul(getLevelableAmount("ir", 5).mul(0.1).add(1))
                    if (isRewarded) player.ir.spaceRock = player.ir.spaceRock.add(gain);
                    return gain
                },
                statDisplay() {return "Space Rock"}
            },
            6: {
                max: new Decimal(32400),
                onClick(isRewarded) {
                    let gain = new Decimal(8)
                    if (hasUpgrade("ir", 104)) gain = gain.mul(2);
                    gain = gain.mul(getLevelableAmount("ir", 6).mul(0.02).add(1))
                    if (isRewarded) player.ir.spaceGem = player.ir.spaceGem.add(gain);
                    return gain
                },
                statDisplay() {return "Space Gem"}
            },
            7: {
                max: new Decimal(10),
                onClick(isRewarded) {
                    let gain = new Decimal(4)
                    gain = gain.mul(levelableEffect("pet", 502)[2])
                    gain = gain.mul(getLevelableAmount("ir", 7).mul(0.1).add(1))
                    if (isRewarded) player.ir.spaceRock = player.ir.spaceRock.add(gain);
                    return gain
                },
                statDisplay() {return "Space Rock"}
            },
            8: {
                max: new Decimal(10),
                onClick(isRewarded) {
                    let gain = new Decimal(4)
                    gain = gain.mul(levelableEffect("pet", 502)[2])
                    gain = gain.mul(getLevelableAmount("ir", 7).mul(0.1).add(1))
                    if (isRewarded) player.ir.spaceRock = player.ir.spaceRock.add(gain);
                    return gain
                },
                statDisplay() {return "Space Rock"}
            },
            9: {
                max: new Decimal(10),
                onClick(isRewarded) {
                    let gain = new Decimal(4)
                    gain = gain.mul(levelableEffect("pet", 502)[2])
                    gain = gain.mul(getLevelableAmount("ir", 7).mul(0.1).add(1))
                    if (isRewarded) player.ir.spaceRock = player.ir.spaceRock.add(gain);
                    return gain
                },
                statDisplay() {return "Space Rock"}
            },
            10: {
                max: new Decimal(300),
                onClick(isRewarded) {
                    let gain = new Decimal(4)
                    gain = gain.mul(getLevelableAmount("ir", 10).mul(0.1).add(1))
                    if (isRewarded) player.ir.spaceRock = player.ir.spaceRock.add(gain);
                    return gain
                },
                statDisplay() {return "Space Rock"}
            },
        },

        timers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(0),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(600),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(900),
            },
            3: {
                current: new Decimal(0),
                max: new Decimal(1500),
            },
            4: {
                current: new Decimal(0),
                max: new Decimal(1200),
            },
            5: {
                current: new Decimal(0),
                max: new Decimal(1800),
            },
            6: {
                current: new Decimal(0),
                max: new Decimal(1200),
            },
            7: {
                current: new Decimal(0),
                max: new Decimal(600),
            },
            8: {
                current: new Decimal(0),
                max: new Decimal(2100),
            },
            9: {
                current: new Decimal(0),
                max: new Decimal(1800),
            },
            10: {
                current: new Decimal(0),
                max: new Decimal(1800),
            },
        },

        battleLevel: new Decimal(0),
        battleXP: new Decimal(0),
        battleXPReq: new Decimal(0),
        upgrades: [],

        ufoFought: false,
        ufoDefeated: false,

        iriditeFought: false,
        iriditeDefeated: false,
        astralShipUnlocked: false,
        tookDamageInIriditeFight: false,

        iriditePhase: new Decimal(0),

        adsFought: false,
        adsDefeated: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "#151230",
            backgroundOrigin: "border-box",
            borderColor: "#5e4ee6",
            color: "#eaf6f7",
        };
    },
    tooltip: "Iridite, the Astral Celestial",
    branches: ["pl", "se"],
    color: "#151230",
    update(delta) {
        player.ir.shipType = player.ir.shipBattleSaveCurrent == null ? 0 : player.ir.shipBattleSaveCurrent.shipType

        if (arena && arena.upgrades && arena.shipStats) {
            arena.shipStats = arena.getUpgradedShipStats()
        }

        let zoneRef = SB_zones[player.ir.battleStage]

        player.ir.spaceRockMult = new Decimal(1)
        player.ir.spaceRockMult = player.ir.spaceRockMult.mul(upgradeEffect("ir", 21))
        player.ir.spaceRockMult = player.ir.spaceRockMult.mul(levelableEffect("pet", 502)[1])
        player.ir.spaceRockMult = player.ir.spaceRockMult.mul(buyableEffect("sme", 155))
        player.ir.spaceRockMult = player.ir.spaceRockMult.mul(levelableEffect("pu", 212)[1])
        player.ir.spaceRockMult = player.ir.spaceRockMult.mul(buyableEffect("pl", 15))
        player.ir.spaceRockMult = player.ir.spaceRockMult.mul(buyableEffect("pl", 16))
        player.ir.spaceRockMult = player.ir.spaceRockMult.mul(buyableEffect("bl", 15))
        if (zoneRef) player.ir.spaceRockMult = player.ir.spaceRockMult.mul(zoneRef.rockMult);

        player.ir.spaceGemMult = new Decimal(1)
        player.ir.spaceGemMult = player.ir.spaceGemMult.mul(buyableEffect("sme", 156))
        player.ir.spaceGemMult = player.ir.spaceGemMult.mul(buyableEffect("pl", 16))
        player.ir.spaceGemMult = player.ir.spaceGemMult.mul(buyableEffect("bl", 15))
        if (zoneRef) player.ir.spaceGemMult = player.ir.spaceGemMult.mul(zoneRef.gemMult);

        if (!player[player.ir.battleStage]) player.ir.battleStage = "spaceZone1";

        if (arena == null && player.subtabs["ir"]['stuff'] == 'Battle') {
            player.subtabs["ir"]['stuff'] = "Refresh Page :(";
        }

        if (options.fullscreen && player.tab == "ir" && player.subtabs["ir"]["stuff"] != "Battle") options.fullscreen = false
        
        player.ir.levelScalingMult = player.ir.battleLevel.sub(player[player.ir.battleStage].levelScalingStart).add(1).max(0).pow_base(player[player.ir.battleStage].levelScaling)

        // Ship max health by type
        if (player.ir.shipType == 1) player.ir.shipHealthMax = new Decimal(100)
        if (player.ir.shipType == 2) player.ir.shipHealthMax = new Decimal(150)
        if (player.ir.shipType == 3) player.ir.shipHealthMax = new Decimal(75)
        if (player.ir.shipType == 4) player.ir.shipHealthMax = new Decimal(100)
        if (player.ir.shipType == 5) player.ir.shipHealthMax = new Decimal(50)
        if (player.ir.shipType == 6) player.ir.shipHealthMax = new Decimal(75)
        if (player.ir.shipType == 7) player.ir.shipHealthMax = new Decimal(75)
        if (player.ir.shipType == 8) player.ir.shipHealthMax = new Decimal(75)
        if (player.ir.shipType == 9) player.ir.shipHealthMax = new Decimal(100)
        if (player.ir.shipType == 10) player.ir.shipHealthMax = new Decimal(125)

        if (hasUpgrade("ir", 102)) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(1.25)
        if (player.ir.shipType != 0) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(levelableEffect("ir", player.ir.shipType)[3])
        if (hasUpgrade("ir", 17)) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(1.3)
        player.ir.shipHealthMax = player.ir.shipHealthMax.mul(getBuyableAmount("bl", 103).div(100).add(1))
        if (hasMilestone("spaceZone2", 11)) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(1.25);
        if (hasMilestone("spaceZone2", 13)) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(1.15);
        if (hasUpgrade("ir", 29)) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(upgradeEffect("ir", 29).toNumber());

        player.ir.shipDamageMult = new Decimal(1)
        if (hasUpgrade("darkTemple", 14)) player.ir.shipDamageMult = player.ir.shipDamageMult.mul(upgradeEffect("darkTemple", 14))

        player.ir.timers[0].max = new Decimal(0)
        player.ir.timers[1].max = new Decimal(600)
        player.ir.timers[2].max = new Decimal(900)
        player.ir.timers[3].max = new Decimal(1500)
        player.ir.timers[4].max = new Decimal(1200)
        player.ir.timers[5].max = new Decimal(1800)
        player.ir.timers[6].max = new Decimal(1200)
        player.ir.timers[7].max = new Decimal(600)
        player.ir.timers[8].max = new Decimal(3600)
        player.ir.timers[9].max = new Decimal(1800)
        player.ir.timers[10].max = new Decimal(7200)
        for (let i in player.ir.timers) {
            if (hasUpgrade("ir", 18)) player.ir.timers[i].max = player.ir.timers[i].max.div(upgradeEffect("ir", 18))
            player.ir.timers[i].max = player.ir.timers[i].max.div(levelableEffect("pu", 401)[1])
            if (!player.ir.inBattle) player.ir.timers[i].current = player.ir.timers[i].current.sub(delta);
        }

        player.ir.sendCooldownTimer = player.ir.sendCooldownTimer.sub(delta);

        player.ir.battleXPReq = player.ir.battleLevel.add(9).mul(5).add(player.ir.battleLevel.sub(1).pow(2))
        if (hasUpgrade("ir", 103)) player.ir.battleXPReq = player.ir.battleXPReq.div(1.5)
        if (hasUpgrade("ir", 106)) player.ir.battleXPReq = player.ir.battleXPReq.div(1.5)
        player.ir.battleXPReq = player.ir.battleXPReq.div(getBuyableAmount("bl", 14).div(100).add(1))

        // TEMP
        //if (arena && player.ir.battleLevel.lt(2)) player.ir.battleXP = player.ir.battleXP.add(delta*20);

        if (player.ir.battleXP.gte(player.ir.battleXPReq) && arena && player.ir.menu == 0) {
            player.ir.battleXP = player.ir.battleXP.sub(player.ir.battleXPReq).max(0);
            if (player[player.ir.battleStage].highestLevel.lt(player.ir.battleLevel)) player[player.ir.battleStage].highestLevel = player.ir.battleLevel;
            player.ir.battleLevel = player.ir.battleLevel.add(1);
            if (player.ir.battleLevel % 20 == 1) SB_saveRun();
            if (player.ir.battleLevel.gt(SB_zones[player.ir.battleStage].levelLimit)) {
                clickClickable("ir", 12)
            } else {
                SB_zones[player.ir.battleStage].levelUp(player.ir.battleLevel)
                if (arena) {
                    arena.enhanced = false;
                    arena.showUpgradeChoice();
                    arena.upgradeChoiceActive = true
                }
            }
        }
        
        if (arena) {
            if (player.ir.menu > 0) {
                arena.pauseEvents();
            } else {
                arena.resumeEvents();
            };
        }
        if (cutsceneActive) pauseAsteroidMinigame();
        else resumeAsteroidMinigame();
    },
    bars: {
        healthBar: {
            unlocked() { return true },
            direction: RIGHT,
            width() {return (arena && arena._fullscreen) ? "calc(100vw - 6px)" : "398.5px"},
            height: "40px",
            progress() {
                return arena ? player.ir.shipHealth.div(arena.shipStats.maxHp) : 1;
            },
            borderStyle() { return {border: "3px solid " + SB_zones[player.ir.battleStage].primaryColor, borderRadius: "0", color: "white"}},
            baseStyle: {background: "#151230"},
            fillStyle: { background: "linear-gradient(15deg, #7f7f00 0%, #545400 100%)"},
            display() {
                return formatWhole(player.ir.shipHealth) + "/" + formatWhole(arena.shipStats.maxHp) + " HP";
            },
        },
        xpBar: {
            unlocked() { return !(arena && arena._fullscreen) },
            direction: RIGHT,
            width: "398.5px",
            height: "40px",
            progress() {
                return player.ir.battleXP.div(player.ir.battleXPReq);
            },
            borderStyle() { return {border: "3px solid " + SB_zones[player.ir.battleStage].primaryColor, borderLeft: "0", borderRadius: "0", color: "white"}},
            baseStyle: {background: "#151230",},
            fillStyle: { background: "linear-gradient(15deg, #0000bf 0%, #00007f 100%)"},
            display() {
                return formatWhole(player.ir.battleXP) + "/" + formatWhole(player.ir.battleXPReq) + " XP";
            },
        },
        bossHealthBar: {
            unlocked() { return (arena && arena._fullscreen) },
            direction: RIGHT,
            width() {return (arena && arena._fullscreen) ? "calc(100vw - 6px)" : "398.5px"},
            height: "60px",
            progress() {
                if (arena && arena._fullscreen && arena.enemies.length > 0) {
                    return arena.enemies[0].health / arena.enemies[0].maxHealth
                } else return 1;
            },
            borderStyle() { return {border: "3px solid " + SB_zones[player.ir.battleStage].primaryColor, borderRadius: "0", color: "white"}},
            baseStyle: {background: "#151230"},
            fillStyle: { background: "linear-gradient(15deg, #bf0000 0%, #800000 100%)"},
            display() {
                if (arena && arena._fullscreen && arena.enemies.length > 0) {
                    return "<h3>" + SB_celestialites[arena.enemies[0].type].name + "</h3><br>" + formatSimple(arena.enemies[0].health) + "/" + formatSimple(arena.enemies[0].maxHealth) + " HP";
                } else return "<h3>???</h3><br>???/??? HP";
                
            },
        },
    },
    levelables: {
        0: {
            image() { return "resources/secret.png"},
            title() { return "No ship selected." },
            lore() { return "" },
            description() { return "" },
            currency() { return getLevelableXP(this.layer, this.id) },
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() { return { width: '100px', height: '125px', backgroundColor: '#222222'} } 
        },
        1: {
            image() { return this.condition() ? "resources/ships/cruiser.png" : "resources/secret.png"},
            title() { return "Cruiser" },
            description() {
                return "x" + format(this.effect()[0]) + " to stars. <small>(Ignoring Softcap)</small><br>x" + format(this.effect()[1]) + " to singularity points.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "This ship should always be unlocked. Why are you seeing this???"
            },
            lore() {
                return "Fast, slim, and rapid-firing bullets. Pretty average ship ngl."
            },
            levelLimit() { return Decimal.add(50, levelableEffect("ir", 8)[1])},
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.6).add(1), //Stars
                    getLevelableAmount(this.layer, this.id).mul(5).pow(5).add(1), //Singularity Points
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            condition() { return true },
            // BUTTONS
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(2)).pow(getLevelableAmount(this.layer, this.id).mul(0.005).add(1)) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
        },
        2: {
            image() { return tmp[this.layer].levelables[this.id].condition ? "resources/ships/impact.png" : "resources/secret.png"},
            title() { return "Impact" },
            description() {
                return "^" + format(this.effect()[0], 3) + " to points.<br>x" + format(this.effect()[1]) + " to infinities.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "Unlocks with an Iridite upgrade."
            },
            lore() {
                return "Bigger, slower, but larger and more powerful bullets."
            },
            levelLimit() { return Decimal.add(50, levelableEffect("ir", 8)[1])},
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.3).mul(0.07).add(1), //points
                    getLevelableAmount(this.layer, this.id).mul(0.5).add(1), //infinities
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            condition() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || hasUpgrade("ir", 101) },
            // BUTTONS
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(2)).pow(getLevelableAmount(this.layer, this.id).mul(0.005).add(1)).mul(1.5) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
        },
        3: {
            image() { return tmp[this.layer].levelables[this.id].condition ? "resources/ships/unarmed.png" : "resources/secret.png"},
            title() { return "Unarmed" },
            description() {
                return "^" + format(this.effect()[0], 3) + " to antimatter dimensions.<br>x" + format(this.effect()[1]) + " to core scraps.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "Unlocks at Cruiser and Impact level 10."
            },
            lore() {
                return "Don't underestimate the goat."
            },
            levelLimit() { return Decimal.add(50, levelableEffect("ir", 8)[1])},
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.35).mul(0.06).add(1), //ad
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.25).add(1), //core scraps
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return hasUpgrade("ir", 101) },
            condition() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.ir.levelables[1][0].gte(10) && player.ir.levelables[2][0].gte(10)) },
            // BUTTONS
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(2.25)).pow(getLevelableAmount(this.layer, this.id).mul(0.005).add(1)).mul(2) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
        },
        4: {
            image() { return tmp[this.layer].levelables[this.id].condition ? "resources/ships/sniper.png" : "resources/secret.png"},
            title() { return "Sniper" },
            description() {
                return "x" + format(this.effect()[0]) + " to space energy.<br>^" + format(this.effect()[1], 3) + " to infinity points.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "Unlocks at 3 space building cap."
            },
            lore() {
                return "Shoots extremely fast piercing bullets with precision. Automatically aims at cosmic celestialites, might affect movement."
            },
            levelLimit() { return Decimal.add(50, levelableEffect("ir", 8)[1])},
            effect() {
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.3).add(1), //space energy
                    getLevelableAmount(this.layer, this.id).pow(0.3).mul(0.08).add(1), // infinity points
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return hasUpgrade("ir", 15) },
            condition() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || buyableEffect("sb", 12).gte(3) },
            // BUTTONS
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(2.25)).pow(getLevelableAmount(this.layer, this.id).mul(0.005).add(1)).mul(1.5) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
        },
        5: {
            image() { return this.condition() ? "resources/ships/ufo.png" : "resources/secret.png"},
            title() { return "Ufo" },
            description() {
                return "x" + format(this.effect()[0]) + " to xpboost.<br>x" + format(this.effect()[1]) + " to legendary gems.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "Unlocks with a legendary pet."
            },
            lore() {
                return "Has omnidirectional movement and shoots shotgun-like bursts towards the mouse."
            },
            levelLimit() { return Decimal.add(50, levelableEffect("ir", 8)[1])},
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.7).mul(0.1).add(1), //xpboost
                    getLevelableAmount(this.layer, this.id).pow(0.4).mul(0.1).add(1), //legendary gems
                    getLevelableAmount(this.layer, this.id).mul(0.06).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            condition() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.pet.levelables[502][0].gte(1))},
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(2.5)).pow(getLevelableAmount(this.layer, this.id).mul(0.0075).add(1)).mul(2) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
        },
        6: {
            image() { return tmp[this.layer].levelables[this.id].condition ? "resources/ships/streamliner.png" : "resources/secret.png"},
            title() { return "Streamliner" },
            description() {
                return "^" + format(this.effect()[0], 3) + " to mastery point effects.<br>^" + format(this.effect()[1], 3) + " to negative infinity points.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "Unlocks with a progression tree update (in stars)."
            },
            lore() {
                return "Shoots very fast streams of bullets, but with slow movement speed."
            },
            levelLimit() {return Decimal.add(50, levelableEffect("ir", 8)[1])},
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.5).add(1), //mastery point effects
                    getLevelableAmount(this.layer, this.id).pow(0.3).mul(0.07).add(1), //neginf
                    getLevelableAmount(this.layer, this.id).mul(0.06).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.ir.ufoDefeated },
            condition() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.st.buyables[206].gte(1)) },
            // BUTTONS
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(2.25)).pow(getLevelableAmount(this.layer, this.id).mul(0.005).add(1)).mul(4) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
        },
        7: {
            image() { return tmp[this.layer].levelables[this.id].condition ? "resources/ships/stinger.png" : "resources/secret.png"},
            title() { return "Stinger" },
            description() {
                return "^" + format(this.effect()[0], 3) + " to pollinators.<br>x" + format(this.effect()[1]) + " to radiation.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "Unlocks with a hive progression upgrade."
            },
            lore() {
                return "Lacks a gun, but makes up for it with spikes."
            },
            levelLimit() { return Decimal.add(50, levelableEffect("ir", 8)[1])},
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.3).mul(0.1).add(1), // pollinators
                    getLevelableAmount(this.layer, this.id).pow(1.5).add(1), // radiation
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.al.show },
            condition() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || hasUpgrade("fu", 110) },
            // BUTTONS
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
            onClick() {
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(2.25)).pow(getLevelableAmount(this.layer, this.id).mul(0.005).add(1)).mul(7) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
        },
        8: {
            image() { return this.condition() ? "resources/ships/astral.png" : "resources/secret.png"},
            title() { return "Astral" },
            description() {
                return "x" + format(this.effect()[0]) + " to space rocks.<br>+" + formatWhole(this.effect()[1]) + " to max ship level (excluding itself).<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "Unlocks by defeating Iridite without taking damage."
            },
            lore() {
                return "A simulated version of Iridite, the Astral Celestial. Moves omnidirectionally and fires Iridite's lasers."
            },
            levelLimit() { return new Decimal(50)},
            effect() {
                return [
                    getLevelableAmount(this.layer, this.id).div(2).pow(0.5).div(10).add(1), // space rocks
                    getLevelableAmount(this.layer, this.id).div(5).floor(), // space gems
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.ir.iriditeDefeated },
            condition() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || player.ir.astralShipUnlocked },
            // BUTTONS
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
            onClick() {
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(2.5)).pow(getLevelableAmount(this.layer, this.id).mul(0.0075).add(1)).mul(10) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
        },
        9: {
            image() { return tmp[this.layer].levelables[this.id].condition ? "resources/ships/evolver.png" : "resources/secret.png"},
            title() { return "Evolver" },
            description() {
                return "x" + format(this.effect()[0], 3) + " to ESC.<br>^" + format(this.effect()[1], 3) + " to paradox pylon energy.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"

            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "Unlocks with a shard research upgrade."
            },
            lore() { return "An experimental vessel that fractures its projectiles into multiple seeking fragments." },
            levelLimit() { return Decimal.add(25, levelableEffect("ir", 8)[1])},
            effect() {
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.75).mul(0.05).add(1),
                    getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.04).add(1),
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            condition() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || hasUpgrade("ev8", 25) },
            // BUTTONS
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(2.5)).pow(getLevelableAmount(this.layer, this.id).mul(0.005).add(1)).mul(10) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            }
        },
        10: {
            image() { return tmp[this.layer].levelables[this.id].condition ? "resources/ships/cruiser.png" : "resources/secret.png"},
            title() { return "Railgun" },
            description() {
                return "^" + format(this.effect()[0], 3) + " to dark celestial points.<br>x" + format(this.effect()[1]) + " to light.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            display() {
                return this.condition() ? "<h2>" + this.title() + "</h2><br><span style='color:#aaa2f2'>" + this.description() : "Unlocks with an Iridite upgrade."
            },
            lore() {
                return "A superphysical energy cannon powered by starlight."
            },
            levelLimit() { return Decimal.add(50, levelableEffect("ir", 8)[1])},
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.3).mul(0.01).add(1), // dark celestial points
                    getLevelableAmount(this.layer, this.id).pow(1.5).mul(0.25).add(1), // light
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), // damage
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), // health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return hasUpgrade("bum", 23) },
            condition() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || hasUpgrade("ir", 37) },
            // BUTTONS
            levelableButtons: [
                {
                    title() {return "Level Up"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return tmp.ir.levelables[this.id].canBuy},
                    complete() {return getLevelableAmount(this.layer, this.id).gte(this.levelLimit)},
                    onClick: function () {
                        buyLevelable(this.layer, this.id)
                    },
                },
                {
                    title() {return "View Stats"},
                    unlocked() {return tmp.ir.levelables[this.id].condition && !player.ir.selectingShip},
                    canClick() {return true},
                    complete() {return false},
                    onClick: function () {
                    },
                },
                {
                    title() {return player.ir.timers[this.id].current.lte(0) ? "Select" : ("On Cooldown: " + formatTime(player.ir.timers[this.id].current))},
                    unlocked() {return tmp.ir.levelables[this.id].condition && player.ir.selectingShip},
                    canClick() {return player.ir.timers[this.id].current.lte(0)},
                    complete() {return false},
                    onClick: function () {
                        player.ir.shipBattleSaveCurrent = {
                            shipType: this.id,
                            slot: -1,
                            upgrades: {},
                            upgradeMultis: {},
                            highestLevels: {
                                "spaceZone1": new Decimal(0),
                            },
                        }
                        player.ir.selectingShip = false
                    },
                },
            ],
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(10).mul(10).add(getLevelableAmount(this.layer, this.id).pow(3)).pow(getLevelableAmount(this.layer, this.id).mul(0.005).add(1)) },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: getLevelableAmount(this.layer, this.id).gte(this.levelLimit()) ? "#7f7f00" : "#0000bf"}},
            style() {
                let look = {width: "384px", minHeight: "150px", borderRadius: "15px", margin: "3px"}
                look.backgroundColor = this.condition() ? "#151230" : "#222222"
                look.borderColor = this.condition() ? "#5e4ee6" : "#444444"
                layers[this.layer].levelables.index == this.id ? look.outline = "3px solid white" : look.outline = "0px solid white"
                return look
            },
            levelableButtonStyle(i) {
                let button = layers[this.layer].levelables[this.id].levelableButtons[i]
                let look = {}
                look.background = i == 2 ? button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#545400" : "#402424" : button.complete.apply(tmp[this.layer].levelables[this.id], []) ? "#1a3b0f" : button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#37078f" : "#402424"
                look.borderColor = i == 2 && button.canClick.apply(tmp[this.layer].levelables[this.id], []) ? "#7f7f00" : "#5e4ee67f"
                return look
            },
        },
    },
    clickables: {
        "newRun": {
            title() { return player.ir.selectingShip ? "<h3>Cancel" : "<h3>Change Selection" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ir.selectingShip = !player.ir.selectingShip
            },
            style() {
                let look = {width: "523px", minHeight: "50px", color: "white", borderRadius: "10px"}
                look.background = player.ir.selectingShip ? "#7f0000" : "#545400"
                look.border = "3px solid " + (player.ir.selectingShip ? "#bf0000" : "#7f7f00")
                return look
            },
        },
        "loadShipSave_0": {
            title() { return !player.ir.selectingShip ? "Overwrite Slot" : "Select" },
            canClick() { return (player.ir.shipBattleSaves[0] != null && player.ir.shipBattleSaveCurrent.slot != 0) && !(player.ir.shipBattleSaves[0] == null && player.ir.selectingShip) && !(!player.ir.selectingShip && (player.ir.shipBattleSaveCurrent == null || (player.ir.shipBattleSaveCurrent != null && player.ir.shipBattleSaveCurrent.slot == -1))) },
            unlocked() { return true },
            onClick() {
                if (player.ir.selectingShip) {
                    player.ir.shipBattleSaveCurrent = player.ir.shipBattleSaves[0]
                    player.ir.selectingShip = false
                } else {
                    player.ir.shipBattleSaves[0] = structuredClone(player.ir.shipBattleSaveCurrent)
                    player.ir.shipBattleSaves[0].slot = 0
                }
            },
            style() {
                let look = {width: "232px", minHeight: "50px", color: "white", borderRadius: "0 0 12px 12px"}
                look.background = !tmp[this.layer].clickables[this.id].canClick ? "#361e1e" : !player.ir.selectingShip ? "#7f0000" : "#545400"
                look.border = "3px solid " + (!tmp[this.layer].clickables[this.id].canClick ? "#5e4ee67f" : !player.ir.selectingShip ? "#bf0000" : "#7f7f00")
                return look
            },
        },
        "loadShipSave_1": {
            title() { return !player.ir.selectingShip ? "Overwrite Slot" : "Select" },
            canClick() { return (player.ir.shipBattleSaves[1] != null && player.ir.shipBattleSaveCurrent.slot != 1) && !(player.ir.shipBattleSaves[1] == null && player.ir.selectingShip) && !(!player.ir.selectingShip && (player.ir.shipBattleSaveCurrent == null || (player.ir.shipBattleSaveCurrent != null && player.ir.shipBattleSaveCurrent.slot == -1))) },
            unlocked() { return true },
            onClick() {
                if (player.ir.selectingShip) {
                    player.ir.shipBattleSaveCurrent = player.ir.shipBattleSaves[1]
                    player.ir.selectingShip = false
                } else {
                    player.ir.shipBattleSaves[1] = structuredClone(player.ir.shipBattleSaveCurrent)
                    player.ir.shipBattleSaves[1].slot = 1
                }
            },
            style() {
                let look = {width: "232px", minHeight: "50px", color: "white", borderRadius: "0 0 12px 12px"}
                look.background = !tmp[this.layer].clickables[this.id].canClick ? "#361e1e" : !player.ir.selectingShip ? "#7f0000" : "#545400"
                look.border = "3px solid " + (!tmp[this.layer].clickables[this.id].canClick ? "#5e4ee67f" : !player.ir.selectingShip ? "#bf0000" : "#7f7f00")
                return look
            },
        },
        "loadShipSave_2": {
            title() { return !player.ir.selectingShip ? "Overwrite Slot" : "Select" },
            canClick() { return (player.ir.shipBattleSaves[2] != null && player.ir.shipBattleSaveCurrent.slot != 2) && !(player.ir.shipBattleSaves[2] == null && player.ir.selectingShip) && !(!player.ir.selectingShip && (player.ir.shipBattleSaveCurrent == null || (player.ir.shipBattleSaveCurrent != null && player.ir.shipBattleSaveCurrent.slot == -1))) },
            unlocked() { return true },
            onClick() {
                if (player.ir.selectingShip) {
                    player.ir.shipBattleSaveCurrent = player.ir.shipBattleSaves[2]
                    player.ir.selectingShip = false
                } else {
                    player.ir.shipBattleSaves[2] = structuredClone(player.ir.shipBattleSaveCurrent)
                    player.ir.shipBattleSaves[2].slot = 2
                }
            },
            style() {
                let look = {width: "232px", minHeight: "50px", color: "white", borderRadius: "0 0 12px 12px"}
                look.background = !tmp[this.layer].clickables[this.id].canClick ? "#361e1e" : !player.ir.selectingShip ? "#7f0000" : "#545400"
                look.border = "3px solid " + (!tmp[this.layer].clickables[this.id].canClick ? "#5e4ee67f" : !player.ir.selectingShip ? "#bf0000" : "#7f7f00")
                return look
            },
        },
        "loadShipSave_3": {
            title() { return !player.ir.selectingShip ? "Overwrite Slot" : "Select" },
            canClick() { return (player.ir.shipBattleSaves[3] != null && player.ir.shipBattleSaveCurrent.slot != 3) && !(player.ir.shipBattleSaves[3] == null && player.ir.selectingShip) && !(!player.ir.selectingShip && (player.ir.shipBattleSaveCurrent == null || (player.ir.shipBattleSaveCurrent != null && player.ir.shipBattleSaveCurrent.slot == -1))) },
            unlocked() { return true },
            onClick() {
                if (player.ir.selectingShip) {
                    player.ir.shipBattleSaveCurrent = player.ir.shipBattleSaves[3]
                    player.ir.selectingShip = false
                } else {
                    player.ir.shipBattleSaves[3] = structuredClone(player.ir.shipBattleSaveCurrent)
                    player.ir.shipBattleSaves[3].slot = 3
                }
            },
            style() {
                let look = {width: "232px", minHeight: "50px", color: "white", borderRadius: "0 0 12px 12px"}
                look.background = !tmp[this.layer].clickables[this.id].canClick ? "#361e1e" : !player.ir.selectingShip ? "#7f0000" : "#545400"
                look.border = "3px solid " + (!tmp[this.layer].clickables[this.id].canClick ? "#5e4ee67f" : !player.ir.selectingShip ? "#bf0000" : "#7f7f00")
                return look
            },
        },
        "loadShipSave_4": {
            title() { return !player.ir.selectingShip ? "Overwrite Slot" : "Select" },
            canClick() { return (player.ir.shipBattleSaves[4] != null && player.ir.shipBattleSaveCurrent.slot != 4) && !(player.ir.shipBattleSaves[4] == null && player.ir.selectingShip) && !(!player.ir.selectingShip && (player.ir.shipBattleSaveCurrent == null || (player.ir.shipBattleSaveCurrent != null && player.ir.shipBattleSaveCurrent.slot == -1))) },
            unlocked() { return true },
            onClick() {
                if (player.ir.selectingShip) {
                    player.ir.shipBattleSaveCurrent = player.ir.shipBattleSaves[4]
                    player.ir.selectingShip = false
                } else {
                    player.ir.shipBattleSaves[4] = structuredClone(player.ir.shipBattleSaveCurrent)
                    player.ir.shipBattleSaves[4].slot = 4
                }
            },
            style() {
                let look = {width: "232px", minHeight: "50px", color: "white", borderRadius: "0 0 12px 12px"}
                look.background = !tmp[this.layer].clickables[this.id].canClick ? "#361e1e" : !player.ir.selectingShip ? "#7f0000" : "#545400"
                look.border = "3px solid " + (!tmp[this.layer].clickables[this.id].canClick ? "#5e4ee67f" : !player.ir.selectingShip ? "#bf0000" : "#7f7f00")
                return look
            },
        },
        "loadShipSave_5": {
            title() { return !player.ir.selectingShip ? "Overwrite Slot" : "Select" },
            canClick() { return (player.ir.shipBattleSaves[5] != null && player.ir.shipBattleSaveCurrent.slot != 5) && !(player.ir.shipBattleSaves[5] == null && player.ir.selectingShip) && !(!player.ir.selectingShip && (player.ir.shipBattleSaveCurrent == null || (player.ir.shipBattleSaveCurrent != null && player.ir.shipBattleSaveCurrent.slot == -1))) },
            unlocked() { return true },
            onClick() {
                if (player.ir.selectingShip) {
                    player.ir.shipBattleSaveCurrent = player.ir.shipBattleSaves[5]
                    player.ir.selectingShip = false
                } else {
                    player.ir.shipBattleSaves[5] = structuredClone(player.ir.shipBattleSaveCurrent)
                    player.ir.shipBattleSaves[5].slot = 5
                }
            },
            style() {
                let look = {width: "232px", minHeight: "50px", color: "white", borderRadius: "0 0 12px 12px"}
                look.background = !tmp[this.layer].clickables[this.id].canClick ? "#361e1e" : !player.ir.selectingShip ? "#7f0000" : "#545400"
                look.border = "3px solid " + (!tmp[this.layer].clickables[this.id].canClick ? "#5e4ee67f" : !player.ir.selectingShip ? "#bf0000" : "#7f7f00")
                return look
            },
        },
        1: {
            title() { return "<h2>Unlock Iridite, the Astral Celestial" },
            canClick() { return player.au2.stars.gte(5e10) && player.stagnantSynestia.highestCombo.gte(25) },
            unlocked() { return true },
            onClick() {
                player.ir.iriditeUnlocked = true
                player.subtabs["ir"]['stuff'] = 'ships'
            },
            style: { width: '300px', "min-height": '100px', color: "white" },
        },
        2: {
            title() { return "Level Up" },
            canClick() { return tmp.ir.levelables[layers.ir.levelables.index].canBuy },
            unlocked() { return layers.ir.levelables.index != 0 },
            tooltip() {
                if (tmp.ir.levelables[layers.ir.levelables.index].levelTooltip == undefined) {
                    return ""
                } else {
                    return tmp.ir.levelables[layers.ir.levelables.index].levelTooltip
                }
            },
            onClick() {
                buyLevelable("ir", layers.ir.levelables.index)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "425px", minHeight: "40px", borderRadius: "0px", fontSize: '12px'}
                !this.canClick() ? look.backgroundColor = "#bf8f8f" : layers.ir.levelables.index >= 1000 ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#4e7cff"
                return look
            },
        },
        12: {
            title() { return player.ir.menu > 0 && player.ir.battleLevel.modulo(20).eq(1) && !player.ir.battleLevel.eq(1) ? "Leave Battle<br><small>(New progress has been saved!)" : "Leave Battle" },
            canClick() { return true },
            unlocked() { return true || player.subtabs["ir"]["stuff"] == "Refresh Page :("},
            onClick() {
                SB_exitRun()
            },
            style() {
                let look = {width: "258px", minHeight: "50px", color: "white", border: "3px solid " + "#bf0000", borderRadius: "10px"}
                if (player.ir.menu > 0 && player.ir.battleLevel.modulo(20).eq(1) && !player.ir.battleLevel.eq(1)) {
                    look.background = "#7f3f00"
                    look.borderColor = "#bf5f00"
                } else if (this.canClick()) {
                    look.background = "#7f0000"
                    look.borderColor = "#bf0000"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
        13: {
            title() { return "<h2>Battle<br><span style='font-size:16px'>+"
                + format(player.ir.send[player.ir.shipType].onClick(false))
                + " " + (player.ir.send[player.ir.shipType].statDisplay()) + "<br>" + formatTime(player.ir.send[player.ir.shipType].max) + " Cooldown</span>"
            },
            canClick() { return player.ir.sendCooldownTimer.lte(0) },
            unlocked() { return player.ev.evolutionsUnlocked[11] },
            tooltip() { return "Based on ship level." },
            onClick() {
                player.ir.send[player.ir.shipType].onClick(true)

                player.ir.sendCooldownTimer = player.ir.send[player.ir.shipType].max
            },
            style() {
                let look = {width: "300px", minHeight: "100px", color: "white", border: "3px solid #bF7Fff", borderRadius: "10px 0px 0px 10px", margin: "-3px"}
                if (this.canClick()) {
                    look.backgroundColor = "#000"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
        14: {
            title() { return "<h2>Repair<br><span style='font-size:16px'>+"
                + format(player.ir.send[player.ir.shipType].max.div(10).mul(new Decimal(1).add(new Decimal(0.15).mul(getLevelableAmount('pet', 1209).sub(1)))))
                + " XP<br>" + formatTime(player.ir.send[player.ir.shipType].max) + " Cooldown</span>"
            },
            canClick() { return player.ir.sendCooldownTimer.lte(0) },
            unlocked() { return player.ev.evolutionsUnlocked[11] },
            tooltip() { return "Based on Captain evo pet level." },
            onClick() {
                setLevelableXP("ir", player.ir.shipType, getLevelableXP("ir", player.ir.shipType).add(player.ir.send[player.ir.shipType].max.div(10).mul(new Decimal(1).add(new Decimal(0.15).mul(getLevelableAmount('pet', 1209).sub(1))))))

                player.ir.sendCooldownTimer = player.ir.send[player.ir.shipType].max
            },
            style() {
                let look = {width: "300px", minHeight: "100px", color: "white", border: "3px solid #bF7Fff", borderRadius: "0px 10px 10px 0px"}
                if (this.canClick()) {
                    look.backgroundColor = "#000"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
        15: {
            title() { return player.ir.autoShoot ? "Auto-Shoot<br>[ENABLED]" : "Auto-Shoot<br>[DISABLED]" },
            canClick() { return true },
            unlocked() { return true},
            onClick() {
                if (player.ir.autoShoot) {
                    player.ir.autoShoot = false
                    if (arena && player.ir.shipType == 8) {
                        arena.ship._laserActive = false
                        arena.ship._laserTimer = -60
                    }
                } else {
                    player.ir.autoShoot = true
                }
            },
            style() {
                let look = {width: "258px", minHeight: "50px", color: "white", border: "3px solid #008000", borderRadius: "10px"}
                if (this.canClick()) {
                    look.backgroundColor = "#005400"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
        16: {
            title() { return player.ir.menu == 2 ? "Return to Battle" : "View Stats" },
            canClick() { return true },
            unlocked() { return true},
            onClick() {
                if (player.ir.menu == 2) {
                    if (arena.upgradeChoices.length == 0) player.ir.menu = 0;
                    else player.ir.menu = 1;
                } else {
                    player.ir.menu = 2
                }
            },
            style() {
                let look = {width: "258px", minHeight: "50px", color: "white", border: "3px solid #0000bf", borderRadius: "10px"}
                if (this.canClick()) {
                    look.background = "#00007f"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
        "toggleMobileControls": {
            title() { switch (player.ir.mobileControls) {
                case 0: {return "Mobile Controls<br>[OFF]"; break;}
                case 1: {return "Mobile Controls<br>[Simplified]"; break;}
                case 2: {return "Mobile Controls<br>[Extended]"; break;}
                default: {return ""; break;}
            }},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ir.mobileControls++
                if (player.ir.mobileControls > 2) player.ir.mobileControls = 0;
            },
            style() {
                let look = {width: "259px", minHeight: "50px", color: "white", border: "3px solid #008000", borderRadius: "10px"}
                if (this.canClick()) {
                    look.background = "#005400"
                } else {
                    look.backgroundColor = "#361e1e"
                }
                return look
            },
        },
    },
    upgrades: {
        11: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Rejuvenation",
            unlocked() { return true },
            description() {return "Boosts singularity point gain based on space rocks. (x" + format(this.effect()) + ")"},
            cost: new Decimal(300),
            currencyLocation() { return player.ir },
            effect() {
                return player.ir.spaceRock.pow(0.75).mul(1000).add(1)
            },
            currencyDisplayName: "space rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        12: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Replenish",
            unlocked() { return true },
            description() { return "Boosts oil gain based on space rocks. (x" + format(this.effect()) + ")"},
            cost: new Decimal(500),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.ir.spaceRock.pow(2.5).mul(5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        13: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Servitude",
            unlocked() { return true },
            description() { return "Boosts check back XP gain based on space gems. (x" + format(this.effect()) + ")"},
            cost: new Decimal(800),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.ir.spaceGem.pow(0.25).mul(2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        14: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Healing",
            unlocked() { return true },
            description() { return "All ships start off with 0.5 hp/sec of health regeneration."},
            cost: new Decimal(650),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        15: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Civilization",
            unlocked() { return true },
            description() { return "Unlocks a normality upgrade in the dark universe."},
            cost: new Decimal(2000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        16: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ff0000;text-shadow:0 0 8px #ff0000'>" + "Level 1-20 Cleared" + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Expansion",
            unlocked() { return true },
            description() { return "Unlocks Space Zone II and a legendary pet."},
            canAfford() {return player.spaceZone1.highestLevel.gte(20)},
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #ff0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        17: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Reinforcement II",
            unlocked() { return hasUpgrade("ir", 16) },
            description() { return "All ships have 30% increased max hp."},
            cost: new Decimal(5000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        18: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Timekeeper",
            unlocked() { return hasUpgrade("ir", 16) },
            description() { return "Cut ship cooldown times based on space gems. (/" + format(this.effect()) + ")"},
            effect() {
                return player.ir.spaceGem.add(1).log(10).add(1).pow(1.5).sub(1).div(8).add(1)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            cost: new Decimal(8000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        19: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ff0000;text-shadow:0 0 8px #ff0000'>" + "Level 2-20 Cleared" + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Iridite",
            unlocked() { return hasUpgrade("ir", 16) },
            description() { return "Unlocks Iridite Zone and Geroa's fighting upgrades."},
            canAfford() {return player.spaceZone2.highestLevel.gte(20)},
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "white", outline: "3px solid #ff0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor = "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        20: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Repair",
            unlocked() { return true },
            description() { return "Boosts steel gain based on space rocks. (x" + format(this.effect()) + ")"},
            cost: new Decimal(400),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                let eff = player.ir.spaceRock.add(1).log10().add(1).pow(0.75).sub(1).pow_base("1e100")
                if (hasMilestone("spaceZone3", 11)) eff = eff.pow(2);
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        21: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Growth",
            unlocked() { return true },
            description() { return "Boosts space rock gain based on total Iridite upgrades purchased. (x" + format(this.effect()) + ")"},
            cost: new Decimal(1e3),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return new Decimal(player.ir.upgrades.length).div(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        22: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Solar Power",
            unlocked() { return hasUpgrade("ir", 16) },
            description() { return "Slightly boosts ship damage based on stars. (x" + format(this.effect(), 3) + ")"},
            cost: new Decimal(3.5e3),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                let eff = player.au2.stars.add(1).log(10).add(1).pow(0.5).sub(1).div(20).add(1)
                if (hasMilestone("spaceZone3", 14)) eff = eff.pow(1.5);
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        23: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Momentum",
            unlocked() { return hasUpgrade("ir", 16) },
            description() { return "Space battle celestialite stats scale 2% slower."},
            cost: new Decimal(6666),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return new Decimal(player.ir.upgrades.length).div(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        24: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Armoured",
            unlocked() { return hasUpgrade("ir", 16) },
            description() { return "All ships take 25% less damage from collisions."},
            cost: new Decimal(1e4),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return new Decimal(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        25: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ff0000;text-shadow:0 0 8px #ff0000'>100,000 Stored Space Energy</span>" // BOTTOM
                "</div></div>"
            },
            title: "Boundless",
            unlocked() { return player.ir.iriditeDefeated },
            description() { return "Unlocks Space Zone III."},
            canAfford() {return player.sb.storedSpaceEnergy.gte(1e5)},
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #ff0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        26: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Evolve",
            unlocked() { return hasUpgrade("ir", 25) },
            description() { return "Boosts core fragment scores based on replicanti points. (x" + format(this.effect(), 3) + ")"},
            cost: new Decimal(1e5),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.cp.replicantiPoints.log10().pow(0.25).div(25).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        27: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Flourish",
            unlocked() { return hasUpgrade("ir", 25) },
            description() { return "Boosts bees based on space gems. (x" + format(this.effect(), 3) + ")"},
            cost: new Decimal(4e5),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                let eff = player.ir.spaceGem.add(1).log(10).add(1).pow(0.75).sub(1).pow_base(10).sub(1).div(50).add(1)
                if (hasMilestone("spaceZone3", 13)) eff = eff.pow(4);
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        28: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Sustain",
            unlocked() { return hasUpgrade("ir", 25) },
            description() { return "x1.05 check back tickspeed."},
            cost: new Decimal(1.5e6),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.ir.spaceGem.add(1).log(10).add(1).pow(0.75).sub(1).pow_base(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        29: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Damage Dilation",
            unlocked() { return hasUpgrade("ir", 25) },
            description() { return "Slightly boosts ship health based on stored space energy. (x" + format(this.effect(), 3) + ")"},
            cost: new Decimal(2e5),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.sb.storedSpaceEnergy.add(1).log(10).add(1).pow(0.5).sub(1).div(15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        30: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Develop",
            unlocked() { return hasUpgrade("ir", 25) },
            description() { return "Square base steel gain."},
            cost: new Decimal(1e6),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.au2.stars.add(1).log(10).add(1).pow(0.5).sub(1).div(25).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        31: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Decay",
            unlocked() { return hasUpgrade("ir", 25) },
            description() { return "Boosts all star dimension power gain by x3."},
            cost: new Decimal(1e7),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.au2.stars.add(1).log(10).add(1).pow(0.5).sub(1).div(25).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        32: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ff0000;text-shadow:0 0 8px #ff0000'>100,000 Project Speed</span>" // BOTTOM
                "</div></div>"
            },
            title: "Warped",
            unlocked() { return hasUpgrade("bum", 23) },
            description() { return "Unlocks Space Zone IV."},
            canAfford() {return player.prj.projectSpeed.gte(1e5)},
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #ff0000", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        33: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Perseverance",
            unlocked() { return hasUpgrade("ir", 32) },
            description() { return "Boosts space rock gain based on stored time capsules. (x" + format(this.effect(), 3) + ")"},
            cost: new Decimal(4e8),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.prj.storedTimeCapsules.add(1).log(10).add(1).pow(0.25).sub(1).pow_base(10).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        34: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Destruction II",
            unlocked() { return hasUpgrade("ir", 32) },
            description() { return "All ships deal 20% more damage."},
            cost: new Decimal(2e9),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return new Decimal(1.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        35: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Loyalty",
            unlocked() { return hasUpgrade("ir", 32) },
            description() { return "Unlock a second space building slot adder."},
            cost: new Decimal(1.4e10),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.sb.storedSpaceEnergy.add(1).log(10).add(1).pow(0.5).sub(1).div(15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        36: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Familiarity",
            unlocked() { return hasUpgrade("ir", 32) },
            description() { return "Boosts light gain based on starmetal alloy. (x" + format(this.effect(), 3) + ")"},
            cost: new Decimal(1e9),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.sma.starmetalAlloy.div(1e15).add(1).log(10).add(1).pow(0.75).sub(1).pow_base(10).sub(1).pow(0.5).div(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        37: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Railgun",
            unlocked() { return hasUpgrade("ir", 32) },
            description() { return "Unlock a new ship: Railgun."},
            cost: new Decimal(4e9),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.sb.storedSpaceEnergy.add(1).log(10).add(1).pow(0.5).sub(1).div(15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        38: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Unity",
            unlocked() { return hasUpgrade("ir", 32) },
            description() { return "Project effects are 5% stronger."},
            cost: new Decimal(4e10),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.sb.storedSpaceEnergy.add(1).log(10).add(1).pow(0.5).sub(1).div(15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },

        //gems
        101: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Impact",
            unlocked() { return true },
            description() { return "Unlocks the second ship: Impact."},
            cost: new Decimal(4),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        102: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Reinforcement",
            unlocked() { return true },
            description() { return "All ships have 25% increased max hp."},
            cost: new Decimal(8),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        103: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Alleviator",
            unlocked() { return true },
            description() { return "Battle XP requirements are cut by /1.5."},
            cost: new Decimal(12),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#5e4ee6", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        104: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Treasure",
            unlocked() { return hasUpgrade("ir", 16) },
            description() { return "Double the probability of getting space gems from asteroids."},
            cost: new Decimal(15),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        105: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Exploration",
            unlocked() { return hasUpgrade("ir", 16) },
            description() { return "Unlock more star exploration nodes."},
            cost: new Decimal(30),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        106: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Alleviator II",
            unlocked() { return hasUpgrade("ir", 16) },
            description() { return "Battle XP requirements are cut by /1.5 again."},
            cost: new Decimal(45),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#904ee6", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        107: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Storage",
            unlocked() { return hasUpgrade("ir", 25) },
            description() { return "Unlock another ship save slot."},
            cost: new Decimal(50),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        108: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Destruction",
            unlocked() { return hasUpgrade("ir", 25) },
            description() { return "All ships deal 15% more damage."},
            cost: new Decimal(200),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        109: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Fragmented Links",
            unlocked() { return hasUpgrade("ir", 25) },
            description() { return "Uncap the ancient, paradox, and technological core fragment effects."},
            cost: new Decimal(1e3),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#e64ebd", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        110: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Dedication",
            unlocked() { return hasUpgrade("ir", 32) },
            description() { return "Boosts project speed by x1.2."},
            cost: new Decimal(1e3),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        111: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Momentum II",
            unlocked() { return hasUpgrade("ir", 32) },
            description() { return "Space battle celestialite stats scale another 2% slower."},
            cost: new Decimal(3e3),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        112: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Empire",
            unlocked() { return hasUpgrade("ir", 32) },
            description() { return "Automate the first six space buildings."},
            cost: new Decimal(1e4),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#bf41bf", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },

        // Geroa BH Upgrades
        201: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Medkit",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) && hasUpgrade("ir", 19) },
            description() { return "Unlock Geroa's \"Self Repair\" skill"},
            cost: new Decimal(25),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#536bdb", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        202: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Spicy Energy",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) && hasUpgrade("ir", 19) },
            description() { return "Unlock Geroa's \"Cosmic Ray\" skill"},
            cost: new Decimal(5000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#536bdb", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        203: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "I'M A FIRIN' MY LASAR",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) && hasUpgrade("ir", 19) },
            description() { return "Unlock Geroa's \"Orbital Cannon\" skill"},
            cost: new Decimal(100),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#536bdb", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        204: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Probably should use these",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) && hasUpgrade("ir", 19) },
            description() { return "Unlock Geroa's \"Defense Satellites\" skill"},
            cost: new Decimal(1e5),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#536bdb", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        205: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Version 2.0",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) && hasUpgrade("ir", 19) },
            description() { return "Increase Geroa's base stats by 20%"},
            cost: new Decimal(250),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#536bdb", outline: "3px solid #66e8ff", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        206: {
            fullDisplay() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            title: "Version 3.0",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) && hasUpgrade("depth4", 4) },
            description() { return "Increase Geroa's base damage by 50%"},
            cost: new Decimal(2e6),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#536bdb", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
        207: {
            title: "Advanced Medkit",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) && false },
            description: "\"Self Repair\" now requires being under 50% health, and heals 20% more",
            cost: new Decimal(500),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#536bdb", outline: "3px solid #ffe066", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                return look
            },
        },
    },
    microtabs: {
        shipSelectionStats: {
            "finalStats": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["always-scroll-column", [
                        ["top-column", () => {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            return container
                        }, {background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: "532px", minHeight: "382px", padding: "6px", paddingBottom: "0"}],
                    ], {width: "532px", height: "388px"}],
                ],
            },
            "baseStats": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["always-scroll-column", [
                        ["top-column", () => {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            return container
                        }, {background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: "532px", minHeight: "382px", padding: "6px", paddingBottom: "0"}],
                    ], {width: "532px", height: "388px"}],
                ],
            },
            "upgradeEffects": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["always-scroll-column", [
                        ["top-column", () => {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            for (let [i, v] of Object.entries(player.ir.shipBattleSaveCurrent.upgradeMultis)) {
                                let prefix = "x"
                                if (i == "healthRegen") {
                                    v *= 60
                                    prefix = "+"
                                }
                                let statFormat = SHIP_STAT_FORMATTING[i]
                                container.push(["style-column", [
                                    ["style-row", [
                                        ["left-row", [
                                            ["raw-html", statFormat.name, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {background: "#00007f", borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["right-row", [
                                            ["raw-html", prefix + formatSimple(v, 2) + SHIP_STAT_FORMATTING[i].valueSuffix, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {background: "#00007f", borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                    ], {background: "#00007f", borderRadius: "12px", width: "502px", height: "35.75px"}],
                                ], {background: "#151230", border: "3px solid #5e4ee6", borderRadius: "15px", width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                            container.push(["style-column", [
                                ["raw-html", "Each upgrade stacks additively with others of its exact type, but multiplicatively with all others.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                            ], {width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            return container
                        }, {background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: "532px", minHeight: "382px", padding: "6px", paddingBottom: "0"}],
                    ], {width: "532px", height: "388px"}],
                ],
            },
            "upgradeCounts": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["always-scroll-column", [
                        ["top-column", () => {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            let entries = Object.entries(player.ir.shipBattleSaveCurrent.upgrades)
                            let entriesIndex = 0
                            for (let [i, v] of entries) {
                                entriesIndex++
                                if (v <= 0) continue;
                                let upgrade = UPGRADE_POOL[i]
                                container.push(["style-column", [
                                    ["tooltip-row", [
                                        ["left-row", [
                                            ["raw-html", upgrade.name(), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["right-row", [
                                            ["raw-html", formatWhole(v, 2), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                        ["raw-html", "<div class='bottomTooltip'>" + upgrade.description() + "</div>"],
                                    ], {borderRadius: "12px", width: "502px", height: "35.75px"}],
                                ], {background: "#00007f border-box", border: "3px solid " + UPGRADE_RARITIES[upgrade.rarity].color + "bf", borderRadius: "15px", width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                            container.push(["style-column", [
                                ["raw-html", "Each upgrade stacks additively with others of its exact type, but multiplicatively with all others.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                            ], {width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            return container
                        }, {background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: "532px", minHeight: "382px", padding: "6px", paddingBottom: "0"}],
                    ], {width: "532px", height: "388px"}],
                ],
            },
        },
        ships: {
            "levelables": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["blank", "5.5px"],
                            ["raw-html", () => {return "Ship Selected: <span style='color:#ffff00'>" + (player.ir.shipBattleSaveCurrent == null ? "<span style='color:#aaa2f2'>None" : (layers.ir.levelables[player.ir.shipBattleSaveCurrent.shipType].title() + " " + (player.ir.shipBattleSaveCurrent.slot === -2 ? "(Latest Run)" : player.ir.shipBattleSaveCurrent.slot === -1 ? "<span style='color:#aaa2f2'>(New Run)" : ("<span style='color:#aaa2f2'>(Slot #" + (player.ir.shipBattleSaveCurrent.slot + 1) + ")"))))}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "8.5px"],
                            ["clickable", "newRun"],
                        ], {width: "535px"}],
                        ["style-column", [
                            ["blank", "33px"],
                            ["clickable", "toggleMobileControls"],
                        ], {width: "259px", marginRight: "6px"}],
                    ], {width: "800px", minHeight: "95px", background: "#00007f"}],
                    ["style-row", [], {width: "800px", height: "3px", background: "#5e4ee6"}],
                    ["always-scroll-column", [
                        ["top-column", [
                            ["row", [
                                ["dark-extended-levelable", 1], ["dark-extended-levelable", 2],
                                ["dark-extended-levelable", 3], ["dark-extended-levelable", 4],
                                ["dark-extended-levelable", 5], ["dark-extended-levelable", 6],
                                ["dark-extended-levelable", 7], ["dark-extended-levelable", 8],
                                ["dark-extended-levelable", 9], ["dark-extended-levelable", 10],
                            ]],
                        ], {width: "780px", minHeight: "573px", background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", padding: "3px", marginRight: "20px"}],
                    ], {width: "800px", height: "579px"}],
                ]
            },
            "saves": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["blank", "5.5px"],
                            ["raw-html", () => {return "Ship Selected: <span style='color:#ffff00'>" + (player.ir.shipBattleSaveCurrent == null ? "<span style='color:#aaa2f2'>None" : (layers.ir.levelables[player.ir.shipBattleSaveCurrent.shipType].title() + " " + (player.ir.shipBattleSaveCurrent.slot === -2 ? "(Latest Run)" : player.ir.shipBattleSaveCurrent.slot === -1 ? "<span style='color:#aaa2f2'>(New Run)" : ("<span style='color:#aaa2f2'>(Slot #" + (player.ir.shipBattleSaveCurrent.slot + 1) + ")"))))}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "8.5px"],
                            ["clickable", "newRun"],
                        ], {width: "535px"}],
                        ["style-column", [
                            ["blank", "33px"],
                            ["clickable", "toggleMobileControls"],
                        ], {width: "259px", marginRight: "6px"}],
                    ], {width: "800px", minHeight: "95px", background: "#00007f"}],
                    ["style-row", [], {width: "800px", height: "3px", background: "#5e4ee6"}],
                    ["style-row", [
                        ["top-column", [
                            ["style-column", [], {width: "532px", height: "135px"}],
                            ["style-row", [], {background: "#5e4ee6", width: "532px", height: "3px"}],
                            ["style-row", [
                                ["category-button", ["Final Stats", "shipSelectionStats", "finalStats"], {width: "130px", height: "50px", background: "#00007f", borderRadius: "0"}],
                                ["style-row", [], {width: "3px", height: "50px", backgroundColor: "#5e4ee6"}],
                                ["category-button", ["Base Stats", "shipSelectionStats", "baseStats"], {width: "131px", height: "50px", background: "#00007f", borderRadius: "0"}],
                                ["style-row", [], {width: "3px", height: "50px", backgroundColor: "#5e4ee6"}],
                                ["category-button", ["Upgrade Effects", "shipSelectionStats", "upgradeEffects"], {width: "131px", height: "50px", background: "#00007f", borderRadius: "0"}],
                                ["style-row", [], {width: "3px", height: "50px", backgroundColor: "#5e4ee6"}],
                                ["category-button", ["Upgrade Counts", "shipSelectionStats", "upgradeCounts"], {width: "131px", height: "50px", background: "#00007f", borderRadius: "0"}],
                            ], {width: "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                            ["style-row", [], {background: "#5e4ee6", width: "532px", height: "3px"}],
                            ["buttonless-microtabs", "shipSelectionStats", {borderWidth: "0"}],
                        ], {borderRight: "3px solid #5e4ee6", height: "579px"}],
                        ["always-scroll-column", [
                            ["top-column", () => {
                                let container = []
                                let maxSaves = 3
                                if (hasUpgrade('ir', 107)) maxSaves++;
                                if (player.bl.noxDefeated) maxSaves++;
                                for (let i = 0; i < maxSaves; i++) {
                                    let save = player.ir.shipBattleSaves[i]
                                    container.push(["style-column", [
                                        ["style-column", [
                                            ["raw-html", "Slot #" + (i + 1), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "25px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["style-column", [
                                            ["raw-html", (save == null ? "<span style='color:#aaa2f2'>Empty" : (
                                                layers.ir.levelables[save.shipType].title()
                                                + "<br><span style='color:#aaa2f2;font-size:12px'>x" + formatSimple(save.upgradeMultis.attackDamage, 2) + " Attack"
                                                + " - x" + formatSimple(save.upgradeMultis.damageReduction, 2) + " Defense"
                                                + "<br>+" + formatSimple(save.upgradeMultis.healthRegen*60, 2) + " HP/s Regen"
                                                + " - x" + formatSimple(save.upgradeMultis.xpGain, 2) + " XP"
                                                + "<br>x" + formatSimple(save.upgradeMultis.spaceRockGain, 2) + " Rocks"
                                                + " - x" + formatSimple(save.upgradeMultis.spaceGemGain, 2) + " Gems"
                                            )), { "color": "yellow", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "98px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["clickable", "loadShipSave_" + i],
                                    ], {background: "#151230", border: "3px solid #5e4ee6", borderRadius: "15px", marginBottom: "6px", width: "232px", height: "179px"}])
                                }
                                return container
                            }, {width: "238px", minHeight: "567px", background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", padding: "6px", paddingBottom: "0", marginRight: "0px"}],
                        ], {width: "265px", height: "579px"}],
                    ], {width: "800px", height: "579px"}],
                ]
            },
            "automation": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["always-scroll-column", [
                            ["top-column", [
                            ], {width: "780px", minHeight: "671px", background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", padding: "3px", marginRight: "21px"}],
                        ], {width: "800px", height: "677px"}],
                    ], {width: "800px", height: "677px"}],
                ]
            },
        },
        stages: {
            "spaceZone1": {
                unlocked: true,
                embedLayer: 'spaceZone1',
            },
            "spaceZone2": {
                unlocked: true,
                embedLayer: 'spaceZone2',
            },
            "iriditeZone": {
                unlocked: true,
                embedLayer: 'iriditeZone',
            },
            "spaceZone3": {
                unlocked: true,
                embedLayer: 'spaceZone3',
            },
            "evolutionField": {
                unlocked: true,
                embedLayer: 'evolutionField',
            },
            "spaceZone4": {
                unlocked: true,
                embedLayer: 'spaceZone4',
            },
        },
        stuff: {
            "Main": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return formatWhole(player.au2.stars) + "/5e10 stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return formatWhole(player.stagnantSynestia.highestCombo) + "/25 best stagnant synestia combo." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Not a lot of requirements... I'm trying to be nice." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["clickable", 1],
                ]
            },
            "ships": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["category-button", ["Ships", "stuff", "ships"], {width: "265px", height: "40px", background: "#37078f", borderRadius: "13px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#5e4ee6"}],
                        ["category-button", ["Stages", "stuff", "stages"], {width: "264px", height: "40px", background: "#37078f", borderRadius: "0 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#5e4ee6"}],
                        ["category-button", ["Upgrades", "stuff", "upgrades"], {width: "265px", height: "40px", background: "#37078f", borderRadius: "0 13px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid #5e4ee6", borderRadius: "16px 16px 0 0", marginBottom: "-3px"}],
                    ["top-column", [
                        ["style-row", [
                            ["category-button", ["Levelables", "ships", "levelables"], {width: "265px", height: "40px", background: "#00007f", borderRadius: "10"}],
                            ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#5e4ee6"}],

                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "264px", height: "40px", background: "#00003f", borderRadius: "0"}],
                            ], () => {return {display: hasMilestone("spaceZone1", 11) ? "none !important" : ""}}],
                            ["style-row", [
                                ["category-button", ["Saves", "ships", "saves"], {width: "264px", height: "40px", background: "#00007f", borderRadius: "0"}],
                            ], () => {return {display: hasMilestone("spaceZone1", 11) ? "" : "none !important"}}],

                            ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#5e4ee6"}],

                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "265px", height: "40px", background: "#00003f", borderRadius: "0"}],
                            ], () => {return {display: false ? "none !important" : ""}}],
                            ["style-row", [
                                ["category-button", ["Automation", "ships", "automation"], {width: "265px", height: "40px", background: "#00007f", borderRadius: "0"}],
                            ], () => {return {display: false ? "" : "none !important"}}],

                        ], {width: "800px", height: "40px", borderBottom: "3px solid #5e4ee6", borderRadius: "0"}],
                        ["style-column", [
                            ["buttonless-microtabs", "ships", {borderWidth: "0"}],
                        ], {width: "800px", height: "677px", borderRadius: "0"}],
                    ], {width: "800px", height: "720px", background: "radial-gradient(circle, #151230 0%, #37078f 200%)", border: "3px solid #5e4ee6", borderRadius: "0"}],
                    ["blank", "25px"],
                ],
            },
            "stages": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["category-button", ["Ships", "stuff", "ships"], {width: "265px", height: "40px", background: "#37078f", borderRadius: "13px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#5e4ee6"}],
                        ["category-button", ["Stages", "stuff", "stages"], {width: "264px", height: "40px", background: "#37078f", borderRadius: "0 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#5e4ee6"}],
                        ["category-button", ["Upgrades", "stuff", "upgrades"], {width: "265px", height: "40px", background: "#37078f", borderRadius: "0 13px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid #5e4ee6", borderRadius: "16px 16px 0 0", marginBottom: "-3px"}],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["buttonless-microtabs", "stages", {borderWidth: "0"}],
                            ], {width: "800px", height: "720px", borderRadius: "0"}],
                        ], {width: "397px", height: "720px", borderRadius: "0"}],
                        ["style-column", [
                            ["centered-draggable-scroll-row", [
                                ["style-row", [

                                    // Connections
                                    ["style-column", [
                                        createConnectionComponent(0, 0, 100, 0, "#5e4ee6"),
                                    ], () => {
                                        return {display: hasUpgrade("ir", 16) ? "" : "none !important", width: "0", height: "0"}
                                    }],
                                    ["style-column", [
                                        createConnectionComponent(100, 0, 200, 0, "#5e4ee6"),
                                    ], () => {
                                        return {display: hasUpgrade("ir", 19) ? "" : "none !important", width: "0", height: "0"}
                                    }],
                                    ["style-column", [
                                        createConnectionComponent(100, 0, 100, -100, "#5e4ee6"),
                                    ], () => {
                                        return {display: hasUpgrade("ir", 25) ? "" : "none !important", width: "0", height: "0"}
                                    }],
                                    ["style-column", [
                                        //createConnectionComponent(100, -100, 0, -100, "#5e4ee6"),
                                    ], () => {
                                        return {display: false ? "" : "none !important", width: "0", height: "0"}
                                    }],
                                    ["style-column", [
                                        createConnectionComponent(100, 0, 100, 100, "#5e4ee6"),
                                    ], () => {
                                        return {display: hasUpgrade("ir", 32) ? "" : "none !important", width: "0", height: "0"}
                                    }],
//
                                    // Zone I
                                    ["tooltip-row", [
                                        ["category-button", ["I", "stages", "spaceZone1"], () => {
                                            let str = {
                                                width: "75px",
                                                height: "75px",
                                                background: "radial-gradient(#37078f, black)",
                                                border: "4px solid #5e4ee6",
                                                borderRadius: "50%",
                                                color: "white",
                                                fontSize: "32px",
                                                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                                            }
                                            if (player.subtabs["ir"]["stages"] == "spaceZone1") str.outline = "3px solid #fff"
                                            return str
                                        }],
                                        ["raw-html", () => {return "<div class='bottomTooltip'>Zone I</div>"}],
                                    ], {width: "0", height: "0", position: "relative", left: "0", top: "0px"}],

                                    // Zone II
                                    ["tooltip-row", [
                                        ["category-button", ["II", "stages", "spaceZone2"], () => {
                                            let str = {
                                                width: "75px",
                                                height: "75px",
                                                background: "radial-gradient(#64078f, black)",
                                                border: "4px solid #904ee6",
                                                borderRadius: "50%",
                                                color: "white",
                                                fontSize: "32px",
                                                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                                                display: hasUpgrade("ir", 16) ? "" : "none !important",
                                            }
                                            if (player.subtabs["ir"]["stages"] == "spaceZone2") str.outline = "3px solid #fff"
                                            return str
                                        },], 
                                        ["raw-html", () => {return "<div class='bottomTooltip'>Zone II</div>"}],
                                    ], {width: "0", height: "0", position: "relative", left: "100px", top: "0px"}],

                                    // Iridite Zone
                                    ["tooltip-row", [
                                        ["category-button", ["✦", "stages", "iriditeZone"], () => {
                                            let str = {
                                                width: "75px",
                                                height: "75px",
                                                background: "radial-gradient(#151230)",
                                                border: "4px solid white",
                                                borderRadius: "50%",
                                                color: "white",
                                                fontSize: "32px",
                                                textShadow: "0px 0px 5px #151230",
                                                display: hasUpgrade("ir", 19) ? "" : "none !important",
                                            }
                                            if (player.subtabs["ir"]["stages"] == "iriditeZone") str.outline = "3px solid #fff"
                                            return str
                                        }], 
                                        ["raw-html", () => {return "<div class='bottomTooltip'>Iridite Zone</div>"}],
                                    ], {width: "0", height: "0", position: "relative", left: "200px", top: "0px"}],

                                    // Zone III
                                    ["tooltip-row", [
                                        ["category-button", ["III", "stages", "spaceZone3"], () => {
                                            let str = {
                                                width: "75px",
                                                height: "75px",
                                                background: "radial-gradient(#8f0749, black)",
                                                border: "4px solid #e64ebd",
                                                borderRadius: "50%",
                                                color: "white",
                                                fontSize: "32px",
                                                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                                                display: hasUpgrade("ir", 25) ? "" : "none !important",
                                            }
                                            if (player.subtabs["ir"]["stages"] == "spaceZone3") str.outline = "3px solid #fff"
                                            return str
                                        }], 
                                        ["raw-html", () => {return "<div class='bottomTooltip'>Zone III</div>"}],
                                    ], {width: "0", height: "0", position: "relative", left: "100px", top: "-100px"}],

                                    // Zone IV
                                    ["tooltip-row", [
                                        ["category-button", ["IV", "stages", "spaceZone4"], () => {
                                            let str = {
                                                width: "75px",
                                                height: "75px",
                                                background: "radial-gradient(#802080, black)",
                                                border: "4px solid #bf41bf",
                                                borderRadius: "50%",
                                                color: "white",
                                                fontSize: "32px",
                                                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                                                display: hasUpgrade("ir", 32) ? "" : "none !important",
                                            }
                                            if (player.subtabs["ir"]["stages"] == "spaceZone4") str.outline = "3px solid #fff"
                                            return str
                                        }], 
                                        ["raw-html", () => {return "<div class='bottomTooltip'>Zone IV</div>"}],
                                    ], {width: "0", height: "0", position: "relative", left: "100px", top: "100px"}],

                                    // Evolution Field
                                    ["tooltip-row", [
                                        ["category-button", ["Ev", "stages", "evolutionField"], () => {
                                            let str = {
                                                width: "75px",
                                                height: "75px",
                                                background: "radial-gradient(black, #4b79ff) border-box",
                                                border: "8px solid #0000",
                                                borderRadius: "50%",
                                                color: "white",
                                                fontSize: "32px",
                                                textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
                                            }
                                            if (player.subtabs["ir"]["stages"] == "evolutionField") str.outline = "3px solid #fff"
                                            return str
                                        }], 
                                        ["raw-html", () => {return "<div class='bottomTooltip'>Evolution Field</div>"}],
                                    ], {width: "0", height: "0", position: "relative", left: "0px", top: "-100px", display: "none !important"}],
                                    ["style-column", [
                                        ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(90deg, #d487fd, #4b79ff) border-box", border: "4px solid #0000", borderRadius: "50%", width: "67px", height: "67px"}],
                                    ], {width: "0", height: "0", position: "relative", left: "-37.5px", top: "-100px", pointerEvents: "none", display: "none !important"}],

                                ], {width: "1044px", height: "1044px", backgroundImage: "url(resources/ui/spaceBattle/map.png)"}],
                            ], {width: "400px", height: "360px", borderLeft: "3px solid #5e4ee6", borderBottom: "3px solid #5e4ee6", flexFlow: "column"}],
                            ["blank", "357px"],
                        ], {width: "403px", height: "720px"}],
                    ], {width: "800px", height: "720px", background: "radial-gradient(circle, #151230 0%, #37078f 200%)", border: "3px solid #5e4ee6", borderRadius: "0"}],
                    ["blank", "25px"],
                ],
            },
            "upgrades": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["category-button", ["Ships", "stuff", "ships"], {width: "265px", height: "40px", background: "#37078f", borderRadius: "13px 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#5e4ee6"}],
                        ["category-button", ["Stages", "stuff", "stages"], {width: "264px", height: "40px", background: "#37078f", borderRadius: "0 0 0 0"}],
                        ["style-row", [], {width: "3px", height: "40px", backgroundColor: "#5e4ee6"}],
                        ["category-button", ["Upgrades", "stuff", "upgrades"], {width: "265px", height: "40px", background: "#37078f", borderRadius: "0 13px 0 0"}],
                    ], {width: "800px", height: "40px", border: "3px solid #5e4ee6", borderRadius: "16px 16px 0 0", marginBottom: "-3px"}],
                    ["top-column", [
                        ["style-row", [
                            ["raw-html", function () { return "You have <span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(player.ir.spaceRock) + " space rocks</span> and <span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(player.ir.spaceGem) + " space gems</span>."  }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                            
                        ], {background: "#37078f", borderBottom: "3px solid #5e4ee6", width: "800px", height: "40px"}],
                        ["style-row", [
                            ["centered-draggable-scroll-row", [
                                
                                ["style-row", [

                                    // Zone I Upgrades
                                    ["style-column", [
                                        ["style-row", [
                                            ["style-row", [
                                                ["upgrade", 11],
                                                ["upgrade", 12],
                                                ["upgrade", 13],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 20],
                                                ["upgrade", 14],
                                                ["upgrade", 21],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 101],
                                                ["upgrade", 102],
                                                ["upgrade", 103],
                                            ]],
                                        ], {width: "636px", background: "#5e4ee63f", border: "3px solid #5e4ee6", borderRadius: "19px"}],
                                    ], {width: "0", height: "0", position: "relative", left: "-318px", top: "0"}],
                                    
                                    // Zone I -> Zone II Connection

                                    ["style-column", [
                                                ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(90deg, #5e4ee6, #904ee6) border-box", border: "3px solid #0000", borderRadius: "0", width: "212px", height: "162px"}],
                                    ], {width: "0", height: "0", position: "relative", left: "327px", top: "0"}],
                                    ["style-column", [
                                        ["style-row", [
                                            ["style-row", [
                                                ["upgrade", 16],
                                            ]],
                                        ], {width: "218px", background: "linear-gradient(90deg, #5e4ee63f, #904ee63f)", borderRadius: "0"}],
                                    ], {width: "0", height: "0", position: "relative", left: "327px", top: "0"}],

                                    // Zone II Upgrades

                                    ["style-column", [
                                        ["style-row", [
                                            ["style-row", [
                                                ["upgrade", 15],
                                                ["upgrade", 17],
                                                ["upgrade", 18],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 22],
                                                ["upgrade", 23],
                                                ["upgrade", 24],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 104],
                                                ["upgrade", 105],
                                                ["upgrade", 106],
                                            ]],
                                        ], {width: "636px", background: "#904ee63f", border: "3px solid #904ee6", borderRadius: "19px"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "548px", top: "0px"}
                                        look.display = hasUpgrade("ir", 16) ? "" : "none !important"
                                        return look
                                    }],

                                    // Zone II -> Iridite Zone Connection

                                    ["style-column", [
                                                ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(90deg, #904ee6, white) border-box", border: "3px solid #0000", borderRadius: "0", width: "212px", height: "162px"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "1193px", top: "0px"}
                                        look.display = hasUpgrade("ir", 16) ? "" : "none !important"
                                        return look
                                    }],
                                    ["style-column", [
                                        ["style-row", [
                                            ["style-row", [
                                                ["upgrade", 19],
                                            ]],
                                        ], {width: "218px", background: "linear-gradient(90deg, #904ee63f, #ffffff3f)", borderRadius: "0"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "1193px", top: "0px"}
                                        look.display = hasUpgrade("ir", 16) ? "" : "none !important"
                                        return look
                                    }],

                                    // Geroa Upgrades

                                    ["style-column", [
                                        ["style-column", [
                                            ["style-row", [
                                                ["upgrade", 202],
                                                ["upgrade", 204],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 201],
                                                ["upgrade", 203],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 205],
                                                ["upgrade", 206],
                                            ]],
                                        ], {width: "424px", background: "#536bdb3f", border: "3px solid #536bdb", borderRadius: "19px"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "1414px", top: "0px"}
                                        look.display = hasUpgrade("ir", 19) ? "" : "none !important"
                                        return look
                                    }],

                                    // Zone II -> Zone III Connection

                                    ["style-column", [
                                                ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(0deg, #904ee6, #e64ebd) border-box", border: "3px solid #0000", borderRadius: "0", width: "212px", height: "162px"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "760px", top: "-333px"}
                                        look.display = player.ir.iriditeDefeated ? "" : "none !important"
                                        return look
                                    }],
                                    ["style-column", [
                                        ["style-row", [
                                            ["style-row", [
                                                ["upgrade", 25],
                                            ]],
                                        ], {width: "218px", background: "linear-gradient(90deg, #904ee63f, #e64ebd3f)", borderRadius: "0"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "760px", top: "-333px"}
                                        look.display = player.ir.iriditeDefeated ? "" : "none !important"
                                        return look
                                    }],

                                    // Zone III Upgrades

                                    ["style-column", [
                                        ["style-row", [
                                            ["style-row", [
                                                ["upgrade", 26],
                                                ["upgrade", 27],
                                                ["upgrade", 28],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 29],
                                                ["upgrade", 30],
                                                ["upgrade", 31],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 107],
                                                ["upgrade", 108],
                                                ["upgrade", 109],
                                            ]],
                                        ], {width: "636px", background: "#e64ebd3f", border: "3px solid #e64ebd", borderRadius: "19px"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "548px", top: "-666px"}
                                        look.display = hasUpgrade("ir", 25) ? "" : "none !important"
                                        return look
                                    }],

                                    // Shard Mining Upgrades

                                    // Zone II -> Zone IV Connection

                                    ["style-column", [
                                                ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(180deg, #904ee6, #bf41bf) border-box", border: "3px solid #0000", borderRadius: "0", width: "212px", height: "162px"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "760px", top: "333px"}
                                        look.display = hasUpgrade("bum", 23) ? "" : "none !important"
                                        return look
                                    }],
                                    ["style-column", [
                                        ["style-row", [
                                            ["style-row", [
                                                ["upgrade", 32],
                                            ]],
                                        ], {width: "218px", background: "linear-gradient(90deg, #904ee63f, #bf41bf3f)", borderRadius: "0"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "760px", top: "333px"}
                                        look.display = hasUpgrade("bum", 23) ? "" : "none !important"
                                        return look
                                    }],

                                    // Zone IV Upgrades

                                    ["style-column", [
                                        ["style-row", [
                                            ["style-row", [
                                                ["upgrade", 33],
                                                ["upgrade", 34],
                                                ["upgrade", 35],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 36],
                                                ["upgrade", 37],
                                                ["upgrade", 38],
                                            ]],
                                            ["style-row", [
                                                ["upgrade", 110],
                                                ["upgrade", 111],
                                                ["upgrade", 112],
                                            ]],
                                        ], {width: "636px", background: "#bf41bf3f", border: "3px solid #bf41bf", borderRadius: "19px"}],
                                    ], () => {
                                        let look = {width: "0", height: "0", position: "relative", left: "548px", top: "666px"}
                                        look.display = hasUpgrade("ir", 32) ? "" : "none !important"
                                        return look
                                    }],

                                ], {width: "4000px", height: "4000px", backgroundImage: "url(resources/ui/spaceBattle/iriditeZone_blue.png)"}],
                            ], {width: "800px", height: "677px", flexFlow: "column"}]
                        ]],
                        /*["style-row", [
                            ["raw-html", function () { return "You have <span style='color:#bfbfbf;text-shadow:0 0 8px #bfbfbf'>" + formatWhole(player.cb.evolutionShards) + " ES</span> and <span style='color:#796d85;text-shadow:0 0 8px #796d85'>" + formatWhole(player.cb.paragonShards) + " PS</span>."  }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                            
                        ], {background: "#37078f", borderTop: "3px solid #5e4ee6", width: "800px", height: "40px"}],*/
                    ], {width: "800px", height: "720px", background: "linear-gradient(120deg, #0F0D25 0%, #0E0921 100%)", border: "3px solid #5e4ee6", borderRadius: "0"}],
                    ["blank", "25px"],
                ],
            },
            "Battle": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return false },
                content() { return [
                    ["style-column", [], {height: (arena && arena._fullscreen) ? "10px" : "0"}],
                    ["style-column", [
                        ["raw-html", "Level: " + formatWhole(player.ir.battleLevel) + "<span style='font-size:16px'> / " + formatWhole(SB_zones[player.ir.battleStage].levelLimit) + "</span>", { "color": "white", textShadow: "0 0 10px white", "font-size": "24px", "font-family": "monospace", lineHeight: "1" }],
                        ["style-row", [
                            ["raw-html", "<small>[SOFTCAP: x" + format(player.ir.levelScalingMult) + " Asteroid and Celestialite Stats]</small>", { "color": "red", textShadow: "0 0 10px red", "font-size": "16px", "font-family": "monospace", marginLeft: "6px", marginRight: "6px" }],
                        ], {lineHeight: "1", marginLeft: "6px", marginRight: "6px", display: player.ir.battleLevel.gte(player[player.ir.battleStage].levelScalingStart) ? "" : "none !important"}]
                    ], {width: "800px", height: "50px", background: player.ir.secondaryColor, borderRadius: "13px 13px 0 0", border: "3px solid " + player.ir.primaryColor, borderBottom: "0", display: (arena && arena._fullscreen) ? "none !important" : ""}],
                    ["row", [["ex-bar", "healthBar"], ["ex-bar", "xpBar"],]],
                    ["style-column", [], {height: (arena && arena._fullscreen) ? "calc(100vh - 279px)" : "800px"}],
                    ["row", [["ex-bar", "bossHealthBar"],]],
                    ["style-column", [
                        ["blank", "9px", {width: "6px"}],
                        ["raw-html", "Use W and S to more forwards or backwards, A to D to rotate, and Space or Mouse to shoot.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "9px", {width: "6px"}],
                        ["row", [
                            ["clickable", 12], ["blank", "6px", {width: "6px"}], ["clickable", 15], ["blank", "6px", {width: "6px"}], ["clickable", 16],
                        ]],
                    ], {width: (arena && arena._fullscreen) ? "calc(100vw - 6px)" : "800px", height: "100px", background: player.ir.secondaryColor, borderRadius: (arena && arena._fullscreen) ? "0px" : "0 0 13px 13px", border: "3px solid " + player.ir.primaryColor, borderTop: "0px"}],
                ]}
            },
            "Refresh Page :(": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You idiot. WHY DID YOU REFRESH THE PAGE???" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

                    ["blank", "25px"],
                    ["clickable", 12],
                ]
            },
            "Lose": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You lost." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

                    ["blank", "25px"],
                    ["clickable", 12],
                ]
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.se.starsExploreCount[0][5].gte(1) }
});