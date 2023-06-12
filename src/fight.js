class FightScene extends Phaser.Scene {
    constructor () {
        super({ key: 'FightScene' });
    }

    preload () {
        this.load.image('chibi', 'assets/sprites/placeholder.png');
        this.load.image('troll', 'assets/sprites/placeholder2.png');
        this.load.image('background', 'assets/images/battle_background1.png');
        this.load.image('textbox', 'assets/images/textbox.png');
    }

    create () {
        function checkWinner () {
            if (chibi_hp == 0) {
                return 'troll';
            }
            else if (troll_hp == 0) {
                return 'chibi';
            }
        }


        function attack (damage, weapon) {
            troll_hp -= damage; 
            troll_text.setText(troll_hp + "/100");
            dialogue.setText("CHIBI uses " + weapon + "!");

            this.time.addEvent({
                delay : 3000,
                callback : () => {
                    chibi_hp -= Math.floor(Math.random() * (chibi_hp / 2));
                    chibi_text.setText(chibi_hp + "/100");
                    dialogue.setText("TROLL uses KICK!");
                },
                callbackScope : this
            });

            // if (checkWinner().equals('chibi')) {
            //     this.scene.start('LevelScene', 'chibi win');
            // }
            // else if (checkWinner().equals('troll')) {
            //     this.scene.start('LevelScene', 'troll win');
            // }
            // else {
            //     dialogue.setText("What will CHIBI do?");
            // }

            this.time.addEvent({
                delay : 3000,
                callback : () => {
                    dialogue.setText("What will CHIBI do?");
                },
                callbackScope : this
            });
        }

        this.add.image(600, 330, 'background').setScale(1.225).setOrigin(.5, .5);

        let chibi_hp = 100;
        let troll_hp = 100; 

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(5, 0x5f3b39);
        this.graphics.fillStyle(0x907058, 1);    

        /* SWORD ATTACK BUTTON */
        this.graphics.strokeRect(820, 500, 160, 60);
        this.graphics.fillRect(820, 501, 159, 59);
        let sword_button = this.add.text(845, 520, 'SWORD', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
        sword_button.setInteractive();
        sword_button.on('pointerover', () => sword_button.setStyle({fill : '#ffffff'}));
        sword_button.on('pointerout', () => sword_button.setStyle({fill : '#5f3b39'}));
        sword_button.on('pointerdown', () => attack(20, 'SWORD'));
        
        /* ROCK ATTACK BUTTON */
        this.graphics.strokeRect(990, 500, 160, 60);
        this.graphics.fillRect(990, 501, 159, 59);
        let rock_button = this.add.text(1026, 520, 'ROCK', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
        rock_button.setInteractive();
        rock_button.on('pointerover', () => rock_button.setStyle({fill : '#ffffff'}));
        rock_button.on('pointerout', () => rock_button.setStyle({fill : '#5f3b39'}));
        rock_button.on('pointerdown', () => attack(5, 'ROCK'));

        /* HAMMER ATTACK BUTTON */
        this.graphics.strokeRect(990, 570, 160, 60);
        this.graphics.fillRect(990, 571, 159, 59);
        let hammer_button = this.add.text(835, 590, 'HAMMER', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
        hammer_button.setInteractive();
        hammer_button.on('pointerover', () => hammer_button.setStyle({fill : '#ffffff'}));
        hammer_button.on('pointerout', () => hammer_button.setStyle({fill : '#5f3b39'}));
        hammer_button.on('pointerdown', () => attack(10, 'HAMMER'));

        /* RUN AWAY BUTTON */
        this.graphics.strokeRect(820, 570, 160, 60);
        this.graphics.fillRect(820, 571, 159, 59);
        let run_button = this.add.text(1036, 590, 'RUN', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
        run_button.setInteractive();
        run_button.on('pointerover', () => run_button.setStyle({fill : '#ffffff'}));
        run_button.on('pointerout', () => run_button.setStyle({fill : '#5f3b39'}));
        // run_button.on('pointerdown', () => this.scene.start('LevelScene', 'chibi ran'));

        let chibi = this.add.image(350, 400, 'chibi').setScale(5);
        let troll = this.add.image(820, 280, 'troll').setScale(5);

        this.graphics.fillStyle(0xb8a79a, 1); 

        /* DIALOGUE TEXTBOX */
        this.add.image(420, 566, 'textbox').setScale(3);
        let dialogue = this.add.text(90, 550, 'What will CHIBI do?', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(2);

        /* CHIBI TEXTBOX */
        this.add.image(220, 230, 'textbox').setScale(1.2);
        this.add.text(90, 220, 'CHIBI', {fontFamily: 'Press-Start-2P', fill : '#6b5341'}).setScale(1.1);
        this.add.text(207, 220, 'HP:', {fontFamily: 'Press-Start-2P', fill : '#295b3e'}).setScale(1.1);
        let chibi_text = this.add.text(257, 223, chibi_hp + '/100', {fontFamily: 'Press-Start-2P', fill : '#295b3e'}).setScale(0.75);

        /* TROLL TEXTBOX */
        this.add.image(952, 125, 'textbox').setScale(1.17);
        this.add.text(826, 115, 'TROLL', {fontFamily: 'Press-Start-2P', fill : '#6b5341'}).setScale(1.1);
        this.add.text(938, 115, 'HP:', {fontFamily: 'Press-Start-2P', fill : '#295b3e'}).setScale(1.1);
        let troll_text = this.add.text(988, 118, troll_hp + '/100', {fontFamily: 'Press-Start-2P', fill : '#295b3e'}).setScale(0.75);
    }

    update () {

    }
}

export default FightScene