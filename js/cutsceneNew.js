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
        if (typeof stopAudio === 'function' && options.jukeboxID == "none") stopAudio();
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
const cutsceneDialogueA1 = [ //unlocking legendary punchcards
    { text: "Your arsenal of superphysical values in the dark universe grows.", },
    { text: "The collection of punchcards somewhat amuses you.", },
    { text: "It's almost as if you have a strange personal connection with them.", },
    { text: "Eclipse appears in front of you.", },
    { text: "Finally, I'm able to speak.", portrait: "resources/eclipse.png"  },
    { text: "No way... You can talk? How???", portrait: "resources/player.png"  },
    { text: "The superphysical powers of this world have allowed me to speak to you telepathically.", portrait: "resources/eclipse.png"  },
    { text: "I have a lot of things to ask you. Who really are you? Why have you decided to help us with defeating celestials.", portrait: "resources/player.png"  },
    { text: "I must repay the sins that I have committed.", portrait: "resources/eclipse.png"  },
    { text: "All the tortured souls of the domain of singularity...", portrait: "resources/eclipse.png"  },
    { text: "They are currently in Nova's possesion.", portrait: "resources/eclipse.png"  },
    { text: "I don't know what he plans on doing with those souls, but it's definitely not good.", portrait: "resources/eclipse.png"  },
    { text: "Matos was only used to harvest those souls.", portrait: "resources/eclipse.png"  },
    { text: "You seem to know a lot that of things we don't know. Why was Nova stuck in captive?", portrait: "resources/player.png"  },
    { text: "There is another celestial out there. This celestial is responsible for capturing Nova.", portrait: "resources/eclipse.png"  },
    { text: "This celestial is also responsible for my continued existence.", portrait: "resources/eclipse.png"  },
    { text: "My time is up. We will continue our conversation later.", portrait: "resources/eclipse.png"  },
];  
const cutsceneDialogueA2 = [ //humanity punchcard
    { text: "You see a strange reddish-pink punchcard appear in front of you.", },
    { text: "The punchcard of humanity.", },
    { text: "You have a sudden sense of realization.", },
    { text: "After all of this, you are still human after all.", },
    { text: "Have you ever truly lived a human life?", },
    { text: "You still don't remember your life before waking up in the overworld.", },
    { text: "Eclipse appears in front of you.", },
    { text: "You know, I am also human as well.", portrait: "resources/eclipse.png"  },
    { text: "How did he know what I was thinking about?", },
    { text: "I've actually ruled the domain of singularity before in my past.", portrait: "resources/eclipse.png"  },
    { text: "If it wasn't for me...", portrait: "resources/eclipse.png"  },
    { text: "None of this would have happened.", portrait: "resources/eclipse.png"  },
    { text: "I was the reason why our civilization fell into ruin.", portrait: "resources/eclipse.png"  },
    { text: "I must save these souls. I must stop Nova.", portrait: "resources/eclipse.png"  },
    { text: "I must stop Nova.", portrait: "resources/eclipse.png"  },
    { text: "I must...", portrait: "resources/eclipse.png"  },
    { text: "All of a sudden, Eclipse's smoke starts to glitch, phasing in and out of the universe.", },
    { text: "Interesting.", },
    { text: "Eclipse's story interests you. You must learn more.", },
];  
const cutsceneDialogueA3 = [ //blood
    { text: "You soon realize that you have superphysical powers imbued into your own blood.", },
    { text: "Are these powers constructed into your very own physical being?", },
    { text: "This raises a lot of questions.", },
    { text: "You shoot out a small quantity of blood from your fingertips.", },
    { text: "This blood is your very own. The pain is very minimal.", },
    { text: "You remember seeing the infinity keeper use her own blood for certain situations.", },
    { text: "But what could you possibly do with this blood?", },
];  
const cutsceneDialogueA4 = [ //blood battle
    { text: "You notice a swarm of leeches, bats, and other creatures come in your way.", },
    { text: "They must be attracted to the blood.", },
    { text: "All of a sudden, you find yourself creating a spaceship using superphysical values.", },
    { text: "The same ship as the ones you used against Iridite...", },
    { text: "You kill a leech, and a singular red stone appears.", },
    { text: "How interesting.", },
];  
const cutsceneDialogueA5 = [ //pylon
    { text: "Your ancient core fragments construct into a large tower.", },
    { text: "A straight beam of beige light gets shot out of the tower.", },
    { text: "You notice time to shift differently in this universe.", },
    { text: "These pylons... They speed up time in a universe?", },
    { text: "Time is a superphysical value after all.", },
    { text: "You start to worry for Nav and Kres.", },
    { text: "Celestials are going after them after all.", },
    { text: "But what if...", },
    { text: "Instead of waiting for the celestial, you go after the celestial yourself?", },
];  
const cutsceneDialogueA6 = [ //nox
    { text: "You become tired of fighting these blood creatures.", },
    { text: "All of a sudden, you see a spear fly towards one of the creatures.", },
    { text: "The smell of blood... It intruiges me.", portrait: "resources/nox.png"  },
    { text: "Who are you?", portrait: "resources/player.png"  },
    { text: "I'm glad you asked. I am Nox, the Vampire Knight!", portrait: "resources/nox.png"  },
    { text: "I hunt celestials for a living, and I must make as much money as I can by doing so.", portrait: "resources/nox.png"  },
    { text: "That's interesting. I also hunt celestials.", portrait: "resources/player.png"  },
    { text: "Are you associated with the celestial hunting corporation?", portrait: "resources/player.png"  },
    { text: "Never joined them. I don't see the point.", portrait: "resources/nox.png"  },
    { text: "Why let a company take all the treasures when you can take them for yourself?", portrait: "resources/nox.png"  },
    { text: "Oh well. I don't mind you helping me here.", portrait: "resources/player.png"  },
    { text: "As long as you let me take all these blood stones I'm fine!", portrait: "resources/nox.png"  },
];  
const cutsceneDialogueA7 = [ //pylon
    { text: "Your paradox core fragments construct into a large tower.", },
    { text: "Building these pylons are great and all, but wouldn't it be beneficial if you fought some celestials right now?", },
    { text: "You start to think.", },
    { text: "If Iridite was a celestial centered around the cosmos, and getting there required a lot of rocket fuel...", },
    { text: "...the next celestial must either be centered around hex, or dice.", },
    { text: "Dice seems more plausible right now, so you should go for dice.", },
    { text: "It's not like much is going on in the hex universe after all.", },
    { text: "Then you remember something: Challenge Dice Points.", },
    { text: "A superphysical value shrouded in mysterious vibes.", },
    { text: "You must investigate.", },

];  
const cutsceneDialogueA8 = [ //start of nox battle
    { text: "Where is it?", portrait: "resources/nox.png"  },
    { text: "Where is what?", portrait: "resources/player.png"  },
    { text: "My blood stones.", portrait: "resources/nox.png"  },
    { text: "Why would I give you MY blood stones?", portrait: "resources/player.png"  },
    { text: "I helped you defeat these blood creatures. Now give them to me.", portrait: "resources/nox.png"  },
    { text: "Dude I don't owe you a damn thing.", portrait: "resources/player.png"  },
    { text: "Come on man... My family is struggling. I need to help them, and blood stones are a valuable resource in my universe.", portrait: "resources/nox.png"  },
    { text: "This guy is starting to piss you off. There are larger things at stake than this man's family.", },
    { text: "If you don't give me your blood stones, I'll fight you for them!!!", portrait: "resources/nox.png"  },
    { text: "You proceed to get ready for battle.", },
];  
const cutsceneDialogueA9 = [ //defeating nox
    { text: "Damn... You're kinda strong. I'll just let you keep your blood stones.", portrait: "resources/nox.png"  },
    { text: "I sense the presence of a celestial in this universe. I don't know if you do, but I do.", portrait: "resources/nox.png"  },
    { text: "There's a celestial here? I didn't even notice it.", portrait: "resources/player.png"  },
    { text: "You have foresight powers, right? You should be able to detect this celestial.", portrait: "resources/nox.png"  },
    { text: "Anyways. I won't bother you anymore if we go and defeat this celestial together.", portrait: "resources/nox.png"  },
    { text: "I will take most of your loot though.", portrait: "resources/nox.png"  },
    { text: "I guess you should help him with it... Defeating a celestial will make you stronger after all."  },
    { text: "Fine. I will help you.", portrait: "resources/player.png"  },
    { text: "This vampire... What is this superphysical power???"  },
    { text: "It's so strong... The strongest you've ever seen."  },
    { text: "Is he also using magic? Raw strength?"  },
    { text: "Is this what happens when multiple power systems combine into one?"  },
    { text: "If you want any luck at defeating all the celestials, you must become stronger."  },
    { text: "And now you realize that you have a much longer way to go than you thought."  },
];  
const cutsceneDialogueA10 = [ //unlocking dice space
    { text: "The accuracy of your intuition frightens you." },
    { text: "A rift has formed in the overworld, due to an excess of challenge dice points." },
    { text: "You enter the rift, and find yourself in a strange universe." },
    { text: "It is a small universe, that appears to be a liminal, abandoned casino." },
    { text: "The presence of a celestial is strong." },
    { text: "It must be the next celestial." },
    { text: "You begin to explore this strange universe." },
];  
const cutsceneDialogueA11 = [ //filling out zar reqs
    { text: "As you explore the universe, you find a small structure." },
    { text: "It is a person-sized dice, with six notches, signifying six requirements." },
    { text: "You must fill these out in order to summon the next celestial." },
    { text: "You see a strange dice-person walk up to you." },
    { text: "Hello. We haven't recieved visitors in a long, long, time.", portrait: "resources/diceThree.png"  },
    { text: "He appears to have be a person with a dice head, and wearing a tuxedo with a vibrant red tie. For some reason there are only 3 dots on his face."  },
    { text: "This person isn't a celestial either."  },
    { text: "I am visiting so I can defeat a celestial. Would you be able to help me with that?", portrait: "resources/player.png"  },
    { text: "You must be referring to Zar. Please don't kill him. He may be a celestial, but he's the reason I'm even alive to begin with.", portrait: "resources/diceThree.png"  },
    { text: "Then who are you?", portrait: "resources/player.png"  },
    { text: "I am only a mere byproduct of Zar's superphysical powers, but Zar has taken care of me and provided for me ever since I was created.", portrait: "resources/diceThree.png"  },
    { text: "Another being with only one dot appears."  },
    { text: "Come on three. We must go back to the card room. There is something important we need to discuss with Zar.", portrait: "resources/diceOne.png"  },
    { text: "I have to go now... Please. Please don't kill Zar.", portrait: "resources/diceThree.png"  },
    { text: "How strange. Zar must have an entire family of dice-people." },
];  
const cutsceneDialogueA12 = [ //UNLOCKING ZAR
    { text: "You activate all six dots on the dice, and begin to feel shaking." },
    { text: "You hear laughter coming from the distance." },
    { text: "Heehee!!! You use your silly little superphysical powers to find me! This will make my job a lot easier now!", portrait: "resources/zar.png"  },
    { text: "This gives you a bad feeling. You remember Kres and Nav. They are still in danger. You must find Zar before they get killed." },
    { text: "Oh really? I know what your plan is. You know I already defeated Iridite. You should be no different.", portrait: "resources/player.png"  },
    { text: "I know who you are. Mister Nova told me all about you. I know what I have to do now!", portrait: "resources/zar.png"  },
    { text: "I'm not weak, like Iridite. Unlike her, I actually have a family that I care about!", portrait: "resources/zar.png"  },
    { text: "Do you think that matters? The damage you have inflicted on others. The pain and suffering you have caused. I will be sure to end it.", portrait: "resources/player.png"  },
    { text: "Very well then. I would love to see you try me!", portrait: "resources/zar.png"  },
    { text: "..." },
];  
const cutsceneDialogueA13 = [ //coin flip
    { text: "Think. How will you get to Zar? How will you fight him?" },
    { text: "These are questions that you must answer. You must decide what you will do.", },
    { text: "You remember the dice in the previous room talking about a \"Card Room\". Maybe Zar is in there.", },
    { text: "You walk through the abandoned casino, and find a strange glowing room.", },
    { text: "You enter it, and you find a room with nothing, but a single coin.", },
    { text: "Hello. Would you like to flip the coin?", portrait: "resources/diceTwo.png"  },
    { text: "What do you want... You are just one of Zar's children.", portrait: "resources/player.png"  },
    { text: "We may be Zar's children, but we control the superphysical values that hold this universe together.", portrait: "resources/diceTwo.png"  },
    { text: "If you actually want to gain something out of this place, at least try flipping the coin.", portrait: "resources/diceTwo.png"  },
    { text: "Is this a trick? Oh well. It's just a coin. What's the worst that could happen.", },
    { text: "And besides, you'll just spend more time with this strange dice guy. You can probably get information out of him.", },
];  
const cutsceneDialogueA14 = [ //wheel of fortune
    { text: "So... What were you guys talking about in the card room?", portrait: "resources/player.png"  },
    { text: "I can't say anything.", portrait: "resources/diceTwo.png"  },
    { text: "Oh really? I've already flipped this coin enough times. I think that pleased you enough, didn't it?", portrait: "resources/player.png"  },
    { text: "I'm telling you, I can't say anything.", portrait: "resources/diceTwo.png"  },
    { text: "You are getting annoyed. You grab the dice man by his collar and slam him onto the ground." },
    { text: "Tell me now, or else I'm going to flip you instead of the coin!", portrait: "resources/player.png"  },
    { text: "You suddenly have a horrible migraine. It's almost as if your neurons are firing at random intervals." },
    { text: "You hear a voice in play in your head." },
    { text: "Haehheahhahahhaa!!!!! This is hilarious!", portrait: "resources/zar.png"  },
    { text: "You think you're so tuff, trying to mess with my children, but you're just a fool.", portrait: "resources/zar.png"  },
    { text: "Who knows, maybe poor Nav might have to pay with her life if you keep trying to mess with my family!", portrait: "resources/zar.png"  },
    { text: "You have been warned.", portrait: "resources/zar.png"  },
    { text: "For the first time ever since you woke up, you felt a slight sen" },
    { text: "All of a sudden, the dice guy dissapears for some strange reason." },
    { text: "You find a new door appear in front of you." },
    { text: "You walk through the door and find a green room with a giant wheel in the back." },
    { text: "You see a new dice guy in this room." },
    { text: "Spin the wheel.", portrait: "resources/diceFour.png"  },
    { text: "I guess you must continue forward." },
];  
const cutsceneDialogueA15 = [ //flashback
    { text: "You appear in a flashback."  },
    { text: "It looks like the celestial hunting corporation office again."  },
];  
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


showCutscene(cutsceneDialogue1, {
    background: "#000000", // blue gradient
    cutsceneID: 12345,
    portrait: "resources/matos.png"
});
*/