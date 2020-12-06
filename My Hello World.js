// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: greater-than-equal;

let mainWidget = createWidget()
mainWidget.presentMedium()

function createWidget() {
    // 创建小部件
    const widget = new ListWidget()
    // 添加文本
    let text
    if (config.widgetFamily === 'small') {
        text = widget.addText("哟!")
    }
    else if (config.widgetFamily === 'large') {
        text = widget.addText("哟!\nHello, World!")
    }
    else {
        text = widget.addText("Hello, World!")
    }
    text.textColor = new Color("#330867", 1)
    text.font = Font.boldSystemFont(36)
    text.centerAlignText()
    // 添加渐变色背景
    const gradient = new LinearGradient()
    gradient.locations = [0, 1]
    gradient.colors = [new Color("#e0c3fc", 1), new Color("#8ec5fc", 1)]
    widget.backgroundGradient = gradient
    return widget
}

