import TitleScene from './title.js'
import SelectionScene from './selection.js'
import OpeningScene from './dialogue/opening.js'
import GreetingScene from './dialogue/greeting.js'
import MapScene from './map.js'
import EncounterScene from './dialogue/asharra_encounter.js'
import BeforeFightScene from './dialogue/before_fight.js'
import FightScene from './fight.js'
import LostFightScene from './dialogue/lost_fight.js'
import WonFightScene from './dialogue/won_fight.js'
import EndingScene from './dialogue/ending.js'

import DialogModalPlugin from './dialog_plugin.js'

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
        SelectionScene,
        OpeningScene,
        GreetingScene,
        MapScene,
        EncounterScene,
        BeforeFightScene,
        FightScene,
        LostFightScene,
        WonFightScene,
        EndingScene
    ],
    plugins: {
        scene: [
          {
            key: 'DialogModalPlugin',
            plugin: DialogModalPlugin,
            mapping: 'dialogModal'
          }
        ]
    },
    audio: {
        disableWebAudio: true
    }
};

const game = new Phaser.Game(config);