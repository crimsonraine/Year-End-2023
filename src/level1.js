//const { World } = require("matter");

var config = { // defines the config for the game 
    type: Phaser.AUTO, // tries WebGL, falls back to canvas otherwise
    width: 1200, // centering
    height: 660,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);
var cursors;
var jumpButton;
let keyA;
let keyS;
let keyD;
let keyW;
var map;    
function preload () {
    this.load.image('place', 'sprites/placeholder.png');
    this.load.image('background', 'back.jpg');
}

function create () {
    this.add.image(600, 330, 'background').setScale(1.45).setOrigin(.5, .5);
    this.place = this.physics.add.image(100, 550, 'place');
    this.place.getBounds();
    this.place.body.setSize(this.place.body.height - 19, this.place.body.width, true);
    this.place.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    refreshButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.cameras.main.setBounds(0, 0, screen.width, screen.height);
    
    this.cameras.main.startFollow(this.place);
    
}

function update() {
    if (cursors.left.isDown || keyA.isDown) {
        this.place.body.setVelocityX(-200);
    }

    else if (cursors.right.isDown || keyD.isDown) {
        this.place.body.setVelocityX(200);
    }

    else if (cursors.up.isDown || keyW.isDown) {
        this.place.body.setVelocityY(-200);
    }

    else if (cursors.down.isDown || keyS.isDown) {
        this.place.body.setVelocityY(200);
    }
    else {
        this.place.body.setVelocityX(0);
        this.place.body.setVelocityY(0);
    }

    //camera.startFollow(this.place);
}

// export default TitleScene