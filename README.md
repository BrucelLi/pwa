### pwa项目初探

#### pwa简介
    PWA（Progressive Web App）是一种理念，使用多种技术来增强web app的功能，可以让网站的体验变得更好，能够模拟一些原生功能，比如通知推送。在移动端利用标准化框架，让网页应用呈现和原生应用相似的体验
    
#### pwa优点
    1、可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
    2、实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
    3、实现了消息推送

#### pwa特点
    1、运行于浏览器后台，不受页面刷新的影响，可以监听和截拦作用域范围内所有页面的 HTTP 请求。
    2、网站必须使用 HTTPS。除了使用本地开发环境调试时(如域名使用 localhost)
    3、单独的作用域范围，单独的运行环境和执行线程
    4、不能操作页面 DOM。但可以通过事件机制来处理
    5、事件驱动型服务线程
    
#### 项目
    基于vue-cli4.2，vue，ts开发的一款pwa应用。
    代码ui借用了文章：[browse-exp开发到部署详细介绍](https://github.com/HolyZheng/BrowseExp/blob/master/document.md)，在此特别感谢
    
#### 运行项目
    1、clone 代码
    2、`cnpm install` 或者 `npm install`
    3、`npm run serve`
    4、然后就可以浏览器本地访问效果了
    5、要完全体验pwa，需要部署到https的服务器上，因为数据是本地用json模拟的，所以可以直接部署，`npm run build` 后将product中的文件上传到服务器，然后直接访问路径下的index.html即可
