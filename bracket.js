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

function addRound(){
	let currRound = 'Round ' + ($('#title').length+1)
	$('#title').append($(document.createElement("th")).text(currRound))
}

function checkScore(e){
	let playerId = e.target.id
	let player = playerId.slice(0,-3)
	let score = e.target.previousSibling.value
	let nodeList = e.target.offsetParent.offsetParent.childNodes
	let oppTd = ''
	for(i=2; i<nodeList.length;i++){
		let round = nodeList[i].childNodes.length
		let playerTd = nodeList[i].childNodes[round-1].id
		if(playerTd != ''){
			if(playerTd == player+'score'){
				console.log($('#'+playerTd))
				if(nodeList[i-1].childNodes[round-1].id){
					console.log(nodeList[i-1].childNodes[round-1].id)
				}
				try {
					console.log(nodeList[i+1].childNodes[round-1].id)
				}
				catch(TypeError) {
					continue
				}
			}
		}
	}
	console.log(oppTd)
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
		let totalArrayLength = ($('#playerDisplay')[0].childElementCount)
		let baseLine = totalArrayLength % 2 === 0 ? totalArrayLength : (totalArrayLength - 1)
		let winCount = 0
		let loseCount = 0
		for(i=0;i<totalArrayLength;i++){
			let areaId = '#' + $('#playerDisplay')[0].childNodes[i].id
			if(i!==0){
				if(i==1){
					if($(areaId).length == 1){
						$(areaId).append($(document.createElement("td")))
					}
					$(areaId).append($(document.createElement("td")).text('Winners'))
					}
				if(i == baseLine/2){
					$(areaId).append($(document.createElement("td")).text('Losers'))
				}
				if(i>1){
					if(i < baseLine/2){
						let playerWinner = newWinners[winCount]
						let pWinId = '#' + playerWinner + 'score'
						let pWinBtn = playerWinner+'btn'
						$(areaId).append($(document.createElement("td")).text(playerWinner).attr('id',playerWinner + 'score'))
						$(pWinId).append($(document.createElement("input")).attr('type', 'text').attr('placeholder', 'Score:').attr('id', 'scoreOf'+playerWinner));
						$(pWinId).append($(document.createElement("button")).attr('type', 'submit').attr('id',pWinBtn).text('Won?'));
						winCount++
						
						$('#'+pWinBtn).click(function(e){
							checkScore(e)
						})
					}
					if(i > baseLine/2){
						let playerLoser = newLosers[loseCount]
						if (playerLoser != undefined){
							let pLosId = '#' + playerLoser + 'score'
							let pLosBtn = playerLoser+'btn'
							$(areaId).append($(document.createElement("td")).text(playerLoser).attr('id',playerLoser+'score'))
							$(pLosId).append($(document.createElement("input")).attr('type', 'text').attr('placeholder', 'Score:').attr('id', 'scoreOf'+playerLoser));
							$(pLosId).append($(document.createElement("button")).attr('type', 'submit').attr('id',pLosBtn).text('Won?'));
							loseCount++
							
							$('#'+pLosBtn).click(function(e){
								checkScore(e, newByePlayer)
							})
						}
					}
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
	$('#playerDisplay').empty()
	$('#playerDisplay').append($(document.createElement("tr")).attr('id', 'title'))
	$('#title').append($(document.createElement("th")).text('Round 1'))
	$('#playerDisplay').append($(document.createElement("tr")).attr('class', 'space').attr('id','first'))
	filtered.map((player,index) => {
		let uniqueId = '#' + player
		let uniqueIdLabel = player + 'label'
		let uniqueIdLab = '#' + uniqueIdLabel
		let uniIdBtn = '#' + player + 'btn'
		let uniIdInp = player + 'input'
		if(index == midPoint){
			$('#playerDisplay').append($(document.createElement("tr")).attr('class', 'space').attr('id','midPoint'))
			$('#midPoint').append($(document.createElement("td")))
		}
		$('#playerDisplay').append($(document.createElement("tr")).attr('id', player))
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
			$('#playerDisplay').append($(document.createElement("tr")).attr('class','space').attr('id', 'pad'+index))
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