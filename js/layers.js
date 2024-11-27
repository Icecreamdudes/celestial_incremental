var tree = [["h", "r", "f", "p"], ["t", "g", "pe", "pol", "gh", "rf"], ["de", "m", "cb", "d"], ["rm", "oi"]]
var gwa = [["gt"]]

addLayer("i", {
    name: "Incremental", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "1", // This appears on the layer's node. Default is the id with the first letter capitalized
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
            background: "linear-gradient(315deg, #bababa 0%, #efefef 100%)",
            "background-origin": "border-box",
            "border-color": "#151515",
        };
    },
    tooltip: "Universe 1 - Overworld",
    branches: ["in"],
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

        if (player.tab == "cb")
        {
            if (options.newMenu == false) player.universe = 0.5
            player.musuniverse = 0.5
        }
        if (player.tab == "i")
        {
            if (options.newMenu == false) player.universe = 1
            player.musuniverse = 1
        }
        if (player.tab == "in")
        {
            if (options.newMenu == false) player.universe = 2
            player.musuniverse = 2
        }
        if (player.tab == "cp")
        {
            if (options.newMenu == false) player.universe = 1.5
            player.musuniverse = 1.5
        }
        if (player.tab == "po")
        {
            if (options.newMenu == false) player.universe = 0
            player.musuniverse = 0
        }
        if (player.tab == "c")
        {
            if (options.newMenu == false) player.universe = -1
            player.musuniverse = -1
        }

        //music control
        if (player.musuniverse == 1 && player.startedGame && options.musicToggle && !(inChallenge("ip", 11) || inChallenge("ip", 12) || inChallenge("ip", 13) || inChallenge("ip", 14) || inChallenge("ip", 15) || inChallenge("ip", 16) || inChallenge("ip", 17) || inChallenge("ip", 18) || inChallenge("tad", 11)) )
        {
            playAndLoopAudio("music/universe1.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 1 && (inChallenge("ip", 11) || inChallenge("ip", 12) || inChallenge("ip", 13) || inChallenge("ip", 14) || inChallenge("ip", 15) || inChallenge("ip", 16) || inChallenge("ip", 17) || inChallenge("ip", 18) || inChallenge("tad", 11)) && options.musicToggle)
        {
            playAndLoopAudio("music/tav.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 0 && options.musicToggle)
        {
            playAndLoopAudio("music/portal.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 2 && options.musicToggle)
        {
            playAndLoopAudio("music/universe2.mp3", options.musicVolume/10);
        } else if (player.musuniverse == 0.5 && options.musicToggle)
        {
            playAndLoopAudio("music/checkback.mp3", options.musicVolume/10);

        } else if (player.musuniverse == -1 && options.musicToggle)
        {
            if (player.c.currentCutscene == 0 || player.c.currentCutscene == 1 || player.c.currentCutscene == 3 || player.c.currentCutscene == 6 || player.c.currentCutscene == 7 || player.c.currentCutscene == 9 || player.c.currentCutscene == 11 || player.c.currentCutscene == 12)
            {
               playAndLoopAudio("music/cutscenePiano.mp3", options.musicVolume/10);
            } else if (player.c.currentCutscene == 2 || player.c.currentCutscene == 4 || player.c.currentCutscene == 5 || player.c.currentCutscene == 8 || player.c.currentCutscene == 10 || player.c.currentCutscene == 13)
            {
                playAndLoopAudio("music/cutsceneBox.mp3", options.musicVolume/10);
            }
        }
        else if (player.musuniverse == 1.5 && options.musicToggle)
        {
            playAndLoopAudio("music/alt-uni1.mp3", options.musicVolume/10);
        } else
        {
            stopAudio();
        }

        if (player.tab == "cp" || player.tab == "ar" || player.tab == "pr" || player.tab == "an" || player.tab == "rt" || player.tab == "rg" || player.tab == "gs" || player.tab == "oi" || player.tab == "a1u" || player.tab == "a1s")
        {
            startRain("#1486ff");
        }
         else
        {
            stopRain();
        }

        //Celestial Point boosts
        player.gain = new Decimal(1)
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
        if (inChallenge("ip", 16)) player.gain = player.gain.pow(0.05)
        if (inChallenge("ip", 16)) player.gain = player.gain.mul(player.rf.abilityEffects[0])
        if (hasUpgrade("rf", 16)) player.gain = player.gain.mul(upgradeEffect("rf", 16))
        if (inChallenge("ip", 18)) player.gain = player.gain.pow(0.4)
        if (player.de.antidebuffIndex.eq(0)) player.gain = player.gain.mul(player.de.antidebuffEffect)
        if (inChallenge("tad", 11)) player.gain = player.gain.pow(0.45)
        if (inChallenge("tad", 11)) player.gain = player.gain.pow(buyableEffect("de", 11))
        if (inChallenge("tad", 11)) player.gain = player.gain.mul(player.de.tavPointsEffect)
        if (hasUpgrade("de", 15) && inChallenge("tad", 11)) player.gain = player.gain.mul(upgradeEffect("de", 15))
        if (player.pol.pollinatorsIndex == 1) player.gain = player.gain.mul(player.pol.pollinatorsEffect[0])
        if (hasUpgrade("bi", 11)) player.gain = player.gain.pow(1.1)
        player.gain = player.gain.mul(buyableEffect("gh", 31))
        player.gain = player.gain.mul(player.id.infinityPowerEffect2)
        player.gain = player.gain.mul(player.r.timeCubeEffects[0])
        player.gain = player.gain.mul(player.ca.replicantiEffect3)
        if (inChallenge("ip", 18) && player.points.gt(player.points.mul(0.9 * delta)))
        {
            player.points = player.points.sub(player.points.mul(0.9 * delta))
        }

        if (player.r.timeReversed)
        {
            player.gain = player.gain.mul(0)
            player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(0)
            player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(0)
            player.t.leavesPerSecond = player.t.leavesPerSecond.mul(0)
            player.g.grassVal = player.g.grassVal.mul(0)
            player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(0)
            player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.mul(0)
            player.m.codeExperienceToGet = player.m.codeExperienceToGet.mul(0)
            player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(0)

            player.points = player.points.div(player.points.add(1).log10().mul(0.1).add(1).mul(delta))
        }

        if (player.po.realmMods) player.gain = player.gain.pow(0.2)
        player.points = player.points.add(player.gain.mul(delta))

        player.gain = player.gain.div(player.po.halterEffects[0])
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.div(player.po.halterEffects[2])
        player.t.leavesPerSecond = player.t.leavesPerSecond.div(player.po.halterEffects[3])
        player.t.treesToGet = player.t.treesToGet.div(player.po.halterEffects[4])
        player.g.grassVal = player.g.grassVal.div(player.po.halterEffects[5])

        if (player.subtabs["i"]['stuff'] == 'Portal' && player.tab != "in")
        {
            player.po.lastUniverse = 'i'
            player.tab = "po"
            player.subtabs["i"]['stuff'] = 'Features'
        }
    },
    bars: {
    },
    upgrades: {
        1:
        {
            title: ":gwa:",
            unlocked() { return (!hasUpgrade("i", 11) && player.points.gte(96)) || hasUpgrade("i", 1)},
            description: "Gwagwagwa.",
            cost: new Decimal(96),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
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
            title: "Pollinate",
            unlocked() { return player.in.unlockedBreak},
            description: "Use the experience of debuffs and pests to create Pollinators.",
            cost: new Decimal("1e450"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        23:
        {
            title: "Steel",
            unlocked() { return hasUpgrade("i", 22) && hasUpgrade("bi", 106)},
            description: "Unlocks Steelie reset layer (in grasshop).",
            cost: new Decimal("1e800"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        24:
        {
            title: "Crystallize",
            unlocked() { return hasUpgrade("i", 23) && hasUpgrade("bi", 106)},
            description: "Unlocks Crystallize reset layer (in prestige).",
            cost: new Decimal("1e1000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        25:
        {
            title: "Productive Pollination",
            unlocked() { return hasUpgrade("i", 24) && hasUpgrade("bi", 106)},
            description: "Unlocks more Pollinator upgrades.",
            cost: new Decimal("1e1200"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        26:
        {
            title: "Time Reversal",
            unlocked() { return hasUpgrade("i", 25) && hasUpgrade("bi", 106)},
            description: "Unlocks Time Reversal (in ranks layer).",
            cost: new Decimal("1e1400"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        27:
        {
            title: "Pentomation",
            unlocked() { return hasUpgrade("i", 26) && hasUpgrade("bi", 106)},
            description: "Automatically gain pent without resetting.",
            cost: new Decimal("1e1600"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        28:
        {
            title: "2nd OTF slot...",
            unlocked() { return hasUpgrade("i", 27) && hasUpgrade("bi", 106)},
            description: "Gain a 2nd OTF slot. (doesn't stack with tav's domain)",
            cost: new Decimal("1e1800"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        29:
        {
            title: "Rage Power",
            unlocked() { return (hasUpgrade("i", 28) && hasUpgrade("bi", 106) && player.po.hex && player.ca.unlockedCante) || hasUpgrade("i", 29)},
            description: "Unlock Rage Power (requires hex, in hex).",
            cost: new Decimal("1e3333"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        31:
        {
            title: "Auto CDPs",
            unlocked() { return (hasUpgrade("i", 28) && hasUpgrade("bi", 106) && player.po.dice && player.ca.unlockedCante && player.ev.evolutionsUnlocked[5]) || hasUpgrade("i", 31)},
            description: "Gain 5% challenge dice points per second.",
            cost: new Decimal("1e4600"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        37:
        {
            title: "Challenge I.",
            unlocked() { return inChallenge("ip", 11) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e11000"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        38:
        {
            title: "Challenge II.",
            unlocked() { return inChallenge("ip", 12) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e10500"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        39:
        {
            title: "Challenge III.",
            unlocked() { return inChallenge("ip", 13) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e2750"),
            currencyLocation() { return player },
            currencyDisplayName: "Celestial Points",
            currencyInternalName: "points",
        },
        41:
        {
            title: "Challenge IV.",
            unlocked() { return inChallenge("ip", 14) && player.cap.reqSelect.eq(0) && hasUpgrade("bi", 28)},
            description: ".",
            cost: new Decimal("1e8000"),
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
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 1], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23]]],
                    ["row", [["upgrade", 24], ["upgrade", 25], ["upgrade", 26], ["upgrade", 27], ["upgrade", 28], ["upgrade", 29]]],
                    ["row", [["upgrade", 31]]],
                    ["row", [["upgrade", 37], ["upgrade", 38], ["upgrade", 39], ["upgrade", 41]]],
                    ["blank", "25px"],
                    ["tree", gwa],
                ]
            },
            "Portal": {
                buttonStyle() { return { 'color': 'black', 'border-color': 'purple', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', } },
                unlocked() { return hasUpgrade("i", 21) || hasUpgrade('ad', 13)},
                content: []
            },
            "Settings": settingsMicrotab,
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
        // Check if a modal already exists on the page
        if (document.querySelector('.modal-container')) {
            return; // If a modal is already present, exit the function
        }

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
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 81 && (hasUpgrade("cp", 18) || player.universe != 1.5) && hasUpgrade("ad", 13) && options.toggleHotkey) {
        if (!options.newMenu) {
            player.tab = "i"
        } else {
            player.universe = 1
        }
    }
    if(event.keyCode == 65 && hasUpgrade("cp", 18) && hasUpgrade("ad", 13) && options.toggleHotkey) {
        if (!options.newMenu) {
            player.tab = "cp"
        } else {
            player.universe = 1.5
        }
    }
    if(event.keyCode == 87 && (hasUpgrade("cp", 18) || player.universe != 1.5) && hasUpgrade("ad", 13) && options.toggleHotkey) {
        if (!options.newMenu) {
            player.tab = "in"
        } else {
            player.universe = 2
        }
    }
});
