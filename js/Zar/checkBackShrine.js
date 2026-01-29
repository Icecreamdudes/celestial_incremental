addLayer("cbs", {
    name: "Check Back Shrine", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h4>CBS", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "DS",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        ascensionShards: new Decimal(0),
    }},
    nodeStyle() {
        return {
            background: "linear-gradient(180deg, #094599 0%, #062a5eff 50%, #094599 100%)",
            "background-origin": "border-box",
            "border-color": "#3466acff",
            "color": "#3466acff",
            borderRadius: "4px",
            transform: "translateX(-100px)",
        }
    },
    tooltip: "Check Back Shrine",
    color: "#3466acff",
    branches: ["sm",],
    update(delta) {
    },
    clickables: {
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Ritual": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                                                                    ["left-row", [
                    ["blank", "25px"],
                                ["tooltip-row", [
                ["raw-html", "<img src='resources/ascensionShard.png'style='width:75px;height:75px;margin:12.5px'></img>", {width: "100px", height: "100px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cbs.ascensionShards)}, {width: "95px", height: "100px", color: "#c6f7ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px", fontSize: "24px"}],
                ["raw-html", "<div class='bottomTooltip'>Ascension Shards<hr><small>(Gained from ascension rituals)</small></div>"],
            ], {width: "700px", height: "100px"}],
        ], {width: "700px", height: "100px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px 10px 0px 0px", userSelect: "none"}],
                                                ["left-row", [
                    ["blank", "25px"],
                ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "348px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "350px", height: "50px", borderRight: "0px solid white"}],
        ], {width: "700px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "0px 0px 10px 10px", borderTop: "0px",  userSelect: "none"}],
                    ["blank", "25px"],
                ]
            },
            "Shard Mine": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
            ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "150px", height: "50px"}],
        ], {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                ]
            },
            "Shrine": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                                                                    ["left-row", [
                    ["blank", "25px"],
                                ["tooltip-row", [
                ["raw-html", "<img src='resources/ascensionShard.png'style='width:75px;height:75px;margin:12.5px'></img>", {width: "100px", height: "100px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cbs.ascensionShards)}, {width: "95px", height: "100px", color: "#c6f7ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px", fontSize: "24px"}],
                ["raw-html", "<div class='bottomTooltip'>Ascension Shards<hr><small>(Gained from ascension rituals)</small></div>"],
            ], {width: "700px", height: "100px"}],
        ], {width: "700px", height: "100px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px 10px 0px 0px", userSelect: "none"}],
                                                ["left-row", [
                    ["blank", "25px"],
                ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "348px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "350px", height: "50px", borderRight: "0px solid white"}],
        ], {width: "700px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "0px 0px 10px 10px", borderTop: "0px",  userSelect: "none"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.za.chancePoints) + "</h3> chance points. (+" + format(player.za.chancePointsPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", () => { return player.za.chancePoints.gte(player.za.chancePointsSoftcapStart) ? "After " + format(player.za.chancePointsSoftcapStart) + " chance points, gain is divided by /" + format(player.za.chancePointsSoftcapEffect) + "." : "Softcap start: " + format(player.za.chancePointsSoftcapStart) + "." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("za", 19) && !player.sma.inStarmetalChallenge}
})

// Basic RitualArena class that covers the entire screen with ship features
class RitualArena extends SpaceArena {
    constructor() {
        super(window.innerWidth, window.innerHeight);
        this.spawnArena();
    }

    spawnArena() {
        this.arenaDiv = document.createElement('div');
        this.arenaDiv.id = 'ritual-arena';
        Object.assign(this.arenaDiv.style, {
            position: 'fixed',
            left: '0',
            top: '0',
            width: '100vw',
            height: '100vh',
            background: "linear-gradient(180deg, #4f6b92ff 0%, #3a4d68ff 50%, #4f6b92ff 100%)",
            zIndex: '9999'
        });
        document.body.appendChild(this.arenaDiv);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.arenaDiv.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    removeArena() {
        if (this.arenaDiv && this.arenaDiv.parentNode) {
            this.arenaDiv.parentNode.removeChild(this.arenaDiv);
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    start() {
        let lastTime = 0;
        const loop = (currentTime) => {
            const delta = currentTime - lastTime;
            lastTime = currentTime;
            this.update(delta);
            this.draw();
            this.animationFrame = requestAnimationFrame(loop);
        };
        this.animationFrame = requestAnimationFrame(loop);
    }
}
