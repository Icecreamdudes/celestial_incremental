addLayer("zd", {
    name: "Zar's Dungeon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>ZD", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        zarChips: new Decimal(0),
        zarChipsToGet: new Decimal(1),

        deck: [            "Club1", "Club2", "Club3", "Club4", "Club5", "Club6", "Club7", "Club8", "Club9", "Club10", "ClubJ", "ClubQ", "ClubK",
            "Heart1", "Heart2", "Heart3", "Heart4", "Heart5", "Heart6", "Heart7", "Heart8", "Heart9", "Heart10", "HeartJ", "HeartQ", "HeartK",
            "Diamond1", "Diamond2", "Diamond3", "Diamond4", "Diamond5", "Diamond6", "Diamond7", "Diamond8", "Diamond9", "Diamond10", "DiamondJ", "DiamondQ", "DiamondK",
            "Spade1", "Spade2", "Spade3", "Spade4", "Spade5", "Spade6", "Spade7", "Spade8", "Spade9", "Spade10", "SpadeJ", "SpadeQ", "SpadeK",],

        dealerScore: new Decimal(0),
        playerScore: new Decimal(0),

        dealerHand: [],
        playerHand: [],

        dealerHandImages: [],
        playerHandImages: [],

        gameOver: false,
        gameCost: new Decimal(25),

        //dungeon
        pips: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, #ddddddff 0%, #8d8d8dff 100%)",
            "background-origin": "border-box",
            "border-color": "#474747ff",
            "color": "#0e0e0eff",
            borderRadius: "4px",
        }
    },
    tooltip: "Zar's Dungeon",
    color: "#ddddddff",
    branches: ["car"],
    update(delta) {
        // keep scores in sync each tick
        layers.zd.calculateScore();


        // match up to images
        player.zd.dealerHandImages = player.zd.dealerHand.map(c => `<img src='resources/cards/${c}.png'style='width:70px;height:125px;margin:-20px;'></img>`)
        player.zd.playerHandImages = player.zd.playerHand.map(c => `<img src='resources/cards/${c}.png'style='width:70px;height:125px;margin:-20px;'></img>`)

        if (player.zd.playerScore.gt(21))
        {
            layers.zd.endGame('dealer')
        } else if (player.zd.dealerScore.eq(player.zd.playerScore))
        {
           // layers.zd.endGame('push')
        } else if (player.zd.playerScore.eq(21))
        {
            layers.zd.endGame('player')
        }

        if (player.zd.dealerScore.gt(21))
        {
            layers.zd.endGame('player')
        } else if (player.zd.dealerScore.eq(21))
        {
            layers.zd.endGame('dealer')
        }

        player.zd.gameCost = new Decimal(25)
        player.zd.gameCost = player.zd.gameCost.mul(player.zd.zarChips.add(1).pow(0.35)).floor()
        player.zd.gameCost = player.zd.gameCost.div(buyableEffect("zd", 18))

        player.zd.zarChipsToGet = new Decimal(1)
        player.zd.zarChipsToGet = player.zd.zarChipsToGet.add(buyableEffect("zd", 15))
        player.zd.zarChipsToGet = player.zd.zarChipsToGet.mul(levelableEffect("pu", 402)[1])

        player.zd.zarChipsToGet = player.zd.zarChipsToGet.mul(buyableEffect("zd", 17)).floor()

        if (player.bh.currentStage == "zarDungeon" && player.tab == "zd")
        {
            player.tab = "bh"
        }
    },
    startGame() {
        player.zd.deck = [
            "Club1", "Club2", "Club3", "Club4", "Club5", "Club6", "Club7", "Club8", "Club9", "Club10", "ClubJ", "ClubQ", "ClubK",
            "Heart1", "Heart2", "Heart3", "Heart4", "Heart5", "Heart6", "Heart7", "Heart8", "Heart9", "Heart10", "HeartJ", "HeartQ", "HeartK",
            "Diamond1", "Diamond2", "Diamond3", "Diamond4", "Diamond5", "Diamond6", "Diamond7", "Diamond8", "Diamond9", "Diamond10", "DiamondJ", "DiamondQ", "DiamondK",
            "Spade1", "Spade2", "Spade3", "Spade4", "Spade5", "Spade6", "Spade7", "Spade8", "Spade9", "Spade10", "SpadeJ", "SpadeQ", "SpadeK",
        ]
        shuffle(player.zd.deck)

        player.zd.dealerHand = []
        player.zd.playerHand = []

        player.zd.dealerScore = new Decimal(0)
        player.zd.playerScore = new Decimal(0)

        for (let i = 0; i < 2; i++)
        {
            let card = player.zd.deck.pop();
            player.zd.playerHand.push(card);
        }
        let card2 = player.zd.deck.pop();
        player.zd.dealerHand.push(card2);
    },
    calculateScore() {
        // helpers for card parsing
        function cardRank(card) {
            if (!card || typeof card !== 'string') return '';
            return card.replace(/^(Club|Heart|Diamond|Spade)/, '');
        }
        function cardValueSingle(card) {
            const r = cardRank(card);
            if (!r) return 0;
            if (r === 'J' || r === 'Q' || r === 'K') return 10;
            if (r === '1') return 11; // Ace initially 11
            const n = parseInt(r, 10);
            return isNaN(n) ? 0 : n;
        }
        function handTotal(hand) {
            if (!Array.isArray(hand)) return 0;
            let total = 0;
            let aces = 0;
            for (const c of hand) {
                const v = cardValueSingle(c);
                if (v === 11) aces++;
                total += v;
            }
            while (total > 21 && aces > 0) {
                total -= 10;
                aces--;
            }
            return total;
        }

        // compute dealer score
        const dealerHand = player.zd.dealerHand || [];
        const dealerTotal = handTotal(dealerHand);
        player.zd.dealerScore = new Decimal(dealerTotal);

        // compute player score (handle split hands)
        const ph = player.zd.playerHand || [];
        if (ph.length > 0 && Array.isArray(ph[0])) {
            // split: store array of Decimals
            player.zd.playerScore = ph.map(h => new Decimal(handTotal(h)));
        } else {
            player.zd.playerScore = new Decimal(handTotal(ph));
        }
    },
    endGame(winner) {
        if (!player.zd.gameOver)
        {
            if (winner == 'dealer') {
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 1000, y: 450, text: "You lost..."})
            } else if (winner == 'player') {
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.zd.gameCost)

                let random = Math.random()
                if (random < buyableEffect("zd", 16)) 
                {
                    player.zd.zarChips = player.zd.zarChips.add(player.zd.zarChipsToGet.mul(3))
                    makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 1000, y: 450, text: "[TRIPLE] You win!<br><h5>Evolution shards returned."})
                }
                else 
                {
                    player.zd.zarChips = player.zd.zarChips.add(player.zd.zarChipsToGet)
                    makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 1000, y: 450, text: "You win!<br><h5>Evolution shards returned."})
                }
            } else if (winner == 'push') {
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 1000, y: 450, text: "It's a tie!<br><h5>Evolution shards returned."})
                player.cb.evolutionShards = player.cb.evolutionShards.add(player.zd.gameCost)
            }
        }

        player.zd.gameOver = true
    },
    
    clickables: {
        11: {
            title() { return "<h3>Hit" },
            canClick() { return !player.zd.gameOver },
            unlocked() { return true },
            onClick() {
                let card = player.zd.deck.pop();
                player.zd.playerHand.push(card);
            },
            style: { width: '100px', "min-height": '100px', color: "black", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px" },
        },      
        12: {
            title() { return "<h3>Stand" },
            canClick() { return !player.zd.gameOver },
            unlocked() { return true },
            onClick() {
                const deck = player.zd.deck || [];
                const dealer = player.zd.dealerHand || [];
                function cardRank(card) { if (!card) return ''; return card.replace(/^(Club|Heart|Diamond|Spade)/, ''); }
                function cardValueSingle(card) { const r = cardRank(card); if (!r) return 0; if (r==='J'||r==='Q'||r==='K') return 10; if (r==='1') return 11; const n=parseInt(r,10); return isNaN(n)?0:n; }
                function handTotal(hand) { let total=0, aces=0; for(const c of hand){ const v=cardValueSingle(c); if(v===11) aces++; total+=v;} while(total>21 && aces>0){ total-=10; aces--; } return total; }

                // Draw until dealer surpasses the player's score or reaches 21/busts
                const playerTotal = (player.zd.playerScore && player.zd.playerScore.toNumber) ? player.zd.playerScore.toNumber() : Number(player.zd.playerScore);
                while (deck.length > 0) {
                    const dcard = deck.pop();
                    if (!dcard) break;
                    dealer.push(dcard);
                    const dTotal = handTotal(dealer);
                    if (dTotal > playerTotal) break;
                    if (dTotal >= 21) break;
                }

                player.zd.dealerHand = dealer;
                player.zd.dealerScore = new Decimal(handTotal(dealer));
                player.zd.deck = deck;

                if (player.zd.dealerScore.gt(21))
                {
                    layers.zd.endGame('player')
                }   else if (player.zd.dealerScore.gt(player.zd.playerScore)) {
                    layers.zd.endGame('dealer')
                }
            },
            style: { width: '100px', "min-height": '100px', color: "black", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px" },
        },    
        13: {
            title() { return "<br><h3>Start Game</h3><br><h4>Cost: " + formatWhole(player.zd.gameCost) + " Evo Shards" },
            tooltip() { return "You have " + formatWhole(player.cb.evolutionShards) + " evolution shards." },
            canClick() { return player.zd.gameOver && player.cb.evolutionShards.gte(player.zd.gameCost) },
            unlocked() { return true },
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.zd.gameCost)

                layers.zd.startGame();
                player.zd.gameOver = false
            },
            style: { width: '200px', "min-height": '100px', color: "black", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px" },
        },   
        //cards
        101: {
            title() { return player.zd.playerHandImages[0] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
        102: {
            title() { return player.zd.playerHandImages[1] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
        103: {
            title() { return player.zd.playerHandImages[2] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },    
        104: {
            title() { return player.zd.playerHandImages[3] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
        105: {
            title() { return player.zd.playerHandImages[4] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },    
        106: {
            title() { return player.zd.playerHandImages[5] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
        107: {
            title() { return player.zd.playerHandImages[6] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },    
        108: {
            title() { return player.zd.playerHandImages[7] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
        201: {
            title() { return player.zd.dealerHandImages[0] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
        202: {
            title() { return player.zd.dealerHandImages[1] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
        203: {
            title() { return player.zd.dealerHandImages[2] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },    
        204: {
            title() { return player.zd.dealerHandImages[3] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
        205: {
            title() { return player.zd.dealerHandImages[4] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },    
        206: {
            title() { return player.zd.dealerHandImages[5] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
        207: {
            title() { return player.zd.dealerHandImages[6] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },    
        208: {
            title() { return player.zd.dealerHandImages[7] },
            canClick() { return false },
            unlocked() { return true },
            onClick() {

            },
            style: { width: '70px', "min-height": '120px', color: "black", border: "3px solid rgba(0,0,0,0.5)", },
        },
    },
    bars: {},
    upgrades: {
        11: {
            title: "New Ally",
            unlocked: true,
            description: "Unlocks Dice Five as a party member.",
            cost: new Decimal(20),
            currencyLocation() { return player.zd },
            currencyDisplayName: "Pips",
            currencyInternalName: "pips",
            style() {
                let look = {minHeight: "140px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#363636"
                return look
            },
        },
        12: {
            title: "Four-Leaf Clover",
            unlocked: true,
            description: "Unlocks Dice Five's \"Lucky Lift\" skill.",
            cost: new Decimal(50),
            currencyLocation() { return player.zd },
            currencyDisplayName: "Pips",
            currencyInternalName: "pips",
            style() {
                let look = {minHeight: "140px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#363636"
                return look
            },
        },
        13: {
            title: "Not an Ultrakill Reference",
            unlocked: true,
            description: "Unlocks Dice Five's \"Coin Toss\" skill.",
            cost: new Decimal(150),
            currencyLocation() { return player.zd },
            currencyDisplayName: "Pips",
            currencyInternalName: "pips",
            style() {
                let look = {minHeight: "140px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#363636"
                return look
            },
        },
        14: {
            title: "Pip Power",
            unlocked: true,
            description: "Pips boost chance point gain",
            cost: new Decimal(300),
            currencyLocation() { return player.zd },
            currencyDisplayName: "Pips",
            currencyInternalName: "pips",
            effect() {
                return player.zd.pips.pow(1.5).add(1)
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
            style() {
                let look = {minHeight: "140px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#363636"
                return look
            },
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.zd.zarChips},
            pay(amt) { player.zd.zarChips = this.currency().sub(amt) },
            effect(x) {return Decimal.pow(4, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>ZC-1</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100)\n\
                    Quadruple chance point gain\n\
                    Currently: x" + formatWhole(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Zar Chips"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#dadada"
                return look
            },
        },
        12: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.zd.zarChips},
            pay(amt) { player.zd.zarChips = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>ZC-2</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Raise dice score\n\
                    Currently: ^" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Zar Chips"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#dadada"
                return look
            },
        },
        13: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.zd.zarChips},
            pay(amt) { player.zd.zarChips = this.currency().sub(amt) },
            effect(x) {return Decimal.add(1, getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.03))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>ZC-3</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100)\n\
                    Multiply ESC\n\
                    Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Zar Chips"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#dadada"
                return look
            },
        },
        14: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.zd.zarChips},
            pay(amt) { player.zd.zarChips = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>ZC-4</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/1)\n\
                    Open the door to Zar's Dungeon\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Zar Chips"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#dadada"
                return look
            },
        },

        15: {
            costBase() { return new Decimal(7) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.zd.zarChips},
            pay(amt) { player.zd.zarChips = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>ZC-5</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100)\n\
                    Adds to base Zar Chip gain\n\
                    Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Zar Chips"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#dadada"
                return look
            },
        },
        16: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.zd.zarChips},
            pay(amt) { player.zd.zarChips = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.2)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>ZC-6</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Chance to win triple zar chips on win.\n\
                    Currently: " + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Zar Chips"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#dadada"
                return look
            },
        },
        17: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.zd.zarChips},
            pay(amt) { player.zd.zarChips = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(0.3).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>ZC-7</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Multiplies Zar Chip gain\n\
                    Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Zar Chips"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#dadada"
                return look
            },
        },
        18: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.zd.zarChips},
            pay(amt) { player.zd.zarChips = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).mul(0.25).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>ZC-8</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Divides Evo Shard requirement\n\
                    Currently: /" + format(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Zar Chips"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "#dadada"
                return look
            },
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stages: {
            "zarDungeon": {
                unlocked: true,
                embedLayer: 'zarDungeon',
            },
        },
        stuff: {
            "Zar Chips": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.za.zarUnlocked },
                content: [
                    ["blank", "50px"],
                    ["style-row", [
                    ["column", [
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.zd.zarChips) + "</h3> zar chips. (+" + formatWhole(player.zd.zarChipsToGet) + ")"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], 
                    ["blank", "15px"],
                    ]]
                    ], {width: "1277px", height: "75px", backgroundColor: "#303030", border: "3px solid #7f7f7f", padding: "5px"}],
                    ["style-row", [
                    ["style-column", [
                    ["style-column", [
                    ["raw-html", () => {return "Your Hand"}, {color: "#1f1f1f", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "785px", height: "40px", backgroundColor: "#dadada", border: "3px solid #7f7f7f", userSelect: "none"}],
                    ["style-row", [
                    ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105], ["clickable", 106], ["clickable", 107], ["clickable", 108]]], 
                    ["raw-html", function () { return "&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["raw-html", () => {return "Hand Value: " + formatWhole(player.zd.playerScore)}, {color: "#dadada", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "775px", height: "135px", backgroundColor: "#303030", border: "3px solid #7f7f7f", borderTop: "0px", borderBottom: "0px", padding: "5px"}],
                    ["style-column", [
                    ["raw-html", () => {return "Zar's Hand"}, {color: "#1f1f1f", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "785px", height: "40px", backgroundColor: "#dadada", border: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}],
                    ["style-row", [
                    ["row", [["clickable", 201], ["clickable", 202], ["clickable", 203], ["clickable", 204], ["clickable", 205], ["clickable", 206], ["clickable", 207], ["clickable", 208]]],
                                        ["raw-html", function () { return "&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["raw-html", () => {return "Hand Value: " + formatWhole(player.zd.dealerScore)}, {color: "#dadada", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "775px", height: "135px", backgroundColor: "#303030", border: "3px solid #7f7f7f", borderTop: "0px", borderBottom: "0px", padding: "5px"}],
                    ["style-row", [
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13],]],
                    ], {width: "775px", height: "135px", backgroundColor: "#7f7f7f", border: "3px solid #dadada", borderTop: "0px", padding: "5px"}],
                    ], {width: "775px", height: "485px",}],
                    ["style-column", [
                    ["style-row", [["buyable", 11],["buyable", 12],["buyable", 13],["buyable", 14],], {width: "502px", height: "130px",}],
                    ["style-row", [["buyable", 15],["buyable", 16],["buyable", 17],["buyable", 18],], {width: "502px", height: "130px",}],
                    ["style-row", [], {width: "502px", height: "260px",}],
                    ], {width: "502px", height: "515px", backgroundColor: "#7f7f7f", border: "3px solid #dadada", padding: "5px"}],
                    ], {width: "1295px", height: "485px",}],
                ]
            },
            "Dungeon": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.zd.buyables[14].gte(1) },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.zd.pips) + "</h3> dice pips."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], 
                    ["style-row", [["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14],], {width: "502px", height: "200px",}],
                    ], {width: "1184px", height: "260px", backgroundColor: "#4e4e4e", border: "3px solid #dadada", borderRadius: "25px 25px 0px 0px", padding: "5px"}],
                    ["buttonless-microtabs", "stages", {borderWidth: "0"}],
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && !player.sma.inStarmetalChallenge && hasUpgrade("car", 19)}
})

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
addLayer("zard", {
    name: "Zar's Dungeon Death", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⚅", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
    startData() { return {
        unlocked: true,
    }},
    clickables: {
        "Leave": {
            title: "<h2>Leave Zar's Dungeon</h2>",
            canClick: true,
            unlocked: true,
            onClick() {
                player.tab = "zd"
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "linear-gradient(45deg, #4e4e4e 0%, #868686 100%)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
                    ["blank", "200px"],
                    ["style-column", [
                        ["raw-html", "Everyone has passed out.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", "<i>Something</i> pulls you out of Zar's Dungeon.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "800px", height: "80px", backgroundColor: "rgb(39, 39, 39)", border: "3px solid #777777", borderRadius: "20px"}],
                    ["blank", "25px"],
                    ["clickable", "Leave"],
                    ["blank", "25px"],
    ],
    layerShown() {return false},
})

addLayer("zarDungeon", {
    name: "Zar's Dungeon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⚅", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        if (player.zarDungeon.unlocked) player.subtabs["bh"]["stages"] = "zarDungeon"
    },
    startData() { return {
        unlocked: true,

        navMilestone: false,
        diceFiveMilestone: false,

        navToggle: true,
        diceFiveToggle: true,
        reachedZar: false,
        reachedZar2: false,

        barrageActive: false,

        snakeEyesDmg: new Decimal(0),
        diceFiveIndex: 0,

        zarDefeated: false,
    }},
    automate() {},
    nodeStyle() {
        let str = {}
        str = {
            background: "linear-gradient(45deg, #3f003f 0%, #a900a9 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#3f003f",
            color: "rgba(0,0,0,0.5)",
            margin: "20px 0 0 30px !important",
        }
        if (player.subtabs["bh"]["stages"] == "zarDungeon") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Zar's Dungeon",
    color: "#696969",
    update(delta) {
        player.zarDungeon.unlocked = player.zd.buyables[14].gte(1)

        if (player.bh.currentStage == "zarDungeon" && player.bh.combo.eq(29) && !player.zarDungeon.reachedZar) {
            if (player.bh.characters[1].id != "none") player.bh.characterData[player.bh.characters[1].id].selected = false
            player.bh.characters[1].id = "none"
            player.bh.characterData[player.bh.characterSelection].selected = true
            for (let i = 0; i < 4; i++) {
                player.bh.characters[1].skills[i].id = "none"
            }

            if (player.bh.characterData[player.bh.characterSelection].selected) {
            player.bh.characterData[player.bh.characterSelection].selected = false
            player.bh.characters[0].id = "creation"
            for (let i = 0; i < 4; i++) {
                player.bh.characters[0].skills[0].id = "creation_increment"
                player.bh.characters[0].skills[1].id = "creation_upgrade"
                player.bh.characters[0].skills[2].id = "creation_prestige"
                player.bh.characters[0].skills[3].id = "creation_mend"
            }
            }
            setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    player.bh.characters[i].health = player.bh.characters[i].maxHealth
                    player.bh.characters[i].shield = new Decimal(0)
                    player.bh.characters[i].stun = ["none", new Decimal(0)]

                for (let j = 0; j < 4; j++) {
                    player.bh.characters[i].skills[j].cooldown = player.bh.characters[i].skills[j].cooldownMax
                    player.bh.characters[i].skills[j].duration = new Decimal(0)
                    player.bh.characters[i].skills[j].interval = new Decimal(0)
                }
                }
            }, 200); 
            player.zarDungeon.reachedZar = true
        }
        if (player.bh.currentStage == "zarDungeon" && player.bh.combo.eq(29) && player.bh.celestialite.id == "zar" && player.bh.celestialite.health.lte(12500) && !player.zarDungeon.reachedZar2) {

            player.bh.characterData[player.bh.characterSelection].selected = false
            player.bh.characters[1].id = "nav"
            for (let i = 0; i < 4; i++) {
                player.bh.characters[1].skills[i].id = player.bh.characterData["nav"].skills[i]
            }
            setTimeout(() => {
                player.bh.characters[1].health = player.bh.characters[1].maxHealth
                player.bh.characters[1].shield = new Decimal(0)
                player.bh.characters[1].stun = ["none", new Decimal(0)]

                for (let i = 0; i < 4; i++) {
                    player.bh.characters[1].skills[i].cooldown = player.bh.characters[1].skills[i].cooldownMax
                    player.bh.characters[1].skills[i].duration = new Decimal(0)
                    player.bh.characters[1].skills[i].interval = new Decimal(0)
                }
            }, 200); 
            player.zarDungeon.reachedZar2 = true
        }
        if (player.bh.currentStage == "zarDungeon")

        if (player.bh.currentStage == "zarDungeon" && player.bh.combo.gte(20) && player.zarDungeon.navToggle && !player.zarDungeon.diceFiveToggle)
        {
            player.zarDungeon.navMilestone = true
        }
        if (player.bh.currentStage == "zarDungeon" && player.bh.combo.gte(20) && !player.zarDungeon.navToggle && player.zarDungeon.diceFiveToggle)
        {
            player.zarDungeon.diceFiveMilestone = true
        }

        for (let i = 0; i < 3; i++) {
            if (player.bh.characters[i].id == "diceFive") {
                player.zarDungeon.diceFiveIndex = i
            }
        }
        if (player.bh.currentStage != "zarDungeon")
        {
            player.zarDungeon.barrageActive = false
        }
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Zar's Dungeon</h2>",
            tooltip: "You can only select Nav and Dice Five into your party.",
            canClick() { return (player.zarDungeon.navToggle || player.zarDungeon.diceFiveToggle) && player.bh.currentStage != "zarDungeon" },
            unlocked: true,
            onClick() {
                BHStageEnter("zarDungeon", [player.zarDungeon.navToggle ? "nav" : "none", player.zarDungeon.diceFiveToggle ? "diceFive" : "none", "none"])

                setTimeout(() => {
                    for (let i = 0; i < 3; i++) {
                        player.bh.characters[i].health = player.bh.characters[i].maxHealth
                        player.bh.characters[i].shield = new Decimal(0)
                        player.bh.characters[i].stun = ["none", new Decimal(0)]

                    for (let j = 0; j < 4; j++) {
                        player.bh.characters[i].skills[j].duration = new Decimal(0)
                        player.bh.characters[i].skills[j].interval = new Decimal(0)
                    }
                    }
                }, 200); 
                

            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "linear-gradient(45deg, #4e4e4e 0%, #868686 100%)", border: "3px solid #000", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
        "Auto-Enter": {
            title() {return player.bh.autoEnter ? "<div style='margin-bottom:-20px;line-height:1'>Auto Enter<br><small>[" + BHS[player.bh.autoEnter].nameCap + "]<br>[" + formatTime(Decimal.sub(30, player.bh.autoCooldown)) + "]</small></div>" : "Auto Enter<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            tooltip: "Activates after 30 seconds when exiting a BH stage",
            onClick() {
                if (player.bh.autoEnter) {
                    player.bh.autoEnter = false
                    player.bh.autoCooldown = new Decimal(0)
                } else {
                    player.bh.autoEnter = "zarDungeon"
                }
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
        "Auto-Exit": {
            title() {return player.bh.autoExit ? "Auto Exit<br><small>[Enabled]" : "Auto Exit<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.bh.autoExit) {
                    player.bh.autoExit = false
                } else {
                    player.bh.autoExit = true
                }
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
        "Nav-Toggle": {
            title() {return player.zarDungeon.navToggle ? "<div style='margin-bottom:-20px;line-height:1'>Nav<br><small>[Enabled]</small></div>" : "Nav<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            onClick() {
                player.zarDungeon.navToggle = !player.zarDungeon.navToggle
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
        "DiceFive-Toggle": {
            title() {return player.zarDungeon.diceFiveToggle ? "<div style='margin-bottom:-20px;line-height:1'>Dice Five<br><small>[Enabled]</small></div>" : "Dice Five<br><small>[Disabled]"},
            canClick: true,
            unlocked: true,
            onClick() {
                player.zarDungeon.diceFiveToggle = !player.zarDungeon.diceFiveToggle
            },
            style: {width: "110px", minHeight: "55px", color: "var(--textColor)", background: "var(--miscButtonHover)", border: "3px solid var(--miscButton)", borderRadius: "15px"},
        },
    },
    upgrades: {},
    buyables: {},
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["top-column", [
                    ["blank", "5px"],
                    ["style-column", [
                        ["raw-html", "Perks for defeating Zar", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "500px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "5px"}],
                    ["raw-html", "<u>Unlocks</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "+1 OTF Slot", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "Zar Punchcard", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "Rare Space Pets", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", "Auto Card-Draw", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["raw-html", "<u>Effects</u>", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Divide Point Doom Softcap's Scaling Divider by /1.5." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x1,000 to Chance Points." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x100 to Wheel Points." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "x10 to all Chips." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],

                    // Zar punchcard 
                ], () => {
                    let look = {width: "691px", height: "412px", background: "linear-gradient(180deg, #4e4e4e 0%, #868686 100%)", borderRadius: "0 0 0 27px", border: "3px solid #000"}
                    if (!player.zarDungeon.zarDefeated) {look.filter = "brightness(25%) blur(10px)"; look.userSelect = "none"}
                    return look
                }],
            ], {borderRadius: "0 0 0 27px", overflow: "hidden"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "Zar's Dungeon", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", "All celestialite's damage is based on luck.", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ], {width: "400px", height: "35px", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "500px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["style-column", [
                        ["raw-html", "20 Combo with only Nav", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "Unlocks Nav's ultimate ability: Violet Resonance", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "482px", height: "58px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.zarDungeon.navMilestone) look.background = "#77bf5f"
                        return look
                    }],
                    ["style-column", [
                        ["raw-html", "20 Combo with only Dice Five", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "Unlocks Dice Five's ultimate ability: Snake Eyes", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "482px", height: "57px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.zarDungeon.diceFiveMilestone) look.background = "#77bf5f"
                        return look
                    }],
                    ["style-column", [
                        ["raw-html", "Defeat Zar", {color: "rgba(0,0,0,0.5)", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", "Unlocks Zar's Perks", {color: "rgba(0,0,0,0.5)", fontSize: "14px", fontFamily: "monospace"}],
                    ], () => {
                        let look = {width: "482px", height: "58px", padding: "0 5px", background: "#bf8f8f", border: "4px solid rgba(0, 0, 0, 0.125)", cursor: "default", userSelect: "none"}
                        if (player.zarDungeon.zarDefeated) look.background = "#77bf5f"
                        return look
                    }],
                ], {width: "500px", height: "197px", background: "var(--layerBackground)"}],
                ["style-row", [
                    ["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"], ["blank", ["10px", "10px"]], ["clickable", "Nav-Toggle"], ["blank", ["10px", "10px"]], ["clickable", "DiceFive-Toggle"],
                ], {width: "500px", height: "70px", background: "var(--miscButtonDisable)", borderTop: "3px solid var(--regBorder)", borderRadius: "0 0 27px 0"}],
            ], {width: "500px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "1200px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && player.zd.buyables[14].gte(1)},
})

BHS.zarDungeon = {
    nameCap: "Zar's Dungeon",
    nameLow: "zar's dungeon",
    music: "music/casino.mp3",
    comboLimit: 30,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 6:
                return "dice1"
            case 12:
                return "dice2"
            case 18:
                return "dice3"
            case 24:  
                return "dice4"
            case 29:
                return "zar"
            default:
                let random = Math.random()
                let cel = ["zd1", "zd2", "zd3", "zd4", "zd5"]
                if (combo >= 12) 
                {
                    cel.push("zd6")
                    cel.push("zd7")
                    cel.push("zd8")
                }
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}

BHC.zd1 = {
    name: "Celestialite ZD-1",
    icon: "resources/celestialites/d1.png",
    health: new Decimal(1000),
    damage: new Decimal(6),
    luck: new Decimal(25),
    agility: new Decimal(5),
    actions: {
        0: {
            name: "Lucky Strike",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                return player.bh.celestialite.luck.mul(0.3).add(player.bh.celestialite.damage.mul(2))
            },
            cooldown: new Decimal(8),
        },
        1: {
            name: "Rigging",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "luckAdd": new Decimal(15),
            },
            cooldown: new Decimal(10),
        },
    },
    attributes: {
        "air": new Decimal(0.7), // Resistance DMG Mult
        "rebound": new Decimal(0.03),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(2), 1)
        return gain
    },
}
BHC.zd2 = {
    name: "Celestialite ZD-2",
    icon: "resources/celestialites/d2.png",
    health: new Decimal(1500),
    damage: new Decimal(3),
    luck: new Decimal(8),
    agility: new Decimal(15),
    actions: {
        0: {
            name: "Random Attack",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                let random = getRandomInt(3) + 1
                return player.bh.celestialite.luck.mul(0.75).add(player.bh.celestialite.damage.mul(2)).mul(random)
            },
            cooldown: new Decimal(8),
        },
        1: {
            name: "Accelerate",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "agilityAdd": new Decimal(15),
            },
            cooldown: new Decimal(10),
        },
    },
    attributes: {
        "warded": new Decimal(0.7), // Resistance DMG Mult
        "rebound": new Decimal(0.03),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(3), 1)
        return gain
    },
}
BHC.zd3 = {
    name: "Celestialite ZD-3",
    icon: "resources/celestialites/d3.png",
    health: new Decimal(1200),
    damage: new Decimal(3),
    luck: new Decimal(6),
    agility: new Decimal(15),
    actions: {
        0: {
            name: "Dice Bomb",
            instant: true,
            type: "damage",
            target: "all",
            method: "ranged",
            value() {
                let random = getRandomInt(2) + 3
                return player.bh.celestialite.luck.mul(0.9).add(player.bh.celestialite.damage.mul(3.3)).mul(random)
            },
            cooldown: new Decimal(15),
        },
        1: {
            name: "Self-Repair",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(5),
        },
    },
    attributes: {
        "stealthy": new Decimal(0.7), // Resistance DMG Mult
        "rebound": new Decimal(0.03),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(1), 2)
        return gain
    },
}
BHC.zd4 = {
    name: "Celestialite ZD-4",
    icon: "resources/celestialites/d4.png",
    health: new Decimal(600),
    damage: new Decimal(4),
    luck: new Decimal(9),
    agility: new Decimal(5),
    actions: {
        0: {
            name: "Dice Knife",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                let random = getRandomInt(6) + 6
                return player.bh.celestialite.luck.mul(0.075).add(player.bh.celestialite.damage.mul(0.075)).mul(random)
            },
            cooldown: new Decimal(1),
        },
    },
    attributes: {
        "air": new Decimal(0.5), // Resistance DMG Mult
        "warded": new Decimal(0.5), // Resistance DMG Mult
        "stealthy": new Decimal(0.5), // Resistance DMG Mult
        "rebound": new Decimal(0.1),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(4), 1)
        return gain
    },
}
BHC.zd5 = {
    name: "Celestialite ZD-5",
    icon: "resources/celestialites/d5.png",
    health: new Decimal(1300),
    damage: new Decimal(4),
    luck: new Decimal(7),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Gambler's Fallacy",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value() {
                let random = getRandomInt(6)
                return player.bh.celestialite.luck.mul(0.75).add(player.bh.celestialite.damage.mul(0.75)).mul(random)
            },
            properties: {
                "storeTarget": true,
            },
            cooldown: new Decimal(15),

            active: true,
            constantType: "effect",
            constantTarget: "storedTarget",
            effects: {
                "regenAdd"() {return Decimal.mul(-7, player.bh.celestialite.luck)}
            },
            duration: new Decimal(3),
        },
        1: {
            name: "Self-Repair",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(50),
            cooldown: new Decimal(5),
        },
    },
    attributes: {
        "rebound": new Decimal(0.1),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(3), 2)
        return gain
    },
}
BHC.zd6 = {
    name: "Celestialite ZD-6",
    icon: "resources/celestialites/d6.png",
    health: new Decimal(1800),
    damage: new Decimal(6),
    luck: new Decimal(7),
    agility: new Decimal(8),
    actions: {
        0: {
            name: "Coin Toss",
            instant: true,
            type: "function",
            target: "randomPlayer",
            method: "ranged",
            cooldown: new Decimal(10),
            onTrigger(index, slot, target, method)
            {
                let dmg = player.bh.celestialite.luck.mul(13).add(player.bh.celestialite.damage.mul(8))

                let random = getRandomInt(2)
                if (random == 0) {
                    bhAttack(dmg, index, slot, "randomPlayer", "", "ranged")
                } else {
                    player.bh.celestialite.stun = ["soft", new Decimal(3)]
                }
            },            
        },
    },
    attributes: {
        "daze": new Decimal(0.1),
        "explosive": new Decimal(25),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(3), 2)
        return gain
    },
}
BHC.zd7 = {
    name: "Celestialite ZD-7",
    icon: "resources/celestialites/d7.png",
    health: new Decimal(1900),
    damage: new Decimal(6),
    luck: new Decimal(7),
    agility: new Decimal(12),
    actions: {
        0: {
            name: "Coin Gun",
            instant: true,
            type: "function",
            target: "randomPlayer",
            method: "ranged",
            cooldown: new Decimal(1.5),
            onTrigger(index, slot, target, method)
            {
                let dmg = player.bh.celestialite.luck.mul(5).add(player.bh.celestialite.damage.mul(3))

                let random = getRandomInt(2)
                if (random == 0) {
                    bhAttack(dmg, index, slot, "randomPlayer", "", "ranged")
                } else {
                    player.bh.celestialite.stun = ["soft", new Decimal(0.2)]
                }
            },     
        },
        1: {
            name: "Accelerate",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "agilityAdd": new Decimal(6),
            },
            cooldown: new Decimal(10),
        },
    },
    attributes: {
        "daze": new Decimal(0.25),
        "explosive": new Decimal(50),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(3), 2)
        return gain
    },
}
BHC.zd8 = {
    name: "Celestialite ZD-8",
    icon: "resources/celestialites/d8.png",
    health: new Decimal(2400),
    damage: new Decimal(6),
    luck: new Decimal(7),
    agility: new Decimal(12),
    actions: {
        0: {
            name: "Lucky Magic",
            instant: true,
            type: "function",
            target: "randomPlayer",
            method: "magic",
            cooldown: new Decimal(15),
            onTrigger(index, slot, target, method)
            {
                let dmg = player.bh.celestialite.luck.mul(10.5).add(player.bh.celestialite.damage.mul(9))

                let random = getRandomInt(4)
                if (random == 0) {
                    bhAttack(dmg.mul(1.5), index, slot, "randomPlayer", "", "magic")
                    player.bh.characters[1].stun = ["soft", new Decimal(5)]
                } else if (random == 1) {
                    bhAttack(dmg.mul(1.5), index, slot, "randomPlayer", "", "magic")
                    player.bh.characters[0].stun = ["soft", new Decimal(5)]
                } else if (random == 2) {
                    bhAttack(dmg, index, slot, "randomPlayer", "", "magic")
                    player.bh.characters[0].stun = ["soft", new Decimal(2.5)]
                    player.bh.characters[1].stun = ["soft", new Decimal(2.5)]
                } else {
                    bhAttack(dmg.mul(0.5), index, slot, "all", "", "magic")
                }
            },     
        },
    },
    attributes: {
        "rebound": new Decimal(0.2),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(3), 2)
        return gain
    },
}
BHC.dice1 = {
    name: "Dice One",
    icon: "resources/diceOne.png",
    health: new Decimal(5000),
    damage: new Decimal(20),
    luck: new Decimal(7),
    agility: new Decimal(8),
    noRandomStats: true,
    actions: {
        0: {
            name: "Lucky Strike",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                return player.bh.celestialite.luck.mul(0.15).add(player.bh.celestialite.damage.mul(0.05))
            },
            cooldown: new Decimal(6),
        },
        1: {
            name: "Dice Bomb",
            instant: true,
            type: "damage",
            target: "all",
            method: "ranged",
            value() {
                let random = getRandomInt(2) + 2
                return player.bh.celestialite.luck.mul(0.25).add(player.bh.celestialite.damage.mul(0.02)).mul(random)
            },
            cooldown: new Decimal(15),
        },
        2: {
            name: "???",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                let random = getRandomInt(3)
                if (random == 0) {
                    bulletHell({"bouncingDice": {diceCount: 3, enemySpeed: 3}}, {duration: 15})
                } else if (random == 1) {
                    bulletHell({"diceAttackNoOrbit": {diceAmount: 1, intervalDiv: 2}}, {duration: 10})
                } else {
                    bulletHell({"diceAttack": {diceAmount: 2, intervalDiv: 1}}, {duration: 10})
                }
            },
            cooldown: new Decimal(25),
        },
    },
    attributes: {
        "rebound": new Decimal(0.1),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(4), 5)
        return gain
    },
}
BHC.dice2 = {
    name: "Dice Two",
    icon: "resources/diceTwo.png",
    health: new Decimal(6000),
    damage: new Decimal(24),
    luck: new Decimal(7),
    agility: new Decimal(8),
    noRandomStats: true,
    actions: {
        0: {
            name: "Dice Knife",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                let random = getRandomInt(6) + 6
                return player.bh.celestialite.luck.mul(0.05).add(player.bh.celestialite.damage.mul(0.025)).mul(Decimal.mul(random, 0.075))
            },
            cooldown: new Decimal(1),
        },
        1: {
            name: "Random Attack",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                let random = getRandomInt(3) + 1
                return player.bh.celestialite.luck.mul(0.25).add(player.bh.celestialite.damage.mul(0.03)).mul(random).div(3)
            },
            cooldown: new Decimal(8),
        },
        2: {
            name: "???",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                let random = getRandomInt(3)
                if (random == 0) {
                    bulletHell({"bouncingDice": {diceCount: 1, enemySpeed: 6, intervalDiv: 3.5}}, {duration: 15})
                } else if (random == 1) {
                    bulletHell({"diceAttackNoOrbit": {diceAmount: 2, intervalDiv: 1}}, {duration: 10})
                } else if (random == 2){
                    bulletHell({"diceAttack": {diceAmount: 4, intervalDiv: 0.5}}, {duration: 10})
                } 
            },
            cooldown: new Decimal(25),
        },
    },
    attributes: {
        "rebound": new Decimal(0.1),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(4), 5)
        return gain
    },
}
BHC.dice3 = {
    name: "Dice Three",
    icon: "resources/diceThree.png",
    health: new Decimal(7000),
    damage: new Decimal(24),
    luck: new Decimal(10),
    agility: new Decimal(8),
    noRandomStats: true,
    actions: {
        0: {
            name: "Gambler's Fallacy",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value() {
                return player.bh.celestialite.luck.mul(0.25).add(player.bh.celestialite.damage.mul(0.06))
            },
            properties: {
                "storeTarget": true,
            },
            cooldown: new Decimal(15),

            active: true,
            constantType: "effect",
            constantTarget: "storedTarget",
            effects: {
                "regenAdd"() {return player.bh.celestialite.luck}
            },
            duration: new Decimal(3),
        },
        1: {
            name: "Coin Gun",
            instant: true,
            type: "function",
            target: "randomPlayer",
            method: "ranged",
            cooldown: new Decimal(2),
            onTrigger(index, slot, target, method)
            {
                let dmg = player.bh.celestialite.luck.mul(0.25).add(player.bh.celestialite.damage.mul(0.25))

                let random = getRandomInt(2)
                if (random == 0) {
                    bhAttack(dmg, index, slot, "randomPlayer", "", "ranged")
                } else {
                    player.bh.celestialite.stun = ["soft", new Decimal(0.2)]
                }
            },     
        },
        2: {
            name: "???",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                let random = getRandomInt(3)
                if (random == 0) {
                    bulletHell({"bouncingDice": {diceCount: 10, enemySpeed: 0.25, intervalDiv: 0.5}}, {duration: 15})
                } else if (random == 1) {
                    bulletHell({"diceAttackNoOrbit": {diceAmount: 8, intervalDiv: 0.25}}, {duration: 10})
                } else if (random == 2){
                    bulletHell({"pipRain": {bulletPerSec: 7}}, {duration: 12})
                } 
            },
            cooldown: new Decimal(22),
        },
    },
    attributes: {
        "rebound": new Decimal(0.1),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(4), 5)
        return gain
    },
}
BHC.dice4 = {
    name: "Dice Four",
    icon: "resources/diceFour.png",
    health: new Decimal(8000),
    damage: new Decimal(22),
    luck: new Decimal(12),
    agility: new Decimal(8),
    noRandomStats: true,
    actions: {
        0: {
            name: "Coin Toss",
            instant: true,
            type: "function",
            target: "randomPlayer",
            method: "ranged",
            cooldown: new Decimal(10),
            onTrigger(index, slot, target, method)
            {
                let dmg = player.bh.celestialite.luck.mul(0.5).add(player.bh.celestialite.damage.mul(0.3))

                let random = getRandomInt(2)
                if (random == 0) {
                    bhAttack(dmg, index, slot, "randomPlayer", "", "ranged")
                } else {
                    player.bh.celestialite.stun = ["soft", new Decimal(3)]
                }
            },            
        },
        1: {
            name: "Lucky Magic",
            instant: true,
            type: "function",
            target: "randomPlayer",
            method: "magic",
            cooldown: new Decimal(15),
            onTrigger(index, slot, target, method)
            {
                let dmg = player.bh.celestialite.luck.mul(0.5).add(player.bh.celestialite.damage.mul(0.3))

                let random = getRandomInt(4)
                if (random == 0) {
                    bhAttack(dmg.mul(1.5), index, slot, "randomPlayer", "", "magic")
                    player.bh.characters[1].stun = ["soft", new Decimal(5)]
                } else if (random == 1) {
                    bhAttack(dmg.mul(1.5), index, slot, "randomPlayer", "", "magic")
                    player.bh.characters[0].stun = ["soft", new Decimal(5)]
                } else if (random == 2) {
                    bhAttack(dmg, index, slot, "randomPlayer", "", "magic")
                    player.bh.characters[0].stun = ["soft", new Decimal(2.5)]
                    player.bh.characters[1].stun = ["soft", new Decimal(2.5)]
                } else {
                    bhAttack(dmg.mul(0.5), index, slot, "all", "", "magic")
                }
            },     
        },
        2: {
            name: "???",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                let random = getRandomInt(3)
                if (random == 0) {
                    bulletHell({"bouncingDice": {diceCount: 4 + getRandomInt(3), enemySpeed: 2, intervalDiv: 1}}, {duration: 15})
                } else if (random == 1) {
                    bulletHell({"diceAttackNoOrbit": {diceAmount: 3 + getRandomInt(3), intervalDiv: 0.6}}, {duration: 10})
                } else if (random == 2){
                    bulletHell({"pipRainHorizontal": {bulletPerSec: 11}}, {duration: 12})
                } 
            },
            cooldown: new Decimal(22),
        },
    },
    attributes: {
        "rebound": new Decimal(0.1),
    },
    reward() {
        let gain = {}

        gain.pips = Decimal.add(getRandomInt(4), 5)
        return gain
    },
}
BHC.zar = {
    name: "Zar",
    icon: "resources/zar.png",
    health: new Decimal(25000),
    damage: new Decimal(26),
    luck: new Decimal(35),
    agility: new Decimal(8),
    noRandomStats: true,
    immortal: true,
    actions: {
        0: {
            name: "Lucky Strike",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value() {
                return player.bh.celestialite.luck.mul(0.015).add(player.bh.celestialite.damage.mul(0.015))
            },
            cooldown: new Decimal(7),
        },
        1: {
            name: "Gambler's Fallacy",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value() {
                return player.bh.celestialite.luck.mul(0.025).add(player.bh.celestialite.damage.mul(0.06))
            },
            properties: {
                "storeTarget": true,
            },
            cooldown: new Decimal(12),

            active: true,
            constantType: "effect",
            constantTarget: "storedTarget",
            effects: {
                "regenAdd"() {return player.bh.celestialite.luck.mul(-0.15)}
            },
            duration: new Decimal(3),
        },
        2: {
            name: "Lucky Magic",
            instant: true,
            type: "function",
            target: "randomPlayer",
            method: "magic",
            cooldown: new Decimal(15),
            onTrigger(index, slot, target, method)
            {

                let dmg = player.bh.celestialite.luck.mul(0.50).add(player.bh.celestialite.damage.mul(0.3))

                let random = getRandomInt(4)
                if (random == 0) {
                    bhAttack(dmg.mul(1.5), index, slot, "randomPlayer", "", "magic")
                    player.bh.characters[1].stun = ["soft", new Decimal(5)]
                } else if (random == 1) {
                    bhAttack(dmg.mul(1.5), index, slot, "randomPlayer", "", "magic")
                    player.bh.characters[0].stun = ["soft", new Decimal(5)]
                } else if (random == 2) {
                    bhAttack(dmg, index, slot, "randomPlayer", "", "magic")
                    player.bh.characters[0].stun = ["soft", new Decimal(2.5)]
                    player.bh.characters[1].stun = ["soft", new Decimal(2.5)]
                } else {
                    bhAttack(dmg.mul(0.5), index, slot, "all", "", "magic")
                }
            },     
        },
        3: {
            name: "???",
            instant: true,
            type: "function",
            onTrigger(index, slot, target)
            {
                //harder attacks at phase 2

                if (player.bh.celestialite.health.gte(12500))
                {
                    let random = getRandomInt(7)
                    if (random == 0) {
                        bulletHell({"pipRainUltimate": {bulletPerSec: 3}}, {duration: 12})
                    } else if (random == 1) {
                        bulletHell({"diceSpikes": {spawnPerSec: 10, enemySpeed: 3.5, spikeSize: 28,}}, {width: 1200, height: 600, duration: 12, transparent: false})
                    } else if (random == 2){
                        bulletHellBlue({"diceSpikesPlatformer": {bulletPerSec: 1.2, enemySpeed: 3, spikeHeight: 80, spikeWidth: 60}}, {width:800, height:300, duration:15, jumpMin:6, jumpMax:150, gravity: 0.2})
                    } else if (random == 3){
                        bulletHellBlue({"spikePlatformAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 4, platformSpikeChance: 0.4, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203}}, {width:800, height:600, duration:15, jumpMin:6, jumpMax:250, gravity: 0.2})
                    }  else if (random == 4){
                        bulletHellBlue({"dieBouncer": {dieAmount: 1, size: 50, enemySpeed: 3, chargeMult: 1.6, spikeSpeed:5, spikeRadius:30, lastTick:false}}, {width: 800, height: 600, duration: 10, jumpMin:6, jumpMax:250, gravity: 0.2})
                    } else if (random == 5){
                        bulletHell({"dieBouncer": {dieAmount: 2, size: 50, enemySpeed: 3, chargeMult: 1.6, spikeSpeed:6, spikeRadius:30, lastTick:false}}, {width: 1200, height: 600, duration: 10})
                    } else if (random == 6) {
                        bulletHellBlue({"movingDieRadialBurstAttack": {circleAmount: 1, burstInterval: 800, bulletsPerBurst: 6, enemySpeed: 1.5, bulletSpeed: 5}}, {width:800, height:600, duration:15, jumpMin:6, jumpMax:250, gravity: 0.2})
                    }
                } else
                {
                    let random = getRandomInt(7)
                    if (random == 0) {
                        bulletHell({"diceSpikes": {spawnPerSec: 6, bulletPerSec: 6, enemySpeed: 3.5, bulletSpeed: 2, spikeSize: 28, rain: true}}, {width: window.innerWidth, height: window.innerHeight, duration: 12, transparent: true})
                    } else if (random == 1) {
                        bulletHell({"pipRainUltimate": {bulletPerSec: 6}}, {width: window.innerWidth, height: window.innerHeight, duration: 12, transparent: true})
                    } else if (random == 2){
                        bulletHell({"diceAttack": {diceAmount: 8, intervalDiv: 0.55}}, {duration: 10})
                    } else if (random == 3) {
                        bulletHellBlue({"spikePlatformAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 4, platformSpikeChance: 0.1, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203, rain: true, bulletPerSec: 3}}, {width:800, height:600, duration:15, jumpMin:6, jumpMax:250, gravity: 0.2})
                    } else if (random == 4) {
                        bulletHellBlue({"zarUltimateAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 6, spawnPerSec: 2, bulletPerSec: 6, enemySpeed: 3, spikeSize: 28, platformSpikeChance: 0.1, platformSpeed: 1, platformMinW: 203, platformMaxW: 203, diceSpikes: true, bulletPerSec: 10}}, {width: 800, height: 600, duration: 12, transparent: false, saveContent: true, jumpMin:6, jumpMax:350, gravity: 0.2})
                    } else if (random == 5 || random == 6) {
                        zarAttackBarrage(getRandomInt(4))
                    }
                }
                
                
                //bulletHell({"diceSpikes": {spawnPerSec: 6, bulletPerSec: 6, enemySpeed: 3.5, bulletSpeed: 2, spikeSize: 28, rain: true}}, {width: window.innerWidth, height: window.innerHeight, duration: 12, transparent: true})
                //bulletHell({"pipRainUltimate": {bulletPerSec: 3}}, {width: window.innerWidth, height: window.innerHeight, duration: 12, transparent: true})
                //bulletHell({"diceAttack": {diceAmount: 8, intervalDiv: 0.55}}, {duration: 10})
                //bulletHellBlue({"spikePlatformAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 4, platformSpikeChance: 0.3, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203, rain: true, bulletPerSec: 3}}, {width:800, height:600, duration:15, jumpMin:6, jumpMax:250, gravity: 0.2})
            },
            cooldown: new Decimal(22),

            passive: true,
            onPassive(index, slot, target) {
                if (!player.bh.celestialite.actions[3].variables.attacks) player.bh.celestialite.actions[3].variables.attacks = 0
                if (player.bh.celestialite.health.lt(500) && player.bh.celestialite.attackID == 0 && player.bh.celestialite.actions[3].variables.attacks == 0) {
                    screenFlash("", 200)
                    setTimeout(() => {
                    player.bh.celestialite.attackTimeout = [1, new Decimal(25)]
                    bulletHellBlue({"zarUltimateAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 6, spawnPerSec: 4, bulletPerSec: 6, enemySpeed: 3, spikeSize: 28, platformSpikeChance: 0.1, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203, diceSpikes: true, bulletPerSec: 10}}, {width: window.innerWidth, height: window.innerHeight, duration: 25, transparent: true, saveContent: true, jumpMin:6, jumpMax:350, gravity: 0.2})
                    }, 200)
                    player.bh.celestialite.actions[3].variables.attacks = 1
                }
                if (player.bh.celestialite.attackID == 1 && player.bh.celestialite.actions[3].variables.attacks == 1) {
                    player.bh.celestialite.attackTimeout = [2, new Decimal(15)]
                    screenFlash("", 200)
                    setTimeout(() => {
                    player.bh.celestialite.attackTimeout = [2, new Decimal(15)]
                    bulletHell({"diceSpikes": {spawnPerSec: 6, bulletPerSec: 6, enemySpeed: 4, bulletSpeed: 2, spikeSize: 28, rain: true}}, {width: window.innerWidth, height: window.innerHeight, duration: 15, transparent: true})
                    }, 200)
                    player.bh.celestialite.actions[3].variables.attacks = 2
                }
                if (player.bh.celestialite.attackID == 2 && player.bh.celestialite.actions[3].variables.attacks == 2) {
                    celestialiteDeath()
                    player.zarDungeon.zarDefeated = true
                }
            },
        },
    },
    reward() {
        let gain = {}

        gain.pips = new Decimal(50)
        return gain
    },
}

/*
    if (attackVariable == 0)
    {
        player.zarDungeon.barrageActive = true
        screenFlash("", 200)
        setTimeout(() => {
        bulletHellBlue({"zarUltimateAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 6, spawnPerSec: 4, bulletPerSec: 6, enemySpeed: 3, spikeSize: 28, platformSpikeChance: 0.1, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203, diceSpikes: true, bulletPerSec: 10}}, {width: window.innerWidth, height: window.innerHeight, duration: 25, transparent: true, saveContent: true, jumpMin:6, jumpMax:350, gravity: 0.2})
        }, 200)
        setTimeout(() => {
        zarFinalAttack(1)
        }, 25200)
    } 
    else if (attackVariable == 1)
    {
        player.zarDungeon.barrageActive = true
        screenFlash("", 200)
        setTimeout(() => {
        bulletHell({"diceSpikes": {spawnPerSec: 6, bulletPerSec: 6, enemySpeed: 4, bulletSpeed: 2, spikeSize: 28, rain: true}}, {width: window.innerWidth, height: window.innerHeight, duration: 15, transparent: true})
        }, 200)
        setTimeout(() => {
        if (player.bh.currentStage == "zarDungeon")
        {
            celestialiteDeath()
            player.zarDungeon.barrageActive = false
            player.zarDungeon.zarDefeated = true
        }
        }, 15200)
    }
*/

function zarAttackBarrage(attackVariable) {
    if (attackVariable == 0)
    {
        player.zarDungeon.barrageActive = true
        screenFlash("", 200)
        setTimeout(() => {
        bulletHellBlue({"diceSpikesPlatformer": {bulletPerSec: 1.2, enemySpeed: 3, spikeHeight: 80, spikeWidth: 60}}, {width:800, height:300, duration:3, jumpMin:6, jumpMax:150, gravity: 0.2})
        }, 200)
        setTimeout(() => {
        zarAttackBarrage(getRandomInt(4))
        }, 3200)
    } 
    else if (attackVariable == 1)
    {
        player.zarDungeon.barrageActive = true
        screenFlash("", 200)
        setTimeout(() => {
        bulletHell({"pipRainUltimate": {bulletPerSec: 4}}, {width:800, height:600, duration:3,})
        }, 200)
        setTimeout(() => {
        zarAttackBarrage(getRandomInt(4))
        }, 3200)
    }
    else if (attackVariable == 2)
    {
        player.zarDungeon.barrageActive = true
        screenFlash("", 200)
        setTimeout(() => {
        bulletHellBlue({"dieBouncer": {dieAmount: 1, size: 50, enemySpeed: 3, chargeMult: 1.6, spikeSpeed:5, spikeRadius:30, lastTick:false}}, {width: 800, height: 600, duration: 3, jumpMin:6, jumpMax:250, gravity: 0.2})
        }, 200)
        setTimeout(() => {
        zarAttackBarrage(getRandomInt(5))
        }, 3200)
    } 
    else if (attackVariable == 3)
    {
        player.zarDungeon.barrageActive = true
        screenFlash("", 200)
        setTimeout(() => {
            bulletHellBlue({"spikePlatformAttack": {spikeHeight: 50, spikeWidth: 28, platformCount: 4, platformSpikeChance: 0, platformSpeed: 1.5, platformMinW: 203, platformMaxW: 203}}, {width:800, height:600, duration:3, jumpMin:6, jumpMax:250, gravity: 0.2})
        }, 200)
        setTimeout(() => {
        zarAttackBarrage(getRandomInt(5))
        }, 3200)
    } else if (attackVariable == 4)
    {
        screenFlash("", 200)
        setTimeout(() => {
            bulletHell({"diceSpikes": {spawnPerSec: 10, enemySpeed: 3.5, spikeSize: 28,}}, {width: window.innerWidth, height: window.innerHeight, duration: 10, transparent: true})
        }, 200)
        setTimeout(() => {
        player.zarDungeon.barrageActive = false
        }, 3200)
    }
}

window.addEventListener('load', (event) => {
    setTimeout(() => {
    if (player && player.zarDungeon && player.zarDungeon.barrageActive)
    {
        zarFinalAttack(0)
    }
    }, 500)
});

//bulletHell({"diceAttack": {diceAmount: 8, intervalDiv: 0.5}}, {duration: 10})
