# Feature development workflow

---

## Workflow Steps

### [x] Step: Requirements

Your job is to generate a Product Requirements Document based on the feature description,

First, analyze the provided feature definition and determine unclear aspects. For unclear aspects: - Make informed guesses based on context and industry standards - Only mark with [NEEDS CLARIFICATION: specific question] if: - The choice significantly impacts feature scope or user experience - Multiple reasonable interpretations exist with different implications - No reasonable default exists - Prioritize clarifications by impact: scope > security/privacy > user experience > technical details

Ask up to 5 most priority clarifications to the user. Then, create the document following this template:

```
# Feature Specification: [FEATURE NAME]


## User Stories*


### User Story 1 - [Brief Title]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

## Requirements*

## Success Criteria*

```

Save the PRD into `d:\Users\Axl Su\Documents\celestial_incremental\.zencoder\chats\d4e4e092-59d2-4145-a0bd-acffe5d9f566/requirements.md`.

### [x] Step: Technical Specification
Based on the PRD in `d:\Users\Axl Su\Documents\celestial_incremental\.zencoder\chats\d4e4e092-59d2-4145-a0bd-acffe5d9f566/requirements.md`, create a detailed technical specification to be used by a coding agent to implement the feature.

### [x] Step: Implementation Plan
Based on the technical spec in `d:\Users\Axl Su\Documents\celestial_incremental\.zencoder\chats\d4e4e092-59d2-4145-a0bd-acffe5d9f566/spec.md`, create a detailed task plan and update `d:\Users\Axl Su\Documents\celestial_incremental\.zencoder\chats\d4e4e092-59d2-4145-a0bd-acffe5d9f566/plan.md`.

### [x] Step: Implement Animated Vampire Boss
Modify `js/DarkU1/blood.js` to replace the orb visual with an animated vampire and implement the bat transformation during `batCircle`.

### [x] Step: Implement Massive Bouncing Sword
Modify `js/DarkU1/blood.js` and `js/AltU2/iridite.js` to implement the massive spinning sword projectile with bouncing physics.
