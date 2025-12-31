# Feature Specification: Nox Spear Enhancements and Returning Spears

## User Stories

### User Story 1 - Nox Spear Laser Warnings
**Acceptance Scenarios**:
1. **Given** the Nox boss fight is active, **When** Nox uses the "barrage" or "burstSpears" attacks, **Then** red laser warning beams should appear before the spears are launched, matching the visuals of the vampire knight ally.

### User Story 2 - Vampire Spear Betrayal (Phase 2+)
**Acceptance Scenarios**:
1. **Given** the Nox boss is in Phase 2 or 3, **When** the vampire knight ally fires a spear, **Then** it should target the player's ship instead of enemies.
2. **Given** a vampire spear is fired in Phase 2+, **When** it reaches its target or its maximum life, **Then** it should fly back toward its origin or the player (boomerang effect).

---

## Requirements
1. **Nox Laser Warnings**:
    - Integrate the `_vampireWarns` logic into Nox's `barrage` and `burstSpears` attacks.
    - Maintain the existing laser visuals (glow, core, gradient).
2. **Returning Logic**:
    - Spears in Phase 2+ should have a "return" state.
    - Upon reaching the end of their initial path, they should reverse direction or track the player.
3. **Phase-Based Targeting**:
    - Modify the vampire knight ally's target selection to prioritize the player when `noxBoss.phase >= 2`.

## Success Criteria
- Nox's spears are preceded by laser warnings.
- Vampire ally spears target the player in Phase 2 and 3.
- Spears fired in Phase 2+ return to the sender/player after their initial flight.
