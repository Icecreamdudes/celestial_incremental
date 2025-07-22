var player;
var needCanvasUpdate = true;

// Don't change this
const TMT_VERSION = {
	tmtNum: "2.7",
	tmtName: "Δ"
}

function getResetGain(layer, useType = null) {
	let type = useType
	if (!useType){
		type = tmp[layer].type
		if (layers[layer].getResetGain !== undefined)
			return layers[layer].getResetGain()
	}
	if(tmp[layer].type == "none")
		return new Decimal (0)
	if (tmp[layer].gainExp.eq(0)) return decimalZero
	if (type=="static") {
		if ((!tmp[layer].canBuyMax) || tmp[layer].baseAmount.lt(tmp[layer].requires)) return decimalOne
		let gain = tmp[layer].baseAmount.div(tmp[layer].requires).div(tmp[layer].gainMult).max(1).log(tmp[layer].base).times(tmp[layer].gainExp).pow(Decimal.pow(tmp[layer].exponent, -1))
		gain = gain.times(tmp[layer].directMult)
		return gain.floor().sub(player[layer].points).add(1).max(1);
	} else if (type=="normal"){
		if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return decimalZero
		let gain = tmp[layer].baseAmount.div(tmp[layer].requires).pow(tmp[layer].exponent).times(tmp[layer].gainMult).pow(tmp[layer].gainExp)
		if (gain.gte(tmp[layer].softcap)) gain = gain.pow(tmp[layer].softcapPower).times(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower)))
		gain = gain.times(tmp[layer].directMult)
		return gain.floor().max(0);
	} else if (type=="custom"){
		return layers[layer].getResetGain()
	} else {
		return decimalZero
	}
}

function getNextAt(layer, canMax=false, useType = null) {
	let type = useType
	if (!useType) {
		type = tmp[layer].type
		if (layers[layer].getNextAt !== undefined)
			return layers[layer].getNextAt(canMax)

		}
	if(tmp[layer].type == "none")
		return new Decimal (Infinity)

	if (tmp[layer].gainMult.lte(0)) return new Decimal(Infinity)
	if (tmp[layer].gainExp.lte(0)) return new Decimal(Infinity)

	if (type=="static")
	{
		if (!tmp[layer].canBuyMax) canMax = false
		let amt = player[layer].points.plus((canMax&&tmp[layer].baseAmount.gte(tmp[layer].nextAt))?tmp[layer].resetGain:0).div(tmp[layer].directMult)
		let extraCost = Decimal.pow(tmp[layer].base, amt.pow(tmp[layer].exponent).div(tmp[layer].gainExp)).times(tmp[layer].gainMult)
		let cost = extraCost.times(tmp[layer].requires).max(tmp[layer].requires)
		if (tmp[layer].roundUpCost) cost = cost.ceil()
		return cost;
	} else if (type=="normal"){
		let next = tmp[layer].resetGain.add(1).div(tmp[layer].directMult)
		if (next.gte(tmp[layer].softcap)) next = next.div(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower))).pow(decimalOne.div(tmp[layer].softcapPower))
		next = next.root(tmp[layer].gainExp).div(tmp[layer].gainMult).root(tmp[layer].exponent).times(tmp[layer].requires).max(tmp[layer].requires)
		if (tmp[layer].roundUpCost) next = next.ceil()
		return next;
	} else if (type=="custom"){
		return layers[layer].getNextAt(canMax)
	} else {
		return decimalZero
	}}

function softcap(value, cap, power = 0.5) {
	if (value.lte(cap)) return value
	else
		return value.pow(power).times(cap.pow(decimalOne.sub(power)))
}

// Return true if the layer should be highlighted. By default checks for upgrades only.
function shouldNotify(layer){
	for (id in tmp[layer].upgrades){
		if (isPlainObject(layers[layer].upgrades[id])){
			if (canAffordUpgrade(layer, id) && !hasUpgrade(layer, id) && tmp[layer].upgrades[id].unlocked){
				return true
			}
		}
	}
	if (player[layer].activeChallenge && canCompleteChallenge(layer, player[layer].activeChallenge)) {
		return true
	}

	if (tmp[layer].shouldNotify)
		return true

	if (isPlainObject(tmp[layer].tabFormat)) {
		for (subtab in tmp[layer].tabFormat){
			if (subtabShouldNotify(layer, 'mainTabs', subtab)) {
				tmp[layer].trueGlowColor = tmp[layer].tabFormat[subtab].glowColor || defaultGlow

				return true
			}
		}
	}

	for (family in tmp[layer].microtabs) {
		for (subtab in tmp[layer].microtabs[family]){
			if (subtabShouldNotify(layer, family, subtab)) {
				tmp[layer].trueGlowColor = tmp[layer].microtabs[family][subtab].glowColor
				return true
			}
		}
	}

	return false

}

function canReset(layer)
{
	if (layers[layer].canReset!== undefined)
		return run(layers[layer].canReset, layers[layer])
	else if(tmp[layer].type == "normal")
		return tmp[layer].baseAmount.gte(tmp[layer].requires)
	else if(tmp[layer].type== "static")
		return tmp[layer].baseAmount.gte(tmp[layer].nextAt)
	else
		return false
}

function rowReset(row, layer) {
	for (lr in ROW_LAYERS[row]){
		if(layers[lr].doReset) {
			if (!isNaN(row)) Vue.set(player[lr], "activeChallenge", null) // Exit challenges on any row reset on an equal or higher row
			run(layers[lr].doReset, layers[lr], layer)
		}
		else
			if(tmp[layer].row > tmp[lr].row && !isNaN(row)) layerDataReset(lr)
	}
}

function layerDataReset(layer, keep = []) {
	let storedData = {unlocked: player[layer].unlocked, forceTooltip: player[layer].forceTooltip, noRespecConfirm: player[layer].noRespecConfirm, prevTab:player[layer].prevTab} // Always keep these

	for (thing in keep) {
		if (player[layer][keep[thing]] !== undefined)
			storedData[keep[thing]] = player[layer][keep[thing]]
	}

	Vue.set(player[layer], "buyables", getStartBuyables(layer))
	Vue.set(player[layer], "levelables", getStartLevelables(layer))
	Vue.set(player[layer], "clickables", getStartClickables(layer))
	Vue.set(player[layer], "challenges", getStartChallenges(layer))
	Vue.set(player[layer], "grid", getStartGrid(layer))

	layOver(player[layer], getStartLayerData(layer))
	player[layer].upgrades = []
	player[layer].milestones = []
	player[layer].achievements = []

	for (thing in storedData) {
		player[layer][thing] =storedData[thing]
	}
}



function addPoints(layer, gain) {
	player[layer].points = player[layer].points.add(gain).max(0)
	if (player[layer].best) player[layer].best = player[layer].best.max(player[layer].points)
	if (player[layer].total) player[layer].total = player[layer].total.add(gain)
}

function generatePoints(layer, diff) {
	addPoints(layer, tmp[layer].resetGain.times(diff))
}

function doReset(layer, force=false) {
	if (tmp[layer].type == "none") return
	let row = tmp[layer].row
	if (!force) {

		if (tmp[layer].canReset === false) return;

		if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return;
		let gain = tmp[layer].resetGain
		if (tmp[layer].type=="static") {
			if (tmp[layer].baseAmount.lt(tmp[layer].nextAt)) return;
			gain =(tmp[layer].canBuyMax ? gain : 1)
		}


		if (layers[layer].onPrestige) {
			updateMilestones(layer)
			run(layers[layer].onPrestige, layers[layer], gain)
		}

		addPoints(layer, gain)
		updateMilestones(layer)
		updateAchievements(layer)

		if (!player[layer].unlocked) {
			player[layer].unlocked = true;
			needCanvasUpdate = true;

			if (tmp[layer].increaseUnlockOrder){
				lrs = tmp[layer].increaseUnlockOrder
				for (lr in lrs)
					if (!player[lrs[lr]].unlocked) player[lrs[lr]].unlockOrder++
			}
		}

	}

	if (run(layers[layer].resetsNothing, layers[layer])) return
	tmp[layer].baseAmount = decimalZero // quick fix


	for (layerResetting in layers) {
		if (row >= layers[layerResetting].row && (!force || layerResetting != layer)) completeChallenge(layerResetting)
	}

	player.points = (row == 0 ? decimalZero : getStartPoints())

	for (let x = row; x >= 0; x--) rowReset(x, layer)
	for (r in OTHER_LAYERS){
		rowReset(r, layer)
	}

	player[layer].resetTime = 0

	updateTemp()
	updateTemp()
}

function resetRow(row) {
	if (prompt('Are you sure you want to reset this row? It is highly recommended that you wait until the end of your current run before doing this! Type "I WANT TO RESET THIS" to confirm')!="I WANT TO RESET THIS") return
	let pre_layers = ROW_LAYERS[row-1]
	let layers = ROW_LAYERS[row]
	let post_layers = ROW_LAYERS[row+1]
	rowReset(row+1, post_layers[0])
	doReset(pre_layers[0], true)
	for (let layer in layers) {
		player[layer].unlocked = false
		if (player[layer].unlockOrder) player[layer].unlockOrder = 0
	}
	player.points = getStartPoints()
	updateTemp();
	resizeCanvas();
}

function startChallenge(layer, x) {
	let enter = false
	if (!player[layer].unlocked || !tmp[layer].challenges[x].unlocked || !tmp[layer].challenges[x].canClick || !canEnterChallenge(layer, x)) return

	if (player[layer].activeChallenge == x) {
		// This needs to be embedded due to how 'enter' works
		if(canExitChallenge(layer, x)){
			completeChallenge(layer, x)
			Vue.set(player[layer], "activeChallenge", null)
		}
	} else {
		enter = true
	}
	if (enter || canExitChallenge(layer, x)) doReset(layer, true)
	if (enter) {
		Vue.set(player[layer], "activeChallenge", x)
		run(layers[layer].challenges[x].onEnter, layers[layer].challenges[x])
	}
	updateChallengeTemp(layer)
}

function canCompleteChallenge(layer, x)
{
	if (x != player[layer].activeChallenge) return
	let challenge = tmp[layer].challenges[x]
	if (challenge.canComplete !== undefined) return challenge.canComplete

	if (challenge.currencyInternalName){
		let name = challenge.currencyInternalName
		if (challenge.currencyLocation){
			return !(challenge.currencyLocation[name].lt(challenge.goal))
		}
		else if (challenge.currencyLayer){
			let lr = challenge.currencyLayer
			return !(player[lr][name].lt(challenge.goal))
		}
		else {
			return !(player[name].lt(challenge.goal))
		}
	}
	else {
		return !(player.points.lt(challenge.goal))
	}

}

function completeChallenge(layer, x) {
	var x = player[layer].activeChallenge
	if (!x) return

	let completions = canCompleteChallenge(layer, x)
	if (!completions){
		Vue.set(player[layer], "activeChallenge", null)
		run(layers[layer].challenges[x].onExit, layers[layer].challenges[x])
		return
	}
	if (player[layer].challenges[x] < tmp[layer].challenges[x].completionLimit) {
		needCanvasUpdate = true
		player[layer].challenges[x] += completions
		player[layer].challenges[x] = Math.min(player[layer].challenges[x], tmp[layer].challenges[x].completionLimit)
		if (layers[layer].challenges[x].onComplete) run(layers[layer].challenges[x].onComplete, layers[layer].challenges[x])
	}
	Vue.set(player[layer], "activeChallenge", null)
	run(layers[layer].challenges[x].onExit, layers[layer].challenges[x])
	updateChallengeTemp(layer)
}

VERSION.withoutName = "v" + VERSION.num + (VERSION.pre ? " Pre-Release " + VERSION.pre : VERSION.pre ? " Beta " + VERSION.beta : "")
VERSION.withName = VERSION.withoutName + (VERSION.name ? ": " + VERSION.name : "")


function autobuyUpgrades(layer){
	if (!tmp[layer].upgrades) return
	for (id in tmp[layer].upgrades)
		if (isPlainObject(tmp[layer].upgrades[id]) && (layers[layer].upgrades[id].canAfford === undefined || layers[layer].upgrades[id].canAfford() === true))
			buyUpg(layer, id)
}

function gameLoop(diff) {
	if (isEndgame() || tmp.gameEnded){
		tmp.gameEnded = true
		clearParticles()
	}

	if (isNaN(diff) || diff < 0) diff = 0
	if (tmp.gameEnded && !player.keepGoing) {
		diff = 0
		//player.tab = "tmp.gameEnded"
		clearParticles()
	}

	if (maxTickLength) {
		let limit = maxTickLength()
		if(diff > limit)
			diff = limit
	}
	addTime(diff)
	player.points = player.points.add(tmp.pointGen.times(diff)).max(0)

	for (let x = 0; x <= maxRow; x++){
		for (item in TREE_LAYERS[x]) {
			let layer = TREE_LAYERS[x][item]
			player[layer].resetTime += diff
			if (tmp[layer].passiveGeneration) generatePoints(layer, diff*tmp[layer].passiveGeneration);
			if (layers[layer].update && !tmp[layer].deactivated) layers[layer].update(diff);
		}
	}

	for (row in OTHER_LAYERS){
		for (item in OTHER_LAYERS[row]) {
			let layer = OTHER_LAYERS[row][item]
			player[layer].resetTime += diff
			if (tmp[layer].passiveGeneration) generatePoints(layer, diff*tmp[layer].passiveGeneration);
			if (layers[layer].update && !tmp[layer].deactivated) layers[layer].update(diff);
		}
	}

	for (let x = maxRow; x >= 0; x--){
		for (item in TREE_LAYERS[x]) {
			let layer = TREE_LAYERS[x][item]
			if (tmp[layer].autoPrestige && tmp[layer].canReset) doReset(layer);
			if (layers[layer].automate) layers[layer].automate();
			if (tmp[layer].autoUpgrade) autobuyUpgrades(layer)
		}
	}

	for (row in OTHER_LAYERS){
		for (item in OTHER_LAYERS[row]) {
			let layer = OTHER_LAYERS[row][item]
			if (tmp[layer].autoPrestige && tmp[layer].canReset) doReset(layer);
			if (layers[layer].automate) layers[layer].automate();
				player[layer].best = player[layer].best.max(player[layer].points)
			if (tmp[layer].autoUpgrade) autobuyUpgrades(layer)
		}
	}

	for (layer in layers){
		if (layers[layer].milestones) updateMilestones(layer);
		if (layers[layer].achievements) updateAchievements(layer)
	}

}

function hardReset(resetOptions) {
	if (!confirm("So are you sure you want to reset everything???")) return
	player = null
	if(resetOptions) options = null
	save(true);
	window.location.reload();
}

var ticking = false

var interval = setInterval(function() {
	if (player===undefined||tmp===undefined) return;
	if (ticking) return;
	if (tmp.gameEnded&&!player.keepGoing) return;
	ticking = true
	let now = Date.now()
	let diff = (now - player.time) / 1e3
	let trueDiff = diff
	if (player.devSpeed) diff *= player.devSpeed
	player.time = now
	if (needCanvasUpdate){ resizeCanvas();
		needCanvasUpdate = false;
	}
	tmp.scrolled = document.getElementById('treeTab') && document.getElementById('treeTab').scrollTop > 30
	updateTemp();
	updateOomps(diff);
	updateWidth()
	updateTabFormats()
	updateStyles()
	gameLoop(diff)
	miscCode()
	fixNaNs()
	adjustPopupTime(trueDiff)
	updateParticles(trueDiff)
	ticking = false
}, 50)

setInterval(function() {needCanvasUpdate = true}, 500)

function adjustMusic() {
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	const audioElements = document.querySelectorAll("audio");

	audioElements.forEach((audio) => {
	  const source = audioContext.createMediaElementSource(audio);
	  const pitchShift = audioContext.createGain();
	  const rate = 0.5; // Adjust the playback rate as needed (e.g., 0.5 = half speed)
	  const pitch = 0.5; // Adjust the pitch as needed (e.g., 0.5 = half pitch)

	  // Connect the audio graph for pitch adjustment
	  source.connect(pitchShift);
	  pitchShift.connect(audioContext.destination);
	  pitchShift.gain.value = pitch;

	  // Set the playback rate to slow down the music
	  audio.playbackRate = rate;
	});
  }

  // Function to restore the original music pitch and playback rate
  function restoreMusic() {
	const audioElements = document.querySelectorAll("audio");
	audioElements.forEach((audio) => {
	  audio.playbackRate = 1; // Restore to the original playback rate
	});
  }
  function flashScreen(background, text, textColor, duration) {
    let body = document.body;
    let originalBackground = body.style.background;
    let originalText = body.innerHTML;

    function showText() {
        let overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = background;
        body.appendChild(overlay);

        let textContainer = document.createElement('div');
        textContainer.style.position = 'absolute';
        textContainer.style.top = '50%';
        textContainer.style.left = '50%';
        textContainer.style.transform = 'translate(-50%, -50%)';
        textContainer.style.color = textColor;
        textContainer.style.fontSize = "5em"; // Adjust text size as needed
        textContainer.style.textAlign = "center"; // Center the text
        body.appendChild(textContainer);

        if (Array.isArray(text)) {
            let currentIndex = 0;
            let interval = setInterval(() => {
                textContainer.innerHTML = text[currentIndex];
                currentIndex = (currentIndex + 1) % text.length;
            }, duration);

            setTimeout(() => {
                clearInterval(interval);
                body.removeChild(overlay);
                body.removeChild(textContainer);
                body.style.background = originalBackground;
                body.innerHTML = originalText;
            }, duration * text.length);
        } else {
            textContainer.innerHTML = text;
            setTimeout(() => {
                body.removeChild(overlay);
                body.removeChild(textContainer);
                body.style.background = originalBackground;
                body.innerHTML = originalText;
            }, duration);
        }
    }

    showText();
}

function swarmParticles(particleColor, flashColor) {
	// Create particles
	const particleSize = 50; // Adjust particle size as needed
	const particles = [];
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	const horizontalCount = Math.ceil(screenWidth / particleSize);
	const verticalCount = Math.ceil(screenHeight / particleSize);

	for (let i = 0; i < horizontalCount; i++) {
	  for (let j = 0; j < verticalCount; j++) {
		const particle = document.createElement('div');
		particle.className = 'particle';
		particle.style.backgroundColor = particleColor;
		particle.style.width = particleSize + 'px'; // Set width to particle size
		particle.style.height = particleSize + 'px'; // Set height to particle size
		particle.style.left = getRandomOffScreenPosition(screenWidth, particleSize) + 'px'; // Random horizontal position off-screen
		particle.style.top = getRandomOffScreenPosition(screenHeight, particleSize) + 'px'; // Random vertical position off-screen
		document.body.appendChild(particle);
		particles.push(particle);

		// Animate particle to its designated position
		setTimeout(() => {
		  particle.style.transition = 'left 2s, top 2s'; // Transition animation duration
		  particle.style.left = i * particleSize + 'px';
		  particle.style.top = j * particleSize + 'px';
		}, 10); // Delay animation to ensure particles start off-screen
	  }
	}

	// Remove particles after animation
	setTimeout(() => {
	  particles.forEach(particle => particle.remove()); // Remove particles
	  // Call the flash function after removing particles
	  flashBackground(flashColor);
	}, 5000);
  }

  // Function to flash background
  function flashBackground(color) {
	document.body.style.backgroundColor = color;
	setTimeout(() => {
	  document.body.style.backgroundColor = 'white'; // Reset background color
	}, 1000);
  }

  // Function to get random off-screen position
  function getRandomOffScreenPosition(screenDimension, particleSize) {
	return Math.random() > 0.5 ? -particleSize : screenDimension + particleSize;
  }

  function createWisps(color, amount, speed) {
	for (let i = 0; i < amount; i++) {
	  const wisp = document.createElement('div');
	  wisp.className = 'wisp';
	  wisp.style.backgroundColor = color;
	  wisp.style.left = Math.random() * window.innerWidth + 'px';
	  wisp.style.top = Math.random() * window.innerHeight + 'px';
	  const velocityX = (Math.random() - 0.5) * speed;
	  const velocityY = (Math.random() - 0.5) * speed;
	  wisp.velocity = { x: velocityX, y: velocityY };
	  document.body.appendChild(wisp);
	}

	setInterval(moveWisps, 1000 / 60); // Update wisps position approximately every 60th of a second
  }

  function moveWisps() {
	const wisps = document.querySelectorAll('.wisp');
	wisps.forEach(wisp => {
	  wisp.style.left = parseFloat(wisp.style.left) + wisp.velocity.x + 'px';
	  wisp.style.top = parseFloat(wisp.style.top) + wisp.velocity.y + 'px';

	  // Wrap-around effect when wisps reach the screen boundaries
	  if (parseFloat(wisp.style.left) < -20) {
		wisp.style.left = window.innerWidth + 'px';
	  } else if (parseFloat(wisp.style.left) > window.innerWidth) {
		wisp.style.left = '-20px';
	  }
	  if (parseFloat(wisp.style.top) < -20) {
		wisp.style.top = window.innerHeight + 'px';
	  } else if (parseFloat(wisp.style.top) > window.innerHeight) {
		wisp.style.top = '-20px';
	  }
	});
  }

  function removeWisps() {
	const wisps = document.querySelectorAll('.wisp');
	wisps.forEach(wisp => wisp.remove());
  }

  let audio = new Audio();
  let isAudioInitialized = false;
  let currentAudioSrc = '';  // Track the currently playing audio source
  let volume = 1.0; // Default volume

  // Load audio state from local storage on page load
  window.onload = function() {
	  const savedAudioSrc = localStorage.getItem('audioSrc');
	  const savedVolume = localStorage.getItem('volume');

	  if (savedAudioSrc) {
		  currentAudioSrc = savedAudioSrc;
		  volume = savedVolume ? parseFloat(savedVolume) : 1.0; // Use saved volume or default to 1.0
		  audio.src = currentAudioSrc;
		  audio.volume = volume;
		  audio.loop = true;
		  isAudioInitialized = true;

		  // Attempt to play the audio
		  audio.play().catch(function(err) {
			  console.log("Audio playback failed: ", err);
		  });
	  }
  };

  function playAndLoopAudio(audioSrc, newVolume) {
	  // Only proceed if the new audioSrc is different from the current one
	  if (audioSrc !== currentAudioSrc) {
		  if (isAudioInitialized) {
			  // Stop the currently playing audio before switching
			  audio.pause();
			  audio.currentTime = 0;
			  isAudioInitialized = false;
		  }

		  // Set the new audio source
		  audio.src = audioSrc;
		  currentAudioSrc = audioSrc; // Update the current playing audio source
		  audio.loop = true;
		  isAudioInitialized = true;
		  audio.volume = newVolume; // Set initial volume
		  localStorage.setItem('audioSrc', audioSrc); // Save to local storage
		  localStorage.setItem('volume', newVolume); // Save volume to local storage

		  // Play the new audio
		  audio.play().catch(function(err) {
			  console.log("Audio playback failed: ", err);
		  });
	  } else {
		  // Update volume if the same audio source is called again
		  audio.volume = newVolume;
		  localStorage.setItem('volume', newVolume); // Update volume in local storage
		  audio.play().catch(function(err) {
			  console.log("Audio playback failed: ", err);
		  });
	  }
  }

  function stopAudio() {
	  if (isAudioInitialized) {
		  audio.pause();
		  audio.currentTime = 0;
		  isAudioInitialized = false;
		  currentAudioSrc = ''; // Reset the current audio source
		  localStorage.removeItem('audioSrc'); // Clear the saved audio source
		  localStorage.removeItem('volume'); // Clear the saved volume
	  }
  }

function rowShown(arr) {
	let val = false
	for (let i = 0; i < arr.length; i++) {
		if (layerShown(arr[i])) val = true
	}
	return val
}
