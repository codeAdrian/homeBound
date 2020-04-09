module.exports = (config) => {
    require('react-app-rewire-postcss')(config, {
        plugins: (loader) => [
            require('postcss-import')(),
            require('postcss-mixins')(),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                features: {
                    'nesting-rules': true,
                    'custom-media-queries': true,
                },
                stage: 3,
            }),
            require('cssnano')(),
        ],
    });

    return config;
};
