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
        ["display-text","Global Hotkeys"],
        ["microtabs","stuff"],
        ["display-text","test"]
    ],

    microtabs: {
        stuff: {
            first: {
                content: [["clickable",11]],
            },
            second: {
                content: [["display-text", function() {return 'hi 2'}]],
            },
        }
    },

    clickables: {
        11: {
            title() { return "TEST"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                parsedHotkeys(hotkeys)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #6e64c4", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        }  
    },  

    layerShown() { return true }
})

function parsedHotkeys(hks) {
    for(hk in hks) {
            console.log(hk,hks[hk])
        }
        return []
}