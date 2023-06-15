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
        this.add.image(600, 330, 'background').setScale(1.50).setOrigin(.5, .5);

        this.cameras.main.setBounds(0, 0, 600 * 2, 330 * 2);
        this.cameras.main.centerOn(600, 330);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(100, 550, 'char');
        this.player.getBounds();
        this.player.body.setSize(this.player.body.height - 19, this.player.body.width, true);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
        this.cameras.main.setZoom(2);

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