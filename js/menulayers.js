addLayer("otherfeat", {
    name: "Otherworldly Features", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OTF", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Otherworldly Features",
    color: "white",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["po", [
            ["clickable", 1],
            ["blank", "25px"],
            ["raw-html", function () { return !inChallenge("ip", 11) ? "You have <h3>" + formatWhole(player.po.featureSlots) + "/" + formatWhole(player.po.featureSlotsMax) + "</h3> free feature slots." : "No features for you!"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
            ["raw-html", function () { return inChallenge("ip", 14) ? "You can pick an OTF once you are at pent 15." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
            ["blank", "25px"],
            ["row", [["clickable", 2], ["clickable", 3]]],
            ["blank", "25px"],
            ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15], ["clickable", 16]]],
    ]]]
],
    layerShown() { return false }
})
addLayer("halter", {
    name: "Halter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HALT", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Halter",
    color: "white",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["po", [
            ["clickable", 1],
            ["blank", "25px"],
            ["raw-html", function () { return "<h3>" + player.po.halterText[player.po.halterIndex]}],
            ["text-input", "halterInput", {
                color: "var(--color)",
                width: "400px",
                "font-family": "Calibri",
                "text-align": "left",
                "font-size": "32px",
                border: "2px solid #ffffff17",
                background: "var(--background)",
            }],
            ["blank", "25px"],
            ["row", [["clickable", 4], ["clickable", 5], ["clickable", 6], ["clickable", 7], ["clickable", 8]]],
            ["blank", "25px"],
            ["raw-html", function () { return "<h3>Enter a number greater than 1. You thought you could get away with dividing by 0?" }],
            ["raw-html", function () { return "<h4>This can help by letting you progress in OTFS while infinity is fixed. (and a whole bunch of other stuff eventually)" }],
            ["blank", "25px"],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("u1u", {
    name: "u1u", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U1U", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "white",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["i", [
            ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
            ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["blank", "10px"],
            ["bar", "infbar"],
            ["blank", "10px"],
            ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
            ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23]]],
            ["row", [["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27], ["upgrade", 28], ["upgrade", 32]]],
            ["row", [["upgrade", 20], ["upgrade", 29], ["upgrade", 31], ["upgrade", 101]]],
            ["row", [["upgrade", 37], ["upgrade", 38], ["upgrade", 39], ["upgrade", 41]]],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("u1l", {
    name: "u1l", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U1L", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["i", [
            ["blank", "25px"],
            ["infobox", "1"],
            ["infobox", "2"],
            ["infobox", "3"],
            ["infobox", "4"],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("u1t", {
    name: "u1t", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U1T", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["i", [
            ["blank", "25px"],
            ["tree", function () { return player.universe == 1 ? tree1 : null } ],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("u2l", {
    name: "u2l", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U2l", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["in", [
            ["blank", "25px"],
            ["infobox", "1"],
            ["infobox", "2"],
            ["infobox", "3"],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("u2t", {
    name: "u2t", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U2t", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["in", [
            ["blank", "25px"],
            ["tree", function () { return player.universe == 2 ? tree2 : null } ],

        ]]]
    ],
    layerShown() { return false }
})
addLayer("u3u", {
    name: "u3u", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "u3u", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["s", [
            ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
            ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
            ["raw-html", function () { return "You will gain " + format(player.s.singularityPointsToGet) + " singularity points on reset. (Based on infinity points)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return player.s.singularityPointsToGet.gte(1e20) ? "(softcapped)" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["blank", "25px"],
            ["row", [["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14],["upgrade", 15],["upgrade", 16],["upgrade", 17],]],
            ["row", [["upgrade", 18], ["upgrade", 19],["upgrade", 20]]],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("u3m", {
    name: "u3m", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "u3m", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["s", [
            ["blank", "25px"],
            ["raw-html", function () { return "You have <h3>" + formatWhole(player.s.singularities) + "</h3> singularities." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.s.singularitiesToGet) + "</h3> singularities on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["blank", "25px"],
            ["row", [["milestone", 11],]],
            ["row", [["milestone", 12],]],
            ["row", [["milestone", 13],]],
            ["row", [["milestone", 14],]],
            ["row", [["milestone", 15],]],
            ["row", [["milestone", 16],]],
            ["row", [["milestone", 17],]],
            ["row", [["milestone", 18],]],
            ["row", [["milestone", 19],]],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("u3l", {
    name: "u3l", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "u3l", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["s", [
            ["blank", "25px"],
            ["infobox", "1"],
            ["infobox", "2"],
            ["infobox", "3"],
            ["infobox", "4"],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("u3t", {
    name: "u3t", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U3t", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["s", [
            ["blank", "25px"],
            ["tree", function () { return player.universe == 3 ? tree3 : null } ],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("u3b", {
    name: "u3b", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "u3b", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["s", [
            ["blank", "25px"],
            ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
            ["raw-html", function () { return "You will gain " + format(player.s.singularityPointsToGet) + " singularity points on reset. (Based on infinity points)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return player.s.singularityPointsToGet.gte(1e20) ? "(softcapped)" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["blank", "25px"],
        ["row", [["ex-buyable", 11],["ex-buyable", 12],["ex-buyable", 13],]],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("a1u", {
    name: "a1u", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A1U", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "white",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["cp", [
            ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return "Replicanti point Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["row", [["bar", "replicantiBar"]]],
            ["blank", "25px"],
            ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
            ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19]]],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("a1s", {
    name: "a1s", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A1S", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Softcap",
    color: "white",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["cp", [
            ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return "Replicanti point Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
            ["row", [["bar", "replicantiBar"]]],
            ["blank", "25px"],
            ["raw-html", function () { return "Softcap starts at <h3>" + format(player.cp.replicantiSoftcapStart) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return "Softcap divides replicanti mult by <h3>/" + format(player.cp.replicantiSoftcapEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
            ["blank", "25px"],
            ["raw-html", function () { return player.cp.replicantiPoints.gte(player.cp.replicantiSoftcap2Start) ? "Second softcap starts at <h3>" + format(player.cp.replicantiSoftcap2Start) + "</h3>." : ""}, { "color": "#ff4545", "font-size": "20px", "font-family": "monospace" }],
            ["raw-html", function () { return player.cp.replicantiPoints.gte(player.cp.replicantiSoftcap2Start) ? "Second softcap divides replicanti mult by <h3>/" + format(player.cp.replicantiSoftcap2Effect) + "</h3>." : ""}, { "color": "#ff4545", "font-size": "20px", "font-family": "monospace" }],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("a1t", {
    name: "a1t", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A1t", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["cp", [
            ["blank", "25px"],
            ["tree", function () { return player.universe == 1.5 ? treeA1 : null } ],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("cmh", {
    name: "cmh", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Cmh", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["ch", [
            ["row", [["raw-html", function () { return "Celestial Constellation #1 - ????, the Celestial of ???????????" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
            ["blank", "25px"],
            ["row", [["clickable", 11], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 12], ]],
            ["blank", "12.5px"],
            ["row", [["clickable", 13], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["clickable", 14],]],
            ["blank", "6.125px"],
            ["row", [["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "0px", "font-family": "monospace" }],  ["clickable", 19],]],
            ["blank", "6.125px"],
            ["row", [["clickable", 15], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp"}, { "color": "white", "font-size": "50px", "font-family": "monospace" }], ["clickable", 16],]],
            ["blank", "12.5px"],
            ["row", [["clickable", 17], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["raw-html", function () { return "&nbsp&nbsp&nbsp&nbsp" }, { "color": "white", "font-size": "12.5px", "font-family": "monospace" }], ["clickable", 18], ]],
            ["blank", "25px"],
            ["infobox", 1],
            ["infobox", 2],
            ["infobox", 3],
        ]]]
    ],
    layerShown() { return false }
})
addLayer("odt", {
    name: "odt", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "odt", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Upgrades",
    color: "#eaf6f7",
    branches: ["branch"],
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["layer-proxy", ["od", [
            ["blank", "25px"],
            ["tree", function () { return player.universe == 1337 ? tree : null } ],
        ]]]
    ],
    layerShown() { return false }
})