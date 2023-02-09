// ==UserScript==
// @name         TMetric Shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Easy Shortcuts for TMetric
// @author       Kris Vandebroek
// @match        https://app.tmetric.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tmetric.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/krisvandebroek/tampermonkey-scripts/main/tmetric-add-shortcuts.js
// @downloadURL  https://raw.githubusercontent.com/krisvandebroek/tampermonkey-scripts/main/tmetric-add-shortcuts.js
// ==/UserScript==

/*
HOW TO USE

= Add / Edit entry =
Press N to add a new Entry
Press ALT+E or E to open the last entry to edit it

= Selection & Setting Projects =
Press § to select / deselect all entries
Press up and down to go over the entries and selecting the one you want by pressing space
Press P to change or set the project for the selected entries

= Switching days =
Press left and right to go to the previous and next day, skipping weekends
Presss T to go back to Today

*/

var entry = 0;

function doc_keyUp(e) {
    // Ignore keypresses when in an input textbox
    if (e.target.tagName.toLowerCase() == 'input' && e.target.type != 'checkbox') return;
    // Check for keyboard shortcut
    switch (e.keyCode) {
        case 69: // (ALT + E or E) Open the last entry to edit it
            if (e.altKey == true) {
                document.querySelector('div.card-body tr:last-of-type td.timer-td-task').click();
            } else {
                document.querySelector('div.card-body tr:last-of-type td.timer-td-task').click();
            }
            break;
        case 80: // (P) Change / set project for the selected entries
            console.log(e.target.textContent.trim());
            if (e.target.textContent.trim() == 'Project') {
                e.target.blur();
            } else {
                document.querySelector('div.card-header div.btn-group button:first-of-type').click();
            }
            break;
        case 192: // (§) Click on the checkbox in the header to select / deselect all entries
            document.querySelector('div.card-header input').click();
            entry = 0; // Reset the row counter;
            break;
        case 37: // (←) Go to previous day
            if (document.querySelector('div.time-range-selector span').textContent.startsWith("Mon")) {
                document.querySelector('div.time-range-selector div.btn-group button:first-child').click();
                document.querySelector('div.time-range-selector div.btn-group button:first-child').click();
            }
            document.querySelector('div.time-range-selector div.btn-group button:first-child').click();
            break;
        case 39: // (→) Go to next day
            if (document.querySelector('div.time-range-selector span').textContent.startsWith("Fri")) {
                document.querySelector('div.time-range-selector div.btn-group button:last-child').click();
                document.querySelector('div.time-range-selector div.btn-group button:last-child').click();
            }
            document.querySelector('div.time-range-selector div.btn-group button:last-child').click();
            break;
        case 84: // (T) Go to today
            document.querySelector('div.time-range-selector div.btn-group button:nth-child(2)').click();
            break;
        case 40: // (↓) Focus on the next entry for quick selection
            var next;
            do {
                entry++;
                next = document.querySelector('div.card-body tr:nth-child('+entry+') input');
            } while (entry < 50 && next == undefined);
            if (next != undefined) {
                next.focus();
            }
            break;
        case 38: // (↑) Focus on the previous entry for quick selection
            var previous;
            do {
                entry--;
                previous = document.querySelector('div.card-body tr:nth-child('+entry+') input');
            } while (entry > 1 && previous == undefined);
            if (previous != undefined) {
                previous.focus();
            }
            break;
        case 78: // (N) Start a new timer for Today or add a time entry for a previous day
            if (document.querySelector('div.time-range-selector span').textContent.startsWith("Today")) {
                document.querySelector('div.timer-buttons button:first-child').click();
                document.querySelector('div.timer-buttons ul li:first-child a').click();
            } else {
                document.querySelector('div.card-header div.actions button:first-child').click();
            }
            break;
        default:
            break;
    }
}

(function() {
    'use strict';

    document.addEventListener('keydown', doc_keyUp, false);
})();
