var canvas;
var ctx;

window.addEventListener("resize", (_=>resizeCanvas()));

function retrieveCanvasData() {
	let treeCanv = document.getElementById("treeCanvas")
	let treeTab = document.getElementById("treeTab")
	if (treeCanv===undefined||treeCanv===null) return false;
	canvas = treeCanv;
	ctx = canvas.getContext("2d");
	return true;
}

function resizeCanvas() {
	if (!retrieveCanvasData()) return
	canvas.width = 0;
    canvas.height = 0;
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
		drawTree();
}


var colors_theme

function drawTree() {
	if (!retrieveCanvasData()) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (layer in layers){
		if (tmp[layer].layerShown == true && tmp[layer].branches){
			for (branch in tmp[layer].branches)
				{
					drawTreeBranch(layer, tmp[layer].branches[branch])
				}
		}
		drawComponentBranches(layer, tmp[layer].upgrades, "upgrade-")
		drawComponentBranches(layer, tmp[layer].buyables, "buyable-")
		drawComponentBranches(layer, tmp[layer].clickables, "clickable-")

	}
}

function drawComponentBranches(layer, data, prefix) {
	for(id in data) {
		if (data[id].branches) {
			for (branch in data[id].branches)
			{
				drawTreeBranch(id, data[id].branches[branch], prefix + layer + "-")
			}

		}
	}

}

function isVisibleInViewport(element) {
    let rect = element.getBoundingClientRect()
	let par = document.documentElement.getBoundingClientRect()
	if (document.getElementById("layerHolder").contains(element)) {
		par = document.getElementById("layerHolder").getBoundingClientRect()
	}
	if (document.getElementById("scrCon") != null) {
		if (document.getElementById("scrCon").contains(element)) {
			par = document.getElementById("scrCon").getBoundingClientRect()
		}
	}
	if (
		rect.top >= par.top - (rect.height/2) &&
		rect.left >= par.left - (rect.width/2) &&
		rect.bottom <= par.bottom + (rect.height/2) &&
		rect.right <= par.right + (rect.width/2)
	) return true
	return false
}

function drawTreeBranch(num1, data, prefix) { // taken from Antimatter Dimensions & adjusted slightly
	let num2 = data
	let color_id = 1
	let width = 15
	if (Array.isArray(data)){
		num2 = data[0]
		color_id = data[1]
		width = data[2] || width
	}

	if(typeof(color_id) == "number")
		color_id = colors_theme[color_id]
	if (prefix) {
		num1 = prefix + num1
		num2 = prefix + num2
	}
	if (document.getElementById(num1) == null || document.getElementById(num2) == null) return
	if (!isVisibleInViewport(document.getElementById(num1)) || !isVisibleInViewport(document.getElementById(num2))) return

	let start = document.getElementById(num1).getBoundingClientRect();
    let end = document.getElementById(num2).getBoundingClientRect();
    let x1 = start.left + (start.width / 2) + document.body.scrollLeft;
    let y1 = start.top + (start.height / 2) + document.body.scrollTop;
    let x2 = end.left + (end.width / 2) + document.body.scrollLeft;
    let y2 = end.top + (end.height / 2) + document.body.scrollTop;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.strokeStyle = color_id
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
