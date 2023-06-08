class TitleScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'TitleScene' });
    }

    preload () {
        this.load.image('bg', 'assets/images/title_background.jpg');
    }

    create () {
        this.add.image(600, 330, 'bg').setScale(1.45).setOrigin(.5, .5);

        this.title = this.add.image(600, 200, 'title');
        this.title.setScale(0.5);

        let play = this.add.image(600, 400, 'play_button');
        play.setInteractive();
        play.on('pointerdown', () => this.scene.start('FightScene'));
        play.on('pointerover', () => play.setTint(0xcccccc));
        play.on('pointerout', () => play.setTint(0xffffff));
    }
}

export default TitleScene