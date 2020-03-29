var configGame = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade'
    },
    width: 750,
    height: 500,
}
var game = new Phaser.Game(configGame);

game.scene.add('boot',bootState);
game.scene.add('load',loadState);
game.scene.add('menu',menuState);
game.scene.add('stage1',stage1State);
game.scene.add('end',endState);

game.scene.start('boot');
/*

function preload(){
    
    this.load.image('bg', 'img/bg.png');
    this.load.image('end', 'img/end.png');
    this.load.image('part', 'img/part.png');


    this.load.spritesheet('coin','img/coin.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('enemy','img/enemy.png', { frameWidth: 24, frameHeight: 40 });
    this.load.spritesheet('player','img/player.png', { frameWidth: 24, frameHeight: 32 });
    
    this.load.audio('getItem','sfx/getItem.ogg');
    this.load.audio('loseItem','sfx/loseItem.ogg');
    this.load.audio('music','sfx/music.ogg');
    
    this.add.text(game.config.width/2, 170, "LOADING...");
}

function create(){
    this.add.text(game.config.width/2, 170, "LABIRINTO");
}

function update(){

}
*/
