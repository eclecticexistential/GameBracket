require('chromedriver');
const selenium = require('selenium-webdriver');
const driver = new selenium.Builder().forBrowser('chrome').build();

const playerNameList = ['Chris', 'Abbie', 'Charles', 'Leslie', 'Justin', 'Jessica', 'Able', 'James']
const scores = [0,1,2,3,4,5,6,7]

function foo(url){
    driver.get(url)
}

function finalize(ListOfPlayers, pos, areaId, btnId){
	const player = ListOfPlayers[pos]
	const area = driver.findElement(selenium.By.id(areaId))
	const saveBtn = driver.findElement(selenium.By.id(btnId))
	area.sendKeys(player)
	saveBtn.click()
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
driver.wait(selenium.until.elementLocated(selenium.By.id('entry'))
).then(
finalize(playerNameList, 0,'playerName','saveName')
).then(
setTimeout(function(){finalize(playerNameList, 1,'playerName','saveName')},5040)
).then(
setTimeout(function(){finalize(playerNameList, 2,'playerName','saveName')},6500)
).then(
setTimeout(function(){finalize(playerNameList, 3,'playerName','saveName')},7500)
).then(
setTimeout(function(){finalize(playerNameList, 4,'playerName','saveName')},8500)
).then(
setTimeout(function(){finalize(playerNameList, 5,'playerName','saveName')},9650)
).then(
setTimeout(function(){finalize(playerNameList, 6,'playerName','saveName')},10700)
).then(
setTimeout(function(){finalize(playerNameList, 7,'playerName','saveName')},12150)
).then(
setTimeout(function(){step()}, 14000)
).then(
setTimeout(function(){bar(playerNameList)}, 16000)
).then(
setTimeout(function(){press(playerNameList)}, 18000)
)
driver.wait(selenium.until.elementLocated(selenium.By.id('Round2'))).then(
setTimeout(function(){bar(playerNameList,round='Round2')}, 44000),
setTimeout(function(){press(playerNameList)}, 56000)
)





















