class SelectionScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'SelectionScene' });
    }

    preload () {
        this.load.image('bg', 'assets/images/title_background.png');
        this.load.image('advance', 'assets/menu/advance.png');
        this.load.image('sound_on', 'assets/menu/sound_on.png');
        this.load.image('sound_off', 'assets/menu/sound_off.png');
        this.load.audio('bg_music', 'assets/music/loading_adventure-beyond.mp3');
    }

    create () {
        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();

        let choose = this.add.image(600, 400, 'advance');
        choose.setScale(3.5);
        choose.setInteractive();
        choose.on('pointerdown', () => {
            this.scene.start('Level1Scene')
        });
        choose.on('pointerover', () => choose.setTint(0xcccccc));
        choose.on('pointerout', () => choose.setTint(0xffffff));

        let vol = this.add.image(1050, 30, 'sound_on');
        this.add.text(1023, 60, 'volume', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        vol.setScale(1.5);
        vol.setInteractive();
        vol.on('pointerdown', () => {
            if(music.isPlaying) {
                vol.setTexture('sound_off');
                music.pause();
            } else {
                vol.setTexture('sound_on');
                music.resume();
            }
        });
        vol.on('pointerover', () => vol.setTint(0xcccccc));
        vol.on('pointerout', () => vol.setTint(0xffffff));
    }

    update () {

    }
}

export default SelectionScene