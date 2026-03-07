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

### Character characterData Object

The character characterData object (Stored in `js/Black Heart/blackHeart.js`, under the startData function and characterData object), stores whether the character is selected, the characters currently selected skills, how many skill points the character has consumed to equip skills, and temp stat values. The objects name should be the characters id in string format. You generally want to already have their initial skill equipped in the start data to prevent confusion.

Character characterData objects should be formatted like this:

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



### Stage Layer Connections

The stage layer needs to be connected to multiple places in order to function.
1. First is adding the layer id to the innerNodes array at the top of the black heart layer in `js/Black Heart/blackHeart.js`.
2. Second is embedding the layer into black heart layers stage microtabs. (Just copy one of the other ones and replace the id)
3. Third is adding the layer id to one of black heart universes tree arrays in `js/technical/uniSupport.js`.
4. Last is adding the file location of the file holding the layer to `mod.js`'s modFiles array.

### Black Heart Currencies



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
