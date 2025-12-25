const GOLDEN_COOKIE = {
    image: "resources/checkback/gold_cookie.png",
    time() {
        let time = 13
        if (hasUpgrade("ep2", 9001)) time = time * 1.5
        if (hasUpgrade("ep2", 9003)) time = time * 1.5
        if (hasUpgrade("ep2", 9005)) time = time * 1.5
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 3,
    class: "goldenCookie",
    onClick() {
        let rng = Math.random()
        if (player.ep2.shardPity < 19) {
            if (rng < 0.5) {
                let gain = Decimal.min(player.ep2.cookies.mul(0.15), player.ep2.cookiesPerSecond.mul(900)).add(13)
                player.ep2.cookies = player.ep2.cookies.add(gain)
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Lucky!<br><small>+" + formatWhole(gain) + " Cookies!</small>"})
                player.ep2.shardPity = player.ep2.shardPity + 1
            } else if (rng < 0.55) {
                if (!hasUpgrade("ep2", 9007)) {
                    makeShinies(GOLDEN_COOKIE, 2)
                    makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Double!<br><small>Your golden cookie has doubled!</small>"})
                } else {
                    makeShinies(GOLDEN_COOKIE, 3)
                    makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Triple!<br><small>Your golden cookie has tripled!</small>"})
                }
                player.ep2.shardPity = player.ep2.shardPity + 1
            } else if (rng < 0.75) {
                let gain = 3
                if (hasUpgrade("ep2", 9002)) gain = gain + 2
                player.cb.evolutionShards = player.cb.evolutionShards.add(gain)
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Excellent!<br><small>Found " + gain + " evolution shards!</small>"})
                player.ep2.shardPity = player.ep2.shardPity + 1
            } else if (rng < 0.95) {
                let gain = 1
                if (hasUpgrade("ep2", 9004)) gain = gain + 1
                player.cb.paragonShards = player.cb.paragonShards.add(gain)
                if (gain != 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Perfect!<br><small>Found " + gain + " paragon shards!</small>"})
                if (gain == 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Perfect!<br><small>Found 1 paragon shard!</small>"})
                player.ep2.shardPity = player.ep2.shardPity + 1
            } else {
                let gain = 1
                if (hasUpgrade("ep2", 9006) && Math.random() < 0.5) gain = gain + 1
                if (hasUpgrade("ep2", 9106) && Math.random() < 0.5) gain = gain + 1
                player.ep2.chocoShards = player.ep2.chocoShards.add(gain)
                if (gain != 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Delectable!<br><small>Found " + gain + " chocolate shards!</small>"})
                if (gain == 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Delectable!<br><small>Found 1 chocolate shard!</small>"})
                player.ep2.shardPity = 0
            }
        } else {
            let gain = 1
            if (hasUpgrade("ep2", 9006) && Math.random() < 0.5) gain = gain + 1
            if (hasUpgrade("ep2", 9106) && Math.random() < 0.5) gain = gain + 1
            player.ep2.chocoShards = player.ep2.chocoShards.add(gain)
            if (gain != 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Delectable!<br><small>Found " + gain + " chocolate shards!</small>"})
            if (gain == 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Delectable!<br><small>Found 1 chocolate shard!</small>"})
            player.ep2.shardPity = 0
        }
        player.ep2.goldenClicks = player.ep2.goldenClicks.add(1)
        Vue.delete(particles, this.id)
    },
}

const WRATH_COOKIE = {
    image: "resources/checkback/wrath_cookie.png",
    time() {
        let time = 13
        if (hasUpgrade("ep2", 9001)) time = time * 1.5
        if (hasUpgrade("ep2", 9003)) time = time * 1.5
        if (hasUpgrade("ep2", 9005)) time = time * 1.5
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 3,
    class: "goldenCookie",
    onClick() {
        let rng = Math.random()
        if (player.ep2.shardPity < 19) {
            if (rng < 0.4) {
                let gain = Decimal.min(player.ep2.cookies.mul(0.25), player.ep2.cookiesPerSecond.mul(1500)).add(33)
                player.ep2.cookies = player.ep2.cookies.add(gain)
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Lucky!<br><small>+" + formatWhole(gain) + " Cookies!</small>"})
                player.ep2.shardPity = player.ep2.shardPity + 2
            } else if (rng < 0.5) {
                let gain = Decimal.min(player.ep2.cookies.mul(0.1), player.ep2.cookiesPerSecond.mul(600)).add(13)
                player.ep2.cookies = player.ep2.cookies.sub(gain)
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Ruin!<br><small>-" + formatWhole(gain) + " Cookies!</small>"})
                player.ep2.shardPity = player.ep2.shardPity + 2
            } else if (rng < 0.7) {
                let gain = 6
                if (hasUpgrade("ep2", 9002)) gain = gain + 4
                player.cb.evolutionShards = player.cb.evolutionShards.add(gain)
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Excellent!<br><small>Found " + gain + " evolution shards!</small>"})
                player.ep2.shardPity = player.ep2.shardPity + 2
            } else if (rng < 0.9) {
                let gain = 2
                if (hasUpgrade("ep2", 9004)) gain = gain + 2
                player.cb.paragonShards = player.cb.paragonShards.add(gain)
                makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Perfect!<br><small>Found " + gain + " paragon shards!</small>"})
                player.ep2.shardPity = player.ep2.shardPity + 2
            } else {
                let gain = 1
                if (hasUpgrade("ep2", 9006) && Math.random() < 0.5) gain = gain + 1
                if (hasUpgrade("ep2", 9106) && Math.random() < 0.5) gain = gain + 1
                player.ep2.chocoShards = player.ep2.chocoShards.add(gain)
                if (gain != 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Delectable!<br><small>Found " + gain + " chocolate shards!</small>"})
                if (gain == 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Delectable!<br><small>Found 1 chocolate shard!</small>"})
                player.ep2.shardPity = 0
            }
        } else {
            let gain = 1
            if (hasUpgrade("ep2", 9006) && Math.random() < 0.5) gain = gain + 1
            if (hasUpgrade("ep2", 9106) && Math.random() < 0.5) gain = gain + 1
            player.ep2.chocoShards = player.ep2.chocoShards.add(gain)
            if (gain != 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Delectable!<br><small>Found " + gain + " chocolate shards!</small>"})
            if (gain == 1) makeShinies(GOLDEN_EFFECT_TEXT, 1, {x: this.x - 250, y: this.y - 150, text: "Delectable!<br><small>Found 1 chocolate shard!</small>"})
            player.ep2.shardPity = 0
        }
        player.ep2.goldenClicks = player.ep2.goldenClicks.add(1)
        Vue.delete(particles, this.id)
    },
}

const GOLDEN_EFFECT_TEXT = {
    image: "",
    text: "Test<br><small>This is a test!</small>",
    time: 5,
    fadeOutTime: 1,
    class: "goldenEffectText",
}

const BIG_COOKIE_NUMBER = {
    image: "",
    text: "+1",
    speed: 4,
    time: 3,
    fadeOutTime: 3,
    class: "bigCookieNumbers",
}

addLayer("ep2", {
    name: "Cookie", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Co", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        cookies: new Decimal(0),
        cookiesPerClick: new Decimal(1),
        cookiesPerSecond: new Decimal(0),
        cpsbm: new Decimal(0), // cookies per second before multiplier

        totalBuildings: new Decimal(0),

        obtainedShards: false,
        chocoShards: new Decimal(0),
        shardPity: 0,

        externalGolden: false,
        goldenTimer: new Decimal(600),
        goldenTimerMax: new Decimal(600),
        averageGoldenCooldown: new Decimal(600),
        goldenClicks: new Decimal(0),
        goldClickTimer: new Decimal(0),

        barClicks: 0,
        barMax: new Decimal(100),
        currScale: new Decimal(1),
        scaleCooldown: new Decimal(3600),

        shopMult: 1,
        upgIndex: 0,

        autoClick: false,
        clickTime: 0,
    }},
    nodeStyle: {
        background: "radial-gradient(#C19F68, #86562E)",
        borderColor: "#422B21",
        color: "#422B21",
    },
    tooltip: "Cookie",
    color: "#cb79ed",
    update(delta) {
        let onepersec = new Decimal(1)
        
        player.ep2.cookiesPerSecond = new Decimal(0)
        for (let i = 1; i < 19; i++) {
            player.ep2.cookiesPerSecond = player.ep2.cookiesPerSecond.add(buyableEffect("ep2", i))
        }
        player.ep2.cpsbm = player.ep2.cookiesPerSecond // Cookies Per Second Before Multipliers
        for (let i = 101; i < 107; i++) {
            player.ep2.cookiesPerSecond = player.ep2.cookiesPerSecond.mul(buyableEffect("ep2", i))
        }
        player.ep2.cookiesPerSecond = player.ep2.cookiesPerSecond.mul(buyableEffect("ep0", 13))
        if (hasUpgrade("ep1", 13)) player.ep2.cookiesPerSecond = player.ep2.cookiesPerSecond.mul(upgradeEffect("ep1", 13))
        if (hasUpgrade("fi", 22)) player.ep2.cookiesPerSecond = player.ep2.cookiesPerSecond.mul(upgradeEffect("fi", 22))

        player.ep2.cookies = player.ep2.cookies.add(player.ep2.cookiesPerSecond.mul(delta))

        player.ep2.cookiesPerClick = new Decimal(1)
        if (hasUpgrade("ep2", 101)) player.ep2.cookiesPerClick = player.ep2.cookiesPerClick.mul(2)
        if (hasUpgrade("ep2", 102)) player.ep2.cookiesPerClick = player.ep2.cookiesPerClick.mul(2)
        if (hasUpgrade("ep2", 103)) player.ep2.cookiesPerClick = player.ep2.cookiesPerClick.mul(2)
        let val = player.ep2.totalBuildings.mul(0.1)
        if (hasUpgrade("ep2", 105)) val = val.mul(5)
        if (hasUpgrade("ep2", 106)) val = val.mul(10)
        if (hasUpgrade("ep2", 107)) val = val.mul(20)
        
        if (hasUpgrade("ep2", 104)) player.ep2.cookiesPerClick = player.ep2.cookiesPerClick.add(val)
        player.ep2.cookiesPerClick = player.ep2.cookiesPerClick.add(player.ep2.cookiesPerSecond.mul(levelableEffect("pet", 2001)[0]))

        player.ep2.averageGoldenCooldown = new Decimal(600)
        if (hasUpgrade("ep2", 9001)) player.ep2.averageGoldenCooldown = player.ep2.averageGoldenCooldown.div(1.5)
        if (hasUpgrade("ep2", 9003)) player.ep2.averageGoldenCooldown = player.ep2.averageGoldenCooldown.div(1.5)
        if (hasUpgrade("ep2", 9005)) player.ep2.averageGoldenCooldown = player.ep2.averageGoldenCooldown.div(1.5)

        if (player.tab == "ep2") {
            player.ep2.goldenTimer = player.ep2.goldenTimer.sub(delta)
        } else if (player.ep2.externalGolden) {
            player.ep2.goldenTimer = player.ep2.goldenTimer.sub(Decimal.div(delta, 3))
        }
        if (player.ep2.goldenTimer.lte(0)) {
            let time = Decimal.mul(player.ep2.averageGoldenCooldown.div(5), Math.random()).sub(player.ep2.averageGoldenCooldown.div(10))
            player.ep2.goldenTimer = player.ep2.averageGoldenCooldown.add(time)
            player.ep2.goldenTimerMax = player.ep2.averageGoldenCooldown.add(time)
            if (Math.random() < levelableEffect("pet", 2003)[0]) {
                makeShinies(WRATH_COOKIE, 1)
            } else {
                makeShinies(GOLDEN_COOKIE, 1)
            }
        }

        if (levelableEffect("pet", 2004)[0].gt(0)) {
            player.ep2.goldClickTimer = player.ep2.goldClickTimer.add(delta)
            if (player.ep2.goldClickTimer.gte(Decimal.div(1, levelableEffect("pet", 2004)[0]))) {
                player.ep2.goldenClicks = player.ep2.goldenClicks.add(1)
                player.ep2.goldClickTimer = new Decimal(0)
            }
        }

        let goldenBarDiv = new Decimal(1)
        goldenBarDiv = goldenBarDiv.mul(levelableEffect("pet", 2002)[0])
        if (hasUpgrade("ep2", 9102)) goldenBarDiv = goldenBarDiv.mul(1.5)

        let base = new Decimal(100)
        if (hasUpgrade("ep2", 9104)) base = base.mul(0.9)

        player.ep2.scaleCooldown = player.ep2.scaleCooldown.sub(delta)
        if (player.ep2.scaleCooldown.lte(0)) {
            if (Decimal.gte(player.ep2.barClicks, base.div(goldenBarDiv).max(base.mul(0.1)))) player.ep2.barClicks = Decimal.div(base, goldenBarDiv).max(base.mul(0.1)).sub(1).floor()
            player.ep2.currScale = new Decimal(1)
            player.ep2.scaleCooldown = new Decimal(3600)
        }
        player.ep2.barMax = base.mul(player.ep2.currScale.mul(Decimal.pow(1.1, player.ep2.currScale.sub(2)).max(1)).div(goldenBarDiv).max(0.1)).floor()

        if (Decimal.gte(player.ep2.barClicks, player.ep2.barMax)) {
            player.ep2.barClicks = 0
            player.ep2.currScale = player.ep2.currScale.add(1)
            if (Math.random() < levelableEffect("pet", 2003)[0]) {
                makeShinies(WRATH_COOKIE, 1)
            } else {
                makeShinies(GOLDEN_COOKIE, 1)
            }
        }

        if (!player.ep2.obtainedShards && player.ep2.chocoShards.gte(1)) player.ep2.obtainedShards = true
        if (typeof player.ep2.barClicks != "number") player.ep2.barClicks = 0

        // Autoclicker
        if (player.ep2.autoClick) {
            player.ep2.clickTime += 1
            if (player.ep2.clickTime > 2) {
                layers.ep2.cookieClick()
                player.ep2.clickTime = 0
            }
        }

        if (player.tab != "ep2") {
            player.ep2.autoClick = false
        }
    },
    clickables: {
        1: {
            title() {
                if (player.ep2.externalGolden) return "<img src='resources/checkback/gold_simple.png' width='40px' height='40px' style='margin-bottom:-5px'></img>"
                return "<img src='resources/checkback/gold_simple.png' width='40px' height='40px' style='margin-bottom:-5px;opacity:0.3'></img>"
            },
            canClick: true,
            unlocked: true,
            tooltip: "Toggle external golden cookie spawns.<br>(Timer speed is x3 slower outside of cookie layer)",
            onClick() {
                if (player.ep2.externalGolden) {
                    player.ep2.externalGolden = false
                } else {
                    player.ep2.externalGolden = true
                }
            },
            style: {width: "50px", minHeight: "50px", background: "transparent", border: "none", borderRadius: "50%", padding: "0", boxShadow: "0 0 !important"}
        },
        2: {
            title: "<img src='resources/checkback/choco_shard_transparent.png' width='32px' height='32px' style='margin-bottom:-5px'></img>",
            canClick: true,
            unlocked() {return player.ep2.obtainedShards},
            tooltip() {return "<div style='line-height:1.1;font-size:12px'>Chocolate Shards<hr><small>Obtained from golden cookies<br>Pity: " + player.ep2.shardPity + "/20</small></div>" },
            style: {width: "32px", minHeight: "32px", background: "transparent", border: "none", borderRadius: "15px", padding: "0", marginLeft: "3px", marginRight: "3px", boxShadow: "0 0 !important"}
        },
    },
    bars: {
        clickBar: {
            unlocked() {return getLevelableAmount("pet", 2002).gte(1)},
            direction: RIGHT,
            width: 350,
            height: 10,
            progress() {
                return Decimal.div(player.ep2.barClicks, player.ep2.barMax)
            },
            borderStyle: {border: "0", borderRadius: "0"},
            baseStyle: {background: "linear-gradient(#222, #181818)"},
            fillStyle: {background: "linear-gradient(#D6B556, #C39338)"},
        },
        goldenBar: {
            unlocked: true,
            direction: RIGHT,
            width: 350,
            height() {return getLevelableAmount("pet", 2002).gte(1) ? 10 : 20},
            progress() {
                return player.ep2.goldenTimerMax.sub(player.ep2.goldenTimer).div(player.ep2.goldenTimerMax)
            },
            borderStyle: {border: "0", borderRadius: "0"},
            baseStyle: {background: "linear-gradient(#181818, #111)"},
            fillStyle: {background: "linear-gradient(#A97621, #8C580F)"},
        },
    },
    upgrades: {
        1: {
            img: "resources/currencies/celestial_points.png",
            unlocked() {return getBuyableAmount("ep2", 1).gte(15)},
            title: "<span style='color:#3A812Bcc'>Parallel Points</span>",
            description() {return "Point buildings multiply celestial points.<br>Currently: x" + formatWhole(upgradeEffect(this.layer, this.id), 0)},
            cost: new Decimal(10000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return Decimal.pow(1.1, getBuyableAmount("ep2", 1))},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        2: {
            img: "resources/currencies/rank.png",
            unlocked() {return getBuyableAmount("ep2", 2).gte(15)},
            title: "<span style='color:#3A812Bcc'>Ranked Time</span>",
            description() {return "Rank buildings multiply time cube gain.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(50000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 2).pow(0.3)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        3: {
            img: "resources/currencies/factor_power.png",
            unlocked() {return getBuyableAmount("ep2", 3).gte(15)},
            title: "<span style='color:#3A812Bcc'>Fellow Factors</span>",
            description() {return "Factor buildings add to factor base.<br>Currently: +" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(500000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 3).pow(0.5).mul(0.025)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        4: {
            img: "resources/currencies/prestige_points.png",
            unlocked() {return getBuyableAmount("ep2", 4).gte(15)},
            title: "<span style='color:#3A812Bcc'>Processed Prestige</span>",
            description() {return "Prestige buildings multiply crystal gain.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(7.5e6),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 4).pow(0.4)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        5: {
            img: "resources/currencies/leaves.png",
            unlocked() {return getBuyableAmount("ep2", 5).gte(15)},
            title: "<span style='color:#3A812Bcc'>Leftover Leaves</span>",
            description() {return "Leaf buildings raise tree buyable effects.<br>Currently: ^" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(1e8),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 5).pow(0.5).mul(0.05).add(1)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        6: {
            img: "resources/currencies/trees.png",
            unlocked() {return getBuyableAmount("ep2", 6).gte(15)},
            title: "<span style='color:#3A812Bcc'>Cloned Conifers</span>",
            description() {return "Tree buildings multiply repli-trees.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(1.25e9),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 6).pow(0.3)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        7: {
            img: "resources/currencies/grass.png",
            unlocked() {return getBuyableAmount("ep2", 7).gte(15)},
            title: "<span style='color:#3A812Bcc'>Mirrored Moonstone</span>",
            description() {return "Grass buildings multiply moonstone.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(1.5e10),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 7).pow(0.3).mul(0.1).add(1)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        8: {
            img: "resources/currencies/pent.png",
            unlocked() {return getBuyableAmount("ep2", 8).gte(15)},
            title: "<span style='color:#3A812Bcc'>Pent Down?</span>",
            description() {return "Pent buildings divide pent requirement.<br>Currently: /" + formatWhole(upgradeEffect(this.layer, this.id), 0)},
            cost: new Decimal(2e11),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return Decimal.pow(1.4, getBuyableAmount("ep2", 8))},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        9: {
            img: "resources/currencies/grasshoppers.png",
            unlocked() {return getBuyableAmount("ep2", 9).gte(15)},
            title: "<span style='color:#3A812Bcc'>Unrelated Upgrade</span>",
            description() {return "Grasshopper buildings multiply steel.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(3e12),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 9).pow(0.35)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        10: {
            img: "resources/currencies/fertilizer.png",
            unlocked() {return getBuyableAmount("ep2", 10).gte(15)},
            title: "<span style='color:#3A812Bcc'>Unfortunate Connection</span>",
            description() {return "Fertilizer buildings multiply dragon points.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(4e13),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 10).mul(0.01).add(1)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        11: {
            img: "resources/currencies/code_experience.png",
            unlocked() {return getBuyableAmount("ep2", 11).gte(15)},
            title: "<span style='color:#3A812Bcc'>Unknown Connection</span>",
            description() {return "Code buildings multiply dotknight points.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(5e14),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 11).mul(0.01).add(1)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        12: {
            img: "resources/currencies/mods.png",
            unlocked() {return getBuyableAmount("ep2", 12).gte(15)},
            title: "<span style='color:#3A812Bcc'>Same Stuff</span>",
            description() {return "Mod buildings multiply mods.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 1)},
            cost: new Decimal(1e16),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 12).mul(0.1).add(1)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        13: {
            img: "resources/currencies/dice.png",
            unlocked() {return getBuyableAmount("ep2", 13).gte(15)},
            title: "<span style='color:#3A812Bcc'>Same Stuff</span>",
            description() {return "Dice buildings multiply dice score.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(2e17),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 13).pow(0.7).mul(0.05).add(1)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        14: {
            img: "resources/currencies/infinity.png",
            unlocked() {return getBuyableAmount("ep2", 14).gte(15)},
            title: "<span style='color:#3A812Bcc'>Unseen Limits</span>",
            description() {return "Infinity buildings multiply infinities.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(3e18),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 14).mul(0.02).add(1)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        15: {
            img: "resources/currencies/antimatter.png",
            unlocked() {return getBuyableAmount("ep2", 15).gte(15)},
            title: "<span style='color:#3A812Bcc'>Galactic Expansion</span>",
            description() {return "Antimatter buildings increase AD galaxy cap.<br>Currently: +" + formatWhole(upgradeEffect(this.layer, this.id))},
            cost: new Decimal(4e19),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 15)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        16: {
            img: "resources/currencies/infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 16).gte(15)},
            title: "<span style='color:#3A812Bcc'>Water Purifier</span>",
            description() {return "IP buildings boost water pollinator.<br>Currently: ^" + formatSimple(upgradeEffect(this.layer, this.id), 3)},
            cost: new Decimal(5e20),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 16).add(1).log(2).div(25).add(1)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        17: {
            img: "resources/currencies/negative_infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 17).gte(15)},
            title: "<span style='color:#3A812Bcc'>Negatives Attract</span>",
            description() {return "NIP buildings boost curses.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 3)},
            cost: new Decimal(5e22),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 17).add(1).pow(1.2)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },
        18: {
            img: "resources/currencies/dimensional_power.png",
            unlocked() {return getBuyableAmount("ep2", 18).gte(15)},
            title: "<span style='color:#3A812Bcc'>Dimensional Fuel</span>",
            description() {return "Dimension Power buildings reduce star exploration time.<br>Currently: /" + formatSimple(upgradeEffect(this.layer, this.id), 3)},
            cost: new Decimal(5e24),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return getBuyableAmount("ep2", 18).pow(0.5).div(10).add(1)},
            style: {background: "radial-gradient(closest-side, #E9D67388, #9AB83488, #3A812B88, #112D3F88 110%)"},
        },

        101: {
            img: "resources/currencies/celestial_points.png",
            unlocked() {return getBuyableAmount("ep2", 1).gte(1)},
            title: "Crumbly Points",
            description: "Points and cookie clicks are twice as efficient.",
            cost: new Decimal(100),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        102: {
            img: "resources/currencies/celestial_points.png",
            unlocked() {return getBuyableAmount("ep2", 1).gte(1)},
            title: "<span style='color:#FF89E7cc'>Doughy Points</span>",
            description: "Points and cookie clicks are twice as efficient.",
            cost: new Decimal(500),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        103: {
            img: "resources/currencies/celestial_points.png",
            unlocked() {return getBuyableAmount("ep2", 1).gte(5)},
            title: "<span style='color:#00DEFFcc'>Sweetened Points</span>",
            description: "Points and cookie clicks are twice as efficient.",
            cost: new Decimal(10000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        104: {
            img: "resources/currencies/celestial_points.png",
            unlocked() {return getBuyableAmount("ep2", 1).gte(25)},
            title: "<span style='color:#FFCC2Fcc'>Flavored Points</span>",
            description: "Points and cookie clicks gain +0.1 cookies per building.",
            cost: new Decimal(100000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FFCC2F88, #FF790088)"},
        },
        105: {
            img: "resources/currencies/celestial_points.png",
            unlocked() {return getBuyableAmount("ep2", 1).gte(50)},
            title: "<span style='color:#E9D673cc'>Chocolatey Points</span>",
            description: "Multiplies gain from Flavored Points by x5.",
            cost: new Decimal(1e7),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        106: {
            img: "resources/currencies/celestial_points.png",
            unlocked() {return getBuyableAmount("ep2", 1).gte(100)},
            title: "<span style='color:#A8BF91cc'>Sugary Points</span>",
            description: "Multiplies gain from Flavored Points by x10.",
            cost: new Decimal(1e8),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        107: {
            img: "resources/currencies/celestial_points.png",
            unlocked() {return getBuyableAmount("ep2", 1).gte(150)},
            title: "<span style='color:#6E5755cc'>Buttery Points</span>",
            description: "Multiplies gain from Flavored Points by x20.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        201: {
            img: "resources/currencies/rank.png",
            unlocked() {return getBuyableAmount("ep2", 2).gte(1)},
            title: "Rank Up",
            description: "Ranks are twice as efficient.",
            cost: new Decimal(1000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        202: {
            img: "resources/currencies/rank.png",
            unlocked() {return getBuyableAmount("ep2", 2).gte(5)},
            title: "<span style='color:#FF89E7cc'>Better Sequencing</span>",
            description: "Ranks are twice as efficient.",
            cost: new Decimal(5000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        203: {
            img: "resources/currencies/rank.png",
            unlocked() {return getBuyableAmount("ep2", 2).gte(25)},
            title: "<span style='color:#00DEFFcc'>Tier Up</span>",
            description: "Ranks are twice as efficient.",
            cost: new Decimal(100000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        204: {
            img: "resources/currencies/rank.png",
            unlocked() {return getBuyableAmount("ep2", 2).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Classification</span>",
            description: "Ranks are twice as efficient.",
            cost: new Decimal(5e6),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        205: {
            img: "resources/currencies/rank.png",
            unlocked() {return getBuyableAmount("ep2", 2).gte(100)},
            title: "<span style='color:#E9D673cc'>Tetr Up</span>",
            description: "Ranks are twice as efficient.",
            cost: new Decimal(5e9),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        206: {
            img: "resources/currencies/rank.png",
            unlocked() {return getBuyableAmount("ep2", 2).gte(150)},
            title: "<span style='color:#A8BF91cc'>Grouping</span>",
            description: "Ranks are twice as efficient.",
            cost: new Decimal(5e12),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        207: {
            img: "resources/currencies/rank.png",
            unlocked() {return getBuyableAmount("ep2", 2).gte(200)},
            title: "<span style='color:#6E5755cc'>Clustered</span>",
            description: "Ranks are twice as efficient.",
            cost: new Decimal(5e15),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        301: {
            img: "resources/currencies/factor_power.png",
            unlocked() {return getBuyableAmount("ep2", 3).gte(1)},
            title: "Seperate Components",
            description: "Factors are twice as efficient.",
            cost: new Decimal(10000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        302: {
            img: "resources/currencies/factor_power.png",
            unlocked() {return getBuyableAmount("ep2", 3).gte(5)},
            title: "<span style='color:#FF89E7cc'>Potent Power</span>",
            description: "Factors are twice as efficient.",
            cost: new Decimal(50000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        303: {
            img: "resources/currencies/factor_power.png",
            unlocked() {return getBuyableAmount("ep2", 3).gte(25)},
            title: "<span style='color:#00DEFFcc'>Removed Dependencies</span>",
            description: "Factors are twice as efficient.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        304: {
            img: "resources/currencies/factor_power.png",
            unlocked() {return getBuyableAmount("ep2", 3).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Cleaner Energy</span>",
            description: "Factors are twice as efficient.",
            cost: new Decimal(5e7),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        305: {
            img: "resources/currencies/factor_power.png",
            unlocked() {return getBuyableAmount("ep2", 3).gte(100)},
            title: "<span style='color:#E9D673cc'>Updated Base</span>",
            description: "Factors are twice as efficient.",
            cost: new Decimal(5e10),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        306: {
            img: "resources/currencies/factor_power.png",
            unlocked() {return getBuyableAmount("ep2", 3).gte(150)},
            title: "<span style='color:#A8BF91cc'>Better Batteries</span>",
            description: "Factors are twice as efficient.",
            cost: new Decimal(5e13),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        307: {
            img: "resources/currencies/factor_power.png",
            unlocked() {return getBuyableAmount("ep2", 3).gte(200)},
            title: "<span style='color:#6E5755cc'>Better Conductors</span>",
            description: "Factors are twice as efficient.",
            cost: new Decimal(5e16),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        401: {
            img: "resources/currencies/prestige_points.png",
            unlocked() {return getBuyableAmount("ep2", 4).gte(1)},
            title: "Basic Buff",
            description: "Prestiges are twice as efficient.",
            cost: new Decimal(150000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        402: {
            img: "resources/currencies/prestige_points.png",
            unlocked() {return getBuyableAmount("ep2", 4).gte(5)},
            title: "<span style='color:#FF89E7cc'>Improved Formula</span>",
            description: "Prestiges are twice as efficient.",
            cost: new Decimal(750000),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        403: {
            img: "resources/currencies/prestige_points.png",
            unlocked() {return getBuyableAmount("ep2", 4).gte(25)},
            title: "<span style='color:#00DEFFcc'>Increased Base</span>",
            description: "Prestiges are twice as efficient.",
            cost: new Decimal(1.5e7),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        404: {
            img: "resources/currencies/prestige_points.png",
            unlocked() {return getBuyableAmount("ep2", 4).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Halved Requirement</span>",
            description: "Prestiges are twice as efficient.",
            cost: new Decimal(7.5e8),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        405: {
            img: "resources/currencies/prestige_points.png",
            unlocked() {return getBuyableAmount("ep2", 4).gte(100)},
            title: "<span style='color:#E9D673cc'>Automated Reset</span>",
            description: "Prestiges are twice as efficient.",
            cost: new Decimal(7.5e11),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        406: {
            img: "resources/currencies/prestige_points.png",
            unlocked() {return getBuyableAmount("ep2", 4).gte(150)},
            title: "<span style='color:#A8BF91cc'>Added Effect</span>",
            description: "Prestiges are twice as efficient.",
            cost: new Decimal(7.5e14),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        407: {
            img: "resources/currencies/prestige_points.png",
            unlocked() {return getBuyableAmount("ep2", 4).gte(200)},
            title: "<span style='color:#6E5755cc'>Buy-Max Features</span>",
            description: "Prestiges are twice as efficient.",
            cost: new Decimal(7.5e17),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        501: {
            img: "resources/currencies/leaves.png",
            unlocked() {return getBuyableAmount("ep2", 5).gte(1)},
            title: "Broader Blade",
            description: "Leaves are twice as efficient.",
            cost: new Decimal(2e6),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        502: {
            img: "resources/currencies/leaves.png",
            unlocked() {return getBuyableAmount("ep2", 5).gte(5)},
            title: "<span style='color:#FF89E7cc'>Stronger Petiole</span>",
            description: "Leaves are twice as efficient.",
            cost: new Decimal(1e7),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        503: {
            img: "resources/currencies/leaves.png",
            unlocked() {return getBuyableAmount("ep2", 5).gte(25)},
            title: "<span style='color:#00DEFFcc'>Sturdier Stems</span>",
            description: "Leaves are twice as efficient.",
            cost: new Decimal(2e8),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        504: {
            img: "resources/currencies/leaves.png",
            unlocked() {return getBuyableAmount("ep2", 5).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Thicker Veins</span>",
            description: "Leaves are twice as efficient.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        505: {
            img: "resources/currencies/leaves.png",
            unlocked() {return getBuyableAmount("ep2", 5).gte(100)},
            title: "<span style='color:#E9D673cc'>Toothed Margin</span>",
            description: "Leaves are twice as efficient.",
            cost: new Decimal(1e13),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        506: {
            img: "resources/currencies/leaves.png",
            unlocked() {return getBuyableAmount("ep2", 5).gte(150)},
            title: "<span style='color:#A8BF91cc'>Added Stipules</span>",
            description: "Leaves are twice as efficient.",
            cost: new Decimal(1e16),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        507: {
            img: "resources/currencies/leaves.png",
            unlocked() {return getBuyableAmount("ep2", 5).gte(200)},
            title: "<span style='color:#6E5755cc'>Auxiliary Buds</span>",
            description: "Leaves are twice as efficient.",
            cost: new Decimal(1e19),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        601: {
            img: "resources/currencies/trees.png",
            unlocked() {return getBuyableAmount("ep2", 6).gte(1)},
            title: "Thicker Trunk",
            description: "Trees are twice as efficient.",
            cost: new Decimal(2.5e7),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        602: {
            img: "resources/currencies/trees.png",
            unlocked() {return getBuyableAmount("ep2", 6).gte(5)},
            title: "<span style='color:#FF89E7cc'>Harder Bark</span>",
            description: "Trees are twice as efficient.",
            cost: new Decimal(1.25e8),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        603: {
            img: "resources/currencies/trees.png",
            unlocked() {return getBuyableAmount("ep2", 6).gte(25)},
            title: "<span style='color:#00DEFFcc'>More Branches</span>",
            description: "Trees are twice as efficient.",
            cost: new Decimal(2.5e9),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        604: {
            img: "resources/currencies/trees.png",
            unlocked() {return getBuyableAmount("ep2", 6).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Durable Roots</span>",
            description: "Trees are twice as efficient.",
            cost: new Decimal(1.25e11),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        605: {
            img: "resources/currencies/trees.png",
            unlocked() {return getBuyableAmount("ep2", 6).gte(100)},
            title: "<span style='color:#E9D673cc'>Bountiful Fruits</span>",
            description: "Trees are twice as efficient.",
            cost: new Decimal(1.25e14),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        606: {
            img: "resources/currencies/trees.png",
            unlocked() {return getBuyableAmount("ep2", 6).gte(150)},
            title: "<span style='color:#A8BF91cc'>Fragrant Flowers</span>",
            description: "Trees are twice as efficient.",
            cost: new Decimal(1.25e17),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        607: {
            img: "resources/currencies/trees.png",
            unlocked() {return getBuyableAmount("ep2", 6).gte(200)},
            title: "<span style='color:#6E5755cc'>Twin Twigs</span>",
            description: "Trees are twice as efficient.",
            cost: new Decimal(1.25e20),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        701: {
            img: "resources/currencies/grass.png",
            unlocked() {return getBuyableAmount("ep2", 7).gte(1)},
            title: "Numerous Nodes",
            description: "Grass are twice as efficient.",
            cost: new Decimal(3e8),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        702: {
            img: "resources/currencies/grass.png",
            unlocked() {return getBuyableAmount("ep2", 7).gte(5)},
            title: "<span style='color:#FF89E7cc'>Shorter Internodes</span>",
            description: "Grass are twice as efficient.",
            cost: new Decimal(1.5e9),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        703: {
            img: "resources/currencies/grass.png",
            unlocked() {return getBuyableAmount("ep2", 7).gte(25)},
            title: "<span style='color:#00DEFFcc'>Thicker Culms</span>",
            description: "Grass are twice as efficient.",
            cost: new Decimal(3e10),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        704: {
            img: "resources/currencies/grass.png",
            unlocked() {return getBuyableAmount("ep2", 7).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Strengthened Sheath</span>",
            description: "Grass are twice as efficient.",
            cost: new Decimal(1.5e12),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        705: {
            img: "resources/currencies/grass.png",
            unlocked() {return getBuyableAmount("ep2", 7).gte(100)},
            title: "<span style='color:#E9D673cc'>Denser Roots</span>",
            description: "Grass are twice as efficient.",
            cost: new Decimal(1.5e15),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        706: {
            img: "resources/currencies/grass.png",
            unlocked() {return getBuyableAmount("ep2", 7).gte(150)},
            title: "<span style='color:#A8BF91cc'>Multiple Shoots</span>",
            description: "Grass are twice as efficient.",
            cost: new Decimal(1.5e18),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        707: {
            img: "resources/currencies/grass.png",
            unlocked() {return getBuyableAmount("ep2", 7).gte(200)},
            title: "<span style='color:#6E5755cc'>More Tillers</span>",
            description: "Grass are twice as efficient.",
            cost: new Decimal(1.5e21),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        801: {
            img: "resources/currencies/pent.png",
            unlocked() {return getBuyableAmount("ep2", 8).gte(1)},
            title: "Pent Up",
            description: "Pents are twice as efficient.",
            cost: new Decimal(4e9),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        802: {
            img: "resources/currencies/pent.png",
            unlocked() {return getBuyableAmount("ep2", 8).gte(5)},
            title: "<span style='color:#FF89E7cc'>Pent Increased?</span>",
            description: "Pents are twice as efficient.",
            cost: new Decimal(2e10),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        803: {
            img: "resources/currencies/pent.png",
            unlocked() {return getBuyableAmount("ep2", 8).gte(25)},
            title: "<span style='color:#00DEFFcc'>Pent Elevated??</span>",
            description: "Pents are twice as efficient.",
            cost: new Decimal(4e11),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        804: {
            img: "resources/currencies/pent.png",
            unlocked() {return getBuyableAmount("ep2", 8).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Pent Raised???</span>",
            description: "Pents are twice as efficient.",
            cost: new Decimal(2e13),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        805: {
            img: "resources/currencies/pent.png",
            unlocked() {return getBuyableAmount("ep2", 8).gte(100)},
            title: "<span style='color:#E9D673cc'>Pent Heightened????</span>",
            description: "Pents are twice as efficient.",
            cost: new Decimal(2e16),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        806: {
            img: "resources/currencies/pent.png",
            unlocked() {return getBuyableAmount("ep2", 8).gte(150)},
            title: "<span style='color:#A8BF91cc'>Pent Escalated?????</span>",
            description: "Pents are twice as efficient.",
            cost: new Decimal(2e19),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        807: {
            img: "resources/currencies/pent.png",
            unlocked() {return getBuyableAmount("ep2", 8).gte(200)},
            title: "<span style='color:#6E5755cc'>Pent Maximized??????</span>",
            description: "Pents are twice as efficient.",
            cost: new Decimal(2e22),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        901: {
            img: "resources/currencies/grasshoppers.png",
            unlocked() {return getBuyableAmount("ep2", 9).gte(1)},
            title: "Higher Hops",
            description: "Grasshoppers are twice as efficient.",
            cost: new Decimal(6e10),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        902: {
            img: "resources/currencies/grasshoppers.png",
            unlocked() {return getBuyableAmount("ep2", 9).gte(5)},
            title: "<span style='color:#FF89E7cc'>Condensed Carapace</span>",
            description: "Grasshoppers are twice as efficient.",
            cost: new Decimal(3e11),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        903: {
            img: "resources/currencies/grasshoppers.png",
            unlocked() {return getBuyableAmount("ep2", 9).gte(25)},
            title: "<span style='color:#00DEFFcc'>Curved Claws</span>",
            description: "Grasshoppers are twice as efficient.",
            cost: new Decimal(6e12),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        904: {
            img: "resources/currencies/grasshoppers.png",
            unlocked() {return getBuyableAmount("ep2", 9).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Accurate Antennas</span>",
            description: "Grasshoppers are twice as efficient.",
            cost: new Decimal(3e14),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        905: {
            img: "resources/currencies/grasshoppers.png",
            unlocked() {return getBuyableAmount("ep2", 9).gte(100)},
            title: "<span style='color:#E9D673cc'>Faster Flight</span>",
            description: "Grasshoppers are twice as efficient.",
            cost: new Decimal(3e17),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        906: {
            img: "resources/currencies/grasshoppers.png",
            unlocked() {return getBuyableAmount("ep2", 9).gte(150)},
            title: "<span style='color:#A8BF91cc'>Triple Ocelli</span>",
            description: "Grasshoppers are twice as efficient.",
            cost: new Decimal(3e20),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        907: {
            img: "resources/currencies/grasshoppers.png",
            unlocked() {return getBuyableAmount("ep2", 9).gte(200)},
            title: "<span style='color:#6E5755cc'>Munching Mandibles</span>",
            description: "Grasshoppers are twice as efficient.",
            cost: new Decimal(3e23),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        1001: {
            img: "resources/currencies/fertilizer.png",
            unlocked() {return getBuyableAmount("ep2", 10).gte(1)},
            title: "Organic Fertilizers",
            description: "Fertilizers are twice as efficient.",
            cost: new Decimal(8e11),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        1002: {
            img: "resources/currencies/fertilizer.png",
            unlocked() {return getBuyableAmount("ep2", 10).gte(5)},
            title: "<span style='color:#FF89E7cc'>Inorganic Fertilizers</span>",
            description: "Fertilizers are twice as efficient.",
            cost: new Decimal(4e12),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        1003: {
            img: "resources/currencies/fertilizer.png",
            unlocked() {return getBuyableAmount("ep2", 10).gte(25)},
            title: "<span style='color:#00DEFFcc'>NPK Fertilizers</span>",
            description: "Fertilizers are twice as efficient.",
            cost: new Decimal(8e13),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        1004: {
            img: "resources/currencies/fertilizer.png",
            unlocked() {return getBuyableAmount("ep2", 10).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Granular Fertilizers</span>",
            description: "Fertilizers are twice as efficient.",
            cost: new Decimal(4e15),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        1005: {
            img: "resources/currencies/fertilizer.png",
            unlocked() {return getBuyableAmount("ep2", 10).gte(100)},
            title: "<span style='color:#E9D673cc'>Liquid Fertilizers</span>",
            description: "Fertilizers are twice as efficient.",
            cost: new Decimal(4e18),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        1006: {
            img: "resources/currencies/fertilizer.png",
            unlocked() {return getBuyableAmount("ep2", 10).gte(150)},
            title: "<span style='color:#A8BF91cc'>Coated Fertilizers</span>",
            description: "Fertilizers are twice as efficient.",
            cost: new Decimal(4e21),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        1007: {
            img: "resources/currencies/fertilizer.png",
            unlocked() {return getBuyableAmount("ep2", 10).gte(200)},
            title: "<span style='color:#6E5755cc'>Powder Fertilizers</span>",
            description: "Fertilizers are twice as efficient.",
            cost: new Decimal(4e24),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        1101: {
            img: "resources/currencies/code_experience.png",
            unlocked() {return getBuyableAmount("ep2", 11).gte(1)},
            title: "Python Experience",
            description: "Codes are twice as efficient.",
            cost: new Decimal(1e13),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        1102: {
            img: "resources/currencies/code_experience.png",
            unlocked() {return getBuyableAmount("ep2", 11).gte(5)},
            title: "<span style='color:#FF89E7cc'>Javascript Experience</span>",
            description: "Codes are twice as efficient.",
            cost: new Decimal(5e13),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        1103: {
            img: "resources/currencies/code_experience.png",
            unlocked() {return getBuyableAmount("ep2", 11).gte(25)},
            title: "<span style='color:#00DEFFcc'>Java Experience</span>",
            description: "Codes are twice as efficient.",
            cost: new Decimal(1e15),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        1104: {
            img: "resources/currencies/code_experience.png",
            unlocked() {return getBuyableAmount("ep2", 11).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>C++ Experience</span>",
            description: "Codes are twice as efficient.",
            cost: new Decimal(5e16),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        1105: {
            img: "resources/currencies/code_experience.png",
            unlocked() {return getBuyableAmount("ep2", 11).gte(100)},
            title: "<span style='color:#E9D673cc'>Typescript Experience</span>",
            description: "Codes are twice as efficient.",
            cost: new Decimal(5e19),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        1106: {
            img: "resources/currencies/code_experience.png",
            unlocked() {return getBuyableAmount("ep2", 11).gte(150)},
            title: "<span style='color:#A8BF91cc'>SQL Experience</span>",
            description: "Codes are twice as efficient.",
            cost: new Decimal(5e22),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        1107: {
            img: "resources/currencies/code_experience.png",
            unlocked() {return getBuyableAmount("ep2", 11).gte(200)},
            title: "<span style='color:#6E5755cc'>Rust Experience</span>",
            description: "Codes are twice as efficient.",
            cost: new Decimal(5e25),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        1201: {
            img: "resources/currencies/mods.png",
            unlocked() {return getBuyableAmount("ep2", 12).gte(1)},
            title: "Brainstorming",
            description: "Mods are twice as efficient.",
            cost: new Decimal(2e14),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        1202: {
            img: "resources/currencies/mods.png",
            unlocked() {return getBuyableAmount("ep2", 12).gte(5)},
            title: "<span style='color:#FF89E7cc'>Planning</span>",
            description: "Mods are twice as efficient.",
            cost: new Decimal(1e15),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        1203: {
            img: "resources/currencies/mods.png",
            unlocked() {return getBuyableAmount("ep2", 12).gte(25)},
            title: "<span style='color:#00DEFFcc'>Sketching</span>",
            description: "Mods are twice as efficient.",
            cost: new Decimal(2e16),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        1204: {
            img: "resources/currencies/mods.png",
            unlocked() {return getBuyableAmount("ep2", 12).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Programming</span>",
            description: "Mods are twice as efficient.",
            cost: new Decimal(1e18),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        1205: {
            img: "resources/currencies/mods.png",
            unlocked() {return getBuyableAmount("ep2", 12).gte(100)},
            title: "<span style='color:#E9D673cc'>Testing</span>",
            description: "Mods are twice as efficient.",
            cost: new Decimal(1e21),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        1206: {
            img: "resources/currencies/mods.png",
            unlocked() {return getBuyableAmount("ep2", 12).gte(150)},
            title: "<span style='color:#A8BF91cc'>Bugfixing</span>",
            description: "Mods are twice as efficient.",
            cost: new Decimal(1e24),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        1207: {
            img: "resources/currencies/mods.png",
            unlocked() {return getBuyableAmount("ep2", 12).gte(200)},
            title: "<span style='color:#6E5755cc'>Naming</span>",
            description: "Mods are twice as efficient.",
            cost: new Decimal(1e27),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        1301: {
            img: "resources/currencies/dice.png",
            unlocked() {return getBuyableAmount("ep2", 13).gte(1)},
            title: "6-Sides",
            description: "Dice are twice as efficient.",
            cost: new Decimal(4e15),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        1302: {
            img: "resources/currencies/dice.png",
            unlocked() {return getBuyableAmount("ep2", 13).gte(5)},
            title: "<span style='color:#FF89E7cc'>12-Sides</span>",
            description: "Dice are twice as efficient.",
            cost: new Decimal(2e16),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        1303: {
            img: "resources/currencies/dice.png",
            unlocked() {return getBuyableAmount("ep2", 13).gte(25)},
            title: "<span style='color:#00DEFFcc'>18-Sides</span>",
            description: "Dice are twice as efficient.",
            cost: new Decimal(4e17),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        1304: {
            img: "resources/currencies/dice.png",
            unlocked() {return getBuyableAmount("ep2", 13).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>24-Sides</span>",
            description: "Dice are twice as efficient.",
            cost: new Decimal(2e19),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        1305: {
            img: "resources/currencies/dice.png",
            unlocked() {return getBuyableAmount("ep2", 13).gte(100)},
            title: "<span style='color:#E9D673cc'>30-Sides</span>",
            description: "Dice are twice as efficient.",
            cost: new Decimal(2e22),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        1306: {
            img: "resources/currencies/dice.png",
            unlocked() {return getBuyableAmount("ep2", 13).gte(150)},
            title: "<span style='color:#A8BF91cc'>36-Sides</span>",
            description: "Dice are twice as efficient.",
            cost: new Decimal(2e25),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        1307: {
            img: "resources/currencies/dice.png",
            unlocked() {return getBuyableAmount("ep2", 13).gte(200)},
            title: "<span style='color:#6E5755cc'>42-Sides</span>",
            description: "Dice are twice as efficient.",
            cost: new Decimal(2e28),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        1401: {
            img: "resources/currencies/infinity.png",
            unlocked() {return getBuyableAmount("ep2", 14).gte(1)},
            title: "Limitless",
            description: "Infinities are twice as efficient.",
            cost: new Decimal(6e16),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        1402: {
            img: "resources/currencies/infinity.png",
            unlocked() {return getBuyableAmount("ep2", 14).gte(5)},
            title: "<span style='color:#FF89E7cc'>Immeasurable</span>",
            description: "Infinities are twice as efficient.",
            cost: new Decimal(3e17),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        1403: {
            img: "resources/currencies/infinity.png",
            unlocked() {return getBuyableAmount("ep2", 14).gte(25)},
            title: "<span style='color:#00DEFFcc'>Unfathomable</span>",
            description: "Infinities are twice as efficient.",
            cost: new Decimal(4e18),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        1404: {
            img: "resources/currencies/infinity.png",
            unlocked() {return getBuyableAmount("ep2", 14).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Indefinite</span>",
            description: "Infinities are twice as efficient.",
            cost: new Decimal(3e20),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        1405: {
            img: "resources/currencies/infinity.png",
            unlocked() {return getBuyableAmount("ep2", 14).gte(100)},
            title: "<span style='color:#E9D673cc'>Incalculable</span>",
            description: "Infinities are twice as efficient.",
            cost: new Decimal(3e23),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        1406: {
            img: "resources/currencies/infinity.png",
            unlocked() {return getBuyableAmount("ep2", 14).gte(150)},
            title: "<span style='color:#A8BF91cc'>Inexhaustable</span>",
            description: "Infinities are twice as efficient.",
            cost: new Decimal(3e26),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        1407: {
            img: "resources/currencies/infinity.png",
            unlocked() {return getBuyableAmount("ep2", 14).gte(200)},
            title: "<span style='color:#6E5755cc'>Boundless</span>",
            description: "Infinities are twice as efficient.",
            cost: new Decimal(3e29),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        1501: {
            img: "resources/currencies/antimatter.png",
            unlocked() {return getBuyableAmount("ep2", 15).gte(1)},
            title: "First Dimension",
            description: "Antimatters are twice as efficient.",
            cost: new Decimal(8e17),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        1502: {
            img: "resources/currencies/antimatter.png",
            unlocked() {return getBuyableAmount("ep2", 15).gte(5)},
            title: "<span style='color:#FF89E7cc'>Second Dimension</span>",
            description: "Antimatters are twice as efficient.",
            cost: new Decimal(4e18),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        1503: {
            img: "resources/currencies/antimatter.png",
            unlocked() {return getBuyableAmount("ep2", 15).gte(25)},
            title: "<span style='color:#00DEFFcc'>Third Dimension</span>",
            description: "Antimatters are twice as efficient.",
            cost: new Decimal(5e19),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        1504: {
            img: "resources/currencies/antimatter.png",
            unlocked() {return getBuyableAmount("ep2", 15).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Fourth Dimension</span>",
            description: "Antimatters are twice as efficient.",
            cost: new Decimal(4e21),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        1505: {
            img: "resources/currencies/antimatter.png",
            unlocked() {return getBuyableAmount("ep2", 15).gte(100)},
            title: "<span style='color:#E9D673cc'>Fifth Dimension</span>",
            description: "Antimatters are twice as efficient.",
            cost: new Decimal(4e24),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        1506: {
            img: "resources/currencies/antimatter.png",
            unlocked() {return getBuyableAmount("ep2", 15).gte(150)},
            title: "<span style='color:#A8BF91cc'>Sixth Dimension</span>",
            description: "Antimatters are twice as efficient.",
            cost: new Decimal(4e27),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        1507: {
            img: "resources/currencies/antimatter.png",
            unlocked() {return getBuyableAmount("ep2", 15).gte(200)},
            title: "<span style='color:#6E5755cc'>Seventh Dimension</span>",
            description: "Antimatters are twice as efficient.",
            cost: new Decimal(4e30),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        1601: {
            img: "resources/currencies/infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 16).gte(1)},
            title: "Boundless Points",
            description: "IPs are twice as efficient.",
            cost: new Decimal(1e19),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        1602: {
            img: "resources/currencies/infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 16).gte(5)},
            title: "<span style='color:#FF89E7cc'>Ceaseless Points</span>",
            description: "IPs are twice as efficient.",
            cost: new Decimal(5e19),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        1603: {
            img: "resources/currencies/infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 16).gte(25)},
            title: "<span style='color:#00DEFFcc'>Countless Points</span>",
            description: "IPs are twice as efficient.",
            cost: new Decimal(7.5e20),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        1604: {
            img: "resources/currencies/infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 16).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Limitless Points</span>",
            description: "IPs are twice as efficient.",
            cost: new Decimal(5e22),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        1605: {
            img: "resources/currencies/infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 16).gte(100)},
            title: "<span style='color:#E9D673cc'>Unending Points</span>",
            description: "IPs are twice as efficient.",
            cost: new Decimal(5e25),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        1606: {
            img: "resources/currencies/infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 16).gte(150)},
            title: "<span style='color:#A8BF91cc'>Perpetual Points</span>",
            description: "IPs are twice as efficient.",
            cost: new Decimal(5e28),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        1607: {
            img: "resources/currencies/infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 16).gte(200)},
            title: "<span style='color:#6E5755cc'>Endless Points</span>",
            description: "IPs are twice as efficient.",
            cost: new Decimal(5e31),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        1701: {
            img: "resources/currencies/negative_infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 17).gte(1)},
            title: "stnioP sseldnuoB",
            description: "NIPs are twice as efficient.",
            cost: new Decimal(1e21),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        1702: {
            img: "resources/currencies/negative_infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 17).gte(5)},
            title: "<span style='color:#FF89E7cc'>stnioP sselesaeC</span>",
            description: "NIPs are twice as efficient.",
            cost: new Decimal(5e21),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        1703: {
            img: "resources/currencies/negative_infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 17).gte(25)},
            title: "<span style='color:#00DEFFcc'>stnioP sseltnuoC</span>",
            description: "NIPs are twice as efficient.",
            cost: new Decimal(7.5e22),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        1704: {
            img: "resources/currencies/negative_infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 17).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>stnioP sseltimiL</span>",
            description: "NIPs are twice as efficient.",
            cost: new Decimal(5e24),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        1705: {
            img: "resources/currencies/negative_infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 17).gte(100)},
            title: "<span style='color:#E9D673cc'>stnioP gnidnenU</span>",
            description: "NIPs are twice as efficient.",
            cost: new Decimal(5e27),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        1706: {
            img: "resources/currencies/negative_infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 17).gte(150)},
            title: "<span style='color:#A8BF91cc'>stnioP lautepreP</span>",
            description: "NIPs are twice as efficient.",
            cost: new Decimal(5e30),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        1707: {
            img: "resources/currencies/negative_infinity_points.png",
            unlocked() {return getBuyableAmount("ep2", 17).gte(200)},
            title: "<span style='color:#6E5755cc'>stnioP sseldnE</span>",
            description: "NIPs are twice as efficient.",
            cost: new Decimal(5e33),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        1801: {
            img: "resources/currencies/dimensional_power.png",
            unlocked() {return getBuyableAmount("ep2", 18).gte(1)},
            title: "Dotted Power",
            description: "Dimension Powers are twice as efficient.",
            cost: new Decimal(1e23),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#cccccc88, #aaaaaa88)"},
        },
        1802: {
            img: "resources/currencies/dimensional_power.png",
            unlocked() {return getBuyableAmount("ep2", 18).gte(5)},
            title: "<span style='color:#FF89E7cc'>Lined Power</span>",
            description: "Dimension Powers are twice as efficient.",
            cost: new Decimal(5e23),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF89E788, #EA0E6889)"},
        },
        1803: {
            img: "resources/currencies/dimensional_power.png",
            unlocked() {return getBuyableAmount("ep2", 18).gte(25)},
            title: "<span style='color:#00DEFFcc'>Squared Power</span>",
            description: "Dimension Powers are twice as efficient.",
            cost: new Decimal(7.5e24),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#00DEFF88, #01829288)"},
        },
        1804: {
            img: "resources/currencies/dimensional_power.png",
            unlocked() {return getBuyableAmount("ep2", 18).gte(50)},
            title: "<span style='color:#FFCC2Fcc'>Cubed Power</span>",
            description: "Dimension Powers are twice as efficient.",
            cost: new Decimal(5e26),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #FF790088)"},
        },
        1805: {
            img: "resources/currencies/dimensional_power.png",
            unlocked() {return getBuyableAmount("ep2", 18).gte(100)},
            title: "<span style='color:#E9D673cc'>Tesseracted Power</span>",
            description: "Dimension Powers are twice as efficient.",
            cost: new Decimal(5e29),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #A6721E88)"},
        },
        1806: {
            img: "resources/currencies/dimensional_power.png",
            unlocked() {return getBuyableAmount("ep2", 18).gte(150)},
            title: "<span style='color:#A8BF91cc'>Penteracted Power</span>",
            description: "Dimension Powers are twice as efficient.",
            cost: new Decimal(5e32),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A8BF9188, #955E3988)"},
        },
        1807: {
            img: "resources/currencies/dimensional_power.png",
            unlocked() {return getBuyableAmount("ep2", 18).gte(200)},
            title: "<span style='color:#6E5755cc'>Hexeracted Power</span>",
            description: "Dimension Powers are twice as efficient.",
            cost: new Decimal(5e35),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#6E575588, #432D2A88)"},
        },

        9001: {
            img: "resources/checkback/gold_simple.png",
            unlocked() {return getLevelableAmount("pet", 2002).gte(1)},
            title: "Lucky Day",
            description: "Golden Cookies appear x1.5 as often and last x1.5 as long on screen.",
            cost: new Decimal(77777777),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FFFFFF88, #E9D67388)"},
        },
        9002: {
            img: "resources/checkback/gold_simple.png",
            unlocked() {return getLevelableAmount("pet", 2002).gte(1)},
            title: "<span style='color:#E9D673cc'>Get Lucky</span>",
            description: "Golden Cookie effect \"Excellent!\" gives +2 more evolution shards.",
            cost: new Decimal(7.77e9),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E9D67388, #C3933888)"},
        },
        9003: {
            img: "resources/checkback/gold_simple.png",
            unlocked() {return getLevelableAmount("pet", 2002).gte(1)},
            title: "<span style='color:#C39338cc'>Serendipity</span>",
            description: "Golden Cookies appear x1.5 as often and last x1.5 as long on screen.",
            cost: new Decimal(7.77e11),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#C3933888, #A9762188)"},
        },
        9004: {
            img: "resources/checkback/gold_simple.png",
            unlocked() {return getLevelableAmount("pet", 2002).gte(1)},
            title: "<span style='color:#A97621cc'>Fortune</span>",
            description: "Golden Cookie effect \"Perfect!\" gives +1 more paragon shards.",
            cost: new Decimal(7.77e13),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#A9762188, #8C580F88)"},
        },
        9005: {
            img: "resources/checkback/gold_simple.png",
            unlocked() {return getLevelableAmount("pet", 2002).gte(1)},
            title: "<span style='color:#8C580Fcc'>Lucky Charm</span>",
            description: "Golden Cookies appear x1.5 as often and last x1.5 as long on screen.",
            cost: new Decimal(7.77e15),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#8C580F88, #703E0288)"},
        },
        9006: {
            img: "resources/checkback/gold_simple.png",
            unlocked() {return getLevelableAmount("pet", 2002).gte(1)},
            title: "<span style='color:#703E02cc'>Prosperity</span>",
            description: "Golden Cookie effect \"Delectable!\" has a 50% chance to give another chocolate shard.",
            cost: new Decimal(7.77e17),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#703E0288, #542A0088)"},
            //#381A0088
        },
        9007: {
            img: "resources/checkback/gold_simple.png",
            unlocked() {return getLevelableAmount("pet", 2002).gte(1)},
            title: "<span style='color:#542A00cc'>Fortuitously</span>",
            description: "Replace Golden Cookie effect \"Double!\" with \"Triple!\".",
            cost: new Decimal(7.77e19),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#542A0088, #381A0088)"},
        },
        
        9101: {
            img: "resources/checkback/wrath_simple.png",
            unlocked() {return getLevelableAmount("pet", 2003).gte(1)},
            title: "Annoyance",
            description() {return "Total buildings boost matos character health.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(6.66e12),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return player.ep2.totalBuildings.pow(0.7).mul(0.005).add(1)},
            style: {background: "radial-gradient(#FFFFFF88, #FF9F7F88)"},
        },
        9102: {
            img: "resources/checkback/wrath_simple.png",
            unlocked() {return getLevelableAmount("pet", 2003).gte(1)},
            title: "<span style='color:#FF9F7Fcc'>Irritation</span>",
            description: "Golden click bar scaling is 1.5x slower.",
            cost: new Decimal(6.66e14),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#FF9F7F88, #F9744888)"},
        },
        9103: {
            img: "resources/checkback/wrath_simple.png",
            unlocked() {return getLevelableAmount("pet", 2003).gte(1)},
            title: "<span style='color:#F97448cc'>Resentment</span>",
            description() {return "CPS boosts matos character damage.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(6.66e16),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return player.ep2.cookiesPerSecond.add(1).log(10).pow(0.7).mul(0.1).add(1)},
            style: {background: "radial-gradient(#F9744888, #E0542688)"},
        },
        9104: {
            img: "resources/checkback/wrath_simple.png",
            unlocked() {return getLevelableAmount("pet", 2003).gte(1)},
            title: "<span style='color:#E05426cc'>Indignation</span>",
            description: "Decrease golden click bar base by 10%.",
            cost: new Decimal(6.66e18),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#E0542688, #D4410D88)"},
        },
        9105: {
            img: "resources/checkback/wrath_simple.png",
            unlocked() {return getLevelableAmount("pet", 2003).gte(1)},
            title: "<span style='color:#D4410Dcc'>Anger</span>",
            description() {return "Golden Cookie Clicks boost matos character regen.<br>Currently: x" + formatSimple(upgradeEffect(this.layer, this.id), 2)},
            cost: new Decimal(6.66e20),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            effect() {return player.ep2.goldenClicks.pow(0.7).mul(0.01).add(1)},
            style: {background: "radial-gradient(#D4410D88, #CA130A88)"},
        },
        9106: {
            img: "resources/checkback/wrath_simple.png",
            unlocked() {return getLevelableAmount("pet", 2003).gte(1)},
            title: "<span style='color:#CA130Acc'>Rage</span>",
            description: "Golden Cookie effect \"Delectable!\" has a 50% chance to give another chocolate shard.",
            cost: new Decimal(6.66e22),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#CA130A88, #8C000088)"},
        },
        9107: {
            img: "resources/checkback/wrath_simple.png",
            unlocked() {return getLevelableAmount("pet", 2003).gte(1)},
            title: "<span style='color:#8C0000cc'>Fury</span>",
            description: "Reduce matos combo softcap scaling by -0.1%",
            cost: new Decimal(6.66e24),
            currencyLocation() { return player.ep2 },
            currencyDisplayName: "Cookies",
            currencyInternalName: "cookies",
            style: {background: "radial-gradient(#8C000088, #5B000088)"},
        },
    },
    buyables: {
        1: {
            costBase: new Decimal(15),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(0.1)
                if (hasUpgrade("ep2", 101)) eff = eff.mul(2)
                if (hasUpgrade("ep2", 102)) eff = eff.mul(2)
                if (hasUpgrade("ep2", 103)) eff = eff.mul(2)
                let val = player.ep2.totalBuildings.mul(0.1)
                if (hasUpgrade("ep2", 105)) val = val.mul(5)
                if (hasUpgrade("ep2", 106)) val = val.mul(10)
                if (hasUpgrade("ep2", 107)) val = val.mul(20)

                if (hasUpgrade("ep2", 104)) eff = eff.add(val)
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/celestial_points.png",
            title: "Points",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        2: {
            costBase: new Decimal(100),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(1)
                for (let i = 201; i < 208; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/rank.png",
            title: "Ranks",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        3: {
            costBase: new Decimal(1000),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(8)
                for (let i = 301; i < 308; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/factor_power.png",
            title: "Factors",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        4: {
            costBase: new Decimal(15000),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(60)
                for (let i = 401; i < 408; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/prestige_points.png",
            title: "<small>Prestiges</small>",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        5: {
            costBase: new Decimal(200000),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(400)
                for (let i = 501; i < 508; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked: true,
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/leaves.png",
            title: "Leaves",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        6: {
            costBase: new Decimal(2.5e6),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(2500)
                for (let i = 601; i < 608; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 403).gte(2) || getLevelableTier("pet", 403).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/trees.png",
            title: "Trees",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        7: {
            costBase: new Decimal(3e7),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(12000)
                for (let i = 701; i < 708; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 403).gte(3) || getLevelableTier("pet", 403).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/grass.png",
            title: "Grass",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        8: {
            costBase: new Decimal(4e8),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(60000)
                for (let i = 801; i < 808; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 403).gte(4) || getLevelableTier("pet", 403).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/pent.png",
            title: "Pent",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        9: {
            costBase: new Decimal(6e9),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(360000)
                for (let i = 901; i < 908; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 403).gte(5) || getLevelableTier("pet", 403).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/grasshoppers.png",
            title: "<span style='font-size:20px'>Grasshoppers<span>",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        10: {
            costBase: new Decimal(8e10),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(2e6)
                for (let i = 1001; i < 1008; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 403).gte(6) || getLevelableTier("pet", 403).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/fertilizer.png",
            title: "<small>Fertilizer</small>",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        11: {
            costBase: new Decimal(1e12),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(1e7)
                for (let i = 1101; i < 1108; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 403).gte(7) || getLevelableTier("pet", 403).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/code_experience.png",
            title: "Code",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        12: {
            costBase: new Decimal(2e13),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(7.5e7)
                for (let i = 1201; i < 1208; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 403).gte(8) || getLevelableTier("pet", 403).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/mods.png",
            title: "Mods",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        13: {
            costBase: new Decimal(4e14),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(5e8)
                for (let i = 1301; i < 1308; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 403).gte(9) || getLevelableTier("pet", 403).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/dice.png",
            title: "Dice",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        14: {
            costBase: new Decimal(6e15),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(3e9)
                for (let i = 1401; i < 1408; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 403).gte(10) || getLevelableTier("pet", 403).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/infinity.png",
            title: "Infinity",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        15: {
            costBase: new Decimal(8e16),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(2e10)
                for (let i = 1501; i < 1508; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 2004).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/antimatter.png",
            title: "Antimatter",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        16: {
            costBase: new Decimal(1e18),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(1.5e11)
                for (let i = 1601; i < 1608; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 2004).gte(1) && ((getLevelableAmount("pet", 403).gte(5) && getLevelableTier("pet", 403).gte(1)) || getLevelableTier("pet", 403).gte(2))},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/infinity_points.png",
            title: "IP",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        17: {
            costBase: new Decimal(1e20),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(2e12)
                for (let i = 1701; i < 1708; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 2004).gte(1) && ((getLevelableAmount("pet", 403).gte(10) && getLevelableTier("pet", 403).gte(1)) || getLevelableTier("pet", 403).gte(2))},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/negative_infinity_points.png",
            title: "NIP",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        18: {
            costBase: new Decimal(1e22),
            costGrowth: new Decimal(1.15),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let eff = new Decimal(5e13)
                for (let i = 1801; i < 1808; i++) {
                    if (hasUpgrade("ep2", i)) eff = eff.mul(2)
                }
                return eff.mul(getBuyableAmount(this.layer, this.id))
            },
            unlocked() {return getLevelableAmount("pet", 2004).gte(1) && ((getLevelableAmount("pet", 403).gte(15) && getLevelableTier("pet", 403).gte(1)) || getLevelableTier("pet", 403).gte(2))},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/currencies/dimensional_power.png",
            title: "<small style='font-size:16px'>Dimension Power</small>",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },

        101: {
            costBase: new Decimal(1e6),
            costGrowth: new Decimal(1.5),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let amt = getLevelableAmount("pet", 401).add(getLevelableTier("pet", 401).mul(5).min(40))
                return amt.pow(0.7).mul(0.01).mul(getBuyableAmount(this.layer, this.id)).mul(getLevelableTier("pet", 401).add(1)).add(1)
            },
            unlocked() {return getLevelableAmount("pet", 401).gte(1) || getLevelableTier("pet", 401).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/checkback/dotknightPetBuilding.png",
            title: "Dotknight",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        102: {
            costBase: new Decimal(1e8),
            costGrowth: new Decimal(2),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let amt = getLevelableAmount("pet", 402).add(getLevelableTier("pet", 402).mul(5).min(40))
                return amt.pow(0.7).mul(0.01).mul(getBuyableAmount(this.layer, this.id)).mul(getLevelableTier("pet", 402).add(1)).add(1)
            },
            unlocked() {return getLevelableAmount("pet", 402).gte(1) || getLevelableTier("pet", 402).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/checkback/dragonPetBuilding.png",
            title: "Dragon",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        103: {
            costBase: new Decimal(1e10),
            costGrowth: new Decimal(4),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let amt = getLevelableAmount("pet", 403).add(getLevelableTier("pet", 403).mul(5).min(40))
                return amt.pow(0.7).mul(0.01).mul(getBuyableAmount(this.layer, this.id)).mul(getLevelableTier("pet", 403).add(1)).add(1)
            },
            unlocked: true,
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/checkback/cookiePetBuilding.png",
            title: "Cookie",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        104: {
            costBase: new Decimal(1e12),
            costGrowth: new Decimal(8),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let amt = getLevelableAmount("pet", 404).add(getLevelableTier("pet", 404).mul(5).min(40))
                return amt.pow(0.7).mul(0.01).mul(getBuyableAmount(this.layer, this.id)).mul(getLevelableTier("pet", 404).add(1)).add(1)
            },
            unlocked() {return getLevelableAmount("pet", 404).gte(1) || getLevelableTier("pet", 404).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/checkback/kresPetBuilding.png",
            title: "Kres",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        105: {
            costBase: new Decimal(1e14),
            costGrowth: new Decimal(16),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let amt = getLevelableAmount("pet", 405).add(getLevelableTier("pet", 405).mul(5).min(40))
                return amt.pow(0.7).mul(0.01).mul(getBuyableAmount(this.layer, this.id)).mul(getLevelableTier("pet", 405).add(1)).add(1)
            },
            unlocked() {return getLevelableAmount("pet", 405).gte(1) || getLevelableTier("pet", 405).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/checkback/navPetBuilding.png",
            title: "Nav",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
        106: {
            costBase: new Decimal(1e16),
            costGrowth: new Decimal(32),
            currency() {return player.ep2.cookies},
            pay(amt) {player.ep2.cookies = player.ep2.cookies.sub(amt)},
            effect(x) {
                let amt = getLevelableAmount("pet", 406).add(getLevelableTier("pet", 406).mul(5).min(40))
                return amt.pow(0.7).mul(0.01).mul(getBuyableAmount(this.layer, this.id)).mul(getLevelableTier("pet", 406).add(1)).add(1)
            },
            unlocked() {return getLevelableAmount("pet", 406).gte(1) || getLevelableTier("pet", 406).gte(1)},
            cost(x) {return Decimal.sumGeometricSeries(player.ep2.shopMult, this.costBase, this.costGrowth, (x || getBuyableAmount(this.layer, this.id)))},
            canAfford() {return player.ep2.cookies.gte(this.cost())},
            img: "resources/checkback/selPetBuilding.png",
            title: "Sel",
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player.ep2.shopMult))
                player.ep2.totalBuildings = player.ep2.totalBuildings.add(player.ep2.shopMult)
            },
        },
    },
    cookieClick() {
        player.ep2.cookies = player.ep2.cookies.add(player.ep2.cookiesPerClick)
        if (getLevelableAmount("pet", 2002).gte(1)) player.ep2.barClicks = player.ep2.barClicks + 1
        makeParticles(BIG_COOKIE_NUMBER, 1, `normal`, {x: mouseX-80+(Math.random()*10), text: "+" + formatWhole(player.ep2.cookiesPerClick)})
    },
    microtabs: {
        Tabs: {
            "Regular Buildings": {
                content: [
                    ["style-row", [
                        ["raw-html", () => {
                            if (player.ep2.shopMult == 1) return "<button class='shopButton selected' style='width:91px;height:30px' onclick='player.ep2.shopMult = 1'>1</button>"
                            return "<button class='shopButton' style='width:91px;height:30px' onclick='player.ep2.shopMult = 1'>1</button>"
                        }],
                        ["raw-html", () => {
                            if (player.ep2.shopMult == 10) return "<button class='shopButton selected' style='width:91px;height:30px' onclick='player.ep2.shopMult = 10'>10</button>"
                            return "<button class='shopButton' style='width:91px;height:30px' onclick='player.ep2.shopMult = 10'>10</button>"
                        }],
                        ["raw-html", () => {
                            if (player.ep2.shopMult == 100) return "<button class='shopButton selected' style='width:91px;height:30px' onclick='player.ep2.shopMult = 100'>100</button>"
                            return "<button class='shopButton' style='width:91px;height:30px' onclick='player.ep2.shopMult = 100'>100</button>"
                        }],
                        ["raw-html", () => {
                            if (player.ep2.shopMult == 1000) return "<button class='shopButton selected' style='width:92px;height:30px' onclick='player.ep2.shopMult = 1000'>1,000</button>"
                            return "<button class='shopButton' style='width:92px;height:30px' onclick='player.ep2.shopMult = 1000'>1,000</button>"
                        }],
                    ], {width: "365px", height: "30px", background: "#181818"}],
                    ["always-scroll-column", [
                        ["cookie-building", 1],
                        ["cookie-building", 2],
                        ["cookie-building", 3],
                        ["cookie-building", 4],
                        ["cookie-building", 5],
                        ["cookie-building", 6],
                        ["cookie-building", 7],
                        ["cookie-building", 8],
                        ["cookie-building", 9],
                        ["cookie-building", 10],
                        ["cookie-building", 11],
                        ["cookie-building", 12],
                        ["cookie-building", 13],
                        ["cookie-building", 14],
                        ["cookie-building", 15],
                        ["cookie-building", 16],
                        ["cookie-building", 17],
                        ["cookie-building", 18],
                        ["style-row", [
                            ["raw-html", () => {return "Next building unlocked at Pet Level " + formatWhole(getLevelableAmount("pet", 403).add(1))}, {color: "#ccc", fontSize: "13px", textShadow: "0px 1px 0px #000,0px 0px 1px #ccc"}],
                        ], () => {return getLevelableAmount("pet", 403).lt(11) && getLevelableTier("pet", 403).lt(1) ? {width:"330px", height: "30px", background: "#181818", border: "2px solid #888", borderRadius: "5px", margin: "15px 0"} : {display: "none !important"}}],
                        ["style-row", [
                            ["raw-html", () => {return "Next building unlocked at Asc-1 Lvl-" + formatWhole(getLevelableAmount("pet", 403).div(5).add(0.1).ceil().mul(5))}, {color: "#ccc", fontSize: "13px", textShadow: "0px 1px 0px #000,0px 0px 1px #ccc"}],
                        ], () => {return getLevelableAmount("pet", 2004).gte(1) && getLevelableAmount("pet", 403).lt(16) && getLevelableTier("pet", 403).lt(2) ? {width:"330px", height: "30px", background: "#181818", border: "2px solid #888", borderRadius: "5px", margin: "15px 0"} : {display: "none !important"}}],
                    ], {width: "365px", height: "722px"}],
                ],
            },
            "Pet Buildings": {
                content: [
                    ["style-row", [
                        ["raw-html", () => {
                            if (player.ep2.shopMult == 1) return "<button class='shopButton selected' style='width:122px;height:30px' onclick='player.ep2.shopMult = 1'>1</button>"
                            return "<button class='shopButton' style='width:122px;height:30px' onclick='player.ep2.shopMult = 1'>1</button>"
                        }],
                        ["raw-html", () => {
                            if (player.ep2.shopMult == 10) return "<button class='shopButton selected' style='width:121px;height:30px' onclick='player.ep2.shopMult = 10'>10</button>"
                            return "<button class='shopButton' style='width:121px;height:30px' onclick='player.ep2.shopMult = 10'>10</button>"
                        }],
                        ["raw-html", () => {
                            if (player.ep2.shopMult == 100) return "<button class='shopButton selected' style='width:122px;height:30px' onclick='player.ep2.shopMult = 100'>100</button>"
                            return "<button class='shopButton' style='width:122px;height:30px' onclick='player.ep2.shopMult = 100'>100</button>"
                        }],
                    ], {width: "365px", height: "30px", background: "#181818"}],
                    ["always-scroll-column", [
                        ["cookie-building", 101],
                        ["cookie-building", 102],
                        ["cookie-building", 103],
                        ["cookie-building", 104],
                        ["cookie-building", 105],
                        ["cookie-building", 106],
                    ], {width: "365px", height: "722px"}],
                ],
            },
            "Upgrades": {
                content: [
                    ["style-column", [["cookie-display", []]], {width: "365px", height: "80px"}],
                    ["always-scroll-column", [
                        ["style-row", [
                            ["raw-html", "Building Upgrades", {color: "white", textShadow: "0px 1px 0px #000,0px 0px 1px #fff"}],
                        ], {width: "350px", height: "30px", background: "#181818"}],
                        ["left-row", [["cookie-upgrade", 101], ["cookie-upgrade", 102], ["cookie-upgrade", 103], ["cookie-upgrade", 104], ["cookie-upgrade", 105], ["cookie-upgrade", 106], ["cookie-upgrade", 107]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 201], ["cookie-upgrade", 202], ["cookie-upgrade", 203], ["cookie-upgrade", 204], ["cookie-upgrade", 205], ["cookie-upgrade", 206], ["cookie-upgrade", 207]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 301], ["cookie-upgrade", 302], ["cookie-upgrade", 303], ["cookie-upgrade", 304], ["cookie-upgrade", 305], ["cookie-upgrade", 306], ["cookie-upgrade", 307]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 401], ["cookie-upgrade", 402], ["cookie-upgrade", 403], ["cookie-upgrade", 404], ["cookie-upgrade", 405], ["cookie-upgrade", 406], ["cookie-upgrade", 407]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 501], ["cookie-upgrade", 502], ["cookie-upgrade", 503], ["cookie-upgrade", 504], ["cookie-upgrade", 505], ["cookie-upgrade", 506], ["cookie-upgrade", 507]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 601], ["cookie-upgrade", 602], ["cookie-upgrade", 603], ["cookie-upgrade", 604], ["cookie-upgrade", 605], ["cookie-upgrade", 606], ["cookie-upgrade", 607]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 701], ["cookie-upgrade", 702], ["cookie-upgrade", 703], ["cookie-upgrade", 704], ["cookie-upgrade", 705], ["cookie-upgrade", 706], ["cookie-upgrade", 707]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 801], ["cookie-upgrade", 802], ["cookie-upgrade", 803], ["cookie-upgrade", 804], ["cookie-upgrade", 805], ["cookie-upgrade", 806], ["cookie-upgrade", 807]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 901], ["cookie-upgrade", 902], ["cookie-upgrade", 903], ["cookie-upgrade", 904], ["cookie-upgrade", 905], ["cookie-upgrade", 906], ["cookie-upgrade", 907]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 1001], ["cookie-upgrade", 1002], ["cookie-upgrade", 1003], ["cookie-upgrade", 1004], ["cookie-upgrade", 1005], ["cookie-upgrade", 1006], ["cookie-upgrade", 1007]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 1101], ["cookie-upgrade", 1102], ["cookie-upgrade", 1103], ["cookie-upgrade", 1104], ["cookie-upgrade", 1105], ["cookie-upgrade", 1106], ["cookie-upgrade", 1107]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 1201], ["cookie-upgrade", 1202], ["cookie-upgrade", 1203], ["cookie-upgrade", 1204], ["cookie-upgrade", 1205], ["cookie-upgrade", 1206], ["cookie-upgrade", 1207]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 1301], ["cookie-upgrade", 1302], ["cookie-upgrade", 1303], ["cookie-upgrade", 1304], ["cookie-upgrade", 1305], ["cookie-upgrade", 1306], ["cookie-upgrade", 1307]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 1401], ["cookie-upgrade", 1402], ["cookie-upgrade", 1403], ["cookie-upgrade", 1404], ["cookie-upgrade", 1405], ["cookie-upgrade", 1406], ["cookie-upgrade", 1407]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 1501], ["cookie-upgrade", 1502], ["cookie-upgrade", 1503], ["cookie-upgrade", 1504], ["cookie-upgrade", 1505], ["cookie-upgrade", 1506], ["cookie-upgrade", 1507]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 1601], ["cookie-upgrade", 1602], ["cookie-upgrade", 1603], ["cookie-upgrade", 1604], ["cookie-upgrade", 1605], ["cookie-upgrade", 1606], ["cookie-upgrade", 1607]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 1701], ["cookie-upgrade", 1702], ["cookie-upgrade", 1703], ["cookie-upgrade", 1704], ["cookie-upgrade", 1705], ["cookie-upgrade", 1706], ["cookie-upgrade", 1707]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 1801], ["cookie-upgrade", 1802], ["cookie-upgrade", 1803], ["cookie-upgrade", 1804], ["cookie-upgrade", 1805], ["cookie-upgrade", 1806], ["cookie-upgrade", 1807]], {width: "350px"}],
                        ["style-row", [
                            ["raw-html", "Cookie Upgrades", {color: "white", textShadow: "0px 1px 0px #000,0px 0px 1px #fff"}],
                        ], () => {return getLevelableAmount("pet", 2002).gte(1) || getLevelableAmount("pet", 2003).gte(1) ? {width: "350px", height: "30px", background: "#181818", borderTop: "8px solid #422B21"} : {display: "none !important"}}],
                        ["left-row", [["cookie-upgrade", 9001], ["cookie-upgrade", 9002], ["cookie-upgrade", 9003], ["cookie-upgrade", 9004], ["cookie-upgrade", 9005], ["cookie-upgrade", 9006], ["cookie-upgrade", 9007]], () => {return getLevelableAmount("pet", 2002).gte(1) ? {width: "350px"} : {display: "none !important"}}],
                        ["left-row", [["cookie-upgrade", 9101], ["cookie-upgrade", 9102], ["cookie-upgrade", 9103], ["cookie-upgrade", 9104], ["cookie-upgrade", 9105], ["cookie-upgrade", 9106], ["cookie-upgrade", 9107]], {width: "350px"}],
                        ["left-row", [], () => {return getLevelableAmount("pet", 2003).gte(1) ? {width: "350px"} : {display: "none !important"}}],
                        ["style-row", [
                            ["raw-html", "Meta Upgrades", {color: "white", textShadow: "0px 1px 0px #000,0px 0px 1px #fff"}],
                        ], () => {return player.ep2.totalBuildings.gte(15) ? {width: "350px", height: "30px", background: "#181818", borderTop: "8px solid #422B21"} : {display: "none !important"}}],
                        ["left-row", [["cookie-upgrade", 1], ["cookie-upgrade", 2], ["cookie-upgrade", 3], ["cookie-upgrade", 4], ["cookie-upgrade", 5], ["cookie-upgrade", 6], ["cookie-upgrade", 7]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 8], ["cookie-upgrade", 9], ["cookie-upgrade", 10], ["cookie-upgrade", 11], ["cookie-upgrade", 12], ["cookie-upgrade", 13], ["cookie-upgrade", 14]], {width: "350px"}],
                        ["left-row", [["cookie-upgrade", 15], ["cookie-upgrade", 16], ["cookie-upgrade", 17], ["cookie-upgrade", 18]], {width: "350px"}],
                    ], {width: "365px", height: "672px"}],
                ],
            },
        },
    },
    tabFormat: [
        ["style-row", [
            ["style-column", [
                ["top-column", [
                    ["left-row", [
                        ["left-row", [
                            ["bt-clickable", 2],
                            ["raw-html", () => {return formatShortWhole(player.ep2.chocoShards)}, () => {return player.ep2.obtainedShards ? {color: "#86562E", fontSize: "16px", textShadow: "0px 1px 4px #000", pointerEvents: "none"} : {display: "none !important"}}],
                        ], () => {return player.ep2.obtainedShards ? {width: "110px", height: "30px", background: "#28190d", borderRight: "8px solid #422B21", borderBottom: "8px solid #422B21", borderRadius: "0 0 38px 0"} : {width: "118px", height: "48px"}}],
                        ["style-row", [], {width: "114px", height: "30px"}],
                        ["left-row", [

                        ], () => {return false ? {width: "110px", height: "30px", background: "#211510", borderLeft: "8px solid #422B21", borderBottom: "8px solid #422B21", borderRadius: "0 0 0 20px"} : {width: "118px", height: "48px"}}],
                    ], {width: "350px", height: "38px", marginBottom: "10px"}],
                    ["style-column", [
                        ["raw-html", () => {return formatWhole(player.ep2.cookies) + " Cookies"}, {color: "white", fontSize: "28px", fontFamily: "monospace", pointerEvents: "none"}],
                        ["tooltip-row", [
                            ["raw-html", () => {return "per second: " + formatSimple(player.ep2.cookiesPerSecond)}, {color: "white", fontSize: "14px", fontFamily: "monospace", pointerEvents: "none"}],
                            ["raw-html", () => {return "<div class='bottomTooltip'><small>CPS Before Multipliers<br>" + formatWhole(player.ep2.cpsbm) + "</small></div>"}],
                        ]],
                    ], {width: "350px", background: "rgba(0,0,0,0.4)", padding: "2px 0"}],
                    ["blank", "130px"],
                    ["raw-html", "<button id='bigCookie' class='bigCookie' onmousedown='player.ep2.autoClick=true;event.preventDefault()' onmouseup='player.ep2.autoClick=false' onmouseleave='player.ep2.autoClick=false' ontouchstart='player.ep2.autoClick=true' ontouchend='player.ep2.autoClick=false' ontouchcancel='player.ep2.autoClick=false' onclick='layers.ep2.cookieClick()'>"],
                ], {width: "350px", height: "722px", background:"linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.8))"}],
                ["style-column", [
                    ["left-row", [
                        ["clickable", 1],
                    ], {paddingLeft: "5px"}],
                    ["tooltip-row", [
                        ["style-column", [
                            ["bar", "clickBar"],
                            ["bar", "goldenBar"],
                        ], {width: "350px", height: "20px"}],
                        ["raw-html", () => {return getLevelableAmount("pet", 2002).gte(1) ? "<div class='bottomTooltip'>Golden Click Bar<hr><small>" + formatWhole(player.ep2.barClicks) + "/" + formatWhole(player.ep2.barMax) + "<hr>Scaling Resets in: " + formatTime(player.ep2.scaleCooldown) + "</small></div>" : ""}],
                    ], {width: "350px", height: "20px", borderTop: "8px solid #422B21"}],
                ], {width: "350px", height: "78px", background: "rgba(0,0,0,0.8)"}],
            ], {width: "350px", height: "800px", borderRight: "8px solid #422B21"}],
            ["top-column", [
                ["style-row", [
                    ["raw-html", () => {
                        if (getLevelableAmount("pet", 2001).gte(1)) {
                            if (player.subtabs.ep2.Tabs == "Regular Buildings") return "<button class='shopButton selected' style='width:118px;height:40px' onclick='player.subtabs.ep2.Tabs = `Regular Buildings`'>Regular<br>Buildings</button>"
                            return "<button class='shopButton' style='width:118px;height:40px' onclick='player.subtabs.ep2.Tabs = `Regular Buildings`'>Regular<br>Buildings</button>"
                        } else {
                            if (player.subtabs.ep2.Tabs == "Regular Buildings") return "<button class='shopButton selected' style='width:180px;height:40px' onclick='player.subtabs.ep2.Tabs = `Regular Buildings`'>Buildings</button>"
                            return "<button class='shopButton' style='width:180px;height:40px' onclick='player.subtabs.ep2.Tabs = `Regular Buildings`'>Buildings</button>"
                        }
                    }],
                    ["style-row", [], () => {return getLevelableAmount("pet", 2001).gte(1) ? {width: "5px", height: "40px", background: "#422B21"} : {display: "none !important"}}],
                    ["raw-html", () => {
                        if (getLevelableAmount("pet", 2001).lt(1)) {
                            return ""
                        } else {
                            if (player.subtabs.ep2.Tabs == "Pet Buildings") return "<button class='shopButton selected' style='width:119px;height:40px' onclick='player.subtabs.ep2.Tabs = `Pet Buildings`'>Pet<br>Buildings</button>"
                            return "<button class='shopButton' style='width:119px;height:40px' onclick='player.subtabs.ep2.Tabs = `Pet Buildings`'>Pet<br>Buildings</button>"
                        }
                    }],
                    ["style-row", [], {width: "5px", height: "40px", background: "#422B21"}],
                    ["raw-html", () => {
                        if (getLevelableAmount("pet", 2001).gte(1)) {
                            if (player.subtabs.ep2.Tabs == "Upgrades") return "<button class='shopButton selected' style='width:118px;height:40px' onclick='player.subtabs.ep2.Tabs = `Upgrades`'>Upgrades</button>"
                            return "<button class='shopButton' style='width:118px;height:40px' onclick='player.subtabs.ep2.Tabs = `Upgrades`'>Upgrades</button>"
                        } else {
                            if (player.subtabs.ep2.Tabs == "Upgrades") return "<button class='shopButton selected' style='width:180px;height:40px' onclick='player.subtabs.ep2.Tabs = `Upgrades`'>Upgrades</button>"
                            return "<button class='shopButton' style='width:180px;height:40px' onclick='player.subtabs.ep2.Tabs = `Upgrades`'>Upgrades</button>"
                        }
                    }],
                ], {width: "365px", height: "40px", background: "#181818", borderBottom: "8px solid #422B21"}],
                ["buttonless-microtabs", "Tabs", {borderWidth: "0"}],
            ], {width: "365px", height: "800px", background: "linear-gradient(to right, #1b1b1b, #222222, #1b1b1b)", zIndex: "3"}],
        ], {width: "723px", background: "repeating-linear-gradient(90deg, #2D6C95 0px, #2D6C95 50px, #2A5B83 50px, #2A5B83 100px)", border: "8px solid #422B21"}],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 403).gte(1) || getLevelableTier("pet", 403).gte(1)) }
})