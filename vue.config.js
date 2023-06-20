module.exports = {
    // ...other configuration options
    chainWebpack: (config) => {
        config.module.rule('images')
            .use('url-loader')
            .tap(options => {
                options.fallback.options.name = 'assets/[name].[hash:8].[ext]';
                return options;
            });

    },
    configureWebpack: {
        output: {
            filename: 'assets/[name].[hash:8].js',
            chunkFilename: 'assets/[name].[hash:8].js',
        },
    },
};