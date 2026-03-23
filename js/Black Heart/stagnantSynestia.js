// IDEA FOR NEXT TEMPORAL CHASM STAGE: TIME IS PAUSED, BUT AUTOMATICALLY TICKS FORWARD ONCE A SECOND (AKA, NON-SMOOTH TIME)
addLayer("stagnantSynestia", {
    name: "Stagnant Synestia", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SS", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {player.subtabs["bh"]["stages"] = "stagnantSynestia"},
    startData() { return {
        unlocked: true,

        temporalDust: new Decimal(0),
        temporalShard: new Decimal(0),
        temporalMult: new Decimal(1),

        highestCombo: new Decimal(0),
        comboEffect: new Decimal(1),
        comboStart: 0,

        milestone: {
            25: 0,
            50: 0,
            75: 0,
            100: 0,
        },
        milestoneEffect: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#094394, #052653)",
            backgroundOrigin: "border-box",
            borderColor: "#021124",
            color: "#0091DC",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            marginLeft: "20px !important",
        }
        if (player.subtabs["bh"]["stages"] == "stagnantSynestia") str.outline = "3px solid #999"
        return str
    },
    tooltip: "Stagnant Synestia",
    color: "#0091DC",
    update(delta) {
        player.stagnantSynestia.comboEffect = player.stagnantSynestia.highestCombo.div(50).add(1).pow(buyableEffect("stagnantSynestia", 2))

        player.stagnantSynestia.milestoneEffect = new Decimal(1)
        for (let i = 25; i < 101; i = i+25) {
            player.stagnantSynestia.milestoneEffect = player.stagnantSynestia.milestoneEffect.add(player.stagnantSynestia.milestone[i]/20)
        }

        player.stagnantSynestia.temporalMult = new Decimal(1)
        player.stagnantSynestia.temporalMult = player.stagnantSynestia.temporalMult.mul(player.darkTemple.stagnantCurMult)
    },
    clickables: {
        "enter": {
            title: "<h2>Enter Stagnant Synestia",
            canClick: true,
            unlocked: true,
            onClick() {
                BHStageEnter("stagnantSynestia")
            },
            style: {width: "200px", minHeight: "75px", color: "white", background: "radial-gradient(#094394, #052653)", border: "3px solid #021124", borderRadius: "20px", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 3px black"},
        },
    },
    upgrades: {
        1: {
            title: "Blinding Rage",
            unlocked: true,
            description: "Unlocks Kres' \"Berserker\" skill.",
            cost: new Decimal(60),
            currencyLocation() { return player.stagnantSynestia },
            currencyDisplayName: "Temporal Dust",
            currencyInternalName: "temporalDust",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        2: {
            title: "Don't think you need that",
            unlocked: true,
            description: "Unlocks Nav's \"Soul Shred\" skill.",
            cost: new Decimal(80),
            currencyLocation() { return player.stagnantSynestia },
            currencyDisplayName: "Temporal Dust",
            currencyInternalName: "temporalDust",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        3: {
            title: "Ooo, a penny!",
            unlocked: true,
            description: "Unlock Sel's \"Scavenge\" skill.",
            cost: new Decimal(4),
            currencyLocation() { return player.stagnantSynestia },
            currencyDisplayName: "Temporal Shards",
            currencyInternalName: "temporalShard",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        4: {
            title: "Don't need that either",
            unlocked: true,
            description: "Unlock the general skill \"Reckless Abandon\".",
            cost: new Decimal(6),
            currencyLocation() { return player.stagnantSynestia },
            currencyDisplayName: "Temporal Shards",
            currencyInternalName: "temporalShard",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        5: {
            title: "Another XPBoost",
            unlocked: true,
            description: "Unlocks a third XPBoost button.",
            cost: new Decimal(100),
            currencyLocation() { return player.stagnantSynestia },
            currencyDisplayName: "Temporal Dust",
            currencyInternalName: "temporalDust",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
        6: {
            title: "Pet Energizer",
            unlocked: true,
            description: "Multiply pet points gain by x1.15.",
            cost: new Decimal(8),
            currencyLocation() { return player.stagnantSynestia },
            currencyDisplayName: "Temporal Shards",
            currencyInternalName: "temporalShard",
            style() {
                let look = {minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid rgba(0,0,0,0.5)", margin: "2px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#250121"
                return look
            },
        },
    },
    buyables: {
        1: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.stagnantSynestia.temporalDust},
            pay(amt) { player.stagnantSynestia.temporalDust = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(2)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Temporal Guard</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost character defense\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Temporal Dust"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "100px", color: "white", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "#250121"
                return look
            },
        },
        2: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.stagnantSynestia.temporalShard},
            pay(amt) { player.stagnantSynestia.temporalShard = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Checked Time</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Boost Stagnant Synestia combo effect\n\
                    Currently: ^" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Temporal Shards"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "100px", fontSize: "9px", color: "white", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "#250121"
                return look
            },
        },
        3: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.stagnantSynestia.temporalDust},
            pay(amt) { player.stagnantSynestia.temporalDust = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(2).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>Iridian Boost</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Boost star gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Temporal Dust"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "100px", color: "white", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "#250121"
                return look
            },
        },
        4: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.stagnantSynestia.temporalShard},
            pay(amt) { player.stagnantSynestia.temporalShard = this.currency().sub(amt) },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() {return this.currency().gte(this.cost())},
            display() {
                return "<h3>XPBoost Time Crunch</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Divide XPBoost button cooldown\n\
                    Currently: /" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + "<br>Temporal Shard"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "120px", height: "100px", fontSize: "9px", color: "white", border: "2px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "#250121"
                return look
            },
        },
    },
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["style-column", [
                    ["raw-html", () => {return "You have " + formatShortWhole(player.stagnantSynestia.temporalDust) + " temporal dust."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have " + formatShortWhole(player.stagnantSynestia.temporalShard) + " temporal shards."}, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "272px", height: "52px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["blank", "2px"],
                    ["row", [["upgrade", 1], ["upgrade", 2]]],
                    ["row", [["upgrade", 3], ["upgrade", 4]]],
                    ["row", [["upgrade", 5], ["upgrade", 6]]],
                    ["row", [["buyable", 1], ["buyable", 2]]],
                    ["row", [["buyable", 3], ["buyable", 4]]],
                    ["blank", "2px"],
                ], {width: "272px", height: "365px", background: "var(--miscButton)", borderRadius: "0 0 0 27px"}],
            ], {width: "272px", height: "420px", borderRight: "3px solid var(--regBorder)"}],
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", "Stagnant Synestia", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["clickable", "enter"],
                ], {width: "250px", height: "147px", background: "var(--miscButtonDisable)", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", "Properties", {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "200px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "10px"}],
                    ["raw-html", () => {return Decimal.sub(1.025, player.bh.comboScalingReduction).gt(1) ? "<u>Combo Scaling" : ""}, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return Decimal.sub(1.025, player.bh.comboScalingReduction).gt(1) ? formatSimple(Decimal.sub(1.025, player.bh.comboScalingReduction).max(1).sub(1).mul(100)) + "% starting at 25" : ""}, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "5px"],
                    ["raw-html", "<u>Time Stagnation", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", "You have to force time to move forward", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "250px", height: "197px", background: "var(--layerBackground)"}],
                ["style-row", [
                    ["layer-proxy", ["bh", [
                        ["row", [["clickable", "Auto-Enter"], ["blank", ["10px", "10px"]], ["clickable", "Auto-Exit"]]],
                    ]]],
                ], {width: "250px", height: "70px", background: "var(--miscButtonDisable)", borderTop: "3px solid var(--regBorder)"}],
            ], {width: "250px", height: "420px"}],
            ["style-column", [
                ["top-column", [
                    ["style-column", [
                        ["raw-html", () => {return "Highest Combo: " + formatWhole(player.stagnantSynestia.highestCombo) + "/" + BHS["stagnantSynestia"].comboLimit}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ], {width: "225px", height: "35px", borderBottom: "2px solid var(--regBorder)", marginBottom: "2px"}],
                    ["top-column", [
                        ["raw-html", () => {return "Boosts check back xp by x" + formatSimple(player.stagnantSynestia.comboEffect, 2)}, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "25px"}],
                    ["style-column", [
                        ["raw-html", () => {return "<p style='line-height:1.2'>Milestones multiply time speed during respawn by x" + formatSimple(player.stagnantSynestia.milestoneEffect, 2)}, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "272px", height: "47px", background: "var(--layerBackground)", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "272px", height: "114px", background: "var(--miscButtonHover)", borderBottom: "3px solid var(--regBorder)"}],
                ["theme-scroll-column", [
                    ["raw-html", () => {return "<button class='bhMilestoneButton  base' style='width:257px;height:50px' onclick='player.stagnantSynestia.comboStart=0'>Starting combo value: " + player.stagnantSynestia.comboStart + "<br>[Click to set to 0]</button>"}],
                    ["bh-milestone", [25, "stagnantSynestia", ""]],
                    ["bh-milestone", [50, "stagnantSynestia", ""]],
                    ["bh-milestone", [75, "stagnantSynestia", ""]],
                    ["bh-milestone", [100, "stagnantSynestia", ""]],
                ], {width: "272px", height: "250px", background: "var(--layerBackground)", borderBottom: "3px solid var(--regBorder)"}],
                ["style-column", [
                    ["raw-html", "<p style='line-height:1'>Clicking on a cleared milestone allows you to start at that milestones combo value.", {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                ], {width: "272px", height: "50px", background: "var(--miscButtonHover)", borderRadius: "0 0 27px 0"}],
            ], {width: "272px", height: "420px", borderLeft: "3px solid var(--regBorder)"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && hasUpgrade("ev8", 24)},
})

BHS.stagnantSynestia = {
    nameCap: "Stagnant Synestia",
    nameLow: "stagnant synestia",
    music: "music/stagnant.mp3",
    comboLimit: 100,
    comboScaling: 1.025,
    comboScalingStart: 25,
    timeStagnation: true,
    generateCelestialite(combo) {
        if (typeof combo == "object") combo = combo.toNumber()
        switch (combo) {
            case 24:
                return "staticEnas"
            case 49:
                return "staticPente"
            case 74:
                return "staticDeka"
            case 99:
                return "staticHekaton"
            default:
                let random = Math.random()
                let cel = ["staticAlpha", "staticBeta", "staticGamma", "staticDelta", "staticEpsilon", "staticZeta"]
                if (combo >= 25) cel.push("staticEta")
                if (combo >= 50) cel.push("staticTheta")
                if (combo >= 75) cel.push("staticIota")
                return cel[Math.floor(Math.random()*cel.length)]
        }
    },
}

BHC.staticAlpha = {
    name: "Celestialite Static Alpha",
    symbol: "⧖α",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(450),
    damage: new Decimal(20),
    agility: new Decimal(25),
    noRandomStats: true,
    actions: {
        0: {
            name: "Confined Rain",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                bulletHell({"bulletRain": {bulletPerSec: 10+(magnitude*2)}}, {width: 800, height: 500, duration: 7+magnitude, subArena: true, subWidth: 300-(magnitude*20), subHeight: 300-(magnitude*20)})
            },
            cooldown: new Decimal(5),
        },
        1: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "magic",
            value: new Decimal(2),
            cooldown: new Decimal(12.5),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.temporalDust = Decimal.add(4, getRandomInt(2))
        } else {
            gain.temporalShard = new Decimal(1)
        }
        return gain
    },
}

BHC.staticBeta = {
    name: "Celestialite Static Beta",
    symbol: "⧖β",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(500),
    damage: new Decimal(25),
    agility: new Decimal(20),
    noRandomStats: true,
    actions: {
        0: {
            name: "Slow Knifes",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                bulletHell({"knifeThrow": {knifeLength: 64, knifeWidth: 16, enemySpeed: 2+(magnitude/8), knifePerSec: 2+(magnitude/8)}}, {width: 500, height: 300, duration: 7+magnitude})
            },
            cooldown: new Decimal(6),
        },
        1: {
            name: "Bludgeon",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(3),
            cooldown: new Decimal(15),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.temporalDust = Decimal.add(4, getRandomInt(3))
        } else {
            gain.temporalShard = new Decimal(1)
        }
        return gain
    },
}

BHC.staticGamma = {
    name: "Celestialite Static Gamma",
    symbol: "⧖γ",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(600),
    damage: new Decimal(15),
    agility: new Decimal(15),
    noRandomStats: true,
    actions: {
        0: {
            name: "Quick Shot",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "ranged",
            value: new Decimal(1.5),
            cooldown: new Decimal(3.5),
        },
        1: {
            name: "Close Fire",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                bulletHell({"diamondAttack": {diamondAmount: 1, intervalDiv: 1+(magnitude/10)}}, {width: 100, height: 100, duration: 7+magnitude})
            },
            cooldown: new Decimal(9),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.temporalDust = Decimal.add(5, getRandomInt(5))
        } else {
            gain.temporalShard = Decimal.add(1, getRandomInt(1))
        }
        return gain
    },
}

BHC.staticDelta = {
    name: "Celestialite Static Delta",
    symbol: "⧖δ",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(550),
    damage: new Decimal(20),
    agility: new Decimal(15),
    noRandomStats: true,
    actions: {
        0: {
            name: "Multi Rain",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                bulletHell({"bulletRain": {bulletPerSec: 4+magnitude}, "inverseRain": {bulletPerSec: 4+magnitude}}, {duration: 7+magnitude})
            },
            cooldown: new Decimal(3.5),
        },
        1: {
            name: "Stab",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(2),
            cooldown: new Decimal(7),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.temporalDust = Decimal.add(7, getRandomInt(5))
        } else {
            gain.temporalShard = Decimal.add(1, getRandomInt(2))
        }
        return gain
    },
}

BHC.staticEpsilon = {
    name: "Celestialite Static Epsilon",
    symbol: "⧖ε",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(600),
    damage: new Decimal(30),
    agility: new Decimal(25),
    noRandomStats: true,
    actions: {
        0: {
            name: "Triple Shot",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "ranged",
            value: new Decimal(0.66),
            cooldown: new Decimal(5),
        },
        1: {
            name: "Sliding Knife",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                bulletHell({"knifeThrow": {knifeLength: 64, knifeWidth: 16, enemySpeed: 6, knifePerSec: 1+(magnitude/5)}}, {duration: 10+(magnitude*2), start: "left", subArena: true, subWidth: 250, subHeight: 500, subMove: "right", subSpeed: 0.5})
            },
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.temporalDust = Decimal.add(8, getRandomInt(6))
        } else {
            gain.temporalShard = Decimal.add(1, getRandomInt(2))
        }
        return gain
    },
}

BHC.staticZeta = {
    name: "Celestialite Static Zeta",
    symbol: "⧖ζ",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(550),
    damage: new Decimal(25),
    agility: new Decimal(25),
    noRandomStats: true,
    actions: {
        0: {
            name: "Circle Squad",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                bulletHell({"movingCircleRadialBurstAttack": {circleAmount: 3, burstInterval: 1300-(magnitude*100), bulletsPerBurst: 6, enemySpeed: 3, bulletSpeed: 3}}, {duration: 7+magnitude})
            },
            cooldown: new Decimal(5),
        },
        1: {
            name: "Earthquake",
            instant: true,
            type: "damage",
            target: "all",
            method: "physical",
            value: new Decimal(1),
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.temporalDust = Decimal.add(10, getRandomInt(5))
        } else {
            gain.temporalShard = Decimal.add(2, getRandomInt(2))
        }
        return gain
    },
}

BHC.staticEta = {
    name: "Celestialite Static Eta",
    symbol: "⧖η",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(650),
    damage: new Decimal(35),
    agility: new Decimal(25),
    noRandomStats: true,
    actions: {
        0: {
            name: "Airial Shot",
            instant: true,
            type: "damage",
            target: "random",
            method: "ranged",
            value: new Decimal(2),
            cooldown: new Decimal(5),
        },
        1: {
            name: "Diamond Maze",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                bulletHell({"bouncingDiamond": {diamondCount: 5+magnitude, enemySpeed: 3}}, {width: 700, height: 700, duration: 31-magnitude, timed: true, cellSize: 50, start: "cell", goal: "cell"})
            },
            cooldown: new Decimal(10),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.temporalDust = Decimal.add(12, getRandomInt(5))
        } else {
            gain.temporalShard = Decimal.add(2, getRandomInt(3))
        }
        return gain
    },
}

BHC.staticTheta = {
    name: "Celestialite Static Theta",
    symbol: "⧖θ",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(700),
    damage: new Decimal(35),
    agility: new Decimal(20),
    noRandomStats: true,
    actions: {
        0: {
            name: "Death Spiral",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                bulletHell({"centerSpiralAttack": {spiralAngle: 0, spiralRate: 0.65, spiralInterval: 55-(magnitude*5), radialStart: 0, bulletSpeed: 4, spiralBullets: true}, "centerSingleAttack": {bulletSpeed: 6, shootInterval: 800-(magnitude*50)}}, {start: "left", height: 700, duration: 7+magnitude})
            },
            cooldown: new Decimal(6),
        },
        1: {
            name: "Brutal Bludgeon",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(3),
            cooldown: new Decimal(15),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.temporalDust = Decimal.add(15, getRandomInt(5))
        } else {
            gain.temporalShard = Decimal.add(3, getRandomInt(3))
        }
        return gain
    },
}

BHC.staticIota = {
    name: "Celestialite Static Iota",
    symbol: "⧖ι",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(750),
    damage: new Decimal(30),
    agility: new Decimal(20),
    noRandomStats: true,
    actions: {
        0: {
            name: "Magic Missile",
            instant: true,
            type: "damage",
            target: "randomPlayer",
            method: "physical",
            value: new Decimal(2),
            cooldown: new Decimal(6),
        },
        1: {
            name: "Aerial Bombardment",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                bulletHell({"bombAttack": {bombsPerSecond: 1+(magnitude/8), bombFallSpeed: 4, miniBombCount: 2, miniBombSpeed: 2, miniBombDelay: 600, bulletCount: 8, bulletSpeed: 2}}, {duration: 7+magnitude})
            },
            cooldown: new Decimal(12),
        },
    },
    reward() {
        let gain = {}
        let random = Math.random()
        if (random < 0.7) {
            gain.temporalDust = Decimal.add(20, getRandomInt(5))
        } else {
            gain.temporalShard = Decimal.add(4, getRandomInt(3))
        }
        return gain
    },
}

// MINIBOSSES START
BHC.staticEnas = {
    name: "Celestialite Static Enas",
    symbol: "⧖Ι",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(3000),
    damage: new Decimal(50),
    noRandomStats: true,
    actions: {
        0: {
            name: "Tears of Fury",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                let random = Math.random()
                if (random < 0.33) {
                    bulletHell({"bulletRain": {bulletPerSec: 4+magnitude}, "inverseRain": {bulletPerSec: 4+magnitude}}, {duration: 7+magnitude})
                } else if (random < 0.66) {
                    bulletHell({"inverseRain": {bulletPerSec: 4+magnitude}, "bouncingDiamond": {diamondCount: 5+magnitude, enemySpeed: 3}}, {duration: 7+magnitude})
                } else {
                    bulletHell({"bulletRain": {bulletPerSec: 4+magnitude}, "knifeThrow": {knifeLength: 64, knifeWidth: 16, enemySpeed: 6, knifePerSec: 1.2+(magnitude/8)}}, {duration: 7+magnitude})
                }
            },
            cooldown: new Decimal(5),
        },
        1: {
            name: "Eye Drops",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(10),
            cooldown: new Decimal(10),
        },
        2: {
            name: "Capsaicin",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "agilityAdd": new Decimal(50), // Additive Effect
            },
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        gain.temporalDust = new Decimal(50)
        gain.temporalShard = new Decimal(8)
        return gain
    },
}

BHC.staticPente = {
    name: "Celestialite Static Pente",
    symbol: "⧖Π",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(4000),
    damage: new Decimal(50),
    noRandomStats: true,
    actions: {
        0: {
            name: "Caged Hatred",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                let random = Math.random()
                if (random < 0.33) {
                    bulletHell({"knifeThrow": {knifeLength: 64, knifeWidth: 16, enemySpeed: 6, knifePerSec: 1+(magnitude/5)}}, {duration: 10+(magnitude*2), start: "left", subArena: true, subWidth: 250, subHeight: 500, subMove: "right", subSpeed: 0.5})
                } else if (random < 0.66) {
                    bulletHell({"bouncingDiamond": {diamondCount: 5+magnitude, enemySpeed: 3}}, {width: 800, height: 500, duration: 10+(magnitude*2), subArena: true, subWidth: 300})
                } else {
                    bulletHell({"radialKnifeBurstAttack": {knifeLength: 40, knifeWidth: 10, burstInterval: 1500, bulletsPerBurst: 4+magnitude, enemySpeed: 5}}, {duration: 10+(magnitude*2), subArena: true, subWidth: 300})
                }
            },
            cooldown: new Decimal(4),
        },
        1: {
            name: "Binding Chains",
            active: true,
            constantType: "effect",
            constantTarget: "allPlayers",
            effects: {
                "agilityAdd": new Decimal(-50),
            },
            duration: new Decimal(5),
            cooldown: new Decimal(15),
        },
        2: {
            name: "Shielding Walls",
            instant: true,
            type: "shield",
            target: "celestialite",
            value: new Decimal(3),
            cooldown: new Decimal(20),
        },
    },
    reward() {
        let gain = {}
        gain.temporalDust = new Decimal(100)
        gain.temporalShard = new Decimal(15)
        return gain
    },
}

BHC.staticDeka = {
    name: "Celestialite Static Deka",
    symbol: "⧖Δ",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(5000),
    damage: new Decimal(50),
    luck: new Decimal(4),
    noRandomStats: true,
    actions: {
        0: {
            name: "Turret Terror",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                let random = Math.random()
                if (random < 0.33) {
                    bulletHell({"movingCircleRadialBurstAttack": {circleAmount: 3, burstInterval: 1300-(magnitude*100), bulletsPerBurst: player.bh.celestialte.luck, enemySpeed: 3, bulletSpeed: 3}}, {duration: 7+magnitude})
                } else if (random < 0.66) {
                    bulletHell({"rotatingCircleRadialBurst": {locX: 250, locY: 250, circleAmount: 4, burstInterval: 1300-(magnitude*100), orbitSpeed: 0.015, orbitRadius: 400, bulletsPerBurst: player.bh.celestialte.luck, enemySpeed: 6, bulletSpeed: 5}}, {width: 500, duration: 10+(magnitude*2)})
                } else {
                    bulletHell({"rotatingCircleRadialBurst": {locX: 500, locY: 125, circleAmount: 8, burstInterval: 1300-(magnitude*100), orbitSpeed: 0.02, orbitRadius: 200, bulletsPerBurst: player.bh.celestialte.luck, enemySpeed: 6, bulletSpeed: 5}}, {width: 250, height: 250, duration: 10+(magnitude*2)})
                }
            },
            cooldown: new Decimal(6),
        },
        1: {
            name: "More Bullets",
            instant: true,
            type: "effect",
            target: "celestialite",
            noMessage: true,
            properties: {
                "luckAdd": new Decimal(1),
            },
            cooldown: new Decimal(12),
        },
        2: {
            name: "Higher Caliber",
            instant: true,
            type: "effect",
            target: "celestialite",
            properties: {
                "damageAdd": new Decimal(5),
            },
            cooldown: new Decimal(15),
        },
    },
    reward() {
        let gain = {}
        gain.temporalDust = new Decimal(175)
        gain.temporalShard = new Decimal(25)
        return gain
    },
}

BHC.staticHekaton = {
    name: "Celestialite Static Hekaton",
    symbol: "⧖Η",
    style: {
        background: "linear-gradient(45deg, #094394, #052653)",
        color: "#0091DC",
        borderColor: "#021124",
    },
    health: new Decimal(6000),
    damage: new Decimal(50),
    noRandomStats: true,
    actions: {
        0: {
            name: "Personal Peril",
            instant: true,
            type: "function",
            target: "allPlayer",
            onTrigger(index, slot, target, magnitude) {
                let random = Math.random()
                if (random < 0.33) {
                    bulletHell({"centerIcon": {locX: 600, locY: 250, radius: 64, fillColor: "#0091DC", strokeColor: "#094394", symbol: "⧖"}, "centerSpiralAttack": {locX: 600, locY: 250, spiralAngle: 0, spiralRate: 0.65, spiralInterval: 26-(magnitude*2), radialStart: 64, bulletSpeed: 6, spiralBullets: true}}, {duration: 10+(magnitude*2)})
                } else if (random < 0.66) {
                    bulletHell({"chargingIcon": {locX: 600, locY: 250, radius: 64, fillColor: "#0091DC", strokeColor: "#094394", symbol: "⧖", enemySpeed: 5, burstBullets: 3, burstViolence: 0.5, lungeTimer: 0, lungeCooldown: 0, lastTick: false}}, {duration: 10+(magnitude*2)})
                } else {
                    bulletHell({"bouncingIcon": {locX: 600, locY: 250, radius: 64, fillColor: "#0091DC", strokeColor: "#094394", symbol: "⧖", enemySpeed: 6, shootInterval: 400-(magnitude*20)}, "bulletRain": {bulletPerSec: 2+(magnitude/2)}}, {duration: 10+(magnitude*2)})
                }
            },
            cooldown: new Decimal(6),
        },
        1: {
            name: "Bound Bandage",
            instant: true,
            type: "heal",
            target: "celestialite",
            value: new Decimal(30),
            cooldown: new Decimal(12),

            active: true,
            constantType: "effect",
            constantTarget: "celestialite",
            effects: {
                "regenAdd": new Decimal(10)
            },
            duration: new Decimal(3),
        },
        2: {
            name: "Blood Buzz",
            passive: true,
            constantType: "effect",
            target: "celestialite",
            properties: {
                "agilityAdd"() {return Decimal.sub(1, player.bh.celestialite.health.div(player.bh.celestialite.maxHealth)).mul(150)},
            },
            cooldown: new Decimal(Infinity),
        },
    },
    reward() {
        let gain = {}
        gain.temporalDust = new Decimal(250)
        gain.temporalShard = new Decimal(40)
        return gain
    },
}