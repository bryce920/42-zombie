function initLevel(numButterflies) {
	var newLevel = {};
	var maxButterflies=numButterflies;
	newLevel.maxScore = numButterflies;
	newLevel.currentScore = 0;

	// start the background at the top left edge
	newLevel.background = {
		x: 0,
		y: 0
	};

	// background image
	backgroundImg = new Image();
	backgroundImg.onload = function () {
		// make the size of the level accessible to the game
		newLevel.background.width = backgroundImg.width;
		newLevel.background.height = backgroundImg.height;
		generateButterflies();
	};

	function generateButterflies() {
		if(maxButterflies<=1000){
		newLevel.butterflies = [];
		// place butterflies randomly throughout the level
		for (var i = 0; i < newLevel.maxScore; i++) {
			newLevel.butterflies.push(initButterfly((Math.random() * (level.background.width - canvas.width)) + 600,
				(Math.random() * (level.background.height/2)) + 50));
		}
	 }
	}

	newLevel.update = function () {
		// we need to move our background in relation to the player
		// 0 + width/2 -> don't move the background
		if (player.x <= (canvas.width / 2) - (player.width /2)) {
			newLevel.background.x = 0;
		}
		// background.width - width/2 -> don't move the background
		else if (player.x >= level.background.width - (canvas.width / 2) - (player.width /2)) {
			newLevel.background.x = -(level.background.width - canvas.width);
		}
		// anything in between -> move both the background and the player
		else {
			level.background.x -= player.xVelocity;
		}

		// update the butterflies that are on screen
			
		for (var index in level.butterflies) {
			var butterfly = level.butterflies[index];
			if (!butterfly.captured) {
				if (butterfly.x >= -(level.background.x) - butterfly.width && butterfly.x <= -(level.background.x) + canvas.width) {
					butterfly.canvasX = butterfly.x + level.background.x;
					butterfly.canvasY = butterfly.y ;
				}if(butterfly.y >=canvas.height/2-500){
				butterfly.canvasY = butterfly.y += -0.05 ;
				
			   // butterfly.y= canvas.height;
					
			    }else {
					butterfly.canvasX = undefined;
					butterfly.canvasY = undefined;
				}
			}
		
		}
	};

	newLevel.render = function () {
		// draw the background
		context.drawImage(backgroundImg, newLevel.background.x, newLevel.background.y);

		// update and render our butterflies
		for (index in level.butterflies) {
			butterfly = level.butterflies[index];
			if (player.collisionCheck(butterfly)) {
				incrementScore(butterfly);
				  
			}
			// update and render our butterflies, if they have loaded.
			if (butterfly.update && butterfly.render && !butterfly.captured) {
				butterfly.update();
				butterfly.render();
			}
		}
	};

	newLevel.reset = function(newMaxScore) {
		newLevel.maxScore = newMaxScore;
		newLevel.currentScore = 0;
		// make new butterflies
		generateButterflies();
		// reset background x, y
		newLevel.background.x = 0;
		newLevel.background.y = 0;
	};

	backgroundImg.src = "imgs/background.png";

	return newLevel;
}