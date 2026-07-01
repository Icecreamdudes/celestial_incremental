//shipBattleSkip(new Decimal(17), {attackDamage: 3, damageReduction: 0.3, attackSpeed: 0.8, lootGain: 1.8, gemGain: 1.2})
function shipBattleSkip(level = new Decimal(0), upgEffect = {}) {
    player.ir.inBattle = true
    options.fullscreen = true
    if (player.tab == "ir") {
        player.subtabs["ir"]['stuff'] = 'Battle'

        arena = new SpaceArena(1200, 600);
        arena.spawnArena();
        localStorage.setItem('arenaActive', 'true');

        pauseUniverseAll(["A2", "DS"], "pause", true)
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
    if (regen > 0) arena.upgradeEffects.hpRegen = regen / 60

    arena.upgradeEffects.attackDamage *= levelableEffect("ir", player.ir.shipType)[2]
    arena.upgradeEffects = Object.assign(arena.upgradeEffects, upgEffect)

    if (player.tab == "ir") {
        if (level.lte(8)) player.ir.ufoFought = false
        if (level.lte(16)) player.ir.iriditeFought = false
    } else {
        if (level.lte(20)) player.bl.noxFightActive = false
    }
    player.ir.battleLevel = level
}

addLayer("ir", {
    name: "Iridite",
    symbol: "✦",
    universe: "A2",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
        iriditeUnlocked: false,
        inBattle: false,
        autoShoot: false,

        shipHealth: new Decimal(0),
        shipHealthMax: new Decimal(100),
        shipDamageMult: new Decimal(1),

        spaceRock: new Decimal(0),
        spaceGem: new Decimal(0),

        shipType: 0,

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
        iriditeFightActive: false,
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
            borderColor: "#ffffffff",
            color: "#eaf6f7",
        };
    },
    tooltip: "Iridite, the Astral Celestial",
    branches: ["pl", "se"],
    color: "#151230",
    update(delta) {
        if (arena == null && player.subtabs["ir"]['stuff'] == 'Battle') {
            player.subtabs["ir"]['stuff'] = "Refresh Page :(";
        }

        if (options.fullscreen && player.tab == "ir" && player.subtabs["ir"]["stuff"] != "Battle") options.fullscreen = false

        // Ship max health by type
        if (player.ir.shipType == 1) player.ir.shipHealthMax = new Decimal(100)
        if (player.ir.shipType == 2) player.ir.shipHealthMax = new Decimal(150)
        if (player.ir.shipType == 3) player.ir.shipHealthMax = new Decimal(75)
        if (player.ir.shipType == 4) player.ir.shipHealthMax = new Decimal(100)
        if (player.ir.shipType == 5) player.ir.shipHealthMax = new Decimal(50)
        if (player.ir.shipType == 6) player.ir.shipHealthMax = new Decimal(75)
        if (player.ir.shipType == 7) player.ir.shipHealthMax = new Decimal(75)
        if (player.ir.shipType == 8) player.ir.shipHealthMax = new Decimal(100)
        if (player.ir.shipType == 9) player.ir.shipHealthMax = new Decimal(67.5)

        if (arena && arena.upgradeEffects && arena.upgradeEffects.maxHp) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(arena.upgradeEffects.maxHp)
        if (hasUpgrade("ir", 102)) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(1.25)
        if (player.ir.shipType != 0) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(levelableEffect("ir", player.ir.shipType)[3])
        if (hasUpgrade("ir", 17)) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(1.3)
        player.ir.shipHealthMax = player.ir.shipHealthMax.mul(getBuyableAmount("bl", 33).div(100).add(1))

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
        player.ir.timers[8].max = new Decimal(2100)
        player.ir.timers[9].max = new Decimal(1500)
        for (let i in player.ir.timers) {
            if (hasUpgrade("ir", 18)) player.ir.timers[i].max = player.ir.timers[i].max.div(upgradeEffect("ir", 18))
            player.ir.timers[i].max = player.ir.timers[i].max.div(levelableEffect("pu", 401)[1])
            player.ir.timers[i].current = player.ir.timers[i].current.sub(delta)
        }

        player.ir.battleXPReq = player.ir.battleLevel.pow(1.6).mul(5).add(40)
        if (player.tab == "ir" && player.ir.battleLevel.gt(16)) player.ir.battleXPReq = player.ir.battleXPReq.mul(Decimal.pow(1.05, player.ir.battleLevel.sub(16)))
        if (player.tab == "bl" && player.ir.battleLevel.gt(20)) player.ir.battleXPReq = player.ir.battleXPReq.mul(Decimal.pow(1.05, player.ir.battleLevel.sub(20)))
        if (hasUpgrade("ir", 103)) player.ir.battleXPReq = player.ir.battleXPReq.div(1.25)
        if (hasUpgrade("ir", 106)) player.ir.battleXPReq = player.ir.battleXPReq.div(1.4)
        player.ir.battleXPReq = player.ir.battleXPReq.div(getBuyableAmount("bl", 14).div(100).add(1))

        if (player.ir.battleXP.gte(player.ir.battleXPReq) && arena && !arena.upgradeChoiceActive) {
            player.ir.battleXP = player.ir.battleXP.sub(player.ir.battleXPReq).max(0);
            player.ir.battleLevel = player.ir.battleLevel.add(1);
            if (arena) {
                arena.showUpgradeChoice();
                arena.upgradeChoiceActive = true
            }
        }

        if (player.ir.battleLevel.gte(8) && hasUpgrade("ir", 16) && !player.ir.ufoFought && player.tab == "ir") {
            spawnUfoBoss();
            player.ir.ufoFought = true
        }

        if (player.ir.battleLevel.gte(16) && hasUpgrade("ir", 19) && !player.ir.iriditeFought && player.tab == "ir") {
            summonIridite();
            player.ir.iriditeFought = true
        }

        if (cutsceneActive) {
            pauseAsteroidMinigame()
        } else {
            resumeAsteroidMinigame()
        }

    },
    bars: {
        healthBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.ir.shipHealth.div(player.ir.shipHealthMax);
            },
            borderStyle: {border: "0", border: "2px solid white",},
            baseStyle: {background: "rgba(0, 0, 0, 0.5)",},
            fillStyle: { backgroundImage: "linear-gradient(15deg, #3011bdff 0%, #1640caff 50%, #155e80ff 100%)"},
            display() {
                return"<h5>" + formatWhole(player.ir.shipHealth) + "/" + formatWhole(player.ir.shipHealthMax) + "<h5>HP" ;
            },
        },
        xpBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.ir.battleXP.div(player.ir.battleXPReq);
            },
            borderStyle: {border: "0", border: "2px solid white",},
            baseStyle: {background: "rgba(0, 0, 0, 0.5)",},
            fillStyle: { backgroundImage: "linear-gradient(15deg, #3011bdff 0%, #1640caff 50%, #155e80ff 100%)"},
            display() {
                return"<h5>" + formatWhole(player.ir.battleXP) + "/" + formatWhole(player.ir.battleXPReq) + "<h5>XP" ;
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
            image() { return this.canClick() ? "resources/ships/cruiser.png" : "resources/secret.png"},
            title() { return "Cruiser" },
            description() {
                return "x" + format(this.effect()[0]) + " to stars. <small>(Ignoring Softcap)</small><br>x" + format(this.effect()[1]) + " to singularity points.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
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
            canClick() { return true },
            onClick() { 
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.25).mul(10).add(50).floor() },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#5e4ee6ff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        2: {
            image() { return this.canClick() ? "resources/ships/impact.png" : "resources/secret.png"},
            title() { return "Impact" },
            description() {
                return "^" + format(this.effect()[0], 3) + " to points.<br>x" + format(this.effect()[1]) + " to infinities.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
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
            canClick() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || hasUpgrade("ir", 101)},
            onClick() { 
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.275).mul(15).add(80).floor() },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#5e4ee6ff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        3: {
            image() { return this.canClick() ? "resources/ships/unarmed.png" : "resources/secret.png"},
            title() { return "Unarmed" },
            description() {
                return "^" + format(this.effect()[0], 3) + " to antimatter dimensions.<br>x" + format(this.effect()[1]) + " to core scraps.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
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
            tooltip() { return  (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.ir.levelables[1][0].gte(10) && player.ir.levelables[2][0].gte(10)) ? "" : "Unlocks at Cruiser and Impact level 10." },
            unlocked() { return true },
            canClick() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.ir.levelables[1][0].gte(10) && player.ir.levelables[2][0].gte(10))},
            onClick() { 
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.3).mul(50).add(200).floor() },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#5e4ee6ff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        4: {
            image() { return this.canClick() ? "resources/ships/sniper.png" : "resources/secret.png"},
            title() { return "Sniper" },
            description() {
                return "x" + format(this.effect()[0]) + " to space energy.<br>^" + format(this.effect()[1], 3) + " to infinity points.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
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
            tooltip() { return  (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || buyableEffect("sb", 12).gte(3) ? "" : "Unlocks at 3 space building cap." },
            unlocked() { return true },
            canClick() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || buyableEffect("sb", 12).gte(3)},
            onClick() { 
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.35).mul(25).add(100).floor() },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#5e4ee6ff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        5: {
            image() { return this.canClick() ? "resources/ships/ufo.png" : "resources/secret.png"},
            title() { return "Ufo" },
            description() {
                return "x" + format(this.effect()[0]) + " to xpboost.<br>x" + format(this.effect()[1]) + " to legendary gems.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
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
            tooltip() { return  (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.pet.levelables[502][0].gte(1)) ? "" : "Unlocks with a legendary pet." },
            unlocked() { return true },
            canClick() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.pet.levelables[502][0].gte(1))},
            onClick() { 
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.45).mul(50).add(300).floor() },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#5e4ee6ff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        6: {
            image() { return this.canClick() ? "resources/ships/streamliner.png" : "resources/secret.png"},
            title() { return "Streamliner" },
            description() {
                return "^" + format(this.effect()[0], 3) + " to mastery point effects.<br>^" + format(this.effect()[1], 3) + " to negative infinity points.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
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
            tooltip() { return  (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.st.buyables[206].gte(1)) ? "" : "Unlocks with a progression tree update (in stars)." },
            unlocked() { return true },
            canClick() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.st.buyables[206].gte(1))},
            onClick() { 
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.45).mul(100).add(500).floor() },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#5e4ee6ff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        7: {
            image() { return this.canClick() ? "resources/ships/stinger.png" : "resources/secret.png"},
            title() { return "Stinger" },
            description() {
                return "^" + format(this.effect()[0], 3) + " to pollinators.<br>x" + format(this.effect()[1]) + " to radiation.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
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
            tooltip() { return  (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || hasUpgrade("fu", 110) ? "" : "Progress through Aleph content." },
            unlocked() { return player.al.show },
            canClick() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || hasUpgrade("fu", 110)},
            onClick() {
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.5).mul(150).add(1000).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#5e4ee6ff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        8: {
            image() { return this.canClick() ? "resources/ships/astral.png" : "resources/secret.png"},
            title() { return "Astral" },
            description() {
                return "x" + format(this.effect()[0]) + " to space rocks.<br>+" + formatWhole(this.effect()[1]) + " to max ship level.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            lore() {
                return "A simulated version of Iridite, the Astral Celestial. Moves omnidirectionally and fires Iridite's lasers."
            },
            levelLimit() { return Decimal.add(50, levelableEffect("ir", 8)[1])},
            effect() {
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.2).div(3).add(1), // space rocks
                    getLevelableAmount(this.layer, this.id).div(5).floor(), // space gems
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            tooltip() { return  (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || player.ir.astralShipUnlocked ? "" : "Defeat Iridite without taking damage to unlock." },
            unlocked() { return player.ir.iriditeDefeated },
            canClick() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || player.ir.astralShipUnlocked },
            onClick() {
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.6).mul(200).add(1500).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#5e4ee6ff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        9: {
            image() { return this.canClick() ? "resources/ships/evolver.png" : "resources/secret.png"},
            title() { return "Evolver" },
            description() {
                return "x" + format(this.effect()[0]) + " to ESC.<br>^" + format(this.effect()[1]) + " to paradox pylon energy.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"

            },
            lore() { return "An experimental vessel that fractures its projectiles into multiple seeking fragments." },
            levelLimit() { return Decimal.add(25, levelableEffect("ir", 8)[1])},
            effect() {
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1),
                    getLevelableAmount(this.layer, this.id).pow(0.4).mul(0.04).add(1),
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            tooltip() { return  (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || hasUpgrade("ev8", 25) ? "" : "Purchase a certain shard research." },
            unlocked() { return true },
            canClick() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || hasUpgrade("ev8", 25)},
            onClick() { 
                player.ir.shipType = this.id
                return layers[this.layer].levelables.index = this.id 
            },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.4).mul(200).add(1000).floor() },  
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#37078f"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#5e4ee6ff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
    },
    clickables: {
        1: {
            title() { return "<h2>Unlock Iridite, the Astral Celestial" },
            canClick() { return player.au2.stars.gte(5e10) && player.stagnantSynestia.highestCombo.gte(25) },
            unlocked() { return true },
            onClick() {
                player.ir.iriditeUnlocked = true
                player.subtabs["ir"]['stuff'] = 'Space Battle'
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
        11: {
            title() { return player.ir.timers[player.ir.shipType].current.lte(0) ? "<h2>Enter Space Battle" : "<h2>Cooldown: " + formatTime(player.ir.timers[player.ir.shipType].current)},
            canClick() { return player.ir.timers[player.ir.shipType].current.lte(0) },
            unlocked() { return true },
            tooltip() { return "Universes are paused to save performance." },
            onClick() {
                player.ir.inBattle = true
                options.fullscreen = true
                player.subtabs["ir"]['stuff'] = 'Battle'

                arena = new SpaceArena(1200, 600);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                pauseUniverseAll(["A2", "DS"], "pause", true)

                player.ir.shipHealth = player.ir.shipHealthMax
                let regen = 0
                if (hasUpgrade("ir", 14)) regen += 0.5
                regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
                if (regen > 0) arena.upgradeEffects.hpRegen = regen / 60

                arena.upgradeEffects.attackDamage *= levelableEffect("ir", player.ir.shipType)[2]

                player.ir.ufoFought = false
                player.ir.iriditeFought = false
            },
            style: { width: '300px', "min-height": '100px', color: "white" },
        },
        12: {
            title() { return "<h2>Leave Battle" },
            canClick() { return true },
            unlocked() { return !player.ir.iriditeFightActive || player.subtabs["ir"]["stuff"] == "Refresh Page :("},
            onClick() {
                player.ir.inBattle = false
                options.fullscreen = false
                player.subtabs["ir"]['stuff'] = 'Space Battle'

                if (arena) {
                    arena.removeArena();
                    arena = null;
                }
                localStorage.setItem('arenaActive', 'false');

                pauseUniverseAll(["A2", "DS"], "unpause", true)

                player.ir.timers[player.ir.shipType].current = player.ir.timers[player.ir.shipType].max

                player.ir.battleXP = new Decimal(0)
                player.ir.battleLevel = new Decimal(0)
                player.ir.iriditeFightActive = false
            },
            style: {width: "200px", minHeight: '100px', color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },
        13: {
            title() { return player.ir.autoShoot ? "<h2>Auto-Shoot<br>[ENABLED]" : "<h2>Auto-Shoot<br>[DISABLED]" },
            canClick() { return true },
            unlocked() { return !player.ir.iriditeFightActive},
            onClick() {
                if (player.ir.autoShoot) {
                    player.ir.autoShoot = false
                } else {
                    player.ir.autoShoot = true
                }
            },
            style: {width: "200px", minHeight: '100px', color: "white", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },
        1001: {
            title() {return "W"},
            canClick: true,
            unlocked() { return !player.ir.iriditeFightActive},
            onClick() {
                document.dispatchEvent(new KeyboardEvent('keydown', {key: 'w', code: 'KeyW', bubbles: true}))
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 'w', code: 'KeyW', bubbles: true}))
                }, 100)
            },
            style: {width: "50px", minHeight: "50px", fontSize: "12px", color: "white", backgroundColor: "#222", border: "2px solid white", margin: "-1px"}
        },
        1002: {
            title() {return "A"},
            canClick: true,
            unlocked() { return !player.ir.iriditeFightActive},
            onClick() {
                document.dispatchEvent(new KeyboardEvent('keydown', {key: 'a', code: 'KeyA', bubbles: true}))
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 'a', code: 'KeyA', bubbles: true}))
                }, 100)
            },
            style: {width: "50px", minHeight: "50px", fontSize: "12px", color: "white", backgroundColor: "#222", border: "2px solid white", margin: "-1px"}
        },
        1003: {
            title() {return "S"},
            canClick: true,
            unlocked() { return !player.ir.iriditeFightActive},
            onClick() {
                document.dispatchEvent(new KeyboardEvent('keydown', {key: 's', code: 'KeyS', bubbles: true}))
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 's', code: 'KeyS', bubbles: true}))
                }, 100)
            },
            style: {width: "50px", minHeight: "50px", fontSize: "12px", color: "white", backgroundColor: "#222", border: "2px solid white", margin: "-1px"}
        },
        1004: {
            title() {return "D"},
            canClick: true,
            unlocked() { return !player.ir.iriditeFightActive},
            onClick() {
                document.dispatchEvent(new KeyboardEvent('keydown', {key: 'd', code: 'KeyD', bubbles: true}))
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent('keyup', {key: 'd', code: 'KeyD', bubbles: true}))
                }, 100)
            },
            style: {width: "50px", minHeight: "50px", fontSize: "12px", color: "white", backgroundColor: "#222", border: "2px solid white", margin: "-1px"}
        },
    },
    upgrades: {
        11: {
            title: "Rejuvenation",
            unlocked() { return true },
            description: "Boosts singularity point gain based on space rocks.",
            cost: new Decimal(300),
            currencyLocation() { return player.ir },
            effect() {
                return player.ir.spaceRock.pow(0.75).mul(1000).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        12: {
            title: "Replenish",
            unlocked() { return true },
            description: "Boosts oil gain based on space rocks.",
            cost: new Decimal(500),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.ir.spaceRock.pow(2.5).mul(5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        13: {
            title: "Servitude",
            unlocked() { return true },
            description: "Boosts check back XP gain based on space gems.",
            cost: new Decimal(800),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            effect() {
                return player.ir.spaceGem.pow(0.25).mul(0.3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        14: {
            title: "Healing",
            unlocked() { return true },
            description: "All ships start off with 0.5 hp/sec of health regeneration.",
            cost: new Decimal(1200),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        15: {
            title: "Civilization",
            unlocked() { return true },
            description: "Unlock Space Buildings.",
            cost: new Decimal(2000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        16: {
            title: "Miniboss",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "You are able to fight the UFO miniboss at level 8, and unlock a new legendary pet.",
            cost: new Decimal(3000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        17: {
            title: "Reinforcement II",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "All ships have 30% increased max hp.",
            cost: new Decimal(5000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        18: {
            title: "Timekeeper",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "Cut ship cooldown times based on space gems.",
            effect() {
                return player.ir.spaceGem.pow(0.75).mul(0.02).add(1)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            cost: new Decimal(8000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        19: {
            title: "Iridite",
            unlocked() { return player.ir.ufoDefeated },
            description: "...",
            cost: new Decimal(10000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },

        //gems
        101: {
            title: "Impact",
            unlocked() { return true },
            description: "Unlocks the second ship: Impact.",
            cost: new Decimal(2),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        102: {
            title: "Reinforcement",
            unlocked() { return true },
            description: "All ships have 25% increased max hp.",
            cost: new Decimal(3),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        103: {
            title: "Alleviator",
            unlocked() { return true },
            description: "Battle XP requirements are cut by /1.25.",
            cost: new Decimal(5),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        104: {
            title: "Treasure",
            unlocked() { return true },
            description: "Double the probability of getting space gems from asteroids.",
            cost: new Decimal(7),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        105: {
            title: "Exploration",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "Unlock more star exploration nodes.",
            cost: new Decimal(12),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        106: {
            title: "Alleviator II",
            unlocked() { return buyableEffect("sb", 12).gte(3) },
            description: "Battle XP requirements are cut by /1.4",
            cost: new Decimal(18),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },

        // Geroa BH Upgrades
        201: {
            title: "Medkit",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) },
            description: "Unlock Geroa's \"Self Repair\" skill",
            cost: new Decimal(25),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        202: {
            title: "Spicy Energy",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) },
            description: "Unlock Geroa's \"Cosmic Ray\" skill",
            cost: new Decimal(5000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        203: {
            title: "I'M A FIRIN' MY LASAR",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) },
            description: "Unlock Geroa's \"Orbital Cannon\" skill",
            cost: new Decimal(100),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        204: {
            title: "Probably should use these",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) },
            description: "Unlock Geroa's \"Defense Satellites\" skill",
            cost: new Decimal(1e5),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        205: {
            title: "Version 2.0",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) },
            description: "Increase Geroa's base stats by 20%",
            cost: new Decimal(250),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
        206: {
            title: "Version 3.0",
            unlocked() { return getLevelableAmount("pet", 502).gt(0) && hasUpgrade("depth4", 4) },
            description: "Increase Geroa's base damage by 50%",
            cost: new Decimal(2e6),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
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
                let look = {borderRadius: "15px", color: "white", border: "3px solid #37078f", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#151230"
                return look
            },
        },
    },
    microtabs: {
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
            "Space Battle": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["blank", "25px"],
                            ["clickable", 11],
                            ["blank", "25px"],
                            ["raw-html", function () { return "You have " + formatWhole(player.ir.spaceRock) + " space rocks." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have " + formatWhole(player.ir.spaceGem) + " space gems." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "15px"],
                            ["style-column", [
                                ["levelable-display", [
                                    ["style-row", [["clickable", 2],], {width: '100px', height: '40px' }],
                                ]],
                            ], {width: "550px", height: "175px", backgroundColor: "#070024", border: "3px solid #5e4ee6ff", borderRight: "3px solid #5e4ee6ff", borderRadius: "2px 2px 0 0"}],
                            ["top-column", [
                                ["style-column", [
                                    ["raw-html", "Ships", {color: "#5e4ee6ff", fontSize: "20px", fontFamily: "monospace"}],
                                ], {width: "550px", height: "40px", backgroundColor: "#241d66ff", borderBottom: "3px solid #5e4ee6ff",  borderLeft: "3px solid #5e4ee6ff", borderRight: "3px solid #5e4ee6ff", userSelect: "none"}],
                                ["style-column", [
                                    ["row", [["levelable", 1], ["levelable", 2],["levelable", 3],["levelable", 4],["levelable", 5],]],
                                    ["row", [["levelable", 6], ["levelable", 7], ["levelable", 8], ["levelable", 9]]],
                                ], {width: "540px", height: "270px", backgroundColor: "#151230", borderLeft: "3px solid #5e4ee6ff", borderRight: "3px solid #5e4ee6ff", borderBottom: "3px solid #5e4ee6ff", padding: "5px"}],
                            ], {width: "556px", height: "320px"}],
                            ["blank", "25px"],
                        ], {width: "800px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "800px", border: "3px solid #dbdbdb", backgroundColor: "#1c1c1c", borderRadius: "15px 15px 15px 15px"}],
                ]
            },
            "Upgrades": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have " + formatWhole(player.ir.spaceRock) + " space rocks." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have " + formatWhole(player.ir.spaceGem) + " space gem." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", "Space Rocks", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14],["upgrade", 15],["upgrade", 16],]],
                    ["row", [["upgrade", 17],["upgrade", 18],["upgrade", 19],]],
                    ["blank", "25px"],
                    ["raw-html", "Space Gems", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["upgrade", 101],["upgrade", 102],["upgrade", 103],["upgrade", 104],["upgrade", 105],["upgrade", 106],]],
                    ["blank", "25px"],
                    ["raw-html", () => {return getLevelableAmount("pet", 502).gt(0) ? "Geroa Skills" : ""}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["row", [["upgrade", 201], ["upgrade", 202], ["upgrade", 203], ["upgrade", 204], ["upgrade", 205], ["upgrade", 206],
                        ["upgrade", 207]]],
                ]
            },
            "Perks": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"} },
                unlocked() { return player.ir.iriditeDefeated && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "Perks for defeating Iridite", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "800px", border: "3px solid rgb(27, 0, 36)", backgroundImage: "linear-gradient(120deg, #480e8aff 0%, rgba(20, 7, 24, 1) 100%)", borderBottom: "5px", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
                    ["style-column", [
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
                    ], {width: "800px", border: "3px solid rgb(27, 0, 36)", backgroundImage: "linear-gradient(120deg, #480e8aff 0%, rgba(20, 7, 24, 1) 100%)", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 15px 15px"}]
                ]
            },
            "Battle": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return false },
                content: [
                    ["raw-html", function () { return "Level: " + formatWhole(player.ir.battleLevel) }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Use W and S to more forwards or backwards, A to D to rotate, and Space or Mouse to shoot." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["bar", "healthBar"], ["bar", "xpBar"],]],
                    ["blank", "650px"],
                    ["style-row", [
                        ["clickable", 12],
                        ["blank", ["100px", "50px"]],
                        ["style-column", [
                            ["clickable", 1001],
                            ["row", [["clickable", 1002], ["clickable", 1003], ["clickable", 1004]]],
                        ], {width: "150px", height: "100px"}],
                        ["blank", ["100px", "50px"]],
                        ["clickable", 13],
                    ], {position: "fixed", top: "calc(50% + 320px)", left: "calc(50% - 375px)", isolation: "isolate", zIndex: "15000"}],
                ]
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
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.se.starsExploreCount[0][5].gte(1) }
});