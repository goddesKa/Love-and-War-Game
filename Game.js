import Phaser from 'phaser';

class LoveAndWarGame extends Phaser.Scene {
  constructor() {
    super({ key: 'LoveAndWarGame' });
  }

  preload() {
    this.load.image('manchester', 'path/to/manchester.jpg');
    this.load.image('poland', 'path/to/poland.jpg');
    this.load.image('vietnam', 'path/to/vietnam.jpg');
    this.load.image('beachHouse', 'path/to/beach_house.jpg');
    this.load.spritesheet('danh', 'path/to/danh_sprite.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('karolina', 'path/to/karolina_sprite.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('lucina', 'path/to/lucina_sprite.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('alien', 'path/to/alien_sprite.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('cake', 'path/to/cake_sprite.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    this.sceneStates = ['manchester', 'poland', 'vietnam', 'beachHouse'];
    this.currentSceneIndex = 0;
    this.background = this.add.image(400, 300, this.sceneStates[this.currentSceneIndex]);
    this.danh = this.physics.add.sprite(100, 300, 'danh');
    this.karolina = this.physics.add.sprite(200, 300, 'karolina');
    this.lucina = this.physics.add.sprite(150, 350, 'lucina');
    this.alien = this.physics.add.sprite(500, 300, 'alien');
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.attackKey = this.input.keyboard.addKey('A');
    this.interactKey = this.input.keyboard.addKey('E');

    this.createDialogue();
    this.createSideQuests();
  }

  createDialogue() {
    this.dialogue = this.add.text(50, 50, '', { fontSize: '16px', fill: '#fff', backgroundColor: '#000' }).setPadding(10).setVisible(false);
  }

  showDialogue(text) {
    this.dialogue.setText(text).setVisible(true);
    this.time.delayedCall(3000, () => this.dialogue.setVisible(false));
  }

  createSideQuests() {
    this.quests = [
      "Creating beautiful paintings to earn points.",
      "Cooking a meal together as a family.",
      "Baking a cake for a competition - special cakes can defeat certain aliens!",
      "Searching for the perfect place to settle down - leading to a dream beach house in Spain."
    ];
  }

  startQuest() {
    const randomQuest = Phaser.Utils.Array.GetRandom(this.quests);
    this.showDialogue(`Quest: ${randomQuest}`);
  }

  attackAlien() {
    if (Phaser.Math.Distance.Between(this.danh.x, this.danh.y, this.alien.x, this.alien.y) < 50) {
      this.alien.destroy();
      this.showDialogue("Danh defeated the alien!");
    }
  }

  changeScene() {
    this.currentSceneIndex = (this.currentSceneIndex + 1) % this.sceneStates.length;
    this.background.setTexture(this.sceneStates[this.currentSceneIndex]);
    this.showDialogue(`Now in ${this.sceneStates[this.currentSceneIndex].charAt(0).toUpperCase() + this.sceneStates[this.currentSceneIndex].slice(1)}`);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.danh.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.danh.setVelocityX(160);
    } else {
      this.danh.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.triggerDialogue();
    }

    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('Q'))) {
      this.startQuest();
    }

    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      this.attackAlien();
    }

    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      this.changeScene();
    }
  }

  triggerDialogue() {
    const dialogues = [
      "Karolina: 'Danh, you’ve always been my hero, even before the aliens.'",
      "Danh: 'I’d fight the whole universe for you, Karolina.'",
      "Lucina: 'Can I have ice cream after we defeat these aliens?'",
      "Karolina: 'Of course, Lucina! But first, let’s save the world!'"
    ];
    const randomDialogue = Phaser.Utils.Array.GetRandom(dialogues);
    this.showDialogue(randomDialogue);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: LoveAndWarGame
};

const game = new Phaser.Game(config);
