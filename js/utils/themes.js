// ************ Themes ************
var themes = ["default", "bright", "dark", "wood", "gold", "silver", "moss", "coral", "midnight", "teal", "blossom"]

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
	bright: {
		regBorder: "#b7b7b7",
		menuBackground: "#171717",
		layerBackground: "#212121",
		miscButton: "#4d4d4d",
		miscButtonHover: "#666",
		miscButtonDisable: "#333",
		titleGradient: "linear-gradient(90deg, #808080 0%, #5d5d5d 50%, #808080 100%)",
		tabTitle: "#666",
		scrollBackground: "#000",
		scroll1: "#4e4e4e",
		scroll2: "#595959",
		scroll3: "#636363",
		scroll4: "#7e7e7e",
		selected: "#f0f0f0",
		textColor: "#ddd",

		darkLayerBackground: "#000",
		darkBorder: "#5b5b5b",
		darkButton: "#262626",
		darkButtonHover: "#333",
		darkButtonDisable: "#191919",
		darkTitleGradient: "linear-gradient(90deg, #404040 0%, #2e2e2e 50%, #404040 100%)",
		darkTabTitle: "#333",
		darkScrollBackground: "#000",
		darkScroll1: "#272727",
		darkScroll2: "#2c2c2c",
		darkScroll3: "#313131",
		darkScroll4: "#3f3f3f",
		darkSelected: "#787878",
		darkTextColor: "#ddd",
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
	gold: {
		regBorder: "#7f5f20",
		menuBackground: "#0c0903",
		layerBackground: "#191306",
		miscButton: "#32260c",
		miscButtonHover: "#4c3913",
		miscButtonDisable: "#261c09",
		titleGradient: "linear-gradient(90deg, #584216 0%, #3f2f10 50%, #584216 100%)",
		tabTitle: "#4c3913",
		scrollBackground: "#000",
		scroll1: "#32260c",
		scroll2: "#3f2f10",
		scroll3: "#4c3913",
		scroll4: "#584216",
		selected: "#a58f62",
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#3f2f10",
		darkButton: "#191306",
		darkButtonHover: "#261c09",
		darkButtonDisable: "#130e04",
		darkTitleGradient: "linear-gradient(90deg, #2c210b 0%, #1f1708 50%, #2c210b 100%)",
		darkTabTitle: "#261c09",
		darkScrollBackground: "#000",
		darkScroll1: "#191306",
		darkScroll2: "#1f1708",
		darkScroll3: "#261c09",
		darkScroll4: "#2c210b",
		darkSelected: "#524731",
		darkTextColor: "#ccc",
	},
	silver: {
		regBorder: "#6a8181",
		menuBackground: "#0a0c0c",
		layerBackground: "#151919",
		miscButton: "#354040",
		miscButtonHover: "#4a5a5a",
		miscButtonDisable: "#1f2626",
		titleGradient: "linear-gradient(90deg, #546767 0%, #3f4d4d 50%, #546767 100%)",
		tabTitle: "#4a5a5a",
		scrollBackground: "#000",
		scroll1: "#354040",
		scroll2: "#3f4d4d",
		scroll3: "#4a5a5a",
		scroll4: "#546767",
		selected: "#a5b3b3",
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#354040",
		darkButton: "#1a2020",
		darkButtonHover: "#252d2d",
		darkButtonDisable: "#0f1313",
		darkTitleGradient: "linear-gradient(90deg, #2a3333 0%, #1f2626 50%, #2a3333 100%)",
		darkTabTitle: "#252d2d",
		darkScrollBackground: "#000",
		darkScroll1: "#1a2020",
		darkScroll2: "#1f2626",
		darkScroll3: "#252d2d",
		darkScroll4: "#2a3333",
		darkSelected: "#525959",
		darkTextColor: "#ccc",
	},
	moss: {
		regBorder: "#567D2D",
		menuBackground: "#080c04",
		layerBackground: "#111909",
		miscButton: "#223212",
		miscButtonHover: "#334b1b",
		miscButtonDisable: "#19250d",
		titleGradient: "linear-gradient(90deg, #3c571f 0%, #2b3e16 50%, #3c571f 100%)",
		tabTitle: "#334b1b",
		scrollBackground: "#000",
		scroll1: "#223212",
		scroll2: "#2b3e16",
		scroll3: "#334b1b",
		scroll4: "#3c571f",
		selected: "#aabe96",
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#2b3e16",
		darkButton: "#111909",
		darkButtonHover: "#19250d",
		darkButtonDisable: "#0c1206",
		darkTitleGradient: "linear-gradient(90deg, #1e2b0f 0%, #151f0b 50%, #1e2b0f 100%)",
		darkTabTitle: "#19250d",
		darkScrollBackground: "#000",
		darkScroll1: "#111909",
		darkScroll2: "#151f0b",
		darkScroll3: "#19250d",
		darkScroll4: "#1e2b0f",
		darkSelected: "#555f4b",
		darkTextColor: "#ccc",
	},
	coral: {
		regBorder: "#7a4848",
		menuBackground: "#0c0707",
		layerBackground: "#180e0e",
		miscButton: "#301c1c",
		miscButtonHover: "#492b2b",
		miscButtonDisable: "#241515",
		titleGradient: "linear-gradient(90deg, #553232 0%, #3d2424 50%, #553232 100%)",
		tabTitle: "#492b2b",
		scrollBackground: "#000",
		scroll1: "#301c1c",
		scroll2: "#3d2424",
		scroll3: "#492b2b",
		scroll4: "#553232",
		selected: "#af9191",
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#3d2424",
		darkButton: "#180e0e",
		darkButtonHover: "#241515",
		darkButtonDisable: "#120a0a",
		darkTitleGradient: "linear-gradient(90deg, #2a1919 0%, #1e1212 50%, #2a1919 100%)",
		darkTabTitle: "#241515",
		darkScrollBackground: "#000",
		darkScroll1: "#180e0e",
		darkScroll2: "#1e1212",
		darkScroll3: "#241515",
		darkScroll4: "#2a1919",
		darkSelected: "#574848",
		darkTextColor: "#ccc",
	},
	midnight: {
		regBorder: "#45457a",
		menuBackground: "#06060c",
		layerBackground: "#0d0d18",
		miscButton: "#1b1b30",
		miscButtonHover: "#292949",
		miscButtonDisable: "#141424",
		titleGradient: "linear-gradient(90deg, #303055 0%, #22223d 50%, #303055 100%)",
		tabTitle: "#292949",
		scrollBackground: "#000",
		scroll1: "#1b1b30",
		scroll2: "#22223d",
		scroll3: "#292949",
		scroll4: "#303055",
		selected: "#a2a2bc",
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#22223d",
		darkButton: "#0d0d18",
		darkButtonHover: "#141424",
		darkButtonDisable: "#0a0a12",
		darkTitleGradient: "linear-gradient(90deg, #18182a 0%, #11111e 50%, #18182a 100%)",
		darkTabTitle: "#141424",
		darkScrollBackground: "#000",
		darkScroll1: "#0d0d18",
		darkScroll2: "#11111e",
		darkScroll3: "#141424",
		darkScroll4: "#18182a",
		darkSelected: "#51515e",
		darkTextColor: "#ccc",
	},
	teal: {
		regBorder: "#467a6d",
		menuBackground: "#060d0b",
		layerBackground: "#0c1714",
		miscButton: "#1b302b",
		miscButtonHover: "#294a42",
		miscButtonDisable: "#142420",
		titleGradient: "linear-gradient(90deg, #2f544b 0%, #223d36 50%, #2f544b 100%)",
		tabTitle: "#294a42",
		scrollBackground: "#000",
		scroll1: "#1b302b",
		scroll2: "#223d36",
		scroll3: "#294a42",
		scroll4: "#2f544b",
		selected: "#a2bdb6",
		textColor: "#ccc",

		darkLayerBackground: "#000",
		darkBorder: "#223d36",
		darkButton: "#0c1714",
		darkButtonHover: "#142420",
		darkButtonDisable: "#0a1210",
		darkTitleGradient: "linear-gradient(90deg, #172924 0%, #111f1b 50%, #172924 100%)",
		darkTabTitle: "#142420",
		darkScrollBackground: "#000",
		darkScroll1: "#0c1714",
		darkScroll2: "#111f1b",
		darkScroll3: "#142420",
		darkScroll4: "#172924",
		darkSelected: "#515e5b",
		darkTextColor: "#ccc",
	},
	blossom: {
		regBorder: "#b8407c",
		menuBackground: "#17060e",
		layerBackground: "#210815",
		miscButton: "#4d1a33",
		miscButtonHover: "#662244",
		miscButtonDisable: "#331122",
		titleGradient: "linear-gradient(90deg, #802b55 0%, #5c1e3d 50%, #802b55 100%)",
		tabTitle: "#662244",
		scrollBackground: "#000",
		scroll1: "#4f1a35",
		scroll2: "#591d3c",
		scroll3: "#632244",
		scroll4: "#7d2a54",
		selected: "#f0bdd7",
		textColor: "#ddd",

		darkLayerBackground: "#000",
		darkBorder: "#5c1e3d",
		darkButton: "#260d19",
		darkButtonHover: "#331122",
		darkButtonDisable: "#1a0911",
		darkTitleGradient: "linear-gradient(90deg, #40152a 0%, #2e0f1e 50%, #40152a 100%)",
		darkTabTitle: "#331122",
		darkScrollBackground: "#000",
		darkScroll1: "#260d19",
		darkScroll2: "#2b0f1e",
		darkScroll3: "#301021",
		darkScroll4: "#40152a",
		darkSelected: "#785f6a",
		darkTextColor: "#ddd",
	}
	/*
		regBorder: "#b86991",
		menuBackground: "#170b11",
		layerBackground: "#211119",
		miscButton: "#4d2b3c",
		miscButtonHover: "#66384f",
		miscButtonDisable: "#331d28",
		titleGradient: "linear-gradient(90deg, #804663 0%, #5c3247 50%, #804663 100%)",
		tabTitle: "#66384f",
		scrollBackground: "#000",
		scroll1: "#4f2c3e",
		scroll2: "#593246",
		scroll3: "#63384e",
		scroll4: "#7d4561",
		selected: "#f0cedf",
		textColor: "#ddd",

		darkLayerBackground: "#000",
		darkBorder: "#5c3247",
		darkButton: "#26141d",
		darkButtonHover: "#331d28",
		darkButtonDisable: "#1a0e14",
		darkTitleGradient: "linear-gradient(90deg, #402432 0%, #2e1923 50%, #402432 100%)",
		darkTabTitle: "#331d28",
		darkScrollBackground: "#000",
		darkScroll1: "#26141d",
		darkScroll2: "#2b1822",
		darkScroll3: "#301b26",
		darkScroll4: "#402432",
		darkSelected: "#78676f",
		darkTextColor: "#ddd",
	 */
}
function changeTheme() {
	colors_theme = colors[options.theme || "default"];
	if (!player.sma.inStarmetalChallenge && !options.themeDarken) {
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
