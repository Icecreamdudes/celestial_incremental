// ************ Themes ************
var themes = ["default", "wood", "coral", "gold", "dark", "midnight"]

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
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#3d3d3d",
		darkButton: "#191919",
		darkButtonHover: "#222",
		darkButtonDisable: "#111",
		darkTitleGradient: "linear-gradient(90deg, #222 0%, #111 50%, #222 100%)",
		darkTabTitle: "#222",
		darkScrollBackground: "#000",
		darkScroll1: "#141414",
		darkScroll2: "#1d1d1d",
		darkScroll3: "#1b1b1b",
		darkScroll4: "#222",
		darkSelected: "#636363",
		darkTextColor: "#ccc",
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
		textColor: "#ccc",

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
		darkTextColor: "#ccc",
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
		textColor: "#ccc",

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
		darkTextColor: "#ccc",
	},
	gold: {
		regBorder: "#775900",
		menuBackground: "#0b0800",
		layerBackground: "#171100",
		miscButton: "#2f2300",
		miscButtonHover: "#473500",
		miscButtonDisable: "#231a00",
		titleGradient: "linear-gradient(90deg, #533e00 0%, #3b2c00 50%, #533e00 100%)",
		tabTitle: "#473500",
		scrollBackground: "#000",
		scroll1: "#2f2300",
		scroll2: "#3b2c00",
		scroll3: "#473500",
		scroll4: "#533e00",
		selected: "#aa7f00",
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#3b2c00",
		darkButton: "#171100",
		darkButtonHover: "#231a00",
		darkButtonDisable: "#110d00",
		darkTitleGradient: "linear-gradient(90deg, #291f00 0%, #1d1600 50%, #291f00 100%)",
		darkTabTitle: "#231a00",
		darkScrollBackground: "#000",
		darkScroll1: "#171100",
		darkScroll2: "#1d1600",
		darkScroll3: "#231a00",
		darkScroll4: "#291f00",
		darkSelected: "#553f00",
		darkTextColor: "#ccc",
	},
	dark: {
		regBorder: "#3d3d3d",
		menuBackground: "#070707",
		layerBackground: "#0b0b0b",
		miscButton: "#191919",
		miscButtonHover: "#222",
		miscButtonDisable: "#111",
		titleGradient: "linear-gradient(90deg, #222 0%, #111 50%, #222 100%)",
		tabTitle: "#222",
		scrollBackground: "#000",
		scroll1: "#141414",
		scroll2: "#181818",
		scroll3: "#1b1b1b",
		scroll4: "#222",
		selected: "#505050",
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#1e1e1e",
		darkButton: "#0c0c0c",
		darkButtonHover: "#111",
		darkButtonDisable: "#080808",
		darkTitleGradient: "linear-gradient(90deg, #111 0%, #080808 50%, #111 100%)",
		darkTabTitle: "#111",
		darkScrollBackground: "#000",
		darkScroll1: "#0a0a0a",
		darkScroll2: "#0c0c0c",
		darkScroll3: "#0d0d0d",
		darkScroll4: "#111",
		darkSelected: "#282828",
		darkTextColor: "#ccc",
	},
	midnight: {
		regBorder: "#252570",
		menuBackground: "#04040b",
		layerBackground: "#070716",
		miscButton: "#0f0f2d",
		miscButtonHover: "#161643",
		miscButtonDisable: "#0b0b22",
		titleGradient: "linear-gradient(90deg, #1e1e5a 0%, #131338 50%, #1e1e5a 100%)",
		tabTitle: "#161643",
		scrollBackground: "#000",
		scroll1: "#0f0f2d",
		scroll2: "#131338",
		scroll3: "#161643",
		scroll4: "#1e1e5a",
		selected: "#3838a9",
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#121238",
		darkButton: "#070716",
		darkButtonHover: "#0b0b21",
		darkButtonDisable: "#050511",
		darkTitleGradient: "linear-gradient(90deg, #050516 0%, #03030e 50%, #050516 100%)",
		darkTabTitle: "#0b0b21",
		darkScrollBackground: "#000",
		darkScroll1: "#070716",
		darkScroll2: "#03030e",
		darkScroll3: "#0b0b21",
		darkScroll4: "#050516",
		darkSelected: "#1d1d2a",
		darkTextColor: "#ccc",
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
		document.body.style.setProperty('--textColor', colors_theme["textColor"]);
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
		document.body.style.setProperty('--textColor', colors_theme["darkTextColor"]);
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
