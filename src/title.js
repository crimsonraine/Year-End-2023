class TitleScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'TitleScene' });
    }

    preload () {
        this.load.image('bg', 'assets/images/space3.png');
    }

    create () {
        this.add.image(600, 330, 'back').setScale(1.45).setOrigin(.5, .5);
    }
}

export default TitleScene