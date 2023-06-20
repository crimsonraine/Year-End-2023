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

        this.add.rectangle(100, 100, 350, 470, 0xFFA701);
        this.add.rectangle(60, 500, 270, 600, 0xFFA701);
        this.add.rectangle(650, 490, 150, 80, 0xFFA701);
        this.add.rectangle(360, 490, 150, 80, 0xFFA701);
        this.add.rectangle(900, 610, 210, 80, 0xFFA701);
        this.add.rectangle(500, 700, 400, 80, 0xFFA701);
        this.add.rectangle(780, 300, 75, 150, 0xFFA701);
        this.add.rectangle(325, 376, 70, 70, 0xFFA701);
        this.add.rectangle(600, 376, 130, 70, 0xFFA701);
        this.add.rectangle(635, 415, 215, 90, 0xFFA701);
        this.add.rectangle(1068, 545, 73, 70, 0xFFA701);
        this.add.rectangle(1150, 380, 92, 60, 0xFFA701);
        this.add.rectangle(1110, 90, 92, 68, 0xFFA701);
        this.add.rectangle(1020, 105, 350, 2, 0xFFA701);
        this.add.rectangle(500, 105, 427, 2, 0xFFA701);





        this.physics.world.setBounds(50, 0, 590 *2 + 20, 530*2 + 55);

        this.add.image(600, 530, 'map_background').setScale(1.50).setOrigin(.5, .5);

        this.cameras.main.setBounds(2, 0, 590 *2 + 15, 530*2 + 10);

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
    }
    
    update () {
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