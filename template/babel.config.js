module.exports = api => {
  api.cache(true)
  // 开发环境
  const modeDev = process.env.NODE_ENV === 'development'
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // 转换为其它模块语法， "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
          shippedProposals: true,
          // debug: true,
        },
      ],
      [
        'minify',
        {
          // 移除打console
          removeConsole: !modeDev,
          // 移除debugger
          removeDebugger: !modeDev,
        },
      ],
      [
        '@babel/preset-react',
        {
          development: modeDev,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
      'react-hot-loader/babel',
      [
        '@babel/plugin-transform-runtime',
        {
          absoluteRuntime: false,
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
    ],
  }
}
