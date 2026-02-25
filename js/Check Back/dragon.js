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
        bonusInfo: "x6 Gold<br>x3 Radiation<br>+0.01 Gold Buyable Base<br>+10% Characters' Base Stats",
    },
    4: {
        name: "Space Dragon",
        id: "space",
        bonusInfo: "x18 Gold<br>x3 Radiation<br>+0.01 Gold Buyable Base<br>+10% Characters' Base Stats<br>x3 Stars<br>x3 Check Back XP",
    },
    5: {
        name: "Core Dragon",
        id: "core",
        bonusInfo: "x18 Gold<br>x3 Radiation<br>+0.02 Gold Buyable Base<br>+10% Characters' Base Stats<br>x3 Stars<br>x3 Check Back XP",
    },
    6: {
        name: "Otherworldly Dragon",
        id: "otherworldly",
        bonusInfo: "x18, ^1.025 Gold<br>x3 Radiation<br>+0.02 Gold Buyable Base<br>+10% Characters' Base Stats<br>x3 Stars<br>x3 Check Back XP<br>^1.25 Mastery Point Effects",
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
                platinumSC: new Decimal(0.1),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(720),
                base: new Decimal(270),
                platinumSC: new Decimal(0.1),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(8640),
                base: new Decimal(2430),
                platinumSC: new Decimal(0.1),
            },
        },

        fire: new Decimal(0),
        baseFireToGet: new Decimal(0),
        fireToGet: new Decimal(0),
        fireEffect: new Decimal(0),

        platinumShards: new Decimal(0),
        platinumShardPity: 0,

        goldBuyableBase: new Decimal(1.01),

        isInThisTab: false,
        wasInThisTab: false,
    }},
    nodeStyle: {
        backgroundColor: "#60994d",
        borderColor: "#004025",
        color: "#004025",
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
        if (hasUpgrade("ev8", 21)) player.ep1.goldToGet = player.ep1.goldToGet.mul(1.4)
        player.ep1.gold = player.ep1.gold.add(player.ep1.goldToGet.mul(delta))

        // GOLD BUTTONS

        player.ep1.goldTimers[0].base = new Decimal(30)
        player.ep1.goldTimers[1].base = new Decimal(270)
        player.ep1.goldTimers[2].base = new Decimal(2430)

        player.ep1.goldTimers[0].max = new Decimal(60)
        player.ep1.goldTimers[1].max = new Decimal(720)
        player.ep1.goldTimers[2].max = new Decimal(8640)

        player.ep1.goldTimers[0].platinumSC = new Decimal(0.1)
        player.ep1.goldTimers[1].platinumSC = new Decimal(1)
        player.ep1.goldTimers[2].platinumSC = new Decimal(10)
        
        for (let i in player.ep1.goldTimers) {
            player.ep1.goldTimers[i].max = player.ep1.goldTimers[i].max.div(buyableEffect("pet", 6))

            player.ep1.goldTimers[i].current = player.ep1.goldTimers[i].current.sub(onepersec.mul(delta))
        }

        // GOLD BUYABLES
        player.ep1.goldBuyableBase = new Decimal(1.01)
        if (player.ep1.dragonEvolutionIndex >= 2) player.ep1.goldBuyableBase = player.ep1.goldBuyableBase.add(0.01);
        if (player.ep1.dragonEvolutionIndex >= 5) player.ep1.goldBuyableBase = player.ep1.goldBuyableBase.add(0.01);
        player.ep1.goldBuyableBase = player.ep1.goldBuyableBase.add(buyableEffect("ep1", 102))

        // FIRE GAIN
        player.ep1.baseFireToGet = player.ep1.gold.add(1).pow(0.2).log(10).pow(4)
        player.ep1.fireToGet = player.ep1.baseFireToGet
        player.ep1.fireToGet = player.ep1.fireToGet.mul(buyableEffect("ep1", 101))
        player.ep1.fireToGet = player.ep1.fireToGet.mul(buyableEffect("ep1", 14))
        if (player.ep1.dragonEvolutionIndex >= 2) player.ep1.fire = player.ep1.fire.add(player.ep1.fireToGet.mul(delta));

        // FIRE EFFECT

        player.ep1.fireEffect = Decimal.pow(10, player.ep1.fire.add(1).log(10).pow(0.75)).pow(0.25)
        player.ep1.fireEffect = player.ep1.fireEffect.pow(buyableEffect("ep1", 103))

        // SCROLLING CONTAINER
        player.ep1.isInThisTab = player.tab == "ep1"
        if (player.ep1.isInThisTab && !player.ep1.wasInThisTab) {
	        let items = document.getElementsByClassName("scrollCentered")

            for (let i = 0; i < items.length; i++) {
    	        items[i].scrollLeft = (items[i].scrollWidth - items[i].clientWidth ) / 2;
    	        items[i].scrollTop = (items[i].scrollHeight - items[i].clientHeight ) / 2;
		        items[i].addEventListener('mousemove', function (e) {
			        move(e, items[i])
		        }, false);
		        items[i].addEventListener('mousedown', function (e) {
			        startDragging(e, items[i])
		        }, false);
		        items[i].addEventListener('mouseup', function (e) {
		        	stopDragging(e, items[i])
		        }, false);
		        items[i].addEventListener('mouseleave', function (e) {
		        	stopDragging(e, items[i])
		        }, false);

            }
        }
        player.ep1.wasInThisTab = player.ep1.isInThisTab
    },
    clickables: {
        1: {
            display() {
                let text = "<div class='bottomTooltip', style='border:0px'>Platinum Shard Rarity:<br>1%</div>"
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
                let text = "<div class='bottomTooltip', style='border:0px'>Platinum Shard Rarity:<br>5%</div>"
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
                let text = "<div class='bottomTooltip', style='border:0px'>Platinum Shard Rarity:<br>25%</div>"
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
                    return "<h2>+1 Platinum Shard.</h2>"
                } else {
                    return "<h2>Check back in " + formatTime(player.ep1.goldTimers[0].current) + ".</h2>"
                }
            },
            canClick() { return player.ep1.goldTimers[0].current.lte(0) },
            unlocked() { return getLevelableTier("pet", 402).gte(1) },
            onClick() {
                player.ep1.goldTimers[0].current = player.ep1.goldTimers[0].max
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
                    return "<h2>+2 Platinum Shards.</h2>"
                } else {
                    return "<h2>Check back in " + formatTime(player.ep1.goldTimers[0].current) + ".</h2>"
                }
            },
            canClick() { return player.ep1.goldTimers[0].current.lte(0) },
            unlocked() { return (getLevelableTier("pet", 402).gte(1) && getLevelableAmount("pet", 402).gte(4)) || getLevelableTier("pet", 402).gte(2) },
            onClick() {
                player.ep1.goldTimers[0].current = player.ep1.goldTimers[0].max
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
                    return "<h2>+4 Platinum Shards.</h2>"
                } else {
                    return "<h2>Check back in " + formatTime(player.ep1.goldTimers[0].current) + ".</h2>"
                }
            },
            canClick() { return player.ep1.goldTimers[0].current.lte(0) },
            unlocked() { return (getLevelableTier("pet", 402).gte(1) && getLevelableAmount("pet", 402).gte(9)) || getLevelableTier("pet", 402).gte(2) },
            onClick() {
                player.ep1.goldTimers[0].current = player.ep1.goldTimers[0].max
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
            }
        },
        12: {
            display() { return "<h2>Infuse your dragon with starlight.</h2><br>Boosts the gold upgrade base by +0.01 and unlocks fire.<br>Requires 100,000 Gold and 200 Starmetal Alloy."},
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
            display() { return "<h2>Embed ancient machinery into your dragon.</h2><br>Boosts all character's base stats by +10%, and double gold gain.<br>Requires 10,000 Fire, 100 Evolution Shards, <s>and a max level core</s>."},
            canClick() {
                let t = false
                if (player.ma.matosDefeated) t = true;
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
            display() { return "<h2>Send your dragon to space.</h2><br>Boosts check back XP, stars, and gold gain by x3 and unlocks alchemy.<br>Requires 1e9 Gold and an ascended space pet."},
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
                    look.color = "#0000009f"
                }
                return look
            }
        },
        16: {
            display() { return "<h2>Infuse your dragon with otherworldly powers.</h2><br>Boosts gold gain by ^1.025 and mastery point effects by ^1.25.<br>Requires 5 platinum shards."},
            canClick() { return false },
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
    },
    buyables: { // setBuyableAmount('ep1', 11, new Decimal(0))
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.075) },
            purchaseLimit() { return new Decimal(1e3) },
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
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
                }
                return look
            }
        },
        12: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id).mul(3))
                if (eff.gte(1e6)) eff = eff.div(1e6).pow(0.5).mul(1e6);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fiery Emotions (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts first four emotions gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(1e6) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
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
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
                }
                return look
            }
        },
        13: {
            costBase() { return new Decimal(1e4) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id))
                if (eff.gte(4)) eff = getBuyableAmount(this.layer, this.id).sub(Decimal.log(4, player.ep1.goldBuyableBase)).add(1).pow(0.85).add(Decimal.log(4, player.ep1.goldBuyableBase)).sub(1).pow_base(player.ep1.goldBuyableBase);
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
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
                }
                return look
            }
        },
        14: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(1.625) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id).mul(2))
                if (eff.gte(1e3)) eff = eff.div(1e3).pow(0.5).mul(1e3);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 3 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Heat of the Core (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
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
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
                }
                return look
            }
        },
        15: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(12) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.ep1.gold},
            pay(amt) { player.ep1.gold = this.currency().sub(amt) },
            effect(x) {
                let eff = player.ep1.goldBuyableBase.pow(getBuyableAmount(this.layer, this.id).mul(3))
                if (eff.gte(1e3)) eff = eff.div(1e3).pow(0.5).mul(1e3);
                return eff
            },
            unlocked() { return player.ep1.dragonEvolutionIndex >= 4 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dark Training (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Boosts punchcard XP gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.' + (this.effect().gte(1e3) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
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
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
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
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
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
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Mountains of Gold (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Add +' + format(tmp[this.layer].buyables[this.id].effect, 3) + ' to the gold buyable base.' + (this.effect().gte(1e6) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
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
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
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
                return "Burning Hotter (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
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
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
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
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
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
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
                }
                return look
            }
        },
        106: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
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
                return "pretty good upgrade (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")"
            },
            display() {
                return 'Reduces legendary summon cooldown by /' + format(tmp[this.layer].buyables[this.id].effect, 1) + '.' + (this.effect().gte(1e6) ? "<span style='color:red'> [SOFTCAPPED]</span>" : "") +'\n\
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
                let look = {backgroundColor: "#bfbfbf", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", borderRadius: "0px", textAlign: "left", width: '283px', height: '57px', paddingLeft: "8px", paddingRight: "8px"}
                if (this.canAfford()) {
                    look.color = "#1f1f1f"
                } else {
                    look.color = "#6f6f6f"
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
                                        ["style-column", [
                                            ["style-column", [
                                                ["raw-html", () => {
                                                    return "<img src='resources/Pets/dragon/" + DRAGONS[player.ep1.dragonEvolutionIndex].id + "DragonEvo.png' width='279px' height='279px' style='margin-bottom:-5px'></img>"
                                                }, {color: "black"}],
                                            ], () => {
                                                let look = {width: '279px', height: '279px'}
                                                if ((getLevelableTier("pet", 402).gte(1) && getLevelableAmount("pet", 402).gte(9)) || getLevelableTier("pet", 402).gte(2)) look.display = "none !important"
                                                return look
                                            }],
                                            ["blank", "5px"],
                                            ["hoverless-clickable", 11],
                                            ["hoverless-clickable", 12],
                                            ["hoverless-clickable", 13],
                                            ["hoverless-clickable", 14],
                                            ["hoverless-clickable", 15],
                                            ["hoverless-clickable", 16],
                                        ], {background: "", width: "600px", height: "342px"}],
                                    ]],
                                ], {background: "linear-gradient(90deg, #e9bfff, #a6b2ff)", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", width: "600px", height: "400px", padding: "3px"}], 
                            ], {position: "relative", left: "-300px", top: "425px", width: "0px", height: "0px"}],
                            
                            // Fire
                            ["style-column", [
                                ["style-column", [
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
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["scroll-column", [
                                            ["raw-html", () => {return "<h6>Gold gives a base of +" + format(player.ep1.baseFireToGet) + " fire /s.</h6>"}, {color: "black"}],
                                            ["raw-html", () => {return "<h6>Fire boosts gold by x" + format(player.ep1.fireEffect) + ".</h6>"}, {color: "black"}],
                                        ], {background: "", width: "298px", height: "342px"}],
                                        ["blank", "3px", {width: "4px"}],
                                        ["always-scroll-column", [
                                            ["hoverless-buyable", 101],
                                            ["hoverless-buyable", 102],
                                            ["hoverless-buyable", 103],
                                            ["hoverless-buyable", 104],
                                            ["hoverless-buyable", 105],
                                            ["hoverless-buyable", 106],
                                        ], {background: "#3f3f3f", width: "298px", height: "342px"}],
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
                                                return "<div class='bottomTooltip'><small>Obtained from gold buttons<br>Pity: " + format(player.ep1.platinumShardPity) + "/100</small></div>"
                                            }],
                                        ]]
                                    ]],
                                    ["blank", "4px"],
                                    ["style-row", [
                                        ["scroll-column", [
                                            ["raw-html", () => {return "<h6>Gold gives a base of +" + format(player.ep1.baseFireToGet) + " fire /s.</h6>"}, {color: "black"}],
                                            ["raw-html", () => {return "<h6>Fire boosts gold by x" + format(player.ep1.fireEffect) + ".</h6>"}, {color: "black"}],
                                        ], {background: "", width: "298px", height: "342px"}],
                                        ["blank", "3px", {width: "4px"}],
                                        ["always-scroll-column", [
                                            ["hoverless-buyable", 101],
                                            ["hoverless-buyable", 102],
                                            ["hoverless-buyable", 103],
                                            ["hoverless-buyable", 104],
                                            ["hoverless-buyable", 105],
                                            ["hoverless-buyable", 106],
                                        ], {background: "#3f3f3f", width: "298px", height: "342px"}],
                                    ]],
                                ], () => {
                                    let look = {backgroundColor: "#c3d1de", borderLeft: "2px solid white", borderTop: "2px solid white", borderRight: "2px solid #7f7f7f", borderBottom: "2px solid #7f7f7f", width: "600px", height: "400px", padding: "3px"}
                                        if (player.ep1.dragonEvolutionIndex < 2) look.display = "none !important";
                                        return look
                                    }], 
                            ], {position: "relative", left: "325px", top: "0px", width: "0px", height: "0px"}],
                            
                        ], {background: "repeating-linear-gradient(135deg, #272727 0 15px, #2f2f2f 0 30px)", width: "2400px", height: "1600px"}],
                    ], {border: "6px solid #171717", width: "800px", height: "600px", flexFlow: "column"}],
                    ["blank", "10px"],
                    ["raw-html", () => {return (getLevelableAmount("pet", 402).gte(7) || getLevelableTier("pet", 402).gte(1)) ? "" : getLevelableAmount("pet", 402).gte(2) ? "You will unlock the next button at level 7!" : "You will unlock the next button at level 2!"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
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