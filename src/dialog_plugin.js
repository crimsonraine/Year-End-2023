var DialogModalPlugin = function (scene) {
  // the scene that owns the plugin
  this.scene = scene;
  this.systems = scene.sys;
  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once('boot', this.boot, this);
  }
};
// Register this plugin with the PluginManager
DialogModalPlugin.register = function (PluginManager) {
  PluginManager.register('DialogModalPlugin', DialogModalPlugin, 'dialogModal');
};
DialogModalPlugin.prototype = {
  // called when the plugin is loaded by the PluginManager
  boot: function () {
    var eventEmitter = this.systems.events;
    eventEmitter.on('shutdown', this.shutdown, this);
    eventEmitter.on('destroy', this.destroy, this);
  },
  //  Called when a Scene shuts down, it may then come back again later
  // (which will invoke the 'start' event) but should be considered dormant.
  shutdown: function () {},
  // called when a Scene is destroyed by the Scene Manager
  destroy: function () {
    this.shutdown();
    this.scene = undefined;
    if (this.timedEvent) this.timedEvent.remove();
if (this.text) this.text.destroy();
  },
    // Initialize the dialog modal
  init: function (opts) {
  // Check to see if any optional parameters were passed
  if (!opts) opts = {};
  // set properties from opts object or use defaults
  this.borderThickness = opts.borderThickness || 3;
  this.borderColor = opts.borderColor || 0x5f3b39;
  this.borderAlpha = opts.borderAlpha || 1;
  this.windowAlpha = opts.windowAlpha || 0.8;
  this.windowColor = opts.windowColor || 0x907058;
  this.windowHeight = opts.windowHeight || 150;
  this.padding = opts.padding || 32;
  this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
  this.dialogSpeed = opts.dialogSpeed || 3;
  // used for animating the text
  this.eventCounter = 0;
  // the current text in the window
  this.text;
  // the text that will be displayed in the window
  this.dialog;
  this.graphics;
  // Create the dialog window
  this._createWindow();
},
// Gets the width of the game (based on the scene)
_getGameWidth: function () {
  return this.scene.sys.game.config.width;
},
// Gets the height of the game (based on the scene)
_getGameHeight: function () {
  return this.scene.sys.game.config.height;
},
// Calculates where to place the dialog window based on the game size
_calculateWindowDimensions: function (width, height) {
  var x = this.padding;
  var y = height - this.windowHeight - this.padding;
  var rectWidth = width - (this.padding * 2);
  var rectHeight = this.windowHeight;
  return {
    x,
    y,
    rectWidth,
    rectHeight
  };
},
// Creates the inner dialog window (where the text is displayed)
_createInnerWindow: function (x, y, rectWidth, rectHeight) {
  this.graphics.fillStyle(this.windowColor, this.windowAlpha);
  this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
},
// Creates the border rectangle of the dialog window
_createOuterWindow: function (x, y, rectWidth, rectHeight) {
  this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
  this.graphics.strokeRect(x, y, rectWidth, rectHeight);
},
// Sets the text for the dialog window
setText: function (text) {
this._setText(text);
},
// Calcuate the position of the text in the dialog window
_setText: function (text) {
// Reset the dialog
if (this.text) this.text.destroy();
var x = this.padding + 10;
var y = this._getGameHeight() - this.windowHeight - this.padding + 10;
this.text = this.scene.make.text({
  x,
  y,
  text,
  style: {
    fontFamily: 'Press-Start-2P',
    fontSize: '30px',
    color : '#3b2726',
    wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 },
  }
});

},
// Sets the text for the dialog window
setText: function (text, animate) {
// Reset the dialog
this.eventCounter = 0;
this.dialog = text.split('');
if (this.timedEvent) this.timedEvent.remove();
var tempText = animate ? '' : text;
this._setText(tempText);
if (animate) {
  this.timedEvent = this.scene.time.addEvent({
    delay: 150 - (this.dialogSpeed * 30),
    callback: this._animateText,
    callbackScope: this,
    loop: true
  });
}
},
// Slowly displays the text in the window to make it appear annimated
_animateText: function () {
this.eventCounter++;
this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
if (this.eventCounter === this.dialog.length) {
  this.timedEvent.remove();
}
},
// Creates the dialog window
_createWindow: function () {
  var gameHeight = this._getGameHeight();
  var gameWidth = this._getGameWidth();
  var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
  this.graphics = this.scene.add.graphics();
  this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
  this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
},
};

export default DialogModalPlugin