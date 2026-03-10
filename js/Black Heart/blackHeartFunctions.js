function bhAction(index, slot, interval = false, magnitude = 1, delay = false) {
    let char
    let action
    let target
    let attribute
    let luckMult = new Decimal(1)
    if (index == 3) {
        if (!interval) player.bh.celestialite.actions[slot].cooldown = player.bh.celestialite.actions[slot].cooldown.sub(BHC[player.bh.celestialite.id].actions[slot].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))).mul(magnitude))
        char = player.bh.celestialite
        action = BHC[player.bh.celestialite.id].actions[slot]
        attribute = player.bh.celestialite.attributes
        luckMult = Decimal.div(Decimal.add(100, player.bh.celestialite.luck), 100)
    } else {
        if (!interval) player.bh.characters[index].skills[slot].cooldown = new Decimal(0)
        char = player.bh.characters[index]
        action = BHA[player.bh.characters[index].skills[slot].id]
        attribute = player.bh.characters[index].attributes
        luckMult = Decimal.div(Decimal.add(100, player.bh.characters[index].luck), 100)
    }
    let type = !interval ? action.type : action.constantType
    if (attribute == undefined) attribute = {}
    target = action.target
    if (action.stun && !delay) {
        if (index == 3) {
            player.bh.celestialite.stun = [...run(action.stun, action, char)]
            if (player.bh.celestialite.stun.length >= 3) return
        } else {
            player.bh.characters[index].stun = [...run(action.stun, action, char)]
            if (player.bh.characters[index].stun.length >= 3) return
        }
    }
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
    if (attribute["daze"]) {
        let daze = attribute["daze"]
        if (index == 3) {
            daze = Decimal.div(daze, Decimal.div(Decimal.add(100, player.bh.celestialite.luck), 100))
            if (Decimal.gte(daze, Math.random())) {
                bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " missed.")
                return
            }
        } else {
            daze = Decimal.div(daze, Decimal.div(Decimal.add(100, player.bh.characters[index].luck), 100))
            if (Decimal.gte(daze, Math.random())) {
                bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " missed.")
                return
            }
        }
    }
    // Multi-hit modifier
    let hitAmt = 1
    let hitDelay = 200
    if (action.properties && action.properties["multi-hit"]) {
        hitAmt = action.properties["multi-hit"][0]
        hitDelay = action.properties["multi-hit"][1]
    }
    for (let i = 0; i < hitAmt; i++) {
        setTimeout(() => {
            switch(type) {
                case "damage":
                    let damage
                    let dmgStr = ""

                    // =-- Target Change Modifiers --=

                    // =-- Damage Value --=
                    if (index == 3) {
                        damage = run(action.value, action, char).mul(player.bh.celestialite.damage).mul(magnitude)
                    } else {
                        damage = run(action.value, action, char).mul(player.bh.characters[index].damage).mul(magnitude)
                    }
                    damage = damage.mul(Decimal.add(0.9, Decimal.mul(Math.random(), 0.2)))

                    // =-- Properties --=
                    if (action.properties) {
                        let prop = bhProperties(index, action, luckMult, target, damage)
                        damage = prop[0]
                        dmgStr = prop[1]
                        if (prop[2]) return
                    }

                    // =-- Apply Damage --=
                    bhAttack(damage, index, target, dmgStr, action.method)
                    break;
                case "heal":
                    let heal = Decimal.mul(run(action.value, action, char), Decimal.add(0.9, Decimal.mul(Math.random(), 0.2))).mul(magnitude)
                    let healStr = ""

                    // =-- Target Change Modifiers --=

                    // =-- Properties --=
                    if (action.properties) {
                        let prop = bhProperties(index, action, luckMult, target, heal)
                        heal = prop[0]
                        healStr = prop[1]
                        if (prop[2]) return
                    }

                    // =-- Heal Application --=
                    bhHeal(heal, index, target, healStr)
                    break;
                case "effect":
                    const DONT_SKIP = ["attributes", "health", "damage", "defense", "regen", "agility", "luck", "mending", "time", "cur"]
                    if (!action.properties) return

                    // =-- Target Change Modifiers --=

                    // =-- Variable Effect --=
                    for (let i in action.properties) {
                        let val = run(action.properties[i], action.properties, char)
                        if (!DONT_SKIP.some(j => i.includes(j))) continue
                        let str = ""

                        // Attribute effect stuff
                        if (action.properties[i] == "attributes") { // Doesn't give a message currently.
                            // =-- Properties --=
                            if (action.properties) {
                                let prop = bhProperties(index, action, luckMult, target, new Decimal(0))
                                str = prop[1]
                                if (prop[2]) return
                            }

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

                        // Stat related stuff
                        val = Decimal.mul(val, magnitude)

                        // =-- Properties --=
                        if (action.properties) {
                            let prop = bhProperties(index, action, luckMult, target, val)
                            val = prop[0]
                            str = prop[1]
                            if (prop[2]) return
                        }

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

                                //1-1/50^2+1
                                if (index == 3) {
                                    if (!player.bh.celestialite.actions[slot].variables[i]) player.bh.celestialite.actions[slot].variables[i] = new Decimal(1)
                                    pre = player.bh.celestialite.actions[slot].variables[i]
                                    player.bh.celestialite.actions[slot].variables[i] = Decimal.sub(player.bh.celestialite.actions[slot].variables[i], 1).div(val).pow(2).add(1).pow(0.5).mul(val).add(1)
                                    val = Decimal.sub(player.bh.celestialite.actions[slot].variables[i], pre)
                                } else {
                                    if (!player.bh.characters[index].skills[slot].variables[i]) player.bh.characters[index].skills[slot].variables[i] = new Decimal(1)
                                    pre = player.bh.characters[index].skills[slot].variables[i]
                                    player.bh.characters[index].skills[slot].variables[i] = Decimal.sub(player.bh.characters[index].skills[slot].variables[i], 1).div(val).pow(2).add(1).pow(0.5).mul(val).add(1)
                                    val = Decimal.sub(player.bh.characters[index].skills[slot].variables[i], pre)
                                }
                                break;
                        }
                        if (index == 3) {
                            player.bh.celestialite.actions[slot].variables.target = target
                        } else {
                            player.bh.characters[index].skills[slot].variables.target = target
                        }
                        bhEffectText(name, val, index, target, perc, str)
                    }
                    break;
                case "reset":
                    let arr = calcTarget(index, target, "effect")
                    let resetStr = ""

                    // =-- Properties --=
                    if (action.properties) {
                        let prop = bhProperties(index, action, luckMult, target, new Decimal(0))
                        resetStr = prop[1]
                        if (prop[2]) return
                    }

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
                                bhLog(resetStr + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reset its skills.")
                            } else {
                                bhLog(resetStr + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reset " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + "'s skills.")
                            }
                        } else {
                            if (index == receive) {
                                bhLog(resetStr + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " reset their skills.")
                            } else if (receive != 3) {
                                bhLog(resetStr + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " reset " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + "'s skills.")
                            } else {
                                bhLog(resetStr + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " reset " + BHC[player.bh.celestialite.id].name + "'s skills.")
                            }
                        }
                    }
                    break;
                case "cooldown":
                    let val = run(action.value, action, char).mul(magnitude)
                    let tar = calcTarget(index, target, "effect")
                    let coolStr = ""

                    // =-- Properties --=
                    if (action.properties) {
                        let prop = bhProperties(index, action, luckMult, target, val)
                        val = prop[0]
                        coolStr = prop[1]
                        if (prop[2]) return
                    }

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
                                bhLog(coolStr + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reduced its cooldowns by " + formatTime(val) + ".")
                            } else {
                                bhLog(coolStr + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " reduced " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + "'s cooldowns by " + formatTime(val) + ".")
                            }
                        } else {
                            if (index == receive) {
                                bhLog(coolStr + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " reduced their cooldowns by " + formatTime(val) + ".")
                            } else if (receive != 3) {
                                bhLog(coolStr + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " reduced " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + "'s cooldowns by " + formatTime(val) + ".")
                            } else {
                                bhLog(coolStr + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " reduced " + BHC[player.bh.celestialite.id].name + "'s cooldowns by " + formatTime(val) + ".")
                            }
                        }
                    }
                    break;
                case "shield":
                    let num = run(action.value, action, char).mul(magnitude)
                    let targ = calcTarget(index, target, "effect")
                    let str = "time"
                    let shieldStr = ""

                    // =-- Properties --=
                    if (action.properties) {
                        let prop = bhProperties(index, action, luckMult, target, num)
                        num = prop[0]
                        shieldStr = prop[1]
                        if (prop[2]) return
                    }

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
                                bhLog(shieldStr + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " shielded itself " + formatWhole(num) + " " + str + ".")
                            } else {
                                bhLog(shieldStr + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " shielded " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + " " + formatWhole(num) + " " + str + ".")
                            }
                        } else {
                            if (index == receive) {
                                bhLog(shieldStr + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " shielded themself " + formatWhole(num) + " " + str + ".")
                            } else if (receive != 3) {
                                bhLog(shieldStr + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " shielded " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[index].id]) + " " + formatWhole(num) + " " + str + ".")
                            } else {
                                bhLog(shieldStr + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " shielded " + BHC[player.bh.celestialite.id].name + " " + formatWhole(num) + " " + str + ".")
                            }
                        }
                    }
                    break;
                case "function":
                    // =-- Properties --=
                    if (action.properties) {
                        let prop = bhProperties(index, action, luckMult, target, new Decimal(0))
                        if (prop[2]) return
                    }

                    action.onTrigger(index, slot, target, magnitude)
                    break;
            }
        }, hitDelay*i)
    }
}

function bhProperties(index, action, luckMult, target, val) {
    let str = ""
    // Miss
    if (action.properties["miss"] && Decimal.gte(Decimal.div(action.properties["miss"], luckMult), Math.random())) {
        if (index == 3) {
            bhLog("<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " missed.")
        } else {
            bhLog("<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " missed.")
        }
        return [val, str, true]
    }

    // Crit
    if (action.properties["crit"] && Decimal.gte(Decimal.mul(action.properties["crit"][0], luckMult), Math.random())) {
        val = val.mul(action.properties["crit"][1])
        str = str + "<span style='color:#faa'>[CRIT] </span>"
    }

    // Stun
    if (action.properties["stun"] && Decimal.gte(Decimal.mul(action.properties["stun"][0], luckMult), Math.random())) {
        let arr = calcTarget(index, target, "effect")
        for (let receive of arr) {
            if (receive == 3) {
                player.bh.celestialite.stun = [action.properties["stun"][1], action.properties["stun"][2]]
            } else {
                player.bh.characters[receive].stun = [action.properties["stun"][1], action.properties["stun"][2]]
            }
        }
        if (action.properties["stun"][1] == "hard") {
            str = str + "<span style='color:#73741A'>[H-STUN] </span>"
        } else {
            str = str + "<span style='color:#73741A'>[S-STUN] </span>"
        }
    }

    // Vampiric
    if (action.properties["vampiric"] && Decimal.gte(Decimal.div(action.properties["vampiric"][0], luckMult), Math.random())) {
        let bfStr = str + "<span style='color:green'>[VAMPIRIC] </span>"
        let newTarget = "self"
        if (index == 3) {
            newTarget = "celestialite"
            if (target == "self") newTarget = "randomPlayer"
        } else {
            if (target == "self") newTarget = "celestialite"
        }
        bhHeal(action.properties["vampiric"][1], index, newTarget, bfStr, action.method)
    }

    // (Keep at end of properties)
    // Backfire
    if (action.properties["backfire"] && Decimal.gte(Decimal.div(action.properties["backfire"][0], luckMult), Math.random())) {
        let bfStr = str + "<span style='color:red'>[BACKFIRE] </span>"
        let newTarget = "self"
        if (index == 3) {
            newTarget = "celestialite"
            if (target == "self") newTarget = "randomPlayer"
        } else {
            if (target == "self") newTarget = "celestialite"
        }
        bhAttack(damage.mul(action.properties["backfire"][1]), index, newTarget, bfStr, action.method)
    }

    // Placebo
    if (action.properties["placebo"] && Decimal.gte(Decimal.div(action.properties["placebo"][0], luckMult), Math.random())) {
        let bfStr = str + "<span style='color:red'>[PLACEBO] </span>"
        let newTarget = "self"
        if (index == 3) {
            newTarget = "randomPlayer"
        } else {
            newTarget = "celestialite"
        }
        bhHeal(action.properties["placebo"][1], index, newTarget, bfStr)
    }

    return [val, str, false]
}

function bhEffectText(type, val, index, target, percentage = 0, str) {
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
    let arr = calcTarget(index, target, "effect")
    for (let receive of arr) {
        if (index == 3) {
            if (receive == 3) {
                bhLog(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " " + sign[0] + " its " + type + " by " + sign[1] + num)
            } else {
                bhLog(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " " + sign[0] + " " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + "'s " + type + " by " + sign[1] + num)
            }
        } else {
            if (index == receive) {
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " " + sign[0] + " its " + type + " by " + sign[1] + num)
            } else if (receive != 3) {
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " " + sign[0] + " " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + "'s " + type + " by " + sign[1] + num)
            } else {
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " " + sign[0] + " " + BHC[player.bh.celestialite.id].name + "'s " + type + " by " + sign[1] + num)
            }
        }
    }
}

function bhAttack(damage, index, target, str = "", method = "none", attr = false) {
    let arr = calcTarget(index, target, "damage")
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
            bhAttack(damage.mul(attribute["rebound"]), receive, index, attStr, "none", true)
        }

        let resist = false

        if (attribute["air"] && !attr && method == "physical") {damage = damage.mul(attribute["air"]); resist = true}
        if (attribute["warded"] && !attr && method == "magic") {damage = damage.mul(attribute["warded"]); resist = true}
        if (attribute["stealthy"] && !attr && method == "ranged") {damage = damage.mul(attribute["stealthy"]); resist = true}

        if (resist) str = str + "<span style='color:#aaa'>[RESISTED] </span>"

        // Shield and Defense Calc
        if (receive != 3) {
            // Shield Calc
            if (player.bh.characters[receive].shield.gt(0)) {
                player.bh.characters[receive].shield = player.bh.characters[receive].shield.sub(1)
                bhLog("<span style='color: " + BHP[player.bh.characters[receive].id].color + "'>Shield blocked damage towards " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + ".")
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
                bhLog(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " attacks " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + " for " +format(damage) + " damage.")
            }
        } else {
            if (index == receive) {
                player.bh.characters[receive].health = player.bh.characters[receive].health.sub(damage)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " attacks themself for " +format(damage) + " damage.")
            } else if (receive != 3) {
                player.bh.characters[receive].health = player.bh.characters[receive].health.sub(damage)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " attacks " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + " for " +format(damage) + " damage.")
            } else {
                player.bh.celestialite.health = player.bh.celestialite.health.sub(damage)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " attacks " + BHC[player.bh.celestialite.id].name + " for " +format(damage) + " damage.")
            }
        }
        if (receive != 3 && player.bh.characters[receive].health.lte(0)) bhLog("<span style='color: " + BHP[player.bh.characters[receive].id].color + "'>" + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + " fainted!")
    }
}

function bhHeal(heal, index, target, str = "") {
    if (index == 3) {
        heal = heal.mul(player.bh.celestialite.mending.div(10).add(1))
    } else if (player.matosLair.milestone[25] >= 2) {
        heal = heal.mul(player.bh.characters[index].mending.div(10).add(1))
    }
    let arr = calcTarget(index, target, "heal")
    for (let receive of arr) {
        if (index == 3) {
            if (receive == 3) {
                player.bh.celestialite.health = player.bh.celestialite.health.add(heal).min(player.bh.celestialite.maxHealth)
                bhLog(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " healed itself for " +format(heal) + " health.")
            } else {
                player.bh.characters[receive].health = player.bh.characters[receive].health.add(heal).min(player.bh.characters[receive].maxHealth)
                bhLog(str + "<span style='color: #8b0e7a'>" + BHC[player.bh.celestialite.id].name + " healed " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + " for " +format(heal) + " health.")
            }
        } else {
            if (index == receive) {
                player.bh.characters[receive].health = player.bh.characters[receive].health.add(heal).min(player.bh.characters[receive].maxHealth)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " healed themself for " +format(heal) + " health.")
            } else if (receive != 3) {
                player.bh.characters[receive].health = player.bh.characters[receive].health.add(heal).min(player.bh.characters[receive].maxHealth)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " healed " + run(BHP[player.bh.characters[receive].id].name, BHP[player.bh.characters[receive].id]) + " for " +format(heal) + " health.")
            } else {
                player.bh.celestialite.health = player.bh.celestialite.health.add(heal).min(player.bh.celestialite.maxHealth)
                bhLog(str + "<span style='color: " + BHP[player.bh.characters[index].id].color + "'>" + run(BHP[player.bh.characters[index].id].name, BHP[player.bh.characters[index].id]) + " healed " + BHC[player.bh.celestialite.id].name + " for " +format(heal) + " health.")
            }
        }
    }
}

function celestialiteReward(gain) {
    let generalChance = Decimal.sub(player.bh.celestialite.curMult, 1)
    let generalRemain = generalChance.floor()
    generalChance = generalChance.sub(generalRemain)
    
    let generalMult = Decimal.pow(2, generalRemain)
    if (Decimal.gte(generalChance, Math.random())) generalMult = generalMult.mul(2)

    let str = ""
    if (generalMult.gt(1)) str = "[x" + formatWhole(generalMult) + "] "
    if (gain.gloomingUmbrite) {
        gain.gloomingUmbrite = gain.gloomingUmbrite.mul(player.depth1.depth1Mult).mul(generalMult).floor()
        player.depth1.gloomingUmbrite = player.depth1.gloomingUmbrite.add(gain.gloomingUmbrite)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.gloomingUmbrite) + " glooming umbrite! (You have " + formatWhole(player.depth1.gloomingUmbrite) + ")")
    }
    if (gain.dimUmbrite) {
        gain.dimUmbrite = gain.dimUmbrite.mul(player.depth1.depth1Mult).mul(generalMult).floor()
        player.depth1.dimUmbrite = player.depth1.dimUmbrite.add(gain.dimUmbrite)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.dimUmbrite) + " dim umbrite! (You have " + formatWhole(player.depth1.dimUmbrite) + ")")
    }
    if (gain.faintUmbrite) {
        gain.faintUmbrite = gain.faintUmbrite.mul(player.depth2.depth2Mult).mul(generalMult).floor()
        player.depth2.faintUmbrite = player.depth2.faintUmbrite.add(gain.faintUmbrite)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.faintUmbrite) + " faint umbrite! (You have " + formatWhole(player.depth2.faintUmbrite) + ")")
    }
    if (gain.clearUmbrite) {
        gain.clearUmbrite = gain.clearUmbrite.mul(player.depth2.depth2Mult).mul(generalMult).floor()
        player.depth2.clearUmbrite = player.depth2.clearUmbrite.add(gain.clearUmbrite)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.clearUmbrite) + " clear umbrite! (You have " + formatWhole(player.depth2.clearUmbrite) + ")")
    }
    if (gain.vividUmbrite) {
        gain.vividUmbrite = gain.vividUmbrite.mul(player.depth3.depth3Mult).mul(generalMult).floor()
        player.depth3.vividUmbrite = player.depth3.vividUmbrite.add(gain.vividUmbrite)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.vividUmbrite) + " vivid umbrite! (You have " + formatWhole(player.depth3.vividUmbrite) + ")")
    }
    if (gain.lustrousUmbrite) {
        gain.lustrousUmbrite = gain.lustrousUmbrite.mul(player.depth3.depth3Mult).mul(generalMult).floor()
        player.depth3.lustrousUmbrite = player.depth3.lustrousUmbrite.add(gain.lustrousUmbrite)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.lustrousUmbrite) + " lustrous umbrite! (You have " + formatWhole(player.depth3.lustrousUmbrite) + ")")
    }
    if (gain.darkEssence) {
        player.bh.darkEssence = player.bh.darkEssence.add(gain.darkEssence).mul(buyableEffect("sme", 135)).mul(generalMult).floor()
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.darkEssence) + " dark essence! (You have " + formatWhole(player.bh.darkEssence) + ")")
    }
    if (gain.temporalDust) {
        gain.temporalDust = gain.temporalDust.mul(player.stagnantSynestia.temporalMult).mul(generalMult).floor()
        player.stagnantSynestia.temporalDust = player.stagnantSynestia.temporalDust.add(gain.temporalDust)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.temporalDust) + " temporal dust! (You have " + formatWhole(player.stagnantSynestia.temporalDust) + ")")
    }
    if (gain.temporalShard) {
        gain.temporalShard = gain.temporalShard.mul(player.stagnantSynestia.temporalMult).mul(generalMult).floor()
        player.stagnantSynestia.temporalShard = player.stagnantSynestia.temporalShard.add(gain.temporalShard)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.temporalShard) + " temporal shards! (You have " + formatWhole(player.stagnantSynestia.temporalShard) + ")")
    }
    if (gain.gloomingNocturnium) {
        gain.gloomingNocturnium = gain.gloomingNocturnium.mul(player.depth4.depth4Mult).mul(generalMult).floor()
        player.depth4.gloomingNocturnium = player.depth4.gloomingNocturnium.add(gain.gloomingNocturnium)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.gloomingNocturnium) + " glooming nocturnium! (You have " + formatWhole(player.depth4.gloomingNocturnium) + ")")
    }
    if (gain.dimNocturnium) {
        gain.dimNocturnium = gain.dimNocturnium.mul(player.depth4.depth4Mult).mul(generalMult).floor()
        player.depth4.dimNocturnium = player.depth4.dimNocturnium.add(gain.dimNocturnium)
        bhLog("<span style='color: #eed200'>" + str + "You gained " + formatWhole(gain.dimNocturnium) + " dim nocturnium! (You have " + formatWhole(player.depth4.dimNocturnium) + ")")
    }
}

function celestialiteDeath() {
    bhLog(BHC[player.bh.celestialite.id].name + " died!")
    celestialiteReward(BHC[player.bh.celestialite.id].reward())
    if (BHC[player.bh.celestialite.id].onDeath) BHC[player.bh.celestialite.id].onDeath()
    player.bh.respawnTimer = player.bh.respawnMax
    player.bh.combo = player.bh.combo.add(1)

    if (BHC[player.bh.celestialite.id].attributes) {
        // Explosion Modifier
        if (BHC[player.bh.celestialite.id].attributes["explosive"]) {
            for (let i = 0; i < 3; i++) {
                // If dead, go to next character
                if (player.bh.characters[i].health.lte(0) || player.bh.characters[i].id == "none") continue
                // If has shield, block damage
                if (player.bh.characters[i].shield.gt(0)) {
                    player.bh.characters[i].shield = player.bh.characters[i].shield.sub(1)
                    bhLog("<span style='color: #ee8700;'>Shield blocked explosive damage towards " + run(BHP[player.bh.characters[i].id].name, BHP[player.bh.characters[i].id]) + ".</span>")
                    continue
                }
                // Damage Calc
                let damage = BHC[player.bh.celestialite.id].attributes["explosive"]
                damage = damage.mul(Decimal.div(100, Decimal.add(100, player.bh.characters[i].defense)))

                // Damage Application
                player.bh.characters[i].health = player.bh.characters[i].health.sub(damage)
                bhLog("<span style='color: #ee8700;'>[EXPLOSION] " + run(BHP[player.bh.characters[i].id].name, BHP[player.bh.characters[i].id]) + " takes " + format(damage) + " damage.</span>")
            }
        }
    }
    
    if (player.bh.currentStage != "none") {
        if (player[player.bh.currentStage].highestCombo && player.bh.combo.gt(player[player.bh.currentStage].highestCombo)) player[player.bh.currentStage].highestCombo = player.bh.combo
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
                    doPopup("milestone", BHS[player.bh.currentStage].nameCap + ": " + player.bh.combo + " Combo<br>" + charStr + " Character", "Milestone Gotten!", 3, "#888")
                } else {
                    doPopup("milestone", BHS[player.bh.currentStage].nameCap + ": " + player.bh.combo + " Combo<br>" + charStr + " Characters", "Milestone Gotten!", 3, "#888")
                }
            }
        }
        if (player.bh.combo.gte(BHS[player.bh.currentStage].comboLimit)) {
            for (let i = 0; i < 3; i++) {
                player.bh.characters[i].health = player.bh.characters[i].maxHealth
                player.bh.characters[i].shield = new Decimal(0)
                for (let j = 0; j < 4; j++) {
                    player.bh.characters[i].skills[j].variables = {}
                }
            }

            player.bh.currentStage = "none"
            player.bh.combo = new Decimal(0)
            player.bh.celestialite.id = "none"

            player.subtabs["bh"]["stuff"] = "win"
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
    if (BHC[player.bh.celestialite.id].noRandomStats) player.bh.celestialite.randomMult = new Decimal(1)
    player.bh.celestialite.health = BHC[celestialiteId].health ?? new Decimal(0)
    player.bh.celestialite.maxHealth = BHC[celestialiteId].health ?? new Decimal(0)
    player.bh.celestialite.damage = BHC[celestialiteId].damage ?? new Decimal(0)
    player.bh.celestialite.defense = BHC[celestialiteId].defense ?? new Decimal(0)
    player.bh.celestialite.regen = BHC[celestialiteId].regen ?? new Decimal(0)
    player.bh.celestialite.agility = BHC[celestialiteId].agility ?? new Decimal(0)
    player.bh.celestialite.luck = BHC[celestialiteId].luck ?? new Decimal(0)
    player.bh.celestialite.mending = BHC[celestialiteId].mending ?? new Decimal(0)

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
    player.bh.celestialite.agility = player.bh.celestialite.agility.mul(player.bh.celestialite.randomMult)
    player.bh.celestialite.agility = player.bh.celestialite.agility.mul(scale)
    player.bh.celestialite.luck = player.bh.celestialite.luck.mul(player.bh.celestialite.randomMult)
    player.bh.celestialite.luck = player.bh.celestialite.luck.mul(scale)
    player.bh.celestialite.mending = player.bh.celestialite.mending.mul(player.bh.celestialite.randomMult)
    player.bh.celestialite.mending = player.bh.celestialite.mending.mul(scale)
    for (let i = 0; i < 4; i++) {
        if (BHC[player.bh.celestialite.id].actions[i]) {
            if (BHC[player.bh.celestialite.id].actions[i].variables) {
                player.bh.celestialite.actions[i].variables = BHC[player.bh.celestialite.id].actions[i].variables
            }
        }
    }

    if (BHC[player.bh.celestialite.id].onSpawn) BHC[player.bh.celestialite.id].onSpawn()
}

function calcTarget(index, target, action = "none") {
    let playerTaunt = -1
    let celestialiteTaunt = false
    for (let i = 0; i < 3; i++) {
        if (player.bh.characters[i].attributes["taunt"]) playerTaunt = i
    }
    if (player.bh.celestialite.attributes["taunt"]) celestialiteTaunt = true
    switch (target) {
        case "randomPlayer":
            if (celestialiteTaunt && (action == "heal" || action == "effect")) return [3]
            if (playerTaunt >= 0) return [playerTaunt]
            let potTarget = []
            for (let i = 0; i < 3; i++) {
                if (player.bh.characters[i].health.gt(0) && player.bh.characters[i].id != "none") potTarget.push(i)
            }
            let rndP = potTarget[Math.floor(Math.random()*potTarget.length)]
            return [rndP]
        case "random":
            let rndTarget = [3]
            if (playerTaunt >= 0) {
                rndTarget.push(playerTaunt)
            } else {
                for (let i = 0; i < 3; i++) {
                    if (player.bh.characters[i].health.gt(0) && player.bh.characters[i].id != "none") rndTarget.push(i)
                }
            }
            let rndA = rndTarget[Math.floor(Math.random()*rndTarget.length)]
            return [rndA]
        case "self": // Use when start is player
            if (index == 3) return [3]
            return [index]
        case "celestialite":
            return [3]
        case "allPlayer":
            let plays = []
            for (let i = 0; i < 3; i++) {
                if (player.bh.characters[i].health.gt(0) && player.bh.characters[i].id != "none") plays.push(i)
            }
            if (playerTaunt >= 0) {
                for (let i = 0; i < plays.length; i++) {plays[i] = playerTaunt}
            }
            return plays
        case "all":
            let play = []
            for (let i = 0; i < 3; i++) {
                if (player.bh.characters[i].health.gt(0) && player.bh.characters[i].id != "none") play.push(i)
            }
            if (playerTaunt >= 0) {
                for (let i = 0; i < play.length; i++) {play[i] = playerTaunt}
            }
            play.push(3)
            return play
    }
}

function bhLog(line) {
    player.bh.log.push(line); // Push the raw HTML string directly
    if (player.bh.log.length > 10) player.bh.log.shift(); // Ensure log size remains consistent
}

function BHStageEnter(stage) {
    player.subtabs["bh"]["stuff"] = "battle"

    for (let i = 0; i < 3; i++) {
        player.bh.characters[i].health = player.bh.characters[i].maxHealth

        for (let j = 0; j < 4; j++) {
            player.bh.characters[i].skills[j].cooldown = player.bh.characters[i].skills[j].cooldownMax
            player.bh.characters[i].skills[j].duration = new Decimal(0)
            player.bh.characters[i].skills[j].interval = new Decimal(0)
        }
    }

    player.bh.currentStage = stage
    if (player[stage].comboStart) {
        player.bh.combo = new Decimal(player[stage].comboStart)
    } else {
        player.bh.combo = new Decimal(0)
    }
    player.bh.respawnTimer = new Decimal(-1)
    celestialiteSpawn()
}

function screenFlash(message, duration) {
    // Remove any existing flash overlay
    const old = document.getElementById("flash-overlay");
    if (old) old.remove();

    if (!player.bh.bhPause) player.bh.bhPause = true

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "flash-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "black";
    overlay.style.zIndex = "999999";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.2s";

    // Create text
    const text = document.createElement("div");
    text.innerText = message;
    text.style.color = "white";
    text.style.fontSize = "3vw";
    text.style.fontWeight = "bold";
    text.style.textAlign = "center";
    text.style.textShadow = "0 2px 8px #fff";
    overlay.appendChild(text);

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = "0";
        player.bh.bhPause = false
        setTimeout(() => {
            if (overlay.parentNode) overlay.remove();
        }, 200);
    }, duration);
}

function stagnantUpdate(time) {
    let delta = time/5
    for (let z = 0; z < 5; z++) {
        setTimeout(() => {
            // Check if in stage
            if (player.bh.currentStage != "none") {
                // Only trigger when celestialite id is set
                if (player.bh.celestialite.id != "none") {
                    // Celestialite Regen
                    if (player.bh.celestialite.regen.neq(0)) {
                        player.bh.celestialite.health = player.bh.celestialite.health.add(player.bh.celestialite.regen.mul(delta)).min(player.bh.celestialite.maxHealth)
                    }

                    if (player.bh.celestialite.stun[1].gt(0)) {
                        player.bh.celestialite.stun[1] = player.bh.celestialite.stun[1].sub(delta)
                    }
                    // Cycle, increment cooldowns, and trigger celestialite actions
                    for (let i = 0; i < 4; i++) {
                        if (BHC[player.bh.celestialite.id].actions[i]) {
                            if ((player.bh.celestialite.stun[1].gt(0) && player.bh.celestialite.stun[0] == "hard") || player.bh.bulletHell) continue
                            let curStun = player.bh.celestialite.stun[1].gt(0) && player.bh.celestialite.stun[0] == "soft"
                            let instant = BHC[player.bh.celestialite.id].actions[i].instant
                            let active = BHC[player.bh.celestialite.id].actions[i].active
                            let passive = BHC[player.bh.celestialite.id].actions[i].passive
                            if (player.bh.celestialite.actions[i].duration.gt(0)) player.bh.celestialite.actions[i].duration = player.bh.celestialite.actions[i].duration.sub(delta)
                            if (instant || active) {
                                if (!curStun) player.bh.celestialite.actions[i].cooldown = player.bh.celestialite.actions[i].cooldown.add(delta)
                                if (instant && z >= 4) {
                                    if (player.bh.celestialite.actions[i].cooldown.gte(BHC[player.bh.celestialite.id].actions[i].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))) {
                                        if (!BHC[player.bh.celestialite.id].actions[i].conditional || BHC[player.bh.celestialite.id].actions[i].conditional(3, i)) {
                                            for (let z = 0; z < player.bh.celestialite.actionChances.length; z++) {
                                                if (Decimal.mul(player.bh.celestialite.actionChances[z][1], Decimal.div(Decimal.add(100, player.bh.celestialite.luck), 100)).gte(Math.random())) {
                                                    player.bh.celestialite.actions[player.bh.celestialite.actionChances[z][0]].duration = BHC[player.bh.celestialite.id].actions[player.bh.celestialite.actionChances[z][0]].duration
                                                }
                                            }
                                            let mag = player.bh.celestialite.actions[i].cooldown.div(BHC[player.bh.celestialite.id].actions[i].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility)))).floor().toNumber()
                                            bhAction(3, i, false, mag)
                                        }
                                    }
                                }
                                if (active) {
                                    if (player.bh.celestialite.actions[i].cooldown.gte(BHC[player.bh.celestialite.id].actions[i].cooldown.mul(Decimal.div(100, Decimal.add(100, player.bh.celestialite.agility))))) {
                                        if (!BHC[player.bh.celestialite.id].actions[i].conditional || BHC[player.bh.celestialite.id].actions[i].conditional(3, i)) {
                                            player.bh.celestialite.actions[i].cooldown = new Decimal(0)
                                            player.bh.celestialite.actions[i].duration = BHC[player.bh.celestialite.id].actions[i].duration
                                        }
                                    }
                                }
                            }

                            // Calculate Variables (and remove inactive active)
                            if (passive || (active && player.bh.celestialite.actions[i].duration.gt(0))) {
                                if (BHC[player.bh.celestialite.id].actions[i].onTrigger) {
                                    BHC[player.bh.celestialite.id].actions[i].onTrigger(3, i, BHC[player.bh.celestialite.id].actions[i].constantTarget)
                                } else if (BHC[player.bh.celestialite.id].actions[i].interval) {
                                    player.bh.celestialite.actions[i].interval = player.bh.celestialite.actions[i].interval.add(delta)
                                    if (player.bh.celestialite.actions[i].interval.gte(BHC[player.bh.celestialite.id].actions[i].interval)) {
                                        player.bh.celestialite.actions[i].interval = new Decimal(0)
                                        if (!BHC[player.bh.celestialite.id].actions[i].conditional || BHC[player.bh.celestialite.id].actions[i].conditional(3, i)) {
                                            bhAction(3, i, true)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // Cycle Characters
                for (let i = 0; i < 3; i++) {
                    // Check if character is dead before doing anything
                    if (player.bh.characters[i].health.lte(0)) continue

                    // Character Regen
                    if (player.bh.characters[i].regen.neq(0)) {
                        player.bh.characters[i].health = player.bh.characters[i].health.add(player.bh.characters[i].regen.mul(delta)).min(player.bh.characters[i].maxHealth)
                    }

                    if (player.bh.characters[i].stun[1].gt(0)) {
                        player.bh.characters[i].stun[1] = player.bh.characters[i].stun[1].sub(delta)
                    }

                    // Cycle through character skills
                    for (let j = 0; j < 4; j++) {
                        if (player.bh.characters[i].skills[j].id == "none") continue
                        if ((player.bh.characters[i].stun[1].gt(0) && player.bh.characters[i].stun[0] == "hard") || player.bh.bulletHell) continue
                        let curStun = player.bh.characters[i].stun[1].gt(0) && player.bh.characters[i].stun[0] == "soft"
                        let instant = BHA[player.bh.characters[i].skills[j].id].instant
                        let active = BHA[player.bh.characters[i].skills[j].id].active
                        let passive = BHA[player.bh.characters[i].skills[j].id].passive
                        if (player.bh.characters[i].skills[j].duration.gt(0)) player.bh.characters[i].skills[j].duration = player.bh.characters[i].skills[j].duration.sub(delta)
                        if (instant || active) {
                            if (!curStun) player.bh.characters[i].skills[j].cooldown = player.bh.characters[i].skills[j].cooldown.add(delta)
                            if (player.bh.characters[i].skills[j].auto && player.bh.characters[i].skills[j].cooldown.gte(player.bh.characters[i].skills[j].cooldownMax.mul(2))) {
                                if (!BHA[player.bh.characters[i].skills[j].id].conditional || BHA[player.bh.characters[i].skills[j].id].conditional(i, j)) {
                                    if (instant) {
                                        for (let z = 0; z < player.bh.characters[i].actionChances.length; z++) {
                                            if (Decimal.mul(player.bh.characters[i].actionChances[z][1], Decimal.div(Decimal.add(100, player.bh.characters[i].luck), 100)).gte(Math.random())) {
                                                player.bh.characters[i].skills[player.bh.characters[i].actionChances[z][0]].duration = BHA[player.bh.characters[i].skills[player.bh.characters[i].actionChances[z][0]].id].duration
                                            }
                                        }
                                        bhAction(i, j)
                                    }
                                    if (active) {
                                        player.bh.characters[i].skills[j].cooldown = new Decimal(0)
                                        player.bh.characters[i].skills[j].duration = BHA[player.bh.characters[i].skills[j].id].duration
                                    }
                                }
                            }
                        }

                        // Calculate Variables (and remove inactive active)
                        if (passive || (active && player.bh.characters[i].skills[j].duration.gt(0))) {
                            if (BHA[player.bh.characters[i].skills[j].id].interval) {
                                player.bh.characters[i].skills[j].interval = player.bh.characters[i].skills[j].interval.add(delta)
                                if (player.bh.characters[i].skills[j].interval.gte(BHA[player.bh.characters[i].skills[j].id].interval)) {
                                    player.bh.characters[i].skills[j].interval = new Decimal(0)
                                    if (!BHA[player.bh.characters[i].skills[j].id].conditional || BHA[player.bh.characters[i].skills[j].id].conditional(i, j)) {
                                        bhAction(i, j, true)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, 200*z)
    }
}