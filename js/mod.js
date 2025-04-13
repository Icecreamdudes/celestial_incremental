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
	"Cantepocalypse/grassSkip.js","Cantepocalypse/oil.js", "Singularity/singularity.js", "Gwa Temple/gwaTemple.js", "epicPets.js", "menulayers.js", "pollinator.js", "Singularity/coreProcessor.js",
	"Singularity/coreAssembler.js", "realmEssence.js", "factory.js", "Singularity/radiation.js", "Singularity/singularityDimensions.js", "Cantepocalypse/funify.js", "Singularity/coreScraps.js",
	"Hall of Celestials/celestialHall.js", "Singularity/starmetalAlloy.js", "DarkU1/darkU1.js","DarkU1/lightExtractor.js","DarkU1/darkRanks.js","DarkU1/darkPrestige.js",
	"DarkU1/generators.js","DarkU1/darkGrass.js","DarkU1/normality.js","Singularity/matos.js", "legendaryPets.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.3",
	name: "The Layout Update - with QoL",
}

let hotkey = `<h1>Hotkeys:</h1><br>
		(They only bring you to the selected universe if you have it unlocked)<br>
		Q - Universe 1.<br>
		W - Universe 2.<br>
		A - Alt-Universe 1.<br>
		E - Universe 3.<br>
		`

let credits = `<h1>Credits:</h1><br>
		-Game by Icecreamdude.<br>
		-Music by !Sweet and 150percent.<br>
		-Ideas and Balancing by Nova.<br>
		-Art by Jtoh_Sc.<br>
		-Testing by Nova and Piterpicher.<br>
		-Bug Fixes by Tsanth and Forwaken.<br>
		-Revamped Layout Concept by Seder3214.<br>
		`

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.5 - The Singularity Update Part II: Starmetal and Darkness</h3><br>
			- CONTAINS MAJOR SPOILERS FOR THE ENTIRE GAME. READ WITH CAUTION.<br>
		<br>
		<br>
		<br>
		Content:<br>
		- Added Starmetal Alloy.<br>
		- Added Core Priming, a feature that allows cores to be upgraded.<br>
		- Added Dark Universe 1.<br>
		- Added The Light Extractor.<br>
		- Added Dark Ranks.<br>
		- Added Dark Prestige.<br>
		- Added Dark Generators.<br>
		- Added Dark Grass.<br>
		- Added Normality.<br>
		- Added 15 new punchcards.<br>
		- Added 2 new rare pets.<br>
		- Added 3 new epic pets.<br>
		- Added Legendary Gems.<br>
		- Added a lot of lore.<br>
		Balancing: Balanced some singularity core stuff.<br>
		Bugfixes: Lost track yet again<br>
		QoL: Lost track yet again<br><br>
	<h3>v1.4 - The Singularity Update Part I: Cores</h3><br>
		<br>
		<br>
		<br>
		Content:<br>
		- Added Singularity, the next large prestige layer.<br>
		- Added Singularity Cores. (The Core Assember, and the Core Processor)<br>
		- Added Radiation.<br>
		- Added Singularity Dimensions.<br>
		- Added Core Scraps.<br>
		- Added Realm Essence.<br>
		- Added the Factory.<br>
		- Added a new celestial: Jocus, the Celestial of Fun.<br>
		- Added two new pet evolutions.<br>
		- Added pet crate automation.<br>
		- Added a buncha new lore. (check out the lore tabs)<br>
		- Added some new music.<br>
		- Added ???. (new universe?)<br>
		Balancing: Changes to pet shop prices, XPBoost, and Realm Mods.<br>
		Bugfixes: I lost track again lmao<br>
		QoL: I lost track again lmao<br><br>
	<h3>v1.3 - The Layout Update - with QoL</h3><br>
		Content:<br>
			- Added the Sidebar Layout.<br>
			- Added the Pollinators Layer.<br><br>
		Bugfixes:<br>
			- Fixed Grass Skip not resetting the last anonymity upgrade.<br>
			- Fixed Repli-Trees softcap system not functioning correctly.<br>
			- Fixed Portal bar being very slightly inaccurate.<br>
			- Fixed Dragon buttons not giving the correct shard.<br>
			- Fixed Automation buyables not being autobought correctly.<br><br>
		Typos:<br>
			- Fixed multiple instances of "replicanti points" being incorrectly typed as just "replicanti".<br>
			- Fixed Repli-Grass buyable 1's description accidentally saying it multiplied repli-leaf instead of repli-grass.<br>
			- Fixed Dragon button alerts not showing the correct shard chance.<br>
			- Fixed Alternate Infinity production text not correctly showing on all "Infinities" tabs.<br>
			- Fixed upgrade names in IP Challenge 6 being incorrectly numbered.<br>
			- Fixed Cookie upgrades 1 and 2's effects being mislabeled as "based on dragon points".<br><br>
		QoL:<br>
			- Check Back now runs offline with no offline cap.<br>
			- Automation Shards can trigger once while offline. (Gives use to last buttons)<br>
			- Added a pity system to Check Back shards.<br>
			- Improved the rates of Dice and Drippy Ufo pet.<br>
			- Made Oil a bit brighter to improve contrast.<br>
			- Added import/export file.<br>
			- Added a new infinity milestone that keeps Universe 1 upgrades.<br>
			- Revamped the look of Tav's dimension power tab.<br>
			- Added new option in Tav Autobuy.<br>
			- Added the option to autocrunch based on time.<br>
			- Added Paragon Shards to the pet shop, unlocked at level 3,000.<br>
			- Added buttons to scroll through the epic shops when in tree-layout.<br><br>
		Balancing:<br>
			- Added caps to most uni 1 buyables to prevent lag from automation.<br><br>
		Refactoring:<br>
			- Antimatter Dimensions code refactored to fix uncountable bugs.<br>
			- Infinity Dimensions code refactored to fix uncountable bugs.<br>
			- Grass code refactored to improve framerate. (Thanks Tsanth)<br><br>
		???:<br>
			- Continued work on the buyable code rework, layers improved this patch are hex, grass, AD, and ID.<br>
			- As I said last patch, this also means the buy max buttons on those layers are subtab specific now.<br><br>
	<h3>v1.2.1 - Softcaps and Inflation Squashing</h3><br>
		Bugfixes:<br>
			- Fixed Oil buy max buttons not loading correctly.<br>
			- Fixed Dice rolling with one less side then intended.<br>
			- Fixed tooltip on the first XP Boost button.<br>
			- Fixed many visual bugs with Grass Upgrade 11.<br>
			- Hopefully fixed the challenge completion bug this time. Maybe.<br>
			- Fixed inflation bug caused by TAV debuff upgrade 1 working outside of the challenge.<br>
			- Added check to revert any inflation from a previously fixed TAV debuff inflation bug.<br>
			- Fixed method to spam rocket fuel XP button.<br>
			- Fixed Grass Factor unlock text showing even when having all grass factors unlocked.<br>
			- Thanks to buyable code rework, fixed multiple bugs related to grasshopper buyable cap.<br>
			- Fixed Prestige Points on reset text showing at 250,000 points instead of 100,000 points.<br>
			- Fixed Clock Evolution tooltip not showing.<br><br>
		Typos:<br>
			- Fixed OTF Mastery buyable 'Alternate Infinity Mastery Multiplier' having a misspelt effect.<br>
			- Fixed Tav Domain's Stop Conversions button being misspelt as 'Converions'.<br>
			- Fixed Pent Milestone 3 misspelling Currently as 'Currenty'.<br>
			- Fixed Pent Milestone 4 saying that mods are under trees, when they aren't.<br>
			- Fixed Clock Evolution's special feature having misspelt upgrade names.<br>
			- Fixed Drippy Ufo Evolution tooltip misspelling Moonstone as 'moontstone'.<br><br>
		QoL:<br>
			- Booster Dice can no longer roll the current boosted effect.<br>
			- Re-added shop alerts and the alert toggle, because options are nice.<br>
			- You can now gain mastery points with break infinity.<br>
			- Changed Challenge 7's recommendation to prevent confusion.<br><br>
		Balancing:<br>
			- Added slight softcaps to both Check Back Level and Check Back XP Boost when you reach levels 10,000 and 100,000.<br>
			- Reduced the base cost of Dice Buyable 'DP Multiplier' from 6,000 to 2,000.<br>
			- Locked Rocket Fuel OTF behind having your first infinity.<br>
			- Severely decreased Cante challenge upgrade costs.<br><br>
		???:<br>
			- Begun work on buyable code rework, current layers done are: Ranks, Factors, Prestige, Trees, Grasshoppers.<br>
			- Since of this, all buy max buttons on those layers are subtab specific and not controlled by the main variable.<br>
			- There was sadly not enough time to get to all layers, so hopefully more work on this can be done later.<br><br>
	<h3>v1.2 - The Pet Update Part II: Epic Pets!!! :)</h3><br>
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
	<h3>v1.1 - The Pet Update Part I - With Bugfixes</h3><br>
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
"commonPetBanner", "uncommonPetBanner", "rarePetBanner", "generateCoreStrength", "generateCore", "clearCores", "singularityReset", "unprocessCore", "offlineCooldown", "generateRadiationValue",
 "generateRadiationOutput",  "startCutscene19", "startCutscene20", "startCutscene21", "startCutscene22", "startCutscene23", "startCutscene24", "funifyReset", "normalityReset",
 "startCutscene25", "startCutscene26", "startCutscene27", "startCutscene28", "startCutscene29", "scrapCore", "starmetalReset", "starmetalResetAgain", "generatorReset", "generateSelection", "addGrass",
"petButton7", "evoBanner", "paragonBanner", "gemReset"]

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
	musuniverse: 1,
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
	if (player.de.tavPoints.gte(1e120)) {
		player.de.tavPoints = new Decimal(1e104)
		player.de.tavEssence = new Decimal(0)
		player.gh.steel = new Decimal(0)
		player.p.crystals = new Decimal(0)
		callAlert("Oh no, your save file was inflated. Steel, Crystal, and debuff currencies are reset.", "resources/gat.png")
	}
	if (oldVersion == "1.2.1" || oldVersion == "1.2" || oldVersion == "1.1.2" || oldVersion == "1.1.1" || oldVersion == "1.1" || oldVersion == "1.0") {
		if ((player.tab == "cp" || player.tab == "ar" || player.tab == "pr" || player.tab == "an" || player.tab == "rt" || player.tab == "rg" || player.tab == "gs") && !hasUpgrade("cp", 18)) {
			player.cp.cantepocalypseActive = true
		}
		setBuyableAmount("ad", 2, player.ad.dimBoostAmount)
		setBuyableAmount("ad", 3, player.ad.galaxyAmount)
		setBuyableAmount("id", 1, player.id.dimensionUnlockAmount)
		setBuyableAmount("id", 11, player.id.dimensionsPurchased[0])
		setBuyableAmount("id", 12, player.id.dimensionsPurchased[1])
		setBuyableAmount("id", 13, player.id.dimensionsPurchased[2])
		setBuyableAmount("id", 14, player.id.dimensionsPurchased[3])
		setBuyableAmount("id", 15, player.id.dimensionsPurchased[4])
		setBuyableAmount("id", 16, player.id.dimensionsPurchased[5])
		setBuyableAmount("id", 17, player.id.dimensionsPurchased[6])
		setBuyableAmount("id", 18, player.id.dimensionsPurchased[7])
		// Prevent old save factor buyables from being over cap
		for (let i = 1; i < 9; i++) {
			if (getBuyableAmount("f", i).gt(2500)) setBuyableAmount("f", i, 2500)
        }
		for (let i = 11; i < 20; i++) {
			if (getBuyableAmount("f", i).gt(2500)) setBuyableAmount("f", i, 2500)
        }
		for (let i = 21; i < 30; i++) {
            if (getBuyableAmount("f", i).gt(2500)) setBuyableAmount("f", i, 2500)
        }
        for (let i = 31; i < 37; i++) {
            if (getBuyableAmount("f", i).gt(2500)) setBuyableAmount("f", i, 2500)
        }
		for (let i = 41; i < 49; i++) {
			if (getBuyableAmount("f", i).gt(250)) setBuyableAmount("f", i, 250)
        }
		for (let i = 51; i < 59; i++) {
			if (getBuyableAmount("f", i).gt(1000)) setBuyableAmount("f", i, 1000)
        }

		// Prevent old save tree buyables from being over cap
		if (getBuyableAmount("t", 11).gt(5000)) setBuyableAmount("t", 11, 5000)
		if (getBuyableAmount("t", 12).gt(1000)) setBuyableAmount("t", 12, 1000)
		if (getBuyableAmount("t", 13).gt(5000)) setBuyableAmount("t", 13, 5000)
		for (let i = 14; i < 19; i++) {
			if (getBuyableAmount("t", i).gt(1000)) setBuyableAmount("t", i, 1000)
		}

		// Prevent old save grass buyables from being over cap
		if (getBuyableAmount("g", 11).gt(1000)) setBuyableAmount("g", 11, 1000)
		if (getBuyableAmount("g", 12).gt(200)) setBuyableAmount("g", 12, 200)
		if (getBuyableAmount("g", 13).gt(500)) setBuyableAmount("g", 13, 500)
		if (getBuyableAmount("g", 14).gt(1000)) setBuyableAmount("g", 14, 1000)
		if (getBuyableAmount("g", 15).gt(1000)) setBuyableAmount("g", 15, 1000)
		if (getBuyableAmount("g", 16).gt(1000)) setBuyableAmount("g", 16, 1000)
	}
}

// you know i actually did some work. yea it was copy / pasting dialogue and basically typing words, but now i can say that i worked on celesital incremental as a developer.
