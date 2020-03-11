const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const NEED_CDN = ['1', 'true'].includes(process.env.VUE_APP_NEED_CDN);
const NEED_CDN_URL = process.env.VUE_APP_NEED_CDN_URL;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    'vue': 'Vue',
    'axios':'axios',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'qs':'Qs',
    'mint-ui':'MINT'
  },
  // cdn的css链接
  css: [
    'https://unpkg.com/mint-ui/lib/style.css'
  ],
  // cdn的js链接
  js: [
    NEED_CDN_URL + '/vue/2.6.10/vue.min.js',
    NEED_CDN_URL + '/vuex/3.0.1/vuex.min.js',
    NEED_CDN_URL + '/vue-router/3.1.2/vue-router.min.js',
    NEED_CDN_URL + '/qs/6.7.0/qs.min.js',
    NEED_CDN_URL + '/axios/0.19.0/axios.min.js',
    'https://unpkg.com/mint-ui/lib/index.js'
  ]
}

module.exports = {
  pwa: {
    name: 'brucelli-pwd'
  },
  transpileDependencies: ['webpack-dev-server/client'],
  // 基本路径
  // baseUrl: './',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 线上部署时资源的访问路径（位于static中，相对路径），本地测试时在根目录
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? './product' : 'dist', // 打包路径(生产打包到product目录下）,实际线上部署到站点根目录的static目录下；
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    config.plugins.delete('preload');

    config.entry.app = ['babel-polyfill', './src/main.js'];
    // 添加别名
    config.resolve.alias
        .set('@', resolve('src'))
        .set('assets', resolve('src/assets'))
        .set('components', resolve('src/components'));

    // ============注入cdn start============
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (NEED_CDN) args[0].cdn = cdn;
      return args
    })
    // ============注入cdn start============
  },
  configureWebpack: config => {
    // 为生产环境修改配置
    if (NEED_CDN) {
      // 用cdn方式引入，则构建时要忽略相关资源
      config.externals = cdn.externals;
    }
    if (IS_PROD) {
      let plugins = [];
      // 去注释、日志和压缩代码
      plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_debugger: true,
                drop_console: true,  //生产环境自动删除console
              },
              warnings: false,
            },
            sourceMap: false,
            parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
          })
      );
      //开启 gzip 压缩, 要实现还需要服务器配置
      plugins.push(
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: productionGzipExtensions,
            threshold: process.env.VUE_APP_GZIP_SIEZ ? parseInt(process.env.VUE_APP_GZIP_SIEZ) : 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false,
          })
      );
      config.plugins = [
        ...config.plugins,
        ...plugins
      ];
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  parallel: require('os').cpus().length > 1,
  // devServer: {
  //   open: !IS_PROD,
  //   host: '0.0.0.0',
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   headers: {
  //     "X-Custom-Foo": "bar"
  //   },
  //   // historyApiFallback: true,
  //   proxy: {
  //     '/brucelli_pwa': {
  //       target: 'http://121.15.10.36:81',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/brucelli_pwa': '/'
  //       }
  //     }
  //   }, // 设置代理
  //   before: app => {
  //   }
  // },
  // 第三方插件配置
  pluginOptions: {}
}
