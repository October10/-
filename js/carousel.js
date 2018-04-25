// 首先在 HTML 中加入所需元素及 CSS：五张图片，五个点 div 以及两个按钮
// 1. 给按钮绑定切换图片功能
// 2. 切换图片时跟随切换小圆点
var getIndex = function(activeImg, imgNum, event) {
    // 通过确定按下的按钮决定 offset 值
    var target = e('body')
    if (event != undefined) {
        var target = event.target
    }
    var offset = 0
    // 点击按钮
    if (target.classList.contains('next-button')) {
        offset = 1
    } else if (target.classList.contains('last-button')) {
        offset = -1
    // 点击小圆点
    } else if (target.classList.contains('slide-indi')) {
        return target.dataset.index
    // 定时器，没有 target
    } else if (target == e('body')) {
        offset = 1
    }
    // 根据 offset 值得到 nextIndex 并返回
    var index = (imgNum + activeImg + offset) % imgNum
    return index
}

var changeIndi = function(index) {
    // 删除所有白色的小圆点
    removeClassAll('indi-white')
    // 获得下个白色小圆点的 id
    var nextId = 'indi-' + String(index)
    var nextElement = e('#'+ nextId)
    nextElement.classList.add('indi-white')
}

var changeImg = function(index) {
    removeClassAll('active')
    var container = e('.carousel-div')
    container.dataset.active = String(index)
    var nextId = 'slide-' + String(index)
    var nextElement = e('#'+ nextId)
    nextElement.classList.add('active')
}

var showImgAtIndex = function(event) {
    // 从总组件的 dataset 获取轮播图的总数量和 active 图片的 index，传给 nextIndex 函数
    var container = e('.carousel-div')
    var activeImg = parseInt(container.dataset.active, 10)
    var imgNum = parseInt(container.dataset.imgnum, 10)
    var index = getIndex(activeImg, imgNum, event)
    // 先删除原有的 active 类，然后更新总组件的 dataset 记录，之后通过获取的 index 给对应图片加上 active 类
    changeImg(index)
    // 切换小圆点
    changeIndi(index)
}

var bindEventButton = function() {
    var selector = '.img-button'
    bindAll(selector, 'click', showImgAtIndex)
}

// 3. 点击小圆点直接切换到对应图片

var bindEventIndicator = function() {
    var selector = '.slide-indi'
    bindAll(selector, 'click', showImgAtIndex)
}

// 4. 自动切换图片
// 自动显示下一张图片
// 自动播放函数，包含一个定时器
var autoPlay = function() {
    setInterval(function() {
        showImgAtIndex()
    }, 2000)
}

var __main = function() {
    bindEventButton()
    bindEventIndicator()
    autoPlay()
}

__main()
