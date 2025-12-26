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
        cutscene: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,true, true, true,
            true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,true, true, true,
            true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,true, true, true,
        ],

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
    }},
update(delta) {
if (player.c.cutscene[0] && player.tab == "i")
{
    showCutscene(cutsceneDialogue1, {
        background: "#000000", 
        cutsceneID: 1,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[0] = false
}
if (player.c.cutscene[1] && player.r.rank.gte(1))
{
    showCutscene(cutsceneDialogue2, {
        cutsceneID: 2,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[1] = false
}
if (player.c.cutscene[2] && hasUpgrade("i", 13))
{
    showCutscene(cutsceneDialogue3, {
        cutsceneID: 3,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[2] = false
}
if (player.c.cutscene[3] && player.p.prestigePoints.gte(1))
{
    showCutscene(cutsceneDialogue4, {
        cutsceneID: 4,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[3] = false
}
if (player.c.cutscene[4] && hasUpgrade("i", 15))
{
    showCutscene(cutsceneDialogue5, {
        cutsceneID: 5,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[4] = false
}
if (player.c.cutscene[5] && player.t.trees.gte(1))
{
    showCutscene(cutsceneDialogue6, {
        cutsceneID: 6,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[5] = false
}
if (player.c.cutscene[6] && player.g.grass.gte(1))
{
    showCutscene(cutsceneDialogue7, {
        cutsceneID: 7,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[6] = false
}
if (player.c.cutscene[7] && player.gh.grasshoppers.gte(1))
{
    showCutscene(cutsceneDialogue8, {
        cutsceneID: 8,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[7] = false
}
if (player.c.cutscene[8] && hasUpgrade("i", 19))
{
    showCutscene(cutsceneDialogue9, {
        background: "#094599",
        cutsceneID: 9,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[8] = false
}
if (player.c.cutscene[9] && hasUpgrade("i", 21))
{
    showCutscene(cutsceneDialogue10, {
        cutsceneID: 10,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[9] = false
}
if (player.c.cutscene[10] && player.po.featureSlots.eq(0))
{
    showCutscene(cutsceneDialogue11, {
        background: "#000000", 
        cutsceneID: 11,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[10] = false
}
if (player.c.cutscene[11] && player.d.buyables[12].gte(1))
{
    showCutscene(cutsceneDialogue12, {
        cutsceneID: 12,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[11] = false
}
if (player.c.cutscene[12] && player.rf.rocketFuel.gte(1))
{
    showCutscene(cutsceneDialogue13, {
        cutsceneID: 13,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[12] = false
}
if (player.c.cutscene[13] && player.points.gte("1.79e308"))
{
    showCutscene(cutsceneDialogue14, {
        background: "#b87c34",
        cutsceneID: 14,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[13] = false
}
if (player.c.cutscene[14] && player.in.infinityPoints.gte("1"))
{
    showCutscene(cutsceneDialogue15, {
        background: "#ffffff",
        cutsceneID: 15,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[14] = false
}
if (player.c.cutscene[15] && hasUpgrade("ip", 11))
{
    showCutscene(cutsceneDialogue16, {
        background: "#001f18",
        cutsceneID: 16,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[15] = false
}
if (player.c.cutscene[16] && (hasUpgrade("ip", 11) && player.r.rank.gte(1)))
{
    showCutscene(cutsceneDialogue17, {
        cutsceneID: 17,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[16] = false
}
if (player.c.cutscene[17] && (player.pet.levelables[101][0].gte(1) || player.pet.levelables[102][0].gte(1) || player.pet.levelables[103][0].gte(1) || player.pet.levelables[104][0].gte(1) || player.pet.levelables[105][0].gte(1)))
{
    showCutscene(cutsceneDialogue18, {
        background: "#094599",
        cutsceneID: 18,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[17] = false
}
if (player.c.cutscene[18] && hasMilestone("ip", 16))
{
    showCutscene(cutsceneDialogue19, {
        cutsceneID: 19,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[18] = false
}
if (player.c.cutscene[19] && hasChallenge("ip", 11))
{
    showCutscene(cutsceneDialogue20, {
        cutsceneID: 20,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[19] = false
}
if (player.c.cutscene[20] && ((inChallenge("ip", 12) || !player.c.cutscene[21]) && player.gh.grasshoppers.gte(1)))
{
    showCutscene(cutsceneDialogue21, {
        cutsceneID: 21,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[20] = false
}
if (player.c.cutscene[21] && ((inChallenge("ip", 13) || !player.c.cutscene[22]))) //HEX, likely to change conditions
{
    showCutscene(cutsceneDialogue22, {
        cutsceneID: 22,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[21] = false
}
if (player.c.cutscene[22] && ((inChallenge("ip", 15) || !player.c.cutscene[23]) && player.d.challengeDicePoints.gte(1))) 
{
    showCutscene(cutsceneDialogue23, {
        cutsceneID: 23,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[22] = false
}
if (player.c.cutscene[23] && player.cb.evolutionShards.gte(1)) //marcel
{
    showCutscene(cutsceneDialogue24, {
        background: "#094599",
        cutsceneID: 24,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[23] = false
}
if (player.c.cutscene[24] && (inChallenge("ip", 16) || !player.c.cutscene[25]))
{
    showCutscene(cutsceneDialogue25, {
        cutsceneID: 25,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[24] = false
}
if (player.c.cutscene[25] && (inChallenge("ip", 17) || !player.c.cutscene[26]))
{
    showCutscene(cutsceneDialogue26, {
        background: "#ffffff",
        cutsceneID: 26,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[25] = false
}
if (player.c.cutscene[26] && hasChallenge("ip", 17))
{
    showCutscene(cutsceneDialogue27, {
        cutsceneID: 27,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[26] = false
}
if (player.c.cutscene[27] && hasChallenge("ip", 18))
{
    showCutscene(cutsceneDialogue28, {
        background: "#008080",
        cutsceneID: 28,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[27] = false
}
if (player.c.cutscene[28] && player.ta.negativeInfinityPoints.gte(1))
{
    showCutscene(cutsceneDialogue29, {
        background: "#008080",
        cutsceneID: 29,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[28] = false
}
if (player.c.cutscene[29] && player.ev.evolutionsUnlocked[0])
{
    showCutscene(cutsceneDialogue30, {
        background: "#094599",
        cutsceneID: 30,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[29] = false
}
if (player.c.cutscene[30] && hasUpgrade("ta", 15))
{
    showCutscene(cutsceneDialogue31, {
        background: "#008080",
        cutsceneID: 31,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[30] = false
}
if (player.c.cutscene[31] && hasUpgrade("ta", 17))
{
    showCutscene(cutsceneDialogue32, {
        background: "#008080",
        cutsceneID: 32,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[31] = false
}
if (player.c.cutscene[32] && hasUpgrade("ta", 21))
{
    showCutscene(cutsceneDialogue33, {
        background: "#008080",
        cutsceneID: 33,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[32] = false
}
if (player.c.cutscene[33] && (inChallenge("tad", 11) || !player.c.cutscene[34]))
{
    showCutscene(cutsceneDialogue34, {
        cutsceneID: 34,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[33] = false
}
if (player.c.cutscene[34] && player.de.tavPoints.gte(1))
{
    showCutscene(cutsceneDialogue35, {
        cutsceneID: 35,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[34] = false
}
if (player.c.cutscene[35] && player.bi.brokenInfinities.gte(1))
{
    showCutscene(cutsceneDialogue36, {
        cutsceneID: 36,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[35] = false
}
if (player.c.cutscene[36] && hasUpgrade("de", 16))
{
    showCutscene(cutsceneDialogue37, {
        background: "#ffffff",
        cutsceneID: 37,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[36] = false
}
if (player.c.cutscene[37] && (player.tad.shatteredInfinities.gte(1) || player.tad.disfiguredInfinities.gte(1) || player.tad.corruptedInfinities.gte(1)))
{
    showCutscene(cutsceneDialogue38, {
        cutsceneID: 38,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[37] = false
}
if (player.c.cutscene[38] && player.in.unlockedBreak)
{
    showCutscene(cutsceneDialogue39, {
        background: "#008080",
        cutsceneID: 39,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[38] = false
}
if (player.c.cutscene[39] && !player.c.cutscene[38])
{
    showCinematicCutscene(cutsceneDialogue40, {
    background: "#000",
    cutsceneID: 40
    });
    player.c.cutscene[39] = false
}
if (player.c.cutscene[40] && player.po.breakInfinity)
{
    showCutscene(cutsceneDialogue41, {
        background: "#000000", 
        cutsceneID: 41,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[40] = false
}
if (player.c.cutscene[41] && player.ev.evolutionsUnlocked[3])
{
    showCutscene(cutsceneDialogue42, {
        background: "#094599", 
        cutsceneID: 42,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[41] = false
}
if (player.c.cutscene[42] && hasUpgrade("bi", 14))
{
    showCutscene(cutsceneDialogue43, {
    background: "#000",
    cutsceneID: 43,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[42] = false
}
if (player.c.cutscene[43] && player.gh.steel.gte(1))
{
    showCutscene(cutsceneDialogue44, {
    cutsceneID: 44,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[43] = false
}
if (player.c.cutscene[44] && player.p.crystals.gte(1))
{
    showCutscene(cutsceneDialogue45, {
    cutsceneID: 45,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[44] = false
}
if (player.c.cutscene[45] && player.r.timeReversed)
{
    showCutscene(cutsceneDialogue46, {
    background: "#000",
    cutsceneID: 46,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[45] = false
}
if (player.c.cutscene[46] && player.ca.unlockedCante)
{
    showCutscene(cutsceneDialogue47, {
    background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
    cutsceneID: 47,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[46] = false
}
if (player.c.cutscene[47] && player.ca.replicanti.gte(1e308))
{
    showCutscene(cutsceneDialogue48, {
    background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
    cutsceneID: 48,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[47] = false
}   
if (player.c.cutscene[48] && player.ca.replicantiGalaxies.gte(1))
{
    showCutscene(cutsceneDialogue49, {
    cutsceneID: 49,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[48] = false
}   
if (player.c.cutscene[49] && (player.tab == "cap" || !player.c.cutscene[50]))
{
    showCutscene(cutsceneDialogue50, {
    cutsceneID: 50,
    background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[49] = false
} 
if (player.c.cutscene[50] && player.ev.evolutionsUnlocked[8])
{
    showCutscene(cutsceneDialogue51, {
    cutsceneID: 51,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[50] = false
} 
if (player.c.cutscene[51] && player.cap.reqsPassed[0])
{
    showCutscene(cutsceneDialogue52, {
    cutsceneID: 52,
    background: "#ffffff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[51] = false
} 
if (player.c.cutscene[52] && player.cap.reqsPassed[1])
{
    showCutscene(cutsceneDialogue53, {
    cutsceneID: 53,
    background: "#ffffff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[52] = false
}
if (player.c.cutscene[53] && player.cap.reqsPassed[2])
{
    showCutscene(cutsceneDialogue54, {
    cutsceneID: 54,
    background: "#ffffff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[53] = false
} 
if (player.c.cutscene[54] && player.cap.reqsPassed[3])
{
    showCutscene(cutsceneDialogue55, {
    cutsceneID: 55,
    background: "#ffffff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[54] = false
} 
if (player.c.cutscene[55] && ((player.tab == "cp"  || !player.c.cutscene[56]) || (player.tab == "a1u" || !player.c.cutscene[56])))
{
    showCutscene(cutsceneDialogue56, {
    cutsceneID: 56,
    background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[55] = false
}
if (player.c.cutscene[56] && hasUpgrade("cp", 15))
{
    showCutscene(cutsceneDialogue57, {
    cutsceneID: 57,
    background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[56] = false
}
if (player.c.cutscene[57] && hasUpgrade("cp", 18))
{
    showCutscene(cutsceneDialogue58, {
    cutsceneID: 58,
    background: "#ffffff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[57] = false
}
if (player.c.cutscene[58] && player.oi.protoMemories.gt(1))
{
    showCutscene(cutsceneDialogue59, {
    cutsceneID: 59,
    background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[58] = false
}
if (player.c.cutscene[59] && player.ca.defeatedCante)
{
    showCutscene(cutsceneDialogue60, {
    cutsceneID: 60,
    background: "linear-gradient(45deg, #0a82b9 0%, #7dd3f9 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[59] = false
}
if (player.c.cutscene[60] && !player.c.cutscene[59])
{
    showCutscene(cutsceneDialogue61, {
    cutsceneID: 61,
    background: "#000000",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[60] = false
}
if (player.c.cutscene[61] && hasMilestone("s", 11))
{
    showCutscene(cutsceneDialogue62, {
    cutsceneID: 62,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[61] = false
}
if (player.c.cutscene[62] && (player.subtabs["co"]["stuff"] == "Cores" || !player.c.cutscene[63]))
{
    showCutscene(cutsceneDialogue63, {
    cutsceneID: 63,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[62] = false
}
if (player.c.cutscene[63] && hasUpgrade("i", 101))
{
    showCutscene(cutsceneDialogue64, {
    cutsceneID: 64,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[63] = false
}
if (player.c.cutscene[64] && hasMilestone("s", 12))
{
    showCutscene(cutsceneDialogue65, {
    cutsceneID: 65,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[64] = false
}
if (player.c.cutscene[65] && hasMilestone("s", 13))
{
    showCutscene(cutsceneDialogue66, {
    cutsceneID: 66,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[65] = false
}
if (player.c.cutscene[66] && hasMilestone("s", 14))
{
    showCutscene(cutsceneDialogue67, {
    cutsceneID: 67,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[66] = false
}
if (player.c.cutscene[67] && hasUpgrade("cp", 19))
{
    showCutscene(cutsceneDialogue68, {
    cutsceneID: 68,
    background: "#5e8503",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[67] = false
}
if (player.c.cutscene[68] && hasUpgrade("fu", 11))
{
    showCutscene(cutsceneDialogue69, {
    cutsceneID: 69,
    background: "#5e8503",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[68] = false
}
if (player.c.cutscene[69] && hasUpgrade("fu", 16))
{
    showCutscene(cutsceneDialogue70, {
    cutsceneID: 70,
    background: "#ffffff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[69] = false
}
if (player.c.cutscene[70] && (inChallenge("fu", 11) || !player.c.cutscene[71]))
{
    showCutscene(cutsceneDialogue71, {
    cutsceneID: 71,
    background: "#5e8503",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[70] = false
}
if (player.c.cutscene[71] && hasChallenge("fu", 11))
{
    showCutscene(cutsceneDialogue72, {
    cutsceneID: 72,
    background: "#5e8503",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[71] = false
}
if (player.c.cutscene[72] && hasMilestone("s", 17))
{
    showCutscene(cutsceneDialogue73, {
    cutsceneID: 73,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[72] = false
}
if (player.c.cutscene[73] && (player.tab == "ch" || !player.c.cutscene[74]))
{
    showCutscene(cutsceneDialogue74, {
    cutsceneID: 74,
    background: "linear-gradient(90deg, #260b36, #0920b5)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[73] = false
}
if (player.c.cutscene[74] && hasMilestone("s", 19))
{
    showCutscene(cutsceneDialogue75, {
    cutsceneID: 75,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[74] = false
}
if (player.c.cutscene[75] && hasUpgrade("s", 19))
{
    showCutscene(cutsceneDialogue76, {
    cutsceneID: 76,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[75] = false
}
if (player.c.cutscene[76] && hasUpgrade("s", 21))
{
    showCutscene(cutsceneDialogue77, {
    cutsceneID: 77,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[76] = false
}
if (player.c.cutscene[77] && (player.sma.inStarmetalChallenge || !player.c.cutscene[78]))
{
    showCutscene(cutsceneDialogue78, {
    cutsceneID: 78,
    background: "#000000ff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[77] = false
}
if (player.c.cutscene[78] && player.sma.starmetalAlloy.gte(1))
{
    showCutscene(cutsceneDialogue79, {
    cutsceneID: 79,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[78] = false
}
if (player.c.cutscene[79] && player.sma.starmetalAlloy.gte(1))
{
    showCutscene(cutsceneDialogue80, {
    cutsceneID: 80,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[79] = false
}
if (player.c.cutscene[80] && player.ma.matosUnlockConditions[0])
{
    showCutscene(cutsceneDialogue81, {
    cutsceneID: 81,
    background: "#830b00ff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[80] = false
}
if (player.c.cutscene[81] && player.ma.matosUnlockConditions[1])
{
    showCutscene(cutsceneDialogue82, {
    cutsceneID: 82,
    background: "#830b00ff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[81] = false
}
if (player.c.cutscene[82] && player.ma.matosUnlockConditions[2])
{
    showCutscene(cutsceneDialogue83, {
    cutsceneID: 83,
    background: "#830b00ff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[82] = false
}
if (player.c.cutscene[83] && player.ma.matosUnlockConditions[3])
{
    showCutscene(cutsceneDialogue84, {
    cutsceneID: 84,
    background: "#830b00ff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[83] = false
}
if (player.c.cutscene[84] && player.ma.matosUnlock)
{
    showCutscene(cutsceneDialogue85, {
    cutsceneID: 85,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[84] = false
}
if (player.c.cutscene[85] && player.au2.au2Unlocked)
{
    showCutscene(cutsceneDialogue86, {
    cutsceneID: 86,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[85] = false
}
if (player.c.cutscene[86] && ((player.ma.inBlackHeart && player.ma.currentDepth.eq(1)) || !player.c.cutscene[87]))
{
    showCutscene(cutsceneDialogue87, {
    cutsceneID: 87,
    background: "linear-gradient(-180deg, #540818 0%, #3a0202 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[86] = false
}
if (player.c.cutscene[87] && ((player.ma.inBlackHeart && player.ma.currentDepth.eq(2)) || !player.c.cutscene[88]))
{
    showCutscene(cutsceneDialogue88, {
    cutsceneID: 88,
    background: "linear-gradient(-180deg, #720455 0%, #250121 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[87] = false
}
if (player.c.cutscene[88] && ((player.ma.inBlackHeart && player.ma.currentDepth.eq(3)) || !player.c.cutscene[89]))
{
    showCutscene(cutsceneDialogue89, {
    cutsceneID: 89,
    background: "linear-gradient(-180deg, #720804 0%, #720455 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[88] = false
}
if (player.c.cutscene[89] && ((player.ma.inBlackHeart && player.ma.currentDepth.eq(3) && player.ma.matosFightActive) || !player.c.cutscene[90]))
{
    showCutscene(cutsceneDialogue90, {
    cutsceneID: 90,
    background: "linear-gradient(-180deg, #720804 0%, #720455 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[89] = false
}
if (player.c.cutscene[90] && player.ma.matosDefeated)
{
    showCutscene(cutsceneDialogue91, {
    cutsceneID: 91,
    background: "linear-gradient(-180deg, #720804 0%, #720455 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[90] = false
}
if (player.c.cutscene[91] && !player.c.cutscene[90] && !cutsceneActive)
{
    showCutscene(cutsceneDialogue92, {
    cutsceneID: 92,
    background: "linear-gradient(-180deg, #000000ff 0%, #20021dff 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[91] = false
}
if (player.c.cutscene[92] && !player.c.cutscene[91] && !player.c.cutscene[90] && !cutsceneActive)
{
    showCutscene(cutsceneDialogue93, {
    cutsceneID: 93,
    background: "#260300",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[92] = false
}
if (player.c.cutscene[93] && player.sme.starmetalEssence.gte(1) && player.ma.matosDefeated)
{
    showCutscene(cutsceneDialogue94, {
    cutsceneID: 94,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[93] = false
}
if (player.c.cutscene[94] && player.ro.rocket2Unlocked)
{
    showCutscene(cutsceneDialogue95, {
    cutsceneID: 95,
    background: "#1d1d1dff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[94] = false
}
if (player.c.cutscene[95] && player.se.starsExploreCount[0][1].gte(1))
{
    showCutscene(cutsceneDialogue96, {
    cutsceneID: 96,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[95] = false
}
if (player.c.cutscene[96] && player.se.starsExploreCount[0][2].gte(1))
{
    showCutscene(cutsceneDialogue97, {
    cutsceneID: 97,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[96] = false
}
if (player.c.cutscene[97] && player.se.starsExploreCount[0][3].gte(1))
{
    showCutscene(cutsceneDialogue98, {
    cutsceneID: 98,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[97] = false
}
if (player.c.cutscene[98] && player.se.starsExploreCount[0][4].gte(1))
{
    showCutscene(cutsceneDialogue99, {
    cutsceneID: 99,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[98] = false
}
if (player.c.cutscene[99] && player.se.starsExploreCount[0][5].gte(1))
{
    showCutscene(cutsceneDialogue100, {
    cutsceneID: 100,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[99] = false
}
if (player.c.cutscene[100] && player.ir.iriditeUnlocked)
{
    showCutscene(cutsceneDialogue101, {
    cutsceneID: 101,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[100] = false
}
if (player.c.cutscene[101] && player.ir.inBattle)
{
    showCutscene(cutsceneDialogue102, {
    cutsceneID: 102,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[101] = false
}
if (player.c.cutscene[102] && player.ir.battleLevel.gte(2))
{
    showCutscene(cutsceneDialogue103, {
    cutsceneID: 103,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[102] = false
}
if (player.c.cutscene[103] && player.ir.battleLevel.gte(4))
{
    showCutscene(cutsceneDialogue104, {
    cutsceneID: 104,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[103] = false
}
if (player.c.cutscene[104] && player.ds.spaceEnergy.gte(1))
{
    showCutscene(cutsceneDialogue105, {
    cutsceneID: 105,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[104] = false
}
if (player.c.cutscene[105] && hasUpgrade("ir", 15))
{
    showCutscene(cutsceneDialogue106, {
    cutsceneID: 106,
    background: "#ffffff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[105] = false
}
if (player.c.cutscene[106] && player.ir.battleLevel.gte(8) && hasUpgrade("ir", 16))
{
    showCutscene(cutsceneDialogue107, {
    cutsceneID: 107,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[106] = false
}
if (player.c.cutscene[107] && hasUpgrade("ir", 19))
{
    showCutscene(cutsceneDialogue108, {
    cutsceneID: 108,
    background: "#5c4b4bff",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[107] = false
}
if (player.c.cutscene[108] && player.ir.iriditeFightActive)
{
    showCutscene(cutsceneDialogue109, {
    cutsceneID: 109,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[108] = false
}
if (player.c.cutscene[109] && player.ir.iriditePhase > 2 && player.ir.iriditeFightActive)
{
    showCutscene(cutsceneDialogue110, {
    cutsceneID: 110,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[109] = false
}
if (player.c.cutscene[110] && player.ir.iriditeDefeated)
{
    showCutscene(cutsceneDialogue111, {
    cutsceneID: 111,
    background: "radial-gradient(circle, #151230, #000000)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[110] = false
}
if (player.c.cutscene[111] && !player.c.cutscene[110] && !cutsceneActive)
{
    showCutscene(cutsceneDialogue112, {
    cutsceneID: 112,
    background: "linear-gradient(-180deg, #720804 0%, #720455 100%)",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[111] = false
}

// CERE

if (player.c.cutscene[112] && player.tab == "in" && player.ma.matosDefeated) {
    showCutscene(cutsceneDialogue113, {
        cutsceneID: 113,
        portrait: "resources/secret.png"
    });
    player.c.cutscene[112] = false
}

if (player.c.cutscene[113] && player.tab == "rif") {
    showCutscene(cutsceneDialogue114, {
        cutsceneID: 114,
        background: "#402030",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[113] = false
}

if (player.c.cutscene[114] && player.cer.transfiguratorPower.gte(1)) {
    showCutscene(cutsceneDialogue115, {
        cutsceneID: 115,
        background: "#402030",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[114] = false
}

if (player.c.cutscene[115] && player.cer.transfiguratorPower.gte(2)) {
    showCutscene(cutsceneDialogue116, {
        cutsceneID: 116,
        background: "#402030",
        portrait: "resources/secret.png"
    });
    player.c.cutscene[115] = false
}

//

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
            '"We don\'t know why we were sent to this place. Since we have arrived here, we have been exploring this forest & trying to find an alternative exit. For decades, all the progress we have made was the discovery of a strange machine. Follow me."',
            'You follow the man through the forest. After a short walk, you see a machine in front of you.',
            '"This machine is able to refuel Singularity Cores, which can bring us a step closer to defeating Matos."',
            "Suddenly, the machine shoots beams of energy. Light fills your entire field of vision. ",
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
            '"This person can power the cores... how fascinating", the woman remarks.',
            '"I\'d like to introduce you to everyone here. I am Kres, the woman next to me is named Nav, the mask with the mask is named Sel, and the smoke creature is Eclipse," said the man as he observes the Singularity Core.',
            '"Eclipse does not speak, so we have given him that title," Sel replied. His voice is deep and gravelly.',
            '"We are the four people left alive in the Domain of Singularity. We need you to help us defeat Matos, the Celestial of Machinery," Nav explains.',
            "You get up and walk to the core. You notice that the core has a list of attributed superphysical values.",
            "You put another dead core into the machine, and prepare to return to the desert."
        ]
    },
    startCutscene16() {
        player.c.cutsceneText = [
            "You rematerialize in the Domain of Singularity. The machine shakes vigorously and another Singularity Core rolls out of the front",
            '"The more of these we re-awaken, the more weapons we have against Matos," Sel says as he inspects the newly fueled core.',
            '"Interesting... a core that glows with the essence of ' + CORE_INFO[player.co.resetIndex].short + '."',
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
            "Another core rolls out of the machine, but you notice something odd.",
            "A greenish mist comes out of the core, and you also notice the same greenish mist ooze out of the previous cores you have fueled.",
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
            'The fourth core pops out of the machine. Kres walks over to the core and observes it closely.',
            '"Maybe this "Radiation" value can help us defeat Matos," Kres suggests.',
            '"Do you have any ideas?", Sel asks.',
            'You remember what Tav said. This ancient technology is meant to make Celestials stronger.',
            '"I\'m not sure if we can actually use these ores against Matos", you say with a worried tone.',
            '"It is the only way we can ever get close to defeating him. I know that back then, the Celestials used it to their own advantage, but it would make sense if we utilized these cores against them."'
        ]
    },
    startCutscene19() {
        player.c.cutsceneText = [
            "You watch as your collection of Oil, Anonymity, Repli-Grass, and Replicanti Points grow.",
            '"It is strange how I find these things useful. After all, these SPV\'s are supposed to help Cante grow," you say to yourself.',
            'Just thinking about him makes you feel uneasy. You decide to ignore it.',
            'The ground suddenly shakes; trees fall over and leaves rustle. You look up to the sky, and in the distance you see a giant yellow monolith. Inscribed on the monolith is a large smiley face.',
            '"THIS PLACE IS SO BORING. I WANT TO HAVE FUN!!!" a high pitched voice screams. The voice reverberates throughout your mind, hurting your head & nearly deafening you.',
            'You brace yourself for conflict, but a loud creaking sound comes from behind.',
            'When you turn around, you see a giant machine slowly walking towards the monolith. He quickly puts together a large spear using the parts of his body before sprinting',
            'This isn\'t good. A conflict while you\'re here would certainly be the end of you.',
            'You grab all of your cores and prepare.',
            '"Whoever it is... I am requesting a challenge!"',
        ]
    },
    startCutscene20() {
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
    startCutscene21() {
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
    startCutscene22() {
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
    startCutscene23() {
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
    startCutscene24() {
        player.c.cutsceneText = [
            "You become overwhelmed by the power now contained in your Singularity Cores.",
            'You ask the question, "So, how do we defeat Matos with all of these cores? At this point it is a struggle to increase the power of these cores."',
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
    startCutscene25() {
        player.c.cutsceneText = [
            "As the lightning strikes, Sel deciphers the morse code.",
            '"It says... "Currently faulty. Reach the highest potential."", Sel says with a worried tone.', 
            '"What does that mean?" Kres asks.',
            '"Honestly, I have no idea."',
            '"Is that what we need to do in order to defeat Matos?", you ask.',
            '"I\'m not sure, but it\'s certainly worth a shot.", Sel replies.',
            '"Well, what does it mean by "faulty?", Nav asks.',
            'Eclipse points at the sun, which is red, and vibrant.',
            '"I think I know what it means. We need to find starmetal alloy. Then we can \"strengthen\" the core, by infusing the starmetal alloy into it.", Kres responds.',
            '"These cores seem pretty ancient, so it would make sense for Matos to want them rejuvenated with fresh materials."',
            '"How do we even get to the sun? We don\'t have anything.", Nav asks.',
            '"We must extract the sun\'s energy and give it physical form to create starmetal alloy.", Kres replies.',
            '"I think I know how exactly I would do that...", you say.',
            "You have an idea. Using superphysical power from universe 1, you can use it to funnel the sun's energy into the machine, which will produce starmetal alloy.",
            "You tell the group your plan, and they agree to it.",
        ]
    },
    startCutscene26() {
        player.c.cutsceneText = [
            "You return to the Domain of Singularity, with starmetal alloy. The group is waiting for you.",
            '"So... this is what we need?" Kres asks.',
            '"Yup. Seems like we can also try improving the cores with this alloy.", you reply.',
            '"Guys... what if fueling all of these cores for Matos is a bad idea?" Nav asks.',
            '"If he wants the strongest possible cores, wouldn\'t that just make him more powerful?"',
            '"Hmm... I mean how else would we be able to escape?" Kres replies.',
            '"And if we defeat this celestial using it\'s own creation, that would be a good look as celestial hunters." Sel adds.',
            '"We have been here for years. Boss probably thinks we are dead. We must restore the hope of celestial hunters! We must make it out alive!" Kres exclaims.',
            'Kres points at you. "And you especially. You have been blessed with a godly ability. Traversing through universes using the power of superphysical values!"',
            '"You could have celestial hunting abilities as powerful as the infinity keeper himself!"',
            '"Even if Matos is manipulating us, he must show his presence in order to stop us."',
            '"And once he does show his presence, we will use the power of our cores to defeat him."',
        ]
    },
    startCutscene27() {
        player.c.cutsceneText = [
            "You pull out a card from the light extractor, and you notice a symbol you have never seen.",
            'A voice whispers in your head. "Matos is waiting. Matos is waiting..."',
            "An altar appears in front of you, with four runes for each condition you must satisfy.",
            "This is it. You must pass these conditions to summon Matos.",
            "You just need some time to prepare.",
        ]
    },
    startCutscene28() {
        player.c.cutsceneText = [
            "You and the others stand in front of the altar. The center glows with a vibrant red hue.",
            "The altar shakes violently, and the ground starts opening up.",
            'A voice echoes throughout the area, "I have returned... Thanks for freeing me."',
            '"You guys have been working hard haven\'t you?"',
            '"I see you have been using my technology to your advantage. I must say, I am impressed."',
            '"But you know, I am not going to let you leave this place."',
            '"You guys don\'t know it, but you guys have feel right into my trap."',
            '"Even if you all manage to kill me, the other celestials... The Novasent... My celestial powers will reawaken them!"',
            '"This decaying universe will crumble and the gates to The Meta Universe will open!"',
            '"A universe that contains high levels of void energy, and superphysical values that will make any celestial powerful!"',
            '"These gates have not been opened in eons. Once this universe\'s celestials opens the gates we will reign supreme."',
            '"Nova and the Novasent will be reborn, and they will be more powerful than ever."',
            '"And after they are done with The Meta Universe, they will destroy all celestial hunters!"',
            'The sky started to turn black, as the sun was blocked out by some object.',
            '"What the hell do we do now?", Sel asks.',
            '"You heard what the celestial said. We are screwed no matter what we do. The least we can do is make it out alive.", You reply.',
            '"Woah! Look at Eclipse!" Kres exclaims.',
            "Eclipse is glowing red, and is pulsing with anger.",
            '"This is just like what happened before..." Kres says.',
            '"Where is Matos?", Nav asks.',
            '"He must be in there...", Sel points to the giant hole in the ground, which appears to have no bottom.',
            "The hole appears to be pulsating like a heartbeat. The energy feels intense. It's the power of a true celestial.",
            '"I guess the only way to find out is if we jump in there.", You say.',
        ]
    },
    startCutscene29() {
        player.c.cutsceneText = [
            "You and the others descend the hole, and the beating sound intensifies.",
            'You feel the energy of the celestial grow stronger and stronger.',
            'Matos\' voice echoes throughout the area.',
            '"So you guys are what they call "Celestial Hunters". That is interesting."',
            '"A group of people who put all this time and effort into killing us, but fail repeatedly."',
            '"These are my weakest celestialites. Descend deeper and you will face stronger and stronger celestialites."',
            '"I don\'t care what I have to do. We just have to make it out alive!", Sel exclaims.',
            'Matos replies, "All of you guys are dead no matter what happens. There is no escape. My death only means things will get worse for you."',
            '"The only true way to escape is if you beat my boss, Nova."',
            '"And you guys are way too weak for that."',
            '"But I respect the effort."',
            '"So what we don\'t make it out of here alive... I guess we can have some fun killing some celestials! That is our job isn\'t it!", Kres exclaims.',
            '"We must make it to the center! Let\'s keep going!!!"',
            "You and the others descend deeper into the hole.",
            "Matos' presence intensifies and you notice stronger celestialites.",
        ]
    },
    startCutscene30() {
        player.c.cutsceneText = [
            "After leaving the circus, Nova, the celestial of singularity, wanted to form his group of celestials.",
            'Him and his brother ???? decided to start the Singularity Syndicate.',
            'A group of celestials with one goal: to kill all celestial hunters.',
            'However, Nova needed a bigger team. He searched the multiverse for other celestials who wanted to join his cause. ',
            'He stumbled upon ???????, the ?????? Celestial.',
            '??????? also had a deep-rooted hatred for celestial hunters, so she joined the team.',
            '??????? became the first of three Novasent—Nova\'s three most trusted celestials.',
        ]
    },
    startCutscene31() {
        player.c.cutsceneText = [
            "Nova quickly grew in strength, refining his power of using singularities.",
            'He started to destroy small universes and absorb their power, and other celestials feared him. ',
            'However, the superphysical power of one universe fascinated him.',
            'A civilization of humans was utilizing the power of stars to power their machinery, and was also rich in superphysical values.',
            'Nova realized that he could take advantage of the inhabitants.',
            'One day, he decided to appear in every human\'s dream and introduce himself as their god.',
            'Soon after, the humans started to build large temples to worship Nova and the Novasent.',
            'These temples extracted superphysical values from the souls of those who worshipped Nova, and Nova gained immense power.',
            'However, one of these souls had superphysical power like none other…',
        ]
    },
    startCutscene32() {
        player.c.cutsceneText = [
            "The orange humanoid appeared in front of you after what seemed like an eternity. You speak:",
            '"You never told me what a celestial truly was. I had to figure it out myself."',
            'The humanoid replies. "Your current encounters with celestials are meaningless. Even with Matos."',
            '"Have you even witnessed the power of a TRUE celestial?"',
            '"A celestial whose power is bound by the power of lower celestials; the constellation celestials."',
            'You respond. "Nova must be a constellation celestial then..."',
            'The humanoid repsonds back. "Even compared to some of the other constellation celestials Nova is weak."',
            '"Do you want to understand the true composition of a celestial?"',
            'You nod.',
            '"Just think about this for a second. What do black holes, planets, stars, and galaxies have in common."',
            'You answer the humanoid\'s question. "Well, they are all objects in space that consist of great mass, correct?"',
            '"Yup. Long ago, an unexplainable force converted a great amount of mass, in black holes, galaxies, stars, and even whole universes- into energy."',
            '"This energy is referred to as celestial energy. A powerful force for both superphysical and physical matter."',
            '"This unexplainable force combined celestial energy with living souls in order to create the very first celestials."',
            '"We don\'t know why celestials were created, or what this force even is."',
            '"All that we can understand is the destruction and terror that these celestials cause."',
            '"And it is your job to destroy them all."',
        ]
    },
    startCutscene33() {
        player.c.cutsceneText = [
            "As you descend further down the hole, you notice the rising temperatures, and the increasing pressure.",
            "The sound of the heartbeat intensifies to its loudest degree.",
            "You see an army of celestialites right in front of you.",
            '"We\'re almost there! I can see the center from here!", Nav exclaims.',
            'Kres speaks. "That must be the core of the celestial. If we destroy that, then Matos is gone."',
            'Matos\' voice echoes throughout the entire chamber.',
            '"I\'m suprised you all made it this far. But I don\'t think you will be able to defeat Nova."',
            '"I have collected enough superphysical energy needed to break Nova and the Novasent free."',
            '"They will kill all of you for sure."',
            'A bunch of giant celestialites spawn in the distance. Fire fills the entire chamber.',
            '"These are my strongest celestialites. Defeat them, and then you will get to me."',
            'Sel taps Kres\' shoulder. "Hey. Let me speak to you one more time before we start this. This might be the last chance we have to talk to each other."',
            '"Remember Jeremy. The one you came on this mission with. The one who defeated the celestial."',
            '"Yeah. What about him?", Kres replies.',
            '"I actually went on a mission with him before. It was the one where he defeated the celestial of fruit."',
            '"That celestial was just a child, stuck in the body and mind of a celestial. He had dreams. Desires. He wanted to be free."',
            '"But Jeremy ignored all of that. He believed that all celestials existed for the purpose of destruction and suffering of others."',
            '"Somehow I knew. I saw the innocence in that celestial. What if Matos is just the same?"',
            'Kres replies. "Look. Theres nothing we can do. Once someone turns into a celestial, they stay a celestial."',
            '"And from what I know about Matos\' is that Matos is out to kill us. Let\'s go."',
            'Matos somehow overhears Kres and Sel\'s conversation.',
            '"I was human a long time ago. But now I am a celestial. I have power! I have strength!"',
            '"But I do not have freedom."',
            '"That\'s why I must free Nova... He will grant me with freedom. Even if I am dead."',
        ]
    },
    startCutscene34() {
        player.c.cutsceneText = [
            "As the fifth omega celestialite is slain, a light emanates from the deepest depths of the hole.",
            "A humanoid being emerges from the light. The humanoid appears to be made of rusted metal, with a bright red glow.",
            "It was Matos.",
            '"So we truly meet again, hunters."',
            'Kres, Nav, and Sel are left in shock. Matos points directly at you.',
            '"I\'ve heard many things about you. You are a weapon. You have been engineered to kill us celestials."',
            '"Looks like the rumors are true. The spawn of the proto-overworld. A weapon mean\'t for destruction."',
            'Matos starts cackling in laughter.',
            '"How ironic! It is almost as if the true reason why celestials were created was forgotten."',
            '"So much time has passed... All you hunters care about is to KILL and DESTROY all celestials."',
            '"You forgot why we exist. You forgot why you exist. You all forgot the purpose of all this fighting!"',
            'You respond. "I don\'t care about a purpose. I have a job to do."',
            'You and your team get your weapons ready. All of your work had led to this moment.',
            'There\'s no way that you would let it end here.',
        ]
    },
    startCutscene35() {
        player.c.cutsceneText = [
            "After a long and grueling battle, you and your team manage to destroy Matos' core.",
            "Matos' body starts to disintegrate, and the light that was emanating from him starts to fade.",
            '"I... I am done with this life..." Matos whispers.',
            '"But before I go... I have one more thing I must do."',
            'A giant beam of light shoots out of Matos\' body, and shoots out, illuminating the entire sky.',
            '"I have freed Nova and the Novasent. They will be reborn, and they will be more powerful than ever."',
            '"They will destroy all celestial hunters, and they reign supreme among all celestials."',
            '"The power of singularity cores will be forgotten. A new type of power will emerge."',
            'A loud rumbling sound fills the air, and the hole starts to collapse.',
            '"Oh crap! We must get out of here now!", Sel exclaims.',
            'Eclipse starts to morph wings, and picks up you and your entire team using a gravitational force.',
            "You all ascend out of the hole, and you see the sky filled with superphysical energy.",
            "You see 13 massive explosions scatter the ground, and lights fill up the night sky.",
            '"Those must be the singularity cores! They are exploding!" Nav exclaims.',
            '"Now that you think about it, how will we be able to escape this place?", Kres asks.',
            '"I think we must face Nova and the Novasent.", you say.',
            '"But but but... that\'s impossible! Nova is a constellation celestial! We can\'t defeat that!" Sel replies.',
            '"It\'s either we don\'t try, and die, or we try our hardest, and still die. You choose. Our job is to kill celestials, remember?" Kres replies.',
            '"And plus. Now that I think about it, we can all say that we have killed a celestial. Matos was a celestial, and we killed him."',
            "Three symbols fill the night sky. One was a dice, another was a star, and another was a ladder.",
            '"Those symbols seem familiar to you, but you don\'t know why."',
            '"Those must be the symbols of the Novasent.", you say.',
            "While you and the others were talking, Eclipse starts to glow red.",
            "You could feel another superphysical force fill the air.",
            "All of a sudden, you see yourself in an empty void. A floating grey orb speaks to you. You are unable to speak.", //24
            '"You have done well, celestial hunter. It is about time I reveal myself."',
            '"I am a celestial, but I am not like the others. I have been observing you, ever since you entered the Domain of Singularity."',
            '"We have been waiting for you for a long, long time."',
            '"But if you want to know the truth, you must be worthy enough to face it."',
            '"The story and history of celestials are a lot more complex than you think."',
            '"The history of the multiverse, your predecessors. All of it."',
            '"You only know a mere fraction of the true details."',
            '"If you want to know more, you must face me."',
            '"Here is your first and only hint: When the sun and moon aligns, the cards will show you the way."',
            'All of a sudden you return to the domain of singularity, and it appears to be destroyed beyond recognition.',
            'You wake up and find yourself sleeping on the ground. Nav and Sel are beside you.',
            '"Everything is destroyed. Seems like the machine was destroyed by the explosions too.", Nav says.',
            '"What do we do now?" Sel asks.',
            '"I guess we just get stronger.", You reply.'
        ]
    },
    evoCutscenes(pet) {
        if (player.c.cutsceneIndex == 0) player.c.cutsceneIndex = 0
            player.tab = "c"
            player.c.evoCutscene = true
            switch (pet) {
                case 0:
                    player.c.cutsceneText = [
                        "Unsmith.",
                        "Such an interesting specimen...",
                        "Dumb, but happy.",
                        "It looks like it lacks power,",
                        "But it's full of life.",
                        "I will grant you with the evolution.",
                    ]
                    break;
                case 1:
                    player.c.cutsceneText = [
                        "Selachimorpha. The scientific name for shark.",
                        "These apex predators dominated the seas for millions of years.",
                        "But we could do better.",
                        "Sharks are only the base form for something greater...",
                        "It could be EVOLVED.",
                    ]
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
            onHold() { clickClickable(this.layer, this.id) },
        },
        12: {
            title() { return "<img src='resources/backarrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return player.c.cutsceneIndex > 0},
            unlocked() { return true },
            onClick() {
                player.c.cutsceneIndex = player.c.cutsceneIndex - 1
            },
            onHold() { clickClickable(this.layer, this.id) },
        },
    },
    tabFormat: [
        ["blank", "125px"],
        ["raw-html", () => { return !player.c.evoCutscene ? player.c.cutsceneText[player.c.cutsceneIndex] : ""}, {color: "white", fontSize: "32px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.c.evoCutscene ? player.c.cutsceneText[player.c.cutsceneIndex] : ""}, {color: "white", fontSize: "32px", fontFamily: "Verdana, sans-serif"}],
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



const embersCss = `
.ember-float {
    pointer-events: none;
    will-change: transform, opacity, filter;
    transition: filter 0.2s, opacity 0.2s;
}
`;
if (!document.getElementById("embers-css")) {
    const style = document.createElement("style");
    style.id = "embers-css";
    style.innerHTML = embersCss;
    document.head.appendChild(style);
}
// i wrote basically all of the cutscenes. and if i didnt, ice wrote them and god is he awful at writing. i cleaned up and polished all of the things he wrote. im writing this at 1:27 am, 10/4/24. the game is set to release today, either in the morning or in the afternoon.


//1

/*
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

        //3
        if (player.c.cutscenes[2] && player.in.infinities.gt(0)) {
            player.c.currentCutscene = 3
        } else if (player.tab != "c" && player.in.infinities.gt(0)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 3) {
            player.tab = "c"
            layers.c.startCutscene3();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 3) {
            player.c.cutscenes[2] = false
            player.tab = "in"
            player.c.cutscenes[2] = false
        }

        //4
        if (player.c.cutscenes[3] && player.ta.negativeInfinityPoints.gt(0)) {
            player.c.currentCutscene = 4
        } else if (player.tab != "c" && player.ta.negativeInfinityPoints.gt(0)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 4) {
            player.tab = "c"
            layers.c.startCutscene4();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 4) {
            player.c.cutscenes[3] = false
            player.tab = "i"
            player.c.cutscenes[3] = false
        }

        //5
        if (player.c.cutscenes[4] && player.ta.negativeInfinityPoints.gt(1000)) {
            player.c.currentCutscene = 5
        } else if (player.tab != "c" && player.ta.negativeInfinityPoints.gt(1000)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 5) {
            player.tab = "c"
            layers.c.startCutscene5();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 5) {
            player.c.cutscenes[4] = false
            player.tab = "i"
            player.c.cutscenes[4] = false
        }

        //6
        if (player.c.cutscenes[5] && inChallenge("tad", 11)) {
            player.c.currentCutscene = 6
        } else if (inChallenge("tad", 11) && player.tab != "c") {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 6) {
            player.tab = "c"
            layers.c.startCutscene6();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 6) {
            player.c.cutscenes[5] = false
            player.tab = "i"
            player.c.cutscenes[5] = false
        }


        //7
        if (player.c.cutscenes[6] && player.in.unlockedBreak) {
            player.c.currentCutscene = 7
        } else if (player.tab != "c" && player.in.unlockedBreak) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 7) {
            player.tab = "c"
            layers.c.startCutscene7();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 7) {
            player.c.cutscenes[6] = false
            player.tab = "po"
            player.c.cutscenes[6] = false
        }

        //8
        if (player.c.cutscenes[7] && hasUpgrade("bi", 24)) {
            player.c.currentCutscene = 8
        } else if (player.tab != "c" && hasUpgrade("bi", 24)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 8) {
            player.tab = "c"
            layers.c.startCutscene8();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 8) {
            player.c.cutscenes[7] = false
            player.tab = "in"
            player.c.cutscenes[7] = false
        }

        //9
        if (player.c.cutscenes[8] && player.ca.galaxyDust.gt(0)) {
            player.c.currentCutscene = 9
        } else if (player.tab != "c" && player.ca.galaxyDust.gt(0)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 9) {
            player.tab = "c"
            layers.c.startCutscene9();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 9) {
            player.c.cutscenes[8] = false
            player.tab = "in"
            player.c.cutscenes[8] = false
        }

        //10
        if (player.c.cutscenes[9] && hasUpgrade("bi", 28)) {
            player.c.currentCutscene = 10
        } else if (player.tab != "c" && hasUpgrade("bi", 28)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 10) {
            player.tab = "c"
            layers.c.startCutscene10();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 10) {
            player.c.cutscenes[9] = false
            player.tab = "cap"
            player.subtabs["cap"]['stuff'] = 'Main'
            player.c.cutscenes[9] = false
        }

        //11
        if (player.c.cutscenes[10] && (player.tab == "cp" || (player.tab == "c" && player.cap.cantepocalypseUnlock))) {
            player.c.currentCutscene = 11
        } else if (player.tab != "c" && player.tab == "cp" || (player.tab == "c" && player.cap.cantepocalypseUnlock)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 11) {
            player.tab = "c"
            layers.c.startCutscene11();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 11) {
            player.c.cutscenes[10] = false
            player.tab = "cp"
            player.c.cutscenes[10] = false
        }

        //12
        if (player.c.cutscenes[11] && hasUpgrade("cp", 18)) {
            player.c.currentCutscene = 12
        } else if (player.tab != "c" && hasUpgrade("cp", 18)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 12) {
            player.tab = "c"
            layers.c.startCutscene12();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 12) {
            player.c.cutscenes[11] = false
            player.tab = "cp"
            player.c.cutscenes[11] = false
        }

        //13
        if (player.c.cutscenes[12] && player.ca.defeatedCante) {
            player.c.currentCutscene = 13
        } else if (player.tab != "c" && player.ca.defeatedCante) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 13) {
            player.tab = "c"
            layers.c.startCutscene13();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 13) {
            player.c.cutscenes[12] = false
            player.tab = "po"
            player.c.cutscenes[12] = false
        }

        //14
        if (player.c.cutscenes[13] && player.s.highestSingularityPoints.gt(0)) {
            player.c.currentCutscene = 14
        } else if (player.tab != "c" && player.s.highestSingularityPoints.gt(0)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 14) {
            player.tab = "c"
            layers.c.startCutscene14();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 14) {
            player.c.cutscenes[13] = false
            player.tab = "i"
            player.c.cutscenes[13] = false
        }
        //15
        if (player.c.cutscenes[14] && player.tab == "co" && player.subtabs["co"]['Cores'] == "Main") {
            player.c.currentCutscene = 15
        } else if (player.tab != "c" && player.s.highestSingularityPoints.gt(0)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 15) {
            player.tab = "c"
            layers.c.startCutscene15();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 15) {
            player.c.cutscenes[14] = false
            player.tab = "i"
            player.c.cutscenes[14] = false
        } 

        //16
        if (player.c.cutscenes[15] && hasMilestone("s", 12)) {
            player.c.currentCutscene = 16
        } else if (player.tab != "c" && hasMilestone("s", 12)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 16) {
            player.tab = "c"
            layers.c.startCutscene16();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 16) {
            player.c.cutscenes[15] = false
            player.tab = "i"
            player.c.cutscenes[15] = false
        } 

        //17
        if (player.c.cutscenes[16] && hasMilestone("s", 13)) {
            player.c.currentCutscene = 17
        } else if (player.tab != "c" && hasMilestone("s", 13)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 17) {
            player.tab = "c"
            layers.c.startCutscene17();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 17) {
            player.c.cutscenes[16] = false
            player.tab = "ra"
            player.c.cutscenes[16] = false
        } 

        //18
        if (player.c.cutscenes[17] && hasMilestone("s", 14)) {
            player.c.currentCutscene = 18
        } else if (player.tab != "c" && hasMilestone("s", 14)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 18) {
            player.tab = "c"
            layers.c.startCutscene18();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 18) {
            player.c.cutscenes[17] = false
            player.tab = "sd"
            player.c.cutscenes[17] = false
        } 

        //19
        if (player.c.cutscenes[18] && hasUpgrade("cp", 19)) {
            player.c.currentCutscene = 19
        } else if (player.tab != "c" && hasUpgrade("cp", 19)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 19) {
            player.tab = "c"
            layers.c.startCutscene19();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 19) {
            player.c.cutscenes[18] = false
            player.tab = "fu"
            player.c.cutscenes[18] = false
        } 

        //20
        if (player.c.cutscenes[19] && player.fu.jocusCelestialActivate) {
            player.c.currentCutscene = 20
        } else if (player.tab != "c" && player.fu.jocusCelestialActivate) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 20) {
            player.tab = "c"
            layers.c.startCutscene20();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 20) {
            player.c.cutscenes[19] = false
            player.tab = "fu"
            player.c.cutscenes[19] = false
        } 

        //21
        if (player.c.cutscenes[20] && hasUpgrade("fu", 15)) {
            player.c.currentCutscene = 21
        } else if (player.tab != "c" && hasUpgrade("fu", 15)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 21) {
            player.tab = "c"
            layers.c.startCutscene21();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 21) {
            player.c.cutscenes[20] = false
            player.tab = "fu"
            player.c.cutscenes[20] = false
        }

        //22
        if (player.c.cutscenes[21] && hasUpgrade("fu", 17)) {
            player.c.currentCutscene = 22
        } else if (player.tab != "c" && hasUpgrade("fu", 17)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 22) {
            player.tab = "c"
            layers.c.startCutscene22();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 22) {
            player.c.cutscenes[21] = false
            player.tab = "fu"
            player.c.cutscenes[21] = false
        }

        //23
        if (player.c.cutscenes[22] && hasChallenge("fu", 11)) {
            player.c.currentCutscene = 23
        } else if (player.tab != "c" && hasChallenge("fu", 11)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 23) {
            player.tab = "c"
            layers.c.startCutscene23();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 23) {
            player.c.cutscenes[22] = false
            player.tab = "ch" 
            player.universe = -0.5
            player.c.cutscenes[22] = false
        }

        //24
        if (player.c.cutscenes[23] && hasUpgrade("s", 19)) {
            player.c.currentCutscene = 24
        } else if (player.tab != "c" && hasUpgrade("s", 19)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 24) {
            player.tab = "c"
            layers.c.startCutscene24();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 24) {
            player.c.cutscenes[23] = false
            player.tab = "s" 
            player.c.cutscenes[23] = false
        }

        //25
        if (player.c.cutscenes[24] && hasUpgrade("s", 21)) {
            player.c.currentCutscene = 25
        } else if (player.tab != "c" && hasUpgrade("s", 21)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 25) {
            player.tab = "c"
            layers.c.startCutscene25();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 25) {
            player.c.cutscenes[24] = false
            player.tab = "s" 
            player.c.cutscenes[24] = false
        }

        //26
        if (player.c.cutscenes[25] && player.sma.starmetalAlloy.gte(1)) {
            player.c.currentCutscene = 26
        } else if (player.tab != "c" && player.sma.starmetalAlloy.gte(1)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 26) {
            player.tab = "c"
            layers.c.startCutscene26();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 26) {
            player.c.cutscenes[25] = false
            player.tab = "s" 
            player.c.cutscenes[25] = false
        }

        //27
        if (player.c.cutscenes[26] && tmp.pu.levelables[302].canClick) {
            player.c.currentCutscene = 27
        } else if (player.tab != "c" && tmp.pu.levelables[302].canClick) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 27) {
            player.tab = "c"
            layers.c.startCutscene27();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 27) {
            player.c.cutscenes[26] = false
            player.tab = "le" 
            player.c.cutscenes[26] = false
        }

        //28
        if (player.c.cutscenes[27] && player.ma.matosUnlock) {
            player.c.currentCutscene = 28
        } else if (player.tab != "c" && player.ma.matosUnlock) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 28) {
            player.tab = "c"
            layers.c.startCutscene28();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 28) {
            player.c.cutscenes[27] = false
            player.tab = "ma" 
            player.subtabs["ma"]['stuff'] = 'Stats'
            player.c.cutscenes[27] = false
        }

        //29
        if (player.c.cutscenes[28] && player.ma.secondAreaUnlock) {
            player.c.currentCutscene = 29
        } else if (player.tab != "c" && player.ma.secondAreaUnlock) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 29) {
            player.tab = "c"
            layers.c.startCutscene29();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 29) {
            player.c.cutscenes[28] = false
            player.tab = "ma" 
            player.subtabs["ma"]['stuff'] = 'Fight'
            player.c.cutscenes[28] = false
        }

        //30
        if (player.c.cutscenes[29] && player.au2.au2Unlocked) {
            player.c.currentCutscene = 30
        } else if (player.tab != "c" && player.au2.au2Unlocked) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 30) {
            player.tab = "c"
            layers.c.startCutscene30();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 30) {
            player.c.cutscenes[29] = false
            player.tab = "st"
            player.subtabs["st"]['stuff'] = 'Pets'
            player.c.cutscenes[29] = false
        }

        //31
        if (player.c.cutscenes[30] && player.st.buyables[202].gte(1)) {
            player.c.currentCutscene = 31
        } else if (player.tab != "c" && player.st.buyables[202].gte(1)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 31) {
            player.tab = "c"
            layers.c.startCutscene31();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 31) {
            player.c.cutscenes[30] = false
            player.tab = "pl"
            player.subtabs["pl"]['stuff'] = 'Main'
            player.c.cutscenes[30] = false
        }

        //32
        if (player.c.cutscenes[31] && player.au2.stars.gte(10000)) {
            player.c.currentCutscene = 32
        } else if (player.tab != "c" && player.au2.stars.gte(10000)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 32) {
            player.tab = "c"
            layers.c.startCutscene32();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 32) {
            player.c.cutscenes[31] = false
            player.tab = "pl"
            player.subtabs["pl"]['stuff'] = 'Main'
            player.c.cutscenes[31] = false
        }

        //33
        if (player.c.cutscenes[32] && hasUpgrade("ma", 27)) {
            player.c.currentCutscene = 33
        } else if (player.tab != "c" && hasUpgrade("ma", 27)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 33) {
            player.tab = "c"
            layers.c.startCutscene33();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 33) {
            player.c.cutscenes[32] = false
            player.tab = "ma"
            player.subtabs["ma"]['stuff'] = 'Stats'
            player.c.cutscenes[32] = false
        }

        //34
        if (player.c.cutscenes[33] && player.ma.matosFightActive) {
            player.c.currentCutscene = 34
        } else if (player.tab != "c" && player.ma.matosFightActive) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 34) {
            player.tab = "c"
            layers.c.startCutscene34();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 34) {
            player.c.cutscenes[33] = false
            player.tab = "ma"
            player.subtabs["ma"]['stuff'] = 'Fight'
            player.c.cutscenes[33] = false
        }

        //35
        if (player.c.cutscenes[34] && player.ma.matosDefeated) {
            player.c.currentCutscene = 35
        } else if (player.tab != "c" && player.ma.matosDefeated) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == 35) {
            player.tab = "c"
            layers.c.startCutscene35();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 35) {
            player.c.cutscenes[34] = false
            player.tab = "ma"
            player.subtabs["ma"]['stuff'] = "Win"
            player.ma.currentDepth = new Decimal(0)
            player.c.cutscenes[34] = false
        }

        //d
        if (player.c.cutsceneDice && player.po.dice) {
            player.c.currentCutscene = -1
        } else if (player.tab != "c" && player.po.dice) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == -1) {
            player.tab = "c"
            layers.c.startCutsceneDice();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == -1) {
            player.c.cutsceneDice = false
            player.tab = "i"
        }


        //rf
        if (player.c.cutsceneRocketFuel && player.po.rocketFuel) {
            player.c.currentCutscene = -2
        } else if (player.tab != "c" && player.po.rocketFuel) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == -2) {
            player.tab = "c"
            layers.c.startCutsceneRocketFuel();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == -2) {
            player.c.cutsceneRocketFuel = false
            player.tab = "i"
        }


        //h
        if (player.c.cutsceneHex && player.hpr.rank[0].gte(1)) {
            player.c.currentCutscene = -3
        } else if (player.tab != "c" && player.hpr.rank[0].gte(1) && hasChallenge("ip", 13)) {
            player.c.currentCutscene = 0
        }
        if (player.c.currentCutscene == -3) {
            player.tab = "c"
            layers.c.startCutsceneHex();
        }
        if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == -3) {
            player.c.cutsceneHex = false
            player.tab = "i"
        }

//8
if (player.c.cutscenes[7] && hasUpgrade("bi", 24))
{
player.c.currentCutscene = 8
} else if (player.tab != "c" && hasUpgrade("bi", 24))
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
} else if (player.tab != "c" && player.ca.galaxyDust.gt(0))
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
} else if (player.tab != "c" && hasUpgrade("bi", 28))
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
} else if (player.tab != "c" && player.tab == "cp" || (player.tab == "c" && player.cap.cantepocalypseUnlock))
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
} else if (player.tab != "c" && hasUpgrade("cp", 18))
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
} else if (player.tab != "c" && player.ca.defeatedCante)
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
} else if (player.tab != "c" && player.s.highestSingularityPoints.gt(0))
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
} else if (player.tab != "c" && player.cop.processingCore)
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
} else if (player.tab != "c" && hasMilestone("s", 12))
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
} else if (player.tab != "c" && hasMilestone("s", 13))
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
} else if (player.tab != "c" && hasMilestone("s", 14))
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
} else if (player.tab != "c" && hasUpgrade("cp", 19))
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
} else if (player.tab != "c" && player.fu.jocusCelestialActivate)
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
} else if (player.tab != "c" && hasUpgrade("fu", 15))
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
} else if (player.tab != "c" && hasUpgrade("fu", 17))
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
} else if (player.tab != "c" && hasChallenge("fu", 11))
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
if (!options.newMenu) player.tab = "ch" 
if (options.newMenu) player.tab = "cmh" 
player.universe = -0.5
player.c.cutscenes[22] = false
}

//24
if (player.c.cutscenes[23] && hasUpgrade("s", 18))
{
player.c.currentCutscene = 24
} else if (player.tab != "c" && hasUpgrade("s", 18))
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

//25
if (player.c.cutscenes[24] && hasUpgrade("s", 21))
{
player.c.currentCutscene = 25
} else if (player.tab != "c" && hasUpgrade("s", 21))
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 25)
{
player.tab = "c"
layers.c.startCutscene25();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 25)
{
player.c.cutscenes[24] = false
player.tab = "s" 
player.c.cutscenes[24] = false
}

//26
if (player.c.cutscenes[25] && player.sma.starmetalAlloy.gte(1))
{
player.c.currentCutscene = 26
} else if (player.tab != "c" && player.sma.starmetalAlloy.gte(1))
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 26)
{
player.tab = "c"
layers.c.startCutscene26();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 26)
{
player.c.cutscenes[25] = false
player.tab = "s" 
player.c.cutscenes[25] = false
}

//27
if (player.c.cutscenes[26] && player.le.punchcardsUnlocked[15])
{
player.c.currentCutscene = 27
} else if (player.tab != "c" && player.le.punchcardsUnlocked[15])
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 27)
{
player.tab = "c"
layers.c.startCutscene27();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 27)
{
player.c.cutscenes[26] = false
player.tab = "du" 
player.c.cutscenes[26] = false
}

//28
if (player.c.cutscenes[27] && player.ma.matosUnlock)
{
player.c.currentCutscene = 28
} else if (player.tab != "c" && player.ma.matosUnlock)
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 28)
{
player.tab = "c"
layers.c.startCutscene28();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 28)
{
player.c.cutscenes[27] = false
player.tab = "ma" 
player.subtabs["ma"]['stuff'] = 'Stats'
player.c.cutscenes[27] = false
}

//29
if (player.c.cutscenes[28] && player.ma.secondAreaUnlock)
{
    player.c.currentCutscene = 29
} else if (player.tab != "c" && player.ma.secondAreaUnlock)
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 29)
{
player.tab = "c"
layers.c.startCutscene29();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 29)
{
player.c.cutscenes[28] = false
player.tab = "ma" 
player.subtabs["ma"]['stuff'] = 'Fight'
player.c.cutscenes[28] = false
}

//30
if (player.c.cutscenes[29] && player.au2.au2Unlocked)
{
    player.c.currentCutscene = 30
} else if (player.tab != "c" && player.au2.au2Unlocked)
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 30)
{
player.tab = "c"
layers.c.startCutscene30();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 30)
{
player.c.cutscenes[29] = false
player.tab = "st"
player.subtabs["st"]['stuff'] = 'Pets'
player.c.cutscenes[29] = false
}

//31
if (player.c.cutscenes[30] && player.st.buyables[202].gte(1))
{
    player.c.currentCutscene = 31
} else if (player.tab != "c" && player.st.buyables[202].gte(1))
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 31)
{
player.tab = "c"
layers.c.startCutscene31();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 31)
{
player.c.cutscenes[30] = false
player.tab = "pl"
player.subtabs["pl"]['stuff'] = 'Main'
player.c.cutscenes[30] = false
}

//32
if (player.c.cutscenes[31] && player.au2.stars.gte(10000))
{
    player.c.currentCutscene = 32
} else if (player.tab != "c" && player.au2.stars.gte(10000))
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 32)
{
player.tab = "c"
layers.c.startCutscene32();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 32)
{
player.c.cutscenes[31] = false
player.tab = "pl"
player.subtabs["pl"]['stuff'] = 'Main'
player.c.cutscenes[31] = false
}

//33
if (player.c.cutscenes[32] && hasUpgrade("ma", 27))
{
    player.c.currentCutscene = 33
} else if (player.tab != "c" && hasUpgrade("ma", 27))
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 33)
{
player.tab = "c"
layers.c.startCutscene33();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 33)
{
player.c.cutscenes[32] = false
player.tab = "ma"
player.subtabs["ma"]['stuff'] = 'Main'
player.c.cutscenes[32] = false
}

//34
if (player.c.cutscenes[33] && player.ma.matosFightActive)
{
    player.c.currentCutscene = 34
} else if (player.tab != "c" && player.ma.matosFightActive)
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 34)
{
player.tab = "c"
layers.c.startCutscene34();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 34)
{
player.c.cutscenes[33] = false
player.tab = "ma"
player.subtabs["ma"]['stuff'] = 'Fight'
player.c.cutscenes[33] = false
}

//35
if (player.c.cutscenes[34] && player.ma.matosDefeated)
{
    player.c.currentCutscene = 35
} else if (player.tab != "c" && player.ma.matosDefeated)
{
player.c.currentCutscene = 0
}
if (player.c.currentCutscene == 35)
{
player.tab = "c"
layers.c.startCutscene35();
}
if (player.c.cutsceneIndex == player.c.cutsceneText.length && player.c.currentCutscene == 35)
{
player.c.cutscenes[34] = false
player.tab = "ma"
player.subtabs["ma"]['stuff'] = 'Perks'
player.c.cutscenes[34] = false
}

//d
if (player.c.cutsceneDice && player.po.dice)
{
player.c.currentCutscene = -1
} else if (player.tab != "c" && player.po.dice)
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
} else if (player.tab != "c" && player.po.rocketFuel)
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
} else if (player.tab != "c" && player.h.hex.gte(1) && hasChallenge("ip", 13))
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
} */
