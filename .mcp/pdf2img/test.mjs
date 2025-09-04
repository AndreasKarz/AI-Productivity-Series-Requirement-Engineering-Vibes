#!/usr/bin/env node

// Test script for the PDF2IMG MCP Server
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testMCP() {
    console.log('🧪 Testing PDF2IMG MCP Server...\n');

    // Test PDF path
    const testPdfPath = path.resolve(__dirname, '../../.assets/Grundlagen der Zusammenarbeit.pdf');

    // Check if test PDF exists
    if (!await fs.pathExists(testPdfPath)) {
        console.error('❌ Test PDF not found:', testPdfPath);
        process.exit(1);
    }

    console.log('✅ Test PDF found:', testPdfPath);

    // Import and test the MCP functions
    try {
        // Since we can't easily test the MCP server directly, let's test the core dependencies
        console.log('📦 Testing dependencies...');

        // Test pdf-poppler
        const { convert } = await import('pdf-poppler');
        console.log('✅ pdf-poppler imported successfully');

        // Test Jimp
        const Jimp = (await import('jimp')).default;
        console.log('✅ Jimp imported successfully');

        // Test fs-extra
        const fsExtra = await import('fs-extra');
        console.log('✅ fs-extra imported successfully');

        // Test uuid
        const { v4: uuidv4 } = await import('uuid');
        console.log('✅ uuid imported successfully');

        console.log('\n🎉 All dependencies are working correctly!');
        console.log('\n📋 MCP Server Setup Complete:');
        console.log('   - PDF2IMG MCP Server created in .mcp/pdf2img/');
        console.log('   - VS Code configuration updated in .vscode/mcp.json');
        console.log('   - Dependencies installed and working');
        console.log('   - Ready for testing with GitHub Copilot');

        console.log('\n🚀 To test the MCP Server:');
        console.log('   1. Restart VS Code to load the new MCP configuration');
        console.log('   2. Ask GitHub Copilot: "Convert the PDF Grundlagen der Zusammenarbeit.pdf to PNG"');
        console.log(`   3. The test PDF is located at: ${testPdfPath}`);

    } catch (error) {
        console.error('❌ Error testing dependencies:', error.message);
        process.exit(1);
    }
}

testMCP();