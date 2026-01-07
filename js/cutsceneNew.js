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