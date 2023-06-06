import TitleScene from './title.js'
import Level1Scene from './level1scene.js'
import FightScene from './fight.js'

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 660,
    pixelArt: true,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        TitleScene,
        Level1Scene,
        FightScene
    ]
};

const game = new Phaser.Game(config);