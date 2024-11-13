﻿let modInfo = {
	name: "Celestial Incremental",
	id: "celestial",
	author: "Icecreamdude",
	pointsName: "celestial points",
	modFiles: ["settingsMicrotab.js", "layers.js", "cutscene.js", "tree.js", "ranks.js", "factors.js", "prestige.js", "trees.js", "grass.js",
	"grasshop.js", "mods.js", "checkback.js", "portal.js", "dice.js", "petShop.js", "evolution.js", "rocketFuel.js", "infinity.js",
	"antimatterDimensions.js", "infinityPoints.js", "galaxy.js", "pests.js", "hex.js", "debuff.js", "tav.js", "tavDomain.js", "breakInfinity.js",
	"lore.js", "otfMastery.js", "infinityDimensions.js", "cante.js", "realmMods.js", "cantepocalypsePuzzle.js", "Cantepocalypse/cantepocalypse.js",
	"Cantepocalypse/altRanks.js", "Cantepocalypse/perks.js", "Cantepocalypse/anonymity.js", "Cantepocalypse/repliTrees.js", "Cantepocalypse/repliGrass.js",
	"Cantepocalypse/grassSkip.js","Cantepocalypse/oil.js", "Singularity/singularity.js", "Gwa Temple/gwaTemple.js", "epicPets.js",],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.2",
	name: "The Pet Update Part II: Epic Pets",
}

let hotkey = `<h1>Hotkeys:</h1><br>
		(They only bring you to the selected universe if you have it unlocked)<br>
		Q - Universe 1.<br>
		W - Universe 2.<br>
		A - Alt-Universe 1.<br>
		`

let credits = `<h1>Credits:</h1><br>
		-Game by Icecreamdude.<br>
		-Music by !Sweet and 150percent.<br>
		-Ideas and Balancing by Nova.<br>
		-Art by Jtoh_Sc.<br>
		-Testing by Nova and Piterpicher.<br>
		-Bug Fixes by Tsanth and Forwaken.<br>
		`

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.2 - Epic Pets!!! :)</h3><br>
		- CONTAINS MAJOR SPOILERS FOR THE ENTIRE GAME. READ WITH CAUTION.<br>
		<br>
		<br>
		<br>
		Content:<br>
			- Added 3 new epic pets!!! (They are hard to get so good luck)<br>
			- Added 2 new pet crates.<br>
			- Added 2 new common pets.<br>
			- Added 2 new uncommon pets.<br>
			- Added 2 new rare pets.<br>
			- Added epic pet fragments.<br>
			- Added a pet shop expansion.<br>
			- New song for check back by 150percent!!!<br><br>
		Bugfixes: I lost track lmao<br><br>
		QoL: I lost track again lmao<br><br>
	<h3>v1.1.2 - Even More Bugfixes</h3><br>
	 	Bugfixes:<br>
   			- Fixed Cante Quiz Questions breaking if the answer is negative.<br>
     		- Fixed Realm Mod images not loading.<br>
       		- Made IP Challenges 1 and 3 reset OTF when entering to prevent being able to bring in unavailable OTFs.<br>
	 		- Fixed IP Challenge 5 resetting OTF whenever the Booster Dice auto-crunches.<br>
   			- Fixed the "You will unlock something" message for Level 1500 only showing up on the XPBoost tab.<br>
     		- Fixed the Evolution tab showing the level 250 evolutions when your current Level was 250 when it should be your highest Level.<br>
       		- Fixed IP Challenges not clearing if the crunch() function isn't ran fast enough.<br>
	 		- Fixed Cante Puzzle 1 upgrades being available when you haven't unlocked Cante Puzzles.<br>
	 		- Fixed incorrect formatting of the last changelog.<br><br>
   		QoL:<br>
			- Added Buy Max buttons above all buyables that were missing them. (Which was most of them.)<br>
     		- Fixed typos.<br>
       		- Specified Celestial Points in the Cante Quiz to prevent confusion.<br>
       		- Added a note to the bottom of IP challenges after you break infinity that it works in all challenges.<br><br>
     	Balancing:<br>
       		- Nerfed Rocket Fuel Button Cooldown Abilities effect from /1.5 -> /1.2.<br>
	 		- Doubled Rocket Fuel Button Cooldown Abilities duration.<br>
   			- Increased the amount of Grasshop Check Back Study II Upgrades you can buy from 20 -> 50.<br>
   			- Decreased the cost scaling of Grasshop Check Back Study II Upgrades to account for the increased cap.<br>
     		- Buffed the Daily XP Reward from the Insane Face evolution. (Decreased base, but now effected by multipliers)<br>
       		- Buffed the chances to gain paragon shards from XPBoosting. (B1 5% -> 10%, B2 20% -> 25%)<br><br>
	<h3>v1.1.1 - Tons of Bugfixes</h3><br>
	 	Bugfixes:<br>
   		- Fixed Big Crunch not working properly.<br>
     		- Added Galaxy Limit to prevent antimatter inflation bug.<br>
       		- Barred entry on challenge 8 after completion due to inflation bug.<br>
	 	- Added a minimum value to the XP rocket fuel effect to prevent exploitation.<br>
     		- Fixed manual Booster Dice not giving challenge points if you own the dice pet evolution.<br>
       		- Fixed hex, rage, and blank mod resets all accidentally resetting the last 4 dice effects.<br>
	 	- Fixed star pet evolution buyable costs not being rounded.<br>
   		- Fixed bug where buying dice pet evolution checked for current dice points instead of highest.<br>
     		- Fixed cutscene 8 also playing cutscene 10.<br>
       		- Fixed challenge 1 not automatically crunching when reaching infinite celestial points.<br><br>
       		QoL:<br>
	 	- Added an alert toggle to the pet shop.<br>
   		- Reworked the leveling system to allow for bulk leveling.<br><br>
   		Balancing:<br>
     		- Nerfed the scaling of Nova's second effect.<br>
       		- Changed the Check Back buyable cost to be based on total XP instead of current level.<br><br>
	<h3>v1.1 - The Pet Update Part 1 - With Bugfixes</h3><br>
		Content:<br>
		- Added 3 new pet evolutions, for spider, clock, and drippy ufo.<br>
		- Added 3 new features to go with the evolutions: advanced halter, shard buttons and moonstone.<br><br>
		Bugfixes:<br>
		- Fixed volume slider not working properly.<br>
		- Multiple NaN bugs.<br>
		- Fixed grass spawning incorrectly on tab switches.<br>
		- Fixed many negative number issues.<br>
		- Fixed bug where pop-ups would stack over each other.<br>
		- Fixed big crunch screen bug.<br>
		- Fixed latin1 character range export bug.<br><br>
		QoL:<br>
		- Fixed typos.<br>
		- Added factor and rank total mult text.<br>
		- Improved pet visuals.<br>
		- Added a "max all" button for antimatter dimensions.<br>
		- Made Tav's Domain a separate layer.<br>
		Balancing:<br>
		- Rocket Fuel no longer resets pent milestones.<br>
		- Buffed grass, rocket fuel, and ranks.<br>
		- Changed some pet evolution requirements.<br>
		- Made some challenges easier.<br><br>
	<h3>v1.0</h3><br>
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
"pentReset", "loadGoldGrass", "unloadGoldGrass", "grasshopReset", "codeExperienceReset", "levelToXP", "xpToLevel", "levelup", "petButton1", "petButton2", "resetPrices", "addDiceEffect", "diceRoll", "evoCutscenes", "rocketFuelReset",
"rocketFuelAbility", "petButton3","bigCrunch", "startCutscene4", "startCutscene5", "dimBoostReset", "startCutscene6", "galaxyReset", "startCutscene7", "startCutscene8", "dailyReward", "dailyRewardPet",
"petButton4", "hexReset", "hexPointReset", "automationTierReset", "startCutscene9", "startCutscene10", "startCutscene11","crunch", "startCutscene12", "startCutscene13", "antidebuffReset", "startCutscene14",
"negativeInfinityReset", "reverseCrunch", "startCutscene15", "startCutscene16", "startCutscene17", "startCutscene18", "breakInfinities", "domainReset", "gainAutomationShard",
"sacrificeCommonPet", "sacrificeAllCommonPet", "sacrificeUncommonPet", "sacrificeAllUncommonPet", "sacrificeRarePet", "sacrificeAllRarePet", "steelieReset", "crystalReset", "replicantiMultiply",
"gainCanteCore", "ragePowerReset", "blankModReset", "replicantiPointMultiply", "repliLeavesMultiply", "loadRepliGrass", "unloadRepliGrass", "grassSkipReset", "oilReset", "convertRememberanceCore",
"startCutsceneDice", "startCutsceneRocketFuel", "startCutsceneHex", "startRealmModCutscene", "loadMoonstone", "unloadMoonstone", "petButton5", "petButton6", "refreshBanner",
"commonPetBanner", "uncommonPetBanner", "rarePetBanner"]

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
