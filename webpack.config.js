module.exports = {
  target: 'webworker',
  mode: 'production',
  entry: './src/worker.js',
  output: {
    filename: 'worker.js',
    path: __dirname + '/dist',
  }
};