var layoutInfo = {
    startTab: "none",
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

addNode("none", {
    tabFormat: [
        ["tree", ["i"]],
    ],
})