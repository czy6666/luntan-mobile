// postcss.config.js
module.exports = {
    //配置相关插件
    plugins: {
        //自动添加浏览器厂商声明前缀，用来兼容不同浏览器
        // autoprefixer: {
        //browsers用来配置要兼容到的系统环境
        //     browsers: ['Android>=4.0', 'iOS>=8']
        // },
        'postcss-pxtorem': {
            // 根据设计稿的宽度来进行决定
            // 如果设计稿的设计宽度为375 则设为37.5
            // 如果设计稿的设计宽度为750 则设为75
            rootValue: 37.5,
            propList: ['*'],
        },
    },
};