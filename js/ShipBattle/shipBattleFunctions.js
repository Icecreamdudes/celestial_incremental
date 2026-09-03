function SB_registerMap(mapId, data = {}) {
    
}

// CELESTIALITES AND ASTEROIDS

function SB_spawnCelestialite(celId, properties = {}) {
    const zoneRef = SB_zones[player.ir.battleStage]
    if (!zoneRef) {
        console.warn("Cannot find zone \"" + player.ir.battleStage + "\".")
        return
    };
    const celRef = SB_celestialites[celId]
    if (!celRef) {
        console.warn("Cannot find celestialite \"" + celId + "\".")
        return
    };

    arena.enemySpawnCooldown = zoneRef.celestialiteSpawnCooldown
    let spawnAngle = Math.random() * Math.PI * 2
    let spawnDistance = 600 + Math.random() * 600
    let celestialite = {
        type: celId,
        symbol: celRef.symbol,
        color: celRef.color,
        radius: celRef.radius,
        invulnerable: false,

        maxHealth: celRef.health.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),
        health: celRef.health.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),
        regen: celRef.regen.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),
        damage: celRef.damage.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),
        bodyDamage: celRef.bodyDamage.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),

        vx: 0,
        vy: 0,
        dvx: 1,
        dvy: 1,
        ax: 0,
        ay: 0,
        dax: 0.875,
        day: 0.875,

        x: arena.ship.x + Math.cos(spawnAngle) * spawnDistance,
        y: arena.ship.y + Math.sin(spawnAngle) * spawnDistance,
    }
    let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
    let dx = closest[0] - celestialite.x;
    let dy = closest[1] - celestialite.y;
    celestialite.playerDist = Math.hypot(dx, dy) || 1;
    celestialite.playerAng = Math.atan2(dy, dx) || 0

    celRef.initialize(celestialite)
    for (const [i, v] of Object.entries(properties)) celestialite[i] = v;
    arena.enemies.push(celestialite)
}

function SB_spawnAsteroid(celId, properties = {}) {
    const zoneRef = SB_zones[player.ir.battleStage]
    if (!zoneRef) {
        console.warn("Cannot find zone \"" + player.ir.battleStage + "\".")
        return
    };
    const celRef = SB_celestialites[celId]
    if (!celRef) {
        console.warn("Cannot find celestialite \"" + celId + "\".")
        return
    };
    arena.asteroidSpawnTimer = 0
    let spawnAngle = Math.random() * Math.PI * 2
    let spawnDistance = 600 + Math.random() * 600
    let celestialite = {
        type: celId,
        symbol: celRef.symbol,
        color: celRef.color,
        radius: celRef.radius,

        maxHealth: celRef.health.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),
        health: celRef.health.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),
        regen: celRef.regen.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),
        damage: celRef.damage.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),
        bodyDamage: celRef.bodyDamage.mul(zoneRef.statMult).mul(player.ir.levelScalingMult),

        vx: 0,
        vy: 0,
        dvx: 1,
        dvy: 1,
        ax: 0,
        ay: 0,
        dax: 0.875,
        day: 0.875,

        x: arena.ship.x + (Math.cos(spawnAngle) * spawnDistance),
        y: arena.ship.y + (Math.sin(spawnAngle) * spawnDistance),
    }

    celRef.initialize(celestialite)
    for (const [i, v] of Object.entries(properties)) celestialite[i] = v;
    arena.asteroids.push(celestialite)
}

function SB_spawnNaturalCelestialite() {
    const zoneRef = SB_zones[player.ir.battleStage]
    if (!zoneRef) {
        console.warn("Cannot find zone \"" + player.ir.battleStage + "\".")
        return
    };
    if (arena.enemies.length >= zoneRef.celestialiteLimit) return;
    const celId = zoneRef.generateCelestialite(player.ir.battleLevel)
    const celRef = SB_celestialites[celId]
    if (!celRef) {
        console.warn("Cannot find celestialite \"" + celId + "\".")
        return
    };
    SB_spawnCelestialite(celId)
}

function SB_spawnNaturalAsteroid() {
    const zoneRef = SB_zones[player.ir.battleStage]
    if (!zoneRef) {
        console.warn("Cannot find zone \"" + player.ir.battleStage + "\".")
        return
    };
    if (arena.asteroids.length >= zoneRef.asteroidLimit) return;
    const celId = zoneRef.generateAsteroid(player.ir.battleLevel)
    const celRef = SB_celestialites[celId]
    if (!celRef) {
        console.warn("Cannot find celestialite \"" + celId + "\".")
        return
    };
    SB_spawnAsteroid(celId)
}

function SB_updateMovement(obj) {
    obj.ax *= obj.dax
    obj.ay *= obj.day
    obj.vx += obj.ax
    obj.vy += obj.ay
    obj.vx *= obj.dvx
    obj.vy *= obj.dvy
    obj.x += obj.vx
    obj.y += obj.vy
}

// PROJECTILES

function SB_spawnProjectile(projId, celestialite, warning, properties = {}) {
    const projRef = SB_projectiles[projId]
    if (!projRef) {
        console.warn("Cannot find projectile \"" + projId + "\".")
        return
    };

    let projectile = projRef.template(celestialite, warning)

    projectile.type = projId
    projectile.celestialite = celestialite
    projectile.warning = warning

    projRef.initialize(projectile)
    for (const [i, v] of Object.entries(properties)) projectile[i] = v;
    arena.bullets.push(projectile)
}

// WARNINGS

function SB_spawnWarning(warnId, celestialite, properties = {}) {
    const warnRef = SB_warnings[warnId]
    if (!warnRef) {
        console.warn("Cannot find warning \"" + warnId + "\".")
        return
    }; 

    let warning = {
        type: warnId,
        timer: warnRef.readyTimer + warnRef.postReadyTimer,
        ready: false,
        length: warnRef.length,
        width: warnRef.width,

        vx: 0,
        vy: 0,
        dvx: 1,
        dvy: 1,
        ax: 0,
        ay: 0,
        dax: 0.875,
        day: 0.875,
    }

    if (celestialite != null) {
        warning.celestialite = celestialite
        warning.ang = celestialite.playerAng
        warning.x = celestialite.x
        warning.y = celestialite.y
    } else {
        let spawnAngle = (Math.random() - 0.5) * Math.PI * 2
        let spawnDistance = 200 + Math.random() * 200
        warning.celestialite = null
        warning.ang = spawnAngle 
        warning.x = arena.ship.x + (Math.cos(spawnAngle) * spawnDistance)
        warning.y = arena.ship.y + (Math.sin(spawnAngle) * spawnDistance)
    }

    warnRef.initialize(warning)
    for (const [i, v] of Object.entries(properties)) warning[i] = v;
    arena.warnings.push(warning)
}

// SHIP STATS

function SB_getDefaultShipStats() {
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
        bloodStoneGain: 1,
        bloodGemGain: 1,
        xpGain: 1,
    };
    return base
}

function SB_getUpgradeMultis(upgrades) {
    let shipStats = {}

    shipStats.attackDamage = 1
    shipStats.attackDamage *= 1 + 0.05 * upgrades.attackDamageCommon
    shipStats.attackDamage *= 1 + 0.1 * upgrades.attackDamageUncommon
    shipStats.attackDamage *= 1 + 0.15 * upgrades.attackDamageRare
    shipStats.attackDamage *= 1 + 0.2 * upgrades.attackEpic
    shipStats.attackDamage *= 1 + 0.3 * upgrades.attackLegendary

    shipStats.attackSpeed = 1
    shipStats.attackSpeed *= 1 + 0.05 * upgrades.attackSpeedUncommon
    shipStats.attackSpeed *= 1 + 0.075 * upgrades.attackSpeedRare
    shipStats.attackSpeed *= 1 + 0.075 * upgrades.attackEpic
    shipStats.attackSpeed /= 1 + 0.2 * upgrades.attackLegendary

    shipStats.maxHp = 1

    shipStats.damageReduction = 1
    shipStats.damageReduction *= 1 + 0.1 * upgrades.damageReductionRare
    shipStats.damageReduction *= 1 + 0.15 * upgrades.defenseEpic
    shipStats.damageReduction *= 1 + 0.2 * upgrades.defenseLegendary

    shipStats.healthRegen = 0
    shipStats.healthRegen += upgrades.healthRegenUncommon * 0.5 / 60
    shipStats.healthRegen += upgrades.healthRegenRare * 0.75 / 60
    shipStats.healthRegen += upgrades.defenseEpic * 0.75 / 60
    shipStats.healthRegen *= 1 + 0.2 * upgrades.defenseLegendary
    shipStats.healthRegen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()

    shipStats.moveSpeed = 1
    shipStats.moveSpeed *= 1 + 0.1 * upgrades.moveSpeedRare
    shipStats.moveSpeed *= 1 + 0.25 * upgrades.moveSpeedLegendary

    shipStats.bulletSize = 1
    if (player.ir.shipType == 3 || player.ir.shipType == 7 || player.ir.shipType == 8) {
        shipStats.maxHp *= 1 + 0.1 * upgrades.bulletSizeRare
    } else {
        shipStats.bulletSize *= 1 + 0.1 * upgrades.bulletSizeRare
    }

    shipStats.xpGain = 1
    shipStats.xpGain *= 1 + 0.05 * upgrades.xpGainCommon
    shipStats.xpGain *= 1 + 0.1 * upgrades.xpGainUncommon
    shipStats.xpGain *= 1 + 0.15 * upgrades.xpGainRare
    shipStats.xpGain *= 1 + 0.2 * upgrades.xpGainEpic
    shipStats.xpGain *= 1 + 0.2 * upgrades.dropGainLegendary
    
    shipStats.spaceRockGain = 1
    shipStats.spaceRockGain *= 1 + 0.05 * upgrades.spaceRockGainCommon
    shipStats.spaceRockGain *= 1 + 0.1 * upgrades.spaceRockGainUncommon
    shipStats.spaceRockGain *= 1 + 0.15 * upgrades.spaceRockGainRare
    shipStats.spaceRockGain *= 1 + 0.2 * upgrades.lootGainEpic
    shipStats.spaceRockGain *= 1 + 0.2 * upgrades.dropGainLegendary
    
    shipStats.spaceJunkGain = 1
    shipStats.spaceJunkGain *= 1 + 0.05 * upgrades.spaceJunkGainCommon
    shipStats.spaceJunkGain *= 1 + 0.1 * upgrades.spaceJunkGainUncommon
    shipStats.spaceJunkGain *= 1 + 0.15 * upgrades.spaceJunkGainRare
    shipStats.spaceJunkGain *= 1 + 0.2 * upgrades.spaceJunkGainEpic
    shipStats.spaceJunkGain *= 1 + 0.25 * upgrades.spaceJunkGainLegendary
    
    shipStats.spaceGemGain = 1
    shipStats.spaceGemGain *= 1 + 0.05 * upgrades.spaceGemGainRare
    shipStats.spaceGemGain *= 1 + 0.05 * upgrades.lootGainEpic
    shipStats.spaceGemGain *= 1 + 0.2 * upgrades.dropGainLegendary

    shipStats.bloodStoneGain = 1
    shipStats.bloodStoneGain *= 1 + 0.05 * upgrades.bloodStoneGainCommon
    shipStats.bloodStoneGain *= 1 + 0.1 * upgrades.bloodStoneGainUncommon
    shipStats.bloodStoneGain *= 1 + 0.15 * upgrades.bloodStoneGainRare
    shipStats.bloodStoneGain *= 1 + 0.2 * upgrades.bloodLootGainEpic
    shipStats.bloodStoneGain *= 1 + 0.2 * upgrades.bloodLootGainLegendary
    
    shipStats.bloodGemGain = 1
    shipStats.bloodGemGain *= 1 + 0.05 * upgrades.bloodGemGainRare
    shipStats.bloodGemGain *= 1 + 0.05 * upgrades.bloodLootGainEpic
    shipStats.bloodGemGain *= 1 + 0.2 * upgrades.bloodLootGainLegendary

    return shipStats
}

function SB_getUpgradedShipStats(upgrades) {
    let shipStats = SB_getDefaultShipStats()
    shipStats.attackDamage = SB_ships[SB_shipNames[player.ir.shipBattleSaveCurrent.shipType]].baseStats.attackDamage
    shipStats.attackDamage *= 1 + 0.05 * (upgrades.attackDamageCommon || 0)
    shipStats.attackDamage *= 1 + 0.1 * (upgrades.attackDamageUncommon || 0)
    shipStats.attackDamage *= 1 + 0.15 * (upgrades.attackDamageRare || 0)
    shipStats.attackDamage *= 1 + 0.15 * (upgrades.attackEpic || 0)
    shipStats.attackDamage *= 1 + 0.3 * (upgrades.attackLegendary || 0)
    shipStats.attackDamage *= levelableEffect("ir", player.ir.shipType)[2].toNumber()
    if (hasMilestone("spaceZone1", 12)) shipStats.attackDamage *= 1.25;
    if (hasMilestone("spaceZone1", 14)) shipStats.attackDamage *= 1.15;
    if (hasUpgrade("ir", 22)) shipStats.attackDamage *= upgradeEffect("ir", 22).toNumber();
    if (hasUpgrade("ir", 108)) shipStats.attackDamage *= 1.15;
    if ((player.pet && player.pet.legPetTimers && player.pet.legPetTimers[1] && player.pet.legPetTimers[1].current && typeof player.pet.legPetTimers[1].current.gt === "function" && player.pet.legPetTimers[1].current.gt(0))) shipStats.attackDamage = shipStats.attackDamage.mul(1.5);
    shipStats.attackSpeed = 1
    shipStats.attackSpeed *= 1 + 0.05 * (upgrades.attackSpeedUncommon || 0)
    shipStats.attackSpeed *= 1 + 0.075 * (upgrades.attackSpeedRare || 0)
    shipStats.attackSpeed *= 1 + 0.075 * (upgrades.attackEpic || 0)
    shipStats.attackSpeed /= 1 + 0.2 * (upgrades.attackLegendary || 0)
    shipStats.maxHp = player.ir.shipHealthMax.toNumber()
    
    shipStats.healthRegen = 0
    if (hasUpgrade("ir", 14)) shipStats.healthRegen += 0.5 / 60;
    if (hasMilestone("spaceZone3", 12)) shipStats.healthRegen *= 2;
    shipStats.healthRegen += (upgrades.healthRegenUncommon * 0.5 / 60 || 0)
    shipStats.healthRegen += (upgrades.healthRegenRare * 0.75 / 60 || 0)
    shipStats.healthRegen += (upgrades.defenseEpic * 0.75 / 60 || 0)
    shipStats.healthRegen *= 1 + 0.2 * (upgrades.defenseLegendary || 0)
    shipStats.healthRegen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
    shipStats.bulletSize = 1
    if (player.ir.shipType == 3 || player.ir.shipType == 7 || player.ir.shipType == 8) {
        shipStats.maxHp *= 1 + 0.1 * (upgrades.bulletSizeRare || 0)
    } else {
        shipStats.bulletSize *= 1 + 0.1 * (upgrades.bulletSizeRare || 0)
    }
    shipStats.damageReduction = 1
    shipStats.damageReduction *= 1 + 0.1 * (upgrades.damageReductionRare || 0)
    shipStats.damageReduction *= 1 + 0.15 * (upgrades.defenseEpic || 0)
    shipStats.damageReduction *= 1 + 0.2 * (upgrades.defenseLegendary || 0)
    shipStats.moveSpeed = 1
    shipStats.moveSpeed *= 1 + 0.1 * (upgrades.moveSpeedRare || 0)
    shipStats.moveSpeed *= 1 + 0.25 * (upgrades.moveSpeedLegendary || 0)
    
    shipStats.spaceRockGain = player.ir.spaceRockMult.toNumber()
    shipStats.spaceRockGain *= 1 + 0.05 * (upgrades.spaceRockGainCommon || 0)
    shipStats.spaceRockGain *= 1 + 0.1 * (upgrades.spaceRockGainUncommon || 0)
    shipStats.spaceRockGain *= 1 + 0.15 * (upgrades.spaceRockGainRare || 0)
    shipStats.spaceRockGain *= 1 + 0.2 * (upgrades.lootGainEpic || 0)
    shipStats.spaceRockGain *= 1 + 0.2 * (upgrades.dropGainLegendary || 0)
    if (player.bl.noxDefeated) shipStats.spaceRockGain *= 1 + player.ir.battleLevel.toNumber() * 0.02
    
    shipStats.spaceGemGain = player.ir.spaceGemMult.toNumber()
    shipStats.spaceGemGain *= 1 + 0.05 * (upgrades.spaceGemGainRare || 0)
    shipStats.spaceGemGain *= 1 + 0.05 * (upgrades.lootGainEpic || 0)
    shipStats.spaceGemGain *= 1 + 0.2 * (upgrades.dropGainLegendary || 0)
    if (player.bl.noxDefeated) shipStats.spaceGemGain *= 1 + player.ir.battleLevel.toNumber() * 0.02
    
    shipStats.spaceJunkGain = player.ir.spaceJunkMult.toNumber()
    shipStats.spaceJunkGain *= 1 + 0.05 * (upgrades.spaceJunkGainCommon || 0)
    shipStats.spaceJunkGain *= 1 + 0.1 * (upgrades.spaceJunkGainUncommon || 0)
    shipStats.spaceJunkGain *= 1 + 0.15 * (upgrades.spaceJunkGainRare || 0)
    shipStats.spaceJunkGain *= 1 + 0.2 * (upgrades.spaceJunkGainEpic || 0)
    shipStats.spaceJunkGain *= 1 + 0.25 * (upgrades.spaceJunkGainLegendary || 0)
    if (player.bl.noxDefeated) shipStats.spaceJunkGain *= 1 + player.ir.battleLevel.toNumber() * 0.02

    shipStats.bloodStoneGain = player.bl.bloodStonesMult.toNumber()
    shipStats.bloodStoneGain *= 1 + 0.05 * (upgrades.bloodStoneGainCommon || 0)
    shipStats.bloodStoneGain *= 1 + 0.1 * (upgrades.bloodStoneGainUncommon || 0)
    shipStats.bloodStoneGain *= 1 + 0.15 * (upgrades.bloodStoneGainRare || 0)
    shipStats.bloodStoneGain *= 1 + 0.2 * (upgrades.bloodLootGainEpic || 0)
    shipStats.bloodStoneGain *= 1 + 0.2 * (upgrades.bloodLootGainLegendary || 0)
    if (player.bl.noxDefeated) shipStats.bloodStoneGain *= 1 + player.ir.battleLevel.toNumber() * 0.02
    
    shipStats.bloodGemGain = player.bl.bloodGemsMult.toNumber()
    shipStats.bloodGemGain *= 1 + 0.05 * (upgrades.bloodGemGainRare || 0)
    shipStats.bloodGemGain *= 1 + 0.05 * (upgrades.bloodLootGainEpic || 0)
    shipStats.bloodGemGain *= 1 + 0.2 * (upgrades.bloodLootGainLegendary || 0)
    if (player.bl.noxDefeated) shipStats.bloodGemGain *= 1 + player.ir.battleLevel.toNumber() * 0.02
    
    shipStats.xpGain = 1
    shipStats.xpGain *= 1 + 0.05 * (upgrades.xpGainCommon || 0)
    shipStats.xpGain *= 1 + 0.1 * (upgrades.xpGainUncommon || 0)
    shipStats.xpGain *= 1 + 0.15 * (upgrades.xpGainRare || 0)
    shipStats.xpGain *= 1 + 0.2 * (upgrades.xpGainEpic || 0)
    shipStats.xpGain *= 1 + 0.2 * (upgrades.dropGainLegendary || 0)
    if (player.bl.noxDefeated) shipStats.xpGain *= 1 + player.ir.battleLevel.toNumber() * 0.02
    return shipStats
}

// RUN SAVING / EXITING

function SB_saveRun() {
    if (!arena) return;
    player.ir.savedRun = true
    player.ir.shipBattleSaveCurrent.slot = -2
    player.ir.shipBattleSaveCurrent.upgrades = arena.upgrades
    player.ir.shipBattleSaveCurrent.perZoneUpgrades[player.ir.battleStage] = arena.perZoneUpgrades
    player.ir.shipBattleSaveCurrent.upgradeMultis = SB_getUpgradeMultis(arena.upgrades)
    player.ir.shipBattleSaveCurrent.upgradeCount = arena.upgradeCount
    player.ir.shipBattleSaveCurrent.upgradeScore = arena.upgradeScore

    let level = player.ir.battleLevel.toNumber() - 21
    if (!player.ir.shipBattleSaveCurrent.perZoneHighestLevels[player.ir.battleStage][level]) {
        player.ir.shipBattleSaveCurrent.perZoneHighestLevels[player.ir.battleStage][level] = true
    }
}

function SB_exitRun() {
    player.ir.inBattle = false
    options.fullscreen = false
    player.ir.savedRun = false

    player.ir.timers[player.ir.shipType].current = player.ir.timers[player.ir.shipType].max
    if (player.ir.shipBattleSaveCurrent.slot > -1) player.ir.saveTimers[player.ir.shipBattleSaveCurrent.slot].current = player.ir.saveTimers[player.ir.shipBattleSaveCurrent.slot].max
    player.ir.battleXP = new Decimal(0)
    player.ir.battleLevel = new Decimal(1)

    if (player.tab == "ir") {
        player.subtabs["ir"]['stuff'] = 'stages'
        pauseUniverseAll(["A2", "SB"], "unpause", true)
    }
    if (player.tab == "bl") {
        player.subtabs["bl"]['stuff'] = 'stages'
    }
    if (player.tab == "cbs") {
        player.subtabs["cbs"]['stuff'] = 'Ritual'
        pauseUniverseAll(["A2", "SB", "DS"], "unpause", true)
    }

    if (arena) {
        arena.removeArena();
        arena = null;
    }
    localStorage.setItem('arenaActive', 'false');
}

function SB_enterRun(zoneId, data = {}) {
    player.ir.inBattle = true
    options.fullscreen = true
    player.ir.battleStage = zoneId

    player.ir.shipHealth = player.ir.shipHealthMax
    player.ir.battleLevel = player[player.ir.battleStage] && player[player.ir.battleStage].selectedStageStart ? player[player.ir.battleStage].selectedStageStart.add(1) : new Decimal(1)

    if (player.tab == "ir") {
        player.subtabs["ir"]['stuff'] = 'Battle'
        pauseUniverseAll(["A2", "SB"], "pause", true)
    }
    if (player.tab == "bl") {
        player.subtabs["bl"]['stuff'] = 'Battle'
    }
    if (player.tab == "cbs") {
        player.subtabs["cbs"]['stuff'] = 'Battle'
        pauseUniverseAll(["A2", "SB", "DS"], "pause", true)
    }
    
    player.ir.primaryColor = SB_zones[zoneId].primaryColor
    player.ir.secondaryColor = SB_zones[zoneId].secondaryColor

    arena = new SpaceArena(800, 800, 3200, 3200);
    arena.spawnArena();
    for (const [i, v] of Object.entries(player.ir.shipBattleSaveCurrent.upgrades)) {
        arena.upgrades[i] = v
    }
    if (player.ir.battleLevel.gt(1)) arena.showUpgradeChoice();
    arena.upgradeCount = player.ir.shipBattleSaveCurrent.upgradeCount
    arena.upgradeScore = player.ir.shipBattleSaveCurrent.upgradeScore
    localStorage.setItem('arenaActive', 'true');
}
