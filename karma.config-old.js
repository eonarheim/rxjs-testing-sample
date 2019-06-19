process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = (config) => {
    config.set({
        singleRun: true,
        frameworks: ['jasmine'],
        files: [
            '*.spec.ts',
        ],
        mime: { 'text/x-typescript': ['ts','tsx'] },
        preprocessors: {
            "*.spec.ts": ["webpack"]
        },
        webpack: {
            devtool: 'none',
            resolve: {
                extensions: ['.ts', '.js']
            },
            module: {
                rules: [
                    { test: /\.ts$/, loader: 'ts-loader'}
                ]
            }
        },
        reporters: ['progress'],
        browsers: ['Chrome']
    });
}