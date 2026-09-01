const DRAGONS = {
    0: {
        name: "Fragmented Dragon",
        id: "base",
        bonusInfo: "Nothing yet!",
    },
    1: {
        name: "Singularity Dragon",
        id: "singularity",
        bonusInfo: "x3 Gold<br>x3 Radiation",
    },
    2: {
        name: "Starry Dragon",
        id: "starry",
        bonusInfo: "x3 Gold<br>x3 Radiation<br>+0.01 Gold Buyable Base",
    },
    3: {
        name: "Dark Dragon",
        id: "matossian",
        bonusInfo: "x6 Gold<br>x3 Radiation<br>+0.01 Gold Buyable Base<br>+5% Characters' Base Stats",
    },
    4: {
        name: "Space Dragon",
        id: "space",
        bonusInfo: "x18 Gold<br>x3 Radiation<br>+0.01 Gold Buyable Base<br>+5% Characters' Base Stats<br>x3 Stars<br>x3 Check Back XP",
    },
    5: {
        name: "Core Dragon",
        id: "core",
        bonusInfo: "x18 Gold<br>x3 Radiation<br>+0.02 Gold Buyable Base<br>+5% Characters' Base Stats<br>x3 Stars<br>x3 Check Back XP",
    },
    6: {
        name: "Otherworldly Dragon",
        id: "otherworldly",
        bonusInfo: "x18, ^1.025 Gold<br>x3 Radiation<br>+0.02 Gold Buyable Base<br>+5% Characters' Base Stats<br>x3 Stars<br>x3 Check Back XP<br>^1.1 Mastery Point Effects",
    },
    7: {
        name: "Hex Dragon",
        id: "hex",
        bonusInfo: "x126, ^1.025 Gold<br>x3 Radiation<br>+0.02 Gold Buyable Base<br>+5% Characters' Base Stats<br>x3 Stars<br>x3 Check Back XP<br>^1.1 Mastery Point Effects<br>x7 Hex Power",
    },
    8: {
        name: "Anti-Dragon",
        id: "anti",
        bonusInfo: "x42, ^1.025 Gold<br>x3 Radiation<br>+0.02 Gold Buyable Base<br>+5% Characters' Base Stats<br>x3 Stars<br>x3 Check Back XP<br>^1.1 Mastery Point Effects<br>x7 Hex Power<br>x3 Fire<br>x3 Magic",
    },
}
addLayer("ep1", {
    name: "Dragon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Dr", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        dragonEvolutionIndex: 0,

        gold: new Decimal(10),
        goldToGet: new Decimal(0),
        goldTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(60),
                base: new Decimal(30),
                platinumSC: new Decimal(0.01),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(720),
                base: new Decimal(270),
                platinumSC: new Decimal(0.05),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(8640),
                base: new Decimal(2430),
                platinumSC: new Decimal(0.25),
            },
        },

        fire: new Decimal(0),
        baseFireToGet: new Decimal(0),
        fireToGet: new Decimal(0),
        fireEffect: new Decimal(1),

        platinumShards: new Decimal(0),
        platinumShardPity: new Decimal(0),
        platinumSCMult: new Decimal(1),

        platinumTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(21600),
                base: new Decimal(1),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(54000),
                base: new Decimal(2),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(108000),
                base: new Decimal(3),
            },
        },

        goldBuyableBase: new Decimal(1.01),

        upgrade201Effect: new Decimal(1),
        upgrade203Effect: new Decimal(1),

        magic: new Decimal(0),
        baseMagicToGet: new Decimal(0),
        magicToGet: new Decimal(0),
        magicEffect: new Decimal(1),
        magicEffect2: new Decimal(1),

        upgrade301Effect: new Decimal(1),
        upgrade302Effect: new Decimal(1),
    }},
    nodeStyle: {
        background: "linear-gradient(-90deg, #30bf30 0%, #008040 100%)",
        borderColor: "#006030",
        color: "white",
    },
    tooltip: "Dragon",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)

        //let amt = getLevelableAmount("pet", 402).add(getLevelableTier("pet", 402).mul(5).min(40))

        // GOLD GAIN
        player.ep1.goldToGet = buyableEffect("ep1", 11)
        if (player.ep1.dragonEvolutionIndex >= 1) player.ep1.goldToGet = player.ep1.goldToGet.mul(3);
        if (player.ep1.dragonEvolutionIndex >= 3) player.ep1.goldToGet = player.ep1.goldToGet.mul(2);
        if (player.ep1.dragonEvolutionIndex >= 4) player.ep1.goldToGet = player.ep1.goldToGet.mul(3);
        player.ep1.goldToGet = player.ep1.goldToGet.mul(player.ep1.fireEffect)
        player.ep1.goldToGet = player.ep1.goldToGet.mul(upgradeEffect("ep2", 10))
        player.ep1.goldToGet = player.ep1.goldToGet.mul(buyableEffect("sp", 23))
        player.ep1.goldToGet = player.ep1.goldToGet.mul(buyableEffect("pet", 5))
        player.ep1.goldToGet = player.ep1.goldToGet.mul(buyableEffect("ep1", 201))
        player.ep1.goldToGet = player.ep1.goldToGet.mul(buyableEffect("ep1", 204))
        player.ep1.goldToGet = player.ep1.goldToGet.mul(buyableEffect("ep1", 206))
        if (hasUpgrade("ep1", 203)) player.ep1.goldToGet = player.ep1.goldToGet.mul(player.ep1.upgrade203Effect)
        if (hasUpgrade("ev8", 21)) player.ep1.goldToGet = player.ep1.goldToGet.mul(1.4)
        player.ep1.goldToGet = player.ep1.goldToGet.mul(buyableEffect("sme", 113))
        player.ep1.goldToGet = player.ep1.goldToGet.mul(buyableEffect("ep1", 17))

        if (player.ep1.dragonEvolutionIndex >= 6) player.ep1.goldToGet = player.ep1.goldToGet.pow(1.025);

        player.ep1.gold = player.ep1.gold.add(player.ep1.goldToGet.mul(delta))

        // GOLD BUTTONS

        player.ep1.goldTimers[0].base = new Decimal(30)
        player.ep1.goldTimers[1].base = new Decimal(270)
        player.ep1.goldTimers[2].base = new Decimal(2430)
        player.ep1.platinumTimers[0].base = new Decimal(1)
        player.ep1.platinumTimers[1].base = new Decimal(2)
        player.ep1.platinumTimers[2].base = new Decimal(3)

        player.ep1.goldTimers[0].max = new Decimal(60)
        player.ep1.goldTimers[1].max = new Decimal(720)
        player.ep1.goldTimers[2].max = new Decimal(8640)
        player.ep1.platinumTimers[0].max = new Decimal(21600)
        player.ep1.platinumTimers[1].max = new Decimal(54000)
        player.ep1.platinumTimers[2].max = new Decimal(86400)

        player.ep1.goldTimers[0].platinumSC = new Decimal(0.01)
        player.ep1.goldTimers[1].platinumSC = new Decimal(0.05)
        player.ep1.goldTimers[2].platinumSC = new Decimal(0.25)
        player.ep1.platinumTimers[0].base = new Decimal(1)
        player.ep1.platinumTimers[1].base = new Decimal(2)
        player.ep1.platinumTimers[2].base = new Decimal(3)
        
        player.ep1.platinumSCMult = new Decimal(1)
        player.ep1.platinumSCMult = player.ep1.platinumSCMult.mul(buyableEffect("ep1", 106))
        player.ep1.platinumSCMult = player.ep1.platinumSCMult.mul(buyableEffect("ep1", 203))
        
        for (let i in player.ep1.goldTimers) {
            player.ep1.goldTimers[i].max = player.ep1.goldTimers[i].max.div(buyableEffect("pet", 6))
            player.ep1.goldTimers[i].max = player.ep1.goldTimers[i].max.div(player.ep1.upgrade201Effect)

            player.ep1.goldTimers[i].current = player.ep1.goldTimers[i].current.sub(onepersec.mul(delta))

            player.ep1.goldTimers[i].platinumSC = player.ep1.goldTimers[i].platinumSC.mul(player.ep1.platinumSCMult)
        }
        for (let i in player.ep1.platinumTimers) {
            player.ep1.platinumTimers[i].max = player.ep1.platinumTimers[i].max.div(buyableEffect("pet", 6))

            player.ep1.platinumTimers[i].current = player.ep1.platinumTimers[i].current.sub(onepersec.mul(delta))

            player.ep1.platinumTimers[i].base = player.ep1.platinumTimers[i].base.mul(player.ep1.platinumSCMult)
            player.ep1.platinumTimers[i].base = player.ep1.platinumTimers[i].base.floor()
        }
        if (player.ep1.platinumShardPity.gte(100)) {
            player.ep1.platinumShards = player.ep1.platinumShards.add(player.ep1.platinumShardPity.div(100).floor())
            player.ep1.platinumShardPity = new Decimal(0)
        }

        // GOLD BUYABLES
        player.ep1.goldBuyableBase = new Decimal(1.01)
        if (player.ep1.dragonEvolutionIndex >= 2) player.ep1.goldBuyableBase = player.ep1.goldBuyableBase.add(0.01);
        if (player.ep1.dragonEvolutionIndex >= 5) player.ep1.goldBuyableBase = player.ep1.goldBuyableBase.add(0.01);
        player.ep1.goldBuyableBase = player.ep1.goldBuyableBase.add(buyableEffect("ep1", 102).sub(1))
        if (hasUpgrade("ep1", 204)) player.ep1.goldBuyableBase = player.ep1.goldBuyableBase.add(0.005);

        // FIRE GAIN
        player.ep1.baseFireToGet = player.ep1.gold.add(1).pow(0.2).log(10).pow(4)
        player.ep1.fireToGet = player.ep1.baseFireToGet
        player.ep1.fireToGet = player.ep1.fireToGet.mul(buyableEffect("ep1", 101))
        player.ep1.fireToGet = player.ep1.fireToGet.mul(buyableEffect("ep1", 14))
        player.ep1.fireToGet = player.ep1.fireToGet.mul(buyableEffect("ep1", 202))
        player.ep1.fireToGet = player.ep1.fireToGet.mul(buyableEffect("ep1", 205))
        if (player.ep1.dragonEvolutionIndex >= 2) player.ep1.fire = player.ep1.fire.add(player.ep1.fireToGet.mul(delta));

        // FIRE EFFECT

        player.ep1.fireEffect = Decimal.pow(10, player.ep1.fire.add(1).log(10).pow(0.75)).pow(0.2)
        player.ep1.fireEffect = player.ep1.fireEffect.pow(buyableEffect("ep1", 103))

        // MAGIC GAIN

        // MAGIC EFFECTS

        player.ep1.magicEffect = player.ep1.magic.add(1).log10().pow_base(20)
        player.ep1.magicEffect2 = player.ep1.magic.add(1).log10().pow(2).div(5).add(1)

        // OTHER EFFECTS

        player.ep1.upgrade201Effect = player.sma.starmetalAlloy.add(1).log10().pow(1.25).div(10).add(1)
        player.ep1.upgrade203Effect = getBuyableAmount("ep1", 201)
        .add(getBuyableAmount("ep1", 202))
        .add(getBuyableAmount("ep1", 203))
        .add(getBuyableAmount("ep1", 204))
        .add(getBuyableAmount("ep1", 205))
        .add(getBuyableAmount("ep1", 206))
        .pow_base(1.01)

        player.ep1.upgrade301Effect = player.ep1.fire.add(1).log10().pow(0.5).pow_base(10).div(100).add(1)
        player.ep1.upgrade302Effect = player.cbs.ascensionShards.div(10).add(1)

        // SCROLLING CONTAINER
        /*
        player.ep1.isInThisTab = player.tab == "ep1"
        if (player.ep1.isInThisTab && !player.ep1.wasInThisTab) {
	        let items = document.getElementsByClassName("scrollCentered")

            for (let i = 0; i < items.length; i++) {
    	        items[i].scrollLeft = (items[i].scrollWidth - items[i].clientWidth ) / 2;
    	        items[i].scrollTop = (items[i].scrollHeight - items[i].clientHeight ) / 2;
		        items[i].addEventListener('pointermove', function (e) {
			        move(e, items[i])
		        }, false);
		        items[i].addEventListener('pointerdown', function (e) {
			        startDragging(e, items[i])
		        }, false);
		        items[i].addEventListener('pointerup', function (e) {
		        	stopDragging(e, items[i])
		        }, false);
		        items[i].addEventListener('pointerleave', function (e) {
		        	stopDragging(e, items[i])
		        }, false);

            }
        }
        player.ep1.wasInThisTab = player.ep1.isInThisTab*/
    },
    clickables: {
        1: {
            display() {
                let text = "<div class='bottomTooltip', style='border:0px'>Platinum Shard Rarity:<br>" + formatSimple(player.ep1.goldTimers[0].platinumSC.mul(100)) + "%</div>"
                if (this.canClick()) {
                    return text + "<h2>+" + format(player.ep1.goldToGet.mul(player.ep1.goldTimers[0].base)) + " Gold.</h2>"
                } else {
                    return text + "<h2>Check back in " + formatTime(player.ep1.goldTimers[0].current) + ".</h2>"
                }
            },
            canClick() { return player.ep1.goldTimers[0].current.lte(0) },
            unlocked() { return getLevelableAmount("pet", 402).gte(2) || getLevelableTier("pet", 402).gte(1)},
            onClick() {
                player.ep1.goldTimers[0].current = player.ep1.goldTimers[0].max

                player.ep1.gold = player.ep1.gold.add(player.ep1.goldToGet.mul(player.ep1.goldTimers[0].base))

                if (Math.random() < player.ep1.goldTimers[0].platinumSC) {
                    player.ep1.platinumShards = player.ep1.platinumShards.add(1)
                    player.ep1.platinumShardPity = new Decimal(0)
                } else {
                    player.ep1.platinumShardPity = player.ep1.platinumShardPity.add(player.ep1.goldTimers[0].platinumSC.mul(100))
                }
            },
            onHold() {},
            style() {
                let look = {background: "#bf9b30", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '298px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000007f"
                }
                return look
            }
        },
        2: {
            display() {
                let text = "<div class='bottomTooltip', style='border:0px'>Platinum Shard Rarity:<br>" + formatSimple(player.ep1.goldTimers[1].platinumSC.mul(100)) + "%</div>"
                if (this.canClick()) {
                    return text + "<h2>+" + format(player.ep1.goldToGet.mul(player.ep1.goldTimers[1].base)) + " Gold.</h2>"
                } else {
                    return text + "<h2>Check back in " + formatTime(player.ep1.goldTimers[1].current) + ".</h2>"
                }
            },
            canClick() { return player.ep1.goldTimers[1].current.lte(0) },
            unlocked() { return getLevelableAmount("pet", 402).gte(3) || getLevelableTier("pet", 402).gte(1)},
            onClick() {
                player.ep1.goldTimers[1].current = player.ep1.goldTimers[1].max

                player.ep1.gold = player.ep1.gold.add(player.ep1.goldToGet.mul(player.ep1.goldTimers[1].base))

                if (Math.random() < player.ep1.goldTimers[1].platinumSC) {
                    player.ep1.platinumShards = player.ep1.platinumShards.add(1)
                    player.ep1.platinumShardPity = new Decimal(0)
                } else {
                    player.ep1.platinumShardPity = player.ep1.platinumShardPity.add(player.ep1.goldTimers[1].platinumSC.mul(100))
                }
            },
            onHold() {},
            style() {
                let look = {background: "#a68319", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '298px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000007f"
                }
                return look
            }
        },
        3: {
            display() {
                let text = "<div class='bottomTooltip', style='border:0px'>Platinum Shard Rarity:<br>" + formatSimple(player.ep1.goldTimers[2].platinumSC.mul(100)) + "%</div>"
                if (this.canClick()) {
                    return text + "<h2>+" + format(player.ep1.goldToGet.mul(player.ep1.goldTimers[2].base)) + " Gold.</h2>"
                } else {
                    return text + "<h2>Check back in " + formatTime(player.ep1.goldTimers[2].current) + ".</h2>"
                }
            },
            canClick() { return player.ep1.goldTimers[2].current.lte(6) },
            unlocked() { return getLevelableAmount("pet", 402).gte(6) || getLevelableTier("pet", 402).gte(1)},
            onClick() {
                player.ep1.goldTimers[2].current = player.ep1.goldTimers[2].max

                player.ep1.gold = player.ep1.gold.add(player.ep1.goldToGet.mul(player.ep1.goldTimers[2].base))

                if (Math.random() < player.ep1.goldTimers[2].platinumSC) {
                    player.ep1.platinumShards = player.ep1.platinumShards.add(1)
                    player.ep1.platinumShardPity = new Decimal(0)
                } else {
                    player.ep1.platinumShardPity = player.ep1.platinumShardPity.add(player.ep1.goldTimers[2].platinumSC.mul(100))
                }
            },
            onHold() {},
            style() {
                let look = {background: "#8c6b07", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '298px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000007f"
                }
                return look
            }
        },
        4: {
            display() {
                if (this.canClick()) {
                    return "<h2>+" + formatWhole(player.ep1.platinumTimers[0].base) + " Platinum Shard.</h2>"
                } else {
                    return "<h2>Check back in " + formatTime(player.ep1.platinumTimers[0].current) + ".</h2>"
                }
            },
            canClick() { return player.ep1.platinumTimers[0].current.lte(0) },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 4 && getLevelableTier("pet", 402).gte(1) },
            onClick() {
                player.ep1.platinumTimers[0].current = player.ep1.platinumTimers[0].max

                player.ep1.platinumShards = player.ep1.platinumShards.add(player.ep1.platinumTimers[0].base)
            },
            onHold() {},
            style() {
                let look = {background: "#b8cfe6", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '298px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000007f"
                }
                return look
            }
        },
        5: {
            display() {
                if (this.canClick()) {
                    return "<h2>+" + formatWhole(player.ep1.platinumTimers[1].base) + " Platinum Shards.</h2>"
                } else {
                    return "<h2>Check back in " + formatTime(player.ep1.platinumTimers[1].current) + ".</h2>"
                }
            },
            canClick() { return player.ep1.platinumTimers[1].current.lte(0) },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 4 && ((getLevelableTier("pet", 402).gte(1) && getLevelableAmount("pet", 402).gte(4)) || getLevelableTier("pet", 402).gte(2)) },
            onClick() {
                player.ep1.platinumTimers[1].current = player.ep1.platinumTimers[1].max

                player.ep1.platinumShards = player.ep1.platinumShards.add(player.ep1.platinumTimers[1].base)
            },
            onHold() {},
            style() {
                let look = {background: "#99b3cc", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '298px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000007f"
                }
                return look
            }
        },
        6: {
            display() {
                if (this.canClick()) {
                    return "<h2>+" + formatWhole(player.ep1.platinumTimers[2].base) + " Platinum Shards.</h2>"
                } else {
                    return "<h2>Check back in " + formatTime(player.ep1.platinumTimers[2].current) + ".</h2>"
                }
            },
            canClick() { return player.ep1.platinumTimers[2].current.lte(0) },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 4 && ((getLevelableTier("pet", 402).gte(1) && getLevelableAmount("pet", 402).gte(9)) || getLevelableTier("pet", 402).gte(2)) },
            onClick() {
                player.ep1.platinumTimers[2].current = player.ep1.platinumTimers[2].max
                
                player.ep1.platinumShards = player.ep1.platinumShards.add(player.ep1.platinumTimers[2].base)
            },
            onHold() {},
            style() {
                let look = {background: "#7d99b3", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '298px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000007f"
                }
                return look
            }
        },
        11: {
            display() { return "<h2>Mend your dragon with the power of singularities.</h2><br>Boosts gold and radiation gain by x3.<br>Requires 10,000 Gold and 12 Singularities."},
            canClick() { return this.unlocked()
                && player.ep1.gold.gte(1e4)
                && player.s.singularities.gte(12)
             },
            unlocked() { return player.ep1.dragonEvolutionIndex == 0 },
            onClick() {
                player.ep1.dragonEvolutionIndex = 1
            },
            onHold() {},
            style() {
                let look = {background: "linear-gradient(90deg, #a00 0%, #800 100%)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000007f"
                }
                return look
            }/*
            style() {
                let look = {background: "linear-gradient(90deg, #a00 0%, #800 100%)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000007f"
                }
                return look
            }*/
        },
        12: {
            display() { return "<h2>Infuse your dragon with the light of dying stars.</h2><br>Boosts the gold upgrade base by +0.01 and unlocks fire.<br>Requires 100,000 Gold and 200 Starmetal Alloy."},
            canClick() { return this.unlocked()
                && player.ep1.gold.gte(1e5)
                && player.sma.starmetalAlloy.gte(200)
             },
            unlocked() { return player.ep1.dragonEvolutionIndex == 1 },
            onClick() {
                player.ep1.dragonEvolutionIndex = 2
            },
            onHold() {},
            style() {
                let look = {background: "radial-gradient(circle, black 60%, #13292f 70%, #54265e 80%, #8d3947 90%, #e6eb57 110%)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "white"
                } else {
                    look.color = "#ffffff7f"
                }
                return look
            }
        },
        13: {
            display() { return "<h2>Embed ancient machinery into your dragon.</h2><br>Boosts all character's base stats by +5%, and double gold gain.<br>Requires 10,000 Fire, 100 Evolution Shards, <s>and a max level core</s>."},
            canClick() {
                let t = false
                if (player.matosLair.milestone[25] >= 1) t = true;
                for (let i = 0; i > player.co.cores; i++) {
                    if (player.co.cores[i].level.gte(99)) {t = true}
                }
                return this.unlocked()
                && player.ep1.fire.gte(1e4)
                && player.cb.evolutionShards.gte(100)
                && t
             },
            unlocked() { return player.ep1.dragonEvolutionIndex == 2 },
            onClick() {
                player.ep1.dragonEvolutionIndex = 3
            },
            onHold() {},
            style() {
                let look = {background: "linear-gradient(90deg, #8a0e79 0%, #a80c33 100%)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "white"
                } else {
                    look.color = "#ffffff9f"
                }
                return look
            }
        },
        14: {
            display() { return "<h2>Send your dragon to space.</h2><br>Boosts check back XP, stars, and gold gain by x3, and unlocks alchemy.<br>Requires 1e9 Gold and an ascended space pet."},
            canClick() { return player.ep1.gold.gte(1e5) && (
                getLevelableTier("st", 101).gte(1)
                || getLevelableTier("st", 102).gte(1)
                || getLevelableTier("st", 103).gte(1)
                || getLevelableTier("st", 104).gte(1)
                || getLevelableTier("st", 105).gte(1)
                || getLevelableTier("st", 106).gte(1)
                || getLevelableTier("st", 107).gte(1)
                || getLevelableTier("st", 108).gte(1)
                || getLevelableTier("st", 109).gte(1)
                || getLevelableTier("st", 110).gte(1)
                ||getLevelableTier("st", 201).gte(1)
                || getLevelableTier("st", 202).gte(1)
                || getLevelableTier("st", 203).gte(1)
                || getLevelableTier("st", 204).gte(1)
                || getLevelableTier("st", 205).gte(1)
                || getLevelableTier("st", 206).gte(1)
                || getLevelableTier("st", 207).gte(1)
                || getLevelableTier("st", 208).gte(1)
                || getLevelableTier("st", 209).gte(1)
                || getLevelableTier("st", 210).gte(1)
            )},
            unlocked() { return player.ep1.dragonEvolutionIndex == 3 },
            onClick() { player.ep1.dragonEvolutionIndex = 4 },
            onHold() {},
            style() {
                let look = {background: "radial-gradient(circle, #151230, #000000)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "white"
                } else {
                    look.color = "#ffffff9f"
                }
                return look
            }
        },
        15: {
            display() { return "<h2>Empower your dragon with the remains of fallen cores.</h2><br>Boosts the gold upgrade base by +0.01.<br>Requires 1e11 Gold and U1 pylon tier 3."},
            canClick() { return player.ep1.gold.gte(1e11) && player.i.pylonTier.gte(3) },
            unlocked() { return player.ep1.dragonEvolutionIndex == 4 },
            onClick() { player.ep1.dragonEvolutionIndex = 5 },
            onHold() {},
            style() {
                let look = {background: "linear-gradient(90deg, #20A3C2 0%, #20BBBD 100%)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        16: {
            display() { return "<h2>Infuse your dragon with otherworldly powers.</h2><br>Boosts gold gain by ^1.025 and mastery point effects by ^1.1.<br>Requires e15 gold, 25 platinum shards, and 1 shard of ascension."},
            canClick() { return player.ep1.gold.gte(1e15) && player.ep1.platinumShards.gte(25) },
            unlocked() { return player.ep1.dragonEvolutionIndex == 5 },
            onClick() { player.ep1.dragonEvolutionIndex = 6 },
            onHold() {},
            style() {
                let look = {background: "linear-gradient(90deg, #8a00a9 0%, #0061ff 100%)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "white"
                } else {
                    look.color = "#ffffff9f"
                }
                return look
            }
        },
        17: {
            display() { return "<h2>COMING SOON.</h2>"},
            //display() { return "<h2>Tier-up your dragon.</h2><br>Boosts fire and hex power gain by x7, and unlocks magic.<br>Requires e19 gold and 777 ???."},
            canClick() { return player.ep1.gold.gte(1e19) && false },
            unlocked() { return player.ep1.dragonEvolutionIndex == 6 },
            onClick() { player.ep1.dragonEvolutionIndex = 7 },
            onHold() {},
            style() {
                let look = {background: "linear-gradient(90deg, black 0%, #0061ff 100%)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "white"
                } else {
                    look.color = "#ffffff9f"
                }
                return look
            }
        },
        18: {
            display() { return "<h2>Upgrade your dragon with the power of anti-singularities.</h2><br>Reduces gold gain by /3, but boosts fire and magic gain by x3.<br>Requires 10,000 magic and 1e25 singularities."},
            canClick() { return player.ep1.magic.gte(1e4) && player.s.singularities.gte(1e25) },
            unlocked() { return player.ep1.dragonEvolutionIndex == 7 },
            onClick() { player.ep1.dragonEvolutionIndex = 8 },
            onHold() {},
            style() {
                let look = {background: "linear-gradient(90deg, #60bf90 0%, white 100%)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "black"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        101: {
            display() { return "<h2>Reset gold, fire, and platinum content to gain magic.</h2><br>Requires 1e20 gold"},
            canClick() { return this.unlocked()
                && player.ep1.gold.gte(1e20)
             },
            unlocked() { return true },
            onClick() {
            },
            onHold() {},
            style() {
                let look = {background: "#5e2f5e", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", width: '600px', minHeight: '57px'}
                if (this.canClick()) {
                    look.color = "white"
                } else {
                    look.color = "#ffffff9f"
                }
                return look
            }
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1200) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) { return player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id)).sub(1).mul(10) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(x.add(1) || getBuyableAmount(this.layer, this.id).add(1)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Gold Miners (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return '+' + format(tmp[this.layer].buyables[this.id].effect) + ' base gold per second.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Gold'
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = this.cost(getBuyableAmount(this.layer, this.id))
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        12: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(1200) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id))
                if (eff.gte(100)) eff = eff.div(100).log10().add(1).pow(0.5).sub(1).pow_base(10).mul(100);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fiery Emotions (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts first four emotions gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(100) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Gold'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        13: {
            costBase() { return new Decimal(1e4) },
            costGrowth() { return new Decimal(6) },
            purchaseLimit() { return new Decimal(1200) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id))
                if (eff.gte(4)) eff = eff.div(4).log10().add(1).pow(0.5).sub(1).pow_base(10).mul(4);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Prismatic Scales (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts starmetal alloy gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(4) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Gold'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        14: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1200) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id))
                if (eff.gte(1e3)) eff = eff.div(1e3).pow(0.5).mul(1e3);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 3 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fiery Core (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts fire gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(1e3) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Gold'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        15: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(12) },
            purchaseLimit() { return new Decimal(1200) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id))
                if (eff.gte(4)) eff = eff.div(4).log10().add(1).pow(0.5).sub(1).pow_base(10).mul(4);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 4 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dark Training (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts punchcard XP gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(4) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Gold'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        16: {
            costBase() { return new Decimal(1e11) },
            costGrowth() { return new Decimal(12) },
            purchaseLimit() { return new Decimal(1200) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id))
                if (eff.gte(4)) eff = eff.div(4).log10().add(1).pow(0.5).sub(1).pow_base(10).mul(4);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 5 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Prismatic Aura (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts starmetal essence by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(4) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Gold'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        17: {
            costBase() { return new Decimal(1e18) },
            costGrowth() { return new Decimal(6) },
            purchaseLimit() { return new Decimal(1200) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id))
                if (eff.gte(12)) eff = eff.div(12).log10().add(1).pow(0.5).sub(1).pow_base(10).mul(12);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 6 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Blood of the Epic (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts the first 6 epic currencies by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(12) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Gold'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        18: {
            costBase() { return new Decimal(1e28) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(1200) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id))
                if (eff.gte(100)) eff = eff.div(100).log10().add(1).pow(0.5).sub(1).pow_base(10).mul(100);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 7 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dark Arts (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts magic gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(100) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Gold'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        19: {
            costBase() { return new Decimal(1e35) },
            costGrowth() { return new Decimal(144) },
            purchaseLimit() { return new Decimal(1200) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id))
                if (eff.gte(2)) eff = eff.div(2).log10().add(1).pow(0.5).sub(1).pow_base(10).mul(2);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 8 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Flying Through Time (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts check back tickspeed by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(2) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Gold'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        101: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.ep1.fire},
            pay(amt) { player.ep1.fire = this.currency().sub(amt) },
            effect(x) {
                //let eff = Decimal.pow(1.1, getBuyableAmount(this.layer, this.id)).mul(getBuyableAmount(this.layer, this.id).mul(0.5).add(1))
                let eff = Decimal.pow(2, getBuyableAmount(this.layer, this.id).pow(0.5))
                if (eff.gte(1e6)) eff = eff.div(1e6).pow(0.5).mul(1e6);
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Wildfire (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts fire gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(1e6) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Fire'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        102: {
            costBase() { return new Decimal(1e3) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.ep1.fire},
            pay(amt) { player.ep1.fire = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.001)
                return eff.add(1)
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Mountain of Gold (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Add +' + format(tmp[this.layer].buyables[this.id].effect.sub(1), 3) + ' to the gold buyable base.' + (this.effect().gte(1e6) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Fire'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        103: {
            costBase() { return new Decimal(1e4) },
            costGrowth() { return new Decimal(8) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.ep1.fire},
            pay(amt) { player.ep1.fire = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.05).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Hotter Fire (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts the fire effect by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(1e6) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Fire'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        104: {
            costBase() { return new Decimal(1e6) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep1.fire},
            pay(amt) { player.ep1.fire = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.05).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Big Appetite (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts cookie gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(1e6) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Fire'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        105: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep1.fire},
            pay(amt) { player.ep1.fire = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.05).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "More Pixels (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts dotknight point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(1e6) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Fire'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        106: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.ep1.fire},
            pay(amt) { player.ep1.fire = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Alchemical Flame (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boost platinum shard chance by x' + format(tmp[this.layer].buyables[this.id].effect, 1) + '.' + (this.effect().gte(1e6) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Fire'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        201: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep1.platinumShards},
            pay(amt) { player.ep1.platinumShards = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.2).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Gold Transformation (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts gold gain by x' + formatSimple(tmp[this.layer].buyables[this.id].effect) + '.' +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Platinum Shards'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        202: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.ep1.platinumShards},
            pay(amt) { player.ep1.platinumShards = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.2).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fire Transformation (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts fire gain by x' + formatSimple(tmp[this.layer].buyables[this.id].effect) + '.' +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Platinum Shards'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        203: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.ep1.platinumShards},
            pay(amt) { player.ep1.platinumShards = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Platinum Transformation (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts platinum shard chance by x' + formatSimple(tmp[this.layer].buyables[this.id].effect) + '.' +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Platinum Shards'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        204: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep1.platinumShards},
            pay(amt) { player.ep1.platinumShards = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Gold Transformation II (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts gold gain by x' + formatSimple(tmp[this.layer].buyables[this.id].effect) + '.' +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Platinum Shards'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        205: {
            costBase() { return new Decimal(12) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep1.platinumShards},
            pay(amt) { player.ep1.platinumShards = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fire Transformation II (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts fire gain by x' + formatSimple(tmp[this.layer].buyables[this.id].effect) + '.' +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Platinum Shards'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        206: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.ep1.platinumShards},
            pay(amt) { player.ep1.platinumShards = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.02).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Epic Transformation (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts the first 6 epic pet currencies by x' + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + '.' +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Platinum Shards'
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
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '293px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        301: {
            costBase() { return new Decimal(24) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.ep1.magic},
            pay(amt) { player.ep1.magic = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow_base(player.cb.level.add(100000001).log(10).div(8))
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Time is Money (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Check Back level boosts gold gain by x' + format(tmp[this.layer].buyables[this.id].effect, 2) + '.' +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Magic'
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
            style() {
                let look = {backgroundColor: "#bf8fbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        302: {
            costBase() { return new Decimal(96) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.ep1.magic},
            pay(amt) { player.ep1.magic = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.2).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Legendary Catalyst (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts legendary gem effects by ^' + format(tmp[this.layer].buyables[this.id].effect, 2) + '.' +'\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Magic'
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
            style() {
                let look = {backgroundColor: "#bf8fbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
    },
    upgrades: {
        201: {
            title() {
                return "Platinum Pickaxe"
            },
            description() {
                return "Reduces gold button cooldown by /" + format(player.ep1.upgrade201Effect) + ", based on starmetal alloy."
            },
            unlocked() { return true },
            cost: new Decimal(4),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Platinum Shards",
            currencyInternalName: "platinumShards",
            fullDisplay() {
                return "<span style='font-size:16px;line-height:1'>" + this.title() + "</span><br><span style='font-size:10px'>"
                + this.description()
                + "<br>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>"
            },
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', maxHeight: '85.5px', minHeight: '85.5px', paddingLeft: "8px", paddingRight: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        202: {
            title() {
                return "White Gold"
            },
            description() {
                return "Double platinum shard chance from gold buttons."
            },
            unlocked() { return true },
            cost: new Decimal(12),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Platinum Shards",
            currencyInternalName: "platinumShards",
            fullDisplay() {
                return "<span style='font-size:16px;line-height:1'>" + this.title() + "</span><br><span style='font-size:10px'>"
                + this.description()
                + "<br>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>"
            },
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', maxHeight: '85.5px', minHeight: '85.5px', paddingLeft: "8px", paddingRight: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        203: {
            title() {
                return "Advanced Transformations"
            },
            description() {
                return "Boost gold gain by x1.01 for each platinum buyable level."
            },
            unlocked() { return true },
            cost: new Decimal(32),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Platinum Shards",
            currencyInternalName: "platinumShards",
            fullDisplay() {
                return "<span style='font-size:16px;line-height:1'>" + this.title() + "</span><br><span style='font-size:10px'>"
                + this.description() + " (x" + formatSimple(this.effect(), 2) + ")"
                + "<br>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>"
            },
            effect() {
                return player.ep1.upgrade203Effect
            },
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', maxHeight: '85.5px', minHeight: '85.5px', paddingLeft: "8px", paddingRight: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        204: {
            title() {
                return "Precious Metal"
            },
            description() {
                return "+0.005 to the gold buyable base."
            },
            unlocked() { return true },
            cost: new Decimal(100),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Platinum Shards",
            currencyInternalName: "platinumShards",
            fullDisplay() {
                return "<span style='font-size:16px;line-height:1'>" + this.title() + "</span><br><span style='font-size:10px'>"
                + this.description()
                + "<br>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>"
            },
            style() {
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', maxHeight: '85.5px', minHeight: '85.5px', paddingLeft: "8px", paddingRight: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        301: {
            title() {
                return "Conflagration"
            },
            description() {
                return "Fire boosts its own gain by x" + format(player.ep1.upgrade301Effect) + "."
            },
            unlocked() { return true },
            cost: new Decimal(3),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Magic",
            currencyInternalName: "magic",
            fullDisplay() {
                return "<span style='font-size:16px;line-height:1'>" + this.title() + "</span><br><span style='font-size:10px'>"
                + this.description()
                + "<br>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>"
            },
            style() {
                let look = {backgroundColor: "#bf8fbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', maxHeight: '85.5px', minHeight: '85.5px', paddingLeft: "8px", paddingRight: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.color = "black"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        302: {
            title() {
                return "Conjuration"
            },
            description() {
                return "Shards of Ascension boost platinum shard chance by x" + format(player.ep1.upgrade302Effect) + "."
            },
            unlocked() { return true },
            cost: new Decimal(12),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Magic",
            currencyInternalName: "magic",
            fullDisplay() {
                return "<span style='font-size:16px;line-height:1'>" + this.title() + "</span><br><span style='font-size:10px'>"
                + this.description()
                + "<br>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>"
            },
            style() {
                let look = {backgroundColor: "#bf8fbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', maxHeight: '85.5px', minHeight: '85.5px', paddingLeft: "8px", paddingRight: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.color = "black"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        303: {
            title() {
                return "Infused Orbs"
            },
            description() {
                return "Daily orbs give better effects."
            },
            unlocked() { return true },
            cost: new Decimal(1e3),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Magic",
            currencyInternalName: "magic",
            fullDisplay() {
                return "<span style='font-size:16px;line-height:1'>" + this.title() + "</span><br><span style='font-size:10px'>"
                + this.description()
                + "<br>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>"
            },
            style() {
                let look = {backgroundColor: "#bf8fbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', maxHeight: '85.5px', minHeight: '85.5px', paddingLeft: "8px", paddingRight: "8px"}
                if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.color = "black"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
        304: {
            title() {
                return "Self-Sustaining Reaction"
            },
            description() {
                return "Passively generate 1% of platinum shard chance as platinum shards."
            },
            unlocked() { return true },
            cost: new Decimal(1e6),
            currencyLocation() { return player.ep1 },
            currencyDisplayName: "Magic",
            currencyInternalName: "magic",
            fullDisplay() {
                return "<span style='font-size:16px;line-height:1'>" + this.title() + "</span><br><span style='font-size:10px'>"
                + this.description()
                + "<br>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>"
            },
            style() {
                let look = {backgroundColor: "#bf8fbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '292px', maxHeight: '85.5px', minHeight: '85.5px', paddingLeft: "8px", paddingRight: "8px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#77bf5f"
                    look.color = "#1f1f1f"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.color = "black"
                } else {
                    look.color = "#0000005f"
                }
                return look
            }
        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "black", borderColor: "black", backgroundColor: "#cb79ed", borderRadius: "5px"} },
                unlocked() { return false },
                content: [
                    ["centered-draggable-scroll-row", [
                        ["style-row", [

                            // Gold Upgrades
                            ["style-column", [
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "Gold Upgrades", {color: "white", fontSize: "18px"}],
                                    ], {background: "linear-gradient(-90deg, #30bf30 0%, #008040 100%)", width: "600px", height: "25px"}],
                                    ["blank", "4px"],
                                    ["style-column", [
                                        ["raw-html", () => {
                                            let text = "You have " + format(player.ep1.gold) + " gold."
                                            if (player.ep1.goldToGet.gt(0)) text += " (+" + format(player.ep1.goldToGet) + "/s)";
                                            return text
                                        }, {color: "#1f1f1f", fontSize: "18px"}],
                                    ], {height: "25px"}],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["scroll-column", [
                                            ["hoverless-clickable", 1],
                                            ["hoverless-clickable", 2],
                                            ["hoverless-clickable", 3],
                                            ["hoverless-clickable", 4],
                                            ["hoverless-clickable", 5],
                                            ["hoverless-clickable", 6],
                                            ["style-column", [
                                                ["raw-html", () => {
                                                    if (getLevelableTier("pet", 402).lt(1) && getLevelableAmount("pet", 402).lt(2) ) {
                                                        return "Next button unlocked at Lvl-2"
                                                    } else if (getLevelableTier("pet", 402).lt(1) && getLevelableAmount("pet", 402).lt(3)) {
                                                        return "Next button unlocked at Lvl-3"
                                                    } else if (getLevelableTier("pet", 402).lt(1) && getLevelableAmount("pet", 402).lt(6)) {
                                                        return "Next button unlocked at Lvl-6"
                                                    } else if (getLevelableTier("pet", 402).lt(1)) {
                                                        return "Next button unlocked at Asc-1"
                                                    } else if (getLevelableTier("pet", 402).lt(1) || getLevelableAmount("pet", 402).lt(4)) {
                                                        return "Next button unlocked at Asc-1 Lvl-4"
                                                    } else if (getLevelableTier("pet", 402).lt(1) || getLevelableAmount("pet", 402).lt(9)) {
                                                        return "Next button unlocked at Asc-1 Lvl-9"
                                                    }
                                                }, {color: "black"}],
                                            ], () => {
                                                let look = {border: "2px solid white", width: '286px', minHeight: '45px', margin: "4px"}
                                                if ((getLevelableTier("pet", 402).gte(1) && getLevelableAmount("pet", 402).gte(9)) || getLevelableTier("pet", 402).gte(2)) look.display = "none !important"
                                                return look
                                            }],
                                        ], {width: "298px", height: "342px"}],
                                        ["blank", "3px", {width: "4px"}],
                                        ["always-scroll-column", [
                                            ["hoverless-buyable", 11],
                                            ["hoverless-buyable", 12],
                                            ["hoverless-buyable", 13],
                                            ["hoverless-buyable", 14],
                                            ["hoverless-buyable", 15],
                                            ["hoverless-buyable", 16],
                                            ["hoverless-buyable", 17],
                                            ["hoverless-buyable", 18],
                                            ["hoverless-buyable", 19],
                                            ["hoverless-buyable", 20],
                                            ["hoverless-buyable", 21],
                                            ["hoverless-buyable", 22],
                                        ], {background: "#3f3f3f", width: "298px", height: "342px"}],
                                    ]],
                                ], {background: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", width: "600px", height: "400px", padding: "3px"}], 
                            ], {position: "relative", left: "-300px", top: "0px", width: "0px", height: "0px"}],
                            
                            // Dragon Evolutions
                            ["style-column", [
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "Dragon Evolutions", {color: "white", fontSize: "18px"}],
                                    ], {background: "linear-gradient(-90deg, #d487fd 0%, #4c64ff 100%)", width: "600px", height: "25px"}],
                                    ["blank", "4px"],
                                    ["tooltip-row", [
                                        ["raw-html", () => { return "You have a " + (DRAGONS[player.ep1.dragonEvolutionIndex].name || "Glitch Dragon (guh??)") + "."}, {color: "#1500bf", fontSize: "18px"}],
                                        ["raw-html", () => { return "<div class='bottomTooltip'>Evolution Bonuses<hr><small>" + DRAGONS[player.ep1.dragonEvolutionIndex].bonusInfo + "</small></div>"}, {color: "#1500bf", fontSize: "18px"}],
                                    ], {height: "25px"}],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["top-column", [
                                            ["style-column", [
                                                ["raw-html", () => {
                                                    return "<img src='resources/Pets/dragon/" + DRAGONS[player.ep1.dragonEvolutionIndex].id + "DragonEvo.png' width='279px' height='279px' style='margin-bottom:-5px'></img>"
                                                }, {color: "black"}],
                                            ], () => {
                                                let look = {width: '600px', height: '285px'}
                                                return look
                                            }],
                                            ["hoverless-clickable", 11],
                                            ["hoverless-clickable", 12],
                                            ["hoverless-clickable", 13],
                                            ["hoverless-clickable", 14],
                                            ["hoverless-clickable", 15],
                                            ["hoverless-clickable", 16],
                                            ["hoverless-clickable", 17],
                                            ["hoverless-clickable", 18],
                                            ["hoverless-clickable", 19],
                                            ["hoverless-clickable", 20],
                                            ["hoverless-clickable", 21],
                                            ["hoverless-clickable", 22],
                                        ], {background: "", width: "600px", height: "342px"}],
                                    ]],
                                ], () => {
                                    let look = {background: "linear-gradient(90deg, #e9bfff, #a6b2ff)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", width: "600px", height: "400px", padding: "3px"}
                                        if (player.s.singularities.lt(2)) look.display = "none !important";
                                        return look
                                    }
                                ]
                            ], {position: "relative", left: "-300px", top: "425px", width: "0px", height: "0px"}],
                            
                            // Fire
                            ["style-column", [
                                ["top-column", [
                                    ["style-column", [
                                        ["raw-html", "Fire Upgrades", {color: "white", fontSize: "18px"}],
                                    ], {background: "linear-gradient(-90deg, #30bf30 0%, #008040 100%)", width: "600px", height: "25px"}],
                                    ["blank", "4px"],
                                    ["style-column", [
                                        ["raw-html", () => {
                                            let text = "You have " + format(player.ep1.fire) + " fire."
                                            if (player.ep1.fireToGet.gt(0)) text += " (+" + format(player.ep1.fireToGet) + "/s)";
                                            return text
                                        }, {color: "#1f1f1f", fontSize: "18px"}],
                                    ], {height: "25px"}],
                                    ["blank", "1px"],
                                    ["top-column", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<small>Gold gives a base of +" + format(player.ep1.baseFireToGet) + " fire /s.</small>"}, {color: "#804000"}],
                                            ["raw-html", () => {return "<small>Fire boosts gold gain by x" + format(player.ep1.fireEffect) + ".</small>"}, {color: "#804000"}],
                                        ], {background: "", width: "600px", height: "57px", fontSize: "18px"}],
                                        ["blank", "3px", {width: "4px"}],
                                        ["always-scroll-column", [
                                            ["style-row", [
                                                ["top-column", [
                                                    ["hoverless-buyable", 101],
                                                    ["hoverless-buyable", 103],
                                                    ["hoverless-buyable", 105],
                                                ], {width: "292px"}],
                                                ["top-column", [
                                                    ["hoverless-buyable", 102],
                                                    ["hoverless-buyable", 104],
                                                    ["hoverless-buyable", 106],
                                                ], {width: "292px"}],
                                            ]],
                                        ], {background: "#3f3f3f", width: "600px", height: "285px"}],
                                        /*["always-scroll-column", [
                                            ["hoverless-buyable", 101],
                                            ["hoverless-buyable", 102],
                                            ["hoverless-buyable", 103],
                                            ["hoverless-buyable", 104],
                                            ["hoverless-buyable", 105],
                                            ["hoverless-buyable", 106],
                                        ], {background: "#3f3f3f", width: "298px", height: "342px"}],*/
                                    ]],
                                ], () => {
                                    let look = {backgroundColor: "#ffc080", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", width: "600px", height: "400px", padding: "3px"}
                                        if (player.ep1.dragonEvolutionIndex < 2) look.display = "none !important";
                                        return look
                                    }], 
                            ], {position: "relative", left: "-925px", top: "0px", width: "0px", height: "0px"}],
                            
                            // Alchemy
                            ["style-column", [
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "Alchemy Upgrades", {color: "white", fontSize: "18px"}],
                                    ], {background: "linear-gradient(-90deg, #30bf30 0%, #008040 100%)", width: "600px", height: "25px"}],
                                    ["blank", "4px"],
                                    ["style-column", [
                                        ["tooltip-row", [
                                            ["raw-html", () => {
                                                let text = "You have " + formatWhole(player.ep1.platinumShards) + " platinum shards."
                                                return text
                                            }, {color: "#1f1f1f", fontSize: "18px"}],
                                            ["raw-html", () => {
                                                return "<div class='bottomTooltip'><small>Obtained from gold buttons<br>Pity: " + formatSimple(player.ep1.platinumShardPity) + "/100</small></div>"
                                            }],
                                        ]]
                                    ], {height: "25px"}],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["always-scroll-column", [
                                            ["style-row", [
                                                ["top-column", [
                                                    ["hoverless-upgrade", 201],
                                                    ["hoverless-upgrade", 202],
                                                    ["hoverless-upgrade", 203],
                                                    ["hoverless-upgrade", 204],
                                                ], {height: "342px"}],
                                                ["top-column", [
                                                    ["hoverless-buyable", 201],
                                                    ["hoverless-buyable", 202],
                                                    ["hoverless-buyable", 203],
                                                    ["hoverless-buyable", 204],
                                                    ["hoverless-buyable", 205],
                                                    ["hoverless-buyable", 206],
                                                ], {height: "342px"}],
                                            ]],
                                        ], {background: "#3f3f3f", width: "600px", height: "342px"}],
                                    ]],
                                ], () => {
                                    let look = {backgroundColor: "#c3d1de", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", width: "600px", height: "400px", padding: "3px"}
                                        if (player.ep1.dragonEvolutionIndex <= 4) look.display = "none !important";
                                        return look
                                    }], 
                            ], {position: "relative", left: "325px", top: "0px", width: "0px", height: "0px"}],
                            
                            // Magic
                            ["style-column", [
                                ["top-column", [
                                    ["style-column", [
                                        ["raw-html", "Magic", {color: "white", fontSize: "18px"}],
                                    ], {background: "linear-gradient(-90deg, #7830bf 0%, #600080 100%)", width: "600px", height: "25px"}],
                                    ["blank", "4px"],
                                    ["style-column", [
                                        ["tooltip-row", [
                                            ["raw-html", () => {
                                                let text = "You have " + formatWhole(player.ep1.magic) + " magic."
                                                return text
                                            }, {color: "#1f1f1f", fontSize: "18px"}],
                                            ["raw-html", () => {return "(+" + formatWhole(player.ep1.magicToGet) + ")"}, () => {
                                                let look = {color: "white", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}
                                                player.ep1.magicToGet.gt(0) ? look.color = "#1f1f1f" : look.color = "#1f1f1f7f"
                                                return look
                                            }],
                                            ["raw-html", () => {
                                                return "<div class='bottomTooltip'><small>Base Gain<br>2^(log(Gold+1)-20)</small></div>"
                                            }],
                                        ]]
                                    ], {height: "25px"}],
                                    ["blank", "4px"],
                                    ["style-column", [
                                        ["style-column", [
                                            ["raw-html", () => {return "<small>Magic boosts gold gain by x" + format(player.ep1.magicEffect) + ".</small>"}, {color: "#5e2f5e"}],
                                            ["raw-html", () => {return "<small>Magic boosts paragon shard chance by x" + format(player.ep1.magicEffect2) + ".</small>"}, {color: "#5e2f5e"}],
                                        ], {background: "", width: "600px", height: "57px", fontSize: "18px"}],
                                    ]],
                                    ["hoverless-clickable", 101],
                                    ["style-row", [
                                        ["always-scroll-column", [
                                            ["style-row", [
                                                ["top-column", [
                                                    ["hoverless-upgrade", 301],
                                                    ["hoverless-buyable", 301],
                                                    ["hoverless-upgrade", 303],
                                                ]],
                                                ["top-column", [
                                                    ["hoverless-upgrade", 302],
                                                    ["hoverless-buyable", 302],
                                                    ["hoverless-upgrade", 304],
                                                ]],
                                            ]],
                                        ], {background: "#3f3f3f", width: "600px", height: "228px"}],
                                    ]],
                                ], () => {
                                    let look = {backgroundColor: "#bf8fbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", width: "600px", height: "400px", padding: "3px"}
                                        if (player.ep1.dragonEvolutionIndex < 7) look.display = "none !important";
                                        return look
                                    }], 
                            ], {position: "relative", left: "-300px", top: "-425px", width: "0px", height: "0px"}],
                            
                        ], {background: "repeating-linear-gradient(135deg, #272727 0 15px, #2f2f2f 0 30px)", width: "2400px", height: "1600px"}],
                    ], {border: "6px solid #171717", width: "800px", height: "600px", flexFlow: "column"}],
                    ["blank", "10px"],
                ]
            },
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 402).gte(1) || getLevelableTier("pet", 402).gte(1)) },
})