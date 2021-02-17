
module.exports = {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {presets: ['@babel/react']}
        },
        {test: /\.css$/i, use: ['style-loader', 'css-loader']},
        {
            test: /\.s[ac]ss$/i, use:
                [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    // {loader: 'postcss-loader', options: {postcssOptions: {plugins: ['postcss-preset-env', 'autoprefixer']}}},
                    {loader: 'sass-loader'}
                ]
        },
        {test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpe?g|gif|mp4|wav|mp3)$/i, loader: 'file-loader'}
    ]
}