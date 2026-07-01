addLayer("ak", {
    name: "Akash, Celestial of Puzzles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/akash.png'style='width:67px;height:67px;margin:0px;'></img>", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UZ",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        puzzlePoints: new Decimal(0),
        bestPuzzlePoints: new Decimal(0),
        puzzlePointsPerSecond: new Decimal(0),

        guess: '',
        log: [],

        akashUnlocked: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(135deg, #ff0080ff 0%, #e00070ff 50%, #ff0080ff 100%)",
            backgroundOrigin: "border-box",
            color: "#ff0080",
            borderColor: "#ff008000",
            borderRadius: "5px",
        }
    },
    tooltip: "Akash, the Celestial of Puzzles",
    color: "#ff0080ff",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.ak.guess === "") {player.ak.guess = "‍"}

        if (player.ak.guess.includes("‍") && player.ak.guess.length > 1) {
            player.ak.guess = player.ak.guess.replaceAll("‍", "")
        }
    },
    clickables: {
        0: {
            title: "SUBMIT",
            unlocked() { return true },
            onClick() {
                let guessFormat = player.ak.guess.toUpperCase().replaceAll(" ", "")
                if (player.ak.guess.toUpperCase() === "ELYSIAN") { 
                    // doPopup("none", "Correct!", "Guess: " + guessFormat, 5, "#40ff40", "")
                    logPrintOne("<span style='color: #40ff40;'>Your guess, " + guessFormat + ", is correct!</span>")
                    player.ak.akashUnlocked = true;
                }
                /*
                else if (player.ak.guess.toUpperCase() === "ELYSIAN" && player.ak.guess !== "ELYSIAN") {
                    doPopup("none", "Must be in all caps!<br>(See 'Help' tab)", "Guess: " + player.ak.guess, 5, "#ffff40", "")
                }*/
                else {
                    // doPopup("none", "Incorrect!", "Guess: " + guessFormat, 5, "#ff4040", "")
                    logPrintOne("<span style='color: #ff4040;'>Your guess, " + guessFormat + ", is incorrect!</span>")
                }
            },
            canClick() {
                return !player.ak.akashUnlocked
            },
            style() {
                let look = {width: "80px", minHeight: "40px", fontSize: "10px", borderRadius: "10px"}
                this.canClick() ? look.background = "linear-gradient(135deg, #ff0080ff 0%, #e00070ff 50%, #ff0080ff 100%)" : look.background = "#bf8f8f"
                return look
            },
        },
    },
    bars: {},
    upgrades: {
        11: {
            title: "And so it begins...",
            unlocked() { return true },
            description: "Unlock Elements.",
            cost: new Decimal(0),
            currencyLocation() { return player.ak },
            currencyDisplayName: "Puzzle Points",
            currencyInternalName: "puzzlePoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Basic Stuff",
            body() { return "So, how do you solve a puzzlehunt puzzle? Well, there are many different types. But most of the time, they don't give you the rules directly. Meaning, you'll often need to think outside the box and get creative.<br><br>The answer to a puzzlehunt puzzle is almost always a word or phrase.<br><br>In this universe, answers are not case-sensitive, but will always be shown as uppercase and without spaces.<br><br>That's all you need to know for now. It will get more complicated later." },
            unlocked: true,
            style: { "color": "rgb(255, 0, 128)" }
        },
    },
    microtabs: {
        stuff: {
            "Unlock": {
                buttonStyle() { return { color: "black", borderRadius: "5px", background: "linear-gradient(135deg, #ff0080ff 0%, #e00070ff 50%, #ff0080ff 100%)", borderColor: "#ff008000" } },
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["scroll-column", [
                            ["blank", "15px"],
                            ["style-column", [
                                ["blank", "5px"],
                                ["raw-html", "<h2>Puzzle 1: Replacement</h2><br><h5>Difficulty: <span style='background-color: #c0ff80; color: #000'>1.0</span></h5>", {fontSize: "24px", color: "#ff0080", fontFamily: "monospace"}],
                                ["blank", "5px"],
                                ["row", [
                                    ["raw-html", "<h5>Guess: </h5>", {fontSize: "24px", color: "#ff0080", fontFamily: "monospace"}],
                                    ["blank", "25px"],
                                    ["text-input", "guess", {width: "240px", height: "40px", backgroundColor: "rgba(255,0,128,0.5)", color: "white", fontSize: "20px", border: "0px", padding: "0px 10px", borderRadius: "5px",}],
                                    ["blank", "25px"],
                                    ["clickable", 0],
                                ]]
                            ], {width: "700px", background: "rgba(0,0,0,0)", paddingBottom: "10px", borderRadius: "15px"}],
                            ["blank", "5px"],
                            ["style-row", [], {width: "700px", height: "4px", background: "#ff0080", marginBottom: "10px"}],
                            ["blank", "10px"],
                            ["style-column", [
                                ["blank", "5px"],
                                ["raw-html", "<i><h5>Well, since my celestial power is being good at puzzles, how about you solve a puzzle to unlock my upgrades? Don't worry, it's really easy! Just substitute the numbers with their corresponding letters!</h5></i>", {fontSize: "24px", color: "#ff0080", fontFamily: "monospace"}],
                                ["blank", "50px"],
                                ["raw-html", "<h3>5, 12, 25, 19, 9, 1, 14.</h3>", {fontSize: "24px", color: "#ff0080", fontFamily: "monospace"}],
                                ["blank", "50px"],
                                ["raw-html", "<h4>A = 1<br>B = 2<br>C = 3<br>...<br>Z = 26</h4>", {fontSize: "24px", color: "#ff0080", fontFamily: "monospace"}],
                            ], {width: "700px", background: "rgba(0,0,0,0)", paddingBottom: "10px", borderRadius: "15px"}],
                            ["blank", "5px"],
                            ["style-row", [], {width: "700px", height: "4px", background: "#ff0080", marginBottom: "10px"}],
                            ["blank", "10px"],
                            ["raw-html", "<h4>Guess Log:</h4>", {fontSize: "24px", color: "#ff0080", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["style-column", [
                                ["raw-html", () => `${player.ak.log.map((x, i) => `<span style="display:block;">${x}</span>`).join("")}`],
                            ], {width: "600px", textAlign: "center", background: "rgba(0,0,0,0.5)", border: "4px solid #ff0080", borderRadius: "30px", padding: "12px 0", margin: "5px"}],
                            ["blank", "15px"],
                        ], {width: "700px", height: "650px", overflowX: "hidden"}],
                    ], {width: "700px", height: "650px", border: "4px solid #ff0080", borderRadius: "10px", background: "rgba(0,0,0,0.5)"}],
                    
                ]
            },
            "Main": {
                buttonStyle() { return { color: "black", borderRadius: "5px", background: "linear-gradient(135deg, #ff0080ff 0%, #e00070ff 50%, #ff0080ff 100%)", borderColor: "#ff008000" } },
                unlocked() { return player.ak.akashUnlocked; },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["blank", "5px"],
                        ["raw-html", function () { return "Akash's Upgrades:" }, { "color": "#ff0080", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "5px"],
                        ["row", [ ["upgrade", 11],]],
                        ["blank", "5px"],
                    ], {width: "800px", background: "rgba(0,0,0,0.5)", border: "4px solid #ff0080", borderRadius: "15px"}],
                ]
            },
            "Help": {
                buttonStyle() { return { color: "black", borderRadius: "5px", background: "linear-gradient(135deg, #ff0080ff 0%, #e00070ff 50%, #ff0080ff 100%)", borderColor: "#ff008000" } },
                unlocked() { return true; },
                content: [
                    ["blank", "15px"],
                    ["infobox", 1]
                ]
            }
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.ak.puzzlePoints) + "</h3> puzzle points. (+" + format(player.ak.puzzlePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && !player.sma.inStarmetalChallenge},
})

function logPrintOne(line) {
    player.ak.log.push(line); // Push the raw HTML string directly
}
