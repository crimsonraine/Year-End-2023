class TitleScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'TitleScene' });
    }

    preload () {
        this.load.image('bg', 'assets/skies/space3.png');
    }

    create () {
        this.scene.start('Level1Scene');
    }
}

export default TitleScene