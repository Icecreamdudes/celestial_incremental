function prestigeButtonText(layer) {
	if (layers[layer].prestigeButtonText !== undefined)
		return run(layers[layer].prestigeButtonText(), layers[layer])
	if (tmp[layer].type == "normal")
		return `${player[layer].points.lt(1e3) ? (tmp[layer].resetDescription !== undefined ? tmp[layer].resetDescription : "Reset for ") : ""}+<b>${formatWhole(tmp[layer].resetGain)}</b> ${tmp[layer].resource} ${tmp[layer].resetGain.lt(100) && player[layer].points.lt(1e3) ? `<br><br>Next at ${(tmp[layer].roundUpCost ? formatWhole(tmp[layer].nextAt) : format(tmp[layer].nextAt))} ${tmp[layer].baseResource}` : ""}`
	if (tmp[layer].type == "static")
		return `${tmp[layer].resetDescription !== undefined ? tmp[layer].resetDescription : "Reset for "}+<b>${formatWhole(tmp[layer].resetGain)}</b> ${tmp[layer].resource}<br><br>${player[layer].points.lt(30) ? (tmp[layer].baseAmount.gte(tmp[layer].nextAt) && (tmp[layer].canBuyMax !== undefined) && tmp[layer].canBuyMax ? "Next:" : "Req:") : ""} ${formatWhole(tmp[layer].baseAmount)} / ${(tmp[layer].roundUpCost ? formatWhole(tmp[layer].nextAtDisp) : format(tmp[layer].nextAtDisp))} ${tmp[layer].baseResource}
		`
	if (tmp[layer].type == "none")
		return ""

        return "You need prestige button text"
}

function constructNodeStyle(layer){
	let style = []
	if ((tmp[layer].isLayer && layerunlocked(layer)) || (!tmp[layer].isLayer && tmp[layer].canClick))
		style.push({'background-color': tmp[layer].color})
	if (tmp[layer].image !== undefined)
		style.push({'background-image': 'url("' + tmp[layer].image + '")'})
	if(tmp[layer].notify && player[layer].unlocked)
		style.push({'box-shadow': 'var(--hqProperty2a), 0 0 20px ' + tmp[layer].trueGlowColor})
	style.push(tmp[layer].nodeStyle)
    return style
}

function constructUniButtonStyle(layer){
	let style = []
	let uni = 0
	switch (layer) {
		case 'i':
			style.push({
				background: "linear-gradient(315deg, #bababa 0%, #efefef 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#555555"
			});
			if (player.universe == 1) style.push({borderColor: "white"})
			break;
		case 'in':
			style.push({
				background: "linear-gradient(140deg, #10e96b 0%, #0f871c 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#116622"
			});
			if (player.universe == 2) style.push({borderColor: "white"})
			break;
		case 's':
			style.push({
				background: "linear-gradient(140deg, red 0%, black 125%)",
				backgroundOrigin: "border-box",
				borderColor: "#600000"
			});
			if (player.universe == 3) style.push({borderColor: "white"})
			break;
		case 'cp':
			style.push({
				background: "linear-gradient(45deg, #064461 0%, #4a7d94 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#013851"
			});
			if (player.universe == 1.5) style.push({borderColor: "white"})
			break;
		case 'ch':
			style.push({
				background: "linear-gradient(45deg, #8801aa 0%, #0260fe 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#2e0054",
			});
			if (player.universe == -0.5) style.push({borderColor: "white"})
			break;
		case 'du':
			style.push({
				background: "linear-gradient(145deg, #2e2e2e 0%, #0d0d0d 100%)",
				backgroundOrigin: "border-box",
				color: "#ffffff",
				borderColor: "#555555",});
			if (player.universe == -0.1) style.push({borderColor: "#444"})
			break;
		case 'od':
			style.push({
				backgroundImage: "linear-gradient(0deg, #256413, #49AE1E)",
            	backgroundOrigin: "border-box",
            	borderColor: "black",
            	color: "black",
			});
			if (player.universe == 1337) style.push({borderColor: "white"})
			break;
		case 'h':
			style.push({
				backgroundColor: "black",
            	borderColor: "#0061ff",
            	color: "white",
			});
			if (player.universe == -666) style.push({borderColor: "white"})
			break;
		case 'uh':
			style.push({
				background: "linear-gradient(45deg, #f6e000 0%, #f9c901 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#6b4701",
			});
			if (player.universe == 101) style.push({borderColor: "white"});
			break;
		default:
			style.push({'background-color': tmp[layer].color});
	}
	if(tmp[layer].notify && player[layer].unlocked)
		style.push({boxShadow: 'inset 0 0 15px 0 ' + tmp[layer].trueGlowColor})
    return style
}

function challengeStyle(layer, id) {
	if (player[layer].activeChallenge == id && canCompleteChallenge(layer, id)) return "canComplete"
	else if (maxedChallenge(layer, id)) return "done"
    return "incomplete"
}

function challengeButtonText(layer, id) {
    return (player[layer].activeChallenge==(id)?(canCompleteChallenge(layer, id)?"Finish":"Exit Early"):(maxedChallenge(layer, id)?"Completed":"Start"))

}

function achievementStyle(layer, id){
    ach = tmp[layer].achievements[id]
    let style = []
    if (ach.image){
        style.push({'background-image': 'url("' + ach.image + '")'})
    }
    if (!hasAchievement(layer, id)) style.push({'visibility': 'hidden'})
    style.push(ach.style)
    return style
}



function updateWidth() {
	let screenWidth = window.innerWidth
	let splitScreen = screenWidth >= 1024
	if (options.forceOneTab) splitScreen = false
	if (player.navTab == "none") splitScreen = true
	tmp.other.screenWidth = screenWidth
	tmp.other.screenHeight = window.innerHeight

	tmp.other.splitScreen = splitScreen
	tmp.other.lastPoints = player.points
}

function updateOomps(diff)
{
	tmp.other.oompsMag = 0
	if (player.points.lte(new Decimal(1e100)) || diff == 0) return

	var pp = new Decimal(player.points);
	var lp = tmp.other.lastPoints || new Decimal(0);
	if (pp.gt(lp)) {
		if (pp.gte("10^^8")) {
			pp = pp.slog(1e10)
			lp = lp.slog(1e10)
			tmp.other.oomps = pp.sub(lp).div(diff)
			tmp.other.oompsMag = -1;
		} else {
			while (pp.div(lp).log(10).div(diff).gte("100") && tmp.other.oompsMag <= 5 && lp.gt(0)) {
				pp = pp.log(10)
				lp = lp.log(10)
				tmp.other.oomps = pp.sub(lp).div(diff)
				tmp.other.oompsMag++;
			}
		}
	}

}

function constructBarStyle(layer, id) {
	let bar = tmp[layer].bars[id]
	let style = {}
	
	let tempProgress
	if (bar.progress instanceof Decimal)
		tempProgress = (1 -Math.min(Math.max(bar.progress.toNumber(), 0), 1)) * 100
 	else
 		tempProgress = (1 -Math.min(Math.max(bar.progress, 0), 1)) * 100

	style.dims = {'width': bar.width + "px", 'height': bar.height + "px"}
	let dir = bar.direction
	style.fillDims = {'width': (bar.width + 0.5) + "px", 'height': (bar.height + 0.5)  + "px"}

	switch(bar.direction) {
		case UP:
			style.fillDims['clip-path'] = 'inset(' + tempProgress + '% 0% 0% 0%)'
			style.fillDims.width = bar.width + 1 + 'px'
			break;
		case DOWN:
			style.fillDims['clip-path'] = 'inset(0% 0% ' + tempProgress + '% 0%)'
			style.fillDims.width = bar.width + 1 + 'px'

			break;
		case RIGHT:
			style.fillDims['clip-path'] = 'inset(0% ' + tempProgress + '% 0% 0%)'
			break;
		case LEFT:
			style.fillDims['clip-path'] = 'inset(0% 0% 0% ' + tempProgress + '%)'
			break;
		case DEFAULT:
			style.fillDims['clip-path'] = 'inset(0% 50% 0% 0%)'
	}

	if (bar.instant) {
		style.fillDims['transition-duration'] = '0s'
	}
	return style
}

function constructTabFormat(layer, id, family){
	let tabTemp, tabLayer, tabFunc, location, key
	if (id === undefined){
		tabTemp = tmp[layer].tabFormat
		tabLayer = layers[layer].tabFormat
		tabFunc = funcs[layer].tabFormat
		location = tmp[layer]
		key = "tabFormat"
	}
	else if (family === undefined) {
		tabTemp = tmp[layer].tabFormat[id].content
		tabLayer = layers[layer].tabFormat[id].content
		tabFunc = funcs[layer].tabFormat[id].content
		location = tmp[layer].tabFormat[id]
		key = "content"

	}
	else {
		tabTemp = tmp[layer].microtabs[family][id].content
		tabLayer = layers[layer].microtabs[family][id].content
		tabFunc = funcs[layer].microtabs[family][id].content
		location = tmp[layer].microtabs[family][id]
		key = "tabFormat"

	}
	if (isFunction(tabLayer)) {
		return tabLayer.bind(location)()
	}
	updateTempData(tabLayer, tabTemp, tabFunc, {layer, id, family})
	return tabTemp
}

function updateTabFormats() {
	updateTabFormat(player.tab)
	updateTabFormat(player.navTab)
}

function updateTabFormat(layer) {
	if (layers[layer]?.tabFormat === undefined) return

	let tab = player.subtabs[layer]?.mainTabs
	if (isFunction(layers[layer].tabFormat)) {
		Vue.set(temp[layer], 'tabFormat', layers[layer].tabFormat())
	}
	else if (Array.isArray(layers[layer].tabFormat)) {
		Vue.set(temp[layer], 'tabFormat', constructTabFormat(layer))
	}
	else if (isPlainObject(layers[layer].tabFormat)) {
		if (layers[layer].tabFormat[tab].embedLayer === undefined)
		Vue.set(temp[layer].tabFormat[tab], 'content', constructTabFormat(layer, tab))
	}

	// Check for embedded layer
	if (isPlainObject(tmp[layer].tabFormat) && tmp[layer].tabFormat[tab].embedLayer !== undefined) {
		updateTabFormat(tmp[layer].tabFormat[tab].embedLayer)
	}

	// Update microtabs
	for (family in layers[layer].microtabs) {
		tab = player.subtabs[layer][family]

		if (tmp[layer].microtabs[family][tab]) {

			if (tmp[layer].microtabs[family][tab].embedLayer)
				updateTabFormat(tmp[layer].microtabs[family][tab].embedLayer)
			else
				Vue.set(temp[layer].microtabs[family][tab], 'content', constructTabFormat(layer, tab, family))
		}
	}
}
