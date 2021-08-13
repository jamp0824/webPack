class MyWebpackPlugin {
    apply(compiler) {
        //compiler.hooks.done.tap("My Plugin", stats => {
         //   console.log("MyPlugin: done")
        //})
        

            // compiler.plugin() �Լ��� ��ó���Ѵ�
            compiler.plugin("emit", (compilation, callback) => {
                const source = compilation.assets["main.js"].source()

                compilation.assets['main.js'].source = () => {
                    const banner = [
                        '/**',
                        ' * �̰��� BannerPlugin�� ó���� ����Դϴ�.',
                        ' * Build Date: 2019-10-10',
                        ' */'
          
                    ].join('\n');
                    return banner + '\n\n' + source;
                }

                callback();
            })
        
    }
}

module.exports = MyWebpackPlugin;