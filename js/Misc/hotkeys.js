addLayer("hk", {
    name: "Hotkeys", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HK", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    tooltip: "Hotkeys",
    color: "white",

    tabFormat: [
        ["display-text","Hotkeys",{ fontSize: "24px" }],
        ["display-text","Hotkeys only work in their respective universes."],
        // ["column",() => keyTable('global')]
        ["microtabs","stuff",{'border':'none'}],
        "blank",
        ["clickable",11],

    ],

    microtabs: {
        stuff: {
            'Global': {
                content: [["column",() => keyTable('global')]],
            },
            'U1': {
                content: [["column",() => keyTable('U1')]],
            },
            'U2': {
                content: [["column",() => keyTable('U2')]],
            },
            'U3': {
                content: [["column",() => keyTable('U3')]],
            },
            'A1': {
                content: [["column",() => keyTable('A1')]],
            },
            'A2': {
                content: [["column",() => keyTable('A2')]],
            },
            'D1': {
                content: [["column",() => keyTable('D1')]],
            },
            'α': {
                content: [["column",() => keyTable('UA')]],
            },
            'β': {
                content: [["column",() => keyTable('UB')]],
            },
            'ε': {
                content: [["column",() => keyTable('DS')]],
            },
            // 'ζ': {
            //     content: [["column",() => keyTable('UZ')]],
            // },
        }
    },
    clickables: {
        11: {
            title: "Return to Settings",
            canClick: true,
            onClick() {
                player.tab = "settings"
            },
            style: { width: '306px', minHeight: '60px', color: "var(--textColor)", background: "var(--miscButton)", fontSize: "9px", lineHeight: "1.1", borderRadius: '0', border: "3px solid var(--miscButtonDisable)"},
        }
    },
    layerShown() { return true }
})



function keyTable(uniID) {
    let table = []
    if(uniID == 'global') {
        for(u in universes){ //sort global hotkeys by universe
            for(k in knownHotkeys.global) { 
                hk = knownHotkeys.global[k]
                if(hk.uni == u)
                    table.push(["row",[
                        formatKey(hk.key,layers[hk.layer]),
                                ["raw-html","<div style='width:300px;'>"+hk.description+"</div>"]
                        ],{'border-style':'solid'}
                    ])            
            }
        }
    }
    else for(r in universes[uniID].tree) { //sort hotkeys by row order in universe
        for(node of universes[uniID].tree[r]) {
            if(layers[node].hotkeys)
                for(hk of layers[node].hotkeys) {
                        if(knownHotkeys[uniID][hk.key] && !hk.global) table.push(["row",[
                            formatKey(hk.key,layers[node]),
                            ["raw-html","<div style='width:300px;'>"+hk.description+"</div>"]
                        ],{'border-style':'solid'}
                    ])
                }
            if(layers[node].innerNodes) {
               for(innerRow in layers[node].innerNodes){
                    for(innerNodeIndex in layers[node].innerNodes[innerRow]){
                        let innerNode = layers[node].innerNodes[innerRow][innerNodeIndex]
                        if(layers[innerNode].hotkeys) for(hk of layers[innerNode].hotkeys) {
                                if(knownHotkeys[uniID][hk.key] && !hk.global) table.push(["row",[
                                    formatKey(hk.key,layers[innerNode]),
                                    ["raw-html","<div style='width:300px;'>"+hk.description+"</div>"]
                                ],{'border-style':'solid'}
                            ])
                        }
                    }
               }
            }
        }
    }
    // console.log(table)
    return table
}


function formatKey(keyStr, layer) {

    let basicKeyStyle = {'font-family':'monospace','font-size':'16px','display':'block','width':'24px','height':'24px','color':'black','align-content':'center','border-style':'solid','margin':'4px','border-color':'rgba(0, 0, 0, 0.3)'}
    let keyStyle = layer.nodeStyle ? 
        {...basicKeyStyle,'background-color': layer.color,...readData(layer.nodeStyle)} :
        {...basicKeyStyle,'background-color': layer.color}
    let keyIcons = []

    keyStyle.transform = ''

    if(keyStr.startsWith('ctrl+'))
    {
        keyIcons.push(["display-text","Ctrl", keyStyle])
    }

    if(keyStr.toLowerCase() !== keyStr)
    {
        keyIcons.push(["display-text","⇧", keyStyle])   
    }
    keyIcons.push(["display-text",hk.key.toUpperCase(), keyStyle])
    return ["row",keyIcons]
}

