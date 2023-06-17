class Level1Scene extends Phaser.Scene {
    constructor () {
        super({key: 'Level1Scene'});
    }

    preload () {
        this.load.image('place', 'assets/sprites/placeholder.png');
        this.load.image('background', 'assets/images/background2.jpg');
    }
    
    create () {
        this.add.image(600, 330, 'background').setScale(1.50).setOrigin(.5, .5);
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









    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.refreshButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    
        this.cameras.main.setBounds(0, 0, 810, 718);
        
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