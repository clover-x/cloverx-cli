'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 19:58:31
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 快速创建一个 cloverx 项目
 */

require('colors');
const inquirer = require('inquirer');
const fs = require('fs');
const childProcess = require('child_process');

const CLOVERX_STARTER = 'https://github.com/clover-x/cloverx-starter.git';

function *init () {
    let schema = [
        {
            type: 'input',
            name: 'name',
            message: '项目名称',
            validate: function(value) {
                if(!value) {
                    return '项目名称不能为空';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'repository',
            message: '项目 Git 地址'
        }
    ];

    let answers = yield inquirer.prompt(schema);
    // 下载项目
    childProcess.execSync(`git clone ${CLOVERX_STARTER} ${answers.name}`);

    // 添加忽略文件
    console.log('Append cloverx-cli item to .gitignore'.grey);
    childProcess.execSync(`echo '\n\n\n### cloverx-cli ###' >> ./${answers.name}/.gitignore`);
    childProcess.execSync(`echo '# ignore local config' >> ./${answers.name}/.gitignore`);
    childProcess.execSync(`echo '/app/config/config.local.js' >> ./${answers.name}/.gitignore`);
    childProcess.execSync(`echo '/app/config/plugin.local.js' >> ./${answers.name}/.gitignore`);

    // 更改 package.json
    console.log('Change package.json ........'.grey);
    let packageJson = fs.readFileSync(`./${answers.name}/package.json`, {
        encoding: 'utf8'
    });
    packageJson = JSON.parse(packageJson);
    packageJson.name = answers.name;
    packageJson.repository.url = answers.repository;
    fs.writeFileSync(`./${answers.name}/package.json`, JSON.stringify(packageJson, null, '  '));

    // 清空 .git
    childProcess.execSync(`rm -rf ./${answers.name}/.git`);

    console.log(`${answers.name} create successfully`.green);
}

module.exports = init;
