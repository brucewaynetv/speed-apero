module.exports = {
  apps: [
    {
      name: "speed-apero",
      cwd: "/opt/speed-apero/current",
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3010",
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "512M",
      time: true,
    },
  ],
};
