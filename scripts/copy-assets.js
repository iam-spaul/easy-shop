const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }

    fs.readdirSync(from).forEach(element => {
        const stat = fs.lstatSync(path.join(from, element));
        if (stat.isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else if (stat.isDirectory()) {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

try {
    // Copy public directory
    copyFolderSync(
        path.join(process.cwd(), 'public'),
        path.join(process.cwd(), '.next/standalone/public')
    );
    
    // Copy static directory
    copyFolderSync(
        path.join(process.cwd(), '.next/static'),
        path.join(process.cwd(), '.next/standalone/.next/static')
    );

    console.log('Successfully copied static assets!');
} catch (err) {
    console.error('Error copying assets:', err);
} 