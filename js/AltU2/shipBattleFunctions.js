function SB_spawnCelestialite() {
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

    arena.enemySpawnCooldown = zoneRef.celestialiteSpawnCooldown
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

        x: arena.ship.x + Math.cos(spawnAngle) * spawnDistance,
        y: arena.ship.y + Math.sin(spawnAngle) * spawnDistance,
    }
    let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
    let dx = closest[0] - celestialite.x;
    let dy = closest[1] - celestialite.y;
    celestialite.playerDist = Math.hypot(dx, dy) || 1;
    celestialite.playerAng = Math.atan2(dy, dx) || 0

    celRef.initialize(celestialite)
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
    for (const [i, v] of Object.entries(properties)) celestialite[i] = v;
    celRef.initialize(celestialite)
    arena.asteroids.push(celestialite)
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
