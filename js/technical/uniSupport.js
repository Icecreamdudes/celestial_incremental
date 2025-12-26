var universes = {}

function uniShown(uni){
    return tmp.uni[uni].uniShown;
}

function uniPaused(uni){
    return tmp.uni[uni].paused;
}

function pauseUniverse(universe) {
    if (player.uni[universe].paused) {
        let time = (Date.now() - player.uni[universe].pauseTime) / 1000
        let tree = universes[universe].tree
		for (row in tree) {
			for (thing in tree[row]) {
                layers[tree[row][thing]].update(time)
            }
        }
        player.uni[universe].paused = false
    } else {
        player.uni[universe].pauseTime = Date.now()
        if (player.universe == universe) player.universe = 0
        player.uni[universe].paused = true
    }
}

var UNIS = Object.keys(universes);

function updateUnis() {
    UNIS = Object.keys(universes);
    for (uni in universes){
        setupUniverses(uni)
    }
}

function setupUniverses(uni) {
    universes[uni].uni = uni
    if (universes[uni].startData) {
        data = universes[uni].startData()
    }

    if (!universes[uni].componentStyles) universes[uni].componentStyles = {}
    if (universes[uni].name === undefined) universes[uni].name = uni
    if (universes[uni].symbol === undefined) universes[uni].symbol = uni.charAt(0).toUpperCase() + uni.slice(1)
    if (universes[uni].uniShown === undefined) universes[uni].uniShown = true
    if (universes[uni].layers === undefined) universes[uni].layers = []
}

function addUniverse(uniName, uniData){ // Call this to add universes from a different file!
    universes[uniName] = uniData
    universes[uniName].isUni = true
}

addUniverse("U1", {
    name: "Universe 1<br>Overworld",
    symbol: "1",
    tree: [["i"], ["r", "f"], ["p", "t", "g"], ["gh", "pe", "pol", "m"], ["de", "rf", "d"], ["cb", "oi", "fa"]],
    nodeStyle() {
        let style = {
            background: "linear-gradient(315deg, #bababa 0%, #efefef 100%)",
			backgroundOrigin: "border-box",
			borderColor: "#555555",
        }
        if (player.universe=="U1") {
            style.outline = "2px solid white"
            style.outlineOffset = "-2px"
            style.borderWidth = "5px"
        }
        return style
    },
    uniShown() { return !player.startedGame || (!player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge)},
})

addUniverse("UA", {
    name: "Universe α<br>Hex",
    symbol: "H",
    tree: [["hpr", "hsa"], ["hre", "hpu"], ["hbl", "hcu", "hve"], ["hpw", "hrm"]],
    nodeStyle() {
        let style = {
            backgroundColor: "black",
            borderColor: "#0061ff",
        	color: "white",
        }
        if (player.universe=="UA") {
            style.outline = "2px solid white"
            style.outlineOffset = "-2px"
            style.borderWidth = "5px"
        }
        return style
    },
    uniShown() { return player.startedGame && (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) && !player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge},
})

addUniverse("U2", {
    name: "Universe 2<br>Antimatter World",
    symbol: "2",
    tree: [["in"], ["ad", "ip"], ["ta", "tad"], ["bi", "id", "om"], ["ca", "ro"/*, ["mi"]*/]],
    nodeStyle() {
        let style = {
            background: "linear-gradient(140deg, #10e96b 0%, #0f871c 100%)",
			backgroundOrigin: "border-box",
			borderColor: "#116622",
        }
        if (player.universe=="U2") {
            style.outline = "2px solid white"
            style.outlineOffset = "-2px"
            style.borderWidth = "5px"
        }
        return style
    },
    uniShown() { return player.startedGame && player.in.unlockedInfinity && !player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge},
})

addUniverse("A1", {
    name: "Alt-Universe 1<br>Cantepocalypse",
    symbol: "A1",
    tree: [["cp"], ["ar", "pr"], ["an", "rt", "rg"], ["oi", "gs"], ["fu"]],
    nodeStyle() {
        let style = {
            background: "linear-gradient(45deg, #064461 0%, #4a7d94 100%)",
			backgroundOrigin: "border-box",
			borderColor: "#013851"
        }
        if (player.universe=="A1") {
            style.outline = "2px solid white"
            style.outlineOffset = "-2px"
            style.borderWidth = "5px"
        }
        return style
    },
    uniShown() { return player.startedGame && player.cap.cantepocalypseUnlock && (hasUpgrade("bi", 28) || hasMilestone("s", 18)) && !player.sma.inStarmetalChallenge},
})

addUniverse("A2", {
    name: "Alt-Universe 2<br>Cosmic Cosmos",
    symbol: "A2",
    tree: [["st"], ["pl", "se"], ["ir"], ["sb"]],
    nodeStyle() {
        let style = {
            background: "linear-gradient(315deg, #5A4FCF 0%, #242124 74%)",
            backgroundOrigin: "border-box",
			color: "#ffffff",
        	borderColor: "#270052",
        }
        if (player.universe=="A2") {
            style.outline = "2px solid white"
            style.outlineOffset = "-2px"
            style.borderWidth = "5px"
        }
        return style
    },
    uniShown() { return player.startedGame && player.au2.au2Unlocked && !player.sma.inStarmetalChallenge},
})

addUniverse("U3", {
    name: "Universe 3<br>Domain of Singularity",
    symbol: "3",
    tree: [["s"], ["co", "cof"], ["ra", "cs", "sd"], ["sma", "sme"], ["ma"]],
    nodeStyle() {
        let style = {
            background: "linear-gradient(140deg, red 0%, black 125%)",
			backgroundOrigin: "border-box",
			borderColor: "#600000"
        }
        if (player.universe=="U3") {
            style.outline = "2px solid white"
            style.outlineOffset = "-2px"
            style.borderWidth = "5px"
        }
        return style
    },
    uniShown() { return player.startedGame && (player.ca.defeatedCante || player.s.highestSingularityPoints.gt(0)) && !player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge},
})

addUniverse("D1", {
    name: "Dark Universe 1<br>Shadow Overworld",
    symbol: "D1",
    tree: [["le"], ["dr", "dp"], ["dg", "db", "dgr"], ["dn", "dv", "ds"]],
    nodeStyle() {
        let style = {
            background: "linear-gradient(145deg, #2e2e2e 0%, #0d0d0d 100%)",
			backgroundOrigin: "border-box",
			color: "#ffffff",
			borderColor: "#555555",
        }
        if (player.universe=="D1") {
            style.outline = "2px solid white"
            style.outlineOffset = "-2px"
            style.borderWidth = "5px"
        }
        return style
    },
    uniShown() { return player.startedGame && player.sma.inStarmetalChallenge},
})

addUniverse("CB", {
    name: "Check Back",
    symbol: "CB",
    tree: [["cb"], ["ev0", "ev1", "ev2"], ["ev4", "ev8", "ev10"], ["ep0", "ep1", "ep2"], ["ep3", "ep4", "ep5"]],
    nodeStyle() {
        return {
            background: "#094599",
        }
    },
    uniShown() { return player.startedGame && hasUpgrade("i", 19) || hasMilestone("ip", 12) || (hasUpgrade("de", 13) && inChallenge("tad", 11)) || hasMilestone("s", 14)},
})

addUniverse("CH", {
    name: "Universe γ<br>Hall of Celestials",
    symbol: "γ",
    tree: [["ch"]],
    nodeStyle() {
        let style = {
            background: "linear-gradient(45deg, #8801aa 0%, #0260fe 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#2e0054",
        }
        if (player.universe=="CH") {
            style.outline = "2px solid white"
            style.outlineOffset = "-2px"
            style.borderWidth = "5px"
        }
        return style
    },
    uniShown() { return player.startedGame && player.fu.defeatedJocus && !player.sma.inStarmetalChallenge},
})

addUniverse("UD", {
    name: "Universe δ<br>Interspace",
    symbol: "δ",
    tree: [["rif"], ["cep", "blank", "exm"], ["cer"]],
    nodeStyle() {
        let style = {
            background: "linear-gradient(135deg, #ff7fbf 0%, #bf7fff 100%)",
            backgroundOrigin: "border-box",
        	borderColor: "#7f007f",
        }
        if (player.universe=="UD") {
            style.outline = "2px solid white"
            style.outlineOffset = "-2px"
            style.borderWidth = "5px"
        }
        return style
    },
    uniShown() { return player.startedGame && player.au2.au2Unlocked && !player.sma.inStarmetalChallenge},
})
