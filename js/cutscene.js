                   addLayer("c", {
                    name: "cutscene", // This is optional, only used in a few places, If absent it just uses the layer id.
                    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
                    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    tooltip: "cutscene", // Row the layer is in on the tree (0 is the first row)
    color: "white",
    startData() { return {
        unlocked: true,

        //Cutscenes
        cutscene1: true,
        cutscene2: true,
        cutscene3: true,
        cutscene4: true,

        //Cutscene Info
        cutsceneText: [            
        "Although they are just rumors, many people believe in the CELESTIALS.",
        "From the few who witnessed celestials, even fewer survived their encounters.",
        "Celestials are supernatural beings of rather enormous size.",
        "Their power is like none other. They might as well be considered godly beings.",
        "They have caused destruction throughout the multiverse.",
        "No one has been able to stand against a celestial and defeat it.",
        "Except for one being. THE INFINITY KEEPER.",
        ],
        cutsceneIndex: 0,
    }
    },
    update(delta) {
        //Background
        document.body.style.setProperty('--background', (player.c.cutscene1 == true || player.c.cutscene2) && player.tab == "c" ? "linear-gradient(90deg, #180000, #300005, rgba(71,0,14,1))":
        player.tab == "t" ? "#02172f" : 
        player.tab == "g" ? "#042347" : 
        player.tab == "gh" ? "#073b77" : 
        player.tab == "cb" || player.tab == "ps" ? "#021124" : 
        player.tab == "po" ? "linear-gradient(45deg, #8a00a9, #0061ff)" : 
        player.c.cutscene3 && player.tab == "c" == true ? "linear-gradient(45deg, #8a00a9, #0061ff)" : 
        player.c.cutscene4 && player.tab == "c" == true ? "linear-gradient(90deg, #d487fd, #4b79ff)" : 
        player.tab == "ev" ? "linear-gradient(90deg, #5C1E7E, #1E3066)" : 
        player.tab == "eva" ? "linear-gradient(90deg, #220b2f, #0c1329)" : 
        player.tab == "ev0" ? "linear-gradient(-45deg, #655421, #fad25a)" : 
        "#161616");

        //Cutscene 1
        if (player.c.cutscene1 == true && player.startedGame == true)
        {
            player.tab = "c"
            layers.c.startCutscene1();
            startRain();
        } else if ((player.startedGame == true || player.c.cutscene1 == false) && player.tab == "c")
        {
            player.tab = "i"
            player.subtabs["i"]['stuff'] = 'Upgrades'
            stopRain();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length)
        {
            if (player.c.cutscene1 == true) player.c.cutsceneIndex = 0
            player.c.cutscene1 = false
        }

        //Cutscene 2
        if (player.c.cutscene2 == true && player.startedGame == true && player.p.prestigePoints.gt(0))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene2();
            startRain();
        } else if ((player.startedGame == true || player.c.cutscene2 == false) && player.tab == "c" && player.c.cutscene1 == false)
        {
            player.tab = "i"
            player.subtabs["p"]['stuff'] = 'Main'
            stopRain();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene2 == true)
        {
            if (player.c.cutscene2 == true) player.c.cutsceneIndex = 0
            player.c.cutscene2 = false
        }

        //Cutscene 3
        if (player.c.cutscene3 == true && player.startedGame == true && hasUpgrade("i", 21))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene3();
            startRain('#e81cff');
        } else if ((player.startedGame == true || player.c.cutscene3 == false) && player.tab == "c" && player.c.cutscene3 == false)
        {
            player.tab = "i"
            player.subtabs["p"]['stuff'] = 'Portal'
            stopRain();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene3 == true)
        {
            if (player.c.cutscene3 == true) player.c.cutsceneIndex = 0
            player.c.cutscene3 = false
        } 

        //Cutscene 4
        if (player.c.cutscene4 == true && player.startedGame == true && player.cb.level.gte(35))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene4();
        } else if ((player.startedGame == true || player.c.cutscene4 == false) && player.tab == "c" && player.c.cutscene4 == false)
        {
            player.tab = "cb"
            player.subtabs["cb"]['stuff'] = 'Evolution Shards'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene4 == true)
        {
            if (player.c.cutscene4 == true) player.c.cutsceneIndex = 0
            player.c.cutscene4 = false
        } 
    },
    startCutscene1() {
        player.c.cutsceneText = [
            "Although they are just rumors, many people believe in the CELESTIALS.",
            "From the few who witnessed celestials, even fewer survived their encounters.",
            "Celestials are supernatural beings of rather enormous size.",
            "Their power is like none other. They might as well be considered godly beings.",
            "They have caused endless destruction throughout the multiverse.",
            "No one has been able to stand against a celestial and defeat it.",
            "Except for one being. THE INFINITY KEEPER.",
        ]
    },
    startCutscene2() {
      player.c.cutsceneText = [
          "The Infinity Keeper has destroyed seven celestials:",
          "Teresa, Effarig, The Nameless Ones, V, Ra, Lai'Tela, and Pelle.",
          "These celestials were known as the loyal seven.",
          "Their power in antimatter manipulation made them especially known.",
          "But his job was never finished.",
          "You must finish his job.",
          "KILL ALL THE CELESTIALS.",
      ]
  },
  startCutscene3() {
    player.c.cutsceneText = [
        "You notice your power grow in size, as the number of celestial points rise.",
        "You are about to reach a milestone.",
        "There is a certain number you cannot pass.",
        "1.79e308 - A finite number.",
        "However, no amount can surpass this value.",
        "So we have considered it infinity.",
    ]
},
startCutscene4() {
    player.c.cutsceneText = [
        "The power of waiting. A very overlooked power.",
        "Your talent has grown since you first started.",
        "Now is a very special time. You will unlock something reserved for gods.",
        "Evolution Shards- The crystalline form of celestial remnants.",
        "It will be hard to get. It will be pain, but you will endure.",
    ]
},
    clickables: {
        11: {
            title() { return "<img src='resources/forwardarrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return player.c.cutsceneIndex < player.c.cutsceneText.length },
            unlocked() { return true },
            onClick() {
                player.c.cutsceneIndex = player.c.cutsceneIndex + 1
            },
        },
        12: {
            title() { return "<img src='resources/backarrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return player.c.cutsceneIndex > 0},
            unlocked() { return true },
            onClick() {
                player.c.cutsceneIndex = player.c.cutsceneIndex - 1
            },
        },
    },
    upgrades: {
    },
    automate() {
    },
    buyables: {
    },
    milestones: {

    },
    challenges: {
    },
    bars: {

    },
    infoboxes: {
    },

    tabFormat: [
        ["blank", "125px"],
        ["raw-html", function () { return player.c.cutsceneText[player.c.cutsceneIndex] }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["clickable", 12], ["clickable", 11]]],
    ],
    layerShown() { return true }
})
// Define the CSS animation within a template literal
const cssStyles = `
  @keyframes fall {
    to {
      transform: translateY(100vh);
    }
  }

  .raindrop {
    position: absolute;
  }
`;

// Apply the CSS styles dynamically
const styleElement = document.createElement('style');
styleElement.innerHTML = cssStyles;
document.head.appendChild(styleElement);

// JavaScript code for the rain effect
let raining = false;
let rainInterval;

function startRain(rainColor) {
  if (!raining) {
    raining = true;
    rainInterval = setInterval(() => createRaindrop(rainColor), 30);
  }
}

function stopRain() {
  if (raining) {
    raining = false;
    clearInterval(rainInterval);
  }
}

function createRaindrop(rainColor) {
  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');
  raindrop.style.left = Math.random() * window.innerWidth + 'px';
  raindrop.style.top = '0';
  raindrop.style.backgroundColor = rainColor; // Set color dynamically
  raindrop.style.width = '2px';
  raindrop.style.height = '15px';
  document.body.appendChild(raindrop);

  const animationDuration = Math.random() * 2 + 1;
  raindrop.style.animation = `fall ${animationDuration}s linear`;

  raindrop.addEventListener('animationend', () => {
    raindrop.remove();
  });
}