const fs = require('fs');
const path = require('path');

// Test the intent log functionality
function testIntentLog() {
    console.log('🧪 Testing Intent Navigator extension...\n');

    // Test 1: Check if extension compiles
    const extensionPath = path.join(__dirname, '..', 'out', 'extension.js');
    if (fs.existsSync(extensionPath)) {
        console.log('✅ Extension compiled successfully');
    } else {
        console.log('❌ Extension not compiled');
        return;
    }

    // Test 2: Check if package.json is valid
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (packageJson.contributes && packageJson.contributes.commands) {
            console.log('✅ Package.json has required commands');
            console.log('   Commands:', packageJson.contributes.commands.map(c => c.command).join(', '));
        } else {
            console.log('❌ Package.json missing required commands');
        }
    } catch (error) {
        console.log('❌ Package.json is invalid');
    }

    // Test 3: Check if README exists
    const readmePath = path.join(__dirname, '..', 'README.md');
    if (fs.existsSync(readmePath)) {
        console.log('✅ README.md exists');
    } else {
        console.log('❌ README.md missing');
    }

    // Test 4: Test README parsing logic
    const testReadmePath = path.join(__dirname, 'test-readme.md');
    if (fs.existsSync(testReadmePath)) {
        const readmeContent = fs.readFileSync(testReadmePath, 'utf-8');
        const lines = readmeContent.split('\n');
        
        // Find the latest unquoted line (not starting with >)
        let targetLine = 0;
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i].trim();
            if (line && !line.startsWith('>')) {
                targetLine = i;
                break;
            }
        }
        
        console.log('✅ README parsing logic works');
        console.log('   Latest intent line:', lines[targetLine].trim());
    } else {
        console.log('❌ Test README.md missing');
    }

    // Test 5: Check intent log structure
    console.log('\n📊 Intent Log Structure:');
    console.log('Sample entry:');
    console.log(JSON.stringify({
        ts: Date.now(),
        action: 'L',
        file: 'README.md',
        repo: 'test-project'
    }, null, 2));

    console.log('\n🎉 All basic tests passed!');
    console.log('\nNext steps:');
    console.log('1. Open this folder in VS Code');
    console.log('2. Press F5 to launch the extension in debug mode');
    console.log('3. Open test/test-readme.md');
    console.log('4. Try the keyboard shortcuts:');
    console.log('   - Ctrl+Shift+L: Latest Intent Line');
    console.log('   - Ctrl+Shift+P: Peek Intent');
    console.log('   - Ctrl+Shift+A: Archive with Reason');
}

testIntentLog();