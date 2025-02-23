class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
    }

    init(data) {
        this.startBeforeFight = data.startBeforeFight;
        this.character = data.character;
    }

    preload() {
        this.load.image('char', 'assets/sprites/placeholder.png');
        this.load.image('map_background', 'assets/images/background2.jpg');
        this.load.image('inventory_button', 'assets/menu/inventory.png');
        this.load.image('rock', 'assets/images/rock.png');
        this.load.image('sword', 'assets/images/sword.png');
        this.load.image('axe', 'assets/images/axe.png');
        this.load.image('guide', 'assets/images/direction_arrow.png');

        this.load.spritesheet('player_A_idle', 'assets/sprites/A/idle.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('player_A_walk_back', 'assets/sprites/A/walk_back.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('player_A_walk_front', 'assets/sprites/A/walk_front.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('player_A_walk_right', 'assets/sprites/A/walk_right.png', { frameWidth: 48, frameHeight: 34 });
        this.load.spritesheet('player_A_walk_left', 'assets/sprites/A/walk_left.png', { frameWidth: 48, frameHeight: 34 });

        this.load.spritesheet('player_B_idle', 'assets/sprites/B/idle_right.png', { frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('player_B_walk_back', 'assets/sprites/B/walk_back.png', { frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('player_B_walk_front', 'assets/sprites/B/walk_front.png', { frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('player_B_walk_right', 'assets/sprites/B/walk_right.png', { frameWidth: 32, frameHeight: 34 });
        this.load.spritesheet('player_B_walk_left', 'assets/sprites/B/walk_left.png', { frameWidth: 32, frameHeight: 34 });

        this.load.spritesheet('kirin_idle_back', 'assets/sprites/kirin/idle_back.png', { frameWidth: 80, frameHeight: 67 });
        this.load.spritesheet('kirin_idle_left', 'assets/sprites/kirin/idle_left.png', { frameWidth: 80, frameHeight: 67 });
        this.load.spritesheet('kirin_idle_right', 'assets/sprites/kirin/idle_right.png', { frameWidth: 80, frameHeight: 67 });
        this.load.spritesheet('kirin_idle', 'assets/sprites/kirin/idle.png', { frameWidth: 80, frameHeight: 67 });

        this.load.spritesheet('asharra_idle', 'assets/sprites/asharra/idle_left.png', { frameWidth: 64, frameHeight: 45 });

        this.load.spritesheet('coin', 'assets/images/coin.png', { frameWidth: 16, frameHeight: 16 });

        this.load.audio('bg_music', 'assets/music/loading_adventure-beyond.mp3');

        this.moveCam = false;
    }

    create() {
        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();

        this.frozen = false;

        this.destination = [600, 20];
        this.coins_collected = 0;

        this.place = this.physics.add.image(590, 670, 'place');
        this.place.getBounds();
        this.place.body.setSize(this.place.body.height - 19, this.place.body.width, true);
        this.place.setCollideWorldBounds(true);

        this.physics.world.setBounds(0, 0, 590 * 2 + 100, 530 * 2 + 55);

        this.add.image(600, 530, 'map_background').setScale(1.50).setOrigin(.5, .5);

        this.arrow = this.add.sprite(0, 0, 'guide').setScale(1.5);
        this.arrow.setDepth(1);

        this.rectangles = this.physics.add.staticGroup();

        this.rectangles.add(this.add.rectangle(0, 0, 389, 2200));
        this.rectangles.add(this.add.rectangle(200, 0, 120, 107));
        this.rectangles.add(this.add.rectangle(200, 413, 120, 235));
        this.rectangles.add(this.add.rectangle(200, 1015, 2000, 235));
        this.rectangles.add(this.add.rectangle(700, 0, 600, 120));
        this.rectangles.add(this.add.rectangle(620, 0, 175, 400));
        this.rectangles.add(this.add.rectangle(1070, 90, 245, 190));
        this.rectangles.add(this.add.rectangle(1150, 600, 100, 70));
        this.rectangles.add(this.add.rectangle(360, 690, 140, 80));
        this.rectangles.add(this.add.rectangle(650, 690, 140, 80));
        this.rectangles.add(this.add.rectangle(630, 600, 220, 130));
        this.rectangles.add(this.add.rectangle(320, 570, 80, 90));
        this.rectangles.add(this.add.rectangle(1064, 750, 75, 80));
        this.rectangles.add(this.add.rectangle(900, 810, 200, 80));
        this.rectangles.add(this.add.rectangle(1017, 700, 165, 20));
        this.rectangles.add(this.add.rectangle(850, 700, 40, 20));
        this.rectangles.add(this.add.rectangle(825, 570, 20, 275));
        this.rectangles.add(this.add.rectangle(777, 305, 70, 80));
        this.rectangles.add(this.add.rectangle(777, 350, 70, 2));
        this.rectangles.add(this.add.rectangle(777, 500, 70, 165));
        this.rectangles.add(this.add.rectangle(500, 305, 450, 2));
        this.rectangles.add(this.add.rectangle(500, 355, 300, 2));
        this.rectangles.add(this.add.rectangle(280, 415, 20, 210));
        this.rectangles.add(this.add.rectangle(730, 330, 20, 50,));
        this.rectangles.add(this.add.rectangle(730, 480, 20, 120));
        this.rectangles.add(this.add.rectangle(957, 350, 90, 2));
        this.rectangles.add(this.add.rectangle(900, 475, 20, 218));
        this.rectangles.add(this.add.rectangle(1020, 475, 20, 218));
        this.rectangles.add(this.add.rectangle(1010, 575, 40, 20));
        this.rectangles.add(this.add.rectangle(920, 575, 40, 20));
        this.rectangles.add(this.add.rectangle(1090, 630, 20, 120));
        this.rectangles.add(this.add.rectangle(960, 302, 215, 2));
        this.rectangles.add(this.add.rectangle(1170, 302, 50, 2));

        this.rectangles.add(this.add.rectangle(425, 460, 150, 20));
        this.rectangles.add(this.add.rectangle(610, 460, 110, 20));
        this.rectangles.add(this.add.rectangle(610, 527, 220, 20));
        this.rectangles.add(this.add.rectangle(340, 527, 145, 20));
        this.rectangles.add(this.add.rectangle(490, 532, 20, 35));
        this.rectangles.add(this.add.rectangle(423, 532, 20, 35));
        this.rectangles.add(this.add.rectangle(350, 415, 20, 110));
        this.rectangles.add(this.add.rectangle(655, 415, 20, 110));
        this.rectangles.add(this.add.rectangle(825, 330, 20, 50));

        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 4 }),
            frameRate: 7,
            repeat: -1
        });

        this.coins = this.physics.add.staticGroup({
            key: 'coin',
            repeat: 2,
            setXY: { x: 474, y: 600, stepY: 35 }
        });

        this.coins.children.iterate(function (child) {
            child.setScale(1.2);
            child.setSize(child.body.width, child.body.height + 2, true);
        });

        this.coins.create(865, 570, 'coin').setScale(1.2);
        this.coins.create(865, 605, 'coin').setScale(1.2);
        this.coins.create(865, 640, 'coin').setScale(1.2);

        this.coins.create(835, 870, 'coin').setScale(1.2);
        this.coins.create(870, 870, 'coin').setScale(1.2);
        this.coins.create(905, 870, 'coin').setScale(1.2);

        this.coins.create(300, 770, 'coin').setScale(1.2);

        this.coins.create(745, 385, 'coin').setScale(1.2);
        this.coins.create(780, 385, 'coin').setScale(1.2);
        this.coins.create(815, 385, 'coin').setScale(1.2);

        this.coins.create(415, 253, 'coin').setScale(1.2);
        this.coins.create(450, 253, 'coin').setScale(1.2);
        this.coins.create(485, 253, 'coin').setScale(1.2);

        this.coins.create(900, 223, 'coin').setScale(1.2);

        this.coins.create(235, 175, 'coin').setScale(1.2);

        this.coins.create(535, 80, 'coin').setScale(1.2);

        if (this.startBeforeFight) {
            this.weapons = this.physics.add.staticGroup();
            this.rock = this.weapons.create(237, 590, 'rock');
            this.sword = this.weapons.create(1132, 430, 'sword');
            this.hammer = this.weapons.create(625, 378, 'axe');
            this.hasRock = false;
            this.hasSword = false;
            this.hasHammer = false;
        }

        this.anims.create({
            key: 'player_A_idle',
            frames: this.anims.generateFrameNumbers('player_A_idle', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_A_walk_front',
            frames: this.anims.generateFrameNumbers('player_A_walk_front', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_A_walk_back',
            frames: this.anims.generateFrameNumbers('player_A_walk_back', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_A_walk_right',
            frames: this.anims.generateFrameNumbers('player_A_walk_right', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_A_walk_left',
            frames: this.anims.generateFrameNumbers('player_A_walk_left', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_B_idle',
            frames: this.anims.generateFrameNumbers('player_B_idle', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_B_walk_front',
            frames: this.anims.generateFrameNumbers('player_B_walk_front', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_B_walk_back',
            frames: this.anims.generateFrameNumbers('player_B_walk_back', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_B_walk_right',
            frames: this.anims.generateFrameNumbers('player_B_walk_right', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'player_B_walk_left',
            frames: this.anims.generateFrameNumbers('player_B_walk_left', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'kirin_idle',
            frames: this.anims.generateFrameNumbers('kirin_idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kirin_idle_left',
            frames: this.anims.generateFrameNumbers('kirin_idle_left', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'kirin_idle_right',
            frames: this.anims.generateFrameNumbers('kirin_idle_right', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'asharra_idle',
            frames: this.anims.generateFrameNumbers('asharra_idle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.kirin = this.physics.add.sprite(610, 808, 'kirin_idle').setScale(0.8);
        this.kirin.getBounds();
        this.kirin.setOffset(6, 13);
        this.kirin.body.setSize(this.kirin.width * 0.4, this.kirin.height * 0.75, false);
        this.kirin.setCollideWorldBounds(true);
        this.physics.add.collider(this.kirin, this.rectangles);

        this.atelle = this.physics.add.sprite(583, 783, ('player_' + this.character + '_idle')).setScale(1.7);
        this.atelle.getBounds();
        this.atelle.setOffset(6, 10);
        this.atelle.body.setSize(this.atelle.width * 0.3, this.atelle.height * 0.5, false);
        this.atelle.setCollideWorldBounds(true);
        this.physics.add.collider(this.atelle, this.rectangles);
        this.physics.add.overlap(this.atelle, this.coins, collectCoin, null, this);
        this.physics.add.overlap(this.atelle, this.weapons, collectWeapon, null, this);

        this.asharra = this.physics.add.sprite(412, 70, 'asharra_idle').setScale(2);
        this.asharra.getBounds();
        this.asharra.body.setSize(this.asharra.width * 1.8, this.asharra.height * 0.9, true);

        this.cameras.main.setBounds(2, 0, 590 * 2 + 15, 530 * 2 + 10);
        this.cameras.main.startFollow(this.atelle, true, 0.05, 0.05)
        this.cameras.main.setZoom(1.5);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.refreshButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        function collectCoin(player, coin) {
            coin.destroy(true);
            this.coins_collected++;
        }

        function collectWeapon(player, weapon) {
            weapon.destroy(true);
            if (weapon == this.rock) {
                this.hasRock = true;
            }
            else if (weapon == this.hammer) {
                this.hasHammer = true;
            }
            else if (weapon == this.sword) {
                this.hasSword = true;
            }
        }

        // INVENTORY MANAGEMENT BELOW
        this.inventoryContainer = this.add.container(this.kirin.body.x, this.kirin.body.y);

        // INVENTORY UI
        this.inventory_toggle_button = this.add.image(this.kirin.body.x, this.kirin.body.y, 'inventory_button'); // 1170, 30
        // this.add.text(this.kirin.body.x - 10, this.kirin.body.y + 10, 'Inventory', { fontSize: '10px', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.inventory_toggle_button.setInteractive();
        this.inventory_toggle_button.on('pointerdown', () => {
            toggleInventory();
        });
        this.inventory_toggle_button.on('pointerover', () => inventory_toggle_button.setTint(0xcccccc));
        this.inventory_toggle_button.on('pointerout', () => inventory_toggle_button.setTint(0xffffff));
        this.inventoryContainer.add(this.inventory_toggle_button);

        this.inventoryBackground = this.add.rectangle(this.kirin.body.x, this.kirin.body.y, 50, 50, 0x000001, 0.5);
        this.inventoryContainer.add(this.inventoryBackground);
    }

    toggleInventory() {
        clearInventory();
        this.inventoryContainer.setVisible(!this.inventoryContainer.visible);
        this.frozen = !this.frozen;
    }

    update() {
        this.physics.collide(this.place, this.a);

        this.coins.children.iterate(function (child) {
            child.anims.play('coin', true);
        });

        this.asharra.anims.play('asharra_idle', true);

        if (this.physics.overlap(this.atelle, this.asharra) && this.keyF.isDown) {
            if (this.startBeforeFight) {
                this.scene.start('BeforeFightScene', {character: this.character, hasRock: this.hasRock, hasHammer: this.hasHammer, hasSword: this.hasSword});
            }
            else {
                this.scene.start('EncounterScene', {character: this.character});
            }
        }


        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.atelle.body.setVelocityX(-225);
            this.atelle.anims.play(('player_' + this.character + '_walk_left'), true);

            this.kirin.body.setVelocityX(-175);
            this.kirin.anims.play('kirin_idle_left', true);
        }
        else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.atelle.body.setVelocityX(225);
            this.atelle.anims.play(('player_' + this.character + '_walk_right'), true);

            this.kirin.body.setVelocityX(200);
            this.kirin.anims.play('kirin_idle_right', true);
        }
        else if (this.cursors.up.isDown || this.keyW.isDown) {
            this.atelle.body.setVelocityY(-225);
            this.atelle.anims.play(('player_' + this.character + '_walk_back'), true);

            this.kirin.body.setVelocityY(-200);
            this.kirin.anims.play('kirin_idle', true);
        }
        else if (this.cursors.down.isDown || this.keyS.isDown) {
            this.atelle.body.setVelocityY(225);
            this.atelle.anims.play(('player_' + this.character + '_walk_front'), true);

            this.kirin.body.setVelocityY(200);
            this.kirin.anims.play('kirin_idle', true);
        }
        else {
            this.atelle.body.setVelocityX(0);
            this.atelle.body.setVelocityY(0);

            this.kirin.body.setVelocityX(0);
            this.kirin.body.setVelocityY(0);

            this.atelle.anims.play(('player_' + this.character + '_idle'), true);
            this.kirin.anims.play('kirin_idle', true);
        }


        if (Phaser.Math.Distance.Between(this.atelle.body.x, this.atelle.body.y, this.kirin.body.x, this.kirin.body.y) > 50) {
            // this.atelle.body.setVelocityX(0);
            // this.atelle.body.setVelocityY(0);
            if (this.atelle.body.x > this.kirin.body.x) {
                if (Math.abs(this.atelle.body.y - this.kirin.body.y) < 100) this.kirin.anims.play('kirin_idle', true);
                else this.kirin.anims.play('kirin_idle_right', true);
            }
            else {
                if (Math.abs(this.atelle.body.y - this.kirin.body.y) < 50) this.kirin.anims.play('kirin_idle', true);
                else this.kirin.anims.play('kirin_idle_left', true);
            }
            this.physics.moveToObject(this.kirin, this.atelle, 200);
        }

        // GUIDE ARROW UPDATE
        let dx = this.destination[0] - this.arrow.x;
        let dy = this.destination[1] - this.arrow.y;
        let angle = Phaser.Math.Angle.Between(0, 0, dx, dy);
        this.arrow.rotation = angle;

        this.arrow.x = this.atelle.body.x + 13;
        this.arrow.y = this.atelle.body.y - 15;


        if (this.startBeforeFight) {
            // Inventory updating
            this.inventoryContainer.removeAll(true);
            this.updateInventoryPosition();

            let item1 = this.add.text(0, 0, 'Inventory:', { fontSize: '14px', fill: '#fff' });
            let item2 = this.add.text(0, 20, `Coins: ${this.coins_collected}`, { fontSize: '10px', fill: '#fff' });
            let item3 = this.add.text(0, 30, '?', { fontSize: '10px', fill: '#fff' });
            let item4 = this.add.text(0, 40, '?', { fontSize: '10px', fill: '#fff' });
            let item5 = this.add.text(0, 50, '?', { fontSize: '10px', fill: '#fff' });

            if (this.hasRock) item3.setText('Rock');
            if (this.hasHammer) item4.setText('Hammer');
            if (this.hasSword) item5.setText('Sword');

            this.inventoryContainer.add([item1, item2, item3, item4, item5]);
            this.inventoryContainer.add(this.inventory_toggle_button);
        }
        else {
            this.inventoryContainer.removeAll(true);
            this.updateInventoryPosition();

            let item1 = this.add.text(0, 0, 'Inventory:', { fontSize: '14px', fill: '#fff' });
            let item2 = this.add.text(0, 20, `Coins: ${this.coins_collected}`, { fontSize: '10px', fill: '#fff' });

            this.inventoryContainer.add([item1, item2]);
            this.inventoryContainer.add(this.inventory_toggle_button);
        }
        // let item5text = 'Coins:' + String.valueOf(this.coins_collected);
        // let item5 = this.add.text(0, 50, item5text, { fontSize: '10px', fill: '#fff' });

        // let item2 = this.add.text(0, 20, () => {
        //     return this.hasRock ? 'Rock' : '?'
        // }
        //     , { fontSize: '10px', fill: '#fff' });
        // let item3 = this.add.text(0, 20, () => {
        //     return this.hasHammer ? 'Hammer' : '?'
        // }
        //     , { fontSize: '10px', fill: '#fff' });
        // let item4 = this.add.text(0, 20, () => {
        //     return this.hasSword ? 'Sword' : '?'
        // }
        //     , { fontSize: '10px', fill: '#fff' });
        // let item5 = this.add.text(0, 20, () => {
        //     return "Coins: " + coins_collected;
        // }
        //     , { fontSize: '10px', fill: '#fff' });
        // let item3 = this.add.text(0, 30, 'Sword', { fontSize: '10px', fill: '#fff' });
        // let item4 = this.add.text(0, 40, 'Hammer', { fontSize: '10px', fill: '#fff' });
        // let item5 = this.add.text(0, 50, 'Coins:', { fontSize: '10px', fill: '#fff' });
    }

    clearInventory() {
        this.inventoryContainer.removeAll(true);
    }

    updateInventoryPosition() {
        if (this.inventoryContainer.visible) {
            let cameraX = this.cameras.main.scrollX + 885 - 5;
            let cameraY = this.cameras.main.scrollY + 145;

            this.inventoryContainer.setPosition(cameraX, cameraY);
            this.inventoryBackground.setPosition(cameraX, cameraY);
        }

        this.inventory_toggle_button.setPosition(this.cameras.main.scrollX + 600 - 5, this.cameras.main.scrollY + 330);
    }
}

export default MapScene