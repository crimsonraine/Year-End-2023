import TitleScene from './title.js'
import SelectionScene from './selectionscene.js'
import Level1Scene from './level1scene.js'
import FightScene from './fight.js'

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 660,
    backgroundColor: '#000000',
    pixelArt: true,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        TitleScene,
        SelectionScene,
        Level1Scene,
        FightScene,
        // pack: {
        //     files: [
        //         { type: 'DialogModalPlugin', key: 'dialogModal', url: '/src/dialog_plugin.js' }
        //     ]
        // }
    ],
    audio: {
        disableWebAudio: true
    }
};

const game = new Phaser.Game(config);