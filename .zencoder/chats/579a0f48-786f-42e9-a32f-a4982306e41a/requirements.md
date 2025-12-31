# Feature Specification: Astral Ship (Ship Type 8)

## User Stories

### User Story 1 - Unlock the Astral Ship
**Acceptance Scenarios**:
1. **Given** I am fighting the Iridite boss, **When** I defeat the boss without taking any damage, **Then** the Astral Ship should be unlocked.
2. **Given** I am fighting the Iridite boss, **When** I defeat the boss but I took damage during the fight, **Then** the Astral Ship should remain locked.

### User Story 2 - Use the Astral Ship
**Acceptance Scenarios**:
1. **Given** I have unlocked the Astral Ship, **When** I select it in the ship selection menu, **Then** I should be able to use it in the Space Battle.
2. **Given** I am using the Astral Ship, **When** I move using WASD, **Then** the ship should move omnidirectionally (independent of facing direction).
3. **Given** I am using the Astral Ship, **When** I fire my weapon, **Then** it should shoot out Iridite's lasers.

---

## Requirements
- **Ship ID**: `player.ir.shipType == 8`.
- **Visuals**: Miniature version of `iriditeBoss`, including wing animations.
- **Movement**: Omnidirectional movement logic, similar to the UFO ship (`shipType == 5`).
- **Attack**: Implement a laser attack similar to the `iriditeBoss`'s laser attack.
- **Unlock Condition**: Track if the player takes damage during the Iridite boss fight. If damage is zero at the end of the fight, set a flag to unlock the ship.

## Success Criteria
- The Astral Ship is correctly unlocked only after a "no-hit" victory against Iridite.
- The Astral Ship moves omnidirectionally.
- The Astral Ship fires lasers that look and behave like Iridite's lasers.
- The Astral Ship's visual representation accurately mimics a smaller version of the Iridite boss.
