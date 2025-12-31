# Technical Specification: Nox Spear Enhancements

## Technical Context
- **Language**: JavaScript
- **Framework**: Custom game engine (incremental-style game)
- **Primary Files**: `js/DarkU1/blood.js`

## Technical Implementation Brief

### 1. Laser Warnings for Nox
- **Nox AI Update**: Modify `noxBoss` AI in `BloodArena.update`.
- **Attack Changes**: Instead of directly pushing to `this.bullets` during `barrage` and `burstSpears`, push to `this._vampireWarns`.
- **Parameter Mapping**: Ensure Nox's specific damage and speed values are passed correctly to `_vampireWarns`.

### 2. Phase-Based Targeting
- **Ally Update**: In `BloodArena.update`, check the current phase of `noxBoss` (if active).
- **Condition**: If `bossActive` is true and `boss.phase >= 2`, change the `target` for the vampire knight ally's spears from a random enemy to `this.ship`.

### 3. Returning Spear Logic
- **Bullet Extension**: Add `returning: boolean`, `originX: number`, `originY: number`, and `hasReturned: boolean` to `vampireSpear` bullets.
- **Update Logic**: In `BloodArena.update`, iterate through `this.bullets`.
- **Trigger**: When a `vampireSpear`'s `life` reaches a certain point (e.g., when it has traveled its full intended distance), reverse its velocity and point it toward its `originX/Y` or the current player position.
- **Optimization**: Use the existing `vampireSpear` bullet update cycle to handle the transition.

## Source Code Structure
- `BloodArena.update`: Main logic for AI and bullet state transitions.
- `BloodArena.draw`: (No changes needed if using `_vampireWarns` as drawing is already handled).

## Contracts
- **Bullet Object**:
  - `returning`: `boolean` - Flag indicating if the spear is in its return flight.
  - `originX`, `originY`: `number` - Coordinates where the spear was spawned.
- **Vampire Warn Object**:
  - `fromEnemy`: `boolean` - Used to distinguish between ally and boss spears if necessary.

## Delivery Phases
1. **Phase 1: Nox Laser Warnings**: Implement `_vampireWarns` for Nox's attacks.
2. **Phase 2: Betrayal Targeting**: Implement Phase 2+ targeting for the vampire ally.
3. **Phase 3: Returning Logic**: Implement the boomerang/return behavior for all vampire spears in Phase 2+.

## Verification Strategy
- **Manual Testing**: Spawn Nox using `spawnNox()` and observe attack patterns.
- **Visual Check**: Ensure red lasers appear before Nox fires spears.
- **Phase Check**: Use console to set `noxBoss.health` to trigger phases and verify ally behavior.
- **Return Check**: Verify spears reverse direction in Phase 2+.
