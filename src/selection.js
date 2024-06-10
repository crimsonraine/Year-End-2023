class SelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SelectionScene' });
    }

    preload() {
        this.load.image('dialogue_background', 'assets/images/dialogue_background.png');
        this.load.image('next_button', 'assets/menu/advance.png'); 

        this.load.spritesheet('A_idle', 'assets/sprites/A/idle_right.png', { frameWidth: 22, frameHeight: 34 });
        this.load.spritesheet('B_idle', 'assets/sprites/B/idle_right.png', { frameWidth: 22, frameHeight: 34 });

        this.load.image('advance', 'assets/menu/advance.png');
        this.load.image('sound_on', 'assets/menu/sound_on.png');
        this.load.image('sound_off', 'assets/menu/sound_off.png');
        this.load.audio('bg_music', 'assets/music/loading_adventure-beyond.mp3');

        this.load.scenePlugin('DialogModalPlugin', 'src/dialog_plugin.js');
    }

    create() {
        this.add.image(600, 330, 'bg').setScale(5.45).setOrigin(0.5, 0.5);
        this.bg = this.add.image(600, 330, 'dialogue_background').setScale(2.35).setOrigin(0.5, 0.5);
        this.bg.visible = true;

        this.dialogModal.init();

        let list = [
            "Welcome to Sonapath!",
            "Please input your name to begin your adventure, then press \"enter\".",
            "Before your adventure, please select your starting character.",
            "Select your player to begin!",
        ];
        let i = 0;
        this.nameEntered = false;

        let next_button = this.add.image(1120, 580, 'next_button').setScale(2);
        next_button.visible = true;
        next_button.setInteractive();
        next_button.on('pointerover', () => next_button.setTint(0xcccccc));
        next_button.on('pointerout', () => next_button.setTint(0xffffff));
        next_button.on('pointerdown', () => {
            if (i === 1 && !this.nameEntered) {
                this.dialogModal.setText(list[i], true);
                this.showNameInput();
            } else if (i < list.length - 1) {
                if (i === 1 && this.nameEntered) {
                    i++;
                }
                this.dialogModal.setText(list[i], true);
                i++;
            } else if (i === list.length - 1 && this.nameEntered) {
                // Proceed to the next scene
                this.scene.start('OpeningScene');
            }
        });

        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();

        // this.add.image(1025, 360, 'char').setScale(5.5).setTint(0x9c9c9c);
        // this.add.image(890, 310, 'chars').setScale(5.5).setTint(0x9c9c9c);

        let player_A = this.physics.add.sprite(780, 360, 'A_idle').setScale(8);
        player_A.setInteractive();
        player_A.on('pointerdown', () => {
            if (this.nameEntered) {
                this.scene.start('OpeningScene', {character : 'A'});
            } else {
                console.warn("Please enter your name first.");
            }
        });

        player_A.on('pointerover', () => player_A.setTint(0xcccccc));
        player_A.on('pointerout', () => player_A.setTint(0xffffff));

        let player_B = this.physics.add.sprite(945, 377, 'B_idle').setScale(8);
        player_B.setInteractive();
        player_B.on('pointerdown', () => {
            if (this.nameEntered) {
                this.scene.start('OpeningScene', {character : 'B'});
            } else {
                console.warn("Please enter your name first.");
            }
        });        

        player_B.on('pointerover', () => player_B.setTint(0xcccccc));
        player_B.on('pointerout', () => player_B.setTint(0xffffff));

        let vol = this.add.image(1170, 30, 'sound_on');
        this.add.text(1140, 55, 'volume', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        vol.setScale(1.5);
        vol.setInteractive();
        vol.on('pointerdown', () => {
            if (music.isPlaying) {
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

    showNameInput() {
        const nameInput = document.getElementById('nameInput');

        nameInput.style.display = 'block';
        nameInput.focus();
        nameInput.addEventListener('keydown', this.handleNameInput);
    }

    handleNameInput = (event) => {
        if (event.key === 'Enter') {
            const nameInput = document.getElementById('nameInput');
            const playerName = nameInput.value.trim();

            nameInput.style.display = 'none';
            nameInput.removeEventListener('keydown', this.handleNameInput);
            this.savePlayerName(playerName);
        }
    }

    savePlayerName(name) {
        console.log(`Player name: ${name}`);
        this.playerName = name; // Save the player name
        this.nameEntered = true; // Mark that the name has been entered

        // Store the player name in the Phaser game instance
        this.game.playerName = name;
        this.dialogModal.setText("Before your adventure, please select your starting character.", true);
    }

    update() {

    }
}

export default SelectionScene;
