# GET START

## 环境搭建

### 安装 deno

```sh
# 安装/升级
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.0.0

# 已经安装过
deno upgrade --version 1.0.0
```

### 安装 vscode 插件

安装官方的 vscode-deno 插件

```js
// settings.json
{
  "deno.enable": true,
  "deno.importmap": null,
  "deno.alwaysShowStatus": true,
  "deno.tsconfig": "./tsconfig.json"
}

// launch.json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "deno run",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["run", "--inspect-brk", "-A", "--unstable", "server.ts"],
      "console": "integratedTerminal",
      "port": 9229
    },
    {
      "name": "deno test",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["test", "-A", "--unstable"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true
    }
  ]
}


```

## 项目目录

```js
├── README.md           // 说明文档
├── deps.ts             // 依赖
├── main.ts             // 程序主入口
├── tests               // 测试
└── tsconfig.json       // ts文件
```

## 测试

测试所有符合条件的文件 `{*_,}test.{js,ts,jsx,tsx}`

```sh
 deno test -A --unstable
```
