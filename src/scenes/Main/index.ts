export default class Main extends Phaser.Scene {
  stats: any
  decayRates: any
  pet: any
  appleSprite: any
  candySprite: any
  toySprite: any
  rotateSprite: any
  sprites: any
  uiBlocked: any
  selectedItem: any
  healthText: any
  funText: any
  constructor() {
    super('mainScene')
  }
  init() {
    this.stats = {
      health: 100, // 健康值
      fun: 100 // 娱乐值
    }
    this.decayRates = {
      // 衰减性
      health: -5,
      fun: -2
    }
  }
  create() {
    const bg = this.add
      .sprite(0, 0, 'backyard')
      .setInteractive()
      .setOrigin(0, 0)
    bg.on('pointerdown', this.placeItem, this)

    // 设置可拖动的宠物
    this.pet = this.add.sprite(100, 200, 'pet', 0).setInteractive()
    this.pet.setDepth(1)
    this.input.setDraggable(this.pet)
    this.input.on(
      'drag',
      (pointer: any, gameObject: any, dragX: any, dragY) => {
        gameObject.x = dragX
        gameObject.y = dragY
      }
    )

    this.createUi()
    this.createHud()
    this.refreshHud()

    this.time.addEvent({
      delay: 1000,
      repeat: -1,
      callback: () => {
        this.updateStats(this.decayRates)
      }
    })
  }

  createUi() {
    // 苹果
    this.appleSprite = this.add.sprite(72, 570, 'apple').setInteractive()
    this.appleSprite.customStats = {
      health: 20,
      fun: 0
    }
    this.appleSprite.on('pointerdown', this.pickItem)

    // 糖果
    this.candySprite = this.add.sprite(144, 570, 'candy').setInteractive()
    this.candySprite.customStats = {
      health: -10,
      fun: 10
    }
    this.candySprite.on('pointerdown', this.pickItem)

    // 玩具
    this.toySprite = this.add.sprite(216, 570, 'toy').setInteractive()
    this.toySprite.customStats = {
      health: 0,
      fun: 15
    }
    this.toySprite.on('pointerdown', this.pickItem)

    // 旋转
    this.rotateSprite = this.add.sprite(288, 570, 'rotate').setInteractive()
    this.rotateSprite.customStats = {
      fun: 20
    }
    this.rotateSprite.on('pointerdown', this.rotatePet)

    this.sprites = [
      this.appleSprite,
      this.candySprite,
      this.toySprite,
      this.rotateSprite
    ]

    this.uiReady()
  }

  rotatePet() {
    // @ts-ignore
    if (this.scene.uiBlocked) return

    // @ts-ignore
    this.scene.uiReady()

    //@ts-ignore
    this.scene.uiBlocked = true

    // @ts-ignore
    this.setAlpha(0.5)

    // @ts-ignore
    this.scene.tweens.add({
      // @ts-ignore
      targets: this.scene.pet,
      duration: 600,
      angle: 720,
      pause: false,
      onComplete: (tween: any, sprites: any) => {
        //@ts-ignore
        this.scene.updateStats(this.customStats)

        //@ts-ignore
        this.scene.uiReady()
      }
    })
  }

  // 选择食物
  pickItem() {
    // this 指向当前点击的对象
    // @ts-ignore
    if (this.scene.uiBlocked) return

    //@ts-ignore
    this.scene.uiReady()

    // @ts-ignore
    this.scene.selectedItem = this

    // @ts-ignore
    this.setAlpha(0.5)
  }

  uiReady() {
    this.selectedItem = null
    for (let i = 0; i < this.sprites.length; i++) {
      this.sprites[i].setAlpha(1)
    }
    this.uiBlocked = false
  }

  // 放下一个新的食品时， uiBlocked: true
  placeItem(pointer: any, x: any, y: any) {
    if (!this.selectedItem) return
    if (this.uiBlocked) return
    const newItem = this.add
      .sprite(x, y, this.selectedItem.texture.key)
      .setDepth(2)
    this.uiBlocked = true
    const petTween = this.tweens.add({
      targets: this.pet,
      duration: 500,
      x: newItem.x,
      y: newItem.y,
      paused: false,
      callbackScope: this,
      onComplete: function(tween, sprites) {
        newItem.destroy()

        this.pet.on(
          'animationcomplete',
          function() {
            this.pet.setFrame(0)

            this.uiReady()
          },
          this
        )

        this.pet.play('funnyfaces')

        this.updateStats(this.selectedItem.customStats)
      }
    })
  }

  createHud() {
    this.healthText = this.add.text(20, 20, 'Health: ', {
      font: '24px Arial',
      fill: '#ffffff'
    })
    this.funText = this.add.text(170, 20, 'Fun: ', {
      font: '24px Arial',
      fill: '#ffffff'
    })
  }

  refreshHud() {
    this.healthText.setText('Health: ' + this.stats.health)
    this.funText.setText('Fun: ' + this.stats.fun)
  }

  updateStats(statDiff: any) {
    let isGameOver = false
    for (let stat in statDiff) {
      if (statDiff.hasOwnProperty(stat)) {
        this.stats[stat] += statDiff[stat]
        if (this.stats[stat] < 0) {
          isGameOver = true
          this.stats[stat] = 0
        }
      }
    }
    this.refreshHud()
    isGameOver && this.gameOver()
  }

  gameOver() {
    this.uiBlocked = true
    this.pet.setFrame(4)
    this.time.addEvent({
      delay: 2000,
      repeat: 0,
      callback: () => {
        this.scene.start('homeScene')
      }
    })
  }
}
