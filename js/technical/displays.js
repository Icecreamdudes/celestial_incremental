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
			"background-origin": "border-box",
			"border-color": "#555555"});
			uni = 1;
			break;
		case 'in':
			style.push({
			background: "linear-gradient(140deg, #10e96b 0%, #0f871c 100%)",
			"background-origin": "border-box",
			"border-color": "#119B35"});
			uni = 2;
			break;
		case 's':
			style.push({
			background: "linear-gradient(140deg, red 0%, black 125%)",
			"background-origin": "border-box",
			"border-color": "#800000"});
			uni = 3;
			break;
		case 'cp':
			style.push({
			background: "linear-gradient(45deg, #064461 0%, #4a7d94 100%)",
			"background-origin": "border-box",
			"border-color": "#013851"});
			uni = 1.5;
			break;
		case 'otherfeat':
			style.push({
			background: "linear-gradient(45deg, #8a00a9, #0061ff)",
			"background-origin": "border-box",
			"border-color": "purple"});
			if (player.tab == layer) {
				style.push({"outline": "2px solid rgb(255,255,255,0.75)"})
			};
			break;
		case 'halter':
			style.push({
			background: "linear-gradient(45deg, #8a00a9, #0061ff)",
			"background-origin": "border-box",
			"border-color": "purple"});
			if (player.tab == layer) {
				style.push({"outline": "2px solid rgb(255,255,255,0.75)"})
			};
			break;
		case 'cb':
			style.push({'background-color': tmp[layer].color});
			uni = 0.5;
			break;
		default:
			style.push({'background-color': tmp[layer].color});
	}
	if (player.universe == uni) {
		style.push({"outline": "2px solid rgb(255,255,255,0.75)"})
	}
	if(tmp[layer].notify && player[layer].unlocked)
		style.push({'box-shadow': 'var(--hqProperty2a), 0 0 20px ' + tmp[layer].trueGlowColor})
    return style
}

function constructMenuButtonStyle(layer){
	let style = []
	switch (layer) {
		case 'h':
			style.push({
			"color": "white",
			"background-color": "black",
			"border-color": "#0061ff"});
			break;
		case 'pe':
			style.push({
			background: "linear-gradient(0deg, #770022 0%, #8D71B4 100%)",
			"background-origin": "border-box",
			"border-color": "#770022"});
			break;
		case 'rf':
			style.push({
			background: "linear-gradient(to right, hsl(210, 60%, 40%), hsl(210, 40%, 60%))",
			"background-origin": "border-box",
			"border-color": "#119B35"});
			break;
		case 'de':
			style.push({
			background: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)",
			"background-origin": "border-box",
			"border-color": "#3A2558"});
			break;
		case 'ad':
			style.push({
			background: "linear-gradient(140deg, rgba(0,255,202,1) 0%, rgba(30,181,22,1) 100%)",
			"background-origin": "border-box",
			"border-color": "#119B35"});
			break;
		case 'ip':
			style.push({
			background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)",
			"background-origin": "border-box",
			"border-color": "#7c5423"});
			break;
		case 'id':
			style.push({
			background: "linear-gradient(315deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)",
			"background-origin": "border-box",
			"border-color": "#b87400"});
			break;
		case 'tad':
			style.push({
			background: "linear-gradient(150deg, #b2d8d8, 50%, #094242 100%)",
			"background-origin": "border-box",
			"border-color": "#b2d8d8",
			"color": "#b2d8d8"});
			break;
		case 'ta':
			style.push({
			background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)",
			"background-origin": "border-box",
			"border-color": "#31aeb0",
			"color": "#008080"});
			break;
		case 'bi':
			style.push({
			background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)",
			"background-origin": "border-box",
			"border-color": "#2B7F0A"});
			break;
		case 'om':
			style.push({
			background: "linear-gradient(45deg, #8a00a9, #0061ff)",
			"background-origin": "border-box",
			"border-color": "purple"});
			break;
		case 'ca':
			style.push({
			background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
			"background-origin": "border-box",
			"border-color": "#0f354c"});
			break;
		default:
			style.push({'background-color': tmp[layer].color});
	}
	if (player.tab == layer) {
		if (layer != "r" && layer != "tad") {
			style.push({"outline": "2px solid rgb(255,255,255,0.75)"})
		} else {
			style.push({"outline": "2px solid rgb(255,255,255,1)"})
		}
	}
	if(tmp[layer].notify && player[layer].unlocked)
		style.push({'box-shadow': 'var(--hqProperty2a), 0 0 20px ' + tmp[layer].trueGlowColor})
    return style
}

function constructCbButtonStyle(layer) {
	let style = []
	switch (layer) {
		case 'ps':
			style.push({"background-color": "#4e7cff"});
			break;
		case 'ev0':
			style.push({
			background: "linear-gradient(90deg, #e7c97c, #fad25a)",
			"background-origin": "border-box",
			"border-color": "#655421",
			"color": "#655421"});
			break;
		case 'ev1':
			style.push({
			background: "linear-gradient(140deg, #b00000 0%, #bda500 50%, #b00000 100%)",
			"background-origin": "border-box",
			"border-color": "#750000"});
			break;
		case 'ev2':
			style.push({
			background: "#106ccc",
			"background-origin": "border-box",
			"border-color": "black"});
			break;
		case 'ev4':
			style.push({
			background: "linear-gradient(-90deg, #f38004, #fc3404)",
			"background-origin": "border-box",
			"border-color": "#DC2D03"});
			break;
		case 'ev8':
			style.push({
			background: "linear-gradient(90deg, #d487fd, #4b79ff)",
			"background-origin": "border-box",
			"border-color": "#1500bf",
			"color": "#1500bf"});
			break;
		case 'ep0':
			style.push({"background-color": "#9176af"});
			break;
		case 'ep1':
			style.push({"background-color": "#689b3a"});
			break;
		case 'ep2':
			style.push({"background-color": "#b9966d"});
			break;
		default:
			style.push({'background-color': tmp[layer].color});
	}
	if (player.tab == layer) {
		style.push({"outline": "2px solid rgb(255,255,255,1)"})
	}
	if(tmp[layer].notify && player[layer].unlocked)
		style.push({'box-shadow': 'var(--hqProperty2a), 0 0 20px ' + tmp[layer].trueGlowColor})
    return style
}

function challengeStyle(layer, id) {
	if (player[layer].activeChallenge == id && canCompleteChallenge(layer, id)) return "canComplete"
	else if (hasChallenge(layer, id)) return "done"
    return "locked"
}

function challengeButtonText(layer, id) {
    return (player[layer].activeChallenge==(id)?(canCompleteChallenge(layer, id)?"Finish":"Exit Early"):(hasChallenge(layer, id)?"Completed":"Start"))

}

function achievementStyle(layer, id){
    ach = tmp[layer].achievements[id]
    let style = []
    if (ach.image){
        style.push({'background-image': 'url("' + ach.image + '")'})
    }
    if (!ach.unlocked) style.push({'visibility': 'hidden'})
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
	if (bar.progress instanceof Decimal)
		bar.progress = bar.progress.toNumber()
	bar.progress = (1 -Math.min(Math.max(bar.progress, 0), 1)) * 100

	style.dims = {'width': bar.width + "px", 'height': bar.height + "px"}
	let dir = bar.direction
	style.fillDims = {'width': (bar.width + 0.5) + "px", 'height': (bar.height + 0.5)  + "px"}

	switch(bar.direction) {
		case UP:
			style.fillDims['clip-path'] = 'inset(' + bar.progress + '% 0% 0% 0%)'
			style.fillDims.width = bar.width + 1 + 'px'
			break;
		case DOWN:
			style.fillDims['clip-path'] = 'inset(0% 0% ' + bar.progress + '% 0%)'
			style.fillDims.width = bar.width + 1 + 'px'

			break;
		case RIGHT:
			style.fillDims['clip-path'] = 'inset(0% ' + bar.progress + '% 0% 0%)'
			break;
		case LEFT:
			style.fillDims['clip-path'] = 'inset(0% 0% 0% ' + bar.progress + '%)'
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
