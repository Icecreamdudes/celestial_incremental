var tree = [["h", "r", "f", "p"], ["t", "g", "pe", "gh", "rf"], ["de", "m", "cb", "d"]]

addLayer("i", {
    name: "Incremental", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "START THE GAME", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }
    },
    automate() {
        if (player.i.auto == true && hasMilestone("ip", 19))
        {
            buyUpgrade("i", 11)
            buyUpgrade("i", 12)
            buyUpgrade("i", 13)
            buyUpgrade("i", 14)
            buyUpgrade("i", 15)
            buyUpgrade("i", 16)
            buyUpgrade("i", 17)
            buyUpgrade("i", 18)
            buyUpgrade("i", 19)
            buyUpgrade("i", 21)
        }  
    },
    nodeStyle() {
        return {
            "width": 400,
            "height": 400,
            'min-height': '200px',
            'min-width': '400px',
            'border-radius': '0%',
        }
    },
    tooltip: "",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.startedGame == false && player.tab == "i")
        {
            player.startedGame = true
        }

        if (player.startedGame == true && player.c.cutscene1 == false)
        {
            player.gain = new Decimal(1)
        }

        if (player.tab == "i")
        {
            player.universe = 1
        }
        if (player.tab == "in")
        {
            player.universe = 2
        }
        if (player.tab == "po")
        {
            player.universe = 0
        }
        if (player.tab == "c")
        {
            player.universe = -1
        }

        //music control
        if (player.universe == 1 && player.startedGame && options.musicToggle && !(inChallenge("ip", 11) || inChallenge("ip", 12) || inChallenge("ip", 13) || inChallenge("ip", 14) || inChallenge("ip", 15) || inChallenge("ip", 16) || inChallenge("ip", 17) || inChallenge("ip", 18)) )
        {
            playAndLoopAudio("music/universe1.mp3", options.musicVolume/10);
        } else if (player.universe == 1 && (inChallenge("ip", 11) || inChallenge("ip", 12) || inChallenge("ip", 13) || inChallenge("ip", 14) || inChallenge("ip", 15) || inChallenge("ip", 16) || inChallenge("ip", 17) || inChallenge("ip", 18)) && options.musicToggle)
        {
            playAndLoopAudio("music/challenge.mp3", options.musicVolume/10);
        } else
        {
            stopAudio();
        }

        
        //Celestial Point boosts
        player.gain = player.gain.mul(player.r.rankEffect)
        player.gain = player.gain.mul(player.r.tierEffect)
        player.gain = player.gain.mul(buyableEffect("f", 11))
        player.gain = player.gain.mul(buyableEffect("f", 12))
        player.gain = player.gain.mul(buyableEffect("f", 13))
        player.gain = player.gain.mul(buyableEffect("f", 14))
        player.gain = player.gain.mul(buyableEffect("f", 15))
        player.gain = player.gain.mul(buyableEffect("f", 16))
        player.gain = player.gain.mul(buyableEffect("f", 17))
        player.gain = player.gain.mul(buyableEffect("f", 18))
        player.gain = player.gain.mul(player.r.tetrEffect)
        if (hasUpgrade("p", 11)) player.gain = player.gain.mul(3)
        if (hasUpgrade("p", 12)) player.gain = player.gain.mul(upgradeEffect("p", 12))
        player.gain = player.gain.mul(buyableEffect("f", 17))
        player.gain = player.gain.mul(player.f.factorPowerEffect)
        player.gain = player.gain.mul(buyableEffect("t", 15))
        player.gain = player.gain.mul(buyableEffect("g", 14))
        player.gain = player.gain.mul(player.gh.grasshopperEffects[0])
        if (hasMilestone("r", 13)) player.gain = player.gain.mul(player.r.pentMilestone3Effect)
        player.gain = player.gain.mul(buyableEffect("m", 14))
        if (player.cb.effectActivate) player.gain = player.gain.mul(player.cb.levelEffect)
        player.gain = player.gain.mul(player.cb.commonPetEffects[0][0])
        player.gain = player.gain.mul(player.d.diceEffects[0])
        if (!inChallenge("ip", 16)) player.gain = player.gain.mul(player.rf.abilityEffects[0])
        player.gain = player.gain.mul(player.ad.antimatterEffect)
        player.gain = player.gain.div(player.pe.pestEffect[0])
        if (inChallenge("ip", 13)) player.gain = player.gain.pow(0.75)
        if (inChallenge("ip", 13) || player.po.hex) player.gain = player.gain.mul(player.h.hexPointsEffect[0])
        if (inChallenge("ip", 14)) player.gain = player.gain.div(player.r.challengeIVEffect)
        if (inChallenge("ip", 15)) player.gain = player.gain.pow(0.9)
        if (hasUpgrade("d", 13)) player.gain = player.gain.mul(upgradeEffect("d", 13))
        if (hasUpgrade("d", 17)) player.gain = player.gain.mul(upgradeEffect("d", 17))
        player.gain = player.gain.div(player.po.pointHalt)
        if (inChallenge("ip", 16)) player.gain = player.gain.pow(0.03)
        if (inChallenge("ip", 16)) player.gain = player.gain.mul(player.rf.abilityEffects[0])
        if (hasUpgrade("rf", 16)) player.gain = player.gain.mul(upgradeEffect("rf", 16))
        if (inChallenge("ip", 18)) player.gain = player.gain.pow(0.4)
        if (player.de.antidebuffIndex.eq(0)) player.gain = player.gain.mul(player.de.antidebuffEffect)
        if (inChallenge("tad", 11)) player.gain = player.gain.pow(0.45)
        if (inChallenge("tad", 11)) player.gain = player.gain.pow(buyableEffect("de", 11))
        if (inChallenge("tad", 11)) player.gain = player.gain.mul(player.de.tavPointsEffect)
        if (hasUpgrade("de", 15)) player.gain = player.gain.mul(upgradeEffect("de", 15))
        if (hasUpgrade("bi", 11)) player.gain = player.gain.pow(1.1)
        player.gain = player.gain.mul(buyableEffect("gh", 31))
        player.gain = player.gain.mul(player.id.infinityPowerEffect2)
        

        if (inChallenge("ip", 18) && player.points.gt(1))
        {
            player.points = player.points.sub(player.points.mul(0.9 * delta))
        }

        player.points = player.points.add(player.gain.mul(delta))

        if (player.subtabs["i"]['stuff'] == 'Portal' && player.tab != "in")
        {
            player.tab = "po"
            player.subtabs["i"]['stuff'] = 'Features'
        }
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Feature I",
            unlocked() { return true },
            description: "Unlocks Ranks.",
            cost: new Decimal(10),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        }, 
        12:
        {
            title: "Feature II",
            unlocked() { return hasUpgrade("i", 11) },
            description: "Unlocks Factors.",
            cost: new Decimal(40),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        13:
        {
            title: "Tetr",
            unlocked() { return hasUpgrade("i", 12) },
            description: "Unlocks Tetr (In ranks).",
            cost: new Decimal(2500),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        14:
        {
            title: "Prestige",
            unlocked() { return hasUpgrade("i", 13) },
            description: "Unlocks Prestige.",
            cost: new Decimal(150000),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        15:
        {
            title: "Power Factors",
            unlocked() { return hasUpgrade("i", 14) },
            description: "Unlocks Power Factors (In factors).",
            cost: new Decimal(4e10),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        16:
        {
            title: "Trees",
            unlocked() { return hasUpgrade("i", 15) },
            description: "Unlocks Trees.",
            cost: new Decimal(1e15),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        17:
        {
            title: "Grass",
            unlocked() { return hasUpgrade("i", 16) },
            description: "Unlocks Grass.",
            cost: new Decimal(1e20),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        18:
        {
            title: "Pent",
            unlocked() { return hasUpgrade("i", 17) },
            description: "Unlocks Pent (in ranks).",
            cost: new Decimal(1e28),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        19:
        {
            title: "Check Back",
            unlocked() { return hasUpgrade("i", 18) },
            description: "Unlocks Check Back.",
            cost: new Decimal(1e100),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        21:
        {
            title: "Portal",
            unlocked() { return hasUpgrade("i", 19) },
            description: "Unlocks The Portal.",
            cost: new Decimal(1e150),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        22:
        {
            title: "Steel",
            unlocked() { return hasUpgrade("i", 21) && hasUpgrade("bi", 106)},
            description: "Unlocks Steelie reset layer (in grasshop).",
            cost: new Decimal("1e575"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        23:
        {
            title: "Crystallize",
            unlocked() { return hasUpgrade("i", 22) && hasUpgrade("bi", 106)},
            description: "Unlocks Crysstallize reset layer (in grasshop).",
            cost: new Decimal("1e700"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
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
            "Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("i", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["tree", tree],
                ]

            },
            "Portal": {
                buttonStyle() { return { 'color': 'black', 'border-color': 'purple', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', } },
                unlocked() { return hasUpgrade("i", 21) || hasUpgrade('ad', 13)},
                content:
                [
                ]

            },
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                        ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23]]],
                ]

            },
            "Settings": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                    [
                        ["blank", "25px"],
                        ["row", [
                        ["raw-html", function () { return "<button class=opt onclick=save()>Save</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('autosave')>Autosave</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=hardReset()>HARD RESET</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]],
                    ["row", [
                        ["raw-html", function () { return "<button class=opt onclick=exportSave()>Export to clipboard</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=importSave()>Import</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('offlineProd')>Offline Prod</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]],
                    ["row", [
                        ["raw-html", function () { return "<button class=opt onclick=switchTheme()>Change Theme</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('musicToggle'); needsCanvasUpdate = true>Toggle Music</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<button class=opt onclick=toggleOpt('toggleHotkey'); needsCanvasUpdate = true>Toggle Hotkeys</button>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "</td><td><div style=margin: 0 10px><input type=range id=volume name=Music Volume min=1 max=10 value=10 oninput=updateMusicVolume()><br>"}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "Volume: " + options.musicVolume}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Autosave: " + options.autosave}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Offline Production: " + options.offlineProd}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Music Toggle: " + options.musicToggle}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Hotkey Toggle: " + options.toggleHotkey}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "Playtime: " + formatTime(player.timePlayed)}, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<a href=https://discord.gg/icecreamdude-s-incremental-games-850817562040467556>Join the Discord!</a>"}, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                    ]
            },
        },
    }, 

    tabFormat: [
         ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return true }
})
function callAlert(message, imageUrl, imagePosition = 'top') {
    return new Promise((resolve) => {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Create modal message
        const modalMessage = document.createElement('p');
        modalMessage.innerHTML = message.replace(/\n/g, '<br>'); // Replace '\n' with a line break

        // Append modal message to modal content
        modalContent.appendChild(modalMessage);

        // If imageUrl is provided and imagePosition is 'top', create image element and append it to modal content before the message
        if (imageUrl && imagePosition === 'top') {
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl; // Set image source
            modalContent.insertBefore(imageElement, modalMessage);
        }

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Next';
        closeButton.addEventListener('click', closeModal);

        // Append close button to modal content
        modalContent.appendChild(closeButton);

        // If imageUrl is provided and imagePosition is 'bottom', create image element and append it to modal content after the message and button
        if (imageUrl && imagePosition === 'bottom') {
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl; // Set image source
            modalContent.appendChild(imageElement);
        }

        // Append modal content to modal container
        modalContainer.appendChild(modalContent);

        // Append modal container to body
        document.body.appendChild(modalContainer);

        // Show the modal
        modalContainer.style.display = 'flex';
        modalContainer.style.alignItems = 'center';
        modalContainer.style.justifyContent = 'center';

        // Apply background color and increase width
        modalContent.style.background = '#ccc'; // Grey background
        modalContent.style.width = '30%'; // Adjust the width as needed

        // Function to close the modal
        function closeModal() {
            modalContainer.style.display = 'none';
            // Optionally, remove the modal from the DOM after closing
            document.body.removeChild(modalContainer);
            resolve();
        }
    });
}