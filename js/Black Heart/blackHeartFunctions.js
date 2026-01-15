function bhAction(index, slot) {
    let action
    let target
    if (index == 3) {
        player.bh.celestialite.actions[slot].cooldown = new Decimal(0)
        action = BHC[player.bh.celestialite.id].actions[slot]
    } else {
        player.bh.characters[index].skills[slot].cooldown = new Decimal(0)
        action = BHA[player.bh.characters[index].skills[slot].id]
    }
    target = action.target
    switch(action.type) {
        case "damage":
            // Multi-hit modifier
            let hitAmt = action.properties["multi-hit"] ?? 1
            for(let i = 0; i < hitAmt; i++) {
                if (i > 0) setTimeout(() => {
                    let damage
                    let str = ""

                    // =-- Target Change Modifiers --=

                    // =-- Damage Value --=
                    if (index == 3) {
                        damage = action.value.mul(player.bh.celestialite.damage)
                    } else {
                        damage = action.value.mul(player.bh.characters[index].damage)
                    }

                    // =-- Properties --=
                    if (action.properties) {
                        // Crit Modifier
                        if (action.properties["crit"] && Decimal.lte(action.properties["crit"][0], Math.random())) {
                            damage = damage.mul(action.properties["crit"][1])
                            str = str + "<span style='color:#faa'>[CRIT] </span>"
                        }

                        // Backfire (Keep at end of properties)
                        if (action.properties["backfire"] && Decimal.lte(action.properties["backfire"][0], Math.random())) {
                            let bfStr = str + "<span style='color:red'>[BACKFIRE] </span>"
                            let newTarget = ""
                            if (target == "self") newTarget = "celestialite"
                            if (target == "celestialite") newTarget = "randomPlayer"
                            bhAttack(damage.mul(action.properties["backfire"][1]), index, newTarget, bfStr)
                        }
                    }

                    // =-- Apply Damage --=
                    bhAttack(damage, index, target, str)
                }, 200*i)
            }
            break;
        case "heal":
            // Multi-heal modifier
            let healAmt = action.properties["multi-heal"] ?? 1
            for(let i = 0; i < healAmt; i++) {
                if (i > 0) setTimeout(() => {
                    let heal = action.heal.mul(Decimal.add(0.85, Decimal.mul(Math.random(), 0.3)))
                    let str = ""

                    // =-- Target Change Modifiers --=

                    // =-- Heal Modifiers --=
                    if (action.properties) {
                        // Crit Modifier
                        if (action.properties["crit"] && Decimal.lte(action.properties["crit"][0], Math.random())) {
                            heal = heal.mul(action.properties["crit"][1])
                            str = str + "<span style='color:red'>[CRIT] </span>"
                        }

                        // Backfire (Keep at end of properties)
                        if (action.properties["backfire"] && Decimal.lte(action.properties["backfire"][0], Math.random())) {
                            let bfStr = str + "<span style='color:red'>[BACKFIRE] </span>"
                            let newTarget = ""
                            if (target == "self") newTarget = "celestialite"
                            if (target == "celestialite") newTarget = "randomPlayer"
                            bhHeal(heal.mul(action.properties["backfire"][1]), index, newTarget, bfStr)
                        }
                    }

                    // =-- Heal Application --=
                    bhHeal(heal, index, target, str)
                }, 200*i)
            }
            break;
        case "effect":
            // =-- Target Change Modifiers --=

            // =-- Add/Mult Variable Effect --=
            for (let i in action.properties) {
                let val = action.properties[i]
                let perc = i.includes("Mult")
                let name = ""
                if (perc) {
                    name = i.slice(0, i.indexOf("M"))
                } else {
                    name = i.slice(0, i.indexOf("A"))
                }
                if (input == 3) {
                    if (perc) {
                        if (!player.bh.celestialite.actions[slot].variables[i]) player.bh.celestialite.actions[slot].variables[i] = new Decimal(1)
                        player.bh.celestialite.actions[slot].variables[i] = player.bh.celestialite.actions[slot].variables[i].mul(val)
                    } else {
                        if (!player.bh.celestialite.actions[slot].variables[i]) player.bh.celestialite.actions[slot].variables[i] = new Decimal(0)
                        player.bh.celestialite.actions[slot].variables[i] = player.bh.celestialite.actions[slot].variables[i].add(val)
                    }
                    player.bh.celestialite.actions[slot].variables.target = target
                } else {
                    if (perc) {
                        if (!player.bh.celestialite.actions[slot].variables[i]) player.bh.celestialite.actions[slot].variables[i] = new Decimal(1)
                        player.bh.celestialite.actions[slot].variables[i] = player.bh.celestialite.actions[slot].variables[i].mul(val)
                    } else {
                        if (!player.bh.celestialite.actions[slot].variables[i]) player.bh.celestialite.actions[slot].variables[i] = new Decimal(0)
                        player.bh.celestialite.actions[slot].variables[i] = player.bh.celestialite.actions[slot].variables[i].add(val)
                    }
                    player.bh.characters[input].skills[slot].variables.target = target
                }
                bhEffectText(name, val, index, target, perc)
            }
            break;
        case "reset":
            let recieve
            switch (target) {
                case "randomPlayer":
                    let potTarget = []
                    for (let i = 0; i < 3; i++) {
                        if (player.bh.characters[i].health.gt(0)) potTarget.push(i)
                    }
                    rnd = potTarget[Math.floor(Math.random()*potTarget.length)]
                    recieve = rnd
                case "self": // Use when start is player
                    recieve = index
                case "celestialite":
                    recieve = 3
            }

            // Reset all other skill cooldowns
            if (recieve != 3) {
                if (slot != 0) player.bh.characters[recieve].actions[0].cooldown = BHP[player.bh.characters[recieve].id].actions[0].cooldown
                if (slot != 1) player.bh.characters[recieve].actions[1].cooldown = BHP[player.bh.characters[recieve].id].actions[1].cooldown
                if (slot != 2) player.bh.characters[recieve].actions[2].cooldown = BHP[player.bh.characters[recieve].id].actions[2].cooldown
                if (slot != 3) player.bh.characters[recieve].actions[3].cooldown = BHP[player.bh.characters[recieve].id].actions[3].cooldown
            } else {
                if (slot != 0) player.bh.celestialite.actions[0].cooldown = BHC[player.bh.celestialite.id].actions[0].cooldown
                if (slot != 1) player.bh.celestialite.actions[1].cooldown = BHC[player.bh.celestialite.id].actions[1].cooldown
                if (slot != 2) player.bh.celestialite.actions[2].cooldown = BHC[player.bh.celestialite.id].actions[2].cooldown
                if (slot != 3) player.bh.celestialite.actions[3].cooldown = BHC[player.bh.celestialite.id].actions[3].cooldown
            }
            if (index == 3) {
                if (recieve == 3) {
                    logPrint("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reset its skills.")
                } else {
                    logPrint("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reset " + BHP[player.bh.characters[recieve].id].name + "'s skills?")
                }
            } else {
                if (index == recieve) {
                    logPrint("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " reset their skills.")
                } else if (recieve != 3) {
                    logPrint("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " reset " + BHP[player.bh.characters[recieve].id].name + "'s skills.")
                } else {
                    logPrint("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " reset " + BHC[player.bh.celestialite.id].name + "'s skills?")
                }
            }
            break;
    }
}

function bhEffectText(type, val, index, target, percentage = false) {
    let sign = val.gte(0) ? ["buffed", "+"] : ["nerfed", "-"]
    let format = ""
    if (percentage) {
        format = format(val.sub(1).mul(100)) + "%."
    } else {
        format = format(val) + "."
    }
    let arr = calcTarget(index, target)
    for (let recieve of arr) {
        if (index == 3) {
            if (recieve == 3) {
                logPrint("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " " + sign[0] + " its " + type + " by " + sign[1] + format)
            } else {
                logPrint("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " " + sign[0] + " " + BHP[player.bh.characters[recieve].id] + "'s " + type + " by " + sign[1] + format)
            }
        } else {
            if (index == recieve) {
                logPrint("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " " + sign[0] + " its " + type + " by " + sign[1] + format)
            } else if (recieve != 3) {
                logPrint("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " " + sign[0] + " " + BHP[player.bh.characters[recieve].id] + "'s " + type + " by " + sign[1] + format)
            } else {
                logPrint("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " " + sign[0] + " " + BHC[player.bh.celestialite.id].name + "'s " + type + " by " + sign[1] + format)
            }
        }
    }
}

function bhAttack(damage, index, target, str = "") {
    let arr = calcTarget(index, target)
    for (let recieve of arr) {
        // Shield and Defense Calc
        if (recieve != 3) {
            // Shield Calc
            if (player.bh.characters[recieve].shield.gt(0)) {
                player.bh.characters[recieve].shield = player.bh.characters[recieve].shield.sub(1)
                logPrint("<span style='color: " + BHP[player.bh.characters[recieve].id].color + "'>Shield blocked damage towards" + BHP[player.bh.characters[recieve].id].name + ".")
                return
            }
            // Defense Calc
            damage = damage.div(Decimal.div(100, Decimal.add(100, player.bh.characters[recieve].defense)))
        } else {
            // Shield Calc
            if (player.bh.celestialite.shield.gt(0)) {
                player.bh.celestialite.shield = player.bh.celestialite.shield.sub(1)
                logPrint("<span style='color: #8b0e7a'>Shield blocked damage towards" + BHC[player.bh.celestialite.id].name + ".")
                return
            }
            // Defense Calc
            damage = damage.div(Decimal.div(100, Decimal.add(100, player.bh.celestialite.defense)))
        }
        if (index == 3) {
            if (recieve == 3) {
                player.bh.celestialite.health = player.bh.celestialite.health.sub(damage)
                logPrint(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " attacks itself for " +format(damage) + " damage?")
            } else {
                player.bh.characters[recieve].health = player.bh.characters[recieve].health.sub(damage)
                logPrint(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " attacks " + BHP[player.bh.characters[recieve].id].name + " for " +format(damage) + " damage.")
            }
        } else {
            if (index == recieve) {
                player.bh.characters[recieve].health = player.bh.characters[recieve].health.sub(damage)
                logPrint(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " attacks themself for " +format(damage) + " damage?")
            } else if (recieve != 3) {
                player.bh.characters[recieve].health = player.bh.characters[recieve].health.sub(damage)
                logPrint(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " attacks " + BHP[player.bh.characters[recieve].id].name + " for " +format(damage) + " damage?")
            } else {
                player.bh.celestialite.health = player.bh.celestialite.health.sub(damage)
                logPrint(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " attacks " + BHC[player.bh.celestialite.id].name + " for " +format(damage) + " damage.")
            }
        }
    }
}

function bhHeal(heal, index, target, str = "") {
    let arr = calcTarget(index, target)
    for (let recieve of arr) {
        if (index == 3) {
            if (recieve == 3) {
                player.bh.celestialite.health = player.bh.celestialite.health.add(heal).min(player.bh.celestialite.maxHealth)
                logPrint(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " healed itself for " +format(heal) + " health.")
            } else {
                player.bh.characters[recieve].health = player.bh.characters[recieve].health.add(heal).min(player.bh.characters[recieve].maxHealth)
                logPrint(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " healed " + BHP[player.bh.characters[recieve].id].name + " for " +format(heal) + " health?")
            }
        } else {
            if (index == recieve) {
                player.bh.characters[recieve].health = player.bh.characters[recieve].health.add(heal).min(player.bh.characters[recieve].maxHealth)
                logPrint(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " healed themselves for " +format(heal) + " health.")
            } else if (recieve != 3) {
                player.bh.characters[recieve].health = player.bh.characters[recieve].health.add(heal).min(player.bh.characters[recieve].maxHealth)
                logPrint(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " healed " + BHP[player.bh.characters[recieve].id].name + " for " +format(heal) + " health.")
            } else {
                player.bh.celestialite.health = player.bh.celestialite.health.add(heal).min(player.bh.celestialite.maxHealth)
                logPrint(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " healed " + BHC[player.bh.celestialite.id].name + " for " +format(heal) + " health?")
            }
        }
    }
}

function celestialiteReward(gain) {
    // Mult Code
    let mult = new Decimal(1)

    if (gain.commonMatosFragment) {
        player.ma.commonMatosFragments = player.ma.commonMatosFragments.add(gain.commonMatosFragment.mul(mult))
        logPrint("<span style='color: #9bedff;'>You gained " + formatWhole(gain.commonMatosFragment.mul(mult)) + " common matos fragments! (You have " + formatWhole(player.ma.commonMatosFragments) + ").")
    }
    if (gain.rareMatosFragment) {
        player.ma.rareMatosFragments = player.ma.rareMatosFragments.add(gain.rareMatosFragment.mul(mult))
        logPrint("<span style='color: #4e7cff;'>You gained " + formatWhole(gain.rareMatosFragment.mul(mult)) + " rare matos fragments! (You have " + formatWhole(player.ma.rareMatosFragments) + ").")
    }
    if (gain.epicMatosFragment) {
        player.ma.epicMatosFragments = player.ma.epicMatosFragments.add(gain.epicMatosFragment.mul(mult))
        logPrint("<span style='color: #cb79ed;'>You gained " + formatWhole(gain.epicMatosFragment.mul(mult)) + " epic matos fragments! (You have " + formatWhole(player.ma.epicMatosFragments) + ").")
    }
    if (gain.legendaryMatosFragment) {
        player.ma.legendaryMatosFragments = player.ma.legendaryMatosFragments.add(gain.legendaryMatosFragment.mul(mult))
        logPrint("<span style='color: #eed200;'>You gained " + formatWhole(gain.legendaryMatosFragment.mul(mult)) + " legendary matos fragments! (You have " + formatWhole(player.ma.legendaryMatosFragments) + ").")
    }
}

function celestialiteDeath() {
    logPrint(BHC[player.bh.celestialite.id].name + " died!")
    celestialiteReward(BHC[player.bh.celestialite.id].reward())
    player.bh.respawnTimer = new Decimal(5)
    player.bh.combo = player.bh.combo.add(1)

    if (BHC[player.bh.celestialite.id].attributes) {
        // Explosion Modifier
        if (BHC[player.bh.celestialite.id].attributes["explosive"]) {
            for (let i = 0; i < 3; i++) {
                // If dead, go to next character
                if (player.bh.celestialite.health.lte(0)) continue
                // If has shield, block damage
                if (player.bh.celestialite.shield.gt(0)) {
                    player.bh.celestialite.shield = player.bh.celestialite.shield.sub(1)
                    logPrint("<span style='color: #ee8700;'>Shield blocked explosive damage towards " + BHP[player.bh.characters[i].id].name + ".</span>")
                    continue
                }
                // Damage Calc
                let damage = BHC[player.bh.celestialite.id].attributes["explosive"]
                damage = damage.div(Decimal.div(100, Decimal.add(100, player.bh.characters[i].defense)))

                // Damage Application
                player.bh.characters[i].health = player.bh.characters[i].health.sub(damage)
                logPrint("<span style='color: #ee8700;'>Explosion! " + BHP[player.bh.characters[i].id].name + " takes " + format(damage) + " damage!</span>")
            }
        }
    }

    player.bh.celestialite = layers.bh.startData().celestialite
}

function celestialiteSpawn() {
    let celestialiteId = BHS[player.bh.currentStage].generateCelestialite(player.bh.combo)

    let scale = new Decimal(1)
    if (player.bh.combo.gte(player.bh.comboScalingStart)) scale = Decimal.pow(player.bh.comboScaling, player.bh.combo.sub(player.bh.comboScalingStart))
    player.bh.celestialite.id = celestialiteId
    player.bh.celestialite.health = BHC[celestialiteId].health.mul(scale) ?? new Decimal(0)
    player.bh.celestialite.maxHealth = BHC[celestialiteId].health.mul(scale) ?? new Decimal(0)
    player.bh.celestialite.damage = BHC[celestialiteId].damage.mul(scale) ?? new Decimal(0)
    player.bh.celestialite.defense = BHC[celestialiteId].defense.mul(scale) ?? new Decimal(0)
    player.bh.celestialite.regen = BHC[celestialiteId].regen.mul(scale) ?? new Decimal(0)

    player.bh.celestialite.health = player.bh.celestialite.health.mul(scale)
    player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.mul(scale)
    player.bh.celestialite.damage = player.bh.celestialite.damage.mul(scale)
    player.bh.celestialite.defense = player.bh.celestialite.defense.mul(scale)
    player.bh.celestialite.regen = player.bh.celestialite.regen.mul(scale)
    for (let i = 0; i < 4; i++) {
        if (BHC[player.bh.celestialite.id].actions[i]) {
            if (BHC[player.bh.celestialite.id].actions[i].variables) {
                player.bh.celestialite.actions[i].variables = BHC[player.bh.celestialite.id].actions[i].variables
            }
        }
    }
}

function calcTarget(index, target) {
    switch (target) {
        case "randomPlayer":
            let potTarget = []
            for (let i = 0; i < 3; i++) {
                if (player.bh.characters[i].health.gt(0)) potTarget.push(i)
            }
            let rndP = potTarget[Math.floor(Math.random()*potTarget.length)]
            return [rndP]
        case "random":
            let rndTarget = [3]
            for (let i = 0; i < 3; i++) {
                if (player.bh.characters[i].health.gt(0)) rndTarget.push(i)
            }
            let rndA = rndTarget[Math.floor(Math.random()*rndTarget.length)]
            return [rndA]
        case "self": // Use when start is player
            return [index]
        case "celestialite":
            return [3]
        case "allPlayer":
            return [0, 1, 2]
        case "all":
            return [0, 1, 2, 3]
    }
}