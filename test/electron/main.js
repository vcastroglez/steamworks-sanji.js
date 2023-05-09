const { app, BrowserWindow } = require('electron')
const steamworks = require('steamworks.js')
console.log('loaded')//vla
if (app !== undefined) {
    function createWindow() {
        const mainWindow = new BrowserWindow({
            width: 1280,
            height: 768,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        })

        // will be true when opened from steam big picture
        if (process.env.SteamTenfoot) {
            mainWindow.setFullScreen(true)
        } else {
            // mainWindow.maximize()
        }

        mainWindow.webContents.openDevTools()
        mainWindow.loadFile('index.html')
    }

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    try {
        steamworks.electronEnableSteamOverlay()
        console.log('its ok')//vla
    } catch (e) {
        console.log('errorrrrrrrr')//vla
        console.log(e)//vla
    }
})

    app.on('window-all-closed', function() {
        if (process.platform !== 'darwin') app.quit()
    })
}