addLayer("creation", {
    name: "Creation", // This is optional, only used in a few places, If absent it just uses the layer id.
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        creationIndex: 0,

        incrementalEnergy: new Decimal(0),
        incrementalEnergyMult: new Decimal(1),

        softcap: new Decimal(1),
        softcapStart: new Decimal(80),

        //upgrade
        upgradeCost: new Decimal(10),
        upgradeAmount: new Decimal(0),
        upgradeEffect: new Decimal(1),

        //prestige
        prestigeAmount: new Decimal(0),
        prestigeEffect: new Decimal(1),
        prestigeReq: new Decimal(50),

        //heal
        healAmount: new Decimal(0),
    }},
    update(delta) {
        //index
        for (let i = 0; i < 3; i++) {
            if (player.bh.characters[i].id == "creation") {
                player.creation.creationIndex = i
            }
        }

        if (player.creation.incrementalEnergy.lt(0)) player.creation.incrementalEnergy = new Decimal(0)

        //upgrade
        player.creation.upgradeCost = player.creation.upgradeAmount.add(1).pow(0.8).mul(3)
        player.creation.upgradeEffect = player.creation.upgradeAmount.pow(0.875).mul(0.5).add(1)
        
        //prestige
        player.creation.prestigeReq = player.creation.prestigeAmount.mul(0.5).add(1).pow(1.25).mul(25)
        player.creation.prestigeEffect = player.creation.prestigeAmount.pow(0.5).mul(0.25).add(1)

        //mult
        player.creation.incrementalEnergyMult = new Decimal(1)
        player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.mul(player.creation.upgradeEffect)
        player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.mul(player.creation.prestigeEffect)
        if (player.bh.characterData["nox"].batActive) player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.mul(3)
        player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.div(player.creation.softcap)
        if (hasUpgrade("anl", 32)) player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.mul(1.1)
        if (player.bh.currentStage == "roomF" || player.bh.currentStage == "roomG") player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.div(1.5)
        if (player.bh.currentStage == "roomH") player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.div(2)
        player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.mul(challengeEffect("anl", 15))

        //heal
        player.creation.healAmount = player.creation.incrementalEnergy.mul(4).pow(0.75)

        if (player.bh.skillData['nox_bloodDrain'].selected[0] == "nox" && player.bh.characters[player.bh.characterData['nox'].index].health.gt(0) && player.bh.characterData['nox'].used) {
            let gain = Decimal.mul(0.6, player.creation.incrementalEnergyMult.mul(player.bh.skillData["nox_bloodDrain"].level.mul(0.25).add(1)))
            if (!player.bh.bhPause && !player.bh.flipside) player.creation.incrementalEnergy = player.creation.incrementalEnergy.add(gain.mul(delta))
            if (!player.bh.bhPause && player.bh.flipside && player.creation.incrementalEnergy.gt(0)) player.creation.incrementalEnergy = player.creation.incrementalEnergy.sub(gain.div(6).mul(delta))
        }

        player.creation.softcapStart = new Decimal(80)
        if (hasUpgrade("anl", 11)) player.creation.softcapStart = player.creation.softcapStart.add(5)
        if (hasUpgrade("anl", 12)) player.creation.softcapStart = player.creation.softcapStart.add(5)
        if (player.creation.incrementalEnergy.gte(player.creation.softcapStart))
        {
            player.creation.softcap = player.creation.incrementalEnergy.sub(player.creation.softcapStart).pow(0.5).add(1)
        } else
        {
            player.creation.softcap = new Decimal(1)
        }

        if (inChallenge("anl", 15) && player.creation.incrementalEnergy.gte(Decimal.add(1, challengeCompletions("anl", 15)).mul(200))) {
            player.anl.challenges[15] = player.anl.challenges[15] + 1
            startChallenge("anl", 15)
        }
    },
    resetCreation() {
        player.creation.incrementalEnergy = new Decimal(0)
        player.creation.upgradeAmount = new Decimal(0)
        player.creation.prestigeAmount = new Decimal(0)
    },
    infoboxes: {},
    layerShown() { return false }
})

