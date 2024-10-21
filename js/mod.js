let modInfo = {
	name: "Celestial Incremental",
	id: "celestial",
	author: "Icecreamdude",
	pointsName: "celestial points",
	modFiles: ["settingsMicrotab.js", "layers.js", "cutscene.js", "tree.js", "ranks.js", "factors.js", "prestige.js", "trees.js", "grass.js", 
	"grasshop.js", "mods.js", "checkback.js", "portal.js", "dice.js", "petShop.js", "evolution.js", "rocketFuel.js", "infinity.js", 
	"antimatterDimensions.js", "infinityPoints.js", "galaxy.js", "pests.js", "hex.js", "debuff.js", "tav.js", "tavDomain.js", "breakInfinity.js",
	"lore.js", "otfMastery.js", "infinityDimensions.js", "cante.js", "realmMods.js", "cantepocalypsePuzzle.js", "Cantepocalypse/cantepocalypse.js",
	"Cantepocalypse/altRanks.js", "Cantepocalypse/perks.js", "Cantepocalypse/anonymity.js", "Cantepocalypse/repliTrees.js", "Cantepocalypse/repliGrass.js",
	"Cantepocalypse/grassSkip.js","Cantepocalypse/oil.js", "Singularity/singularity.js", "Gwa Temple/gwaTemple.js",],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let hotkey = `<h1>Hotkeys:</h1><br>
		(They only bring you to the selected universe if you have it unlocked)<br>
		Q - Universe 1.<br>
		W - Universe 2.<br>
		A - Alt-Universe 1.<br>
		`

let credits = `<h1>Credits:</h1><br>
		-Game by Icecreamdude.<br>
		-Music by !Sweet.<br>
		-Ideas and Balancing by Nova.<br>
		-Art by Jtoh_Sc.<br>
		-Testing by Nova and Piterpicher.<br>
		-Bug Fixes by Tsanth.<br>
		`

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0</h3><br>
		- CONTAINS MAJOR SPOILERS FOR THE ENTIRE GAME. READ WITH CAUTION.<br>
		<br>
		<br>
		<br>
		- Added Universe 1, Universe 2, and Alternate Universe 1.<br>
		- Added Ranks, Tiers, Tetrs, Pents, Factors, Prestige, Trees, Grass, Grasshop, and Code Experience.<br>
		- Added Check Back.<br>
		- Added Pets.<br>
		- Added Dice, Rocket Fuel, Hex and Realm Mods.<br>
		- Added Infinity Points, Antimatter Dimensions, Break Infinity, and OTF Mastery.<br>
		- Added Steel, Crystals, Time Reversal, and Rage Power.<br>
		- Added Alternate Ranks, Perks, Anonymity, Repli-Trees, Repli-Grass, Grass-Skip, and Oil.<br>
		- Added 2 Celestials: Tav and Cante.<br>
		- Added cutscenes.<br>
		- Removed Herobrine.
		`

let winText = `Congratulations! You have completed the entirety of Celestial Incremental for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "startCutscene1","startCutscene2", "startCutscene3", "rankReset", "tierReset", "tetrReset", "prestigeReset", "loadGrass", "unloadGrass", 
"pentReset", "loadGoldGrass", "unloadGoldGrass", "grasshopReset", "codeExperienceReset", "levelup", "petButton1", "petButton2", "resetPrices", "addDiceEffect", "diceRoll", "evoCutscenes", "rocketFuelReset",
"rocketFuelAbility", "petButton3","bigCrunch", "startCutscene4", "startCutscene5", "dimBoostReset", "startCutscene6", "galaxyReset", "startCutscene7", "startCutscene8", "dailyReward", "dailyRewardPet",
"petButton4", "hexReset", "hexPointReset", "automationTierReset", "startCutscene9", "startCutscene10", "startCutscene11","crunch", "startCutscene12", "startCutscene13", "antidebuffReset", "startCutscene14", 
"negativeInfinityReset", "reverseCrunch", "startCutscene15", "startCutscene16", "startCutscene17", "startCutscene18", "breakInfinities", "domainReset", "gainAutomationShard",
"sacrificeCommonPet", "sacrificeAllCommonPet", "sacrificeUncommonPet", "sacrificeAllUncommonPet", "sacrificeRarePet", "sacrificeAllRarePet", "steelieReset", "crystalReset", "replicantiMultiply",
"gainCanteCore", "ragePowerReset", "blankModReset", "replicantiPointMultiply", "repliLeavesMultiply", "loadRepliGrass", "unloadRepliGrass", "grassSkipReset", "oilReset", "convertRememberanceCore",
"startCutsceneDice", "startCutsceneRocketFuel", "startCutsceneHex", "startRealmModCutscene", "loadMoonstone", "unloadMoonstone", ]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return false
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	//bools
	startedGame: false,
	buyMax: false,

	//meta stuff
	gain: new Decimal(0),
	universe: 1,
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

// you know i actually did some work. yea it was copy / pasting dialogue and basically typing words, but now i can say that i worked on celesital incremental as a developer.
