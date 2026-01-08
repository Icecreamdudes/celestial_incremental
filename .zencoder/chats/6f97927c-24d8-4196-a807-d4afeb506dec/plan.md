# Feature development workflow

---

## Workflow Steps

### [x] Step: Requirements
Your job is to generate a Product Requirements Document based on the feature description,

First, analyze the provided feature definition and determine unclear aspects. For unclear aspects: - Make informed guesses based on context and industry standards - Only mark with [NEEDS CLARIFICATION: specific question] if: - The choice significantly impacts feature scope or user experience - Multiple reasonable interpretations exist with different implications - No reasonable default exists - Prioritize clarifications by impact: scope > security/privacy > user experience > technical details

Ask up to 5 most priority clarifications to the user. Then, create the document following this template:

```
# Feature Specification: Spin the Wheel

## User Stories*

### User Story 1 - Spinning the Wheel
**Acceptance Scenarios**:
1. **Given** the user is on the Wheel of Fortune tab, **When** they click the wheel clickable, **Then** the wheel should spin with a smooth animation and stop on a random segment.
2. **Given** the wheel has stopped on a segment, **When** the spin completes, **Then** the corresponding boost should be applied to the player's stats.

---

## Requirements*
- Large clickable wheel component.
- Smooth CSS/JS spinning animation.
- Dynamic segments (Chance Points Multiplier, Softcap Extension, Heads Multiplier, Tails Multiplier).
- Easy configuration for adding/removing segments via code.
- Boolean-based visibility for segments.

## Success Criteria*
- Wheel spins correctly upon clicking.
- Boosts are correctly applied and updated.
- Adding a new boost type requires minimal code changes.
```

Save the PRD into `d:\Users\Axl Su\Documents\celestial_incremental\.zencoder\chats\6f97927c-24d8-4196-a807-d4afeb506dec/requirements.md`.

### [x] Step: Technical Specification
Based on the PRD in `d:\Users\Axl Su\Documents\celestial_incremental\.zencoder\chats\6f97927c-24d8-4196-a807-d4afeb506dec/requirements.md`, create a detailed technical specification to be used by a coding agent to implement the feature. Follow this template:

```
# Technical Specification: Spin the Wheel

## Technical Context
- Language/Version: JavaScript (ES6+).
- Primary Dependencies: The Prestige Tree (TMT) framework, `Decimal.js`.

## Technical Implementation Brief
The "Spin the Wheel" feature will be implemented as a specialized `clickable` in the `wof` layer. 

- **Animation Engine**: Instead of CSS transitions, we will use the layer's `update(delta)` function to manipulate `player.wof.rotation` and `player.wof.velocity`. This allows for precise control over the spin duration and landing point.
- **Weighted Randomness**: When a spin starts, a target segment will be chosen based on weights. The total rotation required to land on that segment (including multiple full circles) will be calculated.
- **Friction Model**: The `velocity` will decrease over time using a friction coefficient until it reaches zero.
- **Rendering**: The wheel will be visually represented using a CSS `conic-gradient` for the segments and a `rotate()` transform for the animation.

## Source Code Structure
- `js/Zar/wheelOfFortune.js`: Main implementation file.

## Contracts
### Data Model (`player.wof`)
```javascript
{
    rotation: 0,        // Current angle in degrees
    velocity: 0,        // Current angular velocity (deg/s)
    isSpinning: false,  // Is the wheel currently spinning?
    spinCost: Decimal,  // Cost of the next spin
    wheelBonuses: [],   // Array of counts for each reward type
}
```

### Segment Definition
```javascript
const WHEEL_SEGMENTS = [
    { 
        id: "cp_mult_small", 
        name: "CP Multiplier (Small)", 
        weight: 10, 
        type: "cp_mult", 
        value: 1.1, 
        unlocked: () => true 
    },
    // ...
]
```

## Delivery Phases
1. **Phase 1: Foundation**: Set up `startData`, constants, and the basic clickable (non-spinning).
2. **Phase 2: Animation & Physics**: Implement the spinning logic in `update(delta)`.
3. **Phase 3: Reward System**: Implement the weighted random selection and reward application.
4. **Phase 4: UI/UX Refinement**: Improve visuals, segment labels, and cost display.

## Verification Strategy
- **Verification 1**: Check `player.wof` state in console after clicking.
- **Verification 2**: Verify `update` loop correctly modifies `rotation`.
- **Verification 3**: Ensure `spinCost` is deducted and increased.
- **Verification 4**: Confirm boosts are applied to player stats (e.g., `player.za.chancePointsPerSecond`).
```

Save the spec to `d:\Users\Axl Su\Documents\celestial_incremental\.zencoder\chats\6f97927c-24d8-4196-a807-d4afeb506dec/spec.md`.

### [x] Step: Implementation Plan
Based on the technical spec in `d:\Users\Axl Su\Documents\celestial_incremental\.zencoder\chats\6f97927c-24d8-4196-a807-d4afeb506dec/spec.md`, create a detailed task plan and update `d:\Users\Axl Su\Documents\celestial_incremental\.zencoder\chats\6f97927c-24d8-4196-a807-d4afeb506dec/plan.md`. Each task should have task definition, references to contracts to be used/implemented, deliverable definition and verification instructions.

Format each task as

```
### [ ] Step: <task_name>
Task instructions
```

### [x] Step: Phase 1 - Foundation
- Update `startData` in `js/Zar/wheelOfFortune.js` with `rotation`, `velocity`, `isSpinning`.
- Initialize `wheelBonuses` with zeros for each reward type.
- Define `WHEEL_SEGMENTS` constant with 8 segments (4 common, 4 rare).
- Add a basic `clickable` that deducts `spinCost` and sets `isSpinning` to true.

### [x] Step: Phase 2 - Animation & Physics
- Implement `update(delta)` logic:
    - If `isSpinning`, increase `rotation`.
    - Apply deceleration/friction to `velocity`.
    - Stop when `velocity` is near zero.
- Add visual rotation to the clickable via `nodeStyle` transform.

### [x] Step: Phase 3 - Reward System
- Implement weighted random selection of a target segment at the start of the spin.
- Calculate required initial velocity or target rotation to land on the selected segment.
- Implement `onSpinComplete` to apply rewards and increment `spinCost`.
- Integrate rewards into global stat calculations (CP, Softcap, Coins).

### [x] Step: Phase 4 - UI/UX Refinement
- Use `conic-gradient` to color segments.
- Display current boosts and next spin cost in the tab.
- Add segment labels if possible or a clear indicator of what the wheel landed on.

