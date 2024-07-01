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
        if (hasUpgrade('i', 32)) mult = mult.times(10)
        if (hasUpgrade('i', 33)) mult = mult.times(100)
        if (hasUpgrade('s', 41)) mult = mult.times(10)
        if (hasChallenge('u', 12)) mult = mult.times(100)
        if (inChallenge('u', 11)) mult = mult.pow(1/2)
        if (inChallenge('u', 12)) mult = mult.pow(1/3)
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
                <h3>This game is definetely not finished, so expect not balanced layers!` },
        },
    },
    upgrades: {
        11: {
            title: "Learn",
            description: "Increase point gain by 1.",
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
            description: "Multiply your learning point gain and IQ point gain by 10.",
            cost: new Decimal(10000),
            unlocked() {return hasUpgrade("i", 31)}
        },
        33: {
            title: "Clippy",
            description: "Multiply your learning point gain and IQ point gain by 100 only for a challenge.",
            cost: new Decimal(250),
            unlocked() {if (hasUpgrade("i", 31) && inChallenge("u", 11) || hasUpgrade("i", 31) && inChallenge("u", 12)) return 1
                else return 0
            }
        },
    },
    passiveGeneration() {return hasMilestone("n", 0)}
})
addLayer("s", {
    name: "siq", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SIQ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        total: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    
    requires: new Decimal(10000000), // Can be a function that takes requirement increases into account
    resource: "Super IQ points", // Name of prestige currency
    baseResource: "IQ points", // Name of resource prestige is based on
    baseAmount() {return player['i'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('u', 11)) mult = mult.times(3)
        if (hasMilestone('n', 0)) mult = mult.times(3)
        if (hasUpgrade('s', 41)) mult = mult.times(10)
        if (hasChallenge('u', 12)) mult = mult.times(100)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Super IQ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("i", 32) || player.s.unlocked},
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
        14: {
            title: "Reset your mind",
            description: "Unlock a new layer and increase point gain.",
            tooltip: "Point gain is multiplied by points^0.1.",
            cost: new Decimal(1e2),
            unlocked() {return (hasUpgrade("s", 41)) }
        },
        41: {
            title: "Try to study",
            description: "Multiply Super IQ point gain and IQ point gain by 10.",
            cost: new Decimal(1e1),
        },
    },
    branches: ["i"],
    passiveGeneration() {return hasMilestone("n", 1)/10}
})
addLayer("u", {
    name: "uiq", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UIQ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        total: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    
    requires: new Decimal(1e3), // Can be a function that takes requirement increases into account
    resource: "Ultra IQ points", // Name of prestige currency
    baseResource: "Super IQ points", // Name of resource prestige is based on
    baseAmount() {return player['s'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone('n', 1)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for Ultra IQ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("s", 14) || player.u.unlocked},
    upgrades: {
        11: {
            title: "LEARN",
            description: "Unlock a challenge and increase Super IQ point gain by 3.",
            cost: new Decimal(1),
        },
    },
    branches: ["s"],
    challenges: {
        11: {
            name: "Beginning",
            challengeDescription: "Square root point and IQ point gain.",
            goalDescription: "Get 200000 IQ points.",
            rewardDescription: "Unlock a new challenge and multiply point gain by 5.",
            canComplete: function() {return player["i"].points.gte(200000)},
            unlocked() {return (hasUpgrade("u", 11)) }
        },
        12: {
            name: "Something new",
            challengeDescription: "Cube root point and IQ point gain.",
            goalDescription: "Get 10 Super IQ points.",
            rewardDescription: "Unlock something and multiply Super IQ point, IQ point and point gain by 100.",
            canComplete: function() {return player["s"].points.gte(10)},
            unlocked() {return (hasChallenge("u", 11)) }
        },
    }
})
addLayer("n", {
    name: "nb+", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "NB+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        total: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "NB+ points", // Name of prestige currency
    baseResource: "Ultra IQ points", // Name of resource prestige is based on
    baseAmount() {return player['u'].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for Ultra IQ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
        not_lore: {
            title: "Hello!",
            body() { return `<h1>Welcome to NB+!</h1><br><br>
                <h3>NB+ stands for New Brain+, and it is here because I wanted to and you can't make me delete it.</h3><br><br>
                <h4>With each reset you will become stronger so you will be able to progress quicker.</h4><br>
                <h4>For some info, in the milestones there's a mention of NB++, NB+++ etc.<br>
                Each plus in NB+ stands for the amount of points.</h4>` },
        },
    },
    layerShown(){return hasChallenge("u", 12) || player.n.unlocked},
    upgrades: {
    },
    branches: [],
    challenges: {
    },
    milestones: {
        0: {
            requirementDescription: "NB+",
            effectDescription: "Gain 100% of IQ points per second and multiply Super IQ point gain by 3.",
            done() { return player.n.points.gte(1) }
        },
        1: {
            requirementDescription: "NB++",
            effectDescription: "Gain 10% of SIQ points per second and multiply Ultra IQ point gain by 3.",
            done() { return player.n.points.gte(2) }
        }
    }
})
