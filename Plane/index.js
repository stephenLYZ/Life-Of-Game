// plane

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// gameData
var gameData = {
	state: this.START,
	START: 0,
	STARTING: 1,
	RUNNING: 2,
	PAUSED: 3,
	GAMEOVER: 4,
	heroLife: 3,
	score: 0,
	HEIGHT: canvas.height
}

// load game assets

var bgImage = new Image()
bgImage.src = "./assets/background.png"
