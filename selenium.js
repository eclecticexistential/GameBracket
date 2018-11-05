require('chromedriver');
const selenium = require('selenium-webdriver');
const driver = new selenium.Builder().forBrowser('chrome').build();

const playerNameList = ['Chris', 'Abbie', 'Charles', 'Leslie', 'Justin', 'Jessica', 'Able', 'James']
const scores = [0,1,2,3,4,5,6,7]

function foo(url){
    driver.get(url)
}

function finalize(pos){
	const player = playerNameList[pos]
	const area = driver.findElement(selenium.By.id('playerName'))
	const saveBtn = driver.findElement(selenium.By.id('saveName'))
	area.sendKeys(player)
	saveBtn.click()
}

function step(){
	driver.findElement(selenium.By.id('loadNames')).then(btn => btn.click());
}

function press(){
	const halfsis = (playerNameList.length/2)+2  //need to change to int
	for(i=0; i<=halfsis; i++){
		const currPlayBtn = playerNameList[i]+'btn'
		const pressBtn = driver.findElement(selenium.By.id(currPlayBtn))
		pressBtn.click()
	}
}

function bar(){
	let scorePos = 0
	for(i=0;i<playerNameList.length;i++){
		const player = playerNameList[i]
		const currPlayerInput = 'scoreOf'+player
		const findPlayer = driver.findElement(selenium.By.id(player)).findElement(selenium.By.id(currPlayerInput));
		setTimeout(function(){
			findPlayer.sendKeys(scores[scorePos])
			scorePos += 1
		}, 500)
	}
}

foo('file:///C:/Users/Earthling/Downloads/Coding/Javascript/brackets/index.html')
setTimeout(function(){finalize(0)},10)
setTimeout(function(){finalize(1)},2240)
setTimeout(function(){finalize(2)},7900)
setTimeout(function(){finalize(3)},12000)
setTimeout(function(){finalize(4)},16000)
setTimeout(function(){finalize(5)},19450)
setTimeout(function(){finalize(6)},24700)
setTimeout(function(){finalize(7)},30150)
setTimeout(function(){step()}, 35000)
const round1 = driver.wait(selenium.until.elementLocated(selenium.By.id('Round1tr')));
setTimeout(function(){bar()}, 39500)
setTimeout(function(){press()}, 44000)
