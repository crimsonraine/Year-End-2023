class TitleScene extends Phaser.Scene
{
    constructor () {
        super({ key: 'TitleScene' });
    }

    preload () {
        this.load.image('bg', 'assets/images/title_background2.jpg');
        this.load.image('title', 'assets/images/sonapath2.png');
        this.load.image('play_button', 'assets/menu/play.png');
        this.load.image('sound_on', 'assets/menu/sound_on.png');
        this.load.image('sound_off', 'assets/menu/sound_off.png');
        this.load.audio('bg_music', 'assets/music/loading_adventure-beyond.mp3');
    }

    create () {
        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();

        this.add.image(600, 330, 'bg').setScale(0.9).setOrigin(.5, .5);
        this.add.image(600, 330, 'bg').setScale(5.45).setOrigin(.5, .5);

        this.title = this.add.image(820, 260, 'title');
        this.title.setScale(1);

        let play = this.add.image(600, 520, 'play_button');
        play.setScale(3.5);
        play.setInteractive();
        play.on('pointerdown', () => this.scene.start('SelectionScene'));
        play.on('pointerover', () => play.setTint(0xcccccc));
        play.on('pointerout', () => play.setTint(0xffffff));

        let vol = this.add.image(1170, 30, 'sound_on');
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
}

export default TitleScene