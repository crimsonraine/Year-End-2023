class TitleScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'TitleScene' });
    }

    preload () {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
    }

    create () {
        this.scene.start('FightScene');
    }
}

export default TitleScene