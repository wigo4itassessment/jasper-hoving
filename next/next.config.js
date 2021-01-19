module.exports = {
  excludeFile: (str) => /\*.{spec,test}.ts/.test(str)
  ,

    async rewrites() {
      return [
        {
          source: '/yak-shop/:path*',
          destination: 'http://localhost:8000/yak-shop/:path*' // Proxy to Backend
        }
      ]
    }
}