module.exports = {
  
  entry: {
    main :__dirname + "/js/main.js",
  },
  output: {
    path: __dirname + '/out/',
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/out/',
    port: 3000
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env','es2015', 'react', "stage-2"]
        }
      }
    ]
  }
};
