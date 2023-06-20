class Level1Scene extends Phaser.Scene {
    constructor () {
        super({key: 'MapScene'});
    }

    init (data) {
        // this.username = data.username;
        this.fightWinner = data.winner;
    }

    preload () {
        this.load.image('char', 'assets/sprites/placeholder.png');
        this.load.image('map_background', 'assets/images/background2.jpg');

        // this.load.spritesheet('atelle_idle_back', 'assets/sprites/atelle/idle_back.png', { frameWidth: 48, frameHeight: 34 });
        // this.load.spritesheet('atelle_idle_right', 'assets/sprites/atelle/idle_right.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('atelle_idle', 'assets/sprites/atelle/idle.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('atelle_walk_back', 'assets/sprites/atelle/walk_back.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('atelle_walk_front', 'assets/sprites/atelle/walk_front.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('atelle_walk_right', 'assets/sprites/atelle/walk_right.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('atelle_walk_left', 'assets/sprites/atelle/walk_left.png', { frameWidth: 48, frameHeight: 34 });

        this.load.spritesheet('kirin_idle_back', 'assets/sprites/kirin/idle_back.png', { frameWidth: 80, frameHeight: 67 });
        this.load.spritesheet('kirin_idle_left', 'assets/sprites/kirin/idle_left.png', { frameWidth: 80, frameHeight: 67 });
        this.load.spritesheet('kirin_idle_right', 'assets/sprites/kirin/idle_right.png', { frameWidth: 80, frameHeight: 67 });
        this.load.spritesheet('kirin_idle', 'assets/sprites/kirin/idle.png', { frameWidth: 80, frameHeight: 67 });

        this.moveCam = false;
    }
    
    create () {
        this.place = this.physics.add.image(590, 670, 'place');
        this.place.getBounds();
        this.place.body.setSize(this.place.body.height - 19, this.place.body.width, true);
        this.place.setCollideWorldBounds(true);








    
        this.physics.world.setBounds( 0, 0, 798 * 1.5, 718*1.5 - 5);

        this.add.image(600, 530, 'map_background').setScale(1.50).setOrigin(.5, .5);

        this.cameras.main.setBounds(0, 0, 798 * 1.5, 718 * 1.5 - 5);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'atelle_idle',
            frames: this.anims.generateFrameNumbers('atelle_idle', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'atelle_walk_front',
            frames: this.anims.generateFrameNumbers('atelle_walk_front', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'atelle_walk_back',
            frames: this.anims.generateFrameNumbers('atelle_walk_back', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'atelle_walk_right',
            frames: this.anims.generateFrameNumbers('atelle_walk_right', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'atelle_walk_left',
            frames: this.anims.generateFrameNumbers('atelle_walk_left', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.atelle = this.physics.add.sprite(100, 550, 'atelle_idle').setScale(1.8);
        this.atelle.getBounds();
        this.atelle.body.setSize(this.atelle.body.height - 19, this.atelle.body.width, true);
        this.atelle.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.atelle, true, 0.05, 0.05)
        this.cameras.main.setZoom(1.5);

        this.refreshButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // this.add.rectangle(100, 100, 350, 470, 0xFFA701);
        // this.add.rectangle(60, 500, 270, 600, 0xFFA701);
        // this.add.rectangle(650, 490, 150, 80, 0xFFA701);
        // this.add.rectangle(360, 490, 150, 80, 0xFFA701);
        // this.add.rectangle(900, 610, 210, 80, 0xFFA701);
        // this.add.rectangle(500, 700, 400, 80, 0xFFA701);
        // this.add.rectangle(780, 300, 75, 150, 0xFFA701);
        // this.add.rectangle(325, 376, 70, 70, 0xFFA701);
        // this.add.rectangle(600, 376, 130, 70, 0xFFA701);
        // this.add.rectangle(635, 415, 215, 90, 0xFFA701);
        // this.add.rectangle(1068, 545, 73, 70, 0xFFA701);
        // this.add.rectangle(1150, 380, 92, 60, 0xFFA701);
        // this.add.rectangle(1110, 90, 92, 68, 0xFFA701);
        this.add.rectangle(0, 0, 389, 2200, 0xFFA701);
        this.add.rectangle(200, 0, 120, 107, 0xFFA701);
        this.add.rectangle(200, 413, 120, 235, 0xFFA701);
        this.add.rectangle(200, 1010, 2000, 235, 0xFFA701);
        this.add.rectangle(700, 0, 600, 120, 0xFFA701);
        this.add.rectangle(620, 0, 175, 400, 0xFFA701);
        this.add.rectangle(1070, 90, 245, 190, 0xFFA701);
        this.add.rectangle(1100, 300, 100, 100, 0xFFA701);
        this.add.rectangle(1150, 600, 100, 70, 0xFFA701);
        this.add.rectangle(360, 690, 140, 80, 0xFFA701);
        this.add.rectangle(650, 690, 140, 80, 0xFFA701);
        this.add.rectangle(630, 600, 220, 130, 0xFFA701);
        this.add.rectangle(320, 570, 80, 90, 0xFFA701);
        this.add.rectangle(1064, 750, 80, 80, 0xFFA701);
        this.add.rectangle(900, 810, 200, 80, 0xFFA701);
        this.add.rectangle(1017, 700, 165, 20, 0xFFA701);
        this.add.rectangle(850, 700, 40, 20, 0xFFA701);
        this.add.rectangle(825, 570, 20, 275, 0xFFA701);
        this.add.rectangle(777, 305, 70, 80, 0xFFA701);
        this.add.rectangle(777, 350, 70, 2, 0xFFA701);
        this.add.rectangle(777, 500, 70, 165, 0xFFA701);
        this.add.rectangle(500, 305, 450, 2, 0xFFA701);
        this.add.rectangle(500, 350, 300, 2, 0xFFA701);
        this.add.rectangle(280, 415, 20, 210, 0xFFA701);
        this.add.rectangle(730, 330, 20, 50, 0xFFA701);
        this.add.rectangle(730, 480, 20, 120, 0xFFA701);
        this.add.rectangle(957, 350, 90, 2, 0xFFA701);
        this.add.rectangle(900, 475, 20, 218, 0xFFA701);
        this.add.rectangle(1020, 475, 20, 218, 0xFFA701);
        this.add.rectangle(1010, 575, 40, 20, 0xFFA701);
        this.add.rectangle(920, 575, 40, 20, 0xFFA701);
        this.add.rectangle(1090, 630, 20, 120, 0xFFA701);
        this.add.rectangle(1020, 302, 360, 2, 0xFFA701);
        this.add.rectangle(425, 460, 150, 20, 0xFFA701);
        this.add.rectangle(610, 460, 110, 20, 0xFFA701);
        this.add.rectangle(610, 527, 220, 20, 0xFFA701);
        this.add.rectangle(340, 527, 145, 20, 0xFFA701);
        this.add.rectangle(490, 527, 30, 50, 0xFFA701);
        this.add.rectangle(423, 527, 30, 50, 0xFFA701);
        this.add.rectangle(350, 415, 20, 110, 0xFFA701);
        this.add.rectangle(655, 415, 20, 110, 0xFFA701);
        this.add.rectangle(825, 330, 20, 50, 0xFFA701);

















        




















        



    }
    
    update () {
        this.physics.collide(this.place, this.a);
        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.atelle.body.setVelocityX(-200);
            this.atelle.anims.play('atelle_walk_left', true);
        }
    
        else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.atelle.body.setVelocityX(200);
            this.atelle.anims.play('atelle_walk_right', true);
        }
    
        else if (this.cursors.up.isDown || this.keyW.isDown) {
            this.atelle.body.setVelocityY(-200);
            this.atelle.anims.play('atelle_walk_back', true);
        }
    
        else if (this.cursors.down.isDown || this.keyS.isDown) {
            this.atelle.body.setVelocityY(200);
            this.atelle.anims.play('atelle_walk_front', true);
        }
        else {
            this.atelle.body.setVelocityX(0);
            this.atelle.body.setVelocityY(0);
            this.atelle.anims.play('atelle_idle', true);
        }
    }
} 

export default Level1Scene