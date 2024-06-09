class GreetingScene extends Phaser.Scene {
    constructor () {
        super({ key: 'GreetingScene' });
    }

    preload () {
        this.load.image('dialogue_background', 'assets/images/dialogue_background.png');
        this.load.image('next_button', 'assets/menu/advance.png');

        this.load.spritesheet('atelle_idle', 'assets/sprites/atelle/idle_right.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('kirin_idle', 'assets/sprites/kirin/idle.png', { frameWidth: 80, frameHeight: 67 });

        this.load.scenePlugin('DialogModalPlugin', 'src/dialog_plugin.js');
    }
    
    create () {
        this.add.image(600, 330, 'dialogue_background').setScale(2.35).setOrigin(.5, .5);

        this.dialogModal.init();
        
        const playerName = this.game.playerName;

        let list = [
            "GUARD: Greetings! What brings you to this part of the forest?", 
            `${playerName}: I think I'm lost.`, 
            "GUARD: Is that so? Where are you supposed to be?", 
            `${playerName}: I don’t know. What’s the nearest town?`,
            "GUARD: That would be The Town of Vrillage. I can take you there if you’d like.",
            `${playerName}: Really? Thanks!`,
            `${playerName}: What's your name again?`,
            "KIRIN: Kirin.",
        ]
        let i = 0;

        let next_button = this.add.image(1120, 580, 'next_button').setScale(2);
        next_button.setInteractive();
        next_button.on('pointerover', () => next_button.setTint(0xcccccc));
        next_button.on('pointerout', () => next_button.setTint(0xffffff));
        next_button.on('pointerdown', () => {
            if (i == 8) {
                this.scene.start('MapScene');
            }
            else {
                this.dialogModal.setText(list[i], true);
                i += 1;
            }
        });

        this.anims.create({
            key: 'atelle_idle',
            frames: this.anims.generateFrameNumbers('atelle_idle', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'kirin_idle',
            frames: this.anims.generateFrameNumbers('kirin_idle', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        this.atelle = this.physics.add.sprite(850, 355, 'atelle_idle').setScale(8);
        this.kirin = this.physics.add.sprite(1030, 310, 'kirin_idle').setScale(3.7);
    }

    update () {
        this.atelle.anims.play('atelle_idle', true);
        this.kirin.anims.play('kirin_idle', true);
    }
}

export default GreetingScene