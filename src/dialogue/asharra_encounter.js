class EncounterScene extends Phaser.Scene {
    constructor () {
        super({ key: 'EncounterScene' });
    }

    init (data) {
        this.character = data.character;
    }

    preload () {
        this.load.image('dialogue_background', 'assets/images/dialogue_background.png');
        this.load.image('next_button', 'assets/menu/advance.png');

        this.load.spritesheet('player_A_idle', 'assets/sprites/A/idle_right.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('player_B_idle', 'assets/sprites/B/idle_right.png', { frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('asharra_idle', 'assets/sprites/asharra/idle_left.png', { frameWidth: 64, frameHeight: 45});
        this.load.spritesheet('kirin_idle_right', 'assets/sprites/kirin/idle_right.png', { frameWidth: 80, frameHeight: 67 });

        this.load.scenePlugin('DialogModalPlugin', 'src/dialog_plugin.js');
    }
    
    create () {
        this.add.image(600, 330, 'dialogue_background').setScale(2.35).setOrigin(.5, .5);

        this.dialogModal.init();
        
        const playerName = this.game.playerName;

        let list = [
            "ASHARRA: Who goes there?", 
            `${playerName}: Hello! I'm looking to go to The Town of Vrillage.`, 
            "ASHARRA: Is that so? I'm afraid you don't even belong there. The Town of Vrillage is my home.", 
            `${playerName}: Please let me cross, I need to get back home.`,
            "ASHARRA: I don't think so. Beat me in a fight and I'll let you through.",
            "KIRIN: Go find a weapon to fight them!",
            `${playerName}: ...`,
        ]
        let i = 0;

        let next_button = this.add.image(1120, 580, 'next_button').setScale(2);
        next_button.setInteractive();
        next_button.on('pointerover', () => next_button.setTint(0xcccccc));
        next_button.on('pointerout', () => next_button.setTint(0xffffff));
        next_button.on('pointerdown', () => {
            if (i == 7) {
                this.scene.start('MapScene', {character : this.character, startBeforeFight : true});
            }
            else {
                this.dialogModal.setText(list[i], true);
                i += 1;
            }
        });

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
            key: 'asharra_idle',
            frames: this.anims.generateFrameNumbers('asharra_idle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'kirin_idle_right',
            frames: this.anims.generateFrameNumbers('kirin_idle_right', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        if (this.character == 'A') {
            this.atelle = this.physics.add.sprite(910, 355, ('player_' + this.character + '_idle')).setScale(8);
        }
        else {
            this.atelle = this.physics.add.sprite(840, 355, ('player_' + this.character + '_idle')).setScale(8);
        }

        this.kirin = this.physics.add.sprite(750, 355, 'kirin_idle_right').setScale(3.7);
        this.asharra = this.physics.add.sprite(1150, 300, 'asharra_idle').setScale(8);
    }

    update () {
        this.atelle.anims.play(('player_' + this.character + '_idle'), true);
        this.kirin.anims.play('kirin_idle_right', true);
        this.asharra.anims.play('asharra_idle', true);
    }
}

export default EncounterScene