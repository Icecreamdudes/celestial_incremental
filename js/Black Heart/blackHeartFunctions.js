function bhAction(index, slot) {
    let action
    let target
    let attribute
    let delay = 0
    let luckMult = new Decimal(1)
    if (index == 3) {
        player.bh.celestialite.actions[slot].cooldown = new Decimal(0)
        action = BHC[player.bh.celestialite.id].actions[slot]
        attribute = player.bh.celestialite.attributes
    } else {
        player.bh.characters[index].skills[slot].cooldown = new Decimal(0)
        action = BHA[player.bh.characters[index].skills[slot].id]
        attribute = player.bh.characters[index].attributes
        luckMult = Decimal.div(Decimal.add(100, player.bh.characters[index].luck), 100)
    }
    if (attribute == undefined) attribute = {}
    target = action.target
    if (action.stun) {
        if (index == 3) {
            player.bh.celestialite.stun = run(action.stun, action)
        } else {
            player.bh.characters[index].stun = run(action.stun, action)
        }
    }
    if (action.delay) delay = run(action.delay, action)
    setTimeout(() => {
        // All action attribute effects
        if (attribute["berserk"]) {
            let damage
            if (index == 3) {
                damage = player.bh.celestialite.damage
            } else {
                damage = player.bh.characters[index].damage
            }
            let str = "<span style='color:red'>[BERSERK] </span>"
            bhAttack(damage.mul(attribute["berserk"]), index, "self", str)
        }
        switch(action.type) {
            case "damage":
                // Multi-hit modifier
                let hitAmt = 1
                let hitDelay = 200
                if (action.properties && action.properties["multi-hit"]) {
                    hitAmt = action.properties["multi-hit"][0]
                    hitDelay = action.properties["multi-hit"][1]
                }
                for (let i = 0; i < hitAmt; i++) {
                    setTimeout(() => {
                        let damage
                        let str = ""

                        // =-- Target Change Modifiers --=

                        // =-- Damage Value --=
                        if (index == 3) {
                            damage = run(action.value, action).mul(player.bh.celestialite.damage)
                        } else {
                            damage = run(action.value, action).mul(player.bh.characters[index].damage)
                        }
                        damage = damage.mul(Decimal.add(0.9, Decimal.mul(Math.random(), 0.2)))

                        // =-- Properties --=
                        if (action.properties) {
                            // Crit Modifier
                            if (action.properties["crit"] && Decimal.gte(action.properties["crit"][0].mul(luckMult), Math.random())) {
                                damage = damage.mul(action.properties["crit"][1])
                                str = str + "<span style='color:#faa'>[CRIT] </span>"
                            }

                            // Stun Modifier
                            if (action.properties["stun"] && Decimal.gte(action.properties["stun"][0].mul(luckMult), Math.random())) {
                                let arr = calcTarget(index, target)
                                for (let receive of arr) {
                                    if (receive == 3) {
                                        player.bh.celestialite.stun = action.properties["stun"][1]
                                    } else {
                                        player.bh.characters[receive].stun = action.properties["stun"][1]
                                    }
                                }
                                str = str + "<span style='color:#73741A'>[STUN] </span>"
                            }

                            // (Keep at end of properties)
                            if (action.properties["backfire"] && Decimal.gte(action.properties["backfire"][0].div(luckMult), Math.random())) {
                                let bfStr = str + "<span style='color:red'>[BACKFIRE] </span>"
                                let newTarget = "self"
                                if (index == 3) {
                                    if (target == "self") newTarget = "randomPlayer"
                                } else {
                                    if (target == "self") newTarget = "celestialite"
                                }
                                bhAttack(damage.mul(action.properties["backfire"][1]), index, newTarget, bfStr)
                            }
                        }

                        // =-- Apply Damage --=
                        bhAttack(damage, index, target, str)
                    }, hitDelay*i)
                }
                break;
            case "heal":
                // Multi-heal modifier
                let healAmt = 1
                let healDelay = 200
                if (action.properties && action.properties["multi-heal"]) {
                    hitAmt = action.properties["heal-hit"][0]
                    hitDelay = action.properties["heal-hit"][1]
                }
                for(let i = 0; i < healAmt; i++) {
                    setTimeout(() => {
                        let heal = Decimal.mul(run(action.value, action), Decimal.add(0.9, Decimal.mul(Math.random(), 0.2)))
                        let str = ""

                        // =-- Target Change Modifiers --=

                        // =-- Heal Modifiers --=
                        if (action.properties) {
                            // Crit Modifier
                            if (action.properties["crit"] && Decimal.gte(action.properties["crit"][0].mul(luckMult), Math.random())) {
                                heal = heal.mul(action.properties["crit"][1])
                                str = str + "<span style='color:red'>[CRIT] </span>"
                            }

                            // Stun Modifier
                            if (action.properties["stun"] && Decimal.gte(action.properties["stun"][0].mul(luckMult), Math.random())) {
                                let arr = calcTarget(index, target)
                                for (let receive of arr) {
                                    if (receive == 3) {
                                        player.bh.celestialite.stun = action.properties["stun"][1]
                                    } else {
                                        player.bh.characters[receive].stun = action.properties["stun"][1]
                                    }
                                }
                                str = str + "<span style='color:#73741A'>[STUN] </span>"
                            }

                            // Backfire (Keep at end of properties)
                            if (action.properties["backfire"] && Decimal.gte(action.properties["backfire"][0].div(luckMult), Math.random())) {
                                let bfStr = str + "<span style='color:red'>[BACKFIRE] </span>"
                                let newTarget = "self"
                                if (index == 3) {
                                    if (target == "self") newTarget = "randomPlayer"
                                } else {
                                    if (target == "self") newTarget = "celestialite"
                                }
                                bhHeal(heal.mul(action.properties["backfire"][1]), index, newTarget, bfStr)
                            }
                        }

                        // =-- Heal Application --=
                        bhHeal(heal, index, target, str)
                    }, healDelay*i)
                }
                break;
            case "effect":
                // =-- Target Change Modifiers --=

                // =-- Variable Effect --=
                if (!action.properties) return 
                for (let i in action.properties) {
                    let val = run(action.properties[i], action.properties)
                    if (val == "attributes") { // Doesn't give a message currently.
                        if (index == 3) {
                            if (!player.bh.celestialite.actions[slot].variables[i]) player.bh.celestialite.actions[slot].variables[i] = {}
                            player.bh.celestialite.actions[slot].variables[i] = Object.assign({}, player.bh.celestialite.actions[slot].variables[i], val)
                            player.bh.celestialite.actions[slot].variables.target = target
                        } else {
                            if (!player.bh.characters[index].skiils[slot].variables[i]) player.bh.characters[index].skiils[slot].variables[i] = {}
                            player.bh.characters[index].skiils[slot].variables[i] = Object.assign({}, player.bh.characters[index].skiils[slot].variables[i], val)
                            player.bh.characters[index].skills[slot].variables.target = target
                        }
                        continue
                    }
                    // PAST THIS IS ADD/MULT STAT
                    let perc = 0
                    if (i.includes("Mult")) perc = 1
                    if (i.includes("Diminish")) perc = 2
                    let name = ""
                    switch (perc) {
                        case 0:
                            name = i.slice(0, i.indexOf("A"))
                            if (index == 3) {
                                if (!player.bh.celestialite.actions[slot].variables[i]) player.bh.celestialite.actions[slot].variables[i] = new Decimal(0)
                                player.bh.celestialite.actions[slot].variables[i] = Decimal.add(player.bh.celestialite.actions[slot].variables[i], val)
                            } else {
                                if (!player.bh.characters[index].skills[slot].variables[i]) player.bh.characters[index].skills[slot].variables[i] = new Decimal(0)
                                player.bh.characters[index].skills[slot].variables[i] = Decimal.add(player.bh.characters[index].skills[slot].variables[i], val)
                            }
                            break;
                        case 1:
                            name = i.slice(0, i.indexOf("M"))
                            if (index == 3) {
                                if (!player.bh.celestialite.actions[slot].variables[i]) player.bh.celestialite.actions[slot].variables[i] = new Decimal(1)
                                player.bh.celestialite.actions[slot].variables[i] = Decimal.mul(player.bh.celestialite.actions[slot].variables[i], val)
                            } else {
                                if (!player.bh.characters[index].skills[slot].variables[i]) player.bh.characters[index].skills[slot].variables[i] = new Decimal(1)
                                player.bh.characters[index].skills[slot].variables[i] = Decimal.mul(player.bh.characters[index].skills[slot].variables[i], val)
                            }
                            break;
                        case 2:
                            name = i.slice(0, i.indexOf("D"))
                            i = name + "Mult"
                            let pre
                            if (index == 3) {
                                if (!player.bh.celestialite.actions[slot].variables[i]) player.bh.celestialite.actions[slot].variables[i] = new Decimal(1)
                                pre = player.bh.celestialite.actions[slot].variables[i]
                                player.bh.celestialite.actions[slot].variables[i] = Decimal.pow(player.bh.celestialite.actions[slot].variables[i], 2).add(val).pow(0.5)
                                val = Decimal.sub(player.bh.celestialite.actions[slot].variables[i], pre)
                            } else {
                                if (!player.bh.characters[index].skills[slot].variables[i]) player.bh.characters[index].skills[slot].variables[i] = new Decimal(1)
                                pre = player.bh.characters[index].skills[slot].variables[i]
                                player.bh.characters[index].skills[slot].variables[i] = Decimal.pow(player.bh.characters[index].skills[slot].variables[i], 2).add(val).pow(0.5)
                                val = Decimal.sub(player.bh.characters[index].skills[slot].variables[i], pre)
                            }
                            break;
                    }
                    if (index == 3) {
                        player.bh.celestialite.actions[slot].variables.target = target
                    } else {
                        player.bh.characters[index].skills[slot].variables.target = target
                    }
                    bhEffectText(name, val, index, target, perc)
                }
                break;
            case "reset":
                let arr = calcTarget(index, target)

                // Reset all other skill cooldowns
                for (let receive of arr) {
                    let avoid = 0
                    if (receive == index) avoid = slot+1
                    if (receive != 3) {
                        if (avoid != 1 && player.bh.characters[receive].skills[0].id != "none") player.bh.characters[receive].skills[0].cooldown = BHA[player.bh.characters[receive].skills[0].id].cooldown
                        if (avoid != 2 && player.bh.characters[receive].skills[1].id != "none") player.bh.characters[receive].skills[1].cooldown = BHA[player.bh.characters[receive].skills[1].id].cooldown
                        if (avoid != 3 && player.bh.characters[receive].skills[2].id != "none") player.bh.characters[receive].skills[2].cooldown = BHA[player.bh.characters[receive].skills[2].id].cooldown
                        if (avoid != 4 && player.bh.characters[receive].skills[3].id != "none") player.bh.characters[receive].skills[3].cooldown = BHA[player.bh.characters[receive].skills[3].id].cooldown
                    } else {
                        if (avoid != 1) player.bh.celestialite.actions[0].cooldown = BHC[player.bh.celestialite.id].actions[0].cooldown
                        if (avoid != 2) player.bh.celestialite.actions[1].cooldown = BHC[player.bh.celestialite.id].actions[1].cooldown
                        if (avoid != 3) player.bh.celestialite.actions[2].cooldown = BHC[player.bh.celestialite.id].actions[2].cooldown
                        if (avoid != 4) player.bh.celestialite.actions[3].cooldown = BHC[player.bh.celestialite.id].actions[3].cooldown
                    }
                    if (index == 3) {
                        if (receive == 3) {
                            bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reset its skills.")
                        } else {
                            bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reset " + BHP[player.bh.characters[receive].id].name + "'s skills.")
                        }
                    } else {
                        if (index == receive) {
                            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " reset their skills.")
                        } else if (receive != 3) {
                            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " reset " + BHP[player.bh.characters[receive].id].name + "'s skills.")
                        } else {
                            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " reset " + BHC[player.bh.celestialite.id].name + "'s skills.")
                        }
                    }
                }
                break;
            case "cooldown":
                let val = run(action.value, action)
                let tar = calcTarget(index, target)

                // Reduce cooldowns of target
                for (let receive of tar) {
                    let avoid = 0
                    if (receive == index) avoid = slot+1
                    if (receive != 3) {
                        if (avoid != 1 && player.bh.characters[receive].skills[0].id != "none") player.bh.characters[receive].skills[0].cooldown = player.bh.characters[receive].skills[0].cooldown.add(val)
                        if (avoid != 2 && player.bh.characters[receive].skills[1].id != "none") player.bh.characters[receive].skills[1].cooldown = player.bh.characters[receive].skills[1].cooldown.add(val)
                        if (avoid != 3 && player.bh.characters[receive].skills[2].id != "none") player.bh.characters[receive].skills[2].cooldown = player.bh.characters[receive].skills[2].cooldown.add(val)
                        if (avoid != 4 && player.bh.characters[receive].skills[3].id != "none") player.bh.characters[receive].skills[3].cooldown = player.bh.characters[receive].skills[3].cooldown.add(val)
                    } else {
                        if (avoid != 1) player.bh.celestialite.actions[0].cooldown = player.bh.celestialite.actions[0].cooldown.add(val)
                        if (avoid != 2) player.bh.celestialite.actions[1].cooldown = player.bh.celestialite.actions[1].cooldown.add(val)
                        if (avoid != 3) player.bh.celestialite.actions[2].cooldown = player.bh.celestialite.actions[2].cooldown.add(val)
                        if (avoid != 4) player.bh.celestialite.actions[3].cooldown = player.bh.celestialite.actions[3].cooldown.add(val)
                    }
                    if (index == 3) {
                        if (receive == 3) {
                            bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reduced its cooldowns by " + formatTime(val) + ".")
                        } else {
                            bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reduced " + BHP[player.bh.characters[receive].id].name + "'s cooldowns by " + formatTime(val) + ".")
                        }
                    } else {
                        if (index == receive) {
                            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " reduced their cooldowns by " + formatTime(val) + ".")
                        } else if (receive != 3) {
                            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " reduced " + BHP[player.bh.characters[receive].id].name + "'s cooldowns by " + formatTime(val) + ".")
                        } else {
                            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " reduced " + BHC[player.bh.celestialite.id].name + "'s cooldowns by " + formatTime(val) + ".")
                        }
                    }
                }
                break;
            case "shield":
                let num = run(action.value, action)
                let targ = calcTarget(index, target)
                let str = "time"
                if (num.neq(1)) str = "times"

                // Add shield to target(s)
                for (let receive of targ) {
                    if (receive == 3) {
                        player.bh.celestialite.shield = player.bh.celestialite.shield.add(num)
                    } else {
                        player.bh.characters[receive].shield = player.bh.characters[receive].shield.add(num)
                    }
                    if (index == 3) {
                        if (receive == 3) {
                            bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " shielded itself " + formatWhole(num) + " " + str + ".")
                        } else {
                            bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " shielded " + BHP[player.bh.characters[receive].id].name + " " + formatWhole(num) + " " + str + ".")
                        }
                    } else {
                        if (index == receive) {
                            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " shielded themself " + formatWhole(num) + " " + str + ".")
                        } else if (receive != 3) {
                            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " shielded " + BHP[player.bh.characters[receive].id].name + " " + formatWhole(num) + " " + str + ".")
                        } else {
                            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " shielded " + BHC[player.bh.celestialite.id].name + " " + formatWhole(num) + " " + str + ".")
                        }
                    }
                }
                break;
        }
    }, delay)
}

function bhEffectText(type, val, index, target, percentage = 0) {
    let sign
    let num = ""
    if (percentage == 0) {
        sign = Decimal.gte(val, 0) ? ["buffed", "+"] : ["nerfed", "-"]
        num = format(new Decimal(val)) + "."
    } else if (percentage == 1) {
        sign = Decimal.gte(val, 1) ? ["buffed", "+"] : ["nerfed", "-"]
        num = format(Decimal.sub(val, 1).mul(100)) + "%."
    } else {
        sign = Decimal.gte(val, 0) ? ["buffed", "+"] : ["nerfed", "-"]
        num = format(Decimal.mul(val, 100)) + "%."
    }
    let arr = calcTarget(index, target)
    for (let receive of arr) {
        if (index == 3) {
            if (receive == 3) {
                bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " " + sign[0] + " its " + type + " by " + sign[1] + num)
            } else {
                bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " " + sign[0] + " " + BHP[player.bh.characters[receive].id].name + "'s " + type + " by " + sign[1] + num)
            }
        } else {
            if (index == receive) {
                bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " " + sign[0] + " its " + type + " by " + sign[1] + num)
            } else if (receive != 3) {
                bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " " + sign[0] + " " + BHP[player.bh.characters[receive].id].name + "'s " + type + " by " + sign[1] + num)
            } else {
                bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " " + sign[0] + " " + BHC[player.bh.celestialite.id].name + "'s " + type + " by " + sign[1] + num)
            }
        }
    }
}

function bhAttack(damage, index, target, str = "", attr = false) {
    let arr = calcTarget(index, target)
    if (typeof target == "number") arr = [target]
    for (let receive of arr) {
        if (receive == 3 && player.bh.celestialite.id == "none") continue
        // =-- Target Attributes --=
        let attribute
        if (receive == 3) {
            attribute = player.bh.celestialite.attributes
        } else {
            attribute = player.bh.characters[receive].attributes
        }
        if (attribute == undefined) attribute = {}

        if (attribute["rebound"] && !attr && target != "self") {
            let attStr = "<span style='color:cyan'>[REBOUND] </span>"
            bhAttack(damage.mul(attribute["rebound"]), receive, index, attStr, true)
        }

        // Shield and Defense Calc
        if (receive != 3) {
            // Shield Calc
            if (player.bh.characters[receive].shield.gt(0)) {
                player.bh.characters[receive].shield = player.bh.characters[receive].shield.sub(1)
                bhLog("<span style='color: " + BHP[player.bh.characters[receive].id].color + "'>Shield blocked damage towards " + BHP[player.bh.characters[receive].id].name + ".")
                return
            }
            // Defense Calc
            damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.characters[receive].defense)))
        } else {
            // Shield Calc
            if (player.bh.celestialite.shield.gt(0)) {
                player.bh.celestialite.shield = player.bh.celestialite.shield.sub(1)
                bhLog("<span style='color: #8b0e7a'>Shield blocked damage towards " + BHC[player.bh.celestialite.id].name + ".")
                return
            }
            // Defense Calc
            damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.defense)))
        }
        if (index == 3) {
            if (receive == 3) {
                player.bh.celestialite.health = player.bh.celestialite.health.sub(damage)
                bhLog(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " attacks itself for " +format(damage) + " damage.")
            } else {
                player.bh.characters[receive].health = player.bh.characters[receive].health.sub(damage)
                bhLog(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " attacks " + BHP[player.bh.characters[receive].id].name + " for " +format(damage) + " damage.")
            }
        } else {
            if (index == receive) {
                player.bh.characters[receive].health = player.bh.characters[receive].health.sub(damage)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " attacks themself for " +format(damage) + " damage.")
            } else if (receive != 3) {
                player.bh.characters[receive].health = player.bh.characters[receive].health.sub(damage)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " attacks " + BHP[player.bh.characters[receive].id].name + " for " +format(damage) + " damage.")
            } else {
                player.bh.celestialite.health = player.bh.celestialite.health.sub(damage)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " attacks " + BHC[player.bh.celestialite.id].name + " for " +format(damage) + " damage.")
            }
        }
        if (receive != 3 && player.bh.characters[receive].health.lte(0)) bhLog("<span style='color: " + BHP[player.bh.characters[receive].id].color + "'>" + BHP[player.bh.characters[receive].id].name + " fainted!")
    }
}

function bhHeal(heal, index, target, str = "") {
    let arr = calcTarget(index, target)
    for (let receive of arr) {
        if (index == 3) {
            if (receive == 3) {
                player.bh.celestialite.health = player.bh.celestialite.health.add(heal).min(player.bh.celestialite.maxHealth)
                bhLog(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " healed itself for " +format(heal) + " health.")
            } else {
                player.bh.characters[receive].health = player.bh.characters[receive].health.add(heal).min(player.bh.characters[receive].maxHealth)
                bhLog(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " healed " + BHP[player.bh.characters[receive].id].name + " for " +format(heal) + " health.")
            }
        } else {
            if (index == receive) {
                player.bh.characters[receive].health = player.bh.characters[receive].health.add(heal).min(player.bh.characters[receive].maxHealth)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " healed themself for " +format(heal) + " health.")
            } else if (receive != 3) {
                player.bh.characters[receive].health = player.bh.characters[receive].health.add(heal).min(player.bh.characters[receive].maxHealth)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " healed " + BHP[player.bh.characters[receive].id].name + " for " +format(heal) + " health.")
            } else {
                player.bh.celestialite.health = player.bh.celestialite.health.add(heal).min(player.bh.celestialite.maxHealth)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + BHP[player.bh.characters[index].id].name + " healed " + BHC[player.bh.celestialite.id].name + " for " +format(heal) + " health.")
            }
        }
    }
}

function celestialiteReward(gain) {
    if (gain.gloomingUmbrite) {
        player.depth1.gloomingUmbrite = player.depth1.gloomingUmbrite.add(gain.gloomingUmbrite)
        bhLog("<span style='color: #eed200'>You gained " + formatWhole(gain.gloomingUmbrite) + " glooming umbrite! (You have " + formatWhole(player.depth1.gloomingUmbrite) + ")")
    }
    if (gain.dimUmbrite) {
        player.depth1.dimUmbrite = player.depth1.dimUmbrite.add(gain.dimUmbrite)
        bhLog("<span style='color: #eed200'>You gained " + formatWhole(gain.dimUmbrite) + " dim umbrite! (You have " + formatWhole(player.depth1.dimUmbrite) + ")")
    }
    if (gain.faintUmbrite) {
        player.depth2.faintUmbrite = player.depth2.faintUmbrite.add(gain.faintUmbrite)
        bhLog("<span style='color: #eed200'>You gained " + formatWhole(gain.faintUmbrite) + " dim umbrite! (You have " + formatWhole(player.depth2.faintUmbrite) + ")")
    }
    if (gain.clearUmbrite) {
        player.depth2.clearUmbrite = player.depth2.clearUmbrite.add(gain.clearUmbrite)
        bhLog("<span style='color: #eed200'>You gained " + formatWhole(gain.clearUmbrite) + " dim umbrite! (You have " + formatWhole(player.depth2.clearUmbrite) + ")")
    }
    if (gain.vividUmbrite) {
        player.depth3.vividUmbrite = player.depth3.vividUmbrite.add(gain.vividUmbrite)
        bhLog("<span style='color: #eed200'>You gained " + formatWhole(gain.vividUmbrite) + " dim umbrite! (You have " + formatWhole(player.depth3.vividUmbrite) + ")")
    }
    if (gain.lustrousUmbrite) {
        player.depth3.lustrousUmbrite = player.depth3.lustrousUmbrite.add(gain.lustrousUmbrite)
        bhLog("<span style='color: #eed200'>You gained " + formatWhole(gain.lustrousUmbrite) + " dim umbrite! (You have " + formatWhole(player.depth3.lustrousUmbrite) + ")")
    }
    if (gain.darkEssence) {
        player.bh.darkEssence = player.bh.darkEssence.add(gain.darkEssence)
        bhLog("<span style='color: #eed200'>You gained " + formatWhole(gain.darkEssence) + " dark essence! (You have " + formatWhole(player.bh.darkEssence) + ")")
    }
}

function celestialiteDeath() {
    bhLog(BHC[player.bh.celestialite.id].name + " died!")
    celestialiteReward(BHC[player.bh.celestialite.id].reward())
    player.bh.respawnTimer = player.bh.respawnMax
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
                    bhLog("<span style='color: #ee8700;'>Shield blocked explosive damage towards " + BHP[player.bh.characters[i].id].name + ".</span>")
                    continue
                }
                // Damage Calc
                let damage = BHC[player.bh.celestialite.id].attributes["explosive"]
                damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.characters[i].defense)))

                // Damage Application
                player.bh.characters[i].health = player.bh.characters[i].health.sub(damage)
                bhLog("<span style='color: #ee8700;'>Explosion! " + BHP[player.bh.characters[i].id].name + " takes " + format(damage) + " damage!</span>")
            }
        }
    }
    
    if (player.bh.currentStage != "none") {
        if (player.bh.combo.gt(player[player.bh.currentStage].highestCombo)) player[player.bh.currentStage].highestCombo = player.bh.combo
        if (player[player.bh.currentStage].milestone && Object.hasOwn(player[player.bh.currentStage].milestone, player.bh.combo)) {
            let curVal = player[player.bh.currentStage].milestone[player.bh.combo]
            let charAmt = 4
            for (let i = 0; i < 3; i++) {
                if (player.bh.characters[i].id != "none") charAmt -= 1
            }
            if (curVal < charAmt) {
                player[player.bh.currentStage].milestone[player.bh.combo] = charAmt
                let charStr = 4 - charAmt
                if (charStr == 1) {
                    doPopup("milestone", BHS[player.bh.currentStage].name + ": " + player.bh.combo + " Combo<br>" + charStr + " Character", "Milestone Gotten!", 3, "#666")
                } else {
                    doPopup("milestone", BHS[player.bh.currentStage].name + ": " + player.bh.combo + " Combo<br>" + charStr + " Characters", "Milestone Gotten!", 3, "#666")
                }
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
    player.bh.celestialite.randomMult = Decimal.add(0.85, Decimal.mul(Math.random(), 0.3))
    player.bh.celestialite.health = BHC[celestialiteId].health ?? new Decimal(0)
    player.bh.celestialite.maxHealth = BHC[celestialiteId].health ?? new Decimal(0)
    player.bh.celestialite.damage = BHC[celestialiteId].damage ?? new Decimal(0)
    player.bh.celestialite.defense = BHC[celestialiteId].defense ?? new Decimal(0)
    player.bh.celestialite.regen = BHC[celestialiteId].regen ?? new Decimal(0)

    player.bh.celestialite.health = player.bh.celestialite.health.mul(player.bh.celestialite.randomMult)
    player.bh.celestialite.health = player.bh.celestialite.health.mul(scale)
    player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.mul(player.bh.celestialite.randomMult)
    player.bh.celestialite.maxHealth = player.bh.celestialite.maxHealth.mul(scale)
    player.bh.celestialite.damage = player.bh.celestialite.damage.mul(player.bh.celestialite.randomMult)
    player.bh.celestialite.damage = player.bh.celestialite.damage.mul(scale)
    player.bh.celestialite.defense = player.bh.celestialite.defense.mul(player.bh.celestialite.randomMult)
    player.bh.celestialite.defense = player.bh.celestialite.defense.mul(scale)
    player.bh.celestialite.regen = player.bh.celestialite.regen.mul(player.bh.celestialite.randomMult)
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
                if (player.bh.characters[i].health.gt(0) && player.bh.characters[i].id != "none") potTarget.push(i)
            }
            let rndP = potTarget[Math.floor(Math.random()*potTarget.length)]
            return [rndP]
        case "random":
            let rndTarget = [3]
            for (let i = 0; i < 3; i++) {
                if (player.bh.characters[i].health.gt(0) && player.bh.characters[i].id != "none") rndTarget.push(i)
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

function bhLog(line) {
    player.bh.log.push(line); // Push the raw HTML string directly
    if (player.bh.log.length > 10) player.bh.log.shift(); // Ensure log size remains consistent
}