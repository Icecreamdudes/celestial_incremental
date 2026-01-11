addLayer("achievements", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ach", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: "side",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    achievements: {
        1: {
            name: "First Reset<br><small>(of many)</small>",
            image: "resources/achievements/1_01.png",
            tooltip: "<h3>First Reset <small>(of many)</small></h3><hr style='margin-bottom:4px'>Obtain your first rank.",
            color: "white",
            complete() {return hasUpgrade("p", 17)},
            unlocked: true,
        },
        2: {
            name: "Small Beginnings",
            image: "resources/achievements/1_02.png",
            tooltip: "<h3>Small Beginnings</h3><hr style='margin-bottom:4px'>Obtain your first tier.<br><br>Reward: Ranks are 20% cheaper.",
            color: "white",
            complete() {return hasUpgrade("p", 18)},
            unlocked: true,
            marked: true,
        },
        3: {
            name: "Seperate Doubling",
            image: "resources/achievements/1_03.png",
            tooltip: "<h3>Seperate Doubling</h3><hr style='margin-bottom:4px'>Reach x2 points from factors.",
            color: "white",
            complete() {return hasUpgrade("p", 15) || hasUpgrade("cs", 201)},
            unlocked: true,
        },
        4: {
            name: "Tetr, Hold the Mino",
            image: "resources/achievements/1_04.png",
            tooltip: "<h3>Tetr, Hold the Mino</h3><hr style='margin-bottom:4px'>Obtain your first tetr.<br><br>Reward: Ranks and Tiers are<br>15% cheaper.",
            color: "white",
            complete() {return hasUpgrade("p", 22) || hasMilestone("s", 19)},
            unlocked: true,
            marked: true,
        },
        5: {
            name: "Prestigious",
            image: "resources/achievements/1_05.png",
            tooltip: "<h3>Prestigious</h3><hr style='margin-bottom:4px'>Do your first prestige reset.<br><br>Reward: Ranks, Tiers, and Tetrs<br>are 10% cheaper.",
            color: "white",
            unlocked: true,
            marked: true,
        },
        6: {
            name: "Octuple Factors",
            image: "resources/achievements/1_06.png",
            tooltip: "<h3>Octuple Factors</h3><hr style='margin-bottom:4px'>Buy a Factor VIII.",
            color: "white",
            complete() {return hasUpgrade("p", 15) || hasUpgrade("cs", 201)},
            unlocked: true,
        },
        7: {
            name: "Factor Powered",
            image: "resources/achievements/1_07.png",
            tooltip: "<h3>Factor Powered</h3><hr style='margin-bottom:4px'>Buy a Power Factor.",
            color: "white",
            complete() {return hasUpgrade("p", 21) || hasUpgrade("cs", 201)},
            unlocked: true,
        },
        8: {
            name: "Leaf Leavings",
            image: "resources/achievements/1_08.png",
            tooltip: "<h3>Leaf Leavings</h3><hr style='margin-bottom:4px'>Buy a Leaf Producer.",
            color: "white",
            complete() {return hasMilestone("r", 12)},
            unlocked: true,
        },
        9: {
            name: "Longer Blades",
            image: "resources/achievements/1_09.png",
            tooltip: "<h3>Longer Blades</h3><hr style='margin-bottom:4px'>Increase your grass value.<br><br>Reward: Grass spawn time<br>reduced by 10%.",
            color: "white",
            complete() {return hasMilestone("r", 13)},
            unlocked: true,
            marked: true,
        },
        10: {
            name: "Pent Up",
            image: "resources/achievements/1_10.png",
            tooltip: "<h3>Pent Up</h3><hr style='margin-bottom:4px'>Obtain your first pent.",
            color: "white",
            complete() {return hasUpgrade("i", 32) || inChallenge("ip", 14)},
            unlocked: true,
        },
        11: {
            name: "Natural Dormancy",
            image: "resources/achievements/1_11.png",
            tooltip: "<h3>Natural Dormancy</h3><hr style='margin-bottom:4px'>Unlock golden grass.<br><br>Reward: Increase grass value by 25%.",
            color: "white",
            complete() {return hasMilestone('r', 15) || hasMilestone("ip", 11)},
            unlocked: true,
            marked: true,
        },
        12: {
            name: "Golden Scam",
            image: "resources/achievements/1_12.png",
            tooltip: "<h3>Golden Scam</h3><hr style='margin-bottom:4px'>Increase your golden grass value.<br><br>Reward: Golden grass spawn time<br>reduced by 10%.",
            color: "white",
            complete() {return hasMilestone('r', 13)},
            unlocked: true,
            marked: true,
        },
        13: {
            name: "Bugged Buffs",
            image: "resources/achievements/1_13.png",
            tooltip: "<h3>Bugged Buffs</h3><hr style='margin-bottom:4px'>Do your first grasshop reset.",
            color: "white",
            unlocked: true,
        },
        14: {
            name: "Unranked",
            image: "resources/achievements/1_14.png",
            tooltip: "<h3>Unranked</h3><hr style='margin-bottom:4px'>Prestige without having any<br>ranks/tiers/tetrs.<br><br>Reward: Increase grass value<br>by 50%.",
            color: "white",
            complete() {return hasMilestone('r', 15) || hasMilestone("ip", 11)},
            unlocked: true,
            marked: true,
        },
        15: {
            name: "Small Returns",
            image: "resources/achievements/1_15.png",
            tooltip: "<h3>Small Returns</h3><hr style='margin-bottom:4px'>Buy a grass factor.<br><br>Reward: Increase fertilizer<br>gain by 50%.",
            color: "white",
            complete() {return hasMilestone("r", 16) || hasUpgrade("cs", 201)},
            unlocked: true,
            marked: true,
        },
        16: {
            name: "Shockingly Powerful",
            image: "resources/achievements/1_16.png",
            tooltip: "<h3>Shockingly Powerful</h3><hr style='margin-bottom:4px'>Buy a Factor Study I.",
            color: "white",
            complete() {return hasMilestone("ip", 17) || getBuyableAmount("gh", 16).gte(20)},
            unlocked: true,
        },
        17: {
            name: "Hello World",
            image: "resources/achievements/1_17.png",
            tooltip: "<h3>Hello World</h3><hr style='margin-bottom:4px'>Do your first<br>code experience reset.<br><br>Reward: Decrease pent<br>requirement by /8.",
            color: "white",
            unlocked: true,
            marked: true,
        },
        18: {
            name: "Timed Gains",
            image: "resources/achievements/1_18.png",
            tooltip: "<h3>Timed Gains</h3><hr style='margin-bottom:4px'>Unlock Check Back.",
            color: "white",
            complete() {return hasMilestone("ip", 19) || hasMilestone("s", 17)},
            unlocked: true,
        },
        19: {
            name: "Lucky Gains",
            image: "resources/achievements/1_19.png",
            tooltip: "<h3>Lucky Gains</h3><hr style='margin-bottom:4px'>Enable dice OTF.",
            color: "white",
            unlocked: true,
        },
        20: {
            name: "Multiplied Chances",
            image: "resources/achievements/1_20.png",
            tooltip: "<h3>Multiplied Chances</h3><hr style='margin-bottom:4px'>Gain a second die.<br><br>Reward: Increase dice point<br>gain by 25%.",
            color: "white",
            complete() {return hasUpgrade("d", 11) || hasUpgrade("tad", 13)},
            unlocked: true,
            marked: true,
        },
        21: {
            name: "New Friends",
            image: "resources/achievements/1_21.png",
            tooltip: "<h3>New Friends</h3><hr style='margin-bottom:4px'>Gain your first pet.",
            color: "white",
            unlocked: true,
        },
        22: {
            name: "All In",
            image: "resources/achievements/1_22.png",
            tooltip: "<h3>All In</h3><hr style='margin-bottom:4px'>Do a booster dice roll<br>while having all t1 boost<br>effects be greater then 1.<br><br>Reward: Unlock a toggle for<br>faster booster rolls.",
            color: "white",
            unlocked: true,
            marked: true,
        },
        23: {
            name: "Swarmed",
            image: "resources/achievements/1_23.png",
            tooltip: "<h3>Swarmed</h3><hr style='margin-bottom:4px'>Reset for over<br>1e25 grasshoppers<br><br>Reward: Double<br>grasshopper gain.",
            color: "white",
            unlocked: true,
            marked: true,
        },
        24: {
            name: "Pent-Uncapped",
            image: "resources/achievements/1_24.png",
            tooltip: "<h3>Pent-Uncapped</h3><hr style='margin-bottom:4px'>Gain a 31st pent.",
            color: "white",
            complete() {return hasUpgrade("i", 32) || inChallenge("ip", 14)},
            unlocked: true,
        },

        101: {
            name: "To Infinity",
            image: "resources/achievements/2_01.png",
            tooltip: "<h3>To Infinity</h3><hr style='margin-bottom:4px'>Reach infinity.",
            color: "#ffbf00",
            unlocked: true,
        },
        102: {
            name: "New Dimensions",
            image: "resources/achievements/2_00.png",
            tooltip: "<h3>New Dimensions</h3><hr style='margin-bottom:4px'>Do your first dimension<br>boost.",
            color: "#ffbf00",
            unlocked: true,
        },
        103: {
            name: "Fueled Gains",
            image: "resources/achievements/2_03.png",
            tooltip: "<h3>Fueled Gains</h3><hr style='margin-bottom:4px'>Do your first rocket<br>fuel reset.",
            color: "#ffbf00",
            unlocked: true,
        },
        104: {
            name: "Paid Friends",
            image: "resources/achievements/2_04.png",
            tooltip: "<h3>Paid Friends</h3><hr style='margin-bottom:4px'>Buy a pet from the<br>pet shop.<br><br>Reward: +5% crate roll<br>chance.<br><small>(Chance to roll more times)</small>",
            color: "#ffbf00",
            unlocked: true,
            marked: true,
        },
        105: {
            name: "Kept Time",
            image: "resources/achievements/2_00.png",
            tooltip: "<h3>Kept Time</h3><hr style='margin-bottom:4px'>Reach the third<br>infinity milestone.",
            color: "#ffbf00",
            unlocked: true,
        },
        106: {
            name: "Galactic Gains",
            image: "resources/achievements/2_00.png",
            tooltip: "<h3>Galactic Gains</h3><hr style='margin-bottom:4px'>Buy an antimatter galaxy.",
            color: "#ffbf00",
            unlocked: true,
        },
        107: {
            name: "Unnecessary Feature",
            image: "resources/achievements/2_07.png",
            tooltip: "<h3>Unnecessary Feature</h3><hr style='margin-bottom:4px'>Beat infinity challenge 1.<br><br>Reward: x1.1 Infinities.",
            color: "#ffbf00",
            complete() {return hasChallenge("ip", 11)},
            unlocked: true,
            marked: true,
        },
        108: {
            name: "Pest Lover",
            image: "resources/achievements/2_08.png",
            tooltip: "<h3>Pest Lover</h3><hr style='margin-bottom:4px'>Obtain 250,000 pests.<br><br>Reward: Grasshops remove<br>twice as many pests.",
            color: "#ffbf00",
            unlocked: true,
            marked: true,
        },
        109: {
            name: "Pest Exterminator",
            image: "resources/achievements/2_09.png",
            tooltip: "<h3>Pest Exterminator</h3><hr style='margin-bottom:4px'>Beat infinity challenge 2.<br><br>Reward: x1.1 Infinities.",
            color: "#ffbf00",
            complete() {return hasChallenge("ip", 12)},
            unlocked: true,
            marked: true,
        },
        110: {
            name: "Rough Resets",
            image: "resources/achievements/2_00.png",
            tooltip: "<h3>Rough Resets</h3><hr style='margin-bottom:4px'>Reset for over<br>6 β-Provenance.<br><br>Reward: β-Provenances<br>are 10% cheaper.",
            color: "#ffbf00",
            complete() {return hasMilestone("hre", 6)},
            unlocked: true,
            marked: true,
        },
        111: {
            name: "Hexing Challenge",
            image: "resources/achievements/2_00.png",
            tooltip: "<h3>Hexing Challenge</h3><hr style='margin-bottom:4px'>Beat infinity challenge 3.<br><br>Reward: x1.1 Infinities.",
            color: "#ffbf00",
            complete() {return hasChallenge("ip", 13)},
            unlocked: true,
            marked: true,
        },
        112: {
            name: "Wrong Goal!",
            image: "resources/achievements/2_12.png",
            tooltip: "<h3>Wrong Goal!</h3><hr style='margin-bottom:4px'>Reach infinity in<br>infinity challenge 4.<br><br>Reward: Decrease pent<br>requirement by /10",
            color: "#ffbf00",
            unlocked: true,
            marked: true,
        },
        113: {
            name: "Pent Down",
            image: "resources/achievements/2_13.png",
            tooltip: "<h3>Pent Down</h3><hr style='margin-bottom:4px'>Beat infinity challenge 4.<br><br>Reward: x1.1 Infinities.",
            color: "#ffbf00",
            complete() {return hasChallenge("ip", 14)},
            unlocked: true,
            marked: true,
        },
        114: {
            name: "Doublin'",
            image: "resources/achievements/2_14.png",
            tooltip: "<h3>Doublin'</h3><hr style='margin-bottom:4px'>Buy an IP Doubler.",
            color: "#ffbf00",
            unlocked: true,
        },
        115: {
            name: "Not Very Boosty",
            image: "resources/achievements/2_15.png",
            tooltip: "<h3>Not Very Boosty</h3><hr style='margin-bottom:4px'>Buy a \"Challenge Dice<br>Boosty!!! :D\".<br><br>Reward: Double Dice Points.",
            color: "#ffbf00",
            unlocked: true,
            marked: true,
        },
        116: {
            name: "Dicey Challenge",
            image: "resources/achievements/2_16.png",
            tooltip: "<h3>Dicey Challenge</h3><hr style='margin-bottom:4px'>Beat infinity challenge 5.<br><br>Reward: x1.1 Infinities.",
            color: "#ffbf00",
            complete() {return hasChallenge("ip", 15)},
            unlocked: true,
            marked: true,
        },
        117: {
            name: "Golden Time",
            image: "resources/achievements/2_17.png",
            tooltip: "<h3>Golden Time</h3><hr style='margin-bottom:4px'>Evolve Unsmith.",
            color: "#ffbf00",
            complete() {return getLevelableAmount("pet", 1103).gt(0)},
            unlocked: true,
        },
        118: {
            name: "Automated Scripts",
            image: "resources/achievements/2_00.png",
            tooltip: "<h3>Automated Scripts</h3><hr style='margin-bottom:4px'>Reach the twelfth<br>infinity milestone.",
            color: "#ffbf00",
            unlocked: true,
        },
        119: {
            name: "Requirement Met?",
            image: "resources/achievements/2_19.png",
            tooltip: "<h3>Requirement Met?</h3><hr style='margin-bottom:4px'>Reset for over<br>1e15 rocket fuel.",
            color: "#ffbf00",
            unlocked: true,
        },
        120: {
            name: "Nightmare Fuel",
            image: "resources/achievements/2_20.png",
            tooltip: "<h3>Nightmare Fuel</h3><hr style='margin-bottom:4px'>Beat infinity challenge 6.<br><br>Reward: x1.1 Infinities.",
            color: "#ffbf00",
            complete() {return hasChallenge("ip", 16)},
            unlocked: true,
            marked: true,
        },
        121: {
            name: "Bless Up",
            image: "resources/achievements/2_00.png",
            tooltip: "<h3>Bless Up</h3><hr style='margin-bottom:4px'>Do your first<br>blessing reset.",
            color: "#ffbf00",
            unlocked: true,
        },
        122: {
            name: "ShardNG",
            image: "resources/achievements/2_22.png",
            tooltip: "<h3>ShardNG</h3><hr style='margin-bottom:4px'>Beat infinity challenge 7.<br><br>Reward: x1.1 Infinities.",
            color: "#ffbf00",
            complete() {return hasChallenge("ip", 17)},
            unlocked: true,
            marked: true,
        },
        123: {
            name: "4x4",
            image: "resources/achievements/2_00.png",
            tooltip: "<h3>4x4</h3><hr style='margin-bottom:4px'>Reach 4 4th dimensions<br>without any dim-boosts<br>in infinity challenge 8.<br><br>Reward: Double Antimatter<br>Dimensions.",
            color: "#ffbf00",
            unlocked: true,
            marked: true,
        },
        124: {
            name: "The 8th Dimension is a lie",
            image: "resources/achievements/2_00.png",
            tooltip: "<h3>The 8th Dimension is a lie</h3><hr style='margin-bottom:4px'>Beat infinity challenge 8.<br><br>Reward: x1.1 Infinities.",
            color: "#ffbf00",
            complete() {return hasChallenge("ip", 18)},
            unlocked: true,
            marked: true,
        },
    },
    tooltip: "Achievements",
    color: "white",
    microtabs: {
        stars: {
            1: {
                unlocked: true,
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 1], ["achievement", 2], ["achievement", 3], ["achievement", 4], ["achievement", 5], ["achievement", 6],
                            ["achievement", 7], ["achievement", 8], ["achievement", 9], ["achievement", 10], ["achievement", 11], ["achievement", 12],
                            ["achievement", 13], ["achievement", 14], ["achievement", 15], ["achievement", 16], ["achievement", 17], ["achievement", 18],
                            ["achievement", 19], ["achievement", 20], ["achievement", 21], ["achievement", 22], ["achievement", 23], ["achievement", 24],
                        ]],
                    ], {width: "621px", height: "409px", background: "#111", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
            2: {
                unlocked() {return hasAchievement("achievements", 101) || player.in.unlockedInfinity},
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 101], ["achievement", 102], ["achievement", 103], ["achievement", 104], ["achievement", 105], ["achievement", 106],
                            ["achievement", 107], ["achievement", 108], ["achievement", 109], ["achievement", 110], ["achievement", 111], ["achievement", 112],
                            ["achievement", 113], ["achievement", 114], ["achievement", 115], ["achievement", 116], ["achievement", 117], ["achievement", 118],
                            ["achievement", 119], ["achievement", 120], ["achievement", 121], ["achievement", 122], ["achievement", 123], ["achievement", 124],
                        ]],
                    ], {width: "621px", height: "409px", background: "#191300", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
            3: {
                unlocked() {return hasAchievement("achievements", 201) || (hasChallenge("ip", 18) || player.s.highestSingularityPoints.gt(0))},
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 201], ["achievement", 202], ["achievement", 203], ["achievement", 204], ["achievement", 205], ["achievement", 206],
                            ["achievement", 207], ["achievement", 208], ["achievement", 209], ["achievement", 210], ["achievement", 211], ["achievement", 212],
                            ["achievement", 213], ["achievement", 214], ["achievement", 215], ["achievement", 216], ["achievement", 217], ["achievement", 218],
                            ["achievement", 219], ["achievement", 220], ["achievement", 221], ["achievement", 222], ["achievement", 223], ["achievement", 224],
                        ]],
                    ], {width: "621px", height: "409px", background: "#232b2b", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
            4: {
                unlocked() {return hasAchievement("achievements", 301) || player.in.unlockedBreak},
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 301], ["achievement", 302], ["achievement", 303], ["achievement", 304], ["achievement", 305], ["achievement", 306],
                            ["achievement", 307], ["achievement", 308], ["achievement", 309], ["achievement", 310], ["achievement", 311], ["achievement", 312],
                            ["achievement", 313], ["achievement", 314], ["achievement", 315], ["achievement", 316], ["achievement", 317], ["achievement", 318],
                            ["achievement", 319], ["achievement", 320], ["achievement", 321], ["achievement", 322], ["achievement", 323], ["achievement", 324],
                        ]],
                    ], {width: "621px", height: "409px", background: "#081902", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
            5: {
                unlocked() {return hasAchievement("achievements", 401) || (hasUpgrade("bi", 24) || player.s.highestSingularityPoints.gt(0))},
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 401], ["achievement", 402], ["achievement", 403], ["achievement", 404], ["achievement", 405], ["achievement", 406],
                            ["achievement", 407], ["achievement", 408], ["achievement", 409], ["achievement", 410], ["achievement", 411], ["achievement", 412],
                            ["achievement", 413], ["achievement", 414], ["achievement", 415], ["achievement", 416], ["achievement", 417], ["achievement", 418],
                            ["achievement", 419], ["achievement", 420], ["achievement", 421], ["achievement", 422], ["achievement", 423], ["achievement", 424],
                        ]],
                    ], {width: "621px", height: "409px", background: "#021a25", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
            6: {
                unlocked() {return hasAchievement("achievements", 501) || player.s.highestSingularityPoints.gt(0)},
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 501], ["achievement", 502], ["achievement", 503], ["achievement", 504], ["achievement", 505], ["achievement", 506],
                            ["achievement", 507], ["achievement", 508], ["achievement", 509], ["achievement", 510], ["achievement", 511], ["achievement", 512],
                            ["achievement", 513], ["achievement", 514], ["achievement", 515], ["achievement", 516], ["achievement", 517], ["achievement", 518],
                            ["achievement", 519], ["achievement", 520], ["achievement", 521], ["achievement", 522], ["achievement", 523], ["achievement", 524],
                        ]],
                    ], {width: "621px", height: "409px", background: "#190606", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
            7: {
                unlocked() {return hasAchievement("achievements", 601) || hasUpgrade("s", 21)},
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 601], ["achievement", 602], ["achievement", 603], ["achievement", 604], ["achievement", 605], ["achievement", 606],
                            ["achievement", 607], ["achievement", 608], ["achievement", 609], ["achievement", 610], ["achievement", 611], ["achievement", 612],
                            ["achievement", 613], ["achievement", 614], ["achievement", 615], ["achievement", 616], ["achievement", 617], ["achievement", 618],
                            ["achievement", 619], ["achievement", 620], ["achievement", 621], ["achievement", 622], ["achievement", 623], ["achievement", 624],
                        ]],
                    ], {width: "621px", height: "409px", background: "#000", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
            8: {
                unlocked() {return hasAchievement("achievements", 701) || tmp.pu.levelables[302].canClick},
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 701], ["achievement", 702], ["achievement", 703], ["achievement", 704], ["achievement", 705], ["achievement", 706],
                            ["achievement", 707], ["achievement", 708], ["achievement", 709], ["achievement", 710], ["achievement", 711], ["achievement", 712],
                            ["achievement", 713], ["achievement", 714], ["achievement", 715], ["achievement", 716], ["achievement", 717], ["achievement", 718],
                            ["achievement", 719], ["achievement", 720], ["achievement", 721], ["achievement", 722], ["achievement", 723], ["achievement", 724],
                        ]],
                    ], {width: "621px", height: "409px", background: "#1b0218", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
            9: {
                unlocked() {return hasAchievement("achievements", 801) || player.ma.matosDefeated},
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 801], ["achievement", 802], ["achievement", 803], ["achievement", 804], ["achievement", 805], ["achievement", 806],
                            ["achievement", 807], ["achievement", 808], ["achievement", 809], ["achievement", 810], ["achievement", 811], ["achievement", 812],
                            ["achievement", 813], ["achievement", 814], ["achievement", 815], ["achievement", 816], ["achievement", 817], ["achievement", 818],
                            ["achievement", 819], ["achievement", 820], ["achievement", 821], ["achievement", 822], ["achievement", 823], ["achievement", 824],
                        ]],
                    ], {width: "621px", height: "409px", background: "#0b011c", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
            10: {
                unlocked() {return hasAchievement("achievements", 801) || player.ir.iriditeDefeated},
                content: [
                    ["top-column", [
                        ["row", [
                            ["achievement", 801], ["achievement", 802], ["achievement", 803], ["achievement", 804], ["achievement", 805], ["achievement", 806],
                            ["achievement", 807], ["achievement", 808], ["achievement", 809], ["achievement", 810], ["achievement", 811], ["achievement", 812],
                            ["achievement", 813], ["achievement", 814], ["achievement", 815], ["achievement", 816], ["achievement", 817], ["achievement", 818],
                            ["achievement", 819], ["achievement", 820], ["achievement", 821], ["achievement", 822], ["achievement", 823], ["achievement", 824],
                        ]],
                    ], {width: "621px", height: "409px", background: "#201500", borderLeft: "3px solid white", padding: "3px"}],
                ],
            },
        },
    },
    tabFormat: [
        ["style-column", [
            ["raw-html", "Achievements", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", backgroundColor: "rgba(0,0,0,0.5)", borderTop: "3px solid white", borderLeft: "3px solid white", borderRight: "3px solid white", borderRadius: "25px 25px 0 0"}],
        ["style-row", [
            ["always-scroll-column", [
                ["style-row", [
                    ["category-button", ["<span style='color:#9bedff'>★</span>★★★★", "stars", 1], {width: "155px", height: "40px", color: "#aaa", background: "#333", borderRight: "3px solid white"}],
                ], {width: "155px", height: "40px", borderBottom: "3px solid white"}],
                ["style-row", [
                    ["category-button", ["<span style='color:#9bedff'>★★</span>★★★", "stars", 2], {width: "155px", height: "40px", color: "#aaa", background: "#332600", borderRight: "3px solid white"}],
                ], () => {return tmp.achievements.microtabs.stars[2].unlocked ? {width: "155px", height: "40px", borderBottom: "3px solid white"} : {display: "none !important"}}],
                /*
                ["style-row", [
                    ["category-button", ["<span style='color:#9bedff'>★★★</span>★★<br><small style='color:#c00'>[NOT IMPLEMENTED]</small>", "stars", 3], {width: "155px", height: "40px", color: "#aaa", background: "#354040", borderRight: "3px solid white"}],
                ], () => {return tmp.achievements.microtabs.stars[3].unlocked ? {width: "155px", height: "40px", borderBottom: "3px solid white"} : {display: "none !important"}}],
                ["style-row", [
                    ["category-button", ["<span style='color:#9bedff'>★★★★</span>★<br><small style='color:#c00'>[NOT IMPLEMENTED]</small>", "stars", 4], {width: "155px", height: "40px", color: "#aaa", background: "#113204", borderRight: "3px solid white"}],
                ], () => {return tmp.achievements.microtabs.stars[4].unlocked ? {width: "155px", height: "40px", borderBottom: "3px solid white"} : {display: "none !important"}}],
                ["style-row", [
                    ["category-button", ["★★★★★<br><small style='color:#c00'>[NOT IMPLEMENTED]</small>", "stars", 5], {width: "155px", height: "40px", color: "#9bedff", background: "#032737", borderRight: "3px solid white"}],
                ], () => {return tmp.achievements.microtabs.stars[5].unlocked ? {width: "155px", height: "40px", borderBottom: "3px solid white"} : {display: "none !important"}}],
                ["style-row", [
                    ["category-button", ["<span style='color:#88e688'>★</span>★★★★<br><small style='color:#c00'>[NOT IMPLEMENTED]</small>", "stars", 6], {width: "155px", height: "40px", color: "#9bedff", background: "#330d0d", borderRight: "3px solid white"}],
                ], () => {return tmp.achievements.microtabs.stars[6].unlocked ? {width: "155px", height: "40px", borderBottom: "3px solid white"} : {display: "none !important"}}],
                ["style-row", [
                    ["category-button", ["<span style='color:#88e688'>★★</span>★★★<br><small style='color:#c00'>[NOT IMPLEMENTED]</small>", "stars", 7], {width: "155px", height: "40px", color: "#9bedff", background: "#111", borderRight: "3px solid white"}],
                ], () => {return tmp.achievements.microtabs.stars[7].unlocked ? {width: "155px", height: "40px", borderBottom: "3px solid white"} : {display: "none !important"}}],
                ["style-row", [
                    ["category-button", ["<span style='color:#88e688'>★★★</span>★★<br><small style='color:#c00'>[NOT IMPLEMENTED]</small>", "stars", 8], {width: "155px", height: "40px", color: "#9bedff", background: "#370530", borderRight: "3px solid white"}],
                ], () => {return tmp.achievements.microtabs.stars[8].unlocked ? {width: "155px", height: "40px", borderBottom: "3px solid white"} : {display: "none !important"}}],
                ["style-row", [
                    ["category-button", ["<span style='color:#88e688'>★★★★</span>★<br><small style='color:#c00'>[NOT IMPLEMENTED]</small>", "stars", 9], {width: "155px", height: "40px", color: "#9bedff", background: "#160239", borderRight: "3px solid white"}],
                ], () => {return tmp.achievements.microtabs.stars[9].unlocked ? {width: "155px", height: "40px", borderBottom: "3px solid white"} : {display: "none !important"}}],
                ["style-row", [
                    ["category-button", ["★★★★★<br><small style='color:#c00'>[NOT IMPLEMENTED]</small>", "stars", 10], {width: "155px", height: "40px", color: "#88e688", background: "#352300", borderRight: "3px solid white"}],
                ], () => {return tmp.achievements.microtabs.stars[10].unlocked ? {width: "155px", height: "40px"} : {display: "none !important"}}],
                */
            ], {width: "170px", height: "415px"}],
            ["style-column", [
                ["buttonless-microtabs", "stars", {borderWidth: "0"}],
            ], {width: "630px", height: "415px"}],
        ], {width: "800px", height: "415px", backgroundColor: "black", border: "3px solid white"}],
        ["style-column", [
            ["raw-html", "Achievements with a green border can be clicked to obtain.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ], {width: "800px", height: "30px", backgroundColor: "rgba(0,0,0,0.5)", borderLeft: "3px solid white", borderRight: "3px solid white", borderBottom: "1px solid white"}],
        ["style-column", [
            ["raw-html", "<span style='color:red'>WARNING:</span> Achievements are currently <span style='color:red'>WIP</span> and are missing pages and icons.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
            ["raw-html", "(They do give rewards though, so maybe look at them a little)", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", backgroundColor: "rgba(0,0,0,0.5)", borderLeft: "3px solid white", borderRight: "3px solid white", borderBottom: "3px solid white", borderRadius: "0 0 25px 25px"}],
        ["blank", "25px"],
    ],
    layerShown() { return false }
})