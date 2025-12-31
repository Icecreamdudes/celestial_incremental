# Feature development workflow

---

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification

### [x] Step: Implement no-hit condition tracking
- Add `astralShipUnlocked` and `tookDamageInIriditeFight` to `startData` in `js/AltU2/iridite.js`.
- Reset `tookDamageInIriditeFight` when Iridite boss spawns.
- Update `applyShipDamage` to set the flag if Iridite boss is active.
- Set `astralShipUnlocked` when Iridite is defeated if no damage was taken.

### [x] Step: Update levelables[8]
- Change unlock condition to use `player.ir.astralShipUnlocked`.
- Update description and lore.

### [x] Step: Implement Ship 8 movement
- Add omnidirectional movement logic for ship 8 in `SpaceArena.prototype.update`.

### [x] Step: Implement Ship 8 visuals
- Add drawing code for ship 8 in `SpaceArena.prototype.draw` (scaled Iridite boss).

### [x] Step: Implement Ship 8 laser attack
- Implement laser firing logic in `SpaceArena.prototype.shoot` and `SpaceArena.prototype.update`.
- Implement laser visual in `SpaceArena.prototype.draw`.

