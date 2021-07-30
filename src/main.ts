import { app, BrowserWindow } from "electron"
import * as path from "path"

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    win.loadFile(path.join(__dirname, "../src/index.html"))
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit()
})

app.whenReady().then(() => {
    createWindow()
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})