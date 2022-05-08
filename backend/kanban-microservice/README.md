![Typescript / Express REST API boilerplate](https://github.com/ljlm0402/typescript-express-starter/raw/images/logo.jpg)

[![Node](https://img.shields.io/badge/Node-14.16.0-informational?logo=node.js&color=43853D)](https://nodejs.org/docs/latest-v14.x/api/index.html)
[![TypeScript](https://img.shields.io/badge/Typescript-4.3.5-informational?logo=typescript&color=2F74C0)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.17.1-informational?logo=express&color=B1B1B1)](https://expressjs.com/)
[![Jest](https://img.shields.io/badge/Jest-27.0.6-informational?logo=jest&color=8A6343)](https://jestjs.io/)
[![Swagger](https://img.shields.io/badge/Swagger-4.1.6-informational?logo=swagger&color=1bcc00)](https://swagger.io/)

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Ready to use RESTful API boilerplate builded with [Express.js](http://expressjs.com/en/4x/api.html), [Typescript](https://github.com/Microsoft/TypeScript) and [Jest](https://jestjs.io/) and [Swagger](https://swagger.io/). 🤘
When you're with that, starting your project is a matter of minutes. 🕛:

## > Getting started
### Clone repository
```bash
$ git clone https://github.com/username/project-name.git path-to/your-project-name/
```
### Install dependencies
```bash
$ cd path-to/your-project-name/
$ npm install or npm i
```
### Run
```bash
$ npm run dev
```

## > Documentation
```bash
$ npm run dev
```
Go to http://localhost:3000/api-docs.
Generate API documentation website from *./src/docs/*.yaml.

## > Tests
```bash
$ npm run test
```

## > Deployment
Project implements a basic [PM2](https://github.com/Unitech/PM2/) configuration to allow deployment.
Install PM2 globaly :
```bash
$ npm i pm2 -g
```
### Configuration
Configure the *./ecosystem.config.js* file with your env informations.
```javascript
/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
module.exports = {
    apps: [
        {
            name: 'prod', // pm2 start App name
            script: 'dist/server.js',
            exec_mode: 'cluster', // 'cluster' or 'fork'
            instance_var: 'INSTANCE_ID', // instance variable
            instances: 2, // pm2 instance count
            autorestart: true, // auto restart if process crash
            watch: false, // files change automatic restart
            ignore_watch: ['node_modules', 'logs'], // ignore files change
            max_memory_restart: '1G', // restart if process use more than 1G memory
            merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
            output: './logs/access.log', // pm2 log file
            error: './logs/error.log', // pm2 error log file
            env: { // environment variable
                PORT: 3000,
                NODE_ENV: 'production',
            },
        },
        {
            name: 'dev', // pm2 start App name
            script: 'ts-node', // ts-node
            args: '-r tsconfig-paths/register --transpile-only src/server.ts', // ts-node args
            exec_mode: 'cluster', // 'cluster' or 'fork'
            instance_var: 'INSTANCE_ID', // instance variable
            instances: 2, // pm2 instance count
            autorestart: true, // auto restart if process crash
            watch: false, // files change automatic restart
            ignore_watch: ['node_modules', 'logs'], // ignore files change
            max_memory_restart: '1G', // restart if process use more than 1G memory
            merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
            output: './logs/access.log', // pm2 log file
            error: './logs/error.log', // pm2 error log file
            env: { // environment variable
                PORT: 3000,
                NODE_ENV: 'development',
            },
        },
    ],
    deploy: {
        production: {
            user: 'user',
            host: '0.0.0.0',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: 'dist/server.js',
            'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --only prod',
        },
    },
};
```
More info about PM2 [ecosystem.config.js](https://pm2.io/doc/en/runtime/reference/ecosystem-file/) file.
### Deploy
Pm 2 must be installed on the target server and your SSH public key granted.
```bash
# Setup deployment at remote location
$ pm2 deploy production setup
# Update remote version
$ pm2 deploy production update
```
More info about [PM2](http://pm2.keymetrics.io/docs/usage/quick-start/) and [PM2 deploy](https://pm2.io/doc/en/runtime/guide/easy-deploy-with-ssh/).

## > License
[MIT](/LICENSE)