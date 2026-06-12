addLayer("car", {
    name: "Cards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>CA", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        cardPoints: [
            new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),
        ],
        cardPointsPerSecond: [
            new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),
        ],
        cardGenerators: new Decimal(0),
        cardGeneratorsToGet: new Decimal(0),

        cardShreds: new Decimal(0),
        cardShredsPerSecond: new Decimal(0),
        cardShredReq: new Decimal(1000),
        cardDrawAmount: new Decimal(0),
        
        cardsToGet: new Decimal(0),

        autoDraw: {
            toggle: false,
            timer: new Decimal(0),
            max: new Decimal(10),
        },
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(60deg, rgb(182, 0, 0) 0%, rgb(24, 24, 24) 50%, rgb(182, 0, 0) 100%)",
            "background-origin": "border-box",
            "border-color": "rgb(182, 0, 0)",
            "color": "white",
            borderRadius: "4px",
            transform: "translateX(50px)"
        }
    },
    tooltip: "Cards",
    color: "rgb(182, 0, 0)",
    branches: ["cbs",],
    update(delta) {
        player.car.cardGeneratorsToGet = player.za.chancePoints.pow(0.075).div(16).floor()
        player.car.cardGeneratorsToGet = player.car.cardGeneratorsToGet.mul(buyableEffect("sm", 114))

        player.car.cardShreds = player.car.cardShreds.add(player.car.cardShredsPerSecond.mul(delta))
        player.car.cardShredsPerSecond = player.car.cardGenerators.pow(2)
        player.car.cardShredsPerSecond = player.car.cardShredsPerSecond.mul(buyableEffect("car", 13))
        player.car.cardShredsPerSecond = player.car.cardShredsPerSecond.mul(buyableEffect("car", 23))
        player.car.cardShredsPerSecond = player.car.cardShredsPerSecond.mul(buyableEffect("car", 33))
        player.car.cardShredsPerSecond = player.car.cardShredsPerSecond.mul(buyableEffect("car", 43))

        player.car.cardShredReq = new Decimal(1000)
        if (player.car.cardDrawAmount.lte(50)) player.car.cardShredReq = player.car.cardShredReq.mul(player.car.cardDrawAmount.pow(4).add(1))
        if (player.car.cardDrawAmount.gte(50)) player.car.cardShredReq = player.car.cardShredReq.mul(player.car.cardDrawAmount.pow(5).add(1))

        player.car.cardsToGet = new Decimal(1)
        player.car.cardsToGet = player.car.cardsToGet.add(buyableEffect("car", 14))
        player.car.cardsToGet = player.car.cardsToGet.add(buyableEffect("car", 24))
        player.car.cardsToGet = player.car.cardsToGet.add(buyableEffect("car", 34))
        player.car.cardsToGet = player.car.cardsToGet.add(buyableEffect("car", 44))

        if (player.car.cardGenerators.gte(1)) {
            player.car.cardPointsPerSecond = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)] 
        } else {
            player.car.cardPointsPerSecond = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)] 
        }

        player.car.cardPointsPerSecond[0] = player.car.cardPointsPerSecond[0].mul(buyableEffect("car", 11))
        player.car.cardPointsPerSecond[1] = player.car.cardPointsPerSecond[1].mul(buyableEffect("car", 21))
        player.car.cardPointsPerSecond[2] = player.car.cardPointsPerSecond[2].mul(buyableEffect("car", 31))
        player.car.cardPointsPerSecond[3] = player.car.cardPointsPerSecond[3].mul(buyableEffect("car", 41))

        for (let i = 0; i < player.car.cardPoints.length; i++) {
            for (j = ((i + 1) * 100) + 1; j < ((i + 1) * 100) + 14; j++) {
                player.car.cardPointsPerSecond[i] = player.car.cardPointsPerSecond[i].mul(levelableEffect("car", j)[1])
            }
            player.car.cardPoints[i] = player.car.cardPoints[i].add(player.car.cardPointsPerSecond[i].mul(delta))
        }

        for (let i = 1; i < 5; i++)
        {
            for (let j = 1; j < 14; j++)
            {
                if (player.car.levelables[(i*100)+j][1].lt(0))
                {
                    player.car.levelables[(i*100)+j][1] = new Decimal(0)
                }
            }
        }

        if (player.car.cardShreds.lt(0))
        {
            player.car.cardShreds = new Decimal(0)
        }

        player.car.autoDraw.max = new Decimal(5)
        player.car.autoDraw.max = player.car.autoDraw.max.div(buyableEffect("car", 101))
        
        if (player.car.autoDraw.toggle && player.car.cardShreds.gte(player.car.cardShredReq)) player.car.autoDraw.timer = player.car.autoDraw.timer.add(delta)
        if (player.car.autoDraw.timer.gte(player.car.autoDraw.max))
        {
            player.car.autoDraw.timer = new Decimal(0)
            player.car.cardShreds = player.car.cardShreds.sub(player.car.cardShredReq)
            player.car.cardDrawAmount = player.car.cardDrawAmount.add(1)

            layers.car.cardDraw(); //tentative to change with multi draw
        }
    },
    cardReset() {
        //resets everything before unlocking cards except for check back shrine
        player.za.chancePoints = new Decimal(0)

        player.cf.coinsFlipped = new Decimal(0) 
        player.cf.heads = new Decimal(0)
        player.cf.tails = new Decimal(0)

        try {
            if (typeof window !== 'undefined' && !window.__cfInitDone) {
                // clear any leftover timeout id (might be present from a saved object)
                if (player.cf && player.cf._flipTimeoutId) {
                    try { clearTimeout(player.cf._flipTimeoutId) } catch (e) {}
                    player.cf._flipTimeoutId = null
                }

                // reset runtime flip state so the coin isn't mid-flip on a reload
                if (player.cf) {
                    player.cf.flipping = false
                    player.cf.flipTimer = new Decimal(0)
                    player.cf.coinHeads = true
                    player.cf._finalSide = null
                }

                window.__cfInitDone = true
            }
        } catch (e) { console.error("cf update init error:", e) }

        player.cf.buyables[11] = new Decimal(0)
        player.cf.buyables[12] = new Decimal(0)
        player.cf.buyables[13] = new Decimal(0)
        player.cf.buyables[14] = new Decimal(0)
        player.cf.buyables[21] = new Decimal(0)
        player.cf.buyables[22] = new Decimal(0)
        player.cf.buyables[23] = new Decimal(0)
        player.cf.buyables[24] = new Decimal(0)
        player.cf.buyables[31] = new Decimal(0)
        player.cf.buyables[32] = new Decimal(0)
        player.cf.buyables[33] = new Decimal(0)
        player.cf.buyables[34] = new Decimal(0)

        player.cf.autoFlip = false

        player.wof.wheelPoints = new Decimal(0)
        player.wof.wheelsSpinned = new Decimal(0)
        player.wof.buyables[11] = new Decimal(0)
        player.wof.buyables[12] = new Decimal(0)
        player.wof.buyables[13] = new Decimal(0)
        player.wof.buyables[14] = new Decimal(0)
        player.wof.buyables[15] = new Decimal(0)
        player.wof.autoSpin = false

        player.sm.spinAmount = new Decimal(0)
        player.sm.spinActive = false
        //chips
        player.sm.chips = [new Decimal(0), new Decimal(0), new Decimal(0)]

        player.sm.buyables[101] = new Decimal(0)
        player.sm.buyables[102] = new Decimal(0)
        player.sm.buyables[103] = new Decimal(0)
        player.sm.buyables[104] = new Decimal(0)
        player.sm.buyables[105] = new Decimal(0)
        player.sm.buyables[106] = new Decimal(0)
        player.sm.buyables[107] = new Decimal(0)
        player.sm.buyables[108] = new Decimal(0)
        if (!hasUpgrade("car", 14)) player.sm.buyables[109] = new Decimal(0)
        if (!hasUpgrade("car", 14)) player.sm.buyables[111] = new Decimal(0)
        player.sm.generateSpin = false

        player.car.cardDrawAmount = new Decimal(0)

        player.car.cardPoints = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        player.car.buyables[11] = new Decimal(0)
        player.car.buyables[12] = new Decimal(0)
        player.car.buyables[13] = new Decimal(0)
        player.car.buyables[14] = new Decimal(0)
        player.car.buyables[21] = new Decimal(0)
        player.car.buyables[22] = new Decimal(0)
        player.car.buyables[23] = new Decimal(0)
        player.car.buyables[24] = new Decimal(0)
        player.car.buyables[31] = new Decimal(0)
        player.car.buyables[32] = new Decimal(0)
        player.car.buyables[33] = new Decimal(0)
        player.car.buyables[34] = new Decimal(0)
        player.car.buyables[41] = new Decimal(0)
        player.car.buyables[42] = new Decimal(0)
        player.car.buyables[43] = new Decimal(0)
        player.car.buyables[44] = new Decimal(0)

        player.car.cardShreds = new Decimal(0)
    },
    clickables: {
        1: {
            title() {return "Level Up"},
            canClick() {return Decimal.lt(getLevelableAmount("car", layers.car.levelables.index), layers.car.levelables[layers.car.levelables.index].levelLimit()) && getLevelableXP("car", layers.car.levelables.index).gte(tmp.car.levelables[layers.car.levelables.index].xpReq) && layers.car.levelables.index != 0},
            unlocked() {return true},
            onClick() {
                addLevelableXP("car", layers.car.levelables.index, tmp.car.levelables[layers.car.levelables.index].xpReq.neg())
                addLevelables("car", layers.car.levelables.index, 1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "425px", minHeight: "40px", color: "white", fontSize: "12px", borderRadius: "0px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#384166"
                return look
            }
        },
        11: {
            title() { return "<h3>Reset all previous dice space content (except for check back shrine) for card generators." },
            canClick() { return player.car.cardGeneratorsToGet.gte(1)},
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < 12; i++){
                    layers.car.cardReset();
                }
                player.car.cardGenerators = player.car.cardGenerators.add(player.car.cardGeneratorsToGet)
            },
            style: { width: '400px', "min-height": '100px', color: "white", backgroundImage: "linear-gradient(180deg, #990909 0%, rgb(94, 6, 6) 50%, #990909 100%)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px" },
        },
        12: {
            title() { return "<h3>Draw a card</h3><br><h3>Cost: " + format(player.car.cardShredReq) + " Card Shreds</h3>" },
            canClick() { return player.car.cardShreds.gte(player.car.cardShredReq) },
            tooltip() { return "Cost is reset on card reset." },
            unlocked() { return true },
            onClick() {
                player.car.cardShreds = player.car.cardShreds.sub(player.car.cardShredReq)
                player.car.cardDrawAmount = player.car.cardDrawAmount.add(1)

                layers.car.cardDraw(); //tentative to change with multi draw
            },
            style: { width: '400px', "min-height": '100px', color: "white", backgroundImage: "linear-gradient(180deg, #990909 0%, rgb(94, 6, 6) 50%, #990909 100%)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px" },
        },
        21: {
            title() { return player.car.autoDraw.toggle ? "Autodraw: ON" : "Autodraw: OFF" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (!player.car.autoDraw.toggle) player.car.autoDraw.toggle = true
                else player.car.autoDraw.toggle = false
            },
            style() { 
                return { width: '250px', "min-height": '75px', borderRadius: "15px 15px 15px 15px", border: "3px solid rgb(94, 6, 6)", backgroundImage: "linear-gradient(180deg, #990909 0%, rgb(94, 6, 6) 50%, #990909 100%)", color: "white"}
            },
        },
    },
    cardDraw()
    {
        let suit = getRandomInt(4) + 1
        let rank = getRandomInt(13) + 1
        let imgSuit = ""
        let imgRank = ""
        if (suit == 1) imgSuit = "Spade"
        if (suit == 2) imgSuit = "Club"
        if (suit == 3) imgSuit = "Diamond"
        if (suit == 4) imgSuit = "Heart"

        if (rank <= 10) imgRank = rank
        if (rank == 11) imgRank = "J"
        if (rank == 12) imgRank = "Q"
        if (rank == 13) imgRank = "K"

        let xOffset = getRandomInt(300)
        if (!player.car.autoDraw.toggle) makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {x: 1100 + xOffset, y: 350, text: "<img src='resources/cards/" + imgSuit + imgRank + ".png'style='width:75px;height:125px;margin:-35px;'></img>"})

        let levelableID = ""
        if (rank < 10)
        {
            levelableID = parseInt(suit + "0" + rank)
        } else
        {
            levelableID = parseInt(suit + "" + rank)
        }
        player.car.levelables[levelableID][1] = player.car.levelables[levelableID][1].add(player.car.cardsToGet)
    },
    levelables: {
        0: {
            image() { return "resources/Punchcards/lockedPunchcard.png"},
            title() { return "No Card Selected." },
            levelLimit() { return new Decimal(99) },
            description() { return "" },
            canSelect: false,
            currency() { return getLevelableXP(this.layer, this.id) },
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() { return {width: '80px', height: '152px', backgroundColor: '#222222'} } 
        },

        //spades
        101: {
            image() {return this.canClick() ? "resources/cards/Spade1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Ace of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character HP.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.9)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        102: {
            image() {return this.canClick() ? "resources/cards/Spade2.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "2 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0].mul(100)) + "% to base HP mult.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.06)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.1).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        103: {
            image() {return this.canClick() ? "resources/cards/Spade3.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "3 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character DMG.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        104: {
            image() {return this.canClick() ? "resources/cards/Spade4.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "4 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0].mul(100)) + "% to base DMG mult.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.06)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.3).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        105: {
            image() {return this.canClick() ? "resources/cards/Spade5.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "5 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character RGN.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.005)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.4).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        106: {
            image() {return this.canClick() ? "resources/cards/Spade6.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "6 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character AGI.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.5).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        107: {
            image() {return this.canClick() ? "resources/cards/Spade7.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "7 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0].mul(100)) + "% to base AGI mult.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.04)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.6).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        108: {
            image() {return this.canClick() ? "resources/cards/Spade8.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "8 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character DEF.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.7).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        109: {
            image() {return this.canClick() ? "resources/cards/Spade9.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "9 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character LUCK.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.8).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        110: {
            image() {return this.canClick() ? "resources/cards/Spade10.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "10 of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character MND.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.9).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        111: {
            image() {return this.canClick() ? "resources/cards/SpadeJ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Jack of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + format(this.effect()[0]) + " to all character POT.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        112: {
            image() {return this.canClick() ? "resources/cards/SpadeQ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Queen of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "+" + formatWhole(this.effect()[0]) + " to max skill points. [FLOORED]<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.2).floor()
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3.1).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        113: {
            image() {return this.canClick() ? "resources/cards/SpadeK.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "King of Spades"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "-" + format(this.effect()[0].mul(100)) + "% to combo scaling.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to spade points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.0003)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3.2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        //clubs
        201: {
            image() {return this.canClick() ? "resources/cards/Club1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Ace of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to chance points.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(4).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        202: {
            image() {return this.canClick() ? "resources/cards/Club2.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "2 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to chance point softcap start.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(4).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.1).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        203: {
            image() {return this.canClick() ? "resources/cards/Club3.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "3 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to chance point softcap effect.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = Decimal.div(1, getLevelableAmount(this.layer, this.id).pow(0.3).add(1))
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        204: {
            image() {return this.canClick() ? "resources/cards/Club4.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "4 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to heads.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(3).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.3).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        205: {
            image() {return this.canClick() ? "resources/cards/Club5.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "5 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to heads softcap effect.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = Decimal.div(1, getLevelableAmount(this.layer, this.id).pow(0.25).add(1))
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.4).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        206: {
            image() {return this.canClick() ? "resources/cards/Club6.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "6 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to tails.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(3).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.3).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        207: {
            image() {return this.canClick() ? "resources/cards/Club7.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "7 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to tails softcap effect.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = Decimal.div(1, getLevelableAmount(this.layer, this.id).pow(0.25).add(1))
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.4).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        208: {
            image() {return this.canClick() ? "resources/cards/Club8.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "8 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to wheel points.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(1.75).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.7).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        209: {
            image() {return this.canClick() ? "resources/cards/Club9.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "9 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to wheel spin effectiveness.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.625).mul(0.1).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.8).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        210: {
            image() {return this.canClick() ? "resources/cards/Club10.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "10 of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to slot spin effectiveness.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.1).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.9).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        211: {
            image() {return this.canClick() ? "resources/cards/ClubJ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Jack of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to red chips.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(3).pow(0.65).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        212: {
            image() {return this.canClick() ? "resources/cards/ClubQ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Queen of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to blue chips.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(2).pow(0.65).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3.1).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        213: {
            image() {return this.canClick() ? "resources/cards/ClubK.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "King of Clubs"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to yellow chips.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to club points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.65).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3.2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        //diamonds
        301: {
            image() {return this.canClick() ? "resources/cards/Diamond1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Ace of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to pre-otf multiplier.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.75).mul(0.05).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        302: {
            image() {return this.canClick() ? "resources/cards/Diamond2.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "2 of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to post-otf multiplier.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.05).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.1).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        303: {
            image() {return this.canClick() ? "resources/cards/Diamond3.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "3 of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to all pollinator effects.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.65).mul(0.5).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        304: {
            image() {return this.canClick() ? "resources/cards/Diamond4.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "4 of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to hex points.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).div(40).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.3).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        305: {
            image() {return this.canClick() ? "resources/cards/Diamond5.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "5 of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0], 3) + " to hex power.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).div(50).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.4).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        306: {
            image() {return this.canClick() ? "resources/cards/Diamond6.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "6 of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to antimatter effect.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(1.15).mul(0.8).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.5).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        307: {
            image() {return this.canClick() ? "resources/cards/Diamond7.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "7 of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + formatSimple(this.effect()[0], 3) + " to infinities.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.6).div(200).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.6).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        308: {
            image() {return this.canClick() ? "resources/cards/Diamond8.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "8 of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to replicanti point hardcap.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).mul(0.5).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.7).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        309: {
            image() {return this.canClick() ? "resources/cards/Diamond9.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "9 of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + format(this.effect()[0]) + " to singularity points.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.2).mul(0.1).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.8).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        310: {
            image() {return this.canClick() ? "resources/cards/Diamond10.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "10 of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to first three emotions.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(4).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.9).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        311: {
            image() {return this.canClick() ? "resources/cards/DiamondJ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Jack of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + formatSimple(this.effect()[0], 3) + " to stars.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.5).div(100).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        312: {
            image() {return this.canClick() ? "resources/cards/DiamondQ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Queen of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "^" + formatSimple(this.effect()[0], 3) + " to bees.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.7).div(100).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3.1).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        313: {
            image() {return this.canClick() ? "resources/cards/DiamondK.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "King of Diamonds"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to doom softcap start.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to diamond points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = Decimal.pow("1e100000", getLevelableAmount(this.layer, this.id).pow(0.6))
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3.2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },

        //heart
        401: {
            image() {return this.canClick() ? "resources/cards/Heart1.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Ace of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to dark celestial points.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(4).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        402: {
            image() {return this.canClick() ? "resources/cards/Heart2.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "2 of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to dark rank, tier, and tetr points.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(3).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.1).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
                403: {
            image() {return this.canClick() ? "resources/cards/Heart3.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "3 of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to dark prestige points.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(3.5).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
                        404: {
            image() {return this.canClick() ? "resources/cards/Heart4.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "4 of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to generators.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(2).pow(2.5).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.3).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        405: {
            image() {return this.canClick() ? "resources/cards/Heart5.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "5 of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "/" + format(this.effect()[0]) + " to booster requirement.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(3).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.4).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        406: {
            image() {return this.canClick() ? "resources/cards/Heart6.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "6 of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to dark grass value and capacity.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(2).pow(2).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.5).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        407: {
            image() {return this.canClick() ? "resources/cards/Heart7.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "7 of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to normality.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(1.5).pow(2.5).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.6).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        408: {
            image() {return this.canClick() ? "resources/cards/Heart8.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "8 of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to space energy.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(2).pow(1.5).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.7).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        409: {
            image() {return this.canClick() ? "resources/cards/Heart9.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "9 of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to clouds.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.8).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.8).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        410: {
            image() {return this.canClick() ? "resources/cards/Heart10.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "10 of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to SMA.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).mul(0.5).pow(1.1).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(2.9).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        411: {
            image() {return this.canClick() ? "resources/cards/HeartJ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Jack of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to eclipse shards.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.6).mul(0.2).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        412: {
            image() {return this.canClick() ? "resources/cards/HeartQ.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "Queen of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to blood.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.8).mul(0.3).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3.1).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
        413: {
            image() {return this.canClick() ? "resources/cards/HeartK.png" : "resources/Punchcards/lockedPunchcard.png"},
            title() {
                return "King of Hearts"
            },
            levelLimit() { return new Decimal(99) },
            description() {
                let str = [
                    "x" + format(this.effect()[0]) + " to space pet XP gain.<br>", //not implemented
                    "x" + format(this.effect()[1]) + " to heart points.",
                ]
                return str.join("")
            },
            effect() {
                let eff = [new Decimal(1), new Decimal(1)]
                eff[0] = getLevelableAmount(this.layer, this.id).pow(0.4).mul(0.5).add(1)
                eff[1] = Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).pow(0.7))
                return eff
            },
            // CLICK CODE
            unlocked: true,
            canSelect: true,
            canClick() {return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id, true)},
            onClick() {return layers[this.layer].levelables.index = this.id},
            // LEVEL CODE
            xpReq() {
                return getLevelableAmount(this.layer, this.id).add(1).pow(3.2).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            // STYLE CODE
            barStyle() { return {backgroundColor: "#1a3b0f"}},
            style() {
                let look = {width: "80px", height: "152px", borderColor: "black"}
                !this.canClick() ? look.backgroundColor = "#222222" : getLevelableTier(this.layer, this.id, true) ? look.backgroundColor = "#7f7f7f" : look.backgroundColor = "#3f3f3f"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid #aaa" : look.outline = "0px solid #aaa"
                return look
            }
        },
    },
    bars: {
        autoBar: {
            unlocked: true,
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.car.autoDraw.timer.div(player.car.autoDraw.max)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "rgb(182, 0, 0)"},
            textStyle: {fontSize: "14px"},
            display() {
                let str = format(player.car.autoDraw.timer) + "/" + format(player.car.autoDraw.max) + "s<br>+" + formatWhole(player.car.cardsToGet) + " cards on draw."
                return str
            },
        },
    },
    upgrades: {
        11: {
            title: "Well its not my fault you have bad rng :/",
            unlocked() { return player.cbs.shrineReactivated },
            description: "Always gain 25% of each chip on slot reset.",
            cost: new Decimal(1),
            currencyLocation() { return player.car },
            currencyDisplayName: "Card Generators",
            currencyInternalName: "cardGenerators",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0, 0, 0, 0.5)", borderRadius: "15px", margin: "2px", width: '150px', "min-height": '125px', },
        },    
        12: {
            title: "So lazy you can't even spin a wheel...",
            unlocked() { return player.cbs.shrineReactivated },
            description: "Gain 25% of wheel point mult as wheel points per second.",
            cost: new Decimal(10),
            currencyLocation() { return player.car },
            currencyDisplayName: "Card Generators",
            currencyInternalName: "cardGenerators",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0, 0, 0, 0.5)", borderRadius: "15px", margin: "2px", width: '150px', "min-height": '125px', },
        },  
        13: {
            title: "It seems like you've maximized laziness out here.",
            unlocked() { return player.cbs.shrineReactivated },
            description: "Gain 100% of heads and tails per second.",
            cost: new Decimal(100),
            currencyLocation() { return player.car },
            currencyDisplayName: "Card Generators",
            currencyInternalName: "cardGenerators",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0, 0, 0, 0.5)", borderRadius: "15px", margin: "2px", width: '150px', "min-height": '125px', },
        },  
        14: {
            title: "How can you do research with this stuff?",
            unlocked() { return player.cbs.shrineReactivated },
            description: "Unlock 3 new researches, and shard researches are kept on card reset.",
            cost: new Decimal(1000),
            currencyLocation() { return player.car },
            currencyDisplayName: "Card Generators",
            currencyInternalName: "cardGenerators",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0, 0, 0, 0.5)", borderRadius: "15px", margin: "2px", width: '150px', "min-height": '125px', },
        },  
        15: {
            title: "Just do that I guess",
            unlocked() { return player.cbs.shrineReactivated },
            description: "Boosts chance point gain based on card generators.",
            cost: new Decimal(10000),
            currencyLocation() { return player.car },
            currencyDisplayName: "Card Generators",
            currencyInternalName: "cardGenerators",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0, 0, 0, 0.5)", borderRadius: "15px", margin: "2px", width: '150px', "min-height": '125px', },
            effect() {
                return player.car.cardGenerators.pow(1.01).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        16: {
            title: "Okay this ones slightly justifiable",
            unlocked() { return player.cbs.shrineReactivated },
            description: "Gain 5% of each chip every second.",
            cost: new Decimal(100000),
            currencyLocation() { return player.car },
            currencyDisplayName: "Card Generators",
            currencyInternalName: "cardGenerators",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0, 0, 0, 0.5)", borderRadius: "15px", margin: "2px", width: '150px', "min-height": '125px', },
        },   
        17: {
            title: "So should this be full automation now?",
            unlocked() { return player.cbs.shrineReactivated },
            description: "Automatically purchase all pre-card non-shard researches and wheel buyables.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.car }, 
            currencyDisplayName: "Card Generators",
            currencyInternalName: "cardGenerators",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0, 0, 0, 0.5)", borderRadius: "15px", margin: "2px", width: '150px', "min-height": '125px', },
        },   
        18: {
            title: "Research upon research",
            unlocked() { return player.cbs.shrineReactivated },
            description: "Unlock 3 more researches.",
            cost: new Decimal(1e7),
            currencyLocation() { return player.car },
            currencyDisplayName: "Card Generators",
            currencyInternalName: "cardGenerators",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0, 0, 0, 0.5)", borderRadius: "15px", margin: "2px", width: '150px', "min-height": '125px', },
        },   
        19: {
            title: "The dungeon",
            unlocked() { return player.cbs.shrineReactivated },
            description: "Unlock Zar's dungeon.",
            cost: new Decimal(1e8),
            currencyLocation() { return player.car },
            currencyDisplayName: "Card Generators",
            currencyInternalName: "cardGenerators",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0, 0, 0, 0.5)", borderRadius: "15px", margin: "2px", width: '150px', "min-height": '125px', },
        },   
    },
    buyables: {
        11: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.car.cardPoints[0]},
            pay(amt) { player.car.cardPoints[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting spade point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Spade Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#9c9c9c", border: "5px solid #dadada", borderRadius: "5px 0px 0px 5px", borderRight: "0px", boxSizing: "border-box",}
        },
        12: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.car.cardPoints[0]},
            pay(amt) { player.car.cardPoints[0] = this.currency().sub(amt) },
            effect(x) { return player.car.cardPoints[0].pow(0.45).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.3).div(1.25)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting chance point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (affected by Spade Points)\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Spade Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#9c9c9c", border: "5px solid #dadada", borderRadius: "0px", boxSizing: "border-box", borderRight: "0px",}
        },
        13: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.car.cardPoints[0]},
            pay(amt) { player.car.cardPoints[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting card shred gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Spade Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#9c9c9c", border: "5px solid #dadada", borderRadius: "0px", boxSizing: "border-box",borderRight: "0px",}
        },
        14: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.car.cardPoints[0]},
            pay(amt) { player.car.cardPoints[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " to base card draw amount.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Spade Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#9c9c9c", border: "5px solid #dadada", borderRadius: "0px 5px 5px 0px", boxSizing: "border-box",}
        },
        //club
        21: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.car.cardPoints[1]},
            pay(amt) { player.car.cardPoints[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting club point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Club Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#9c9c9c", border: "5px solid #dadada", borderRadius: "5px 0px 0px 5px", boxSizing: "border-box",borderRight: "0px",}
        },
        22: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.car.cardPoints[1]},
            pay(amt) { player.car.cardPoints[1] = this.currency().sub(amt) },
            effect(x) { return player.car.cardPoints[1].pow(0.45).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.25).div(2)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting head and tails gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (affected by Club Points)\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Club Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#9c9c9c", border: "5px solid #dadada", borderRadius: "0px", boxSizing: "border-box",borderRight: "0px",}
        },
        23: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.car.cardPoints[1]},
            pay(amt) { player.car.cardPoints[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting card shred gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Club Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#9c9c9c", border: "5px solid #dadada", borderRadius: "0px", boxSizing: "border-box", borderRight: "0px",}
        },
        24: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.car.cardPoints[1]},
            pay(amt) { player.car.cardPoints[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " to base card draw amount.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Club Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#9c9c9c", border: "5px solid #dadada", borderRadius: "0px 5px 5px 0px", boxSizing: "border-box",}
        },
        //diamond
        31: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.car.cardPoints[2]},
            pay(amt) { player.car.cardPoints[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting diamond point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Diamond Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#f18080", border: "5px solid #ff3333",  borderRadius: "5px 0px 0px 5px", boxSizing: "border-box",borderRight: "0px",}
        },
        32: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.car.cardPoints[2]},
            pay(amt) { player.car.cardPoints[2] = this.currency().sub(amt) },
            effect(x) { return player.car.cardPoints[2].pow(0.35).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.2).div(3)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting wheel point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (affected by Diamond Points)\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Diamond Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#f18080", border: "5px solid #ff3333", borderRadius: "0px", boxSizing: "border-box",borderRight: "0px",}
        },
        33: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.car.cardPoints[2]},
            pay(amt) { player.car.cardPoints[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting card shred gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Diamond Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#f18080", border: "5px solid #ff3333", borderRadius: "0px", boxSizing: "border-box",borderRight: "0px",}
        },
        34: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.car.cardPoints[2]},
            pay(amt) { player.car.cardPoints[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " to base card draw amount.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Diamond Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#f18080", border: "5px solid #ff3333", borderRadius: "0px 5px 5px 0px", boxSizing: "border-box",}
        },
        //heart
        41: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.car.cardPoints[3]},
            pay(amt) { player.car.cardPoints[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting heart point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Heart Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#f18080", border: "5px solid #ff3333", borderRadius: "5px 0px 0px 5px", boxSizing: "border-box",borderRight: "0px",}
        },
        42: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.car.cardPoints[3]},
            pay(amt) { player.car.cardPoints[3] = this.currency().sub(amt) },
            effect(x) { return player.car.cardPoints[3].pow(0.3).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.2).div(6)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting all chip gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (affected by Heart Points)\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Heart Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#f18080", border: "5px solid #ff3333", borderRadius: "0px", boxSizing: "border-box",borderRight: "0px",}
        },
        43: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.car.cardPoints[3]},
            pay(amt) { player.car.cardPoints[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting card shred gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Heart Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#f18080", border: "5px solid #ff3333", borderRadius: "0px", boxSizing: "border-box",borderRight: "0px",}
        },
        44: {
            costBase() { return new Decimal(1e5) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.car.cardPoints[3]},
            pay(amt) { player.car.cardPoints[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " to base card draw amount.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Heart Points"
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
            style: {width: '193px', height: '142px', color: "black", background: "#f18080", border: "5px solid #ff3333", borderRadius: "0px 5px 5px 0px", boxSizing: "border-box",}
        },
        101: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.car.cardGenerators },
            pay(amt) { player.car.cardGenerators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Auto-Draw Req Divider"
            },
            display() {
                return 'which are dividing auto-draw time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Card Generators'
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
            style: { width: '275px', height: '150px', border: "3px solid rgb(94, 6, 6)", backgroundImage: "linear-gradient(180deg, #990909 0%, rgb(94, 6, 6) 50%, #990909 100%)", color: "white" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                    ["blank", "25px"],
                    ["style-column", [
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.car.cardGenerators) + "</h3> card generators. (+" + formatWhole(player.car.cardGeneratorsToGet) + ")" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["clickable", 11], 
                    ]],
                    ["row", [ ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 104], ]],
                    ["style-column", [
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.car.cardShreds) + "</h3> card shreds. (+" + formatWhole(player.car.cardShredsPerSecond) + "/s)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "+" + formatWhole(player.car.cardsToGet) + " cards on draw." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["clickable", 12],
                    ]],
                    ], {width: "1100px", height: "250px", border: "3px solid rgb(68, 0, 0)", borderRadius: "10px 10px 10px 10px", background: "linear-gradient(180deg, #9e3b3b 0%, rgb(97, 44, 44) 50%, #9e3b3b 100%)"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Upgrades" }, { "color": "white", "font-size": "24px", "font-family": "monospace",}],
                    ["blank", "25px"],
                    ["style-row", [
                            ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15],
                    ],],
                    ["style-row", [
                            ["upgrade", 16], ["upgrade", 17], ["upgrade", 18], ["upgrade", 19],
                    ],],
                ],         
                            
            },
            "Collection": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["clickable", 1],
                            ]],
                        ], {width: "550px", height: "175px", borderLeft: "3px solid white", borderRight: "3px solid white"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", () => {return "♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠ ♠"}, {color: "#1f1f1f", fontSize: "50px", fontFamily: "monospace"}],
                            ], {width: "1185px", height: "50px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}],
                            ["style-row", [
                                ["levelable", 101], ["levelable", 102], ["levelable", 103], ["levelable", 104], ["levelable", 105],
                                ["levelable", 106], ["levelable", 107], ["levelable", 108], ["levelable", 109], ["levelable", 110],
                                ["levelable", 111], ["levelable", 112], ["levelable", 113],

                            ], {width: "1175px", height: "152px", backgroundColor: "#303030", padding: "5px"}],

                            ["style-column", [
                                ["raw-html", "♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣ ♣", {color: "#1f1f1f", fontSize: "50px", fontFamily: "monospace"}],
                            ], {width: "1185px", height: "50px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}],
                            ["style-row", [
                                ["levelable", 201], ["levelable", 202], ["levelable", 203], ["levelable", 204], ["levelable", 205],
                                ["levelable", 206], ["levelable", 207], ["levelable", 208], ["levelable", 209], ["levelable", 210],
                                ["levelable", 211], ["levelable", 212], ["levelable", 213],
                            ], () => {return {width: "1175px", height: "152px", backgroundColor: "#303030", padding: "5px"}}],

                            ["style-column", [
                                ["raw-html", "♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦", {color: "#ff3333", fontSize: "50px", fontFamily: "monospace"}],
                            ], () => {return {width: "1185px", height: "50px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}}],
                            ["style-row", [
                                ["levelable", 301], ["levelable", 302], ["levelable", 303], ["levelable", 304], ["levelable", 305],
                                ["levelable", 306], ["levelable", 307], ["levelable", 308], ["levelable", 309], ["levelable", 310],
                                ["levelable", 311], ["levelable", 312], ["levelable", 313],
                            ], () => {return {width: "1175px", height: "152px", backgroundColor: "#490c0c", padding: "5px"}}],
                            ["style-column", [
                                ["raw-html", "♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥", {color: "#ff3333", fontSize: "50px", fontFamily: "monospace"}],
                            ], () => {return {width: "1185px", height: "50px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}}],
                            ["style-row", [
                                ["levelable", 401], ["levelable", 402], ["levelable", 403], ["levelable", 404], ["levelable", 405],
                                ["levelable", 406], ["levelable", 407], ["levelable", 408], ["levelable", 409], ["levelable", 410],
                                ["levelable", 411], ["levelable", 412], ["levelable", 413],
                            ], () => {return{width: "1175px", height: "152px", backgroundColor: "#490c0c", padding: "5px"}}],
                        ], {width: "1200px", height: "522px", borderTop: "3px solid white"}],
                    ], {width: "1200px", height: "700px", border: "3px solid white", backgroundColor: "#1c2033"}],
                ]
            },
            "Suit Points": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "12.5px"],
                    ["raw-html", "All suit points and buyables are reset on card reset.", {color: "#ff3333", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "12.5px"],
                    ["style-column", [
                            ["style-column", [
                                ["raw-html", () => {return "You have " + format(player.car.cardPoints[0]) + " spade points (+" + format(player.car.cardPointsPerSecond[0]) + "/s)"}, {color: "#1f1f1f", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "785px", height: "30px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}],
                            ["style-row", [

                            ["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                            ], {width: "775px", height: "135px", backgroundColor: "#303030", padding: "5px"}],

                            ["style-column", [
                                ["raw-html", () => {return "You have " + format(player.car.cardPoints[1]) + " club points (+" + format(player.car.cardPointsPerSecond[1]) + "/s)"}, {color: "#1f1f1f", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "785px", height: "30px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}],
                            ["style-row", [
                            ["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24],

                            ], () => {return {width: "775px", height: "135px", backgroundColor: "#303030", padding: "5px"}}],

                            ["style-column", [
                                ["raw-html", () => {return "You have " + format(player.car.cardPoints[2]) + " diamond points (+" + format(player.car.cardPointsPerSecond[2]) + "/s)"}, {color: "#ff3333", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => {return {width: "785px", height: "30px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}}],
                            ["style-row", [
                            ["ex-buyable", 31], ["ex-buyable", 32], ["ex-buyable", 33], ["ex-buyable", 34],

                            ], () => {return {width: "775px", height: "135px", backgroundColor: "#490c0c", padding: "5px"}}],
                            ["style-column", [
                                ["raw-html", () => {return "You have " + format(player.car.cardPoints[3]) + " heart points (+" + format(player.car.cardPointsPerSecond[3]) + "/s)"}, {color: "#ff3333", fontSize: "20px", fontFamily: "monospace"}],

                            ], () => {return {width: "785px", height: "30px", backgroundColor: "#dadada", borderTop: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}}],
                            ["style-row", [
                            ["ex-buyable", 41], ["ex-buyable", 42], ["ex-buyable", 43], ["ex-buyable", 44],

                            ], () => {return{width: "775px", height: "135px", backgroundColor: "#490c0c", padding: "5px"}}],
                        ], {width: "785px", height: "722px", border: "3px solid white"}],
                ]
            },
            "Auto Card Draw": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.zarDungeon.zarDefeated },
                content: [
                    ["blank", "25px"],
                    ["bar", "autoBar"],
                    ["blank", "25px"],
                    ["clickable", 21], 
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.car.cardGenerators) + "</h3> card generators." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["ex-buyable", 101],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Such a small tab :(" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 21) && !player.sma.inStarmetalChallenge}
})
