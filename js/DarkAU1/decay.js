addLayer("dec", {
    name: "Decay", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        decay: new Decimal(0),
        decayPerSecond: new Decimal(0),
        decayEffect: new Decimal(1),
        decayPower: new Decimal(0.01),

        stability: new Decimal(0),
        stabilityPerSecond: new Decimal(0),
        stabilityEffect: new Decimal(1),

        electrons: new Decimal(0),
        electronsPerSecond: new Decimal(0),
        electronsEffect: new Decimal(1),

        alphaParticles: new Decimal(0),
        alphaParticlesPerSecond: new Decimal(0),
        alphaParticlesEffect: new Decimal(1),

        //carbon-14
        carbon14: new Decimal(0),
        carbon14ToGet: new Decimal(0), //does a starmetal reset?
        carbon14DecayPerSecond: new Decimal(0),
        carbon14Effect: new Decimal(1), //boosts dark grass value and capacity
        carbon14Effect2: new Decimal(1),

        nitrogen14: new Decimal(0),
        nitrogen14PerSecond: new Decimal(0),
        nitrogen14Effect: new Decimal(1), //clouds
        nitrogen14Effect2: new Decimal(1),


        //magnesium-28
        magnesium28: new Decimal(0),
        magnesium28ToGet: new Decimal(0),
        magnesium28DecayPerSecond: new Decimal(0),
        magnesium28Effect: new Decimal(1), //boosts generators
        magnesium28Effect2: new Decimal(1),

        aluminum28: new Decimal(0),
        aluminum28PerSecond: new Decimal(0), 
        aluminum28DecayPerSecond: new Decimal(0),
        aluminum28Effect: new Decimal(1), //boosts prestige points
        aluminum28Effect2: new Decimal(1),

        silicon28: new Decimal(0),
        silicon28PerSecond: new Decimal(0),
        silicon28Effect: new Decimal(1), //boosts rank tier tetr
        silicon28Effect2: new Decimal(1), 


        //Dysprosium-154
        dysprosium154: new Decimal(0),
        dysprosium154ToGet: new Decimal(0), //based on normality
        dysprosium154DecayPerSecond: new Decimal(0),
        dysprosium154Effect: new Decimal(1), //boosts normality
        dysprosium154Effect2: new Decimal(1), 

        gadolinium150: new Decimal(0),
        gadolinium150PerSecond: new Decimal(0), 
        gadolinium150DecayPerSecond: new Decimal(0),
        gadolinium150Effect: new Decimal(1), //boosts funify
        gadolinium150Effect2: new Decimal(1),

        samarium146: new Decimal(0),
        samarium146PerSecond: new Decimal(0),
        samarium146DecayPerSecond: new Decimal(0),
        samarium146Effect: new Decimal(1), //boosts space energy
        samarium146Effect2: new Decimal(1),

        neodymium142: new Decimal(0),
        neodymium142PerSecond: new Decimal(0),
        neodymium142Effect: new Decimal(1), //boosts space
        neodymium142Effect2: new Decimal(1),
    }},
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(180deg, #74e3ff 0%, #74ffd1 100%)",
            backgroundOrigin: "border-box",
            color: "#112429",
            transform: "translate(0px, 0px)"
        } 
    },
    tooltip: "Decay",
    branches: [["ani", "#74e3ff"], ["sr", "#74e3ff"], ["tr", "#74e3ff"]],
    color: "#74e3ff",
    update(delta) {

        //decay
        if (player.dec.carbon14.gt(0) || player.dec.magnesium28.gt(0) || player.dec.aluminum28.gt(0) || player.dec.dysprosium154.gt(0) || player.dec.gadolinium150.gt(0) || player.dec.samarium146.gt(0))
        {
            player.dec.decayPerSecond = new Decimal(1)
        } else
        {
            player.dec.decayPerSecond = new Decimal(0)
        }
        if (player.dec.carbon14.gt(0)) player.dec.decayPerSecond = player.dec.decayPerSecond.mul(player.dec.carbon14Effect2)
        if (player.dec.magnesium28.gt(0)) player.dec.decayPerSecond = player.dec.decayPerSecond.mul(player.dec.magnesium28Effect2)
        if (player.dec.aluminum28.gt(0)) player.dec.decayPerSecond = player.dec.decayPerSecond.mul(player.dec.aluminum28Effect2)
        if (player.dec.dysprosium154.gt(0)) player.dec.decayPerSecond = player.dec.decayPerSecond.mul(player.dec.dysprosium154Effect2)
        if (player.dec.gadolinium150.gt(0)) player.dec.decayPerSecond = player.dec.decayPerSecond.mul(player.dec.gadolinium150Effect2)
        if (player.dec.samarium146.gt(0)) player.dec.decayPerSecond = player.dec.decayPerSecond.mul(player.dec.samarium146Effect2)
        if (getLevelableTier("pu", 503, true)) player.dec.decayPerSecond = player.dec.decayPerSecond.mul(levelableEffect("pu", 503)[0])
        if (getLevelableTier("pu", 501, true)) player.dec.decayPerSecond = player.dec.decayPerSecond.mul(levelableEffect("pu", 501)[0])
        player.dec.decayPerSecond = player.dec.decayPerSecond.mul(player.hor.radiation.effect2)

        player.dec.decay = player.dec.decay.add(player.dec.decayPerSecond.mul(delta))

        player.dec.decayPower = new Decimal(0.01)
        if (getLevelableTier("pu", 504, true)) player.dec.decayPower = player.dec.decayPower.mul(levelableEffect("pu", 504)[0])
        

        //stability
        if (player.dec.nitrogen14.gt(0) || player.dec.silicon28.gt(0) || player.dec.neodymium142.gt(0)) 
        {
            player.dec.stabilityPerSecond = new Decimal(1)
        } else
        {
            player.dec.stabilityPerSecond = new Decimal(0)
        }
        if (player.dec.nitrogen14.gt(0)) player.dec.stabilityPerSecond = player.dec.stabilityPerSecond.mul(player.dec.nitrogen14Effect2)
        if (player.dec.silicon28.gt(0)) player.dec.stabilityPerSecond = player.dec.stabilityPerSecond.mul(player.dec.silicon28Effect2)
        if (player.dec.neodymium142.gt(0)) player.dec.stabilityPerSecond = player.dec.stabilityPerSecond.mul(player.dec.neodymium142Effect2)
        if (getLevelableTier("pu", 502, true)) player.dec.stabilityPerSecond = player.dec.stabilityPerSecond.mul(levelableEffect("pu", 502)[0])
        if (getLevelableTier("pu", 503, true)) player.dec.stabilityPerSecond = player.dec.stabilityPerSecond.mul(levelableEffect("pu", 503)[1])
        player.dec.stabilityPerSecond = player.dec.stabilityPerSecond.mul(player.rar.radiation.effect2)
            
        player.dec.stability = player.dec.stability.add(player.dec.stabilityPerSecond.mul(delta))

        //the particles

        //electron
        if (player.dec.carbon14.gt(0) || player.dec.magnesium28.gt(0) || player.dec.aluminum28.gt(0)) 
        {
            player.dec.electronsPerSecond = new Decimal(1)
        } else
        {
            player.dec.electronsPerSecond = new Decimal(0)
        }
        if (getLevelableTier("pu", 505, true)) player.dec.electronsPerSecond = player.dec.electronsPerSecond.mul(levelableEffect("pu", 505)[0])
        if (player.dec.carbon14.gt(0)) player.dec.electronsPerSecond = player.dec.electronsPerSecond.mul(player.dec.carbon14Effect2.cbrt())
        if (player.dec.magnesium28.gt(0)) player.dec.electronsPerSecond = player.dec.electronsPerSecond.mul(player.dec.magnesium28Effect2.cbrt())
        if (player.dec.aluminum28.gt(0)) player.dec.electronsPerSecond = player.dec.electronsPerSecond.mul(player.dec.aluminum28Effect2.cbrt())

        player.dec.electrons = player.dec.electrons.add(player.dec.electronsPerSecond.mul(delta))
        player.dec.electronsEffect = Decimal.div(1, player.dec.electrons.pow(0.25).div(30).add(1))

        //alpha particles
        if (player.dec.dysprosium154.gt(0) || player.dec.gadolinium150.gt(0) || player.dec.samarium146.gt(0)) 
        {
            player.dec.alphaParticlesPerSecond = new Decimal(1)
        } else
        {
            player.dec.alphaParticlesPerSecond = new Decimal(0)
        }
        if (getLevelableTier("pu", 506, true)) player.dec.alphaParticlesPerSecond = player.dec.alphaParticlesPerSecond.mul(levelableEffect("pu", 506)[0])
        if (player.dec.dysprosium154.gt(0)) player.dec.alphaParticlesPerSecond = player.dec.alphaParticlesPerSecond.mul(player.dec.dysprosium154Effect2.cbrt())
        if (player.dec.gadolinium150.gt(0)) player.dec.alphaParticlesPerSecond = player.dec.alphaParticlesPerSecond.mul(player.dec.gadolinium150Effect2.cbrt())
        if (player.dec.samarium146.gt(0)) player.dec.alphaParticlesPerSecond = player.dec.alphaParticlesPerSecond.mul(player.dec.samarium146Effect2.cbrt())

        player.dec.alphaParticles = player.dec.alphaParticles.add(player.dec.alphaParticlesPerSecond.mul(delta))
        player.dec.alphaParticlesEffect = player.dec.alphaParticles.pow(25).add(1)


        //carbon chain
        player.dec.carbon14ToGet = player.dgr.grass.pow(0.045).div(3)
        player.dec.carbon14ToGet = player.dec.carbon14ToGet.mul(buyableEffect("dec", 41))
        player.dec.carbon14DecayPerSecond = player.dec.carbon14.mul(player.dec.decayPower)

        player.dec.carbon14Effect = player.dec.carbon14.pow(2.5).add(1)
        player.dec.carbon14Effect2 = player.dec.carbon14.pow(0.5)

        if (player.dec.carbon14.gt(0))
        {
            player.dec.carbon14 = player.dec.carbon14.sub(player.dec.carbon14DecayPerSecond.mul(delta))
        } else
        {
            player.dec.carbon14 = new Decimal(0)
        }

        player.dec.nitrogen14PerSecond = player.dec.carbon14DecayPerSecond
        player.dec.nitrogen14PerSecond = player.dec.nitrogen14PerSecond.mul(buyableEffect("dec", 42))
        player.dec.nitrogen14 = player.dec.nitrogen14.add(player.dec.nitrogen14PerSecond.mul(delta))

        player.dec.nitrogen14Effect = player.dec.nitrogen14.pow(1.5).add(1)
        player.dec.nitrogen14Effect2 = player.dec.nitrogen14.pow(0.5)

        //magnesium chain
        player.dec.magnesium28ToGet = player.dp.prestigePoints.plus(1).log10().pow(2.5)
        player.dec.magnesium28ToGet = player.dec.magnesium28ToGet.mul(buyableEffect("dec", 43))
        player.dec.magnesium28DecayPerSecond = player.dec.magnesium28.mul(player.dec.decayPower)

        player.dec.magnesium28Effect = player.dec.magnesium28.pow(3.5).add(1)
        player.dec.magnesium28Effect2 = player.dec.magnesium28.pow(0.35)

        if (player.dec.magnesium28.gt(0))
        {
            player.dec.magnesium28 = player.dec.magnesium28.sub(player.dec.magnesium28DecayPerSecond.mul(delta))
        } else
        {
            player.dec.magnesium28 = new Decimal(0)
        }

        player.dec.aluminum28PerSecond = player.dec.magnesium28DecayPerSecond
        player.dec.aluminum28PerSecond = player.dec.aluminum28PerSecond.mul(buyableEffect("dec", 44))
        player.dec.aluminum28 = player.dec.aluminum28.add(player.dec.aluminum28PerSecond.mul(delta))
        player.dec.aluminum28DecayPerSecond = player.dec.aluminum28.mul(player.dec.decayPower)

        if (player.dec.aluminum28.gt(0))
        {
            player.dec.aluminum28 = player.dec.aluminum28.sub(player.dec.aluminum28DecayPerSecond.mul(delta))
        } else
        {
            player.dec.aluminum28 = new Decimal(0)
        }

        player.dec.aluminum28Effect = player.dec.aluminum28.pow(4.5).add(1)
        player.dec.aluminum28Effect2 = player.dec.aluminum28.pow(0.35)

        player.dec.silicon28PerSecond = player.dec.aluminum28DecayPerSecond
        player.dec.silicon28PerSecond = player.dec.silicon28PerSecond.mul(buyableEffect("dec", 45))
        player.dec.silicon28 = player.dec.silicon28.add(player.dec.silicon28PerSecond.mul(delta))

        player.dec.silicon28Effect = player.dec.silicon28.pow(5.5).add(1)
        player.dec.silicon28Effect2 = player.dec.silicon28.pow(0.65)


        //Dysprosium-154
        player.dec.dysprosium154ToGet = player.du.points.plus(1).log10().pow(1.25).div(10)
        player.dec.dysprosium154ToGet = player.dec.dysprosium154ToGet.mul(buyableEffect("dec", 51))
        player.dec.dysprosium154DecayPerSecond = player.dec.dysprosium154.mul(player.dec.decayPower)

        player.dec.dysprosium154Effect = player.dec.dysprosium154.pow(5.5).add(1)
        player.dec.dysprosium154Effect2 = player.dec.dysprosium154.pow(0.25)

        if (player.dec.dysprosium154.gt(0))
        {
            player.dec.dysprosium154 = player.dec.dysprosium154.sub(player.dec.dysprosium154DecayPerSecond.mul(delta))
        } else
        {
            player.dec.dysprosium154 = new Decimal(0)
        }

        player.dec.gadolinium150PerSecond = player.dec.dysprosium154DecayPerSecond
        player.dec.gadolinium150PerSecond = player.dec.gadolinium150PerSecond.mul(buyableEffect("dec", 52))
        player.dec.gadolinium150 = player.dec.gadolinium150.add(player.dec.gadolinium150PerSecond.mul(delta))
        player.dec.gadolinium150DecayPerSecond = player.dec.gadolinium150.mul(player.dec.decayPower)

        player.dec.gadolinium150Effect = player.dec.gadolinium150.pow(1.25).add(1)
        player.dec.gadolinium150Effect2 = player.dec.gadolinium150.pow(0.25)

        if (player.dec.gadolinium150.gt(0))
        {
            player.dec.gadolinium150 = player.dec.gadolinium150.sub(player.dec.gadolinium150DecayPerSecond.mul(delta))
        } else
        {
            player.dec.gadolinium150 = new Decimal(0)
        }

        player.dec.samarium146PerSecond = player.dec.gadolinium150DecayPerSecond
        player.dec.samarium146PerSecond = player.dec.samarium146PerSecond.mul(buyableEffect("dec", 53))
        player.dec.samarium146 = player.dec.samarium146.add(player.dec.samarium146PerSecond.mul(delta))
        player.dec.samarium146DecayPerSecond = player.dec.samarium146.mul(player.dec.decayPower)

        player.dec.samarium146Effect = player.dec.samarium146.pow(2.25).add(1)
        player.dec.samarium146Effect2 = player.dec.samarium146.pow(0.25)

        if (player.dec.samarium146.gt(0))
        {
            player.dec.samarium146 = player.dec.samarium146.sub(player.dec.samarium146DecayPerSecond.mul(delta))
        } else
        {
            player.dec.samarium146 = new Decimal(0)
        }

        player.dec.neodymium142PerSecond = player.dec.samarium146DecayPerSecond
        player.dec.neodymium142PerSecond = player.dec.neodymium142PerSecond.mul(buyableEffect("dec", 54))
        player.dec.neodymium142 = player.dec.neodymium142.add(player.dec.neodymium142PerSecond.mul(delta))

        player.dec.neodymium142Effect = player.dec.neodymium142.pow(2).add(1)
        player.dec.neodymium142Effect2 = player.dec.neodymium142.pow(0.75)

    },
    milestones: {
        
    },
    bars: {},
    clickables: {
        10: {
            title() { return "<h3>Perform a starmetal equivalent reset for " + format(player.dec.carbon14ToGet) + " carbon-14.<br>(based on dark grass)</h3>" },
            canClick() { return player.dec.carbon14ToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < 60; i++) {
                    layers.le.starmetalReset();
                }
                player.dec.carbon14 = player.dec.carbon14.add(player.dec.carbon14ToGet)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgb(255, 255, 255)", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        11: {
            title() { return "<h1 style='display: inline; font-size: 0.5em; vertical-align: middle;'>" + format(player.dec.carbon14) + "</h1>" +
                "<br><span style='display: inline-flex; flex-direction: column-reverse; vertical-align: middle; font-size: 1em; line-height: 1;'><sub style='bottom: 0;'>6</sub><sup style='top: 0;'>14</sup></span><h1 style='display: inline; vertical-align: middle;'>C</h1>"
            },
            tooltip() { return "Boosts dark grass value and capacity by x<h3>" + format(player.dec.carbon14Effect) + "</h3>.<br>Boosts decay by x<h3>" + format(player.dec.carbon14Effect2) + "</h3>." },
            canClick() { return false },
            unlocked() { return true },
            branches: [[12, "#74e3ff"],],
            onClick() { 
            },
            style: { width: "125px", minHeight: "125px", fontSize: "20px", borderRadius: "15px", color: "#fff", borderColor: "#fff", backgroundColor: "#000000"},
        },
        12: {
            title() { return "<h1 style='display: inline; font-size: 0.5em; vertical-align: middle;'>" + format(player.dec.nitrogen14) + "</h1>" +
                "<br><span style='display: inline-flex; flex-direction: column-reverse; vertical-align: middle; font-size: 1em; line-height: 1;'><sub style='bottom: 0;'>7</sub><sup style='top: 0;'>14</sup></span><h1 style='display: inline; vertical-align: middle;'>N</h1>"
            },
            tooltip() { return "+" + format(player.dec.nitrogen14PerSecond) + "/s<br>Boosts clouds by x<h3>" + format(player.dec.nitrogen14Effect)+ "</h3>.<br>Boosts stability by x<h3>" + format(player.dec.nitrogen14Effect2) + "</h3>." },
            canClick() { return false },
            unlocked() { return true },
            onClick() { 
            },
            style: { width: "125px", minHeight: "125px", fontSize: "20px", borderRadius: "15px", color: "#fff", borderColor: "#fff", backgroundColor: "#000000"},
        },


        //MG-28
        20: {
            title() { return "<h3>Perform a starmetal equivalent reset for " + format(player.dec.magnesium28ToGet) + " magnesium-28.<br>(based on dark prestige points)</h3>" },
            canClick() { return player.dec.magnesium28ToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < 60; i++) {
                    layers.le.starmetalReset();
                }
                player.dec.magnesium28 = player.dec.magnesium28.add(player.dec.magnesium28ToGet)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgb(255, 255, 255)", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        21: {
            title() { return "<h1 style='display: inline; font-size: 0.5em; vertical-align: middle;'>" + format(player.dec.magnesium28) + "</h1>" +
                "<br><span style='display: inline-flex; flex-direction: column-reverse; vertical-align: middle; font-size: 1em; line-height: 1;'><sub style='bottom: 0;'>12</sub><sup style='top: 0;'>28</sup></span><h1 style='display: inline; vertical-align: middle;'>Mg</h1>"
            },
            tooltip() { return "Boosts generators by x<h3>" + format(player.dec.magnesium28Effect) + "</h3>.<br>Boosts decay by x<h3>" + format(player.dec.magnesium28Effect2) + "</h3>." },
            canClick() { return false },
            unlocked() { return true },
            branches: [[22, "#74e3ff"],],
            onClick() { 
            },
            style: { width: "125px", minHeight: "125px", fontSize: "20px", borderRadius: "15px", color: "#fff", borderColor: "#fff", backgroundColor: "#000000"},
        },
        22: {
            title() { return "<h1 style='display: inline; font-size: 0.5em; vertical-align: middle;'>" + format(player.dec.aluminum28) + "</h1>" +
                "<br><span style='display: inline-flex; flex-direction: column-reverse; vertical-align: middle; font-size: 1em; line-height: 1;'><sub style='bottom: 0;'>13</sub><sup style='top: 0;'>28</sup></span><h1 style='display: inline; vertical-align: middle;'>Al</h1>"
            },
            tooltip() { return "+" + format(player.dec.aluminum28PerSecond) + "/s<br>Boosts dark prestige points by x<h3>" + format(player.dec.aluminum28Effect) + "</h3>.<br>Boosts decay by x<h3>" + format(player.dec.aluminum28Effect2) + "</h3>." },
            canClick() { return false },
            unlocked() { return true },
            branches: [[23, "#74e3ff"],],
            onClick() { 
            },
            style: { width: "125px", minHeight: "125px", fontSize: "20px", borderRadius: "15px", color: "#fff", borderColor: "#fff", backgroundColor: "#000000"},
        },
        23: {
            title() { return "<h1 style='display: inline; font-size: 0.5em; vertical-align: middle;'>" + format(player.dec.silicon28) + "</h1>" +
                "<br><span style='display: inline-flex; flex-direction: column-reverse; vertical-align: middle; font-size: 1em; line-height: 1;'><sub style='bottom: 0;'>14</sub><sup style='top: 0;'>28</sup></span><h1 style='display: inline; vertical-align: middle;'>Si</h1>"
            },
            tooltip() { return "+" + format(player.dec.silicon28PerSecond) + "/s<br>Boosts dark rank, tier, and tetr points by x<h3>" + format(player.dec.silicon28Effect) + "</h3>.<br>Boosts stability by x<h3>" + format(player.dec.silicon28Effect2) + "</h3>." },
            canClick() { return false },
            unlocked() { return true },
            onClick() { 
            },
            style: { width: "125px", minHeight: "125px", fontSize: "20px", borderRadius: "15px", color: "#fff", borderColor: "#fff", backgroundColor: "#000000"},
        },

        //DY-154
        30: {
            title() { return "<h3>Perform a starmetal equivalent reset for " + format(player.dec.dysprosium154ToGet) + " dysprosium-154.<br>(based on dark celestial points)</h3>" },
            canClick() { return player.dec.dysprosium154ToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < 60; i++) {
                    layers.le.starmetalReset();
                }
                player.dec.dysprosium154 = player.dec.dysprosium154.add(player.dec.dysprosium154ToGet)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgb(255, 255, 255)", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        31: {
            title() { return "<h1 style='display: inline; font-size: 0.5em; vertical-align: middle;'>" + format(player.dec.dysprosium154) + "</h1>" +
                "<br><span style='display: inline-flex; flex-direction: column-reverse; vertical-align: middle; font-size: 1em; line-height: 1;'><sub style='bottom: 0;'>66</sub><sup style='top: 0;'>154</sup></span><h1 style='display: inline; vertical-align: middle;'>Dy</h1>"
            },
            tooltip() { return "Boosts normality by x<h3>" + format(player.dec.dysprosium154Effect) + "</h3>.<br>Boosts decay by x<h3>" + format(player.dec.dysprosium154Effect2) + "</h3>." },
            canClick() { return false },
            unlocked() { return true },
            branches: [[32, "#74e3ff"],],
            onClick() { 
            },
            style: { width: "125px", minHeight: "125px", fontSize: "20px", borderRadius: "15px", color: "#fff", borderColor: "#fff", backgroundColor: "#000000"},
        },
        32: {
            title() { return "<h1 style='display: inline; font-size: 0.5em; vertical-align: middle;'>" + format(player.dec.gadolinium150) + "</h1>" +
                "<br><span style='display: inline-flex; flex-direction: column-reverse; vertical-align: middle; font-size: 1em; line-height: 1;'><sub style='bottom: 0;'>64</sub><sup style='top: 0;'>150</sup></span><h1 style='display: inline; vertical-align: middle;'>Gd</h1>"
            },
            tooltip() { return "+" + format(player.dec.gadolinium150PerSecond) + "/s<br>Boosts fun points by x<h3>" + format(player.dec.gadolinium150Effect) + "</h3>.<br>Boosts decay by x<h3>" + format(player.dec.gadolinium150Effect2) + "</h3>." },
            canClick() { return false },
            unlocked() { return true },
            branches: [[33, "#74e3ff"],],
            onClick() { 
            },
            style: { width: "125px", minHeight: "125px", fontSize: "20px", borderRadius: "15px", color: "#fff", borderColor: "#fff", backgroundColor: "#000000"},
        },
        33: {
            title() { return "<h1 style='display: inline; font-size: 0.5em; vertical-align: middle;'>" + format(player.dec.samarium146) + "</h1>" +
                "<br><span style='display: inline-flex; flex-direction: column-reverse; vertical-align: middle; font-size: 1em; line-height: 1;'><sub style='bottom: 0;'>62</sub><sup style='top: 0;'>146</sup></span><h1 style='display: inline; vertical-align: middle;'>Sm</h1>"
            },
            tooltip() { return "+" + format(player.dec.samarium146PerSecond) + "/s<br>Boosts space energy by x<h3>" + format(player.dec.samarium146Effect) + "</h3>.<br>Boosts decay by x<h3>" + format(player.dec.samarium146Effect2) + "</h3>." },
            canClick() { return false },
            unlocked() { return true },
            branches: [[34, "#74e3ff"],],
            onClick() { 
            },
            style: { width: "125px", minHeight: "125px", fontSize: "20px", borderRadius: "15px", color: "#fff", borderColor: "#fff", backgroundColor: "#000000"},
        },
        34: {
            title() { return "<h1 style='display: inline; font-size: 0.5em; vertical-align: middle;'>" + format(player.dec.neodymium142) + "</h1>" +
                "<br><span style='display: inline-flex; flex-direction: column-reverse; vertical-align: middle; font-size: 1em; line-height: 1;'><sub style='bottom: 0;'>60</sub><sup style='top: 0;'>142</sup></span><h1 style='display: inline; vertical-align: middle;'>Nd</h1>"
            },
            tooltip() { return "+" + format(player.dec.neodymium142PerSecond) + "/s<br>Boosts length, width, depth, and spissitude by x<h3>" + format(player.dec.neodymium142Effect) + "</h3>.<br>Boosts stability by x<h3>" + format(player.dec.neodymium142Effect2) + "</h3>." },
            canClick() { return false },
            unlocked() { return true },
            branches: [[34, "#74e3ff"],],
            onClick() { 
            },
            style: { width: "125px", minHeight: "125px", fontSize: "20px", borderRadius: "15px", color: "#fff", borderColor: "#fff", backgroundColor: "#000000"},
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dec.decay},
            pay(amt) { player.dec.decay = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(1.2)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Decaying Darkness"
            },
            display() {
                return "which are boosting dark radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Decay"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        12: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dec.decay},
            pay(amt) { player.dec.decay = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(1.1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Decaying Chronos"
            },
            display() {
                return "which are boosting time radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Decay"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        13: {
            costBase() { return new Decimal(7500) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dec.decay},
            pay(amt) { player.dec.decay = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.15).add(1).pow(0.9)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Decaying Heart"
            },
            display() {
                return "which are boosting heart radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Decay"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        14: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dec.decay},
            pay(amt) { player.dec.decay = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(0.5)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Decaying Stones"
            },
            display() {
                return "which are boosting temporal radiation stone gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Decay"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },


        21: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dec.stability},
            pay(amt) { player.dec.stability = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(1.15)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Stable Rainbow"
            },
            display() {
                return "which are boosting colored radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stability"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        22: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dec.stability},
            pay(amt) { player.dec.stability = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.2).add(1).pow(1.1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Stable Cosmos"
            },
            display() {
                return "which are boosting space radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stability"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        23: {
            costBase() { return new Decimal(25000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dec.stability},
            pay(amt) { player.dec.stability = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.15).add(1).pow(0.9)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Stable Mind"
            },
            display() {
                return "which are boosting mind radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stability"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        24: {
            costBase() { return new Decimal(750000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dec.stability},
            pay(amt) { player.dec.stability = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(0.5)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Stable Stones"
            },
            display() {
                return "which are boosting cosmic radiation stone gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stability"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },


        //NOT PERMANENT (Make sure they reset)
        31: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.decay},
            pay(amt) { player.dec.decay = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Decayed Time Multiplier"
            },
            display() {
                return "which are boosting eclipse timer tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Decay"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        32: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.decay},
            pay(amt) { player.dec.decay = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(2).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Decayed Time Multiplier^2"
            },
            display() {
                return "which are boosting eclipse timer tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Decay"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        33: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.decay},
            pay(amt) { player.dec.decay = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(3).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Decayed Time Multiplier^3"
            },
            display() {
                return "which are boosting eclipse timer tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Decay"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        34: {
            costBase() { return new Decimal(3333) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.stability},
            pay(amt) { player.dec.stability = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Stable Time Multiplier"
            },
            display() {
                return "which are boosting eclipse timer tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stability"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        35: {
            costBase() { return new Decimal(66666) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.stability},
            pay(amt) { player.dec.stability = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(2).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Stable Time Multiplier^2"
            },
            display() {
                return "which are boosting eclipse timer tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stability"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        36: {
            costBase() { return new Decimal(999999) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.stability},
            pay(amt) { player.dec.stability = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(3).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Stable Time Multiplier^3"
            },
            display() {
                return "which are boosting eclipse timer tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stability"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },

        //electron
        41: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.electrons},
            pay(amt) { player.dec.electrons = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).div(3).pow(0.85).add(1)
                return eff
            },
            unlocked() { return getLevelableTier("pu", 501, true) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Carbon-14 Multiplier"
            },
            display() {
                return "which are boosting carbon-14 gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Electrons"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        42: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.electrons},
            pay(amt) { player.dec.electrons = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).div(3).pow(0.85).add(1)
                return eff
            },
            unlocked() { return getLevelableTier("pu", 501, true) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Nitrogen-14 Multiplier"
            },
            display() {
                return "which are boosting nitrogen-14 gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Electrons"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        43: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.electrons},
            pay(amt) { player.dec.electrons = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).div(3).pow(0.75).add(1)
                return eff
            },
            unlocked() { return getLevelableTier("pu", 502, true) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Magnesium-28 Multiplier"
            },
            display() {
                return "which are boosting magnesium-28 gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Electrons"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        44: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.electrons},
            pay(amt) { player.dec.electrons = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).div(3).pow(0.75).add(1)
                return eff
            },
            unlocked() { return getLevelableTier("pu", 502, true) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Aluminum-28 Multiplier"
            },
            display() {
                return "which are boosting aluminum-28 gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Electrons"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        45: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.electrons},
            pay(amt) { player.dec.electrons = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).div(3).pow(0.75).add(1)
                return eff
            },
            unlocked() { return getLevelableTier("pu", 502, true) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Silicon-28 Multiplier"
            },
            display() {
                return "which are boosting silicon-28 gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Electrons"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },

        //alpha
        51: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.alphaParticles},
            pay(amt) { player.dec.alphaParticles = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).div(3).pow(0.7).add(1)
                return eff
            },
            unlocked() { return getLevelableTier("pu", 504, true) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dysprosium-154 Multiplier"
            },
            display() {
                return "which are boosting dysprosium-154 gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Alpha Particles"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        52: {
            costBase() { return new Decimal(150) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.alphaParticles},
            pay(amt) { player.dec.alphaParticles = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).div(3).pow(0.7).add(1)
                return eff
            },
            unlocked() { return getLevelableTier("pu", 504, true) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Gadolinium-150 Multiplier"
            },
            display() {
                return "which are boosting gadolinium-150 gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Alpha Particles"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        53: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.alphaParticles},
            pay(amt) { player.dec.alphaParticles = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).div(3).pow(0.7).add(1)
                return eff
            },
            unlocked() { return getLevelableTier("pu", 504, true) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Samarium-146 Multiplier"
            },
            display() {
                return "which are boosting samarium-146 gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Alpha Particles"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
        54: {
            costBase() { return new Decimal(2000) },
            costGrowth() { return new Decimal(1.45) },
            purchaseLimit() { return new Decimal(999) },
            currency() { return player.dec.alphaParticles},
            pay(amt) { player.dec.alphaParticles = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).div(3).pow(0.7).add(1)
                return eff
            },
            unlocked() { return getLevelableTier("pu", 504, true) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Neodymium-142 Multiplier"
            },
            display() {
                return "which are boosting neodymium-142 gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Alpha Particles"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#1d3b42", borderColor: "#51a2b6" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
  
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #74e3ff", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "Unlike other Alt-Dark U1 content, decay content is reset on exiting D1." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                                        ["style-row", [
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.decay) + "</h3> decay." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.decayPerSecond) + "</h3> decay per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from decaying isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.stability) + "</h3> stability." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.stabilityPerSecond) + "</h3> stability per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from stable isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ], () => {return true ? {width: "1000px", height: "100px",}: {display: "none !important"}}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "Permanent Buyables" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 11], ["dark-buyable", 12], ["dark-buyable", 13], ["dark-buyable", 14]]],
                    ["row", [["dark-buyable", 21], ["dark-buyable", 22], ["dark-buyable", 23], ["dark-buyable", 24]]],

                ]
            },
            "Carbon-14": {
                buttonStyle() { return { border: "2px solid #74e3ff", borderRadius: "10px" } },
                unlocked() { return getLevelableTier("pu", 501, true) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "Decay Power: " + format(player.dec.decayPower.mul(100)) + "%. (Amount of an unstable isotope decays per second)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                        ["style-row", [
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.decay) + "</h3> decay." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.decayPerSecond) + "</h3> decay per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from decaying isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.stability) + "</h3> stability." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.stabilityPerSecond) + "</h3> stability per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from stable isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ], () => {return true ? {width: "1000px", height: "100px",}: {display: "none !important"}}],
                    ["blank", "25px"],
                    ["clickable", 10],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<h1>β</h1>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "black", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 12],]],
                ]   
            },
            "Magnesium-28": {
                buttonStyle() { return { border: "2px solid #74e3ff", borderRadius: "10px" } },
                unlocked() { return getLevelableTier("pu", 502, true) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "Decay Power: " + format(player.dec.decayPower.mul(100)) + "%. (Amount of an unstable isotope decays per second)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                        ["style-row", [
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.decay) + "</h3> decay." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.decayPerSecond) + "</h3> decay per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from decaying isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.stability) + "</h3> stability." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.stabilityPerSecond) + "</h3> stability per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from stable isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ], () => {return true ? {width: "1000px", height: "100px",}: {display: "none !important"}}],
                    ["blank", "25px"],
                    ["clickable", 20],
                    ["blank", "25px"],
                    ["row", [["clickable", 21], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<h1>β</h1>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "black", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 22], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<h1>β</h1>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "black", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 23],]],
                ]   
            },
            "Dysprosium-154": {
                buttonStyle() { return { border: "2px solid #74e3ff", borderRadius: "10px" } },
                unlocked() { return getLevelableTier("pu", 504, true) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "Decay Power: " + format(player.dec.decayPower.mul(100)) + "%. (Amount of an unstable isotope decays per second)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                        ["style-row", [
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.decay) + "</h3> decay." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.decayPerSecond) + "</h3> decay per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from decaying isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.stability) + "</h3> stability." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.stabilityPerSecond) + "</h3> stability per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from stable isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ], () => {return true ? {width: "1000px", height: "100px",}: {display: "none !important"}}],
                    ["blank", "25px"],
                    ["clickable", 30],
                    ["blank", "25px"],
                    ["row", [["clickable", 31], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<h1>α</h1>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "black", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 32], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<h1>α</h1>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "black", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 33], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<h1>α</h1>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "black", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 34],]],
                ]   
            },
            "Neutron": {
                buttonStyle() { return { border: "2px solid #74e3ff", borderRadius: "10px" } },
                unlocked() { return getLevelableTier("pu", 503, true) },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.decay) + "</h3> decay." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.decayPerSecond) + "</h3> decay per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from decaying isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ["style-column", [
        ["raw-html", () => { return "You have <h3>" + format(player.dec.stability) + "</h3> stability." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.stabilityPerSecond) + "</h3> stability per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Produced from stable isotopes)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ], () => {return true ? {width: "500px", height: "100px",}: {display: "none !important"}}],
                    ], () => {return true ? {width: "1000px", height: "100px",}: {display: "none !important"}}],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 31], ["dark-buyable", 32], ["dark-buyable", 33],]],
                    ["row", [["dark-buyable", 34], ["dark-buyable", 35], ["dark-buyable", 36],]],
                ]   
            },
            "Electrons": {
                buttonStyle() { return { border: "2px solid #74e3ff", borderRadius: "10px" } },
                unlocked() { return getLevelableTier("pu", 505, true) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "Electrons are gained from isotopes undergoing BETA DECAY. (Cube rooted from how much it boosts decay gain)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.dec.electrons) + "</h3> electrons." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.electronsPerSecond) + "</h3> electrons per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Raises universe reset requirement by ^<h3>" + format(player.dec.electronsEffect) + "</h3>." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 41], ["dark-buyable", 42],]],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 43], ["dark-buyable", 44],["dark-buyable", 45],]],
                ]   
            },
            "Alpha Particles": {
                buttonStyle() { return { border: "2px solid #74e3ff", borderRadius: "10px" } },
                unlocked() { return getLevelableTier("pu", 506, true) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "Alpha particles are gained from isotopes undergoing ALPHA DECAY. (Cube rooted from how much it boosts decay gain)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.dec.alphaParticles) + "</h3> alpha particles." }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "You are gaining <h3>" + format(player.dec.alphaParticlesPerSecond) + "</h3> alpha particles per second." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts dark celestial point gain by x<h3>" + format(player.dec.alphaParticlesEffect) + "</h3>." }, {color: "#ffffff", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 51], ["dark-buyable", 52], ["dark-buyable", 53], ["dark-buyable", 54],]],
                ]   
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.ani.darkRadiation) + "</h3> dark radiation. (+" + format(player.ani.darkRadiationToGet) + "/" + formatTime(player.ani.timer.max) + ")" }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].active ? "Boosts eclipse timer tickspeed by x<h3>" + format(player.ani.darkRadiationEffect) + "</h3>." : "Boosts length, width, and depth by x<h3>" + format(player.ani.darkRadiationEffect2) + "</h3>." }, {color: "#ffffff", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "5px"],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.sma.inStarmetalChallenge && hasUpgrade("ani", 26)},
    deactivated() { return !player.sma.inStarmetalChallenge},
})