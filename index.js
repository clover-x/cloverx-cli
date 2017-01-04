#!/usr/bin/env node
'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 19:42:32
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 */

const co = require('co');
const inquirer = require('inquirer');
const commandInit = require('./lib/commmon_init.js');

function *main() {
    let schema = [{
        type: 'list',
        name: 'command',
        message: '选择要执行的命令',
        choices: [
            {
                name: 'init (快速创建一个 cloverx 项目)',
                value: 'init',
                short: 'init'
            }
        ]
    }];

    let result = yield inquirer.prompt(schema);

    switch (result.command) {
        case 'init':
            yield commandInit();
            break;
    }
}

co(function *() {
    yield main();
})
.catch(function (err) {
    console.error(err.stack.red);
});
