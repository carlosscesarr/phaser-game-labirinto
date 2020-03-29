var stage1State = {
    create: function(){
        this.add.sprite(game.config.width/2,game.config.height/2,'bg');
        this.sound.add('music').play({loop: true, volume: .5});
        stage1State.getItemSound = this.sound.add('getItem');
        console.log(Phaser);

        
        stage1State.maze = [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,3,0,0,0,0,0,0,0,0,0,0,0,3,1],
			[1,0,1,1,0,1,0,1,1,1,0,1,1,0,1],
			[1,0,1,3,0,1,3,0,0,1,0,3,1,0,1],
			[1,0,0,0,1,1,1,1,0,1,0,1,1,0,1],
			[1,0,0,0,0,1,0,2,0,0,0,0,0,0,1],
			[1,0,1,3,0,0,0,0,1,0,0,3,1,0,1],
			[1,0,1,1,1,1,0,1,1,0,1,1,1,0,1],
			[1,3,0,0,0,0,0,3,1,0,0,0,0,3,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        
        this.anims.create({

            key: 'goDown',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7}),
            frameRate: 12,
        });

        this.anims.create({

            key: 'goUp',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15}),
            frameRate: 12,
        });

        this.anims.create({

            key: 'goLeft',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 23 }),
            frameRate: 12,
        });
        

        this.anims.create({

            key: 'goRight',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 31 }),
            frameRate: 12
        });
        this.anims.create({

            key: 'goDownE',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 7}),
            frameRate: 12,
        });

        this.anims.create({

            key: 'goUpE',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 15}),
            frameRate: 12,
        });

        this.anims.create({

            key: 'goLeftE',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', { start: 16, end: 23 }),
            frameRate: 12,
        });
        

        this.anims.create({

            key: 'goRightE',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', { start: 24, end: 31 }),
            frameRate: 12
        });

        this.anims.create({

            key: 'coin',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 9 }),
            frameRate: 10
        });
		
        stage1State.blocks = this.physics.add.group({ immovable: true });
        //stage1State.blocks.enableBody = true;
        stage1State.coinPositions = [];
		
		for(var row in stage1State.maze){
			for(var col in stage1State.maze[row]){
				var tile = stage1State.maze[row][col];
				
				var x = col * 50;
				var y = row * 50;
				
				if(tile === 1) {
                    var block = stage1State.blocks.create(x,y,'block');
                    block.setOrigin(0,0)
                } else if(tile === 2) {
                    stage1State.player = this.physics.add.sprite(x+25,y+25,'player',0)

				} else if (tile === 3) {
                    var position = {
                        x: x + 25,
                        y: y + 25
                    }
                    stage1State.coinPositions.push(position);
                }
			}
        }

        //Inimigo
        stage1State.enemy = this.physics.add.sprite(75,75,'enemy');
		stage1State.enemy.direction = 'down';

        stage1State.coin = {}
        stage1State.coin.position = stage1State.newPosition();
        stage1State.coin = this.physics.add.sprite(stage1State.coin.position.x, stage1State.coin.position.y, 'coin');
        stage1State.coin.setImmovable();
        stage1State.coin.anims.play('coin')

        stage1State.coins = 0;
        stage1State.txtCoins = this.add.text(0,0,"Score: "+stage1State.coins);
        stage1State.controls = this.input.keyboard.createCursorKeys();
    },
    update: function(){
        
        this.physics.add.collider(stage1State.player,stage1State.blocks);
        this.physics.add.collider(stage1State.enemy,stage1State.blocks);
        this.physics.add.overlap(stage1State.enemy,stage1State.player);
        this.physics.add.collider(stage1State.player,stage1State.coin, stage1State.getCoin);
        stage1State.movePlayer();
        stage1State.moveEnemy();
        
    },
    getCoin: function(){
        stage1State.getItemSound.play();
        //coin.destroy();
        stage1State.coins++;
        stage1State.getTextScore();
        let newPosition = stage1State.newPosition();
        stage1State.coin.setPosition(newPosition.x,newPosition.y);
    },
    getTextScore: function(){
        stage1State.txtCoins.setText('Score: '+stage1State.coins)
    },
    movePlayer: function(){
       
        const key = stage1State.controls;
        stage1State.player.body.velocity.x = 0
        stage1State.player.body.velocity.y = 0
        
        if (key.left.isDown && !key.right.isDown) {
            stage1State.player.body.velocity.x = -100
            stage1State.player.direction = "left"
        }
        else if (key.right.isDown && !key.left.isDown) {
            stage1State.player.body.velocity.x = 100
            stage1State.player.direction = "right"
        }
        else if (key.up.isDown && !key.down.isDown) {
            stage1State.player.body.velocity.y = -100
            stage1State.player.direction = "up"
        }
        else if (key.down.isDown && !key.up.isDown) {
            stage1State.player.body.velocity.y = 100
            stage1State.player.direction = "down"
        }

        switch (stage1State.player.direction) {
            case "left":
                //stage1State.player.animations.play("goLeft")
                stage1State.player.anims.play("goLeft", true)
                break;
            case "right":
                //stage1State.player.animations.play("goRight")
                stage1State.player.anims.play("goRight", true)
                break;
            case "up":

                stage1State.player.anims.play("goUp", true)
                break;
                case "down":
                    stage1State.player.anims.play("goDown", true)
                //stage1State.player.animations.play("goDown")
                break;
            default:
                break;
        }

        if (stage1State.player.body.velocity.x === 0 && stage1State.player.body.velocity.y === 0) {
            stage1State.player.anims.stop();
        }

        
    },
    newPosition: function(){
        return stage1State.coinPositions[Math.floor(Math.random() * stage1State.coinPositions.length)];
    },
    moveEnemy: function(){

        if(Math.floor(stage1State.enemy.x -25)%50 === 0 && Math.floor(stage1State.enemy.y -25)%50 === 0){
			var enemyCol = Math.floor(stage1State.enemy.x/50);
			var enemyRow = Math.floor(stage1State.enemy.y/50);
			var validPath = [];
			
			if(stage1State.maze[enemyRow][enemyCol-1] !== 1 && stage1State.enemy.direction !== 'right'){
				validPath.push('left');
			}
			if(stage1State.maze[enemyRow][enemyCol+1] !== 1 && stage1State.enemy.direction !== 'left'){
				validPath.push('right');
			}
			if(stage1State.maze[enemyRow-1][enemyCol] !== 1 && stage1State.enemy.direction !== 'down'){
				validPath.push('up');
			}
			if(stage1State.maze[enemyRow+1][enemyCol] !== 1 && stage1State.enemy.direction !== 'up'){
				validPath.push('down');
			}
			
			stage1State.enemy.direction = validPath[Math.floor(Math.random()*validPath.length)];
        }

        switch (stage1State.enemy.direction) {
            case "left":
                this.enemy.x -= 1;
                stage1State.enemy.anims.play("goLeftE", true)
                break;
            case "right":
                this.enemy.x += 1;
                stage1State.enemy.anims.play("goRightE", true)
                break;
            case "up":
                this.enemy.y -= 1;
                stage1State.enemy.anims.play("goUpE", true)
                break;
                case "down":
                    this.enemy.y += 1;
                    stage1State.enemy.anims.play("goDownE", true)
                break;
            default:
                break;
        }
    },
}