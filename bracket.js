let players = []
let nonByes = [4,8,16,32,64,128]


$("#addInfo").submit(function(e){
	e.preventDefault();
	playerName = e.target[0].value
	if(playerName != ''){
		index = 'i' + players.length
		btnInd = 'j' + players.length
		indexHas = '#' + index
		btnHas = '#' + btnInd
		players.push(playerName)
		$('#playerDisplay').append($(document.createElement("tr")).attr('id', index))
		$(indexHas).append($(document.createElement("td")).text(playerName));
		$(indexHas).append($(document.createElement("button")).attr('id', btnInd).text('Delete'));
		e.target[0].value = ''
		$(btnHas).click(function(e){
			getId = e.target.parentNode.childNodes[0].innerHTML
			filtered = players.filter(player => player != getId)
			players = filtered
			$(e.currentTarget.parentNode).remove()
		})
	}
})

function getByes(numPlayers){
	let spot = 0
	let numDown = 0
	let numUp = 0
	let freePass = 0
	for(i=0; i<nonByes.length; i++){
		if(nonByes[i] < numPlayers){
			spot = nonByes[i]
		}
		if(nonByes[i] > numPlayers){
			let highNum = nonByes[i]
			numDown = numPlayers - spot
			numUp =  highNum - numPlayers
			freePass = numDown <= numUp ? numDown : numUp
			break
		}
	}
	return freePass
}

function pickPlayerByes(byes){
	let total = byes
	let byePlayers = []
	while(total > 0){
		byePlayers.push(players[Math.floor(Math.random()*players.length)]);
		total -= 1
	}
	return byePlayers
}

function startGame(byes=0){
	$('#entry').hide()
	let byePlayers = []
	if(byes != 0){byePlayers = pickPlayerByes(byes)}
	let filtered = players.filter(player => player != byePlayers)
	let pair = 0
	$('#playerDisplay').empty()
	$('#playerDisplay').append($(document.createElement("tr")).attr('id', 'title'))
	$('#title').append($(document.createElement("th")).text('Round 1'))
	filtered.map(player => {
		let uniqueId = '#' + player
		$('#playerDisplay').append($(document.createElement("tr")).attr('id', player))
		$(uniqueId).append($(document.createElement("td")).text(player));
		if(pair < 2){
			pair++
		}
		if(pair == 2){
			$('#playerDisplay').append($(document.createElement("tr")).attr('class','space'))
			$('.space').append($(document.createElement("td")).text(''));
			pair = 0
		}
	})
	console.log(byePlayers)
}

function loadPlayers(){
	let numPlayers = players.length
	let pow2 = nonByes.filter(byes => byes == numPlayers)
	if(pow2 != ''){
		startGame()
	} else{
		let byes = getByes(numPlayers)
		startGame(byes)
	}
}