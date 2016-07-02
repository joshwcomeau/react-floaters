module.exports = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React'
    },
    global: 'ReactFloaters',
    jsNext: true,
    umd: true
  }
}
