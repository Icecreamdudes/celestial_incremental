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
			uni = 1;
			break;
		case 'in':
			style.push({
				background: "linear-gradient(140deg, #10e96b 0%, #0f871c 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#119B35"
			});
			uni = 2;
			break;
		case 's':
			style.push({
				background: "linear-gradient(140deg, red 0%, black 125%)",
				backgroundOrigin: "border-box",
				borderColor: "#800000"
			});
			uni = 3;
			break;
		case 'cp':
			style.push({
				background: "linear-gradient(45deg, #064461 0%, #4a7d94 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#013851"
			});
			uni = 1.5;
			break;
		case 'ch':
			style.push({
				background: "linear-gradient(45deg, #8801aa 0%, #0260fe 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#2e0054",
			});
			uni = -0.5;
			break;
		case 'du':
			style.push({
				background: "linear-gradient(145deg, #2e2e2e 0%, #0d0d0d 100%)",
				backgroundOrigin: "border-box",
				color: "#ffffff",
				borderColor: "#555555",});
			uni = -0.1;
			break;
		case 'od':
			style.push({
				backgroundImage: "linear-gradient(0deg, #256413, #49AE1E)",
            	backgroundOrigin: "border-box",
            	borderColor: "black",
            	color: "black",
			});
			uni = 1337;
			break;
		//case 'uh':
		//	style.push({
		//	background: "linear-gradient(45deg, #f6e000 0%, #f9c901 100%)",
		//	backgroundOrigin: "border-box",
		//	borderColor: "#6b4701"});
		//	uni = 101;
		//	break;
		case 'otherfeat':
			style.push({
				background: "linear-gradient(45deg, #8a00a9, #0061ff)",
				backgroundOrigin: "border-box",
				borderColor: "purple"
			});
			if (player.tab == layer) {
				style.push({"outline": "2px solid rgb(255,255,255,0.75)"})
			};
			break;
		case 'halter':
			style.push({
				color: "white",
				backgroundColor: "black",
				borderColor: "purple"
			});
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
				color: "white",
				backgroundColor: "black",
				borderColor: "#0061ff"
			});
			break;
		case 'pe':
			style.push({
				background: "linear-gradient(0deg, #770022 0%, #8D71B4 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#770022"
			});
			break;
		case 'rf':
			style.push({
				background: "linear-gradient(to right, hsl(210, 60%, 40%), hsl(210, 40%, 60%))",
				backgroundOrigin: "border-box",
				borderColor: "#119B35"
			});
			break;
		case 'de':
			style.push({
				background: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#3A2558"
			});
			break;
		case 'd':
			style.push({
				background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#0061ff"
			});
			break;
		case 'rm':
			style.push({
				backgroundImage: "linear-gradient(180deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)",
				backgroundOrigin: "border-box",
				color: "white",
				borderColor: "#0061ff"
			});
			break;
		case 'ad':
			style.push({
				background: "linear-gradient(140deg, rgba(0,255,202,1) 0%, rgba(30,181,22,1) 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#119B35"
			});
			break;
		case 'ip':
			style.push({
				background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#7c5423"
			});
			break;
		case 'id':
			style.push({
				background: "linear-gradient(315deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#b87400"
			});
			break;
		case 'tad':
			style.push({
				background: "linear-gradient(150deg, #b2d8d8, 50%, #094242 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#b2d8d8",
				color: "#b2d8d8"
			});
			break;
		case 'ta':
			style.push({
				background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#31aeb0",
				color: "#008080"
			});
			break;
		case 'bi':
			style.push({
				background: "linear-gradient(150deg, #889110, 0%, #73A112 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#2B7F0A"
			});
			break;
		case 'om':
			style.push({
				background: "linear-gradient(45deg, #8a00a9, #0061ff)",
				backgroundOrigin: "border-box",
				borderColor: "purple"
			});
			break;
		case 'ca':
			style.push({
				background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#0f354c"
			});
			break;
		case 're':
			style.push({
				background: "linear-gradient(180deg, #AA33AA, #5533AA, #3333AA, #336699, #33AAA5, #33AA77, #55AA55, #A1AA55, #AA8855, #AA3333)",
				backgroundOrigin: "border-box",
				borderColor: "white"
			});
			break;
		case 'fa':
			style.push({
				background: "gray",
				backgroundOrigin: "border-box",
				borderColor: "white"
			});
			break;
		case 'coa':
			style.push({
				background: "linear-gradient(-120deg, #6b1919 0%, #000000 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#260300",
				color: "#8c3129",
			});
			break;
		case 'cop':
			style.push({
				background: "linear-gradient(120deg, #6b1919 0%, #000000 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#260300",
				color: "#8c3129",
			});
			break;
	    case 'ra':
			style.push({
            	background: "linear-gradient(120deg, #0e8a22 0%, #45ff17 100%)",
            	backgroundOrigin: "border-box",
            	borderColor: "#260454",
            	color: "#260454",
			});
			break;
		case 'sd':
			style.push({
            	background: "linear-gradient(120deg, #782424 0%, #8c1111 100%)",
            	backgroundOrigin: "border-box",
            	borderColor: "#3d1616",
            	color: "#3d1616",
			});
			break;
		case 'fu':
			style.push({
            	background: "linear-gradient(45deg, #fcff04 0%, #befa32 100%)",
            	backgroundOrigin: "border-box",
            	borderColor: "#5e8503",
			});
			break;
		case 'cs':
			style.push({
            	background: "linear-gradient(120deg, #4f4b45 0%, #2b2522 100%)",
            	backgroundOrigin: "border-box",
            	borderColor: "#ababab",
            	color: "#ababab",
			});
			break;
		case 'sma':
			style.push({
            	background: "linear-gradient(120deg, #e6eb57 0%, #bf9a32 25%,#eb6077 50%, #d460eb, 75%,  #60cfeb 100%)",
            	backgroundOrigin: "border-box",
            	borderColor: "#282363",
            	color: "#282363",
			});
			break;
		case 'dut':
			style.push({
            	background: "linear-gradient(120deg, #1a0230 0%, #3f0773 25%,#571594 50%, #3f0773, 75%,  #1a0230 100%)",
            	backgroundOrigin: "border-box",
            	borderColor: "#4f0694",
            	color: "white",
			});
			break;
		case 'le':
			style.push({
			    background: "linear-gradient(15deg, #4cc1c7 0%, #2a79ad 50%, #1a2f78 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#8ca3ff",
				color: "#f5f7ff",
			});
			break;
		case 'dr':
			style.push({
				background: "linear-gradient(15deg, #175f69 0%, #0d385e 50%, #041440 100%)",
            	backgroundOrigin: "border-box",
            	borderColor: "#1ba2b5",
            	color: "#eaf6f7",
			});
			break;
		case 'dp':
			style.push({
				background: "linear-gradient(15deg, #181c4f 0%, #1607ba 50%, #530fdb 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#215dcf",
				color: "#eaf6f7",
			});
			break;
		case 'dg':
			style.push({
				background: "linear-gradient(120deg, #a8dca4 0%, #53bd96 50%, #147363 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#0a593c",
				color: "#eaf6f7",
			});
			break;
		case 'dgr':
			style.push({
				background: "linear-gradient(15deg, #147363 0%,rgb(29, 72, 83) 50%,rgb(30, 75, 100) 100%)",
				backgroundOrigin: "border-box",
				borderColor: "#008556",
				color: "#eaf6f7",
			});
			break;
		case 'dn':
			style.push({
				background: "linear-gradient(150deg,rgb(122, 177, 14) 0%,rgba(193, 223, 0) 50%,rgb(116, 141, 3) 100%)",
            	backgroundOrigin: "border-box",
            	borderColor: "rgb(128, 255, 111)",
            	color: "#eaf6f7",
			});
			break;
		case 'ma':
			style.push({
				background: "linear-gradient(120deg,rgb(138, 14, 121) 0%,rgb(168, 12, 51) 100%)",
            	backgroundOrigin: "border-box",
            	borderColor: "rgb(53, 8, 19)",
            	color: "rgb(0, 0, 0)",
			});
			break;
		case 'gem':
			style.push({
				borderColor: "#780af3",
            	backgroundImage: "linear-gradient(0deg, #ab66f9, #c18dfa)",
            	backgroundOrigin: "border-box"
			});
			break;
		case 'ro':
			style.push({
				background: "linear-gradient(50deg,rgb(34, 34, 34) 0%,rgb(29, 23, 56) 50%,rgb(30, 13, 97) 100%)",
				"background-origin": "border-box",
				"border-color": "#44008b",
				"color": "#2672e3",
			});
			break;
		//case 'bb':
		//	style.push({
		//		backgroundColor: "#6d3200",
		//		borderColor: "#361900",
		//		color: "#d3c1b2"});
		//	break;
		//case 'wa':
		//	style.push({
		//		backgroundColor: "#f3e3c2",
		//		borderColor: "#997F4C"});
		//	break;
		//case 'hc':
		//	style.push({
		//		background: "linear-gradient(45deg, #e5ac3f 0%, #eec33d 100%)",
		//		backgroundOrigin: "border-box",
		//		borderColor: "#312f17"});
		//	break;
		//case 'al':
		//	style.push({
		//	background: "linear-gradient(45deg, #3f003f 0%, #a900a9 100%)",
		//	backgroundOrigin: "border-box",
		//	borderColor: "#3f003f",
		//	color: "#d8ccd8"});
		//	break;
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
			backgroundOrigin: "border-box",
			borderColor: "#655421",
			color: "#655421"});
			break;
		case 'ev1':
			style.push({
			background: "linear-gradient(140deg, #b00000 0%, #bda500 50%, #b00000 100%)",
			backgroundOrigin: "border-box",
			borderColor: "#750000"});
			break;
		case 'ev2':
			style.push({
			background: "#106ccc",
			backgroundOrigin: "border-box",
			borderColor: "black"});
			break;
		case 'ev4':
			style.push({
			background: "linear-gradient(-90deg, #f38004, #fc3404)",
			backgroundOrigin: "border-box",
			borderColor: "#DC2D03"});
			break;
		case 'ev8':
			style.push({
			background: "linear-gradient(90deg, #d487fd, #4b79ff)",
			backgroundOrigin: "border-box",
			borderColor: "#1500bf",
			color: "#1500bf"});
			break;
		case 'ev9':
			style.push({
			background: "linear-gradient(90deg, #e75753, #e1843c, #fff463, #90f32d, #5cd4a6)",
			backgroundOrigin: "border-box",
			borderColor: "black",
			color: "black"});
			break;
		case 'ev10':
			style.push({
			background: "linear-gradient(120deg, #121212, #1c1c1c)",
			backgroundOrigin: "border-box",
			borderColor: "black",
			color: "black"});
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
		case 'ep3':
			style.push({"background-color": "#910a27"});
			break;
		case 'ep4':
			style.push({"background-color": "#710a91"});
			break;
		case 'ep5':
			style.push({"background-color": "#065c19"});
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
	else if (maxedChallenge(layer, id)) return "done"
    return "locked"
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
