class SelectionScene extends Phaser.Scene {  
    constructor () {
        super({ key: 'SelectionScene' });
        
    }

    preload () {
        this.load.image('dialogue_background', 'assets/images/dialogue_background.png');
        this.load.image('next_button', 'assets/menu/advance.png');
        this.load.spritesheet('atelle_idles', 'assets/sprites/atelle/idle_right.png', { frameWidth: 20, frameHeight: 34 });
        this.load.image('char', 'assets/sprites/placeholder.png');
        this.load.image('chars', 'assets/sprites/placeholder2.png');
        this.load.image('advance', 'assets/menu/advance.png');
        this.load.image('sound_on', 'assets/menu/sound_on.png');
        this.load.image('sound_off', 'assets/menu/sound_off.png');
        this.load.audio('bg_music', 'assets/music/loading_adventure-beyond.mp3');

        this.load.scenePlugin('DialogModalPlugin', 'src/dialog_plugin.js');
    }

    create () {
        this.add.image(600, 330, 'bg').setScale(5.45).setOrigin(.5, .5);
        this.bg = this.add.image(600, 330, 'dialogue_background').setScale(2.35).setOrigin(.5, .5);
        this.bg.visible = true;

        this.dialogModal.init();
        
        let list = [
            "Welcome to Sonapath!", 
            "Before you begin your adventure, please select your starting character.", 
            "Some characters are locked, but as you advance in your journey, you'll be able to unlock them.",
            "Select your player to begin!", 
        ]
        let i = 0;
        
        let next_button = this.add.image(1120, 580, 'next_button').setScale(2);
        next_button.visible = true;
        next_button.setInteractive();
        next_button.on('pointerover', () => next_button.setTint(0xcccccc));
        next_button.on('pointerout', () => next_button.setTint(0xffffff));
        next_button.on('pointerdown', () => {
            this.dialogModal.setText(list[i], true);
            i += 1;
        });

        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();

        this.add.image(1025, 360, 'char').setScale(5.5).setTint(0x9c9c9c);
        this.add.image(890, 310, 'chars').setScale(5.5).setTint(0x9c9c9c);
        let unlock = this.physics.add.sprite(725, 360, 'atelle_idles').setScale(8);
        unlock.setInteractive();
        unlock.on('pointerdown', () => {
            this.scene.start('OpeningScene')
        });
        
        unlock.on('pointerover', () => unlock.setTint(0xcccccc));
        unlock.on('pointerout', () => unlock.setTint(0xffffff));

        let vol = this.add.image(1170, 30, 'sound_on');
        this.add.text(1138, 55, 'volume', { fontFamily: 'Courier New' });
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