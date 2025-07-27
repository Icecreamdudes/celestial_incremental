addLayer("stats", {
    name: "Stats", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "STT", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {},
    nodeStyle() {},
    tooltip: "Stats",
    color: "white",
    branches: ["branch"],
    clickables: {
        2: {
            title() { return "Settings" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "settings"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        3: {
            title() { return "Stats" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "stats"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        4: {
            title() { return "Savebank" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "savebank"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        5: {
            title() { return "Changelog" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "changelog"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        6: {
            title() { return "Credits" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "credits"
            },
            style: { width: '125px', minHeight: '50px', color: "white", background: "black", borderRadius: '0px', border: "2px solid white", margin: "0px 5px" },
        },
        11: {
            title() { return "Info" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["stats"]["Tabs"] = "Info"
            },
            style: { width: '100px', minHeight: '50px', color: 'black', background: 'grey', borderRadius: '0px', border: '2px solid white'},
        },
        12: {
            title() { return "Universe 1" },
            canClick() { return true },
            unlocked() { return layerShown('i') },
            onClick() {
                player.subtabs["stats"]["Tabs"] = "Universe 1"
            },
            style: { width: '150px', minHeight: '50px', color: 'black', background: 'linear-gradient(315deg, #bababa 0%, #efefef 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        13: {
            title() { return "Check Back" },
            canClick() { return true },
            unlocked() { return layerShown('cb') },
            onClick() {
                player.subtabs["stats"]["Tabs"] = "Check Back"
            },
            style: { width: '150px', minHeight: '50px', color: 'black', background: '#06366e', borderRadius: '0px', border: '2px solid white'},
        },
        14: {
            title() { return "Universe 2" },
            canClick() { return true },
            unlocked() { return layerShown('in') },
            onClick() {
                player.subtabs["stats"]["Tabs"] = "Universe 2"
            },
            style: { width: '150px', minHeight: '50px', color: 'black', background: 'linear-gradient(140deg, #10e96b 0%, #0f871c 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        15: {
            title() { return "Universe A1" },
            canClick() { return true },
            unlocked() { return layerShown('cp') },
            onClick() {
                player.subtabs["stats"]["Tabs"] = "Universe A1"
            },
            style: { width: '150px', minHeight: '50px', color: 'black', background: 'linear-gradient(45deg, #064461 0%, #4a7d94 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        16: {
            title() { return "Universe 3" },
            canClick() { return true },
            unlocked() { return layerShown('s') },
            onClick() {
                player.subtabs["stats"]["Tabs"] = "Universe 3"
            },
            style: { width: '150px', minHeight: '50px', color: 'black', background: 'linear-gradient(140deg, red 0%, black 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        17: {
            title() { return "Universe α" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
                player.subtabs["stats"]["Tabs"] = "Universe α"
            },
            style: { width: '150px', minHeight: '50px', color: 'black', background: 'linear-gradient(45deg, #f6e000 0%, #f9c901 100%)', borderRadius: '0px', border: '2px solid white'},
        },
        201: {
            title() { return "Check Back XP" },
            canClick() { return true },
            unlocked() { return layerShown('cb') },
            onClick() {
                player.subtabs["stats"]["CB"] = "Check Back XP"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: '#06366e', borderRadius: '0px', border: '2px solid #052F60'},
        },
        202: {
            title() { return "XP Button Cooldown" },
            canClick() { return true },
            unlocked() { return layerShown('cb') },
            onClick() {
                player.subtabs["stats"]["CB"] = "XP Button Cooldown"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: '#06366e', borderRadius: '0px', border: '2px solid #052F60'},
        },
        301: {
            title() { return "Infinity Points" },
            canClick() { return true },
            unlocked() { return layerShown('ip') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Infinity Points"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)', borderRadius: '0px', border: '2px solid #7c5423'},
        },
        302: {
            title() { return "Infinities" },
            canClick() { return true },
            unlocked() { return layerShown('ip') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Infinities"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)', borderRadius: '0px', border: '2px solid #7c5423'},
        },
        303: {
            title() { return "Antimatter" },
            canClick() { return true },
            unlocked() { return layerShown('ad') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Antimatter"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(140deg, rgba(0,255,202,1) 0%, rgba(30,181,22,1) 100%)', borderRadius: '0px', border: '2px solid #119B35'},
        },
        304: {
            title() { return "Antimatter Dimensions" },
            canClick() { return true },
            unlocked() { return layerShown('ad') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Antimatter Dimensions"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(140deg, rgba(0,255,202,1) 0%, rgba(30,181,22,1) 100%)', borderRadius: '0px', border: '2px solid #119B35'},
        },
        305: {
            title() { return "Tickspeed" },
            canClick() { return true },
            unlocked() { return layerShown('ad') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Tickspeed"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(140deg, rgba(0,255,202,1) 0%, rgba(30,181,22,1) 100%)', borderRadius: '0px', border: '2px solid #119B35'},
        },
        306: {
            title() { return "Negative Infinity Points" },
            canClick() { return true },
            unlocked() { return layerShown('ta') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Negative Infinity Points"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: '#008080', background: 'linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)', borderRadius: '0px', border: '2px solid #31aeb0'},
        },
        307: {
            title() { return "Dimension Power" },
            canClick() { return true },
            unlocked() { return layerShown('ta') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Dimension Power"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: '#008080', background: 'linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)', borderRadius: '0px', border: '2px solid #31aeb0'},
        },
        308: {
            title() { return "Alternative Infinities" },
            canClick() { return true },
            unlocked() { return layerShown('tad') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Alternative Infinities"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: '#b2d8d8', background: 'linear-gradient(150deg, #b2d8d8, 50%, #094242 100%)', borderRadius: '0px', border: '2px solid #b2d8d8'},
        },
        309: {
            title() { return "Broken Infinities" },
            canClick() { return true },
            unlocked() { return layerShown('bi') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Broken Infinities"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(150deg, #889110, 0%, #73A112 100%)', borderRadius: '0px', border: '2px solid #2B7F0A'},
        },
        310: {
            title() { return "Dice Mastery Points" },
            canClick() { return true },
            unlocked() { return layerShown('om') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Dice Mastery Points"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', borderRadius: '0px', border: '2px solid purple'},
        },
        311: {
            title() { return "Rocket Fuel Mastery Points" },
            canClick() { return true },
            unlocked() { return layerShown('om') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Rocket Fuel Mastery Points"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', borderRadius: '0px', border: '2px solid purple'},
        },
        312: {
            title() { return "Hex Mastery Points" },
            canClick() { return true },
            unlocked() { return layerShown('om') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Hex Mastery Points"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', borderRadius: '0px', border: '2px solid purple'},
        },
        313: {
            title() { return "Infinity Power" },
            canClick() { return true },
            unlocked() { return layerShown('id') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Infinity Power"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(315deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)', borderRadius: '0px', border: '2px solid #b87400'},
        },
        314: {
            title() { return "Infinity Dimensions" },
            canClick() { return true },
            unlocked() { return layerShown('id') },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Infinity Dimensions"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(315deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)', borderRadius: '0px', border: '2px solid #b87400'},
        },
        315: {
            title() { return "Replicanti Chance" },
            canClick() { return true },
            unlocked() { return layerShown('ca') && player.ca.unlockedCante },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Replicanti Chance"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)', borderRadius: '0px', border: '2px solid #0f354c'},
        },
        316: {
            title() { return "Replicanti Multiplier" },
            canClick() { return true },
            unlocked() { return layerShown('ca') && player.ca.unlockedCante },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Replicanti Multiplier"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)', borderRadius: '0px', border: '2px solid #0f354c'},
        },
        317: {
            title() { return "Replicanti Interval" },
            canClick() { return true },
            unlocked() { return layerShown('ca') && player.ca.unlockedCante },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Replicanti Interval"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)', borderRadius: '0px', border: '2px solid #0f354c'},
        },
        318: {
            title() { return "Cante Energy Multiplier" },
            canClick() { return true },
            unlocked() { return layerShown('ca') && player.ca.unlockedCante },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Cante Energy Multiplier"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'black', background: 'linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)', borderRadius: '0px', border: '2px solid #0f354c'},
        },
        319: {
            title() { return "Galaxy Dust" },
            canClick() { return true },
            unlocked() { return layerShown('ca') && player.ca.unlockedCante && hasUpgrade("bi", 26) },
            onClick() {
                player.subtabs["stats"]["Uni2"] = "Galaxy Dust"
            },
            style: { width: '98px', minHeight: '50px', fontSize: '8px', color: 'white', background: '#333c81', borderRadius: '0px', border: '2px solid #241c44'},
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        Tabs: {
            "Info": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: 'black' },
                unlocked() { return true },
                content: [
                    ["row", [
                        ["scroll-column", [
                            ["blank", "25px"],
                            ["raw-html", "Misc Stats", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "25px"],
                            ["h-line", "248px"],
                            ["blank", "10px"],
                            ["raw-html", () => "Playtime<br>" + formatTime(player.timePlayed), {"color": "white", "font-size": "16px", "font-family": "monospace",}],
                            ["blank", "10px"],
                        ], {width: "250px", height: "400px", borderRight: "2px solid white"}],
                        ["scroll-column", [
                            ["blank", "50px"],
                            ["raw-html", "The Stats page shows your current stats, and what can effect their gains.<br>", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "50px"],
                            ["h-line", "546px"],
                            ["blank", "25px"],
                            ["raw-html", "The color of a stat modifier can tell you the status of that modifier.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "25px"],
                            ["raw-html", "If grey, it is inactive, and beneficial.", { "color": "grey", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["raw-html", "If maroon, it is inactive, and harmful.", { "color": "maroon", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["raw-html", "If white, it is active, beneficial, but not maxed.", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["raw-html", "If yellow, it is active, beneficial, and maxed.", { "color": "yellow", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["raw-html", "If red, it is active, and harmful.", { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "10px"],
                        ], {width: "548px", height: "400px"}],
                    ]],
                ]
            },
            "Universe 1": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: 'black' },
                unlocked() { return layerShown('i') },
                content: [
                    ["blank", "25px"],
                    
                ]
            },
            "Check Back": {
                buttonStyle() { return { color: 'white'}},
                style: { background: 'black' },
                unlocked() { return layerShown('cb')  },
                content: [
                    ["row", [
                        ["always-scroll-column", [
                            ["hoverless-clickable", 201], ["hoverless-clickable", 202]
                        ], {width: "116px", height: "500px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["buttonless-microtabs", "CB", { 'border-width': '0px' }],
                        ], {width: "682px", height: "500px"}],
                    ]],
                ]
            },
            "Universe 2": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: 'black' },
                unlocked() { return layerShown('in')  },
                content: [
                    ["row", [
                        ["always-scroll-column", [
                            ["hoverless-clickable", 301], ["hoverless-clickable", 302], ["hoverless-clickable", 303], ["hoverless-clickable", 304], ["hoverless-clickable", 305],
                            ["hoverless-clickable", 306], ["hoverless-clickable", 307], ["hoverless-clickable", 308], ["hoverless-clickable", 309], ["hoverless-clickable", 310],
                            ["hoverless-clickable", 311], ["hoverless-clickable", 312], ["hoverless-clickable", 313], ["hoverless-clickable", 314], ["hoverless-clickable", 315],
                            ["hoverless-clickable", 316], ["hoverless-clickable", 317], ["hoverless-clickable", 318], ["hoverless-clickable", 319]
                        ], {width: "116px", height: "500px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["buttonless-microtabs", "Uni2", { 'border-width': '0px' }],
                        ], {width: "682px", height: "500px"}],
                    ]],
                    
                ]
            },
            "Universe A1": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: 'black' },
                unlocked() { return layerShown('cp')  },
                content: [
                    ["blank", "25px"],
                    
                ]
            },
            "Universe 3": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: 'black' },
                unlocked() { return layerShown('s')  },
                content: [
                    ["blank", "25px"],
                    
                ]
            },
            "Universe α": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: 'black' },
                unlocked() { return false },
                content: [
                    ["blank", "25px"],
                    
                ]
            },
        },
        Uni1: {

        },
        CB: {
            "Check Back XP": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#021124', width: '682px', height: '500px' },
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Check Back XP", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "[Button 1] Base Value",
                            "1"
                        ], {color: "white", height: "40px"}],


                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "[Button 1] Total XP: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.cb.buttonBaseXP[0])}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "XP Button Cooldown": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#021124', width: '682px', height: '500px' },
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "XP Button Cooldown", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "[Button 1] Base Value",
                            () => { return formatTime(60)}
                        ], {color: "white", height: "40px"}],


                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "[Button 1] Current Cooldown: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return formatTime(player.cb.buttonTimersMax[0])}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },
        },
        Uni2: {
            "Infinity Points": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ip') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Infinity Points", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],
                    
                    ["always-scroll-column", [
                        ["stat-row", [
                            () => { return !player.in.breakInfinity ? "Base Value" : !hasUpgrade("bi", 111) ? "Base Value<br><h6>(log10((Points/1e308)+1)/10)" : !hasUpgrade("bi", 114) ? "Base Value<br><h6>((log10((Points/1e308)+1)/2)^1.25)" : "Base Value<br><h6>(log10((Points/1e308)+1)^1.5)"},
                            () => { return !player.in.breakInfinity ? "1" : !hasUpgrade("bi", 111) ? formatWhole(player.points.div(1e308).plus(1).log10().div(10)) : !hasUpgrade("bi", 114) ? formatWhole(player.points.div(1e308).plus(1).log10().div(2).pow(1.25)) : formatWhole(player.points.div(1e308).plus(1).log10().pow(1.5))}
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "Hex Blessing Buyable 1",
                            () => { return "x" + format(buyableEffect("h", 21))}
                        ], () => { return !(hasChallenge("ip", 13)) ? {display: "none !important"} : getBuyableAmount("h", 21).eq(0) ? { color: "grey" } : getBuyableAmount("h", 21).lt(layers.h.buyables[21].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Hex Blessing Buyable 2",
                            () => { return "x" + format(buyableEffect("h", 22))}
                        ], () => { return !(hasChallenge("ip", 13)) ? {display: "none !important"} : getBuyableAmount("h", 22).eq(0) ? { color: "grey" } : getBuyableAmount("h", 22).lt(layers.h.buyables[22].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "IP Buyable 1",
                            () => { return "x" + format(buyableEffect("ip", 11))}
                        ], () => { return !(hasChallenge("ip", 14)) ? {display: "none !important"} : getBuyableAmount("ip", 11).eq(0) ? { color: "grey" } : { color: "white" }}],
                        
                        ["stat-row", [
                            "Dice Effect: IP",
                            () => { return "x" + format(player.d.diceEffects[11])}
                        ], () => { return !(hasChallenge("ip", 15)) ? {display: "none !important"} : player.d.diceEffects[11].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Rocket Fuel IP Effect",
                            () => { return "x" + format(player.rf.abilityEffects[5])}
                        ], () => { return !(player.rf.abilitiesUnlocked[5]) ? {display: "none !important"} : player.rf.abilityEffects[5].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Check Back Buyable 2",
                            () => { return "x" + format(buyableEffect("cb", 12))}
                        ], () => { return !(hasChallenge("ip", 17)) ? {display: "none !important"} : getBuyableAmount("cb", 12).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Tav Buyable 1",
                            () => { return "x" + format(buyableEffect("ta", 33))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ta", 33).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "IP Upgrade (4, 2)",
                            () => { return "x" + format(upgradeEffect("ip", 42))}
                        ], () => { return !(hasUpgrade("ta", 14)) ? {display: "none !important"} : !hasUpgrade("ip", 42) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Infinity Factor 1",
                            () => { return "x" + format(buyableEffect("f", 41))}
                        ], () => { return !(hasUpgrade("ta", 15)) ? {display: "none !important"} : getBuyableAmount("f", 41).eq(0) ? { color: "grey" } : getBuyableAmount("f", 41).lt(layers.f.buyables[41].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Factor 2",
                            () => { return "x" + format(buyableEffect("f", 42))}
                        ], () => { return !(hasUpgrade("ta", 15)) ? {display: "none !important"} : getBuyableAmount("f", 42).eq(0) ? { color: "grey" } : getBuyableAmount("f", 42).lt(layers.f.buyables[42].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Factor 3",
                            () => { return "x" + format(buyableEffect("f", 43))}
                        ], () => { return !(hasUpgrade("ta", 15)) ? {display: "none !important"} : getBuyableAmount("f", 43).eq(0) ? { color: "grey" } : getBuyableAmount("f", 43).lt(layers.f.buyables[43].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Factor 4",
                            () => { return "x" + format(buyableEffect("f", 44))}
                        ], () => { return !(hasUpgrade("ta", 15)) ? {display: "none !important"} : getBuyableAmount("f", 44).eq(0) ? { color: "grey" } : getBuyableAmount("f", 44).lt(layers.f.buyables[44].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Factor 5",
                            () => { return "x" + format(buyableEffect("f", 45))}
                        ], () => { return !(hasUpgrade("ta", 15)) ? {display: "none !important"} : getBuyableAmount("f", 45).eq(0) ? { color: "grey" } : getBuyableAmount("f", 45).lt(layers.f.buyables[45].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Factor 6",
                            () => { return "x" + format(buyableEffect("f", 46))}
                        ], () => { return !(hasUpgrade("ta", 15)) ? {display: "none !important"} : getBuyableAmount("f", 46).eq(0) ? { color: "grey" } : getBuyableAmount("f", 46).lt(layers.f.buyables[46].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Factor 7",
                            () => { return "x" + format(buyableEffect("f", 47))}
                        ], () => { return !(hasUpgrade("ta", 15)) ? {display: "none !important"} : getBuyableAmount("f", 47).eq(0) ? { color: "grey" } : getBuyableAmount("f", 47).lt(layers.f.buyables[47].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Factor 8",
                            () => { return "x" + format(buyableEffect("f", 48))}
                        ], () => { return !(hasUpgrade("ta", 15)) ? {display: "none !important"} : getBuyableAmount("f", 48).eq(0) ? { color: "grey" } : getBuyableAmount("f", 48).lt(layers.f.buyables[48].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Break Infinity NIP Upgrade 1",
                            () => { return "x" + format(upgradeEffect("bi", 101))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("ta", 21)) ? {display: "none !important"} : !hasUpgrade("bi", 101) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Dice Mastery Effect",
                            () => { return "x" + format(player.om.diceMasteryPointsEffect)}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 14)) ? {display: "none !important"} : player.om.diceMasteryPointsEffect.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Shattered Infinities Buyable 4",
                            () => { return "x" + format(buyableEffect("tad", 21))}
                        ], () => { return !(hasUpgrade("bi", 16)) ? {display: "none !important"} : getBuyableAmount("tad", 21).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Steel Buyable 8",
                            () => { return "x" + format(buyableEffect("gh", 38))}
                        ], () => { return !(hasUpgrade("i", 23)) ? {display: "none !important"} : getBuyableAmount("gh", 38).eq(0) ? { color: "grey" } : getBuyableAmount("gh", 38).lt(layers.gh.buyables[38].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Break Infinity IP Upgrade 12",
                            () => { return "x" + format(upgradeEffect("bi", 23))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("ta", 21)) ? {display: "none !important"} : !hasUpgrade("bi", 23) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "1st Replicanti Effect",
                            () => { return "x" + format(player.ca.replicantiEffect)}
                        ], () => { return !(player.ca.unlockedCante && hasUpgrade("bi", 24)) ? {display: "none !important"} : player.ca.replicantiEffect.eq(1) ? { color: "grey" } : player.ca.replicanti.lt(1.79e308) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Dimension Buyable 4",
                            () => { return "x" + format(buyableEffect("id", 24))}
                        ], () => { return !(hasUpgrade("i", 26) && hasUpgrade("bi", 19)) ? {display: "none !important"} : getBuyableAmount("id", 24).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Hex Blessing Buyable 3",
                            () => { return "x" + format(buyableEffect("h", 23))}
                        ], () => { return !(hasChallenge("ip", 13)) ? {display: "none !important"} : getBuyableAmount("h", 23).eq(0) ? { color: "grey" } : getBuyableAmount("h", 23).lt(layers.h.buyables[23].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Void Mod Effect",
                            () => { return "x" + format(player.rm.realmModsEffect[5])}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : player.rm.realmModsEffect[5].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Galaxy Dust Buyable 4",
                            () => { return "x" + format(buyableEffect("ca", 24))}
                        ], () => { return !(player.ca.unlockedCante && hasUpgrade('bi', 26)) ? {display: "none !important"} : getBuyableAmount("ca", 24).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Cookie Pet's 2nd Effect",
                            () => { return "x" + format(levelableEffect("pet", 403)[1])}
                        ], () => { return !(getLevelableAmount("pet", 403).gte(1)) ? {display: "none !important"} : levelableEffect("pet", 403)[1].eq(1) ? {color: "grey"} : { color: "white" }}],

                        ["stat-row", [
                            "Charger Milestone 1",
                            () => { return "x" + format(player.fa.milestoneEffect[0])}
                        ], () => { return !(player.fa.buyables[13].gte(1)) ? {display: "none !important"} : !hasMilestone("fa", 11) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "First Singularity Power Effect",
                            () => { return "x" + format(player.sd.singularityPowerEffect)}
                        ], () => { return !(layerShown('sd')) ? {display: "none !important"} : player.sd.singularityPowerEffect.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Singularity Buyable 2",
                            () => { return "x" + format(buyableEffect("s", 12))}
                        ], () => { return !(layerShown('s') && hasMilestone("s", 15)) ? {display: "none !important"} : getBuyableAmount("s", 12).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "SFRGT Buyable 7",
                            () => { return "x" + format(buyableEffect("fu", 17))}
                        ], () => { return !(layerShown('fu') && player.fu.jocusCelestialActivate) ? {display: "none !important"} : getBuyableAmount("fu", 17).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Second Sadness Effect",
                            () => { return "x" + format(player.fu.sadnessEffect2)}
                        ], () => { return !(layerShown('fu') && hasUpgrade("fu", 15)) ? {display: "none !important"} : player.fu.sadnessEffect2.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Infinity Point Singularity Core<br>First Effect",
                            () => { return player.cop.processedCoreFuel.eq(10) ? "x" + format(player.cop.processedCoreInnateEffects[0]) : "x" + format(layers.coa.determineEffect(10, player.coa.viewingStrength)[0])}
                        ], () => { return !(layerShown('cop')) ? {display: "none !important"} : !player.cop.processedCoreFuel.eq(10) ? { color: "grey", height: "40px" } : { color: "white", height: "40px" }}],

                        ["stat-row", [
                            "Infinity Point Singularity Core<br>Second Effect",
                            () => { return player.cop.processedCoreFuel.eq(10) ? "^" + format(player.cop.processedCoreInnateEffects[1]) : "^" + format(layers.coa.determineEffect(10, player.coa.viewingStrength)[1])}
                        ], () => { return !(layerShown('cop')) ? {display: "none !important"} : !player.cop.processedCoreFuel.eq(10) ? { color: "grey", height: "40px" } : { color: "white", height: "40px" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Total IP Gain", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.in.infinityPointsToGet)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Infinities": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ip') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Infinities", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],
                    
                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value",
                            "1"
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "Shattered Infinities Buyable 1",
                            () => { return "x" + format(buyableEffect("tad", 11))}
                        ], () => { return !(hasUpgrade("ta", 21)) ? {display: "none !important"} : getBuyableAmount("tad", 11).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Break Infinity Buyable 1",
                            () => { return "x" + format(buyableEffect("bi", 11))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("ta", 21)) ? {display: "none !important"} : getBuyableAmount("bi", 11).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "OTF Mastery Buyable 1",
                            () => { return "x" + format(buyableEffect("om", 11))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 14)) ? {display: "none !important"} : getBuyableAmount("om", 11).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Crystal Buyable 5",
                            () => { return "x" + format(buyableEffect("p", 15))}
                        ], () => { return !(hasUpgrade("i", 24)) ? {display: "none !important"} : getBuyableAmount("p", 15).eq(0) ? { color: "grey" } : getBuyableAmount("p", 15).lt(layers.p.buyables[15].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Voidgwa Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 1101)[0])}
                        ], () => { return !(getLevelableAmount("pet", 1101).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Infinity Point Singularity Core<br>Third Effect",
                            () => { return player.cop.processedCoreFuel.eq(10) ? "x" + format(player.cop.processedCoreInnateEffects[2]) : "x" + format(layers.coa.determineEffect(10, player.coa.viewingStrength)[2])}
                        ], () => { return !(layerShown('cop')) ? {display: "none !important"} : !player.cop.processedCoreFuel.eq(10) ? { color: "grey", height: "40px" } : { color: "white", height: "40px" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Total Infinities Gain", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.in.infinitiesToGet)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Antimatter": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ad') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Antimatter", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],
                    
                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value<br><h6>(1st Antimatter Dimension Count)",
                            () => { return format(player.ad.dimensionAmounts[0])}
                        ], () => { return player.ad.dimensionAmounts[0].gte(1) ? {color: "white", height: "40px"} : {color: "grey", height: "40px"}}],

                        ["stat-row", [
                            "1st Antimatter Dimension Effect",
                            () => { return "x" + format(buyableEffect("ad", 11))}
                        ], () => { return getBuyableAmount("ad", 11).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Tickspeed Effect",
                            () => { return "x" + format(buyableEffect("ad", 1))}
                        ], () => { return getBuyableAmount("ad", 1).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Dimension Boost Effect",
                            () => { return "x" + format(buyableEffect("ad", 2))}
                        ], () => { return getBuyableAmount("ad", 2).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Antimatter Dimensions Upgrade 2",
                            () => { return "x" + format(upgradeEffect("ad", 12))}
                        ], () => { return !hasUpgrade("ad", 12) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "IP Upgrade (1, 2)",
                            () => { return "x" + format(upgradeEffect("ip", 12))}
                        ], () => { return !(hasUpgrade("ip", 11)) ? {display: "none !important"} : !hasUpgrade("ip", 12) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Antimatter Dimensions Upgrade 7",
                            () => { return "x" + format(upgradeEffect("ad", 17))}
                        ], () => { return !(player.in.infinities.gte(3)) ? {display: "none !important"} : !hasUpgrade("ad", 17) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Grasshop: Antimatter Study 1",
                            () => { return "x" + format(buyableEffect("gh", 23))}
                        ], () => { return !(hasChallenge("ip", 11)) ? {display: "none !important"} : getBuyableAmount("gh", 23).eq(0) ? { color: "grey" } : getBuyableAmount("gh", 23).lt(layers.gh.buyables[23].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Grasshop: Antimatter Study 2",
                            () => { return "x" + format(buyableEffect("gh", 24))}
                        ], () => { return !(hasChallenge("ip", 11)) ? {display: "none !important"} : getBuyableAmount("gh", 24).eq(0) ? { color: "grey" } : getBuyableAmount("gh", 24).lt(layers.gh.buyables[24].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Spider Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 106)[0])}
                        ], () => { return !(getLevelableAmount("pet", 106).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "1st Dimensional Power Effect",
                            () => { return "x" + format(player.ta.dimensionPowerEffects[0])}
                        ], () => { return !(hasChallenge("ip", 18)) ? {display: "none !important"} : player.ta.dimensionPowerEffects[0].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "IP Buyable 4",
                            () => { return "x" + format(buyableEffect("ip", 14))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ip", 14).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Tav Buyable 4",
                            () => { return "x" + format(buyableEffect("ta", 36))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ta", 36).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Break Infinity Buyable 3",
                            () => { return "x" + format(buyableEffect("bi", 13))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("ta", 21)) ? {display: "none !important"} : getBuyableAmount("bi", 13).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "[TAD] Challenge Debuff",
                            "^0.55"
                        ], () => { return !(hasUpgrade("ta", 21)) ? {display: "none !important"} : !(inChallenge("tad", 11)) ? { color: "maroon" } : { color: "red" }}],

                        ["stat-row", [
                            "[TAD] Debuff Buyable 2",
                            () => { return "x" + format(buyableEffect("de", 12))}
                        ], () => { return !(hasUpgrade("ta", 21)) ? {display: "none !important"} : !(inChallenge("tad", 11) && getBuyableAmount("de", 12).gte(1)) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "[TAD] Debuff Buyable 8",
                            () => { return "x" + format(buyableEffect("de", 18))} // This is supposed to be pow, I will check later if it is fine to change without breaking anything.
                        ], () => { return !(hasUpgrade("ta", 21)) ? {display: "none !important"} : !(inChallenge("tad", 11) && getBuyableAmount("de", 18).gte(1)) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Corrupted Infinities Buyable 1",
                            () => { return "x" + format(buyableEffect("tad", 13))}
                        ], () => { return !(hasUpgrade("ta", 21)) ? {display: "none !important"} : getBuyableAmount("tad", 13).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Hex Mastery Effect",
                            () => { return "x" + format(player.om.hexMasteryPointsEffect)}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 14)) ? {display: "none !important"} : player.om.hexMasteryPointsEffect.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "OTF Mastery Buyable 5",
                            () => { return "x" + format(buyableEffect("om", 15))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 15)) ? {display: "none !important"} : getBuyableAmount("om", 15).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Steel Buyable 5",
                            () => { return "x" + format(buyableEffect("gh", 35))}
                        ], () => { return !(hasUpgrade("i", 23)) ? {display: "none !important"} : getBuyableAmount("gh", 35).eq(0) ? { color: "grey" } : getBuyableAmount("gh", 35).lt(layers.gh.buyables[35].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Steel Buyable 7",
                            () => { return "x" + format(buyableEffect("gh", 37))}
                        ], () => { return !(hasUpgrade("i", 23)) ? {display: "none !important"} : getBuyableAmount("gh", 37).eq(0) ? { color: "grey" } : getBuyableAmount("gh", 37).lt(layers.gh.buyables[37].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Power Effect",
                            () => { return "x" + format(player.id.infinityPowerEffect)}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 18)) ? {display: "none !important"} : player.id.infinityPowerEffect.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "[1e300] Antimatter Softcap",
                            () => { return !hasChallenge("ip", 18) ? "^0.1" : !hasUpgrade("bi", 21) ? "^" + format(Decimal.div(1, Decimal.div(player.ad.antimatter.plus(1).log10(), 310))) : "^" + format(Decimal.div(1, Decimal.div(player.ad.antimatter.plus(1).log10(), 355)))}
                        ], () => { return player.ad.antimatter.lte(1e300) ? { color: "maroon" } : { color: "red" }}],

                        ["stat-row", [
                            "Tav Buyable 4",
                            () => { return "x" + format(buyableEffect("ta", 37))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ta", 37).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "IP Upgrade (4, 3)",
                            () => { return "x" + format(upgradeEffect("ip", 43))}
                        ], () => { return !(hasUpgrade("ta", 14)) ? {display: "none !important"} : !hasUpgrade("ip", 43) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Dream Mod Buyable 1",
                            () => { return "x" + format(buyableEffect("rm", 31))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : getBuyableAmount("rm", 31).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Charger Milestone 2",
                            () => { return "x" + format(player.fa.milestoneEffect[1])}
                        ], () => { return !(player.fa.buyables[13].gte(1)) ? {display: "none !important"} : !hasMilestone("fa", 12) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Antimatter Singularity Core<br>First Effect",
                            () => { return player.cop.processedCoreFuel.eq(9) ? "x" + format(player.cop.processedCoreInnateEffects[0]) : "x" + format(layers.coa.determineEffect(9, player.coa.viewingStrength)[0])}
                        ], () => { return !(layerShown('cop')) ? {display: "none !important"} : !player.cop.processedCoreFuel.eq(9) ? { color: "grey", height: "40px" } : { color: "white", height: "40px" }}],
                        
                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Total Antimatter Per Second", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.ad.antimatterPerSecond)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],
                ]
            },

            "Antimatter Dimensions": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ad') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Antimatter Dimensions", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "[1st Dim.] Base Value<br><h6>(2nd Dimension Count)",
                            () => {return format(player.ad.dimensionAmounts[1])}
                        ], () => { return player.ad.dimensionAmounts[1].eq(0) ? {color: "grey", height: "40px"} : {color: "white", height: "40px"}}],

                        ["stat-row", [
                            "[1st Dim.] 2nd Dim. Effect",
                            () => {return "x" + format(buyableEffect("ad", 12).div(10))}
                        ], () => { return getBuyableAmount("ad", 12).eq(0) ? {color: "grey"} : {color: "white"}}],

                        ["stat-row", [
                            "Tickspeed Effect",
                            () => { return "x" + format(buyableEffect("ad", 1))}
                        ], () => { return getBuyableAmount("ad", 1).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Dimension Boost Effect",
                            () => { return "x" + format(buyableEffect("ad", 2))}
                        ], () => { return getBuyableAmount("ad", 2).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Grasshop: Antimatter Study 1",
                            () => { return "x" + format(buyableEffect("gh", 23))}
                        ], () => { return !(hasChallenge("ip", 11)) ? {display: "none !important"} : getBuyableAmount("gh", 23).eq(0) ? { color: "grey" } : getBuyableAmount("gh", 23).lt(layers.gh.buyables[23].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Antimatter Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 305)[0])}
                        ], () => { return !(getLevelableAmount("pet", 305).gte(1)) ? {display: "none !important"} : levelableEffect("pet", 305)[0].eq(1) ? {color: "grey"} : {color: "white"}}],

                        ["stat-row", [
                            "[1st Dim.] 2nd Dim. Power",
                            () => { return "x" + format(player.ta.dimensionPowerEffects[1])}
                        ], () => { return !(hasChallenge("ip", 18)) ? {display: "none !important"} : player.ta.dimensionPowerEffects[1].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "IP Buyable 4",
                            () => { return "x" + format(buyableEffect("ip", 14))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ip", 14).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Tav Buyable 4",
                            () => { return "x" + format(buyableEffect("ta", 36))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ta", 36).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Break Infinity Buyable 3",
                            () => { return "x" + format(buyableEffect("bi", 13))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("ta", 21)) ? {display: "none !important"} : getBuyableAmount("bi", 13).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "[TAD] Challenge Debuff",
                            "^0.55"
                        ], () => { return !(hasUpgrade("ta", 21)) ? {display: "none !important"} : !(inChallenge("tad", 11)) ? { color: "maroon" } : { color: "red" }}],

                        ["stat-row", [
                            "[TAD] Debuff Buyable 2",
                            () => { return "x" + format(buyableEffect("de", 12))}
                        ], () => { return !(hasUpgrade("ta", 21)) ? {display: "none !important"} : !(inChallenge("tad", 11) && getBuyableAmount("de", 12).gte(1)) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Corrupted Infinities Buyable 1",
                            () => { return "x" + format(buyableEffect("tad", 13))}
                        ], () => { return !(hasUpgrade("ta", 21)) ? {display: "none !important"} : getBuyableAmount("tad", 13).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Hex Mastery Effect",
                            () => { return "x" + format(player.om.hexMasteryPointsEffect)}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 14)) ? {display: "none !important"} : player.om.hexMasteryPointsEffect.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Steel Buyable 7",
                            () => { return "x" + format(buyableEffect("gh", 37))}
                        ], () => { return !(hasUpgrade("i", 23)) ? {display: "none !important"} : getBuyableAmount("gh", 37).eq(0) ? { color: "grey" } : getBuyableAmount("gh", 37).lt(layers.gh.buyables[37].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Infinity Power Effect",
                            () => { return "x" + format(player.id.infinityPowerEffect)}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 18)) ? {display: "none !important"} : player.id.infinityPowerEffect.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "[1e300] Antimatter Softcap",
                            () => { return !hasChallenge("ip", 18) ? "^0.1" : !hasUpgrade("bi", 21) ? "^0.96" : "^0.975"}
                        ], () => { return player.ad.antimatter.lte(1e300) ? { color: "maroon" } : { color: "red" }}],

                        ["stat-row", [
                            "IP Upgrade (4, 3)",
                            () => { return "x" + format(upgradeEffect("ip", 43))}
                        ], () => { return !(hasUpgrade("ta", 14)) ? {display: "none !important"} : !hasUpgrade("ip", 43) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Dream Mod Buyable 1",
                            () => { return "x" + format(buyableEffect("rm", 31))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : getBuyableAmount("rm", 31).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Charger Milestone 2",
                            () => { return "x" + format(player.fa.milestoneEffect[1])}
                        ], () => { return !(player.fa.buyables[13].gte(1)) ? {display: "none !important"} : !hasMilestone("fa", 12) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Antimatter Singularity Core<br>Second Effect",
                            () => { return player.cop.processedCoreFuel.eq(9) ? "^" + format(player.cop.processedCoreInnateEffects[1]) : "^" + format(layers.coa.determineEffect(9, player.coa.viewingStrength)[1])}
                        ], () => { return !(layerShown('cop')) ? {display: "none !important"} : !player.cop.processedCoreFuel.eq(9) ? { color: "grey", height: "40px" } : { color: "white", height: "40px" }}],

                        ["style-row", [
                            ["raw-html", "Specific Multipliers", {color: 'white', fontSize: '16px', fontFamily: 'monospace'}]
                        ], {width: "666px", height: "25px", borderBottom: "1px solid white"}],

                        ["stat-row", [
                            "[1st Dim.] Clock Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 206)[0])}
                        ], () => { return !(getLevelableAmount("pet", 206).gte(1)) ? {display: "none !important"} : {height: "40px", color: "white"}}],

                        ["stat-row", [
                            "[2nd Dim.] Trollface Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 207)[0])}
                        ], () => { return !(getLevelableAmount("pet", 207).gte(1)) ? {display: "none !important"} : {height: "40px", color: "white"}}],

                        ["stat-row", [
                            "[3rd Dim.] Clock Pet's 2nd Effect",
                            () => { return "x" + format(levelableEffect("pet", 206)[1])}
                        ], () => { return !(getLevelableAmount("pet", 206).gte(1)) ? {display: "none !important"} : {height: "40px", color: "white"}}],

                        ["stat-row", [
                            "[4th Dim.] Trollface Pet's 2nd Effect",
                            () => { return "x" + format(levelableEffect("pet", 207)[1])}
                        ], () => { return !(getLevelableAmount("pet", 207).gte(1)) ? {display: "none !important"} : {height: "40px", color: "white"}}],

                        ["stat-row", [
                            "[5th Dim.] Clock Pet's 3rd Effect",
                            () => { return "x" + format(levelableEffect("pet", 206)[2])}
                        ], () => { return !(getLevelableAmount("pet", 206).gte(1)) ? {display: "none !important"} : {height: "40px", color: "white"}}],

                        ["stat-row", [
                            "[6th Dim.] Trollface Pet's 3rd Effect",
                            () => { return "x" + format(levelableEffect("pet", 207)[2])}
                        ], () => { return !(getLevelableAmount("pet", 207).gte(1)) ? {display: "none !important"} : {height: "40px", color: "white"}}],

                        ["stat-row", [
                            "[7th Dim.] IP Upgrade (1, 3)",
                            () => { return "x" + format(upgradeEffect("ip", 13))}
                        ], () => { return !(hasUpgrade("ip", 11)) ? {display: "none !important"} : !hasUpgrade("ip", 13) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "[7th Dim.] Spider Pet's 2nd Effect",
                            () => { return "x" + format(levelableEffect("pet", 106)[1])}
                        ], () => { return !(getLevelableAmount("pet", 106).gte(1)) ? {display: "none !important"} : {height: "40px", color: "white"}}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "[1st Dimension] AD Multiplier: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.ad.dimensionsPerSecond[0])}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Tickspeed": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ad') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Tickspeed", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value",
                            "1.125"
                        ], () => { return getBuyableAmount("ad", 1).eq(0) ? { color: "grey", height: "40px" } : {color: "white", height: "40px"}}],

                        ["stat-row", [
                            "Antimatter Galaxies Effect",
                            () => { return "+" + format(buyableEffect("ad", 3))}
                        ], () => { return (getBuyableAmount("ad", 3).eq(0) || getBuyableAmount("ad", 1).eq(0)) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Galaxy Dust Buyable 2",
                            () => { return "+" + format(buyableEffect("ca", 22))}
                        ], () => { return !(player.ca.unlockedCante && hasUpgrade('bi', 26)) ? {display: "none !important"} : (getBuyableAmount("ca", 22).eq(0) || getBuyableAmount("ad", 1).eq(0)) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Dragon Pet Upgrade 2",
                            () => { return "x" + format(upgradeEffect("ep1", 12))}
                        ], () => { return !(getLevelableAmount("pet", 402).gte(1)) ? {display: "none !important"} : (!hasUpgrade("ep1", 12) || getBuyableAmount("ad", 1).eq(0)) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Antimatter Singularity Core<br>Third Effect",
                            () => { return player.cop.processedCoreFuel.eq(9) ? "x" + format(player.cop.processedCoreInnateEffects[2]) : "x" + format(layers.coa.determineEffect(9, player.coa.viewingStrength)[2])}
                        ], () => { return !(layerShown('cop')) ? {display: "none !important"} : !player.cop.processedCoreFuel.eq(9) ? { color: "grey", height: "40px" } : { color: "white", height: "40px" }}],

                        // ALWAYS LAST
                        ["stat-row", [
                            "Tickspeed Buyable Amount",
                            () => { return "^" + format(getBuyableAmount("ad", 1))}
                        ], () => { return getBuyableAmount("ad", 1).eq(0) ? { color: "grey" } : { color: "white" }}],
                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Total Tickspeed Multiplier: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(buyableEffect("ad", 1))}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Negative Infinity Points": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ta') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Negative Infinity Points", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            () => { return !player.ta.unlockedReverseBreak ? "Base Value" : "Base Value<br><h6>((log10((Antimatter/1e308)+1)^0.75)/6)"},
                            () => { return !player.ta.unlockedReverseBreak ? "1" : format(player.ad.antimatter.div(1e308).plus(1).log10().pow(0.75).div(6))}
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "IP Buyable 2",
                            () => { return "x" + format(buyableEffect("ip", 12))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ip", 12).eq(0) ? { color: "grey" } : { color: "white" }}],
                        
                        ["stat-row", [
                            "Tav Buyable 2",
                            () => { return "x" + format(buyableEffect("ta", 34))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ta", 34).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "IP Upgrade (4, 1)",
                            () => { return "x" + format(upgradeEffect("ip", 41))}
                        ], () => { return !(hasUpgrade("ta", 14)) ? {display: "none !important"} : !hasUpgrade("ip", 41) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Negative Infinity Factor 1",
                            () => { return "x" + format(buyableEffect("f", 51))}
                        ], () => { return !(hasUpgrade("ta", 16)) ? {display: "none !important"} : getBuyableAmount("f", 51).eq(0) ? { color: "grey" } : getBuyableAmount("f", 51).lt(layers.f.buyables[51].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Negative Infinity Factor 2",
                            () => { return "x" + format(buyableEffect("f", 52))}
                        ], () => { return !(hasUpgrade("ta", 16)) ? {display: "none !important"} : getBuyableAmount("f", 52).eq(0) ? { color: "grey" } : getBuyableAmount("f", 52).lt(layers.f.buyables[52].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Negative Infinity Factor 3",
                            () => { return "x" + format(buyableEffect("f", 53))}
                        ], () => { return !(hasUpgrade("ta", 16)) ? {display: "none !important"} : getBuyableAmount("f", 53).eq(0) ? { color: "grey" } : getBuyableAmount("f", 53).lt(layers.f.buyables[53].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Negative Infinity Factor 4",
                            () => { return "x" + format(buyableEffect("f", 54))}
                        ], () => { return !(hasUpgrade("ta", 16)) ? {display: "none !important"} : getBuyableAmount("f", 54).eq(0) ? { color: "grey" } : getBuyableAmount("f", 54).lt(layers.f.buyables[54].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Negative Infinity Factor 5",
                            () => { return "x" + format(buyableEffect("f", 55))}
                        ], () => { return !(hasUpgrade("ta", 16)) ? {display: "none !important"} : getBuyableAmount("f", 55).eq(0) ? { color: "grey" } : getBuyableAmount("f", 55).lt(layers.f.buyables[55].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Negative Infinity Factor 6",
                            () => { return "x" + format(buyableEffect("f", 56))}
                        ], () => { return !(hasUpgrade("ta", 16)) ? {display: "none !important"} : getBuyableAmount("f", 56).eq(0) ? { color: "grey" } : getBuyableAmount("f", 56).lt(layers.f.buyables[56].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Negative Infinity Factor 7",
                            () => { return "x" + format(buyableEffect("f", 57))}
                        ], () => { return !(hasUpgrade("ta", 16)) ? {display: "none !important"} : getBuyableAmount("f", 57).eq(0) ? { color: "grey" } : getBuyableAmount("f", 57).lt(layers.f.buyables[57].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Negative Infinity Factor 8",
                            () => { return "x" + format(buyableEffect("f", 58))}
                        ], () => { return !(hasUpgrade("ta", 16)) ? {display: "none !important"} : getBuyableAmount("f", 58).eq(0) ? { color: "grey" } : getBuyableAmount("f", 58).lt(layers.f.buyables[58].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Dice-NIP Synergy Buyable",
                            () => { return "x" + format(buyableEffect("ta", 51))}
                        ], () => { return !(hasUpgrade("ta", 19)) ? {display: "none !important"} : getBuyableAmount("ta", 51).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Rocket Fuel-NIP Synergy Buyable",
                            () => { return "x" + format(buyableEffect("ta", 52))}
                        ], () => { return !(hasUpgrade("ta", 19)) ? {display: "none !important"} : getBuyableAmount("ta", 52).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Hex-NIP Synergy Buyable",
                            () => { return "x" + format(buyableEffect("ta", 53))}
                        ], () => { return !(hasUpgrade("ta", 19)) ? {display: "none !important"} : getBuyableAmount("ta", 53).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Break Infinity NIP Upgrade 2",
                            () => { return "x" + format(upgradeEffect("bi", 102))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("ta", 21)) ? {display: "none !important"} : !hasUpgrade("bi", 102) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Rocket Fuel Mastery Effect",
                            () => { return "x" + format(player.om.rocketFuelMasteryPointsEffect)}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 14)) ? {display: "none !important"} : player.om.rocketFuelMasteryPointsEffect.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Disfigured Infinities Buyable 4",
                            () => { return "x" + format(buyableEffect("tad", 22))}
                        ], () => { return !(hasUpgrade("bi", 16)) ? {display: "none !important"} : getBuyableAmount("tad", 22).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Time Cube Buyable 3",
                            () => { return "x" + format(buyableEffect("r", 13))}
                        ], () => { return !(hasUpgrade("i", 26)) ? {display: "none !important"} : getBuyableAmount("r", 13).eq(0) ? { color: "grey" } : getBuyableAmount("r", 13).lt(layers.r.buyables[13].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Dream Mod Buyable 2",
                            () => { return "x" + format(buyableEffect("rm", 32))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : getBuyableAmount("rm", 32).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Infinity Breaker Pet's 2nd Effect",
                            () => { return "x" + format(levelableEffect("pet", 208)[1])}
                        ], () => { return !(getLevelableAmount("pet", 208).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Charger Milestone 5",
                            () => { return "x" + format(player.fa.milestoneEffect[4])}
                        ], () => { return !(player.fa.buyables[13].gte(1)) ? {display: "none !important"} : !hasMilestone("fa", 15) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "First Singularity Power Effect",
                            () => { return "x" + format(player.sd.singularityPowerEffect)}
                        ], () => { return !(layerShown('sd')) ? {display: "none !important"} : player.sd.singularityPowerEffect.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Radiation Buyable 6",
                            () => { return "x" + format(buyableEffect("ra", 16))}
                        ], () => { return !(layerShown('ra')) ? {display: "none !important"} : getBuyableAmount("ra", 16).eq(0) ? { color: "grey" } : { color: "white" }}],


                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Total NIP Multiplier: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.ta.negativeInfinityPointsToGet)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Dimension Power": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ta') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Dimension Power", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "[1st Dim.] Base Value<br><h6>(1st Dimension Multiplier)",
                            () => { return format(buyableEffect("ta", 11))}
                        ], {color: "white", height:"40px"}],

                        ["stat-row", [
                            "IP Buyable 3",
                            () => { return "x" + format(buyableEffect("ip", 13))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ip", 13).eq(0) ? { color: "grey" } : { color: "white" }}],
                        
                        ["stat-row", [
                            "Tav Buyable 3",
                            () => { return "x" + format(buyableEffect("ta", 35))}
                        ], () => { return !(hasUpgrade("ta", 11)) ? {display: "none !important"} : getBuyableAmount("ta", 35).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Tav Upgrade 2",
                            () => { return "x" + format(upgradeEffect("ta", 12))}
                        ], () => { return !(hasChallenge("ip", 18)) ? {display: "none !important"} : !hasUpgrade("ta", 12) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "IP Upgrade (4, 4)",
                            () => { return "x" + format(upgradeEffect("ip", 44))}
                        ], () => { return !(hasUpgrade("ta", 14)) ? {display: "none !important"} : !hasUpgrade("ip", 44) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "OTF Mastery Buyable 4",
                            () => { return "x" + format(buyableEffect("om", 14))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 15)) ? {display: "none !important"} : getBuyableAmount("om", 14).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Steel Buyable 6",
                            () => { return "x" + format(buyableEffect("gh", 36))}
                        ], () => { return !(hasUpgrade("i", 23)) ? {display: "none !important"} : getBuyableAmount("gh", 36).eq(0) ? { color: "grey" } : getBuyableAmount("gh", 36).lt(layers.gh.buyables[36].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "John Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 209)[0])}
                        ], () => { return !(getLevelableAmount("pet", 209).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "[1st Dim.] DP Per Second: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.ta.dimensionPowerPerSecond[0])}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Alternative Infinities": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#b2d8d8', width: '682px', height: '500px' },
                unlocked() { return layerShown('tad') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Alternative Infinities", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value<br><h6>(Broken Infinities^0.4)",
                            () => { return format(player.bi.brokenInfinities.pow(0.4))}
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "OTF Mastery Buyable 3",
                            () => { return "x" + format(buyableEffect("om", 13))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 15)) ? {display: "none !important"} : getBuyableAmount("om", 13).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Crystal Buyable 8",
                            () => { return "x" + format(buyableEffect("p", 18))}
                        ], () => { return !(hasUpgrade("i", 24)) ? {display: "none !important"} : getBuyableAmount("p", 18).eq(0) ? { color: "grey" } : getBuyableAmount("p", 18).lt(layers.p.buyables[18].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "John Pet's 2nd Effect",
                            () => { return "x" + format(levelableEffect("pet", 209)[1])}
                        ], () => { return !(getLevelableAmount("pet", 209).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Alternative Infinities Gain: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.tad.shatteredInfinitiesToGet)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Broken Infinities": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('bi') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Broken Infinities", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value<br><h6>(Infinity Count)",
                            () => { return format(player.in.infinities)}
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "Break Infinity Buyable 2",
                            () => { return "x" + format(buyableEffect("bi", 12))}
                        ], () => { return getBuyableAmount("bi", 12).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Disfigured Infinities Buyable 1",
                            () => { return "x" + format(buyableEffect("tad", 12))}
                        ], () => { return !(hasUpgrade("ta", 21)) ? {display: "none !important"} : getBuyableAmount("tad", 12).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "OTF Mastery Buyable 2",
                            () => { return "x" + format(buyableEffect("om", 12))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 15)) ? {display: "none !important"} : getBuyableAmount("om", 12).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Crystal Buyable 6",
                            () => { return "x" + format(buyableEffect("p", 16))}
                        ], () => { return !(hasUpgrade("i", 24)) ? {display: "none !important"} : getBuyableAmount("p", 16).eq(0) ? { color: "grey" } : getBuyableAmount("p", 16).lt(layers.p.buyables[16].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Void Mod Buyable 1",
                            () => { return "x" + format(buyableEffect("rm", 33))}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : getBuyableAmount("rm", 33).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Infinity Breaker Pet's 3rd Effect",
                            () => { return "x" + format(levelableEffect("pet", 208)[2])}
                        ], () => { return !(getLevelableAmount("pet", 208).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Voidgwa Pet's 2nd Effect",
                            () => { return "x" + format(levelableEffect("pet", 1101)[1])}
                        ], () => { return !(getLevelableAmount("pet", 1103).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Charger Milestone 3",
                            () => { return "x" + format(player.fa.milestoneEffect[2])}
                        ], () => { return !(player.fa.buyables[13].gte(1)) ? {display: "none !important"} : !hasMilestone("fa", 13) ? { color: "grey" } : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Broken Infinities Gain: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.tad.shatteredInfinitiesToGet)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Dice Mastery Points": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('om') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Dice Mastery Points", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value<br><h6>((log10(Dice Points+1)^2.4)*10)",
                            () => { return (player.po.dice && player.d.dicePoints.gte(1)) ? format(player.d.dicePoints.plus(1).log10().pow(2.4).mul(10)) : "0"}
                        ], () => { return (player.d.dicePoints.gt(1) && player.po.dice) ? {color: "white", height: "40px"} : {color: "grey", height: "40px"}}],

                        ["stat-row", [
                            "OTF Mastery Buyable 6",
                            () => { return "x" + format(buyableEffect("om", 16))}
                        ], () => { return getBuyableAmount("om", 16).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Corrupted Infinities Buyable 3",
                            () => { return "x" + format(buyableEffect("tad", 19))}
                        ], () => { return !(hasUpgrade("bi", 16)) ? {display: "none !important"} : getBuyableAmount("tad", 19).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Corrupted Infinities Buyable 4",
                            () => { return "x" + format(buyableEffect("tad", 23))}
                        ], () => { return !(hasUpgrade("bi", 16)) ? {display: "none !important"} : getBuyableAmount("tad", 23).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Crystal Buyable 7",
                            () => { return "x" + format(buyableEffect("p", 17))}
                        ], () => { return !(hasUpgrade("i", 24)) ? {display: "none !important"} : getBuyableAmount("p", 17).eq(0) ? { color: "grey" } : getBuyableAmount("p", 17).lt(layers.p.buyables[17].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Dream Mod Effect",
                            () => { return "x" + format(player.rm.realmModsEffect[4])}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : player.rm.realmModsEffect[4].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Smoke Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 109)[0])}
                        ], () => { return !(getLevelableAmount("pet", 109).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Sad Buyable 3",
                            () => { return "x" + format(buyableEffect("fu", 43))}
                        ], () => { return !(layerShown('fu') && hasUpgrade("fu", 15)) ? {display: "none !important"} : getBuyableAmount("fu", 43).eq(0) ? { color: "grey" } : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Dice Mastery Point Gain: ", { "font-size": "16px", "font-family": "monospace" }],
                        ], () => { return (player.d.dicePoints.gt(1) && player.po.dice) ? {color: "white", width: "298px", height: "25px", borderRight: "2px solid white"} : {color: "grey", width: "298px", height: "25px", borderRight: "2px solid white"}}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.om.diceMasteryPointsToGet)}, { "font-size": "16px", "font-family": "monospace" }],
                        ], () => { return (player.d.dicePoints.gt(1) && player.po.dice) ? {color: "white", width: "382px", height: "25px"} : {color: "grey", width: "382px", height: "25px"}}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Rocket Fuel Mastery Points": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('om') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Rocket Fuel Mastery Points", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "[Rocket Fuel] Base Value<br><h6>(log10(Rocket Fuel+1)^2.7)",
                            () => { return (player.po.rocketFuel && player.rf.rocketFuel.gte(1)) ? format(player.rf.rocketFuel.plus(1).log10().pow(2.7)) : "0"}
                        ], () => { return (player.rf.rocketFuel.gt(1) && player.po.rocketFuel) ? {color: "white", height: "40px"} : {color: "grey", height: "40px"}}],

                        ["stat-row", [
                            "OTF Mastery Buyable 6",
                            () => { return "x" + format(buyableEffect("om", 16))}
                        ], () => { return getBuyableAmount("om", 16).eq(0) ? { color: "grey" } : { color: "white" }}],
                        
                        ["stat-row", [
                            "Disfigured Infinities Buyable 3",
                            () => { return "x" + format(buyableEffect("tad", 18))}
                        ], () => { return !(hasUpgrade("bi", 16)) ? {display: "none !important"} : getBuyableAmount("tad", 18).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Corrupted Infinities Buyable 4",
                            () => { return "x" + format(buyableEffect("tad", 23))}
                        ], () => { return !(hasUpgrade("bi", 16)) ? {display: "none !important"} : getBuyableAmount("tad", 23).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Crystal Buyable 7",
                            () => { return "x" + format(buyableEffect("p", 17))}
                        ], () => { return !(hasUpgrade("i", 24)) ? {display: "none !important"} : getBuyableAmount("p", 17).eq(0) ? { color: "grey" } : getBuyableAmount("p", 17).lt(layers.p.buyables[17].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Dream Mod Effect",
                            () => { return "x" + format(player.rm.realmModsEffect[4])}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : player.rm.realmModsEffect[4].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Smoke Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 109)[0])}
                        ], () => { return !(getLevelableAmount("pet", 109).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Sad Buyable 3",
                            () => { return "x" + format(buyableEffect("fu", 43))}
                        ], () => { return !(layerShown('fu') && hasUpgrade("fu", 15)) ? {display: "none !important"} : getBuyableAmount("fu", 43).eq(0) ? { color: "grey" } : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Rocket Fuel Mastery Point Gain: ", { "font-size": "16px", "font-family": "monospace" }],
                        ], () => { return (player.rf.rocketFuel.gt(1) && player.po.rocketFuel) ? {color: "white", width: "298px", height: "25px", borderRight: "2px solid white"} : {color: "grey", width: "298px", height: "25px", borderRight: "2px solid white"}}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.om.rocketFuelMasteryPointsToGet)}, { "font-size": "16px", "font-family": "monospace" }],
                        ], () => { return (player.rf.rocketFuel.gt(1) && player.po.rocketFuel) ? {color: "white", width: "382px", height: "25px"} : {color: "grey", width: "382px", height: "25px"}}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Hex Mastery Points": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('om') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Hex Mastery Points", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "[Hex] Base Value<br><h6>(log10(Hex 1 Points+1)^1.65)",
                            () => { return (player.po.hex && player.h.hexPoint.gte(1)) ? format(player.h.hexPoint.plus(1).log10().pow(1.65)) : "0"}
                        ], () => { return (player.h.hexPoint.gt(1) && player.po.hex) ? {color: "white", height: "40px"} : {color: "grey", height: "40px"}}],

                        ["stat-row", [
                            "OTF Mastery Buyable 6",
                            () => { return "x" + format(buyableEffect("om", 16))}
                        ], () => { return getBuyableAmount("om", 16).eq(0) ? { color: "grey" } : { color: "white" }}],
                        
                        ["stat-row", [
                            "Shattered Infinities Buyable 3",
                            () => { return "x" + format(buyableEffect("tad", 17))}
                        ], () => { return !(hasUpgrade("bi", 16)) ? {display: "none !important"} : getBuyableAmount("tad", 17).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Corrupted Infinities Buyable 4",
                            () => { return "x" + format(buyableEffect("tad", 23))}
                        ], () => { return !(hasUpgrade("bi", 16)) ? {display: "none !important"} : getBuyableAmount("tad", 23).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Crystal Buyable 7",
                            () => { return "x" + format(buyableEffect("p", 17))}
                        ], () => { return !(hasUpgrade("i", 24)) ? {display: "none !important"} : getBuyableAmount("p", 17).eq(0) ? { color: "grey" } : getBuyableAmount("p", 17).lt(layers.p.buyables[17].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Dream Mod Effect",
                            () => { return "x" + format(player.rm.realmModsEffect[4])}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : player.rm.realmModsEffect[4].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Smoke Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 109)[0])}
                        ], () => { return !(getLevelableAmount("pet", 109).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Sad Buyable 3",
                            () => { return "x" + format(buyableEffect("fu", 43))}
                        ], () => { return !(layerShown('fu') && hasUpgrade("fu", 15)) ? {display: "none !important"} : getBuyableAmount("fu", 43).eq(0) ? { color: "grey" } : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Hex Mastery Point Gain: ", { "font-size": "16px", "font-family": "monospace" }],
                        ], () => { return (player.h.hexPoint.gt(1) && player.po.hex) ? {color: "white", width: "298px", height: "25px", borderRight: "2px solid white"} : {color: "grey", width: "298px", height: "25px", borderRight: "2px solid white"}}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.om.hexMasteryPointsToGet)}, { "font-size": "16px", "font-family": "monospace" }],
                        ], () => { return (player.h.hexPoint.gt(1) && player.po.hex) ? {color: "white", width: "382px", height: "25px"} : {color: "grey", width: "382px", height: "25px"}}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Infinity Power": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('id') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Infinity Power", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value<br><h6>(1st Infinity Dimension Count)",
                            () => { return format(player.id.dimensionAmounts[0])}
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "1st Infinity Dimension Effect",
                            () => {return "x" + format(buyableEffect("id", 11).div(10))}
                        ], () => { return getBuyableAmount("id", 11).eq(0) ? {color: "grey"} : {color: "white"}}],

                        ["stat-row", [
                            "Time Cube Buyable 4",
                            () => { return "x" + format(buyableEffect("r", 14))}
                        ], () => { return !(hasUpgrade("i", 26)) ? {display: "none !important"} : getBuyableAmount("r", 14).eq(0) ? { color: "grey" } : getBuyableAmount("r", 14).lt(layers.r.buyables[14].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "2nd Replicanti Effect",
                            () => { return "x" + format(player.ca.replicantiEffect2)}
                        ], () => { return !(player.ca.unlockedCante && hasUpgrade("bi", 24)) ? {display: "none !important"} : player.ca.replicantiEffect2.eq(1) ? { color: "grey" } : player.ca.replicanti.lt(1.79e308) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Dimensional Mod Effect",
                            () => { return "x" + format(player.rm.realmModsEffect[3])}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : player.rm.realmModsEffect[3].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Infinity Breaker Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 208)[0])}
                        ], () => { return !(getLevelableAmount("pet", 208).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Second Singularity Power Effect",
                            () => { return "x" + format(player.sd.singularityPowerEffect2)}
                        ], () => { return !(layerShown('sd')) ? {display: "none !important"} : player.sd.singularityPowerEffect2.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Charger Milestone 6",
                            () => { return "x" + format(player.fa.milestoneEffect[5])}
                        ], () => { return !(player.fa.buyables[13].gte(1)) ? {display: "none !important"} : !hasMilestone("fa", 16) ? { color: "grey" } : { color: "white" }}],

                        // POWER MODIFIERS

                        ["stat-row", [
                            "Sad Buyable 2",
                            () => { return "^" + format(buyableEffect("fu", 42))}
                        ], () => { return !(layerShown('fu') && hasUpgrade("fu", 15)) ? {display: "none !important"} : getBuyableAmount("fu", 42).eq(0) ? { color: "grey" } : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Infinity Power Per Second: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.id.infinityPowerPerSecond)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Infinity Dimensions": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('id') },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Infinity Dimensions", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "[1st Dim.] Base Value<br><h6>(2nd Dimension Count)",
                            () => {return format(player.id.dimensionAmounts[1])}
                        ], () => { return player.id.dimensionAmounts[1].eq(0) ? {color: "grey", height: "40px"} : {color: "white", height: "40px"}}],

                        ["stat-row", [
                            "[1st Dim.] 2nd Dim. Effect",
                            () => {return "x" + format(buyableEffect("id", 12).div(10))}
                        ], () => { return getBuyableAmount("id", 12).eq(0) ? {color: "grey"} : {color: "white"}}],

                        ["stat-row", [
                            "Time Cube Buyable 4",
                            () => { return "x" + format(buyableEffect("r", 14))}
                        ], () => { return !(hasUpgrade("i", 26)) ? {display: "none !important"} : getBuyableAmount("r", 14).eq(0) ? { color: "grey" } : getBuyableAmount("r", 14).lt(layers.r.buyables[14].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "2nd Replicanti Effect",
                            () => { return "x" + format(player.ca.replicantiEffect2)}
                        ], () => { return !(player.ca.unlockedCante && hasUpgrade("bi", 24)) ? {display: "none !important"} : player.ca.replicantiEffect2.eq(1) ? { color: "grey" } : player.ca.replicanti.lt(1.79e308) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Dimensional Mod Effect",
                            () => { return "x" + format(player.rm.realmModsEffect[3])}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : player.rm.realmModsEffect[3].eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Infinity Breaker Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 208)[0])}
                        ], () => { return !(getLevelableAmount("pet", 208).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Second Singularity Power Effect",
                            () => { return "x" + format(player.sd.singularityPowerEffect2)}
                        ], () => { return !(layerShown('sd')) ? {display: "none !important"} : player.sd.singularityPowerEffect2.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Charger Milestone 6",
                            () => { return "x" + format(player.fa.milestoneEffect[5])}
                        ], () => { return !(player.fa.buyables[13].gte(1)) ? {display: "none !important"} : !hasMilestone("fa", 16) ? { color: "grey" } : { color: "white" }}],

                        // POWER MODIFIERS

                        ["stat-row", [
                            "Sad Buyable 2",
                            () => { return "^" + format(buyableEffect("fu", 42))}
                        ], () => { return !(layerShown('fu') && hasUpgrade("fu", 15)) ? {display: "none !important"} : getBuyableAmount("fu", 42).eq(0) ? { color: "grey" } : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "[1st Dimension] ID Multiplier: ", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.id.dimensionsPerSecond[0])}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Replicanti Chance": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ca') && player.ca.unlockedCante },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Replicanti Chance", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value",
                            "2%"
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "Cante Buyable 2",
                            () => { return "+" + format(buyableEffect("ca", 11).mul(100)) + "%"}
                        ], () => { return getBuyableAmount("ca", 11).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Cante Buyable 5",
                            () => { return "+" + format(buyableEffect("ca", 14).mul(100)) + "%"}
                        ], () => { return getBuyableAmount("ca", 14).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Cante Buyable 8",
                            () => { return "+" + format(buyableEffect("ca", 17).mul(100)) + "%"}
                        ], () => { return getBuyableAmount("ca", 17).eq(0) ? { color: "grey" } : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Replicanti Chance:", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.ca.replicateChance.mul(100)) + "%"}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Replicanti Multiplier": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ca') && player.ca.unlockedCante },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Replicanti Multiplier", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value",
                            "1.05x"
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "Cante Buyable 2",
                            () => { return "+" + format(buyableEffect("ca", 12)) + "x"}
                        ], () => { return getBuyableAmount("ca", 12).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Cante Buyable 5",
                            () => { return "+" + format(buyableEffect("ca", 15)) + "x"}
                        ], () => { return getBuyableAmount("ca", 15).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Cante Buyable 8",
                            () => { return "+" + format(buyableEffect("ca", 18)) + "x"}
                        ], () => { return getBuyableAmount("ca", 18).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Void Mod Buyable 2",
                            () => { return "+" + format(buyableEffect("rm", 34)) + "x"}
                        ], () => { return !(player.in.unlockedInfinity && hasUpgrade("bi", 27)) ? {display: "none !important"} : getBuyableAmount("rm", 34).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Moonstone Buyable 6",
                            () => { return "x" + format(buyableEffect("g", 26))}
                        ], () => { return !(player.ev.evolutionsUnlocked[7]) ? {display: "none !important"} : getBuyableAmount("g", 26).eq(0) ? { color: "grey" } : getBuyableAmount("g", 26).lt(layers.g.buyables[26].purchaseLimit()) ? { color: "white" } : { color: "gold" }}],

                        ["stat-row", [
                            "Replicator Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 108)[0])}
                        ], () => { return !(getLevelableAmount("pet", 108).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Dotknight Pet Upgrade 1",
                            () => { return "x" + format(upgradeEffect("ep0", 11))}
                        ], () => { return !(getLevelableAmount("pet", 401).gte(1)) ? {display: "none !important"} : !hasUpgrade("ep0", 11) ? { color: "grey" } : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Replicanti Multiplier:", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.ca.replicantiMult)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Replicanti Interval": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ca') && player.ca.unlockedCante },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Replicanti Interval", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value",
                            () => { return formatTime(1) }
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "Cante Buyable 3",
                            () => { return "/" + format(buyableEffect("ca", 13))}
                        ], () => { return getBuyableAmount("ca", 13).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Cante Buyable 6",
                            () => { return "/" + format(buyableEffect("ca", 16))}
                        ], () => { return getBuyableAmount("ca", 16).eq(0) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Cante Buyable 9",
                            () => { return "/" + format(buyableEffect("ca", 19))}
                        ], () => { return getBuyableAmount("ca", 19).eq(0) ? { color: "grey" } : { color: "white" }}],


                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Replicanti Interval:", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return formatTime(player.ca.replicantiTimerReq)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Cante Energy Multiplier": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ca') && player.ca.unlockedCante },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Cante Energy Multiplier", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value",
                            "1"
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "Rememberance Core Effect",
                            () => { return "x" + format(player.ca.rememberanceCoresEffect)}
                        ], () => { return !(hasUpgrade("cp", 18)) ? {display: "none !important"} : player.ca.rememberanceCoresEffect.eq(1) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Cookie Pet's 1st Effect",
                            () => { return "x" + format(levelableEffect("pet", 403)[0])}
                        ], () => { return !(getLevelableAmount("pet", 403).gte(1)) ? {display: "none !important"} : levelableEffect("pet", 403)[0].eq(1) ? {color: "grey"} : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Cante Energy Multiplier:", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.ca.canteEnergyMult)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

            "Galaxy Dust": {
                buttonStyle() { return { 'color': 'white' } },
                style: { background: '#001f18', width: '682px', height: '500px' },
                unlocked() { return layerShown('ca') && player.ca.unlockedCante && hasUpgrade("bi", 26) },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "10px"],
                            ["raw-html", "Galaxy Dust", { fontSize: '24px', fontFamily: "monospace" }],
                            ["blank", "10px"],
                        ], {background: "#666666", width: "682px", borderBottom: "2px solid white"}],

                        // Header for categories
                        ["style-row", [
                            ["style-row", [
                                ["raw-html", "Modifier Name", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "298px", height: "25px", borderRight: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", "Modifier Value", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ], { width: "382px", height: "25px"}],
                        ], {background: "#444444", width: "682px", height: "25px", borderBottom: "2px solid white"}],
                    ], {width: "682px", height: "80px"}],

                    ["always-scroll-column", [
                        ["stat-row", [
                            "Base Value<br><h6>(log10(Replicanti+1)^0.8)",
                            () => { return format(player.ca.replicanti.plus(1).log10().pow(0.8))}
                        ], {color: "white", height: "40px"}],

                        ["stat-row", [
                            "Replicator Pet's 2nd Effect",
                            () => { return "x" + format(levelableEffect("pet", 108)[1])}
                        ], () => { return !(getLevelableAmount("pet", 108).gte(1)) ? {display: "none !important"} : {color: "white"}}],

                        ["stat-row", [
                            "Charger Milestone 9",
                            () => { return "x" + format(player.fa.milestoneEffect[8])}
                        ], () => { return !(player.fa.buyables[13].gte(1)) ? {display: "none !important"} : !hasMilestone("fa", 19) ? { color: "grey" } : { color: "white" }}],

                        ["stat-row", [
                            "Sad Buyable 4",
                            () => { return "x" + format(buyableEffect("fu", 44))}
                        ], () => { return !(layerShown('fu') && hasUpgrade("fu", 15)) ? {display: "none !important"} : getBuyableAmount("fu", 44).eq(0) ? { color: "grey" } : { color: "white" }}],

                    ], {width: '682px', height: '393px'}],

                    // Total Gain
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", "Galaxy Dust Gain:", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "298px", height: "25px", borderRight: "2px solid white"}],
                        ["style-column", [
                            ["raw-html", function () { return format(player.ca.galaxyDustToGet)}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ], {width: "382px", height: "25px"}],
                    ], {background: "#333333", width: "682px", height: "25px", borderTop: "2px solid white"}],

                ]
            },

        },
        UniA1: {

        },
        Uni3: {

        },
        UniH: {

        },
    },
    tabFormat: [

        ["row", [["clickable", 2], ["clickable", 3], ["clickable", 4], ["clickable", 5], ["clickable", 6]]],

        ["blank", "50px"],

        ["style-column", [
            ["always-scroll-row", [
                ["hoverless-clickable", 11], ["hoverless-clickable", 12], ["hoverless-clickable", 13], ["hoverless-clickable", 14], ["hoverless-clickable", 15], ["hoverless-clickable", 16], ["hoverless-clickable", 17]
            ], {width: "800px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderBottom: "2px solid white"}],
            ["buttonless-microtabs", "Tabs", { 'border-width': '0px' }],
        ], {border: "2px solid white"}],

    ],
    layerShown() { return false }
})