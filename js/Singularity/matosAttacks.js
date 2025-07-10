//bulletHell(700, 500, 12, 500, 275)
window.ultimateAttackProjectiles = { bullets: [], knives: [] };
window.ultimateAttackPlayerPos = null;
function bulletHell(width, height, duration, centerX = window.innerWidth / 2, centerY = window.innerHeight / 2) {
    // Store state in window so it persists across reloads
    if (!window.__bh_state) window.__bh_state = {};
    const bhState = window.__bh_state;

    // Save arguments and start time for reload-resume
    bhState.width = width;
    bhState.height = height;
    bhState.duration = duration;
    bhState.centerX = centerX;
    bhState.centerY = centerY;
    bhState.startTime = Date.now();

    // If already active, clear previous overlay and timer
    if (bhState.active) {
        if (bhState.overlay && bhState.overlay.parentNode) bhState.overlay.remove();
        if (bhState.timer) clearTimeout(bhState.timer);
        window.removeEventListener("keydown", bhState.keydownHandler);
        window.removeEventListener("keyup", bhState.keyupHandler);
    }

    player.subtabs["ma"]["stuff"] = "Bullet Hell";
    bhState.active = true;

    // Create a fullscreen overlay
    const overlay = document.createElement("div");
    overlay.id = "bh-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "99999";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    // Create the minigame canvas
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = "#111";
    canvas.style.border = "2px solid #333";
    canvas.style.borderRadius = "16px";
    canvas.style.boxShadow = "0 0 32px #000";
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);

    let ctx = canvas.getContext('2d');
    let x = width / 2, y = height / 2;
    const r = 18;
    const speed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function animate() {
        let dx = 0, dy = 0;
        if (keys.up) dy -= speed;
        if (keys.down) dy += speed;
        if (keys.left) dx -= speed;
        if (keys.right) dx += speed;
        x += dx;
        y += dy;
        x = Math.max(r, Math.min(canvas.width - r, x));
        y = Math.max(r, Math.min(canvas.height - r, y));

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#e22";
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(r, 0);
        ctx.lineTo(0, r);
        ctx.lineTo(-r, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(animate);
    }
    animate();

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    // Save handlers and overlay for cleanup on reload
    bhState.overlay = overlay;
    bhState.keydownHandler = keydownHandler;
    bhState.keyupHandler = keyupHandler;

    // End the minigame after duration
    bhState.timer = setTimeout(() => {
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
        player.subtabs["ma"]["stuff"] = "Fight";
        bhState.active = false;
    }, duration * 1000);
}

// --- AUTO-RESUME ON RELOAD ---
if (window.__bh_state && window.__bh_state.active) {
    const bhState = window.__bh_state;
    // Calculate remaining time
    const elapsed = (Date.now() - (bhState.startTime || Date.now())) / 1000;
    const remaining = Math.max(0.1, (bhState.duration || 12) - elapsed);
    if (remaining > 0.1) {
        bulletHell(
            bhState.width || 700,
            bhState.height || 500,
            remaining,
            bhState.centerX || window.innerWidth / 2,
            bhState.centerY || window.innerHeight / 2
        );
    } else {
        // If time is up, clean up state
        bhState.active = false;
    }
}
// --- AUTO-RESUME ON RELOAD ---
setTimeout(() => {
    if (window.__bh_state && window.__bh_state.active) {
        const bhState = window.__bh_state;
        // Calculate remaining time
        const elapsed = (Date.now() - (bhState.startTime || Date.now())) / 1000;
        const remaining = Math.max(0.1, (bhState.duration || 12) - elapsed);
        if (remaining > 0.1) {
            bulletHell(
                bhState.width || 700,
                bhState.height || 500,
                remaining,
                bhState.centerX || window.innerWidth / 2,
                bhState.centerY || window.innerHeight / 2
            );
        } else {
            bhState.active = false;
        }
    }
}, 100);


function whiteDiamondAttack(duration, width, height, diamondCount) {
    // Reset immortality frames on start
    window.lastDamageTime = 0;
    let running = true; // Prevent multiple animation loops

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the boss (always full screen)
    const bossCanvas = document.createElement("canvas");
    bossCanvas.width = window.innerWidth;
    bossCanvas.height = window.innerHeight;
    bossCanvas.style.position = "fixed";
    bossCanvas.style.left = "0";
    bossCanvas.style.top = "0";
    bossCanvas.style.pointerEvents = "none";
    bossCanvas.style.zIndex = "100002";
    overlay.appendChild(bossCanvas);

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);

    let ctx = gameCanvas.getContext('2d');
    let bossCtx = bossCanvas.getContext('2d');

    // Red diamond (player)
    let px = width / 2, py = height / 2;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    // Black box position in global coordinates
    const boxLeft = (window.innerWidth - width) / 2;
    const boxTop = (window.innerHeight - height) / 2;

    // White diamonds (bosses) - each with their own orbit and shoot timer
    const br = 40;
    let bAngle = Math.PI / 2; // 90 degrees (tilted)
    let diamonds = [];
    for (let i = 0; i < diamondCount; i++) {
        let angleOffset = (2 * Math.PI * i) / diamondCount;
        diamonds.push({
            orbitRadius: 200,
            orbitAngle: angleOffset,
            orbitSpeed: 0.015 + 0.003 * i, // slightly different speeds
            bx: boxLeft + px + 200 * Math.cos(angleOffset),
            by: boxTop + py + 200 * Math.sin(angleOffset),
            color: "#fff",
            shootInterval: 500 + Math.floor(Math.random() * 600) + i * 150, // each diamond has a different interval
            lastShotTime: 0
        });
    }

    // Bullets
    let bullets = [];

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function shootAtPlayer(bx, by) {
        // Calculate direction from boss to player (relative to the box)
        const playerGlobalX = boxLeft + px;
        const playerGlobalY = boxTop + py;
        const dx = playerGlobalX - bx;
        const dy = playerGlobalY - by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return;
        const speed = 5;
        bullets.push({
            x: bx,
            y: by,
            vx: (dx / dist) * speed,
            vy: (dy / dist) * speed,
            r: 10
        });
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    function animate(ts) {
        if (!running) return;

        // End early if all characters are dead
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            // Do NOT return to Fight tab here!
            return;
        }

        // Move player (inside the box)
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        // Update each diamond's orbit and position, and handle shooting
        for (let d of diamonds) {
            d.orbitAngle += d.orbitSpeed;
            const playerGlobalX = boxLeft + px;
            const playerGlobalY = boxTop + py;
            const targetBx = playerGlobalX + d.orbitRadius * Math.cos(d.orbitAngle);
            const targetBy = playerGlobalY + d.orbitRadius * Math.sin(d.orbitAngle);
            // Smoothly move boss towards target position (lerp)
            const lerpFactor = 0.05;
            d.bx += (targetBx - d.bx) * lerpFactor;
            d.by += (targetBy - d.by) * lerpFactor;

            // Each diamond shoots at its own interval
            if (!d.lastShotTime) d.lastShotTime = ts;
            if (ts - d.lastShotTime > d.shootInterval) {
                shootAtPlayer(d.bx, d.by);
                d.lastShotTime = ts;
            }
        }

        // Move bullets
        for (let b of bullets) {
            b.x += b.vx;
            b.y += b.vy;
        }
        // Remove bullets that go off screen
        bullets = bullets.filter(b =>
            b.x > -20 && b.x < window.innerWidth + 20 &&
            b.y > -20 && b.y < window.innerHeight + 20
        );

        // Draw diamonds (white) on bossCanvas (full screen, always visible)
        bossCtx.clearRect(0, 0, bossCanvas.width, bossCanvas.height);
        for (let d of diamonds) {
            bossCtx.save();
            bossCtx.translate(d.bx, d.by);
            bossCtx.rotate(bAngle); // 90deg
            bossCtx.beginPath();
            bossCtx.moveTo(0, -br);
            bossCtx.lineTo(br, 0);
            bossCtx.lineTo(0, br);
            bossCtx.lineTo(-br, 0);
            bossCtx.closePath();
            bossCtx.fillStyle = d.color;
            bossCtx.shadowColor = d.color;
            bossCtx.shadowBlur = 16;
            bossCtx.fill();
            bossCtx.restore();
        }

        // Draw bullets (white circles) on bossCanvas
        bossCtx.save();
        bossCtx.shadowColor = "#fff";
        bossCtx.shadowBlur = 8;
        for (let b of bullets) {
            bossCtx.beginPath();
            bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
            bossCtx.fillStyle = "#fff";
            bossCtx.fill();
        }
        bossCtx.restore();

        // Only call takeDamage once per frame if hit
        let playerHit = false;

        // Check collision between player and each diamond
        for (let d of diamonds) {
            const dx = (boxLeft + px) - d.bx;
            const dy = (boxTop + py) - d.by;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= (pr + br)) {
                playerHit = true;
                break; // Only need one hit
            }
        }

        // Check collision between player and each bullet
        if (!playerHit) { // Only check bullets if not already hit by diamond
            for (let b of bullets) {
                const dx = (boxLeft + px) - b.x;
                const dy = (boxTop + py) - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= (pr + b.r)) {
                    playerHit = true;
                    break;
                }
            }
        }

        if (playerHit) {
            takeDamage();
        }

        // Draw player (red diamond) in the box
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    // End after duration
    setTimeout(() => {
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
        running = false; // Stop the animation loop
        // Only return to Fight tab if you are still in depth 
        if (
            player &&
            player.subtabs &&
            player.subtabs["ma"] &&
            player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
            player.ma &&
            player.ma.currentDepth != 0
        ) {
            player.subtabs["ma"]["stuff"] = "Fight";
        } else
        {
            player.ma.inBlackHeart = false
            toggleOpt('menuShown')

            player.subtabs["ma"]["stuff"] = "Black Heart"

        }
    }, duration * 1000);
}


function bulletRainAttack(duration, width, height, bulletCountPerSecond) {
    window.lastDamageTime = 0;
    let running = true;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);

    let ctx = gameCanvas.getContext('2d');

    // Red diamond (player)
    let px = width / 2, py = height / 2;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    // Bullets
    let bullets = [];
    const bulletRadius = 12;
    const bulletSpeed = 4;
    let lastBulletTime = 0;

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }

        // Move player (inside the box)
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        // Spawn bullets from the top
        if (!lastBulletTime) lastBulletTime = ts;
        const bulletsToSpawn = Math.floor(((ts - lastBulletTime) / 1000) * bulletCountPerSecond);
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = Math.random() * width;
            let by = -bulletRadius;
            bullets.push({ x: bx, y: by, vy: bulletSpeed, r: bulletRadius });
        }
        if (bulletsToSpawn > 0) lastBulletTime = ts;

        // Move bullets
        for (let b of bullets) {
            b.y += b.vy;
        }
        // Remove bullets that go off the bottom
        bullets = bullets.filter(b => b.y < height + bulletRadius);

        // Check collision between player and each bullet
        let playerHit = false;
        for (let b of bullets) {
            const dx = px - b.x;
            const dy = py - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= (pr + b.r)) {
                playerHit = true;
                break;
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // Draw bullets
        ctx.save();
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        for (let b of bullets) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
            ctx.fillStyle = "#fff";
            ctx.fill();
        }
        ctx.restore();
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    // End after duration
    setTimeout(() => {
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
        running = false;
        if (
            player &&
            player.subtabs &&
            player.subtabs["ma"] &&
            player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
            player.ma &&
            player.ma.currentDepth != 0
        ) {
            player.subtabs["ma"]["stuff"] = "Fight";
        } else {
            player.ma.inBlackHeart = false;
            toggleOpt('menuShown');
            player.subtabs["ma"]["stuff"] = "Black Heart";
        }
    }, duration * 1000);
}

// --- Moving Circle Radial Burst Attack ---
function movingCircleRadialBurstAttack(duration, width, height, burstInterval = 1200, bulletsPerBurst = 18, moveSpeed = 5, bulletSpeed = 5) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    let ctx = gameCanvas.getContext('2d');

    // Red diamond (player)
    let px = width / 2, py = height / 2;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    // Moving circle (boss)
    let cx = Math.random() * (width - 120) + 60;
    let cy = Math.random() * (height - 120) + 60;
    let cr = 40;
    let cvx = (Math.random() - 0.5) * moveSpeed * 2;
    let cvy = (Math.random() - 0.5) * moveSpeed * 2;

    // Bullets
    let bullets = [];
    let lastBurstTime = 0;

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    function fireRadialBurst() {
        for (let i = 0; i < bulletsPerBurst; i++) {
            const angle = (2 * Math.PI * i) / bulletsPerBurst;
            bullets.push({
                x: cx,
                y: cy,
                vx: Math.cos(angle) * bulletSpeed,
                vy: Math.sin(angle) * bulletSpeed,
                r: 12
            });
        }
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }
        let now = Date.now();
        // Move player
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        // Move boss
        cx += cvx;
        cy += cvy;
        // Bounce off walls
        if (cx < cr) { cx = cr; cvx *= -1; }
        if (cx > width - cr) { cx = width - cr; cvx *= -1; }
        if (cy < cr) { cy = cr; cvy *= -1; }
        if (cy > height - cr) { cy = height - cr; cvy *= -1; }

        // Fire radial burst
        if (!lastBurstTime) lastBurstTime = now;
        if (now - lastBurstTime > burstInterval) {
            fireRadialBurst();
            lastBurstTime = now;
        }

        // Move bullets
        for (let b of bullets) {
            b.x += b.vx;
            b.y += b.vy;
        }
        // Remove bullets that go off screen
        bullets = bullets.filter(b =>
            b.x > -20 && b.x < width + 20 &&
            b.y > -20 && b.y < height + 20
        );

        // Check collision between player and each bullet
        let playerHit = false;
        for (let b of bullets) {
            const dx = px - b.x;
            const dy = py - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= (pr + b.r)) {
                playerHit = true;
                break;
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // Draw bullets
        ctx.save();
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        for (let b of bullets) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
            ctx.fillStyle = "#fff";
            ctx.fill();
        }
        ctx.restore();
        // Draw boss (circle)
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, 2 * Math.PI);
        ctx.fillStyle = "#eee";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        if (now < endTime) {
            requestAnimationFrame(animate);
        } else {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            if (
                player &&
                player.subtabs &&
                player.subtabs["ma"] &&
                player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
                player.ma &&
                player.ma.currentDepth != 0
            ) {
                player.subtabs["ma"]["stuff"] = "Fight";
            } else {
                player.ma.inBlackHeart = false;
                toggleOpt('menuShown');
                player.subtabs["ma"]["stuff"] = "Black Heart";
            }
        }
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
}
// --- Bouncing Diamonds Attack ---
function bouncingDiamondsAttack(duration, width, height, diamondCount, diamondSpeed) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    let ctx = gameCanvas.getContext('2d');

    // Red diamond (player)
    let px = width / 2, py = height / 2;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    // Bouncing diamonds
    const br = 25;
    let diamonds = [];
    for (let i = 0; i < diamondCount; i++) {
        // Random position, not too close to player
        let angle = Math.random() * 2 * Math.PI;
        let dist = Math.random() * (width / 2 - br - pr) + br + pr + 10;
        let bx = width / 2 + Math.cos(angle) * dist;
        let by = height / 2 + Math.sin(angle) * dist;
        // Random velocity
        let theta = Math.random() * 2 * Math.PI;
        let vx = Math.cos(theta) * diamondSpeed;
        let vy = Math.sin(theta) * diamondSpeed;
        diamonds.push({ x: bx, y: by, vx, vy });
    }

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }
        // Move player
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        // Move diamonds and bounce off walls
        for (let d of diamonds) {
            d.x += d.vx;
            d.y += d.vy;
            if (d.x < br) { d.x = br; d.vx *= -1; }
            if (d.x > width - br) { d.x = width - br; d.vx *= -1; }
            if (d.y < br) { d.y = br; d.vy *= -1; }
            if (d.y > height - br) { d.y = height - br; d.vy *= -1; }
        }

        // Check collision between player and each diamond
        let playerHit = false;
        for (let d of diamonds) {
            const dx = px - d.x;
            const dy = py - d.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= (pr + br)) {
                playerHit = true;
                break;
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // Draw diamonds (white)
        for (let d of diamonds) {
            ctx.save();
            ctx.translate(d.x, d.y);
            ctx.rotate(Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(0, -br);
            ctx.lineTo(br, 0);
            ctx.lineTo(0, br);
            ctx.lineTo(-br, 0);
            ctx.closePath();
            ctx.fillStyle = "#fff";
            ctx.shadowColor = "#fff";
            ctx.shadowBlur = 16;
            ctx.fill();
            ctx.restore();
        }
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        if (Date.now() < endTime) {
            requestAnimationFrame(animate);
        } else {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            if (
                player &&
                player.subtabs &&
                player.subtabs["ma"] &&
                player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
                player.ma &&
                player.ma.currentDepth != 0
            ) {
                player.subtabs["ma"]["stuff"] = "Fight";
            } else {
                player.ma.inBlackHeart = false;
                toggleOpt('menuShown');
                player.subtabs["ma"]["stuff"] = "Black Heart";
            }
        }
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
}
// --- Combined Knife Throw + Bullet Rain Attack ---
function knifeRainAttack(duration = 15, width = 700, height = 500, knifeRate = 1.2, bulletRate = 6) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    let ctx = gameCanvas.getContext('2d');

    // Red diamond (player)
    let px = width / 2, py = height / 2;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    // Knives
    let knives = [];
    const knifeLength = 64, knifeWidth = 16, knifeSpeed = 6;
    let lastKnifeTime = 0;

    // Bullets
    let bullets = [];
    const bulletRadius = 12;
    const bulletSpeed = 4;
    let lastBulletTime = 0;

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    function spawnKnife() {
        // Pick a random edge and a random point on that edge
        const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let x, y, angle;
        if (edge === 0) { // top
            x = Math.random() * width;
            y = -knifeLength;
            angle = Math.random() * Math.PI + Math.PI / 2;
        } else if (edge === 1) { // right
            x = width + knifeLength;
            y = Math.random() * height;
            angle = Math.random() * Math.PI + Math.PI;
        } else if (edge === 2) { // bottom
            x = Math.random() * width;
            y = height + knifeLength;
            angle = Math.random() * Math.PI - Math.PI / 2;
        } else { // left
            x = -knifeLength;
            y = Math.random() * height;
            angle = Math.random() * Math.PI;
        }
        // Optionally, bias angle toward player
        if (Math.random() < 0.7) {
            const dx = px - x, dy = py - y;
            angle = Math.atan2(dy, dx);
        }
        knives.push({ x, y, angle, x0: x, y0: y });
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }
        // End after duration
        let now = Date.now();
        if (now >= endTime) {
            running = false;
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            if (
                player &&
                player.subtabs &&
                player.subtabs["ma"] &&
                player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
                player.ma &&
                player.ma.currentDepth != 0
            ) {
                player.subtabs["ma"]["stuff"] = "Fight";
            } else {
                player.ma.inBlackHeart = false;
                toggleOpt('menuShown');
                player.subtabs["ma"]["stuff"] = "Black Heart";
            }
            return;
        }
        // Player movement
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        // Spawn knives
        if (!lastKnifeTime) lastKnifeTime = ts;
        const knivesToSpawn = Math.floor(((ts - lastKnifeTime) / 1000) * knifeRate);
        for (let i = 0; i < knivesToSpawn; i++) {
            spawnKnife();
        }
        if (knivesToSpawn > 0) lastKnifeTime = ts;

        // Move knives
        for (let k of knives) {
            k.x += Math.cos(k.angle) * knifeSpeed;
            k.y += Math.sin(k.angle) * knifeSpeed;
        }
        // Remove knives that go off screen
        knives = knives.filter(k => k.x > -knifeLength && k.x < width + knifeLength && k.y > -knifeLength && k.y < height + knifeLength);

        // Spawn bullets from the top
        if (!lastBulletTime) lastBulletTime = ts;
        const bulletsToSpawn = Math.floor(((ts - lastBulletTime) / 1000) * bulletRate);
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = Math.random() * width;
            let by = -bulletRadius;
            bullets.push({ x: bx, y: by, vy: bulletSpeed, r: bulletRadius });
        }
        if (bulletsToSpawn > 0) lastBulletTime = ts;

        // Move bullets
        for (let b of bullets) {
            b.y += b.vy;
        }
        // Remove bullets that go off the bottom
        bullets = bullets.filter(b => b.y < height + bulletRadius);

        // Check collision between player and each knife
        let playerHit = false;
        for (let k of knives) {
            const cx = k.x + Math.cos(k.angle) * knifeLength / 2;
            const cy = k.y + Math.sin(k.angle) * knifeLength / 2;
            const dx = Math.cos(k.angle), dy = Math.sin(k.angle);
            const t = ((px - k.x) * dx + (py - k.y) * dy);
            if (t >= 0 && t <= knifeLength) {
                const perp = Math.abs((px - k.x) * dy - (py - k.y) * dx);
                if (perp < pr + knifeWidth / 2) {
                    playerHit = true;
                    break;
                }
            }
        }
        // Check collision between player and each bullet
        if (!playerHit) {
            for (let b of bullets) {
                const dx = px - b.x;
                const dy = py - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= (pr + b.r)) {
                    playerHit = true;
                    break;
                }
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // Draw knives and their path lines
        for (let k of knives) {
            // Draw path line (red, thin)
            ctx.save();
            ctx.strokeStyle = '#f22';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(k.x0, k.y0);
            let farX = k.x0 + Math.cos(k.angle) * (width + height);
            let farY = k.y0 + Math.sin(k.angle) * (width + height);
            ctx.lineTo(farX, farY);
            ctx.stroke();
            ctx.restore();
            // Draw knife
            ctx.save();
            ctx.translate(k.x, k.y);
            ctx.rotate(k.angle);
            ctx.beginPath();
            ctx.moveTo(-knifeLength / 2, -knifeWidth / 2);
            ctx.lineTo(knifeLength / 2, 0);
            ctx.lineTo(-knifeLength / 2, knifeWidth / 2);
            ctx.closePath();
            ctx.fillStyle = '#ccc';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
        }
        // Draw bullets
        ctx.save();
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        for (let b of bullets) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
            ctx.fillStyle = "#fff";
            ctx.fill();
        }
        ctx.restore();
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
}
//mazeAttack(10, 500, 500, 50)
function mazeAttack(duration, width, height, cellSize = 40) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);

    let ctx = gameCanvas.getContext('2d');

    // Maze generation (recursive backtracker)
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);
    let maze = [];
    for (let y = 0; y < rows; y++) {
        maze[y] = [];
        for (let x = 0; x < cols; x++) {
            maze[y][x] = { x, y, visited: false, walls: [true, true, true, true] }; // top, right, bottom, left
        }
    }
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    function carve(x, y) {
        maze[y][x].visited = true;
        const dirs = shuffle([[0, -1, 0], [1, 0, 1], [0, 1, 2], [-1, 0, 3]]); // [dx, dy, wall]
        for (const [dx, dy, wall] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && !maze[ny][nx].visited) {
                maze[y][x].walls[wall] = false;
                maze[ny][nx].walls[(wall + 2) % 4] = false;
                carve(nx, ny);
            }
        }
    }
    carve(0, 0);

    // Player and goal
    let px = cellSize / 2, py = cellSize / 2;
    const pr = 10;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };
    const goal = { x: cols - 1, y: rows - 1 };
    const goalRadius = cellSize / 2 - 6;

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    // Pixel-perfect wall collision for smooth movement
    function canMoveTo(nx, ny) {
        // nx,ny: new player center (float, px)
        if (nx - pr < 0 || nx + pr > width || ny - pr < 0 || ny + pr > height) return false;
        // Find which cell the center is in
        let cx = Math.floor(nx / cellSize), cy = Math.floor(ny / cellSize);
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
        const cell = maze[cy][cx];
        // Check each direction for wall collision
        // Top wall
        if (cell.walls[0] && ny - pr < cy * cellSize) return false;
        // Bottom wall
        if (cell.walls[2] && ny + pr > (cy + 1) * cellSize) return false;
        // Left wall
        if (cell.walls[3] && nx - pr < cx * cellSize) return false;
        // Right wall
        if (cell.walls[1] && nx + pr > (cx + 1) * cellSize) return false;
        // Also check adjacent cells if overlapping their walls
        // Up
        if (ny - pr < cy * cellSize && cy > 0) {
            const upCell = maze[cy - 1][cx];
            if (upCell.walls[2]) return false;
        }
        // Down
        if (ny + pr > (cy + 1) * cellSize && cy < rows - 1) {
            const downCell = maze[cy + 1][cx];
            if (downCell.walls[0]) return false;
        }
        // Left
        if (nx - pr < cx * cellSize && cx > 0) {
            const leftCell = maze[cy][cx - 1];
            if (leftCell.walls[1]) return false;
        }
        // Right
        if (nx + pr > (cx + 1) * cellSize && cx < cols - 1) {
            const rightCell = maze[cy][cx + 1];
            if (rightCell.walls[3]) return false;
        }
        return true;
    }

    function animate() {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }

        // Player movement (pixel-perfect, smooth, wall collision)
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        let npx = px + dx, npy = py + dy;
        // Try moving in both axes, then x only, then y only
        if (canMoveTo(npx, npy)) {
            px = npx; py = npy;
        } else if (canMoveTo(npx, py)) {
            px = npx;
        } else if (canMoveTo(px, npy)) {
            py = npy;
        }

        // Check for reaching goal
        const distToGoal = Math.sqrt((px - (goal.x * cellSize + cellSize / 2)) ** 2 + (py - (goal.y * cellSize + cellSize / 2)) ** 2);
        if (distToGoal < goalRadius) {
            // End attack
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            if (
                player &&
                player.subtabs &&
                player.subtabs["ma"] &&
                player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
                player.ma &&
                player.ma.currentDepth != 0
            ) {
                player.subtabs["ma"]["stuff"] = "Fight";
            } else {
                player.ma.inBlackHeart = false;
                toggleOpt('menuShown');
                player.subtabs["ma"]["stuff"] = "Black Heart";
            }
            return;
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // Draw maze
        ctx.save();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = maze[y][x];
                const sx = x * cellSize, sy = y * cellSize;
                if (cell.walls[0]) { // top
                    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + cellSize, sy); ctx.stroke();
                }
                if (cell.walls[1]) { // right
                    ctx.beginPath(); ctx.moveTo(sx + cellSize, sy); ctx.lineTo(sx + cellSize, sy + cellSize); ctx.stroke();
                }
                if (cell.walls[2]) { // bottom
                    ctx.beginPath(); ctx.moveTo(sx + cellSize, sy + cellSize); ctx.lineTo(sx, sy + cellSize); ctx.stroke();
                }
                if (cell.walls[3]) { // left
                    ctx.beginPath(); ctx.moveTo(sx, sy + cellSize); ctx.lineTo(sx, sy); ctx.stroke();
                }
            }
        }
        // Draw timer (top center)
ctx.save();
let now = Date.now();
let timeLeft = Math.max(0, Math.ceil((endTime - now) / 1000));
ctx.font = 'bold 32px monospace';
ctx.textAlign = 'center';
ctx.textBaseline = 'top';
ctx.fillStyle = timeLeft <= 3 ? '#f44' : '#fff';
ctx.shadowColor = '#000';
ctx.shadowBlur = 6;
ctx.fillText(`Time Left: ${timeLeft}s`, gameCanvas.width / 2, 10);
ctx.restore();
        ctx.restore();
        // Draw goal (green button)
        ctx.save();
        ctx.beginPath();
        ctx.arc(goal.x * cellSize + cellSize / 2, goal.y * cellSize + cellSize / 2, goalRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#2f4";
        ctx.shadowColor = "#2f4";
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

// End after duration (failsafe)
setTimeout(() => {
    // Only run if still running (not already ended by reaching the goal)
    if (!running) return;
    window.removeEventListener("keydown", keydownHandler);
    window.removeEventListener("keyup", keyupHandler);
    if (overlay.parentNode) overlay.remove();
    running = false;
    if (
        player &&
        player.subtabs &&
        player.subtabs["ma"] &&
        player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
        player.ma &&
        player.ma.currentDepth != 0
    ) {
        player.subtabs["ma"]["stuff"] = "Fight";
    } else {
        player.ma.inBlackHeart = false;
        toggleOpt('menuShown');
        player.subtabs["ma"]["stuff"] = "Black Heart";
    }
    logPrint("<span style='color:rgb(139, 14, 52);'>You failed to reach the end of the maze! Everyone takes 25 damage.")
    for (let i = 0; i < player.ma.health.length; i++)
    {
        player.ma.health[i] = player.ma.health[i].sub(25)
    }
}, duration * 1000);
}

function mazeWithBulletsAttack(duration, width, height, cellSize = 40, bulletCountPerSecond = 6) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);

    let ctx = gameCanvas.getContext('2d');

    // Maze generation (recursive backtracker)
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);
    let maze = [];
    for (let y = 0; y < rows; y++) {
        maze[y] = [];
        for (let x = 0; x < cols; x++) {
            maze[y][x] = { x, y, visited: false, walls: [true, true, true, true] }; // top, right, bottom, left
        }
    }
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    function carve(x, y) {
        maze[y][x].visited = true;
        const dirs = shuffle([[0, -1, 0], [1, 0, 1], [0, 1, 2], [-1, 0, 3]]); // [dx, dy, wall]
        for (const [dx, dy, wall] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && !maze[ny][nx].visited) {
                maze[y][x].walls[wall] = false;
                maze[ny][nx].walls[(wall + 2) % 4] = false;
                carve(nx, ny);
            }
        }
    }
    carve(0, 0);

    // Player and goal
    let px = cellSize / 2, py = cellSize / 2;
    const pr = 10;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };
    const goal = { x: cols - 1, y: rows - 1 };
    const goalRadius = cellSize / 2 - 6;

    // Bullets
    let bullets = [];
    const bulletRadius = 12;
    const bulletSpeed = 6;
    let lastBulletTime = 0;

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    // Pixel-perfect wall collision for smooth movement
    function canMoveTo(nx, ny) {
        if (nx - pr < 0 || nx + pr > width || ny - pr < 0 || ny + pr > height) return false;
        let cx = Math.floor(nx / cellSize), cy = Math.floor(ny / cellSize);
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
        const cell = maze[cy][cx];
        if (cell.walls[0] && ny - pr < cy * cellSize) return false;
        if (cell.walls[2] && ny + pr > (cy + 1) * cellSize) return false;
        if (cell.walls[3] && nx - pr < cx * cellSize) return false;
        if (cell.walls[1] && nx + pr > (cx + 1) * cellSize) return false;
        if (ny - pr < cy * cellSize && cy > 0) {
            const upCell = maze[cy - 1][cx];
            if (upCell.walls[2]) return false;
        }
        if (ny + pr > (cy + 1) * cellSize && cy < rows - 1) {
            const downCell = maze[cy + 1][cx];
            if (downCell.walls[0]) return false;
        }
        if (nx - pr < cx * cellSize && cx > 0) {
            const leftCell = maze[cy][cx - 1];
            if (leftCell.walls[1]) return false;
        }
        if (nx + pr > (cx + 1) * cellSize && cx < cols - 1) {
            const rightCell = maze[cy][cx + 1];
            if (rightCell.walls[3]) return false;
        }
        return true;
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }

        // Player movement (pixel-perfect, smooth, wall collision)
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        let npx = px + dx, npy = py + dy;
        if (canMoveTo(npx, npy)) {
            px = npx; py = npy;
        } else if (canMoveTo(npx, py)) {
            px = npx;
        } else if (canMoveTo(px, npy)) {
            py = npy;
        }

        // Spawn bullets from the top
        if (!lastBulletTime) lastBulletTime = ts;
        const bulletsToSpawn = Math.floor(((ts - lastBulletTime) / 1000) * bulletCountPerSecond);
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = Math.random() * width;
            let by = -bulletRadius;
            bullets.push({
                x: bx,
                y: by,
                vy: bulletSpeed,
                r: bulletRadius
            });
        }
        if (bulletsToSpawn > 0) lastBulletTime = ts;

        // Move bullets
        for (let b of bullets) {
            b.y += b.vy;
        }
        // Remove bullets that go off the bottom
        bullets = bullets.filter(b => b.y < height + bulletRadius);

        // Check collision between player and each bullet
        let playerHit = false;
        for (let b of bullets) {
            const dx = px - b.x;
            const dy = py - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= (pr + b.r)) {
                playerHit = true;
                break;
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Check for reaching goal
        const distToGoal = Math.sqrt((px - (goal.x * cellSize + cellSize / 2)) ** 2 + (py - (goal.y * cellSize + cellSize / 2)) ** 2);
        if (distToGoal < goalRadius) {
            // End attack
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            if (
                player &&
                player.subtabs &&
                player.subtabs["ma"] &&
                player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
                player.ma &&
                player.ma.currentDepth != 0
            ) {
                player.subtabs["ma"]["stuff"] = "Fight";
            } else {
                player.ma.inBlackHeart = false;
                toggleOpt('menuShown');
                player.subtabs["ma"]["stuff"] = "Black Heart";
            }
            return;
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // Draw maze
        ctx.save();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = maze[y][x];
                const sx = x * cellSize, sy = y * cellSize;
                if (cell.walls[0]) { ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + cellSize, sy); ctx.stroke(); }
                if (cell.walls[1]) { ctx.beginPath(); ctx.moveTo(sx + cellSize, sy); ctx.lineTo(sx + cellSize, sy + cellSize); ctx.stroke(); }
                if (cell.walls[2]) { ctx.beginPath(); ctx.moveTo(sx + cellSize, sy + cellSize); ctx.lineTo(sx, sy + cellSize); ctx.stroke(); }
                if (cell.walls[3]) { ctx.beginPath(); ctx.moveTo(sx, sy + cellSize); ctx.lineTo(sx, sy); ctx.stroke(); }
            }
        }
        // Draw timer (top center)
        ctx.save();
        let now = Date.now();
        let timeLeft = Math.max(0, Math.ceil((endTime - now) / 1000));
        ctx.font = 'bold 32px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = timeLeft <= 3 ? '#f44' : '#fff';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 6;
        ctx.fillText(`Time Left: ${timeLeft}s`, gameCanvas.width / 2, 10);
        ctx.restore();
        // Draw bullets
        ctx.save();
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        for (let b of bullets) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
            ctx.fillStyle = "#fff";
            ctx.fill();
        }
        ctx.restore();
        ctx.restore();
        // Draw goal (green button)
        ctx.save();
        ctx.beginPath();
        ctx.arc(goal.x * cellSize + cellSize / 2, goal.y * cellSize + cellSize / 2, goalRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#2f4";
        ctx.shadowColor = "#2f4";
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    // End after duration (failsafe)
    setTimeout(() => {
        if (!running) return;
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
        running = false;
        logPrint("<span style='color:rgb(139, 14, 52);'>You failed to reach the end of the maze! Everyone takes 25 damage.");
        for (let i = 0; i < player.ma.health.length; i++) {
            player.ma.health[i] = player.ma.health[i].sub(25);
        }
        if (
            player &&
            player.subtabs &&
            player.subtabs["ma"] &&
            player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
            player.ma &&
            player.ma.currentDepth != 0
        ) {
            player.subtabs["ma"]["stuff"] = "Fight";
        } else {
            player.ma.inBlackHeart = false;
            toggleOpt('menuShown');
            player.subtabs["ma"]["stuff"] = "Black Heart";
        }
    }, duration * 1000);
}
function arithmeticQuizAttack(duration = 15, width = 500, height = 300) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;
    const numQuestions = 5;
    let currentQuestion = 0;
    let questions = [];
    let flashColor = null;
    let flashTime = 0;
    let answered = false;
    let hoverIndex = -1;
    let hoverStart = 0;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);

    let ctx = gameCanvas.getContext('2d');

    // Generate questions
    function randomInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
    function makeQuestion() {
        // Randomly pick +, -, x, /
        const ops = ['+', '-', '×', '÷'];
        const op = ops[randomInt(0, 3)];
        let a, b, answer, display;
        if (op === '+') {
            a = randomInt(2, 30); b = randomInt(2, 30); answer = a + b; display = `${a} + ${b}`;
        } else if (op === '-') {
            a = randomInt(10, 40); b = randomInt(2, a); answer = a - b; display = `${a} - ${b}`;
        } else if (op === '×') {
            a = randomInt(2, 12); b = randomInt(2, 12); answer = a * b; display = `${a} × ${b}`;
        } else {
            b = randomInt(2, 12); answer = randomInt(2, 12); a = b * answer; display = `${a} ÷ ${b}`;
        }
        // Generate 3 wrong answers
        let options = [answer];
        while (options.length < 4) {
            let wrong;
            if (op === '+') wrong = answer + randomInt(-7, 7);
            else if (op === '-') wrong = answer + randomInt(-7, 7);
            else if (op === '×') wrong = answer + randomInt(-12, 12);
            else wrong = answer + randomInt(-5, 5);
            if (wrong !== answer && !options.includes(wrong) && wrong >= 0) options.push(wrong);
        }
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return { display, answer, options };
    }
    for (let i = 0; i < numQuestions; i++) questions.push(makeQuestion());

    // Red diamond (player)
    let px = width / 2, py = height - 40;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    function animate() {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }
        // Move player (inside the box)
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        // Draw background (flash if needed)
        ctx.save();
        if (flashColor && Date.now() - flashTime < 250) {
            ctx.fillStyle = flashColor;
            ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        } else {
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        }
        ctx.restore();
        // Draw timer (top center)
        let now = Date.now();
        let timeLeft = Math.max(0, Math.ceil((endTime - now) / 1000));
        ctx.save();
        ctx.font = 'bold 32px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = timeLeft <= 3 ? '#f44' : '#fff';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 6;
        ctx.fillText(`Time Left: ${timeLeft}s`, gameCanvas.width / 2, 10);
        ctx.restore();
        // Draw question
        ctx.save();
        ctx.font = 'bold 36px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 6;
        ctx.fillText(`Q${currentQuestion + 1}: ${questions[currentQuestion].display} = ?`, gameCanvas.width / 2, 60);
        ctx.restore();
        // Draw options horizontally
        const btnW = 110, btnH = 56;
        const gapX = 24;
        const totalWidth = btnW * 4 + gapX * 3;
        const startX = (gameCanvas.width - totalWidth) / 2;
        const y = 180;
        hoverIndex = -1;
        for (let i = 0; i < 4; i++) {
            let x = startX + i * (btnW + gapX);
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x, y, btnW, btnH, 16);
            // Check if player diamond is over this button
            let distX = Math.max(x - px, 0, px - (x + btnW));
            let distY = Math.max(y - py, 0, py - (y + btnH));
            let overlap = (distX * distX + distY * distY) <= pr * pr;
            if (overlap && !answered) {
                hoverIndex = i;
                if (!hoverStart) hoverStart = Date.now();
                // Draw highlight
                ctx.fillStyle = '#666';
            } else {
                ctx.fillStyle = '#222';
            }
            ctx.shadowColor = overlap ? '#fff' : '#000';
            ctx.shadowBlur = overlap ? 12 : 6;
            ctx.fill();
            ctx.font = 'bold 28px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.fillText(questions[currentQuestion].options[i], x + btnW / 2, y + btnH / 2);
            ctx.restore();
        }
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // If hovering over a button for 300ms, select it
        if (hoverIndex !== -1 && !answered) {
            if (!hoverStart) hoverStart = Date.now();
            if (Date.now() - hoverStart > 300) {
                answered = true;
                // Check answer
                if (questions[currentQuestion].options[hoverIndex] === questions[currentQuestion].answer) {
                    flashColor = 'rgba(0,255,0,0.25)';
                    flashTime = Date.now();
                    setTimeout(() => {
                        flashColor = null;
                        answered = false;
                        hoverStart = 0;
                        currentQuestion++;
                        if (currentQuestion >= numQuestions) {
                            endQuiz(true);
                        }
                    }, 250);
                } else {
                    flashColor = 'rgba(255,0,0,0.25)';
                    flashTime = Date.now();
                    takeDamage();
                    setTimeout(() => {
                        flashColor = null;
                        answered = false;
                        hoverStart = 0;
                        // Stay on same question
                    }, 250);
                }
            }
        } else {
            hoverStart = 0;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    function endQuiz(success) {
        running = false;
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
        if (
            player &&
            player.subtabs &&
            player.subtabs["ma"] &&
            player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
            player.ma &&
            player.ma.currentDepth != 0
        ) {
            player.subtabs["ma"]["stuff"] = "Fight";
        } else {
            player.ma.inBlackHeart = false;
            toggleOpt('menuShown');
            player.subtabs["ma"]["stuff"] = "Black Heart";
        }
    }

    // End after duration (failsafe)
    setTimeout(() => {
        if (!running) return;
        running = false;
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
        logPrint("<span style='color:rgb(139, 14, 52);'>You failed to finish the quiz in time! Everyone takes 25 damage.");
        for (let i = 0; i < player.ma.health.length; i++) {
            player.ma.health[i] = player.ma.health[i].sub(25);
        }
        if (
            player &&
            player.subtabs &&
            player.subtabs["ma"] &&
            player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
            player.ma &&
            player.ma.currentDepth != 0
        ) {
            player.subtabs["ma"]["stuff"] = "Fight";
        } else {
            player.ma.inBlackHeart = false;
            toggleOpt('menuShown');
            player.subtabs["ma"]["stuff"] = "Black Heart";
        }
    }, duration * 1000);
}
function mathQuizAttack(difficulty, duration, width, height) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;
    const numQuestions = 5;
    let currentQuestion = 0;
    let questions = [];
    let flashColor = null;
    let flashTime = 0;
    let answered = false;
    let hoverIndex = -1;
    let hoverStart = 0;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);

    let ctx = gameCanvas.getContext('2d');

    // Utility functions
    function randomInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Question generators by difficulty
    function makeArithmetic() {
        const ops = ['+', '-', '×', '÷'];
        const op = ops[randomInt(0, 3)];
        let a, b, answer, display;
        if (op === '+') {
            a = randomInt(2, 30); b = randomInt(2, 30); answer = a + b; display = `${a} + ${b}`;
        } else if (op === '-') {
            a = randomInt(10, 40); b = randomInt(2, a); answer = a - b; display = `${a} - ${b}`;
        } else if (op === '×') {
            a = randomInt(2, 12); b = randomInt(2, 12); answer = a * b; display = `${a} × ${b}`;
        } else {
            b = randomInt(2, 12); answer = randomInt(2, 12); a = b * answer; display = `${a} ÷ ${b}`;
        }
        let options = [answer];
        while (options.length < 4) {
            let wrong;
            if (op === '+') wrong = answer + randomInt(-7, 7);
            else if (op === '-') wrong = answer + randomInt(-7, 7);
            else if (op === '×') wrong = answer + randomInt(-12, 12);
            else wrong = answer + randomInt(-5, 5);
            if (wrong !== answer && !options.includes(wrong) && wrong >= 0) options.push(wrong);
        }
        options = shuffle(options);
        return { display: display + ' = ?', answer, options };
    }
    function makeAlgebra() {
        const types = ["solve", "distribute", "evaluate", "factor", "quadratic"];
        const type = types[randomInt(0, types.length - 1)];
        let display, answer, options = [];
        if (type === "solve") {
            let a = randomInt(2, 7) * (Math.random() < 0.5 ? 1 : -1);
            let x = randomInt(-10, 10);
            let b = randomInt(-10, 10);
            let c = a * x + b;
            display = `${a === 1 ? '' : a === -1 ? '-' : a}x ${b >= 0 ? '+ ' + b : '- ' + (-b)} = ${c}`;
            answer = x;
            options = [x];
            while (options.length < 4) {
                let wrong = x + randomInt(-5, 5);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "distribute") {
            let k = randomInt(2, 6);
            let a = randomInt(1, 9);
            let b = randomInt(1, 9);
            display = `${k}(${a} + ${b}x)`;
            answer = `${k * a} + ${k * b}x`;
            options = [answer];
            while (options.length < 4) {
                let wa = k * a + randomInt(-3, 3);
                let wb = k * b + randomInt(-2, 2);
                let wrong = `${wa} + ${wb}x`;
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "evaluate") {
            let x = randomInt(-5, 8);
            let a = randomInt(2, 7);
            let b = randomInt(-6, 6);
            display = `Evaluate: ${a}x ${b >= 0 ? '+ ' + b : '- ' + (-b)} for x = ${x}`;
            answer = a * x + b;
            options = [answer];
            while (options.length < 4) {
                let wrong = answer + randomInt(-8, 8);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "factor") {
            let a = randomInt(2, 8);
            display = `Factor: ${a}x + ${a}y`;
            answer = `${a}(x + y)`;
            options = [answer];
            while (options.length < 4) {
                let wrongA = a + randomInt(-2, 2);
                let wrong = `${wrongA}(x + y)`;
                if (!options.includes(wrong) && wrongA > 0) options.push(wrong);
            }
        } else if (type === "quadratic") {
            let root = randomInt(-6, 6);
            let b = randomInt(-5, 5);
            let c = -(root * root + b * root);
            display = `x² ${b >= 0 ? '+ ' + b : '- ' + (-b)}x ${c >= 0 ? '+ ' + c : '- ' + (-c)} = 0. One root is?`;
            answer = root;
            options = [root];
            while (options.length < 4) {
                let wrong = root + randomInt(-4, 4);
                if (!options.includes(wrong)) options.push(wrong);
            }
        }
        options = shuffle(options);
        return { display, answer, options };
    }
    function makeGeometry() {
        const types = ["area_rect", "area_tri", "area_circ", "pythag", "perimeter_rect"];
        const type = types[randomInt(0, types.length - 1)];
        let display, answer, options = [];
        if (type === "area_rect") {
            let w = randomInt(2, 20), h = randomInt(2, 20);
            display = `Area of rectangle: ${w} × ${h}`;
            answer = w * h;
            options = [answer];
            while (options.length < 4) {
                let wrong = answer + randomInt(-10, 10);
                if (!options.includes(wrong) && wrong > 0) options.push(wrong);
            }
        } else if (type === "area_tri") {
            let b = randomInt(2, 20), h = randomInt(2, 20);
            display = `Area of triangle: base ${b}, height ${h}`;
            answer = 0.5 * b * h;
            options = [answer];
            while (options.length < 4) {
                let wrong = answer + randomInt(-10, 10);
                if (!options.includes(wrong) && wrong > 0) options.push(wrong);
            }
        } else if (type === "area_circ") {
            let r = randomInt(2, 12);
            display = `Area of circle, r = ${r}`;
            answer = +(Math.PI * r * r).toFixed(2);
            options = [answer];
            while (options.length < 4) {
                let wrong = +(answer + randomInt(-20, 20)).toFixed(2);
                if (!options.includes(wrong) && wrong > 0) options.push(wrong);
            }
        } else if (type === "pythag") {
            let a = randomInt(3, 12), b = randomInt(3, 12);
            display = `Hypotenuse of right triangle: a=${a}, b=${b}`;
            answer = +(Math.sqrt(a * a + b * b)).toFixed(2);
            options = [answer];
            while (options.length < 4) {
                let wrong = +(answer + randomInt(-5, 5)).toFixed(2);
                if (!options.includes(wrong) && wrong > 0) options.push(wrong);
            }
        } else if (type === "perimeter_rect") {
            let w = randomInt(2, 20), h = randomInt(2, 20);
            display = `Perimeter of rectangle: ${w} × ${h}`;
            answer = 2 * (w + h);
            options = [answer];
            while (options.length < 4) {
                let wrong = answer + randomInt(-10, 10);
                if (!options.includes(wrong) && wrong > 0) options.push(wrong);
            }
        }
        options = shuffle(options);
        return { display, answer, options };
    }
    function makeTrig() {
        const types = ["sin", "cos", "tan", "identity", "deg2rad"];
        const type = types[randomInt(0, types.length - 1)];
        let display, answer, options = [];
        if (type === "sin") {
            let deg = [0, 30, 45, 60, 90][randomInt(0, 4)];
            display = `sin(${deg}°)`;
            const table = {0:0, 30:0.5, 45:0.71, 60:0.87, 90:1};
            answer = table[deg];
            options = [answer];
            while (options.length < 4) {
                let wrong = +(answer + (Math.random() - 0.5) * 1.2).toFixed(2);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "cos") {
            let deg = [0, 30, 45, 60, 90][randomInt(0, 4)];
            display = `cos(${deg}°)`;
            const table = {0:1, 30:0.87, 45:0.71, 60:0.5, 90:0};
            answer = table[deg];
            options = [answer];
            while (options.length < 4) {
                let wrong = +(answer + (Math.random() - 0.5) * 1.2).toFixed(2);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "tan") {
            let deg = [0, 30, 45, 60][randomInt(0, 3)];
            display = `tan(${deg}°)`;
            const table = {0:0, 30:0.58, 45:1, 60:1.73};
            answer = table[deg];
            options = [answer];
            while (options.length < 4) {
                let wrong = +(answer + (Math.random() - 0.5) * 2).toFixed(2);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "identity") {
            display = `sin²(θ) + cos²(θ) = ?`;
            answer = 1;
            options = [1, 0, 2, 0.5];
        } else if (type === "deg2rad") {
            let deg = [30, 45, 60, 90, 180][randomInt(0, 4)];
            display = `Convert ${deg}° to radians`;
            const table = {30:"π/6", 45:"π/4", 60:"π/3", 90:"π/2", 180:"π"};
            answer = table[deg];
            options = [answer, "π/2", "π/3", "π/4", "π/6", "π"]; options = shuffle(options).slice(0,4);
        }
        options = shuffle(options);
        return { display, answer, options };
    }
    function makeCalculus() {
        const types = ["limit", "derivative", "integral", "critical", "tangent"];
        const type = types[randomInt(0, types.length - 1)];
        let display, answer, options = [];
        if (type === "limit") {
            let a = randomInt(-3, 3);
            let b = randomInt(2, 5);
            let c = randomInt(-5, 5);
            let fx = `${b}x + ${c}`;
            display = `limₓ→${a} (${fx})`;
            answer = b * a + c;
            options = [answer];
            while (options.length < 4) {
                let wrong = answer + randomInt(-5, 5);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "derivative") {
            let a = randomInt(2, 6);
            let n = randomInt(2, 3);
            let fx = `${a}x^${n}`;
            let dfx = `${a * n}x${n - 1 === 1 ? '' : '^' + (n - 1)}`;
            display = `d/dx (${fx}) = ?`;
            answer = dfx;
            options = [answer];
            while (options.length < 4) {
                let wrongA = a * n + randomInt(-3, 3);
                let wrongN = n - 1 + randomInt(-1, 1);
                let wrong = `${wrongA}x${wrongN === 1 ? '' : '^' + wrongN}`;
                if (!options.includes(wrong) && wrongA > 0 && wrongN > 0) options.push(wrong);
            }
        } else if (type === "integral") {
            let a = randomInt(2, 8);
            display = `∫ ${a}x dx`;
            answer = `${a / 2}x^2 + C`;
            options = [answer];
            while (options.length < 4) {
                let wrongA = (a / 2) + randomInt(-2, 2);
                let wrong = `${wrongA}x^2 + C`;
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "critical") {
            let a = randomInt(1, 4);
            let b = randomInt(-6, 6);
            let cp = -b / (2 * a);
            display = `Critical point of f(x) = ${a}x² ${b >= 0 ? '+ ' + b : '- ' + (-b)}x`;
            answer = cp;
            options = [cp];
            while (options.length < 4) {
                let wrong = cp + randomInt(-3, 3);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "tangent") {
            let a = randomInt(1, 5);
            let b = randomInt(-3, 3);
            let slope = 2 * a * b;
            display = `Slope of tangent to y = ${a}x² at x = ${b}`;
            answer = slope;
            options = [slope];
            while (options.length < 4) {
                let wrong = slope + randomInt(-5, 5);
                if (!options.includes(wrong)) options.push(wrong);
            }
        }
        options = shuffle(options);
        return { display, answer, options };
    }
    function makeLinearAlgebra() {
        const types = ["dot", "det2", "trace2", "scalar_mult", "system2"];
        const type = types[randomInt(0, types.length - 1)];
        let display, answer, options = [];
        if (type === "dot") {
            let a1 = randomInt(-5, 5), a2 = randomInt(-5, 5), b1 = randomInt(-5, 5), b2 = randomInt(-5, 5);
            display = `Dot: [${a1},${a2}] · [${b1},${b2}]`;
            answer = a1 * b1 + a2 * b2;
            options = [answer];
            while (options.length < 4) {
                let wrong = answer + randomInt(-10, 10);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "det2") {
            let a = randomInt(-5, 5), b = randomInt(-5, 5), c = randomInt(-5, 5), d = randomInt(-5, 5);
            display = `Determinant: |${a} ${b}| |${c} ${d}|`;
            answer = a * d - b * c;
            options = [answer];
            while (options.length < 4) {
                let wrong = answer + randomInt(-10, 10);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "trace2") {
            let a = randomInt(-5, 5), d = randomInt(-5, 5);
            display = `Trace: |${a} _| |_ ${d}|`;
            answer = a + d;
            options = [answer];
            while (options.length < 4) {
                let wrong = answer + randomInt(-5, 5);
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "scalar_mult") {
            let k = randomInt(-5, 5), a = randomInt(-5, 5), b = randomInt(-5, 5);
            display = `Scalar mult: ${k} × [${a},${b}]`;
            answer = `[${k * a},${k * b}]`;
            options = [answer];
            while (options.length < 4) {
                let wa = k * a + randomInt(-5, 5), wb = k * b + randomInt(-5, 5);
                let wrong = `[${wa},${wb}]`;
                if (!options.includes(wrong)) options.push(wrong);
            }
        } else if (type === "system2") {
            let a = randomInt(1, 5), b = randomInt(1, 5), c = randomInt(1, 10), d = randomInt(1, 5), e = randomInt(1, 5), f = randomInt(1, 10);
            let det = a * e - b * d;
            if (det === 0) det = 1;
            let x = (c * e - b * f) / det;
            display = `Solve: ${a}x+${b}y=${c}, ${d}x+${e}y=${f}. x=?`;
            answer = +x.toFixed(2);
            options = [answer];
            while (options.length < 4) {
                let wrong = +(answer + (Math.random() - 0.5) * 4).toFixed(2);
                if (!options.includes(wrong)) options.push(wrong);
            }
        }
        options = shuffle(options);
        return { display, answer, options };
    }

    // Generate questions
    for (let i = 0; i < numQuestions; i++) {
        let q;
        if (difficulty === 1) q = makeArithmetic();
        else if (difficulty === 2) q = makeAlgebra();
        else if (difficulty === 3) q = makeGeometry();
        else if (difficulty === 4) q = makeTrig();
        else if (difficulty === 5) q = makeCalculus();
        else if (difficulty === 6) q = makeLinearAlgebra();
        else q = makeArithmetic();
        questions.push(q);
    }

    // Red diamond (player)
    let px = width / 2, py = height - 40;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    function animate() {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }
        // Move player (inside the box)
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        // Draw background (flash if needed)
        ctx.save();
        if (flashColor && Date.now() - flashTime < 250) {
            ctx.fillStyle = flashColor;
            ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        } else {
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        }
        ctx.restore();
        // Draw timer (top center)
        let now = Date.now();
        let timeLeft = Math.max(0, Math.ceil((endTime - now) / 1000));
        ctx.save();
        ctx.font = 'bold 32px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = timeLeft <= 3 ? '#f44' : '#fff';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 6;
        ctx.fillText(`Time Left: ${timeLeft}s`, gameCanvas.width / 2, 10);
        ctx.restore();
        // Draw question
        ctx.save();
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 6;
        ctx.fillText(`Q${currentQuestion + 1}: ${questions[currentQuestion].display}`, gameCanvas.width / 2, 60);
        ctx.restore();
        // Draw options horizontally
        const btnW = 150, btnH = 56;
        const gapX = 24;
        const totalWidth = btnW * 4 + gapX * 3;
        const startX = (gameCanvas.width - totalWidth) / 2;
        const y = 180;
        hoverIndex = -1;
        for (let i = 0; i < 4; i++) {
            let x = startX + i * (btnW + gapX);
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x, y, btnW, btnH, 16);
            // Check if player diamond is over this button
            let distX = Math.max(x - px, 0, px - (x + btnW));
            let distY = Math.max(y - py, 0, py - (y + btnH));
            let overlap = (distX * distX + distY * distY) <= pr * pr;
            if (overlap && !answered) {
                hoverIndex = i;
                if (!hoverStart) hoverStart = Date.now();
                ctx.fillStyle = '#666';
            } else {
                ctx.fillStyle = '#222';
            }
            ctx.shadowColor = overlap ? '#fff' : '#000';
            ctx.shadowBlur = overlap ? 12 : 6;
            ctx.fill();
            ctx.font = 'bold 22px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.fillText(questions[currentQuestion].options[i], x + btnW / 2, y + btnH / 2);
            ctx.restore();
        }
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // If hovering over a button for 300ms, select it
        if (hoverIndex !== -1 && !answered) {
            if (!hoverStart) hoverStart = Date.now();
            if (Date.now() - hoverStart > 300) {
                answered = true;
                if (questions[currentQuestion].options[hoverIndex] === questions[currentQuestion].answer) {
                    flashColor = 'rgba(0,255,0,0.25)';
                    flashTime = Date.now();
                    setTimeout(() => {
                        flashColor = null;
                        answered = false;
                        hoverStart = 0;
                        currentQuestion++;
                        if (currentQuestion >= numQuestions) {
                            endQuiz(true);
                        }
                    }, 250);
                } else {
                    flashColor = 'rgba(255,0,0,0.25)';
                    flashTime = Date.now();
                    takeDamage();
                    setTimeout(() => {
                        flashColor = null;
                        answered = false;
                        hoverStart = 0;
                    }, 250);
                }
            }
        } else {
            hoverStart = 0;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    function endQuiz(success) {
        running = false;
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
        if (
            player &&
            player.subtabs &&
            player.subtabs["ma"] &&
            player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
            player.ma &&
            player.ma.currentDepth != 0
        ) {
            player.subtabs["ma"]["stuff"] = "Fight";
        } else {
            player.ma.inBlackHeart = false;
            toggleOpt('menuShown');
            player.subtabs["ma"]["stuff"] = "Black Heart";
        }
    }

    setTimeout(() => {
        if (!running) return;
        running = false;
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
        logPrint("<span style='color:rgb(139, 14, 52);'>You failed to finish the quiz in time! Everyone takes 25 damage.");
        for (let i = 0; i < player.ma.health.length; i++) {
            player.ma.health[i] = player.ma.health[i].sub(25);
        }
        if (
            player &&
            player.subtabs &&
            player.subtabs["ma"] &&
            player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
            player.ma &&
            player.ma.currentDepth != 0
        ) {
            player.subtabs["ma"]["stuff"] = "Fight";
        } else {
            player.ma.inBlackHeart = false;
            toggleOpt('menuShown');
            player.subtabs["ma"]["stuff"] = "Black Heart";
        }
    }, duration * 1000);
}
function knifeThrowAttack(duration = 15, width = 700, height = 500, knifeRate = 1.2) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);

    let ctx = gameCanvas.getContext('2d');

    // Red diamond (player)
    let px = width / 2, py = height / 2;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    // Knives
    let knives = [];
    const knifeLength = 64, knifeWidth = 16, knifeSpeed = 6;
    let lastKnifeTime = 0;

    function spawnKnife() {
        // Pick a random edge and a random point on that edge
        const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let x, y, angle;
        if (edge === 0) { // top
            x = Math.random() * width;
            y = -knifeLength;
            angle = Math.random() * Math.PI + Math.PI / 2; // downwards, but can be angled
        } else if (edge === 1) { // right
            x = width + knifeLength;
            y = Math.random() * height;
            angle = Math.random() * Math.PI + Math.PI; // leftwards
        } else if (edge === 2) { // bottom
            x = Math.random() * width;
            y = height + knifeLength;
            angle = Math.random() * Math.PI - Math.PI / 2; // upwards
        } else { // left
            x = -knifeLength;
            y = Math.random() * height;
            angle = Math.random() * Math.PI; // rightwards
        }
        // Optionally, bias angle toward player
        if (Math.random() < 0.7) {
            const dx = px - x, dy = py - y;
            angle = Math.atan2(dy, dx);
        }
        // Store initial spawn for path line
        knives.push({ x, y, angle, x0: x, y0: y });
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }
        // End after duration
        let now = Date.now();
        if (now >= endTime) {
            running = false;
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            // Only return to Fight tab if you are still in depth 
            if (
                player &&
                player.subtabs &&
                player.subtabs["ma"] &&
                player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
                player.ma &&
                player.ma.currentDepth != 0
            ) {
                player.subtabs["ma"]["stuff"] = "Fight";
            } else {
                player.ma.inBlackHeart = false;
                toggleOpt('menuShown');
                player.subtabs["ma"]["stuff"] = "Black Heart";
            }
            return;
        }
        // Player movement
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        // Spawn knives
        if (!lastKnifeTime) lastKnifeTime = ts;
        const knivesToSpawn = Math.floor(((ts - lastKnifeTime) / 1000) * knifeRate);
        for (let i = 0; i < knivesToSpawn; i++) {
            spawnKnife();
        }
        if (knivesToSpawn > 0) lastKnifeTime = ts;

        // Move knives
        for (let k of knives) {
            k.x += Math.cos(k.angle) * knifeSpeed;
            k.y += Math.sin(k.angle) * knifeSpeed;
        }
        // Remove knives that go off screen
        knives = knives.filter(k => k.x > -knifeLength && k.x < width + knifeLength && k.y > -knifeLength && k.y < height + knifeLength);

        // Check collision
        let playerHit = false;
        for (let k of knives) {
            // Knife is a rectangle, check if player is within knife's rectangle (approximate as line segment + width)
            const cx = k.x + Math.cos(k.angle) * knifeLength / 2;
            const cy = k.y + Math.sin(k.angle) * knifeLength / 2;
            const dx = Math.cos(k.angle), dy = Math.sin(k.angle);
            // Project player onto knife axis
            const t = ((px - k.x) * dx + (py - k.y) * dy);
            if (t >= 0 && t <= knifeLength) {
                // Perpendicular distance
                const perp = Math.abs((px - k.x) * dy - (py - k.y) * dx);
                if (perp < pr + knifeWidth / 2) {
                    playerHit = true;
                    break;
                }
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // Draw knives and their path lines
        for (let k of knives) {
            // Draw path line (red, thin)
            ctx.save();
            ctx.strokeStyle = '#f22';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(k.x0, k.y0);
            // Draw line in the direction of the knife, long enough to cross the arena
            let farX = k.x0 + Math.cos(k.angle) * (width + height);
            let farY = k.y0 + Math.sin(k.angle) * (width + height);
            ctx.lineTo(farX, farY);
            ctx.stroke();
            ctx.restore();
            // Draw knife
            ctx.save();
            ctx.translate(k.x, k.y);
            ctx.rotate(k.angle);
            ctx.beginPath();
            ctx.moveTo(-knifeLength / 2, -knifeWidth / 2);
            ctx.lineTo(knifeLength / 2, 0);
            ctx.lineTo(-knifeLength / 2, knifeWidth / 2);
            ctx.closePath();
            ctx.fillStyle = '#ccc';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
        }
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
}
// --- Radial Knife Burst Attack (targeting player, infinite lines, far spawn) ---
function radialKnifeBurstAttack(duration, width, height, burstInterval = 1200, knivesPerBurst = 12, knifeSpeed = 8) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    let ctx = gameCanvas.getContext('2d');

    // Red diamond (player)
    let px = width / 2, py = height / 2;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    // Knives
    let knives = [];
    const knifeLength = 64, knifeWidth = 16;
    let lastBurstTime = 0;

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    function fireKnifeBurst() {
        // Knives are thrown from far outside the arena, all aimed at the current player position
        const centerX = px, centerY = py;
        const spawnRadius = Math.max(width, height) * 0.75 + 200; // farther than arena edge
        for (let i = 0; i < knivesPerBurst; i++) {
            const angle = (2 * Math.PI * i) / knivesPerBurst;
            // Spawn far away in a ring
            const spawnX = centerX + Math.cos(angle) * spawnRadius;
            const spawnY = centerY + Math.sin(angle) * spawnRadius;
            // Aim at the current player position
            const dx = centerX - spawnX;
            const dy = centerY - spawnY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const vx = (dx / dist) * knifeSpeed;
            const vy = (dy / dist) * knifeSpeed;
            const knifeAngle = Math.atan2(dy, dx);
            knives.push({
                x: spawnX,
                y: spawnY,
                vx,
                vy,
                angle: knifeAngle,
                x0: spawnX,
                y0: spawnY
            });
        }
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }
        let now = Date.now();
        // Move player
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        // Fire knife burst
        if (!lastBurstTime) lastBurstTime = now;
        if (now - lastBurstTime > burstInterval) {
            fireKnifeBurst();
            lastBurstTime = now;
        }

        // Move knives
        for (let k of knives) {
            k.x += k.vx;
            k.y += k.vy;
        }
        // Remove knives that go far off screen
        knives = knives.filter(k => k.x > -2000 && k.x < width + 2000 && k.y > -2000 && k.y < height + 2000);

        // Check collision
        let playerHit = false;
        for (let k of knives) {
            // Knife is a rectangle, check if player is within knife's rectangle (approximate as line segment + width)
            const cx = k.x + Math.cos(k.angle) * knifeLength / 2;
            const cy = k.y + Math.sin(k.angle) * knifeLength / 2;
            const dx = Math.cos(k.angle), dy = Math.sin(k.angle);
            // Project player onto knife axis
            const t = ((px - k.x) * dx + (py - k.y) * dy);
            if (t >= 0 && t <= knifeLength) {
                // Perpendicular distance
                const perp = Math.abs((px - k.x) * dy - (py - k.y) * dx);
                if (perp < pr + knifeWidth / 2) {
                    playerHit = true;
                    break;
                }
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
// Draw knives and their path lines
for (let k of knives) {
    // Draw path line (red, thin) if knife is on screen, or if it left within the last 500ms
    let knifeOnScreen = (
        k.x > 0 && k.x < gameCanvas.width &&
        k.y > 0 && k.y < gameCanvas.height
    );
    if (knifeOnScreen) {
        k._lastOnScreen = Date.now();
    }
    if (k._lastOnScreen && Date.now() - k._lastOnScreen < 500) {
        ctx.save();
        ctx.strokeStyle = '#f22';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(k.x0, k.y0);
        let farX = k.x0 + Math.cos(k.angle) * 5000;
        let farY = k.y0 + Math.sin(k.angle) * 5000;
        ctx.lineTo(farX, farY);
        ctx.stroke();
        ctx.restore();
    }
    // Draw knife
    ctx.save();
    ctx.translate(k.x, k.y);
    ctx.rotate(k.angle);
    ctx.beginPath();
    ctx.moveTo(-knifeLength / 2, -knifeWidth / 2);
    ctx.lineTo(knifeLength / 2, 0);
    ctx.lineTo(-knifeLength / 2, knifeWidth / 2);
    ctx.closePath();
    ctx.fillStyle = '#ccc';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
}
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        if (now < endTime) {
            requestAnimationFrame(animate);
        } else {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            if (
                player &&
                player.subtabs &&
                player.subtabs["ma"] &&
                player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
                player.ma &&
                player.ma.currentDepth != 0
            ) {
                player.subtabs["ma"]["stuff"] = "Fight";
            } else {
                player.ma.inBlackHeart = false;
                toggleOpt('menuShown');
                player.subtabs["ma"]["stuff"] = "Black Heart";
            }
        }
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
}
function bombExplosionAttack(
    duration = 15,
    width = 700,
    height = 500,
    bombRate = 1,
    bombFallSpeed = 4,
    miniBulletSpeed = 5,
    miniBulletCount = 3,
    miniBombDelay = 600,
    miniBombSpeed = 3,
    miniBombExplosionBullets = 5
) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (centered)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = width;
    gameCanvas.height = height;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    let ctx = gameCanvas.getContext('2d');

    // Player (red diamond)
    let px = width / 2, py = height - 40;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    // Bombs: {x, y, exploded, explodeTime}
    let bombs = [];
    // Mini-bullets: {x, y, vx, vy, exploded, explodeTime}
    let miniBombs = [];
    // Bullets: {x, y, vx, vy}
    let bullets = [];
    let lastBombTime = 0;

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

    function spawnBomb() {
        let x = 60 + Math.random() * (width - 120);
        bombs.push({ x: x, y: -24, exploded: false, explodeTime: null });
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }
        // End after duration
        let now = Date.now();
        if (now >= endTime) {
            running = false;
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            if (
                player &&
                player.subtabs &&
                player.subtabs["ma"] &&
                player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
                player.ma &&
                player.ma.currentDepth != 0
            ) {
                player.subtabs["ma"]["stuff"] = "Fight";
            } else {
                player.ma.inBlackHeart = false;
                toggleOpt('menuShown');
                player.subtabs["ma"]["stuff"] = "Black Heart";
            }
            return;
        }

        // Player movement
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(width - pr, px));
        py = Math.max(pr, Math.min(height - pr, py));

        // Spawn bombs
        if (!lastBombTime) lastBombTime = ts;
        const bombsToSpawn = Math.floor(((ts - lastBombTime) / 1000) * bombRate);
        for (let i = 0; i < bombsToSpawn; i++) {
            spawnBomb();
        }
        if (bombsToSpawn > 0) lastBombTime = ts;

        // Move bombs
        for (let bomb of bombs) {
            if (!bomb.exploded) {
                bomb.y += bombFallSpeed;
                if (bomb.y > height * 0.7 && !bomb.exploded) {
                    bomb.exploded = true;
                    bomb.explodeTime = now;
                    // Spawn mini-bullets in a radial pattern
                    for (let j = 0; j < miniBulletCount; j++) {
                        let angle = (2 * Math.PI * j) / miniBulletCount;
                        miniBombs.push({
                            x: bomb.x,
                            y: bomb.y,
                            vx: Math.cos(angle) * miniBulletSpeed,
                            vy: Math.sin(angle) * miniBulletSpeed,
                            exploded: false,
                            explodeTime: now + miniBombDelay
                        });
                    }
                }
            }
        }
        // Remove bombs that have exploded and are off screen
        bombs = bombs.filter(bomb => !bomb.exploded || bomb.y < height + 40);

        // Move mini-bombs
        for (let mb of miniBombs) {
            if (!mb.exploded) {
                mb.x += mb.vx;
                mb.y += mb.vy;
                if (now >= mb.explodeTime && !mb.exploded) {
                    mb.exploded = true;
                    // Spawn bullets in a radial pattern
                    for (let k = 0; k < miniBombExplosionBullets; k++) {
                        let angle = (2 * Math.PI * k) / miniBombExplosionBullets;
                        bullets.push({
                            x: mb.x,
                            y: mb.y,
                            vx: Math.cos(angle) * miniBombSpeed,
                            vy: Math.sin(angle) * miniBombSpeed
                        });
                    }
                }
            }
        }
        // Remove mini-bombs that have exploded or are off screen
        miniBombs = miniBombs.filter(mb => !mb.exploded && mb.x > -40 && mb.x < width + 40 && mb.y > -40 && mb.y < height + 40);

        // Move bullets
        for (let b of bullets) {
            b.x += b.vx;
            b.y += b.vy;
        }
        // Remove bullets that are off screen
        bullets = bullets.filter(b => b.x > -40 && b.x < width + 40 && b.y > -40 && b.y < height + 40);

        // Collision detection
        let playerHit = false;
        // Bombs
        for (let bomb of bombs) {
            if (!bomb.exploded) {
                let dist = Math.hypot(px - bomb.x, py - bomb.y);
                if (dist < pr + 24) playerHit = true;
            }
        }
        // Mini-bombs
        for (let mb of miniBombs) {
            if (!mb.exploded) {
                let dist = Math.hypot(px - mb.x, py - mb.y);
                if (dist < pr + 12) playerHit = true;
            }
        }
        // Bullets
        for (let b of bullets) {
            let dist = Math.hypot(px - b.x, py - b.y);
            if (dist < pr + 8) playerHit = true;
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Draw bombs
        for (let bomb of bombs) {
            if (!bomb.exploded) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(bomb.x, bomb.y, 24, 0, 2 * Math.PI);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 12;
                ctx.fill();
                ctx.restore();
            }
        }
        // Draw mini-bombs
        for (let mb of miniBombs) {
            if (!mb.exploded) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(mb.x, mb.y, 12, 0, 2 * Math.PI);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.restore();
            }
        }
        // Draw bullets
        for (let b of bullets) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(b.x, b.y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.restore();
        }

        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
}
function shiftingKnifeArenaAttack(duration = 15, arenaW = 400, arenaH = 300, knifeRate = 1.2, borderW = 700, borderH = 500) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (full border area)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = borderW;
    gameCanvas.height = borderH;
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${borderW / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${borderH / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    let ctx = gameCanvas.getContext('2d');

    // Arena position state (top-left of small arena inside border)
    let ax = Math.random() * (borderW - arenaW);
    let ay = Math.random() * (borderH - arenaH);
    let speed = 2.5;
    let angle = Math.random() * 2 * Math.PI;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;

    // Red diamond (player) - position relative to small arena
    let px = arenaW / 2, py = arenaH / 2;
    const pr = 18;
    const pspeed = 3;
    const keys = { up: false, down: false, left: false, right: false };

    // Knives (all positions in large arena coordinates)
    let knives = [];
    const knifeLength = 64, knifeWidth = 16, knifeSpeed = 6;
    let lastKnifeTime = 0;

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }

function spawnKnife() {
    // Pick a random edge and a random point on that edge (relative to BIG arena)
    const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
    let spawnX, spawnY, angle;
    if (edge === 0) { // top
        spawnX = Math.random() * borderW;
        spawnY = 0;
    } else if (edge === 1) { // right
        spawnX = borderW;
        spawnY = Math.random() * borderH;
    } else if (edge === 2) { // bottom
        spawnX = Math.random() * borderW;
        spawnY = borderH;
    } else { // left
        spawnX = 0;
        spawnY = Math.random() * borderH;
    }
    // Compute target (player) position in large arena coordinates
    let playerX = ax + px;
    let playerY = ay + py;
    // Optionally, bias angle toward player
    if (Math.random() < 0.7) {
        const dx = playerX - spawnX, dy = playerY - spawnY;
        angle = Math.atan2(dy, dx);
    } else {
        // Random angle toward inside
        if (edge === 0) angle = Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 3;
        else if (edge === 1) angle = Math.PI + (Math.random() - 0.5) * Math.PI / 3;
        else if (edge === 2) angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 3;
        else angle = 0 + (Math.random() - 0.5) * Math.PI / 3;
    }
    // Store spawn position and movement in large arena coordinates
    knives.push({
        x: spawnX,
        y: spawnY,
        angle: angle,
        x0: spawnX,
        y0: spawnY
    });
}

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            running = false;
            return;
        }
        // End after duration
        let now = Date.now();
        if (now >= endTime) {
            running = false;
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            if (overlay.parentNode) overlay.remove();
            if (
                player &&
                player.subtabs &&
                player.subtabs["ma"] &&
                player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
                player.ma &&
                player.ma.currentDepth != 0
            ) {
                // ...existing code...
            } else {
                // ...existing code...
            }
            return;
        }
        // Move arena (DVD bounce logic)
        ax += vx;
        ay += vy;
        if (ax <= 0) { ax = 0; vx = Math.abs(vx); }
        if (ax >= borderW - arenaW) { ax = borderW - arenaW; vx = -Math.abs(vx); }
        if (ay <= 0) { ay = 0; vy = Math.abs(vy); }
        if (ay >= borderH - arenaH) { ay = borderH - arenaH; vy = -Math.abs(vy); }

        // Player movement (inside the small arena only)
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(arenaW - pr, px));
        py = Math.max(pr, Math.min(arenaH - pr, py));

        // Spawn knives
        if (!lastKnifeTime) lastKnifeTime = ts;
        const knivesToSpawn = Math.floor(((ts - lastKnifeTime) / 1000) * knifeRate);
        for (let i = 0; i < knivesToSpawn; i++) {
            spawnKnife();
        }
        if (knivesToSpawn > 0) lastKnifeTime = ts;

        // Move knives (in large arena coordinates)
        for (let k of knives) {
            k.x += Math.cos(k.angle) * knifeSpeed;
            k.y += Math.sin(k.angle) * knifeSpeed;
        }
        // Remove knives that go off screen (large arena)
        knives = knives.filter(k =>
            k.x > -knifeLength && k.x < borderW + knifeLength &&
            k.y > -knifeLength && k.y < borderH + knifeLength
        );

        // Check collision (player in small arena, knives in large arena)
        let playerHit = false;
        let playerX = ax + px;
        let playerY = ay + py;
        for (let k of knives) {
            const dx = Math.cos(k.angle), dy = Math.sin(k.angle);
            const t = ((playerX - k.x) * dx + (playerY - k.y) * dy);
            if (t >= 0 && t <= knifeLength) {
                const perp = Math.abs((playerX - k.x) * dy - (playerY - k.y) * dx);
                if (perp < pr + knifeWidth / 2) {
                    playerHit = true;
                    break;
                }
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Draw the full arena border (large arena, dashed, glowing)
        ctx.save();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 12;
        ctx.setLineDash([16, 12]);
        ctx.strokeRect(0, 0, borderW, borderH);
        ctx.setLineDash([]);
        ctx.restore();

        // Draw the small arena (solid, glowing)
        ctx.save();
        ctx.strokeStyle = '#0ff';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#0ff';
        ctx.shadowBlur = 16;
        ctx.strokeRect(ax, ay, arenaW, arenaH);
        ctx.restore();

        // Draw knives and their path lines (all in large arena coordinates)
        for (let k of knives) {
            // Path line (static in large arena)
            ctx.save();
            ctx.strokeStyle = '#f22';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(k.x0, k.y0);
            let angle = k.angle;
            let intersections = [];
            // Left border (x=0)
            if (Math.cos(angle) !== 0) {
                let t = (0 - k.x0) / Math.cos(angle);
                let y = k.y0 + t * Math.sin(angle);
                if (y >= 0 && y <= borderH && t > 0)
                    intersections.push({ x: 0, y: y, t: t });
            }
            // Right border (x=borderW)
            if (Math.cos(angle) !== 0) {
                let t = (borderW - k.x0) / Math.cos(angle);
                let y = k.y0 + t * Math.sin(angle);
                if (y >= 0 && y <= borderH && t > 0)
                    intersections.push({ x: borderW, y: y, t: t });
            }
            // Top border (y=0)
            if (Math.sin(angle) !== 0) {
                let t = (0 - k.y0) / Math.sin(angle);
                let x = k.x0 + t * Math.cos(angle);
                if (x >= 0 && x <= borderW && t > 0)
                    intersections.push({ x: x, y: 0, t: t });
            }
            // Bottom border (y=borderH)
            if (Math.sin(angle) !== 0) {
                let t = (borderH - k.y0) / Math.sin(angle);
                let x = k.x0 + t * Math.cos(angle);
                if (x >= 0 && x <= borderW && t > 0)
                    intersections.push({ x: x, y: borderH, t: t });
            }
            let farX = k.x0 + Math.cos(angle) * 5000;
            let farY = k.y0 + Math.sin(angle) * 5000;
            if (intersections.length > 0) {
                intersections.sort((a, b) => a.t - b.t);
                farX = intersections[0].x;
                farY = intersections[0].y;
            }
            ctx.lineTo(farX, farY);
            ctx.stroke();
            ctx.restore();
            // Knife
            ctx.save();
            ctx.translate(k.x, k.y);
            ctx.rotate(k.angle);
            ctx.beginPath();
            ctx.moveTo(-knifeLength / 2, -knifeWidth / 2);
            ctx.lineTo(knifeLength / 2, 0);
            ctx.lineTo(-knifeLength / 2, knifeWidth / 2);
            ctx.closePath();
            ctx.fillStyle = '#ccc';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
        }

        // Draw player (red diamond, relative to small arena, offset by ax, ay)
        ctx.save();
        ctx.translate(ax + px, ay + py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

        setTimeout(() => {
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
        running = false; // Stop the animation loop
        // Only return to Fight tab if you are still in depth 
        if (
            player &&
            player.subtabs &&
            player.subtabs["ma"] &&
            player.subtabs["ma"]["stuff"] == "Bullet Hell" &&
            player.ma &&
            player.ma.currentDepth != 0
        ) {
            player.subtabs["ma"]["stuff"] = "Fight";
        } else
        {
            player.ma.inBlackHeart = false
            toggleOpt('menuShown')

            player.subtabs["ma"]["stuff"] = "Black Heart"

        }
    }, duration * 1000);
}

function ultimateAttackPhase1(duration = 15) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (full screen)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    gameCanvas.style.background = "rgba(0,0,0,0)";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "0px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `0px`;
    gameCanvas.style.top = `0px`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    let ctx = gameCanvas.getContext('2d');

    // Red diamond (player)
    let px = (window.ultimateAttackPlayerPos && window.ultimateAttackPlayerPos.x != null) ? window.ultimateAttackPlayerPos.x : gameCanvas.width / 2;
let py = (window.ultimateAttackPlayerPos && window.ultimateAttackPlayerPos.y != null) ? window.ultimateAttackPlayerPos.y : gameCanvas.height / 2;
    const pr = 18;
    const pspeed = 4;
    const keys = { up: false, down: false, left: false, right: false };

    // Bullets
    let bullets = window.ultimateAttackProjectiles.bullets;
    const bulletRadius = 12;
    const bulletSpeed = 5;
    let lastBulletTime = 0;
    const bulletRate = 18; // bullets per second

    // Knives
    let knives = window.ultimateAttackProjectiles.knives;
    const knifeLength = 64, knifeWidth = 16, knifeSpeed = 8;
    let lastKnifeTime = 0;
    const knifeRate = 1.5; // knives per second

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
for (let i = 0; i < player.ma.health.length; i++) {
    const hp = player.ma.health[i];
    const isAlive = !player.ma.deadCharacters[i] && (
        (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
    );
    if (isAlive) return false;
}
// All characters are dead, trigger Black Heart logic
player.ma.inBlackHeart = false;
toggleOpt('menuShown');
player.subtabs["ma"]["stuff"] = "Dead";
return true;
    }
    function cleanup() {
        running = false;
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
    }

    function spawnBullet() {
        // Rain from random x at top, straight down
        let x = Math.random() * gameCanvas.width;
        let y = -bulletRadius * 2;
        bullets.push({ x, y, vx: 0, vy: bulletSpeed });
    }

    function spawnKnife() {
        // Random edge, aim at player
        
        const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let x, y, angle;
        if (edge === 0) { // top
            x = Math.random() * gameCanvas.width;
            y = -knifeLength;
        } else if (edge === 1) { // right
            x = gameCanvas.width + knifeLength;
            y = Math.random() * gameCanvas.height;
        } else if (edge === 2) { // bottom
            x = Math.random() * gameCanvas.width;
            y = gameCanvas.height + knifeLength;
        } else { // left
            x = -knifeLength;
            y = Math.random() * gameCanvas.height;
        }
        angle = Math.atan2(py - y, px - x);
        knives.push({ x, y, angle, x0: x, y0: y });
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            cleanup();
            return;
        }
        // End after duration
        let now = Date.now();
        if (now >= endTime) {
            cleanup();
            // Next phase should be called here by the master function
            return;
        }
        // Player movement
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        if (!running) return; // Prevent further bullet/knife spawn after cleanup

        // Spawn bullets
        if (!lastBulletTime) lastBulletTime = ts;
        let bulletsToSpawn = Math.floor(((ts - lastBulletTime) / 1000) * bulletRate);
        for (let i = 0; i < bulletsToSpawn; i++) spawnBullet();
        if (bulletsToSpawn > 0) lastBulletTime = ts;

        // Spawn knives
        if (!lastKnifeTime) lastKnifeTime = ts;
        let knivesToSpawn = Math.floor(((ts - lastKnifeTime) / 1000) * knifeRate);
        for (let i = 0; i < knivesToSpawn; i++) spawnKnife();
        if (knivesToSpawn > 0) lastKnifeTime = ts;

        // Move bullets
        for (let b of bullets) {
            b.x += b.vx;
            b.y += b.vy;
        }
        bullets = bullets.filter(b => b.y < gameCanvas.height + bulletRadius * 2);

        // Move knives
        for (let k of knives) {
            k.x += Math.cos(k.angle) * knifeSpeed;
            k.y += Math.sin(k.angle) * knifeSpeed;
        }
        knives = knives.filter(k => k.x > -knifeLength && k.x < gameCanvas.width + knifeLength && k.y > -knifeLength && k.y < gameCanvas.height + knifeLength);

        // Check collisions
        let playerHit = false;
        for (let b of bullets) {
            let dist = Math.hypot(px - b.x, py - b.y);
            if (dist < pr + bulletRadius) {
                playerHit = true;
                break;
            }
        }
        for (let k of knives) {
            const dx = Math.cos(k.angle), dy = Math.sin(k.angle);
            const t = ((px - k.x) * dx + (py - k.y) * dy);
            if (t >= 0 && t <= knifeLength) {
                const perp = Math.abs((px - k.x) * dy - (py - k.y) * dx);
                if (perp < pr + knifeWidth / 2) {
                    playerHit = true;
                    break;
                }
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // Draw bullets
        ctx.save();
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#fff";
        for (let b of bullets) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, bulletRadius, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.restore();
        // Draw knives and their path lines
        for (let k of knives) {
            ctx.save();
            ctx.strokeStyle = '#f22';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(k.x0, k.y0);
            let farX = k.x0 + Math.cos(k.angle) * (gameCanvas.width + gameCanvas.height);
            let farY = k.y0 + Math.sin(k.angle) * (gameCanvas.width + gameCanvas.height);
            ctx.lineTo(farX, farY);
            ctx.stroke();
            ctx.restore();
            ctx.save();
            ctx.translate(k.x, k.y);
            ctx.rotate(k.angle);
            ctx.beginPath();
            ctx.moveTo(-knifeLength / 2, -knifeWidth / 2);
            ctx.lineTo(knifeLength / 2, 0);
            ctx.lineTo(-knifeLength / 2, knifeWidth / 2);
            ctx.closePath();
            ctx.fillStyle = '#ccc';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
        }
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

            window.ultimateAttackPlayerPos = { x: px, y: py };
    requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
    window.ultimateAttackPlayerPos = { x: px, y: py };
}
function ultimateAttackPhase2(duration = 15) {
    window.lastDamageTime = 0;
    let running = true;
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;

    // Remove previous instance if exists
    const old = document.getElementById("diamond-boss-overlay");
    if (old) old.remove();

    // Switch to Bullet Hell tab
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "diamond-boss-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.1)";
    overlay.style.zIndex = "100000";
    overlay.style.pointerEvents = "none";

    // Canvas for the minigame box (full screen)
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    gameCanvas.style.background = "rgba(0,0,0,0)";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "0px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `0px`;
    gameCanvas.style.top = `0px`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    let ctx = gameCanvas.getContext('2d');

    // Red diamond (player)
let px = (window.ultimateAttackPlayerPos && window.ultimateAttackPlayerPos.x != null) ? window.ultimateAttackPlayerPos.x : gameCanvas.width / 2;
let py = (window.ultimateAttackPlayerPos && window.ultimateAttackPlayerPos.y != null) ? window.ultimateAttackPlayerPos.y : gameCanvas.height / 2;
    const pr = 18;
    const pspeed = 4;
    const keys = { up: false, down: false, left: false, right: false };

    // Spiral bullets/knives
    let projectiles = [];
    const projRadius = 12;
    const projSpeed = 7;
    let spiralAngle = 0;
    let lastSpiralTime = 0;
    const spiralRate = 0.09; // radians per frame
    const spiralFireInterval = 80; // ms between spiral shots
    const spiralKnives = true; // mix knives and bullets

    let bullets = window.ultimateAttackProjectiles.bullets;
const bulletRadius = 12;
const bulletSpeed = 7;
let lastSpreadTime = 0;
const spreadInterval = 1000; // ms
const spreadCount = 7; // bullets per spread
const spreadAngle = Math.PI / 3; // 60 degrees

    // Big symbol (center)
    const symbolX = gameCanvas.width / 2;
    const symbolY = gameCanvas.height / 2;
    const symbolR = 64;

    // White diamond hazards
    let diamonds = [
        { x: gameCanvas.width * 0.3, y: gameCanvas.height * 0.3, vx: 3, vy: 2.5, r: 28 },
        { x: gameCanvas.width * 0.7, y: gameCanvas.height * 0.7, vx: -2.5, vy: -3, r: 28 },
        { x: gameCanvas.width * 0.5, y: gameCanvas.height * 0.5, vx: -2.5, vy: -3, r: 28 }
    ];
    const diamondColor = "#fff";
    const diamondShadow = "#fff";
    const diamondBounceMargin = 8;
    const diamondDelay = 0; // ms before diamonds become active
    let diamondsActive = false;
    setTimeout(() => { diamondsActive = true; }, diamondDelay);

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }

    function allCharactersDead() {
if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
for (let i = 0; i < player.ma.health.length; i++) {
    const hp = player.ma.health[i];
    const isAlive = !player.ma.deadCharacters[i] && (
        (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
    );
    if (isAlive) return false;
}
// All characters are dead, trigger Black Heart logic
player.ma.inBlackHeart = false;
toggleOpt('menuShown');
player.subtabs["ma"]["stuff"] = "Dead";
return true;
    }

    function shootSpreadAtPlayer() {
    let dx = px - symbolX;
    let dy = py - symbolY;
    let baseAngle = Math.atan2(dy, dx);
    for (let i = 0; i < spreadCount; i++) {
        let angle = baseAngle + (i - (spreadCount - 1) / 2) * (spreadAngle / (spreadCount - 1));
        let vx = Math.cos(angle) * bulletSpeed;
        let vy = Math.sin(angle) * bulletSpeed;
        bullets.push({ x: symbolX, y: symbolY, vx, vy });
    }
}

    function cleanup() {
        running = false;
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        if (overlay.parentNode) overlay.remove();
    }

    function spawnSpiralProjectile() {
        // Alternate between bullet and knife
        let isKnife = spiralKnives && (Math.floor(spiralAngle / Math.PI * 2) % 2 === 0);
        let angle = spiralAngle;
        let speed = projSpeed;
        let x = symbolX + Math.cos(angle) * symbolR;
        let y = symbolY + Math.sin(angle) * symbolR;
        projectiles.push({ x, y, angle, speed, isKnife, x0: x, y0: y });
    }

    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) {
            cleanup();
            return;
        }
        // End after duration
        let now = Date.now();
        if (now >= endTime) {
            cleanup();
            // Next phase should be called here by the master function
            return;
        }
        // Player movement
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));

        if (!lastSpreadTime) lastSpreadTime = ts;
if (ts - lastSpreadTime > spreadInterval) {
    shootSpreadAtPlayer();
    lastSpreadTime = ts;
}

// Spiral fire
if (!lastSpiralTime) lastSpiralTime = ts;
if (ts - lastSpiralTime > spiralFireInterval) {
    // Fire a spiral: shoot 3 knives per burst, spaced evenly
    for (let i = 0; i < 3; i++) {
        let angle = spiralAngle + (i * (2 * Math.PI / 3));
        let isKnife = true;
        let speed = projSpeed;
        let x = symbolX + Math.cos(angle) * symbolR;
        let y = symbolY + Math.sin(angle) * symbolR;
        projectiles.push({ x, y, angle, speed, isKnife, x0: x, y0: y });
    }
    spiralAngle += spiralRate * 16;
    lastSpiralTime = ts;
}
        // Move projectiles
        for (let p of projectiles) {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
        }
        projectiles = projectiles.filter(p => p.x > -100 && p.x < gameCanvas.width + 100 && p.y > -100 && p.y < gameCanvas.height + 100);
        for (let b of bullets) {
    b.x += b.vx;
    b.y += b.vy;
}
        // Move diamonds (hazards)
        if (diamondsActive) {
            for (let d of diamonds) {
                d.x += d.vx;
                d.y += d.vy;
                if (d.x < d.r + diamondBounceMargin) { d.x = d.r + diamondBounceMargin; d.vx *= -1; }
                if (d.x > gameCanvas.width - d.r - diamondBounceMargin) { d.x = gameCanvas.width - d.r - diamondBounceMargin; d.vx *= -1; }
                if (d.y < d.r + diamondBounceMargin) { d.y = d.r + diamondBounceMargin; d.vy *= -1; }
                if (d.y > gameCanvas.height - d.r - diamondBounceMargin) { d.y = gameCanvas.height - d.r - diamondBounceMargin; d.vy *= -1; }
            }
        }

        // Check collisions
        let playerHit = false;
        // Projectiles
        for (let p of projectiles) {
            if (p.isKnife) {
                // Knife: line segment collision
                const dx = Math.cos(p.angle), dy = Math.sin(p.angle);
                const t = ((px - p.x) * dx + (py - p.y) * dy);
                if (t >= 0 && t <= 64) {
                    const perp = Math.abs((px - p.x) * dy - (py - p.y) * dx);
                    if (perp < pr + 8) {
                        playerHit = true;
                        break;
                    }
                }
            } else {
                // Bullet: circle collision
                let dist = Math.hypot(px - p.x, py - p.y);
                if (dist < pr + projRadius) {
                    playerHit = true;
                    break;
                }
            }
        }
        for (let b of bullets) {
    let dist = Math.hypot(px - b.x, py - b.y);
    if (dist < pr + bulletRadius) { playerHit = true; break; }
}
bullets = bullets.filter(b => b.x > -100 && b.x < gameCanvas.width + 100 && b.y > -100 && b.y < gameCanvas.height + 100);
        // Diamonds
        if (!playerHit && diamondsActive) {
            for (let d of diamonds) {
                let dist = Math.hypot(px - d.x, py - d.y);
                if (dist < pr + d.r - 2) {
                    playerHit = true;
                    break;
                }
            }
        }
        if (playerHit) {
            takeDamage();
        }

        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
// Draw big symbol (⊘)
ctx.save();
ctx.translate(symbolX, symbolY);
ctx.font = 'bold 120px serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.globalAlpha = 0.92;
ctx.shadowColor = '#fff';
ctx.shadowBlur = 32;
ctx.fillStyle = '#fff';
ctx.fillText('⊘', 0, 0);
ctx.globalAlpha = 1;
ctx.shadowBlur = 0;
ctx.lineWidth = 6;
ctx.strokeStyle = '#e22';
ctx.strokeText('⊘', 0, 0);
ctx.restore();
        // Draw a spiral pattern inside
        ctx.save();
        ctx.rotate(spiralAngle);
        ctx.strokeStyle = "#e22";
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, symbolR * 0.7, i * Math.PI / 4, i * Math.PI / 4 + Math.PI / 8);
            ctx.stroke();
        }
        ctx.restore();
        ctx.restore();
        // Draw projectiles
        for (let p of projectiles) {
            if (p.isKnife) {
                ctx.save();
                ctx.strokeStyle = '#f22';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(p.x0, p.y0);
                let farX = p.x0 + Math.cos(p.angle) * (gameCanvas.width + gameCanvas.height);
                let farY = p.y0 + Math.sin(p.angle) * (gameCanvas.width + gameCanvas.height);
                ctx.lineTo(farX, farY);
                ctx.stroke();
                ctx.restore();
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.beginPath();
                ctx.moveTo(-32, -8);
                ctx.lineTo(32, 0);
                ctx.lineTo(-32, 8);
                ctx.closePath();
                ctx.fillStyle = '#ccc';
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 6;
                ctx.fill();
                ctx.restore();
            } else {
                ctx.save();
                ctx.shadowColor = "#fff";
                ctx.shadowBlur = 8;
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(p.x, p.y, projRadius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
            }
        }
        ctx.save();
ctx.shadowColor = "#fff";
ctx.shadowBlur = 8;
ctx.fillStyle = "#fff";
for (let b of bullets) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, bulletRadius, 0, 2 * Math.PI);
    ctx.fill();
}
ctx.restore();
        // Draw diamonds (hazards)
        if (diamondsActive) {
            for (let d of diamonds) {
                ctx.save();
                ctx.translate(d.x, d.y);
                ctx.rotate(Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(0, -d.r);
                ctx.lineTo(d.r, 0);
                ctx.lineTo(0, d.r);
                ctx.lineTo(-d.r, 0);
                ctx.closePath();
                ctx.fillStyle = diamondColor;
                ctx.shadowColor = diamondShadow;
                ctx.shadowBlur = 16;
                ctx.fill();
                ctx.restore();
            }
        }
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        window.ultimateAttackPlayerPos = { x: px, y: py };
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function keydownHandler(e) {
        updateKeys(e, true);
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
}
// --- Ultimate Attack Phase 3: Symbol Lunge, Violent Burst, and Knives ---
function ultimateAttackPhase3(duration = 15) {
    // Phase 4: Big symbol lunges slowly, pulses red, shoots in violent/sparratic bursts, and throws knives (15s)
    // Phase 5: Symbol disappears, then explodes into multiple bullet bursts

    
    
    window.lastDamageTime = 0;
    let running = true;
    let overlay, gameCanvas, ctx;
let px = (window.ultimateAttackPlayerPos && window.ultimateAttackPlayerPos.x != null) ? window.ultimateAttackPlayerPos.x : gameCanvas.width / 2;
let py = (window.ultimateAttackPlayerPos && window.ultimateAttackPlayerPos.y != null) ? window.ultimateAttackPlayerPos.y : gameCanvas.height / 2;
     pr = 18, pspeed = 4, keys = { up: false, down: false, left: false, right: false };
    let symbol = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        r: 64,
        vx: 0,
        vy: 0,
        pulse: 0,
        color: '#fff',
        pulsingRed: false,
        visible: true
    };
    let bullets = window.ultimateAttackProjectiles.bullets;
    let knives = window.ultimateAttackProjectiles.knives;
    let lastBurstTime = 0;
    let burstInterval = 650; // ms between bursts
    let burstBullets = 7 + Math.floor(Math.random() * 4); // 7-10 bullets per burst
    let burstViolence = 0.25 + Math.random() * 0.5; // randomness in burst
    let lastKnifeTime = 0;
    const knifeLength = 64, knifeWidth = 16, knifeSpeed = 8;
    const knifeRate = 1.2; // knives per second
    const bulletSpeed = 8;
    const bulletRadius = 12;
    let lungeCooldown = 0;
    let lungeActive = false;
    let lungeTarget = { x: 0, y: 0 };
    let lungeTimer = 0;
    let lungeDuration = 1200; // ms (much slower lunge)
    let lungeSpeed = 7; // much slower
    let phaseStart = Date.now();
    let phaseEnd = phaseStart + duration * 1000;
    let phase = 4;
    let burstDone = false;
    let explosionBursts = 4;
    let explosionBurstCount = 0;
    let explosionBurstInterval = 220;
    let explosionBurstTimer = 0;
    let rainLastTime = 0;
const rainBulletRadius = 12;
const rainBulletSpeed = 5;
const rainBulletRate = 12; // bullets per second (same as phase 1)
function spawnRainBullet() {
    // Rain from random x at top, straight down
    let x = Math.random() * gameCanvas.width;
    let y = -rainBulletRadius * 2;
    bullets.push({ x, y, vx: 0, vy: rainBulletSpeed, rain: true });
}

    function removeOverlay() {
        if (overlay && overlay.parentNode) overlay.remove();
    }
    function cleanup() {
        running = false;
        window.removeEventListener("keydown", keydownHandler);
        window.removeEventListener("keyup", keyupHandler);
        removeOverlay();
    }
    function allCharactersDead() {
        if (!player || !player.ma || !Array.isArray(player.ma.health) || !Array.isArray(player.ma.deadCharacters)) return true;
        for (let i = 0; i < player.ma.health.length; i++) {
            const hp = player.ma.health[i];
            const isAlive = !player.ma.deadCharacters[i] && (
                (typeof hp === "object" && typeof hp.gt === "function") ? hp.gt(0) : hp > 0
            );
            if (isAlive) return false;
        }
        return true;
    }
    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = isDown;
    }
    function keydownHandler(e) { updateKeys(e, true); e.preventDefault(); }
    function keyupHandler(e) { updateKeys(e, false); e.preventDefault(); }

    function setupOverlay() {
        removeOverlay();
        overlay = document.createElement("div");
        overlay.id = "diamond-boss-overlay";
        overlay.style.position = "fixed";
        overlay.style.left = "0";
        overlay.style.top = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.background = "rgba(0,0,0,0.1)";
        overlay.style.zIndex = "100000";
        overlay.style.pointerEvents = "none";
        gameCanvas = document.createElement("canvas");
        gameCanvas.width = window.innerWidth;
        gameCanvas.height = window.innerHeight;
        gameCanvas.style.background = "rgba(0,0,0,0)";
        gameCanvas.style.border = "2px solid #fff";
        gameCanvas.style.borderRadius = "0px";
        gameCanvas.style.boxShadow = "0 0 32px #000";
        gameCanvas.style.position = "absolute";
        gameCanvas.style.left = `0px`;
        gameCanvas.style.top = `0px`;
        gameCanvas.style.zIndex = "100001";
        overlay.appendChild(gameCanvas);
        document.body.appendChild(overlay);
        ctx = gameCanvas.getContext('2d');
    }

    function shootBurstAtPlayer() {
        let dx = px - symbol.x;
        let dy = py - symbol.y;
        let baseAngle = Math.atan2(dy, dx);
        for (let i = 0; i < burstBullets; i++) {
            let spread = (i - (burstBullets - 1) / 2) * burstViolence;
            let angle = baseAngle + spread + (Math.random() - 0.5) * 0.18;
            let vx = Math.cos(angle) * bulletSpeed * (0.9 + Math.random() * 0.3);
            let vy = Math.sin(angle) * bulletSpeed * (0.9 + Math.random() * 0.3);
            bullets.push({ x: symbol.x, y: symbol.y, vx, vy });
        }
        // Randomize next burst
        burstBullets = 7 + Math.floor(Math.random() * 4);
        burstViolence = 0.25 + Math.random() * 0.5;
    }
    function spawnKnife() {
        // Pick a random edge and a random point on that edge
        const edge = Math.floor(Math.random() * 4);
        let x, y, angle;
        if (edge === 0) { // top
            x = Math.random() * gameCanvas.width;
            y = -knifeLength;
        } else if (edge === 1) { // right
            x = gameCanvas.width + knifeLength;
            y = Math.random() * gameCanvas.height;
        } else if (edge === 2) { // bottom
            x = Math.random() * gameCanvas.width;
            y = gameCanvas.height + knifeLength;
        } else { // left
            x = -knifeLength;
            y = Math.random() * gameCanvas.height;
        }
        angle = Math.atan2(py - y, px - x);
        knives.push({ x, y, angle, x0: x, y0: y });
    }
    function doLunge() {
        lungeActive = true;
        lungeTimer = lungeDuration;
        lungeTarget.x = px;
        lungeTarget.y = py;
        let dx = lungeTarget.x - symbol.x;
        let dy = lungeTarget.y - symbol.y;
        let dist = Math.hypot(dx, dy);
        symbol.vx = (dx / dist) * lungeSpeed;
        symbol.vy = (dy / dist) * lungeSpeed;
        symbol.pulsingRed = true;
    }
    function updateLunge(dt) {
        if (!lungeActive) return;
        symbol.x += symbol.vx;
        symbol.y += symbol.vy;
        lungeTimer -= dt;
        if (lungeTimer <= 0) {
            lungeActive = false;
            symbol.vx = 0;
            symbol.vy = 0;
            symbol.pulsingRed = false;
            lungeCooldown = 1200 + Math.random() * 800;
        }
    }
    function animate(ts) {
        if (!running) return;
        if (allCharactersDead()) { cleanup(); return; }
        let now = Date.now();
        let dt = ts - (animate.lastTs || ts);
        animate.lastTs = ts;
        // End of phase 4, start phase 5
        if (phase === 4 && now >= phaseEnd) {
            phase = 5;
            phaseStart = now;
            symbol.visible = false;
            burstDone = false;
            explosionBurstCount = 0;
            explosionBurstTimer = 0;
        }
        // Player movement
        let dx = 0, dy = 0;
        if (keys.up) dy -= pspeed;
        if (keys.down) dy += pspeed;
        if (keys.left) dx -= pspeed;
        if (keys.right) dx += pspeed;
        px += dx;
        py += dy;
        px = Math.max(pr, Math.min(gameCanvas.width - pr, px));
        py = Math.max(pr, Math.min(gameCanvas.height - pr, py));
        // Phase 4: Symbol lunges, pulses, shoots in bursts, throws knives
        if (phase === 4) {
            // Lunge logic
            if (!lungeActive && lungeCooldown <= 0) {
                doLunge();
            } else if (!lungeActive) {
                lungeCooldown -= dt;
            }
            updateLunge(dt);
            // Pulse
            symbol.pulse += dt * 0.008;
            // Shoot burst at player
            if (!lastBurstTime) lastBurstTime = ts;
            if (ts - lastBurstTime > burstInterval) {
                shootBurstAtPlayer();
                lastBurstTime = ts;
            }
            // Spawn knives
            if (!lastKnifeTime) lastKnifeTime = ts;
            let knivesToSpawn = Math.floor(((ts - lastKnifeTime) / 1000) * knifeRate);
            for (let i = 0; i < knivesToSpawn; i++) spawnKnife();
            if (knivesToSpawn > 0) lastKnifeTime = ts;
        }
        // Phase 5: Symbol disappears, then explodes into multiple bullet bursts
        if (phase === 5 && !burstDone) {
            explosionBurstTimer += dt;
            if (explosionBurstCount < explosionBursts && explosionBurstTimer > explosionBurstInterval) {
                let N = 32;
                let baseAngle = Math.random() * Math.PI * 2;
                for (let i = 0; i < N; i++) {
                    let angle = baseAngle + (2 * Math.PI * i) / N;
                    let vx = Math.cos(angle) * bulletSpeed * (1.1 + Math.random() * 0.3);
                    let vy = Math.sin(angle) * bulletSpeed * (1.1 + Math.random() * 0.3);
                    bullets.push({ x: symbol.x, y: symbol.y, vx, vy });
                }
                explosionBurstCount++;
                explosionBurstTimer = 0;
            }
            if (explosionBurstCount >= explosionBursts) {
                burstDone = true;
                setTimeout(() => { cleanup(); }, 1200);
            }
        }
        // Move bullets
        for (let b of bullets) {
            b.x += b.vx;
            b.y += b.vy;
        }
        bullets = bullets.filter(b => b.x > -100 && b.x < gameCanvas.width + 100 && b.y > -100 && b.y < gameCanvas.height + 100);
        // Move knives
        for (let k of knives) {
            k.x += Math.cos(k.angle) * knifeSpeed;
            k.y += Math.sin(k.angle) * knifeSpeed;
        }
        knives = knives.filter(k => k.x > -knifeLength && k.x < gameCanvas.width + knifeLength && k.y > -knifeLength && k.y < gameCanvas.height + knifeLength);
        // Check collisions
        let playerHit = false;
        for (let b of bullets) {
            let dist = Math.hypot(px - b.x, py - b.y);
            if (dist < pr + bulletRadius) { playerHit = true; break; }
        }
        for (let k of knives) {
            const dx = Math.cos(k.angle), dy = Math.sin(k.angle);
            const t = ((px - k.x) * dx + (py - k.y) * dy);
            if (t >= 0 && t <= knifeLength) {
                const perp = Math.abs((px - k.x) * dy - (py - k.y) * dx);
                if (perp < pr + knifeWidth / 2) { playerHit = true; break; }
            }
        }
        // --- Bullet rain logic (from phase 1) ---
if (!rainLastTime) rainLastTime = ts;
let rainToSpawn = Math.floor(((ts - rainLastTime) / 1000) * rainBulletRate);
for (let i = 0; i < rainToSpawn; i++) spawnRainBullet();
if (rainToSpawn > 0) rainLastTime = ts;
// --- End bullet rain logic ---
        // Symbol collision (lunge)
        if (phase === 4 && symbol.visible) {
            let dist = Math.hypot(px - symbol.x, py - symbol.y);
            if (dist < pr + symbol.r * 0.8) playerHit = true;
        }
        if (playerHit) takeDamage();
        // Draw everything
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // Draw symbol (if visible)
        if (symbol.visible) {
            ctx.save();
            ctx.translate(symbol.x, symbol.y);
            let pulseScale = 1 + 0.18 * Math.sin(symbol.pulse * 2);
            ctx.scale(pulseScale, pulseScale);
            ctx.font = 'bold 120px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.globalAlpha = 0.92;
            ctx.shadowColor = symbol.pulsingRed ? '#e22' : '#fff';
            ctx.shadowBlur = 32;
            ctx.fillStyle = symbol.pulsingRed ? '#e22' : '#fff';
            ctx.fillText('⊘', 0, 0);
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            ctx.lineWidth = 6;
            ctx.strokeStyle = symbol.pulsingRed ? '#fff' : '#e22';
            ctx.strokeText('⊘', 0, 0);
            ctx.restore();
        }
        // Draw bullets
        ctx.save();
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#fff";
        for (let b of bullets) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, bulletRadius, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.restore();
        // Draw knives and their path lines
        for (let k of knives) {
            ctx.save();
            ctx.strokeStyle = '#f22';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(k.x0, k.y0);
            let farX = k.x0 + Math.cos(k.angle) * (gameCanvas.width + gameCanvas.height);
            let farY = k.y0 + Math.sin(k.angle) * (gameCanvas.width + gameCanvas.height);
            ctx.lineTo(farX, farY);
            ctx.stroke();
            ctx.restore();
            ctx.save();
            ctx.translate(k.x, k.y);
            ctx.rotate(k.angle);
            ctx.beginPath();
            ctx.moveTo(-knifeLength / 2, -knifeWidth / 2);
            ctx.lineTo(knifeLength / 2, 0);
            ctx.lineTo(-knifeLength / 2, knifeWidth / 2);
            ctx.closePath();
            ctx.fillStyle = '#ccc';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
        }
        // Draw player (red diamond)
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -pr);
        ctx.lineTo(pr, 0);
        ctx.lineTo(0, pr);
        ctx.lineTo(-pr, 0);
        ctx.closePath();
        ctx.fillStyle = "#e22";
        ctx.shadowColor = "#e22";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        window.ultimateAttackPlayerPos = { x: px, y: py };
        requestAnimationFrame(animate);
    }
    // Start
    if (player && player.subtabs && player.subtabs["ma"]) {
        player.subtabs["ma"]["stuff"] = "Bullet Hell";
    }
    setupOverlay();
    px = window.innerWidth / 2;
    py = window.innerHeight * 0.8;
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
    requestAnimationFrame(animate);
}
// ...existing code...

function ultimateAttackSequence() {
    // Helper: wait for overlay to disappear (phase end) or all characters dead
    window.ultimateAttackProjectiles = { bullets: [], knives: [] };
    let sequenceRunning = true;
    function waitForOverlayEndOrDeath(callback) {
        const check = () => {
            const overlay = document.getElementById("diamond-boss-overlay");
            if (!sequenceRunning) return; // Sequence forcibly ended
            if (!overlay) {
                callback();
            } else if (typeof allCharactersDead === 'function' && allCharactersDead()) {
                sequenceRunning = false;
                // Remove overlay if still present
                if (overlay && overlay.parentNode) overlay.remove();
                // Optionally clear projectiles
                window.ultimateAttackProjectiles = { bullets: [], knives: [] };
                // End sequence
                return;
            } else {
                setTimeout(check, 100);
            }
        };
        check();
    }
    ultimateAttackPhase1(15);
    waitForOverlayEndOrDeath(() => {
        if (!sequenceRunning) return;
        ultimateAttackPhase2(15);
        waitForOverlayEndOrDeath(() => {
            if (!sequenceRunning) return;
            ultimateAttackPhase3(17);

        });
    });
    setTimeout(() => {
        // All characters are still alive after 49 seconds
        if (player.subtabs["ma"]["stuff"] == "Bullet Hell" && player.ma.currentCelestialiteType == 25)
        {
            player.ma.matosDefeated = true
            player.ma.matosFightActive = false

           player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(700)
           player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(300)
           player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(50)
           player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(5)

           player.subtabs["ma"]["stuff"] = "Win"

        }
        // Or call any function you want here
}, 49000);
}

