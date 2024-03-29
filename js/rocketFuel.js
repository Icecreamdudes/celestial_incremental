addLayer("rf", {
    name: "Rocket Fuel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RF", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {
    },
    nodeStyle() {
        function degreesToRadians(degrees) {
            return (degrees * Math.PI) / 180;
        }
        
        // Define the base hue value for dark blue (between 0 and 360 degrees)
        const darkBlueHue = 210;
        
        // Define the base lightness values for dark blue and light gray (between 0 and 100%)
        const darkBlueLightness = 20; // Adjust for darker blue
        const lightGrayLightness = 80; // Adjust for lighter gray
        
        // Calculate the current lightness value based on time (smoothly oscillating between dark blue and light gray)
        const currentTime = new Date().getTime();
        const lightnessOffset = (Math.sin(currentTime / 400) + 1) / 9; // Adjust the divisor to change oscillation speed
        const lightness1 = darkBlueLightness + (lightnessOffset * (lightGrayLightness - darkBlueLightness));
        const lightness2 = lightGrayLightness - (lightnessOffset * (lightGrayLightness - darkBlueLightness));
        
        // Create the gradient string using the HSL colors
        const gradient = `linear-gradient(to right, hsl(${darkBlueHue}, 80%, ${lightness1}%), hsl(${darkBlueHue}, 80%, ${lightness2}%))`;
        
        return {
            background: gradient,
            "background-origin": "border-box",
            "border-color": "#119B35",
        }
    },
    tooltip: "Ranks",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["gh", "p", "cb"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                ]

            },
        },
    }, 

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.po.rocketFuel }
})