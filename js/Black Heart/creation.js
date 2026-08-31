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

        //upgrade
        player.creation.upgradeCost = player.creation.upgradeAmount.add(1).pow(0.8).mul(3)
        player.creation.upgradeEffect = player.creation.upgradeAmount.pow(0.875).mul(0.5).add(1)
        
        //prestige
        player.creation.prestigeReq = player.creation.prestigeAmount.mul(0.5).add(1).pow(1.25).mul(25)
        player.creation.prestigeEffect = player.creation.prestigeAmount.pow(0.75).mul(0.35).add(1)

        //mult
        player.creation.incrementalEnergyMult = new Decimal(1)
        player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.mul(player.creation.upgradeEffect)
        player.creation.incrementalEnergyMult = player.creation.incrementalEnergyMult.mul(player.creation.prestigeEffect)

        //heal
        player.creation.healAmount = player.creation.incrementalEnergy.mul(2)
    },
    resetCreation() {
        player.creation.incrementalEnergy = new Decimal(0)
        player.creation.upgradeAmount = new Decimal(0)
        player.creation.prestigeAmount = new Decimal(0)
    },
    infoboxes: {},
    layerShown() { return false }
})

