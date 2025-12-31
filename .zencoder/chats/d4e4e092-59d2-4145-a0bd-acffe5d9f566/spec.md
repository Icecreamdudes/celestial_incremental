# Technical Specification: Nox Boss Visual & Attack Overhaul

## Technical Context
- **Language**: JavaScript (ES6+)
- **Environment**: HTML5 Canvas
- **Key Files**: `js/DarkU1/blood.js`, `js/AltU2/iridite.js`

## Technical Implementation Brief

### 1. Vampire & Bat Visuals
- **Vampire Form**: Drawn using multiple `ctx` shapes (head, body, cape). The cape will use a sine-wave based polygon to simulate flapping.
- **Bat Form**: A simplified bat shape with flapping wings, triggered when `enemy._batTimer > 0`.
- **Animations**: All animations will be tied to `enemy._pulseTimer` (frames) to ensure consistency.

### 2. Massive Sword Attack
- **Spawning**: Modify the `spinSword` block in `BloodArena.update` to spawn a single bullet with `massiveSword: true`, `radius: 80`, and `life: 600`.
- **Bouncing**: Add a check in the projectile update loop (within `SpaceArena.update` or an override) that detects if a `massiveSword` hits the arena boundaries (`0, 0, this.width, this.height`) and inverts its velocity.
- **Drawing**: A dedicated drawing block for `massiveSword` will render a metallic blade with a handle, rotating based on its own internal rotation state.

## Source Code Structure
- **`js/DarkU1/blood.js`**: 
    - Update `enemyTypes.noxBoss.draw`.
    - Update `BloodArena.update` (Attack choice and behavior).
- **`js/AltU2/iridite.js`**:
    - Update `SpaceArena.draw` (Bullet rendering).
    - Update `SpaceArena.update` (Bullet physics).

## Contracts
- **Enemy State**: `enemy.isBat` (inferred from `_batTimer`).
- **Bullet Properties**:
    - `massiveSword`: true
    - `angle`: current rotation
    - `rotSpd`: rotation increment per frame

## Delivery Phases
1. **Phase 1: Humanoid Boss & Bat Transformation**
2. **Phase 2: Massive Bouncing Sword**

## Verification Strategy
- **Manual Test**: Call `spawnNox()` and `arena.enemies[0]._batTimer = 200` to test transformation.
- **Manual Test**: Call `arena.enemies[0]._spinSword = 1` to test the sword.
