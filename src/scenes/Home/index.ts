import { BASE_URL, PATH_URL } from '@/const'
export default class Home extends Phaser.Scene {
  constructor() {
    super('homeScene')
  }

  create() {
    const bg = this.add
      .sprite(0, 0, 'backyard')
      .setInteractive()
      .setOrigin(0, 0)

    const width = this.sys.game.config.width as number
    const height = this.sys.game.config.height as number

    // 开始文字
    const text = this.add.text(width * 0.5, height * 0.5, ' 开 始 游 戏', {
      font: '40px Arial',
      fill: '#ffffff'
    })
    text.setOrigin(0.5, 0.5)
    text.setDepth(1)

    // 背景
    const textBg = this.add.graphics()
    textBg.fillStyle(0x000000, 0.7)
    textBg.fillRect(
      width * 0.5 - text.width * 0.5 - 10,
      height * 0.5 - text.height * 0.5 - 10,
      text.width + 20,
      text.height + 20
    )
    bg.on('pointerdown', () => {
      this.scene.start('mainScene')
    })
  }
}
