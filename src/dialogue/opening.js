class GreetingScene extends Phaser.Scene {
    constructor () {
        super({ key: 'OpeningScene' });
    }

    preload () {
        this.load.image('dialogue_background', 'assets/images/dialogue_background.png');
        this.load.image('next_button', 'assets/menu/advance.png');

        this.load.spritesheet('atelle_idle', 'assets/sprites/atelle/idle_right.png', { frameWidth: 48, frameHeight: 34 });

        this.load.scenePlugin('DialogModalPlugin', 'src/dialog_plugin.js');
    }
    
    create () {
        this.bg = this.add.image(600, 330, 'dialogue_background').setScale(2.35).setOrigin(.5, .5);
        this.atelle = this.physics.add.sprite(850, 355, 'atelle_idle').setScale(8);
        this.bg.visible = false;
        this.atelle.visible = false;

        this.dialogModal.init();
        
        let list = [
            "ATELLE: Where...am I?", 
            "ATELLE: How did I get here?", 
            "ATELLE: This doesn't look like home...", 
        ]
        let i = 0;

        let next_button = this.add.image(1120, 580, 'next_button').setScale(2);
        next_button.setInteractive();
        next_button.on('pointerover', () => next_button.setTint(0xcccccc));
        next_button.on('pointerout', () => next_button.setTint(0xffffff));
        next_button.on('pointerdown', () => {
            if (i == 1) {
                this.bg.visible = true;
                this.atelle.visible = true;
                this.dialogModal.setText(list[i], true);
                i += 1;
            }
            else if (i == 3) {
                this.scene.start('GreetingScene');
            }
            else {
                this.dialogModal.setText(list[i], true);
                i += 1;
            }
        });
    }
}

export default GreetingScene