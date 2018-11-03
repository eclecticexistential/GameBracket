require('chromedriver');
const selenium = require('selenium-webdriver');
const driver = new selenium.Builder().forBrowser('chrome').build();

const playerNameList = ['Chris', 'Abbie', 'Charles', 'Leslie', 'Justin', 'Jessica', 'Able', 'James']
const scores = [0,1,2,3,4,5,6,7]

function foo(url){
    driver.get(url)
	playerNameList.map(player => {
		setTimeout(function(){
			driver.findElement(selenium.By.id('playerName')).then(input => input.sendKeys(player))
			driver.findElement(selenium.By.id('saveName')).then(btn => btn.click());
		}, 2000)
	})
	setTimeout(function(){
		driver.findElement(selenium.By.id('loadNames')).then(btn => btn.click());
	}, 12000)
}

function bar(){
	let scorePos = 0
	playerNameList.map(player => {
		setTimeout(function(){
			let currPlayerInput = 'scoreOf'+player
			const findPlayer = driver.findElement(selenium.By.id(player)).findElement(selenium.By.id(currPlayerInput));
			findPlayer.sendKeys(scores[scorePos])
			scorePos += 1
		}, 2000)
	})
	let halfsies = (playerNameList.length)/2
	let succClick = 0
	setTimeout(function(){
		for(i=0; i<playerNameList.length; i++){
			let currPlayBtn = playerNameList[i]+'btn'
			const pressBtn = driver.findElement(selenium.By.id(currPlayBtn))
			pressBtn.click()
			succClick += 1
			if (succClick == halfsies){
				break
			}
		}
	}, 9000)
}

foo('file:///C:/Users/Earthling/Downloads/Coding/Javascript/brackets/index.html')
const round1 = driver.wait(selenium.until.elementLocated(selenium.By.id('Round1tr')));
setTimeout(function(){bar()}, 12000)