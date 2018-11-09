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
		if(nonByes[i] == numPlayers){
			return freePass
			break
		}
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

function addRound(numRound){
	let tabName = 'Round'+(numRound)
	let currRound = 'Round ' + (numRound)
	$('#roundDisplay').append($(document.createElement('table')).attr('class', 'col-4').attr('id', tabName))
	$('#'+tabName).append($(document.createElement('tr')).attr('id', tabName+'tr'))
	$('#'+tabName+'tr').append($(document.createElement('th')).text(currRound))
}

function checkWinner(p1, p2, score1, score2){
	return score1 > score2 ? p1 : p2
}
// need to ensure when button clicked doesn't remove if no score ###
function checkScore(e, byePlayers, round, newByePlayer){
	let roundNum = round.slice(5,6)
	let playerId = e.target.id
	let playerName = playerId.slice(0,-3)
	let player = 'scoreOf'+(playerName)
	let score = e.target.previousSibling.value
	let nodeList = e.target.offsetParent.offsetParent.childNodes[1].childNodes[1].childNodes[roundNum-1].childNodes
	let losersStart = nodeList.length/2
	const winners = []
	const losers = []
	for(i=2; i<nodeList.length;i++){
		let oppPlayer = ''
		try{
			nodeList[i].childNodes[roundNum-1].id
			if (nodeList[i].childNodes[roundNum-1].id == player){
				try{
					oppPlayer += nodeList[i-1].childNodes[roundNum-1].id
				}
				catch(TypeError){
					oppPlayer += nodeList[i+1].childNodes[roundNum-1].id
				}
			}
		}
		catch(TypeError){
			continue
		}
		if(oppPlayer != ''){
			let oppPlayerName = oppPlayer.slice(7,oppPlayer.length)
			let oppPlayerPos = $('#'+oppPlayer)
			let oppPlayerScore = oppPlayerPos[0].value
			if (oppPlayerScore != '' && score != ''){
				$('#'+(playerName)+round+'td').append(' - ' + score)
				$('#'+ oppPlayerName+round+'td').append(' - ' + oppPlayerScore)
				$('#' + player).remove()
				$('#'+ playerName + 'btn').remove()
				$(oppPlayerPos).remove()
				$('#'+oppPlayerName + 'btn').remove()
				let newWinner = checkWinner(playerName, oppPlayerName, score, oppPlayerScore)
				if(playerName == newWinner){
					winners.push(playerName)
					let hasBye = newByePlayer.filter(currPlayer => currPlayer == oppPlayerName)
					if(hasBye){
						losers.push(oppPlayerName)
					}
				}
				if(oppPlayerName == newWinner){
					winners.push(oppPlayerName)
					let hasBye = newByePlayer.filter(currPlayer => currPlayer == playerName)
					if(hasBye){
						losers.push(playerName)
					}
				}
			}
		}
	}
	console.log(winners.length, losersStart)
	if(winners.length == losersStart){
			let updatedPlayerList = winners.concat(losers)
			let numRound = ($('#roundDisplay')[0].childElementCount) + 1
			let byes = newByePlayer.length
			addRound(numRound)
			return updateBrackets(newByePlayer, winners, losers, updatedPlayerList, byes, numRound)
		}
}

function updateBrackets(byePlayers, winners, losers, filtered, byes, numRound){
	let tableId = 'Round'+numRound
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
		let totalArrayLength = newWinners.length + newLosers.length + 2
		let baseLine = totalArrayLength % 2 === 0 ? totalArrayLength : (totalArrayLength - 1)
		let winCount = 0
		let loseCount = 0
		$('#'+tableId).append($(document.createElement("tr")).attr('id', tableId+'Winners'))
		$('#'+tableId+'Winners').append($(document.createElement("td")).text('Winners'))
		for(i=1;i<totalArrayLength;i++){
			if(i == baseLine/2){
					$('#'+tableId).append($(document.createElement("tr")).attr('id', tableId+'Losers'))
					$('#'+tableId+'Losers').append($(document.createElement("td")).text('Losers'))
				}
			if(i<baseLine/2){
				let playerWinner = newWinners[winCount]
				let playId = playerWinner+tableId+'td'
				let pWinId = playerWinner + tableId
				let pWinBtn = playerWinner+'btn'
				$('#'+tableId).append($(document.createElement("tr")).attr('id', pWinId))
				$('#'+ pWinId).append($(document.createElement("td")).attr('id',playId).text(playerWinner))
				$('#'+ pWinId).append($(document.createElement("input")).attr('type', 'text').attr('placeholder', 'Score:').attr('id', 'scoreOf'+playerWinner));
				$('#'+ pWinId).append($(document.createElement("button")).attr('type', 'submit').attr('id',pWinBtn).text('Won?'));
				winCount++
				
				$('#'+pWinBtn).click(function(e){
							return checkScore(e, byePlayers, tableId, newByePlayer)
						})
			}
			if(i > baseLine/2){
				let playerLoser = newLosers[loseCount]
				let playId = playerLoser+tableId+'td'
				if (playerLoser != undefined){
					let pLosId = playerLoser + tableId
					let pLosBtn = playerLoser+'btn'
					$('#'+tableId).append($(document.createElement("tr")).attr('id',pLosId))
					$('#'+ pLosId).append($(document.createElement("td")).attr('id',playId).text(playerLoser))
					$('#'+pLosId).append($(document.createElement("input")).attr('type', 'text').attr('placeholder', 'Score:').attr('id', 'scoreOf'+playerLoser));
					$('#'+pLosId).append($(document.createElement("button")).attr('type', 'submit').attr('id',pLosBtn).text('Won?'));
					loseCount++
					
					$('#'+pLosBtn).click(function(e){
						return checkScore(e, byePlayers, tableId, newByePlayer)
					})
				}
			}
		}
	}
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
	let midPoint = filtered.length/2
	let pair = 0
	
	$('#roundDisplay').empty()
	
	let numRound = ($('#roundDisplay')[0].childElementCount) + 1
	addRound(numRound)
	let tableId = 'Round'+numRound
	
	filtered.map((player,index) => {
		let uniqueId = '#' + player
		let uniqueIdLabel = player + tableId
		let uniqueIdLab = '#' + uniqueIdLabel
		let uniIdBtn = '#' + player + 'btn'
		let uniIdInp = 'scoreOf' + player
		if(index == midPoint){
			$('#'+tableId).append($(document.createElement("tr")).attr('class', 'space').attr('id','midPoint'))
			$('#midPoint').append($(document.createElement("td")))
		}
		$('#'+tableId).append($(document.createElement("tr")).attr('id', player))
		$(uniqueId).append($(document.createElement("td")).text(player).attr('id', uniqueIdLabel));
		$(uniqueIdLab).append($(document.createElement("input")).attr('type', 'text').attr('placeholder', 'Score:').attr('id', uniIdInp));
		$(uniqueIdLab).append($(document.createElement("button")).attr('type', 'submit').attr('id',player+'btn').text('Won?'));
		$(uniIdBtn).click(function(e){
			let nodeList = e.target.offsetParent.offsetParent.childNodes
			let currPlayerIndex = filtered.indexOf(player)
			let oppPlayerIndex = ''
			currPlayerIndex === 0 ? oppPlayerIndex = 1 : currPlayerIndex % 2 === 0 ? oppPlayerIndex = currPlayerIndex + 1 : oppPlayerIndex = currPlayerIndex - 1
			let oppPlayerName = filtered[oppPlayerIndex]
			let currPlayerWins = e.target.previousSibling.value
			let oppPlayerWins = nodeList[0].parentElement.children[oppPlayerName].childNodes[0].childNodes[1].value
			if(currPlayerWins != '' && oppPlayerWins != ''){
				$('#' + uniqueIdLabel).append(' - ' + currPlayerWins)
				$('#' + oppPlayerName + tableId).append(' - ' + oppPlayerWins)
				$('#'+ uniIdInp).remove()
				$('#'+ player + 'btn').remove()
				$('#scoreOf'+ oppPlayerName).remove()
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
				let numRound = ($('#roundDisplay')[0].childElementCount) + 1
				addRound(numRound)
				return updateBrackets(byePlayers, winners, losers, filtered, byes, numRound)
			}
		})
		if(pair < 2){
			pair++
		}
		if(pair == 2){
			$('#'+tableId).append($(document.createElement("tr")).attr('class','space').attr('id', 'pad'+index))
			$('#pad'+index).append($(document.createElement("td")))
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