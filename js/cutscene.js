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
        cutscene5: true,
        cutscene6: true,
        cutscene7: true,
        cutscene8: true,
        cutscene9: true,
        cutscene10: true,
        cutscene11: true,
        cutscene12: true,
        cutscene13: true,
        cutscene14: true,
        evoCutscene: false,

        //celestial
        tavCutscene: false,

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

        //background images
        ev2bg: "<img src='resources/gdbg.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>"
    }
    },
    update(delta) {

        player.c.ev2bg = "resources/gdbg.jpg"

        //Background
        document.body.style.setProperty('--background', (player.c.cutscene1 == true || player.c.cutscene2 || player.c.cutscene13) && player.tab == "c" ? "linear-gradient(90deg, #180000, #300005, rgba(71,0,14,1))":
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
        player.tab == "ev1" ? "linear-gradient(140deg, rgba(117,0,0,1) 0%, rgba(126,110,0,1) 20%, rgba(117,0,0,1) 40%, rgba(126,110,0,1) 60%, rgba(117,0,0,1) 80%, rgba(126,110,0,1) 100%)" : 
        player.tab == "bigc" || player.c.cutscene5 && player.tab == "c"  || player.c.cutscene8 && player.tab == "c"  ? "#b87c34" : 
        player.tab == "in" || player.tab == "ad" || player.tab == "ip" || player.tab == "ga" || player.tab == "ta" || player.c.cutscene6 && player.tab == "c" || player.c.cutscene7 && player.tab == "c" ? "#001f18" : 
        player.tab == "ev2" ? 'url(' + player.c.ev2bg + ')' : 
        player.tab == "revc" ? "#31aeb0" : 
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

        //Cutscene 5
        if (player.c.cutscene5 == true && player.startedGame == true && player.in.unlockedInfinity)
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene5();
        } else if ((player.startedGame == true || player.c.cutscene5 == false) && player.tab == "c" && player.c.cutscene5 == false)
        {
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene5 == true)
        {
            if (player.c.cutscene5 == true) player.c.cutsceneIndex = 0
            player.c.cutscene5 = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
            callAlert("Welcome to the antimatter world. Here, you will produce antimatter (wow very innovative)")
            .then(() => callAlert("You won't have access to the previous features, but you can return back once you re-unlock the portal."))
            .then(() => callAlert("The gameplay should feel familiar to a lot of you. Hope it doesn't turn you off."))
        } 

        //Cutscene 6
        if (player.c.cutscene6 == true && player.startedGame == true && player.ad.dimBoostAmount.gt(0))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene6();
        } else if ((player.startedGame == true || player.c.cutscene6 == false) && player.tab == "c" && player.c.cutscene6 == false)
        {
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene6 == true)
        {
            if (player.c.cutscene6 == true) player.c.cutsceneIndex = 0
            player.c.cutscene6 = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        } 

        //Cutscene 7
        if (player.c.cutscene7 == true && player.startedGame == true && player.ad.galaxyAmount.gte(1))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene7();
        } else if ((player.startedGame == true || player.c.cutscene7 == false) && player.tab == "c" && player.c.cutscene7 == false)
        {
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene7 == true)
        {
            if (player.c.cutscene7 == true) player.c.cutsceneIndex = 0
            player.c.cutscene7 = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        } 

        //Cutscene 8
        if (player.c.cutscene8 == true && player.startedGame == true && player.in.infinities.gte(2))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene8();
        } else if ((player.startedGame == true || player.c.cutscene8 == false) && player.tab == "c" && player.c.cutscene8 == false)
        {
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene8 == true)
        {
            if (player.c.cutscene8 == true) player.c.cutsceneIndex = 0
            player.c.cutscene8 = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        } 

        //Cutscene 9
        if (player.c.cutscene9 == true && player.startedGame == true && player.in.infinities.gte(8))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene9();
        } else if ((player.startedGame == true || player.c.cutscene9 == false) && player.tab == "c" && player.c.cutscene9 == false)
        {
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene9 == true)
        {
            if (player.c.cutscene9 == true) player.c.cutsceneIndex = 0
            player.c.cutscene9 = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        } 

        //Cutscene 10
        if (player.c.cutscene10 == true && player.startedGame == true && hasChallenge("ip", 11))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene10();
        } else if ((player.startedGame == true || player.c.cutscene10 == false) && player.tab == "c" && player.c.cutscene10 == false)
        {
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene10 == true)
        {
            if (player.c.cutscene10 == true) player.c.cutsceneIndex = 0
            player.c.cutscene10 = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        } 

        //Cutscene 11
        if (player.c.cutscene11 == true && player.startedGame == true && hasChallenge("ip", 13))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene11();
        } else if ((player.startedGame == true || player.c.cutscene11 == false) && player.tab == "c" && player.c.cutscene11 == false)
        {
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene11 == true)
        {
            if (player.c.cutscene11 == true) player.c.cutsceneIndex = 0
            player.c.cutscene11 = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        } 

        
        //Cutscene 12
        if (player.c.cutscene12 == true && player.startedGame == true && hasChallenge("ip", 16))
        {
            if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            layers.c.startCutscene12();
        } else if ((player.startedGame == true || player.c.cutscene12 == false) && player.tab == "c" && player.c.cutscene12 == false)
        {
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.cutscene12 == true)
        {
            if (player.c.cutscene12 == true) player.c.cutsceneIndex = 0
            player.c.cutscene12 = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
        }
        
        //Cutscene 13
        if (player.c.cutscene13 == true && player.startedGame == true && inChallenge("ip", 18))
        {
            player.tab = "c"
            layers.c.startCutscene13();
            startRain();
        } else if ((player.startedGame == true || player.c.cutscene13 == false) && player.tab == "c" && player.c.cutscene13 == false)
        {
            player.tab = "i"
            stopRain();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length)
        {
            if (player.c.cutscene13 == true) player.c.cutsceneIndex = 0
            player.c.cutscene13 = false
        }

        //Cutscene 14
        if (player.c.cutscene14 == true && player.startedGame == true && hasChallenge("ip", 18))
        {
            player.tab = "c"
            layers.c.startCutscene14();

            if (player.c.cutsceneIndex >= 4)
            {
                player.c.tavCutscene = true
            }
        } else if ((player.startedGame == true || player.c.cutscene14 == false) && player.tab == "c" && player.c.cutscene14 == false)
        {
            player.tab = "i"
            player.subtabs["i"]['stuff'] = 'Features'
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length)
        {
            if (player.c.cutscene14 == true) player.c.cutsceneIndex = 0
            player.c.cutscene14 = false
            player.c.tavCutscene = false
        }

        //Evo
        if (player.c.evoCutscene == true)
        {
            player.tab = "c"
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length  && player.c.evoCutscene == true)
        {
            if (player.c.evoCutscene == true) player.c.cutsceneIndex = 0
            player.c.evoCutscene = false
            player.tab = 'cb'
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
    if (player.evoCutscene == false)
    {
        player.c.cutsceneText = [
            "The power of waiting. A very overlooked power.",
            "Your talent has grown since you first started.",
            "Now is a very special time. You will unlock something reserved for gods.",
            "Evolution Shards- The crystalline form of celestial remnants.",
            "It will be hard to get. It will be pain, but you will endure.",
        ]
    }
},
startCutscene5() {
    player.c.cutsceneText = [
        "???: So, who are you, thinking you can enter my domain?",
        "You: What is this place? It feels very peculiar.",
        "???: That is because you have entered through an infinity warp.",
        "???: Once your soul has obtained a certain amount of power,",
        "???: It couldn't be contained in a world. Now tell me.",
        "???: Who are you?",
        "You: I was born quite recently. Just a soul wandering without a physical form.",
        "You: I have a duty. I must defeat CELESTIALS. I am confused though. What are they?",
        "???: Well if you want to defeat them, it would surely be a great task.",
        "???: Make yourself comfortable here. We don't get visitors often in the antimatter world.",
    ]
},
startCutscene6() {
    player.c.cutsceneText = [
        "You: What is this world exactly?",
        "???: That is the antimatter world. Everything is antimatter.",
        "???: I don't know where you come from. Can you tell me?",
        "You: I don't remember a lot, but there was a lot of grass, and trees.",
        "???: Interesting. I can help you get back there. You must get an antimatter galaxy though.",
        "You: Alright. That sounds great.",
    ]
},
startCutscene7() {
    player.c.cutsceneText = [
        "???: You can reach the portal now, just buy the upgrade.",
        "You: Thanks. I just got one more question for you.",
        "You: Who are you?",
        "???: Uhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    ]
},
startCutscene8() {
    player.c.cutsceneText = [
        "???: I must say the truth.",
        "???: I am a celestial.",
        "???: However, I have no intent to harm you.",
        "You: I also don't want to hurt you, but I have an obligation to.",
        "You: I don't know who I am, where I come from, or why I'm doing this.",
        "You: Only recently have I gained the ability to communicate.",
        "???: The thing is, I don't know much about the origin of celestials.",
        "???: I was created by another celestial. My existence is pointless.",
        "You: Don't worry. We can figure out each other's origins together.",
        "You: I'll help you figure out where you come from, but I'll have to kill you.",
        "???: I don't fear death. We will help each other out, even if I must die.",

    ]
},
startCutscene9() {
    player.c.cutsceneText = [
        "???: If you complete these 8 challenges, I will tell you everything I know.",
        "???: I want to help you, but you must prove yourself worthy of being helped.",
        "You: Alright. This should be light work. I've dealt with some pretty long waits before.",
        "???: Trust me. These challenges will kick your butt.",
        "You: Whatever you say.",
    ]
},
startCutscene10() {
    player.c.cutsceneText = [
        "You: Yeah that was pretty easy.",
        "???: Well that was just the first challenge.",
        "You: You're a pretty funny guy. Actually give me a challenge.",
        "???: Sure!",
    ]
},
startCutscene11() {
    player.c.cutsceneText = [
        "You: Those 2 challenges were something.",
        "???: Ha! Well you've unlocked HEX now. Use it wisely.",
        "???: It is a lot of annoying micromanagement, but that is a skill you should learn.",
        "???: It will pay off because you will get a great BLESSING.",
        "You: Alright. Time to go neglect dice and rocket fuel.",
    ]
},
startCutscene12() {
    player.c.cutsceneText = [
        "???: Well now you see the potential of the other two otherworldy features.",
        "You: Not really.",
        "???: Trust me though. They will help you out a lot, even though I don't know much about what you're doing.",
        "You: There's two more challenges, right?",
        "???: Yup. Good luck.",
    ]
},
startCutscene13() {
    player.c.cutsceneText = [
        "This celestial is definitely a peculiar one.",
        "Since when were celestials supposed to be friendly?",
        "It knows it's fate. It will die to your hands.",
        "However, it openly accepts it's death.",
        "Being a celestial must be hard...",
        "There are so many things that you don't know.",
        "This multiverse has had a history of neverending violence and hatred.",
        "Just one more challenge completion. You will learn.",
    ]
},
startCutscene14() {
    player.c.cutsceneText = [
        "???: ...",
        "???: You have completed all of my challenges.",
        "???: Now it's time to awaken myself as a true celestial.",
        "You: Oh boy...",
        "Tav: I am Tav, the celestial of limits.",
        "Tav: I control the limit, which is 1.79e308.",
        "Tav: I am the reason why you can't get past that number.",
        "You: It was you this whole time???",
        "Tav: No, my creator designed me to be this way.",
        "You: And who would that be?",
        "Tav: I don't remember...",
        "Tav: Please help me.",
        "You: So this is the might of a celestial. Very underwhelming.",
        "Tav: Well I haven't been ascending the ranks in celestialhood at all.",
        "Tav: I am the lowest rank.",
        "Tav: At the top is the king of all celestials. It's your job to defeat him.",
        "You: Alright. But I must defeat you first.",
    ]
},
evoCutscenes(pet) {
    if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
    player.tab = "c"
    player.c.evoCutscene = true
    switch (pet)
    {
        case 0:
            player.c.cutsceneText = ["Unsmith.", "Such an interesting specimen...", "Dumb, but happy.", "It looks like it lacks power,", "But it's full of life.", "I will grant you with the evolution.",]
        break;
        case 1:
            player.c.cutsceneText = ["Selachimorpha. The scientific name for shark.", "These apex predators dominated the seas for millions of years.", "But we could do better.", "Sharks are only the base form for something greater...", "It could be EVOLVED.",]
        break;
        case 2:
            player.c.cutsceneText = [
                "This peculiar being has been so full of joy.", 
                "Evolution shards would certainly turn that frown upside down.", 
                "This questions the ethics of pet evolutions.", 
                "Do they really enjoy being evolved?", 
            ]
        break;
    }
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
        ["raw-html", function () { return !player.c.evoCutscene ? player.c.cutsceneText[player.c.cutsceneIndex] : ""}, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["raw-html", function () { return player.c.evoCutscene ? player.c.cutsceneText[player.c.cutsceneIndex] : ""}, { "color": "white", "font-size": "32px", "font-family": "Verdana, sans-serif" }],
        ["blank", "25px"],
        ["row", [["clickable", 12], ["clickable", 11]]],
        ["blank", "25px"],
        ["raw-html", function () { return player.c.tavCutscene ? "<div class=spinning-symbol>→</div>" : ""}, { "color": "white", "font-size": "400px", "font-family": "Verdana, sans-serif" }],
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