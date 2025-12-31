# Feature Specification: Nox Boss Visual & Attack Overhaul

The Nox boss (Vampire Knight) needs a visual and mechanical upgrade to better fit its theme. This includes a transition from a simple glowing orb to a fully animated vampire figure, a thematic transformation into a bat during certain attacks, and a more impressive "massive sword" attack.

## User Stories

### User Story 1 - Vampire Visuals
**As a player**, I want the Nox boss to look like a thematic vampire knight instead of a simple orb, so that the boss fight feels more immersive and unique.

**Acceptance Scenarios**:
1. **Given** the Nox boss is spawned, **When** it is in its idle or standard attack state, **Then** it should be rendered as a humanoid figure with a flapping cape and subtle animations.
2. **Given** the Nox boss is active, **When** it moves or idles, **Then** it should have "breathing" and "pulsing" visual effects.

### User Story 2 - Bat Transformation
**As a player**, I want the boss to transform into a bat when it performs its circling attack, so that its movements feel more natural and thematic.

**Acceptance Scenarios**:
1. **Given** the Nox boss starts the `batCircle` attack, **When** the attack is active, **Then** the boss should render as a bat instead of a vampire knight.
2. **Given** the `batCircle` attack ends, **When** the boss returns to its next state, **Then** it should transform back into the vampire knight.

### User Story 3 - Massive Sword Attack
**As a player**, I want the sword attack to feel impactful, with a large, recognizable sword projectile that persists and bounces around the arena.

**Acceptance Scenarios**:
1. **Given** the Nox boss uses the `spinSword` attack, **When** the attack is triggered, **Then** it should spawn one massive, spinning sword projectile.
2. **Given** the massive sword is active, **When** it hits the arena bounds, **Then** it should bounce and continue moving for approximately 10 seconds.

---

## Requirements

### R1: Animated Vampire Knight Sprite
-   Replace the current orb drawing logic in `enemyTypes.noxBoss.draw`.
-   Implement a humanoid figure with:
    -   A dark, flapping cape (animated via sine wave).
    -   A simple head/body structure.
    -   Pulsing red glow/breathing effect.
    -   Floating movement (bobbing up and down).

### R2: Bat Transformation during `batCircle`
-   Modify the `draw` function of `noxBoss` to check for the `_batTimer`.
-   If `_batTimer > 0`, render a bat sprite instead of the vampire knight.
-   The bat should have flapping wings.

### R3: Persisting Massive Sword
-   Modify the `spinSword` attack in `BloodArena.update`.
-   Update the projectile creation to set a longer life (e.g., 600 frames = 10s at 60fps).
-   Scale the `radius` of the sword bullet significantly.
-   Implement bouncing logic for projectiles with the `sword` flag in `SpaceArena.update` (or specifically for this bullet).
-   Implement custom drawing for `sword` projectiles in `SpaceArena.draw` (or a dedicated draw helper in `BloodArena`) to make it look like a large, spinning metallic sword.

## Success Criteria
-   Nox boss no longer looks like a red orb in any state.
-   Nox transforms into a bat during the circling attack.
-   The sword attack produces a large, spinning sword that bounces off walls and lasts for 10 seconds.
-   All animations are smooth and don't cause performance regressions.
