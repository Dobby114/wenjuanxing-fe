module.exports = {
  webpack:{
    configure(webpackConfig){
      if(webpackConfig.mode==='production'){
        // 抽离公共代码，只在公共环境
        if(webpackConfig.optimization===null){
          webpackConfig.optimization={}
        }
        webpackConfig.optimization.splitChunks={
          chunks:'all',
          cacheGroups:{
            antd:{
              name:"antd-chunk",
              test:/antd/,
              priority:100
            },
            reactDom:{
              name:"reactDom-chunk",
              test:/react-dom/,
              priority:99,
            },
            vendors:{
              name:'vendors-chunk',
              test:/node_modules/,
              priority:98
            }
          }
        }
      }
      return webpackConfig
    }
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': 'https://zaomengwenjuan-be.vercel.app',
    },
  },
};
