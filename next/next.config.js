module.exports = {
  excludeFile: (str) => /\*.{spec,test}.ts/.test(str)
  ,

    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/:path*' // Proxy to Backend
        }
      ]
    }
}