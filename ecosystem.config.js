module.exports = {
  apps: [
    {
      name: 'ordertron-aws',
      cwd: '/home/ubuntu/ordertron-aws',
      script: './src/main.js',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
}