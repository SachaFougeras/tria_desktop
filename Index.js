const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Créer la fenêtre du navigateur.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // et chargez l'index.html de l'application.
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);
