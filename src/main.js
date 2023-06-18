import TitleScene from './title.js'
import SelectionScene from './selection.js'
import MapScene from './map.js'
import FightScene from './fight.js'
// import PracticeScene from './practicescene.js'
// this.load.plugin('DialogModalPlugin', '/src/dialog_plugin.js');

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
    scene:
        [
        TitleScene,
        // PracticeScene,
        SelectionScene,
        MapScene,
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