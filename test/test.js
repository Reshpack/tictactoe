const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Read the HTML file
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

// Configure jsdom
const { window } = new JSDOM(html);
global.document = window.document;
global.window = window;

// Load the JavaScript file
require('./script.js');

// Start writing your tests
describe('Tic Tac Toe Game', () => {
    test('Cell click updates display correctly', () => {
        // Mock a cell click event
        const cell = window.document.querySelector('.cell');
        cell.click();

        // Assert that the display has changed accordingly
        const display = window.document.querySelector('.display');
        expect(display.textContent).toContain("Player O's turn");
    });
});