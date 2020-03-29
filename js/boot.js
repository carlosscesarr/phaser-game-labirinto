var bootState = {
    preload: function(){
        this.load.image('progresBar', 'img/progressBar.png')
    },
    create: function(){
        this.scene.start('load');
    }
}