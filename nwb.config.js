module.exports = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React'
    },
    global: 'ReactFloatingObject',
    jsNext: true,
    umd: true
  }
}
