var loadState = {
	preload: function(){
		var txtLoading = this.add.text(game.config.width/2-50,170,'LOADING...');
	
		//var progressBar = this.add.sprite(game.config.width/2, 200,'progressBar');
					
		this.load.image('bg','img/bg.png');
		this.load.image('block','img/block.png');
		this.load.image('end','img/end.png');
		this.load.image('part','img/part.png');
		
		this.load.spritesheet('coin','img/coin.png',{ frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('enemy','img/enemy.png',{ frameWidth: 24, frameHeight: 40 });
		this.load.spritesheet('player','img/player.png',{ frameWidth: 24, frameHeight: 32 });
		
		this.load.audio('getItem','sfx/getitem.ogg');
		this.load.audio('loseItem','sfx/loseitem.ogg');
		this.load.audio('music','sfx/music.ogg');
	},
	create: function(){
		this.scene.start('menu')
	}

};
