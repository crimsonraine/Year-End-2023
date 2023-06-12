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

        this.cameras.main.setBounds(0, 0, 100 * 4, 550 * 4);
        this.cameras.main.centerOn(600, 330);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.place = this.physics.add.image(100, 550, 'char');
        this.place.getBounds();
        this.place.body.setSize(this.place.body.height - 19, this.place.body.width, true);
        this.place.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.place, true);
        this.cameras.main.setDeadzone(400, 200);
        this.cameras.main.setZoom(2);

        if (this.cameras.main.deadzone)
        {
            const graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }
        
        this.refreshButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }
    
    update () {
        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.place.body.setVelocityX(-200);
        }
    
        else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.place.body.setVelocityX(200);
        }
    
        else if (this.cursors.up.isDown || this.keyW.isDown) {
            this.place.body.setVelocityY(-200);
        }
    
        else if (this.cursors.down.isDown || this.keyS.isDown) {
            this.place.body.setVelocityY(200);
        }
        else {
            this.place.body.setVelocityX(0);
            this.place.body.setVelocityY(0);
        }
    }
} 

export default Level1Scene