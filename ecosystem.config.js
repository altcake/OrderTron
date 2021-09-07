module.exports = {
  apps: [
    {
      name: 'ordertron-aws',
      script: 'npm',
      args: 'start',
      interpreter: 'none',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
}