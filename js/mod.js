let modInfo = {
	name: "The IQ tree",
	id: "e",
	author: "Temtyy",
	pointsName: "learning points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (5), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.0.1",
	name: "NB+",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.0.1</h3><br>
		- Added 2 new layers.<br>
		- Added 2 new challenges.<br>
		- Did something else.<br><br>
	<h3>v0.0.0.0.0.2</h3><br>
		- Changed some things.<br><br>
	<h3>v0.0.0.0.0.1</h3><br>
		- Actually adding something.<br>
		- amogus.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now... wait.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["WhyNot"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('i', 11)) gain = gain.add(1)
	if (hasUpgrade('i', 12)) gain = gain.times(2)
	if (hasUpgrade('i', 13)) gain = gain.times(upgradeEffect('i', 13))
	if (hasUpgrade('i', 21)) gain = gain.times(2)
	if (hasUpgrade('i', 22)) gain = gain.times(2)
	if (hasUpgrade('s', 11)) gain = gain.times(5)
	if (hasUpgrade('s', 13)) gain = gain.times(upgradeEffect('s', 13))
	if (hasUpgrade('i', 32)) gain = gain.times(10)
	if (hasUpgrade('i', 33)) gain = gain.times(100)
	if (hasChallenge('u', 11)) gain = gain.times(5)
	if (hasChallenge('u', 12)) gain = gain.times(100)
	if (hasUpgrade('s', 14)) gain = gain.times(gain**1/10)
	if (inChallenge('u', 11)) gain = gain.pow(1/2)
	if (inChallenge('u', 11)) gain = gain.pow(1/3)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	peanuts: new Decimal(1)
}}

// Display extra things at the top of the page
var displayThings = [`
	<h4>Current endgame is 1e170.</h4><h6><br>
	peanuts</h6><br>
	`
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e170"))
}




// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}