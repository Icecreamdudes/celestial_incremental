# Black Heart

Welcome to the documentation for black heart. I have tried to make it as easy to understand/handle as possible, but I am just one person, so ... yeah. I have split this into the different categories, from smallest to biggest.



## Characters

Character objects (Usually stored in `js/Black Heart/characters.js`), store the name, color, icon, and base stats of a character. The objects name will be the id generally used for that character. All character objects are put into the main object BHP to allow for easy access across files.

Characters should be formatted like this:

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



## Stages

Stage objects (Usually stored in corresponding layer files in `js/Black Heart/`), store the stages name, music location, properties, and celestialite choice code. The objects name will be the same as the `player.bh.currentStage` id for the stage. All stage objects are put into the main object BHS to allow for easy access across files.

Stages should be formatted like this:

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