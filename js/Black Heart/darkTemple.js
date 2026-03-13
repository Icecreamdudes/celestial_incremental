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
            sp: 1,
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
            sp: 1,
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
            sp: 1,
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
            sp: 1,
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

        selection: 1,
        runeCap: new Decimal(5),

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

        let stats = {}
        for (let j = 1; j < 6; j++) {
            for (let i = 1; i < getBuyableAmount("darkTemple", j).add(1); i++) {
                stats = addObject(stats, RUNE_EFFECTS[j][i])
            }
        }
        if (stats.sp) player.darkTemple.spAdd = new Decimal(stats.sp)
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
        if (stats.d1c) player.darkTemple.depth1CurMult = Decimal.add(1, stats.d1c)
        if (stats.d2c) player.darkTemple.depth2CurMult = Decimal.add(1, stats.d2c)
        if (stats.d3c) player.darkTemple.depth3CurMult = Decimal.add(1, stats.d3c)
        if (stats.ssc) player.darkTemple.stagnantCurMult = Decimal.add(1, stats.ssc)
        if (stats.d4c) player.darkTemple.depth4CurMult = Decimal.add(1, stats.d4c)
    },
    clickables: {
        1: {
            title: "ᚠ",
            canClick() {return player.depth1.unlocked},
            unlocked: true,
            branches: [[3, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 1
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.selection == 1) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                if (getBuyableAmount("darkTemple", 1).gte(player.darkTemple.runeCap)) look.background = "#226"
                return look
            },
        },
        2: {
            title: "ᚢ",
            canClick() {return player.depth2.unlocked},
            unlocked: true,
            branches: [[4, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 2
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.selection == 2) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                if (getBuyableAmount("darkTemple", 2).gte(player.darkTemple.runeCap)) look.background = "#226"
                return look
            },
        },
        3: {
            title: "ᚦ",
            canClick() {return player.depth3.unlocked},
            unlocked: true,
            branches: [[5, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 3
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.selection == 3) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                if (getBuyableAmount("darkTemple", 3).gte(player.darkTemple.runeCap)) look.background = "#226"
                return look
            },
        },
        4: {
            title: "ᚱ",
            canClick() {return player.stagnantSynestia.unlocked},
            unlocked: true,
            branches: [[6, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 4
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.selection == 4) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                return look
            },
        },
        5: {
            title: "ᚴ",
            canClick() {return player.depth4.unlocked},
            unlocked: true,
            branches: [[7, "#88f", 5]],
            onClick() {
                player.darkTemple.selection = 5
            },
            style() {
                let look = {width: "50px", minHeight: "50px", color: "#88f", fontSize: "16px", background: "#113", border: "3px solid #339", borderRadius: "15px"}
                if (player.darkTemple.selection == 5) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
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
                if (player.darkTemple.selection == 6) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
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
                if (player.darkTemple.selection == 7) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
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
                if (player.darkTemple.selection == 8) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
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
                if (player.darkTemple.selection == 9) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
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
                if (player.darkTemple.selection == 10) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
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
                if (player.darkTemple.selection == 11) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
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
                if (player.darkTemple.selection == 12) look.borderColor = "#ccf"
                if (!this.canClick()) {look.filter = "brightness(50%)"; look.boxShadow = "0px 0px 10px #113"} else {look.boxShadow = "0px 0px 15px #339"}
                return look
            },
        },
    },
    buyables: {
        1: {
            purchaseLimit() { return player.darkTemple.runeCap },
            pay() {
                player.depth1.gloomingUmbrite = player.depth1.gloomingUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(9).floor())
                player.depth1.dimUmbrite = player.depth1.dimUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(3).floor())
                player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(Decimal.pow(4, getBuyableAmount(this.layer, this.id)).mul(10000))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.selection == 1},
            canAfford() {
                return player.depth1.gloomingUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(9))
                && player.depth1.dimUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(3))
                && player.sma.starmetalAlloy.gte(Decimal.pow(4, getBuyableAmount(this.layer, this.id)).mul(10000))
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
                player.depth2.faintUmbrite = player.depth2.faintUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(12).floor())
                player.depth2.clearUmbrite = player.depth2.clearUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(4).floor())
                player.s.singularityPoints = player.s.singularityPoints.sub(Decimal.pow(1e10, getBuyableAmount(this.layer, this.id)).mul(1e100))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.selection == 2},
            canAfford() {
                return player.depth2.faintUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(12).floor())
                && player.depth2.clearUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(4).floor())
                && player.s.singularityPoints.gte(Decimal.pow(1e10, getBuyableAmount(this.layer, this.id)).mul(1e100))
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
                player.depth3.vividUmbrite = player.depth3.vividUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(15).floor())
                player.depth3.lustrousUmbrite = player.depth3.lustrousUmbrite.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(5).floor())
                player.au2.stars = player.au2.stars.sub(Decimal.pow(10, getBuyableAmount(this.layer, this.id)).mul(10))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.selection == 3},
            canAfford() {
                return player.depth3.vividUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(15).floor())
                && player.depth3.lustrousUmbrite.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(5).floor())
                && player.au2.stars.gte(Decimal.pow(10, getBuyableAmount(this.layer, this.id)).mul(10))
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
                player.stagnantSynestia.temporalDust = player.stagnantSynestia.temporalDust.sub(Decimal.pow(2.5, getBuyableAmount(this.layer, this.id)).mul(12).floor())
                player.stagnantSynestia.temporalShard = player.stagnantSynestia.temporalShard.sub(Decimal.pow(2, getBuyableAmount(this.layer, this.id)).mul(2).floor())
                player.sme.starmetalEssence = player.sme.starmetalEssence.sub(Decimal.pow(5, getBuyableAmount(this.layer, this.id)).mul(100))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.selection == 4},
            canAfford() {
                return player.stagnantSynestia.temporalDust.gte(Decimal.pow(2.5, getBuyableAmount(this.layer, this.id)).mul(12).floor())
                && player.stagnantSynestia.temporalShard.gte(Decimal.pow(2, getBuyableAmount(this.layer, this.id)).mul(2).floor())
                && player.sme.starmetalEssence.gte(Decimal.pow(5, getBuyableAmount(this.layer, this.id)).mul(100))
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
                player.depth4.gloomingNocturnium = player.depth4.gloomingNocturnium.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(30).floor())
                player.depth4.dimNocturnium = player.depth4.dimNocturnium.sub(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(10).floor())
                player.pol.pollinators = player.pol.pollinators.sub(Decimal.pow("1e200", getBuyableAmount(this.layer, this.id)).mul("1e2000"))
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked() {return player.darkTemple.selection == 5},
            canAfford() {
                return player.depth4.gloomingNocturnium.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(30).floor())
                && player.depth4.dimNocturnium.gte(Decimal.pow(3, getBuyableAmount(this.layer, this.id)).mul(10).floor())
                && player.pol.pollinators.gte(Decimal.pow("1e200", getBuyableAmount(this.layer, this.id)).mul("1e2000"))
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
    },
    tabFormat: [
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
                                switch (player.darkTemple.selection) {
                                    case 1:
                                        cost1 = formatSimple(player.depth1.gloomingUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 1)).mul(9).floor()) + "<br>Glooming Umbrite"
                                        cost2 = formatSimple(player.depth1.dimUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 1)).mul(3).floor()) + "<br>Dim Umbrite"
                                        cost3 = formatSimple(player.sma.starmetalAlloy) + "/" + formatSimple(Decimal.pow(4, getBuyableAmount("darkTemple", 1)).mul(10000)) + "<br>Starmetal Alloy"
                                        break;
                                    case 2:
                                        cost1 = formatSimple(player.depth2.faintUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 2)).mul(12).floor()) + "<br>Faint Umbrite"
                                        cost2 = formatSimple(player.depth2.clearUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 2)).mul(4).floor()) + "<br>Clear Umbrite"
                                        cost3 = formatSimple(player.s.singularityPoints) + "/" + formatSimple(Decimal.pow(1e10, getBuyableAmount("darkTemple", 2)).mul(1e100)) + "<br>Singularity Points"
                                        break;
                                    case 3:
                                        cost1 = formatSimple(player.depth3.vividUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 3)).mul(15).floor()) + "<br>Vivid Umbrite"
                                        cost2 = formatSimple(player.depth3.lustrousUmbrite) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 3)).mul(5).floor()) + "<br>Lustrous Umbrite"
                                        cost3 = formatSimple(player.au2.stars) + "/" + formatSimple(Decimal.pow(10, getBuyableAmount("darkTemple", 3)).mul(10)) + "<br>Stars"
                                        break;
                                    case 4:
                                        cost1 = formatSimple(player.stagnantSynestia.temporalDust) + "/" + formatSimple(Decimal.pow(2.5, getBuyableAmount("darkTemple", 4)).mul(12).floor()) + "<br>Temporal Dust"
                                        cost2 = formatSimple(player.stagnantSynestia.temporalShard) + "/" + formatSimple(Decimal.pow(2, getBuyableAmount("darkTemple", 4)).mul(2).floor()) + "<br>Temporal Shards"
                                        cost3 = formatSimple(player.sme.starmetalEssence) + "/" + formatSimple(Decimal.pow(5, getBuyableAmount("darkTemple", 4)).mul(100)) + "<br>Starmetal Essence"
                                        break;
                                    case 5:
                                        cost1 = formatSimple(player.depth4.gloomingNocturnium) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 5)).mul(30).floor()) + "<br>Glooming Nocturnium"
                                        cost2 = formatSimple(player.depth4.dimNocturnium) + "/" + formatSimple(Decimal.pow(3, getBuyableAmount("darkTemple", 5)).mul(10).floor()) + "<br>Dim Nocturnium"
                                        cost3 = formatSimple(player.pol.pollinators) + "/" + formatSimple(Decimal.pow("1e200", getBuyableAmount("darkTemple", 5)).mul("1e2000")) + "<br>Pollinators"
                                        break;
                                }
                                return "<div style='line-height:1.2'>" + cost1 + "<hr style='width:200px;height:3px;margin:2px 0;background:var(--regBorder);border:0'>" + cost2 + "<hr style='width:200px;height:3px;margin:2px 0;background:var(--regBorder);border:0'>" + cost3 + "<div>"
                            }, {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                        ], {width: "200px", height: "104px", background: "var(--layerBackground)"}],
                        ["style-column", [
                            ["buyable", 1], ["buyable", 2], ["buyable", 3], ["buyable", 4], ["buyable", 5]
                        ], {width: "200px", height: "35px", background: "black", borderTop: "3px solid var(--regBorder)", borderRadius: "0 0 27px 27px"}],
                    ], {width: "200px", height: "180px", background: "var(--miscButtonDisable)", border: "3px solid var(--regBorder)", borderRadius: "30px", margin: "28px 18px 28px 18px", boxShadow: "0px 0px 10px #113"}],
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
            ], {width: "600px", height: "420px", background: "radial-gradient(#00000055, #22226655)", borderRight: "3px solid var(--regBorder)", borderRadius: "0 0 0 27px"}],
            ["style-column", [
                ["style-column", [
                    ["raw-html", "Effects", {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                ], {width: "197px", height: "40px", borderBottom: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["blank", "5px"],
                    ["raw-html", () => {
                        let futureEffects = RUNE_EFFECTS[player.darkTemple.selection][getBuyableAmount("darkTemple", player.darkTemple.selection).add(1)]
                        if (getBuyableAmount("darkTemple", player.darkTemple.selection).gte(player.darkTemple.runeCap)) futureEffects = {}
                        let str = ""
                        if (player.darkTemple.spAdd.gt(0) || futureEffects.sp) {
                            str = str + "+" + formatShortSimple(player.darkTemple.spAdd) + " SP"
                            if (futureEffects.sp) str = str + " <small style='color:#88f'>(+" + formatShortSimple(futureEffects.sp) + ")</small>"
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
                    }, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "197px", height: "377px", background: "var(--miscButtonDisable)", borderRadius: "0 0 27px 0"}],
            ], {width: "197px", height: "420px", background: "var(--miscButtonHover)", borderRadius: "0 0 27px 0"}],
        ], {width: "800px", height: "420px"}],
    ],
    layerShown() {return player.startedGame && tmp.pu.levelables[302].canClick},
})

function addObject(obj1, obj2) {
    let combined = { ...obj1 }

    for (const key in obj2) {
        if (combined.hasOwnProperty(key)) {
            combined[key] += obj2[key];
        } else {
            combined[key] = obj2[key];
        }
    }

    return combined;
}
