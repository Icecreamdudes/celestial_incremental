var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    nodeStyle() {
        if (options.menuType == 'Tab') return {display: "none !important"}
        return {}
    },
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: 
    [
        ["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]
    ],
    previousTab: "",
    leftTab: true,
})