const GALAXY_URL = "https://galaxy.click";
const debug = true;

let galaxy = {
    connected: false,
    message: ""
};

galaxy.log = (msg) => {
    galaxy.message = msg;

    setTimeout(() => {
        galaxy.message = "";
    }, 3000);
}

galaxy.initGalaxyIframeApi = () => {
    console.log("Initializing Galaxy saving...");
    window.addEventListener("message", e=> {
        if (e.origin === GALAXY_URL) {
            const data = e.data;
            if (data.type === "info") {
                if (data.logged_in || debug) {
                    galaxy.connected = true;
                }
            }
            if (data.type === "saved") {
                if (data.error) {
                    setMessage("Error: " + data.error);
                } else {
                    galaxy.log("Successfully saved to Galaxy!");
                }
            }
            if (data.type === "save_content") {
                if (!data.content) {
                    alert("No save found in that slot.");
                    return;
                } 
                const confirm = window.confirm("Are you sure you want to load the cloud save? This will overwrite your current save.");
                if (confirm) {
                    importSave(data.content)
                }
            }
        }
    });
}

galaxy.sendSave = (label = "Auto Save", slot = options.cloudSaveSlot) => {
    const str = btoa(unescape(encodeURIComponent(JSON.stringify(player))));
    window.top.postMessage({
        action: "save",
        slot,
        label,
        data: str,
    }, GALAXY_URL);
}

galaxy.requestSave = (slot = options.cloudSaveSlot) => {
    window.top.postMessage({
        action: "load",
        slot,
    }, GALAXY_URL);
}

var cloudSaveInterval = setInterval(function () {
    if (player === undefined)
        return;
    if (tmp.gameEnded && !player.keepGoing)
        return;
    if (options.cloudSave)
        galaxy.sendSave();
}, 30000); // 30seconds
