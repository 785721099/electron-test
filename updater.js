// updater.js
const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')


let updater
autoUpdater.autoDownload = false
autoUpdater.on('error', (event, error) => {
  dialog.showErrorBox('Error: ', error)
})
autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: '信息',
    title: '找到更新',
    message: '找到更新，您要立即更新吗？',
    buttons: ['当然', '不']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate()
    } else {
      updater.enabled = true
      updater = null
    }
  })
})
autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: '没有更新', 
    message: '当前版本是最新的。'
  })
  updater.enabled = true
  updater = null
})
autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: '安装更新',
    message: '更新已下载，应用程序将退出更新...'
  }, () => {
    autoUpdater.quitAndInstall()
  })
})


// export this to MenuItem click callback
function checkForUpdates (menuItem, focusedWindow, event) {
  updater = menuItem
  updater.enabled = false
  autoUpdater.checkForUpdates()
}
module.exports.checkForUpdates = checkForUpdates