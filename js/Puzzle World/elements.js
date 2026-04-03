addLayer("el", {
    name: "Elements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EL", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UZ",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        guess: '',
        log: [],

        elementsUnlocked: false,

        currentElement: 0,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, #edf 0%, #cbd 100%)",
            "background-origin": "border-box",
        }
    },
    tooltip: "Elements",
    color: "#edf",
    branches: ["ak"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.el.guess === "") {player.el.guess = "‍"}

        if (player.el.guess.includes("‍") && player.el.guess.length > 1) {
            player.el.guess = player.el.guess.replaceAll("‍", "")
        }
    },
    clickables: {
        0: {
            title: "SUBMIT",
            unlocked() { return true },
            onClick() {
                let guessFormat = player.el.guess.toUpperCase().replaceAll(" ", "")
                if (player.el.guess.toUpperCase() === "PRINCESS") { 
                    player.el.elementsUnlocked = true;
                    // doPopup("none", "Correct!", "Guess: " + guessFormat, 5, "#40ff40", "")
                    logPrintTwo("<span style='color: #40ff40;'>Your guess, " + guessFormat + ", is correct!</span>")
                }
                else {
                    // doPopup("none", "Incorrect!", "Guess: " + guessFormat, 5, "#ff4040", "")
                    logPrintTwo("<span style='color: #ff4040;'>Your guess, " + guessFormat + ", is incorrect!</span>")
                }
            },
            canClick() {
                return !player.el.elementsUnlocked
            },
            style() {
                let look = {width: "80px", minHeight: "40px", fontSize: "10px", borderRadius: "10px"}
                this.canClick() ? look.background = "#edf" : look.background = "#bf8f8f"
                return look
            },
        },
        // element clickables
        "1-H": {
            title: "1<br><h2>H</h2><br>1.008",
            unlocked() { return player.el.elementsUnlocked; },
            onClick() {
                player.el.currentElement = 1
            },
            canClick() {
                return true
            },
            style() {
                let look = {width: "50px", minHeight: "50px", fontSize: "6px", borderRadius: "10px"}
                if (player.el.currentElement == 1) {
                    look.background = "linear-gradient(135deg, #ff0080ff 0%, #e00070ff 50%, #ff0080ff 100%)"
                }
                else {
                    look.background = "#edf"
                }
                return look
            }
        },
        "2-He": {
            title: "2<br><h2>He</h2><br>4.00",
            unlocked() { return player.el.elementsUnlocked; },
            onClick() {
                player.el.currentElement = 2
            },
            canClick() {
                return true
            },
            style() {
                let look = {width: "50px", minHeight: "50px", fontSize: "6px", borderRadius: "10px"}
                if (player.el.currentElement == 2) {
                    look.background = "linear-gradient(135deg, #ff0080ff 0%, #e00070ff 50%, #ff0080ff 100%)"
                }
                else {
                    look.background = "#edf"
                }
                return look
            }
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Unlock": {
                buttonStyle() { return { color: "black", borderRadius: "5px", background: "#edf", borderColor: "#ff008000" } },
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["scroll-column", [
                            ["blank", "15px"],
                            ["style-column", [
                                ["blank", "5px"],
                                ["raw-html", "<h2>Puzzle 2: Atomic Numbers</h2><br><h5>Difficulty: <span style='background-color: #ffe080; color: #000'>2.5</span></h5>", {fontSize: "24px", color: "#cbd", fontFamily: "monospace"}],
                                ["blank", "5px"],
                                ["row", [
                                    ["raw-html", "<h5>Guess: </h5>", {fontSize: "24px", color: "#cbd", fontFamily: "monospace"}],
                                    ["blank", "25px"],
                                    ["text-input", "guess", {width: "240px", height: "40px", backgroundColor: "rgba(204, 187, 221,0.5)", color: "white", fontSize: "20px", border: "0px", padding: "0px 10px", borderRadius: "5px",}],
                                    ["blank", "25px"],
                                    ["clickable", 0],
                                ]]
                            ], {width: "700px", background: "rgba(0,0,0,0)", paddingBottom: "10px", borderRadius: "15px"}],
                            ["blank", "5px"],
                            ["style-row", [], {width: "700px", height: "4px", background: "#cbd", marginBottom: "10px"}],
                            ["blank", "10px"],
                            ["style-column", [
                                ["blank", "5px"],
                                ["raw-html", "<i><h5>We need to use a different conversion table here... perhaps one that is periodic.</h5></i>", {fontSize: "24px", color: "#cbd", fontFamily: "monospace"}],
                                ["blank", "50px"],
                                ["raw-html", "<h3>59, 49, 58, 16, 16.</h3>", {fontSize: "24px", color: "#cbd", fontFamily: "monospace"}],
                                ["blank", "50px"],
                                ["style-column", [
                                    ["raw-html", "47", {fontSize: "24px", color: "#cbd", fontFamily: "monospace"}],
                                    ["blank", "10px"],
                                    ["raw-html", "<h1>Ag</h1>", {fontSize: "24px", color: "#cbd", fontFamily: "monospace"}],
                                    ["blank", "10px"],
                                    ["raw-html", "107.87", {fontSize: "24px", color: "#cbd", fontFamily: "monospace"}],
                                ], {width: "150px", minHeight: "150px", background: "rgba(0,0,0,0.5)", border: "4px solid #cbd", borderRadius: "30px", padding: "12px 0", margin: "5px auto"}],
                            ], {width: "700px", background: "rgba(0,0,0,0)", paddingBottom: "10px", borderRadius: "15px"}],
                            ["blank", "5px"],
                            ["style-row", [], {width: "700px", height: "4px", background: "#cbd", marginBottom: "10px"}],
                            ["blank", "10px"],
                            ["raw-html", "<h4>Guess Log:</h4>", {fontSize: "24px", color: "#cbd", fontFamily: "monospace"}],
                            ["blank", "5px"],
                            ["style-column", [
                                ["raw-html", () => `${player.el.log.map((x, i) => `<span style="display:block;">${x}</span>`).join("")}`],
                            ], {width: "600px", textAlign: "center", background: "rgba(0,0,0,0.5)", border: "4px solid #cbd", borderRadius: "30px", padding: "12px 0", margin: "5px"}],
                            ["blank", "15px"],
                        ], {width: "700px", height: "650px", overflowX: "hidden"}],
                    ], {width: "700px", height: "650px", border: "4px solid #cbd", borderRadius: "10px", background: "rgba(0,0,0,0.5)"}],
                    
                ]
            },
            "Periodic Table": {
                buttonStyle() { return { color: "black", borderRadius: "5px", background: "#edf", borderColor: "#ff008000" } },
                unlocked() { return player.el.elementsUnlocked; },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => "HIO<sub>4</sub> is periodic acid"],
                    ["blank", "15px"],
                    ["row", [
                        ["clickable", "1-H"],
                        ["blank", ["800px", "50px"]],
                        ["clickable", "2-He"],
                    ]]
                ]
            },
        },
    },
    tabFormat: [
                ["raw-html", function () { return "You have <h3>" + format(player.ak.puzzlePoints) + "</h3> puzzle points. (+" + format(player.ak.puzzlePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return hasUpgrade("ak", 11) && !player.sma.inStarmetalChallenge},
    
})

function logPrintTwo(line) {
    player.el.log.push(line); // Push the raw HTML string directly
}
