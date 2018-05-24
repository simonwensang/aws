
module.exports = {
  '/api': {
    // 测试环境
    target: 'http://mmc.dev.rs.com',  // 接口域名
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/api': 'mmc'   //需要rewrite重写的,
    }
  }
}
