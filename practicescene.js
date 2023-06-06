// The game config that is used by Phaser
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
 // Create a new Phaser Game object
 var game = new Phaser.Game(config);
 function preload () {
   this.load.plugin('DialogModalPlugin', './dialog_plugin.js');
 }
 function create () {
   this.sys.install('DialogModalPlugin');
console.log(this.sys.dialogModal);
this.sys.dialogModal.init();
this.sys.dialogModal.setText('Greetings, traveler!', true);
// this.sys.dialogModal.wait(9);
// this.sys.dialogModal.setText('boop boop beep', true);
 }

 