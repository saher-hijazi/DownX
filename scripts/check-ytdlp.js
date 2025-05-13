/**
 * Script to check if yt-dlp is installed and install it if it's not
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Determine the platform
const platform = os.platform();
const isWindows = platform === 'win32';
const isMac = platform === 'darwin';
const isLinux = platform === 'linux';

console.log(`Detected platform: ${platform}`);

// Check if yt-dlp is installed
function checkYtDlp() {
  return new Promise((resolve, reject) => {
    const command = isWindows ? 'where' : 'which';
    const args = isWindows ? ['yt-dlp'] : ['yt-dlp'];
    
    const process = spawn(command, args);
    
    process.on('close', (code) => {
      if (code === 0) {
        console.log('yt-dlp is already installed.');
        resolve(true);
      } else {
        console.log('yt-dlp is not installed.');
        resolve(false);
      }
    });
    
    process.on('error', (err) => {
      console.error(`Error checking for yt-dlp: ${err}`);
      reject(err);
    });
  });
}

// Install yt-dlp
function installYtDlp() {
  return new Promise((resolve, reject) => {
    console.log('Installing yt-dlp...');
    
    let command;
    let args;
    
    if (isWindows) {
      // For Windows, download the binary
      const downloadDir = path.join(__dirname, '..', 'bin');
      if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
      }
      
      const downloadPath = path.join(downloadDir, 'yt-dlp.exe');
      
      console.log(`Downloading yt-dlp to ${downloadPath}`);
      
      const https = require('https');
      const file = fs.createWriteStream(downloadPath);
      
      https.get('https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe', (response) => {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log('yt-dlp downloaded successfully.');
          
          // Add the bin directory to PATH
          const envPath = process.env.PATH || '';
          const newPath = `${downloadDir};${envPath}`;
          process.env.PATH = newPath;
          
          console.log(`Added ${downloadDir} to PATH.`);
          resolve(true);
        });
      }).on('error', (err) => {
        fs.unlink(downloadPath, () => {}); // Delete the file on error
        console.error(`Error downloading yt-dlp: ${err}`);
        reject(err);
      });
      
      return;
    } else if (isMac) {
      // For Mac, use brew
      command = 'brew';
      args = ['install', 'yt-dlp'];
    } else if (isLinux) {
      // For Linux, use pip
      command = 'pip';
      args = ['install', 'yt-dlp'];
    } else {
      reject(new Error(`Unsupported platform: ${platform}`));
      return;
    }
    
    const process = spawn(command, args);
    
    process.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    
    process.stderr.on('data', (data) => {
      console.error(`${data}`);
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        console.log('yt-dlp installed successfully.');
        resolve(true);
      } else {
        console.error(`Failed to install yt-dlp. Exit code: ${code}`);
        reject(new Error(`Failed to install yt-dlp. Exit code: ${code}`));
      }
    });
    
    process.on('error', (err) => {
      console.error(`Error installing yt-dlp: ${err}`);
      reject(err);
    });
  });
}

// Check yt-dlp version
function checkYtDlpVersion() {
  return new Promise((resolve, reject) => {
    const process = spawn('yt-dlp', ['--version']);
    
    let version = '';
    
    process.stdout.on('data', (data) => {
      version += data.toString();
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        console.log(`yt-dlp version: ${version.trim()}`);
        resolve(version.trim());
      } else {
        console.error(`Failed to get yt-dlp version. Exit code: ${code}`);
        reject(new Error(`Failed to get yt-dlp version. Exit code: ${code}`));
      }
    });
    
    process.on('error', (err) => {
      console.error(`Error getting yt-dlp version: ${err}`);
      reject(err);
    });
  });
}

// Main function
async function main() {
  try {
    const isInstalled = await checkYtDlp();
    
    if (!isInstalled) {
      await installYtDlp();
    }
    
    await checkYtDlpVersion();
    
    console.log('yt-dlp is ready to use.');
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}

// Run the main function
main();
