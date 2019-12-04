import * as scenes from '@/scenes'

const scene = []
for (let i in scenes) {
  scene.push(scenes[i])
}

const config: any = {
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  scale: {
    mode: Phaser.Scale.ENVELOP,
    parent: 'app',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 360,
    height: 640,
    title: '虚拟宠物',
    pixelArt: false, // 本身就是像素元素，可以设置为false
    min: {
      width: 360,
      height: 640
    },
    max: {
      width: 360,
      height: 640
    }
  },
  scene
}

window.game = new Phaser.Game(config)
