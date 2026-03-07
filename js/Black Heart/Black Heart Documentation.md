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

- color: Stores the color used for the characters skills and action messages.

- icon: Stores the file location of the characters image.

All base stats can be either a function, or a Decimal object. They also can all be optional, and will be set to 0 if not set.

Stats:

- health: Base character max health

- damage: Base character damage

- defense: Base character defense

- regen: Base character regen (in amount per second)

- agility: Base character agility

- luck: Base character luck

Stats past this point are unlocked later into the game:

- mending: Base character mending



## Stages

