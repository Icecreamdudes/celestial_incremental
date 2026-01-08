# Feature Specification: Spin the Wheel

## User Stories

### User Story 1 - Spinning the Wheel
**Acceptance Scenarios**:
1. **Given** the user has enough Chance Points, **When** they click the wheel, **Then** the wheel should start spinning using a JavaScript animation loop.
2. **Given** the wheel is spinning, **When** the animation completes, **Then** it should stop on a segment, and the corresponding permanent boost should be added to `player.wof.wheelBonuses`.
3. **Given** a spin is completed, **When** the cost is deducted, **Then** `player.wof.spinCost` should increase for the next spin.

---

## Requirements
- **Visuals**: A large clickable wheel component with 8 segments in the `wof` layer.
- **Animation**: JavaScript-driven spinning animation with deceleration (easing).
- **Segments**:
    - Total of 8 segments initially.
    - 4 common segments (smaller boosts) and 4 rare segments (larger boosts).
    - Boost types: Chance Points Multiplier, Softcap Extension, Heads Multiplier, Tails Multiplier.
- **Configurability**: 
    - Segments defined in an array for easy modification.
    - Each segment supports an `unlocked` or `show` boolean property.
- **Persistence**: Boosts are permanent and stored in `player.wof.wheelBonuses`.
- **Cost**: Spins cost `player.wof.spinCost` Chance Points, which increases per spin.

## Success Criteria
- The wheel spins smoothly and lands on segments according to weighted probabilities.
- Boosts are correctly applied to the player's stats and persist through saves.
- The UI reflects the current boosts and next spin cost accurately.
