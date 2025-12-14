const petShopShardName = ["Evolution Shard", "Paragon Shard"]
const petShopCrateName = ["Common Crate", "Common/Uncommon Crate", "Uncommon Crate", "Antimatter Crate", "Replicanti Crate", "Rare Crate"]
addLayer("pet", {
    name: "Pets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Pet", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        paused: false,

        petCooldownDiv: new Decimal(1),
        petPointMult: new Decimal(1),
        petButtonTimer: [new Decimal(40), new Decimal(20), new Decimal(900), new Decimal(18000), new Decimal(180), new Decimal(1500), new Decimal(1), new Decimal(4500), new Decimal(8000)],

        lastDicePetRoll: new Decimal(0),
        dicePetRoll: new Decimal(0),
        highestDicePetCombo: new Decimal(0),
        dicePetCombo: new Decimal(0),
        dicePetPointsGain: new Decimal(0),

        singularityFragments: new Decimal(0),

        // FRAGMENTATION
        bannerID: [101, 101, 201, 201, 301],
        bannerIndex: 0,

        bannerResetTimer: new Decimal(0),
        bannerResetTimerMax: new Decimal(21600),
        bannerButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        bannerButtonTimersMax: [new Decimal(900), new Decimal(900), new Decimal(2700), new Decimal(2700), new Decimal(7200)],
        
        //singularity
        singularityButtonTimers: [new Decimal(0), new Decimal(0),],
        singularityButtonTimersMax: [new Decimal(600), new Decimal(3600),],

        // Legendary Gems
        legendaryGemsToGetMin: new Decimal(0),
        legendaryGemsToGetMax: new Decimal(0),

        legendaryGemTimer: new Decimal(0),
        legendaryGemTimerMax: new Decimal(86400),

        gemEffects: [new Decimal(1), new Decimal(1), new Decimal(1)], // Red, Purple, Green

        //summon
        summonReqs: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], // Red, Purple, Green
        summonTimer: new Decimal(0),
        summonTimer: new Decimal(21600),

        summonIndex: new Decimal(0),

        // PET SHOP
        shopResetTimer: new Decimal(0),
        shopResetTimerMax: new Decimal(21600),
        shopIndex: 101,

        commonPrices: [new Decimal(10), new Decimal(10), new Decimal(10), new Decimal(10), new Decimal(10), new Decimal(20), new Decimal(20), new Decimal(30), new Decimal(30)],
        commonBought: [0, 0, 0, 0, 0, 0, 0, 0, 0],

        uncommonPrices: [new Decimal(25), new Decimal(25), new Decimal(25), new Decimal(25), new Decimal(25), new Decimal(50), new Decimal(50), new Decimal(75), new Decimal(75)],
        uncommonBought: [0, 0, 0, 0, 0, 0, 0, 0, 0],

        rarePrices: [new Decimal(200), new Decimal(200), new Decimal(200), new Decimal(200), new Decimal(200), new Decimal(400), new Decimal(400)],
        rareBought: [0, 0, 0, 0, 0, 0, 0],
        
        shardPrices: [new Decimal(500), new Decimal(25000)],
        shardBought: [0, 0],

        cratePrices: [new Decimal(10), new Decimal(20), new Decimal(40), new Decimal(150), new Decimal(75), new Decimal(300)],
        crateBought: [0, 0, 0, 0, 0, 0],

        //leg
        legendaryPetAbilityCooldowns: [new Decimal(0),new Decimal(0),],
        legendaryPetAbilityCooldownsMax: [new Decimal(3600),new Decimal(7200),],

        legendaryPetAbilityTimers: [new Decimal(0),new Decimal(0),],
        legendaryPetAbilityTimersMax: [new Decimal(600),new Decimal(300),],
        eclipsePity: 0,

        activeAbilities: [false,false,],
        
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Pets",
    color: "#4e7cff",
    branches: [],
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        // PET COOLDOWN DIVIDER
        player.pet.petCooldownDiv = new Decimal(1)
        player.pet.petCooldownDiv = player.pet.petCooldownDiv.mul(buyableEffect("ev0", 14))
        player.pet.petCooldownDiv = player.pet.petCooldownDiv.mul(levelableEffect("pet", 1203)[0])
        player.pet.petCooldownDiv = player.pet.petCooldownDiv.mul(levelableEffect("pet", 401)[1])

        // PET POINT MULTIPLIER
        player.pet.petPointMult = new Decimal(1)
        player.pet.petPointMult = player.pet.petPointMult.mul(levelableEffect("pet", 1204)[1])
        player.pet.petPointMult = player.pet.petPointMult.mul(buyableEffect("cb", 14))
        if (hasUpgrade("ev8", 13)) player.pet.petPointMult = player.pet.petPointMult.mul(1.2)
        player.pet.petPointMult = player.pet.petPointMult.mul(levelableEffect("pet", 401)[0])
        player.pet.petPointMult = player.pet.petPointMult.mul(levelableEffect("pet", 406)[2])
        player.pet.petPointMult = player.pet.petPointMult.mul(player.pet.gemEffects[1])
        player.pet.petPointMult = player.pet.petPointMult.mul(buyableEffect("ep4", 12))
        player.pet.petPointMult = player.pet.petPointMult.mul(buyableEffect("pl", 14))
        if (hasMilestone("db", 101)) player.pet.petPointMult = player.pet.petPointMult.mul(1.15)

        // PET BUTTON COOLDOWN CALC
        for (let i = 0; i < player.pet.petButtonTimer.length; i++) {
            player.pet.petButtonTimer[i] = player.pet.petButtonTimer[i].sub(onepersec.mul(player.ev10.checkbackBoost).mul(delta))
        }

        // DICE STUFF
        if (player.pet.dicePetCombo > player.pet.highestDicePetCombo) {
            player.pet.highestDicePetCombo = player.pet.dicePetCombo
        }

        // =- FRAGMENTATION START -=
        player.pet.bannerResetTimer = player.pet.bannerResetTimer.sub(onepersec.mul(delta))
        if (player.pet.bannerResetTimer.lte(0)) {
            layers.pet.refreshBanner();
        }

        player.pet.bannerResetTimerMax = new Decimal(21600)
        player.pet.bannerButtonTimersMax = [new Decimal(1800), new Decimal(1800), new Decimal(3600), new Decimal(3600), new Decimal(7200)]
        for (let i = 0; i < player.pet.bannerButtonTimersMax.length; i++) {
            player.pet.bannerButtonTimersMax[i] = player.pet.bannerButtonTimersMax[i].div(buyableEffect("ep3", 13))

            player.pet.bannerButtonTimers[i] = player.pet.bannerButtonTimers[i].sub(onepersec.mul(delta))
        }

        player.pet.singularityButtonTimersMax = [new Decimal(1800), new Decimal(10800),]
        for (let i = 0; i < player.pet.singularityButtonTimersMax.length; i++) {
            player.pet.singularityButtonTimersMax[i] = player.pet.singularityButtonTimersMax[i].div(buyableEffect("ep4", 13))
 
            player.pet.singularityButtonTimers[i] = player.pet.singularityButtonTimers[i].sub(onepersec.mul(delta))
        }

        // =- LEGENDARY GEMS -=
        player.pet.legendaryGemsToGetMin = player.cb.XPBoost.pow(0.2).div(2).floor()
        player.pet.legendaryGemsToGetMin = player.pet.legendaryGemsToGetMin.mul(levelableEffect("ir", 5)[1])
        player.pet.legendaryGemsToGetMin = player.pet.legendaryGemsToGetMin.mul(buyableEffect("cof", 33))

        player.pet.legendaryGemsToGetMax = player.cb.XPBoost.pow(0.25).div(2).floor()
        player.pet.legendaryGemsToGetMax = player.pet.legendaryGemsToGetMax.mul(levelableEffect("ir", 5)[1])
        player.pet.legendaryGemsToGetMax = player.pet.legendaryGemsToGetMax.mul(buyableEffect("cof", 33))

        player.pet.legendaryGemTimerMax = new Decimal(86400)
        player.pet.legendaryGemTimer = player.pet.legendaryGemTimer.sub(onepersec.mul(delta))

        player.pet.gemEffects[0] = player.cb.legendaryPetGems[0].pow(0.1).div(5).add(1)
        player.pet.gemEffects[1] = player.cb.legendaryPetGems[1].pow(0.07).div(10).add(1)
        player.pet.gemEffects[2] = player.cb.legendaryPetGems[2].pow(0.05).div(7).add(1)

        player.pet.summonTimerMax = new Decimal(21600)
        player.pet.summonTimer = player.pet.summonTimer.sub(onepersec.mul(delta))

        const hours = new Date().getHours() % 6;

        if (hours >= 0 && hours <= 1) {
            player.pet.summonReqs = [
                new Decimal(20),
                new Decimal(10),
                new Decimal(10),
                new Decimal(20),
                new Decimal(0),
            ]
        }
        if (hours > 1 && hours <= 2) {
            player.pet.summonReqs = [
                new Decimal(15),
                new Decimal(15),
                new Decimal(10),
                new Decimal(16),
                new Decimal(1),
            ]
        }
        if (hours > 2 && hours <= 3) {
            player.pet.summonReqs = [
                new Decimal(10),
                new Decimal(20),
                new Decimal(10),
                new Decimal(12),
                new Decimal(2),
            ]
        }
        if (hours > 3 && hours <= 4) {
            player.pet.summonReqs = [
                new Decimal(10),
                new Decimal(15),
                new Decimal(15),
                new Decimal(8),
                new Decimal(3),
            ]
        }
        if (hours > 4 && hours <= 5) {
            player.pet.summonReqs = [
                new Decimal(10),
                new Decimal(10),
                new Decimal(20),
                new Decimal(4),
                new Decimal(4),
            ]
        }
        if (hours > 5 && hours <= 6) {
            player.pet.summonReqs = [
                new Decimal(15),
                new Decimal(10),
                new Decimal(15),
                new Decimal(0),
                new Decimal(5),
            ]
        }

        // =- PET SHOP START -=
        player.pet.shopResetTimerMax = new Decimal(21600)
        player.pet.shopResetTimer = player.pet.shopResetTimer.sub(onepersec.mul(delta))

        player.pet.commonPrices = [new Decimal(10), new Decimal(10), new Decimal(10), new Decimal(10), new Decimal(10), new Decimal(20), new Decimal(20), new Decimal(30), new Decimal(30)]
        for (let i = 0; i < player.pet.commonPrices.length; i++) {
            player.pet.commonPrices[i] = player.pet.commonPrices[i].add(new Decimal(10).mul(player.pet.commonBought[i]))
        }

        player.pet.uncommonPrices = [new Decimal(25), new Decimal(25), new Decimal(25), new Decimal(25), new Decimal(25), new Decimal(50), new Decimal(50), new Decimal(75), new Decimal(75)]
        for (let i = 0; i < player.pet.uncommonPrices.length; i++) {
            player.pet.uncommonPrices[i] = player.pet.uncommonPrices[i].add(new Decimal(25).mul(player.pet.uncommonBought[i]))
        }

        player.pet.rarePrices = [new Decimal(200), new Decimal(200), new Decimal(200), new Decimal(200), new Decimal(200), new Decimal(400), new Decimal(400)]
        for (let i = 0; i < player.pet.rarePrices.length; i++) {
            player.pet.rarePrices[i] = player.pet.rarePrices[i].add(new Decimal(100).mul(player.pet.rareBought[i]))
        }

        player.pet.shardPrices = [new Decimal(500), new Decimal(25000)]
        player.pet.shardPrices[0] = player.pet.shardPrices[0].add(new Decimal(500).mul(player.pet.shardBought[0]))
        player.pet.shardPrices[1] = player.pet.shardPrices[1].add(new Decimal(25000).mul(player.pet.shardBought[1]))

        player.pet.cratePrices = [new Decimal(16), new Decimal(30), new Decimal(50), new Decimal(200), new Decimal(100), new Decimal(500)]
        player.pet.cratePrices[0] = player.pet.cratePrices[0].add(new Decimal(8).mul(player.pet.crateBought[0]))
        player.pet.cratePrices[1] = player.pet.cratePrices[1].add(new Decimal(15).mul(player.pet.crateBought[1]))
        player.pet.cratePrices[2] = player.pet.cratePrices[2].add(new Decimal(25).mul(player.pet.crateBought[2]))
        player.pet.cratePrices[3] = player.pet.cratePrices[3].add(new Decimal(100).mul(player.pet.crateBought[3]))
        player.pet.cratePrices[4] = player.pet.cratePrices[4].add(new Decimal(50).mul(player.pet.crateBought[4]))
        player.pet.cratePrices[5] = player.pet.cratePrices[5].add(new Decimal(250).mul(player.pet.crateBought[5]))

        //legendary pets

        player.pet.legendaryPetAbilityTimersMax = [new Decimal(600),new Decimal(300),]
        player.pet.legendaryPetAbilityTimersMax[0] = player.pet.legendaryPetAbilityTimersMax[0].mul(levelableEffect("pu", 303)[1])

        if (getLevelableBool("pu", 303)) player.pet.legendaryPetAbilityTimersMax[0] = player.pet.legendaryPetAbilityTimersMax[0].mul(levelableEffect("pu", 303)[0])
        
        let abilityTimeDecrease = new Decimal(1)
        if (getLevelableBool("pu", 303)) abilityTimeDecrease = abilityTimeDecrease.div(levelableEffect("pu", 303)[0])
        player.pet.legendaryPetAbilityTimers[0] = player.pet.legendaryPetAbilityTimers[0].sub(abilityTimeDecrease.mul(delta))

        if (player.pet.legendaryPetAbilityTimers[0].lte(0) && player.pet.activeAbilities[0]) {
            player.pet.activeAbilities[0] = false
            player.sma.eclipseShards = player.sma.eclipseShards.add(player.le.eclipseShardsToGetTrue.floor())
            player.le.starmetalAlloyPauseAgain = new Decimal(10)
            for (let prop in player.pu.levelables) {
                if (getLevelableBool("pu", prop)) {
                    addLevelableXP("pu", prop, player.le.eclipseShardsToGetTrue.mul(player.le.eclipseShardsValue).floor())
                }
                setLevelableBool("pu", prop, false)
            }
            player.le.starmetalAlloyToGet = new Decimal(0)
            player.le.eclipseShardsToGet = new Decimal(0)
            player.le.resetAmount = new Decimal(0)

            if (!hasUpgrade("sma", 15)) player.pu.storedSelections = new Decimal(0)
            if (hasUpgrade("sma", 15)) player.pu.storedSelections = new Decimal(1)

            player.sma.inStarmetalChallenge = false
            player.universe = 3
            player.tab = "sma"
            player.subtabs.pu["stuff"] = "Collection"

            layers.pu.generateSelection();
        }

        for (let i = 0; i < player.pet.legendaryPetAbilityTimers.length; i++) {
            if (player.pet.legendaryPetAbilityTimers[i].gt(0)) {
                player.pet.activeAbilities[i] = true
            } else {
                player.pet.activeAbilities[i] = false
            }
        }

        //cooldown
        player.pet.legendaryPetAbilityCooldownsMax = [new Decimal(3600),new Decimal(7200),]
        for (let i = 0; i < player.pet.legendaryPetAbilityCooldowns.length; i++) {
            player.pet.legendaryPetAbilityCooldowns[i] = player.pet.legendaryPetAbilityCooldowns[i].sub(delta)
        }
    },
    clickables: {
        2: {
            title() { return "<h3>Level Up" },
            canClick() { return tmp.pet.levelables[layers.pet.levelables.index].canBuy },
            unlocked() { return layers.pet.levelables.index != 0 },
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].levelTooltip == undefined) {
                    return ""
                } else {
                    return tmp.pet.levelables[layers.pet.levelables.index].levelTooltip
                }
            },
            onClick() {
                buyLevelable("pet", layers.pet.levelables.index)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "40px", borderRadius: "0px", fontSize: '8px'}
                !this.canClick() ? look.backgroundColor = "#bf8f8f" : layers.pet.levelables.index >= 1000 ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#4e7cff"
                return look
            },
        },
        3: {
            title() { return "<h3>Sacrifice one"},
            canClick() { return getLevelableXP("pet", layers.pet.levelables.index).gte(1)},
            unlocked() { return layers.pet.levelables.index < 1000 && layers.pet.levelables.index != 0 && player.ev.evolutionsUnlocked[4]},
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].sacValue == undefined) {
                    return ""
                } else {
                    return "+" + format(tmp.pet.levelables[layers.pet.levelables.index].sacValue.mul(player.ev4.offeringsBase)) + " Offerings"
                }
            },
            onClick() {
                setLevelableXP("pet", layers.pet.levelables.index, getLevelableXP("pet", layers.pet.levelables.index).sub(1))
                player.ev4.offerings = player.ev4.offerings.add(tmp.pet.levelables[layers.pet.levelables.index].sacValue.mul(player.ev4.offeringsBase))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: '100px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        4: {
            title() {return "<h3>Sacrifice all" },
            canClick() { return getLevelableXP("pet", layers.pet.levelables.index).gte(1) },
            unlocked() { return layers.pet.levelables.index < 1000 && layers.pet.levelables.index != 0 && player.ev.evolutionsUnlocked[4] },
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].sacValue == undefined) {
                    return ""
                } else {
                    return "+" + format(tmp.pet.levelables[layers.pet.levelables.index].sacValue.mul(player.ev4.offeringsBase).mul(getLevelableXP("pet", layers.pet.levelables.index))) + " Offerings"
                }
            },
            onClick() {
                let amount = getLevelableXP("pet", layers.pet.levelables.index)
                setLevelableXP("pet", layers.pet.levelables.index, new Decimal(0))
                player.ev4.offerings = player.ev4.offerings.add(tmp.pet.levelables[layers.pet.levelables.index].sacValue.mul(amount.mul(player.ev4.offeringsBase)))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: '100px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        5: {
            title() { 
                if (tmp.pet.levelables[layers.pet.levelables.index].pointValue == undefined) {
                    return ""
                } else if (player.pet.petButtonTimer[layers.pet.levelables.index - 301].gt(0)) {
                    return "<h3 style='font-size:10px;line-height:0.5'>Check back in<br>" + formatTime(player.pet.petButtonTimer[layers.pet.levelables.index - 301]) + "."
                } else if (layers.pet.levelables.index == 302) {
                    return "<h3>Roll for<br>Pet Points!"
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[layers.pet.levelables.index].pointValue) + "<br>Pet Points."
                }
            },
            canClick() {
                if (tmp.pet.levelables[layers.pet.levelables.index].pointCooldown == undefined) {
                    return false
                } else {
                    return player.pet.petButtonTimer[layers.pet.levelables.index - 301].lte(0)
                }
            },
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].pointTooltip == undefined) {
                    return ""
                } else {
                    return tmp.pet.levelables[layers.pet.levelables.index].pointTooltip
                }
            },
            unlocked() { return tmp.pet.levelables[layers.pet.levelables.index].pointValue != undefined && getLevelableAmount("pet", layers.pet.levelables.index).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[layers.pet.levelables.index].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[layers.pet.levelables.index - 301] = tmp.pet.levelables[layers.pet.levelables.index].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[layers.pet.levelables.index].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: '125px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        6: {
            title() { return "<h3>View Shop"},
            canClick() { return true },
            unlocked() { return tmp.pet.levelables[layers.pet.levelables.index].shopLayer != undefined && getLevelableAmount("pet", layers.pet.levelables.index).gte(1)},
            onClick() {
                player.tab = tmp.pet.levelables[layers.pet.levelables.index].shopLayer
            },
            style() {
                let look = {width: '125px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        7: {
            title() { return "<h3>???"},
            tooltip() { return "Coming in<br>future update"},
            canClick() { return false },
            unlocked() { return false /*layers.pet.levelables.index >= 200 && layers.pet.levelables.index < 300*/ },
            onClick () {},
            style() {
                let look = {width: '125px', minHeight: '40px', borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#222222" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },      
        8: {
            title() { return "<h3>???"},
            tooltip() { return "Coming in<br>future update"},
            canClick() { return false },
            unlocked() { return false /*layers.pet.levelables.index >= 100 && layers.pet.levelables.index < 200*/ },
            onClick () {},
            style() {
                let look = {width: '125px', minHeight: '40px', borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#222222" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        // SUBTAB BUTTONS
        11: {
            title() { return "Regular Pets" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["pet"]["content"] = "Pets"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#094599", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        12: {
            title() { return "Evolved Pets" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(35) },
            onClick() {
                player.subtabs["pet"]["content"] = "Evolved Pets"
            },
            style: {width: "125px", minHeight: "60px", background: "linear-gradient(90deg, #d487fd, #4b79ff)", color: "#1500bf", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        13: {
            title() { return "Pet Shop" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(25) },
            onClick() {
                player.subtabs["pet"]["content"] = "Pet Shop"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#4e7cff", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        14: {
            title() { return "Fragmentation" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(1500) },
            onClick() {
                player.subtabs["pet"]["content"] = "Fragmentation"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#cb79ed", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        15: {
            title() { return "Legendary Gems" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            onClick() {
                player.subtabs["pet"]["content"] = "Legendary Gems"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#eed200", color: "#fe6d00", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"}, 
        },
        // EVOLVED PET BUTTONS
        21: {
            title() { return "<h3>Special Feature" },
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].evoTooltip == undefined) {
                    return ""
                } else {
                    return tmp.pet.levelables[layers.pet.levelables.index].evoTooltip
                }
            },
            canClick() {
                if (tmp.pet.levelables[layers.pet.levelables.index].evoCan == undefined) {
                    return false
                } else {
                    return tmp.pet.levelables[layers.pet.levelables.index].evoCan
                }
            },
            unlocked() { return tmp.pet.levelables[layers.pet.levelables.index].evoClick != undefined },
            onClick() {
                layers.pet.levelables[layers.pet.levelables.index].evoClick()
            },
            style() {
                let look = {width: '125px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        22: {
            title() { return "<h3>???"},
            tooltip() { return "Coming in<br>future update"},
            canClick() { return false },
            unlocked() { return false },
            onClick () {},
            style() {
                let look = {width: '200px', minHeight: '40px', borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#222222" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },

        //legendary pet skills
        31: {
            title() { return player.pet.legendaryPetAbilityCooldowns[0].lte(0) ? "<h3>Activate Skill</h3>" : "Check Back in " + formatTime(player.pet.legendaryPetAbilityCooldowns[0]) + "."},
            tooltip() { return "Activates the eclipse in DU1 for 10 minutes, unlocking alternate gameplay mechanics. (Also throws you into DU1 cause why not)"},
            canClick() { return player.pet.legendaryPetAbilityCooldowns[0].lte(0) },
            unlocked() { return layers.pet.levelables.index == 501 },
            onClick () {
                player.pet.legendaryPetAbilityCooldowns[0] = player.pet.legendaryPetAbilityCooldownsMax[0]
                player.pet.legendaryPetAbilityTimers[0] = player.pet.legendaryPetAbilityTimersMax[0]
                player.pet.activeAbilities[0] = true

                player.sma.inStarmetalChallenge = true
                player.universe = "D1"
                player.tab = "le"

                layers.le.starmetalResetAgain()
                layers.pu.generateSelection();

                player.subtabs.le["stuff"] = "Shards"
                player.subtabs.pu["stuff"] = "Selection"                
            },
            style: {width: '125px', minHeight: '40px', backgroundColor: "#eed200", color: "black", borderRadius: '0px', fontSize: '8px'},
        },
        32: {
            title() { return player.pet.legendaryPetAbilityCooldowns[1].lte(0) ? "<h3>Activate Skill</h3>" : player.pet.legendaryPetAbilityTimers[1].gte(0) ? "Active: " + formatTime(player.pet.legendaryPetAbilityTimers[1]) + "." : "Check Back in " + formatTime(player.pet.legendaryPetAbilityCooldowns[1]) + "."},
            tooltip() { return "Boosts your damage in space battles by x1.5 for the next 5 minutes. Also unlocks a new ship."},
            canClick() { return player.pet.legendaryPetAbilityCooldowns[1].lte(0) },
            unlocked() { return layers.pet.levelables.index == 502 },
            onClick () {
                player.pet.legendaryPetAbilityCooldowns[1] = player.pet.legendaryPetAbilityCooldownsMax[1]
                player.pet.legendaryPetAbilityTimers[1] = player.pet.legendaryPetAbilityTimersMax[1]
                player.pet.activeAbilities[1] = true
                //write code
            },
            style: {width: '125px', minHeight: '40px', backgroundColor: "#eed200", color: "black", borderRadius: '0px', fontSize: '8px'},
        },

        // START OF FRAGMENTATION CLICKABLES
        100: {
            title() { return player.pet.bannerButtonTimers[player.pet.bannerIndex].gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.bannerButtonTimers[player.pet.bannerIndex]) + "." : "<h3>Fragment a pet for rewards!"},
            canClick() { return player.pet.bannerButtonTimers[player.pet.bannerIndex].lt(0) && getLevelableXP("pet", player.pet.bannerID[player.pet.bannerIndex]).gte(1) },
            unlocked() { return true},
            tooltip() {
                if (player.pet.bannerIndex == 0 || player.pet.bannerIndex == 1) {
                    return "<h5>50% - Common Crate<br>10% - Common/Uncommon Crate<br>5% - Uncommon Crate<br>35% - Epic Pet Fragment"
                } else if (player.pet.bannerIndex == 2 || player.pet.bannerIndex == 3) {
                    return "<h5>20% - Common/Uncommon Crate<br>15% - Uncommon Crate<br>15% - Replicanti Crate<br>50% - Epic Pet Fragment"
                } else if (player.pet.bannerIndex == 4) {
                    return "<h5>15% - Antimatter Crate<br>15% - Rare Crate<br>70% - Epic Pet Fragment"
                } else {
                    return ""
                }
            },
            onClick() {
                player.pet.bannerButtonTimers[player.pet.bannerIndex] = player.pet.bannerButtonTimersMax[player.pet.bannerIndex]
                setLevelableXP("pet", player.pet.bannerID[player.pet.bannerIndex], getLevelableXP("pet", player.pet.bannerID[player.pet.bannerIndex]).sub(1))
                
                if (player.pet.bannerIndex == 0 || player.pet.bannerIndex == 1) {
                    layers.pet.commonPetBanner()
                } else if (player.pet.bannerIndex == 2 || player.pet.bannerIndex == 3) {
                    layers.pet.uncommonPetBanner()
                } else if (player.pet.bannerIndex == 4) {
                    layers.pet.rarePetBanner()
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: '200px', minHeight: '50px', borderRadius: '30px / 15px'}
                this.canClick() ? look.backgroundColor = "#cb79ed" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        101: {
            title() { return "<img src='" + tmp.pet.levelables[player.pet.bannerID[0]].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 0
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 0 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.bannerButtonTimers[0].lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        102: {
            title() { return "<img src='" + tmp.pet.levelables[player.pet.bannerID[1]].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 1
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 1 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.bannerButtonTimers[1].lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        103: {
            title() { return "<img src='" + tmp.pet.levelables[player.pet.bannerID[2]].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 2
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 2 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.bannerButtonTimers[2].lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        104: {
            title() { return "<img src='" + tmp.pet.levelables[player.pet.bannerID[3]].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 3
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 3 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.bannerButtonTimers[3].lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        105: {
            title() { return "<img src='" + tmp.pet.levelables[player.pet.bannerID[4]].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 4
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 4 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.bannerButtonTimers[4].lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        // FRAGMENT TABS
        111: {
            title() { return "Epic"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["pet"]["fragTabs"] = "Epic"
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "#cb79ed", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        112: {
            title() { return "Singularity"},
            canClick() { return true },
            unlocked() { return hasUpgrade("s", 23) && player.cb.highestLevel.gte(25000) },
            onClick() {
                player.subtabs["pet"]["fragTabs"] = "Singularity"
            },
            style: {width: "125px", minHeight: "47px", backgroundColor: "#aa4444", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        // SINGULARITY FRAGMENTATION
        121: {
            title() { return player.pet.singularityButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.singularityButtonTimers[0]) + "." : "<h3>Sacrifice 3 evo shards for rewards!"},
            canClick() { return player.pet.singularityButtonTimers[0].lt(0) && player.cb.evolutionShards.gte(3)},
            unlocked() { return true },
            tooltip() { return "<h5>25% - Common Crate<br>25% - Rare Crate<br>50% - Singularity Fragments"},
            onClick() {
                player.pet.singularityButtonTimers[0] = player.pet.singularityButtonTimersMax[0]
                player.cb.evolutionShards = player.cb.evolutionShards.sub(3)

                layers.pet.evoBanner();
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "225px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        122: {
            title() { return player.pet.singularityButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.singularityButtonTimers[1]) + "." : "<h3>Sacrifice 3 paragon shards for rewards!"},
            canClick() { return player.pet.singularityButtonTimers[1].lt(0) && player.cb.paragonShards.gte(3)},
            unlocked() { return true },
            tooltip() { return "<h5>12% - Rare Crate<br>16% - Singularity Crate<br>2% - Legendary Gems<br>70% - Singularity Fragments"},
            onClick() {
                player.pet.singularityButtonTimers[1] = player.pet.singularityButtonTimersMax[1]
                player.cb.paragonShards = player.cb.paragonShards.sub(3)

                layers.pet.paragonBanner();
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "225px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#4c64ff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        // LEGENDARY GEMS
        201: {
            title() { return player.pet.legendaryGemTimer.gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.legendaryGemTimer) + "." : "Reset for legendary gems."},
            canClick() { return player.pet.legendaryGemTimer.lt(0) },
            unlocked() { return true },
            onClick() {
                const redGemGain = randomInt(player.pet.legendaryGemsToGetMin, player.pet.legendaryGemsToGetMax)
                const purpleGemGain = randomInt(player.pet.legendaryGemsToGetMin, player.pet.legendaryGemsToGetMax)
                const greenGemGain = randomInt(player.pet.legendaryGemsToGetMin, player.pet.legendaryGemsToGetMax)
    
                // Add the gems to the player's inventory
                player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(redGemGain)
                player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(purpleGemGain)
                player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(greenGemGain)

                player.pet.legendaryGemTimer = player.pet.legendaryGemTimerMax

                // RESET CODE
                player.cb.xp = new Decimal(0)
                player.cb.totalxp = new Decimal(0)
                player.cb.level = new Decimal(0)
                player.cb.XPBoost = new Decimal(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#fe9400" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        202: {
            title() { return player.pet.summonTimer.gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.summonTimer) + "." : "SUMMON."},
            canClick() { return player.pet.summonTimer.lte(0) && player.cb.legendaryPetGems[0].gte(player.pet.summonReqs[0]) && player.cb.legendaryPetGems[1].gte(player.pet.summonReqs[1]) && player.cb.legendaryPetGems[2].gte(player.pet.summonReqs[2]) && player.cb.evolutionShards.gte(player.pet.summonReqs[3]) && player.cb.paragonShards.gte(player.pet.summonReqs[4]) },
            unlocked() { return true },
            tooltip() { return "20% - 14 of every common pet<br>20% - 10 of every uncommon pet<br>20% - 4 of every rare pet<br>10% - Epic pet and singularity fragments<br>10% - A lot of pet points<br>20% - LEGENDARY PET SUMMON" },
            onClick() {
                player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].sub(player.pet.summonReqs[0])
                player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].sub(player.pet.summonReqs[1])
                player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].sub(player.pet.summonReqs[2])
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.pet.summonReqs[3])
                player.cb.paragonShards = player.cb.paragonShards.sub(player.pet.summonReqs[4])

                player.pet.summonTimer = player.pet.summonTimerMax

                layers.pet.legendarySummon();
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#fe9400" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        // legendary pet selection
        301: {
            title() { return "<img src='resources/pets/eclipseLegendaryPet.png'style='width:80px;height:80px;margin:0px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.summonIndex = new Decimal(0)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "100px", borderRadius: "15px"}
                player.pet.summonIndex.eq(0) ? look.backgroundColor = "#fe2600ff" : look.backgroundColor = "#fe9400"
                return look
            },
        },
        302: {
            title() { return "<img src='resources/pets/geroaLegendaryPet.png'style='width:80px;height:80px;margin:0px'></img>" },
            canClick() { return true },
            unlocked() { return hasUpgrade("ir", 16) },
            onClick() {
                player.pet.summonIndex = new Decimal(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "100px", borderRadius: "15px"}
                player.pet.summonIndex.eq(1) ? look.backgroundColor = "#fe2600ff" : look.backgroundColor = "#fe9400"
                return look
            },
        },

        // PET SHOP
        1001: {
            title() { return player.pet.shopResetTimer.gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.shopResetTimer) + "." : "<h3>Reset Shop Prices"},
            canClick() { return player.pet.shopResetTimer.lt(0) },
            unlocked() { return player.pet.shopResetTimer },
            onClick() {
                layers.pet.resetPrices();
                player.pet.shopResetTimer = player.pet.shopResetTimerMax
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: {width: "97px", minHeight: "122px", borderRadius: "0px", border: "0px"},
        },
        1002: {
            title() { return "<h3>Buy"},
            canClick() {
                if (player.pet.shopIndex >= 100 && player.pet.shopIndex < 200) {
                    return player.cb.petPoints.gte(player.pet.commonPrices[player.pet.shopIndex - 101])
                } else if (player.pet.shopIndex >= 200 && player.pet.shopIndex < 300) {
                    return player.cb.petPoints.gte(player.pet.uncommonPrices[player.pet.shopIndex - 201])
                } else if (player.pet.shopIndex >= 300 && player.pet.shopIndex < 400) {
                    return player.cb.petPoints.gte(player.pet.rarePrices[player.pet.shopIndex - 301])
                } else { return false }
            },
            unlocked() { return player.pet.shopIndex > 100},
            onClick() {
                if (player.pet.shopIndex >= 100 && player.pet.shopIndex < 200) {
                    player.pet.commonBought[player.pet.shopIndex - 101] = player.pet.commonBought[player.pet.shopIndex - 101]+1
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.commonPrices[player.pet.shopIndex - 101])
                } else if (player.pet.shopIndex >= 200 && player.pet.shopIndex < 300) {
                    player.pet.uncommonBought[player.pet.shopIndex - 201] = player.pet.uncommonBought[player.pet.shopIndex - 201]+1
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.uncommonPrices[player.pet.shopIndex - 201])
                } else if (player.pet.shopIndex >= 300 && player.pet.shopIndex < 400) {
                    player.pet.rareBought[player.pet.shopIndex - 301] = player.pet.rareBought[player.pet.shopIndex - 301]+1
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.rarePrices[player.pet.shopIndex - 301])
                }
                addLevelableXP("pet", player.pet.shopIndex, 1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: {width: "97px", minHeight: "122px", borderRadius: "0px", border: "0px"},
        },
        1003: {
            title() { return "<h3>Buy" },
            canClick() {
                if (player.pet.shopIndex > 0 && player.pet.shopIndex < 11) {
                    return player.cb.petPoints.gte(player.pet.shardPrices[player.pet.shopIndex - 1])
                } else if (player.pet.shopIndex > 10 && player.pet.shopIndex < 100) {
                    return player.cb.petPoints.gte(player.pet.cratePrices[player.pet.shopIndex - 11])
                } else {
                    return false
                }
            },
            unlocked() { return player.pet.shopIndex < 100},
            onClick() {
                if (player.pet.shopIndex > 0 && player.pet.shopIndex < 11) {
                    player.pet.shardBought[player.pet.shopIndex - 1] = player.pet.shardBought[player.pet.shopIndex - 1]+1
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.shardPrices[player.pet.shopIndex - 1])
                    if (player.pet.shopIndex == 1) player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                    if (player.pet.shopIndex == 2) player.cb.paragonShards = player.cb.paragonShards.add(1);
                } else if (player.pet.shopIndex > 10 && player.pet.shopIndex < 100) {
                    player.pet.crateBought[player.pet.shopIndex - 11] = player.pet.crateBought[player.pet.shopIndex - 11]+1
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.cratePrices[player.pet.shopIndex - 11])
                    if (player.pet.shopIndex == 11) layers.cb.petButton1();
                    if (player.pet.shopIndex == 12) layers.cb.petButton2();
                    if (player.pet.shopIndex == 13) layers.cb.petButton3();
                    if (player.pet.shopIndex == 14) layers.cb.petButton4();
                    if (player.pet.shopIndex == 15) layers.cb.petButton5();
                    if (player.pet.shopIndex == 16) layers.cb.petButton6();
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: {width: "97px", minHeight: "122px", borderRadius: "0px", border: "0px"},
        },
        1004: {
            title() {return "Misc."},
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(65) },
            onClick() {
                player.subtabs["pet"]["shopTabs"] = "Misc."
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "grey", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        1005: {
            title() { return "Common"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["pet"]["shopTabs"] = "Common"
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "#9bedff", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        1006: {
            title() { return "Uncommon"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["pet"]["shopTabs"] = "Uncommon"
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "#88e688", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        1007: {
            title() { return "Rare"},
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.subtabs["pet"]["shopTabs"] = "Rare"
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "#4e7cff", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        // MISC SELECTION
        1011: {
            title() { return "<img src='resources/evoShard.png'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 1
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1012: {
            title() { return "<img src='resources/paragonShard.png'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 2
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1021: {
            title() { return "Common Crate" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 11
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0px"},
        },
        1022: {
            title() { return "Common/<br>Uncommon Crate" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 12
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0px"},
        },
        1023: {
            title() { return "Uncommon Crate" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 13
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0px"},
        },
        1024: {
            title() { return "Antimatter Crate" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 14
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0px"},
        },
        1025: {
            title() { return "Replicanti Crate" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 15
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0px"},
        },
        1026: {
            title() { return "Rare Crate" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 16
            },
            style: {width: "100px", minHeight: "100px", borderRadius: "0px"},
        },
        // COMMON SELECTION
        1101: {
            title() { return "<img src='" + tmp.pet.levelables[101].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 101
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1102: {
            title() { return "<img src='" + tmp.pet.levelables[102].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 102
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1103: {
            title() { return "<img src='" + tmp.pet.levelables[103].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 103
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1104: {
            title() { return "<img src='" + tmp.pet.levelables[104].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 104
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1105: {
            title() { return "<img src='" + tmp.pet.levelables[105].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 105
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1106: {
            title() { return "<img src='" + tmp.pet.levelables[106].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 106
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1107: {
            title() { return "<img src='" + tmp.pet.levelables[107].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 107
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1108: {
            title() { return "<img src='" + tmp.pet.levelables[108].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 108
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1109: {
            title() { return "<img src='" + tmp.pet.levelables[109].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 109
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        // UNCOMMON SELECTION
        1201: {
            title() { return "<img src='" + tmp.pet.levelables[201].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 201
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1202: {
            title() { return "<img src='" + tmp.pet.levelables[202].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 202
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1203: {
            title() { return "<img src='" + tmp.pet.levelables[203].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 203
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1204: {
            title() { return "<img src='" + tmp.pet.levelables[204].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 204
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1205: {
            title() { return "<img src='" + tmp.pet.levelables[205].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 205
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1206: {
            title() { return "<img src='" + tmp.pet.levelables[206].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 206
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1207: {
            title() { return "<img src='" + tmp.pet.levelables[207].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 207
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1208: {
            title() { return "<img src='" + tmp.pet.levelables[208].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 208
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1209: {
            title() { return "<img src='" + tmp.pet.levelables[209].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 209
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        // RARE SELECTION
        1301: {
            title() { return "<img src='" + tmp.pet.levelables[301].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 301
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1302: {
            title() { return "<img src='" + tmp.pet.levelables[302].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 302
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1303: {
            title() { return "<img src='" + tmp.pet.levelables[303].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 303
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1304: {
            title() { return "<img src='" + tmp.pet.levelables[304].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 304
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1305: {
            title() { return "<img src='" + tmp.pet.levelables[305].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 305
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1306: {
            title() { return "<img src='" + tmp.pet.levelables[306].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 306
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1307: {
            title() { return "<img src='" + tmp.pet.levelables[307].image + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 307
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
    },
    levelables: {
        // NO PET SELECTED INFO
        0: {
            image() { return "resources/secret.png"},
            title() { return "No pet selected." },
            description() { return "" },
            currency() { return getLevelableXP(this.layer, this.id) },
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() { return {width: '100px', height: '125px', backgroundColor: '#222222'} } 
        },
        // COMMON PETS
        101: {
            image() { return this.canClick() ? "resources/Pets/gwaCommonPet.png" : "resources/secret.png"},
            title() { return "Gwa" },
            lore() { return "Has a childlike innocence and is very kind. Seems to have immense power but is also very reluctant to use the power." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to points.<br>" + 
                    "x" + format(this.effect()[1]) + " to check back xp."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(3).add(1), // Points Gain
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), // Check Back XP Gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1) },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        102: {
            image() { return this.canClick() ? "resources/Pets/eggCommonPet.png" : "resources/secret.png"},
            title() { return "Egg Guy" },
            lore() { return "This fellow came out of a very powerful chicken... However he would meet his fate when the chicken inside hatches..." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to prestige points.<br>" +
                    "x" + format(this.effect()[1]) + " to tree gain."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(2.4).add(1), // Prestige Points Gain
                    getLevelableAmount(this.layer, this.id).pow(2).add(1), // Tree Gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(1.04).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        103: {
            image() { return this.canClick() ? "resources/Pets/unsmithCommonPet.png" : "resources/secret.png"},
            title() { return "Unsmith" },
            lore() { return "A creature that was synergized out of the purest form of SPV. We don't know what it is yet... We will figure it out one day." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to factor power.<br>" +
                    "x" + format(this.effect()[1]) + " to mod gain."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(2.7).add(1).pow(levelableEffect("pet", 1103)[0]), // Factor Power Gain
                    getLevelableAmount(this.layer, this.id).pow(1.8).add(1).pow(levelableEffect("pet", 1103)[0]), // Mod Gain
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(1.08).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        104: {
            image() { return this.canClick() ? "resources/Pets/checkpointCommonPet.png" : "resources/secret.png"},
            title() { return "Gd Checkpoint" },
            lore() { return "This guy feels a little bit familiar, but you don't know why. You just ignore it." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to grass value.<br>" +
                    "x" + format(this.effect()[1]) + " to golden grass value."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(2.2).add(1), // Grass Value
                    getLevelableAmount(this.layer, this.id).pow(1.3).div(3).add(1), // Golden Grass Value
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(1.12).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        105: {
            image() { return this.canClick() ? "resources/Pets/slaxCommonPet.png" : "resources/secret.png"},
            title() { return "Slax" },
            lore() { return "A being of neon green and plasma. The energy of the void radiates within it's presence." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to pet button cooldown.<br>" +
                    "/" + format(this.effect()[1]) + " to xp button cooldown."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.01).add(1), // Pet Button Cooldown
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), // XP Button Cooldown
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(1.15).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        106: {
            image() { return this.canClick() ? "resources/Pets/spiderCommonPet.png" : "resources/secret.png"},
            title() { return "Spider" },
            lore() { return "This eight-legged bug has no place in these worlds, but a small crack in the fabric of reality made it slip through and gain enough power to be your pet." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to antimatter.<br>" +
                    "x" + format(this.effect()[1]) + " to 7th dimensions."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(1.6).mul(0.5).add(1), // Antimatter
                    getLevelableAmount(this.layer, this.id).pow(1.6).mul(0.5).add(1), // 7th Dimensions
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(1.18).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        107: {
            image() { return this.canClick() ? "resources/Pets/blobCommonPet.png" : "resources/secret.png"},
            title() { return "Blob" },
            lore() { return "Blob." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to XPBoost."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.01).add(1), // XPBoost
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(1.18).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        108: {
            image() { return this.canClick() ? "resources/Pets/replicatorCommonPet.png" : "resources/secret.png"},
            title() { return "Replicator" },
            lore() { return "This creature was the result of a failed replicant galaxy transformation. It holds the power of 1.79e308 replicanti, but can not replicate itself no more." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to replicanti mult.<br>" +
                    "x" + format(this.effect()[1]) + " to galaxy dust."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.1).add(1), // Replicanti Multiplier
                    getLevelableAmount(this.layer, this.id).pow(1.05).mul(0.2).add(1), // Galaxy Dust
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(1.2).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        109: {
            image() { return this.canClick() ? "resources/Pets/smokeCommonPet.png" : "resources/secret.png"},
            title() { return "Smoke" },
            lore() { return "A burning world that once was. Reduced to nothingness and ash. Smoke from that world made its way over here. The new world." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to all mastery points.<br>" +
                    "x" + format(this.effect()[1]) + " to jinx score."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(1.2).mul(0.7).add(1), // All Mastery Points
                    getLevelableAmount(this.layer, this.id).pow(0.9).mul(0.03).add(1), // Jinx Score
                ]
            },
            sacValue() { return new Decimal(1)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1).pow(1.2).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        // UNCOMMON PETS
        201: {
            image() { return this.canClick() ? "resources/Pets/testeUncommonPet.png" : "resources/secret.png"},
            title() { return "Teste" },
            lore() { return "A cat that likes committing murder on walls." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to code experience.<br>" +
                    "x" + format(this.effect()[1]) + " to grasshoppers.<br>" +
                    "x" + format(this.effect()[2]) + " to fertilizer."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(1.2).div(2).add(1), // Code Experience
                    getLevelableAmount(this.layer, this.id).pow(1.25).div(1.5).add(1), // Grasshoppers
                    getLevelableAmount(this.layer, this.id).pow(1.27).add(1), // Fertlizer
                ]
            },
            sacValue() { return new Decimal(3)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1) },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        202: {
            image() { return this.canClick() ? "resources/Pets/starUncommonPet.png" : "resources/secret.png"},
            title() { return "Star" },
            lore() { return "One of the many stars from the night sky. A burning ball of gas." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to lines of code.<br>" +
                    "x" + format(this.effect()[1]) + " to leaves.<br>" +
                    "/" + format(this.effect()[2]) + " to xp and pet button cooldowns."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(1.3).div(1.6).add(1).pow(levelableEffect("pet", 1202)[0]), // Lines of Code
                    getLevelableAmount(this.layer, this.id).pow(1.6).div(1.3).add(1).pow(levelableEffect("pet", 1202)[0]), // Leaves
                    getLevelableAmount(this.layer, this.id).mul(0.01).add(1).pow(levelableEffect("pet", 1202)[0]), // Check Back XP and Pet Button Cooldowns
                ]
            },
            sacValue() { return new Decimal(3)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(1.3).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        203: {
            image() { return this.canClick() ? "resources/Pets/normalFaceUncommonPet.png" : "resources/secret.png"},
            title() { return "Normal Face" },
            lore() { return "Originated from a vast land of blocks and spikes. A victim of lobotomy." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to tree requirement.<br>" +
                    "/" + format(this.effect()[1]) + " to mod requirement.<br>" +
                    "/" + format(this.effect()[2]) + " to check back level requirement."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(1.7).add(1), // Tree Requirement
                    getLevelableAmount(this.layer, this.id).pow(1.4).add(1), // Mod Requirement
                    getLevelableAmount(this.layer, this.id).mul(0.02).pow(0.95).add(1), // Check Back Level Requirement
                ]
            },
            sacValue() { return new Decimal(3)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(1.7).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        204: {
            image() { return this.canClick() ? "resources/Pets/sharkUncommonPet.png" : "resources/secret.png"},
            title() { return "Shark" },
            lore() { return "A shark that was once swimming in an infinite sea found itself trapped in this universe." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to rank requirement.<br>" +
                    "/" + format(this.effect()[1]) + " to tier requirement.<br>" +
                    "/" + format(this.effect()[2]) + " to tetr requirement."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(2).mul(5).add(1).pow(levelableEffect("pet", 1204)[0]), // Rank Requirement
                    getLevelableAmount(this.layer, this.id).pow(1.87).mul(3).add(1).pow(levelableEffect("pet", 1204)[0]), // Tier Requirement
                    getLevelableAmount(this.layer, this.id).pow(1.75).mul(2).add(1).pow(levelableEffect("pet", 1204)[0]), // Tetr Requirement
                ]
            },
            sacValue() { return new Decimal(3)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(2).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        205: {
            image() { return this.canClick() ? "resources/Pets/eyeUncommonPet.png" : "resources/secret.png"},
            title() { return "THE WATCHING EYE" },
            lore() { return "It's always watching." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to check back xp."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.05).add(1), // Check Back XP
                ]
            },
            sacValue() { return new Decimal(3)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(2.2).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        206: {
            image() { return this.canClick() ? "resources/Pets/clockUncommonPet.png" : "resources/secret.png"},
            title() { return "Clock" },
            lore() { return "This clock is the symbol of check back. Must be one patient fellow. You can feel the presence of evolution shards..." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to 1st dimensions.<br>" +
                    "x" + format(this.effect()[1]) + " to 3rd dimensions.<br>" +
                    "x" + format(this.effect()[2]) + " to 5th dimensions."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.2).add(1), // 1st Dimensions
                    getLevelableAmount(this.layer, this.id).mul(0.2).add(1), // 3rd Dimensions
                    getLevelableAmount(this.layer, this.id).mul(0.2).add(1), // 5th Dimensions
                ]
            },
            sacValue() { return new Decimal(3)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(1.6).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        207: {
            image() { return this.canClick() ? "resources/Pets/trollUncommonPet.png" : "resources/secret.png"},
            title() { return "Trollface" },
            lore() { return "You can NOT trust this guy no matter what. Also please do not evolve it either." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to 2nd dimensions.<br>" +
                    "x" + format(this.effect()[1]) + " to 4th dimensions.<br>" +
                    "x" + format(this.effect()[2]) + " to 6th dimensions."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.2).add(1), // 2nd Dimensions
                    getLevelableAmount(this.layer, this.id).mul(0.2).add(1), // 4th Dimensions
                    getLevelableAmount(this.layer, this.id).mul(0.2).add(1), // 6th Dimensions
                ]
            },
            sacValue() { return new Decimal(3)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(1.6).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        208: {
            image() { return this.canClick() ? "resources/Pets/infinityBreakerUncommonPet.png" : "resources/secret.png"},
            title() { return "Infinity Breaker" },
            lore() { return "This pet has been breaking your infinities all along. It is made of an unknown metal. It seems familiar." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to infinity dimensions.<br>" +
                    "x" + format(this.effect()[1]) + " to negative infinity points.<br>" +
                    "x" + format(this.effect()[2]) + " to broken infinities."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(1.25).mul(0.7).add(1), // Infinity Dimensions
                    getLevelableAmount(this.layer, this.id).pow(1.8).mul(3).add(1), // Negative Infinity Points
                    getLevelableAmount(this.layer, this.id).pow(1.2).add(1), // Broken Infinities
                ]
            },
            sacValue() { return new Decimal(3)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(1.8).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        209: {
            image() { return this.canClick() ? "resources/Pets/johnUncommonPet.png" : "resources/secret.png"},
            title() { return "John" },
            lore() { return "Just a cartoon doodle dude that got transported here for literally no reason." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to dimension power.<br>" +
                    "x" + format(this.effect()[1]) + " to alternative infinities.<br>" +
                    "x" + format(this.effect()[2]) + " to time cubes."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(1.3).mul(0.4).add(1), // Dimension Power
                    getLevelableAmount(this.layer, this.id).pow(1.1).mul(0.5).add(1), // Alternative Infinities
                    getLevelableAmount(this.layer, this.id).pow(1.2).add(1), // Time Cubes
                ]
            },
            sacValue() { return new Decimal(3)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).mul(1.8).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        // RARE PETS
        301: {
            image() { return this.canClick() ? "resources/Pets/novaRarePet.png" : "resources/secret.png"},
            title() { return "Nova" },
            lore() { return "A clown from the domain of singularity. Likes playing pranks and causing havoc. Only here to watch what you are doing." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to fertilizer <small>(based on grass)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to check back xp <small>(based on check back level)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.g.grass.pow(0.02).div(2).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.4)), // Fertilizer (Based on Grass)
                    player.cb.level.pow(0.8).mul(0.0014).mul(getLevelableAmount(this.layer, this.id)).pow(0.5).add(1), // Check Back XP (Based on Check Back Level)
                ]
            },
            sacValue() { return new Decimal(10)},
            // PET POINT CODE
            pointValue() { return new Decimal(0.6).mul(player.pet.petPointMult).mul(getLevelableAmount(this.layer, this.id).mul(0.5))},
            pointCooldown() { return new Decimal(40).div(player.pet.petCooldownDiv)},
            canteBase() { return new Decimal(0.12)},
            pointTooltip() { return "" },
            pointClick() {
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(1) },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        302: {
            image() { return this.canClick() ? "resources/Pets/diceRarePet.png" : "resources/secret.png"},
            title() { return "Dice" },
            lore() { return "One of Zar's creations. This pet will always output a random number between 1 and 6." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to dice points <small>(based on highest combo)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to mods <small>(based on dice points)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.pet.highestDicePetCombo.add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.3)).pow(levelableEffect("pet", 1302)[0]), // Dice Points (Based on Highest Combo)
                    player.d.dicePoints.add(1).log(6).mul(6).mul(getLevelableAmount(this.layer, this.id).pow(1.2)).add(1).pow(2).pow(levelableEffect("pet", 1302)[0]), // Mods (Based on Dice Points)
                ]
            },
            sacValue() { return new Decimal(10)},
            // PET POINT CODE
            pointValue() { return new Decimal(0.1).mul(player.pet.petPointMult).mul(getLevelableAmount(this.layer, this.id).mul(0.5))},
            pointCooldown() { return new Decimal(20).div(player.pet.petCooldownDiv)},
            canteBase() { return new Decimal(0.05)},
            pointTooltip() { return "<h5>Last roll: " + format(player.pet.dicePetPointsGain) + " PP<br>Last roll: " + player.pet.lastDicePetRoll + "<br>Current roll combo: " + player.pet.dicePetCombo + "<br>Highest roll combo: " + player.pet.highestDicePetCombo },
            pointClick() {
                player.pet.dicePetRoll = getRandomInt(6) + 1

                player.pet.dicePetPointsGain = this.pointValue().mul(player.pet.dicePetRoll)
    
                if (player.pet.lastDicePetRoll == player.pet.dicePetRoll) {
                    player.pet.dicePetCombo = player.pet.dicePetCombo.add(1)
                } else {
                    player.pet.dicePetCombo = new Decimal(0)
                }
                player.pet.lastDicePetRoll = player.pet.dicePetRoll

                return player.pet.dicePetPointsGain
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.4).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        303: {
            image() { return this.canClick() ? "resources/Pets/ufoRarePet.png" : "resources/secret.png"},
            title() { return "Drippy Ufo" },
            lore() { return "An unknown flying object, but with style. Iridite's messenger. Be careful what you tell it." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to rocket fuel <small>(based on pet points)</small>.<br>" +
                    "/" + format(this.effect()[1]) + " to golden grass spawn time."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.cb.petPoints.pow(0.7).mul(0.1).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.25)), // Rocket Fuel (Based on Pet Points)
                    getLevelableAmount(this.layer, this.id).mul(0.04).add(1), // Golden Grass Spawn Time
                ]
            },
            sacValue() { return new Decimal(10)},
            // PET POINT CODE
            pointValue() { return new Decimal(10).mul(player.pet.petPointMult).mul(getLevelableAmount(this.layer, this.id).mul(0.5).add(1))},
            pointCooldown() { return new Decimal(900).div(player.pet.petCooldownDiv)},
            canteBase() { return new Decimal(0.8)},
            pointTooltip() { return "Also subtract 5 minutes off the shop reset timer :)" },
            pointClick() {
                player.pet.shopResetTimer = player.pet.shopResetTimer.sub(300)
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.4).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        304: {
            image() { return this.canClick() ? "resources/Pets/goofyAhhThingRarePet.png" : "resources/secret.png"},
            title() { return "Goofy Ahh Thing" },
            lore() { return "эта дурацкая ax-тварь — существо из неизвестной вселенной. Это может быть тайно небожитель." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to grasshoppers <small>(based on evo shards)</small>.<br>" +
                    "/" + format(this.effect()[1]) + " to check back level requirement."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.cb.evolutionShards.pow(0.85).mul(0.6).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.3)), // Grasshoppers (Based on Evo Shards)
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1) // Level Requirement
                ]
            },
            sacValue() { return new Decimal(10)},
            // PET POINT CODE
            pointValue() { return new Decimal(60).mul(player.pet.petPointMult).mul(getLevelableAmount(this.layer, this.id).mul(0.1).add(1))},
            pointCooldown() { return new Decimal(18000).div(player.pet.petCooldownDiv)},
            canteBase() { return new Decimal(7)},
            pointTooltip() { return "25% chance for an evo shard." },
            pointClick() {
                let random = getRandomInt(4)
                if (random == 1) {
                    player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                    if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                    player.cb.pityEvoCurrent = new Decimal(0)
                    if (player.subtabs['cb']['stuff'] == "Pets") callAlert("You gained an Evolution Shard! (25%)", "resources/evoShard.png")
                } else {
                    player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(25)
                }
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(75) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.2).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        305: {
            image() { return this.canClick() ? "resources/Pets/antimatterRarePet.png" : "resources/secret.png"},
            title() { return "Antimatter" },
            lore() { return "The one controlling your antimatter and makes sure it stays in safe quantities." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to antimatter dimensions <small>(based on infinities)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to golden grass."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.in.infinities.pow(0.8).mul(0.4).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.25)), // Antimatter Dimensions (Based on Infinities)
                    getLevelableAmount(this.layer, this.id).pow(1.1).add(1), // Golden Grass
                ]
            },
            sacValue() { return new Decimal(10)},
            // PET POINT CODE
            pointValue() { return new Decimal(2).mul(player.pet.petPointMult).mul(getLevelableAmount(this.layer, this.id).mul(0.6).add(1))},
            pointCooldown() { return new Decimal(180).div(player.pet.petCooldownDiv)},
            canteBase() { return new Decimal(0.3)},
            pointTooltip() { return "" },
            pointClick() {
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.25).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        306: {
            image() { return this.canClick() ? "resources/Pets/hexShadowRarePet.png" : "resources/secret.png"},
            title() { return "Hex Shadow" },
            lore() { return "Found halfway to the top of the hex staircase. Unwilling to talk or give any information. Has a strange odor." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to dice points <small>(based on total hex power)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to rocket fuel <small>(based on total hex power)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.hpw.totalPower.add(1).log(6).mul(0.25).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.3)), // Dice Points (Based on power)
                    player.hpw.totalPower.add(1).log(6).mul(0.2).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.3)), // Rocket Fuel (Based on power)
                ]
            },
            sacValue() { return new Decimal(10)},
            // PET POINT CODE
            pointValue() { return new Decimal(6).mul(player.pet.petPointMult).mul(getLevelableAmount(this.layer, this.id).mul(0.3).add(1))},
            pointCooldown() { return new Decimal(1500).div(player.pet.petCooldownDiv)},
            canteBase() { return new Decimal(1)},
            pointTooltip() { return "2% chance for an paragon shard." },
            pointClick() {
                if (player.cb.highestLevel.gt(250)) {
                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        if (player.subtabs['cb']['stuff'] == "Pets") callAlert("You gained a PARAGON SHARD! (2%)", "resources/paragonShard.png");
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(2);
                    }
                }
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.3).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        307: {
            image() { return this.canClick() ? "resources/Pets/grassSquareRarePet.png" : "resources/secret.png"},
            title() { return "Grass Square" },
            lore() { return "It was one ordinary of cutting grass, and one of the grass particles randomly grew a face. This is what we have now." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to pollinators <small>(based on golden grass)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to repli-grass <small>(based on golden grass)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.g.goldGrass.add(1).log(10).mul(0.25).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.25)), // Pollinators (Based on Golden Grass)
                    player.g.goldGrass.add(1).log(10).mul(0.025).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.25)), // Repli-Grass (Based on Golden Grass)
                ]
            },
            sacValue() { return new Decimal(10)},
            // PET POINT CODE
            pointValue() { return new Decimal(0.05).mul(player.pet.petPointMult).mul(getLevelableAmount(this.layer, this.id).mul(0.2).add(1))},
            pointCooldown() { return new Decimal(1).div(player.pet.petCooldownDiv)},
            canteBase() { return new Decimal(0.002)},
            pointTooltip() { return "+" + formatWhole(getLevelableAmount(this.layer, this.id).mul(100)) + "% of golden grass value on claim.<br>(You have " + format(player.g.goldGrass) + " golden grass)" },
            pointClick() {
                player.g.goldGrass = player.g.goldGrass.add(player.g.goldGrassVal.mul(getLevelableAmount(this.layer, this.id)))
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.3).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        308: {
            image() { return this.canClick() ? "resources/Pets/impossibleTriangleRarePet.png" : "resources/secret.png"},
            title() { return "Impossible Triangle" },
            lore() { return "An anomaly of a shape, but is only a mere illusion. Celestials love their illusions." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to singularity points <small>(based on radiation)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to singularity dimensions <small>(based on singularity points)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.ra.radiation.pow(0.6).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.3)), // Singularity Points (Based on Radiation)
                    player.s.singularityPoints.add(1).log(10).pow(1.2).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.25)) // Singularity Dimenstions (Based on Singularity Points)
                ]
            },
            sacValue() { return new Decimal(10)},
            // PET POINT CODE
            pointValue() { return new Decimal(20).mul(player.pet.petPointMult).mul(getLevelableAmount(this.layer, this.id).mul(0.3).add(1))},
            pointCooldown() { return new Decimal(4500).div(player.pet.petCooldownDiv)},
            canteBase() { return new Decimal(0.3)},
            pointTooltip() { return "" },
            pointClick() {
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.4).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        309: {
            image() { return this.canClick() ? "resources/Pets/forbiddenCoreRarePet.png" : "resources/secret.png"},
            title() { return "Forbidden Core" },
            lore() { return "The first core ever produced by the celestials of the domain of singularity. It has lived for so long it developed a conciousness." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to radiation <small>(based on singularities)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to core scraps <small>(based on starmetal alloys)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.s.singularities.add(1).log(10).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.2)), // Radiation (Based on Singularities)
                    player.sma.starmetalAlloy.add(1).log(10).mul(0.5).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.2)) // Core Scraps (Based on Starmetal Alloys)
                ]
            },
            sacValue() { return new Decimal(10)},
            // PET POINT CODE
            pointValue() { return new Decimal(35).mul(player.pet.petPointMult).mul(getLevelableAmount(this.layer, this.id).mul(0.35).add(1))},
            pointCooldown() { return new Decimal(8000).div(player.pet.petCooldownDiv)},
            canteBase() { return new Decimal(0.5)},
            pointTooltip() { return "" },
            pointClick() {
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.4).add(1).floor() },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        // EPIC PETS
        401: {
            image() { return this.canClick() ? "resources/Pets/dotknightEpicPet.png" : "resources/secret.png"},
            title() { return "Dotknight" },
            lore() { return "A knight of unknown origin that wields the cursword, which is one of the most powerful swords. He is yet to awaken its true power." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to pet points <small>(based on XPBoost)</small>.<br>" +
                    "/" + format(this.effect()[1]) + " to pet point button cooldown <small>(based on evo shards)</small>.<br>" +
                    "/" + format(this.effect()[2]) + " to XPBoost button cooldown <small>(based on para shards)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.cb.XPBoost.pow(0.15).div(36).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.3)), // Pet Points (Based on XPBoost)
                    player.cb.evolutionShards.pow(0.4).div(25).mul(getLevelableAmount(this.layer, this.id).pow(0.4)).add(1), // Pet Point Button Cooldown (Based on Evolution Shards)
                    player.cb.paragonShards.pow(0.5).div(20).mul(getLevelableAmount(this.layer, this.id)).pow(0.4).div(2).add(1), // XPBoost Button Cooldown (Based on Paragon Shards)
                ]
            },
            sacValue() { return new Decimal(25)},
            shopLayer() { return "ep0" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal(25)
                } else {
                    return getLevelableAmount(this.layer, this.id).add(1).pow(1.2).mul(5).floor()
                }
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        402: {
            image() { return this.canClick() ? "resources/Pets/dragonEpicPet.png" : "resources/secret.png"},
            title() { return "Dragon" },
            lore() { return "This dragon is heavily associated with the number 12. Seems oddly familiar. You might've seen this dragon in a dream before." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to replicanti point mult <small>(based on grass-skip)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to anonymity <small>(based on galaxy dust)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to repli-leaf mult <small>(based on repli-trees)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.gs.grassSkip.pow(0.8).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.65)), // Replicanti Point Multiplier (Based on Grass-Skip)
                    player.ca.galaxyDust.pow(0.25).mul(25).mul(getLevelableAmount(this.layer, this.id).pow(1.2)).add(1), // Anonymity (Based on Galaxy Dust)
                    player.rt.repliTrees.pow(0.1).mul(getLevelableAmount(this.layer, this.id).pow(0.6)).add(1), // Repli-Leaf Multiplier (Based on Repli-Trees)
                ]
            },
            sacValue() { return new Decimal(25)},
            shopLayer() { return "ep1" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal(25)
                } else {
                    return getLevelableAmount(this.layer, this.id).add(1).pow(1.2).mul(5).floor()
                }
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        403: {
            image() { return this.canClick() ? "resources/Pets/cookieEpicPet.png" : "resources/secret.png"},
            title() { return "Cookie" },
            lore() { return "This cookie is imbued with large amounts of incremental power. Clicking it would be very dangerous." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to cante energy <small>(based on cante cores)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to infinity points <small>(based on cante cores)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to proto memories <small>(based on XPBoost)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.ca.canteCores.pow(0.7).mul(0.05).mul(getLevelableAmount(this.layer, this.id).pow(0.55)).add(1), // Cante Energy (Based on Cante Cores)
                    player.ca.canteCores.pow(1.1).mul(20).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.55)), // Infinity Points (Based on Cante Cores)
                    player.cb.XPBoost.pow(0.6).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.4)), // Proto Memories (Based on XPBoost)
                ]
            },
            sacValue() { return new Decimal(25)},
            shopLayer() { return "ep2" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal(25)
                } else {
                    return getLevelableAmount(this.layer, this.id).add(1).pow(1.2).mul(5).floor()
                }
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        404: {
            image() { return this.canClick() ? "resources/Pets/kresEpicPet.png" : "resources/secret.png"},
            title() { return "Kres" },
            lore() { return "<small>Kres a member of the Celestial Hunting Corporation, and was sent out on the mission to the domain of singularity. Originally in the military from one universe's Earth, he joined the corporation when his universe got taken over by celestials.</small>" }, 
            description() {
                return "x" + format(this.effect()[0]) + " to infinity points <small>(based on check back level)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to singularity points <small>(based on check back level)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to starmetal alloy <small>(based on check back level)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.cb.level.pow(1.35).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.5)), // Infinity Points (Based on Check Back Level)
                    player.cb.level.pow(0.4).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.5)), // Singularity Points (Based on Check Back Level)
                    player.cb.level.pow(0.3).div(100).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.3)), // Starmetal Alloy (Based on Check Back Level)
                ]
            },
            sacValue() { return new Decimal(25)},
            shopLayer() { return "ep3" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return player.pet.singularityFragments.gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.pet.singularityFragments = player.pet.singularityFragments.sub(amt) },
            canAfford() { return player.pet.singularityFragments.gte(this.xpReq()) },
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal(40)
                } else {
                    return getLevelableAmount(this.layer, this.id).add(1).pow(1.2).mul(6).floor()
                }
            },
            currency() { return player.pet.singularityFragments },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        405: {
            image() { return this.canClick() ? "resources/Pets/navEpicPet.png" : "resources/secret.png"},
            title() { return "Nav" },
            lore() { return "Nav, another member of the corporation, has mastered the art of superphysical magic. She was born from a line of talented superphysical wizards that worked for the corporation." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to anonymity <small>(based on radiation)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to oil <small>(based on radiation)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to fun <small>(based on radiation)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.ra.radiation.pow(1.3).mul(4).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.6)), // Anonymity (Based on Radiation)
                    player.ra.radiation.mul(3).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.55)), // Oil (Based on Radiation)
                    player.ra.radiation.pow(0.7).mul(2).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.5)), // Fun (Based on Radiation)
                ]
            },
            sacValue() { return new Decimal(25)},
            shopLayer() { return "ep4" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return player.pet.singularityFragments.gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.pet.singularityFragments = player.pet.singularityFragments.sub(amt) },
            canAfford() { return player.pet.singularityFragments.gte(this.xpReq()) },
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal(40)
                } else {
                    return getLevelableAmount(this.layer, this.id).add(1).pow(1.2).mul(6).floor()
                }
            },
            currency() { return player.pet.singularityFragments },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        406: {
            image() { return this.canClick() ? "resources/Pets/selEpicPet.png" : "resources/secret.png"},
            title() { return "Sel" },
            lore() { return "Sel was originally a rouge hunter travelling between civilizations, fighting celestialites for money. However, he met Kres and realized the greater opportunity of joining the corporation." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to check back xp <small>(based on starmetal alloy)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to XPBoost <small>(based on starmetal alloy)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to pet points <small>(based on starmetal alloy)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.sma.starmetalAlloy.add(1).log(2).div(10).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.35)), // Check Back XP (Based on Starmetal Alloy)
                    player.sma.starmetalAlloy.add(1).log(2.5).div(20).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.35)), // XPBoost (Based on Starmetal Alloy)
                    player.sma.starmetalAlloy.add(1).log(3).div(25).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.35)), // Pet Points (Based on Starmetal Alloy)
                ]
            },
            sacValue() { return new Decimal(25)},
            shopLayer() { return "ep5" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return player.pet.singularityFragments.gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.pet.singularityFragments = player.pet.singularityFragments.sub(amt) },
            canAfford() { return player.pet.singularityFragments.gte(this.xpReq()) },
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal(40)
                } else {
                    return getLevelableAmount(this.layer, this.id).add(1).pow(1.2).mul(6).floor()
                }
            },
            currency() { return player.pet.singularityFragments },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        //legendary
        501: {
            image() { return this.canClick() ? "resources/Pets/eclipseLegendaryPet.png" : "resources/secret.png"},
            title() { return "Eclipse" },
            lore() { return "<h5>The true story of eclipse is extremely mysterious and shrouded in secrecy. Kres, Nav, and Sel only found him during their first encounter with Matos. Eclipse doesn't speak. They only listen. But Eclipse is an extremely powerful being, that helps the trio during their ventures." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to stars <small>(based on stars)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to activated fuel <small>(based on stars)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to rocket parts <small>(based on stars)</small>."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    player.au2.stars.pow(0.04).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.15)), // stars (Based on Stars)
                    player.au2.stars.pow(0.15).div(2).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.15)), // fuel (Based on Stars)
                    player.au2.stars.pow(0.1).div(2).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.15)), // rocket parts (Based on Stars)
                ]
            },
            sacValue() { return new Decimal(100)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(100000) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal(1)
                } else {
                    return getLevelableAmount(this.layer, this.id).pow(1.2).mul(2).floor()
                }
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#eed200" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        502: {
            image() { return this.canClick() ? "resources/Pets/geroaLegendaryPet.png" : "resources/secret.png"},
            title() { return "Geroa" },
            lore() { return "<h6>Once a normal alien being from an unknown universe, Geroa lived a peaceful life until Iridite visited her planet. Iridite caused mass destruction, all in the name of her crazy scientific experimentation. Geroa was considered a valuable test subject by Iridite, and was granted with a fraction of celestial powers. Geroa is currently under the servitude of Iridite, but wants freedom and escape." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to star exploration time.<br>" +
                    "x" + format(this.effect()[1]) + " to starmetal essence <small>(based on starmetal alloy)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to space rocks."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.75).mul(0.1).add(1), // star exploration time
                    player.sma.starmetalAlloy.pow(0.125).div(5).add(1).pow(getLevelableAmount(this.layer, this.id).pow(0.1)), // starmetal essence (Based on starmetal alloy)
                    getLevelableAmount(this.layer, this.id).pow(0.75).mul(0.5).add(1), // space rocks
                ]
            },
            sacValue() { return new Decimal(100)},
            // CLICK CODE
            unlocked() { return hasUpgrade("ir", 16) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                if (getLevelableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal(1)
                } else {
                    return getLevelableAmount(this.layer, this.id).pow(1.2).mul(2).floor()
                }
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#eed200" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        // START OF EVOLVED PETS
        1101: {
            image() { return this.canClick() ? "resources/Pets/voidGwaEvoPet.png" : "resources/secret.png"},
            title() { return "Voidgwa" },
            lore() { return "Seems to be like gwa, but its appearance is inverted. It has a strange force that prevents you from getting near it." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to infinities.<br>" +
                    "x" + format(this.effect()[1]) + " to broken infinities.<br>" +
                    "x" + format(this.effect()[2]) + " to alternate infinities.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).div(5).add(1), // Infinities
                    getLevelableAmount(this.layer, this.id).div(5).add(1), // Broken Infinities
                    getLevelableAmount(this.layer, this.id).div(5).add(1), // Alternate Infinities
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = 'ad'
                player.subtabs["ad"]['stuff'] = 'Reverse Break'
            },
            // CLICK CODE
            unlocked() { return player.in.unlockedBreak || player.s.highestSingularityPoints.gt(0) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.75).add(6).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#000000" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1103: {
            image() { return this.canClick() ? "resources/Pets/goldsmithEvoPet.png" : "resources/secret.png"},
            title() { return "Goldsmith" },
            lore() { return "This purest form of SPV condensed into a golden, metallic material. Shines too bright you can barely see." }, 
            description() {
                return "^" + format(this.effect()[0]) + " to unsmith pet effects.<br>" +
                    "+" + format(this.effect()[1]) + " base coin dust gain per hour.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).div(20).add(1), // Unsmith Effect
                    getLevelableAmount(this.layer, this.id).pow(1.15), // Base Coin Dust Gain Per Hour
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev0"
            },
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(2).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.background = "linear-gradient(135deg, #AB791E, #FAF3B7)" : look.background = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1104: {
            image() { return this.canClick() ? "resources/Pets/paragonCheckpointEvoPet.png" : "resources/secret.png"},
            title() { return "Paragon Checkpoint" },
            lore() { return "Infused with the power of paragon shards, all sense of familiarity fades away. This being gives you a vague idea of where these shards came from, but you can't figure it out." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to moonstone value.<br>" +
                    "x" + format(this.effect()[1]) + " to singularity point gain.<br>" +
                    "/" + format(this.effect()[2]) + " to pet button timer."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.4).add(1), // Moonstone Value
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.5).add(1), // Singularity Point Gain
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), // Pet Button Timer
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "cs"
            },
            // CLICK CODE
            unlocked() { return hasMilestone("s", 12) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.15).add(9).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#2CA400" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1106: {
            image() { return this.canClick() ? "resources/Pets/mutantSpiderEvoPet.png" : "resources/secret.png"},
            title() { return "Mutant Spider" },
            lore() { return "The poor spider ate too many paragon shards and this is what it looks like now." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to pre-power resources.<br>" +
                    "x" + format(this.effect()[1]) + " to hex power.<br>" +
                    "x" + format(this.effect()[2]) + " to realm essence."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(6).max(1), // Pre-Power Resources
                    getLevelableAmount(this.layer, this.id).mul(2).max(1), // Hex Power
                    getLevelableAmount(this.layer, this.id).mul(0.5).add(1), // Realm Essence
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "po"
                player.subtabs["po"]["stuff"] = "Halter"
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.6).add(3).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0C0047" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1202: {
            image() { return this.canClick() ? "resources/Pets/sunEvoPet.png" : "resources/secret.png"},
            title() { return "Sun" },
            lore() { return "Nothing changed at all about this star. It just got a bit closer." }, 
            description() {
                return "^" + format(this.effect()[0]) + " to star pet effects.<br>" +
                    "x" + format(this.effect()[1]) + " to rocket fuel.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).div(20).add(1), // Star Effect
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.4).add(1), // Rocket Fuel
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev4"
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gt(250) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.4).add(1).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#FF3000" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1203: {
            image() { return this.canClick() ? "resources/Pets/insaneFaceEvoPet.png" : "resources/secret.png"},
            title() { return "Insane Face" },
            lore() { return "The lobotomy got to it. The face is no longer normal. It is angry. It wants revenge." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to rare pet cooldown.<br>" +
                    "x" + format(this.effect()[1]) + " to XPBoost.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), // Rare Pet Cooldown
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), // XPBoost
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev2"
            },
            // CLICK CODE
            unlocked() { return player.in.unlockedInfinity || player.s.highestSingularityPoints.gt(0) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.7).add(4).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#00188F" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1204: {
            image() { return this.canClick() ? "resources/Pets/mrRedSharkEvoPet.png" : "resources/secret.png"},
            title() { return "MrRedShark" },
            lore() { return "An evolved version of the shark. Pushes a lot of mass around. A master of the elements. Very muscular." }, 
            description() {
                return "^" + format(this.effect()[0]) + " to shark pet effects.<br>" +
                    "x" + format(this.effect()[1]) + " to pet points.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).div(15).add(1), // Shark Effect
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), // Pet Points
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev1"
            },
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.8).add(3).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#730001" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1205: {
            image() { return this.canClick() ? "resources/Pets/eyeEvoPet.png" : "resources/secret.png"},
            title() { return "EYE" },
            lore() { return "Don't look at it." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to radiation.<br>" +
                    "x" + format(this.effect()[1]) + " to fun.<br>" +
                    "x" + format(this.effect()[2]) + " to offerings."
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.5).add(1), // Radiation
                    getLevelableAmount(this.layer, this.id).mul(5).pow(1.65).add(1), // Fun
                    getLevelableAmount(this.layer, this.id).mul(0.04).add(1), // Offerings
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev10"
            },
            // CLICK CODE
            unlocked() { return hasMilestone("s", 12) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.5).add(2).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#3F3F3F" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1206: {
            image() { return this.canClick() ? "resources/Pets/marcelAcoplaoEvoPet.png" : "resources/secret.png"},
            title() { return "Marcel Acoplao" },
            lore() { return "The creator of check back. The man responsible for your duty of having to click. wait. click.. wait.. click.... wait......." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to anonymity.<br>" +
                    "x" + format(this.effect()[1]) + " to oil.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(10).pow(2).add(1), // Anonymity
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.4).add(1), // Oil
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev8"
            },
            // CLICK CODE
            unlocked() { return hasUpgrade("bi", 24) || player.s.highestSingularityPoints.gt(0) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.1).add(5).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.background = "linear-gradient(135deg, #432D4A, #07060B)" : look.background = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1209: {
            image() { return this.canClick() ? "resources/Pets/johnUncommonPet.png" : "resources/secret.png"},
            title() { return "Captain" },
            lore() { return "he pilot spaecship." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to ship damage.<br>" +
                    "x" + format(this.effect()[1]) + " to rocket parts.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.75).div(20).add(1), // All ship damage
                    getLevelableAmount(this.layer, this.id).mul(1.5).pow(1.5).add(1), // Rocket parts
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev10"
            },
            // CLICK CODE
            unlocked() { return player.ir.unlocked},
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.6).add(3).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#bF7Fff" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1302: {
            image() { return this.canClick() ? "resources/Pets/d20EvoPet.png" : "resources/secret.png"},
            title() { return "d20" },
            lore() { return "The gamblingness has turned up a notch. You either get a large number like 20 or a puny small number like 1." }, 
            description() {
                return "^" + format(this.effect()[0]) + " to dice pet effects.<br>" +
                    "x" + format(this.effect()[1]) + " to challenge dice points.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).div(20).add(1), // Dice Effect
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.2).add(1), // Challenge Dice Points
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return player.po.dice },
            evoTooltip() { return "The current OTF has to be dice."},
            evoClick() {
                player.tab = "d"
                player.subtabs["d"]['stuff'] = 'Challenge Dice'
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gt(250) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.4).add(1).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#005C34" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1303: {
            image() { return this.canClick() ? "resources/Pets/moonEvoPet.png" : "resources/secret.png"},
            title() { return "Moon" },
            lore() { return "Iridite's messenger turned out to be something much larger. A whole moon. Who knows, maybe a whole civilization is hiding underneath the surface." }, 
            description() {
                return "+" + format(this.effect()[0]) + " max moonstone.<br>" +
                    "x" + format(this.effect()[1]) + " to golden grass.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).add(5), // Max Moonstone
                    getLevelableAmount(this.layer, this.id).mul(5).pow(1.75).add(1), // Golden Grass
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "g"
                player.subtabs["g"]['stuff'] = 'Moonstone'
            },
            // CLICK CODE
            unlocked() { return hasUpgrade("bi", 24) || player.s.highestSingularityPoints.gt(0) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.35).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#666666" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        2001: {
            image() { return this.canClick() ? "resources/Pets/cookie/simpleCookieEvo.png" : "resources/secret.png"},
            title() { return "Simple Cookie" },
            lore() { return "Perhaps going back to basics might help you learn more about these cookies." }, 
            description() {
                return "Unlock pet buildings.<br>" +
                    "Cookie clicking gains +" + formatWhole(this.effect()[0].mul(100)) + "% of your CPS.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return [getLevelableAmount(this.layer, this.id).div(100), new Decimal(1)]
                return [getLevelableAmount(this.layer, this.id).div(1000).add(0.09), new Decimal(1)]
            },
            levelTooltip() { return "Costs Chocolate Shards." },
            // CLICK CODE
            unlocked() { return player.ep2.obtainedShards },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.ep2.chocoShards = player.ep2.chocoShards.sub(amt) },
            canAfford() { return player.ep2.chocoShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.2).floor() },
            currency() { return player.ep2.chocoShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#86562E"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#16364a" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        2002: {
            image() { return this.canClick() ? "resources/Pets/cookie/goldenCookieEvo.png" : "resources/secret.png"},
            title() { return "Golden Cookie" },
            lore() { return "These shiny cookies seem to make a strange shard, more research is needed." }, 
            description() {
                return "Unlock golden cookie upgrades.<br>" +
                    "Cookie clicking now fills a golden click bar.<br>" + 
                    "Golden click bar scaling is x" + formatSimple(this.effect()[0], 1) + " slower."
            },
            // levelLimit() { return new Decimal(99) },
            effect() {
                return [Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).sub(1)).max(1), new Decimal(1)]
            },
            levelTooltip() { return "Costs Chocolate Shards." },
            // CLICK CODE
            unlocked() { return player.ep2.obtainedShards && hasUpgrade("s", 21)},
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.ep2.chocoShards = player.ep2.chocoShards.sub(amt) },
            canAfford() { return player.ep2.chocoShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.4).floor() },
            currency() { return player.ep2.chocoShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#86562E"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#16364a" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        2003: {
            image() { return this.canClick() ? "resources/Pets/cookie/wrathCookieEvo.png" : "resources/secret.png"},
            title() { return "Wrath Cookie" },
            lore() { return "Not sure what makes it so angry, hopefully we won't have to know." }, 
            description() {
                return "Unlock wrath cookie upgrades.<br>" +
                    "Golden cookies have a " + formatSimple(this.effect()[0].mul(100), 1) + "% chance to instead be a<br>wrath cookie.<br>"
            },
            // levelLimit() { return new Decimal(99) },
            effect() {
                if (getLevelableAmount(this.layer, this.id).lt(10)) return [getLevelableAmount(this.layer, this.id).mul(0.02), new Decimal(1)]
                return [getLevelableAmount(this.layer, this.id).mul(0.002).add(0.018), new Decimal(1)]
            },
            levelTooltip() { return "Costs Chocolate Shards." },
            // CLICK CODE
            unlocked() { return player.ep2.obtainedShards && player.ma.matosUnlock},
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.ep2.chocoShards = player.ep2.chocoShards.sub(amt) },
            canAfford() { return player.ep2.chocoShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.6).floor() },
            currency() { return player.ep2.chocoShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#86562E"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#16364a" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
    },
    refreshBanner() {
        player.pet.bannerID[0] = 101 + getRandomInt(8)
        player.pet.bannerID[1] = 101 + getRandomInt(8)
        player.pet.bannerID[2] = 201 + getRandomInt(8)
        player.pet.bannerID[3] = 201 + getRandomInt(8)
        player.pet.bannerID[4] = 301 + getRandomInt(6)

        player.pet.bannerResetTimer = player.pet.bannerResetTimerMax
    },
    commonPetBanner() {
        let rng = Math.random()

        if (rng > 0.5) {
            layers.cb.petButton1()
        } else if (rng > 0.4 && rng < 0.5) {
            layers.cb.petButton2()
        } else if (rng > 0.35 && rng < 0.4) {
            layers.cb.petButton3()
        } else if (rng < 0.35) {
            let random =  getRandomInt(3)
            let random1 =  getRandomInt(4)
            let gainedFragments = 1
            if (random == 0) {
                addLevelableXP("pet", 401, gainedFragments)
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1) {
                addLevelableXP("pet", 402, gainedFragments)
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment4.png");
            } else if (random == 2) {
                addLevelableXP("pet", 403, gainedFragments)
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment4.png");
            }
        }
    },
    uncommonPetBanner() {
        let rng = Math.random()

        if (rng > 0.8) {
            layers.cb.petButton2()
        } else if (rng > 0.65 && rng < 0.8) {
            layers.cb.petButton3()
        } else if (rng > 0.5 && rng < 0.65) {
            layers.cb.petButton5()
        } else if (rng < 0.5) {
            let random = getRandomInt(3)
            let random1 = getRandomInt(4)
            let gainedFragments = getRandomInt(2) + 1
            if (random == 0) {
                addLevelableXP("pet", 401, gainedFragments)
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1) {
                addLevelableXP("pet", 402, gainedFragments)
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment4.png");
            } else if (random == 2) {
                addLevelableXP("pet", 403, gainedFragments)
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment4.png");
            }
        }
    },
    rarePetBanner() {
        let rng = Math.random()

        if (rng > 0.85) {
            layers.cb.petButton4()
        } else if (rng > 0.7 && rng < 0.85) {
            layers.cb.petButton6()
        } else if (rng < 0.7) {
            let random = getRandomInt(3)
            let random1 = getRandomInt(4)
            let gainedFragments = getRandomInt(2) + 2
            if (random == 0) {
                addLevelableXP("pet", 401, gainedFragments)
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1) {
                addLevelableXP("pet", 402, gainedFragments)
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment4.png");
            }
            else if (random == 2) {
                addLevelableXP("pet", 403, gainedFragments)
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment4.png");
            }
        }
    },
    evoBanner() {
        let rng = Math.random()
        if (rng > 0.3) {
            let gainedFragments = getRandomInt(2) + 2
            player.pet.singularityFragments = player.pet.singularityFragments.add(gainedFragments);
            callAlert("You gained " + formatWhole(gainedFragments) + " Singularity Fragments!", "resources/singularityEpicPetFragment.png");
        } else if (rng > 0.15) {
            layers.cb.petButton1()
        } else if (rng < 0.15) {
            layers.cb.petButton3()
        }
    },
    paragonBanner() {
        let rng = Math.random()
        if (rng > 0.3) {
            let gainedFragments = getRandomInt(3) + 4
            player.pet.singularityFragments = player.pet.singularityFragments.add(gainedFragments);
            callAlert("You gained " + formatWhole(gainedFragments) + " Singularity Fragments!", "resources/singularityEpicPetFragment.png");
        } else if (rng > 0.18) {
            layers.cb.petButton6()
        } else if (rng > 0.02) {
            layers.cb.petButton7()
        } else if (rng < 0.02) {
            let random = getRandomInt(3)
            let gainedGems = getRandomInt(5) + 10
            player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(gainedGems);
            player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(gainedGems);
            player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(gainedGems);
            callAlert("You gained " + formatWhole(gainedGems) + " of each Legendary Gem!", "resources/Pets/legendarybg.png");
        }
    },
    resetPrices() {
        player.pet.commonBought = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        player.pet.uncommonBought = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        player.pet.rareBought = [0, 0, 0, 0, 0, 0, 0]
        player.pet.shardBought = [0, 0]
        player.pet.crateBought = [0, 0, 0, 0, 0, 0]
    },
    legendarySummon() {
        if (player.pet.eclipsePity == 4) {
            if (player.pet.summonIndex.eq(0))
            {
                player.pet.levelables[501][1] = player.pet.levelables[501][1].add(1)
                callAlert("Eclipse becomes stronger.", "resources/Pets/eclipseLegendaryPet.png"); //Make sure to change this when you add more legendary pets
            }
            if (player.pet.summonIndex.eq(1))
            {
                player.pet.levelables[502][1] = player.pet.levelables[502][1].add(1)
                callAlert("Geroa gets enhancements.", "resources/Pets/geroaLegendaryPet.png"); //Make sure to change this when you add more legendary pets
            }
            player.pet.eclipsePity = 0
            return
        }
        let random = Math.random();
        if (random < 0.2) {
            player.pet.levelables[101][1] = player.pet.levelables[101][1].add(14)
            player.pet.levelables[102][1] = player.pet.levelables[101][1].add(14)
            player.pet.levelables[103][1] = player.pet.levelables[101][1].add(14)
            player.pet.levelables[104][1] = player.pet.levelables[104][1].add(14)
            player.pet.levelables[105][1] = player.pet.levelables[105][1].add(14)
            player.pet.levelables[106][1] = player.pet.levelables[106][1].add(14)
            player.pet.levelables[107][1] = player.pet.levelables[107][1].add(14)
            player.pet.levelables[108][1] = player.pet.levelables[108][1].add(14)
            player.pet.levelables[109][1] = player.pet.levelables[109][1].add(14)
            callAlert("You gained 14 of every common pet!", "resources/Pets/commonbg.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else if (random < 0.4) {
            player.pet.levelables[201][1] = player.pet.levelables[201][1].add(10)
            player.pet.levelables[202][1] = player.pet.levelables[202][1].add(10)
            player.pet.levelables[203][1] = player.pet.levelables[203][1].add(10)
            player.pet.levelables[204][1] = player.pet.levelables[204][1].add(10)
            player.pet.levelables[205][1] = player.pet.levelables[205][1].add(10)
            player.pet.levelables[206][1] = player.pet.levelables[206][1].add(10)
            player.pet.levelables[207][1] = player.pet.levelables[207][1].add(10)
            player.pet.levelables[208][1] = player.pet.levelables[208][1].add(10)
            player.pet.levelables[209][1] = player.pet.levelables[209][1].add(10)
            callAlert("You gained 10 of every uncommon pet!", "resources/Pets/uncommonbg.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else if (random < 0.6) {
            player.pet.levelables[301][1] = player.pet.levelables[301][1].add(4)
            player.pet.levelables[302][1] = player.pet.levelables[302][1].add(4)
            player.pet.levelables[303][1] = player.pet.levelables[303][1].add(4)
            player.pet.levelables[304][1] = player.pet.levelables[304][1].add(4)
            player.pet.levelables[305][1] = player.pet.levelables[305][1].add(4)
            player.pet.levelables[306][1] = player.pet.levelables[306][1].add(4)
            player.pet.levelables[307][1] = player.pet.levelables[307][1].add(4)
            player.pet.levelables[308][1] = player.pet.levelables[308][1].add(4)
            player.pet.levelables[309][1] = player.pet.levelables[309][1].add(4)
            callAlert("You gained 4 of every rare pet!", "resources/Pets/rarebg.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else if (random < 0.7) {
            let random2 = getRandomInt(6, 10)
            player.pet.singularityFragments = player.pet.singularityFragments.add(random2)
            addLevelableXP("pet", 401, random2)
            addLevelableXP("pet", 402, random2)
            addLevelableXP("pet", 403, random2)

            callAlert("You gained " + random2 + " of every epic and singularity fragment!", "resources/Pets/epicbg.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else if (random < 0.8) {
            let random3 = getRandomInt(5000, 10000)
            random3 = random3 * player.pet.petPointMult

            player.cb.petPoints = player.cb.petPoints.add(random3)
            callAlert("You gained " + formatWhole(random3) + " pet points!", "resources/petPoint.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else {
            if (player.pet.summonIndex.eq(0))
            {
                player.pet.levelables[501][1] = player.pet.levelables[501][1].add(1)
                callAlert("Eclipse becomes stronger.", "resources/Pets/eclipseLegendaryPet.png"); //Make sure to change this when you add more legendary pets
            }
            if (player.pet.summonIndex.eq(1))
            {
                player.pet.levelables[502][1] = player.pet.levelables[502][1].add(1)
                callAlert("Geroa gets enhancements.", "resources/Pets/geroaLegendaryPet.png"); //Make sure to change this when you add more legendary pets
            }
        }
    },
    bars: {
        summonPity: {
            unlocked: true,
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return new Decimal(player.pet.eclipsePity / 5)
            },
            borderStyle: {border: "2px solid white", borderRadius: "15px"},
            baseStyle: {backgroundColor: "#2f2a00"},
            fillStyle: {
                "background-color": "#776900",
            },
            display() {
                return "<h5>" + player.pet.eclipsePity + "/5<br>Legendary Summon Pity</h5>";
            },
        },
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        content: {
            "Pets": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2]], {width: '100px', height: '40px'}],
                                ["style-row", [["clickable", 5], ["clickable", 6], ["clickable", 31], ["clickable", 32], ["clickable", 8], ["clickable", 21]], {width: '125px', height: '40px'}],
                                ["style-row", [["clickable", 3], ["clickable", 4], ["clickable", 22]], {width: '200px', height: '40px'}],
                            ]],
                        ], {width: "550px", height: "175px", borderBottom: "3px solid white"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Common", {color: "#9bedff", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#1f2f33", borderBottom: "3px solid #9bedff", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101], ["levelable", 102], ["levelable", 103], ["levelable", 104], ["levelable", 105]]],
                                ["row", [["levelable", 106], ["levelable", 107], ["levelable", 108], ["levelable", 109]]],
                            ], {width: "525px", backgroundColor: "#0f1719", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Uncommon", {color: "#88e688", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#1b2e1b", borderTop: "3px solid #88e688", borderBottom: "3px solid #88e688", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201], ["levelable", 202], ["levelable", 203], ["levelable", 204], ["levelable", 205]]],
                                ["row", [["levelable", 206], ["levelable", 207], ["levelable", 208], ["levelable", 209]]],
                            ], () => {
                                let look = {width: "525px", backgroundColor: "#0d170d", padding: "5px"}
                                if (player.cb.highestLevel.lt(25)) look.borderBottom = "3px solid #88e688"
                                return look
                            }],
            
                            ["style-column", [
                                ["raw-html", "Rare", {color: "#4e7cff", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.cb.highestLevel.gte(25) ? {width: "535px", height: "40px", backgroundColor: "#0f1833", borderTop: "3px solid #4e7cff", borderBottom: "3px solid #4e7cff", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 301], ["levelable", 302], ["levelable", 303], ["levelable", 304], ["levelable", 305]]],
                                ["row", [["levelable", 306], ["levelable", 307], ["levelable", 308], ["levelable", 309]]],
                            ], () => { return player.cb.highestLevel.gte(25) ? {width: "525px", backgroundColor: "#070c19", padding: "5px"} : {display: "none !important"}}],
            
                            ["style-column", [
                                ["raw-html", "Epic", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.cb.highestLevel.gte(1500) ? {width: "535px", height: "40px", backgroundColor: "#28182f", borderTop: "3px solid #cb79ed", borderBottom: "3px solid #cb79ed", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 401], ["levelable", 402], ["levelable", 403], ["levelable", 404], ["levelable", 405]]],
                                ["row", [["levelable", 406]]],
                            ], () => { return player.cb.highestLevel.gte(1500) ? {width: "525px", backgroundColor: "#140c17", padding: "5px"} : {display: "none !important"}}],

                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.cb.highestLevel.gte(100000) ? {width: "535px", height: "40px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 501], ["levelable", 502]]],
                            ], () => { return player.cb.highestLevel.gte(100000) ? {width: "525px", backgroundColor: "#171500", padding: "5px"} : {display: "none !important"}}],

                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", backgroundColor: "#161616"}],
                ],
            },
            "Evolved Pets": {
                buttonStyle() { return {color: "#d487fd"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2]], {width: '100px', height: '40px'}],
                                ["style-row", [["clickable", 5], ["clickable", 6], ["clickable", 7], ["clickable", 8], ["clickable", 21]], {width: '125px', height: '40px'}],
                                ["style-row", [["clickable", 3], ["clickable", 4], ["clickable", 22]], {width: '200px', height: '40px'}],
                            ]],
                        ], {width: "550px", height: "175px", borderBottom: "3px solid white"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Evolution Shards", {color: "#d487fd", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#2a1b32", borderBottom: "3px solid #d487fd", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 1103], ["levelable", 1204], ["levelable", 1203], ["levelable", 1101], ["levelable", 1206]]],
                                ["row", [["levelable", 1104]]],
                            ], {width: "525px", backgroundColor: "#150d19", padding: "5px"}],

                            ["style-column", [
                                ["raw-html", "Paragon Shards", {color: "#4c64ff", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.cb.highestLevel.gte(250) ? {width: "535px", height: "40px", backgroundColor: "#0f1433", borderTop: "3px solid #4c64ff", borderBottom: "3px solid #4c64ff", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 1202], ["levelable", 1302], ["levelable", 1303], ["levelable", 1205], ["levelable", 1106]]],
                                ["row", [["levelable", 1209]]],
                            ], () => { return player.cb.highestLevel.gte(250) ? {width: "525px", backgroundColor: "#070a19", padding: "5px"} : {display: "none !important"}}],

                            ["style-column", [
                                ["raw-html", "Chocolate Shards", {color: "#86562E", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.ep2.obtainedShards ? {width: "535px", height: "40px", backgroundColor: "#1a1109", borderTop: "3px solid #86562E", borderBottom: "3px solid #86562E", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 2001], ["levelable", 2002], ["levelable", 2003]]],
                            ], () => { return player.ep2.obtainedShards ? {width: "525px", backgroundColor: "#0d0804", padding: "5px"} : {display: "none !important"}}],
                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", backgroundColor: "#161616"}],
                ],
            },
            "Pet Shop": {
                buttonStyle() { return {color: "#4e7cff"}},
                unlocked() { return true },
                content: [
                    ["style-row", [
                        ["style-row", [["clickable", 1002], ["clickable", 1003]], {width: "97px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return player.pet.shopIndex > 0 && player.pet.shopIndex < 11 ? petShopShardName[player.pet.shopIndex - 1] : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 10 && player.pet.shopIndex < 101 ? petShopCrateName[player.pet.shopIndex - 11] : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],        
                                ["raw-html", () => { return player.pet.shopIndex > 100 ? tmp.pet.levelables[player.pet.shopIndex].title + "<br>(" + player.pet.levelables[player.pet.shopIndex][1] + "/" + tmp.pet.levelables[player.pet.shopIndex].xpReq + ")" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "350px", height: "72px", borderBottom: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", () => { return player.pet.shopIndex > 0 && player.pet.shopIndex < 11 ? "Costs " + formatWhole(player.pet.shardPrices[player.pet.shopIndex - 1]) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 10 && player.pet.shopIndex < 101 ? "Costs " + formatWhole(player.pet.cratePrices[player.pet.shopIndex - 11]) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 100 && player.pet.shopIndex < 201 ? "Costs " + formatWhole(player.pet.commonPrices[player.pet.shopIndex - 101]) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 200 && player.pet.shopIndex < 301 ? "Costs " + formatWhole(player.pet.uncommonPrices[player.pet.shopIndex - 201]) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 300 && player.pet.shopIndex < 401 ? "Costs " + formatWhole(player.pet.rarePrices[player.pet.shopIndex - 301]) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "350px", height: "48px"}],
                        ], {width: "350px", height: "122px", borderLeft: "3px solid white", borderRight: "3px solid white"}],
                        ["clickable", 1001],
                    ], {width: "550px", height: "122px", borderBottom: "3px solid white", backgroundColor: "#161616"}],
                    ["left-row", [
                        ["hoverless-clickable", 1004], ["hoverless-clickable", 1005], ["hoverless-clickable", 1006], ["hoverless-clickable", 1007]
                    ], {width: "550px", height: "47px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderBottom: "3px solid white"}],
                    ["buttonless-microtabs", "shopTabs", { 'border-width': '0px' }],
                ],
            },
            "Fragmentation": {
                buttonStyle() { return {color: "#cb79ed"}},
                unlocked() { return true },
                content: [
                    ["left-row", [
                        ["hoverless-clickable", 111], ["hoverless-clickable", 112]
                    ], {width: "550px", height: "47px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderBottom: "3px solid white"}],
                    ["buttonless-microtabs", "fragTabs", { 'border-width': '0px' }],
                ],
            },
            "Legendary Gems": {
                buttonStyle() { return {color: "#222222"}},
                unlocked() { return true },
                content: [
                    ["scroll-column", [
                        ["blank", "20px"],
                        ["left-row", [
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/redLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatShortWhole(player.cb.legendaryPetGems[0])}, {width: "93px", height: "50px", color: "#ff5555", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => { return "<div class='bottomTooltip'>Red Legendary Gem<hr><small>x" + format(player.pet.gemEffects[0]) + " XP</small></div>"}],
                            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/purpleLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatShortWhole(player.cb.legendaryPetGems[1])}, {width: "93px", height: "50px", color: "#aa55aa", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => { return "<div class='bottomTooltip'>Purple Legendary Gem<hr><small>x" + format(player.pet.gemEffects[1]) + " Pet Points</small></div>"}],
                            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/greenLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatShortWhole(player.cb.legendaryPetGems[2])}, {width: "95px", height: "50px", color: "#55ff55", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => { return "<div class='bottomTooltip'>Green Legendary Gem<hr><small>x" + format(player.pet.gemEffects[2]) + " XPBoost</small></div>"}],
                            ], {width: "150px", height: "50px"}],
                        ], {width: "450px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                        ["blank", "20px"],
                        ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.pet.legendaryGemsToGetMin) + " to " + formatWhole(player.pet.legendaryGemsToGetMax) + "</h3> of each gem on reset. <h4>(based on XPBoost)" }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 201]]],
                        ["blank", "25px"],
                        ["style-column", [
                            ["raw-html", "Summoning Altar", {color: "black", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", "(Gems requirements are dependent on the current time of day)", {color: "black", fontSize: "14px", fontFamily: "monospace"}],
                            ["blank", "25px"],
                            ["raw-html", "Current Requirements:", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ["blank", "10px"],
                            ["left-row", [
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/redLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[0])}, {width: "93px", height: "50px", color: "red", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/purpleLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[1])}, {width: "93px", height: "50px", color: "purple", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/greenLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[2])}, {width: "95px", height: "50px", color: "green", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "150px", height: "50px", borderRight: "2px solid white"}],
                            ], {width: "450px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                            ["left-row", [
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[3])}, {width: "95px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "150px", height: "50px", borderRight: "2px solid white"}],
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[4]) }, {width: "95px", height: "50px", color: "#4c64ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "150px", height: "50px"}],
                            ], {width: "300px", height: "50px", backgroundColor: "black", borderLeft: "2px solid white", borderRight: "2px solid white", borderBottom: "2px solid white", borderRadius: "0 0 10px 10px", userSelect: "none"}],
                            ["blank", "25px"],
                            ["row", [["clickable", 202]]],
                            ["blank", "10px"],
                            ["bar", "summonPity"],
                        ], () => {return player.cb.highestLevel.gte(100000) ? {width: "500px", border: "3px solid rgb(27, 0, 36)", backgroundColor: "#f5b942", paddingTop: "5px", paddingBottom: "20px", borderRadius: "15px"} : {display: "none !important"}}],
                        ["blank", "25px"],
                        ["raw-html", "Select Pet to Summon", {color: "black", fontSize: "24px", fontFamily: "monospace"}],
                        ["row", [["clickable", 301], ["clickable", 302]]],
                    ], {width: "550px", height: "700px", backgroundColor: "#eed200"}],
                ],
            },
            "???": {
                buttonStyle() { return {color: "#222222"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                        
                    ], {width: "550px", height: "700px", backgroundColor: "#161616"}],
                ],
            },
        },
        shopTabs: {
            "Common": {
                buttonStyle() { return { color: "grey" } },
                unlocked() { return true },
                content: [
                    ["scroll-column", [
                        ["style-column", [
                            ["raw-html", "Common Pets", {color: "#9bedff", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#1f2f33", borderBottom: "3px solid #9bedff", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1101], ["clickable", 1102], ["clickable", 1103], ["clickable", 1104], ["clickable", 1105]]],
                        ["row", [["clickable", 1106], ["clickable", 1107], ["clickable", 1108], ["clickable", 1109]]],
                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
            "Uncommon": {
                buttonStyle() { return { color: "grey" } },
                unlocked() { return true },
                content: [
                    ["scroll-column", [
                        ["style-column", [
                            ["raw-html", "Uncommon Pets", {color: "#88e688", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#1b2e1b", borderBottom: "3px solid #88e688", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1201], ["clickable", 1202], ["clickable", 1203], ["clickable", 1204], ["clickable", 1205]]],
                        ["row", [["clickable", 1206], ["clickable", 1207], ["clickable", 1208], ["clickable", 1209]]],
                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
            "Rare": {
                buttonStyle() { return { color: "grey" } },
                unlocked() { return player.cb.highestLevel.gte(3000) },
                content: [
                    ["scroll-column", [
                        ["style-column", [
                            ["raw-html", "Rare Pets", {color: "#4e7cff", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#0f1833", borderBottom: "3px solid #4e7cff", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1301], ["clickable", 1302], ["clickable", 1303], ["clickable", 1304], ["clickable", 1305]]],
                        ["row", [["clickable", 1306], ["clickable", 1307]]],
                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
            "Misc.": {
                buttonStyle() { return { color: "grey" } },
                unlocked() { return player.cb.highestLevel.gte(65) },
                content: [
                    ["scroll-column", [
                        ["style-row", [
                            ["raw-html", "Shards", {color: "#d487fd", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#2a1b32", borderBottom: "3px solid #d487fd", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1011], ["clickable", 1012]]],
                        ["blank", "5px"],
                        ["style-row", [
                            ["raw-html", "Crates", {color: "#4e7cff", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#0f1833", borderTop: "3px solid #4e7cff", borderBottom: "3px solid #4e7cff", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1021], ["clickable", 1022], ["clickable", 1023], ["clickable", 1024], ["clickable", 1025]]],
                        ["row", [["clickable", 1026]]],
                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
            "Buyables": {
                buttonStyle() { return { color: "black" } },
                unlocked() { return true },
                content: [
                    ["scroll-column", [

                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
        },
        fragTabs: {
            "Epic": {
                buttonStyle() { return { color: "black" } },
                unlocked() { return true },
                content: [
                    ["scroll-column", [
                        ["blank", "25px"],
                        ["raw-html", function () { return "Pets re-roll in " + formatTime(player.pet.bannerResetTimer) + "."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Currently selecting: " + tmp.pet.levelables[player.pet.bannerID[player.pet.bannerIndex]].title}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105]]],
                        ["blank", "25px"],
                        ["raw-html", () => { return "You have " + formatWhole(getLevelableXP("pet", player.pet.bannerID[player.pet.bannerIndex])) + " of this pet."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["clickable", 100],
                        ["blank", "25px"],
                    ], {width: "550px", height: "650px", backgroundColor: "#7d3f98"}],
                ],
            },
            "Singularity": {
                buttonStyle() { return { color: "black" } },
                unlocked() { return hasUpgrade("s", 23) },
                content: [
                    ["scroll-column", [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.pet.singularityFragments) + "</h3> singularity fragments." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards."  }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.paragonShards) + "</h3> paragon shards."  }, { "color": "#2842eb", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["clickable", 121],
                        ["clickable", 122],
                    ], {width: "550px", height: "650px", backgroundColor: "#662222"}],
                ],
            },
        },
    },
    tabFormat: [
        ["blank", "10px"],
        ["raw-html", () => {
            if ((player.points.gte(1e100) || hasMilestone("ip", 24) || (hasUpgrade("de", 13) && inChallenge("tad", 11))) && !inChallenge("ip", 13)) {
                return ""
            } else if (inChallenge("ip", 13)) {
                return "[Pet effects disabled due to IC3]"
            } else {
                return "[Reach 1e100 points for pet effects]"
            }
        }],
        ["blank", "10px"],
        ["style-row", [
            ["scroll-column", [
                ["hoverless-clickable", 11], ["hoverless-clickable", 12], ["hoverless-clickable", 13], ["hoverless-clickable", 14], ["hoverless-clickable", 15]
            ], {width: "125px", height: "700px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderRight: "3px solid white"}],
            ["buttonless-microtabs", "content", { 'border-width': '0px' }],
        ], {border: "3px solid white"}],
    ],
    deactivated() {return player.pet.paused},
    layerShown() {return player.startedGame == true },
})
function randomInt(min, max) {
    min = Math.ceil(min.toNumber());
    max = Math.floor(max.toNumber());
    return Math.floor(Math.random() * (max - min + 1)) + min;
}