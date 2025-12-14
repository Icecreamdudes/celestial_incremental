addLayer("ro", {
    name: "Rockets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RO", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        activatedFuel: new Decimal(0), //based on rocket fuel, golden grass, oil and charge 
        activatedFuelContributions: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], //contributions from rocket fuel, golden grass, oil and charge
        activatedFuelEffect: new Decimal(1), //boosts golden grass
        activatedFuelToGet: new Decimal(0),

        rocketParts: new Decimal(0), //based on steel, starmetal alloy, crystals and moonstone
        rocketPartsContributions: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], //contributions from steel, starmetal alloy, crystals and moonstone
        rocketPartsEffect: new Decimal(1), 
        rocketPartsToGet: new Decimal(0),

        //passenger selection

        rarityIndex: new Decimal(0),

        selectedPassengers: new Decimal(0),
        maxSelectedPassengers: new Decimal(4),

        selectedPassengersCommon: [],
        commonXPToGet: [],
        commonTitles: [],
        commonPassengerIndex: new Decimal(0),

        selectedPassengersUncommon: [],
        uncommonXPToGet: [],
        uncommonTitles: [],
        uncommonPassengerIndex: new Decimal(0),

        //display
        petTitle: "",
        petLevel: new Decimal(0),
        spacePetXPToGet: new Decimal(0),
        passengerText: "",

        //cost
        evoCost: new Decimal(0),
        paragonCost: new Decimal(0),

        //launch pad
        rocketImages: [],
        rocketNames: [],
        rocketIndex: new Decimal(0),
        activatedFuelReq: new Decimal(20),
        rocketPartsReq: new Decimal(6),
        evoShardsReq: new Decimal(0),
        paragonShardsReq: new Decimal(0),

        starPause: new Decimal(0),
        
        rocketCooldown: new Decimal(0),
        rocketCooldownMax: [new Decimal(300), new Decimal(1200)],

        //rocket upgrade
        rocketIndex: new Decimal(0),

        rocket2Unlocked: false,
        
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(50deg, #222222 0%, #1d1738 50%, #1e0d61 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#44008b",
            color: "#2672e3",
        };
      },

    tooltip: "Rockets",
    color: "#333c81",
    branches: ["ca", "om"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.ro.activatedFuelContributions[0] = player.rf.rocketFuel.add(1).log(10).pow(0.25)
        player.ro.activatedFuelContributions[1] = player.g.goldGrass.add(1).log(10).div(50)
        player.ro.activatedFuelContributions[2] = player.oi.oil.add(1).log(10).div(100)
        player.ro.activatedFuelContributions[3] = player.fa.charge.add(1).log(10).div(200)

        player.ro.activatedFuelToGet = player.ro.activatedFuelContributions[0].mul(player.ro.activatedFuelContributions[1]).mul(player.ro.activatedFuelContributions[2]).mul(player.ro.activatedFuelContributions[3])
        player.ro.activatedFuelToGet = player.ro.activatedFuelToGet.mul(levelableEffect("pet", 501)[2])
        player.ro.activatedFuelToGet = player.ro.activatedFuelToGet.mul(buyableEffect("cof", 19))
        player.ro.activatedFuelEffect = player.ro.activatedFuel.pow(4).add(1)

        player.ro.activatedFuel = player.ro.activatedFuel.add(player.ro.activatedFuelToGet.mul(buyableEffect("st", 204).mul(delta)))

        player.ro.rocketPartsContributions[0] = player.gh.steel.add(1).log(10).pow(0.2)
        if (player.st.buyables[203].lt(1)) player.ro.rocketPartsContributions[1] = player.sma.starmetalAlloy.div(300).pow(0.5)
        if (player.st.buyables[203].gte(1)) player.ro.rocketPartsContributions[1] = player.sma.starmetalAlloy.div(300).pow(0.5).add(1)
        player.ro.rocketPartsContributions[2] = player.p.crystals.add(1).log(10).div(100)
        if (player.st.buyables[203].lt(1)) player.ro.rocketPartsContributions[3] = player.g.moonstone.pow(0.4).div(100)
        if (player.st.buyables[203].gte(1)) player.ro.rocketPartsContributions[3] = player.g.moonstone.pow(0.4).div(100).add(1)

        player.ro.rocketPartsToGet = player.ro.rocketPartsContributions[0].mul(player.ro.rocketPartsContributions[1]).mul(player.ro.rocketPartsContributions[2]).mul(player.ro.rocketPartsContributions[3]).floor()
        player.ro.rocketPartsToGet = player.ro.rocketPartsToGet.mul(levelableEffect("pet", 501)[1]).floor()
        player.ro.rocketPartsToGet = player.ro.rocketPartsToGet.mul(levelableEffect("pet", 1209)[1]).floor()
        player.ro.rocketPartsToGet = player.ro.rocketPartsToGet.mul(buyableEffect("cof", 19))
        player.ro.rocketPartsEffect = player.ro.rocketParts.mul(2).pow(0.9).add(1)

        player.ro.rocketParts = player.ro.rocketParts.add(player.ro.rocketPartsToGet.mul(buyableEffect("st", 205).mul(delta)))

        //passenger selection
        if (player.ro.rarityIndex.eq(0)) player.ro.petTitle = tmp.pet.levelables[Decimal.add(100, player.ro.commonPassengerIndex.add(1))].title
        if (player.ro.rarityIndex.eq(1)) player.ro.petTitle = tmp.pet.levelables[Decimal.add(200, player.ro.uncommonPassengerIndex.add(1))].title

        if (player.ro.rarityIndex.eq(0)) player.ro.petLevel = player.pet.levelables[Decimal.add(100, player.ro.commonPassengerIndex.add(1))][0]
        if (player.ro.rarityIndex.eq(1)) player.ro.petLevel = player.pet.levelables[Decimal.add(200, player.ro.uncommonPassengerIndex.add(1))][0]

        player.ro.spacePetXPToGet = Decimal.pow(player.ro.petLevel, 1.2).floor()
        if (hasUpgrade("sma", 203)) player.ro.spacePetXPToGet = player.ro.spacePetXPToGet.mul(1.2).floor()

        player.ro.evoCost = Decimal.mul(player.ro.selectedPassengersCommon.length, Decimal.add(7, player.ro.selectedPassengersCommon.length)).add(player.ro.evoShardsReq)
        player.ro.paragonCost = Decimal.mul(player.ro.selectedPassengersUncommon.length, Decimal.add(2, player.ro.selectedPassengersUncommon.length)).add(player.ro.paragonShardsReq)

        for (let i = 0; i < player.ro.selectedPassengersCommon.length; i++) {
            player.ro.commonXPToGet[i] = Decimal.pow(player.pet.levelables[Decimal.add(100, Decimal.add(1, player.ro.selectedPassengersCommon[i]))][0], 1.2).add(1)
        }
        for (let i = 0; i < player.ro.selectedPassengersUncommon.length; i++) {
            player.ro.uncommonXPToGet[i] = Decimal.pow(player.pet.levelables[Decimal.add(200, Decimal.add(1, player.ro.selectedPassengersUncommon[i]))][0], 1.2).add(1)
        }

        player.ro.rocketImages = [
            "<img src='resources/rocket1.png' style='width:calc(270%);height:calc(270%);margin:-130px -130px;padding-top:0%'></img>",
            "<img src='resources/rocket2.png' style='width:calc(160%);height:calc(160%);margin:-50px -130px;padding-top:0%'></img>",
        ]
        player.ro.rocketNames = [
            "Small Rocket<br><h6>Minimum: 20 Fuel, 6 Parts",
            "Medium Rocket<br><h6>Minimum: 100,000 Fuel, 10,000,000 Parts, 3 Evo Shards, 1 Paragon Shard",
        ]
        if (player.ro.rocketIndex.eq(0)) {
            player.ro.rocketPartsReq = new Decimal(6)
            player.ro.activatedFuelReq = new Decimal(20)

            player.ro.evoShardsReq = new Decimal(0)
            player.ro.paragonShardsReq = new Decimal(0)
        }
        if (player.ro.rocketIndex.eq(1)) {
            player.ro.rocketPartsReq = new Decimal(10000000)
            player.ro.activatedFuelReq = new Decimal(100000) //,make it include shards
            
            player.ro.evoShardsReq = new Decimal(3)
            player.ro.paragonShardsReq = new Decimal(1)
        }
    
        player.ro.starPause = player.ro.starPause.sub(1)
        if (player.ro.starPause.gt(0)) {
            layers.ro.starReset();
        }

        player.ro.rocketCooldown = player.ro.rocketCooldown.sub(onepersec.mul(delta))

        player.ro.rocketCooldownMax = [new Decimal(300), new Decimal(1200)]
    },
    starReset() {
        clickClickable("co", 1000)

        player.ro.activatedFuel = new Decimal(0)
        player.ro.rocketParts = new Decimal(0)

        for (let i = 0; i < player.ro.selectedPassengersCommon.length; i++) {
            player.pet.levelables[Decimal.add(100, Decimal.add(1, player.ro.selectedPassengersCommon[i]))][0] = new Decimal(0)
            player.pet.levelables[Decimal.add(100, Decimal.add(1, player.ro.selectedPassengersCommon[i]))][1] = new Decimal(0)
        }

        for (let i = 0; i < player.ro.selectedPassengersUncommon.length; i++) {
            player.pet.levelables[Decimal.add(200, Decimal.add(1, player.ro.selectedPassengersUncommon[i]))][0] = new Decimal(0)
            player.pet.levelables[Decimal.add(200, Decimal.add(1, player.ro.selectedPassengersUncommon[i]))][1] = new Decimal(0)
        }
    },
    clickables: {
        1: {
            title() { return "<h4>Decrease Rocket" },
            canClick() { return player.ro.rocketIndex.gt(0) },
            unlocked() { return player.ro.rocket2Unlocked },
            onClick() {
                player.ro.rocketIndex = player.ro.rocketIndex.sub(1)

                player.ro.rocketCooldown = player.ro.rocketCooldownMax[player.ro.rocketIndex]
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", backgroundColor: "#191e40", border: "3px solid #0a0c19", borderRadius: "15px"}
                if (this.canClick()) {look.backgroundColor = "#191e40";look.color = "white"} else {look.backgroundColor = "#bf8f8f";look.color = "black"}
                return look
            },
        },
        2: {
            title() { return "<h4>Increase Rocket" },
            canClick() { return player.ro.rocketIndex.lt(player.ro.rocketImages.length - 1) },
            unlocked() { return player.ro.rocket2Unlocked },
            onClick() {
                player.ro.rocketIndex = player.ro.rocketIndex.add(1)

                player.ro.rocketCooldown = player.ro.rocketCooldownMax[player.ro.rocketIndex]
            },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", backgroundColor: "#191e40", border: "3px solid #0a0c19", borderRadius: "15px"}
                if (this.canClick()) {look.backgroundColor = "#191e40";look.color = "white"} else {look.backgroundColor = "#bf8f8f";look.color = "black"}
                return look
            },
        },
        11: {
            title() { return "<h2>Make Activated Fuel" },
            canClick() { return player.ro.activatedFuelToGet.gte('1') },
            unlocked: true,
            onClick() {
                clickClickable("co", 1000)

                player.ro.activatedFuel = player.ro.activatedFuel.add(player.ro.activatedFuelToGet)
            },
            style() {
                let look = {width: "300px", minHeight: "120px", color: "white", backgroundColor: "#191e40", border: "3px solid #0a0c19", borderRadius: "15px"}
                if (this.canClick()) {look.backgroundColor = "#191e40";look.color = "white"} else {look.backgroundColor = "#bf8f8f";look.color = "black"}
                return look
            },
        },
        12: {
            title() { return "<h2>Make Rocket Parts" },
            canClick() { return player.ro.rocketPartsToGet.gte('1') },
            unlocked: true,
            onClick() {
                clickClickable("co", 1000)

                player.g.moonstone = new Decimal(0)
                player.sma.starmetalAlloy = new Decimal(0)

                player.ro.rocketParts = player.ro.rocketParts.add(player.ro.rocketPartsToGet)
            },
            style() {
                let look = {width: "300px", minHeight: "120px", color: "white", backgroundColor: "#191e40", border: "3px solid #0a0c19", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#191e40" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        13: {
            title() { return "<h2>Select Passenger" },
            canClick() {
                // Check if the number of selected passengers is less than the maximum allowed
                if (player.ro.selectedPassengers.gte(player.ro.maxSelectedPassengers)) {
                    return false;
                }

                if (player.ro.rarityIndex.eq(0)) {
                    // Check if the common passenger is not already selected
                    return !player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(player.ro.commonPassengerIndex));
                } else if (player.ro.rarityIndex.eq(1)) {
                    // Check if the uncommon passenger is not already selected
                    return !player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(player.ro.uncommonPassengerIndex));
                }
                return false;
            },
            unlocked: true,
            onClick() {
                player.ro.selectedPassengers = player.ro.selectedPassengers.add(1)
                if (player.ro.rarityIndex.eq(0)) player.ro.selectedPassengersCommon.push(player.ro.commonPassengerIndex)
                if (player.ro.rarityIndex.eq(1)) player.ro.selectedPassengersUncommon.push(player.ro.uncommonPassengerIndex)
            },
            style: { border: "3px solid #121212", width: '180px', "min-height": '80px', borderRadius: '15px', backgroundColor: "#242424", borderRight: "0px", color: "white", borderRadius: "15px 0px 0px 15px"},
        },
        14: {
            title() { return "<h2>Deselect Passenger" },
            canClick() {
                if (player.ro.rarityIndex.eq(0)) {
                    // Check if the common passenger is currently selected
                    return player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(player.ro.commonPassengerIndex));
                } else if (player.ro.rarityIndex.eq(1)) {
                    // Check if the uncommon passenger is currently selected
                    return player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(player.ro.uncommonPassengerIndex));
                }
                return false;
            },
            unlocked() { return true },
            onClick() {
                if (player.ro.rarityIndex.eq(0)) {
                    // Remove the selected common passenger
                    for (let i = 0; i < player.ro.selectedPassengersCommon.length; i++) {
                        if (new Decimal(player.ro.selectedPassengersCommon[i]).eq(player.ro.commonPassengerIndex)) {
                            player.ro.selectedPassengersCommon.splice(i, 1);
                            player.ro.commonXPToGet.splice(i, 1); // Remove the corresponding XP
                            player.ro.commonTitles.splice(i, 1); // Remove the corresponding title
                            break;
                        }
                    }
                } else if (player.ro.rarityIndex.eq(1)) {
                    // Remove the selected uncommon passenger
                    for (let i = 0; i < player.ro.selectedPassengersUncommon.length; i++) {
                        if (new Decimal(player.ro.selectedPassengersUncommon[i]).eq(player.ro.uncommonPassengerIndex)) {
                            player.ro.selectedPassengersUncommon.splice(i, 1);
                            player.ro.uncommonXPToGet.splice(i, 1); // Remove the corresponding XP
                            player.ro.uncommonTitles.splice(i, 1); // Remove the corresponding title
                            break;
                        }
                    }
                }

                // Decrease the count of selected passengers
                player.ro.selectedPassengers = player.ro.selectedPassengers.sub(1);

                // Update passengerText
                player.ro.passengerText = player.ro.commonTitles.length > 0
                    ? player.ro.commonTitles
                    .map((title, index) => `${title}: +${formatWhole(player.ro.commonXPToGet[index])} XP`)
                    .join("<br>")
                    : "No passengers selected.";
            },
            style: { border: "3px solid #121212", width: '180px', "min-height": '80px', borderRadius: '15px', backgroundColor: "#242424", color: "white", borderRadius: "0px 15px 15px 0px" },
        },
        15: {
            title() { return player.ro.rocketCooldown.lt(0) ? player.ro.rocketImages[player.ro.rocketIndex] + "<br><br><h2>Launch" : "<br><br>" + player.ro.rocketImages[player.ro.rocketIndex] + "<br><br><h5>Cooldown: " + formatTime(player.ro.rocketCooldown) + "." },
            canClick() { return player.ro.rocketCooldown.lt(0) && player.ro.rocketParts.gte(player.ro.rocketPartsReq) && player.ro.activatedFuel.gte(player.ro.activatedFuelReq) && player.cb.evolutionShards.gte(player.ro.evoCost) && player.cb.paragonShards.gte(player.ro.paragonCost)},
            unlocked() { return true },
            onClick() {
                player.au2.stars = player.au2.stars.add(player.au2.starsToGet)
                for (let i = 0; i < player.ro.selectedPassengersCommon.length; i++) {
                    player.st.levelables[Decimal.add(100, Decimal.add(1, player.ro.selectedPassengersCommon[i]))][1] = player.st.levelables[Decimal.add(100, Decimal.add(1, player.ro.selectedPassengersCommon[i]))][1].add(player.ro.commonXPToGet[i])
                }

                for (let i = 0; i < player.ro.selectedPassengersUncommon.length; i++) {
                    player.st.levelables[Decimal.add(200, Decimal.add(1, player.ro.selectedPassengersUncommon[i]))][1] = player.st.levelables[Decimal.add(200, Decimal.add(1, player.ro.selectedPassengersUncommon[i]))][1].add(player.ro.uncommonXPToGet[i])
                }

                player.ro.starPause = new Decimal(8)
                player.ro.rocketCooldown = player.ro.rocketCooldownMax[player.ro.rocketIndex]

                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.ro.evoCost)
                player.cb.paragonShards = player.cb.paragonShards.sub(player.ro.paragonCost)

                player.au2.au2Unlocked = true
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { 
                border: "3px solid rgb(27, 0, 36)", 
                width: '150px', 
                minHeight: '200px', 
                borderRadius: '15px', 
                backgroundColor: "#1b1173", 
                color: "white",
                display: "flex", // Enable flexbox
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                overflow: "hidden", // Prevent content overflow
            },
        },
        16: {
            title() { return "<h2>Upgrade" },
            canClick() { return player.cb.evolutionShards.gte('70') && player.cb.paragonShards.gte('15') && player.fi.temporalShards.gte('4') && player.au2.stars.gte('1e9') && player.sma.starmetalAlloy.gte('100000') 
                && player.cof.coreFragments[0].gte('50') && player.cof.coreFragments[1].gte('50') && player.cof.coreFragments[2].gte('50') && player.cof.coreFragments[3].gte('50') && player.cof.coreFragments[4].gte('50')
                && player.cof.coreFragments[5].gte('50') && player.cof.coreFragments[6].gte('50')
            },
            unlocked: true,
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(70)
                player.cb.paragonShards = player.cb.paragonShards.sub(15)
                player.fi.temporalShards = player.fi.temporalShards.sub(4)

                player.au2.stars = player.au2.stars.sub(1e9)
                player.sma.starmetalAlloy = player.sma.starmetalAlloy.sub(100000)

                for (let i = 0; i < 7; i++)
                {
                    player.cof.coreFragments[i] = player.cof.coreFragments[i].sub(50)
                }

                player.ro.rocket2Unlocked = true
            },
            style() {
                let look = {width: "300px", minHeight: "120px", color: "white", backgroundColor: "#191e40", border: "3px solid #0a0c19", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#191e40" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        100: {
            title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[101].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ro.commonPassengerIndex = new Decimal(0);
                player.ro.rarityIndex = new Decimal(0);
            },
            style() {
                let look = { width: "100px", minHeight: "100px" };

                // Set background color to red if the pet is selected as a passenger
                if (player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(0))) {
                    look.backgroundColor = "#FF0000"; // Red background
                } else {
                    look.backgroundColor = "#45BDD7"; // Default background
                }

                return look;
            },
        },
        101: {
            title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[102].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ro.commonPassengerIndex = new Decimal(1);
                player.ro.rarityIndex = new Decimal(0);
            },
            style() {
                let look = { width: "100px", minHeight: "100px" };

                // Set background color to red if the pet is selected as a passenger
                if (player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(1))) {
                    look.backgroundColor = "#FF0000"; // Red background
                } else {
                    look.backgroundColor = "#45BDD7"; // Default background
                }

                return look;
            },
        },
        102: {
            title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[103].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ro.commonPassengerIndex = new Decimal(2);
                player.ro.rarityIndex = new Decimal(0);
            },
            style() {
                let look = { width: "100px", minHeight: "100px" };

                // Set background color to red if the pet is selected as a passenger
                if (player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(2))) {
                    look.backgroundColor = "#FF0000"; // Red background
                } else {
                    look.backgroundColor = "#45BDD7"; // Default background
                }

                return look;
            },
        },
        103: {
            title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[104].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ro.commonPassengerIndex = new Decimal(3);
                player.ro.rarityIndex = new Decimal(0);
            },
            style() {
                let look = { width: "100px", minHeight: "100px" };

                // Set background color to red if the pet is selected as a passenger
                if (player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(3))) {
                    look.backgroundColor = "#FF0000"; // Red background
                } else {
                    look.backgroundColor = "#45BDD7"; // Default background
                }

                return look;
            },
        },
104: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[105].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.commonPassengerIndex = new Decimal(4);
        player.ro.rarityIndex = new Decimal(0);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(4))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#45BDD7"; // Default background
        }

        return look;
    },
},
105: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[106].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.commonPassengerIndex = new Decimal(5);
        player.ro.rarityIndex = new Decimal(0);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(5))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#45BDD7"; // Default background
        }

        return look;
    },
},
106: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[107].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.commonPassengerIndex = new Decimal(6);
        player.ro.rarityIndex = new Decimal(0);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(6))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#45BDD7"; // Default background
        }

        return look;
    },
},
107: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[108].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.commonPassengerIndex = new Decimal(7);
        player.ro.rarityIndex = new Decimal(0);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(7))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#45BDD7"; // Default background
        }

        return look;
    },
},
108: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[109].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.commonPassengerIndex = new Decimal(8);
        player.ro.rarityIndex = new Decimal(0);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersCommon.some(index => new Decimal(index).eq(8))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#45BDD7"; // Default background
        }

        return look;
    },
},
200: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[201].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.uncommonPassengerIndex = new Decimal(0);
        player.ro.rarityIndex = new Decimal(1);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(0))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#008300"; // Default background
        }

        return look;
    },
},
201: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[202].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.uncommonPassengerIndex = new Decimal(1);
        player.ro.rarityIndex = new Decimal(1);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(1))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#008300"; // Default background
        }

        return look;
    },
},
202: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[203].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.uncommonPassengerIndex = new Decimal(2);
        player.ro.rarityIndex = new Decimal(1);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(2))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#008300"; // Default background
        }

        return look;
    },
},
203: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[204].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.uncommonPassengerIndex = new Decimal(3);
        player.ro.rarityIndex = new Decimal(1);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(3))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#008300"; // Default background
        }

        return look;
    },
},
204: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[205].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.uncommonPassengerIndex = new Decimal(4);
        player.ro.rarityIndex = new Decimal(1);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(4))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#008300"; // Default background
        }

        return look;
    },
},
205: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[206].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.uncommonPassengerIndex = new Decimal(5);
        player.ro.rarityIndex = new Decimal(1);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(5))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#008300"; // Default background
        }

        return look;
    },
},
206: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[207].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.uncommonPassengerIndex = new Decimal(6);
        player.ro.rarityIndex = new Decimal(1);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(6))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#008300"; // Default background
        }

        return look;
    },
},
207: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[208].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.uncommonPassengerIndex = new Decimal(7);
        player.ro.rarityIndex = new Decimal(1);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(7))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#008300"; // Default background
        }

        return look;
    },
},
208: {
    title() { return this.canClick() ? "<img src='" + tmp.pet.levelables[209].image + "' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" : "" },
    canClick() { return true },
    unlocked() { return true },
    onClick() {
        player.ro.uncommonPassengerIndex = new Decimal(8);
        player.ro.rarityIndex = new Decimal(1);
    },
    style() {
        let look = { width: "100px", minHeight: "100px" };

        // Set background color to red if the pet is selected as a passenger
        if (player.ro.selectedPassengersUncommon.some(index => new Decimal(index).eq(8))) {
            look.backgroundColor = "#FF0000"; // Red background
        } else {
            look.backgroundColor = "#008300"; // Default background
        }

        return look;
    },
},
    },
    levelables: {},
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Activated Fuel": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", function () { return "You have <h3>" + format(player.ro.activatedFuel) + "</h3> activated fuel." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Activated fuel boosts golden grass value by x<h3>" + format(player.ro.activatedFuelEffect) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You will gain <h3>" + format(player.ro.activatedFuelToGet) + "</h3> activated fuel on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "1000px", border: "3px solid #0a0c19", borderBottom: "0px", backgroundColor: "#191e40", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
                        ["style-row", [
                        ["style-column", [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Ingredients:" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.rf.rocketFuel) + "</h3> rocket fuel, which gives a base of " + format(player.ro.activatedFuelContributions[0]) + " activated fuel." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.g.goldGrass) + "</h3> golden grass, which multiplies activated fuel by x" + format(player.ro.activatedFuelContributions[1]) + "."}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> oil, which multiplies activated fuel x" + format(player.ro.activatedFuelContributions[2]) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.fa.charge) + "</h3> charge, which multiplies activated fuel x" + format(player.ro.activatedFuelContributions[3]) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #0a0c19", backgroundColor: "#191e40"}],
                    ["style-column", [
                        ["raw-html", function () { return "(Converting does a singularity equivalent reset.)" }, { "color": "white", "font-size": "17px", "font-family": "monospace", lineHeight: "1.5"}], 
                    ], {width: "1000px", border: "3px solid #0a0c19", borderTop: "0px", backgroundColor: "#191e40", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 15px 15px"}],
                    ["blank", "25px"],
                    ["clickable", 11],
                ]
            },
            "Rocket Parts": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.ro.rocketParts) + "</h3> rocket parts." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Activated fuel boosts moonstone value by x<h3>" + format(player.ro.rocketPartsEffect) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.ro.rocketPartsToGet) + "</h3> rocket parts on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "1000px", border: "3px solid #0a0c19", borderBottom: "0px", backgroundColor: "#191e40", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
                        ["style-row", [
                        ["style-column", [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Ingredients:" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.gh.steel) + "</h3> steel, which gives a base of " + format(player.ro.rocketPartsContributions[0]) + " rocket parts." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy, which multiplies rocket parts by x" + format(player.ro.rocketPartsContributions[1]) + "."}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.p.crystals) + "</h3> crystals, which multiplies rocket parts x" + format(player.ro.rocketPartsContributions[2]) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["raw-html", function () { return "You have <h3>" + format(player.g.moonstone) + "</h3> moonstone, which multiplies rocket parts x" + format(player.ro.rocketPartsContributions[3]) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #0a0c19", backgroundColor: "#191e40"}],
                    ["style-column", [
                        ["raw-html", function () { return "(Converting does a singularity equivalent reset.)" }, { "color": "white", "font-size": "17px", "font-family": "monospace", lineHeight: "1.5"}], 
                        ["raw-html", function () { return "(Rocket part gain is rounded down to the nearest integer.)" }, { "color": "white", "font-size": "17px", "font-family": "monospace", lineHeight: "1.5"}], 
                    ], {width: "1000px", border: "3px solid #0a0c19", borderTop: "0px", backgroundColor: "#191e40", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 15px 15px"}],
                    ["blank", "25px"],
                    ["clickable", 12],
                ]
            },
            "Select Passengers": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", function () { return "Select Passengers (" + formatWhole(player.ro.selectedPassengers) + "/" + formatWhole(player.ro.maxSelectedPassengers) + ")"}, { "color": "#dbdbdb", "font-size": "36px", "font-family": "monospace" }],
                    ], {width: "1000px", border: "3px solid #dbdbdb", borderBottom: "0px", backgroundColor: "#1c1c1c", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}],
                    ["style-row", [
                        ["style-column", [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ro.petTitle }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Level: " + formatWhole(player.ro.petLevel) + " -> " + formatWhole(player.ro.spacePetXPToGet) + " Space Pet XP." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["clickable", 13],["clickable", 14],]],
                    ["blank", "25px"],
                ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #dbdbdb", borderBottom: "0px", backgroundColor: "#1c1c1c"}],
                    ["style-column", [
                        ["raw-html", function () { return "Common Pets" }, { "color": "#9bedff", "font-size": "36px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards. (Total passenger cost: " + formatWhole(player.ro.evoCost) + " evo shards)" }, { "color": "#9bedff", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "1000px", border: "3px solid #9bedff", borderBottom: "0px", backgroundColor: "#1f2f33", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 0px 0px"}],
                    ["style-row", [
                        ["style-column", [
                    ["blank", "25px"],
                    ["style-row", [["clickable", 100],["clickable", 101],["clickable", 102],["clickable", 103],["clickable", 104],["clickable", 105],["clickable", 106],["clickable", 107],["clickable", 108],]],
                    ["blank", "25px"],
                ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #9bedff", borderBottom: "0px", backgroundColor: "#1f2f33"}],
                    ["style-row", [
                        ["style-column", [
                    ["raw-html", function () { return "Uncommon Pets" }, { "color": "#88e688", "font-size": "36px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.paragonShards) + "</h3> paragon shards. (Total passenger cost: " + formatWhole(player.ro.paragonCost) + " paragon shards)"  }, { "color": "#88e688", "font-size": "16px", "font-family": "monospace" }],
                    ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #88e688", borderBottom: "0px", backgroundColor: "#1b2e1b"}],
                    ["style-row", [
                        ["style-column", [
                    ["blank", "25px"],
                    ["style-row", [["clickable", 200],["clickable", 201],["clickable", 202],["clickable", 203],["clickable", 204],["clickable", 205],["clickable", 206],["clickable", 207],["clickable", 208],]],
                    ["blank", "25px"],
                ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #88e688", backgroundColor: "#1b2e1b", borderRadius: "0px 0px 15px 15px"}],
                ]
            },
            "Launch Pad": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                            ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], {width: "150px", height: "50px"}],
        ], {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                   ["style-column", [
                        ["raw-html", function () { return player.ro.rocketNames[player.ro.rocketIndex] }, { "color": "#dbdbdb", "font-size": "36px", "font-family": "monospace" }],
                    ], {width: "1000px", border: "3px solid #dbdbdb", borderBottom: "0px", backgroundColor: "#1c1c1c", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}], 
                    ["style-row", [
                    ["style-column", [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain " + formatWhole(player.au2.starsToGet) + " stars on launch." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Evolution shard cost: " + formatWhole(player.ro.evoCost) + "" }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Paragon shard cost: " + formatWhole(player.ro.paragonCost) + "" }, { "color": "#4b79ff", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["clickable", 1], ["blank", "25px"], ["clickable", 15], ["blank", "25px"], ["clickable", 2],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ro.rocket2Unlocked ? "Switching rockets will reset the cooldown." : "" }, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Launching the rocket performs a singularity equivalent reset, uses activated fuel and rocket parts, and resets selected pet levels." }, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                    ["blank", "25px"],
                ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                    ], {width: "1000px", border: "3px solid #dbdbdb", backgroundColor: "#1c1c1c", borderRadius: "0px 0px 15px 15px"}],
                ]
            },
                "Rocket Upgrade": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.st.buyables[305].gte(1) && !player.ro.rocket2Unlocked },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                    ["style-row", [
                     ["raw-html", function () { return "Rocket Upgrade Workshop" }, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                    ], {width: "1000px", height: "100px", border: "0px solid #dbdbdb", backgroundColor: "#1c1c1c", borderRadius: "15px 15px 15px 15px"}],
                    ["style-column", [
                    ["raw-html", function () { return "Evolution Shards: " + formatWhole(player.cb.evolutionShards) + "/70" }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Paragon Shards: " + formatWhole(player.cb.paragonShards) + "/15" }, { "color": "#4b79ff", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Temporal Shards: " + formatWhole(player.fi.temporalShards) + "/4" }, { "color": "#77b0ffff", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Stars: " + format(player.au2.stars) + "/1e9" }, { "color": "#ffffff", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Starmetal Alloy: " + format(player.sma.starmetalAlloy) + "/100,000" }, { "color": "#ffffff", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "50 of every core fragment type." }, { "color": "#ffffff", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 16],]],
                    ], {width: "1000px", height: "400px", border: "0px solid #dbdbdb", backgroundColor: "#1c1c1c", borderRadius: "15px 15px 15px 15px"}],
                    ], {width: "1000px", height: "500px", border: "3px solid #dbdbdb", backgroundColor: "#1c1c1c", borderRadius: "15px 15px 15px 15px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("s", 26)}
})
