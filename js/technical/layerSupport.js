var layers = {}

const decimalZero = new Decimal(0)
const decimalOne = new Decimal(1)
const decimalNaN = new Decimal(NaN)

const defaultGlow = "#ff0000"


function layerShown(layer){
    return tmp[layer].layerShown;
}

var LAYERS = Object.keys(layers);

var hotkeys = {};

var maxRow = 0;

function updateHotkeys()
{
    hotkeys = {};
    for (layer in layers){
        hk = layers[layer].hotkeys
        if (hk){
            for (id in hk){
				hotkeys[hk[id].key] = hk[id]
                hotkeys[hk[id].key].layer = layer
                hotkeys[hk[id].key].id = id
                if (hk[id].unlocked === undefined)
                    hk[id].unlocked = true
            }
        }
    }
}

var ROW_LAYERS = {}
var TREE_LAYERS = {}
var OTHER_LAYERS = {}

function updateLayers(){
    LAYERS = Object.keys(layers);
    ROW_LAYERS = {}
    TREE_LAYERS = {}
    OTHER_LAYERS = {}
    for (layer in layers){
        setupLayer(layer)
    }
    for (row in OTHER_LAYERS) {
        OTHER_LAYERS[row].sort((a, b) => (a.position > b.position) ? 1 : -1)
        for (layer in OTHER_LAYERS[row])
            OTHER_LAYERS[row][layer] = OTHER_LAYERS[row][layer].layer 
    }
    for (row in TREE_LAYERS) {
        TREE_LAYERS[row].sort((a, b) => (a.position > b.position) ? 1 : -1)
            for (layer in TREE_LAYERS[row])
            TREE_LAYERS[row][layer] = TREE_LAYERS[row][layer].layer
    }
    let treeLayers2 = []
    for (x = 0; x < maxRow + 1; x++) {
        if (TREE_LAYERS[x]) treeLayers2.push(TREE_LAYERS[x])
    }
    TREE_LAYERS = treeLayers2
    updateHotkeys()
}

function setupLayer(layer){
    layers[layer].layer = layer
    if (layers[layer].upgrades){
        setRowCol(layers[layer].upgrades)
        for (thing in layers[layer].upgrades){
            if (isPlainObject(layers[layer].upgrades[thing])){
                layers[layer].upgrades[thing].id = thing
                layers[layer].upgrades[thing].layer = layer
                if (layers[layer].upgrades[thing].unlocked === undefined)
                    layers[layer].upgrades[thing].unlocked = true
            }
        }
    }
    if (layers[layer].milestones){
        for (thing in layers[layer].milestones){
            if (isPlainObject(layers[layer].milestones[thing])){
                layers[layer].milestones[thing].id = thing
                layers[layer].milestones[thing].layer = layer
                if (layers[layer].milestones[thing].unlocked === undefined)
                    layers[layer].milestones[thing].unlocked = true
            }
        }
    }
    if (layers[layer].achievements){
        setRowCol(layers[layer].achievements)
        for (thing in layers[layer].achievements){
            if (isPlainObject(layers[layer].achievements[thing])){
                layers[layer].achievements[thing].id = thing
                layers[layer].achievements[thing].layer = layer
                if (layers[layer].achievements[thing].unlocked === undefined)
                    layers[layer].achievements[thing].unlocked = true
            }
        }
    }
    if (layers[layer].challenges){
        setRowCol(layers[layer].challenges)
        for (thing in layers[layer].challenges){
            if (isPlainObject(layers[layer].challenges[thing])){
                layers[layer].challenges[thing].id = thing
                layers[layer].challenges[thing].layer = layer
                if (layers[layer].challenges[thing].unlocked === undefined)
                    layers[layer].challenges[thing].unlocked = true
                if (layers[layer].challenges[thing].canClick === undefined)
                    layers[layer].challenges[thing].canClick = true
                if (layers[layer].challenges[thing].completionLimit === undefined)
                    layers[layer].challenges[thing].completionLimit = 1
                else if (layers[layer].challenges[thing].marked === undefined) 
                    layers[layer].challenges[thing].marked = function() {return maxedChallenge(this.layer, this.id)}

            }
        }
    }
    if (layers[layer].buyables){
        layers[layer].buyables.layer = layer
        setRowCol(layers[layer].buyables)
        for (thing in layers[layer].buyables){
            if (isPlainObject(layers[layer].buyables[thing])){
                layers[layer].buyables[thing].id = thing
                layers[layer].buyables[thing].layer = layer
                if (layers[layer].buyables[thing].unlocked === undefined)
                    layers[layer].buyables[thing].unlocked = true
                layers[layer].buyables[thing].canBuy = function() {return canBuyBuyable(this.layer, this.id)}
                if (layers[layer].buyables[thing].purchaseLimit === undefined) layers[layer].buyables[thing].purchaseLimit = new Decimal(Infinity)
        
            }  
    
        }
    }

    if (layers[layer].levelables){
        layers[layer].levelables.layer = layer
        if (layers[layer].levelables.index === undefined) layers[layer].levelables.index = 0
        if (layers[layer].levelables.toggle === undefined) layers[layer].levelables.toggle = true
        setRowCol(layers[layer].levelables)
        for (thing in layers[layer].levelables){
            if (isPlainObject(layers[layer].levelables[thing])){
                layers[layer].levelables[thing].id = thing
                layers[layer].levelables[thing].layer = layer
                if (layers[layer].levelables[thing].unlocked === undefined) layers[layer].levelables[thing].unlocked = true
                layers[layer].levelables[thing].canBuy = function() {return canBuyLevelable(this.layer, this.id)}
                if (layers[layer].levelables[thing].xpReq === undefined) layers[layer].levelables[thing].xpReq = new Decimal(Infinity)
                if (layers[layer].levelables[thing].levelLimit === undefined) layers[layer].levelables[thing].levelLimit = new Decimal(Infinity)
                if (layers[layer].levelables[thing].barShown === undefined) layers[layer].levelables[thing].barShown = true
            }  
        }
    }

    if (layers[layer].clickables){
        layers[layer].clickables.layer = layer
        setRowCol(layers[layer].clickables)
        for (thing in layers[layer].clickables){
            if (isPlainObject(layers[layer].clickables[thing])){
                layers[layer].clickables[thing].id = thing
                layers[layer].clickables[thing].layer = layer
                if (layers[layer].clickables[thing].unlocked === undefined)
                    layers[layer].clickables[thing].unlocked = true
            }
        }  
    }

    if (layers[layer].bars){
        layers[layer].bars.layer = layer
        for (thing in layers[layer].bars){
            layers[layer].bars[thing].id = thing
            layers[layer].bars[thing].layer = layer
            if (layers[layer].bars[thing].unlocked === undefined)
                layers[layer].bars[thing].unlocked = true
        }  
    }

    if (layers[layer].infoboxes){
        for (thing in layers[layer].infoboxes){
            layers[layer].infoboxes[thing].id = thing
            layers[layer].infoboxes[thing].layer = layer
            if (layers[layer].infoboxes[thing].unlocked === undefined)
                layers[layer].infoboxes[thing].unlocked = true
        }  
    }
    
    if (layers[layer].grid) {
        layers[layer].grid.layer = layer
        if (layers[layer].grid.getUnlocked === undefined)
            layers[layer].grid.getUnlocked = true
        if (layers[layer].grid.getCanClick === undefined)
            layers[layer].grid.getCanClick = true

    }
    if (layers[layer].startData) {
        data = layers[layer].startData()
        if (data.best !== undefined && data.showBest === undefined) layers[layer].showBest = true
        if (data.total !== undefined && data.showTotal === undefined) layers[layer].showTotal = true
    }

    if(!layers[layer].componentStyles) layers[layer].componentStyles = {}
    if(layers[layer].symbol === undefined) layers[layer].symbol = layer.charAt(0).toUpperCase() + layer.slice(1)
    if(layers[layer].unlockOrder === undefined) layers[layer].unlockOrder = []
    if(layers[layer].gainMult === undefined) layers[layer].gainMult = decimalOne
    if(layers[layer].gainExp === undefined) layers[layer].gainExp = decimalOne
    if(layers[layer].directMult === undefined) layers[layer].directMult = decimalOne
    if(layers[layer].type === undefined) layers[layer].type = "none"
    if(layers[layer].base === undefined || layers[layer].base <= 1) layers[layer].base = 2
    if(layers[layer].softcap === undefined) layers[layer].softcap = new Decimal("e1e7")
    if(layers[layer].softcapPower === undefined) layers[layer].softcapPower = new Decimal("0.5")
    if(layers[layer].displayRow === undefined) layers[layer].displayRow = layers[layer].row
    if(layers[layer].name === undefined) layers[layer].name = layer
    if(layers[layer].layerShown === undefined) layers[layer].layerShown = true
    if(layers[layer].glowColor === undefined) layers[layer].glowColor = defaultGlow

    let row = layers[layer].row

    let displayRow = layers[layer].displayRow

    if(!ROW_LAYERS[row]) ROW_LAYERS[row] = {}
    if(!TREE_LAYERS[displayRow] && !isNaN(displayRow)) TREE_LAYERS[displayRow] = []
    if(!OTHER_LAYERS[displayRow] && isNaN(displayRow)) OTHER_LAYERS[displayRow] = []

    ROW_LAYERS[row][layer]=layer;
    let position = (layers[layer].position !== undefined ? layers[layer].position : layer)
    
    if (!isNaN(displayRow) || displayRow < 0) TREE_LAYERS[displayRow].push({layer: layer, position: position})
    else OTHER_LAYERS[displayRow].push({layer: layer, position: position})

    if (maxRow < layers[layer].displayRow) maxRow = layers[layer].displayRow
    
}


function addLayer(layerName, layerData, tabLayers = null){ // Call this to add layers from a different file!
    layers[layerName] = layerData
    layers[layerName].isLayer = true
    if (tabLayers !== null)
    {
        let format = {}
        for (id in tabLayers) {
            layer = tabLayers[id]
            format[(layers[layer].name ? layers[layer].name : layer)] = {
                embedLayer: layer,
                buttonStyle() {
                    if (!tmp[this.embedLayer].nodeStyle) return {'border-color': tmp[this.embedLayer].color}
                    else {
                        style = tmp[this.embedLayer].nodeStyle
                        if (style['border-color'] === undefined) style['border-color'] = tmp[this.embedLayer].color
                        return style
                    } 
                },
                unlocked() {return tmp[this.embedLayer].layerShown},
            }       
        }
        layers[layerName].tabFormat = format
    }
}

function addNode(layerName, layerData){ // Does the same thing, but for non-layer nodes
    layers[layerName] = layerData
    layers[layerName].isLayer = false
}

// If data is a function, return the result of calling it. Otherwise, return the data.
function readData(data, args=null){
	if ((!!data && data.constructor && data.call && data.apply))
		return data(args);
	else
		return data;
}

function setRowCol(upgrades) {
    if (upgrades.rows && upgrades.cols) return
    let maxRow = 0
    let maxCol = 0
    for (up in upgrades) {
        if (!isNaN(up)) {
            if (Math.floor(up/10) > maxRow) maxRow = Math.floor(up/10)
            if (up%10 > maxCol) maxCol = up%10
        }
    }
    upgrades.rows = maxRow
    upgrades.cols = maxCol
}

function someLayerUnlocked(row){
    for (layer in ROW_LAYERS[row])
        if (player[layer].unlocked)
            return true
    return false
}


// This isn't worth making a .ts file over
const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3


addLayer("info-tab", {
    tabFormat: ["info-tab"],
    row: "otherside"
})

addLayer("options-tab", {
    tabFormat: ["options-tab"],
    row: "otherside"
})

addLayer("changelog-tab", {
    tabFormat() {return ([["raw-html", modInfo.changelog]])},
    row: "otherside"
})