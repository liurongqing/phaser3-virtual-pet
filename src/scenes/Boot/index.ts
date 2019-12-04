import { BASE_URL, PATH_URL } from '@/const'
export default class Boot extends Phaser.Scene {
  constructor() {
    super('bootScene')
  }

  preload() {
    this.load.setBaseURL(BASE_URL)
    this.load.setPath(PATH_URL)
    this.load.image('logo', 'images/rubber_duck.png')
  }

  create() {
    console.log('into loadingScene...')
    this.scene.start('loadingScene')
  }
}
