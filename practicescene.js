const config = {
  type: Phaser.AUTO,
  // parent: 'phaser-example',
  parent: 'game',
  width: 1200,
  height: 660,
  scene: {
    preload: preload,
    create: create
  }
};
const game = new Phaser.Game(config);
function preload () {
  this.load.plugin('DialogModalPlugin', '/src/dialog_plugin.js');

  this.load.image('arrow', 'arrow.png')
  this.load.image('bg', 'assets/images/title_background.png');
  this.load.image('advance', 'assets/menu/advance.png');
  this.load.image('sound_on', 'assets/menu/sound_on.png');
  this.load.image('sound_off', 'assets/menu/sound_off.png');
  this.load.audio('bg_music', 'assets/music/loading_adventure-beyond.mp3');

}
function create () {
  this.sys.install('DialogModalPlugin');
console.log(this.sys.dialogModal);
const list = ["Welcome to Sonapath!", "Before your adventure, please select your starting character.", "Some characters are locked, but as you advance in your journey, you'll be able to unlock them.", "Select your player, then click the arrow to begin!"]

this.sys.dialogModal.init();
// let sword_button = this.add.text(670, 530, 'ARROW', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
let sword_button = this.add.image(1050, 570, 'arrow').setScale(0.5);
sword_button.setInteractive();
let i = -1;
sword_button.on('pointerdown', () => {
  i += 1;
  this.sys.dialogModal.setText(list[i], true)
  
});

let music = this.sound.add('bg_music');
music.setLoop(true);
music.play();

let choose = this.add.image(600, 400, 'advance');
choose.setScale(3.5);
choose.setInteractive();
choose.on('pointerdown', () => {
    this.scene.start('Level1Scene')
});
choose.on('pointerover', () => choose.setTint(0xcccccc));
choose.on('pointerout', () => choose.setTint(0xffffff));

let vol = this.add.image(1050, 30, 'sound_on');
this.add.text(1023, 60, 'volume', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
vol.setScale(1.5);
vol.setInteractive();
vol.on('pointerdown', () => {
    if(music.isPlaying) {
        vol.setTexture('sound_off');
        music.pause();
    } else {
        vol.setTexture('sound_on');
        music.resume();
    }
});
vol.on('pointerover', () => vol.setTint(0xcccccc));
vol.on('pointerout', () => vol.setTint(0xffffff));

}
