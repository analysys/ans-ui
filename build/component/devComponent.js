const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')

const componentName = process.argv[2]
let indexPath

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
      indexPath = `./packages/${answers.name}/example/index.html`
      run()
    })
  })
} else {
  indexPath = `./packages/vue-${componentName}/example/index.html`
  if (!fs.existsSync(path.resolve(indexPath))) {
    console.log('请输入正确的组件名称！ Please input right component name!')
    process.exit(1)
  }
  run()
}

function run () {
  console.log(`parcel ${indexPath} -p 3000`)

  spawn('parcel', [indexPath, '-p', '3000'], {
    stdio: 'inherit',
    // 仅在当前运行环境为 Windows 时，才使用 shell
    shell: process.platform === 'win32'
  })
}
