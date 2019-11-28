# electron-nuxt

> 简介：打包好的nuxt.js运行在electron,并且electron-builder打包成exe，安装后实现electron自动更新

## 项目流程

``` bash

# 初始化项目
$ npm install

# 1.打包electron生成新的exe安装包：
$ npm run dist

# 2.使用simplehttpserver开启8000端口服务(exe安装包与yml文件下载地址)
$ npm i simplehttpserver -g
$ simplehttpserver 文件夹名称

# 3.安装旧版本的exe文件，就会自动检测更新啦！
```
