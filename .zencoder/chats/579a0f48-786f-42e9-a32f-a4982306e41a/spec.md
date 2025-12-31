# Technical Specification: Astral Ship (Ship Type 8)

## Technical Context
- **Project**: Celestial Incremental
- **Language**: JavaScript
- **Main File**: `js/AltU2/iridite.js`
- **Game Engine**: Custom HTML5 Canvas based arena

## Technical Implementation Brief
1.  **No-Hit Tracking**:
    - Add a variable `player.ir.tookDamageInIriditeFight` (Boolean) to the `startData` or initialize it when the boss fight starts.
    - Reset it to `false` when `summonIridite()` is called or when the Iridite boss spawns.
    - In `applyShipDamage`, if the Iridite boss is active, set `player.ir.tookDamageInIriditeFight = true`.
    - When Iridite is defeated, check this flag to set `player.ir.astralShipUnlocked = true`.
2.  **Ship Definition**:
    - Update `levelables[8]` in `js/AltU2/iridite.js` to use `player.ir.astralShipUnlocked` in its `canClick` and `tooltip`.
    - Update the `lore` to mention the laser attack.
3.  **Ship Movement**:
    - Modify `SpaceArena.prototype.update` to handle `player.ir.shipType == 8` using the same omnidirectional logic as `shipType == 5`.
4.  **Ship Attack**:
    - Modify `SpaceArena.prototype.shoot` to initialize laser state for ship 8.
    - Modify `SpaceArena.prototype.update` to handle ship 8's laser firing logic, similar to `iriditeBoss`'s laser but scaled for the player.
5.  **Ship Rendering**:
    - Modify `SpaceArena.prototype.draw` to draw ship 8 using a scaled-down version of the `iriditeBoss` drawing code.

## Source Code Structure
- `js/AltU2/iridite.js`: Main file for all changes.

## Contracts
- `player.ir.astralShipUnlocked`: New persistent flag for unlocking the ship.
- `player.ir.tookDamageInIriditeFight`: Temporary flag for tracking hits during the boss fight.

## Delivery Phases
1.  **Phase 1: Unlock Logic**: Implement hit tracking and unlock flag.
2.  **Phase 2: Movement and Stats**: Implement omnidirectional movement and ensure stats are correct.
3.  **Phase 3: Visuals**: Implement the scaled Iridite boss look for the player ship.
4.  **Phase 4: Laser Attack**: Implement the laser firing logic for the player.

## Verification Strategy
- **Unlock**: Force spawn Iridite boss, defeat it with/without taking damage (using console to adjust health/damage), check if ship 8 unlocks.
- **Movement**: Select ship 8, use WASD, verify it moves like the UFO.
- **Visuals**: Check ship 8 in the arena, ensure wings animate.
- **Attack**: Fire weapon, ensure laser appears and damages enemies.
