module.exports = {
  apps: [{
    name: "PWA-EComerce",
    script: "server.js",
    output: './out.log',
    error: './error.log',
    log: './combined.outerr.log',
    //watch:true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      key: "~/.ssh/blockchain.pem",
      // SSH user
      user: "ebonet",
      // SSH host
      host: ["192.168.86.207"],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: "StrictHostKeyChecking=no",
      // GIT remote/branch
      ref: "origin/master",
      // GIT remote
      repo: "git@github.com:bernestoalberto/e-commerce-in-amp.git",
      // path in the server
      path: "/home/ebonet/www/moft_backend",
      // Pre-setup command or path to a script on your local machine
      'pre-setup': "apt-get install git ; ls -la",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      'post-setup': "ls -la",
      // pre-deploy action
      'pre-deploy-local': "echo 'This is a local executed command'",
      // post-deploy action
      'post-deploy': "npm install",
    },
  }
}
