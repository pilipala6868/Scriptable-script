// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comments;
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
    this.name = '一言'
  }

  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render () {
    const data = await this.getData()
    let w
    w = await this.renderMedium(data)
    // 背景图
    w.backgroundImage = await this.getImageByUrl('https://store-g1.seewo.com/cd5762df83844549ab9774f22a26bbb6')
    // 点击事件
    w.url = this.actionUrl("menus", data.content)
    return w
  }

  /**
   * 渲染中尺寸组件
   */
  async renderMedium (data) {
    const { content, from_who } = data
    let from = data.from
    let w = new ListWidget()
    w.spacing = 11
    w.setPadding(0, 40, 0, 20)

    this.addText(w, content, 18, { align: 'left' })

    from = from ? `「${from}」` : ''
    const sourceText = from && from_who ? `${from}· ${from_who}` : from || from_who
    if (from || from_who) {
      this.addText(w, sourceText, 14, { align: 'right' })
    }
    
    return w
  }

  /**
   * 获取数据函数，函数名可不固定
   */
  async getData () {
    let api
    switch (args.widgetParameter) {
      case '土味情话':
        api = `https://api.uomg.com/api/rand.qinghua?format=json`
        break
      case '一言':
      default:
        // 类型：a动画，b漫画，c游戏，d文学，e原创，f来自网络，g其他，h影视，i诗词，j网易云，k哲学，l抖机灵
        const apiTypeList = ['d', 'i', 'j', 'k']
        const apiTypeStr = apiTypeList.map(item => `c=${item}`).join('&')
        api = `https://v1.hitokoto.cn/?${apiTypeStr}&encode=json`
    }
    const retData = await this.httpGet(api)
    if (retData.hitokoto) {
      retData.content = retData.hitokoto
    }
    return retData
  }

  // 格式化文本创建
  addText (w, content, size, params = {}) {
    const { color = '#000000', align = 'center' } = params
    const text = w.addText(content)
    switch (align) {
        case 'left':
          text.leftAlignText()
          break
        case 'right':
          text.rightAlignText()
          break
        default:
          text.centerAlignText()
    }
    text.font = Font.regularSystemFont(size)
    text.textColor = new Color(color, 1)
    return text
  }

  // 用户点击组件，触发的 action
  async actionMenus (content) {
    Pasteboard.copyString(content)
    const alert = new Alert()
    alert.title = "内容已复制"
    alert.present()
  }

}
// @组件代码结束

const { Testing } = require("./「小件件」开发环境")
await Testing(Widget)