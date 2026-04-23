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

        deck: [],

        dealerScore: new Decimal(0),
        playerScore: new Decimal(0),

        dealerHand: [],
        playerHand: [],

        dealerHandImages: [],
        playerHandImages: [],

        gameOver: false,
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
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 1000, y: 450, text: "You win!"})
            } else if (winner == 'push') {
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: 1000, y: 450, text: "It's a tie!"})
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
            title() { return "<h3>Start Game" },
            canClick() { return player.zd.gameOver },
            unlocked() { return true },
            onClick() {
                layers.zd.startGame();
                player.zd.gameOver = false
            },
            style: { width: '100px', "min-height": '100px', color: "black", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px" },
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
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Zar Chips": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.za.zarUnlocked },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                    ["raw-html", () => {return "Your Hand"}, {color: "#1f1f1f", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "785px", height: "30px", backgroundColor: "#dadada", border: "3px solid #7f7f7f", userSelect: "none"}],
                    ["style-row", [
                    ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105], ["clickable", 106], ["clickable", 107], ["clickable", 108]]], 
                    ["raw-html", function () { return "&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["raw-html", () => {return "Hand Value: " + formatWhole(player.zd.playerScore)}, {color: "#dadada", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "775px", height: "135px", backgroundColor: "#303030", border: "3px solid #7f7f7f", borderTop: "0px", borderBottom: "0px", padding: "5px"}],
                    ["style-column", [
                    ["raw-html", () => {return "Zar's Hand"}, {color: "#1f1f1f", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "785px", height: "30px", backgroundColor: "#dadada", border: "3px solid #7f7f7f", borderBottom: "3px solid #7f7f7f", userSelect: "none"}],
                    ["style-row", [
                    ["row", [["clickable", 201], ["clickable", 202], ["clickable", 203], ["clickable", 204], ["clickable", 205], ["clickable", 206], ["clickable", 207], ["clickable", 208]]],
                                        ["raw-html", function () { return "&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["raw-html", () => {return "Hand Value: " + formatWhole(player.zd.dealerScore)}, {color: "#dadada", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "775px", height: "135px", backgroundColor: "#303030", border: "3px solid #7f7f7f", borderTop: "0px", borderBottom: "0px", padding: "5px"}],
                    ["style-row", [
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13],]],
                    ], {width: "775px", height: "135px", backgroundColor: "#7f7f7f", border: "3px solid #dadada", borderTop: "0px", padding: "5px"}],
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