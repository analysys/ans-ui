const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')

const componentName = process.argv[2]

if (!componentName) {
  fs.readdir(path.resolve('./packages'), (err, files) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    inquirer.prompt([
      {
        type: 'list',
        message: '请选择组件',
        name: 'name',
        choices: files
      }
    ]).then(answers => {
      process.env.COMPONENT_NAME = answers.name
      run()
    })
  })
} else {
  const indexPath = `./packages/vue-${componentName}`
  if (!fs.existsSync(path.resolve(indexPath))) {
    console.log('请输入正确的组件名称！ Please input right component name!')
    process.exit(1)
  }
  process.env.COMPONENT_NAME = `vue-${componentName}`
  run()
}

function run () {
  process.env.NODE_ENV = 'production'
  spawn('webpack', ['--config', './build/component/webpack.config.prod.js'], {
    stdio: 'inherit',
    // 仅在当前运行环境为 Windows 时，才使用 shell
    shell: process.platform === 'win32'
  })
}
