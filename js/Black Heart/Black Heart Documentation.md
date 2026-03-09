# Black Heart

Welcome to the documentation for Black Heart. I have tried to make it as easy to understand/handle as possible, but I am just one person, so ... yeah. I have split this into the different categories, from smallest to biggest.



## Characters

Character information is stored in two locations. First is the static object, which has information that is **not saved**. Second is the characterData object that stores general saved character data.

### Character Static Object

The character static object (Usually stored in `js/Black Heart/characters.js`), stores the name, color, icon, and base stats of a character. The objects name will be the id generally used for that character. All character static objects are put into the main object BHP to allow for easy access across files.

Character static objects should be formatted like this:

```js
BHP.general = {
    name: "Player",
    color: "#666",
    icon: "resources/player.png",
    health() {return player.ir.iriditeDefeated ? new Decimal(100) : new Decimal(80)},
    damage: new Decimal(10),
    defense: new Decimal(10),
    regen: new Decimal(1),
    agility: new Decimal(10),
    luck: new Decimal(10),
    mending: new Decimal(0),
}
```

Features:

- name: Stores the characters name in string format.

- color: Stores the color used for the characters skills and action messages in string format.

- icon: Stores the file location of the characters image in string format.

All base stats can be either a function, or a Decimal object. They also can all be optional, and will be set to 0 if not set.

- health: Base character max health

- damage: Base character damage

- defense: Base character defense

- regen: Base character regen (in health per second)

- agility: Base character agility

- luck: Base character luck

Stats past this point are unlocked later into the game:

- mending: Base character mending

### characterData Object

The characterData object (Stored in `js/Black Heart/blackHeart.js`, under the startData function and characterData object), stores whether the character is selected, the characters currently selected skills, how many skill points the character has consumed to equip skills, and temp stat values. The objects name should be the characters id in string format. You generally want to already have their initial skill equipped in the start data to prevent confusion.

characterData objects should be formatted like this:

```js
"general": {
    selected: false,
    skills: {
        0: "general_slap",
        1: "none",
        2: "none",
        3: "none",
    },
    usedSP: new Decimal(6),
    health: new Decimal(100),
    damage: new Decimal(10),
    defense: new Decimal(10),
    regen: new Decimal(1),
    agility: new Decimal(10),
    luck: new Decimal(10),
    mending: new Decimal(0),
},
```

Features:

- selected: Decides whether the character is currently selected or not. Stored in boolean format.

- skills: Object that decides what skills are in each slot. Stored as a string. If no skill is equipped, the value should be "none".

- usedSP: Variable used to store how many skill points have been consumed by equipping skills. Stored in Decimal format.

After this point are just variables to store temporary stat values.

- health: Stores temporary health value

- damage: Stores temporary damage value

- defense: Stores temporary defense value

- regen: Stores temporary regen value

- agility: Stores temporary agility value

- luck: Stores temporary luck value

- mending: Stores temporary mending value



## Stages

Stage information is stored in both its relevant layer, and a static stage object. On top of that, the layer has to be connected to multiple parts in order for it to show up. I also made a section explaining how to add currencies.

### Stage Layer

I'd recommend you to copy one of the other layers, and replace what you need to replace. Even so, I will explain some important aspects used in the stage layers:

startData Variables:

- highestCombo: If added to startData, it will automatically update whenever you reach a combo value higher then the current value in highestCombo while in that stage.

- comboStart: If added to startData, you will start at that combo value when entering your stage.

- milestone: An object holding combo milestones. The id is the combo value that the milestone triggers at, and the variable is the tier of the milestone. (tiers are decided by how many characters you currently have when you reach that milestone)

Other stuff:

- BHStageEnter(id): This function puts you into your stage. The id is the same as the layer id of the stage.

- bh-milestone: A custom layer component that simplifies adding the fancy milestones. First value is the combo milestone value, second is the stage id, and third is additional text you might want to add to the milestone.

### Stage Layer Connections

The stage layer needs to be connected to multiple places in order to function.
1. First is adding the layer id to the innerNodes array at the top of the black heart layer in `js/Black Heart/blackHeart.js`.
2. Second is embedding the layer into black heart layers stage microtabs. (Just copy one of the other ones and replace the id)
3. Third is adding the layer id to one of black heart universes tree arrays in `js/technical/uniSupport.js`.
4. Last is adding the file location of the file holding the layer to `mod.js`'s modFiles array.

### Stage Static Object

The stage static object (Usually stored in corresponding layer files in `js/Black Heart/`), store the stages name, music location, properties, and celestialite choice code. The objects name will be the same as the stage layer id. All stage objects are put into the main object BHS to allow for easy access across files.

Stage static objects should be formatted like this:

```js
BHS.template = {
    nameCap: "Stage template",
    nameLow: "stage template",
    music: "music/enteringBlackHeart.mp3",
    comboLimit: 500,
    comboScaling: 1.015,
    comboScalingStart: 100,
    healthDrain: new Decimal(1),
    timer: new Decimal(300),
    timeStagnation: true,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 24:
                return "template"
            default:
                let random = Math.random()
                let cel = ["template", "template", "template"]
                if (combo >= 25) cel.push("template")
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}
```

Features:

- nameCap: Stage name with the start capitalized in string format

- nameLow: Stage name with the start uncapitalized in string format

- music: Stage music file location stored in string format

- comboLimit: Decides what combo value the stage ends at. Stored in number format.

- comboScaling: *optional* Decides how much the celestialite stat softcap increases per round multiplicatively. Stored in number format.

- comboScalingStart: *optional* Decides what combo value combo scaling starts. Stored in number format.

- healthDrain: *optional* Decides how much character health is drained by per second. Stored in Decimal format.

- timer: *optional* *unadded* Decides how long until the stage automatically kills you.

- timeStagnantion: *optional* Decides if the stage property "Time Stagnation" is active. Stored as a boolean.

- generateCelestialite(combo): Function that is called to decide what celestialite will be generated while in this stage. Should return a string of the celestialites id.

### Black Heart Currencies

In order to add a black heart currency as a celestialite reward, you need add code to handle giving it as a reward from a celestial. This is done in `js/Black Heart/blackHeartFunctions.js` at the `celestialReward()` function. Below is an example of what would be added to that function.

```js
if (gain.darkEssence) {
    player.bh.darkEssence = player.bh.darkEssence.add(gain.darkEssence).mul(generalMult).floor()
    bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.darkEssence) + " dark essence! (You have " + formatWhole(player.bh.darkEssence) + ")")
}
```



## Skills

Skills are split into two parts. First is the skill static object, which holds the majority of information relating to the skill. Second is the skillData object, which holds saved data for the skill. The skill static object also holds an action that is triggered, which the functions behind that will be in its own category, as both skills and celestialite attacks use the same code.

### skillData Object

The skillData object (Stored in `js/Black Heart/blackHeart.js`, under the startData function and skillData object), is an object that stores if a skill has been selected (and where it was selected), its current level, and its max level. They are all exactly the same except for their ids, which are the same as the skill id. Below is an example of a skillData object:

```js
"general_slap": {selected: ["none", 0], level: new Decimal(0), maxLevel: new Decimal(0)},
```

If you make a skill be equipped at the start for a character, you will need to change the `"none"` in selected to the relevant character id.

### Skill Static Object

The skill static object (usually stored in `js/Black Heart/skills.js`), stores the majority of the information that makes your skills work. The objects name will be the skills id. All skills are put into the main object BHA to allow for easy access across files.

Skill static objects should be formatted like this:

```js
BHA.general_slap = {
    name: "Slap",
    description() {return "Deals " + formatWhole(new Decimal(75).add(player.bh.skillData["general_slap"].level.mul(15))) + "% physical damage and soft-stuns the celestialite for a second."},
    passiveText() {return "+" + formatSimple(player.bh.skillData["general_slap"].maxLevel.div(5)) + " DMG"},
    char: "general",
    spCost: new Decimal(6),
    curCostBase: new Decimal(3),
    curCostScale: new Decimal(3),
    currency: "darkEssence",
    unlocked() {return hasUpgrade("depth1", 4)},

    // PUT ACTION CODE HERE
}
```

Features:

- name: Name of the skill, in string format.

- description: The description of what the skill does. Used in tooltips and on the skills page. Usually a function.

- passiveText: The text that describes the passive effect of the skill. Usually a function.

- char: The character id for the skill. If the skill is able to be used by all characters, the id should be set to `"general"`

- spCost: The base skill point cost of the skill, in Decimal format.

- curCostBase: The base cost of increasing the max level of the skill, in Decimal format.

- curCostScale: The amount the cost is multiplied by per level when increasing the max level of the skill, in Decimal format.

- currency: The currency used for increasing the max level of the skill. Calls an id that is in the `BH_CURRENCY` object in `js/Black Heart/blackHeart.js`

- unlocked: Decides whether the skill is currently unlocked or not (Works the same as components)

After this is putting in an action for the skill to do. Action code is described in a seperate section, as it is used for both skills and celestialite attacks.

### Skill Level Up Currency Array

In `js/Black Heart/blackHeart.js`, there is an object named `BH_CURRENCY`. That object defines the currencies that you can use for increasing the max level of skills. Within the object are keys holding arrays that are named after the variable of that currency. Within those arrays are two properties. The first property holds the display text for the currency. The second holds the layer id for where the currency is.



## Celestialites

Celestialites are all one simple object. The objects name is used as the celestialites id, and is put into the BHC object for easy access across files. Action and attribute code is seperated into its own categories due to it being used in multiple places. Below is an example of a celestialite object:

```js
BHC.lesserAlpha = {
    name: "Celestialite Lesser Alpha",
    symbol: "⇓α",
    style: {
        background: "linear-gradient(90deg, #830000, #DE0000)",
        color: "black",
        borderColor: "#430001",
    },
    health: new Decimal(70),
    damage: new Decimal(6),
    attributes: {
        // ATTRIBUTE CODE HERE
    },
    actions: {
        0: {
            // ACTION CODE HERE
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.gloomingUmbrite = Decimal.add(8, getRandomInt(5))
        } else {
            gain.dimUmbrite = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}
```

Features:

- name: The display name of the celestialite, in string format.

- symbol: The symbol used on the celestialites icon, in string format. (Replaced if icon parameter is used)

- icon: Overrides the symbol parameter to instead display an image for the celestialites icon. Stored as the file path in string format.

- style: Changes the CSS style of the celestialite icon. (Using the usual object format)

- noRandomStats: A boolean that prevents the slight randomization of celestialite stats.

- immortal: A boolean that prevents death via the celestialite reaching zero health. Generally used to prevent the celestialite from dying before doing a "final attack".

- Most stats can be applied to the celestialite, not going to list all the stats.

- attributes: *optional* An object that holds attributes for the celestialite to start with. Attributes are listed in a seperate section.

- actions: An object that holds actions for the celestial to use. You can give a celestialite up to 4 actions, with each action object being named 0-3.

- reward(): A function that decides what rewards the celestialite will give. Needs to return an object with keys using the id's of black heart currencies (Described as a category under stages)

- onSpawn(): *optional* A function that triggers on the spawn of the celestialite.

- onDeath(): *optional* A function that triggers on the death of the celestialite.



## Attributes

Attributes are used to give a character/celestialite a non-action specific effect. They can either start with an attribute, or have it be given via an action. Attributes have a value that allow you to modify the effects of the attribute. Below is a list of the attributes:

- Air ≋ - Multiplies incoming melee damage by the attribute value.

- Warded ⬢ - Multiplies incoming magic damage by the attribute value.

- Stealthy ☉ - Multiplies incoming ranged damage by the attribute value.

- Berserk ✹ - Actions always give self damage equal to the attribute value.

- Rebound ⭟ - When attacked, the damage multiplied by the attribute value is also dealt to the attacker.

- Explosive ✺ - Explodes upon death, dealing the attribute value worth of damage to all characters.

- Taunt ✛ - Directs some actions towards themselves. (Value does nothing)

- Daze ꩜ - All actions have a chance to miss, decided by the attribute value and the character/celestialites luck.

Below is an example of an object that gives attributes:

```js
attributes: {
    "air": new Decimal(0.2),
    "warded": new Decimal(0.2),
    "stealthy": new Decimal(0.2),
}
```



## Actions

Actions are the lifeblood of black heart. They are what make skills and celestialite attacks work. They aren't insanely complex, as long as you follow the existing features.

Instant action example:

```js
instant: true,
type: "damage",
target: "celestialite",
method: "physical",
properties: {
    "stun": [new Decimal(1), "soft", new Decimal(1)], // Chance / Stun-Type / Stun-Time
},
value() {return new Decimal(0.75).add(player.bh.skillData["general_slap"].level.mul(0.15))},
cooldown: new Decimal(10),
cooldownCap: new Decimal(4),
```

Traditional active action example:

```js
active: true,
constantType: "effect",
constantTarget: "allPlayer",
effects: {
    "attributes"() {return {"rebound": new Decimal(0.5).add(player.bh.skillData["nav_reboundingAura"].level.mul(0.1))}},
},
cooldown: new Decimal(30),
duration: new Decimal(10),
cooldownCap: new Decimal(5),
```

Interval active action example: (Interval actions are active actions that trigger an instant action on an interval)

```js
active: true,
constantType: "damage",
target: "celestialite",
method: "ranged",
value() {return new Decimal(0.2).add(player.bh.skillData["sel_turret"].level.mul(0.04))},
interval: new Decimal(0.5),
duration: new Decimal(12),
cooldown: new Decimal(30),
cooldownCap: new Decimal(6),
```

Passive action example:

```js
passive: true,
constantType: "effect",
constantTarget: "celestialite",
effects: {
    "regenAdd"(char) {
        let damage = char.damage.mul(Decimal.sub(-0.1, player.bh.skillData["eclipse_drain"].level.mul(0.02)))
        damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.defense)))
        return damage
    }, // Multiplicative Effect
},
cooldown: new Decimal(Infinity),
```

Celestialite exclusive features:

- 

Regular features:

- name: *Celestialite Exclusive* Declares the name of the action. Formatted as a string.

- instant: Declares that the action activates an instant action. Formatted as a boolean.

- active: Declares that the action activates an active action. Formatted as a boolean. (aka, an action with a duration)

- passive: Declares that the action activates a passive action. Formatted as a boolean.

- type: Declares the type of the instant action that will be done. Formatted as a string.
- constantType: Declares the type of the active/passive action that will be done. Formatted as a string.
Below is the potential types:

1. damage: Handles instant damage actions.

2. heal: Handles instant heal actions.

3. effect: Handles giving/taking attributes and stats for all action variants. (Most active/passive skills will be effect)

4. reset: Handles the instant action of resetting all skill cooldowns for a target

5. cooldown: Handles the instant action of giving time to all skill cooldowns for a target.

6. shield: Handles instant shield actions.

7. function: Handles instant custom function actions.

- target: Declares the target of the instant action. Formatted as a string.
- constantTarget: Declares the target of the active/passive action. Formatted as a string.
Below is the potential targets:

1. randomPlayer: Picks a random character, excluding the celestialite.

2. random: Picks randomly between both the characters and the celestialite.

3. self: Picks the one doing the action.

4. celestialite: Picks the celestialite.

5. allPlayer: Picks all players.

6. all: Picks all players and the celestialite.

- method: Used when the type is damage to decide what type of damage the action will deal. The potential types are "physical", "ranged", "magic", and "spirit".

- value: Used to decide damage/heal/cooldown/shield values. Formatted as a Decimal object. Can be a function.

- cooldown: Used to decide the base cooldown for the action. Formatted as a Decimal object. (Put as Infinity if passive)

- cooldownMax: Used to decide the lowest possible cooldown for the action. Formatted as a Decimal object.

- duration: Used to decide how long an active skill will last after being activated. Formatted as a Decimal object.

- interval: Used to decide how often an interval active skill will trigger (in seconds). Formatted as a Decimal object.

- stun: Used to stun and delay the activation of a skill. Formatted as shown below:
`[type ("soft" or "hard"), time (Decimal object in seconds), current skill slot (regular number)]`

Since it is confusing, here is an example:
```js
stun() {return ["soft", new Decimal(8).sub(player.bh.skillData["eclipse_lightBarrier"].level.modulo(5).div(2)), player.bh.skillData["eclipse_lightBarrier"].selected[1]]},
```

- actionChance: Gives a chance for a passive to trigger an active effect when an action is used. Formatted as a Decimal object.

- condtional: Prevents an instant/active action from being triggered until the condition returns true. Formatted as a function with the parameters index and slot.

- onTrigger: Function that is triggered when type is function. Formatted as a function with the parameters index, slot, and target. (The parameter magnitude is added if the time stagnation stage property is active)

- properties: Object that describes the properties of an instant action. Below are the potential properties:

1. 

- effects: Object that describes the effects of an active/passive skill with the typing of "effect". Below are the potential effects:

1. 