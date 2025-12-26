let modInfo = {
	name: "Celestial Incremental",
	id: "celestial", //PLEASE CHANGE THIS LATER PLEASE


	//CHANGE THIS BACK TO THE ORIGINAL VERSION ^


	author: "Icecreamdude",
	pointsName: "celestial points",
	modFiles: [
		"layers.js", "cutscene.js", "tree.js", "ranks.js", "factors.js",
		"prestige.js", "trees.js", "grass.js", "grasshop.js", "mods.js",
		"checkback.js", "portal.js", "dice.js", "evolution.js", "rocketFuel.js",
		"infinity.js", "antimatterDimensions.js", "infinityPoints.js", "pests.js", "debuff.js",
		"tav.js", "tavDomain.js", "breakInfinity.js", "lore.js", "otfMastery.js",
		"infinityDimensions.js", "cante.js", "cantepocalypsePuzzle.js", "Cantepocalypse/cantepocalypse.js", "Cantepocalypse/altRanks.js",
		"Cantepocalypse/perks.js", "Cantepocalypse/anonymity.js", "Cantepocalypse/repliTrees.js", "Cantepocalypse/repliGrass.js", "Cantepocalypse/grassSkip.js",
		"Cantepocalypse/oil.js", "Singularity/singularity.js", "epicPets.js", "pollinator.js", "factory.js",
		"Singularity/radiation.js", "Singularity/singularityDimensions.js", "Cantepocalypse/funify.js", "Singularity/coreScraps.js", "Hall of Celestials/celestialHall.js",
		"Misc/settings.js", "Misc/savebank.js", "Misc/changelog.js", "Misc/credits.js", "Check Back/pet.js",
		"Singularity/starmetalAlloy.js", "DarkU1/darkU1.js", "DarkU1/lightExtractor.js", "DarkU1/darkRanks.js", "DarkU1/darkPrestige.js",
		"DarkU1/boosters.js", "DarkU1/vaporizer.js", "DarkU1/generators.js", "DarkU1/darkGrass.js", "DarkU1/normality.js",
		"Singularity/matos.js", "Singularity/core.js", "Singularity/matosAttacks.js", "Singularity/matosAttacks.js", "Singularity/coreFragments.js", 
		"Singularity/starmetalEssence.js", "rockets.js", "AltU2/altUni2.js", "AltU2/stars.js", "AltU2/planets.js", "AltU2/exploration.js", "AltU2/iridite.js",
		"Hex/hex.js", "Hex/provenance.js", "Hex/refinement.js", "Hex/blessings.js", "Hex/curses.js",
		"Hex/purity.js", "Hex/power.js", "Hex/realms.js", "Hex/vex.js", "Hex/sacrifice.js",
		"mining.js", "DarkU1/punchcards.js", "cutsceneNew.js", "Check Back/fighting.js", "Check Back/battle.js",
		"Check Back/cookie.js", "AltU2/spaceBuildings.js", "DarkU1/spaceEnergy.js",
		"Interspace/rift.js", "Interspace/cerePoints.js", "Interspace/exoticMatter.js", "Interspace/cere.js",


		"Ordinal/ordinal.js", "Ordinal/markup.js",
	],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: 189, // CHANGED TO NUMBER TO MAKE EASIER IN FUTURE (EX. 150 = v1.5.0)
	name: "Novasent Update I: Iridite",
}

function miscCode() {
	if (player.startedGame == false && player.tab == "i") {
        player.startedGame = true
    }
}

function updateStyles() {
	// ===------   HIDE MENUS   ------=== //
	player.hideMenu = false
	if (player.tab == 'bigc') player.hideMenu = true
	if (player.tab == 'revc') player.hideMenu = true
	if (player.tab == 'c') player.hideMenu = true
	if (player.ma.inBlackHeart) player.hideMenu = true

	// ===------   CHANGE LAYER SIZE   ------=== //
	const LAYERHOLDER = document.getElementById('layerHolder')
	if (LAYERHOLDER) {
		if (!player.startedGame || player.hideMenu) {
			LAYERHOLDER.style.setProperty("top", "0px", "important")
			LAYERHOLDER.style.setProperty("left", "0px", "important")
			LAYERHOLDER.style.setProperty("width", "100%", "important")
			LAYERHOLDER.style.setProperty("min-width", "100%", "important")
			LAYERHOLDER.style.setProperty("height", "100%", "important")
		} else {
			if (window.innerWidth > 1250) {
				LAYERHOLDER.style.setProperty("top", "0px", "important")
				LAYERHOLDER.style.setProperty("left", "400px", "important")
				LAYERHOLDER.style.setProperty("width", "calc(100% - 400px)", "important")
				LAYERHOLDER.style.setProperty("min-width", "calc(100% - 400px)", "important")
				LAYERHOLDER.style.setProperty("height", "100%", "important")
			} else {
				LAYERHOLDER.style.setProperty("top", "calc(7% + 307px)", "important")
				LAYERHOLDER.style.setProperty("left", "0px", "important")
				LAYERHOLDER.style.setProperty("width", "100%", "important")
				LAYERHOLDER.style.setProperty("min-width", "100%", "important")
				LAYERHOLDER.style.setProperty("height", "calc(86% - 313px)", "important")
			}
		}
	}

	// ===------   Universe Bar Horizontal Scrolling   ------=== //
	let scrollContainer = document.querySelector('.uniHolder')
	if (scrollContainer) {
		scrollContainer.addEventListener("wheel", (event) => {
    		scrollContainer.scrollLeft += event.deltaY; 
		}, {passive: true});
	}

	// ===------   LAYER BACKGROUND   ------=== //
	let layerBG = ""
	let layerBonus = ["", ""]

	// Find background color
	switch(player.tab) {
		case "c":
			if (player.c.cutscene1 || player.c.cutscene2 || player.c.cutscene13 || (player.c.currentCutscene == 35 && player.c.cutsceneIndex >= 24)) layerBG = "black"
			if (player.c.currentCutscene == 33 || player.c.currentCutscene == 34 || (player.c.currentCutscene == 35 && player.c.cutsceneIndex < 24)) layerBG = "linear-gradient(-180deg,rgb(114, 8, 4) 0%, rgb(114, 4, 85) 100%)"
			break;
		case "settings": case "savebank": case "changelog": case "credits":
			if (!player.sma.inStarmetalChallenge) layerBG = "linear-gradient(90deg, #57636d, #2e3d49)"
			if (player.sma.inStarmetalChallenge) layerBG = "linear-gradient(90deg, #1b242b, #12181d)"
			break;
		case "po":
			layerBG = "linear-gradient(45deg, #450054, #00307f)"
			break;
		case "t":
			layerBG = "#02172f"
			break;
		case "g":
			layerBG = "#042347"
			break;
		case "gh":
			layerBG = "#073b77"
			break;
		case "hpr": case "m":
			layerBG = "#000919"
			break;
		case "hbl": case "pol":
			layerBG = "#191300"
			break;
		case "hcu":
			layerBG = "#111515"
			break;
		case "hpu":
			layerBG = "#161511"
			break;
		case "hpw": case "pe":
			layerBG = "#200"
			break;
		case "hve":
			layerBG = "#101"
			break;
		case "hrm":
			layerBG = "linear-gradient(90deg, #311100, #313000, #163100, #003105, #003121, #002C31, #001431, #000031, #300031)"
			break;
		case "hsa":
			layerBG = "#aaab88"
			break;
		case "bigc":
			layerBG = "#b87c34"
			break;
		case "in": case "ad": case "ip": case "ta": case "bi":
		case "om": case "id":
			layerBG = "#001f18"
			break;
		case "de":
			layerBG = "#1c1624"
			break;
		case "revc":
			layerBG = "#31aeb0"
			break;
		case "tad":
			layerBG = "#b2d8d8"
			break;
		case "ca":
			layerBG = "#2a3e66"
			if (player.subtabs["ca"]['stuff'] == "Galaxy Dust") layerBG = "#0f1226"
			break;
		case "cap":
			layerBG = "#1f1e33"
			break;
		case "cp": case "ar": case "pr": case "an": case "rt":
		case "rg": case "gs": case "oi": case "fu":
			layerBG = "#204387"
			break;
		case "s": case "co": case "ra": case "sd": case "cs":
		case "cof":
			if (!player.ma.matosDefeated) layerBG = "#260300"
			if (player.ma.matosDefeated) layerBG = "linear-gradient(-180deg, #540818 0%, #3a0202 100%)"
			if (player.tab == "co" && player.ma.matosDefeated) layerBG = "linear-gradient(-180deg,rgb(0, 0, 0) 0%, rgb(15, 15, 15) 100%)"
			break;
		case "sma": case "sme":
			layerBG = "linear-gradient(120deg, #73752b 0%, #5f4d19 25%, #75303b 50%, #6a3075, 75%, #306775 100%)"
			break;
		case "ma": 
			if (!player.ma.inBlackHeart) {
				if (!player.ma.matosDefeated) layerBG = "#260300"
				if (player.ma.matosDefeated) layerBG = "linear-gradient(-180deg, #540818 0%, #3a0202 100%)"
			}
			if (player.ma.inBlackHeart) layerBG = "black"
			if (player.ma.currentDepth.eq(2)) layerBG = "linear-gradient(-180deg, #720455 0%, #250121 100%)"
			if (player.ma.currentDepth.eq(3)) layerBG = "linear-gradient(-180deg, #720804 0%, #720455 100%)"
			break;
		case "du": case "le": case "dr": case "dp": case "dg":
		case "dgr": case "dn": case "db": case "dv": case "ds": case "pu":
			layerBG = "black"
			break;
		case "ch":
			layerBG = "linear-gradient(90deg, #260b36, #0920b5)"
			break;
		case "ro": case "mi":
			layerBG = "radial-gradient(circle, #1d1738, #1e0d61)"
			break;
		case "au2":
			layerBG = "#151230"
			break;
		case "rif":
			layerBG = "#301830"
			break;
		case "cer": case "ats":
			layerBG = "#402030"
			break;
		case "cep":
			if (player.cer.transfiguratorLayersEnabled[0]) layerBG = "#301830";
			else layerBG = "#000000";
			break;
		case "exm":
			if (player.cer.transfiguratorLayersEnabled[1]) layerBG = "#301830";
			else layerBG = "#000000";
			break;
		case "der":
			if (player.cer.transfiguratorLayersEnabled[2]) layerBG = "#301830";
			else layerBG = "#000000";
			break;
		case "uns":
			if (player.cer.transfiguratorLayersEnabled[3]) layerBG = "#301830";
			else layerBG = "#000000";
			break;
		case "cb":
			layerBG = "#021124"
			break;
		case "ba":
			if (player.fi.battleTier.eq(1)) layerBG = "linear-gradient(-90deg, #5c2109ff, #5c0e04ff)"
			if (player.fi.battleTier.eq(2)) layerBG = "linear-gradient(-90deg, #5c090dff, #910050ff)"
			break;
		case "ev0":
			layerBG = "linear-gradient(-45deg, #655421, #fad25a)"
			break;
		case "ev1":
			layerBG = "linear-gradient(140deg, rgba(117,0,0,1) 0%, rgba(126,110,0,1) 20%, rgba(117,0,0,1) 40%, rgba(126,110,0,1) 60%, rgba(117,0,0,1) 80%, rgba(126,110,0,1) 100%)"
			break;
		case "ev2":
			layerBG = "url(resources/gdbg.jpg)"
			break;
		case "ev4":
			layerBG = "linear-gradient(-90deg, #f38004, #fc3404)"
			break;
		case "ev8":
			layerBG = "#252525"
			break;
		case "ep0": case "ep1": case "ep2": case "ep3": case "ep4":
		case "ep5":
			layerBG = "#7d3f98"
			break;
		case "leg":
			layerBG = "#eed200"
			break;
		default:
			layerBG = "#161616"
			break;
	}

	// Set background info
	document.body.style.setProperty('--background', layerBG)

	// FANCY BACKGROUNDS (THAT SUCK TO MAKE)
	if (player.tab === "au2" || player.tab === "ir" || player.tab === "st" || player.tab === "sb" || player.tab === "se" || player.tab === "pl" || ((player.c.currentCutscene == 30 || player.c.currentCutscene == 31 || player.c.currentCutscene == 32) && player.tab == "c")) {
	    // Add the galaxy background if it doesn't already exist
    	if (!document.getElementById("galaxy-background")) {
	        const galaxyBackground = document.createElement("div");
        	galaxyBackground.id = "galaxy-background";
    	    galaxyBackground.style.position = "fixed";
	        galaxyBackground.style.top = "0";
        	galaxyBackground.style.left = "0";
    	    galaxyBackground.style.width = "100%";
	        galaxyBackground.style.height = "100%";
        	galaxyBackground.style.overflow = "hidden";
    	    galaxyBackground.style.zIndex = "-2003"; // Ensure it stays in the background
	        galaxyBackground.style.background = "radial-gradient(circle, #151230, #000000)"; // Galaxy gradient
        	document.body.appendChild(galaxyBackground);

    	    // Add stars
	        for (let i = 0; i < 200; i++) {
            	const star = document.createElement("div");
        	    star.style.position = "absolute";
    	        star.style.width = `${Math.random() * 2 + 1}px`; // Random size between 1px and 3px
	            star.style.height = star.style.width; // Ensure the height matches the width
            	star.style.backgroundColor = "white"; // Plain white color
        	    star.style.borderRadius = "50%"; // Make it circular
    	        star.style.top = `${Math.random() * 100}vh`; // Random vertical position
	            star.style.left = `${Math.random() * 100}vw`; // Random horizontal position
	            galaxyBackground.appendChild(star);
	        }
	    }
	} else {
	    // Remove the galaxy background if the tab is not "au2"
	    const galaxyBackground = document.getElementById("galaxy-background");
	    if (galaxyBackground) {
	        galaxyBackground.remove();
	    }
	}

	if (player.tab == "ma" && player.ma.currentDepth && player.ma.currentDepth.eq && player.ma.currentDepth.eq(3) && (player.subtabs["ma"]["stuff"] == "Fight")) {
	    if (!document.getElementById("embers-background")) {
    	    // Create embers background container
	        const embersBg = document.createElement("div");
        	embersBg.id = "embers-background";
    	    embersBg.style.position = "fixed";
	        embersBg.style.top = "0";
        	embersBg.style.left = "0";
    	    embersBg.style.width = "100vw";
	        embersBg.style.height = "100vh";
        	embersBg.style.pointerEvents = "none";
    	    embersBg.style.zIndex = "-2002";
	        embersBg.style.overflow = "hidden";
        	document.body.appendChild(embersBg);

    	    // Add floating embers throughout the screen
	        for (let i = 0; i < 100; i++) {
            	const ember = document.createElement("div");
        	    ember.className = "ember-float";
    	        ember.style.position = "absolute";
	            ember.style.left = `${Math.random() * 100}vw`;
            	ember.style.top = `${Math.random() * 100}vh`;
        	    const size = Math.random() * 8 + 4;
    	        ember.style.width = `${size}px`;
	            ember.style.height = `${size}px`;
            	ember.style.background = "radial-gradient(circle, #fff7b1 0%, #ffec8b 60%, #ff9800 100%)";
        	    ember.style.borderRadius = "50%";
    	        ember.style.opacity = Math.random() * 0.4 + 0.4;
	            ember.style.filter = "blur(1.5px)";
            	ember.style.pointerEvents = "none";
        	    ember.style.zIndex = "1";
    	        // Animate embers floating in random directions
	            const duration = 6 + Math.random() * 6;
            	const xMove = (Math.random() - 0.5) * 60;
            	const yMove = -60 - Math.random() * 60;
            	ember.animate([
        	        { transform: "translate(0,0)", opacity: ember.style.opacity },
    	            { transform: `translate(${xMove}px, ${yMove}vh)`, opacity: 0.1 }
	            ], {
            	    duration: duration * 1000,
        	        iterations: Infinity,
    	            delay: Math.random() * 4 * 1000
	            });
            	embersBg.appendChild(ember);
        	}
    	}
	} else {
    	// Remove embers background if not in depth 3
    	const embersBg = document.getElementById("embers-background");
    	if (embersBg) embersBg.remove();
	}

	// Solar Eclipse Effect (moving sun/moon)
	if (player.sma.inStarmetalChallenge && player.pet.activeAbilities[0]) {
	    if (!document.getElementById("solar-eclipse-bg")) {
    	    // Create the eclipse overlay
	        const eclipse = document.createElement("div");
        	eclipse.id = "solar-eclipse-bg";
    	    eclipse.style.position = "fixed";
	        eclipse.style.top = "0";
        	eclipse.style.left = "0";
    	    eclipse.style.width = "100vw";
	        eclipse.style.height = "100vh";
        	eclipse.style.zIndex = "-2001";
    	    eclipse.style.pointerEvents = "none";
	        eclipse.style.background = "radial-gradient(circle at 50% 40%, #222 0%, #111 40%, #000 70%, #000c 100%)";
        	eclipse.style.transition = "opacity 1s";
    	    document.body.appendChild(eclipse);

	        // Add the sun/moon eclipse (moving)
        	const sun = document.createElement("div");
    	    sun.id = "eclipse-sun";
	        sun.style.position = "absolute";
        	sun.style.width = "300px";
    	    sun.style.height = "300px";
	        sun.style.borderRadius = "50%";
        	sun.style.background = "radial-gradient(circle, #ffe066 0%, #ffb700 60%, #222 100%)";
    	    sun.style.boxShadow = "0 0 120px 60px #ffe06655";
	        eclipse.appendChild(sun);

        	const moon = document.createElement("div");
    	    moon.id = "eclipse-moon";
	        moon.style.position = "absolute";
    	    moon.style.width = "260px";
        	moon.style.height = "260px";
	        moon.style.borderRadius = "50%";
        	moon.style.background = "#111";
    	    moon.style.boxShadow = "0 0 60px 30px #000a";
	        eclipse.appendChild(moon);

        	// Corona effect
    	    const corona = document.createElement("div");
	        corona.id = "eclipse-corona";
        	corona.style.position = "absolute";
    	    corona.style.width = "400px";
	        corona.style.height = "400px";
        	corona.style.borderRadius = "50%";
    	    corona.style.background = "radial-gradient(circle, #fff2 0%, #fff0 80%)";
	        corona.style.pointerEvents = "none";
        	eclipse.appendChild(corona);
    	}

    	// Animate the sun/moon position in an arc
    	const now = Date.now() / 1000;
	    const angle = (now % 60) / 60 * 2 * Math.PI; // 1 full orbit every 60 seconds
    	const centerX = window.innerWidth / 2;
	    const centerY = window.innerHeight * 0.4;
    	const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;

    	const sunX = centerX + Math.cos(angle) * radius;
    	const sunY = centerY + Math.sin(angle) * radius * 0.5;

    	// Move sun, moon, and corona together
    	["eclipse-sun", "eclipse-moon", "eclipse-corona"].forEach((id, i) => {
	        const el = document.getElementById(id);
        	if (el) {
    	        el.style.left = `${sunX}px`;
	            el.style.top = `${sunY}px`;
            	el.style.transform = "translate(-50%, -50%)";
        	}
    	});
	} else {
    	// Remove the eclipse overlay if not in challenge
	    const eclipse = document.getElementById("solar-eclipse-bg");
    	if (eclipse) eclipse.remove();
	}

	if (player.tab == "mu" || player.tab == "od") {
		if (!document.getElementById("grid-bg")) {
	        const gridBackground = document.createElement("div");
        	gridBackground.id = "grid-bg";
    	    gridBackground.style.position = "fixed";
	        gridBackground.style.top = "0";
        	gridBackground.style.left = "0";
    	    gridBackground.style.width = "100%";
	        gridBackground.style.height = "100%";
        	gridBackground.style.overflow = "hidden";
    	    gridBackground.style.zIndex = "-2006"; // Ensure it stays in the background
	        gridBackground.style.background = "#061900"; // Galaxy gradient
			gridBackground.style.backgroundImage = "linear-gradient(#092600 2px, transparent 2px), linear-gradient(to right, #092600 2px, #061900 2px)";
			gridBackground.style.backgroundSize = "40px 40px";
        	document.body.appendChild(gridBackground);
	    }
	} else {
		const grid = document.getElementById("grid-bg");
    	if (grid) grid.remove();
	}

	// ===------   SIDE BACKGROUND   ------=== //
	let sideBG = ""

	// Find background color
	if (options.menuType == "Tree") {
		switch(player.universe) {
			case "U2": 
				sideBG = "#000f0c"
				break;
			case "UA":
				sideBG = "linear-gradient(180deg, #333, #222)"
				break;
			case "A1":
				sideBG = "#102143"
				break;
			case "U3":
				sideBG = "#130100"
				break;
			case "D1":
				sideBG = "black"
				break;
			case "A2":
				sideBG = "radial-gradient(circle, #151230, #000000)"
				break;
			case "UD":
				sideBG = "linear-gradient(135deg, #402030 0%, #0f001f 100%)"
				break;
			case "CB":
				sideBG = "#010812"
				break;
			default:
				sideBG = "#0b0b0b"
				break;
		}
	}
	if (options.menuType == "Tab") {
		if (window.innerWidth > 1250) {
			sideBG = "linear-gradient(to right, #444 103px, #7a7a7a 103px, #7a7a7a 106px, #161616 106px)"
			if (player.universe == "D1") sideBG = "linear-gradient(to right, #0f011c 103px, #7a7a7a 103px, #7a7a7a 106px, black 106px)"
		} else {
			sideBG = "linear-gradient(to bottom, #444 80px, #7a7a7a 80px, #7a7a7a 83px, #161616 83px)"
			if (player.universe == "D1") sideBG = "linear-gradient(to bottom, #0f011c 80px, #7a7a7a 80px, #7a7a7a 83px, black 83px)"
		}
	}

	// Set background color
	if (document.getElementById('uniBG')) document.getElementById('uniBG').style.setProperty('background', sideBG)

	// ===------   MUSIC   ------=== //
	// Find music value
	switch(player.tab) {
		case "po":
			player.musuniverse = "PO"
			break;
		case "c": case "gt":
			player.musuniverse = "CS"
			break;
		case "h": case "hpr": case "hre": case "hbl": case "hcu":
		case "hpu": case "hpw": case "hrm":
			player.musuniverse = "UA"
			break;
		case "i": case "r": case "f": case "p": case "t":
		case "g": case "pe": case "pol": case "gh": case "rf":
		case "de": case "m": case "d": case "re": case "fa":
			player.musuniverse = "U1"
			break;
		case "in": case "ad": case "ip": case "id": case "tad":
		case "ta": case "bi": case "om": case "ga": case "ca":
		case "ro":
            player.musuniverse = "U2"
			break;
		case "cp": case "ar": case "pr": case "an": case "rt":
		case "rg": case "gs": case "oi": case "fu":
            player.musuniverse = "A1"
			break;
		case "s": case "co": case "ra": case "sd": case "cs":
		case "sma": case "ma": case "cof": case "sme":
            player.musuniverse = "U3"
			break;
		case "du": case "le": case "dr": case "dp": case "dg":
		case "dgr": case "dn": case "ds":
            player.musuniverse = "D1"
			break;
		case "ch":
            player.musuniverse = "CH"
			break;
		case "au2": case "st": case "pl": case "ir": case "se": case "sb":
			player.musuniverse = "A2"
			break;
		case "mi":
			player.musuniverse = "MI"
			break;
		case "cb": case "ev0": case "ev1": case "ev2": case "ev4":
		case "ev8": case "ev10": case "ep0": case "ep1":
		case "ep2": case "ep3": case "ep4": case "ep5":
            player.musuniverse = "CB"
			break;
		case "od": case "mu":
            player.musuniverse = "OD"
			break;
	}

	// Play/Stop Music
	if (options.musicToggle && cutsceneActive == false) {
		switch(player.musuniverse) {
			case "PO":
				playAndLoopAudio("music/portal.mp3", options.musicVolume/10)
				break;
			case "UA":
				playAndLoopAudio("music/hex.mp3", options.musicVolume/10)
				break;
			case "U1":
				if (player.startedGame && player.ip.activeChallenge == null && !inChallenge("tad", 11)) playAndLoopAudio("music/universe1.mp3", options.musicVolume/10)
				if (player.ip.activeChallenge != null || inChallenge("tad", 11)) playAndLoopAudio("music/tav.mp3", options.musicVolume/10)
				break;
			case "U2":
				playAndLoopAudio("music/universe2.mp3", options.musicVolume/10)
				break;
			case "A1":
				playAndLoopAudio("music/alt-uni1.mp3", options.musicVolume/10)
				break;
			case "U3":
				if (player.ma.inBlackHeart == false) {
                	if (!player.ma.matosDefeated) playAndLoopAudio("music/singularity.mp3", options.musicVolume/10);
                	if (player.ma.matosDefeated) playAndLoopAudio("music/singularity2.mp3", options.musicVolume/10);
            	} else {
                	if (!player.ma.fightingCelestialites) {
                    	playAndLoopAudio("music/enteringBlackHeart.mp3", options.musicVolume/10);
            		} else {
                    	if (player.ma.currentDepth.eq(1)) playAndLoopAudio("music/celestialites.mp3", options.musicVolume/10);
                    	if (player.ma.currentDepth.eq(2)) playAndLoopAudio("music/blackHeart.mp3", options.musicVolume/10);
                    	if (player.ma.currentDepth.eq(3) && !player.ma.matosFightActive && player.ma.currentCelestialiteType != 25) playAndLoopAudio("music/matosTheme.mp3", options.musicVolume/10);
                    	if (player.ma.currentDepth.eq(3) && player.ma.matosFightActive && player.ma.currentCelestialiteType == 25) playAndLoopAudio("music/matosFight.mp3", options.musicVolume/10);
                	} //use blackHeart.mp3 for depth 2, matosTheme.mp3 for depth 3
            	}
				break;
			case "D1":
				if (!player.pet.activeAbilities[0]) playAndLoopAudio("music/darkUni1.mp3", options.musicVolume/10)
				if (player.pet.activeAbilities[0]) playAndLoopAudio("music/eclipse.mp3", options.musicVolume/10)
				break;
			case "CH":
				if (player.tab == "ch") playAndLoopAudio("music/hallOfCelestials.mp3", options.musicVolume/10)
				//if (player.tab == "ch" && player.subtabs["ch"]["stuff"] != "???") playAndLoopAudio("music/aniciffoCutscene.mp3", options.musicVolume/10)
				break;
			case "A2":
				if (!player.ir.inBattle) playAndLoopAudio("music/space.mp3", options.musicVolume/10)
				if (player.ir.inBattle && !player.ir.iriditeFightActive) playAndLoopAudio("music/spaceBattle.mp3", options.musicVolume/10)
				if (player.ir.inBattle && player.ir.iriditeFightActive) playAndLoopAudio("music/iridite.mp3", options.musicVolume/10)
				break;
			case "MI":
				playAndLoopAudio("music/mining.mp3", options.musicVolume/10)
				break;
			case "CB":
				if (player.fi.battleTier.eq(0)) playAndLoopAudio("music/checkback.mp3", options.musicVolume/10)
				if (player.fi.battleTier.eq(1)) playAndLoopAudio("music/fighting.mp3", options.musicVolume/10)
				if (player.fi.battleTier.eq(2)) playAndLoopAudio("music/tier2.mp3", options.musicVolume/10)
				break;
			default:
				stopAudio()
				break;
		}
	}
        //cutscene music logic
        if ((cutsceneActive || window.cinematicCutsceneActive) && options.musicToggle)
        {
            //if (cutsceneID == 12345 && cutsceneIndex == 2) playAndLoopAudio("music/space.mp3", options.musicVolume/10); examples
            //if (cutsceneID == 12345 && cutsceneIndex == 3) playAndLoopAudio("music/matosCutscene.mp3", options.musicVolume/10);

            if (cutsceneID == 1) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 9) playAndLoopAudio("music/marcel.mp3", options.musicVolume/10);
            if (cutsceneID == 11) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 14) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 15) playAndLoopAudio("music/cutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 16) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 18) playAndLoopAudio("music/marcel.mp3", options.musicVolume/10);
            if (cutsceneID == 19) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 24) playAndLoopAudio("music/marcel.mp3", options.musicVolume/10);
            if (cutsceneID == 26) playAndLoopAudio("music/cutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 28) playAndLoopAudio("music/tavCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 29) playAndLoopAudio("music/tavCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 30) playAndLoopAudio("music/marcel.mp3", options.musicVolume/10);
            if (cutsceneID == 31) playAndLoopAudio("music/tavCutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 32) playAndLoopAudio("music/tavCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 33) playAndLoopAudio("music/tavCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 37) playAndLoopAudio("music/tavCutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 39) playAndLoopAudio("music/tavDeath.mp3", options.musicVolume/10);
            if (cutsceneID == 41) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 43) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 46) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 47) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 48) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 50) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 52) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 53) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 54) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 55) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 56) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 57) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 58) playAndLoopAudio("music/cutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 59) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 60) playAndLoopAudio("music/canteCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 61) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 62) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 63) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 65) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 66) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 68 && cutsceneIndex < 7) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 68 && cutsceneIndex >= 7) playAndLoopAudio("music/somethingSomething.mp3", options.musicVolume/10);
            if (cutsceneID == 69) playAndLoopAudio("music/somethingSomething.mp3", options.musicVolume/10);
            if (cutsceneID == 70) playAndLoopAudio("music/cutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 71) playAndLoopAudio("music/somethingSomething.mp3", options.musicVolume/10);
            if (cutsceneID == 72) playAndLoopAudio("music/somethingSomething.mp3", options.musicVolume/10);
            if (cutsceneID == 73) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 74) playAndLoopAudio("music/hallOfCelestials.mp3", options.musicVolume/10);
            if (cutsceneID == 75) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 76) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 77) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 78) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 79) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
			//no music for cutsceneID == 80
            if (cutsceneID == 81) playAndLoopAudio("music/matosCutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 82) playAndLoopAudio("music/matosCutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 83) playAndLoopAudio("music/matosCutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 84) playAndLoopAudio("music/matosCutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 85) playAndLoopAudio("music/matosCutscene.mp3", options.musicVolume/10);
			//no music for cutsceneID == 86
            if (cutsceneID == 87) playAndLoopAudio("music/matosCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 88) playAndLoopAudio("music/matosCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 89) playAndLoopAudio("music/matosCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 90) playAndLoopAudio("music/matosCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 91) playAndLoopAudio("music/matosCutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 92) playAndLoopAudio("music/novaCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 93) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
            if (cutsceneID == 94) playAndLoopAudio("music/marcel.mp3", options.musicVolume/10);
            if (cutsceneID == 95) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 96) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 97) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 98) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 99) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 100) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 101) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 102) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 103) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 104) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
			//no music for cutsceneID == 105
            if (cutsceneID == 106) playAndLoopAudio("music/cutsceneBox.mp3", options.musicVolume/10);
            if (cutsceneID == 107) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 108) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            if (cutsceneID == 109) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 110) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 111 && cutsceneIndex < 23) playAndLoopAudio("music/iriditeCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 111 && cutsceneIndex > 23) playAndLoopAudio("music/novaCutscene.mp3", options.musicVolume/10);
            if (cutsceneID == 112) playAndLoopAudio("music/singularityWaltzPiano.mp3", options.musicVolume/10);
        }
        if (window.cinematicCutsceneActive && options.musicToggle)
        {
            if (cinematicCutsceneID == 40) playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
        }
	if (options.musicToggle == false)
	{
		stopAudio();
	}
	
}

let hotkey = `<h1>Hotkeys:</h1><br>
		Alt - Toggle music on/off<br>
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
	<h3>v1.9 - The Novasent Update Part I: Iridite</h3><br>
		Content:<br>
			- Fully rewrote the cutscenes.<br>
			- Added Core Fragments.<br>
			- Added Starmetal Essence.<br>
			- Added Check Back's fighting system.<br>
			- Added Star Exploration.<br>
			- Added Iridite, the Astral Celestial.<br>
			- Added Space Battle.<br>
			- Added 6 ships.<br>
			- Added Iridite's bossfight.<br>
			- Added Space Energy.<br>
			- Added Space Buildings.<br>
			- Added a new legendary pet.<br>
	    QoL:<br>
			- Fully revamped the cutscene system.<br>
		Balancing:<br>
			- A lot of things I don't remember.<br>
		Bugfixes:<br>
			- A lot of things I don't remember<br><br>
	<h3>v1.8.5 - Epic Pet Revamp Part 1</h3><br>
		Content:<br>
			- Cookie pet has been completely revamped.<br>
			- 3 new pet evolutions.<br>
			- Added universe pausing, which is included with halter.<br>
			- Added new late game hex of power mights.<br><br>
		Balancing:<br>
			- Added a new prestige upgrade that slightly buffs factor base.<br>
			- Squared "Basic Multiplier" mod buyable's effect.<br>
			- Reduced infinity milestone requirements.<br>
			- Re-arranged early Tav upgrades to improve progression.<br>
			- Added a +1 NIP buff to Tav's 2nd upgrade to speed up early Tav.<br>
			- Buffed base blessing gain formula.<br>
			- Made some hex of power mights cheaper.<br>
			- Moved around the unlockable realm mights to improve progression.<br>
			- Made hex of vex only reset curse content.<br>
			- Buffed RE-4 to compensate for RE-5 no longer buffing hex points.<br>
			- Nerfed base singularity pet costs by 10 fragments.<br>
			- Added a matos buyable that buffs eclipse based on SP.<br><br>
		Bugfixes:<br>
			- Fixed Point Factor 7 applying its buff twice.<br>
			- Redid the CB offline code to hopefully prevent bugs.<br>
			- Hopefully fixed pent autobuying in IC4.<br>
			- Fixed fear challenge not disabling itself on singularity resets.<br>
			- Fixed "Sel Boost" matos buyable buffing eclipse.<br>
			- Fixed kept celestialite combo value not being floored.<br>
			- Fixed best depth 2 combo's 2nd effect not being shown when unlocked.<br>
			- Fixed eclipse feature accidentally being unlocked without having the pet.<br>
			- Fixed eclipse timer being affected by CB Tickspeed.<br>
			- Fixed star dust buyables having unreachable caps.<br><br>
	<h3>v1.8.3 - Hex Hotfix 3</h3><br>
		Qol:<br>
			- Added tooltips on features that work outside of hex<br>
			- Made mobile universe buttons slightly wider<br>
			- Made messages in black heart not flashbang you<br>
			- Added tooltips to the celestialite type symbols<br><br>
		Balancing:<br>
			- Added a hardcap to death realm challenge's curse buff<br>
			- Added a softcap after 6 realm challenge clears. (not that strong of a softcap though)<br><br>
		Bugfixes:<br>
			- Removed player.navTab since we don't use it and some people were getting crashes due to its value corrupting.<br>
			(Potentially also a very small performance improvement, but I doubt it is in any way noticeable)<br>
			- Fixed funify unlock upgrade not autobuying.<br>
			- Fixed singularity autocrunch not setting if set to time.<br>
			- Fixed one of the cante puzzle questions.<br>
			- Fixed a jinx softcap not working.<br><br>
	<h3>v1.8.2 - Hex Hotfix 2</h3><br>
		Qol:<br>
			- Changed the Uni-bar to scroll instead of using pages.<br>
			- Removed eclipse cooldown, cause why would you want that.<br>
			- Added legendary pet summon pity.<br><br>
		Balancing:<br>
			- Lowered realm essence upgrade cost scaling.<br>
			- Made jinx automation be unlocked earlier into hex.<br>
			- Slightly buffed unlockable singularity effect.<br>
			- Improved legendary pet summon odds.<br>
			- Improved legendary gem gain from RNG rolls.<br>
			- Improved pet point gain from summoning altar.<br><br>
		Bugfixes:<br>
			- Added more crash prevention.<br>
			- Fixed break infinity not requiring an OTF slot after unlocking singularity.<br>
			- Fixed checkback buyable cost formatting.<br><br>
		Typos:<br>
			- Fixed fear being called anger.<br>
			- Fixed some hex softcaps being called softlocks.<br><br>
	<h3>v1.8.1 - Hex Hotfix 1</h3><br>
		Bugfixes:<br>
			- Boons now trigger a hold tick on click<br>
			- Fixed pet points and XPBoost being formatted incorrectly<br>
			- Fixed edge-cases on save transfers<br><br>
	<h2>v1.8 - The Hexing Revamp</h2><br>
		Content:<br>
			- Added Universe α: Hex.<br>
			- Revamped the UI.<br>
			(If you have any ideas on how to further improve it, suggest changes in the discord!)<br>
			- Remade singularity core content.<br>
			- Remade core scrap content.<br>
			- Improved pollinator content.<br>
			- Improved punchcard content.<br>
			- Added a new punchcard.<br>
			- Added a new eclipse black heart skill.<br><br>
		Balancing:<br>
			- Removed IP/NIP factors, realm mods, and realm essence.<br>
			(These features were massive inflators, yet were quick and boring in functionality)<br>
			- Point gain is more gradual now throughout singularity.<br>
			- IP values are now lower, but more meaningful.<br>
			- Mods now has buyables that buff AD and NIP, to keep them being meaningful later.<br>
			- Pollinator values are no longer inflated.<br>
			- Pollinator no longer greatly buffs golden grass and mods.<br>
			- Pent milestones are now more spread out.<br>
			- No longer unlock an extra OTF slot in singularity, instead permanently unlock hex.<br>
			- Through the core revamp, all cores are now important in their own ways.<br>
			- Made mutant spider be unlocked later in the game, to prevent confusion.<br>
			- Buffed mutant spider effects, since it is now unlocked later in the game.<br><br>
		Qol:<br>
			- Core scrap automation can be unlocked from a starmetal alloy upgrade.<br>
			- Added a starmetal alloy upgrade that multiplies DCP to improve early D1.<br>
			- Added a dimboost reserve buyable to Tav.<br>
			- Moved keeping 10 Tetr to Pent 5 milestone.<br>
			- Changed all resource text to improve readability.<br>
			- Probably more, I can't remember it all.<br><br>
		Bugfixes:<br>
			- Too many to even count.<br><br>

	<h3>v1.7 - The Singularity Update Part III: Matos</h3><br>
		Content:<br>
			- Added Matos.<br>
			- Added Black Heart depths 1, 2, and 3.<br>
			- Added the Matos bossfight.<br>
			- Added Alt-Uni 2.<br>
			- Added Rockets.<br>
			- Added Stars.<br>
			- Added Planets.<br>
			- Added Eclipse, the first legendary pet.<br>
			- Added Eclipse's ability in DU1.<br>
			- Added 3 new punchards.<br>
			- Added 4 playable characters in the Black Heart.<br>
			- A good amount of lore.<br>
			- A lot of new music made by yours truly.<br><br>
		Balancing:<br>
			- A bit of balancing here and there, made the game easier.<br><br>
		Qol:<br>
			- I lost track lmao.<br><br>
		Bugfixes:<br>
			- Fixed the darn AU1 bug.<br>
			- I lost track lmao.<br><br>

	<h3>v1.6.1 - Bug Fixes and Balancing</h3><br>
	(Contains all the hotfixes from the past week)<br>
		Content:<br>
			- Added the pent punchcard.<br>
			- Added 10 new pent milestones.<br>
			- Added 2 new charger milestones.<br>
			- Added a new singularity milestone.<br>
			- Added new booster dice effects.<br><br>
		Balancing:<br>
			- Improved the balancing of punchcards.<br>
			- Added softcaps to punchcard effects.<br>
			- Changed the effect of dark grass.<br>
			- Added softcaps to D1 resources, and a second dark point softcap at 1.79e308.<br>
			- Added softcaps to Pre-OTF U1 resources, and balanced the game accordingly.<br>
			- Buffed antimatters effect and NIP's base formula to account for antimatter deflation.<br>
			- Limited point gain to a max of 9.99e309 when not in break infinity. (RIP hex cheese).<br>
			- Buffed grass-skip 40 milestone to account for weaker linkers due to U1 softcaps.<br>
			- Nerfed singularity upgrade 7 to fit with the new balancing of U1.<br>
			- Replaced singularity upgrade 6 due to previous use being no longer applicable.<br>
			- Made point singularity core's second effect not work above 1e100,000 points.<br>
			- Buffed point scrap buyable booster, cause lol.<br><br>
		Qol:<br>
			- Added "Keep pre-singularity check back content on reset" to singularity milestone 4.<br>
			- Added "Keep 10 Tetr on reset" to infinity milestone 6.<br>
			- Made infinity milestone 6 work with singularity milestone 2.<br><br>
		Bugfixes:<br>
			- Fixed potential crashes when loading cores.<br>
			- Fixed being able to obtain some pent milestones without visually unlocking them.<br>
			- Fixed max pent giving one less then intended.<br>
			- Fixed a bug with early infinity resets post singularity.<br>
			- Fixed Tetr automation (through a milestone perk that keeps Tetr).<br>
			- Fixed XP booster dice effect having the wrong cap.<br>
			- Fixed alt-rank point button allowing you to click it for zero points.<br>
			- Fixed antimatter's softcap, causing tons of deflation.<br>
			- Fixed layout bug when check back is the only unlocked U1 layer.<br>
			- Fixed UFO pet point button.<br>
			- Fixed Check Back pity req. buyable being broken.<br>
			- Fixed pet automation not working offline.<br>
			- Fixed booster dice giving the wrong pet.<br>
			- Fixed evolutions purchase code.<br>
			- Fixed evolutions being unlocked without having unlocked the relevent pet.<br>
			- Fixed weird Tetr code.<br>
			- Fixed rocket fuel's third effect not working.<br>
			- Fixed Cante's IC puzzle being broken due to max pent.<br>
			- Fixed export to clipboard (Yipee).<br>
			- Fixed Fear challenge accidentally disabling automation unlocked by grass-skip.<br>
			- Fixed unlocks for Tetr and Tetr Points.<br>
			- Fixed ranks not displaying properly.<br>
			- Fixed singularity epic pets not porting from old update properly.<br>
			- Fixed singularity epic pet shop buyables not displaying properly.<br>
			- Fixed singularity fragmentation not working properly.<br><br>
	<h3>v1.6 - The Polishing Update</h3><br>
		Content:<br>
			- Added the first 4 parts of the in-game Savebank.<br>
			- Added 4 new Grass-Skip milestones.<br><br>
		Balancing:<br>
			- Nerfed U3 Upgrade 7. (It also didn't function previously, so actually a buff)<br>
			- Grass Square Pet's special button effect now scales with level.<br>
			- Voidgwa pet effects are buffed.<br>
			- Base Pet Shop prices changed slightly. (Not the scaling though)<br>
			- Fragmentation slightly buffed (More buttons, longer timers)<br>
			- Added the ability to sacrifice epic fragments.<br>
			- Made singularity no longer reset highest Check Back level.<br>
			- No longer get stuck in Cantepocalypse after singularity.<br>
			- Made IP Challenge 7 unlock after reaching Check Back level 100.<br>
			- Slightly nerfed Realm Essence to counteract accidental buff from fixing pre-OTF multiplier order.<br>
			- Replaced Antimatter Dimensions Upgrade 3, as it creates massive amounts of confusion, and slows down progression.<br><br>
		Bugfixes:<br>
			- Fixed the sidebar appearing while the game is loading.<br>
			- Fixed U3 Upgrade 5 not working with Oil layer.<br>
			- Fixed Repli-Grass Generator not working correctly when Repli-Grass is unfocused.<br>
			- Fixed incorrect ordering of Pre-OTF multipliers when post singularity.<br>
			- Fixed Check Back's effect being disabled.<br>
			- Voidgwa pet effect now works.<br>
			- Fixed D20 pet's 1st effect.<br>
			- Fixed some offline Check Back timers.<br>
			- Fixed singularity not resetting XP properly.<br>
			- Made singularity properly kick you out of challenges.<br>
			- Fixed scrap core toggle.<br>
			- Fixed being able to process a null singularity core.<br>
			- Fixed Dragon pet upgrade 2 not working.<br>
			- Fixed U3 Milestone 3 not automating galaxy dust.<br>
			- Fixed Cantepocalypse trigger.<br>
			- Fixed Halter and OTF not having the correct background.<br>
			- Fixed certain dice effects gain formulas being broken.<br>
			- Fixed U3 Upgrade 6 not working on some resets.<br>
			- Fixed being able to gain Infinity Milestones without having unlocked them.<br>
			- Fixed U1 Upgrade order and Realm Essence upgrade not showing.<br>
			- Fixed Funify's Fear challenge not working properly.<br>
			- Fixed being able to enter halt values that are less then 1.<br><br>
		Qol:<br>
			- Added rigged booster dice.<br>
			- Added new Break Infinity NIP Upgrade, which replaces the previous arbitrary requirement to improve IP formula.<br>
			- Added keep cante cores to U3 milestone 8<br>
			- Added U3 Upgrade 3, which unlocks a Challenge Dice upgrade and keeps T2 dice effects.<br>
			- Made U3 Milestone 7 keep RBI toggle.<br>
			- Added a U1 upgrade that improves Pent automation.<br>
			- Added a Funify upgrade that unlocks bulk grass-skip.<br>
			- Added claim all buttons to applicable check back pages.<br>
			- Added toggle alert buttons to applicable check back pages.<br><br>
		Visual Enhancements:<br>
			- Visually remade almost all buyables.<br>
			- Visually remade Check Back layer.<br>
			- Combined Pet Shop and Epic Fragmentation layers into Check Back.<br>
			- Visually touched up all evolution layers.<br>
			- Visually remade Dice's Booster Dice tab.<br>
			- Visually remade Rocket Fuel.<br>
			- Improved the Settings menu.<br>
			- Touched up most other layers.<br><br>
		Typos & Text Changes:<br>
			- Improved AU1 Upgrade 8s description.<br>
			- Clarified that Antimatter Singularity Core effects ignore softcap.<br>
			- Clarified that U3 Milestone 2 unlocks a Break Infinity upgrade.<br>
			- Clarified that U3 Milestone 5 removes ALL realm mod requirements.<br>
			- Removed mention of U3 Milestone 5 unlocking radiation milestones. (as it doesn't)<br>
			- Changed the wording of U3 Milestone 7.<br>
			- Fixed extra 'and' in U3 Milestone 9.<br>
			- Fixed Break Infinity upgrade numbering.<br>
			- Clarified what Break Infinity upgrades 13 and 17 do.<br>
			- Clarified that Charger Milestone 2 ignores softcaps.<br>
			- Clarified that IP Upgrade (4, 3) ignores softcaps.<br>
			- Better clarified current status of OTF options.<br>
			- Clarified that Dream Realm Mod Buyable 1 ignores softcaps.<br>
			- Fixed Realm Mod Halter Boost's tab not having updated text.<br>
			- Clarified that NIP Upgrade 4 unlocks new IP Upgrades.<br><br>

	<h3>v1.5 - The Singularity Update Part II: Starmetal and Darkness</h3><br>
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
// (The ones here are examples, all official functions are already taken care of)z
var doNotCallTheseFunctionsEveryTick = [
	"blowUpEverything", "startCutscene1","startCutscene2", "startCutscene3", "rankReset",
	"tierReset", "tetrReset", "prestigeReset", "loadGrass", "unloadGrass",
	"pentReset", "loadGoldGrass", "unloadGoldGrass", "grasshopReset", "codeExperienceReset",
	"levelToXP", "xpToLevel", "levelup", "petButton1", "petButton2",
	"resetPrices", "addDiceEffect", "diceRoll", "evoCutscenes", "rocketFuelReset",
	"rocketFuelAbility", "petButton3","bigCrunch", "startCutscene4", "startCutscene5",
	"dimBoostReset", "startCutscene6", "galaxyReset", "startCutscene7", "startCutscene8",
	"dailyReward", "dailyRewardPet", "petButton4", "hexReq", "hexGain",
	"startCutscene9", "startCutscene10", "startCutscene11","crunch", "startCutscene12",
	"startCutscene13", "antidebuffReset", "startCutscene14", "negativeInfinityReset", "reverseCrunch",
	"startCutscene15", "startCutscene16", "startCutscene17", "startCutscene18", "breakInfinities",
	"domainReset", "gainAutomationShard", "sacrificeCommonPet", "sacrificeAllCommonPet", "sacrificeUncommonPet",
	"sacrificeAllUncommonPet", "sacrificeRarePet", "sacrificeAllRarePet", "steelieReset", "crystalReset",
	"replicantiMultiply", "gainCanteCore", "replicantiPointMultiply", "repliLeavesMultiply", "loadRepliGrass",
	"unloadRepliGrass", "grassSkipReset", "oilReset", "convertRememberanceCore", "startCutsceneDice",
	"startCutsceneRocketFuel", "startCutsceneHex", "startRealmModCutscene", "loadMoonstone", "unloadMoonstone",
	"petButton5", "petButton6", "refreshBanner", "commonPetBanner", "uncommonPetBanner",
	"rarePetBanner", "singularityReset", "instantProduction", "startCutscene19", "startCutscene20",
	"startCutscene21", "startCutscene22", "startCutscene23", "startCutscene24", "funifyReset",
	"normalityReset", "startCutscene25", "startCutscene26", "startCutscene27", "startCutscene28",
	"startCutscene29", "scrapCore", "starmetalReset", "starmetalResetAgain", "generatorReset",
	"generateSelection", "addGrass", "petButton7", "evoBanner", "paragonBanner",
	"gemReset", "ordinalDisplay", "powerBase", "powerReset", "coreXPCalc",
	"generateCelestialite", "lootCelestialite", "startCutscene30", "startCutscene31", "startCutscene32",
	"startCutscene33", "startCutscene34", "resetFightCooldown", "starReset", "legendarySummon",
	"generatePhase1Attack", "generatePhase2Attack", "startCutscene35", "startCutscene36", "startCutscene37",
	"startCutscene38", "startCutscene39", "selectCelestialites", "petDeath", "celestialiteDeath",
	"petAbility", "celestialiteAbility", "arriveAtStar", "cookieClick", "spaceEnergyReset",
	"rebootReset"

]

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
	universe: "U1",
	musuniverse: "U1",
	hideMenu: true,
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
	if (oldVersion == "1.3" || oldVersion == "1.2.1" || oldVersion == "1.2" || oldVersion == "1.1.2" || oldVersion == "1.1.1" || oldVersion == "1.1" || oldVersion == "1.0") {
		// Fix dimension content
		if (oldVersion != "1.3") {
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
		}
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

		// Fix Pet Content
		for (let i = 0; i < player.cb.commonPetAmounts.length; i++) {
			setLevelableAmount("pet", i+101, player.cb.commonPetLevels[i]);
			setLevelableXP("pet", i+101, player.cb.commonPetAmounts[i]);
		}
		for (let i = 0; i < player.cb.uncommonPetAmounts.length; i++) {
			setLevelableAmount("pet", i+201, player.cb.uncommonPetLevels[i]);
			setLevelableXP("pet", i+201, player.cb.uncommonPetAmounts[i]);
		}
		for (let i = 0; i < player.cb.rarePetAmounts.length; i++) {
			setLevelableAmount("pet", i+301, player.cb.rarePetLevels[i]);
			setLevelableXP("pet", i+301, player.cb.rarePetAmounts[i]);
		}
		for (let i = 0; i < 3; i++) {
			setLevelableAmount("pet", i+401, player.cb.epicPetLevels[i]);
			setLevelableXP("pet", i+401, player.cb.epicPetFragments[i]);
		}
		setLevelableAmount("pet", 404, player.cb.epicPetLevels[3])
		setLevelableAmount("pet", 405, player.cb.epicPetLevels[4])
		setLevelableAmount("pet", 406, player.cb.epicPetLevels[5])
		player.pet.singularityFragments = player.cb.epicPetFragments[3]
		
		player.pet.lastDicePetRoll = player.cb.lastDicePetRoll
		player.pet.highestDicePetCombo = player.cb.highestDicePetCombo
		player.pet.dicePetCombo = player.cb.dicePetCombo
		player.pet.dicePetPointsGain = player.cb.dicePetPointsGain

		setLevelableAmount("pet", 1103, player.cb.evolvedLevels[0])
		setLevelableAmount("pet", 1204, player.cb.evolvedLevels[1])
		setLevelableAmount("pet", 1203, player.cb.evolvedLevels[2])
		setLevelableAmount("pet", 1101, player.cb.evolvedLevels[3])
		setLevelableAmount("pet", 1202, player.cb.evolvedLevels[4])
		setLevelableAmount("pet", 1302, player.cb.evolvedLevels[5])
		setLevelableAmount("pet", 1106, player.cb.evolvedLevels[6])
		setLevelableAmount("pet", 1303, player.cb.evolvedLevels[7])
		setLevelableAmount("pet", 1206, player.cb.evolvedLevels[8])
		setLevelableAmount("pet", 1104, player.cb.evolvedLevels[9])
		setLevelableAmount("pet", 1205, player.cb.evolvedLevels[10])

		if (player.d.diceEffects[14].gt(100)) player.d.diceEffects[14] = new Decimal(100)
		if (player.rf.abilityEffects[7].gt(1000)) player.rf.abilityEffects[7] = new Decimal(1000)
	}
	if (oldVersion < 161) {
		if (player.points.gt("1e100000")) {
			layers.bigc.crunch()
		}
		if (player.ad.antimatter.gt(player.ad.antimatterPerSecond.mul(1e100))) {
			layers.ta.negativeInfinityReset()
		}
	}
	if (oldVersion < 180) {
		if (player.d.diceEffects[13].gt(10000)) player.d.diceEffects[13] = new Decimal(10000)
		if (player.d.diceEffects[14].gt(100)) player.d.diceEffects[14] = new Decimal(100)
		if (player.rf.abilityEffects[7].gt(1000)) player.rf.abilityEffects[7] = new Decimal(1000)
		if (player.id.infinityPower.gte(1e300)) player.id.infinityPower = new Decimal(1e300)
		if (player.sd.singularityPower.gte(1e300)) player.sd.singularityPower = new Decimal(1e300)
		if (player.m.mods.gte(1e100)) player.m.mods = new Decimal(1e100)
		if (player.pol.pollinators.gte(1e100)) player.pol.pollinators = new Decimal(1e100)
		if (player.cb.level.gte(100000)) player.cb.level = new Decimal(100000)
		if (player.cb.highestLevel.gte(100000)) player.cb.level = new Decimal(100000)
		if (player.cb.XPBoost.gte(100000)) player.cb.XPBoost = new Decimal(100000)
		if (player.cb.xp.gte(50000000)) player.cb.xp = new Decimal(50000000)
		if (player.cb.totalxp.gte(2.23e12)) player.cb.totalxp = new Decimal(2.23e12)
		if (player.ma.bestComboDepth1.gte(100)) player.ma.bestComboDepth1 = new Decimal(100)
		if (player.ma.bestComboDepth2.gte(100)) player.ma.bestComboDepth2 = new Decimal(100)
		if (player.ma.bestComboDepth3.gte(100)) player.ma.bestComboDepth3 = new Decimal(100)
		if (!player.pet.singularityFragments) player.pet.singularityFragments = new Decimal(0)
		player.pet.highestDicePetCombo = new Decimal(player.pet.highestDicePetCombo)
		player.cb.evolutionShards = new Decimal(player.cb.evolutionShards).floor()
		player.cb.paragonShards = new Decimal(player.cb.paragonShards).floor()
		if (player.re != undefined) {
			player.hrm.realmEssence = new Decimal(player.re.halterEssence)
			player.hrm.totalRealmEssence = new Decimal(player.re.halterEssence)
		}
		for (let prop in player.ta.buyables) {
			if (prop != 19 && prop != 39) {
				if (getBuyableAmount("ta", prop).gt(layers.ta.buyables[prop].purchaseLimit())) setBuyableAmount("ta", prop, layers.ta.buyables[prop].purchaseLimit())
			}
		}
		for (let prop in player.ip.buyables) {
			if (getBuyableAmount("ip", prop).gt(layers.ip.buyables[prop].purchaseLimit())) setBuyableAmount("ip", prop, layers.ip.buyables[prop].purchaseLimit())
		}
		for (let prop in player.id.buyables) {
			if (getBuyableAmount("id", prop).gt(layers.id.buyables[prop].purchaseLimit())) setBuyableAmount("id", prop, layers.id.buyables[prop].purchaseLimit())
		}
		for (let prop in player.om.buyables) {
			if (getBuyableAmount("om", prop).gt(layers.om.buyables[prop].purchaseLimit())) setBuyableAmount("om", prop, layers.om.buyables[prop].purchaseLimit())
		}
		for (let prop in player.bi.buyables) {
			if (getBuyableAmount("bi", prop).gt(layers.bi.buyables[prop].purchaseLimit())) setBuyableAmount("bi", prop, layers.bi.buyables[prop].purchaseLimit())
		}
		for (let prop in player.ca.buyables) {
			if (getBuyableAmount("ca", prop).gt(layers.ca.buyables[prop].purchaseLimit())) setBuyableAmount("ca", prop, layers.ca.buyables[prop].purchaseLimit())
		}
		for (let prop in player.fu.buyables) {
			if (getBuyableAmount("fu", prop).gt(layers.fu.buyables[prop].purchaseLimit())) setBuyableAmount("fu", prop, layers.fu.buyables[prop].purchaseLimit())
		}
		setBuyableAmount("sma", 12, new Decimal(getBuyableAmount("sma", 12).mul(2))),
		setBuyableAmount("ma", 101, new Decimal(0))
		setBuyableAmount("ma", 102, new Decimal(0))
		setBuyableAmount("ma", 103, new Decimal(0))

		if (player.le.punchcardsXP != undefined) {
			setLevelableXP("pu", 101, new Decimal(player.le.punchcardsXP[0]))
			setLevelableXP("pu", 201, new Decimal(player.le.punchcardsXP[1]))
			setLevelableXP("pu", 102, new Decimal(player.le.punchcardsXP[2]))
			setLevelableXP("pu", 103, new Decimal(player.le.punchcardsXP[3]))
			setLevelableXP("pu", 104, new Decimal(player.le.punchcardsXP[4]))
			setLevelableXP("pu", 105, new Decimal(player.le.punchcardsXP[5]))
			setLevelableXP("pu", 202, new Decimal(player.le.punchcardsXP[6]))
			setLevelableXP("pu", 106, new Decimal(player.le.punchcardsXP[7]))
			setLevelableXP("pu", 107, new Decimal(player.le.punchcardsXP[8]))
			setLevelableXP("pu", 203, new Decimal(player.le.punchcardsXP[9]))
			setLevelableXP("pu", 204, new Decimal(player.le.punchcardsXP[10]))
			setLevelableXP("pu", 108, new Decimal(player.le.punchcardsXP[11]))
			setLevelableXP("pu", 205, new Decimal(player.le.punchcardsXP[12]))
			setLevelableXP("pu", 206, new Decimal(player.le.punchcardsXP[13]))
			setLevelableXP("pu", 301, new Decimal(player.le.punchcardsXP[14]))
			setLevelableXP("pu", 302, new Decimal(player.le.punchcardsXP[15]))
			setLevelableXP("pu", 207, new Decimal(player.le.punchcardsXP[16]))
			setLevelableXP("pu", 109, new Decimal(player.le.punchcardsXP[17]))
			setLevelableXP("pu", 303, new Decimal(player.le.punchcardsXP[18]))
			setLevelableXP("pu", 304, new Decimal(player.le.punchcardsXP[19]))

			setLevelableAmount("pu", 101, new Decimal(player.le.punchcardsLevels[0]).sub(1).min(10))
			setLevelableAmount("pu", 201, new Decimal(player.le.punchcardsLevels[1]).sub(1).min(10))
			setLevelableAmount("pu", 102, new Decimal(player.le.punchcardsLevels[2]).sub(1).min(10))
			setLevelableAmount("pu", 103, new Decimal(player.le.punchcardsLevels[3]).sub(1).min(10))
			setLevelableAmount("pu", 104, new Decimal(player.le.punchcardsLevels[4]).sub(1).min(10))
			setLevelableAmount("pu", 105, new Decimal(player.le.punchcardsLevels[5]).sub(1).min(10))
			setLevelableAmount("pu", 202, new Decimal(player.le.punchcardsLevels[6]).sub(1).min(10))
			setLevelableAmount("pu", 106, new Decimal(player.le.punchcardsLevels[7]).sub(1).min(10))
			setLevelableAmount("pu", 107, new Decimal(player.le.punchcardsLevels[8]).sub(1).min(10))
			setLevelableAmount("pu", 203, new Decimal(player.le.punchcardsLevels[9]).sub(1).min(10))
			setLevelableAmount("pu", 204, new Decimal(player.le.punchcardsLevels[10]).sub(1).min(10))
			setLevelableAmount("pu", 108, new Decimal(player.le.punchcardsLevels[11]).sub(1).min(10))
			setLevelableAmount("pu", 205, new Decimal(player.le.punchcardsLevels[12]).sub(1).min(10))
			setLevelableAmount("pu", 206, new Decimal(player.le.punchcardsLevels[13]).sub(1).min(10))
			setLevelableAmount("pu", 301, new Decimal(player.le.punchcardsLevels[14]).sub(1).min(10))
			setLevelableAmount("pu", 302, new Decimal(player.le.punchcardsLevels[15]).sub(1).min(10))
			setLevelableAmount("pu", 207, new Decimal(player.le.punchcardsLevels[16]).sub(1).min(10))
			setLevelableAmount("pu", 109, new Decimal(player.le.punchcardsLevels[17]).sub(1).min(10))
			setLevelableAmount("pu", 303, new Decimal(player.le.punchcardsLevels[18]).sub(1).min(10))
			setLevelableAmount("pu", 304, new Decimal(player.le.punchcardsLevels[19]).sub(1).min(10))
		}
		
		
		player.cs.scraps.point.amount = new Decimal(player.cs.resourceCoreScraps[0]).abs()
		player.cs.scraps.factor.amount = new Decimal(player.cs.resourceCoreScraps[1]).abs()
		player.cs.scraps.prestige.amount = new Decimal(player.cs.resourceCoreScraps[2]).abs()
		player.cs.scraps.tree.amount = new Decimal(player.cs.resourceCoreScraps[3]).abs()
		player.cs.scraps.grass.amount = new Decimal(player.cs.resourceCoreScraps[4]).abs()
		player.cs.scraps.grasshopper.amount = new Decimal(player.cs.resourceCoreScraps[5]).abs()
		player.cs.scraps.code.amount = new Decimal(player.cs.resourceCoreScraps[6]).abs()
		player.cs.scraps.dice.amount = new Decimal(player.cs.resourceCoreScraps[7]).abs()
		player.cs.scraps.rocket.amount = new Decimal(player.cs.resourceCoreScraps[8]).abs()
		player.cs.scraps.antimatter.amount = new Decimal(player.cs.resourceCoreScraps[9]).abs()
		player.cs.scraps.infinity.amount = new Decimal(player.cs.resourceCoreScraps[10]).abs()
		player.cs.scraps.checkback.amount = new Decimal(player.cs.paragonScraps).abs()
	}

	if (oldVersion < 185) {
		if (!player.cp.cantepocalypseActive) {
			player.universe = "U1"
		} else {
			player.universe = "A1"
		}
		setBuyableAmount("ep2", 11, new Decimal(0))
		setBuyableAmount("ep2", 12, new Decimal(0))
		setBuyableAmount("ep2", 13, new Decimal(0))
	}
}
