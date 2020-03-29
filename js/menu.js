var menuState = {
    create: function(){
        this.music = this.sound.add('music').play({loop: true, volume: .5});

        var text = this.add.text(game.config.width/2, 170, "LABIRINTO");
        text.setOrigin(.5);
        var txtPressStart = this.add.text(game.config.width/2, 450, "Press start");
        txtPressStart.setOrigin(.5)
        var tween = this.tweens.add({
            targets: txtPressStart,
            y: 250,
            ease: 'Power1',
            duration: 1000,
        });

        this.time.addEvent({ delay: 1000, callback: function(){
            let gameScope = this;
            this.input.keyboard.on('keydown', function (event) {
                if (event.keyCode === 13){
                    gameScope.music.stop();
                    gameScope.scene.start('stage1');
                }
        
            });
        }, callbackScope: this });
    },
    startGame: function(){
        this.music.stop();
        game.scene.start('stage1');
    }
}