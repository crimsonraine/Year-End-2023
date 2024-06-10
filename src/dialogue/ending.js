class EndingScene extends Phaser.Scene {
    constructor () {
        super({ key: 'EndingScene' });
    }

    init (data) {
        this.character = data.character;
    }

    preload () {
        this.load.image('dialogue_background', 'assets/images/dialogue_background.png');
        this.load.image('next_button', 'assets/menu/advance.png');

        this.load.spritesheet('player_A_idle', 'assets/sprites/A/idle_right.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('player_B_idle', 'assets/sprites/B/idle_right.png', { frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('kirin_idle', 'assets/sprites/kirin/idle.png', { frameWidth: 80, frameHeight: 67 });

        this.load.scenePlugin('DialogModalPlugin', 'src/dialog_plugin.js');
    }
    
    create () {
        this.add.image(600, 330, 'dialogue_background').setScale(2.35).setOrigin(.5, .5);

        this.anims.create({
            key: 'player_A_idle',
            frames: this.anims.generateFrameNumbers('player_A_idle', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_B_idle',
            frames: this.anims.generateFrameNumbers('player_B_idle', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'kirin_idle',
            frames: this.anims.generateFrameNumbers('kirin_idle', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        if (this.character == 'A') {
            this.atelle = this.physics.add.sprite(850, 355, ('player_' + this.character + '_idle')).setScale(8);
        }
        else {
            this.atelle = this.physics.add.sprite(800, 355, ('player_' + this.character + '_idle')).setScale(8);
        }
        
        this.kirin = this.physics.add.sprite(1030, 310, 'kirin_idle').setScale(3.7);

        this.dialogModal.init();
        
        const playerName = this.game.playerName;

        let list = [
            "KIRIN: Here we are, the gates of The Town of Vrillage. Hopefully, you can find the answers you are looking for.", 
            `${playerName}: Thank you for all your help.`, 
            "KIRIN: Anytime.",
            `${playerName}: Well, here goes nothing.`
        ]
        let i = 0;

        let next_button = this.add.image(1120, 580, 'next_button').setScale(2);
        next_button.setInteractive();
        next_button.on('pointerover', () => next_button.setTint(0xcccccc));
        next_button.on('pointerout', () => next_button.setTint(0xffffff));
        next_button.on('pointerdown', () => {
            if (i == 3) {
                this.kirin.visible = false;
                this.dialogModal.setText(list[i], true);
                i += 1;
            }
            else if (i == 4) {
                this.atelle.visible = false;
            }
            else {
                this.dialogModal.setText(list[i], true);
                i += 1;
            }
        });
    }

    update () {
        this.atelle.anims.play(('player_' + this.character + '_idle'), true);
        this.kirin.anims.play('kirin_idle', true);
    }
}

export default EndingScene