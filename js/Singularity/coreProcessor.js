﻿addLayer("cop", {
    name: "Core Processor", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() { return !player.ma.matosDefeated ? "CP" : "<s>CP"; }, // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        processedCoreStrength: new Decimal(-1),
        processedCoreFuel: new Decimal(-1),
        processedCorePrime: new Decimal(0),
        processedCoreStarmetalValue: new Decimal(0),
        processedCoreInnateEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        processedCoreInnateEffectsText: "",
        processedCorePrimedEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        processedCorePrimedEffectsText: "",

        processedCoreColorFuel: "",
        processedCoreColorStrength: "",
        processedCoreColorPrime: "",

        unprocessCoreOnReset: false,
        processingCore: false,
        processedCoreIndex: new Decimal(0), 
    }
    },
    automate() {
    },
    nodeStyle() {
        return !player.ma.matosDefeated ? {
            background: "linear-gradient(120deg, #6b1919 0%, #000000 100%)",
            "background-origin": "border-box",
            "border-color": "#260300",
            "color": "#8c3129",
        }: {
            background: "linear-gradient(-120deg, #000000 0%, #1a1a1a 100%)",
            "background-origin": "border-box",
            "border-color": "#000000",
            "color": "grey",
        };
    },
    tooltip: "Core Processor",
    branches: [["coa", "#000000"]],
    color()  {
        return !player.ma.matosDefeated ? "#8c3129" : "#000000";
    },
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.ma.matosDefeated) {
            player.cop.processedCoreStrength = new Decimal(-1)
            player.cop.processedCoreFuel = new Decimal(-1)
            player.cop.processedCorePrime = new Decimal(0)
            player.cop.processedCoreStarmetalValue = new Decimal(0)
            player.cop.processedCoreInnateEffects = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)]
            player.cop.processedCoreInnateEffectsText = ""
        player.cop.processedCorePrimedEffects = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)]
        player.cop.processedCorePrimedEffectsText = ""

        player.cop.processedCoreColorFuel = ""
        player.cop.processedCoreColorStrength = ""
        player.cop.processedCoreColorPrime = ""

        }

        player.cop.processedCoreColorStrength = player.coa.strengthColors[player.cop.processedCoreStrength]
        player.cop.processedCoreColorFuel = player.coa.fuelColors[player.cop.processedCoreFuel]
        player.cop.processedCoreColorPrime = player.coa.primeColors[player.cop.processedCorePrime]

        player.cop.processedCoreInnateEffects = layers.coa.determineEffect(player.cop.processedCoreFuel, player.cop.processedCoreStrength)
        player.cop.processedCoreInnateEffectsText = layers.coa.determineText(player.cop.processedCoreFuel, player.cop.processedCoreStrength)

        if (player.cop.processedCorePrime.gte(1)) { 
            player.cop.processedCorePrimedEffects = layers.coa.determinePrimedEffect(player.cop.processedCorePrime, player.cop.processedCoreStrength)
        } else {
            player.cop.processedCorePrimedEffects = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)]
        }
        player.cop.processedCorePrimedEffectsText = layers.coa.determinePrimedText(player.cop.processedCorePrime, player.cop.processedCoreStrength)

        if ((player.tab == "cop" && player.subtabs["cop"]["stuff"] == "Processor") || (player.tab == "cs" && player.subtabs["cs"]["stuff"] == "Main")) setCoreColors(document.getElementById("processedCore"), player.cop.processedCoreColorFuel, player.cop.processedCoreColorStrength, player.cop.processedCoreColorPrime); //null for now
    },
    unprocessCore()
    {
        if (player.coa.coreCount.lt(10))
        {
            for (let i = 0; i < player.coa.coreOccupied.length; i++)
            {
                if (player.coa.coreOccupied[i] == false)
                {
                    player.coa.coreOccupied[i] = true
                    player.coa.coreFuelSources[i] = player.cop.processedCoreFuel
                    player.coa.coreStrengths[i] = player.cop.processedCoreStrength
                    player.coa.corePrimes[i] = player.cop.processedCorePrime
                    player.coa.coreStarmetalValue[i] = player.cop.processedCoreStarmetalValue

                    player.ra.unequippedRadiationValue[i] = player.ra.equippedRadiationValue
                    player.ra.unequippedRadiationOutput[i] = player.ra.equippedRadiationValue.mul(Decimal.mul(Decimal.add(2, Math.random()), 0.1))

                    player.coa.coreCount = player.coa.coreCount.add(1)
                    break;
                }
            }
        }

        player.cop.processingCore = false
        player.cop.processedCoreStrength = new Decimal(-1)
        player.cop.processedCoreFuel = new Decimal(-1)
        player.cop.processedCorePrime = new Decimal(0)

        player.ra.equippedRadiationValue = new Decimal(0)
        player.ra.equippedRadiationOutput = new Decimal(0)

        player.cop.processedCoreInnateEffects = []
        player.cop.processedCoreInnateEffectsText = ""

        player.cop.processedCoreStarmetalValue = new Decimal(0)
        
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "s"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        101: {
            title() { return "<div id=core0 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 0
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        102: {
            title() { return "<div id=core1 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 1
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        103: {
            title() { return "<div id=core2 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 2
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        104: {
            title() { return "<div id=core3 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 3
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        105: {
            title() { return "<div id=core4 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 4
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        106: {
            title() { return "<div id=core5 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 5
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        107: {
            title() { return "<div id=core6 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 6
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        108: {
            title() { return "<div id=core7 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 7
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        109: {
            title() { return "<div id=core8 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 8
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        111: {
            title() { return "<div id=core9 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.coa.coreIndex = 9
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        112: {
            title() { return "Process this core." },
            canClick() { return !player.cop.processingCore && player.coa.coreStrengths[player.coa.coreIndex].neq(-1) && player.coa.coreStrengths[player.coa.coreIndex].neq(-1) },
            unlocked() { return true },
            onClick() {
                player.cop.processedCoreIndex = player.cop.coreIndex

                player.cop.processedCoreStrength = player.coa.coreStrengths[player.coa.coreIndex]
                player.cop.processedCoreFuel = player.coa.coreFuelSources[player.coa.coreIndex]
                player.cop.processedCorePrime = player.coa.corePrimes[player.coa.coreIndex]
                player.cop.processingCore = true
                
                player.coa.coreFuelSources[player.coa.coreIndex] = new Decimal(-1)
                player.coa.coreStrengths[player.coa.coreIndex] = new Decimal(-1)
                player.coa.corePrimes[player.coa.coreIndex] = new Decimal(-1)
                player.coa.coreOccupied[player.coa.coreIndex] = false
                player.coa.coreCount = player.coa.coreCount.sub(1)

                player.ra.equippedRadiationValue = player.ra.unequippedRadiationValue[player.coa.coreIndex]
                player.ra.equippedRadiationOutput = player.ra.equippedRadiationValue.mul(Decimal.add(2, Math.random()))

                player.cop.processedCoreStarmetalValue = player.cop.processedCoreStarmetalValue.add(player.coa.coreStarmetalValue[player.coa.coreIndex])
                player.coa.coreStarmetalValue[player.coa.coreIndex] = new Decimal(0)

                player.ra.unequippedRadiationOutput[player.coa.coreIndex] = new Decimal(0)
                player.ra.unequippedRadiationValue[player.coa.coreIndex] = new Decimal(0)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '140px', "min-height": '70px', borderRadius: '10px 0px 0px 10px' },
        },
        113: {
            title() { return "Unprocess core on singularity reset." },
            canClick() { return !player.cop.unprocessCoreOnReset },
            unlocked() { return true },
            onClick() {
                player.cop.unprocessCoreOnReset = true
            },
            style: { width: '140px', "min-height": '70px', borderRadius: '0px' },
        },
        114: {
            title() { return "Keep core on singularity reset." },
            canClick() { return player.cop.unprocessCoreOnReset  },
            unlocked() { return true },
            onClick() {
                player.cop.unprocessCoreOnReset = false
            },
            style: { width: '140px', "min-height": '70px', borderRadius: '0px 10px 10px 0px' },
        },
    },
    bars: {
    },
    upgrades: { 
    },
    buyables: {

    },
    milestones: {
   
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Processor": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Current core being processed: " + player.coa.primes[player.cop.processedCorePrime] + " " + player.coa.strengths[player.cop.processedCoreStrength] + " " + player.coa.fuels[player.cop.processedCoreFuel] + " Singularity Core"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", function () { return " <div id=processedCore class=singularityCore><div class=centerCircle></div>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["column", [
                            ["raw-html", function () { return "Innate Effects:<br>" + player.cop.processedCoreInnateEffectsText }, { "color": "white", "text-align": "justify", "font-size": "16px", "font-family": "monospace" }],
                        ]], 
                    ]],
                    ["blank", "25px"],
                    ["row", [["clickable", 112], ["clickable", 113], ["clickable", 114]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 101],["clickable", 102],["clickable", 103],["clickable", 104],["clickable", 105],["clickable", 106],["clickable", 107],["clickable", 108],["clickable", 109],["clickable", 111]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.coa.strengths[player.coa.coreStrengths[player.coa.coreIndex]] + " " + player.coa.fuels[player.coa.coreFuelSources[player.coa.coreIndex]] + " Singularity Core"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Innate Effects:<br>" + player.coa.coreInnateEffectText[player.coa.coreIndex] }, { "color": "white", "text-align": "justify", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return hasUpgrade("s", 21) ? "Current Prime: " + formatWhole(player.cop.processedCorePrime) : ""}, { "color": "white", "text-align": "justify", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return hasUpgrade("s", 21) ? "Primed Effects (All based on singularity time):<br>" + player.cop.processedCorePrimedEffectsText : ""}, { "color": "white", "text-align": "justify", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                ]
            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain " + format(player.s.singularityPointsToGet) + " singularity points on reset. (Based on infinity points)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.ca.defeatedCante || player.s.highestSingularityPoints.gt(0) }
})
