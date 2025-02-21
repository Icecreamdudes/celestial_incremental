                   addLayer("c", {
                    name: "cutscene", // This is optional, only used in a few places, If absent it just uses the layer id.
                    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
                    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    tooltip: "cutscene", // Row the layer is in on the tree (0 is the first row)
    color: "white",
    startData() { return {
        unlocked: true,
        currentCutscene: 0,

        //Cutscenes
        cutscenes: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,],

        //OTF
        cutsceneDice: true,
        cutsceneRocketFuel: true,
        cutsceneHex: true,

        //celestial
        tavCutscene: false,

        //Cutscene Info
        cutsceneText: [
            "You find yourself in a vast desert of black sand.",
            "The wind is moderate. It is quite cold.",
            "It seems as if it's always night. The stars stand in place.",
            '"You hear a voice in the distance. "This place is dead. Bring it back to life and know your purpose."',
            "As the voice fades away, you look at your own hands, and see ten points manifest as rings. One for each finger.",
        ],
        cutsceneIndex: 0,

        //background images
        ev2bg: "<img src='resources/gdbg.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>"
    }
    },
    update(delta) {

        player.c.ev2bg = "resources/gdbg.jpg"

        //Background
        document.body.style.setProperty('--background', (player.c.cutscene1 == true || player.c.cutscene2 || player.c.cutscene13) && player.tab == "c" ? "black":

        player.tab == "t" ? "#02172f" : 
        player.tab == "g" ? "#042347" : 
        player.tab == "gh" ? "#073b77" : 
        player.tab == "cb" || player.tab == "ps" ? "#021124" : 
        player.tab == "po" || player.tab == "otherfeat" || player.tab == "halter" ? "linear-gradient(45deg, #8a00a9, #0061ff)" :
        player.tab == "ev" ? "linear-gradient(90deg, #5C1E7E, #1E3066)" : 
        player.tab == "eva" ? "linear-gradient(90deg, #220b2f, #0c1329)" : 
        player.tab == "ev0" ? "linear-gradient(-45deg, #655421, #fad25a)" : 
        player.tab == "ev1" ? "linear-gradient(140deg, rgba(117,0,0,1) 0%, rgba(126,110,0,1) 20%, rgba(117,0,0,1) 40%, rgba(126,110,0,1) 60%, rgba(117,0,0,1) 80%, rgba(126,110,0,1) 100%)" : 
        player.tab == "bigc" ? "#b87c34" : 
        player.tab == "in" || player.tab == "ad" || player.tab == "ip" || player.tab == "ga" || player.tab == "ta" || player.tab == "bi" || player.tab == "om" || player.tab == "id" || player.tab == "u2l" || player.tab == "u2t" ? "#001f18" : 
        player.tab == "ev2" ? 'url(' + player.c.ev2bg + ')' : 
        player.tab == "revc" ? "#31aeb0" : 
        player.tab == "tad" ? "#b2d8d8" : 
        player.tab == "h" && player.subtabs["h"]['stuff'] == 'RAGE POWER' ? "#341414" : 
        player.tab == "ca" ? "#2a3e66" : 
        player.tab == "cap" ? "#1f1e33" : 
        player.tab == "cp" || player.tab == "ar" || player.tab == "pr"  || player.tab == "an" || player.tab == "rt" || player.tab == "rg" || player.tab == "gs" || player.tab == "oi" || 
        player.tab == "a1u" || player.tab == "a1s" || player.tab == "a1t" || player.tab == "fu" ? "#204387" : 
        player.tab == "ev4" ? "linear-gradient(-90deg, #f38004, #fc3404)" : 
        player.tab == "ev8" ? "#242525" : 
        player.tab == "rm" ? "linear-gradient(90deg, #311100, #313000, #163100, #003105, #003121, #002C31, #001431, #000031, #300031)" : 
        player.tab == "s" || player.tab == "cop"  || player.tab == "cs" || player.tab == "coa" || player.tab == "u3b" || player.tab == "u3u" || player.tab == "u3m" || player.tab == "u3l" || player.tab == "u3t" || player.tab == "ra" || player.tab == "sd"? "#260300" : 
        player.tab == "epic" || player.tab == "ep0" || player.tab == "ep1"  || player.tab == "ep2" ? "#7d3f98" : 
        player.tab == "settings" || player.tab == "stats" || player.tab == "savebank" || player.tab == "changelog" || player.tab == "credits" ? "linear-gradient(90deg, #57636d, #2e3d49)" :
        player.tab == "ch" || player.tab == "cmh" ? "linear-gradient(90deg, #260b36, #0920b5)" : 
        player.tab == "ev9" ? "linear-gradient(-90deg, #b03b38, #b3622d, #b3a73d, #6ca022, #3f9079)" : 
        "#161616");

        //1
        if (player.c.cutscenes[0] && player.startedGame)
        {
            player.c.currentCutscene = 1
        } else
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 1)
        {
            player.tab = "c"
            layers.c.startCutscene1();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 1)
        {
            player.c.cutscenes[0] = false
            player.tab = "i"
            player.subtabs["i"]['stuff'] = 'Upgrades'
            player.c.cutscenes[0] = false
        }

        //2
        if (player.c.cutscenes[1] && hasUpgrade("i", 21))
        {
            player.c.currentCutscene = 2
        } else if (hasUpgrade("i", 21))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 2)
        {
            player.tab = "c"
            layers.c.startCutscene2();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 2)
        {
            player.c.cutscenes[1] = false
            player.tab = "po"
            player.subtabs["po"]['stuff'] = 'Otherworldly Features'
            player.c.cutscenes[1] = false
        }

        //3
        if (player.c.cutscenes[2] && player.in.infinities.gt(0))
        {
            player.c.currentCutscene = 3
        } else if (player.in.infinities.gt(0))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 3)
        {
            player.tab = "c"
            layers.c.startCutscene3();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 3)
        {
            player.c.cutscenes[2] = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
            player.c.cutscenes[2] = false
        }

        //4
        if (player.c.cutscenes[3] && player.ta.negativeInfinityPoints.gt(0))
        {
            player.c.currentCutscene = 4
        } else if (player.ta.negativeInfinityPoints.gt(0))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 4)
        {
            player.tab = "c"
            layers.c.startCutscene4();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 4)
        {
            player.c.cutscenes[3] = false
            player.tab = "i"
            player.subtabs["i"]['stuff'] = 'Features'
            player.c.cutscenes[3] = false

        }


        //5
        if (player.c.cutscenes[4] && player.ta.negativeInfinityPoints.gt(1000))
        {
            player.c.currentCutscene = 5
        } else if (player.ta.negativeInfinityPoints.gt(1000))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 5)
        {
            player.tab = "c"
            layers.c.startCutscene5();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 5)
        {
            player.c.cutscenes[4] = false
            player.tab = "i"
            player.subtabs["i"]['stuff'] = 'Features'
            player.c.cutscenes[4] = false
        }


        //6
        if (player.c.cutscenes[5] && inChallenge("tad", 11))
        {
            player.c.currentCutscene = 6
        } else if (inChallenge("tad", 11) && player.tab != "c")
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 6)
        {
            player.tab = "c"
            layers.c.startCutscene6();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 6)
        {
            player.c.cutscenes[5] = false
            player.tab = "i"
            player.subtabs["i"]['stuff'] = 'Features'
            player.c.cutscenes[5] = false
        }


        //7
        if (player.c.cutscenes[6] && player.in.unlockedBreak)
        {
            player.c.currentCutscene = 7
        } else if (player.in.unlockedBreak)
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 7)
        {
            player.tab = "c"
            layers.c.startCutscene7();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 7)
        {
            player.c.cutscenes[6] = false
            player.tab = "po"
            player.subtabs["po"]['stuff'] = 'Otherworldly Features'
            player.c.cutscenes[6] = false
        }

        //8
        if (player.c.cutscenes[7] && hasUpgrade("bi", 24))
        {
            player.c.currentCutscene = 8
        } else if (hasUpgrade("bi", 24))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 8)
        {
            player.tab = "c"
            layers.c.startCutscene8();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 8)
        {
            player.c.cutscenes[7] = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
            player.c.cutscenes[7] = false
        }

        //9
        if (player.c.cutscenes[8] && player.ca.galaxyDust.gt(0))
        {
            player.c.currentCutscene = 9
        } else if (player.ca.galaxyDust.gt(0))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 9)
        {
            player.tab = "c"
            layers.c.startCutscene9();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 9)
        {
            player.c.cutscenes[8] = false
            player.tab = "in"
            player.subtabs["in"]['stuff'] = 'Features'
            player.c.cutscenes[8] = false
        }

        //10
        if (player.c.cutscenes[9] && hasUpgrade("bi", 28))
        {
            player.c.currentCutscene = 10
        } else if (hasUpgrade("bi", 28))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 10)
        {
            player.tab = "c"
            layers.c.startCutscene10();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 10)
        {
            player.c.cutscenes[9] = false
            player.tab = "cap"
            player.subtabs["cap"]['stuff'] = 'Main'
            player.c.cutscenes[9] = false
        }

        //11
        if (player.c.cutscenes[10] && (player.tab == "cp" || (player.tab == "c" && player.cap.cantepocalypseUnlock)))
        {
            player.c.currentCutscene = 11
        } else if (player.tab == "cp" || (player.tab == "c" && player.cap.cantepocalypseUnlock))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 11)
        {
            player.tab = "c"
            layers.c.startCutscene11();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 11)
        {
            player.c.cutscenes[10] = false
            player.tab = "cp"
            player.subtabs["cp"]['stuff'] = 'Features'
            player.c.cutscenes[10] = false
        }

        //12
        if (player.c.cutscenes[11] && hasUpgrade("cp", 18))
        {
            player.c.currentCutscene = 12
        } else if (hasUpgrade("cp", 18))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 12)
        {
            player.tab = "c"
            layers.c.startCutscene12();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 12)
        {
            player.c.cutscenes[11] = false
            player.tab = "cp"
            player.subtabs["cp"]['stuff'] = 'Features'
            player.c.cutscenes[11] = false
        }

        //13
        if (player.c.cutscenes[12] && player.ca.defeatedCante)
        {
            player.c.currentCutscene = 13
        } else if (player.ca.defeatedCante)
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 13)
        {
            player.tab = "c"
            layers.c.startCutscene13();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 13)
        {
            player.c.cutscenes[12] = false
            player.tab = "po"
            player.subtabs["po"]['stuff'] = 'Portals'
            player.c.cutscenes[12] = false
        }

        //14
        if (player.c.cutscenes[13] && player.s.highestSingularityPoints.gt(0))
        {
            player.c.currentCutscene = 14
        } else if (player.s.highestSingularityPoints.gt(0))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 14)
        {
            player.tab = "c"
            layers.c.startCutscene14();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 14)
        {
            player.c.cutscenes[13] = false
            player.tab = "i"
            player.c.cutscenes[13] = false
        }

        //15
        if (player.c.cutscenes[14] && player.cop.processingCore)
        {
            player.c.currentCutscene = 15
        } else if (player.cop.processingCore)
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 15)
        {
            player.tab = "c"
            layers.c.startCutscene15();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 15)
        {
            player.c.cutscenes[14] = false
            player.tab = "i"
            player.c.cutscenes[14] = false
        } 

        //16
        if (player.c.cutscenes[15] && hasMilestone("s", 12))
        {
            player.c.currentCutscene = 16
        } else if (hasMilestone("s", 12))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 16)
        {
            player.tab = "c"
            layers.c.startCutscene16();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 16)
        {
            player.c.cutscenes[15] = false
            player.tab = "i"
            player.c.cutscenes[15] = false
        } 

        //17
        if (player.c.cutscenes[16] && hasMilestone("s", 13))
        {
            player.c.currentCutscene = 17
        } else if (hasMilestone("s", 13))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 17)
        {
            player.tab = "c"
            layers.c.startCutscene17();
            layers.ra.generateRadiationValue();
            layers.ra.generateRadiationOutput();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 17)
        {
            player.c.cutscenes[16] = false
            player.tab = "ra"
            player.c.cutscenes[16] = false
        } 

        //18
        if (player.c.cutscenes[17] && hasMilestone("s", 14))
        {
            player.c.currentCutscene = 18
        } else if (hasMilestone("s", 14))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 18)
        {
            player.tab = "c"
            layers.c.startCutscene18();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 18)
        {
            player.c.cutscenes[17] = false
            player.tab = "sd"
            player.c.cutscenes[17] = false
        } 

        //19
        if (player.c.cutscenes[18] && hasUpgrade("cp", 19))
        {
            player.c.currentCutscene = 19
        } else if (hasUpgrade("cp", 19))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 19)
        {
            player.tab = "c"
            layers.c.startCutscene19();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 19)
        {
            player.c.cutscenes[18] = false
            player.tab = "fu"
            player.c.cutscenes[18] = false
        } 

        //20
        if (player.c.cutscenes[19] && player.fu.jocusCelestialActivate)
        {
            player.c.currentCutscene = 20
        } else if (player.fu.jocusCelestialActivate)
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 20)
        {
            player.tab = "c"
            layers.c.startCutscene20();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 20)
        {
            player.c.cutscenes[19] = false
            player.tab = "fu"
            player.c.cutscenes[19] = false
        } 

        //21
        if (player.c.cutscenes[20] && hasUpgrade("fu", 15))
        {
            player.c.currentCutscene = 21
        } else if (hasUpgrade("fu", 15))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 21)
        {
            player.tab = "c"
            layers.c.startCutscene21();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 21)
        {
            player.c.cutscenes[20] = false
            player.tab = "fu"
            player.c.cutscenes[20] = false
        }

        //22
        if (player.c.cutscenes[21] && hasUpgrade("fu", 17))
        {
            player.c.currentCutscene = 22
        } else if (hasUpgrade("fu", 17))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 22)
        {
            player.tab = "c"
            layers.c.startCutscene22();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 22)
        {
            player.c.cutscenes[21] = false
            player.tab = "fu"
            player.c.cutscenes[21] = false
        }

        //23
        if (player.c.cutscenes[22] && hasChallenge("fu", 11))
        {
            player.c.currentCutscene = 23
        } else if (hasChallenge("fu", 11))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 23)
        {
            player.tab = "c"
            layers.c.startCutscene23();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 23)
        {
            player.c.cutscenes[22] = false
            player.tab = "ct" 
            player.c.cutscenes[22] = false
        }

        //24
        if (player.c.cutscenes[23] && hasUpgrade("s", 18))
        {
            player.c.currentCutscene = 24
        } else if (hasUpgrade("s", 18))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 24)
        {
            player.tab = "c"
            layers.c.startCutscene24();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 24)
        {
            player.c.cutscenes[23] = false
            player.tab = "s" 
            player.c.cutscenes[23] = false
        }

        //d
        if (player.c.cutsceneDice && player.po.dice)
        {
            player.c.currentCutscene = -1
        } else if (player.po.dice)
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == -1)
        {
            player.tab = "c"
            layers.c.startCutsceneDice();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == -1)
        {
            player.c.cutsceneDice = false
            player.tab = "i"
            player.subtabs["i"]['stuff'] = 'Features'
        }


        //rf
        if (player.c.cutsceneRocketFuel && player.po.rocketFuel)
        {
            player.c.currentCutscene = -2
        } else if (player.po.rocketFuel)
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == -2)
        {
            player.tab = "c"
            layers.c.startCutsceneRocketFuel();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == -2)
        {
            player.c.cutsceneRocketFuel = false
            player.tab = "i"
            player.subtabs["i"]['stuff'] = 'Features'
        }


        //h
        if (player.c.cutsceneHex && player.h.hex.gte(1))
        {
            player.c.currentCutscene = -3
        } else if (player.h.hex.gte(1) && hasChallenge("ip", 13))
        {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == -3)
        {
            player.tab = "c"
            layers.c.startCutsceneHex();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == -3)
        {
            player.c.cutsceneHex = false
            player.tab = "i"
            player.subtabs["i"]['stuff'] = 'Upgrades'
        }

        if (player.tab != "c" && player.tab != "bigc" && player.c.cutsceneIndex == player.c.cutsceneText.length)
        {
            player.c.cutsceneIndex = 0
        }
    },
    startCutscene1() {
        player.c.cutsceneText = [
            "You find yourself in a vast desert of black sand.",
            "The wind is moderate. It is quite cold.",
            "It seems as if it's always night. The stars stand in place.",
            'You hear a voice in the distance. "This place is dead. Bring it back to life and know your purpose."',
            "As the voice fades away, you look at your own hands, and see ten points manifest as rings. One for each finger.",
        ]
    },
    startCutscene2() {
      player.c.cutsceneText = [
        "A dot manifests itself in the center of your vision.",
        "This dot slowly grows into a ring, with a purple-blue gradient slowly fading into view.",
        "The edges shake and rapidly flicker, signaling the portal is clearly unstable. You don't plan on missing this opportunity.",
        "When you walk through, your brain immediately floods with information; the SPVs in the space the portal brought you to constantly rise, fall, and transform.",
        "As you walk through the unfamiliar landscape. A very colorful land with a flat, smooth ground.",
        "A purple, tall humanoid figure greets you with your name.",
      ]
  },
  startCutsceneDice() {
    player.c.cutsceneText = [
      "You observe two numbers: the first value randomly selects a number between 1 and 6.",
      "The second value seems to be blank, not returning any meaningful value.",
      '"Do not worry about the second value; it will reveal its purpose when you leave this place."',
      "The aspect of randomness entices you, so you select the number.",
      "The humanoid figure nods, and he points what appears to be a finger towards you; the numbers you select are now imbued into your knowledge.",
    ]
},
startCutsceneRocketFuel() {
    player.c.cutsceneText = [
      "You observe a value that seems stagnant at first; suddenly, the value grows by a small amount.",
      '"Very strong, but costly," the humanoid figure tells you."',
      "The strength and potential of this value entices you, so you select the number.",
      '"If you work hard enough, you can reach the stars."',
      "You feel a sense of awe as you look up. You desire to reach the stars.",
    ]
},
startCutsceneHex() {
    player.c.cutsceneText = [
      "As the challenge concludes, you notice the stars are slowly obscured by a sky of pitch-white clouds.",
      "A staircase of marbled bricks appears in front of you, with seemingly no end to the spire.",
      "You try to take a step, but an invisible force keeps you from ascending the spire.",
      "After enough struggle, you finally put your foot down on the first step. The invisible force pushes on you more aggressively the higher you climb.",
    ]
},
  startCutscene3() {
    player.c.cutsceneText = [
        "As the amount of Celestial Points in this universe approaches higher and higher numbers, it suddenly stops.",
        "An orange, glowing number suddenly appears in the corner of your vision.",
        "You reach out to observe this number, but it seems to have some kind of force that prevents you from reaching it.",
        "Another humanoid figure appears. This time, the color of the humanoid is orange.",
        '"You have reached a limit. Now you are almost ready to face the celestials," the figure says."',
        "You ask what a celestial is.",
        '"8 trials lie ahead. Complete them, and I will tell you," the figure says."',
        'The figure disappears. The orange fades into a vast grassland. ',
        'The world\'s color is inverted. Disturbed, you observe the nearest value. "Antimatter" is the name of the observed value.',
    ]
},
startCutscene4() {
    player.c.cutsceneText = [
        "As soon as the Antimatter amount reaches the same maximum your Celestial Points reached, it condenses into a light blue value.",
        "The purple and orange figures reappear, discussing topics related to what seems to be a person named Tav.",
        '"This celestial is the weakest of all," The orange one tells you.',
        '"The higher ups said we should make him learn from experience. Don\'t let him know the truth," The purple one says."',
        "The environment viciously shakes around you. The growth of the surrounding SPVs appears to slow.",
        "Eventually, the growth of the SPVs stop. It seems that Tav's location is dictated by how slow the surrounding SPVs rise.",
        '"Finally, someone reaches infinite Antimatter. You deserve a reward," an echoey voice radiates."',
        '"Who are you?" You ask."',
        '"I am Tav, the Celestial of Limits. All I do is make sure the universes do not fall into chaos. Now I must ask; who are you?"',
        "You open your mouth to respond, but no feasible answer comes to mind. Why are you doing this? Weren't you just sent to a random world, with no sense of reason?",
        "You tell him that you have no name, and that you have no purpose. You also tell him that you were sent here without reason.",
        '"Ah. How long have you been doing this now?" Tav asks."',
        "You tell him you don't know.",
        '"I understand how you feel. I, too, have been doing my job for far too long; this is all I know."',
        "Before you can give your thoughts, you are sent back to Universe 1 with the same ten rings on your fingers.",
    ]
},
startCutscene5() {
    player.c.cutsceneText = [
    "You detect Tav's presence.",
    '"I have returned. I think it\'s appropriate to tell you my story."',
    '"Most celestials were previously other beings before they were transformed. However, I am different."',
    '"I have always been a celestial, born among the many gods that inhabit this reality."',
    '"As mentioned before, I was only created for 1 purpose: making sure the universes do not fall into chaos."',
    '"There is one celestial I must watch over specifically: Cante. He has the chance of growing into a being of monstrous power, so I must make sure he stays under control."',
    '"If I let him loose, I fear that many lives would be in danger. I have placed fate in you, though. Cante is my mortal enemy, and he must be destroyed. I hope you will assist me in accomplishing this goal."',
    '"I am also responsible for forcibly transforming the SPV you know as "Celestial Points". Numbers that exceed a certain point start to have drastic effects on the health of the universe, so I have placed this boundary to maintain balance."',
    '"Death is a very real thing that affects all celestials, and the death of me would bring grave consequences. Please listen carefully, as this may be important; if I die, the limits I have set around the universes will break, and everything will fall into disrepair."',
    "After telling you this, the growth of SPVs return to normal. He has left.",
]
},
startCutscene6() {
    player.c.cutsceneText = [
    "You detect Tav, and he greets you. He summons a light blue portal on his left side.",
    '"This is my domain. Once you step into it, you can find my core. The core of a celestial contains all the life we have. I would like to give you an analogy to help you understand, but I can\'t detect what kind of life form you are. Do you know what you are?" he asks."',
    "You try to think of an answer to that question.",
    "The answer to the question doesn't come to your mind, so you ponder for a little longer.",
    "You came to a realization that you did not know what you actually are.",
    "You look down at your hands. You can't seem to comprehend what you are seeing.",
    "You tell him you don't know.",
    '"Don\'t worry about it. Follow me," he replies as he walks through the portal. You follow him in."',
]
},
startCutscene7() {
    player.c.cutsceneText = [
    "You find yourself in an enclosed room, with dimly lit blue light surrounding the area. ",
    "There is a floating blue orb of pure energy. It gives off a similar energy to Negative Infinity Points.",
    "This must be the core. You gather all the corrupted, disfigured, and shattered infinities you have collected and form it into a ball of pure energy.",
    "A thousand of each should be enough. But before you can finish your job, you hear Tav's voice echoing throughout the room.",
    '"So... You finally made it to my core. I had a feeling you were not on my side."',
    '"Throughout history, only a select few individuals have ever killed a celestial."',
    "A beam of light shines out of the core, displaying a hologram of seven beings.",
    '"These seven celestials are known as the original seven. Their names are Teresa, Effarig, The Nameless Ones, V, Ra, Lai\'tela, and Pelle."',
    '"They are the celestials that used to inhabit the world of antimatter. Cante was once apart of the original seven, but his insatiable greed for power had caused him to be driven mad."',
    '"I was created by the original seven to seal Cante away. Now that all seven of them were killed, Cante is the only true celestial left that resides in the antimatter world."',
    '"The death of all eight celestials would result in the formation of a rift- a gate between two universes."',
    '"A rift would open up between the antimatter world and the domain of singularity. The domain of singularity contains many corrupted superphysical values. Many celestial hunters avoid this universe, because of one celestial."',
    "You have many questions floating around in your head. You ask what can be found in the Domain of Singularity.",
    '"In the Domain of Singularity resides the ancient technology used to produce celestials and give them immense power. When you arrive there, harness the power of the Celestial Core."',
    "You tell him that you must kill Cante first before entering the Domain of Singularity, and you tell him that such a mountainous task would be impossible.",
    "How will you defeat a being that is as powerful as your second celestial? Tav was helping you, but Cante surely won't.",
    '"Trust me. Keeping an eye over Cante for the past eternity has made me learn everything about him- he has been getting significantly weaker, especially after the destruction of the proto-overworld. I think if you can get past my domain, you can definitely get past Cante."',
    "After a short moment of thinking, you tell him that you will defeat him.",
    '"You may kill me now.  My job here is complete," Tav responds."',
    "You thank him for his help. You gather the infinities, condense the power into a giant beam of energy, and destroy the core.",
    "As the core shatters, the SPVs and energy fills your entire field of vision. After a few seconds, everything goes blank.",
    "When you open your eyes... you see one giant button in front of you. ",
    '"Break Infinity"',
]
},
startCutscene8() {
    player.c.cutsceneText = [
    "The atmosphere grows thick.",
    "Streaks of blue light shoot down from above, shattering the ground with immense force. You hear a faint voice in the distance.",
    '"Why... Why... Why..."',
    "The voice gets louder.",
    '"WHY... WHY.... WHYY..."',
    "Your body tenses up as you realize who this is. A disfigured humanoid creature appears front of you. It speaks.",
    '"..I am Cante.."',
    "The creature falls flat on the floor and falls unconscious."
    ]
},
startCutscene9() {
    player.c.cutsceneText = [
        "As you reach the maximum amount of replicanti, you notice Cante grow in size. His form changes into a lanky, deep blue figure.",
        '"Tav is dead... But why did you free me? WHY???"',
        "The volume of Cante's voice shakes your insides. You tell him that you must kill him.",
        '"You want to open the rift huh? I am not letting that happen."',
        "The atmosphere thickens; it becomes harder to breathe.",
        '"I cant believe this... I should have stayed locked up! I cant believe they are all dead!"',
        '"Damn you for killing all of them! Even if they hated me, they were still great celestials. I need to make it back to the kingdom... I need..." Cante gasps for air, as the atmospheric pressure makes it hard to even stand."',
        "Cante shrivels up into a disfigured being again.",
        '"Tav was right. Cante is one weak celestial." you thought. You continue to study the effects of Replicanti."'

    ]
},
startCutscene10() {
    player.c.cutsceneText = [
        "For what appears to be no reasonable explanation, Cante gains an immense amount of strength almost instantly. He summons a door with four keyholes in it.",
        "Runes in an ancient language glow as you step up to observe the locks. The symbols transform into a language you can read.",
        '"You want to kill me right?! Prove yourself worthy of killing me. Each lock is a puzzle. You must meet my requirements and break the locks. The door will lead you into a room with my core."',
        "Your head races as you realize that Cante is willingly giving you the opportunity to kill him. You won't lose it."
    ]
},
startCutscene11() {
    player.c.cutsceneText = [
        "The locks shatter. The doors swing open. A fierce wind strikes you.",
        "You take a step inside, and fall into a deep pit.",
        "You tumble onto the ground. As you get up, you observe your surroundings; it seems as if nothing is surrounding you. You shout loudly, asking where Cante's core is.",
        "After the words exit your mouth, the entire place starts shaking and the dark pit starts flashing various, vibrant colors.",
        "The colors flash so bright that they temporarily blind your vision. Upon regaining vision, the pit has transformed into a verdant landscape.",
        'You observe the central SPV present in this pit: "Replicanti Points." Panicked, you continue to observe various other SPVs. They always bring back the same name: Replicanti',
        "You start to realize the severity of the situation you are in. You try looking for an escape, but to no avail.",
        'Cante appears. "You fell right into my trap. How naive. How gullible. YOU REALLY THOUGHT YOU CAN GET PAST ME?!" he shouts. His voice echoes all around you as it fades away.'
    ]
},
startCutscene12() {
    player.c.cutsceneText = [
        "As the portal forms, the foundation of this wicked, Alternate Overworld crumbles beneath your feet.",
        "Dark gray beams of light rise from the void and crash into the fabric of reality, destroying the barrier between this universe and the original Overworld.",
        '"NO!" Cante shouts with all of his might. His voice reverberates all around you, and it impairs your hearing and shakes you to your very being."',
        "As the universes converge and crash into each other, you see a glimpse of Cante through the crumbling material.",
        "His body transforms and contorts into a disgusting mass, replicating uncontrollably like the SPVs he created.",
        "You escape the Alternate Overworld by taking one of the linked beams to the Overworld.",
        "On the other side of the cracks, you try to seal Cante within the Alternate Universe through the power of the linked SPVs.",
        '"DON\'T LEAVE ME HERE!!" Cante shouts as his body contorts into extreme proportions. He appears to be on the brink of destruction, and the resulting explosion could cause problems in the Overworld."',
        "Without wasting time, you use the linked currencies to seal the cracks between the Overworld and the Alternate Universe. Cante screams for help, but his voice is cut off as the gap closes shut. "
    ]
},
startCutscene13() {
    player.c.cutsceneText = [
        "As you obtain the last of your remembrance cores, Cante's shriveled up body manifests itself next to you.",
        '"Bring me to the kingdom..." he whispers. You ignore him.',
        '"I\'m a person too you know..." he whispers again. You ignore him."',
        '"Please don\'t kill me... I have a life to li-"',
        "You suddenly stomp on his body, and he writhes in pain.",
        "You extract the superphysical energy from the remembrance cores and destroy the core.",
        "Replicanti flies out in every direction. You can see the rift starting to form.",
        "As the rift grows, you feel everything distort and wobble.",
        "When tension reaches its maximum, a giant gaping hole appears.",
        "This must be it. The Domain of Singularity."
    ]
},
startCutscene14() {
    player.c.cutsceneText = [
        "You find yourself in a lush crimson red forest. It is quiet. So deafeningly quiet that the buzzing in your head becomes borderline unbearable.",
        "You walk through the forest with a rising fear of anxiety. All of your SPVs are gone, and you feel powerless. ",
        "Eventually, you reach a clearing. A man lays down on the rock before sitting up and facing your direction.",
        '"Oh. A new person. We haven\'t seen one in years."',
        "You try telling him about your origin, but you can\'t remember anything that happened other than the celestials you have slain.",
        '"If you can\'t remember anything about your identity, don\'t worry. You will remember eventually."',
        '"There are four of us here, and 5 dead group members that were killed. That makes you the tenth person to enter the Domain of Singularity. There is only one way out, and that is by defeating Matos by infiltrating his circuitry and destroying his heart. Defeating Matos will provide us with the technology to return home."',
        '"Matos is a celestial. An interdimensional being of immense power. Out of the 9 people that arrived here in the Domain of Singularity, only one person has ever been able to defeat a celestial. That\'s how powerful they are."',
        '"We don\'t know why we were sent to this place. Since we have arrived here, we have been exploring this forest & trying to find an alternative exit. For decades, all the progress we have made was the discovery of two strange machines. Follow me."',
        'You follow the man through the forest. After a short walk, you see two machines in front of you. One is labeled "Core Processor," and the other "Core Assembler".',
        '"These machines are able to create and use Singularity Cores, which are a step closer to defeating Matos. Woah."',
        "Suddenly, the machines shoot beams of energy. Light fills your entire field of vision. ",
        "You find yourself in the same black desert. You stare at your hands; the same 10 rings.",
    ]
},
startCutscene15() {
    player.c.cutsceneText = [
        "As the portal re-opens, you find your way back to the Domain of Singularity.",
        "The portal sends you back to the clearing, where you originally found the man sitting on the rock.",
        "The Singularity Core shines with a dull, faint gray glow.",
        "Four people stand in front of you.",
        "It was the man from before, a woman with glowing eyes, a tall man wearing a metallic mask, and a humanoid being completely made out of smoke.",
        '"This person can power the Cores... how fascinating", the woman remarks.',
        '"I\'d like to introduce you to everyone here. I am Kres, the woman next to me is named Nav, the mask with the mask is named Sel, and the smoke creature is Eclipse," said the man as he observes the Singularity Core.',
        '"Eclipse does not speak, so we have given him that title," Sel replied. His voice is deep and gravelly.',
        '"We are the four people left alive in the Domain of Singularity. We need you to help us defeat Matos, the Celestial of Machinery," Nav explains.',
        "You get up and walk to the Core. You notice that the core has a list of attributed superphysical values.",
        "You enter in the schematics of your Singularity Core and prepare to return to the desert."
    ]
},
startCutscene16() {
    player.c.cutsceneText = [
        "You rematerialize in the Domain of Singularity. The Core Assembler shakes vigorously and another Singularity Core rolls out of the front",
        '"The more of these we make, the more weapons we have against Matos," Sel says as he inspects the newly made Core.',
        '"Interesting... a core that glows with the essence of ' + player.coa.fuels[player.coa.nextCoreFuel]+ 's."',
        "Sel's knowledge of SPVs outside of the Domain of Singularity surprises you.",
        '"How do you know what that is?" you ask.',
        '"I guess I should tell you a little bit about myself. Kres and I were celestial hunters before we ended up in this place. Each of these superphysical values have a \'Golden Standard\' attributed that all of us Hunters have to follow."',
        '"We were trained to be familiar with & control these SPVs. However it did not get us very far... We were only able to defeat Celestialites."',
        'Thoughts race your head. What are "Celestial Hunters?" What is the "Golden Standard"? What are "Celestialites?"',
        '"What is a \'Celestialite\'?"',
        '"Well, regular Celestials are life-forms that undergo an unknown process, and this unknown process is the reason for their immense power. When that same process is done to a non-living being with no soul, they become a Celestialite. Celestialites are significantly weaker than Celestials."',
        '"Furthermore, the number of Celestialites far outnumber the number of Celestials. You could find a Celestialite almost anywhere," Sel sighs',
        'Sel disappears with the rest of the group, leaving you alone to digest the new information you acquired.',
    ]
},
startCutscene17() {
    player.c.cutsceneText = [
        //WRITE CUTSCENE
        "Another Core rolls out of the Core Assembler, but you notice something odd.",
        "A greenish mist comes out of the Core, and you also notice the same greenish mist ooze out of the previous Cores you have made.",
        'Your foresight tells you that this greenish mist is an SPV titled "Radiation."',
        "The feeling of the mist falling into your hands makes you feel uneasy.",
        "You don't let it get to your head, though. As a matter of fact, you try to make use of this substance.",
        "You exit the Domain of Singularity without even seeing the others.",
    ]
},
startCutscene18() {
    player.c.cutsceneText = [
        "The green mist accumulates into a giant cloud that obscures the red sky.",
        '"What could this be?" Kres exclaims with concern.',
        '"I don\'t know. It seems as if it is the same kind of gas that Sel is made out of.", Nav replies.',
        'The fourth Core pops out of the Core Assembler. Kres walks over to the Core and observes it closely.',
        '"Maybe this "Radiation" value can help us defeat Matos," Kres suggests.',
        '"Do you have any ideas?", Sel asks.',
        'You remember what Tav said. This ancient technology is meant to make Celestials stronger.',
        '"I\'m not sure if we can actually use these ores against Matos", you say with a worried tone.',
        '"It is the only way we can ever get close to defeating him. I know that back then, the Celestials used it to their own advantage, but it would make sense if we utilized these cores against them."'
    ]
},
startCutscene19()
{
    player.c.cutsceneText = [
        "You watch as your collection of Oil, Anonymity, Repli-Grass, and Replicanti Points grow.",
        '"It is strange how I find these things useful. After all, these SPV\'s are supposed to help Cante grow," you say to yourself.',
        'Just thinking about him makes you feel uneasy. You decide to ignore it.',
        'The ground suddenly shakes; trees fall over and leaves rustle. You look up to the sky, and in the distance you see a giant yellow monolith. Inscribed on the monolith is a large smiley face.',
        '"THIS PLACE IS SO BORING. I WANT TO HAVE FUN!!!" a high pitched voice screams. The voice reverberates throughout your mind, hurting your head & nearly deafening you.',
        'You brace yourself for conflict, but a loud creaking sound comes from behind.',
	    'When you turn around, you see a giant machine slowly walking towards the monolith. He quickly puts together a large spear using the parts of his body before sprinting',
        'This isn\'t good. A conflict while you\'re here would certainly be the end of you.',
        'You sprint to the Core Assembler and grab all of the cores. You then stuff all of the cores',
        '"Whoever it is... I am requesting a challenge!"',
    ]
},
startCutscene20()
{
    player.c.cutsceneText = [
        "This new superphysical value seems a bit odd.",
        "As you get more of it, the presence of the celestial grows stronger.",
        '"Listen to me! Show yourself now! Stop being scared!"',
        'The celestial speaks.',
        '"Oh... so committed to your task. All you do is work. Work. WORK!!!"',
        '"Why don\'t we have some fun?"',
        'It\'s another one of those crazy celestials. Just like Cante...',
        '"I won\'t fall for your trap. Not again. Reveal yourself right now!"',
        'A being appears in front of you.',
        'It appears to be a man with an emoji-like head, smiling. It unsettles you.',
        '"I am Jocus, the Celestial of Fun. Let\'s have some fun now!!!"',
    ]
},
startCutscene21()
{
    player.c.cutsceneText = [
        "As your SFRGT increases, you notice one thing happening to you.",
        "You are starting to enjoy this. As a matter of fact, you are having fun.",
        '"I see that smile on your face- this is working!"',
        '"I bet you are having a super fun real good time aren\'t ya!"',
        '"This superphysical value... it can manipulate one\'s emotions!"',
        '"See Cante? I am powerful! Why didn\'t you let me work for you."',
        '"I\'m sick of working for this damn clown."',
        "You try to concentrate on what the celestial is telling you, but you can't control the sheer enjoyment you are getting from SFRGT.",
        '"Now... let\'s see if I can control other emotions too! Be prepared, celestial hunter."'
    ]
},
startCutscene22()
{
    player.c.cutsceneText = [
        "Happiness. Sadnesss. Anger. You are experiencing all of these emotions at once.",
        "You also notice your number of resources in alt-universe 1 increase.",
        "These emotions bring you into a state of hallucination. You start to remember something.",
        "Something from before. A memory. A memory from right before you started this journey.",
        "It was the purple and purple humanoids. They are talking to each other.",
        '"So... why do you want to wipe his memory?", the purple one asks',
        '"He can not know about the proto overworld, nor can we let him in there. It\'s too risky.", the orange replies.',
        '"Wiping his memory will have all of it\'s downsides, but having him know about the proto overworld is the worst thing that can happen."',
        'Purple sighs. "The proto overworld is sealed away with the most powerful of all superphysical values."',
        '"Not even the most powerful celestial hunter, the infinity keeper can break this seal."',
        '"I don\'t think he will ever make it past this seal..."',
        'Orange replies. "Bro. We are creating the strongest celestial hunter to ever walk this multiverse."',
        '"So strong that they can control SPV\'s from other universes INSTANTLY."',
        '"With foresight so powerful that they know the EXACT NUMBER of superphysical values."',
        '"Once he figures out a way to break this seal, it\'s over."',
        '"Everything so hard that we worked for..."',
        '"So that\'s why we are erasing his memory."',
        "You are brought back to the present. Focused. Lacking emotion.",
        '"Your dumb drug wore off. Now. Give me a real challenge."',
        'Jocus turns around with a face of disgust. Something you\'ve never seen.',
        '"Very well then. I will use all of my power for this."',
        '"Beating this challenge will also kill me."',
        '"Have fun."',
    ]
},
startCutscene23()
{
    player.c.cutsceneText = [
        "You leave the challenge, and destroy Jocus' core.",
        '"Welp. That was fun."',
        'You look at Jocus. "Now. What are you doing in Cante\'s universe."',
        '"You know, I\'ve always admired Cante..."',
        '"I just want to know what made him so great....."',
        "Jocus' fades away, and you notice something strange.",
        "You feel Cante's presence yet again, but you blame it on the after effects of Jocus' challenge.",
        "A portal opens right in front of you.",
        'How interesting.',
    ]
},
startCutscene24()
{
    player.c.cutsceneText = [
        "You become overwhelmed by the large number of singularity cores that you are generating.",
        'You ask the question, "So, how do we defeat Matos with all of these cores? At this point they are just taking up space. I don\'t think we can handle having all of these cores."',
        'Nav responds. "Well this is the closest we\'ve gotten so far. Before you arrived, we didn\'t even have access to these cores."',
        '"What if we find out ways to utilize the materials that these cores are made out of...", Kres Suggests.',
        'The group agrees to try that out, while Eclipse sits there and stares.',
        'Out of nowhere a giant red bolt of lightning struck down on the ground.',
        'And again...',
        'And again...',
        'The lightning kept on striking at a fixed interval. It was strange.',
        'Sel snaps into realization. "I know what this is... this is morse code!"',

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
  raindrop.style.backgroundColor = rainColor;
  raindrop.style.width = '2px';
  raindrop.style.height = '15px';
  document.body.appendChild(raindrop);

  const animationDuration = Math.random() * 2 + 1;
  raindrop.style.animation = `fall ${animationDuration}s linear`;

  raindrop.addEventListener('animationend', () => {
    raindrop.remove();
  });
}

// Handle tab visibility change
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    startRain('#00f'); // Set default rain color
  } else {
    stopRain();
  }
});


// i wrote basically all of the cutscenes. and if i didnt, ice wrote them and god is he awful at writing. i cleaned up and polished all of the things he wrote. im writing this at 1:27 am, 10/4/24. the game is set to release today, either in the morning or in the afternoon.
