// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const { autoUpdater } = require ("electron-updater");
const path = require('path');

const uploadUrl = "http://localhost:8000/download/";

const express = require('express')  //express模块搭建服务
const bodyParser = require('body-parser')	//body-parser模块用来解析post数据
//开启express服务
const apps = express()
//使用bodyParser
apps.use(bodyParser.urlencoded({ extended: false })) ////解析post数据
//自动为dist目录中的文件设置路由
// apps.set('_nuxt', __dirname + '/dist/_nuxt');
apps.use(express.static(__dirname + '/dist'))
// router.get('/',(req,res)=>{
//   res.render('main/index',{})
// })
// apps.use(express.static(process.cwd() + '/dist'));
apps.listen(3000,()=>{
    console.log('3000端口成功运行');
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // autoHideMenuBar: true,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
      // preload: path.join(__dirname, '/dist/_nuxt')
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  // mainWindow.loadFile('localhost:3000/')
  mainWindow.loadURL("http://localhost:3000/")
  mainWindow.focus();
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  //检测更新
  updateHandle();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


//检测更新
function updateHandle() {
  console.log("检测更新中。。。"+ uploadUrl);
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新',
  };
  const os = require('os');

  autoUpdater.setFeedURL(uploadUrl);
  console.log("0000000000000")
  // setTimeout(()=>{
  //   console.log("延迟触发更新")
  // autoUpdater.checkForUpdates();
  // },3000)

  autoUpdater.on('error', function (error) {
    console.log(message.error)
    //sendUpdateMessage(message.error)
  });
  autoUpdater.on('checking-for-update', function () {
    mainWindow.webContents.send('checking_for', "正在检测更新...")
    console.log("正在检测更新...")
    //sendUpdateMessage(message.checking)
  });

  //当发现一个可用更新的时候触发，更新包下载会自动开始
  autoUpdater.on('update-available', function (info) {
    mainWindow.webContents.send('update_available')
    autoUpdater.downloadUpdate().then((path)=>{
      console.log('download path', path)
    }).catch((e)=>{
      console.log(e)
    })
    
  });

  //当没有可用更新的时候触发
  autoUpdater.on('update-not-available', function (info) {
    console.log("当前没有可用更新")
    // sendUpdateMessage(message.updateNotAva)
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    console.log(progressObj)
    mainWindow.webContents.send('downloadProgress', progressObj)
  })
  //安装包下载完成
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    console.log("666666666666")
    mainWindow.webContents.send('update_downloaded')
    ipcMain.on('isUpdateNow', (e, arg) =>{
      console.log(arguments);
      console.log("开始更新");
      //退出并安装
      autoUpdater.quitAndInstall();
    });
  });
  //html页面加载后触发此更新
  ipcMain.on("checkForUpdate",()=>{
      //执行自动更新检查
      autoUpdater.checkForUpdates();
  })
  //获取当前版本
  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
  });

}

// 通过main进程发送事件给renderer进程，提示更新信息
// function sendUpdateMessage(text) {
//   mainWindow.webContents.send('message', text)
// }