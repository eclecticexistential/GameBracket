let players = []

$("#addInfo").submit(function(e){
	e.preventDefault();
	playerName = e.target[0].value
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
})

function loadPlayers(){
	alert(players)
}