

    const {app, BrowserWindow,globalShortcut} = require('electron');
    var  configuration=require('./configuration');
    
  
    
    let win

    function createWindow () {
     
      win = new BrowserWindow({  
      	frame: false,
        height: 700,
        resizable: false,
        width: 368,
      	title:"声效器",
      	show:false
      });

      win.loadURL(`file://${__dirname}/app/index.html`);

//    win.webContents.openDevTools();
		win.webContents.on('did-finish-load',()=>{
       	 win.show()
       	
       })
		
		
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
        width: 368,
	   	show: false});

      settingsWindow.loadURL(`file://${__dirname}/app/settings.html`);
      
      
       settingsWindow.webContents.on('did-finish-load',()=>{
       	 settingsWindow.show()
       	
       })
	   	settingsWindow.on('closed', () => {
        settingsWindow = null
      })
     
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


function setGlobalShortcuts() {
	globalShortcut.unregisterAll();
	
	 if(configuration.readSettings('shortcutKeys')==null){
		configuration.saveSettings("shortcutKeys",[]);
	}
  	var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
		
    var  shortcutPrefix= shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';
    globalShortcut.register(shortcutPrefix + '1', function () {
        win.webContents.send('global-shortcut', 0);
    });

    globalShortcut.register(shortcutPrefix + '2', function () {
        win.webContents.send('global-shortcut', 1);
    });
}