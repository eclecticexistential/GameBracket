require('chromedriver');
const selenium = require('selenium-webdriver');
const driver = new selenium.Builder().forBrowser('chrome').build();
const playerNameList = ['Chris', 'Abbie', 'Charles', 'Justin', 'Jessica', 'Able', 'James']
const scores = [0,1,2,3,4,5,6]

function foo(url){
    driver.get(url)
}

function finalize(ListOfPlayers, pos, areaId, btnId){
	setTimeout(function(){
		const player = ListOfPlayers[pos]
		const area = driver.findElement(selenium.By.id(areaId))
		const saveBtn = driver.findElement(selenium.By.id(btnId))
		area.sendKeys(player).then(saveBtn.click())
	}, 300)
}

function step(){
	driver.findElement(selenium.By.id('loadNames')).then(btn => btn.click());
}

function press(ListOfPlayers){
	const halfsis = (ListOfPlayers.length/2)+2  //need to change to int
	for(i=0; i<=halfsis; i++){
		const currPlayBtn = ListOfPlayers[i]+'btn'
		const pressBtn = driver.findElement(selenium.By.id(currPlayBtn))
		pressBtn.click()
	}
}

function bar(ListOfPlayers, round=''){
	let scorePos = 0
	for(i=0;i<ListOfPlayers.length;i++){
		if (round != ''){
			const currPlayerInput = 'scoreOf'+ListOfPlayers[i]
			const player = ListOfPlayers[i]+round
			console.log(currPlayerInput, player)
			const findPlayer = driver.findElement(selenium.By.id(player)).findElement(selenium.By.id(currPlayerInput));
				setTimeout(function(){
					findPlayer.sendKeys(scores[scorePos])
					scorePos += 1
				}, 500)
			}
		if (round == ''){
			let player = ListOfPlayers[i]
			const currPlayerInput = 'scoreOf'+player
			const findPlayer = driver.findElement(selenium.By.id(player)).findElement(selenium.By.id(currPlayerInput));
			setTimeout(function(){
				findPlayer.sendKeys(scores[scorePos])
				scorePos += 1
			}, 500)
		}
	}
}

foo('file:///C:/Users/Earthling/Downloads/Coding/Javascript/brackets/index.html')
let timer = 1000
driver.wait(selenium.until.elementLocated(selenium.By.id('entry'))
).then(
setTimeout(function(){finalize(playerNameList, 0,'playerName','saveName')},timer)
).then(
timer += 4200,
setTimeout(function(){finalize(playerNameList, 1,'playerName','saveName')},timer)
).then(
timer += 4000,
setTimeout(function(){finalize(playerNameList, 2,'playerName','saveName')},timer)
).then(
timer += 3000,
setTimeout(function(){finalize(playerNameList, 3,'playerName','saveName')}, timer)
).then(
timer += 3000,
setTimeout(function(){finalize(playerNameList, 4,'playerName','saveName')},timer)
).then(
timer += 3000,
setTimeout(function(){finalize(playerNameList, 5,'playerName','saveName')},timer)
).then(
timer += 3000,
setTimeout(function(){finalize(playerNameList, 6,'playerName','saveName')},timer)
).then(
timer += 3000,
setTimeout(function(){step()}, timer)
).then(
timer += 3000,
setTimeout(function(){bar(playerNameList)}, timer)
).then(
timer += 3000,
setTimeout(function(){press(playerNameList)}, timer)
)
driver.wait(selenium.until.elementLocated(selenium.By.id('Round2'))).then(
timer += 3000,
setTimeout(function(){bar(playerNameList,round='Round2')}, timer),
timer += 3000,
setTimeout(function(){press(playerNameList)}, timer)
)
driver.wait(selenium.until.elementLocated(selenium.By.id('Round3'))).then(
timer += 3000,
setTimeout(function(){bar(playerNameList,round='Round3')}, timer),
timer += 4000,
setTimeout(function(){press(playerNameList)}, timer)
)

driver.wait(selenium.until.elementLocated(selenium.By.id('Round4'))).then(
timer += 3000,
setTimeout(function(){bar(playerNameList,round='Round4')}, timer),
timer += 4000,
setTimeout(function(){press(playerNameList)}, timer)
)



















