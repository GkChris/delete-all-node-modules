const fs = require('fs');
const path = require('path');

function deleteNodeModules(dirPath) {
    // Check if the current directory contains a node_modules folder
    const nodeModulesPath = path.join(dirPath, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
        console.log(`Deleting node_modules folder at: ${nodeModulesPath}`);
        deleteFolderRecursive(nodeModulesPath);
        console.log(`Node_modules folder at ${nodeModulesPath} deleted.`);
    }

    // Recursively search for node_modules folder in subdirectories
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            deleteNodeModules(filePath);
        }
    }
}

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // Recursive call to delete subdirectories
                deleteFolderRecursive(curPath);
            } else {
                // Delete file
                fs.unlinkSync(curPath);
            }
        });
        // Delete empty folder after all contents have been removed
        fs.rmdirSync(folderPath);
    }
}

module.exports = deleteNodeModules