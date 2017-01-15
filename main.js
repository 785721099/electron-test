

    const {app, BrowserWindow,globalShortcut} = require('electron');
    var  configuration=require('./configuration');
    
   
    
    let win

    function createWindow () {
     
      win = new BrowserWindow({  
      	frame: false,
        height: 700,
        resizable: false,
        width: 368});

      win.loadURL(`file://${__dirname}/app/index.html`);

//    win.webContents.openDevTools();

		
		
      win.on('closed', () => {
        win = null
      });
      
     setGlobalShortcuts(); 
    }

    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    })
    



    app.on('activate', () => {
      if (win === null) {
        createWindow();
      }
    })


   
const {ipcMain} = require('electron');
 let settingsWindow


ipcMain.on('open-settings-window', (event, arg) => {
	
	   	 if (settingsWindow!=null) {
	        return;
	    }
	   	 settingsWindow = new BrowserWindow({  
      	frame: false,
        height: 200,
        resizable: false,
        width: 368});

      settingsWindow.loadURL(`file://${__dirname}/app/settings.html`);
	   	settingsWindow.on('closed', () => {
        settingsWindow = null
      });
})

ipcMain.on('close-settings-window', (event, arg) => {
    if (settingsWindow) {
        settingsWindow.close();
    }
});

ipcMain.on('set-global-shortcuts', (event, arg) => {
    setGlobalShortcuts();
});

ipcMain.on('close-main-window', (event, arg) => {
    app.quit();
});




//function setGlobalShortcuts() {

//globalShortcut.unregisterAll();
//  var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
//  var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

//  globalShortcut.register('ctrl+shift+1', function () {
//  	 console.log(configuration); 
//  	 configuration.readSettings("123412334");
//   win.webContents.send('global-shortcut', 0);
//  });
//  globalShortcut.register('ctrl+shift+2', function () {
//      win.webContents.send('global-shortcut', 1);
//  });
//}





function setGlobalShortcuts() {
	globalShortcut.unregisterAll();
	
	 if(configuration.readSettings('shortcutKeys')==null){
		configuration.saveSettings("shortcutKeys",[]);
	}
  	var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
  	var flag=shortcutKeysSetting instanceof Array;
	 console.log(shortcutKeysSetting); 
		
    var  shortcutPrefix= shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';
	console.log(shortcutPrefix); 
    globalShortcut.register(shortcutPrefix + '1', function () {
        win.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register(shortcutPrefix + '2', function () {
        win.webContents.send('global-shortcut', 1);
    });
}