# Technical Specification: Spin the Wheel

## Technical Context
- **Language/Version**: JavaScript (ES6+).
- **Primary Dependencies**: The Prestige Tree (TMT) framework, `Decimal.js`.

## Technical Implementation Brief
The "Spin the Wheel" feature will be implemented as a specialized `clickable` in the `wof` layer. 

- **Animation Engine**: Instead of CSS transitions, we will use the layer's `update(delta)` function to manipulate `player.wof.rotation` and `player.wof.velocity`. This allows for precise control over the spin duration and landing point.
- **Weighted Randomness**: When a spin starts, a target segment will be chosen based on weights. The total rotation required to land on that segment (including multiple full circles) will be calculated.
- **Friction Model**: The `velocity` will decrease over time using a friction coefficient until it reaches zero.
- **Rendering**: The wheel will be visually represented using a CSS `conic-gradient` for the segments and a `rotate()` transform for the animation.

## Source Code Structure
- `js/Zar/wheelOfFortune.js`: Main implementation file.
- `css/style.css` (optional): Any complex styles if needed, though most will be inline or in `nodeStyle`.

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
