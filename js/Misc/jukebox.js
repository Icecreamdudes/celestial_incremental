addLayer("jukebox", {
    name: "Jukebox", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "JB", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    tooltip: "Jukebox",
    color: "white",
    clickables: {
        2: {
            title() { return "Settings" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "settings"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        4: {
            title() { return "Savebank<br><small style='color:#f44'>[HEAVILY WIP]</small>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "savebank"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        5: {
            title() { return "Changelog" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "changelog"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        7: {
            title() { return "Jukebox" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "jukebox"
            },
            style: { width: '125px', minHeight: '50px', color: "#ccc", background: "var(--miscButtonDisable)", borderRadius: '0px', border: "3px solid var(--regBorder)", margin: "0px 5px" },
        },
        11: {
            title: "Universes",
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["jukebox"]["stuff"] = "Universes"
            },
            style() {
                let look = {width: "200px", minHeight: "40px", fontSize: "14px", color: "white", background: "var(--miscButton)", border: "3px solid var(--miscButtonDisable)", borderRadius: "0"}
                if (player.subtabs["jukebox"]["stuff"] == "Universes") look.borderColor = "var(--selected)"
                return look
            },
        },
        12: {
            title: "Cutscenes",
            canClick: true,
            unlocked: true,
            onClick() {
                player.subtabs["jukebox"]["stuff"] = "Cutscenes"
            },
            style() {
                let look = {width: "200px", minHeight: "40px", fontSize: "14px", color: "white", background: "var(--miscButton)", border: "3px solid var(--miscButtonDisable)", borderRadius: "0"}
                if (player.subtabs["jukebox"]["stuff"] == "Cutscenes") look.borderColor = "var(--selected)"
                return look
            },
        },
        13: {
            title: "Black Heart",
            canClick: true,
            unlocked() {return player.ma.matosUnlock},
            onClick() {
                player.subtabs["jukebox"]["stuff"] = "Black Heart"
            },
            style() {
                let look = {width: "200px", minHeight: "40px", fontSize: "14px", color: "white", background: "var(--miscButton)", border: "3px solid var(--miscButtonDisable)", borderRadius: "0"}
                if (player.subtabs["jukebox"]["stuff"] == "Black Heart") look.borderColor = "var(--selected)"
                return look
            },
        },
    },
    songs: {
        "none": {
            artist: "",
            name: "Nothing Selected",
            description: "",
            img: "resources/music/none.png",
            file: "",
            unlocked: true,
        },
        "universe-1": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Universe 1",
            img: "resources/music/universe-1.png",
            file: "music/universe1.mp3",
            unlocked: true,
        },
        "checkback": {
            artist: "150percent",
            name: "N/A",
            description: "Checkback",
            img: "resources/music/checkback.png",
            file: "music/checkback.mp3",
            unlocked() {return hasUpgrade("i", 19) || player.in.unlockedInfinity || player.s.highestSingularityPoints.gt(0)},
        },
        "portal": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Portal",
            img: "resources/music/portal.png",
            file: "music/portal.mp3",
            unlocked() {return hasUpgrade('i', 21) || player.in.unlockedInfinity || player.s.highestSingularityPoints.gt(0)},
        },
        "universe-2": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Universe 2",
            img: "resources/music/universe-2.png",
            file: "music/universe2.mp3",
            unlocked() {return player.in.unlockedInfinity || player.s.highestSingularityPoints.gt(0)},
        },
        "infinity-challenge": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "IP Challenge",
            img: "resources/music/infinity-challenges.png",
            file: "music/tav.mp3",
            unlocked() {return hasChallenge("ip", 11) || player.s.highestSingularityPoints.gt(0)},
        },
        "hex": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Hex",
            img: "resources/music/hex.png",
            file: "music/hex.mp3",
            unlocked() {return hasChallenge("ip", 13) || player.s.highestSingularityPoints.gt(0)},
        },
        "tav-domain": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Tav's Domain",
            img: "resources/music/tav-domain.png",
            file: "music/tavDomain.mp3",
            unlocked() {return hasUpgrade("ta", 21) || player.s.highestSingularityPoints.gt(0)},
        },
        "alt-1": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Alt-Universe 1",
            img: "resources/music/alt-universe-1.png",
            file: "music/alt-uni1.mp3",
            unlocked() {return player.ca.cantepocalypseUnlock || player.s.highestSingularityPoints.gt(0)},
        },
        "universe-3": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Universe 3:1",
            img: "resources/music/universe-3.png",
            file: "music/singularity.mp3",
            unlocked() {return player.s.highestSingularityPoints.gt(0)},
        },
        "dark-universe-1": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Dark-Universe 1",
            img: "resources/music/dark-universe-1.png",
            file: "music/darkUni1.mp3",
            unlocked() {return hasUpgrade("s", 21)},
        },
        "black-heart": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Black Heart",
            img: "resources/music/black-heart.png",
            file: "music/enteringBlackHeart.mp3",
            unlocked() {return player.ma.matosUnlock},
        },
        "depth-1": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Depth 1",
            img: "resources/music/depth-1.png",
            file: "music/celestialites.mp3",
            unlocked() {return player.ma.matosUnlock},
        },
        "depth-2": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Depth 2",
            img: "resources/music/depth-2.png",
            file: "music/blackHeart.mp3",
            unlocked() {return player.ma.secondAreaUnlock},
        },
        "depth-3": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Depth 3",
            img: "resources/music/depth-3.png",
            file: "music/matosTheme.mp3",
            unlocked() {return hasUpgrade("ma", 27)},
        },
        "matos-fight": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Matos Fight",
            img: "resources/music/matos-fight.png",
            file: "music/matosFight.mp3",
            unlocked() {return player.ma.matosDefeated},
        },
        "universe-3-B": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Universe 3:2",
            img: "resources/music/universe-3-B.png",
            file: "music/singularity2.mp3",
            unlocked() {return player.ma.matosDefeated},
        },
        "eclipse": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Eclipse",
            img: "resources/music/eclipse.png",
            file: "music/eclipse.mp3",
            unlocked() {return getLevelableAmount("pet", 501).gte(1)},
        },
        "hall-of-celestials": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "HOC",
            img: "resources/music/hall-of-celestials.png",
            file: "music/hallOfCelestials.mp3",
            unlocked() {return player.fu.defeatedJocus},
        },
        "alt-2": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Alt-Universe 2",
            img: "resources/music/alt-universe-2.png",
            file: "music/space.mp3",
            unlocked() {return player.au2.au2Unlocked},
        },
        "cb-fighting-1": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "CB-Fighting T1",
            img: "resources/music/cb-fighting-t1.png",
            file: "music/fighting.mp3",
            unlocked() {return player.ma.matosDefeated},
        },
        "cb-fighting-2": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "CB-Fighting T2",
            img: "resources/music/cb-fighting-t2.png",
            file: "music/tier2.mp3",
            unlocked() {return hasMilestone("fi", 102)},
        },
        "space-battle": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Space Battle",
            img: "resources/music/space-battle.png",
            file: "music/spaceBattle.mp3",
            unlocked() {return player.se.starsExploreCount[0][5].gte(1)},
        },
        "iridite-fight": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Iridite Fight",
            img: "resources/music/iridite-fight.png",
            file: "music/iridite.mp3",
            unlocked() {return player.ir.iriditeDefeated},
        },
        "hive": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Hive",
            img: "resources/music/hive.png",
            file: "music/hive.mp3",
            unlocked() {return player.pol.unlockHive >= 2},
        },

        // CUTSCENE SONGS
        "cutscene-piano": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Piano",
            img: "resources/music/cutscene-piano.png",
            file: "music/cutscenePiano.mp3",
            unlocked: true,
        },
        "marcel": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Marcel",
            img: "resources/music/marcel.png",
            file: "music/marcel.mp3",
            unlocked() {return hasUpgrade("i", 19) || player.in.unlockedInfinity || player.s.highestSingularityPoints.gt(0)},
        },
        "cutscene-box": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Music-box",
            img: "resources/music/cutscene-box.png",
            file: "music/cutsceneBox.mp3",
            unlocked() {return player.in.infinityPoints.gte(1) || player.s.highestSingularityPoints.gt(0)},
        },
        "tav": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Tav",
            img: "resources/music/tav.png",
            file: "music/tavCutscene.mp3",
            unlocked() {return hasChallenge("ip", 18) || player.s.highestSingularityPoints.gt(0)},
        },
        "tav-box": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Tav Music-box",
            img: "resources/music/tav-box.png",
            file: "music/tavCutsceneBox.mp3",
            unlocked() {return hasUpgrade("ta", 15) || player.s.highestSingularityPoints.gt(0)},
        },
        "tav-rip": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Tav Death",
            img: "resources/music/tav-death.png",
            file: "music/tavDeath.mp3",
            unlocked() {return player.in.unlockedBreak || player.s.highestSingularityPoints.gt(0)},
        },
        "cante": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Cante",
            img: "resources/music/cante.png",
            file: "music/canteCutscene.mp3",
            unlocked() {return (player.ca.unlockedCante && hasUpgrade("bi", 28)) || player.s.highestSingularityPoints.gt(0)},
        },
        "singularity-waltz": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Singularity",
            img: "resources/music/singularity-waltz.png",
            file: "music/singularityWaltzPiano.mp3",
            unlocked() {return player.s.highestSingularityPoints.gt(0)},
        },
        "jocus": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Jocus",
            img: "resources/music/jocus.png",
            file: "music/somethingSomething.mp3",
            unlocked() {return hasUpgrade("fu", 11)},
        },
        "matos-box": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Matos Music-box",
            img: "resources/music/matos-box.png",
            file: "music/matosCutsceneBox.mp3",
            unlocked() {return player.ma.matosUnlock || player.ma.matosUnlockConditions[0] || player.ma.matosUnlockConditions[1] || player.ma.matosUnlockConditions[2] || player.ma.matosUnlockConditions[3]},
        },
        "matos": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Matos",
            img: "resources/music/matos.png",
            file: "music/matosCutscene.mp3",
            unlocked() {return player.ma.matosUnlock},
        },
        "nova": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Nova",
            img: "resources/music/nova.png",
            file: "music/novaCutscene.mp3",
            unlocked() {return player.ma.matosDefeated},
        },
        "iridite": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Iridite",
            img: "resources/music/iridite.png",
            file: "music/iriditeCutscene.mp3",
            unlocked() {return player.se.starsExploreCount[0][1].gte(1)},
        },
        "aleph": {
            artist: "Icecreamdude",
            name: "N/A",
            description: "Aleph",
            img: "resources/music/aleph.png",
            file: "music/alephCutscene.mp3",
            unlocked() {return player.pol.unlockHive >= 2},
        },
    },
    microtabs: {
        stuff: {
            "Universes": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked: true,
                content: [
                    ["blank", "2px"],
                    ["row", [
                        ["jukebox", "none"], ["jukebox", "universe-1"], ["jukebox", "checkback"], ["jukebox", "portal"],
                        ["jukebox", "universe-2"], ["jukebox", "infinity-challenge"], ["jukebox", "hex"], ["jukebox", "tav-domain"],
                        ["jukebox", "alt-1"], ["jukebox", "universe-3"], ["jukebox", "dark-universe-1"], ["jukebox", "universe-3-B"],
                        ["jukebox", "eclipse"], ["jukebox", "hall-of-celestials"], ["jukebox", "alt-2"], ["jukebox", "cb-fighting-1"],
                        ["jukebox", "cb-fighting-2"], ["jukebox", "space-battle"], ["jukebox", "iridite-fight"], ["jukebox", "hive"],
                    ]],
                    ["blank", "2px"],
                ],
            },
            "Cutscenes": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked: true,
                content: [
                    ["blank", "2px"],
                    ["row", [
                        ["jukebox", "none"], ["jukebox", "cutscene-piano"], ["jukebox", "marcel"], ["jukebox", "cutscene-box"],
                        ["jukebox", "tav"], ["jukebox", "tav-box"], ["jukebox", "tav-rip"], ["jukebox", "cante"],
                        ["jukebox", "singularity-waltz"], ["jukebox", "jocus"], ["jukebox", "matos-box"], ["jukebox", "matos"],
                        ["jukebox", "nova"], ["jukebox", "iridite"], ["jukebox", "aleph"], 
                    ]],
                    ["blank", "2px"],
                ],
            },
            "Black Heart": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked: true,
                content: [
                    ["blank", "2px"],
                    ["row", [
                        ["jukebox", "none"], ["jukebox", "black-heart"], ["jukebox", "depth-1"], ["jukebox", "depth-2"],
                        ["jukebox", "depth-3"], ["jukebox", "matos-fight"], 
                    ]],
                    ["blank", "2px"],
                ],
            },
        },
    },
    tabFormat: [
        ["row", [["clickable", 2], ["clickable", 7], ["clickable", 4], ["clickable", 5]]],
        ["blank", "50px"],
        ["style-column", [
            ["raw-html", "Jukebox", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ], {width: "650px", height: "40px", background: "var(--scroll4)", border: "3px solid var(--menuBackground)", marginBottom: "-3px", borderRadius: "30px 30px 0 0"}],
        ["style-row", [
            ["style-column", [
                ["style-column", [
                    ["style-column", [
                        ["raw-html", () => {return "<img src='" + layers.jukebox.songs[options.jukeboxID].img + "'style='width:177px;height:177px'></img>"}, {width: "177px", height: "177px", display: "block"}],
                    ], {width: "177px", height: "177px", background: "black", border: "3px solid var(--menuBackground)", marginBottom: "5px"}],
                    ["style-column", [
                        ["raw-html", () => {return layers.jukebox.songs[options.jukeboxID].name}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "<i>", layers.jukebox.songs[options.jukeboxID].description + "</i>"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "177px", height: "40px", background: "var(--miscButton)", borderRadius: "20px", marginBottom: "5px"}],
                    ["style-column", [
                        ["raw-html", () => {return layers.jukebox.songs[options.jukeboxID].artist}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                    ], {width: "177px", height: "20px", background: "var(--miscButton)", borderRadius: "10px"}],
                ], {width: "180px", height: "250px", borderBottom: "3px solid var(--menuBackground)", padding: "10px"}],
                ["top-column", [
                    ["hoverless-clickable", 11],
                    ["hoverless-clickable", 12],
                    ["hoverless-clickable", 13],
                ], {width: "200px", height: "327px", background: "var(--layerBackground)"}],
            ], {width: "200px", height: "600px", borderRight: "3px solid var(--menuBackground)"}],
            ["always-scroll-column", [
                ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
            ], {width: "447px", height: "600px", background: "var(--miscButtonDisable)"}],
        ], {width: "650px", height: "600px", background: "var(--tabTitle)", border: "3px solid var(--menuBackground)"}],
        ["style-row", [
            ["raw-html", "Song names have not been decided.", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ], {width: "650px", height: "30px", background: "var(--scroll4)", border: "3px solid var(--menuBackground)", marginTop: "-3px", borderRadius: "0 0 30px 30px"}],
    ],
    layerShown() { return false }
})