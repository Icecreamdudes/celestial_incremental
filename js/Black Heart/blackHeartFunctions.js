function celestialiteAction(slot) {
    let action = BHC[player.bh.celestialite.id].actions[slot]
    switch(action.type) {
        case "damage":
            // Multi-hit modifier
            let hitAmt = action.properties["multi-hit"] ?? 1
            for(let i = 0; i < hitAmt; i++) {
                let target = Math.floor(Math.random()*3)
                // Shield Calc
                if (player.bh.characters[target].shield.gt(0)) {
                    player.bh.characters[target].shield = player.bh.characters[target].shield.sub(1)
                    logPrint("<span style='color: #8b0e7a'>Shield blocked damage towards" + BHP[target].name + ".")
                    continue
                }

                // =-- Damage Modifiers --=
                let damage = action.value.mul(Decimal.add(0.85, Decimal.mul(Math.random(), 0.3)))
                let str = ""
                if (action.properties) {
                    // Crit Modifier
                    if (action.properties["crit"] && Decimal.lte(action.properties["crit"][0], Math.random())) {
                        damage = damage.mul(action.properties["crit"][1])
                        str = str + "<span style='color:red'>[CRIT] </span>"
                    }
                }

                // =-- Character Modifiers --=
                // Defense Calc
                damage = damage.div(Decimal.div(100, Decimal.add(100, player.bh.characters[target].defense)))

                // Damage Application
                player.bh.characters[target].health = player.bh.characters[target].sub(damage)
                logPrint(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " attacks " + BHP[target].name + " for " +format(damage) + " damage.")
            }
            break;
        case "heal":
            // Multi-heal modifier
            let healAmt = action.properties["multi-heal"] ?? 1
            for(let i = 0; i < healAmt; i++) {
                // =-- Heal Modifiers --=
                let heal = action.heal.mul(Decimal.add(0.85, Decimal.mul(Math.random(), 0.3)))
                let str = ""

                if (action.properties) {
                    // Crit Modifier
                    if (action.properties["crit"] && Decimal.lte(action.properties["crit"][0], Math.random())) {
                        heal = heal.mul(action.properties["crit"][1])
                        str = str + "<span style='color:red'>[CRIT] </span>"
                    }
                }

                // =-- Heal Application --=
                player.bh.celestialite.health = player.bh.celestialite.health.add(heal).min(player.bh.celestialite.maxHealth)
                logPrint(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " healed itself for " +format(heal) + " health.")
            }
            break;
        case "buff":
            
            break;
        case "reset":

            break;
    }
    player.bh.celestialite.actions[slot].cooldown = new Decimal(0)
}