class FightScene extends Phaser.Scene {
    constructor () {
        super({ key: 'FightScene' });
    }

    init (data) {
        this.character = data.character;
        this.hasRock = data.hasRock;
        this.hasHammer = data.hasHammer;
        this.hasSword = data.hasSword;
    }

    preload () {
        this.load.image('battle_background', 'assets/images/battle_background1.png');
        this.load.image('textbox', 'assets/images/textbox.png');


        this.load.spritesheet('player_A_idle', 'assets/sprites/A/idle_right.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('player_A_fight', 'assets/sprites/A/fight_right.png', { frameWidth: 45, frameHeight: 34 });

        this.load.spritesheet('player_B_idle', 'assets/sprites/B/idle_right.png', { frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('player_B_fight', 'assets/sprites/B/fight_right.png', { frameWidth: 31, frameHeight: 34 });

        this.load.spritesheet('asharra_idle', 'assets/sprites/asharra/idle_left.png', { frameWidth: 64, frameHeight: 45});
        this.load.spritesheet('asharra_fight', 'assets/sprites/asharra/fight_left.png', { frameWidth: 64, frameHeight: 43})
    }

    create () {
        const playerName = this.game.playerName;

        this.atelleFight = false;
        this.asharraFight = false;

        this.add.image(600, 330, 'battle_background').setScale(1.225).setOrigin(.5, .5);

        let atelle_hp = 100;
        let asharra_hp = 100; 

        /* DIALOGUE TEXTBOX */
        this.add.image(420, 566, 'textbox').setScale(3);
        let dialogue = this.add.text(90, 550, `What will ${playerName} do?`, {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.9);

        /* ATELLE TEXTBOX */
        this.add.image(220, 229, 'textbox').setScale(1.2);
        this.add.text(90, 220, playerName, {fontFamily: 'Press-Start-2P', fill : '#6b5341'}).setScale(1.1);
        this.add.text(207, 220, 'HP:', {fontFamily: 'Press-Start-2P', fill : '#295b3e'}).setScale(1.1);
        let atelle_text = this.add.text(260, 222, atelle_hp + '/100', {fontFamily: 'Press-Start-2P', fill : '#295b3e'}).setScale(0.75);

        /* ASHARRA TEXTBOX */
        this.add.image(952, 125, 'textbox').setScale(1.25);
        this.add.text(817, 117, 'ASHARRA', {fontFamily: 'Press-Start-2P', fill : '#6b5341'}).setScale(1.1);
        this.add.text(950, 117, 'HP:', {fontFamily: 'Press-Start-2P', fill : '#295b3e'}).setScale(1.1);
        let asharra_text = this.add.text(1000, 119, asharra_hp + '/100', {fontFamily: 'Press-Start-2P', fill : '#295b3e'}).setScale(0.75);

        function attack (damage, weapon) {
            asharra_hp -= damage; 
            asharra_text.setText(asharra_hp + "/100");
            dialogue.setText("ATELLE uses " + weapon + "!");
        }

        function asharra_attack () {
            atelle_hp -= Math.floor(Math.random() * (atelle_hp / 3));
            atelle_text.setText(atelle_hp + "/100");
            dialogue.setText("ASHARRA uses SWORD!");
        }

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(5, 0x5f3b39);
        this.graphics.fillStyle(0x907058, 1);    

        /* SWORD ATTACK BUTTON */
        this.graphics.strokeRect(820, 500, 160, 60);
        this.graphics.fillRect(820, 501, 159, 59);
        this.sword_button = this.add.text(845, 520, 'SWORD', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
        this.sword_button.setInteractive();
        this.sword_button.on('pointerover', () => this.sword_button.setStyle({fill : '#ffffff'}));
        this.sword_button.on('pointerout', () => this.sword_button.setStyle({fill : '#5f3b39'}));
        if (this.hasSword) {
            this.sword_button.on('pointerdown', () => {
                this.sword_button.disableInteractive();
                this.rock_button.disableInteractive();
                this.hammer_button.disableInteractive();
                this.run_button.disableInteractive();
                this.atelleFight = true; 
                attack(20, 'SWORD')
                this.time.addEvent({
                    delay : 2000,
                    callback : () => {
                        this.atelleFight = false; 
                        this.asharraFight = true;
                        asharra_attack();
                        this.time.addEvent({
                            delay : 2000,
                            callback : () => {
                                if (asharra_hp <= 0) {
                                    this.scene.start('WonFightScene', {character : this.character});
                                }
                                else if (atelle_hp <= 0) {
                                    this.scene.start('LostFightScene', {character : this.character});
                                }
                                else {
                                    this.asharraFight = false;
                                    dialogue.setText(`What will ${playerName} do?`);
                                    this.sword_button.setInteractive();
                                    this.rock_button.setInteractive();
                                    this.hammer_button.setInteractive();
                                    this.run_button.setInteractive();
                                }
                            }
                        })
                    }
                });
            });
        }

        /* ROCK ATTACK BUTTON */
        this.graphics.strokeRect(990, 500, 160, 60);
        this.graphics.fillRect(990, 501, 159, 59);
        this.rock_button = this.add.text(1026, 520, 'ROCK', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
        this.rock_button.setInteractive();
        this.rock_button.on('pointerover', () => this.rock_button.setStyle({fill : '#ffffff'}));
        this.rock_button.on('pointerout', () => this.rock_button.setStyle({fill : '#5f3b39'}));
        if (this.hasRock) {
            this.rock_button.on('pointerdown', () => {
                this.sword_button.disableInteractive();
                this.rock_button.disableInteractive();
                this.hammer_button.disableInteractive();
                this.run_button.disableInteractive();
                this.atelleFight = true; 
                attack(5, 'ROCK')
                this.time.addEvent({
                    delay : 2000,
                    callback : () => {
                        this.atelleFight = false; 
                        this.asharraFight = true;
                        asharra_attack();
                        this.time.addEvent({
                            delay : 2000,
                            callback : () => {
                                if (asharra_hp <= 0) {
                                    this.scene.start('WonFightScene', {character : this.character});
                                }
                                else if (atelle_hp <= 0) {
                                    this.scene.start('LostFightScene', {character : this.character});
                                }
                                else {
                                    this.asharraFight = false;
                                    dialogue.setText(`What will ${playerName} do?`);
                                    this.sword_button.setInteractive();
                                    this.rock_button.setInteractive();
                                    this.hammer_button.setInteractive();
                                    this.run_button.setInteractive();
                                }
                            }
                        })
                    },
                });
            });
        }

        /* HAMMER ATTACK BUTTON */
        this.graphics.strokeRect(990, 570, 160, 60);
        this.graphics.fillRect(990, 571, 159, 59);
        this.hammer_button = this.add.text(835, 590, 'HAMMER', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
        this.hammer_button.setInteractive();
        this.hammer_button.on('pointerover', () => this.hammer_button.setStyle({fill : '#ffffff'}));
        this.hammer_button.on('pointerout', () => this.hammer_button.setStyle({fill : '#5f3b39'}));
        if (this.hasHammer) {
            this.hammer_button.on('pointerdown', () => {
                this.sword_button.disableInteractive();
                this.rock_button.disableInteractive();
                this.hammer_button.disableInteractive();
                this.run_button.disableInteractive();
                this.atelleFight = true; 
                attack(10, 'HAMMER')
                this.time.addEvent({
                    delay : 2000,
                    callback : () => {
                        this.atelleFight = false; 
                        this.asharraFight = true;
                        asharra_attack();
                        this.time.addEvent({
                            delay : 2000,
                            callback : () => {
                                if (asharra_hp <= 0) {
                                    this.scene.start('WonFightScene', {character : this.character});
                                }
                                else if (atelle_hp <= 0) {
                                    this.scene.start('LostFightScene', {character : this.character});
                                }
                                else {
                                    this.asharraFight = false;
                                    dialogue.setText(`What will ${playerName} do?`);
                                    this.sword_button.setInteractive();
                                    this.rock_button.setInteractive();
                                    this.hammer_button.setInteractive();
                                    this.run_button.setInteractive();
                                }
                            }
                        })
                    },
                });
            });
        }

        /* RUN AWAY BUTTON */
        this.graphics.strokeRect(820, 570, 160, 60);
        this.graphics.fillRect(820, 571, 159, 59);
        this.run_button = this.add.text(1036, 590, 'RUN', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
        this.run_button.setInteractive();
        this.run_button.on('pointerover', () => this.run_button.setStyle({fill : '#ffffff'}));
        this.run_button.on('pointerout', () => this.run_button.setStyle({fill : '#5f3b39'}));
        this.run_button.on('pointerdown', () => this.scene.start('LostFightScene', {character : this.character}));

        this.anims.create({
            key: 'player_A_idle',
            frames: this.anims.generateFrameNumbers('player_A_idle', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_A_fight',
            frames: this.anims.generateFrameNumbers('player_A_fight', { start: 0, end: 5 }),
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
            key: 'player_B_fight',
            frames: this.anims.generateFrameNumbers('player_B_fight', { start: 0, end: 5 }),
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
            key: 'asharra_fight',
            frames: this.anims.generateFrameNumbers('asharra_fight', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.atelle = this.physics.add.sprite(425, 395, ('player_' + this.character + '_idle')).setScale(8);
        this.asharra = this.physics.add.sprite(880, 260, 'asharra_idle').setScale(8);
    }

    update () {
        if (this.atelleFight) {
            this.atelle.anims.play(('player_' + this.character + '_fight'), true)
        }
        else {
            this.atelle.anims.play(('player_' + this.character + '_idle'), true);
        }

        if (this.asharraFight) {
            this.asharra.anims.play('asharra_fight', true);
        }
        else {
            this.asharra.anims.play('asharra_idle', true);
        }  
    }
}

export default FightScene