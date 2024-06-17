addLayer("i", {
    name: "iq", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "IQ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "IQ points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 11)) mult = mult.times(2)
        if (hasUpgrade('i', 31)) mult = mult.times(4)
        if (hasUpgrade('i', 24)) mult = mult.times(3)
        if (hasUpgrade('i', 23)) mult = mult.times(upgradeEffect('i', 23))
        if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i', 14))
        if (hasUpgrade('s', 12)) mult = mult.times(upgradeEffect('s', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for IQ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    infoboxes: {
        not_lore: {
            title: "Importatn!!111!one!!",
            body() { return `<h1>Read this before playing!</h1><br>
                <h3>This game is definetely not finished, so expect not balanced layers!<br><br><br><br><br><br><br>
                oh btw current end is 1e30` },
        },
    },
    upgrades: {
        11: {
            title: "Learn",
            description: "Start gaining 1 learning point per second.",
            cost: new Decimal(1),
        },
        12: {
            title: "Stronger learning",
            description: "Double your learning point gain.",
            cost: new Decimal(2),
        },
        13: {
            title: "More books",
            description: "Increase learning point gain based on IQ points.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Wikipedia articles",
            description: "Increase IQ point gain based on learning points.",
            cost: new Decimal(6),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            gainMult() {
                let mult = new Decimal(1)
                
                return mult
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Ultra learning",
            description: "Double your learning point gain again.",
            cost: new Decimal(15),
        },
        22: {
            title: "Mega learning",
            description: "Double your learning point gain... again.",
            cost: new Decimal(50),
        },
        23: {
            title: "Omega learning",
            description: "Increase IQ point gain based on IQ points.",
            cost: new Decimal(80),
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Ultra learning",
            description: "Triple your IQ point gain.",
            cost: new Decimal(100),
        },
        31: {
            title: "Giga learning",
            description: "Quadruple IQ gain.",
            cost: new Decimal(150),
        },
        32: {
            title: "IQ duper",
            description: "Square your learning point gain.",
            cost: new Decimal(1000),
        },
    },
})
addLayer("s", {
    name: "siq", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SIQ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1000000000), // Can be a function that takes requirement increases into account
    resource: "Super IQ points", // Name of prestige currency
    baseResource: "IQ points", // Name of resource prestige is based on
    baseAmount() {return player['i'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Super IQ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Ultimate learning",
            description: "*5 learning point gain, *2 IQ points gain",
            cost: new Decimal(1),
        },
        12: {
            title: "Better computer",
            description: "Increase IQ point gain based on Super IQ points.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Secret wiki websites",
            description: "Increase learning point gain based on learning points but weaker.",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.06)
            },
            gainMult() {
                let mult = new Decimal(1)
                if (hasUpgrade('s', 13)) mult = mult.times(upgradeEffect('s', 13))
                return mult
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
})
