addLayer("sma", {
    name: "Starmetal Alloy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SMA", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        starmetalAlloy: new Decimal(0),

        inStarmetalChallenge: false,

        // Auto
        toggle: false,
        input: new Decimal(0),
        amount: new Decimal(1),
        type: false, // False: Amount ; True: Time
        time: new Decimal(0),

        eclipseShards: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%,#eb6077 50%, #d460eb, 75%,  #60cfeb 100%)",
            "background-origin": "border-box",
            "border-color": "#282363",
            "color": "#282363",
        };
    },
    tooltip: "Starmetal Alloy",
    branches() { return !player.ma.matosDefeated ? ["ra", "sd"] : ["ra"] },
    color: "#d460eb",
    update(delta) {
        let onepersec = new Decimal(1)
        // Set Autocrunch Values
        if (player.sma.input.gte(1) && !player.sma.type) player.sma.amount = player.sma.input
        if (player.sma.input.lt(1) && !player.sma.type) player.sma.amount = new Decimal(1)

        if (player.s.singularityPointsToGet.gte(player.sma.amount) && player.sma.toggle && !player.sma.type) {
            clickClickable("co", 1000)
        }

        if (player.sma.toggle && player.sma.type) {
            player.sma.time = player.sma.time.add(onepersec.mul(delta));
            if (player.sma.time.gte(player.sma.amount)) {
                player.sma.time = new Decimal(0)
                clickClickable("co", 1000)
            }
        }
    },
    clickables: {
        11: {
            title() { return "<h1>START ABSORBING LIGHT<br><h3>And enter darkness..." },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.sma.inStarmetalChallenge = true
                player.universe = -0.1
                player.tab = "le"
                player.uniTab = 1

                layers.le.starmetalResetAgain()
                
                layers.pu.generateSelection();

                player.subtabs["le"]["stuff"] = "Main"
                player.subtabs.pu["stuff"] = "Selection"
            },
            style: {width: "600px", minHeight: "200px", backgroundImage: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%, #60cfeb 100%)", border: "3px solid black", borderRadius: "15px"},
        },
        13: {
            title() {return player.sma.toggle ? "Auto-Singularity: ON" : "Auto-Singularity: OFF"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.sma.toggle) {
                    player.sma.toggle = false
                } else {
                    player.sma.toggle = true
                }
            },
            style() {
                let look = {width: "400px", minHeight: "60px", fontSize: "18px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (player.sma.toggle) {look.backgroundColor = "#AA0000"} else {look.backgroundColor = "#760000"}
                return look
            },
        },
        14: {
            title() { return "Amount" },
            canClick() { return player.sma.type },
            unlocked() { return true },
            onClick() {
                player.sma.type = false
            },
            style() {
                let look = {width: "200px", minHeight: "40px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (player.sma.type) {look.backgroundColor = "#AA0000"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
        15: {
            title() { return "Time" },
            canClick() { return !player.sma.type },
            unlocked() { return true },
            onClick() {
                player.sma.type = true
            },
            style() {
                let look = {width: "200px", minHeight: "40px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (!player.sma.type) {look.backgroundColor = "#AA0000"} else {look.backgroundColor = "#bf8f8f"}
                return look
            },
        },
    },
    bars: {},
    upgrades: { 
        10: {
            title: "Dark Starmetal Upgrade I",
            unlocked: true,
            description: "Buff DCP based on dark starmetal upgrades.",
            cost: new Decimal("1"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            effect() {
                let amt = new Decimal(1)
                for (let i = 0; i < player.sma.upgrades.length; i++) {
                    if (+player.sma.upgrades[i] < 100) amt = amt.add(1)
                }
                return amt
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid", margin: "2px"}
                if (player.sma.inStarmetalChallenge) {look.borderColor = "#384166"} else {look.borderColor = "rgba(255,255,255,0.5)"}
                hasUpgrade(this.layer, this.id) ? look.background = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#361e1e" : look.background = "linear-gradient(120deg, #2e2f11 0%, #261e0a 25%, #2f1317 50%, #2a132f, 75%,  #13292f 100%)"
                return look
            }
        },
        11: {
            title: "Dark Starmetal Upgrade II",
            unlocked() { return hasUpgrade("sma", 10)},
            description: "Improve dark ranks and tiers effects.",
            cost: new Decimal("3"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid", margin: "2px"}
                if (player.sma.inStarmetalChallenge) {look.borderColor = "#384166"} else {look.borderColor = "rgba(255,255,255,0.5)"}
                hasUpgrade(this.layer, this.id) ? look.background = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#361e1e" : look.background = "linear-gradient(120deg, #2e2f11 0%, #261e0a 25%, #2f1317 50%, #2a132f, 75%,  #13292f 100%)"
                return look
            }
        },
        12: {
            title: "Dark Starmetal Upgrade III",
            unlocked() { return hasUpgrade("sma", 11)},
            description: "Unlock dark generators.",
            cost: new Decimal("5"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid", margin: "2px"}
                if (player.sma.inStarmetalChallenge) {look.borderColor = "#384166"} else {look.borderColor = "rgba(255,255,255,0.5)"}
                hasUpgrade(this.layer, this.id) ? look.background = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#361e1e" : look.background = "linear-gradient(120deg, #2e2f11 0%, #261e0a 25%, #2f1317 50%, #2a132f, 75%,  #13292f 100%)"
                return look
            }
        },
        13: {
            title: "Dark Starmetal Upgrade IV",
            unlocked() { return hasUpgrade("sma", 12)},
            description: "Dark prestige points boost dark celestial point gain.",
            cost: new Decimal("8"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            effect() {
                return player.dp.prestigePoints.pow(0.2).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {width: "150px", borderRadius: "15px", color: "white", border: "2px solid", margin: "2px"}
                if (player.sma.inStarmetalChallenge) {look.borderColor = "#384166"} else {look.borderColor = "rgba(255,255,255,0.5)"}
                hasUpgrade(this.layer, this.id) ? look.background = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#361e1e" : look.background = "linear-gradient(120deg, #2e2f11 0%, #261e0a 25%, #2f1317 50%, #2a132f, 75%,  #13292f 100%)"
                return look
            }
        },
        14: {
            title: "Dark Starmetal Upgrade V",
            unlocked() { return hasUpgrade("sma", 13)},
            description: "Unlock starmetal punchcards.",
            cost: new Decimal("15"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid", margin: "2px"}
                if (player.sma.inStarmetalChallenge) {look.borderColor = "#384166"} else {look.borderColor = "rgba(255,255,255,0.5)"}
                hasUpgrade(this.layer, this.id) ? look.background = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#361e1e" : look.background = "linear-gradient(120deg, #2e2f11 0%, #261e0a 25%, #2f1317 50%, #2a132f, 75%,  #13292f 100%)"
                return look
            }
        },
        15: {
            title: "Dark Starmetal Upgrade VI",
            unlocked() { return hasUpgrade("sma", 14)},
            description: "Gain an extra card selection at the start of a run.",
            onPurchase() {player.pu.storedSelections = player.pu.storedSelections.add(1)},
            cost: new Decimal("22"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid", margin: "2px"}
                if (player.sma.inStarmetalChallenge) {look.borderColor = "#384166"} else {look.borderColor = "rgba(255,255,255,0.5)"}
                hasUpgrade(this.layer, this.id) ? look.background = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#361e1e" : look.background = "linear-gradient(120deg, #2e2f11 0%, #261e0a 25%, #2f1317 50%, #2a132f, 75%,  #13292f 100%)"
                return look
            }
        },
        16: {
            title: "Dark Starmetal Upgrade VII",
            unlocked() { return hasUpgrade("sma", 15)},
            description: "Unlock dark grass.",
            cost: new Decimal("30"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid", margin: "2px"}
                if (player.sma.inStarmetalChallenge) {look.borderColor = "#384166"} else {look.borderColor = "rgba(255,255,255,0.5)"}
                hasUpgrade(this.layer, this.id) ? look.background = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#361e1e" : look.background = "linear-gradient(120deg, #2e2f11 0%, #261e0a 25%, #2f1317 50%, #2a132f, 75%,  #13292f 100%)"
                return look
            }
        },
        17: {
            title: "Dark Starmetal Upgrade VIII",
            unlocked() { return hasUpgrade("sma", 16)},
            description: "Unlock epic punchcards.",
            cost: new Decimal("45"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid", margin: "2px"}
                if (player.sma.inStarmetalChallenge) {look.borderColor = "#384166"} else {look.borderColor = "rgba(255,255,255,0.5)"}
                hasUpgrade(this.layer, this.id) ? look.background = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#361e1e" : look.background = "linear-gradient(120deg, #2e2f11 0%, #261e0a 25%, #2f1317 50%, #2a132f, 75%,  #13292f 100%)"
                return look
            }
        },
        18: {
            title: "Dark Starmetal Upgrade IX",
            unlocked() { return hasUpgrade("sma", 17)},
            description: "Unlock normality upgrades.",
            cost: new Decimal("5000"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {borderRadius: "15px", color: "white", border: "2px solid", margin: "2px"}
                if (player.sma.inStarmetalChallenge) {look.borderColor = "#384166"} else {look.borderColor = "rgba(255,255,255,0.5)"}
                hasUpgrade(this.layer, this.id) ? look.background = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#361e1e" : look.background = "linear-gradient(120deg, #2e2f11 0%, #261e0a 25%, #2f1317 50%, #2a132f, 75%,  #13292f 100%)"
                return look
            }
        },

        //other
        101: {
            title: "Light Starmetal Upgrade I",
            unlocked() { return true},
            description: "Unspent starmetal alloy boosts singularity point gain.",
            cost: new Decimal("3"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            effect() {
                return player.sma.starmetalAlloy.add(1).pow(1.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%, #60cfeb 100%)"
                return look
            }
        },
        102: {
            title: "Light Starmetal Upgrade II",
            unlocked() { return hasUpgrade("sma", 101)},
            description: "Unspent starmetal alloy boosts core scrap gain.",
            cost: new Decimal("6"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            effect() {
                return Decimal.pow(2, player.sma.starmetalAlloy.add(1).log(10))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%, #60cfeb 100%)"
                return look
            }
        },
        103: {
            title: "Light Starmetal Upgrade III",
            unlocked() { return hasUpgrade("sma", 102)},
            description: "Gain 10% of steel per second.",
            cost: new Decimal("12"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%, #60cfeb 100%)"
                return look
            }
        },
        104: {
            title: "Light Starmetal Upgrade IV",
            unlocked() { return hasUpgrade("sma", 103)},
            description: "Unlock auto singularity.",
            cost: new Decimal("25"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%, #60cfeb 100%)"
                return look
            }
        },
        105: {
            title: "Light Starmetal Upgrade V",
            unlocked() { return hasUpgrade("sma", 104)},
            description: "Unlock starmetal buyables.",
            cost: new Decimal("50"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%, #60cfeb 100%)"
                return look
            }
        },
        106: {
            title: "Light Starmetal Upgrade VI",
            unlocked() { return hasUpgrade("sma", 105)},
            description: "Unlock radioactive core.",
            cost: new Decimal("100"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%, #60cfeb 100%)"
                return look
            }
        },
        107: {
            title: "Light Starmetal Upgrade VII",
            unlocked() { return hasUpgrade("sma", 106) && player.ma.secondAreaUnlock},
            description: "Number of dice sides is multiplied based on best depth 1 combo.",
            cost: new Decimal("1111"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Starmetal Alloy",
            currencyInternalName: "starmetalAlloy",
            effect() {
                return player.ma.bestComboDepth1.div(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%, #eb6077 50%, #d460eb, 75%, #60cfeb 100%)"
                return look
            }
        },

        //eclipse shards
        201: {
            title: "Eclipse Shard Upgrade I",
            unlocked() { return true},
            description: "Autobuy all light extractor upgrades.",
            cost: new Decimal("6"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Eclipse Shards",
            currencyInternalName: "eclipseShards",
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "#f5ff68"
                return look
            }
        },
        202: {
            title: "Eclipse Shard Upgrade II",
            unlocked() { return true},
            description: "Always generate 1% of dark prestige points per second.",
            cost: new Decimal("10"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Eclipse Shards",
            currencyInternalName: "eclipseShards",
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "#f5ff68"
                return look
            }
        },
        203: {
            title: "Eclipse Shard Upgrade III",
            unlocked() { return true},
            description: "Boost space pet XP gain by x1.2.",
            cost: new Decimal("14"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Eclipse Shards",
            currencyInternalName: "eclipseShards",
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "#f5ff68"
                return look
            }
        },
        204: {
            title: "Eclipse Shard Upgrade IV",
            unlocked() { return true},
            description: "Boost starmetal alloy gain based on eclipse shards.",
            cost: new Decimal("18"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Eclipse Shards",
            currencyInternalName: "eclipseShards",
            effect() {
                return player.sma.eclipseShards.pow(0.5).div(20).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "#f5ff68"
                return look
            }
        },
        205: {
            title: "Eclipse Shard Upgrade V",
            unlocked() { return true},
            description: "Always generate 1% of dark generators per second.",
            cost: new Decimal("24"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Eclipse Shards",
            currencyInternalName: "eclipseShards",
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "#f5ff68"
                return look
            }
        },
        //skills
        221: {
            title: "Second Skill",
            unlocked() { return hasUpgrade("sma", 201) && hasUpgrade("sma", 202) && hasUpgrade("sma", 203)},
            description: "Unlock Eclipse's second skill.",
            cost: new Decimal("20"),
            currencyLocation() { return player.sma },
            currencyDisplayName: "Eclipse Shards",
            currencyInternalName: "eclipseShards",
            style() {
                let look = {width: "150px", color: "rgba(0,0,0,0.8)", borderColor: "rgba(0,0,0,0.8)", borderRadius: "15px", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.background = "#77bf5f" : !canAffordUpgrade(this.layer, this.id) ? look.background =  "#bf8f8f" : look.background = "#f5ff68"
                return look
            }
        },
        //Automatic starmetal resets
    },
    buyables: {
        11: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.starmetalAlloy},
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade("sma", 105) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Starmetal Booster I"
            },
            display() {
                return "which are boosting starmetal alloy gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " SMA"
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
            style: {width: '275px', height: '150px'}
        },
        12: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.sma.starmetalAlloy},
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.075).add(1) },
            unlocked() { return hasUpgrade("sma", 105) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Starmetal Booster II"
            },
            display() {
                return "which are boosting starmetal alloy growth rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " SMA"
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
            style: {width: '275px', height: '150px'}
        },
        13: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.starmetalAlloy},
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2).add(1).pow(1.5) },
            unlocked() { return hasUpgrade("sma", 105) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Radiation Softcap Extender"
            },
            display() {
                return "which are extending the radiation softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " SMA"
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
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.sma.starmetalAlloy},
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2).add(1).pow(2) },
            unlocked() { return hasUpgrade("sma", 105) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Singularity Dimension Booster"
            },
            display() {
                return "which are boosting all singularity dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " SMA"
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
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "ENTER": {
                buttonStyle() {return {color: "white", borderRadius: "10px"}},
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["clickable", 11],
                ]
            },
            "Starmetal Upgrades": {
                buttonStyle() {return {color: "white", borderRadius: "10px"}},
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["blank", "5px"],
                        ["row", [["upgrade", 10], ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
                            ["upgrade", 17], ["upgrade", 18]]],
                        ["blank", "5px"],
                    ], {width: "800px", background: "linear-gradient(120deg, #171708 0%, #130f05 25%, #17090b 50%, #150917, 75%, #091417 100%)", border: "3px solid #ccc", borderRadius: "15px"}],
                    ["blank", "20px"],
                    ["style-column", [
                        ["blank", "5px"],
                        ["style-row", [["upgrade", 101], ["upgrade", 102], ["upgrade", 103], ["upgrade", 104], ["upgrade", 105], ["upgrade", 106]], {maxWidth: "800px"}],
                        ["blank", "5px"],
                    ], {width: "800px", background: "linear-gradient(120deg, #b8bc45 0%, #987b28 25%, #bc4c5f 50%, #a94cbc, 75%, #4ca5bc 100%)", border: "3px solid #222", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]], {maxWidth: "1200px"}],
                ]
            },
            "Punchcards": {
                buttonStyle() {return {color: "white", borderRadius: "10px"}},
                unlocked() { return hasUpgrade("sma", 14) },
                embedLayer: 'pu',
            },
            "Auto Singularity": {
                buttonStyle() {return {color: "white", borderRadius: "10px"}},
                unlocked() { return hasUpgrade("sma", 104) },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                            ["row", [
                                ["raw-html", () => {return format(player.s.singularityPoints) + " SP"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "(+" + format(player.s.singularityPointsToGet) + ")"}, () => {
                                    let look = {fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}
                                    if (player.in.infinityPoints.gte(1e40)) {look.color = "white"} else {look.color = "gray"} 
                                    return look
                                }],
                            ]],
                        ], {width: "400px", height: "30px", backgroundColor: "#550000"}],
                        ["style-column", [
                            ["raw-html", () => {return player.sma.type ? "Auto-Crunch Time" : "Auto-Crunch Amount"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.sma.type ? formatTime(player.sma.time) + "/" + formatTime(player.sma.amount) + " until reset." : formatWhole(player.sma.amount) + " SP on reset."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "400px", height: "70px"}],
                        ["text-input", "input", {width: "350px", height: "50px", backgroundColor: "#220000", color: "white", fontSize: "32px", textAlign: "left", border: "0px", padding: "0px 25px"}],
                        ["style-column", [
                            ["row", [["clickable", 14], ["clickable", 15]]],
                            ["clickable", 13],
                        ], {width: "400px", height: "100px"}],
                    ], {width: "400px", height: "250px", backgroundColor: "#440000", border: "3px solid #ccc"}],
                ]
            },
            "Eclipse Shop": {
                buttonStyle() {return {color: "white", borderColor: "rgb(245, 255, 104)", borderRadius: "10px"}},
                unlocked() { return player.pet.levelables[501][0].gte(1) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.sma.eclipseShards) + "</h3> eclipse shards." }, { "color": "white", "font-size": "30px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["upgrade", 201] ,["upgrade", 202], ["upgrade", 203], ["upgrade", 204], ["upgrade", 205]]],
                    ["blank", "25px"],
                    ["row", [["upgrade", 221]]],
                ]
            },
        },
    }, 
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("s", 21)  }
})
