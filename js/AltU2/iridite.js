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
const UPGRADE_POOL = [
    // Common
    {
        name: "Attack Damage Up",
        description: "+10% attack damage",
        rarity: "common",
        color: "#fff",
        effect(arena) { arena.upgradeEffects.attackDamage *= 1.1; }
    },
    {
        name: "XP Gain Up",
        description: "+10% XP gain",
        rarity: "common",
        color: "#fff",
        effect(arena) { arena.upgradeEffects.xpGain *= 1.1; }
    },
    {
        name: "Loot Gain Up",
        description: "+10% loot gain",
        rarity: "common",
        color: "#fff",
        effect(arena) { arena.upgradeEffects.lootGain *= 1.1; }
    },
    // Uncommon
    {
        name: "Health Regen",
        description: "+0.5 HP/sec",
        rarity: "uncommon",
        color: "#4cff4c",
        effect(arena) { arena.upgradeEffects.hpRegen += 0.5 / 60; }
    },
    {
        name: "Loot Gain Up",
        description: "+20% loot gain",
        rarity: "uncommon",
        color: "#4cff4c",
        effect(arena) { arena.upgradeEffects.lootGain *= 1.2; }
    },
    {
        name: "Attack Damage Up",
        description: "+15% attack damage",
        rarity: "uncommon",
        color: "#4cff4c",
        effect(arena) { arena.upgradeEffects.attackDamage *= 1.15; }
    },
    // Rare
    {
        name: "Damage Reduction",
        description: "Take 20% less damage",
        rarity: "rare",
        color: "#4c8cff",
        effect(arena) { arena.upgradeEffects.damageReduction *= 0.8; }
    },
    {
        name: "Movement Speed Up",
        description: "+1 max velocity",
        rarity: "rare",
        color: "#4c8cff",
        effect(arena) { arena.upgradeEffects.moveSpeed += 1; }
    },
    {
        name: "Attack Speed Up",
        description: "8% faster attack speed",
        rarity: "uncommon",
        color: "#4cff4c",
        effect(arena) { arena.upgradeEffects.attackSpeed *= 0.92; }
    },
    {
        name: "Loot Gain Up",
        description: "+35% loot gain",
        rarity: "rare",
        color: "#4c8cff",
        effect(arena) { arena.upgradeEffects.lootGain *= 1.35; }
    },
    // Epic
    {
        name: "Epic Attack",
        description: "+20% attack damage, +8% attack speed",
        rarity: "epic",
        color: "#b44cff",
        effect(arena) { arena.upgradeEffects.attackDamage *= 1.2; arena.upgradeEffects.attackSpeed *= 0.92; }
    },
    {
        name: "Epic XP",
        description: "+50% XP gain",
        rarity: "epic",
        color: "#b44cff",
        effect(arena) { arena.upgradeEffects.xpGain *= 1.5; }
    }
];

// Rarity weights
const UPGRADE_RARITY_WEIGHTS = {
    common: 50,
    uncommon: 25,
    rare: 15,
    epic: 10
};

function pickUpgrades() {
    // Weighted random selection
    let pool = [];
    for (let upg of UPGRADE_POOL) {
        for (let i = 0; i < UPGRADE_RARITY_WEIGHTS[upg.rarity]; i++) {
            pool.push(upg);
        }
    }
    let chosen = [];
    while (chosen.length < 3) {
        let upg = pool[getRandomInt(pool.length)];
        if (!chosen.includes(upg)) chosen.push(upg);
    }
    return chosen;
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

        shipHealth: new Decimal(0),
        shipHealthMax: new Decimal(100),

        spaceRock: new Decimal(0),
        spaceGem: new Decimal(0),

        shipType: 0,

        shipCooldownMax: [new Decimal(0), new Decimal(600), new Decimal(900)],
        shipCooldownTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        
        sendCooldownMax: [new Decimal(0), new Decimal(900), new Decimal(1200), new Decimal(10), new Decimal(4800), new Decimal(12000), new Decimal(24000)],
        sendCooldownTimer: new Decimal(0),
        sendResource: ["ir", "spaceRock"],
        sendGain: new Decimal(50),

        battleLevel: new Decimal(0),
        battleXP: new Decimal(0),
        battleXPReq: new Decimal(0),
        upgrades: [],

        ufoFought: false,
        ufoDefeated: false,

        iriditeFought: false,
        iriditeFightActive: false,
        iriditeDefeated: false,

        iriditePhase: new Decimal(0),
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

        if (player.ir.shipType == 0) {
            player.ir.sendResource = ["ir", "spaceRock"]
            player.ir.sendGain = new Decimal(0)
        }
        if (player.ir.shipType == 1) {
            player.ir.shipHealthMax = new Decimal(100)

            player.ir.sendResource = ["ir", "spaceRock"]
            player.ir.sendGain = new Decimal(100)
            .mul(levelableEffect("pet", 502)[1])
        }
        if (player.ir.shipType == 2) {
            player.ir.shipHealthMax = new Decimal(150)

            player.ir.sendResource = ["ir", "spaceGem"]
            player.ir.sendGain = new Decimal(1)
        }
        if (player.ir.shipType == 3) {
            player.ir.shipHealthMax = new Decimal(75)

            player.ir.sendResource = ["ir", "spaceRock"]
            player.ir.sendGain = new Decimal(2)
            .mul(levelableEffect("pet", 502)[1])
        }
        if (player.ir.shipType == 4) {
            player.ir.shipHealthMax = new Decimal(100)

            player.ir.sendResource = ["ir", "spaceGem"]
            player.ir.sendGain = new Decimal(2)
        }
        if (player.ir.shipType == 5) {
            player.ir.shipHealthMax = new Decimal(50)

            player.ir.sendResource = ["ir", "spaceRock"]
            player.ir.sendGain = new Decimal(1000)
            .mul(levelableEffect("pet", 502)[1])
        }
        if (player.ir.shipType == 6) {
            player.ir.shipHealthMax = new Decimal(75)

            player.ir.sendResource = ["ir", "spaceGem"]
            player.ir.sendGain = new Decimal(5)
        }

        if (hasUpgrade("ir", 102)) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(1.25)
        if (player.ir.shipType != 0) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(levelableEffect("ir", player.ir.shipType)[3])
        if (hasUpgrade("ir", 17)) player.ir.shipHealthMax = player.ir.shipHealthMax.mul(1.3)

        player.ir.shipCooldownMax = [new Decimal(0), new Decimal(600), new Decimal(900), new Decimal(1500), new Decimal(1200), new Decimal(1800), new Decimal(1200), new Decimal(600)];
        for (let i = 0; i < player.ir.shipCooldownMax.length; i++) {
            player.ir.shipCooldownTimers[i] = player.ir.shipCooldownTimers[i].sub(delta);

            if (hasUpgrade("ir", 18)) player.ir.shipCooldownMax[i] = player.ir.shipCooldownMax[i].div(upgradeEffect("ir", 18))
        }
        
        player.ir.sendCooldownTimer = player.ir.sendCooldownTimer.sub(delta);

        player.ir.battleXPReq = player.ir.battleLevel.pow(1.6).mul(5).add(40)
        if (hasUpgrade("ir", 103)) player.ir.battleXPReq = player.ir.battleXPReq.div(1.25)
        if (hasUpgrade("ir", 106)) player.ir.battleXPReq = player.ir.battleXPReq.div(1.4)

        if (player.ir.battleXP.gte(player.ir.battleXPReq)) {
            player.ir.battleXP = new Decimal(0);
            player.ir.battleLevel = player.ir.battleLevel.add(1);
            if (arena) arena.showUpgradeChoice();
        }

        if (player.ir.battleLevel.gte(8) && hasUpgrade("ir", 16) && !player.ir.ufoFought)
        {
            spawnUfoBoss();
            player.ir.ufoFought = true
        }

        if (player.ir.battleLevel.gte(16) && hasUpgrade("ir", 19) && !player.ir.iriditeFought)
        {
            summonIridite();
            player.ir.iriditeFought = true
        }

        if (cutsceneActive)
        {
            pauseAsteroidMinigame()
        } else
        {
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
                return "x" + format(this.effect()[0]) + " to stars.<br>x" + format(this.effect()[1]) + " to singularity points.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            lore() {
                return "Fast, slim, and rapid-firing bullets. Pretty average ship ngl."
            },
            // levelLimit() { return new Decimal(99) },
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
                return "^" + format(this.effect()[0]) + " to points.<br>x" + format(this.effect()[1]) + " to infinities.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            lore() {
                return "Bigger, slower, but larger and more powerful bullets."
            },
            // levelLimit() { return new Decimal(99) },
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
                return "^" + format(this.effect()[0]) + " to antimatter dimensions.<br>x" + format(this.effect()[1]) + " to core scraps.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            lore() {
                return "Don't underestimate the goat."
            },
            // levelLimit() { return new Decimal(99) },
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
                return "x" + format(this.effect()[0]) + " to space energy.<br>^" + format(this.effect()[1]) + " to infinity points.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            lore() {
                return "Shoots extremely fast piercing bullets with precision. Automatically aims at cosmic celestialites, might affect movement."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.3).add(1), //space energy
                    getLevelableAmount(this.layer, this.id).pow(0.3).mul(0.085).add(1), //core scraps
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Damage
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), //Health
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            tooltip() { return  (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.sb.maxBuildingSlots.gte(5)) ? "" : "Unlocks at 5 space building slots." },
            unlocked() { return true },
            canClick() { return (getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)) || (player.sb.maxBuildingSlots.gte(5))},
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
            // levelLimit() { return new Decimal(99) },
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
                return "^" + format(this.effect()[0]) + " to mastery point effects.<br>^" + format(this.effect()[1]) + " to negative infinity points.<br>x" + format(this.effect()[2]) + " to ship damage.<br>x" + format(this.effect()[3]) + " to ship health.<br>"
            },
            lore() {
                return "Shoots very fast streams of bullets, but with slow movement speed."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(2.5).pow(1.5).add(1), //mastery point effects
                    getLevelableAmount(this.layer, this.id).pow(0.3).mul(0.1).add(1), //neginf
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
    },
    clickables: {
        1: {
            title() { return "<h2>Unlock Iridite, the Astral Celestial" },
            canClick() { return player.au2.stars.gte(5e10) && player.fi.tier2BestWave.gt(2) },
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
            title() { return player.ir.shipCooldownTimers[player.ir.shipType].lte(0) ? "<h2>Enter Space Battle" : "<h2>Enter Space Battle<br>Cooldown: " + formatTime(player.ir.shipCooldownTimers[player.ir.shipType])},
            canClick() { return player.ir.shipCooldownTimers[player.ir.shipType].lte(0) },
            unlocked() { return true },
            tooltip() { return "Universes are paused to save performance." },
            onClick() {
                player.ir.inBattle = true
                player.ma.inBlackHeart = true
                player.subtabs["ir"]['stuff'] = 'Battle'

                arena = new SpaceArena(1200, 600);
                arena.spawnArena();
                localStorage.setItem('arenaActive', 'true');

                pauseUniverse("U1")
                pauseUniverse("UA")
                pauseUniverse("U2")
                pauseUniverse("A1")
                pauseUniverse("U3")
                pauseUniverse("CB")

                player.ir.shipHealth = player.ir.shipHealthMax
                if (hasUpgrade("ir", 14)) arena.upgradeEffects.hpRegen += 0.5 / 60

                arena.upgradeEffects.attackDamage *= levelableEffect("ir", player.ir.shipType)[2]

                player.ir.ufoFought = false
                player.ir.iriditeFought = false
            },
            style() {
                let look = {width: "300px", minHeight: "100px"}
                if (this.canClick()) {
                    look.backgroundColor = "#480e8a"
                    look.color = "white"
                } else {
                    look.backgroundColor = "#bf8f8f"
                    look.color = "black"
                }
                return look
            },
        },
        12: {
            title() { return "<h2>Leave Battle" },
            canClick() { return true },
            unlocked() { return !player.ir.iriditeFightActive || player.subtabs["ir"]["stuff"] == "Refresh Page :("},
            onClick() {
                player.ir.inBattle = false
                player.ma.inBlackHeart = false
                player.subtabs["ir"]['stuff'] = 'Space Battle'

                if (arena) {
                    arena.removeArena();
                    arena = null;
                }
                localStorage.setItem('arenaActive', 'false');

                pauseUniverse("U1")
                pauseUniverse("UA")
                pauseUniverse("U2")
                pauseUniverse("A1")
                pauseUniverse("U3")
                pauseUniverse("CB")

                player.ir.shipCooldownTimers[player.ir.shipType] = player.ir.shipCooldownMax[player.ir.shipType]

                player.ir.battleXP = new Decimal(0)
                player.ir.battleLevel = new Decimal(0)
                player.ir.iriditeFightActive = false
            },
            style() {
                let look = {width: "300px", minHeight: "100px"}
                if (this.canClick()) {
                    look.backgroundColor = "#480e8a"
                    look.color = "white"
                } else {
                    look.backgroundColor = "#bf8f8f"
                    look.color = "black"
                }
                return look
            },
        },
        13: {
            title() { return "<h2>Battle<br><span style='font-size:16px'>+"
                + format(player.ir.sendGain.mul(new Decimal(1).add(new Decimal(0.1).mul(getLevelableAmount(this.layer, player.ir.shipType).sub(1)))))
                + " " + (player.ir.sendResource[1] == "spaceRock" ? "Space Rock" : "Space Gem") + "<br>" + formatTime(player.ir.sendCooldownMax[player.ir.shipType]) + " Cooldown</span>"
            },
            canClick() { return player.ir.sendCooldownTimer.lte(0) },
            unlocked() { return player.ev.evolutionsUnlocked[11] },
            tooltip() { return "Based on ship level." },
            onClick() {
                player[player.ir.sendResource[0]][player.ir.sendResource[1]] = player[player.ir.sendResource[0]][player.ir.sendResource[1]].add(player.ir.sendGain.mul(new Decimal(1).add(new Decimal(0.1).mul(getLevelableAmount(this.layer, player.ir.shipType).sub(1)))))

                player.ir.sendCooldownTimer = player.ir.sendCooldownMax[player.ir.shipType]
            },
            style() {
                let look = {width: "300px", minHeight: "100px"}
                if (this.canClick()) {
                    look.backgroundColor = "#480e8a"
                    look.color = "white"
                } else {
                    look.backgroundColor = "#bf8f8f"
                    look.color = "black"
                }
                return look
            },
        },
        14: {
            title() { return "<h2>Repair<br><span style='font-size:16px'>+"
                + format(new Decimal(100).mul(new Decimal(1).add(new Decimal(0.15).mul(getLevelableAmount('pet', 1209).sub(1)))))
                + " XP<br>" + formatTime(new Decimal(600).add(player.ir.sendCooldownMax[player.ir.shipType].mul(0.5))) + " Cooldown</span>"
            },
            canClick() { return player.ir.sendCooldownTimer.lte(0) },
            unlocked() { return player.ev.evolutionsUnlocked[11] },
            tooltip() { return "Based on Captain evo pet level." },
            onClick() {
                setLevelableXP("ir", player.ir.shipType, getLevelableXP("ir", player.ir.shipType).add(new Decimal(100).mul(new Decimal(1).add(new Decimal(0.15).mul(getLevelableAmount('pet', 1209).sub(1))))))

                player.ir.sendCooldownTimer = new Decimal(600).add(player.ir.sendCooldownMax[player.ir.shipType].mul(0.5))
            },
            style() {
                let look = {width: "300px", minHeight: "100px"}
                if (this.canClick()) {
                    look.backgroundColor = "#480e8a"
                    look.color = "white"
                } else {
                    look.backgroundColor = "#bf8f8f"
                    look.color = "black"
                }
                return look
            },
        },
        1001: {
            title() {return "W"},
            canClick: true,
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            unlocked: true,
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
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
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
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
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
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        14: {
            title: "Healing",
            unlocked() { return true },
            description: "All ships start off with 0.5 hp/sec of health regeneration.",
            cost: new Decimal(1200),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        15: {
            title: "Civilization",
            unlocked() { return true },
            description: "Unlock Space Buildings.",
            cost: new Decimal(2000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        16: {
            title: "Miniboss",
            unlocked() { return player.sb.maxBuildingSlots.gte(5) },
            description: "You are able to fight the UFO miniboss at level 8, and unlock a new legendary pet.",
            cost: new Decimal(3000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        17: {
            title: "Reinforcement II",
            unlocked() { return player.sb.maxBuildingSlots.gte(5) },
            description: "All ships have 30% increased max hp.",
            cost: new Decimal(5000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        18: {
            title: "Timekeeper",
            unlocked() { return player.sb.maxBuildingSlots.gte(5) },
            description: "Cut ship cooldown times based on space gems.",
            effect() {
                return player.ir.spaceGem.pow(0.75).mul(0.02).add(1)
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            cost: new Decimal(8000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        19: {
            title: "Iridite",
            unlocked() { return player.ir.ufoDefeated },
            description: "...",
            cost: new Decimal(10000),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Rocks",
            currencyInternalName: "spaceRock",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
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
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        102: {
            title: "Reinforcement",
            unlocked() { return true },
            description: "All ships have 25% increased max hp.",
            cost: new Decimal(3),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        103: {
            title: "Alleviator",
            unlocked() { return true },
            description: "Battle XP requirements are cut by /1.25.",
            cost: new Decimal(5),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        104: {
            title: "Treasure",
            unlocked() { return true },
            description: "Double the probability of getting space gems from asteroids.",
            cost: new Decimal(7),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        105: {
            title: "Exploration",
            unlocked() { return player.sb.maxBuildingSlots.gte(5) },
            description: "Unlock more star exploration nodes.",
            cost: new Decimal(12),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },
        106: {
            title: "Alleviator II",
            unlocked() { return player.sb.maxBuildingSlots.gte(5) },
            description: "Battle XP requirements are cut by /1.4",
            cost: new Decimal(18),
            currencyLocation() { return player.ir },
            currencyDisplayName: "Space Gems",
            currencyInternalName: "spaceGem",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px", color: "white"},
        },

    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return formatWhole(player.au2.stars) + "/5e10 stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return formatWhole(player.fi.tier2BestWave) + "/8 tier 2 best wave." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Not a lot of requirements... I'm trying to be nice." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["clickable", 1],
                ]
            },
            "Space Battle": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                    ["style-column", [
                    ["blank", "25px"],
                    ["clickable", 11],
                    ["blank", "25px"],
                    ["raw-html", function () { if (getLevelableAmount('pet', 1209).lte(0)) return ""; else return player.ir.sendCooldownTimer.lte(0) ? "Captain (Ready)" : "Captain (Cooldown: "+formatTime(player.ir.sendCooldownTimer)+")" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 13],["clickable", 14]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have " + formatWhole(player.ir.spaceRock) + " space rocks." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have " + formatWhole(player.ir.spaceGem) + " space gems." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2],], {width: '100px', height: '40px' }],
                            ]],
                    ], {width: "550px", height: "175px", backgroundColor: "#070024", border: "3px solid #5e4ee6ff", borderRight: "3px solid #5e4ee6ff", borderRadius: "2px 2px 0 0"}],
                    ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Ships", {color: "#5e4ee6ff", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "541px", height: "40px", backgroundColor: "#241d66ff", borderBottom: "3px solid #5e4ee6ff",  borderLeft: "3px solid #5e4ee6ff",  userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 1], ["levelable", 2],["levelable", 3],["levelable", 4],["levelable", 5],]],
                                ["row", [["levelable", 6],]],
                            ], {width: "531px", height: "250px", backgroundColor: "#151230", borderLeft: "3px solid #5e4ee6ff", padding: "5px"}],
                        ], {width: "556px", height: "220px"}],
                    ["blank", "25px"],
                        ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #dbdbdb", backgroundColor: "#1c1c1c", borderRadius: "15px 15px 15px 15px"}],
                ]
            },
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have " + formatWhole(player.ir.spaceRock) + " space rocks." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have " + formatWhole(player.ir.spaceGem) + " space gem." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Space Rocks" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14],["upgrade", 15],["upgrade", 16],]],
                    ["row", [["upgrade", 17],["upgrade", 18],["upgrade", 19],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Space Gems" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["upgrade", 101],["upgrade", 102],["upgrade", 103],["upgrade", 104],["upgrade", 105],["upgrade", 106],]],
                ]
            },
            "Perks": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.ir.iriditeDefeated && !player.ir.inBattle },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "Perks for defeating Iridite", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", backgroundImage: "linear-gradient(120deg, #480e8aff 0%, rgba(20, 7, 24, 1) 100%)", borderBottom: "5px", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
                    ["style-column", [
                        ["raw-html", () => { return "Unlocks: COMING SOON!" }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "15px"],
                        ["raw-html", () => { return "Greatly weakened antimatter softcap." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "x50 dice sides." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Keep hex of power upgrades on singularity reset." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Keep hex of realms challenge completions on singularity reset." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Keep hex of vexes on singularity resets and subsequent reset tiers." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Keep hex of purity on singularity resets and subsequent reset tiers." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ], {width: "1000px", border: "3px solid rgb(27, 0, 36)", backgroundImage: "linear-gradient(120deg, #480e8aff 0%, rgba(20, 7, 24, 1) 100%)", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 15px 15px"}]
                ]
            },
            "Battle": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content: [
                    ["raw-html", function () { return "Level: " + formatWhole(player.ir.battleLevel) }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Use W and S to more forwards or backwards, A to D to rotate, and Space or Mouse to shoot." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["bar", "healthBar"], ["bar", "xpBar"],]],
                    ["blank", "650px"],
                    ["row", [["clickable", 12], ["clickable", 13], ["blank", "50px"],
                                                            ["style-column", [
                            ["clickable", 1001],
                            ["row", [["clickable", 1002], ["clickable", 1003], ["clickable", 1004]]],
                        ], {width: "150px", height: "100px"}],     
                ]],     
    
                ]
            },
            "Refresh Page :(": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
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

class SpaceArena {
        // Expand the arena to cover the entire screen and make it transparent
    enterIriditeFullscreen() {
        if (!this.arenaDiv || this._iriditeFullscreen) return;
        this._iriditeFullscreen = true;

        // Save previous styles and sizes so we can restore later
        this._prevArenaStyle = {
            left: this.arenaDiv.style.left,
            top: this.arenaDiv.style.top,
            transform: this.arenaDiv.style.transform,
            width: this.arenaDiv.style.width,
            height: this.arenaDiv.style.height,
            background: this.arenaDiv.style.background,
            border: this.arenaDiv.style.border,
            overflow: this.arenaDiv.style.overflow,
            zIndex: this.arenaDiv.style.zIndex
        };
        this._prevWidth = this.width;
        this._prevHeight = this.height;

        // Apply fullscreen & transparent styles
        Object.assign(this.arenaDiv.style, {
            left: '0px',
            top: '0px',
            transform: 'none',
            width: '100vw',
            height: '100vh',
            background: 'transparent',
            border: 'none',
            overflow: 'hidden',
            zIndex: 10000
        });

        // Resize canvas and internal dimensions to match window
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (this.canvas) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }

        // Re-center player ship (keeps player visually centered)
        if (this.ship) {
            this.ship.x = this.width / 2;
            this.ship.y = this.height / 2;
        }

        // Keep the canvas sized during window resize while in fullscreen boss mode
        this._onWindowResize = () => {
            if (!this._iriditeFullscreen) return;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            if (this.canvas) {
                this.canvas.width = this.width;
                this.canvas.height = this.height;
            }
            // keep ship centered
            if (this.ship) {
                this.ship.x = this.width / 2;
                this.ship.y = this.height / 2;
            }
        };
        window.addEventListener('resize', this._onWindowResize);
    }

    // Restore the arena to its previous size/style
    exitIriditeFullscreen() {
        if (!this.arenaDiv || !this._iriditeFullscreen) return;
        this._iriditeFullscreen = false;

        const s = this._prevArenaStyle || {};
        Object.assign(this.arenaDiv.style, {
            left: s.left || '50%',
            top: s.top || '50%',
            transform: s.transform || 'translate(-50%, -50%)',
            width: s.width || (this._prevWidth ? (this._prevWidth + 'px') : '800px'),
            height: s.height || (this._prevHeight ? (this._prevHeight + 'px') : '600px'),
            background: s.background || '#181a2b',
            border: s.border || '3px solid #fff',
            overflow: s.overflow || 'hidden',
            zIndex: s.zIndex || 9999
        });

        // Restore canvas size and internal dimensions
        this.width = this._prevWidth || this.width;
        this.height = this._prevHeight || this.height;
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
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.arenaDiv = null;

        // load wing GIF for Iridite (200x200). keep a loaded flag so draw can choose fallback.
        this.wingImg = new Image();
        this.wingImg.src = 'resources/flying.gif';
        this.wingImgLoaded = false;
        this.wingImg.onload = () => { this.wingImgLoaded = true; };

        // ...existing code...

        // Ship types
        if (player.ir.shipType == 1) {
            this.ship = {
                x: width / 2,
                y: height / 2,
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
        if (player.ir.shipType == 2) {
            this.ship = {
                x: width / 2,
                y: height / 2,
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
                x: width / 2,
                y: height / 2,
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
            this.lastBounceClick = 0;
            this.bounceCooldown = 2000; // 2 seconds in ms
            this.canvasClickListener = (e) => {
                let now = Date.now();
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
                x: width / 2,
                y: height / 2,
                angle: 0,
                velocity: 0,
                angularVelocity: 0,
                maxVelocity: 4.5,
                acceleration: 0.25,
                deceleration: 0.15,
                rotationSpeed: 0.065,
                cooldown: 250,
                lastShot: 0,
                damage: 20,
                collisionDamage: 5,
            };
        }
        if (player.ir.shipType == 5) {
            this.ship = {
                x: width / 2,
                y: height / 2,
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
                collisionDamage: 5,
            };
        }
        if (player.ir.shipType == 6) {
            this.ship = {
                x: width / 2,
                y: height / 2,
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
        if (player.ir.shipType == 0) {
            this.ship = {
                x: width / 2,
                y: height / 2,
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
        this.mouseDown = false;
        this.running = false;
        this.loop = null;
        this.asteroidSpawnTimer = 0;
        this.maxAsteroids = 6;
        this.lootFlashes = [];
        this.upgradeChoiceActive = false;
        this.upgradeChoices = [];
        this.selectedUpgradeIndex = null;
        this.upgradeEffects = this.getDefaultUpgradeEffects();

        // Enemy system
        this.enemies = [];
        this.enemyTypes = {
            alphaShip: {
                name: "Alpha Ship",
                radius: 24,
                color: "#4c8cff",
                healthMin: 200,
                healthMax: 300,
                damage: 6,
                speed: 2.2,
                wanderSpeed: 1.6,
                wanderChange: 0.04,
                bulletSpeed: 9,
                bulletCooldown: 200,
                burstCount: 3,
                burstInterval: 50,
                rockDrop: [10, 20],
                xpDrop: [10, 15],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
                    ctx.fillStyle = enemy.color;
                    ctx.shadowColor = "#fff";
                    ctx.shadowBlur = 8;
                    ctx.fill();
                    ctx.font = "bold 32px monospace";
                    ctx.fillStyle = "#fff";
                    ctx.textAlign = "center";
                    ctx.fillText("α", enemy.x, enemy.y + 12);
                    ctx.restore();
                }
            },
            betaShip: {
                // Machine-gun style: rapid burst (many small bullets)
                name: "Beta Ship",
                radius: 20,
                color: "#ffb84c",
                healthMin: 150,
                healthMax: 200,
                damage: 4,
                speed: 3.5,
                wanderSpeed: 2.8,
                wanderChange: 0.08,
                bulletSpeed: 10,
                bulletCooldown: 60,     // time between burst sequences
                burstCount: 3,          // bullets per burst
                burstInterval: 5,       // frames between bullets inside burst
                rockDrop: [6, 14],
                xpDrop: [6, 10],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
                    ctx.fillStyle = enemy.color;
                    ctx.shadowColor = "#fff";
                    ctx.shadowBlur = 8;
                    ctx.fill();
                    ctx.font = "bold 32px monospace";
                    ctx.fillStyle = "#fff";
                    ctx.textAlign = "center";
                    ctx.fillText("β", enemy.x, enemy.y + 12);
                    ctx.restore();
                }
            },
            gammaShip: {
                name: "Gamma Ship",
                radius: 28,
                color: "#b44cff",
                healthMin: 160,
                healthMax: 240,
                damage: 10,
                speed: 1.2,
                wanderSpeed: 7.2,
                wanderChange: 0.22,
                bulletSpeed: 1,
                bulletCooldown: 999999999999,
                burstCount: 1,
                burstInterval: 1,
                rockDrop: [18, 30],
                xpDrop: [18, 26],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
                    ctx.fillStyle = enemy.color;
                    ctx.shadowColor = "#fff";
                    ctx.shadowBlur = 12;
                    ctx.fill();
                    ctx.font = "bold 32px monospace";
                    ctx.fillStyle = "#fff";
                    ctx.textAlign = "center";
                    ctx.fillText("γ", enemy.x, enemy.y + 12);
                    ctx.restore();
                }
            },

            // Hard-mode enemies (activated at battleLevel >= 8)
            deltaShip: {
                name: "Delta",
                radius: 28,
                color: "#66ffe6",
                healthMin: 320,
                healthMax: 360,
                damage: 8,
                speed: 2.5,
                wanderSpeed: 3.0,
                wanderChange: 0.6,
                bulletSpeed: 0, // Delta mainly dashes, doesn't shoot
                bulletCooldown: 999999,
                burstCount: 0,
                burstInterval: 1,
                rockDrop: [8, 18],
                xpDrop: [12, 18],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
                    ctx.fillStyle = enemy.color;
                    ctx.shadowColor = "#bff";
                    ctx.shadowBlur = 8;
                    ctx.fill();
                    ctx.font = "bold 20px monospace";
                    ctx.fillStyle = "#003";
                    ctx.textAlign = "center";
                    ctx.fillText("Δ", enemy.x, enemy.y + 6);
                    ctx.restore();
                }
            },
            epsilonShip: {
                name: "Epsilon",
                radius: 26,
                color: "#ff66d9",
                healthMin: 400,
                healthMax: 500,
                damage: 6,
                speed: 1.0,
                wanderSpeed: 1.2,
                wanderChange: 0.08,
                bulletSpeed: 5,
                bulletCooldown: 220,
                burstCount: 1,
                burstInterval: 1,
                rockDrop: [12, 22],
                xpDrop: [14, 22],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
                    ctx.fillStyle = enemy.color;
                    ctx.shadowColor = "#ffd";
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.font = "bold 20px monospace";
                    ctx.fillStyle = "#111";
                    ctx.textAlign = "center";
                    ctx.fillText("ε", enemy.x, enemy.y + 6);
                    ctx.restore();
                }
            },
            zetaShip: {
                name: "Zeta",
                radius: 22,
                color: "#ffe066",
                healthMin: 300,
                healthMax: 400,
                damage: 7,
                speed: 1.6,
                wanderSpeed: 3.4,
                wanderChange: 0.06,
                bulletSpeed: 7,
                bulletCooldown: 260,
                burstCount: 3,        // rounds
                burstInterval: 18,    // frames between rounds
                perRoundBullets: 3,   // bullets per round
                rockDrop: [14, 26],
                xpDrop: [16, 24],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
                    ctx.fillStyle = enemy.color;
                    ctx.shadowColor = "#fff6";
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.font = "bold 18px monospace";
                    ctx.fillStyle = "#111";
                    ctx.textAlign = "center";
                    ctx.fillText("ζ", enemy.x, enemy.y + 6);
                    ctx.restore();
                }
            },
            etaShip: {
                name: "Eta",
                radius: 16,
                color: "#9eff66",
                healthMin: 250,
                healthMax: 350,
                damage: 4,
                speed: 3.2,
                wanderSpeed: 3.2,
                wanderChange: 0.04,
                bulletSpeed: 11,
                bulletCooldown: 120, // shoots every 2 seconds (at 60fps)
                burstCount: 1,
                burstInterval: 1,
                rockDrop: [5, 12],
                xpDrop: [8, 14],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
                    ctx.fillStyle = enemy.color;
                    ctx.shadowColor = "#cfc";
                    ctx.shadowBlur = 8;
                    ctx.fill();
                    ctx.font = "bold 16px monospace";
                    ctx.fillStyle = "#021";
                    ctx.textAlign = "center";
                    ctx.fillText("η", enemy.x, enemy.y + 5);
                    ctx.restore();
                }
            },
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
                xpDrop: [200, 300],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.translate(enemy.x, enemy.y);
                    // UFO body
                    ctx.beginPath();
                    ctx.ellipse(0, 0, enemy.radius, enemy.radius * 0.5, 0, 0, Math.PI * 2);
                    ctx.fillStyle = enemy.color;
                    ctx.shadowColor = "#9fffd4";
                    ctx.shadowBlur = 18;
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
                xpDrop: [2000, 3000],
                draw: (ctx, enemy) => {
                    ctx.save();
                    ctx.translate(enemy.x, enemy.y);

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
                    ctx.shadowBlur = 30;

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
                    ctx.shadowBlur = 36;
                    const fontSize = Math.max(12, Math.floor(enemy.radius * 1.4));
                    ctx.font = `${fontSize}px monospace`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle"; // ensure center vertically
                    ctx.fillStyle = "#e0ccffff";
                    ctx.fillText("✦", 0, 0); // exact center
                    // subtle stroke for definition
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = "rgba(240,200,80,0.12)";
                    ctx.strokeText("✦", 0, 0);
                    ctx.restore();

                    ctx.restore();
                }
            },
        };

        this.enemySpawnCooldown = 0;
        this.enemySpawnCooldownMax = 1000;
        this.gammaTrails = [];
    }

    getDefaultUpgradeEffects() {
        return {
            attackDamage: 1,
            attackSpeed: 1,
            hpRegen: 0,
            damageReduction: 1,
            maxHp: 0,
            moveSpeed: 0,
            lootGain: 1,
            xpGain: 1,
        };
    }

    spawnArena() {
        this.arenaDiv = document.createElement('div');
        this.arenaDiv.id = 'space-arena';
        Object.assign(this.arenaDiv.style, {
            position: 'fixed',
            left: '50%',
            top: '50%',
            width: this.width + 'px',
            height: this.height + 'px',
            transform: `translate(-50%, -50%)`,
            background: '#181a2b',
            border: '3px solid #fff',
            zIndex: 9999,
            overflow: 'hidden',
        });
        document.body.appendChild(this.arenaDiv);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.arenaDiv.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        
        this.running = true;
        this.loop = setInterval(() => this.update(), 1000 / 60);

        if (player.ir.shipType == 3) {
            this.canvas.addEventListener('click', this.canvasClickListener);
        }
    }

    removeArena() {
        this.running = false;
        clearInterval(this.loop);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
        if (this.arenaDiv) document.body.removeChild(this.arenaDiv);

        if (player.ir.shipType == 3 && this.canvasClickListener) {
            this.canvas.removeEventListener('click', this.canvasClickListener);
        }

        // Ensure fight flags are cleared when arena closes
        this.bossActive = false;
        player.ir.iriditeFightActive = false;

        // Ensure fight flags are cleared when arena closes
        this.bossActive = false;
        player.ir.iriditeFightActive = false;

        // If we were in fullscreen for the Iridite fight, restore original arena
        this.exitIriditeFullscreen();
    }

    handleKeyDown = (e) => { if (!this.upgradeChoiceActive) this.keys[e.code] = true; };
    handleKeyUp = (e) => { if (!this.upgradeChoiceActive) this.keys[e.code] = false; };
    handleMouseDown = (e) => { if (!this.upgradeChoiceActive) this.mouseDown = true; };
    handleMouseUp = (e) => { if (!this.upgradeChoiceActive) this.mouseDown = false; };
        handleMouseMove = (e) => {
        if (!this.canvas) return;
        let rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    };

    shoot() {
        let now = Date.now();
        let cooldown = this.ship.cooldown * this.upgradeEffects.attackSpeed;
        if (now - this.ship.lastShot < cooldown) return;
        this.ship.lastShot = now
        let petMul = (player.pet && player.pet.legendaryPetAbilityTimers && player.pet.legendaryPetAbilityTimers[1] && typeof player.pet.legendaryPetAbilityTimers[1].gt === "function" && player.pet.legendaryPetAbilityTimers[1].gt(0)) ? 1.5 : 1;
        let angle = this.ship.angle || 0;
        // shipType 5 aims at the mouse and fires burst shots toward it
        if (player.ir.shipType == 5 && typeof this.mouseX === "number" && typeof this.mouseY === "number") {
            angle = Math.atan2(this.mouseY - this.ship.y, this.mouseX - this.ship.x);
            // spawn a short burst (multiple pellets) per shot
            let pellets = 5;
            let spread = 0.22;
            let spd = 14 + this.upgradeEffects.moveSpeed;
            for (let i = 0; i < pellets; i++) {
                let offset = (i / (pellets - 1) - 0.5) * spread;
                let ang = angle + offset;
                this.bullets.push({
                    x: this.ship.x + Math.cos(ang) * (this.ship.radius || 12),
                    y: this.ship.y + Math.sin(ang) * (this.ship.radius || 12),
                    vx: Math.cos(ang) * spd,
                    vy: Math.sin(ang) * spd,
                    life: 120,
                    damage: (this.ship.damage || 6) * this.upgradeEffects.attackDamage * petMul,
                    pierce: 0,
                    piercedAsteroids: [],
                    piercedEnemies: [],
                    fromEnemy: false,
                });
            }
            return;
        }

        let speed = 10 + this.upgradeEffects.moveSpeed;
        if (player.ir.shipType == 4) speed = 25 + this.upgradeEffects.moveSpeed;
        if (player.ir.shipType == 6) speed = 20 + this.upgradeEffects.moveSpeed;
        let pierce = 0;
        if (player.ir.shipType == 2) pierce = 1;
        if (player.ir.shipType == 4) pierce = 10;
        if (player.ir.shipType == 6) pierce = 2;

        // implement later
        let target = null;
        if (player.ir.shipType == null) { //not yet
            let closest = null;
            let closestDist = Infinity;
            for (let e of this.enemies) {
                if (!e.alive) continue;
                let dx = e.x - this.ship.x;
                let dy = e.y - this.ship.y;
                let d = Math.hypot(dx, dy);
                if (d < closestDist) {
                    closestDist = d;
                    closest = e;
                }
            }
            if (closest) {
                angle = Math.atan2(closest.y - this.ship.y, closest.x - this.ship.x);
                target = closest;
                this.ship.currentTarget = closest; // keep marker for drawing
            } else {
                this.ship.currentTarget = null;
            }
        }

        this.bullets.push({
            x: this.ship.x + Math.cos(angle) * 20,
            y: this.ship.y + Math.sin(angle) * 20,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 120,
            damage: this.ship.damage * this.upgradeEffects.attackDamage * petMul,
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

    spawnEnemy(typeName) {
        const type = this.enemyTypes[typeName];
        if (!type) return;
        let angle = Math.random() * Math.PI * 2;
        let health = getRandomInt(type.healthMax - type.healthMin + 1) + type.healthMin;
        let wanderAngle = angle;
        let enemy = {
            type: typeName,
            x: this.ship.x + Math.cos(angle) * 200,
            y: this.ship.y + Math.sin(angle) * 200,
            vx: Math.cos(angle) * (type.wanderSpeed || 1),
            vy: Math.sin(angle) * (type.wanderSpeed || 1),
            radius: type.radius,
            color: type.color,
            health: health,
            maxHealth: health,
            wanderAngle: wanderAngle,
            wanderSpeed: type.wanderSpeed,
            wanderChange: type.wanderChange,
            burstTimer: 0,
            burstCount: 0,
            bulletCooldown: type.bulletCooldown,
            alive: true,
        };

        // Hard-mode specific initial fields
        if (typeName === "deltaShip") {
            enemy.changeDirTimer = 60; // change every second (60fps)
            enemy.dashSpeed = (type.wanderSpeed || 5) * 3.0;
        }
        if (typeName === "zetaShip") {
            enemy.roundsRemaining = 0;
            enemy.roundTimer = 0;
            enemy.roundsTotal = this.enemyTypes.zetaShip.burstCount || 3;
            enemy.perRoundBullets = this.enemyTypes.zetaShip.perRoundBullets || 3;
        }
        if (typeName === "etaShip") {
            enemy.shootCooldown = type.bulletCooldown || 120;
        }

        this.enemies.push(enemy);
    }

    // Call this to spawn the UFO miniboss. It will not spawn automatically.
    spawnUfoBoss() {
        // Prevent duplicate bosses
        if (this.enemies.some(e => e.type === "ufoBoss" && e.alive)) return;

        // Mark boss active to stop normal spawns/asteroids elsewhere
        this.bossActive = true;
        // reset spawn cooldown so no other enemies immediately spawn
        this.enemySpawnCooldown = this.enemySpawnCooldownMax;

        let angle = Math.random() * Math.PI * 2;
        let enemy = {
            type: "ufoBoss",
            x: this.ship.x + Math.cos(angle) * 420,
            y: this.ship.y + Math.sin(angle) * 420,
            vx: 0,
            vy: 0,
            radius: this.enemyTypes.ufoBoss.radius,
            color: this.enemyTypes.ufoBoss.color,
            health: this.enemyTypes.ufoBoss.healthMax,
            maxHealth: this.enemyTypes.ufoBoss.healthMax,
            alive: true,
            state: "idle",         // idle | burst | dash | spin
            attackTimer: 90,       // time until next attack decision
            burstShots: 0,
            burstInterval: 6,
            dashTimer: 0,
            dashing: false,
            dashSpeed: 16,
            dashTrailTimer: 0,
            spinTimer: 0,
            spinAngle: 0,
        };
        this.enemies.push(enemy);
    }

    spawnIridite() {
        // Prevent duplicate bosses
        if (this.enemies.some(e => e.type === "iriditeBoss" && e.alive)) return;

        // Clear arena of regular threats
        for (let e of this.enemies) e.alive = false;
        this.enemies = [];
        this.asteroids = [];
        // clear player bullets too so the fight starts clean
        this.bullets = this.bullets.filter(b => b.fromEnemy);

        // Mark boss active so normal spawns/asteroids stop
        this.bossActive = true;
        // ensure the global flag is set whenever the fight is active
        player.ir.iriditeFightActive = true;

        // Make the arena fullscreen & transparent for the Iridite encounter
        if (typeof this.enterIriditeFullscreen === "function") {
            this.enterIriditeFullscreen();
        }

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

    generateConvexPolygon(radius, vertexCount) {
        let angles = [];
        for (let i = 0; i < vertexCount; i++) {
            angles.push(Math.random() * Math.PI * 2);
        }
        angles.sort((a, b) => a - b);
        let points = [];
        for (let i = 0; i < vertexCount; i++) {
            let r = radius * (0.7 + Math.random() * 0.5);
            points.push({
                x: Math.cos(angles[i]) * r,
                y: Math.sin(angles[i]) * r
            });
        }
        return points;
    }

    update() {
        // If we were in fullscreen iridite mode but the boss is gone, restore arena
        if (this._iriditeFullscreen && !this.enemies.some(e => e.type === 'iriditeBoss' && e.alive)) {
            this.exitIriditeFullscreen();
        }
        if (this.upgradeChoiceActive) {
            this.draw();
            return;
        }

        // Hard mode check
        const hardMode = player.ir.battleLevel.gte(8);
        
        if (hardMode) this.enemySpawnCooldownMax = 700;

        // Health regen
        if (this.upgradeEffects.hpRegen > 0) {
            player.ir.shipHealth = player.ir.shipHealth.add(this.upgradeEffects.hpRegen);
            if (player.ir.shipHealth.gt(player.ir.shipHealthMax.add(this.upgradeEffects.maxHp))) {
                player.ir.shipHealth = player.ir.shipHealthMax.add(this.upgradeEffects.maxHp);
            }
        }

        // Ship movement
        if (player.ir.shipType == 3) {
            // Gravity
            this.ship.vy += this.ship.gravity;

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
        } else {
            // Ship movement for other types
            // Sniper (shipType == 4): automatically rotate to face closest enemy and expose currentTarget for drawing
            if (player.ir.shipType == 4) {
                let closest = null;
                let closestDist = Infinity;
                for (let e of this.enemies) {
                    if (!e.alive) continue;
                    let dx = e.x - this.ship.x;
                    let dy = e.y - this.ship.y;
                    let d = Math.hypot(dx, dy);
                    if (d < closestDist) {
                        closestDist = d;
                        closest = e;
                    }
                }

                if (closest) {
                    // compute desired angle and rotate along shortest arc using rotationSpeed
                    const desired = Math.atan2(closest.y - this.ship.y, closest.x - this.ship.x);
                    if (typeof this.ship.angle !== "number") this.ship.angle = 0;
                    let diff = desired - this.ship.angle;
                    while (diff > Math.PI) diff -= 2 * Math.PI;
                    while (diff < -Math.PI) diff += 2 * Math.PI;

                    const step = Math.abs(this.ship.rotationSpeed) || 0.125;
                    if (Math.abs(diff) <= step) {
                        this.ship.angle = desired;
                    } else {
                        this.ship.angle += Math.sign(diff) * step;
                    }

                    this.ship.currentTarget = closest;
                } else {
                    // no target: clear marker and allow manual rotation
                    this.ship.currentTarget = null;
                    if (this.keys['KeyA']) this.ship.angle -= this.ship.rotationSpeed;
                    if (this.keys['KeyD']) this.ship.angle += this.ship.rotationSpeed;
                }
            } else {
                if (this.keys['KeyA']) this.ship.angle -= this.ship.rotationSpeed;
                if (this.keys['KeyD']) this.ship.angle += this.ship.rotationSpeed;
            }

            if (this.keys['Space'] || this.mouseDown) this.shoot();

            if (this.keys['KeyW']) {
                this.ship.velocity += this.ship.acceleration + this.upgradeEffects.moveSpeed * 0.1;
            } else if (this.keys['KeyS']) {
                this.ship.velocity -= this.ship.acceleration + this.upgradeEffects.moveSpeed * 0.1;
            } else {
                if (this.ship.velocity > 0) {
                    this.ship.velocity -= this.ship.deceleration;
                    if (this.ship.velocity < 0) this.ship.velocity = 0;
                } else if (this.ship.velocity < 0) {
                    this.ship.velocity += this.ship.deceleration;
                    if (this.ship.velocity > 0) this.ship.velocity = 0;
                }
            }
            let maxVel = this.ship.maxVelocity + this.upgradeEffects.moveSpeed;
            this.ship.velocity = Math.max(-maxVel, Math.min(maxVel, this.ship.velocity));

            // Move ship
            this.ship.x += Math.cos(this.ship.angle) * this.ship.velocity;
            this.ship.y += Math.sin(this.ship.angle) * this.ship.velocity;

            // Wrap ship around arena edges
            if (this.ship.x < 0) this.ship.x = this.width;
            if (this.ship.x > this.width) this.ship.x = 0;
            if (this.ship.y < 0) this.ship.y = this.height;
            if (this.ship.y > this.height) this.ship.y = 0;
        }
            if (player.ir.shipType == 5) {
                // Omnidirectional movement: smooth thrust toward desired velocity (rotation is purely visual)
                if (typeof this.ship.vx !== "number") this.ship.vx = 0;
                if (typeof this.ship.vy !== "number") this.ship.vy = 0;

                // Build input vector
                let ix = 0, iy = 0;
                if (this.keys['KeyW']) iy -= 1;
                if (this.keys['KeyS']) iy += 1;
                if (this.keys['KeyA']) ix -= 1;
                if (this.keys['KeyD']) ix += 1;

                // Desired speed (account for moveSpeed upgrades)
                const maxSpeed = (this.ship.maxVelocity || 3.5) + (this.upgradeEffects.moveSpeed || 0);
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

                // Keep inside bounds (respect ship radius if set)
                const r = this.ship.radius || 12;
                if (this.ship.x < r) this.ship.x = r;
                if (this.ship.x > this.width - r) this.ship.x = this.width - r;
                if (this.ship.y < r) this.ship.y = r;
                if (this.ship.y > this.height - r) this.ship.y = this.height - r;

                // Rotation purely visual: smoothly face the mouse (won't affect movement)
                if (typeof this.mouseX === "number" && typeof this.mouseY === "number") {
                    let desired = Math.atan2(this.mouseY - this.ship.y, this.mouseX - this.ship.x);
                    let diff = desired - this.ship.angle;
                    while (diff > Math.PI) diff -= 2 * Math.PI;
                    while (diff < -Math.PI) diff += 2 * Math.PI;
                    // smaller rotation step for smoothness
                    this.ship.angle += Math.sign(diff) * Math.min(Math.abs(diff), Math.max(0.04, this.ship.rotationSpeed || 0.08));
                }
            } else {
                if (this.keys['KeyA']) this.ship.angle -= this.ship.rotationSpeed;
                if (this.keys['KeyD']) this.ship.angle += this.ship.rotationSpeed;
            }
        for (let bullet of this.bullets) {
            // Homing behavior: enemy homing bullets should home to the player;
            // player-fired homing bullets should home to enemies.
            if (bullet.homing) {
                if (bullet.fromEnemy) {
                    // Home to player: compute desired and rotate toward it with clamped turn.
                    let desired = Math.atan2(this.ship.y - bullet.y, this.ship.x - bullet.x);
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
                    if ((!bullet.target || !bullet.target.alive) && this.enemies.length) {
                        let closest = null;
                        let closestDist = Infinity;
                        for (let e of this.enemies) {
                            if (!e.alive) continue;
                            let dx = e.x - bullet.x;
                            let dy = e.y - bullet.y;
                            let d = Math.hypot(dx, dy);
                            if (d < closestDist) {
                                closestDist = d;
                                closest = e;
                            }
                        }
                        bullet.target = closest;
                    }

                    if (bullet.target && bullet.target.alive) {
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
            bullet.life--;

            // Giant bullets bounce off arena edges and dissipate after life expires
            if (bullet.giant) {
                if (typeof bullet._maxLife !== "number") bullet._maxLife = bullet._maxLife || bullet.life || 240;
                // Bounce on walls; invert velocity component and apply slight damping
                if (bullet.x < 0) { bullet.x = 0; bullet.vx = -bullet.vx * 0.9; }
                if (bullet.x > this.width) { bullet.x = this.width; bullet.vx = -bullet.vx * 0.9; }
                if (bullet.y < 0) { bullet.y = 0; bullet.vy = -bullet.vy * 0.9; }
                if (bullet.y > this.height) { bullet.y = this.height; bullet.vy = -bullet.vy * 0.9; }
                // small friction to avoid infinite bouncing
                bullet.vx *= 0.998;
                bullet.vy *= 0.998;
            }
        }

        // Asteroid spawning (disabled in hard mode or while boss active)
        if (!this.bossActive) {
            this.asteroidSpawnTimer++;
            if (this.asteroidSpawnTimer > 60) {
                this.asteroidSpawnTimer = 0;
                if (Math.random() < 0.3) this.spawnAsteroid(true);
                else this.spawnAsteroid(false);
            }
        }

        // Enemy spawning (Alpha, Beta, Gamma + hard-mode types when active) with cooldown
        if (player.ir.battleLevel.gte(4) && !this.bossActive) {
            let aliveEnemies = this.enemies.filter(e => e.alive).length;
            if (this.enemySpawnCooldown > 0) {
                this.enemySpawnCooldown--;
            }

            const maxEnemies = hardMode ? 6 : 4;
            if (aliveEnemies < maxEnemies && this.enemySpawnCooldown <= 0) {
                let possibleTypes = ["alphaShip", "betaShip", "gammaShip"];
                if (hardMode) possibleTypes = possibleTypes.concat(["deltaShip", "epsilonShip", "zetaShip", "etaShip"]);
                let typeToSpawn = possibleTypes[getRandomInt(possibleTypes.length)];
                this.spawnEnemy(typeToSpawn);
                this.enemySpawnCooldown = this.enemySpawnCooldownMax;
            }
        }

        // Update enemies
        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            const type = this.enemyTypes[enemy.type];

            if (enemy.type === "iriditeBoss") {
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
                        // make dagger and shortBurst available in all phases;
                        // add laser possibility in phase 3+
                        if (enemy.phase === 1) {
                            if (r < 0.28) enemy.state = "radial";
                            else if (r < 0.36) enemy.state = "homing";
                            else if (r < 0.60) enemy.state = "dagger";
                            else if (r < 0.80) enemy.state = "shortBurst";
                            else enemy.state = "lunge";
                        } else if (enemy.phase === 2) {
                            if (r < 0.20) enemy.state = "radial";
                            else if (r < 0.42) enemy.state = "homing";
                            else if (r < 0.64) enemy.state = "raining";
                            else if (r < 0.82) enemy.state = "dagger";
                            else if (r < 0.92) enemy.state = "shortBurst";
                            else if (r < 0.96) enemy.state = "lunge";
                            else enemy.state = "lunge";
                        } else if (enemy.phase === 3) {
                            if (r < 0.16) enemy.state = "lunge";
                            else if (r < 0.36) enemy.state = "homing";
                            else if (r < 0.54) enemy.state = "raining";
                            else if (r < 0.72) enemy.state = "dagger";
                            else if (r < 0.82) enemy.state = "burst";
                            else if (r < 0.90) enemy.state = "giant";
                            else if (r < 0.98) enemy.state = "laser";
                            else enemy.state = "lunge";
                        } else {
                            // phase 4 (very aggressive)
                            if (r < 0.10) enemy.state = "lunge";
                            else if (r < 0.18) enemy.state = "homing";
                            else if (r < 0.28) enemy.state = "raining";
                            else if (r < 0.44) enemy.state = "dagger";
                            else if (r < 0.64) enemy.state = "burst";
                            else if (r < 0.76) enemy.state = "giant";
                            else if (r < 0.98) enemy.state = "laser";
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
                                let base = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
                                let ang = base + (i - (count - 1) / 2) * 0.28 + (Math.random() - 0.5) * 0.18;
                                let cosA = Math.cos(ang), sinA = Math.sin(ang);
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
                            enemy._laserAngle = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
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
                            let angle = (i / pieces) * Math.PI * 2 + (Math.random() - 0.5) * baseSpread;
                            let spd = 6;
                            this.bullets.push({
                                x: enemy.x + Math.cos(angle) * (enemy.radius - 6),
                                y: enemy.y + Math.sin(angle) * (enemy.radius - 6),
                                vx: Math.cos(angle) * spd,
                                vy: Math.sin(angle) * spd,
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
                        let ang = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x) + (Math.random() - 0.5) * 0.12;
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
                    if (enemy._lungeTimer > 0) {
                        // compute normalized direction to player
                        let dx = this.ship.x - enemy.x;
                        let dy = this.ship.y - enemy.y;
                        let dist = Math.hypot(dx, dy) || 1;
                        let strength = 6 + enemy.phase * 1.2; // per-frame movement
                        let vx = (dx / dist) * strength;
                        let vy = (dy / dist) * strength;
                        enemy.x += vx;
                        enemy.y += vy;

                        // light contact damage while lunging (once per hit cooldown)
                        let shipRadius = player.ir.shipType == 3 ? this.ship.radius : 12;
                        let sdx = this.ship.x - enemy.x;
                        let sdy = this.ship.y - enemy.y;
                        let sdist = Math.hypot(sdx, sdy);
                        if (sdist < enemy.radius + shipRadius) {
                            if (!enemy._lungeHit) {
                                enemy._lungeHit = 18; // few frames cooldown
                                let impactDmg = (6 + enemy.phase * 3) * this.upgradeEffects.damageReduction;
                                player.ir.shipHealth = player.ir.shipHealth.sub(impactDmg);
                                if (player.ir.shipHealth.lte(0)) this.onShipDeath();
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
                            let count = 1 + Math.floor(enemy.phase / 2);
                            for (let i = 0; i < count; i++) {
                                let sx = Math.random() * this.width;
                                let sy = -20 - Math.random() * 80;
                                let vx = (Math.random() - 0.5) * 0.8;
                                let vy = 3 + Math.random() * (1 + enemy.phase * 0.5);
                                this.bullets.push({
                                    x: sx,
                                    y: sy,
                                    vx: vx,
                                    vy: vy,
                                    life: 400,
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
                            const cx = Math.max(80, Math.min(this.width - 80, this.ship.x + (Math.random() - 0.5) * jitter));
                            const cy = Math.max(80, Math.min(this.height - 80, this.ship.y + (Math.random() - 0.5) * jitter));
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
                                let base = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
                                let angle = base + (Math.random() - 0.5) * 1.2 + (i - (lineCount - 1) / 2) * 0.18;
                                let cosA = Math.cos(angle), sinA = Math.sin(angle);
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
                            let base = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
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
                            let bx = this.ship.x - enemy.x;
                            let by = this.ship.y - enemy.y;
                            let ang = enemy._laserAngle;
                            let ux = Math.cos(ang), uy = Math.sin(ang);
                            // projection along beam
                            let proj = bx * ux + by * uy;
                            // perpendicular distance
                            let perp = Math.abs(bx * (-uy) + by * ux);
                            // beam effective length and thickness
                            let beamLen = Math.max(this.width, this.height) * 1.5;
                            let thickness = enemy.radius * 0.9;
                            if (proj > -enemy.radius && proj < beamLen && perp < thickness + (player.ir.shipType == 3 ? this.ship.radius : 12)) {
                                // apply damage once per short cooldown
                                let dmg = (6 + enemy.phase * 1) * this.upgradeEffects.damageReduction;
                                player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
                                enemy._laserHitCooldown = 8; // frames between hits
                                if (player.ir.shipHealth.lte(0)) this.onShipDeath();
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
                            let base = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
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
                                targetPos = { x: this.ship.x, y: this.ship.y };
                            }
                            let dx = targetPos.x - enemy.x;
                            let dy = targetPos.y - enemy.y;
                            let dist = Math.hypot(dx, dy) || 1;
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
                        let sx = this.ship.x - enemy.x;
                        let sy = this.ship.y - enemy.y;
                        let sdist = Math.hypot(sx, sy);
                        let shipRadius = player.ir.shipType == 3 ? this.ship.radius : 12;
                        if (sdist < enemy.radius + shipRadius) {
                            // prevent fast repeated damage by using a short cooldown flag on enemy
                            if (!enemy._recentlyHit) {
                                enemy._recentlyHit = 6; // frames of invuln for player from this contact
                                // reduced dash damage to make attack less violent
                                let impactDmg = (5) * this.upgradeEffects.damageReduction;
                                player.ir.shipHealth = player.ir.shipHealth.sub(impactDmg);
                                // reduced knockback
                                let kn = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
                                if (player.ir.shipType == 3) {
                                    this.ship.vx += Math.cos(kn) * 6;
                                    this.ship.vy += Math.sin(kn) * 6;
                                } else {
                                    this.ship.x += Math.cos(kn) * 4;
                                    this.ship.y += Math.sin(kn) * 4;
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

                    // ensure boss stays in bounds while dashing
                    if (enemy.x < enemy.radius) enemy.x = enemy.radius;
                    if (enemy.x > this.width - enemy.radius) enemy.x = this.width - enemy.radius;
                    if (enemy.y < enemy.radius) enemy.y = enemy.radius;
                    if (enemy.y > this.height - enemy.radius) enemy.y = this.height - enemy.radius;
                }

                // Follow player when idle (instead of drifting to center)
                if (!enemy.dashing && enemy.state === "idle") {
                    let dx = this.ship.x - enemy.x;
                    let dy = this.ship.y - enemy.y;
                    let dist = Math.hypot(dx, dy) || 1;
                    // follow speed small; slightly increase by phase so later phases close gap faster
                    let followSpeed = 0.5 + enemy.phase * 0.25;
                    enemy.x += (dx / dist) * followSpeed;
                    enemy.y += (dy / dist) * followSpeed;
                    // subtle jitter so movement looks organic
                    if (!enemy.wanderAngle) enemy.wanderAngle = Math.random() * Math.PI * 2;
                    enemy.wanderAngle += (Math.random() - 0.5) * 0.01;
                }

                // Keep boss inside arena
                if (enemy.x < enemy.radius) enemy.x = enemy.radius;
                if (enemy.x > this.width - enemy.radius) enemy.x = this.width - enemy.radius;
                if (enemy.y < enemy.radius) enemy.y = enemy.radius;
                if (enemy.y > this.height - enemy.radius) enemy.y = this.height - enemy.radius;

                // continue to next enemy after special boss handling
                continue;
            }

            // Generic wander updates
            if (!enemy.wanderAngle) enemy.wanderAngle = Math.random() * Math.PI * 2;
                // --- UFO Miniboss behavior ---
                if (enemy.type === "ufoBoss") {
                    // Hovering: maintain an orbit distance ~220 from player
                    let dx = this.ship.x - enemy.x;
                    let dy = this.ship.y - enemy.y;
                    let dist = Math.hypot(dx, dy) || 1;
                    const desiredDist = 220;
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
                            let base = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
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
                    continue;
            }
            // --- Alpha Ship behavior ---
            if (enemy.type === "alphaShip") {
                if (!enemy.wanderTimer || enemy.wanderTimer <= 0) {
                    enemy.wanderTimer = getRandomInt(60) + 60;
                    enemy.wanderAngle += (Math.random() - 0.5) * enemy.wanderChange * Math.PI * 2;
                }
                enemy.wanderTimer--;
                enemy.vx = Math.cos(enemy.wanderAngle) * enemy.wanderSpeed;
                enemy.vy = Math.sin(enemy.wanderAngle) * enemy.wanderSpeed;
                enemy.x += enemy.vx;
                enemy.y += enemy.vy;

                // Keep inside arena - bounce
                if (enemy.x < enemy.radius) {
                    enemy.x = enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.x > this.width - enemy.radius) {
                    enemy.x = this.width - enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.y < enemy.radius) {
                    enemy.y = enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }
                if (enemy.y > this.height - enemy.radius) {
                    enemy.y = this.height - enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }

                // Shooting burst logic
                enemy.burstTimer--;
                if (enemy.burstTimer <= 0) {
                    enemy.burstTimer = this.enemyTypes.alphaShip.bulletCooldown;
                    enemy.burstCount = this.enemyTypes.alphaShip.burstCount;
                }
                if (enemy.burstCount > 0 && enemy.burstTimer % this.enemyTypes.alphaShip.burstInterval === 0) {
                    let dx = this.ship.x - enemy.x;
                    let dy = this.ship.y - enemy.y;
                    let angle = Math.atan2(dy, dx);
                    let speed = this.enemyTypes.alphaShip.bulletSpeed;
                    this.bullets.push({
                        x: enemy.x + Math.cos(angle) * enemy.radius,
                        y: enemy.y + Math.sin(angle) * enemy.radius,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        life: 90,
                        damage: this.enemyTypes.alphaShip.damage,
                        pierce: 0,
                        piercedAsteroids: [],
                        fromEnemy: true,
                    });
                    enemy.burstCount--;
                }
            }

            // --- Beta Ship behavior: machine-gun bursts ---
            if (enemy.type === "betaShip") {
                if (!enemy.wanderTimer || enemy.wanderTimer <= 0) {
                    enemy.wanderTimer = getRandomInt(40) + 40;
                    enemy.wanderAngle += (Math.random() - 0.5) * enemy.wanderChange * Math.PI * 2;
                }
                enemy.wanderTimer--;

                // Occasionally dash toward player
                if (!enemy.dashCooldown || enemy.dashCooldown <= 0) {
                    let dx = this.ship.x - enemy.x;
                    let dy = this.ship.y - enemy.y;
                    let angle = Math.atan2(dy, dx);
                    enemy.vx = Math.cos(angle) * (enemy.wanderSpeed * 2.5);
                    enemy.vy = Math.sin(angle) * (enemy.wanderSpeed * 2.5);
                    enemy.dashCooldown = getRandomInt(120) + 60;
                } else {
                    enemy.vx = Math.cos(enemy.wanderAngle) * enemy.wanderSpeed;
                    enemy.vy = Math.sin(enemy.wanderAngle) * enemy.wanderSpeed;
                    enemy.dashCooldown--;
                }
                enemy.x += enemy.vx;
                enemy.y += enemy.vy;

                // Keep inside arena
                if (enemy.x < enemy.radius) {
                    enemy.x = enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.x > this.width - enemy.radius) {
                    enemy.x = this.width - enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.y < enemy.radius) {
                    enemy.y = enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }
                if (enemy.y > this.height - enemy.radius) {
                    enemy.y = this.height - enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }

                // Machine-gun burst logic: rapid small bullets with slight spread
                enemy.burstTimer--;
                if (enemy.burstTimer <= 0) {
                    enemy.burstTimer = this.enemyTypes.betaShip.bulletCooldown;
                    enemy.burstCount = this.enemyTypes.betaShip.burstCount;
                }
                if (enemy.burstCount > 0 && enemy.burstTimer % this.enemyTypes.betaShip.burstInterval === 0) {
                    let dx = this.ship.x - enemy.x;
                    let dy = this.ship.y - enemy.y;
                    let baseAngle = Math.atan2(dy, dx);
                    let spread = 0.14;
                    let bulletsThisShot = 1;
                    for (let i = 0; i < bulletsThisShot; i++) {
                        let angle = baseAngle + (Math.random() - 0.5) * spread;
                        let speed = this.enemyTypes.betaShip.bulletSpeed;
                        this.bullets.push({
                            x: enemy.x + Math.cos(angle) * enemy.radius,
                            y: enemy.y + Math.sin(angle) * enemy.radius,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed,
                            life: 60,
                            damage: this.enemyTypes.betaShip.damage * 0.6,
                            pierce: 0,
                            piercedAsteroids: [],
                            fromEnemy: true,
                        });
                    }
                    enemy.burstCount--;
                }
            }

            // --- Gamma Ship behavior ---
            if (enemy.type === "gammaShip") {
                if (!enemy.wanderTimer || enemy.wanderTimer <= 0) {
                    enemy.wanderTimer = getRandomInt(90) + 90;
                    enemy.wanderAngle += (Math.random() - 0.5) * enemy.wanderChange * Math.PI * 2;
                }
                enemy.wanderTimer--;
                enemy.vx = Math.cos(enemy.wanderAngle) * enemy.wanderSpeed;
                enemy.vy = Math.sin(enemy.wanderAngle) * enemy.wanderSpeed;
                enemy.x += enemy.vx;
                enemy.y += enemy.vy;

                // Keep inside arena
                if (enemy.x < enemy.radius) {
                    enemy.x = enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.x > this.width - enemy.radius) {
                    enemy.x = this.width - enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.y < enemy.radius) {
                    enemy.y = enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }
                if (enemy.y > this.height - enemy.radius) {
                    enemy.y = this.height - enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }

                // Trail logic: leave a damaging area every few frames
                if (!enemy.trailCooldown || enemy.trailCooldown <= 0) {
                    this.gammaTrails.push({
                        x: enemy.x,
                        y: enemy.y,
                        radius: 18,
                        timer: 120,
                        damage: 3
                    });
                    enemy.trailCooldown = 30;
                } else {
                    enemy.trailCooldown--;
                }

                // Shooting logic
                enemy.burstTimer--;
                if (enemy.burstTimer <= 0) {
                    enemy.burstTimer = this.enemyTypes.gammaShip.bulletCooldown;
                    enemy.burstCount = this.enemyTypes.gammaShip.burstCount;
                }
                if (enemy.burstCount > 0 && enemy.burstTimer % this.enemyTypes.gammaShip.burstInterval === 0) {
                    let dx = this.ship.x - enemy.x;
                    let dy = this.ship.y - enemy.y;
                    let angle = Math.atan2(dy, dx);
                    let speed = this.enemyTypes.gammaShip.bulletSpeed;
                    this.bullets.push({
                        x: enemy.x + Math.cos(angle) * enemy.radius,
                        y: enemy.y + Math.sin(angle) * enemy.radius,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        life: 120,
                        damage: this.enemyTypes.gammaShip.damage * 1.5,
                        pierce: 0,
                        piercedAsteroids: [],
                        fromEnemy: true,
                    });
                    enemy.burstCount--;
                }
            }

            // --- Delta behavior (hard mode) ---
            if (enemy.type === "deltaShip") {
                // change direction every second, dash fast
                if (!enemy.changeDirTimer || enemy.changeDirTimer <= 0) {
                    enemy.changeDirTimer = 60;
                    // choose a new random angle biased toward player occasionally
                    if (Math.random() < 0.6) {
                        let dx = this.ship.x - enemy.x;
                        let dy = this.ship.y - enemy.y;
                        enemy.wanderAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
                    } else {
                        enemy.wanderAngle += (Math.random() - 0.5) * 2.0;
                    }
                }
                enemy.changeDirTimer--;
                // dash continuously at dashSpeed
                enemy.vx = Math.cos(enemy.wanderAngle) * enemy.dashSpeed;
                enemy.vy = Math.sin(enemy.wanderAngle) * enemy.dashSpeed;
                enemy.x += enemy.vx;
                enemy.y += enemy.vy;

                // Phase-through borders (wrap similar to player)
                if (enemy.x < 0) enemy.x = this.width;
                if (enemy.x > this.width) enemy.x = 0;
                if (enemy.y < 0) enemy.y = this.height;
                if (enemy.y > this.height) enemy.y = 0;
            }

            // --- Epsilon behavior (radial burst) ---
            if (enemy.type === "epsilonShip") {
                if (!enemy.wanderTimer || enemy.wanderTimer <= 0) {
                    enemy.wanderTimer = getRandomInt(80) + 60;
                    enemy.wanderAngle += (Math.random() - 0.5) * enemy.wanderChange * Math.PI * 2;
                }
                enemy.wanderTimer--;
                enemy.vx = Math.cos(enemy.wanderAngle) * enemy.wanderSpeed;
                enemy.vy = Math.sin(enemy.wanderAngle) * enemy.wanderSpeed;
                enemy.x += enemy.vx;
                enemy.y += enemy.vy;

                // Keep inside arena - bounce
                if (enemy.x < enemy.radius) {
                    enemy.x = enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.x > this.width - enemy.radius) {
                    enemy.x = this.width - enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.y < enemy.radius) {
                    enemy.y = enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }
                if (enemy.y > this.height - enemy.radius) {
                    enemy.y = this.height - enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }

                // shooting: radial burst
                enemy.burstTimer--;
                if (enemy.burstTimer <= 0) {
                    enemy.burstTimer = this.enemyTypes.epsilonShip.bulletCooldown;
                    enemy.burstCount = this.enemyTypes.epsilonShip.burstCount;
                }
                if (enemy.burstCount > 0 && enemy.burstTimer % this.enemyTypes.epsilonShip.burstInterval === 0) {
                    // radial burst: spawn N bullets around circle
                    let pieces = 12;
                    let speed = this.enemyTypes.epsilonShip.bulletSpeed;
                    for (let i = 0; i < pieces; i++) {
                        let angle = (i / pieces) * Math.PI * 2;
                        this.bullets.push({
                            x: enemy.x + Math.cos(angle) * enemy.radius,
                            y: enemy.y + Math.sin(angle) * enemy.radius,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed,
                            life: 90,
                            damage: this.enemyTypes.epsilonShip.damage,
                            pierce: 0,
                            piercedAsteroids: [],
                            fromEnemy: true,
                        });
                    }
                    enemy.burstCount--;
                }
            }

            // --- Zeta behavior: 3 rounds of 3 bullets at the player ---
            if (enemy.type === "zetaShip") {
                if (!enemy.wanderTimer || enemy.wanderTimer <= 0) {
                    enemy.wanderTimer = getRandomInt(90) + 60;
                    enemy.wanderAngle += (Math.random() - 0.5) * enemy.wanderChange * Math.PI * 2;
                }
                enemy.wanderTimer--;
                enemy.vx = Math.cos(enemy.wanderAngle) * enemy.wanderSpeed;
                enemy.vy = Math.sin(enemy.wanderAngle) * enemy.wanderSpeed;
                enemy.x += enemy.vx;
                enemy.y += enemy.vy;

                // Keep inside arena - bounce
                if (enemy.x < enemy.radius) {
                    enemy.x = enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.x > this.width - enemy.radius) {
                    enemy.x = this.width - enemy.radius;
                    enemy.wanderAngle = Math.PI - enemy.wanderAngle;
                }
                if (enemy.y < enemy.radius) {
                    enemy.y = enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }
                if (enemy.y > this.height - enemy.radius) {
                    enemy.y = this.height - enemy.radius;
                    enemy.wanderAngle = -enemy.wanderAngle;
                }

                // manage rounds
                enemy.burstTimer--;
                if (enemy.burstTimer <= 0 && enemy.roundsRemaining <= 0) {
                    enemy.burstTimer = this.enemyTypes.zetaShip.bulletCooldown;
                    enemy.roundsRemaining = this.enemyTypes.zetaShip.burstCount || 3;
                    enemy.roundTimer = 0;
                }
                if (enemy.roundsRemaining > 0) {
                    enemy.roundTimer--;
                    if (enemy.roundTimer <= 0) {
                        // Fire one round: perRoundBullets bullets aimed at player with spread
                        let dx = this.ship.x - enemy.x;
                        let dy = this.ship.y - enemy.y;
                        let baseAngle = Math.atan2(dy, dx);
                        let bullets = enemy.perRoundBullets || 3;
                        let spread = 0.25;
                        for (let i = 0; i < bullets; i++) {
                            let offset = ((i / (bullets - 1)) - 0.5) * spread;
                            let angle = baseAngle + offset;
                            let speed = this.enemyTypes.zetaShip.bulletSpeed;
                            this.bullets.push({
                                x: enemy.x + Math.cos(angle) * enemy.radius,
                                y: enemy.y + Math.sin(angle) * enemy.radius,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                life: 90,
                                damage: this.enemyTypes.zetaShip.damage,
                                pierce: 0,
                                piercedAsteroids: [],
                                fromEnemy: true,
                            });
                        }
                        enemy.roundsRemaining--;
                        enemy.roundTimer = this.enemyTypes.zetaShip.burstInterval || 18;
                    }
                }
            }

            // --- Eta behavior: follows player and shoots every ~2s ---
            if (enemy.type === "etaShip") {
                // follow
                let dx = this.ship.x - enemy.x;
                let dy = this.ship.y - enemy.y;
                let dist = Math.sqrt(dx * dx + dy * dy) || 1;
                let angleToPlayer = Math.atan2(dy, dx);
                enemy.vx = Math.cos(angleToPlayer) * enemy.wanderSpeed;
                enemy.vy = Math.sin(angleToPlayer) * enemy.wanderSpeed;
                enemy.x += enemy.vx;
                enemy.y += enemy.vy;

                // shoot fast bullets at player every shootCooldown frames
                enemy.shootCooldown--;
                if (enemy.shootCooldown <= 0) {
                    enemy.shootCooldown = this.enemyTypes.etaShip.bulletCooldown;
                    let speed = this.enemyTypes.etaShip.bulletSpeed;
                    let angle = Math.atan2(this.ship.y - enemy.y, this.ship.x - enemy.x);
                    this.bullets.push({
                        x: enemy.x + Math.cos(angle) * enemy.radius,
                        y: enemy.y + Math.sin(angle) * enemy.radius,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        life: 80,
                        damage: this.enemyTypes.etaShip.damage,
                        pierce: 0,
                        piercedAsteroids: [],
                        fromEnemy: true,
                    });
                }
            }
        }

        // Gamma Ship trail damage
        if (this.gammaTrails) {
            for (let trail of this.gammaTrails) {
                trail.timer--;
                let dx = this.ship.x - trail.x;
                let dy = this.ship.y - trail.y;
                let shipRadius = player.ir.shipType == 3 ? this.ship.radius : 12;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < trail.radius + shipRadius && trail.timer > 0) {
                    let dmg = trail.damage * this.upgradeEffects.damageReduction;
                    if (player.ir.shipType == 3) dmg /= 4;
                    player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
                    if (player.ir.shipHealth.lte(0)) {
                        this.onShipDeath();
                    }
                }
            }
            this.gammaTrails = this.gammaTrails.filter(trail => trail.timer > 0);
        }

        // Update asteroids
        for (let asteroid of this.asteroids) {
            if (!asteroid.phased) {
                asteroid.x += asteroid.vx;
                asteroid.y += asteroid.vy;
            }
            asteroid.phaseTimer--;
            if (asteroid.phaseTimer <= 0) {
                asteroid.phased = !asteroid.phased;
                asteroid.phaseTimer = 60 + Math.floor(Math.random() * 120);
            }
            let outLeft = asteroid.x + Math.min(...asteroid.shape.map(p => p.x)) < 0;
            let outRight = asteroid.x + Math.max(...asteroid.shape.map(p => p.x)) > this.width;
            let outTop = asteroid.y + Math.min(...asteroid.shape.map(p => p.y)) < 0;
            let outBottom = asteroid.y + Math.max(...asteroid.shape.map(p => p.y)) > this.height;
            if (outLeft) asteroid.x = this.width - Math.max(...asteroid.shape.map(p => p.x));
            if (outRight) asteroid.x = -Math.min(...asteroid.shape.map(p => p.x));
            if (outTop) asteroid.y = this.height - Math.max(...asteroid.shape.map(p => p.y));
            if (outBottom) asteroid.y = -Math.min(...asteroid.shape.map(p => p.y));
        }

        // Prepare collectors used by multiple death paths
        let newAsteroids = [];
        let lootFlashPositions = [];
        let xpOrbsToAdd = [];

        // Bullet-asteroid collision
        for (let bullet of this.bullets) {
            for (let asteroid of this.asteroids) {
                if (asteroid.phased) continue;
                if (bullet.piercedAsteroids && bullet.piercedAsteroids.includes(asteroid)) continue;
                let dx = bullet.x - asteroid.x;
                let dy = bullet.y - asteroid.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < asteroid.size) {
                    asteroid.health -= bullet.damage;
                    if (player.ir.shipType == 2 || player.ir.shipType == 4) {
                        bullet.pierce--;
                        bullet.piercedAsteroids.push(asteroid);
                        if (bullet.pierce < 0) bullet.life = 0;
                    } else {
                        bullet.life = 0;
                    }
                    break;
                }
            }
        }

        // Bullet-enemy collision (player bullets only)
        for (let bullet of this.bullets) {
            if (bullet.fromEnemy) continue;
            for (let enemy of this.enemies) {
                if (!enemy.alive) continue;
                // avoid hitting same enemy multiple times per bullet
                if (bullet.piercedEnemies && bullet.piercedEnemies.includes(enemy)) continue;
                let dx = bullet.x - enemy.x;
                let dy = bullet.y - enemy.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < enemy.radius) {
                    enemy.health -= bullet.damage;

                    // Handle piercing bullets: decrement pierce and mark enemy as pierced
                    if (typeof bullet.pierce === "number" && bullet.pierce > 0) {
                        bullet.pierce--;
                        if (!bullet.piercedEnemies) bullet.piercedEnemies = [];
                        bullet.piercedEnemies.push(enemy);
                        // bullet remains alive until pierce runs out (< 0)
                        if (bullet.pierce < 0) bullet.life = 0;
                    } else {
                        // non-piercing: destroy bullet on hit
                        bullet.life = 0;
                    }

                    if (enemy.health <= 0) {
                        enemy.alive = false;
                        let type = this.enemyTypes[enemy.type];
                        // rock drop
                        if (type && type.rockDrop) {
                            let minR = type.rockDrop[0], maxR = type.rockDrop[1];
                            let amt = getRandomInt(maxR - minR + 1) + minR;
                            amt = Math.max(0, Math.floor(amt * this.upgradeEffects.lootGain));
                            amt = Math.max(0, Math.floor(amt * levelableEffect("pet", 502)[1]));
                            player.ir.spaceRock = player.ir.spaceRock.add(amt);
                            lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "rock" });
                        }
                        // xp drop -> spawn xp orb
                        if (type && type.xpDrop) {
                            let minX = type.xpDrop[0], maxX = type.xpDrop[1];
                            let xp = getRandomInt(maxX - minX + 1) + minX;
                            xp = Math.max(0, Math.floor(xp * this.upgradeEffects.xpGain));
                            xpOrbsToAdd.push({ x: enemy.x, y: enemy.y, amount: xp });
                        }

                        // guaranteed gem drop for UFO miniboss
                        if (enemy.type === "ufoBoss") {
                            this.bossActive = false;
                            player.ir.ufoDefeated = true;
                            player.ir.spaceGem = player.ir.spaceGem.add(2);
                            lootFlashPositions.push({ x: enemy.x, y: enemy.y + 12, amount: 2, type: "gem" });
                        }

                        // Mark Iridite defeat when boss dies
                        if (enemy.type === "iriditeBoss") {
                            this.bossActive = false;
                            player.ir.iriditeDefeated = true;
                            // clear active fight flag
                            player.ir.iriditeFightActive = false;
                            // persist arena state off (keeps behavior consistent with leave/remove)
                            localStorage.setItem('arenaActive', 'false');
                            // optional: you may add rewards here if desired
                        }

                        // gem chance for hard-mode enemies Delta/Epsilon/Zeta/Eta (3%)
                        if (["deltaShip", "epsilonShip", "zetaShip", "etaShip"].includes(enemy.type)) {
                            if (Math.random() < 0.03) {
                                player.ir.spaceGem = player.ir.spaceGem.add(1);
                                lootFlashPositions.push({ x: enemy.x, y: enemy.y + 12, amount: 1, type: "gem" });
                            }
                        }
                    }

                    // stop scanning further enemies only if bullet was destroyed
                    if (bullet.life <= 0) break;
                }
            }
        }
        

        // Enemy bullets hit player
        for (let bullet of this.bullets) {
            if (!bullet.fromEnemy) continue;
            let dx = bullet.x - this.ship.x;
            let dy = bullet.y - this.ship.y;
            let shipRadius = player.ir.shipType == 3 ? this.ship.radius : 12;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < shipRadius) {
            // account for projectile radius (giant bullets are larger)
            let bulletRadius = (typeof bullet.radius === "number") ? bullet.radius : (bullet.fromEnemy && bullet.homing ? 10 : 6);
            if (dist < shipRadius + bulletRadius) {
                 // ensure each enemy projectile only deals damage once
                if (!bullet._hitPlayer) {
                    bullet._hitPlayer = true;
                    let dmg = bullet.damage * this.upgradeEffects.damageReduction;
                    if (player.ir.shipType == 3) dmg /= 1.5;
                    player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
 
                    // remove the projectile immediately so it can't deal damage again
                    bullet.life = 0;
 
                    if (player.ir.shipHealth.lte(0)) {
                        this.onShipDeath();
                    }                    
                }
            }
        }
    }

        // remove dead/consumed bullets so homing projectiles vanish on hit
        this.bullets = this.bullets.filter(b => b.life > 0);

        // Ship-enemy collision
        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            let dx = this.ship.x - enemy.x;
            let dy = this.ship.y - enemy.y;
            let shipRadius = player.ir.shipType == 3 ? this.ship.radius : 12;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < enemy.radius + shipRadius) {
                let enemyDmg = this.ship.collisionDamage * this.upgradeEffects.attackDamage;
                if (Number.isNaN(enemyDmg) || !isFinite(enemyDmg) || enemyDmg < 0) enemyDmg = 0;
                if (player.ir.shipType != 3) enemy.health -= enemyDmg * 0.05;
                if (player.ir.shipType == 3) enemy.health -= enemyDmg * 2.5;

                let shipDmg = enemy.damage * this.upgradeEffects.damageReduction * 6;
                if (Number.isNaN(shipDmg) || !isFinite(shipDmg) || shipDmg < 0) shipDmg = 3 * this.upgradeEffects.damageReduction;
                if (player.ir.iriditeFightActive) shipDmg /= 12;
                if (player.ir.shipType == 3) shipDmg /= 20;
                player.ir.shipHealth = player.ir.shipHealth.sub(shipDmg);

                if (player.ir.shipType == 3) {
                    let angle = Math.atan2(dy, dx);
                    let bounceSpeed = Math.max(8, Math.abs(this.ship.vy) * this.ship.bounce);
                    if (Number.isNaN(bounceSpeed) || !isFinite(bounceSpeed) || bounceSpeed < 0) bounceSpeed = 8;
                    this.ship.vy = Math.sin(angle) * bounceSpeed;
                    this.ship.x += Math.cos(angle) * bounceSpeed;
                } else {
                    this.ship.velocity = -2;
                }

                if (Number.isNaN(enemy.health) || !isFinite(enemy.health) || enemy.health < 0) enemy.health = 0;
                if ((player.ir.shipHealth.isNaN && player.ir.shipHealth.isNaN()) || !player.ir.shipHealth.isFinite() || player.ir.shipHealth.lt(0)) player.ir.shipHealth = new Decimal(0);

                if (player.ir.shipHealth.lte(0)) {
                    this.onShipDeath();
                }
                if (enemy.health <= 0) {
                    enemy.alive = false;
                    let type = this.enemyTypes[enemy.type];
                    // rock drop
                    if (type && type.rockDrop) {
                        let minR = type.rockDrop[0], maxR = type.rockDrop[1];
                        let amt = getRandomInt(maxR - minR + 1) + minR;
                        amt = Math.max(0, Math.floor(amt * this.upgradeEffects.lootGain));
                        amt = Math.max(0, Math.floor(amt * levelableEffect("pet", 502)[1]));
                        player.ir.spaceRock = player.ir.spaceRock.add(amt);
                        lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "rock" });
                    }
                    // xp drop
                    if (type && type.xpDrop) {
                        let minX = type.xpDrop[0], maxX = type.xpDrop[1];
                        let xp = getRandomInt(maxX - minX + 1) + minX;
                        xp = Math.max(0, Math.floor(xp * this.upgradeEffects.xpGain));
                        xpOrbsToAdd.push({ x: enemy.x, y: enemy.y, amount: xp });
                    }

                    // guaranteed gem drop for UFO miniboss
                    if (enemy.type === "ufoBoss") {
                        player.ir.ufoDefeated = true;
                        player.ir.spaceGem = player.ir.spaceGem.add(2);
                        lootFlashPositions.push({ x: enemy.x, y: enemy.y + 12, amount: 2, type: "gem" });
                    }

                    // Mark Iridite defeat when boss dies (collision route)
                    if (enemy.type === "iriditeBoss") {
                        this.bossActive = false;
                        player.ir.iriditeDefeated = true;
                        player.ir.iriditeFightActive = false;
                        localStorage.setItem('arenaActive', 'false');
                    }

                    // gem chance for hard-mode enemies
                    if (["deltaShip", "epsilonShip", "zetaShip", "etaShip"].includes(enemy.type)) {
                        if (Math.random() < 0.03) {
                            player.ir.spaceGem = player.ir.spaceGem.add(1);
                            lootFlashPositions.push({ x: enemy.x, y: enemy.y + 12, amount: 1, type: "gem" });
                        }
                    }
                }
            }
        }

        // Ship-asteroid collision
        for (let asteroid of this.asteroids) {
            if (asteroid.phased) continue;
            let dx = this.ship.x - asteroid.x;
            let dy = this.ship.y - asteroid.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let shipRadius = player.ir.shipType == 3 ? this.ship.radius : 12;
            if (dist < asteroid.size + shipRadius) {
                asteroid.health -= this.ship.collisionDamage * this.upgradeEffects.attackDamage;
                let dmg = (asteroid.big ? 3 : 2) * this.upgradeEffects.damageReduction;
                if (player.ir.shipType == 3) dmg /= 6;
                player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
                if (player.ir.shipType == 3) {
                    let angle = Math.atan2(dy, dx);
                    let bounceSpeed = Math.max(8, Math.abs(this.ship.vy) * this.ship.bounce);
                    this.ship.vy = Math.sin(angle) * bounceSpeed;
                    this.ship.x += Math.cos(angle) * bounceSpeed;
                } else {
                    this.ship.velocity = -2;
                }
                if (player.ir.shipHealth.lte(0)) {
                    this.onShipDeath();
                }
            }
        }

        // Asteroid splitting and removal
        this.asteroids = this.asteroids.filter(asteroid => {
            if (asteroid.health <= 0) {
                let loot = Math.floor(Math.random() * (asteroid.big ? 4 : 3)) + (asteroid.big ? 3 : 1);
                loot = Math.floor(loot * this.upgradeEffects.lootGain);
                loot = Math.max(0, Math.floor(loot * levelableEffect("pet", 502)[1]));
                player.ir.spaceRock = player.ir.spaceRock.add(loot);
                player.ir.levelables[player.ir.shipType][1] = player.ir.levelables[player.ir.shipType][1].add(loot)
                lootFlashPositions.push({ x: asteroid.x, y: asteroid.y, amount: loot, type: "rock" });

                let xp = Math.floor((asteroid.big ? 10 : 3) * this.upgradeEffects.xpGain);
                xpOrbsToAdd.push({ x: asteroid.x, y: asteroid.y, amount: xp });

                let random = Math.random();
                if (asteroid.big) {
                    if (hasUpgrade("ir", 104))
                    {
                        if (random < 0.02) {
                        player.ir.spaceGem = player.ir.spaceGem.add(1);
                        lootFlashPositions.push({ x: asteroid.x, y: asteroid.y + 15, amount: 1, type: "gem" });
                        }
                    } else
                    {
                        if (random < 0.01) {
                        player.ir.spaceGem = player.ir.spaceGem.add(1);
                        lootFlashPositions.push({ x: asteroid.x, y: asteroid.y + 15, amount: 1, type: "gem" });
                        }
                    }
                } else {
                    if (hasUpgrade("ir", 104))
                    {
                        if (random < 0.01) {
                        player.ir.spaceGem = player.ir.spaceGem.add(1);
                        lootFlashPositions.push({ x: asteroid.x, y: asteroid.y + 15, amount: 1, type: "gem" });
                        }
                    } else
                    {
                        if (random < 0.005) {
                        player.ir.spaceGem = player.ir.spaceGem.add(1);
                        lootFlashPositions.push({ x: asteroid.x, y: asteroid.y + 15, amount: 1, type: "gem" });
                        }
                    }
                }

                if (asteroid.big) {
                    for (let i = 0; i < asteroid.splitCount; i++) {
                        newAsteroids.push(this.createSmallAsteroid(asteroid.x, asteroid.y));
                    }
                }
                return false;
            }
            return true;
        });
        this.asteroids.push(...newAsteroids);

        // Add loot flashes
        for (let pos of lootFlashPositions) {
            if (pos.type == "rock") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${pos.amount} space rock`,
                    timer: 120,
                    color: "#ffe066",
                    style: "18px monospace"
                });
            }
            if (pos.type == "gem") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${pos.amount} space gem`,
                    timer: 240,
                    color: "#66e8ffff",
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
                timer: 300
            });
        }

        // Update XP orbs (move toward ship, pick up if close)
        for (let orb of this.xpOrbs) {
            let dx = this.ship.x - orb.x;
            let dy = this.ship.y - orb.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let speed = 2;
            if (dist > 5) {
                orb.x += dx / dist * speed;
                orb.y += dy / dist * speed;
            }
            if (dist < 30 && !orb.picked) {
                player.ir.battleXP = player.ir.battleXP.add(orb.amount);
                orb.picked = true;
            }
            orb.timer--;
        }
        this.xpOrbs = this.xpOrbs.filter(orb => !orb.picked && orb.timer > 0);

        this.draw();
    }

    createSmallAsteroid(x, y) {
        let size = 20 + Math.random() * 10;
        let health = 20;
        let angle = Math.random() * Math.PI * 2;
        let speed = 2 + Math.random() * 2;
        let phaseTime = 99999999999999;
        let shape = this.generateConvexPolygon(size, 5 + Math.floor(Math.random() * 3));
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
        if (player.ir.shipType == 3) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.ship.x, this.ship.y, this.ship.radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = "#a7a7a7ff";
            this.ctx.shadowColor = "#ffffffff";
            this.ctx.shadowBlur = 16;
            this.ctx.fill();
            this.ctx.restore();
        }
        if (player.ir.shipType == 1) {
            this.ctx.save();
            this.ctx.translate(this.ship.x, this.ship.y);
            this.ctx.rotate(this.ship.angle);
            this.ctx.beginPath();
            this.ctx.moveTo(20, 0);
            this.ctx.lineTo(-15, 12);
            this.ctx.lineTo(-10, 0);
            this.ctx.lineTo(-15, -12);
            this.ctx.closePath();
            this.ctx.fillStyle = "#eaf6f7";
            this.ctx.fill();
            this.ctx.restore();
        }
        if (player.ir.shipType == 2) {
            this.ctx.save();
            this.ctx.translate(this.ship.x, this.ship.y);
            this.ctx.rotate(this.ship.angle);
            this.ctx.beginPath();
            this.ctx.moveTo(20, 0);
            this.ctx.lineTo(-20, 25);
            this.ctx.lineTo(-30, 0);
            this.ctx.lineTo(-20, -25);
            this.ctx.closePath();
            this.ctx.fillStyle = "#eaf6f7";
            this.ctx.fill();
            this.ctx.restore();
        }
        if (player.ir.shipType == 4) {
            // Sniper-style ship: long barrel and scope
            this.ctx.save();
            this.ctx.translate(this.ship.x, this.ship.y);
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
            this.ctx.restore();
        }
        if (player.ir.shipType == 5) {
            // Small UFO (player ship) — visual match to miniboss but smaller & different color
            this.ctx.save();
            this.ctx.translate(this.ship.x, this.ship.y);
            this.ctx.rotate(this.ship.angle || 0);
            const r = this.ship.radius || 12;
            const bodyR = r * 1.4;

            // Main saucer body
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, bodyR, bodyR * 0.5, 0, 0, Math.PI * 2);
            this.ctx.fillStyle = "#66d9ff"; // distinct color from miniboss
            this.ctx.shadowColor = "#66d9ff";
            this.ctx.shadowBlur = 10;
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

            this.ctx.restore();
        }
        if (player.ir.shipType == 6) {
            this.ctx.save();
            this.ctx.translate(this.ship.x, this.ship.y);
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

            this.ctx.restore();
        }
        if (player.ir.shipType == 0) {
            this.ctx.save();
            this.ctx.translate(this.ship.x, this.ship.y);
            this.ctx.rotate(this.ship.angle);
            this.ctx.beginPath();
            this.ctx.moveTo(15, 0);
            this.ctx.lineTo(-10, 10);
            this.ctx.lineTo(-10, -10);
            this.ctx.closePath();
            this.ctx.fillStyle = "#eaf6f7";
            this.ctx.fill();
            this.ctx.restore();
        }

        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            let type = this.enemyTypes[enemy.type];
            if (type && type.draw) {
                type.draw(this.ctx, enemy);
                this.ctx.save();
                this.ctx.fillStyle = "#ff4444";
                let barWidth = enemy.radius * 2 * (enemy.health / enemy.maxHealth);
                this.ctx.fillRect(enemy.x - enemy.radius, enemy.y - enemy.radius - 18, barWidth, 6);

                this.ctx.font = "14px monospace";
                this.ctx.fillStyle = "#fff";
                this.ctx.textAlign = "center";
                this.ctx.fillText(
                    Math.max(0, Math.floor(enemy.health)) + "/" + Math.floor(enemy.maxHealth),
                    enemy.x,
                    enemy.y - enemy.radius - 6
                );
                this.ctx.restore();
            }

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
                    this.ctx.translate(enemy.x, enemy.y);
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
                        this.ctx.moveTo(enemy.x, enemy.y);
                        this.ctx.lineTo(warn.tx, warn.ty);
                        this.ctx.stroke();
                        this.ctx.fillStyle = `rgba(255,50,50,${alpha})`;
                        this.ctx.beginPath();
                        this.ctx.arc(warn.tx, warn.ty, 6 * alpha + 2, 0, Math.PI * 2);
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
                        this.ctx.moveTo(ln.x1, ln.y1);
                        this.ctx.lineTo(ln.x2, ln.y2);
                        this.ctx.stroke();
                        // sharp red core
                        this.ctx.strokeStyle = `rgba(255,20,20,${0.95 * alpha})`;
                        this.ctx.lineWidth = 2;
                        this.ctx.beginPath();
                        this.ctx.moveTo(ln.x1, ln.y1);
                        this.ctx.lineTo(ln.x2, ln.y2);
                        this.ctx.stroke();
                        // little markers along the line
                        const markers = 6;
                        for (let m = 0; m < markers; m++) {
                            let t = m / (markers - 1);
                            let mx = ln.x1 + (ln.x2 - ln.x1) * t;
                            let my = ln.y1 + (ln.y2 - ln.y1) * t;
                            this.ctx.fillStyle = `rgba(255,90,90,${0.6 * alpha})`;
                            this.ctx.beginPath();
                            this.ctx.arc(mx, my, 2 + 2 * alpha, 0, Math.PI * 2);
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
        if (player.ir.shipType == 4 && this.ship.currentTarget && this.ship.currentTarget.alive) {
            let t = this.ship.currentTarget;
            this.ctx.save();
            this.ctx.strokeStyle = "#ff4444";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(t.x - 14, t.y);
            this.ctx.lineTo(t.x + 14, t.y);
            this.ctx.moveTo(t.x, t.y - 14);
            this.ctx.lineTo(t.x, t.y + 14);
            this.ctx.stroke();
            // small center dot
            this.ctx.fillStyle = "#ff6666";
            this.ctx.beginPath();
            this.ctx.arc(t.x, t.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }

        // Draw gamma trails
        if (this.gammaTrails) {
            for (let trail of this.gammaTrails) {
                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0.2, trail.timer / 60);
                this.ctx.beginPath();
                this.ctx.arc(trail.x, trail.y, trail.radius, 0, 2 * Math.PI);
                this.ctx.fillStyle = "#b44cff";
                this.ctx.fill();
                this.ctx.restore();
            }
        }

        // Draw bullets
        for (let bullet of this.bullets) {
            if (bullet.star) {
                // draw mini-star glyph for thematic boss/projectiles
                this.ctx.save();
                this.ctx.translate(bullet.x, bullet.y);
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
                this.ctx.fillStyle = bullet.fromEnemy ? "#ffeecb" : "#ffec8b";
                this.ctx.shadowColor = "#fff1";
                this.ctx.shadowBlur = bullet.giant ? 18 : 6;
                this.ctx.fillText("✦", 0, 0);
                this.ctx.restore();
            } else {
                this.ctx.beginPath();
                let r = bullet.fromEnemy ? 6 : (player.ir.shipType == 2 ? 10 : 4);
                // larger radius for homing enemy projectiles
                if (bullet.fromEnemy && bullet.homing) r = 10;
                if (bullet.giant) r = bullet.radius || 18;
                this.ctx.arc(bullet.x, bullet.y, r, 0, 2 * Math.PI);
                this.ctx.fillStyle = bullet.fromEnemy ? "#ff4444" : "#ffec8b";
                this.ctx.fill();
            }
        }

        // Draw asteroids as polygons
        for (let asteroid of this.asteroids) {
            this.ctx.save();
            this.ctx.globalAlpha = asteroid.phased ? 0.3 : 1;
            this.ctx.translate(asteroid.x, asteroid.y);
            this.ctx.beginPath();
            let shape = asteroid.shape;
            if (shape && shape.length > 0) {
                this.ctx.moveTo(shape[0].x, shape[0].y);
                for (let i = 1; i < shape.length; i++) {
                    this.ctx.lineTo(shape[i].x, shape[i].y);
                }
                this.ctx.closePath();
            }
            this.ctx.fillStyle = asteroid.big ? "#a9a9a9" : "#888";
            this.ctx.fill();

            if (!asteroid.phased) {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                this.ctx.fillStyle = "#ff4444";
                let barWidth = asteroid.size * 2 * (asteroid.health / asteroid.maxHealth);
                this.ctx.fillRect(asteroid.x - asteroid.size, asteroid.y - asteroid.size - 18, barWidth, 6);

                this.ctx.font = "14px monospace";
                this.ctx.fillStyle = "#fff";
                this.ctx.textAlign = "center";
                this.ctx.fillText(
                    Math.max(0, Math.floor(asteroid.health)) + "/" + Math.floor(asteroid.maxHealth),
                    asteroid.x,
                    asteroid.y - asteroid.size - 6
                );
            }
            this.ctx.restore();
        }

        // Draw XP orbs
        for (let orb of this.xpOrbs) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.8;
            this.ctx.beginPath();
            this.ctx.arc(orb.x, orb.y, 6, 0, 2 * Math.PI);
            this.ctx.fillStyle = "#fff";
            this.ctx.fill();
            this.ctx.restore();
        }

        // Draw loot flashes
        for (let i = this.lootFlashes.length - 1; i >= 0; i--) {
            let flash = this.lootFlashes[i];
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, flash.timer / 120);
            this.ctx.font = flash.style;
            this.ctx.fillStyle = flash.color;
            this.ctx.textAlign = "center";
            this.ctx.fillText(
                flash.text,
                flash.x,
                flash.y - 30 - (120 - flash.timer)
            );
            this.ctx.restore();
            flash.timer--;
            if (flash.timer <= 0) this.lootFlashes.splice(i, 1);
        }

        // Draw upgrade choice overlay (unchanged)
        if (this.upgradeChoiceActive) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.85;
            this.ctx.fillStyle = "#181a2b";
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.restore();

            this.ctx.save();
            this.ctx.globalAlpha = 1;
            this.ctx.font = "bold 48px monospace";
            this.ctx.fillStyle = "#fff";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Choose an Upgrade!", this.width / 2, 120);

            let spacing = 340;
            let boxWidth = 320;
            let boxHeight = 220;
            let totalWidth = spacing * (this.upgradeChoices.length - 1) + boxWidth;
            let startX = (this.width - totalWidth) / 2;
            let boxY = this.height / 2 - boxHeight / 2;

            for (let i = 0; i < this.upgradeChoices.length; i++) {
                let upg = this.upgradeChoices[i];
                let boxX = startX + i * spacing;

                this.ctx.save();
                this.ctx.globalAlpha = 1;
                this.ctx.fillStyle = "#23233b";
                this.ctx.strokeStyle = upg.color;
                this.ctx.lineWidth = 7;
                this.ctx.beginPath();
                this.ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 24);
                this.ctx.fill();
                this.ctx.stroke();

                if (this.selectedUpgradeIndex === i) {
                    this.ctx.save();
                    this.ctx.strokeStyle = "#ffe066";
                    this.ctx.lineWidth = 10;
                    this.ctx.beginPath();
                    this.ctx.roundRect(boxX + 4, boxY + 4, boxWidth - 8, boxHeight - 8, 18);
                    this.ctx.stroke();
                    this.ctx.restore();
                }

                this.ctx.font = "bold 32px monospace";
                this.ctx.fillStyle = upg.color;
                this.ctx.textAlign = "center";
                this.ctx.fillText(upg.name, boxX + boxWidth / 2, boxY + 50);

                let rarityText = upg.rarity.charAt(0).toUpperCase() + upg.rarity.slice(1);
                this.ctx.font = "italic 24px monospace";
                this.ctx.fillStyle = upg.color;
                this.ctx.fillText(rarityText, boxX + boxWidth / 2, boxY + 85);

                this.ctx.font = "22px monospace";
                this.ctx.fillStyle = "#fff";
                let desc = upg.description;
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
                    this.ctx.fillText(descLines[l], boxX + boxWidth / 2, boxY + 120 + l * 28);
                }

                this.ctx.restore();
            }

            if (this.selectedUpgradeIndex !== null) {
                let confirmWidth = 180;
                let confirmHeight = 50;
                let confirmX = this.width / 2 - confirmWidth / 2;
                let confirmY = boxY + boxHeight + 40;
                this.ctx.save();
                this.ctx.globalAlpha = 1;
                this.ctx.fillStyle = "#4e7cff";
                this.ctx.strokeStyle = "#fff";
                this.ctx.lineWidth = 4;
                this.ctx.beginPath();
                this.ctx.roundRect(confirmX, confirmY, confirmWidth, confirmHeight, 16);
                this.ctx.fill();
                this.ctx.stroke();

                this.ctx.font = "bold 28px monospace";
                this.ctx.fillStyle = "#fff";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Confirm", confirmX + confirmWidth / 2, confirmY + confirmHeight / 2 + 10);
                this.ctx.restore();
            }

            this.ctx.restore();
        }
    }

    showUpgradeChoice() {
        this.upgradeChoiceActive = true;
        this.upgradeChoices = pickUpgrades();
        this.selectedUpgradeIndex = null;
        this.pauseEvents();

        this.canvas.onclick = (e) => {
            let rect = this.canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            let spacing = 340;
            let boxWidth = 320;
            let boxHeight = 220;
            let totalWidth = spacing * (this.upgradeChoices.length - 1) + boxWidth;
            let startX = (this.width - totalWidth) / 2;
            let boxY = this.height / 2 - boxHeight / 2;

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
                let confirmWidth = 180;
                let confirmHeight = 50;
                let confirmX = this.width / 2 - confirmWidth / 2;
                let confirmY = boxY + boxHeight + 40;
                if (
                    x > confirmX &&
                    x < confirmX + confirmWidth &&
                    y > confirmY &&
                    y < confirmY + confirmHeight
                ) {
                    let upg = this.upgradeChoices[this.selectedUpgradeIndex];
                    upg.effect(this);
                    player.ir.upgrades.push(upg.name);
                    this.upgradeChoiceActive = false;
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
        player.ir.battleLevel = new Decimal(0);
        player.ir.battleXP = new Decimal(0);
        if (arena) arena.upgradeEffects = arena.getDefaultUpgradeEffects();
        player.subtabs["ir"]['stuff'] = "Lose";
        localStorage.setItem('arenaActive', 'false');
    }
}
function spawnUfoBoss() {
    if (!arena) {
        console.warn("spawnUfoBoss: no active arena instance");
        return;
    }
    if (arena.bossActive) {
        console.warn("spawnUfoBoss: boss already active");
        return;
    }

    // Remove existing regular threats so the boss fight is isolated
    for (let e of arena.enemies) {
        e.alive = false;
    }
    arena.enemies = [];

    // clear asteroids and non-enemy bullets for a clean arena
    arena.asteroids = [];
    arena.bullets = arena.bullets.filter(b => b.fromEnemy); // keep enemy bullets if you want, or set to [] to clear all

    // set boss active flag and call class method (spawnUfoBoss also sets bossActive)
    arena.bossActive = true;
    if (typeof arena.spawnUfoBoss === "function") {
        arena.spawnUfoBoss();
    } else {
        console.warn("spawnUfoBoss: arena.spawnUfoBoss is not available on the current arena instance");
    }
}
window.spawnUfoBoss = spawnUfoBoss;

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
    flashScreen("— Iridite, the Astral Celestial —", 1200)
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