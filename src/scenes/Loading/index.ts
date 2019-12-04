import { BASE_URL, PATH_URL } from '@/const'
export default class Loading extends Phaser.Scene {
  constructor() {
    super('loadingScene')
  }

  preload() {
    const width = this.sys.game.config.width as number
    const height = this.sys.game.config.height as number

    this.add.sprite(width * 0.5, 250, 'logo')
    this.load.setBaseURL(BASE_URL)
    this.load.setPath(PATH_URL)

    // 背景
    const bgBar = this.add.graphics()
    const barWidth = 150,
      barHeight = 30
    bgBar.setPosition(
      width * 0.5 - barWidth * 0.5,
      height * 0.5 - barHeight * 0.5
    )

    bgBar.fillStyle(0xf5f5f5, 1)
    bgBar.fillRect(0, 0, barWidth, barHeight)

    // 进度条
    const progressBar = this.add.graphics()
    progressBar.setPosition(
      width * 0.5 - barWidth * 0.5,
      height * 0.5 - barHeight * 0.5
    )

    this.load.on('progress', (value: any) => {
      progressBar.clear()
      progressBar.fillStyle(0x9ad98d, 1)
      progressBar.fillRect(0, 0, value * barWidth, barHeight)
    })

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
    this.anims.create({
      key: 'funnyfaces',
      frames: this.anims.generateFrameNames('pet', {
        frames: [1, 2, 3] as any // phaser.d.ts 错了
      }),
      frameRate: 7,
      yoyo: true,
      repeat: 0 // to repeat forever: -1
    })
    this.scene.start('homeScene')
  }
}
