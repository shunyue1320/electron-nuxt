# electron-nuxt
##### 简介：打包好的nuxt.js运行在electron,并且electron-builder打包成exe，安装后实现electron自动更新

#### 初始化项目
**npm install**

#### 1.打包electron生成新的exe安装包：npm run dist
#### 2.使用simplehttpserver开启存放打包好的exe安装包与yml文件的本地服务(打包目录里有这两个文件)
       安装simplehttpserver： **npm i simplehttpserver -g**
       开启服务：**simplehttpserver 文件夹名称** （默认开启8000端口）
#### 3.安装旧版本的exe文件，就会自动检测更新啦！
