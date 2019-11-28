# electron-nuxt
##### 简介：打包好的nuxt.js运行在electron,并且electron-builder打包成exe，安装后实现electron自动更新

#### 初始化项目
**`npm install`**

#### 1.打包electron生成新的exe安装包：npm run dist
#### 2.使用simplehttpserver开启存放打包好的exe安装包与yml文件的本地服务(打包目录里有这两个文件)
  安装simplehttpserver： **`npm i simplehttpserver -g`**
  <br />
  开启服务：**`simplehttpserver 文件夹名称`** （默认开启8000端口）
#### 3.安装旧版本的exe文件，就会自动检测更新啦！


# my-nuxt

> My world-class Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
