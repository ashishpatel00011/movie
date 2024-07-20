// webpack.config.js
devServer: {
    proxy: {
      '/api': {
        target: 'https://api.themoviedb.org',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  }
  