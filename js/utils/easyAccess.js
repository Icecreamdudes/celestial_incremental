function hasUpgrade(layer, id) {
	return ((player[layer].upgrades.includes(toNumber(id)) || player[layer].upgrades.includes(id.toString())))
}

function hasMilestone(layer, id) {
	return ((player[layer].milestones.includes(toNumber(id)) || player[layer].milestones.includes(id.toString())))
}

function hasAchievement(layer, id) {
	return ((player[layer].achievements.includes(toNumber(id)) || player[layer].achievements.includes(id.toString())))
}

function hasChallenge(layer, id) {
	return ((player[layer].challenges[id]))
}

function maxedChallenge(layer, id) {
	return ((player[layer].challenges[id] >= tmp[layer].challenges[id].completionLimit))
}

function challengeCompletions(layer, id) {
	return (player[layer].challenges[id])
}

function canEnterChallenge(layer, id){
	return tmp[layer].challenges[id].canEnter ?? true
}

function canExitChallenge(layer, id){
	return tmp[layer].challenges[id].canExit ?? true
}

function getBuyableAmount(layer, id) {
	return (player[layer].buyables[id])
}

function setBuyableAmount(layer, id, amt) {
	player[layer].buyables[id] = amt
}

function addBuyables(layer, id, amt) {
	player[layer].buyables[id] = player[layer].buyables[id].add(amt)
}

function getLevelableAmount(layer, id) {
	return new Decimal(player[layer].levelables[id][0])
}

function setLevelableAmount(layer, id, amt) {
	player[layer].levelables[id][0] = amt
}

function addLevelables(layer, id, amt) {
	player[layer].levelables[id][0] = player[layer].levelables[id][0].add(amt)
}

function getLevelableXP(layer, id) {
	return new Decimal(player[layer].levelables[id][1])
}

function setLevelableXP(layer, id, amt) {
	player[layer].levelables[id][1] = amt
}

function addLevelableXP(layer, id, amt) {
	player[layer].levelables[id][1] = player[layer].levelables[id][1].add(amt)
}

function getLevelableTier(layer, id, bool = false) {
	if (typeof player[layer].levelables[id][2] == "boolean") {
		if (player[layer].levelables[id][2]) {
			player[layer].levelables[id][2] = new Decimal(1)
		} else {
			player[layer].levelables[id][2] = new Decimal(0)
		}
	}
	if (bool == true) {
		if (typeof player[layer].levelables[id][2] == "number") {
			if (player[layer].levelables[id][2] == 0) return false
			return true
		}
		if (player[layer].levelables[id][2].eq(0)) return false
		return true
	}
	return (player[layer].levelables[id][2])
}

function setLevelableTier(layer, id, val) {
	player[layer].levelables[id][2] = val
}

function getClickableState(layer, id) {
	return (player[layer].clickables[id])
}

function setClickableState(layer, id, state) {
	player[layer].clickables[id] = state
}

function getGridData(layer, id) {
	return (player[layer].grid[id])
}

function setGridData(layer, id, data) {
	player[layer].grid[id] = data
}

function upgradeEffect(layer, id) {
	return (tmp[layer].upgrades[id].effect)
}

function challengeEffect(layer, id) {
	return (tmp[layer].challenges[id].rewardEffect)
}

function buyableEffect(layer, id) {
	return (tmp[layer].buyables[id].effect)
}

function levelableEffect(layer, id) {
	if (tmp[layer].levelables[id].effect != decimalOne) {
		if (layer != "pet") {
			return (tmp[layer].levelables[id].effect)
		} else if (((player.points.gte(1e100) || hasMilestone("ip", 24))) && !inChallenge("ip", 13)) {
			return (tmp[layer].levelables[id].effect)
		}
	}
	return [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)]
}

function clickableEffect(layer, id) {
	return (tmp[layer].clickables[id].effect)
}

function achievementEffect(layer, id) {
	return (tmp[layer].achievements[id].effect)
}

function gridEffect(layer, id) {
	return (gridRun(layer, 'getEffect', player[layer].grid[id], id))
}