//bulletHell(700, 500, 12, 500, 275)
function bulletHell(actions, values = {}, exitAction = () => {}) {
    let info = {}
    info.width = values.width || 700
    info.height = values.height || 500
    info.duration = values.duration || 12
    info.actions = actions
    info.values = values
    info.exitAction = exitAction
    for (let i in info.actions) {
        if (BHB[i].codeFunc) info.actions[i].codeFunc = BHB[i].codeFunc
        if (BHB[i].moveFunc) info.actions[i].moveFunc = BHB[i].moveFunc
        info.actions[i].lastTime = false
    }
    info.centerX = values.centerX || window.innerWidth / 2
    info.centerY = values.centerY || window.innerHeight / 2
    info.timed = values.timed || false
    info.endTime = Date.now() + info.duration * 1000
    info.start = values.start || "center"
    info.cellSize = values.cellSize || false
    info.goalType = values.goal || false
    info.subArena = values.subArena || false
    info.subWidth = values.subWidth || 400
    info.subHeight = values.subHeight || 300
    info.subSpeed = values.subSpeed || 2.5
    info.subMove = values.subMove || "bounce"
    info.moveWithSub = values.moveWithSub || true
    info.active = true;

    // Check if tabbed in, if not just deal a bunch of damage
    if (player && player.tab && player.tab != "bh") {
        for (let i = 0; i < 3; i++) {
            player.bh.characters[i].stun = ["hard", new Decimal(info.duration)]
        }
        player.bh.celestialite.stun = ["hard", new Decimal(info.duration)]
        bhAttack(Decimal.mul(player.bh.celestialite.damage, info.duration/3), 3, "allPlayer")
        return
    }

    // Reset immortality frames at start
    window.lastDamageTime = 0;
    let running = true; // Prevent multiple animation loops
    info.full = options.fullscreen

    // Store state in localStorage so it persists across reloads
    info.startTime = Date.now();
    localStorage.setItem('bhState', JSON.stringify(info));

    // If already active, clear previous overlay and timer
    if (!window.__bh_state) window.__bh_state = {};
    const bhState = window.__bh_state;
    if (bhState.active) {
        if (bhState.overlay && bhState.overlay.parentNode) bhState.overlay.remove();
        if (bhState.timer) clearTimeout(bhState.timer);
        window.removeEventListener("mousemove", bhState.mouseHandler);
        window.removeEventListener("touchmove", bhState.touchHandler);
    }
    bhState.active = true;

    player.subtabs["bh"]["stuff"] = "bullet";
    options.fullscreen = true

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
    gameCanvas.style.background = "#111";
    gameCanvas.style.border = "2px solid #fff";
    gameCanvas.style.borderRadius = "16px";
    gameCanvas.style.boxShadow = "0 0 32px #000";
    gameCanvas.style.position = "absolute";
    gameCanvas.style.left = `calc(50vw - ${info.width / 2}px)`;
    gameCanvas.style.top = `calc(50vh - ${info.height / 2}px)`;
    gameCanvas.style.zIndex = "100001";
    overlay.appendChild(gameCanvas);

    document.body.appendChild(overlay);
    info.bossCtx = bossCanvas.getContext('2d');
    info.ctx = gameCanvas.getContext('2d');

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
    if (info.start == "cell") {
        info.px = info.cellSize / 2
        info.py = info.cellSize / 2;
    } else if (info.subArena) {
        info.px = info.subWidth / 2;
        info.py = info.subHeight / 2;
    } else {
        info.px = info.width / 2
        info.py = info.height / 2;
    }
    info.pr = 18;
    info.speed = 5;
    info.pos = {x: 0, y: 0}
    const keys = { up: false, down: false, left: false, right: false };
    if (info.goalType) {
        if (info.goalType == "cell") {
            info.goal = {x: info.cols - 1, y: info.rows - 1}
            info.goalRadius = info.cellSize / 2 - 6;
        }
    }

    // Black box position in global coordinates
    info.boxLeft = gameCanvas.getBoundingClientRect().left;
    info.boxTop = gameCanvas.getBoundingClientRect().top;

    // Bullets
    info.bullets = [];
 
    // Bullet Code
    for (let i in info.actions) {
        if (info.actions[i].codeFunc) info = info.actions[i].codeFunc(info, i)
    }

    function updatePos(e, touch = false) {
        if (touch) e = e.touches[0]
        info.pos.x = e.clientX - info.boxLeft
        info.pos.y = e.clientY - info.boxTop
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
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return;
        info.bullets.push({
            x: bx,
            y: by,
            vx: (dx / dist) * speed,
            vy: (dy / dist) * speed,
            r: 10,
            draw(x, y, r, bossCtx) {
                bossCtx.beginPath();
                bossCtx.arc(x, y, r, 0, 2 * Math.PI);
                bossCtx.fillStyle = "#fff";
                bossCtx.fill();
            },
        });
    }

    // Fire radial burst at coordinates
    info.fireRadialBurst = (bx, by, id) => {
        for (let i = 0; i < info.actions[id].bulletsPerBurst; i++) {
            const angle = (2 * Math.PI * i) / info.actions[id].bulletsPerBurst;
            info.bullets.push({
                x: bx,
                y: by,
                vx: Math.cos(angle) * info.actions[id].bulletSpeed,
                vy: Math.sin(angle) * info.actions[id].bulletSpeed,
                r: 12,
                draw(x, y, r, bossCtx) {
                    bossCtx.beginPath();
                    bossCtx.arc(x, y, r, 0, 2 * Math.PI);
                    bossCtx.fillStyle = "#fff";
                    bossCtx.fill();
                },
            });
        }
    }

    // Spawn knife
    info.spawnKnife = (id) => {
        // Pick a random edge and a random point on that edge
        const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        let bx, by, angle;
        if (edge === 0) { // top
            bx = Math.random() * info.width;
            by = -info.actions[id].knifeLength;
            angle = Math.random() * Math.PI + Math.PI / 2; // downwards, but can be angled
        } else if (edge === 1) { // right
            bx = info.width + info.actions[id].knifeLength;
            by = Math.random() * info.height;
            angle = Math.random() * Math.PI + Math.PI; // leftwards
        } else if (edge === 2) { // bottom
            bx = Math.random() * info.width;
            by = info.height + info.actions[id].knifeLength;
            angle = Math.random() * Math.PI - Math.PI / 2; // upwards
        } else { // left
            bx = -info.actions[id].knifeLength;
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
        info.bullets.push({
            name: "knife",
            boxRender: true, // RENDER IN BOX
            x: bx,
            y: by,
            angle: angle,
            r: info.actions[id].knifeLength,
            vx: Math.cos(angle) * info.actions[id].enemySpeed,
            vy: Math.sin(angle) * info.actions[id].enemySpeed,
            draw(x, y, angle, bossCtx) {
                // Draw path line (red, thin)
                bossCtx.save();
                bossCtx.strokeStyle = '#f22';
                bossCtx.lineWidth = 2;
                bossCtx.beginPath();
                bossCtx.moveTo(x, y);
                // Draw line in the direction of the knife, long enough to cross the arena
                let farX = x + Math.cos(angle) * (info.width + info.height);
                let farY = y + Math.sin(angle) * (info.width + info.height);
                bossCtx.lineTo(farX, farY);
                bossCtx.stroke();
                bossCtx.restore();
                // Draw knife
                bossCtx.save();
                bossCtx.translate(x, y);
                bossCtx.rotate(angle);
                bossCtx.beginPath();
                bossCtx.moveTo(-info.actions[id].knifeLength / 2, -info.actions[id].knifeWidth / 2);
                bossCtx.lineTo(info.actions[id].knifeLength / 2, 0);
                bossCtx.lineTo(-info.actions[id].knifeLength / 2, info.actions[id].knifeWidth / 2);
                bossCtx.closePath();
                bossCtx.fillStyle = '#ccc';
                bossCtx.shadowColor = '#fff';
                bossCtx.shadowBlur = 6;
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
        for (let i = 0; i < info.actions[id].bulletsPerBurst; i++) {
            const angle = (2 * Math.PI * i) / info.actions[id].bulletsPerBurst;
            // Spawn far away in a ring
            const spawnX = centerX + Math.cos(angle) * spawnRadius;
            const spawnY = centerY + Math.sin(angle) * spawnRadius;
            // Aim at the current player position
            const dx = centerX - spawnX;
            const dy = centerY - spawnY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const knifeAngle = Math.atan2(dy, dx);
            info.bullets.push({
                name: "knife",
                boxRender: true, // RENDER IN BOX
                offScreen: true, // Bullets can be off screen
                x: spawnX,
                y: spawnY,
                angle: knifeAngle,
                r: info.actions[id].knifeLength,
                vx: (dx / dist) * info.actions[id].enemySpeed,
                vy: (dy / dist) * info.actions[id].enemySpeed,
                timer: Date.now() - 500,
                draw(x, y, angle, bossCtx, timer) {
                    // Draw path line (red, thin) if knife is on screen, or if it left within the last 500ms
                    let knifeOnScreen = (
                        x > 0 && x < info.width &&
                        y > 0 && y < info.height
                    );
                    if (knifeOnScreen) {
                        timer = Date.now();
                    }
                    if (Date.now() - timer < 500) {
                        // Draw path line (red, thin)
                        bossCtx.save();
                        bossCtx.strokeStyle = '#f22';
                        bossCtx.lineWidth = 2;
                        bossCtx.beginPath();
                        bossCtx.moveTo(x, y);
                        // Draw line in the direction of the knife, long enough to cover the screen
                        let farX = x + Math.cos(angle) * 5000;
                        let farY = y + Math.sin(angle) * 5000;
                        bossCtx.lineTo(farX, farY);
                        bossCtx.stroke();
                        bossCtx.restore();
                    }
                    // Draw knife
                    bossCtx.save();
                    bossCtx.translate(x, y);
                    bossCtx.rotate(angle);
                    bossCtx.beginPath();
                    bossCtx.moveTo(-info.actions[id].knifeLength / 2, -info.actions[id].knifeWidth / 2);
                    bossCtx.lineTo(info.actions[id].knifeLength / 2, 0);
                    bossCtx.lineTo(-info.actions[id].knifeLength / 2, info.actions[id].knifeWidth / 2);
                    bossCtx.closePath();
                    bossCtx.fillStyle = '#ccc';
                    bossCtx.shadowColor = '#fff';
                    bossCtx.shadowBlur = 6;
                    bossCtx.fill();
                    bossCtx.restore();

                    return timer
                }
            });
        }
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
    function allCharactersDead() {
        if (!player || !player.bh || !player.bh.characters) return true;
        for (let i = 0; i < 3; i++) {
            if (player.bh.characters[i].id != "none" && Decimal.gt(player.bh.characters[i].health, 0)) return false
        }
        return true;
    }

    function animate(ts) {
        if (!info.active) return;
        // End early if all characters are dead
        if (allCharactersDead()) {
            window.removeEventListener("mousemove", mouseHandler);
            window.removeEventListener("touchmove", touchHandler);
            if (overlay.parentNode) overlay.remove();
            // Do NOT return to battle tab here!
            bhState.active = false;
            info.active = false;
            options.fullscreen = info.full;
            info.exitAction()
            localStorage.setItem('bhState', "");
            return;
        }

        // Move sub-arena (with DVD bounce logic)
        if (info.subArena) {
            info.subx += info.subvx;
            info.suby += info.subvy;
            if (info.subx <= 0) { info.subx = 0; info.subvx = Math.abs(info.subvx); }
            if (info.subx >= info.width - info.subWidth) { info.subx = info.width - info.subWidth; info.subvx = -Math.abs(info.subvx); }
            if (info.suby <= 0) { info.suby = 0; info.subvy = Math.abs(info.subvy); }
            if (info.suby >= info.height - info.subHeight) { info.suby = info.height - info.subHeight; info.subvy = -Math.abs(info.subvy); }
        }

        // Move Player
        let dx = info.pos.x - info.px;
        let dy = info.pos.y - info.py;
        if (info.subArena && info.moveWithSub) {
            dx -= info.subx
            dy -= info.suby
        }
        let angle = Math.atan2(dy, dx);
        if (dx < -3 || dx > 3 || dy < -3 || dy > 3) {
            if (info.cellSize) {
                let npx = info.px + Math.cos(angle) * info.speed, npy = info.py + Math.sin(angle) * info.speed;
                // Try moving in both axes, then x only, then y only
                if (canMoveTo(npx, npy)) {
                    info.px = npx; info.py = npy
                } else if (canMoveTo(npx, info.py)) {
                    info.px = npx;
                } else if (canMoveTo(info.px, npy)) {
                    info.py = npy
                }
            } else {
                info.px += Math.cos(angle) * info.speed;
                info.py += Math.sin(angle) * info.speed;
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

        // Check for reaching goal
        if (info.goalType) {
            if (info.goalType == "cell") {
                info.distToGoal = Math.sqrt((info.px - (info.goal.x * info.cellSize + info.cellSize / 2)) ** 2 + (info.py - (info.goal.y * info.cellSize + info.cellSize / 2)) ** 2);
            }
            if (info.distToGoal < info.goalRadius) {
                // End attack
                window.removeEventListener("mousemove", mouseHandler);
                window.removeEventListener("touchmove", touchHandler);
                if (overlay.parentNode) overlay.remove();
                player.subtabs["bh"]["stuff"] = "battle";
                bhState.active = false;
                info.active = false;
                options.fullscreen = info.full;
                info.exitAction()
                localStorage.setItem('bhState', "");
                return;
            }
        }

        // Bullet movement/spawn code
        for (let i in info.actions) {
            if (info.actions[i].moveFunc) info = info.actions[i].moveFunc(info, ts, i)
        }

        // Move bullets
        for (let b of info.bullets) {
            b.x += b.vx;
            b.y += b.vy;
        }

        // Remove bullets that go off screen
        info.bullets = info.bullets.filter(b => {
            if (b.offScreen) return b.x > -2000 && b.x < info.width + 2000 && b.y > -2000 && b.y < info.height + 2000
            if (b.name && (b.name == "bomb" || b.name == "minibomb") && b.exploded) return false
            if (b.name && b.name == "knife") {
                return b.x > -b.r && b.x < info.width + b.r && b.y > -b.r && b.y < info.height + b.r
            }
            return b.x > -b.r && b.x < window.innerWidth + b.r && b.y > -b.r && b.y < window.innerHeight + b.r
        });

        // Draw bullets (white circles) on bossCanvas
        info.bossCtx.clearRect(0, 0, bossCanvas.width, bossCanvas.height);
        info.bossCtx.save();
        info.bossCtx.shadowColor = "#fff";
        info.bossCtx.shadowBlur = 8;
        for (let b of info.bullets) {
            if (b.boxRender) continue
            b.draw(b.x, b.y, b.r, info.bossCtx)
        }
        info.bossCtx.restore();

        // Only call takeDamage once per frame if hit
        let playerHit = false;

        // Check collision between player and each bullet
        for (let b of info.bullets) {
            if (b.name && b.name == "knife") {
                // Knife is a rectangle, check if player is within knife's rectangle (approximate as line segment + width)
                const cx = b.x + Math.cos(b.angle) * b.r / 2;
                const cy = b.y + Math.sin(b.angle) * b.r / 2;
                const dx = Math.cos(b.angle), dy = Math.sin(b.angle);
                // Project player onto knife axis
                const t = ((info.px - b.x) * dx + (info.py - b.y) * dy);
                if (t >= 0 && t <= b.r) {
                    // Perpendicular distance
                    const perp = Math.abs((info.px - b.x) * dy - (info.py - b.y) * dx);
                    if (perp < info.pr + b.r / 2) {
                        playerHit = true;
                        break;
                    }
                }
            } else if (b.boxRender) {
                const dx = info.px - b.x;
                const dy = info.py - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= (info.pr + b.r)) {
                    playerHit = true;
                    break;
                }
            } else {
                const dx = (info.boxLeft + info.px) - b.x;
                const dy = (info.boxTop + info.py) - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= (info.pr + b.r)) {
                    playerHit = true;
                    break;
                }
            }
        }

        // Take damage (only when in a BH stage)
        if (playerHit && player && player.bh && player.bh.currentStage && player.bh.currentStage != "none") {
            const now = Date.now();
            // Immortality frames: only allow damage every 400ms
            if (typeof window.lastDamageTime !== "number") window.lastDamageTime = 0;
            if (now - window.lastDamageTime > 400) {
                window.lastDamageTime = now;
                bhAttack(player.bh.celestialite.damage, 3, "randomPlayer")
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
            info.ctx.shadowColor = '#fff';
            info.ctx.shadowBlur = 12;
            info.ctx.setLineDash([16, 12]);
            info.ctx.strokeRect(0, 0, info.width, info.height);
            info.ctx.setLineDash([]);
            info.ctx.restore();

            // Draw the small arena (solid, glowing)
            info.ctx.save();
            info.ctx.strokeStyle = '#0ff';
            info.ctx.lineWidth = 4;
            info.ctx.shadowColor = '#0ff';
            info.ctx.shadowBlur = 16;
            info.ctx.strokeRect(info.subx, info.suby, info.subWidth, info.subHeight);
            info.ctx.restore();
        }

        // Draw maze
        if (info.cellSize) {
            info.ctx.save();
            info.ctx.strokeStyle = "#fff";
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
            info.ctx.shadowColor = '#000';
            info.ctx.shadowBlur = 6;
            info.ctx.fillText(`Time Left: ${timeLeft}s`, info.width / 2, 10);
            info.ctx.restore();
            info.ctx.restore();
        }
        // Draw Goal
        if (info.goalType) {
            if (info.goalType == "cell") {
                info.ctx.save();
                info.ctx.beginPath();
                info.ctx.arc(info.goal.x * info.cellSize + info.cellSize / 2, info.goal.y * info.cellSize + info.cellSize / 2, info.goalRadius, 0, 2 * Math.PI);
                info.ctx.fillStyle = "#2f4";
                info.ctx.shadowColor = "#2f4";
                info.ctx.shadowBlur = 16;
                info.ctx.fill();
                info.ctx.restore();
            }
        }

        // Draw bullets
        info.ctx.save();
        for (let b of info.bullets) {
            if (b.boxRender) {
                if (b.name && b.name == "knife") {
                    if (b.timer) b.timer = b.draw(b.x, b.y, b.angle, info.ctx, b.timer)
                    b.draw(b.x, b.y, b.angle, info.ctx)
                }
                else b.draw(b.x, b.y, b.r, info.ctx)
            }
        }
        // Draw player (red diamond) in the box
        if (info.subArena && info.moveWithSub) {
            info.ctx.translate(info.subx + info.px, info.suby + info.py);
        } else {
            info.ctx.translate(info.px, info.py);
        }
        info.ctx.rotate(Math.PI / 2);
        info.ctx.beginPath();
        info.ctx.moveTo(0, -info.pr);
        info.ctx.lineTo(info.pr, 0);
        info.ctx.lineTo(0, info.pr);
        info.ctx.lineTo(-info.pr, 0);
        info.ctx.closePath();
        info.ctx.fillStyle = "#e22";
        info.ctx.shadowColor = "#e22";
        info.ctx.shadowBlur = 8;
        info.ctx.fill();
        info.ctx.restore();

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
    window.addEventListener("mousemove", mouseHandler);
    window.addEventListener("touchmove", touchHandler);

    // Save handlers and overlay for cleanup on reload
    bhState.overlay = overlay;
    bhState.mouseHandler = mouseHandler;
    bhState.touchHandler = touchHandler;

    // End the minigame after duration
    bhState.timer = setTimeout(() => {
        window.removeEventListener("mousemove", mouseHandler);
        window.removeEventListener("touchmove", touchHandler);
        if (overlay.parentNode) overlay.remove();
        player.subtabs["bh"]["stuff"] = "battle";
        bhState.active = false;
        info.active = false;
        options.fullscreen = info.full;
        info.exitAction()
        if (info.timed) bhAttack(Decimal.mul(player.bh.celestialite.damage, 3), 3, "allPlayer")
        localStorage.setItem('bhState', "");
    }, info.duration * 1000);
}

// --- AUTO-RESUME ON RELOAD ---
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
        if (remaining > 0.1) {
            setTimeout(() => {
                bulletHell(bhState.actions, newValues);
            }, 500)
        } else {
            // If time is up, clean up state
            player.subtabs["bh"]["stuff"] = "battle";
            bhState.active = false;
            options.fullscreen = bhState.full;
            info.exitAction()
            if (bhState.timed) bhAttack(Decimal.mul(player.bh.celestialite.damage, 3), 3, "allPlayer")
            localStorage.setItem('bhState', "");
        }
    }
}

BHB.diamondAttack = {
    //bulletHell({"diamondAttack": {diamondAmount: 2}}, {duration: 10})
    codeFunc(info, id) {
        for (let i = 0; i < info.actions[id].diamondAmount; i++) {
            let angleOffset = (2 * Math.PI * i) / info.actions[id].diamondAmount;
            info.bullets.push({
                name: "diamond",
                x: info.boxLeft + info.px + 200 * Math.cos(angleOffset),
                y: info.boxTop + info.py + 200 * Math.sin(angleOffset),
                vx: 0,
                vy: 0,
                r: 40,
                orbitRadius: 200,
                orbitAngle: angleOffset,
                orbitSpeed: 0.015 + 0.003 * i, // slightly different speeds
                shootInterval: 500 + Math.floor(Math.random() * 600) + i * 150, // each diamond has a different interval
                lastShotTime: 0,
                draw(dx, dy, dr, bossCtx) {
                    bossCtx.translate(dx, dy);
                    bossCtx.rotate(Math.PI / 2); // 90deg
                    bossCtx.beginPath();
                    bossCtx.moveTo(0, -dr);
                    bossCtx.lineTo(dr, 0);
                    bossCtx.lineTo(0, dr);
                    bossCtx.lineTo(-dr, 0);
                    bossCtx.closePath();
                    bossCtx.fillStyle = "#fff";
                    bossCtx.shadowColor = "#fff";
                    bossCtx.shadowBlur = 16;
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
                b.orbitAngle += b.orbitSpeed;
                const playerGlobalX = info.boxLeft + info.px;
                const playerGlobalY = info.boxTop + info.py;
                const targetBx = playerGlobalX + b.orbitRadius * Math.cos(b.orbitAngle);
                const targetBy = playerGlobalY + b.orbitRadius * Math.sin(b.orbitAngle);
                // Smoothly move boss towards target position (lerp)
                const lerpFactor = 0.05;
                b.x += (targetBx - b.x) * lerpFactor;
                b.y += (targetBy - b.y) * lerpFactor;

                // Each diamond shoots at its own interval
                if (!b.lastShotTime) b.lastShotTime = ticks;
                if (ticks - b.lastShotTime > b.shootInterval) {
                    info.shootAtPlayer(b.x, b.y, id);
                    b.lastShotTime = ticks;
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
        const bulletRadius = 12;
        const bulletSpeed = 4;
        if (!info.actions[id].lastTime) info.actions[id].lastTime = ticks;
        const bulletsToSpawn = Math.floor(((ticks - info.actions[id].lastTime) / 1000) * info.actions[id].bulletPerSec); // LAST NUMBER IS AMOUNT OF BULLETS PER SECOND
        for (let i = 0; i < bulletsToSpawn; i++) {
            let bx = Math.random() * info.width + info.boxLeft;
            let by = -bulletRadius;
            let bul = {x: bx, y: by, vx: 0, vy: bulletSpeed, r: bulletRadius, draw(dx, dy, dr, bossCtx) {bossCtx.beginPath();bossCtx.arc(dx, dy, dr, 0, 2 * Math.PI);bossCtx.fillStyle = "#fff";bossCtx.fill()}}
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
                draw(dx, dy, dr, ctx) {
                    ctx.beginPath();
                    ctx.arc(dx, dy, dr, 0, 2 * Math.PI);
                    ctx.fillStyle = "#eee";
                    ctx.shadowColor = "#fff";
                    ctx.shadowBlur = 12;
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
                draw(dx, dy, dr, bossCtx) {
                    bossCtx.translate(dx, dy);
                    bossCtx.rotate(Math.PI / 2); // 90deg
                    bossCtx.beginPath();
                    bossCtx.moveTo(0, -dr);
                    bossCtx.lineTo(dr, 0);
                    bossCtx.lineTo(0, dr);
                    bossCtx.lineTo(-dr, 0);
                    bossCtx.closePath();
                    bossCtx.fillStyle = "#fff";
                    bossCtx.shadowColor = "#fff";
                    bossCtx.shadowBlur = 16;
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
                draw(dx, dy, dr, bossCtx) {
                    bossCtx.beginPath();
                    bossCtx.arc(dx, dy, dr, 0, 2 * Math.PI);
                    bossCtx.fillStyle = '#fff';
                    bossCtx.shadowColor = '#fff';
                    bossCtx.shadowBlur = 12;
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
                    console.log("ye")
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
                        draw(dx, dy, dr, bossCtx) {
                            bossCtx.beginPath();
                            bossCtx.arc(dx, dy, dr, 0, 2 * Math.PI);
                            bossCtx.fillStyle = '#fff';
                            bossCtx.shadowColor = '#fff';
                            bossCtx.shadowBlur = 8;
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
                        draw(dx, dy, dr, bossCtx) {
                            bossCtx.beginPath();
                            bossCtx.arc(dx, dy, dr, 0, 2 * Math.PI);
                            bossCtx.fillStyle = '#fff';
                            bossCtx.shadowColor = '#fff';
                            bossCtx.shadowBlur = 4;
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