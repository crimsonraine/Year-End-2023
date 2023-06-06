import TitleScene from './title.js'
// import LevelScene from '.level.js'
import FightScene from './fight.js'

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 660,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        TitleScene,
        FightScene
    ]
};

const game = new Phaser.Game(config);