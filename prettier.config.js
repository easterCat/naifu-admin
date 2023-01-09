module.exports = {
    printWidth: 100, // 单行代码字符数限制
    tabWidth: 4, // tab键缩进相当于2个空格
    semi: true, // 语句的末尾分号
    vueIndentScriptAndStyle: false, // vue template 中的结束标签结尾尖括号掉到了下一行
    singleQuote: true, // 使用单引号
    trailingComma: 'all', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    proseWrap: 'never', // 按照文件原样折行
    arrowParens: 'always', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    bracketSpacing: true, // 在括号和对象的文字之间加上一个空格
    eslintIntegration: true, // 让prettier使用eslint的代码格式进行校验
    endOfLine: 'auto', // 结尾是 \n \r \n\r auto
    htmlWhitespaceSensitivity: 'ignore', // vue template 中的结束标签结尾尖括号掉到了下一行
};
