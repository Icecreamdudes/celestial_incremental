const RUNE_EFFECTS = {
    1: {
        1: {
            hp: 1,
            dmg: 0.1,
            d1c: 0.1,
            agi: 1,
        },
        2: {
            hp: 2,
            dmg: 0.2,
            d1c: 0.15,
            agi: 2,
        },
        3: {
            hp: 3,
            dmg: 0.3,
            d1c: 0.2,
            agi: 3,
        },
        4: {
            hp: 4,
            dmg: 0.4,
            d1c: 0.25,
            rgn: 0.05,
        },
        5: {
            sp: 1,
            scd: 0.5,
            hpMult: 0.1,
            dmgMult: 0.1,
        },
        6: {
            hp: 5,
            dmg: 0.5,
            d1c: 0.3,
            agi: 4,
        },
        7: {
            hp: 6,
            dmg: 0.6,
            d1c: 0.35,
            agi: 5,
        },
    },
    2: {
        1: {
            hp: 2,
            dmg: 0.2,
            d2c: 0.1,
            def: 1,
        },
        2: {
            hp: 3,
            dmg: 0.3,
            d2c: 0.15,
            def: 2,
        },
        3: {
            hp: 4,
            dmg: 0.4,
            d2c: 0.2,
            def: 3,
        },
        4: {
            hp: 5,
            dmg: 0.5,
            d2c: 0.25,
            rgn: 0.1,
        },
        5: {
            sp: 2,
            scd: 0.5,
            hpMult: 0.2,
            dmgMult: 0.2,
        },
        6: {
            hp: 6,
            dmg: 0.6,
            d2c: 0.3,
            def: 4,
        },
        7: {
            hp: 7,
            dmg: 0.7,
            d2c: 0.35,
            def: 5,
        },
    },
    3: {
        1: {
            hp: 3,
            dmg: 0.3,
            d3c: 0.1,
            luck: 1,
        },
        2: {
            hp: 4,
            dmg: 0.4,
            d3c: 0.15,
            luck: 2,
        },
        3: {
            hp: 5,
            dmg: 0.5,
            d3c: 0.2,
            luck: 3,
        },
        4: {
            hp: 6,
            dmg: 0.6,
            d3c: 0.25,
            rgn: 0.15,
        },
        5: {
            sp: 3,
            scd: 0.5,
            hpMult: 0.3,
            dmgMult: 0.3,
        },
        6: {
            hp: 7,
            dmg: 0.7,
            d3c: 0.3,
            luck: 4,
        },
        7: {
            hp: 8,
            dmg: 0.8,
            d3c: 0.35,
            luck: 5,
        },
    },
    4: {
        1: {
            hp: 4,
            dmg: 0.4,
            ssc: 0.1,
            agiMult: 0.05,
        },
        2: {
            hp: 5,
            dmg: 0.5,
            ssc: 0.15,
            agiMult: 0.1,
        },
        3: {
            hp: 6,
            dmg: 0.6,
            ssc: 0.2,
            agiMult: 0.15,
        },
        4: {
            hp: 7,
            dmg: 0.7,
            ssc: 0.25,
            rgn: 0.2,
        },
        5: {
            sp: 4,
            scd: 0.5,
            hpMult: 0.4,
            dmgMult: 0.4,
        },
        6: {
            hp: 8,
            dmg: 0.8,
            ssc: 0.3,
            agiMult: 0.2,
        },
        7: {
            hp: 9,
            dmg: 0.9,
            ssc: 0.35,
            agiMult: 0.25,
        },
    },
    5: {
        1: {
            hp: 5,
            dmg: 0.5,
            d4c: 0.1,
            mnd: 1,
        },
        2: {
            hp: 6,
            dmg: 0.6,
            d4c: 0.15,
            mnd: 2,
        },
        3: {
            hp: 7,
            dmg: 0.7,
            d4c: 0.2,
            mnd: 3,
        },
        4: {
            hp: 8,
            dmg: 0.8,
            d4c: 0.25,
            rgn: 0.25,
        },
        5: {
            sp: 5,
            scd: 0.5,
            hpMult: 0.5,
            dmgMult: 0.5,
        },
        6: {
            hp: 9,
            dmg: 0.9,
            d4c: 0.3,
            mnd: 4,
        },
        7: {
            hp: 10,
            dmg: 1,
            d4c: 0.35,
            mnd: 5,
        },
    },
}
addLayer("darkTemple", {
    name: "Temple of Darkness", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⛩", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "BH",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    onClick() {
        player.subtabs["bh"]["stages"] = "darkTemple"
    },
    startData() { return {
        unlocked: true,

        tab: "level",
        selection: 1,
        runeCap: new Decimal(5),
        tierCap: new Decimal(3),
        totalLevel: new Decimal(0),
        runeCostDiv: new Decimal(1),
        bestowalCostDiv: new Decimal(1),

        byproduct: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
        },
        byproductCap: new Decimal(1),
        byproductMult: new Decimal(1),

        spAdd: new Decimal(0),
        skillCost: new Decimal(1),

        hpAdd: new Decimal(0),
        hpMult: new Decimal(0),

        dmgAdd: new Decimal(0),
        dmgMult: new Decimal(0),

        agiAdd: new Decimal(0),
        agiMult: new Decimal(0),

        defAdd: new Decimal(0),

        rgnAdd: new Decimal(0),

        luckAdd: new Decimal(0),

        mndAdd: new Decimal(0),

        potAdd: new Decimal(0),

        depth1CurMult: new Decimal(1),
        depth2CurMult: new Decimal(1),
        depth3CurMult: new Decimal(1),
        depth4CurMult: new Decimal(1),
        stagnantCurMult: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        let str = {
            background: "radial-gradient(#113, black)",
            backgroundOrigin: "border-box",
            borderColor: "#226",
            color: "#88f",
            textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, 0px 0px 5px black",
            margin: "0 0 20px 60px !important",
        }
        if (player.subtabs["bh"]["stages"] == "darkTemple") str.outline = "3px solid #999"
        return str
    },
    tooltip: '',
    color: "#88f",
    update(delta) {
        player.darkTemple.runeCap = new Decimal(5)
        if (player.matosLair.milestone[25] >= 3) player.darkTemple.runeCap = player.darkTemple.runeCap.add(1)
        if (player.alephsChamber.milestone[25] >= 3) player.darkTemple.runeCap = player.darkTemple.runeCap.add(1)
        player.darkTemple.totalLevel = new Decimal(0)
        let stats = {}
        for (let j = 1; j < 6; j++) {
            let mult = getBuyableAmount("darkTemple", j+100) ? 1+(getBuyableAmount("darkTemple", j+100).toNumber()/2) : 1
            for (let i = 1; i < getBuyableAmount("darkTemple", j).add(1); i++) {
                stats = addObject(stats, RUNE_EFFECTS[j][i], mult)
            }
            player.darkTemple.totalLevel = player.darkTemple.totalLevel.add(getBuyableAmount("darkTemple", j).mul(mult))
        }
        if (stats.sp) player.darkTemple.spAdd = new Decimal(stats.sp).floor()
        if (stats.scd) player.darkTemple.skillCost = Decimal.pow(2, stats.scd)
        if (stats.hp) player.darkTemple.hpAdd = new Decimal(stats.hp)
        if (stats.hpMult) player.darkTemple.hpMult = new Decimal(stats.hpMult)
        if (stats.dmg) player.darkTemple.dmgAdd = new Decimal(stats.dmg)
        if (stats.dmgMult) player.darkTemple.dmgMult = new Decimal(stats.dmgMult)
        if (stats.agi) player.darkTemple.agiAdd = new Decimal(stats.agi)
        if (stats.agiMult) player.darkTemple.agiMult = new Decimal(stats.agiMult)
        if (stats.def) player.darkTemple.defAdd = new Decimal(stats.def)
        if (stats.rgn) player.darkTemple.rgnAdd = new Decimal(stats.rgn)
        if (stats.luck) player.darkTemple.luckAdd = new Decimal(stats.luck)
        if (stats.mnd) player.darkTemple.mndAdd = new Decimal(stats.mnd)
        if (stats.pot) player.darkTemple.potAdd = new Decimal(stats.pot)
        if (stats.d1c) player.darkTemple.depth1CurMult = Decimal.add(1, stats.d1c)
        if (stats.d2c) player.darkTemple.depth2CurMult = Decimal.add(1, stats.d2c)
        if (stats.d3c) player.darkTemple.depth3CurMult = Decimal.add(1, stats.d3c)
        if (stats.ssc) player.darkTemple.stagnantCurMult = Decimal.add(1, stats.ssc)
        if (stats.d4c) player.darkTemple.depth4CurMult = Decimal.add(1, stats.d4c)

        player.darkTemple.runeCostDiv = new Decimal(1)
        player.darkTemple.runeCostDiv = player.darkTemple.runeCostDiv.mul(buyableEffect("darkTemple", 1013))

        player.darkTemple.bestowalCostDiv = new Decimal(1)
        player.darkTemple.bestowalCostDiv = player.darkTemple.bestowalCostDiv.mul(buyableEffect("depth1", 104))
        player.darkTemple.bestowalCostDiv = player.darkTemple.bestowalCostDiv.mul(buyableEffect("depth2", 104))

        player.darkTemple.byproductMult = new Decimal(1)
        if (hasUpgrade("darkTemple", 8)) player.darkTemple.byproductMult = player.darkTemple.byproductMult.mul(upgradeEffect("darkTemple", 8))

        if (player.darkTemple.byproduct[1]) {
            let eff1 = getBuyableAmount("darkTemple", 1).mul(getBuyableAmount("darkTemple", 101).div(2).add(1))
            player.depth1.gloomingUmbrite = player.depth1.gloomingUmbrite.add(new Decimal(3).mul(eff1).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
            player.depth1.dimUmbrite = player.depth1.dimUmbrite.add(new Decimal(1).mul(eff1).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
            player.bh.darkEssence = player.bh.darkEssence.add(new Decimal(0.3).mul(eff1).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
        }
        if (player.darkTemple.byproduct[2]) {
            let eff2 = getBuyableAmount("darkTemple", 2).mul(getBuyableAmount("darkTemple", 102).div(2).add(1))
            player.depth2.faintUmbrite = player.depth2.faintUmbrite.add(new Decimal(4).mul(eff2).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
            player.depth2.clearUmbrite = player.depth2.clearUmbrite.add(new Decimal(1.5).mul(eff2).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
            player.bh.darkEssence = player.bh.darkEssence.add(new Decimal(0.6).mul(eff2).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
        }
        if (player.darkTemple.byproduct[3]) {
            let eff3 = getBuyableAmount("darkTemple", 3)
            player.depth3.vividUmbrite = player.depth3.vividUmbrite.add(new Decimal(5).mul(eff3).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
            player.depth3.lustrousUmbrite = player.depth3.lustrousUmbrite.add(new Decimal(2).mul(eff3).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
            player.bh.darkEssence = player.bh.darkEssence.add(new Decimal(0.9).mul(eff3).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
        }
        if (player.darkTemple.byproduct[4]) {
            let eff4 = getBuyableAmount("darkTemple", 4)
            player.stagnantSynestia.temporalDust = player.stagnantSynestia.temporalDust.add(new Decimal(4).mul(eff4).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
            player.stagnantSynestia.temporalShard = player.stagnantSynestia.temporalShard.add(new Decimal(0.5).mul(eff4).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
        }
        if (player.darkTemple.byproduct[5]) {
            let eff5 = getBuyableAmount("darkTemple", 5)
            player.depth4.gloomingNocturnium = player.depth4.gloomingNocturnium.add(new Decimal(10).mul(eff5).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
            player.depth4.dimNocturnium = player.depth4.dimNocturnium.add(new Decimal(3).mul(eff5).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
            player.bh.darkEssence = player.bh.darkEssence.add(new Decimal(1.5).mul(eff5).mul(player.darkTemple.byproductMult).div(3600).mul(delta))
        }
    },
    clickables: {
        1: {
            title: "ᚠ",
            canClick() {
                if (player.darkTemple.tab == "tier") return player.depth1.lowestCombo.lt(0)
                return player.depth1.unlocked
            },
            unlocked: true,
            branches: [[3, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 1
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                    if (getBuyableAmount("darkTemple", 1).gte(player.darkTemple.runeCap)) look.background = "#226"
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                    if (getBuyableAmount("darkTemple", 101).gte(player.darkTemple.tierCap)) look.background = "#224"
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[1]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 1) look.borderColor = "#ccf"
                return look
            },
        },
        2: {
            title: "ᚢ",
            canClick() {
                if (player.darkTemple.tab == "tier") return player.depth2.lowestCombo.lt(0)
                return player.depth2.unlocked
            },
            unlocked: true,
            branches: [[4, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 2
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                    if (getBuyableAmount("darkTemple", 2).gte(player.darkTemple.runeCap)) look.background = "#226"
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                    if (getBuyableAmount("darkTemple", 102).gte(player.darkTemple.tierCap)) look.background = "#224"
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[2]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 2) look.borderColor = "#ccf"
                return look
            },
        },
        3: {
            title: "ᚦ",
            canClick() {
                if (player.darkTemple.tab == "tier") return player.depth3.lowestCombo.lt(0)
                return player.depth3.unlocked
            },
            unlocked: true,
            branches: [[5, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 3
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                    if (getBuyableAmount("darkTemple", 3).gte(player.darkTemple.runeCap)) look.background = "#226"
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[3]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 3) look.borderColor = "#ccf"
                return look
            },
        },
        4: {
            title: "ᚱ",
            canClick() {
                if (player.darkTemple.tab == "tier") return player.stagnantSynestia.lowestCombo.lt(0)
                return player.stagnantSynestia.unlocked
            },
            unlocked: true,
            branches: [[6, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 4
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                    if (getBuyableAmount("darkTemple", 4).gte(player.darkTemple.runeCap)) look.background = "#226"
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[4]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 4) look.borderColor = "#ccf"
                return look
            },
        },
        5: {
            title: "ᚴ",
            canClick() {
                if (player.darkTemple.tab == "tier") return player.depth4.lowestCombo.lt(0)
                return player.depth4.unlocked
            },
            unlocked: true,
            branches: [[7, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 5
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                    if (getBuyableAmount("darkTemple", 5).gte(player.darkTemple.runeCap)) look.background = "#226"
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[5]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 5) look.borderColor = "#ccf"
                return look
            },
        },
        6: {
            title: "ᛁ",
            canClick() {return false},
            unlocked: true,
            branches: [[8, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 6
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[6]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 6) look.borderColor = "#ccf"
                return look
            },
        },
        7: {
            title: "ᛋ",
            canClick() {return false},
            unlocked: true,
            branches: [[9, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 7
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[7]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 7) look.borderColor = "#ccf"
                return look
            },
        },
        8: {
            title: "ᛒ",
            canClick() {return false},
            unlocked: true,
            branches: [[10, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 8
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[8]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 8) look.borderColor = "#ccf"
                return look
            },
        },
        9: {
            title: "ᛚ",
            canClick() {return false},
            unlocked: true,
            branches: [[11, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 9
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[9]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 9) look.borderColor = "#ccf"
                return look
            },
        },
        10: {
            title: "ᛃ",
            canClick() {return false},
            unlocked: true,
            branches: [[12, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 10
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[10]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 10) look.borderColor = "#ccf"
                return look
            },
        },
        11: {
            title: "ᛪ",
            canClick() {return false},
            unlocked: true,
            branches: [[1, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 11
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[11]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 11) look.borderColor = "#ccf"
                return look
            },
        },
        12: {
            title: "ᛥ",
            canClick() {return false},
            unlocked: true,
            branches: [[2, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 12
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.tab == "level") {
                    look.background = "#113"
                    look.border = "3px solid #339"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                } else if (player.darkTemple.tab == "tier") {
                    look.background = "#112"
                    look.border = "3px solid #336"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #112"} else {look.boxShadow = "0px 0px 15px #336"}
                } else if (player.darkTemple.tab == "byproduct") {
                    look.background = "#115"
                    look.border = "3px solid #33e"
                    if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #115"} else {look.boxShadow = "0px 0px 15px #33e"}
                    if (player.darkTemple.byproduct[12]) look.background = "#22a"
                }
                if (player.darkTemple.selection == 12) look.borderColor = "#ccf"
                return look
            },
        },
        "byproductToggle": {
            title() {return player.darkTemple.byproduct[player.darkTemple.selection] ? "Unselect" : "Select"},
            canClick() {
                let amt = 0
                for (let i = 1; i < 13; i++) {
                    if (player.darkTemple.byproduct[i]) amt++
                }
                return Decimal.lt(amt, player.darkTemple.byproductCap) || player.darkTemple.byproduct[player.darkTemple.selection]
            },
            unlocked() {return player.darkTemple.tab == "byproduct"},
            onClick() {
                if (player.darkTemple.byproduct[player.darkTemple.selection]) {
                    player.darkTemple.byproduct[player.darkTemple.selection] = false
                } else {
                    player.darkTemple.byproduct[player.darkTemple.selection] = true
                }
            },
            style() {
                let look = {width: "200px", minHeight: "35px", color: "var(--textColor)", fontSize: "12px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0 0 27px 27px"}
                !this.canClick() ? look.background = "#361e1e" : player.darkTemple.byproduct[player.darkTemple.selection] ? look.background =  "var(--miscButton)" : look.background = "var(--miscButtonDisable)"
                return look
            },
        },
        "level": {
            title: "Rune Levels",
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["darkTemple"]["stuff"] = "runes"
                player.darkTemple.tab = "level"
                player.darkTemple.selection = 1
            },
            style: {width: "172px", minHeight: "40px", color: "#88f", background: "#113", border: "3px solid #339", borderRadius: "0"},
        },
        "tier": {
            title: "Rune Tiers",
            canClick: true,
            unlocked() {return hasUpgrade("darkTemple", 12)},
            onClick() {
                player.subtabs["darkTemple"]["stuff"] = "runes"
                player.darkTemple.tab = "tier"
                player.darkTemple.selection = 1
            },
            style: {width: "172px", minHeight: "40px", color: "#88f", background: "#112", border: "3px solid #336", borderRadius: "0"},
        },
        "byproduct": {
            title() {
                let amt = 0
                for (let i = 1; i < 13; i++) {
                    if (player.darkTemple.byproduct[i]) amt++
                }
                return "Rune By-Products<br><small>[" + formatWhole(amt) + "/" + formatWhole(player.darkTemple.byproductCap) + "]</small>"
            },
            canClick: true,
            unlocked() {return hasUpgrade("darkTemple", 4)},
            onClick() {
                player.subtabs["darkTemple"]["stuff"] = "runes"
                player.darkTemple.tab = "byproduct"
                player.darkTemple.selection = 1
            },
            style: {width: "172px", minHeight: "40px", height: "40px", lineHeight: "1", color: "#88f", background: "#115", border: "3px solid #33e", borderRadius: "0"},
        },
        "bestowal": {
            title: "Bestowals",
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["darkTemple"]["stuff"] = "bestowal"
            },
            style: {width: "172px", minHeight: "40px", color: "#C71585", background: "#13020d", border: "3px solid #3b0627", borderRadius: "0"},
        },
    },
    upgrades: {
        2: {
            unlocked: true,
            fullDisplay() {
                return !this.canAfford() ? "<h3>You need " + formatWhole(Decimal.sub(5, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Boost DCP based on dark essence<br>Currently: x" + formatSimple(this.effect()) + "<br><br>Cost: " + formatSimple(this.cost) + " " + this.currencyDisplayName
            },
            cost: new Decimal(10),
            canAfford() {return player.darkTemple.totalLevel.gte(5)},
            currencyLocation() {return player.bh },
            currencyDisplayName: "Dark Essence",
            currencyInternalName: "darkEssence",
            effect() {return player.bh.darkEssence.pow(0.5).add(1)},
            style() {
                let look = {width: "140px", minHeight: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) {look.backgroundColor = "#0d1d07"}
                else if (!this.canAfford()) look.backgroundColor = "#000"
                else if (!canAffordUpgrade(this.layer, this.id)) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look
            },
        },
        4: {
            unlocked: true,
            fullDisplay() {
                return !this.canAfford() ? "<h3>You need " + formatWhole(Decimal.sub(10, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Unlock rune<br>by-products<br><br>Cost: " + formatSimple(this.cost) + " " + this.currencyDisplayName
            },
            cost: new Decimal(25),
            canAfford() {return player.darkTemple.totalLevel.gte(10)},
            currencyLocation() {return player.bh },
            currencyDisplayName: "Dark Essence",
            currencyInternalName: "darkEssence",
            style() {
                let look = {width: "140px", minHeight: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) look.backgroundColor = "#0d1d07"
                else if (!this.canAfford()) look.backgroundColor = "#000"
                else if (!canAffordUpgrade(this.layer, this.id)) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look
            },
        },
        6: {
            unlocked: true,
            fullDisplay() {
                return !this.canAfford() ? "<h3>You need " + formatWhole(Decimal.sub(15, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Reduce CB level req. based on eff. rune levels<br>Currently: /" + formatSimple(this.effect(), 2) + "<br><br>Cost: " + formatSimple(this.cost) + " " + this.currencyDisplayName
            },
            cost: new Decimal(75),
            canAfford() {return player.darkTemple.totalLevel.gte(15)},
            currencyLocation() {return player.bh },
            currencyDisplayName: "Dark Essence",
            currencyInternalName: "darkEssence",
            effect() {return player.darkTemple.totalLevel.add(1).log(2).div(5).add(1)},
            style() {
                let look = {width: "140px", minHeight: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) look.backgroundColor = "#0d1d07"
                else if (!this.canAfford()) look.backgroundColor = "#000"
                else if (!canAffordUpgrade(this.layer, this.id)) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look
            },
        },
        8: {
            unlocked: true,
            fullDisplay() {
                return !this.canAfford() ? "<h3>You need " + formatWhole(Decimal.sub(20, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Increase rune by-product gain based on bestowals<br>Currently: x" + formatSimple(this.effect(), 2) + "<br><br>Cost: " + formatSimple(this.cost) + " " + this.currencyDisplayName
            },
            cost: new Decimal(200),
            canAfford() {return player.darkTemple.totalLevel.gte(20)},
            currencyLocation() {return player.bh },
            currencyDisplayName: "Dark Essence",
            currencyInternalName: "darkEssence",
            effect() {
                let amt = new Decimal(player.darkTemple.upgrades.length)
                for (let i = 1001; i < 1016; i = i+2) {
                    amt = amt.add(getBuyableAmount("darkTemple", i))
                }
                return amt.div(100).add(1)
            },
            style() {
                let look = {width: "140px", minHeight: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) look.backgroundColor = "#0d1d07"
                else if (!this.canAfford()) look.backgroundColor = "#000"
                else if (!canAffordUpgrade(this.layer, this.id)) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look
            },
        },
        10: {
            unlocked: true,
            fullDisplay() {
                return !this.canAfford() ? "<h3>You need " + formatWhole(Decimal.sub(25, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Unlock Negative Depth 1<br><br>Cost: " + formatSimple(this.cost) + " " + this.currencyDisplayName
            },
            cost: new Decimal(500),
            canAfford() {return player.darkTemple.totalLevel.gte(25)},
            currencyLocation() {return player.bh },
            currencyDisplayName: "Dark Essence",
            currencyInternalName: "darkEssence",
            style() {
                let look = {width: "140px", minHeight: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) look.backgroundColor = "#0d1d07"
                else if (!this.canAfford()) look.backgroundColor = "#000"
                else if (!canAffordUpgrade(this.layer, this.id)) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look
            },
        },
        12: {
            unlocked: true,
            fullDisplay() {
                return !this.canAfford() ? "<h3>You need " + formatWhole(Decimal.sub(30, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Unlock Rune Tiers<br><br>Cost: " + formatSimple(this.cost) + " " + this.currencyDisplayName
            },
            cost: new Decimal(10),
            canAfford() {return player.darkTemple.totalLevel.gte(30)},
            currencyLocation() {return player.bh },
            currencyDisplayName: "Dark Ether",
            currencyInternalName: "darkEther",
            style() {
                let look = {width: "140px", minHeight: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) look.backgroundColor = "#0d1d07"
                else if (!this.canAfford()) look.backgroundColor = "#000"
                else if (!canAffordUpgrade(this.layer, this.id)) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look
            },
        },
        14: {
            unlocked: true,
            fullDisplay() {
                return !this.canAfford() ? "<h3>You need " + formatWhole(Decimal.sub(35, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Skill points buff ship battle damage<br>Currently: x" + formatSimple(this.effect(), 2) + "<br><br>Cost: " + formatSimple(this.cost) + " " + this.currencyDisplayName
            },
            cost: new Decimal(40),
            canAfford() {return player.darkTemple.totalLevel.gte(35)},
            currencyLocation() {return player.bh },
            currencyDisplayName: "Dark Ether",
            currencyInternalName: "darkEther",
            effect() {return player.bh.maxSkillPoints.add(1).log(10).div(15).add(1)},
            style() {
                let look = {width: "140px", minHeight: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) look.backgroundColor = "#0d1d07"
                else if (!this.canAfford()) look.backgroundColor = "#000"
                else if (!canAffordUpgrade(this.layer, this.id)) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look
            },
        },
        16: {
            unlocked: true,
            fullDisplay() {
                return !this.canAfford() ? "<h3>You need " + formatWhole(Decimal.sub(40, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Replace bestowal buyable purchase hardcap with softcap<br><br>Cost: " + formatSimple(this.cost) + " " + this.currencyDisplayName
            },
            cost: new Decimal(125),
            canAfford() {return player.darkTemple.totalLevel.gte(40)},
            currencyLocation() {return player.bh },
            currencyDisplayName: "Dark Ether",
            currencyInternalName: "darkEther",
            style() {
                let look = {width: "140px", minHeight: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) look.backgroundColor = "#0d1d07"
                else if (!this.canAfford()) look.backgroundColor = "#000"
                else if (!canAffordUpgrade(this.layer, this.id)) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look
            },
        },
        18: {
            unlocked: true,
            fullDisplay() {
                return !this.canAfford() ? "<h3>You need " + formatWhole(Decimal.sub(50, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "[COMING SOON]<br><br>Cost: " + formatSimple(this.cost) + " " + this.currencyDisplayName
            },
            cost: new Decimal(500),
            canAfford() {return player.darkTemple.totalLevel.gte(50)},
            currencyLocation() {return player.bh },
            currencyDisplayName: "Dark Ether",
            currencyInternalName: "darkEther",
            style() {
                let look = {width: "140px", minHeight: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (hasUpgrade(this.layer, this.id)) look.backgroundColor = "#0d1d07"
                else if (!this.canAfford()) look.backgroundColor = "#000"
                else if (!canAffordUpgrade(this.layer, this.id)) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look
            },
        },
    },
    buyables: {
        1001: {
            costBase() {
                if (getBuyableAmount(this.layer, this.id).gte(10) && hasUpgrade("darkTemple", 16)) return new Decimal(0.01).div(player.darkTemple.bestowalCostDiv)
                return new Decimal(5).div(player.darkTemple.bestowalCostDiv)
            },
            costGrowth() {
                if (getBuyableAmount(this.layer, this.id).gte(10) && hasUpgrade("darkTemple", 16)) return new Decimal(3)
                return new Decimal(1.5)
            },
            purchaseLimit() {
                if (hasUpgrade("darkTemple", 16)) return new Decimal(Infinity)
                return new Decimal(10)
            },
            currency() { return player.bh.darkEssence },
            pay(amt) { player.bh.darkEssence = this.currency().sub(amt) },
            effect(x) { return (x || getBuyableAmount(this.layer, this.id)).div(2).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && player.darkTemple.totalLevel.gte(2) },
            display() {
                return player.darkTemple.totalLevel.lt(2) ? "<h3>You need " + formatWhole(Decimal.sub(2, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Increase character defense<br>Currently: +" + formatSimple(this.effect().sub(1)) + "<br>Next: +" + formatSimple(this.effect(getBuyableAmount(this.layer, this.id).add(1)).sub(1)) + "<br><br>Cost: " + formatSimple(this.cost()) + " Dark Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "140px", height: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) look.backgroundColor = "#0d1d07"
                else if (player.darkTemple.totalLevel.lt(2)) look.backgroundColor = "#000"
                else if (!this.canAfford()) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look

                return look
            },
        },
        1003: {
            costBase() {
                if (getBuyableAmount(this.layer, this.id).gte(10) && hasUpgrade("darkTemple", 16)) return new Decimal(0.005).div(player.darkTemple.bestowalCostDiv)
                return new Decimal(10).div(player.darkTemple.bestowalCostDiv)
            },
            costGrowth() {
                if (getBuyableAmount(this.layer, this.id).gte(10) && hasUpgrade("darkTemple", 16)) return new Decimal(5)
                return new Decimal(2)
            },
            purchaseLimit() {
                if (hasUpgrade("darkTemple", 16)) return new Decimal(Infinity)
                return new Decimal(10)
            },
            currency() { return player.bh.darkEssence },
            pay(amt) { player.bh.darkEssence = this.currency().sub(amt) },
            effect(x) { return (x || getBuyableAmount(this.layer, this.id)).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && player.darkTemple.totalLevel.gte(8) },
            display() {
                return player.darkTemple.totalLevel.lt(8) ? "<h3>You need " + formatWhole(Decimal.sub(8, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Increase skill points<br>Currently: +" + formatSimple(this.effect().sub(1)) + "<br>Next: +" + formatSimple(this.effect(getBuyableAmount(this.layer, this.id).add(1)).sub(1)) + "<br><br>Cost: " + formatSimple(this.cost()) + " Dark Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "140px", height: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) look.backgroundColor = "#0d1d07"
                else if (player.darkTemple.totalLevel.lt(8)) look.backgroundColor = "#000"
                else if (!this.canAfford()) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look

                return look
            },
        },
        1005: {
            costBase() {
                if (getBuyableAmount(this.layer, this.id).gte(10) && hasUpgrade("darkTemple", 16)) return new Decimal(0.001).div(player.darkTemple.bestowalCostDiv)
                return new Decimal(50).div(player.darkTemple.bestowalCostDiv)
            },
            costGrowth() {
                if (getBuyableAmount(this.layer, this.id).gte(10) && hasUpgrade("darkTemple", 16)) return new Decimal(10)
                return new Decimal(3)
            },
            purchaseLimit() {
                if (hasUpgrade("darkTemple", 16)) return new Decimal(Infinity)
                return new Decimal(10)
            },
            currency() { return player.bh.darkEssence },
            pay(amt) { player.bh.darkEssence = this.currency().sub(amt) },
            effect(x) { return (x || getBuyableAmount(this.layer, this.id)).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && player.darkTemple.totalLevel.gte(12) },
            display() {
                return player.darkTemple.totalLevel.lt(12) ? "<h3>You need " + formatWhole(Decimal.sub(12, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Increase dark essence<br>Currently: x" + formatSimple(this.effect()) + "<br>Next: x" + formatSimple(this.effect(getBuyableAmount(this.layer, this.id).add(1))) + "<br><br>Cost: " + formatSimple(this.cost()) + " Dark Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "140px", height: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) look.backgroundColor = "#0d1d07"
                else if (player.darkTemple.totalLevel.lt(12)) look.backgroundColor = "#000"
                else if (!this.canAfford()) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look

                return look
            },
        },
        1007: {
            costBase() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(0.1).div(player.darkTemple.bestowalCostDiv)
                return new Decimal(125).div(player.darkTemple.bestowalCostDiv)
            },
            costGrowth() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(25)
                return new Decimal(5)
            },
            purchaseLimit() {
                if (hasUpgrade("darkTemple", 16)) return new Decimal(Infinity)
                return new Decimal(5)
            },
            currency() { return player.bh.darkEssence },
            pay(amt) { player.bh.darkEssence = this.currency().sub(amt) },
            effect(x) { return (x || getBuyableAmount(this.layer, this.id)).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && player.darkTemple.totalLevel.gte(18) },
            display() {
                return player.darkTemple.totalLevel.lt(18) ? "<h3>You need " + formatWhole(Decimal.sub(18, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Reduce skill level cap cost<br>Currently: /" + formatSimple(this.effect()) + "<br>Next: /" + formatSimple(this.effect(getBuyableAmount(this.layer, this.id).add(1))) + "<br><br>Cost: " + formatSimple(this.cost()) + " Dark Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "140px", height: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) look.backgroundColor = "#0d1d07"
                else if (player.darkTemple.totalLevel.lt(18)) look.backgroundColor = "#000"
                else if (!this.canAfford()) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look

                return look
            },
        },
        1009: {
            costBase() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(0.01).div(player.darkTemple.bestowalCostDiv)
                return new Decimal(250).div(player.darkTemple.bestowalCostDiv)
            },
            costGrowth() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(100)
                return new Decimal(10)
            },
            purchaseLimit() {
                if (hasUpgrade("darkTemple", 16)) return new Decimal(Infinity)
                return new Decimal(5)
            },
            currency() { return player.bh.darkEssence },
            pay(amt) { player.bh.darkEssence = this.currency().sub(amt) },
            effect(x) { return (x || getBuyableAmount(this.layer, this.id)).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && player.darkTemple.totalLevel.gte(22) },
            display() {
                return player.darkTemple.totalLevel.lt(22) ? "<h3>You need " + formatWhole(Decimal.sub(22, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "<small>Increase chance to double celestialite rewards</small><br>Currently: +" + formatSimple(this.effect().sub(1).mul(100)) + "%<br>Next: +" + formatSimple(this.effect(getBuyableAmount(this.layer, this.id).add(1).mul(100)).sub(1)) + "%<br><br>Cost: " + formatSimple(this.cost()) + " Dark Essence"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "140px", height: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) look.backgroundColor = "#0d1d07"
                else if (player.darkTemple.totalLevel.lt(22)) look.backgroundColor = "#000"
                else if (!this.canAfford()) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look

                return look
            },
        },
        1011: {
            costBase() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(0.003).div(player.darkTemple.bestowalCostDiv)
                return new Decimal(5).div(player.darkTemple.bestowalCostDiv)
            },
            costGrowth() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(25)
                return new Decimal(5)
            },
            purchaseLimit() {
                if (hasUpgrade("darkTemple", 16)) return new Decimal(Infinity)
                return new Decimal(5)
            },
            currency() { return player.bh.darkEther },
            pay(amt) { player.bh.darkEther = this.currency().sub(amt) },
            effect(x) { return (x || getBuyableAmount(this.layer, this.id)).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && player.darkTemple.totalLevel.gte(28) },
            display() {
                return player.darkTemple.totalLevel.lt(28) ? "<h3>You need " + formatWhole(Decimal.sub(28, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Increase base character stats<br>Currently: +" + formatSimple(this.effect().sub(1).mul(100)) + "%<br>Next: +" + formatSimple(this.effect(getBuyableAmount(this.layer, this.id).add(1)).sub(1).mul(100)) + "%<br><br>Cost: " + formatSimple(this.cost()) + " Dark Ether"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "140px", height: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) look.backgroundColor = "#0d1d07"
                else if (player.darkTemple.totalLevel.lt(28)) look.backgroundColor = "#000"
                else if (!this.canAfford()) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look

                return look
            },
        },
        1013: {
            costBase() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(0.4).div(player.darkTemple.bestowalCostDiv)
                return new Decimal(20).div(player.darkTemple.bestowalCostDiv)
            },
            costGrowth() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(5)
                return new Decimal(2)
            },
            purchaseLimit() {
                if (hasUpgrade("darkTemple", 16)) return new Decimal(Infinity)
                return new Decimal(5)
            },
            currency() { return player.bh.darkEther },
            pay(amt) { player.bh.darkEther = this.currency().sub(amt) },
            effect(x) { return (x || getBuyableAmount(this.layer, this.id)).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && player.darkTemple.totalLevel.gte(32) },
            display() {
                return player.darkTemple.totalLevel.lt(32) ? "<h3>You need " + formatWhole(Decimal.sub(32, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Reduce rune level cost<br>Currently: /" + formatSimple(this.effect()) + "<br>Next: /" + formatSimple(this.effect(getBuyableAmount(this.layer, this.id).add(1))) + "<br><br>Cost: " + formatSimple(this.cost()) + " Dark Ether"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "140px", height: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) look.backgroundColor = "#0d1d07"
                else if (player.darkTemple.totalLevel.lt(32)) look.backgroundColor = "#000"
                else if (!this.canAfford()) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look

                return look
            },
        },
        1015: {
            costBase() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(0.3).div(player.darkTemple.bestowalCostDiv)
                return new Decimal(75).div(player.darkTemple.bestowalCostDiv)
            },
            costGrowth() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(10)
                return new Decimal(3)
            },
            purchaseLimit() {
                if (hasUpgrade("darkTemple", 16)) return new Decimal(Infinity)
                return new Decimal(5)
            },
            currency() { return player.bh.darkEther },
            pay(amt) { player.bh.darkEther = this.currency().sub(amt) },
            effect(x) { return (x || getBuyableAmount(this.layer, this.id)).div(5).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && player.darkTemple.totalLevel.gte(38) },
            display() {
                return player.darkTemple.totalLevel.lt(38) ? "<h3>You need " + formatWhole(Decimal.sub(38, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "<small>Increase RGN during celestialite respawn</small><br>Currently: +" + formatSimple(this.effect().sub(1)) + "<br>Next: +" + formatSimple(this.effect(getBuyableAmount(this.layer, this.id).add(1)).sub(1)) + "<br><br>Cost: " + formatSimple(this.cost()) + " Dark Ether"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "140px", height: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) look.backgroundColor = "#0d1d07"
                else if (player.darkTemple.totalLevel.lt(38)) look.backgroundColor = "#000"
                else if (!this.canAfford()) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look

                return look
            },
        },
        1017: {
            costBase() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(0.003).div(player.darkTemple.bestowalCostDiv)
                return new Decimal(250).div(player.darkTemple.bestowalCostDiv)
            },
            costGrowth() {
                if (getBuyableAmount(this.layer, this.id).gte(5) && hasUpgrade("darkTemple", 16)) return new Decimal(10)
                return new Decimal(3)
            },
            purchaseLimit() {
                if (hasUpgrade("darkTemple", 16)) return new Decimal(Infinity)
                return new Decimal(10)
            },
            currency() { return player.bh.darkEther },
            pay(amt) { player.bh.darkEther = this.currency().sub(amt) },
            effect(x) { return (x || getBuyableAmount(this.layer, this.id)).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) && player.darkTemple.totalLevel.gte(45) },
            display() {
                return player.darkTemple.totalLevel.lt(45) ? "<h3>You need " + formatWhole(Decimal.sub(45, player.darkTemple.totalLevel)) + " more eff. rune levels"
                : "Increase dark ether gain<br>Currently: x" + formatSimple(this.effect()) + "<br>Next: x" + formatSimple(this.effect(getBuyableAmount(this.layer, this.id).add(1))) + "<br><br>Cost: " + formatSimple(this.cost()) + " Dark Ether"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "140px", height: "100px", lineHeight: "1", fontSize: "12px", borderRadius: "15px", color: "#f283c9", border: "2px solid #C71585", margin: "2px"}
                if (getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit())) look.backgroundColor = "#0d1d07"
                else if (player.darkTemple.totalLevel.lt(45)) look.backgroundColor = "#000"
                else if (!this.canAfford()) look.backgroundColor = "#2b1818"
                else look.backgroundColor = "#13020d"
                return look

                return look
            },
        },
        1: {
            purchaseLimit() { return player.darkTemple.runeCap },
            pay() {
                player.depth1.gloomingUmbrite = player.depth1.gloomingUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(9).div(player.darkTemple.runeCostDiv).floor())
                player.depth1.dimUmbrite = player.depth1.dimUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(3).div(player.darkTemple.runeCostDiv).floor())
                player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(Decimal.pow(4, getBuyableAmount(this.layer, this.id)).mul(10000).div(player.darkTemple.runeCostDiv))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.tab == "level" && player.darkTemple.selection == 1},
            canAfford() {
                return player.depth1.gloomingUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(9).div(player.darkTemple.runeCostDiv))
                && player.depth1.dimUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(3).div(player.darkTemple.runeCostDiv))
                && player.sma.starmetalAlloy.gte(Decimal.pow(4, getBuyableAmount(this.layer, this.id)).mul(10000).div(player.darkTemple.runeCostDiv))
            },
            display() {return "<div style='line-height:0.8'>Level Up<br><span style='font-size:10px'>[" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(player.darkTemple.runeCap) + "]</div>"},
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "200px", height: "35px", color: "var(--textColor)", fontSize: "16px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0 0 27px 27px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "var(--miscButton)"
                return look
            },
        },
        2: {
            purchaseLimit() { return player.darkTemple.runeCap },
            pay() {
                player.depth2.faintUmbrite = player.depth2.faintUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(12).div(player.darkTemple.runeCostDiv).floor())
                player.depth2.clearUmbrite = player.depth2.clearUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(4).div(player.darkTemple.runeCostDiv).floor())
                player.s.singularityPoints = player.s.singularityPoints.sub(Decimal.pow(1e10, getBuyableAmount(this.layer, this.id)).mul(1e100).div(player.darkTemple.runeCostDiv))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.tab == "level" && player.darkTemple.selection == 2},
            canAfford() {
                return player.depth2.faintUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(12).div(player.darkTemple.runeCostDiv).floor())
                && player.depth2.clearUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(4).div(player.darkTemple.runeCostDiv).floor())
                && player.s.singularityPoints.gte(Decimal.pow(1e10, getBuyableAmount(this.layer, this.id)).mul(1e100).div(player.darkTemple.runeCostDiv))
            },
            display() {return "<div style='line-height:0.8'>Level Up<br><span style='font-size:10px'>[" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(player.darkTemple.runeCap) + "]</div>"},
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "200px", height: "35px", color: "var(--textColor)", fontSize: "16px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0 0 27px 27px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "var(--miscButton)"
                return look
            },
        },
        3: {
            purchaseLimit() { return player.darkTemple.runeCap },
            pay() {
                player.depth3.vividUmbrite = player.depth3.vividUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(15).div(player.darkTemple.runeCostDiv).floor())
                player.depth3.lustrousUmbrite = player.depth3.lustrousUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(5).div(player.darkTemple.runeCostDiv).floor())
                player.au2.stars = player.au2.stars.sub(Decimal.pow(10, getBuyableAmount(this.layer, this.id)).mul(10).div(player.darkTemple.runeCostDiv))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.tab == "level" && player.darkTemple.selection == 3},
            canAfford() {
                return player.depth3.vividUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(15).div(player.darkTemple.runeCostDiv).floor())
                && player.depth3.lustrousUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(5).div(player.darkTemple.runeCostDiv).floor())
                && player.au2.stars.gte(Decimal.pow(10, getBuyableAmount(this.layer, this.id)).mul(10).div(player.darkTemple.runeCostDiv))
            },
            display() {return "<div style='line-height:0.8'>Level Up<br><span style='font-size:10px'>[" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(player.darkTemple.runeCap) + "]</div>"},
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "200px", height: "35px", color: "var(--textColor)", fontSize: "16px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0 0 27px 27px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "var(--miscButton)"
                return look
            },
        },
        4: {
            purchaseLimit() { return player.darkTemple.runeCap },
            pay() {
                player.stagnantSynestia.temporalDust = player.stagnantSynestia.temporalDust.sub(Decimal.pow(2.5, getBuyableAmount(this.layer, this.id)).mul(12).div(player.darkTemple.runeCostDiv).floor())
                player.stagnantSynestia.temporalShard = player.stagnantSynestia.temporalShard.sub(Decimal.pow(2, getBuyableAmount(this.layer, this.id)).mul(2).div(player.darkTemple.runeCostDiv).floor())
                player.sme.starmetalEssence = player.sme.starmetalEssence.sub(Decimal.pow(5, getBuyableAmount(this.layer, this.id)).mul(100).div(player.darkTemple.runeCostDiv))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.tab == "level" && player.darkTemple.selection == 4},
            canAfford() {
                return player.stagnantSynestia.temporalDust.gte(Decimal.pow(2.5, getBuyableAmount(this.layer, this.id)).mul(12).div(player.darkTemple.runeCostDiv).floor())
                && player.stagnantSynestia.temporalShard.gte(Decimal.pow(2, getBuyableAmount(this.layer, this.id)).mul(2).div(player.darkTemple.runeCostDiv).floor())
                && player.sme.starmetalEssence.gte(Decimal.pow(5, getBuyableAmount(this.layer, this.id)).mul(100).div(player.darkTemple.runeCostDiv))
            },
            display() {return "<div style='line-height:0.8'>Level Up<br><span style='font-size:10px'>[" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(player.darkTemple.runeCap) + "]</div>"},
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "200px", height: "35px", color: "var(--textColor)", fontSize: "16px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0 0 27px 27px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "var(--miscButton)"
                return look
            },
        },
        5: {
            purchaseLimit() { return player.darkTemple.runeCap },
            pay() {
                player.depth4.gloomingNocturnium = player.depth4.gloomingNocturnium.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(30).div(player.darkTemple.runeCostDiv).floor())
                player.depth4.dimNocturnium = player.depth4.dimNocturnium.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(10).div(player.darkTemple.runeCostDiv).floor())
                player.pol.pollinators = player.pol.pollinators.sub(Decimal.pow("1e200", getBuyableAmount(this.layer, this.id)).mul("1e2000").div(player.darkTemple.runeCostDiv))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.tab == "level" && player.darkTemple.selection == 5},
            canAfford() {
                return player.depth4.gloomingNocturnium.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(30).div(player.darkTemple.runeCostDiv).floor())
                && player.depth4.dimNocturnium.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(10).div(player.darkTemple.runeCostDiv).floor())
                && player.pol.pollinators.gte(Decimal.pow("1e200", getBuyableAmount(this.layer, this.id)).div(player.darkTemple.runeCostDiv).mul("1e2000"))
            },
            display() {return "<div style='line-height:0.8'>Level Up<br><span style='font-size:10px'>[" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(player.darkTemple.runeCap) + "]</div>"},
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "200px", height: "35px", color: "var(--textColor)", fontSize: "16px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0 0 27px 27px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "var(--miscButton)"
                return look
            },
        },

        101: {
            purchaseLimit() { return player.darkTemple.tierCap },
            pay() {
                player.depth1.murkyUmbrite = player.depth1.murkyUmbrite.sub(Decimal.pow(10, getBuyableAmount(this.layer, this.id)).mul(25).floor())
                player.bh.darkEther = player.bh.darkEther.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(10).floor())
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.tab == "tier" && player.darkTemple.selection == 1},
            canAfford() {
                return player.depth1.murkyUmbrite.gte(Decimal.pow(10, getBuyableAmount(this.layer, this.id)).mul(25).floor())
                && player.bh.darkEther.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(10).floor())
                && getBuyableAmount("darkTemple", 1).gte(getBuyableAmount(this.layer, this.id).add(5))
            },
            display() {return "<div style='line-height:0.8'>Tier Up<br><span style='font-size:10px'>[" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(player.darkTemple.tierCap) + "]</div>"},
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "200px", height: "35px", color: "var(--textColor)", fontSize: "16px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0 0 27px 27px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "var(--miscButton)"
                return look
            },
        },
        102: {
            purchaseLimit() { return player.darkTemple.tierCap },
            pay() {
                player.depth2.hazyUmbrite = player.depth2.hazyUmbrite.sub(Decimal.pow(10, getBuyableAmount(this.layer, this.id)).mul(50).floor())
                player.bh.darkEther = player.bh.darkEther.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(30).floor())
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.tab == "tier" && player.darkTemple.selection == 2},
            canAfford() {
                return player.depth2.hazyUmbrite.gte(Decimal.pow(10, getBuyableAmount(this.layer, this.id)).mul(50).floor())
                && player.bh.darkEther.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(30).floor())
                && getBuyableAmount("darkTemple", 2).gte(getBuyableAmount(this.layer, this.id).add(5))
            },
            display() {return "<div style='line-height:0.8'>Tier Up<br><span style='font-size:10px'>[" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(player.darkTemple.tierCap) + "]</div>"},
            buy() {
                this.pay()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {width: "200px", height: "35px", color: "var(--textColor)", fontSize: "16px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0 0 27px 27px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#1a3b0f" : !this.canAfford() ? look.background =  "#361e1e" : look.background = "var(--miscButton)"
                return look
            },
        },
    },
    microtabs: {
        stuff: {
            "runes": {
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["row", [
                                ["style-row", [["clickable", 12]], {marginTop: "18px", marginRight: "30px"}],
                                ["style-row", [["clickable", 1]], {marginBottom: "18px"}],
                                ["style-row", [["clickable", 2]], {marginTop: "18px", marginLeft: "30px"}],
                            ]],
                            ["row", [
                                ["style-column", [
                                    ["style-row", [["clickable", 11]], {marginTop: "12px", marginLeft: "18px"}],
                                    ["style-row", [["clickable", 10]], {marginRight: "18px", marginTop: "30px", marginBottom: "30px"}],
                                    ["style-row", [["clickable", 9]], {marginBottom: "12px", marginLeft: "18px"}],
                                ]],
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", () => {
                                            switch (player.darkTemple.selection) {
                                                case 1:
                                                    return "ᚠ"
                                                case 2:
                                                    return "ᚢ"
                                                case 3:
                                                    return "ᚦ"
                                                case 4:
                                                    return "ᚱ"
                                                case 5:
                                                    return "ᚴ"
                                                default:
                                                    return ""
                                            }
                                        }, {color: "var(--textColor)", fontSize: "24px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "35px", borderBottom: "3px solid var(--regBorder)"}],
                                    ["style-column", [
                                        ["raw-html", () => {
                                            let cost1 = "<br><br>"
                                            let cost2 = "<br><br>"
                                            let cost3 = "<br><br>"
                                            if (player.darkTemple.tab == "level") {
                                                switch (player.darkTemple.selection) {
                                                    case 1:
                                                        cost1 = formatSimple(player.depth1.gloomingUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 1)).mul(9).div(player.darkTemple.runeCostDiv).floor()) + "<br>Glooming Umbrite"
                                                        cost2 = formatSimple(player.depth1.dimUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 1)).mul(3).div(player.darkTemple.runeCostDiv).floor()) + "<br>Dim Umbrite"
                                                        cost3 = formatSimple(player.sma.starmetalAlloy) + "/" + formatSimple(Decimal.pow(4, getBuyableAmount("darkTemple", 1)).mul(10000).div(player.darkTemple.runeCostDiv)) + "<br>Starmetal Alloy"
                                                        break;
                                                    case 2:
                                                        cost1 = formatSimple(player.depth2.faintUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 2)).mul(12).div(player.darkTemple.runeCostDiv).floor()) + "<br>Faint Umbrite"
                                                        cost2 = formatSimple(player.depth2.clearUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 2)).mul(4).div(player.darkTemple.runeCostDiv).floor()) + "<br>Clear Umbrite"
                                                        cost3 = formatSimple(player.s.singularityPoints) + "/" + formatSimple(Decimal.pow(1e10, getBuyableAmount("darkTemple", 2)).mul(1e100).div(player.darkTemple.runeCostDiv)) + "<br>Singularity Points"
                                                        break;
                                                    case 3:
                                                        cost1 = formatSimple(player.depth3.vividUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 3)).mul(15).div(player.darkTemple.runeCostDiv).floor()) + "<br>Vivid Umbrite"
                                                        cost2 = formatSimple(player.depth3.lustrousUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 3)).mul(5).div(player.darkTemple.runeCostDiv).floor()) + "<br>Lustrous Umbrite"
                                                        cost3 = formatSimple(player.au2.stars) + "/" + formatSimple(Decimal.pow(10, getBuyableAmount("darkTemple", 3)).mul(10).div(player.darkTemple.runeCostDiv)) + "<br>Stars"
                                                        break;
                                                    case 4:
                                                        cost1 = formatSimple(player.stagnantSynestia.temporalDust) + "/" + formatSimple(Decimal.pow(2.5, getBuyableAmount("darkTemple", 4)).mul(12).div(player.darkTemple.runeCostDiv).floor()) + "<br>Temporal Dust"
                                                        cost2 = formatSimple(player.stagnantSynestia.temporalShard) + "/" + formatSimple(Decimal.pow(2, getBuyableAmount("darkTemple", 4)).mul(2).div(player.darkTemple.runeCostDiv).floor()) + "<br>Temporal Shards"
                                                        cost3 = formatSimple(player.sme.starmetalEssence) + "/" + formatSimple(Decimal.pow(5, getBuyableAmount("darkTemple", 4)).mul(100).div(player.darkTemple.runeCostDiv)) + "<br>Starmetal Essence"
                                                        break;
                                                    case 5:
                                                        cost1 = formatSimple(player.depth4.gloomingNocturnium) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 5)).mul(30).div(player.darkTemple.runeCostDiv).floor()) + "<br>Glooming Nocturnium"
                                                        cost2 = formatSimple(player.depth4.dimNocturnium) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 5)).mul(10).div(player.darkTemple.runeCostDiv).floor()) + "<br>Dim Nocturnium"
                                                        cost3 = formatSimple(player.pol.pollinators) + "/" + formatSimple(Decimal.pow("1e200", getBuyableAmount("darkTemple", 5)).mul("1e2000").div(player.darkTemple.runeCostDiv)) + "<br>Pollinators"
                                                        break;
                                                }
                                            } else if (player.darkTemple.tab == "tier") {
                                                switch (player.darkTemple.selection) {
                                                    case 1:
                                                        cost1 = formatSimple(player.depth1.murkyUmbrite) + "/" + formatSimple(Decimal.pow(10, getBuyableAmount("darkTemple", 101)).mul(25).floor()) + "<br>Murky Umbrite"
                                                        cost2 = formatSimple(player.bh.darkEther) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 101)).mul(10).floor()) + "<br>Dark Ether"
                                                        cost3 = formatSimple(getBuyableAmount("darkTemple", 1)) + "/" + formatSimple(getBuyableAmount("darkTemple", 101).add(5)) + "<br>ᚠ Rune Levels"
                                                        break;
                                                    case 2:
                                                        cost1 = formatSimple(player.depth2.hazyUmbrite) + "/" + formatSimple(Decimal.pow(10, getBuyableAmount("darkTemple", 102)).mul(50).floor()) + "<br>Hazy Umbrite"
                                                        cost2 = formatSimple(player.bh.darkEther) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 102)).mul(30).floor()) + "<br>Dark Ether"
                                                        cost3 = formatSimple(getBuyableAmount("darkTemple", 2)) + "/" + formatSimple(getBuyableAmount("darkTemple", 102).add(5)) + "<br>ᚢ Rune Levels"
                                                        break;
                                                    case 3:
                                                        break;
                                                    case 4:
                                                        break;
                                                    case 5:
                                                        break;
                                                }
                                            } else if (player.darkTemple.tab == "byproduct") {
                                                switch (player.darkTemple.selection) {
                                                    case 1:
                                                        let eff1 = getBuyableAmount("darkTemple", 1).mul(getBuyableAmount("darkTemple", 101).div(2).add(1))
                                                        return "<div style='line-height:1.2'><h3>Eff. Rune Level: " + formatSimple(eff1) + "</h3><br><small><i>[Rune by-products work offline]</i></small><br><br>\n\
                                                        +" + formatSimple(new Decimal(3).mul(eff1).mul(player.darkTemple.byproductMult)) + "/h Glooming Umbrite<br>\n\
                                                        +" + formatSimple(new Decimal(1).mul(eff1).mul(player.darkTemple.byproductMult)) + "/h Dim Umbrite<br>\n\
                                                        +" + formatSimple(new Decimal(0.3).mul(eff1).mul(player.darkTemple.byproductMult)) + "/h Dark Essence</div>"
                                                    case 2:
                                                        let eff2 = getBuyableAmount("darkTemple", 2).mul(getBuyableAmount("darkTemple", 102).div(2).add(1))
                                                        return "<div style='line-height:1.2'><h3>Eff. Rune Level: " + formatSimple(eff2) + "</h3><br><small><i>[Rune by-products work offline]</i></small><br><br>\n\
                                                        +" + formatSimple(new Decimal(4).mul(eff2).mul(player.darkTemple.byproductMult)) + "/h Faint Umbrite<br>\n\
                                                        +" + formatSimple(new Decimal(1.5).mul(eff2).mul(player.darkTemple.byproductMult)) + "/h Clear Umbrite<br>\n\
                                                        +" + formatSimple(new Decimal(0.6).mul(eff2).mul(player.darkTemple.byproductMult)) + "/h Dark Essence</div>"
                                                    case 3:
                                                        let eff3 = getBuyableAmount("darkTemple", 3)
                                                        return "<div style='line-height:1.2'><h3>Eff. Rune Level: " + formatSimple(eff3) + "</h3><br><small><i>[Rune by-products work offline]</i></small><br><br>\n\
                                                        +" + formatSimple(new Decimal(5).mul(eff3).mul(player.darkTemple.byproductMult)) + "/h Vivid Umbrite<br>\n\
                                                        +" + formatSimple(new Decimal(2).mul(eff3).mul(player.darkTemple.byproductMult)) + "/h Lustrous Umbrite<br>\n\
                                                        +" + formatSimple(new Decimal(1).mul(eff3).mul(player.darkTemple.byproductMult)) + "/h Dark Essence</div>"
                                                    case 4:
                                                        let eff4 = getBuyableAmount("darkTemple", 4)
                                                        return "<div style='line-height:1.2'><h3>Eff. Rune Level: " + formatSimple(eff4) + "</h3><br><small><i>[Rune by-products work offline]</i></small><br><br>\n\
                                                        +" + formatSimple(new Decimal(4).mul(eff4).mul(player.darkTemple.byproductMult)) + "/h Temporal Dust<br>\n\
                                                        +" + formatSimple(new Decimal(0.5).mul(eff4).mul(player.darkTemple.byproductMult)) + "/h Temporal Shards</div>"
                                                    case 5:
                                                        let eff5 = getBuyableAmount("darkTemple", 5)
                                                        return "<div style='line-height:1.2'><h3>Eff. Rune Level: " + formatSimple(eff5) + "</h3><br><small><i>[Rune by-products work offline]</i></small><br><br>\n\
                                                        +" + formatSimple(new Decimal(10).mul(eff5).mul(player.darkTemple.byproductMult)) + "/h Glooming Nocturnium<br>\n\
                                                        +" + formatSimple(new Decimal(3).mul(eff5).mul(player.darkTemple.byproductMult)) + "/h Dim Nocturnium<br>\n\
                                                        +" + formatSimple(new Decimal(1.5).mul(eff5).mul(player.darkTemple.byproductMult)) + "/h Dark Essence</div>"
                                                }
                                            }
                                            return "<div style='line-height:1.2'>" + cost1 + "<hr style='width:200px;height:3px;margin:2px 0;background:var(--regBorder);border:0'>" + cost2 + "<hr style='width:200px;height:3px;margin:2px 0;background:var(--regBorder);border:0'>" + cost3 + "<div>"
                                        }, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "104px", background: "var(--layerBackground)"}],
                                    ["style-column", [
                                        ["buyable", 1], ["buyable", 2], ["buyable", 3], ["buyable", 4], ["buyable", 5],
                                        ["buyable", 101], ["buyable", 102],
                                        ["clickable", "byproductToggle"],
                                    ], {width: "200px", height: "35px", background: "black", borderTop: "3px solid var(--regBorder)", borderRadius: "0 0 27px 27px"}],
                                ], {width: "200px", height: "180px", background: "var(--miscButton)", border: "3px solid var(--regBorder)", borderRadius: "30px", margin: "28px 18px 28px 18px", boxShadow: "0px 0px 10px #113"}],
                                ["style-column", [
                                    ["style-row", [["clickable", 3]], {marginTop: "12px", marginRight: "18px"}],
                                    ["style-row", [["clickable", 4]], {marginLeft: "18px", marginTop: "30px", marginBottom: "30px"}],
                                    ["style-row", [["clickable", 5]], {marginBottom: "12px", marginRight: "18px"}],
                                ]],
                            ]],
                            ["row", [
                                ["style-row", [["clickable", 8]], {marginBottom: "18px", marginRight: "30px"}],
                                ["style-row", [["clickable", 7]], {marginTop: "18px"}],
                                ["style-row", [["clickable", 6]], {marginBottom: "18px", marginLeft: "30px"}],
                            ]],
                        ], {width: "420px", height: "420px", background: "radial-gradient(#00000055, #22226655)"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Effects", {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                            ], {width: "202px", height: "40px", borderBottom: "3px solid var(--regBorder)"}],
                            ["theme-scroll-column", [
                                ["blank", "5px"],
                                ["raw-html", () => {
                                    let futureEffects = {}
                                    if (player.darkTemple.tab == "level" && getBuyableAmount("darkTemple", player.darkTemple.selection).lt(player.darkTemple.runeCap)) {
                                        futureEffects = RUNE_EFFECTS[player.darkTemple.selection][getBuyableAmount("darkTemple", player.darkTemple.selection).add(1)]
                                        let tierMult = getBuyableAmount("darkTemple", player.darkTemple.selection+100) ? 1+(getBuyableAmount("darkTemple", player.darkTemple.selection+100).toNumber()/2) : 1
                                        futureEffects = addObject({}, futureEffects, tierMult)
                                    } else if (player.darkTemple.tab == "tier" && (getBuyableAmount("darkTemple", player.darkTemple.selection+100) || player.darkTemple.tierCap).lt(player.darkTemple.tierCap)) {
                                        for (let i = 1; i < getBuyableAmount("darkTemple", player.darkTemple.selection); i++) {
                                            futureEffects = addObject(futureEffects, RUNE_EFFECTS[player.darkTemple.selection][i], 0.5)
                                        }
                                    }
                                    let str = ""
                                    if (player.darkTemple.spAdd.gt(0) || futureEffects.sp) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.spAdd) + " SP"
                                        if (futureEffects.sp && futureEffects >= 1) str = str + " <small style='color:#88f'>(+" + formatShortSimple(Math.floor(futureEffects.sp)) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.skillCost.gt(1) || futureEffects.scd) {
                                        str = str + "/" + formatShortSimple(player.darkTemple.skillCost) + " <small>Skill Lv. Cost</small>"
                                        if (futureEffects.scd) str = str + " <small style='color:#88f'>(/" + formatShortSimple(Decimal.pow(2, futureEffects.scd)) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.hpAdd.gt(0) || futureEffects.hp) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.hpAdd) + " HP"
                                        if (futureEffects.hp) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.hp) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.hpMult.gt(0) || futureEffects.hpMult) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.hpMult.mul(100)) + "% <small>Base HP Mult</small>"
                                        if (futureEffects.hpMult) str = str + " <small style='color:#88f'>(+" + formatShortSimple(Decimal.mul(futureEffects.hpMult, 100)) + "%)</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.dmgAdd.gt(0) || futureEffects.dmg) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.dmgAdd) + " DMG"
                                        if (futureEffects.dmg) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.dmg) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.dmgMult.gt(0) || futureEffects.dmgMult) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.dmgMult.mul(100)) + "% <small>Base DMG Mult</small>"
                                        if (futureEffects.dmgMult) str = str + " <small style='color:#88f'>(+" + formatShortSimple(Decimal.mul(futureEffects.dmgMult, 100)) + "%)</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.agiAdd.gt(0) || futureEffects.agi) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.agiAdd) + " AGI"
                                        if (futureEffects.agi) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.agi) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.agiMult.gt(0) || futureEffects.agiMult) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.agiMult.mul(100)) + "% <small>Base AGI Mult</small>"
                                        if (futureEffects.agiMult) str = str + " <small style='color:#88f'>(+" + formatShortSimple(Decimal.mul(futureEffects.agiMult, 100)) + "%)</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.defAdd.gt(0) || futureEffects.def) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.defAdd) + " DEF"
                                        if (futureEffects.def) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.def) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.rgnAdd.gt(0) || futureEffects.rgn) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.rgnAdd, 2) + " RGN"
                                        if (futureEffects.rgn) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.rgn, 2) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.luckAdd.gt(0) || futureEffects.luck) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.luckAdd) + " LUCK"
                                        if (futureEffects.luck) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.luck) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.mndAdd.gt(0) || futureEffects.mnd) {
                                        str = str + "+" + formatShortSimple(player.darkTemple.mndAdd) + " MND"
                                        if (futureEffects.mnd) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.mnd) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.depth1CurMult.gt(1) || futureEffects.d1c) {
                                        str = str + "x" + formatShortSimple(player.darkTemple.depth1CurMult) + " <small>Depth 1 SPVs</small>"
                                        if (futureEffects.d1c) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.d1c) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.depth2CurMult.gt(1) || futureEffects.d2c) {
                                        str = str + "x" + formatShortSimple(player.darkTemple.depth2CurMult) + " <small>Depth 2 SPVs</small>"
                                        if (futureEffects.d2c) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.d2c) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.depth3CurMult.gt(1) || futureEffects.d3c) {
                                        str = str + "x" + formatShortSimple(player.darkTemple.depth3CurMult) + " <small>Depth 3 SPVs</small>"
                                        if (futureEffects.d3c) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.d3c) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.depth4CurMult.gt(1) || futureEffects.d4c) {
                                        str = str + "x" + formatShortSimple(player.darkTemple.depth4CurMult) + " <small>Depth 4 SPVs</small>"
                                        if (futureEffects.d4c) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.d4c) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    if (player.darkTemple.stagnantCurMult.gt(1) || futureEffects.ssc) {
                                        str = str + "x" + formatShortSimple(player.darkTemple.stagnantCurMult) + " <div style='display:inline-block;font-size:10px'>Stagnant<br>Synestia SPVs</div>"
                                        if (futureEffects.ssc) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.ssc) + ")</small>"
                                        str = str + "<br>"
                                    }
                                    return str
                                }, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
                            ], {width: "202px", height: "377px", background: "var(--layerBackground)"}],
                        ], {width: "200px", height: "420px", background: "var(--miscButton)", borderLeft: "3px solid var(--regBorder)", borderRadius: "0 0 27px 0"}],
                    ], {width: "624px", height: "420px", margin: "-3px", border: "3px solid var(--regBorder)"}],
                ],
            },
            "bestowal": {
                content: [
                    ["always-scroll-column", [
                        ["blank", "10px"],
                        ["row", [
                            ["style-row", [
                                ["raw-html", () => {return "Eff. Rune Levels: " + formatWhole(player.darkTemple.totalLevel)}, {color: "#C71585", fontSize: "14px", fontFamily: "monospace"}]
                            ], {width: "185px", height: "30px", background: "black", border: "3px solid #C71585", borderRadius: "15px"}],
                            ["style-row", [
                                ["raw-html", () => {return formatWhole(player.bh.darkEssence) + " Dark Essence"}, {color: "#C71585", fontSize: "14px", fontFamily: "monospace"}]
                            ], {width: "185px", height: "30px", background: "black", border: "3px solid #C71585", borderRadius: "15px", marginLeft: "10px"}],
                            ["style-row", [
                                ["raw-html", () => {return formatWhole(player.bh.darkEther) + " Dark Ether"}, {color: "#C71585", fontSize: "14px", fontFamily: "monospace"}]
                            ], {width: "185px", height: "30px", background: "black", border: "3px solid #C71585", borderRadius: "15px", marginLeft: "10px"}],
                        ]],
                        ["blank", "10px"],
                        ["row", [
                            ["buyable", 1001], ["upgrade", 2], ["buyable", 1003], ["upgrade", 4],
                            ["buyable", 1005], ["upgrade", 6], ["buyable", 1007], ["upgrade", 8],
                            ["buyable", 1009], ["upgrade", 10], ["buyable", 1011], ["upgrade", 12],
                            ["buyable", 1013], ["upgrade", 14], ["buyable", 1015], ["upgrade", 16],
                            ["buyable", 1017], ["upgrade", 18], ["buyable", 1019], ["upgrade", 20],
                        ]],
                        ["blank", "10px"],
                    ], {width: "624px", height: "420px", background: "radial-gradient(#00000055, #630a4255)", margin: "-3px", border: "3px solid var(--regBorder)"}],
                ],
            },
        },
    },
    tabFormat: [
        ["style-row", [
            ["top-column", [
                ["style-column", [
                    ["raw-html", "█████████ Temple", {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "172px", height: "40px", background: "var(--miscButton)", borderBottom: "3px solid var(--regBorder)"}],
                ["clickable", "level"],
                ["clickable", "tier"],
                ["clickable", "byproduct"],
                ["clickable", "bestowal"],
            ], {width: "172px", height: "420px", background: "var(--layerBackground)", borderRight: "3px solid var(--regBorder)", borderRadius: "0 0 0 27px"}],
            ["buttonless-microtabs", "stuff", {borderWidth: "0"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

function addObject(obj1, obj2, mult = 1) {
    let combined = { ...obj1 }

    for (const key in obj2) {
        if (combined.hasOwnProperty(key)) {
            combined[key] += (obj2[key] * mult);
        } else {
            combined[key] = (obj2[key] * mult);
        }
    }

    return combined;
}

BHS.darkTemple = {
    nameCap: "Dark Temple",
    nameLow: "Dark Temple",
    music: "music/confrontation.mp3",
    comboLimit: 666,
    comboScaling: 6,
    comboScalingStart: 66,
    generateCelestialite(combo) {
        return "nac"
    },
}

BHC.nac = {
    name: "██████",
    symbol: "█",
    style: {
        background: "radial-gradient(#116, black)",
        color: "black",
        borderColor: "#226",
    },
    health: new Decimal(666666666),
    damage: new Decimal(666666),
    attributes: {
        "air": new Decimal(1), // Resistance DMG Mult
        "warded": new Decimal(1), // Resistance DMG Mult
        "stealthy": new Decimal(1), // Resistance DMG Mult
        "anima": new Decimal(1), // Resistance DMG Mult
    },
    actions: {
        0: {
            name: "█████",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(6),
            cooldown: new Decimal(6),
        },
        1: {
            name: "█████",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(12),
            cooldown: new Decimal(12),
        },
        2: {
            name: "█████",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(18),
            cooldown: new Decimal(18),
        },
        3: {
            name: "█████",
            instant: true,
            type: "damage",
            target: "allPlayer",
            method: "physical",
            value: new Decimal(24),
            cooldown: new Decimal(24),
        },
    },
    reward() {
        let gain = {}
        return gain
    },
}