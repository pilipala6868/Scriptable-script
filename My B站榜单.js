// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
// 
// iOS 桌面组件脚本 @「小件件」
// 开发说明：请从 Widget 类开始编写，注释请勿修改
// https://x.im3x.cn
// 

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
if (typeof require === 'undefined') require = importModule
const { Base } = require("./「小件件」开发环境")


// @组件代码开始
class Widget extends Base {
  /**
   * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
   * @param {string} arg 自定义参数
   */
  constructor (arg) {
    super(arg)
    this.name = 'B站榜单'
  }

  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render () {
    const data = await this.getData()
    let w
    switch (this.widgetFamily) {
      case 'large':
        w = await this.renderLarge(data.data)
        break
      case 'medium':
        w = await this.renderMedium(data.data)
        break
      default:
        w = await this.renderSmall(data.data)
    }
    // 添加渐变色背景
    const gradient = new LinearGradient()
    gradient.locations = [0, 1]
    gradient.colors = [new Color("#ed6ea0", 1), new Color("#ec8c69", 1)]
    w.backgroundGradient = gradient

    return w
  }

  /**
   * 渲染小尺寸组件
   */
  async renderSmall (data) {
    let w = new ListWidget()

    w.url = data[0].uri

    const pic = w.addStack()
    const image = await this.getImageByUrl(data[0].cover)
    const imageW = pic.addImage(image)
    imageW.cornerRadius = 2

    w.addSpacer(6)

    const title = w.addStack()
    const text = title.addText('🥇' + data[0].title)
    text.lineLimit = 2
    text.font = Font.regularSystemFont(14)

    return w
  }
  /**
   * 渲染中尺寸组件
   */
  async renderMedium (data) {
    let w = new ListWidget()
    w.spacing = 1

    for (let i=0; i<6; i++) {
      const row = w.addStack()
      row.url = data[i].uri

      let order
      switch (i) {
        case 0:
          order = '🥇'
          break
        case 1:
          order = '🥈'
          break
        case 2:
          order = '🥉'
          break
        default:
          order = ` ${i+1}  `
      }
      row.addText(`${order}  `)
      const title = row.addText(data[i].title)
      title.lineLimit = 1
      title.font = Font.regularSystemFont(14)
    }
    
    return w
  }
  /**
   * 渲染大尺寸组件
   */
  async renderLarge (data) {
    let w = new ListWidget()
    w.spacing = 3

    // w.addStack().addText('📺 B站榜单').font = Font.regularSystemFont(12)
    // w.addSpacer(5)

    const imgLine = w.addStack()
    imgLine.spacing = 4
    for (let i=0; i<3; i++) {
      const image = await this.getImageByUrl(data[i].cover)
      const imageW = imgLine.addImage(image)
      imageW.url = data[i].uri
      imageW.cornerRadius = 2
    }
    w.addSpacer(5)

    for (let i=0; i<6; i++) {
      const row = w.addStack()
      row.url = data[i].uri

      let order
      switch (i) {
        case 0:
          order = '🥇'
          break
        case 1:
          order = '🥈'
          break
        case 2:
          order = '🥉'
          break
        default:
          order = ` ${i+1}  `
      }
      row.addText(`${order}  `)
      const title = row.addText(data[i].title)
      title.lineLimit = 1
      title.font = Font.regularSystemFont(16)
    }

    w.addSpacer(5)
    const imgBottomLine = w.addStack()
    imgBottomLine.spacing = 4
    for (let i=3; i<6; i++) {
      const image = await this.getImageByUrl(data[i].cover)
      const imageW = imgBottomLine.addImage(image)
      imageW.url = data[i].uri
      imageW.cornerRadius = 2
    }
    return w
  }

  /**
   * 获取数据函数，函数名可不固定
   */
  async getData () {
    // B站榜单type：0全站，1动画，3音乐，4游戏，5娱乐，36科技
    const api = `https://app.bilibili.com/x/v2/rank/region?rid=${0}`
    return await this.httpGet(api)
  }

}
// @组件代码结束

const { Testing } = require("./「小件件」开发环境")
await Testing(Widget)