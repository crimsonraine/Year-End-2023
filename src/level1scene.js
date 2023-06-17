class Level1Scene extends Phaser.Scene {
    constructor () {
        super({key: 'Level1Scene'});
    }

    preload () {
        this.load.image('char', 'assets/sprites/placeholder.png');
        this.load.image('background', 'assets/images/background2.jpg');
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









    
        this.physics.world.setBounds( 0, 0, 798 * 1.5, 718*1.5 - 5);

        this.add.image(600, 530, 'background').setScale(1.50).setOrigin(.5, .5);

        this.cameras.main.setBounds(0, 0, 798 * 1.5, 718 * 1.5 - 5);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(100, 550, 'char');
        this.player.getBounds();
        this.player.body.setSize(this.player.body.height - 19, this.player.body.width, true);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
        this.cameras.main.setZoom(1.5);

        this.refreshButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }
    
    update () {
        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.player.body.setVelocityX(-200);
        }
    
        else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.player.body.setVelocityX(200);
        }
    
        else if (this.cursors.up.isDown || this.keyW.isDown) {
            this.player.body.setVelocityY(-200);
        }
    
        else if (this.cursors.down.isDown || this.keyS.isDown) {
            this.player.body.setVelocityY(200);
        }
        else {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
        }
    }
} 

export default Level1Scene