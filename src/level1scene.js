class Level1Scene extends Phaser.Scene {
    constructor () {
        super({key: 'Level1Scene'});
    }

    preload () {
        this.load.image('place', 'assets/sprites/placeholder.png');
        this.load.image('background', 'assets/images/background2.jpg');
    }
    
    create () {
        this.add.image(600, 330, 'background').setScale(1.45).setOrigin(.5, .5);
        this.place = this.physics.add.image(100, 550, 'place');
        this.place.getBounds();
        this.place.body.setSize(this.place.body.height - 19, this.place.body.width, true);
        this.place.setCollideWorldBounds(true);
    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.refreshButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    
        this.cameras.main.setBounds(0, 0, screen.width, screen.height);
        
        this.cameras.main.startFollow(this.place);
        
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
    
        //camera.startFollow(this.place);
    }
} 

export default Level1Scene