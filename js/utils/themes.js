// ************ Themes ************
var themes = ["default", "wood", "coral"]

//var(--points)
var colors = {
	default: {
		regBorder: "#7a7a7a",
		menuBackground: "#0f0f0f",
		layerBackground: "#161616",
		miscButton: "#333",
		miscButtonHover: "#444",
		miscButtonDisable: "#222",
		titleGradient: "linear-gradient(90deg, #555555 0%, #3e3e3e 50%, #555555 100%)",
		tabTitle: "#444",
		scrollBackground: "#000",
		scroll1: "#343434",
		scroll2: "#3B3B3B",
		scroll3: "#424242",
		scroll4: "#545454",
		selected: "#a0a0a0",

		darkLayerBackground: "#000",
		darkBorder: "#3d3d3d",
		darkButton: "#111",
		darkButtonHover: "#222",
		darkButtonDisable: "#000",
		darkTitleGradient: "linear-gradient(90deg, #222 0%, #111 50%, #222 100%)",
		darkTabTitle: "#222",
		darkScrollBackground: "#000",
		darkScroll1: "#1a1a1a",
		darkScroll2: "#1d1d1d",
		darkScroll3: "#212121",
		darkScroll4: "#2a2a2a",
		darkSelected: "#636363",
	},
	wood: {
		regBorder: "#745a46",
		menuBackground: "#080605",
		layerBackground: "#110d0a",
		miscButton: "#32261e",
		miscButtonHover: "#423328",
		miscButtonDisable: "#211a14",
		titleGradient: "linear-gradient(90deg, #534032 0%, #32261e 50%, #534032 100%)",
		tabTitle: "#423328",
		scrollBackground: "#000",
		scroll1: "#32261e",
		scroll2: "#3A2D23",
		scroll3: "#423328",
		scroll4: "#534032",
		selected: "#a27f65",

		darkLayerBackground: "#000",
		darkBorder: "#32261e",
		darkButton: "#19130f",
		darkButtonHover: "#211a14",
		darkButtonDisable: "#000",
		darkTitleGradient: "linear-gradient(90deg, #211a14 0%, #19130f 50%, #211a14 100%)",
		darkTabTitle: "#211a14",
		darkScrollBackground: "#000",
		darkScroll1: "#19130f",
		darkScroll2: "#1d1611",
		darkScroll3: "#211914",
		darkScroll4: "#292019",
		darkSelected: "#624a3b",
	},
	coral: {
		regBorder: "#733939",
		menuBackground: "#0d0606",
		layerBackground: "#1a0d0d",
		miscButton: "#331919",
		miscButtonHover: "#4d2626",
		miscButtonDisable: "#261313",
		titleGradient: "linear-gradient(90deg, #5a2d2d 0%, #402020 50%, #5a2d2d 100%)",
		tabTitle: "#4d2626",
		scrollBackground: "#000",
		scroll1: "#331919",
		scroll2: "#402020",
		scroll3: "#4d2626",
		scroll4: "#5a2d2d",
		selected: "#a65252",

		darkLayerBackground: "#000",
		darkBorder: "#391c1c",
		darkButton: "#190c0c",
		darkButtonHover: "#261313",
		darkButtonDisable: "#000",
		darkTitleGradient: "linear-gradient(90deg, #261313 0%, #201010 50%, #261313 100%)",
		darkTabTitle: "#261313",
		darkScrollBackground: "#000",
		darkScroll1: "#190c0c",
		darkScroll2: "#201010",
		darkScroll3: "#261313",
		darkScroll4: "#2d1616",
		darkSelected: "#6c3535",
	},
}
function changeTheme() {
	colors_theme = colors[options.theme || "default"];
	if (!player.sma.inStarmetalChallenge) {
		document.body.style.setProperty('--regBorder', colors_theme["regBorder"]);
		document.body.style.setProperty('--menuBackground', colors_theme["menuBackground"]);
		document.body.style.setProperty('--layerBackground', colors_theme["layerBackground"]);
		document.body.style.setProperty('--miscButton', colors_theme["miscButton"]);
		document.body.style.setProperty('--miscButtonHover', colors_theme["miscButtonHover"]);
		document.body.style.setProperty('--miscButtonDisable', colors_theme["miscButtonDisable"]);
		document.body.style.setProperty('--titleGradient', colors_theme["titleGradient"]);
		document.body.style.setProperty('--tabTitle', colors_theme["tabTitle"]);
		document.body.style.setProperty('--scrollBackground', colors_theme["scrollBackground"]);
		document.body.style.setProperty('--scroll1', colors_theme["scroll1"]);
		document.body.style.setProperty('--scroll2', colors_theme["scroll2"]);
		document.body.style.setProperty('--scroll3', colors_theme["scroll3"]);
		document.body.style.setProperty('--scroll4', colors_theme["scroll4"]);
		document.body.style.setProperty('--selected', colors_theme["selected"]);
		document.body.style.setProperty('--scrollDecrement', "url(data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23" + colors_theme["regBorder"].slice(1) + "'><polygon points='50,00 0,50 100,50'/></svg>)");
		document.body.style.setProperty('--scrollIncrement', "url(data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23" + colors_theme["regBorder"].slice(1) + "'><polygon points='0,0 100,0 50,50'/></svg>)");
	} else {
		document.body.style.setProperty('--regBorder', colors_theme["darkBorder"]);
		document.body.style.setProperty('--menuBackground', colors_theme["menuBackground"]);
		document.body.style.setProperty('--layerBackground', colors_theme["darkLayerBackground"]);
		document.body.style.setProperty('--miscButton', colors_theme["darkButton"]);
		document.body.style.setProperty('--miscButtonHover', colors_theme["darkButtonHover"]);
		document.body.style.setProperty('--miscButtonDisable', colors_theme["darkButtonDisable"]);
		document.body.style.setProperty('--titleGradient', colors_theme["darkTitleGradient"]);
		document.body.style.setProperty('--tabTitle', colors_theme["darkTabTitle"]);
		document.body.style.setProperty('--scrollBackground', colors_theme["darkScrollBackground"]);
		document.body.style.setProperty('--scroll1', colors_theme["darkScroll1"]);
		document.body.style.setProperty('--scroll2', colors_theme["darkScroll2"]);
		document.body.style.setProperty('--scroll3', colors_theme["darkScroll3"]);
		document.body.style.setProperty('--scroll4', colors_theme["darkScroll4"]);
		document.body.style.setProperty('--selected', colors_theme["darkSelected"]);
		document.body.style.setProperty('--scrollDecrement', "url(data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23" + colors_theme["darkBorder"].slice(1) + "'><polygon points='50,00 0,50 100,50'/></svg>)");
		document.body.style.setProperty('--scrollIncrement', "url(data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23" + colors_theme["darkBorder"].slice(1) + "'><polygon points='0,0 100,0 50,50'/></svg>)");
	}
}
function getThemeName() {
	return options.theme? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
		options.theme = themes[1];
	}
	changeTheme();
	resizeCanvas();
}
