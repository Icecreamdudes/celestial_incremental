let cutsceneActive = false;
let cutsceneID = 0;
let cutsceneIndex = 0;
let cutsceneDialogue = null;
let cutsceneOptions = null;

// Save cutscene state to localStorage
function saveCutsceneState() {
    localStorage.setItem('cutsceneState', JSON.stringify({
        cutsceneActive,
        cutsceneID,
        cutsceneIndex,
        cutsceneDialogue,
        cutsceneOptions
    }));
}

// Load cutscene state from localStorage
function loadCutsceneState() {
    const state = localStorage.getItem('cutsceneState');
    if (state) {
        try {
            const obj = JSON.parse(state);
            cutsceneActive = !!obj.cutsceneActive;
            cutsceneID = obj.cutsceneID || 0;
            cutsceneIndex = obj.cutsceneIndex || 0;
            cutsceneDialogue = obj.cutsceneDialogue || null;
            cutsceneOptions = obj.cutsceneOptions || null;
        } catch (e) {
            cutsceneActive = false;
            cutsceneID = 0;
            cutsceneIndex = 0;
            cutsceneDialogue = null;
            cutsceneOptions = null;
        }
    } else {
        cutsceneActive = false;
        cutsceneID = 0;
        cutsceneIndex = 0;
        cutsceneDialogue = null;
        cutsceneOptions = null;
    }
}

// Call this on page load to restore state
loadCutsceneState();

// Restore cutscene if active
if (cutsceneActive && cutsceneDialogue) {
    showCutscene(cutsceneDialogue, Object.assign({}, cutsceneOptions, { resume: true }));
}

function showCutscene(dialogue, options = {}) {
    cutsceneActive = true;
    cutsceneDialogue = dialogue;
    cutsceneOptions = options;
    cutsceneID = (typeof options.cutsceneID !== 'undefined')
        ? options.cutsceneID
        : Date.now() + Math.floor(Math.random() * 1000000);

    let idx = (options.resume && cutsceneIndex > 0) ? cutsceneIndex : 0;
    cutsceneIndex = idx;
    saveCutsceneState();

    const old = document.getElementById('cutscene-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'cutscene-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        left: 0, top: 0, width: '100vw', height: '100vh',
        background: options.background || 'rgba(0,0,0,0.7)',
        zIndex: 99999,
        pointerEvents: 'auto'
    });

    // Overlay image helper
    let overlayImg = null;
    function setOverlayImage(src, opacity) {
        if (!overlayImg) {
            overlayImg = document.createElement('img');
            Object.assign(overlayImg.style, {
                display: 'block',
                margin: '0 auto',
                maxWidth: '60vw',
                maxHeight: '30vh',
                pointerEvents: 'none',
            });
            overlay.appendChild(overlayImg);
        }
        overlayImg.src = src || '';
        overlayImg.style.display = src ? 'block' : 'none';
        overlayImg.style.opacity = (opacity !== undefined) ? opacity : 1;
    }
    if (options.overlayImage) {
        setOverlayImage(options.overlayImage, options.overlayImageOpacity);
    }

    // Text box
    const box = document.createElement('div');
    Object.assign(box.style, {
        background: '#222',
        color: '#fff',
        borderRadius: '24px',
        margin: '0 auto',
        padding: '48px 48px 36px 48px',
        minWidth: '520px',
        maxWidth: '900px',
        minHeight: '160px',
        fontFamily: 'monospace',
        fontSize: '28px',
        boxShadow: '0 0 48px #000',
        position: 'relative',
        top: '320px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    });
    overlay.appendChild(box);

    const portrait = document.createElement('img');
    if (options.portrait) {
        portrait.src = options.portrait;
        Object.assign(portrait.style, {
            width: '128px',
            height: '128px',
            objectFit: 'cover',
            borderRadius: '18px',
            marginRight: '36px',
            border: '3px solid #fff',
            background: '#444'
        });
        box.appendChild(portrait);
    }

    const textArea = document.createElement('div');
    textArea.style.flex = '1';
    textArea.style.fontSize = '28px';
    box.appendChild(textArea);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    Object.assign(nextBtn.style, {
        position: 'absolute',
        right: '36px',
        bottom: '24px',
        fontSize: '24px',
        padding: '10px 28px',
        borderRadius: '12px',
        border: 'none',
        background: '#047ce4',
        color: '#fff',
        cursor: 'pointer'
    });
    box.appendChild(nextBtn);

    // Skip button (new)
    const skipBtn = document.createElement('button');
    skipBtn.textContent = 'Skip';
    Object.assign(skipBtn.style, {
        position: 'absolute',
        right: '36px',
        top: '24px',
        fontSize: '18px',
        padding: '6px 14px',
        borderRadius: '10px',
        border: 'none',
        background: '#e04b4b',
        color: '#fff',
        cursor: 'pointer'
    });
    box.appendChild(skipBtn);

    document.body.appendChild(overlay);

    let typing = false;
    function typeLine(line, cb) {
        typing = true;
        textArea.innerHTML = '';
        // If line contains HTML show instantly
        if (/<[a-z][\s\S]*>/i.test(line)) {
            textArea.innerHTML = line;
            typing = false;
            if (cb) cb();
            return;
        }
        let i = 0;
        function typeChar() {
            if (i <= line.length) {
                textArea.textContent = line.slice(0, i);
                i++;
                setTimeout(typeChar, 18);
            } else {
                typing = false;
                if (cb) cb();
            }
        }
        typeChar();
    }

    function cleanupAndEnd() {
        if (overlay && overlay.parentNode) overlay.remove();
        cutsceneActive = false;
        cutsceneID = 0;
        cutsceneIndex = 0;
        cutsceneDialogue = null;
        cutsceneOptions = null;
        saveCutsceneState();
        if (typeof stopAudio === 'function') stopAudio();
        if (options.onEnd) options.onEnd();
    }

    function showNext() {
        if (typing) return;
        if (idx < dialogue.length) {
            cutsceneIndex = idx + 1;
            saveCutsceneState();
            let entry = dialogue[idx];
            if (typeof entry === 'object' && entry.overlayImage) {
                setOverlayImage(entry.overlayImage, entry.overlayImageOpacity);
            } else if (options.overlayImage) {
                setOverlayImage(options.overlayImage, options.overlayImageOpacity);
            } else {
                setOverlayImage('', 1);
            }
            if (typeof entry === 'object') {
                if (entry.portrait) {
                    portrait.src = entry.portrait;
                    portrait.style.display = '';
                } else if (portrait) {
                    portrait.style.display = 'none';
                }
                typeLine(entry.text, null);
            } else {
                typeLine(entry, null);
            }
            idx++;
        } else {
            cleanupAndEnd();
        }
    }

    nextBtn.onclick = showNext;
    overlay.onclick = (e) => {
        if (e.target === overlay) showNext();
    };

    // Skip handlers
    skipBtn.onclick = () => {
        cleanupAndEnd();
    };
    // Expose global skip for console: window.skipCutscene()
    window.skipCutscene = function () {
        if (cutsceneActive) cleanupAndEnd();
    };

    // Start at correct index
    if (idx < dialogue.length) {
        let entry = dialogue[idx];
        if (typeof entry === 'object' && entry.overlayImage) {
            setOverlayImage(entry.overlayImage, entry.overlayImageOpacity);
        } else if (options.overlayImage) {
            setOverlayImage(options.overlayImage, options.overlayImageOpacity);
        } else {
            setOverlayImage('', 1);
        }
        if (typeof entry === 'object') {
            if (entry.portrait) {
                portrait.src = entry.portrait;
                portrait.style.display = '';
            } else if (portrait) {
                portrait.style.display = 'none';
            }
            typeLine(entry.text, null);
        } else {
            typeLine(entry, null);
        }
        idx++;
    }
    showNext();
}

function showCinematicCutscene(dialogue, options = {}) {
    // dialogue: [{ text: "...", duration: 2000, style: { ... } }, ...]
    // options: { background, overlayImage, onEnd, cutsceneID }
    let idx = (options.resume && typeof options.cutsceneIndex === 'number') ? options.cutsceneIndex : 0;

    // Cinematic cutscene state
    window.cinematicCutsceneActive = true;
    cutsceneActive = true;
    window.cinematicCutsceneID = (typeof options.cutsceneID !== 'undefined')
        ? options.cutsceneID
        : Date.now() + Math.floor(Math.random() * 1000000);
    window.cinematicCutsceneIndex = idx;
    window.cinematicCutsceneDialogue = dialogue;
    window.cinematicCutsceneOptions = options;

    // Save cinematic cutscene state to localStorage
    function saveCinematicCutsceneState() {
        localStorage.setItem('cinematicCutsceneState', JSON.stringify({
            cinematicCutsceneActive: window.cinematicCutsceneActive,
            cinematicCutsceneID: window.cinematicCutsceneID,
            cinematicCutsceneIndex: window.cinematicCutsceneIndex,
            cinematicCutsceneDialogue: window.cinematicCutsceneDialogue,
            cinematicCutsceneOptions: window.cinematicCutsceneOptions
        }));
    }

    // Remove previous overlay if exists
    let overlay = document.getElementById('cinematic-cutscene-overlay');
    if (overlay) overlay.remove();

    overlay = document.createElement('div');
    overlay.id = 'cinematic-cutscene-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        left: 0, top: 0, width: '100vw', height: '100vh',
        background: options.background || 'rgba(0,0,0,1)',
        zIndex: 100000,
        pointerEvents: 'auto',
        overflow: 'hidden'
    });

    // Overlay image (optional)
    let overlayImg = null;
    if (options.overlayImage) {
        overlayImg = document.createElement('img');
        overlayImg.src = options.overlayImage;
        Object.assign(overlayImg.style, {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '80vw',
            maxHeight: '80vh',
            pointerEvents: 'none',
            opacity: options.overlayImageOpacity !== undefined ? options.overlayImageOpacity : 1
        });
        overlay.appendChild(overlayImg);
    }

    // Cinematic text area
    const textArea = document.createElement('div');
    Object.assign(textArea.style, {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        minHeight: '60px',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: '3vw',
        fontWeight: 'bold',
        textShadow: '0 0 24px #000, 0 0 8px #222',
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'pre-line'
    });
    overlay.appendChild(textArea);

    document.body.appendChild(overlay);

    function showEntry(entry) {
        textArea.innerHTML = '';
        // Support HTML in text
        if (entry.style) Object.assign(textArea.style, entry.style);
        else Object.assign(textArea.style, {
            fontSize: '3vw',
            color: '#fff'
        });
        textArea.innerHTML = entry.text;
        // Overlay image per entry
        if (overlayImg) overlayImg.style.display = 'none';
        if (entry.overlayImage) {
            if (!overlayImg) {
                overlayImg = document.createElement('img');
                overlay.appendChild(overlayImg);
            }
            overlayImg.src = entry.overlayImage;
            overlayImg.style.display = '';
            overlayImg.style.opacity = entry.overlayImageOpacity !== undefined ? entry.overlayImageOpacity : 1;
        } else if (overlayImg) {
            overlayImg.style.display = options.overlayImage ? '' : 'none';
            overlayImg.style.opacity = options.overlayImageOpacity !== undefined ? options.overlayImageOpacity : 1;
        }
    }

    function nextEntry() {
        if (idx >= dialogue.length) {
            overlay.remove();
            window.cinematicCutsceneActive = false;
            cutsceneActive = false;
            window.cinematicCutsceneID = 0;
            window.cinematicCutsceneIndex = 0;
            window.cinematicCutsceneDialogue = null;
            window.cinematicCutsceneOptions = null;
            saveCinematicCutsceneState();
            if (typeof options.onEnd === 'function') options.onEnd();
            return;
        }
        let entry = dialogue[idx];
        showEntry(entry);
        window.cinematicCutsceneIndex = idx;
        saveCinematicCutsceneState();
        let duration = entry.duration !== undefined ? entry.duration : 2000;
        idx++;
        setTimeout(nextEntry, duration);
    }

    nextEntry();
}

// Restore cinematic cutscene if active (call this on page load)
(function restoreCinematicCutscene() {
    const state = localStorage.getItem('cinematicCutsceneState');
    if (state) {
        try {
            const obj = JSON.parse(state);
            if (obj.cinematicCutsceneActive && obj.cinematicCutsceneDialogue) {
                showCinematicCutscene(
                    obj.cinematicCutsceneDialogue,
                    Object.assign({}, obj.cinematicCutsceneOptions, {
                        resume: true,
                        cutsceneID: obj.cinematicCutsceneID,
                        cutsceneIndex: obj.cinematicCutsceneIndex
                    })
                );
            }
        } catch (e) {
            // Ignore restore errors
        }
    }
})();

// showCinematicCutscene(cinematicDialogue, { background: "#000"

// Example usage:
const cutsceneDialogue1 = [
    { text: "You wake up and feel sand under your skin.", },
    { text: "You find yourself in a vast desert of black sand.", },
    { text: "When you stood up, a dark, cloaked figure stood in front of you.", },
    { text: "Great. You're finally awake.", portrait: "resources/secret.png" },
    { text: "The figure's voice startled you.", },
    { text: "Where am I? Why couldn't I remember anything...", portrait: "resources/player.png" },
    { text: "You are in the overworld. A place where you have the freedom to control superphysical values as you wish.", portrait: "resources/secret.png" },
    { text: "As for your memories, they are gone. However, it is for the best.", portrait: "resources/secret.png" },
    { text: "Okay...? I'm kinda confused. I don't even know who I am...", portrait: "resources/player.png" },
    { text: "You are our creation. A being with the power to destroy all celestials.", portrait: "resources/secret.png" },
    { text: "Would I be able to learn about my past eventually?", portrait: "resources/player.png" },
    { text: "Yes, but it's complicated. You must follow our mission, and destroy all celestials.", portrait: "resources/secret.png" },
    { text: "As you go on in this mission, you will gradually learn more and more about your past.", portrait: "resources/secret.png" },
    { text: "Yeah.......", portrait: "resources/player.png" },
    { text: "I'm still confused.", portrait: "resources/player.png" },
    { text: "What is a celestial?", portrait: "resources/player.png" },
    { text: "Celestials are powerful beings that wreak havoc and destroy worlds.", portrait: "resources/secret.png" },
    { text: "They are a threat to the safety of this multiverse.", portrait: "resources/secret.png" },
    { text: "For ages we have had numerous attempts at destroying celestials...", portrait: "resources/secret.png" },
    { text: "...but they just kept on getting stronger, and stronger.", portrait: "resources/secret.png" },
    { text: "You are the ONLY chance we have at defeating the celestials.", portrait: "resources/secret.png " },
    { text: "So... Will you follow me on this mission?", portrait: "resources/secret.png" },
    { text: "Sure.", portrait: "resources/player.png" },
    { text: "Very well then. I know you will do a great job!", portrait: "resources/secret.png" },
    { text: "Remember: You are our creation.", portrait: "resources/secret.png" },
    { text: "For some strange reason, you have been given a strange sense of purpose.", },
    { text: "You don't know why, but you feel as though a number inside you is growing.", },
];
const cutsceneDialogue2 = [
    { text: "You notice the number reset back to zero.", },
    { text: "Congratulations. You have just performed your first reset.", portrait: "resources/secret.png" },
    { text: "You will be doing a lot of resets as you go on in this mission.", portrait: "resources/secret.png" },
    { text: "Your three primary sources of gaining power is by waiting, upgrading, and by resetting.", portrait: "resources/secret.png" },
    { text: "Patience is key to gaining power in this world.", portrait: "resources/secret.png" },
];
const cutsceneDialogue3 = [ //at tetr unlock
    { text: "What are these numbers that keep increasing?", portrait: "resources/player.png" },
    { text: "These are called superphysical values.", portrait: "resources/secret.png" },
    { text: "Superphysical values aren't able to be interacted with physically...", portrait: "resources/secret.png" },
    { text: "...but people with special powers called FORESIGHT can detect the presence of superphysical values.", portrait: "resources/secret.png" },
    { text: "It takes even more skill to utilize them to your advantage.", portrait: "resources/secret.png" },
    { text: "Only a select few non-celestials have the power to utilize superphysical values to their advantage.", portrait: "resources/secret.png" },
    { text: "You are one of those few.", portrait: "resources/secret.png" },
    { text: "I am also one as well...", portrait: "resources/secret.png" },
    { text: 'Cool. Glad to have been blessed with this "crazy" power then.', portrait: "resources/player.png" },
    { text: 'What can these "superphysical values" even do?', portrait: "resources/player.png" },
    { text: "Well, it would take a while until they will start affecting your physical strength.", portrait: "resources/secret.png" },
    { text: "However, it is very useful, especially for your mission.", portrait: "resources/secret.png" },
    { text: "Some celestials' cores have a certain superphysical barrier that can only be destroyed with superphysical values.", portrait: "resources/secret.png" },
    { text: "Destroying a celestial's core is the only known documented way of killing a celestial.", portrait: "resources/secret.png" },
    { text: "You will also be able to travel between worlds seamlessly using the power of superphysical values.", portrait: "resources/secret.png" },
    { text: "Multiple universes exist? That's nice.", portrait: "resources/player.png" },
    { text: "This endless desert seems kinda boring after all.", portrait: "resources/player.png" },
    { text: "Yep. There's plenty of worlds to travel to for your mission.", portrait: "resources/secret.png" },
    { text: "We will worry about that later though...", portrait: "resources/secret.png" },
];
const cutsceneDialogue4 = [ //at prestige
    { text: "Woah. That was one big reset.", portrait: "resources/player.png" },
    { text: "Yeah... Unfortunately there will be a lot more reset layers to go through...", portrait: "resources/secret.png" },
    { text: "To be honest, I don't really know if I have the patience to do this...", portrait: "resources/player.png" },
    { text: "You want to learn about your past, right...?", portrait: "resources/secret.png" },
    { text: "Yeah.", portrait: "resources/player.png" },
    { text: "You want a purpose to live... right???", portrait: "resources/secret.png" },
    { text: "Also yeah...", portrait: "resources/player.png" },
    { text: "Then lock in. I gotta go. You'll be alone for a bit.", portrait: "resources/secret.png" },
    { text: "I will return.", portrait: "resources/secret.png" },
];
const cutsceneDialogue5 = [ //factor power
    { text: "You notice the exponentially growing number of points.", },
    { text: "It gives you a twisted sense of pleasure.", },
    { text: "It is almost as if your sense of clarity has improved.", },
    { text: "However, you feel weary about this entire situation.", },
    { text: "Should you really trust this strange being?", },
    { text: "Either way, you seem to be trapped in this desert.", },
    { text: "You must proceed.", },
];
const cutsceneDialogue6 = [ //when you gain 1 tree
    { text: "A tree appears right in front of you.", },
    { text: "You sense a mild superphysical force eminate from the tree.", },
    { text: "The cloaked being reappears.", },
    { text: "I have returned. Looks like you made it to the trees.", portrait: "resources/secret.png"  },
    { text: "Are these trees superphysical? I can clearly see it right in front of me.", portrait: "resources/player.png" },
    { text: "These trees are physically visible, but are superphysical in nature.", portrait: "resources/secret.png"  },
    { text: "Only those with foresight can see and interact with this tree.", portrait: "resources/secret.png"  },
    { text: "Well, it's about time I tell you something.", portrait: "resources/secret.png"  },
    { text: "There have been many creations before you.", portrait: "resources/secret.png"  },
    { text: "They all failed. Some did well, but never really made it past a few celestials.", portrait: "resources/secret.png"  },
    { text: "However, our research has improved quite a bit. We genuinely believe you can defeat all the celestials.", portrait: "resources/secret.png"  },
    { text: "These trees that are growing... they are only there because of the works of your predecessor from a long, long, time ago.", portrait: "resources/secret.png"  },
    { text: "A lot of superphysical values you interact with have been utilized by many others just like you.", portrait: "resources/secret.png"  },
    { text: "What makes you special is that you can interact with ALL the superphysical values from countless universes.", portrait: "resources/secret.png"  },
    { text: "YOU are our only hope. You can't let us down.", portrait: "resources/secret.png"  },
    { text: "So you are forcing me to do this mission...", portrait: "resources/player.png" },
    { text: "You don't know it, but this is something you WANT to do.", portrait: "resources/secret.png"  },
    { text: "Trust me.", portrait: "resources/secret.png"  },

];
const cutsceneDialogue7 = [ //Grass
    { text: "You notice a small patch of grass appear near you.", },
    { text: "The grass slowly transforms into a forest, which looms over you.", },
    { text: "Many superphysical values you will encounter follow a specific theme.", portrait: "resources/secret.png"  },
    { text: "Trees... Forest... Grass... All of these are related to nature.", portrait: "resources/player.png"  },
    { text: "Yes. These would all be considered NATURAL superphysical values.", portrait: "resources/secret.png"  },
    { text: "What about points, and prestige points?", portrait: "resources/player.png"  },
    { text: "Those superphysical values would be considered ANCIENT superphysical values.", portrait: "resources/secret.png"  },

];
const cutsceneDialogue8 = [ //Grasshop
    { text: "You see grasshoppers spawn in front of you.", },
    { text: "They appear to be fertilizing the surrounding soil, and helping grass grow.", },
    { text: "Aren't grasshoppers supposed to eat the grass...", portrait: "resources/player.png"  },
    { text: "Well, these aren't supposed to be realistic.", portrait: "resources/secret.png"  },
    { text: "As a matter of fact, most superphysical values are abstract.", portrait: "resources/secret.png"  },
    { text: "That's why most people wouldn't even notice them.", portrait: "resources/secret.png"  },
    { text: "Can you create living beings from superphysical values?", portrait: "resources/player.png"  },
    { text: "Good question...", portrait: "resources/secret.png"  },

];
const cutsceneDialogue9 = [ //Check Back (plays marcel's song)
    { text: "Another being appears in the distance.", },
    { text: "It appears to be a man in a mech-suit, with a small white head appearing out. He is carrying a lot of clocks.", },
    { text: "Hello there. I am a friend of the cloak person. I don't know why they have to be so mysterious...", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'You can call me Marcel. I have a special "Gift" for you, if you can call it that.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "What's up with all the clocks?", portrait: "resources/player.png"  },
    { text: 'Those are the check back clocks. Devices that can channel special superphysical values.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'They produce XP at regular intervals, but you must claim them manually by resetting the clock.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'And this will all help me, right?', portrait: "resources/player.png"  },
    { text: 'Yeah. They would be able to aid in speeding up all your other superphysical values.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Isn't it kinda strange how superphysical values affect other superphysical values?", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Yeah...', portrait: "resources/player.png"  },
    { text: "Usually, superphysical values would be almost impossible to grow. Even with foresight.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "However, DEVELOPERS can create FRAMEWORKS to aid in the growth of superphysical values.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "I am one of those developers.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "We have foresight, but we couldn't really use superphysical values for our own benefit.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Instead, we find connections between superphysical values that others, like you, can use.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "For your mission, dozens and dozens of developers has aided in the creation of your framework.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "A framework is the guideline that guides your superphysical value gain.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Marcel... You're here.", portrait: "resources/secret.png"  },
    { text: "We have something to discuss.", portrait: "resources/secret.png"  },
    { text: "Alright. I'll help you out later. There's a lot more to explain.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Marcel hands you the clocks.", },
    { text: "Good luck. Make sure to take a break whenever you need it. Don't forget to check back.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Anyways, Marcel...", portrait: "resources/secret.png"  },
    { text: "The two dissapear through a portal.", },
    { text: "Your sense of purpose increases yet again.", },
    { text: "Countless amounts of people have worked to make this mission happen.", },
    { text: "Your predecessors. The developers. All put their life's effort into helping you destroy celestials.", },
    { text: "Now you are determined to complete this mission.", },

];
const cutsceneDialogue10 = [ //Portal
    { text: "The ground begins to shake violently.", },
    { text: "Sand gets blasted everywhere. A strange obelisk is revealed.", },
    { text: "There is writing on top of the obelisk that you cannot decipher.", },
    { text: "Additionally, also appears to be a filling orange bar on top as well.", },
    { text: "At eye level, there appears to be four buttons with symbols.", },
    { text: "The third and fourth button appear to be completely blacked out.", },
    { text: 'Marcel? Cloaked Man? Anyone there?', portrait: "resources/player.png"  },
    { text: "There was no response.", },
    { text: "You are all alone.", },

];
const cutsceneDialogue11 = [ //OTF Selection (Have it black out and play the cutscene piano music)
    { text: "Right as you click one of the buttons on the obelisk, the cloaked being reappears.", },
    { text: "I'm back. Sorry for the inconvenience.", portrait: "resources/secret.png"  },
    { text: "Me and Marcel had some serious business to take care of.", portrait: "resources/secret.png"  },
    { text: "The cloaked being takes a look at the obelisk."  },
    { text: "Interesting... I don't know what this is.", portrait: "resources/secret.png"  },
    { text: "You don't know what this is???", portrait: "resources/player.png"  },
    { text: "I thought you knew everything!", portrait: "resources/player.png"  },
    { text: "Well usually, combining multiple frameworks into one can have some unexpected results.", portrait: "resources/secret.png"  },
    { text: "Many new and strange superphysical values arise that I am unaware of.", portrait: "resources/secret.png"  },
    { text: "This could also be the work of a celestial, but that is pretty unlikely.", portrait: "resources/secret.png"  },
    { text: "Well damn, I thought you were omniscient this entire time.", portrait: "resources/player.png"  },
    { text: "I don't think that kind of power is attainable in this multiverse.", portrait: "resources/secret.png"  },
    { text: "This multiverse is so large, with so much history, it would be impossible to know everything.", portrait: "resources/secret.png"  },
    { text: "Celestials are only a mere fraction of this multiverse's problems.", portrait: "resources/secret.png"  },
    { text: "I'll tell you the story later.", portrait: "resources/secret.png"  },
    { text: "Oh, I do know what that giant bar is!", portrait: "resources/secret.png"  },
    { text: "What is it?", portrait: "resources/player.png"  },
    { text: "It shows your progress to reaching INFINITY.", portrait: "resources/secret.png"  },
    { text: "Woah woah woah. That doesn't really make any sense. Infinity???", portrait: "resources/player.png"  },
    { text: "The powers of a specific celestial have made it hard for you to get past a certain amount of points.", portrait: "resources/secret.png"  },
    { text: "That number is 2 raised to the 1024th power. In other words, 1.79e308.", portrait: "resources/secret.png"  },
    { text: "That's oddly specific...", portrait: "resources/player.png"  },
    { text: "You can break past that barrier once you defeat that celestial...", portrait: "resources/secret.png"  },
    { text: "The very first celestial you will fight.", portrait: "resources/secret.png"  },
    { text: "Once that bar reaches its capacity, you will be able to shift to the next universe.", portrait: "resources/secret.png"  },
    { text: "Celestials will be waiting for you.", portrait: "resources/secret.png"  },


];
const cutsceneDialogue12 = [ //Dice
   { text: "The obelisk changes form, and turns into a dice.", },
   { text: "You notice a strange superphysical energy eminate from the dice.", },
   { text: "The ticking from the check back clocks become significantly louder.", },
   { text: "Isn't that just so strange...", },

];
const cutsceneDialogue13 = [ //Rocket Fuel
   { text: "The obelisk changes form, and a giant canister takes place.", },
   { text: "A strange dark black liquid starts filling up the canister by a little bit.", },
   { text: "The grass glimmers ever so shinier.", },
   { text: "Isn't that just so strange...", },

];
const cutsceneDialogue14 = [ //infinity (orange bg)
   { text: "The bar fills up to it's limit, and a giant ray of light forms.", },
   { text: "You feel all your superphysical values get drained out completely.", },
   { text: "You notice everything around you turn transparent.", },
   { text: "The sky turns bright orange. A small glowing orb is presented in front of you.", },
   { text: "The cloaked being appears.", },
    { text: "What is going on???", portrait: "resources/player.png"  },
    { text: "This is a big crunch.", portrait: "resources/secret.png"  },
    { text: "A big crunch is happening because your celestial point amount has just exceeded the limit.", portrait: "resources/secret.png"  },
    { text: "Well that took long enough.", portrait: "resources/player.png"  },
    { text: "What is this orb then?", portrait: "resources/player.png"  },
    { text: "That, my friend, is an infinity point.", portrait: "resources/secret.png"  },
    { text: "An extremely powerful superphysical value if you use it right.", portrait: "resources/secret.png"  },
    { text: "The superphysical power from the infinity point feels familiar."  },
    { text: "When you go grab it, a flash fills your entire field of vision."  },
];
const cutsceneDialogue15 = [ //flashback (white bg, music box music)
   { text: "You see yourself in a large hall.", },
   { text: "Marcel is talking to two beings.", },
   { text: "One being with a white fog over their head, and another being with a black fog over their head.", },
   { text: "This appears to be a flashback. You are being presented with a vision of the past.", },
   { text: "My masters... We have lost another creation to ????.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
   { text: "I am sorry, but this job is just way too hard.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
   { text: "Don't worry. We have developed a new framework.", portrait: "resources/fogGuy1.png"  },
   { text: "oh really? What will it contain?", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
   { text: "It will contain everything. Every single superphysical value.", portrait: "resources/fogGuy1.png"  },
   { text: "Well I mean not really all of them...", portrait: "resources/fogGuy2.png"  }, 
   { text: "Be quiet... it contains all of the relevant ones.", portrait: "resources/fogGuy1.png"  },
   { text: "Well this has not been done before...", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
   { text: "How do you think the next creation will handle every single superphysical value?", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
   { text: "We channeled the power of ??? ???????? ????? into a vessel.", portrait: "resources/fogGuy2.png"  }, 
   { text: "This should give the next creation the ability to seamlessly traverse universes.", portrait: "resources/fogGuy2.png"  }, 
   { text: "We made this a deal with the infinity keeper. They should be working with us now.", portrait: "resources/fogGuy2.png"  }, 
   { text: "I told you they were a good pick!", portrait: "resources/fogGuy1.png"  },
   { text: "Bro... We legit only need them for their level of foresight.", portrait: "resources/fogGuy2.png"  }, 
   { text: "Otherwise there's no way I'd trust them.", portrait: "resources/fogGuy2.png"  }, 
   { text: "Whatever you say...", portrait: "resources/fogGuy1.png"  },
   { text: "Anyways Marcel. Are you interested in providing us with the check back framework?", portrait: "resources/fogGuy1.png"  },
   { text: "Sure. Why not.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
   { text: "Thanks. You are such a goated developer.", portrait: "resources/fogGuy1.png"  },
   { text: "Wait what??? The check back framework is horrible! Too much waiting in my opinion...", portrait: "resources/fogGuy2.png"  }, 
   { text: "That's very mean ??????...", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
   { text: "Well I guess we can use it, since some celestials have certain barriers that require that much waiting anyways.", portrait: "resources/fogGuy2.png"  }, 
   { text: "Anyways... Time to take the framework.", portrait: "resources/fogGuy1.png"  },
   { text: "One of the white fog beings raises their hand.", },
   { text: "Extremely powerful superphysical energy streams out of Marcel's body.", },
   { text: "He is left unconcious.", },
   { text: "He needed that nap anyways... Spent too much time awake staring at clocks all day long.", portrait: "resources/fogGuy1.png"  },
   { text: "The other fog guy chuckles.", },
   { text: "Alright. Time to work on the vessel.", portrait: "resources/fogGuy2.png"  },
   { text: "Another white flash hits you.", },
];
const cutsceneDialogue16 = [ //antimatter
    { text: "You find yourself in a vast, empty space, surrounded by an empty green sky.", },
    { text: "Ah, so you're awake!", portrait: "resources/secret.png"  },
    { text: "Yeah... I had a weird dream.", portrait: "resources/player.png"  },
    { text: "Looks like you are starting to connect with the past.", portrait: "resources/secret.png"  },
    { text: "I didn't really see myself though.", portrait: "resources/player.png"  },
    { text: "Marcel was talking to two beings whose face I wasn't able to see.", portrait: "resources/player.png"  },
    { text: "Well that's strange... Do you know what they were talking about?", portrait: "resources/secret.png"  },
    { text: "It's hard to remember.", portrait: "resources/player.png"  },
    { text: "Apparently, I will handle every single superphysical value out there.", portrait: "resources/player.png"  },
    { text: 'And then they started talking about some "Infinity Keeper".', portrait: "resources/player.png"  },
    { text: 'And that the "Infinity Keeper" couldn\'t be trusted...', portrait: "resources/player.png"  },
    { text: "The cloaked being is startled by your words.", },
    { text: "Couldn't be trusted?? After everything?", portrait: "resources/secret.png"  },
    { text: "Sorry... What else did they talk about?", portrait: "resources/secret.png"  },
    { text: 'They did some strange magic to Marcel. After that was done, I woke up.', portrait: "resources/player.png"  },
    { text: 'Who is the Infinity Keeper anyways?', portrait: "resources/player.png"  },
    { text: "The Infinity Keeper was the most powerful celestial hunter of all time...", portrait: "resources/secret.png"  },
    { text: "Defeating the original seven celestials. The celestials that once resided in this very universe.", portrait: "resources/secret.png"  },
    { text: "What is this world exactly? It seems different.", portrait: "resources/player.png"  },
    { text: "This is the second universe you will encounter in this mission.", portrait: "resources/secret.png"  },
    { text: "A world where seven celestials used to hide.", portrait: "resources/secret.png"  },
    { text: "Filled to the brim with antimatter, a very destructive superphysical force.", portrait: "resources/secret.png"  },
    { text: "Two celestials remain to be awakened.", portrait: "resources/secret.png"  },
    { text: "Good luck.", portrait: "resources/secret.png"  },
];
const cutsceneDialogue17 = [ //universe switching (gain rank 1 + inf milestone 1)
    { text: "A white flash of light strikes your eyes.", },
    { text: "You return to the vast desert of sand.", },
    { text: "The overworld.", },
    { text: "The place where you started your mission.", },
    { text: "You have just awakened the power of universe shifting.", },
    { text: "As long as you control superphysical values in that universe,", },
    { text: "Thinking about that universe can make you travel there.", },
];
const cutsceneDialogue18 = [ //pets
    { text: "A box appears from the sky. A pet is spawned from the crate.", },
    { text: "Marcel appears.", },
    { text: 'Well I guess that answers your question.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Yes, life can indeed be formed from superphysical values.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'However, it\'s different that what you may think.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'These pets gain life from the ultimate superphysical value: time itself.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Woah. Time is a superphysical value?', portrait: "resources/player.png" },
    { text: 'Yes it is. That is what I based my entire framework on.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Many have criticized the check back framework, due to the extremely long waits.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'I believe that time builds the strongest people.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Time exists everywhere. It can strengthen. It can kill. It can lead to decay. It can lead to growth.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Time is the ultimate superphysical value.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
];
const cutsceneDialogue19 = [ //8 infinities (challenges)
    { text: "The cloaked being appears.", },
    { text: "You notice your sense of duty increase rapidly.", },
    { text: "You are ready to face the the challenges of infinity.", portrait: "resources/secret.png" },
    { text: "Eight challenges that test your mastery of superphysical values.", portrait: "resources/secret.png" },
    { text: 'Woah. What would my reward be?', portrait: "resources/player.png" },
    { text: "There is no reward. Unless if you call meeting your first celestial an award...", portrait: "resources/secret.png" },
    { text: 'Great...', portrait: "resources/player.png" },
    { text: 'And beating this celestial will let me break the point limit, and that\'s a pretty good reward I guess.', portrait: "resources/player.png" },
    { text: "Very well then...", portrait: "resources/secret.png" },
    { text: "The cloaked being claps his hands, and a pillar appears.", },
    { text: "You go up to the pillar, and writings start to carve itself.", },
    { text: '"Challenge I: You can\'t pick an otherworldly feature."', },
    { text: "It's time to lock in.", },
];
const cutsceneDialogue20 = [ //beating first challenge
    { text: "The pillar glows yellow, and shoots a giant beam of light towards the sky.", },
    { text: "Another pillar appears.", },
    { text: "You feel your sense of duty increase again.", },
];
const cutsceneDialogue21 = [ //second challenge (pests, activates on grasshop reset)
    { text: "You notice a swarm of pests congregate all over the grass field.", },
    { text: "They start BRUTALLY MURDERING YOUR GRASSHOPPERS.", },
    { text: "They don't waste time. They literally grab their heads with their small hands and rip them right off.", },
    { text: "You realize that superphysical values can also harm you.", },
];
const cutsceneDialogue22 = [ //hex
    { text: "A veil of darkness stirs above your head.", },
    { text: "An invisible staircase made out of black fog is formed.", },
    { text: "Climbing the staircase brings you to a strange world above the clouds.", },
    { text: "It could possibly even be a new universe...", },
    { text: "It is dark, but also vibrant.", },
    { text: "You feel the presence of an entire world watch you.", },
    { text: "Isn't that just so strange...", },
];
const cutsceneDialogue23 = [ //challenge 5
    { text: "You can feel the presence of a new superphysical value: Challenge Dice Points.", },
    { text: "It makes you feel uneasy.", },
    { text: "It's almost as if you feel the presence of a higher being through this superphysical value.", },
    { text: "You start to feel dizzy and nauseous.", },
];
const cutsceneDialogue24 = [ //evo shard
    { text: "After constantly checking back at the check back clocks, you find a medium-sized shard.", },
    { text: "It glew purple and blue, and was slightly transparent.", },
    { text: "Marcel visits you.", },
    { text: 'So you finally found your first evolution shard.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'These physical items hold immense superphysical power.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Cool. I wanna make armor out of these!', portrait: "resources/player.png"  },
    { text: "Well that won't really help you....", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'So what do they do?', portrait: "resources/player.png"  },
    { text: "You can EVOLVE pets with these, hence the name.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Evolving pets will grant them with immense power.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "You will also gain new segments of the check back framework.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Just collect a little more and you'll be able to evolve your first pet.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
];
const cutsceneDialogue25 = [ //challenge 6
    { text: "You feel a very powerful wave of superphysical energy hit you.", },
    { text: "Your point gain has been halted to an extreme amount.", },
    { text: "You feel as if the gravity in the overworld has increased ten-fold.", },
    { text: "These challenges really are getting harder...", },
    { text: "A celestial is waiting for you...", },
    { text: "(Also big misconception: This challenge requires you to get PRESTIGE POINTS instead of POINTS.)", },
];
const cutsceneDialogue26 = [ //challenge 7 (plays when you gain an evolution shard while in c7) (also a flashback, so white bg + music box)
    { text: "A white flash brings you back to the large hall.", },
    { text: "This is yet another flashback.", },
    { text: "You see Marcel walk into the hall.", },
    { text: "We have made countless changes to the check back framework.", portrait: "resources/fogGuy1.png"  },
    { text: "Like what?", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "First, we have introduced the power of evolution shards.", portrait: "resources/fogGuy1.png"  },
    { text: "I've heard of those before. They are hard to come by, aren't they?", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "I know a woman who's foresight lets her create an almost unlimited supply of them.", portrait: "resources/fogGuy2.png"  },
    { text: "With evolution shards, you can evolve the check back pets. This would help superphysical value production.", portrait: "resources/fogGuy1.png"  },
    { text: "There's also paragon shards, and the one that comes after that, and after that as well...", portrait: "resources/fogGuy2.png"  },
    { text: "What else did you guys change?", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "That's up to you now, Marcel.", portrait: "resources/fogGuy2.png"  },
    { text: "Figure something out. Make us proud.", portrait: "resources/fogGuy2.png"  },
];
const cutsceneDialogue27 = [ //challenge 7 completion
    { text: "As you complete the seventh challenge, you can feel the floor vibrate rapidly.", },
    { text: "The final pillar rises up above the ground.", },
    { text: "This is it. After this, a celestial will visit.", },
];
const cutsceneDialogue28 = [ //challenge 8 completion (Tav music, tav color background)
    { text: "As the final pillar glows yellow and shoots a beam of light into the sky,", },
    { text: "The lights merge, and you feel an intense presence.", },
    { text: "The presence of a celestial.", },
    { text: "You brace yourself for the encounter, but are underwhelmed when you see the celestial.", },
    { text: "You see a humanoid being made of pure superphysical energy.", },
    { text: "He appears to be an teenage child with pale-blue skin, short height, and medium-length hair.", },
    { text: 'Hello...? Are you a celestial?', portrait: "resources/player.png"  },
    { text: "The being doesn't speak. He just looks at you, half in confusion, and half in awe.", },
    { text: 'Hello.......?', portrait: "resources/player.png"  },
    { text: "The being speaks.", },
    { text: "I have been waiting for you.", portrait: "resources/tav.png"  },
    { text: 'Yes... Hello. I am wondering if you are a celestial.', portrait: "resources/player.png"  },
    { text: "I am Tav, the Celestial of Limits. The weakest celestial in the entire multiverse.", portrait: "resources/tav.png"  },
    { text: "You are confused. You were fully expecting your first encounter with a celestial to be a fight with a godly being.", },
    { text: "This celestial is calm, and collected. The complete opposite of what you expected.", },
    { text: 'So... You\'re not going to fight me?', portrait: "resources/player.png"  },
    { text: "No. I only serve one purpose.", portrait: "resources/tav.png"  },
    { text: "I must protect this universe from a single celestial.", portrait: "resources/tav.png"  },
    { text: "Cante. My mortal enemy.", portrait: "resources/tav.png"  },
    { text: "I've been doing this job for far too long.", portrait: "resources/tav.png"  },
    { text: "Every single day, I've been suffering.", portrait: "resources/tav.png"  },
    { text: "Every single day, I've been feeling my superphysical form deteriorate.", portrait: "resources/tav.png"  },
    { text: "I am not like the other celestials. My entire existence has been spent as a celestial.", portrait: "resources/tav.png"  },
    { text: "I was created to only serve my one sworn duty. To protect this universe from Cante.", portrait: "resources/tav.png"  },
    { text: "The truth is... I'm tired of doing this job.", portrait: "resources/tav.png"  },
    { text: "I want to kill myself...", portrait: "resources/tav.png"  },
    { text: "And you are the only one that can help me do that...", portrait: "resources/tav.png"  },
    { text: "His speech moves you. You almost feel bad for the poor guy.", },
    { text: "Your sense of duty has increased yet again. You must help Tav.", },

];
const cutsceneDialogue29 = [ //negative infinity point
    { text: "You sense your antimatter reach the limit: 1.79e308.", },
    { text: "A light blue flash of light covers your entire field of vision.", },
    { text: "A small blue orb appears in front of you.", },
    { text: "So you've made a negative infinity point.", portrait: "resources/tav.png"  },
    { text: "Yeah... That's one of a few superphysical values linked to my power.", portrait: "resources/tav.png"  },
    { text: 'How is it different than an infinity point?', portrait: "resources/player.png"  },
    { text: "I'm not sure...", portrait: "resources/tav.png"  },
    { text: "None of this superphysical value stuff really makes any sense to me.", portrait: "resources/tav.png"  },
    { text: "Sorry......", portrait: "resources/tav.png"  },
    { text: "Bro it's okay... I was also confused as well.", portrait: "resources/player.png"  },
    { text: "I just realized something.", portrait: "resources/tav.png"  },
    { text: "Once you get past me, you'll have to face... HIM.", portrait: "resources/tav.png"  },
    { text: 'Cante?', portrait: "resources/player.png"  },
    { text: "Well... He won't be as powerful as he was before...", portrait: "resources/tav.png"  },
    { text: "However, he isn't friendly at all.", portrait: "resources/tav.png"  },
    { text: 'Tav. Don\'t worry. I gotcha.', portrait: "resources/player.png"  },
    { text: "I know I'm capable. Every single person I've met have been nonstop glazing me since day one.", portrait: "resources/player.png"  },
    { text: "I'm the greatest creation or something like that.", portrait: "resources/player.png"  },
    { text: "You know what Tav, I'm kinda confused too.", portrait: "resources/player.png"  },
    { text: "But it's okay to be confused. You will never understand anything.", portrait: "resources/player.png"  },
    { text: "Not even the cloaked person knows everything...", portrait: "resources/player.png"  },
    { text: "Tav looks at you.", },
    { text: "Thanks...", portrait: "resources/tav.png"  },

];
const cutsceneDialogue30 = [ //evolve unsmith
    { text: "You place the four evolution shards in a square-like pattern.", },
    { text: "You gather the lifeless bodies of superphysical pets and pile them on the middle.", },
    { text: "All of a sudden, a giant purple flame emerges.", },
    { text: "The evolution shards and pets dissapear.", },
    { text: "In front of you, is a golden unsmith. Your very own evolved pet.", },
    { text: "Marcel visits you.", },
    { text: 'Would ya look at that. An evolved pet.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Unsmith is an interesting case for sure.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'A long, long time ago, a developer by the name of Platonic created this little fella.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Some foresight users who followed Platonic\'s framework had an unsmith by their side.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Those foresight users fought against an ancient diety called THE ANT GOD.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'I used to be one of those foresight users.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'After a severe injury, I had my physical body merged with a mech-suit, and an unsmith.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'I had lost my ability to manipulate superphysical values, so I just became a developer.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'Nothing for you to worry about, just some cool history.', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'I do wish to meet Platonic one day...', portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: 'That\'s a very cool story you got there Marcel.', portrait: "resources/player.png"  },
    { text: "Don't worry. You'll be able to meet Platonic one day... Maybe if I keep evolving this unsmith...", portrait: "resources/player.png"  },

];
const cutsceneDialogue31 = [ //negative upgrade v (music box)
    { text: "You walk up to Tav, while he's sitting on the floor with his head down.", },
    { text: "Hey... are you okay?", portrait: "resources/player.png"  },
    { text: "When have I ever been okay...", portrait: "resources/tav.png"  },
    { text: "Look. I get it. The world is a messed up place.", portrait: "resources/player.png"  },
    { text: "I am trapped in this universe forever.", portrait: "resources/tav.png"  },
    { text: "There are many things I want to do, to experience.", portrait: "resources/tav.png"  },
    { text: "I want to live a life like the rest of you guys.", portrait: "resources/tav.png"  },
    { text: "But my entire existence is a lie.", portrait: "resources/tav.png"  },
    { text: "You have a soul, and I know you're a good person.", portrait: "resources/player.png"  },
    { text: "Good souls will always be free eventually. I know it.", portrait: "resources/player.png"  },
    { text: "The cloaked being appears.", },
    { text: 'I\'m late... Damn it.', portrait: "resources/secret.png"  },
    { text: 'Looks like you beat all 8 challenges, and found the celestial.', portrait: "resources/secret.png"  },
    { text: "Tav takes one look at the cloaked being, jolts up, and runs away, freightened.", },
    { text: "What's his deal...", portrait: "resources/secret.png"  },
    { text: "Tav's action confuses you.", },
    { text: "You don't want to act friendly to the celestials.", portrait: "resources/secret.png"  },
    { text: "You don't know what they are capable of. Remember that.", portrait: "resources/secret.png"  },
    { text: "Celestials are dangerous creatures. Menaces to the multiverse.", portrait: "resources/secret.png"  },
    { text: "I know, but Tav is different.", portrait: "resources/player.png"  },
    { text: "He's struggling....", portrait: "resources/player.png"  },
    { text: "He-", portrait: "resources/player.png"  },
    { text: "He wants to die.", portrait: "resources/player.png"  },
    { text: "Then just kill him. Killing a celestial is freeing the soul that lies within it.", portrait: "resources/secret.png"  },
    { text: "Yeah... You're right. I need to figure out how though.", portrait: "resources/player.png"  },
    { text: "You got this. There isn't a single thing our creation can't do.", portrait: "resources/secret.png"  },

];
const cutsceneDialogue32 = [ //negative upgrade vii
    { text: "Tav walks towards you slowly.", },
    { text: "Is that THING GONE???", portrait: "resources/tav.png"  },
    { text: "The cloaked person?", portrait: "resources/player.png"  },
    { text: "That being is very dangerous...", portrait: "resources/tav.png"  },
    { text: "You want answers about the cloaked being's identity.", },
    { text: "Do you know who that cloaked being is?", portrait: "resources/player.png"  },
    { text: "No idea... I just sense something dangerous coming from them.", portrait: "resources/tav.png"  },
    { text: "You shouldn't trust anyone. Not even if that cloaked being is your mentor.", portrait: "resources/tav.png"  },
    { text: "Tav's comments on the cloaked guy makes you think a little bit.", },
    { text: "Who could the cloaked person possibly be?", },
    { text: "What could they possibly have done in the past?", },
    { text: "You shouldn't trust me either.", portrait: "resources/tav.png"  },
    { text: "I may be friendly now, but you don't know what the more powerful celestials can do.", portrait: "resources/tav.png"  },
    { text: "The way people can change as they become more and more powerful.", portrait: "resources/tav.png"  },
    { text: "But if you kill me...", portrait: "resources/tav.png"  },
    { text: "I won't ever have to worry about becoming a bad person...", portrait: "resources/tav.png"  },
    { text: "Tav tries to put on his best smile.", },
    { text: "Who did this to you...", portrait: "resources/player.png"  },
    { text: "......", portrait: "resources/tav.png"  },

];
const cutsceneDialogue33 = [ //tavs domain unlock
    { text: "I think you're ready.", portrait: "resources/tav.png"  },
    { text: "Ready for what?", portrait: "resources/player.png"  },
    { text: "My challenge.", portrait: "resources/tav.png"  },
    { text: "You'll be able to destroy my core...", portrait: "resources/tav.png"  },
    { text: "...and kill me along with it.", portrait: "resources/tav.png"  },
    { text: "Sure.", portrait: "resources/player.png"  },
    { text: "Tav pulls out a small, glowing blue circle.", },
    { text: "This is my core.", portrait: "resources/tav.png"  },
    { text: "All it takes to destroy it is the power of the alternate broken infinities.", portrait: "resources/tav.png"  },
    { text: "Breaking infinities turns it into broken infinities. Going through my domain will create the alternate versions.", portrait: "resources/tav.png"  },
    { text: "I gotcha bud. Don't worry. You'll find your freedom.", portrait: "resources/player.png"  },
    { text: "You and Tav dap each other up.", },
    { text: "Despite the cloaked being's words, you still decide to be friendly to this celestial.", },
    { text: "Despite the Tav's words, you still decide to put some trust into him.", },
    { text: "You found a friend within a celestial.", },

];
const cutsceneDialogue34 = [ //tavs domain
    { text: "Tav's core splits off into pure energy and surrounds you.", },
    { text: "You notice your superphysical value gain drop significantly.", },
    { text: "It feels very similar to the eighth infinity challenge.", },
];
const cutsceneDialogue35 = [ //tavs points
    { text: "Tav notices you struggle gaining any superphysical values.", },
    { text: "Dang, you really are a celestial after all!", portrait: "resources/player.png"  },
    { text: "Don't worry. I can help you.", portrait: "resources/tav.png"  },
    { text: "I've saved this one superphysical value: Tav points. It will certainly help you get infinities.", portrait: "resources/tav.png"  },
    { text: "Thanks Tav!", portrait: "resources/player.png"  },
];
const cutsceneDialogue36 = [ //broken infinities
    { text: "You channel your superphysical energy through your fingers, and point it at the infinities.", },
    { text: "You stomp your foot, and all the infinities form a massive crack in the center of them.", },
    { text: "The infinities also stop glowing.", },
    { text: "You feel the superphysical energy from the infinities get converted into a new one.", },
];
const cutsceneDialogue37 = [ //reunlock antidebuff (Tav flashback)
    { text: "A white flash hits your vision.", },
    { text: "You are brought to another flashback.", },
    { text: "You appear to be in a more vibrant version of the antimatter world.", },
    { text: "The sky is filled with galaxies, stars, and bright lights.", },
    { text: "You see Tav, kneeling on the ground.", },
    { text: "He is looking at a man and a woman.", },
    { text: "For some reason, by instinct, you know who those two are.", },
    { text: "They are a part of THE ORIGINAL SEVEN.", },
    { text: "The woman is Teresa, the celestial of reality.", },
    { text: "The man is Effarig, the celestial of glyphs.", },
    { text: "You don't know why you know that, you just do.", },
    { text: "Tav... We need to talk about your performance.", portrait: "resources/effarig.png",  },
    { text: "We heard complaints of you getting distracted while on duty.", portrait: "resources/teresa.png"  },
    { text: "Do you understand how many lives will be at stake if Cante is let loose???", portrait: "resources/teresa.png"  },
    { text: "We need you to keep a better eye on him.", portrait: "resources/effarig.png"  },
    { text: "Look. If you're ever tired, just give me a call. I don't mind taking over for a couple hours every day.", portrait: "resources/effarig.png"  },
    { text: "I'm sorry... I'll do it... My creators......", portrait: "resources/tav.png"  },
    { text: "You see Tav walk off into the distance, towards a tall building.", },
    { text: "Effarig... I thought you were on glyph duty...", portrait: "resources/teresa.png"  },
    { text: "I don't think Tav deserves a break. He's a celestial. He's capable enough.", portrait: "resources/teresa.png"  },
    { text: "We can't ever run the risk of leaving Cante unattended.", portrait: "resources/teresa.png"  },
    { text: "Especially after what he did...", portrait: "resources/teresa.png"  },
    { text: "We MUST keep him locked up in his little dimension.", portrait: "resources/teresa.png"  },
    { text: "And the only one who can do that is Tav.", portrait: "resources/teresa.png"  },
    { text: "We worked so hard to create him...", portrait: "resources/teresa.png"  },
    { text: "Just because you're new doesn't mean you get to have full control over Tav.", portrait: "resources/effarig.png"  },
    { text: "Lai'Tela told us to take good care of him.", portrait: "resources/effarig.png"  },
    { text: "We should treat him like a person...", portrait: "resources/effarig.png"  },
    { text: "Teresa starts cackling.", },
    { text: "You really do believe us celestials are people???", portrait: "resources/teresa.png"  },
    { text: "That's so funny... We are all doomed. Stripped of our humanity.", portrait: "resources/teresa.png"  },
    { text: "What's the point of all of this anyways. You guys confuse me.", portrait: "resources/teresa.png"  },
    { text: "Teresa walks away, and Effarig just stands there, speechless.", },
    { text: "Everything starts to make sense now.", },
    { text: "Tav was built by the original seven.", },

];
const cutsceneDialogue38 = [ //alt broken infinities
    { text: "You take the broken infinities, and step infront of the otherworldly feature altar.", },
    { text: '"Just like what Tav said...", You thought to yourself.', },
    { text: "The superphysical energy from Tav's core mixes with the energy from the altar.", },
    { text: "The energy forms a ball, which merges with the broken infinity.", },
    { text: "The infinity glows with a light you haven't seen before.", },
    { text: "You have created an alternate broken infinity.", },
];
const cutsceneDialogue39 = [ //tav's death
    { text: "You did it. You have gained 1,000 of each alternate broken infinity type.", },
    { text: "You are filled with dread. You will defeat your first celestial, but you will have to kill your friend.", },
    { text: "You did it... I'm so proud of you.", portrait: "resources/tav.png"  },
    { text: "Now I'll finally be put to rest. Thank you.", portrait: "resources/tav.png"  },
    { text: "They made you a slave...", portrait: "resources/player.png"  },
    { text: "The original seven... THEY did this to you.", portrait: "resources/player.png"  },
    { text: "Tav looks at you, with tears in his eyes.", },
    { text: "I know... I don't regret it though.", portrait: "resources/tav.png"  },
    { text: "For all this time, I have protected countless lives from Cante.", portrait: "resources/tav.png"  },
    { text: "I know I had a positive impact on the multiverse.", portrait: "resources/tav.png"  },
    { text: "Once I'm gone, you will have to deal with Cante.", portrait: "resources/tav.png"  },
    { text: "Cante used to be a part of the original seven, but an incident got him replaced.", portrait: "resources/tav.png"  },
    { text: "But don't worry. He's far less powerful than he used to be. I've made sure of that.", portrait: "resources/tav.png"  },
    { text: "Don't worry. I'll take care of him.", portrait: "resources/player.png"  },
    { text: "Thanks... I haven't asked this question yet...", portrait: "resources/tav.png"  },
    { text: "What's your name?", portrait: "resources/tav.png"  },
    { text: "Now that you think about it, you don't even know your own name.", },
    { text: "That question boggles you.", },
    { text: "That's a good question Tav...", portrait: "resources/player.png"  },
    { text: "I don't even know.", portrait: "resources/player.png"  },
    { text: "Damn. That sucks man.", portrait: "resources/tav.png"  },
    { text: "Oh well, time for you to kill me now.", portrait: "resources/tav.png"  },
    { text: "It was nice meeting you and getting to know you as well.", portrait: "resources/tav.png"  },
    { text: "I don't wanna do it.", portrait: "resources/player.png"  },
    { text: "Is there any way I can turn you back? To get rid of your celestiality?", portrait: "resources/player.png"  },
    { text: "It's impossible. Turning into a celestial will permanently alter the infrastructure of your soul.", portrait: "resources/tav.png"  },
    { text: "This would especially be hard in my case... I was born a celestial.", portrait: "resources/tav.png"  },
    { text: "My soul was stitched together from fragments of lost souls.", portrait: "resources/tav.png"  },
    { text: "I'm so sorry. I want to live a normal life, in a normal universe.", portrait: "resources/tav.png"  },
    { text: "I stopped chasing those desires long ago...", portrait: "resources/tav.png"  },
    { text: "Nowadays, I only crave death.", portrait: "resources/tav.png"  },
    { text: "My job is done. You may kill me now.", portrait: "resources/tav.png"  },
    { text: "Tears stream down Tav's face. You feel sad, but for some reason you won't cry.", },
    { text: "Thanks for everything.", portrait: "resources/tav.png"  },
    { text: "You give Tav a hug, as you prepare to shoot a beam of superphysical energy.", },
    { text: "I'm sorry that this had to ever happen to you.", portrait: "resources/player.png"  },
    { text: "You will find your freedom. I know you will.", portrait: "resources/player.png"  },
    { text: "Goodbye...", portrait: "resources/tav.png"  },
    { text: "Goodbye...", portrait: "resources/player.png"  },
    { text: "The energy from the alternate broken infinities are converted into one powerful beam of energy.", },
    { text: "The beam strikes through Tav's core, immediately disintegrating it.", },
    { text: "Tav's physical form fades away into dust.", },
    { text: "You have defeated your first celestial.", },
];
//showCinematicCutscene(credits1, { background: "#000", cinematicCutsceneID: 1 });
const cutsceneDialogue40 = [
    { text: "<h1>Hello.</h1>", duration: 5000, style: { color: "#ffffff", fontSize: "4vw" } },
    { text: "<h1>I am the narrator.</h1>", duration: 5000, style: { color: "#ffffff", fontSize: "4vw" } },
    { text: "<h1>The one guiding you through this mission.</h1>", duration: 7000, style: { color: "#ffffff", fontSize: "4vw" } },
    { text: "<h1>Now, now, don't go looking for me. I am inside you.</h1>", duration: 7000, style: { color: "#ffffff", fontSize: "4vw" } },
    { text: "<h1>Thank you.</h1>", duration: 5000, style: { color: "#ffffff", fontSize: "4vw" } },
    { text: "<h1>Thank you for giving me another chance at living.</h1>", duration: 7000, style: { color: "#ffffff", fontSize: "4vw" } },
    { text: "<h1>You will face many dangers in your future. I know it.</h1>", duration: 7000, style: { color: "#ffffff", fontSize: "4vw" } },
    { text: "<h1>Good luck.</h1>", duration: 5000, style: { color: "#ffffff", fontSize: "4vw" } },
];
const cutsceneDialogue41 = [ //break infinity
    { text: "You see a new button appear on the altar.", },
    { text: '"Break Infinity"', },
    { text: "The cloaked being appears.", },
    { text: "Congratulations. You defeated your very first celestial.", portrait: "resources/secret.png"  },
    { text: "Now you can gain more than 1.79e308 celestial points.", portrait: "resources/secret.png"  },
    { text: "Good job.", portrait: "resources/secret.png"  },
    { text: "This didn't need to happen...", portrait: "resources/player.png"  },
    { text: "Tav was innocent... He didn't deserve this.", portrait: "resources/player.png"  },
    { text: "So you're still attatched to that celestial aren't ya.", portrait: "resources/secret.png"  },
    { text: "Don't let that happen again.", portrait: "resources/secret.png"  },
    { text: "You've freed Tav from his eternal mistery. You did the right thing.", portrait: "resources/secret.png"  },
    { text: "You look down at the floor.", },
    { text: "Hey look. If you feel bad for what you have done... You can talk to me or Marcel. We're here for you.", portrait: "resources/secret.png"  },
    { text: "The cloaked being pats you on your head and walks away.", },
];
const cutsceneDialogue42 = [ //gwa evolution
    { text: "Ah. So you're finally evolving the GWA now.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "I know an organization that has worshipped this being for millenia.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "psst... they're more like a cult, but don't tell them I said that.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Keep evolving it, and you will see them eventually.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
];
const cutsceneDialogue43 = [ //break infinity upgrade IV (otf mastery)
    { text: "I think I know what's behind this altar...", portrait: "resources/secret.png"  },
    { text: "It might be the work of certain celestials.", portrait: "resources/secret.png"  },
    { text: "That's strange. Why would a celestial want to help me like that?", portrait: "resources/player.png"  },
    { text: "It all comes down to classic manipulation.", portrait: "resources/secret.png"  },
    { text: "Certain celestials want you to gain their superphysical values.", portrait: "resources/secret.png"  },
    { text: "It makes them stronger, and can also provide your information to the celestial.", portrait: "resources/secret.png"  },
    { text: "Yes, you can avoid those superphysical values entirely, but you will need them to progress in this framework.", portrait: "resources/secret.png"  },
    { text: "Yeah... It's pretty hard to progress without otherworldy features.", portrait: "resources/player.png"  },
    { text: "Exactly. You will face these celestials sooner or later.", portrait: "resources/secret.png"  },
    { text: "It just kinda sucks that some higher celestial power already knows about your existence.", portrait: "resources/secret.png"  },
    { text: "Someone must have snitched...", portrait: "resources/secret.png"  },
    { text: "We should probably figure that out.", portrait: "resources/player.png"  },
];
const cutsceneDialogue44 = [ //steel
    { text: "You see your grasshoppers form a coagulated blob.",  },
    { text: "The blob turns into what appears to be molten metal.",  },
    { text: "Eventually, the metal cools down into steel ingots.",  },
    { text: "Voices begin to enter your head.",  },
    { text: '"Cut the grass... cut the grass... cut the grass..."',  },
    { text: "The voices fade as you walk away from the steel.",  },
    { text: "What could this possibly mean?",  },
];
const cutsceneDialogue45 = [ //crystal
    { text: "The voices intensify.",  },
    { text: "You don't even know what they are saying anymore.",  },
    { text: "The voices all stop when the cloaked being appears.",  },
    { text: "I wonder what went wrong with this framework...", portrait: "resources/secret.png"  },
    { text: "Crystallize was supposed to be unlocked a long, long time ago.", portrait: "resources/secret.png"  },
    { text: "Oh well... This is nothing out of the ordinary anyways.", portrait: "resources/secret.png"  },
    { text: "Just be careful.", portrait: "resources/secret.png"  },
];
const cutsceneDialogue46 = [ //time reversal
    { text: "The time stops around you.",  },
    { text: "Everything superphysical freezes.",  },
    { text: "You notice all your production stop.",  },
    { text: "So... do you know what is happening right now?", portrait: "resources/player.png"  },
    { text: "You are performing a time reversal.", portrait: "resources/secret.png"  },
    { text: "Well that name isn't very accurate...", portrait: "resources/secret.png"  },
    { text: "It usually stops time, and drains your celestial points.", portrait: "resources/secret.png"  },
    { text: "These cubes look very cool.", portrait: "resources/player.png"  },
    { text: "Ah, time cubes. A version of time that could be stored in space.", portrait: "resources/secret.png"  },
    { text: "You know, this was taken from one of the very first frameworks ever made.", portrait: "resources/secret.png"  },
    { text: "The distance incremental framework— the one created by Jacorb.", portrait: "resources/secret.png"  },
    { text: "Jacorb was special, because he was a developer who was able to utilize his own framework.", portrait: "resources/secret.png"  },
    { text: "Cases like his are very rare, that's why he was considered one of the four heroes of the incremental clan.", portrait: "resources/secret.png"  },
    { text: "That name sounded very familiar to you.",  },
    { text: "Jacorb... You learned about him in school???",  },
    { text: "Your memories start swirling in an endless fuzz of confusion.",  },
    { text: '"Wait a minute...", you think to yourself.',  },
    { text: 'School??? You used to live a normal life???',  },
    { text: 'And why would you learn about Jacorb in school??????',  },
    { text: 'Jacorb... His name sounds familiar.', portrait: "resources/player.png"  },
    { text: "Jacorb died a few years ago.", portrait: "resources/secret.png"  },
    { text: "We managed to get him out of his prison in the death realm, but...", portrait: "resources/secret.png"  },
    { text: "He sacrified himself to save the entire clan from destruction.", portrait: "resources/secret.png"  },
    { text: 'He must have been one hell of a guy that\'s for sure.', portrait: "resources/player.png"  },
    { text: "Now that you think about it, the world is a lot larger than it seems.",  },
    { text: "What is the clan?",  },
    { text: "What truly happened to Jacorb?",  },
    { text: "You want the answers to these questions.",  },
];
const cutsceneDialogue47 = [ //cante
    { text: "Out of nowhere, you feel an immense force shake the ground.",  },
    { text: "Cracks start to form in the ground.",  },
    { text: "It must be HIM. HE has arrived.",  },
    { text: "It's CANTE...",  },
    { text: "An opening forms on the ground, and a disfigured humanoid creature emerges.",  },
    { text: "Why did you do it.... WHY.......", portrait: "resources/cante.png"  },
    { text: "The creature's head seems to be made out of pure light.",  },
    { text: "His body looks extremely frail and weak.",  },
    { text: "You remain speechless.",  },
    { text: "They're all gone... THEY'RE ALL GONE...", portrait: "resources/cante.png"  },
    { text: "The being falls on the floor unconcious.",  },
    { text: "That must be Cante.",  },
    { text: "A being feared by the original seven.",  },
    { text: "Then why is Cante so weak?",  },
];
const cutsceneDialogue48 = [ //e308 replicanti
    { text: "You sense the presence of a strange new superphysical value.",  },
    { text: "The cloaked being appears.",  },
    { text: "This is replicanti. One of Cante's superphysical values.", portrait: "resources/secret.png"  },
    { text: "The original seven still utilized replicanti even after they kicked him out.", portrait: "resources/secret.png"  },
    { text: "The cloaked being looks at Cante's unconcious body.",  },
    { text: "Damn.", portrait: "resources/secret.png"  },
    { text: "Do you know why he's like this?", portrait: "resources/player.png"  },
    { text: "I'm pretty sure Tav's restrictions must have put immense strain on him.", portrait: "resources/secret.png"  },
    { text: "And since Cante was so powerful, Tav must have used a majority of his power to keep him in this state.", portrait: "resources/secret.png"  },
    { text: "Just imagine how powerful Tav must've been if he didn't have to do this job.", portrait: "resources/secret.png"  },
    { text: "Tav must've worked hard then. He died with no regrets because kept us all safe from Cante.", portrait: "resources/player.png"  },
    { text: "Just keep making more replicanti. Pretty sure you'll find his core eventually.", portrait: "resources/secret.png"  },

];
const cutsceneDialogue49 = [ //replicanti galaxy
    { text: "You see the replicanti shoot up into the sky and burst into a beautiful display of light.",  },
    { text: "The sky of the antimatter world fills up again with brightness.",  },
    { text: "It doesn't make any sense. How could such an evil celestial be responsible for such beautiful sights?",  },

];
const cutsceneDialogue50 = [ //cantepocalypse puzzles (on tab switch)
    { text: "All of a sudden, a temple rises in front of you.",  },
    { text: "As you walk inside, you are greeted with Cante's voice.",  },
    { text: "They're all gone. THEY'RE ALL GONE.", portrait: "resources/cante.png"  },
    { text: "I should have stayed locked up! I don't deserve to see our world like this!!", portrait: "resources/cante.png"  },
    { text: "It was you... it must have been you... The one who killed all of them.", portrait: "resources/cante.png"  },
    { text: "DAMN YOU!!!", portrait: "resources/cante.png"  },
    { text: "EVEN IF THEY ALL HATED ME, THEY DIDN'T DESERVE DEATH.", portrait: "resources/cante.png"  },
    { text: "And I know you want to kill me as well.", portrait: "resources/cante.png"  },
    { text: "I have built this temple for this very moment.", portrait: "resources/cante.png"  },
    { text: "Solve 4 puzzles, and I will let you kill me.", portrait: "resources/cante.png"  },
    { text: "What's the point in even living if they are all gone.", portrait: "resources/cante.png"  },
    { text: "There's nothing for me to do.", portrait: "resources/cante.png"  },
    { text: "Absolutely nothing.", portrait: "resources/cante.png"  },
    { text: "You stay silent. You know you weren't the one who killed the original seven, but you still feel immense guilt.",  },
    { text: "And what's even more strange, is that you don't feel the same guilt for killing Tav.",  },
    { text: "Why do you feel this way?",  },
];

//more pet evolution cutscenes
const cutsceneDialogue51 = [ //marcel evolution
    { text: "As you prepare your next pet evolution, you notice nothing change.",  },
    { text: "You are confused.",  },
    { text: "Oh congrats. The evolution for the clock pet is just me haha.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Wait what?", portrait: "resources/player.png"  },
    { text: "Marcel gives you a couple of special clocks.",  },
    { text: "These clocks will give you evolution and paragon shards.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "I just made them earlier. Hope they help.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Thanks bud.", portrait: "resources/player.png"  },
];

//first puzzle complete 
const cutsceneDialogue52 = [ 
    { text: "You complete the puzzle, and the floor underneath you breaks, revealing another room.",  },
    { text: "A white flash hits your eyes.",  },
    { text: "You are presented with a flashback.",  },
    { text: "You find yourself in the vibrant antimatter world again.",  },
    { text: "Two beings stand in front of you.",  },
    { text: "A stronger, less disfigured looking Cante, and another celestial.",  },
    { text: "Lai'Tela, the Celestial of Dimensions.",  },
    { text: "So you must be Cante. You are our fourth member. Welcome to the team.", portrait: "resources/laitela.png"  },
    { text: "I am overjoyed to be joining you.", portrait: "resources/cante.png"  },
    { text: "So Pelle must have already told you everything, right?", portrait: "resources/laitela.png"  },
    { text: "Yes he has. We must keep the ?????????? ?????? safe.", portrait: "resources/cante.png"  }, //retrograde elixir
    { text: "Exactly. If ANYONE finds out about the ??????, it is over.", portrait: "resources/laitela.png"  },
    { text: "We must find the rest of the ???????. Right now, we only have one. There are many more throughout the multiverse.", portrait: "resources/laitela.png"  },
    { text: "If any celestial gets a hold of the ??????, we will be generationally screwed.", portrait: "resources/laitela.png"  },
    { text: "I know where one of the ?????????? ??????? are...", portrait: "resources/cante.png"  },
    { text: "That would help a lot.", portrait: "resources/laitela.png"  },
    { text: "Information comes at a price. I know about that power of yours...", portrait: "resources/cante.png"  },
    { text: "Annhilation: The power to destroy all matter into it's most fundamental state.", portrait: "resources/cante.png"  },
    { text: "A power that is the polar opposite of mine, as I can create anything with the power of replicanti.", portrait: "resources/cante.png"  },
    { text: "If we team up, we will be unstoppable!", portrait: "resources/cante.png"  },
    { text: "Forget about Pelle. Forget about Ra. Together, we will find all of the ??????? and rule the celestials!", portrait: "resources/cante.png"  },
    { text: "Cante extends his arm out for a handshake, but Lai'Tela refuses to shake his hand.",  },
    { text: "The smirk on Cante's face vanishes.",  },
    { text: "We're trying to protect the celestials, not harm them.", portrait: "resources/laitela.png"  },
    { text: "Lai'Tela walks away, and you are left with many questions.",  },
    { text: "What is that item they are talking about? What could it do?",  },
    { text: "You need to figure out more.",  },
    { text: "You need to understand what truly happened to the original seven.",  },
];
//second puzzle complete 
const cutsceneDialogue53 = [ 
    { text: "You complete the puzzle, and the floor underneath you breaks, revealing another room.",  },
    { text: "A white flash hits your eyes.",  },
    { text: "You are presented with a flashback.",  },
    { text: "You find yourself in a vibrant city. Bright lights, noise, and cars.",  },
    { text: "This world feels a little bit familiar.",  },
    { text: "All of a sudden, a giant rift opens up in the sky.",  },
    { text: "Spaceships fly through the rift, and bombs drop on the city.",  },
    { text: "Humans plead for their lives. Buildings fall to the ground.",  },
    { text: "The destruction is endless.",  },
    { text: "You notice a young man run away from the chaos.",  },
    { text: "That man looked very familiar.",  },
    { text: "It was Cante... before turning into a celestial.",  },
    { text: "He holds his family tight: His mother, and his sister.",  },
    { text: "However, the force was too powerful. They both got caught in the destruction.",  },
    { text: "The man kept on running and running, until a portal suddenly appeared and captured him.",  },
    { text: "Very interesting...",  },
    { text: "A few thoughts come to your mind.",  },
    { text: "A secret organization is destroying universes and converting people into celestials?",  },
    { text: "You'll have to figure it all out...",  },
];
//third puzzle complete 
const cutsceneDialogue54 = [ 
    { text: "You complete the puzzle, and the floor underneath you breaks, revealing another room.",  },
    { text: "A white flash hits your eyes.",  },
    { text: "You are presented with a flashback.",  },
    { text: "You are in what appears to be an office room.",  },
    { text: "Lai'Tela was sorting out papers, until Effarig bursted into the room abruptly.",  },
    { text: "WHERE'S PELLE??? WHERE IS HE!!!", portrait: "resources/effarig.png"  },
    { text: "Woah woah woah calm down. What's the problem???", portrait: "resources/laitela.png"  },
    { text: "IT'S GONE. IT'S GONE. THE ??????. THE ?????? IS GONE!!!", portrait: "resources/effarig.png"  },
    { text: "Oh god...", portrait: "resources/laitela.png"  },
    { text: "Calm down. Have you double checked?", portrait: "resources/laitela.png"  },
    { text: "Yes I have... What do we do??? We need Pelle!", portrait: "resources/effarig.png"  },
    { text: "I thought there were eyes on the ?????? at all times...", portrait: "resources/laitela.png"  },
    { text: "Who was the last person that was watching it?", portrait: "resources/effarig.png"  },
    { text: "Let me check...", portrait: "resources/laitela.png"  },
    { text: "It was.......", portrait: "resources/laitela.png"  },
    { text: "........Cante", portrait: "resources/laitela.png"  },
    { text: "The walls around you shake, and a loud glitching noise plays in yoru head.",  },
    { text: "Cante must have stole something very important.",  },
    { text: "This must have caused Cante's removal from the original seven.",  },
    { text: "Very interesting...",  },
];
//fourth puzzle complete 
const cutsceneDialogue55 = [ 
    { text: "You complete the puzzle, and the floor underneath you breaks, revealing another room.",  },
    { text: "A white flash hits your eyes.",  },
    { text: "You are presented with a flashback.",  }, //laitela created cante's prison
    { text: "You find yourself in a black and white void, surrounded by dark energy.",  },
    { text: "You see Cante in the center get restrained by superphysical chains.",  },
    { text: "Tav enters your vision.",  },
    { text: "Who are you... What do you want from me???", portrait: "resources/cante.png"  },
    { text: "I am Tav. It is my sole responsibility to keep you locked here.", portrait: "resources/tav.png"  },
    { text: "I am currently taking away your power away from you.", portrait: "resources/tav.png"  },
    { text: "You don't deserve your power. What you did is unforgivable.", portrait: "resources/tav.png"  },
    { text: "I will make sure that no more lives are in danger because of your existence.", portrait: "resources/tav.png"  },
    { text: "Whatever you say... Tav.", portrait: "resources/cante.png"  },
    { text: "Lai'Tela did one hell of a job creating this prison.", portrait: "resources/cante.png"  },
    { text: "Too bad they are more worried about keeping me locked up instead of finding the ??????.", portrait: "resources/cante.png"  },
    { text: "Oh well... That isn't my problem at all.", portrait: "resources/tav.png"  },
    { text: "You'll stay here for eternity. You will eventually lose your sanity.", portrait: "resources/tav.png"  },
    { text: "This is all your fault.", portrait: "resources/tav.png"  },
];
//cantepocalypse 
const cutsceneDialogue56 = [ 
    { text: "As all 4 puzzles are completed, you find yourself in one final room.",  },
    { text: "There is a hole in the center of the room, and the hole is pulling everything in towards it.",  },
    { text: "My core is in here. You can kill me now.", portrait: "resources/cante.png"  },
    { text: "You get an uneasy feeling about jumping in the hole, but notice the walls around you start to shrink.",  },
    { text: "There is no escape. You must enter the hole.",  },
    { text: "Once you enter the hole, you fall down an endless abyss.",  },
    { text: "YOU IDIOT!!!", portrait: "resources/cante.png"  },
    { text: "Cante starts laughing maniacally, and you realize the situation you're in.",  },
    { text: "You're cooked.",  },
    { text: "Welcome to my prison... I was here for an eternity and now you will be too!!!", portrait: "resources/cante.png"  },
    { text: "The core... Where is it??", portrait: "resources/player.png"  },
    { text: "Good luck finding it. You will need a lot of superphysical power.", portrait: "resources/cante.png"  },
    { text: "When you land on the ground, you observe your surroundings.",  },
    { text: "It looks eerily similar to the overworld... but disfigured.",  },
    { text: "Everything here is replicanti!", portrait: "resources/cante.png"  },
    { text: "Everything here multiplies!!!", portrait: "resources/cante.png"  },
    { text: "Isn't it just so amazing???", portrait: "resources/cante.png"  },
    { text: "You try to escape, but there are no links between superphysical values.",  },
    { text: "You are stuck here.",  },
];
//anonymity
const cutsceneDialogue57 = [ 
    { text: "You progress through this universe's superphysical values, and notice something.",  },
    { text: "It's the same as the overworld, just in a different form.",  },
    { text: "Celestial Points are Replicanti Points, Factors are Perks, Anonymity are Prestige Points.",  },
    { text: "How interesting...",  },
    { text: "How would Cante even have access to your framework?",  },
    { text: "All of a sudden, you hear Cante's voice.",  },
    { text: "Aren't you having so much fun...???!!??", portrait: "resources/cante.png"  },
    { text: "Please shut up. This is just a lame version of my universe! How did you even get this framework???", portrait: "resources/player.png"  },
    { text: "I know who you really are.", portrait: "resources/cante.png"  },
    { text: "You are their CREATION. The weapon used to destroy all celestials.", portrait: "resources/cante.png"  },
    { text: "The proto-overworld... The original plan.", portrait: "resources/cante.png"  },
    { text: "I can't remember it... I can't remember it!!!", portrait: "resources/cante.png"  },
    { text: "All of you humans in the incremental clan... ALL OF YOU HUMANS!", portrait: "resources/cante.png"  },
    { text: "YOU GUYS THINK THAT US CELESTIALS ARE DESTRUCTIVE AND EVIL???", portrait: "resources/cante.png"  },
    { text: "HYPOCRITES! HYPOCRITES! HYPOCRITES!!!", portrait: "resources/cante.png"  },
    { text: "You guys destroyed everything I loved!", portrait: "resources/cante.png"  },
    { text: "I had a family. I had a dream. I had success.", portrait: "resources/cante.png"  },
    { text: "I didn't deserve to be a celestial.", portrait: "resources/cante.png"  },
    { text: "NOW LOOK AT WHAT YOU MADE ME DO.", portrait: "resources/cante.png"  },
    { text: "LOOK AT ALL THE LIVES I HAVE ENDED.", portrait: "resources/cante.png"  },
    { text: "THIS IS ALL YOUR FAULT.", portrait: "resources/cante.png"  },
    { text: "Stop talking... Your voice irritates me.", portrait: "resources/player.png"  },
    { text: "The proto-overworld? What is that???",  },
    { text: "This is making less and less sense...",  },
];
//Portal upgrade
const cutsceneDialogue58 = [ 
    { text: "As you accumulate more oil, you realize there may truly be no way out of this place.",  },
    { text: "None of these superphysical values have links... None of them...",  },
    { text: "But you get an idea.",  },
    { text: "What if you created your own superphysical value?",  },
    { text: "You are no developer, but you could still try.",  },
    { text: "No! It's impossible... You can't do it. You just cant.",  },
    { text: "A white flash hits your eyes.",  },
    { text: "Another flashback...",  },
    { text: "This time, you are back in the hall, where the two fog beings sit.",  },
    { text: "?????? Is it true? Does the creation really have those powers?", portrait: "resources/fogGuy1.png"  },
    { text: "Yes... I have given the creation developer powers as well.", portrait: "resources/fogGuy2.png"  },
    { text: "However, they are extremely limited.", portrait: "resources/fogGuy2.png"  },
    { text: "How so?", portrait: "resources/fogGuy1.png"  },
    { text: "The creation can only utilize their developer powers under one condition.", portrait: "resources/fogGuy2.png"  },
    { text: "Their developer powers are a last ditch option.", portrait: "resources/fogGuy2.png"  },
    { text: "Whenever they are in a situation of despair, or hopelessness,", portrait: "resources/fogGuy2.png"  },
    { text: "They would be able to access the superphysical plane.", portrait: "resources/fogGuy2.png"  },
    { text: "And all superphysical values will be realized.", portrait: "resources/fogGuy2.png"  },
    { text: "The superphysical plane? I've only managed to see that once...", portrait: "resources/fogGuy1.png"  },
    { text: "The superphysical extension of three-dimensional space into many more... The possibilities are endless!", portrait: "resources/fogGuy1.png"  },
    { text: "Alongside developer powers, will the creation be able to venture into this superphysical plane?", portrait: "resources/fogGuy1.png"  },
    { text: "To travel between universes instantaneously, yeah.", portrait: "resources/fogGuy2.png"  },
    { text: "Eventually though, the creation will be able to see this plane, and interact with it.", portrait: "resources/fogGuy2.png"  },
    { text: "Advancing through the dimensions of the superphysical plane will be necessary.", portrait: "resources/fogGuy2.png"  },
    { text: "You return back to the present.",  },
    { text: "It is possible...",  },
    { text: "Once you open your eyes, you see it.",  },
    { text: "The superphysical plane. An extension of the three-dimensional world.",  },
    { text: "It overwhelms you.",  },
    { text: "You see multi-dimensional strings extending out infinitely.",  },
    { text: "Those must be the links.",  },
    { text: "Now it's time to create your own superphysical value.",  },
    { text: "Points, Factor Power, Prestige Points...",  },
    { text: "All superphysical values you understand.",  },
    { text: "Superphysical values that share some connection with this world...",  },
    { text: "You reach your arms out, and start manifesting the creation of a new superphysical value.",  },
    { text: '"Linking Power."',  },

];
//proto memories
const cutsceneDialogue59 = [ 
    { text: "This can't be... How did you do it!?", portrait: "resources/cante.png"  },
    { text: "You created your own superphysical value...", portrait: "resources/cante.png"  },
    { text: "HOW DID YOU DO IT!??!??", portrait: "resources/cante.png"  },
    { text: "I have been created to withstand celestials like you.", portrait: "resources/player.png"   },
    { text: "There is no winning against me.", portrait: "resources/player.png"   },
    { text: "I am the creation...", portrait: "resources/player.png"   },
    { text: "You won't stop me.", portrait: "resources/player.png"   },
    { text: "If I only had a power like yours, I would have been able to get out of here!", portrait: "resources/cante.png"  },
    { text: "DAMN YOU!!!", portrait: "resources/cante.png"  },
    { text: "All of a sudden, you see it. Cante's core.", },
    { text: "It has the appearance of a brain. That intrigues you.", },
    { text: "My core...", portrait: "resources/cante.png"  },
    { text: "Cante starts laughing maniacally.", },
    { text: "Why do I keep trying!", portrait: "resources/cante.png"  },
    { text: "There's nothing left to do anymore...", portrait: "resources/cante.png"  },
    { text: "There's no point in living!!!", portrait: "resources/cante.png"  },
    { text: "I'm just doing this for fun... Am I...", portrait: "resources/cante.png"  },
    { text: "Drop the act! Just let me destroy your core now!", portrait: "resources/player.png"  },
    { text: "The core will be destroyed... Just let me remember!", portrait: "resources/cante.png"  },
    { text: "Remember what exactly?", portrait: "resources/player.png"  },
    { text: "The proto-overworld!", portrait: "resources/cante.png"  },
    { text: "This... prison. It's only a mere memory.", portrait: "resources/cante.png"  },
    { text: "And your overworld... It's only a far cry from the truth.", portrait: "resources/cante.png"  },
    { text: "What are you talking about...", portrait: "resources/player.png"  },
    { text: "You will understand everything eventually...", portrait: "resources/cante.png"  },
    { text: "The REAL reason why you were created.", portrait: "resources/cante.png"  },
    { text: "Now go on! Destroy my core! As you wish!!!", portrait: "resources/cante.png"  },
    { text: "Cante starts laughing harder, as his body transforms and contorts into a disgusting mass.", },
    { text: "Replicating uncontrollably, just like the superphysical values he created.", },
    { text: "You better find those memories. The cantepocalypse is truly beginning.", },
];
//cante death
const cutsceneDialogue60 = [ 
    { text: "Amidst the chaos of Cante's uncanny growth, you find ten rememberance cores.", },
    { text: "Cante's core is in front of you... A brain.", },
    { text: "You clench all of the rememberance cores into your hand, and punch the brain, shattering the core.", },
    { text: "Cante's morphed body reverts back into a weak, frail being.", },
    { text: "It's really over... It really is...", portrait: "resources/cante.png"  },
    { text: "I have many regrets.", portrait: "resources/cante.png"  },
    { text: "The proto-overworld. I remember it now.", portrait: "resources/cante.png"  },
    { text: "A time when humans and celestials lived in peace...", portrait: "resources/cante.png"  },
    { text: "I remember... Everything...", portrait: "resources/cante.png"  },
    { text: "Working togther... was fun.", portrait: "resources/cante.png"  },
    { text: "Cante... Nothing will ever change the horrible things that you have done.", portrait: "resources/player.png"  },
    { text: "But if remembering that time would bring you some resolution... I'm glad.", portrait: "resources/player.png"  },
    { text: "However, you still deserve your death. Goodbye.", portrait: "resources/player.png"  },
    { text: "You look away for a split second, and as you look back, Cante is gone.", },
    { text: "So there once was a time when celestials and humans lived in harmony...", },
    { text: "And the proto-overworld... You still need to know what that is.", },
    { text: "Everything is still very confusing for you.", },
];
//cloaked reveal
const cutsceneDialogue61 = [ 
    { text: "You return to the antimatter world, and find the cloaked being there.", },
    { text: "Teresa. Effarig. The Nameless Ones.", portrait: "resources/secret.png"  },
    { text: "V. Ra. Lai'Tela. Pelle.", portrait: "resources/secret.png"  },
    { text: "The seven celestial guardians. The original seven.", portrait: "resources/secret.png"  },
    { text: "Septe Coelestes. Die sieben Himmlischen.", portrait: "resources/secret.png"  },
    { text: "Seven celestials that had a goal completely opposite to ours.", portrait: "resources/secret.png"  },
    { text: "They wanted to exterminate the incremental clan...", portrait: "resources/secret.png"  },
    { text: "And take over the entire dimensional realm!!!", portrait: "resources/secret.png"  },
    { text: "They would use the ?????? for their own benefit...", portrait: "resources/secret.png"  },
    { text: "They weren't protecting it!!! They were using it!!!", portrait: "resources/secret.png"  },
    { text: "That word again... Why couldn't you hear it!?!", },
    { text: "You noticed the cloaked being begin to shake...", },
    { text: "And now Cante and Tav are dead... This universe is truly empty now.", portrait: "resources/secret.png"  },
    { text: "What are you doing?", portrait: "resources/player.png"  },
    { text: "The cloaked being falls down to the floor, and starts coughing up blood.", },
    { text: "Our creation... It is about time you know who I am. My true identity.", portrait: "resources/secret.png"  },
    { text: "The cloaked being begins to draw a strange symbol in the air, using their own blood.", },
    { text: "You recognize that symbol...", },
    { text: "It's the mark of the DESTROYER.", },
    { text: "The cloaked being takes off their cloak, revealing a woman with horns, dark blue hair and pale skin.", },
    { text: "They all call me the INFINITY KEEPER, but that is not my true name.", portrait: "resources/destroyer.png"  },
    { text: "I am THE DESTROYER.", portrait: "resources/destroyer.png"  },
    { text: "The woman dissapears into thin air.", },
    { text: "You are left speechless.", },
    { text: "You don't know what to think about this situation...", },
];
//singularity (red bg)
const cutsceneDialogue62 = [ 
    { text: "You detect the presence of a new superphysical value, in another universe.", },
    { text: "There is a link between infinity points and a new superphysical value called SINGULARITY POINTS.", },
    { text: "You decide to travel through this link. It feels unbearably long, but only a few seconds pass.", },
    { text: "You find yourself in a lush crimson red forest.", },
    { text: "It is quiet. So deafeningly quiet that the buzzing in your head becomes borderline unbearable.", },
    { text: "You walk through the forest with a rising fear of anxiety. All of your SPVs are gone, and you feel powerless.", },
    { text: "Eventually, you reach a clearing. A man lays down on the rock before sitting up and facing your direction.", },
    { text: "He looks strong, tall, and masculine. He also has scars all over his body, and is holding an axe as well.", },
    { text: "A visitor... We haven't had one in ages.", portrait: "resources/kres.png"  },
    { text: "Are you here to rescue us?", portrait: "resources/kres.png"  },
    { text: "I don't know where I am, I just made it here.", portrait: "resources/player.png"  },
    { text: "You decide to keep the fact that you can travel between universes a secret.", },
    { text: "This man could possibly help you find celestials here.", },
    { text: "Great. It looks like you're also stranded here. Are you by chance a part of the corporation?", portrait: "resources/kres.png"  },
    { text: "Excuse me?", portrait: "resources/player.png"  },
    { text: "The celestial hunting corporation, or the CHC by short.", portrait: "resources/kres.png"  },
    { text: "Our goal is to protect the multiverse from celestials, who are fierce beings of destruction.", portrait: "resources/kres.png"  },
    { text: "I'm looking for celestials as well, but I'm not aware of your corporation.", portrait: "resources/player.png"  },
    { text: "Damn. There is one celestial in this wasteland. His name is Matos, the Celestial of Machinery.", portrait: "resources/kres.png"  },
    { text: "Me and my team of nine fought him a long time ago, but he managed to kill five people.", portrait: "resources/kres.png"  },
    { text: "Now there are only four of us left.", portrait: "resources/kres.png"  },
    { text: "Life in the domain of singularity sucks... It's genuinely hell living here.", portrait: "resources/kres.png"  },
    { text: "Even another team was sent out to rescue us, but they ended up stranded as well.", portrait: "resources/kres.png"  },
    { text: "None of our portals work. None of our communication technology works either.", portrait: "resources/kres.png"  },
    { text: "The corporation probably assumes were dead. They've given up on us.", portrait: "resources/kres.png"  },
    { text: "It has been six years, and Matos is currently in a dormant state.", portrait: "resources/kres.png"  },
    { text: "We have no idea when he will return.", portrait: "resources/kres.png"  },
    { text: "Can I help you guys?", portrait: "resources/player.png"  },
    { text: "Of course. Since you know about celestials, you know about superphysical values right?", portrait: "resources/kres.png"  },
    { text: "Yeah. As a matter of fact, I am a foresight user.", portrait: "resources/player.png"  },
    { text: "Wicked awesome. I've always wanted to be a foresight user for ages.", portrait: "resources/kres.png"  },
    { text: "Only our weapons posess the power of superphysical values...", portrait: "resources/kres.png"  },
    { text: "Can I see what you are capable of?", portrait: "resources/kres.png"  },
    { text: "You reach a realization.", },
    { text: "Aside from destroying celestial cores and universal transportation,", },
    { text: "Superphysical values have not affected your physical strength.", },
    { text: "You come up with an excuse.", },
    { text: "Strange... My powers don't work here.", portrait: "resources/player.png"  },
    { text: "I think my superphysical values were reset when I came here.", portrait: "resources/player.png"  },
    { text: "It's okay. You could still be good use to us.", portrait: "resources/kres.png"  },
    { text: "You should follow me. I think this could help.", portrait: "resources/kres.png"  },
    { text: "You follow the man around, and you eventually stumble upon a large machine.", },
    { text: "This machine should be able to fuel the cores that should help us destroy Matos.", portrait: "resources/kres.png"  },
    { text: "Suddenly, you feel a strong superphysical pulse from the machine, and they shoot a strong burst of energy.", },
    { text: "Light fills your entire field of vision. You come to a realization:", },
    { text: "Everything that just happened feels like a blur.", },
    { text: "It has only been 30 minutes since you defeated Cante, and now you find yourself in this strange universe.", },
    { text: "And the damn cloaked being is the infinity keeper...", },
    { text: "Things are changing fast.", },
    { text: "It is up to you to find celestials.", },
    { text: "There will no longer be any help, for now.", },
    { text: "When the light fades out, you find yourself back in the overworld.", },
];
const cutsceneDialogue63 = [ //core equipped
    { text: "When you travel back to the domain of singularity, you find yourself waking up in a small shelter.", },
    { text: "Four people are standing in front of you, including the man from before.", },
    { text: "He's awake! He's awake!", portrait: "resources/nav.png"  },
    { text: "A woman with purple hair and a worn out witch's attire...", },
    { text: "Kres... Is this the guy you were talking about? Is he really a foresight user???", portrait: "resources/sel.png"  },
    { text: "A tall skinny man, with semi-long black hair, glasses, and a hat.", },
    { text: ".......", portrait: "resources/eclipse.png"  },
    { text: "A being completely made out of shadows... How interesting.", },
    { text: "Yes. This is the so-called foresight user.", portrait: "resources/kres.png"  },
    { text: "He seems to have activated the singularity core.", portrait: "resources/kres.png"  },
    { text: "Is that what foresight can do?", portrait: "resources/sel.png"  },
    { text: "You see the singularity core shine with a dull, faint gray glow.", },
    { text: "You feel a mild superphysical vibration eminate from the core.", },
    { text: "Interesting... Where did those machines come from?", portrait: "resources/player.png"  },
    { text: "I don't know. We found randomly found it one day.", portrait: "resources/kres.png"  },
    { text: "There seems to have been an ancient civilization that lived in the domain of singularity a long time ago.", portrait: "resources/nav.png"  },
    { text: "We believe a celestial killed them all... Maybe it was Matos.", portrait: "resources/nav.png"  },
    { text: "Why don't we all introduce ourselves!", portrait: "resources/kres.png"  },
    { text: "I'm Kres, and I'm excited to see what foresight can do.", portrait: "resources/kres.png"  },
    { text: "I'm Sel, and I don't know what to say.", portrait: "resources/sel.png"  },
    { text: "And I'm Nav. The only person here who can use magic.", portrait: "resources/nav.png"  },
    { text: "Oh shut up...", portrait: "resources/sel.png"  },
    { text: "Just saying. Magic is very cool.", portrait: "resources/nav.png"  },
    { text: "And the shadow being is Eclipse. He doesn't talk, but he does help us around.", portrait: "resources/kres.png"  },
    { text: "Nice to meet you all.", portrait: "resources/player.png"  },
    { text: "So what is your name?", portrait: "resources/sel.png"  },
    { text: "A name???", },
    { text: "You were never given a name...", },
    { text: 'You were always known as "The Creation".', },
    { text: "I wouldn't like to share my name.", portrait: "resources/player.png"  },
    { text: "You guys can just call me whatever you want for now.", portrait: "resources/player.png"  },
    { text: "I see. I'll just call you Mr.Foresight for now!", portrait: "resources/kres.png"  },
    { text: "I like that name. Mr.Foresight it is!", portrait: "resources/nav.png"  },
    { text: "How lame...", portrait: "resources/sel.png"  },
    { text: "These people seem pretty nice.", },
];
const cutsceneDialogue64 = [ //factory
    { text: "You see a large building appear in the overworld.", },
    { text: "At the door, you find a note. You read it.", },
    { text: '"I have to do something important. Destroy celestials without my guidance." -I.K', },
    { text: "You really are alone from now on.", },
    { text: "Hope this factory could help...", },
];
const cutsceneDialogue65 = [ //2nd singularity
    { text: "So Mr.Foresight, why do you want to kill celestials?", portrait: "resources/nav.png"  },
    { text: "Do you tell the truth?", },
    { text: "It's complicated, but I just have an inner desire to kill celestials.", portrait: "resources/player.png"  },
    { text: "Why do you guys do it?", portrait: "resources/player.png"  },
    { text: "Well it's our job, and we just have nothing else to do.", portrait: "resources/nav.png"  },
    { text: "We all come from universes that have been destroyed by the wrath of celestials.", portrait: "resources/nav.png"  },
    { text: "Yeah... I miss everyone.", portrait: "resources/sel.png"  },
    { text: "Celestials are the living incarnation of evil and destruction.", portrait: "resources/sel.png"  },
    { text: "They killed everyone I love! They destroyed everything I ever cared about!", portrait: "resources/sel.png"  },
    { text: "I only decided to keep living because I want revenge!", portrait: "resources/sel.png"  },
    { text: "To be honest... I lost my memory a while ago.", portrait: "resources/player.png"  },
    { text: "I have no idea who I am. I don't even know my own name.", portrait: "resources/player.png"  },
    { text: "I only live with this desire to kill celestials.", portrait: "resources/player.png"  },
    { text: "You remember Tav, a celestial who showed kindness.", },
    { text: "But I get this feeling that celestials were once human. They are struggling as well.", portrait: "resources/player.png"  },
    { text: "Don't listen to that propaganda. All celestials deserve to die!", portrait: "resources/kres.png"  },
    { text: "That's how you put them out of their misery after all...", portrait: "resources/kres.png"  },
    { text: "I watched celestials slaughter my family right in front of my eyes.", portrait: "resources/kres.png"  },
    { text: 'There\'s absolutely nothing "human" about that! It\'s pure madness!', portrait: "resources/kres.png"  },
    { text: "I watched celestials explode my home planet...", portrait: "resources/nav.png"  },
    { text: "Celestials turned all of my family and friends into monstrous abominations...", portrait: "resources/sel.png"  },
    { text: "I'm sorry... I'll try to help you out as much as I can!", portrait: "resources/player.png"  },
    { text: "It's okay. You're already doing a great job. You just gotta keep working on the singularity cores.", portrait: "resources/nav.png"  },
    { text: "Once you fully power up those cores, we would be able to summon Matos.", portrait: "resources/sel.png"  },
    { text: "And we might be able to escape as well.", portrait: "resources/sel.png"  },
];
const cutsceneDialogue66 = [ //3rd singularity (radiation)
    { text: "You notice your singularity cores start to emit a greenish mist.", },
    { text: "Kres, do you know what this mist is?", portrait: "resources/player.png"  },
    { text: "What mist?", portrait: "resources/kres.png"  },
    { text: "You don't see it??", portrait: "resources/player.png"  },
    { text: "It must be a superphysical value...", },
    { text: "This must be some superphysical substance...", portrait: "resources/player.png"  },
    { text: "I do have foresight after all.", portrait: "resources/player.png"  },
    { text: "So you can be able to see things that we can't.", portrait: "resources/kres.png"  },
    { text: "We must bring you to the temple! And let me know what you can see.", portrait: "resources/kres.png"  },
    { text: "Sure. I'd do anything to help!", portrait: "resources/player.png"  },
];
const cutsceneDialogue67 = [ //4th 
    { text: "You detect the presence of a new superphysical value.", },
    { text: "Singularity power: It seems a little bit too familiar.", },
    { text: "It has links with infinity points and negative infinity points.", },
    { text: "8 dimensions of production. Exactly like the antimatter world.", },
    { text: "How interesting...", },
];
const cutsceneDialogue68 = [ //funify 
    { text: "You watch as your collection of Oil, Anonymity, Repli-Grass, and Replicanti Points grow.", },
    { text: "Isn't it so strange how useful these SPV's are...", },
    { text: "They were what made Cante so strong. Why does it help me as well?", },
    { text: "Thinking about Cante makes you feel nauseous. You ignore it.", },
    { text: "The ground starts to shake. You notice a large yellow monolith rise on the ground.", },
    { text: "At the center of the monolith, there is a large smiley face.", },
    { text: "You hear a voice.", },
    { text: "I'm bored... I want to have some FUN!!!", portrait: "resources/jocus.png"  },
    { text: "Oh little creation. Sucks that you've killed Cante!", portrait: "resources/jocus.png"  },
    { text: "You find the voice very obnoxious and very headache-inducing.", },
    { text: "Who are you! Reveal yourself now!", portrait: "resources/player.png"  },
    { text: "Lightning strikes down from the monolith. You see a man with an extremely round head.", },
    { text: "His appearance is uncanny. His wide smile makes you feel uneasy.", },
    { text: "Well you poor thing! You must be so bored all the time...", portrait: "resources/jocus.png"  },
    { text: "Answering orders. Your entire life is just killing celestials!", portrait: "resources/jocus.png"  },
    { text: "And I know you'll just try to kill me when I tell you that I am a celestial as well!!!", portrait: "resources/jocus.png"  },
    { text: "Isn't that just so much fun!!!!!", portrait: "resources/jocus.png"  },
    { text: "Shut up. I actually want to kill celestials, you idiot!", portrait: "resources/player.png"  },
    { text: "Well I will introduce myself then! I am Jocus, the celestial of FUNNNNNN!!", portrait: "resources/jocus.png"  },
    { text: "I am Nova's messenger. As a matter of fact, Nova and Cante have been communicating the entire time!", portrait: "resources/jocus.png"  },
    { text: "Sending information is my specialty!", portrait: "resources/jocus.png"  },
    { text: "Nova is cool and all, but Cante I admire the most!", portrait: "resources/jocus.png"  },
    { text: "Too bad he's dead...", portrait: "resources/jocus.png"  },
    { text: "I will make sure Cante will get what he wanted!", portrait: "resources/jocus.png"  },
    { text: "How do you know who I am!? Explain yourself!", portrait: "resources/player.png"  },
    { text: "I also recieve information as well. I know what your purpose is. I know your past.", portrait: "resources/jocus.png"  },
    { text: "I know everything about you. Too bad I won't be telling you anything!!!", portrait: "resources/jocus.png"  },
    { text: "Jocus starts laughing, and your headache worsens.", },
    { text: "This is no good...", },
];
const cutsceneDialogue69 = [ //sfrgt 
    { text: "As your SFRGT increases, you notice something strange.", },
    { text: "You are enjoying this... As a matter of fact, you are having fun!", },
    { text: "This is no good...", },
    { text: "I see that smile on your face- this is working!", portrait: "resources/jocus.png"  },
    { text: "This superphysical value can manipulate one's emotions...", portrait: "resources/jocus.png"  },
    { text: "Aren't ya having a super fun real good time!", portrait: "resources/jocus.png"  },
    { text: "Cante... I told you I'm powerful! After all I did for you... WHY???", portrait: "resources/jocus.png"  },
    { text: "You are too ecstatic to even speak. What were you even doing again?", },
    { text: "Trying to kill Matos?", },
    { text: "And this random celestial shows up...", },
];
const cutsceneDialogue70 = [ //mood 
    { text: "Happiness, Sadnesss, Anger. You are experiencing all of these emotions at once.", },
    { text: "These emotions bring you into a state of hallucination.", },
    { text: "You start to remember something.", },
    { text: "You see the fog beings talk to each other.", },
    { text: "So why did you wipe his memory?", portrait: "resources/fogGuy2.png"  },
    { text: "He can not know about the proto-overworld, nor can we let him in there. It's too risky.", portrait: "resources/fogGuy1.png"  },
    { text: "His memories of the proto-overworld are too dangerous!", portrait: "resources/fogGuy1.png"  },
    { text: "You do know a lot of progress would be lost by wiping his memories, right?", portrait: "resources/fogGuy2.png"  },
    { text: "Wiping away his memories does have it's downsides, but we can't risk it.", portrait: "resources/fogGuy1.png"  },
    { text: "We can't ever lose the strongest foresight user ever created.", portrait: "resources/fogGuy1.png"  },
    { text: "The ability to know the EXACT number of superphysical values.", portrait: "resources/fogGuy1.png"  },
    { text: "The ability to instantly travel to other universes.", portrait: "resources/fogGuy1.png"  },
    { text: "These abilities have never been seen before. Years of research led up to this very moment.", portrait: "resources/fogGuy1.png"  },
    { text: "I understand.", portrait: "resources/fogGuy2.png"  },
    { text: "The proto overworld... Would it really be a good idea to avoid it at all costs?", },
];
const cutsceneDialogue71 = [ //challenge 
    { text: "You collect yourself, and the effects of the hallucination start to wear off.", },
    { text: "You are focused, and lacking emotion.", },
    { text: "Your stupid superphysical value won't work on me anymore.", portrait: "resources/player.png"  },
    { text: "Now give me a real challenge... You idiot.", portrait: "resources/player.png"  },
    { text: "Jocus turns around, and shows a face of disgust. It shocks you.", },
    { text: "Very well then. Beating this challenge will also destroy my core.", portrait: "resources/jocus.png"  },
    { text: "Have fun.", portrait: "resources/jocus.png"  },
];
const cutsceneDialogue72 = [ //finish challenge 
    { text: "You beat Jocus' challenge, and destroy his core.", },
    { text: "Welp. That was fun.", portrait: "resources/player.png"  },
    { text: "I knew today was the very day I would die!", portrait: "resources/jocus.png"  },
    { text: "Cante's plans... He may be gone, but one day they will happen!", portrait: "resources/jocus.png"  },
    { text: "Good luck, and have fun!!!", portrait: "resources/jocus.png"  },
    { text: "Jocus fades into dust." },
    { text: "Well wasn't that entire encounter just so interesting..." },
];
const cutsceneDialogue73 = [ // temple reveal - 7th singularity
    { text: "You arrive at a large temple. The sheer size overwhelms you." },
    { text: "As you walk in, you are greeted with the smell of dust." },
    { text: "You find thousands of bones pile up on the floor." },
    { text: "Something tragic must have happened to this civilization a long time ago...", portrait: "resources/nav.png"  },
    { text: "We believe celestials have caused this tragedy, but we just can't figure out how.", portrait: "resources/nav.png"  },
    { text: "As you go deeper in the temple, you find strange symbols carved on the floor." },
    { text: "Symbols of dice, rockets, stars, and staircases. It seems very familiar." },
    { text: "Kres notices the look on your face." },
    { text: "You know what these are?", portrait: "resources/kres.png"  },
    { text: "Interesting... These must be celestial symbols.", portrait: "resources/player.png"  },
    { text: "Yeah... We think so too.", portrait: "resources/kres.png"  },
    { text: "Since this is a temple, these celestials must have been worshipped.", portrait: "resources/kres.png"  },
    { text: "Why... Why would they worship celestials?", portrait: "resources/sel.png"  },
    { text: "You reach the center of the temple, and you find eight torches." },
    { text: "Each of the torches have different celestial symbols on them." },
    { text: "You notice that two of the torches are lit." },
    { text: "One torch was lit with a light blueish flame, and had an arrow symbol on it." },
    { text: "Another torch had a blue flame, and had three lines engraved on it." },
    { text: "Tav and Cante..." },
    { text: "Oh hey, why are these two torches lit all of a sudden?", portrait: "resources/sel.png"  },
    { text: "Interesting... Someone must have been here to light it.", portrait: "resources/kres.png"  },
    { text: "Mr.Foresight, do you feel any superphysical presence come from this light?", portrait: "resources/kres.png"  },
    { text: "Not that I know of. Sure is interesting though.", portrait: "resources/player.png"  },
    { text: "Damn... Everything is connected." },
    { text: "You eventually notice a giant force lurk underneath." },
    { text: "The presence of a celestial." },
    { text: "Guys. My foresight is warning me of the presence of a celestial.", portrait: "resources/player.png"  },
    { text: "I think it's dormant right now, but I can notice the presence underneath this temple.", portrait: "resources/player.png"  },
    { text: "This might be our chance at escape... What should we do?", portrait: "resources/kres.png"  },
    { text: "We can dig. I dunno.", portrait: "resources/sel.png"  },
    { text: "We should use our logic and think this through, dummy.", portrait: "resources/nav.png"  },
    { text: "A celestial is no joke.", portrait: "resources/nav.png"  },
    { text: "We should probably head out and come up with a plan.", portrait: "resources/player.png"  },
    { text: "There surely has to be a catch to all of this.", portrait: "resources/player.png"  },
    { text: "It's almost as if this celestial is waiting for us.", portrait: "resources/player.png"  },

];
const cutsceneDialogue74 = [ // hall of celestials
    { text: "You open your eyes, and find yourself in a giant hall." },
    { text: "The sky outside remains a dim blue. This hall appears to be floating in an endless universe of nothingness." },
    { text: "It looks just like the hall from all those flashbacks... something just feels off." },
    { text: "Look up at the sky, and you see three small celestial symbols." },
    { text: "Jocus. Tav. Cante." },
    { text: "Eventually, that sky will be filled with stars." },
    { text: "Stars for every celestial you kill." },
    { text: "Stars for every liberated soul, once suffering under eternal torture." },
    { text: "It still doesn't make any sense..." },
    { text: "Why you? Why have you been chosen to do complete this task?" },
    { text: "Do you actually have a choice in this world?" },
    { text: "..." },
    { text: "Just keep doing your job, creation." },

];
const cutsceneDialogue75 = [ //the plan - sing 25
    { text: "So... you're saying that powering up these cores can summon Matos, right?", portrait: "resources/player.png"  },
    { text: "Yes, but we need to know how to do that exactly.", portrait: "resources/kres.png"  },
    { text: "We've only found dormant cores, and only until you came here.", portrait: "resources/kres.png"  },
    { text: "Each core has a link to a different superphysical value..." },
    { text: "There must be an explanation for this." },
    { text: "What do you remember from the last time you encountered Matos?", portrait: "resources/player.png"  },
    { text: "I remember seeing a lot of bright lights...", portrait: "resources/sel.png"  },
    { text: "There was also a solar eclipse as well.", portrait: "resources/sel.png"  },
    { text: "I don't really know exactly what happened. I was too frightened.", portrait: "resources/sel.png"  },
    { text: "Silly little Sel... Always hiding.", portrait: "resources/nav.png"  },
    { text: "Oh be quiet... You were hiding as well!", portrait: "resources/sel.png"  },
    { text: "I promise that once we do fight Matos again, I won't hide anymore!", portrait: "resources/sel.png"  },
    { text: "Sure... Sure...", portrait: "resources/nav.png"  },
    { text: "I remember seeing an altar, with a bunch of fully powered up cores.", portrait: "resources/kres.png"  },
    { text: "The cores were reinforced with this strange looking metal...", portrait: "resources/kres.png"  },
    { text: "It's almost as if it was glowing with the power of a star.", portrait: "resources/kres.png"  },
    { text: "Interesting... I will try to figure out how I can obtain this metal.", portrait: "resources/player.png"  },
    { text: "I'll do what I can.", portrait: "resources/player.png"  },
];
const cutsceneDialogue76 = [ //core scraps
    { text: "There is plenty of metal nearby, what if we fuel the plain metal instead of cores?", portrait: "resources/player.png"  },
    { text: "Not a bad idea.", portrait: "resources/sel.png"  },
    { text: "Ooh you should try it out!", portrait: "resources/nav.png"  },
    { text: "You place the metal inside the fuel machine, and the metal comes out glowing, and you feel superphysical energy come out of the metal." },
    { text: "Maybe this could be useful." },
    { text: "Well isn't that just interesting...", portrait: "resources/sel.png"  },
    { text: "...", portrait: "resources/eclipse.png"  },
    { text: "Lightning proceeds to strike the singularity cores periodically." },
    { text: "Strange. Why are the lightning striking the cores so often?", portrait: "resources/kres.png"  },
    { text: "This could be a message from Matos... but I can't decipher the code.", portrait: "resources/player.png"  },
    { text: "Hurry! Someone get me pen and paper now!", portrait: "resources/sel.png"  },
    { text: "I know this cipher. We used this all the time in my home universe.", portrait: "resources/sel.png"  },
    { text: "It's morse code.", portrait: "resources/sel.png"  },
];
const cutsceneDialogue77 = [ //starmetal
    { text: "Sel writes down a series of dots and dashes, recording each symbol as each lightning strikes." },
    { text: "He proceeds to convert the dots and dashes into letters." },
    { text: '"POWER THE CORES. BRING THE STARLIGHT TO THE METAL. THEN WE CAN FIGHT."' },
    { text: "Those must be Matos' words. It has to be!", portrait: "resources/sel.png"  },
    { text: "Interesting. Matos wants to fight us. Why could that be the case?", portrait: "resources/player.png"  },
    { text: "It's the celestial's natural hunger for murder and blood. That's why.", portrait: "resources/kres.png"  },
    { text: "These celestials, and the pain that they have caused... they all deserve to die! ", portrait: "resources/kres.png"  },
    { text: "You know Kres, we share the same goal. I'll make sure it happens.", portrait: "resources/player.png"  },
    { text: "Guys... You might want to take a look at this.", portrait: "resources/nav.png"  },
    { text: "Nav goes to the machine and finds a lever hidden in the back." },
    { text: "She proceeds to switch the lever, and the machine turns into a bright pinkish yellowish blue." },
    { text: "The color is hard to describe." },
    { text: "Strange looking solar panels appear on top of the machine as well." },
    { text: "Interesting. Very interesting.", portrait: "resources/player.png"  },
];
const cutsceneDialogue78 = [ //du1
    { text: "You place scrap metal into the machine, and turn it on." },
    { text: "The machine starts buzzing violently." },
    { text: "Oh shoot. Is it breaking???", portrait: "resources/nav.png"  },
    { text: "All of a sudden, a rift appears and sucks you in whole." },
    { text: "You find yourself a new world." },
    { text: "It looks like the overworld, but it's a lot darker." },
    { text: "It is so dark, that you couldn't see your own feet touch the ground." },
    { text: "The only light source is from the machine, that came to this world with you." },
    { text: "You are starting to understand what is going on." },
    { text: "You must power up the metal with these new superphysical values." },
];
const cutsceneDialogue79 = [ //earning starmetal
    { text: "You wake up on the ground, and you hold a glowing, radiant piece of metal." },
    { text: "This must be it! Nav, you genius!", portrait: "resources/kres.png"  },
    { text: "So this must be the starmetal alloy that Matos wants us to use.", portrait: "resources/nav.png"  },
    { text: "And we are going to use this to reinforce the singularity cores.", portrait: "resources/nav.png"  },
    { text: "Oh hey. You're awake.", portrait: "resources/sel.png"  },
    { text: "What just happened?", portrait: "resources/player.png"  },
    { text: "You were unconcious for like 30 seconds. Seems like the machine is a little dangerous.", portrait: "resources/sel.png"  },
    { text: "Strange.", portrait: "resources/player.png"  },
    { text: "Well isn't that just very strange." }, 
    { text: "It felt like you were in that dark universe for hours." }, 
    { text: "Could time run differently in different universes?" }, 
    { text: "What if this is a bad idea...", portrait: "resources/kres.png"  },
    { text: "There is the possibility that Matos is just using us.", portrait: "resources/kres.png"  },
    { text: "What other choice do we have? We have nowhere to go.", portrait: "resources/sel.png"  },
    { text: "I'd rather have a small chance at escaping than never even trying to.", portrait: "resources/sel.png"  },
    { text: "Plus. If we actually do defeat Matos, think of all the money we would earn! Our salaries will triple!!!", portrait: "resources/sel.png"  },
    { text: "You know what, you're right.", portrait: "resources/kres.png"  },
    { text: "We have been here for years. Boss probably thinks we are dead.", portrait: "resources/kres.png"  },
    { text: "We must restore the hope of celestial hunters! We must make it out alive!", portrait: "resources/kres.png"  },
    { text: "Kres points at you." }, 
    { text: "And look at you. You have been blessed with the power of foresight!", portrait: "resources/kres.png"  },
    { text: "Even if our chances of defeating the celestial is small, a chance is still a chance.", portrait: "resources/kres.png"  },
    { text: "You know what, we still don't get paid enough for this. It's like we have a home to go to anyways.", portrait: "resources/nav.png"  },
    { text: "I'm tired. Let's all get a good nights sleep.", portrait: "resources/nav.png"  },
    { text: "Should you tell them that you've defeated celestials before?" }, 
];
const cutsceneDialogue80 = [ //Matos card (unlocking matos layer)
    { text: "You pull out a card from the light extractor, and it is one you have never seen." },
    { text: "You hear whispering in the distance." },
    { text: "It is an unintelligible chant." },
    { text: "You return back to the domain of singularity." },
    { text: "An altar appears in front of you." },
    { text: "Four runes — each for a condition you must satisfy." },
    { text: "This is it. You must pass these conditions in order to summon Matos..." },
    { text: "You just need to make final preparations." },

]; 
const cutsceneDialogue81 = [ //Matos requirement #1
    { text: "As one of the runes in the altar activates, you are sent to a flashback." },
    { text: "You find yourself in an overly polluted world. Buildings stretch to the sky." },
    { text: "Architecture and ash extend so far that the sun is completely blocked." },
    { text: "From a distance, you hear prayers." },
    { text: "You see a man covered in blood, praying at a strange looking symbol." },
    { text: "The man appears to be a scientist, with brown hair and glasses." }, //TODO: Draw a sprite for this
    { text: "Please Nova... I pray to you. Bring the skies back to blue. Bring the ground back to green.", portrait: "resources/humanMatos.png"  },
    { text: "Please bring us the peace and prosperity of a world untouched by the perils of industrialization.", portrait: "resources/humanMatos.png"  },
    { text: "You look in the distance. You see piles and piles of dead bodies." },
    { text: "You see people throw the bodies into large bags." },
    { text: "Is this a world where anyone would want to live in?", portrait: "resources/humanMatos.png"  },
    { text: "126 billion people... 126 billion people who are suffering.", portrait: "resources/humanMatos.png"  },
    { text: "Nova! Grant me the power to free these people from their pain!", portrait: "resources/humanMatos.png"  },
    { text: "Nova... That is the name Jocus mentioned." },
    { text: "How interesting..." },


]; 
const cutsceneDialogue82 = [ //Matos requirement #2
    { text: "As one of the runes in the altar activates, you are sent to a flashback." },
    { text: "You arrive at what seems like a large temple." },
    { text: "It is the same temple you and the others have visited." },
    { text: "A ritual has finished." },
    { text: "A celestial has been created." },
    { text: "You hear a voice echo from the center of the temple." },
    { text: "Your prayers have been answered. You have been granted with the power you deserve.", portrait: "resources/nova.png"  }, //TODO: Draw a sprite for this
    { text: "Along with getting the rights to exterminate the people of this planet, I do request you a favor.", portrait: "resources/nova.png"  }, 
    { text: "I want you to free me.", portrait: "resources/nova.png"  }, 
    { text: "One day, three people will arrive on this planet.", portrait: "resources/nova.png"  }, 
    { text: "Three people terrorized by my celestials.", portrait: "resources/nova.png"  }, 
    { text: "Three people whose souls are intertwined with the souls of celestials.", portrait: "resources/nova.png"  }, 
    { text: "Once those souls align perfectly with the markings of this temple,", portrait: "resources/nova.png"  }, 
    { text: "I will be freed from my chains.", portrait: "resources/nova.png"  }, 
    { text: "After that, I will grant you your freedom.", portrait: "resources/nova.png"  },
    { text: "Three people..." },
    { text: "Terrorized by celestials..." },
    { text: "Kres. Nav. Sel." },
    { text: "You must warn them!" },
    { text: "They are being used!!!" },
    { text: "They are being manipulated!!!" },
]; 
const cutsceneDialogue83 = [ //Matos requirement #3
    { text: "As one of the runes in the altar activates, you are sent to a flashback." },
    { text: "You find yourself in a labratory." },
    { text: "You see a man, covered in blood hold what seems to be like an early prototype of a singularity core." },
    { text: "I have done it. I finally created a core using starmetal alloy.", portrait: "resources/humanMatos.png"  },
    { text: "Nova, I have developed what you want.", portrait: "resources/humanMatos.png"  },
    { text: "You hear a voice ring in your head." },
    { text: "Very well done. Create enough of these and I will grant you your wishes.", portrait: "resources/nova.png"  },
    { text: "You will obtain the power that you desire.", portrait: "resources/nova.png"  },
    { text: "The world is a horrible place.", portrait: "resources/humanMatos.png"  },
    { text: "Those at the top are horrible people, and they deserve to die.", portrait: "resources/humanMatos.png"  },
    { text: "Those at the bottom are suffering, and they deserve liberation.", portrait: "resources/humanMatos.png"  },
    { text: "The end of humanity itself is the best option.", portrait: "resources/humanMatos.png"  },
    { text: "Who is this scientist?" },
]; 
const cutsceneDialogue84 = [ //Matos requirement #4 (Extinction of humanity and matos as a celestial.)
    { text: "As one of the runes in the altar activates, you are sent to a flashback." },
    { text: "You see a world covered in flames." },
    { text: "Large beams of energy strike down on the ground." },
    { text: "The tallest of buildings crash down." },
    { text: "You see gallons of blood spew out from every direction." },
    { text: "In the distance, you see a robotic figure in the air." },
    { text: "You see the figure control thousands of singularity cores, each of them striking down massive beams of energy." },
    { text: "The energy rips right through cities. The ground falls apart from the destruction." },
    { text: "This is the end of humanity." },
    { text: "Maybe celestials are truly destructive creatures after all." },
]; 
const cutsceneDialogue85 = [ //Unlocking Matos
    { text: "You and the others stand in front of the altar. The center glows with a bright red hue." },
    { text: "The altar shakes violently, and the ground starts opening up." },
    { text: "I have returned... Thanks for freeing me yet again!", portrait: "resources/matos.png"  },
    { text: "Now I can finally finish my job.", portrait: "resources/matos.png"  },
    { text: "It's Matos... The same celestial you saw in the flashback." },
    { text: "I don't give a single DAMN about what you want to do.", portrait: "resources/kres.png"  },
    { text: "WE also have a job to finish.", portrait: "resources/kres.png"  },
    { text: "Sel is struck with fear." },
    { text: "That THING is a celestial???", portrait: "resources/sel.png"  },
    { text: "Celestials come in all shapes and sizes.", portrait: "resources/nav.png"  },
    { text: "Didn't you learn this in training?", portrait: "resources/nav.png"  },
    { text: "All that matters is that this celestial gets destroyed.", portrait: "resources/player.png"  },
    { text: "You damn fools... I have killed billions and billions of people.", portrait: "resources/matos.png"  },
    { text: "You four mean absolutely nothing to me.", portrait: "resources/matos.png"  },
    { text: "And does that matter? I've also killed celestials.", portrait: "resources/player.png"  },
    { text: "As a matter of fact, I've found it quite easy so far.", portrait: "resources/player.png"  },
    { text: "It is my goal to bring the end to all of them!", portrait: "resources/player.png"  },
    { text: "The group is shocked." },
    { text: "You've KILLED CELESTIALS BEFORE???", portrait: "resources/kres.png"  },
    { text: "Why are you hiding this from us!", portrait: "resources/kres.png"  },
    { text: "Damn it! Why did you do it! Why did you tell them???" },
    { text: "Just trust me! I can help you get out here.", portrait: "resources/player.png"  },
    { text: "You didn't have to do this!!!" },
    { text: "I'll explain everything after this fight!", portrait: "resources/player.png"  },
    { text: "Matos starts laughing like a madman." },
    { text: "So we will fight! Very well then.", portrait: "resources/matos.png"  },
    { text: "The ground opens up even wider." },
    { text: "Matos proceeds to dive down into the hole." },
    { text: "You start to feel a pulsing beat." },
    { text: "Is that a heartbeat...", portrait: "resources/sel.png"  },
    { text: "It must be Matos' celestial core.", portrait: "resources/kres.png"  },
    { text: "We must go down and destroy it!", portrait: "resources/kres.png"  },
    { text: "You see Eclipse in the distance, glowing with anger." },
    { text: "...", portrait: "resources/eclipse.png"  },
    { text: "Alright, let's go now.", portrait: "resources/kres.png"  },
    { text: "Uhh guys, I don't know how to say this, but I don't really know how to fight.", portrait: "resources/player.png"  },
    { text: "You've killed multiple celestials? How is that even the case?", portrait: "resources/nav.png"  },
    { text: "Here's the thing: I've just used superphysical values to destroy their cores.", portrait: "resources/player.png"  },
    { text: "I've never actually had one-on-one combat before.", portrait: "resources/player.png"  },
    { text: "Here's what I can do.", portrait: "resources/player.png"  },
    { text: "I can increase your power exponentially using my foresight and superphysical values.", portrait: "resources/player.png"  },
    { text: "Kres pats you on the back." },
    { text: "I think that's all we need.", portrait: "resources/kres.png"  },
    { text: "Our goal is to kill the celestial with our own power.", portrait: "resources/kres.png"  },
    { text: "Don't worry Mr.Foresight, we will give you some of the rewards too!", portrait: "resources/sel.png"  },
    { text: "We'll invite you to join the Celestial Hunting Corporation after all of this is over.", portrait: "resources/nav.png"  },
    { text: "Alright, let's go now. For real this time.", portrait: "resources/kres.png"  },
]; 
const cutsceneDialogue86 = [ //Unlock AU2
    { text: "The rocket launches, and as it flies into the empty space, a tear forms in the fabric of reality." },
    { text: "A superphysical link opens up to another universe." },
    { text: "When you travel to it, you find yourself in a world filled with stars and nebulae." },
    { text: "Galaxies stretch farther than the eye can see. The sky is illuminated with celestial objects." },
    { text: "A complete opposite to the antimatter world..." },
    { text: "How interesting." },
]; 
const cutsceneDialogue87 = [ //Entering depth 1
    { text: "You and the others descend into the hole, and the beating sound intensifies." },
    { text: 'So you guys are what they call "Celestial Hunters". Mere humans.', portrait: "resources/matos.png"  },
    { text: 'A group of people who put all this time and effort into killing us, but fail repeatedly.', portrait: "resources/matos.png"  },
    { text: 'These are my weakest celestialites. Descend deeper and you will face stronger celestialites.', portrait: "resources/matos.png"  },
    { text: "Oh I've definitely fought against these guys before.", portrait: "resources/kres.png"  },
    { text: "Yeah this shouldn't be a problem for us...", portrait: "resources/sel.png"  },
    { text: "I can help you guys!", portrait: "resources/player.png"  },
    { text: "You extend your arms out and pure superphysical energy surges out of your arms." },
    { text: "The power of singularity points. The power of check back. Starmetal Alloy." },
    { text: "You can't let this go to waste." },
    { text: "The energy gets transferred over to your teammates." },
    { text: "Wow... I feel a lot lighter now! Thank you Mr.Foresight.", portrait: "resources/nav.png"  },
    { text: "Hell yeah. This is feels great!", portrait: "resources/kres.png"  },
    { text: 'That power... It must be you!', portrait: "resources/matos.png"  },
    { text: '...', portrait: "resources/eclipse.png"  },
    { text: "Matos starts laughing." },
    { text: "How confusing." },
    { text: "Come on! Let's try to make it deeper into the hole!", portrait: "resources/kres.png"  },
    { text: "I think his core is in there.", portrait: "resources/kres.png"  },
]; 
const cutsceneDialogue88 = [ //Entering depth 2
    { text: "As you and the others go further in the hole, you notice the temperatures increase." },
    { text: "How much further do we have to go... It's so damn hot in here.", portrait: "resources/sel.png"  },
    { text: "Stop complaining! I can see the core from here.", portrait: "resources/nav.png"  },
    { text: "Mr.Foresight please, can you do something to make it colder in here?", portrait: "resources/sel.png"  },
    { text: "Nope.", portrait: "resources/player.png"  },
    { text: "You see an army of stronger celestialites approach you." },
    { text: "So this is the power of foresight. How interesting.", portrait: "resources/matos.png"  },
    { text: "A power meant to counteract those of celestials.", portrait: "resources/matos.png"  },
    { text: "Without HIS foresight, you three are absolutely nothing.", portrait: "resources/matos.png"  },
    { text: "Either way, if you guys do defeat me... You have already lost!", portrait: "resources/matos.png"  },
    { text: "What do you mean we've already lost???", portrait: "resources/kres.png"  },
    { text: "Oh you will see...", portrait: "resources/matos.png"  },
    { text: "You bastard!!! Stop gatekeeping!", portrait: "resources/nav.png"  },
    { text: "The only thing we can do is defeat Matos' core.", portrait: "resources/player.png"  },
    { text: "Let's go guys.", portrait: "resources/player.png"  },
    { text: "God damn it...", portrait: "resources/sel.png"  },
    { text: "Even if we die right here, defeating this celestial will prove that our lives weren't in vain!", portrait: "resources/kres.png"  },
    { text: "You guys are all idiots.", portrait: "resources/matos.png"  },
]; 
const cutsceneDialogue89 = [ //Entering depth 3
    { text: "You and the others somehow destroy this batch of celestialites." },
    { text: "You are all lasting longer than I thought. How impresssive.", portrait: "resources/matos.png"  },
    { text: "Another fleet of celestialites spawn." },
    { text: "These celestialites radiate a significantly stronger superphysical presence." },
    { text: "These are my strongest celestialites. Defeat them, and then you will get to me.", portrait: "resources/matos.png"  },
    { text: "Damn it... Why are there more???", portrait: "resources/sel.png"  },
    { text: "Sel grabs a strange drink in his bag, and he chugs it." },
    { text: "What the hell? Where did you get that from???", portrait: "resources/nav.png"  },
    { text: "I've been keeping this for years. Now is the time I use it.", portrait: "resources/sel.png"  },
    { text: "You sense superphysical energy come from the drink." },
    { text: "Interesting drink you got there Sel.", portrait: "resources/player.png"  },
    { text: "It's a drink that the celestial hunting corporation gives us.", portrait: "resources/sel.png"  },
    { text: "I don't know what it does, but it makes me feel even more energized.", portrait: "resources/sel.png"  },
    { text: "Looks like superphysical performance enhancing drugs exist now." },
    { text: "Listen to me Kres. Remember Jeremy? You came on this very mission with him.", portrait: "resources/sel.png"  },
    { text: "Yes?", portrait: "resources/kres.png"  },
    { text: "I've actually gone on a mission with him, and we were fighting a celestial.", portrait: "resources/sel.png"  },
    { text: "That celestial was just a child, stuck in the body and mind of a celestial. He had dreams. Desires. He wanted to be free.", portrait: "resources/sel.png"  },
    { text: "But Jeremy ignored all of that. He believed that all celestials existed for the purpose of destruction and suffering of others.", portrait: "resources/sel.png"  },
    { text: "Somehow I knew. I saw the innocence in that celestial. What if Matos is just the same?", portrait: "resources/sel.png"  },
    { text: "Look. Theres nothing we can do. Once someone turns into a celestial, they stay a celestial.", portrait: "resources/kres.png"  },
    { text: "And from what I know about Matos is that he is out to kill us. Let's go.", portrait: "resources/kres.png"  },
    { text: "Matos somehow overhears Sel's conversation." },
    { text: "I was human a long time ago. But now I am a celestial. I have power! I have strength!", portrait: "resources/matos.png"  },
    { text: "But I do not have freedom.", portrait: "resources/matos.png"  },
    { text: "That's why I must free Nova... He will grant me with freedom, even if I die trying.", portrait: "resources/matos.png"  },
    { text: "So I must complete the job I started!!!", portrait: "resources/matos.png"  },
]; 
const cutsceneDialogue90 = [ //Start of matos fight
    { text: "As the fifth omega celestialite is slain, a light emanates from the deepest depths of the hole." },
    { text: "Matos' form appears from the light. A metallic being made out of red-glowing rusted metal and steel." },
    { text: "We have to fight... That???", portrait: "resources/sel.png"  },
    { text: "Sel starts shaking in fear." },
    { text: "I have gotten stronger ever since I devoured those celestial hunter souls...", portrait: "resources/matos.png"  },
    { text: "Matos points at you." },
    { text: "I've heard many things about you. You've been designed as a weapon to destroy us celestials.", portrait: "resources/matos.png"  },
    { text: "You go by many names. The creation. The spawn of the proto-overworld. The savior.", portrait: "resources/matos.png"  },
    { text: "You've been one heavy topic of discussion in the celestial community.", portrait: "resources/matos.png"  },
    { text: "I can't kill you yet.", portrait: "resources/matos.png"  },
    { text: "Matos glares at Sel, Kres, and Nav." },
    { text: "However, you three can be put to good use.", portrait: "resources/matos.png"  },
    { text: "Beams of superphysical energy come out of Matos and hold Kres, Sel and Nav." },
    { text: "What is this weird feeling???", portrait: "resources/nav.png"  },
    { text: "Strange symbols appear on Kres, Sel, and Nav's stomach." },
    { text: "Are these celestial symbols?", portrait: "resources/kres.png"  },
    { text: "I have been waiting thousands of years for this very moment.", portrait: "resources/matos.png"  },
    { text: "Our battle will begin.", portrait: "resources/matos.png"  },
]; 
const cutsceneDialogue91 = [ //Matos is defeated
    { text: "After a long and grueling battle, you and your team manage to defeat Matos' core." },
    { text: "Matos' body starts to disintegrate, and the light that was emanating from him starts to fade." },
    { text: "You fools actually did it... I guess that's the unstoppable force of foresight.", portrait: "resources/matos.png"  },
    { text: "I have done my job. I have done my job well.", portrait: "resources/matos.png"  },
    { text: "Now I can visit the land where the sun shines and the grass grows green.", portrait: "resources/matos.png"  },
    { text: "This wretched land is no place for humanity to exist.", portrait: "resources/matos.png"  },
    { text: "We actually did it.", portrait: "resources/sel.png"  },
    { text: "Lets gooo!!! Imagine the promotion we'll be recieving when we return!", portrait: "resources/nav.png"  },
    { text: "I have a bad feeling about this.", portrait: "resources/kres.png"  },
    { text: "A giant beam of light shoots out of Matos' core, illuminating the night sky." },
    { text: "I have freed Nova and the Novasent. They will be reborn, and they will be more powerful than ever.", portrait: "resources/matos.png"  },
    { text: "The symbols on Kres, Nav, and Sel start to glow, and large amounts of energy get released into one large vortex." },
    { text: "What is happening???", portrait: "resources/nav.png"  },
    { text: "I don't know!", portrait: "resources/kres.png"  },
    { text: "Man I just wanna go home...", portrait: "resources/sel.png"  },
    { text: "Matos! Damn it! What are you doing???", portrait: "resources/player.png"  },
    { text: "Defeating me won't allow your friends to leave this universe.", portrait: "resources/matos.png"  },
    { text: "You must defeat... THEM.", portrait: "resources/matos.png"  },
    { text: "Kres, Nav, and Sel drop unconscious, and the hole starts to collapse in on itself." },
    { text: "Eclipse starts to morph wings, and picks up you and your entire team out of the hole using a gravitational force." },
    { text: "What is going on right now? You are utterly shocked and confused." },
    { text: "You look up. Three symbols fill the night sky. One was a dice, another was a star, and another was a ladder." },
    { text: "A giant circle draws itself and connects the three symbols." },
    { text: "A dot appears in the center of the circle, and shoots thirteen beams of energy." },
    { text: "The singularity cores are destroyed." },
    { text: "The superphysical presence is strong... Almost overwhelming." },
    { text: "Another superphysical force fills the air." },
]; 
const cutsceneDialogue92 = [ //Nova's introduction
    { text: "All of a sudden, you find youself in an empty void." },
    { text: "You see a rainbow colored floating orb of energy that is the same symbol on the sky." },
    { text: "The orb stars to speak." },
    { text: "Nice to meet you.", portrait: "resources/nova.png"  },
    { text: "I am Nova, the Celestial of Singularity.", portrait: "resources/nova.png"  },
    { text: "So it must be YOU... YOU did this to Kres, Nav, and Sel. It was YOU!", portrait: "resources/player.png"  },
    { text: "Calm down. Calm down. I only want to chat.", portrait: "resources/nova.png"  },
    { text: "Matos and Jocus did their job well, I have to say.", portrait: "resources/nova.png"  },
    { text: "In the grand scheme of things, they don't even matter.", portrait: "resources/nova.png"  },
    { text: "I know you will kill me, but at your current level, you are no match for me.", portrait: "resources/nova.png"  },
    { text: "As a matter of fact, most of us celestials have already accepted our fate.", portrait: "resources/nova.png"  },
    { text: "If you've all accepted your fate, what is the point of even trying to fight back anyways?", portrait: "resources/player.png"  },
    { text: "Most celestials want to die, but they have unfinished goals and aspirations.", portrait: "resources/nova.png"  },
    { text: "For example, Matos wanted to liberate his civilization.", portrait: "resources/nova.png"  },
    { text: "My goal? To get back at my damn brother.", portrait: "resources/nova.png"  },
    { text: "Only hell knows what he could possibly be doing right now.", portrait: "resources/nova.png"  },
    { text: "Now that I am freed, I will kill him.", portrait: "resources/nova.png"  },
    { text: "What's up with your brother?", portrait: "resources/player.png"  },
    { text: "...", portrait: "resources/nova.png"  },
    { text: "Innocent lives are at stake here.", portrait: "resources/nova.png"  },
    { text: "I know I am a celestial, and that doesn't matter to me, but...", portrait: "resources/nova.png"  },
    { text: "There is a place where celestials live happily.", portrait: "resources/nova.png"  },
    { text: "A place where celestials can safely refuge and avoid the tragedies associated with celestialhood.", portrait: "resources/nova.png"  },
    { text: "My brother wants to take advantage of that place.", portrait: "resources/nova.png"  },
    { text: "I must stop him, but he is not the only one who will put these celestials in danger.", portrait: "resources/nova.png"  },
    { text: "I know you thirst for the blood of celestials as well.", portrait: "resources/nova.png"  },
    { text: "You will also search for that land and you will kill for all the innocent celestials living there.", portrait: "resources/nova.png"  },
    { text: "I can't let you do that either. I know you're a weapon meant to destroy celestials, but I won't let that stop me.", portrait: "resources/nova.png"  },
    { text: "I will make sure you never gain access to that land. ", portrait: "resources/nova.png"  },
    { text: "...", portrait: "resources/player.png"  },
    { text: "So this is my identity now.", portrait: "resources/player.png"  },
    { text: "A ruthless murderer.", portrait: "resources/player.png"  },
    { text: "How ironic. You celestials kill and kill and now you want to avoid genocide?", portrait: "resources/player.png"  },
    { text: "You guys are all idiots.", portrait: "resources/player.png"  },
    { text: "So a land exists where celestials live freely... Despite their horrible crimes."  },
    { text: "You can't tolerate this."  },
]; 
const cutsceneDialogue93 = [ //Waking up
    { text: "You wake up, and see Kres, Nav, Sel, and Eclipse." },
    { text: "The entire landscape has been altered." },
    { text: "Massive beams of light fill the sky." },
    { text: "What the hell happened here?", portrait: "resources/player.png"  },
    { text: "Looks like we all passed out.", portrait: "resources/kres.png"  },
    { text: "I think Matos' death caused this.", portrait: "resources/kres.png"  },
    { text: "Why can't we just go home yet???", portrait: "resources/sel.png"  },
    { text: "Shut up Sel. You've been complaining for the past few years.", portrait: "resources/nav.png"  },
    { text: "Exactly! We've been here for years! Why can't we just get out of here already!", portrait: "resources/sel.png"  },
    { text: "...", portrait: "resources/eclipse.png"  },
    { text: "Looks like there are more celestials that we have to fight.", portrait: "resources/player.png"  },
    { text: "Oh great. Another few years of living here.", portrait: "resources/nav.png"  },
    { text: "Well it's not going to take years if we get working! Come on! We gotta figure this out!", portrait: "resources/kres.png"  },
    { text: "You find scattered fragments of singularity cores throughout the land. You pick a piece up." },
    { text: "Interesting... Maybe this can help us.", portrait: "resources/player.png"  },
    { text: "Another celestial has been defeated, and many more are waiting." },
]; 
const cutsceneDialogue94 = [ //Check back fighting
    { text: "Marcel visits you." },
    { text: "Looks like you've defeated Matos. I'm pretty sure you want to refine your skills with superphysical combat.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "Yeah. I want to get good at one-on-one combat, but I don't know where to start.", portrait: "resources/player.png"  },
    { text: "Before we engage on a 1v1 training match, you should master your skills at using superphysical values to control others.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "I have simulated a way for you to fight temporal celestialites. Once you get good enough, I'll teach you how to use your own strength to fight.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "So how would I fight these temporal celestialites?", portrait: "resources/player.png"  },
    { text: "Through the pets, of course.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "You can use the power of starmetal essence to train the pets into superphysical fighters.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
    { text: "After that, only time will make them stronger.", portrait: "resources/Pets/marcelAcoplaoEvoPet.png"  },
]; 
const cutsceneDialogue95 = [ //rocket upgrade
    { text: "The rocket doubles in size, and looks better than ever." }, 
    { text: "However, you get a weird feeling about something." }, 
    { text: "You decide to return your consciousness back to the domain of singularity." }, 
    { text: "Something feels off..." }, 
    { text: "Mr.Foresight! Come here! Now!!! It's an emergency!!!", portrait: "resources/kres.png"  },
    { text: "What happened?", portrait: "resources/player.png"  },
    { text: "You walk over to Kres, and you see Sel lying unconscious." }, 
    { text: "A star symbol is glowing over his body. A celestial symbol." }, 
    { text: "He's still breathing, but he won't wake up! It's like he's in a coma.", portrait: "resources/nav.png"  },
    { text: "This must be the work of another celestial... Do you know what to do?", portrait: "resources/nav.png"  },
    { text: "Damn......" }, 
    { text: "Well this is no good." }, 
    { text: "And even more strange, the symbol on Sel's body has a superphysical link to Alt-Universe 2." }, 
    { text: "How peculiar." }, 
    { text: "I might be able to help him, but it could take a while.", portrait: "resources/player.png"  },
    { text: "How would you be able to do it?", portrait: "resources/kres.png"  },
    { text: "I can't say, but I think I can help him.", portrait: "resources/player.png"  },
    { text: "Alt-Universe 2... The world filled with stars. A celestial is there right now." }, 
]; 
const cutsceneDialogue96 = [ //star expo
    { text: "You re-enter Alt-Universe 2, and a strong celestial presence hits you." }, 
    { text: "A spaceship flies towards you." }, 
    { text: "The door on the spaceship opens, and you enter it." }, 
    { text: "You are greeted with the presence of a seemly alien-looking woman, with green skin." }, 
    { text: "Who are you, and what do you want from me?", portrait: "resources/player.png"  },
    { text: "I am Geroa, and I am under direct control by Iridite, the Astral Celestial.", portrait: "resources/geroa.png"  },
    { text: "Your friend Sel, is being held hostage right now.", portrait: "resources/geroa.png"  },
    { text: "What??? Why would you do this to him???", portrait: "resources/player.png"  },
    { text: "It's not my fault. I was commanded to do it.", portrait: "resources/geroa.png"  },
    { text: "Okay... So what do you want from me?", portrait: "resources/player.png"  },
    { text: "I know you are going to kill Iridite, but I can't let that happen.", portrait: "resources/geroa.png"  },
    { text: "Geroa starts blinking in a strange pattern." }, 
    { text: "Is that morse code?" }, 
    { text: "Shoot... only Sel knows how to decipher morse code." }, 
    { text: "Listen to me... I need help. Please...", portrait: "resources/geroa.png"  },
    { text: "Tears stream down Geroa's face." }, 
    { text: "What is happening?" }, 
    { text: "Is Iridite taking extreme control over Geroa?" }, 
    { text: "How despicable." }, 
    { text: "Geroa points at Sel." }, 
    { text: "I need you to extract his soul using your powers, or else... Or else... Iridite...", portrait: "resources/geroa.png"  },
    { text: "What??? I can't just do that! I don't even know how to...", portrait: "resources/player.png"  },
    { text: "Why does Iridite want Sel's soul in the first place?", portrait: "resources/player.png"  },
    { text: "...", portrait: "resources/geroa.png"  },
    { text: "All of a sudden, Geroa contorts and writhes with pain." }, 
    { text: "I'm sorry Iridite! I'm sorry! Please make it stop!!!", portrait: "resources/geroa.png"  },
    { text: "Looks like I've said too much...", portrait: "resources/geroa.png"  },
    { text: "Let's go visit Sel.", portrait: "resources/geroa.png"  },
]; 
const cutsceneDialogue97 = [ //star expo #2
    { text: "You enter a room in the spaceship, and see Sel." }, 
    { text: "He is tied to a chair with using a strange superphysical force." }, 
    { text: "What is happening right now? Where am I?", portrait: "resources/sel.png"  },
    { text: "Sel, I know this may seem crazy, but we're in a completely different universe.", portrait: "resources/player.png"  },
    { text: "Who did this to me... I want to go home!", portrait: "resources/sel.png"  },
    { text: "I didn't do anything.", portrait: "resources/player.png"  },
    { text: "I'm sorry, but you're going to have to give me your soul. Don't make me do this the hard way.", portrait: "resources/geroa.png"  },
    { text: "I'm so confused right now...", portrait: "resources/sel.png"  },
    { text: "Don't worry Sel, I will try to stop this.", portrait: "resources/player.png"  },
    { text: "You try using your superphysical powers, but they seem to not work in the ship." }, 
    { text: "Listen to me Geroa, or whatever your name was. Bring me to Iridite now. I can help free you.", portrait: "resources/player.png"  },
    { text: "Geroa nods in silence." }, 
]; 
const cutsceneDialogue98 = [ //star expo #3
    { text: "You approach the next star, and you see Geroa shake in fear." }, 
    { text: "I'm sorry Iridite... I'm sorry Iridite... I'll be the perfect creation you wanted... I'm sorry.", portrait: "resources/geroa.png"  },
    { text: "Iridite? That name rings a bell.", portrait: "resources/sel.png"  },
    { text: "Sel's eyes open wide." }, 
    { text: "He remembers." }, 
    { text: "Oh no... OH GOD NO...", portrait: "resources/sel.png"  },
    { text: "The sudden insanity of the people around you confuses you." }, 
    { text: "IRIDITE???", portrait: "resources/sel.png"  },
    { text: "Sel starts shaking violently, trying to resist the restraints put on him." }, 
    { text: "Geroa walks over to him and injects him with a tranquilizer, making him go unconscious." }, 
    { text: "Even more tears stream down Geroa's face." }, 
    { text: "Why does this have to happen??? Why???", portrait: "resources/geroa.png"  },
    { text: "What is going on?" }, 
    { text: "I'm very sorry foresight user. I don't feel Iridite's superphysical presence right now.", portrait: "resources/geroa.png"  },
    { text: "You see, your friend Sel was one of Iridite's test subjects.", portrait: "resources/geroa.png"  },
    { text: "Iridite experimented on many souls to see if she could create a celestial of her own.", portrait: "resources/geroa.png"  },
    { text: "I am actually a half celestial myself.", portrait: "resources/geroa.png"  },
    { text: "So what is Iridite going to do with Sel?", portrait: "resources/player.png"  },
    { text: "Sel's soul frequency matches that of Iridites.", portrait: "resources/geroa.png"  },
    { text: "Iridite wants to use his soul as the base to create an extremely powerful celestial.", portrait: "resources/geroa.png"  },
    { text: "A celestial more powerful than Iridite herself.", portrait: "resources/geroa.png"  },
    { text: "She's always been interested in creating celestials of her own ever since she heard about Tav.", portrait: "resources/geroa.png"  },
    { text: "Tav, an innocent bunch of souls suffering in the bounds of a celestial body." }, 
    { text: "You can't let this happen again." }, 
    { text: "Please. You better help me. I've been a slave to Iridite for as long as I can remember.", portrait: "resources/geroa.png"  },
    { text: "I don't even remember my family, or where I come from.", portrait: "resources/geroa.png"  },
    { text: "I just don't want this to happen to anymore people.", portrait: "resources/geroa.png"  },
    { text: "I'm too scared to stand up for myself, but since you're here, you can help me.", portrait: "resources/geroa.png"  },
    { text: "I'll do it. I'll make sure to kill Iridite.", portrait: "resources/player.png"  },
    { text: "Thank you.", portrait: "resources/geroa.png"  },
]; 
const cutsceneDialogue99 = [ //star expo #4
    { text: "Sel wakes up." }, 
    { text: "Iridite...", portrait: "resources/sel.png"  },
    { text: "I can't let this happen!", portrait: "resources/sel.png"  },
    { text: "Do you know what Iridite has done to my universe... My family???", portrait: "resources/sel.png"  },
    { text: "This celestial has turned them all into monstrous beings.", portrait: "resources/sel.png"  },
    { text: "Every day, and every night, I get horrible thoughts about what happened.", portrait: "resources/sel.png"  },
    { text: "I want to forget, but I can't.", portrait: "resources/sel.png"  },
    { text: "I just want to go home man... I'm tired of this celestial hunting business, but how else would I make money?", portrait: "resources/sel.png"  },
    { text: "This celestial hunting corporation, how is it like?", portrait: "resources/player.png"  },
    { text: "We all live in this giant station, on a pretty decent planet.", portrait: "resources/sel.png"  },
    { text: "The people are nice, I guess. Once I get back I'm probably going to retire.", portrait: "resources/sel.png"  },
    { text: "Do you think I can join this corporation?", portrait: "resources/player.png"  },
    { text: "You'd certainly be a good candidate for joining, since you have foresight and all.", portrait: "resources/sel.png"  },
    { text: "You're giving it a good thought." }, 
    { text: "If you join, you'll be able to kill more celestials." }, 
    { text: "Sounds like a deal." }, 
]; 
const cutsceneDialogue100 = [ //star expo #5 (visiting iridite)
    { text: "You pass by another star." }, 
    { text: "Iridite is really close by right now.", portrait: "resources/geroa.png"  },
    { text: "Please... Mr.Foresight. Do you really think you can defeat Iridite?", portrait: "resources/sel.png"  },
    { text: "I'm going to need your help Sel. You can help us fight.", portrait: "resources/player.png"  },
    { text: "Do I have a choice?", portrait: "resources/sel.png"  },
    { text: "Well, do you want to live?", portrait: "resources/player.png"  },
    { text: "...", portrait: "resources/sel.png"  },
    { text: "So I really don't have a choice.", portrait: "resources/sel.png"  },
    { text: "I guess I am a celestial hunter after all.", portrait: "resources/sel.png"  },
    { text: "You know what, I'll help as well. I don't care how much hell I go through. I just want to make things right.", portrait: "resources/geroa.png"  },

]; 
const cutsceneDialogue101 = [ //unlocking iridite
    { text: "You see the star in the distance increase in luminosity." }, 
    { text: "Outside the ship, you see a giant beam of light appear." }, 
    { text: "A glowing woman with long white hair, wings, and white robes appear, and teleports inside the ship." }, 
    { text: "...", portrait: "resources/iridite.png"  },
    { text: "So you must be the crazy foresight user! Matos must have given you one hell of a fight.", portrait: "resources/iridite.png"  },
    { text: "I am so ready to see what you can do... I'm so curious!!!", portrait: "resources/iridite.png"  },
    { text: "You will see what I can do. I will destroy you.", portrait: "resources/player.png"  },
    { text: "After what you've done, to Sel. To Geroa. I can not let you keep doing this.", portrait: "resources/player.png"  },
    { text: "Iridite laughs." }, 
    { text: "You think my continued existence matters!? I've already contributed so much to the knowledge and science of celestials.", portrait: "resources/iridite.png"  },
    { text: "Geroa is my greatest creation. She is half celestial and half other beings.", portrait: "resources/iridite.png"  },
    { text: "Her existence proves the possiblity of partial celestials.", portrait: "resources/iridite.png"  },
    { text: "Now, in order to create a powerful celestial of my own, I must use Sel's soul.", portrait: "resources/iridite.png"  },
    { text: "I will combine Sel's soul with the souls of many others that I have collected.", portrait: "resources/iridite.png"  },
    { text: "This celestial will be more powerful than myself.", portrait: "resources/iridite.png"  },
    { text: "Now, Sel. Please give me your soul.", portrait: "resources/iridite.png"  },
    { text: "God damn it!!!", portrait: "resources/sel.png"  },
    { text: "Iridite starts to superphysically extract Sel's soul out of his body." }, 
    { text: "Come on. Think. What can you do to stop this???" }, 
    { text: "Superphysical values have the ability to affect physical objects." }, 
    { text: "Think. Think.. Think..." }, 
]; 
const cutsceneDialogue102 = [ //entering battle
    { text: "You visualize creating a ship of your own, fully made of superphysical values." }, 
    { text: "You extend your arms out, and a ship surrounds itself around you." }, 
    { text: "Sel's superphysical restraints break, and Geroa's ship implodes on itself." }, 
    { text: "As your ship gets created out of thin air, Geroa and Sel enter it." }, 
    { text: "This power... How amazing!!! I've never seen anything like this before!", portrait: "resources/iridite.png"  },
    { text: "I will make sure you never harm another innocent life!", portrait: "resources/geroa.png"  },
    { text: "I will stop you as well!", portrait: "resources/geroa.png"  },
    { text: "Geroa, you're such an idiot.", portrait: "resources/iridite.png"  },
    { text: "My research on you is already common knowledge in the celestial community.", portrait: "resources/iridite.png"  },
    { text: "I don't need you anymore.", portrait: "resources/iridite.png"  },
    { text: "The ship finishes materializing, and flies out into the distance." }, 
    { text: "Oh wow! I didn't know you were capable of this.", portrait: "resources/sel.png"  },
    { text: "Trust me, I didn't know I was either.", portrait: "resources/player.png"  },
    { text: "I guess there are more powers you have that you need to figure out." }, 
    { text: "Iridite spawns a barrage of asteroids." }, 
    { text: "Now, let our fight begin. I'm excited to see what more you can do!", portrait: "resources/iridite.png"  },
]; 
const cutsceneDialogue103 = [ //asteroid
    { text: "You dodge and shoot the asteroids on the ship, and reach a sense of flow-state." }, 
    { text: "It still amazes you. How did you magically materialize this ship?" }, 
    { text: "All of a sudden, it hits you. You begin to feel dizzy and nauseous in an instant." }, 
    { text: "Is this newfound power starting to take a toll on your physical health, or do you just get dizzy?" }, 
    { text: "Mr Foresight, I can take over. Back home, I was actually a part of my country's air force.", portrait: "resources/sel.png"  },
    { text: "Space flight shouldn't be that hard, right?", portrait: "resources/sel.png"  },
    { text: "Sel, please be careful! We can't lose this opportunity!", portrait: "resources/geroa.png"  },
    { text: "If we fail now, who knows what's going to happen to us...", portrait: "resources/geroa.png"  },
    { text: "Sel remembers his past traumas and experiences." }, 
    { text: "I don't know if I can do this...", portrait: "resources/sel.png"  },
    { text: "My whole life, I've experienced war.", portrait: "resources/sel.png"  },
    { text: "The very moment I became free from war, Iridite came to my universe.", portrait: "resources/sel.png"  },
    { text: "I don't think I want to do this.", portrait: "resources/sel.png"  },
    { text: "Listen.", portrait: "resources/player.png"  },
    { text: "You are the most skilled at this out of all of us here.", portrait: "resources/player.png"  },
    { text: "We will have the highest probability of surviving if you take over.", portrait: "resources/player.png"  },
    { text: "Don't listen to those thoughts, and maybe you can make a name for yourself in the CHC by defeating Iridite.", portrait: "resources/player.png"  },
    { text: "You smile at Sel." }, 
    { text: "Who knows, maybe you can retire once you get back!", portrait: "resources/player.png"  }, 
    { text: "Alright then... I can do this!", portrait: "resources/sel.png"  },
]; 
const cutsceneDialogue104 = [ //celestialites
    { text: "Iridite watches as your ship rips and tears through the asteroids." }, 
    { text: "I'm impressed. You've managed to create a powerful weapon out of superphysical values.", portrait: "resources/iridite.png"  },
    { text: "I'm also impressed at how suprisingly good I'm doing!", portrait: "resources/sel.png"  },
    { text: "Well, let's see if you can handle these guys.", portrait: "resources/iridite.png"  },
    { text: "What appear to be celestialites spawn out of Iridite's superphysical aura." }, 
    { text: "These are all the results of my failed experiments. Let's see if you can handle them.", portrait: "resources/iridite.png"  },
    { text: "These innocent souls are trapped in these celestialites?", portrait: "resources/player.png"  },
    { text: "We must free them of their pain and suffering...", portrait: "resources/player.png"  },
    { text: "Iridite's power begins to overwhelm you.", },
]; 
const cutsceneDialogue105 = [ //space energy (no music)
    { text: "Amidst Iridite's chaos, you somehow find yourself trapped within the darkness of the shadow overworld." }, 
    { text: "You notice a new superphysical energy emerge: Space energy." }, 
    { text: "The feeling that emanates from this superphysical force feels familiar." }, 
    { text: "A feeling that is powerful, and somewhat unsettling." }, 
    { text: "How strange..." }, 
]; 
const cutsceneDialogue106 = [ //space buildings (hasUpgrade("ir", 15))
    { text: "You find yourself returning to the hall of celestials for another flashback." }, 
    { text: "??????, have you decided to incorporate superphysical materialization into the creation?", portrait: "resources/fogGuy1.png"  },
    { text: "Of course I have. Why wouldn't I?", portrait: "resources/fogGuy2.png"  },
    { text: "It will be very hard to control though. Not even I could do it properly.", portrait: "resources/fogGuy1.png"  },
    { text: "I have found a workaround. The creation will materialize objects that reflect the properties of the universe he's in.", portrait: "resources/fogGuy2.png"  },
    { text: "That way, the superphysical values can channel through more smoothly, and therefore produce physical objects easier.", portrait: "resources/fogGuy2.png"  },
    { text: "Now that I think about it, that makes more sense.", portrait: "resources/fogGuy1.png"  },
    { text: "No wonder why you were able to create a spaceship, in a space themed universe." }, 
    { text: "The creation can only materialize objects when it's absolutely necessary.", portrait: "resources/fogGuy2.png"  },
    { text: "Similar to the creation's ability to use developer powers.", portrait: "resources/fogGuy2.png"  },
    { text: "Wouldn't it be better for the creation to be able to use these powers all the time?", portrait: "resources/fogGuy1.png"  },
    { text: "You see, developer powers and superphysical materialization both require access into the superphysical plane.", portrait: "resources/fogGuy2.png"  },
    { text: "That wouldn't be possible without the right conditions.", portrait: "resources/fogGuy2.png"  },
    { text: "However, with training, controlling access to the superphysical plane can be possible.", portrait: "resources/fogGuy2.png"  },
    { text: "We have a few master developers who are ready to train him once the time comes.", portrait: "resources/fogGuy2.png"  },
    { text: "After the creation beats his first CONSTELLATION CELESTIAL, they will be ready.", portrait: "resources/fogGuy2.png"  },
    { text: "Got it.", portrait: "resources/fogGuy1.png"  },
    { text: "Master developers who will train you. After your first constellation celestial." }, 
    { text: "This is an opportunity to gain immeasurable power." }, 
    { text: "You must defeat Nova. Once you do, you will train under those developers." }, 
    { text: "This opportunity excites you." }, 
]; 
const cutsceneDialogue107 = [ //ufo
    { text: "Let's see if you can handle this creation!", portrait: "resources/iridite.png"  },
    { text: "A UFO that runs on the energy of celestialites.", portrait: "resources/iridite.png"  },
    { text: "Having another ship as a target will only make this job easier! It's what I'm used to.", portrait: "resources/sel.png"  },
    { text: "Interesting, I didn't know celestialites can power machines!", portrait: "resources/player.png"  },
    { text: "Oh really, I learned this trick a long, long time ago! Even before I became a celestial.", portrait: "resources/iridite.png"  },
    { text: "You know, I was once a celestial hunter.", portrait: "resources/iridite.png"  },
    { text: "...", portrait: "resources/sel.png"  },
    { text: "Yes, yes. It may come as a suprise, as to how a hunter became a celestial.", portrait: "resources/iridite.png"  },
    { text: "It has been one hell of a story as to how I became this way.", portrait: "resources/iridite.png"  },
    { text: "You were a celestial hunter???", portrait: "resources/sel.png"  },
    { text: "It was such a long time ago.", portrait: "resources/iridite.png"  },
    { text: "I don't remember it very well.", portrait: "resources/iridite.png"  },
    { text: "Me, Tera, and Zar. We were all hunters.", portrait: "resources/iridite.png"  },
    { text: "A lot has happened since then.", portrait: "resources/iridite.png"  },
    { text: "Celestial hunter or not... I'm still going to kill you!", portrait: "resources/sel.png"  },
];  
const cutsceneDialogue108 = [ //iridite flashback
    { text: "White fog surrounds your field of vision. It must be another flashback.", },
    { text: "You find yourself in a strange looking office.", },
    { text: "You see a human woman with white hair. It must be Iridite's human form.", },
    { text: "She is talking to a strange man wearing a tuxedo. You can't see his face.", },
    { text: "??????. You will go on a very important mission. It is crucial that you pay attention closely.", portrait: "resources/chcMan.png"  }, //Illira
    { text: "That name... you can't hear it, but it must be Iridite's human name.", },
    { text: "I'm sure you are aware of the giant cloud of dark energy that has been growing around us.", portrait: "resources/chcMan.png"  },
    { text: "Strange... What would a cloud of dark energy do with anything?", },
    { text: "I want you to investigate the source of the dark energy.", portrait: "resources/chcMan.png"  },
    { text: "We don't know where it's coming from, but it will pose a threat to our corporation.", portrait: "resources/chcMan.png"  },
    { text: "I got you. I'm down to do anything.", portrait: "resources/humanIridite.png"  },
    { text: "I have also appointed ???? and ???? with this job.", portrait: "resources/chcMan.png"  },
    { text: "You guys aren't foresight users, but that should be okay since this job is only an investigation.", portrait: "resources/chcMan.png"  },
    { text: "Oh its those guys... Those two get crazy a lot. I will find a way to manage.", portrait: "resources/humanIridite.png"  },
    { text: "Successfully finding the source will get you three a massive promotion.", portrait: "resources/chcMan.png"  },
    { text: "Sure. I'll try my best.", portrait: "resources/humanIridite.png"  },
    { text: "How did those three become celestials? Was it Nova's doing? Only a couple more flashbacks can tell you the truth.", },
];  
const cutsceneDialogue109 = [ //iridite battle
    { text: "Iridite starts glowing more, and gains an angry look on her face.", },
    { text: "How are you guys still alive? Is the power of your foresight really that strong???", portrait: "resources/iridite.png"  },
    { text: "It's not just the foresight, it's also Sel's amazing skill at piloting!", portrait: "resources/player.png"  },
    { text: "Hell yeah!!!", portrait: "resources/sel.png"  },
    { text: "You won't say it, but you're proud of Sel for conquering his fears against Iridite.", },
    { text: "His will to live seems to exceed his faults.", },
    { text: "Umm guys, I don't like the look of this.", portrait: "resources/geroa.png"  },
    { text: "You start to feel a stronger superphysical force around Iridite.", },
    { text: "Now, let's see how you face against my true strength!", portrait: "resources/iridite.png"  },
];  
const cutsceneDialogue110 = [ //mid battle cutscene 
    { text: "God damn it... You guys just won't stop no matter what. I don't understand.", portrait: "resources/iridite.png"  },
    { text: "It's too late to quit. I must prove myself the strongest out of all the novasent!", portrait: "resources/iridite.png"  },
    { text: "Oh really, you're not too different than Matos. You are weak!", portrait: "resources/player.png"  },
    { text: "The superphysical strength coming from your ship... It's too much!!!", portrait: "resources/iridite.png"  },
    { text: "You do know, Iridite, I am a half-celestial! I also have foresight powers too.", portrait: "resources/geroa.png"  },
    { text: "I will happily use those powers against you.", portrait: "resources/geroa.png"  },
    { text: "That can't happen... Even half celestials are supposed to act like a celestial!", portrait: "resources/iridite.png"  },
    { text: "You are meant to obey ME!", portrait: "resources/iridite.png"  },
    { text: "I may have been designed to follow your commands.", portrait: "resources/geroa.png"  },
    { text: "I may have the innate desire to destroy.", portrait: "resources/geroa.png"  },
    { text: "That's not all I am though. I am still only half a celestial! I will let my other half assert its dominance!", portrait: "resources/geroa.png"  },
    { text: "Damn it... My research was all for nothing! My whole celestial existence was pointless!", portrait: "resources/iridite.png"  },
    { text: "I will kill all of you!", portrait: "resources/iridite.png"  },

]; 
const cutsceneDialogue111 = [ //end of battle
    { text: "You notice Iridite's body start to form cracks.", },
    { text: "My core... it's shattered.", portrait: "resources/iridite.png"  },
    { text: "My entire life was meaningless.", portrait: "resources/iridite.png"  },
    { text: "I have done absolutely nothing to help the CHC.", portrait: "resources/iridite.png"  },
    { text: "I have done absolutely nothing to help the Novasent.", portrait: "resources/iridite.png"  },
    { text: "Heck, I haven't even done anything to help my human family.", portrait: "resources/iridite.png"  },
    { text: "My entire life was pointless.", portrait: "resources/iridite.png"  },
    { text: "My research will have no contributions to celestial society.", portrait: "resources/iridite.png"  },
    { text: "I did find out one thing though.", portrait: "resources/iridite.png"  },
    { text: "The source of the dark energy cloud.", portrait: "resources/iridite.png"  },
    { text: "What are you talking about?", portrait: "resources/geroa.png"  },
    { text: "The dark energy cloud. The CHC told me about that a long time ago.", portrait: "resources/sel.png"  },
    { text: "The dark energy cloud continues to grow in size... It will soon consume the entire dimensional realm.", portrait: "resources/iridite.png"  },
    { text: "Zar. Tera. I'm sorry for everything. I wish we stayed celestial hunters. I wish our adventure lasted a little longer.", portrait: "resources/iridite.png"  },
    { text: "My celestial tendencies have ruined everything.", portrait: "resources/iridite.png"  },
    { text: "My life has been wasted away.", portrait: "resources/iridite.png"  },
    { text: "As iridite's body fades into nothingness, you realize something.", },
    { text: "Do celestials regain their humanity on the brink of death?", },
    { text: "That dark energy arm... What's so important about it?", },
    { text: "We won. We did it... Do I get to go home now?", portrait: "resources/sel.png"  },
    { text: "I'm not sure about what will happen next.", portrait: "resources/player.png"  },
    { text: "Strangely enough, you feel the superphysical force start to increase.", },
    { text: "A rainbow colored orb appears in front of you.", }, //23
    { text: "It's Nova.", },
    { text: "So you kill Matos, and now you've killed Iridite.", portrait: "resources/nova.png"  },
    { text: "Only two more novasent are out there, and I know you will kill them as well.", portrait: "resources/nova.png"  },
    { text: "Who is this? Another celestial???", portrait: "resources/sel.png"  },
    { text: "Nova starts laughing.", },
    { text: "What do you want???", portrait: "resources/player.png"  },
    { text: "I'm here because Iridite wasn't able to kill archer boy.", portrait: "resources/nova.png"  },
    { text: "I'll just do it myself.", portrait: "resources/nova.png"  },
    { text: "What is going on???", portrait: "resources/sel.png"  },
    { text: "A hand protrudes out of the energy orb an impales Sel.", },
    { text: "As the hand retracts, a green-colored key is revealed.", },
    { text: "You are way too shocked to speak.", },
    { text: "YOU MONSTER!! WHY WOULD YOU DO SUCH A THING???", portrait: "resources/geroa.png"  },
    { text: "You.... YOU MUST BE NOVA!", portrait: "resources/geroa.png"  },
    { text: "One down, two more to go.", portrait: "resources/nova.png"  },
    { text: "...", portrait: "resources/player.png"  },
    { text: "God damn it....", },
];   
const cutsceneDialogue112 = [ //dead sel
    { text: "You quickly return back to the domain of singularity, and see Sel's dead body.", },
    { text: "Mr.Foresight... What happened to Sel???", portrait: "resources/nav.png"  },
    { text: "Listen. You guys are in danger. I don't know what's going on right now, but this isn't good.", portrait: "resources/player.png"  },
    { text: "Nova, the Celestial of Singularity is hunting you down. He already got to Sel.", portrait: "resources/player.png"  },
    { text: "Damn...... Why?????", portrait: "resources/kres.png"  },
    { text: "I don't know, but there was a green key that came out of Sel.", portrait: "resources/player.png"  },
    { text: "I'd assume that there are keys inside of you two as well.", portrait: "resources/player.png"  },
    { text: "So Sel is really dead?", portrait: "resources/nav.png"  },
    { text: "I don't know for sure, but it seems like he is.", portrait: "resources/player.png"  },
    { text: "We defeated the celestial responsible for Sel's coma, but it was too late.", portrait: "resources/player.png"  },
    { text: "If you two value your lives, I suggest figuring a way to get the key out of your body.", portrait: "resources/player.png"  },
    { text: "I don't know how, or if it's even a physical object to begin with, but I would figure it out.", portrait: "resources/player.png"  },
    { text: "If that key is superphysical, do you think you can take it out for us?", portrait: "resources/kres.png"  },
    { text: "I'm not sure if even I can do that. There are some superphysical values only celestials can manipulate.", portrait: "resources/player.png"  },
    { text: "Wait a minute... How did you defeat a celestial without leaving this universe?", portrait: "resources/nav.png"  },
    { text: "I haven't told any of you guys this, but I can travel between universes using superphysical links.", portrait: "resources/player.png"  },
    { text: "Before you ask though, I can only bring myself. I can't bring other people.", portrait: "resources/player.png"  },
    { text: "That's interesting. I've never heard of that power before.", portrait: "resources/nav.png"  },
    { text: "You two need to prepare for unexpected celestial encounters, so get ready.", portrait: "resources/player.png"  },
    { text: "Is Sel really dead?", },
    { text: "He never got to retire and live a peaceful life.", },
    { text: "How sad...", },
];   //REMINDER: CROSS OUT SEL'S NAME AFTER DEFEATING IRIDITE.

const cutsceneDialogue113 = [ // enter u2 after matos
    { text: "You arrive back to the antimatter world, still shaken from your victory against Matos.", },
    { text: "It feels pretty lonely here compared to the domain of singularity.", },
    { text: "At least you have-", },
    { text: "...", },
    { text: "A subtle whisper makes you flinch.", },
    { text: "A bright pink light casts its shadow infront of you.", },
    { text: "You turn around, ready for the worst, but are met by a rift.", },
    { text: "On the other side is many towers connected by wires.", },
    { text: "There's another whisper.", },
    { text: "How creepy.", },
]

const cutsceneDialogue114 = [ //enter interspace rift
    { text: "You cautiously tread into the rift and immediately pick up on the presence of a celestial.", },
    { text: "The towers look even more enormous on the inside.", },
    { text: "Yet another whisper comes from the tower right infront of you.", },
    { text: "You can't help but go investigate.", },
    { text: "Free... me...", portrait: "resources/pollinators/fly.png" },
    { text: "Who's there?", portrait: "resources/player.png" },
    { text: "That raspy voice reminds you of Cante.", },
    { text: "My... core... infinities...", portrait: "resources/pollinators/fly.png" },
    { text: "The voice gets quieter, muttering more words unintelligible.", },
    { text: "High above you, what appears to be a celestial's core is suspended by more wires.", },
    { text: "I... am... Cere...", portrait: "resources/pollinators/fly.png" },
    { text: "It sounds incredibly weak.", },
    { text: "You may as well put this being out of its misery.", },
]

const cutsceneDialogue115 = [ //unlock cere
    { text: "Using an enormous amount of infinities, you channel a beam of superphysical energy upward.", },
    { text: "It warps and bends through the air...", },
    { text: "...then gets sucked into the core.", },
    { text: "Uh oh.", portrait: "resources/player.png" },
    { text: "Ah, much better.", portrait: "resources/pollinators/fly.png" },
    { text: "Wait, what did you do?", portrait: "resources/player.png" },
    { text: "I absorbed your infinities! What do you think I did, ate them?", portrait: "resources/pollinators/fly.png" },
    { text: "actually, grasshoppers taste pretty damn good. don't tell anyone I said that.", portrait: "resources/pollinators/fly.png" },
    { text: "Whatever. I have to kill you now.", portrait: "resources/player.png" },
]

const cutsceneDialogue116 = [ //transfigurator power 2
    { text: "You gather your infinities and core fragments again, as well as some cere points.", },
    { text: "It does the same thing as last time, but Cere's core glows a bit brighter.", },
    { text: "How do I know you can't use the transfigurator yourself?", portrait: "resources/player.png" },
    { text: "Well, I-", portrait: "resources/pollinators/fly.png" },
    { text: "I would have-", portrait: "resources/pollinators/fly.png" },
    { text: "I can't use it, alright?", portrait: "resources/pollinators/fly.png" },
    { text: "Uh-huh.", portrait: "resources/player.png" },
    { text: "I can't do much of anything in this state.", portrait: "resources/pollinators/fly.png" },
    { text: "If I could, I would have broken myself out of here a long time ago.", portrait: "resources/pollinators/fly.png" },
    { text: "There is no way you're trusting this guy.", },
    { text: "Anyway, you should be able to power up that green tower over there, now.", portrait: "resources/pollinators/fly.png" },
    { text: "Have fun!", portrait: "resources/pollinators/fly.png" },
]

const cutsceneDialogue117 = [ //transfigurator power 3
    { text: "Cere grows stronger.", },
    { text: "This is stressing you out.", },
    { text: "So when do I get to kill you again?", portrait: "resources/player.png" },
    { text: "Just a few more.", portrait: "resources/pollinators/fly.png" },
    { text: "He still looks somewhat weak.", },
    { text: "Just a few more.", portrait: "resources/pollinators/fly.png" },
]

// Example with custom background:
// showCutscene(cutsceneDialogue1, {
//     background: \"url('img/bg.png') center/cover\", // or any valid CSS background
//     portrait: \"resources/matos.png\"
// });

/*
showCutscene(cutsceneDialogue1, {
    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // blue gradient
    portrait: "resources/matos.png"
});

const test4 = [ //reunlock antidebuff (Tav flashback)
    { text: "<h1>A white flash hits your vision.", portrait: "resources/teresa.png",  },
    { text: "<img src=resources/teresa.png width=500 height=500>", },

];

showCutscene(cutsceneDialogue1, {
    background: "#000000", // blue gradient
    cutsceneID: 12345,
    portrait: "resources/matos.png"
});
*/