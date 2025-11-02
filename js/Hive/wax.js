const baseWax = [new Decimal(1.112e99), new Decimal(1e109), new Decimal(1e119), new Decimal(1e129), new Decimal(1e139)]

addLayer("wa", {
    name: "Wax", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "WA", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        cwi: 0, // Current Wax Index
        wps: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], // Wax Per Second

        cbw: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], // Current Boost Wax
        tbw: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], // Total Boost Wax
        wtl: [new Decimal(1e100), new Decimal(1e110), new Decimal(1e120), new Decimal(1e130), new Decimal(1e140)], // Wax Till Next Level
        cwl: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], // Current Wax Level

        wbe: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)], // Wax Boost Effect
    }},
    automate() {},
    nodeStyle() {
        return {
            backgroundColor: "#f3e3c2",
            borderColor: "#997F4C",
        }
    },
    tooltip: "Wax",
    color: "#f3e3c2",
    branches: ["bb" ,"ho"],
    update(delta) {
        let onepersec = new Decimal(1)

        // Wax Calculations
        for (let i = 0; i < 5; i++) {
            player.wa.cbw[i] = player.wa.cbw[i].add(player.wa.wps[i].mul(delta))
            player.wa.tbw[i] = player.wa.tbw[i].add(player.wa.wps[i].mul(delta))
            player.wa.wbe[i] = new Decimal(2).pow(player.wa.cwl[i])
            player.wa.wtl[i] = layers.wa.levelToXP(player.wa.cwl[i].add(1), i).sub(layers.wa.levelToXP(player.wa.cwl[i], i))
            if (player.wa.cbw[i].gte(player.wa.wtl[i])) {
                layers.wa.levelup(i)
            }
        }
    },
    levelToXP(quantity, index) {
        quantity = new Decimal(10+(index*5)).pow(quantity.add(baseWax[index].log(10+(index*5))))
        return quantity
    },
    xpToLevel(quantity, index) {
        quantity = quantity.div(baseWax[index]).log(10+(index*5)).floor()
        return quantity
    },
    levelup(index) {
        let leftover = new Decimal(0)
        player.wa.cwl[index] = layers.wa.xpToLevel(player.wa.tbw[index], index)
        leftover = player.wa.tbw[index] - layers.wa.levelToXP(player.wa.cwl[index], index)
        player.wa.cbw[index] = new Decimal(0)
        player.wa.cbw[index] = player.wa.cbw[index].add(leftover)
    },
    clickables: {
        2: {
            title() { return "Lv." + formatWhole(player.wa.cwl[0]) + "<br>BPS<br>x" + format(player.wa.wbe[0]) },
            canClick() { return player.wa.cwi != 0 },
            unlocked() { return true },
            onClick() {
                player.wa.cwi = 0
            },
            style: { width: '125px', minHeight: '75px', fontSize: '10px', borderRadius: '0px' },
        },
        3: {
            title() { return "Lv." + formatWhole(player.wa.cwl[1]) + "<br>Pollen<br>x" + format(player.wa.wbe[1]) },
            canClick() { return player.wa.cwi != 1 },
            unlocked() { return true },
            onClick() {
                player.wa.cwi = 1
            },
            style: { width: '125px', minHeight: '75px', fontSize: '10px', borderRadius: '0px' },
        },
        4: {
            title() { return "Lv." + formatWhole(player.wa.cwl[2]) + "<br>Nectar<br>x" + format(player.wa.wbe[2]) },
            canClick() { return player.wa.cwi != 2 },
            unlocked() { return true },
            onClick() {
                player.wa.cwi = 2
            },
            style: { width: '125px', minHeight: '75px', fontSize: '10px', borderRadius: '0px' },
        },
        5: {
            title() { return "Lv." + formatWhole(player.wa.cwl[3]) + "<br>Bee Bread<br>x" + format(player.wa.wbe[3]) },
            canClick() { return player.wa.cwi != 3 },
            unlocked() { return true },
            onClick() {
                player.wa.cwi = 3
            },
            style: { width: '125px', minHeight: '75px', fontSize: '10px', borderRadius: '0px' },
        },
        6: {
            title() { return "Lv." + formatWhole(player.wa.cwl[4]) + "<br>Honey<br>x" + format(player.wa.wbe[4]) },
            canClick() { return player.wa.cwi != 4 },
            unlocked() { return true },
            onClick() {
                player.wa.cwi = 4
            },
            style: { width: '125px', minHeight: '75px', fontSize: '10px', borderRadius: '0px' },
        },
        7: {
            title() { return "1%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.wa.wps[player.wa.cwi] = player.wa.wps[player.wa.cwi].add(player.bee.bees.div(100))
                player.bee.bees = player.bee.bees.sub(player.bee.bees.div(100))
            },
            style: { width: '75px', minHeight: '50px', fontSize: '12px' },
        },
        8: {
            title() { return "10%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.wa.wps[player.wa.cwi] = player.wa.wps[player.wa.cwi].add(player.bee.bees.div(10))
                player.bee.bees = player.bee.bees.sub(player.bee.bees.div(10))
            },
            style: { width: '75px', minHeight: '50px', fontSize: '12px', },
        },
        9: {
            title() { return "100%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.wa.wps[player.wa.cwi] = player.wa.wps[player.wa.cwi].add(player.bee.bees)
                player.bee.bees = new Decimal(0)
            },
            style: { width: '75px', minHeight: '50px', fontSize: '12px' },
        },
    },
    bars: {
        waxBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 575,
            height: 50,
            progress() {
                return player.wa.cbw[player.wa.cwi].div(player.wa.wtl[player.wa.cwi])
            },
            baseStyle: {
                backgroundColor: "#665533"
            },
            fillStyle: {
                backgroundColor: "white"
            },
            textStyle: {
                fontSize: "24px"
            },
            display() {
                return format(player.wa.cbw[player.wa.cwi]) + "/" + format(player.wa.wtl[player.wa.cwi]);
            },
        },
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.bee.bees) + "</h3> bees (" + format(player.bee.bps) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "10px"],
        ["clickable", 1],
        ["blank", "25px"],
        ["style-column", [
            ["style-row", [
                ["clickable", 2], ["clickable", 3], ["clickable", 4], ["clickable", 5], ["clickable", 6],
            ], { borderBottom: "2px solid white" }],
            ["style-column", [
                ["blank", "25px"],
                ["raw-html", function () { return player.wa.cwi == 0 ? "Bees Per Second: x" + format(player.wa.wbe[0]) : ""}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                ["raw-html", function () { return player.wa.cwi == 1 ? "Pollen: x" + format(player.wa.wbe[1]) : ""}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                ["raw-html", function () { return player.wa.cwi == 2 ? "Nectar: x" + format(player.wa.wbe[2]) : ""}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                ["raw-html", function () { return player.wa.cwi == 3 ? "Bee Bread: x" + format(player.wa.wbe[3]) : ""}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                ["raw-html", function () { return player.wa.cwi == 4 ? "Honey: x" + format(player.wa.wbe[4]) : ""}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                ["blank", "10px"],
                ["bar", "waxBar"],
                ["raw-html", function () { return "+" + format(player.wa.wps[player.wa.cwi]) + "/s"}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                ["blank", "25px"],
                ["style-column", [
                    ["blank", "10px"],
                    ["raw-html", function () { return "Allocate Bees"}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "10px"],
                    ["row", [["clickable", 7], ["clickable", 8], ["clickable", 9]]],
                    ["blank", "10px"],
                ], {backgroundColor: "#665533", width: "615px", borderRadius: "15px"}],
                ["blank", "5px"]
            ], {backgroundColor: "#997F4C"}],
        ], { border: "2px solid white" }],
    ],
    layerShown() { return player.startedGame && false }
})
