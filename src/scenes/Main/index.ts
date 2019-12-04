import { BASE_URL, PATH_URL } from '@/const'
export default class Main extends Phaser.Scene {
  petSprite: any
  appleSprite: any
  candySprite: any
  toySprite: any
  rotateSprite: any
  bgSprite: any
  stats: any
  uiBlocked: any
  constructor() {
    super('mainScene')
  }

  init() {
    this.stats = {
      health: 100,
      fun: 100
    }
    this.uiBlocked = false
  }

  preload() {
    this.load.setBaseURL(BASE_URL)
    this.load.setPath(PATH_URL)
    this.load.image('backyard', 'images/backyard.png')
    this.load.image('apple', 'images/apple.png')
    this.load.image('candy', 'images/candy.png')
    this.load.image('rotate', 'images/rotate.png')
    this.load.image('toy', 'images/rubber_duck.png')
    this.load.spritesheet('pet', 'images/pet.png', {
      frameWidth: 97,
      frameHeight: 83,
      margin: 1,
      spacing: 1
    })
  }

  create() {
    this.bgSprite = this.add
      .sprite(0, 0, 'backyard')
      .setOrigin(0, 0)
      .setInteractive()
    this.petSprite = this.add.sprite(100, 200, 'pet', 0).setInteractive()
    this.createUI()
    this.drag()
  }

  drag() {
    this.input.setDraggable(this.petSprite)
    // this.input.setDraggable(this.bgSprite)
    this.input.on(
      'drag',
      (pointer: any, gameObject: any, dragX: any, dragY: any) => {
        gameObject.x = dragX
        gameObject.y = dragY
      }
    )
  }
  createUI() {
    this.appleSprite = this.add.sprite(72, 570, 'apple').setInteractive()
    this.appleSprite.customStats = { health: 20, fun: 0 }
    this.appleSprite.on('pointerdown', this.pickItem)

    this.candySprite = this.add.sprite(144, 570, 'candy').setInteractive()
    this.candySprite.customStats = { health: -10, fun: 10 }
    this.candySprite.on('pointerdown', this.pickItem)

    this.toySprite = this.add.sprite(216, 570, 'toy').setInteractive()
    this.toySprite.customStats = { health: 0, fun: 15 }
    this.toySprite.on('pointerdown', this.pickItem)

    this.rotateSprite = this.add.sprite(288, 570, 'rotate').setInteractive()
    this.rotateSprite.on('pointerdown', this.rotatePet)
  }

  pickItem() {
    // console.log('pickItem...')
    // console.log(this.scene.uiBlocked)
    if (this.uiBlocked) return
    this.alpha = 0.5
    // console.log(this.texture.key)
  }

  rotatePet() {
    console.log('rotatePet...')
  }
}
