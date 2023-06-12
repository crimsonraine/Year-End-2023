var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};
var game = new Phaser.Game(config);
const list = ["Greetings, traveler?", "What brings you here?", "Are you lost?", "hello!"]
function preload () {
  this.load.plugin('DialogModalPlugin', './dialog_plugin.js');
}
function create () {
  this.sys.install('DialogModalPlugin');
console.log(this.sys.dialogModal);
this.sys.dialogModal.init();
let sword_button = this.add.text(670, 530, 'ARROW', {fontFamily: 'Press-Start-2P', fill : '#5f3b39'}).setScale(1.4);
sword_button.setInteractive();
let i = -1;
sword_button.on('pointerdown', () => {
  i += 1;
  this.sys.dialogModal.setText(list[i], true)
});
}