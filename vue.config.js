const path = require('path')

module.exports = {
  // 基本路径，通过环境进行选择
    publicPath: process.env.NODE_ENV === 'prodution' ? '' : './', 
    // 输出文件目录
    outputDir: 'dist', 
     // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // webpack配置
    chainWebpack: (config) => {
    },
    configureWebpack: (config) => {
      config.resolve = { // 配置解析别名
        // name: name,
        extensions: ['.js', '.json', '.vue'], // 自动添加文件名后缀
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
        }
      }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false, 
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false, 
        // css 预设器配置项
        loaderOptions: {
            sass : {
              // prependData: '@import "./src/styles/admin.scss";'
            }
        }, 
        // 启用 CSS modules for all css / pre-processor files.
        // modules : false
         // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        requireModuleExtension: true 
    },
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1, 
    // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {}, 
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        open: true,
        port: 8080,
        https: false,
        hotOnly: false,   
        proxy: {
            '/devApi': {
                target: 'http://www.web-jshtml.cn/productapi',
                changeOrigin: true, // 允许websockets跨域
                // ws: true,
                pathRewrite: {
                    '^/devApi': ''
                }
            }
        } // 代理转发配置，用于调试环境
    },
    // 第三方插件配置
    pluginOptions: {}
}