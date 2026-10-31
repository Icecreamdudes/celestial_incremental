
function bulletHell(actions, values = {}, exitAction = () => {}) {
    let info = {}
    info.width = values.width || 700
    info.height = values.height || 500
    info.duration = values.duration || 12
    info.actions = actions
    info.values = values
    info.exitAction = exitAction
    for (let i in info.actions) {
        if (BHB[i]?.codeFunc) info.actions[i].codeFunc = BHB[i].codeFunc
        if (BHB[i]?.moveFunc) info.actions[i].moveFunc = BHB[i].moveFunc
        info.actions[i].lastTime = false
        info.actions[i]._acc = 0
        info.actions[i]._timer = 0
    }
    info.centerX = values.centerX || window.innerWidth / 2
    info.centerY = values.centerY || window.innerHeight / 2
    info.timed = values.timed || false
    info.endTime = Date.now() + info.duration * 1000
    info.start = values.start || "center"
    info.cellSize = values.cellSize || false
    info.goalType = values.goal || false
    info.goalSize = values.goalSize || 50
    info.subArena = values.subArena || false
    info.subWidth = values.subWidth || 400
    info.subHeight = values.subHeight || 300
    info.subSpeed = values.subSpeed || 3.5
    info.subMove = values.subMove || "bounce"
    info.moveWithSub = values.moveWithSub ?? true
    info.blindness = values.blindness || false  // radius of visibility around player; false = disabled
    info.active = true;
    if (info.values.saveContent) {
        let storedInfo = localStorage.getItem('bhState')
        if (storedInfo) {
            storedInfo = JSON.parse(storedInfo)
            if (storedInfo.px) {
                info.px = storedInfo.px
                info.py = storedInfo.py
            }
        }
        if (!info.px) info.values.saveContent = false
    }

    // Check if tabbed in, if not just deal a bunch of damage
    if (player && player.tab && player.tab != "bh") {
        if (player.bh.celestialite.health.lte(0)) return
        if (!BHS[player.bh.currentStage]?.timeStagnation) {
            for (let i = 0; i < 3; i++) {
                player.bh.characters[i].stun = ["hard", new Decimal(info.duration)]
            }
            player.bh.celestialite.stun = ["hard", new Decimal(info.duration)]
        }
        bhAttack(Decimal.mul(player.bh.celestialite.damage, info.duration/3), 3, 0, "allPlayer")
        return
    }

    // Reset immortality frames at start
    window.lastDamageTime = Date.now();
    info.full = options.fullscreen

    // Store state in localStorage so it persists across reloads
    info.startTime = Date.now();
    localStorage.setItem('bhState', JSON.stringify(info));

    // If already active, clear previous overlay and timer
    const bhState = info;
    bhState.active = true;
    
    const old = document.getElementById("bh-overlay")
    if (old) old.remove()

    if (player.subtabs["bh"]["stuff"] != "bullet") {
        if (player.bh.celestialite.health.lte(0)) return
        player.subtabs["bh"]["stuff"] = "bullet";
        pauseUniverseAll(["BH"], "pause", true)
        options.fullscreen = true
    }

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

    // Create the minigame canvas
    const gameCanvas = document.createElement("canvas");
    gameCanvas.width = info.width;
    gameCanvas.height = info.height;
    if (!info.values.transparent) {
        gameCanvas.style.background = "#111";
    } else {
        gameCanvas.style.background = "rgba(0,0,0,0)";
    }
    if (gameCanvas.width != window.innerWidth && gameCanvas.height != window.innerHeight) {
        gameCanvas.style.border = "2px solid #fff";
        gameCanvas.style.borderRadius = "16px";
    }
    if (!options.performanceMode) gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${info.width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${info.height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    info.bossCtx = bossCanvas.getContext('2d');
    info.ctx = gameCanvas.getContext('2d');

    // Persistent offscreen canvases to eliminate per-frame allocations during blindness
    if (info.blindness) {
        info.blindnessOffscreen = document.createElement("canvas");
        info.blindnessOffscreen.width = bossCanvas.width;
        info.blindnessOffscreen.height = bossCanvas.height;
        info.blindnessOffCtx = info.blindnessOffscreen.getContext("2d");

        info.blindnessDark = document.createElement("canvas");
        info.blindnessDark.width = bossCanvas.width;
        info.blindnessDark.height = bossCanvas.height;
        info.blindnessDarkCtx = info.blindnessDark.getContext("2d");
    }

    // Sub-Arena position state (top-left of small arena inside border)
    if (info.subArena) {
        if (info.subMove == "bounce") {
            info.subx = Math.random() * (info.width - info.subWidth);
            info.suby = Math.random() * (info.height - info.subHeight);
        } else if (info.subMove == "right") {
            info.subx = 0;
            info.suby = (info.height - info.subHeight) / 2;
        } else if (info.subMove == "bottom") {
            info.subx = (info.width - info.subWidth) / 2;
            info.suby = 0;
        } else {
            info.subx = (info.width - info.subWidth) / 2;
            info.suby = (info.height - info.subHeight) / 2;
        }
        let subAngle = 0
        if (info.subMove == "bounce") {
            subAngle = Math.random() * 2 * Math.PI;
        } else if (info.subMove == "right") {
            subAngle = 0
        } else if (info.subMove == "bottom") {
            subAngle = Math.PI / 2
        }
        info.subvx = Math.cos(subAngle) * info.subSpeed;
        info.subvy = Math.sin(subAngle) * info.subSpeed;
    }

    if (info.cellSize) {
        // Maze generation (recursive backtracker)
        info.cols = Math.floor(info.width / info.cellSize);
        info.rows = Math.floor(info.height / info.cellSize);
        info.maze = [];
        for (let y = 0; y < info.rows; y++) {
            info.maze[y] = [];
            for (let x = 0; x < info.cols; x++) {
                info.maze[y][x] = { x, y, visited: false, walls: [true, true, true, true] }; // top, right, bottom, left
            }
        }
        info.shuffle = (arr) => {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
        info.carve = (x, y) => {
            info.maze[y][x].visited = true;
            const dirs = info.shuffle([[0, -1, 0], [1, 0, 1], [0, 1, 2], [-1, 0, 3]]); // [dx, dy, wall]
            for (const [dx, dy, wall] of dirs) {
                const nx = x + dx, ny = y + dy;
                if (ny >= 0 && ny < info.rows && nx >= 0 && nx < info.cols && !info.maze[ny][nx].visited) {
                    info.maze[y][x].walls[wall] = false;
                    info.maze[ny][nx].walls[(wall + 2) % 4] = false;
                    info.carve(nx, ny);
                }
            }
        }
        info.carve(0, 0);
    }

    // Player Code (Red Diamond)
    if (info.values.saveContent) {
        // Already assigned earlier
    } else if (info.start == "cell") {
        info.px = info.cellSize / 2
        info.py = info.cellSize / 2;
    } else {
        let playerX = 0
        let playerY = 0
        if (info.subArena) {
            playerX = info.subWidth / 2
            playerY = info.subHeight / 2
        } else {
            playerX = info.width / 2
            playerY = info.height / 2
        }
        if (info.start == "left") playerX = 50
        info.px = playerX
        info.py = playerY
    }
    // Blue-mode (platformer) settings
    info.blueMode = info.values.blueMode || false;
    if (info.blueMode) {
        info.gravity = info.values.gravity ?? 0.6;
        info.jumpStrength = info.values.jumpStrength ?? -12;
        info.vx = 0;
        info.vy = 0;
        info.onGround = true;
    }
    // Green-mode (shield/locked) settings
    info.greenMode = info.values.greenMode || false;
    if (info.greenMode) {
        // shieldDir: 0=E 1=SE 2=S 3=SW 4=W 5=NW 6=N 7=NE
        info.shieldDir    = 6; // start pointing North
        info.shieldRadius = 18 + 14; // pr + gap
        info.shieldArc    = Math.PI * 0.35;
        // Lock player to center
        info.px = info.subArena ? info.subWidth / 2 : info.width / 2;
        info.py = info.subArena ? info.subHeight / 2 : info.height / 2;
    }
    info.pr = 18;
    info.speed = values.speed ?? values.playerSpeed ?? 5.5;
    info.pos = {x: info.px, y: info.py};
    info.keys = {up: false, down: false, left: false, right: false};
info.floatingTexts = [];

    // Hook bhAttack during the bullet hell session
    const originalBhAttack = (typeof window !== "undefined" && typeof window.bhAttack === "function") 
        ? window.bhAttack 
        : (typeof bhAttack === "function" ? bhAttack : null);

window.bhAttack = function(damage, index = 3, slot = 0, target = "randomPlayer", str = "", method = "none", attr = false) {
        // Snapshot health and shield stacks using numeric slot indices (0, 1, 2)
        const chars = player?.bh?.characters;
        const charSnapshots = [0, 1, 2].map(i => {
            const c = chars ? chars[i] : null;
            return {
                hp: c && c.health ? new Decimal(c.health) : new Decimal(0),
                shield: c && c.shield ? new Decimal(c.shield) : new Decimal(0),
                id: c?.id || "none"
            };
        });

        // Execute original Black Heart attack logic
        if (originalBhAttack) {
            originalBhAttack(damage, index, slot, target, str, method, attr);
        }

        if (!info.active || !info.floatingTexts || !player?.bh?.characters) return;

        const events = [];

        for (let i = 0; i < 3; i++) {
            const char = player.bh.characters[i];
            if (!char || char.id === "none") continue;

            const snap = charSnapshots[i];
            const currentHp = char.health ? new Decimal(char.health) : new Decimal(0);
            const currentShield = char.shield ? new Decimal(char.shield) : new Decimal(0);

            // Fetch display name and theme color from BHP
            const charDef = (typeof BHP !== "undefined" && BHP[char.id]) ? BHP[char.id] : null;
            const charName = charDef 
                ? (typeof run === "function" ? run(charDef.name, charDef) : charDef.name) 
                : char.id;
            const charColor = charDef?.color || "#ffffff";

            // 1. Shield absorbed the hit
            if (snap.shield.gt(currentShield)) {
                events.push({
                    text: `⛊ BLOCKED (${charName})`,
                    color: "#60a5fa"
                });
            }
            // 2. Damage dealt through defense
            else if (snap.hp.gt(currentHp)) {
                const lost = snap.hp.sub(currentHp);
                const formattedDmg = typeof format === "function" 
                    ? format(lost) 
                    : (typeof formatSimple === "function" ? formatSimple(lost) : lost.toFixed(0));

                events.push({
                    text: `-${formattedDmg} (${charName})`,
                    color: charColor
                });
            }
            // 3. Negative attribute absorbed into heal
            else if (currentHp.gt(snap.hp)) {
                const healed = currentHp.sub(snap.hp);
                const formattedHeal = typeof format === "function" ? format(healed) : healed.toFixed(0);
                events.push({
                    text: `+${formattedHeal} (${charName})`,
                    color: "#4ade80"
                });
            }
        }

        // Spawn floating text rows stacked above the player
        if (events.length > 0) {
            const drawX = (info.subArena && info.moveWithSub) ? info.subx + info.px : info.px;
            const drawY = (info.subArena && info.moveWithSub) ? info.suby + info.py : info.py;

            events.forEach((evt, idx) => {
                info.floatingTexts.push({
                    text: evt.text,
                    color: evt.color,
                    x: drawX,
                    y: drawY - info.pr - 14 - (idx * 16),
                    life: 55,
                    maxLife: 55
                });
            });
        }
    };
    if (info.goalType) {
        if (info.goalType == "cell") {
            info.goal = {x: info.cols - 1, y: info.rows - 1, d: info.cellSize}
            info.goalRadius = info.cellSize / 2 - 6;
        } else if (info.goalType == "right") {
            info.goal = {x: info.width - (info.goalSize*2), y: info.height / 2, d: info.goalSize}
            info.goalRadius = info.goalSize / 2 - 6;
        }
    }

    // Black box position in global coordinates
    info.boxLeft = gameCanvas.getBoundingClientRect().left;
    info.boxTop = gameCanvas.getBoundingClientRect().top;

    // Bullets
    info.bullets = [];
 
    // Bullet Code
    for (let i in info.actions) {
        if (info.actions[i].codeFunc && (!info.actions[i].duration || Date.now() < info.startTime + (info.actions[i].duration*1000))) info = info.actions[i].codeFunc(info, i)
    }

    function updatePos(e, touch = false) {
        if (touch) e = e.touches[0]
        // Always track mouse position; in blueMode Y is used to set gravity/jump, but not direct vertical movement
        info.pos.x = e.clientX - info.boxLeft
        info.pos.y = e.clientY - info.boxTop
    }

    function updateKeys(e, isDown) {
        if (["ArrowUp", "w", "W"].includes(e.key)) info.keys.up = isDown;
        if (["ArrowDown", "s", "S"].includes(e.key)) info.keys.down = isDown;
        if (["ArrowLeft", "a", "A"].includes(e.key)) info.keys.left = isDown;
        if (["ArrowRight", "d", "D"].includes(e.key)) info.keys.right = isDown;
        // Green-mode: derive shield direction from held keys
        if (info.greenMode && isDown) {
            const u = info.keys.up, d = info.keys.down, l = info.keys.left, r = info.keys.right;
            if      ( u && !d && !l && !r) info.shieldDir = 6; // N
            else if ( u && !d &&  r && !l) info.shieldDir = 7; // NE
            else if (!u && !d &&  r && !l) info.shieldDir = 0; // E
            else if (!u &&  d &&  r && !l) info.shieldDir = 1; // SE
            else if (!u &&  d && !l && !r) info.shieldDir = 2; // S
            else if (!u &&  d &&  l && !r) info.shieldDir = 3; // SW
            else if (!u && !d &&  l && !r) info.shieldDir = 4; // W
            else if ( u && !d &&  l && !r) info.shieldDir = 5; // NW
        }
    }
    
    // Function to spawn a bullet that goes towards the player
    info.shootAtPlayer = (bx, by, id, speed = 5) => {
        // Calculate direction from boss to player (relative to the box)
        let playerGlobalX = info.boxLeft + info.px;
        let playerGlobalY = info.boxTop + info.py;
        if (info.subArena && info.moveWithSub) {
            playerGlobalX += info.subx
            playerGlobalY += info.suby
        }
        const dx = playerGlobalX - bx;
        const dy = playerGlobalY - by;
        const dist = Math.hypot(dx, dy);
        const bulletRadius = info.actions[id]?.bulletRadius ?? 10
        if (dist === 0) return;
        info.bullets.push({
            x: bx,
            y: by,
            vx: (dx / dist) * speed,
            vy: (dy / dist) * speed,
            r: bulletRadius,
            draw(b, bossCtx) {
                bossCtx.beginPath();
                bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                bossCtx.fillStyle = "#fff";
                bossCtx.fill();
            },
        });
    }

    // Fire radial burst at coordinates
    info.fireRadialBurst = (bx, by, id) => {
        const count = info.actions[id]?.bulletsPerBurst || 12;
        const speed = info.actions[id]?.bulletSpeed || 5;
        for (let i = 0; i < count; i++) {
            const angle = (2 * Math.PI * i) / count;
            info.bullets.push({
                x: bx,
                y: by,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: 12,
                draw(b, bossCtx) {
                    bossCtx.beginPath();
                    bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                    bossCtx.fillStyle = "#fff";
                    bossCtx.fill();
                },
            });
        }
    }

    info.fireDiceSpikeRadialBurst = (bx, by, id) => {
        const count = info.actions[id]?.bulletsPerBurst || 12;
        const speed = info.actions[id]?.bulletSpeed || 5;
        for (let i = 0; i < count; i++) {
            const angle = (2 * Math.PI * i) / count;
            info.bullets.push({
                x: bx,
                y: by,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: 30,
                // triangular spike that points along velocity
                color: Math.random() < 0.5 ? '#000' : '#fff',
                draw(b, bossCtx) {
                    const angle = Math.atan2(b.vy, b.vx);
                    bossCtx.save();
                    bossCtx.translate(b.x, b.y);
                    bossCtx.rotate(angle);
                    // triangle
                    bossCtx.beginPath();
                    bossCtx.moveTo(b.r, 0);
                    bossCtx.lineTo(-b.r * 0.6, b.r * 0.7);
                    bossCtx.lineTo(-b.r * 0.6, -b.r * 0.7);
                    bossCtx.closePath();
                    bossCtx.fillStyle = b.color;
                    bossCtx.fill();
                    bossCtx.lineWidth = 2;
                    bossCtx.strokeStyle = (b.color === '#000') ? '#fff' : '#000';
                    bossCtx.stroke();
                    bossCtx.restore();
                }
            });
        }
    }

    // Shoot spread at coordinates
    info.shootSpreadAtPlayer = (bx, by, id) => {
        let dx = info.px - bx + info.boxLeft;
        let dy = info.py - by + info.boxTop;
        let baseAngle = Math.atan2(dy, dx);
        const count = info.actions[id]?.spreadCount || 7;
        const spreadAngle = info.actions[id]?.spreadAngle || (Math.PI / 3);
        const speed = info.actions[id]?.bulletSpeed || 6;
        for (let i = 0; i < count; i++) {
            let angle = baseAngle + (i - (count - 1) / 2) * (spreadAngle / Math.max(1, count - 1));
            let vx = Math.cos(angle) * speed;
            let vy = Math.sin(angle) * speed;
            info.bullets.push({
                x: bx,
                y: by,
                r: 12,
                vx: vx,
                vy: vy,
                draw(b, bossCtx) {
                    bossCtx.beginPath();
                    bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                    bossCtx.fillStyle = "#fff";
                    bossCtx.fill();
                }
            });
        }
    }

    // Shoot spiral from coordinates
    info.spawnSpiralProjectile = (bx, by, br, id) => {
        // Alternate between bullet and knife
        let isKnife = info.actions[id].spiralKnives && (!info.actions[id].spiralBullets || (Math.floor(info.actions[id].spiralAngle/(Math.PI*2)) % 2 === 0));
        let angle = info.actions[id].spiralAngle;
        let speed = info.actions[id].bulletSpeed || 5;
        let x = bx + Math.cos(angle) * br;
        let y = by + Math.sin(angle) * br;
        if (isKnife) {
            let bname = "knife"
            if (info.actions[id].knifeLength >= 100 || info.actions[id].knifeWidth >= 25) bname = "bigKnife"
            info.bullets.push({
                name: bname,
                x: x,
                y: y,
                r: info.actions[id].knifeLength || 64,
                width: info.actions[id].knifeWidth || 16,
                angle: angle,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                draw(b, bossCtx) {
                    // Draw path line (red, thin)
                    bossCtx.save();
                    bossCtx.strokeStyle = '#f22';
                    bossCtx.lineWidth = 2;
                    bossCtx.beginPath();
                    bossCtx.moveTo(b.x, b.y);
                    // Draw line in the direction of the knife, long enough to cross the arena
                    let farX = b.x + Math.cos(b.angle) * (info.width + info.height);
                    let farY = b.y + Math.sin(b.angle) * (info.width + info.height);
                    bossCtx.lineTo(farX, farY);
                    bossCtx.stroke();
                    bossCtx.restore();
                    // Draw knife
                    bossCtx.save();
                    bossCtx.translate(b.x, b.y);
                    bossCtx.rotate(b.angle);
                    bossCtx.beginPath();
                    bossCtx.moveTo(-b.r / 2, -b.width / 2);
                    bossCtx.lineTo(b.r / 2, 0);
                    bossCtx.lineTo(-b.r / 2, b.width / 2);
                    bossCtx.closePath();
                    bossCtx.fillStyle = '#ccc';
                    if (!options.performanceMode) bossCtx.shadowColor = '#fff';
                    if (!options.performanceMode) bossCtx.shadowBlur = 6;
                    bossCtx.fill();
                    bossCtx.restore();
                },
            })
        } else {
            info.bullets.push({
                x: x,
                y: y,
                r: 12,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                draw(b, bossCtx) {
                    bossCtx.beginPath();
                    bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                    bossCtx.fillStyle = "#fff";
                    bossCtx.fill();
                },
            })
        }
    }

    // Spawn knife
    info.spawnKnife = (id) => {
        // Pick a random edge and a random point on that edge
        const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let bx, by, angle;
        const kLen = info.actions[id].knifeLength || 64;
        const kWid = info.actions[id].knifeWidth || 16;
        const kSpd = info.actions[id].enemySpeed || 6;
        if (edge === 0) { // top
            bx = Math.random() * info.width;
            by = -kLen;
            angle = Math.random() * Math.PI + Math.PI / 2; // downwards, but can be angled
        } else if (edge === 1) { // right
            bx = info.width + kLen;
            by = Math.random() * info.height;
            angle = Math.random() * Math.PI + Math.PI; // leftwards
        } else if (edge === 2) { // bottom
            bx = Math.random() * info.width;
            by = info.height + kLen;
            angle = Math.random() * Math.PI - Math.PI / 2; // upwards
        } else { // left
            bx = -kLen;
            by = Math.random() * info.height;
            angle = Math.random() * Math.PI; // rightwards
        }
        // Optionally, bias angle toward player
        if (Math.random() < 0.7) {
            let dx = info.px - bx;
            let dy = info.py - by;
            if (info.subArena && info.moveWithSub) {
                dx += info.subx
                dy += info.suby
            }
            angle = Math.atan2(dy, dx);
        }
        // Store initial spawn for path line
        let bname = (kLen >= 100 || kWid >= 25) ? "bigKnife" : "knife"
        info.bullets.push({
            name: bname,
            boxRender: true, // RENDER IN BOX
            x: bx,
            y: by,
            angle: angle,
            r: kLen,
            width: kWid,
            vx: Math.cos(angle) * kSpd,
            vy: Math.sin(angle) * kSpd,
            draw(b, bossCtx) {
                // Draw path line (red, thin)
                bossCtx.save();
                bossCtx.strokeStyle = '#f22';
                bossCtx.lineWidth = 2;
                bossCtx.beginPath();
                bossCtx.moveTo(b.x, b.y);
                // Draw line in the direction of the knife, long enough to cross the arena
                let farX = b.x + Math.cos(b.angle) * (info.width + info.height);
                let farY = b.y + Math.sin(b.angle) * (info.width + info.height);
                bossCtx.lineTo(farX, farY);
                bossCtx.stroke();
                bossCtx.restore();
                // Draw knife
                bossCtx.save();
                bossCtx.translate(b.x, b.y);
                bossCtx.rotate(b.angle);
                bossCtx.beginPath();
                bossCtx.moveTo(-b.r / 2, -b.width / 2);
                bossCtx.lineTo(b.r / 2, 0);
                bossCtx.lineTo(-b.r / 2, b.width / 2);
                bossCtx.closePath();
                bossCtx.fillStyle = '#ccc';
                if (!options.performanceMode) bossCtx.shadowColor = '#fff';
                if (!options.performanceMode) bossCtx.shadowBlur = 6;
                bossCtx.fill();
                bossCtx.restore();
            }
        })
    }

    info.spawnDarkKnife = (id) => {
        // Pick a random edge and a random point on that edge
        const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let bx, by, angle;
        const kLen = info.actions[id].knifeLength || 64;
        const kWid = info.actions[id].knifeWidth || 16;
        const kSpd = info.actions[id].enemySpeed || 6;
        if (edge === 0) { // top
            bx = Math.random() * info.width;
            by = -kLen;
            angle = Math.random() * Math.PI + Math.PI / 2; // downwards, but can be angled
        } else if (edge === 1) { // right
            bx = info.width + kLen;
            by = Math.random() * info.height;
            angle = Math.random() * Math.PI + Math.PI; // leftwards
        } else if (edge === 2) { // bottom
            bx = Math.random() * info.width;
            by = info.height + kLen;
            angle = Math.random() * Math.PI - Math.PI / 2; // upwards
        } else { // left
            bx = -kLen;
            by = Math.random() * info.height;
            angle = Math.random() * Math.PI; // rightwards
        }
        // Optionally, bias angle toward player
        let dx = info.px - bx;
        let dy = info.py - by;
        if (info.subArena && info.moveWithSub) {
            dx += info.subx
            dy += info.suby
        }
        angle = Math.atan2(dy, dx);
        // Store initial spawn for path line
        let bname = (kLen >= 100 || kWid >= 25) ? "bigKnife" : "knife"
        info.bullets.push({
            name: bname,
            boxRender: true, // RENDER IN BOX
            x: bx,
            y: by,
            angle: angle,
            r: kLen,
            width: kWid,
            vx: Math.cos(angle) * kSpd,
            vy: Math.sin(angle) * kSpd,
            draw(b, bossCtx) {
                // Draw path line (red, thin)
                bossCtx.save();
                bossCtx.strokeStyle = 'rgba(136, 136, 255, 0.1)';
                bossCtx.lineWidth = 16;
                bossCtx.beginPath();
                bossCtx.moveTo(b.x, b.y);
                // Draw line in the direction of the knife, long enough to cross the arena
                let farX = b.x + Math.cos(b.angle) * (info.width + info.height);
                let farY = b.y + Math.sin(b.angle) * (info.width + info.height);
                bossCtx.lineTo(farX, farY);
                if (!options.performanceMode) bossCtx.shadowColor = '#88f';
                if (!options.performanceMode) bossCtx.shadowBlur = 16;
                bossCtx.stroke();
                bossCtx.restore();
                // Draw knife
                bossCtx.save();
                bossCtx.translate(b.x, b.y);
                bossCtx.rotate(b.angle);
                bossCtx.beginPath();
                bossCtx.moveTo(-b.r / 2, -b.width / 2);
                bossCtx.lineTo(b.r / 2, 0);
                bossCtx.lineTo(-b.r / 2, b.width / 2);
                bossCtx.closePath();
                bossCtx.fillStyle = '#88f';
                if (!options.performanceMode) bossCtx.shadowColor = '#88f';
                if (!options.performanceMode) bossCtx.shadowBlur = 16;
                bossCtx.fill();
                bossCtx.restore();
            }
        })
    }

    // Fire aimed knife burst
    info.fireKnifeBurst = (id) => {
        // Knives are thrown from far outside the arena, all aimed at the current player position
        let centerX = info.px;
        let centerY = info.py;
        if (info.subArena && info.moveWithSub) {
            centerX += info.subx
            centerY += info.suby
        }
        const spawnRadius = Math.max(info.width, info.height) * 0.75 + 200; // farther than arena edge
        const count = info.actions[id]?.bulletsPerBurst || 5;
        const kLen = info.actions[id]?.knifeLength || 64;
        const kWid = info.actions[id]?.knifeWidth || 16;
        const kSpd = info.actions[id]?.enemySpeed || 8;
        for (let i = 0; i < count; i++) {
            const angle = (2 * Math.PI * i) / count;
            // Spawn far away in a ring
            const spawnX = centerX + Math.cos(angle) * spawnRadius;
            const spawnY = centerY + Math.sin(angle) * spawnRadius;
            // Aim at the current player position
            const dx = centerX - spawnX;
            const dy = centerY - spawnY;
            const dist = Math.hypot(dx, dy);
            const knifeAngle = Math.atan2(dy, dx);
            let bname = (kLen >= 100 || kWid >= 25) ? "bigKnife" : "knife"
            info.bullets.push({
                name: bname,
                boxRender: true, // RENDER IN BOX
                offScreen: true, // Bullets can be off screen
                x: spawnX,
                y: spawnY,
                angle: knifeAngle,
                r: kLen,
                width: kWid,
                vx: (dx / dist) * kSpd,
                vy: (dy / dist) * kSpd,
                timer: Date.now() - 500,
                draw(b, bossCtx) {
                    // Draw path line (red, thin) if knife is on screen, or if it left within the last 500ms
                    let knifeOnScreen = (
                        b.x > 0 && b.x < info.width &&
                        b.y > 0 && b.y < info.height
                    );
                    if (knifeOnScreen) {
                        b.timer = Date.now();
                    }
                    if (Date.now() - b.timer < 500) {
                        // Draw path line (red, thin)
                        bossCtx.save();
                        bossCtx.strokeStyle = '#f22';
                        bossCtx.lineWidth = 2;
                        bossCtx.beginPath();
                        bossCtx.moveTo(b.x, b.y);
                        // Draw line in the direction of the knife, long enough to cover the screen
                        let farX = b.x + Math.cos(b.angle) * 5000;
                        let farY = b.y + Math.sin(b.angle) * 5000;
                        bossCtx.lineTo(farX, farY);
                        bossCtx.stroke();
                        bossCtx.restore();
                    }
                    // Draw knife
                    bossCtx.save();
                    bossCtx.translate(b.x, b.y);
                    bossCtx.rotate(b.angle);
                    bossCtx.beginPath();
                    bossCtx.moveTo(-b.r / 2, -b.width / 2);
                    bossCtx.lineTo(b.r / 2, 0);
                    bossCtx.lineTo(-b.r / 2, b.width / 2);
                    bossCtx.closePath();
                    bossCtx.fillStyle = '#ccc';
                    if (!options.performanceMode) bossCtx.shadowColor = '#fff';
                    if (!options.performanceMode) bossCtx.shadowBlur = 6;
                    bossCtx.fill();
                    bossCtx.restore();
                }
            });
        }
    }

    info.triangleArea = (x1, y1, x2, y2, x3, y3) => {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
    }

    info.isPointInTriangle = (px, py, x1, y1, x2, y2, x3, y3) => {
        const originalArea = info.triangleArea(x1, y1, x2, y2, x3, y3);

        const area1 = info.triangleArea(px, py, x2, y2, x3, y3);
        const area2 = info.triangleArea(x1, y1, px, py, x3, y3);
        const area3 = info.triangleArea(x1, y1, x2, y2, px, py);

        return Math.abs(originalArea - (area1 + area2 + area3)) < 10;
    }

    info.pointToSegmentDist = (px, py, x1, y1, x2, y2) => {
        const vx = x2 - x1, vy = y2 - y1;
        const wx = px - x1, wy = py - y1;
        const c = (vx * wx + vy * wy) / (vx * vx + vy * vy || 1);
        const t = Math.max(0, Math.min(1, c));
        const qx = x1 + vx * t, qy = y1 + vy * t;
        const dx = px - qx, dy = py - qy;
        return Math.hypot(dx, dy);
    }

    info.pointToTriangleDistance = (px, py, x1, y1, x2, y2, x3, y3) => {
        if (info.isPointInTriangle(px, py, x1, y1, x2, y2, x3, y3)) return 0;
        const d1 = info.pointToSegmentDist(px, py, x1, y1, x2, y2);
        const d2 = info.pointToSegmentDist(px, py, x2, y2, x3, y3);
        const d3 = info.pointToSegmentDist(px, py, x3, y3, x1, y1);
        return Math.min(d1, d2, d3);
    }

    // Pixel-perfect wall collision for smooth movement (DON'T USE WITH 'MOVE WITH SUBARENA')
    function canMoveTo(nx, ny) {
        // nx,ny: new player center (float, px)
        if (nx - info.pr < 0 || nx + info.pr > info.width || ny - info.pr < 0 || ny + info.pr > info.height) return false;
        // Find which cell the center is in
        let cx = Math.floor(nx / info.cellSize), cy = Math.floor(ny / info.cellSize);
        if (cx < 0 || cy < 0 || cx >= info.cols || cy >= info.rows) return false;
        const cell = info.maze[cy][cx];
        // Check each direction for wall collision
        // Top wall
        if (cell.walls[0] && ny - info.pr < cy * info.cellSize) return false;
        // Bottom wall
        if (cell.walls[2] && ny + info.pr > (cy + 1) * info.cellSize) return false;
        // Left wall
        if (cell.walls[3] && nx - info.pr < cx * info.cellSize) return false;
        // Right wall
        if (cell.walls[1] && nx + info.pr > (cx + 1) * info.cellSize) return false;
        // Also check adjacent cells if overlapping their walls
        // Up
        if (ny - info.pr < cy * info.cellSize && cy > 0) {
            const upCell = info.maze[cy - 1][cx];
            if (upCell.walls[2]) return false;
        }
        // Down
        if (ny + info.pr > (cy + 1) * info.cellSize && cy < info.rows - 1) {
            const downCell = info.maze[cy + 1][cx];
            if (downCell.walls[0]) return false;
        }
        // Left
        if (nx - info.pr < cx * info.cellSize && cx > 0) {
            const leftCell = info.maze[cy][cx - 1];
            if (leftCell.walls[1]) return false;
        }
        // Right
        if (nx + info.pr > (cx + 1) * info.cellSize && cx < info.cols - 1) {
            const rightCell = info.maze[cy][cx + 1];
            if (rightCell.walls[3]) return false;
        }
        return true;
    }

    // Does death is yes? (lmao)
    info.allCharactersDead = () => {
        if (!player || !player.bh || !player.bh.characters) return true;
        for (let i = 0; i < 3; i++) {
            if (player.bh.characters[i].id != "none" && Decimal.gt(player.bh.characters[i].health, 0)) return false
        }
        return true;
    }

    function exitGame(nextStuff = "battle", dealTimeoutDamage = false) {
        if (originalBhAttack) window.bhAttack = originalBhAttack;
        info.exitAction()
        if (!options.bhKeyboard) {
            window.removeEventListener("mousemove", mouseHandler);
            window.removeEventListener("touchmove", touchHandler);
            window.removeEventListener("click", clickHandler);
        } else {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            window.removeEventListener("click", clickHandler);
        }
        if (info.greenMode && !options.bhKeyboard) {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
        }
        if (overlay.parentNode) overlay.remove();
        bhState.active = false;
        info.active = false;
        player.subtabs["bh"]["stuff"] = nextStuff;
        pauseUniverseAll(["BH"], "unpause", true)
        player.universe = "U3"
        options.fullscreen = info.full;
        if (dealTimeoutDamage && info.timed) bhAttack(Decimal.mul(player.bh.celestialite.damage, 3), 3, 0, "allPlayer")
        localStorage.setItem('bhState', JSON.stringify(info));
        if (bhState.timer) clearTimeout(bhState.timer)
    }

    function animate(ts) {
        if (!info.active) return;
        
        // Calculate real time vs animation time for time stop logic
        let nowReal = Date.now();
        if (!info.lastRealTime) info.lastRealTime = nowReal;
        let dtReal = nowReal - info.lastRealTime;
        info.lastRealTime = nowReal;

        if (!info.lastTs) info.lastTs = ts;
        let dtTs = Math.max(0, ts - info.lastTs);
        info.lastTs = ts;

        //  Global attack speed multiplier 
        // 1.0 = normal, 1.5 = 50% faster, 2.0 = double speed, etc.
        // Change this one constant to scale every attack, bullet, and physics step.
        const BH_SPEED_MULT = 1.5;

        // Delta time normalized to 60 fps (1.0 = one 60fps frame).
        // Clamped to prevent teleporting on long pauses or browser tab-out.
        let clampedDtMs = Math.min(dtTs, 100);
        let baseDt = clampedDtMs / (1000 / 60);

        let isTimeStopped = typeof player !== 'undefined' && player?.anl?.marcelTimeStop;

        // Player moves during Marcel time stop; world simulation pauses
        let playerDt = isTimeStopped ? baseDt : (baseDt * BH_SPEED_MULT);
        let simDt = isTimeStopped ? 0 : (baseDt * BH_SPEED_MULT);

        info.dt = simDt;
        info.dtMs = clampedDtMs * BH_SPEED_MULT;

        // End early if celestialite is dead
        if (player.bh.celestialite.id == "none" || (player.bh.celestialite.health.lte(0) && !BHC[player.bh.celestialite.id].immortal)) {
            exitGame("battle");
            return;
        }
        
        // End early if all characters are dead
        if (info.allCharactersDead()) {
            exitGame("dead");
            return;
        }

        // --- TIME STOP LOGIC ---
        // Shift timestamps if time is stopped so attacks don't skip ahead or expire instantly
        if (isTimeStopped) {
            info.endTime += dtReal;
            info.startTime += dtReal;
            
            for (let i in info.actions) {
                let act = info.actions[i];
                if (typeof act.startTime === 'number') act.startTime += dtReal;
                if (typeof act.lastTime === 'number') act.lastTime += dtTs;
                if (typeof act._seqStart === 'number') act._seqStart += dtReal;
                if (typeof act.lastLaserTime === 'number') act.lastLaserTime += dtTs;
                if (typeof act.lastKatanaTime === 'number') act.lastKatanaTime += dtTs;
                if (typeof act.lastTick === 'number') act.lastTick += dtTs;
                if (typeof act.lastRain === 'number') act.lastRain += dtReal;
                if (typeof act.lastCircleLaser === 'number') act.lastCircleLaser += dtReal;
                if (typeof act.lastRadialKatana === 'number') act.lastRadialKatana += dtReal;
                if (typeof act.lastSpikeDamageTime === 'number') act.lastSpikeDamageTime += dtReal;
            }

            for (let b of info.bullets) {
                if (typeof b.spawnTime === 'number') b.spawnTime += dtReal;
                if (typeof b.lastShotTime === 'number') b.lastShotTime += dtTs;
                if (typeof b.lastBurstTime === 'number') b.lastBurstTime += dtReal;
                if (typeof b.explodeTime === 'number') b.explodeTime += dtReal;
                if (typeof b._lastBounce === 'number') b._lastBounce += dtTs;
                if (typeof b.timer === 'number') b.timer += dtReal;
            }
        }

        // Check if duration has ended
        if (Date.now() >= info.endTime) {
            exitGame("battle", true);
            return;
        }

        // Move sub-arena (with DVD bounce logic)
        if (!isTimeStopped) {
            if (info.subArena) {
                info.subx += info.subvx * info.dt;
                info.suby += info.subvy * info.dt;
                if (info.subx <= 0) { info.subx = 0; info.subvx = Math.abs(info.subvx); }
                if (info.subx >= info.width - info.subWidth) { info.subx = info.width - info.subWidth; info.subvx = -Math.abs(info.subvx); }
                if (info.suby <= 0) { info.suby = 0; info.subvy = Math.abs(info.subvy); }
                if (info.suby >= info.height - info.subHeight) { info.suby = info.height - info.subHeight; info.subvy = -Math.abs(info.subvy); }
            }
        }

        // Move Player (normal or blue-mode platformer; skipped in greenMode  player is locked)
        // If blueMode: compute jump height from vertical distance between mouse and diamond (gravity stays constant)
        if (info.greenMode) {
            // Green mode: player stays locked at center, no movement
        } else if (info.blueMode) {
            // compute based on vertical distance (only consider mouse above the diamond for jump height)
            const dy = (info.py - (info.pos.y || info.py)); // positive if mouse is above
            const absdy = Math.max(0, Math.min(dy, info.height));
            const factor = info.height > 0 ? (absdy / info.height) : 0;
            const jMin = info.values.jumpMin ?? 40; // in pixels
            const jMax = info.values.jumpMax ?? 220; // in pixels
            info.computedJumpHeight = jMin + factor * (jMax - jMin); // desired jump apex height in px

            // Horizontal movement influenced by mouse X (info.pos.x) and keyboard arrows
            let targetX = info.pos.x || info.px;
            if (options.bhKeyboard) {
                let kx = 0;
                if (info.keys.left) kx -= 6;
                if (info.keys.right) kx += 6;
                info.px += kx * playerDt + (info.vx || 0) * playerDt;
            } else {
                // Smooth horizontal movement plus velocity (lerp factor scaled by playerDt for smoothness)
                info.px += (targetX - info.px) * (1 - Math.pow(1 - 0.08, playerDt)) + (info.vx || 0) * playerDt;
            }

            // Apply gravity (scaled by playerDt)
            info.vy = (info.vy || 0) + (info.gravity || 0.6) * 0.65 * playerDt;
            info.py += info.vy * playerDt;

            // Floor collision (respect subArena if used)
            let groundY = info.subArena && info.moveWithSub ? (info.subHeight - info.pr) : (info.height - info.pr);
            if (info.py >= groundY) {
                info.py = groundY;
                info.vy = 0;
                info.onGround = true;
            } else {
                info.onGround = false;
            }

            // Friction on horizontal velocity (frame-rate independent exponential decay)
            info.vx = (info.vx || 0) * Math.pow(0.9, playerDt);

            // Clamp horizontal position
            if (info.subArena) {
                if (info.moveWithSub) {
                    info.px = Math.max(info.pr, Math.min(info.subWidth - info.pr, info.px));
                } else {
                    info.px = Math.max(info.pr + info.subx, Math.min(info.subWidth + info.subx - info.pr, info.px));
                }
            } else {
                info.px = Math.max(info.pr, Math.min(gameCanvas.width - info.pr, info.px));
            }
        } else {
            let dx = 0; let dy = 0
            if (!options.bhKeyboard) {
                dx = info.pos.x - info.px
                dy = info.pos.y - info.py
                if (info.subArena && info.moveWithSub) {
                    dx -= info.subx 
                    dy -= info.suby
                }
            } else {
                if (info.keys.up) dy -= 5;
                if (info.keys.down) dy += 5;
                if (info.keys.left) dx -= 5;
                if (info.keys.right) dx += 5;
            }
            let dist = Math.hypot(dx, dy);
            if (dist > 1) {
                let angle = Math.atan2(dy, dx);
                const moveStep = options.bhKeyboard ? (info.speed * playerDt) : Math.min(dist, info.speed * playerDt);
                if (info.cellSize) {
                    let npx = info.px + Math.cos(angle) * moveStep, npy = info.py + Math.sin(angle) * moveStep;
                    // Try moving in both axes, then x only, then y only
                    if (canMoveTo(npx, npy)) {
                        info.px = npx; info.py = npy
                    } else if (canMoveTo(npx, info.py)) {
                        info.px = npx;
                    } else if (canMoveTo(info.px, npy)) {
                        info.py = npy
                    }
                } else {
                    info.px += Math.cos(angle) * moveStep;
                    info.py += Math.sin(angle) * moveStep;
                }
                if (info.subArena) {
                    if (info.moveWithSub) {
                        info.px = Math.max(info.pr, Math.min(info.subWidth - info.pr, info.px));
                        info.py = Math.max(info.pr, Math.min(info.subHeight - info.pr, info.py));
                    } else {
                        info.px = Math.max(info.pr + info.subx, Math.min(info.subWidth + info.subx - info.pr, info.px));
                        info.py = Math.max(info.pr + info.suby, Math.min(info.subHeight + info.suby - info.pr, info.py));
                    }
                } else {
                    info.px = Math.max(info.pr, Math.min(gameCanvas.width - info.pr, info.px));
                    info.py = Math.max(info.pr, Math.min(gameCanvas.height - info.pr, info.py));
                }
            }
        }

        // Check for reaching goal
        if (info.goalType) {
            let dist;
            if (info.goalType == "cell") {
                dist = Math.hypot(info.px - (info.goal.x * info.goal.d + info.goal.d / 2), info.py - (info.goal.y * info.goal.d + info.goal.d / 2));
            } else {
                let gx = info.subArena ? (info.px + info.subx) : info.px;
                let gy = info.subArena ? (info.py + info.suby) : info.py;
                dist = Math.hypot(gx - info.goal.x, gy - info.goal.y);
            }
            if (dist < info.goalRadius) {
                exitGame("battle");
                return;
            }
        }

        // Make bullets stop moving if time is stopped
        if (!isTimeStopped) {
            // Bullet movement/spawn code
            for (let i in info.actions) {
                if (info.actions[i].moveFunc && (!info.actions[i].duration || Date.now() < info.startTime + (info.actions[i].duration*1000))) info = info.actions[i].moveFunc(info, ts, i)
            }

            // Move bullets
            for (let b of info.bullets) {
                if (b.vx !== undefined) b.x += b.vx * info.dt;
                if (b.vy !== undefined) b.y += b.vy * info.dt;
            }
        }

        // In-place bullet array compaction (eliminates massive GC stutter from .filter())
        let writeIdx = 0;
        const bullets = info.bullets;
        const bCount = bullets.length;

        for (let i = 0; i < bCount; i++) {
            const b = bullets[i];
            let keep = true;

            if (b._dead || b._hitPlayer) {
                keep = false;
            } else if (b.offScreen) {
                keep = (b.x > info.boxLeft && b.x < info.boxLeft + info.width &&
                        b.y > info.boxTop && b.y < info.boxTop + info.height);
            } else if (b.name && (b.name == "bomb" || b.name == "minibomb") && b.exploded) {
                keep = false;
            } else if (b.name && b.name == "greenSpear") {
                const m = (b.r ?? 80) * 2 + info.width;
                keep = (b.x > -m && b.x < info.width + m && b.y > -m && b.y < info.height + m);
            } else if (b.name && (b.name == "knife" || b.name == "bigKnife")) {
                keep = (b.x > -b.r && b.x < info.width + b.r && b.y > -b.r && b.y < info.height + b.r);
            } else {
                keep = (b.x > -b.r && b.x < window.innerWidth + b.r && b.y > -b.r && b.y < window.innerHeight + b.r);
            }

            if (keep) {
                bullets[writeIdx++] = b;
            }
        }
        bullets.length = writeIdx;

        // Draw bullets (white circles) on bossCanvas
        info.bossCtx.clearRect(0, 0, bossCanvas.width, bossCanvas.height);

        if (info.blindness) {
            // Lazy initialization ensures canvases exist and match viewport dimensions
            if (!info.blindnessDark) {
                info.blindnessOffscreen = document.createElement("canvas");
                info.blindnessOffscreen.width = bossCanvas.width;
                info.blindnessOffscreen.height = bossCanvas.height;
                info.blindnessOffCtx = info.blindnessOffscreen.getContext("2d");

                info.blindnessDark = document.createElement("canvas");
                info.blindnessDark.width = bossCanvas.width;
                info.blindnessDark.height = bossCanvas.height;
                info.blindnessDarkCtx = info.blindnessDark.getContext("2d");
            }

            const gameRect = gameCanvas.getBoundingClientRect();
            const drawX = (info.subArena && info.moveWithSub) ? info.subx + info.px : info.px;
            const drawY = (info.subArena && info.moveWithSub) ? info.suby + info.py : info.py;
            const screenX = gameRect.left + drawX;
            const screenY = gameRect.top + drawY;
            const radius = info.blindness;

            const offscreen = info.blindnessOffscreen;
            const offCtx = info.blindnessOffCtx;
            const darkCanvas = info.blindnessDark;
            const darkCtx = info.blindnessDarkCtx;

            offCtx.clearRect(0, 0, bossCanvas.width, bossCanvas.height);
            darkCtx.clearRect(0, 0, bossCanvas.width, bossCanvas.height);

            // Step 1: Draw bullets onto offscreen layer
            if (!options.performanceMode) {
                offCtx.shadowColor = "#fff";
                offCtx.shadowBlur = 8;
            }
            for (let b of info.bullets) {
                if (b.boxRender) continue;
                b.draw(b, offCtx);
            }

            // Step 2: Clip offscreen layer to visible circle and stamp onto bossCanvas
            info.bossCtx.save();
            info.bossCtx.beginPath();
            info.bossCtx.arc(screenX, screenY, radius, 0, Math.PI * 2);
            info.bossCtx.clip();
            info.bossCtx.drawImage(offscreen, 0, 0);
            info.bossCtx.restore();

            // Step 3: Draw solid black screen on darkCanvas
            // Reset to source-over so fillRect paints opaque black over the cleared canvas
            darkCtx.globalCompositeOperation = "source-over";
            darkCtx.fillStyle = "black";
            darkCtx.fillRect(0, 0, darkCanvas.width, darkCanvas.height);

            // Cut out the radial hole centered on the player
            darkCtx.globalCompositeOperation = "destination-out";
            const gradient = darkCtx.createRadialGradient(screenX, screenY, radius * 0.65, screenX, screenY, radius);
            gradient.addColorStop(0, "rgba(0,0,0,1)");
            gradient.addColorStop(1, "rgba(0,0,0,0)");
            darkCtx.beginPath();
            darkCtx.arc(screenX, screenY, radius, 0, Math.PI * 2);
            darkCtx.fillStyle = gradient;
            darkCtx.fill();

            // Reset back to default composition mode
            darkCtx.globalCompositeOperation = "source-over";

            // Stamp the darkness mask over bossCanvas
            info.bossCtx.drawImage(darkCanvas, 0, 0);
        } else {
            info.bossCtx.save();
            if (!options.performanceMode) {
                info.bossCtx.shadowColor = "#fff";
                info.bossCtx.shadowBlur = 8;
            }
            for (let b of info.bullets) {
                if (b.boxRender) continue;
                b.draw(b, info.bossCtx);
            }
            info.bossCtx.restore();
        }

        // Only call takeDamage once per frame if hit
        let playerHit = false;

        // Check collision between player and each bullet (Optimized via AABB & squared distance)
        for (let b of info.bullets) {
            // Yellow spears that are still approaching or orbiting cannot hit the player yet
            if (b.yellow && b._yellowState !== "striking") continue;
            let playerX = info.px + (info.subArena ? info.subx : 0);
            let playerY = info.py + (info.subArena ? info.suby : 0);

            if (b.name && b.name == "knife") {
                // AABB broadphase pre-filter
                const maxReach = b.r + info.pr + b.width;
                if (Math.abs(playerX - b.x) > maxReach || Math.abs(playerY - b.y) > maxReach) continue;

                // Knife is a rectangle, check if player is within knife's rectangle (approximate as line segment + width)
                const dx = Math.cos(b.angle), dy = Math.sin(b.angle);
                // Project player onto knife axis
                const t = ((playerX - b.x) * dx + (playerY - b.y) * dy);
                if (t >= -b.r+info.pr && t <= b.r - info.pr) {
                    // Perpendicular distance
                    const perp = Math.abs((playerX - b.x) * dy - (playerY - b.y) * dx);
                    if (perp < info.pr + b.width / 2) {
                        playerHit = true;
                        break;
                    }
                }
            } else if (b.name && b.name == "bigKnife") {
                const playerGlobalX = info.boxLeft + playerX;
                const playerGlobalY = info.boxTop + playerY;

                // AABB broadphase pre-filter
                const maxKnifeReach = b.r + info.pr + b.width;
                if (Math.abs(playerGlobalX - b.x) > maxKnifeReach || Math.abs(playerGlobalY - b.y) > maxKnifeReach) continue;

                const x1 = (Math.cos(b.angle) * (-(b.r + info.pr) / 2)) - (Math.sin(b.angle) * (-(b.width + info.pr) / 2)) + b.x;
                const y1 = (Math.sin(b.angle) * (-(b.r + info.pr) / 2)) + (Math.cos(b.angle) * (-(b.width + info.pr) / 2)) + b.y;
                const x2 = (Math.cos(b.angle) * ((b.r + info.pr) / 2)) + b.x;
                const y2 = (Math.sin(b.angle) * ((b.r + info.pr) / 2)) + b.y;
                const x3 = (Math.cos(b.angle) * (-(b.r + info.pr) / 2)) - (Math.sin(b.angle) * ((b.width + info.pr) / 2)) + b.x;
                const y3 = (Math.sin(b.angle) * (-(b.r + info.pr) / 2)) + (Math.cos(b.angle) * ((b.width + info.pr) / 2)) + b.y;
                const dist = info.pointToTriangleDistance(playerGlobalX, playerGlobalY, x1, y1, x2, y2, x3, y3);
                if (dist <= info.pr) {
                    playerHit = true;
                    break;
                }
            } else if (b.boxRender) {
                const dx = playerX - b.x;
                const dy = playerY - b.y;
                const rSum = info.pr + b.r;
                if (dx * dx + dy * dy <= rSum * rSum) {
                    playerHit = true;
                    break;
                }
            } else {
                const dx = (info.boxLeft + playerX) - b.x;
                const dy = (info.boxTop + playerY) - b.y;
                const rSum = info.pr + b.r;
                if (dx * dx + dy * dy <= rSum * rSum) {
                    playerHit = true;
                    break;
                }
            }
        }

        // Consider platform/spike hits set by attacks
        if (info.platformHit) {
            playerHit = true;
            info.platformHit = false;
        }

        // Green-mode: deflect spears that physically touch the shield arc.
        // The shield is a circular arc at radius `info.shieldRadius` from the player center,
        // spanning `info.shieldArc` radians centered on `DIR_ANGLES[shieldDir]`.
        // A spear (line segment with half-width b.width/2) hits the shield when:
        //   1. Its closest point to the player is within shieldRadius Â± (halfLineWidth + spearHalfWidth)
        //   2. The angle from the player to that closest point falls within the shield arc.
        if (info.greenMode) {
            const GREEN_DIR_ANGLES = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];
            const shieldCenterAngle = GREEN_DIR_ANGLES[info.shieldDir];
            const halfArc    = info.shieldArc / 2;
            const shieldR    = info.shieldRadius;
            const shieldHalf = 5; // half of the drawn lineWidth (7px) for physical thickness

            // Helper: signed angular difference, result in -Ï€â€¦Ï€
            function angDiff(a, b) {
                let d = ((a - b) % (2*Math.PI) + 2*Math.PI) % (2*Math.PI);
                if (d > Math.PI) d -= 2*Math.PI;
                return d;
            }

            let redShieldHit = false;

            for (let b of info.bullets) {
                if (b._greenDeflected) continue;
                // Yellow spears orbiting the shield are not yet striking â€“ skip shield check
                if (b.yellow && b._yellowState !== "striking") continue;

                // Build spear segment endpoints in arena coords
                const halfLen = (b.r ?? 40) * 0.45;
                const spearHalf = (b.width ?? 12) / 2;
                const cos_a = Math.cos(b.angle ?? 0);
                const sin_a = Math.sin(b.angle ?? 0);
                const x1 = b.x - cos_a * halfLen;
                const y1 = b.y - sin_a * halfLen;
                const x2 = b.x + cos_a * halfLen;
                const y2 = b.y + sin_a * halfLen;

                // Find the closest point on the segment to the player
                const segDx = x2 - x1, segDy = y2 - y1;
                const segLen2 = segDx * segDx + segDy * segDy;
                let t = 0;
                if (segLen2 > 0) {
                    t = ((info.px - x1) * segDx + (info.py - y1) * segDy) / segLen2;
                    t = Math.max(0, Math.min(1, t));
                }
                const closestX = x1 + t * segDx;
                const closestY = y1 + t * segDy;

                // Broadphase reach wide enough for the 4x parry window
                const maxReach = shieldR + (spearHalf + shieldHalf) * 4 + 10;
                if (Math.abs(closestX - info.px) > maxReach || Math.abs(closestY - info.py) > maxReach) continue;

                const dx = closestX - info.px;
                const dy = closestY - info.py;
                const dist = Math.hypot(dx, dy);

                const pointAngle = Math.atan2(dy, dx);
                const spearAngle = Math.atan2(b.vy ?? 0, b.vx ?? 0);
                const facingDot = Math.cos(spearAngle - shieldCenterAngle);
                const inShieldArc = Math.abs(angDiff(pointAngle, shieldCenterAngle)) <= halfArc;

                // Blue spear parry range: ONLY active if the spear is in front of the shield and moving toward it
                if (b.blue) {
                    b._inParryRange = inShieldArc && (facingDot < 0) &&
                                      (dist >= shieldR - (spearHalf + shieldHalf) * 4 &&
                                       dist <= shieldR + (spearHalf + shieldHalf) * 4);
                }

                // Distance must be within the physical shield ring
                const tolerance = spearHalf + shieldHalf;
                if (dist < shieldR - tolerance || dist > shieldR + tolerance) continue;

                // Spear must be travelling into the shield face, not away
                if (facingDot >= 0) continue;

                // Check if this angle is within the shield arc
                if (inShieldArc) {
                    if (b.red) {
                        // Red spear hits shield â†’ deal damage and disappear
                        b._greenDeflected = true;
                        b._hitPlayer = true;
                        redShieldHit = true;
                    } else if (b.blue) {
                        // Blue spear at the shield ring: parry only if input was triggered
                        if (info._parryPressed) {
                            info._parryPressed = false;
                            b._greenDeflected = true;
                            b._blueParried = true;
                            b._hitPlayer = true;
                        }
                    } else {
                        // Green or yellow spear hits shield â†’ deflect back
                        b._greenDeflected = true;
                        b.vx *= -1;
                        b.vy *= -1;
                        if (b.angle != null) b.angle = Math.atan2(b.vy, b.vx);
                        if (b.yellow) b._yellowState = "striking";
                    }
                }
            }

            // Apply early parry input only to blue spears that are verified within the shield arc
            if (info._parryPressed) {
                let closest = null, closestDist = Infinity;
                for (let b of info.bullets) {
                    if (!b.blue || b._greenDeflected) continue;
                    if (!b._inParryRange) continue;
                    const d = Math.hypot(b.x - info.px, b.y - info.py);
                    if (d < closestDist) { closestDist = d; closest = b; }
                }
                if (closest) {
                    closest._greenDeflected = true;
                    closest._blueParried = true;
                    closest._hitPlayer = true;
                }
                info._parryPressed = false;
            }

            // If a parry press is still unused (player clicked early, before the spear reached
            // the shield ring), apply it to the nearest in-range blue spear.
            if (info._parryPressed) {
                let closest = null, closestDist = Infinity;
                for (let b of info.bullets) {
                    if (!b.blue || b._greenDeflected) continue;
                    if (!b._inParryRange) continue;
                    const dx = b.x - info.px, dy = b.y - info.py;
                    const d = Math.hypot(dx, dy);
                    if (d < closestDist) { closestDist = d; closest = b; }
                }
                if (closest) {
                    closest._greenDeflected = true;
                    closest._blueParried = true;
                    closest._hitPlayer = true;
                }
                info._parryPressed = false;
            }

            // Strip playerHit for spears deflected before reaching the diamond.
            // Red spears that reach the player body bounce back with no damage.
            // Yellow spears that reach the player body deal damage (like green).
            if (playerHit) {
                playerHit = false;
                for (let b of info.bullets) {
                    if (b._greenDeflected) continue;
                    const dx = info.px - b.x;
                    const dy = info.py - b.y;
                    const rSum = info.pr + (b.width ?? b.r ?? 8) / 2;
                    if (dx * dx + dy * dy <= rSum * rSum) {
                        b._greenDeflected = true;
                        if (b.red) {
                            // Red spear hits player body â†’ bounce back, no damage
                            b.vx *= -1;
                            b.vy *= -1;
                            if (b.angle != null) b.angle = Math.atan2(b.vy, b.vx);
                        } else {
                            // Green, yellow, or blue spear hits player body â†’ deal damage and disappear
                            playerHit = true;
                            b._hitPlayer = true;
                        }
                        break;
                    }
                }
            }

            // Red/yellow shield hit deals damage regardless of the strip above
            if (redShieldHit) playerHit = true;

            // Parry input is consumed per-spear above; clear any remainder here as a safety net
            info._parryPressed = false;
        }

        // Take damage (only when in a BH stage)
        if (playerHit && player && player.bh && player.bh.currentStage && player.bh.currentStage != "none") {
            const now = Date.now();
            // Immortality frames: only allow damage every 100ms
            if (typeof window.lastDamageTime !== "number") window.lastDamageTime = Date.now();
            if (now - window.lastDamageTime > 100) {
                window.lastDamageTime = now;
                if (!info.greenMode && !info.blueMode) bhAttack(player.bh.celestialite.damage.mul(0.666), 3, 0, "randomPlayer")
                if (info.blueMode) bhAttack(player.bh.celestialite.damage.mul(0.333), 3, 0, "randomPlayer")
                if (info.greenMode) bhAttack(player.bh.celestialite.damage.mul(2), 3, 0, "randomPlayer")
            }
        }

        // Start draw
        info.ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // SUB ARENA STUFF
        if (info.subArena) {
            // Draw the full arena border (large arena, dashed, glowing)
            info.ctx.save();
            info.ctx.strokeStyle = '#fff';
            info.ctx.lineWidth = 4;
            if (!options.performanceMode) info.ctx.shadowColor = '#fff';
            if (!options.performanceMode) info.ctx.shadowBlur = 12;
            info.ctx.setLineDash([16, 12]);
            info.ctx.strokeRect(0, 0, info.width, info.height);
            info.ctx.setLineDash([]);
            info.ctx.restore();

            // Draw the small arena (solid, glowing)
            info.ctx.save();
            info.ctx.strokeStyle = '#0ff';
            info.ctx.lineWidth = 4;
            if (!options.performanceMode) info.ctx.shadowColor = '#0ff';
            if (!options.performanceMode) info.ctx.shadowBlur = 16;
            info.ctx.strokeRect(info.subx, info.suby, info.subWidth, info.subHeight);
            info.ctx.restore();
        }

        // Draw maze
        if (info.cellSize) {
            info.ctx.save();
            info.ctx.strokeStyle = "#fff";
            if (player.bh.currentStage == "roomTemple") info.ctx.strokeStyle = "#88f"
            info.ctx.lineWidth = 3;
            for (let y = 0; y < info.rows; y++) {
                for (let x = 0; x < info.cols; x++) {
                    const cell = info.maze[y][x];
                    const sx = x * info.cellSize, sy = y * info.cellSize;
                    if (cell.walls[0]) { // top
                        info.ctx.beginPath(); info.ctx.moveTo(sx, sy); info.ctx.lineTo(sx + info.cellSize, sy); info.ctx.stroke();
                    }
                    if (cell.walls[1]) { // right
                        info.ctx.beginPath(); info.ctx.moveTo(sx + info.cellSize, sy); info.ctx.lineTo(sx + info.cellSize, sy + info.cellSize); info.ctx.stroke();
                    }
                    if (cell.walls[2]) { // bottom
                        info.ctx.beginPath(); info.ctx.moveTo(sx + info.cellSize, sy + info.cellSize); info.ctx.lineTo(sx, sy + info.cellSize); info.ctx.stroke();
                    }
                    if (cell.walls[3]) { // left
                        info.ctx.beginPath(); info.ctx.moveTo(sx, sy + info.cellSize); info.ctx.lineTo(sx, sy); info.ctx.stroke();
                    }
                }
            }
            info.ctx.restore();
        }
        // Draw Timer
        if (info.timed) {
            info.ctx.save();
            let now = Date.now();
            let timeLeft = Math.max(0, Math.ceil((info.endTime - now) / 1000));
            info.ctx.font = 'bold 32px monospace';
            info.ctx.textAlign = 'center';
            info.ctx.textBaseline = 'top';
            info.ctx.fillStyle = timeLeft <= 3 ? '#f44' : '#fff';
            if (!options.performanceMode) info.ctx.shadowColor = '#000';
            if (!options.performanceMode) info.ctx.shadowBlur = 6;
            info.ctx.fillText(`Time Left: ${timeLeft}s`, info.width / 2, 10);
            info.ctx.restore();
        }
        // Draw Goal
        if (info.goalType) {
            info.ctx.save();
            info.ctx.beginPath();
            if (info.goalType == "cell") {
                info.ctx.arc(info.goal.x * info.goal.d + info.goal.d / 2, info.goal.y * info.goal.d + info.goal.d / 2, info.goalRadius, 0, 2 * Math.PI);
            } else {
                info.ctx.arc(info.goal.x, info.goal.y, info.goalRadius, 0, 2 * Math.PI);
            }
            info.ctx.fillStyle = "#2f4";
            if (!options.performanceMode) info.ctx.shadowColor = "#2f4";
            if (!options.performanceMode) info.ctx.shadowBlur = 16;
            info.ctx.fill();
            info.ctx.restore();
        }

        // Draw bullets
        info.ctx.save();
        for (let b of info.bullets) {
            if (b.boxRender) {
                b.draw(b, info.ctx)
            }
        }
        info.ctx.restore();

        // Draw sliding platforms and ground spikes if present
        if (info.platforms && info.platforms.length) {
            for (let p of info.platforms) {
                info.ctx.save();
                info.ctx.fillStyle = p.color || '#888';
                if (!options.performanceMode) {
                    info.ctx.shadowColor = '#000';
                    info.ctx.shadowBlur = 8;
                }
                info.ctx.fillRect(p.x, p.y, p.w, p.h);
                // Draw spikes on top of platform if present
                if (p.hasSpikes) {
                    info.ctx.fillStyle = p.spikeColor || '#ddd';
                    const spW = p.spikeW || 12;
                    const spH = p.spikeH || 12;
                    for (let sx = p.x; sx < p.x + p.w; sx += spW) {
                        info.ctx.beginPath();
                        info.ctx.moveTo(sx, p.y);
                        info.ctx.lineTo(Math.min(sx + spW / 2, p.x + p.w), p.y - spH);
                        info.ctx.lineTo(Math.min(sx + spW, p.x + p.w), p.y);
                        info.ctx.closePath();
                        info.ctx.fill();
                    }
                }
                info.ctx.restore();
            }
        }
        if (info.spikes && info.spikes.length) {
            info.ctx.save();
            info.ctx.fillStyle = '#ddd';
            for (let s of info.spikes) {
                const sx = s.x, sy = s.y, sw = s.w, sh = s.h;
                info.ctx.beginPath();
                info.ctx.moveTo(sx, sy + sh);
                info.ctx.lineTo(sx + sw / 2, sy);
                info.ctx.lineTo(sx + sw, sy + sh);
                info.ctx.closePath();
                info.ctx.fill();
            }
            info.ctx.restore();
        }
        // Draw player (red diamond) in the box
        info.ctx.save();
        if (info.subArena && info.moveWithSub) {
            info.ctx.translate(info.subx + info.px, info.suby + info.py);
        } else {
            info.ctx.translate(info.px, info.py);
        }
        if (Date.now() - window.lastDamageTime <= 200) info.ctx.scale(0.9, 0.9);
        info.ctx.rotate(Math.PI / 2);
        info.ctx.beginPath();
        info.ctx.moveTo(0, -info.pr);
        info.ctx.lineTo(info.pr, 0);
        info.ctx.lineTo(0, info.pr);
        info.ctx.lineTo(-info.pr, 0);
        info.ctx.closePath();
        // Blue-mode diamond color
        let invuln = Date.now() - window.lastDamageTime <= 200;
        if (info.blueMode) {
            info.ctx.fillStyle = invuln ? "#116" : "#22a";
        } else if (info.greenMode) {
            info.ctx.fillStyle = invuln ? "#1a4" : "#2e2";
        } else {
            info.ctx.fillStyle = invuln ? "#811" : "#e22";
        }
        if (!options.performanceMode) info.ctx.shadowColor = info.ctx.fillStyle;
        if (!options.performanceMode) info.ctx.shadowBlur = 8;
        info.ctx.fill();
        info.ctx.restore();

        // ── Render and update Black Heart floating combat text ───────────────
        if (info.floatingTexts && info.floatingTexts.length > 0) {
            for (let i = info.floatingTexts.length - 1; i >= 0; i--) {
                const ft = info.floatingTexts[i];
                ft.life--;
                ft.y -= 0.65; // Upward drift

                const progress = ft.life / ft.maxLife;
                const alpha = Math.min(1, progress * 1.6);

                info.ctx.save();
                info.ctx.globalAlpha = alpha;
                info.ctx.font = "bold 13px monospace";
                info.ctx.textAlign = "center";
                info.ctx.textBaseline = "bottom";

                // Dark stroke outline ensures legibility over bright lasers
                info.ctx.lineWidth = 3;
                info.ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
                info.ctx.strokeText(ft.text, ft.x, ft.y);

                if (!options.performanceMode) {
                    info.ctx.shadowColor = ft.color;
                    info.ctx.shadowBlur = 6;
                }
                info.ctx.fillStyle = ft.color;
                info.ctx.fillText(ft.text, ft.x, ft.y);
                info.ctx.restore();

                if (ft.life <= 0) {
                    info.floatingTexts.splice(i, 1);
                }
            }
        }

        // Green-mode: draw shield arc and 8 direction buttons over the diamond
        if (info.greenMode) {
            const GREEN_DIR_ANGLES = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];
            const shieldCenterAngle = GREEN_DIR_ANGLES[info.shieldDir];
            const halfArc = info.shieldArc / 2;
            const sR = info.shieldRadius;
            const drawX = (info.subArena && info.moveWithSub) ? info.subx + info.px : info.px;
            const drawY = (info.subArena && info.moveWithSub) ? info.suby + info.py : info.py;

            // Shield arc
            info.ctx.save();
            info.ctx.beginPath();
            info.ctx.arc(drawX, drawY, sR, shieldCenterAngle - halfArc, shieldCenterAngle + halfArc);
            info.ctx.lineWidth = 7;
            info.ctx.strokeStyle = "#0f0";
            if (!options.performanceMode) { info.ctx.shadowColor = "#0f0"; info.ctx.shadowBlur = 20; }
            info.ctx.stroke();
            info.ctx.beginPath();
            info.ctx.arc(drawX, drawY, sR, shieldCenterAngle - halfArc, shieldCenterAngle + halfArc);
            info.ctx.lineWidth = 3;
            info.ctx.strokeStyle = "#aff";
            if (!options.performanceMode) info.ctx.shadowBlur = 0;
            info.ctx.stroke();
            info.ctx.restore();
        }

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function mouseHandler(e) {
        updatePos(e);
        e.preventDefault();
    }
    function touchHandler(e) {
        updatePos(e, true);
        e.preventDefault();
    }
    function keydownHandler(e) {
        updateKeys(e, true);
        // Blue-spear parry: any keypress counts as a parry attempt in greenMode
        if (info.greenMode) info._parryPressed = true;
        // If blueMode and space pressed, jump
        if (info.blueMode && (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar')) {
            if (info.onGround) {
                const height = info.computedJumpHeight || (Math.abs(info.jumpStrength) || (info.values.jumpMin ?? 40));
                const g = Math.abs(info.gravity) || (info.values.gravity ?? 0.6);
                const vy0 = Math.sqrt(2 * g * height);
                info.vy = -vy0;
                info.onGround = false;
            }
            e.preventDefault();
            return;
        }
        e.preventDefault();
    }
    function keyupHandler(e) {
        updateKeys(e, false);
        e.preventDefault();
    }
    function clickHandler(e) {
        // Blue-spear parry: any click counts as a parry attempt in greenMode
        if (info.greenMode) info._parryPressed = true;
        // Green-mode: clicking sets the shield direction to whichever of the 8 sectors was clicked
        if (info.greenMode) {
            const cr = gameCanvas.getBoundingClientRect();
            const drawX = (info.subArena && info.moveWithSub) ? info.subx + info.px : info.px;
            const drawY = (info.subArena && info.moveWithSub) ? info.suby + info.py : info.py;
            const cx = e.clientX - cr.left - drawX;
            const cy = e.clientY - cr.top  - drawY;
            if (Math.hypot(cx, cy) >= info.pr) {
                let angle = Math.atan2(cy, cx);
                if (angle < 0) angle += 2 * Math.PI;
                info.shieldDir = Math.round(angle / (Math.PI / 4)) % 8;
            }
            e.preventDefault();
            return;
        }
        // Clicking jumps toward clicked horizontal position when in blueMode
        if (info.blueMode) {
            const clickX = e.clientX - info.boxLeft;
            const clickY = e.clientY - info.boxTop;
            // vertical jump toward clicked Y using computed jump height
            if (info.onGround) {
                const dy = info.py - clickY; // positive if click is above
                const absdy = Math.max(0, Math.min(dy, info.height));
                const factor = info.height > 0 ? (absdy / info.height) : 0;
                const jMin = info.values.jumpMin ?? 40;
                const jMax = info.values.jumpMax ?? 220;
                const height = jMin + factor * (jMax - jMin);
                const g = Math.abs(info.gravity) || (info.values.gravity ?? 0.6);
                const vy0 = Math.sqrt(2 * g * height);
                info.vy = -vy0;
                info.onGround = false;
            }
            // nudge horizontal velocity toward click
            const dx = clickX - info.px;
            info.vx = (info.vx || 0) + dx * 0.08;
            e.preventDefault();
            return;
        }
        updatePos(e);
        e.preventDefault();
    }

    if (!options.bhKeyboard) {
        window.addEventListener("mousemove", mouseHandler);
        window.addEventListener("touchmove", touchHandler);
        window.addEventListener("click", clickHandler);
    } else {
        window.addEventListener("keydown", keydownHandler);
        window.addEventListener("keyup", keyupHandler);
        window.addEventListener("click", clickHandler);
    }
    // Green-mode always needs keyboard for shield direction, regardless of bhKeyboard setting
    if (info.greenMode && !options.bhKeyboard) {
        window.addEventListener("keydown", keydownHandler);
        window.addEventListener("keyup", keyupHandler);
    }

    // Save handlers and overlay for cleanup on reload
    bhState.overlay = overlay;
    bhState.bossCanvas = bossCanvas;
    bhState.mouseHandler = mouseHandler;
    bhState.touchHandler = touchHandler;
    bhState.clickHandler = clickHandler;

    // End the minigame after duration
    bhState.timer = setTimeout(() => {
        if (info.active && Date.now() >= info.endTime) {
            exitGame("battle", true);
        }
    }, info.duration * 1000);
}

// --- AUTO-RESUME ON RELOAD ---
// Wrapper for a blue-diamond, platformer-style bulletHell
function bulletHellBlue(actions, values = {}, exitAction = () => {}) {
    values = values || {};
    values.blueMode = true;
    // sensible defaults for platformer feel
    if (typeof values.gravity === 'undefined') values.gravity = 0.6;
    if (typeof values.jumpStrength === 'undefined') values.jumpStrength = -12;
    return bulletHell(actions, values, exitAction);
}
// Ensure global accessibility
try { window.bulletHellBlue = bulletHellBlue } catch (e) { /* ignore in non-browser env */ } //
let storedInfo = localStorage.getItem('bhState')
if (storedInfo && storedInfo != "") {
    storedInfo = JSON.parse(storedInfo)
    if (storedInfo.active) {
        const bhState = storedInfo;
        // Calculate remaining time
        const elapsed = (Date.now() - (bhState.startTime || Date.now())) / 1000;
        const remaining = Math.max(0.1, (bhState.duration || 12) - elapsed);
        let newValues = bhState.values
        newValues.duration = remaining
        newValues.saveContent = true
        if (remaining > 0.1) {
            setTimeout(() => {
                bulletHell(bhState.actions, newValues);
            }, 500)
        } else {
            // If time is up, clean up state
            setTimeout(() => {
                if (storedInfo.exitAction) storedInfo.exitAction()
                player.subtabs["bh"]["stuff"] = "battle";
                pauseUniverseAll(["BH"], "unpause", true)
                player.universe = "U3"
                bhState.active = false;
                options.fullscreen = bhState.full;
                if (bhState.timed) bhAttack(Decimal.mul(player.bh.celestialite.damage, 3), 3, 0, "allPlayer")
                storedInfo.active = false
                localStorage.setItem('bhState', JSON.stringify(storedInfo));
            }, 500)
        }
    } else {
        setTimeout(() => {
            const bhState = storedInfo
            if (player && player.subtabs && player.subtabs["bh"]["stuff"] == "bullet") {
                if (storedInfo.exitAction) storedInfo.exitAction()
                player.subtabs["bh"]["stuff"] = "battle";
                pauseUniverseAll(["BH"], "unpause", true)
                player.universe = "U3"
                if (player.bh && player.bh.currentStage && player.bh.currentStage !== "none") {
                    bhState.active = false;
                    options.fullscreen = bhState.full;
                    if (bhState.timed) bhAttack(Decimal.mul(player.bh.celestialite.damage, 3), 3, 0, "allPlayer")
                } else {
                    options.fullscreen = false
                }
                storedInfo.active = false
                localStorage.setItem('bhState', JSON.stringify(storedInfo));
            }
        }, 1000)
    }
}
BHB.diamondAttack = {
    //bulletHell({"diamondAttack": {diamondAmount: 2, intervalDiv: 1}}, {duration: 10})
    codeFunc(info, id) {
        const diamondRadius = info.actions[id].diamondRadius ?? 40;
        for (let i = 0; i < info.actions[id].diamondAmount; i++) {
            let angleOffset = (2 * Math.PI * i) / info.actions[id].diamondAmount;
            info.bullets.push({
                name: "diamond",
                x: info.boxLeft + info.px + 200 * Math.cos(angleOffset),
                y: info.boxTop + info.py + 200 * Math.sin(angleOffset),
                vx: 0,
                vy: 0,
                r: diamondRadius,
                orbitRadius: 200,
                orbitAngle: angleOffset,
                orbitSpeed: 0.015 + 0.003 * i, // slightly different speeds
                shootInterval: (500 + Math.floor(Math.random() * 600) + i * 150) / (info.actions[id].intervalDiv || 1), // each diamond has a different interval
                lastShotTime: 0,
                draw(b, bossCtx) {
                    bossCtx.translate(b.x, b.y);
                    bossCtx.rotate(Math.PI / 2); // 90deg
                    bossCtx.beginPath();
                    bossCtx.moveTo(0, -b.r);
                    bossCtx.lineTo(b.r, 0);
                    bossCtx.lineTo(0, b.r);
                    bossCtx.lineTo(-b.r, 0);
                    bossCtx.closePath();
                    bossCtx.fillStyle = "#fff";
                    if (!options.performanceMode) bossCtx.shadowColor = "#fff";
                    if (!options.performanceMode) bossCtx.shadowBlur = 16;
                    bossCtx.fill();
                    bossCtx.resetTransform()
                }
            });
        }
        return info
    },
    moveFunc(info, ticks, id) {
        // Update each diamond's orbit and position, and handle shooting
        for (let b of info.bullets) {
            if (b.name && b.name == "diamond") {
                b.orbitAngle += b.orbitSpeed * (info.dt ?? 1);
                const playerGlobalX = info.boxLeft + info.px;
                const playerGlobalY = info.boxTop + info.py;
                const targetBx = playerGlobalX + b.orbitRadius * Math.cos(b.orbitAngle);
                const targetBy = playerGlobalY + b.orbitRadius * Math.sin(b.orbitAngle);
                // Smoothly move boss towards target position (frame-rate independent lerp)
                const lerpFactor = 1 - Math.pow(1 - 0.05, info.dt ?? 1);
                b.x += (targetBx - b.x) * lerpFactor;
                b.y += (targetBy - b.y) * lerpFactor;

                // Each diamond shoots at its own interval
                const speed = info.actions[id].enemySpeed ?? 5
                if (!b.lastShotTime) b.lastShotTime = ticks;
                if (ticks - b.lastShotTime > b.shootInterval) {
                    info.shootAtPlayer(b.x, b.y, id, speed);
                    b.lastShotTime = ticks;
                }
            }
        }
        return info
    },
}

BHB.rotatingCircleRadialBurst = {
    //bulletHell({"rotatingCircleRadialBurst": {locX: 250, locY: 250, circleAmount: 4, burstInterval: 1200, orbitSpeed: 0.015, orbitRadius: 400, bulletsPerBurst: 6, enemySpeed: 6, bulletSpeed: 5}}, {width: 500, duration: 12})
    codeFunc(info, id) {
        for (let i = 0; i < info.actions[id].circleAmount; i++) {
            let angleOffset = (2 * Math.PI * i) / info.actions[id].circleAmount;
            info.bullets.push({
                name: "circle",
                x: info.boxLeft + info.actions[id].locX + 200 * Math.cos(angleOffset),
                y: info.boxTop + info.actions[id].locY + 200 * Math.sin(angleOffset),
                vx: 0,
                vy: 0,
                r: 40,
                orbitRadius: info.actions[id].orbitRadius,
                orbitAngle: angleOffset,
                orbitSpeed: info.actions[id].orbitSpeed, // slightly different speeds
                lastBurstTime: 0,
                draw(b, ctx) {
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                    ctx.fillStyle = "#eee";
                    if (!options.performanceMode) ctx.shadowColor = "#fff";
                    if (!options.performanceMode) ctx.shadowBlur = 12;
                    ctx.fill()
                }
            });
        }
        return info
    },
    moveFunc(info, ticks, id) {
        // Ensure sensible defaults so bursts actually spawn
        info.actions[id].bulletsPerBurst = info.actions[id].bulletsPerBurst || 12;
        info.actions[id].bulletSpeed = info.actions[id].bulletSpeed || 5;

        for (let b of info.bullets) {
            if (b.name && b.name == "circle") {
                b.orbitAngle += b.orbitSpeed * (info.dt ?? 1);
                const playerGlobalX = info.boxLeft + info.actions[id].locX;
                const playerGlobalY = info.boxTop + info.actions[id].locY;
                const targetBx = playerGlobalX + b.orbitRadius * Math.cos(b.orbitAngle);
                const targetBy = playerGlobalY + b.orbitRadius * Math.sin(b.orbitAngle);
                // Smoothly move boss towards target position (frame-rate independent lerp)
                const lerpFactor = 1 - Math.pow(1 - 0.05, info.dt ?? 1);
                b.x += (targetBx - b.x) * lerpFactor;
                b.y += (targetBy - b.y) * lerpFactor;

                // Burst
                if (!b.lastBurstTime) b.lastBurstTime = Date.now()
                if (Date.now() - b.lastBurstTime > info.actions[id].burstInterval) {
                    info.fireRadialBurst(b.x, b.y, id)
                    b.lastBurstTime = Date.now()
                }
            }
        }
        return info
    },
}

BHB.bulletRain = {
    //bulletHell({"bulletRain": {bulletPerSec: 10}}, {duration: 12})
    moveFunc(info, ticks, id) {
        // Rain Bullets
        const bulletRadius = info.actions[id].bulletRadius ?? 12;
        const bulletSpeed = info.actions[id].enemySpeed ?? 4;
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const bulletsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].bulletPerSec); // LAST NUMBER IS AMOUNT OF BULLETS PER SECOND
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = Math.random() * info.width + info.boxLeft;
            let by = -bulletRadius;
            let bul = {x: bx, y: by, vx: 0, vy: bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}}
            info.bullets.push(bul);
        }
        if (bulletsToSpawn > 0) info.actions[id].lastTime = ticks;
        return info
    },
}

BHB.inverseRain = {
    //bulletHell({"inverseRain": {bulletPerSec: 10}}, {duration: 12})
    moveFunc(info, ticks, id) {
        // Rain Bullets
        const bulletRadius = info.actions[id].bulletRadius ?? 12;
        const bulletSpeed = 4;
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const bulletsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].bulletPerSec); // LAST NUMBER IS AMOUNT OF BULLETS PER SECOND
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = Math.random() * info.width + info.boxLeft;
            let by = window.innerHeight + bulletRadius;
            let bul = {x: bx, y: by, vx: 0, vy: -bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}}
            info.bullets.push(bul);
        }
        if (bulletsToSpawn > 0) info.actions[id].lastTime = ticks;
        return info
    },
}

BHB.movingCircleRadialBurstAttack = {
    //bulletHell({"movingCircleRadialBurstAttack": {circleAmount: 1, burstInterval: 1200, bulletsPerBurst: 18, enemySpeed: 6, bulletSpeed: 5}}, {duration: 12})
    codeFunc(info, id) {
        for (let i = 0; i < info.actions[id].circleAmount; i++) {
            info.bullets.push({
                name: "circle",
                x: Math.random() * (info.width - 120) + 60 + info.boxLeft,
                y: Math.random() * (info.height - 120) + 60 + info.boxTop,
                vx: (Math.random() - 0.5) * info.actions[id].enemySpeed * 2,
                vy: (Math.random() - 0.5) * info.actions[id].enemySpeed * 2,
                r: 40,
                lastBurstTime: 0,
                draw(b, ctx) {
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                    ctx.fillStyle = "#eee";
                    if (!options.performanceMode) ctx.shadowColor = "#fff";
                    if (!options.performanceMode) ctx.shadowBlur = 12;
                    ctx.fill()
                }
            });
        }
        return info
    },
    moveFunc(info, ticks, id) {
        for (let b of info.bullets) {
            if (b.name && b.name == "circle") {
                // Bounce off walls
                if (b.x < b.r + info.boxLeft) {b.x = b.r + info.boxLeft; b.vx *= -1}
                if (b.x > info.width - b.r + info.boxLeft) {b.x = info.width - b.r + info.boxLeft; b.vx *= -1}
                if (b.y < b.r + info.boxTop) {b.y = b.r + info.boxTop; b.vy *= -1}
                if (b.y > info.height - b.r + info.boxTop) {b.y = info.height - b.r + info.boxTop; b.vy *= -1}

                // Burst
                if (!b.lastBurstTime) b.lastBurstTime = Date.now()
                if (Date.now() - b.lastBurstTime > info.actions[id].burstInterval) {
                    info.fireRadialBurst(b.x, b.y, id)
                    b.lastBurstTime = Date.now()
                }
            }
        }
        return info
    },
}

BHB.knifeThrow = {
    //bulletHell({"knifeThrow": {knifeLength: 64, knifeWidth: 16, enemySpeed: 6, knifePerSec: 1.2}}, {width: 500, height: 300, duration: 15})
    moveFunc(info, ticks, id) {
        // Spawn knives
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const knivesToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].knifePerSec);
        for (let i = 0; i < knivesToSpawn; i++) {
            info.spawnKnife(id);
        }
        if (knivesToSpawn > 0) info.actions[id].lastTime = ticks;

        return info
    },
}

BHB.bouncingDiamond = {
    //bulletHell({"bouncingDiamond": {diamondCount: 6, enemySpeed: 3}}, {duration: 15})
    codeFunc(info, id) {
        const br = 25;
        for (let i = 0; i < info.actions[id].diamondCount; i++) {
            // Random position, not too close to player
            let angle = Math.random() * 2 * Math.PI;
            let dist = Math.random() * (info.width / 2 - br - info.pr) + br + info.pr + 10;
            let bx = info.width / 2 + Math.cos(angle) * dist + info.boxLeft;
            let by = info.height / 2 + Math.sin(angle) * dist + info.boxTop;
            // Random velocity
            let theta = Math.random() * 2 * Math.PI;
            let vx = Math.cos(theta) * info.actions[id].enemySpeed;
            let vy = Math.sin(theta) * info.actions[id].enemySpeed;
            info.bullets.push({
                name: "diamond",
                x: bx,
                y: by,
                vx: vx,
                vy: vy,
                r: br,
                draw(b, bossCtx) {
                    bossCtx.translate(b.x, b.y);
                    bossCtx.rotate(Math.PI / 2); // 90deg
                    bossCtx.beginPath();
                    bossCtx.moveTo(0, -b.r);
                    bossCtx.lineTo(b.r, 0);
                    bossCtx.lineTo(0, b.r);
                    bossCtx.lineTo(-b.r, 0);
                    bossCtx.closePath();
                    bossCtx.fillStyle = "#fff";
                    if (!options.performanceMode) bossCtx.shadowColor = "#fff";
                    if (!options.performanceMode) bossCtx.shadowBlur = 16;
                    bossCtx.fill();
                    bossCtx.resetTransform()
                },
            });
        }

        return info
    },
    moveFunc(info, ticks, id) {
        for (let b of info.bullets) {
            if (b.name && b.name == "diamond") {
                // Bounce off walls
                if (b.x < b.r + info.boxLeft) {b.x = b.r + info.boxLeft; b.vx *= -1}
                if (b.x > info.width - b.r + info.boxLeft) {b.x = info.width - b.r + info.boxLeft; b.vx *= -1}
                if (b.y < b.r + info.boxTop) {b.y = b.r + info.boxTop; b.vy *= -1}
                if (b.y > info.height - b.r + info.boxTop) {b.y = info.height - b.r + info.boxTop; b.vy *= -1}
            }
        }

        return info
    }
}

BHB.radialKnifeBurstAttack = {
    //bulletHell({"radialKnifeBurstAttack": {knifeLength: 64, knifeWidth: 16, burstInterval: 1500, bulletsPerBurst: 5, enemySpeed: 8}}, {duration: 12, width: 500})
    moveFunc(info, ticks, id) {
        // Fire knife burst
        if (!info.actions[id].lastTime) info.actions[id].lastTime = Date.now();
        if (Date.now() - info.actions[id].lastTime > info.actions[id].burstInterval) {
            info.fireKnifeBurst(id);
            info.actions[id].lastTime = Date.now();
        }

        return info
    },
}

//bulletHell({"bulletRain": {bulletPerSec: 10}, "knifeThrow": {knifeLength: 64, knifeWidth: 16, enemySpeed: 6, knifePerSec: 1.2}}, {duration: 15})

//bulletHell({}, {duration: 15, timed: true, cellSize: 50, start: "cell", goal: "cell"})
//bulletHell({"bouncingDiamond": {diamondCount: 6, enemySpeed: 3}}, {width: 1000, height: 700, duration: 60, timed: true, cellSize: 40, start: "cell", goal: "cell"})

//bulletHell({"knifeThrow": {knifeLength: 64, knifeWidth: 16, enemySpeed: 6, knifePerSec: 2}}, {width: 1000, height: 500, duration: 15, subArena: true, subWidth: 300})

BHB.bombAttack = {
    //bulletHell({"bombAttack": {bombsPerSecond: 1, bombFallSpeed: 4, miniBombCount: 3, miniBombSpeed: 5, miniBombDelay: 600, bulletCount: 5, bulletSpeed: 3}}, {duration: 15})
    moveFunc(info, ticks, id) {
        // Spawn bombs
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const bombsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].bombsPerSecond);
        for (let i = 0; i < bombsToSpawn; i++) {
            let x = 60 + Math.random() * (info.width - 120);
            info.bullets.push({
                name: "bomb",
                boxRender: true, // RENDER IN BOX
                x: x,
                y: -24,
                r: 24,
                vx: 0,
                vy: info.actions[id].bombFallSpeed,
                exploded: false,
                explodeTime: null,
                draw(b, bossCtx) {
                    bossCtx.beginPath();
                    bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                    bossCtx.fillStyle = '#fff';
                    if (!options.performanceMode) bossCtx.shadowColor = '#fff';
                    if (!options.performanceMode) bossCtx.shadowBlur = 12;
                    bossCtx.fill();
                },
            });
        }
        if (bombsToSpawn > 0) info.actions[id].lastTime = ticks;

        // Move bombs
        for (let b of info.bullets) {
            if (b.name == "bomb" && !b.exploded && b.y > info.height * 0.7) {
                b.exploded = true
                b.explodeTime = Date.now()
                // Spawn mini-bullets in a radial pattern
                for (let j = 0; j < info.actions[id].miniBombCount; j++) {
                    let angle = (2 * Math.PI * j) / info.actions[id].miniBombCount
                    info.bullets.push({
                        name: "minibomb",
                        boxRender: true, // RENDER IN BOX
                        x: b.x,
                        y: b.y,
                        r: 12,
                        vx: Math.cos(angle) * info.actions[id].miniBombSpeed,
                        vy: Math.sin(angle) * info.actions[id].miniBombSpeed,
                        exploded: false,
                        explodeTime: Date.now() + info.actions[id].miniBombDelay,
                        draw(b, bossCtx) {
                            bossCtx.beginPath();
                            bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                            bossCtx.fillStyle = '#fff';
                            if (!options.performanceMode) bossCtx.shadowColor = '#fff';
                            if (!options.performanceMode) bossCtx.shadowBlur = 8;
                            bossCtx.fill();
                        },
                    })
                }
            }
            if (b.name == "minibomb" && !b.exploded && Date.now() >= b.explodeTime) {
                b.exploded = true
                // Spawn bullets in a radial pattern
                for (let k = 0; k < info.actions[id].bulletCount; k++) {
                    let angle = (2 * Math.PI * k) / info.actions[id].bulletCount;
                    info.bullets.push({
                        boxRender: true, // RENDER IN BOX
                        x: b.x,
                        y: b.y,
                        r: 8,
                        vx: Math.cos(angle) * info.actions[id].bulletSpeed,
                        vy: Math.sin(angle) * info.actions[id].bulletSpeed,
                        draw(b, bossCtx) {
                            bossCtx.beginPath();
                            bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                            bossCtx.fillStyle = '#fff';
                            if (!options.performanceMode) bossCtx.shadowColor = '#fff';
                            if (!options.performanceMode) bossCtx.shadowBlur = 4;
                            bossCtx.fill();
                        },
                    });
                }
            }
        }

        return info
    },
}

//bulletHell({"bulletRain": {bulletPerSec: 18}, "knifeThrow": {knifeLength: 64, knifeWidth: 16, enemySpeed: 8, knifePerSec: 1.5}}, {width: window.innerWidth, height: window.innerHeight, duration: 15})

BHB.centerSpiralAttack = {
    //bulletHell({"centerSpiralAttack": {spiralAngle: 0, spiralRate: 0.325, spiralInterval: 30, radialStart: 64, bulletSpeed: 7, spiralKnives: true, knifeLength: 64, knifeWidth: 16}}, {width: window.innerWidth, height: window.innerHeight, duration: 15})
    moveFunc(info, ticks, id) {
        // Spiral fire
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        if (ticks - info.actions[id].lastTime > info.actions[id].spiralInterval) {
            let spiX = info.width / 2 + info.boxLeft
            let spiY = info.height / 2 + info.boxTop
            if (info.actions[id].locX) spiX = info.actions[id].locX + info.boxLeft
            if (info.actions[id].locY) spiY = info.actions[id].locY + info.boxTop
            info.spawnSpiralProjectile(spiX, spiY, info.actions[id].radialStart, id)
            info.actions[id].spiralAngle += info.actions[id].spiralRate;
            info.actions[id].lastTime = ticks;
        }

        return info
    },
}

BHB.centerSpreadAttack = {
    //bulletHell({"centerSpreadAttack": {bulletSpeed: 6, spreadInterval: 1000, spreadCount: 7, spreadAngle: Math.PI/3}}, {width: window.innerWidth, height: window.innerHeight, duration: 15})
    moveFunc(info, ticks, id) {
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        if (ticks - info.actions[id].lastTime > info.actions[id].spreadInterval) {
            info.shootSpreadAtPlayer(info.width / 2 + info.boxLeft, info.height / 2 + info.boxTop, id);
            info.actions[id].lastTime = ticks;
        }

        return info
    },
}

BHB.centerSingleAttack = {
    //bulletHell({"centerSingleAttack": {bulletSpeed: 6, shootInterval: 1000}}, {width: window.innerWidth, height: window.innerHeight, duration: 15})
    moveFunc(info, ticks, id) {
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        if (ticks - info.actions[id].lastTime > info.actions[id].shootInterval) {
            info.shootAtPlayer(info.width / 2 + info.boxLeft, info.height / 2 + info.boxTop, id, info.actions[id].bulletSpeed);
            info.actions[id].lastTime = ticks;
        }

        return info
    },
}

BHB.centerIcon = {
    //bulletHell({"centerIcon": {radius: 64, fillColor: "#fff", strokeColor: "#e22", symbol: "âŠ˜"}}, {width: window.innerWidth, height: window.innerHeight, duration: 15})
    codeFunc(info, id) {
        let curX = info.width / 2 + info.boxLeft
        let curY = info.height / 2 + info.boxTop
        if (info.actions[id].locX) curX = info.actions[id].locX
        if (info.actions[id].locY) curY = info.actions[id].locY
        info.bullets.push({
            name: "symbol",
            boxRender: true,
            symbol: info.actions[id].symbol,
            fill: info.actions[id].fillColor,
            stroke: info.actions[id].strokeColor,
            angle: 0,
            x: curX,
            y: curY,
            vx: 0,
            vy: 0,
            r: info.actions[id].radius,
            draw(b, bossCtx) {
                // Draw big symbol (âŠ˜)
                bossCtx.save();
                bossCtx.translate(b.x, b.y);
                bossCtx.font = 'bold ' + b.r*2 + 'px serif';
                bossCtx.textAlign = 'center';
                bossCtx.textBaseline = 'middle';
                bossCtx.globalAlpha = 0.92;
                if (!options.performanceMode) bossCtx.shadowColor = '#fff';
                if (!options.performanceMode) bossCtx.shadowBlur = 32;
                bossCtx.fillStyle = b.fill;
                bossCtx.fillText(b.symbol, 0, 0);
                bossCtx.globalAlpha = 1;
                if (!options.performanceMode) bossCtx.shadowBlur = 0;
                bossCtx.lineWidth = 6;
                bossCtx.strokeStyle = b.stroke;
                bossCtx.strokeText(b.symbol, 0, 0);
                bossCtx.restore();
                /*
                // Draw a spiral pattern inside
                bossCtx.save();
                bossCtx.translate(b.x, b.y - 5);
                bossCtx.rotate(b.angle);
                bossCtx.strokeStyle = b.stroke;
                bossCtx.lineWidth = 2;
                for (let i = 0; i < 8; i++) {
                    bossCtx.beginPath();
                    bossCtx.arc(0, 0, b.r, i * Math.PI / 4, i * Math.PI / 4 + Math.PI / 8);
                    bossCtx.stroke();
                }
                bossCtx.restore();
                */
            },
        })

        return info
    },
    moveFunc(info, ticks, id) {
        for (let b of info.bullets) {
            if (b.name && b.name == "symbol") {
                b.angle += 1.44
            }
        }

        return info
    },
}

//bulletHell({"centerSpiralAttack": {spiralAngle: 0, spiralRate: 0.325, spiralInterval: 30, radialStart: 64, bulletSpeed: 7, spiralKnives: true, knifeLength: 64, knifeWidth: 16}, "bouncingDiamond": {diamondCount: 3, enemySpeed: 4}, "centerSpreadAttack": {bulletSpeed: 6, spreadInterval: 1000, spreadCount: 7, spreadAngle: Math.PI/3}, "centerIcon": {radius: 64, fillColor: "#fff", strokeColor: "#e22", symbol: "âŠ˜"}}, {width: window.innerWidth, height: window.innerHeight, duration: 15, transparent: true, saveContent: true})

BHB.finalMatosAttack = {
    //bulletHell({"finalMatosAttack": {radius: 64, fillColor: "#fff", strokeColor: "#e22", symbol: "âŠ˜", burstBullets: 8, burstViolence: 0.5, lungeTimer: 0, lungeCooldown: 0, explosionBurstTimer: 0, explosionBurstCount: 0, lastTick: false}, "bulletRain": {bulletPerSec: 12, duration: 15}, "knifeThrow": {knifeLength: 64, knifeWidth: 16, enemySpeed: 8, knifePerSec: 1.2, duration: 15}}, {width: window.innerWidth, height: window.innerHeight, duration: 19, transparent: true, saveContent: true})
    codeFunc(info, id) {
        info.bullets = info.bullets.filter(b => {
            if (b.name && (b.name == "diamond" || b.name == "symbol")) return false
        });

        info.bullets.push({
            name: "symbol",
            boxRender: true,
            symbol: info.actions[id].symbol,
            fill: info.actions[id].fillColor,
            stroke: info.actions[id].strokeColor,
            x: info.width / 2,
            y: info.height / 2,
            r: info.actions[id].radius,
            vx: 0,
            vy: 0,
            pulse: 0,
            pulsingRed: false,
            visible: true,
            burst: false,
            draw(b, bossCtx) {
                if (b.visible) {
                    // Draw big symbol (âŠ˜)
                    bossCtx.save();
                    bossCtx.translate(b.x, b.y);
                    let pulseScale = 1 + 0.18 * Math.sin(b.pulse * 2);
                    bossCtx.scale(pulseScale, pulseScale);
                    bossCtx.font = 'bold ' + b.r*2 + 'px serif';
                    bossCtx.textAlign = 'center';
                    bossCtx.textBaseline = 'middle';
                    bossCtx.globalAlpha = 0.92;
                    if (!options.performanceMode) bossCtx.shadowColor = b.pulsingRed ? '#e22' : '#fff';
                    if (!options.performanceMode) bossCtx.shadowBlur = 32;
                    bossCtx.fillStyle = b.pulsingRed ? '#e22' : b.fill;
                    bossCtx.fillText(b.symbol, 0, 0);
                    bossCtx.globalAlpha = 1;
                    if (!options.performanceMode) bossCtx.shadowBlur = 0;
                    bossCtx.lineWidth = 6;
                    bossCtx.strokeStyle = b.pulsingRed ? '#fff' : b.stroke;
                    bossCtx.strokeText(b.symbol, 0, 0);
                    bossCtx.restore();
                }
            },
        })

        return info
    },
    moveFunc(info, ticks, id) {
        let dt = ticks - (info.actions[id].lastTick || ticks);
        info.actions[id].lastTick = ticks;
        for (let b of info.bullets) {
            if (b.name && b.name == "symbol") {
                if (b.visible && Date.now() > info.startTime + 15000) {
                    b.visible = false
                }
                
                // Phase 4: Symbol lunges, pulses, shoots in bursts, throws knives
                if (b.visible) {
                    // Lunge logic
                    if (!b.pulsingRed && info.actions[id].lungeCooldown <= 0) {
                        info.actions[id].lungeTimer = 1200;
                        let dx = info.px - b.x;
                        let dy = info.py - b.y;
                        let dist = Math.hypot(dx, dy);
                        b.vx = (dx / dist) * 7;
                        b.vy = (dy / dist) * 7;
                        b.pulsingRed = true;
                    } else if (!b.pulsingRed) {
                        info.actions[id].lungeCooldown -= dt;
                    }
                    if (b.pulsingRed) {
                        info.actions[id].lungeTimer -= dt;
                        if (info.actions[id].lungeTimer <= 0) {
                            b.vx = 0;
                            b.vy = 0;
                            b.pulsingRed = false;
                            info.actions[id].lungeCooldown = 1200 + Math.random() * 800;
                        }
                    }

                    // Pulse
                    b.pulse += dt * 0.008

                    // Shoot burst at player
                    if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
                    if (ticks - info.actions[id].lastTime > 650) {
                        let dx = info.px - b.x;
                        let dy = info.py - b.y;
                        let baseAngle = Math.atan2(dy, dx);
                        for (let i = 0; i < info.actions[id].burstBullets; i++) {
                            let spread = (i - (info.actions[id].burstBullets - 1) / 2) * info.actions[id].burstViolence;
                            let angle = baseAngle + spread + (Math.random() - 0.5) * 0.18;
                            let vx = Math.cos(angle) * 8 * (0.9 + Math.random() * 0.3);
                            let vy = Math.sin(angle) * 8 * (0.9 + Math.random() * 0.3);
                            info.bullets.push({x: b.x, y: b.y, r: 12, vx, vy, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}});
                        }
                        // Randomize next burst
                        info.actions[id].burstBullets = 7 + Math.floor(Math.random() * 4);
                        info.actions[id].burstViolence = 0.25 + Math.random() * 0.5;

                        info.actions[id].lastTime = ticks;
                    }
                } else {
                    if (!b.burst) {
                        info.actions[id].explosionBurstTimer += dt;
                        if (info.actions[id].explosionBurstCount < 4 && info.actions[id].explosionBurstTimer > 220) {
                            let N = 32;
                            let baseAngle = Math.random() * Math.PI * 2;
                            for (let i = 0; i < N; i++) {
                                let angle = baseAngle + (2 * Math.PI * i) / N;
                                let vx = Math.cos(angle) * 8 * (1.1 + Math.random() * 0.3);
                                let vy = Math.sin(angle) * 8 * (1.1 + Math.random() * 0.3);
                                info.bullets.push({x: b.x, y: b.y, r: 12, vx, vy, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}});
                            }
                            info.actions[id].explosionBurstCount++;
                            info.actions[id].explosionBurstTimer = 0;
                        }
                        if (info.actions[id].explosionBurstCount >= 4) {
                            b.burst = true;
                        }
                    }
                }
            }
        }

        return info
    },
}

BHB.chargingIcon = {
    //bulletHell({"chargingIcon": {locX: 600, locY: 250, radius: 64, fillColor: "#0091DC", strokeColor: "#094394", symbol: "â§–", enemySpeed: 5, bulletSpeed: 5, shootInterval: 1, burstBullets: 3, burstViolence: 0.5, lungeTimer: 0, lungeCooldown: 0, lastTick: false}}, {duration: 12})
    codeFunc(info, id) {
        let curX = info.width / 2 + info.boxLeft
        let curY = info.height / 2 + info.boxTop
        if (info.actions[id].locX) curX = info.actions[id].locX
        if (info.actions[id].locY) curY = info.actions[id].locY
        info.bullets.push({
            name: "symbol",
            boxRender: true,
            symbol: info.actions[id].symbol,
            fill: info.actions[id].fillColor,
            stroke: info.actions[id].strokeColor,
            x: curX,
            y: curY,
            r: info.actions[id].radius,
            vx: 0,
            vy: 0,
            pulse: 0,
            pulsingRed: false,
            draw(b, bossCtx) {
                // Draw big symbol (âŠ˜)
                bossCtx.save();
                bossCtx.translate(b.x, b.y);
                let pulseScale = 1 + 0.18 * Math.sin(b.pulse * 2);
                bossCtx.scale(pulseScale, pulseScale);
                bossCtx.font = 'bold ' + b.r*2 + 'px serif';
                bossCtx.textAlign = 'center';
                bossCtx.textBaseline = 'middle';
                bossCtx.globalAlpha = 0.92;
                if (!options.performanceMode) bossCtx.shadowColor = b.pulsingRed ? '#e22' : '#fff';
                if (!options.performanceMode) bossCtx.shadowBlur = 32;
                bossCtx.fillStyle = b.pulsingRed ? '#e22' : b.fill;
                bossCtx.fillText(b.symbol, 0, 0);
                bossCtx.globalAlpha = 1;
                if (!options.performanceMode) bossCtx.shadowBlur = 0;
                bossCtx.lineWidth = 6;
                bossCtx.strokeStyle = b.pulsingRed ? '#fff' : b.stroke;
                bossCtx.strokeText(b.symbol, 0, 0);
                bossCtx.restore();
            },
        })

        return info
    },
    moveFunc(info, ticks, id) {
        let dt = ticks - (info.actions[id].lastTick || ticks);
        info.actions[id].lastTick = ticks;
        for (let b of info.bullets) {
            if (b.name && b.name == "symbol") {
                // Lunge logic
                if (!b.pulsingRed && info.actions[id].lungeCooldown <= 0) {
                    info.actions[id].lungeTimer = 1200;
                    let dx = info.px - b.x;
                    let dy = info.py - b.y;
                    let dist = Math.hypot(dx, dy);
                    b.vx = (dx / dist) * info.actions[id].enemySpeed;
                    b.vy = (dy / dist) * info.actions[id].enemySpeed;
                    b.pulsingRed = true;
                } else if (!b.pulsingRed) {
                    info.actions[id].lungeCooldown -= dt;
                }
                if (b.pulsingRed) {
                    info.actions[id].lungeTimer -= dt;
                    if (info.actions[id].lungeTimer <= 0) {
                        b.vx = 0;
                        b.vy = 0;
                        b.pulsingRed = false;
                        info.actions[id].lungeCooldown = 1200 + Math.random() * 800;
                    }
                }

                // Pulse
                b.pulse += dt * 0.008

                // Shoot burst at player
                let shootSpeed = 1000 / (info.actions[id].shootInterval || 1.5)
                if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
                if (ticks - info.actions[id].lastTime > shootSpeed) {
                    let dx = info.px - b.x;
                    let dy = info.py - b.y;
                    let baseAngle = Math.atan2(dy, dx);
                    let speed = info.actions[id].bulletSpeed || 8
                    for (let i = 0; i < info.actions[id].burstBullets; i++) {
                        let spread = (i - (info.actions[id].burstBullets - 1) / 2) * info.actions[id].burstViolence;
                        let angle = baseAngle + spread + (Math.random() - 0.5) * 0.18;
                        let vx = Math.cos(angle) * speed * (0.9 + Math.random() * 0.3);
                        let vy = Math.sin(angle) * speed * (0.9 + Math.random() * 0.3);
                        info.bullets.push({x: b.x + info.boxLeft, y: b.y + info.boxTop, r: 12, vx, vy, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}});
                    }
                    // Randomize next burst
                    info.actions[id].burstViolence = 0.25 + Math.random() * 0.5;

                    info.actions[id].lastTime = ticks;
                }
            }
        }
        return info
    },
}

BHB.bouncingIcon = {
    //bulletHell({"bouncingIcon": {locX: 600, locY: 250, radius: 64, fillColor: "#0091DC", strokeColor: "#094394", symbol: "â§–", enemySpeed: 6, shootInterval: 400}}, {duration: 12})
    codeFunc(info, id) {
        let curX = info.width / 2 + info.boxLeft
        let curY = info.height / 2 + info.boxTop
        if (info.actions[id].locX) curX = info.actions[id].locX
        if (info.actions[id].locY) curY = info.actions[id].locY
        // Random velocity
        let theta = Math.random() * 2 * Math.PI;
        let vx = Math.cos(theta) * info.actions[id].enemySpeed;
        let vy = Math.sin(theta) * info.actions[id].enemySpeed;
        info.bullets.push({
            name: "symbol",
            boxRender: true,
            symbol: info.actions[id].symbol,
            fill: info.actions[id].fillColor,
            stroke: info.actions[id].strokeColor,
            x: curX,
            y: curY,
            r: info.actions[id].radius,
            vx: vx,
            vy: vy,
            shootInterval: info.actions[id].shootInterval,
            lastShotTime: 0,
            draw(b, bossCtx) {
                // Draw big symbol (âŠ˜)
                bossCtx.save();
                bossCtx.translate(b.x, b.y);
                bossCtx.font = 'bold ' + b.r*2 + 'px serif';
                bossCtx.textAlign = 'center';
                bossCtx.textBaseline = 'middle';
                bossCtx.globalAlpha = 0.92;
                if (!options.performanceMode) bossCtx.shadowColor = '#fff';
                if (!options.performanceMode) bossCtx.shadowBlur = 32;
                bossCtx.fillStyle = b.fill;
                bossCtx.fillText(b.symbol, 0, 0);
                bossCtx.globalAlpha = 1;
                if (!options.performanceMode) bossCtx.shadowBlur = 0;
                bossCtx.lineWidth = 6;
                bossCtx.strokeStyle = b.stroke;
                bossCtx.strokeText(b.symbol, 0, 0);
                bossCtx.restore();
            },
        })

        return info
    },
    moveFunc(info, ticks, id) {
        for (let b of info.bullets) {
            if (b.name && b.name == "symbol") {
                // Bounce off walls
                if (b.x < b.r) {b.x = b.r; b.vx *= -1}
                if (b.x > info.width - b.r) {b.x = info.width - b.r; b.vx *= -1}
                if (b.y < b.r) {b.y = b.r; b.vy *= -1}
                if (b.y > info.height - b.r) {b.y = info.height - b.r; b.vy *= -1}

                // Shoot at player
                if (!b.lastShotTime) b.lastShotTime = ticks;
                if (ticks - b.lastShotTime > b.shootInterval) {
                    info.shootAtPlayer(b.x + info.boxLeft, b.y + info.boxTop, id);
                    b.lastShotTime = ticks;
                }
            }
        }
        return info
    },
}

BHB.chargingBee = {
    // bulletHell({"chargingBee": {beeAmount: 5, radius: 20, enemySpeed: 5}}, {width: 400, height: 400, duration: 10})
    codeFunc(info, id) {
        const act = info.actions[id];
        const count = act.beeAmount || 5;
        const radius = act.radius || 20;

        for (let i = 0; i < count; i++) {
            info.bullets.push({
                name: "chargeBee",
                boxRender: true,
                angle: Math.PI,
                x: (info.width / (count + 1)) * (i + 1),
                y: -30,
                r: radius,
                vx: 0,
                vy: 0,
                pulsingRed: false,
                lungeTimer: 0,
                lungeCooldown: 300 + i * 250, // Stagger lunges so they don't all strike at once
                draw(b, ctx) {
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = b.r / 10;
                    if (!options.performanceMode) {
                        ctx.shadowColor = b.pulsingRed ? '#e22' : "#fff";
                        ctx.shadowBlur = 2;
                    }

                    // Wings
                    ctx.beginPath();
                    ctx.arcTo(0, 0, -b.r / 2, b.r / 2, b.r / 4);
                    ctx.arcTo(-b.r / 2, b.r / 2, -b.r, 0, b.r / 4);
                    ctx.arcTo(-b.r, 0, -b.r / 2, -b.r / 2, b.r / 4);
                    ctx.arcTo(-b.r / 2, -b.r / 2, 0, 0, b.r / 4);
                    ctx.arcTo(0, 0, b.r / 2, b.r / 2, b.r / 4);
                    ctx.arcTo(b.r / 2, b.r / 2, b.r, 0, b.r / 4);
                    ctx.arcTo(b.r, 0, b.r / 2, -b.r / 2, b.r / 4);
                    ctx.arcTo(b.r / 2, -b.r / 2, 0, 0, b.r / 4);
                    ctx.closePath();
                    ctx.fillStyle = b.pulsingRed ? '#e22' : "#aaf";
                    ctx.fill();
                    ctx.stroke();

                    // Abdomen
                    ctx.beginPath();
                    ctx.arcTo(0, 0, b.r / 4, b.r / 4, b.r / 4);
                    ctx.arcTo(b.r / 4, b.r / 4, b.r / 2, (b.r * 3) / 4, b.r / 4);
                    ctx.arcTo(b.r / 2, (b.r * 3) / 4, 0, b.r + (b.r / 2), b.r / 3);
                    ctx.arcTo(0, b.r + (b.r / 2), -b.r / 2, (b.r * 3) / 4, b.r / 3);
                    ctx.arcTo(-b.r / 2, (b.r * 3) / 4, -b.r / 4, b.r / 4, b.r / 3);
                    ctx.arcTo(-b.r / 4, b.r / 4, 0, 0, b.r / 4);
                    ctx.closePath();
                    ctx.fillStyle = "#E9AB17";
                    ctx.fill();
                    ctx.stroke();

                    // Stripes
                    ctx.beginPath();
                    ctx.moveTo(b.r / 4, b.r / 4);
                    ctx.quadraticCurveTo(b.r / 4, b.r / 2, 0, b.r / 2);
                    ctx.moveTo(-b.r / 4, b.r / 4);
                    ctx.quadraticCurveTo(-b.r / 4, b.r / 2, 0, b.r / 2);
                    ctx.moveTo(b.r / 2 - 1, (b.r * 3) / 4);
                    ctx.quadraticCurveTo(b.r / 3 - 1, b.r, 0, b.r);
                    ctx.moveTo(-b.r / 2 + 1, (b.r * 3) / 4);
                    ctx.quadraticCurveTo(-b.r / 3 + 1, b.r, 0, b.r);
                    ctx.stroke();

                    // Head
                    ctx.beginPath();
                    ctx.arcTo(0, 0, b.r / 2, -b.r / 2, b.r / 3);
                    ctx.arcTo(b.r / 2, -b.r / 2, 0, -b.r, b.r / 3);
                    ctx.arcTo(0, -b.r, -b.r / 2, -b.r / 2, b.r / 3);
                    ctx.arcTo(-b.r / 2, -b.r / 2, 0, 0, b.r / 3);
                    ctx.closePath();
                    ctx.fillStyle = "#E9AB17";
                    ctx.fill();
                    ctx.stroke();

                    // Antennae
                    ctx.beginPath();
                    ctx.moveTo(-b.r / 4, -(b.r * 3) / 4);
                    ctx.quadraticCurveTo(-b.r / 8, -(b.r + (b.r / 4)), (-b.r * 3) / 8, -(b.r + (b.r / 8)));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(b.r / 4, -(b.r * 3) / 4);
                    ctx.quadraticCurveTo(b.r / 8, -(b.r + (b.r / 4)), (b.r * 3) / 8, -(b.r + (b.r / 8)));
                    ctx.stroke();

                    ctx.restore();
                }
            });
        }
        return info;
    },
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        const dt = info.dtMs || 16.67;
        const speed = act.enemySpeed || 5;

        for (let b of info.bullets) {
            if (b.name === "chargeBee") {
                if (!b.pulsingRed) {
                    b.lungeCooldown -= dt;
                    if (b.lungeCooldown <= 0) {
                        b.lungeTimer = 750;
                        const targetX = info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
                        const targetY = info.py + (info.subArena && info.moveWithSub ? info.suby : 0);
                        const dx = (targetX + (Math.random() - 0.5) * 60) - b.x;
                        const dy = (targetY + (Math.random() - 0.5) * 60) - b.y;
                        const dist = Math.hypot(dx, dy) || 1;

                        b.vx = (dx / dist) * speed;
                        b.vy = (dy / dist) * speed;
                        b.angle = Math.atan2(dy, dx) + Math.PI / 2;
                        b.pulsingRed = true;
                    }
                } else {
                    b.lungeTimer -= dt;
                    if (b.lungeTimer <= 0) {
                        b.vx = 0;
                        b.vy = 0;
                        b.pulsingRed = false;
                        b.lungeCooldown = 1000 + Math.random() * 800;

                        // Reposition above if they lunged past the arena floor
                        if (b.y > info.height + 20) b.y = -30;
                        if (b.x < -20) b.x = info.width + 10;
                        if (b.x > info.width + 20) b.x = -10;
                    }
                }
            }
        }
        return info;
    }
};
BHB.shootBee = {
    //bulletHell({"shootBee": {beesPerSec: 2, radius: 20, enemySpeed: 5}}, {width: 400, height: 400, duration: 10})
    moveFunc(info, ticks, id) {
        // Spawn knives
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const beesToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].beesPerSec);
        for (let i = 0; i < beesToSpawn; i++) {
            // Pick a random edge and a random point on that edge
            const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
            let bx, by, angle;
            if (edge === 0) { // top
                bx = Math.random() * info.width;
                by = -info.actions[id].radius;
            } else if (edge === 1) { // right
                bx = info.width + info.actions[id].radius;
                by = Math.random() * info.height;
            } else if (edge === 2) { // bottom
                bx = Math.random() * info.width;
                by = info.height + info.actions[id].radius;
            } else { // left
                bx = -info.actions[id].radius;
                by = Math.random() * info.height;
            }
            // Angle toward player
            let dx = info.px - bx;
            let dy = info.py - by;
            if (info.subArena && info.moveWithSub) {
                dx += info.subx
                dy += info.suby
            }
            angle = Math.atan2(dy, dx);
            // Store initial spawn for path line
            info.bullets.push({
                name: "Bee",
                boxRender: true, // RENDER IN BOX
                x: bx,
                y: by,
                angle: angle + Math.PI/2,
                r: info.actions[id].radius,
                vx: Math.cos(angle) * info.actions[id].enemySpeed,
                vy: Math.sin(angle) * info.actions[id].enemySpeed,
                draw(b, bossCtx) {
                    bossCtx.translate(b.x, b.y);
                    bossCtx.rotate(b.angle);
                    bossCtx.strokeStyle = "#000";
                    bossCtx.lineWidth = info.actions[id].radius/10;
                    if (!options.performanceMode) bossCtx.shadowColor = "#fff";
                    if (!options.performanceMode) bossCtx.shadowBlur = 2;
                    // Wings
                    bossCtx.beginPath()
                    bossCtx.arcTo(0, 0, -b.r/2, b.r/2, b.r/4)
                    bossCtx.arcTo(-b.r/2, b.r/2, -b.r, 0, b.r/4)
                    bossCtx.arcTo(-b.r, 0, -b.r/2, -b.r/2, b.r/4)
                    bossCtx.arcTo(-b.r/2, -b.r/2, 0, 0, b.r/4)
                    bossCtx.arcTo(0, 0, b.r/2, b.r/2, b.r/4)
                    bossCtx.arcTo(b.r/2, b.r/2, b.r, 0, b.r/4)
                    bossCtx.arcTo(b.r, 0, b.r/2, -b.r/2, b.r/4)
                    bossCtx.arcTo(b.r/2, -b.r/2, 0, 0, b.r/4)
                    bossCtx.closePath()
                    bossCtx.fillStyle = "#aaf";
                    bossCtx.fill();
                    bossCtx.stroke()
                    // Butt
                    bossCtx.beginPath()
                    bossCtx.arcTo(0, 0, b.r/4, b.r/4, b.r/4)
                    bossCtx.arcTo(b.r/4, b.r/4, b.r/2, (b.r*3)/4, b.r/4)
                    bossCtx.arcTo(b.r/2, (b.r*3)/4, 0, b.r+(b.r/2), b.r/3)
                    bossCtx.arcTo(0, b.r+(b.r/2), -b.r/2, (b.r*3)/4, b.r/3)
                    bossCtx.arcTo(-b.r/2, (b.r*3)/4, -b.r/4, b.r/4, b.r/3)
                    bossCtx.arcTo(-b.r/4, b.r/4, 0, 0, b.r/4)
                    bossCtx.closePath()
                    bossCtx.fillStyle = "#E9AB17";
                    bossCtx.fill();
                    bossCtx.stroke()
                    // Stripes
                    bossCtx.beginPath()
                    bossCtx.moveTo(b.r/4, b.r/4)
                    bossCtx.quadraticCurveTo(b.r/4, b.r/2, 0, b.r/2)
                    bossCtx.moveTo(-b.r/4, b.r/4)
                    bossCtx.quadraticCurveTo(-b.r/4, b.r/2, 0, b.r/2)
                    bossCtx.moveTo(b.r/2-1, (b.r*3)/4)
                    bossCtx.quadraticCurveTo(b.r/3-1, b.r, 0, b.r)
                    bossCtx.moveTo(-b.r/2+1, (b.r*3)/4)
                    bossCtx.quadraticCurveTo(-b.r/3+1, b.r, 0, b.r)
                    bossCtx.stroke()

                    // Head
                    bossCtx.beginPath()
                    bossCtx.arcTo(0, 0, b.r/2, -b.r/2, b.r/3)
                    bossCtx.arcTo(b.r/2, -b.r/2, 0, -b.r, b.r/3)
                    bossCtx.arcTo(0, -b.r, -b.r/2, -b.r/2, b.r/3)
                    bossCtx.arcTo(-b.r/2, -b.r/2, 0, 0, b.r/3)
                    bossCtx.closePath()
                    bossCtx.fillStyle = "#E9AB17";
                    bossCtx.fill();
                    bossCtx.stroke()
                    // Antenna
                    bossCtx.beginPath()
                    bossCtx.moveTo(-b.r/4, -(b.r*3)/4)
                    bossCtx.quadraticCurveTo(-b.r/8, -(b.r+(b.r/4)), (-b.r*3)/8, -(b.r+(b.r/8)))
                    bossCtx.stroke()
                    bossCtx.beginPath()
                    bossCtx.moveTo(b.r/4, -(b.r*3)/4)
                    bossCtx.quadraticCurveTo(b.r/8, -(b.r+(b.r/4)), (b.r*3)/8, -(b.r+(b.r/8)))
                    bossCtx.stroke()

                    bossCtx.resetTransform()
                }
            })
        }
        if (beesToSpawn > 0) info.actions[id].lastTime = ticks;

        return info
    },
}

BHB.bouncingBees = {
    //bulletHell({"bouncingBees": {beeAmount: 10, radius: 20, enemySpeed: 3, chargeMult: 1.5, lastTick: false}}, {duration: 10})
    codeFunc(info, id) {
        for (let i = 0; i < info.actions[id].beeAmount; i++) {
            // Random position, not too close to player
            let angle = Math.random() * 2 * Math.PI;
            let dist = Math.random() * (info.width / 2 - info.actions[id].radius - info.pr) + info.actions[id].radius + info.pr + 10;
            let bx = info.width / 2 + Math.cos(angle) * dist + info.boxLeft;
            let by = info.height / 2 + Math.sin(angle) * dist + info.boxTop;
            // Random velocity
            let theta = Math.random() * 2 * Math.PI;
            let vx = Math.cos(theta) * info.actions[id].enemySpeed;
            let vy = Math.sin(theta) * info.actions[id].enemySpeed;
            info.bullets.push({
                name: "bounceBee",
                x: bx,
                y: by,
                vx: vx,
                vy: vy,
                angle: theta,
                r: info.actions[id].radius,
                pulsingRed: false,
                lungeTimer: 0,
                lungeCooldown: 1000,
                draw(b, bossCtx) {
                    bossCtx.translate(b.x, b.y);
                    bossCtx.rotate(b.angle + Math.PI/2);
                    bossCtx.strokeStyle = "#000";
                    bossCtx.lineWidth = info.actions[id].radius/10;
                    if (!options.performanceMode) bossCtx.shadowColor = b.pulsingRed ? '#e22' : "#fff";
                    if (!options.performanceMode) bossCtx.shadowBlur = 2;
                    // Wings
                    bossCtx.beginPath()
                    bossCtx.arcTo(0, 0, -b.r/2, b.r/2, b.r/4)
                    bossCtx.arcTo(-b.r/2, b.r/2, -b.r, 0, b.r/4)
                    bossCtx.arcTo(-b.r, 0, -b.r/2, -b.r/2, b.r/4)
                    bossCtx.arcTo(-b.r/2, -b.r/2, 0, 0, b.r/4)
                    bossCtx.arcTo(0, 0, b.r/2, b.r/2, b.r/4)
                    bossCtx.arcTo(b.r/2, b.r/2, b.r, 0, b.r/4)
                    bossCtx.arcTo(b.r, 0, b.r/2, -b.r/2, b.r/4)
                    bossCtx.arcTo(b.r/2, -b.r/2, 0, 0, b.r/4)
                    bossCtx.closePath()
                    bossCtx.fillStyle = b.pulsingRed ? '#e22' : "#aaf";
                    bossCtx.fill();
                    bossCtx.stroke()
                    // Butt
                    bossCtx.beginPath()
                    bossCtx.arcTo(0, 0, b.r/4, b.r/4, b.r/4)
                    bossCtx.arcTo(b.r/4, b.r/4, b.r/2, (b.r*3)/4, b.r/4)
                    bossCtx.arcTo(b.r/2, (b.r*3)/4, 0, b.r+(b.r/2), b.r/3)
                    bossCtx.arcTo(0, b.r+(b.r/2), -b.r/2, (b.r*3)/4, b.r/3)
                    bossCtx.arcTo(-b.r/2, (b.r*3)/4, -b.r/4, b.r/4, b.r/3)
                    bossCtx.arcTo(-b.r/4, b.r/4, 0, 0, b.r/4)
                    bossCtx.closePath()
                    bossCtx.fillStyle = "#E9AB17";
                    bossCtx.fill();
                    bossCtx.stroke()
                    // Stripes
                    bossCtx.beginPath()
                    bossCtx.moveTo(b.r/4, b.r/4)
                    bossCtx.quadraticCurveTo(b.r/4, b.r/2, 0, b.r/2)
                    bossCtx.moveTo(-b.r/4, b.r/4)
                    bossCtx.quadraticCurveTo(-b.r/4, b.r/2, 0, b.r/2)
                    bossCtx.moveTo(b.r/2-1, (b.r*3)/4)
                    bossCtx.quadraticCurveTo(b.r/3-1, b.r, 0, b.r)
                    bossCtx.moveTo(-b.r/2+1, (b.r*3)/4)
                    bossCtx.quadraticCurveTo(-b.r/3+1, b.r, 0, b.r)
                    bossCtx.stroke()

                    // Head
                    bossCtx.beginPath()
                    bossCtx.arcTo(0, 0, b.r/2, -b.r/2, b.r/3)
                    bossCtx.arcTo(b.r/2, -b.r/2, 0, -b.r, b.r/3)
                    bossCtx.arcTo(0, -b.r, -b.r/2, -b.r/2, b.r/3)
                    bossCtx.arcTo(-b.r/2, -b.r/2, 0, 0, b.r/3)
                    bossCtx.closePath()
                    bossCtx.fillStyle = "#E9AB17";
                    bossCtx.fill();
                    bossCtx.stroke()
                    // Antenna
                    bossCtx.beginPath()
                    bossCtx.moveTo(-b.r/4, -(b.r*3)/4)
                    bossCtx.quadraticCurveTo(-b.r/8, -(b.r+(b.r/4)), (-b.r*3)/8, -(b.r+(b.r/8)))
                    bossCtx.stroke()
                    bossCtx.beginPath()
                    bossCtx.moveTo(b.r/4, -(b.r*3)/4)
                    bossCtx.quadraticCurveTo(b.r/8, -(b.r+(b.r/4)), (b.r*3)/8, -(b.r+(b.r/8)))
                    bossCtx.stroke()

                    bossCtx.resetTransform()
                },
            });
        }

        return info
    },
    moveFunc(info, ticks, id) {
        let dt = ticks - (info.actions[id].lastTick || ticks);
        info.actions[id].lastTick = ticks;
        for (let b of info.bullets) {
            if (b.name && b.name == "bounceBee") {
                // Bounce off walls
                if (b.x < b.r + info.boxLeft) {b.x = b.r + info.boxLeft; b.vx *= -1; b.angle = Math.PI-b.angle}
                if (b.x > info.width - b.r + info.boxLeft) {b.x = info.width - b.r + info.boxLeft; b.vx *= -1; b.angle = Math.PI-b.angle}
                if (b.y < b.r + info.boxTop) {b.y = b.r + info.boxTop; b.vy *= -1; b.angle = -b.angle}
                if (b.y > info.height - b.r + info.boxTop) {b.y = info.height - b.r + info.boxTop; b.vy *= -1; b.angle = -b.angle}

                // Lunge logic
                if (!b.pulsingRed && b.lungeCooldown <= 0) {
                    b.lungeTimer = 1000;
                    b.vx = b.vx * info.actions[id].chargeMult;
                    b.vy = b.vy * info.actions[id].chargeMult;
                    b.pulsingRed = true;
                } else if (!b.pulsingRed) {
                    b.lungeCooldown -= dt;
                }
                if (b.pulsingRed) {
                    b.lungeTimer -= dt;
                    if (b.lungeTimer <= 0) {
                        b.vx = b.vx / info.actions[id].chargeMult;
                        b.vy = b.vy / info.actions[id].chargeMult;
                        b.pulsingRed = false;
                        b.lungeCooldown = 1200 + (Math.random() * 800);
                    }
                }
            }
        }

        return info
    }
}

BHB.waveBees = {
    //bulletHell({"waveBees": {beeRate: 5, radius: 20, gapStart: 0, gap: 200, enemySpeed: 6, waveSpeed: 4}}, {duration: 10})
    moveFunc(info, ticks, id) {
        // Spawn bees
        let speedMod = 1.3 - (Math.abs(info.actions[id].gapStart - ((info.height-info.actions[id].gap)/2))/((info.height-info.actions[id].gap)/2))
        info.actions[id].gapStart = info.actions[id].gapStart + (info.actions[id].waveSpeed*speedMod)
        if (info.actions[id].gapStart > info.height-info.actions[id].gap) {
            info.actions[id].gapStart = info.height-info.actions[id].gap
            info.actions[id].waveSpeed = info.actions[id].waveSpeed * -1
        }
        if (info.actions[id].gapStart < 0) {
            info.actions[id].gapStart = 0
            info.actions[id].waveSpeed = info.actions[id].waveSpeed * -1
        }
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const beesToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].beeRate)*2;
        for (let i = 0; i < beesToSpawn; i++) {
            info.bullets.push({
                name: "Bee",
                boxRender: true, // RENDER IN BOX
                x: -info.actions[id].radius,
                y: i%2 ? info.actions[id].gapStart+info.actions[id].gap : info.actions[id].gapStart,
                angle: Math.PI/2,
                r: info.actions[id].radius,
                vx: info.actions[id].enemySpeed,
                vy: 0,
                draw(b, bossCtx) {
                    bossCtx.translate(b.x, b.y);
                    bossCtx.rotate(b.angle);
                    bossCtx.strokeStyle = "#000";
                    bossCtx.lineWidth = info.actions[id].radius/10;
                    if (!options.performanceMode) bossCtx.shadowColor = "#fff";
                    if (!options.performanceMode) bossCtx.shadowBlur = 2;
                    // Wings
                    bossCtx.beginPath()
                    bossCtx.arcTo(0, 0, -b.r/2, b.r/2, b.r/4)
                    bossCtx.arcTo(-b.r/2, b.r/2, -b.r, 0, b.r/4)
                    bossCtx.arcTo(-b.r, 0, -b.r/2, -b.r/2, b.r/4)
                    bossCtx.arcTo(-b.r/2, -b.r/2, 0, 0, b.r/4)
                    bossCtx.arcTo(0, 0, b.r/2, b.r/2, b.r/4)
                    bossCtx.arcTo(b.r/2, b.r/2, b.r, 0, b.r/4)
                    bossCtx.arcTo(b.r, 0, b.r/2, -b.r/2, b.r/4)
                    bossCtx.arcTo(b.r/2, -b.r/2, 0, 0, b.r/4)
                    bossCtx.closePath()
                    bossCtx.fillStyle = "#aaf";
                    bossCtx.fill();
                    bossCtx.stroke()
                    // Butt
                    bossCtx.beginPath()
                    bossCtx.arcTo(0, 0, b.r/4, b.r/4, b.r/4)
                    bossCtx.arcTo(b.r/4, b.r/4, b.r/2, (b.r*3)/4, b.r/4)
                    bossCtx.arcTo(b.r/2, (b.r*3)/4, 0, b.r+(b.r/2), b.r/3)
                    bossCtx.arcTo(0, b.r+(b.r/2), -b.r/2, (b.r*3)/4, b.r/3)
                    bossCtx.arcTo(-b.r/2, (b.r*3)/4, -b.r/4, b.r/4, b.r/3)
                    bossCtx.arcTo(-b.r/4, b.r/4, 0, 0, b.r/4)
                    bossCtx.closePath()
                    bossCtx.fillStyle = "#E9AB17";
                    bossCtx.fill();
                    bossCtx.stroke()
                    // Stripes
                    bossCtx.beginPath()
                    bossCtx.moveTo(b.r/4, b.r/4)
                    bossCtx.quadraticCurveTo(b.r/4, b.r/2, 0, b.r/2)
                    bossCtx.moveTo(-b.r/4, b.r/4)
                    bossCtx.quadraticCurveTo(-b.r/4, b.r/2, 0, b.r/2)
                    bossCtx.moveTo(b.r/2-1, (b.r*3)/4)
                    bossCtx.quadraticCurveTo(b.r/3-1, b.r, 0, b.r)
                    bossCtx.moveTo(-b.r/2+1, (b.r*3)/4)
                    bossCtx.quadraticCurveTo(-b.r/3+1, b.r, 0, b.r)
                    bossCtx.stroke()

                    // Head
                    bossCtx.beginPath()
                    bossCtx.arcTo(0, 0, b.r/2, -b.r/2, b.r/3)
                    bossCtx.arcTo(b.r/2, -b.r/2, 0, -b.r, b.r/3)
                    bossCtx.arcTo(0, -b.r, -b.r/2, -b.r/2, b.r/3)
                    bossCtx.arcTo(-b.r/2, -b.r/2, 0, 0, b.r/3)
                    bossCtx.closePath()
                    bossCtx.fillStyle = "#E9AB17";
                    bossCtx.fill();
                    bossCtx.stroke()
                    // Antenna
                    bossCtx.beginPath()
                    bossCtx.moveTo(-b.r/4, -(b.r*3)/4)
                    bossCtx.quadraticCurveTo(-b.r/8, -(b.r+(b.r/4)), (-b.r*3)/8, -(b.r+(b.r/8)))
                    bossCtx.stroke()
                    bossCtx.beginPath()
                    bossCtx.moveTo(b.r/4, -(b.r*3)/4)
                    bossCtx.quadraticCurveTo(b.r/8, -(b.r+(b.r/4)), (b.r*3)/8, -(b.r+(b.r/8)))
                    bossCtx.stroke()

                    bossCtx.resetTransform()
                }
            })
        }
        if (beesToSpawn > 0) info.actions[id].lastTime = ticks;

        return info
    }
}

// A wave of bees on the top and bottom of the screen, requiring you to move up and down


//ZAR

BHB.diceAttack = {
    //bulletHell({"diceAttack": {diceAmount: 2, intervalDiv: 1}}, {duration: 10})
    codeFunc(info, id) {
        for (let i = 0; i < info.actions[id].diceAmount; i++) {
            let angleOffset = (2 * Math.PI * i) / info.actions[id].diceAmount;
            info.bullets.push({
                name: "dice",
                x: info.boxLeft + info.px + 200 * Math.cos(angleOffset),
                y: info.boxTop + info.py + 200 * Math.sin(angleOffset),
                vx: 0,
                vy: 0,
                r: 20,
                orbitRadius: 200,
                orbitAngle: angleOffset,
                orbitSpeed: 0.005, // same speed
                shootInterval: (500 + Math.floor(Math.random() * 600) + i * 150) / (info.actions[id].intervalDiv || 1), // each dice has a different interval
                lastShotTime: 0,
                draw(b, bossCtx) {
                    const size = b.r * 2;
                    const cornerRadius = b.r * 0.2; // Adjust for roundness

                    bossCtx.translate(b.x, b.y);
                    // bossCtx.rotate(Math.PI / 2); // Optional: remove if you don't want it spinning 90deg

                    // 1. Draw the Die Body (Rounded Square)
                    bossCtx.beginPath();
                    bossCtx.roundRect(-b.r, -b.r, size, size, cornerRadius); 
                    bossCtx.fillStyle = "#fff";
    
                    if (!options.performanceMode) {
                        bossCtx.shadowColor = "#fff";
                        bossCtx.shadowBlur = 16;
                    }
                    bossCtx.fill();

                    // 2. Draw the Pips (Dots)
                    // Turning off shadow for the dots so they look like holes
                    bossCtx.shadowBlur = 0;
                    bossCtx.fillStyle = "#000"; // Black dots
    
                    const pipRadius = b.r * 0.2;
    
                    // Example: Drawing a "1" (Center Dot)
                    const offset = b.r * 0.5;
                    [[-offset, -offset], [offset, -offset], [-offset, offset], [offset, offset]].forEach(p => {
                        bossCtx.beginPath();
                        bossCtx.arc(p[0], p[1], pipRadius, 0, Math.PI * 2);
                        bossCtx.fill();
                    })
                    bossCtx.resetTransform();
                }
            });
        }
        return info
    },
    moveFunc(info, ticks, id) {
        // Update each dice's orbit and position, and handle shooting
        for (let b of info.bullets) {
            if (b.name && b.name == "dice") {
                b.orbitAngle += b.orbitSpeed * (info.dt ?? 1);
                const playerGlobalX = info.boxLeft + info.px;
                const playerGlobalY = info.boxTop + info.py;
                const targetBx = playerGlobalX + b.orbitRadius * Math.cos(b.orbitAngle);
                const targetBy = playerGlobalY + b.orbitRadius * Math.sin(b.orbitAngle);
                // Smoothly move boss towards target position (frame-rate independent lerp)
                const lerpFactor = 1 - Math.pow(1 - 0.05, info.dt ?? 1);
                b.x += (targetBx - b.x) * lerpFactor;
                b.y += (targetBy - b.y) * lerpFactor;

                // Each dice shoots at its own interval
                if (!b.lastShotTime) b.lastShotTime = ticks;
                if (ticks - b.lastShotTime > b.shootInterval) {
                    info.shootAtPlayer(b.x, b.y, id, 2);
                    b.lastShotTime = ticks;
                }
            }
        }
        return info
    },
}
BHB.bouncingDice = {
    //bulletHell({"bouncingDice": {diceCount: 6, enemySpeed: 2}}, {duration: 15})
    codeFunc(info, id) {
        const br = 25;
        for (let i = 0; i < info.actions[id].diceCount; i++) {
            // Random position, not too close to player
            let angle = Math.random() * 2 * Math.PI;
            let dist = Math.random() * (info.width / 2 - br - info.pr) + br + info.pr + 10;
            let bx = info.width / 2 + Math.cos(angle) * dist + info.boxLeft;
            let by = info.height / 2 + Math.sin(angle) * dist + info.boxTop;
            // Random velocity
            let theta = Math.random() * 2 * Math.PI;
            let vx = Math.cos(theta) * info.actions[id].enemySpeed;
            let vy = Math.sin(theta) * info.actions[id].enemySpeed;
            info.bullets.push({
                name: "dice",
                x: bx,
                y: by,
                vx: vx,
                vy: vy,
                r: br,
                shootInterval: (500 + Math.floor(Math.random() * 600) + i * 100) / (info.actions[id].intervalDiv || 1), // each dice has a different interval
                lastShotTime: 0,
                draw(b, bossCtx) {
                    const size = b.r * 2;
                    const cornerRadius = b.r * 0.2; // Adjust for roundness

                    bossCtx.translate(b.x, b.y);
                    // bossCtx.rotate(Math.PI / 2); // Optional: remove if you don't want it spinning 90deg

                    // 1. Draw the Die Body (Rounded Square)
                    bossCtx.beginPath();
                    bossCtx.roundRect(-b.r, -b.r, size, size, cornerRadius); 
                    bossCtx.fillStyle = "#fff";
    
                    if (!options.performanceMode) {
                        bossCtx.shadowColor = "#fff";
                        bossCtx.shadowBlur = 16;
                    }
                    bossCtx.fill();

                    // 2. Draw the Pips (Dots)
                    // Turning off shadow for the dots so they look like holes
                    bossCtx.shadowBlur = 0;
                    bossCtx.fillStyle = "#000"; // Black dots
    
                    const pipRadius = b.r * 0.2;
    
                    // Example: Drawing a "1" (Center Dot)
                    const offset = b.r*0.5;
                    [[-offset, -offset], [-offset, offset], [offset, offset], [offset, -offset]].forEach(p => {
                        bossCtx.beginPath();
                        bossCtx.arc(p[0], p[1], pipRadius, 0, Math.PI * 2);
                        bossCtx.fill();
                    })
                    bossCtx.resetTransform();
                }
            });
        }

        return info
    },
    moveFunc(info, ticks, id) {
        for (let b of info.bullets) {
            if (b.name && b.name == "dice") {
                // Bounce off walls
                if (b.x < b.r + info.boxLeft) {b.x = b.r + info.boxLeft; b.vx *= -1}
                if (b.x > info.width - b.r + info.boxLeft) {b.x = info.width - b.r + info.boxLeft; b.vx *= -1}
                if (b.y < b.r + info.boxTop) {b.y = b.r + info.boxTop; b.vy *= -1}
                if (b.y > info.height - b.r + info.boxTop) {b.y = info.height - b.r + info.boxTop; b.vy *= -1}
            }
                // Each dice shoots at its own interval
            if (!b.lastShotTime) b.lastShotTime = ticks;
            if (ticks - b.lastShotTime > b.shootInterval) {
                info.shootAtPlayer(b.x, b.y, id, 3);
                b.lastShotTime = ticks;
            }
        }

        return info
    }
}


BHB.diceAttackNoOrbit = {
    //bulletHell({"diceAttackNoOrbit": {diceAmount: 3, intervalDiv: 0.75}}, {duration: 10})
    codeFunc(info, id) {
        for (let i = 0; i < info.actions[id].diceAmount; i++) {
            let angleOffset = (2 * Math.PI * i) / info.actions[id].diceAmount;
            info.bullets.push({
                name: "dice",
                x: info.boxLeft + info.px + 200 * Math.cos(angleOffset),
                y: info.boxTop + info.py + 200 * Math.sin(angleOffset),
                vx: 0,
                vy: 0,
                r: 20,
                orbitRadius: 200,
                orbitAngle: angleOffset,
                orbitSpeed: 0, // same speed
                shootInterval: (500 + Math.floor(Math.random() * 600) + i * 150) / (info.actions[id].intervalDiv || 1), // each dice has a different interval
                lastShotTime: 0,
                draw(b, bossCtx) {
                    const size = b.r * 2;
                    const cornerRadius = b.r * 0.2; // Adjust for roundness

                    bossCtx.translate(b.x, b.y);
                    // bossCtx.rotate(Math.PI / 2); // Optional: remove if you don't want it spinning 90deg

                    // 1. Draw the Die Body (Rounded Square)
                    bossCtx.beginPath();
                    bossCtx.roundRect(-b.r, -b.r, size, size, cornerRadius); 
                    bossCtx.fillStyle = "#fff";
    
                    if (!options.performanceMode) {
                        bossCtx.shadowColor = "#fff";
                        bossCtx.shadowBlur = 16;
                    }
                    bossCtx.fill();

                    // 2. Draw the Pips (Dots)
                    // Turning off shadow for the dots so they look like holes
                    bossCtx.shadowBlur = 0;
                    bossCtx.fillStyle = "#000"; // Black dots
    
                    const pipRadius = b.r * 0.2;
    
                    // Example: Drawing a "1" (Center Dot)
                    const offset = 0;
                    [[offset, -offset]].forEach(p => {
                        bossCtx.beginPath();
                        bossCtx.arc(p[0], p[1], pipRadius, 0, Math.PI * 2);
                        bossCtx.fill();
                    })
                    bossCtx.resetTransform();
                }
            });
        }
        return info
    },
    moveFunc(info, ticks, id) {
        // Update each dice's orbit and position, and handle shooting
        for (let b of info.bullets) {
            if (b.name && b.name == "dice") {
                b.orbitAngle += b.orbitSpeed * (info.dt ?? 1);
                const playerGlobalX = info.boxLeft + info.px;
                const playerGlobalY = info.boxTop + info.py;
                const targetBx = playerGlobalX + b.orbitRadius * Math.cos(b.orbitAngle);
                const targetBy = playerGlobalY + b.orbitRadius * Math.sin(b.orbitAngle);
                // Smoothly move boss towards target position (frame-rate independent lerp)
                const lerpFactor = 1 - Math.pow(1 - 0.05, info.dt ?? 1);
                b.x += (targetBx - b.x) * lerpFactor;
                b.y += (targetBy - b.y) * lerpFactor;

                // Each dice shoots at its own interval
                if (!b.lastShotTime) b.lastShotTime = ticks;
                if (ticks - b.lastShotTime > b.shootInterval) {
                    info.shootAtPlayer(b.x, b.y, id, 4);
                    b.lastShotTime = ticks;
                }
            }
        }
        return info
    },
}
BHB.pipRain = {
    //bulletHell({"pipRain": {bulletPerSec: 7}}, {duration: 12})
    moveFunc(info, ticks, id) {
        // Rain Bullets
        const bulletRadius = info.actions[id].bulletRadius ?? 12;
        const bulletSpeed = info.actions[id].bulletSpeed ?? 4;
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const bulletsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].bulletPerSec); // LAST NUMBER IS AMOUNT OF BULLETS PER SECOND
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = Math.random() * info.width + info.boxLeft;
            let by = -bulletRadius;
            let bul = {x: bx, y: by, vx: 0, vy: bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}}
            info.bullets.push(bul);
            let bx2 = Math.random() * info.width + info.boxLeft;
            let by2 = window.innerHeight + bulletRadius;
            let bul2 = {x: bx2, y: by2, vx: 0, vy: -bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#000000";bossCtx.fill()}}
            info.bullets.push(bul2);
        }
        if (bulletsToSpawn > 0) info.actions[id].lastTime = ticks;        // Rain Bullets
        return info
    },
}
BHB.pipRainHorizontal = {
    //bulletHell({"pipRainHorizontal": {bulletPerSec: 7}}, {duration: 12})
    moveFunc(info, ticks, id) {
        // Rain Bullets
        const bulletRadius = info.actions[id].bulletRadius ?? 12;
        const bulletSpeed = info.actions[id].bulletSpeed ?? 4;
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const bulletsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].bulletPerSec); // LAST NUMBER IS AMOUNT OF BULLETS PER SECOND
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = window.innerWidth + bulletRadius;
            let by = Math.random() * info.height + info.boxTop
            let bul = {x: bx, y: by, vx: -bulletSpeed, vy: 0, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}}
            info.bullets.push(bul);
            let bx2 = 0;
            let by2 = Math.random() * info.height + info.boxTop;
            let bul2 = {x: bx2, y: by2, vx: bulletSpeed, vy: 0, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#000000";bossCtx.fill()}}
            info.bullets.push(bul2);
        }
        if (bulletsToSpawn > 0) info.actions[id].lastTime = ticks;        // Rain Bullets
        return info
    },
}
BHB.pipRainUltimate = {
    //bulletHell({"pipRainUltimate": {bulletPerSec: 3}}, {duration: 12})
    moveFunc(info, ticks, id) {
        // Rain Bullets
        const bulletRadius = info.actions[id].bulletRadius ?? 12;
        const bulletSpeed = info.actions[id].bulletSpeed ?? 4;
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const bulletsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].bulletPerSec); // LAST NUMBER IS AMOUNT OF BULLETS PER SECOND
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = Math.random() * info.width + info.boxLeft;
            let by = -bulletRadius;
            let bul = {x: bx, y: by, vx: 0, vy: bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}}
            info.bullets.push(bul);
            let bx2 = Math.random() * info.width + info.boxLeft;
            let by2 = window.innerHeight + bulletRadius;
            let bul2 = {x: bx2, y: by2, vx: 0, vy: -bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#000000";bossCtx.fill()}}
            info.bullets.push(bul2);
            let bx3 = window.innerWidth + bulletRadius;
            let by3 = Math.random() * info.height + info.boxTop
            let bul3 = {x: bx3, y: by3, vx: -bulletSpeed, vy: 0, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}}
            info.bullets.push(bul3);
            let bx4 = 0;
            let by4 = Math.random() * info.height + info.boxTop;
            let bul4 = {x: bx4, y: by4, vx: bulletSpeed, vy: 0, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#000000";bossCtx.fill()}}
            info.bullets.push(bul4);
        }
        if (bulletsToSpawn > 0) info.actions[id].lastTime = ticks;        // Rain Bullets
        return info
    },
}
//bulletHellBlue({"bouncingDice": {diceCount: 4, enemySpeed: 2}}, {width:800, height:600, duration:15, jumpMin:6, jumpMax:150})

BHB.diceSpikes = {
    // bulletHell({"diceSpikes": {spawnPerSec: 6, bulletPerSec: 6, enemySpeed: 4, spikeSize: 28}}, {width: 1200, height: 600, duration: 12, transparent: false})
    // bulletHell({"diceSpikes": {spawnPerSec: 6, bulletPerSec: 6, enemySpeed: 4, bulletSpeed: 2, spikeSize: 28, rain: true}}, {width: 1200, height: 600, duration: 12, transparent: false})
    moveFunc(info, ticks, id) {
        const spikeSize = info.actions[id].spikeSize ?? 28;
        const speed = info.actions[id].enemySpeed ?? 6;
        const spawnPerSec = info.actions[id].spawnPerSec ?? 2.2;
        const bulletPerSec = info.actions[id].bulletPerSec ?? 6;

        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const bulletsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * spawnPerSec);

        // Allow `rain` to be specified on the action (info.actions[id].rain)
        if ((info.actions && info.actions[id] && info.actions[id].rain) || info.rain) {
            // Reuse existing pipRain behavior so toggling `rain` matches pipRain effects.
            if (BHB && BHB.pipRain && typeof BHB.pipRain.moveFunc === 'function') {
                info = BHB.pipRain.moveFunc(info, ticks, id) || info;
            }
            // Optionally spawn horizontal pip rain if configured
            if (info.actions && info.actions[id] && info.actions[id].horizontalRain && BHB && BHB.pipRainHorizontal && typeof BHB.pipRainHorizontal.moveFunc === 'function') {
                info = BHB.pipRainHorizontal.moveFunc(info, ticks, id) || info;
            }
        }

        for (let i = 0; i < bulletsToSpawn; i++) {
            // choose side: -1 = left, 1 = right
            const side = Math.random() < 0.5 ? -1 : 1;
            const x = side === -1 ? (info.boxLeft - spikeSize) : (info.boxLeft + info.width + spikeSize);
            const y = Math.random() * info.height + info.boxTop;

            // velocity aimed roughly towards player with a small random offset
            const targetX = info.px ?? (info.boxLeft + info.width/2);
            const targetY = info.py ?? (info.boxTop + info.height/2);
            const dx = (targetX + (Math.random() - 0.5) * 80) - x;
            const dy = (targetY + (Math.random() - 0.5) * 80) - y;
            const dist = Math.hypot(dx, dy) || 1;
            const vx = (dx / dist) * speed;
            const vy = (dy / dist) * speed;

            // triangular spike that points along velocity
            const color = Math.random() < 0.5 ? '#000' : '#fff';
            const bul = {
                x, y, vx, vy, r: spikeSize, color,
                draw(b, bossCtx) {
                    const angle = Math.atan2(b.vy, b.vx);
                    bossCtx.save();
                    bossCtx.translate(b.x, b.y);
                    bossCtx.rotate(angle);
                    // triangle
                    bossCtx.beginPath();
                    bossCtx.moveTo(b.r, 0);
                    bossCtx.lineTo(-b.r * 0.6, b.r * 0.7);
                    bossCtx.lineTo(-b.r * 0.6, -b.r * 0.7);
                    bossCtx.closePath();
                    bossCtx.fillStyle = b.color;
                    bossCtx.fill();
                    bossCtx.lineWidth = 2;
                    bossCtx.strokeStyle = (b.color === '#000') ? '#fff' : '#000';
                    bossCtx.stroke();
                    bossCtx.restore();
                }
            };

            info.bullets.push(bul);
        }

        if (bulletsToSpawn > 0) info.actions[id].lastTime = ticks;

        // update existing bullets' positions
        for (let b of info.bullets) {
            if (b.vx !== undefined) {
                b.x += b.vx;
                b.y += b.vy;
            }
        }

        return info;
    },
}
BHB.diceSpikesPlatformer = {
    // bulletHellBlue({"diceSpikesPlatformer": {bulletPerSec: 1.2, enemySpeed: 3, spikeHeight: 80, spikeWidth: 60}}, {width:800, height:300, duration:15, jumpMin:6, jumpMax:150, gravity: 0.2})
    moveFunc(info, ticks, id) {
        // Based on pipRainHorizontal: spawn groups of spikes sliding along bottom
        const spikeHeight = info.actions[id].spikeHeight ?? 64;
        const spikeWidth = info.actions[id].spikeWidth ?? 40;
        const bulletSpeed = info.actions[id].enemySpeed ?? 6;
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        let bulletsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * (info.actions[id].bulletPerSec ?? 1.2));
        if (!info.actions[id].__diceSpikesInit) { info.actions[id].__diceSpikesInit = true; bulletsToSpawn = Math.max(1, bulletsToSpawn); }

        for (let i = 0; i < bulletsToSpawn; i++) {
            const count = 1 + Math.floor(Math.random() * 4);
            const fromLeft = Math.random() < 0.5;
            let curSpikeHeight = spikeHeight;
            let curSpikeWidth = spikeWidth;
            if (count === 1) {
                curSpikeHeight = Math.round(spikeHeight * 1.6);
                curSpikeWidth = Math.round(spikeWidth * 1.5);
            }
            const spacing = curSpikeWidth * 1.15;

            // always place at bottom of the arena (center of spike sits curSpikeHeight/2 above bottom)
            const by = info.boxTop + info.height - curSpikeHeight / 2;

            if (fromLeft) {
                // shift group so the rightmost spike is just off-screen, preventing immediate culling
                const bxBase = info.boxLeft - curSpikeWidth - 8 + (count - 1) * spacing;
                for (let k = 0; k < count; k++) {
                    const bx = bxBase - k * spacing;
                    info.bullets.push({
                        name: "bigKnife",
                        x: bx,
                        y: by,
                        offScreen: true,
                        r: curSpikeHeight,
                        width: curSpikeWidth,
                        angle: -Math.PI/2,
                        vx: bulletSpeed,
                        vy: 0,
                        draw(b, bossCtx) {
                            bossCtx.save();
                            bossCtx.translate(b.x, b.y);
                            bossCtx.rotate(b.angle);
                            bossCtx.beginPath();
                            bossCtx.moveTo(-b.r / 2, -b.width / 2);
                            bossCtx.lineTo(b.r / 2, 0);
                            bossCtx.lineTo(-b.r / 2, b.width / 2);
                            bossCtx.closePath();

                                    bossCtx.fillStyle = b.color;
                                    if (!options.performanceMode) bossCtx.shadowColor = b.color;
                                    if (!options.performanceMode) bossCtx.shadowBlur = 8;
                                    bossCtx.fill();
                                    bossCtx.lineWidth = 2;
                                    bossCtx.strokeStyle = (b.color === '#000') ? '#fff' : '#000';
                                    bossCtx.stroke();

                            bossCtx.restore();
                        }
                    })
                }
            } else {
                // shift group so the leftmost spike is just off-screen on the right side
                const bxBase = info.boxLeft + info.width + curSpikeWidth + 8 - (count - 1) * spacing;
                for (let k = 0; k < count; k++) {
                    const bx = bxBase + k * spacing;
                    info.bullets.push({
                        name: "bigKnife",
                        x: bx,
                        y: by,
                        offScreen: true,
                        r: curSpikeHeight,
                        width: curSpikeWidth,
                        angle: -Math.PI/2,
                        vx: -bulletSpeed,
                        vy: 0,
                        draw(b, bossCtx) {
                            bossCtx.save();
                            bossCtx.translate(b.x, b.y);
                            bossCtx.rotate(b.angle);
                            bossCtx.beginPath();
                            bossCtx.moveTo(-b.r / 2, -b.width / 2);
                            bossCtx.lineTo(b.r / 2, 0);
                            bossCtx.lineTo(-b.r / 2, b.width / 2);
                            bossCtx.closePath();
                            bossCtx.fillStyle = '#fff';
                            if (!options.performanceMode) bossCtx.shadowColor = '#fff';
                            if (!options.performanceMode) bossCtx.shadowBlur = 8;
                            bossCtx.fill();
                            bossCtx.lineWidth = 2;
                            bossCtx.strokeStyle = '#000';
                            bossCtx.stroke();

                            // no pips for platformer spikes; color handled above
                            bossCtx.restore();
                        }
                    })
                }
            }
        }

        if (bulletsToSpawn > 0) info.actions[id].lastTime = ticks;

        return info;
    },
}

BHB.spikePlatformAttack = {
    //bulletHellBlue({"spikePlatformAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 4, platformSpikeChance: 0.4, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203}}, {width:800, height:600, duration:15, jumpMin:6, jumpMax:250, gravity: 0.2})
    //bulletHellBlue({"spikePlatformAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 4, platformSpikeChance: 0.4, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203, rain: true, bulletPerSec: 10}}, {width:800, height:600, duration:15, jumpMin:6, jumpMax:250, gravity: 0.2})
    codeFunc(info, id) {
        // Create spikes filling the entire ground
        const spikeH = info.actions[id].spikeHeight || 36;
        const spikeW = info.actions[id].spikeWidth || 28;
        info.spikes = [];
        for (let x = 0; x < info.width; x += spikeW) {
            info.spikes.push({ x: x, y: info.height - spikeH, w: spikeW, h: spikeH });
        }

        // Create sliding platforms slightly above the spikes
        const pCount = info.actions[id].platformCount || 4;
        info.platforms = [];
        // determine vertical slots so only 1 platform can appear at each height
        const minAbove = info.actions[id].platformMinAbove || 40;
        const maxAbove = info.actions[id].platformMaxAbove || Math.max(120, Math.min(220, info.height - spikeH - 60));
        let heights = [];
        if (pCount <= 1) {
            heights = [info.height - spikeH - Math.floor((minAbove + maxAbove) / 2)];
        } else {
            for (let i = 0; i < pCount; i++) {
                const t = i / (pCount - 1);
                const above = Math.floor(minAbove + t * (maxAbove - minAbove));
                heights.push(info.height - spikeH - above);
            }
        }
        // shuffle heights so order is not predictable
        for (let i = heights.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [heights[i], heights[j]] = [heights[j], heights[i]];
        }

        const spikeChance = typeof info.actions[id].platformSpikeChance !== 'undefined' ? info.actions[id].platformSpikeChance : (info.actions[id].spikeOnPlatformPercent || 0.25);

        for (let i = 0; i < pCount; i++) {
            const w = Math.floor((info.actions[id].platformMinW || 80) + Math.random() * (((info.actions[id].platformMaxW || 160)) - (info.actions[id].platformMinW || 80)));
            const h = 14;
            const y = heights[i % heights.length];
            // place platform ensuring an extra horizontal gap between platforms
            const extraGap = typeof info.actions[id].platformExtraGap !== 'undefined' ? info.actions[id].platformExtraGap : 50;
            let x = Math.random() * (info.width - w);
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 60) {
                let ok = true;
                for (let q of info.platforms) {
                    if (!(x + w + extraGap <= q.x || x >= q.x + q.w + extraGap)) { ok = false; break; }
                }
                if (ok) { placed = true; break; }
                x = Math.random() * (info.width - w);
                attempts++;
            }
            if (!placed) {
                // fallback: scan for first fitting position
                for (let cx = 0; cx <= info.width - w; cx += 4) {
                    let ok2 = true;
                    for (let q of info.platforms) {
                        if (!(cx + w + extraGap <= q.x || cx >= q.x + q.w + extraGap)) { ok2 = false; break; }
                    }
                    if (ok2) { x = cx; placed = true; break; }
                }
            }
            // if still not placed, x remains random (may overlap)
            const speed = ((Math.random() < 0.5) ? -1 : 1) * (info.actions[id].platformSpeed || 2.5) * (0.6 + Math.random() * 1.4);
            const hasSpikes = Math.random() < spikeChance;
            const pSpikeW = Math.max(8, Math.min((info.actions[id].platformSpikeWidth || Math.floor(spikeW/1.6)), Math.floor(w/3)));
            const pSpikeH = Math.max(6, Math.min((info.actions[id].platformSpikeHeight || Math.floor(spikeH*0.6)), 24));
            info.platforms.push({ x: x, y: y, w: w, h: h, vx: speed, color: info.actions[id].platformColor || '#9aa', hasSpikes: hasSpikes, spikeW: pSpikeW, spikeH: pSpikeH });
        }

        // timing for spike damage
        info.actions[id].lastSpikeDamageTime = info.actions[id].lastSpikeDamageTime || 0;
        return info;
    },
    moveFunc(info, ticks, id) {
        // Update platforms positions
        if (info.platforms) {
            for (let p of info.platforms) {
                p.x += p.vx;
                // wrap-around horizontally
                if (p.vx > 0 && p.x > info.width) p.x = -p.w;
                if (p.vx < 0 && p.x + p.w < 0) p.x = info.width;
            }
        }

        // Player support and spike damage checks (only relevant in blueMode/platformer)
        if (info.blueMode) {
            let playerX = info.px;
            let playerY = info.py;
            if (info.subArena && info.moveWithSub) { playerX += info.subx; playerY += info.suby }

            // Platforms: allow standing on top
            if (info.platforms) {
                for (let p of info.platforms) {
                    // check horizontal overlap with a small tolerance
                    if (playerX + info.pr > p.x && playerX - info.pr < p.x + p.w) {
                        const feetY = playerY + info.pr;
                        // If player's feet are touching or just below the platform top and falling, snap to platform
                        if (feetY >= p.y - 6 && feetY <= p.y + 10 && (info.vy || 0) >= -2) {
                            info.py = p.y - info.pr;
                            info.vy = 0;
                            info.onGround = true;
                            if (p.hasSpikes) {
                                const now = Date.now();
                                if (!info.actions[id].lastSpikeDamageTime) info.actions[id].lastSpikeDamageTime = 0;
                                if (now - info.actions[id].lastSpikeDamageTime > 0) {
                                    info.platformHit = true;
                                    info.actions[id].lastSpikeDamageTime = now;
                                }
                            }
                        }
                    }
                }
            }

            // Spikes: if player's feet intersect the spike band, deal damage periodically
            if (info.spikes && info.spikes.length) {
                const spikeTop = info.height - (info.actions[id].spikeHeight || 36);
                const feetY = info.py + info.pr;
                if (feetY >= spikeTop) {
                    // if player's x overlaps any spike
                    for (let s of info.spikes) {
                        if (info.px + info.pr > s.x && info.px - info.pr < s.x + s.w) {
                            const now = Date.now();
                            if (!info.actions[id].lastSpikeDamageTime) info.actions[id].lastSpikeDamageTime = 0;
                            if (now - info.actions[id].lastSpikeDamageTime > 0) {
                                info.platformHit = true; // reuse central damage handling
                                info.actions[id].lastSpikeDamageTime = now;
                            }
                            break;
                        }
                    }
                }
            }
        }

        // Allow `rain` to be specified on the action (info.actions[id].rain)
        if ((info.actions && info.actions[id] && info.actions[id].rain) || info.rain) {
            // Reuse existing pipRain behavior so toggling `rain` matches pipRain effects.
            if (BHB && BHB.pipRain && typeof BHB.pipRain.moveFunc === 'function') {
                info = BHB.pipRain.moveFunc(info, ticks, id) || info;
            }
            // Optionally spawn horizontal pip rain if configured
            if (info.actions && info.actions[id] && info.actions[id].horizontalRain && BHB && BHB.pipRainHorizontal && typeof BHB.pipRainHorizontal.moveFunc === 'function') {
                info = BHB.pipRainHorizontal.moveFunc(info, ticks, id) || info;
            }
        }

        return info;
    },
}
//    bulletHellBlue({"spikePlatformAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 4, platformSpikeChance: 0.3, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203, rain: true, bulletPerSec: 3}}, {width:800, height:600, duration:15, jumpMin:6, jumpMax:250, gravity: 0.2})

BHB.dieBouncer = {
    //bulletHell({"dieBouncer": {dieAmount: 1, size: 50, enemySpeed: 3, chargeMult: 1.6, spikeSpeed:6, spikeRadius:36, lastTick:false}}, {width: 400, height: 400, duration: 10})
    codeFunc(info, id) {
        const amount = info.actions[id].dieAmount || 1;
        for (let i = 0; i < amount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const speed = info.actions[id].enemySpeed || 3;
            const bx = info.width / 2 + Math.cos(theta) * (info.width / 4) + info.boxLeft;
            const by = info.height / 2 + Math.sin(theta) * (info.height / 4) + info.boxTop;
            info.bullets.push({
                name: "die",
                x: bx,
                y: by,
                vx: Math.cos(theta) * speed,
                vy: Math.sin(theta) * speed,
                r: info.actions[id].size || 28,
                angle: theta,
                pulsingRed: false,
                lungeTimer: 0,
                bounceCooldown: 0,
                draw(b, bossCtx) {
                    bossCtx.save();
                    bossCtx.translate(b.x, b.y);
                    // Die face
                    const s = b.r * 2;
                    bossCtx.fillStyle = b.pulsingRed ? '#f88' : '#fff';
                    bossCtx.strokeStyle = '#000';
                    bossCtx.lineWidth = Math.max(2, b.r/8);
                    bossCtx.fillRect(-b.r, -b.r, s, s);
                    bossCtx.strokeRect(-b.r, -b.r, s, s);
                    // Draw six pips (three left, three right)
                    bossCtx.fillStyle = '#000';
                    const pip = Math.max(1, Math.floor(b.r/6));
                    const ox = b.r * 0.6;
                    const oy = b.r * 0.45;
                    bossCtx.beginPath(); bossCtx.arc(-ox, -oy, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(-ox, 0, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(-ox, oy, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(ox, -oy, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(ox, 0, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(ox, oy, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.restore();
                }
            })
        }
        return info
    },
    moveFunc(info, ticks, id) {
        let dt = ticks - (info.actions[id].lastTick || ticks);
        for (let b of info.bullets) {
            if (b.name && b.name == "die") {
                let bounced = false;
                if (b.x < b.r + info.boxLeft) { b.x = b.r + info.boxLeft; b.vx *= -1; bounced = true; }
                if (b.x > info.width - b.r + info.boxLeft) { b.x = info.width - b.r + info.boxLeft; b.vx *= -1; bounced = true; }
                if (b.y < b.r + info.boxTop) { b.y = b.r + info.boxTop; b.vy *= -1; bounced = true; }
                if (b.y > info.height - b.r + info.boxTop) { b.y = info.height - b.r + info.boxTop; b.vy *= -1; bounced = true; }

                if (bounced && (!b._lastBounce || ticks - b._lastBounce > 60)) {
                    b._lastBounce = ticks;
                    // Spawn 3 spikes aimed at player (centered + offsets)
                    let px = info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
                    let py = info.py + (info.subArena && info.moveWithSub ? info.suby : 0);
                    let base = Math.atan2(py - b.y, px - b.x);
                    for (let s = -1; s <= 1; s++) {
                        // Use exact diceSpikes aiming: spawn off-screen and aim roughly at player with random offset
                        const spikeSize = (info.actions['diceSpikes'] && info.actions['diceSpikes'].spikeSize) || info.actions[id].spikeSize || info.actions[id].spikeRadius || 28;
                        const speed = (info.actions['diceSpikes'] && info.actions['diceSpikes'].enemySpeed) || info.actions[id].spikeSpeed || 6;
                        // spawn at screen edges (not arena) and aim directly at player
                        const side = Math.random() < 0.5 ? -1 : 1;
                        const sx = side === -1 ? -spikeSize : (window.innerWidth + spikeSize);
                        const sy = Math.random() * window.innerHeight;
                        const playerGlobalX = info.boxLeft + (info.px || 0) + (info.subArena && info.moveWithSub ? info.subx : 0);
                        const playerGlobalY = info.boxTop + (info.py || 0) + (info.subArena && info.moveWithSub ? info.suby : 0);
                        const dx = playerGlobalX - sx;
                        const dy = playerGlobalY - sy;
                        const dist = Math.hypot(dx, dy) || 1;
                        const vx = (dx / dist) * speed;
                        const vy = (dy / dist) * speed;
                        const color = Math.random() < 0.5 ? '#000' : '#fff';
                        info.bullets.push({
                            x: sx,
                            y: sy,
                            vx: vx,
                            vy: vy,
                            r: spikeSize,
                            color: color,
                            name: 'dieSpike',
                            draw(sb, bossCtx) {
                                const angle = Math.atan2(sb.vy, sb.vx);
                                bossCtx.save();
                                bossCtx.translate(sb.x, sb.y);
                                bossCtx.rotate(angle);
                                bossCtx.beginPath();
                                bossCtx.moveTo(sb.r, 0);
                                bossCtx.lineTo(-sb.r * 0.6, sb.r * 0.7);
                                bossCtx.lineTo(-sb.r * 0.6, -sb.r * 0.7);
                                bossCtx.closePath();
                                bossCtx.fillStyle = sb.color;
                                bossCtx.fill();
                                bossCtx.lineWidth = 2;
                                bossCtx.strokeStyle = (sb.color === '#000') ? '#fff' : '#000';
                                bossCtx.stroke();
                                bossCtx.restore();
                            }
                        })
                    }

                    // Charge briefly (speed up like charged bees)
                    if (!b.pulsingRed) {
                        b.vx *= (info.actions[id].chargeMult || 1.6);
                        b.vy *= (info.actions[id].chargeMult || 1.6);
                        b.pulsingRed = true;
                        b.lungeTimer = 700;
                    }
                }

                if (b.pulsingRed) {
                    b.lungeTimer -= dt;
                    if (b.lungeTimer <= 0) {
                        b.vx = b.vx / (info.actions[id].chargeMult || 1.6);
                        b.vy = b.vy / (info.actions[id].chargeMult || 1.6);
                        b.pulsingRed = false;
                    }
                }
            }
        }
        info.actions[id].lastTick = ticks;
        return info
    }
}

//bulletHellBlue({"dieBouncer": {dieAmount: 1, size: 50, enemySpeed: 3, chargeMult: 1.6, spikeSpeed:5, spikeRadius:30, lastTick:false}}, {width: 800, height: 600, duration: 10, jumpMin:6, jumpMax:250, gravity: 0.2})
//bulletHell({"dieBouncer": {dieAmount: 2, size: 50, enemySpeed: 3, chargeMult: 1.6, spikeSpeed:6, spikeRadius:30, lastTick:false}}, {width: 1200, height: 600, duration: 10})

BHB.movingDieRadialBurstAttack = {
    //bulletHell({"movingDieRadialBurstAttack": {circleAmount: 1, burstInterval: 1000, bulletsPerBurst: 7, enemySpeed: 1.5, bulletSpeed: 5}}, {duration: 12})
    codeFunc(info, id) {
        for (let i = 0; i < info.actions[id].circleAmount; i++) {
            info.bullets.push({
                name: "circle",
                x: Math.random() * (info.width - 120) + 60 + info.boxLeft,
                y: info.height + info.boxTop,
                vx: info.actions[id].enemySpeed * 2,
                vy: 0,
                r: 40,
                lastBurstTime: 0,
                draw(b, bossCtx) {
                    bossCtx.save();
                    bossCtx.translate(b.x, b.y);
                    // Die face
                    const s = b.r * 2;
                    bossCtx.fillStyle = b.pulsingRed ? '#f88' : '#fff';
                    bossCtx.strokeStyle = '#000';
                    bossCtx.lineWidth = Math.max(2, b.r/8);
                    bossCtx.fillRect(-b.r, -b.r, s, s);
                    bossCtx.strokeRect(-b.r, -b.r, s, s);
                    // Draw six pips (three left, three right)
                    bossCtx.fillStyle = '#000';
                    const pip = Math.max(1, Math.floor(b.r/6));
                    const ox = b.r * 0.6;
                    const oy = b.r * 0.45;
                    bossCtx.beginPath(); bossCtx.arc(-ox, -oy, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(-ox, 0, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(-ox, oy, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(ox, -oy, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(ox, 0, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.beginPath(); bossCtx.arc(ox, oy, pip, 0, Math.PI*2); bossCtx.fill();
                    bossCtx.restore();
                }
            });
        }
        return info
    },
    moveFunc(info, ticks, id) {
        for (let b of info.bullets) {
            if (b.name && b.name == "circle") {
                // Bounce off walls
                if (b.x < b.r + info.boxLeft) {b.x = b.r + info.boxLeft; b.vx *= -1}
                if (b.x > info.width - b.r + info.boxLeft) {b.x = info.width - b.r + info.boxLeft; b.vx *= -1}
                if (b.y < b.r + info.boxTop) {b.y = b.r + info.boxTop; b.vy *= -1}
                if (b.y > info.height - b.r + info.boxTop) {b.y = info.height - b.r + info.boxTop; b.vy *= -1}

                // Burst
                if (!b.lastBurstTime) b.lastBurstTime = Date.now()
                if (Date.now() - b.lastBurstTime > info.actions[id].burstInterval) {
                    info.fireDiceSpikeRadialBurst(b.x, b.y, id)
                    b.lastBurstTime = Date.now()
                }
            }
        }
        return info
    },
    
}
//bulletHellBlue({"movingDieRadialBurstAttack": {circleAmount: 1, burstInterval: 800, bulletsPerBurst: 6, enemySpeed: 1.5, bulletSpeed: 5}}, {width:800, height:600, duration:15, jumpMin:6, jumpMax:250, gravity: 0.2})

//bulletHell({"pipRainUltimate": {bulletPerSec: 6}}, {width: window.innerWidth, height: window.innerHeight, duration: 19, transparent: true, saveContent: true,})
//bulletHell({"dieBouncer": {dieAmount: 4, size: 60, enemySpeed: 3, chargeMult: 1.6, spikeSpeed:6, spikeRadius:30, lastTick:false}}, {width: window.innerWidth, height: window.innerHeight, duration: 19, transparent: true, saveContent: true,})

BHB.zarUltimateAttack = {
//bulletHellBlue({"zarUltimateAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 6, spawnPerSec: 4, bulletPerSec: 6, enemySpeed: 3, spikeSize: 28, platformSpikeChance: 0.1, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203, diceSpikes: true, bulletPerSec: 10}}, {width: window.innerWidth, height: window.innerHeight, duration: 19, transparent: true, saveContent: true, jumpMin:6, jumpMax:350, gravity: 0.2})
    codeFunc(info, id) {
        // Create spikes filling the entire ground
        const spikeH = info.actions[id].spikeHeight || 36;
        const spikeW = info.actions[id].spikeWidth || 28;
        info.spikes = [];
        for (let x = 0; x < info.width; x += spikeW) {
            info.spikes.push({ x: x, y: info.height - spikeH, w: spikeW, h: spikeH });
        }

        // Create sliding platforms slightly above the spikes
        const pCount = info.actions[id].platformCount || 6;
        info.platforms = [];
        // determine vertical slots so only 1 platform can appear at each height
        const minAbove = info.actions[id].platformMinAbove || 80;
        const maxAbove = info.actions[id].platformMaxAbove || Math.max(120, Math.min(220, info.height - spikeH - 60)) * 2;
        let heights = [];
        if (pCount <= 1) {
            heights = [info.height - spikeH - Math.floor((minAbove + maxAbove) / 2)];
        } else {
            for (let i = 0; i < pCount; i++) {
                const t = i / (pCount - 1);
                const above = Math.floor(minAbove + t * (maxAbove - minAbove));
                heights.push(info.height - spikeH - above);
            }
        }
        // shuffle heights so order is not predictable
        for (let i = heights.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [heights[i], heights[j]] = [heights[j], heights[i]];
        }

        const spikeChance = typeof info.actions[id].platformSpikeChance !== 'undefined' ? info.actions[id].platformSpikeChance : (info.actions[id].spikeOnPlatformPercent || 0.25);

        for (let i = 0; i < pCount; i++) {
            const w = Math.floor((info.actions[id].platformMinW || 80) + Math.random() * (((info.actions[id].platformMaxW || 160)) - (info.actions[id].platformMinW || 80)));
            const h = 14;
            const y = heights[i % heights.length];
            // place platform ensuring an extra horizontal gap between platforms
            const extraGap = typeof info.actions[id].platformExtraGap !== 'undefined' ? info.actions[id].platformExtraGap : 50;
            let x = Math.random() * (info.width - w);
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 60) {
                let ok = true;
                for (let q of info.platforms) {
                    if (!(x + w + extraGap <= q.x || x >= q.x + q.w + extraGap)) { ok = false; break; }
                }
                if (ok) { placed = true; break; }
                x = Math.random() * (info.width - w);
                attempts++;
            }
            if (!placed) {
                // fallback: scan for first fitting position
                for (let cx = 0; cx <= info.width - w; cx += 4) {
                    let ok2 = true;
                    for (let q of info.platforms) {
                        if (!(cx + w + extraGap <= q.x || cx >= q.x + q.w + extraGap)) { ok2 = false; break; }
                    }
                    if (ok2) { x = cx; placed = true; break; }
                }
            }
            // if still not placed, x remains random (may overlap)
            const speed = ((Math.random() < 0.5) ? -1 : 1) * (info.actions[id].platformSpeed || 2.5) * (0.6 + Math.random() * 1.4);
            const hasSpikes = Math.random() < spikeChance;
            const pSpikeW = Math.max(8, Math.min((info.actions[id].platformSpikeWidth || Math.floor(spikeW/1.6)), Math.floor(w/3)));
            const pSpikeH = Math.max(6, Math.min((info.actions[id].platformSpikeHeight || Math.floor(spikeH*0.6)), 24));
            info.platforms.push({ x: x, y: y, w: w, h: h, vx: speed, color: info.actions[id].platformColor || '#9aa', hasSpikes: hasSpikes, spikeW: pSpikeW, spikeH: pSpikeH });
        }

        // timing for spike damage
        info.actions[id].lastSpikeDamageTime = info.actions[id].lastSpikeDamageTime || 0;
        return info;
    },
    moveFunc(info, ticks, id) {
        // Update platforms positions
        if (info.platforms) {
            for (let p of info.platforms) {
                p.x += p.vx;
                // wrap-around horizontally
                if (p.vx > 0 && p.x > info.width) p.x = -p.w;
                if (p.vx < 0 && p.x + p.w < 0) p.x = info.width;
            }
        }

        // Player support and spike damage checks (only relevant in blueMode/platformer)
        if (info.blueMode) {
            let playerX = info.px;
            let playerY = info.py;
            if (info.subArena && info.moveWithSub) { playerX += info.subx; playerY += info.suby }

            // Platforms: allow standing on top
            if (info.platforms) {
                for (let p of info.platforms) {
                    // check horizontal overlap with a small tolerance
                    if (playerX + info.pr > p.x && playerX - info.pr < p.x + p.w) {
                        const feetY = playerY + info.pr;
                        // If player's feet are touching or just below the platform top and falling, snap to platform
                        if (feetY >= p.y - 6 && feetY <= p.y + 10 && (info.vy || 0) >= -2) {
                            info.py = p.y - info.pr;
                            info.vy = 0;
                            info.onGround = true;
                            if (p.hasSpikes) {
                                const now = Date.now();
                                if (!info.actions[id].lastSpikeDamageTime) info.actions[id].lastSpikeDamageTime = 0;
                                if (now - info.actions[id].lastSpikeDamageTime > 0) {
                                    info.platformHit = true;
                                    info.actions[id].lastSpikeDamageTime = now;
                                }
                            }
                        }
                    }
                }
            }

            // Spikes: if player's feet intersect the spike band, deal damage periodically
            if (info.spikes && info.spikes.length) {
                const spikeTop = info.height - (info.actions[id].spikeHeight || 36);
                const feetY = info.py + info.pr;
                if (feetY >= spikeTop) {
                    // if player's x overlaps any spike
                    for (let s of info.spikes) {
                        if (info.px + info.pr > s.x && info.px - info.pr < s.x + s.w) {
                            const now = Date.now();
                            if (!info.actions[id].lastSpikeDamageTime) info.actions[id].lastSpikeDamageTime = 0;
                            if (now - info.actions[id].lastSpikeDamageTime > 0) {
                                info.platformHit = true; // reuse central damage handling
                                info.actions[id].lastSpikeDamageTime = now;
                            }
                            break;
                        }
                    }
                }
            }
        }

        // Allow `rain` to be specified on the action (info.actions[id].rain)
        if ((info.actions && info.actions[id] && info.actions[id].diceSpikes) || info.diceSpikes) {
            // Reuse existing pipRain behavior so toggling `rain` matches pipRain effects.
            if (BHB && BHB.diceSpikes && typeof BHB.diceSpikes.moveFunc === 'function') {
                info = BHB.diceSpikes.moveFunc(info, ticks, id) || info;
            }
        }

        return info;
    },
}


// Wrapper for a green-diamond, shield-deflection bulletHell (Undertale green soul)
function bulletHellGreen(actions, values = {}, exitAction = () => {}) {
    values = values || {};
    values.greenMode = true;
    return bulletHell(actions, values, exitAction);
}
try { window.bulletHellGreen = bulletHellGreen; } catch (e) { /* ignore in non-browser env */ }

//  BHB action: green spear rain 
// Spears are spawned from one of the 8 cardinal/diagonal directions and travel
// straight toward the player center.
// Usage: bulletHellGreen({"greenSpearRain": {spearPerSec: 2, spearSpeed: 5, spearLength: 80, spearWidth: 12}}, {width:500, height:500, duration:15})
BHB.greenSpearRain = {
    moveFunc(info, ticks, id) {
        const act      = info.actions[id];
        const len      = act.spearLength ?? 80;
        const wid      = act.spearWidth  ?? 12;
        const speed    = act.spearSpeed  ?? 5;
        const perSec   = act.spearPerSec ?? act.bulletPerSec ?? 2;
        const redChance    = act.redChance    ?? 0; // 0â€“1 probability of a spear being red
        const yellowChance = act.yellowChance ?? 0; // 0â€“1 probability of a spear being yellow
        const blueChance   = act.blueChance   ?? 0; // 0â€“1 probability of a spear being blue (parry)
        const orbitTriggerDist = act.orbitTriggerDist ?? 120;
        const orbitSpeed       = act.orbitSpeed       ?? 0.055;
        const fourDir = act.fourDir ?? false;
        const noRepeatDir = act.noRepeatDir ?? false; // if true, consecutive spears never share a direction

        if (!act.lastTime) act.lastTime = ticks;
        const toSpawn = Math.floor(((ticks - act.lastTime) / 1000) * perSec);

        const DIR_ANGLES = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];

        for (let i = 0; i < toSpawn; i++) {
            const roll = Math.random();
            const isYellow = roll < yellowChance;
            const isBlue   = !isYellow && roll < yellowChance + blueChance;
            const isRed    = !isYellow && !isBlue && roll < yellowChance + blueChance + redChance;
            const dirCount = fourDir ? 4 : 8;
            let dirIdx;
            if (noRepeatDir && dirCount > 1) {
                do { dirIdx = Math.floor(Math.random() * dirCount); } while (dirIdx === act._lastDirIdx);
                if (fourDir) dirIdx *= 2;
            } else {
                dirIdx = Math.floor(Math.random() * dirCount);
                if (fourDir) dirIdx *= 2;
            }
            act._lastDirIdx = fourDir ? dirIdx / 2 : dirIdx;
            const inboundAngle = DIR_ANGLES[dirIdx] + Math.PI;
            const vx = Math.cos(inboundAngle) * speed;
            const vy = Math.sin(inboundAngle) * speed;
            const margin = len + 16;
            const cx = info.subArena && info.moveWithSub ? info.subx + info.px : info.px;
            const cy = info.subArena && info.moveWithSub ? info.suby + info.py : info.py;
            const bx = cx + Math.cos(DIR_ANGLES[dirIdx]) * (Math.max(info.width, info.height) * 0.75 + margin);
            const by = cy + Math.sin(DIR_ANGLES[dirIdx]) * (Math.max(info.width, info.height) * 0.75 + margin);
            const angle = Math.atan2(vy, vx);
            const outAngle = DIR_ANGLES[dirIdx];
            info.bullets.push({
                name: "greenSpear",
                boxRender: true,
                x: bx, y: by,
                vx, vy,
                r: len,
                width: wid,
                angle,
                red: isRed,
                yellow: isYellow,
                blue: isBlue,
                _dirIdx: fourDir ? dirIdx / 2 : dirIdx, // source direction index (0â€“7)
                _yellowState: isYellow ? "approaching" : undefined,
                _orbitAngle:  isYellow ? outAngle : undefined,
                _orbitTarget: isYellow ? (outAngle + Math.PI) : undefined,
                _orbitDir:    isYellow ? 1 : undefined,
                _orbitRadius: isYellow ? orbitTriggerDist : undefined,
                _orbitTriggerDist: isYellow ? orbitTriggerDist : undefined,
                _orbitSpeed:  isYellow ? orbitSpeed : undefined,
                _strikeSpeed: isYellow ? speed : undefined,
                _yellowDeflected: false,
                _greenDeflected: false,
                draw(b, ctx) {
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);
                    // Blue spears pulse white when in parry range (visual cue to press key/click)
                    const parryPulse = b.blue && b._inParryRange && (Math.floor(Date.now() / 80) % 2 === 0);
                    const shaftColor  = b.yellow ? "#ff0"               : b.red ? "#f44"            : b.blue ? (parryPulse ? "#fff" : "#44f")  : "#0f0";
                    const shaftFade   = b.yellow ? "rgba(255,255,0,0)"  : b.red ? "rgba(255,40,40,0)": b.blue ? (parryPulse ? "rgba(255,255,255,0)" : "rgba(40,40,255,0)") : "rgba(0,255,80,0)";
                    const tipColor    = b.yellow ? "#ffe566"             : b.red ? "#f88"            : b.blue ? (parryPulse ? "#fff" : "#88f")  : "#4f4";
                    const glowColor   = b.yellow ? "#ffcc00"             : b.red ? "#f44"            : b.blue ? (parryPulse ? "#fff" : "#44f")  : "#0f0";
                    const grad = ctx.createLinearGradient(-b.r * 0.5, 0, b.r * 0.5, 0);
                    grad.addColorStop(0,   shaftFade);
                    grad.addColorStop(0.3, shaftColor);
                    grad.addColorStop(1,   "#fff");
                    ctx.beginPath();
                    ctx.moveTo(-b.r * 0.5, 0);
                    ctx.lineTo( b.r * 0.4, 0);
                    ctx.lineWidth   = b.width;
                    ctx.strokeStyle = grad;
                    if (!options.performanceMode) { ctx.shadowColor = glowColor; ctx.shadowBlur = parryPulse ? 20 : 10; }
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(b.r * 0.65, 0);
                    ctx.lineTo(b.r * 0.3, -b.width * 0.7);
                    ctx.lineTo(b.r * 0.3,  b.width * 0.7);
                    ctx.closePath();
                    ctx.fillStyle = tipColor;
                    if (!options.performanceMode) { ctx.shadowColor = glowColor; ctx.shadowBlur = parryPulse ? 24 : 16; }
                    ctx.fill();
                    ctx.restore();
                }
            });
        }
        if (toSpawn > 0) act.lastTime = ticks;

        //  Update yellow spear orbit state for spears spawned by this action 
        // _orbitTick guard prevents double-processing when multiple actions run the same loop.
        for (let b of info.bullets) {
            if (!b.yellow || b._yellowDeflected || b._yellowState === "striking") continue;
            if (b._orbitTick === ticks) continue;
            b._orbitTick = ticks;
            const px   = info.px;
            const py   = info.py;
            const dx   = b.x - px;
            const dy   = b.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const trigDist = b._orbitTriggerDist ?? 120;
            const orbitSpd = b._orbitSpeed ?? 0.055;

            if (b._yellowState === "approaching" && dist <= trigDist) {
                b._yellowState = "orbiting";
                b._orbitAngle  = Math.atan2(dy, dx);
                b._orbitTarget = b._orbitAngle + Math.PI;
                b._orbitDir    = 1;
                b._orbitRadius = dist;
                b.vx = 0;
                b.vy = 0;
            } else if (b._yellowState === "orbiting") {
                const orbitStep = orbitSpd * b._orbitDir * (info.dt ?? 1);
                b._orbitAngle += orbitStep;
                b._orbitAngle  = ((b._orbitAngle + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
                const orbitR   = b._orbitRadius ?? trigDist;
                b.x = px + Math.cos(b._orbitAngle) * orbitR;
                b.y = py + Math.sin(b._orbitAngle) * orbitR;
                const tangent  = b._orbitAngle + (b._orbitDir > 0 ? Math.PI / 2 : -Math.PI / 2);
                b.angle = tangent;
                b.vx = 0;
                b.vy = 0;
                let targetNorm = ((b._orbitTarget + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
                let diff = Math.abs(((b._orbitAngle - targetNorm + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI);
                if (diff < orbitSpd * 1.5 * (info.dt ?? 1)) {
                    b._yellowState = "striking";
                    b._orbitAngle  = targetNorm;
                    b.x = px + Math.cos(targetNorm) * orbitR;
                    b.y = py + Math.sin(targetNorm) * orbitR;
                    const strikeAngle = targetNorm + Math.PI;
                    const spd = b._strikeSpeed ?? speed;
                    b.vx  = Math.cos(strikeAngle) * spd;
                    b.vy  = Math.sin(strikeAngle) * spd;
                    b.angle = Math.atan2(b.vy, b.vx);
                }
            }
        }

        return info;
    },
}

//  BHB action: green spear choreography 
// Fires a scripted sequence of spears, each with its own timing and properties.
//
// Each entry in `sequence` is an object:
//   {
//     delay:   number   â€“ milliseconds after the action starts to fire this spear
//     dir:     number   â€“ direction index 0â€“7 (0=E 1=SE 2=S 3=SW 4=W 5=NW 6=N 7=NE)
//                         OR an angle in radians if >= 0 and < 2Ï€ (dir treated as raw angle when > 7)
//     speed:   number   â€“ pixels per frame (default 5)
//     length:  number   â€“ half-length of spear in px (default 80)
//     width:   number   â€“ thickness of spear in px (default 12)
//     loop:    boolean  â€“ if true, the whole sequence repeats once all entries have fired
//   }
//
// Usage:
//   bulletHellGreen({
//     "greenSpearChoreography": {
//       sequence: [
//         { delay: 0,    dir: 6, speed: 6, length: 80, width: 12 },   // N
//         { delay: 500,  dir: 2, speed: 6, length: 80, width: 12 },   // S
//         { delay: 1000, dir: 0, speed: 5, length: 60, width: 10 },   // E
//         { delay: 1000, dir: 4, speed: 5, length: 60, width: 10 },   // W
//       ],
//       loop: true   // repeat the sequence after all spears have fired
//     }
//   }, { width: 500, height: 500, duration: 20 })

BHB.greenSpearChoreography = {
    codeFunc(info, id) {
        const act = info.actions[id];
        // Timestamp when this action started (used to compute relative delays)
        act._seqStart  = Date.now();
        // Index of the next spear in the sequence yet to be fired
        act._seqIndex  = 0;
        return info;
    },
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        if (!act.sequence || act.sequence.length === 0) return info;

        // Initialise start time lazily (in case codeFunc wasn't called)
        if (!act._seqStart) act._seqStart = Date.now();
        if (act._seqIndex == null) act._seqIndex = 0;

        const elapsed = Date.now() - act._seqStart;

        // Fire all spears whose delay has been reached
        while (act._seqIndex < act.sequence.length) {
            const entry = act.sequence[act._seqIndex];
            if (elapsed < (entry.delay ?? 0)) break; // not yet time

            // Resolve direction
            const DIR_ANGLES = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4,
                                 Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];
            const dirIdx = entry.dir ?? 6;
            // If dir is an integer 0-7 use the lookup, otherwise treat as raw radian angle
            const outAngle = (Number.isInteger(dirIdx) && dirIdx >= 0 && dirIdx <= 7)
                ? DIR_ANGLES[dirIdx]
                : dirIdx;

            const speed  = entry.speed  ?? 5;
            const len    = entry.length ?? 80;
            const wid    = entry.width  ?? 12;
            // red/yellow/blue: true/false directly, OR redChance/yellowChance/blueChance: 0â€“1 probability
            // yellow takes priority over blue, blue over red
            const rollChoreo  = Math.random();
            const yChance     = entry.yellowChance ?? 0;
            const bChance     = entry.blueChance   ?? 0;
            const rChance     = entry.redChance    ?? 0;
            const isYellow    = entry.yellow ?? (rollChoreo < yChance);
            const isBlue      = !isYellow && (entry.blue ?? (rollChoreo < yChance + bChance));
            const isRed       = !isYellow && !isBlue && (entry.red ?? (rollChoreo < yChance + bChance + rChance));

            // Orbit params for yellow spears
            const orbitTriggerDist = entry.orbitTriggerDist ?? 120;
            const orbitSpeed       = entry.orbitSpeed       ?? 0.055;

            // Spear travels inward (opposite of outAngle)
            const inboundAngle = outAngle + Math.PI;
            const vx = Math.cos(inboundAngle) * speed;
            const vy = Math.sin(inboundAngle) * speed;
            const angle = Math.atan2(vy, vx);

            const margin = len + 16;
            const cx = info.subArena && info.moveWithSub ? info.subx + info.px : info.px;
            const cy = info.subArena && info.moveWithSub ? info.suby + info.py : info.py;
            const bx = cx + Math.cos(outAngle) * (Math.max(info.width, info.height) * 0.75 + margin);
            const by = cy + Math.sin(outAngle) * (Math.max(info.width, info.height) * 0.75 + margin);

            info.bullets.push({
                name: "greenSpear",
                boxRender: true,
                x: bx, y: by,
                vx, vy,
                r: len,
                width: wid,
                angle,
                red: isRed,
                yellow: isYellow,
                blue: isBlue,
                _dirIdx: (Number.isInteger(dirIdx) && dirIdx >= 0 && dirIdx <= 7) ? dirIdx : null,
                _yellowState: isYellow ? "approaching" : undefined,
                _orbitAngle:  isYellow ? outAngle : undefined,
                _orbitTarget: isYellow ? (outAngle + Math.PI) : undefined,
                _orbitDir:    isYellow ? 1 : undefined,
                _orbitRadius: isYellow ? orbitTriggerDist : undefined,
                _orbitTriggerDist: isYellow ? orbitTriggerDist : undefined,
                _orbitSpeed:  isYellow ? orbitSpeed : undefined,
                _strikeSpeed: isYellow ? speed : undefined,
                _yellowDeflected: false,
                _greenDeflected: false,
                draw(b, ctx) {
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);
                    // Blue spears pulse white when in parry range (visual cue to press key/click)
                    const parryPulse = b.blue && b._inParryRange && (Math.floor(Date.now() / 80) % 2 === 0);
                    const shaftColor  = b.yellow ? "#ff0"               : b.red ? "#f44"             : b.blue ? (parryPulse ? "#fff" : "#44f")  : "#0f0";
                    const shaftFade   = b.yellow ? "rgba(255,255,0,0)"  : b.red ? "rgba(255,40,40,0)" : b.blue ? (parryPulse ? "rgba(255,255,255,0)" : "rgba(40,40,255,0)") : "rgba(0,255,80,0)";
                    const tipColor    = b.yellow ? "#ffe566"             : b.red ? "#f88"             : b.blue ? (parryPulse ? "#fff" : "#88f")  : "#4f4";
                    const glowColor   = b.yellow ? "#ffcc00"             : b.red ? "#f44"             : b.blue ? (parryPulse ? "#fff" : "#44f")  : "#0f0";
                    const grad = ctx.createLinearGradient(-b.r * 0.5, 0, b.r * 0.5, 0);
                    grad.addColorStop(0,   shaftFade);
                    grad.addColorStop(0.3, shaftColor);
                    grad.addColorStop(1,   "#fff");
                    ctx.beginPath();
                    ctx.moveTo(-b.r * 0.5, 0);
                    ctx.lineTo( b.r * 0.4, 0);
                    ctx.lineWidth   = b.width;
                    ctx.strokeStyle = grad;
                    if (!options.performanceMode) { ctx.shadowColor = glowColor; ctx.shadowBlur = parryPulse ? 20 : 10; }
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(b.r * 0.65, 0);
                    ctx.lineTo(b.r * 0.3, -b.width * 0.7);
                    ctx.lineTo(b.r * 0.3,  b.width * 0.7);
                    ctx.closePath();
                    ctx.fillStyle = tipColor;
                    if (!options.performanceMode) { ctx.shadowColor = glowColor; ctx.shadowBlur = parryPulse ? 24 : 16; }
                    ctx.fill();
                    ctx.restore();
                }
            });

            act._seqIndex++;
        }

        // Loop: restart the sequence when all entries have fired
        const loop = act.loop ?? act.sequence[act.sequence.length - 1]?.loop ?? false;
        if (loop && act._seqIndex >= act.sequence.length) {
            act._seqStart = Date.now();
            act._seqIndex = 0;
        }

        //  Update yellow spear orbit state for spears spawned by this action 
        // _orbitTick guard prevents double-processing when multiple actions run the same loop.
        for (let b of info.bullets) {
            if (!b.yellow || b._yellowDeflected || b._yellowState === "striking") continue;
            if (b._orbitTick === ticks) continue;
            b._orbitTick = ticks;
            const px   = info.px;
            const py   = info.py;
            const dx   = b.x - px;
            const dy   = b.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const trigDist = b._orbitTriggerDist ?? 120;
            const orbitSpd = b._orbitSpeed ?? 0.055;

            if (b._yellowState === "approaching" && dist <= trigDist) {
                b._yellowState = "orbiting";
                b._orbitAngle  = Math.atan2(dy, dx);
                b._orbitTarget = b._orbitAngle + Math.PI;
                b._orbitDir    = 1;
                b._orbitRadius = dist;
                b.vx = 0;
                b.vy = 0;
            } else if (b._yellowState === "orbiting") {
                const orbitStep = orbitSpd * b._orbitDir * (info.dt ?? 1);
                b._orbitAngle += orbitStep;
                b._orbitAngle  = ((b._orbitAngle + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
                const orbitR   = b._orbitRadius ?? trigDist;
                b.x = px + Math.cos(b._orbitAngle) * orbitR;
                b.y = py + Math.sin(b._orbitAngle) * orbitR;
                const tangent  = b._orbitAngle + (b._orbitDir > 0 ? Math.PI / 2 : -Math.PI / 2);
                b.angle = tangent;
                b.vx = 0;
                b.vy = 0;
                let targetNorm = ((b._orbitTarget + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
                let diff = Math.abs(((b._orbitAngle - targetNorm + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI);
                if (diff < orbitSpd * 1.5 * (info.dt ?? 1)) {
                    b._yellowState = "striking";
                    b._orbitAngle  = targetNorm;
                    b.x = px + Math.cos(targetNorm) * orbitR;
                    b.y = py + Math.sin(targetNorm) * orbitR;
                    const strikeAngle = targetNorm + Math.PI;
                    // Retrieve original speed stored at spawn time
                    const spd = b._strikeSpeed ?? 5;
                    b.vx  = Math.cos(strikeAngle) * spd;
                    b.vy  = Math.sin(strikeAngle) * spd;
                    b.angle = Math.atan2(b.vy, b.vx);
                }
            }
        }

        return info;
    },
}

//	direction index (0=E, 1=SE, 2=S, 3=SW, 4=W, 5=NW, 6=N, 7=NE
/*
bulletHellGreen({
    "greenSpearChoreography": {
        loop: true,
        sequence: [
            { delay: 300, dir: 6, speed: 4, loop: true, red: false },                                                                                                                                              
            { delay: 400, dir: 5, speed: 4, loop: true, red: false },             
            { delay: 600, dir: 4, speed: 4, loop: true, red: false },             
            { delay: 700, dir: 3, speed: 4, loop: true, red: false },             
            { delay: 900, dir: 2, speed: 4, loop: true, red: false },                                                                                                                                              
            { delay: 1000, dir: 1, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                     
            { delay: 1200, dir: 0, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                     
            { delay: 1300, dir: 7, speed: 4, loop: true, red: false },                                                                                                                                                                                                                                                                                     
        ]
    }
}, { width: 500, height: 500, duration: 18 }) 


*/


//  BHB action: yellow spear rain 
// Yellow spears approach the shield from a cardinal/diagonal direction.
// When they reach a trigger distance from the player (orbitTriggerDist), they
// smoothly orbit around the shield circumference to the exact opposite side
// (Nâ†’S, NEâ†’SW, etc.), then launch straight at the player.
//
// Yellow spears behave like red spears when they hit the shield (damage + disappear).
// If they somehow reach the player body without hitting the shield, they also deal damage.
//
// Usage:
//   bulletHellGreen({
//     "yellowSpearRain": {
//       spearPerSec: 1.5, spearSpeed: 4, spearLength: 80, spearWidth: 12,
//       orbitTriggerDist: 120,   // distance from player center where orbit begins
//       orbitSpeed: 0.06,        // radians per frame for orbiting
//     }
//   }, { width: 500, height: 500, duration: 15 })
BHB.yellowSpearRain = {
    moveFunc(info, ticks, id) {
        const act       = info.actions[id];
        const len       = act.spearLength      ?? 80;
        const wid       = act.spearWidth       ?? 12;
        const speed     = act.spearSpeed       ?? 4;
        const perSec    = act.spearPerSec      ?? act.bulletPerSec ?? 1.5;
        const trigDist  = act.orbitTriggerDist ?? 120;
        const orbitSpd  = act.orbitSpeed       ?? 0.055;
        const fourDir   = act.fourDir          ?? false;
        const noRepeatDir = act.noRepeatDir ?? false;

        if (!act.lastTime) act.lastTime = ticks;
        const toSpawn = Math.floor(((ticks - act.lastTime) / 1000) * perSec);

        const DIR_ANGLES = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];

        for (let i = 0; i < toSpawn; i++) {
            const dirCount = fourDir ? 4 : 8;
            let dirIdx;
            if (noRepeatDir && dirCount > 1) {
                do { dirIdx = Math.floor(Math.random() * dirCount); } while (dirIdx === act._lastDirIdx);
                if (fourDir) dirIdx *= 2;
            } else {
                dirIdx = Math.floor(Math.random() * dirCount);
                if (fourDir) dirIdx *= 2;
            }
            act._lastDirIdx = fourDir ? dirIdx / 2 : dirIdx;

            const outAngle     = DIR_ANGLES[dirIdx];
            const inboundAngle = outAngle + Math.PI;
            const vx = Math.cos(inboundAngle) * speed;
            const vy = Math.sin(inboundAngle) * speed;
            const margin = len + 16;
            const cx = info.subArena && info.moveWithSub ? info.subx + info.px : info.px;
            const cy = info.subArena && info.moveWithSub ? info.suby + info.py : info.py;
            const bx = cx + Math.cos(outAngle) * (Math.max(info.width, info.height) * 0.75 + margin);
            const by = cy + Math.sin(outAngle) * (Math.max(info.width, info.height) * 0.75 + margin);

            info.bullets.push({
                name: "greenSpear",
                boxRender: true,
                x: bx, y: by,
                vx, vy,
                r: len,
                width: wid,
                angle: Math.atan2(vy, vx),
                yellow: true,
                _dirIdx: fourDir ? dirIdx / 2 : dirIdx,
                _yellowState: "approaching",
                _orbitAngle:       outAngle,
                _orbitTarget:      outAngle + Math.PI,
                _orbitDir:         1,
                _orbitRadius:      trigDist,
                _orbitTriggerDist: trigDist,
                _orbitSpeed:       orbitSpd,
                _strikeSpeed:      speed,
                _yellowDeflected:  false,
                _greenDeflected:   false,
                draw(b, ctx) {
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);
                    const grad = ctx.createLinearGradient(-b.r * 0.5, 0, b.r * 0.5, 0);
                    grad.addColorStop(0,   "rgba(255,255,0,0)");
                    grad.addColorStop(0.3, "#ff0");
                    grad.addColorStop(1,   "#fff");
                    ctx.beginPath();
                    ctx.moveTo(-b.r * 0.5, 0);
                    ctx.lineTo( b.r * 0.4, 0);
                    ctx.lineWidth   = b.width;
                    ctx.strokeStyle = grad;
                    if (!options.performanceMode) { ctx.shadowColor = "#ffcc00"; ctx.shadowBlur = 12; }
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(b.r * 0.65, 0);
                    ctx.lineTo(b.r * 0.3, -b.width * 0.7);
                    ctx.lineTo(b.r * 0.3,  b.width * 0.7);
                    ctx.closePath();
                    ctx.fillStyle = "#ffe566";
                    if (!options.performanceMode) { ctx.shadowColor = "#ffcc00"; ctx.shadowBlur = 16; }
                    ctx.fill();
                    ctx.restore();
                }
            });
        }
        if (toSpawn > 0) act.lastTime = ticks;

        //  Update yellow spear orbit state 
        // _orbitTick guard prevents double-processing when multiple actions run the same loop.
        for (let b of info.bullets) {
            if (!b.yellow || b._yellowDeflected || b._yellowState === "striking") continue;
            if (b._orbitTick === ticks) continue;
            b._orbitTick = ticks;
            const px   = info.px;
            const py   = info.py;
            const dx   = b.x - px;
            const dy   = b.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const td   = b._orbitTriggerDist ?? trigDist;
            const oSpd = b._orbitSpeed       ?? orbitSpd;

            if (b._yellowState === "approaching" && dist <= td) {
                b._yellowState = "orbiting";
                b._orbitAngle  = Math.atan2(dy, dx);
                b._orbitTarget = b._orbitAngle + Math.PI;
                b._orbitDir    = 1;
                b._orbitRadius = dist;
                b.vx = 0;
                b.vy = 0;
            } else if (b._yellowState === "orbiting") {
                const oStep = oSpd * b._orbitDir * (info.dt ?? 1);
                b._orbitAngle += oStep;
                b._orbitAngle  = ((b._orbitAngle + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
                const orbitR   = b._orbitRadius ?? td;
                b.x = px + Math.cos(b._orbitAngle) * orbitR;
                b.y = py + Math.sin(b._orbitAngle) * orbitR;
                b.angle = b._orbitAngle + (b._orbitDir > 0 ? Math.PI / 2 : -Math.PI / 2);
                b.vx = 0;
                b.vy = 0;
                const targetNorm = ((b._orbitTarget + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
                const diff = Math.abs(((b._orbitAngle - targetNorm + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI);
                if (diff < oSpd * 1.5 * (info.dt ?? 1)) {
                    b._yellowState = "striking";
                    b.x = px + Math.cos(targetNorm) * orbitR;
                    b.y = py + Math.sin(targetNorm) * orbitR;
                    const strikeAngle = targetNorm + Math.PI;
                    const spd = b._strikeSpeed ?? speed;
                    b.vx   = Math.cos(strikeAngle) * spd;
                    b.vy   = Math.sin(strikeAngle) * spd;
                    b.angle = Math.atan2(b.vy, b.vx);
                }
            }
        }

        return info;
    },
}

//  Blue spear shield/player interaction (handled in greenMode collision) 
// blueSpears that reach the shield arc â†’ parry window opens (spear pulses white).
//   â€¢ If player presses any arrow key, WASD, or clicks while the spear is in the shield arc
//     â†’ successful parry: spear vanishes, no damage.
//   â€¢ If player does NOT input in time â†’ spear passes through the shield and deals damage.
// blueSpears that reach the player body (without hitting the shield) â†’ deal damage.
// This is wired into the greenMode collision block via the `blue: true` property and
// the `_parryPressed` / `_inParryRange` / `_blueParryMissed` flags.


//  BHB action: blue spear rain 
// Like greenSpearRain but every spear requires a timed parry (key press or click)
// when it reaches the shield arc. Miss the parry and it passes through for damage.
//
// Usage: bulletHellGreen({"blueSpearRain": {spearPerSec: 1.5, spearSpeed: 5, spearLength: 80, spearWidth: 12}}, {width:500, height:500, duration:15})
BHB.blueSpearRain = {
    moveFunc(info, ticks, id) {
        const act    = info.actions[id];
        const len    = act.spearLength ?? 80;
        const wid    = act.spearWidth  ?? 12;
        const speed  = act.spearSpeed  ?? 5;
        const perSec = act.spearPerSec ?? act.bulletPerSec ?? 1.5;
        const fourDir     = act.fourDir     ?? false;
        const noRepeatDir = act.noRepeatDir ?? false;

        if (!act.lastTime) act.lastTime = ticks;
        const toSpawn = Math.floor(((ticks - act.lastTime) / 1000) * perSec);

        const DIR_ANGLES = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];

        for (let i = 0; i < toSpawn; i++) {
            const dirCount = fourDir ? 4 : 8;
            let dirIdx;
            if (noRepeatDir && dirCount > 1) {
                do { dirIdx = Math.floor(Math.random() * dirCount); } while (dirIdx === act._lastDirIdx);
                if (fourDir) dirIdx *= 2;
            } else {
                dirIdx = Math.floor(Math.random() * dirCount);
                if (fourDir) dirIdx *= 2;
            }
            act._lastDirIdx = fourDir ? dirIdx / 2 : dirIdx;

            const outAngle     = DIR_ANGLES[dirIdx];
            const inboundAngle = outAngle + Math.PI;
            const vx = Math.cos(inboundAngle) * speed;
            const vy = Math.sin(inboundAngle) * speed;
            const margin = len + 16;
            const cx = info.subArena && info.moveWithSub ? info.subx + info.px : info.px;
            const cy = info.subArena && info.moveWithSub ? info.suby + info.py : info.py;
            const bx = cx + Math.cos(outAngle) * (Math.max(info.width, info.height) * 0.75 + margin);
            const by = cy + Math.sin(outAngle) * (Math.max(info.width, info.height) * 0.75 + margin);

            info.bullets.push({
                name: "greenSpear",
                boxRender: true,
                x: bx, y: by,
                vx, vy,
                r: len,
                width: wid,
                angle: Math.atan2(vy, vx),
                blue: true,
                _greenDeflected: false,
                draw(b, ctx) {
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);
                    const parryPulse = b._inParryRange && (Math.floor(Date.now() / 80) % 2 === 0);
                    const shaftColor = parryPulse ? "#fff" : "#44f";
                    const shaftFade  = parryPulse ? "rgba(255,255,255,0)" : "rgba(40,40,255,0)";
                    const tipColor   = parryPulse ? "#fff" : "#88f";
                    const glowColor  = parryPulse ? "#fff" : "#44f";
                    const grad = ctx.createLinearGradient(-b.r * 0.5, 0, b.r * 0.5, 0);
                    grad.addColorStop(0,   shaftFade);
                    grad.addColorStop(0.3, shaftColor);
                    grad.addColorStop(1,   "#fff");
                    ctx.beginPath();
                    ctx.moveTo(-b.r * 0.5, 0);
                    ctx.lineTo( b.r * 0.4, 0);
                    ctx.lineWidth   = b.width;
                    ctx.strokeStyle = grad;
                    if (!options.performanceMode) { ctx.shadowColor = glowColor; ctx.shadowBlur = parryPulse ? 20 : 10; }
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(b.r * 0.65, 0);
                    ctx.lineTo(b.r * 0.3, -b.width * 0.7);
                    ctx.lineTo(b.r * 0.3,  b.width * 0.7);
                    ctx.closePath();
                    ctx.fillStyle = tipColor;
                    if (!options.performanceMode) { ctx.shadowColor = glowColor; ctx.shadowBlur = parryPulse ? 24 : 16; }
                    ctx.fill();
                    ctx.restore();
                }
            });
        }
        if (toSpawn > 0) act.lastTime = ticks;

        return info;
    },
}

//  BHB action: blue spear choreography 
// Scripted sequence of blue spears (parry-required). Same structure as
// greenSpearChoreography but every spear is blue by default.
//
// Each entry supports:
//   delay, dir (0â€“7 or raw radian), speed, length, width, loop
//
// Usage:
//   bulletHellGreen({
//     "blueSpearChoreography": {
//       sequence: [
//         { delay: 0,   dir: 6, speed: 5, length: 80, width: 12 },
//         { delay: 800, dir: 2, speed: 5, length: 80, width: 12 },
//       ],
//       loop: true
//     }
//   }, { width: 500, height: 500, duration: 20 })
BHB.blueSpearChoreography = {
    codeFunc(info, id) {
        const act      = info.actions[id];
        act._seqStart  = Date.now();
        act._seqIndex  = 0;
        return info;
    },
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        if (!act.sequence || act.sequence.length === 0) return info;

        if (!act._seqStart) act._seqStart = Date.now();
        if (act._seqIndex == null) act._seqIndex = 0;

        const elapsed = Date.now() - act._seqStart;

        while (act._seqIndex < act.sequence.length) {
            const entry = act.sequence[act._seqIndex];
            if (elapsed < (entry.delay ?? 0)) break;

            const DIR_ANGLES = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4,
                                 Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];
            const dirIdx   = entry.dir ?? 6;
            const outAngle = (Number.isInteger(dirIdx) && dirIdx >= 0 && dirIdx <= 7)
                ? DIR_ANGLES[dirIdx] : dirIdx;

            const speed = entry.speed  ?? 5;
            const len   = entry.length ?? 80;
            const wid   = entry.width  ?? 12;

            const inboundAngle = outAngle + Math.PI;
            const vx = Math.cos(inboundAngle) * speed;
            const vy = Math.sin(inboundAngle) * speed;

            const margin = len + 16;
            const cx = info.subArena && info.moveWithSub ? info.subx + info.px : info.px;
            const cy = info.subArena && info.moveWithSub ? info.suby + info.py : info.py;
            const bx = cx + Math.cos(outAngle) * (Math.max(info.width, info.height) * 0.75 + margin);
            const by = cy + Math.sin(outAngle) * (Math.max(info.width, info.height) * 0.75 + margin);

            info.bullets.push({
                name: "greenSpear",
                boxRender: true,
                x: bx, y: by,
                vx, vy,
                r: len,
                width: wid,
                angle: Math.atan2(vy, vx),
                blue: true,
                _greenDeflected: false,
                draw(b, ctx) {
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);
                    const parryPulse = b._inParryRange && (Math.floor(Date.now() / 80) % 2 === 0);
                    const shaftColor = parryPulse ? "#fff" : "#44f";
                    const shaftFade  = parryPulse ? "rgba(255,255,255,0)" : "rgba(40,40,255,0)";
                    const tipColor   = parryPulse ? "#fff" : "#88f";
                    const glowColor  = parryPulse ? "#fff" : "#44f";
                    const grad = ctx.createLinearGradient(-b.r * 0.5, 0, b.r * 0.5, 0);
                    grad.addColorStop(0,   shaftFade);
                    grad.addColorStop(0.3, shaftColor);
                    grad.addColorStop(1,   "#fff");
                    ctx.beginPath();
                    ctx.moveTo(-b.r * 0.5, 0);
                    ctx.lineTo( b.r * 0.4, 0);
                    ctx.lineWidth   = b.width;
                    ctx.strokeStyle = grad;
                    if (!options.performanceMode) { ctx.shadowColor = glowColor; ctx.shadowBlur = parryPulse ? 20 : 10; }
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(b.r * 0.65, 0);
                    ctx.lineTo(b.r * 0.3, -b.width * 0.7);
                    ctx.lineTo(b.r * 0.3,  b.width * 0.7);
                    ctx.closePath();
                    ctx.fillStyle = tipColor;
                    if (!options.performanceMode) { ctx.shadowColor = glowColor; ctx.shadowBlur = parryPulse ? 24 : 16; }
                    ctx.fill();
                    ctx.restore();
                }
            });

            act._seqIndex++;
        }

        // Loop: restart the sequence when all entries have fired
        const loop = act.loop ?? act.sequence[act.sequence.length - 1]?.loop ?? false;
        if (loop && act._seqIndex >= act.sequence.length) {
            act._seqStart = Date.now();
            act._seqIndex = 0;
        }

        return info;
    },
}




BHB.darkKnifeThrow = {
    // Usage: bulletHell({"darkKnifeThrow": {katanaLength: 90, katanaWidth: 12, knivesPerThrow: 2, enemySpeed: 14, knifePerSec: 2, aimTime: 600}}, {width: window.innerWidth, height: window.innerHeight, duration: 15, blindness: 200})
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        
        if (!act.lastTime) act.lastTime = ticks;
        
        const knivesToSpawn = Math.floor(((ticks - act.lastTime) / 1000) * (act.knifePerSec || 2));
        
        for (let i = 0; i < knivesToSpawn; i++) {
            for (let j = 0; j < (act.knivesPerThrow || 2); j++) {
                
                let length = act.katanaLength || 80;
                let edge = Math.floor(Math.random() * 4);
                let bx, by;
                
                // Spawn exactly 1 pixel inside the strict culling boundaries
                if (edge === 0) { bx = Math.random() * info.width; by = -length + 1; } // Top
                else if (edge === 1) { bx = info.width + length - 1; by = Math.random() * info.height; } // Right
                else if (edge === 2) { bx = Math.random() * info.width; by = info.height + length - 1; } // Bottom
                else { bx = -length + 1; by = Math.random() * info.height; } // Left

                info.bullets.push({
                    name: "katanaTelegraph", // Harmless while aiming
                    boxRender: true,
                    x: bx,
                    y: by,
                    r: length,
                    width: act.katanaWidth || 20,
                    angle: 0,
                    vx: 0,
                    vy: 0,
                    spawnTime: Date.now(),
                    state: "aiming",
                    draw(b, ctx) {
                        let age = Date.now() - b.spawnTime;
                        let aimTime = act.aimTime || 600;

                        ctx.save();
                        ctx.translate(b.x, b.y);

                        // 1. Handle Aiming & Telegraph Line
                        if (b.state === "aiming") {
                            // Continuously track player local coordinates
                            let playerLocalX = info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
                            let playerLocalY = info.py + (info.subArena && info.moveWithSub ? info.suby : 0);
                            b.angle = Math.atan2(playerLocalY - b.y, playerLocalX - b.x);

                            let opacity = Math.min(1, age / aimTime);
                            ctx.rotate(b.angle);

                            // Dashed Telegraph Line
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(4000, 0); // Project far across the screen
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = `rgba(136, 136, 255, ${opacity})`; // #88f
                            ctx.setLineDash([10, 15]);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        } else {
                            // Lock rotation when firing
                            ctx.rotate(b.angle); 
                        }

                        // 2. Draw the Katana (Always visible)
                        // Katana Hilt (Dark Navy)
                        ctx.fillStyle = "#226";
                        ctx.fillRect(-b.r, -b.width / 2, b.r * 0.4, b.width);

                        // Tsuba / Guard (Bright Blue)
                        ctx.fillStyle = "#88f";
                        ctx.fillRect(-b.r * 0.6, -b.width, b.r * 0.06, b.width * 2);

                        // Katana Blade (White with bright blue aura)
                        ctx.beginPath();
                        ctx.moveTo(-b.r * 0.54, -b.width / 2);
                        ctx.lineTo(b.r - 8, -b.width / 2); 
                        ctx.lineTo(b.r, 0); 
                        ctx.quadraticCurveTo(b.r - 8, b.width / 2, -b.r * 0.54, b.width / 2); 
                        ctx.closePath();

                        ctx.fillStyle = "#fff";
                        if (!options.performanceMode) {
                            ctx.shadowColor = "#88f";
                            ctx.shadowBlur = 12;
                        }
                        ctx.fill();

                        ctx.restore();
                    }
                });
            }
        }
        
        if (knivesToSpawn > 0) act.lastTime = ticks;

        // Update Physics & Transition States
        const aimTime = act.aimTime || 600;
        for (let b of info.bullets) {
            // Apply logic only to this attack's specific bullets
            if (b.spawnTime && (b.name === "katanaTelegraph" || b.name === "knife")) {
                let age = Date.now() - b.spawnTime;
                
                if (b.state === "aiming" && age >= aimTime) {
                    // Fire!
                    b.state = "firing";
                    
                    // Changing name to "knife" engages your engine's OBB collision instantly
                    b.name = "knife"; 
                    
                    let speed = act.enemySpeed || 14;
                    b.vx = Math.cos(b.angle) * speed;
                    b.vy = Math.sin(b.angle) * speed;
                }
            }
        }

        return info;
    }
}
BHB.darkRain = {
    moveFunc(info, ticks, id) {
        // Rain Bullets
        //bulletHell({"darkRain": {bulletPerSec: 7}}, {width: window.innerWidth, height: window.innerHeight, duration: 15, blindness: 200})
        const bulletRadius = info.actions[id].bulletRadius ?? 12;
        const bulletSpeed = info.actions[id].bulletSpeed ?? 2;
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const bulletsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].bulletPerSec); // LAST NUMBER IS AMOUNT OF BULLETS PER SECOND
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = Math.random() * info.width + info.boxLeft;
            let by = -bulletRadius;
            let bul = {x: bx, y: by, vx: bulletSpeed, vy: bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#88f";bossCtx.fill()}}
            info.bullets.push(bul);
            let bx2 = Math.random() * info.width + info.boxLeft;
            let by2 = window.innerHeight + bulletRadius;
            let bul2 = {x: bx2, y: by2, vx: bulletSpeed, vy: -bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#88f";bossCtx.fill()}}
            info.bullets.push(bul2);
            let bx3 = window.innerWidth + bulletRadius;
            let by3 = Math.random() * info.height + info.boxTop
            let bul3 = {x: bx3, y: by3, vx: -bulletSpeed, vy: bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#88f";bossCtx.fill()}}
            info.bullets.push(bul3);
            let bx4 = 0;
            let by4 = Math.random() * info.height + info.boxTop;
            let bul4 = {x: bx4, y: by4, vx: -bulletSpeed, vy: -bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#88f";bossCtx.fill()}}
            info.bullets.push(bul4);
            let bx5 = Math.random() * info.width + info.boxLeft;
            let by5 = -bulletRadius;
            let bul5 = {x: bx5, y: by5, vx: 0, vy: bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#88f";bossCtx.fill()}}
            info.bullets.push(bul5);
            let bx6 = Math.random() * info.width + info.boxLeft;
            let by6 = window.innerHeight + bulletRadius;
            let bul6 = {x: bx6, y: by6, vx: 0, vy: -bulletSpeed,r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#88f";bossCtx.fill()}}
            info.bullets.push(bul6);
            let bx7 = window.innerWidth + bulletRadius;
            let by7 = Math.random() * info.height + info.boxTop
            let bul7 = {x: bx7, y: by7, vx: 0, vy: bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#88f";bossCtx.fill()}}
            info.bullets.push(bul7);
            let bx8 = 0;
            let by8 = Math.random() * info.height + info.boxTop;
            let bul8 = {x: bx8, y: by8, vx: 0, vy: -bulletSpeed, r: bulletRadius, draw(b, bossCtx) {bossCtx.beginPath();bossCtx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);bossCtx.fillStyle = "#88f";bossCtx.fill()}}
            info.bullets.push(bul8);
        }
        if (bulletsToSpawn > 0) info.actions[id].lastTime = ticks;        // Rain Bullets
        return info
    },
}
//bulletHell({"darkKnifeThrow": {knifeLength: 80, knifeWidth: 20, knivesPerThrow: 1, enemySpeed: 9, knifePerSec: 2}}, {width: window.innerWidth,height: window.innerHeight, duration: 50, timed: true, cellSize: 75, start: "cell", goal: "cell", blindness: 150})
BHB.delayHomingSwarm = {
    // Usage: bulletHell({"delayHomingSwarm": {spawnPerSec: 4, driftTime: 1200, lockTime: 600, fireSpeed: 12, radius: 16}}, {width: window.innerWidth,height: window.innerHeight, duration: 15, blindness: 800})
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        
        // 1. Spawn the drifting orbs
        if (!act.lastTime) act.lastTime = ticks;
        const toSpawn = Math.floor(((ticks - act.lastTime) / 1000) * (act.spawnPerSec || 3));
        
        for (let i = 0; i < toSpawn; i++) {
            let bx, by, distToPlayer;
            
            // Get the precise global coordinates of the player to calculate the safe zone
            let playerGlobalX = info.boxLeft + info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
            let playerGlobalY = info.boxTop + info.py + (info.subArena && info.moveWithSub ? info.suby : 0);
            
            // Randomly spawn anywhere in or slightly around the arena
            // The loop ensures they never spawn directly on top of the player
            do {
                bx = info.boxLeft - 30 + Math.random() * (info.width + 60);
                by = info.boxTop - 30 + Math.random() * (info.height + 60);
                distToPlayer = Math.hypot(playerGlobalX - bx, playerGlobalY - by);
            } while (distToPlayer < 80); // 80px safe zone
            
            info.bullets.push({
                name: "hunterOrb",
                x: bx,
                y: by,
                vx: (Math.random() - 0.5) * 4, // Lazy drift velocity
                vy: (Math.random() - 0.5) * 4,
                r: act.radius || 15,
                spawnTime: ticks,
                state: "drifting", // State machine: drifting -> locked -> firing
                draw(b, bossCtx) {
                    bossCtx.save();
                    bossCtx.beginPath();
                    bossCtx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                    
                    if (b.state === "locked") {
                        // Warning state: Stop moving and glow intensely
                        bossCtx.fillStyle = "#f88";
                        if (!options.performanceMode) { bossCtx.shadowColor = "#f44"; bossCtx.shadowBlur = 16; }
                    } else if (b.state === "firing") {
                        // Attack state: Solid red, flying fast
                        bossCtx.fillStyle = "#f22";
                        if (!options.performanceMode) { bossCtx.shadowColor = "#f22"; bossCtx.shadowBlur = 12; }
                    } else {
                        // Drifting state: Harmless white glow
                        bossCtx.fillStyle = "#88f"; 
                        if (!options.performanceMode) { bossCtx.shadowColor = "#88f"; bossCtx.shadowBlur = 8; }
                    }
                    
                    bossCtx.fill();
                    bossCtx.restore();
                }
            });
        }
        if (toSpawn > 0) act.lastTime = ticks;

        // 2. Update the state machine for each orb
        const driftTime = act.driftTime || 1200;
        const lockTime = act.lockTime || 600;
        const fireSpeed = act.fireSpeed || 12;

        for (let b of info.bullets) {
            if (b.name === "hunterOrb") {
                let age = ticks - b.spawnTime;
                
                if (b.state === "drifting" && age > driftTime) {
                    // Lock onto player position and stop drifting
                    b.state = "locked";
                    b.vx = 0; 
                    b.vy = 0;
                } 
                else if (b.state === "locked" && age > driftTime + lockTime) {
                    // Fire directly at the player
                    b.state = "firing";
                    
                    let playerGlobalX = info.boxLeft + info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
                    let playerGlobalY = info.boxTop + info.py + (info.subArena && info.moveWithSub ? info.suby : 0);
                    
                    let dx = playerGlobalX - b.x;
                    let dy = playerGlobalY - b.y;
                    let dist = Math.hypot(dx, dy) || 1;
                    
                    b.vx = (dx / dist) * fireSpeed;
                    b.vy = (dy / dist) * fireSpeed;
                }
            }
        }
        return info;
    }
}
BHB.abyssalCrossfire = {
    // Usage: bulletHell({"abyssalCrossfire": {laserPerSec: 0.8, katanaPerSec: 1.5, laserCharge: 1200, katanaAim: 800, katanaSpeed: 14}}, {width: window.innerWidth, height: window.innerHeight, duration: 20})
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        
        // Initialize separate timers for independent spawn rates
        if (!act.lastLaserTime) act.lastLaserTime = ticks;
        if (!act.lastKatanaTime) act.lastKatanaTime = ticks;
        
        const toSpawnLasers = Math.floor(((ticks - act.lastLaserTime) / 1000) * (act.laserPerSec || 0.8));
        const toSpawnKatanas = Math.floor(((ticks - act.lastKatanaTime) / 1000) * (act.katanaPerSec || 1.5));
        
        // ==========================================
        // 1. SPAWN LASERS (Area Denial)
        // ==========================================
        for (let i = 0; i < toSpawnLasers; i++) {
            let edge = Math.floor(Math.random() * 4);
            let bx, by;
            if (edge === 0) { bx = Math.random() * info.width; by = 10; } 
            else if (edge === 1) { bx = info.width - 10; by = Math.random() * info.height; } 
            else if (edge === 2) { bx = Math.random() * info.width; by = info.height - 10; } 
            else { bx = 10; by = Math.random() * info.height; } 
            
            info.bullets.push({
                attackType: "laser",
                name: "crossfireTelegraph", // Harmless name
                boxRender: true,
                x: bx, y: by,
                r: 1, // Prevent 0-radius culling
                width: 0, angle: 0, vx: 0, vy: 0,
                spawnTime: Date.now(), 
                state: "charging", 
                draw(b, ctx) {
                    let age = Date.now() - b.spawnTime; 
                    let chargeTime = act.laserCharge || 1200;
                    let fireTime = act.laserFire || 400;
                    
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);
                    
                    if (b.state === "charging" || b.state === "locked") {
                        let opacity = Math.min(1, age / chargeTime);
                        
                        ctx.beginPath();
                        ctx.moveTo(-4000, 0); 
                        ctx.lineTo(4000, 0);
                        
                        if (b.state === "charging") {
                            ctx.lineWidth = 2;
                            ctx.setLineDash([10, 10]);
                        } else {
                            ctx.lineWidth = 3;
                            ctx.setLineDash([]);
                        }
                        
                        ctx.strokeStyle = `rgba(136, 136, 255, ${opacity})`;
                        ctx.stroke();
                        ctx.setLineDash([]);
                        
                        ctx.beginPath();
                        ctx.arc(0, 0, 16 * opacity, 0, Math.PI * 2);
                        ctx.fillStyle = b.state === "locked" ? "#fff" : "#88f";
                        ctx.fill();
                        
                    } else if (b.state === "firing") {
                        let fireProgress = (age - chargeTime) / fireTime;
                        let beamThickness = b.width * Math.sin(fireProgress * Math.PI);
                        
                        if (beamThickness > 0) {
                            ctx.beginPath();
                            ctx.moveTo(-4000, 0);
                            ctx.lineTo(4000, 0);
                            ctx.lineWidth = beamThickness + 12;
                            ctx.strokeStyle = "rgba(34, 34, 102, 0.7)"; 
                            if (!options.performanceMode) { ctx.shadowColor = "#88f"; ctx.shadowBlur = 20; }
                            ctx.stroke();
                            
                            ctx.beginPath();
                            ctx.moveTo(-4000, 0);
                            ctx.lineTo(4000, 0);
                            ctx.lineWidth = beamThickness;
                            ctx.strokeStyle = "#88f"; 
                            if (!options.performanceMode) ctx.shadowBlur = 0;
                            ctx.stroke();
                        }
                    }
                    ctx.restore();
                }
            });
        }
        if (toSpawnLasers > 0) act.lastLaserTime = ticks;

        // ==========================================
        // 2. SPAWN KATANAS (Targeted Pressure)
        // ==========================================
        for (let i = 0; i < toSpawnKatanas; i++) {
            let length = act.katanaLength || 80;
            let edge = Math.floor(Math.random() * 4);
            let bx, by;
            
            if (edge === 0) { bx = Math.random() * info.width; by = -length + 1; } 
            else if (edge === 1) { bx = info.width + length - 1; by = Math.random() * info.height; } 
            else if (edge === 2) { bx = Math.random() * info.width; by = info.height + length - 1; } 
            else { bx = -length + 1; by = Math.random() * info.height; } 

            info.bullets.push({
                attackType: "katana",
                name: "crossfireTelegraph", // Harmless name
                boxRender: true,
                x: bx, y: by,
                r: length, width: act.katanaWidth || 20,
                angle: 0, vx: 0, vy: 0,
                spawnTime: Date.now(),
                state: "aiming",
                draw(b, ctx) {
                    let age = Date.now() - b.spawnTime;
                    let aimTime = act.katanaAim || 800;

                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);

                    if (b.state === "aiming") {
                        let opacity = Math.min(1, age / aimTime);
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(4000, 0);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = `rgba(136, 136, 255, ${opacity})`;
                        ctx.setLineDash([10, 15]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }

                    // Hilt
                    ctx.fillStyle = "#226";
                    ctx.fillRect(-b.r, -b.width / 2, b.r * 0.4, b.width);
                    // Guard
                    ctx.fillStyle = "#88f";
                    ctx.fillRect(-b.r * 0.6, -b.width, b.r * 0.06, b.width * 2);

                    // Blade
                    ctx.beginPath();
                    ctx.moveTo(-b.r * 0.54, -b.width / 2);
                    ctx.lineTo(b.r - 8, -b.width / 2); 
                    ctx.lineTo(b.r, 0); 
                    ctx.quadraticCurveTo(b.r - 8, b.width / 2, -b.r * 0.54, b.width / 2); 
                    ctx.closePath();

                    ctx.fillStyle = "#fff";
                    if (!options.performanceMode) { ctx.shadowColor = "#88f"; ctx.shadowBlur = 12; }
                    ctx.fill();

                    // Fuller
                    ctx.beginPath();
                    ctx.moveTo(-b.r * 0.54, 0);
                    ctx.lineTo(b.r - 12, 0);
                    ctx.strokeStyle = "#88f";
                    ctx.lineWidth = 2;
                    if (!options.performanceMode) ctx.shadowBlur = 0;
                    ctx.stroke();

                    ctx.restore();
                }
            });
        }
        if (toSpawnKatanas > 0) act.lastKatanaTime = ticks;

        // ==========================================
        // 3. PHYSICS & STATE MACHINES
        // ==========================================
        const laserCharge = act.laserCharge || 1200;
        const laserLock = act.laserLock || 300;
        const laserFire = act.laserFire || 400;
        const katanaAim = act.katanaAim || 800;
        
        let playerLocalX = info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
        let playerLocalY = info.py + (info.subArena && info.moveWithSub ? info.suby : 0);

        for (let b of info.bullets) {
            if (!b.attackType) continue; // Skip generic bullets if any exist
            let age = Date.now() - b.spawnTime;
            
            // --- LASER LOGIC ---
            if (b.attackType === "laser") {
                if (b.state === "charging") {
                    b.angle = Math.atan2(playerLocalY - b.y, playerLocalX - b.x);
                    if (age >= laserCharge - laserLock) b.state = "locked";
                } 
                else if (b.state === "locked") {
                    if (age >= laserCharge) {
                        b.state = "firing";
                        b.name = "knife"; // OBB Collision ON
                        b.r = 8000; 
                        b.width = act.laserWidth || 36; 
                    }
                } 
                else if (b.state === "firing") {
                    let fireProgress = (age - laserCharge) / laserFire;
                    b.width = (act.laserWidth || 36) * Math.max(0, Math.sin(fireProgress * Math.PI));
                    if (age >= laserCharge + laserFire) b._dead = true;
                }
            } 
            
            // --- KATANA LOGIC ---
            else if (b.attackType === "katana") {
                if (b.state === "aiming") {
                    b.angle = Math.atan2(playerLocalY - b.y, playerLocalX - b.x);
                    if (age >= katanaAim) {
                        b.state = "firing";
                        b.name = "knife"; // OBB Collision ON
                        let speed = act.katanaSpeed || 14;
                        b.vx = Math.cos(b.angle) * speed;
                        b.vy = Math.sin(b.angle) * speed;
                    }
                } 
                else if (b.state === "firing") {
                    // Manual Garbage Collection for standard projectiles
                    let isOffScreen = b.x < -200 || b.x > info.width + 200 || b.y < -200 || b.y > info.height + 200;
                    if (isOffScreen) b._dead = true;
                }
            }
        }
        
        // 4. CLEANUP
        info.bullets = info.bullets.filter(b => !b._dead);
        
        return info;
    }
}
BHB.abyssalLasers = {
    // Usage: bulletHell({"abyssalLasers": {laserPerSec: 2.5, chargeTime: 1200, lockDelay: 300, fireTime: 400, beamWidth: 24}}, {width: window.innerWidth, height: window.innerHeight, duration: 15, blindness: 500})
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        
        if (!act.lastTime) act.lastTime = ticks;
        const toSpawn = Math.floor(((ticks - act.lastTime) / 1000) * (act.laserPerSec || 1.5));
        
        for (let i = 0; i < toSpawn; i++) {
            let edge = Math.floor(Math.random() * 4);
            let bx, by;
            if (edge === 0) { bx = Math.random() * info.width; by = 10; } // top
            else if (edge === 1) { bx = info.width - 10; by = Math.random() * info.height; } // right
            else if (edge === 2) { bx = Math.random() * info.width; by = info.height - 10; } // bottom
            else { bx = 10; by = Math.random() * info.height; } // left
            
            info.bullets.push({
                name: "laserTelegraph",
                boxRender: true,
                x: bx,
                y: by,
                r: 1, 
                width: 0,
                angle: 0,
                vx: 0,
                vy: 0,
                spawnTime: Date.now(), 
                state: "charging", // States: charging -> locked -> firing
                draw(b, ctx) {
                    let age = Date.now() - b.spawnTime; 
                    let chargeTime = act.chargeTime || 1200;
                    let fireTime = act.fireTime || 400;
                    
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);
                    
                    if (b.state === "charging" || b.state === "locked") {
                        let opacity = Math.min(1, age / chargeTime);
                        
                        // Telegraph Line
                        ctx.beginPath();
                        ctx.moveTo(-4000, 0); 
                        ctx.lineTo(4000, 0);
                        
                        if (b.state === "charging") {
                            ctx.lineWidth = 2;
                            ctx.setLineDash([10, 10]); // Dashed while tracking
                        } else {
                            ctx.lineWidth = 3;
                            ctx.setLineDash([]); // Solid and thicker when locked
                        }
                        
                        ctx.strokeStyle = `rgba(136, 136, 255, ${opacity})`; // #88f
                        ctx.stroke();
                        ctx.setLineDash([]);
                        
                        // Source Orb
                        ctx.beginPath();
                        ctx.arc(0, 0, 16 * opacity, 0, Math.PI * 2);
                        ctx.fillStyle = b.state === "locked" ? "#fff" : "#88f"; // Flash white when locked
                        ctx.fill();
                        
                    } else if (b.state === "firing") {
                        let fireProgress = (age - chargeTime) / fireTime;
                        let beamThickness = b.width * Math.sin(fireProgress * Math.PI);
                        
                        if (beamThickness > 0) {
                            // Outer dark aura
                            ctx.beginPath();
                            ctx.moveTo(-4000, 0);
                            ctx.lineTo(4000, 0);
                            ctx.lineWidth = beamThickness + 12;
                            ctx.strokeStyle = "rgba(34, 34, 102, 0.7)"; // #226
                            if (!options.performanceMode) { 
                                ctx.shadowColor = "#88f"; 
                                ctx.shadowBlur = 20; 
                            }
                            ctx.stroke();
                            
                            // Inner bright core
                            ctx.beginPath();
                            ctx.moveTo(-4000, 0);
                            ctx.lineTo(4000, 0);
                            ctx.lineWidth = beamThickness;
                            ctx.strokeStyle = "#88f"; 
                            if (!options.performanceMode) ctx.shadowBlur = 0;
                            ctx.stroke();
                        }
                    }
                    
                    ctx.restore();
                }
            });
        }
        if (toSpawn > 0) act.lastTime = ticks;

        const chargeTime = act.chargeTime || 1200;
        const lockDelay = act.lockDelay || 300; // How long it freezes before firing
        const fireTime = act.fireTime || 400;
        
        for (let b of info.bullets) {
            if (b.name === "laserTelegraph" || b.name === "knife") {
                let age = Date.now() - b.spawnTime;
                
                if (b.state === "charging") {
                    // Track player position while charging
                    let playerLocalX = info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
                    let playerLocalY = info.py + (info.subArena && info.moveWithSub ? info.suby : 0);
                    b.angle = Math.atan2(playerLocalY - b.y, playerLocalX - b.x);
                    
                    // Transition to locked state right before firing
                    if (age >= chargeTime - lockDelay) {
                        b.state = "locked";
                    }
                } else if (b.state === "locked") {
                    // Angle tracking stops here. Just wait for chargeTime to finish.
                    if (age >= chargeTime) {
                        b.state = "firing";
                        b.name = "knife"; 
                        b.r = 8000; 
                        b.width = act.beamWidth || 36; 
                    }
                } else if (b.state === "firing") {
                    let fireProgress = (age - chargeTime) / fireTime;
                    b.width = (act.beamWidth || 36) * Math.max(0, Math.sin(fireProgress * Math.PI));
                    
                    if (age >= chargeTime + fireTime) {
                        b._dead = true;
                    }
                }
            }
        }
        
        info.bullets = info.bullets.filter(b => !b._dead);
        
        return info;
    }
}
BHB.spinningKatanaGrid = {
    // Usage: bulletHell({"spinningKatanaGrid": {spacing: 150, speed: 1.5, spinSpeed: 0.02, katanaLength: 70, katanaWidth: 14}}, {width: window.innerWidth, height: window.innerHeight, transparent: true, duration: 15, blindness: 300})
    codeFunc(info, id) {
        const act = info.actions[id];
        
        act.spacing = act.spacing || 150;
        act.katanaLength = act.katanaLength || 60;
        act.spinSpeed = act.spinSpeed || 0.04;
        act.speed = act.speed || 4;

        // Calculate grid dimensions to cover the screen plus a buffer
        act.cols = Math.ceil(info.width / act.spacing) + 20;
        act.rows = Math.ceil(info.height / act.spacing) + 20;
        act.gridWidth = act.cols * act.spacing;
        act.gridHeight = act.rows * act.spacing;

        // Pick a random diagonal direction
        act.vx = (Math.random() < 0.5 ? 1 : -1) * act.speed;
        act.vy = (Math.random() < 0.5 ? 1 : -1) * act.speed;

        // Spawn the infinite grid once
        for (let r = 0; r < act.rows; r++) {
            for (let c = 0; c < act.cols; c++) {
                let bx = c * act.spacing - act.spacing;
                let by = r * act.spacing - act.spacing;


                let currentSpin = (r + c) % 2 === 0 ? act.spinSpeed : act.spinSpeed;

                info.bullets.push({
                    name: "knife", 
                    boxRender: true,
                    x: bx,
                    y: by,
                    r: 4000, // Giant radius to survive culling
                    visualR: act.katanaLength,
                    width: -1000, // Mathematically impossible OBB collision
                    visualWidth: act.katanaWidth || 14,
                    vx: act.vx,
                    vy: act.vy,
                    angle: 0,
                    spinSpeed: currentSpin,
                    draw(b, ctx) {
                        b.angle += b.spinSpeed;
                        
                        ctx.save();
                        ctx.translate(b.x, b.y);
                        ctx.rotate(b.angle);

                        // Use the visual variables for drawing so it doesn't render the crazy hitbox sizes
                        let drawR = b.visualR;
                        let drawW = b.visualWidth;

                        // Katana Hilt
                        ctx.fillStyle = "#226";
                        ctx.fillRect(-drawR, -drawW / 2, drawR * 0.4, drawW);

                        // Tsuba / Guard
                        ctx.fillStyle = "#88f";
                        ctx.fillRect(-drawR * 0.6, -drawW, drawR * 0.06, drawW * 2);

                        // Katana Blade
                        ctx.beginPath();
                        ctx.moveTo(-drawR * 0.54, -drawW / 2);
                        ctx.lineTo(drawR - 8, -drawW / 2);
                        ctx.lineTo(drawR, 0);
                        ctx.quadraticCurveTo(drawR - 8, drawW / 2, -drawR * 0.54, drawW / 2);
                        ctx.closePath();

                        ctx.fillStyle = "#fff";
                        if (!options.performanceMode) {
                            ctx.shadowColor = "#88f";
                            ctx.shadowBlur = 12;
                        }
                        ctx.fill();


                        ctx.restore();
                    }
                });
            }
        }
        return info;
    },
    
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        
        for (let b of info.bullets) {
            // Target only the grid katanas using the custom visualR property
            if (b.visualR !== undefined) {
                
                // Wrap-around logic to create the infinite scrolling illusion
                if (b.vx > 0 && b.x > info.width + act.spacing) {
                    b.x -= act.gridWidth;
                } else if (b.vx < 0 && b.x < -act.spacing) {
                    b.x += act.gridWidth;
                }

                if (b.vy > 0 && b.y > info.height + act.spacing) {
                    b.y -= act.gridHeight;
                } else if (b.vy < 0 && b.y < -act.spacing) {
                    b.y += act.gridHeight;
                }

                // Dynamically toggle hitbox status based on screen visibility
                let insideX = b.x >= -b.visualR && b.x <= info.width + b.visualR;
                let insideY = b.y >= -b.visualR && b.y <= info.height + b.visualR;
                
                if (insideX && insideY) {
                    b.r = b.visualR;         // Normal length
                    b.width = b.visualWidth; // Normal thickness (Collision turns ON)
                } else {
                    b.r = 4000;      // Survive engine off-screen culling
                    b.width = -1000; // Impossible negative width (Collision turns OFF)
                }
            }
        }
        return info;
    }
}
BHB.safeZoneLasers = {
    // Usage: bulletHell({"safeZoneLasers": {interval: 2000, safeWidth: 120, chargeTime: 1000, fireTime: 500}}, {width: window.innerWidth, transparent: true, height: window.innerHeight, duration: 20, blindness: 300})
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        
        if (!act.lastTime) act.lastTime = ticks;
        
        if (ticks - act.lastTime > (act.interval || 5000)) {
            let safeWidth = act.safeWidth || 120; 
            
            // Pick a random point somewhat near the center of the arena
            let safeX = (info.width / 2) + (Math.random() - 0.5) * (info.width * 0.5);
            let safeY = (info.height / 2) + (Math.random() - 0.5) * (info.height * 0.5);
            
            // Pick any random angle for the safe strip
            let angle = Math.random() * Math.PI; 
            let perpAngle = angle + Math.PI / 2;

            // Massive widths to cover the screen regardless of rotation
            let dangerWidth = 6000; 
            let offsetDistance = (safeWidth / 2) + (dangerWidth / 2);

            const createZone = (bx, by, bAngle) => {
                info.bullets.push({
                    name: "knife", // MUST remain "knife" to use the OBB math!
                    boxRender: true,
                    x: bx,
                    y: by,
                    r: 8000, 
                    width: -1000, // Mathematically impossible to hit while charging
                    targetWidth: dangerWidth,
                    angle: bAngle,
                    vx: 0, vy: 0,
                    spawnTime: Date.now(),
                    state: "charging",
                    draw(b, ctx) {
                        let age = Date.now() - b.spawnTime;
                        let chargeTime = act.chargeTime || 1500;
                        
                        ctx.save();
                        ctx.translate(b.x, b.y);
                        ctx.rotate(b.angle);
                        
                        if (b.state === "charging") {
                            // Flashing translucent blue warning
                            let flash = Math.floor(age / 150) % 2 === 0 ? 0.25 : 0.5;
                            ctx.fillStyle = `rgba(136, 136, 255, ${flash})`; // #88f
                            ctx.fillRect(-b.r, -b.targetWidth / 2, b.r * 2, b.targetWidth);
                            
                            // Solid blue line marking the safe zone edge
                            ctx.strokeStyle = "#88f";
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(-b.r, -b.targetWidth / 2);
                            ctx.lineTo(b.r, -b.targetWidth / 2);
                            ctx.moveTo(-b.r, b.targetWidth / 2);
                            ctx.lineTo(b.r, b.targetWidth / 2);
                            ctx.stroke();
                            
                        } else if (b.state === "firing") {
                            // Active Lethal Laser Background
                            ctx.fillStyle = "rgba(34, 34, 102, 0.9)"; // #226
                            if (!options.performanceMode) {
                                ctx.shadowColor = "#88f";
                                ctx.shadowBlur = 20;
                            }
                            ctx.fillRect(-b.r, -b.targetWidth / 2, b.r * 2, b.targetWidth);
                            
                            // Bright borders bordering the safe zone
                            ctx.strokeStyle = "#88f";
                            ctx.lineWidth = 6;
                            if (!options.performanceMode) ctx.shadowBlur = 0;
                            ctx.beginPath();
                            ctx.moveTo(-b.r, -b.targetWidth / 2);
                            ctx.lineTo(b.r, -b.targetWidth / 2);
                            ctx.moveTo(-b.r, b.targetWidth / 2);
                            ctx.lineTo(b.r, b.targetWidth / 2);
                            ctx.stroke();
                        }
                        
                        ctx.restore();
                    }
                });
            };

            // Danger Zone 1
            let dz1x = safeX + Math.cos(perpAngle) * offsetDistance;
            let dz1y = safeY + Math.sin(perpAngle) * offsetDistance;
            createZone(dz1x, dz1y, angle);

            // Danger Zone 2
            let dz2x = safeX - Math.cos(perpAngle) * offsetDistance;
            let dz2y = safeY - Math.sin(perpAngle) * offsetDistance;
            createZone(dz2x, dz2y, angle);
            
            act.lastTime = ticks;
        }

        const chargeTime = act.chargeTime || 1500;
        const fireTime = act.fireTime || 500;
        
        for (let b of info.bullets) {
            // Target the wipes using targetWidth instead of name, since name is now "knife"
            if (b.targetWidth !== undefined) {
                let age = Date.now() - b.spawnTime;
                
                if (b.state === "charging" && age >= chargeTime) {
                    b.state = "firing";
                    b.width = b.targetWidth; // Enables the massive lethal hitbox instantly
                } 
                else if (b.state === "firing" && age >= chargeTime + fireTime) {
                    b._dead = true;
                }
            }
        }
        
        info.bullets = info.bullets.filter(b => !b._dead);
        
        return info;
    }
}
BHB.abyssalSanctuary = {
    // Usage: bulletHell({"abyssalSanctuary": {}}, {width: window.innerWidth, height: window.innerHeight,transparent: true, duration: 32, blindness: })
    codeFunc(info, id) {
        const act = info.actions[id];
        act.startTime = Date.now();

        // 1. Spawn the Background Temple 
        info.bullets.push({
            attackType: "temple",
            name: "knife", // MUST be "knife" to bypass the engine's generic circular collision
            boxRender: true,
            x: info.width / 2,
            y: info.height / 2,
            r: 16000, 
            width: -1000, // Mathematically impossible to collide with
            angle: 0, 
            vx: 0, 
            vy: 0, 
            draw(b, ctx) {
                ctx.save();
                ctx.translate(b.x, b.y);
                
                // Keep it in the background
                ctx.globalAlpha = 0.25; 
                ctx.scale(1.2, 1.2); 

                // Outer Octagon 
                ctx.beginPath();
                for (let i = 0; i <= 8; i++) {
                    let a = i * Math.PI / 4 + Math.PI / 8;
                    ctx.lineTo(Math.cos(a) * 440, Math.sin(a) * 440);
                }
                ctx.strokeStyle = "#226";
                ctx.lineWidth = 14;
                ctx.stroke();

                // Inner Octagon 
                ctx.beginPath();
                for (let i = 0; i <= 8; i++) {
                    let a = i * Math.PI / 4 + Math.PI / 8;
                    ctx.lineTo(Math.cos(a) * 380, Math.sin(a) * 380);
                }
                ctx.lineWidth = 5;
                ctx.stroke();

                // Torii Gate 
                ctx.fillStyle = "#88f";
                ctx.fillRect(-140, -40, 48, 280); // Left Pillar
                ctx.fillRect(92, -40, 48, 280);  // Right Pillar
                ctx.fillRect(-180, 20, 360, 32);  // Lower Bar
                ctx.fillRect(-30, -50, 60, 70);  // Center Block
                
                // Curved Roof
                ctx.beginPath();
                ctx.moveTo(-220, -120);
                ctx.quadraticCurveTo(0, -70, 220, -120);
                ctx.lineTo(180, -50);
                ctx.lineTo(-180, -50);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            }
        });

        return info;
    },

    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        const now = Date.now();
        let elapsed = now - act.startTime;

        let playerLocalX = info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
        let playerLocalY = info.py + (info.subArena && info.moveWithSub ? info.suby : 0);

        // ==========================================
        // SPAWN HELPERS
        // ==========================================
        const spawnRandomLaser = () => {
            let edge = Math.floor(Math.random() * 4);
            let bx, by;
            if (edge === 0) { bx = Math.random() * info.width; by = 10; } 
            else if (edge === 1) { bx = info.width - 10; by = Math.random() * info.height; } 
            else if (edge === 2) { bx = Math.random() * info.width; by = info.height - 10; } 
            else { bx = 10; by = Math.random() * info.height; } 

            info.bullets.push({
                attackType: "randomLaser",
                name: "knife", 
                boxRender: true,
                x: bx, y: by, r: 8000, 
                width: -1000, // Safe while charging
                targetWidth: 32, 
                angle: 0, 
                vx: 0, vy: 0, 
                spawnTime: now,
                state: "charging",
                draw(b, ctx) {
                    let age = Date.now() - b.spawnTime; 
                    let chargeTime = 1200;
                    let fireTime = 400;
                    
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.angle);
                    
                    if (b.state === "charging" || b.state === "locked") {
                        let opacity = Math.min(1, age / chargeTime);
                        ctx.beginPath(); ctx.moveTo(-4000, 0); ctx.lineTo(4000, 0);
                        ctx.lineWidth = b.state === "charging" ? 2 : 3;
                        ctx.setLineDash(b.state === "charging" ? [10, 10] : []);
                        ctx.strokeStyle = `rgba(136, 136, 255, ${opacity})`;
                        ctx.stroke(); ctx.setLineDash([]);
                        
                        ctx.beginPath(); ctx.arc(0, 0, 16 * opacity, 0, Math.PI * 2);
                        ctx.fillStyle = b.state === "locked" ? "#fff" : "#88f";
                        ctx.fill();
                    } else if (b.state === "firing") {
                        let fireProgress = (age - chargeTime) / fireTime;
                        let beamThickness = b.targetWidth * Math.max(0, Math.sin(fireProgress * Math.PI));
                        if (beamThickness > 0) {
                            ctx.beginPath(); ctx.moveTo(-4000, 0); ctx.lineTo(4000, 0);
                            ctx.lineWidth = beamThickness + 12; ctx.strokeStyle = "rgba(34, 34, 102, 0.7)"; 
                            if (!options.performanceMode) { ctx.shadowColor = "#88f"; ctx.shadowBlur = 20; }
                            ctx.stroke();
                            
                            ctx.beginPath(); ctx.moveTo(-4000, 0); ctx.lineTo(4000, 0);
                            ctx.lineWidth = beamThickness; ctx.strokeStyle = "#88f"; 
                            if (!options.performanceMode) ctx.shadowBlur = 0;
                            ctx.stroke();
                        }
                    }
                    ctx.restore();
                }
            });
        };

        const spawnUltKatana = () => {
            let length = 80;
            let edge = Math.floor(Math.random() * 4);
            let bx, by;
            if (edge === 0) { bx = Math.random() * info.width; by = -length + 1; } 
            else if (edge === 1) { bx = info.width + length - 1; by = Math.random() * info.height; } 
            else if (edge === 2) { bx = Math.random() * info.width; by = info.height + length - 1; } 
            else { bx = -length + 1; by = Math.random() * info.height; } 

            info.bullets.push({
                attackType: "katana",
                name: "knife",
                boxRender: true,
                x: bx, y: by, r: length, 
                width: -1000, // Safe while aiming
                targetWidth: 20,
                angle: 0, vx: 0, vy: 0,
                spawnTime: now,
                state: "aiming",
                draw(b, ctx) {
                    let age = Date.now() - b.spawnTime;
                    ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.angle);
                    if (b.state === "aiming") {
                        let opacity = Math.min(1, age / 800);
                        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(4000, 0);
                        ctx.lineWidth = 2; ctx.strokeStyle = `rgba(136, 136, 255, ${opacity})`;
                        ctx.setLineDash([10, 15]); ctx.stroke(); ctx.setLineDash([]);
                    }
                    ctx.fillStyle = "#226"; ctx.fillRect(-b.r, -10, b.r * 0.4, 20);
                    ctx.fillStyle = "#88f"; ctx.fillRect(-b.r * 0.6, -20, b.r * 0.06, 40);
                    ctx.beginPath(); ctx.moveTo(-b.r * 0.54, -10); ctx.lineTo(b.r - 8, -10); 
                    ctx.lineTo(b.r, 0); ctx.quadraticCurveTo(b.r - 8, 10, -b.r * 0.54, 10); ctx.closePath();
                    ctx.fillStyle = "#fff";
                    if (!options.performanceMode) { ctx.shadowColor = "#88f"; ctx.shadowBlur = 12; }
                    ctx.fill();
                    ctx.restore();
                }
            });
        };

        // ==========================================
        // TIMELINE CONTROLLER
        // ==========================================
        
        // PHASES 1 & 2: Dark Rain & Lasers (0s - 20s)
        if (elapsed < 20000) {
            
            // 1. Dark Rain
            let bulletRadius = 12;
            let bulletSpeed = 2; 
            if (!act.lastRain) act.lastRain = now;
            let bulletsToSpawn = Math.floor(((now - act.lastRain) / 1000) * 2); 
            
            for (let i = 0; i < bulletsToSpawn; i++) {
                info.bullets.push({ name: "ultOrb", boxRender: true, x: Math.random() * info.width, y: -bulletRadius, vx: bulletSpeed, vy: bulletSpeed, r: bulletRadius, draw(b, ctx) { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI); ctx.fillStyle = "#88f"; ctx.fill() } });
                info.bullets.push({ name: "ultOrb", boxRender: true, x: Math.random() * info.width, y: info.height + bulletRadius, vx: bulletSpeed, vy: -bulletSpeed, r: bulletRadius, draw(b, ctx) { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI); ctx.fillStyle = "#88f"; ctx.fill() } });
                info.bullets.push({ name: "ultOrb", boxRender: true, x: info.width + bulletRadius, y: Math.random() * info.height, vx: -bulletSpeed, vy: bulletSpeed, r: bulletRadius, draw(b, ctx) { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI); ctx.fillStyle = "#88f"; ctx.fill() } });
                info.bullets.push({ name: "ultOrb", boxRender: true, x: -bulletRadius, y: Math.random() * info.height, vx: -bulletSpeed, vy: -bulletSpeed, r: bulletRadius, draw(b, ctx) { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI); ctx.fillStyle = "#88f"; ctx.fill() } });
                info.bullets.push({ name: "ultOrb", boxRender: true, x: Math.random() * info.width, y: -bulletRadius, vx: 0, vy: bulletSpeed, r: bulletRadius, draw(b, ctx) { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI); ctx.fillStyle = "#88f"; ctx.fill() } });
                info.bullets.push({ name: "ultOrb", boxRender: true, x: Math.random() * info.width, y: info.height + bulletRadius, vx: 0, vy: -bulletSpeed, r: bulletRadius, draw(b, ctx) { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI); ctx.fillStyle = "#88f"; ctx.fill() } });
                info.bullets.push({ name: "ultOrb", boxRender: true, x: info.width + bulletRadius, y: Math.random() * info.height, vx: -bulletSpeed, vy: 0, r: bulletRadius, draw(b, ctx) { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI); ctx.fillStyle = "#88f"; ctx.fill() } });
                info.bullets.push({ name: "ultOrb", boxRender: true, x: -bulletRadius, y: Math.random() * info.height, vx: bulletSpeed, vy: 0, r: bulletRadius, draw(b, ctx) { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI); ctx.fillStyle = "#88f"; ctx.fill() } });
            }
            if (bulletsToSpawn > 0) act.lastRain = now;

            // 2. Abyssal Lasers
            if (!act.lastLaser || now - act.lastLaser > 1000) {
                spawnRandomLaser();
                act.lastLaser = now;
            }
        }
        
        // PHASE 2 ONLY (10s - 20s): Katanas
        if (elapsed >= 10000 && elapsed < 20000) {
            if (!act.lastKatana || now - act.lastKatana > 1200) {
                spawnUltKatana(); 
                act.lastKatana = now;
            }
        }
        
        // PHASE 3 (20s - 32s): Sans-Style Sequential Circle Lasers
        if (elapsed >= 20000 && elapsed < 32000) {
            // Spawn a new blaster slightly further along the circle every 80ms
            if (!act.lastCircleLaser || now - act.lastCircleLaser > 80) { 
                act.circleAngle = (act.circleAngle || 0) + 0.22; // Rotates perfectly around the arena
                
                let cx = info.width / 2;
                let cy = info.height / 2;
                let R = Math.max(info.width, info.height) * 0.65;
                
                let bx = cx + Math.cos(act.circleAngle) * R;
                let by = cy + Math.sin(act.circleAngle) * R;
                let aimAngle = act.circleAngle + Math.PI; // Aim directly at the center
                
                info.bullets.push({
                    attackType: "circleLaser",
                    name: "knife",
                    boxRender: true,
                    x: bx, y: by, r: 8000, 
                    width: -1000, // Safe while charging
                    targetWidth: 46, // Extremely thick beams
                    angle: aimAngle,
                    vx: 0, vy: 0,
                    spawnTime: now,
                    state: "charging",
                    draw(b, ctx) {
                        let age = Date.now() - b.spawnTime;
                        let charge = 900; // Extremely fast charge to force continuous running
                        let fire = 400;

                        ctx.save();
                        ctx.translate(b.x, b.y);
                        ctx.rotate(b.angle);

                        if (b.state === "charging") {
                            let opacity = Math.min(1, age / charge);
                            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(4000, 0);
                            ctx.lineWidth = 3; ctx.strokeStyle = `rgba(136, 136, 255, ${opacity})`;
                            ctx.setLineDash([10, 15]); ctx.stroke(); ctx.setLineDash([]);
                            
                            ctx.beginPath(); ctx.arc(0, 0, 24 * opacity, 0, Math.PI * 2);
                            ctx.fillStyle = "#88f"; ctx.fill();
                            ctx.beginPath(); ctx.arc(0, 0, 10 * opacity, 0, Math.PI * 2);
                            ctx.fillStyle = "#fff"; ctx.fill();
                            
                        } else if (b.state === "firing") {
                            let prog = (age - charge) / fire;
                            let beamThickness = b.targetWidth * Math.max(0, Math.sin(prog * Math.PI));
                            
                            if (beamThickness > 0) {
                                ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(4000, 0);
                                ctx.lineWidth = beamThickness + 16;
                                ctx.strokeStyle = "rgba(34, 34, 102, 0.9)"; 
                                if (!options.performanceMode) { ctx.shadowColor = "#88f"; ctx.shadowBlur = 25; }
                                ctx.stroke();
                                
                                ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(4000, 0);
                                ctx.lineWidth = beamThickness;
                                ctx.strokeStyle = "#fff"; 
                                if (!options.performanceMode) ctx.shadowBlur = 0;
                                ctx.stroke();
                            }
                        }
                        ctx.restore();
                    }
                });
                act.lastCircleLaser = now;
            }
            
            // Keep the occasional Katana pressure going during the circle attack
            if (!act.lastRadialKatana || now - act.lastRadialKatana > 1500) {
                spawnUltKatana(); 
                act.lastRadialKatana = now;
            }
        }

        // ==========================================
        // PHYSICS & STATE MACHINE UPDATES
        // ==========================================
        for (let b of info.bullets) {
            if (!b.attackType) continue; 
            let age = now - b.spawnTime;

            if (b.attackType === "randomLaser") {
                let chargeTime = 1200;
                let lockDelay = 300;
                let fireTime = 400;

                if (b.state === "charging") {
                    b.angle = Math.atan2(playerLocalY - b.y, playerLocalX - b.x);
                    if (age >= chargeTime - lockDelay) b.state = "locked"; 
                } else if (b.state === "locked") {
                    if (age >= chargeTime) {
                        b.state = "firing";
                        b.width = b.targetWidth; 
                    }
                } else if (b.state === "firing") {
                    let prog = (age - chargeTime) / fireTime;
                    b.width = b.targetWidth * Math.max(0, Math.sin(prog * Math.PI));
                    if (age >= chargeTime + fireTime) b._dead = true;
                }
            } 
            
            else if (b.attackType === "katana") {
                if (b.state === "aiming") {
                    b.angle = Math.atan2(playerLocalY - b.y, playerLocalX - b.x);
                    if (age >= 800) { 
                        b.state = "firing";
                        b.width = b.targetWidth; 
                        let speed = 15;
                        b.vx = Math.cos(b.angle) * speed;
                        b.vy = Math.sin(b.angle) * speed;
                    }
                } else if (b.state === "firing") {
                    let isOffScreen = b.x < -300 || b.x > info.width + 300 || b.y < -300 || b.y > info.height + 300;
                    if (isOffScreen) b._dead = true;
                }
            }

            else if (b.attackType === "circleLaser") {
                let charge = 900;
                let fire = 400;
                if (b.state === "charging" && age >= charge) {
                    b.state = "firing";
                    b.width = b.targetWidth;
                } else if (b.state === "firing") {
                    let prog = (age - charge) / fire;
                    b.width = b.targetWidth * Math.max(0, Math.sin(prog * Math.PI));
                    if (age >= charge + fire) b._dead = true;
                }
            }
            
            else if (b.name === "ultOrb") {
                let isOffScreen = b.x < -100 || b.x > info.width + 100 || b.y < -100 || b.y > info.height + 100;
                if (isOffScreen) b._dead = true;
            }
        }

        info.bullets = info.bullets.filter(b => !b._dead);

        return info;
    }
};

// ============================================================================
// ANICIFFO SUITE: SPRITE CONFIG, SHARED PROJECTILES & ATTACK PATTERNS
// ============================================================================

// ==========================================
// 1. CONFIGURATION & SPRITE PRELOADING
// ==========================================

const BHB_ANICIFFO_FRAMES = [
    new Image(),
    new Image()
];

BHB_ANICIFFO_FRAMES[0].src = "resources/battle/aniciffo1.png";
BHB_ANICIFFO_FRAMES[1].src = "resources/battle/aniciffo2.png";

const BHB_ANICIFFO_CONFIG = {
    flipSpeedMs: 150,        // Milliseconds per animation frame
    defaultWidth: 100,      // Sprite width
    defaultHeight: 100,     // Sprite height
    spriteFacesRight: false  // Base artwork faces left: moving right flips scale to -1
};

// Internal motion trackers for automatic direction resolution
let _aniciffoLastX = null;
let _aniciffoLastTime = 0;
let _aniciffoCurrentFacing = 1;

// ==========================================
// 2. BOSS SPRITE DRAW FUNCTION
// ==========================================

/**
 * Draws Aniciffo with flipbook animation, size controls, and directional flipping.
 */
function BHB_drawAniciffo(
    ctx, 
    x, 
    y, 
    swordAng = 0, 
    phase = 1, 
    customWidth = null, 
    customHeight = null, 
    frameIndex = null,
    facing = "auto",
    drawProceduralSword = false
) {
    phase = phase || 1;

    // Support passing an entity object (e.g. 'b') directly as the second argument
    if (typeof x === "object" && x !== null) {
        const entity = x;
        x = entity.x;
        y = entity.y;
        if ((facing === "auto" || facing === null || facing === undefined) && typeof entity.vx === "number" && Math.abs(entity.vx) > 0.05) {
            facing = entity.vx > 0 ? 1 : -1;
        }
    }

    // 1. Determine active flipbook frame
    let currentFrame;
    if (frameIndex !== null && frameIndex !== undefined) {
        currentFrame = Math.abs(Math.floor(frameIndex)) % 2;
    } else {
        currentFrame = Math.floor(Date.now() / BHB_ANICIFFO_CONFIG.flipSpeedMs) % 2;
    }

    const sprite = BHB_ANICIFFO_FRAMES[currentFrame];
    if (!sprite.complete || sprite.naturalWidth === 0) return;

    // 2. Dimensions
    const drawWidth  = customWidth  || BHB_ANICIFFO_CONFIG.defaultWidth  || sprite.naturalWidth;
    const drawHeight = customHeight || BHB_ANICIFFO_CONFIG.defaultHeight || sprite.naturalHeight;

    // 3. Determine horizontal direction (1 = right, -1 = left)
    let moveDir = null;

    if (typeof facing === "number") {
        moveDir = facing < 0 ? -1 : 1;
    } else if (typeof facing === "string" && facing !== "auto") {
        moveDir = facing.toLowerCase() === "left" ? -1 : 1;
    } else if (typeof facing === "boolean") {
        moveDir = facing ? 1 : -1;
    } else if (typeof facing === "object" && facing !== null) {
        if (typeof facing.vx === "number" && Math.abs(facing.vx) > 0.05) {
            moveDir = facing.vx > 0 ? 1 : -1;
        } else if (typeof facing.facing === "number") {
            moveDir = facing.facing >= 0 ? 1 : -1;
        }
    }

    // Auto-detect direction from movement delta
    if (moveDir === null) {
        const now = Date.now();
        if (_aniciffoLastX !== null && (now - _aniciffoLastTime) < 300) {
            const dx = x - _aniciffoLastX;
            if (Math.abs(dx) >= 0.15 && Math.abs(dx) <= 150) {
                _aniciffoCurrentFacing = dx > 0 ? 1 : -1;
            }
        }
        _aniciffoLastX = x;
        _aniciffoLastTime = now;
        moveDir = _aniciffoCurrentFacing;
    } else {
        _aniciffoCurrentFacing = moveDir;
        _aniciffoLastX = x;
        _aniciffoLastTime = Date.now();
    }

    const horizontalScale = BHB_ANICIFFO_CONFIG.spriteFacesRight ? moveDir : -moveDir;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(horizontalScale, 1);

    // Phase 2 emerald glow
    if (phase === 2) {
        ctx.shadowColor = "#4ade80";
        ctx.shadowBlur = 15;
    }

    ctx.drawImage(sprite, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

    ctx.restore();
}

// ==========================================
// 3. SHARED ANICIFFO PROJECTILES
// ==========================================

const BHB_AniciffoProjectiles = {
    // Helper to find any existing Aniciffo boss in the arena
    getBoss(info) {
        return info.bullets.find(b => b.isAniciffoBoss || b.name === "aniciffoIcon" || b.name === "bossAniciffo");
    },

    // ── A. BOMBS (Grid, Ground, and Air Bombs) ─────────────────────────────
    spawnBomb(info, x, y, vx, vy, options = {}) {
        const fuse = options.fuse ?? 38;
        const b = {
            name: "aniciffoBomb",
            boxRender: true,
            offScreen: true,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            angle: options.angle ?? Math.atan2(vy, vx),
            pinRot: Math.random() * Math.PI * 2,
            r: options.radius ?? 11,
            fuse: fuse,
            maxFuse: fuse,
            detonating: 0,
            maxDetonating: options.maxDetonating ?? 25,
            explosionRadius: options.explosionRadius ?? 80,
            miniBombCount: options.miniBombCount ?? 5,
            miniBombSpeed: options.miniBombSpeed ?? 4,
            gravity: options.gravity ?? 0,
            hitPlayer: false,
            draw(bomb, ctx) {
                BHB_AniciffoProjectiles.drawBomb(bomb, ctx, info);
            }
        };
        info.bullets.push(b);
        return b;
    },

    drawBomb(b, ctx, info) {
        ctx.save();
        ctx.translate(b.x, b.y);
        const fullReach = Math.max(info.width, info.height) * 2;

        if (b.detonating > 0) {
            const beamAlpha = Math.min(1, b.detonating / 8);
            const burstProgress = 1 - (b.detonating / b.maxDetonating);
            const blastRadius = b.explosionRadius || 80;

            ctx.save();
            ctx.rotate(b.angle || 0);

            // Cross-beam flash
            ctx.fillStyle = `rgba(34, 197, 94, ${0.45 * beamAlpha})`;
            ctx.fillRect(-fullReach, -16, fullReach * 2, 32);
            ctx.fillRect(-16, -fullReach, 32, fullReach * 2);

            ctx.fillStyle = `rgba(74, 222, 128, ${0.85 * beamAlpha})`;
            ctx.fillRect(-fullReach, -8, fullReach * 2, 16);
            ctx.fillRect(-8, -fullReach, 16, fullReach * 2);

            ctx.fillStyle = `rgba(255, 255, 255, ${beamAlpha})`;
            ctx.fillRect(-fullReach, -3, fullReach * 2, 6);
            ctx.fillRect(-3, -fullReach, 6, fullReach * 2);

            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * beamAlpha})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 8]);
            ctx.beginPath();
            ctx.moveTo(-fullReach, -10); ctx.lineTo(fullReach, -10);
            ctx.moveTo(-fullReach, 10);  ctx.lineTo(fullReach, 10);
            ctx.moveTo(-10, -fullReach); ctx.lineTo(-10, fullReach);
            ctx.moveTo(10, -fullReach);  ctx.lineTo(10, fullReach);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            // Expanding shockwave ring
            const expandR = burstProgress * blastRadius;
            ctx.beginPath();
            ctx.arc(0, 0, expandR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(134, 239, 172, ${beamAlpha * 0.9})`;
            ctx.lineWidth = 4 * beamAlpha;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, expandR * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * beamAlpha})`;
            ctx.fill();
        } else {
            const prog = 1 - (b.fuse / b.maxFuse);
            const flash = Math.sin(b.fuse * 0.45) > 0 ? 1 : 0.4;

            ctx.save();
            ctx.rotate(b.angle || 0);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.35 + prog * 0.5 * flash})`;
            ctx.lineWidth = 1.5 + prog * 2;
            ctx.setLineDash([12, 8]);
            ctx.beginPath();
            ctx.moveTo(-fullReach, 0); ctx.lineTo(fullReach, 0);
            ctx.moveTo(0, -fullReach); ctx.lineTo(0, fullReach);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            if (b.fuse < 28) {
                ctx.font = "bold 13px monospace";
                ctx.fillStyle = `rgba(255, 70, 70, ${0.6 + prog * 0.4})`;
                ctx.textAlign = "left";
                ctx.fillText("Watch for Bombs", 18, -14);
            }

            ctx.save();
            ctx.rotate(b.pinRot);
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            for (let s = 0; s < 4; s++) {
                let sa = s * Math.PI / 2;
                ctx.moveTo(Math.cos(sa) * 4,  Math.sin(sa) * 4);
                ctx.lineTo(Math.cos(sa) * 12, Math.sin(sa) * 12);
            }
            ctx.stroke();
            ctx.restore();

            ctx.beginPath();
            ctx.arc(0, 4, b.r || 11, 0, Math.PI * 2);
            ctx.fillStyle = "#03160a";
            ctx.fill();
            ctx.strokeStyle = prog > 0.65 ? "#ef4444" : "#4ade80";
            ctx.lineWidth = 2.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 4, 4, 0, Math.PI * 2);
            ctx.fillStyle = prog > 0.65 ? "#ffffff" : "#bbf7d0";
            ctx.fill();
        }
        ctx.restore();
    },

    // ── B. MINI-BOMBS & ISOTOPE ORBS ──────────────────────────────────────
    spawnMiniBomb(info, x, y, vx, vy, r = 6) {
        info.bullets.push({
            name: "aniciffoMiniBomb",
            boxRender: true,
            offScreen: true,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            r: r,
            hitPlayer: false,
            draw(mb, ctx) {
                BHB_AniciffoProjectiles.drawOrb(mb, ctx);
            }
        });
    },

    drawOrb(b, ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = "#03160a";
        ctx.fill();
        ctx.strokeStyle = "#4ade80";
        if (!options.performanceMode) {
            ctx.shadowColor = "#22c55e";
            ctx.shadowBlur = 8;
        }
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(b.x, b.y, Math.max(2, b.r * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = "#86efac";
        ctx.fill();
        ctx.restore();
    },

    // ── C. LASERS (Parallel, Cross, and Sky Lasers) ────────────────────────
    spawnLaser(info, x, y, angle, options = {}) {
        const fuse = options.fuseTicks ?? 48;
        const detonating = options.detonatingTicks ?? 24;
        info.bullets.push({
            name: "knife",
            isAniciffoLaser: true,
            boxRender: true,
            offScreen: true,
            x: x,
            y: y,
            angle: angle,
            r: 8000,
            width: -1000,
            targetWidth: options.beamWidth ?? 16,
            fuse: fuse,
            maxFuse: fuse,
            detonating: 0,
            maxDetonating: detonating,
            pinRot: Math.random() * Math.PI * 2,
            draw(laser, ctx) {
                BHB_AniciffoProjectiles.drawLaser(laser, ctx);
            }
        });
    },

    drawLaser(b, ctx) {
        const reach = 4000;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);

        if (b.detonating > 0) {
            const beamAlpha = Math.min(1, b.detonating / 8);

            ctx.fillStyle = `rgba(34, 197, 94, ${0.45 * beamAlpha})`;
            ctx.fillRect(-reach, -16, reach * 2, 32);

            ctx.fillStyle = `rgba(74, 222, 128, ${0.85 * beamAlpha})`;
            ctx.fillRect(-reach, -8, reach * 2, 16);

            ctx.fillStyle = `rgba(255, 255, 255, ${beamAlpha})`;
            ctx.fillRect(-reach, -3, reach * 2, 6);

            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * beamAlpha})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 8]);
            ctx.beginPath();
            ctx.moveTo(-reach, -10); ctx.lineTo(reach, -10);
            ctx.moveTo(-reach, 10);  ctx.lineTo(reach, 10);
            ctx.stroke();
            ctx.setLineDash([]);
        } else if (b.fuse > 0) {
            const prog = 1 - (b.fuse / b.maxFuse);
            const flash = Math.sin(b.fuse * 0.45) > 0 ? 1 : 0.4;

            ctx.strokeStyle = `rgba(239, 68, 68, ${0.35 + prog * 0.5 * flash})`;
            ctx.lineWidth = 1.5 + prog * 2;
            ctx.setLineDash([12, 8]);
            ctx.beginPath();
            ctx.moveTo(-reach, 0);
            ctx.lineTo(reach, 0);
            ctx.stroke();
            ctx.setLineDash([]);

            if (prog > 0.25) {
                ctx.save();
                if (Math.cos(b.angle) < -0.2) ctx.rotate(Math.PI);
                ctx.font = "bold 13px monospace";
                ctx.fillStyle = `rgba(255, 70, 70, ${0.65 + prog * 0.35})`;
                ctx.textAlign = "left";
                ctx.fillText("Watch for Lasers", 24, -14);
                ctx.restore();
            }
        }
        ctx.restore();
    },

    // ── D. RADIOACTIVE ARROWS (Red, Green, Yellow) ────────────────────────
    spawnArrow(info, x, y, vx, vy, colorType, options = {}) {
        info.bullets.push({
            name: "knife",
            isArrowBullet: true,
            boxRender: true,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            angle: Math.atan2(vy, vx),
            r: 8000,
            width: -1000,
            arrowLength: options.length ?? 72,
            arrowWidth: options.width ?? 12,
            headSize: options.headSize ?? 14,
            arrowSpeed: options.speed ?? Math.hypot(vx, vy),
            colorType: colorType,
            _entered: false,
            _yellowState: colorType === "yellow" ? "approaching" : undefined,
            _orbitAngle: 0,
            _orbitRemaining: Math.PI,
            _orbitRadius: options.orbitRadius ?? 140,
            _orbitSpeed: options.orbitSpeed ?? 0.08,
            draw(arrow, ctx) {
                BHB_AniciffoProjectiles.drawArrow(arrow, ctx);
            }
        });
    },

    drawArrow(b, ctx) {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);

        const isR = b.colorType === "red";
        const isY = b.colorType === "yellow";

        const shaftCol = isR ? "#f43f5e" : isY ? "#facc15" : "#22c55e";
        const tipCol   = isR ? "#fda4af" : isY ? "#fef08a" : "#86efac";
        const glowCol  = isR ? "#e11d48" : isY ? "#eab308" : "#16a34a";

        // Shaft
        const shaftBack = -b.arrowLength * 0.5;
        const shaftFront = b.arrowLength * 0.2;
        const grad = ctx.createLinearGradient(shaftBack, 0, shaftFront, 0);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.3, shaftCol);
        grad.addColorStop(1, "#ffffff");

        ctx.beginPath();
        ctx.moveTo(shaftBack, 0);
        ctx.lineTo(shaftFront, 0);
        ctx.lineWidth = b.arrowWidth;
        ctx.strokeStyle = grad;
        if (!options.performanceMode) {
            ctx.shadowColor = glowCol;
            ctx.shadowBlur = 14;
        }
        ctx.stroke();

        // Arrowhead
        const tipX = b.arrowLength * 0.55;
        const baseBackX = b.arrowLength * 0.12;
        ctx.beginPath();
        ctx.moveTo(tipX, 0);
        ctx.lineTo(baseBackX, -b.headSize);
        ctx.lineTo(baseBackX, b.headSize);
        ctx.closePath();
        ctx.fillStyle = tipCol;
        if (!options.performanceMode) {
            ctx.shadowColor = glowCol;
            ctx.shadowBlur = 18;
        }
        ctx.fill();

        ctx.restore();
    },

    // ── E. ENLARGED CRESCENT SLASH PROJECTILES ────────────────────────────
    spawnSlash(info, x, y, vx, vy, options = {}) {
        info.bullets.push({
            name: "crescentSlash",
            boxRender: true,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            r: options.radius ?? 40,            // Enlarged collision radius
            arcWidth: options.arcWidth ?? 110,   // Enlarged sweep
            draw(sb, ctx) {
                BHB_AniciffoProjectiles.drawSlash(sb, ctx);
            }
        });
    },

    drawSlash(b, ctx) {
        ctx.save();
        ctx.translate(b.x, b.y);

        const arcW = b.arcWidth || 110;
        const r = arcW * 0.55;

        // Outer wide radioactive aura
        ctx.beginPath();
        ctx.arc(0, -r * 0.35, r, 0.12 * Math.PI, 0.88 * Math.PI);
        ctx.lineWidth = 16;
        ctx.strokeStyle = "rgba(34, 197, 94, 0.4)";
        ctx.stroke();

        // Main luminous blade sweep
        ctx.beginPath();
        ctx.arc(0, -r * 0.35, r, 0.16 * Math.PI, 0.84 * Math.PI);
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#86efac";
        if (!options.performanceMode) {
            ctx.shadowColor = "#4ade80";
            ctx.shadowBlur = 18;
        }
        ctx.stroke();

        // Bright white cutting edge
        ctx.beginPath();
        ctx.arc(0, -r * 0.35, r, 0.20 * Math.PI, 0.80 * Math.PI);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        ctx.restore();
    }
};

// ==========================================
// 4. ANICIFFO ATTACK DEFINITIONS
// ==========================================

BHB.aniciffoBomb = {
    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        if (!act.lastTime) act.lastTime = ticks;
        const bombsToSpawn = Math.floor(((ticks - act.lastTime) / 1000) * (act.bombsPerSecond || 1));

        for (let i = 0; i < bombsToSpawn; i++) {
            let x = 60 + Math.random() * (info.width - 120);
            BHB_AniciffoProjectiles.spawnBomb(info, x, -24, 0, act.bombFallSpeed || 4, {
                radius: 24,
                fuse: 9999,
                miniBombCount: act.miniBombCount || 3,
                miniBombSpeed: act.miniBombSpeed || 5
            });
        }
        if (bombsToSpawn > 0) act.lastTime = ticks;

        for (let b of info.bullets) {
            if (b.name === "aniciffoBomb" && !b.exploded && b.y > info.height * 0.7) {
                b.exploded = true;
                b._dead = true;
                for (let j = 0; j < (act.miniBombCount || 3); j++) {
                    let angle = (2 * Math.PI * j) / (act.miniBombCount || 3);
                    BHB_AniciffoProjectiles.spawnMiniBomb(info, b.x, b.y, Math.cos(angle) * (act.miniBombSpeed || 5), Math.sin(angle) * (act.miniBombSpeed || 5), 12);
                }
            }
        }
        return info;
    }
};

BHB.aniciffoBombs = {
    codeFunc(info, id) {
        const act = info.actions[id];
        // Only spawn Aniciffo if not already present from an earlier attack
        if (!BHB_AniciffoProjectiles.getBoss(info)) {
            let cx = act.locX != null ? act.locX : info.boxLeft + info.width / 2;
            let cy = act.locY != null ? act.locY : info.boxTop + Math.max(80, info.height * 0.22);
            info.bullets.push({
                name: "aniciffoIcon",
                isAniciffoBoss: true,
                bossOwner: id, // Claims ownership of boss movement/state
                x: cx,
                y: cy,
                vx: 0,
                vy: 0,
                r: 44,
                swordAng: -0.4,
                draw(b, bossCtx) {
                    BHB_drawAniciffo(bossCtx, b.x, b.y, b.swordAng, 1, 100, 100, null, b.vx);
                }
            });
        }
        return info;
    },

    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        const bombsPerBurst = act.bombsPerBurst ?? 3;
        const burstInterval = act.burstInterval ?? 2200;
        const bombSpeed     = act.bombSpeed     ?? 10;
        const fuseTicks     = act.fuseTicks     ?? 38;
        const miniBombCount = act.miniBombCount ?? 5;
        const miniBombSpeed = act.miniBombSpeed ?? 4;
        const enemySpeed    = act.enemySpeed    ?? 3;

        if (!act.lastTime) act.lastTime = ticks;

        let playerGX = info.boxLeft + info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
        let playerGY = info.boxTop  + info.py + (info.subArena && info.moveWithSub ? info.suby : 0);

        let icon = BHB_AniciffoProjectiles.getBoss(info);

        // Only update Aniciffo's stance and position if this attack owns him
        if (icon && icon.bossOwner === id) {
            let dx = playerGX - icon.x;
            let dy = playerGY - icon.y;
            let dist = Math.hypot(dx, dy) || 1;

            if (dist > 180) {
                icon.vx += (dx / dist) * 0.45;
                icon.vy += (dy / dist) * 0.45;
            } else {
                icon.vx *= 0.82;
                icon.vy *= 0.82;
            }

            let spd = Math.hypot(icon.vx, icon.vy);
            if (spd > enemySpeed) {
                icon.vx = (icon.vx / spd) * enemySpeed;
                icon.vy = (icon.vy / spd) * enemySpeed;
            }

            icon.vx *= 0.90;
            icon.vy *= 0.90;
            icon.x  += icon.vx * (info.dt ?? 1);
            icon.y  += icon.vy * (info.dt ?? 1);

            let timeToBurst = burstInterval - (ticks - act.lastTime);
            icon.swordAng = timeToBurst < 500 ? -1.4 : -0.4 + Math.sin(ticks * 0.003) * 0.25;
        }

        // Drop bombs regardless of boss owner (spawns from current boss position)
        if (ticks - act.lastTime >= burstInterval) {
            act.lastTime = ticks;
            let originX = icon ? icon.x : info.width / 2 + info.boxLeft;
            let originY = icon ? icon.y : info.height / 2 + info.boxTop;
            if (icon && icon.bossOwner === id) icon.swordAng = 1.4;

            let baseAng = Math.atan2(playerGY - originY, playerGX - originX);
            for (let b = 0; b < bombsPerBurst; b++) {
                let spread = bombsPerBurst === 2 ? (b === 0 ? -0.85 : 0.85) : ((b - (bombsPerBurst - 1) / 2) * 0.85);
                let ang = baseAng + spread + (Math.random() - 0.5) * 0.2;
                let spd = bombSpeed + Math.random() * 4;

                BHB_AniciffoProjectiles.spawnBomb(info, originX, originY, Math.cos(ang) * spd, Math.sin(ang) * spd, {
                    fuse: fuseTicks,
                    miniBombCount: miniBombCount,
                    miniBombSpeed: miniBombSpeed
                });
            }
        }

        // Process bombs
        for (let i = info.bullets.length - 1; i >= 0; i--) {
            let b = info.bullets[i];
            if (b.name !== "aniciffoBomb") continue;

            b.x += b.vx * (info.dt ?? 1);
            b.y += b.vy * (info.dt ?? 1);
            b.vx *= 0.92;
            b.vy *= 0.92;
            b.pinRot = (b.pinRot || 0) + 0.25;

            if (b.fuse > 0) {
                b.fuse--;
                if (b.fuse === 0) {
                    b.detonating = b.maxDetonating;
                    for (let j = 0; j < b.miniBombCount; j++) {
                        let ang = (2 * Math.PI * j) / b.miniBombCount;
                        BHB_AniciffoProjectiles.spawnMiniBomb(info, b.x, b.y, Math.cos(ang) * b.miniBombSpeed, Math.sin(ang) * b.miniBombSpeed);
                    }
                }
            } else if (b.detonating > 0) {
                b.detonating--;
                if (!b.hitPlayer) {
                    let relX = (info.boxLeft + info.px) - b.x;
                    let relY = (info.boxTop  + info.py) - b.y;
                    let cosA = Math.cos(b.angle || 0), sinA = Math.sin(b.angle || 0);
                    let perpH = Math.abs(-relX * sinA + relY * cosA);
                    let perpV = Math.abs(relX * cosA + relY * sinA);
                    if (perpH < 10 + info.pr || perpV < 10 + info.pr) {
                        b.hitPlayer = true;
                        if (typeof bhAttack === "function") bhAttack(32, 3, 0, "allPlayer");
                    }
                }
                if (b.detonating <= 0) info.bullets.splice(i, 1);
            }
        }

        // Mini bomb player collision
        for (let b of info.bullets) {
            if (b.name === "aniciffoMiniBomb" && !b.hitPlayer) {
                if (Math.hypot((info.boxLeft + info.px) - b.x, (info.boxTop + info.py) - b.y) < b.r + info.pr) {
                    b.hitPlayer = true;
                    b._dead = true;
                    if (typeof bhAttack === "function") bhAttack(4, 3, 0, "allPlayer");
                }
            }
        }
        return info;
    }
};

BHB.aniciffoDash = {
    // Restored continuous dashing loop until minigame finishes
    codeFunc(info, id) {
        const act = info.actions[id];
        if (!BHB_AniciffoProjectiles.getBoss(info)) {
            let sx = info.boxLeft + Math.random() * info.width;
            let sy = info.boxTop + 54;

            info.bullets.push({
                name: "aniciffoIcon",
                isAniciffoBoss: true,
                bossOwner: id,
                x: sx,
                y: sy,
                vx: 0,
                vy: 0,
                _dvx: 0,
                _dvy: 0,
                r: 44,
                swordAng: -0.4,
                aimAng: 0,
                dashPhase: "telegraph",
                dashSubTimer: act.telegraphTicks ?? 32,
                dashTravelled: 0,
                slashEffect: 0,
                slashHoldTimer: 0,
                slashHit: false,
                slashProjFired: false,
                draw(b, bossCtx) {
                    bossCtx.save();
                    bossCtx.translate(b.x, b.y);

                    if (b.slashEffect > 0) {
                        bossCtx.save();
                        bossCtx.rotate(b.aimAng);
                        bossCtx.beginPath();
                        bossCtx.arc(20, 0, 44 + 130, -1.5, 1.5);
                        bossCtx.strokeStyle = `rgba(34, 197, 94, ${0.45 * b.slashEffect})`;
                        bossCtx.lineWidth = 36 * b.slashEffect;
                        bossCtx.stroke();
                        bossCtx.beginPath();
                        bossCtx.arc(20, 0, 44 + 115, -1.45, 1.45);
                        bossCtx.strokeStyle = `rgba(74, 222, 128, ${b.slashEffect})`;
                        bossCtx.lineWidth = 18 * b.slashEffect;
                        bossCtx.stroke();
                        bossCtx.beginPath();
                        bossCtx.arc(20, 0, 44 + 105, -1.35, 1.35);
                        bossCtx.strokeStyle = `rgba(255, 255, 255, ${b.slashEffect})`;
                        bossCtx.lineWidth = 8 * b.slashEffect;
                        bossCtx.stroke();
                        bossCtx.restore();
                    }

                    if (b.dashPhase === "telegraph") {
                        bossCtx.save();
                        bossCtx.rotate(b.aimAng);
                        bossCtx.beginPath();
                        bossCtx.moveTo(0, 0);
                        bossCtx.lineTo(2400, 0);
                        bossCtx.strokeStyle = "rgba(74, 222, 128, 0.65)";
                        bossCtx.lineWidth = 2.5;
                        bossCtx.setLineDash([10, 6]);
                        bossCtx.stroke();
                        bossCtx.setLineDash([]);
                        bossCtx.restore();
                    }

                    const facing = (b.dashPhase === "telegraph") 
                        ? (Math.cos(b.aimAng) >= 0 ? 1 : -1) 
                        : (b._dvx >= 0 ? 1 : -1);

                    BHB_drawAniciffo(bossCtx, 0, 0, b.swordAng, 1, 100, 100, null, facing);
                    bossCtx.restore();
                }
            });
        }
        return info;
    },

    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        const dt = info.dt ?? 1;

        const dashSpeed      = act.dashSpeed      ?? 18;
        const dashDistance   = act.dashDistance   ?? Infinity;
        const telegraphTicks = act.telegraphTicks ?? 32;
        const slashRange     = act.slashRange     ?? 130;
        const slashDamage    = act.slashDamage    ?? 25;
        const projCount      = act.projCount      ?? 8;
        const projSpeed      = act.projSpeed      ?? 14;

        let playerGX = info.boxLeft + info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
        let playerGY = info.boxTop  + info.py + (info.subArena && info.moveWithSub ? info.suby : 0);

        let icon = BHB_AniciffoProjectiles.getBoss(info);
        if (!icon) return info;

        if (icon.slashEffect > 0) {
            if (icon.slashHoldTimer > 0) {
                icon.slashHoldTimer -= dt;
            } else {
                icon.slashEffect = Math.max(0, icon.slashEffect - 0.10 * dt);
                if (icon.slashEffect === 0) icon.swordAng = -0.4;
            }
        }

        // Only progress the state machine if this action owns the boss
        if (icon.bossOwner === id) {
            if (icon.dashPhase === "telegraph") {
                icon.vx = 0;
                icon.vy = 0;
                icon._dvx = 0;
                icon._dvy = 0;

                let dx = playerGX - icon.x;
                let dy = playerGY - icon.y;
                let diff = Math.atan2(dy, dx) - icon.aimAng;
                while (diff >  Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                icon.aimAng += diff * 0.28 * dt;
                icon.swordAng = -1.4;

                icon.dashSubTimer -= dt;
                if (icon.dashSubTimer <= 0) {
                    let launchAng = icon.aimAng;
                    icon._dvx = Math.cos(launchAng) * dashSpeed;
                    icon._dvy = Math.sin(launchAng) * dashSpeed;
                    icon.dashPhase      = "dashing";
                    icon.dashTravelled  = 0;
                    icon.slashHit       = false;
                    icon.slashProjFired = false;
                }
            } else if (icon.dashPhase === "dashing") {
                icon.vx = 0;
                icon.vy = 0;
                icon.x += icon._dvx * dt;
                icon.y += icon._dvy * dt;
                icon.dashTravelled += Math.hypot(icon._dvx, icon._dvy) * dt;

                let dx = playerGX - icon.x;
                let dy = playerGY - icon.y;
                let dist = Math.hypot(dx, dy) || 1;

                if (dist < slashRange) {
                    icon.slashEffect = 1.0;
                    icon.swordAng    = 1.3;

                    if (!icon.slashHit) {
                        icon.slashHit       = true;
                        icon.slashHoldTimer = 18;
                        if (typeof bhAttack === "function") bhAttack(slashDamage, 3, 0, "allPlayer");
                    }

                    if (!icon.slashProjFired) {
                        icon.slashProjFired = true;
                        let halfCount = Math.floor(projCount / 2);
                        for (let s = -halfCount; s <= halfCount; s++) {
                            let pAng = icon.aimAng + s * 0.32;
                            BHB_AniciffoProjectiles.spawnMiniBomb(
                                info, 
                                icon.x + Math.cos(pAng) * 54, 
                                icon.y + Math.sin(pAng) * 54, 
                                Math.cos(pAng) * projSpeed, 
                                Math.sin(pAng) * projSpeed, 
                                9
                            );
                        }
                    }
                }

                // Continuous loop: snap to edge and immediately restart telegraph
                let offLeft   = icon.x < info.boxLeft - icon.r;
                let offRight  = icon.x > info.boxLeft + info.width  + icon.r;
                let offTop    = icon.y < info.boxTop  - icon.r;
                let offBottom = icon.y > info.boxTop  + info.height + icon.r;

                if (offLeft || offRight || offTop || offBottom || icon.dashTravelled >= dashDistance) {
                    let edge = Math.floor(Math.random() * 4);
                    let margin = 54;
                    if      (edge === 0) { icon.x = info.boxLeft + Math.random() * info.width;  icon.y = info.boxTop + margin; }
                    else if (edge === 1) { icon.x = info.boxLeft + Math.random() * info.width;  icon.y = info.boxTop + info.height - margin; }
                    else if (edge === 2) { icon.x = info.boxLeft + margin;                       icon.y = info.boxTop + Math.random() * info.height; }
                    else                 { icon.x = info.boxLeft + info.width - margin;           icon.y = info.boxTop + Math.random() * info.height; }

                    icon.vx             = 0;
                    icon.vy             = 0;
                    icon._dvx           = 0;
                    icon._dvy           = 0;
                    icon.dashPhase      = "telegraph";
                    icon.dashSubTimer   = telegraphTicks;
                    icon.dashTravelled  = 0;
                    icon.slashHit       = false;
                    icon.slashProjFired = false;
                }
            }
        }

        // Orb player collision
        for (let b of info.bullets) {
            if (b.name !== "aniciffoMiniBomb") continue;
            let px = info.px, py = info.py;
            if (info.subArena && info.moveWithSub) { px += info.subx; py += info.suby; }
            if (!b.hitPlayer && Math.hypot((info.boxLeft + px) - b.x, (info.boxTop + py) - b.y) < b.r + info.pr) {
                b.hitPlayer = true;
                b._dead = true;
                if (typeof bhAttack === "function") bhAttack(slashDamage * 0.6, 3, 0, "allPlayer");
            }
        }

        return info;
    }
};

BHB.aniciffoParallelLasers = {
    codeFunc(info, id) {
        const act = info.actions[id];
        if (!BHB_AniciffoProjectiles.getBoss(info)) {
            let cx = act.locX != null ? act.locX : info.boxLeft + info.width / 2;
            let cy = act.locY != null ? act.locY : info.boxTop + Math.max(80, info.height * 0.22);
            info.bullets.push({
                name: "knife",
                isAniciffoBoss: true,
                bossOwner: id,
                boxRender: true,
                x: cx,
                y: cy,
                vx: 0,
                vy: 0,
                r: 8000,
                width: -1000,
                swordAng: -0.4,
                phase: act.phase ?? 2,
                draw(b, ctx) {
                    BHB_drawAniciffo(ctx, b.x, b.y, b.swordAng, b.phase, 100, 100, null, b.vx);
                }
            });
        }
        return info;
    },

    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        const waveInterval = act.waveInterval ?? 2500;
        const spacing      = act.spacing      ?? 190;
        const columnCount  = act.columnCount  ?? 3;

        if (!act.lastTime) act.lastTime = ticks;

        let boss = BHB_AniciffoProjectiles.getBoss(info);
        if (boss && boss.bossOwner === id) {
            boss.swordAng = (ticks - act.lastTime >= waveInterval - 400) ? -1.4 : -0.4 + Math.sin(ticks * 0.003) * 0.25;
        }

        if (ticks - act.lastTime >= waveInterval) {
            act.lastTime = ticks;
            let waveAngle = act.angleMode === "cardinal" ? (Math.random() < 0.5 ? 0 : Math.PI / 2) : Math.random() * Math.PI;
            let perpAngle = waveAngle + Math.PI / 2;
            let normX = Math.cos(perpAngle), normY = Math.sin(perpAngle);
            let halfCount = Math.floor(columnCount / 2);

            for (let i = -halfCount; i <= halfCount; i++) {
                let distOffset = i * spacing;
                let anchorX = info.px + normX * distOffset;
                let anchorY = info.py + normY * distOffset;
                BHB_AniciffoProjectiles.spawnLaser(info, anchorX, anchorY, waveAngle, {
                    beamWidth: act.beamWidth ?? 16,
                    fuseTicks: act.warningTicks ?? 48,
                    detonatingTicks: act.detonatingTicks ?? 24
                });
            }
        }

        for (let i = info.bullets.length - 1; i >= 0; i--) {
            let b = info.bullets[i];
            if (!b.isAniciffoLaser) continue;
            if (b.fuse > 0) {
                b.fuse--;
                if (b.fuse === 0) {
                    b.detonating = b.maxDetonating;
                    b.width = b.targetWidth;
                }
            } else if (b.detonating > 0) {
                b.detonating--;
                if (b.detonating <= 0) {
                    b._dead = true;
                    info.bullets.splice(i, 1);
                }
            }
        }
        return info;
    }
};

BHB.aniciffoArrowChaos = {
    codeFunc(info, id) {
        if (!BHB_AniciffoProjectiles.getBoss(info)) {
            info.bullets.push({
                name: "knife",
                isAniciffoBoss: true,
                bossOwner: id,
                boxRender: true,
                x: info.width / 2,
                y: 90,
                vx: 0,
                vy: 0,
                r: 8000,
                width: -1000,
                swordAng: -0.4,
                phase: 2,
                draw(b, ctx) {
                    BHB_drawAniciffo(ctx, b.x, b.y, b.swordAng, b.phase, 100, 100, null, b.vx);
                }
            });
        }
        return info;
    },

    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        const arrowPerSec = act.arrowPerSec ?? 2.2;
        const arrowSpeed  = act.arrowSpeed  ?? 4.8;
        const redChance   = act.redChance   ?? 0.33;
        const yellowChance= act.yellowChance?? 0.33;

        if (!act.lastTime) act.lastTime = ticks;
        const arrowsToSpawn = Math.floor(((ticks - act.lastTime) / 1000) * arrowPerSec);

        for (let i = 0; i < arrowsToSpawn; i++) {
            const roll = Math.random();
            const colorType = roll < redChance ? "red" : (roll < redChance + yellowChance ? "yellow" : "green");

            const spawnAngle = Math.random() * Math.PI * 2;
            const spawnDist = Math.max(info.width, info.height) * 0.60 + 80;
            const spawnX = (info.width / 2) + Math.cos(spawnAngle) * spawnDist;
            const spawnY = (info.height / 2) + Math.sin(spawnAngle) * spawnDist;

            const aimAngle = Math.atan2(info.py - spawnY, info.px - spawnX);
            BHB_AniciffoProjectiles.spawnArrow(info, spawnX, spawnY, Math.cos(aimAngle) * arrowSpeed, Math.sin(aimAngle) * arrowSpeed, colorType, {
                speed: arrowSpeed
            });
        }
        if (arrowsToSpawn > 0) act.lastTime = ticks;

        // Arrow mechanics & collision
        for (let i = info.bullets.length - 1; i >= 0; i--) {
            let b = info.bullets[i];
            if (!b.isArrowBullet) continue;

            if (b.x >= 0 && b.x <= info.width && b.y >= 0 && b.y <= info.height) b._entered = true;

            if (b.colorType === "yellow") {
                const dist = Math.hypot(info.px - b.x, info.py - b.y);
                if (b._yellowState === "approaching" && dist <= b._orbitRadius) {
                    b._yellowState = "orbiting";
                    b._orbitAngle = Math.atan2(b.y - info.py, b.x - info.px);
                    b._orbitRemaining = Math.PI;
                    b.vx = 0; b.vy = 0;
                } else if (b._yellowState === "orbiting") {
                    b._orbitAngle += b._orbitSpeed * (info.dt ?? 1);
                    b._orbitRemaining -= b._orbitSpeed * (info.dt ?? 1);
                    b.x = info.px + Math.cos(b._orbitAngle) * b._orbitRadius;
                    b.y = info.py + Math.sin(b._orbitAngle) * b._orbitRadius;
                    b.angle = b._orbitAngle + Math.PI / 2;

                    if (b._orbitRemaining <= 0) {
                        b._yellowState = "striking";
                        let strike = Math.atan2(info.py - b.y, info.px - b.x);
                        b.vx = Math.cos(strike) * (b.arrowSpeed * 1.25);
                        b.vy = Math.sin(strike) * (b.arrowSpeed * 1.25);
                        b.angle = strike;
                    }
                }
            }

            const dist = Math.hypot(info.px - b.x, info.py - b.y);
            const isHit = dist <= (info.pr + b.headSize * 0.85);

            if (b.colorType === "red") {
                if (isHit) {
                    b._dead = true;
                } else if (b._entered && (b.x < -40 || b.x > info.width + 40 || b.y < -40 || b.y > info.height + 40)) {
                    b._dead = true;
                    if (typeof bhAttack === "function") bhAttack(40, 3, 0, "randomPlayer");
                }
            } else if (isHit && (b.colorType === "green" || b._yellowState === "striking")) {
                b._dead = true;
                if (typeof bhAttack === "function") bhAttack(40, 3, 0, "randomPlayer");
            }
        }
        return info;
    }
};

BHB.aniciffoBombDash = {
    // Restored original alternating state machine: bombing -> telegraph -> dashing -> rest
    codeFunc(info, id) {
        const act = info.actions[id];
        if (!BHB_AniciffoProjectiles.getBoss(info)) {
            let cx = act.locX != null ? act.locX : info.boxLeft + info.width / 2;
            let cy = act.locY != null ? act.locY : info.boxTop + Math.max(80, info.height * 0.22);

            info.bullets.push({
                name: "aniciffoIcon",
                isAniciffoBoss: true,
                bossOwner: id,
                x: cx,
                y: cy,
                vx: 0,
                vy: 0,
                _dvx: 0,
                _dvy: 0,
                r: 44,
                swordAng: -0.4,
                aimAng: 0,
                phase: act.phase ?? 1,

                subState: "bombing",
                subTimer: act.bombWindupTicks ?? 70,
                slashEffect: 0,
                slashHoldTimer: 0,
                slashHit: false,
                slashProjFired: false,
                dashTravelled: 0,

                draw(b, bossCtx) {
                    bossCtx.save();
                    bossCtx.translate(b.x, b.y);

                    if (b.slashEffect > 0) {
                        bossCtx.save();
                        bossCtx.rotate(b.aimAng);
                        bossCtx.beginPath();
                        bossCtx.arc(15, 0, 44 + 90, -1.45, 1.45);
                        bossCtx.strokeStyle = `rgba(74, 222, 128, ${0.45 * b.slashEffect})`;
                        bossCtx.lineWidth = 28 * b.slashEffect;
                        bossCtx.stroke();
                        bossCtx.beginPath();
                        bossCtx.arc(15, 0, 44 + 90, -1.45, 1.45);
                        bossCtx.strokeStyle = `rgba(74, 222, 128, ${b.slashEffect})`;
                        bossCtx.lineWidth = 14 * b.slashEffect;
                        bossCtx.stroke();
                        bossCtx.beginPath();
                        bossCtx.arc(15, 0, 44 + 84, -1.35, 1.35);
                        bossCtx.strokeStyle = `rgba(255, 255, 255, ${b.slashEffect})`;
                        bossCtx.lineWidth = 6 * b.slashEffect;
                        bossCtx.stroke();
                        bossCtx.restore();
                    }

                    if (b.subState === "telegraph") {
                        bossCtx.save();
                        bossCtx.rotate(b.aimAng);
                        bossCtx.beginPath();
                        bossCtx.moveTo(0, 0);
                        bossCtx.lineTo(1800, 0);
                        bossCtx.strokeStyle = "rgba(74, 222, 128, 0.65)";
                        bossCtx.lineWidth = 2.5;
                        bossCtx.setLineDash([10, 6]);
                        bossCtx.stroke();
                        bossCtx.setLineDash([]);
                        bossCtx.restore();
                    }

                    const facing = (b.subState === "telegraph") 
                        ? (Math.cos(b.aimAng) >= 0 ? 1 : -1) 
                        : (b._dvx !== 0 ? (b._dvx > 0 ? 1 : -1) : b.vx);

                    BHB_drawAniciffo(bossCtx, 0, 0, b.swordAng, b.phase || 1, 100, 100, null, facing);
                    bossCtx.restore();
                }
            });
        }
        return info;
    },

    moveFunc(info, ticks, id) {
        const act = info.actions[id];

        const bombsPerBurst = act.bombsPerBurst ?? 3;
        const bombSpeed     = act.bombSpeed     ?? 10;
        const fuseTicks     = act.fuseTicks     ?? 38;
        const miniBombCount = act.miniBombCount ?? 5;
        const miniBombSpeed = act.miniBombSpeed ?? 4;
        const enemySpeed    = act.enemySpeed    ?? 3;
        const preferredDist = act.preferredDist ?? 180;

        const dashSpeed      = act.dashSpeed      ?? 20;
        const telegraphTicks = act.telegraphTicks ?? 36;
        const slashRange     = act.slashRange     ?? 130;
        const slashDamage    = act.slashDamage    ?? 24;
        const projCount      = act.projCount      ?? 6;
        const projSpeed      = act.projSpeed      ?? 12;

        if (!act.lastTime) act.lastTime = ticks;

        let playerGX = info.boxLeft + info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
        let playerGY = info.boxTop  + info.py + (info.subArena && info.moveWithSub ? info.suby : 0);

        let icon = BHB_AniciffoProjectiles.getBoss(info);
        if (!icon) return info;

        if (icon.slashEffect > 0) {
            if (icon.slashHoldTimer > 0) {
                icon.slashHoldTimer--;
            } else {
                icon.slashEffect = Math.max(0, icon.slashEffect - 0.10);
                if (icon.slashEffect === 0 && icon.subState !== "telegraph") {
                    icon.swordAng = -0.4;
                }
            }
        }

        // Only manage alternating cycle if this action owns the boss
        if (icon.bossOwner === id) {
            icon.subTimer--;

            if (icon.subState === "bombing") {
                let dx   = playerGX - icon.x;
                let dy   = playerGY - icon.y;
                let dist = Math.hypot(dx, dy) || 1;

                if (dist > preferredDist) {
                    icon.vx += (dx / dist) * 0.45;
                    icon.vy += (dy / dist) * 0.45;
                } else {
                    icon.vx *= 0.82;
                    icon.vy *= 0.82;
                }

                let spd = Math.hypot(icon.vx, icon.vy);
                if (spd > enemySpeed) {
                    icon.vx = (icon.vx / spd) * enemySpeed;
                    icon.vy = (icon.vy / spd) * enemySpeed;
                }

                icon.vx *= 0.90;
                icon.vy *= 0.90;
                icon.x  += icon.vx * (info.dt ?? 1);
                icon.y  += icon.vy * (info.dt ?? 1);

                icon.swordAng = icon.subTimer < 25 ? -1.4 : -0.4 + Math.sin(ticks * 0.003) * 0.25;

                let margin = icon.r + 10;
                let boxL = info.boxLeft + margin;
                let boxR = info.boxLeft + info.width  - margin;
                let boxT = info.boxTop  + margin;
                let boxB = info.boxTop  + info.height - margin;
                if (icon.x < boxL) { icon.x = boxL; icon.vx =  Math.abs(icon.vx); }
                if (icon.x > boxR) { icon.x = boxR; icon.vx = -Math.abs(icon.vx); }
                if (icon.y < boxT) { icon.y = boxT; icon.vy =  Math.abs(icon.vy); }
                if (icon.y > boxB) { icon.y = boxB; icon.vy = -Math.abs(icon.vy); }

                // Fire bombs when bombing timer elapses
                if (icon.subTimer <= 0) {
                    icon.swordAng = 1.4;
                    let baseAng = Math.atan2(playerGY - icon.y, playerGX - icon.x);

                    for (let b = 0; b < bombsPerBurst; b++) {
                        let spread = bombsPerBurst === 2 ? (b === 0 ? -0.85 : 0.85) : ((b - (bombsPerBurst - 1) / 2) * 0.85);
                        let ang = baseAng + spread + (Math.random() - 0.5) * 0.2;
                        let spd = bombSpeed + Math.random() * 4;

                        BHB_AniciffoProjectiles.spawnBomb(info, icon.x, icon.y, Math.cos(ang) * spd, Math.sin(ang) * spd, {
                            fuse: fuseTicks,
                            miniBombCount: miniBombCount,
                            miniBombSpeed: miniBombSpeed
                        });
                    }

                    icon.subState = "telegraph";
                    icon.subTimer = telegraphTicks;
                    icon.vx = 0;
                    icon.vy = 0;
                }
            } else if (icon.subState === "telegraph") {
                icon.vx = 0;
                icon.vy = 0;
                icon._dvx = 0;
                icon._dvy = 0;
                icon.swordAng = -1.4;

                let dx = playerGX - icon.x;
                let dy = playerGY - icon.y;
                let diff = Math.atan2(dy, dx) - icon.aimAng;
                while (diff >  Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                icon.aimAng += diff * 0.28;

                if (icon.subTimer <= 0) {
                    let launchAng = icon.aimAng + (Math.random() - 0.5) * 0.15;
                    icon._dvx = Math.cos(launchAng) * dashSpeed;
                    icon._dvy = Math.sin(launchAng) * dashSpeed;
                    icon.subState = "dashing";
                    icon.dashTravelled = 0;
                    icon.slashHit = false;
                    icon.slashProjFired = false;
                }
            } else if (icon.subState === "dashing") {
                icon.vx = 0;
                icon.vy = 0;
                icon.x += icon._dvx * (info.dt ?? 1);
                icon.y += icon._dvy * (info.dt ?? 1);
                icon.dashTravelled += Math.hypot(icon._dvx, icon._dvy) * (info.dt ?? 1);

                let dx   = playerGX - icon.x;
                let dy   = playerGY - icon.y;
                let dist = Math.hypot(dx, dy) || 1;

                if (dist < slashRange) {
                    icon.slashEffect = 1.0;
                    icon.swordAng    = 1.3;

                    if (!icon.slashHit) {
                        icon.slashHit = true;
                        icon.slashHoldTimer = 18;
                        if (typeof bhAttack === "function") bhAttack(slashDamage, 3, 0, "allPlayer");
                    }

                    if (!icon.slashProjFired) {
                        icon.slashProjFired = true;
                        let halfCount = Math.floor(projCount / 2);
                        for (let s = -halfCount; s <= halfCount; s++) {
                            let pAng = icon.aimAng + s * 0.32;
                            BHB_AniciffoProjectiles.spawnMiniBomb(info, icon.x + Math.cos(pAng) * 54, icon.y + Math.sin(pAng) * 54, Math.cos(pAng) * projSpeed, Math.sin(pAng) * projSpeed, 9);
                        }
                    }
                }

                let offLeft   = icon.x < info.boxLeft + icon.r;
                let offRight  = icon.x > info.boxLeft + info.width  - icon.r;
                let offTop    = icon.y < info.boxTop   + icon.r;
                let offBottom = icon.y > info.boxTop   + info.height - icon.r;

                if (offLeft || offRight || offTop || offBottom || icon.dashTravelled >= Math.max(info.width, info.height) * 1.2) {
                    icon.subState = "rest";
                    icon.subTimer = act.restTicks ?? 32;
                    icon._dvx = 0;
                    icon._dvy = 0;
                }
            } else if (icon.subState === "rest") {
                icon.vx = 0;
                icon.vy = 0;
                icon.swordAng = -0.4;

                if (icon.subTimer <= 0) {
                    icon.subState = "bombing";
                    icon.subTimer = act.bombIntervalTicks ?? 85;
                }
            }
        }

        // Bomb processing
        for (let i = info.bullets.length - 1; i >= 0; i--) {
            let b = info.bullets[i];
            if (b.name !== "aniciffoBomb") continue;

            b.x += b.vx * (info.dt ?? 1);
            b.y += b.vy * (info.dt ?? 1);
            b.vx *= 0.92;
            b.vy *= 0.92;
            b.pinRot = (b.pinRot || 0) + 0.25;

            if (b.fuse > 0) {
                b.fuse--;
                if (b.fuse === 0) {
                    b.detonating = b.maxDetonating;
                    b.hitPlayer = false;

                    for (let j = 0; j < miniBombCount; j++) {
                        let ang = (2 * Math.PI * j) / miniBombCount;
                        BHB_AniciffoProjectiles.spawnMiniBomb(info, b.x, b.y, Math.cos(ang) * miniBombSpeed, Math.sin(ang) * miniBombSpeed);
                    }
                }
            } else if (b.detonating > 0) {
                b.detonating--;

                if (!b.hitPlayer) {
                    let px = info.px, py = info.py;
                    if (info.subArena && info.moveWithSub) { px += info.subx; py += info.suby; }

                    let relX = (info.boxLeft + px) - b.x;
                    let relY = (info.boxTop  + py) - b.y;
                    let distToBomb = Math.hypot(relX, relY);
                    let maxReach = Math.max(info.width, info.height) * 1.5;

                    if (distToBomb <= maxReach) {
                        let cosA = Math.cos(b.angle || 0), sinA = Math.sin(b.angle || 0);
                        let perpH = Math.abs(-relX * sinA + relY * cosA);
                        let perpV = Math.abs(relX * cosA + relY * sinA);
                        let beamHalfWidth = 10 + info.pr;

                        if (perpH < beamHalfWidth || perpV < beamHalfWidth) {
                            b.hitPlayer = true;
                            if (typeof bhAttack === "function") bhAttack(32, 3, 0, "allPlayer");
                        }
                    }
                }

                if (b.detonating <= 0) info.bullets.splice(i, 1);
            }
        }

        // Contact damage checks
        for (let i = info.bullets.length - 1; i >= 0; i--) {
            let b = info.bullets[i];
            let px = info.px, py = info.py;
            if (info.subArena && info.moveWithSub) { px += info.subx; py += info.suby; }

            if (b.name === "aniciffoMiniBomb") {
                if (Math.hypot((info.boxLeft + px) - b.x, (info.boxTop + py) - b.y) < b.r + info.pr) {
                    if (typeof bhAttack === "function") bhAttack(4, 3, 0, "allPlayer");
                    info.bullets.splice(i, 1);
                }
            } else if (b.name === "aniciffoOrb") {
                if (!b.hitPlayer && Math.hypot((info.boxLeft + px) - b.x, (info.boxTop + py) - b.y) < b.r + info.pr) {
                    b.hitPlayer = true;
                    if (typeof bhAttack === "function") bhAttack(slashDamage * 0.6, 3, 0, "allPlayer");
                    info.bullets.splice(i, 1);
                }
            }
        }

        return info;
    }
};

BHB.aniciffoAirRaid = {
    // Shared projectiles + hovering Aniciffo bomb patrol
    codeFunc(info, id) {
        const act = info.actions[id];
        act.bombInterval  = act.bombInterval || 1400;
        act.arrowPerSec   = act.arrowPerSec || 3.5;
        act.slashPerSec   = act.slashPerSec || 1.8;
        act.laserInterval = act.laserInterval || 1600;
        act.bossSpeed     = act.bossSpeed || 4;
        act.phase         = act.phase || 1;
        act.redChance     = act.redChance ?? 0.25;
        act.yellowChance  = act.yellowChance ?? 0.25;

        act._bombTimer = 400;
        act._laserTimer = 0;
        act._arrowAcc = 0;
        act._slashAcc = 0;

        if (!BHB_AniciffoProjectiles.getBoss(info)) {
            info.bullets.push({
                name: "bossAniciffo",
                isAniciffoBoss: true,
                bossOwner: id,
                boxRender: true,
                x: info.width / 2,
                y: 70,
                vx: act.bossSpeed,
                vy: 0,
                r: 44,
                phase: act.phase,
                swordAng: -0.4,
                hoverAnim: 0,
                throwAnim: 0,
                draw(b, ctx) {
                    const facing = b.vx >= 0 ? 1 : -1;
                    const bobY = b.y + Math.sin(b.hoverAnim) * 5;

                    if (b.throwAnim > 0) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(b.x, bobY, b.r + 14, 0, Math.PI * 2);
                        ctx.fillStyle = b.phase === 2 ? "rgba(134, 239, 172, 0.3)" : "rgba(74, 222, 128, 0.25)";
                        if (!options.performanceMode) {
                            ctx.shadowColor = "#4ade80";
                            ctx.shadowBlur = 16;
                        }
                        ctx.fill();
                        ctx.restore();
                    }

                    BHB_drawAniciffo(ctx, b.x, bobY, b.swordAng, b.phase, 100, 100, null, facing, true);
                }
            });
        }
        return info;
    },

    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        const dt = info.dt || 1;
        const dtMs = info.dtMs || 16.67;

        let b = BHB_AniciffoProjectiles.getBoss(info);

        // 1. Boss Patrol (only updated if this action owns Aniciffo)
        if (b && b.bossOwner === id) {
            b.hoverAnim += 0.06 * dt;
            b.x += b.vx * dt;

            const margin = 70;
            if (b.x < margin) { b.x = margin; b.vx = Math.abs(b.vx); }
            else if (b.x > info.width - margin) { b.x = info.width - margin; b.vx = -Math.abs(b.vx); }

            if (b.throwAnim > 0) { b.throwAnim -= dtMs; b.swordAng = -1.2; }
            else { b.swordAng = -0.4; }

            act._bombTimer = (act._bombTimer || 0) + dtMs;
            if (act._bombTimer >= act.bombInterval) {
                act._bombTimer %= act.bombInterval;
                b.throwAnim = 260;
                BHB_AniciffoProjectiles.spawnBomb(info, b.x, b.y + 25, b.vx * 0.35 + (Math.random() - 0.5) * 1.5, 2.2, {
                    radius: 16,
                    fuse: 80,
                    gravity: 0.14
                });
            }
        }

        // 2. Shared Raining Arrows
        act._arrowAcc = (act._arrowAcc || 0) + (dtMs / 1000) * act.arrowPerSec;
        const arrowsToSpawn = Math.floor(act._arrowAcc);
        if (arrowsToSpawn > 0) act._arrowAcc -= arrowsToSpawn;

        for (let i = 0; i < arrowsToSpawn; i++) {
            const rx = 30 + Math.random() * (info.width - 60);
            const roll = Math.random();
            const colorType = roll < (act.yellowChance ?? 0.25) ? "yellow" : (roll < (act.yellowChance ?? 0.25) + (act.redChance ?? 0.25) ? "red" : "green");
            const vy = 5.6 + Math.random() * 2.0;
            const vx = (Math.random() - 0.5) * 1.6;

            BHB_AniciffoProjectiles.spawnArrow(info, rx, -30, vx, vy, colorType, {
                speed: vy,
                orbitRadius: 110,
                orbitSpeed: 0.065
            });
        }

        // 3. Shared Enlarged Crescent Slashes
        act._slashAcc = (act._slashAcc || 0) + (dtMs / 1000) * act.slashPerSec;
        const slashesToSpawn = Math.floor(act._slashAcc);
        if (slashesToSpawn > 0) act._slashAcc -= slashesToSpawn;

        for (let i = 0; i < slashesToSpawn; i++) {
            const sx = 40 + Math.random() * (info.width - 80);
            BHB_AniciffoProjectiles.spawnSlash(info, sx, -35, (Math.random() - 0.5) * 1.2, 4.5 + Math.random() * 1.5);
        }

        // 4. Shared Sky Lasers
        act._laserTimer = (act._laserTimer || 0) + dtMs;
        if (act._laserTimer >= act.laserInterval) {
            act._laserTimer %= act.laserInterval;
            const lx = 50 + Math.random() * (info.width - 100);
            BHB_AniciffoProjectiles.spawnLaser(info, lx, 0, Math.PI / 2, {
                beamWidth: 26,
                fuseTicks: 45,
                detonatingTicks: 24
            });
        }

        // 5. Update Bomb Gravity & Ground Detonation
        for (let i = info.bullets.length - 1; i >= 0; i--) {
            let bomb = info.bullets[i];
            if (bomb.name === "aniciffoBomb" && bomb.gravity) {
                bomb.vy += bomb.gravity * dt;
                if (bomb.y >= info.height - 35 && bomb.detonating <= 0) {
                    bomb.detonating = bomb.maxDetonating;
                    bomb.vx = 0; bomb.vy = 0;
                    for (let k = 0; k < 4; k++) {
                        let orbAng = -Math.PI * 0.15 - (k * Math.PI * 0.7) / 3;
                        BHB_AniciffoProjectiles.spawnMiniBomb(info, bomb.x, bomb.y - 10, Math.cos(orbAng) * 4.8, Math.sin(orbAng) * 4.8, 9);
                    }
                }
            }
        }

        // Delegate arrow mechanics to the shared arrow handler
        return BHB.aniciffoArrowChaos.moveFunc(info, ticks, id);
    }
};

function bulletHellAniciffoArrows(actionValues = {}, values = {}, exitAction = () => {}) {
    return bulletHell({
        "aniciffoArrowChaos": actionValues
    }, values, exitAction);
}

BHB.aniciffoUltimate = {
    // ============================================================================
    // ANICIFFO ULTIMATE: 50-SECOND PURE RED SOUL ENCOUNTER
    //   • Stage 1 (0s - 12.5s):    Perimeter orbit + aimed lasers at player
    //   • Stage 2 (12.5s - 25s):   Targeted vertical bomb rain
    //   • Stage 3 (25s - 37.5s):   Rapid-succession dash-slashes
    //   • Stage 4 (37.5s - 50s):   Overdrive Phase 2 - Mass bomb throw (No slashes)
    //   • Continuous (0s - 50s):   Tri-color radioactive arrows
    // ============================================================================

    codeFunc(info, id) {
        const act = info.actions[id];
        act.startTime = Date.now();
        info.greenMode = false;

        act._laserTimer = 0;
        act._bombRainAcc = 0;
        act._bombThrowTimer = 0;
        act._arrowAcc = 0;
        act._stage4Cleaned = false;

        if (!BHB_AniciffoProjectiles.getBoss(info)) {
            info.bullets.push({
                name: "knife",
                isAniciffoBoss: true,
                bossOwner: id,
                boxRender: true,
                x: info.width / 2,
                y: 80,
                vx: 0,
                vy: 0,
                _dvx: 0,
                _dvy: 0,
                r: 8000,
                width: -1000,
                phase: 1,
                swordAng: -0.4,
                aimAng: 0,
                hoverAnim: 0,
                throwAnim: 0,
                dashPhase: "hover",
                dashTimer: 0,
                slashEffect: 0,
                slashHoldTimer: 0,
                slashHit: false,
                draw(b, ctx) {
                    ctx.save();
                    const bobY = b.y + (b.dashPhase === "hover" ? Math.sin(b.hoverAnim) * 5 : 0);

                    // Colossal Slash Arc (Only renders while slashEffect is active in Stage 3)
                    if (b.slashEffect > 0) {
                        ctx.save();
                        ctx.translate(b.x, bobY);
                        ctx.rotate(b.aimAng);
                        ctx.beginPath();
                        ctx.arc(20, 0, 44 + 130, -1.5, 1.5);
                        ctx.strokeStyle = `rgba(34, 197, 94, ${0.45 * b.slashEffect})`;
                        ctx.lineWidth = 36 * b.slashEffect;
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.arc(20, 0, 44 + 115, -1.45, 1.45);
                        ctx.strokeStyle = `rgba(74, 222, 128, ${b.slashEffect})`;
                        ctx.lineWidth = 18 * b.slashEffect;
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.arc(20, 0, 44 + 105, -1.35, 1.35);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${b.slashEffect})`;
                        ctx.lineWidth = 8 * b.slashEffect;
                        ctx.stroke();
                        ctx.restore();
                    }

                    // Dash Aim Telegraph
                    if (b.dashPhase === "telegraph") {
                        ctx.save();
                        ctx.translate(b.x, bobY);
                        ctx.rotate(b.aimAng);
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(2400, 0);
                        ctx.strokeStyle = b.phase === 2 ? "rgba(134, 239, 172, 0.85)" : "rgba(74, 222, 128, 0.65)";
                        ctx.lineWidth = 3;
                        ctx.setLineDash([10, 6]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.restore();
                    }

                    // Aura
                    if (b.throwAnim > 0 || b.phase === 2) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(b.x, bobY, 44 + 18, 0, Math.PI * 2);
                        ctx.fillStyle = b.phase === 2 ? "rgba(134, 239, 172, 0.35)" : "rgba(74, 222, 128, 0.25)";
                        if (!options.performanceMode) {
                            ctx.shadowColor = "#4ade80";
                            ctx.shadowBlur = 16;
                        }
                        ctx.fill();
                        ctx.restore();
                    }

                    const facing = (b.dashPhase === "telegraph")
                        ? (Math.cos(b.aimAng) >= 0 ? 1 : -1)
                        : (b._dvx !== 0 ? (b._dvx > 0 ? 1 : -1) : (b.vx >= 0 ? 1 : -1));

                    BHB_drawAniciffo(ctx, b.x, bobY, b.swordAng, b.phase, 100, 100, null, facing, true);
                    ctx.restore();
                }
            });
        }
        return info;
    },

    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        const dt = info.dt || 1;
        const dtMs = info.dtMs || 16.67;
        const elapsed = Date.now() - act.startTime;

        const boss = BHB_AniciffoProjectiles.getBoss(info);
        const px = info.px + (info.subArena && info.moveWithSub ? info.subx : 0);
        const py = info.py + (info.subArena && info.moveWithSub ? info.suby : 0);

        info.greenMode = false;

        // ====================================================================
        // CONTINUOUS HAZARD: ARROWS (0s - 50s)
        // ====================================================================
        act._arrowAcc = (act._arrowAcc || 0) + (dtMs / 1000) * (elapsed >= 37500 ? 3.4 : 2.6);
        const arrowsToSpawn = Math.floor(act._arrowAcc);
        if (arrowsToSpawn > 0) act._arrowAcc -= arrowsToSpawn;

        for (let i = 0; i < arrowsToSpawn; i++) {
            const roll = Math.random();
            const colorType = roll < 0.02 ? "red" : (roll < 0.3 ? "yellow" : "green");
            const spawnAngle = Math.random() * Math.PI * 2;
            const spawnDist = Math.max(info.width, info.height) * 0.60 + 80;
            const sx = info.width / 2 + Math.cos(spawnAngle) * spawnDist;
            const sy = info.height / 2 + Math.sin(spawnAngle) * spawnDist;
            const aim = Math.atan2(py - sy, px - sx);
            const spd = 7.2 + Math.random() * 1.8;

            BHB_AniciffoProjectiles.spawnArrow(info, sx, sy, Math.cos(aim) * spd, Math.sin(aim) * spd, colorType, {
                speed: spd,
                orbitRadius: 115,
                orbitSpeed: 0.08
            });
        }

        // ====================================================================
        // STAGE TIMELINE
        // ====================================================================

        // ── STAGE 1 (0s - 12.5s): Circle Perimeter Orbit + Aimed Lasers ─────
        if (elapsed < 12500) {
            if (boss && boss.bossOwner === id) {
                boss.dashPhase = "hover";
                boss.hoverAnim += 0.06 * dt;

                const orbitRx = Math.max(120, (info.width / 2) - 85);
                const orbitRy = Math.max(90, (info.height / 2) - 75);
                const orbitAngle = elapsed * 0.0018;

                const nextX = (info.width / 2) + Math.cos(orbitAngle) * orbitRx;
                const nextY = (info.height / 2) + Math.sin(orbitAngle) * orbitRy;

                boss.vx = nextX - boss.x;
                boss.vy = nextY - boss.y;
                boss.x = nextX;
                boss.y = nextY;

                act._laserTimer = (act._laserTimer || 0) + dtMs;
                if (act._laserTimer >= 300) {
                    act._laserTimer = 0;
                    boss.throwAnim = 220;
                    boss.swordAng = 1.35;

                    const aimAtPlayer = Math.atan2(py - boss.y, px - boss.x);
                    BHB_AniciffoProjectiles.spawnLaser(info, boss.x, boss.y, aimAtPlayer, {
                        beamWidth: 20,
                        fuseTicks: 18,
                        detonatingTicks: 12
                    });
                } else if (boss.throwAnim <= 0) {
                    boss.swordAng = -0.4;
                }
                if (boss.throwAnim > 0) boss.throwAnim -= dtMs;
            }
        }

        // ── STAGE 2 (12.5s - 25s): High-Density Bomb Rain from Above ─────────
        else if (elapsed >= 12500 && elapsed < 25000) {
            if (boss && boss.bossOwner === id) {
                boss.dashPhase = "hover";
                boss.hoverAnim += 0.05 * dt;

                boss.x += (info.width / 2 + Math.sin(elapsed * 0.0025) * (info.width * 0.38) - boss.x) * 0.08 * dt;
                boss.y += (70 - boss.y) * 0.08 * dt;
                boss.swordAng = -1.2;
                boss.vx = 0;
                boss.vy = 0;
            }

            act._bombRainAcc = (act._bombRainAcc || 0) + (dtMs / 1000) * 4.2;
            const bombsToRain = Math.floor(act._bombRainAcc);
            if (bombsToRain > 0) act._bombRainAcc -= bombsToRain;

            for (let i = 0; i < bombsToRain; i++) {
                const dropX = Math.random() < 0.65
                    ? px + (Math.random() - 0.5) * 220
                    : 40 + Math.random() * (info.width - 80);

                const boundedX = Math.max(30, Math.min(info.width - 30, dropX));
                const vy = 2.5 + Math.random() * 2.5;
                const vx = (Math.random() - 0.5) * 1.5;

                BHB_AniciffoProjectiles.spawnBomb(info, boundedX, 0, vx, vy, {
                    radius: 14,
                    fuse: 120,
                    gravity: 0.1,
                    miniBombCount: 6,
                    miniBombSpeed: 6.5
                });
            }
        }

        // ── STAGE 3 (25s - 37.5s): Rapid-Succession Dashes & Slashes ─────────
        else if (elapsed >= 25000 && elapsed < 37500) {
            if (boss && boss.bossOwner === id) {
                if (boss.dashPhase === "hover") {
                    boss.dashPhase = "telegraph";
                    boss.dashTimer = 16;
                }

                if (boss.dashPhase === "telegraph") {
                    boss.vx = 0; boss.vy = 0; boss._dvx = 0; boss._dvy = 0;
                    const dx = px - boss.x, dy = py - boss.y;
                    let diff = Math.atan2(dy, dx) - boss.aimAng;
                    while (diff > Math.PI) diff -= 2 * Math.PI;
                    while (diff < -Math.PI) diff += 2 * Math.PI;
                    boss.aimAng += diff * 0.4 * dt;
                    boss.swordAng = -1.4;

                    boss.dashTimer -= dt;
                    if (boss.dashTimer <= 0) {
                        boss.dashPhase = "dashing";
                        boss._dvx = Math.cos(boss.aimAng) * 26;
                        boss._dvy = Math.sin(boss.aimAng) * 26;
                        boss.slashHit = false;
                    }
                } else if (boss.dashPhase === "dashing") {
                    boss.x += boss._dvx * dt;
                    boss.y += boss._dvy * dt;

                    if (Math.hypot(px - boss.x, py - boss.y) < 140) {
                        boss.slashEffect = 1.0;
                        boss.swordAng = 1.35;
                        if (!boss.slashHit) {
                            boss.slashHit = true;
                            boss.slashHoldTimer = 16;
                            if (typeof bhAttack === "function") bhAttack(100, 3, 0, "randomPlayer");
                        }
                    }

                    if (boss.x < -60 || boss.x > info.width + 60 || boss.y < -60 || boss.y > info.height + 60) {
                        const edge = Math.floor(Math.random() * 4);
                        if (edge === 0)      { boss.x = Math.random() * info.width; boss.y = 50; }
                        else if (edge === 1) { boss.x = info.width - 50; boss.y = Math.random() * info.height; }
                        else if (edge === 2) { boss.x = Math.random() * info.width; boss.y = info.height - 50; }
                        else                 { boss.x = 50; boss.y = Math.random() * info.height; }

                        boss._dvx = 0;
                        boss._dvy = 0;
                        boss.dashPhase = "telegraph";
                        boss.dashTimer = 16;
                    }
                }

                if (boss.slashEffect > 0) {
                    if (boss.slashHoldTimer > 0) boss.slashHoldTimer -= dt;
                    else boss.slashEffect = Math.max(0, boss.slashEffect - 0.14 * dt);
                }
            }
        }

        // ── STAGE 4 (37.5s - 50s): Overdrive Phase 2 - Mass Bomb Throw (NO SLASHES) ──
        else if (elapsed >= 37500) {
            // Purge any remaining slash projectiles and clear lingering melee slash arcs
            if (!act._stage4Cleaned) {
                act._stage4Cleaned = true;
                info.bullets = info.bullets.filter(b => b.name !== "crescentSlash");
            }

            if (boss && boss.bossOwner === id) {
                boss.phase = 2; // Emerald transformation
                boss.dashPhase = "hover";
                boss._dvx = 0;
                boss._dvy = 0;
                boss.slashEffect = 0;
                boss.slashHoldTimer = 0;

                boss.hoverAnim += 0.08 * dt;
                boss.x += (info.width / 2 + Math.sin(elapsed * 0.0035) * (info.width * 0.36) - boss.x) * 0.09 * dt;
                boss.y += (85 + Math.cos(elapsed * 0.003) * 20 - boss.y) * 0.08 * dt;

                act._bombThrowTimer = (act._bombThrowTimer || 0) + dtMs;
                if (act._bombThrowTimer >= 450) {
                    act._bombThrowTimer = 0;
                    boss.throwAnim = 220;
                    boss.swordAng = 1.35;

                    const baseAng = Math.atan2(py - boss.y, px - boss.x);
                    const bombCount = 3;

                    for (let b = 0; b < bombCount; b++) {
                        const spread = (b - (bombCount - 1) / 2) * 0.38;
                        const ang = baseAng + spread + (Math.random() - 0.5) * 0.15;
                        const spd = 8.0 + Math.random() * 4.5;

                        BHB_AniciffoProjectiles.spawnBomb(info, boss.x, boss.y + 15, Math.cos(ang) * spd, Math.sin(ang) * spd, {
                            fuse: 52,
                            miniBombCount: 3,
                            miniBombSpeed: 6.5
                        });
                    }
                } else if (boss.throwAnim <= 0) {
                    boss.swordAng = -0.4;
                }
                if (boss.throwAnim > 0) boss.throwAnim -= dtMs;
            }
        }

        // ====================================================================
        // BULLET STATE MACHINES & DAMAGE RESOLUTION
        // ====================================================================

        // 1. Lasers
        for (let i = info.bullets.length - 1; i >= 0; i--) {
            let b = info.bullets[i];
            if (!b.isAniciffoLaser) continue;

            if (b.fuse > 0) {
                b.fuse -= dt;
                if (b.fuse <= 0) {
                    b.fuse = 0;
                    b.detonating = b.maxDetonating;
                    b.width = b.targetWidth;
                }
            } else if (b.detonating > 0) {
                b.detonating -= dt;
                b.width = b.targetWidth;
                if (b.detonating <= 0) {
                    b._dead = true;
                    info.bullets.splice(i, 1);
                }
            }
        }

        // 2. Bombs
        for (let i = info.bullets.length - 1; i >= 0; i--) {
            let b = info.bullets[i];
            if (b.name !== "aniciffoBomb") continue;

            if (b.gravity) {
                b.vy += b.gravity * dt;
                b.x += b.vx * dt;
                b.y += b.vy * dt;
                if (b.y >= info.height - 35 && b.detonating <= 0) {
                    b.fuse = 0;
                    b.detonating = b.maxDetonating;
                    b.vx = 0;
                    b.vy = 0;
                    for (let k = 0; k < b.miniBombCount; k++) {
                        const orbAng = (2 * Math.PI * k) / b.miniBombCount;
                        BHB_AniciffoProjectiles.spawnMiniBomb(info, b.x, b.y, Math.cos(orbAng) * b.miniBombSpeed, Math.sin(orbAng) * b.miniBombSpeed, 7);
                    }
                }
            } else {
                b.x += b.vx * dt;
                b.y += b.vy * dt;
                b.vx *= Math.pow(0.94, dt);
                b.vy *= Math.pow(0.94, dt);
            }

            b.pinRot = (b.pinRot || 0) + 0.25 * dt;

            if (b.fuse > 0) {
                b.fuse -= dt;
                if (b.fuse <= 0) {
                    b.fuse = 0;
                    b.detonating = b.maxDetonating;
                    b.hitPlayer = false;
                    for (let k = 0; k < b.miniBombCount; k++) {
                        const orbAng = (2 * Math.PI * k) / b.miniBombCount;
                        BHB_AniciffoProjectiles.spawnMiniBomb(info, b.x, b.y, Math.cos(orbAng) * b.miniBombSpeed, Math.sin(orbAng) * b.miniBombSpeed, 7);
                    }
                }
            } else if (b.detonating > 0) {
                b.detonating -= dt;
                if (!b.hitPlayer) {
                    const relX = px - b.x;
                    const relY = py - b.y;
                    const cosA = Math.cos(b.angle || 0);
                    const sinA = Math.sin(b.angle || 0);
                    const perpH = Math.abs(-relX * sinA + relY * cosA);
                    const perpV = Math.abs(relX * cosA + relY * sinA);
                    if (perpH < 12 + info.pr || perpV < 12 + info.pr) {
                        b.hitPlayer = true;
                        if (typeof bhAttack === "function") bhAttack(54, 3, 0, "allPlayer");
                    }
                }
                if (b.detonating <= 0) {
                    b._dead = true;
                    info.bullets.splice(i, 1);
                }
            }
        }

        // 3. Mini-bombs
        for (let b of info.bullets) {
            if (b.name === "aniciffoMiniBomb" && !b.hitPlayer) {
                if (Math.hypot(px - b.x, py - b.y) < b.r + info.pr) {
                    b.hitPlayer = true;
                    b._dead = true;
                    if (typeof bhAttack === "function") bhAttack(15, 3, 0, "allPlayer");
                }
            }
        }

        // 4. Arrows
        for (let i = info.bullets.length - 1; i >= 0; i--) {
            let b = info.bullets[i];
            if (!b.isArrowBullet) continue;

            if (b.x >= 0 && b.x <= info.width && b.y >= 0 && b.y <= info.height) b._entered = true;

            if (b.colorType === "yellow") {
                const dist = Math.hypot(px - b.x, py - b.y);
                if (b._yellowState === "approaching" && dist <= b._orbitRadius) {
                    b._yellowState = "orbiting";
                    b._orbitAngle = Math.atan2(b.y - py, b.x - px);
                    b._orbitRemaining = Math.PI;
                    b.vx = 0;
                    b.vy = 0;
                } else if (b._yellowState === "orbiting") {
                    b._orbitAngle += b._orbitSpeed * dt;
                    b._orbitRemaining -= b._orbitSpeed * dt;
                    b.x = px + Math.cos(b._orbitAngle) * b._orbitRadius;
                    b.y = py + Math.sin(b._orbitAngle) * b._orbitRadius;
                    b.angle = b._orbitAngle + Math.PI / 2;

                    if (b._orbitRemaining <= 0) {
                        b._yellowState = "striking";
                        const strike = Math.atan2(py - b.y, px - b.x);
                        b.vx = Math.cos(strike) * (b.arrowSpeed * 1.25);
                        b.vy = Math.sin(strike) * (b.arrowSpeed * 1.25);
                        b.angle = strike;
                    }
                }
            }

            const dist = Math.hypot(px - b.x, py - b.y);
            const isHit = dist <= (info.pr + b.headSize * 0.85);

            if (b.colorType === "red") {
                if (isHit) {
                    b._dead = true;
                } else if (b._entered && (b.x < -40 || b.x > info.width + 40 || b.y < -40 || b.y > info.height + 40)) {
                    b._dead = true;
                    if (typeof bhAttack === "function") bhAttack(26, 3, 0, "allPlayer");
                }
            } else if (isHit && (b.colorType === "green" || b._yellowState === "striking")) {
                b._dead = true;
                if (typeof bhAttack === "function") bhAttack(26, 3, 0, "allPlayer");
            }
        }

        return info;
    }
};

// Global Execution Wrapper
window.bulletHellAniciffoUltimate = function(actionValues = {}, values = {}, exitAction = () => {}) {
    values = values || {};
    values.duration = 50;
    values.greenMode = false;
    return bulletHell({ "aniciffoUltimate": actionValues }, values, exitAction);
};

// ============================================================================
// TYPING DRAIN ATTACK (BHB.typingDrain) — HIGH-VISIBILITY HUD
// ============================================================================

BHB.bloodwordCurse = {
    codeFunc(info, id) {
        const act = info.actions[id];
        act.targetText = (act.targetText || "PURGE SYSTEM").toUpperCase();
        act.dps = act.dps || 100;
        act.damageInterval = act.damageInterval || 250;
        act.lockMovement = act.lockMovement ?? true;
        act.caseSensitive = act.caseSensitive ?? false;

        act._typedIndex = 0;
        act._completed = false;
        act._damageTimer = 0;
        act._errorFlash = 0;

        info.timed = false;
        info.duration = 999999;
        info.endTime = Infinity;

        if (act.lockMovement) {
            info.px = info.width / 2;
            info.py = info.height * 0.65;
            info.vx = 0;
            info.vy = 0;
        }

        // Shared character validation logic
        const processInputChar = (rawChar) => {
            if (!info.active || act._completed) return;

            const expectedChar = act.targetText[act._typedIndex];
            const inputChar = act.caseSensitive ? rawChar : rawChar.toUpperCase();
            const targetChar = act.caseSensitive ? expectedChar : expectedChar.toUpperCase();

            if (inputChar === targetChar) {
                act._typedIndex++;
                if (act._typedIndex >= act.targetText.length) {
                    act._completed = true;

                    // Clean up DOM input and listeners
                    if (act._mobileInput && act._mobileInput.parentNode) {
                        act._mobileInput.remove();
                    }
                    window.removeEventListener("keydown", act._keyHandler);

                    if (info.floatingTexts) {
                        info.floatingTexts.push({
                            text: "Safe",
                            color: "#4ade80",
                            x: info.width / 2,
                            y: info.height * 0.35,
                            life: 70,
                            maxLife: 70
                        });
                    }

                    setTimeout(() => {
                        info.endTime = 0;
                    }, 500);
                }
            } else {
                act._errorFlash = 14;
            }
        };

        // Desktop keyboard listener
        act._keyHandler = function(e) {
            if (e.key.length === 1) {
                processInputChar(e.key);
                e.preventDefault();
            }
        };
        window.addEventListener("keydown", act._keyHandler);

        // Mobile hidden input deployment
        const overlay = document.getElementById("bh-overlay");
        if (overlay) {
            const input = document.createElement("input");
            input.type = "text";
            input.autocomplete = "off";
            input.autocorrect = "off";
            input.autocapitalize = "characters";
            input.spellcheck = false;

            // Positioned offscreen to keep it invisible while maintaining focusability
            input.style.position = "absolute";
            input.style.opacity = "0";
            input.style.pointerEvents = "none";
            input.style.zIndex = "-1";
            input.style.left = "-9999px";
            input.style.top = "0";

            overlay.appendChild(input);
            act._mobileInput = input;

            // Programmatic focus
            input.focus();

            // Mobile browsers require a user gesture to summon keyboards; bind touch/click as fallback
            act._focusHandler = () => {
                if (!act._completed && act._mobileInput) act._mobileInput.focus();
            };
            overlay.addEventListener("touchstart", act._focusHandler, { passive: true });
            overlay.addEventListener("click", act._focusHandler);

            // Listen to virtual keyboard input stream
            input.addEventListener("input", (e) => {
                if (e.data) {
                    // Extract the last typed character
                    const char = e.data.slice(-1);
                    processInputChar(char);
                }
                input.value = ""; // Clear buffer immediately
            });
        }

        // UI Entity configured for multi-line text wrapping
        info.bullets.push({
            name: "knife",
            boxRender: true,
            x: info.width / 2,
            y: info.height * 0.28,
            r: 8000,
            width: -1000,
            angle: 0,
            vx: 0,
            vy: 0,
draw(b, ctx) {
                ctx.save();
                ctx.translate(b.x, b.y);

                const text = act.targetText;
                const idx = act._typedIndex;
                const completed = act._completed;

                ctx.font = "bold 28px 'Courier New', monospace";
                ctx.textBaseline = "middle";

                const maxLineWidth = Math.max(220, info.width - 100);
                const lineHeight = 38;

                // 1. Group characters into word tokens (preserving spaces)
                const tokens = [];
                let curToken = [];
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const charWidth = ctx.measureText(char).width;
                    curToken.push({ char, width: charWidth, index: i });
                    if (char === " ") {
                        tokens.push(curToken);
                        curToken = [];
                    }
                }
                if (curToken.length > 0) tokens.push(curToken);

                // 2. Wrap whole word tokens onto lines
                const lines = [];
                let currentLine = [];
                let currentLineWidth = 0;

                for (const token of tokens) {
                    const tokenWidth = token.reduce((sum, item) => sum + item.width, 0);

                    if (currentLineWidth + tokenWidth <= maxLineWidth) {
                        currentLine.push(...token);
                        currentLineWidth += tokenWidth;
                    } else {
                        if (currentLine.length > 0) {
                            lines.push({ items: currentLine, width: currentLineWidth });
                            currentLine = [];
                            currentLineWidth = 0;
                        }

                        // Break by character only if a single word exceeds arena width
                        if (tokenWidth > maxLineWidth) {
                            for (const item of token) {
                                if (currentLineWidth + item.width > maxLineWidth && currentLine.length > 0) {
                                    lines.push({ items: currentLine, width: currentLineWidth });
                                    currentLine = [];
                                    currentLineWidth = 0;
                                }
                                currentLine.push(item);
                                currentLineWidth += item.width;
                            }
                        } else {
                            currentLine.push(...token);
                            currentLineWidth += tokenWidth;
                        }
                    }
                }
                if (currentLine.length > 0) {
                    lines.push({ items: currentLine, width: currentLineWidth });
                }

                // 3. Dynamic Container Dimensions
                const maxMeasuredWidth = Math.max(...lines.map(l => l.width));
                const boxW = Math.min(info.width - 24, Math.max(maxMeasuredWidth + 50, 320));
                const boxH = Math.max(90, lines.length * lineHeight + 64);

                // 4. Backdrop & Frame
                ctx.fillStyle = "rgba(5, 12, 8, 0.92)";
                ctx.fillRect(-boxW / 2, -boxH / 2, boxW, boxH);

                const borderColor = completed
                    ? "#540212"
                    : (act._errorFlash > 0 ? "#540212" : "rgba(121, 36, 40, 0.7)");
                ctx.lineWidth = 2.5;
                ctx.strokeStyle = borderColor;
                if (!options.performanceMode) {
                    ctx.shadowColor = borderColor;
                    ctx.shadowBlur = 12;
                }
                ctx.strokeRect(-boxW / 2, -boxH / 2, boxW, boxH);
                ctx.shadowBlur = 0;

                // 5. Header Label
                ctx.font = "bold 12px monospace";
                ctx.textAlign = "center";
                ctx.fillStyle = completed
                    ? "#540212"
                    : (act._errorFlash > 0 ? "#ef4444" : "#facc15");
                const label = completed
                    ? "OVERRIDE ACCEPTED — BLEED HALTED"
                    : (act._errorFlash > 0 ? "INVALID KEYSTROKE — DECAY ACCELERATING" : "TYPE TO HALT HP DECAY");
                ctx.fillText(label, 0, -boxH / 2 + 18);

                // 6. Draw Centered Lines & Caret
                ctx.font = "bold 28px 'Courier New', monospace";
                ctx.textAlign = "left";

                const startY = -boxH / 2 + 42 + lineHeight / 2;

                for (let r = 0; r < lines.length; r++) {
                    const line = lines[r];
                    let cursorX = -line.width / 2;
                    const lineY = startY + r * lineHeight;

                    for (let c = 0; c < line.items.length; c++) {
                        const { char, width: charWidth, index: i } = line.items[c];

                        if (i < idx) {
                            ctx.fillStyle = "#540212";
                        } else if (i === idx && !completed) {
                            const pulse = (Math.sin(Date.now() * 0.015) + 1) * 0.5;
                            ctx.fillStyle = act._errorFlash > 0 ? "#ef4444" : "#ffffff";

                            ctx.save();
                            ctx.fillStyle = act._errorFlash > 0 ? "#ef4444" : `rgba(121, 36, 40, ${0.5 + pulse * 0.5})`;
                            ctx.fillRect(cursorX - 1, lineY + 16, charWidth + 2, 3);
                            ctx.restore();
                        } else {
                            ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
                        }

                        ctx.fillText(char, cursorX, lineY);
                        cursorX += charWidth;
                    }
                }

                // 7. Progress Bar
                const barWidth = boxW - 36;
                const progress = idx / text.length;
                ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
                ctx.fillRect(-barWidth / 2, boxH / 2 - 8, barWidth, 3);
                ctx.fillStyle = completed ? "#540212" : "#8f152d";
                ctx.fillRect(-barWidth / 2, boxH / 2 - 8, barWidth * progress, 3);

                ctx.restore();
            }
        });

        return info;
    },

    moveFunc(info, ticks, id) {
        const act = info.actions[id];
        const dt = info.dt || 1;
        const dtMs = info.dtMs || 16.67;

        if (info.timer) {
            clearTimeout(info.timer);
            info.timer = null;
        }

        if (!act._completed) {
            info.endTime = Infinity;
        }

        if (!info.active) {
            if (act._keyHandler) window.removeEventListener("keydown", act._keyHandler);
            if (act._mobileInput && act._mobileInput.parentNode) act._mobileInput.remove();
            return info;
        }

        if (act._errorFlash > 0) act._errorFlash -= dt;

        if (act.lockMovement && !act._completed) {
            info.px = info.width / 2;
            info.py = info.height * 0.65;
            info.vx = 0;
            info.vy = 0;
        }

        if (!act._completed) {
            act._damageTimer = (act._damageTimer || 0) + dtMs;

            if (act._damageTimer >= act.damageInterval) {
                act._damageTimer %= act.damageInterval;

                const damagePerTick = act.dps * (act.damageInterval / 1000);
                if (typeof bhAttack === "function") {
                    bhAttack(damagePerTick, 3, 0, "allPlayer");
                }
            }
        }

        return info;
    }
};