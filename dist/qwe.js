const { ipcRenderer } = require('electron');
const version = document.getElementById('version');
const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

//获取当前版本
ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version');
  version.innerText =  arg.version;
});
//新版本检测
console.log("开始新版本检测")
ipcRenderer.send('checkForUpdate');
//发现新版本
ipcRenderer.on('checking_for', () => {
  console.log("进入发现新版本")
  message.innerText = '发现新版本';
  notification.classList.remove('hidden');
});

//发现新版本
ipcRenderer.on('update_available', () => {
  console.log("正在下载中...")
  message.innerText = '正在下载中...';
  notification.classList.remove('hidden');
});

//下载成功触发
ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerText = '下载成功！是否更新?';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

function closeNotification() {
  notification.classList.add('hidden');
}

function restartApp() {
  ipcRenderer.send('isUpdateNow');
}

//下载中触发
ipcRenderer.on("downloadProgress", (event, progressObj)=> {
    console.log(progressObj);
    let downloadPercent = progressObj.percent || 0;
    message.innerText = "正在下载..." + "downloadPercent";
});
