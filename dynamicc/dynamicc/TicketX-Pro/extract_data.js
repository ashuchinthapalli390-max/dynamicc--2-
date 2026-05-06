const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

// The `const app = { data: { ... } };` block is huge.
// Let's extract the substring between `const app = {` and `// Init app on load`
const startIdx = content.indexOf('const app = {');
const endIdx = content.indexOf('// Init app on load');

if (startIdx !== -1 && endIdx !== -1) {
    let appStr = content.substring(startIdx, endIdx);
    
    // We can evaluate it by wrapping it in a function
    appStr = appStr.trim();
    // remove trailing semicolon
    if (appStr.endsWith(';')) {
        appStr = appStr.substring(0, appStr.length - 1);
    }
    
    try {
        // Evaluate the object
        const appObj = eval(`(() => { ${appStr}; return app; })()`);
        
        // Write JSON files
        const data = appObj.data;
        for (const [key, value] of Object.entries(data)) {
            fs.writeFileSync(\`server/data/\${key}.json\`, JSON.stringify(value, null, 2));
            console.log(\`Written server/data/\${key}.json\`);
        }
        
        // Create empty bookings and users
        fs.writeFileSync('server/data/bookings.json', JSON.stringify([], null, 2));
        console.log('Written server/data/bookings.json');
        
        fs.writeFileSync('server/data/users.json', JSON.stringify([], null, 2));
        console.log('Written server/data/users.json');
        
        console.log("Data extraction successful.");
    } catch (e) {
        console.error("Failed to eval app string", e);
    }
} else {
    console.error("Could not find app data block in index.html");
}
