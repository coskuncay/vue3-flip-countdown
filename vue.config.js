// vue.config.js
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    // options...
    chainWebpack: config => {
        config.output.filename('vue3-flip-countdown.js')
        config.optimization.splitChunks().clear();

    },
    productionSourceMap: false,
    configureWebpack: {
        optimization: {
            splitChunks: false,
        }
    },
    css: {
        extract: false
    }
    
}