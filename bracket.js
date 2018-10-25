let players = []
let nonByes = [4,8,16,32,64,128]


$("#addInfo").submit(function(e){
	e.preventDefault();
	let playerName = e.target[0].value
	let dupPlayer = players.filter(player => player == playerName)
	if(dupPlayer != ''){
		alert("Duplicate name")
		return playerName = ''
		}
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

function pickPlayerByes(byes, array){
	let total = byes
	let byePlayers = []
	while(total > 0){
		byePlayers.push(array[Math.floor(Math.random()*array.length)]);
		total -= 1
	}
	return byePlayers
}

function shuffle(array){
	let counter = array.length;
	while (counter > 0){
		let index = Math.floor(Math.random() * counter);
		counter--;
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

function updateBrackets(byePlayers, winners, losers, filtered, byes){
	let newArray = shuffle(filtered.concat(byePlayers))
	let newByePlayer = pickPlayerByes(byes, newArray)
	let newWinners = winners.filter(player => player != newByePlayer)
	let newLosers = losers.filter(player => player != newByePlayer)
	if(newWinners.length > newLosers.length){
		newLosers = newLosers.concat(byePlayers)
	}
	if(newWinners.length < newLosers.length){
		newWinners = newWinners.concat(byePlayers)
	}
	if(newWinners.length == newLosers.length){
		winCount = 0
		loseCount = 0
		filtered.map((playerPos,id) => {
			let index = '#' + playerPos
			let areaId = 'area' + id
			if(id == 0){
				$(index).append($(document.createElement("td")).attr('id', areaId).text('Winners'));
			}
			if(id != 0){
				if(id < filtered.length/2){
					$(index).append($(document.createElement("td")).attr('id', areaId)).text(newWinners[winCount])
					winCount++
				}
				if(id == filtered.length/2){
				$(index).append($(document.createElement("td")).attr('id', areaId).text('Losers'));
				}
				if(id > filtered.length/2){
					$(index).append($(document.createElement("td")).attr('id', areaId).text(newLosers[loseCount]));
					loseCount++
				}
			}
		})
	}
}

function addRound(){
	let currRound = 'Round ' + ($('#title').length+1)
	$('#title').append($(document.createElement("th")).text(currRound))
}

function startGame(byes=0){
	$('#entry').hide()
	let byePlayers = []
	if(byes != 0){byePlayers = pickPlayerByes(byes, players)}
	let shuffled = shuffle(players)
	let filtered = players.filter(player => !byePlayers.includes(player))
	let roundGames = (filtered.length)/2
	let completedGames = 0
	let winners = []
	let losers = []
	let pair = 0
	$('#playerDisplay').empty()
	$('#playerDisplay').append($(document.createElement("tr")).attr('id', 'title'))
	$('#title').append($(document.createElement("th")).text('Round 1'))
	filtered.map((player,index) => {
		let uniqueId = '#' + player
		let uniqueIdLabel = player + 'label'
		let uniqueIdLab = '#' + uniqueIdLabel
		let uniIdBtn = '#' + player + 'btn'
		let uniIdInp = player + 'input'
		$('#playerDisplay').append($(document.createElement("tr")).attr('id', player))
		$(uniqueId).append($(document.createElement("td")).text(player).attr('id', uniqueIdLabel));
		$(uniqueIdLab).append($(document.createElement("input")).attr('type', 'text').attr('placeholder', 'Score:').attr('id', uniIdInp));
		$(uniqueIdLab).append($(document.createElement("button")).attr('type', 'submit').attr('id',player+'btn').text('Won?'));
		$(uniIdBtn).click(function(e){
			let nodeList = e.target.offsetParent.offsetParent.childNodes
			let currPlayerIndex = filtered.indexOf(player)
			let oppPlayerIndex = ''
			if(currPlayerIndex === 0){
				oppPlayerIndex = 1
			}
			if(currPlayerIndex % 2 === 0){
				oppPlayerIndex = currPlayerIndex + 1
			}
			if(currPlayerIndex % 2 !== 0){
				oppPlayerIndex = currPlayerIndex - 1
			}
			let oppPlayerName = filtered[oppPlayerIndex]
			let currPlayerWins = e.target.previousSibling.value
			let oppPlayerWins = nodeList[0].parentElement.children[oppPlayerName].childNodes[0].childNodes[1].value
			if(currPlayerWins != '' && oppPlayerWins != ''){
				$('#' + player + 'label').append(' - ' + currPlayerWins)
				$('#' + oppPlayerName + 'label').append(' - ' + oppPlayerWins)
				$('#'+ player + 'input').remove()
				$('#'+ player + 'btn').remove()
				$('#'+ oppPlayerName + 'input').remove()
				$('#'+ oppPlayerName + 'btn').remove()
			}
			if(parseInt(currPlayerWins) > parseInt(oppPlayerWins)){
				completedGames++
				winners.push(player)
				losers.push(oppPlayerName)
			}
			if(parseInt(currPlayerWins) < parseInt(oppPlayerWins)){
				completedGames++
				winners.push(oppPlayerName)
				losers.push(player)
			}
			if(completedGames === roundGames){
				addRound()
				updateBrackets(byePlayers, winners, losers, filtered, byes)
			}
		})
		if(pair < 2){
			pair++
		}
		if(pair == 2){
			$('#playerDisplay').append($(document.createElement("tr")).attr('class','space'))
			$('.space').append($(document.createElement("td")).text(''));
			pair = 0
		}
	})
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