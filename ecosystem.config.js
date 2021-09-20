module.exports = {
  apps: [
    {
      name: 'ordertron-aws',
      cwd: '~/ordertron-aws',
      script: './src/main.js',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
}