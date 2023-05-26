import TitleScene from './title.js'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [
        TitleScene,
        GameScene
    ]
};

const game = new Phaser.Game(config);